export const CAREER_QUESTION_COUNTS: Record<string, number> = {
  rrt: 510,
  paramedic: 500,
  pharmacyTech: 1515,
  mlt: 500,
  imaging: 500,
  occupationalTherapyAssistant: 400,
  physiotherapyAssistant: 400,
  psychotherapist: 500,
  socialWorker: 25,
  addictionsCounsellor: 500,
  surgicalTechnologist: 1502,
  criticalCare: 500,
  emergencyNursing: 500,
  perioperative: 500,
  oncologyNursing: 500,
  pediatricCert: 500,
};

export const CAREER_SLUG_TO_KEY: Record<string, string> = {
  "rrt": "rrt",
  "respiratory-therapy": "rrt",
  "paramedic": "paramedic",
  "pharmacy-tech": "pharmacyTech",
  "pharmacy-technician": "pharmacyTech",
  "pharmacyTech": "pharmacyTech",
  "mlt": "mlt",
  "medical-laboratory-technologist": "mlt",
  "imaging": "imaging",
  "radiologic-technologist": "imaging",
  "occupational-therapy": "occupationalTherapyAssistant",
  "occupational-therapy-assistant": "occupationalTherapyAssistant",
  "occupationalTherapyAssistant": "occupationalTherapyAssistant",
  "physical-therapy": "physiotherapyAssistant",
  "physiotherapy-assistant": "physiotherapyAssistant",
  "physiotherapyAssistant": "physiotherapyAssistant",
  "psychotherapist": "psychotherapist",
  "social-worker": "socialWorker",
  "socialWorker": "socialWorker",
  "addictions-counsellor": "addictionsCounsellor",
  "addictionsCounsellor": "addictionsCounsellor",
  "surgical-technologist": "surgicalTechnologist",
  "surgicalTechnologist": "surgicalTechnologist",
  "critical-care": "criticalCare",
  "criticalCare": "criticalCare",
  "emergency-nursing": "emergencyNursing",
  "emergencyNursing": "emergencyNursing",
  "perioperative": "perioperative",
  "oncology-nursing": "oncologyNursing",
  "oncologyNursing": "oncologyNursing",
  "pediatric-cert": "pediatricCert",
  "pediatricCert": "pediatricCert",
};

export function getQuestionCount(careerSlugOrKey: string): number {
  const key = CAREER_SLUG_TO_KEY[careerSlugOrKey] || careerSlugOrKey;
  return CAREER_QUESTION_COUNTS[key] || 0;
}

export function getQuestionCountDisplay(careerSlugOrKey: string): string {
  const count = getQuestionCount(careerSlugOrKey);
  if (count === 0) return "Coming Soon";
  if (count < 50) return `${count}`;
  if (count < 1000) {
    const rounded = Math.floor(count / 50) * 50;
    return `${rounded}+`;
  }
  const rounded = Math.floor(count / 100) * 100;
  return `${rounded.toLocaleString()}+`;
}

const ALLIED_HEALTH_CAREER_KEYS = [
  "rrt", "paramedic", "pharmacyTech", "mlt", "imaging",
  "occupationalTherapyAssistant", "physiotherapyAssistant",
  "psychotherapist", "socialWorker", "addictionsCounsellor",
  "surgicalTechnologist",
];

export function getTotalAlliedHealthQuestions(): number {
  return ALLIED_HEALTH_CAREER_KEYS.reduce(
    (sum, key) => sum + (CAREER_QUESTION_COUNTS[key] || 0),
    0
  );
}

export function getTotalAlliedHealthDisplay(): string {
  const total = getTotalAlliedHealthQuestions();
  const rounded = Math.floor(total / 500) * 500;
  return `${rounded.toLocaleString()}+`;
}
