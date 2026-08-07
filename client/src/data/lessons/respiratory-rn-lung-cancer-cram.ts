import { respiratoryLessons } from "./respiratory";

export interface RnLungCancerCramLesson {
  id: string;
  fullLessonKey: string;
  tier: "rn";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  exam: "NCLEX-RN";
  bodySystem: "Respiratory";
  topic: "Lung Cancer";
  title: string;
  bottomLine: string;
  mechanism: string[];
  recognize: string[];
  diagnosticsMonitoring: string[];
  priorityActions: string[];
  medicationSafety: string[];
  redFlags: string[];
  complications: string[];
  examTraps: string[];
  rapidReview: string[];
  sourceBasis: string[];
  sourceAsOf: "2026-08";
}

const lungCancerMatches = Object.entries(respiratoryLessons).filter(([key, lesson]) =>
  `${key} ${lesson.title}`.toLowerCase().includes("lung cancer")
);

if (lungCancerMatches.length !== 1) {
  throw new Error(
    `RN_LUNG_CANCER_FULL_RESOLUTION_INVALID: expected 1 Lung Cancer Full lesson, found ${lungCancerMatches.length}: ${lungCancerMatches.map(([key]) => key).join(",")}`
  );
}

export const rnLungCancerResolvedFullLessonKey = lungCancerMatches[0][0];

export const rnLungCancerCramLessons: RnLungCancerCramLesson[] = [
  {
    id: "cram-rn-ca-lung-cancer-20260807",
    fullLessonKey: rnLungCancerResolvedFullLessonKey,
    tier: "rn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Lung Cancer",
    title: "Lung Cancer — RN Canada Cram",
    bottomLine:
      "Lung-cancer nursing care spans early recognition, diagnosis/staging, treatment toxicity, emergency complication recognition, postoperative respiratory recovery, and symptom-focused care. Screening pathways apply to eligible asymptomatic high-risk adults; hemoptysis, persistent cough change, weight loss, or other red-flag symptoms require diagnostic evaluation rather than waiting for screening.",
    mechanism: [
      "Lung cancers arise from malignant transformation of bronchopulmonary cells and are broadly divided into non-small-cell and small-cell disease because biology, spread, and treatment pathways differ.",
      "Local tumour effects can obstruct bronchi, invade pleura/chest wall, compress the superior vena cava, or cause bleeding; metastatic spread commonly involves brain, bone, liver, and adrenal sites.",
      "Some tumours produce paraneoplastic syndromes, including SIADH in small-cell lung cancer and PTH-related-peptide hypercalcemia in squamous-cell disease."
    ],
    recognize: [
      "Red flags include a new or changing persistent cough, hemoptysis, unexplained weight loss, progressive dyspnea, chest pain, recurrent focal pneumonia, hoarseness, or unexplained constitutional decline.",
      "Superior vena cava syndrome: facial/neck/upper-extremity swelling, distended chest veins, dyspnea, headache, or neurologic symptoms from impaired venous return.",
      "Brain metastasis warning signs include new seizure, focal deficit, severe headache, vomiting, or altered mental status.",
      "Pancoast/apical tumour involvement can cause severe shoulder/arm pain with Horner syndrome."
    ],
    diagnosticsMonitoring: [
      "Eligible asymptomatic high-risk adults may enter an organized low-dose CT screening pathway according to current provincial/program criteria; symptomatic patients need diagnostic evaluation instead.",
      "Diagnosis generally requires imaging plus tissue/pathologic confirmation and staging before treatment selection.",
      "Appropriate advanced non-small-cell lung cancer requires molecular biomarker testing and other predictive markers because actionable alterations can change systemic therapy.",
      "Monitor therapy-specific toxicity: blood counts/infection risk with cytotoxic chemotherapy, respiratory symptoms with immunotherapy or thoracic radiation, and agent-specific laboratory/interactions with targeted therapy.",
      "After biopsy or thoracic procedures, monitor for pneumothorax, bleeding, hypoxemia, and respiratory deterioration."
    ],
    priorityActions: [
      "Escalate major hemoptysis immediately because airway flooding and hypoxemia can become lethal before blood-loss shock develops.",
      "Treat new focal neurologic deficits/seizure as an urgent intracranial-metastasis complication until evaluated.",
      "Escalate suspected superior vena cava syndrome promptly, especially when respiratory or neurologic compromise is developing.",
      "After lung resection, use effective prescribed analgesia, pulmonary hygiene, coughing/deep breathing, early mobility, and close oxygenation/drain monitoring to reduce postoperative pulmonary complications.",
      "For recurrent malignant pleural effusion, support symptom-directed pleural management based on lung expandability, recurrence, prognosis, and patient goals."
    ],
    medicationSafety: [
      "Cytotoxic therapy can produce myelosuppression; fever with significant neutropenia requires urgent assessment rather than routine follow-up.",
      "Checkpoint inhibitors can cause immune-mediated pneumonitis, colitis, hepatitis, endocrinopathies, and other organ toxicity; new respiratory or severe systemic symptoms require prompt oncology assessment.",
      "Oral targeted therapies remain high-risk medications: adherence, missed-dose instructions, drug/food interactions, acid-suppressant effects where relevant, and agent-specific toxicities must be reviewed.",
      "Thoracic radiation can cause esophagitis acutely and radiation pneumonitis later; progressive cough/dyspnea after treatment warrants assessment rather than being labelled expected fatigue.",
      "Pain, dyspnea, nausea, cough, and anxiety deserve active symptom management throughout curative and palliative treatment."
    ],
    redFlags: [
      "Massive or rapidly increasing hemoptysis",
      "Facial/neck swelling with dyspnea, headache, or neurologic symptoms suggesting SVC obstruction",
      "New seizure or focal neurologic deficit",
      "Fever during significant neutropenia",
      "New hypoxemia/cough on checkpoint therapy or after thoracic radiation"
    ],
    complications: [
      "Superior vena cava syndrome and central-airway obstruction",
      "Brain/bone/other metastatic complications",
      "SIADH or malignancy-associated hypercalcemia",
      "Malignant pleural effusion and non-expandable lung",
      "Treatment-related pneumonitis, myelosuppression/infection, and postoperative pulmonary complications"
    ],
    examTraps: [
      "Using screening eligibility rules to deny diagnostic workup to a symptomatic patient.",
      "Assuming every lung cancer receives the same chemotherapy rather than stage-, histology-, and biomarker-directed treatment.",
      "Missing immune-related pneumonitis because the patient is receiving cancer therapy and infection seems more familiar.",
      "Treating massive hemoptysis as a blood-loss problem only instead of an airway emergency.",
      "Withholding adequate postoperative analgesia and thereby worsening splinting, atelectasis, and secretion retention."
    ],
    rapidReview: [
      "Screen eligible asymptomatic high-risk adults with the current organized LDCT pathway; symptoms need diagnosis now.",
      "SVC syndrome, massive hemoptysis, seizure/focal neuro deficit, and febrile neutropenia are urgent.",
      "Advanced NSCLC: think histology + stage + biomarkers/predictive markers.",
      "Immunotherapy: new cough/dyspnea can be pneumonitis; severe diarrhea can be immune colitis.",
      "After thoracic surgery: pain control + lung expansion + secretion clearance + mobility."
    ],
    sourceBasis: [
      "Current Canadian provincial/organized lung-cancer screening and diagnostic pathways",
      "Current Canadian lung-cancer treatment pathways including biomarker-directed therapy",
      "NCSBN 2026 NCLEX-RN Test Plan"
    ],
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-rn-us-lung-cancer-20260807",
    fullLessonKey: rnLungCancerResolvedFullLessonKey,
    tier: "rn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Lung Cancer",
    title: "Lung Cancer — RN U.S. Cram",
    bottomLine:
      "Lung-cancer care is stage-, histology-, and biomarker-driven. The RN distinguishes screening from diagnostic evaluation, identifies oncologic emergencies early, protects patients from treatment toxicity, and supports postoperative and palliative respiratory function. Current U.S. LDCT screening criteria apply to eligible asymptomatic high-risk adults; symptoms such as hemoptysis require diagnostic workup regardless of screening eligibility.",
    mechanism: [
      "Non-small-cell and small-cell lung cancers differ in growth pattern, metastatic behaviour, and typical treatment strategy.",
      "Local growth can obstruct airways, invade chest wall/pleura, bleed, compress the SVC, or cause recurrent post-obstructive infection; distant spread commonly affects brain, bone, liver, and adrenal glands.",
      "Tumour biology can produce actionable molecular targets or paraneoplastic syndromes that directly change therapy and nursing surveillance."
    ],
    recognize: [
      "Evaluate persistent or changing cough, hemoptysis, unexplained weight loss, recurrent focal infection, chest pain, hoarseness, or progressive dyspnea as possible malignancy symptoms.",
      "SVC syndrome causes facial/upper-extremity edema, venous distension, dyspnea, headache, and potentially airway or neurologic compromise.",
      "New seizure, focal neurologic deficit, or acute severe headache can reflect brain metastasis, edema, or hemorrhage.",
      "Apical/Pancoast tumours may cause shoulder-arm pain and Horner syndrome."
    ],
    diagnosticsMonitoring: [
      "Current U.S. screening uses annual low-dose CT for adults meeting current high-risk eligibility criteria; symptomatic patients require diagnostic evaluation instead of a screening pathway.",
      "Diagnosis and treatment planning require pathologic confirmation and staging; stage determines whether treatment is local, systemic, or multimodal.",
      "Appropriate advanced NSCLC should undergo guideline-directed molecular and predictive biomarker testing because targeted therapy or immunotherapy selection may depend on results.",
      "Monitor CBC and infection risk with myelosuppressive therapy, respiratory status with immunotherapy/radiation, and drug-specific laboratory/interactions with oral targeted agents.",
      "Monitor after bronchoscopy/needle biopsy/resection for pneumothorax, bleeding, hypoxemia, arrhythmia, pain-related splinting, and secretion retention."
    ],
    priorityActions: [
      "Massive hemoptysis: activate emergency airway/hemorrhage management immediately.",
      "New focal neurologic deficits or seizure: escalate urgently for intracranial metastatic complications.",
      "Suspected SVC syndrome: escalate promptly and protect airway/hemodynamic/neurologic status.",
      "Post-lung-resection care includes effective analgesia, pulmonary hygiene, early mobility, oxygenation monitoring, and pleural-drain surveillance when present.",
      "Recurrent malignant pleural effusion is treated according to symptoms, lung expansion, prognosis, and goals using durable pleural strategies when appropriate."
    ],
    medicationSafety: [
      "Febrile neutropenia after myelosuppressive therapy is an emergency requiring rapid evaluation and antimicrobial management.",
      "Immune-checkpoint therapy can cause pneumonitis and severe extra-pulmonary immune toxicities such as colitis; do not dismiss new organ symptoms as routine treatment effects.",
      "Oral targeted therapies require high-reliability adherence, interaction review, agent-specific monitoring, and precise missed-dose instructions.",
      "Thoracic radiation can cause acute esophageal injury and delayed pneumonitis/fibrotic injury; new respiratory symptoms require assessment.",
      "Analgesia and symptom management are part of respiratory safety, especially after surgery and in advanced disease."
    ],
    redFlags: [
      "Massive hemoptysis or airway flooding",
      "SVC syndrome with respiratory or neurologic compromise",
      "New seizure/focal neurologic deficit",
      "Fever during profound neutropenia",
      "New cough, dyspnea, hypoxemia, or diffuse inflammatory infiltrates during checkpoint therapy"
    ],
    complications: [
      "Central-airway or SVC obstruction",
      "Brain and bone metastases",
      "SIADH, PTHrP-mediated hypercalcemia, and other paraneoplastic syndromes",
      "Malignant pleural effusion",
      "Immune-mediated toxicity, radiation pneumonitis, chemotherapy infection risk, and postoperative pulmonary complications"
    ],
    examTraps: [
      "Confusing USPSTF screening criteria with criteria for diagnostic evaluation of symptoms.",
      "Assuming early localized NSCLC and small-cell disease follow the same surgical pathway.",
      "Missing targeted-therapy interaction risk because the anticancer drug is oral.",
      "Assuming new cough on checkpoint therapy is automatically infection.",
      "Calling a normal postoperative oxygen saturation reassuring while pain prevents deep breathing and cough."
    ],
    rapidReview: [
      "Eligible asymptomatic high-risk U.S. adults: LDCT screening; symptoms: diagnostic workup.",
      "Treatment = histology + stage + molecular/predictive markers + patient factors.",
      "SVC, massive hemoptysis, brain symptoms, and febrile neutropenia are emergencies.",
      "Checkpoint therapy can cause pneumonitis/colitis; targeted oral drugs have real interactions.",
      "Thoracic surgery recovery depends on analgesia, pulmonary hygiene, and mobility."
    ],
    sourceBasis: [
      "USPSTF current Lung Cancer Screening Recommendation",
      "NCI PDQ current Non-Small Cell and Small Cell Lung Cancer Treatment information",
      "NCSBN 2026 NCLEX-RN Test Plan"
    ],
    sourceAsOf: "2026-08"
  }
];

if (rnLungCancerCramLessons.length !== 2) {
  throw new Error(`RN_LUNG_CANCER_CRAM_COUNT_INVALID:${rnLungCancerCramLessons.length}`);
}

for (const cram of rnLungCancerCramLessons) {
  for (const [field, values] of Object.entries({
    mechanism: cram.mechanism,
    recognize: cram.recognize,
    diagnosticsMonitoring: cram.diagnosticsMonitoring,
    priorityActions: cram.priorityActions,
    medicationSafety: cram.medicationSafety,
    redFlags: cram.redFlags,
    complications: cram.complications,
    examTraps: cram.examTraps,
    rapidReview: cram.rapidReview
  })) {
    if (values.length < 2 || values.some((value) => !value.trim())) {
      throw new Error(`RN_LUNG_CANCER_CRAM_FIELD_INVALID:${cram.countryCode}/${field}`);
    }
  }
  if (cram.sourceBasis.length < 2) {
    throw new Error(`RN_LUNG_CANCER_CRAM_SOURCES_MISSING:${cram.countryCode}`);
  }
}

export function getRnLungCancerCram(countryCode: "CA" | "US") {
  return rnLungCancerCramLessons.find((cram) => cram.countryCode === countryCode);
}
