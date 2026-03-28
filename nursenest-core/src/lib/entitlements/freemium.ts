import { FREEMIUM_LESSON_BUDGET, FREEMIUM_QUESTION_BUDGET } from "@/lib/conversion/constants";
import { prisma } from "@/lib/db";

export type FreemiumSnapshot = {
  questionRemaining: number;
  lessonRemaining: number;
};

export async function getFreemiumSnapshot(userId: string): Promise<FreemiumSnapshot | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { freeQuestionViews: true, freeLessonOpens: true },
  });
  if (!user) return null;
  return {
    questionRemaining: Math.max(0, FREEMIUM_QUESTION_BUDGET - user.freeQuestionViews),
    lessonRemaining: Math.max(0, FREEMIUM_LESSON_BUDGET - user.freeLessonOpens),
  };
}
