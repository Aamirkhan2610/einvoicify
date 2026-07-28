import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { prisma, ensureDatabase } from "@/lib/prisma";

export const CRM_SESSION_COOKIE = "einvoicify_crm_session";
const SESSION_DAYS = 7;

export function hashPassword(password: string): string {
  const salt = process.env.CRM_AUTH_SECRET ?? "einvoicify-dev-secret";
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const a = Buffer.from(hashPassword(password));
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export async function ensureDefaultAdmin() {
  await ensureDatabase();

  const email =
    process.env.CRM_ADMIN_EMAIL?.toLowerCase() ?? "admin@einvoicify.my";
  const password = process.env.CRM_ADMIN_PASSWORD ?? "einvoicify2026";
  const name = process.env.CRM_ADMIN_NAME ?? "Einvoicify Admin";

  const existing = await prisma.crmAdmin.findUnique({ where: { email } });
  if (existing) return existing;

  return prisma.crmAdmin.create({
    data: {
      email,
      name,
      passwordHash: hashPassword(password),
    },
  });
}

export async function createCrmSession(adminId: string) {
  const token = createSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await prisma.crmSession.create({
    data: { token, adminId, expiresAt },
  });

  return { token, expiresAt };
}

export async function destroyCrmSession(token: string) {
  await prisma.crmSession.deleteMany({ where: { token } });
}

export async function getCrmSession() {
  try {
    await ensureDatabase();
  } catch {
    return null;
  }

  const jar = await cookies();
  const token = jar.get(CRM_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.crmSession.findUnique({
    where: { token },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.crmSession.delete({ where: { id: session.id } }).catch(() => {});
    }
    return null;
  }

  const admin = await prisma.crmAdmin.findFirst({
    where: { id: session.adminId, active: true },
  });

  if (!admin) return null;

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  };
}

export async function requireCrmSession() {
  const session = await getCrmSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
