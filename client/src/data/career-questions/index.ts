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
  paramedic: () => Promise.all([
    import("./paramedic-questions").then(m => m.paramedicQuestions),
    import("./paramedic-questions-expansion").then(m => m.paramedicQuestionsExpansion),
  ]).then(parts => parts.flat()),
  pharmacyTech: () => Promise.all([
    import("./pharmacy-tech-questions").then(m => m.pharmacyTechQuestions),
    import("./pharmacy-tech-questions-batch2").then(m => m.pharmacyTechQuestionsBatch2),
    import("./pharmacy-tech-questions-batch3").then(m => m.pharmacyTechQuestionsBatch3),
    import("./pharmacy-tech-questions-batch4").then(m => m.pharmacyTechQuestionsBatch4 as any),
    import("./pharmacy-tech-questions-extended").then(m => m.pharmacyTechQuestionsExtended),
    import("./pharmacy-tech-questions-pebc").then(m => m.pharmacyTechQuestionsPEBC as any),
    import("./pharmacy-tech-questions-expansion").then(m => m.pharmacyTechQuestionsExpansion),
  ]).then(parts => parts.flat()),
  mlt: () => Promise.all([
    import("./mlt-questions").then(m => m.mltQuestions),
    import("./mlt-questions-batch2").then(m => m.mltQuestionsBatch2),
    import("./mlt-questions-expansion").then(m => m.mltQuestionsExpansion),
  ]).then(parts => parts.flat()),
  imaging: () => Promise.all([
    import("./imaging-questions").then(m => m.imagingQuestions),
    import("./imaging-questions-expansion").then(m => m.imagingQuestionsExpansion),
  ]).then(parts => parts.flat()),
  criticalCare: () => import("./critical-care-questions").then(m => m.criticalCareQuestions),
  emergencyNursing: () => import("./emergency-nursing-questions").then(m => m.emergencyNursingQuestions),
  perioperative: () => import("./perioperative-questions").then(m => m.perioperativeQuestions),
  oncologyNursing: () => import("./oncology-nursing-questions").then(m => m.oncologyNursingQuestions),
  pediatricCert: () => import("./pediatric-cert-questions").then(m => m.pediatricCertQuestions),
  psychotherapist: () => import("./psychotherapist-questions").then(m => m.psychotherapistQuestions),
  socialWorker: () => Promise.all([
    import("./social-worker-questions").then(m => m.socialWorkerQuestions),
    import("./social-worker-questions-batch2").then(m => m.socialWorkerQuestionsBatch2),
    import("./social-worker-questions-batch3").then(m => m.socialWorkerQuestionsBatch3),
    import("./social-worker-questions-batch4").then(m => m.socialWorkerQuestionsBatch4),
    import("./social-worker-questions-batch5").then(m => m.socialWorkerQuestionsBatch5),
    import("./social-worker-questions-batch6").then(m => m.socialWorkerQuestionsBatch6),
    import("./social-worker-questions-batch7").then(m => m.socialWorkerQuestionsBatch7),
    import("./social-worker-questions-batch8").then(m => m.socialWorkerQuestionsBatch8),
    import("./social-worker-questions-batch9").then(m => m.socialWorkerQuestionsBatch9),
    import("./social-worker-questions-batch10").then(m => m.socialWorkerQuestionsBatch10),
    import("./social-worker-questions-batch11").then(m => m.socialWorkerQuestionsBatch11),
    import("./social-worker-questions-batch12").then(m => m.socialWorkerQuestionsBatch12),
    import("./social-worker-questions-batch13").then(m => m.socialWorkerQuestionsBatch13),
    import("./social-worker-questions-batch14").then(m => m.socialWorkerQuestionsBatch14),
    import("./social-worker-questions-batch15").then(m => m.socialWorkerQuestionsBatch15),
    import("./social-worker-questions-batch16").then(m => m.socialWorkerQuestionsBatch16),
    import("./social-worker-questions-batch17").then(m => m.socialWorkerQuestionsBatch17),
    import("./social-worker-questions-batch18").then(m => m.socialWorkerQuestionsBatch18),
    import("./social-worker-questions-batch19").then(m => m.socialWorkerQuestionsBatch19),
    import("./social-worker-questions-batch20").then(m => m.socialWorkerQuestionsBatch20),
    import("./social-worker-questions-batch21").then(m => m.socialWorkerQuestionsBatch21),
    import("./social-worker-questions-batch22").then(m => m.socialWorkerQuestionsBatch22),
  ]).then(parts => parts.flat()),
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
    import("./pta-questions-expansion").then(m => m.ptaQuestionsExpansion),
  ]).then(parts => parts.flat()),
  surgicalTechnologist: () => Promise.all([
    import("./surgical-technologist-questions").then(m => m.surgicalTechnologistQuestions),
    import("./surgical-technologist-questions-2").then(m => m.surgicalTechnologistQuestionsPart2),
    import("./surgical-technologist-questions-3").then(m => m.surgicalTechnologistQuestionsPart3),
    import("./surgical-technologist-questions-4").then(m => m.surgicalTechnologistQuestionsPart4),
    import("./surgical-technologist-questions-5").then(m => m.surgicalTechnologistQuestionsPart5),
    import("./surgical-technologist-questions-6").then(m => m.surgicalTechnologistQuestionsPart6),
  ]).then(parts => parts.flat()),
  occupationalTherapyAssistant: () => Promise.all([
    import("./ota-questions").then(m => m.otaQuestions),
    import("./ota-questions-batch2").then(m => m.otaQuestionsBatch2),
    import("./ota-questions-batch3").then(m => m.otaQuestionsBatch3),
    import("./ota-questions-batch4").then(m => m.otaQuestionsBatch4),
    import("./ota-questions-batch5").then(m => m.otaQuestionsBatch5),
    import("./ota-questions-batch6").then(m => m.otaQuestionsBatch6),
    import("./ota-questions-batch7").then(m => m.otaQuestionsBatch7),
    import("./ota-questions-batch8").then(m => m.otaQuestionsBatch8),
    import("./ota-questions-batch9").then(m => m.otaQuestionsBatch9),
    import("./ota-questions-batch10").then(m => m.otaQuestionsBatch10),
    import("./ota-questions-expansion").then(m => m.otaQuestionsExpansion),
  ]).then(parts => parts.flat()),
  occupationalTherapy: () => Promise.all([
    import("./ota-questions").then(m => m.otaQuestions),
    import("./ota-questions-expansion").then(m => m.otaQuestionsExpansion),
  ]).then(parts => parts.flat()),
  physicalTherapy: () => Promise.all([
    import("./pta-questions").then(m => m.ptaQuestions),
    import("./pta-questions-expansion").then(m => m.ptaQuestionsExpansion),
  ]).then(parts => parts.flat()),
  healthInfoMgmt: () => Promise.all([
    import("./him-questions").then(m => m.himQuestions),
    import("./him-questions-batch2").then(m => m.himQuestionsBatch2),
  ]).then(parts => parts.flat()),
  diagnosticSonography: () => Promise.all([
    import("./sonography-questions").then(m => m.sonographyQuestions),
    import("./sonography-questions-batch2").then(m => m.sonographyQuestionsBatch2),
  ]).then(parts => parts.flat()),
  cardiacSonographer: () => Promise.all([
    import("./cardiac-sonographer-questions").then(m => m.cardiacSonographerQuestions),
    import("./cardiac-sonographer-questions-batch2").then(m => m.cardiacSonographerQuestionsBatch2),
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
