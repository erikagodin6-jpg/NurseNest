import crypto from "crypto";
import { pool } from "../storage";
import { rnRespiratoryBankBatch3Questions } from "../../client/src/data/exam-questions/rn-respiratory-bank-batch3";

const TOPIC_RANGES = [
  { start: 0, end: 7, topic: "Pneumothorax & Chest Tubes" },
  { start: 8, end: 13, topic: "Pleural Effusion, Empyema & Thoracentesis" },
  { start: 14, end: 19, topic: "Tuberculosis & Airborne Infection Control" },
  { start: 20, end: 25, topic: "Bronchiectasis & Airway Clearance" },
  { start: 26, end: 31, topic: "Interstitial Lung Disease & Pulmonary Fibrosis" },
  { start: 32, end: 39, topic: "Respiratory Failure, ABGs & Noninvasive Support" },
  { start: 40, end: 47, topic: "Tracheostomy, Suctioning & Mechanical Ventilation" },
] as const;

function topicFor(index: number): string {
  return TOPIC_RANGES.find((range) => index >= range.start && index <= range.end)?.topic ?? "Respiratory";
}

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function seedRnRespiratoryBatch3() {
  console.log("=== RN Respiratory Question Bank Batch 3 ===");

  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  // Retire one known inaccurate legacy item. Oxygen-associated hypercapnia in COPD is
  // multifactorial; it should not be taught as simply "suppressing hypoxic drive."
  const retired = await pool.query(
    `UPDATE exam_questions
       SET status = 'archived', updated_at = NOW()
     WHERE tier = 'rn'
       AND stem = $1
       AND status = 'published'
       AND rationale ILIKE '%hypoxic drive%'
     RETURNING id`,
    ["A COPD patient arrives in the ED with SpO2 99% on 6 L NC. The nurse's concern is:"]
  );
  console.log(`Archived inaccurate legacy COPD oxygen item: ${retired.rowCount ?? 0}`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rnRespiratoryBankBatch3Questions.length; i++) {
    const q = rnRespiratoryBankBatch3Questions[i];
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
  console.log("=== RN Respiratory Batch 3 Complete ===");
}

seedRnRespiratoryBatch3()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RN respiratory batch 3 seeding failed:", error);
    process.exit(1);
  });
