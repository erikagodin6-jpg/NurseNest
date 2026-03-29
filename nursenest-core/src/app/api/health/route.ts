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
 * Detailed status for operators. **Always HTTP 200** so misconfigured load balancers
 * (or App Platform probes pointed at `/api/health`) do not mark the instance unhealthy
 * while the Node process is up. Use `ready` for readiness; prefer `/healthz` for liveness.
 */
export async function GET() {
  const env = requiredEnvOk();
  const mem = process.memoryUsage();
  let db: "connected" | "disconnected" = "disconnected";
  let maskedConnection: string | undefined;
  let userTableReady: boolean | undefined;
  let databaseError: string | undefined;
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

  const ready = env.ok && db === "connected";

  return NextResponse.json(
    {
      ok: true,
      ready,
      service: "nursenest-core",
      degraded: !ready,
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
    { status: 200 },
  );
}
