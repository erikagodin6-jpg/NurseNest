export interface CardiovascularMedicationRow {
  medication: string;
  classOrRole: string;
  whyUsed: string;
  nursingSafety: string;
}

export interface CardiovascularLessonSeed {
  title: string;
  summary: string;
  bottomLine: string;
  pathophysiology: string[];
  assessment: string[];
  diagnostics: string[];
  management: string[];
  medications: CardiovascularMedicationRow[];
  priorities: string[];
  redFlags: string[];
  traps: string[];
  clinicalJudgment: string;
}

export interface CuratedCardiovascularSection {
  sectionTitle: string;
  content: string;
  /**
   * Optional Cram-mode projection for this section. Existing Full-lesson
   * renderers can ignore these fields; the canonical Cram resolver can select
   * only sections that carry a Cram projection and sort by cramOrder.
   */
  cramTitle?: string;
  cramContent?: string;
  cramOrder?: number;
}

export interface CuratedCardiovascularLesson {
  title: string;
  summary: string;
  versionKey: string;
  sections: CuratedCardiovascularSection[];
}

export const CARDIOVASCULAR_FULL_FLOW = [
  "Bottom Line",
  "What Is Happening",
  "Assessment Pattern",
  "Diagnostics",
  "Management",
  "Medication and Safety",
  "Priority Nursing Actions",
  "Red Flags: Escalate",
  "NCLEX Traps",
  "Clinical Judgment",
] as const;

export const CARDIOVASCULAR_CRAM_FLOW = [
  "Recognize It Fast",
  "Must-Know Diagnostics",
  "First Priorities",
  "Medication Safety",
  "Red Flags",
  "Exam Traps",
] as const;

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function medicationTable(rows: CardiovascularMedicationRow[]): string {
  const header = [
    "| Medication / therapy | Class / role | Why it is used | Nursing safety |",
    "|---|---|---|---|",
  ];
  const body = rows.map(
    (row) =>
      `| **${row.medication}** | ${row.classOrRole} | ${row.whyUsed} | ${row.nursingSafety} |`,
  );
  return [...header, ...body].join("\n");
}

function numbered(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function compact<T>(items: T[], maximum = 4): T[] {
  return items.slice(0, maximum);
}

export function buildCardiovascularLesson(seed: CardiovascularLessonSeed): CuratedCardiovascularLesson {
  const slug = seed.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const recognizeFast = [
    seed.bottomLine,
    ...compact(seed.assessment, 3).map((item) => `- ${item}`),
  ].join("\n");

  const sections: CuratedCardiovascularLesson["sections"] = [
    {
      sectionTitle: "Bottom Line",
      content: seed.bottomLine,
      cramTitle: "Recognize It Fast",
      cramContent: recognizeFast,
      cramOrder: 1,
    },
    { sectionTitle: "What Is Happening", content: bullets(seed.pathophysiology) },
    {
      sectionTitle: "Assessment Pattern",
      content: bullets(seed.assessment),
    },
    {
      sectionTitle: "Diagnostics",
      content: bullets(seed.diagnostics),
      cramTitle: "Must-Know Diagnostics",
      cramContent: bullets(compact(seed.diagnostics, 4)),
      cramOrder: 2,
    },
    { sectionTitle: "Management", content: bullets(seed.management) },
    {
      sectionTitle: "Medication and Safety",
      content: medicationTable(seed.medications),
      cramTitle: "Medication Safety",
      cramContent: medicationTable(compact(seed.medications, 3)),
      cramOrder: 4,
    },
    {
      sectionTitle: "Priority Nursing Actions",
      content: bullets(seed.priorities),
      cramTitle: "First Priorities",
      cramContent: numbered(compact(seed.priorities, 4)),
      cramOrder: 3,
    },
    {
      sectionTitle: "Red Flags: Escalate",
      content: bullets(seed.redFlags),
      cramTitle: "Red Flags",
      cramContent: bullets(compact(seed.redFlags, 4)),
      cramOrder: 5,
    },
    {
      sectionTitle: "NCLEX Traps",
      content: numbered(seed.traps),
      cramTitle: "Exam Traps",
      cramContent: numbered(compact(seed.traps, 5)),
      cramOrder: 6,
    },
    { sectionTitle: "Clinical Judgment", content: seed.clinicalJudgment },
  ];

  validateCardiovascularLesson(seed.title, sections);

  return {
    title: seed.title,
    summary: seed.summary,
    versionKey: `rn-cardiovascular-${slug}-curated-flow-cram-2026-08-07`,
    sections,
  };
}

export function validateCardiovascularLesson(
  title: string,
  sections: CuratedCardiovascularLesson["sections"],
): void {
  if (sections.length !== CARDIOVASCULAR_FULL_FLOW.length) {
    throw new Error(
      `${title}: expected ${CARDIOVASCULAR_FULL_FLOW.length} full sections, got ${sections.length}`,
    );
  }

  CARDIOVASCULAR_FULL_FLOW.forEach((requiredTitle, index) => {
    const actual = sections[index]?.sectionTitle;
    if (actual !== requiredTitle) {
      throw new Error(
        `${title}: lesson flow is out of order at position ${index + 1}; expected "${requiredTitle}", got "${actual ?? "missing"}"`,
      );
    }
  });

  const cramSections = sections
    .filter(
      (section): section is CuratedCardiovascularSection & {
        cramTitle: string;
        cramContent: string;
        cramOrder: number;
      } =>
        Boolean(
          section.cramTitle &&
            section.cramContent &&
            typeof section.cramOrder === "number",
        ),
    )
    .sort((a, b) => a.cramOrder - b.cramOrder);

  if (cramSections.length !== CARDIOVASCULAR_CRAM_FLOW.length) {
    throw new Error(
      `${title}: expected ${CARDIOVASCULAR_CRAM_FLOW.length} Cram sections, got ${cramSections.length}`,
    );
  }

  CARDIOVASCULAR_CRAM_FLOW.forEach((requiredTitle, index) => {
    const actual = cramSections[index]?.cramTitle;
    const actualOrder = cramSections[index]?.cramOrder;
    if (actual !== requiredTitle || actualOrder !== index + 1) {
      throw new Error(
        `${title}: Cram flow is out of order at position ${index + 1}; expected "${requiredTitle}", got "${actual ?? "missing"}"`,
      );
    }
  });

  for (const section of sections) {
    for (const paragraph of section.content.split(/\n{2,}/)) {
      if (paragraph.length > 1200) {
        throw new Error(
          `${title}: section "${section.sectionTitle}" contains a paragraph longer than 1200 characters`,
        );
      }
    }
    if (section.cramContent) {
      for (const paragraph of section.cramContent.split(/\n{2,}/)) {
        if (paragraph.length > 800) {
          throw new Error(
            `${title}: Cram section "${section.cramTitle}" contains a paragraph longer than 800 characters`,
          );
        }
      }
    }
  }
}
