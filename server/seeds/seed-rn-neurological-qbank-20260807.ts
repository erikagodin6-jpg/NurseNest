import crypto from "crypto";
import { pool } from "../storage";
import { rnNeurologicalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-neurological-bank-batch1";
import { rnNeurologicalBankBatch2Questions } from "../../client/src/data/exam-questions/rn-neurological-bank-batch2";
import { rnNeurologicalBankBatch3Questions } from "../../client/src/data/exam-questions/rn-neurological-bank-batch3";
import { rnNeurologicalRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-neurological-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

interface TopicRange { start: number; end: number; topic: string }

const BATCH_1_TOPICS: TopicRange[] = [
  { start: 0, end: 9, topic: "Ischemic Stroke & TIA" },
  { start: 10, end: 19, topic: "Intracerebral & Subarachnoid Hemorrhage" },
  { start: 20, end: 29, topic: "Intracranial Pressure, EVD & Herniation" },
  { start: 30, end: 39, topic: "Seizure & Status Epilepticus" },
  { start: 40, end: 49, topic: "Traumatic Brain Injury" },
];

const BATCH_2_TOPICS: TopicRange[] = [
  { start: 0, end: 6, topic: "Meningitis & Encephalitis" },
  { start: 7, end: 16, topic: "Spinal Cord Injury & Autonomic Dysreflexia" },
  { start: 17, end: 26, topic: "Myasthenia Gravis, GBS & ALS" },
  { start: 27, end: 36, topic: "Parkinson Disease & Multiple Sclerosis" },
  { start: 37, end: 44, topic: "Brain Tumor, Hydrocephalus & Shunts" },
  { start: 45, end: 49, topic: "Focused Neurological Assessment & Delirium" },
];

const BATCH_3_TOPICS: TopicRange[] = [
  { start: 0, end: 4, topic: "Headache & Migraine Red Flags" },
  { start: 5, end: 9, topic: "Cerebral Venous Thrombosis" },
  { start: 10, end: 14, topic: "Cauda Equina & Spinal Compression" },
  { start: 15, end: 19, topic: "Peripheral Neuropathy, Bell Palsy & Trigeminal Neuralgia" },
  { start: 20, end: 29, topic: "Neurological Medication Safety" },
  { start: 30, end: 34, topic: "Lumbar Puncture & Neurovascular Procedures" },
  { start: 35, end: 39, topic: "Dementia & Delirium" },
  { start: 40, end: 44, topic: "Pediatric Neurology" },
];

function topicFor(index: number, ranges: TopicRange[]): string {
  return ranges.find((r) => index >= r.start && index <= r.end)?.topic ?? "Neurological";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function alreadyExists(stem: string, hash: string): Promise<boolean> {
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
  if (await alreadyExists(q.q, hash)) return false;

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
       $5, $6, $7, 'Neurological', $8,
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
      ["rn", "nclex-rn", "neurological", sourceTag, regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ],
  );
  return true;
}

async function seedShared(
  questions: ExamQuestion[], ranges: TopicRange[], sourceTag: string,
): Promise<{ inserted: number; skipped: number }> {
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

async function seedRegional(): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0;
  let skipped = 0;
  for (const q of rnNeurologicalRegionalBankBatch1Questions) {
    const didInsert = await insertQuestion({
      q,
      topic: q.topic,
      regionScope: q.regionScope,
      countryCode: q.countryCode,
      licensingBody: q.licensingBody,
      difficulty: q.difficulty,
      cognitiveLevel: q.cognitiveLevel,
      sourceTag: q.sourceFamily.toLowerCase(),
    });
    if (didInsert) inserted++; else skipped++;
  }
  return { inserted, skipped };
}

async function main() {
  console.log("=== RN Neurological Question Bank 2026-08-07 ===");
  await ensureColumns();

  const batch1 = await seedShared(rnNeurologicalBankBatch1Questions, BATCH_1_TOPICS, "neuro-batch-1");
  const batch2 = await seedShared(rnNeurologicalBankBatch2Questions, BATCH_2_TOPICS, "neuro-batch-2");
  const batch3 = await seedShared(rnNeurologicalBankBatch3Questions, BATCH_3_TOPICS, "neuro-batch-3");
  const regional = await seedRegional();

  const all = [
    ...rnNeurologicalBankBatch1Questions,
    ...rnNeurologicalBankBatch2Questions,
    ...rnNeurologicalBankBatch3Questions,
    ...rnNeurologicalRegionalBankBatch1Questions,
  ];
  if (all.length !== 170) throw new Error(`RN_NEURO_AUTHORING_COUNT_MISMATCH: ${all.length}/170`);
  const withDr = all.filter((q) => Array.isArray(q.dr) && q.dr.length > 0).length;
  if (withDr !== 170) throw new Error(`RN_NEURO_DISTRACTOR_RATIONALE_GAP: ${withDr}/170`);

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
      FROM exam_questions
     WHERE tier = 'rn'
       AND exam = 'NCLEX-RN'
       AND body_system = 'Neurological'
       AND status = 'published'
     GROUP BY region_scope, topic
     ORDER BY region_scope, topic
  `);

  console.log({ batch1, batch2, batch3, regional, expected: 170, withDistractorRationales: withDr });
  console.table(verification.rows);
  console.log("=== RN Neurological Question Bank Seed Complete ===");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("RN neurological seed failed:", error);
  process.exit(1);
});
