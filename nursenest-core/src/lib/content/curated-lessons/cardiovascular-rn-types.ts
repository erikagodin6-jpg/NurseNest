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

export interface CuratedCardiovascularLesson {
  title: string;
  summary: string;
  versionKey: string;
  sections: Array<{ sectionTitle: string; content: string }>;
}

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

export function buildCardiovascularLesson(seed: CardiovascularLessonSeed): CuratedCardiovascularLesson {
  const slug = seed.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const sections: CuratedCardiovascularLesson["sections"] = [
    { sectionTitle: "Bottom Line", content: seed.bottomLine },
    { sectionTitle: "What Is Happening", content: bullets(seed.pathophysiology) },
    { sectionTitle: "Assessment Pattern", content: bullets(seed.assessment) },
    { sectionTitle: "Diagnostics", content: bullets(seed.diagnostics) },
    { sectionTitle: "Management", content: bullets(seed.management) },
    { sectionTitle: "Medication and Safety", content: medicationTable(seed.medications) },
    { sectionTitle: "Priority Nursing Actions", content: bullets(seed.priorities) },
    { sectionTitle: "Red Flags: Escalate", content: bullets(seed.redFlags) },
    { sectionTitle: "NCLEX Traps", content: numbered(seed.traps) },
    { sectionTitle: "Clinical Judgment", content: seed.clinicalJudgment },
  ];

  validateCardiovascularLesson(seed.title, sections);

  return {
    title: seed.title,
    summary: seed.summary,
    versionKey: `rn-cardiovascular-${slug}-curated-2026-08-07`,
    sections,
  };
}

function validateCardiovascularLesson(
  title: string,
  sections: CuratedCardiovascularLesson["sections"],
): void {
  if (sections.length !== 10) {
    throw new Error(`${title}: expected 10 sections, got ${sections.length}`);
  }

  const requiredTitles = [
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
  ];

  for (const required of requiredTitles) {
    if (!sections.some((section) => section.sectionTitle === required)) {
      throw new Error(`${title}: missing required section ${required}`);
    }
  }

  for (const section of sections) {
    const paragraphs = section.content.split(/\n{2,}/);
    for (const paragraph of paragraphs) {
      if (paragraph.length > 1200) {
        throw new Error(
          `${title}: section "${section.sectionTitle}" contains a paragraph longer than 1200 characters`,
        );
      }
    }
  }
}
