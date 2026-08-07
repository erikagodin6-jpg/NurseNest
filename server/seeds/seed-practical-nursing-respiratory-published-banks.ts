import crypto from "crypto";
import { pool } from "../storage";
import {
  rpnCaAsthmaRexpnPublishedBank,
  pnUsAsthmaNclexPublishedBank,
  rpnCaCopdRexpnPublishedBank,
  pnUsCopdNclexPublishedBank,
  rpnCaPneumoniaRexpnPublishedBank,
  pnUsPneumoniaNclexPublishedBank
} from "../../client/src/data/exam-questions/practical-nursing-respiratory-published-banks";
import "../../client/src/data/lessons/respiratory-practical-nursing-coverage";

type PublishedQuestion = {
  id: string;
  exam: "REX-PN" | "NCLEX-PN";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  bodySystem: "Respiratory";
  topic: string;
  questionType: "multiple_choice";
  stem: string;
  options: readonly [string, string, string, string];
  correctAnswer: number;
  correctAnswerExplanation: string;
  optionRationales: readonly [string, string, string, string];
  difficulty: number;
  cognitiveLevel: string;
  clientNeedsSubcategory: string;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
};

type SeedCell = {
  label: string;
  tier: "rpn";
  exam: "REX-PN" | "NCLEX-PN";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  labUnitVariant: "SI" | "conventional";
  medicationNamingVariant: "Canadian_generic" | "USAN";
  topic: string;
  questions: readonly PublishedQuestion[];
};

const cells: SeedCell[] = [
  { label: "CA/REX-PN/Asthma", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Asthma", questions: rpnCaAsthmaRexpnPublishedBank },
  { label: "US/NCLEX-PN/Asthma", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Asthma", questions: pnUsAsthmaNclexPublishedBank },
  { label: "CA/REX-PN/COPD", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "COPD", questions: rpnCaCopdRexpnPublishedBank },
  { label: "US/NCLEX-PN/COPD", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "COPD", questions: pnUsCopdNclexPublishedBank },
  { label: "CA/REX-PN/CAP", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Community-Acquired Pneumonia", questions: rpnCaPneumoniaRexpnPublishedBank },
  { label: "US/NCLEX-PN/CAP", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Community-Acquired Pneumonia", questions: pnUsPneumoniaNclexPublishedBank }
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function optionRationaleRecord(question: PublishedQuestion): Record<string, string> {
  return Object.fromEntries(question.options.map((option, index) => [option, question.optionRationales[index]]));
}

async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale JSONB`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_pearl TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function seedCell(cell: SeedCell) {
  if (cell.questions.length !== 20) throw new Error(`PN_RESPIRATORY_SEED_COUNT_INVALID: ${cell.label}/${cell.questions.length}`);

  const distribution = [0, 0, 0, 0];
  cell.questions.forEach((question) => distribution[question.correctAnswer] += 1);
  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`PN_RESPIRATORY_SEED_ANSWER_BALANCE_INVALID: ${cell.label}/${distribution.join(",")}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (const q of cell.questions) {
    if (q.exam !== cell.exam || q.countryCode !== cell.countryCode || q.regionScope !== cell.regionScope || q.topic !== cell.topic) {
      throw new Error(`PN_RESPIRATORY_SEED_SCOPE_MISMATCH: ${cell.label}/${q.id}`);
    }
    if (!q.correctAnswerExplanation.trim() || q.optionRationales.some((rationale) => !rationale.trim())) {
      throw new Error(`PN_RESPIRATORY_SEED_RATIONALE_INVALID: ${cell.label}/${q.id}`);
    }
    if (q.difficulty > 4) throw new Error(`PN_RESPIRATORY_SEED_DIFFICULTY_INVALID: ${cell.label}/${q.id}`);

    const hash = stemHash(q.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions
       WHERE (stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)))
         AND tier = $3 AND exam = $4 AND region_scope = $5
       LIMIT 1`,
      [hash, q.stem, cell.tier, cell.exam, cell.regionScope]
    );
    if (existing.rows.length) {
      skipped += 1;
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
        $1, $2, $3, 'multiple_choice', 'published', $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, 'Respiratory', $14, $15, 'NCSBN',
        'en', $16, 'MCQ', $17, $18, $19, true,
        true, 'nursing', $20, $21, $22, NOW(), NOW()
      )`,
      [
        q.id,
        cell.tier,
        cell.exam,
        q.stem,
        JSON.stringify(q.options),
        JSON.stringify([q.correctAnswer]),
        q.correctAnswerExplanation,
        q.correctAnswerExplanation,
        JSON.stringify(optionRationaleRecord(q)),
        q.clinicalReasoning,
        q.clinicalPearl,
        q.keyTakeaway,
        q.difficulty,
        cell.topic,
        cell.countryCode,
        q.cognitiveLevel,
        cell.labUnitVariant,
        cell.medicationNamingVariant,
        cell.regionScope,
        q.clientNeedsSubcategory,
        [
          cell.countryCode === "CA" ? "rpn" : "pn",
          cell.exam.toLowerCase(),
          cell.countryCode === "CA" ? "canada" : "united-states",
          "respiratory",
          cell.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          q.clientNeedsSubcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")
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
       COUNT(*) FILTER (WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation)) > 0)::int AS with_correct_rationale,
       COUNT(*) FILTER (WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale) = 'object' AND jsonb_object_length(incorrect_answer_rationale) = 4)::int AS with_four_option_rationales,
       COUNT(*) FILTER (WHERE difficulty <= 4)::int AS difficulty_valid
     FROM exam_questions
     WHERE tier = $1 AND exam = $2 AND body_system = 'Respiratory'
       AND topic = $3 AND region_scope = $4 AND country_code = $5
       AND status = 'published' AND stem_hash = ANY($6::text[])`,
    [cell.tier, cell.exam, cell.topic, cell.regionScope, cell.countryCode, hashes]
  );

  const row = verification.rows[0];
  if (row.total !== 20 || row.with_correct_rationale !== 20 || row.with_four_option_rationales !== 20 || row.difficulty_valid !== 20) {
    throw new Error(`PN_RESPIRATORY_POSTSEED_VERIFICATION_FAILED: ${cell.label}/${JSON.stringify(row)}`);
  }

  return { label: cell.label, inserted, skipped, verified: row.total };
}

async function run() {
  console.log("=== Practical Nursing Respiratory Published Banks ===");
  await ensureColumns();
  const results = [];
  for (const cell of cells) results.push(await seedCell(cell));

  const verifiedTotal = results.reduce((total, result) => total + result.verified, 0);
  if (verifiedTotal !== 120) throw new Error(`PN_RESPIRATORY_POSTSEED_TOTAL_INVALID: ${verifiedTotal}`);

  console.log(JSON.stringify({ cells: results.length, verifiedTotal, results }, null, 2));
  console.log("=== Practical Nursing Respiratory Published Banks Complete ===");
}

run().then(() => process.exit(0)).catch((error) => {
  console.error("Practical nursing respiratory seeding failed:", error);
  process.exit(1);
});
