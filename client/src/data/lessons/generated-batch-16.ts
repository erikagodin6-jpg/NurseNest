import type { LessonContent } from "./types";

export const generatedBatch16Lessons: Record<string, LessonContent> = {
  "liver-function-np": {
    title: "Liver Function",
    cellular: { title: "Pathophysiology of Liver Function", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["NSAID or aspirin use", "Helicobacter pylori infection", "Alcohol consumption", "Tobacco use", "High-fat or processed diet", "Family history of GI conditions"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Abdominal pain or tenderness", "Nausea and vomiting", "Changes in bowel habits", "Abdominal distension", "Hematemesis or melena"],
      right: ["Jaundice or scleral icterus", "Guarding or rebound tenderness", "Absent or hyperactive bowel sounds", "Weight loss or anorexia", "Dysphagia"]
    },
    medications: [{
      name: "Ondansetron",
      type: "5-HT3 receptor antagonist",
      action: "Blocks serotonin receptors in the chemoreceptor trigger zone and vagal nerve terminals",
      sideEffects: "Headache, constipation, QT prolongation, dizziness",
      contra: "Concomitant use with apomorphine; caution in patients with congenital long QT syndrome",
      pearl: "Obtain baseline ECG in patients with cardiac history; can be given IV, IM, or orally"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with liver function. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with liver function?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lochia-assessment-rpn": {
    title: "Lochia Assessment Postpartum",
    cellular: { title: "Pathophysiology of Lochia Assessment Postpartum", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with lochia assessment postpartum. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lochia assessment postpartum?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "locked-in-syndrome-np": {
    title: "Locked-In Syndrome: Assessment & Communication",
    cellular: { title: "Pathophysiology of Locked-In Syndrome: Assessment & Communication", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with locked-in syndrome: assessment & communication. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with locked-in syndrome: assessment & communication?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "locked-in-syndrome-rn": {
    title: "Locked-In Syndrome",
    cellular: { title: "Pathophysiology of Locked-In Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with locked-in syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with locked-in syndrome?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "low-back-pain-np": {
    title: "Low Back Pain: Evidence-Based Evaluation",
    cellular: { title: "Pathophysiology of Low Back Pain: Evidence-Based Evaluation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Morphine",
      type: "Opioid analgesic",
      action: "Binds to mu-opioid receptors in the CNS to alter pain perception and emotional response",
      sideEffects: "Respiratory depression, constipation, sedation, nausea, urinary retention, pruritus",
      contra: "Severe respiratory depression, acute or severe asthma without monitoring, paralytic ileus",
      pearl: "Monitor respiratory rate (hold if below 12); naloxone is the reversal agent; assess pain using validated scale before and after administration"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with low back pain: evidence-based evaluation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with low back pain: evidence-based evaluation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lung-auscultation-interpretation-np": {
    title: "Lung Auscultation Interpretation",
    cellular: { title: "Pathophysiology of Lung Auscultation Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco smoking history", "Occupational exposure to dust or chemicals", "History of childhood respiratory infections", "Allergies and atopic conditions", "Immunocompromised state", "Air pollution exposure"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Respiratory rate, depth, and pattern", "Oxygen saturation via pulse oximetry", "Lung sounds bilaterally in all fields", "Accessory muscle use and work of breathing", "Cough characteristics and sputum quality"],
    signs: {
      left: ["Dyspnea or tachypnea", "Cough (productive or nonproductive)", "Wheezing or stridor", "Use of accessory muscles", "Decreased oxygen saturation"],
      right: ["Crackles or rhonchi on auscultation", "Chest wall asymmetry", "Hemoptysis", "Cyanosis (central or peripheral)", "Altered breath sounds or absent sounds"]
    },
    medications: [{
      name: "Fluticasone",
      type: "Inhaled corticosteroid",
      action: "Reduces airway inflammation by suppressing inflammatory mediators and cytokine production",
      sideEffects: "Oral thrush, hoarseness, pharyngitis, adrenal suppression with high doses",
      contra: "Active untreated pulmonary infection, status asthmaticus (not for acute relief)",
      pearl: "Rinse mouth after use to prevent oral candidiasis; not a rescue medication"
    }],
    pearls: ["Assess respiratory rate before disturbing the patient for accuracy", "Position the patient upright (high Fowler) to maximize lung expansion", "Auscultate all lung fields systematically, comparing bilateral sides", "Pulse oximetry less than 94% on room air warrants further evaluation", "Never discontinue supplemental oxygen abruptly in chronic CO2 retainers"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with lung auscultation interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lung auscultation interpretation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lupus-nephritis-rn": {
    title: "Lupus Nephritis",
    cellular: { title: "Pathophysiology of Lupus Nephritis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Osteoporosis or low bone density", "History of falls or previous fractures", "Sedentary lifestyle", "Autoimmune conditions", "Corticosteroid use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Allopurinol",
      type: "Xanthine oxidase inhibitor",
      action: "Reduces uric acid production by inhibiting xanthine oxidase enzyme",
      sideEffects: "Rash (may be severe - Stevens-Johnson), GI upset, elevated liver enzymes",
      contra: "Concurrent azathioprine or mercaptopurine use without dose reduction",
      pearl: "Start at low dose and titrate gradually; do not initiate during acute gout flare"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with lupus nephritis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lupus nephritis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lvad-thrombosis-rn": {
    title: "LVAD Thrombosis",
    cellular: { title: "Pathophysiology of LVAD Thrombosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Hypertension", "Hyperlipidemia", "Diabetes mellitus", "Tobacco use", "Family history of cardiovascular disease", "Obesity and sedentary lifestyle"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Heart rate, rhythm, and regularity", "Blood pressure in both arms", "Peripheral pulse quality and capillary refill", "Jugular venous pressure", "Presence of edema (location, severity, pitting)"],
    signs: {
      left: ["Chest pain or pressure", "Dyspnea or orthopnea", "Irregular pulse or palpitations", "Peripheral edema", "Jugular venous distension"],
      right: ["Diaphoresis", "Fatigue and exercise intolerance", "Syncope or near-syncope", "Cool or mottled extremities", "S3 or S4 heart sounds"]
    },
    medications: [{
      name: "Metoprolol",
      type: "Beta-blocker",
      action: "Reduces heart rate and myocardial oxygen demand by blocking beta-1 receptors",
      sideEffects: "Bradycardia, fatigue, hypotension, bronchospasm, dizziness",
      contra: "Severe bradycardia, heart block greater than first degree, cardiogenic shock, decompensated heart failure",
      pearl: "Hold if heart rate is below 60 bpm or systolic BP below 100 mmHg; do not stop abruptly"
    }],
    pearls: ["Always obtain a 12-lead ECG within 10 minutes for chest pain", "Measure orthostatic vital signs when assessing for volume status", "Remember: MONA is no longer the default ACS protocol - follow current guidelines", "Assess bilateral pedal pulses and compare for symmetry", "Weigh heart failure patients daily at the same time with the same scale"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with lvad thrombosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lvad thrombosis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lyme-disease-basics-rpn": {
    title: "Lyme Disease Basics",
    cellular: { title: "Pathophysiology of Lyme Disease Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with lyme disease basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lyme disease basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lyme-disease-np": {
    title: "Lyme Disease: Staging & Doxycycline Protocols",
    cellular: { title: "Pathophysiology of Lyme Disease: Staging & Doxycycline Protocols", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with lyme disease: staging & doxycycline protocols. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lyme disease: staging & doxycycline protocols?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphangioleiomyomatosis-rn": {
    title: "Lymphangioleiomyomatosis (LAM)",
    cellular: { title: "Pathophysiology of Lymphangioleiomyomatosis (LAM)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with lymphangioleiomyomatosis (lam). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymphangioleiomyomatosis (lam)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphatic-assessment": {
    title: "Lymph Node Assessment",
    cellular: { title: "Pathophysiology of Lymph Node Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with lymph node assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymph node assessment?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphedema-assessment-np": {
    title: "Lymphedema Assessment and Staging",
    cellular: { title: "Pathophysiology of Lymphedema Assessment and Staging", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with lymphedema assessment and staging. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymphedema assessment and staging?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphoma-basics-onc-rpn": {
    title: "Lymphoma Basics",
    cellular: { title: "Pathophysiology of Lymphoma Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Genetic predisposition", "Nutritional deficiencies (iron, B12, folate)", "Chronic disease states", "Medication-induced blood dyscrasias", "Exposure to radiation or chemicals", "Autoimmune conditions"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Enoxaparin",
      type: "Low molecular weight heparin",
      action: "Inhibits factor Xa to prevent thrombus formation and propagation",
      sideEffects: "Bleeding, injection site hematoma, thrombocytopenia, elevated liver enzymes",
      contra: "Active major bleeding, HIT, hypersensitivity to pork products",
      pearl: "Inject subcutaneously in the abdomen; do not expel air bubble; monitor anti-Xa levels in renal impairment"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with lymphoma basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymphoma basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphoma-basics-rpn": {
    title: "Lymphoma Basics",
    cellular: { title: "Pathophysiology of Lymphoma Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Genetic predisposition", "Nutritional deficiencies (iron, B12, folate)", "Chronic disease states", "Medication-induced blood dyscrasias", "Exposure to radiation or chemicals", "Autoimmune conditions"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Enoxaparin",
      type: "Low molecular weight heparin",
      action: "Inhibits factor Xa to prevent thrombus formation and propagation",
      sideEffects: "Bleeding, injection site hematoma, thrombocytopenia, elevated liver enzymes",
      contra: "Active major bleeding, HIT, hypersensitivity to pork products",
      pearl: "Inject subcutaneously in the abdomen; do not expel air bubble; monitor anti-Xa levels in renal impairment"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with lymphoma basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymphoma basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "lymphoma-workup-np": {
    title: "Lymphoma Workup: Hodgkin vs Non-Hodgkin & Ann Arbor Staging",
    cellular: { title: "Pathophysiology of Lymphoma Workup: Hodgkin vs Non-Hodgkin & Ann Arbor Staging", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Genetic predisposition", "Nutritional deficiencies (iron, B12, folate)", "Chronic disease states", "Medication-induced blood dyscrasias", "Exposure to radiation or chemicals", "Autoimmune conditions"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Warfarin",
      type: "Vitamin K antagonist",
      action: "Inhibits vitamin K-dependent clotting factor synthesis (II, VII, IX, X)",
      sideEffects: "Bleeding, bruising, skin necrosis, purple toe syndrome",
      contra: "Active bleeding, pregnancy, severe hepatic disease, recent CNS surgery",
      pearl: "Monitor INR regularly (target 2-3 for most indications); vitamin K is the antidote"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with lymphoma workup: hodgkin vs non-hodgkin & ann arbor staging. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lymphoma workup: hodgkin vs non-hodgkin & ann arbor staging?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "macular-degeneration-rpn": {
    title: "Macular Degeneration",
    cellular: { title: "Pathophysiology of Macular Degeneration", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with macular degeneration. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with macular degeneration?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "magnesium-imbalance-rpn": {
    title: "Magnesium Imbalances",
    cellular: { title: "Pathophysiology of Magnesium Imbalances", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with magnesium imbalances. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with magnesium imbalances?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "major-depression": {
    title: "Major Depressive Disorder",
    cellular: { title: "Pathophysiology of Major Depressive Disorder", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of psychiatric disorders", "Childhood trauma or adverse experiences", "Substance use disorder", "Chronic stress or social isolation", "Traumatic life events", "Chronic medical conditions"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in mood or affect", "Sleep disturbances (insomnia or hypersomnia)", "Social withdrawal or isolation", "Agitation or psychomotor retardation", "Altered thought processes"],
      right: ["Suicidal or homicidal ideation", "Hallucinations or delusions", "Impaired judgment or insight", "Self-harm behaviors", "Substance use indicators"]
    },
    medications: [{
      name: "Sertraline",
      type: "Selective serotonin reuptake inhibitor (SSRI)",
      action: "Inhibits serotonin reuptake in the synaptic cleft to increase serotonergic neurotransmission",
      sideEffects: "Nausea, diarrhea, sexual dysfunction, insomnia, serotonin syndrome risk",
      contra: "Concurrent use with MAOIs (14-day washout required), pimozide, or thioridazine",
      pearl: "Takes 4-6 weeks for full therapeutic effect; monitor for suicidal ideation in young adults"
    }],
    pearls: ["Always perform a safety assessment including suicidal and homicidal ideation", "Use therapeutic communication techniques: active listening, open-ended questions", "Avoid arguing with delusions; do not reinforce them but acknowledge the patient's feelings", "Monitor for medication side effects especially in the first weeks of treatment", "Document mental status examination findings using objective, measurable terms"],
    quiz: [
      {
        question: "A nurse is caring for a patient with major depressive disorder. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with major depressive disorder?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "malabsorption-syndromes-rpn": {
    title: "Malabsorption Syndromes",
    cellular: { title: "Pathophysiology of Malabsorption Syndromes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with malabsorption syndromes. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with malabsorption syndromes?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "malaria-basics-rpn": {
    title: "Malaria Basics",
    cellular: { title: "Pathophysiology of Malaria Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with malaria basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with malaria basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "malignant-hypercalcemia-rn": {
    title: "Malignant Hypercalcemia",
    cellular: { title: "Pathophysiology of Malignant Hypercalcemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco use", "Family history of cancer", "Exposure to carcinogens or radiation", "Chronic inflammatory conditions", "Immunosuppression", "Genetic mutations (BRCA, Lynch syndrome)"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ondansetron",
      type: "5-HT3 receptor antagonist",
      action: "Blocks serotonin receptors to prevent chemotherapy-induced nausea and vomiting",
      sideEffects: "Headache, constipation, QT prolongation, dizziness",
      contra: "Concurrent apomorphine use; caution with congenital long QT syndrome",
      pearl: "Administer 30 minutes before chemotherapy; can be combined with dexamethasone for enhanced effect"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with malignant hypercalcemia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with malignant hypercalcemia?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "malignant-hyperthermia-rn": {
    title: "Malignant Hyperthermia (Advanced)",
    cellular: { title: "Pathophysiology of Malignant Hyperthermia (Advanced)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco use", "Family history of cancer", "Exposure to carcinogens or radiation", "Chronic inflammatory conditions", "Immunosuppression", "Genetic mutations (BRCA, Lynch syndrome)"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ondansetron",
      type: "5-HT3 receptor antagonist",
      action: "Blocks serotonin receptors to prevent chemotherapy-induced nausea and vomiting",
      sideEffects: "Headache, constipation, QT prolongation, dizziness",
      contra: "Concurrent apomorphine use; caution with congenital long QT syndrome",
      pearl: "Administer 30 minutes before chemotherapy; can be combined with dexamethasone for enhanced effect"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with malignant hyperthermia (advanced). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with malignant hyperthermia (advanced)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mallory-weiss-tear-rn": {
    title: "Mallory-Weiss Tear",
    cellular: { title: "Pathophysiology of Mallory-Weiss Tear", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with mallory-weiss tear. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mallory-weiss tear?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mandatory-imaging-np": {
    title: "When Is Imaging Mandatory?",
    cellular: { title: "Pathophysiology of When Is Imaging Mandatory?", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with when is imaging mandatory?. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with when is imaging mandatory??",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mandatory-reporting-rpn": {
    title: "Mandatory Reporting Obligations",
    cellular: { title: "Pathophysiology of Mandatory Reporting Obligations", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with mandatory reporting obligations. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mandatory reporting obligations?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "masd-rpn": {
    title: "Moisture-Associated Skin Damage",
    cellular: { title: "Pathophysiology of Moisture-Associated Skin Damage", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with moisture-associated skin damage. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with moisture-associated skin damage?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "massive-hemorrhage-rn": {
    title: "Massive Hemorrhage Protocol",
    cellular: { title: "Pathophysiology of Massive Hemorrhage Protocol", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with massive hemorrhage protocol. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with massive hemorrhage protocol?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "massive-transfusion-np": {
    title: "Massive Transfusion Protocol: 1:1:1 Ratio",
    cellular: { title: "Pathophysiology of Massive Transfusion Protocol: 1:1:1 Ratio", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Genetic predisposition", "Nutritional deficiencies (iron, B12, folate)", "Chronic disease states", "Medication-induced blood dyscrasias", "Exposure to radiation or chemicals", "Autoimmune conditions"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Warfarin",
      type: "Vitamin K antagonist",
      action: "Inhibits vitamin K-dependent clotting factor synthesis (II, VII, IX, X)",
      sideEffects: "Bleeding, bruising, skin necrosis, purple toe syndrome",
      contra: "Active bleeding, pregnancy, severe hepatic disease, recent CNS surgery",
      pearl: "Monitor INR regularly (target 2-3 for most indications); vitamin K is the antidote"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with massive transfusion protocol: 1:1:1 ratio. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with massive transfusion protocol: 1:1:1 ratio?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mast-cell-activation-np": {
    title: "Mast Cell Activation Syndrome: Tryptase & Management",
    cellular: { title: "Pathophysiology of Mast Cell Activation Syndrome: Tryptase & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with mast cell activation syndrome: tryptase & management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mast cell activation syndrome: tryptase & management?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mastitis-basics-rpn": {
    title: "Mastitis Basics",
    cellular: { title: "Pathophysiology of Mastitis Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with mastitis basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mastitis basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "maternity-np": {
    title: "HELLP Syndrome: Hepatic Cascade",
    cellular: { title: "Pathophysiology of HELLP Syndrome: Hepatic Cascade", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced maternal age (35 years or older)", "Pre-existing chronic conditions (diabetes, hypertension)", "History of pregnancy complications", "Multiple gestation", "Substance use during pregnancy", "Inadequate prenatal care"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Oxytocin",
      type: "Uterotonic",
      action: "Stimulates uterine smooth muscle contraction and promotes milk ejection reflex",
      sideEffects: "Uterine hyperstimulation, water intoxication, hypotension, fetal distress",
      contra: "Unfavorable fetal position, placenta previa, cord prolapse, prior classical cesarean section",
      pearl: "Always administer via infusion pump; monitor FHR and contraction pattern continuously"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with hellp syndrome: hepatic cascade. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with hellp syndrome: hepatic cascade?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "maternity-rn": {
    title: "Preeclampsia & Mag Safety",
    cellular: { title: "Pathophysiology of Preeclampsia & Mag Safety", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced maternal age (35 years or older)", "Pre-existing chronic conditions (diabetes, hypertension)", "History of pregnancy complications", "Multiple gestation", "Substance use during pregnancy", "Inadequate prenatal care"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Oxytocin",
      type: "Uterotonic",
      action: "Stimulates uterine smooth muscle contraction and promotes milk ejection reflex",
      sideEffects: "Uterine hyperstimulation, water intoxication, hypotension, fetal distress",
      contra: "Unfavorable fetal position, placenta previa, cord prolapse, prior classical cesarean section",
      pearl: "Always administer via infusion pump; monitor FHR and contraction pattern continuously"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with preeclampsia & mag safety. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with preeclampsia & mag safety?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "maternity-rpn": {
    title: "Prenatal Care Essentials",
    cellular: { title: "Pathophysiology of Prenatal Care Essentials", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced maternal age (35 years or older)", "Pre-existing chronic conditions (diabetes, hypertension)", "History of pregnancy complications", "Multiple gestation", "Substance use during pregnancy", "Inadequate prenatal care"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Oxytocin",
      type: "Uterotonic",
      action: "Stimulates uterine smooth muscle contraction and promotes milk ejection reflex",
      sideEffects: "Uterine hyperstimulation, water intoxication, hypotension, fetal distress",
      contra: "Unfavorable fetal position, placenta previa, cord prolapse, prior classical cesarean section",
      pearl: "Always administer via infusion pump; monitor FHR and contraction pattern continuously"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with prenatal care essentials. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with prenatal care essentials?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mctd-np": {
    title: "Mixed Connective Tissue Disease: Overlap Syndrome Workup",
    cellular: { title: "Pathophysiology of Mixed Connective Tissue Disease: Overlap Syndrome Workup", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with mixed connective tissue disease: overlap syndrome workup. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mixed connective tissue disease: overlap syndrome workup?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mctd-rn": {
    title: "Mctd",
    cellular: { title: "Pathophysiology of Mctd", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with mctd. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mctd?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mdd-dsm5-criteria-np": {
    title: "Mdd Dsm5 Criteria",
    cellular: { title: "Pathophysiology of Mdd Dsm5 Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with mdd dsm5 criteria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mdd dsm5 criteria?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mds-rn": {
    title: "Myelodysplastic Syndromes (MDS)",
    cellular: { title: "Pathophysiology of Myelodysplastic Syndromes (MDS)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with myelodysplastic syndromes (mds). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with myelodysplastic syndromes (mds)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "measles-rpn": {
    title: "Measles",
    cellular: { title: "Pathophysiology of Measles", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with measles. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with measles?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mechanical-circulatory-support-rn": {
    title: "Mechanical Circulatory Support Complications",
    cellular: { title: "Pathophysiology of Mechanical Circulatory Support Complications", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with mechanical circulatory support complications. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mechanical circulatory support complications?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "mediastinitis-rn": {
    title: "Mediastinitis",
    cellular: { title: "Pathophysiology of Mediastinitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with mediastinitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mediastinitis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "medication-errors-rpn": {
    title: "Medication Errors and Prevention",
    cellular: { title: "Pathophysiology of Medication Errors and Prevention", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with medication errors and prevention. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with medication errors and prevention?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "medication-selection-logic-np": {
    title: "Medication Selection Logic",
    cellular: { title: "Pathophysiology of Medication Selection Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with medication selection logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with medication selection logic?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "med-interactions": {
    title: "Common Drug Interactions",
    cellular: { title: "Pathophysiology of Common Drug Interactions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with common drug interactions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with common drug interactions?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "med-math-core": {
    title: "Dosage Calculation Fundamentals",
    cellular: { title: "Pathophysiology of Dosage Calculation Fundamentals", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with dosage calculation fundamentals. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dosage calculation fundamentals?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "med-rights": {
    title: "Med Rights",
    cellular: { title: "Pathophysiology of Med Rights", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with med rights. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with med rights?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "melanoma-staging-np": {
    title: "Melanoma Staging",
    cellular: { title: "Pathophysiology of Melanoma Staging", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco use", "Family history of cancer", "Exposure to carcinogens or radiation", "Chronic inflammatory conditions", "Immunosuppression", "Genetic mutations (BRCA, Lynch syndrome)"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ondansetron",
      type: "5-HT3 receptor antagonist",
      action: "Blocks serotonin receptors to prevent chemotherapy-induced nausea and vomiting",
      sideEffects: "Headache, constipation, QT prolongation, dizziness",
      contra: "Concurrent apomorphine use; caution with congenital long QT syndrome",
      pearl: "Administer 30 minutes before chemotherapy; can be combined with dexamethasone for enhanced effect"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with melanoma staging. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with melanoma staging?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "membranous-nephropathy-rn": {
    title: "Membranous Nephropathy",
    cellular: { title: "Pathophysiology of Membranous Nephropathy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Tamsulosin",
      type: "Alpha-1 blocker",
      action: "Relaxes smooth muscle in the prostate and bladder neck to improve urinary flow",
      sideEffects: "Orthostatic hypotension, dizziness, retrograde ejaculation, nasal congestion",
      contra: "Hypersensitivity to tamsulosin; caution with concurrent PDE5 inhibitors",
      pearl: "Take 30 minutes after the same meal each day; warn about intraoperative floppy iris syndrome"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with membranous nephropathy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with membranous nephropathy?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "meniere-disease": {
    title: "Meniere Disease",
    cellular: { title: "Pathophysiology of Meniere Disease", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with meniere disease. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with meniere disease?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "menieres-disease-basics-rpn": {
    title: "Meniere's Disease Basics",
    cellular: { title: "Pathophysiology of Meniere's Disease Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with meniere's disease basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with meniere's disease basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "meningitis-basics-rpn": {
    title: "Meningitis Basics",
    cellular: { title: "Pathophysiology of Meningitis Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Hypertension", "History of head trauma", "Family history of neurological conditions", "Substance or alcohol use", "Cerebrovascular disease risk factors"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Level of consciousness using Glasgow Coma Scale", "Pupil size, shape, equality, and reactivity", "Motor strength and sensation in all extremities", "Cranial nerve assessment", "Speech and language function"],
    signs: {
      left: ["Altered level of consciousness", "Headache (sudden or severe)", "Seizure activity", "Focal motor or sensory deficits", "Abnormal pupil response"],
      right: ["Aphasia or dysarthria", "Ataxia or gait disturbance", "Vision changes", "Nuchal rigidity", "Cognitive or memory changes"]
    },
    medications: [{
      name: "Alteplase",
      type: "Thrombolytic (tPA)",
      action: "Converts plasminogen to plasmin to dissolve fibrin clots and restore blood flow",
      sideEffects: "Hemorrhage (intracranial, GI, GU), angioedema, reperfusion arrhythmias",
      contra: "Active internal bleeding, recent surgery or trauma, intracranial neoplasm, uncontrolled hypertension",
      pearl: "Administer within 4.5 hours of ischemic stroke onset; monitor for signs of bleeding"
    }],
    pearls: ["Use the Glasgow Coma Scale consistently for trending neurological status", "Perform stroke assessment using validated tools (NIHSS, Cincinnati scale)", "Pupil changes may indicate increased intracranial pressure - report immediately", "Never restrain a seizing patient; protect from injury and note seizure characteristics", "Time is brain - recognize stroke symptoms and activate the stroke team immediately"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with meningitis basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with meningitis basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "meningitis-management-np": {
    title: "Meningitis: Empiric Coverage & Dexamethasone",
    cellular: { title: "Pathophysiology of Meningitis: Empiric Coverage & Dexamethasone", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Hypertension", "History of head trauma", "Family history of neurological conditions", "Substance or alcohol use", "Cerebrovascular disease risk factors"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Level of consciousness using Glasgow Coma Scale", "Pupil size, shape, equality, and reactivity", "Motor strength and sensation in all extremities", "Cranial nerve assessment", "Speech and language function"],
    signs: {
      left: ["Altered level of consciousness", "Headache (sudden or severe)", "Seizure activity", "Focal motor or sensory deficits", "Abnormal pupil response"],
      right: ["Aphasia or dysarthria", "Ataxia or gait disturbance", "Vision changes", "Nuchal rigidity", "Cognitive or memory changes"]
    },
    medications: [{
      name: "Levetiracetam",
      type: "Anticonvulsant",
      action: "Modulates synaptic vesicle protein SV2A to reduce abnormal neuronal firing",
      sideEffects: "Drowsiness, behavioral changes, dizziness, mood changes, fatigue",
      contra: "Hypersensitivity to levetiracetam; use with caution in renal impairment",
      pearl: "Dose adjustment required for renal impairment; monitor for psychiatric symptoms"
    }],
    pearls: ["Use the Glasgow Coma Scale consistently for trending neurological status", "Perform stroke assessment using validated tools (NIHSS, Cincinnati scale)", "Pupil changes may indicate increased intracranial pressure - report immediately", "Never restrain a seizing patient; protect from injury and note seizure characteristics", "Time is brain - recognize stroke symptoms and activate the stroke team immediately"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with meningitis: empiric coverage & dexamethasone. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with meningitis: empiric coverage & dexamethasone?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "meningococcemia-rn": {
    title: "Meningococcemia",
    cellular: { title: "Pathophysiology of Meningococcemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with meningococcemia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with meningococcemia?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "menopause-basics": {
    title: "Menopause",
    cellular: { title: "Pathophysiology of Menopause", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with menopause. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with menopause?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "menopause-criteria-np": {
    title: "Menopause: 12-Month Amenorrhea Rule",
    cellular: { title: "Pathophysiology of Menopause: 12-Month Amenorrhea Rule", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age", "Chronic comorbidities (hypertension, diabetes, obesity)", "Family history of related conditions", "Tobacco, alcohol, or substance use", "Sedentary lifestyle and poor nutritional status", "Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Non-opioid analgesic/antipyretic",
      action: "Inhibits prostaglandin synthesis in the CNS and blocks pain impulse generation peripherally",
      sideEffects: "Hepatotoxicity at high doses, rash, nausea, allergic reaction",
      contra: "Severe hepatic impairment, active liver disease, chronic alcohol use (relative)",
      pearl: "Maximum dose 4g/day in healthy adults, 2g/day in hepatic impairment; check all combination products for hidden acetaminophen"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with menopause: 12-month amenorrhea rule. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with menopause: 12-month amenorrhea rule?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  }
};
