-- Canonical translation contract for exam questions.
-- Translation must preserve stable grading/interaction identity while localizing learner-facing text.

ALTER TABLE IF EXISTS exam_question_translations
  ADD COLUMN IF NOT EXISTS contract_options jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_interaction_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_distractor_rationales jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_correct_answer_explanation text,
  ADD COLUMN IF NOT EXISTS contract_hint text,
  ADD COLUMN IF NOT EXISTS contract_why_this_matters text,
  ADD COLUMN IF NOT EXISTS contract_clinical_pearl text,
  ADD COLUMN IF NOT EXISTS contract_mnemonic text,
  ADD COLUMN IF NOT EXISTS contract_country_labels jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_unit_system_support jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_unit_variants jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS publication_contract_version integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS contract_status text NOT NULL DEFAULT 'unverified',
  ADD COLUMN IF NOT EXISTS contract_issues jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS contract_verified_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_exam_question_translations_contract_status
  ON exam_question_translations(contract_status);
CREATE INDEX IF NOT EXISTS idx_exam_question_translations_locale_contract
  ON exam_question_translations(locale, contract_status);
