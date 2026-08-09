export type QuestionSourceQuarantineEntry = {
  path: string;
  reason: "TEMPLATE_PLACEHOLDER_CONTENT" | "UNSUPPORTED_INTERACTION" | "DUPLICATE_GENERATED_CONTENT" | "CLINICAL_REVIEW_REQUIRED";
  blocksServing: true;
  replacementRequired: boolean;
  note: string;
};

/**
 * Historical source files may remain in-repo for auditability, but anything listed
 * here MUST NOT be included in learner pools or completion counts. ReplacementRequired
 * entries remain content debt until an authored replacement bank is available.
 */
export const QUESTION_SOURCE_QUARANTINE: QuestionSourceQuarantineEntry[] = [
  {
    path: "client/src/data/exam-questions/rn-advanced-image_based-01.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: true,
    note: "Contains generator placeholders such as Primary Cardiology diagnosis / differential 1 rather than clinically plausible answer choices.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-image_based-02.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: true,
    note: "Synthetic image-based expansion requires clinical re-authoring into canonical MCQ items with meaningful image context and distractors.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-image_based-01.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: true,
    note: "Synthetic image-based expansion requires NP-level clinical re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-image_based-02.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: true,
    note: "Synthetic image-based expansion requires NP-level clinical re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/rpn-advanced-image_based.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: true,
    note: "Synthetic image-based expansion requires practical-nursing-scope clinical re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-highlight-01.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: true,
    note: "Legacy highlight interaction is outside the certified renderer set and uses repeated generic cardiology passages; replace with authored SATA/Chart Review items.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-highlight-02.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: true,
    note: "Legacy highlight interaction requires canonical SATA/Chart Review re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-highlight-01.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: true,
    note: "Legacy highlight interaction requires canonical NP-level SATA/Chart Review re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-highlight-02.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: true,
    note: "Legacy highlight interaction requires canonical NP-level SATA/Chart Review re-authoring.",
  },
  {
    path: "client/src/data/exam-questions/rpn-advanced-highlight.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: true,
    note: "Legacy highlight interaction requires canonical practical-nursing SATA/Chart Review re-authoring.",
  },
];

export const QUESTION_SOURCE_QUARANTINE_PATHS = new Set(QUESTION_SOURCE_QUARANTINE.map(entry => entry.path));
