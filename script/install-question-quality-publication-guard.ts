import { pool } from "../server/storage";

const FUNCTION_SQL = String.raw`
CREATE OR REPLACE FUNCTION nn_enforce_question_quality_contract()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  payload jsonb := to_jsonb(NEW);
  options_json jsonb;
  correct_json jsonb;
  dr_json jsonb;
  tags_json jsonb;
  option_count integer := 0;
  correct_count integer := 0;
  dr_count integer := 0;
  tag_count integer := 0;
  dr_value text;
  incomplete boolean := false;
  reasons text[] := ARRAY[]::text[];
  q_status text := COALESCE(payload->>'status', '');
BEGIN
  IF q_status NOT IN ('published', 'approved') THEN
    RETURN NEW;
  END IF;

  options_json := payload->'options';
  IF jsonb_typeof(options_json) = 'string' THEN
    BEGIN
      options_json := (payload->>'options')::jsonb;
    EXCEPTION WHEN others THEN
      options_json := NULL;
    END;
  END IF;

  correct_json := payload->'correct_answer';
  IF jsonb_typeof(correct_json) = 'string' THEN
    BEGIN
      correct_json := (payload->>'correct_answer')::jsonb;
    EXCEPTION WHEN others THEN
      correct_json := to_jsonb(payload->>'correct_answer');
    END;
  END IF;

  dr_json := payload->'distractor_rationales';
  IF jsonb_typeof(dr_json) = 'string' THEN
    BEGIN
      dr_json := (payload->>'distractor_rationales')::jsonb;
    EXCEPTION WHEN others THEN
      dr_json := NULL;
    END;
  END IF;

  tags_json := payload->'tags';
  IF jsonb_typeof(tags_json) = 'string' THEN
    BEGIN
      tags_json := (payload->>'tags')::jsonb;
    EXCEPTION WHEN others THEN
      tags_json := NULL;
    END;
  END IF;

  IF jsonb_typeof(options_json) = 'array' THEN
    option_count := jsonb_array_length(options_json);
  END IF;
  IF jsonb_typeof(correct_json) = 'array' THEN
    correct_count := jsonb_array_length(correct_json);
  ELSIF correct_json IS NOT NULL AND correct_json <> 'null'::jsonb THEN
    correct_count := 1;
  END IF;
  IF jsonb_typeof(dr_json) = 'object' THEN
    dr_count := jsonb_object_length(dr_json);
  ELSIF jsonb_typeof(dr_json) = 'array' THEN
    dr_count := jsonb_array_length(dr_json);
  END IF;
  IF jsonb_typeof(tags_json) = 'array' THEN
    tag_count := jsonb_array_length(tags_json);
  END IF;

  IF LENGTH(TRIM(COALESCE(payload->>'stem', ''))) < 30 THEN
    incomplete := true;
    reasons := array_append(reasons, 'stem');
  END IF;

  IF option_count >= 2 THEN
    IF option_count < 3 THEN
      incomplete := true;
      reasons := array_append(reasons, 'options');
    END IF;
    IF correct_count < 1 THEN
      incomplete := true;
      reasons := array_append(reasons, 'correct_answer');
    END IF;
    IF dr_count < GREATEST(option_count - correct_count, 1) THEN
      incomplete := true;
      reasons := array_append(reasons, 'distractor_rationales_coverage');
    END IF;
    IF dr_json IS NOT NULL THEN
      IF jsonb_typeof(dr_json) = 'object' THEN
        FOR dr_value IN SELECT value #>> '{}' FROM jsonb_each(dr_json) LOOP
          IF LENGTH(TRIM(COALESCE(dr_value, ''))) < 40 THEN
            incomplete := true;
            reasons := array_append(reasons, 'distractor_rationale_quality');
            EXIT;
          END IF;
        END LOOP;
      ELSIF jsonb_typeof(dr_json) = 'array' THEN
        FOR dr_value IN SELECT value #>> '{}' FROM jsonb_array_elements(dr_json) LOOP
          IF LENGTH(TRIM(COALESCE(dr_value, ''))) < 40 THEN
            incomplete := true;
            reasons := array_append(reasons, 'distractor_rationale_quality');
            EXIT;
          END IF;
        END LOOP;
      END IF;
    END IF;
  END IF;

  IF LENGTH(TRIM(COALESCE(payload->>'rationale', ''))) < 120 THEN
    incomplete := true;
    reasons := array_append(reasons, 'rationale');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'correct_answer_explanation', ''))) < 60 THEN
    incomplete := true;
    reasons := array_append(reasons, 'correct_answer_explanation');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'clinical_pearl', ''))) < 40 THEN
    incomplete := true;
    reasons := array_append(reasons, 'clinical_pearl');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'body_system', ''))) < 2 THEN
    incomplete := true;
    reasons := array_append(reasons, 'body_system');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'topic', ''))) < 2 THEN
    incomplete := true;
    reasons := array_append(reasons, 'topic');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'subtopic', ''))) < 2 THEN
    incomplete := true;
    reasons := array_append(reasons, 'subtopic');
  END IF;
  IF COALESCE((payload->>'difficulty')::integer, 0) NOT BETWEEN 1 AND 4 THEN
    incomplete := true;
    reasons := array_append(reasons, 'difficulty');
  END IF;
  IF LOWER(TRIM(COALESCE(payload->>'cognitive_level', ''))) NOT IN ('recall', 'understanding', 'application', 'analysis') THEN
    incomplete := true;
    reasons := array_append(reasons, 'cognitive_level');
  END IF;
  IF tag_count < 3 THEN
    incomplete := true;
    reasons := array_append(reasons, 'tags');
  END IF;
  IF LENGTH(TRIM(COALESCE(payload->>'region_scope', ''))) < 2 THEN
    incomplete := true;
    reasons := array_append(reasons, 'region_scope');
  END IF;

  IF incomplete THEN
    NEW.status := 'needs_review';
    RAISE NOTICE 'Question % downgraded to needs_review by quality contract: %', COALESCE(payload->>'id', '<new>'), array_to_string(reasons, ',');
  END IF;

  RETURN NEW;
END;
$$;
`;

async function tableExists(table: string): Promise<boolean> {
  const result = await pool.query(`SELECT to_regclass($1) AS name`, [`public.${table}`]);
  return Boolean(result.rows[0]?.name);
}

async function hasRequiredColumns(table: string): Promise<boolean> {
  const required = ["id", "status", "stem", "options", "correct_answer"];
  const result = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
    [table],
  );
  const columns = new Set(result.rows.map((row: any) => row.column_name));
  return required.every((column) => columns.has(column));
}

async function installOn(table: string) {
  if (!(await tableExists(table))) {
    console.log(`[QuestionQualityGuard] ${table}: absent, skipped`);
    return;
  }
  if (!(await hasRequiredColumns(table))) {
    console.log(`[QuestionQualityGuard] ${table}: incompatible schema, skipped`);
    return;
  }
  const trigger = `nn_question_quality_guard_${table}`;
  await pool.query(`DROP TRIGGER IF EXISTS ${trigger} ON ${table}`);
  await pool.query(`
    CREATE TRIGGER ${trigger}
    BEFORE INSERT OR UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE FUNCTION nn_enforce_question_quality_contract()
  `);
  console.log(`[QuestionQualityGuard] ${table}: installed ${trigger}`);
}

async function main() {
  await pool.query(FUNCTION_SQL);
  await installOn("exam_questions");
  await installOn("allied_questions");

  const result = await pool.query(`
    SELECT event_object_table AS table_name, trigger_name
      FROM information_schema.triggers
     WHERE trigger_name LIKE 'nn_question_quality_guard_%'
     ORDER BY event_object_table
  `);
  console.log(JSON.stringify({ installed: result.rows }, null, 2));
}

main()
  .catch((error) => {
    console.error("[QuestionQualityGuard] fatal", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
