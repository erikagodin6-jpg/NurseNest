import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";
import { rrtQuestions } from "./rrt-questions";
import { paramedicQuestions } from "./paramedic-questions";
import { pharmacyTechQuestions } from "./pharmacy-tech-questions";
import { pharmacyTechQuestionsExtended } from "./pharmacy-tech-questions-extended";
import { mltQuestions } from "./mlt-questions";
import { imagingQuestions } from "./imaging-questions";
import { otaQuestions } from "./ota-questions";
import { ptaQuestions } from "./pta-questions";

const pools: Record<string, CareerQuestion[]> = {
  rrt: rrtQuestions,
  paramedic: paramedicQuestions,
  pharmacyTech: [...pharmacyTechQuestions, ...pharmacyTechQuestionsExtended],
  mlt: mltQuestions,
  imaging: imagingQuestions,
  occupationalTherapyAssistant: otaQuestions,
  physiotherapyAssistant: ptaQuestions,
};

export function getCareerQuestionPool(careerType: CareerType | string): CareerQuestion[] {
  return pools[careerType] || [];
}
