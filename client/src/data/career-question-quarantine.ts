export type CareerQuestionQuarantineEntry={
  career:string;
  legacyPath:string;
  replacementPaths:string[];
  reason:"TEMPLATE_PLACEHOLDER_CONTENT"|"CLINICAL_REVIEW_REQUIRED"|"DUPLICATE_GENERATED_CONTENT";
  blocksServing:true;
  requireTopicParity:boolean;
  note:string;
};

export const CAREER_QUESTION_QUARANTINE:CareerQuestionQuarantineEntry[]=[
  {
    career:"paramedic",
    legacyPath:"client/src/data/career-questions/paramedic-questions.ts",
    replacementPaths:[
      "client/src/data/career-questions/paramedic-v2-questions.ts",
      "client/src/data/career-questions/paramedic-v2-trauma-batch02-questions.ts",
    ],
    reason:"TEMPLATE_PLACEHOLDER_CONTENT",
    blocksServing:true,
    requireTopicParity:true,
    note:"Legacy paramedic bank repeats generic five-question templates across clinical topics, includes nonsensical answer keys and difficulty 5. Learners are served only from authored v2 replacement batches; completion requires every unique legacy topic to be represented by clinically authored v2 content.",
  },
];

export const CAREER_QUARANTINE_LEGACY_PATHS=new Set(CAREER_QUESTION_QUARANTINE.map(e=>e.legacyPath));
