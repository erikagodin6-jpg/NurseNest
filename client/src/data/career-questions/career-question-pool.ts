import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";
import { rrtQuestions } from "./rrt-questions";
import { rrtQuestionsBatch1 } from "./rrt-questions-batch1";
import { rrtQuestionsBatch3 } from "./rrt-questions-batch3";
import { rrtPharmacologyQuestions } from "./rrt-pharmacology-questions";
import { rrtQuestionsBatch2 } from "./rrt-questions-batch2";
import { paramedicQuestions } from "./paramedic-questions";
import { pharmacyTechQuestions } from "./pharmacy-tech-questions";
import { pharmacyTechQuestionsExtended } from "./pharmacy-tech-questions-extended";
import { pharmacyTechQuestionsBatch2 } from "./pharmacy-tech-questions-batch2";
import { pharmacyTechQuestionsBatch3 } from "./pharmacy-tech-questions-batch3";
import { pharmacyTechQuestionsBatch4 } from "./pharmacy-tech-questions-batch4";
import { pharmacyTechQuestionsPEBC } from "./pharmacy-tech-questions-pebc";
import { mltQuestions } from "./mlt-questions";
import { mltQuestionsBatch2 } from "./mlt-questions-batch2";
import { imagingQuestions } from "./imaging-questions";
import { otaQuestions } from "./ota-questions";
import { ptaQuestions } from "./pta-questions";
import { himQuestions } from "./him-questions";
import { sonographyQuestions } from "./sonography-questions";
import { cardiacSonographerQuestions } from "./cardiac-sonographer-questions";
import { surgicalTechnologistQuestions } from "./surgical-technologist-questions";
import { surgicalTechnologistQuestionsPart2 } from "./surgical-technologist-questions-2";
import { surgicalTechnologistQuestionsPart3 } from "./surgical-technologist-questions-3";
import { surgicalTechnologistQuestionsPart4 } from "./surgical-technologist-questions-4";
import { surgicalTechnologistQuestionsPart5 } from "./surgical-technologist-questions-5";
import { surgicalTechnologistQuestionsPart6 } from "./surgical-technologist-questions-6";

const pools: Record<string, CareerQuestion[]> = {
  rrt: [...rrtQuestions, ...rrtQuestionsBatch1, ...rrtQuestionsBatch2, ...rrtQuestionsBatch3, ...rrtPharmacologyQuestions],
  paramedic: paramedicQuestions,
  pharmacyTech: [...pharmacyTechQuestions, ...pharmacyTechQuestionsExtended, ...pharmacyTechQuestionsBatch2, ...pharmacyTechQuestionsBatch3, ...pharmacyTechQuestionsBatch4, ...pharmacyTechQuestionsPEBC],
  mlt: [...mltQuestions, ...mltQuestionsBatch2],
  imaging: imagingQuestions,
  occupationalTherapyAssistant: otaQuestions,
  occupationalTherapy: otaQuestions,
  physiotherapyAssistant: ptaQuestions,
  physicalTherapy: ptaQuestions,
  surgicalTechnologist: [...surgicalTechnologistQuestions, ...surgicalTechnologistQuestionsPart2, ...surgicalTechnologistQuestionsPart3, ...surgicalTechnologistQuestionsPart4, ...surgicalTechnologistQuestionsPart5, ...surgicalTechnologistQuestionsPart6],
  healthInfoMgmt: himQuestions,
  diagnosticSonography: sonographyQuestions,
  cardiacSonographer: cardiacSonographerQuestions,
};

export function getCareerQuestionPool(careerType: CareerType | string): CareerQuestion[] {
  return pools[careerType] || [];
}
