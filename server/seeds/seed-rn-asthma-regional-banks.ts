import crypto from "crypto";
import { pool } from "../storage";
import { rnCaAsthmaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-ca-asthma-nclex-bank-batch1";
import { rnUsAsthmaNclexBankBatch1 } from "../../client/src/data/exam-questions/rn-us-asthma-nclex-bank-batch1";
import "../../client/src/data/lessons/respiratory-rn-asthma-coverage";

type Question = (typeof rnCaAsthmaNclexBankBatch1)[number] | (typeof rnUsAsthmaNclexBankBatch1)[number];

type Cell = {
  label: string;
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  medicationNamingVariant: "Canadian_generic" | "USAN";
  labUnitVariant: "SI" | "conventional";
  questions: readonly Question[];
};

const cells: Cell[] = [
  { label: "RN/CA/NCLEX-RN/Asthma", countryCode: "CA", regionScope: "CAN", medicationNamingVariant: "Canadian_generic", labUnitVariant: "SI", questions: rnCaAsthmaNclexBankBatch1 },
  { label: "RN/US/NCLEX-RN/Asthma", countryCode: "US", regionScope: "US", medicationNamingVariant: "USAN", labUnitVariant: "conventional", questions: rnUsAsthmaNclexBankBatch1 }
];

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale JSONB`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_pearl TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}

async function seedCell(cell: Cell) {
  if (cell.questions.length !== 20) throw new Error(`RN_ASTHMA_SEED_COUNT_INVALID: ${cell.label}/${cell.questions.length}`);
  const distribution = [0, 0, 0, 0];
  cell.questions.forEach((q) => distribution[q.correctAnswer] += 1);
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`RN_ASTHMA_SEED_BALANCE_INVALID: ${cell.label}/${distribution.join(",")}`);

  let inserted = 0;
  let skipped = 0;
  for (const q of cell.questions) {
    if (q.countryCode !== cell.countryCode || q.regionScope !== cell.regionScope) throw new Error(`RN_ASTHMA_SEED_SCOPE_INVALID: ${cell.label}/${q.id}`);
    const hash = stemHash(q.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions
       WHERE (stem_hash=$1 OR lower(trim(stem))=lower(trim($2)))
         AND tier='rn' AND exam='NCLEX-RN' AND region_scope=$3 LIMIT 1`,
      [hash, q.stem, cell.regionScope]
    );
    if (existing.rows.length) { skipped += 1; continue; }

    const rationaleMap = Object.fromEntries(q.options.map((option, index) => [option, q.optionRationales[index]]));
    await pool.query(
      `INSERT INTO exam_questions (
        id,tier,exam,question_type,status,stem,options,correct_answer,rationale,
        correct_answer_explanation,incorrect_answer_rationale,clinical_reasoning,clinical_pearl,key_takeaway,
        difficulty,body_system,topic,country_code,licensing_body,language_code,cognitive_level,question_format,
        lab_unit_variant,medication_naming_variant,region_scope,is_mock_exam_eligible,is_adaptive_eligible,career_type,domain,tags,stem_hash,created_at,updated_at
      ) VALUES (
        $1,'rn','NCLEX-RN','multiple_choice','published',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
        'Respiratory','Asthma',$12,'NCSBN','en',$13,'MCQ',$14,$15,$16,true,true,'nursing',$17,$18,$19,NOW(),NOW()
      )`,
      [
        q.id,q.stem,JSON.stringify(q.options),JSON.stringify([q.correctAnswer]),q.correctAnswerExplanation,q.correctAnswerExplanation,
        JSON.stringify(rationaleMap),q.clinicalReasoning,q.clinicalPearl,q.keyTakeaway,q.difficulty,cell.countryCode,q.cognitiveLevel,
        cell.labUnitVariant,cell.medicationNamingVariant,cell.regionScope,q.clientNeedsSubcategory,
        ["rn","nclex-rn",cell.countryCode === "CA" ? "canada" : "united-states","respiratory","asthma",q.clientNeedsSubcategory.toLowerCase().replace(/[^a-z0-9]+/g,"-")],hash
      ]
    );
    inserted += 1;
  }

  const hashes = cell.questions.map((q) => stemHash(q.stem));
  const verify = await pool.query(
    `SELECT COUNT(*)::int total,
       COUNT(*) FILTER (WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation))>0)::int correct_rationales,
       COUNT(*) FILTER (WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale)='object' AND jsonb_object_length(incorrect_answer_rationale)=4)::int option_rationales,
       COUNT(*) FILTER (WHERE difficulty<=4)::int difficulty_valid
     FROM exam_questions
     WHERE tier='rn' AND exam='NCLEX-RN' AND body_system='Respiratory' AND topic='Asthma'
       AND country_code=$1 AND region_scope=$2 AND status='published' AND stem_hash=ANY($3::text[])`,
    [cell.countryCode,cell.regionScope,hashes]
  );
  const row = verify.rows[0];
  if (row.total!==20 || row.correct_rationales!==20 || row.option_rationales!==20 || row.difficulty_valid!==20) {
    throw new Error(`RN_ASTHMA_POSTSEED_INVALID: ${cell.label}/${JSON.stringify(row)}`);
  }
  return {label:cell.label,inserted,skipped,verified:row.total};
}

async function run() {
  await ensureColumns();
  const results=[];
  for(const cell of cells) results.push(await seedCell(cell));
  const verified=results.reduce((sum,row)=>sum+row.verified,0);
  if(verified!==40) throw new Error(`RN_ASTHMA_TOTAL_INVALID: ${verified}`);
  console.log(JSON.stringify({cells:results.length,verified,results},null,2));
}

run().then(()=>process.exit(0)).catch((error)=>{console.error(error);process.exit(1);});
