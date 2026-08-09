import { rnArdsResolvedFullLessonKey, getRnArdsCram } from "./respiratory-rn-ards-cram";
import { rnCaArdsNclexBankBatch1 } from "../exam-questions/rn-ca-ards-nclex-bank-batch1";
import { rnUsArdsNclexBankBatch1 } from "../exam-questions/rn-us-ards-nclex-bank-batch1";

type ArdsQuestion = (typeof rnCaArdsNclexBankBatch1)[number] | (typeof rnUsArdsNclexBankBatch1)[number];
const cells: Array<{countryCode:"CA"|"US";regionScope:"CAN"|"US";questions:readonly ArdsQuestion[]}>=[
  {countryCode:"CA",regionScope:"CAN",questions:rnCaArdsNclexBankBatch1},
  {countryCode:"US",regionScope:"US",questions:rnUsArdsNclexBankBatch1}
];
function normalize(v:string){return v.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");}
const globalIds=new Set<string>();
const globalFingerprints=new Map<string,string>();
export const rnArdsCoverageMatrix=cells.map(cell=>{
  const label=`${cell.countryCode}:NCLEX-RN:ARDS`;
  const cram=getRnArdsCram(cell.countryCode);
  if(!cram||cram.fullLessonKey!==rnArdsResolvedFullLessonKey||cram.regionScope!==cell.regionScope)throw new Error(`RN_ARDS_CRAM_SCOPE_INVALID:${label}`);
  if(cell.questions.length!==20)throw new Error(`RN_ARDS_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems=new Set<string>();const dist=[0,0,0,0];
  for(const q of cell.questions){
    if(globalIds.has(q.id))throw new Error(`RN_ARDS_DUPLICATE_ID:${q.id}`);globalIds.add(q.id);
    const stem=normalize(q.stem);if(stems.has(stem))throw new Error(`RN_ARDS_DUPLICATE_STEM_WITHIN_CELL:${label}/${q.id}`);stems.add(stem);
    const fp=`${stem}::${q.options.map(normalize).join("||")}`;const prior=globalFingerprints.get(fp);if(prior)throw new Error(`RN_ARDS_UNCHANGED_CROSS_COUNTRY_COPY:${q.id}/${prior}`);globalFingerprints.set(fp,q.id);
    if(q.tier!=="rn"||q.exam!=="NCLEX-RN"||q.countryCode!==cell.countryCode||q.regionScope!==cell.regionScope||q.bodySystem!=="Respiratory"||q.topic!=="Acute Respiratory Distress Syndrome"||q.questionType!=="multiple_choice")throw new Error(`RN_ARDS_SCOPE_INVALID:${label}/${q.id}`);
    if(q.options.length!==4||q.optionRationales.length!==4)throw new Error(`RN_ARDS_RATIONALE_CARDINALITY_INVALID:${label}/${q.id}`);
    if(q.correctAnswer<0||q.correctAnswer>3)throw new Error(`RN_ARDS_ANSWER_INVALID:${label}/${q.id}`);
    if(!q.correctAnswerExplanation.trim()||q.optionRationales.some(r=>!r.trim()))throw new Error(`RN_ARDS_RATIONALE_MISSING:${label}/${q.id}`);
    if(q.difficulty>4||!q.cognitiveLevel.trim()||!q.clinicalReasoning.trim()||!q.clinicalPearl.trim()||!q.keyTakeaway.trim()||q.references.length<2)throw new Error(`RN_ARDS_METADATA_INVALID:${label}/${q.id}`);
    if(new Set(q.options.map(normalize)).size!==4)throw new Error(`RN_ARDS_DUPLICATE_OPTIONS:${label}/${q.id}`);
    dist[q.correctAnswer]++;
  }
  if(dist.join(",")!=="5,5,5,5")throw new Error(`RN_ARDS_ANSWER_BALANCE_INVALID:${label}/${dist.join(",")}`);
  return {tier:"rn" as const,countryCode:cell.countryCode,exam:"NCLEX-RN" as const,bodySystem:"Respiratory" as const,topic:"Acute Respiratory Distress Syndrome" as const,fullLessonKey:rnArdsResolvedFullLessonKey,fullLessonPresent:true as const,cramLessonPresent:true as const,qualifyingQuestionCount:20 as const,questionDeficit:0 as const,cramDeficit:0 as const,answerPositionCounts:dist};
});
export const rnArdsCoverageSummary={cells:rnArdsCoverageMatrix.length,totalQualifyingQuestions:rnArdsCoverageMatrix.reduce((n,c)=>n+c.qualifyingQuestionCount,0),totalQuestionDeficit:rnArdsCoverageMatrix.reduce((n,c)=>n+c.questionDeficit,0),totalCramDeficit:rnArdsCoverageMatrix.reduce((n,c)=>n+c.cramDeficit,0)};
if(rnArdsCoverageSummary.cells!==2||rnArdsCoverageSummary.totalQualifyingQuestions!==40||rnArdsCoverageSummary.totalQuestionDeficit!==0||rnArdsCoverageSummary.totalCramDeficit!==0)throw new Error(`RN_ARDS_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnArdsCoverageSummary)}`);
