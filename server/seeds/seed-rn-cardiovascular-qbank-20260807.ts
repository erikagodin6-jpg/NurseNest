import crypto from "crypto";
import { pool } from "../storage";
import { rnCardiovascularBankBatch1Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-bank-batch1";
import { rnCardiovascularBankBatch2Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-bank-batch2";
import { rnCardiovascularBankBatch3Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-bank-batch3";
import { rnCardiovascularRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

interface TopicRange {
  start: number;
  end: number;
  topic: string;
}

const BATCH_1_TOPICS: TopicRange[] = [
  { start: 0, end: 4, topic: "Heart Failure" },
  { start: 5, end: 9, topic: "Acute Coronary Syndrome & Stable Angina" },
  { start: 10, end: 14, topic: "Hypertension & Hypertensive Crisis" },
  { start: 15, end: 19, topic: "Cardiac Catheterization, PCI & CABG" },
  { start: 20, end: 24, topic: "Valvular Heart Disease & Heart Sounds" },
  { start: 25, end: 29, topic: "Pericarditis, Effusion & Tamponade" },
  { start: 30, end: 34, topic: "Shock & Hemodynamic Monitoring" },
  { start: 35, end: 39, topic: "PAD, Acute Limb Ischemia & Venous Disease" },
  { start: 40, end: 44, topic: "Infective Endocarditis" },
  { start: 45, end: 49, topic: "Aortic Aneurysm & Dissection" },
];

const BATCH_2_TOPICS: TopicRange[] = [
  { start: 0, end: 4, topic: "Atrial Fibrillation & Flutter" },
  { start: 5, end: 8, topic: "Supraventricular Tachycardia" },
  { start: 9, end: 13, topic: "Ventricular Tachycardia, VF & Torsades" },
  { start: 14, end: 18, topic: "Bradyarrhythmias & Heart Block" },
  { start: 19, end: 23, topic: "Pacemaker & ICD Management" },
  { start: 24, end: 27, topic: "ECG Interpretation" },
  { start: 28, end: 32, topic: "Cardiomyopathy & Myocarditis" },
  { start: 33, end: 37, topic: "Cardiac Arrest & Post-Arrest Care" },
  { start: 38, end: 41, topic: "DVT & Anticoagulation" },
  { start: 42, end: 45, topic: "Cardiac Rehabilitation & Lipid Management" },
  { start: 46, end: 47, topic: "Adult Congenital Heart Disease" },
  { start: 48, end: 49, topic: "Syncope & Orthostatic Hypotension" },
];

const BATCH_3_TOPICS: TopicRange[] = [
  { start: 0, end: 4, topic: "Heart Failure Medication Safety & Acute Care" },
  { start: 5, end: 9, topic: "ACS Complications & Medication Safety" },
  { start: 10, end: 14, topic: "Antihypertensive Medication Safety" },
  { start: 15, end: 19, topic: "Valves & Prosthetic Valve Safety" },
  { start: 20, end: 24, topic: "Hemodynamics & Shock" },
  { start: 25, end: 29, topic: "Vascular & Anticoagulation" },
  { start: 30, end: 34, topic: "CABG & Cardiac Catheterization" },
  { start: 35, end: 39, topic: "Pericardial & Aortic Emergencies" },
  { start: 40, end: 44, topic: "Antiarrhythmic Medication Safety" },
  { start: 45, end: 49, topic: "Advanced Heart Failure, LVAD & Transplant" },
];

function topicFor(index: number, ranges: TopicRange[]): string {
  return ranges.find((range) => index >= range.start && index <= range.end)?.topic ?? "Cardiovascular";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function ensureColumns() {
  // Preserve the richer authoring contract instead of discarding per-distractor rationales.
  // The learner API/UI may require a follow-up renderer change to surface this column.
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function alreadyExists(stem: string, hash: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT id
       FROM exam_questions
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
       $5, $6, $7, 'Cardiovascular', $8,
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
      ["rn", "nclex-rn", "cardiovascular", sourceTag, regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ],
  );
  return true;
}

async function seedSharedBatch(
  questions: ExamQuestion[],
  ranges: TopicRange[],
  sourceTag: string,
): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0;
  let skipped = 0;
  for (let i = 0; i < questions.length; i++) {
    const didInsert = await insertQuestion({
      q: questions[i],
      topic: topicFor(i, ranges),
      regionScope: "BOTH",
      countryCode: null,
      licensingBody: "NCSBN",
      difficulty: 3,
      cognitiveLevel: "application",
      sourceTag,
    });
    if (didInsert) inserted++;
    else skipped++;
  }
  return { inserted, skipped };
}

async function seedRegional(): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0;
  let skipped = 0;
  for (const q of rnCardiovascularRegionalBankBatch1Questions) {
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
    if (didInsert) inserted++;
    else skipped++;
  }
  return { inserted, skipped };
}

async function main() {
  console.log("=== RN Cardiovascular Question Bank 2026-08-07 ===");
  await ensureColumns();

  const batch1 = await seedSharedBatch(rnCardiovascularBankBatch1Questions, BATCH_1_TOPICS, "cardio-batch-1");
  const batch2 = await seedSharedBatch(rnCardiovascularBankBatch2Questions, BATCH_2_TOPICS, "cardio-batch-2");
  const batch3 = await seedSharedBatch(rnCardiovascularBankBatch3Questions, BATCH_3_TOPICS, "cardio-batch-3");
  const regional = await seedRegional();

  const expected =
    rnCardiovascularBankBatch1Questions.length +
    rnCardiovascularBankBatch2Questions.length +
    rnCardiovascularBankBatch3Questions.length +
    rnCardiovascularRegionalBankBatch1Questions.length;

  const authoredWithDistractorRationales = [
    ...rnCardiovascularBankBatch1Questions,
    ...rnCardiovascularBankBatch2Questions,
    ...rnCardiovascularBankBatch3Questions,
    ...rnCardiovascularRegionalBankBatch1Questions,
  ].filter((q) => Array.isArray(q.dr) && q.dr.length > 0).length;

  if (expected !== 170) {
    throw new Error(`RN_CARDIO_AUTHORING_COUNT_MISMATCH: expected 170, found ${expected}`);
  }
  if (authoredWithDistractorRationales !== 170) {
    throw new Error(`RN_CARDIO_DISTRACTOR_RATIONALE_GAP: ${authoredWithDistractorRationales}/170 authored rows contain distractor rationales`);
  }

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
      FROM exam_questions
     WHERE tier = 'rn'
       AND exam = 'NCLEX-RN'
       AND body_system = 'Cardiovascular'
       AND status = 'published'
     GROUP BY region_scope, topic
     ORDER BY region_scope, topic
  `);

  console.log({ batch1, batch2, batch3, regional, expected, authoredWithDistractorRationales });
  console.table(verification.rows);
  console.log("=== RN Cardiovascular Question Bank Seed Complete ===");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RN cardiovascular seed failed:", error);
    process.exit(1);
  });
