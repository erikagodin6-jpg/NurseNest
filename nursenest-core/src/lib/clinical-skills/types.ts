export type ClinicalPathwayTag = "RN_US" | "RPN_CA" | "NP" | "NEW_GRAD";

export type ClinicalSkillCategoryId =
  | "infection_control"
  | "medication_administration"
  | "airway"
  | "elimination"
  | "wound_care"
  | "assessment";

export type ClinicalSkillStep = {
  id: string;
  title: string;
  detail: string;
};

export type ClinicalSkillMilestone = {
  label: string;
  percent: number;
};

export type ClinicalSkillDefinition = {
  slug: string;
  title: string;
  categoryId: ClinicalSkillCategoryId;
  summary: string;
  minutesEstimate: number;
  /** 1 = foundational, 2 = intermediate, 3 = advanced */
  difficulty: 1 | 2 | 3;
  pathwayTags: ClinicalPathwayTag[];
  /** When true, surfaced first for NP audience query. */
  npAdvanced?: boolean;
  milestones: ClinicalSkillMilestone[];
  steps: ClinicalSkillStep[];
};

export type ClinicalSkillCategory = {
  id: ClinicalSkillCategoryId;
  title: string;
  description: string;
};
