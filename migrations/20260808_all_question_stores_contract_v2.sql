-- Universal question-contract sidecar.
-- This migration discovers question-definition tables and adds non-destructive canonical fields.
-- Legacy columns remain intact for compatibility while readers migrate to contract_* fields.

DO $$
DECLARE
  t record;
  has_stem boolean;
  has_options boolean;
  has_split_options boolean;
  has_answer boolean;
  has_structured_payload boolean;
BEGIN
  FOR t IN
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND (table_name = 'exam_questions' OR table_name LIKE '%question%')
  LOOP
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema='public' AND c.table_name=t.table_name
        AND c.column_name IN ('stem','question','question_text')
    ) INTO has_stem;

    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema='public' AND c.table_name=t.table_name
        AND c.column_name IN ('options','answer_options','choices')
    ) INTO has_options;

    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema='public' AND c.table_name=t.table_name
        AND c.column_name IN ('option_a','option_b','option_c','option_d')
    ) INTO has_split_options;

    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema='public' AND c.table_name=t.table_name
        AND c.column_name IN ('correct_answer','correct_index','answer_key','correct')
    ) INTO has_answer;

    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns c
      WHERE c.table_schema='public' AND c.table_name=t.table_name
        AND c.column_name IN ('ngn_payload','exhibit_data','interaction_payload','payload','answer_options')
    ) INTO has_structured_payload;

    IF has_stem AND ((has_options OR has_split_options) AND has_answer OR has_structured_payload) THEN
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_question_id text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_options jsonb NOT NULL DEFAULT ''[]''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_correct_answer_ids jsonb NOT NULL DEFAULT ''[]''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_interaction_payload jsonb NOT NULL DEFAULT ''{}''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_distractor_rationales jsonb NOT NULL DEFAULT ''{}''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_rationale text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_correct_answer_explanation text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_hint text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_why_this_matters text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_clinical_pearl text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_mnemonic text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_country_code text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_country_labels jsonb NOT NULL DEFAULT ''[]''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_region_scope text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_language_code text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_licensing_body text', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_unit_system_support jsonb NOT NULL DEFAULT ''{}''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_unit_variants jsonb NOT NULL DEFAULT ''[]''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS option_contract_version integer NOT NULL DEFAULT 1', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS publication_contract_version integer NOT NULL DEFAULT 1', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_status text NOT NULL DEFAULT ''unverified''', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_issues jsonb NOT NULL DEFAULT ''[]''::jsonb', t.table_name);
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS contract_verified_at timestamptz', t.table_name);

      EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (contract_status)', 'idx_' || t.table_name || '_contract_status', t.table_name);
      EXECUTE format('CREATE UNIQUE INDEX IF NOT EXISTS %I ON %I (contract_question_id) WHERE contract_question_id IS NOT NULL', 'idx_' || t.table_name || '_contract_qid', t.table_name);
    END IF;
  END LOOP;
END $$;

CREATE TABLE IF NOT EXISTS question_contract_store_registry (
  table_name text PRIMARY KEY,
  discovered_at timestamptz NOT NULL DEFAULT now(),
  last_audited_at timestamptz,
  total_rows bigint NOT NULL DEFAULT 0,
  verified_rows bigint NOT NULL DEFAULT 0,
  blocked_rows bigint NOT NULL DEFAULT 0,
  quality_only_rows bigint NOT NULL DEFAULT 0,
  schema_version integer NOT NULL DEFAULT 2,
  last_issue_counts jsonb NOT NULL DEFAULT '{}'::jsonb
);
