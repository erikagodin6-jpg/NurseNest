import { NextResponse } from "next/server";
import { maskDatabaseUrl } from "@/lib/db/database-env";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";

function requiredEnvOk(): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!process.env.DATABASE_URL?.trim()) missing.push("DATABASE_URL");
  const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!authSecret?.trim()) missing.push("AUTH_SECRET");
  return { ok: missing.length === 0, missing };
}

/**
 * Deep health: DB probe, env sanity, memory snapshot. Safe for internal monitors (no secrets in body).
 */
export async function GET() {
  const env = requiredEnvOk();
  const mem = process.memoryUsage();
  let db: "connected" | "disconnected" = "disconnected";
  let maskedConnection: string | undefined;
  let userTableReady: boolean | undefined;
  let databaseError: string | undefined;
  // Avoid Prisma engine/query when DATABASE_URL is absent (deploy probes, misconfigured previews).
  if (isDatabaseUrlConfigured()) {
    maskedConnection = maskDatabaseUrl(process.env.DATABASE_URL!.trim());
    try {
      await prisma.$queryRaw`SELECT 1`;
      db = "connected";
      try {
        await prisma.$queryRaw`SELECT 1 FROM "User" LIMIT 1`;
        userTableReady = true;
      } catch (e) {
        userTableReady = false;
        databaseError = e instanceof Error ? e.message.slice(0, 400) : String(e).slice(0, 400);
      }
    } catch (e) {
      db = "disconnected";
      databaseError = e instanceof Error ? e.message.slice(0, 400) : String(e).slice(0, 400);
    }
  }

  const degraded = !env.ok || db === "disconnected";
  const status = degraded ? 503 : 200;

  return NextResponse.json(
    {
      ok: !degraded,
      service: "nursenest-core",
      degraded,
      db,
      database: {
        maskedConnection: maskedConnection ?? null,
        userTableReady: userTableReady ?? null,
        error: databaseError ?? null,
      },
      env: { requiredPresent: env.ok, missingKeys: env.missing },
      memory: {
        heapUsedMb: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10,
        rssMb: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
      },
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
    { status },
  );
}
