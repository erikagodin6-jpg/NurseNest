import crypto from "crypto";
import { pool } from "../storage";
import { rnRespiratoryBankBatch5Questions } from "../../client/src/data/exam-questions/rn-respiratory-bank-batch5";

const TOPIC_RANGES = [
  { start: 0, end: 4, topic: "Bronchoscopy & Respiratory Diagnostics" },
  { start: 5, end: 9, topic: "Thoracic Surgery" },
  { start: 10, end: 14, topic: "Aspiration & Dysphagia" },
  { start: 15, end: 19, topic: "Inhalation Injury & Smoke Exposure" },
  { start: 20, end: 24, topic: "Neuromuscular Respiratory Failure" },
  { start: 25, end: 29, topic: "Alpha-1 Antitrypsin Deficiency" },
  { start: 30, end: 34, topic: "Occupational & Environmental Lung Disease" },
  { start: 35, end: 39, topic: "Lung Cancer" },
  { start: 40, end: 44, topic: "Endemic Fungal Pulmonary Disease" },
  { start: 45, end: 49, topic: "Hemoptysis & Diffuse Alveolar Hemorrhage" },
] as const;

function topicFor(index: number): string {
  return TOPIC_RANGES.find((range) => index >= range.start && index <= range.end)?.topic ?? "Respiratory";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function seedRnRespiratoryBatch5() {
  console.log("=== RN Respiratory Question Bank Batch 5 ===");

  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rnRespiratoryBankBatch5Questions.length; i++) {
    const q = rnRespiratoryBankBatch5Questions[i];
    const hash = stemHash(q.q);
    const existing = await pool.query(
      `SELECT id FROM exam_questions WHERE stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)) LIMIT 1`,
      [hash, q.q]
    );

    if (existing.rows.length > 0) {
      skipped++;
      continue;
    }

    const isSata = q.t === "sata" && Array.isArray(q.ca) && q.ca.length > 0;
    const correct = isSata ? q.ca : [q.a];
    const questionType = isSata ? "sata" : "multiple_choice";
    const questionFormat = isSata ? "SATA" : "MCQ";
    const topic = topicFor(i);

    await pool.query(
      `INSERT INTO exam_questions (
        id, tier, exam, question_type, status, stem, options, correct_answer,
        rationale, difficulty, body_system, topic, country_code, licensing_body,
        language_code, cognitive_level, question_format, lab_unit_variant,
        medication_naming_variant, region_scope, is_mock_exam_eligible,
        is_adaptive_eligible, career_type, domain, tags, stem_hash, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), 'rn', 'NCLEX-RN', $1, 'published', $2, $3, $4,
        $5, 3, 'Respiratory', $6, NULL, 'NCSBN',
        'en', 'application', $7, 'mixed',
        'generic_international', 'BOTH', true,
        true, 'nursing', 'Physiological Integrity', $8, $9, NOW(), NOW()
      )`,
      [
        questionType,
        q.q,
        JSON.stringify(q.o),
        JSON.stringify(correct),
        q.r,
        topic,
        questionFormat,
        ["rn", "nclex-rn", "respiratory", "shared-ca-us", topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
        hash,
      ]
    );
    inserted++;
  }

  const verification = await pool.query(`
    SELECT topic, COUNT(*)::int AS count
    FROM exam_questions
    WHERE tier = 'rn'
      AND exam = 'NCLEX-RN'
      AND body_system = 'Respiratory'
      AND region_scope = 'BOTH'
      AND status = 'published'
    GROUP BY topic
    ORDER BY topic
  `);

  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped existing: ${skipped}`);
  console.table(verification.rows);
  console.log("=== RN Respiratory Batch 5 Complete ===");
}

seedRnRespiratoryBatch5()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RN respiratory batch 5 seeding failed:", error);
    process.exit(1);
  });
