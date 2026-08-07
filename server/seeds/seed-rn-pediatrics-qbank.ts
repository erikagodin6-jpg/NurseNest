import crypto from "crypto";
import { pool } from "../storage";
import { rnPediatricsBankBatch1Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch1";
import { rnPediatricsBankBatch2Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch2";
import { rnPediatricsBankBatch3Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch3";
import { rnPediatricsRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-pediatrics-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnPediatricsBankBatch1Questions,
  ...rnPediatricsBankBatch2Questions,
  ...rnPediatricsBankBatch3Questions,
];

function hash(stem: string) {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}
function answers(q: ExamQuestion): number[] { return q.t === "sata" && q.ca ? q.ca : [q.a]; }
function topicFor(stem: string): string {
  const s = stem.toLowerCase();
  if (/dehydrat|oral rehydration|shock|fluid|medication-safety|mg\/kg|dose|maintenance iv/.test(s)) return "Pediatric Fluids, Shock & Medication Safety";
  if (/bronchiol|croup|epiglott|asthma|cystic|respiratory/.test(s)) return "Pediatric Respiratory";
  if (/intussus|pyloric|bilious|appendic|gastro|diarrhea|hus/.test(s)) return "Pediatric GI & Renal Emergencies";
  if (/kawasaki|tetralogy|ventricular septal|ductal|rheumatic|coarct/.test(s)) return "Pediatric Cardiovascular";
  if (/diabet|dka|hypogly|thyroid/.test(s)) return "Pediatric Endocrine";
  if (/seizure|mening|hydrocephal|brain tumor|intracranial/.test(s)) return "Pediatric Neurologic";
  if (/leukemia|neutropen|tumor lysis|sickle|hemoph|transfus/.test(s)) return "Pediatric Hematology & Oncology";
  if (/measles|varicella|pertuss|scarlet|infection|sepsis|fever/.test(s)) return "Pediatric Infectious Disease";
  if (/anaphyl|epinephrine|allerg|latex/.test(s)) return "Pediatric Allergy & Anaphylaxis";
  if (/development|family-centred|privacy|adolescent|autism|cerebral palsy|pain scale/.test(s)) return "Development, Communication & Family-Centred Care";
  if (/abuse|maltreat|safeguard|sexual abuse|bruise|nonaccidental/.test(s)) return "Pediatric Safeguarding";
  if (/poison|button battery|magnet|acetaminophen|opioid|iron overdose/.test(s)) return "Pediatric Toxicology";
  if (/burn|eczema|impetigo|skin/.test(s)) return "Pediatric Skin & Burns";
  if (/safe sleep|room-share|weighted swaddle/.test(s)) return "Infant Safe Sleep";
  return "Pediatric Clinical Judgment";
}

async function insert(q: ExamQuestion, region: "BOTH" | "CAN" | "US", country: string | null, topic: string, difficulty = 3, cognitive = "application") {
  const stemHash = hash(q.q);
  const existing = await pool.query(`SELECT id FROM exam_questions WHERE stem_hash=$1 OR lower(trim(stem))=lower(trim($2)) LIMIT 1`, [stemHash, q.q]);
  if (existing.rows.length) return "skipped" as const;
  const sata = q.t === "sata";
  await pool.query(`INSERT INTO exam_questions (
    id,tier,exam,question_type,status,stem,options,correct_answer,rationale,distractor_rationales,difficulty,
    body_system,topic,country_code,licensing_body,language_code,cognitive_level,question_format,lab_unit_variant,
    medication_naming_variant,region_scope,is_mock_exam_eligible,is_adaptive_eligible,career_type,domain,tags,stem_hash,created_at,updated_at
  ) VALUES (
    gen_random_uuid(),'rn','NCLEX-RN',$1,'published',$2,$3,$4,$5,$6,$7,
    'Pediatrics',$8,$9,'NCSBN','en',$10,$11,$12,$13,$14,true,true,'nursing','Health Promotion & Physiological Integrity',$15,$16,NOW(),NOW()
  )`, [
    sata ? "sata" : "multiple_choice", q.q, JSON.stringify(q.o), JSON.stringify(answers(q)), q.r, JSON.stringify(q.dr ?? []), difficulty,
    topic, country, cognitive, sata ? "SATA" : "MCQ", region === "CAN" ? "SI" : region === "US" ? "US_conventional" : "mixed",
    region === "CAN" ? "Canadian_generic" : region === "US" ? "US_generic" : "generic_international", region,
    ["rn","nclex-rn","pediatrics",region.toLowerCase(),topic.toLowerCase().replace(/[^a-z0-9]+/g,"-")], stemHash
  ]);
  return "inserted" as const;
}

async function main() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB DEFAULT '[]'::jsonb`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
  if (rnPediatricsBankBatch1Questions.length !== 50) throw new Error(`RN_PEDS_BATCH1:${rnPediatricsBankBatch1Questions.length}`);
  if (rnPediatricsBankBatch2Questions.length !== 50) throw new Error(`RN_PEDS_BATCH2:${rnPediatricsBankBatch2Questions.length}`);
  if (rnPediatricsBankBatch3Questions.length !== 50) throw new Error(`RN_PEDS_BATCH3:${rnPediatricsBankBatch3Questions.length}`);
  if (shared.length !== 150) throw new Error(`RN_PEDS_SHARED:${shared.length}`);
  if (rnPediatricsRegionalBankBatch1Questions.length !== 20) throw new Error(`RN_PEDS_REGIONAL:${rnPediatricsRegionalBankBatch1Questions.length}`);
  let inserted = 0, skipped = 0;
  for (const q of shared) (await insert(q,"BOTH",null,topicFor(q.q))) === "inserted" ? inserted++ : skipped++;
  for (const q of rnPediatricsRegionalBankBatch1Questions) (await insert(q,q.regionScope,q.countryCode,q.topic,q.difficulty,q.cognitiveLevel)) === "inserted" ? inserted++ : skipped++;
  console.log({ authored: 170, inserted, skipped });
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});
