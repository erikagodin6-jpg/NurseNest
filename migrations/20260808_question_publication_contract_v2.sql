-- Canonical question-publication contract v2.
-- Additive only: no existing answer, stem, option, rationale, status, or locale data is rewritten here.
-- Data normalization/backfill is performed by the audited repair utility after deployment.

ALTER TABLE IF EXISTS exam_questions
  ADD COLUMN IF NOT EXISTS hint text,
  ADD COLUMN IF NOT EXISTS why_this_matters text,
  ADD COLUMN IF NOT EXISTS mnemonic text,
  ADD COLUMN IF NOT EXISTS unit_system_support jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS unit_variants jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE IF EXISTS allied_questions
  ADD COLUMN IF NOT EXISTS hint text,
  ADD COLUMN IF NOT EXISTS why_this_matters text,
  ADD COLUMN IF NOT EXISTS mnemonic text,
  ADD COLUMN IF NOT EXISTS country_code text,
  ADD COLUMN IF NOT EXISTS language_code text,
  ADD COLUMN IF NOT EXISTS licensing_body text,
  ADD COLUMN IF NOT EXISTS unit_system_support jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS unit_variants jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN exam_questions.unit_system_support IS
  'Question rendering unit support, e.g. {"supported":["SI","CONV"],"default":"SI"}. Does not contain grading state.';
COMMENT ON COLUMN exam_questions.unit_variants IS
  'Semantic measurement tokens with paired SI and conventional displays. Switching units must not change the answer contract.';
