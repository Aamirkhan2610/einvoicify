import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadStatusSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "all";
  const status = searchParams.get("status");

  try {
    if (type === "demo") {
      const demos = await prisma.demoRequest.findMany({
        where: status
          ? { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "CLOSED" }
          : undefined,
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json({ demos });
    }

    const enquiries = await prisma.contactEnquiry.findMany({
      where: {
        ...(status
          ? {
              status: status as
                | "NEW"
                | "CONTACTED"
                | "QUALIFIED"
                | "CONVERTED"
                | "CLOSED",
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const demos = await prisma.demoRequest.findMany({
      where: status
        ? { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "CLOSED" }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ enquiries, demos });
  } catch (error) {
    console.error("[api/crm/leads]", error);
    return NextResponse.json(
      { error: "Failed to load leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, kind } = body as {
      id?: string;
      kind?: "enquiry" | "demo";
    };
    const parsed = leadStatusSchema.safeParse(body);

    if (!id || !kind || !parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (kind === "demo") {
      const updated = await prisma.demoRequest.update({
        where: { id },
        data: {
          status: parsed.data.status,
          notes: parsed.data.notes ?? undefined,
        },
      });
      return NextResponse.json({ success: true, lead: updated });
    }

    const updated = await prisma.contactEnquiry.update({
      where: { id },
      data: {
        status: parsed.data.status,
        notes: parsed.data.notes ?? undefined,
      },
    });
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("[api/crm/leads PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
