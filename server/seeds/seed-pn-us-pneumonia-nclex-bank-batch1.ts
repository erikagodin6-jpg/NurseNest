import crypto from "crypto";
import { pool } from "../storage";
import { pnUsPneumoniaNclexBankBatch1 } from "../../client/src/data/exam-questions/pn-us-pneumonia-nclex-bank-batch1";

function stemHash(stem: string): string {
  return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32);
}

function rationaleMap(options: string[], rationales: string[]): Record<string, string> {
  return Object.fromEntries(options.map((option, index) => [option, rationales[index] ?? ""]));
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

async function seed() {
  await ensureColumns();
  if (pnUsPneumoniaNclexBankBatch1.length !== 20) throw new Error(`PN_US_PNEUMONIA_EXPECTED_20: ${pnUsPneumoniaNclexBankBatch1.length}`);
  let inserted = 0;
  let skipped = 0;

  for (const q of pnUsPneumoniaNclexBankBatch1) {
    if (!q.correctAnswerExplanation.trim() || q.optionRationales.length !== 4 || q.optionRationales.some((r) => !r.trim())) throw new Error(`PN_US_PNEUMONIA_RATIONALE_INVALID: ${q.id}`);
    const hash = stemHash(q.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions WHERE (stem_hash=$1 OR lower(trim(stem))=lower(trim($2))) AND tier='rpn' AND exam='NCLEX-PN' AND region_scope='US' LIMIT 1`,
      [hash,q.stem]
    );
    if(existing.rows.length){skipped++;continue;}

    await pool.query(
      `INSERT INTO exam_questions (
        id,tier,exam,question_type,status,stem,options,correct_answer,rationale,
        correct_answer_explanation,incorrect_answer_rationale,clinical_reasoning,clinical_pearl,key_takeaway,
        difficulty,body_system,topic,country_code,licensing_body,language_code,cognitive_level,question_format,
        lab_unit_variant,medication_naming_variant,region_scope,is_mock_exam_eligible,is_adaptive_eligible,career_type,domain,tags,stem_hash,created_at,updated_at
      ) VALUES (
        $1,'rpn','NCLEX-PN','multiple_choice','published',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
        'Respiratory','Community-Acquired Pneumonia','US','NCSBN','en',$12,'MCQ','conventional','USAN','US',true,true,'nursing',$13,$14,$15,NOW(),NOW()
      )`,
      [q.id,q.stem,JSON.stringify(q.options),JSON.stringify([q.correctAnswer]),q.correctAnswerExplanation,q.correctAnswerExplanation,JSON.stringify(rationaleMap(q.options,q.optionRationales)),q.clinicalReasoning,q.clinicalPearl,q.keyTakeaway,q.difficulty,q.cognitiveLevel,q.clientNeedsSubcategory,["pn","nclex-pn","united-states","respiratory","community-acquired-pneumonia",q.clientNeedsSubcategory.toLowerCase().replace(/[^a-z0-9]+/g,"-")],hash]
    );
    inserted++;
  }

  const verification=await pool.query(`
    SELECT COUNT(*)::int total,
      COUNT(*) FILTER (WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation))>0)::int with_correct_rationale,
      COUNT(*) FILTER (WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale)='object' AND jsonb_object_length(incorrect_answer_rationale)=4)::int with_four_option_rationales,
      COUNT(*) FILTER (WHERE difficulty<=4)::int difficulty_valid
    FROM exam_questions
    WHERE tier='rpn' AND exam='NCLEX-PN' AND body_system='Respiratory' AND topic='Community-Acquired Pneumonia'
      AND region_scope='US' AND country_code='US' AND status='published' AND stem_hash=ANY($1::text[])
  `,[pnUsPneumoniaNclexBankBatch1.map((q)=>stemHash(q.stem))]);
  const row=verification.rows[0];
  if(row.total!==20||row.with_correct_rationale!==20||row.with_four_option_rationales!==20||row.difficulty_valid!==20) throw new Error(`PN_US_PNEUMONIA_POSTSEED_FAILED: ${JSON.stringify(row)}`);
  console.log({inserted,skipped,verified:20});
}

seed().then(()=>process.exit(0)).catch((error)=>{console.error(error);process.exit(1);});
