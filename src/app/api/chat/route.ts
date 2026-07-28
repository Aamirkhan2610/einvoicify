import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { chatStartSchema, chatMessageSchema } from "@/lib/validations";
import { prisma, ensureDatabase } from "@/lib/prisma";

function clientMeta(request: Request) {
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  return { ipAddress, userAgent };
}

/** Start a conversation or append a customer message */
export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const body = await request.json();
    const isFollowUp = Boolean(body.sessionId && body.body && !body.message);

    if (isFollowUp) {
      const parsed = chatMessageSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.flatten() },
          { status: 400 }
        );
      }

      const conversation = await prisma.conversation.findUnique({
        where: { sessionId: parsed.data.sessionId },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }

      if (conversation.status === "CLOSED") {
        return NextResponse.json(
          { error: "This conversation is closed. Please start a new chat." },
          { status: 400 }
        );
      }

      const message = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: "CUSTOMER",
          body: parsed.data.body.trim(),
        },
      });

      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          lastMessageAt: new Date(),
          status:
            conversation.status === "RESOLVED" ? "OPEN" : conversation.status,
        },
      });

      return NextResponse.json({ success: true, message });
    }

    const parsed = chatStartSchema.safeParse(body);
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
    const { ipAddress, userAgent } = clientMeta(request);
    const sessionId =
      data.sessionId && data.sessionId.length >= 8
        ? data.sessionId
        : randomBytes(16).toString("hex");

    const isPrice =
      data.topic?.toLowerCase().includes("pric") ||
      data.message.toLowerCase().includes("pric");

    let conversation = await prisma.conversation.findUnique({
      where: { sessionId },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          sessionId,
          visitorName: data.name.trim(),
          visitorEmail: data.email.trim().toLowerCase(),
          visitorPhone: data.phone?.trim() || null,
          company: data.company?.trim() || null,
          topic: data.topic?.trim() || null,
          source: isPrice ? "PRICE_INQUIRY" : "CHAT",
          ipAddress,
          userAgent,
          messages: {
            create: [
              {
                sender: "SYSTEM",
                body: "Thanks for contacting Einvoicify. Our team typically replies within business hours. You can also call +6016-338-1871 or email info@einvoicify.my.",
              },
              {
                sender: "CUSTOMER",
                body: data.message.trim(),
              },
            ],
          },
        },
      });

      // Mirror price/product inquiries into CRM leads
      await prisma.contactEnquiry.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || null,
          company: data.company?.trim() || null,
          message: `[Chat · ${data.topic || "General"}] ${data.message.trim()}`,
          type: isPrice ? "PRICE" : "PRODUCT",
          source: isPrice ? "PRICE_INQUIRY" : "CHAT",
          ipAddress,
          userAgent,
        },
      });
    } else {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: "CUSTOMER",
          body: data.message.trim(),
        },
      });
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          lastMessageAt: new Date(),
          visitorName: data.name.trim(),
          visitorEmail: data.email.trim().toLowerCase(),
          visitorPhone: data.phone?.trim() || conversation.visitorPhone,
          company: data.company?.trim() || conversation.company,
          topic: data.topic?.trim() || conversation.topic,
          status: "OPEN",
        },
      });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        sessionId: conversation.sessionId,
        conversationId: conversation.id,
        messages,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/chat]", error);
    return NextResponse.json(
      {
        error:
          "Unable to start chat. Please email info@einvoicify.my or call +6016-338-1871.",
      },
      { status: 500 }
    );
  }
}

/** Poll messages for a visitor session */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const conversation = await prisma.conversation.findUnique({
      where: { sessionId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sessionId: conversation.sessionId,
      status: conversation.status,
      messages: conversation.messages,
      visitorName: conversation.visitorName,
      topic: conversation.topic,
    });
  } catch (error) {
    console.error("[api/chat GET]", error);
    return NextResponse.json(
      { error: "Unable to load conversation" },
      { status: 500 }
    );
  }
}
