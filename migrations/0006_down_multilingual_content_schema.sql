-- Down Migration: Reverse Multilingual Content Schema Foundation (Phase 1)
-- Drops all translation tables and removes source_version columns
-- Does NOT delete the content_translations EAV table (preserved)

DROP TABLE IF EXISTS exam_question_translations CASCADE;
DROP TABLE IF EXISTS content_item_translations CASCADE;
DROP TABLE IF EXISTS flashcard_translations CASCADE;
DROP TABLE IF EXISTS seo_page_translations CASCADE;
DROP TABLE IF EXISTS flashcard_deck_translations CASCADE;
DROP TABLE IF EXISTS qotd_translations CASCADE;
DROP TABLE IF EXISTS seo_hub_page_translations CASCADE;
DROP TABLE IF EXISTS clinical_seo_page_translations CASCADE;

ALTER TABLE exam_questions DROP COLUMN IF EXISTS source_version;
ALTER TABLE content_items DROP COLUMN IF EXISTS source_version;
ALTER TABLE flashcard_bank DROP COLUMN IF EXISTS source_version;
ALTER TABLE flashcard_decks DROP COLUMN IF EXISTS source_version;
ALTER TABLE seo_pages DROP COLUMN IF EXISTS source_version;
ALTER TABLE clinical_seo_pages DROP COLUMN IF EXISTS source_version;
ALTER TABLE qotd_history DROP COLUMN IF EXISTS source_version;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_pages') THEN
    EXECUTE 'ALTER TABLE seo_hub_pages DROP COLUMN IF EXISTS source_version';
  END IF;
END $$;

DROP TYPE IF EXISTS translation_status_enum;
