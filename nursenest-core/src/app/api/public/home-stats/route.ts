import { NextResponse } from "next/server";
import {
  publicMarketingExamQuestionWhere,
  publicMarketingLessonWhere,
} from "@/lib/entitlements/content-access-scope";
import { prisma } from "@/lib/db";
import { withDatabaseFallback } from "@/lib/db/safe-database";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";

/** Public marketing stats — freemium-visible scope only (no full premium inventory). */
export async function GET() {
  try {
    const [totalLessons, questionCount] = await withDatabaseFallback(
      () =>
        Promise.all([
          prisma.contentItem.count({ where: publicMarketingLessonWhere() }),
          prisma.examQuestion.count({ where: publicMarketingExamQuestionWhere() }),
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
  } catch (e) {
    safeServerLogCritical("api_public_home_stats", "failed", {}, e);
    return NextResponse.json(
      {
        totalLessons: 0,
        questionCount: 0,
        totalFlashcards: 0,
        totalDecks: 0,
        storeProductCount: 0,
        degraded: true,
      },
      { status: 200 },
    );
  }
}
