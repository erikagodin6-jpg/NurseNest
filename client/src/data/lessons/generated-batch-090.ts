import type { LessonContent } from "./types";

export const generatedBatch090Lessons: Record<string, LessonContent> = {
  "sickle-cell-np": {
    title: "Sickle Cell Disease",
    cellular: { title: "Pathophysiology of Sickle Cell Disease", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sickle cell or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Enoxaparin",
      type: "Low-molecular-weight heparin (LMWH)",
      action: "Inhibits factor Xa and thrombin via antithrombin III activation",
      sideEffects: "Bleeding, thrombocytopenia, injection site bruising, elevated liver enzymes",
      contra: "Active major bleeding, HIT, epidural/spinal anesthesia within dosing window",
      pearl: "Inject subcutaneously into abdomen; do not expel air bubble; monitor anti-Xa levels in renal impairment"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sickle cell. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sickle cell?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sickle cell diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sinusitis-management-np": {
    title: "Sinusitis: Bacterial vs Viral & Antibiotic Criteria",
    cellular: { title: "Pathophysiology of Sinusitis: Bacterial vs Viral & Antibiotic Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sinusitis management or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Ceftriaxone",
      type: "Third-generation cephalosporin",
      action: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins",
      sideEffects: "Diarrhea, rash, injection site pain, pseudolithiasis (biliary sludge)",
      contra: "Neonates with hyperbilirubinemia; do not co-infuse with calcium-containing solutions in neonates",
      pearl: "Broad-spectrum coverage; commonly used empirically for community-acquired pneumonia and meningitis"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sinusitis management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sinusitis management?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sinusitis management diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sinusitis-np": {
    title: "Sinusitis",
    cellular: { title: "Pathophysiology of Sinusitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sinusitis or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sinusitis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sinusitis?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sinusitis diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sjogren-syndrome": {
    title: "Sjogren Syndrome",
    cellular: { title: "Pathophysiology of Sjogren Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sjogren syndrome or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sjogren syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sjogren syndrome?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sjogren syndrome diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sjogren-syndrome-advanced-np": {
    title: "Sjogren Syndrome Advanced",
    cellular: { title: "Pathophysiology of Sjogren Syndrome Advanced", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sjogren syndrome advanced or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sjogren syndrome advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sjogren syndrome advanced?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sjogren syndrome advanced diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sjs-advanced-rn": {
    title: "Sjs Advanced",
    cellular: { title: "Pathophysiology of Sjs Advanced", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sjs advanced or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sjs advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sjs advanced?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sjs advanced diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sjs-np": {
    title: "Stevens-Johnson Syndrome: SCORTEN & Management",
    cellular: { title: "Pathophysiology of Stevens-Johnson Syndrome: SCORTEN & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sjs or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sjs. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sjs?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sjs diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "skin-assessment-rpn": {
    title: "Skin Assessment and Turgor",
    cellular: { title: "Pathophysiology of Skin Assessment and Turgor", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of skin assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Mupirocin",
      type: "Topical antibiotic",
      action: "Inhibits bacterial protein synthesis by binding to isoleucyl-tRNA synthetase",
      sideEffects: "Local burning, stinging, pruritus at application site",
      contra: "Hypersensitivity to mupirocin or polyethylene glycol",
      pearl: "Effective against MRSA skin infections; apply thin layer three times daily for 5-10 days"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with skin assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with skin assessment?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their skin assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "skin-cancers-basics-np": {
    title: "Skin Cancers Basics",
    cellular: { title: "Pathophysiology of Skin Cancers Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of skin cancers basics or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Mupirocin",
      type: "Topical antibiotic",
      action: "Inhibits bacterial protein synthesis by binding to isoleucyl-tRNA synthetase",
      sideEffects: "Local burning, stinging, pruritus at application site",
      contra: "Hypersensitivity to mupirocin or polyethylene glycol",
      pearl: "Effective against MRSA skin infections; apply thin layer three times daily for 5-10 days"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with skin cancers basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with skin cancers basics?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their skin cancers basics diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "skin-integrity": {
    title: "Pressure Injuries and Cellulitis",
    cellular: { title: "Pathophysiology of Pressure Injuries and Cellulitis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of skin integrity or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Mupirocin",
      type: "Topical antibiotic",
      action: "Inhibits bacterial protein synthesis by binding to isoleucyl-tRNA synthetase",
      sideEffects: "Local burning, stinging, pruritus at application site",
      contra: "Hypersensitivity to mupirocin or polyethylene glycol",
      pearl: "Effective against MRSA skin infections; apply thin layer three times daily for 5-10 days"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with skin integrity. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with skin integrity?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their skin integrity diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "skin-tears-rpn": {
    title: "Skin Tears Prevention and Management",
    cellular: { title: "Pathophysiology of Skin Tears Prevention and Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of skin tears or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Mupirocin",
      type: "Topical antibiotic",
      action: "Inhibits bacterial protein synthesis by binding to isoleucyl-tRNA synthetase",
      sideEffects: "Local burning, stinging, pruritus at application site",
      contra: "Hypersensitivity to mupirocin or polyethylene glycol",
      pearl: "Effective against MRSA skin infections; apply thin layer three times daily for 5-10 days"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with skin tears. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with skin tears?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their skin tears diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sle-advanced-np": {
    title: "Sle Advanced",
    cellular: { title: "Pathophysiology of Sle Advanced", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sle advanced or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sle advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sle advanced?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sle advanced diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sle-autoimmune": {
    title: "SLE (Lupus) & Autoimmune",
    cellular: { title: "Pathophysiology of SLE (Lupus) & Autoimmune", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sle autoimmune or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Prednisone",
      type: "Corticosteroid",
      action: "Suppresses inflammatory and immune responses by inhibiting phospholipase A2 and NF-kB",
      sideEffects: "Hyperglycemia, weight gain, osteoporosis, immunosuppression, adrenal suppression, mood changes",
      contra: "Systemic fungal infections; live vaccines during immunosuppressive doses",
      pearl: "Taper gradually after prolonged use to prevent adrenal crisis; monitor blood glucose in diabetic patients"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sle autoimmune. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sle autoimmune?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sle autoimmune diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "sleep-apnea-np": {
    title: "Sleep Apnea",
    cellular: { title: "Pathophysiology of Sleep Apnea", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of sleep apnea or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with sleep apnea. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with sleep apnea?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their sleep apnea diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "smart-therapy-np": {
    title: "SMART Therapy Concept",
    cellular: { title: "Pathophysiology of SMART Therapy Concept", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of smart therapy or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with smart therapy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with smart therapy?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their smart therapy diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
};
