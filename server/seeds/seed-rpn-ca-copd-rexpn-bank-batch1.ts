import crypto from "crypto";
import { pool } from "../storage";
import { rpnCaCopdRexpnBankBatch1 } from "../../client/src/data/exam-questions/rpn-ca-copd-rexpn-bank-batch1";

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function optionRationaleRecord(options: string[], rationales: string[]): Record<string, string> {
  return Object.fromEntries(options.map((option, index) => [option, rationales[index] ?? ""]));
}

async function ensureRationaleColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale JSONB`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_pearl TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function seedRpnCaCopdRexpnBankBatch1() {
  console.log("=== RPN Canada COPD REx-PN Bank Batch 1 ===");
  await ensureRationaleColumns();

  if (rpnCaCopdRexpnBankBatch1.length !== 20) {
    throw new Error(`RPN_CA_COPD_EXPECTED_20_QUESTIONS: ${rpnCaCopdRexpnBankBatch1.length}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (const q of rpnCaCopdRexpnBankBatch1) {
    if (q.optionRationales.length !== q.options.length) {
      throw new Error(`RPN_CA_COPD_OPTION_RATIONALE_MISMATCH: ${q.id}`);
    }
    if (!q.correctAnswerExplanation.trim()) {
      throw new Error(`RPN_CA_COPD_CORRECT_RATIONALE_MISSING: ${q.id}`);
    }
    q.optionRationales.forEach((rationale, index) => {
      if (!rationale.trim()) throw new Error(`RPN_CA_COPD_OPTION_RATIONALE_MISSING: ${q.id}/${index}`);
    });

    const hash = stemHash(q.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions
        WHERE (stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)))
          AND tier = 'rpn' AND exam = 'REX-PN' AND region_scope = 'CAN'
        LIMIT 1`,
      [hash, q.stem]
    );
    if (existing.rows.length > 0) {
      skipped++;
      continue;
    }

    await pool.query(
      `INSERT INTO exam_questions (
        id, tier, exam, question_type, status, stem, options, correct_answer,
        rationale, correct_answer_explanation, incorrect_answer_rationale,
        clinical_reasoning, clinical_pearl, key_takeaway,
        difficulty, body_system, topic, country_code, licensing_body,
        language_code, cognitive_level, question_format, lab_unit_variant,
        medication_naming_variant, region_scope, is_mock_exam_eligible,
        is_adaptive_eligible, career_type, domain, tags, stem_hash, created_at, updated_at
      ) VALUES (
        $1, 'rpn', 'REX-PN', 'multiple_choice', 'published', $2, $3, $4,
        $5, $6, $7, $8, $9, $10,
        $11, 'Respiratory', 'COPD', 'CA', 'NCSBN',
        'en', $12, 'MCQ', 'SI', 'Canadian_generic', 'CAN', true,
        true, 'nursing', $13, $14, $15, NOW(), NOW()
      )`,
      [
        q.id,
        q.stem,
        JSON.stringify(q.options),
        JSON.stringify([q.correctAnswer]),
        q.correctAnswerExplanation,
        q.correctAnswerExplanation,
        JSON.stringify(optionRationaleRecord(q.options, q.optionRationales)),
        q.clinicalReasoning,
        q.clinicalPearl,
        q.keyTakeaway,
        q.difficulty,
        q.cognitiveLevel,
        q.clientNeedsSubcategory,
        ["rpn", "rex-pn", "canada", "respiratory", "copd", q.clientNeedsSubcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
        hash
      ]
    );
    inserted++;
  }

  const verification = await pool.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation)) > 0)::int AS with_correct_rationale,
      COUNT(*) FILTER (WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale) = 'object' AND jsonb_object_length(incorrect_answer_rationale) = 4)::int AS with_four_option_rationales,
      COUNT(*) FILTER (WHERE difficulty <= 4)::int AS difficulty_valid
    FROM exam_questions
    WHERE tier = 'rpn' AND exam = 'REX-PN' AND body_system = 'Respiratory'
      AND topic = 'COPD' AND region_scope = 'CAN' AND country_code = 'CA'
      AND status = 'published' AND stem_hash = ANY($1::text[])
  `, [rpnCaCopdRexpnBankBatch1.map((q) => stemHash(q.stem))]);

  const row = verification.rows[0];
  if (row.total !== 20 || row.with_correct_rationale !== 20 || row.with_four_option_rationales !== 20 || row.difficulty_valid !== 20) {
    throw new Error(`RPN_CA_COPD_POSTSEED_VERIFICATION_FAILED: ${JSON.stringify(row)}`);
  }

  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped existing: ${skipped}`);
  console.log("Verified: 20 Canadian REx-PN COPD questions with complete rationale contracts");
}

seedRpnCaCopdRexpnBankBatch1()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RPN Canada COPD REx-PN seeding failed:", error);
    process.exit(1);
  });
