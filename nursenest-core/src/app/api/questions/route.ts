import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export async function GET(req: NextRequest) {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  const searchParams = req.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(25, Math.max(5, Number(searchParams.get("pageSize") ?? "10")));

  try {
    const questions = await prisma.question.findMany({
      where: questionAccessWhere(gate.entitlement),
      select: {
        id: true,
        stem: true,
        questionType: true,
        rationale: true,
        options: true,
        category: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ page, pageSize, questions });
  } catch {
    safeServerLog("api_questions", "prisma_find_failed", { page });
    return NextResponse.json({ error: "Unable to load questions. Try again shortly." }, { status: 503 });
  }
}
