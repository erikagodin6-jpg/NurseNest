-- Canonical v2 publication gate for exam_questions.
-- Requires the universal question-contract sidecar migration to run first.
-- IMPORTANT: legacy `correct_answer` may remain positional during the learner-serving cutover.
-- The canonical grading truth is `contract_correct_answer_ids` and is always stable-ID based.

CREATE OR REPLACE FUNCTION nursenest_exam_question_publish_guard()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  opt jsonb;
  opt_id text;
  answer_ids text[] := ARRAY[]::text[];
  canonical_options jsonb := COALESCE(NEW.contract_options, '[]'::jsonb);
  distractor_map jsonb := COALESCE(NEW.contract_distractor_rationales, '{}'::jsonb);
  correct_raw jsonb := COALESCE(NEW.contract_correct_answer_ids, '[]'::jsonb);
  support jsonb := COALESCE(NEW.contract_unit_system_support, NEW.unit_system_support, '{}'::jsonb);
  variants jsonb := COALESCE(NEW.contract_unit_variants, NEW.unit_variants, '[]'::jsonb);
  combined_text text := COALESCE(NEW.stem, '') || ' ' || COALESCE(canonical_options::text, '');
  has_si boolean := false;
  has_conv boolean := false;
  qtype text := upper(COALESCE(NEW.question_type, ''));
  canonical_rationale text := COALESCE(NULLIF(trim(NEW.contract_rationale), ''), NEW.rationale);
  canonical_correct_explanation text := COALESCE(NULLIF(trim(NEW.contract_correct_answer_explanation), ''), NEW.correct_answer_explanation);
  canonical_hint text := COALESCE(NULLIF(trim(NEW.contract_hint), ''), NEW.hint, NEW.exam_strategy);
  canonical_why text := COALESCE(NULLIF(trim(NEW.contract_why_this_matters), ''), NEW.why_this_matters, NEW.key_takeaway, NEW.clinical_reasoning);
  canonical_pearl text := COALESCE(NULLIF(trim(NEW.contract_clinical_pearl), ''), NEW.clinical_pearl);
  canonical_country text := upper(COALESCE(NULLIF(trim(NEW.contract_country_code), ''), NEW.country_code, ''));
  canonical_region text := upper(COALESCE(NULLIF(trim(NEW.contract_region_scope), ''), NEW.region_scope, ''));
  canonical_language text := lower(COALESCE(NULLIF(trim(NEW.contract_language_code), ''), NEW.language_code, ''));
BEGIN
  IF COALESCE(NEW.status, 'draft') <> 'published' THEN
    RETURN NEW;
  END IF;

  IF COALESCE(NEW.publication_contract_version, 1) < 2 OR COALESCE(NEW.option_contract_version, 1) < 2 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: v2 publication/option contract must be backfilled before publishing';
  END IF;
  IF COALESCE(NEW.contract_status, 'unverified') = 'blocked' THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: question is blocked by canonical contract issues: %', NEW.contract_issues;
  END IF;

  IF NEW.contract_question_id IS NULL OR length(trim(NEW.contract_question_id)) < 3 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: stable canonical question id required';
  END IF;
  IF NEW.stem IS NULL OR length(trim(NEW.stem)) < 10 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: substantive stem required';
  END IF;
  IF jsonb_typeof(canonical_options) <> 'array' OR jsonb_array_length(canonical_options) < 2 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: canonical options must be a non-empty JSON array';
  END IF;
  IF qtype IN ('MCQ','MULTIPLE_CHOICE','MULTIPLE-CHOICE','SINGLE_CHOICE','SINGLE-CHOICE') AND jsonb_array_length(canonical_options) < 4 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: single-answer MCQ requires at least four options';
  END IF;

  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements(canonical_options) x
    WHERE jsonb_typeof(x) <> 'object'
       OR COALESCE(trim(x->>'id'), '') = ''
       OR COALESCE(trim(COALESCE(x->>'text', x->>'content', x->>'value')), '') = ''
  ) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: every canonical option requires stable id and text';
  END IF;

  IF (
    SELECT count(*) FROM (SELECT x->>'id' id FROM jsonb_array_elements(canonical_options) x GROUP BY x->>'id') q
  ) <> jsonb_array_length(canonical_options) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: canonical option ids must be unique';
  END IF;

  IF (
    SELECT count(*) FROM (
      SELECT lower(regexp_replace(trim(COALESCE(x->>'text', x->>'content', x->>'value')), '[.!?,;:]+$', '')) option_text
      FROM jsonb_array_elements(canonical_options) x
      GROUP BY lower(regexp_replace(trim(COALESCE(x->>'text', x->>'content', x->>'value')), '[.!?,;:]+$', ''))
    ) q
  ) <> jsonb_array_length(canonical_options) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: duplicate option/distractor text is not allowed';
  END IF;

  IF jsonb_typeof(correct_raw) = 'array' THEN
    SELECT COALESCE(array_agg(value), ARRAY[]::text[]) INTO answer_ids FROM jsonb_array_elements_text(correct_raw);
  ELSIF jsonb_typeof(correct_raw) = 'string' THEN
    answer_ids := ARRAY[trim(both '"' from correct_raw::text)];
  ELSIF jsonb_typeof(correct_raw) = 'object' THEN
    IF jsonb_typeof(correct_raw->'ids') = 'array' THEN
      SELECT COALESCE(array_agg(value), ARRAY[]::text[]) INTO answer_ids FROM jsonb_array_elements_text(correct_raw->'ids');
    ELSIF correct_raw ? 'id' THEN
      answer_ids := ARRAY[correct_raw->>'id'];
    END IF;
  END IF;

  IF cardinality(answer_ids) = 0 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: canonical correct answer must contain stable option id(s)';
  END IF;
  IF qtype IN ('MCQ','MULTIPLE_CHOICE','MULTIPLE-CHOICE','SINGLE_CHOICE','SINGLE-CHOICE') AND cardinality(answer_ids) <> 1 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: single-answer MCQ requires exactly one canonical correct option id';
  END IF;
  IF EXISTS (
    SELECT 1 FROM unnest(answer_ids) a
    WHERE NOT EXISTS (SELECT 1 FROM jsonb_array_elements(canonical_options) x WHERE x->>'id' = a)
  ) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: canonical correct answer contains unknown option id';
  END IF;

  IF canonical_rationale IS NULL OR length(trim(canonical_rationale)) < 40 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: overall rationale required';
  END IF;
  IF canonical_correct_explanation IS NULL OR length(trim(canonical_correct_explanation)) < 24 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: correct-answer explanation required';
  END IF;

  FOR opt IN SELECT value FROM jsonb_array_elements(canonical_options)
  LOOP
    opt_id := opt->>'id';
    IF NOT (opt_id = ANY(answer_ids)) THEN
      IF NOT distractor_map ? opt_id OR length(trim(COALESCE(distractor_map->>opt_id, ''))) < 24 THEN
        RAISE EXCEPTION 'QUESTION_CONTRACT: every incorrect option requires a substantive distractor rationale keyed by stable option id';
      END IF;
    END IF;
  END LOOP;

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
  IF canonical_country = '' AND canonical_region NOT IN ('BOTH','GLOBAL','INTL') THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: explicit country code or global region scope is required';
  END IF;
  IF canonical_language = '' THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: language code is required';
  END IF;
  IF canonical_hint IS NULL OR length(trim(canonical_hint)) < 12 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: tutor hint is required';
  END IF;
  IF canonical_why IS NULL OR length(trim(canonical_why)) < 20 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: Why This Matters is required';
  END IF;
  IF canonical_pearl IS NULL OR length(trim(canonical_pearl)) < 12 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: clinical/exam pearl is required';
  END IF;

  IF combined_text ~* '(mg/dL|mmol/L|°F|°C|\mlb\M|\mkg\M|\mcm\M|inches?|\mfeet\M|\mft\M|\mmeters?\M)' THEN
    has_si := support::text ~* 'SI' OR EXISTS (SELECT 1 FROM jsonb_array_elements(variants) v WHERE COALESCE(v#>>'{si,display}','') <> '');
    has_conv := support::text ~* '(CONV|CONVENTIONAL)' OR EXISTS (SELECT 1 FROM jsonb_array_elements(variants) v WHERE COALESCE(v#>>'{conv,display}','') <> '');
    IF NOT has_si OR NOT has_conv OR jsonb_array_length(variants) = 0 THEN
      RAISE EXCEPTION 'QUESTION_CONTRACT: convertible measurements require paired SI/CONV unit variants';
    END IF;
    IF EXISTS (
      SELECT 1 FROM jsonb_array_elements(variants) v
      WHERE COALESCE(trim(v->>'token'),'') = ''
         OR COALESCE(trim(v->>'quantity'),'') = ''
         OR COALESCE(trim(v#>>'{si,display}'),'') = ''
         OR COALESCE(trim(v#>>'{conv,display}'),'') = ''
    ) THEN
      RAISE EXCEPTION 'QUESTION_CONTRACT: malformed SI/CONV unit variant';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_exam_question_publish_guard ON exam_questions;
CREATE TRIGGER trg_exam_question_publish_guard
BEFORE INSERT OR UPDATE OF status, contract_question_id, contract_options, contract_correct_answer_ids,
  contract_distractor_rationales, contract_rationale, contract_correct_answer_explanation,
  contract_hint, contract_why_this_matters, contract_clinical_pearl, contract_country_code,
  contract_region_scope, contract_language_code, contract_unit_system_support, contract_unit_variants,
  publication_contract_version, option_contract_version, contract_status, contract_issues,
  rationale, correct_answer_explanation, hint, why_this_matters, clinical_pearl, exam_strategy,
  key_takeaway, clinical_reasoning, tier, exam, question_type, body_system, topic, tags, difficulty,
  country_code, region_scope, language_code, unit_system_support, unit_variants
ON exam_questions
FOR EACH ROW
EXECUTE FUNCTION nursenest_exam_question_publish_guard();
