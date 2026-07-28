import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

/**
 * On Vercel serverless, local SQLite under the project root is not writable.
 * Use /tmp and push schema on cold start so CRM/chat work for demos.
 * Data is ephemeral across instances — fine for client review demos.
 * For production, switch DATABASE_URL to Neon/Postgres.
 */
function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL?.startsWith("file:") && process.env.VERCEL) {
    return "file:/tmp/einvoicify.db";
  }
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

const databaseUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = databaseUrl;

let schemaReady = false;

function ensureSqliteSchema() {
  if (schemaReady) return;
  if (!databaseUrl.startsWith("file:")) {
    schemaReady = true;
    return;
  }

  // Only auto-push on Vercel (or when /tmp db is missing)
  const isVercel = Boolean(process.env.VERCEL);
  const filePath = databaseUrl.replace("file:", "");
  const abs =
    filePath.startsWith("/") || filePath.startsWith("./")
      ? filePath
      : path.resolve(process.cwd(), filePath);

  if (!isVercel && existsSync(abs)) {
    schemaReady = true;
    return;
  }

  try {
    execSync("npx prisma db push --skip-generate --accept-data-loss", {
      stdio: "ignore",
      env: { ...process.env, DATABASE_URL: databaseUrl },
      timeout: 60_000,
    });
  } catch (err) {
    console.error("[prisma] schema push failed", err);
  }
  schemaReady = true;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  ensureSqliteSchema();
  return new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
