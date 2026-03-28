import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  questionBankLearnerWhereForProfile,
  questionLearnerPoolWhere,
} from "@/lib/entitlements/content-access-scope";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { prisma } from "@/lib/db";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";
import { withRetry } from "@/lib/resilience/with-retry";
import { rankStudyQuestions } from "@/lib/learning/adaptive-study-order";
import { buildLearningSignals } from "@/lib/learning/learning-signals";
import { parseLearningProfileRow } from "@/lib/learning/profile-shape";
import type { CountryCode, Prisma, TierCode } from "@prisma/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(25, Math.max(5, Number(searchParams.get("pageSize") ?? "10")));
  /** summary = card metadata only; full = stem + rationale + options (larger payloads). */
  const mode = searchParams.get("mode") === "full" ? "full" : "summary";
  const strategy = searchParams.get("strategy") === "adaptive" ? "adaptive" : "recent";

  let entitlement;
  try {
    entitlement = await resolveEntitlement(userId);
  } catch (e) {
    safeServerLogCritical("api_questions", "entitlement_resolve_failed", { page }, e);
    return NextResponse.json({ error: "Unable to verify access. Try again shortly." }, { status: 503 });
  }

  if (entitlement.hasAccess) {
    const gate = await requireSubscriberSession();
    if (!gate.ok) return gate.response;
    setSentryServerContext({ route: "/api/questions", feature: "question", userId: gate.userId });
    try {
      const summarySelect = {
        id: true,
        stem: true,
        questionType: true,
        difficulty: true,
        examFamily: true,
        categoryId: true,
        systemTag: true,
        category: { select: { name: true, slug: true } },
      } as const;
      const fullSelect = {
        id: true,
        stem: true,
        questionType: true,
        difficulty: true,
        rationale: true,
        options: true,
        categoryId: true,
        systemTag: true,
        category: { select: { name: true } },
      } as const;

      const ADAPTIVE_WINDOW = 160;

      type SummaryRow = Prisma.QuestionGetPayload<{ select: typeof summarySelect }>;
      type FullRow = Prisma.QuestionGetPayload<{ select: typeof fullSelect }>;
      let questions: SummaryRow[] | FullRow[];

      if (strategy === "adaptive") {
        const select = mode === "full" ? fullSelect : summarySelect;
        const [pool, profileRow] = await Promise.all([
          withRetry(() =>
            prisma.question.findMany({
              where: questionLearnerPoolWhere(gate.entitlement),
              select,
              take: ADAPTIVE_WINDOW,
              orderBy: { updatedAt: "desc" },
            }),
          ),
          prisma.userLearningProfile.findUnique({
            where: { userId: gate.userId },
            select: {
              aggregatesBySystem: true,
              aggregatesByDifficulty: true,
              aggregatesByCategory: true,
              recentQuestionIds: true,
              examScoreHistory: true,
              totalPracticeAttempts: true,
            },
          }),
        ]);
        const profile = profileRow
          ? parseLearningProfileRow({
              aggregatesBySystem: profileRow.aggregatesBySystem,
              aggregatesByDifficulty: profileRow.aggregatesByDifficulty,
              aggregatesByCategory: profileRow.aggregatesByCategory,
              recentQuestionIds: profileRow.recentQuestionIds,
              examScoreHistory: profileRow.examScoreHistory,
              totalPracticeAttempts: profileRow.totalPracticeAttempts,
            })
          : null;
        const sig = buildLearningSignals(profile);
        const ranked = rankStudyQuestions(
          pool.map((q) => ({
            id: q.id,
            questionType: q.questionType,
            difficulty: q.difficulty,
            systemTag: q.systemTag ?? null,
            categoryId: q.categoryId,
          })),
          sig,
        );
        const idOrder = new Map(ranked.map((r, i) => [r.id, i]));
        const sorted = [...pool].sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));
        const start = (page - 1) * pageSize;
        questions = sorted.slice(start, start + pageSize) as SummaryRow[] | FullRow[];
      } else {
        const rows = await withRetry(() =>
          prisma.question.findMany({
            where: questionLearnerPoolWhere(gate.entitlement),
            select: mode === "full" ? fullSelect : summarySelect,
            orderBy: { updatedAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
        );
        questions = rows as SummaryRow[] | FullRow[];
      }

      const payload =
        mode === "summary"
          ? questions.map((q) => ({
              ...q,
              stem: q.stem.length > 280 ? `${q.stem.slice(0, 280).trim()}…` : q.stem,
            }))
          : questions;

      return NextResponse.json({
        page,
        pageSize,
        questions: payload,
        mode: "subscriber" as const,
        fields: mode,
        strategy,
      });
    } catch (e) {
      safeServerLogCritical("api_questions", "prisma_find_failed", { page }, e);
      return NextResponse.json({ error: "Unable to load questions. Try again shortly." }, { status: 503 });
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { country: true, tier: true, freeQuestionViews: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  setSentryServerContext({ route: "/api/questions", feature: "question", userId });

  const snap = await getFreemiumSnapshot(userId);
  if (!snap || snap.questionRemaining <= 0) {
    return NextResponse.json(
      {
        error: "Subscription required",
        code: "paywall",
        message: "You have used your complimentary question previews. Subscribe to unlock the full bank and rationales.",
        freemiumExhausted: true,
      },
      { status: 403 },
    );
  }

  const take = Math.min(pageSize, snap.questionRemaining);

  try {
    const where = questionBankLearnerWhereForProfile(user.country as CountryCode, user.tier as TierCode);
    const freemiumMode = searchParams.get("mode") === "full" ? "full" : "summary";
    const questions = await withRetry(() =>
      prisma.question.findMany({
        where,
        select:
          freemiumMode === "full"
            ? {
                id: true,
                stem: true,
                questionType: true,
                rationale: true,
                options: true,
                category: { select: { name: true } },
              }
            : {
                id: true,
                stem: true,
                questionType: true,
                difficulty: true,
                examFamily: true,
                categoryId: true,
                category: { select: { name: true, slug: true } },
              },
        orderBy: { updatedAt: "desc" },
        skip: 0,
        take,
      }),
    );

    const used = questions.length;
    if (used > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          freeQuestionViews: {
            increment: used,
          },
        },
      });
    }

    const remaining = Math.max(0, snap.questionRemaining - used);
    const sanitized =
      freemiumMode === "full"
        ? questions.map((q) => ({ ...q, rationale: "" }))
        : questions.map((q) => ({
            ...q,
            stem: q.stem.length > 280 ? `${q.stem.slice(0, 280).trim()}…` : q.stem,
          }));

    return NextResponse.json({
      page: 1,
      pageSize: take,
      questions: sanitized,
      mode: "freemium" as const,
      fields: freemiumMode,
      freemiumRemainingAfterBatch: remaining,
    });
  } catch (e) {
    safeServerLogCritical("api_questions", "prisma_find_failed_freemium", { page }, e);
    return NextResponse.json({ error: "Unable to load questions. Try again shortly." }, { status: 503 });
  }
}
