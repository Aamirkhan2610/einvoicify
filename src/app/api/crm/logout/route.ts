import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CRM_SESSION_COOKIE, destroyCrmSession } from "@/lib/auth";

export async function POST() {
  const jar = await cookies();
  const token = jar.get(CRM_SESSION_COOKIE)?.value;
  if (token) {
    await destroyCrmSession(token).catch(() => {});
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(CRM_SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
