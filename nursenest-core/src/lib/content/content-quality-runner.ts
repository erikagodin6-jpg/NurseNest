import type { PrismaClient } from "@prisma/client";
import { analyzeFlashcardQuality } from "@/lib/content/flashcard-quality";
import { analyzeQuestionQuality, type QuestionQualityInput } from "@/lib/content/question-quality";

export type ValidateQuestionsOptions = {
  apply: boolean;
  strictTags?: boolean;
  markWeakRationale?: boolean;
  /** Cap rows scanned (safety for large DBs). */
  limit?: number;
};

export type QuestionValidationReportRow = {
  id: string;
  critical: string[];
  quality: string[];
  shouldFlagNeedsReview: boolean;
};

export type RunQuestionValidationResult = {
  scanned: number;
  flaggedForReview: number;
  updated: number;
  sample: QuestionValidationReportRow[];
};

function buildStemHashCounts(rows: { stemHash: string | null }[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const r of rows) {
    if (!r.stemHash) continue;
    m.set(r.stemHash, (m.get(r.stemHash) ?? 0) + 1);
  }
  return m;
}

export async function runQuestionValidation(
  prisma: PrismaClient,
  opts: ValidateQuestionsOptions,
): Promise<RunQuestionValidationResult> {
  const take = Math.min(Math.max(opts.limit ?? 5000, 1), 20000);
  const rows = await prisma.question.findMany({
    take,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      stem: true,
      rationale: true,
      questionType: true,
      options: true,
      answerKey: true,
      status: true,
      examFamily: true,
      difficulty: true,
      topicTag: true,
      systemTag: true,
      tags: true,
      lessonId: true,
      duplicateOfId: true,
      stemHash: true,
    },
  });

  const hashCounts = buildStemHashCounts(rows);
  const report: QuestionValidationReportRow[] = [];
  let updated = 0;
  let flaggedForReview = 0;

  for (const q of rows) {
    const input: QuestionQualityInput = {
      id: q.id,
      stem: q.stem,
      rationale: q.rationale,
      questionType: q.questionType,
      options: q.options,
      answerKey: q.answerKey,
      status: q.status,
      examFamily: q.examFamily,
      difficulty: q.difficulty,
      topicTag: q.topicTag,
      systemTag: q.systemTag,
      tags: q.tags,
      lessonId: q.lessonId,
      duplicateOfId: q.duplicateOfId,
      stemHash: q.stemHash,
    };
    const dupCount = q.stemHash ? hashCounts.get(q.stemHash) ?? 0 : 0;
    const res = analyzeQuestionQuality(input, {
      strictTags: opts.strictTags,
      markWeakRationale: opts.markWeakRationale,
      stemHashDuplicateCount: dupCount,
    });
    if (res.shouldFlagNeedsReview) {
      flaggedForReview += 1;
    }
    if (report.length < 25) {
      report.push({
        id: res.id,
        critical: res.critical,
        quality: res.quality,
        shouldFlagNeedsReview: res.shouldFlagNeedsReview,
      });
    }
    if (opts.apply && res.shouldFlagNeedsReview) {
      await prisma.question.update({
        where: { id: q.id },
        data: { needsReview: true },
      });
      updated += 1;
    }
  }

  return { scanned: rows.length, flaggedForReview, updated, sample: report };
}

export type FlashcardValidationReportRow = {
  id: string;
  critical: string[];
  quality: string[];
  shouldFlagNeedsReview: boolean;
};

export type RunFlashcardValidationResult = {
  scanned: number;
  flaggedForReview: number;
  updated: number;
  sample: FlashcardValidationReportRow[];
};

export async function runFlashcardValidation(
  prisma: PrismaClient,
  opts: { apply: boolean; limit?: number },
): Promise<RunFlashcardValidationResult> {
  const take = Math.min(Math.max(opts.limit ?? 5000, 1), 20000);
  const rows = await prisma.flashcard.findMany({
    take,
    orderBy: { updatedAt: "desc" },
    select: { id: true, front: true, back: true, status: true, lessonId: true },
  });

  const sample: FlashcardValidationReportRow[] = [];
  let flaggedForReview = 0;
  let updated = 0;

  for (const fc of rows) {
    const res = analyzeFlashcardQuality(fc);
    if (res.shouldFlagNeedsReview) flaggedForReview += 1;
    if (sample.length < 25) {
      sample.push({
        id: res.id,
        critical: res.critical,
        quality: res.quality,
        shouldFlagNeedsReview: res.shouldFlagNeedsReview,
      });
    }
    if (opts.apply && res.shouldFlagNeedsReview) {
      await prisma.flashcard.update({
        where: { id: fc.id },
        data: { needsReview: true },
      });
      updated += 1;
    }
  }

  return { scanned: rows.length, flaggedForReview, updated, sample };
}
