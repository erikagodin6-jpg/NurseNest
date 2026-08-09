export type CareerQuestionQuarantineEntry={career:string;legacyPath:string;replacementPaths:string[];reason:"TEMPLATE_PLACEHOLDER_CONTENT"|"CLINICAL_REVIEW_REQUIRED"|"DUPLICATE_GENERATED_CONTENT";blocksServing:true;requireTopicParity:boolean;note:string;};
export const CAREER_QUESTION_QUARANTINE:CareerQuestionQuarantineEntry[]=[
{
  career:"paramedic",legacyPath:"client/src/data/career-questions/paramedic-questions.ts",
  replacementPaths:[
    "client/src/data/career-questions/paramedic-v2-questions.ts",
    "client/src/data/career-questions/paramedic-v2-trauma-batch02-questions.ts",
    "client/src/data/career-questions/paramedic-v2-acls-burn-batch03-questions.ts",
    "client/src/data/career-questions/paramedic-v2-acls-batch04-questions.ts",
    "client/src/data/career-questions/paramedic-v2-pharmacology-batch05-questions.ts",
    "client/src/data/career-questions/paramedic-v2-medical-batch06-questions.ts",
    "client/src/data/career-questions/paramedic-v2-ob-batch07-questions.ts",
    "client/src/data/career-questions/paramedic-v2-airway-batch08-questions.ts",
    "client/src/data/career-questions/paramedic-v2-pediatric-batch09-questions.ts",
    "client/src/data/career-questions/paramedic-v2-environment-operations-batch10-questions.ts",
    "client/src/data/career-questions/paramedic-v2-operations-batch11-questions.ts",
    "client/src/data/career-questions/paramedic-v2-legal-quality-batch12-questions.ts"
  ],
  reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,requireTopicParity:true,
  note:"Legacy paramedic bank repeats generic five-question templates across clinical topics, includes nonsensical answer keys and difficulty 5. Learners are served only from authored v2 replacement batches; completion requires every unique legacy topic to be represented by clinically authored v2 content."
},
{
  career:"pharmacyTech",legacyPath:"client/src/data/career-questions/pharmacy-tech-questions.ts",
  replacementPaths:[
    "client/src/data/career-questions/pharmacy-tech-v2-calculations-batch01-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-calculations-batch02-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-compounding-batch03-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-medications-batch04-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-law-batch05-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-safety-operations-batch06-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-sterile-batch07-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-medication-safety-batch08-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-communication-batch09-questions.ts",
    "client/src/data/career-questions/pharmacy-tech-v2-quality-batch10-questions.ts"
  ],
  reason:"TEMPLATE_PLACEHOLDER_CONTENT",blocksServing:true,requireTopicParity:true,
  note:"Legacy pharmacy-technician bank repeats generic clinical-action templates across technical topics and includes difficulty 5. Learners are served only from authored v2 pharmacy-technician content; completion requires parity with every unique legacy topic and technician-scope-safe clinical escalation."
}
];
export const CAREER_QUARANTINE_LEGACY_PATHS=new Set(CAREER_QUESTION_QUARANTINE.map(e=>e.legacyPath));
