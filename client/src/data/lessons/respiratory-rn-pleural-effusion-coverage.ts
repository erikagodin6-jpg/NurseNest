import { getRnPleuralEffusionCram, rnPleuralEffusionResolvedFullLessonKey } from "./respiratory-rn-pleural-effusion-cram";
import { rnCaPleuralEffusionNclexBankBatch1 } from "../exam-questions/rn-ca-pleural-effusion-nclex-bank-batch1";
import { rnUsPleuralEffusionNclexBankBatch1 } from "../exam-questions/rn-us-pleural-effusion-nclex-bank-batch1";

type EffusionQuestion=(typeof rnCaPleuralEffusionNclexBankBatch1)[number]|(typeof rnUsPleuralEffusionNclexBankBatch1)[number];
const cells:Array<{countryCode:"CA"|"US";regionScope:"CAN"|"US";questions:readonly EffusionQuestion[]}>=[
  {countryCode:"CA",regionScope:"CAN",questions:rnCaPleuralEffusionNclexBankBatch1},
  {countryCode:"US",regionScope:"US",questions:rnUsPleuralEffusionNclexBankBatch1}
];
function normalize(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");}
const globalIds=new Set<string>();
const globalFingerprints=new Map<string,string>();
export const rnPleuralEffusionCoverageMatrix=cells.map(cell=>{
  const label=`${cell.countryCode}:NCLEX-RN:Pleural Effusion`;
  const cram=getRnPleuralEffusionCram(cell.countryCode);
  if(!cram||cram.fullLessonKey!==rnPleuralEffusionResolvedFullLessonKey||cram.regionScope!==cell.regionScope||cram.exam!=="NCLEX-RN"||cram.topic!=="Pleural Effusion")throw new Error(`RN_EFFUSION_CRAM_SCOPE_INVALID:${label}`);
  if(cell.questions.length!==20)throw new Error(`RN_EFFUSION_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems=new Set<string>();const distribution=[0,0,0,0];
  for(const q of cell.questions){
    if(globalIds.has(q.id))throw new Error(`RN_EFFUSION_DUPLICATE_ID:${q.id}`);globalIds.add(q.id);
    const stem=normalize(q.stem);if(stems.has(stem))throw new Error(`RN_EFFUSION_DUPLICATE_STEM_WITHIN_CELL:${label}/${q.id}`);stems.add(stem);
    const fingerprint=`${stem}::${q.options.map(normalize).join("||")}`;const prior=globalFingerprints.get(fingerprint);if(prior)throw new Error(`RN_EFFUSION_UNCHANGED_CROSS_COUNTRY_COPY:${q.id}/${prior}`);globalFingerprints.set(fingerprint,q.id);
    if(q.tier!=="rn"||q.exam!=="NCLEX-RN"||q.countryCode!==cell.countryCode||q.regionScope!==cell.regionScope||q.bodySystem!=="Respiratory"||q.topic!=="Pleural Effusion"||q.questionType!=="multiple_choice")throw new Error(`RN_EFFUSION_SCOPE_INVALID:${label}/${q.id}`);
    if(q.options.length!==4||q.optionRationales.length!==4)throw new Error(`RN_EFFUSION_RATIONALE_CARDINALITY_INVALID:${label}/${q.id}`);
    if(q.correctAnswer<0||q.correctAnswer>3)throw new Error(`RN_EFFUSION_ANSWER_INVALID:${label}/${q.id}`);
    if(!q.correctAnswerExplanation.trim()||q.optionRationales.some(r=>!r.trim()))throw new Error(`RN_EFFUSION_RATIONALE_MISSING:${label}/${q.id}`);
    if(q.difficulty<1||q.difficulty>4||!q.cognitiveLevel.trim()||!q.clinicalReasoning.trim()||!q.clinicalPearl.trim()||!q.keyTakeaway.trim()||q.references.length<2)throw new Error(`RN_EFFUSION_METADATA_INVALID:${label}/${q.id}`);
    if(new Set(q.options.map(normalize)).size!==4)throw new Error(`RN_EFFUSION_DUPLICATE_OPTIONS:${label}/${q.id}`);
    distribution[q.correctAnswer]++;
  }
  if(distribution.join(",")!=="5,5,5,5")throw new Error(`RN_EFFUSION_ANSWER_BALANCE_INVALID:${label}/${distribution.join(",")}`);
  return {tier:"rn" as const,countryCode:cell.countryCode,exam:"NCLEX-RN" as const,bodySystem:"Respiratory" as const,topic:"Pleural Effusion" as const,fullLessonKey:rnPleuralEffusionResolvedFullLessonKey,fullLessonPresent:true as const,cramLessonPresent:true as const,qualifyingQuestionCount:20 as const,questionDeficit:0 as const,cramDeficit:0 as const,answerPositionCounts:distribution};
});
export const rnPleuralEffusionCoverageSummary={cells:rnPleuralEffusionCoverageMatrix.length,totalQualifyingQuestions:rnPleuralEffusionCoverageMatrix.reduce((n,c)=>n+c.qualifyingQuestionCount,0),totalQuestionDeficit:rnPleuralEffusionCoverageMatrix.reduce((n,c)=>n+c.questionDeficit,0),totalCramDeficit:rnPleuralEffusionCoverageMatrix.reduce((n,c)=>n+c.cramDeficit,0)};
if(rnPleuralEffusionCoverageSummary.cells!==2||rnPleuralEffusionCoverageSummary.totalQualifyingQuestions!==40||rnPleuralEffusionCoverageSummary.totalQuestionDeficit!==0||rnPleuralEffusionCoverageSummary.totalCramDeficit!==0)throw new Error(`RN_EFFUSION_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnPleuralEffusionCoverageSummary)}`);
