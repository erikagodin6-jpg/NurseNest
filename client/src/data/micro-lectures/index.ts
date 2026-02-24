import { heartFailureLecture } from "./heart-failure";
import { hyperkalemiaHypokalemiaMicroLecture } from "./hyperkalemia-hypokalemia";

export interface LectureMetadata {
  slug: string;
  title: string;
  duration: string;
  level: string;
  category: string;
  tiers: ("rpn" | "rn" | "np")[];
  relatedLessonIds: string[];
}

export const lectureRegistry: LectureMetadata[] = [
  {
    slug: "heart-failure",
    title: heartFailureLecture.title,
    duration: heartFailureLecture.duration,
    level: heartFailureLecture.level,
    category: heartFailureLecture.category,
    tiers: ["rn"],
    relatedLessonIds: ["hf-advanced", "hf-advanced-np", "cardiac-meds"],
  },
  {
    slug: "hyperkalemia-hypokalemia",
    title: hyperkalemiaHypokalemiaMicroLecture.title,
    duration: hyperkalemiaHypokalemiaMicroLecture.duration,
    level: hyperkalemiaHypokalemiaMicroLecture.level,
    category: "Renal & Metabolic",
    tiers: ["rpn", "rn"],
    relatedLessonIds: [
      "potassium-imbalance-rpn",
      "electrolyte-safety",
      "electrolyte-safety-np",
      "electrolyte-emergency-patterns-rpn",
    ],
  },
];

export const lectureData: Record<string, typeof heartFailureLecture> = {
  "heart-failure": heartFailureLecture,
  "hyperkalemia-hypokalemia": hyperkalemiaHypokalemiaMicroLecture as any,
};

export function getLecturesForTier(tier: string): LectureMetadata[] {
  return lectureRegistry.filter((l) => l.tiers.includes(tier as any));
}

export function getLecturesForLesson(lessonId: string): LectureMetadata[] {
  return lectureRegistry.filter((l) => l.relatedLessonIds.includes(lessonId));
}
