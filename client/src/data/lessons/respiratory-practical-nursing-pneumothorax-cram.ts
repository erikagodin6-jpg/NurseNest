import { respiratoryPracticalNursingPneumothoraxFullLessons } from "./respiratory-practical-nursing-pneumothorax-full";

export interface PracticalNursingPneumothoraxCram {
  id: string;
  fullLessonKey: string;
  servingTier: "rpn";
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  exam: "REX-PN" | "NCLEX-PN";
  bodySystem: "Respiratory";
  topic: "Pneumothorax";
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

const keys = { CA: "pneumothorax-rpn-ca-2026", US: "pneumothorax-pn-us-2026" } as const;
for (const [country, key] of Object.entries(keys)) {
  if (!respiratoryPracticalNursingPneumothoraxFullLessons[key]) {
    throw new Error(`PN_PTX_FULL_MISSING:${country}/${key}`);
  }
}

export const practicalNursingPneumothoraxCramLessons: PracticalNursingPneumothoraxCram[] = [
  {
    id: "cram-rpn-ca-pneumothorax-20260807",
    fullLessonKey: keys.CA,
    servingTier: "rpn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    bodySystem: "Respiratory",
    topic: "Pneumothorax",
    title: "Pneumothorax and Chest Drain Safety — RPN Canada Cram",
    bottomLine: "Pneumothorax is pleural air causing partial or complete lung collapse. Stable spontaneous disease may be managed conservatively in selected patients, but tension physiology is an immediate clinical emergency. RPN priorities are oxygen/support, rapid escalation, chest-drain safety, air-leak/obstruction recognition, and avoiding routine clamping or forceful tube manipulation.",
    mechanism: [
      "Pleural air abolishes normal negative intrapleural pressure and reduces lung expansion.",
      "Tension physiology traps rising pleural pressure, impairs venous return and can cause obstructive shock.",
      "Positive-pressure ventilation increases barotrauma/tension risk in vulnerable lungs.",
    ],
    recognize: [
      "Sudden pleuritic pain, dyspnea, unilateral reduced breath sounds and hypoxemia suggest pneumothorax.",
      "Hypotension, severe distress, rapid deterioration or unilateral absent breath sounds suggest tension physiology.",
      "Rapid subcutaneous emphysema or abrupt drainage-system change can signal an air leak or tube problem.",
    ],
    diagnosticsMonitoring: [
      "Stable disease is confirmed with chest imaging or ultrasound according to the plan.",
      "Unstable tension physiology is a clinical emergency; routine imaging must not delay decompression.",
      "Trend SpO2, respiratory effort, blood pressure, breath sounds and mental status.",
      "Trace chest-drain tubing, water seal, drainage and insertion site whenever status changes.",
    ],
    priorityActions: [
      "Provide ordered oxygen/support and escalate suspected tension pneumothorax immediately.",
      "Keep the drainage unit upright below chest level with tubing patent and secure.",
      "Assess continuous water-seal bubbling as a possible air leak; do not reflexively clamp.",
      "If the tube leaves the patient, protect the site and obtain immediate skilled help according to local protocol; do not blindly reinsert it.",
    ],
    medicationSafety: [
      "Supplemental oxygen treats hypoxemia but does not replace pleural decompression when decompression is required.",
      "Analgesia can improve breathing/cough but opioids require monitoring for respiratory depression.",
      "Do not use medication to mask an acute drainage-system or tension emergency.",
    ],
    redFlags: [
      "Hypotension or syncope with unilateral absent breath sounds",
      "Rapidly increasing oxygen requirement",
      "Sudden high airway pressure on positive-pressure ventilation",
      "Rapidly expanding subcutaneous emphysema",
      "Chest-tube dislodgement with respiratory deterioration",
    ],
    complications: [
      "Tension pneumothorax and obstructive shock",
      "Persistent air leak",
      "Chest-tube obstruction/dislodgement",
      "Subcutaneous emphysema",
      "Bleeding or infection related to pleural drainage",
    ],
    examTraps: [
      "Waiting for routine x-ray before escalating unstable tension physiology.",
      "Assuming every stable spontaneous pneumothorax needs immediate chest-tube drainage.",
      "Routine clamping during transport.",
      "Routine stripping or milking of the tube.",
      "Blindly reinserting a dislodged tube into the patient.",
    ],
    rapidReview: [
      "Tension pneumothorax = clinical emergency.",
      "Patient first, then drainage system.",
      "Drainage unit below chest, tubing patent.",
      "Continuous water-seal bubbling = assess air leak.",
      "Routine clamping is unsafe.",
    ],
    sourceBasis: ["Current evidence-based pleural-disease/pneumothorax guidance", "NCSBN REx-PN Test Plan"],
    sourceAsOf: "2026-08",
  },
  {
    id: "cram-pn-us-pneumothorax-20260807",
    fullLessonKey: keys.US,
    servingTier: "rpn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    bodySystem: "Respiratory",
    topic: "Pneumothorax",
    title: "Pneumothorax and Chest Tube Safety — U.S. NCLEX-PN Cram",
    bottomLine: "A pneumothorax can be stable or rapidly fatal. The PN/LVN monitors respiratory/hemodynamic status and chest-tube function, performs ordered support, and immediately escalates tension physiology, tube dislodgement or obstruction. Current care is symptom/severity based: selected stable spontaneous cases may be observed, whereas tension pneumothorax is treated before routine imaging.",
    mechanism: [
      "Pleural air collapses lung tissue by disrupting negative pleural pressure.",
      "One-way air trapping can create tension physiology and obstructive shock.",
      "Mechanical ventilation can precipitate barotrauma and tension pneumothorax.",
    ],
    recognize: [
      "Sudden unilateral pleuritic pain, dyspnea and reduced breath sounds are common clues.",
      "New hypotension, severe hypoxemia and unilateral absent breath sounds require emergency escalation.",
      "Chest-tube air leak, obstruction or disconnection can rapidly change the patient's status.",
    ],
    diagnosticsMonitoring: [
      "Stable cases use x-ray/ultrasound according to the medical plan.",
      "Tension physiology is treated clinically before waiting for confirmatory imaging.",
      "Monitor SpO2, BP, breath sounds, tube drainage, water seal and subcutaneous emphysema.",
      "After thoracic procedures or positive-pressure ventilation, watch closely for sudden deterioration.",
    ],
    priorityActions: [
      "Escalate tension physiology immediately and continue ordered oxygen/support.",
      "Keep the drainage system below the chest and tubing unobstructed.",
      "Investigate continuous bubbling rather than automatically clamping the tube.",
      "Protect the insertion site and obtain skilled help after accidental tube removal; do not blindly reinsert.",
    ],
    medicationSafety: [
      "Oxygen is supportive treatment for hypoxemia and does not mechanically remove pleural air.",
      "Opioid analgesia requires respiratory monitoring.",
      "Medication administration must never delay correction of a life-threatening pleural/airway problem.",
    ],
    redFlags: [
      "Shock with unilateral absent breath sounds",
      "Acute ventilator high-pressure alarm plus unilateral air-entry loss",
      "Rapid oxygen desaturation",
      "Rapidly spreading subcutaneous emphysema",
      "Tube dislodgement or drainage-system failure with clinical deterioration",
    ],
    complications: [
      "Tension pneumothorax",
      "Persistent bronchopleural air leak",
      "Chest-tube malfunction",
      "Subcutaneous emphysema",
      "Pleural infection or bleeding",
    ],
    examTraps: [
      "Treating every spontaneous pneumothorax identically.",
      "Going to imaging before stabilizing tension physiology.",
      "Clamping routinely during transport.",
      "Stripping/milking chest tubes routinely.",
      "Ignoring a sudden drainage change when the patient is worsening.",
    ],
    rapidReview: [
      "Unstable tension signs = escalate now.",
      "Stable spontaneous disease may be managed conservatively in selected patients.",
      "Chest tube below chest; tubing patent.",
      "Continuous bubbling = assess for leak.",
      "Do not routinely clamp.",
    ],
    sourceBasis: ["Current evidence-based pleural-disease/pneumothorax guidance", "NCSBN 2026 NCLEX-PN Test Plan"],
    sourceAsOf: "2026-08",
  },
];
for (const cram of practicalNursingPneumothoraxCramLessons) {
  for (const [field, values] of Object.entries({ mechanism: cram.mechanism, recognize: cram.recognize, diagnosticsMonitoring: cram.diagnosticsMonitoring, priorityActions: cram.priorityActions, medicationSafety: cram.medicationSafety, redFlags: cram.redFlags, complications: cram.complications, examTraps: cram.examTraps, rapidReview: cram.rapidReview })) {
    if (values.length < 2 || values.some((value) => !value.trim())) throw new Error(`PN_PTX_CRAM_FIELD_INVALID:${cram.countryCode}/${field}`);
  }
  if (cram.sourceBasis.length < 2) throw new Error(`PN_PTX_CRAM_SOURCES_MISSING:${cram.countryCode}`);
}
export function getPracticalNursingPneumothoraxCram(countryCode: "CA" | "US") { return practicalNursingPneumothoraxCramLessons.find((cram) => cram.countryCode === countryCode); }
