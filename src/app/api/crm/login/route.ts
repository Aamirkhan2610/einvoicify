import { NextResponse } from "next/server";
import {
  createCrmSession,
  ensureDefaultAdmin,
  verifyPassword,
  CRM_SESSION_COOKIE,
} from "@/lib/auth";
import { crmLoginSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    await ensureDefaultAdmin();
    const body = await request.json();
    const parsed = crmLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const admin = await prisma.crmAdmin.findUnique({
      where: { email: parsed.data.email.trim().toLowerCase() },
    });

    if (
      !admin ||
      !admin.active ||
      !verifyPassword(parsed.data.password, admin.passwordHash)
    ) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { token, expiresAt } = await createCrmSession(admin.id);

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });

    response.cookies.set(CRM_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("[api/crm/login]", error);
    return NextResponse.json(
      { error: "Login failed. Ensure the database is running." },
      { status: 500 }
    );
  }
}
