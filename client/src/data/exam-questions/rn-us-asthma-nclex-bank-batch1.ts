export interface RnUsAsthmaQuestion {
  id: string;
  tier: "rn";
  exam: "NCLEX-RN";
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
  cognitiveLevel: "application" | "analysis";
  clientNeedsCategory: "Physiological Integrity" | "Safe and Effective Care Environment" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: "Physiological Adaptation" | "Pharmacological and Parenteral Therapies" | "Reduction of Risk Potential" | "Management of Care" | "Health Promotion and Maintenance";
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const NHLBI_FOCUSED = "NHLBI/NAEPP 2020 Focused Updates to the Asthma Management Guidelines";
const NHLBI_CLINICIAN = "NHLBI Clinician's Guide to the 2020 Focused Updates";
const NCLEX_RN_2026 = "NCSBN 2026 NCLEX-RN Test Plan";

export const rnUsAsthmaNclexBankBatch1: RnUsAsthmaQuestion[] = [
  {
    id: "rn-us-asthma-0001-b201-4b01-8b01-000000000001", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with status asthmaticus is increasingly somnolent and now has minimal bilateral air movement despite continuous therapy. What is the RN's priority?",
    options: ["Activate immediate airway/critical-care escalation and prepare for advanced ventilatory support", "Chart that wheezing has improved", "Encourage the patient to walk to improve ventilation", "Wait for the next scheduled assessment"],
    correctAnswer: 0,
    correctAnswerExplanation: "Somnolence with minimal air movement indicates critical obstruction, fatigue, and possible impending respiratory arrest. The RN should escalate immediately while emergency treatment continues.",
    optionRationales: ["Correct: this is a pre-arrest deterioration pattern.", "Incorrect: quieter wheeze can result from critically low airflow.", "Incorrect: exertion is unsafe in severe respiratory distress.", "Incorrect: continuous reassessment and rapid escalation are required."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN prioritizes ventilation and mental status over wheeze intensity.", clinicalPearl: "The silent, sleepy asthmatic is an airway emergency.", keyTakeaway: "Somnolence plus poor air movement requires immediate escalation.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0002-b202-4b02-8b02-000000000002", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with severe asthma remains in marked distress. PaCO2 rises from 27 mmHg to 41 mmHg. Which interpretation should guide the RN's next action?",
    options: ["The patient is improving because PaCO2 is closer to normal", "The trend may signal respiratory muscle fatigue and failing ventilation", "The patient has developed isolated metabolic alkalosis", "The change confirms the bronchodilator has fully reversed obstruction"],
    correctAnswer: 1,
    correctAnswerExplanation: "Persistent severe asthma usually drives hyperventilation and hypocapnia. A rising PaCO2 while distress persists can mean the patient can no longer maintain ventilation.",
    optionRationales: ["Incorrect: context makes the normal-range value potentially ominous.", "Correct: rising PaCO2 with ongoing distress is a ventilatory-failure warning.", "Incorrect: PaCO2 change alone does not diagnose metabolic alkalosis.", "Incorrect: full bronchodilator response would be shown by improved airflow, effort, and oxygenation."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The RN interprets a trend in the physiologic context rather than by reference range alone.", clinicalPearl: "A normal PaCO2 can be abnormal in severe asthma.", keyTakeaway: "Rising PaCO2 during ongoing distress signals fatigue.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0003-b203-4b03-8b03-000000000003", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "An adult with moderate-to-severe persistent asthma is prescribed ICS-formoterol as both daily maintenance and quick-relief therapy. Which term should the RN recognize?",
    options: ["LABA monotherapy", "Antibiotic prophylaxis", "SMART therapy", "Oral steroid dependence"],
    correctAnswer: 2,
    correctAnswerExplanation: "NHLBI/NAEPP recommends single maintenance and reliever therapy (SMART) with ICS-formoterol for appropriate patients with moderate-to-severe persistent asthma.",
    optionRationales: ["Incorrect: SMART contains an inhaled corticosteroid and is not LABA monotherapy.", "Incorrect: the regimen is not antimicrobial therapy.", "Correct: one ICS-formoterol inhaler is used for both maintenance and symptom relief according to the prescribed plan.", "Incorrect: SMART is inhaled combination therapy, not chronic oral corticosteroid treatment."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies", clinicalReasoning: "The RN must recognize contemporary therapy to teach and administer it safely.", clinicalPearl: "Formoterol's rapid onset allows it to serve in the reliever component of SMART.", keyTakeaway: "Recognize prescribed ICS-formoterol maintenance-and-reliever therapy as SMART.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0004-b204-4b04-8b04-000000000004", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A 3-year-old has recurrent wheezing only with respiratory infections. The parent has a clinician-written plan based on NHLBI guidance. Which instruction is consistent with that plan?",
    options: ["Use daily oral prednisone indefinitely", "Avoid bronchodilators until age 5", "Give antibiotics with every cold", "At infection onset, begin the prescribed 7- to 10-day daily ICS course plus as-needed albuterol"],
    correctAnswer: 3,
    correctAnswerExplanation: "For selected children age 0 to 4 years with recurrent infection-triggered wheezing and no symptoms between infections, NHLBI guidance supports a short course of daily inhaled corticosteroid at respiratory-infection onset plus as-needed SABA.",
    optionRationales: ["Incorrect: indefinite systemic corticosteroids are not the recommended strategy.", "Incorrect: young children can receive prescribed bronchodilator therapy with age-appropriate delivery devices.", "Incorrect: viral infections do not justify routine antibiotics.", "Correct: this matches the age-specific intermittent-ICS strategy in the focused update."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN applies age-specific U.S. guidance through caregiver teaching rather than inventing treatment.", clinicalPearl: "Preschool viral wheeze has a specific intermittent-ICS option in U.S. guidance.", keyTakeaway: "Selected age 0–4 patients may use a prescribed 7–10 day ICS course at infection onset.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0005-b205-4b05-8b05-000000000005", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A 19-year-old with mild persistent asthma has a provider plan to use an inhaled corticosteroid whenever a SABA is taken for symptoms. Which RN response is best?",
    options: ["Recognize this as a guideline-supported intermittent ICS option for selected patients age 12 years and older", "Tell the patient ICS should be taken only once monthly", "Replace the ICS with an antibiotic", "Discontinue the plan because SABA and ICS can never be paired"],
    correctAnswer: 0,
    correctAnswerExplanation: "The NHLBI focused update includes intermittent ICS used concomitantly with SABA as an option for selected patients age 12 years and older with mild persistent asthma.",
    optionRationales: ["Correct: this is one evidence-based U.S. strategy when clinician-directed.", "Incorrect: monthly-only use is not the strategy described.", "Incorrect: antibiotics do not replace anti-inflammatory asthma treatment.", "Incorrect: the focused update specifically describes an ICS-with-SABA intermittent option."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies", clinicalReasoning: "The RN recognizes valid modern therapy and avoids outdated universal rules.", clinicalPearl: "Asthma control strategies are age- and severity-specific.", keyTakeaway: "Selected U.S. patients age 12+ may use clinician-directed intermittent ICS with SABA.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0006-b206-4b06-8b06-000000000006", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which asthma order should prompt the RN to clarify the regimen?",
    options: ["ICS-formoterol SMART for an appropriate patient", "A LABA prescribed as asthma monotherapy without an inhaled corticosteroid", "An inhaled corticosteroid for persistent asthma", "Albuterol for rapid symptom relief"],
    correctAnswer: 1,
    correctAnswerExplanation: "LABA monotherapy is not an appropriate stand-alone asthma regimen because long-acting bronchodilation should be paired with anti-inflammatory therapy when a LABA is used for asthma.",
    optionRationales: ["Incorrect option: prescribed ICS-formoterol SMART can be guideline-concordant.", "Correct: LABA without ICS is an asthma medication-safety concern that requires clarification.", "Incorrect option: ICS is foundational anti-inflammatory treatment for persistent asthma.", "Incorrect option: albuterol is a standard rapid bronchodilator when prescribed."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN identifies an unsafe regimen and seeks clarification rather than independently substituting treatment.", clinicalPearl: "In asthma, LABA belongs with anti-inflammatory therapy.", keyTakeaway: "Clarify LABA monotherapy in asthma.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0007-b207-4b07-8b07-000000000007", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient remains uncontrolled on an inhaled corticosteroid. Before the provider adds a LAMA, which RN assessment has the highest value?",
    options: ["Favorite inhaler color", "Ability to name receptor subtypes", "Adherence and observed inhaler technique", "Whether the patient owns a nebulizer"],
    correctAnswer: 2,
    correctAnswerExplanation: "Before stepping up therapy, modifiable causes such as nonadherence and incorrect technique should be assessed. These findings may explain poor control and directly affect treatment decisions.",
    optionRationales: ["Incorrect: preference can affect adherence but color itself does not establish correct delivery.", "Incorrect: receptor memorization is not needed to evaluate control.", "Correct: adherence and technique are common, reversible causes of apparent treatment failure.", "Incorrect: device ownership does not prove appropriate medication delivery or adherence."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN supplies the assessment data needed before pharmacologic escalation.", clinicalPearl: "Watch the patient use the inhaler before assuming the inhaler failed.", keyTakeaway: "Assess adherence and technique before step-up therapy.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0008-b208-4b08-8b08-000000000008", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with asthma has persistent symptoms and the diagnosis remains uncertain despite history and spirometry. Which additional test is addressed in the NHLBI focused update as potentially helpful in selected patients?",
    options: ["Daily sputum bacterial culture for one year", "Routine bronchoscopy for every mild asthma case", "Whole-body CT screening", "Fractional exhaled nitric oxide (FeNO) as an adjunct in selected diagnostic/management situations"],
    correctAnswer: 3,
    correctAnswerExplanation: "The NHLBI focused update addresses FeNO as an adjunct that can help in selected cases when asthma diagnosis is uncertain or when certain management questions remain; it should not replace the full clinical assessment.",
    optionRationales: ["Incorrect: routine daily sputum culture is not an asthma diagnostic strategy.", "Incorrect: bronchoscopy is not routine for mild asthma diagnosis.", "Incorrect: whole-body CT is not an asthma diagnostic test.", "Correct: FeNO is included in the focused update as a selective adjunct, not a stand-alone diagnosis."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The RN understands the role and limits of a modern inflammatory biomarker.", clinicalPearl: "FeNO can add information; it does not replace history, spirometry, and clinical context.", keyTakeaway: "Recognize FeNO as a selective adjunct in asthma evaluation/management.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0009-b209-4b09-8b09-000000000009", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with confirmed dust-mite sensitization and ongoing home exposure asks about environmental control. Which teaching best reflects NHLBI guidance?",
    options: ["Use a targeted multicomponent allergen-mitigation approach rather than relying on one generic measure", "Stop all asthma medications and use only environmental control", "Increase allergen exposure without supervision", "Assume indoor allergens cannot affect asthma"],
    correctAnswer: 0,
    correctAnswerExplanation: "For patients who are sensitized and exposed to specific indoor allergens, NHLBI guidance supports targeted multicomponent mitigation rather than universal single interventions.",
    optionRationales: ["Correct: mitigation should match confirmed sensitization/exposure and generally combine effective measures.", "Incorrect: environmental strategies complement rather than replace needed pharmacotherapy.", "Incorrect: unsupervised exposure can worsen symptoms and is not immunotherapy.", "Incorrect: indoor allergens can worsen asthma in sensitized individuals."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN avoids both indiscriminate environmental advice and medication substitution.", clinicalPearl: "Target the allergen the patient actually has, not every allergen on a checklist.", keyTakeaway: "Use targeted multicomponent allergen reduction when sensitization and exposure are established.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0010-b210-4b10-8b10-000000000010", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient using an inhaled corticosteroid reports white oral plaques and hoarseness. Which RN teaching is best?",
    options: ["Use the ICS as rescue therapy for sudden severe bronchospasm", "Review technique/spacer use, reinforce mouth rinsing, and arrange evaluation of possible candidiasis", "Swallow the inhaled medication", "Stop all asthma therapy permanently"],
    correctAnswer: 1,
    correctAnswerExplanation: "Oral candidiasis and dysphonia are recognized local ICS effects. Mouth rinsing, technique optimization, and evaluation of the current symptoms reduce harm while preserving needed controller therapy.",
    optionRationales: ["Incorrect: ICS is not the rapid bronchodilator for sudden severe symptoms.", "Correct: this addresses both prevention and management of local steroid effects.", "Incorrect: swallowing an inhaled formulation does not deliver it properly to the lungs.", "Incorrect: permanent cessation of all therapy is unnecessary and unsafe."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies", clinicalReasoning: "The RN differentiates a manageable local adverse effect from a reason to abandon treatment.", clinicalPearl: "Rinse and technique matter every day with ICS therapy.", keyTakeaway: "Prevent and evaluate ICS-related candidiasis while maintaining the prescribed control plan.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0011-b211-4b11-8b11-000000000011", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient receiving continuous albuterol for severe asthma develops frequent PVCs. Which laboratory result should the RN prioritize?",
    options: ["Bilirubin", "INR", "Potassium", "Calcium"],
    correctAnswer: 2,
    correctAnswerExplanation: "High-dose beta2-agonist therapy can shift potassium intracellularly and cause hypokalemia, increasing dysrhythmia risk.",
    optionRationales: ["Incorrect: bilirubin is not the characteristic concern from intensive albuterol therapy.", "Incorrect: albuterol does not directly produce a major INR increase.", "Correct: hypokalemia can accompany high-dose beta2-agonist therapy and matters when ectopy is present.", "Incorrect: acute hypercalcemia is not an expected albuterol effect."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The RN links medication intensity, dysrhythmia, and electrolyte shift.", clinicalPearl: "Continuous albuterol is a respiratory treatment with systemic consequences.", keyTakeaway: "Review potassium when dysrhythmia develops during intensive albuterol therapy.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0012-b212-4b12-8b12-000000000012", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which finding most strongly supports preparation for intubation in a patient with status asthmaticus?",
    options: ["Mild tremor after albuterol", "Improving peak flow", "Ability to speak more easily", "Progressive exhaustion, decreasing consciousness, and worsening hypercapnia despite aggressive therapy"],
    correctAnswer: 3,
    correctAnswerExplanation: "Progressive neurologic decline, exhaustion, and worsening ventilation despite maximal initial therapy indicate impending respiratory arrest and the need for advanced airway preparation.",
    optionRationales: ["Incorrect: mild tremor is a common beta2-agonist effect.", "Incorrect: improving peak flow suggests response.", "Incorrect: easier speech indicates improving respiratory reserve.", "Correct: these findings show failure of medical therapy and declining ventilatory capacity."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN identifies the point at which medical therapy is failing before apnea occurs.", clinicalPearl: "Prepare the airway before the patient loses it.", keyTakeaway: "Exhaustion + altered consciousness + rising CO2 = airway escalation.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0013-b213-4b13-8b13-000000000013", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with asthma suddenly develops sharp unilateral chest pain and absent breath sounds on the right. What should the RN suspect first?",
    options: ["Pneumothorax", "Oral candidiasis", "Sinusitis", "GERD"],
    correctAnswer: 0,
    correctAnswerExplanation: "Sudden unilateral pleuritic pain and absent breath sounds suggest pneumothorax and require urgent evaluation.",
    optionRationales: ["Correct: the abrupt unilateral pattern is characteristic of pneumothorax.", "Incorrect: oral candidiasis produces mouth/throat findings.", "Incorrect: sinusitis does not cause unilateral absent breath sounds.", "Incorrect: reflux does not explain this acute unilateral respiratory change."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN recognizes a dangerous alternate diagnosis/complication instead of attributing every event to asthma.", clinicalPearl: "Sudden unilateral findings demand a complication check.", keyTakeaway: "Suspect pneumothorax with sudden unilateral pain and absent breath sounds.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0014-b214-4b14-8b14-000000000014", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which patient should the RN assess first?",
    options: ["A stable patient asking for spacer teaching", "A patient with asthma who can now speak only one word at a time", "A patient with mild tremor after albuterol", "A stable patient requesting trigger-reduction advice"],
    correctAnswer: 1,
    correctAnswerExplanation: "One-word speech reflects severe breathlessness and reduced respiratory reserve, requiring immediate assessment before nonurgent teaching needs.",
    optionRationales: ["Incorrect: education is important but not the immediate priority.", "Correct: impaired speech is a high-severity respiratory cue.", "Incorrect: mild tremor is an expected beta2-agonist effect if the patient is otherwise stable.", "Incorrect: trigger counselling can wait until acute threats are addressed."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN applies priority-setting to a high-risk change in respiratory reserve.", clinicalPearl: "Speech is a rapid severity assessment.", keyTakeaway: "One-word speech in asthma requires immediate assessment.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0015-b215-4b15-8b15-000000000015", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which finding best shows that acute asthma therapy is working?",
    options: ["Wheeze becomes quieter while breath sounds diminish", "The patient becomes sleepy", "Air entry improves, accessory-muscle use falls, speech improves, and oxygen requirement decreases", "PaCO2 rises while distress worsens"],
    correctAnswer: 2,
    correctAnswerExplanation: "A clinically meaningful response includes better ventilation, reduced work of breathing, improved functional speech, and less oxygen support—not simply a change in wheeze intensity.",
    optionRationales: ["Incorrect: quieter wheeze with poorer air entry can represent worsening obstruction.", "Incorrect: somnolence can signal hypercapnia/fatigue.", "Correct: this is a consistent multidomain improvement trajectory.", "Incorrect: rising PaCO2 with worsening distress is concerning for ventilatory failure."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN evaluates treatment response using integrated physiologic cues.", clinicalPearl: "More air with less effort is improvement.", keyTakeaway: "Judge response by airflow, effort, speech, and oxygen need together.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0016-b216-4b16-8b16-000000000016", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with severe asthma asks about bronchial thermoplasty. Which RN statement best reflects the NHLBI focused update?",
    options: ["It is first-line therapy for every patient with mild asthma", "It replaces inhaled corticosteroids in all patients", "It has no risks and should be done before inhaler technique is assessed", "It is a specialized option with limited indications; the focused update generally recommends against routine use and emphasizes shared decision-making for selected adults"],
    correctAnswer: 3,
    correctAnswerExplanation: "The NHLBI focused update does not recommend bronchial thermoplasty routinely; selected adults may consider it through specialist shared decision-making when potential benefits and risks are carefully weighed.",
    optionRationales: ["Incorrect: it is not first-line therapy for mild asthma.", "Incorrect: it does not universally replace controller medication.", "Incorrect: it has procedure-related risks and does not bypass basic optimization such as adherence and technique.", "Correct: the therapy is specialized and not routinely recommended, with a narrow shared-decision context."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN accurately frames a high-complexity therapy without overselling it.", clinicalPearl: "Specialized asthma procedures come after diagnosis and basic treatment optimization, not before.", keyTakeaway: "Bronchial thermoplasty is not routine asthma therapy.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0017-b217-4b17-8b17-000000000017", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A child using a pressurized metered-dose inhaler cannot coordinate actuation and inhalation. Which RN teaching is best?",
    options: ["Use an age-appropriate spacer/valved holding chamber and verify caregiver return demonstration", "Spray medication into the room", "Stop inhaled treatment until the child is older", "Use cough syrup instead"],
    correctAnswer: 0,
    correctAnswerExplanation: "A spacer or valved holding chamber reduces coordination demands and can improve drug delivery. Caregiver return demonstration confirms technique.",
    optionRationales: ["Correct: device adaptation supports effective age-appropriate inhaled therapy.", "Incorrect: room-air spraying does not deliver a reliable dose.", "Incorrect: treatment should be adapted, not withheld due to developmental limitations.", "Incorrect: cough syrup does not replace controller or rescue asthma therapy."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN matches the delivery system to developmental ability.", clinicalPearl: "Technique is a treatment variable.", keyTakeaway: "Use age-appropriate spacers and caregiver teach-back.", references: [NHLBI_CLINICIAN, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0018-b218-4b18-8b18-000000000018", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which home-monitoring statement by a patient with asthma indicates correct understanding?",
    options: ["I should compare peak flow with my neighbor's value", "I will compare it with my personal best and action-plan zones and consider my symptoms too", "I can ignore symptoms whenever peak flow is measured", "One low value lets me permanently redesign my medication regimen"],
    correctAnswer: 1,
    correctAnswerExplanation: "Peak flow should be interpreted against the patient's personal best and written action plan, together with symptoms and clinical context.",
    optionRationales: ["Incorrect: another person's value is not the individualized reference.", "Correct: personal-best comparison plus symptoms supports appropriate action-plan decisions.", "Incorrect: symptoms remain important even with objective data.", "Incorrect: a single value does not authorize an unsupervised permanent medication change."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN teaches appropriate use of objective home monitoring.", clinicalPearl: "Personal best beats population trivia for home action zones.", keyTakeaway: "Use peak flow with personal best, symptoms, and the action plan.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0019-b219-4b19-8b19-000000000019", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which discharge intervention most directly reduces delay in responding to a future severe asthma flare?",
    options: ["A generic brochure with no individualized instructions", "Advice to avoid all exercise", "A written action plan with medication steps and clear urgent/emergency thresholds", "Instructions to wait for cyanosis before seeking help"],
    correctAnswer: 2,
    correctAnswerExplanation: "A personalized written action plan links symptoms or peak flow to prescribed treatment and escalation thresholds, helping the patient act before severe deterioration.",
    optionRationales: ["Incorrect: generic material is less actionable than individualized instructions.", "Incorrect: controlled asthma should support normal activity rather than blanket avoidance.", "Correct: a written action plan gives concrete steps for worsening control and urgent care.", "Incorrect: cyanosis is a late and dangerous threshold."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN chooses a self-management tool that changes future decisions.", clinicalPearl: "An action plan should tell the patient exactly when home treatment stops being enough.", keyTakeaway: "Discharge with an individualized written asthma action plan.", references: [NHLBI_FOCUSED, NCLEX_RN_2026]
  },
  {
    id: "rn-us-asthma-0020-b220-4b20-8b20-000000000020", tier: "rn", exam: "NCLEX-RN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which patient statement requires correction before discharge after an asthma exacerbation?",
    options: ["I can demonstrate how to use my inhalers", "I know which symptoms require emergency care", "I will follow my written action plan", "I can stop my controller on my own as soon as I feel better"],
    correctAnswer: 3,
    correctAnswerExplanation: "Feeling better often reflects treatment effectiveness. Controller changes should follow the prescribed plan rather than unilateral discontinuation that can allow inflammation and risk to return.",
    optionRationales: ["Incorrect option: return demonstration is appropriate.", "Incorrect option: recognizing emergency symptoms is essential.", "Incorrect option: following the action plan is appropriate.", "Correct: independent controller discontinuation is unsafe and requires teaching."],
    difficulty: 2, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN identifies unsafe self-management among otherwise appropriate discharge behaviours.", clinicalPearl: "Symptom control is not permission to abandon the control plan.", keyTakeaway: "Do not stop controller therapy outside the prescribed plan.", references: [NHLBI_FOCUSED, NHLBI_CLINICIAN, NCLEX_RN_2026]
  }
];

if (rnUsAsthmaNclexBankBatch1.length !== 20) throw new Error(`RN_US_ASTHMA_COUNT_INVALID: ${rnUsAsthmaNclexBankBatch1.length}`);
const answerDistribution = [0, 0, 0, 0];
for (const question of rnUsAsthmaNclexBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== 4) throw new Error(`RN_US_ASTHMA_RATIONALE_INVALID: ${question.id}`);
  if (question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`RN_US_ASTHMA_ANSWER_INVALID: ${question.id}`);
  if (question.difficulty > 4) throw new Error(`RN_US_ASTHMA_DIFFICULTY_INVALID: ${question.id}`);
  if (!question.correctAnswerExplanation.trim() || question.optionRationales.some((r) => !r.trim())) throw new Error(`RN_US_ASTHMA_RATIONALE_MISSING: ${question.id}`);
  answerDistribution[question.correctAnswer] += 1;
}
if (answerDistribution.join(",") !== "5,5,5,5") throw new Error(`RN_US_ASTHMA_ANSWER_BALANCE_INVALID: ${answerDistribution.join(",")}`);
