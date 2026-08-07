import {
  respiratoryCaUsCoverage20260807V3,
  respiratoryCaUsCoverageSummary20260807V3
} from "./respiratory-ca-us-coverage-20260807-v3";
import {
  rnPleuralEffusionCoverageMatrix,
  rnPleuralEffusionCoverageSummary
} from "./respiratory-rn-pleural-effusion-coverage";

export const respiratoryCaUsCoverage20260807V4=[
  ...respiratoryCaUsCoverage20260807V3,
  ...rnPleuralEffusionCoverageMatrix
];

const keys=new Set<string>();
for(const cell of respiratoryCaUsCoverage20260807V4){
  const key=`${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if(keys.has(key))throw new Error(`RESP_CA_US_V4_DUPLICATE_CELL:${key}`);keys.add(key);
  if(!cell.fullLessonPresent||!cell.cramLessonPresent)throw new Error(`RESP_CA_US_V4_LESSON_MISSING:${key}`);
  if(cell.qualifyingQuestionCount<20||cell.questionDeficit!==0||cell.cramDeficit!==0)throw new Error(`RESP_CA_US_V4_DEFICIT_NONZERO:${key}`);
}

export const respiratoryCaUsCoverageSummary20260807V4={
  cells:respiratoryCaUsCoverage20260807V4.length,
  qualifyingQuestions:respiratoryCaUsCoverageSummary20260807V3.qualifyingQuestions+rnPleuralEffusionCoverageSummary.totalQualifyingQuestions,
  questionDeficit:respiratoryCaUsCoverageSummary20260807V3.questionDeficit+rnPleuralEffusionCoverageSummary.totalQuestionDeficit,
  cramDeficit:respiratoryCaUsCoverageSummary20260807V3.cramDeficit+rnPleuralEffusionCoverageSummary.totalCramDeficit,
  topicsClosed:["Asthma","COPD","Community-Acquired Pneumonia","Acute Respiratory Distress Syndrome","Pulmonary Embolism","Pneumothorax","Pleural Effusion"] as const
};
if(respiratoryCaUsCoverageSummary20260807V4.cells!==20||respiratoryCaUsCoverageSummary20260807V4.qualifyingQuestions!==400||respiratoryCaUsCoverageSummary20260807V4.questionDeficit!==0||respiratoryCaUsCoverageSummary20260807V4.cramDeficit!==0)throw new Error(`RESP_CA_US_V4_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V4)}`);
