import crypto from "crypto";
import { pool } from "../storage";
import { rnRespiratoryBankBatch6PediatricsQuestions } from "../../client/src/data/exam-questions/rn-respiratory-bank-batch6-pediatrics";

const TOPIC_RANGES = [
  { start: 0, end: 4, topic: "Bronchiolitis" },
  { start: 5, end: 9, topic: "Croup" },
  { start: 10, end: 14, topic: "Epiglottitis & Upper-Airway Emergencies" },
  { start: 15, end: 19, topic: "Pediatric Asthma" },
  { start: 20, end: 24, topic: "Pediatric Pneumonia" },
  { start: 25, end: 29, topic: "Pediatric Cystic Fibrosis" },
  { start: 30, end: 34, topic: "Neonatal Respiratory Distress Syndrome" },
  { start: 35, end: 39, topic: "Bronchopulmonary Dysplasia" },
  { start: 40, end: 44, topic: "Pediatric Airway Foreign Body & Tracheostomy" },
  { start: 45, end: 49, topic: "Pediatric Respiratory Deterioration" },
] as const;

function topicFor(index: number): string {
  return TOPIC_RANGES.find((range) => index >= range.start && index <= range.end)?.topic ?? "Pediatric Respiratory";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function seedRnRespiratoryBatch6Pediatrics() {
  console.log("=== RN Respiratory Question Bank Batch 6 — Pediatrics ===");

  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rnRespiratoryBankBatch6PediatricsQuestions.length; i++) {
    const q = rnRespiratoryBankBatch6PediatricsQuestions[i];
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
        ["rn", "nclex-rn", "respiratory", "pediatric", "shared-ca-us", topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
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
      AND tags @> ARRAY['pediatric']::text[]
    GROUP BY topic
    ORDER BY topic
  `);

  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped existing: ${skipped}`);
  console.table(verification.rows);
  console.log("=== RN Respiratory Batch 6 Complete ===");
}

seedRnRespiratoryBatch6Pediatrics()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RN respiratory pediatric batch 6 seeding failed:", error);
    process.exit(1);
  });
