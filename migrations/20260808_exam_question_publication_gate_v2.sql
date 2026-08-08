-- Prevent new/updated published exam_questions from bypassing the canonical question contract.
-- Existing published rows are not rewritten by this migration; run the estate repair before re-publishing them.

CREATE OR REPLACE FUNCTION nursenest_exam_question_publish_guard()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  opt jsonb;
  opt_id text;
  answer_ids text[] := ARRAY[]::text[];
  correct_raw jsonb;
  distractor_map jsonb := COALESCE(NEW.distractor_rationales, '{}'::jsonb);
  missing_rationale boolean := false;
  support jsonb := COALESCE(NEW.unit_system_support, '{}'::jsonb);
  variants jsonb := COALESCE(NEW.unit_variants, '[]'::jsonb);
  combined_text text := COALESCE(NEW.stem, '') || ' ' || COALESCE(NEW.options::text, '');
  has_si boolean := false;
  has_conv boolean := false;
BEGIN
  IF COALESCE(NEW.status, 'draft') <> 'published' THEN
    RETURN NEW;
  END IF;

  IF NEW.id IS NULL OR length(trim(NEW.id)) < 3 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: stable question id required';
  END IF;
  IF NEW.stem IS NULL OR length(trim(NEW.stem)) < 10 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: substantive stem required';
  END IF;
  IF NEW.options IS NULL OR jsonb_typeof(NEW.options) <> 'array' OR jsonb_array_length(NEW.options) < 2 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: options must be a non-empty JSON array';
  END IF;

  -- Canonical persisted options must be objects with unique stable IDs and text.
  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements(NEW.options) x
    WHERE jsonb_typeof(x) <> 'object'
       OR COALESCE(trim(x->>'id'), '') = ''
       OR COALESCE(trim(COALESCE(x->>'text', x->>'content', x->>'value')), '') = ''
  ) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: every persisted option requires stable id and text';
  END IF;

  IF (
    SELECT count(*) FROM (
      SELECT x->>'id' id FROM jsonb_array_elements(NEW.options) x GROUP BY x->>'id'
    ) q
  ) <> jsonb_array_length(NEW.options) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: option ids must be unique';
  END IF;

  correct_raw := COALESCE(NEW.correct_answer, 'null'::jsonb);
  IF jsonb_typeof(correct_raw) = 'array' THEN
    SELECT COALESCE(array_agg(value), ARRAY[]::text[]) INTO answer_ids
    FROM jsonb_array_elements_text(correct_raw);
  ELSIF jsonb_typeof(correct_raw) = 'string' THEN
    answer_ids := ARRAY[trim(both '"' from correct_raw::text)];
  ELSIF jsonb_typeof(correct_raw) = 'object' THEN
    IF jsonb_typeof(correct_raw->'ids') = 'array' THEN
      SELECT COALESCE(array_agg(value), ARRAY[]::text[]) INTO answer_ids
      FROM jsonb_array_elements_text(correct_raw->'ids');
    ELSIF correct_raw ? 'id' THEN
      answer_ids := ARRAY[correct_raw->>'id'];
    END IF;
  END IF;

  IF cardinality(answer_ids) = 0 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: correct_answer must contain stable option id(s)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM unnest(answer_ids) a
    WHERE NOT EXISTS (SELECT 1 FROM jsonb_array_elements(NEW.options) x WHERE x->>'id' = a)
  ) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: correct_answer contains unknown option id';
  END IF;

  IF NEW.rationale IS NULL OR length(trim(NEW.rationale)) < 40 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: overall rationale required';
  END IF;
  IF NEW.correct_answer_explanation IS NULL OR length(trim(NEW.correct_answer_explanation)) < 24 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: correct-answer explanation required';
  END IF;

  FOR opt IN SELECT value FROM jsonb_array_elements(NEW.options)
  LOOP
    opt_id := opt->>'id';
    IF NOT (opt_id = ANY(answer_ids)) THEN
      IF NOT distractor_map ? opt_id OR length(trim(COALESCE(distractor_map->>opt_id, ''))) < 24 THEN
        missing_rationale := true;
        EXIT;
      END IF;
    END IF;
  END LOOP;
  IF missing_rationale THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: every incorrect option requires a substantive distractor rationale keyed by stable option id';
  END IF;

  IF COALESCE(trim(NEW.tier), '') = '' OR COALESCE(trim(NEW.exam), '') = '' OR COALESCE(trim(NEW.question_type), '') = '' THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: tier, exam, and question_type are required';
  END IF;
  IF COALESCE(trim(NEW.body_system), '') = '' OR COALESCE(trim(NEW.topic), '') = '' THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: body_system and topic are required';
  END IF;
  IF NEW.tags IS NULL OR cardinality(NEW.tags) = 0 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: at least one tag is required';
  END IF;
  IF NEW.difficulty IS NULL OR NEW.difficulty < 1 OR NEW.difficulty > 4 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: difficulty must be 1 through 4';
  END IF;
  IF COALESCE(trim(NEW.country_code), '') = '' AND upper(COALESCE(NEW.region_scope, '')) NOT IN ('BOTH','GLOBAL','INTL') THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: explicit country_code or global region_scope is required';
  END IF;

  -- Measurement-bearing items need both SI and conventional display variants.
  IF combined_text ~* '(mg/dL|mmol/L|mEq/L|mmHg|°F|°C|\mlb\M|\mkg\M|\mcm\M|inches?)' THEN
    has_si := support::text ~* 'SI' OR EXISTS (SELECT 1 FROM jsonb_array_elements(variants) v WHERE COALESCE(v#>>'{si,display}','') <> '');
    has_conv := support::text ~* '(CONV|CONVENTIONAL)' OR EXISTS (SELECT 1 FROM jsonb_array_elements(variants) v WHERE COALESCE(v#>>'{conv,display}','') <> '');
    IF NOT has_si OR NOT has_conv OR jsonb_array_length(variants) = 0 THEN
      RAISE EXCEPTION 'QUESTION_CONTRACT: convertible measurements require paired SI/CONV unit variants';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_exam_question_publish_guard ON exam_questions;
CREATE TRIGGER trg_exam_question_publish_guard
BEFORE INSERT OR UPDATE OF status, options, correct_answer, rationale, distractor_rationales,
  correct_answer_explanation, tier, exam, question_type, body_system, topic, tags, difficulty,
  country_code, region_scope, unit_system_support, unit_variants
ON exam_questions
FOR EACH ROW
EXECUTE FUNCTION nursenest_exam_question_publish_guard();
