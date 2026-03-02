import type { LessonContent } from "./types";
import { cardiovascularLessons } from "./cardiovascular";
import { respiratoryLessons } from "./respiratory";
import { neurologicalLessons } from "./neurological";
import { gastrointestinalLessons } from "./gastrointestinal";
import { renalLessons } from "./renal";
import { endocrineLessons } from "./endocrine";
import { hematologyLessons } from "./hematology";
import { pediatricsLessons } from "./pediatrics";
import { neonatalLessons } from "./neonatal";
import { maternityLessons } from "./maternity";
import { proceduresLessons } from "./procedures";
import { pharmacologyLessons } from "./pharmacology";
import { skinInfectionsLessons } from "./skin-infections";
import { assessmentLessons } from "./assessment";
import { infectionControlLessons } from "./infection-control";
import { advancedNpLessons } from "./advanced-np";
import { emergencyLessons } from "./emergency";
import { mentalHealthLessons } from "./mental-health";
import { orthopedicLessons } from "./orthopedic";
import { oncologyLessons } from "./oncology";
import { obMedicationsLessons } from "./ob-medications";
import { pediatricInfectionsLessons } from "./pediatric-infections";
import { poisoningLessons } from "./poisoning";
import { eyeEarLessons } from "./eye-ear";
import { giAdvancedLessons } from "./gi-advanced";
import { nutritionLessons } from "./nutrition";
import { painManagementLessons } from "./pain-management";
import { labFundamentalsLessons } from "./lab-fundamentals";
import { bioterrorismLessons } from "./bioterrorism";
import { maternityComplicationsLessons } from "./maternity-complications";
import { postpartumNeonatalLessons } from "./postpartum-neonatal";
import { vaccinesLessons } from "./vaccines";
import { fundamentalsLessons } from "./fundamentals";
import { delegationLessons } from "./delegation";
import { clinicalScenariosLessons } from "./clinical-scenarios";
import { electrolytePotassiumLessons } from "./electrolyte-potassium";
import { rpnExtraBank } from "./extra-questions-rpn";
import { rnExtraBank } from "./extra-questions-rn";
import { npExtraBank } from "./extra-questions-np";
import { medMathLessons } from "./med-math-lessons";
import { reproductiveLessons } from "./reproductive";
import { reproductiveRpnLessons } from "./reproductive-rpn";
import { reproductiveNpLessons } from "./reproductive-np";
import { arrhythmiaLessons } from "./arrhythmias";
import { dermatologyLessons } from "./dermatology";
import { respiratoryExpansionLessons } from "./respiratory-expansion";
import { respiratoryMissingRpnLessons } from "./respiratory-missing-rpn";
import { respiratoryMissingRnLessons } from "./respiratory-missing-rn";
import { respiratoryMissingNpLessons } from "./respiratory-missing-np";
import { npClinicalUnitLessons } from "./np-clinical-units";
import { uploadedClinicalNpLessons } from "./uploaded-clinical-np";

export type { LessonContent } from "./types";

function countQuestions(lessons: Record<string, LessonContent>): number {
  let count = 0;
  for (const lesson of Object.values(lessons)) {
    if (lesson.quiz) count += lesson.quiz.length;
    if (lesson.preTest) count += lesson.preTest.length;
    if (lesson.postTest) count += lesson.postTest.length;
  }
  return count;
}

export const contentMap: Record<string, LessonContent> = {
  ...cardiovascularLessons,
  ...respiratoryLessons,
  ...neurologicalLessons,
  ...gastrointestinalLessons,
  ...renalLessons,
  ...endocrineLessons,
  ...hematologyLessons,
  ...pediatricsLessons,
  ...neonatalLessons,
  ...maternityLessons,
  ...proceduresLessons,
  ...pharmacologyLessons,
  ...skinInfectionsLessons,
  ...assessmentLessons,
  ...infectionControlLessons,
  ...advancedNpLessons,
  ...emergencyLessons,
  ...mentalHealthLessons,
  ...orthopedicLessons,
  ...oncologyLessons,
  ...obMedicationsLessons,
  ...pediatricInfectionsLessons,
  ...poisoningLessons,
  ...eyeEarLessons,
  ...giAdvancedLessons,
  ...nutritionLessons,
  ...painManagementLessons,
  ...labFundamentalsLessons,
  ...bioterrorismLessons,
  ...maternityComplicationsLessons,
  ...postpartumNeonatalLessons,
  ...vaccinesLessons,
  ...fundamentalsLessons,
  ...delegationLessons,
  ...clinicalScenariosLessons,
  ...electrolytePotassiumLessons,
  ...rpnExtraBank,
  ...rnExtraBank,
  ...npExtraBank,
  ...medMathLessons,
  ...reproductiveLessons,
  ...reproductiveRpnLessons,
  ...reproductiveNpLessons,
  ...arrhythmiaLessons,
  ...dermatologyLessons,
  ...respiratoryExpansionLessons,
  ...respiratoryMissingRpnLessons,
  ...respiratoryMissingRnLessons,
  ...respiratoryMissingNpLessons,
  ...npClinicalUnitLessons,
  ...uploadedClinicalNpLessons,
};

export const lessonCount = Object.keys(contentMap).length;
export const questionCount = countQuestions(contentMap);
