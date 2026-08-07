import { respiratoryLessons } from "./respiratory";

export interface RnAsthmaCramLesson {
  id: string;
  fullLessonKey: "asthma-emergency";
  tier: "rn";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  exam: "NCLEX-RN";
  bodySystem: "Respiratory";
  topic: "Asthma";
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

export const rnAsthmaCramLessons: RnAsthmaCramLesson[] = [
  {
    id: "cram-rn-ca-asthma-20260807",
    fullLessonKey: "asthma-emergency",
    tier: "rn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    title: "Acute Asthma Exacerbation — RN Canada Cram",
    bottomLine: "Severe asthma can progress from wheeze to almost no airflow. The RN must recognize severity, treat oxygenation and bronchospasm immediately, give ordered anti-inflammatory therapy, reassess response continuously, and escalate before exhaustion becomes respiratory arrest.",
    mechanism: [
      "Bronchial smooth-muscle constriction, mucosal edema, and mucus narrow airways and make expiration difficult.",
      "Air trapping raises work of breathing; prolonged severe obstruction can fatigue respiratory muscles.",
      "Early PaCO2 is often low. A rising or apparently normal PaCO2 while severe distress persists can indicate failing ventilation."
    ],
    recognize: [
      "Severity lives in speech, mental status, work of breathing, air entry, oxygenation/support need, and treatment response—not wheeze volume alone.",
      "Improvement = better bilateral air entry, easier speech, less accessory-muscle use, improving flow, and stable/decreasing oxygen need.",
      "Silent chest, one-word speech, exhaustion, agitation/confusion/drowsiness, cyanosis, or inability to protect the airway are emergency findings."
    ],
    diagnosticsMonitoring: [
      "Trend SpO2 together with oxygen flow/device and respiratory effort.",
      "Use peak flow when safely obtainable and compare with personal best/action-plan zones.",
      "Obtain/anticipate blood-gas assessment for severe distress, fatigue, altered consciousness, or suspected hypercapnia.",
      "Review potassium/ECG risk during continuous or high-dose salbutamol; image selectively for pneumothorax, pneumonia, or an alternate diagnosis."
    ],
    priorityActions: [
      "Position upright, reduce exertion, and support oxygenation per order/protocol.",
      "Give repeated/continuous ordered salbutamol; add ipratropium for significant exacerbation when ordered.",
      "Give systemic corticosteroid early in a clinically significant exacerbation.",
      "Use IV magnesium sulfate as an ordered adjunct in selected severe exacerbations not responding adequately to initial therapy.",
      "Prepare advanced airway support early for progressive exhaustion, declining consciousness, or worsening hypercapnia despite aggressive therapy."
    ],
    medicationSafety: [
      "Salbutamol: rapid bronchodilator; intensive dosing can cause tremor, tachycardia, palpitations, hyperglycemia, and hypokalemia.",
      "Ipratropium: add-on bronchodilator; monitor dry mouth/ocular exposure effects.",
      "Systemic corticosteroids: anti-inflammatory, not immediate bronchodilation; monitor glucose and short-course adverse effects.",
      "Canadian guidance includes PRN budesonide/formoterol as a valid option for selected patients age 12+; do not default to obsolete SABA-only teaching."
    ],
    redFlags: [
      "Silent or nearly silent chest",
      "Declining consciousness or severe exhaustion",
      "Rising PaCO2/worsening acidosis during persistent distress",
      "Increasing oxygen requirement or refractory hypoxemia",
      "Hypotension, cyanosis, inability to speak, or inability to protect the airway"
    ],
    complications: [
      "Acute hypercapnic respiratory failure and arrest",
      "Pneumothorax",
      "Beta2-agonist-associated tachyarrhythmia/hypokalemia",
      "Recurrent severe exacerbation when controller/adherence/action-plan gaps persist"
    ],
    examTraps: [
      "Calling less wheeze improvement without checking air entry.",
      "Being reassured by a normal-range PaCO2 in a patient who remains severely distressed.",
      "Treating inhaled corticosteroid as the rapid rescue bronchodilator.",
      "Ignoring modern Canadian budesonide/formoterol reliever strategies because older teaching used salbutamol alone."
    ],
    rapidReview: [
      "Silent chest + drowsy = airway emergency.",
      "Salbutamol opens; steroids reduce inflammation; magnesium is selected adjunct therapy.",
      "Trend air entry + work + speech + O2 support + PaCO2 trajectory.",
      "Rising PaCO2 in persistent distress = fatigue until proven otherwise.",
      "Before discharge: technique, adherence, controller/reliever purpose, written action plan, emergency thresholds."
    ],
    sourceBasis: [
      "Canadian Thoracic Society 2021 asthma guideline update",
      "Canadian Thoracic Society 2021 focused update on very mild and mild asthma",
      "NCSBN 2026 NCLEX-RN Test Plan"
    ],
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-rn-us-asthma-20260807",
    fullLessonKey: "asthma-emergency",
    tier: "rn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-RN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    title: "Acute Asthma Exacerbation — RN U.S. Cram",
    bottomLine: "Status asthmaticus is a time-sensitive ventilation emergency. Support oxygenation, give ordered rapid albuterol-based bronchodilation and systemic anti-inflammatory therapy, reassess continuously, and escalate to advanced airway support before progressive fatigue and hypercapnia become arrest.",
    mechanism: [
      "Bronchospasm, inflammatory edema, and mucus narrow airways and create expiratory flow limitation and air trapping.",
      "Increasing dynamic hyperinflation raises respiratory workload until the patient can no longer sustain ventilation.",
      "Severe asthma often begins with hypocapnia; a rising/normalizing PaCO2 during ongoing severe distress is an ominous fatigue signal."
    ],
    recognize: [
      "Assess speech, alertness, work of breathing, bilateral air entry, oxygen need, and response after each treatment cycle.",
      "A quieter chest is only better when airflow and effort improve.",
      "One-word speech, a nearly silent chest, exhaustion, somnolence/confusion, cyanosis, or inability to protect the airway are high-risk cues."
    ],
    diagnosticsMonitoring: [
      "Trend SpO2 and oxygen support requirement.",
      "Use peak flow when safe; use ABG/VBG for severe distress, fatigue, altered mentation, or suspected hypercapnia.",
      "Monitor potassium and cardiac rhythm during continuous/high-dose albuterol.",
      "FeNO is a selective adjunct in certain diagnostic/management situations, not a replacement for history/spirometry/context.",
      "Use imaging selectively when pneumothorax, pneumonia, foreign body, or another diagnosis is suspected."
    ],
    priorityActions: [
      "Position upright and support oxygenation.",
      "Administer repeated/continuous ordered albuterol; add ipratropium in significant exacerbations when ordered.",
      "Administer systemic corticosteroid early for clinically important attacks.",
      "Administer ordered IV magnesium as an adjunct in selected severe refractory bronchospasm.",
      "Prepare for intubation/critical care when exhaustion, consciousness, or ventilation worsens despite aggressive therapy."
    ],
    medicationSafety: [
      "Albuterol: tachycardia, tremor, palpitations, and hypokalemia with intensive dosing.",
      "LABA monotherapy is not an appropriate asthma regimen.",
      "ICS-formoterol SMART is a valid U.S. maintenance-and-reliever strategy for appropriate patients.",
      "The focused update also includes selected intermittent-ICS strategies, including age-specific options; follow the clinician-directed plan rather than applying one universal regimen."
    ],
    redFlags: [
      "Minimal/absent air movement",
      "Progressive exhaustion or declining consciousness",
      "Rising PaCO2/worsening acidosis",
      "Refractory hypoxemia or increasing oxygen support",
      "Hypotension, cyanosis, inability to speak, or inability to protect the airway"
    ],
    complications: [
      "Acute ventilatory failure/arrest",
      "Pneumothorax",
      "High-dose beta2-agonist tachyarrhythmia/hypokalemia",
      "Recurrent high-risk exacerbation from uncontrolled disease"
    ],
    examTraps: [
      "Calling quiet wheeze improvement when air entry is falling.",
      "Rejecting SMART because older teaching separated maintenance and rescue inhalers.",
      "Using LABA monotherapy in asthma.",
      "Treating FeNO or any single biomarker as a stand-alone asthma diagnosis."
    ],
    rapidReview: [
      "Silent + sleepy = prepare airway now.",
      "Albuterol opens; steroids treat inflammation; magnesium is adjunct.",
      "SMART = ICS-formoterol maintenance + reliever for appropriate U.S. patients.",
      "Rising PaCO2 while still distressed = failing ventilation.",
      "Discharge requires technique, adherence, action plan, trigger control, and emergency thresholds."
    ],
    sourceBasis: [
      "NHLBI/NAEPP 2020 Focused Updates to the Asthma Management Guidelines",
      "NHLBI Clinician's Guide to the 2020 Focused Updates",
      "NCSBN 2026 NCLEX-RN Test Plan"
    ],
    sourceAsOf: "2026-08"
  }
];

if (!respiratoryLessons["asthma-emergency"]) {
  throw new Error("RN_ASTHMA_FULL_COUNTERPART_MISSING: asthma-emergency");
}
if (rnAsthmaCramLessons.length !== 2) throw new Error(`RN_ASTHMA_CRAM_COUNT_INVALID: ${rnAsthmaCramLessons.length}`);
const mappingKeys = new Set<string>();
for (const cram of rnAsthmaCramLessons) {
  const key = `${cram.countryCode}:${cram.fullLessonKey}`;
  if (mappingKeys.has(key)) throw new Error(`RN_ASTHMA_CRAM_DUPLICATE: ${key}`);
  mappingKeys.add(key);
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
    if (values.length < 2 || values.some((value) => !value.trim())) throw new Error(`RN_ASTHMA_CRAM_FIELD_INVALID: ${key}/${field}`);
  }
  if (cram.sourceBasis.length < 2) throw new Error(`RN_ASTHMA_CRAM_SOURCES_MISSING: ${key}`);
}

export function getRnAsthmaCram(countryCode: "CA" | "US"): RnAsthmaCramLesson | undefined {
  return rnAsthmaCramLessons.find((cram) => cram.countryCode === countryCode);
}
