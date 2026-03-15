export type { CareerQuestion } from "./rrt-questions";
export { getCareerQuestionPool } from "./career-question-pool";

import type { CareerQuestion } from "./rrt-questions";
import type { CareerType } from "@shared/careers";

const questionModules: Record<string, () => Promise<{ default?: CareerQuestion[]; [key: string]: any }>> = {
  rrt: () => import("./rrt-questions"),
  paramedic: () => import("./paramedic-questions"),
  pharmacyTech: () => import("./pharmacy-tech-questions"),
  mlt: () => import("./mlt-questions"),
  imaging: () => import("./imaging-questions"),
  criticalCare: () => import("./critical-care-questions"),
  emergencyNursing: () => import("./emergency-nursing-questions"),
  perioperative: () => import("./perioperative-questions"),
  oncologyNursing: () => import("./oncology-nursing-questions"),
  pediatricCert: () => import("./pediatric-cert-questions"),
  psychotherapist: () => import("./psychotherapist-questions"),
  socialWorker: () => import("./social-worker-questions"),
  addictionsCounsellor: () => import("./addictions-counsellor-questions"),
};

export async function loadCareerQuestions(careerType: CareerType): Promise<CareerQuestion[]> {
  const loader = questionModules[careerType];
  if (!loader) return [];
  try {
    const mod = await loader();
    const exportKey = Object.keys(mod).find(k => Array.isArray(mod[k]));
    if (!exportKey) return [];
    return mod[exportKey] as CareerQuestion[];
  } catch {
    return [];
  }
}
