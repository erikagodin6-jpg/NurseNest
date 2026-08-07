export type RpnCaAsthmaCognitiveLevel = "application" | "analysis";
export type RpnCaAsthmaClientNeeds =
  | "Physiological Adaptation"
  | "Pharmacological and Parenteral Therapies"
  | "Reduction of Risk Potential"
  | "Health Promotion and Maintenance";

export interface RpnCaAsthmaQuestion {
  id: string;
  tier: "rpn";
  exam: "REX-PN";
  regionScope: "CAN";
  countryCode: "CA";
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
  cognitiveLevel: RpnCaAsthmaCognitiveLevel;
  clientNeedsCategory: "Physiological Integrity" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: RpnCaAsthmaClientNeeds;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const CTS_ASTHMA_GUIDELINE =
  "Canadian Thoracic Society 2021 Guideline update: Diagnosis and management of asthma in preschoolers, children and adults";
const CTS_MILD_ASTHMA_GUIDELINE =
  "Canadian Thoracic Society 2021 focused update on the management of very mild and mild asthma";
const REXPN_TEST_PLAN =
  "REx-PN Test Plan: entry-level practical nursing client-needs framework and item-writing guidance";

export const rpnCaAsthmaRexpnBankBatch1: RpnCaAsthmaQuestion[] = [
  {
    id: "8b1f0001-7a22-4a31-8c01-5e5b7c010001",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A practical nurse is reassessing a patient with an acute asthma exacerbation. Which finding requires the most urgent escalation?",
    options: [
      "Minimal air entry with increasing drowsiness",
      "Expiratory wheeze with the patient speaking in full sentences",
      "Mild hand tremor after inhaled salbutamol",
      "Dry cough that improves after bronchodilator treatment"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Minimal air entry plus a declining level of consciousness suggests critically reduced airflow and impending ventilatory failure. This is an emergency deterioration pattern that requires immediate escalation.",
    optionRationales: [
      "Correct: critically poor air movement and drowsiness indicate exhaustion and possible respiratory failure.",
      "Incorrect: wheeze with preserved speech indicates airflow is still present and is less immediately dangerous than a nearly silent chest with altered consciousness.",
      "Incorrect: mild tremor is a common beta2-agonist effect and is not the priority over signs of respiratory failure.",
      "Incorrect: improvement after bronchodilator treatment suggests response rather than deterioration."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "Severity is judged by ventilation, work of breathing, speech, air entry, oxygenation and mental status rather than wheeze intensity alone.",
    clinicalPearl: "A quieter chest can mean less airflow, not improvement.",
    keyTakeaway: "Escalate immediately for a silent or nearly silent chest, exhaustion, altered consciousness or worsening gas exchange.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0002-7a22-4a31-8c01-5e5b7c010002",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with an acute asthma exacerbation is sitting upright, has an SpO2 of 88% on room air, and has an order for inhaled salbutamol. Which nursing action is the priority?",
    options: [
      "Apply oxygen as ordered or per protocol, give the prescribed salbutamol, and reassess promptly",
      "Encourage the patient to lie flat and rest before treatment",
      "Delay bronchodilator treatment until a chest radiograph is completed",
      "Ask the patient to walk in the hallway to assess exercise tolerance"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "The patient is hypoxemic during an acute bronchospastic event. Oxygenation, prescribed rapid bronchodilation and immediate reassessment address the current physiologic threat.",
    optionRationales: [
      "Correct: this sequence addresses hypoxemia and bronchospasm while preserving the practical nurse's role in carrying out ordered or protocol-driven care and reassessment.",
      "Incorrect: lying flat can worsen respiratory mechanics and does not address hypoxemia or bronchospasm.",
      "Incorrect: routine imaging should not delay treatment of an obvious acute exacerbation unless another diagnosis or complication is suspected.",
      "Incorrect: exertion is inappropriate during active respiratory distress and may increase oxygen demand."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "Acute care priorities follow airway, breathing and circulation while remaining within ordered or protocol-based practical-nursing interventions.",
    clinicalPearl: "Treat and reassess; do not wait for a perfect diagnostic picture when the patient is hypoxemic and bronchospastic.",
    keyTakeaway: "In acute asthma, support oxygenation, administer ordered rapid bronchodilation and reassess response quickly.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0003-7a22-4a31-8c01-5e5b7c010003",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "After several ordered doses of inhaled salbutamol, which assessment finding is most important for the practical nurse to trend?",
    options: [
      "Respiratory effort and air entry together with heart rate and oxygen saturation",
      "Hair colour and pupil size",
      "Bowel sounds only",
      "Daily abdominal girth"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Repeated beta2-agonist treatment should produce clinically meaningful improvement in airflow and work of breathing while the nurse also watches for tachycardia and persistent hypoxemia.",
    optionRationales: [
      "Correct: treatment effectiveness and adverse effects are judged by respiratory response plus vital-sign trends.",
      "Incorrect: hair colour and pupil size do not measure bronchodilator response.",
      "Incorrect: bowel sounds are not the priority measure of acute asthma treatment response.",
      "Incorrect: abdominal girth does not evaluate acute bronchodilation or respiratory deterioration."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "Medication administration is incomplete without reassessment of intended effect and clinically relevant adverse effects.",
    clinicalPearl: "A dose given is not the endpoint; the patient's response is.",
    keyTakeaway: "Trend airflow, work of breathing, oxygenation and heart rate after repeated salbutamol.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0004-7a22-4a31-8c01-5e5b7c010004",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which statement by a patient prescribed an inhaled corticosteroid for asthma shows correct understanding?",
    options: [
      "I should use it consistently as prescribed and rinse my mouth after inhalation",
      "I should stop it whenever I feel well for one day",
      "It is my fastest rescue medicine for sudden severe bronchospasm",
      "I should swallow the medication instead of inhaling it"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Inhaled corticosteroids reduce airway inflammation and are used as controller therapy. Mouth rinsing after use reduces local steroid deposition and the risk of oral candidiasis and dysphonia.",
    optionRationales: [
      "Correct: consistent controller use and mouth rinsing are appropriate teaching points.",
      "Incorrect: stopping controller therapy whenever symptoms improve can contribute to loss of asthma control.",
      "Incorrect: inhaled corticosteroids are not rapid rescue bronchodilators for an acute severe attack.",
      "Incorrect: the prescribed inhaled formulation must be inhaled using the correct device technique."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "Asthma medication teaching depends on distinguishing long-term anti-inflammatory control from rapid symptom relief.",
    clinicalPearl: "Controller medication prevents inflammation-driven loss of control; it is not interchangeable with a rescue bronchodilator.",
    keyTakeaway: "Teach consistent ICS use, correct technique and mouth rinsing.",
    references: [CTS_ASTHMA_GUIDELINE, CTS_MILD_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0005-7a22-4a31-8c01-5e5b7c010005",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient says, 'I only use salbutamol, but lately I need it several times most days.' What is the best practical-nursing response?",
    options: [
      "Recognize possible poor control, assess adherence and inhaler technique, and communicate the pattern to the prescriber or supervising nurse",
      "Reassure the patient that frequent reliever use always means excellent control",
      "Tell the patient to double every asthma medication without an order",
      "Advise the patient to stop all inhalers for one week"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Frequent reliance on a short-acting reliever can signal poor asthma control or increased exacerbation risk. The practical nurse should assess modifiable factors and escalate the pattern rather than independently changing the regimen.",
    optionRationales: [
      "Correct: this combines assessment, education and appropriate collaboration without exceeding scope.",
      "Incorrect: frequent reliever use is a warning sign, not proof of good control.",
      "Incorrect: independently doubling prescribed therapy exceeds the expected role and may be unsafe.",
      "Incorrect: stopping all inhalers can worsen airway inflammation and increase risk."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The exam target is recognition of loss of control plus safe escalation, not independent prescribing.",
    clinicalPearl: "Rescue use is a control signal; ask why it is increasing.",
    keyTakeaway: "Frequent salbutamol use warrants reassessment of control, technique, adherence and treatment plan.",
    references: [CTS_MILD_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0006-7a22-4a31-8c01-5e5b7c010006",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient using a pressurized metered-dose inhaler with a spacer asks why the spacer is useful. Which explanation is best?",
    options: [
      "It helps coordinate inhalation and improves delivery of aerosolized medication to the lungs",
      "It converts every inhaled drug into an oral tablet",
      "It eliminates the need to inhale slowly through the device",
      "It makes cleaning and device technique unnecessary"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "A spacer or valved holding chamber reduces the coordination required between actuation and inhalation and can improve medication delivery when used correctly.",
    optionRationales: [
      "Correct: spacers improve delivery by holding the aerosol briefly so the patient can inhale it effectively.",
      "Incorrect: a spacer does not convert inhaled medication into an oral formulation.",
      "Incorrect: appropriate inhalation technique is still required when using a spacer.",
      "Incorrect: devices still require cleaning and technique review."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Device teaching is a common cause of preventable treatment failure and fits entry-level nursing health-promotion responsibilities.",
    clinicalPearl: "Before labelling asthma 'refractory,' watch the patient use the inhaler.",
    keyTakeaway: "A spacer can improve pMDI drug delivery but does not replace correct technique.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0007-7a22-4a31-8c01-5e5b7c010007",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient has less wheezing after treatment but remains tachypneic and now has markedly reduced breath sounds bilaterally. What should the practical nurse do?",
    options: [
      "Treat this as possible worsening airflow obstruction and escalate immediately",
      "Document that the attack has resolved because wheezing is quieter",
      "Ask the patient to sleep and reassess in four hours",
      "Hold further respiratory assessment because breath sounds are reduced"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Wheezing requires enough airflow to generate sound. Reduced wheeze with persistent distress and markedly poor air entry may indicate severe obstruction rather than improvement.",
    optionRationales: [
      "Correct: the pattern may represent a dangerous 'silent chest' trajectory and needs urgent reassessment and escalation.",
      "Incorrect: quieter wheezing is not reliable evidence of recovery when air entry is worsening.",
      "Incorrect: delayed reassessment is unsafe during ongoing severe respiratory distress.",
      "Incorrect: reduced breath sounds increase the need for assessment rather than eliminating it."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The nurse must integrate multiple findings rather than use a single cue such as wheeze intensity.",
    clinicalPearl: "Less wheeze plus less air movement is worse, not better.",
    keyTakeaway: "Correlate wheeze with air entry, effort, speech and mental status.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0008-7a22-4a31-8c01-5e5b7c010008",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with severe asthma remains in marked respiratory distress. A repeat blood gas shows the PaCO2 has risen from 30 mmHg to 43 mmHg. How should the practical nurse interpret this trend?",
    options: [
      "It may signal respiratory muscle fatigue and worsening ventilation",
      "It proves the patient is fully recovered",
      "It is expected evidence that salbutamol has cured the attack",
      "It means oxygen should automatically be discontinued"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Patients with acute asthma often hyperventilate early and have a low PaCO2. A rising or normalizing PaCO2 despite persistent severe distress can indicate loss of ventilatory reserve and impending respiratory failure.",
    optionRationales: [
      "Correct: the trend is concerning because ventilation is deteriorating while clinical distress persists.",
      "Incorrect: recovery should be judged by improved work of breathing, airflow and overall clinical status, not a rising PaCO2 in ongoing distress.",
      "Incorrect: bronchodilator response is not established by a rising PaCO2.",
      "Incorrect: oxygen decisions depend on oxygenation and the ordered target; a rising PaCO2 requires escalation, not reflex oxygen withdrawal."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "Trend interpretation matters more than memorizing a single normal range in severe asthma.",
    clinicalPearl: "In a tiring asthmatic patient, a 'normal' PaCO2 may be abnormal for the clinical situation.",
    keyTakeaway: "Rising PaCO2 with persistent distress is a red flag for ventilatory failure.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0009-7a22-4a31-8c01-5e5b7c010009",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which patient statement best demonstrates understanding of controller and reliever therapy?",
    options: [
      "My controller reduces airway inflammation over time, while my reliever is used for rapid symptom relief according to my plan",
      "My controller should be used only when I am already in severe respiratory failure",
      "My reliever prevents all airway inflammation for months after one dose",
      "Controller and reliever medicines are always interchangeable"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Asthma therapy distinguishes anti-inflammatory control from rapid symptom relief, although some prescribed ICS-formoterol regimens combine controller and reliever functions in a single treatment strategy.",
    optionRationales: [
      "Correct: the statement captures the core distinction while leaving room for individualized combination regimens.",
      "Incorrect: controller therapy is intended to prevent loss of control and is not reserved for respiratory failure.",
      "Incorrect: a rapid bronchodilator does not provide months of anti-inflammatory protection from one dose.",
      "Incorrect: the roles of asthma medications depend on the prescribed regimen and are not universally interchangeable."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Safe self-management depends on understanding what each inhaler is intended to do.",
    clinicalPearl: "Teach the purpose of each inhaler, not just its colour.",
    keyTakeaway: "Patients should know which medicine prevents inflammation and which provides rapid relief within their specific plan.",
    references: [CTS_MILD_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0010-7a22-4a31-8c01-5e5b7c010010",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with asthma has a written action plan. Which finding belongs in the emergency or red-zone response rather than routine home monitoring?",
    options: [
      "Severe breathlessness with difficulty speaking and poor response to the prescribed reliever",
      "No symptoms and usual activity tolerance",
      "Occasional trigger exposure without symptoms",
      "Stable breathing with no night-time awakening"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Severe breathlessness, inability to speak normally and poor response to reliever therapy are emergency warning signs requiring urgent escalation according to the patient's action plan.",
    optionRationales: [
      "Correct: this pattern signals severe loss of control and possible respiratory failure.",
      "Incorrect: absence of symptoms is consistent with control, not an emergency zone.",
      "Incorrect: exposure without symptoms requires trigger management but is not itself an emergency finding.",
      "Incorrect: stable breathing and no nocturnal symptoms indicate control rather than red-zone deterioration."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Action-plan teaching reduces delay in seeking care when severe deterioration occurs.",
    clinicalPearl: "A written plan is useful only if the patient knows what should trigger urgent action.",
    keyTakeaway: "Severe dyspnea, impaired speech and poor reliever response require urgent care.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0011-7a22-4a31-8c01-5e5b7c010011",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with exercise-triggered asthma asks whether all physical activity should be avoided. Which response is best?",
    options: [
      "Regular activity is generally encouraged when asthma is controlled; follow the prescribed prevention and reliever plan for exercise-related symptoms",
      "Avoid all exercise permanently because activity always damages the lungs",
      "Exercise only during an acute exacerbation",
      "Stop controller medication on days when exercising"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Asthma should be managed to support normal activity. Exercise-related symptoms can indicate suboptimal control and should be addressed through the prescribed asthma plan rather than blanket activity avoidance.",
    optionRationales: [
      "Correct: controlled asthma should permit activity, with individualized prevention and reliever strategies as prescribed.",
      "Incorrect: permanent exercise avoidance is unnecessary and may reduce overall health and conditioning.",
      "Incorrect: exercise during an acute exacerbation can worsen respiratory distress.",
      "Incorrect: controller adherence should not be stopped simply because the patient plans to exercise."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Health-promotion teaching should reduce unnecessary restriction while identifying exercise symptoms as a control issue.",
    clinicalPearl: "The goal of asthma care is participation, not avoidance.",
    keyTakeaway: "Encourage activity when controlled and use the individualized asthma plan for exercise-related symptoms.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0012-7a22-4a31-8c01-5e5b7c010012",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which environmental teaching is most appropriate for a patient whose asthma worsens around tobacco and vaping aerosols?",
    options: [
      "Reduce or eliminate exposure to smoke and vaping aerosols and include this trigger in the asthma-management plan",
      "Increase exposure gradually so the lungs become immune to the irritant",
      "Use smoke exposure as a substitute for prescribed inhaled therapy",
      "Ignore the association because inhaled irritants cannot affect asthma"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Smoke and vaping aerosols can irritate the airways and worsen asthma control. Reducing exposure is a practical trigger-reduction strategy.",
    optionRationales: [
      "Correct: trigger reduction is part of prevention and self-management.",
      "Incorrect: deliberate repeated irritant exposure can worsen airway symptoms and is not desensitization therapy.",
      "Incorrect: environmental exposure cannot replace prescribed asthma medication.",
      "Incorrect: inhaled irritants are clinically relevant asthma triggers for many patients."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Trigger assessment should lead to specific, achievable exposure-reduction teaching.",
    clinicalPearl: "Ask about vaping as well as cigarettes when assessing airway irritants.",
    keyTakeaway: "Reduce smoke and vaping exposure when they contribute to asthma symptoms.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0013-7a22-4a31-8c01-5e5b7c010013",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with a moderate asthma exacerbation has orders for inhaled salbutamol and an oral systemic corticosteroid. Which explanation is most accurate?",
    options: [
      "Salbutamol provides rapid bronchodilation, while the corticosteroid treats airway inflammation and helps reduce relapse risk",
      "The corticosteroid replaces the need for any rapid bronchodilator during acute bronchospasm",
      "Salbutamol is used mainly to prevent oral candidiasis",
      "Both medications work only by killing airway bacteria"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "The medications address different components of the exacerbation: salbutamol rapidly relaxes bronchial smooth muscle, while systemic corticosteroids reduce airway inflammation and help prevent persistent or recurrent symptoms.",
    optionRationales: [
      "Correct: the therapies are complementary rather than interchangeable.",
      "Incorrect: systemic corticosteroids do not provide the immediate bronchodilation needed for acute bronchospasm.",
      "Incorrect: salbutamol is a bronchodilator and is unrelated to prevention of steroid-associated oral candidiasis.",
      "Incorrect: neither medication is an antibacterial agent."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "Medication questions should test mechanism-linked purpose and priority rather than isolated drug trivia.",
    clinicalPearl: "Bronchodilation and anti-inflammatory treatment solve different parts of the same exacerbation.",
    keyTakeaway: "Rapid bronchodilator plus anti-inflammatory therapy may both be needed in a significant exacerbation.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0014-7a22-4a31-8c01-5e5b7c010014",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient with a moderate-to-severe acute asthma exacerbation has ordered salbutamol plus ipratropium. Why is ipratropium added?",
    options: [
      "It provides additional bronchodilation through muscarinic blockade",
      "It is an antibiotic that treats bacterial pneumonia",
      "It is a sedative used to reduce respiratory drive",
      "It replaces oxygen when the patient is hypoxemic"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Ipratropium is a short-acting muscarinic antagonist that can add bronchodilation when combined with a short-acting beta2-agonist during more significant exacerbations.",
    optionRationales: [
      "Correct: ipratropium blocks cholinergic bronchoconstriction and complements beta2-agonist therapy.",
      "Incorrect: ipratropium has no antibacterial activity.",
      "Incorrect: respiratory-drive suppression would be dangerous in a patient with acute asthma; ipratropium is not a sedative.",
      "Incorrect: bronchodilation does not replace supplemental oxygen when hypoxemia is present."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The learner must connect drug class to the physiologic problem being treated.",
    clinicalPearl: "In acute asthma, ipratropium is an add-on bronchodilator, not a substitute for salbutamol or oxygen.",
    keyTakeaway: "Ipratropium can augment bronchodilation in moderate-to-severe exacerbations.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0015-7a22-4a31-8c01-5e5b7c010015",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "Which finding best supports readiness for discharge teaching after treatment of an asthma exacerbation?",
    options: [
      "Respiratory status is stable or improving, the patient can use the inhaler correctly, and follow-up/action-plan instructions are understood",
      "The patient still needs rapidly increasing oxygen but wants to go home",
      "The patient is increasingly drowsy but has less audible wheeze",
      "The patient cannot demonstrate inhaler technique and does not know when to seek urgent care"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Discharge readiness requires clinical stability plus the ability to safely carry out the treatment and follow-up plan. Education should verify technique, medication purpose and red-flag recognition.",
    optionRationales: [
      "Correct: both physiologic stability and self-management readiness are necessary.",
      "Incorrect: an increasing oxygen requirement signals deterioration rather than discharge readiness.",
      "Incorrect: drowsiness with reduced wheeze can signal respiratory failure.",
      "Incorrect: inability to use the inhaler or recognize red flags creates an unsafe discharge risk."
    ],
    difficulty: 3,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Safe transition planning integrates current stability with the patient's ability to execute the plan after discharge.",
    clinicalPearl: "Teach-back and device demonstration are stronger than asking, 'Do you understand?'",
    keyTakeaway: "Confirm clinical improvement, inhaler technique, medication purpose, action plan and follow-up before discharge.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0016-7a22-4a31-8c01-5e5b7c010016",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A young child cannot coordinate a pressurized metered-dose inhaler directly. Which teaching is most appropriate?",
    options: [
      "Use an age-appropriate spacer or valved holding chamber, with a mask when needed, and demonstrate the technique to the caregiver",
      "Spray the medication into the room and have the child breathe normally nearby",
      "Replace all inhaled medication with cough syrup",
      "Skip asthma medication until the child can coordinate an adult inhaler technique"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Age-appropriate delivery devices improve the ability of young children to receive inhaled medication effectively. Caregiver demonstration and return-demonstration are essential.",
    optionRationales: [
      "Correct: a spacer/holding chamber with age-appropriate interface supports effective delivery when coordination is limited.",
      "Incorrect: releasing medication into room air does not provide a reliable therapeutic dose.",
      "Incorrect: cough syrup does not replace prescribed asthma controller or reliever medication.",
      "Incorrect: therapy should be adapted to the child's developmental ability rather than withheld."
    ],
    difficulty: 2,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Paediatric medication safety depends on matching the device to developmental ability and involving caregivers.",
    clinicalPearl: "Technique problems can look like medication failure.",
    keyTakeaway: "Use an age-appropriate spacer/holding chamber and caregiver teach-back for young children.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0017-7a22-4a31-8c01-5e5b7c010017",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient receiving frequent high-dose salbutamol during a severe exacerbation develops palpitations. Which additional laboratory trend may be clinically relevant?",
    options: [
      "Falling serum potassium",
      "Rising serum bilirubin caused by airway dilation",
      "Severe hypercalcemia caused by one inhaled dose",
      "Markedly elevated INR caused directly by beta2 stimulation"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Repeated beta2-agonist treatment can shift potassium into cells and contribute to transient hypokalemia, especially when high doses are used during severe exacerbations.",
    optionRationales: [
      "Correct: hypokalemia is a recognized systemic effect of repeated beta2-agonist exposure and can matter in patients with arrhythmia risk.",
      "Incorrect: bilirubin elevation is not a characteristic direct effect of salbutamol bronchodilation.",
      "Incorrect: acute hypercalcemia is not an expected salbutamol effect.",
      "Incorrect: salbutamol does not directly produce a major INR elevation through beta2 stimulation."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "High-intensity acute treatment requires monitoring for systemic medication effects as well as respiratory response.",
    clinicalPearl: "Repeated beta2-agonists can affect heart rate and potassium as the dose burden rises.",
    keyTakeaway: "Monitor clinically relevant tachycardia and potassium risk during intensive salbutamol therapy.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0018-7a22-4a31-8c01-5e5b7c010018",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A 20-year-old Canadian patient with confirmed mild asthma is prescribed as-needed budesonide/formoterol. Which action is appropriate for the practical nurse?",
    options: [
      "Recognize this as a guideline-supported option for selected patients aged 12 years and older, verify the prescription and teach the ordered plan",
      "Refuse to administer it because formoterol can never be part of reliever therapy",
      "Independently change the prescription to salbutamol-only therapy",
      "Tell the patient to use the inhaler continuously regardless of the prescribed plan"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Current Canadian Thoracic Society guidance includes as-needed budesonide/formoterol as an option for selected patients aged 12 years and older with very mild or mild asthma. The practical nurse implements and teaches the prescribed plan rather than independently redesigning it.",
    optionRationales: [
      "Correct: the regimen can be appropriate in the Canadian guideline framework when prescribed for the right patient.",
      "Incorrect: formoterol has a rapid onset and is specifically used in approved ICS/formoterol reliever strategies.",
      "Incorrect: independently substituting another regimen exceeds the practical nurse's role and may contradict the treatment plan.",
      "Incorrect: use should follow the individualized prescription and action plan, not an invented continuous schedule."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The item tests Canadian guideline recognition while preserving practical-nursing scope boundaries.",
    clinicalPearl: "Do not reject a modern asthma regimen because it differs from older SABA-only teaching.",
    keyTakeaway: "Selected Canadian patients aged 12 years and older may appropriately have PRN budesonide/formoterol when prescribed.",
    references: [CTS_MILD_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0019-7a22-4a31-8c01-5e5b7c010019",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A patient tracks peak expiratory flow at home. Which interpretation is most useful?",
    options: [
      "Compare the value with the patient's personal best and action-plan zones, and interpret it together with symptoms",
      "Compare it only with another patient's value of the same age",
      "Ignore symptoms whenever the peak-flow number is available",
      "Use one isolated value to permanently change the medication regimen without consultation"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Peak-flow monitoring is most useful when compared with the individual's personal best and incorporated into a written action plan alongside symptom assessment.",
    optionRationales: [
      "Correct: personal-best comparison and symptom context make the measurement clinically meaningful.",
      "Incorrect: another person's reading is not the appropriate reference for an individualized asthma action plan.",
      "Incorrect: symptoms and clinical status remain important even when objective flow data are available.",
      "Incorrect: one isolated home reading should not trigger an unsupervised permanent regimen change outside the action plan."
    ],
    difficulty: 3,
    cognitiveLevel: "application",
    clientNeedsCategory: "Health Promotion and Maintenance",
    clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Self-monitoring tools support decisions only when embedded in an individualized action plan.",
    clinicalPearl: "Personal best is more useful than population trivia for home peak-flow action zones.",
    keyTakeaway: "Use peak flow as one part of an individualized symptom-and-action-plan assessment.",
    references: [CTS_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  },
  {
    id: "8b1f0020-7a22-4a31-8c01-5e5b7c010020",
    tier: "rpn",
    exam: "REX-PN",
    regionScope: "CAN",
    countryCode: "CA",
    licensingBody: "NCSBN",
    bodySystem: "Respiratory",
    topic: "Asthma",
    questionType: "multiple_choice",
    stem: "A practical nurse notices that a patient's asthma symptoms remain uncontrolled despite frequent reliever use. Which action best reflects appropriate scope and clinical judgment?",
    options: [
      "Assess symptoms, adherence and device technique, identify red flags, and communicate the need for treatment-plan reassessment",
      "Independently diagnose severe eosinophilic asthma and prescribe a biologic",
      "Tell the patient to triple all doses without an order",
      "Ignore the pattern because treatment decisions are never relevant to nursing assessment"
    ],
    correctAnswer: 0,
    correctAnswerExplanation: "Entry-level practical nursing includes assessment, medication-safety monitoring, patient teaching, recognition of deterioration and timely collaboration. Independent diagnosis and prescribing are outside this role.",
    optionRationales: [
      "Correct: this is scope-appropriate assessment and escalation that can identify modifiable causes and unsafe deterioration.",
      "Incorrect: independent diagnosis of a severe asthma phenotype and biologic prescribing require advanced diagnostic and prescribing authority.",
      "Incorrect: unsupervised dose escalation may be unsafe and exceeds the nurse's authority unless explicitly covered by an authorized action plan or order.",
      "Incorrect: treatment effectiveness and loss of control are central nursing assessment and safety concerns."
    ],
    difficulty: 4,
    cognitiveLevel: "analysis",
    clientNeedsCategory: "Physiological Integrity",
    clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The best answer combines clinical assessment with scope awareness and timely escalation.",
    clinicalPearl: "Good practical-nursing questions should test what to notice, what to do safely, and when to escalate.",
    keyTakeaway: "Recognize uncontrolled asthma, assess modifiable causes and escalate for plan reassessment without independent prescribing.",
    references: [CTS_ASTHMA_GUIDELINE, CTS_MILD_ASTHMA_GUIDELINE, REXPN_TEST_PLAN]
  }
];

if (rpnCaAsthmaRexpnBankBatch1.length !== 20) {
  throw new Error(`RPN_CA_ASTHMA_BATCH1_COUNT_INVALID: ${rpnCaAsthmaRexpnBankBatch1.length}`);
}

for (const question of rpnCaAsthmaRexpnBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== question.options.length) {
    throw new Error(`RPN_CA_ASTHMA_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
    throw new Error(`RPN_CA_ASTHMA_ANSWER_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.difficulty > 4) {
    throw new Error(`RPN_CA_ASTHMA_DIFFICULTY_INVALID: ${question.id}`);
  }
}
