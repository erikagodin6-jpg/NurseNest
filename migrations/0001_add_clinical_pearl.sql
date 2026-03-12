ALTER TABLE "deck_flashcards" ADD COLUMN IF NOT EXISTS "clinical_pearl" text;
--> statement-breakpoint
ALTER TABLE "allied_flashcards" ADD COLUMN IF NOT EXISTS "clinical_pearl" text;
