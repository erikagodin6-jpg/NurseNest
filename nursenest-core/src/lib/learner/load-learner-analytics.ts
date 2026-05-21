import "server-only";

import { ExamSessionStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";
import { withDatabaseFallback } from "@/lib/db/safe-database";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { answerMatches } from "@/lib/exams/score-session-answers";
import {
  mergeDimensionBuckets,
  normalizeClientNeedLabel,
  pickWeakStrong,
  projectedPassProbabilityPercent,
  readinessScoreFromAttempts,
  studyStreakFromDates,
  trendPercentsFromAttempts,
  type AttemptPoint,
  type DimensionBucket,
} from "@/lib/learner/learner-analytics-math";

export type ActivityItem = {
  id: string;
  kind: "exam_attempt" | "lesson_progress" | "exam_session";
  title: string;
  detail: string;
  at: Date;
};

export type LearnerAnalyticsModel = {
  loadingFailed: boolean;
  attemptPoints: AttemptPoint[];
  readinessScore: number | null;
  passProbabilityPercent: number | null;
  trendPercents: (number | null)[];
  streakDays: number;
  bodySystems: DimensionBucket[];
  clientNeeds: DimensionBucket[];
  cognitiveLevels: DimensionBucket[];
  weak: ReturnType<typeof pickWeakStrong>["weak"];
  strong: ReturnType<typeof pickWeakStrong>["strong"];
  recentActivity: ActivityItem[];
  completedLessons: number;
  nextLessonTitle: string | null;
  sessionBreakdownSampleSize: number;
};

const emptyModel: LearnerAnalyticsModel = {
  loadingFailed: false,
  attemptPoints: [],
  readinessScore: null,
  passProbabilityPercent: null,
  trendPercents: [],
  streakDays: 0,
  bodySystems: [],
  clientNeeds: [],
  cognitiveLevels: [],
  weak: [],
  strong: [],
  recentActivity: [],
  completedLessons: 0,
  nextLessonTitle: null,
  sessionBreakdownSampleSize: 0,
};

export async function loadLearnerAnalytics(userId: string, entitlement: AccessScope): Promise<LearnerAnalyticsModel> {
  if (!userId || !isDatabaseUrlConfigured()) return { ...emptyModel, loadingFailed: !userId };

  const result = await withDatabaseFallback(async () => {
    const [attemptRows, sessionRows, progressDone, progressOpen, progressRecent] = await Promise.all([
      prisma.examAttempt.findMany({
        where: { userId },
        select: { score: true, total: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 24,
      }),
      entitlement.hasAccess
        ? prisma.examSession.findMany({
            where: { userId, status: ExamSessionStatus.COMPLETED },
            select: { id: true, questionIds: true, answers: true, updatedAt: true },
            orderBy: { updatedAt: "desc" },
            take: 14,
          })
        : Promise.resolve([]),
      prisma.progress.count({ where: { userId, completed: true } }),
      prisma.progress.findFirst({
        where: { userId, completed: false },
        orderBy: { updatedAt: "desc" },
        select: { lessonId: true },
      }),
      prisma.progress.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: 12,
        select: { lessonId: true, completed: true, updatedAt: true },
      }),
    ]);

    const attemptPoints: AttemptPoint[] = [...attemptRows]
      .reverse()
      .map((a) => ({ score: a.score, total: a.total, at: a.createdAt }));
    const readinessScore = readinessScoreFromAttempts(attemptPoints);
    const passProbabilityPercent = projectedPassProbabilityPercent(readinessScore);
    const trendPercents = trendPercentsFromAttempts(attemptPoints);

    const lessonTitleCache = new Map<string, string>();
    async function lessonTitle(id: string): Promise<string> {
      const hit = lessonTitleCache.get(id);
      if (hit) return hit;
      const row = await prisma.contentItem.findFirst({
        where: { id, type: "lesson" },
        select: { title: true },
      });
      const t = row?.title ?? "Lesson";
      lessonTitleCache.set(id, t);
      return t;
    }

    let nextLessonTitle: string | null = null;
    if (progressOpen?.lessonId) {
      nextLessonTitle = await lessonTitle(progressOpen.lessonId);
    }

    const body: DimensionBucket[] = [];
    const client: DimensionBucket[] = [];
    const cog: DimensionBucket[] = [];
    let sessionBreakdownSampleSize = 0;

    if (entitlement.hasAccess) {
      for (const s of sessionRows) {
        const ids = s.questionIds as string[];
        const answers = (s.answers ?? {}) as Record<string, unknown>;
        if (!Array.isArray(ids) || ids.length === 0) continue;

        const qs = await prisma.examQuestion.findMany({
          where: { AND: [{ id: { in: ids } }, questionAccessWhere(entitlement)] },
          select: {
            id: true,
            correctAnswer: true,
            questionType: true,
            bodySystem: true,
            topic: true,
            cognitiveLevel: true,
            tags: true,
          },
        });
        const byId = new Map(qs.map((q) => [q.id, q]));
        for (const qid of ids) {
          const q = byId.get(qid);
          if (!q) continue;
          sessionBreakdownSampleSize += 1;
          const ok = answerMatches(q.questionType, q.correctAnswer, answers[q.id]);
          const bs = (q.bodySystem ?? "").trim() || "Unspecified";
          const cl = (q.cognitiveLevel ?? "").trim() || "Unspecified";
          const cn = normalizeClientNeedLabel(q.topic, q.tags ?? []);
          const inc = ok ? 1 : 0;
          body.push({ label: bs, correct: inc, total: 1 });
          client.push({ label: cn, correct: inc, total: 1 });
          cog.push({ label: cl, correct: inc, total: 1 });
        }
      }
    }

    const activity: ActivityItem[] = [];
    for (const a of attemptRows.slice(0, 8)) {
      activity.push({
        id: `att-${a.createdAt.toISOString()}`,
        kind: "exam_attempt",
        title: "Practice exam attempt",
        detail: `${a.score}/${a.total} items correct`,
        at: a.createdAt,
      });
    }
    for (const p of progressRecent) {
      if (!p.completed) continue;
      activity.push({
        id: `prog-${p.lessonId}-${p.updatedAt.toISOString()}`,
        kind: "lesson_progress",
        title: await lessonTitle(p.lessonId),
        detail: "Lesson marked complete",
        at: p.updatedAt,
      });
    }
    for (const s of sessionRows.slice(0, 5)) {
      activity.push({
        id: `sess-${s.id}`,
        kind: "exam_session",
        title: "Exam session graded",
        detail: "Performance mapped to domains",
        at: s.updatedAt,
      });
    }
    activity.sort((x, y) => y.at.getTime() - x.at.getTime());

    const streakDates: Date[] = [
      ...attemptRows.map((a) => a.createdAt),
      ...progressRecent.filter((p) => p.completed).map((p) => p.updatedAt),
    ];
    const streakDays = studyStreakFromDates(streakDates);

    const bodySystems = mergeDimensionBuckets(body);
    const clientNeeds = mergeDimensionBuckets(client);
    const cognitiveLevels = mergeDimensionBuckets(cog);
    const pool = [...bodySystems, ...clientNeeds, ...cognitiveLevels];
    const { weak, strong } = pickWeakStrong(pool, 4);

    return {
      loadingFailed: false,
      attemptPoints,
      readinessScore,
      passProbabilityPercent,
      trendPercents,
      streakDays,
      bodySystems,
      clientNeeds,
      cognitiveLevels,
      weak,
      strong,
      recentActivity: activity.slice(0, 14),
      completedLessons: progressDone,
      nextLessonTitle,
      sessionBreakdownSampleSize,
    };
  }, { ...emptyModel, loadingFailed: true });

  return result;
}
