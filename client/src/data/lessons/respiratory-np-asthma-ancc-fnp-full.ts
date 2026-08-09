import type { LessonContent } from "./types";

export const respiratoryNpAsthmaAnccFnpFullLessons: Record<string, LessonContent> = {
  "asthma-np-us-ancc-fnp-2026": {
    title: "Asthma Clinical Management — U.S. ANCC-FNP",
    cellular: {
      title: "Variable Airflow Obstruction, Inflammation, and Longitudinal Risk",
      content: "Asthma is a heterogeneous chronic inflammatory airway disorder characterized by variable respiratory symptoms and variable expiratory airflow limitation. ANCC-FNP-level management requires the clinician to confirm the diagnosis objectively when feasible, distinguish asthma from COPD, inducible laryngeal obstruction, pulmonary embolism, heart failure and other mimics, classify current control and future exacerbation risk, select age- and severity-appropriate inhaled therapy, monitor effectiveness/adverse effects, and own longitudinal follow-up. U.S. care integrates NHLBI/NAEPP focused-update concepts including ICS-formoterol SMART for appropriate moderate-to-severe persistent asthma, selected intermittent inhaled-corticosteroid strategies, targeted allergen mitigation, and phenotype-directed referral for severe asthma. A severe exacerbation with silent chest, fatigue, altered consciousness, refractory hypoxemia or rising PaCO2 is an emergency disposition problem rather than an outpatient medication-adjustment problem."
    },
    riskFactors: [
      "Prior severe exacerbation, ICU admission or intubation",
      "Frequent SABA use or poor controller adherence",
      "Incorrect inhaler technique",
      "Tobacco/vaping or occupational irritant exposure",
      "Atopy, allergic rhinitis and sensitizing exposures",
      "Obesity, reflux, sleep-disordered breathing and other comorbidities",
      "Psychosocial/access barriers affecting adherence or follow-up"
    ],
    diagnostics: [
      "Use spirometry with bronchodilator response to document variable expiratory airflow limitation when feasible",
      "If spirometry is normal between episodes, repeat during symptoms or use serial peak-flow/appropriate bronchoprovocation when clinical probability remains meaningful",
      "Use FeNO selectively as an adjunct rather than a stand-alone diagnostic test",
      "Separate current symptom control from future exacerbation risk",
      "For difficult/severe disease, reassess diagnosis, adherence, device technique, exposures and comorbidities before phenotype testing or biologic selection",
      "During severe exacerbation trend work of breathing, oxygenation, mental status and ventilation; rising PaCO2 with persistent distress signals fatigue"
    ],
    management: [
      "Use inhaled corticosteroid-containing therapy as the anti-inflammatory foundation",
      "Use ICS-formoterol SMART for appropriate patients with moderate-to-severe persistent asthma under current U.S. guidance",
      "Use age/context-specific intermittent ICS strategies only when the patient fits the focused-update criteria",
      "Acute severe exacerbation: oxygen for hypoxemia, repeated SABA, ipratropium, systemic corticosteroid, selected IV magnesium and timely higher-acuity escalation",
      "Avoid LABA monotherapy in asthma",
      "Refer severe uncontrolled asthma for phenotype/biologic assessment only after correctable causes of poor control are addressed"
    ],
    nursingActions: [
      "Elicit symptom variability, nocturnal/exercise symptoms, occupational patterns and rescue-inhaler frequency",
      "Have the patient demonstrate each inhaler rather than relying on yes/no technique questions",
      "Use a written asthma action plan and shared decision-making",
      "Monitor controller/reliever adverse effects and cumulative systemic-steroid exposure",
      "Address pregnancy, medication access, health literacy and comorbidities when selecting the regimen",
      "After an exacerbation arrange timely reassessment of control, technique, adherence and step-up/step-down decisions"
    ],
    signs: {
      left: ["Variable wheeze/cough/chest tightness", "Nocturnal or exercise symptoms", "Objective reversible/variable obstruction", "Frequent reliever use when poorly controlled", "Atopy or trigger pattern"],
      right: ["Silent chest", "Exhaustion", "Altered consciousness", "Rising PaCO2", "Persistent severe hypoxemia"]
    },
    medications: [
      { name: "ICS-formoterol SMART", type: "Maintenance-and-reliever strategy", action: "Combines inhaled anti-inflammatory therapy with rapid-onset formoterol bronchodilation in an appropriate regimen.", sideEffects: "ICS local candidiasis/dysphonia; beta-agonist tremor, tachycardia and possible hypokalemia with high exposure.", contra: "Must use an appropriate formoterol-containing product/regimen and patient context.", pearl: "SMART is not a generic label for every ICS/LABA inhaler." },
      { name: "Albuterol", type: "Short-acting beta2 agonist", action: "Provides rapid bronchodilation for acute bronchospasm.", sideEffects: "Tremor, tachycardia, palpitations and hypokalemia with repeated high doses.", contra: "Use caution in significant tachyarrhythmia while treating clinically important bronchospasm.", pearl: "Frequent rescue use is a poor-control/risk signal that should trigger regimen review." },
      { name: "Severe-asthma biologic", type: "Phenotype-directed therapy", action: "Targets selected inflammatory pathways in eligible severe asthma.", sideEffects: "Agent-specific hypersensitivity, injection reactions and immune effects.", contra: "Requires confirmed severe asthma and phenotype/eligibility review.", pearl: "Biologics should not compensate for a wrong diagnosis, poor adherence or incorrect inhaler technique." }
    ],
    pearls: [
      "Confirm variable airflow limitation whenever feasible before committing to a chronic asthma label.",
      "ANCC-style longitudinal care includes assessment, diagnosis, planning, implementation and evaluation of response.",
      "Frequent rescue use and prior severe exacerbation are risk signals even when today's exam is reassuring.",
      "Silent chest plus altered mentation or rising PaCO2 is an emergency airway problem."
    ],
    preTest: [{ question: "Which finding most strengthens an asthma diagnosis?", options: ["Documented variable airflow limitation", "Symptoms alone", "Normal chest x-ray", "Normal CBC"], correct: 0, rationale: "Objective variable airflow limitation supports the clinical diagnosis." }],
    quiz: [
      { question: "Which regimen is unsafe in asthma?", options: ["ICS controller", "LABA monotherapy", "Appropriate ICS-formoterol SMART", "Albuterol rescue within a plan"], correct: 1, rationale: "LABA monotherapy is unsafe because asthma requires anti-inflammatory therapy." },
      { question: "What should occur before severe-asthma biologic escalation?", options: ["Skip diagnostic confirmation", "Stop controller therapy", "Reconfirm diagnosis, technique, adherence and phenotype", "Use chronic antibiotics"], correct: 2, rationale: "Correctable causes of poor control and phenotype eligibility must be addressed first." }
    ],
    postTest: [{ question: "Which severe-asthma finding requires emergency escalation?", options: ["Mild tremor", "Stable wheeze", "Improving peak flow", "Silent chest with drowsiness and rising PaCO2"], correct: 3, rationale: "This pattern indicates impending ventilatory failure." }]
  }
};
