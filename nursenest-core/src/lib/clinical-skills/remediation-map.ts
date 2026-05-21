/**
 * Lightweight static mapping from weak-area labels (mock exams, analytics copy, onboarding)
 * to clinical skill slugs for the adaptive remediation rail.
 */
const ENTRIES: { match: RegExp; skillSlug: string; missedLabel: string }[] = [
  {
    match: /airway|trach|oxygen|resp/i,
    skillSlug: "trach-care",
    missedLabel: "airway adjuncts and tracheostomy stewardship",
  },
  {
    match: /wound|dressing|skin integrity|pressure/i,
    skillSlug: "sterile-dressing-change",
    missedLabel: "sterile technique during wound care",
  },
  {
    match: /catheter|foley|urinar|elimination/i,
    skillSlug: "foley-catheter-insertion",
    missedLabel: "urinary catheter indications and sterile insertion",
  },
  {
    match: /ng tube|enteral|aspiration/i,
    skillSlug: "ng-tube-placement-check",
    missedLabel: "enteral access verification before medication or feeding",
  },
  {
    match: /med|pharm|injection|dose/i,
    skillSlug: "im-injection",
    missedLabel: "parenteral medication preparation and delivery",
  },
  {
    match: /neuro|loc|stroke|assessment/i,
    skillSlug: "focused-neuro-assessment",
    missedLabel: "focused neurological assessment and escalation cues",
  },
  {
    match: /infection|ppe|sterile field|hand hygiene/i,
    skillSlug: "surgical-hand-scrub",
    missedLabel: "surgical antisepsis and field discipline",
  },
];

export type RemediationSuggestion = {
  missedLabel: string;
  skillSlug: string;
};

export function remediationFromWeakAreaText(text: string | null | undefined): RemediationSuggestion | null {
  if (!text?.trim()) return null;
  for (const e of ENTRIES) {
    if (e.match.test(text)) {
      return { missedLabel: e.missedLabel, skillSlug: e.skillSlug };
    }
  }
  return null;
}
