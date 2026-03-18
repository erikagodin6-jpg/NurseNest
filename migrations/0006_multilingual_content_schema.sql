-- Migration: Multilingual Content Schema Foundation (Phase 1)
-- Creates translation_status_enum, adds source_version to base tables,
-- creates per-content-type translation tables, and backfills English content.

-- Step 1: Create the translation_status enum
DO $$ BEGIN
  CREATE TYPE translation_status_enum AS ENUM (
    'missing', 'draft', 'machine_translated', 'human_review_needed',
    'reviewed', 'approved', 'stale', 'rejected'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Step 2: Add source_version to base content tables
ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE content_items ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE flashcard_bank ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE flashcard_decks ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE clinical_seo_pages ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;
ALTER TABLE qotd_history ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_pages') THEN
    EXECUTE 'ALTER TABLE seo_hub_pages ADD COLUMN IF NOT EXISTS source_version integer NOT NULL DEFAULT 1';
  END IF;
END $$;

-- Step 3: Create translation tables

CREATE TABLE IF NOT EXISTS exam_question_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES exam_questions(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  stem text,
  scenario text,
  options jsonb,
  rationale text,
  correct_answer_explanation text,
  distractor_rationales jsonb,
  incorrect_answer_rationale jsonb,
  clinical_pearl text,
  exam_strategy text,
  memory_hook text,
  clinical_trap text,
  clinical_reasoning text,
  key_takeaway text,
  mnemonic text,
  case_context text,
  hints jsonb
);

CREATE TABLE IF NOT EXISTS content_item_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES content_items(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  title text,
  summary text,
  content jsonb,
  seo_title text,
  seo_description text
);

CREATE TABLE IF NOT EXISTS flashcard_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES flashcard_bank(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  front text,
  back text,
  rationale_correct text,
  clinical_takeaway text,
  exam_pearl text,
  options jsonb,
  distractor_rationales jsonb
);

CREATE TABLE IF NOT EXISTS seo_page_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES seo_pages(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  title text,
  meta_title text,
  meta_description text,
  content_html text,
  toc_json jsonb,
  faq_json jsonb
);

CREATE TABLE IF NOT EXISTS flashcard_deck_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES flashcard_decks(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  title text,
  description text
);

CREATE TABLE IF NOT EXISTS qotd_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES qotd_history(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  question_text text,
  options jsonb,
  rationale text
);

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_pages') THEN
    EXECUTE '
      CREATE TABLE IF NOT EXISTS seo_hub_page_translations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id varchar NOT NULL REFERENCES seo_hub_pages(id),
        locale text NOT NULL,
        source_version integer NOT NULL DEFAULT 1,
        translation_status translation_status_enum NOT NULL DEFAULT ''missing'',
        created_at timestamp NOT NULL DEFAULT NOW(),
        updated_at timestamp NOT NULL DEFAULT NOW(),
        translated_at timestamp,
        reviewed_at timestamp,
        title text,
        meta_title text,
        meta_description text,
        h1 text,
        content_sections jsonb,
        faq_items jsonb
      )';
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS clinical_seo_page_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id varchar NOT NULL REFERENCES clinical_seo_pages(id),
  locale text NOT NULL,
  source_version integer NOT NULL DEFAULT 1,
  translation_status translation_status_enum NOT NULL DEFAULT 'missing',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  translated_at timestamp,
  reviewed_at timestamp,
  title text,
  meta_title text,
  meta_description text,
  summary text,
  data jsonb
);

-- Step 4: Create unique constraints and indexes

CREATE UNIQUE INDEX IF NOT EXISTS exam_question_translations_content_locale_idx ON exam_question_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS exam_question_translations_locale_status_idx ON exam_question_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS exam_question_translations_status_stale_idx ON exam_question_translations (translation_status) WHERE translation_status = 'stale';

CREATE UNIQUE INDEX IF NOT EXISTS content_item_translations_content_locale_idx ON content_item_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS content_item_translations_locale_status_idx ON content_item_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS content_item_translations_status_stale_idx ON content_item_translations (translation_status) WHERE translation_status = 'stale';

CREATE UNIQUE INDEX IF NOT EXISTS flashcard_translations_content_locale_idx ON flashcard_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS flashcard_translations_locale_status_idx ON flashcard_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS flashcard_translations_status_stale_idx ON flashcard_translations (translation_status) WHERE translation_status = 'stale';

CREATE UNIQUE INDEX IF NOT EXISTS seo_page_translations_content_locale_idx ON seo_page_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS seo_page_translations_locale_status_idx ON seo_page_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS seo_page_translations_status_stale_idx ON seo_page_translations (translation_status) WHERE translation_status = 'stale';

CREATE UNIQUE INDEX IF NOT EXISTS flashcard_deck_translations_content_locale_idx ON flashcard_deck_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS flashcard_deck_translations_locale_status_idx ON flashcard_deck_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS flashcard_deck_translations_status_stale_idx ON flashcard_deck_translations (translation_status) WHERE translation_status = 'stale';

CREATE UNIQUE INDEX IF NOT EXISTS qotd_translations_content_locale_idx ON qotd_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS qotd_translations_locale_status_idx ON qotd_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS qotd_translations_status_stale_idx ON qotd_translations (translation_status) WHERE translation_status = 'stale';

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'seo_hub_page_translations') THEN
    EXECUTE 'CREATE UNIQUE INDEX IF NOT EXISTS seo_hub_page_translations_content_locale_idx ON seo_hub_page_translations (content_id, locale)';
    EXECUTE 'CREATE INDEX IF NOT EXISTS seo_hub_page_translations_locale_status_idx ON seo_hub_page_translations (locale, translation_status)';
    EXECUTE 'CREATE INDEX IF NOT EXISTS seo_hub_page_translations_status_stale_idx ON seo_hub_page_translations (translation_status) WHERE translation_status = ''stale''';
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS clinical_seo_page_translations_content_locale_idx ON clinical_seo_page_translations (content_id, locale);
CREATE INDEX IF NOT EXISTS clinical_seo_page_translations_locale_status_idx ON clinical_seo_page_translations (locale, translation_status);
CREATE INDEX IF NOT EXISTS clinical_seo_page_translations_status_stale_idx ON clinical_seo_page_translations (translation_status) WHERE translation_status = 'stale';
