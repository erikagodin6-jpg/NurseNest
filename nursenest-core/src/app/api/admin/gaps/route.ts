import { NextResponse } from "next/server";
import { ContentStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { prisma } from "@/lib/db";

const LOW_THRESHOLD = 20;

/** Coverage gaps: categories with few published questions / lessons without flashcards. */
export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          questions: { where: { status: ContentStatus.PUBLISHED } },
          lessons: { where: { status: ContentStatus.PUBLISHED } },
          flashcards: { where: { status: ContentStatus.PUBLISHED } },
        },
      },
    },
    take: 200,
  });

  const lowQuestionCategories = categories
    .filter((c) => c._count.questions < LOW_THRESHOLD)
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      publishedQuestions: c._count.questions,
    }));

  const lessonsWithoutFlashcards = await prisma.lesson.count({
    where: {
      status: ContentStatus.PUBLISHED,
      flashcards: { none: { status: ContentStatus.PUBLISHED } },
    },
  });

  const examsPerFamily = await prisma.exam.groupBy({
    by: ["examFamily"],
    _count: { examFamily: true },
    where: { status: ContentStatus.PUBLISHED },
  });

  return NextResponse.json({
    lowQuestionCategories,
    lessonsPublishedWithoutFlashcards: lessonsWithoutFlashcards,
    publishedExamsByFamily: examsPerFamily,
    thresholds: { lowQuestionCount: LOW_THRESHOLD },
  });
}
