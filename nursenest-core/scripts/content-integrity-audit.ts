/**
 * Content integrity audit — read-only counts and gap hints.
 *
 * Run against the target database:
 *   cd nursenest-core && DATABASE_URL="postgresql://..." npx tsx scripts/content-integrity-audit.ts
 *
 * Outputs JSON to stdout (redirect to a file for records). Does not modify data.
 */
import { config } from "dotenv";
import { ContentStatus, ExamFamily, QuestionType, TierCode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { auditPublishedQuestionSchema } from "../src/lib/content/schema-validation-audit";

config({ path: ".env.local" });
config({ path: ".env" });

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    JSON.stringify(
      {
        error: "DATABASE_URL is not set",
        hint: "Run from nursenest-core with: DATABASE_URL=postgresql://... npm run content:integrity-audit",
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

const prisma = new PrismaClient();

const TIERS = [TierCode.RPN, TierCode.LVN_LPN, TierCode.RN, TierCode.NP, TierCode.ALLIED] as const;
const EXAM_FAMILIES = [
  ExamFamily.NCLEX_RN,
  ExamFamily.NCLEX_PN,
  ExamFamily.REX_PN,
  ExamFamily.NP,
  ExamFamily.ALLIED,
  ExamFamily.GENERIC,
] as const;
const Q_TYPES = [
  QuestionType.MCQ,
  QuestionType.SATA,
  QuestionType.NGN_CASE,
  QuestionType.ORDERING,
  QuestionType.FIB_NUMERIC,
] as const;

async function main() {
  const generatedAt = new Date().toISOString();

  const [
    lessonTotal,
    lessonPublished,
    lessonDraft,
    lessonInReview,
    lessonArchived,
    questionTotal,
    questionPublished,
    questionDraft,
    questionInReview,
    questionArchived,
    publishedEmptyRationale,
    flashPublished,
    examPublished,
    learnerPoolQuestions,
    publishedQuestionsFlaggedNeedsReview,
  ] = await Promise.all([
    prisma.lesson.count(),
    prisma.lesson.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.lesson.count({ where: { status: ContentStatus.DRAFT } }),
    prisma.lesson.count({ where: { status: ContentStatus.IN_REVIEW } }),
    prisma.lesson.count({ where: { status: ContentStatus.ARCHIVED } }),
    prisma.question.count(),
    prisma.question.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.question.count({ where: { status: ContentStatus.DRAFT } }),
    prisma.question.count({ where: { status: ContentStatus.IN_REVIEW } }),
    prisma.question.count({ where: { status: ContentStatus.ARCHIVED } }),
    prisma.question.count({ where: { status: ContentStatus.PUBLISHED, rationale: "" } }),
    prisma.flashcard.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.exam.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.question.count({ where: { status: ContentStatus.PUBLISHED, needsReview: false } }),
    prisma.question.count({ where: { status: ContentStatus.PUBLISHED, needsReview: true } }),
  ]);

  const lessonsByTier = await Promise.all(
    TIERS.map(async (tier) => ({
      tier,
      total: await prisma.lesson.count({ where: { tier } }),
      published: await prisma.lesson.count({ where: { tier, status: ContentStatus.PUBLISHED } }),
      draft: await prisma.lesson.count({ where: { tier, status: ContentStatus.DRAFT } }),
    })),
  );

  const questionsByTier = await Promise.all(
    TIERS.map(async (tier) => {
      const published = await prisma.question.count({ where: { tier, status: ContentStatus.PUBLISHED } });
      const draft = await prisma.question.count({ where: { tier, status: ContentStatus.DRAFT } });
      const learnerUsable = await prisma.question.count({
        where: { tier, status: ContentStatus.PUBLISHED, needsReview: false },
      });
      const needsReviewOnly = await prisma.question.count({
        where: { tier, status: ContentStatus.PUBLISHED, needsReview: true },
      });
      return {
        tier,
        total: published + draft,
        published,
        draft,
        learnerPoolPublishedNotNeedsReview: learnerUsable,
        publishedFlaggedNeedsReview: needsReviewOnly,
      };
    }),
  );

  const questionsByExamFamily = await Promise.all(
    EXAM_FAMILIES.map(async (examFamily) => ({
      examFamily,
      published: await prisma.question.count({ where: { examFamily, status: ContentStatus.PUBLISHED } }),
      draft: await prisma.question.count({ where: { examFamily, status: ContentStatus.DRAFT } }),
    })),
  );

  const questionsByType = await Promise.all(
    Q_TYPES.map(async (questionType) => ({
      questionType,
      published: await prisma.question.count({ where: { questionType, status: ContentStatus.PUBLISHED } }),
    })),
  );

  const lessonsMissingMeta = await prisma.lesson.count({
    where: {
      OR: [{ summary: "" }, { body: "" }, { categoryId: "" }],
    },
  });

  const questionsMissingMeta = await prisma.question.count({
    where: {
      OR: [
        { stem: "" },
        { rationale: "" },
        { categoryId: "" },
      ],
    },
  });

  const categoryRows = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          lessons: true,
          questions: true,
        },
      },
    },
    orderBy: { slug: "asc" },
    take: 500,
  });

  const publishedSchema = await auditPublishedQuestionSchema(prisma, { take: 25_000, sampleLimit: 80 });

  const [publishedLessonsEmptyBody, publishedLessonsNonEmptyBody, preNursingTagPublished] = await Promise.all([
    prisma.lesson.count({
      where: { status: ContentStatus.PUBLISHED, body: "" },
    }),
    prisma.lesson.count({
      where: { status: ContentStatus.PUBLISHED, NOT: { body: "" } },
    }),
    prisma.lesson.count({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [
          { tags: { has: "pre-nursing" } },
          { tags: { has: "pre_nursing" } },
          { title: { contains: "pre-nursing", mode: "insensitive" } },
          { title: { contains: "prenursing", mode: "insensitive" } },
        ],
      },
    }),
  ]);

  const report = {
    generatedAt,
    lessonBodyPresence: {
      note: "Whether learners can read full module text depends on UI route /app/lessons/[slug] and entitlement.",
      publishedWithEmptyBody: publishedLessonsEmptyBody,
      publishedWithNonEmptyBody: publishedLessonsNonEmptyBody,
    },
    preNursingAndFreeContentHints: {
      note: "No dedicated DB tier for pre-nursing; this counts published lessons tagged or titled like pre-nursing.",
      publishedLessonsMatchingPreNursingHeuristic: preNursingTagPublished,
    },
    publishedQuestionSchemaValidation: {
      note: "PUBLISHED rows failing Zod in src/lib/content/question-schema.ts — fix data or flag needsReview via content-quality validation.",
      ...publishedSchema,
    },
    schemaNote:
      "TierCode has RPN, LVN_LPN, RN, NP, ALLIED — there is no separate DB tier for 'pre-nursing' or 'new grad'; those are marketing labels.",
    totals: {
      lessons: {
        all: lessonTotal,
        published: lessonPublished,
        draft: lessonDraft,
        inReview: lessonInReview,
        archived: lessonArchived,
      },
      questions: {
        all: questionTotal,
        published: questionPublished,
        draft: questionDraft,
        inReview: questionInReview,
        archived: questionArchived,
      },
      /** Global learner bank (before country/tier filter in APIs): PUBLISHED && !needsReview */
      learnerPoolQuestionsGlobal: learnerPoolQuestions,
      /** Published but excluded from learner pool until cleared */
      publishedQuestionsExcludedNeedsReview: publishedQuestionsFlaggedNeedsReview,
      publishedQuestionsWithEmptyRationale: publishedEmptyRationale,
      flashcardsPublished: flashPublished,
      examsPublished: examPublished,
    },
    questionExclusionSummary: {
      notInLearnerPoolBecauseNotPublished: questionDraft + questionInReview + questionArchived,
      notInLearnerPoolBecauseNeedsReview: publishedQuestionsFlaggedNeedsReview,
      notInLearnerPoolBecauseInvalidSchema: publishedSchema.invalidCount,
      reasons: [
        "DRAFT / IN_REVIEW / ARCHIVED: never served to learners",
        "needsReview=true: hidden from learner pool (still visible to admin)",
        "invalidSchema: options/answerKey fail question-schema Zod (also flag via QA / content-quality)",
        "APIs further filter by user country + tier ladder (accessibleTiersForUserTier)",
      ],
    },
    lessonsByTier,
    questionsByTier,
    questionsByExamFamily,
    questionsByType,
    dataQuality: {
      lessonsWithEmptySummaryBodyOrCategory: lessonsMissingMeta,
      questionsWithEmptyStemRationaleOrCategory: questionsMissingMeta,
    },
    categories: categoryRows.map((c) => ({
      slug: c.slug,
      name: c.name,
      lessonCount: c._count.lessons,
      questionCount: c._count.questions,
    })),
    learnerExclusionRules: [
      "Learner APIs use status=PUBLISHED, country+tier ladder (accessibleTiersForUserTier), and needsReview=false for question bank pool.",
      "Admin sees PUBLISHED without needsReview filter for authoring.",
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
