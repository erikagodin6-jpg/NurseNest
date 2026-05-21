import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";

export type LearnerHubPublicSnapshot = {
  completedLessons: number;
  attemptCount: number;
  nextLessonTitle: string | null;
};

export async function loadLearnerHubSnapshot(userId: string): Promise<LearnerHubPublicSnapshot | null> {
  if (!userId || !isDatabaseUrlConfigured()) return null;
  try {
    const [progressCount, incomplete, attemptsN] = await Promise.all([
      prisma.progress.count({ where: { userId, completed: true } }),
      prisma.progress.findFirst({
        where: { userId, completed: false },
        orderBy: { updatedAt: "desc" },
        select: { lessonId: true },
      }),
      prisma.examAttempt.count({ where: { userId } }),
    ]);
    const lessonRow = incomplete?.lessonId
      ? await prisma.contentItem.findFirst({
          where: { id: incomplete.lessonId, type: "lesson" },
          select: { title: true },
        })
      : null;
    return {
      completedLessons: progressCount,
      attemptCount: attemptsN,
      nextLessonTitle: lessonRow?.title ?? null,
    };
  } catch {
    return null;
  }
}
