import type { LessonContent } from "./types";

export const generatedBatch10Lessons: Record<string, LessonContent> = {
  "epiglottitis": {
    title: "Epiglottitis",
    cellular: { title: "Pathophysiology of Epiglottitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Prematurity or low birth weight", "Genetic or congenital conditions", "Incomplete immunization status", "Exposure to environmental hazards", "Nutritional deficiencies", "Family psychosocial stressors"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Amoxicillin",
      type: "Aminopenicillin antibiotic",
      action: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins",
      sideEffects: "Diarrhea, rash, nausea, vomiting, allergic reaction",
      contra: "Penicillin allergy, infectious mononucleosis (causes maculopapular rash)",
      pearl: "First-line for acute otitis media in children; weight-based dosing essential"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with epiglottitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with epiglottitis?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "epilepsy-diagnostic-criteria-np": {
    title: "Epilepsy: Unprovoked Seizure Recurrence Definition",
    cellular: { title: "Pathophysiology of Epilepsy: Unprovoked Seizure Recurrence Definition", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with epilepsy: unprovoked seizure recurrence definition. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with epilepsy: unprovoked seizure recurrence definition?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "episiotomy-care-rpn": {
    title: "Episiotomy Care",
    cellular: { title: "Pathophysiology of Episiotomy Care", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with episiotomy care. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with episiotomy care?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "epistaxis": {
    title: "Epistaxis Nosebleeds",
    cellular: { title: "Pathophysiology of Epistaxis Nosebleeds", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with epistaxis nosebleeds. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with epistaxis nosebleeds?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "eps-recognition-np": {
    title: "EPS Recognition & Management",
    cellular: { title: "Pathophysiology of EPS Recognition & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with eps recognition & management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with eps recognition & management?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "erysipelas-rpn": {
    title: "Erysipelas",
    cellular: { title: "Pathophysiology of Erysipelas", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with erysipelas. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with erysipelas?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "erythema-multiforme-rpn": {
    title: "Erythema Multiforme",
    cellular: { title: "Pathophysiology of Erythema Multiforme", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with erythema multiforme. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with erythema multiforme?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "esophageal-stricture-rpn": {
    title: "Esophageal Stricture",
    cellular: { title: "Pathophysiology of Esophageal Stricture", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["NSAID or aspirin use", "Helicobacter pylori infection", "Alcohol consumption", "Tobacco use", "High-fat or processed diet", "Family history of GI conditions"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Abdominal pain or tenderness", "Nausea and vomiting", "Changes in bowel habits", "Abdominal distension", "Hematemesis or melena"],
      right: ["Jaundice or scleral icterus", "Guarding or rebound tenderness", "Absent or hyperactive bowel sounds", "Weight loss or anorexia", "Dysphagia"]
    },
    medications: [{
      name: "Omeprazole",
      type: "Proton pump inhibitor",
      action: "Irreversibly inhibits hydrogen-potassium ATPase pump in gastric parietal cells",
      sideEffects: "Headache, diarrhea, C. difficile risk, hypomagnesemia, bone fracture risk with long-term use",
      contra: "Concurrent use with rilpivirine; caution with long-term use",
      pearl: "Take 30-60 minutes before first meal; long-term use associated with vitamin B12 and magnesium deficiency"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with esophageal stricture. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with esophageal stricture?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "esophageal-variceal-hemorrhage-rn": {
    title: "Esophageal Variceal Hemorrhage",
    cellular: { title: "Pathophysiology of Esophageal Variceal Hemorrhage", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["NSAID or aspirin use", "Helicobacter pylori infection", "Alcohol consumption", "Tobacco use", "High-fat or processed diet", "Family history of GI conditions"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
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
        question: "A registered nurse is caring for a patient with esophageal variceal hemorrhage. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with esophageal variceal hemorrhage?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "essential-thrombocythemia-rn": {
    title: "Essential Thrombocythemia",
    cellular: { title: "Pathophysiology of Essential Thrombocythemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
      name: "Lisinopril",
      type: "ACE inhibitor",
      action: "Inhibits angiotensin-converting enzyme to reduce afterload and prevent cardiac remodeling",
      sideEffects: "Dry cough, hyperkalemia, hypotension, angioedema, dizziness",
      contra: "Bilateral renal artery stenosis, pregnancy, history of angioedema with ACE inhibitors",
      pearl: "Monitor potassium and renal function; persistent dry cough may require switch to ARB"
    }],
    pearls: ["Always obtain a 12-lead ECG within 10 minutes for chest pain", "Measure orthostatic vital signs when assessing for volume status", "Remember: MONA is no longer the default ACS protocol - follow current guidelines", "Assess bilateral pedal pulses and compare for symmetry", "Weigh heart failure patients daily at the same time with the same scale"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with essential thrombocythemia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with essential thrombocythemia?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "ethics-np-practice-np": {
    title: "Ethics in NP Practice: Autonomy & Beneficence",
    cellular: { title: "Pathophysiology of Ethics in NP Practice: Autonomy & Beneficence", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ethics in np practice: autonomy & beneficence. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ethics in np practice: autonomy & beneficence?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "ethics-practice-np": {
    title: "Ethics",
    cellular: { title: "Pathophysiology of Ethics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ethics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ethics?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "ethylene-glycol-toxicity-rn": {
    title: "Ethylene Glycol Toxicity",
    cellular: { title: "Pathophysiology of Ethylene Glycol Toxicity", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with ethylene glycol toxicity. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ethylene glycol toxicity?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "evidence-based-assessment-np": {
    title: "Evidence-Based Assessment Practice",
    cellular: { title: "Pathophysiology of Evidence-Based Assessment Practice", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with evidence-based assessment practice. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with evidence-based assessment practice?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "evidence-based-practice-np": {
    title: "Evidence Based Practice",
    cellular: { title: "Pathophysiology of Evidence Based Practice", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with evidence based practice. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with evidence based practice?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "exam-strategy-np": {
    title: "Clinical Prioritization",
    cellular: { title: "Pathophysiology of Clinical Prioritization", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with clinical prioritization. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with clinical prioritization?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fabry-disease-np": {
    title: "Fabry Disease",
    cellular: { title: "Pathophysiology of Fabry Disease", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fabry disease. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fabry disease?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "factor-v-leiden-np": {
    title: "Factor V Leiden: Thrombophilia Screening & Management",
    cellular: { title: "Pathophysiology of Factor V Leiden: Thrombophilia Screening & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with factor v leiden: thrombophilia screening & management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with factor v leiden: thrombophilia screening & management?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "failure-to-thrive-np": {
    title: "Failure to Thrive Workup: Organic vs Non-Organic",
    cellular: { title: "Pathophysiology of Failure to Thrive Workup: Organic vs Non-Organic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with failure to thrive workup: organic vs non-organic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with failure to thrive workup: organic vs non-organic?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fall-prevention": {
    title: "Fall Prevention Strategies",
    cellular: { title: "Pathophysiology of Fall Prevention Strategies", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with fall prevention strategies. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fall prevention strategies?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fall-risk-assessment-rpn": {
    title: "Fall Risk Assessment (Morse Scale)",
    cellular: { title: "Pathophysiology of Fall Risk Assessment (Morse Scale)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with fall risk assessment (morse scale). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fall risk assessment (morse scale)?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fall-risk-elderly-rpn": {
    title: "Fall Risk in the Elderly",
    cellular: { title: "Pathophysiology of Fall Risk in the Elderly", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with fall risk in the elderly. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fall risk in the elderly?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fall-risk-meds-np": {
    title: "Fall-Risk Medications",
    cellular: { title: "Pathophysiology of Fall-Risk Medications", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fall-risk medications. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fall-risk medications?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fall-risk-np": {
    title: "Fall Risk",
    cellular: { title: "Pathophysiology of Fall Risk", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fall risk. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fall risk?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "falls-prevention-np": {
    title: "Falls Prevention: Evidence-Based Interventions",
    cellular: { title: "Pathophysiology of Falls Prevention: Evidence-Based Interventions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with falls prevention: evidence-based interventions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with falls prevention: evidence-based interventions?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "family-assessment-rn": {
    title: "Family Assessment Models",
    cellular: { title: "Pathophysiology of Family Assessment Models", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with family assessment models. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with family assessment models?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "family-medicine-np": {
    title: "Hypertension: JNC/ACC-AHA Guidelines & Stepped Therapy",
    cellular: { title: "Pathophysiology of Hypertension: JNC/ACC-AHA Guidelines & Stepped Therapy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with hypertension: jnc/acc-aha guidelines & stepped therapy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with hypertension: jnc/acc-aha guidelines & stepped therapy?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "family-support-eol-rpn": {
    title: "Family Support at End of Life",
    cellular: { title: "Pathophysiology of Family Support at End of Life", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with family support at end of life. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with family support at end of life?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fanconi-syndrome-rn": {
    title: "Fanconi Syndrome",
    cellular: { title: "Pathophysiology of Fanconi Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with fanconi syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fanconi syndrome?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fat-embolism-np": {
    title: "Fat Embolism Syndrome",
    cellular: { title: "Pathophysiology of Fat Embolism Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Hypertension", "Hyperlipidemia", "Diabetes mellitus", "Tobacco use", "Family history of cardiovascular disease", "Obesity and sedentary lifestyle"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with fat embolism syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fat embolism syndrome?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "febrile-infant-algorithm-np": {
    title: "Febrile Infant Algorithm: Rochester & Step-by-Step Criteria",
    cellular: { title: "Pathophysiology of Febrile Infant Algorithm: Rochester & Step-by-Step Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Prematurity or low birth weight", "Genetic or congenital conditions", "Incomplete immunization status", "Exposure to environmental hazards", "Nutritional deficiencies", "Family psychosocial stressors"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Amoxicillin",
      type: "Aminopenicillin antibiotic",
      action: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins",
      sideEffects: "Diarrhea, rash, nausea, vomiting, allergic reaction",
      contra: "Penicillin allergy, infectious mononucleosis (causes maculopapular rash)",
      pearl: "First-line for acute otitis media in children; weight-based dosing essential"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with febrile infant algorithm: rochester & step-by-step criteria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with febrile infant algorithm: rochester & step-by-step criteria?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "febrile-neutropenia-basics-rpn": {
    title: "Febrile Neutropenia Basics",
    cellular: { title: "Pathophysiology of Febrile Neutropenia Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with febrile neutropenia basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with febrile neutropenia basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "febrile-neutropenia-np": {
    title: "Febrile Neutropenia: Risk Stratification & Empiric Coverage",
    cellular: { title: "Pathophysiology of Febrile Neutropenia: Risk Stratification & Empiric Coverage", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with febrile neutropenia: risk stratification & empiric coverage. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with febrile neutropenia: risk stratification & empiric coverage?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "feeding-tube-irrigation": {
    title: "Feeding Tube Irrigation",
    cellular: { title: "Pathophysiology of Feeding Tube Irrigation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with feeding tube irrigation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with feeding tube irrigation?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "feeding-tube-verification": {
    title: "Feeding Tube Placement Verification",
    cellular: { title: "Pathophysiology of Feeding Tube Placement Verification", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with feeding tube placement verification. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with feeding tube placement verification?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-alcohol-syndrome": {
    title: "Fetal Alcohol Spectrum Disorder",
    cellular: { title: "Pathophysiology of Fetal Alcohol Spectrum Disorder", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced maternal age (35 years or older)", "Pre-existing chronic conditions (diabetes, hypertension)", "History of pregnancy complications", "Multiple gestation", "Substance use during pregnancy", "Inadequate prenatal care"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
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
        question: "A nurse is caring for a patient with fetal alcohol spectrum disorder. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fetal alcohol spectrum disorder?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-monitoring-assessment-rn": {
    title: "Electronic Fetal Monitoring Interpretation",
    cellular: { title: "Pathophysiology of Electronic Fetal Monitoring Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with electronic fetal monitoring interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with electronic fetal monitoring interpretation?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-monitoring-basics-rpn": {
    title: "Fetal Monitoring Basics",
    cellular: { title: "Pathophysiology of Fetal Monitoring Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with fetal monitoring basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fetal monitoring basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-oxygenation-pushing": {
    title: "Fetal Oxygenation During Pushing with Variable Decels",
    cellular: { title: "Pathophysiology of Fetal Oxygenation During Pushing with Variable Decels", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco smoking history", "Occupational exposure to dust or chemicals", "History of childhood respiratory infections", "Allergies and atopic conditions", "Immunocompromised state", "Air pollution exposure"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
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
        question: "A nurse is caring for a patient with fetal oxygenation during pushing with variable decels. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fetal oxygenation during pushing with variable decels?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-oxygenation-pushing-rpn": {
    title: "Fetal Oxygenation During Pushing",
    cellular: { title: "Pathophysiology of Fetal Oxygenation During Pushing", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco smoking history", "Occupational exposure to dust or chemicals", "History of childhood respiratory infections", "Allergies and atopic conditions", "Immunocompromised state", "Air pollution exposure"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
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
        question: "A practical nurse is caring for a patient with fetal oxygenation during pushing. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fetal oxygenation during pushing?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fetal-surveillance-np": {
    title: "Fetal Surveillance: NST, BPP, CST",
    cellular: { title: "Pathophysiology of Fetal Surveillance: NST, BPP, CST", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fetal surveillance: nst, bpp, cst. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fetal surveillance: nst, bpp, cst?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fibromuscular-dysplasia-np": {
    title: "Fibromuscular Dysplasia: Renal & Carotid Involvement",
    cellular: { title: "Pathophysiology of Fibromuscular Dysplasia: Renal & Carotid Involvement", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fibromuscular dysplasia: renal & carotid involvement. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fibromuscular dysplasia: renal & carotid involvement?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fluid-balance-monitoring-rpn": {
    title: "Fluid Balance Monitoring",
    cellular: { title: "Pathophysiology of Fluid Balance Monitoring", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with fluid balance monitoring. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fluid balance monitoring?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fluid-balance-np": {
    title: "Fluid Balance",
    cellular: { title: "Pathophysiology of Fluid Balance", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with fluid balance. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fluid balance?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fluid-balance-rn": {
    title: "Fluid Balance and Third-Spacing Assessment",
    cellular: { title: "Pathophysiology of Fluid Balance and Third-Spacing Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with fluid balance and third-spacing assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fluid balance and third-spacing assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fluid-electrolyte-basics": {
    title: "Fluid and Electrolyte Basics",
    cellular: { title: "Pathophysiology of Fluid and Electrolyte Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with fluid and electrolyte basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fluid and electrolyte basics?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fluid-resuscitation-logic-rpn": {
    title: "Fluid Resuscitation: Principles & Monitoring",
    cellular: { title: "Pathophysiology of Fluid Resuscitation: Principles & Monitoring", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with fluid resuscitation: principles & monitoring. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fluid resuscitation: principles & monitoring?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "focused-assessment-rn": {
    title: "Focused Assessment by System",
    cellular: { title: "Pathophysiology of Focused Assessment by System", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with focused assessment by system. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with focused assessment by system?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "foundations-rn": {
    title: "Airborne Precautions",
    cellular: { title: "Pathophysiology of Airborne Precautions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with airborne precautions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with airborne precautions?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fracture-types": {
    title: "Fracture Types and Healing",
    cellular: { title: "Pathophysiology of Fracture Types and Healing", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Osteoporosis or low bone density", "History of falls or previous fractures", "Sedentary lifestyle", "Autoimmune conditions", "Corticosteroid use"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
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
        question: "A nurse is caring for a patient with fracture types and healing. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fracture types and healing?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "frailty-assessment-np": {
    title: "Frailty Assessment (Clinical Frailty Scale)",
    cellular: { title: "Pathophysiology of Frailty Assessment (Clinical Frailty Scale)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with frailty assessment (clinical frailty scale). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with frailty assessment (clinical frailty scale)?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "frailty-np": {
    title: "Frailty",
    cellular: { title: "Pathophysiology of Frailty", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with frailty. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with frailty?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "frontotemporal-dementia-rn": {
    title: "Frontotemporal Dementia",
    cellular: { title: "Pathophysiology of Frontotemporal Dementia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Hypertension", "History of head trauma", "Family history of neurological conditions", "Substance or alcohol use", "Cerebrovascular disease risk factors"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
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
        question: "A registered nurse is caring for a patient with frontotemporal dementia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with frontotemporal dementia?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fsgs-rn": {
    title: "Focal Segmental Glomerulosclerosis (FSGS)",
    cellular: { title: "Pathophysiology of Focal Segmental Glomerulosclerosis (FSGS)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with focal segmental glomerulosclerosis (fsgs). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with focal segmental glomerulosclerosis (fsgs)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "fulminant-hepatitis-rn": {
    title: "Fulminant Hepatitis",
    cellular: { title: "Pathophysiology of Fulminant Hepatitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["NSAID or aspirin use", "Helicobacter pylori infection", "Alcohol consumption", "Tobacco use", "High-fat or processed diet", "Family history of GI conditions"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Abdominal pain or tenderness", "Nausea and vomiting", "Changes in bowel habits", "Abdominal distension", "Hematemesis or melena"],
      right: ["Jaundice or scleral icterus", "Guarding or rebound tenderness", "Absent or hyperactive bowel sounds", "Weight loss or anorexia", "Dysphagia"]
    },
    medications: [{
      name: "Omeprazole",
      type: "Proton pump inhibitor",
      action: "Irreversibly inhibits hydrogen-potassium ATPase pump in gastric parietal cells",
      sideEffects: "Headache, diarrhea, C. difficile risk, hypomagnesemia, bone fracture risk with long-term use",
      contra: "Concurrent use with rilpivirine; caution with long-term use",
      pearl: "Take 30-60 minutes before first meal; long-term use associated with vitamin B12 and magnesium deficiency"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with fulminant hepatitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with fulminant hepatitis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  }
};
