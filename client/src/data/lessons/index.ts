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
import { palliativeCareLessons } from "./palliative-care";
import { communityNursingLessons } from "./community-nursing";
import { painWoundCareLessons } from "./pain-wound-care";
import { coreFundamentalsLessons } from "./core-fundamentals";
import { delegationPrioritizationLessons } from "./delegation-prioritization";
import { cardiovascularExpandedLessons } from "./cardiovascular-expanded";
import { respiratoryExpandedLessons } from "./respiratory-expanded";
import { neurologicalExpandedLessons } from "./neurological-expanded";
import { renalGiExpandedLessons } from "./renal-gi-expanded";
import { endocrineImmuneExpandedLessons } from "./endocrine-immune-expanded";
import { hematologyExpandedLessons } from "./hematology-expanded";
import { heentSkinLessons } from "./heent-skin";
import { musculoskeletalExpandedLessons } from "./musculoskeletal-expanded";
import { pediatricsExpandedLessons } from "./pediatrics-expanded";
import { maternityExpandedLessons } from "./maternity-expanded";
import { neonatalExpandedLessons } from "./neonatal-expanded";
import { mentalHealthExpandedLessons } from "./mental-health-expanded";
import { infectionsProceduresLessons } from "./infections-procedures";
import { assessmentSkillsLessons } from "./assessment-skills";
import { fluidElectrolytesLessons } from "./fluid-electrolytes";
import { nutritionSupplementsLessons } from "./nutrition-supplements";
import { safetyEthicsLessons } from "./safety-ethics";
import { gerontologyLessons } from "./gerontology";
import { oncologyExpandedLessons } from "./oncology-expanded";
import { toxicologyEnvironmentalLessons } from "./toxicology-environmental";
import { criticalCareLessons } from "./critical-care";
import { hemodialysisLessons } from "./hemodialysis";
import { positioningToxoLessons } from "./positioning-toxo";
import { ethicsComprehensiveLessons } from "./ethics-comprehensive";
import { therapeuticCommunicationLessons } from "./therapeutic-communication";
import { labsDiagnosticsLessons } from "./labs-diagnostics";
import { leadershipManagementLessons } from "./leadership-management";
import { healthPromotionScreeningLessons } from "./health-promotion-screening";
import { legalEdgeCasesLessons } from "./legal-edge-cases";
import { maternalNewbornAdvancedLessons } from "./maternal-newborn-advanced";
import { cardiacRespiratoryCriticalLessons } from "./cardiac-respiratory-critical";
import { delegationByLicenseLessons } from "./delegation-by-license";
import { informaticsDocumentationLessons } from "./informatics-documentation";
import { nursingCalculationsLessons } from "./nursing-calculations";
import { culturalSafetyEquityLessons } from "./cultural-safety-equity";
import { pharmacologyNpPrescribingLessons } from "./pharmacology-np-prescribing";
import { pharmacologyCardioRespLessons } from "./pharmacology-cardio-resp";
import { pharmacologyInfectiousPsychLessons } from "./pharmacology-infectious-psych";
import { pharmacologyGiRenalSpecialtyLessons } from "./pharmacology-gi-renal-specialty";

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
  ...palliativeCareLessons,
  ...communityNursingLessons,
  ...painWoundCareLessons,
  ...coreFundamentalsLessons,
  ...delegationPrioritizationLessons,
  ...cardiovascularExpandedLessons,
  ...respiratoryExpandedLessons,
  ...neurologicalExpandedLessons,
  ...renalGiExpandedLessons,
  ...endocrineImmuneExpandedLessons,
  ...hematologyExpandedLessons,
  ...heentSkinLessons,
  ...musculoskeletalExpandedLessons,
  ...pediatricsExpandedLessons,
  ...maternityExpandedLessons,
  ...neonatalExpandedLessons,
  ...mentalHealthExpandedLessons,
  ...infectionsProceduresLessons,
  ...assessmentSkillsLessons,
  ...fluidElectrolytesLessons,
  ...nutritionSupplementsLessons,
  ...safetyEthicsLessons,
  ...gerontologyLessons,
  ...oncologyExpandedLessons,
  ...toxicologyEnvironmentalLessons,
  ...criticalCareLessons,
  ...hemodialysisLessons,
  ...positioningToxoLessons,
  ...ethicsComprehensiveLessons,
  ...therapeuticCommunicationLessons,
  ...labsDiagnosticsLessons,
  ...leadershipManagementLessons,
  ...healthPromotionScreeningLessons,
  ...legalEdgeCasesLessons,
  ...maternalNewbornAdvancedLessons,
  ...cardiacRespiratoryCriticalLessons,
  ...delegationByLicenseLessons,
  ...informaticsDocumentationLessons,
  ...nursingCalculationsLessons,
  ...culturalSafetyEquityLessons,
  ...pharmacologyNpPrescribingLessons,
  ...pharmacologyCardioRespLessons,
  ...pharmacologyInfectiousPsychLessons,
  ...pharmacologyGiRenalSpecialtyLessons,
};

export const lessonCount = Object.keys(contentMap).length;
export const questionCount = countQuestions(contentMap);
