import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const CRM_SESSION_COOKIE = "einvoicify_crm_session";
const SESSION_DAYS = 7;

function secret() {
  return (
    process.env.CRM_AUTH_SECRET ||
    process.env.CRM_ADMIN_PASSWORD ||
    "einvoicify-dev-secret"
  );
}

export function getAdminCredentials() {
  return {
    email: (process.env.CRM_ADMIN_EMAIL ?? "admin@einvoicify.my").toLowerCase(),
    password: process.env.CRM_ADMIN_PASSWORD ?? "einvoicify2026",
    name: process.env.CRM_ADMIN_NAME ?? "Einvoicify Admin",
  };
}

/** Signed, stateless session — works across Vercel serverless instances. */
export function createSignedSession(payload: {
  email: string;
  name: string;
}): { token: string; expiresAt: Date } {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);
  const exp = Math.floor(expiresAt.getTime() / 1000);
  const body = Buffer.from(
    JSON.stringify({ email: payload.email, name: payload.name, exp })
  ).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return { token: `${body}.${sig}`, expiresAt };
}

export function verifySignedSession(
  token: string
): { email: string; name: string } | null {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;
    const expected = createHmac("sha256", secret())
      .update(body)
      .digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      email: string;
      name: string;
      exp: number;
    };
    if (!data.exp || data.exp * 1000 < Date.now()) return null;
    if (!data.email || !data.name) return null;
    return { email: data.email, name: data.name };
  } catch {
    return null;
  }
}

export function verifyPassword(password: string, expected: string): boolean {
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function getCrmSession() {
  const jar = await cookies();
  const token = jar.get(CRM_SESSION_COOKIE)?.value;
  if (!token) return null;

  const user = verifySignedSession(token);
  if (!user) return null;

  return {
    token,
    admin: {
      id: "env-admin",
      email: user.email,
      name: user.name,
    },
  };
}

export async function requireCrmSession() {
  const session = await getCrmSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

// Keep names used by older imports
export function hashPassword(password: string): string {
  return createHmac("sha256", secret()).update(password).digest("hex");
}

export async function ensureDefaultAdmin() {
  // No-op: admin is env-based for reliable Vercel demos
  return getAdminCredentials();
}

export async function createCrmSession(adminId: string) {
  void adminId;
  const creds = getAdminCredentials();
  return createSignedSession({ email: creds.email, name: creds.name });
}

export async function destroyCrmSession(_token: string) {
  void _token;
}
