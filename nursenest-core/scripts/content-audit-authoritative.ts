/**
 * Authoritative content counts for migration / ops.
 * Run: `npx tsx scripts/content-audit-authoritative.ts` (requires DATABASE_URL).
 *
 * For production numbers, set DATABASE_URL to the production Postgres connection
 * (read-only recommended) and run locally or in CI.
 */
import { ContentStatus, CountryCode, TierCode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { questionBankWhereForProfile } from "../src/lib/entitlements/content-access-scope";

const prisma = new PrismaClient();

async function main() {
  const [
    lessonsTotal,
    lessonsByStatus,
    publishedLessonsEmptyBody,
    questionsTotal,
    questionsByStatus,
    questionsByTierPublished,
    questionsNeedsReviewPublished,
    questionsWithDuplicateOf,
    blogTotal,
    blogPublished,
  ] = await Promise.all([
    prisma.lesson.count(),
    prisma.lesson.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.lesson.count({
      where: { status: ContentStatus.PUBLISHED, body: { equals: "" } },
    }),
    prisma.question.count(),
    prisma.question.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.question.groupBy({
      by: ["tier"],
      where: { status: ContentStatus.PUBLISHED },
      _count: { _all: true },
    }),
    prisma.question.count({
      where: { status: ContentStatus.PUBLISHED, needsReview: true },
    }),
    prisma.question.count({ where: { duplicateOfId: { not: null } } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const allPublished = await prisma.lesson.count({ where: { status: ContentStatus.PUBLISHED } });
  /** Published rows whose body is empty after trim (authoritative for “empty content”). */
  const publishedEmptyBodyTrim = await prisma.$queryRaw<[{ n: bigint }]>`
    SELECT COUNT(*)::bigint AS n FROM "Lesson"
    WHERE status = 'PUBLISHED' AND (body IS NULL OR LENGTH(TRIM(body)) = 0)
  `.then((r) => Number(r[0]?.n ?? 0));

  const learnerPoolByProfile: Record<string, number> = {};
  for (const country of [CountryCode.CA, CountryCode.US]) {
    for (const tier of Object.values(TierCode)) {
      const key = `${country}/${tier}`;
      learnerPoolByProfile[key] = await prisma.question.count({
        where: questionBankWhereForProfile(country, tier),
      });
    }
  }

  const excluded = {
    byQuestionStatus: Object.fromEntries(
      questionsByStatus.map((g) => [g.status, g._count._all]),
    ),
    publishedButNeedsReview: questionsNeedsReviewPublished,
    rowsWithDuplicateOfId: questionsWithDuplicateOf,
    notes: [
      "Learner pool counts use questionBankWhereForProfile(country, tier): PUBLISHED + country + tier ladder (see content-access-scope.ts).",
      "Questions with needsReview=true may still be PUBLISHED; admin QA flags them.",
      "duplicateOfId links duplicates; primary row has duplicateOfId null.",
    ],
  };

  const report = {
    generatedAt: new Date().toISOString(),
    databaseUrlPresent: Boolean(process.env.DATABASE_URL?.trim()),
    lessons: {
      total: lessonsTotal,
      byStatus: Object.fromEntries(lessonsByStatus.map((g) => [g.status, g._count._all])),
      published: allPublished,
      draft: lessonsByStatus.find((g) => g.status === ContentStatus.DRAFT)?._count._all ?? 0,
      publishedEmptyBodyStrictEquals: publishedLessonsEmptyBody,
      publishedEmptyBodyAfterTrim: publishedEmptyBodyTrim,
    },
    questions: {
      total: questionsTotal,
      byStatus: Object.fromEntries(questionsByStatus.map((g) => [g.status, g._count._all])),
      publishedByTier: Object.fromEntries(
        questionsByTierPublished.map((g) => [g.tier, g._count._all]),
      ),
      learnerPoolUsableByCountryTier: learnerPoolByProfile,
      excluded,
    },
    blog: {
      totalRows: blogTotal,
      publishedRows: blogPublished,
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
