import { NextResponse } from "next/server";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { prisma } from "@/lib/db";
import { buildLearningSignals } from "@/lib/learning/learning-signals";
import { parseLearningProfileRow } from "@/lib/learning/profile-shape";
import { computeReadiness } from "@/lib/learning/readiness";
import { buildRecommendations } from "@/lib/learning/recommendations";
import { buildStudyPath } from "@/lib/learning/study-path";
import { DIFFICULTY_TIER_LABELS } from "@/lib/learning/adaptive-study-order";
import {
  computeExamTrend,
  topStrongSystems,
  topWeakSystemsDetailed,
} from "@/lib/learning/performance-insights";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";

/**
 * Personalized readiness, recommendations, and study path (aggregated profile; cheap single-row read).
 */
export async function GET() {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  setSentryServerContext({ route: "/api/learning/snapshot", feature: "api", userId: gate.userId });

  try {
    const user = await prisma.user.findUnique({
      where: { id: gate.userId },
      select: { tier: true, examFocus: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const row = await prisma.userLearningProfile.findUnique({
      where: { userId: gate.userId },
      select: {
        aggregatesBySystem: true,
        aggregatesByDifficulty: true,
        aggregatesByCategory: true,
        recentQuestionIds: true,
        examScoreHistory: true,
        totalPracticeAttempts: true,
        updatedAt: true,
      },
    });

    const profile = row
      ? parseLearningProfileRow({
          aggregatesBySystem: row.aggregatesBySystem,
          aggregatesByDifficulty: row.aggregatesByDifficulty,
          aggregatesByCategory: row.aggregatesByCategory,
          recentQuestionIds: row.recentQuestionIds,
          examScoreHistory: row.examScoreHistory,
          totalPracticeAttempts: row.totalPracticeAttempts,
        })
      : null;

    const readiness = computeReadiness(profile);
    const recommendations = buildRecommendations(profile);
    const studyPath = buildStudyPath({
      tier: user.tier,
      examFamily: null,
      profile,
    });
    const signals = buildLearningSignals(profile);

    const insights = {
      strongSystems: topStrongSystems(profile),
      weakSystems: topWeakSystemsDetailed(profile),
      examTrend: computeExamTrend(profile),
    };

    return NextResponse.json({
      updatedAt: row?.updatedAt?.toISOString() ?? null,
      readiness,
      recommendations,
      studyPath,
      insights,
      signals: {
        targetDifficulty: signals.targetDifficulty,
        targetDifficultyTier: DIFFICULTY_TIER_LABELS[signals.targetDifficulty],
        weakSystems: [...signals.weakSystems].slice(0, 8),
        weakCategories: [...signals.weakCategories].slice(0, 8),
      },
      difficultyTiers: DIFFICULTY_TIER_LABELS,
      ngnStyleNote:
        "NGN-style complexity is driven by question type (e.g. NGN_CASE) plus difficulty tags on each item.",
    });
  } catch (e) {
    safeServerLogCritical("api_learning_snapshot", "failed", {}, e);
    return NextResponse.json({ error: "Unable to load learning snapshot" }, { status: 503 });
  }
}
