import type { ClinicalPathwayTag, ClinicalSkillCategory, ClinicalSkillDefinition } from "./types";

export const CLINICAL_SKILL_CATEGORIES: ClinicalSkillCategory[] = [
  {
    id: "infection_control",
    title: "Infection control",
    description: "Hand hygiene, PPE, and sterile technique foundations.",
  },
  {
    id: "medication_administration",
    title: "Medication administration",
    description: "Safe preparation, rights checks, and procedural delivery.",
  },
  {
    id: "airway",
    title: "Airway & oxygenation",
    description: "Patency, humidification, and tracheostomy stewardship.",
  },
  {
    id: "elimination",
    title: "Elimination",
    description: "Catheter care, drainage systems, and enteral access checks.",
  },
  {
    id: "wound_care",
    title: "Wound care",
    description: "Assessment, dressing selection, and documentation cues.",
  },
  {
    id: "assessment",
    title: "Assessment",
    description: "Structured head-to-toe and focused reassessment patterns.",
  },
];

export const CLINICAL_SKILLS: ClinicalSkillDefinition[] = [
  {
    slug: "sterile-dressing-change",
    title: "Sterile dressing change",
    categoryId: "wound_care",
    summary: "Maintain a sterile field while minimizing tissue trauma and contamination risk.",
    minutesEstimate: 22,
    difficulty: 2,
    pathwayTags: ["RN_US", "RPN_CA", "NP", "NEW_GRAD"],
    milestones: [
      { label: "Prep & positioning", percent: 25 },
      { label: "Field + technique", percent: 55 },
      { label: "Secure + teach-back", percent: 100 },
    ],
    steps: [
      {
        id: "1",
        title: "Gather supplies & explain",
        detail: "Confirm orders, allergies, and pain plan; arrange a waste-neutral workflow.",
      },
      {
        id: "2",
        title: "Hand hygiene & PPE",
        detail: "Perform hand hygiene; don clean gloves for removal, sterile gloves for placement when indicated.",
      },
      {
        id: "3",
        title: "Remove soiled dressing",
        detail: "Loosen toward the wound; observe drainage, odor, and periwound skin without contaminating the bed.",
      },
      {
        id: "4",
        title: "Cleanse & assess",
        detail: "Clean from least to most contaminated; measure and photograph per protocol.",
      },
      {
        id: "5",
        title: "Apply sterile dressing",
        detail: "Maintain sterile-to-sterile contact; secure without circumferential tension on limbs.",
      },
    ],
  },
  {
    slug: "im-injection",
    title: "Intramuscular injection",
    categoryId: "medication_administration",
    summary: "Landmark, needle angle, and post-injection safety checks for IM delivery.",
    minutesEstimate: 15,
    difficulty: 1,
    pathwayTags: ["RN_US", "RPN_CA", "NEW_GRAD"],
    milestones: [
      { label: "Rights + drawing", percent: 35 },
      { label: "Site + delivery", percent: 75 },
      { label: "Documentation", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Six rights + allergy screen", detail: "Verify MAR/eMAR, expiry, and dilution requirements." },
      { id: "2", title: "Site selection", detail: "Ventrogluteal preferred when volume allows; alternate sites per policy." },
      { id: "3", title: "Needle length & angle", detail: "Use Z-track when required; aspirate only if policy directs." },
      { id: "4", title: "Post-delivery", detail: "Apply gentle pressure; observe for immediate reaction; sharps safety." },
    ],
  },
  {
    slug: "foley-catheter-insertion",
    title: "Urinary catheterization (indwelling)",
    categoryId: "elimination",
    summary: "Aseptic insertion with sterile lubrication and post-procedure verification.",
    minutesEstimate: 28,
    difficulty: 2,
    pathwayTags: ["RN_US", "RPN_CA", "NP", "NEW_GRAD"],
    milestones: [
      { label: "Consent & prep", percent: 30 },
      { label: "Insertion", percent: 70 },
      { label: "Secure + orders", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Indications & alternatives", detail: "Confirm order; consider timed voiding or external devices when appropriate." },
      { id: "2", title: "Sterile setup", detail: "Perineal prep per protocol; maintain catheter sterility until insertion begins." },
      { id: "3", title: "Insertion to flow", detail: "Advance to urine return; inflate balloon only after confirmation in bladder." },
      { id: "4", title: "Secure & drainage", detail: "Dependent drainage; label tubing/date; patient education on mobility and intake." },
    ],
  },
  {
    slug: "trach-care",
    title: "Tracheostomy inner cannula care",
    categoryId: "airway",
    summary: "Humidity, suction readiness, and stoma skin checks for airway patency.",
    minutesEstimate: 20,
    difficulty: 2,
    pathwayTags: ["RN_US", "NP", "NEW_GRAD"],
    npAdvanced: true,
    milestones: [
      { label: "Assessment", percent: 30 },
      { label: "Procedure", percent: 70 },
      { label: "Safety closure", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Pre-oxygenation if indicated", detail: "Follow RT/nursing protocol; keep spare tube and obturator at bedside." },
      { id: "2", title: "Inner cannula handling", detail: "Clean or replace per policy; inspect for crusting or cracks." },
      { id: "3", title: "Stoma & ties", detail: "Assess skin; secure ties with two-finger slack; pad under plate as needed." },
      { id: "4", title: "Escalation cues", detail: "Document distress, increased work of breathing, or bleeding for rapid escalation." },
    ],
  },
  {
    slug: "ng-tube-placement-check",
    title: "NG tube placement verification",
    categoryId: "elimination",
    summary: "Multi-modal confirmation cues before enteral use (policy-aligned).",
    minutesEstimate: 18,
    difficulty: 3,
    pathwayTags: ["RN_US", "RPN_CA", "NP", "NEW_GRAD"],
    milestones: [
      { label: "Baseline checks", percent: 40 },
      { label: "Confirmation bundle", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Mark & measure", detail: "Note insertion depth at nares; compare to placement order and prior films if available." },
      { id: "2", title: "pH / aspirate per protocol", detail: "Use enteral-specific pH thresholds; avoid interpreting air insufflation alone." },
      { id: "3", title: "Radiograph when required", detail: "Hold feeds/meds until radiology confirms tip position in stomach or post-pyloric route." },
    ],
  },
  {
    slug: "wound-irrigation",
    title: "Wound irrigation & packing basics",
    categoryId: "wound_care",
    summary: "Pressure-safe irrigation with splash protection and cavity assessment.",
    minutesEstimate: 24,
    difficulty: 2,
    pathwayTags: ["RN_US", "RPN_CA", "NEW_GRAD"],
    milestones: [
      { label: "Setup", percent: 25 },
      { label: "Irrigation", percent: 70 },
      { label: "Dress + document", percent: 100 },
    ],
    steps: [
      { id: "1", title: "PPE & splash kit", detail: "Eye protection + waterproof drape; consider suction canister for large volumes." },
      { id: "2", title: "Technique", detail: "Angle stream across cavity; avoid forceful deep packing without visibility." },
      { id: "3", title: "Reassess tissue", detail: "Note granulation, slough, tunneling; photograph per policy." },
    ],
  },
  {
    slug: "focused-neuro-assessment",
    title: "Focused neurological assessment",
    categoryId: "assessment",
    summary: "LOC, pupils, motor strength, and speech pattern for rapid trending.",
    minutesEstimate: 16,
    difficulty: 2,
    pathwayTags: ["RN_US", "NP", "NEW_GRAD"],
    npAdvanced: true,
    milestones: [
      { label: "Screening", percent: 40 },
      { label: "Targeted exam", percent: 100 },
    ],
    steps: [
      { id: "1", title: "LOC & orientation", detail: "Use consistent scale (GCS components or institution tool)." },
      { id: "2", title: "Pupils & cranial cues", detail: "Size, shape, reactivity; facial symmetry and speech clarity." },
      { id: "3", title: "Motor & sensation spot-check", detail: "Compare sides; note drift, pronator sign, or focal weakness." },
    ],
  },
  {
    slug: "head-to-toe-snapshot",
    title: "Head-to-toe snapshot (admission)",
    categoryId: "assessment",
    summary: "Systems-based sweep that preserves safety and patient dignity.",
    minutesEstimate: 35,
    difficulty: 1,
    pathwayTags: ["RN_US", "RPN_CA", "NEW_GRAD"],
    milestones: [
      { label: "Airway → circulation", percent: 35 },
      { label: "Systems pass", percent: 80 },
      { label: "Teach-back", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Intro & environment", detail: "Privacy, interpreter access, fall precautions, and allergy band verification." },
      { id: "2", title: "Vitals + pain", detail: "Trend baseline; screen for red-flag symptoms before deep history." },
      { id: "3", title: "Systems review cadence", detail: "Cardio → pulm → GI/GU → MSK/skin → neuro → psychosocial." },
    ],
  },
  {
    slug: "surgical-hand-scrub",
    title: "Surgical hand scrub / antiseptic prep",
    categoryId: "infection_control",
    summary: "Timed brushless or brush-based scrub per perioperative policy.",
    minutesEstimate: 12,
    difficulty: 1,
    pathwayTags: ["RN_US", "RPN_CA", "NEW_GRAD"],
    milestones: [
      { label: "Remove debris", percent: 40 },
      { label: "Antiseptic pass", percent: 100 },
    ],
    steps: [
      { id: "1", title: "Nail & subungual clean", detail: "Pick debris; keep hands above elbows once wet." },
      { id: "2", title: "Friction passes", detail: "Follow timed strokes from fingertips to forearms per formulary." },
      { id: "3", title: "Dry & enter field", detail: "Back-first towel technique; avoid re-contamination at the door." },
    ],
  },
];

export function getSkillBySlug(slug: string): ClinicalSkillDefinition | undefined {
  return CLINICAL_SKILLS.find((s) => s.slug === slug);
}

/** Maps marketing `examTarget` query (uppercase) to pathway tag for filtering. */
export function examTargetToPathwayTag(examTarget: string | null | undefined): ClinicalPathwayTag | null {
  if (!examTarget) return null;
  const u = examTarget.toUpperCase();
  if (u === "NCLEX_RN") return "RN_US";
  if (u === "REX_PN") return "RPN_CA";
  if (u === "NP") return "NP";
  if (u === "NEW_GRAD") return "NEW_GRAD";
  return null;
}

export function skillsForPathwayTag(tag: ClinicalPathwayTag | null, npAudience: boolean): ClinicalSkillDefinition[] {
  const base = tag
    ? CLINICAL_SKILLS.filter((s) => s.pathwayTags.includes(tag))
    : CLINICAL_SKILLS;

  if (npAudience) {
    return [...base].sort((a, b) => Number(!!b.npAdvanced) - Number(!!a.npAdvanced));
  }
  return base;
}

export function groupSkillsByCategory(
  skills: ClinicalSkillDefinition[],
): Map<ClinicalSkillCategory["id"], ClinicalSkillDefinition[]> {
  const map = new Map<ClinicalSkillCategory["id"], ClinicalSkillDefinition[]>();
  for (const c of CLINICAL_SKILL_CATEGORIES) {
    map.set(c.id, []);
  }
  for (const s of skills) {
    map.get(s.categoryId)?.push(s);
  }
  return map;
}
