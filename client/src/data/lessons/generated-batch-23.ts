import type { LessonContent } from "./types";

export const generatedBatch23Lessons: Record<string, LessonContent> = {
  "psych-core-np": {
    title: "Depression",
    cellular: { title: "Pathophysiology of Depression", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with depression. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatric-assessment-rn": {
    title: "Psychiatric Nursing Assessment",
    cellular: { title: "Pathophysiology of Psychiatric Nursing Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with psychiatric nursing assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with psychiatric nursing assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatric-diagnostic-criteria-np": {
    title: "MDD: DSM-5 Symptom Count & Duration",
    cellular: { title: "Pathophysiology of MDD: DSM-5 Symptom Count & Duration", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with mdd: dsm-5 symptom count & duration. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with mdd: dsm-5 symptom count & duration?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatric-diagnostic-np": {
    title: "Psychiatric Diagnostic Assessment (DSM-5)",
    cellular: { title: "Pathophysiology of Psychiatric Diagnostic Assessment (DSM-5)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with psychiatric diagnostic assessment (dsm-5). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with psychiatric diagnostic assessment (dsm-5)?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatric-pathophysiology-np": {
    title: "Depression Neurobiology: Monoamine Hypothesis & HPA Axis",
    cellular: { title: "Pathophysiology of Depression Neurobiology: Monoamine Hypothesis & HPA Axis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with depression neurobiology: monoamine hypothesis & hpa axis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression neurobiology: monoamine hypothesis & hpa axis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatric-prescribing-np": {
    title: "Depression: SSRI Selection Differences",
    cellular: { title: "Pathophysiology of Depression: SSRI Selection Differences", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with depression: ssri selection differences. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with depression: ssri selection differences?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatry-np": {
    title: "Psychopharmacology: Receptor Binding & Selection",
    cellular: { title: "Pathophysiology of Psychopharmacology: Receptor Binding & Selection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with psychopharmacology: receptor binding & selection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with psychopharmacology: receptor binding & selection?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychiatry-rn": {
    title: "Lithium & Mood Stabilizers",
    cellular: { title: "Pathophysiology of Lithium & Mood Stabilizers", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with lithium & mood stabilizers. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with lithium & mood stabilizers?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "psychopharmacology-advanced-np": {
    title: "Psychopharmacology Advanced",
    cellular: { title: "Pathophysiology of Psychopharmacology Advanced", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with psychopharmacology advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with psychopharmacology advanced?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pt-inr-aptt-np": {
    title: "PT/INR/aPTT Interpretation",
    cellular: { title: "Pathophysiology of PT/INR/aPTT Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with pt/inr/aptt interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pt/inr/aptt interpretation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "ptsd-management-np": {
    title: "PTSD Management: Prazosin, EMDR & Pharmacotherapy",
    cellular: { title: "Pathophysiology of PTSD Management: Prazosin, EMDR & Pharmacotherapy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ptsd management: prazosin, emdr & pharmacotherapy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ptsd management: prazosin, emdr & pharmacotherapy?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "public-health-concepts-rpn": {
    title: "Public Health Concepts",
    cellular: { title: "Pathophysiology of Public Health Concepts", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with public health concepts. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with public health concepts?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pud-np": {
    title: "PUD",
    cellular: { title: "Pathophysiology of PUD", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with pud. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pud?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pulse-oximetry-limits-np": {
    title: "Pulse Oximetry Limits",
    cellular: { title: "Pathophysiology of Pulse Oximetry Limits", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with pulse oximetry limits. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pulse oximetry limits?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pulse-oximetry-rpn": {
    title: "Pulse Oximetry and SpO2",
    cellular: { title: "Pathophysiology of Pulse Oximetry and SpO2", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with pulse oximetry and spo2. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pulse oximetry and spo2?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pupil-assessment-rpn": {
    title: "Pupil Assessment (PERRLA)",
    cellular: { title: "Pathophysiology of Pupil Assessment (PERRLA)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with pupil assessment (perrla). Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pupil assessment (perrla)?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "pyloric-stenosis-basics-rpn": {
    title: "Pyloric Stenosis Basics",
    cellular: { title: "Pathophysiology of Pyloric Stenosis Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Prematurity or low birth weight", "Genetic or congenital conditions", "Incomplete immunization status", "Exposure to environmental hazards", "Nutritional deficiencies", "Family psychosocial stressors"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
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
        question: "A practical nurse is caring for a patient with pyloric stenosis basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with pyloric stenosis basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "qt-prolongation-risks-np": {
    title: "QT Prolongation Risks",
    cellular: { title: "Pathophysiology of QT Prolongation Risks", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with qt prolongation risks. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with qt prolongation risks?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "raas-np": {
    title: "RAAS",
    cellular: { title: "Pathophysiology of RAAS", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with raas. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with raas?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "raas-physiology-np": {
    title: "RAAS Physiology",
    cellular: { title: "Pathophysiology of RAAS Physiology", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with raas physiology. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with raas physiology?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rabies-post-exposure-rpn": {
    title: "Rabies Post-Exposure",
    cellular: { title: "Pathophysiology of Rabies Post-Exposure", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with rabies post-exposure. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with rabies post-exposure?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "radiation-therapy-basics-rpn": {
    title: "Radiation Therapy Basics",
    cellular: { title: "Pathophysiology of Radiation Therapy Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Tobacco use", "Family history of cancer", "Exposure to carcinogens or radiation", "Chronic inflammatory conditions", "Immunosuppression", "Genetic mutations (BRCA, Lynch syndrome)"],
    diagnostics: ["Collect specimens as ordered (blood, urine, wound cultures)", "Monitor point-of-care testing results (glucose, urine dipstick)", "Report abnormal assessment findings to the charge nurse", "Assist with diagnostic procedures as directed", "Document specimen collection and results accurately"],
    management: ["Administer treatments as ordered by the provider", "Monitor patient response to treatments and report changes", "Assist with activities of daily living and comfort measures", "Follow facility protocols for routine care management", "Escalate concerns to the charge nurse or provider promptly"],
    nursingActions: ["Monitor vital signs and report significant changes to the charge nurse or provider", "Administer medications as ordered and observe for adverse effects", "Perform basic nursing care including hygiene, positioning, and comfort measures", "Document assessment findings and patient responses accurately", "Reinforce patient education provided by the registered nurse or provider", "Maintain safe environment and follow infection prevention protocols"],
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
        question: "A practical nurse is caring for a patient with radiation therapy basics. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with radiation therapy basics?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "ra-medication-escalation-np": {
    title: "RA Medication Escalation: MTX to Biologics Algorithm",
    cellular: { title: "Pathophysiology of RA Medication Escalation: MTX to Biologics Algorithm", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ra medication escalation: mtx to biologics algorithm. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ra medication escalation: mtx to biologics algorithm?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rapid-assessment-rn": {
    title: "Rapid Patient Assessment",
    cellular: { title: "Pathophysiology of Rapid Patient Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with rapid patient assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with rapid patient assessment?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rare-genetic-disorders-np": {
    title: "Ehlers-Danlos Syndrome",
    cellular: { title: "Pathophysiology of Ehlers-Danlos Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ehlers-danlos syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ehlers-danlos syndrome?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rare-high-risk-np": {
    title: "Aortic Dissection",
    cellular: { title: "Pathophysiology of Aortic Dissection", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with aortic dissection. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with aortic dissection?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rashes-differentiation-np": {
    title: "Rashes Differentiation",
    cellular: { title: "Pathophysiology of Rashes Differentiation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with rashes differentiation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with rashes differentiation?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "reactive-arthritis-np": {
    title: "Reactive Arthritis",
    cellular: { title: "Pathophysiology of Reactive Arthritis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age", "Osteoporosis or low bone density", "History of falls or previous fractures", "Sedentary lifestyle", "Autoimmune conditions", "Corticosteroid use"],
    diagnostics: ["Order and interpret CBC, BMP/CMP, and condition-specific laboratory studies", "Order imaging studies (X-ray, CT, MRI, ultrasound) based on clinical indication", "Perform focused physical examination with advanced assessment techniques", "Apply clinical decision rules and validated scoring tools", "Order specialty consultations when findings exceed primary care scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines", "Develop individualized treatment plan with measurable outcomes", "Order follow-up diagnostic testing to monitor treatment response", "Refer to specialist when condition is refractory or complex", "Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies based on clinical presentation", "Prescribe pharmacological therapies per current evidence-based guidelines", "Formulate differential diagnosis and individualized treatment plan", "Counsel patients and families on disease management and prevention strategies", "Refer to specialist when condition complexity exceeds primary care scope", "Order follow-up testing to monitor treatment efficacy and adverse effects"],
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
        question: "A nurse practitioner is caring for a patient with reactive arthritis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with reactive arthritis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "reactive-arthritis-rn": {
    title: "Reactive Arthritis",
    cellular: { title: "Pathophysiology of Reactive Arthritis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with reactive arthritis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with reactive arthritis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rectal-medication-rpn": {
    title: "Rectal Medication Administration",
    cellular: { title: "Pathophysiology of Rectal Medication Administration", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with rectal medication administration. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with rectal medication administration?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "rectal-prostate-np": {
    title: "Digital Rectal and Prostate Examination",
    cellular: { title: "Pathophysiology of Digital Rectal and Prostate Examination", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with digital rectal and prostate examination. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with digital rectal and prostate examination?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "recurrent-pregnancy-loss-np": {
    title: "Recurrent Pregnancy Loss: Antiphospholipid & Genetic Workup",
    cellular: { title: "Pathophysiology of Recurrent Pregnancy Loss: Antiphospholipid & Genetic Workup", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with recurrent pregnancy loss: antiphospholipid & genetic workup. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with recurrent pregnancy loss: antiphospholipid & genetic workup?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "red-flag-adverse-effects-np": {
    title: "Red Flag Adverse Effects & When to Stop",
    cellular: { title: "Pathophysiology of Red Flag Adverse Effects & When to Stop", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with red flag adverse effects & when to stop. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with red flag adverse effects & when to stop?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "red-flag-mechanisms-np": {
    title: "Red Flag Mechanisms: Why Symptoms Are Dangerous",
    cellular: { title: "Pathophysiology of Red Flag Mechanisms: Why Symptoms Are Dangerous", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with red flag mechanisms: why symptoms are dangerous. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with red flag mechanisms: why symptoms are dangerous?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "red-flags-exam-np": {
    title: "Red Flags Recognition",
    cellular: { title: "Pathophysiology of Red Flags Recognition", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with red flags recognition. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with red flags recognition?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "reflex-grading-np": {
    title: "Deep Tendon Reflexes and Pathological Reflexes",
    cellular: { title: "Pathophysiology of Deep Tendon Reflexes and Pathological Reflexes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with deep tendon reflexes and pathological reflexes. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with deep tendon reflexes and pathological reflexes?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "regional-anesthesia-np": {
    title: "Regional Anesthesia: Nerve Blocks & Epidural",
    cellular: { title: "Pathophysiology of Regional Anesthesia: Nerve Blocks & Epidural", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with regional anesthesia: nerve blocks & epidural. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with regional anesthesia: nerve blocks & epidural?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-artery-stenosis-rpn": {
    title: "Renal Artery Stenosis",
    cellular: { title: "Pathophysiology of Renal Artery Stenosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with renal artery stenosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal artery stenosis?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-calculi-types-rpn": {
    title: "Renal Calculi Types",
    cellular: { title: "Pathophysiology of Renal Calculi Types", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A practical nurse is caring for a patient with renal calculi types. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal calculi types?",
        options: ["Monitor the patient and report changes to the supervising nurse", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to monitor the patient and report changes to the supervising nurse. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-diagnostic-criteria-np": {
    title: "CKD: eGFR Threshold & Albuminuria Criteria",
    cellular: { title: "Pathophysiology of CKD: eGFR Threshold & Albuminuria Criteria", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ckd: egfr threshold & albuminuria criteria. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ckd: egfr threshold & albuminuria criteria?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-dosing-adjustments-np": {
    title: "Patient-Specific: Renal Dosing Adjustments",
    cellular: { title: "Pathophysiology of Patient-Specific: Renal Dosing Adjustments", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with patient-specific: renal dosing adjustments. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with patient-specific: renal dosing adjustments?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-electrolyte-prescribing-np": {
    title: "Hyperkalemia Management Prescribing",
    cellular: { title: "Pathophysiology of Hyperkalemia Management Prescribing", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with hyperkalemia management prescribing. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with hyperkalemia management prescribing?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-elimination-dosing-np": {
    title: "Renal Elimination & Dose Adjustment",
    cellular: { title: "Pathophysiology of Renal Elimination & Dose Adjustment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with renal elimination & dose adjustment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal elimination & dose adjustment?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-gu-core-np": {
    title: "GFR Physiology",
    cellular: { title: "Pathophysiology of GFR Physiology", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with gfr physiology. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with gfr physiology?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-metabolic-rn": {
    title: "Acute Kidney Injury",
    cellular: { title: "Pathophysiology of Acute Kidney Injury", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with acute kidney injury. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with acute kidney injury?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-np": {
    title: "AKI: RIFLE Criteria & Dialysis",
    cellular: { title: "Pathophysiology of AKI: RIFLE Criteria & Dialysis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with aki: rifle criteria & dialysis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with aki: rifle criteria & dialysis?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-pathophysiology-np": {
    title: "AKI Mechanisms: Prerenal vs Intrinsic vs Postrenal",
    cellular: { title: "Pathophysiology of AKI Mechanisms: Prerenal vs Intrinsic vs Postrenal", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with aki mechanisms: prerenal vs intrinsic vs postrenal. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with aki mechanisms: prerenal vs intrinsic vs postrenal?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-replacement-np": {
    title: "Renal Replacement Therapy: HD vs CRRT vs PD",
    cellular: { title: "Pathophysiology of Renal Replacement Therapy: HD vs CRRT vs PD", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with renal replacement therapy: hd vs crrt vs pd. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal replacement therapy: hd vs crrt vs pd?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-tubular-acidosis-np": {
    title: "Renal Tubular Acidosis: Types I–IV & Diagnostic Approach",
    cellular: { title: "Pathophysiology of Renal Tubular Acidosis: Types I–IV & Diagnostic Approach", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with renal tubular acidosis: types i–iv & diagnostic approach. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal tubular acidosis: types i–iv & diagnostic approach?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renal-vein-thrombosis-rn": {
    title: "Renal Vein Thrombosis",
    cellular: { title: "Pathophysiology of Renal Vein Thrombosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A registered nurse is caring for a patient with renal vein thrombosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renal vein thrombosis?",
        options: ["Implement the prescribed care plan and monitor for changes", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to implement the prescribed care plan and monitor for changes. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "renovascular-hypertension-np": {
    title: "Renovascular Hypertension: Screening & Intervention",
    cellular: { title: "Pathophysiology of Renovascular Hypertension: Screening & Intervention", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with renovascular hypertension: screening & intervention. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with renovascular hypertension: screening & intervention?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "resistance-mechanisms-np": {
    title: "Resistance Mechanisms",
    cellular: { title: "Pathophysiology of Resistance Mechanisms", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with resistance mechanisms. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with resistance mechanisms?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "resistance-principles-np": {
    title: "Resistance Principles",
    cellular: { title: "Pathophysiology of Resistance Principles", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with resistance principles. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with resistance principles?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "resistant-htn-strategies-np": {
    title: "Resistant Hypertension Strategies",
    cellular: { title: "Pathophysiology of Resistant Hypertension Strategies", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with resistant hypertension strategies. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with resistant hypertension strategies?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  },
  "resp-core-physiology-np": {
    title: "Ventilation-Perfusion Relationships",
    cellular: { title: "Pathophysiology of Ventilation-Perfusion Relationships", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
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
        question: "A nurse practitioner is caring for a patient with ventilation-perfusion relationships. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness", "Mild discomfort rated 3 out of 10 on pain scale", "Stable vital signs within normal limits", "Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which action is most appropriate when managing a patient with ventilation-perfusion relationships?",
        options: ["Order appropriate diagnostic workup and develop treatment plan", "Ignore the assessment findings and continue current care", "Perform interventions outside scope of practice", "Document findings without taking any action"],
        correct: 0,
        rationale: "The most appropriate action is to order appropriate diagnostic workup and develop treatment plan. Ignoring findings, performing interventions outside scope, or failing to act on assessment data compromises patient safety."
      }
    ]
  }
};
