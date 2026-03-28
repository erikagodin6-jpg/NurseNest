import { NextResponse } from "next/server";
import { ContentStatus, ExamFamily, ExamSessionStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { buildLearningSignals } from "@/lib/learning/learning-signals";
import { parseLearningProfileRow } from "@/lib/learning/profile-shape";
import { pickAdaptiveCatQuestionIds } from "@/lib/learning/adaptive-cat";
import { computeReadiness } from "@/lib/learning/readiness";
import { questionLearnerPoolWhere, userCanAccessExam } from "@/lib/entitlements/content-access-scope";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { logPaywallDeny } from "@/lib/entitlements/assert-question-access";
import { validateQuestionPayload } from "@/lib/content/question-schema";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { productEvent } from "@/lib/observability/product-events";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";
import { withRetry } from "@/lib/resilience/with-retry";

const POOL_LIMIT = 20;
const CANDIDATE_POOL = 320;

export async function POST(req: Request) {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  setSentryServerContext({ route: "/api/exams/start", feature: "exam", userId: gate.userId });

  let examId: string | null = null;
  let hydrate: "full" | "window" = "window";
  try {
    const b = (await req.json()) as { examId?: string; hydrate?: string };
    examId = typeof b?.examId === "string" && b.examId.length > 4 ? b.examId : null;
    if (b?.hydrate === "full") hydrate = "full";
  } catch {
    /* optional body */
  }

  let examFamily: ExamFamily = ExamFamily.GENERIC;

  if (examId) {
    const exam = await withRetry(() =>
      prisma.exam.findUnique({
        where: { id: examId! },
        select: { id: true, status: true, country: true, tier: true, examFamily: true },
      }),
    );
    if (!exam || exam.status !== ContentStatus.PUBLISHED) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }
    if (!userCanAccessExam(gate.entitlement, exam)) {
      logPaywallDeny("/api/exams/start", "exam_out_of_scope", { examId: examId ?? "" });
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    examFamily = exam.examFamily;
  }

  try {
    const baseWhere = questionLearnerPoolWhere(gate.entitlement);
    const [candidates, profileRow] = await Promise.all([
      withRetry(() =>
        prisma.question.findMany({
          where: baseWhere,
          select: {
            id: true,
            questionType: true,
            difficulty: true,
            systemTag: true,
            categoryId: true,
            options: true,
            answerKey: true,
          },
          take: CANDIDATE_POOL,
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

    const schemaOk = candidates.filter(
      (c) => !validateQuestionPayload(c.questionType, c.options, c.answerKey),
    );
    if (schemaOk.length === 0 && candidates.length > 0) {
      productEvent("exam_pool_schema_all_invalid", { rawCandidates: candidates.length });
      return NextResponse.json(
        {
          error: "NO_ELIGIBLE_QUESTIONS",
          message:
            "No questions passed schema validation in the candidate pool. Fix invalid options/answerKey on published rows (see /api/admin/qa publishedQuestionSchemaValidation).",
          poolEmpty: true,
          rawCandidates: candidates.length,
        },
        { status: 422 },
      );
    }
    const pool = schemaOk.length > 0 ? schemaOk : candidates;

    const profile = profileRow ? parseLearningProfileRow(profileRow) : null;
    const signals = buildLearningSignals(profile);
    const readiness = computeReadiness(profile);
    const pickedIds = pickAdaptiveCatQuestionIds(pool, examFamily, POOL_LIMIT, signals);
    if (pickedIds.length === 0) {
      productEvent("exam_pool_empty_after_cat", {
        eligibleAfterSchema: schemaOk.length,
        rawCandidates: candidates.length,
      });
      return NextResponse.json(
        {
          error: "NO_ELIGIBLE_QUESTIONS",
          message:
            "Adaptive selection returned an empty pool (no questions after blueprint/CAT filters). Check published inventory for this country/tier and exam family.",
          poolEmpty: true,
          eligibleAfterSchema: schemaOk.length,
          rawCandidates: candidates.length,
        },
        { status: 422 },
      );
    }

    const questionPool = await withRetry(() =>
      prisma.question.findMany({
        where: { id: { in: pickedIds } },
        select: { id: true, stem: true, options: true, questionType: true },
      }),
    );
    const order = new Map(pickedIds.map((id, i) => [id, i]));
    questionPool.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));

    const catConfidence = readiness.confidence;
    const earlyStopping =
      readiness.band === "ready" &&
      readiness.score0to100 >= 70 &&
      (profile?.examScoreHistory.length ?? 0) >= 2
        ? {
            optionalMinQuestions: Math.max(12, Math.ceil(POOL_LIMIT * 0.7)),
            note: "High readiness: a shorter scored block may suffice; full session still supported.",
          }
        : null;

    const sessionMeta = {
      adaptive: {
        v: 1 as const,
        examFamily,
        targetDifficulty: signals.targetDifficulty,
        coldStart: profile === null,
        weakSystems: [...signals.weakSystems].slice(0, 6),
        readinessBand: readiness.band,
        readinessScore: readiness.score0to100,
        catConfidence,
        earlyStopping,
      },
    };

    const session = await prisma.examSession.create({
      data: {
        userId: gate.userId,
        examId,
        questionIds: questionPool.map((q) => q.id),
        answers: {},
        currentIndex: 0,
        status: ExamSessionStatus.IN_PROGRESS,
        sessionMeta,
      },
    });

    productEvent("exam_start", { total: questionPool.length });

    const questionIds = questionPool.map((q) => q.id);

    if (hydrate === "window") {
      return NextResponse.json({
        sessionId: session.id,
        examId,
        total: questionPool.length,
        questionIds,
        questions: questionPool.length ? [questionPool[0]] : [],
        poolEmpty: questionPool.length === 0,
        hydrate: "window" as const,
        adaptive: sessionMeta.adaptive,
      });
    }

    return NextResponse.json({
      sessionId: session.id,
      examId,
      total: questionPool.length,
      questionIds,
      questions: questionPool,
      poolEmpty: questionPool.length === 0,
      hydrate: "full" as const,
      adaptive: sessionMeta.adaptive,
    });
  } catch (e) {
    safeServerLogCritical("api_exams_start", "failed", {}, e);
    return NextResponse.json(
      { error: "Unable to start exam session. Try again shortly.", questions: [], total: 0, poolEmpty: true },
      { status: 503 },
    );
  }
}
