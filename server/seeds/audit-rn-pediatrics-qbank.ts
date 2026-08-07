import { rnPediatricsBankBatch1Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch1";
import { rnPediatricsBankBatch2Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch2";
import { rnPediatricsBankBatch3Questions } from "../../client/src/data/exam-questions/rn-pediatrics-bank-batch3";
import { rnPediatricsRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-pediatrics-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [...rnPediatricsBankBatch1Questions,...rnPediatricsBankBatch2Questions,...rnPediatricsBankBatch3Questions];
const all: ExamQuestion[] = [...shared,...rnPediatricsRegionalBankBatch1Questions];
function fail(m:string):never{throw new Error(m)}
function correct(q:ExamQuestion){return q.t==="sata"&&q.ca?q.ca:[q.a]}
if(rnPediatricsBankBatch1Questions.length!==50)fail(`RN_PEDS_BATCH1:${rnPediatricsBankBatch1Questions.length}`);
if(rnPediatricsBankBatch2Questions.length!==50)fail(`RN_PEDS_BATCH2:${rnPediatricsBankBatch2Questions.length}`);
if(rnPediatricsBankBatch3Questions.length!==50)fail(`RN_PEDS_BATCH3:${rnPediatricsBankBatch3Questions.length}`);
if(shared.length!==150)fail(`RN_PEDS_SHARED:${shared.length}`);if(all.length!==170)fail(`RN_PEDS_TOTAL:${all.length}`);
const can=rnPediatricsRegionalBankBatch1Questions.filter(q=>q.regionScope==="CAN"),us=rnPediatricsRegionalBankBatch1Questions.filter(q=>q.regionScope==="US");
if(can.length!==10)fail(`RN_PEDS_CAN:${can.length}`);if(us.length!==10)fail(`RN_PEDS_US:${us.length}`);
const seen=new Set<string>();for(const [i,q] of all.entries()){const stem=q.q.trim().toLowerCase();if(q.q.trim().length<25)fail(`RN_PEDS_THIN_STEM:${i}`);if(seen.has(stem))fail(`RN_PEDS_DUP:${q.q}`);seen.add(stem);if(!Array.isArray(q.o)||q.o.length<4)fail(`RN_PEDS_OPTIONS:${i}`);const c=correct(q);if(!c.length||c.some(x=>!Number.isInteger(x)||x<0||x>=q.o.length))fail(`RN_PEDS_ANSWER:${i}`);if(new Set(c).size!==c.length)fail(`RN_PEDS_ANSWER_DUP:${i}`);if(!q.r||q.r.trim().length<40)fail(`RN_PEDS_RATIONALE:${i}`);const wrong=q.o.length-c.length;if(!Array.isArray(q.dr)||q.dr.length!==wrong)fail(`RN_PEDS_DR:${i}:${q.dr?.length??0}/${wrong}`);if(q.dr.some(x=>x.trim().length<20))fail(`RN_PEDS_DR_THIN:${i}`);if(q.t==="sata"&&(!q.ca||q.ca.length<2))fail(`RN_PEDS_SATA:${i}`)}
for(const q of rnPediatricsRegionalBankBatch1Questions){if(q.regionScope==="CAN"&&q.countryCode!=="CA")fail(`RN_PEDS_CAN_COUNTRY:${q.q}`);if(q.regionScope==="US"&&q.countryCode!=="US")fail(`RN_PEDS_US_COUNTRY:${q.q}`);if(!q.topic||!q.cognitiveLevel||!q.difficulty)fail(`RN_PEDS_META:${q.q}`)}
console.log({status:"PASS",shared:shared.length,regional:20,total:all.length,canada:can.length,unitedStates:us.length,distractorRationales:all.filter(q=>Array.isArray(q.dr)).length});
