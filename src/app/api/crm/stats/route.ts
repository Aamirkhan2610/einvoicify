import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      enquiriesNew,
      enquiriesTotal,
      demosNew,
      demosTotal,
      chatsOpen,
      chatsTotal,
      messagesToday,
      recentEnquiries,
      recentChats,
    ] = await Promise.all([
      prisma.contactEnquiry.count({ where: { status: "NEW" } }),
      prisma.contactEnquiry.count(),
      prisma.demoRequest.count({ where: { status: "NEW" } }),
      prisma.demoRequest.count(),
      prisma.conversation.count({
        where: { status: { in: ["OPEN", "PENDING"] } },
      }),
      prisma.conversation.count(),
      prisma.message.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.contactEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.conversation.findMany({
        orderBy: { lastMessageAt: "desc" },
        take: 5,
        include: {
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        enquiriesNew,
        enquiriesTotal,
        demosNew,
        demosTotal,
        chatsOpen,
        chatsTotal,
        messagesToday,
      },
      recentEnquiries,
      recentChats,
    });
  } catch (error) {
    console.error("[api/crm/stats]", error);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
