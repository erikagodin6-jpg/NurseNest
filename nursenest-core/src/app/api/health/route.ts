import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "connected";
  } catch {
    db = "disconnected";
  }

  const degraded = !env.ok || db === "disconnected";
  const status = degraded ? 503 : 200;

  return NextResponse.json(
    {
      ok: !degraded,
      service: "nursenest-core",
      degraded,
      db,
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
