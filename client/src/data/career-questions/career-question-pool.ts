import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";
import { rrtQuestions } from "./rrt-questions";
import { rrtQuestionsBatch1 } from "./rrt-questions-batch1";
import { paramedicQuestions } from "./paramedic-questions";
import { pharmacyTechQuestions } from "./pharmacy-tech-questions";
import { pharmacyTechQuestionsExtended } from "./pharmacy-tech-questions-extended";
import { pharmacyTechQuestionsBatch2 } from "./pharmacy-tech-questions-batch2";
import { pharmacyTechQuestionsBatch3 } from "./pharmacy-tech-questions-batch3";
import { pharmacyTechQuestionsBatch4 } from "./pharmacy-tech-questions-batch4";
import { pharmacyTechQuestionsPEBC } from "./pharmacy-tech-questions-pebc";
import { mltQuestions } from "./mlt-questions";
import { imagingQuestions } from "./imaging-questions";
import { otaQuestions } from "./ota-questions";
import { ptaQuestions } from "./pta-questions";

const pools: Record<string, CareerQuestion[]> = {
  rrt: [...rrtQuestions, ...rrtQuestionsBatch1],
  paramedic: paramedicQuestions,
  pharmacyTech: [...pharmacyTechQuestions, ...pharmacyTechQuestionsExtended, ...pharmacyTechQuestionsBatch2, ...pharmacyTechQuestionsBatch3, ...pharmacyTechQuestionsBatch4, ...pharmacyTechQuestionsPEBC],
  mlt: mltQuestions,
  imaging: imagingQuestions,
  occupationalTherapyAssistant: otaQuestions,
  physiotherapyAssistant: ptaQuestions,
};

export function getCareerQuestionPool(careerType: CareerType | string): CareerQuestion[] {
  return pools[careerType] || [];
}
