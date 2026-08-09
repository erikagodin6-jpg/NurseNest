import type { CuratedCardiovascularSection } from "./cardiovascular-rn-types";

/**
 * U.S. practical-nursing Cram authoring layer.
 *
 * This is deliberately a content layer rather than a display label. The
 * disease-specific facts remain sourced from the curated cardiovascular
 * lesson, while the exam lens is rewritten for entry-level LPN/VN practice:
 * recognize cues, collect focused data, carry out authorized/ordered care,
 * administer/monitor medications safely, reassess, and escalate changes.
 *
 * Scope note: U.S. practical-nurse authority varies by jurisdiction and
 * employer policy. Learner-facing language therefore avoids implying
 * independent diagnosis, prescribing, or a universal procedure scope.
 *
 * Exam contract: 2026 NCLEX-PN Test Plan, effective April 2026.
 */

export const PN_US_CRAM_LEAD_BY_TITLE: Record<string, string> = {
  "Recognize It Fast":
    "**PN exam lens:** Recognize the pattern quickly, compare it with the patient's baseline, collect the focused findings that show stability versus deterioration, and report a meaningful change promptly.",
  "Must-Know Diagnostics":
    "**What you need to know:** Connect each ordered test to the problem it is checking. Prepare or collect the study safely when within role, verify results that affect immediate care, trend changes, and report critical or unexpected findings. Do not turn a diagnostic result into an independent medical diagnosis.",
  "First Priorities":
    "**PN priority sequence:** Assess immediate stability → address a life threat with authorized emergency nursing actions → carry out time-sensitive orders/protocols within scope → reassess the response → report or escalate deterioration. Do not delay urgent escalation for routine documentation or lower-priority tasks.",
  "Medication Safety":
    "**Medication lens:** Know why the medication is being given, the focused assessment and relevant labs needed before administration, major adverse effects, what to monitor after the dose, and the finding that means stop and clarify or escalate according to the order, state law, and facility policy.",
  "Red Flags":
    "**Escalate these findings:** Reassess the patient, obtain the focused vital signs/monitor data that can be gathered without delaying care, use the appropriate chain of command or emergency-response process, and stay with an unstable patient while help is activated.",
  "Exam Traps":
    "**NCLEX-PN scope check:** Favor the safest action the LPN/VN can take now—recognize, verify, intervene within scope, reassess, reinforce teaching, and report/escalate. Do not choose independent prescribing, medical diagnosis, or management decisions that require a higher-level provider unless the item explicitly places that action within the nurse's authorized role.",
};

function addPnUsCramLead(section: CuratedCardiovascularSection): CuratedCardiovascularSection {
  if (!section.cramTitle || !section.cramContent) return { ...section };

  const lead = PN_US_CRAM_LEAD_BY_TITLE[section.cramTitle];
  if (!lead) {
    throw new Error(`PN_US_CARDIOVASCULAR_CRAM_TITLE_UNSUPPORTED: ${section.cramTitle}`);
  }

  return {
    ...section,
    cramContent: `${lead}\n\n${section.cramContent}`,
  };
}

export function authorUsPnCardiovascularCram(
  sections: CuratedCardiovascularSection[],
): CuratedCardiovascularSection[] {
  const authored = sections.map(addPnUsCramLead);
  const projected = authored.filter(
    (section) => section.cramTitle && section.cramContent && typeof section.cramOrder === "number",
  );

  if (projected.length !== 6) {
    throw new Error(`PN_US_CARDIOVASCULAR_CRAM_COUNT_INVALID: ${projected.length}`);
  }

  for (const section of projected) {
    const expectedLead = PN_US_CRAM_LEAD_BY_TITLE[section.cramTitle!];
    if (!section.cramContent!.startsWith(expectedLead)) {
      throw new Error(`PN_US_CARDIOVASCULAR_CRAM_NOT_AUTHORED: ${section.cramTitle}`);
    }
  }

  return authored;
}

export const PN_US_CARDIOVASCULAR_CRAM_CONTRACT = {
  exam: "NCLEX-PN",
  effective: "2026-04",
  audience: "US_LPN_LVN",
  principles: [
    "recognize-and-report-change",
    "focused-data-collection",
    "authorized-ordered-intervention",
    "medication-administration-and-monitoring",
    "reassessment",
    "timely-escalation",
    "no-implied-independent-diagnosis-or-prescribing",
  ],
} as const;
