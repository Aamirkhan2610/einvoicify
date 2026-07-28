import { NextResponse } from "next/server";
import {
  createSignedSession,
  getAdminCredentials,
  verifyPassword,
  CRM_SESSION_COOKIE,
} from "@/lib/auth";
import { crmLoginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = crmLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const creds = getAdminCredentials();
    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;

    if (
      email !== creds.email ||
      !verifyPassword(password, creds.password)
    ) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { token, expiresAt } = createSignedSession({
      email: creds.email,
      name: creds.name,
    });

    const response = NextResponse.json({
      success: true,
      admin: { id: "env-admin", email: creds.email, name: creds.name },
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
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
