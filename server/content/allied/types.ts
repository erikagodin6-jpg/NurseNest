export type AlliedRegionScope = "US" | "CAN" | "BOTH";

export interface AlliedGlossaryTerm {
  term: string;
  definition: string;
}

export interface AlliedAuthoredTopic {
  id: string;
  careerType: string;
  examTag: string;
  regionScope: AlliedRegionScope;
  category: string;
  topic: string;
  bottomLine: string;
  coreConcept: string;
  recognition: string;
  workflow: string;
  interpretation: string;
  safety: string;
  redFlags: string;
  commonErrors: string;
  examFocus: string;
  glossary: AlliedGlossaryTerm[];
}

export type AlliedLessonMode =
  | "foundation"
  | "workflow"
  | "interpretation"
  | "safety"
  | "case-application";

export interface AuthoredAlliedLesson {
  id: string;
  slug: string;
  careerType: string;
  examTag: string;
  regionScope: AlliedRegionScope;
  category: string;
  topic: string;
  mode: AlliedLessonMode;
  title: string;
  summary: string;
  objectives: string[];
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3 | 4;
  sections: Array<{ sectionTitle: string; content: string }>;
  glossary: AlliedGlossaryTerm[];
  status: "published";
}

export interface AuthoredAlliedOption {
  id: string;
  label: string;
  text: string;
}

export interface AuthoredAlliedQuestion {
  id: string;
  careerType: string;
  examTag: string;
  regionScope: AlliedRegionScope;
  countryCode?: string;
  languageCode: string;
  licensingBody?: string;
  category: string;
  topic: string;
  stem: string;
  options: AuthoredAlliedOption[];
  /** Kept only as migration metadata for legacy consumers; canonical grading uses correctAnswer. */
  correctIndex: number;
  correctAnswer: string;
  rationale: string;
  correctAnswerExplanation: string;
  distractorRationales: Record<string, string>;
  hint: string;
  whyThisMatters: string;
  clinicalPearl: string;
  mnemonic?: string;
  unitSystemSupport?: { supported: Array<"SI" | "CONV">; default: "SI" | "CONV" };
  unitVariants?: Array<{
    token: string;
    quantity: string;
    si: { value: number | string; unit: string; display: string };
    conv: { value: number | string; unit: string; display: string };
  }>;
  difficulty: 1 | 2 | 3 | 4;
  cognitiveLevel: "understanding" | "application" | "analysis";
  tags: string[];
}
