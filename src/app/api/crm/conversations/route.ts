import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/auth";
import { prisma, ensureDatabase } from "@/lib/prisma";
import {
  chatAgentReplySchema,
  conversationStatusSchema,
} from "@/lib/validations";

export async function GET(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  try {
    await ensureDatabase();
    if (id) {
      const conversation = await prisma.conversation.findUnique({
        where: { id },
        include: {
          messages: { orderBy: { createdAt: "asc" } },
        },
      });
      if (!conversation) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ conversation });
    }

    const conversations = await prisma.conversation.findMany({
      where: status
        ? {
            status: status as "OPEN" | "PENDING" | "RESOLVED" | "CLOSED",
          }
        : undefined,
      orderBy: { lastMessageAt: "desc" },
      take: 100,
      include: {
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
        _count: { select: { messages: true } },
      },
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("[api/crm/conversations]", error);
    return NextResponse.json(
      { error: "Failed to load conversations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureDatabase();
    const body = await request.json();
    const parsed = chatAgentReplySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: parsed.data.conversationId },
    });
    if (!conversation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "AGENT",
        body: parsed.data.body.trim(),
        agentName: parsed.data.agentName ?? session.admin.name,
      },
    });

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        status: "PENDING",
        assignedTo: session.admin.name,
      },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("[api/crm/conversations POST]", error);
    return NextResponse.json(
      { error: "Failed to send reply" },
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
    const { id } = body as { id?: string };
    const parsed = conversationStatusSchema.safeParse(body);
    if (!id || !parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const conversation = await prisma.conversation.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ success: true, conversation });
  } catch (error) {
    console.error("[api/crm/conversations PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 }
    );
  }
}
