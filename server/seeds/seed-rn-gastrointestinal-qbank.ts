import crypto from "crypto";
import { pool } from "../storage";
import { rnGastrointestinalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch1";
import { rnGastrointestinalBankBatch2Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch2";
import { rnGastrointestinalBankBatch3Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch3";
import { rnGastrointestinalRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnGastrointestinalBankBatch1Questions,
  ...rnGastrointestinalBankBatch2Questions,
  ...rnGastrointestinalBankBatch3Questions,
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function topicFor(stem: string): string {
  const s = stem.toLowerCase();
  if (/hematem|melena|hematoche|gi bleed|hemorrhag|varice|mallory|dieulafoy|gave/.test(s)) return "GI Bleeding & Hemostasis";
  if (/obstruct|ileus|periton|perforat|appendic|mesenteric ischem|ischemic colitis/.test(s)) return "Bowel Obstruction & Acute Abdomen";
  if (/gall|cholang|bile|biliary|ercp|cholecyst/.test(s)) return "Biliary Disease";
  if (/pancrea/.test(s)) return "Pancreatic Disorders";
  if (/cirrho|portal|ascites|sbp|spontaneous bacterial|hepatorenal|varice/.test(s)) return "Cirrhosis & Portal Hypertension";
  if (/encephal|lactulose|rifaximin|ammonia/.test(s)) return "Hepatic Encephalopathy";
  if (/acute liver|hepatitis|acetaminophen|hcv|hbv|alcohol-associated|hepatocellular/.test(s)) return "Liver Failure & Hepatitis";
  if (/crohn|ulcerative|colitis|ibd|toxic megacolon/.test(s)) return "Inflammatory Bowel Disease";
  if (/ileostomy|colostomy|stoma|ostomy/.test(s)) return "Ostomy Care";
  if (/celiac|malabsorp|steator|short-bowel|lactose/.test(s)) return "Malabsorption & Celiac Disease";
  if (/reflux|gerd|barrett|dysphag|esophag/.test(s)) return "Esophageal Disorders";
  if (/feeding|enteral|parenteral|tpn|peg|refeeding|nutrition/.test(s)) return "GI Nutrition & Feeding";
  if (/cancer|malignan|anastomotic/.test(s)) return "GI Oncology & Surgical Complications";
  if (/colonoscopy|endoscopy|dilation/.test(s)) return "GI Procedures";
  return "Gastrointestinal Clinical Judgment";
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
      $5, $6, $7, 'Gastrointestinal', $8,
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
      ["rn", "nclex-rn", "gastrointestinal", regionScope.toLowerCase(), topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      hash,
    ],
  );
  return "inserted" as const;
}

async function main() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB DEFAULT '[]'::jsonb`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);

  if (rnGastrointestinalBankBatch1Questions.length !== 47) throw new Error(`RN_GI_BATCH1_COUNT_INVALID:${rnGastrointestinalBankBatch1Questions.length}`);
  if (rnGastrointestinalBankBatch2Questions.length !== 50) throw new Error(`RN_GI_BATCH2_COUNT_INVALID:${rnGastrointestinalBankBatch2Questions.length}`);
  if (rnGastrointestinalBankBatch3Questions.length !== 53) throw new Error(`RN_GI_BATCH3_COUNT_INVALID:${rnGastrointestinalBankBatch3Questions.length}`);
  if (shared.length !== 150) throw new Error(`RN_GI_SHARED_COUNT_INVALID:${shared.length}`);
  if (rnGastrointestinalRegionalBankBatch1Questions.length !== 20) throw new Error(`RN_GI_REGIONAL_COUNT_INVALID:${rnGastrointestinalRegionalBankBatch1Questions.length}`);

  let inserted = 0;
  let skipped = 0;
  for (const q of shared) {
    const result = await insertQuestion(q, "BOTH", null, topicFor(q.q));
    result === "inserted" ? inserted++ : skipped++;
  }
  for (const q of rnGastrointestinalRegionalBankBatch1Questions) {
    const result = await insertQuestion(q, q.regionScope, q.countryCode, q.topic, q.difficulty, q.cognitiveLevel);
    result === "inserted" ? inserted++ : skipped++;
  }

  const verification = await pool.query(`
    SELECT region_scope, topic, COUNT(*)::int AS count
    FROM exam_questions
    WHERE tier='rn' AND exam='NCLEX-RN' AND body_system='Gastrointestinal' AND status='published'
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
