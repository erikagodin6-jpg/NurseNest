import {
  cardiovascularRnExpectedTitles,
  cardiovascularRnLessons,
} from "./cardiovascular-rn";
import type {
  CuratedCardiovascularLesson,
  CuratedCardiovascularSection,
} from "./cardiovascular-rn-types";

export type CardiovascularTier = "rn" | "rpn" | "np";
export type CardiovascularRegion = "CA" | "US" | "BOTH";

export interface ScopedCardiovascularLesson extends CuratedCardiovascularLesson {
  tier: CardiovascularTier;
  region: CardiovascularRegion;
}

const section = (
  lesson: CuratedCardiovascularLesson,
  title: string,
): CuratedCardiovascularSection => {
  const match = lesson.sections.find((candidate) => candidate.sectionTitle === title);
  if (!match) throw new Error(`${lesson.title}: missing section ${title}`);
  return match;
};

function prepend(content: string, lead: string): string {
  return `${lead}\n\n${content}`;
}

function append(content: string, tail: string): string {
  return `${content}\n\n${tail}`;
}

function scopeRpn(base: CuratedCardiovascularLesson): CuratedCardiovascularSection[] {
  return base.sections.map((current) => {
    if (current.sectionTitle === "Diagnostics") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Focus on recognizing why each test matters, preparing the patient safely, collecting/monitoring ordered studies, identifying critical changes, and escalating abnormal findings promptly.",
        ),
      };
    }
    if (current.sectionTitle === "Management") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Know the treatment goal and the bedside consequence. Prioritize ordered interventions, reassessment, medication safety, response-to-treatment monitoring, and timely escalation when the patient is deteriorating.",
        ),
      };
    }
    if (current.sectionTitle === "Medication and Safety") {
      return {
        ...current,
        content: prepend(
          current.content,
          "For every cardiovascular medication, know the indication, required pre-assessment, major adverse effects, monitoring, and the finding that means hold/clarify/escalate according to the order and local policy.",
        ),
      };
    }
    if (current.sectionTitle === "Priority Nursing Actions") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Sequence bedside care as: assess stability → address immediate threats → perform authorized/ordered interventions → reassess → report/escalate meaningful deterioration.",
        ),
      };
    }
    if (current.sectionTitle === "Clinical Judgment") {
      return {
        ...current,
        content: append(
          current.content,
          "Use the scenario to decide what change must be recognized first, what immediate nursing action is safe now, what requires an order or higher-level intervention, and what finding must be reported urgently.",
        ),
      };
    }
    return { ...current };
  });
}

function scopeNp(base: CuratedCardiovascularLesson): CuratedCardiovascularSection[] {
  return base.sections.map((current) => {
    if (current.sectionTitle === "Assessment Pattern") {
      return {
        ...current,
        content: append(
          current.content,
          "At advanced-practice depth, separate the leading diagnosis from dangerous mimics and use history, physical findings, comorbidity burden, medication exposure, and trajectory to refine pre-test probability.",
        ),
      };
    }
    if (current.sectionTitle === "Diagnostics") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Choose testing to answer a clinical question: confirm or exclude time-sensitive disease, define severity/hemodynamic impact, identify a precipitant, and establish a safe treatment baseline. Interpret results in context rather than as isolated cut-offs.",
        ),
      };
    }
    if (current.sectionTitle === "Management") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Build a management plan from acuity and risk: stabilize immediate threats, select evidence-based pharmacologic/non-pharmacologic therapy, address contraindications and comorbidities, define follow-up, and refer/escalate when specialty or emergency care is required.",
        ),
      };
    }
    if (current.sectionTitle === "Medication and Safety") {
      return {
        ...current,
        content: prepend(
          current.content,
          "Prescribing decisions require indication, expected benefit, dose/route, renal/hepatic considerations, interactions, pregnancy potential when relevant, monitoring, duration, adherence, and a clear stop/escalation plan.",
        ),
      };
    }
    if (current.sectionTitle === "Priority Nursing Actions") {
      return {
        ...current,
        sectionTitle: "Priority Clinical Decisions",
        content: prepend(
          current.content,
          "Sequence decisions as: stability → dangerous differential → targeted diagnostics → treatment → disposition/referral → reassessment and follow-up.",
        ),
      };
    }
    if (current.sectionTitle === "Clinical Judgment") {
      return {
        ...current,
        content: append(
          current.content,
          "At advanced-practice depth, state the leading diagnosis and dangerous alternatives, the next diagnostic step, the initial treatment choice, and the threshold for emergency transfer or specialist involvement.",
        ),
      };
    }
    return { ...current };
  });
}

function regionalize(
  sections: CuratedCardiovascularSection[],
  _region: CardiovascularRegion,
): CuratedCardiovascularSection[] {
  // Keep country/exam boilerplate out of the learner body. Region is carried in
  // metadata/versioning so CA_ONLY and US_ONLY rows can use jurisdiction-specific
  // source review without duplicating generic "country context" prose.
  return sections.map((current) => ({ ...current }));
}

export function buildScopedCardiovascularLesson(
  base: CuratedCardiovascularLesson,
  tier: CardiovascularTier,
  region: CardiovascularRegion,
): ScopedCardiovascularLesson {
  const tierSections =
    tier === "rpn" ? scopeRpn(base) : tier === "np" ? scopeNp(base) : base.sections.map((s) => ({ ...s }));
  const sections = regionalize(tierSections, region);

  const fullTitles = sections.map((item) => item.sectionTitle);
  const requiredCommon = [
    "Bottom Line",
    "What Is Happening",
    "Assessment Pattern",
    "Diagnostics",
    "Management",
    "Medication and Safety",
    tier === "np" ? "Priority Clinical Decisions" : "Priority Nursing Actions",
    "Red Flags: Escalate",
    "NCLEX Traps",
    "Clinical Judgment",
  ];
  if (fullTitles.join("|") !== requiredCommon.join("|")) {
    throw new Error(`${base.title}: invalid ${tier}/${region} cardiovascular lesson flow`);
  }

  const cram = sections.filter((item) => item.cramTitle && item.cramContent);
  if (cram.length !== 6) {
    throw new Error(`${base.title}: ${tier}/${region} expected 6 Cram sections, got ${cram.length}`);
  }

  const scopeSuffix = `${tier}-${region.toLowerCase()}`;
  return {
    title: base.title,
    summary: base.summary,
    tier,
    region,
    versionKey: base.versionKey.replace("rn-cardiovascular-", `${scopeSuffix}-cardiovascular-`),
    sections,
  };
}

export const cardiovascularScopedLessons = Object.fromEntries(
  cardiovascularRnExpectedTitles.map((title) => {
    const base = cardiovascularRnLessons[title as keyof typeof cardiovascularRnLessons];
    return [
      title,
      {
        rn: {
          CA: buildScopedCardiovascularLesson(base, "rn", "CA"),
          US: buildScopedCardiovascularLesson(base, "rn", "US"),
          BOTH: buildScopedCardiovascularLesson(base, "rn", "BOTH"),
        },
        rpn: {
          CA: buildScopedCardiovascularLesson(base, "rpn", "CA"),
          US: buildScopedCardiovascularLesson(base, "rpn", "US"),
          BOTH: buildScopedCardiovascularLesson(base, "rpn", "BOTH"),
        },
        np: {
          CA: buildScopedCardiovascularLesson(base, "np", "CA"),
          US: buildScopedCardiovascularLesson(base, "np", "US"),
          BOTH: buildScopedCardiovascularLesson(base, "np", "BOTH"),
        },
      },
    ];
  }),
) as Record<
  string,
  Record<CardiovascularTier, Record<CardiovascularRegion, ScopedCardiovascularLesson>>
>;

// Evaluate one representative from every profile at module load so profile-flow
// regressions fail immediately instead of surfacing during a production rewrite.
const representative = cardiovascularRnLessons[cardiovascularRnExpectedTitles[0] as keyof typeof cardiovascularRnLessons];
for (const tier of ["rn", "rpn", "np"] as const) {
  for (const region of ["CA", "US", "BOTH"] as const) {
    buildScopedCardiovascularLesson(representative, tier, region);
  }
}

// Ensure all expected titles exist in the base registry before any scoped rewrite.
for (const title of cardiovascularRnExpectedTitles) {
  if (!cardiovascularRnLessons[title as keyof typeof cardiovascularRnLessons]) {
    throw new Error(`CARDIOVASCULAR_BASE_LESSON_MISSING: ${title}`);
  }
  section(cardiovascularRnLessons[title as keyof typeof cardiovascularRnLessons], "Bottom Line");
}
