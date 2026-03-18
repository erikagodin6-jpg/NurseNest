-- Backfill Migration: Populate translation tables with existing English content
-- Uses batch processing via DO blocks with configurable batch sizes
-- Must be run AFTER 0006_multilingual_content_schema.sql
-- Handles missing columns gracefully by using NULL for columns not in the actual DB

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
  has_case_context boolean;
  col_list text;
  sel_list text;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exam_questions' AND column_name = 'case_context'
  ) INTO has_case_context;

  col_list := 'content_id, locale, source_version, translation_status, translated_at, stem, scenario, options, rationale, correct_answer_explanation, distractor_rationales, incorrect_answer_rationale, clinical_pearl, exam_strategy, memory_hook, clinical_trap, clinical_reasoning, key_takeaway, mnemonic, case_context';
  
  IF has_case_context THEN
    sel_list := 'eq.id, ''en'', COALESCE(eq.source_version, 1), ''approved''::translation_status_enum, NOW(), eq.stem, eq.scenario, eq.options, eq.rationale, eq.correct_answer_explanation, eq.distractor_rationales, CASE WHEN eq.incorrect_answer_rationale IS NOT NULL THEN to_jsonb(eq.incorrect_answer_rationale) ELSE NULL END, eq.clinical_pearl, eq.exam_strategy, eq.memory_hook, eq.clinical_trap, eq.clinical_reasoning, eq.key_takeaway, eq.mnemonic, eq.case_context';
  ELSE
    sel_list := 'eq.id, ''en'', COALESCE(eq.source_version, 1), ''approved''::translation_status_enum, NOW(), eq.stem, eq.scenario, eq.options, eq.rationale, eq.correct_answer_explanation, eq.distractor_rationales, CASE WHEN eq.incorrect_answer_rationale IS NOT NULL THEN to_jsonb(eq.incorrect_answer_rationale) ELSE NULL END, eq.clinical_pearl, eq.exam_strategy, eq.memory_hook, eq.clinical_trap, eq.clinical_reasoning, eq.key_takeaway, eq.mnemonic, NULL';
  END IF;

  LOOP
    EXECUTE format(
      'INSERT INTO exam_question_translations (%s) SELECT %s FROM exam_questions eq WHERE NOT EXISTS (SELECT 1 FROM exam_question_translations t WHERE t.content_id = eq.id AND t.locale = ''en'') LIMIT %s',
      col_list, sel_list, batch_size
    );
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'exam_question_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO content_item_translations (content_id, locale, source_version, translation_status, translated_at,
      title, summary, content, seo_title, seo_description)
    SELECT ci.id, 'en', COALESCE(ci.source_version, 1), 'approved'::translation_status_enum, NOW(),
      ci.title, ci.summary, ci.content, ci.seo_title, ci.seo_description
    FROM content_items ci
    WHERE NOT EXISTS (
      SELECT 1 FROM content_item_translations t WHERE t.content_id = ci.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'content_item_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO flashcard_translations (content_id, locale, source_version, translation_status, translated_at,
      front, back, rationale_correct, clinical_takeaway, exam_pearl, options, distractor_rationales)
    SELECT fb.id, 'en', COALESCE(fb.source_version, 1), 'approved'::translation_status_enum, NOW(),
      fb.front, fb.back, fb.rationale_correct, fb.clinical_takeaway, fb.exam_pearl,
      fb.options, fb.distractor_rationales
    FROM flashcard_bank fb
    WHERE NOT EXISTS (
      SELECT 1 FROM flashcard_translations t WHERE t.content_id = fb.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'flashcard_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO seo_page_translations (content_id, locale, source_version, translation_status, translated_at,
      title, meta_title, meta_description, content_html, toc_json, faq_json)
    SELECT sp.id, 'en', COALESCE(sp.source_version, 1), 'approved'::translation_status_enum, NOW(),
      sp.title, sp.meta_title, sp.meta_description, sp.content_html, sp.toc_json, sp.faq_json
    FROM seo_pages sp
    WHERE NOT EXISTS (
      SELECT 1 FROM seo_page_translations t WHERE t.content_id = sp.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'seo_page_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO flashcard_deck_translations (content_id, locale, source_version, translation_status, translated_at,
      title, description)
    SELECT fd.id, 'en', COALESCE(fd.source_version, 1), 'approved'::translation_status_enum, NOW(),
      fd.title, fd.description
    FROM flashcard_decks fd
    WHERE NOT EXISTS (
      SELECT 1 FROM flashcard_deck_translations t WHERE t.content_id = fd.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'flashcard_deck_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO qotd_translations (content_id, locale, source_version, translation_status, translated_at,
      question_text, options, rationale)
    SELECT qh.id, 'en', COALESCE(qh.source_version, 1), 'approved'::translation_status_enum, NOW(),
      qh.question_text, qh.options, qh.rationale
    FROM qotd_history qh
    WHERE NOT EXISTS (
      SELECT 1 FROM qotd_translations t WHERE t.content_id = qh.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'qotd_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_pages') THEN
    RAISE NOTICE 'seo_hub_pages table does not exist, skipping backfill';
    RETURN;
  END IF;
  LOOP
    EXECUTE format(
      'INSERT INTO seo_hub_page_translations (content_id, locale, source_version, translation_status, translated_at, title, meta_title, meta_description, h1, content_sections, faq_items) SELECT shp.id, ''en'', COALESCE(shp.source_version, 1), ''approved''::translation_status_enum, NOW(), shp.title, shp.meta_title, shp.meta_description, shp.h1, shp.content_sections, shp.faq_items FROM seo_hub_pages shp WHERE NOT EXISTS (SELECT 1 FROM seo_hub_page_translations t WHERE t.content_id = shp.id AND t.locale = ''en'') LIMIT %s',
      batch_size
    );
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'seo_hub_page_translations backfilled: % rows', total_processed;
END $$;

DO $$
DECLARE
  batch_size integer := 1000;
  total_processed integer := 0;
  batch_count integer;
BEGIN
  LOOP
    INSERT INTO clinical_seo_page_translations (content_id, locale, source_version, translation_status, translated_at,
      title, meta_title, meta_description, summary, data)
    SELECT csp.id, 'en', COALESCE(csp.source_version, 1), 'approved'::translation_status_enum, NOW(),
      csp.title, csp.meta_title, csp.meta_description, csp.summary, csp.data
    FROM clinical_seo_pages csp
    WHERE NOT EXISTS (
      SELECT 1 FROM clinical_seo_page_translations t WHERE t.content_id = csp.id AND t.locale = 'en'
    )
    LIMIT batch_size;
    GET DIAGNOSTICS batch_count = ROW_COUNT;
    total_processed := total_processed + batch_count;
    EXIT WHEN batch_count < batch_size;
  END LOOP;
  RAISE NOTICE 'clinical_seo_page_translations backfilled: % rows', total_processed;
END $$;
