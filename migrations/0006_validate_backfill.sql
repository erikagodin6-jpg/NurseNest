-- Validation: Compare row counts between base tables and translation tables
-- Run after backfill to verify data integrity

DO $$
DECLARE
  base_count integer;
  trans_count integer;
  mismatch boolean := false;
BEGIN
  SELECT COUNT(*) INTO base_count FROM exam_questions;
  SELECT COUNT(*) INTO trans_count FROM exam_question_translations WHERE locale = 'en';
  RAISE NOTICE 'exam_questions: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  SELECT COUNT(*) INTO base_count FROM content_items;
  SELECT COUNT(*) INTO trans_count FROM content_item_translations WHERE locale = 'en';
  RAISE NOTICE 'content_items: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  SELECT COUNT(*) INTO base_count FROM flashcard_bank;
  SELECT COUNT(*) INTO trans_count FROM flashcard_translations WHERE locale = 'en';
  RAISE NOTICE 'flashcard_bank: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  SELECT COUNT(*) INTO base_count FROM seo_pages;
  SELECT COUNT(*) INTO trans_count FROM seo_page_translations WHERE locale = 'en';
  RAISE NOTICE 'seo_pages: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  SELECT COUNT(*) INTO base_count FROM flashcard_decks;
  SELECT COUNT(*) INTO trans_count FROM flashcard_deck_translations WHERE locale = 'en';
  RAISE NOTICE 'flashcard_decks: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  SELECT COUNT(*) INTO base_count FROM qotd_history;
  SELECT COUNT(*) INTO trans_count FROM qotd_translations WHERE locale = 'en';
  RAISE NOTICE 'qotd_history: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_pages') THEN
    EXECUTE 'SELECT COUNT(*) FROM seo_hub_pages' INTO base_count;
    EXECUTE 'SELECT COUNT(*) FROM seo_hub_page_translations WHERE locale = ''en''' INTO trans_count;
    RAISE NOTICE 'seo_hub_pages: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
    IF base_count != trans_count THEN mismatch := true; END IF;
  ELSE
    RAISE NOTICE 'seo_hub_pages: table does not exist, skipped';
  END IF;

  SELECT COUNT(*) INTO base_count FROM clinical_seo_pages;
  SELECT COUNT(*) INTO trans_count FROM clinical_seo_page_translations WHERE locale = 'en';
  RAISE NOTICE 'clinical_seo_pages: base=%, translations=%, match=%', base_count, trans_count, (base_count = trans_count);
  IF base_count != trans_count THEN mismatch := true; END IF;

  IF mismatch THEN
    RAISE WARNING 'VALIDATION WARNING: Some row counts do not match. Check NOTICE output above.';
  ELSE
    RAISE NOTICE 'VALIDATION PASSED: All row counts match between base and translation tables.';
  END IF;
END $$;
