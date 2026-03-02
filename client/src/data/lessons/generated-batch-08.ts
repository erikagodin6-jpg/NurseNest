import type { LessonContent } from "./types";

export const generatedBatch08Lessons: Record<string, LessonContent> = {
  "delirium-screening-rn": {
    title: "Delirium Screening (CAM, CAM-ICU)",
    cellular: { title: "Pathophysiology of Delirium Screening (CAM, CAM-ICU)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with delirium screening (cam, cam-icu). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with delirium screening (cam, cam-icu)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dementia-care-rpn": {
    title: "Dementia Care Strategies",
    cellular: { title: "Pathophysiology of Dementia Care Strategies", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with dementia care strategies. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dementia care strategies?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dementia-delirium-np": {
    title: "Dementia vs Delirium",
    cellular: { title: "Pathophysiology of Dementia vs Delirium", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dementia vs delirium. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dementia vs delirium?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dementia-diagnostic-criteria-np": {
    title: "Dementia: Cognitive Decline & Reversible Causes",
    cellular: { title: "Pathophysiology of Dementia: Cognitive Decline & Reversible Causes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dementia: cognitive decline & reversible causes. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dementia: cognitive decline & reversible causes?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dementia-management-np": {
    title: "Dementia: Differential & Cholinesterase Inhibitors",
    cellular: { title: "Pathophysiology of Dementia: Differential & Cholinesterase Inhibitors", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dementia: differential & cholinesterase inhibitors. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dementia: differential & cholinesterase inhibitors?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dengue-basics-rpn": {
    title: "Dengue Basics",
    cellular: { title: "Pathophysiology of Dengue Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with dengue basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dengue basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "deprescribing-strategies-np": {
    title: "Deprescribing Strategies",
    cellular: { title: "Pathophysiology of Deprescribing Strategies", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with deprescribing strategies. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with deprescribing strategies?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "depression-basics": {
    title: "Depression Basics",
    cellular: { title: "Pathophysiology of Depression Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
      name: "Haloperidol",
      type: "First-generation antipsychotic",
      action: "Blocks dopamine D2 receptors in the mesolimbic pathway to reduce psychotic symptoms",
      sideEffects: "Extrapyramidal symptoms, tardive dyskinesia, QT prolongation, neuroleptic malignant syndrome",
      contra: "Severe CNS depression, Parkinson disease, comatose state, QT prolongation",
      pearl: "Monitor for EPS and tardive dyskinesia; benztropine may be used to treat acute dystonia"
    }],
    pearls: ["Always perform a safety assessment including suicidal and homicidal ideation", "Use therapeutic communication techniques: active listening, open-ended questions", "Avoid arguing with delusions; do not reinforce them but acknowledge the patient's feelings", "Monitor for medication side effects especially in the first weeks of treatment", "Document mental status examination findings using objective, measurable terms"],
    quiz: [
      {
        question: "A nurse is caring for a patient with depression basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression basics?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "depression-core-np": {
    title: "Depression Core",
    cellular: { title: "Pathophysiology of Depression Core", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of psychiatric disorders", "Childhood trauma or adverse experiences", "Substance use disorder", "Chronic stress or social isolation", "Traumatic life events", "Chronic medical conditions"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with depression core. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression core?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "depression-neurobiology-np": {
    title: "Depression Neurobiology",
    cellular: { title: "Pathophysiology of Depression Neurobiology", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with depression neurobiology. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression neurobiology?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatitis-herpetiformis-np": {
    title: "Dermatitis Herpetiformis: Celiac Association & Dapsone",
    cellular: { title: "Pathophysiology of Dermatitis Herpetiformis: Celiac Association & Dapsone", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dermatitis herpetiformis: celiac association & dapsone. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dermatitis herpetiformis: celiac association & dapsone?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatological-exam-np": {
    title: "Dermatological Assessment and Lesion Classification",
    cellular: { title: "Pathophysiology of Dermatological Assessment and Lesion Classification", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dermatological assessment and lesion classification. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dermatological assessment and lesion classification?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatology-np": {
    title: "Melanoma: Breslow Depth & Staging",
    cellular: { title: "Pathophysiology of Melanoma: Breslow Depth & Staging", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with melanoma: breslow depth & staging. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with melanoma: breslow depth & staging?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatology-rn": {
    title: "Stevens-Johnson Syndrome (Advanced)",
    cellular: { title: "Pathophysiology of Stevens-Johnson Syndrome (Advanced)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with stevens-johnson syndrome (advanced). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with stevens-johnson syndrome (advanced)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatomyositis-polymyositis-np": {
    title: "Dermatomyositis/Polymyositis",
    cellular: { title: "Pathophysiology of Dermatomyositis/Polymyositis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dermatomyositis/polymyositis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dermatomyositis/polymyositis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermatomyositis-rn": {
    title: "Dermatomyositis",
    cellular: { title: "Pathophysiology of Dermatomyositis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with dermatomyositis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dermatomyositis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "derm-core-np": {
    title: "Primary vs Secondary Lesions",
    cellular: { title: "Pathophysiology of Primary vs Secondary Lesions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with primary vs secondary lesions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with primary vs secondary lesions?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dermoscopy-np": {
    title: "Dermoscopy: Pattern Analysis",
    cellular: { title: "Pathophysiology of Dermoscopy: Pattern Analysis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dermoscopy: pattern analysis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dermoscopy: pattern analysis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "developmental-milestones-rn": {
    title: "Developmental Milestone Assessment",
    cellular: { title: "Pathophysiology of Developmental Milestone Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of psychiatric disorders", "Childhood trauma or adverse experiences", "Substance use disorder", "Chronic stress or social isolation", "Traumatic life events", "Chronic medical conditions"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in mood or affect", "Sleep disturbances (insomnia or hypersomnia)", "Social withdrawal or isolation", "Agitation or psychomotor retardation", "Altered thought processes"],
      right: ["Suicidal or homicidal ideation", "Hallucinations or delusions", "Impaired judgment or insight", "Self-harm behaviors", "Substance use indicators"]
    },
    medications: [{
      name: "Haloperidol",
      type: "First-generation antipsychotic",
      action: "Blocks dopamine D2 receptors in the mesolimbic pathway to reduce psychotic symptoms",
      sideEffects: "Extrapyramidal symptoms, tardive dyskinesia, QT prolongation, neuroleptic malignant syndrome",
      contra: "Severe CNS depression, Parkinson disease, comatose state, QT prolongation",
      pearl: "Monitor for EPS and tardive dyskinesia; benztropine may be used to treat acute dystonia"
    }],
    pearls: ["Always perform a safety assessment including suicidal and homicidal ideation", "Use therapeutic communication techniques: active listening, open-ended questions", "Avoid arguing with delusions; do not reinforce them but acknowledge the patient's feelings", "Monitor for medication side effects especially in the first weeks of treatment", "Document mental status examination findings using objective, measurable terms"],
    quiz: [
      {
        question: "A registered nurse is caring for a patient with developmental milestone assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with developmental milestone assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "developmental-screening-np": {
    title: "Pediatric Developmental Screening (ASQ, MCHAT)",
    cellular: { title: "Pathophysiology of Pediatric Developmental Screening (ASQ, MCHAT)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of psychiatric disorders", "Childhood trauma or adverse experiences", "Substance use disorder", "Chronic stress or social isolation", "Traumatic life events", "Chronic medical conditions"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with pediatric developmental screening (asq, mchat). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pediatric developmental screening (asq, mchat)?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diabetes-insipidus-basics-rpn": {
    title: "Diabetes Insipidus Basics",
    cellular: { title: "Pathophysiology of Diabetes Insipidus Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levothyroxine",
      type: "Thyroid hormone replacement",
      action: "Synthetic T4 that increases basal metabolic rate and oxygen consumption",
      sideEffects: "Tachycardia, weight loss, insomnia, heat intolerance, tremor",
      contra: "Untreated adrenal insufficiency, recent myocardial infarction, thyrotoxicosis",
      pearl: "Take on empty stomach 30-60 minutes before breakfast; separate from calcium and iron by 4 hours"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A practical nurse is caring for a patient with diabetes insipidus basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes insipidus basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diabetes-lifespan": {
    title: "Diabetes Across Ages",
    cellular: { title: "Pathophysiology of Diabetes Across Ages", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levothyroxine",
      type: "Thyroid hormone replacement",
      action: "Synthetic T4 that increases basal metabolic rate and oxygen consumption",
      sideEffects: "Tachycardia, weight loss, insomnia, heat intolerance, tremor",
      contra: "Untreated adrenal insufficiency, recent myocardial infarction, thyrotoxicosis",
      pearl: "Take on empty stomach 30-60 minutes before breakfast; separate from calcium and iron by 4 hours"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with diabetes across ages. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes across ages?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diabetes-pregnancy-np": {
    title: "Diabetes Management in Pregnancy: Glycemic Targets",
    cellular: { title: "Pathophysiology of Diabetes Management in Pregnancy: Glycemic Targets", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levothyroxine",
      type: "Thyroid hormone replacement",
      action: "Synthetic T4 that increases basal metabolic rate and oxygen consumption",
      sideEffects: "Tachycardia, weight loss, insomnia, heat intolerance, tremor",
      contra: "Untreated adrenal insufficiency, recent myocardial infarction, thyrotoxicosis",
      pearl: "Take on empty stomach 30-60 minutes before breakfast; separate from calcium and iron by 4 hours"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with diabetes management in pregnancy: glycemic targets. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes management in pregnancy: glycemic targets?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diabetes-technology-np": {
    title: "Diabetes Technology: CGM, Insulin Pumps & Closed-Loop Systems",
    cellular: { title: "Pathophysiology of Diabetes Technology: CGM, Insulin Pumps & Closed-Loop Systems", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Insulin glargine",
      type: "Long-acting insulin",
      action: "Provides basal insulin coverage by forming microprecipitates for slow absorption over 24 hours",
      sideEffects: "Hypoglycemia, weight gain, lipodystrophy at injection site, allergic reaction",
      contra: "Hypoglycemia; do not mix with other insulins in the same syringe",
      pearl: "Administer at the same time daily; do not dilute or mix; rotate injection sites"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with diabetes technology: cgm, insulin pumps & closed-loop systems. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes technology: cgm, insulin pumps & closed-loop systems?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diabetic-nephropathy-rpn": {
    title: "Diabetic Nephropathy",
    cellular: { title: "Pathophysiology of Diabetic Nephropathy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
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
        question: "A practical nurse is caring for a patient with diabetic nephropathy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetic nephropathy?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diagnostic-criteria-logic-np": {
    title: "Diagnostic Criteria Logic",
    cellular: { title: "Pathophysiology of Diagnostic Criteria Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with diagnostic criteria logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diagnostic criteria logic?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diagnostic-reasoning-np": {
    title: "Diagnostic Criteria Logic: Screening vs Diagnostic Tests",
    cellular: { title: "Pathophysiology of Diagnostic Criteria Logic: Screening vs Diagnostic Tests", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with diagnostic criteria logic: screening vs diagnostic tests. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diagnostic criteria logic: screening vs diagnostic tests?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diarrhea-management-rpn": {
    title: "Diarrhea Management",
    cellular: { title: "Pathophysiology of Diarrhea Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with diarrhea management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diarrhea management?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dic-advanced-rn": {
    title: "Disseminated Intravascular Coagulation (Advanced)",
    cellular: { title: "Pathophysiology of Disseminated Intravascular Coagulation (Advanced)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with disseminated intravascular coagulation (advanced). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with disseminated intravascular coagulation (advanced)?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dic-management-np": {
    title: "DIC: Coagulation Cascade",
    cellular: { title: "Pathophysiology of DIC: Coagulation Cascade", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dic: coagulation cascade. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dic: coagulation cascade?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dic-obstetrics-np": {
    title: "DIC in Obstetrics: Etiology & Coagulation Replacement",
    cellular: { title: "Pathophysiology of DIC in Obstetrics: Etiology & Coagulation Replacement", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with dic in obstetrics: etiology & coagulation replacement. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dic in obstetrics: etiology & coagulation replacement?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "differential-diagnosis-frameworks-np": {
    title: "Differential Diagnosis Frameworks",
    cellular: { title: "Pathophysiology of Differential Diagnosis Frameworks", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with differential diagnosis frameworks. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with differential diagnosis frameworks?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "differential-diagnosis-narrowing-np": {
    title: "Differential Diagnosis Narrowing",
    cellular: { title: "Pathophysiology of Differential Diagnosis Narrowing", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with differential diagnosis narrowing. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with differential diagnosis narrowing?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diffuse-alveolar-hemorrhage-rn": {
    title: "Diffuse Alveolar Hemorrhage",
    cellular: { title: "Pathophysiology of Diffuse Alveolar Hemorrhage", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with diffuse alveolar hemorrhage. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diffuse alveolar hemorrhage?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "digoxin-toxicity-np": {
    title: "Digoxin Toxicity",
    cellular: { title: "Pathophysiology of Digoxin Toxicity", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with digoxin toxicity. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with digoxin toxicity?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "digoxin-toxicity-rn": {
    title: "Digoxin Toxicity",
    cellular: { title: "Pathophysiology of Digoxin Toxicity", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with digoxin toxicity. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with digoxin toxicity?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "disaster-triage": {
    title: "Disaster Triage",
    cellular: { title: "Pathophysiology of Disaster Triage", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with disaster triage. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with disaster triage?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "discharge-planning-rpn": {
    title: "Discharge Planning",
    cellular: { title: "Pathophysiology of Discharge Planning", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with discharge planning. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with discharge planning?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "discharge-readiness-rn": {
    title: "Discharge Readiness Assessment",
    cellular: { title: "Pathophysiology of Discharge Readiness Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with discharge readiness assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with discharge readiness assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "discontinuation-syndrome-np": {
    title: "Discontinuation Syndrome",
    cellular: { title: "Pathophysiology of Discontinuation Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with discontinuation syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with discontinuation syndrome?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "disseminated-gonococcal-rn": {
    title: "Disseminated Gonococcal Infection",
    cellular: { title: "Pathophysiology of Disseminated Gonococcal Infection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with disseminated gonococcal infection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with disseminated gonococcal infection?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diuretic-selection-logic-np": {
    title: "Diuretic Selection Logic",
    cellular: { title: "Pathophysiology of Diuretic Selection Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with diuretic selection logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diuretic selection logic?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diuretics-loop-thiazide-np": {
    title: "Diuretics: Loop vs Thiazide in HF",
    cellular: { title: "Pathophysiology of Diuretics: Loop vs Thiazide in HF", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with diuretics: loop vs thiazide in hf. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diuretics: loop vs thiazide in hf?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "diverticulitis-rpn": {
    title: "Diverticulitis",
    cellular: { title: "Pathophysiology of Diverticulitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with diverticulitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diverticulitis?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dka-hhns": {
    title: "DKA & Hyperglycemic States",
    cellular: { title: "Pathophysiology of DKA & Hyperglycemic States", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Insulin glargine",
      type: "Long-acting insulin",
      action: "Provides basal insulin coverage by forming microprecipitates for slow absorption over 24 hours",
      sideEffects: "Hypoglycemia, weight gain, lipodystrophy at injection site, allergic reaction",
      contra: "Hypoglycemia; do not mix with other insulins in the same syringe",
      pearl: "Administer at the same time daily; do not dilute or mix; rotate injection sites"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with dka & hyperglycemic states. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dka & hyperglycemic states?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dka-hhs-basics-np": {
    title: "DKA vs HHS Basics",
    cellular: { title: "Pathophysiology of DKA vs HHS Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levothyroxine",
      type: "Thyroid hormone replacement",
      action: "Synthetic T4 that increases basal metabolic rate and oxygen consumption",
      sideEffects: "Tachycardia, weight loss, insomnia, heat intolerance, tremor",
      contra: "Untreated adrenal insufficiency, recent myocardial infarction, thyrotoxicosis",
      pearl: "Take on empty stomach 30-60 minutes before breakfast; separate from calcium and iron by 4 hours"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with dka vs hhs basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dka vs hhs basics?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dka-hhs-patho-np": {
    title: "DKA vs HHS: Ketogenesis & Osmotic Diuresis",
    cellular: { title: "Pathophysiology of DKA vs HHS: Ketogenesis & Osmotic Diuresis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Family history of endocrine disorders", "Autoimmune conditions", "Obesity", "Sedentary lifestyle", "Dietary factors", "Age-related hormonal changes"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
    assessmentFindings: ["Vital signs including temperature, pulse, blood pressure, and respirations", "Level of consciousness, orientation, and cognitive function", "Pain assessment using validated tools (onset, location, duration, character, severity)", "Skin assessment including color, turgor, moisture, integrity, and temperature", "Functional status including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends", "Altered mental status or confusion", "Pain or discomfort reported by patient", "Skin changes (pallor, diaphoresis, cyanosis)", "Abnormal laboratory values"],
      right: ["Fever or hypothermia", "Edema (peripheral or generalized)", "Adventitious breath sounds or respiratory distress", "Gastrointestinal symptoms (nausea, vomiting, distension)", "Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Insulin glargine",
      type: "Long-acting insulin",
      action: "Provides basal insulin coverage by forming microprecipitates for slow absorption over 24 hours",
      sideEffects: "Hypoglycemia, weight gain, lipodystrophy at injection site, allergic reaction",
      contra: "Hypoglycemia; do not mix with other insulins in the same syringe",
      pearl: "Administer at the same time daily; do not dilute or mix; rotate injection sites"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse practitioner is caring for a patient with dka vs hhs: ketogenesis & osmotic diuresis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dka vs hhs: ketogenesis & osmotic diuresis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dm2-management-np": {
    title: "Diabetes Type 2: ADA Guidelines & SGLT2/GLP-1",
    cellular: { title: "Pathophysiology of Diabetes Type 2: ADA Guidelines & SGLT2/GLP-1", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with diabetes type 2: ada guidelines & sglt2/glp-1. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes type 2: ada guidelines & sglt2/glp-1?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dmd-peds": {
    title: "Duchenne Muscular Dystrophy",
    cellular: { title: "Pathophysiology of Duchenne Muscular Dystrophy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with duchenne muscular dystrophy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with duchenne muscular dystrophy?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dm-type1": {
    title: "Diabetes Mellitus Type 1",
    cellular: { title: "Pathophysiology of Diabetes Mellitus Type 1", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with diabetes mellitus type 1. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes mellitus type 1?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dm-type2": {
    title: "Diabetes Mellitus Type 2",
    cellular: { title: "Pathophysiology of Diabetes Mellitus Type 2", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with diabetes mellitus type 2. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with diabetes mellitus type 2?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "dnr-directives-rpn": {
    title: "DNR and Advance Directives",
    cellular: { title: "Pathophysiology of DNR and Advance Directives", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with dnr and advance directives. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with dnr and advance directives?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "doac-reversal-np": {
    title: "DOAC Reversal",
    cellular: { title: "Pathophysiology of DOAC Reversal", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with doac reversal. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with doac reversal?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "doac-warfarin-selection-np": {
    title: "DOAC vs Warfarin Selection",
    cellular: { title: "Pathophysiology of DOAC vs Warfarin Selection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with doac vs warfarin selection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with doac vs warfarin selection?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "documentation-assessment": {
    title: "Assessment Documentation (SBAR, DAR)",
    cellular: { title: "Pathophysiology of Assessment Documentation (SBAR, DAR)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with assessment documentation (sbar, dar). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with assessment documentation (sbar, dar)?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  }
};
