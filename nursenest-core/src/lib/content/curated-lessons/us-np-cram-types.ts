export const US_NP_EXAMS = [
  "AANP-FNP",
  "ANCC-FNP",
  "AGPCNP-AANP",
  "AGPCNP-ANCC",
  "AGACNP",
  "PMHNP",
  "PNP",
  "WHNP",
  "ENP",
] as const;

export type UsNpExam = (typeof US_NP_EXAMS)[number];

export type UsNpCramTargetSection =
  | "Bottom Line"
  | "Diagnostics"
  | "Management"
  | "Medication and Safety"
  | "Red Flags: Escalate"
  | "NCLEX Traps";

export interface UsNpCramLesson {
  slug: string;
  title: string;
  /** Explicit legacy/database title aliases only. Never fuzzy-matched. */
  titleAliases?: readonly string[];
  /** Explicit legacy/database slug aliases only. Never fuzzy-matched. */
  slugAliases?: readonly string[];
  bodySystem: string;
  applicableExams: readonly UsNpExam[];
  recognize: string;
  diagnostics: string;
  priorities: string;
  medicationSafety: string;
  redFlags: string;
  examTraps: string;
  sourceKeys: readonly string[];
}

export interface UsNpCramProjection {
  cramTitle:
    | "Recognize It Fast"
    | "Must-Know Diagnostics"
    | "First Priorities"
    | "Medication Safety"
    | "Red Flags"
    | "Exam Traps";
  cramContent: string;
  cramOrder: 1 | 2 | 3 | 4 | 5 | 6;
  targetSection: UsNpCramTargetSection;
}

export const US_NP_CRAM_VERSION = "2026-08-07.us-np-cram.v2";

export function buildUsNpCramProjection(lesson: UsNpCramLesson): readonly UsNpCramProjection[] {
  return [
    {
      cramTitle: "Recognize It Fast",
      cramContent: lesson.recognize,
      cramOrder: 1,
      targetSection: "Bottom Line",
    },
    {
      cramTitle: "Must-Know Diagnostics",
      cramContent: lesson.diagnostics,
      cramOrder: 2,
      targetSection: "Diagnostics",
    },
    {
      cramTitle: "First Priorities",
      cramContent: lesson.priorities,
      cramOrder: 3,
      targetSection: "Management",
    },
    {
      cramTitle: "Medication Safety",
      cramContent: lesson.medicationSafety,
      cramOrder: 4,
      targetSection: "Medication and Safety",
    },
    {
      cramTitle: "Red Flags",
      cramContent: lesson.redFlags,
      cramOrder: 5,
      targetSection: "Red Flags: Escalate",
    },
    {
      cramTitle: "Exam Traps",
      cramContent: lesson.examTraps,
      cramOrder: 6,
      targetSection: "NCLEX Traps",
    },
  ] as const;
}

type SectionLike = Record<string, unknown> & { sectionTitle?: unknown };

export function attachUsNpCramToSections(
  sections: readonly SectionLike[],
  lesson: UsNpCramLesson,
): SectionLike[] {
  const projection = buildUsNpCramProjection(lesson);
  const byTarget = new Map(projection.map((item) => [item.targetSection, item]));
  const seen = new Set<UsNpCramTargetSection>();

  const output = sections.map((section) => {
    const clean = { ...section };
    delete clean.cramTitle;
    delete clean.cramContent;
    delete clean.cramOrder;

    const title = typeof clean.sectionTitle === "string" ? clean.sectionTitle : "";
    const cram = byTarget.get(title as UsNpCramTargetSection);
    if (!cram) return clean;

    seen.add(cram.targetSection);
    return {
      ...clean,
      cramTitle: cram.cramTitle,
      cramContent: cram.cramContent,
      cramOrder: cram.cramOrder,
    };
  });

  const missing = projection.filter((item) => !seen.has(item.targetSection));
  if (missing.length) {
    throw new Error(
      `US_NP_CRAM_TARGET_SECTION_MISSING: ${lesson.slug}; ${missing.map((item) => item.targetSection).join(", ")}`,
    );
  }

  return output;
}
