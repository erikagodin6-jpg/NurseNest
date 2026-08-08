import "../server/load-env";
import { pool } from "../server/storage";
import { alliedAuthoredQuestions } from "../server/content/allied";

async function columnExists(column: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='allied_questions' AND column_name=$1`,
    [column],
  );
  return result.rows.length > 0;
}

async function main() {
  const required = ["correct_answer_ids", "option_contract_version"];
  for (const column of required) {
    if (!(await columnExists(column))) {
      throw new Error(`allied_questions.${column} is missing; apply 20260808_allied_stable_answer_contract.sql first`);
    }
  }

  const optional = {
    hint: await columnExists("hint"),
    why: await columnExists("why_this_matters"),
    mnemonic: await columnExists("mnemonic"),
    country: await columnExists("country_code"),
    language: await columnExists("language_code"),
    licensing: await columnExists("licensing_body"),
    units: await columnExists("unit_system_support"),
    variants: await columnExists("unit_variants"),
  };

  const client = await pool.connect();
  let updated = 0;
  try {
    await client.query("BEGIN");
    for (const question of alliedAuthoredQuestions) {
      const sets = [
        `options = $1::jsonb`,
        `correct_answer_ids = $2::jsonb`,
        `distractor_rationales = $3::jsonb`,
        `option_contract_version = 2`,
      ];
      const values: unknown[] = [
        JSON.stringify(question.options),
        JSON.stringify(Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]),
        JSON.stringify(question.distractorRationales),
      ];
      let p = 4;
      const add = (enabled: boolean, column: string, value: unknown, cast = "") => {
        if (!enabled) return;
        sets.push(`${column} = $${p++}${cast}`);
        values.push(value);
      };
      add(optional.hint, "hint", question.hint || null);
      add(optional.why, "why_this_matters", question.whyThisMatters || null);
      add(optional.mnemonic, "mnemonic", question.mnemonic || null);
      add(optional.country, "country_code", question.countryCode || null);
      add(optional.language, "language_code", question.languageCode || "en");
      add(optional.licensing, "licensing_body", question.licensingBody || null);
      add(optional.units, "unit_system_support", JSON.stringify(question.unitSystemSupport || {}), "::jsonb");
      add(optional.variants, "unit_variants", JSON.stringify(question.unitVariants || []), "::jsonb");
      values.push(question.id);

      const result = await client.query(
        `UPDATE allied_questions SET ${sets.join(", ")} WHERE blueprint_id = $${p}`,
        values,
      );
      updated += result.rowCount ?? 0;
    }

    const verify = await client.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE option_contract_version = 2)::int AS v2,
        COUNT(*) FILTER (WHERE jsonb_array_length(correct_answer_ids) = 0)::int AS missing_answer_ids,
        COUNT(*) FILTER (WHERE jsonb_typeof(options) <> 'array')::int AS invalid_options
      FROM allied_questions
      WHERE blueprint_id LIKE 'allied-q-%'
    `);
    const row = verify.rows[0];
    if (row.total !== alliedAuthoredQuestions.length || row.v2 !== row.total || row.missing_answer_ids !== 0 || row.invalid_options !== 0) {
      throw new Error(`Allied stable contract verification failed: ${JSON.stringify(row)}`);
    }

    await client.query("COMMIT");
    console.log(JSON.stringify({ success: true, updated, verification: row }, null, 2));
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
