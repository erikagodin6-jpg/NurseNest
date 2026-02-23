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

import illustrationBacteria from "@assets/0F849D91-31C9-462C-90A3-86BC0A349208_1771867669482.png";
import illustrationVirus from "@assets/68A849D0-5AC6-4572-9DFC-1DB87E8C4EBE_1771867669482.png";
import illustrationWound from "@assets/0C0087C1-6D3B-4F00-8750-23E66D85FDE6_1771867669482.png";
import illustrationNerve from "@assets/13DB4F71-9318-425E-8ACB-115E87A307FF_1771867669482.png";
import illustrationTumor from "@assets/19052799-0836-412F-A563-C125C1C643DF_1771867669482.png";
import illustrationElectrolytes from "@assets/AB6C69A2-A616-4DBF-8567-6990D4260BDE_1771867669482.png";
import illustrationCardiacCycle from "@assets/C59AF0B3-CD44-43B6-B2D5-D708852AAFA8_1771867669482.png";
import illustrationKidneys from "@assets/BF46940D-B9D9-4006-9ECE-FAA14A1AC986_1771867669482.png";
import illustrationPAD from "@assets/A987EB13-6A3D-4CEB-B724-73F03632ABCF_1771867669482.png";
import illustrationCardioversion from "@assets/154E2788-B2DC-45AF-8785-5E32B5F79614_1771867669482.png";
import illustrationPacemaker from "@assets/F7434780-BFF4-4E06-827A-32BE201FCEB3_1771867669482.png";
import illustrationRaynauds from "@assets/E0D83C65-E1EE-4232-84E1-AD84C731ABF8_1771867669482.png";
import illustrationGangrene from "@assets/15AF44D0-F75A-47B4-9634-E4B1BB4753F4_1771867669482.png";
import illustrationVenousInsufficiency from "@assets/11F2AACE-1F8A-405D-A2F0-32864E6E0806_1771867669482.png";
import illustrationVaricoseVeins from "@assets/1268322E-C450-4C17-98DE-DA4328F10967_1771867669482.png";
import illustrationEndocarditis from "@assets/C4246E27-C245-4BBC-A5AD-1AA3ED53B79D_1771867669482.png";
import illustrationRheumaticFever from "@assets/15F3BD85-F280-4197-AC38-EB32D5FC2A5F_1771867669482.png";
import illustrationShock from "@assets/80A82C61-D7D0-4F48-BD94-BF4487E5B4AD_1771867669482.png";
import illustrationCOPD from "@assets/1EDFE7E4-FCC4-4937-B2AC-A6E852F6306A_1771867669482.png";
import illustrationAsthma from "@assets/AF6DD963-6E1A-4CE9-A78A-93E77EFB8438_1771867669482.png";

const lessonSpecificImages: Record<string, string> = {
  "infective-endocarditis": illustrationEndocarditis,
  "peripheral-artery-disease": illustrationPAD,
  "pacemaker-care": illustrationPacemaker,
  "dysrhythmias": illustrationCardioversion,
  "mi-management": illustrationCardiacCycle,
  "mi-acute": illustrationCardiacCycle,
  "cardiovascular-rpn": illustrationCardiacCycle,
  "cardiovascular-rn": illustrationCardiacCycle,
  "cardiovascular-np": illustrationCardiacCycle,
  "chf-basics": illustrationCardiacCycle,
  "hf-advanced": illustrationCardiacCycle,
  "copd-exacerbation": illustrationCOPD,
  "asthma-emergency": illustrationAsthma,
  "asthma-copd": illustrationCOPD,
  "hand-hygiene": illustrationBacteria,
  "ppe-basics": illustrationBacteria,
  "isolation-precautions-rpn": illustrationVirus,
  "airborne-precautions": illustrationVirus,
  "droplet-precautions": illustrationVirus,
  "neuritis-neuropathy": illustrationNerve,
  "tumor-classification": illustrationTumor,
  "radiation-therapy": illustrationTumor,
  "treatment-of-cancer": illustrationTumor,
  "hodgkin-lymphoma": illustrationTumor,
  "non-hodgkin-lymphoma": illustrationTumor,
  "aki-management": illustrationKidneys,
  "ckd-management": illustrationKidneys,
  "rhabdomyolysis": illustrationKidneys,
  "av-fistula": illustrationKidneys,
  "dialysis-steal": illustrationKidneys,
  "shock-syndromes": illustrationShock,
  "sepsis-mastery": illustrationShock,
  "burn-management": illustrationWound,
  "cellulitis": illustrationWound,
  "cardiogenic-shock": illustrationShock,
  "aaa-rupture": illustrationCardiacCycle,
  "pe-dvt": illustrationVenousInsufficiency,
  "pe-recognition": illustrationVenousInsufficiency,
  "cardiac-monitoring": illustrationCardioversion,
  "cardiac-rhythm-rn": illustrationCardioversion,
  "cardiac-auscultation-rn": illustrationCardiacCycle,
  "hypertension-management": illustrationCardiacCycle,
  "aortic-dissection": illustrationCardiacCycle,
  "carotid-endarterectomy": illustrationPAD,
  "respiratory-rpn": illustrationCOPD,
  "respiratory-rn": illustrationCOPD,
  "respiratory-np": illustrationCOPD,
  "pneumonia-basics": illustrationBacteria,
  "active-tb": illustrationBacteria,
  "sterile-technique": illustrationBacteria,
  "neuro-basics": illustrationNerve,
  "stroke": illustrationNerve,
  "stroke-advanced": illustrationNerve,
  "seizure-safety": illustrationNerve,
  "increased-icp": illustrationNerve,
  "breast-cancer": illustrationTumor,
  "cervical-cancer": illustrationTumor,
  "prostate-cancer": illustrationTumor,
  "multiple-myeloma": illustrationTumor,
  "basal-cell-carcinoma": illustrationTumor,
  "squamous-cell-carcinoma": illustrationTumor,
  "anaphylaxis": illustrationShock,
  "compartment-syndrome": illustrationGangrene,
  "malignant-hyperthermia": illustrationShock,
  "psoriasis": illustrationWound,
  "eczema-atopic-dermatitis": illustrationWound,
  "herpes-zoster-shingles": illustrationWound,
  "ards-management": illustrationAsthma,
  "oxygen-therapy": illustrationCOPD,
  "chest-tube-care": illustrationCOPD,
  "abg-basics": illustrationElectrolytes,
  "abg-interpretation-rn": illustrationElectrolytes,
  "contact-dermatitis": illustrationRaynauds,
  "stevens-johnson-syndrome": illustrationRaynauds,
  "urticaria": illustrationRaynauds,
  "scabies": illustrationVaricoseVeins,
  "impetigo": illustrationVaricoseVeins,
  "pemphigus-vulgaris": illustrationVaricoseVeins,
  "melanoma": illustrationRheumaticFever,
  "toxic-epidermal-necrolysis": illustrationRheumaticFever,
};

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
  if (lessonSpecificImages[lessonId]) return lessonSpecificImages[lessonId];
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
