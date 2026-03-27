import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { safeServerLog } from "@/lib/observability/safe-server-log";

const POOL_LIMIT = 20;

export async function POST() {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  try {
    const questionPool = await prisma.question.findMany({
      where: questionAccessWhere(gate.entitlement),
      select: { id: true, stem: true, options: true, questionType: true },
      take: POOL_LIMIT,
    });

    return NextResponse.json({
      total: questionPool.length,
      questions: questionPool,
      poolEmpty: questionPool.length === 0,
    });
  } catch {
    safeServerLog("api_exams_start", "prisma_find_failed", {});
    return NextResponse.json(
      { error: "Unable to start exam session. Try again shortly.", questions: [], total: 0, poolEmpty: true },
      { status: 503 },
    );
  }
}
