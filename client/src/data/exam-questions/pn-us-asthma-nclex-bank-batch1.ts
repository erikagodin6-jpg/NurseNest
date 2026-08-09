export type PnUsAsthmaCognitiveLevel = "application" | "analysis";
export type PnUsAsthmaClientNeeds =
  | "Physiological Adaptation"
  | "Pharmacological Therapies"
  | "Reduction of Risk Potential"
  | "Health Promotion and Maintenance";

export interface PnUsAsthmaQuestion {
  id: string;
  servingTier: "rpn";
  pathway: "US-PN";
  exam: "NCLEX-PN";
  regionScope: "US";
  countryCode: "US";
  licensingBody: "NCSBN";
  bodySystem: "Respiratory";
  topic: "Asthma";
  questionType: "multiple_choice";
  stem: string;
  options: [string, string, string, string];
  correctAnswer: number;
  correctAnswerExplanation: string;
  optionRationales: [string, string, string, string];
  difficulty: 2 | 3 | 4;
  cognitiveLevel: PnUsAsthmaCognitiveLevel;
  clientNeedsCategory: "Physiological Integrity" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: PnUsAsthmaClientNeeds;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const NHLBI_FOCUSED_UPDATES =
  "NHLBI/NAEPP 2020 Focused Updates to the Asthma Management Guidelines";
const NHLBI_CLINICIAN_GUIDE =
  "NHLBI Clinician's Guide to the 2020 Focused Updates to the Asthma Management Guidelines";
const NCLEX_PN_2026 =
  "NCSBN 2026 NCLEX-PN Test Plan";

export const pnUsAsthmaNclexBankBatch1: PnUsAsthmaQuestion[] = [
  {
    id: "9c2e0001-6b34-4c72-9d11-6f6c8d020001",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "An LPN/VN is reassessing a patient with an acute asthma exacerbation. Which finding requires immediate escalation?",
    options: [
      "Very poor air movement with increasing somnolence",
      "Expiratory wheezing while speaking in full sentences",
      "Mild tremor after albuterol",
      "A cough that improves after bronchodilator therapy"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Very poor air movement together with a declining level of consciousness suggests critical airflow obstruction, fatigue, and impending ventilatory failure.",
    optionRationales: [
      "Correct: poor air entry and somnolence are emergency deterioration cues that can precede respiratory arrest.",
      "Incorrect: wheezing with preserved speech indicates airflow is still present and is less immediately dangerous than severe hypoventilation with altered consciousness.",
      "Incorrect: mild tremor is a common beta2-agonist effect and is not the priority over signs of respiratory failure.",
      "Incorrect: improvement after bronchodilator therapy suggests response rather than acute deterioration."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The learner must prioritize ventilation and mental-status changes over the loudness of wheezing.",
    clinicalPearl: "A nearly silent chest in a struggling patient is more dangerous than loud wheezing.",
    keyTakeaway: "Escalate immediately for poor air movement, exhaustion, altered consciousness, or worsening gas exchange.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0002-6b34-4c72-9d11-6f6c8d020002",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with acute asthma has an SpO2 of 87% on room air and an order for inhaled albuterol. Which action should the LPN/VN take first?",
    options: [
      "Support oxygenation per order or protocol, administer the prescribed albuterol, and reassess promptly",
      "Place the patient flat and wait for symptoms to resolve",
      "Delay bronchodilator therapy until routine chest imaging is completed",
      "Ask the patient to ambulate to determine whether the dyspnea is exertional"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "The patient is hypoxemic during an acute bronchospastic event. Immediate priorities are oxygenation, prescribed rapid bronchodilation, and frequent reassessment.",
    optionRationales: [
      "Correct: the response addresses the current physiologic threat while remaining within ordered or protocol-driven practical-nursing care.",
      "Incorrect: supine positioning may worsen respiratory mechanics and does not treat hypoxemia or bronchospasm.",
      "Incorrect: routine imaging should not delay treatment of an acute exacerbation when immediate therapy is indicated.",
      "Incorrect: exertion during active respiratory distress can worsen the patient's condition."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "NCLEX-style prioritization begins with the immediate airway/breathing threat and then evaluates response.",
    clinicalPearl: "Treat the hypoxemia and bronchospasm, then reassess whether the patient is moving in the right direction.",
    keyTakeaway: "Acute asthma care requires rapid support of oxygenation, prescribed bronchodilation, and reassessment.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0003-6b34-4c72-9d11-6f6c8d020003",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which finding is an expected systemic effect the LPN/VN should monitor after repeated doses of albuterol?",
    options: [
      "Tremor and tachycardia",
      "Profound bradycardia and pinpoint pupils",
      "Severe constipation from opioid receptor stimulation",
      "Marked gingival hyperplasia"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Beta2-agonists can cause tremor, palpitations, and tachycardia, particularly when repeated doses are needed during an exacerbation.",
    optionRationales: [
      "Correct: tremor and tachycardia are recognized beta-agonist effects and should be trended with clinical response.",
      "Incorrect: bradycardia and pinpoint pupils suggest an opioid-type toxidrome, not an expected albuterol effect.",
      "Incorrect: albuterol does not act as an opioid and does not characteristically cause opioid-related constipation.",
      "Incorrect: gingival hyperplasia is associated with other drug classes and is not an expected acute albuterol effect."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "Medication-safety questions should link receptor effects to bedside monitoring.",
    clinicalPearl: "A faster heart rate after albuterol may be expected, but the nurse still evaluates severity, trend, and overall response.",
    keyTakeaway: "Monitor heart rate, tremor, respiratory response, and escalating dose requirements during albuterol therapy.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0004-6b34-4c72-9d11-6f6c8d020004",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which statement by a patient prescribed an inhaled corticosteroid indicates correct understanding?",
    options: [
      "I should use it as prescribed and rinse my mouth after inhaling it",
      "I should save it only for sudden severe bronchospasm because it works faster than albuterol",
      "I should stop it every time I have one symptom-free day",
      "I should swallow the inhaled medication instead of using the inhaler"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Inhaled corticosteroids reduce airway inflammation and are foundational controller therapy for persistent asthma. Rinsing the mouth reduces local steroid deposition and the risk of oral candidiasis and dysphonia.",
    optionRationales: [
      "Correct: consistent use and mouth rinsing are appropriate controller-medication teaching.",
      "Incorrect: inhaled corticosteroids are not rapid rescue bronchodilators for sudden severe bronchospasm.",
      "Incorrect: stopping controller therapy whenever symptoms improve can contribute to loss of control.",
      "Incorrect: inhaled formulations must be delivered using the prescribed inhaler technique."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The question tests safe medication teaching rather than memorization of drug names alone.",
    clinicalPearl: "Controller therapy works by reducing inflammation; it is not a substitute for immediate rescue treatment during severe bronchospasm.",
    keyTakeaway: "Teach consistent ICS use, proper inhaler technique, and mouth rinsing.",
    references: [NHLBI_FOCUSED_UPDATES, NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0005-6b34-4c72-9d11-6f6c8d020005",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "An adult with moderate-to-severe persistent asthma is prescribed an inhaler containing an inhaled corticosteroid and formoterol for both daily maintenance and symptom relief. Which concept should the LPN/VN recognize?",
    options: [
      "SMART therapy",
      "LABA monotherapy",
      "Antibiotic prophylaxis",
      "Oral corticosteroid monotherapy"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "NHLBI/NAEPP guidance supports single-maintenance-and-reliever therapy (SMART) with ICS-formoterol for appropriate patients with moderate-to-severe persistent asthma.",
    optionRationales: [
      "Correct: SMART uses one ICS-formoterol inhaler for maintenance and quick relief according to the prescribed regimen.",
      "Incorrect: the regimen contains an inhaled corticosteroid and is not LABA monotherapy.",
      "Incorrect: ICS-formoterol is not an antibiotic strategy.",
      "Incorrect: the regimen is inhaled combination therapy, not oral corticosteroid monotherapy."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The learner must recognize modern U.S. asthma treatment terminology to administer and teach the prescribed regimen safely.",
    clinicalPearl: "Formoterol is the LABA used in SMART because its onset is rapid enough for reliever use in the guideline strategy.",
    keyTakeaway: "Do not mistake prescribed ICS-formoterol SMART for unsafe LABA monotherapy.",
    references: [NHLBI_FOCUSED_UPDATES, NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0006-6b34-4c72-9d11-6f6c8d020006",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A 19-year-old with mild asthma has a provider-directed plan to use an inhaled corticosteroid whenever a short-acting bronchodilator is taken for symptoms. Which interpretation is best?",
    options: [
      "This is a U.S. guideline-supported intermittent ICS strategy for selected patients age 12 years and older",
      "This plan is never appropriate because inhaled corticosteroids must always be taken only once a month",
      "The patient should replace the inhaled corticosteroid with an antibiotic",
      "The LPN/VN should independently discontinue the plan and prescribe a different regimen"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "The NHLBI focused update includes an intermittent inhaled corticosteroid strategy used with a short-acting bronchodilator as an option for selected patients age 12 years and older with mild persistent asthma.",
    optionRationales: [
      "Correct: the regimen reflects one evidence-based U.S. option when it is part of the prescribed treatment plan.",
      "Incorrect: monthly-only inhaled corticosteroid use is not the guideline concept described.",
      "Incorrect: antibiotics do not replace anti-inflammatory asthma controller therapy.",
      "Incorrect: independently discontinuing and prescribing a new regimen is outside LPN/VN scope."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The item tests U.S.-specific guideline recognition while preserving practical-nursing scope.",
    clinicalPearl: "Asthma regimens have evolved; safe nursing practice includes recognizing valid prescribed strategies rather than applying outdated one-size-fits-all rules.",
    keyTakeaway: "Selected U.S. patients age 12 years and older may have an intermittent ICS-with-SABA plan when prescribed.",
    references: [NHLBI_FOCUSED_UPDATES, NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0007-6b34-4c72-9d11-6f6c8d020007",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A parent of a 3-year-old with recurrent infection-triggered wheezing has a provider-written home plan. Which instruction is consistent with the NHLBI focused update?",
    options: [
      "At the start of the respiratory infection, use the prescribed short 7- to 10-day course of daily inhaled corticosteroid plus as-needed short-acting bronchodilator",
      "Start indefinite daily oral prednisone with every cold",
      "Avoid all bronchodilators until the child turns 5",
      "Use antibiotics for every viral respiratory infection"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "For selected children age 0 to 4 years with recurrent wheezing triggered by respiratory infections and no symptoms between infections, the NHLBI focused update supports a short course of daily ICS started with the infection plus as-needed SABA according to the prescribed plan.",
    optionRationales: [
      "Correct: this matches the age-specific intermittent ICS recommendation when incorporated into a clinician-directed plan.",
      "Incorrect: indefinite systemic corticosteroid therapy is not the recommended routine strategy for recurrent viral wheezing.",
      "Incorrect: short-acting bronchodilators may be used in young children when prescribed and delivered with an age-appropriate device.",
      "Incorrect: viral respiratory infections do not warrant routine antibiotics."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Age-specific guideline knowledge is applied through caregiver teaching and verification of the written plan, not independent prescribing.",
    clinicalPearl: "Preschool recurrent viral wheeze has a specific intermittent ICS option in U.S. guidance.",
    keyTakeaway: "Teach caregivers to follow the prescribed 7- to 10-day ICS course at infection onset when that plan is indicated.",
    references: [NHLBI_FOCUSED_UPDATES, NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0008-6b34-4c72-9d11-6f6c8d020008",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which asthma medication order should prompt the LPN/VN to clarify the treatment plan?",
    options: [
      "A long-acting beta2-agonist prescribed as monotherapy without an inhaled corticosteroid",
      "An inhaled corticosteroid prescribed for persistent asthma",
      "Albuterol prescribed for rapid relief of bronchospasm",
      "An ICS-formoterol inhaler prescribed as part of a SMART regimen"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "LABA monotherapy is not an appropriate stand-alone asthma strategy because asthma requires anti-inflammatory treatment; LABAs are used with inhaled corticosteroid therapy when indicated.",
    optionRationales: [
      "Correct: LABA without an inhaled corticosteroid is a medication-safety concern in asthma and should be clarified.",
      "Incorrect: inhaled corticosteroids are foundational anti-inflammatory therapy for persistent asthma.",
      "Incorrect: albuterol is a standard rapid bronchodilator for acute symptom relief when prescribed.",
      "Incorrect: ICS-formoterol can be appropriately prescribed in a SMART strategy for selected patients."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "Medication-safety questions should require the nurse to identify an unsafe regimen without independently substituting therapy.",
    clinicalPearl: "LABA in asthma belongs with anti-inflammatory treatment, not alone.",
    keyTakeaway: "Clarify LABA monotherapy in asthma; do not independently redesign the regimen.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0009-6b34-4c72-9d11-6f6c8d020009",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient age 15 has asthma that remains uncontrolled on inhaled corticosteroid therapy. Which nursing action is most appropriate when the provider is considering add-on therapy?",
    options: [
      "Verify current adherence and inhaler technique and communicate the assessment before the regimen is intensified",
      "Independently prescribe a long-acting muscarinic antagonist",
      "Stop the inhaled corticosteroid so only bronchodilators remain",
      "Assume the medication has failed without watching the patient use the inhaler"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Before therapy is intensified, modifiable causes of poor control such as adherence and inhaler technique should be assessed. The LPN/VN contributes these findings but does not independently prescribe add-on therapy.",
    optionRationales: [
      "Correct: technique and adherence are high-yield, scope-appropriate assessments that directly affect treatment decisions.",
      "Incorrect: independent prescribing of a LAMA is outside LPN/VN scope.",
      "Incorrect: removing anti-inflammatory therapy can worsen asthma control.",
      "Incorrect: poor device technique can mimic treatment failure and should be assessed."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "Clinical judgment includes checking correct use of existing therapy before assuming pharmacologic failure.",
    clinicalPearl: "Before stepping up asthma medication, confirm that the current medication is actually reaching the lungs.",
    keyTakeaway: "Assess adherence and technique before treatment-plan escalation.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0010-6b34-4c72-9d11-6f6c8d020010",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient asks why a spacer is used with a pressurized metered-dose inhaler. Which response is best?",
    options: [
      "It reduces the coordination required between actuation and inhalation and can improve medication delivery",
      "It changes inhaled medication into an oral tablet",
      "It makes inhalation technique unnecessary",
      "It allows the patient to spray all doses for the day into the chamber at once"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "A spacer or valved holding chamber holds aerosol briefly, reducing actuation-inhalation coordination demands and supporting more effective drug delivery when used properly.",
    optionRationales: [
      "Correct: the device assists delivery but still requires correct technique.",
      "Incorrect: the medication remains an inhaled aerosol and is not converted into an oral formulation.",
      "Incorrect: technique still matters with a spacer.",
      "Incorrect: doses should be administered according to device instructions, not accumulated in the spacer for later inhalation."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Device education is a practical nursing intervention that can improve real-world medication effectiveness.",
    clinicalPearl: "A spacer helps with coordination; it does not eliminate the need for demonstration and teach-back.",
    keyTakeaway: "Teach and verify correct spacer technique.",
    references: [NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0011-6b34-4c72-9d11-6f6c8d020011",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with documented dust-mite sensitivity asks how to reduce indoor allergen exposure. Which response best reflects U.S. guidance?",
    options: [
      "Use a multicomponent allergen-reduction approach tailored to the patient's confirmed exposure and sensitivity",
      "Rely on a single unproven household change and stop prescribed asthma medication",
      "Increase dust exposure to build tolerance without specialist guidance",
      "Assume indoor allergens never affect asthma"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "NHLBI guidance supports targeted, multicomponent indoor allergen mitigation for people with asthma who are exposed and sensitized to specific indoor allergens rather than universal untargeted measures.",
    optionRationales: [
      "Correct: interventions should match confirmed sensitivity/exposure and generally use more than one effective measure.",
      "Incorrect: allergen mitigation does not replace prescribed asthma therapy and a single measure may be insufficient.",
      "Incorrect: deliberate uncontrolled allergen exposure can worsen symptoms and is not safe desensitization.",
      "Incorrect: indoor allergens can contribute to asthma symptoms in sensitized individuals."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The item tests patient education that is targeted rather than generic or excessive.",
    clinicalPearl: "Environmental control works best when it is matched to a real sensitization and exposure.",
    keyTakeaway: "Use targeted, multicomponent indoor allergen reduction when sensitivity and exposure are established.",
    references: [NHLBI_FOCUSED_UPDATES, NHLBI_CLINICIAN_GUIDE, NCLEX_PN_2026]
  },
  {
    id: "9c2e0012-6b34-4c72-9d11-6f6c8d020012",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which patient statement requires immediate emergency follow-up according to an asthma action plan?",
    options: [
      "I am extremely short of breath, can barely speak, and my rescue medicine is not helping",
      "I have no symptoms and can do my usual activities",
      "I noticed a trigger yesterday but did not develop symptoms",
      "I slept through the night without coughing or wheezing"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Severe dyspnea, impaired speech, and poor response to prescribed rescue therapy indicate dangerous loss of control and possible respiratory failure.",
    optionRationales: [
      "Correct: these are red-zone cues that require urgent emergency evaluation.",
      "Incorrect: no symptoms and normal activity indicate good control rather than an emergency.",
      "Incorrect: trigger exposure without symptoms calls for prevention strategies but is not itself an emergency.",
      "Incorrect: no nocturnal symptoms is a marker of control."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Action-plan teaching should help patients recognize when home management is no longer enough.",
    clinicalPearl: "The most important part of an action plan is knowing when to escalate beyond it.",
    keyTakeaway: "Severe breathlessness, impaired speech, and failure of rescue therapy require emergency care.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0013-6b34-4c72-9d11-6f6c8d020013",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with severe asthma remains visibly distressed. The PaCO2 rises from 29 mmHg to 42 mmHg. What should the LPN/VN do?",
    options: [
      "Recognize possible respiratory fatigue and escalate the change immediately",
      "Document that the patient is cured because the PaCO2 is now in the laboratory reference range",
      "Stop all respiratory monitoring",
      "Assume the change is caused by oral candidiasis"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "A patient with severe asthma often has a low PaCO2 early from hyperventilation. A rising or normalizing PaCO2 despite persistent distress can signal failing ventilation and impending respiratory failure.",
    optionRationales: [
      "Correct: the trend is clinically dangerous when respiratory distress persists.",
      "Incorrect: a value within a reference interval can still be abnormal for a patient who should be hyperventilating during severe distress.",
      "Incorrect: worsening ventilation requires more intensive monitoring, not less.",
      "Incorrect: oral candidiasis does not explain this acute ventilation trend."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "NCLEX clinical judgment requires trend interpretation in context rather than isolated normal-range recognition.",
    clinicalPearl: "A 'normal' PaCO2 can be a bad sign in a severely distressed patient with asthma.",
    keyTakeaway: "Rising PaCO2 during persistent severe distress is a respiratory-failure warning.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0014-6b34-4c72-9d11-6f6c8d020014",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with a significant asthma exacerbation receives albuterol and a systemic corticosteroid. Which explanation is accurate?",
    options: [
      "Albuterol rapidly bronchodilates, while the corticosteroid reduces airway inflammation and helps prevent persistent or recurrent symptoms",
      "The corticosteroid provides faster bronchodilation than albuterol within seconds",
      "Albuterol works mainly by killing airway bacteria",
      "Both medications are used only to sedate the patient"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Albuterol targets bronchial smooth-muscle constriction, while systemic corticosteroids treat the inflammatory component of the exacerbation. The therapies are complementary.",
    optionRationales: [
      "Correct: the two medications address different mechanisms in the exacerbation.",
      "Incorrect: systemic corticosteroids do not replace a rapid bronchodilator for immediate bronchospasm relief.",
      "Incorrect: albuterol is not an antimicrobial agent.",
      "Incorrect: neither medication is intended to sedate the patient."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The item links mechanism to treatment purpose and discourages the common error of treating medications as interchangeable.",
    clinicalPearl: "Bronchodilation acts fast; anti-inflammatory therapy changes the inflammatory trajectory.",
    keyTakeaway: "Acute asthma may require both rapid bronchodilation and systemic anti-inflammatory therapy.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0015-6b34-4c72-9d11-6f6c8d020015",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Why might ipratropium be added to albuterol during a moderate-to-severe acute asthma exacerbation?",
    options: [
      "It adds bronchodilation by blocking muscarinic-mediated bronchoconstriction",
      "It replaces supplemental oxygen in hypoxemia",
      "It is an antibiotic used to sterilize the bronchi",
      "It is a sedative used to suppress the urge to breathe"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Ipratropium is a short-acting muscarinic antagonist that can provide additive bronchodilation when combined with a short-acting beta2-agonist in more severe acute bronchospasm.",
    optionRationales: [
      "Correct: the anticholinergic mechanism complements beta2-agonist bronchodilation.",
      "Incorrect: bronchodilator therapy does not replace oxygen when hypoxemia is present.",
      "Incorrect: ipratropium is not an antibiotic.",
      "Incorrect: respiratory-drive suppression would be dangerous; ipratropium is not a sedative."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The learner connects medication class with its role in escalation of acute bronchodilator therapy.",
    clinicalPearl: "Ipratropium is an add-on bronchodilator during significant exacerbations, not a replacement for oxygen or albuterol.",
    keyTakeaway: "Ipratropium can augment bronchodilation in moderate-to-severe acute asthma.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0016-6b34-4c72-9d11-6f6c8d020016",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which finding best supports readiness for discharge after treatment of an asthma exacerbation?",
    options: [
      "Breathing is stable or improving, the patient demonstrates inhaler technique, and the action/follow-up plan is understood",
      "The oxygen requirement is rapidly increasing but the patient wants to leave",
      "The patient is becoming drowsy and has almost no air movement",
      "The patient cannot identify which inhaler is for rapid relief"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Discharge readiness requires clinical stability and a safe self-management plan, including correct device use, medication understanding, red-flag recognition, and follow-up.",
    optionRationales: [
      "Correct: this combines physiologic recovery with safe transition teaching.",
      "Incorrect: rising oxygen need is a deterioration cue.",
      "Incorrect: drowsiness and minimal air movement suggest impending respiratory failure.",
      "Incorrect: inability to identify rescue therapy creates an unsafe discharge risk."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Transition-of-care questions should integrate both clinical status and the patient's ability to carry out the treatment plan.",
    clinicalPearl: "Have the patient show you the inhaler technique rather than simply saying they understand it.",
    keyTakeaway: "Verify stability, technique, medication purpose, action plan, and follow-up before discharge.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0017-6b34-4c72-9d11-6f6c8d020017",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient uses home peak expiratory flow monitoring. Which teaching is most appropriate?",
    options: [
      "Compare readings with the patient's personal best and written action-plan zones, and interpret them with symptoms",
      "Compare the reading only with a neighbor's peak-flow value",
      "Ignore symptoms whenever a peak-flow number is available",
      "Permanently change prescribed therapy after one isolated low value without using the action plan"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Peak-flow monitoring is useful when individualized to the patient's personal best and integrated with symptom-based action-plan decisions.",
    optionRationales: [
      "Correct: individualized zones and symptom context support meaningful self-management.",
      "Incorrect: another person's reading is not an appropriate individualized reference.",
      "Incorrect: symptoms remain clinically important even when objective flow data are available.",
      "Incorrect: isolated data should be interpreted through the prescribed action plan rather than used to invent a new regimen."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The item tests safe use of a monitoring tool within an individualized plan.",
    clinicalPearl: "Personal best and trend are more useful than a generic population number for home action zones.",
    keyTakeaway: "Use peak-flow trends with symptoms and the written action plan.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0018-6b34-4c72-9d11-6f6c8d020018",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient reports frequent symptoms despite prescribed therapy. Which action best reflects LPN/VN scope and clinical judgment?",
    options: [
      "Assess symptom pattern, adherence, device technique, and red flags, then communicate the need for treatment-plan reassessment",
      "Independently diagnose eosinophilic asthma and prescribe a biologic",
      "Triple all prescribed doses without an order",
      "Ignore the symptoms because treatment effectiveness is not a nursing concern"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Practical nursing includes assessment, medication-safety monitoring, teaching, recognition of deterioration, and timely communication. Independent diagnosis and prescribing are outside the LPN/VN role.",
    optionRationales: [
      "Correct: the action addresses modifiable causes and escalates unsafe loss of control without exceeding scope.",
      "Incorrect: phenotype diagnosis and biologic prescribing require advanced diagnostic/prescribing authority.",
      "Incorrect: unsupervised dose escalation can be unsafe and exceeds scope unless explicitly directed by an authorized plan or order.",
      "Incorrect: treatment effectiveness and worsening symptoms are central nursing safety concerns."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The best response combines clinical assessment with scope boundaries and appropriate collaboration.",
    clinicalPearl: "Practical-nursing judgment is often about recognizing what is changing and escalating at the right time.",
    keyTakeaway: "Assess uncontrolled asthma and escalate for treatment-plan review without independent prescribing.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0019-6b34-4c72-9d11-6f6c8d020019",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A U.S. patient says, 'My rescue inhaler is albuterol.' Which medication should the LPN/VN recognize?",
    options: [
      "A short-acting beta2-agonist used for rapid bronchodilation",
      "An inhaled corticosteroid used only for long-term inflammation control",
      "A long-acting muscarinic antagonist",
      "An oral leukotriene receptor antagonist"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Albuterol is a short-acting beta2-agonist commonly used in the United States for rapid relief of bronchospasm.",
    optionRationales: [
      "Correct: albuterol rapidly relaxes bronchial smooth muscle through beta2-receptor stimulation.",
      "Incorrect: albuterol is not an inhaled corticosteroid.",
      "Incorrect: albuterol is not a long-acting muscarinic antagonist.",
      "Incorrect: albuterol is inhaled beta2-agonist therapy, not an oral leukotriene receptor antagonist."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "Country-appropriate medication terminology prevents confusion when learners encounter U.S. drug names.",
    clinicalPearl: "Albuterol is the U.S. generic term commonly corresponding to salbutamol in Canada.",
    keyTakeaway: "Recognize albuterol as the U.S. short-acting beta2-agonist rescue medication.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  },
  {
    id: "9c2e0020-6b34-4c72-9d11-6f6c8d020020",
    servingTier: "rpn",
    pathway: "US-PN",
    exam: "NCLEX-PN",
    regionScope: "US",
    countryCode: "US",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient receiving frequent high-dose albuterol during a severe exacerbation develops palpitations. Which additional laboratory trend may be clinically relevant?",
    options: [
      "Decreasing serum potassium",
      "Markedly increasing serum calcium from beta2 stimulation",
      "An elevated INR caused directly by inhaled albuterol",
      "Severe hyperbilirubinemia caused by bronchodilation"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "High-dose or repeated beta2-agonist therapy can shift potassium into cells and contribute to transient hypokalemia, which may matter when tachyarrhythmia risk is present.",
    optionRationales: [
      "Correct: potassium can fall during intensive beta2-agonist therapy and may need monitoring in severe exacerbations.",
      "Incorrect: hypercalcemia is not a characteristic acute systemic effect of albuterol.",
      "Incorrect: albuterol does not directly cause a major INR elevation.",
      "Incorrect: acute hyperbilirubinemia is not an expected direct effect of bronchodilation."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner integrates medication dose burden, cardiac symptoms, and electrolyte risk rather than treating each cue separately.",
    clinicalPearl: "As albuterol intensity rises, watch both the lungs and systemic beta-agonist effects.",
    keyTakeaway: "Intensive albuterol therapy can contribute to tachycardia and hypokalemia.",
    references: [NHLBI_FOCUSED_UPDATES, NCLEX_PN_2026]
  }
];

if (pnUsAsthmaNclexBankBatch1.length !== 20) {
  throw new Error(`PN_US_ASTHMA_BATCH1_COUNT_INVALID: ${pnUsAsthmaNclexBankBatch1.length}`);
}

for (const question of pnUsAsthmaNclexBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== question.options.length) {
    throw new Error(`PN_US_ASTHMA_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
    throw new Error(`PN_US_ASTHMA_ANSWER_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.difficulty > 4) {
    throw new Error(`PN_US_ASTHMA_DIFFICULTY_INVALID: ${question.id}`);
  }
}
