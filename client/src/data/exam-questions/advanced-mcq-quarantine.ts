import type { QuestionSourceQuarantineEntry } from "./question-quarantine";

const spec=[
  {tier:"rpn",count:6,replacements:["rpn-mcq-stemi-001","rpn-mcq-furosemide-001","rpn-mcq-cath-001","rpn-mcq-af-001","rpn-mcq-tamponade-001"]},
  {tier:"rn",count:10,replacements:["rn-mcq-stemi-001","rn-mcq-furosemide-001","rn-mcq-cath-001","rn-mcq-af-001","rn-mcq-tamponade-001"]},
  {tier:"np",count:12,replacements:["np-mcq-stemi-001","np-mcq-diuresis-001","np-mcq-cath-001","np-mcq-af-001","np-mcq-tamponade-001"]},
] as const;

export const ADVANCED_MCQ_QUARANTINE:QuestionSourceQuarantineEntry[]=spec.flatMap(({tier,count,replacements})=>
  Array.from({length:count},(_,i)=>({
    path:`client/src/data/exam-questions/${tier}-advanced-mcq-${String(i+1).padStart(2,"0")}.ts`,
    reason:"DUPLICATE_GENERATED_CONTENT" as const,
    blocksServing:true as const,
    replacementRequired:false,
    replacementIds:[...replacements],
    note:`Legacy ${tier.toUpperCase()} advanced MCQ generator file is historical-only. It repeated the same five cardiology patterns under different IDs/difficulty values; the objective set is replaced by five directly authored canonical MCQs.`,
  }))
);

export const ADVANCED_MCQ_QUARANTINE_PATHS=new Set(ADVANCED_MCQ_QUARANTINE.map(entry=>entry.path));
