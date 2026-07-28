import { PrismaClient } from "@prisma/client";

/**
 * Vercel serverless cannot persist project-local SQLite and cannot run
 * `prisma db push` at request time. We point at /tmp and create tables with
 * raw SQL on first use so CRM/chat work for demos (data is ephemeral).
 *
 * For durable production data, set DATABASE_URL to Neon/Postgres.
 */

function resolveDatabaseUrl(): string {
  if (process.env.VERCEL) {
    return "file:/tmp/einvoicify.db";
  }
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

const databaseUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = databaseUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  schemaReady: boolean | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** Create SQLite tables if missing (Vercel cold start). */
export async function ensureDatabase() {
  if (globalForPrisma.schemaReady) return;
  if (!databaseUrl.startsWith("file:")) {
    globalForPrisma.schemaReady = true;
    return;
  }

  // Run statements one-by-one — SQLite exec does not support multi-statement well via Prisma
  const statements = [
    `CREATE TABLE IF NOT EXISTS "ContactEnquiry" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "company" TEXT,
      "message" TEXT NOT NULL,
      "type" TEXT NOT NULL DEFAULT 'GENERAL',
      "status" TEXT NOT NULL DEFAULT 'NEW',
      "source" TEXT NOT NULL DEFAULT 'CONTACT_FORM',
      "turnoverBand" TEXT,
      "erpSystem" TEXT,
      "notes" TEXT,
      "assignedTo" TEXT,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE INDEX IF NOT EXISTS "ContactEnquiry_email_idx" ON "ContactEnquiry"("email")`,
    `CREATE INDEX IF NOT EXISTS "ContactEnquiry_status_idx" ON "ContactEnquiry"("status")`,
    `CREATE INDEX IF NOT EXISTS "ContactEnquiry_type_idx" ON "ContactEnquiry"("type")`,
    `CREATE INDEX IF NOT EXISTS "ContactEnquiry_createdAt_idx" ON "ContactEnquiry"("createdAt")`,

    `CREATE TABLE IF NOT EXISTS "DemoRequest" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "company" TEXT NOT NULL,
      "jobTitle" TEXT,
      "erpSystem" TEXT,
      "monthlyInvoices" TEXT,
      "turnoverBand" TEXT,
      "notes" TEXT,
      "preferredDate" DATETIME,
      "status" TEXT NOT NULL DEFAULT 'NEW',
      "source" TEXT NOT NULL DEFAULT 'DEMO_REQUEST',
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE INDEX IF NOT EXISTS "DemoRequest_email_idx" ON "DemoRequest"("email")`,
    `CREATE INDEX IF NOT EXISTS "DemoRequest_status_idx" ON "DemoRequest"("status")`,
    `CREATE INDEX IF NOT EXISTS "DemoRequest_createdAt_idx" ON "DemoRequest"("createdAt")`,

    `CREATE TABLE IF NOT EXISTS "Subscriber" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "email" TEXT NOT NULL,
      "name" TEXT,
      "active" BOOLEAN NOT NULL DEFAULT 1,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")`,

    `CREATE TABLE IF NOT EXISTS "Conversation" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "sessionId" TEXT NOT NULL,
      "visitorName" TEXT,
      "visitorEmail" TEXT,
      "visitorPhone" TEXT,
      "company" TEXT,
      "topic" TEXT,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "source" TEXT NOT NULL DEFAULT 'CHAT',
      "assignedTo" TEXT,
      "lastMessageAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Conversation_sessionId_key" ON "Conversation"("sessionId")`,
    `CREATE INDEX IF NOT EXISTS "Conversation_status_idx" ON "Conversation"("status")`,
    `CREATE INDEX IF NOT EXISTS "Conversation_lastMessageAt_idx" ON "Conversation"("lastMessageAt")`,
    `CREATE INDEX IF NOT EXISTS "Conversation_visitorEmail_idx" ON "Conversation"("visitorEmail")`,

    `CREATE TABLE IF NOT EXISTS "Message" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "conversationId" TEXT NOT NULL,
      "sender" TEXT NOT NULL,
      "body" TEXT NOT NULL,
      "agentName" TEXT,
      "readAt" DATETIME,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE
    )`,
    `CREATE INDEX IF NOT EXISTS "Message_conversationId_createdAt_idx" ON "Message"("conversationId", "createdAt")`,

    `CREATE TABLE IF NOT EXISTS "CrmAdmin" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "email" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "active" BOOLEAN NOT NULL DEFAULT 1,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "CrmAdmin_email_key" ON "CrmAdmin"("email")`,

    `CREATE TABLE IF NOT EXISTS "CrmSession" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "token" TEXT NOT NULL,
      "adminId" TEXT NOT NULL,
      "expiresAt" DATETIME NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "CrmSession_token_key" ON "CrmSession"("token")`,
    `CREATE INDEX IF NOT EXISTS "CrmSession_token_idx" ON "CrmSession"("token")`,
    `CREATE INDEX IF NOT EXISTS "CrmSession_adminId_idx" ON "CrmSession"("adminId")`,
  ];

  try {
    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql);
    }
    globalForPrisma.schemaReady = true;
  } catch (err) {
    console.error("[prisma] ensureDatabase failed", err);
    // Mark ready anyway to avoid infinite loops; next request may retry if client is new
    throw err;
  }
}

export default prisma;
