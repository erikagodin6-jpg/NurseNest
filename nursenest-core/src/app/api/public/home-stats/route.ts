import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** Public homepage aggregates; no auth. Cached briefly at CDN if configured. */
export async function GET() {
  try {
    const [totalLessons, questionCount] = await Promise.all([
      prisma.lesson.count({ where: { published: true } }),
      prisma.question.count({ where: { published: true } }),
    ]);

    return NextResponse.json({
      totalLessons,
      questionCount,
      totalFlashcards: 10_000,
      totalDecks: 140,
      storeProductCount: 0,
    });
  } catch {
    return NextResponse.json(
      {
        totalLessons: 0,
        questionCount: 0,
        totalFlashcards: 10_000,
        totalDecks: 140,
        storeProductCount: 0,
      },
      { status: 200 },
    );
  }
}
