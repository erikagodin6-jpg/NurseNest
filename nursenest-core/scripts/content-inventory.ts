/**
 * Run: npx tsx scripts/content-inventory.ts
 * Requires DATABASE_URL. Outputs JSON inventory for gap analysis (no auto-publish).
 */
import { ContentStatus } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tiers = ["RPN", "LVN_LPN", "RN", "NP", "ALLIED"] as const;
  const families = ["NCLEX_RN", "NCLEX_PN", "REX_PN", "NP", "ALLIED", "GENERIC"] as const;

  const byTier = await Promise.all(
    tiers.map(async (tier) => ({
      tier,
      published: await prisma.question.count({ where: { status: ContentStatus.PUBLISHED, tier } }),
      draft: await prisma.question.count({ where: { status: ContentStatus.DRAFT, tier } }),
    })),
  );

  const byFamily = await Promise.all(
    families.map(async (examFamily) => ({
      examFamily,
      published: await prisma.question.count({ where: { status: ContentStatus.PUBLISHED, examFamily } }),
    })),
  );

  const rationaleMissing = await prisma.question.count({
    where: { status: ContentStatus.PUBLISHED, rationale: "" },
  });

  const categoryCounts = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          questions: { where: { status: ContentStatus.PUBLISHED } },
          flashcards: { where: { status: ContentStatus.PUBLISHED } },
        },
      },
    },
    take: 200,
  });

  const lowCategories = categoryCounts
    .filter((c) => c._count.questions < 5)
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      publishedQuestions: c._count.questions,
    }));

  const examsPublished = await prisma.exam.count({ where: { status: ContentStatus.PUBLISHED } });

  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      questionsPublished: await prisma.question.count({ where: { status: ContentStatus.PUBLISHED } }),
      questionsDraft: await prisma.question.count({ where: { status: ContentStatus.DRAFT } }),
      lessonsPublished: await prisma.lesson.count({ where: { status: ContentStatus.PUBLISHED } }),
      flashcardsPublished: await prisma.flashcard.count({ where: { status: ContentStatus.PUBLISHED } }),
      examsPublished,
    },
    byTier,
    byExamFamily: byFamily,
    dataQuality: {
      publishedQuestionsWithEmptyRationale: rationaleMissing,
    },
    risk: {
      categoriesWithUnder5Questions: lowCategories,
    },
    notes: [
      "Tier columns are direct Question.tier; learner APIs also apply accessibleTiersForUserTier() for ladder access.",
      "Gap remediation: import or draft in admin, validate, publish — never auto-publish from this script.",
    ],
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
