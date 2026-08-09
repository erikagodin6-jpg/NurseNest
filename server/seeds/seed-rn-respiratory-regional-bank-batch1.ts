import crypto from "crypto";
import { pool } from "../storage";
import { rnRespiratoryRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-respiratory-regional-bank-batch1";

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function seedRnRespiratoryRegionalBankBatch1() {
  console.log("=== RN Respiratory Regional Bank Batch 1 ===");

  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  let inserted = 0;
  let skipped = 0;

  for (const q of rnRespiratoryRegionalBankBatch1Questions) {
    const hash = stemHash(q.q);
    const existing = await pool.query(
      `SELECT id
         FROM exam_questions
        WHERE (stem_hash = $1 OR lower(trim(stem)) = lower(trim($2)))
          AND region_scope = $3
        LIMIT 1`,
      [hash, q.q, q.regionScope]
    );

    if (existing.rows.length > 0) {
      skipped++;
      continue;
    }

    const isSata = q.t === "sata" && Array.isArray(q.ca) && q.ca.length > 0;
    const correct = isSata ? q.ca : [q.a];
    const questionType = isSata ? "sata" : "multiple_choice";
    const questionFormat = isSata ? "SATA" : "MCQ";
    const labUnitVariant = q.regionScope === "CAN" ? "SI" : "conventional";
    const medicationNamingVariant = q.regionScope === "CAN" ? "Canadian_generic" : "USAN";

    await pool.query(
      `INSERT INTO exam_questions (
        id, tier, exam, question_type, status, stem, options, correct_answer,
        rationale, difficulty, body_system, topic, country_code, licensing_body,
        language_code, cognitive_level, question_format, lab_unit_variant,
        medication_naming_variant, region_scope, is_mock_exam_eligible,
        is_adaptive_eligible, career_type, domain, tags, stem_hash, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), 'rn', 'NCLEX-RN', $1, 'published', $2, $3, $4,
        $5, $6, 'Respiratory', $7, $8, $9,
        'en', $10, $11, $12,
        $13, $14, true,
        true, 'nursing', 'Physiological Integrity', $15, $16, NOW(), NOW()
      )`,
      [
        questionType,
        q.q,
        JSON.stringify(q.o),
        JSON.stringify(correct),
        q.r,
        q.difficulty,
        q.topic,
        q.countryCode,
        q.licensingBody,
        q.cognitiveLevel,
        questionFormat,
        labUnitVariant,
        medicationNamingVariant,
        q.regionScope,
        [
          "rn",
          "nclex-rn",
          "respiratory",
          q.regionScope === "CAN" ? "canada" : "united-states",
          q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        ],
        hash,
      ]
    );
    inserted++;
  }

  const verification = await pool.query(`
    SELECT region_scope, country_code, topic, COUNT(*)::int AS count
      FROM exam_questions
     WHERE tier = 'rn'
       AND exam = 'NCLEX-RN'
       AND body_system = 'Respiratory'
       AND region_scope IN ('CAN', 'US')
       AND status = 'published'
     GROUP BY region_scope, country_code, topic
     ORDER BY region_scope, topic
  `);

  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped existing: ${skipped}`);
  console.table(verification.rows);
  console.log("=== RN Respiratory Regional Bank Batch 1 Complete ===");
}

seedRnRespiratoryRegionalBankBatch1()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("RN respiratory regional bank seeding failed:", error);
    process.exit(1);
  });
