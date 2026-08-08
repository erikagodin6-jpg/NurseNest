export const RN_QBANK_MINIMUM_PER_REGION = 1200 as const;

export const RN_CANONICAL_SYSTEMS = [
  "Respiratory",
  "Cardiovascular",
  "Neurological",
  "Renal & Urinary",
  "Endocrine & Metabolic",
  "Gastrointestinal & Hepatic",
  "Hematology & Immunology",
  "Musculoskeletal & Integumentary",
  "Maternal & Newborn",
  "Pediatrics",
  "Mental Health",
  "Infectious Disease & Infection Control",
  "Oncology",
  "Pharmacology",
  "Fundamentals & Basic Care",
  "Leadership & Management",
  "Community & Public Health",
  "Critical Care & Emergency",
] as const;

export type RnCanonicalSystem = (typeof RN_CANONICAL_SYSTEMS)[number];

export const RN_CLIENT_NEEDS_CATEGORIES = [
  "Safe & Effective Care Environment",
  "Health Promotion & Maintenance",
  "Psychosocial Integrity",
  "Physiological Integrity",
] as const;

export type RnClientNeedsCategory = (typeof RN_CLIENT_NEEDS_CATEGORIES)[number];

const clean = (value: string | null | undefined) =>
  (value ?? "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();

const systemAliases: Array<[RnCanonicalSystem, RegExp]> = [
  ["Respiratory", /\b(respir|pulmon|airway|ventilat|thorac|pleur|lung)\b/],
  ["Cardiovascular", /\b(cardio|cardiac|heart|vascular|circulat|coronary|arrhythm|hemodynamic)\b/],
  ["Neurological", /\b(neuro|neurolog|brain|stroke|seizure|spinal|cerebr|mening|parkinson|multiple sclerosis)\b/],
  ["Renal & Urinary", /\b(renal|kidney|nephro|urinar|urolog|dialysis|bladder|glomerul)\b/],
  ["Endocrine & Metabolic", /\b(endocr|diabet|thyroid|adrenal|pituitar|parathyroid|metabolic)\b/],
  ["Gastrointestinal & Hepatic", /\b(gastro|intestinal|digest|hepatic|liver|pancrea|biliary|bowel|colorectal|gi )\b/],
  ["Hematology & Immunology", /\b(hemat|haemat|blood disorder|coag|anemia|anaemia|immune|immunolog|transfusion)\b/],
  ["Musculoskeletal & Integumentary", /\b(musculoskel|orthop|bone|joint|fracture|skin|integument|wound|burn|dermat)\b/],
  ["Maternal & Newborn", /\b(maternal|maternity|obstet|pregnan|intrapart|postpartum|newborn|neonat)\b/],
  ["Pediatrics", /\b(pediatr|paediatr|child|infant|adolesc)\b/],
  ["Mental Health", /\b(mental health|psychiatr|psychosocial|behavioral health|behavioural health|suicide|substance use)\b/],
  ["Infectious Disease & Infection Control", /\b(infect|infection control|communicable|isolation|sepsis prevention|antimicrobial stewardship)\b/],
  ["Oncology", /\b(oncol|cancer|tumou?r|chemotherapy|radiation|malignan)\b/],
  ["Pharmacology", /\b(pharmacol|medication|drug therapy|parenteral therap|high alert)\b/],
  ["Fundamentals & Basic Care", /\b(fundamental|basic care|comfort|hygiene|mobility|elimination|nutrition|patient safety)\b/],
  ["Leadership & Management", /\b(leadership|management of care|delegat|assignment|staffing|quality improvement|care coordination)\b/],
  ["Community & Public Health", /\b(community|public health|population health|epidemiol|disaster|home health|school health|occupational health)\b/],
  ["Critical Care & Emergency", /\b(critical care|emergency|icu|trauma|resuscitation|shock|toxicology)\b/],
];

export function normalizeRnSystem(bodySystem: string | null, topic: string | null): RnCanonicalSystem | null {
  const body = clean(bodySystem);
  const topicText = clean(topic);
  // Prefer the authored body-system label. Only fall back to topic when the body-system is missing/generic.
  const bodyIsGeneric = !body || /^(medical surgical|med surg|physiological integrity|nursing|general|other)$/.test(body);
  const candidates = bodyIsGeneric ? [topicText] : [body, `${body} ${topicText}`];
  for (const candidate of candidates) {
    for (const [system, pattern] of systemAliases) if (pattern.test(candidate)) return system;
  }
  return null;
}

export function normalizeRnClientNeedsCategory(domain: string | null): RnClientNeedsCategory | null {
  const d = clean(domain);
  if (!d) return null;
  if (/management of care|safety and infection control|safe and effective care/.test(d)) return "Safe & Effective Care Environment";
  if (/health promotion|maintenance/.test(d)) return "Health Promotion & Maintenance";
  if (/psychosocial|mental health/.test(d)) return "Psychosocial Integrity";
  if (/physiological integrity|basic care|comfort|pharmacological|parenteral|reduction of risk|physiological adaptation/.test(d)) return "Physiological Integrity";
  return null;
}
