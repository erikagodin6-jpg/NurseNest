export type { CareerQuestion } from "./rrt-questions";
export { getCareerQuestionPool } from "./career-question-pool";

import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";

const questionLoaders: Record<string, () => Promise<CareerQuestion[]>> = {
  rrt: () => Promise.all([
    import("./rrt-questions").then(m => m.rrtQuestions),
    import("./rrt-questions-batch1").then(m => m.rrtQuestionsBatch1),
    import("./rrt-questions-batch2").then(m => m.rrtQuestionsBatch2),
    import("./rrt-questions-batch3").then(m => m.rrtQuestionsBatch3),
  ]).then(parts => parts.flat()),
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
  physiotherapyAssistant: () => Promise.all([
    import("./pta-questions").then(m => m.ptaQuestions),
    import("./pta-questions-batch1").then(m => m.ptaQuestionsBatch1),
    import("./pta-questions-batch2").then(m => m.ptaQuestionsBatch2),
    import("./pta-questions-batch3").then(m => m.ptaQuestionsBatch3),
    import("./pta-questions-batch4").then(m => m.ptaQuestionsBatch4),
    import("./pta-questions-batch5").then(m => m.ptaQuestionsBatch5),
    import("./pta-questions-batch6").then(m => m.ptaQuestionsBatch6),
    import("./pta-questions-batch7").then(m => m.ptaQuestionsBatch7),
    import("./pta-questions-batch8").then(m => m.ptaQuestionsBatch8),
    import("./pta-questions-batch9").then(m => m.ptaQuestionsBatch9),
    import("./pta-questions-batch10").then(m => m.ptaQuestionsBatch10),
    import("./pta-questions-batch11").then(m => m.ptaQuestionsBatch11),
    import("./pta-questions-batch12").then(m => m.ptaQuestionsBatch12),
    import("./pta-questions-batch13").then(m => m.ptaQuestionsBatch13),
    import("./pta-questions-batch14").then(m => m.ptaQuestionsBatch14),
    import("./pta-questions-batch15").then(m => m.ptaQuestionsBatch15),
    import("./pta-questions-batch16").then(m => m.ptaQuestionsBatch16),
    import("./pta-questions-batch17").then(m => m.ptaQuestionsBatch17),
    import("./pta-questions-batch18").then(m => m.ptaQuestionsBatch18),
  ]).then(parts => parts.flat()),
  surgicalTechnologist: () => Promise.all([
    import("./surgical-technologist-questions").then(m => m.surgicalTechnologistQuestions),
    import("./surgical-technologist-questions-2").then(m => m.surgicalTechnologistQuestionsPart2),
    import("./surgical-technologist-questions-3").then(m => m.surgicalTechnologistQuestionsPart3),
    import("./surgical-technologist-questions-4").then(m => m.surgicalTechnologistQuestionsPart4),
    import("./surgical-technologist-questions-5").then(m => m.surgicalTechnologistQuestionsPart5),
    import("./surgical-technologist-questions-6").then(m => m.surgicalTechnologistQuestionsPart6),
  ]).then(parts => parts.flat()),
  occupationalTherapy: () => import("./ota-questions").then(m => m.otaQuestions),
  physicalTherapy: () => import("./pta-questions").then(m => m.ptaQuestions),
  healthInfoMgmt: () => import("./him-questions").then(m => m.himQuestions),
  diagnosticSonography: () => import("./sonography-questions").then(m => m.sonographyQuestions),
  cardiacSonographer: () => import("./cardiac-sonographer-questions").then(m => m.cardiacSonographerQuestions),
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
