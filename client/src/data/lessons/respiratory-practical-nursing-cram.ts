import { respiratoryMissingRpnLessons } from "./respiratory-missing-rpn";
import { respiratoryMissingPnUsLessons } from "./respiratory-missing-pn-us";

export type PracticalNursingCramCountry = "CA" | "US";
export type PracticalNursingCramExam = "REX-PN" | "NCLEX-PN";

export interface PracticalNursingRespiratoryCramLesson {
  id: string;
  fullLessonKey: string;
  title: string;
  tier: "rpn";
  countryCode: PracticalNursingCramCountry;
  regionScope: "CAN" | "US";
  exam: PracticalNursingCramExam;
  bodySystem: "Respiratory";
  topic: string;
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

const CA_ASTHMA_SOURCES = [
  "Canadian Thoracic Society 2021 asthma guideline update",
  "Canadian Thoracic Society 2021 focused update on very mild and mild asthma",
  "REx-PN Test Plan"
];
const US_ASTHMA_SOURCES = [
  "NHLBI/NAEPP 2020 Focused Updates to the Asthma Management Guidelines",
  "NHLBI Clinician's Guide to the 2020 Focused Updates",
  "NCSBN 2026 NCLEX-PN Test Plan"
];
const CA_COPD_SOURCES = [
  "Canadian Thoracic Society 2023 Guideline on Pharmacotherapy in Patients with Stable COPD",
  "Ontario Health 2023 COPD: Care in the Community for Adults Quality Standard",
  "Canadian Lung Association COPD resources",
  "REx-PN Test Plan"
];
const US_COPD_SOURCES = [
  "GOLD 2026 Report and Pocket Guide",
  "GOLD Spirometry Quick Guide",
  "NCSBN 2026 NCLEX-PN Test Plan"
];
const CA_CAP_SOURCES = [
  "HealthLink BC pneumonia guidance",
  "Public Health Ontario respiratory infection-prevention resources",
  "Alberta Health Services Community Acquired Pneumonia adult inpatient pathway",
  "REx-PN Test Plan"
];
const US_CAP_SOURCES = [
  "Current ATS/IDSA adult Community-Acquired Pneumonia guideline and clinical pathway",
  "CDC respiratory infection prevention guidance",
  "NCSBN 2026 NCLEX-PN Test Plan"
];

export const practicalNursingRespiratoryCramLessons: PracticalNursingRespiratoryCramLesson[] = [
  {
    id: "cram-rpn-ca-resp-asthma-20260807",
    fullLessonKey: "acute-asthma-rpn-ca",
    title: "Acute Asthma Exacerbation — Cram",
    tier: "rpn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    bottomLine: "Asthma can deteriorate from noisy wheeze to dangerously little airflow. In an acute attack, recognize severity first, support oxygenation, give ordered salbutamol-based bronchodilation and anti-inflammatory therapy, reassess after every treatment cycle, and escalate immediately when air entry, mental status, or ventilation worsens.",
    mechanism: [
      "Airway smooth-muscle constriction, mucosal edema, and mucus narrow the conducting airways and make expiration difficult.",
      "Air trapping increases work of breathing; severe obstruction eventually exhausts respiratory muscles.",
      "Early hyperventilation often lowers PaCO2. A rising or 'normal' PaCO2 during persistent severe distress can signal failing ventilation."
    ],
    recognize: [
      "Assess speech, alertness, respiratory rate, accessory-muscle use, oxygenation, and bilateral air entry before judging severity by wheeze.",
      "Improvement means easier speech, better air movement, less work of breathing, and improving oxygenation/flow—not merely quieter wheeze.",
      "A silent or nearly silent chest, exhaustion, agitation/confusion/drowsiness, cyanosis, or inability to speak are emergency cues."
    ],
    diagnosticsMonitoring: [
      "Trend SpO2 and the amount of oxygen support required.",
      "Use peak expiratory flow when the patient can perform it safely; compare with personal best when available.",
      "Expect blood-gas assessment for severe distress, fatigue, altered mental status, or suspected hypercapnia.",
      "Chest radiograph is selective when pneumonia, pneumothorax, or another diagnosis is suspected."
    ],
    priorityActions: [
      "Sit upright and reduce unnecessary exertion.",
      "Administer controlled supplemental oxygen as ordered/protocolled for hypoxemia.",
      "Give ordered inhaled salbutamol; add ipratropium for moderate-to-severe exacerbation when ordered.",
      "Give ordered systemic corticosteroid early in a clinically significant exacerbation.",
      "Reassess immediately after treatment and escalate deterioration; do not independently redesign the regimen."
    ],
    medicationSafety: [
      "Salbutamol: rapid bronchodilator; monitor tremor, tachycardia/palpitations, and potassium risk with intensive dosing.",
      "Ipratropium: add-on antimuscarinic bronchodilator; dry mouth and ocular exposure effects are common safety points.",
      "Systemic corticosteroid: treats inflammation, not immediate bronchospasm; monitor glucose and short-course adverse effects.",
      "For selected Canadian patients age 12 years and older, prescribed PRN budesonide/formoterol is a valid current strategy—do not reject it because it differs from older SABA-only teaching."
    ],
    redFlags: [
      "Silent/near-silent chest or rapidly worsening air entry",
      "Altered consciousness, exhaustion, agitation, or drowsiness",
      "Persistent hypoxemia or increasing oxygen need",
      "Rising PaCO2/worsening acidosis during ongoing distress",
      "Hypotension, cyanosis, or inability to speak/protect the airway"
    ],
    complications: [
      "Acute hypercapnic respiratory failure",
      "Respiratory arrest",
      "Pneumothorax in a suddenly worsening patient",
      "Medication-related tachyarrhythmia or hypokalemia during intensive beta2-agonist therapy"
    ],
    examTraps: [
      "Calling quieter wheeze 'improvement' without checking air entry.",
      "Waiting for imaging before treating obvious severe bronchospasm and hypoxemia.",
      "Treating inhaled corticosteroid as the rapid rescue drug in a severe attack.",
      "Independently escalating or changing prescriptions instead of assessing, implementing authorized care, reassessing, and reporting."
    ],
    rapidReview: [
      "LOUD wheeze can still move air; SILENT chest may not.",
      "Treat oxygenation + bronchospasm + inflammation.",
      "Response after therapy matters more than the fact that therapy was given.",
      "Rising PaCO2 + persistent distress = fatigue warning.",
      "Before discharge: technique, controller/reliever purpose, action plan, follow-up."
    ],
    sourceBasis: CA_ASTHMA_SOURCES,
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-pn-us-resp-asthma-20260807",
    fullLessonKey: "acute-asthma-pn-us",
    title: "Acute Asthma Exacerbation — Cram",
    tier: "rpn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    bottomLine: "Acute asthma is a ventilation problem that can progress from wheezing to almost no air movement. Prioritize severity recognition, oxygenation, prescribed albuterol-based rapid bronchodilation, anti-inflammatory therapy, repeated reassessment, and immediate escalation for fatigue or failing ventilation.",
    mechanism: [
      "Bronchial smooth-muscle constriction, inflammatory edema, and mucus narrow the airways and trap air during expiration.",
      "Increasing resistance raises work of breathing until respiratory muscles fatigue.",
      "PaCO2 often starts low; a rising or normalizing PaCO2 in a patient who remains very distressed is a respiratory-failure warning."
    ],
    recognize: [
      "Use speech, mental status, work of breathing, air entry, oxygenation, and response to treatment to judge severity.",
      "Less wheeze is reassuring only when air movement and work of breathing improve too.",
      "Somnolence, a nearly silent chest, cyanosis, inability to speak, or exhaustion are emergency findings."
    ],
    diagnosticsMonitoring: [
      "Trend SpO2 plus oxygen requirement and respiratory effort.",
      "Peak flow can help when safely obtainable and compared with personal best.",
      "Expect ABG/VBG when severe distress, altered mentation, fatigue, or hypercapnia is suspected.",
      "Do not delay acute treatment for routine imaging; image when a complication or alternative diagnosis is suspected."
    ],
    priorityActions: [
      "Position upright and reduce exertion.",
      "Support oxygenation per order/protocol for hypoxemia.",
      "Administer prescribed albuterol; add ipratropium in significant exacerbations when ordered.",
      "Administer ordered systemic corticosteroid for clinically important attacks.",
      "Reassess after each cycle and escalate for declining air movement, mental status, or gas exchange."
    ],
    medicationSafety: [
      "Albuterol: monitor tachycardia, tremor, palpitations, and hypokalemia with high/repeated dosing.",
      "Ipratropium: add-on bronchodilation; monitor anticholinergic effects and avoid ocular exposure.",
      "Systemic corticosteroid: anti-inflammatory; monitor glucose and other short-course adverse effects.",
      "Current U.S. guidance includes ICS-formoterol SMART for appropriate patients and selected intermittent-ICS strategies; LABA monotherapy is not an appropriate asthma regimen."
    ],
    redFlags: [
      "Very poor or absent air movement",
      "Somnolence, confusion, agitation, or exhaustion",
      "Persistent/worsening hypoxemia",
      "Rising PaCO2 or acidosis during continued distress",
      "Hypotension, cyanosis, inability to speak, or inability to protect the airway"
    ],
    complications: [
      "Acute respiratory failure or arrest",
      "Pneumothorax",
      "Beta2-agonist-related tachyarrhythmia/hypokalemia during intensive therapy"
    ],
    examTraps: [
      "Assuming a quieter chest means the attack is resolving.",
      "Treating an ICS as immediate rescue bronchodilation.",
      "Rejecting a valid prescribed SMART regimen because it conflicts with older SABA-only teaching.",
      "Assigning independent diagnosis/prescribing to the LPN/VN instead of assessment, ordered care, reassessment, and escalation."
    ],
    rapidReview: [
      "Silent chest = emergency until proven otherwise.",
      "Albuterol opens; steroids cool inflammation.",
      "Watch treatment response and oxygen requirement.",
      "Rising PaCO2 during severe distress = fatigue.",
      "Discharge: device technique + medication purpose + action plan + red flags."
    ],
    sourceBasis: US_ASTHMA_SOURCES,
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-rpn-ca-resp-copd-20260807",
    fullLessonKey: "copd-exacerbation-rpn-ca",
    title: "COPD Exacerbation — Cram",
    tier: "rpn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    bodySystem: "Respiratory",
    topic: "COPD",
    bottomLine: "A COPD exacerbation is an acute change from baseline. Treat hypoxemia with controlled oxygen, administer ordered bronchodilator/anti-inflammatory therapy, reassess ventilation, and escalate new somnolence, worsening acidosis, exhaustion, or increasing oxygen requirement. Never leave a hypoxemic patient untreated because of the outdated 'hypoxic drive' myth.",
    mechanism: [
      "Small-airway inflammation, mucus, bronchoconstriction, and loss of elastic recoil worsen expiratory flow and dynamic hyperinflation.",
      "V/Q mismatch increases and ventilatory workload rises; susceptible patients can develop acute-on-chronic CO2 retention and acidosis.",
      "Oxygen-associated hypercapnia is mainly related to V/Q effects and the Haldane effect—not simply complete suppression of respiratory drive."
    ],
    recognize: [
      "Look for sustained worsening of dyspnea, cough, or sputum compared with the patient's own baseline.",
      "Trend alertness, work of breathing, oxygen requirement, and ability to speak—not just a single SpO2.",
      "New confusion/somnolence, exhaustion, or shallow breathing suggests ventilatory failure."
    ],
    diagnosticsMonitoring: [
      "Pulse oximetry plus controlled oxygen titration; expect blood gas when hypercapnia/acidosis is suspected.",
      "Chest imaging when pneumonia, edema, or pneumothorax may be contributing.",
      "ECG/cardiac assessment when ischemia, dysrhythmia, or heart failure is possible.",
      "Monitor glucose with systemic steroids and potassium/heart rate with intensive salbutamol.",
      "Stable suspected COPD should be confirmed with spirometry rather than symptoms alone."
    ],
    priorityActions: [
      "Sit upright and administer controlled oxygen to the ordered target.",
      "Give ordered salbutamol ± ipratropium and systemic corticosteroid.",
      "Support secretion clearance, individualized hydration, and paced mobility.",
      "Prepare for non-invasive ventilation when hypercapnic acidosis and high work of breathing persist despite initial therapy.",
      "Escalate deterioration rather than independently adjusting ventilatory settings or prescriptions."
    ],
    medicationSafety: [
      "Salbutamol: monitor tachycardia/palpitations and potassium risk with intensive treatment.",
      "Ipratropium/LAMA therapy: watch anticholinergic effects such as urinary retention and ocular exposure.",
      "Systemic corticosteroid: monitor hyperglycemia, mood/sleep effects, and fluid considerations.",
      "ICS-containing maintenance therapy is selective in COPD; when prescribed, teach mouth rinsing and monitor candidiasis/pneumonia risk."
    ],
    redFlags: [
      "New confusion, drowsiness, or inability to protect the airway",
      "Worsening respiratory acidosis",
      "Severe accessory-muscle use or exhaustion",
      "Increasing oxygen requirement or persistent hypoxemia",
      "Hemodynamic instability or sudden unilateral chest findings"
    ],
    complications: [
      "Acute-on-chronic hypercapnic respiratory failure",
      "Pneumothorax",
      "Pneumonia/sepsis",
      "Right-heart strain or decompensated heart failure",
      "Medication-related hyperglycemia, tachyarrhythmia, or hypokalemia"
    ],
    examTraps: [
      "Withholding oxygen from a hypoxemic COPD patient because of 'hypoxic drive.'",
      "Calling chronic baseline cough an acute exacerbation without a meaningful change.",
      "Treating sputum colour alone as proof that antibiotics are required.",
      "Calling dyspnea alone an indication for long-term home oxygen without documented hypoxemia."
    ],
    rapidReview: [
      "COPD flare = CHANGE from baseline.",
      "Oxygenate safely; do not abandon oxygenation.",
      "Somnolence + respiratory distress = think CO2 retention/fatigue.",
      "Bronchodilator + steroid + reassessment; antibiotics only when indicated.",
      "Discharge: inhaler technique, action plan, smoking cessation support, rehab/follow-up."
    ],
    sourceBasis: CA_COPD_SOURCES,
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-pn-us-resp-copd-20260807",
    fullLessonKey: "copd-exacerbation-pn-us",
    title: "COPD Exacerbation — Cram",
    tier: "rpn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    bodySystem: "Respiratory",
    topic: "COPD",
    bottomLine: "COPD exacerbation means acute worsening beyond baseline. Give controlled oxygen for hypoxemia, administer ordered albuterol/ipratropium and systemic corticosteroid, reassess ventilation, and escalate new somnolence, worsening hypercapnic acidosis, exhaustion, or increasing support needs. Do not use the obsolete 'hypoxic drive' myth to justify untreated hypoxemia.",
    mechanism: [
      "Inflammation, bronchoconstriction, secretions, and emphysematous loss of recoil worsen expiratory flow and air trapping.",
      "Dynamic hyperinflation raises work of breathing and V/Q mismatch worsens gas exchange.",
      "Some patients develop acute-on-chronic CO2 retention; excessive oxygen can worsen hypercapnia through V/Q and Haldane effects, so titrate and reassess rather than withhold oxygen."
    ],
    recognize: [
      "Identify a sustained increase in dyspnea, cough, or sputum from the patient's baseline.",
      "Watch oxygen requirement, mental status, work of breathing, and treatment response.",
      "New somnolence, confusion, exhaustion, shallow breathing, or hemodynamic instability are high-risk findings."
    ],
    diagnosticsMonitoring: [
      "Trend SpO2 with the amount of oxygen support; obtain blood gas when hypercapnia/acidosis is suspected.",
      "Use chest imaging when pneumonia, edema, or pneumothorax is possible.",
      "Assess ECG/cardiac causes when chest pain, dysrhythmia, or heart failure may coexist.",
      "Monitor potassium and heart rate during intensive albuterol and glucose during systemic steroid therapy.",
      "Current GOLD diagnosis requires persistent post-bronchodilator airflow obstruction in the appropriate clinical context."
    ],
    priorityActions: [
      "Position upright and titrate ordered oxygen.",
      "Administer ordered albuterol ± ipratropium and systemic corticosteroid.",
      "Use individualized hydration, secretion clearance, and paced mobility.",
      "Escalate for non-invasive ventilation when hypercapnic acidosis and work of breathing persist.",
      "Report treatment failure and complications; do not independently prescribe or alter NIV settings beyond protocol."
    ],
    medicationSafety: [
      "Albuterol: tachycardia, tremor, palpitations, hypokalemia with high/repeated dosing.",
      "Ipratropium/LAMA: anticholinergic effects such as dry mouth, urinary retention, and ocular irritation.",
      "Systemic corticosteroid: hyperglycemia, insomnia/mood change, and fluid effects.",
      "ICS-containing COPD regimens are selective; monitor oral candidiasis and pneumonia risk when prescribed."
    ],
    redFlags: [
      "New confusion or somnolence",
      "Worsening hypercapnic acidosis",
      "Severe fatigue or inability to protect the airway",
      "Increasing oxygen need/persistent hypoxemia",
      "Shock or sudden unilateral chest pain/reduced breath sounds"
    ],
    complications: [
      "Acute hypercapnic respiratory failure",
      "Pneumothorax",
      "Pneumonia/sepsis",
      "Cardiac ischemia/dysrhythmia or heart-failure decompensation",
      "Treatment-related hyperglycemia or hypokalemia"
    ],
    examTraps: [
      "Withholding needed oxygen because 'oxygen suppresses respiratory drive.'",
      "Diagnosing COPD from symptoms or a chest x-ray without spirometric confirmation.",
      "Treating tiotropium as the immediate rescue inhaler.",
      "Assuming dyspnea alone means the patient qualifies for long-term oxygen."
    ],
    rapidReview: [
      "Acute CHANGE = exacerbation.",
      "Albuterol in the U.S.; controlled oxygen + reassessment.",
      "Somnolence can mean CO2 retention.",
      "NIV is an escalation for persistent hypercapnic acidosis/work of breathing.",
      "Technique + adherence + smoking cessation + pulmonary rehab matter after stabilization."
    ],
    sourceBasis: US_COPD_SOURCES,
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-rpn-ca-resp-cap-20260807",
    fullLessonKey: "community-acquired-pneumonia-rpn-ca",
    title: "Community-Acquired Pneumonia — Cram",
    tier: "rpn",
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    bodySystem: "Respiratory",
    topic: "Community-Acquired Pneumonia",
    bottomLine: "Pneumonia fills inflamed alveoli with fluid and cells, reducing ventilation to perfused lung and causing hypoxemia. Prioritize oxygenation and severity, give ordered anti-infective therapy on time, support secretion clearance/mobility, prevent aspiration, and escalate sepsis, rising oxygen needs, altered mentation, or pleural complications.",
    mechanism: [
      "Lower-respiratory infection triggers neutrophilic inflammation and alveolar exudate/consolidation.",
      "Affected lung units remain perfused but ventilate poorly, creating low V/Q and shunt-like hypoxemia.",
      "Severe infection can extend systemically to sepsis and organ dysfunction."
    ],
    recognize: [
      "Fever/chills, cough, pleuritic pain, dyspnea, focal crackles/bronchial breath sounds, and imaging infiltrates are common.",
      "Older adults may present with new confusion rather than high fever.",
      "A stable SpO2 maintained with rapidly increasing oxygen support is deterioration, not stability."
    ],
    diagnosticsMonitoring: [
      "Trend oxygen requirement, respiratory rate/work, blood pressure, mental status, and urine output.",
      "Chest imaging supports diagnosis/complication assessment but does not identify every pathogen.",
      "When cultures are ordered for severe/high-risk illness, obtain promptly before antibiotics when feasible without creating harmful treatment delay.",
      "Sputum colour alone does not prove bacterial infection.",
      "Assess swallow safety when meals trigger cough or wet voice."
    ],
    priorityActions: [
      "Support oxygenation and escalate a rising oxygen requirement.",
      "Verify antibiotic allergies and give ordered antimicrobial therapy on time.",
      "Use routine practices plus syndrome/pathogen-appropriate additional precautions.",
      "Treat pain/fever as ordered so the patient can breathe deeply, cough, and mobilize.",
      "Use individualized hydration and aspiration prevention rather than generic 'push fluids' or feeding rules."
    ],
    medicationSafety: [
      "Antibiotics: verify true allergy/reaction, renal considerations/interactions, and monitor treatment response.",
      "Significant watery diarrhea during/after antibiotics requires evaluation for C. difficile and appropriate precautions.",
      "During influenza circulation, do not create avoidable delay in prescribed empiric antiviral therapy for high-risk/hospitalized influenza pneumonia.",
      "Do not save, share, or independently extend antibiotics beyond the prescribed plan."
    ],
    redFlags: [
      "Rapidly increasing oxygen need or severe work of breathing",
      "New confusion, hypotension, or falling urine output",
      "Exhaustion, cyanosis, or inability to protect the airway",
      "Persistent fever with worsening unilateral pleuritic findings despite treatment",
      "Sudden unilateral absent breath sounds after a pleural procedure"
    ],
    complications: [
      "Sepsis/septic shock",
      "Acute hypoxemic respiratory failure",
      "Parapneumonic effusion or empyema",
      "Pneumothorax",
      "Aspiration recurrence or C. difficile after antimicrobial exposure"
    ],
    examTraps: [
      "Assuming an afebrile older adult cannot have severe pneumonia.",
      "Calling green sputum proof of bacterial infection.",
      "Delaying urgent antibiotics for hours just to finish specimen collection.",
      "Forcing fluids in a patient with heart/kidney failure without considering overload risk."
    ],
    rapidReview: [
      "Alveoli fill → V/Q mismatch → hypoxemia.",
      "Watch oxygen REQUIREMENT + mentation + BP + urine output.",
      "Culture first when indicated/feasible, but never create dangerous treatment delay.",
      "Older adult + new confusion = reassess now.",
      "Discharge: meds as prescribed, no antibiotic sharing, graded activity, prevention, red flags."
    ],
    sourceBasis: CA_CAP_SOURCES,
    sourceAsOf: "2026-08"
  },
  {
    id: "cram-pn-us-resp-cap-20260807",
    fullLessonKey: "community-acquired-pneumonia-pn-us",
    title: "Community-Acquired Pneumonia — Cram",
    tier: "rpn",
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    bodySystem: "Respiratory",
    topic: "Community-Acquired Pneumonia",
    bottomLine: "CAP causes alveolar inflammation and consolidation that impair gas exchange. Prioritize respiratory/hemodynamic severity, give ordered empiric therapy on time, reassess oxygen support and perfusion, prevent aspiration, and escalate sepsis, progressive respiratory failure, or pleural complications.",
    mechanism: [
      "Organisms reaching the lower respiratory tract trigger inflammatory exudate in the alveoli.",
      "Consolidated alveoli ventilate poorly while perfusion continues, causing low V/Q and shunt-like hypoxemia.",
      "Severe infection can cause systemic vasodilation, poor perfusion, and sepsis-related organ dysfunction."
    ],
    recognize: [
      "CAP may present with fever/chills, cough, dyspnea, pleuritic discomfort, focal lung findings, and infiltrates.",
      "Older adults may present mainly with delirium or functional decline.",
      "A rising oxygen requirement, hypotension, oliguria, or new confusion signals deterioration."
    ],
    diagnosticsMonitoring: [
      "Trend oxygen support, SpO2, respiratory effort, blood pressure, mental status, and urine output.",
      "Chest imaging supports diagnosis and detects complications but does not identify the exact organism.",
      "Cultures are selective; in severe/high-risk CAP, obtain ordered cultures promptly before antibiotics when feasible without delaying urgent treatment.",
      "A low initial procalcitonin alone should not be used to withhold ordered empiric antibacterial treatment in clinically suspected and radiographically confirmed adult CAP.",
      "A positive viral test does not automatically exclude bacterial coinfection in a severely ill patient."
    ],
    priorityActions: [
      "Support oxygenation and escalate increasing oxygen needs.",
      "Verify allergies and administer ordered antimicrobials promptly.",
      "Use transmission-appropriate precautions for suspected contagious respiratory pathogens.",
      "Treat pain/fever as ordered and support deep breathing, cough, and graded mobility.",
      "Protect the airway and follow the swallowing plan when aspiration risk is present."
    ],
    medicationSafety: [
      "Antibiotics: verify allergies/reaction, interactions, organ-function considerations, and monitor clinical response.",
      "Do not independently stop antibiotics because procalcitonin is low or a viral test is positive; report data and follow the authorized plan.",
      "Watch for C. difficile when clinically significant watery diarrhea appears after antimicrobial exposure.",
      "Never save or share leftover antibiotics."
    ],
    redFlags: [
      "Rapidly increasing oxygen need or severe work of breathing",
      "New delirium, hypotension, or oliguria",
      "Exhaustion or inability to protect the airway",
      "Persistent fever plus worsening unilateral pleuritic signs despite therapy",
      "Sudden unilateral respiratory findings suggesting pneumothorax"
    ],
    complications: [
      "Sepsis/septic shock",
      "Acute hypoxemic respiratory failure",
      "Parapneumonic effusion/empyema",
      "Pneumothorax",
      "Aspiration recurrence or C. difficile infection"
    ],
    examTraps: [
      "Withholding ordered empiric antibiotics solely because initial procalcitonin is low.",
      "Assuming a positive viral result proves bacterial coinfection is impossible.",
      "Reading a stable SpO2 as improvement while oxygen flow has tripled.",
      "Using sputum colour alone to decide bacterial etiology or antibiotic need."
    ],
    rapidReview: [
      "Consolidation → low V/Q/shunt → hypoxemia.",
      "Trend support needs, mentation, perfusion, and urine output.",
      "Cultures can guide therapy; do not delay urgent therapy for them.",
      "Low procalcitonin ≠ automatic no-antibiotic decision in confirmed CAP.",
      "Discharge: complete prescribed plan, no sharing, prevention, graded recovery, red flags."
    ],
    sourceBasis: US_CAP_SOURCES,
    sourceAsOf: "2026-08"
  }
];

const requiredFields: Array<keyof Pick<
  PracticalNursingRespiratoryCramLesson,
  "mechanism" | "recognize" | "diagnosticsMonitoring" | "priorityActions" | "medicationSafety" | "redFlags" | "complications" | "examTraps" | "rapidReview"
>> = [
  "mechanism",
  "recognize",
  "diagnosticsMonitoring",
  "priorityActions",
  "medicationSafety",
  "redFlags",
  "complications",
  "examTraps",
  "rapidReview"
];

if (practicalNursingRespiratoryCramLessons.length !== 6) {
  throw new Error(`PRACTICAL_NURSING_RESPIRATORY_CRAM_COUNT_INVALID: ${practicalNursingRespiratoryCramLessons.length}`);
}

const seen = new Set<string>();
for (const cram of practicalNursingRespiratoryCramLessons) {
  const key = `${cram.countryCode}:${cram.fullLessonKey}`;
  if (seen.has(key)) throw new Error(`PRACTICAL_NURSING_RESPIRATORY_CRAM_DUPLICATE: ${key}`);
  seen.add(key);

  const fullRegistry = cram.countryCode === "CA" ? respiratoryMissingRpnLessons : respiratoryMissingPnUsLessons;
  const full = fullRegistry[cram.fullLessonKey];
  if (!full) throw new Error(`PRACTICAL_NURSING_RESPIRATORY_FULL_COUNTERPART_MISSING: ${key}`);
  if (!cram.bottomLine.trim()) throw new Error(`PRACTICAL_NURSING_RESPIRATORY_CRAM_BOTTOM_LINE_MISSING: ${key}`);
  for (const field of requiredFields) {
    const values = cram[field];
    if (!Array.isArray(values) || values.length < 2 || values.some((value) => !value.trim())) {
      throw new Error(`PRACTICAL_NURSING_RESPIRATORY_CRAM_FIELD_INVALID: ${key}/${field}`);
    }
  }
  if (cram.sourceBasis.length < 2) throw new Error(`PRACTICAL_NURSING_RESPIRATORY_CRAM_SOURCES_MISSING: ${key}`);
}

export const practicalNursingRespiratoryCramByFullLessonKey = Object.fromEntries(
  practicalNursingRespiratoryCramLessons.map((lesson) => [
    `${lesson.countryCode}:${lesson.fullLessonKey}`,
    lesson
  ])
) as Record<string, PracticalNursingRespiratoryCramLesson>;

export function getPracticalNursingRespiratoryCram(
  countryCode: PracticalNursingCramCountry,
  fullLessonKey: string
): PracticalNursingRespiratoryCramLesson | undefined {
  return practicalNursingRespiratoryCramByFullLessonKey[`${countryCode}:${fullLessonKey}`];
}
