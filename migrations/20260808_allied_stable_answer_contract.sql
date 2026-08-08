-- Preserve legacy allied_questions.correct_answer integer for compatibility while
-- introducing the canonical stable-id answer contract used by new renderers.

ALTER TABLE IF EXISTS allied_questions
  ADD COLUMN IF NOT EXISTS correct_answer_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS option_contract_version integer NOT NULL DEFAULT 1;

COMMENT ON COLUMN allied_questions.correct_answer_ids IS
  'Canonical stable option id(s) for grading. Legacy correct_answer integer remains migration-only compatibility metadata.';
COMMENT ON COLUMN allied_questions.option_contract_version IS
  '1=legacy positional options; 2=stable option-id objects with correct_answer_ids.';
