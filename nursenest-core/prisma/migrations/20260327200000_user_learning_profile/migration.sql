-- Aggregated learner performance for adaptive selection, readiness, and recommendations (single row per user).
CREATE TABLE "UserLearningProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aggregatesBySystem" JSONB NOT NULL DEFAULT '{}',
    "aggregatesByDifficulty" JSONB NOT NULL DEFAULT '{}',
    "aggregatesByCategory" JSONB NOT NULL DEFAULT '{}',
    "recentQuestionIds" JSONB NOT NULL DEFAULT '[]',
    "examScoreHistory" JSONB NOT NULL DEFAULT '[]',
    "totalPracticeAttempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLearningProfile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UserLearningProfile_userId_key" ON "UserLearningProfile"("userId");
CREATE INDEX "UserLearningProfile_userId_idx" ON "UserLearningProfile"("userId");

ALTER TABLE "UserLearningProfile" ADD CONSTRAINT "UserLearningProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Optional CAT / session metadata (deterministic client-visible hints, no heavy state).
ALTER TABLE "ExamSession" ADD COLUMN "sessionMeta" JSONB;
