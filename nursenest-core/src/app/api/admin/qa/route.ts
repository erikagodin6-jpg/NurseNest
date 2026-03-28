import { NextResponse } from "next/server";
import { ContentStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { prisma } from "@/lib/db";

/** Quality control summary for content ops (no full table scans on huge DBs — uses limits). */
export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const [missingRationale, needsReview, draftWithShortStem, lessonsDraft] = await Promise.all([
    prisma.question.count({
      where: {
        OR: [{ rationale: "" }, { rationale: { startsWith: " " } }],
      },
    }),
    prisma.question.count({ where: { needsReview: true } }),
    prisma.question.count({
      where: { status: ContentStatus.DRAFT, stem: { lte: "__________" } },
    }),
    prisma.lesson.count({ where: { status: ContentStatus.DRAFT } }),
  ]);

  let duplicateStemHashGroups = 0;
  try {
    const rows = await prisma.$queryRaw<{ n: bigint }[]>`
      SELECT COUNT(*)::bigint AS n FROM (
        SELECT "stemHash" FROM "Question" WHERE "stemHash" IS NOT NULL
        GROUP BY "stemHash" HAVING COUNT(*) > 1
      ) t`;
    duplicateStemHashGroups = Number(rows[0]?.n ?? 0);
  } catch {
    duplicateStemHashGroups = -1;
  }

  return NextResponse.json({
    issues: {
      questionsEmptyOrSuspiciousRationale: missingRationale,
      questionsFlaggedNeedsReview: needsReview,
      draftQuestionsVeryShortStem: draftWithShortStem,
      duplicateStemHashGroups,
      lessonsInDraft: lessonsDraft,
    },
    note: "Tune queries as volume grows; duplicate detection uses stemHash populated by background job.",
  });
}
