import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withDatabaseFallback } from "@/lib/db/safe-database";

/** Public marketing stats — maps to `content_items` (lessons) and `exam_questions` only. */
export async function GET() {
  const [totalLessons, questionCount] = await withDatabaseFallback(
    () =>
      Promise.all([
        prisma.contentItem.count({ where: { type: "lesson" } }),
        prisma.examQuestion.count(),
      ]),
    [0, 0],
  );
  return NextResponse.json({
    totalLessons,
    questionCount,
    totalFlashcards: 0,
    totalDecks: 0,
    storeProductCount: 0,
  });
}
