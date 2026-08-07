import crypto from "crypto";
import { pool } from "../storage";
import { rnHematologyImmunologyBankBatch1Questions } from "../../client/src/data/exam-questions/rn-hematology-immunology-bank-batch1";
import { rnHematologyImmunologyBankBatch2Questions } from "../../client/src/data/exam-questions/rn-hematology-immunology-bank-batch2";
import { rnHematologyImmunologyBankBatch3Questions } from "../../client/src/data/exam-questions/rn-hematology-immunology-bank-batch3";
import { rnHematologyImmunologyRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-hematology-immunology-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnHematologyImmunologyBankBatch1Questions,
  ...rnHematologyImmunologyBankBatch2Questions,
  ...rnHematologyImmunologyBankBatch3Questions,
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function topicFor(stem: string): string {
  const s = stem.toLowerCase();
  if (/iron|b12|folate|anemia|pernicious|g6pd|spherocyt|hemolytic/.test(s)) return "Anemia & Hemolysis";
  if (/sickle|thalassem/.test(s)) return "Hemoglobinopathies";
  if (/transfus|trali|taco|blood product|massive/.test(s)) return "Transfusion Medicine";
  if (/dic|disseminated/.test(s)) return "DIC";
  if (/hit|heparin-induced/.test(s)) return "Heparin-Induced Thrombocytopenia";
  if (/itp|immune thrombocyt/.test(s)) return "Immune Thrombocytopenia";
  if (/ttp|hus|microangiop|schistocyte/.test(s)) return "Thrombotic Microangiopathy";
  if (/hemoph|von willebrand|vwd/.test(s)) return "Inherited Bleeding Disorders";
  if (/warfarin|apixaban|dabigatran|anticoag|dvt|vte/.test(s)) return "Anticoagulation & VTE";
  if (/polycythem|myelofib|thrombocythem/.test(s)) return "Myeloproliferative Disorders";
  if (/leukemia|aml|all|neutropen|tumor lysis/.test(s)) return "Leukemia & Neutropenic Emergencies";
  if (/lymphoma|mediastinal/.test(s)) return "Lymphoma";
  if (/myeloma|plasma-cell/.test(s)) return "Multiple Myeloma";
  if (/stem-cell|transplant|gvhd|graft-versus/.test(s)) return "Hematopoietic Stem Cell Transplant";
  if (/anaphyl|epinephrine|allergen/.test(s)) return "Anaphylaxis";
  if (/immunosuppress|biologic|rituximab|immunodeficiency|ivig|splenectomy/.test(s)) return "Immunology & Immunosuppression";
  return "Hematology Clinical Judgment";
}

function answers(q: ExamQuestion): number[] {
  return q.t === "sata" && q.ca ? q.ca : [q.a];
}

async function insertQuestion(
  q: ExamQuestion,
  regionScope: "BOTH" | "CAN" | "US",
  countryCode: string | null,
  topic: string,
  difficulty = 3,
  cognitiveLevel = "application",
) {
  const hash = stemHash(q.q);
  const existing = await pool.query(
    `SELECT id FROM exam_questions WHERE stem_hash=$1 OR lower(trim(stem))=lower(trim($2)) LIMIT 1`,
    [hash, q.q],
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
      $5, $6, $7, 'Hematology', $8,
      $9, 'NCSBN', 'en', $10, $11,
      $12, $13, $14, true,
      true, 'nursing', 'Physiological Integrity', $15, $16, NOW(), NOW()
    )`,
    [
      sata ? "sata" : "multiple_choice",
      q.q,
      JSON.stringify(q.o),
      JSON.stringify(answers(q)),
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
      ["rn", "nclex-rn", "hematology", "immunology", regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ],
  );
  return "inserted" as const;
}

async function main() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB DEFAULT '[]'::jsonb`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  if (rnHematologyImmunologyBankBatch1Questions.length !== 50) throw new Error(`RN_HEME_BATCH1_COUNT_INVALID:${rnHematologyImmunologyBankBatch1Questions.length}`);
  if (rnHematologyImmunologyBankBatch2Questions.length !== 50) throw new Error(`RN_HEME_BATCH2_COUNT_INVALID:${rnHematologyImmunologyBankBatch2Questions.length}`);
  if (rnHematologyImmunologyBankBatch3Questions.length !== 50) throw new Error(`RN_HEME_BATCH3_COUNT_INVALID:${rnHematologyImmunologyBankBatch3Questions.length}`);
  if (shared.length !== 150) throw new Error(`RN_HEME_SHARED_COUNT_INVALID:${shared.length}`);
  if (rnHematologyImmunologyRegionalBankBatch1Questions.length !== 20) throw new Error(`RN_HEME_REGIONAL_COUNT_INVALID:${rnHematologyImmunologyRegionalBankBatch1Questions.length}`);

  let inserted = 0;
  let skipped = 0;
  for (const q of shared) {
    const result = await insertQuestion(q, "BOTH", null, topicFor(q.q));
    result === "inserted" ? inserted++ : skipped++;
  }
  for (const q of rnHematologyImmunologyRegionalBankBatch1Questions) {
    const result = await insertQuestion(q, q.regionScope, q.countryCode, q.topic, q.difficulty, q.cognitiveLevel);
    result === "inserted" ? inserted++ : skipped++;
  }

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
    FROM exam_questions
    WHERE tier='rn' AND exam='NCLEX-RN' AND body_system='Hematology' AND status='published'
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
