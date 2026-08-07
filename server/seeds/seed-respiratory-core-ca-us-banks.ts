import crypto from "crypto";
import { pool } from "../storage";
import "../../client/src/data/lessons/respiratory-core-ca-us-coverage";
import {
  rpnCaAsthmaRexpnPublishedBank,
  pnUsAsthmaNclexPublishedBank,
  rpnCaCopdRexpnPublishedBank,
  pnUsCopdNclexPublishedBank,
  rpnCaPneumoniaRexpnPublishedBank,
  pnUsPneumoniaNclexPublishedBank
} from "../../client/src/data/exam-questions/practical-nursing-respiratory-published-banks";
import { rnCaAsthmaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-ca-asthma-nclex-bank-batch1";
import { rnUsAsthmaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-us-asthma-nclex-bank-batch1";
import { rnCaCopdNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-ca-copd-nclex-bank-batch1";
import { rnUsCopdNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-us-copd-nclex-bank-batch1";
import { rnCaPneumoniaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-ca-pneumonia-nclex-bank-batch1";
import { rnUsPneumoniaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-us-pneumonia-nclex-bank-batch1";

type Question = {
  id: string;
  exam: "REX-PN" | "NCLEX-PN" | "NCLEX-RN";
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

type Cell = {
  label: string;
  tier: "rpn" | "rn";
  exam: "REX-PN" | "NCLEX-PN" | "NCLEX-RN";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  labUnitVariant: "SI" | "conventional";
  medicationNamingVariant: "Canadian_generic" | "USAN";
  topic: "Asthma" | "COPD" | "Community-Acquired Pneumonia";
  questions: readonly Question[];
};

const cells: Cell[] = [
  { label: "RPN/CA/REX-PN/Asthma", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Asthma", questions: rpnCaAsthmaRexpnPublishedBank },
  { label: "PN/US/NCLEX-PN/Asthma", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Asthma", questions: pnUsAsthmaNclexPublishedBank },
  { label: "RPN/CA/REX-PN/COPD", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "COPD", questions: rpnCaCopdRexpnPublishedBank },
  { label: "PN/US/NCLEX-PN/COPD", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "COPD", questions: pnUsCopdNclexPublishedBank },
  { label: "RPN/CA/REX-PN/CAP", tier: "rpn", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Community-Acquired Pneumonia", questions: rpnCaPneumoniaRexpnPublishedBank },
  { label: "PN/US/NCLEX-PN/CAP", tier: "rpn", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Community-Acquired Pneumonia", questions: pnUsPneumoniaNclexPublishedBank },
  { label: "RN/CA/NCLEX-RN/Asthma", tier: "rn", exam: "NCLEX-RN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Asthma", questions: rnCaAsthmaNclexBankBatch1 },
  { label: "RN/US/NCLEX-RN/Asthma", tier: "rn", exam: "NCLEX-RN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Asthma", questions: rnUsAsthmaNclexBankBatch1 },
  { label: "RN/CA/NCLEX-RN/COPD", tier: "rn", exam: "NCLEX-RN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "COPD", questions: rnCaCopdNclexBankBatch1 },
  { label: "RN/US/NCLEX-RN/COPD", tier: "rn", exam: "NCLEX-RN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "COPD", questions: rnUsCopdNclexBankBatch1 },
  { label: "RN/CA/NCLEX-RN/CAP", tier: "rn", exam: "NCLEX-RN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", topic: "Community-Acquired Pneumonia", questions: rnCaPneumoniaNclexBankBatch1 },
  { label: "RN/US/NCLEX-RN/CAP", tier: "rn", exam: "NCLEX-RN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", topic: "Community-Acquired Pneumonia", questions: rnUsPneumoniaNclexBankBatch1 }
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
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

async function seedCell(cell: Cell) {
  if (cell.questions.length !== 20) throw new Error(`RESP_CORE_SEED_COUNT_INVALID: ${cell.label}/${cell.questions.length}`);
  const distribution = [0, 0, 0, 0];
  cell.questions.forEach((question) => (distribution[question.correctAnswer] += 1));
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`RESP_CORE_SEED_BALANCE_INVALID: ${cell.label}/${distribution.join(",")}`);

  let inserted = 0;
  let skipped = 0;
  for (const question of cell.questions) {
    if (
      question.exam !== cell.exam ||
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope ||
      question.topic !== cell.topic ||
      question.bodySystem !== "Respiratory"
    ) {
      throw new Error(`RESP_CORE_SEED_SCOPE_INVALID: ${cell.label}/${question.id}`);
    }

    const hash = stemHash(question.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions
       WHERE (stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)))
         AND tier = $3 AND exam = $4 AND region_scope = $5 AND topic = $6
       LIMIT 1`,
      [hash, question.stem, cell.tier, cell.exam, cell.regionScope, cell.topic]
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
        $1, $2, $3, 'multiple_choice', 'published', $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, 'Respiratory', $14, $15, 'NCSBN',
        'en', $16, 'MCQ', $17, $18, $19, true,
        true, 'nursing', $20, $21, $22, NOW(), NOW()
      )`,
      [
        question.id,
        cell.tier,
        cell.exam,
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
        cell.topic,
        cell.countryCode,
        question.cognitiveLevel,
        cell.labUnitVariant,
        cell.medicationNamingVariant,
        cell.regionScope,
        question.clientNeedsSubcategory,
        [
          cell.tier,
          cell.exam.toLowerCase(),
          cell.countryCode === "CA" ? "canada" : "united-states",
          "respiratory",
          cell.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
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
       COUNT(*) FILTER (WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation)) > 0)::int AS correct_rationales,
       COUNT(*) FILTER (WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale) = 'object' AND jsonb_object_length(incorrect_answer_rationale) = 4)::int AS option_rationales,
       COUNT(*) FILTER (WHERE difficulty <= 4)::int AS difficulty_valid
     FROM exam_questions
     WHERE tier = $1 AND exam = $2 AND body_system = 'Respiratory' AND topic = $3
       AND country_code = $4 AND region_scope = $5 AND status = 'published'
       AND stem_hash = ANY($6::text[])`,
    [cell.tier, cell.exam, cell.topic, cell.countryCode, cell.regionScope, hashes]
  );

  const row = verification.rows[0];
  if (row.total !== 20 || row.correct_rationales !== 20 || row.option_rationales !== 20 || row.difficulty_valid !== 20) {
    throw new Error(`RESP_CORE_POSTSEED_INVALID: ${cell.label}/${JSON.stringify(row)}`);
  }

  return { label: cell.label, inserted, skipped, verified: row.total };
}

async function run() {
  if (cells.length !== 12) throw new Error(`RESP_CORE_SEED_CELL_COUNT_INVALID: ${cells.length}`);
  await ensureColumns();
  const results = [];
  for (const cell of cells) results.push(await seedCell(cell));
  const verifiedTotal = results.reduce((sum, result) => sum + result.verified, 0);
  if (verifiedTotal !== 240) throw new Error(`RESP_CORE_POSTSEED_TOTAL_INVALID: ${verifiedTotal}`);
  console.log(JSON.stringify({ cells: results.length, verifiedTotal, results }, null, 2));
}

run().then(() => process.exit(0)).catch((error) => {
  console.error("Respiratory CA/US core seed failed:", error);
  process.exit(1);
});
