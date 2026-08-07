import crypto from "crypto";
import { pool } from "../storage";
import { rnCaCopdNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-ca-copd-nclex-bank-batch1";
import { rnUsCopdNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-us-copd-nclex-bank-batch1";
import "../../client/src/data/lessons/respiratory-rn-copd-coverage";

type Question =
  | (typeof rnCaCopdNclexBankBatch1)[number]
  | (typeof rnUsCopdNclexBankBatch1)[number];

type Cell = {
  label: string;
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  medicationNamingVariant: "Canadian_generic" | "USAN";
  labUnitVariant: "SI" | "conventional";
  questions: readonly Question[];
};

const cells: Cell[] = [
  {
    label: "RN/CA/NCLEX-RN/COPD",
    countryCode: "CA",
    regionScope: "CAN",
    medicationNamingVariant: "Canadian_generic",
    labUnitVariant: "SI",
    questions: rnCaCopdNclexBankBatch1
  },
  {
    label: "RN/US/NCLEX-RN/COPD",
    countryCode: "US",
    regionScope: "US",
    medicationNamingVariant: "USAN",
    labUnitVariant: "conventional",
    questions: rnUsCopdNclexBankBatch1
  }
];

function stemHash(stem: string): string {
  return crypto
    .createHash("sha256")
    .update(stem.trim().toLowerCase())
    .digest("hex")
    .substring(0, 32);
}

async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale JSONB`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_pearl TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT`);
  await pool.query(
    `CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`
  );
}

async function seedCell(cell: Cell) {
  if (cell.questions.length !== 20) {
    throw new Error(`RN_COPD_SEED_COUNT_INVALID: ${cell.label}/${cell.questions.length}`);
  }

  const distribution = [0, 0, 0, 0];
  cell.questions.forEach((question) => (distribution[question.correctAnswer] += 1));
  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`RN_COPD_SEED_BALANCE_INVALID: ${cell.label}/${distribution.join(",")}`);
  }

  let inserted = 0;
  let skipped = 0;
  for (const question of cell.questions) {
    if (
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope ||
      question.topic !== "COPD"
    ) {
      throw new Error(`RN_COPD_SEED_SCOPE_INVALID: ${cell.label}/${question.id}`);
    }

    const hash = stemHash(question.stem);
    const existing = await pool.query(
      `SELECT id
         FROM exam_questions
        WHERE (stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)))
          AND tier = 'rn'
          AND exam = 'NCLEX-RN'
          AND region_scope = $3
          AND topic = 'COPD'
        LIMIT 1`,
      [hash, question.stem, cell.regionScope]
    );
    if (existing.rows.length) {
      skipped += 1;
      continue;
    }

    const rationaleMap = Object.fromEntries(
      question.options.map((option, index) => [option, question.optionRationales[index]])
    );

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
        $1, 'rn', 'NCLEX-RN', 'multiple_choice', 'published', $2, $3, $4,
        $5, $6, $7, $8, $9, $10,
        $11, 'Respiratory', 'COPD', $12, 'NCSBN',
        'en', $13, 'MCQ', $14, $15, $16, true,
        true, 'nursing', $17, $18, $19, NOW(), NOW()
      )`,
      [
        question.id,
        question.stem,
        JSON.stringify(question.options),
        JSON.stringify([question.correctAnswer]),
        question.correctAnswerExplanation,
        question.correctAnswerExplanation,
        JSON.stringify(rationaleMap),
        question.clinicalReasoning,
        question.clinicalPearl,
        question.keyTakeaway,
        question.difficulty,
        cell.countryCode,
        question.cognitiveLevel,
        cell.labUnitVariant,
        cell.medicationNamingVariant,
        cell.regionScope,
        question.clientNeedsSubcategory,
        [
          "rn",
          "nclex-rn",
          cell.countryCode === "CA" ? "canada" : "united-states",
          "respiratory",
          "copd",
          question.clientNeedsSubcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        ],
        hash
      ]
    );
    inserted += 1;
  }

  const hashes = cell.questions.map((question) => stemHash(question.stem));
  const verification = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (
         WHERE correct_answer_explanation IS NOT NULL
           AND length(trim(correct_answer_explanation)) > 0
       )::int AS correct_rationales,
       COUNT(*) FILTER (
         WHERE incorrect_answer_rationale IS NOT NULL
           AND jsonb_typeof(incorrect_answer_rationale) = 'object'
           AND jsonb_object_length(incorrect_answer_rationale) = 4
       )::int AS option_rationales,
       COUNT(*) FILTER (WHERE difficulty <= 4)::int AS difficulty_valid
     FROM exam_questions
     WHERE tier = 'rn'
       AND exam = 'NCLEX-RN'
       AND body_system = 'Respiratory'
       AND topic = 'COPD'
       AND country_code = $1
       AND region_scope = $2
       AND status = 'published'
       AND stem_hash = ANY($3::text[])`,
    [cell.countryCode, cell.regionScope, hashes]
  );

  const row = verification.rows[0];
  if (
    row.total !== 20 ||
    row.correct_rationales !== 20 ||
    row.option_rationales !== 20 ||
    row.difficulty_valid !== 20
  ) {
    throw new Error(`RN_COPD_POSTSEED_INVALID: ${cell.label}/${JSON.stringify(row)}`);
  }

  return { label: cell.label, inserted, skipped, verified: row.total };
}

async function run() {
  await ensureColumns();
  const results = [];
  for (const cell of cells) results.push(await seedCell(cell));

  const verified = results.reduce((sum, row) => sum + row.verified, 0);
  if (verified !== 40) throw new Error(`RN_COPD_TOTAL_INVALID: ${verified}`);

  console.log(JSON.stringify({ cells: results.length, verified, results }, null, 2));
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
