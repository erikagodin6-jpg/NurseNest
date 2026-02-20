export interface VitalSigns {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  temp: number;
  pain?: number;
}

export interface LabResult {
  name: string;
  value: string;
  unit: string;
  flag?: "high" | "low" | "critical";
}

export interface CaseDecision {
  id: string;
  text: string;
  isOptimal: boolean;
  consequence: string;
  mechanismExplanation: string;
  vitalChanges?: Partial<VitalSigns>;
  newLabs?: LabResult[];
  timeAdvance?: string;
}

export interface CaseStage {
  id: string;
  title: string;
  narrative: string;
  vitals: VitalSigns;
  labs?: LabResult[];
  assessmentFindings?: string[];
  nursingPriority?: string;
  decisions: CaseDecision[];
  criticalThinking?: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientProfile: string;
  chiefComplaint: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  bodySystem: string;
  stages: CaseStage[];
  debriefing: {
    keyLearning: string[];
    mechanismSummary: string;
    commonErrors: string[];
  };
}

export const clinicalCases: ClinicalCase[] = [
  {
    id: "sepsis-progression",
    title: "The Deteriorating Pneumonia Patient",
    patientProfile: "Margaret Chen, 68-year-old female. PMH: Type 2 diabetes, hypertension, COPD. Admitted 12 hours ago for community-acquired pneumonia. IV antibiotics initiated. Currently on 2L nasal cannula.",
    chiefComplaint: "Worsening shortness of breath and confusion",
    category: "Critical Care",
    difficulty: "intermediate",
    bodySystem: "Respiratory",
    stages: [
      {
        id: "initial-assessment",
        title: "Initial Assessment",
        narrative: "You arrive for your shift assessment. The night nurse reports Margaret has been 'a little more restless' but vitals were 'stable.' You approach the bedside and notice the patient is flushed, slightly diaphoretic, and appears drowsy but arousable.",
        vitals: { hr: 108, bp: "98/62", rr: 24, spo2: 91, temp: 38.9 },
        assessmentFindings: [
          "Skin warm and flushed, mild diaphoresis",
          "Oriented to person only, drowsy but arousable",
          "Crackles bilateral bases, diminished right lower lobe",
          "Capillary refill 3 seconds",
          "Urine output last 4 hours: 80 mL",
        ],
        nursingPriority: "Recognize early sepsis indicators: tachycardia, hypotension, altered mental status, fever, and decreased urine output in a patient with known infection.",
        decisions: [
          {
            id: "escalate-immediately",
            text: "Notify the provider immediately with SBAR communication, request urgent assessment and sepsis workup",
            isOptimal: true,
            consequence: "Provider orders stat lactate, blood cultures x2, CBC, CMP, and increases IV fluid rate to 30 mL/kg bolus. Early recognition and escalation is the most critical intervention in sepsis.",
            mechanismExplanation: "This patient meets SIRS criteria (HR >100, RR >22, Temp >38.3°C) with a known source of infection and evidence of organ dysfunction (altered mental status, oliguria). Early recognition triggers the sepsis bundle — every hour of delayed antibiotics increases mortality by approximately 7.6%. The lactate will quantify tissue hypoperfusion.",
          },
          {
            id: "increase-o2-monitor",
            text: "Increase oxygen to 4L nasal cannula, recheck vitals in 30 minutes, continue monitoring",
            isOptimal: false,
            consequence: "While increasing oxygen addresses SpO2, this delays recognition of the evolving sepsis. Over the next 30 minutes, the patient's blood pressure drops to 88/54 and mental status further declines. Valuable intervention time is lost.",
            mechanismExplanation: "Hypoxemia is only one component of the clinical picture. The tachycardia, hypotension, altered mental status, and decreased urine output collectively indicate distributive shock from sepsis. Treating only the oxygen deficit while ignoring the systemic inflammatory response misses the life-threatening pathology. The cytokine cascade is already causing vasodilation and capillary leak.",
          },
          {
            id: "tylenol-wait",
            text: "Administer acetaminophen for fever, reposition for comfort, document findings",
            isOptimal: false,
            consequence: "Treating the fever symptomatically without addressing the underlying cause allows sepsis to progress unchecked. The patient deteriorates significantly within the hour, requiring ICU transfer.",
            mechanismExplanation: "Fever in this context is a symptom of systemic infection, not the disease itself. While acetaminophen may reduce temperature, it does nothing to address the pathogenic source, the inflammatory cascade, or the hemodynamic instability. This represents a cognitive error of treating symptoms rather than recognizing the clinical syndrome.",
          },
        ],
        criticalThinking: "What distinguishes this presentation from a patient who is simply febrile? Consider how multiple subtle abnormalities together create a pattern more concerning than any single finding.",
      },
      {
        id: "fluid-resuscitation",
        title: "Fluid Resuscitation Response",
        narrative: "After your notification, the provider arrives within 10 minutes. Stat labs are drawn. A 30 mL/kg crystalloid bolus (approximately 2L for this patient) is initiated. After the first liter infuses over 30 minutes, you reassess.",
        vitals: { hr: 112, bp: "92/58", rr: 26, spo2: 89, temp: 39.1 },
        labs: [
          { name: "Lactate", value: "4.8", unit: "mmol/L", flag: "critical" },
          { name: "WBC", value: "18.2", unit: "×10³/μL", flag: "high" },
          { name: "Creatinine", value: "1.8", unit: "mg/dL", flag: "high" },
          { name: "Glucose", value: "242", unit: "mg/dL", flag: "high" },
        ],
        assessmentFindings: [
          "Mental status unchanged — still drowsy, oriented to person only",
          "Lungs: crackles now extending to mid-lung fields bilaterally",
          "Skin remains warm, flushed",
          "No improvement in blood pressure despite 1L fluid",
          "Urine output last hour: 15 mL",
        ],
        nursingPriority: "Recognize fluid-refractory septic shock: hypotension persisting despite adequate fluid resuscitation indicates need for vasopressor support.",
        decisions: [
          {
            id: "request-vasopressors",
            text: "Report fluid non-response to provider, advocate for vasopressor initiation and ICU transfer",
            isOptimal: true,
            consequence: "Provider orders norepinephrine infusion, central line placement, and ICU transfer. This is the correct escalation — fluid-refractory hypotension in sepsis requires vasopressor support to maintain perfusion.",
            mechanismExplanation: "The pathological vasodilation from nitric oxide and cytokine-mediated vascular smooth muscle relaxation cannot be overcome by volume alone. Norepinephrine provides alpha-1 adrenergic vasoconstriction to restore vascular tone, plus mild beta-1 cardiac stimulation. Central access is needed for safe vasopressor administration. The lactate of 4.8 confirms significant tissue hypoperfusion — cells are resorting to anaerobic metabolism.",
            vitalChanges: { hr: 102, bp: "106/68", spo2: 93 },
          },
          {
            id: "more-fluids",
            text: "Continue rapid fluid bolus — complete the remaining liter and reassess",
            isOptimal: false,
            consequence: "Continued aggressive fluids in a patient already showing pulmonary crackles extending to mid-fields worsens pulmonary edema. SpO2 drops to 84% and the patient requires emergent intubation. The capillary leak from sepsis means much of the administered fluid leaks into interstitial spaces rather than expanding effective circulating volume.",
            mechanismExplanation: "In sepsis, endothelial dysfunction causes increased capillary permeability. Fluid administered IV leaks through damaged capillary junctions into interstitial tissues, particularly the lungs. More fluid in this context dilutes oncotic pressure further, worsening the trans-capillary leak. The patient develops non-cardiogenic pulmonary edema — the lungs flood with protein-rich fluid that impairs gas exchange.",
          },
          {
            id: "slow-fluids-watch",
            text: "Slow the fluid rate, elevate head of bed, continue monitoring vitals every 15 minutes",
            isOptimal: false,
            consequence: "While slowing fluids may prevent worsening pulmonary edema, this passive approach does nothing to address the vascular collapse. Blood pressure continues to drop, and organ perfusion deteriorates. Without vasopressor support, this patient is progressing toward multi-organ dysfunction.",
            mechanismExplanation: "Conservative management of septic shock is inappropriate once fluid resuscitation has failed. The 'watch and wait' approach allows continued tissue hypoperfusion — each minute of inadequate perfusion pressure extends cellular ischemia in the kidneys, liver, brain, and gut. The rising creatinine already signals acute kidney injury from insufficient renal perfusion pressure.",
          },
        ],
        criticalThinking: "The lactate level tells you about tissue perfusion at the cellular level. Why is lactate a more reliable indicator of clinical severity than blood pressure alone?",
      },
      {
        id: "icu-management",
        title: "ICU Stabilization & Decision Point",
        narrative: "Margaret is transferred to the ICU. Norepinephrine is titrated to maintain MAP >65 mmHg. A central line and arterial line are placed. Two hours into the ICU stay, you notice a concerning change.",
        vitals: { hr: 118, bp: "108/72", rr: 30, spo2: 86, temp: 39.4 },
        labs: [
          { name: "Lactate (repeat)", value: "6.2", unit: "mmol/L", flag: "critical" },
          { name: "pH", value: "7.28", unit: "", flag: "low" },
          { name: "PaO2", value: "58", unit: "mmHg", flag: "low" },
          { name: "PaCO2", value: "30", unit: "mmHg", flag: "low" },
          { name: "Platelets", value: "98", unit: "×10³/μL", flag: "low" },
        ],
        assessmentFindings: [
          "Norepinephrine at 12 mcg/min, MAP 68 mmHg",
          "Oxygen via high-flow nasal cannula 60L/min, FiO2 80%",
          "Patient no longer arousable to voice — requires painful stimulation",
          "Bilateral crackles throughout all lung fields",
          "Skin now mottled on knees and elbows",
          "No urine output for 2 hours",
        ],
        nursingPriority: "Recognize multi-organ dysfunction: rising lactate despite treatment, worsening oxygenation (PaO2/FiO2 ratio < 100), declining consciousness, anuria, and thrombocytopenia indicate progression toward multi-organ failure.",
        decisions: [
          {
            id: "prepare-intubation",
            text: "Alert provider to worsening trajectory: rising lactate, declining PaO2/FiO2 ratio, obtundation. Prepare for intubation and discuss goals of care given clinical trajectory",
            isOptimal: true,
            consequence: "The provider proceeds with intubation for airway protection and mechanical ventilation with ARDS-protective settings. A second vasopressor (vasopressin) is added. The team initiates a goals-of-care discussion with the family given the severity of multi-organ dysfunction. Corticosteroids are considered for refractory shock.",
            mechanismExplanation: "The PaO2/FiO2 ratio (58/0.80 = 72.5) meets criteria for severe ARDS. The rising lactate despite vasopressors indicates ongoing tissue hypoperfusion — the oxygen delivery-consumption imbalance is worsening. Thrombocytopenia suggests consumptive coagulopathy (possible early DIC). The mottling pattern reflects cutaneous microvascular failure — blood flow is being redirected away from skin to vital organs, and even that compensation is failing. This clinical trajectory requires both aggressive critical care intervention AND an honest assessment of prognosis.",
          },
          {
            id: "increase-norepi",
            text: "Increase norepinephrine rate and continue current plan — MAP is still above 65",
            isOptimal: false,
            consequence: "Simply titrating norepinephrine higher without addressing the worsening respiratory failure and obtundation delays critical interventions. The patient loses protective airway reflexes and aspirates, causing further deterioration.",
            mechanismExplanation: "Focusing solely on blood pressure (MAP >65) ignores the multi-organ dysfunction pattern. The lactate trend is more important than any single vital sign — a rising lactate despite treatment indicates that the current strategy is failing. Oxygen delivery is inadequate despite hemodynamic support. The obtundation signals brain dysfunction and loss of airway protective reflexes, making intubation urgent regardless of hemodynamic status.",
          },
          {
            id: "wait-antibiotics",
            text: "Antibiotics need more time to work — continue current management and reassess in 2 hours",
            isOptimal: false,
            consequence: "This passive approach ignores the accelerating clinical deterioration. The patient's trajectory is toward death without aggressive escalation. Two hours of continued decline at this severity will likely result in cardiac arrest.",
            mechanismExplanation: "While antibiotics are essential for source control, their therapeutic effect requires time to reduce bacterial burden. The patient's current deterioration is driven by the inflammatory response that is already in motion — the cytokine storm, capillary leak, and multi-organ dysfunction will not reverse simply by waiting for antibiotics to achieve bacterial kill. The immediate threat is respiratory failure, refractory shock, and progression to irreversible organ damage.",
          },
        ],
        criticalThinking: "The lactate has risen from 4.8 to 6.2 despite fluid resuscitation and vasopressors. What does this trend tell you about cellular metabolism and oxygen delivery that a single blood pressure reading cannot?",
      },
    ],
    debriefing: {
      keyLearning: [
        "Early sepsis recognition depends on pattern recognition across multiple subtle findings — no single vital sign is diagnostic",
        "Lactate trending is more valuable than static blood pressure for assessing tissue perfusion adequacy",
        "Fluid-refractory hypotension defines septic shock and mandates vasopressor therapy — continued fluid loading worsens pulmonary edema in the setting of capillary leak",
        "Multi-organ dysfunction (MODS) occurs when the inflammatory response overwhelms compensatory mechanisms — the trajectory, not any single value, determines prognosis",
        "Advocacy and escalation are core nursing competencies — recognizing when current management is failing requires both clinical knowledge and professional courage",
      ],
      mechanismSummary: "This case demonstrates the pathophysiological progression from localized infection (pneumonia) through systemic inflammatory response (sepsis) to distributive shock (septic shock) to multi-organ dysfunction syndrome. The cascade involves PAMP recognition → cytokine release → iNOS activation → nitric oxide-mediated vasodilation → capillary leak → third-spacing → reduced effective circulating volume → tissue hypoperfusion → anaerobic metabolism (lactate) → organ ischemia → cellular death.",
      commonErrors: [
        "Normalizing tachycardia and mild hypotension as 'patient baseline' without considering the clinical context",
        "Treating fever as the primary problem rather than recognizing it as a marker of systemic infection",
        "Over-relying on a single vital sign (SpO2 or BP) instead of assessing the constellation of findings",
        "Continuing aggressive fluid resuscitation after signs of pulmonary edema develop",
        "Waiting for dramatic deterioration before escalating care — sepsis kills through incremental decline",
      ],
    },
  },
  {
    id: "chest-pain-mi",
    title: "The Atypical Chest Pain Presentation",
    patientProfile: "Robert Williamson, 54-year-old male. PMH: Hyperlipidemia, smoking (30 pack-years), family history of MI (father at 52). Presented to ED 45 minutes ago via ambulance with epigastric discomfort. Initial ECG shows no ST elevation. Patient is on cardiac monitor.",
    chiefComplaint: "Epigastric 'heaviness' and nausea for 2 hours",
    category: "Cardiac",
    difficulty: "intermediate",
    bodySystem: "Cardiovascular",
    stages: [
      {
        id: "ed-triage",
        title: "Emergency Department Assessment",
        narrative: "Robert is sitting upright on the stretcher, appearing mildly uncomfortable. He describes a 'heaviness' in his upper abdomen that started while watching television. He initially thought it was indigestion and took antacids without relief. He denies classic 'chest pain' when asked directly. His wife called 911 when he became diaphoretic.",
        vitals: { hr: 88, bp: "142/88", rr: 18, spo2: 97, temp: 36.8, pain: 5 },
        labs: [
          { name: "Initial Troponin", value: "0.04", unit: "ng/mL", flag: "high" },
          { name: "Glucose", value: "168", unit: "mg/dL", flag: "high" },
        ],
        assessmentFindings: [
          "Describes 'heaviness' — not 'pain' — in epigastric region radiating to jaw",
          "Diaphoretic, pale, slightly anxious",
          "ECG: normal sinus rhythm, no ST elevation, subtle ST depression in leads II, III, aVF",
          "Lungs clear bilaterally",
          "Denies chest pain when asked directly but admits to 'pressure' on further questioning",
        ],
        nursingPriority: "Recognize atypical MI presentation: epigastric discomfort, jaw radiation, diaphoresis, and mildly elevated troponin in a patient with significant cardiac risk factors. Do not be reassured by the absence of classic 'chest pain' or ST elevation.",
        decisions: [
          {
            id: "treat-as-acs",
            text: "Treat as acute coronary syndrome: aspirin (if not given), 12-lead ECG with right-sided leads, serial troponins, cardiology notification, prepare for possible cath lab activation",
            isOptimal: true,
            consequence: "Aspirin 325mg chewed, IV access confirmed, serial troponins ordered q3h, cardiology consulted. Right-sided ECG reveals ST elevation in V4R — this is an inferior STEMI with right ventricular involvement that was missed on standard 12-lead. Cath lab is activated.",
            mechanismExplanation: "The troponin of 0.04 (above the 99th percentile upper reference limit) confirms myocardial injury. Subtle ST depression in leads II, III, aVF may represent reciprocal changes from a posterior wall MI or early inferior ischemia. The right-sided ECG is critical because inferior STEMI frequently involves the right ventricle — this has profound management implications (volume-dependent, avoid nitroglycerin and diuretics). The atypical presentation (epigastric discomfort rather than chest pain) is common in inferior MIs because the diaphragmatic surface of the heart shares vagal innervation with the upper GI tract.",
          },
          {
            id: "gi-workup",
            text: "The presentation sounds like GERD or gastritis — administer a GI cocktail, order an abdominal X-ray, and reassess for improvement",
            isOptimal: false,
            consequence: "The GI cocktail does not relieve symptoms. Two hours later, the repeat troponin returns at 2.8 ng/mL — a dramatic rise confirming acute MI. The delay in cardiac treatment has extended the ischemic time, resulting in larger infarct size and worse prognosis.",
            mechanismExplanation: "This represents a dangerous anchoring bias. The patient has multiple cardiac risk factors (smoking, hyperlipidemia, family history, male sex, age >50) and objective findings suggesting cardiac ischemia (elevated troponin, ST changes on ECG, diaphoresis). Anchoring on the 'epigastric' location while ignoring the risk profile and objective data is a recognized cognitive error in MI diagnosis. Inferior MIs are the most commonly missed because they frequently present with epigastric/abdominal symptoms due to shared vagal afferent pathways.",
          },
          {
            id: "repeat-troponin-wait",
            text: "The troponin is only mildly elevated — could be a false positive. Repeat in 6 hours and monitor",
            isOptimal: false,
            consequence: "Waiting 6 hours for a repeat troponin in a patient with active symptoms and cardiac risk factors delays potentially life-saving intervention. The standard is serial troponins q3h with high-sensitivity assays. During the wait, the patient develops ST elevation and hemodynamic instability.",
            mechanismExplanation: "Any troponin elevation above the 99th percentile in a symptomatic patient should be treated as myocardial injury until proven otherwise. The troponin is a biomarker of cardiomyocyte death — even 'mild' elevation represents actual cardiac muscle damage. With high-sensitivity troponin assays, the rise-and-fall pattern is diagnostic. Waiting extends ischemic time — in STEMI, the mantra is 'time is muscle.' Each minute of coronary occlusion kills more myocardium.",
          },
        ],
        criticalThinking: "Why might an inferior wall MI cause epigastric discomfort rather than 'classic' chest pain? Think about the anatomical relationship between the diaphragmatic surface of the heart and the GI tract.",
      },
      {
        id: "post-cath",
        title: "Post-Catheterization Management",
        narrative: "Catheterization reveals 95% occlusion of the right coronary artery. A drug-eluting stent is placed with successful reperfusion. Robert returns to the cardiac unit. Two hours post-procedure, you notice something concerning during your assessment.",
        vitals: { hr: 48, bp: "82/54", rr: 16, spo2: 95, temp: 36.6 },
        assessmentFindings: [
          "New bradycardia at 48 bpm (was 82 post-procedure)",
          "Hypotension — BP dropped from 118/74 to 82/54",
          "Patient reports feeling 'lightheaded' and 'cold'",
          "JVD present at 45 degrees",
          "Lungs remain clear",
          "Right femoral access site: small ecchymosis, no active bleeding, no hematoma",
        ],
        nursingPriority: "Recognize right ventricular infarction physiology: bradycardia (SA node ischemia), hypotension (RV failure), JVD (venous congestion), clear lungs (no left-sided failure). This presentation requires VOLUME, not diuretics.",
        decisions: [
          {
            id: "volume-resuscitation",
            text: "Recognize RV infarction pattern: hold any nitroglycerin/diuretics, request IV fluid bolus, place patient flat or Trendelenburg, notify provider of hemodynamic changes",
            isOptimal: true,
            consequence: "Provider orders 500mL NS bolus. Within 20 minutes, BP improves to 96/64 and heart rate increases to 56. Atropine is at bedside in case of worsening bradycardia. This volume-dependent management preserves RV preload.",
            mechanismExplanation: "The right coronary artery supplies both the inferior wall of the left ventricle AND the right ventricle (in ~85% of patients). RV infarction causes the right ventricle to lose contractile force, meaning it cannot effectively pump blood through the pulmonary vasculature to fill the left ventricle. The left ventricle becomes preload-starved — not from volume loss, but from RV pump failure. JVD with clear lungs is the hallmark: blood backs up into the systemic venous system (JVD) but does not reach the pulmonary circulation (clear lungs). Treatment requires volume to 'push' blood through the failing RV into the left ventricle. Nitroglycerin and diuretics would be catastrophic — they reduce preload, which the RV desperately needs.",
            vitalChanges: { hr: 56, bp: "96/64" },
          },
          {
            id: "give-nitroglycerin",
            text: "Bradycardia with hypotension after cardiac cath could be chest pain — administer sublingual nitroglycerin and prepare morphine",
            isOptimal: false,
            consequence: "Nitroglycerin causes venodilation, dramatically reducing preload. In RV infarction, this is catastrophic. BP plummets to 60/38 and the patient develops cardiogenic shock requiring emergent vasopressor support and temporary pacing.",
            mechanismExplanation: "This is one of the most critical teaching points in cardiology nursing. Nitroglycerin reduces preload by causing venodilation — blood pools in the venous capacitance vessels, less returns to the heart. In left ventricular failure, this is beneficial (reduces pulmonary congestion). In RIGHT ventricular failure, reducing preload removes the only driving force pushing blood through the failing RV. The result is acute hemodynamic collapse. This is why RV involvement must ALWAYS be assessed in inferior MI before administering nitroglycerin.",
          },
          {
            id: "suspect-bleeding",
            text: "Hypotension post-cath is likely retroperitoneal bleeding from the femoral access site — prepare for CT scan and type & crossmatch",
            isOptimal: false,
            consequence: "While retroperitoneal bleeding is a valid concern post-femoral cath, the clinical picture (bradycardia + JVD + clear lungs) is not consistent with hemorrhage. Hemorrhagic shock produces tachycardia (not bradycardia), flat neck veins (not JVD), and cool/clammy skin. A CT scan delays treatment of the actual problem — RV infarction hemodynamics.",
            mechanismExplanation: "Hemorrhage activates sympathetic compensation — tachycardia, vasoconstriction, and diaphoresis. The presence of bradycardia here suggests vagal involvement (inferior MI affects the SA node via the right coronary artery) or conduction system ischemia. JVD in hemorrhage would be absent because intravascular volume is depleted. The pattern recognition — hypotension + bradycardia + JVD + clear lungs — specifically points to RV failure, not volume loss.",
          },
        ],
        criticalThinking: "Why does the combination of JVD with clear lungs specifically indicate right-sided heart failure rather than left-sided? Trace the blood flow pathway through both sides of the heart.",
      },
    ],
    debriefing: {
      keyLearning: [
        "Atypical MI presentations (epigastric discomfort, nausea, jaw pain without 'chest pain') are common, especially in inferior wall MIs",
        "Right-sided ECG leads (V4R) must be obtained in any suspected inferior MI to assess for RV involvement",
        "RV infarction creates volume-dependent hemodynamics — nitroglycerin and diuretics are CONTRAINDICATED",
        "Pattern recognition (JVD + clear lungs + hypotension = right-sided failure) is more valuable than any single finding",
        "Anchoring bias on symptom location rather than integrating risk factors and objective data is a leading cause of missed MI",
      ],
      mechanismSummary: "This case demonstrates how RCA occlusion causes inferior STEMI with RV involvement. The inferior wall MI produces epigastric symptoms via shared vagal innervation. RV infarction leads to RV pump failure, creating a preload-dependent state where volume expansion is therapeutic and vasodilators are lethal. The SA node (supplied by the RCA in 60% of patients) becomes ischemic, causing bradycardia.",
      commonErrors: [
        "Dismissing 'epigastric discomfort' as GI pathology without cardiac workup",
        "Not obtaining right-sided ECG leads in inferior MI",
        "Administering nitroglycerin to a hypotensive patient with RV infarction",
        "Confusing RV failure hemodynamics (JVD + clear lungs) with hemorrhage or LV failure",
        "Anchoring on 'no ST elevation on standard 12-lead' without considering posterior or right-sided involvement",
      ],
    },
  },
  {
    id: "dka-management",
    title: "The Undiagnosed Diabetic Emergency",
    patientProfile: "Jason Torres, 19-year-old male. No significant PMH. Brought to ED by roommate who reports 3 days of increasing fatigue, excessive thirst, frequent urination, and today found Jason confused and vomiting.",
    chiefComplaint: "Confusion, vomiting, rapid breathing",
    category: "Endocrine Emergency",
    difficulty: "beginner",
    bodySystem: "Endocrine",
    stages: [
      {
        id: "ed-presentation",
        title: "Emergency Department Arrival",
        narrative: "Jason is brought in by wheelchair, leaning to one side, appearing acutely ill. He is breathing deeply and rapidly. You notice a distinctive sweet, fruity odor on his breath. His roommate reports Jason has lost about 15 pounds over the past month despite eating normally and has been drinking 'gallons' of water daily.",
        vitals: { hr: 128, bp: "92/58", rr: 32, spo2: 99, temp: 37.2 },
        labs: [
          { name: "Blood Glucose", value: "486", unit: "mg/dL", flag: "critical" },
          { name: "pH", value: "7.12", unit: "", flag: "critical" },
          { name: "Bicarbonate", value: "8", unit: "mEq/L", flag: "critical" },
          { name: "Potassium", value: "5.6", unit: "mEq/L", flag: "high" },
          { name: "Anion Gap", value: "28", unit: "mEq/L", flag: "critical" },
          { name: "BHB (ketones)", value: "6.8", unit: "mmol/L", flag: "critical" },
        ],
        assessmentFindings: [
          "Kussmaul breathing: deep, rapid, labored respirations",
          "Fruity/acetone odor on breath",
          "Skin: dry, poor turgor (tenting on sternum >3 seconds)",
          "Mucous membranes dry and cracked",
          "Drowsy, oriented to person only, speech slurred",
          "Weight-based estimate of 10-15% dehydration",
        ],
        nursingPriority: "Recognize classic DKA presentation: hyperglycemia, metabolic acidosis (pH <7.3, bicarb <18), ketonemia, and volume depletion. Initiate DKA protocol: aggressive IV hydration first, then insulin infusion.",
        decisions: [
          {
            id: "start-dka-protocol",
            text: "Initiate DKA protocol: begin aggressive IV normal saline (1-1.5L in first hour), establish two large-bore IVs, continuous cardiac monitoring, prepare insulin drip but do NOT start until potassium is confirmed adequate",
            isOptimal: true,
            consequence: "Protocol initiated correctly. First priority is volume resuscitation — Jason is severely dehydrated from osmotic diuresis. Insulin drip will be started after confirming K+ is ≥3.3 mEq/L (current K+ 5.6 is adequate, but will drop rapidly once insulin is given). Hourly glucose, q2h BMP ordered.",
            mechanismExplanation: "DKA management follows a specific physiological sequence: (1) Volume first — osmotic diuresis from glucosuria has caused severe dehydration (estimated 5-7L deficit). NS restores intravascular volume and improves renal perfusion. (2) Insulin second — insulin drives glucose into cells AND stops ketogenesis, but it also shifts potassium intracellularly. The serum K+ of 5.6 is misleadingly high — total body potassium is severely depleted from renal losses. Once insulin is started, K+ will plummet. (3) Potassium monitoring and replacement are critical safety steps throughout treatment.",
          },
          {
            id: "insulin-first",
            text: "Start an insulin drip immediately — the glucose of 486 is the most urgent problem to correct",
            isOptimal: false,
            consequence: "Starting insulin before adequate hydration creates two problems: (1) Without volume resuscitation, the insulin cannot be delivered to tissues effectively through collapsed vasculature, and (2) rapid glucose correction without volume risks cerebral edema, especially in young patients. Additionally, insulin will cause K+ to shift intracellularly, potentially causing lethal hypokalemia if potassium replacement is not planned.",
            mechanismExplanation: "The glucose is NOT the most immediately life-threatening problem — the acidosis and dehydration are. The pH of 7.12 means the patient's blood is dangerously acidic, impairing enzyme function, cardiac contractility, and cellular processes. The Kussmaul breathing is a respiratory compensation — the body is desperately blowing off CO2 to buffer the metabolic acidosis. Volume resuscitation alone will begin to lower glucose (through improved renal perfusion and glucosuria) and improve acidosis (through improved tissue perfusion). Insulin is critical but must follow hydration.",
          },
          {
            id: "bicarb-drip",
            text: "The pH of 7.12 is critically low — start a sodium bicarbonate drip to correct the acidosis directly",
            isOptimal: false,
            consequence: "Routine bicarbonate administration in DKA is not recommended unless pH is below 6.9. At pH 7.12, the acidosis will correct as ketogenesis stops (with insulin) and volume status improves. Bicarbonate can cause paradoxical CNS acidosis, worsen hypokalemia (shifts K+ intracellularly), and cause rebound alkalosis.",
            mechanismExplanation: "Bicarbonate therapy in DKA is counterintuitive because the acidosis is caused by ketoacid accumulation, not bicarbonate loss. Once insulin stops ketone production and the liver metabolizes existing ketones, each molecule of beta-hydroxybutyrate that is metabolized regenerates one bicarbonate ion naturally. Giving exogenous bicarbonate interferes with this self-correcting process, can overshoot to alkalosis, and the CO2 generated from bicarbonate crosses the blood-brain barrier faster than the bicarbonate itself — potentially worsening cerebral acidosis.",
          },
        ],
        criticalThinking: "The potassium is 5.6 — technically 'high.' But is this patient truly potassium-overloaded? Consider what happens to potassium distribution in acidosis and insulin deficiency.",
      },
      {
        id: "insulin-drip-monitoring",
        title: "Insulin Drip Monitoring — The Critical Window",
        narrative: "Jason has received 2L NS in the first hour. An insulin drip is initiated at 0.1 units/kg/hr. Three hours into treatment, the hourly labs return.",
        vitals: { hr: 106, bp: "108/68", rr: 24, spo2: 99, temp: 37.0 },
        labs: [
          { name: "Blood Glucose", value: "248", unit: "mg/dL", flag: "high" },
          { name: "pH", value: "7.22", unit: "", flag: "low" },
          { name: "Bicarbonate", value: "12", unit: "mEq/L", flag: "low" },
          { name: "Potassium", value: "3.4", unit: "mEq/L", flag: "low" },
          { name: "Anion Gap", value: "18", unit: "mEq/L", flag: "high" },
        ],
        assessmentFindings: [
          "More alert, answering questions appropriately",
          "Breathing rate improving but still deep",
          "Glucose dropped from 486 to 248 mg/dL",
          "Potassium dropped from 5.6 to 3.4 mEq/L",
          "Urine output improving: 150 mL in last hour",
        ],
        nursingPriority: "The glucose is approaching 250 — transition IV fluids to dextrose-containing solution to prevent hypoglycemia while continuing insulin to clear ketones. The potassium drop is critical — replace aggressively.",
        decisions: [
          {
            id: "add-dextrose-replace-k",
            text: "Switch IV to D5 half-NS, continue insulin drip (do NOT stop it), begin IV potassium replacement at 20-40 mEq/hr with cardiac monitoring, notify provider of K+ of 3.4",
            isOptimal: true,
            consequence: "The insulin drip continues at current rate while D5 solution provides glucose substrate to prevent hypoglycemia. Potassium is replaced aggressively. The pH will continue to improve as insulin clears ketones. The anion gap is closing — treatment is working.",
            mechanismExplanation: "This is the most critical management concept in DKA: the goal of insulin is to STOP KETOGENESIS, not just lower glucose. The acidosis, not the hyperglycemia, is what kills. When glucose approaches 200-250, adding dextrose allows continued insulin infusion (to clear remaining ketones) without causing hypoglycemia. Stopping insulin because glucose is 'better' would allow ketogenesis to resume, and the acidosis would worsen again. The K+ drop from 5.6 to 3.4 in 3 hours demonstrates the dramatic transcellular shift caused by insulin — the Na+/K+ ATPase pumps activated by insulin are pulling potassium back into cells, unmasking the true total body depletion. Without replacement, life-threatening hypokalemia will develop within hours.",
            vitalChanges: { hr: 94, bp: "112/72", rr: 20 },
          },
          {
            id: "stop-insulin",
            text: "Glucose has dropped significantly — stop the insulin drip to prevent hypoglycemia. Resume when glucose stabilizes.",
            isOptimal: false,
            consequence: "Stopping insulin allows ketogenesis to resume immediately. Within 2 hours, the pH drops back to 7.18 and anion gap widens. The patient's mental status deteriorates again. This is one of the most common and dangerous errors in DKA management.",
            mechanismExplanation: "This error reflects a fundamental misunderstanding of DKA pathophysiology. The insulin is not being given primarily to lower glucose — it is being given to stop the liver from converting fatty acids into ketone bodies. Without insulin, hormone-sensitive lipase remains active, free fatty acids continue flooding the liver, and ketogenesis continues unabated. The acidosis is the lethal component, not the hyperglycemia. Stopping insulin to 'let glucose stabilize' removes the only treatment addressing the underlying metabolic crisis.",
          },
          {
            id: "ignore-potassium",
            text: "Potassium of 3.4 is only slightly low — continue current plan and recheck in 4 hours",
            isOptimal: false,
            consequence: "The potassium continues to drop as insulin drives more K+ intracellularly. Two hours later, K+ is 2.8 mEq/L. The cardiac monitor shows ST depression, prominent U waves, and occasional PVCs. The patient is now at risk for ventricular tachycardia or fibrillation.",
            mechanismExplanation: "In the context of ongoing insulin infusion, a K+ of 3.4 is trending rapidly downward and will not stabilize without replacement. The insulin-driven transcellular shift is continuous. Hypokalemia at this level prolongs cardiac repolarization (visible as QT prolongation and U waves on ECG), creates membrane instability in cardiac myocytes, and increases the risk of re-entrant arrhythmias. The DKA protocol mandates potassium replacement when K+ falls below 5.3 during insulin therapy — waiting for 'significant' hypokalemia is a critical safety failure.",
          },
        ],
        criticalThinking: "The glucose has been cut nearly in half, but the pH has only improved from 7.12 to 7.22. Why doesn't glucose correction directly correlate with acidosis correction? What is actually driving the pH?",
      },
    ],
    debriefing: {
      keyLearning: [
        "DKA management priorities: Volume FIRST, then insulin, with continuous potassium monitoring",
        "Never stop insulin because glucose is improving — the acidosis, not hyperglycemia, is the lethal component. Add dextrose to allow continued insulin therapy",
        "Serum potassium in DKA is falsely elevated due to acidosis and insulin deficiency. Total body K+ is severely depleted. Insulin will unmask this depletion rapidly",
        "Kussmaul breathing is respiratory compensation for metabolic acidosis — it is NOT a primary respiratory problem and should not be treated with supplemental oxygen or ventilatory changes",
        "Fruity breath odor is exhaled acetone — a volatile ketone body. Its presence is a clinical sign of active ketogenesis",
      ],
      mechanismSummary: "DKA occurs when absolute insulin deficiency prevents glucose uptake, triggering lipolysis → beta-oxidation → ketogenesis. The ketone bodies (beta-hydroxybutyrate and acetoacetate) are strong acids that dissociate in blood, releasing H+ ions and causing high anion gap metabolic acidosis. The hyperglycemia causes osmotic diuresis (glucose exceeds renal threshold → glucosuria → water follows → polyuria → dehydration). The acidosis drives potassium out of cells (H+/K+ exchange), creating falsely elevated serum K+ while total body stores are depleted. Treatment reverses this cascade: fluids restore volume, insulin stops ketogenesis and allows glucose uptake, and potassium replacement prevents the lethal hypokalemia that occurs as insulin shifts K+ back into cells.",
      commonErrors: [
        "Starting insulin before ensuring adequate hydration and potassium monitoring",
        "Stopping insulin when glucose approaches normal — this is the #1 DKA management error",
        "Giving bicarbonate for pH >6.9 — the acidosis self-corrects when ketogenesis stops",
        "Not monitoring potassium frequently enough during insulin therapy",
        "Treating Kussmaul breathing with respiratory interventions rather than recognizing it as metabolic compensation",
      ],
    },
  },
];
