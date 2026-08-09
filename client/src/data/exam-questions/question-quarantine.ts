export type QuestionSourceQuarantineEntry = {
  path: string;
  reason: "TEMPLATE_PLACEHOLDER_CONTENT" | "UNSUPPORTED_INTERACTION" | "DUPLICATE_GENERATED_CONTENT" | "CLINICAL_REVIEW_REQUIRED";
  blocksServing: true;
  replacementRequired: boolean;
  replacementIds?: string[];
  note: string;
};

/** Historical source files remain for auditability but MUST NOT serve learners. */
export const QUESTION_SOURCE_QUARANTINE: QuestionSourceQuarantineEntry[] = [
  { path:"client/src/data/exam-questions/rn-advanced-image_based-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-visual-cardiology-001"],note:"Generator-placeholder image content replaced by an authored ECG MCQ." },
  { path:"client/src/data/exam-questions/rn-advanced-image_based-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-visual-cardiology-001"],note:"Duplicate synthetic image expansion removed." },
  { path:"client/src/data/exam-questions/np-advanced-image_based-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-visual-cardiology-001"],note:"Synthetic NP visual content replaced with an authored ECG item." },
  { path:"client/src/data/exam-questions/np-advanced-image_based-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-visual-cardiology-001"],note:"Duplicate synthetic NP visual expansion removed." },
  { path:"client/src/data/exam-questions/rpn-advanced-image_based.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rpn-visual-cardiology-001"],note:"Practical-nursing visual placeholder bank replaced with a scope-appropriate STEMI item." },

  { path:"client/src/data/exam-questions/rn-advanced-highlight-01.ts",reason:"UNSUPPORTED_INTERACTION",blocksServing:true,replacementRequired:false,replacementIds:["rn-highlight-cardiology-001"],note:"Legacy highlight task replaced by certified SATA." },
  { path:"client/src/data/exam-questions/rn-advanced-highlight-02.ts",reason:"UNSUPPORTED_INTERACTION",blocksServing:true,replacementRequired:false,replacementIds:["rn-highlight-cardiology-001"],note:"Duplicate highlight expansion removed." },
  { path:"client/src/data/exam-questions/np-advanced-highlight-01.ts",reason:"UNSUPPORTED_INTERACTION",blocksServing:true,replacementRequired:false,replacementIds:["np-highlight-cardiology-001"],note:"Legacy NP highlight task replaced by canonical SATA." },
  { path:"client/src/data/exam-questions/np-advanced-highlight-02.ts",reason:"UNSUPPORTED_INTERACTION",blocksServing:true,replacementRequired:false,replacementIds:["np-highlight-cardiology-001"],note:"Duplicate NP highlight expansion removed." },
  { path:"client/src/data/exam-questions/rpn-advanced-highlight.ts",reason:"UNSUPPORTED_INTERACTION",blocksServing:true,replacementRequired:false,replacementIds:["rpn-highlight-cardiology-001"],note:"Legacy practical-nursing highlight task replaced by canonical SATA." },

  { path:"client/src/data/exam-questions/rn-advanced-matrix-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-matrix-adhf-001"],note:"Synthetic cardiology matrix contained generic/incoherent rows; replaced with authored acute-heart-failure matrix." },
  { path:"client/src/data/exam-questions/rn-advanced-matrix-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-matrix-adhf-001"],note:"Duplicate synthetic matrix expansion removed." },
  { path:"client/src/data/exam-questions/rn-advanced-bowtie-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-bowtie-tamponade-001"],note:"Synthetic bow-ties reused MI findings/actions across incompatible diagnoses; replaced with authored tamponade bow-tie." },
  { path:"client/src/data/exam-questions/rn-advanced-bowtie-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-bowtie-tamponade-001"],note:"Duplicate/incoherent bow-tie expansion removed." },
  { path:"client/src/data/exam-questions/rn-advanced-bowtie-03.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rn-bowtie-tamponade-001"],note:"Duplicate/incoherent bow-tie expansion removed." },

  { path:"client/src/data/exam-questions/np-advanced-matrix-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-matrix-hf-phenotype-001"],note:"Synthetic NP matrix replaced by authored heart-failure-phenotype matrix." },
  { path:"client/src/data/exam-questions/np-advanced-matrix-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-matrix-hf-phenotype-001"],note:"Duplicate synthetic NP matrix expansion removed." },
  { path:"client/src/data/exam-questions/np-advanced-bowtie-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-bowtie-aortic-dissection-001"],note:"Synthetic NP bow-ties reused diagnosis-inappropriate findings/actions; replaced by authored acute-aortic-syndrome bow-tie." },
  { path:"client/src/data/exam-questions/np-advanced-bowtie-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-bowtie-aortic-dissection-001"],note:"Duplicate/incoherent NP bow-tie expansion removed." },
  { path:"client/src/data/exam-questions/np-advanced-bowtie-03.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["np-bowtie-aortic-dissection-001"],note:"Duplicate/incoherent NP bow-tie expansion removed." },

  { path:"client/src/data/exam-questions/rpn-advanced-matrix.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rpn-matrix-hf-001"],note:"Synthetic practical-nursing matrix replaced by authored heart-failure nursing-care matrix." },
  { path:"client/src/data/exam-questions/rpn-advanced-bowtie-01.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rpn-bowtie-digoxin-001"],note:"Synthetic practical-nursing bow-tie replaced by authored digoxin-toxicity bow-tie." },
  { path:"client/src/data/exam-questions/rpn-advanced-bowtie-02.ts",reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,replacementRequired:false,replacementIds:["rpn-bowtie-digoxin-001"],note:"Duplicate/incoherent practical-nursing bow-tie expansion removed." },
];

export const QUESTION_SOURCE_QUARANTINE_PATHS = new Set(QUESTION_SOURCE_QUARANTINE.map(entry => entry.path));
