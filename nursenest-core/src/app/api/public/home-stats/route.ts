import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** Public marketing stats — maps to `content_items` (lessons) and `exam_questions` only. */
export async function GET() {
  try {
    const [totalLessons, questionCount] = await Promise.all([
      prisma.contentItem.count({ where: { type: "lesson" } }),
      prisma.examQuestion.count(),
    ]);
    return NextResponse.json({
      totalLessons,
      questionCount,
      totalFlashcards: 0,
      totalDecks: 0,
      storeProductCount: 0,
    });
  } catch {
    return NextResponse.json(
      {
        totalLessons: 0,
        questionCount: 0,
        totalFlashcards: 0,
        totalDecks: 0,
        storeProductCount: 0,
      },
      { status: 200 },
    );
  }
}
