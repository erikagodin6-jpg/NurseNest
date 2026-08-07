import crypto from "crypto";
import { pool } from "../storage";
import { rnRenalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-renal-bank-batch1";
import { rnRenalBankBatch2Questions } from "../../client/src/data/exam-questions/rn-renal-bank-batch2";
import { rnRenalBankBatch3Questions } from "../../client/src/data/exam-questions/rn-renal-bank-batch3";
import { rnRenalRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-renal-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

interface TopicRange { start: number; end: number; topic: string }

const BATCH_1_TOPICS: TopicRange[] = [
  { start: 0, end: 9, topic: "Acute Kidney Injury" },
  { start: 10, end: 19, topic: "Hyperkalemia, Electrolytes & Acid-Base" },
  { start: 20, end: 29, topic: "Hemodialysis & Vascular Access" },
  { start: 30, end: 39, topic: "Peritoneal Dialysis & CRRT" },
  { start: 40, end: 49, topic: "CKD, Glomerular Disease & Transplant" },
];

const BATCH_2_TOPICS: TopicRange[] = [
  { start: 0, end: 9, topic: "CKD Progression, Anemia & CKD-MBD" },
  { start: 10, end: 19, topic: "Urinary Retention, BPH & Obstructive Uropathy" },
  { start: 20, end: 29, topic: "Nephrolithiasis, UTI & Pyelonephritis" },
  { start: 30, end: 39, topic: "Glomerular & Autoimmune Kidney Disease" },
  { start: 40, end: 49, topic: "ADPKD, Renal Malignancy & Pediatric Renal" },
];

const BATCH_3_TOPICS: TopicRange[] = [
  { start: 0, end: 9, topic: "Advanced Dialysis, Access & Transplant" },
  { start: 10, end: 19, topic: "Nephrotoxins & Medication Safety" },
  { start: 20, end: 29, topic: "Sodium, Water & Volume Disorders" },
  { start: 30, end: 39, topic: "Renal Diagnostics & Diabetic Kidney Disease" },
  { start: 40, end: 49, topic: "Pregnancy, Kidney Failure Planning & Conservative Care" },
];

function topicFor(index: number, ranges: TopicRange[]): string {
  return ranges.find((r) => index >= r.start && index <= r.end)?.topic ?? "Renal";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function exists(stem: string, hash: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT id FROM exam_questions
      WHERE stem_hash = $1 OR lower(trim(stem)) = lower(trim($2))
      LIMIT 1`,
    [hash, stem],
  );
  return result.rows.length > 0;
}

async function insertQuestion(args: {
  q: ExamQuestion;
  topic: string;
  regionScope: "BOTH" | "CAN" | "US";
  countryCode: "CA" | "US" | null;
  licensingBody: string;
  difficulty: number;
  cognitiveLevel: string;
  sourceTag: string;
}) {
  const { q, topic, regionScope, countryCode, licensingBody, difficulty, cognitiveLevel, sourceTag } = args;
  const hash = stemHash(q.q);
  if (await exists(q.q, hash)) return false;

  const isSata = q.t === "sata" && Array.isArray(q.ca) && q.ca.length > 0;
  const correct = isSata ? q.ca : [q.a];
  const questionType = isSata ? "sata" : "multiple_choice";
  const questionFormat = isSata ? "SATA" : "MCQ";

  await pool.query(
    `INSERT INTO exam_questions (
       id, tier, exam, question_type, status, stem, options, correct_answer,
       rationale, distractor_rationales, difficulty, body_system, topic,
       country_code, licensing_body, language_code, cognitive_level,
       question_format, lab_unit_variant, medication_naming_variant,
       region_scope, is_mock_exam_eligible, is_adaptive_eligible,
       career_type, domain, tags, stem_hash, created_at, updated_at
     ) VALUES (
       gen_random_uuid(), 'rn', 'NCLEX-RN', $1, 'published', $2, $3, $4,
       $5, $6, $7, 'Renal', $8,
       $9, $10, 'en', $11,
       $12, $13, 'generic_international',
       $14, true, true,
       'nursing', 'Physiological Integrity', $15, $16, NOW(), NOW()
     )`,
    [
      questionType,
      q.q,
      JSON.stringify(q.o),
      JSON.stringify(correct),
      q.r,
      JSON.stringify(q.dr ?? []),
      difficulty,
      topic,
      countryCode,
      licensingBody,
      cognitiveLevel,
      questionFormat,
      countryCode === "CA" ? "SI" : countryCode === "US" ? "conventional" : "mixed",
      regionScope,
      ["rn", "nclex-rn", "renal", sourceTag, regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ],
  );
  return true;
}

async function seedShared(questions: ExamQuestion[], ranges: TopicRange[], sourceTag: string) {
  let inserted = 0;
  let skipped = 0;
  for (let i = 0; i < questions.length; i++) {
    const didInsert = await insertQuestion({
      q: questions[i], topic: topicFor(i, ranges), regionScope: "BOTH",
      countryCode: null, licensingBody: "NCSBN", difficulty: 3,
      cognitiveLevel: "application", sourceTag,
    });
    if (didInsert) inserted++; else skipped++;
  }
  return { inserted, skipped };
}

async function seedRegional() {
  let inserted = 0;
  let skipped = 0;
  for (const q of rnRenalRegionalBankBatch1Questions) {
    const didInsert = await insertQuestion({
      q, topic: q.topic, regionScope: q.regionScope, countryCode: q.countryCode,
      licensingBody: q.licensingBody, difficulty: q.difficulty,
      cognitiveLevel: q.cognitiveLevel, sourceTag: q.sourceFamily.toLowerCase(),
    });
    if (didInsert) inserted++; else skipped++;
  }
  return { inserted, skipped };
}

async function main() {
  console.log("=== RN Renal Question Bank 2026-08-07 ===");
  await ensureColumns();

  const batch1 = await seedShared(rnRenalBankBatch1Questions, BATCH_1_TOPICS, "renal-batch-1");
  const batch2 = await seedShared(rnRenalBankBatch2Questions, BATCH_2_TOPICS, "renal-batch-2");
  const batch3 = await seedShared(rnRenalBankBatch3Questions, BATCH_3_TOPICS, "renal-batch-3");
  const regional = await seedRegional();

  const all = [
    ...rnRenalBankBatch1Questions,
    ...rnRenalBankBatch2Questions,
    ...rnRenalBankBatch3Questions,
    ...rnRenalRegionalBankBatch1Questions,
  ];
  if (all.length !== 170) throw new Error(`RN_RENAL_AUTHORING_COUNT_MISMATCH: ${all.length}/170`);
  const withDr = all.filter((q) => Array.isArray(q.dr) && q.dr.length > 0).length;
  if (withDr !== 170) throw new Error(`RN_RENAL_DISTRACTOR_RATIONALE_GAP: ${withDr}/170`);

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
      FROM exam_questions
     WHERE tier = 'rn'
       AND exam = 'NCLEX-RN'
       AND body_system = 'Renal'
       AND status = 'published'
     GROUP BY region_scope, topic
     ORDER BY region_scope, topic
  `);

  console.log({ batch1, batch2, batch3, regional, expected: 170, withDistractorRationales: withDr });
  console.table(verification.rows);
  console.log("=== RN Renal Question Bank Seed Complete ===");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("RN renal seed failed:", error);
  process.exit(1);
});
