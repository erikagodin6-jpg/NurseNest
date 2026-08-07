export interface RnCaAsthmaQuestion {
  id: string;
  tier: "rn";
  exam: "NCLEX-RN";
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
  cognitiveLevel: "application" | "analysis";
  clientNeedsCategory: "Physiological Integrity" | "Safe and Effective Care Environment" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: "Physiological Adaptation" | "Pharmacological and Parenteral Therapies" | "Reduction of Risk Potential" | "Management of Care" | "Health Promotion and Maintenance";
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const CTS_ASTHMA = "Canadian Thoracic Society 2021 Guideline update: Diagnosis and management of asthma in preschoolers, children and adults";
const CTS_MILD = "Canadian Thoracic Society 2021 focused update on very mild and mild asthma";
const NCLEX_RN_2026 = "NCSBN 2026 NCLEX-RN Test Plan";

export const rnCaAsthmaNclexBankBatch1: RnCaAsthmaQuestion[] = [
  {
    id: "rn-ca-asthma-0001-a101-4a01-8a01-000000000001", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "An RN is reassessing a patient with severe acute asthma after repeated salbutamol. The patient is increasingly drowsy and breath sounds are now barely audible. Which action has highest priority?",
    options: ["Activate urgent airway/critical-care escalation while continuing ordered resuscitative therapy", "Document improvement because the wheeze is quieter", "Encourage ambulation to mobilize secretions", "Delay reassessment until the next scheduled nebulizer"],
    correctAnswer: 0,
    correctAnswerExplanation: "Drowsiness plus markedly reduced air entry is a pre-arrest pattern that can reflect exhaustion and critically poor ventilation. The RN should escalate immediately while continuing authorized emergency therapy and preparing for advanced airway support.",
    optionRationales: ["Correct: altered consciousness and a nearly silent chest are life-threatening deterioration cues.", "Incorrect: quieter wheeze can mean less airflow rather than improvement.", "Incorrect: ambulation increases oxygen demand and is unsafe in severe respiratory distress.", "Incorrect: this patient requires continuous reassessment and escalation, not routine scheduling."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN integrates mental status and air movement to identify impending ventilatory failure.", clinicalPearl: "The most dangerous asthmatic may be the quietest one.", keyTakeaway: "Silent chest plus drowsiness requires immediate airway escalation.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0002-a102-4a02-8a02-000000000002", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with severe asthma remains tachypneic. The PaCO2 changes from 28 mmHg to 42 mmHg over one hour. Which interpretation is most accurate?",
    options: ["The patient has definitely recovered because 42 mmHg is within many laboratory reference ranges", "The rising PaCO2 may indicate respiratory muscle fatigue and failing ventilation", "The trend proves metabolic alkalosis", "The change is expected evidence that salbutamol has cured the bronchospasm"],
    correctAnswer: 1,
    correctAnswerExplanation: "A severely distressed asthmatic often has hypocapnia from hyperventilation. A rising or normalizing PaCO2 while severe distress persists can signal loss of ventilatory reserve and impending respiratory failure.",
    optionRationales: ["Incorrect: a 'normal' number can be abnormal in context when the patient should still be hyperventilating.", "Correct: the trend suggests worsening ventilation and requires urgent escalation.", "Incorrect: PaCO2 alone does not establish metabolic alkalosis.", "Incorrect: bronchodilator response is assessed by improving airflow, work of breathing, oxygenation, and overall status—not by a rising PaCO2."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "Trend interpretation is more important than reference-range memorization.", clinicalPearl: "Normal PaCO2 can be ominous in a patient who is still fighting to breathe.", keyTakeaway: "Rising PaCO2 during persistent severe asthma is a fatigue warning.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0003-a103-4a03-8a03-000000000003", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with severe acute asthma has persistent bronchospasm despite repeated inhaled salbutamol and ipratropium plus systemic corticosteroid. The provider orders IV magnesium sulfate. What should the RN recognize about this therapy?",
    options: ["It is a routine daily controller for all stable asthma", "It replaces oxygen when the patient is hypoxemic", "It can provide additional smooth-muscle relaxation in selected severe exacerbations", "It is an antibiotic for occult pneumonia"],
    correctAnswer: 2,
    correctAnswerExplanation: "IV magnesium sulfate may be used as an adjunct in selected severe asthma exacerbations that respond inadequately to initial therapy because it can promote bronchodilation.",
    optionRationales: ["Incorrect: IV magnesium is not routine maintenance therapy for stable asthma.", "Incorrect: bronchodilation does not replace supplemental oxygen for hypoxemia.", "Correct: magnesium may be used as an adjunct in severe refractory bronchospasm.", "Incorrect: magnesium has no antibacterial role in asthma."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies", clinicalReasoning: "The RN links an escalation medication to its role without treating it as first-line or definitive therapy.", clinicalPearl: "Magnesium is an adjunct when severe bronchospasm is not responding—not a substitute for the core asthma treatments.", keyTakeaway: "IV magnesium may augment bronchodilation in selected severe exacerbations.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0004-a104-4a04-8a04-000000000004", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient receiving continuous high-dose salbutamol develops palpitations and ventricular ectopy. Which laboratory result should the RN prioritize reviewing?",
    options: ["Serum bilirubin", "Serum calcium", "INR", "Serum potassium"],
    correctAnswer: 3,
    correctAnswerExplanation: "Intensive beta2-agonist therapy can shift potassium into cells and cause hypokalemia, which may contribute to dysrhythmia risk in a patient already experiencing palpitations or ectopy.",
    optionRationales: ["Incorrect: bilirubin is not the characteristic electrolyte concern from beta2-agonist therapy.", "Incorrect: acute hypercalcemia is not the expected beta2-agonist effect.", "Incorrect: salbutamol does not directly cause a major INR elevation.", "Correct: potassium may fall during intensive beta2-agonist therapy and should be assessed when dysrhythmia develops."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The RN connects treatment intensity to an adverse physiologic effect that can amplify cardiac risk.", clinicalPearl: "When salbutamol becomes continuous, electrolyte monitoring matters more.", keyTakeaway: "Check potassium when intensive beta2-agonist therapy and dysrhythmia coexist.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0005-a105-4a05-8a05-000000000005", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which finding best demonstrates meaningful improvement after treatment of an acute asthma exacerbation?",
    options: ["The patient speaks in full sentences with improved bilateral air entry and less accessory-muscle use", "The wheeze becomes quieter while air entry falls", "The patient becomes sleepy", "The oxygen requirement rises while SpO2 stays unchanged"],
    correctAnswer: 0,
    correctAnswerExplanation: "Improvement should be multidimensional: better airflow, easier speech, reduced work of breathing, and stable or improving oxygenation/support needs.",
    optionRationales: ["Correct: these findings together show improved ventilation and reduced distress.", "Incorrect: less wheeze with poorer air movement can indicate worsening obstruction.", "Incorrect: new somnolence is a respiratory-failure warning.", "Incorrect: rising oxygen requirement signals worsening gas exchange even if saturation is temporarily maintained."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN evaluates the total response instead of a single auscultatory cue.", clinicalPearl: "Improvement means the patient moves more air with less effort.", keyTakeaway: "Judge asthma response by airflow, speech, work of breathing, and oxygen support together.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0006-a106-4a06-8a06-000000000006", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A Canadian adult with very mild asthma asks why the prescriber offered PRN budesonide/formoterol rather than salbutamol alone. Which RN response is best?",
    options: ["It is never an evidence-based Canadian option", "For selected patients age 12 and older, current CTS guidance includes PRN budesonide/formoterol as one evidence-based option that also delivers anti-inflammatory therapy", "It is an antibiotic combination", "It should be used continuously regardless of the prescription"],
    correctAnswer: 1,
    correctAnswerExplanation: "The current CTS focused update includes PRN budesonide/formoterol among evidence-based options for selected patients age 12 years and older with very mild or mild asthma, depending on control, risk, adherence, and patient preference.",
    optionRationales: ["Incorrect: CTS specifically recognizes this strategy in selected patients.", "Correct: the combination provides rapid formoterol bronchodilation with inhaled corticosteroid exposure.", "Incorrect: neither budesonide nor formoterol is an antibiotic.", "Incorrect: dosing should follow the individualized prescription and action plan."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN teaches current Canadian treatment rather than defaulting to older SABA-only assumptions.", clinicalPearl: "Modern asthma reliever strategies may include anti-inflammatory treatment in the same inhaler.", keyTakeaway: "Recognize PRN budesonide/formoterol as a current Canadian option for selected patients age 12+.", references: [CTS_MILD, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0007-a107-4a07-8a07-000000000007", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient reports using salbutamol several times every day despite a prescribed controller. What is the RN's best first action?",
    options: ["Tell the patient to double all medication doses independently", "Assume this is normal if salbutamol relieves symptoms", "Assess symptom pattern, adherence, inhaler technique, triggers, and exacerbation risk, then communicate loss of control", "Tell the patient to stop all inhalers for one week"],
    correctAnswer: 2,
    correctAnswerExplanation: "Frequent reliever use can signal poor control and increased exacerbation risk. The RN should assess modifiable causes and severity before collaborating on treatment-plan reassessment.",
    optionRationales: ["Incorrect: unsupervised dose changes may be unsafe and exceed the nursing role.", "Incorrect: frequent reliever dependence is a warning sign, not proof of adequate control.", "Correct: assessment of adherence, technique, triggers, symptoms, and risk provides clinically useful information for plan adjustment.", "Incorrect: stopping all therapy can worsen airway inflammation and control."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN converts a medication-use pattern into a structured control assessment and appropriate collaboration.", clinicalPearl: "Count reliever use as a vital sign of asthma control.", keyTakeaway: "Frequent reliever use warrants structured reassessment and escalation of the control plan.", references: [CTS_MILD, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0008-a108-4a08-8a08-000000000008", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "An RN is preparing a patient with status asthmaticus for possible intubation. Which change most strongly supports that escalation?",
    options: ["Mild tremor with improving air entry", "Peak flow improving after therapy", "The patient asks for water", "Progressive exhaustion, altered consciousness, and worsening hypercapnia despite maximal initial therapy"],
    correctAnswer: 3,
    correctAnswerExplanation: "Progressive fatigue, neurologic decline, and worsening ventilation despite aggressive treatment indicate failure of medical therapy and impending respiratory arrest, making advanced airway preparation appropriate.",
    optionRationales: ["Incorrect: mild tremor is a common beta2-agonist effect and improving airflow is reassuring.", "Incorrect: improving peak flow suggests response.", "Incorrect: requesting water does not establish ventilatory failure.", "Correct: exhaustion, altered consciousness, and worsening hypercapnia are classic signs that noninvasive management is failing."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN recognizes when the trajectory has crossed from severe asthma into failing ventilation.", clinicalPearl: "Do not wait for apnea to prepare the airway.", keyTakeaway: "Escalate for intubation before respiratory arrest when exhaustion and hypercapnia progress despite therapy.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0009-a109-4a09-8a09-000000000009", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient taking an inhaled corticosteroid develops white oral plaques and hoarseness. Which teaching is most appropriate?",
    options: ["Review inhaler/spacer technique, reinforce mouth rinsing after doses, and report suspected oral candidiasis", "Use the corticosteroid as the first treatment for sudden severe bronchospasm", "Swallow the aerosol to reduce local effects", "Stop every asthma medication permanently"],
    correctAnswer: 0,
    correctAnswerExplanation: "Oral candidiasis and dysphonia are local ICS effects. Technique optimization, spacer use when appropriate, mouth rinsing, and evaluation of candidiasis reduce harm without abandoning needed anti-inflammatory therapy.",
    optionRationales: ["Correct: this addresses both prevention and the current adverse effect.", "Incorrect: ICS does not provide the rapid bronchodilation needed for a severe acute attack.", "Incorrect: inhaled therapy must be inhaled correctly; swallowing it does not solve the problem.", "Incorrect: permanent cessation of all therapy is unsafe and unnecessary."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies", clinicalReasoning: "The RN distinguishes a manageable local steroid adverse effect from an indication to abandon controller therapy.", clinicalPearl: "Rinse, technique, and spacer review prevent many ICS mouth problems.", keyTakeaway: "Manage ICS local effects without confusing controller therapy with rescue therapy.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0010-a110-4a10-8a10-000000000010", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which finding best indicates that an asthma action plan needs urgent revision?",
    options: ["No nocturnal symptoms and full activity", "Two emergency visits in three months despite reported medication use", "Correct inhaler technique", "No reliever use for several weeks"],
    correctAnswer: 1,
    correctAnswerExplanation: "Repeated emergency utilization indicates poor control or high exacerbation risk and warrants a structured reassessment of diagnosis, adherence, technique, triggers, comorbidity, and treatment intensity.",
    optionRationales: ["Incorrect: absence of symptoms and normal activity indicate good control.", "Correct: recurrent emergency care is a high-risk pattern that requires reassessment and plan revision.", "Incorrect: correct technique is protective, although it should still be periodically rechecked.", "Incorrect: no reliever use with good control is generally reassuring."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN identifies outcome-based evidence that the current plan is not preventing high-risk events.", clinicalPearl: "Exacerbation history can matter more than today's symptom score.", keyTakeaway: "Repeated ED visits mean the asthma risk plan is failing.", references: [CTS_ASTHMA, CTS_MILD, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0011-a111-4a11-8a11-000000000011", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with asthma has sudden pleuritic chest pain, acute dyspnea, and markedly reduced breath sounds on one side. Which complication should the RN suspect first?",
    options: ["Oral candidiasis", "GERD", "Pneumothorax", "Sinusitis"],
    correctAnswer: 2,
    correctAnswerExplanation: "Sudden unilateral pleuritic pain, dyspnea, and unilateral reduced breath sounds are concerning for pneumothorax and require urgent evaluation.",
    optionRationales: ["Incorrect: oral candidiasis causes local mouth/throat findings, not abrupt unilateral respiratory collapse.", "Incorrect: reflux does not explain unilateral breath-sound loss.", "Correct: the sudden unilateral pattern is classic for pneumothorax.", "Incorrect: sinusitis does not cause acute unilateral loss of breath sounds."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN avoids attributing every new respiratory symptom to asthma itself.", clinicalPearl: "A new unilateral chest finding is a complication clue, not just 'more asthma.'", keyTakeaway: "Sudden unilateral pain and reduced breath sounds require pneumothorax evaluation.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0012-a112-4a12-8a12-000000000012", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A pregnant patient with asthma says, 'I stopped my controller because I was afraid the medication would harm the fetus.' What is the RN's best response?",
    options: ["Uncontrolled asthma is harmless during pregnancy", "All inhaled medications are contraindicated in pregnancy", "Restart every medication at double dose without review", "Explain that maintaining asthma control is important for maternal/fetal oxygenation and arrange prompt review of the prescribed regimen"],
    correctAnswer: 3,
    correctAnswerExplanation: "Poorly controlled asthma can threaten maternal and fetal oxygenation. The RN should address medication fears, reinforce adherence to an appropriate prescribed regimen, and facilitate timely clinician review rather than endorsing untreated disease or independent dose changes.",
    optionRationales: ["Incorrect: uncontrolled asthma can cause serious maternal and fetal complications.", "Incorrect: asthma medications are individualized; inhaled therapies are not categorically contraindicated.", "Incorrect: independent dose doubling is unsafe.", "Correct: preserving control and reviewing the regimen supports both maternal and fetal safety."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN balances medication-risk perception against the real physiologic risk of uncontrolled disease.", clinicalPearl: "In pregnancy, hypoxemia is a medication-safety issue too.", keyTakeaway: "Do not let fear-driven controller discontinuation create maternal/fetal hypoxemia.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0013-a113-4a13-8a13-000000000013", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A child with asthma cannot coordinate a pressurized metered-dose inhaler. Which RN intervention is best?",
    options: ["Select an age-appropriate spacer/valved holding chamber interface and verify caregiver return demonstration", "Spray medication into the room", "Delay treatment until adult coordination develops", "Replace prescribed inhalers with cough syrup"],
    correctAnswer: 0,
    correctAnswerExplanation: "A spacer or valved holding chamber with an age-appropriate mask when needed improves drug delivery when coordination is limited. Caregiver return demonstration verifies safe home technique.",
    optionRationales: ["Correct: delivery should be adapted to developmental ability.", "Incorrect: medication dispersed into room air does not provide a reliable therapeutic dose.", "Incorrect: needed asthma treatment should not be withheld because of age-related coordination limits.", "Incorrect: cough syrup does not replace prescribed controller or reliever therapy."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN matches device technology and teaching to developmental needs.", clinicalPearl: "A device problem can masquerade as medication failure.", keyTakeaway: "Use age-appropriate delivery devices and caregiver teach-back.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0014-a114-4a14-8a14-000000000014", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which patient should the RN assess first?",
    options: ["A patient asking how to clean a spacer", "A patient with asthma whose speech has decreased from full sentences to one-word answers", "A patient with mild tremor after one salbutamol dose", "A stable patient requesting a written action plan"],
    correctAnswer: 1,
    correctAnswerExplanation: "Progression to one-word speech indicates severe breathlessness and worsening respiratory compromise. This patient requires immediate assessment before stable education needs or expected medication effects.",
    optionRationales: ["Incorrect: spacer teaching is important but nonurgent.", "Correct: impaired speech is a severity cue and may precede respiratory failure.", "Incorrect: mild tremor is a common beta2-agonist effect if the patient is otherwise stable.", "Incorrect: action-plan teaching is important but can wait until acute threats are addressed."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN applies priority-setting to a concrete respiratory deterioration cue.", clinicalPearl: "Speech is a fast bedside measure of respiratory reserve.", keyTakeaway: "One-word speech in asthma is an urgent severity finding.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0015-a115-4a15-8a15-000000000015", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "The RN is reviewing a home peak-flow plan. Which teaching is most appropriate?",
    options: ["Use another patient's peak flow as the target", "Ignore symptoms whenever a number is available", "Compare readings with the patient's personal best and written action-plan zones while also assessing symptoms", "Permanently change the medication regimen after one isolated low value outside the action plan"],
    correctAnswer: 2,
    correctAnswerExplanation: "Peak expiratory flow is most useful when interpreted against the individual's personal best and integrated with symptoms and the written action plan.",
    optionRationales: ["Incorrect: another person's value is not an individualized reference.", "Incorrect: symptoms remain clinically important even when peak-flow data are available.", "Correct: personal-best comparison plus symptom assessment supports safe action-plan decisions.", "Incorrect: one isolated value should not be used to invent an unsupervised permanent regimen change."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN teaches objective self-monitoring without allowing one number to replace clinical context.", clinicalPearl: "Peak flow is a trend tool, not a substitute for the patient in front of you.", keyTakeaway: "Use personal best + symptoms + action plan together.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0016-a116-4a16-8a16-000000000016", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with poorly controlled asthma is being considered for treatment escalation. Which RN assessment is most important before assuming the current controller has failed?",
    options: ["Whether the inhaler matches the patient's favorite colour", "Whether the patient can name every cytokine in asthma", "Whether the patient owns a pulse oximeter", "Actual adherence and observed inhaler technique"],
    correctAnswer: 3,
    correctAnswerExplanation: "Poor adherence and incorrect technique are common, reversible causes of apparent treatment failure. They should be assessed before unnecessary escalation.",
    optionRationales: ["Incorrect: preference can affect adherence but colour alone does not establish drug delivery.", "Incorrect: cytokine memorization does not evaluate treatment effectiveness.", "Incorrect: a home oximeter does not determine whether controller medication reaches the airway.", "Correct: adherence and technique directly determine medication exposure and are high-value assessments before step-up therapy."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Management of Care", clinicalReasoning: "The RN checks modifiable implementation failures before labelling the pharmacologic strategy inadequate.", clinicalPearl: "Watch the inhaler before escalating the inhaler.", keyTakeaway: "Confirm adherence and technique before treatment step-up.", references: [CTS_ASTHMA, CTS_MILD, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0017-a117-4a17-8a17-000000000017", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient with acute asthma is receiving oxygen, repeated bronchodilators, and systemic corticosteroid. Which trend best supports de-escalation rather than escalation?",
    options: ["Improving air entry, decreasing work of breathing, stable mentation, and lower oxygen requirement", "Rising PaCO2 with increasing drowsiness", "Progressive one-word speech", "A newly silent chest"],
    correctAnswer: 0,
    correctAnswerExplanation: "De-escalation requires a consistent improvement trajectory across ventilation, effort, neurologic status, and oxygen support needs.",
    optionRationales: ["Correct: all major severity domains are improving.", "Incorrect: rising PaCO2 and drowsiness suggest failing ventilation.", "Incorrect: worsening speech tolerance indicates deterioration.", "Incorrect: a silent chest can represent critically poor airflow."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The RN makes trajectory-based decisions rather than relying on one isolated sign.", clinicalPearl: "De-escalation is earned by a sustained trend, not one reassuring number.", keyTakeaway: "Require multidomain improvement before de-escalating acute asthma care.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0018-a118-4a18-8a18-000000000018", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "A patient asks why smoking and vaping exposure matter when medication is already prescribed. Which response is best?",
    options: ["Medication makes inhaled irritants harmless", "Smoke and vaping aerosols can worsen airway inflammation and symptoms, so exposure reduction remains part of asthma control", "Only cigarette smoke matters; vaping aerosol cannot irritate airways", "Exposure reduction replaces controller therapy"],
    correctAnswer: 1,
    correctAnswerExplanation: "Inhaled irritants can worsen symptoms and control. Trigger reduction complements—not replaces—appropriate pharmacologic therapy.",
    optionRationales: ["Incorrect: medication does not eliminate the airway effects of irritant exposure.", "Correct: reducing relevant inhaled irritants is part of comprehensive asthma management.", "Incorrect: vaping aerosols can irritate airways and may worsen symptoms.", "Incorrect: environmental control and controller medication address different components of risk."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN links environmental risk reduction to the ongoing disease process.", clinicalPearl: "Ask about vaping as routinely as smoking.", keyTakeaway: "Reduce smoke/vape exposure while maintaining prescribed controller therapy.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0019-a119-4a19-8a19-000000000019", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which discharge element most directly reduces the risk that a patient will mismanage the next asthma flare?",
    options: ["A generic brochure without medication names", "A request to avoid all physical activity", "A written action plan linked to symptoms/peak flow, medication steps, and clear urgent-care thresholds", "A promise to return only if cyanosis develops"],
    correctAnswer: 2,
    correctAnswerExplanation: "A specific written action plan helps patients recognize deterioration, use prescribed therapies correctly, and know when home management is no longer sufficient.",
    optionRationales: ["Incorrect: generic material without the patient's regimen is less actionable.", "Incorrect: well-controlled asthma should support activity rather than blanket avoidance.", "Correct: a personalized action plan translates assessment cues into concrete actions and escalation thresholds.", "Incorrect: waiting for cyanosis may delay care until severe deterioration."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN prioritizes a tool that directly supports safe self-management and timely escalation.", clinicalPearl: "An action plan should tell the patient what to do, not merely what asthma is.", keyTakeaway: "Discharge with a personalized written asthma action plan.", references: [CTS_ASTHMA, NCLEX_RN_2026]
  },
  {
    id: "rn-ca-asthma-0020-a120-4a20-8a20-000000000020", tier: "rn", exam: "NCLEX-RN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Asthma", questionType: "multiple_choice",
    stem: "Which patient statement requires the RN to intervene before discharge after an asthma exacerbation?",
    options: ["I will show you how I use each inhaler", "I know which symptoms mean I need urgent care", "I will follow the written action plan", "Once I feel better, I can stop my controller whenever I want without discussing the plan"],
    correctAnswer: 3,
    correctAnswerExplanation: "Stopping controller therapy without following the treatment plan can allow airway inflammation and poor control to recur. The RN should clarify adherence and how medication changes should be made.",
    optionRationales: ["Incorrect option: return demonstration is appropriate and should be encouraged.", "Incorrect option: recognizing urgent symptoms is essential discharge knowledge.", "Incorrect option: following the written action plan is appropriate.", "Correct: unilateral controller discontinuation is unsafe and requires correction."],
    difficulty: 2, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The RN identifies unsafe self-management embedded among appropriate discharge behaviours.", clinicalPearl: "Feeling better often means the controller is working, not that it is unnecessary.", keyTakeaway: "Do not stop controller therapy outside the prescribed plan.", references: [CTS_ASTHMA, CTS_MILD, NCLEX_RN_2026]
  }
];

if (rnCaAsthmaNclexBankBatch1.length !== 20) throw new Error(`RN_CA_ASTHMA_COUNT_INVALID: ${rnCaAsthmaNclexBankBatch1.length}`);
const answerDistribution = [0, 0, 0, 0];
for (const question of rnCaAsthmaNclexBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== 4) throw new Error(`RN_CA_ASTHMA_RATIONALE_INVALID: ${question.id}`);
  if (question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`RN_CA_ASTHMA_ANSWER_INVALID: ${question.id}`);
  if (question.difficulty > 4) throw new Error(`RN_CA_ASTHMA_DIFFICULTY_INVALID: ${question.id}`);
  if (!question.correctAnswerExplanation.trim() || question.optionRationales.some((r) => !r.trim())) throw new Error(`RN_CA_ASTHMA_RATIONALE_MISSING: ${question.id}`);
  answerDistribution[question.correctAnswer] += 1;
}
if (answerDistribution.join(",") !== "5,5,5,5") throw new Error(`RN_CA_ASTHMA_ANSWER_BALANCE_INVALID: ${answerDistribution.join(",")}`);
