export type QuestionSourceQuarantineEntry = {
  path: string;
  reason: "TEMPLATE_PLACEHOLDER_CONTENT" | "UNSUPPORTED_INTERACTION" | "DUPLICATE_GENERATED_CONTENT" | "CLINICAL_REVIEW_REQUIRED";
  blocksServing: true;
  replacementRequired: boolean;
  replacementIds?: string[];
  note: string;
};

/**
 * Historical source files may remain in-repo for auditability, but anything listed
 * here MUST NOT be included in learner pools or completion counts. A quarantine entry
 * is not considered resolved until replacementRequired=false and replacementIds names
 * the authored canonical item(s) that preserve the learner objective.
 */
export const QUESTION_SOURCE_QUARANTINE: QuestionSourceQuarantineEntry[] = [
  {
    path: "client/src/data/exam-questions/rn-advanced-image_based-01.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rn-visual-cardiology-001"],
    note: "Generator-placeholder image content replaced by an authored ECG MCQ on inferior STEMI/right-ventricular involvement.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-image_based-02.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rn-visual-cardiology-001"],
    note: "Duplicate synthetic image expansion removed; unique learner objective preserved by canonical visual replacement.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-image_based-01.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["np-visual-cardiology-001"],
    note: "Synthetic NP visual content replaced with an authored ECG localization/right-ventricular infarction item.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-image_based-02.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["np-visual-cardiology-001"],
    note: "Duplicate synthetic NP visual expansion removed; canonical replacement preserves the objective.",
  },
  {
    path: "client/src/data/exam-questions/rpn-advanced-image_based.ts",
    reason: "TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rpn-visual-cardiology-001"],
    note: "Practical-nursing visual placeholder bank replaced with a scope-appropriate authored STEMI recognition/escalation MCQ.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-highlight-01.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rn-highlight-cardiology-001"],
    note: "Legacy highlight interaction converted to a certified SATA decision task with clinically specific cardiogenic-shock findings.",
  },
  {
    path: "client/src/data/exam-questions/rn-advanced-highlight-02.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rn-highlight-cardiology-001"],
    note: "Duplicate highlight expansion removed; canonical SATA replacement preserves the unique learner objective.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-highlight-01.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["np-highlight-cardiology-001"],
    note: "Legacy NP highlight task replaced by a canonical SATA item on post-MI mechanical complications.",
  },
  {
    path: "client/src/data/exam-questions/np-advanced-highlight-02.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["np-highlight-cardiology-001"],
    note: "Duplicate highlight expansion removed; canonical NP SATA replacement preserves the objective.",
  },
  {
    path: "client/src/data/exam-questions/rpn-advanced-highlight.ts",
    reason: "UNSUPPORTED_INTERACTION",
    blocksServing: true,
    replacementRequired: false,
    replacementIds: ["rpn-highlight-cardiology-001"],
    note: "Legacy practical-nursing highlight task replaced by a certified SATA cardiogenic-shock recognition item.",
  },
];

export const QUESTION_SOURCE_QUARANTINE_PATHS = new Set(QUESTION_SOURCE_QUARANTINE.map(entry => entry.path));
