import crypto from "crypto";
import { pool } from "../storage";
import { rnCardiovascularRound2Batch1Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch1";
import { rnCardiovascularRound2Batch2Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch2";
import { rnCardiovascularRound2Batch3Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch3";
import { rnCardiovascularRound2Batch4Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch4";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const batches=[rnCardiovascularRound2Batch1Questions,rnCardiovascularRound2Batch2Questions,rnCardiovascularRound2Batch3Questions,rnCardiovascularRound2Batch4Questions];
const all:ExamQuestion[]=batches.flat();
const hash=(s:string)=>crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex").substring(0,32);
const answers=(q:ExamQuestion)=>q.t==="sata"&&q.ca?q.ca:[q.a];

function topicFor(stem:string){const s=stem.toLowerCase();if(/troponin|bnp|echo|arterial line|wedge|cvp|hemodynamic|abi|stress test|ct angiography|dlco/.test(s))return"Cardiovascular Diagnostics & Hemodynamics";if(/heart failure|hfr ef|hfref|diuretic|arni|sglt2|cardiogenic|right-ventricular|pulmonary hypertension/.test(s))return"Heart Failure & Advanced Hemodynamics";if(/lvad|iabp|ecmo|transplant|mechanical circulatory|device/.test(s))return"Mechanical Support & Transplant";if(/atrial fibrillation|flutter|svt|adenosine|wpw|torsades|heart block|pacemaker|cardioversion|ablation|antiarrhythmic/.test(s))return"Electrophysiology & Arrhythmias";if(/acute coronary|acs|stemi|nstemi|nitroglycerin|stent|pci|aspirin|p2y12|statin/.test(s))return"Coronary Syndromes & Secondary Prevention";if(/aortic dissection|aneurysm|evar|carotid|limb ischemia|peripheral arterial|venous insufficiency|dvt/.test(s))return"Vascular Disease & Emergencies";if(/valve|mitral|aortic stenosis|aortic regurgitation|tricuspid|endocarditis/.test(s))return"Valvular & Structural Heart Disease";if(/warfarin|apixaban|dabigatran|heparin|anticoag|bleeding/.test(s))return"Antithrombotic Safety";return"Cardiovascular Round 2";}

async function main(){
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS stem_hash TEXT`);
  await pool.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS distractor_rationales JSONB DEFAULT '[]'::jsonb`);
  if(batches.some((b,i)=>b.length<45)) throw new Error(`RN_CARDIO_R2_THIN_BATCH:${batches.map((b,i)=>`${i+1}:${b.length}`).join(',')}`);
  if(all.length<200) throw new Error(`RN_CARDIO_R2_MINIMUM_NOT_MET:${all.length}/200`);
  let inserted=0,skipped=0;
  for(const q of all){
    const h=hash(q.q);const existing=await pool.query(`SELECT id FROM exam_questions WHERE stem_hash=$1 OR lower(trim(stem))=lower(trim($2)) LIMIT 1`,[h,q.q]);if(existing.rows.length){skipped++;continue;}
    const sata=q.t==="sata";await pool.query(`INSERT INTO exam_questions (id,tier,exam,question_type,status,stem,options,correct_answer,rationale,distractor_rationales,difficulty,body_system,topic,country_code,licensing_body,language_code,cognitive_level,question_format,lab_unit_variant,medication_naming_variant,region_scope,is_mock_exam_eligible,is_adaptive_eligible,career_type,domain,tags,stem_hash,created_at,updated_at) VALUES (gen_random_uuid(),'rn','NCLEX-RN',$1,'published',$2,$3,$4,$5,$6,3,'Cardiovascular',$7,NULL,'NCSBN','en','application',$8,'mixed','generic_international','BOTH',true,true,'nursing','Physiological Integrity',$9,$10,NOW(),NOW())`,[sata?"sata":"multiple_choice",q.q,JSON.stringify(q.o),JSON.stringify(answers(q)),q.r,JSON.stringify(q.dr??[]),topicFor(q.q),sata?"SATA":"MCQ",["rn","nclex-rn","cardiovascular","round2","shared-ca-us",topicFor(q.q).toLowerCase().replace(/[^a-z0-9]+/g,"-")],h]);inserted++;
  }
  console.log({authored:all.length,minimum:200,inserted,skipped,regionScope:"BOTH"});
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});