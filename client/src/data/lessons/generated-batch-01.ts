import type { LessonContent } from "./types";

export const generatedBatch01Lessons: Record<string, LessonContent> = {
  "a1c-interpretation-np": {
    title: "A1C Interpretation",
    cellular: { title: "Pathophysiology of A1C Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with a1c interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with a1c interpretation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abcde-melanoma-rule-np": {
    title: "ABCDE Melanoma Rule",
    cellular: { title: "Pathophysiology of ABCDE Melanoma Rule", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with abcde melanoma rule. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with abcde melanoma rule?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abdominal-assessment": {
    title: "Abdominal Assessment",
    cellular: { title: "Pathophysiology of Abdominal Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with abdominal assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with abdominal assessment?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abdominal-assessment-rn": {
    title: "Advanced Abdominal Assessment",
    cellular: { title: "Pathophysiology of Advanced Abdominal Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with advanced abdominal assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with advanced abdominal assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abdominal-assessment-rpn": {
    title: "Abdominal Assessment (4 Quadrants)",
    cellular: { title: "Pathophysiology of Abdominal Assessment (4 Quadrants)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with abdominal assessment (4 quadrants). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with abdominal assessment (4 quadrants)?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abdominal-exam-np": {
    title: "Advanced Abdominal Examination (Murphy, McBurney, Rovsing)",
    cellular: { title: "Pathophysiology of Advanced Abdominal Examination (Murphy, McBurney, Rovsing)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with advanced abdominal examination (murphy, mcburney, rovsing). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with advanced abdominal examination (murphy, mcburney, rovsing)?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abdominal-pain-algorithm-np": {
    title: "Abdominal Pain Algorithm: Surgical vs Medical Emergency",
    cellular: { title: "Pathophysiology of Abdominal Pain Algorithm: Surgical vs Medical Emergency", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with abdominal pain algorithm: surgical vs medical emergency. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with abdominal pain algorithm: surgical vs medical emergency?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "abg-interpretation-np": {
    title: "ABG Interpretation",
    cellular: { title: "Pathophysiology of ABG Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with abg interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with abg interpretation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acei-arb-selection-np": {
    title: "Acei Arb Selection",
    cellular: { title: "Pathophysiology of Acei Arb Selection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acei arb selection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acei arb selection?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acetaminophen-od-np": {
    title: "Acetaminophen Overdose: NAC Protocol & Rumack-Matthew",
    cellular: { title: "Pathophysiology of Acetaminophen Overdose: NAC Protocol & Rumack-Matthew", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acetaminophen overdose: nac protocol & rumack-matthew. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acetaminophen overdose: nac protocol & rumack-matthew?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acetaminophen-toxicity-rpn": {
    title: "Acetaminophen Toxicity",
    cellular: { title: "Pathophysiology of Acetaminophen Toxicity", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acetaminophen toxicity. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acetaminophen toxicity?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "achalasia-rpn": {
    title: "Achalasia",
    cellular: { title: "Pathophysiology of Achalasia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with achalasia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with achalasia?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acid-base-balance-rpn": {
    title: "Acid-Base Balance Overview",
    cellular: { title: "Pathophysiology of Acid-Base Balance Overview", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acid-base balance overview. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acid-base balance overview?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acid-base-electrolyte-patho-np": {
    title: "Acid–Base & Electrolyte Pathophysiology",
    cellular: { title: "Pathophysiology of Acid–Base & Electrolyte Pathophysiology", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acid–base & electrolyte pathophysiology. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acid–base & electrolyte pathophysiology?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acid-base-physiology-np": {
    title: "Acid-Base Physiology Basics",
    cellular: { title: "Pathophysiology of Acid-Base Physiology Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acid-base physiology basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acid-base physiology basics?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acne-np": {
    title: "Acne",
    cellular: { title: "Pathophysiology of Acne", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acne. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acne?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acs-diagnostic-criteria-np": {
    title: "ACS: Troponin Rise/Fall & ECG Changes",
    cellular: { title: "Pathophysiology of ACS: Troponin Rise/Fall & ECG Changes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acs: troponin rise/fall & ecg changes. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acs: troponin rise/fall & ecg changes?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "actinic-keratosis-np": {
    title: "Actinic Keratosis: Premalignant Workup & Cryotherapy",
    cellular: { title: "Pathophysiology of Actinic Keratosis: Premalignant Workup & Cryotherapy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with actinic keratosis: premalignant workup & cryotherapy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with actinic keratosis: premalignant workup & cryotherapy?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-abdomen-np": {
    title: "Acute Abdomen: Differential Diagnosis",
    cellular: { title: "Pathophysiology of Acute Abdomen: Differential Diagnosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acute abdomen: differential diagnosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute abdomen: differential diagnosis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-chest-syndrome-rn": {
    title: "Acute Chest Syndrome",
    cellular: { title: "Pathophysiology of Acute Chest Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute chest syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute chest syndrome?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-compartment-syndrome-rn": {
    title: "Acute Compartment Syndrome",
    cellular: { title: "Pathophysiology of Acute Compartment Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute compartment syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute compartment syndrome?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-dystonic-reaction-rpn": {
    title: "Acute Dystonic Reaction",
    cellular: { title: "Pathophysiology of Acute Dystonic Reaction", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acute dystonic reaction. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute dystonic reaction?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-hemolytic-reaction-rn": {
    title: "Acute Hemolytic Transfusion Reaction",
    cellular: { title: "Pathophysiology of Acute Hemolytic Transfusion Reaction", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Genetic predisposition", "Nutritional deficiencies (iron, B12, folate)", "Chronic disease states", "Medication-induced blood dyscrasias", "Exposure to radiation or chemicals", "Autoimmune conditions"],
    diagnostics: ["Review and interpret laboratory results within nursing scope", "Perform comprehensive physical assessment and document findings", "Monitor diagnostic study results and report critical values", "Collect specimens per facility protocol and ensure proper handling", "Recognize abnormal findings and communicate to provider using SBAR"],
    management: ["Implement prescribed treatment regimen and monitor for therapeutic response", "Coordinate care with interdisciplinary team members", "Initiate standing orders and protocols per facility policy", "Evaluate treatment effectiveness and communicate findings to provider", "Manage acute symptoms using evidence-based nursing interventions"],
    nursingActions: ["Perform comprehensive head-to-toe assessment and document findings", "Administer prescribed medications following the rights of medication administration", "Implement physician orders and facility protocols for disease management", "Monitor laboratory values and report critical results to the provider", "Coordinate interdisciplinary care and facilitate patient education", "Evaluate patient response to interventions and modify care plan accordingly"],
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
        question: "A registered nurse is caring for a patient with acute hemolytic transfusion reaction. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute hemolytic transfusion reaction?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-intermittent-porphyria-rn": {
    title: "Acute Intermittent Porphyria",
    cellular: { title: "Pathophysiology of Acute Intermittent Porphyria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute intermittent porphyria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute intermittent porphyria?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-low-back-pain-algorithm-np": {
    title: "Acute Low Back Pain Algorithm: Red Flags & Imaging Criteria",
    cellular: { title: "Pathophysiology of Acute Low Back Pain Algorithm: Red Flags & Imaging Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acute low back pain algorithm: red flags & imaging criteria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute low back pain algorithm: red flags & imaging criteria?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-mesenteric-ischemia-rn": {
    title: "Acute Mesenteric Ischemia",
    cellular: { title: "Pathophysiology of Acute Mesenteric Ischemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute mesenteric ischemia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute mesenteric ischemia?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-pancreatitis-criteria-np": {
    title: "Acute Pancreatitis: 2 of 3 Diagnostic Rule",
    cellular: { title: "Pathophysiology of Acute Pancreatitis: 2 of 3 Diagnostic Rule", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acute pancreatitis: 2 of 3 diagnostic rule. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute pancreatitis: 2 of 3 diagnostic rule?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-pericarditis-rpn": {
    title: "Acute Pericarditis",
    cellular: { title: "Pathophysiology of Acute Pericarditis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Hypertension", "Hyperlipidemia", "Diabetes mellitus", "Tobacco use", "Family history of cardiovascular disease", "Obesity and sedentary lifestyle"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
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
        question: "A practical nurse is caring for a patient with acute pericarditis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute pericarditis?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-silicosis-rpn": {
    title: "Acute Silicosis",
    cellular: { title: "Pathophysiology of Acute Silicosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acute silicosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute silicosis?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-testicular-pain-np": {
    title: "Acute Testicular Pain: Torsion vs Epididymitis Algorithm",
    cellular: { title: "Pathophysiology of Acute Testicular Pain: Torsion vs Epididymitis Algorithm", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acute testicular pain: torsion vs epididymitis algorithm. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute testicular pain: torsion vs epididymitis algorithm?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-transfusion-reaction-rpn": {
    title: "Acute Transfusion Reaction",
    cellular: { title: "Pathophysiology of Acute Transfusion Reaction", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acute transfusion reaction. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute transfusion reaction?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-visual-loss-np": {
    title: "Acute Visual Loss Workup: CRAO, GCA & Retinal Detachment",
    cellular: { title: "Pathophysiology of Acute Visual Loss Workup: CRAO, GCA & Retinal Detachment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with acute visual loss workup: crao, gca & retinal detachment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute visual loss workup: crao, gca & retinal detachment?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "acute-vs-chronic-pain-rpn": {
    title: "Acute vs Chronic Pain",
    cellular: { title: "Pathophysiology of Acute vs Chronic Pain", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with acute vs chronic pain. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute vs chronic pain?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adaptive-immunity": {
    title: "Adaptive Immunity (B and T Cells)",
    cellular: { title: "Pathophysiology of Adaptive Immunity (B and T Cells)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
      name: "Epinephrine",
      type: "Adrenergic agonist",
      action: "Stimulates alpha and beta receptors to reverse bronchospasm, vasoconstriction, and cardiac stimulation in anaphylaxis",
      sideEffects: "Tachycardia, anxiety, tremor, hypertension, headache",
      contra: "No absolute contraindications in anaphylaxis (benefit outweighs risk)",
      pearl: "Administer 0.3 mg IM in the anterolateral thigh; may repeat every 5-15 minutes; always prescribe auto-injector at discharge"
    }],
    pearls: ["Always assess for allergies before administering any new medication", "Document baseline assessment findings to enable accurate trending", "Use the SBAR format for structured clinical communication with the healthcare team", "Consider age-specific and population-specific variations in normal findings", "Never ignore a sudden change in patient condition, even if vital signs appear stable"],
    quiz: [
      {
        question: "A nurse is caring for a patient with adaptive immunity (b and t cells). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adaptive immunity (b and t cells)?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "addisons-disease-basics-rpn": {
    title: "Addison's Disease Basics",
    cellular: { title: "Pathophysiology of Addison's Disease Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with addison's disease basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with addison's disease basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "additive-hypotension-np": {
    title: "Additive Hypotension Risks",
    cellular: { title: "Pathophysiology of Additive Hypotension Risks", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with additive hypotension risks. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with additive hypotension risks?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adem-rn": {
    title: "Acute Disseminated Encephalomyelitis (ADEM)",
    cellular: { title: "Pathophysiology of Acute Disseminated Encephalomyelitis (ADEM)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute disseminated encephalomyelitis (adem). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute disseminated encephalomyelitis (adem)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adhd-basics-np": {
    title: "ADHD Basics",
    cellular: { title: "Pathophysiology of ADHD Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with adhd basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adhd basics?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adhd-dsm5-criteria-np": {
    title: "ADHD: DSM-5 Duration & Impairment Criteria",
    cellular: { title: "Pathophysiology of ADHD: DSM-5 Duration & Impairment Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with adhd: dsm-5 duration & impairment criteria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adhd: dsm-5 duration & impairment criteria?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adhd-pharmacology-np": {
    title: "ADHD Pharmacology: Stimulant vs Non-Stimulant Selection",
    cellular: { title: "Pathophysiology of ADHD Pharmacology: Stimulant vs Non-Stimulant Selection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with adhd pharmacology: stimulant vs non-stimulant selection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adhd pharmacology: stimulant vs non-stimulant selection?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-crisis-np": {
    title: "Adrenal Crisis: Acute Management & Steroid Replacement",
    cellular: { title: "Pathophysiology of Adrenal Crisis: Acute Management & Steroid Replacement", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with adrenal crisis: acute management & steroid replacement. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal crisis: acute management & steroid replacement?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-disorders-basics-np": {
    title: "Adrenal Disorders Basics",
    cellular: { title: "Pathophysiology of Adrenal Disorders Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with adrenal disorders basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal disorders basics?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-disorders-patho-np": {
    title: "Adrenal Disorders: Cortisol Excess & Deficiency",
    cellular: { title: "Pathophysiology of Adrenal Disorders: Cortisol Excess & Deficiency", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with adrenal disorders: cortisol excess & deficiency. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal disorders: cortisol excess & deficiency?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-function": {
    title: "Adrenal Gland Function",
    cellular: { title: "Pathophysiology of Adrenal Gland Function", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Review relevant laboratory and diagnostic study results", "Perform appropriate physical assessment techniques", "Monitor diagnostic findings and recognize abnormal patterns", "Collect and handle specimens according to facility protocol", "Correlate assessment findings with diagnostic data"],
    management: ["Follow established treatment protocols and clinical guidelines", "Monitor patient response to interventions systematically", "Implement appropriate nursing interventions for symptom management", "Coordinate care across healthcare team members", "Evaluate outcomes and adjust approach based on patient response"],
    nursingActions: ["Assess patient condition using systematic approach", "Implement appropriate nursing interventions based on assessment findings", "Document all care provided and patient responses", "Educate patients and families on disease process and management", "Collaborate with healthcare team to optimize patient outcomes", "Follow established protocols and evidence-based practice guidelines"],
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
        question: "A nurse is caring for a patient with adrenal gland function. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal gland function?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-hemorrhage-np": {
    title: "Adrenal Hemorrhage: Waterhouse-Friderichsen Syndrome",
    cellular: { title: "Pathophysiology of Adrenal Hemorrhage: Waterhouse-Friderichsen Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with adrenal hemorrhage: waterhouse-friderichsen syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal hemorrhage: waterhouse-friderichsen syndrome?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adrenal-incidentaloma-np": {
    title: "Adrenal Incidentaloma Evaluation: Imaging & Hormonal Workup",
    cellular: { title: "Pathophysiology of Adrenal Incidentaloma Evaluation: Imaging & Hormonal Workup", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Diabetes mellitus", "Hypertension", "Recurrent urinary tract infections", "Nephrotoxic medication use", "Dehydration or volume depletion", "Urinary obstruction"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with adrenal incidentaloma evaluation: imaging & hormonal workup. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adrenal incidentaloma evaluation: imaging & hormonal workup?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adult-immunizations-np": {
    title: "Adult Immunizations",
    cellular: { title: "Pathophysiology of Adult Immunizations", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with adult immunizations. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adult immunizations?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "advance-care-planning-np": {
    title: "Advance Care Planning",
    cellular: { title: "Pathophysiology of Advance Care Planning", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with advance care planning. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with advance care planning?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "advance-directives-rpn": {
    title: "Advance Directives",
    cellular: { title: "Pathophysiology of Advance Directives", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with advance directives. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with advance directives?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "advanced-pathophysiology-foundations-np": {
    title: "Advanced Cellular Injury & Adaptation",
    cellular: { title: "Pathophysiology of Advanced Cellular Injury & Adaptation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with advanced cellular injury & adaptation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with advanced cellular injury & adaptation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "adverse-drug-reactions": {
    title: "Adverse Drug Reactions",
    cellular: { title: "Pathophysiology of Adverse Drug Reactions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse is caring for a patient with adverse drug reactions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with adverse drug reactions?",
        options: ["Follow established protocols and assess patient response", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to follow established protocols and assess patient response. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "afib-anticoagulation-chadsvasc-np": {
    title: "AFib: CHA₂DS₂-VASc Anticoagulation Decisions",
    cellular: { title: "Pathophysiology of AFib: CHA₂DS₂-VASc Anticoagulation Decisions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with afib: cha₂ds₂-vasc anticoagulation decisions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with afib: cha₂ds₂-vasc anticoagulation decisions?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "afib-diagnostic-criteria-np": {
    title: "Atrial Fibrillation: ECG Confirmation",
    cellular: { title: "Pathophysiology of Atrial Fibrillation: ECG Confirmation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with atrial fibrillation: ecg confirmation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with atrial fibrillation: ecg confirmation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "afib-rate-rhythm-logic-np": {
    title: "AFib: Rate vs Rhythm Control Logic",
    cellular: { title: "Pathophysiology of AFib: Rate vs Rhythm Control Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with afib: rate vs rhythm control logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with afib: rate vs rhythm control logic?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "aflp-rn": {
    title: "Acute Fatty Liver of Pregnancy (AFLP)",
    cellular: { title: "Pathophysiology of Acute Fatty Liver of Pregnancy (AFLP)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute fatty liver of pregnancy (aflp). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute fatty liver of pregnancy (aflp)?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  }
};
