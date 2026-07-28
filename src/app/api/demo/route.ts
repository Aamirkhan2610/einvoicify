import { NextResponse } from "next/server";
import { demoSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = demoSchema.safeParse(body);

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

    let preferredDate: Date | null = null;
    if (data.preferredDate) {
      const d = new Date(data.preferredDate);
      if (!Number.isNaN(d.getTime())) preferredDate = d;
    }

    const demo = await prisma.demoRequest.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        company: data.company.trim(),
        jobTitle: data.jobTitle?.trim() || null,
        erpSystem: data.erpSystem?.trim() || null,
        monthlyInvoices: data.monthlyInvoices?.trim() || null,
        turnoverBand: data.turnoverBand?.trim() || null,
        notes: data.notes?.trim() || null,
        preferredDate,
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: demo.id,
        message: "Demo request received",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/demo]", error);
    const message =
      error instanceof Error && error.message.includes("Can't reach database")
        ? "Database is unavailable. Please email info@einvoicify.my or try again later."
        : "Unable to save your demo request. Please try again or email info@einvoicify.my.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
