import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations";
import { prisma, ensureDatabase } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const name = parsed.data.name?.trim() || null;

    await prisma.subscriber.upsert({
      where: { email },
      create: { email, name, active: true },
      update: { name: name ?? undefined, active: true },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[api/subscribe]", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 500 }
    );
  }
}
