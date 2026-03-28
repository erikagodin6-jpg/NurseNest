-- Flashcard quality gate (align with Question.needsReview)
ALTER TABLE "Flashcard" ADD COLUMN "needsReview" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Flashcard_needsReview_status_idx" ON "Flashcard"("needsReview", "status");
CREATE INDEX "Question_needsReview_status_idx" ON "Question"("needsReview", "status");
