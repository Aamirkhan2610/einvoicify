import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { prisma, ensureDatabase } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const details: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "form";
        details[key] = details[key] ?? [];
        details[key].push(issue.message);
      }
      return NextResponse.json(
        { error: "Validation failed", details },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;
    const userAgent = request.headers.get("user-agent") ?? undefined;

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        company: data.company?.trim() || null,
        message: data.message.trim(),
        type: data.type ?? "GENERAL",
        source:
          data.type === "PRICE"
            ? "PRICE_INQUIRY"
            : data.type === "DEMO"
              ? "DEMO_REQUEST"
              : "CONTACT_FORM",
        turnoverBand: data.turnoverBand?.trim() || null,
        erpSystem: data.erpSystem?.trim() || null,
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: enquiry.id,
        message: "Enquiry received",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/contact]", error);
    const message =
      error instanceof Error && error.message.includes("Can't reach database")
        ? "Database is unavailable. Please email info@einvoicify.my or try again later."
        : "Unable to save your enquiry. Please try again or email info@einvoicify.my.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
