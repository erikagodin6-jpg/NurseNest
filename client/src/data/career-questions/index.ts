export type { CareerQuestion } from "./rrt-questions";
export { getCareerQuestionPool } from "./career-question-pool";

import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";

const questionLoaders: Record<string, () => Promise<CareerQuestion[]>> = {
  rrt: () => Promise.all([import("./rrt-questions").then(m => m.rrtQuestions), import("./rrt-questions-batch1").then(m => m.rrtQuestionsBatch1)]).then(([a, b]) => [...a, ...b]),
  paramedic: () => import("./paramedic-questions").then(m => m.paramedicQuestions),
  pharmacyTech: () => import("./pharmacy-tech-questions").then(m => m.pharmacyTechQuestions),
  mlt: () => import("./mlt-questions").then(m => m.mltQuestions),
  imaging: () => import("./imaging-questions").then(m => m.imagingQuestions),
  criticalCare: () => import("./critical-care-questions").then(m => m.criticalCareQuestions),
  emergencyNursing: () => import("./emergency-nursing-questions").then(m => m.emergencyNursingQuestions),
  perioperative: () => import("./perioperative-questions").then(m => m.perioperativeQuestions),
  oncologyNursing: () => import("./oncology-nursing-questions").then(m => m.oncologyNursingQuestions),
  pediatricCert: () => import("./pediatric-cert-questions").then(m => m.pediatricCertQuestions),
  psychotherapist: () => import("./psychotherapist-questions").then(m => m.psychotherapistQuestions),
  socialWorker: () => import("./social-worker-questions").then(m => m.socialWorkerQuestions),
  addictionsCounsellor: () => import("./addictions-counsellor-questions").then(m => m.addictionsCounsellorQuestions),
  surgicalTechnologist: () => Promise.all([
    import("./surgical-technologist-questions").then(m => m.surgicalTechnologistQuestions),
    import("./surgical-technologist-questions-2").then(m => m.surgicalTechnologistQuestionsPart2),
    import("./surgical-technologist-questions-3").then(m => m.surgicalTechnologistQuestionsPart3),
    import("./surgical-technologist-questions-4").then(m => m.surgicalTechnologistQuestionsPart4),
    import("./surgical-technologist-questions-5").then(m => m.surgicalTechnologistQuestionsPart5),
    import("./surgical-technologist-questions-6").then(m => m.surgicalTechnologistQuestionsPart6),
  ]).then(parts => parts.flat()),
};

export async function loadCareerQuestions(careerType: CareerType): Promise<CareerQuestion[]> {
  const loader = questionLoaders[careerType];
  if (!loader) return [];
  try {
    return await loader();
  } catch (err) {
    console.error(`[CareerQuestions] Failed to load questions for ${careerType}:`, err);
    return [];
  }
}
