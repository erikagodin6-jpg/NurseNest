import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, db: "connected" });
  } catch {
    // Startup should not hard-crash if DB is unavailable.
    return NextResponse.json({ ok: true, db: "disconnected", degraded: true }, { status: 200 });
  }
}
