import {
  respiratoryCaUsCoverage20260807V2,
  respiratoryCaUsCoverageSummary20260807V2
} from "./respiratory-ca-us-coverage-20260807-v2";
import {
  rnPneumothoraxCoverageMatrix,
  rnPneumothoraxCoverageSummary
} from "./respiratory-rn-pneumothorax-coverage";

export const respiratoryCaUsCoverage20260807V3=[
  ...respiratoryCaUsCoverage20260807V2,
  ...rnPneumothoraxCoverageMatrix
];

const keys=new Set<string>();
for(const cell of respiratoryCaUsCoverage20260807V3){
  const key=`${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if(keys.has(key))throw new Error(`RESP_CA_US_V3_DUPLICATE_CELL:${key}`);keys.add(key);
  if(!cell.fullLessonPresent||!cell.cramLessonPresent)throw new Error(`RESP_CA_US_V3_LESSON_MISSING:${key}`);
  if(cell.qualifyingQuestionCount<20||cell.questionDeficit!==0||cell.cramDeficit!==0)throw new Error(`RESP_CA_US_V3_DEFICIT_NONZERO:${key}`);
}

export const respiratoryCaUsCoverageSummary20260807V3={
  cells:respiratoryCaUsCoverage20260807V3.length,
  qualifyingQuestions:respiratoryCaUsCoverageSummary20260807V2.qualifyingQuestions+rnPneumothoraxCoverageSummary.totalQualifyingQuestions,
  questionDeficit:respiratoryCaUsCoverageSummary20260807V2.questionDeficit+rnPneumothoraxCoverageSummary.totalQuestionDeficit,
  cramDeficit:respiratoryCaUsCoverageSummary20260807V2.cramDeficit+rnPneumothoraxCoverageSummary.totalCramDeficit,
  topicsClosed:["Asthma","COPD","Community-Acquired Pneumonia","Acute Respiratory Distress Syndrome","Pulmonary Embolism","Pneumothorax"] as const
};
if(respiratoryCaUsCoverageSummary20260807V3.cells!==18||respiratoryCaUsCoverageSummary20260807V3.qualifyingQuestions!==360||respiratoryCaUsCoverageSummary20260807V3.questionDeficit!==0||respiratoryCaUsCoverageSummary20260807V3.cramDeficit!==0)throw new Error(`RESP_CA_US_V3_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V3)}`);
