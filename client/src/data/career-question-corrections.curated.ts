import { MLT_QUESTION_CORRECTIONS_BATCH01 } from "./career-question-corrections-mlt-batch01";
import { MLT_QUESTION_CORRECTIONS_BATCH02 } from "./career-question-corrections-mlt-batch02";
import { MLT_QUESTION_CORRECTIONS_BATCH03 } from "./career-question-corrections-mlt-batch03";
import { MLT_QUESTION_CORRECTIONS_BATCH04 } from "./career-question-corrections-mlt-batch04";

export type CareerQuestionCorrection=Record<string,unknown>;

/** Clinical corrections applied before stable-ID normalization and learner serving. */
export const CAREER_QUESTION_CORRECTIONS:Record<string,CareerQuestionCorrection>={
  ...MLT_QUESTION_CORRECTIONS_BATCH01,
  ...MLT_QUESTION_CORRECTIONS_BATCH02,
  ...MLT_QUESTION_CORRECTIONS_BATCH03,
  ...MLT_QUESTION_CORRECTIONS_BATCH04,
  "rrt-011":{
    options:["Controlled oxygen is titrated to a target saturation because excessive oxygen can worsen hypercapnia in susceptible COPD patients","Low-flow oxygen prevents barotrauma","High FiO2 directly causes bronchospasm in COPD","Venturi masks cannot deliver more than 28% oxygen"],
    rationale:"In an acute COPD presentation with risk of hypercapnic respiratory failure, oxygen should be controlled and titrated to a target saturation rather than withheld. Excessive oxygen can worsen hypercapnia through mechanisms including worsening ventilation-perfusion mismatch and the Haldane effect; loss of hypoxic ventilatory drive is not the sole or preferred explanation. A Venturi mask provides a predictable FiO2 while the patient is reassessed and blood gases guide further therapy.",difficulty:3,
    examTip:"Treat hypoxemia, but prescribe a target saturation and reassess blood gases when hypercapnic respiratory failure is a risk.",safetyPearl:"Do not withhold oxygen from a hypoxemic COPD patient out of fear of CO2 retention; give controlled oxygen to the appropriate target and monitor ventilation.",clinicalConcept:"Oxygen-induced hypercapnia in COPD is multifactorial, with ventilation-perfusion effects and the Haldane effect playing important roles."
  },
  "rrt-016":{
    rationale:"This patient has chronic hypercapnia with renal compensation and is at risk of hypercapnic respiratory failure. In an acutely ill patient with known COPD/risk factors, controlled oxygen is commonly titrated initially to an SpO2 target of 88-92% while arterial blood gas results and the clinical response guide subsequent adjustment. The goal is to correct hypoxemia without unnecessary hyperoxia and worsening CO2 retention; this is not simply a matter of preserving a 'hypoxic drive.'",difficulty:2,
    examTip:"For COPD at risk of hypercapnic respiratory failure, think controlled oxygen to a target range plus blood-gas reassessment—not oxygen avoidance.",safetyPearl:"A target saturation is a prescription: titrate oxygen to it and reassess PaCO2/pH when hypercapnia is a concern.",clinicalConcept:"Controlled oxygen reduces the risk of both untreated hypoxemia and oxygen-associated worsening hypercapnia."
  },
  "rrt-013":{difficulty:4},"rrt-014":{difficulty:4},"rrt-017":{difficulty:4},
  "paramedic-v2-ob-001":{
    options:[
      {id:"p-o1-eclampsia",text:"Eclampsia"},
      {id:"p-o1-ectopic",text:"Ruptured ectopic pregnancy"},
      {id:"p-o1-previa",text:"Placenta previa"},
      {id:"p-o1-labor",text:"Uncomplicated labour"}
    ],
    distractorRationales:{
      "p-o1-ectopic":"Ectopic pregnancy typically occurs much earlier and presents with pain/bleeding or shock, not a late-pregnancy hypertensive seizure syndrome.",
      "p-o1-previa":"Placenta previa classically causes painless bleeding and does not explain severe hypertension with seizure.",
      "p-o1-labor":"A generalized seizure with severe hypertension is not a normal labour finding."
    }
  }
};
export function applyCareerQuestionCorrection<T extends Record<string,any>>(question:T):T{const correction=CAREER_QUESTION_CORRECTIONS[String(question?.id||"")];return correction?{...question,...correction}:question;}
