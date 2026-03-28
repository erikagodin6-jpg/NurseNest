import type { Prisma, QuestionType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { answerMatches } from "@/lib/exams/score-session-answers";
import {
  difficultyKey,
  mergeBucket,
  type ExamHistoryEntry,
  type ParsedLearningProfile,
  parseLearningProfileRow,
} from "@/lib/learning/profile-shape";

type QuestionRow = {
  id: string;
  categoryId: string;
  systemTag: string | null;
  difficulty: import("@prisma/client").DifficultyBand | null;
  questionType: QuestionType;
  answerKey: Prisma.JsonValue;
};

function serializeProfile(p: ParsedLearningProfile): {
  aggregatesBySystem: Prisma.InputJsonValue;
  aggregatesByDifficulty: Prisma.InputJsonValue;
  aggregatesByCategory: Prisma.InputJsonValue;
  recentQuestionIds: Prisma.InputJsonValue;
  examScoreHistory: Prisma.InputJsonValue;
  totalPracticeAttempts: number;
} {
  return {
    aggregatesBySystem: p.aggregatesBySystem as Prisma.InputJsonValue,
    aggregatesByDifficulty: p.aggregatesByDifficulty as Prisma.InputJsonValue,
    aggregatesByCategory: p.aggregatesByCategory as Prisma.InputJsonValue,
    recentQuestionIds: p.recentQuestionIds as Prisma.InputJsonValue,
    examScoreHistory: p.examScoreHistory as Prisma.InputJsonValue,
    totalPracticeAttempts: p.totalPracticeAttempts,
  };
}

function mergeQuestionAttempt(
  profile: ParsedLearningProfile,
  q: QuestionRow,
  userAnswer: unknown,
  responseMs: number,
): void {
  const correct = answerMatches(q.questionType, q.answerKey, userAnswer);
  const sys = (q.systemTag ?? "__na__").toLowerCase();
  const cat = q.categoryId;
  const dk = difficultyKey(q.difficulty);

  profile.aggregatesBySystem[sys] = mergeBucket(profile.aggregatesBySystem[sys], correct, responseMs);
  profile.aggregatesByCategory[cat] = mergeBucket(profile.aggregatesByCategory[cat], correct, responseMs);
  profile.aggregatesByDifficulty[dk] = mergeBucket(profile.aggregatesByDifficulty[dk], correct, responseMs);
  profile.totalPracticeAttempts += 1;
}

function pushRecent(profile: ParsedLearningProfile, ids: string[]) {
  const next = [...ids, ...profile.recentQuestionIds];
  const seen = new Set<string>();
  const dedup: string[] = [];
  for (const id of next) {
    if (seen.has(id)) continue;
    seen.add(id);
    dedup.push(id);
    if (dedup.length >= 90) break;
  }
  profile.recentQuestionIds = dedup;
}

function pushExamHistory(profile: ParsedLearningProfile, score: number, total: number) {
  const entry: ExamHistoryEntry = {
    at: new Date().toISOString(),
    score,
    total,
  };
  profile.examScoreHistory = [...profile.examScoreHistory, entry].slice(-25);
}

/**
 * Persists per-question aggregates + exam history after a graded mock. Idempotent callers should only invoke once per completed session.
 */
export async function recordExamPerformance(args: {
  userId: string;
  questionIds: string[];
  answers: Record<string, unknown>;
  score: number;
  total: number;
  /** Optional per-question timing from client later; keyed by question id. */
  timingsMs?: Record<string, number>;
}): Promise<void> {
  const { userId, questionIds, answers, score, total } = args;
  if (questionIds.length === 0) {
    await appendExamHistoryOnly(userId, score, total);
    return;
  }

  const qs = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: {
      id: true,
      categoryId: true,
      systemTag: true,
      difficulty: true,
      questionType: true,
      answerKey: true,
    },
  });
  const byId = new Map(qs.map((q) => [q.id, q]));

  await prisma.$transaction(async (tx) => {
    const existing = await tx.userLearningProfile.findUnique({ where: { userId } });
    const base = existing
      ? parseLearningProfileRow(existing)
      : parseLearningProfileRow({
          aggregatesBySystem: {},
          aggregatesByDifficulty: {},
          aggregatesByCategory: {},
          recentQuestionIds: [],
          examScoreHistory: [],
          totalPracticeAttempts: 0,
        });

    for (const qid of questionIds) {
      const q = byId.get(qid);
      if (!q) continue;
      const ms = args.timingsMs?.[qid] ?? 0;
      mergeQuestionAttempt(base, q, answers[qid], ms);
    }
    pushRecent(base, questionIds);
    pushExamHistory(base, score, total);

    const payload = serializeProfile(base);
    await tx.userLearningProfile.upsert({
      where: { userId },
      create: { userId, ...payload },
      update: payload,
    });
  });
}

export async function appendExamHistoryOnly(userId: string, score: number, total: number): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.userLearningProfile.findUnique({ where: { userId } });
    const base = existing
      ? parseLearningProfileRow(existing)
      : parseLearningProfileRow({
          aggregatesBySystem: {},
          aggregatesByDifficulty: {},
          aggregatesByCategory: {},
          recentQuestionIds: [],
          examScoreHistory: [],
          totalPracticeAttempts: 0,
        });
    pushExamHistory(base, score, total);
    const payload = serializeProfile(base);
    await tx.userLearningProfile.upsert({
      where: { userId },
      create: { userId, ...payload },
      update: { examScoreHistory: payload.examScoreHistory },
    });
  });
}
