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

export type { LessonContent } from "./types";

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
};
