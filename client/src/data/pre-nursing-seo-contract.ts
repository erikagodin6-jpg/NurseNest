export const PRE_NURSING_ACCESS_MODEL = "free" as const;

export const PRE_NURSING_SEO_CONTRACT = {
  access: "free",
  indexable: true,
  requireNoEntitlementGate: true,
  requireCanonicalSelfLink: true,
  requireUniqueSearchIntentPerLesson: true,
  requireDescriptiveTitle: true,
  requireMetaDescription: true,
  requireSingleH1: true,
  requireSemanticHeadings: true,
  requireFaqWhereNatural: true,
  requireInternalLinks: true,
  requireNextStepLinks: true,
  requireStructuredDataWhereEligible: true,
  requireBeginnerFirstAnswer: true,
  requireOriginalInstructionalContent: true,
  minimumLessonsPerModule: 12,
  minimumQuestionsPerModule: 120,
  minimumEmbeddedChecksPerLesson: 3,
  minimumMasteryQuestionsPerLesson: 10,
} as const;

export const PRE_NURSING_SEO_PILLARS = [
  {
    id: "medical-terminology",
    pillarTitle: "Medical Terminology for Nursing Students",
    primaryIntent: "learn medical terminology before nursing school",
    supportingIntents: [
      "medical prefixes and suffixes nursing",
      "medical terminology practice questions",
      "medical abbreviations nursing students",
      "anatomical directional terms practice",
    ],
  },
  {
    id: "anatomy-physiology",
    pillarTitle: "Anatomy and Physiology for Nursing Students",
    primaryIntent: "anatomy and physiology nursing study guide",
    supportingIntents: [
      "cardiovascular anatomy nursing",
      "respiratory physiology nursing",
      "renal physiology nursing",
      "endocrine system nursing basics",
      "nervous system nursing anatomy",
    ],
  },
  {
    id: "chemistry",
    pillarTitle: "Chemistry for Nursing Students",
    primaryIntent: "chemistry basics for nursing school",
    supportingIntents: [
      "pH acids bases nursing",
      "electrolytes nursing basics",
      "molarity concentration nursing",
      "chemistry practice questions nursing",
    ],
  },
  {
    id: "cell-biology",
    pillarTitle: "Cell Biology for Nursing Students",
    primaryIntent: "cell biology nursing school review",
    supportingIntents: [
      "osmosis diffusion nursing",
      "cell organelles nursing",
      "ATP cellular respiration nursing",
      "cell injury hypoxia nursing",
    ],
  },
  {
    id: "microbiology",
    pillarTitle: "Microbiology for Nursing Students",
    primaryIntent: "microbiology nursing study guide",
    supportingIntents: [
      "bacteria viruses fungi nursing",
      "chain of infection nursing",
      "microbiology practice questions nursing",
      "antibiotic resistance nursing basics",
    ],
  },
  {
    id: "dosage-math",
    pillarTitle: "Nursing Math and Dosage Calculation Foundations",
    primaryIntent: "nursing math practice before nursing school",
    supportingIntents: [
      "dimensional analysis nursing basics",
      "metric conversions nursing",
      "dosage calculation practice questions beginners",
      "fractions decimals ratios nursing math",
    ],
  },
] as const;

export const PRE_NURSING_INTERNAL_LINK_TARGETS = [
  "/pre-nursing",
  "/pathways",
  "/lessons",
  "/pricing",
] as const;

export type PreNursingSeoPillarId = (typeof PRE_NURSING_SEO_PILLARS)[number]["id"];
