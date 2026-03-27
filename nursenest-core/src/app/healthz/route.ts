import { NextResponse } from "next/server";

/**
 * Public, dependency-free health endpoint for deploy readiness checks.
 * No auth/session/DB calls; always returns 200 when process is alive.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "nursenest-core",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
