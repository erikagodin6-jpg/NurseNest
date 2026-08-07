import crypto from "crypto";
import { pool } from "../storage";
import { rnEndocrineBankBatch1Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch1";
import { rnEndocrineBankBatch2Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch2";
import { rnEndocrineBankBatch3Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch3";
import { rnEndocrineRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-endocrine-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnEndocrineBankBatch1Questions,
  ...rnEndocrineBankBatch2Questions,
  ...rnEndocrineBankBatch3Questions,
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function topicFor(stem: string): string {
  const s = stem.toLowerCase();
  if (/dka|ketoacid|hhs|hyperosmolar/.test(s)) return "Hyperglycemic Crises";
  if (/hypogly|glucagon|continuous glucose|cgm/.test(s)) return "Hypoglycemia & Glucose Monitoring";
  if (/insulin|metformin|sglt|glp-1|sulfonyl|dpp-4|pioglit|enteral|prednisone/.test(s)) return "Diabetes Pharmacology & Insulin Safety";
  if (/neuropathy|foot|retina|gastropares|microvascular|a1c/.test(s)) return "Diabetes Complications";
  if (/thyroid|levothy|methimazole|propylthiouracil|graves|radioactive iodine|calcitonin/.test(s)) return "Thyroid Disorders";
  if (/addison|adrenal|cushing|cortisol|pheochrom|aldoster|fludrocort|hydrocort/.test(s)) return "Adrenal Disorders";
  if (/siadh|diabetes insipidus|desmopressin|tolvaptan|pituitary|acromeg|prolact|cabergoline|octreotide|men1|men2/.test(s)) return "Pituitary & ADH Disorders";
  if (/calcium|parathy|osteoporosis|bisphosph|alendronate|vitamin d|osteomalacia/.test(s)) return "Calcium, Parathyroid & Bone";
  if (/pregnan|breastfeed|newborn|child|school|adolescent|pediatric/.test(s)) return "Pregnancy & Pediatric Endocrine";
  return "Endocrine Clinical Judgment";
}

function answerIndexes(q: ExamQuestion): number[] {
  return q.t === "sata" && q.ca ? q.ca : [q.a];
}

async function insertQuestion(q: ExamQuestion, regionScope: "BOTH" | "CAN" | "US", countryCode: string | null, topic: string, difficulty = 3, cognitiveLevel = "application") {
  const hash = stemHash(q.q);
  const existing = await pool.query(
    `SELECT id FROM exam_questions WHERE stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)) LIMIT 1`,
    [hash, q.q]
  );
  if (existing.rows.length) return "skipped" as const;

  const sata = q.t === "sata";
  await pool.query(
    `INSERT INTO exam_questions (
      id, tier, exam, question_type, status, stem, options, correct_answer,
      rationale, distractor_rationales, difficulty, body_system, topic,
      country_code, licensing_body, language_code, cognitive_level, question_format,
      lab_unit_variant, medication_naming_variant, region_scope, is_mock_exam_eligible,
      is_adaptive_eligible, career_type, domain, tags, stem_hash, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), 'rn', 'NCLEX-RN', $1, 'published', $2, $3, $4,
      $5, $6, $7, 'Endocrine', $8,
      $9, 'NCSBN', 'en', $10, $11,
      $12, $13, $14, true,
      true, 'nursing', 'Physiological Integrity', $15, $16, NOW(), NOW()
    )`,
    [
      sata ? "sata" : "multiple_choice",
      q.q,
      JSON.stringify(q.o),
      JSON.stringify(answerIndexes(q)),
      q.r,
      JSON.stringify(q.dr ?? []),
      difficulty,
      topic,
      countryCode,
      cognitiveLevel,
      sata ? "SATA" : "MCQ",
      regionScope === "CAN" ? "SI" : regionScope === "US" ? "US_conventional" : "mixed",
      regionScope === "CAN" ? "Canadian_generic" : regionScope === "US" ? "US_generic" : "generic_international",
      regionScope,
      ["rn", "nclex-rn", "endocrine", regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ]
  );
  return "inserted" as const;
}

async function main() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB DEFAULT '[]'::jsonb`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  if (shared.length !== 150) throw new Error(`RN_ENDOCRINE_SHARED_COUNT_INVALID:${shared.length}`);
  if (rnEndocrineRegionalBankBatch1Questions.length !== 20) throw new Error(`RN_ENDOCRINE_REGIONAL_COUNT_INVALID:${rnEndocrineRegionalBankBatch1Questions.length}`);

  let inserted = 0;
  let skipped = 0;

  for (const q of shared) {
    const result = await insertQuestion(q, "BOTH", null, topicFor(q.q));
    result === "inserted" ? inserted++ : skipped++;
  }

  for (const q of rnEndocrineRegionalBankBatch1Questions) {
    const result = await insertQuestion(q, q.regionScope, q.countryCode, q.topic, q.difficulty, q.cognitiveLevel);
    result === "inserted" ? inserted++ : skipped++;
  }

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
    FROM exam_questions
    WHERE tier='rn' AND exam='NCLEX-RN' AND body_system='Endocrine' AND status='published'
    GROUP BY region_scope, topic
    ORDER BY region_scope, topic
  `);

  console.log({ authored: 170, inserted, skipped });
  console.table(verification.rows);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
