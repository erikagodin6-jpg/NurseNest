import crypto from "crypto";
import { pool } from "../storage";
import { rpnCaPneumothoraxPublishedBank, pnUsPneumothoraxPublishedBank } from "../../client/src/data/exam-questions/practical-nursing-pneumothorax-published";
import "../../client/src/data/lessons/respiratory-practical-nursing-pneumothorax-coverage";

type Q = (typeof rpnCaPneumothoraxPublishedBank)[number] | (typeof pnUsPneumothoraxPublishedBank)[number];
const cells: Array<{ label: string; exam: "REX-PN" | "NCLEX-PN"; countryCode: "CA" | "US"; regionScope: "CAN" | "US"; labUnitVariant: "SI" | "conventional"; medicationNamingVariant: "Canadian_generic" | "USAN"; questions: readonly Q[] }> = [
  { label: "RPN/CA/REX-PN/Pneumothorax", exam: "REX-PN", countryCode: "CA", regionScope: "CAN", labUnitVariant: "SI", medicationNamingVariant: "Canadian_generic", questions: rpnCaPneumothoraxPublishedBank },
  { label: "PN/US/NCLEX-PN/Pneumothorax", exam: "NCLEX-PN", countryCode: "US", regionScope: "US", labUnitVariant: "conventional", medicationNamingVariant: "USAN", questions: pnUsPneumothoraxPublishedBank },
];
function hash(stem: string) { return crypto.createHash("sha256").update(stem.trim().toLowerCase()).digest("hex").substring(0, 32); }
async function ensureColumns() {
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale JSONB`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_pearl TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_stem_hash ON exam_questions(stem_hash)`);
}
async function seed(cell: (typeof cells)[number]) {
  if (cell.questions.length !== 20) throw new Error(`PN_PTX_SEED_COUNT:${cell.label}`);
  const distribution = [0, 0, 0, 0];
  cell.questions.forEach((question) => distribution[question.correctAnswer] += 1);
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`PN_PTX_SEED_BALANCE:${cell.label}/${distribution.join(",")}`);
  let inserted = 0;
  let skipped = 0;
  for (const question of cell.questions) {
    const stemHash = hash(question.stem);
    const existing = await pool.query(
      `SELECT id FROM exam_questions WHERE (stem_hash=$1 OR lower(trim(stem))=lower(trim($2))) AND tier='rpn' AND exam=$3 AND region_scope=$4 AND topic='Pneumothorax' LIMIT 1`,
      [stemHash, question.stem, cell.exam, cell.regionScope],
    );
    if (existing.rows.length) { skipped += 1; continue; }
    const rationaleMap = Object.fromEntries(question.options.map((option, index) => [option, question.optionRationales[index]]));
    await pool.query(
      `INSERT INTO exam_questions (id,tier,exam,question_type,status,stem,options,correct_answer,rationale,correct_answer_explanation,incorrect_answer_rationale,clinical_reasoning,clinical_pearl,key_takeaway,difficulty,body_system,topic,country_code,licensing_body,language_code,cognitive_level,question_format,lab_unit_variant,medication_naming_variant,region_scope,is_mock_exam_eligible,is_adaptive_eligible,career_type,domain,tags,stem_hash,created_at,updated_at) VALUES ($1,'rpn',$2,'multiple_choice','published',$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'Respiratory','Pneumothorax',$13,'NCSBN','en',$14,'MCQ',$15,$16,$17,true,true,'nursing',$18,$19,$20,NOW(),NOW())`,
      [question.id, cell.exam, question.stem, JSON.stringify(question.options), JSON.stringify([question.correctAnswer]), question.correctAnswerExplanation, question.correctAnswerExplanation, JSON.stringify(rationaleMap), question.clinicalReasoning, question.clinicalPearl, question.keyTakeaway, question.difficulty, cell.countryCode, question.cognitiveLevel, cell.labUnitVariant, cell.medicationNamingVariant, cell.regionScope, question.clientNeedsSubcategory, ["rpn", cell.exam.toLowerCase(), cell.countryCode === "CA" ? "canada" : "united-states", "respiratory", "pneumothorax"], stemHash],
    );
    inserted += 1;
  }
  const hashes = cell.questions.map((question) => hash(question.stem));
  const verification = await pool.query(
    `SELECT COUNT(*)::int total,COUNT(*) FILTER(WHERE correct_answer_explanation IS NOT NULL AND length(trim(correct_answer_explanation))>0)::int correct_rationales,COUNT(*) FILTER(WHERE incorrect_answer_rationale IS NOT NULL AND jsonb_typeof(incorrect_answer_rationale)='object' AND jsonb_object_length(incorrect_answer_rationale)=4)::int option_rationales,COUNT(*) FILTER(WHERE difficulty<=4)::int difficulty_valid FROM exam_questions WHERE tier='rpn' AND exam=$1 AND body_system='Respiratory' AND topic='Pneumothorax' AND country_code=$2 AND region_scope=$3 AND status='published' AND stem_hash=ANY($4::text[])`,
    [cell.exam, cell.countryCode, cell.regionScope, hashes],
  );
  const row = verification.rows[0];
  if (row.total !== 20 || row.correct_rationales !== 20 || row.option_rationales !== 20 || row.difficulty_valid !== 20) throw new Error(`PN_PTX_POSTSEED_INVALID:${cell.label}/${JSON.stringify(row)}`);
  return { label: cell.label, inserted, skipped, verified: row.total };
}
async function run() {
  await ensureColumns();
  const results = [];
  for (const cell of cells) results.push(await seed(cell));
  const verified = results.reduce((total, result) => total + result.verified, 0);
  if (verified !== 40) throw new Error(`PN_PTX_TOTAL:${verified}`);
  console.log(JSON.stringify({ cells: results.length, verified, results }, null, 2));
}
run().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
