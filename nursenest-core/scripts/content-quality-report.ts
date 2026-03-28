/**
 * Run: npx tsx scripts/content-quality-report.ts
 * Requires DATABASE_URL (load from .env.local or .env via dotenv). Prints JSON: validation, coverage, blueprint gaps.
 */
import { config as loadEnv } from "dotenv";
import { ContentStatus, ExamFamily, type QuestionType } from "@prisma/client";

loadEnv({ path: ".env.local" });
loadEnv();
import { PrismaClient } from "@prisma/client";
import { EXAM_BLUEPRINT_TYPE_WEIGHTS } from "../src/lib/content/exam-blueprint";
import { runFlashcardValidation, runQuestionValidation } from "../src/lib/content/content-quality-runner";

const prisma = new PrismaClient();

const TIERS = ["RPN", "LVN_LPN", "RN", "NP", "ALLIED"] as const;

async function main() {
  const learnerBase = { status: ContentStatus.PUBLISHED, needsReview: false };

  const [publishedTotal, needsReviewQuestions, needsReviewFlashcards, byTier] = await Promise.all([
    prisma.question.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.question.count({ where: { needsReview: true } }),
    prisma.flashcard.count({ where: { needsReview: true } }),
    Promise.all(
      TIERS.map(async (tier) => ({
        tier,
        learnerPool: await prisma.question.count({ where: { ...learnerBase, tier } }),
        publishedAll: await prisma.question.count({ where: { status: ContentStatus.PUBLISHED, tier } }),
      })),
    ),
  ]);

  const bySystem = await prisma.question.groupBy({
    by: ["systemTag"],
    where: learnerBase,
    _count: { id: true },
  });
  const learnerTotal = await prisma.question.count({ where: learnerBase });
  const byType = await prisma.question.groupBy({
    by: ["questionType"],
    where: learnerBase,
    _count: { id: true },
  });
  const byFamily = await prisma.question.groupBy({
    by: ["examFamily"],
    where: learnerBase,
    _count: { id: true },
  });

  const typeMap = new Map<QuestionType, number>(
    byType.map((r) => [r.questionType, r._count.id]),
  );

  function blueprintGaps(family: ExamFamily) {
    const weights = EXAM_BLUEPRINT_TYPE_WEIGHTS[family] ?? EXAM_BLUEPRINT_TYPE_WEIGHTS.GENERIC;
    const out: { questionType: QuestionType; targetPct: number; actualPct: number; deltaPct: number }[] = [];
    if (learnerTotal === 0) return out;
    for (const [t, w] of Object.entries(weights)) {
      const qt = t as QuestionType;
      const targetPct = w * 100;
      const actual = typeMap.get(qt) ?? 0;
      const actualPct = (actual / learnerTotal) * 100;
      out.push({
        questionType: qt,
        targetPct: Math.round(targetPct * 10) / 10,
        actualPct: Math.round(actualPct * 10) / 10,
        deltaPct: Math.round((actualPct - targetPct) * 10) / 10,
      });
    }
    return out.sort((a, b) => Math.abs(b.deltaPct) - Math.abs(a.deltaPct));
  }

  const systemsSorted = bySystem
    .map((r) => ({
      systemTag: r.systemTag ?? "(untagged)",
      count: r._count.id,
      pctOfLearnerPool: learnerTotal ? Math.round((r._count.id / learnerTotal) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const underrepresented = systemsSorted.filter((s) => learnerTotal > 30 && s.pctOfLearnerPool < 3 && s.count > 0);
  const dominant = systemsSorted.filter((s) => learnerTotal > 30 && s.pctOfLearnerPool > 35);

  const validationQuestions = await runQuestionValidation(prisma, {
    apply: false,
    strictTags: false,
    markWeakRationale: false,
    limit: 20000,
  });
  const validationFlashcards = await runFlashcardValidation(prisma, { apply: false, limit: 20000 });

  const report = {
    generatedAt: new Date().toISOString(),
    workflow: {
      note:
        "Learner-visible pool = PUBLISHED && !needsReview. DRAFT/IN_REVIEW never in learner APIs. Admin override sees all published including needsReview.",
    },
    counts: {
      publishedQuestions: publishedTotal,
      needsReviewQuestions,
      needsReviewFlashcards,
      learnerEligibleQuestions: learnerTotal,
    },
    validationDryRun: {
      questionsScanned: validationQuestions.scanned,
      questionsWouldFlag: validationQuestions.flaggedForReview,
      flashcardsScanned: validationFlashcards.scanned,
      flashcardsWouldFlag: validationFlashcards.flaggedForReview,
    },
    coverageByTier: byTier,
    coverageByExamFamily: byFamily.map((r) => ({
      examFamily: r.examFamily,
      count: r._count.id,
    })),
    systemBalance: {
      topSystems: systemsSorted.slice(0, 15),
      underrepresentedHints: underrepresented,
      dominantHints: dominant,
    },
    blueprintVsPool: {
      NCLEX_RN: blueprintGaps(ExamFamily.NCLEX_RN),
      GENERIC: blueprintGaps(ExamFamily.GENERIC),
    },
  };

  console.log(JSON.stringify(report, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
