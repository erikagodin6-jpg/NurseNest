-- Flashcard Bank Performance Indexes
-- These cover the filter patterns used by /api/flashcard-bank and /api/flashcards

-- Primary lookup: status + flashcard_enabled (every public flashcard query)
CREATE INDEX IF NOT EXISTS "idx_flashcard_bank_status_enabled"
  ON "flashcard_bank" USING btree ("status", "flashcard_enabled");--> statement-breakpoint

-- Source-type lookup: used by exam-flashcards view (cat_exam filter)
CREATE INDEX IF NOT EXISTS "idx_flashcard_bank_status_source_type_enabled"
  ON "flashcard_bank" USING btree ("status", "source_type", "flashcard_enabled")
  WHERE "flashcard_enabled" = true;--> statement-breakpoint

-- Tier filter: used alongside status in most queries
CREATE INDEX IF NOT EXISTS "idx_flashcard_bank_status_tier_enabled"
  ON "flashcard_bank" USING btree ("status", "tier", "flashcard_enabled")
  WHERE "flashcard_enabled" = true;--> statement-breakpoint

-- Category filter
CREATE INDEX IF NOT EXISTS "idx_flashcard_bank_category"
  ON "flashcard_bank" USING btree ("category")
  WHERE "status" = 'published' AND "flashcard_enabled" = true;--> statement-breakpoint

-- Static deck fetch: ORDER BY id uses the PK; ensure id is not just PK but also in covering index
-- (PK index already covers ORDER BY id; no extra index needed for that)

-- Admin review queue
CREATE INDEX IF NOT EXISTS "idx_flashcard_bank_status"
  ON "flashcard_bank" USING btree ("status");
