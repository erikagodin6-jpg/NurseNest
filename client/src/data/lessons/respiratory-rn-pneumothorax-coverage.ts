import { getRnPneumothoraxCram, rnPneumothoraxResolvedFullLessonKey } from "./respiratory-rn-pneumothorax-cram";
import { rnCaPneumothoraxNclexBankBatch1 } from "../exam-questions/rn-ca-pneumothorax-nclex-bank-batch1";
import { rnUsPneumothoraxNclexBankBatch1 } from "../exam-questions/rn-us-pneumothorax-nclex-bank-batch1";

type PtxQuestion=(typeof rnCaPneumothoraxNclexBankBatch1)[number]|(typeof rnUsPneumothoraxNclexBankBatch1)[number];
const cells:Array<{countryCode:"CA"|"US";regionScope:"CAN"|"US";questions:readonly PtxQuestion[]}>=[
  {countryCode:"CA",regionScope:"CAN",questions:rnCaPneumothoraxNclexBankBatch1},
  {countryCode:"US",regionScope:"US",questions:rnUsPneumothoraxNclexBankBatch1}
];
function normalize(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");}
const globalIds=new Set<string>();
const globalFingerprints=new Map<string,string>();
export const rnPneumothoraxCoverageMatrix=cells.map(cell=>{
  const label=`${cell.countryCode}:NCLEX-RN:Pneumothorax`;
  const cram=getRnPneumothoraxCram(cell.countryCode);
  if(!cram||cram.fullLessonKey!==rnPneumothoraxResolvedFullLessonKey||cram.regionScope!==cell.regionScope||cram.exam!=="NCLEX-RN"||cram.topic!=="Pneumothorax")throw new Error(`RN_PTX_CRAM_SCOPE_INVALID:${label}`);
  if(cell.questions.length!==20)throw new Error(`RN_PTX_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems=new Set<string>();const distribution=[0,0,0,0];
  for(const q of cell.questions){
    if(globalIds.has(q.id))throw new Error(`RN_PTX_DUPLICATE_ID:${q.id}`);globalIds.add(q.id);
    const stem=normalize(q.stem);if(stems.has(stem))throw new Error(`RN_PTX_DUPLICATE_STEM_WITHIN_CELL:${label}/${q.id}`);stems.add(stem);
    const fingerprint=`${stem}::${q.options.map(normalize).join("||")}`;const prior=globalFingerprints.get(fingerprint);if(prior)throw new Error(`RN_PTX_UNCHANGED_CROSS_COUNTRY_COPY:${q.id}/${prior}`);globalFingerprints.set(fingerprint,q.id);
    if(q.tier!=="rn"||q.exam!=="NCLEX-RN"||q.countryCode!==cell.countryCode||q.regionScope!==cell.regionScope||q.bodySystem!=="Respiratory"||q.topic!=="Pneumothorax"||q.questionType!=="multiple_choice")throw new Error(`RN_PTX_SCOPE_INVALID:${label}/${q.id}`);
    if(q.options.length!==4||q.optionRationales.length!==4)throw new Error(`RN_PTX_RATIONALE_CARDINALITY_INVALID:${label}/${q.id}`);
    if(q.correctAnswer<0||q.correctAnswer>3)throw new Error(`RN_PTX_ANSWER_INVALID:${label}/${q.id}`);
    if(!q.correctAnswerExplanation.trim()||q.optionRationales.some(r=>!r.trim()))throw new Error(`RN_PTX_RATIONALE_MISSING:${label}/${q.id}`);
    if(q.difficulty<1||q.difficulty>4||!q.cognitiveLevel.trim()||!q.clinicalReasoning.trim()||!q.clinicalPearl.trim()||!q.keyTakeaway.trim()||q.references.length<2)throw new Error(`RN_PTX_METADATA_INVALID:${label}/${q.id}`);
    if(new Set(q.options.map(normalize)).size!==4)throw new Error(`RN_PTX_DUPLICATE_OPTIONS:${label}/${q.id}`);
    distribution[q.correctAnswer]++;
  }
  if(distribution.join(",")!=="5,5,5,5")throw new Error(`RN_PTX_ANSWER_BALANCE_INVALID:${label}/${distribution.join(",")}`);
  return {tier:"rn" as const,countryCode:cell.countryCode,exam:"NCLEX-RN" as const,bodySystem:"Respiratory" as const,topic:"Pneumothorax" as const,fullLessonKey:rnPneumothoraxResolvedFullLessonKey,fullLessonPresent:true as const,cramLessonPresent:true as const,qualifyingQuestionCount:20 as const,questionDeficit:0 as const,cramDeficit:0 as const,answerPositionCounts:distribution};
});
export const rnPneumothoraxCoverageSummary={cells:rnPneumothoraxCoverageMatrix.length,totalQualifyingQuestions:rnPneumothoraxCoverageMatrix.reduce((n,c)=>n+c.qualifyingQuestionCount,0),totalQuestionDeficit:rnPneumothoraxCoverageMatrix.reduce((n,c)=>n+c.questionDeficit,0),totalCramDeficit:rnPneumothoraxCoverageMatrix.reduce((n,c)=>n+c.cramDeficit,0)};
if(rnPneumothoraxCoverageSummary.cells!==2||rnPneumothoraxCoverageSummary.totalQualifyingQuestions!==40||rnPneumothoraxCoverageSummary.totalQuestionDeficit!==0||rnPneumothoraxCoverageSummary.totalCramDeficit!==0)throw new Error(`RN_PTX_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnPneumothoraxCoverageSummary)}`);
