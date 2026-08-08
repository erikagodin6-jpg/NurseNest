import { respiratoryLessons } from "./respiratory";

export interface RnCysticFibrosisCramLesson {
  id: string;
  fullLessonKey: string;
  tier: "rn";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  exam: "NCLEX-RN";
  bodySystem: "Respiratory";
  topic: "Cystic Fibrosis";
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

const matches = Object.entries(respiratoryLessons).filter(([key, lesson]) =>
  `${key} ${lesson.title}`.toLowerCase().includes("cystic fibrosis"),
);
if (matches.length !== 1) {
  throw new Error(
    `RN_CF_FULL_RESOLUTION_INVALID: expected 1 Cystic Fibrosis Full lesson, found ${matches.length}: ${matches.map(([key]) => key).join(",")}`,
  );
}
export const rnCysticFibrosisResolvedFullLessonKey = matches[0][0];

export const rnCysticFibrosisCramLessons: RnCysticFibrosisCramLesson[] = [
  {
    id: "cram-rn-ca-cystic-fibrosis-20260807",
    fullLessonKey: rnCysticFibrosisResolvedFullLessonKey,
    tier: "rn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Cystic Fibrosis",
    title: "Cystic Fibrosis — RN Canada Cram",
    bottomLine:
      "Cystic fibrosis is a multisystem CFTR disorder. RN priorities are airway clearance and infection control, nutrition/pancreatic support, genotype-directed CFTR-modulator safety, rapid recognition of pulmonary exacerbation and major complications, and early escalation for hemoptysis, pneumothorax, obstruction, or advanced lung disease.",
    mechanism: [
      "Defective CFTR chloride/bicarbonate transport dehydrates epithelial secretions, impairing mucociliary clearance and promoting chronic infection, inflammation, bronchiectasis, and progressive airflow limitation.",
      "Pancreatic duct obstruction causes exocrine pancreatic insufficiency, maldigestion, steatorrhea, poor weight gain, and fat-soluble vitamin deficiency in many patients.",
      "CF also affects sweat glands, GI tract, endocrine pancreas, sinuses, hepatobiliary system, and reproductive function; adult nursing care must remain multisystem.",
    ],
    recognize: [
      "Pulmonary exacerbation: increased cough/sputum, reduced exercise tolerance, fatigue, appetite/weight change, and a meaningful fall from the patient's baseline lung function.",
      "Major hemoptysis, sudden unilateral pleuritic pain/dyspnea, or abrupt oxygenation decline are emergency complications rather than routine exacerbation findings.",
      "Greasy stools, poor weight gain, vitamin deficiency, or persistent GI symptoms suggest inadequate pancreatic/nutritional support or another CF GI complication.",
      "Hyperglycemia with weight or pulmonary decline should trigger assessment for cystic-fibrosis-related diabetes.",
    ],
    diagnosticsMonitoring: [
      "Trend symptoms, weight/BMI or growth, pulmonary function, oxygenation, respiratory cultures, and exacerbation frequency against the patient's personal baseline.",
      "Monitor liver tests and clinically important drug interactions for CFTR modulators according to the prescribed regimen.",
      "Evaluate pancreatic-enzyme effectiveness through stool pattern, weight trajectory, intake, timing/dose adherence, and nutrition review.",
      "Assess for CFRD, bone disease, liver disease, and advanced-lung-disease complications through the specialized CF program.",
    ],
    priorityActions: [
      "Maintain the individualized airway-clearance and inhaled-therapy sequence; do not combine nebulized drugs unless compatibility is specifically established.",
      "Use CF-specific infection prevention to reduce cross-transmission between unrelated patients with CF.",
      "Coordinate pancreatic enzymes with meals/snacks, energy-dense nutrition, fat-soluble vitamin replacement, hydration, and salt planning as prescribed.",
      "Escalate meaningful symptom/lung-function decline promptly to the CF team for culture-directed exacerbation management.",
      "Discuss transplant evaluation before end-stage deterioration when progressive advanced CF lung disease makes referral appropriate.",
    ],
    medicationSafety: [
      "Pancreatic enzymes must accompany food; excessive dosing is unsafe and has been associated with fibrosing colonopathy.",
      "Highly effective CFTR modulators can substantially improve CFTR function in eligible genotypes but are not a cure; liver monitoring and CYP3A interaction review remain important.",
      "Chronic inhaled antipseudomonal therapy may suppress airway bacterial burden in selected patients but does not replace airway clearance or all systemic treatment during exacerbations.",
      "During major hemoptysis or pneumothorax, routine aggressive airway-clearance techniques may need to be temporarily modified while the emergency is treated.",
    ],
    redFlags: [
      "Large-volume or ongoing hemoptysis, hypoxemia, or hemodynamic compromise",
      "Sudden unilateral chest pain/dyspnea with reduced breath sounds suggesting pneumothorax",
      "Rapidly worsening respiratory symptoms or major fall from baseline lung function",
      "Severe abdominal pain/distension, vomiting, or reduced stool output suggesting distal intestinal obstruction syndrome",
      "Progressive respiratory failure or rapid decline that may narrow the transplant window",
    ],
    complications: [
      "Bronchiectasis with chronic/resistant airway infection and recurrent pulmonary exacerbations",
      "Major hemoptysis and pneumothorax",
      "Pancreatic insufficiency, malnutrition, fat-soluble vitamin deficiency, and distal intestinal obstruction syndrome",
      "Cystic-fibrosis-related diabetes and CF-related liver/bone disease",
      "Advanced respiratory failure requiring transplant evaluation",
    ],
    examTraps: [
      "Treating CF as only a pediatric lung disease instead of a lifelong multisystem disorder.",
      "Stopping all airway/nutrition care automatically because a CFTR modulator was started.",
      "Giving pancreatic enzymes without food or escalating enzyme doses without regard to safe limits.",
      "Continuing vigorous percussion unchanged during major hemoptysis or suspected pneumothorax.",
      "Allowing unrelated people with CF to share close clinical space because 'they already have the same disease'.",
    ],
    rapidReview: [
      "CFTR defect → dehydrated secretions → impaired clearance → infection/inflammation/bronchiectasis.",
      "Airway clearance + culture-aware infection management remain core.",
      "PERT with food + high-energy nutrition + ADEK support when indicated.",
      "CFTR modulators are genotype-directed and require safety monitoring.",
      "Hemoptysis, pneumothorax, DIOS, CFRD, and advanced lung failure are high-yield complications.",
    ],
    sourceBasis: [
      "Cystic Fibrosis Canada multidisciplinary care resources",
      "Cystic Fibrosis Foundation evidence-based clinical care guidelines",
      "NCSBN 2026 NCLEX-RN Test Plan",
    ],
    sourceAsOf: "2026-08",
  },
  {
    id: "cram-rn-us-cystic-fibrosis-20260807",
    fullLessonKey: rnCysticFibrosisResolvedFullLessonKey,
    tier: "rn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Cystic Fibrosis",
    title: "Cystic Fibrosis — RN U.S. Cram",
    bottomLine:
      "Modern CF care combines airway-clearance/infection management, pancreatic and nutrition support, CFTR genotype-directed therapy, screening for adult multisystem complications, and rapid escalation for major hemoptysis, pneumothorax, obstruction, or progressive respiratory failure.",
    mechanism: [
      "Abnormal CFTR ion transport dehydrates airway-surface liquid and other epithelial secretions, causing difficult mucus clearance, chronic infection/inflammation, and bronchiectasis.",
      "Exocrine pancreatic obstruction produces pancreatic insufficiency and malabsorption in many patients; CF-related endocrine/GI/hepatobiliary disease becomes increasingly important with longer survival.",
      "Highly effective modulator therapy improves channel function in eligible variants but does not erase existing structural disease or eliminate the need for specialized follow-up.",
    ],
    recognize: [
      "A pulmonary exacerbation may be signaled by increased cough/sputum, fatigue, appetite/weight decline, exercise intolerance, and a fall in FEV1 from personal baseline.",
      "Sudden pleuritic pain/unilateral breath-sound loss suggests pneumothorax; brisk hemoptysis with desaturation is an airway/bleeding emergency.",
      "Steatorrhea or poor weight gain despite PERT requires reassessment of dose/timing/adherence and other GI causes.",
      "Persistent hyperglycemia or unexplained weight/pulmonary decline can reflect CFRD.",
    ],
    diagnosticsMonitoring: [
      "Trend pulmonary function, respiratory cultures, symptom trajectory, weight/nutrition, oxygenation, and exacerbation frequency longitudinally.",
      "Review genotype eligibility, liver safety, and CYP3A interactions when CFTR modulators are used.",
      "Use multidisciplinary CF screening for diabetes, bone disease, liver disease, nutrition deficiencies, and transplant timing.",
      "Interpret microbiology longitudinally because chronic organisms influence suppressive and exacerbation-treatment strategy.",
    ],
    priorityActions: [
      "Keep the patient's prescribed airway-clearance/inhaled-therapy sequence and verify device technique/compatibility.",
      "Use CF-center infection-prevention practices that reduce cross-transmission between patients with CF.",
      "Coordinate PERT with food, adequate calories/protein/fat, vitamins, hydration, and salt replacement as prescribed.",
      "Escalate significant pulmonary decline promptly for culture-informed exacerbation treatment.",
      "Protect transplant options through timely referral when advanced progressive lung disease develops.",
    ],
    medicationSafety: [
      "Pancreatic enzymes are meal/snack-linked replacement therapy; very high doses can cause fibrosing colonopathy.",
      "Elexacaftor/tezacaftor/ivacaftor-type regimens require genotype eligibility, liver monitoring, and interaction review; they are not antibiotics or a cure.",
      "Inhaled antipseudomonal therapy can suppress chronic airway infection but does not replace systemic treatment when a severe exacerbation requires it.",
      "Modify airway-clearance intensity during major hemoptysis or pneumothorax according to the emergency/specialty plan.",
    ],
    redFlags: [
      "Major hemoptysis or worsening oxygenation",
      "Sudden unilateral pain/dyspnea or absent breath sounds",
      "Rapid lung-function decline or severe exacerbation",
      "Obstructive abdominal symptoms consistent with DIOS",
      "Progressive respiratory failure or rapidly shrinking transplant eligibility",
    ],
    complications: [
      "Chronic Pseudomonas/other difficult airway infection and bronchiectasis",
      "Pneumothorax and major hemoptysis",
      "Pancreatic insufficiency, vitamin deficiency, malnutrition, and DIOS",
      "CFRD, liver disease, and reduced bone health",
      "End-stage lung disease requiring transplant consideration",
    ],
    examTraps: [
      "Assuming CFTR modulators cure CF or work for every genotype.",
      "Mixing all nebulized therapies together for convenience without compatibility guidance.",
      "Using pancreatic enzymes as PRN antidiarrheal medicine instead of with nutrient exposure.",
      "Continuing forceful vest/percussion therapy unchanged during major hemoptysis.",
      "Ignoring cross-infection precautions because CF itself is genetic rather than contagious.",
    ],
    rapidReview: [
      "CF = inherited epithelial ion-transport disease with pulmonary + pancreatic + GI/endocrine consequences.",
      "Clear mucus, manage chronic infection, and trend FEV1/symptoms against baseline.",
      "PERT + nutrition + ADEK support when pancreatic insufficiency is present.",
      "Modulators are genotype-specific, powerful, and monitored—not curative.",
      "Major hemoptysis/pneumothorax/DIOS/advanced lung failure require urgent or specialty escalation.",
    ],
    sourceBasis: [
      "Cystic Fibrosis Foundation evidence-based clinical care guidelines",
      "Current FDA prescribing information for CFTR modulators",
      "NCSBN 2026 NCLEX-RN Test Plan",
    ],
    sourceAsOf: "2026-08",
  },
];

if (rnCysticFibrosisCramLessons.length !== 2) {
  throw new Error(`RN_CF_CRAM_COUNT_INVALID:${rnCysticFibrosisCramLessons.length}`);
}
for (const cram of rnCysticFibrosisCramLessons) {
  for (const [field, values] of Object.entries({
    mechanism: cram.mechanism,
    recognize: cram.recognize,
    diagnosticsMonitoring: cram.diagnosticsMonitoring,
    priorityActions: cram.priorityActions,
    medicationSafety: cram.medicationSafety,
    redFlags: cram.redFlags,
    complications: cram.complications,
    examTraps: cram.examTraps,
    rapidReview: cram.rapidReview,
  })) {
    if (values.length < 2 || values.some((value) => !value.trim())) {
      throw new Error(`RN_CF_CRAM_FIELD_INVALID:${cram.countryCode}/${field}`);
    }
  }
  if (cram.sourceBasis.length < 2) throw new Error(`RN_CF_CRAM_SOURCES_MISSING:${cram.countryCode}`);
}

export function getRnCysticFibrosisCram(countryCode: "CA" | "US") {
  return rnCysticFibrosisCramLessons.find((cram) => cram.countryCode === countryCode);
}
