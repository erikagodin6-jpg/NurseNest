import systemCardiovascular from "@/assets/images/system-cardiovascular.png";
import systemRespiratory from "@/assets/images/system-respiratory.png";
import systemNeurological from "@/assets/images/system-neurological.png";
import systemGastrointestinal from "@/assets/images/system-gastrointestinal.png";
import systemRenal from "@/assets/images/system-renal.png";
import systemEndocrine from "@/assets/images/system-endocrine.png";
import systemHematology from "@/assets/images/system-hematology.png";
import systemMusculoskeletal from "@/assets/images/system-musculoskeletal.png";
import systemImmune from "@/assets/images/system-immune.png";
import systemMaternity from "@/assets/images/system-maternity.png";
import systemPediatrics from "@/assets/images/system-pediatrics.png";
import systemMentalHealth from "@/assets/images/system-mental-health.png";
import systemOncology from "@/assets/images/system-oncology.png";
import systemPharmacology from "@/assets/images/system-pharmacology.png";
import systemFundamentals from "@/assets/images/system-fundamentals.png";
import systemEmergency from "@/assets/images/system-emergency.png";
import systemSensory from "@/assets/images/system-sensory.png";
import systemWoundCare from "@/assets/images/system-wound-care.png";
import systemDelegation from "@/assets/images/system-delegation.png";
import systemInfectionControl from "@/assets/images/system-infection-control.png";
import systemPain from "@/assets/images/system-pain.png";
import systemPalliative from "@/assets/images/system-palliative.png";
import systemCommunity from "@/assets/images/system-community.png";
import systemCell from "@/assets/images/system-cell.png";
import systemHomeostasis from "@/assets/images/system-homeostasis.png";
import systemReproductive from "@/assets/images/system-reproductive.png";
import systemAssessment from "@/assets/images/system-assessment.png";

const systemImageMap: Record<string, string> = {
  "cardiovascular": systemCardiovascular,
  "cardiovascular-rn": systemCardiovascular,
  "cardiovascular-np": systemCardiovascular,
  "cardiovascular-pharmacology-rpn": systemCardiovascular,
  "cardiovascular-pharmacology-rn": systemCardiovascular,
  "cardiovascular-pharmacology-np": systemCardiovascular,

  "respiratory": systemRespiratory,
  "respiratory-rn": systemRespiratory,
  "respiratory-np": systemRespiratory,
  "respiratory-pharmacology-rpn": systemRespiratory,
  "respiratory-pharmacology-rn": systemRespiratory,
  "respiratory-pharmacology-np": systemRespiratory,

  "neurological": systemNeurological,
  "neurological-rn": systemNeurological,
  "neurological-np": systemNeurological,
  "neuro-basics": systemNeurological,
  "neurological-pharmacology-rpn": systemNeurological,
  "neurological-pharmacology-rn": systemNeurological,
  "neurological-pharmacology-np": systemNeurological,

  "gastrointestinal": systemGastrointestinal,
  "gastrointestinal-rn": systemGastrointestinal,
  "gastrointestinal-np": systemGastrointestinal,
  "gi-advanced": systemGastrointestinal,
  "gi-pharmacology-rpn": systemGastrointestinal,
  "gi-pharmacology-rn": systemGastrointestinal,
  "gi-pharmacology-np": systemGastrointestinal,

  "renal": systemRenal,
  "renal-metabolic-rn": systemRenal,
  "renal-np": systemRenal,
  "renal-pharmacology-rpn": systemRenal,
  "renal-pharmacology-rn": systemRenal,
  "renal-pharmacology-np": systemRenal,

  "endocrine": systemEndocrine,
  "endocrine-rn": systemEndocrine,
  "endocrine-np": systemEndocrine,
  "endocrine-pharmacology-rpn": systemEndocrine,
  "endocrine-pharmacology-rn": systemEndocrine,
  "endocrine-pharmacology-np": systemEndocrine,

  "hematology": systemHematology,
  "hematology-rn": systemHematology,
  "hematology-np": systemHematology,
  "hematology-oncology-rpn": systemHematology,
  "hematology-pharmacology-rpn": systemHematology,

  "musculoskeletal": systemMusculoskeletal,
  "musculoskeletal-rn": systemMusculoskeletal,
  "musculoskeletal-np": systemMusculoskeletal,
  "orthopedic-rpn": systemMusculoskeletal,

  "immune": systemImmune,
  "immune-system": systemImmune,
  "immune-rn": systemImmune,
  "immune-np": systemImmune,
  "autoimmune-rheumatology-np": systemImmune,

  "maternity": systemMaternity,
  "maternity-rn": systemMaternity,
  "maternity-np": systemMaternity,
  "maternity-rpn": systemMaternity,
  "maternity-pharmacology-rpn": systemMaternity,
  "maternity-pharmacology-rn": systemMaternity,
  "maternity-pharmacology-np": systemMaternity,
  "postpartum-neonatal-rpn": systemMaternity,

  "pediatrics": systemPediatrics,
  "pediatrics-rn": systemPediatrics,
  "pediatrics-np": systemPediatrics,
  "pediatrics-rpn": systemPediatrics,
  "pediatric-pharmacology-rpn": systemPediatrics,
  "pediatric-pharmacology-rn": systemPediatrics,
  "pediatric-pharmacology-np": systemPediatrics,
  "neonatal-rpn": systemPediatrics,

  "mental-health": systemMentalHealth,
  "mental-health-rn": systemMentalHealth,
  "mental-health-np": systemMentalHealth,
  "mental-health-rpn": systemMentalHealth,
  "psychiatric-pharmacology-rpn": systemMentalHealth,
  "psychiatric-pharmacology-rn": systemMentalHealth,
  "psychiatric-pharmacology-np": systemMentalHealth,

  "oncology": systemOncology,
  "oncology-rn": systemOncology,
  "oncology-np": systemOncology,
  "oncology-rpn": systemOncology,
  "oncology-pharmacology-rpn": systemOncology,
  "oncology-pharmacology-rn": systemOncology,
  "oncology-pharmacology-np": systemOncology,

  "pharmacology": systemPharmacology,
  "pharmacology-core-rpn": systemPharmacology,
  "pharmacology-core-rn": systemPharmacology,
  "pharmacology-core-np": systemPharmacology,
  "analgesic-pharmacology-rpn": systemPharmacology,

  "fundamentals-core": systemFundamentals,
  "fundamentals": systemFundamentals,
  "nursing-fundamentals-rpn": systemFundamentals,

  "emergency": systemEmergency,
  "emergency-rn": systemEmergency,
  "emergency-np": systemEmergency,
  "emergency-rpn": systemEmergency,
  "clinical-scenarios-rpn": systemEmergency,
  "critical-care-advanced-np": systemEmergency,

  "eye-ear": systemSensory,
  "eye-ear-rpn": systemSensory,
  "sensory-np": systemSensory,

  "wound-care-rpn": systemWoundCare,
  "skin-infections-rpn": systemWoundCare,

  "delegation-core": systemDelegation,
  "delegation": systemDelegation,

  "infection-control-rpn": systemInfectionControl,
  "infection-control": systemInfectionControl,

  "pain-management-rpn": systemPain,
  "pain-management": systemPain,

  "palliative-eol-rpn": systemPalliative,
  "palliative": systemPalliative,

  "community-health-rpn": systemCommunity,
  "community": systemCommunity,

  "cell-structure": systemCell,
  "feedback-loops": systemHomeostasis,
  "homeostasis": systemHomeostasis,

  "reproductive": systemReproductive,

  "assessment-rpn": systemAssessment,
  "assessment": systemAssessment,

  "nutrition-rpn": systemFundamentals,
  "lab-fundamentals-rpn": systemRenal,
  "vaccines-rpn": systemInfectionControl,

  "rare-genetic-disorders-np": systemHematology,
  "toxicology-np": systemEmergency,
  "advanced-diagnostics-np": systemAssessment,
  "advanced-pharmacology-np": systemPharmacology,
};

export function getSystemImage(systemId: string): string | undefined {
  if (systemImageMap[systemId]) return systemImageMap[systemId];

  for (const [key, value] of Object.entries(systemImageMap)) {
    if (systemId.includes(key) || key.includes(systemId)) {
      return value;
    }
  }

  return undefined;
}

export function getLessonImage(lessonId: string): string | undefined {
  if (lessonId.includes("cardio") || lessonId.includes("heart") || lessonId.includes("mi-") || lessonId.includes("hf-") || lessonId.includes("aaa-") || lessonId.includes("dvt") || lessonId.includes("pacemaker") || lessonId.includes("aortic") || lessonId.includes("carotid") || lessonId.includes("shock") || lessonId.includes("dysrhythmia")) return systemCardiovascular;
  if (lessonId.includes("resp") || lessonId.includes("copd") || lessonId.includes("asthma") || lessonId.includes("pneumo") || lessonId.includes("tb-") || lessonId.includes("pe-") || lessonId.includes("ards") || lessonId.includes("osa-") || lessonId.includes("lung") || lessonId.includes("ventilat")) return systemRespiratory;
  if (lessonId.includes("neuro") || lessonId.includes("brain") || lessonId.includes("stroke") || lessonId.includes("seizure") || lessonId.includes("icp") || lessonId.includes("meniere") || lessonId.includes("duchenne") || lessonId.includes("spina") || lessonId.includes("myasthenia") || lessonId.includes("guillain") || lessonId.includes("huntington")) return systemNeurological;
  if (lessonId.includes("gi-") || lessonId.includes("gastro") || lessonId.includes("abdomen") || lessonId.includes("pyloric") || lessonId.includes("liver") || lessonId.includes("cirrhosis") || lessonId.includes("ulcer") || lessonId.includes("colitis") || lessonId.includes("cholecyst") || lessonId.includes("celiac") || lessonId.includes("dumping") || lessonId.includes("ercp")) return systemGastrointestinal;
  if (lessonId.includes("renal") || lessonId.includes("kidney") || lessonId.includes("aki-") || lessonId.includes("ckd-") || lessonId.includes("electrolyte") || lessonId.includes("rhabdo") || lessonId.includes("dialysis") || lessonId.includes("fistula") || lessonId.includes("bph") || lessonId.includes("crrt")) return systemRenal;
  if (lessonId.includes("endocrine") || lessonId.includes("thyroid") || lessonId.includes("siadh") || lessonId.includes("dka") || lessonId.includes("adrenal") || lessonId.includes("cushing") || lessonId.includes("diabetes") || lessonId.includes("dm-")) return systemEndocrine;
  if (lessonId.includes("hemat") || lessonId.includes("anemia") || lessonId.includes("leukemia") || lessonId.includes("lymphoma") || lessonId.includes("polycythemia") || lessonId.includes("sickle") || lessonId.includes("blood-transfusion") || lessonId.includes("spherocytosis") || lessonId.includes("g6pd")) return systemHematology;
  if (lessonId.includes("ortho") || lessonId.includes("musculo") || lessonId.includes("fracture") || lessonId.includes("joint") || lessonId.includes("bone") || lessonId.includes("hip-") || lessonId.includes("cast-") || lessonId.includes("traction") || lessonId.includes("amputation") || lessonId.includes("compartment")) return systemMusculoskeletal;
  if (lessonId.includes("immune") || lessonId.includes("autoimmune") || lessonId.includes("lupus") || lessonId.includes("hiv") || lessonId.includes("rheumat") || lessonId.includes("anaphylaxis") || lessonId.includes("allerg")) return systemImmune;
  if (lessonId.includes("matern") || lessonId.includes("labor") || lessonId.includes("preeclampsia") || lessonId.includes("postpartum") || lessonId.includes("prenatal") || lessonId.includes("ectopic") || lessonId.includes("placenta") || lessonId.includes("abruptio") || lessonId.includes("cesarean") || lessonId.includes("oxytocin")) return systemMaternity;
  if (lessonId.includes("pedia") || lessonId.includes("neonat") || lessonId.includes("child") || lessonId.includes("infant") || lessonId.includes("rsv") || lessonId.includes("croup") || lessonId.includes("epiglottitis") || lessonId.includes("kawasaki")) return systemPediatrics;
  if (lessonId.includes("mental") || lessonId.includes("psych") || lessonId.includes("depression") || lessonId.includes("anxiety") || lessonId.includes("bipolar") || lessonId.includes("schizo") || lessonId.includes("eating-disorder") || lessonId.includes("substance") || lessonId.includes("suicide") || lessonId.includes("ptsd")) return systemMentalHealth;
  if (lessonId.includes("onco") || lessonId.includes("cancer") || lessonId.includes("chemo") || lessonId.includes("radiation") || lessonId.includes("tumor") || lessonId.includes("neutropenic") || lessonId.includes("breast-cancer") || lessonId.includes("prostate-cancer") || lessonId.includes("cervical-cancer") || lessonId.includes("colorectal")) return systemOncology;
  if (lessonId.includes("pharm") || lessonId.includes("medication") || lessonId.includes("drug") || lessonId.includes("analgesic") || lessonId.includes("antibiotic") || lessonId.includes("antihypertensive") || lessonId.includes("anticoagulant")) return systemPharmacology;
  if (lessonId.includes("fundament") || lessonId.includes("vital-sign") || lessonId.includes("adpie") || lessonId.includes("documentation") || lessonId.includes("fluid-balance") || lessonId.includes("nutrition")) return systemFundamentals;
  if (lessonId.includes("emergency") || lessonId.includes("triage") || lessonId.includes("resuscit") || lessonId.includes("cpr") || lessonId.includes("ecmo") || lessonId.includes("balloon-pump") || lessonId.includes("prone-position")) return systemEmergency;
  if (lessonId.includes("eye") || lessonId.includes("ear") || lessonId.includes("glaucoma") || lessonId.includes("cataract") || lessonId.includes("retinal") || lessonId.includes("otitis")) return systemSensory;
  if (lessonId.includes("wound") || lessonId.includes("burn") || lessonId.includes("skin") || lessonId.includes("dressing") || lessonId.includes("npwt") || lessonId.includes("masd")) return systemWoundCare;
  if (lessonId.includes("delegat") || lessonId.includes("sbar") || lessonId.includes("prioritiz") || lessonId.includes("who-to-see") || lessonId.includes("unstable-vs")) return systemDelegation;
  if (lessonId.includes("infection") || lessonId.includes("ppe") || lessonId.includes("vaccine") || lessonId.includes("communicable") || lessonId.includes("bioterror")) return systemInfectionControl;
  if (lessonId.includes("pain") || lessonId.includes("pca-") || lessonId.includes("epidural") || lessonId.includes("opioid")) return systemPain;
  if (lessonId.includes("palliative") || lessonId.includes("hospice") || lessonId.includes("dnr") || lessonId.includes("grief") || lessonId.includes("postmortem") || lessonId.includes("death-dying") || lessonId.includes("comfort-measures") || lessonId.includes("family-support-eol")) return systemPalliative;
  if (lessonId.includes("community") || lessonId.includes("home-care") || lessonId.includes("public-health") || lessonId.includes("discharge") || lessonId.includes("screening-program") || lessonId.includes("health-promotion")) return systemCommunity;
  if (lessonId.includes("assessment") || lessonId.includes("diagnostic") || lessonId.includes("lab-fundamental")) return systemAssessment;
  if (lessonId.includes("poison") || lessonId.includes("toxidrome") || lessonId.includes("toxicol")) return systemEmergency;

  return systemFundamentals;
}

export default systemImageMap;
