import illustrationBacteria from "@/assets/lesson-bacteria-infection.png";
import illustrationVirus from "@/assets/lesson-virus.png";
import illustrationWound from "@/assets/lesson-wound.png";
import illustrationNerve from "@/assets/lesson-nerve.png";
import illustrationTumor from "@/assets/lesson-tumor.png";
import illustrationElectrolytes from "@/assets/lesson-electrolytes.png";
import illustrationCardiacCycle from "@/assets/anatomy-cardiovascular.png";
import illustrationKidneys from "@/assets/anatomy-renal.png";
import illustrationPAD from "@/assets/lesson-pad.png";
import illustrationCardioversion from "@/assets/lesson-cardioversion.png";
import illustrationPacemaker from "@/assets/lesson-pacemaker.png";
import illustrationRaynauds from "@/assets/lesson-raynauds.png";
import illustrationGangrene from "@/assets/lesson-gangrene.png";
import illustrationVenousInsufficiency from "@/assets/lesson-venous-insufficiency.png";
import illustrationVaricoseVeins from "@/assets/lesson-varicose-veins.png";
import illustrationEndocarditis from "@/assets/lesson-endocarditis.png";
import illustrationRheumaticFever from "@/assets/lesson-rheumatic-fever.png";
import illustrationShock from "@/assets/lesson-shock.png";
import illustrationCOPD from "@/assets/lesson-copd.png";
import illustrationAsthma from "@/assets/lesson-asthma.png";
import illustrationPneumonia from "@/assets/lesson-pneumonia.png";
import illustrationPneumonia2 from "@/assets/lesson-pneumonia2.png";
import illustrationTuberculosis from "@/assets/lesson-tuberculosis.png";
import illustrationTracheostomy from "@/assets/lesson-tracheostomy.png";

import illustrationParkinsons from "@/assets/lesson-parkinsons.png";
import illustrationMS from "@/assets/lesson-ms.png";
import illustrationStroke from "@/assets/lesson-stroke.png";
import illustrationBrainAbscess from "@/assets/lesson-brain-abscess.png";
import illustrationDeliriumDementia from "@/assets/lesson-delirium-dementia.png";
import illustrationCranialNerves from "@/assets/lesson-cranial-nerves.png";
import illustrationTrigeminalNeuralgia from "@/assets/lesson-trigeminal-neuralgia.png";
import illustrationICP from "@/assets/lesson-icp.png";
import illustrationCarpalTunnel from "@/assets/lesson-carpal-tunnel.png";
import illustrationCerebralEdema from "@/assets/lesson-cerebral-edema.png";
import illustrationMyastheniaGravis from "@/assets/lesson-myasthenia-gravis.png";
import illustrationConcussion from "@/assets/lesson-concussion.png";
import illustrationBellsPalsy from "@/assets/lesson-bells-palsy.png";
import illustrationCysticFibrosis from "@/assets/lesson-cystic-fibrosis.png";
import illustrationWhoopingCough from "@/assets/lesson-whooping-cough.png";
import illustrationBronchiectasis from "@/assets/lesson-bronchiectasis.png";
import illustrationPleurisy from "@/assets/lesson-pleurisy.png";
import illustrationChestPhysio from "@/assets/lesson-chest-physio.png";
import illustrationRSV from "@/assets/lesson-rsv.png";
import illustrationHemoptysis from "@/assets/lesson-hemoptysis.png";

import illustrationInflammatoryResponse from "@/assets/lesson-inflammatory-response.png";
import illustrationRetinalDetachment from "@/assets/lesson-retinal-detachment.png";
import illustrationPressureInjuries from "@/assets/lesson-pressure-injuries.png";
import illustrationInnateImmunity from "@/assets/lesson-innate-immunity.png";
import illustrationConjunctivitis from "@/assets/lesson-conjunctivitis.png";
import illustrationAplasticAnemia from "@/assets/lesson-aplastic-anemia.png";
import illustrationAlopecia from "@/assets/lesson-alopecia.png";
import illustrationPemphigus from "@/assets/lesson-pemphigus.png";
import illustrationPolycythemia from "@/assets/lesson-polycythemia.png";
import illustrationAtopicDermatitis from "@/assets/lesson-atopic-dermatitis.png";
import illustrationOtitis from "@/assets/lesson-otitis.png";
import illustrationSJS from "@/assets/lesson-sjs.png";
import illustrationAdaptiveImmunity from "@/assets/lesson-adaptive-immunity.png";
import illustrationAtopicDermatitis2 from "@/assets/lesson-dermatitis-psoriasis.png";
import illustrationHerpesSimplex from "@/assets/lesson-herpes-simplex.png";
import illustrationGlaucoma from "@/assets/lesson-glaucoma.png";
import illustrationCellStructure from "@/assets/anatomy-cell-structure.png";
import illustrationVitiligo from "@/assets/lesson-vitiligo.png";
import illustrationShingles from "@/assets/lesson-shingles.png";
import illustrationHomeostasis from "@/assets/anatomy-feedback-loops.png";

import illustrationPinworms from "@/assets/lesson-pinworms.png";
import illustrationHeadLice from "@/assets/lesson-head-lice.png";
import illustrationImpetigo from "@/assets/lesson-impetigo.png";
import illustrationVaricellaStages from "@/assets/lesson-varicella-stages.png";
import illustrationVaricella from "@/assets/lesson-varicella.png";
import illustrationEpiglottitis from "@/assets/lesson-epiglottitis.png";
import illustrationOsteoporosis from "@/assets/lesson-osteoporosis.png";
import illustrationKawasaki from "@/assets/lesson-kawasaki.png";
import illustrationScabies from "@/assets/lesson-scabies.png";

import illustrationMaternity from "@/assets/lesson-maternity.png";
import illustrationPediatrics from "@/assets/lesson-pediatrics.png";
import illustrationMentalHealth from "@/assets/lesson-mental-health.png";
import illustrationPharmacology from "@/assets/lesson-pharmacology.png";
import illustrationEmergency from "@/assets/lesson-emergency.png";
import illustrationAssessment from "@/assets/lesson-assessment.png";
import illustrationPainManagement from "@/assets/lesson-pain-management.png";
import illustrationPalliative from "@/assets/lesson-palliative.png";
import illustrationCommunityHealth from "@/assets/lesson-community-health.png";
import illustrationNutrition from "@/assets/lesson-nutrition.png";
import illustrationHematology from "@/assets/lesson-hematology.png";

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
  "pneumonia-basics": illustrationPneumonia,
  "pneumonia-management": illustrationPneumonia,
  "pneumonia-community": illustrationPneumonia,
  "pneumonia-hospital": illustrationPneumonia2,
  "pneumonia-aspiration": illustrationPneumonia2,
  "active-tb": illustrationTuberculosis,
  "tuberculosis": illustrationTuberculosis,
  "latent-tb": illustrationTuberculosis,
  "tb-screening": illustrationTuberculosis,
  "tracheostomy-care": illustrationTracheostomy,
  "tracheostomy": illustrationTracheostomy,
  "tracheostomy-suctioning": illustrationTracheostomy,
  "laryngectomy": illustrationTracheostomy,
  "sterile-technique": illustrationBacteria,
  "neuro-basics": illustrationNerve,
  "stroke": illustrationStroke,
  "stroke-advanced": illustrationStroke,
  "seizure-safety": illustrationNerve,
  "increased-icp": illustrationICP,
  "increased-icp-np": illustrationICP,
  "parkinsons-disease": illustrationParkinsons,
  "parkinsons": illustrationParkinsons,
  "multiple-sclerosis": illustrationMS,
  "ms-management": illustrationMS,
  "brain-abscess": illustrationBrainAbscess,
  "delirium-vs-dementia": illustrationDeliriumDementia,
  "delirium": illustrationDeliriumDementia,
  "dementia-care": illustrationDeliriumDementia,
  "cranial-nerve-assessment": illustrationCranialNerves,
  "cranial-nerves": illustrationCranialNerves,
  "trigeminal-neuralgia": illustrationTrigeminalNeuralgia,
  "carpal-tunnel": illustrationCarpalTunnel,
  "carpal-tunnel-syndrome": illustrationCarpalTunnel,
  "cerebral-edema": illustrationCerebralEdema,
  "myasthenia-gravis": illustrationMyastheniaGravis,
  "concussion": illustrationConcussion,
  "concussion-management": illustrationConcussion,
  "tbi-management": illustrationConcussion,
  "bells-palsy": illustrationBellsPalsy,
  "cp-management": illustrationCerebralEdema,
  "breast-cancer": illustrationTumor,
  "cervical-cancer": illustrationTumor,
  "prostate-cancer": illustrationTumor,
  "multiple-myeloma": illustrationTumor,
  "basal-cell-carcinoma": illustrationTumor,
  "squamous-cell-carcinoma": illustrationTumor,
  "anaphylaxis": illustrationShock,
  "compartment-syndrome": illustrationGangrene,
  "malignant-hyperthermia": illustrationShock,
  "psoriasis": illustrationAtopicDermatitis2,
  "eczema-atopic-dermatitis": illustrationAtopicDermatitis,
  "herpes-zoster-shingles": illustrationShingles,
  "ards-management": illustrationAsthma,
  "oxygen-therapy": illustrationCOPD,
  "chest-tube-care": illustrationCOPD,
  "cystic-fibrosis": illustrationCysticFibrosis,
  "cf-management": illustrationCysticFibrosis,
  "pertussis-basics": illustrationWhoopingCough,
  "whooping-cough": illustrationWhoopingCough,
  "bronchiectasis": illustrationBronchiectasis,
  "bronchiectasis-management": illustrationBronchiectasis,
  "pleurisy": illustrationPleurisy,
  "pleural-effusion": illustrationPleurisy,
  "chest-physiotherapy": illustrationChestPhysio,
  "chest-physio": illustrationChestPhysio,
  "postural-drainage": illustrationChestPhysio,
  "rsv-management": illustrationRSV,
  "rsv-bronchiolitis": illustrationRSV,
  "hemoptysis": illustrationHemoptysis,
  "hemoptysis-management": illustrationHemoptysis,
  "abg-basics": illustrationElectrolytes,
  "abg-interpretation-rn": illustrationElectrolytes,
  "contact-dermatitis": illustrationAtopicDermatitis2,
  "stevens-johnson-syndrome": illustrationSJS,
  "urticaria": illustrationAtopicDermatitis,
  "scabies": illustrationScabies,
  "impetigo": illustrationImpetigo,
  "pemphigus-vulgaris": illustrationPemphigus,
  "melanoma": illustrationTumor,
  "toxic-epidermal-necrolysis": illustrationSJS,
  "inflammatory-response": illustrationInflammatoryResponse,
  "inflammation": illustrationInflammatoryResponse,
  "retinal-detachment": illustrationRetinalDetachment,
  "pressure-injuries": illustrationPressureInjuries,
  "pressure-ulcers": illustrationPressureInjuries,
  "pressure-injury-staging": illustrationPressureInjuries,
  "bedsores": illustrationPressureInjuries,
  "innate-immunity": illustrationInnateImmunity,
  "innate-immune-system": illustrationInnateImmunity,
  "adaptive-immunity": illustrationAdaptiveImmunity,
  "adaptive-immune-system": illustrationAdaptiveImmunity,
  "immune-response": illustrationInnateImmunity,
  "conjunctivitis": illustrationConjunctivitis,
  "pink-eye": illustrationConjunctivitis,
  "aplastic-anemia": illustrationAplasticAnemia,
  "alopecia": illustrationAlopecia,
  "alopecia-areata": illustrationAlopecia,
  "hair-loss": illustrationAlopecia,
  "pemphigus": illustrationPemphigus,
  "polycythemia": illustrationPolycythemia,
  "polycythemia-vera": illustrationPolycythemia,
  "atopic-dermatitis": illustrationAtopicDermatitis,
  "eczema": illustrationAtopicDermatitis2,
  "otitis-media": illustrationOtitis,
  "otitis-externa": illustrationOtitis,
  "ear-infection": illustrationOtitis,
  "herpes-simplex": illustrationHerpesSimplex,
  "hsv": illustrationHerpesSimplex,
  "cold-sores": illustrationHerpesSimplex,
  "glaucoma": illustrationGlaucoma,
  "glaucoma-management": illustrationGlaucoma,
  "cell-structure": illustrationCellStructure,
  "cell-biology": illustrationCellStructure,
  "vitiligo": illustrationVitiligo,
  "herpes-zoster": illustrationShingles,
  "shingles": illustrationShingles,
  "varicella-zoster": illustrationShingles,
  "homeostasis": illustrationHomeostasis,
  "feedback-loops": illustrationHomeostasis,
  "homeostasis-feedback": illustrationHomeostasis,
  "pinworms": illustrationPinworms,
  "enterobiasis": illustrationPinworms,
  "head-lice": illustrationHeadLice,
  "pediculosis": illustrationHeadLice,
  "varicella": illustrationVaricella,
  "chickenpox": illustrationVaricella,
  "varicella-rash-stages": illustrationVaricellaStages,
  "epiglottitis": illustrationEpiglottitis,
  "osteoporosis": illustrationOsteoporosis,
  "osteoporosis-basics": illustrationOsteoporosis,
  "kawasaki-disease": illustrationKawasaki,
  "kawasaki": illustrationKawasaki,
  "raynauds": illustrationRaynauds,
  "raynauds-phenomenon": illustrationRaynauds,
  "varicose-veins": illustrationVaricoseVeins,
  "venous-insufficiency": illustrationVenousInsufficiency,
  "rheumatic-fever": illustrationRheumaticFever,
};

const systemImageMap: Record<string, string> = {
  "cardiovascular": illustrationCardiacCycle,
  "cardiovascular-rn": illustrationCardiacCycle,
  "cardiovascular-np": illustrationCardiacCycle,
  "cardiovascular-rpn": illustrationCardiacCycle,
  "cardiovascular-pharmacology-rpn": illustrationCardiacCycle,
  "cardiovascular-pharmacology-rn": illustrationCardiacCycle,
  "cardiovascular-pharmacology-np": illustrationCardiacCycle,

  "respiratory": illustrationCOPD,
  "respiratory-rn": illustrationCOPD,
  "respiratory-np": illustrationCOPD,
  "respiratory-rpn": illustrationCOPD,
  "respiratory-pharmacology-rpn": illustrationCOPD,
  "respiratory-pharmacology-rn": illustrationCOPD,
  "respiratory-pharmacology-np": illustrationCOPD,

  "neurological": illustrationStroke,
  "neurological-rn": illustrationStroke,
  "neurological-np": illustrationStroke,
  "neurological-rpn": illustrationStroke,
  "neuro-basics": illustrationStroke,
  "neurological-pharmacology-rpn": illustrationStroke,
  "neurological-pharmacology-rn": illustrationStroke,
  "neurological-pharmacology-np": illustrationStroke,

  "gastrointestinal": illustrationElectrolytes,
  "gastrointestinal-rn": illustrationElectrolytes,
  "gastrointestinal-np": illustrationElectrolytes,
  "gastrointestinal-rpn": illustrationElectrolytes,
  "gi-advanced": illustrationElectrolytes,
  "gi-pharmacology-rpn": illustrationElectrolytes,
  "gi-pharmacology-rn": illustrationElectrolytes,
  "gi-pharmacology-np": illustrationElectrolytes,

  "renal": illustrationKidneys,
  "renal-rpn": illustrationKidneys,
  "renal-metabolic-rn": illustrationKidneys,
  "renal-np": illustrationKidneys,
  "renal-pharmacology-rpn": illustrationKidneys,
  "renal-pharmacology-rn": illustrationKidneys,
  "renal-pharmacology-np": illustrationKidneys,

  "endocrine": illustrationHomeostasis,
  "endocrine-rpn": illustrationHomeostasis,
  "endocrine-rn": illustrationHomeostasis,
  "endocrine-np": illustrationHomeostasis,
  "endocrine-pharmacology-rpn": illustrationHomeostasis,
  "endocrine-pharmacology-rn": illustrationHomeostasis,
  "endocrine-pharmacology-np": illustrationHomeostasis,

  "hematology": illustrationHematology,
  "hematology-rpn": illustrationHematology,
  "hematology-rn": illustrationHematology,
  "hematology-np": illustrationHematology,
  "hematology-oncology-rpn": illustrationHematology,
  "hematology-pharmacology-rpn": illustrationHematology,

  "musculoskeletal": illustrationOsteoporosis,
  "musculoskeletal-rpn": illustrationOsteoporosis,
  "musculoskeletal-rn": illustrationOsteoporosis,
  "musculoskeletal-np": illustrationOsteoporosis,
  "orthopedic-rpn": illustrationOsteoporosis,

  "immune": illustrationInflammatoryResponse,
  "immune-system": illustrationInflammatoryResponse,
  "immune-system-rpn": illustrationInflammatoryResponse,
  "immune-rn": illustrationInflammatoryResponse,
  "immune-np": illustrationInflammatoryResponse,
  "autoimmune-rheumatology-np": illustrationInflammatoryResponse,

  "maternity": illustrationMaternity,
  "maternity-rn": illustrationMaternity,
  "maternity-np": illustrationMaternity,
  "maternity-rpn": illustrationMaternity,
  "maternity-pharmacology-rpn": illustrationMaternity,
  "maternity-pharmacology-rn": illustrationMaternity,
  "maternity-pharmacology-np": illustrationMaternity,
  "postpartum-neonatal-rpn": illustrationMaternity,

  "pediatrics": illustrationPediatrics,
  "pediatrics-rn": illustrationPediatrics,
  "pediatrics-np": illustrationPediatrics,
  "pediatrics-rpn": illustrationPediatrics,
  "pediatric-pharmacology-rpn": illustrationPediatrics,
  "pediatric-pharmacology-rn": illustrationPediatrics,
  "pediatric-pharmacology-np": illustrationPediatrics,
  "neonatal-rpn": illustrationPediatrics,

  "mental-health": illustrationMentalHealth,
  "mental-health-rn": illustrationMentalHealth,
  "mental-health-np": illustrationMentalHealth,
  "mental-health-rpn": illustrationMentalHealth,
  "psychiatric-pharmacology-rpn": illustrationMentalHealth,
  "psychiatric-pharmacology-rn": illustrationMentalHealth,
  "psychiatric-pharmacology-np": illustrationMentalHealth,

  "oncology": illustrationTumor,
  "oncology-rn": illustrationTumor,
  "oncology-np": illustrationTumor,
  "oncology-rpn": illustrationTumor,
  "oncology-pharmacology-rpn": illustrationTumor,
  "oncology-pharmacology-rn": illustrationTumor,
  "oncology-pharmacology-np": illustrationTumor,

  "pharmacology": illustrationPharmacology,
  "pharmacology-core-rpn": illustrationPharmacology,
  "pharmacology-core-rn": illustrationPharmacology,
  "pharmacology-core-np": illustrationPharmacology,
  "analgesic-pharmacology-rpn": illustrationPharmacology,

  "fundamentals-core": illustrationBacteria,
  "fundamentals": illustrationBacteria,
  "nursing-fundamentals-rpn": illustrationBacteria,

  "emergency": illustrationEmergency,
  "emergency-rn": illustrationEmergency,
  "emergency-np": illustrationEmergency,
  "emergency-rpn": illustrationEmergency,
  "clinical-scenarios": illustrationEmergency,
  "clinical-scenarios-rpn": illustrationEmergency,
  "critical-care-advanced-np": illustrationEmergency,

  "heent-skin-rpn": illustrationAtopicDermatitis2,
  "eye-ear": illustrationGlaucoma,
  "eye-ear-rpn": illustrationGlaucoma,
  "sensory-np": illustrationGlaucoma,

  "wound-care-rpn": illustrationWound,
  "skin-infections-rpn": illustrationScabies,

  "delegation-core": illustrationAssessment,
  "delegation": illustrationAssessment,

  "infection-control-rpn": illustrationVirus,
  "infection-control": illustrationVirus,

  "pain-management-rpn": illustrationPainManagement,
  "pain-management": illustrationPainManagement,

  "palliative-eol-rpn": illustrationPalliative,
  "palliative": illustrationPalliative,

  "community-health-rpn": illustrationCommunityHealth,
  "community": illustrationCommunityHealth,

  "cell-structure": illustrationCellStructure,
  "cell-biology": illustrationCellStructure,
  "feedback-loops": illustrationHomeostasis,
  "homeostasis": illustrationHomeostasis,

  "reproductive": illustrationMaternity,

  "assessment-rpn": illustrationAssessment,
  "assessment": illustrationAssessment,

  "nutrition-rpn": illustrationNutrition,
  "lab-fundamentals-rpn": illustrationKidneys,
  "vaccines-rpn": illustrationVirus,

  "rare-genetic-disorders-np": illustrationCellStructure,
  "toxicology-np": illustrationShock,
  "advanced-diagnostics-np": illustrationAssessment,
  "advanced-pharmacology-np": illustrationPharmacology,
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
  if (lessonId.includes("parkinson")) return illustrationParkinsons;
  if (lessonId.includes("multiple-sclerosis") || lessonId === "ms-management") return illustrationMS;
  if (lessonId.includes("stroke")) return illustrationStroke;
  if (lessonId.includes("bells-palsy")) return illustrationBellsPalsy;
  if (lessonId.includes("myasthenia")) return illustrationMyastheniaGravis;
  if (lessonId.includes("concussion") || lessonId.includes("tbi")) return illustrationConcussion;
  if (lessonId.includes("carpal-tunnel")) return illustrationCarpalTunnel;
  if (lessonId.includes("trigeminal")) return illustrationTrigeminalNeuralgia;
  if (lessonId.includes("cranial-nerve")) return illustrationCranialNerves;
  if (lessonId.includes("delirium") || lessonId.includes("dementia")) return illustrationDeliriumDementia;
  if (lessonId.includes("cerebral-edema")) return illustrationCerebralEdema;
  if (lessonId.includes("brain-abscess")) return illustrationBrainAbscess;
  if (lessonId.includes("icp")) return illustrationICP;
  if (lessonId.includes("cystic-fibrosis") || lessonId === "cf-management") return illustrationCysticFibrosis;
  if (lessonId.includes("pertussis") || lessonId.includes("whooping")) return illustrationWhoopingCough;
  if (lessonId.includes("bronchiect")) return illustrationBronchiectasis;
  if (lessonId.includes("pleurisy") || lessonId.includes("pleural-effusion")) return illustrationPleurisy;
  if (lessonId.includes("chest-physio") || lessonId.includes("postural-drainage")) return illustrationChestPhysio;
  if (lessonId.includes("rsv")) return illustrationRSV;
  if (lessonId.includes("hemoptysis")) return illustrationHemoptysis;
  if (lessonId.includes("inflammat")) return illustrationInflammatoryResponse;
  if (lessonId.includes("retinal-detach")) return illustrationRetinalDetachment;
  if (lessonId.includes("pressure-injur") || lessonId.includes("pressure-ulcer") || lessonId.includes("bedsore")) return illustrationPressureInjuries;
  if (lessonId.includes("innate-immun")) return illustrationInnateImmunity;
  if (lessonId.includes("adaptive-immun")) return illustrationAdaptiveImmunity;
  if (lessonId.includes("conjunctiv") || lessonId.includes("pink-eye")) return illustrationConjunctivitis;
  if (lessonId.includes("aplastic")) return illustrationAplasticAnemia;
  if (lessonId.includes("alopecia") || lessonId.includes("hair-loss")) return illustrationAlopecia;
  if (lessonId.includes("pemphigus")) return illustrationPemphigus;
  if (lessonId.includes("polycythem")) return illustrationPolycythemia;
  if (lessonId.includes("atopic") || lessonId.includes("eczema")) return illustrationAtopicDermatitis;
  if (lessonId.includes("otitis") || lessonId.includes("ear-infect")) return illustrationOtitis;
  if (lessonId.includes("herpes-simplex") || lessonId.includes("hsv") || lessonId.includes("cold-sore")) return illustrationHerpesSimplex;
  if (lessonId.includes("glaucoma")) return illustrationGlaucoma;
  if (lessonId.includes("vitiligo")) return illustrationVitiligo;
  if (lessonId.includes("shingles") || lessonId.includes("herpes-zoster") || lessonId.includes("varicella-zoster")) return illustrationShingles;
  if (lessonId.includes("stevens-johnson") || lessonId.includes("sjs")) return illustrationSJS;
  if (lessonId.includes("cell-struct") || lessonId.includes("cell-bio")) return illustrationCellStructure;
  if (lessonId.includes("homeostasis") || lessonId.includes("feedback-loop")) return illustrationHomeostasis;
  if (lessonId.includes("pinworm") || lessonId.includes("enterobias")) return illustrationPinworms;
  if (lessonId.includes("head-lice") || lessonId.includes("pediculosis")) return illustrationHeadLice;
  if (lessonId.includes("impetigo")) return illustrationImpetigo;
  if (lessonId.includes("varicella") || lessonId.includes("chickenpox")) return illustrationVaricella;
  if (lessonId.includes("epiglottitis")) return illustrationEpiglottitis;
  if (lessonId.includes("osteoporosis")) return illustrationOsteoporosis;
  if (lessonId.includes("kawasaki")) return illustrationKawasaki;
  if (lessonId.includes("scabies")) return illustrationScabies;
  if (lessonId.includes("raynaud")) return illustrationRaynauds;
  if (lessonId.includes("varicose")) return illustrationVaricoseVeins;
  if (lessonId.includes("venous-insuff")) return illustrationVenousInsufficiency;
  if (lessonId.includes("endocarditis")) return illustrationEndocarditis;
  if (lessonId.includes("rheumatic")) return illustrationRheumaticFever;
  if (lessonId.includes("shock") || lessonId.includes("dysrhythmia")) return illustrationShock;
  if (lessonId.includes("copd") || lessonId.includes("emphysema")) return illustrationCOPD;
  if (lessonId.includes("asthma")) return illustrationAsthma;
  if (lessonId.includes("pneumonia")) return illustrationPneumonia;
  if (lessonId.includes("tuberculosis") || lessonId.includes("tb-")) return illustrationTuberculosis;
  if (lessonId.includes("tracheostomy")) return illustrationTracheostomy;
  if (lessonId.includes("kidney") || lessonId.includes("renal") || lessonId.includes("dialysis") || lessonId.includes("crrt")) return illustrationKidneys;
  if (lessonId.includes("electrolyte") || lessonId.includes("acid-base")) return illustrationElectrolytes;
  if (lessonId.includes("tumor") || lessonId.includes("cancer") || lessonId.includes("chemo") || lessonId.includes("oncol")) return illustrationTumor;
  if (lessonId.includes("wound") || lessonId.includes("burn") || lessonId.includes("cellulitis")) return illustrationWound;
  if (lessonId.includes("bacteria") || lessonId.includes("infection")) return illustrationBacteria;
  if (lessonId.includes("virus") || lessonId.includes("viral")) return illustrationVirus;
  if (lessonId.includes("maternity") || lessonId.includes("pregnan") || lessonId.includes("postpartum")) return illustrationMaternity;
  if (lessonId.includes("pediatr") || lessonId.includes("neonat")) return illustrationPediatrics;
  if (lessonId.includes("mental") || lessonId.includes("psych") || lessonId.includes("anxiety") || lessonId.includes("depress")) return illustrationMentalHealth;
  if (lessonId.includes("pharmacol") || lessonId.includes("drug") || lessonId.includes("medicat")) return illustrationPharmacology;
  if (lessonId.includes("emergenc") || lessonId.includes("critical") || lessonId.includes("triage")) return illustrationEmergency;
  if (lessonId.includes("pain")) return illustrationPainManagement;
  if (lessonId.includes("palliat") || lessonId.includes("end-of-life") || lessonId.includes("hospice")) return illustrationPalliative;
  if (lessonId.includes("communit") || lessonId.includes("public-health")) return illustrationCommunityHealth;
  if (lessonId.includes("nutrit") || lessonId.includes("diet")) return illustrationNutrition;
  return undefined;
}
