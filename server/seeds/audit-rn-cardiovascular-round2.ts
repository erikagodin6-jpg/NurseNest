import { rnCardiovascularRound2Batch1Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch1";
import { rnCardiovascularRound2Batch2Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch2";
import { rnCardiovascularRound2Batch3Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch3";
import { rnCardiovascularRound2Batch4Questions } from "../../client/src/data/exam-questions/rn-cardiovascular-round2-batch4";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const batches=[rnCardiovascularRound2Batch1Questions,rnCardiovascularRound2Batch2Questions,rnCardiovascularRound2Batch3Questions,rnCardiovascularRound2Batch4Questions];
const all:ExamQuestion[]=batches.flat();
function fail(m:string):never{throw new Error(m)}
function correct(q:ExamQuestion){return q.t==="sata"&&q.ca?q.ca:[q.a]}
for(const [i,b] of batches.entries())if(b.length<45)fail(`RN_CARDIO_R2_BATCH_${i+1}_THIN:${b.length}`);
if(all.length<200)fail(`RN_CARDIO_R2_MINIMUM:${all.length}/200`);
const seen=new Set<string>();
for(const [i,q] of all.entries()){
  const stem=q.q.trim().toLowerCase();if(q.q.trim().length<25)fail(`RN_CARDIO_R2_THIN_STEM:${i}`);if(seen.has(stem))fail(`RN_CARDIO_R2_DUP:${q.q}`);seen.add(stem);
  if(!Array.isArray(q.o)||q.o.length<4)fail(`RN_CARDIO_R2_OPTIONS:${i}`);const c=correct(q);if(!c.length||c.some(x=>!Number.isInteger(x)||x<0||x>=q.o.length))fail(`RN_CARDIO_R2_ANSWER:${i}`);if(new Set(c).size!==c.length)fail(`RN_CARDIO_R2_ANSWER_DUP:${i}`);
  if(!q.r||q.r.trim().length<40)fail(`RN_CARDIO_R2_RATIONALE:${i}`);const wrong=q.o.length-c.length;if(!Array.isArray(q.dr)||q.dr.length!==wrong)fail(`RN_CARDIO_R2_DR:${i}:${q.dr?.length??0}/${wrong}`);if(q.dr.some(x=>x.trim().length<20))fail(`RN_CARDIO_R2_DR_THIN:${i}`);if(q.t==="sata"&&(!q.ca||q.ca.length<2))fail(`RN_CARDIO_R2_SATA:${i}`);
}
console.log({status:"PASS",batches:batches.map(b=>b.length),authored:all.length,minimum:200,uniqueStems:seen.size,distractorRationales:all.filter(q=>Array.isArray(q.dr)).length,regionScope:"BOTH"});