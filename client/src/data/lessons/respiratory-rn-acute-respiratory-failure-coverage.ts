import { getRnAcuteRespiratoryFailureCram, rnAcuteRespiratoryFailureResolvedFullLessonKey } from "./respiratory-rn-acute-respiratory-failure-cram";
import { rnCaAcuteRespiratoryFailureAuthoritativeBank } from "../exam-questions/rn-ca-acute-respiratory-failure-authoritative";
import { rnUsAcuteRespiratoryFailureAuthoritativeBank } from "../exam-questions/rn-us-acute-respiratory-failure-authoritative";

type ArfQuestion=(typeof rnCaAcuteRespiratoryFailureAuthoritativeBank)[number]|(typeof rnUsAcuteRespiratoryFailureAuthoritativeBank)[number];
const cells:Array<{countryCode:"CA"|"US";regionScope:"CAN"|"US";questions:readonly ArfQuestion[]}>=[
  {countryCode:"CA",regionScope:"CAN",questions:rnCaAcuteRespiratoryFailureAuthoritativeBank},
  {countryCode:"US",regionScope:"US",questions:rnUsAcuteRespiratoryFailureAuthoritativeBank}
];
function normalize(v:string){return v.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");}
const globalIds=new Set<string>();const globalFingerprints=new Map<string,string>();
export const rnAcuteRespiratoryFailureCoverageMatrix=cells.map(cell=>{
 const label=`${cell.countryCode}:NCLEX-RN:Acute Respiratory Failure`;const cram=getRnAcuteRespiratoryFailureCram(cell.countryCode);
 if(!cram||cram.fullLessonKey!==rnAcuteRespiratoryFailureResolvedFullLessonKey||cram.regionScope!==cell.regionScope||cram.exam!=="NCLEX-RN"||cram.topic!=="Acute Respiratory Failure")throw new Error(`RN_ARF_CRAM_SCOPE_INVALID:${label}`);
 if(cell.questions.length!==20)throw new Error(`RN_ARF_COUNT_INVALID:${label}/${cell.questions.length}`);
 const stems=new Set<string>();const distribution=[0,0,0,0];
 for(const q of cell.questions){
  if(globalIds.has(q.id))throw new Error(`RN_ARF_DUPLICATE_ID:${q.id}`);globalIds.add(q.id);
  const stem=normalize(q.stem);if(stems.has(stem))throw new Error(`RN_ARF_DUPLICATE_STEM_WITHIN_CELL:${label}/${q.id}`);stems.add(stem);
  const fp=`${stem}::${q.options.map(normalize).join("||")}`;const prior=globalFingerprints.get(fp);if(prior)throw new Error(`RN_ARF_UNCHANGED_CROSS_COUNTRY_COPY:${q.id}/${prior}`);globalFingerprints.set(fp,q.id);
  if(q.tier!=="rn"||q.exam!=="NCLEX-RN"||q.countryCode!==cell.countryCode||q.regionScope!==cell.regionScope||q.bodySystem!=="Respiratory"||q.topic!=="Acute Respiratory Failure"||q.questionType!=="multiple_choice")throw new Error(`RN_ARF_SCOPE_INVALID:${label}/${q.id}`);
  if(q.options.length!==4||q.optionRationales.length!==4)throw new Error(`RN_ARF_RATIONALE_CARDINALITY_INVALID:${label}/${q.id}`);
  if(q.correctAnswer<0||q.correctAnswer>3||!q.correctAnswerExplanation.trim()||q.optionRationales.some(r=>!r.trim()))throw new Error(`RN_ARF_ANSWER_CONTRACT_INVALID:${label}/${q.id}`);
  if(q.difficulty<1||q.difficulty>4||!q.cognitiveLevel.trim()||!q.clinicalReasoning.trim()||!q.clinicalPearl.trim()||!q.keyTakeaway.trim()||q.references.length<1)throw new Error(`RN_ARF_METADATA_INVALID:${label}/${q.id}`);
  if(new Set(q.options.map(normalize)).size!==4)throw new Error(`RN_ARF_DUPLICATE_OPTIONS:${label}/${q.id}`);
  distribution[q.correctAnswer]++;
 }
 if(distribution.join(",")!=="5,5,5,5")throw new Error(`RN_ARF_ANSWER_BALANCE_INVALID:${label}/${distribution.join(",")}`);
 return {tier:"rn" as const,countryCode:cell.countryCode,exam:"NCLEX-RN" as const,bodySystem:"Respiratory" as const,topic:"Acute Respiratory Failure" as const,fullLessonKey:rnAcuteRespiratoryFailureResolvedFullLessonKey,fullLessonPresent:true as const,cramLessonPresent:true as const,qualifyingQuestionCount:20 as const,questionDeficit:0 as const,cramDeficit:0 as const,answerPositionCounts:distribution};
});
export const rnAcuteRespiratoryFailureCoverageSummary={cells:rnAcuteRespiratoryFailureCoverageMatrix.length,totalQualifyingQuestions:rnAcuteRespiratoryFailureCoverageMatrix.reduce((n,c)=>n+c.qualifyingQuestionCount,0),totalQuestionDeficit:rnAcuteRespiratoryFailureCoverageMatrix.reduce((n,c)=>n+c.questionDeficit,0),totalCramDeficit:rnAcuteRespiratoryFailureCoverageMatrix.reduce((n,c)=>n+c.cramDeficit,0)};
if(rnAcuteRespiratoryFailureCoverageSummary.cells!==2||rnAcuteRespiratoryFailureCoverageSummary.totalQualifyingQuestions!==40||rnAcuteRespiratoryFailureCoverageSummary.totalQuestionDeficit!==0||rnAcuteRespiratoryFailureCoverageSummary.totalCramDeficit!==0)throw new Error(`RN_ARF_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnAcuteRespiratoryFailureCoverageSummary)}`);
