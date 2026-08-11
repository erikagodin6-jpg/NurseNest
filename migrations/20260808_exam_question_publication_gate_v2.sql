-- Canonical v2 publication gate for exam_questions.
-- Requires the universal question-contract sidecar migration to run first.
-- Legacy grading columns may remain positional during learner-serving cutover;
-- canonical answer truth is stable-ID based in contract_* fields.

CREATE OR REPLACE FUNCTION nursenest_exam_question_publish_guard()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  opt jsonb;
  opt_id text;
  answer_ids text[] := ARRAY[]::text[];
  canonical_options jsonb := COALESCE(NEW.contract_options, '[]'::jsonb);
  interaction jsonb := COALESCE(NEW.contract_interaction_payload, '{}'::jsonb);
  distractor_map jsonb := COALESCE(NEW.contract_distractor_rationales, '{}'::jsonb);
  correct_raw jsonb := COALESCE(NEW.contract_correct_answer_ids, '[]'::jsonb);
  country_labels jsonb := COALESCE(NEW.contract_country_labels, '[]'::jsonb);
  support jsonb := COALESCE(NEW.contract_unit_system_support, NEW.unit_system_support, '{}'::jsonb);
  variants jsonb := COALESCE(NEW.contract_unit_variants, NEW.unit_variants, '[]'::jsonb);
  combined_text text;
  has_si boolean := false;
  has_conv boolean := false;
  qtype text := upper(replace(replace(COALESCE(NEW.question_type, ''), '-', '_'), ' ', '_'));
  flat_type boolean := false;
  mcq_type boolean := false;
  ordered_type boolean := false;
  canonical_rationale text := COALESCE(NULLIF(trim(NEW.contract_rationale), ''), NEW.rationale);
  canonical_correct_explanation text := COALESCE(NULLIF(trim(NEW.contract_correct_answer_explanation), ''), NEW.correct_answer_explanation);
  canonical_hint text := COALESCE(NULLIF(trim(NEW.contract_hint), ''), NEW.hint, NEW.exam_strategy);
  canonical_why text := COALESCE(NULLIF(trim(NEW.contract_why_this_matters), ''), NEW.why_this_matters, NEW.key_takeaway, NEW.clinical_reasoning);
  canonical_pearl text := COALESCE(NULLIF(trim(NEW.contract_clinical_pearl), ''), NEW.clinical_pearl);
  canonical_country text := upper(COALESCE(NULLIF(trim(NEW.contract_country_code), ''), NEW.country_code, ''));
  canonical_region text := upper(COALESCE(NULLIF(trim(NEW.contract_region_scope), ''), NEW.region_scope, ''));
  canonical_language text := lower(COALESCE(NULLIF(trim(NEW.contract_language_code), ''), NEW.language_code, ''));
BEGIN
  IF COALESCE(NEW.status, 'draft') <> 'published' THEN RETURN NEW; END IF;

  flat_type := qtype IN ('MCQ','MULTIPLE_CHOICE','SINGLE_CHOICE','SATA','SELECT_ALL_THAT_APPLY','MULTI_SELECT','MULTIPLE_RESPONSE','ORDERED_RESPONSE','ORDERED','DRAG_DROP','DRAG_AND_DROP');
  mcq_type := qtype IN ('MCQ','MULTIPLE_CHOICE','SINGLE_CHOICE');
  ordered_type := qtype IN ('ORDERED_RESPONSE','ORDERED','DRAG_DROP','DRAG_AND_DROP');

  IF qtype NOT IN (
    'MCQ','MULTIPLE_CHOICE','SINGLE_CHOICE',
    'SATA','SELECT_ALL_THAT_APPLY','MULTI_SELECT','MULTIPLE_RESPONSE',
    'ORDERED_RESPONSE','ORDERED','DRAG_DROP','DRAG_AND_DROP',
    'CLOZE','FILL_IN_BLANK','DROPDOWN_CLOZE','DRAG_DROP_CLOZE',
    'MATRIX','MATRIX_SELECT','MATRIX_SINGLE','MATRIX_MULTI','DROPDOWN_TABLE',
    'BOWTIE','BOW_TIE','TREND','TREND_ANALYSIS',
    'NGN_CASE','CASE_STUDY','CASE_STUDY_SERIES','NGN_CASE_STUDY',
    'CHART_REVIEW','LAB_INTERPRETATION','ORDER_REVIEW','MATCHING_GRID','MULTI_RESPONSE_GROUPING'
  ) THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: unsupported/non-certified question type %', NEW.question_type;
  END IF;

  IF COALESCE(NEW.publication_contract_version,1)<2 OR COALESCE(NEW.option_contract_version,1)<2 THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: v2 publication/option contract must be backfilled before publishing';
  END IF;
  IF COALESCE(NEW.contract_status,'unverified') NOT IN ('verified','quality_only') THEN
    RAISE EXCEPTION 'QUESTION_CONTRACT: canonical contract status % is not publishable; issues=%', NEW.contract_status, NEW.contract_issues;
  END IF;
  IF NEW.contract_question_id IS NULL OR length(trim(NEW.contract_question_id))<3 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: stable canonical question id required'; END IF;
  IF NEW.stem IS NULL OR length(trim(NEW.stem))<10 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: substantive stem required'; END IF;

  IF flat_type THEN
    IF jsonb_typeof(canonical_options)<>'array' OR jsonb_array_length(canonical_options)<2 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: canonical flat options required'; END IF;
    IF mcq_type AND jsonb_array_length(canonical_options)<4 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: MCQ requires at least four options'; END IF;
    IF EXISTS(SELECT 1 FROM jsonb_array_elements(canonical_options)x WHERE jsonb_typeof(x)<>'object' OR COALESCE(trim(x->>'id'),'')='' OR COALESCE(trim(COALESCE(x->>'text',x->>'content',x->>'value')),'')='') THEN
      RAISE EXCEPTION 'QUESTION_CONTRACT: every canonical option requires stable id and text';
    END IF;
    IF (SELECT count(*) FROM(SELECT x->>'id' id FROM jsonb_array_elements(canonical_options)x GROUP BY x->>'id')q)<>jsonb_array_length(canonical_options) THEN RAISE EXCEPTION 'QUESTION_CONTRACT: duplicate option ids'; END IF;
    IF (SELECT count(*) FROM(SELECT lower(regexp_replace(trim(COALESCE(x->>'text',x->>'content',x->>'value')),'[.!?,;:]+$',''))t FROM jsonb_array_elements(canonical_options)x GROUP BY lower(regexp_replace(trim(COALESCE(x->>'text',x->>'content',x->>'value')),'[.!?,;:]+$','')))q)<>jsonb_array_length(canonical_options) THEN
      RAISE EXCEPTION 'QUESTION_CONTRACT: duplicate option/distractor text';
    END IF;

    IF jsonb_typeof(correct_raw)='array' THEN SELECT COALESCE(array_agg(value),ARRAY[]::text[]) INTO answer_ids FROM jsonb_array_elements_text(correct_raw);
    ELSIF jsonb_typeof(correct_raw)='string' THEN answer_ids:=ARRAY[trim(both '"' from correct_raw::text)];
    ELSIF jsonb_typeof(correct_raw)='object' AND jsonb_typeof(correct_raw->'ids')='array' THEN SELECT COALESCE(array_agg(value),ARRAY[]::text[]) INTO answer_ids FROM jsonb_array_elements_text(correct_raw->'ids');
    ELSIF jsonb_typeof(correct_raw)='object' AND correct_raw?'id' THEN answer_ids:=ARRAY[correct_raw->>'id']; END IF;

    IF cardinality(answer_ids)=0 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: canonical answer id(s) required'; END IF;
    IF mcq_type AND cardinality(answer_ids)<>1 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: MCQ requires exactly one canonical answer id'; END IF;
    IF ordered_type AND cardinality(answer_ids)<>jsonb_array_length(canonical_options) THEN RAISE EXCEPTION 'QUESTION_CONTRACT: ordered-response sequence must include every option exactly once'; END IF;
    IF ordered_type AND (SELECT count(DISTINCT a) FROM unnest(answer_ids)a)<>cardinality(answer_ids) THEN RAISE EXCEPTION 'QUESTION_CONTRACT: ordered-response sequence contains duplicate option ids'; END IF;
    IF EXISTS(SELECT 1 FROM unnest(answer_ids)a WHERE NOT EXISTS(SELECT 1 FROM jsonb_array_elements(canonical_options)x WHERE x->>'id'=a)) THEN RAISE EXCEPTION 'QUESTION_CONTRACT: canonical answer contains unknown option id'; END IF;

    IF NOT ordered_type THEN
      FOR opt IN SELECT value FROM jsonb_array_elements(canonical_options) LOOP
        opt_id:=opt->>'id';
        IF NOT(opt_id=ANY(answer_ids)) AND (NOT distractor_map?opt_id OR length(trim(COALESCE(distractor_map->>opt_id,'')))<24) THEN
          RAISE EXCEPTION 'QUESTION_CONTRACT: every incorrect flat option requires distractor rationale keyed by stable id';
        END IF;
      END LOOP;
    END IF;
  ELSE
    IF jsonb_typeof(interaction)<>'object' OR interaction='{}'::jsonb THEN RAISE EXCEPTION 'QUESTION_CONTRACT: structured question type % requires contract_interaction_payload', NEW.question_type; END IF;
  END IF;

  IF canonical_rationale IS NULL OR length(trim(canonical_rationale))<40 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: overall rationale required'; END IF;
  IF canonical_correct_explanation IS NULL OR length(trim(canonical_correct_explanation))<24 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: correct-answer explanation required'; END IF;
  IF COALESCE(trim(NEW.tier),'')='' OR COALESCE(trim(NEW.exam),'')='' OR COALESCE(trim(NEW.question_type),'')='' THEN RAISE EXCEPTION 'QUESTION_CONTRACT: tier, exam and question_type required'; END IF;
  IF COALESCE(trim(NEW.body_system),'')='' OR COALESCE(trim(NEW.topic),'')='' THEN RAISE EXCEPTION 'QUESTION_CONTRACT: body_system and topic required'; END IF;
  IF NEW.tags IS NULL OR cardinality(NEW.tags)=0 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: tags required'; END IF;
  IF NEW.difficulty IS NULL OR NEW.difficulty<1 OR NEW.difficulty>4 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: difficulty must be 1-4'; END IF;
  IF canonical_country='' AND canonical_region NOT IN('BOTH','GLOBAL','INTL') THEN RAISE EXCEPTION 'QUESTION_CONTRACT: country/global scope required'; END IF;
  IF canonical_region='BOTH' AND canonical_country='' AND (jsonb_typeof(country_labels)<>'array' OR jsonb_array_length(country_labels)<2) THEN RAISE EXCEPTION 'QUESTION_CONTRACT: multi-country BOTH scope requires explicit country labels'; END IF;
  IF canonical_language='' THEN RAISE EXCEPTION 'QUESTION_CONTRACT: language code required'; END IF;
  IF canonical_hint IS NULL OR length(trim(canonical_hint))<12 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: tutor hint required'; END IF;
  IF canonical_why IS NULL OR length(trim(canonical_why))<20 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: Why This Matters required'; END IF;
  IF canonical_pearl IS NULL OR length(trim(canonical_pearl))<12 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: clinical/exam pearl required'; END IF;

  combined_text:=COALESCE(NEW.stem,'')||' '||COALESCE(canonical_options::text,'')||' '||COALESCE(interaction::text,'');
  IF combined_text~*'(mg/dL|mmol/L|°F|°C|\mlb\M|\mkg\M|\mcm\M|inches?|\mfeet\M|\mft\M|\mmeters?\M)' THEN
    has_si:=support::text~*'SI' OR EXISTS(SELECT 1 FROM jsonb_array_elements(variants)v WHERE COALESCE(v#>>'{si,display}','')<>'');
    has_conv:=support::text~*'(CONV|CONVENTIONAL)' OR EXISTS(SELECT 1 FROM jsonb_array_elements(variants)v WHERE COALESCE(v#>>'{conv,display}','')<>'');
    IF NOT has_si OR NOT has_conv OR jsonb_array_length(variants)=0 THEN RAISE EXCEPTION 'QUESTION_CONTRACT: paired SI/CONV variants required'; END IF;
    IF EXISTS(SELECT 1 FROM jsonb_array_elements(variants)v WHERE COALESCE(trim(v->>'token'),'')='' OR COALESCE(trim(v->>'quantity'),'')='' OR COALESCE(trim(v#>>'{si,display}'),'')='' OR COALESCE(trim(v#>>'{conv,display}'),'')='') THEN RAISE EXCEPTION 'QUESTION_CONTRACT: malformed SI/CONV variant'; END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_exam_question_publish_guard ON exam_questions;
CREATE TRIGGER trg_exam_question_publish_guard
BEFORE INSERT OR UPDATE OF status, contract_question_id, contract_options, contract_correct_answer_ids,
  contract_interaction_payload, contract_distractor_rationales, contract_rationale,
  contract_correct_answer_explanation, contract_hint, contract_why_this_matters,
  contract_clinical_pearl, contract_country_code, contract_country_labels, contract_region_scope,
  contract_language_code, contract_unit_system_support, contract_unit_variants,
  publication_contract_version, option_contract_version, contract_status, contract_issues,
  rationale, correct_answer_explanation, hint, why_this_matters, clinical_pearl,
  exam_strategy, key_takeaway, clinical_reasoning, tier, exam, question_type,
  body_system, topic, tags, difficulty, country_code, region_scope, language_code,
  unit_system_support, unit_variants
ON exam_questions
FOR EACH ROW
EXECUTE FUNCTION nursenest_exam_question_publish_guard();