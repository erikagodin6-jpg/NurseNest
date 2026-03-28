import type { PrismaClient } from "@prisma/client";
import { ContentStatus } from "@prisma/client";
import { validateQuestionPayload } from "@/lib/content/question-schema";

export type PublishedSchemaAuditResult = {
  scanned: number;
  invalidCount: number;
  /** Up to `sampleLimit` IDs of PUBLISHED rows failing Zod shape validation (options/answerKey vs questionType). */
  invalidSampleIds: string[];
};

/**
 * Counts PUBLISHED questions whose stored JSON does not match `question-schema` (root cause for grading/CAT issues).
 * Does not modify data. Cap `take` to avoid OOM on huge catalogs.
 */
export async function auditPublishedQuestionSchema(
  prisma: PrismaClient,
  opts: { take?: number; sampleLimit?: number } = {},
): Promise<PublishedSchemaAuditResult> {
  const take = Math.min(Math.max(opts.take ?? 25_000, 1), 50_000);
  const sampleLimit = Math.min(Math.max(opts.sampleLimit ?? 40, 1), 200);

  const rows = await prisma.question.findMany({
    where: { status: ContentStatus.PUBLISHED },
    select: { id: true, questionType: true, options: true, answerKey: true },
    orderBy: { updatedAt: "desc" },
    take,
  });

  const invalidSampleIds: string[] = [];
  let invalidCount = 0;

  for (const r of rows) {
    const err = validateQuestionPayload(r.questionType, r.options, r.answerKey);
    if (err) {
      invalidCount += 1;
      if (invalidSampleIds.length < sampleLimit) invalidSampleIds.push(r.id);
    }
  }

  return {
    scanned: rows.length,
    invalidCount,
    invalidSampleIds,
  };
}
