export type RpnCaCopdCognitiveLevel = "application" | "analysis";
export type RpnCaCopdClientNeeds =
  | "Physiological Adaptation"
  | "Pharmacological and Parenteral Therapies"
  | "Reduction of Risk Potential"
  | "Health Promotion and Maintenance";

export interface RpnCaCopdQuestion {
  id: string;
  tier: "rpn";
  exam: "REX-PN";
  regionScope: "CAN";
  countryCode: "CA";
  licensingBody: "NCSBN";
  bodySystem: "Respiratory";
  topic: "COPD";
  questionType: "multiple_choice";
  stem: string;
  options: [string, string, string, string];
  correctAnswer: number;
  correctAnswerExplanation: string;
  optionRationales: [string, string, string, string];
  difficulty: 2 | 3 | 4;
  cognitiveLevel: RpnCaCopdCognitiveLevel;
  clientNeedsCategory: "Physiological Integrity" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: RpnCaCopdClientNeeds;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const CTS_COPD_2023 = "Canadian Thoracic Society 2023 Guideline on Pharmacotherapy in Patients with Stable COPD";
const ONTARIO_COPD_2023 = "Ontario Health 2023 COPD: Care in the Community for Adults Quality Standard";
const CANADIAN_LUNG_COPD = "Canadian Lung Association COPD management and inhaler education resources";
const REXPN_TEST_PLAN = "REx-PN Test Plan: entry-level practical nursing client-needs framework and item-writing guidance";

export const rpnCaCopdRexpnBankBatch1: RpnCaCopdQuestion[] = [
  {
    id: "ca-copd-0001-6f10-4a11-9b01-000000000001",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A hospitalized patient with COPD becomes increasingly drowsy while the work of breathing remains high. Which action is the priority for the practical nurse?",
    options: ["Escalate immediately and prepare for assessment of possible hypercapnic respiratory failure", "Encourage the patient to sleep because drowsiness is expected", "Remove prescribed oxygen without reassessment", "Delay reassessment until the next routine vital-sign round"],
    correctAnswer: 0,
    correctAnswerExplanation: "New drowsiness during ongoing respiratory distress can signal worsening carbon dioxide retention, fatigue, and acute respiratory failure. The patient needs urgent reassessment and escalation.",
    optionRationales: ["Correct: altered mental status with respiratory distress is a red flag for ventilatory failure.", "Incorrect: new drowsiness is not a benign expected COPD finding during acute deterioration.", "Incorrect: abruptly withholding oxygen from a hypoxemic patient is unsafe; oxygen should be titrated to the ordered target while ventilation is reassessed.", "Incorrect: deterioration requires immediate reassessment, not routine-delay monitoring."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The practical nurse must recognize a change from baseline and prioritize ventilation and neurologic status over routine scheduling.",
    clinicalPearl: "In COPD, new somnolence can be a ventilation problem until proven otherwise.",
    keyTakeaway: "Escalate new confusion or drowsiness during a COPD exacerbation.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0002-6f10-4a11-9b01-000000000002",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD is acutely hypoxemic and is known to be at risk for carbon dioxide retention. Which nursing approach is safest?",
    options: ["Give controlled oxygen to the prescribed target and reassess respiratory status and blood gases when ordered", "Withhold all oxygen because oxygen always stops respiratory drive", "Use the highest possible oxygen concentration indefinitely without reassessment", "Treat dyspnea only with oral fluids"],
    correctAnswer: 0,
    correctAnswerExplanation: "Hypoxemia should be treated. In a patient at risk for hypercapnic respiratory failure, oxygen is controlled and titrated while the team reassesses ventilation and gas exchange.",
    optionRationales: ["Correct: controlled oxygen plus reassessment treats hypoxemia while monitoring for worsening hypercapnia.", "Incorrect: the old 'hypoxic drive' explanation is oversimplified and does not justify leaving a patient hypoxemic.", "Incorrect: excessive unmonitored oxygen can worsen hypercapnia in susceptible patients and should not be continued without reassessment.", "Incorrect: oral fluids do not correct acute hypoxemia."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The correct response balances two risks: untreated hypoxemia and worsening hypercapnia.",
    clinicalPearl: "Do not choose between oxygenation and ventilation; treat oxygenation and reassess ventilation.",
    keyTakeaway: "Controlled oxygen is safer than withholding oxygen in a hypoxemic COPD patient.", references: [CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0003-6f10-4a11-9b01-000000000003",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with a COPD exacerbation has worsening dyspnea despite initial bronchodilator treatment. Which assessment finding most strongly supports urgent blood-gas evaluation?",
    options: ["New confusion and increasing fatigue", "Stable chronic morning cough", "Longstanding barrel-shaped chest", "A smoking history from 20 years ago"],
    correctAnswer: 0,
    correctAnswerExplanation: "New confusion and fatigue can reflect worsening hypercapnia and ventilatory failure and warrant urgent reassessment, including blood-gas analysis when ordered.",
    optionRationales: ["Correct: acute neurologic change and fatigue are deterioration cues.", "Incorrect: a stable chronic cough does not by itself indicate acute ventilatory failure.", "Incorrect: barrel-shaped chest is a chronic structural finding, not an acute deterioration marker.", "Incorrect: smoking history is clinically relevant but does not by itself indicate an immediate blood-gas emergency."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner must distinguish chronic COPD features from acute changes that signal respiratory failure.",
    clinicalPearl: "Change from baseline matters more than the chronic appearance of COPD.",
    keyTakeaway: "Escalate acute mental-status change and fatigue during COPD exacerbation.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0004-6f10-4a11-9b01-000000000004",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with acute-on-chronic hypercapnic respiratory failure has an order to begin non-invasive ventilation. What is the practical nurse's priority?",
    options: ["Prepare the patient, monitor tolerance and respiratory status, and escalate worsening mental status or inability to protect the airway", "Tell the patient non-invasive ventilation is only a comfort device and requires no monitoring", "Give the patient food while the mask is tightly sealed", "Independently increase pressure settings beyond the authorized protocol"],
    correctAnswer: 0,
    correctAnswerExplanation: "Non-invasive ventilation requires close monitoring of respiratory effort, oxygenation, mental status, mask tolerance, and failure signs. The practical nurse implements the ordered therapy within scope and escalates deterioration.",
    optionRationales: ["Correct: monitoring and rapid recognition of NIV failure are essential nursing responsibilities.", "Incorrect: NIV is a ventilatory support therapy and requires active monitoring.", "Incorrect: oral intake with a sealed ventilation mask can increase aspiration risk and should follow the care plan.", "Incorrect: changing ventilator pressure outside an authorized order or protocol exceeds scope and may be unsafe."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The item tests implementation, monitoring, and escalation rather than independent ventilator prescribing.",
    clinicalPearl: "NIV success is judged at the bedside: less work of breathing, improving gas exchange, and preserved airway protection.",
    keyTakeaway: "Monitor closely for NIV response and failure.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0005-6f10-4a11-9b01-000000000005",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD says, 'My tiotropium inhaler should stop sudden severe breathlessness within a minute.' Which response is best?",
    options: ["Tiotropium is a long-acting maintenance bronchodilator; use the prescribed rescue medicine for sudden symptoms", "Yes, tiotropium is the fastest rescue bronchodilator", "Stop all maintenance inhalers whenever you feel well", "Use oxygen instead of all prescribed bronchodilators"],
    correctAnswer: 0,
    correctAnswerExplanation: "Tiotropium is a long-acting muscarinic antagonist used for maintenance therapy. It is not intended to replace a rapid-acting reliever for sudden bronchospasm.",
    optionRationales: ["Correct: the patient must distinguish maintenance from rescue therapy.", "Incorrect: tiotropium is not a rapid rescue inhaler.", "Incorrect: maintenance therapy should not be stopped simply because symptoms improve unless the prescriber changes the plan.", "Incorrect: oxygen treats hypoxemia, not airflow obstruction, and does not replace prescribed bronchodilators."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "Medication teaching is safer when linked to purpose and timing rather than memorized drug classes alone.",
    clinicalPearl: "Maintenance inhaler does not mean rescue inhaler.",
    keyTakeaway: "Teach the role of long-acting maintenance bronchodilators versus rapid relievers.", references: [CTS_COPD_2023, CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0006-6f10-4a11-9b01-000000000006",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient prescribed a long-acting muscarinic antagonist for COPD reports difficulty urinating after starting therapy. What should the practical nurse do?",
    options: ["Recognize urinary retention as a possible anticholinergic effect and report the change", "Reassure the patient that urinary retention proves the drug is working", "Tell the patient to double the dose", "Advise the patient to stop all COPD therapy permanently"],
    correctAnswer: 0,
    correctAnswerExplanation: "Inhaled antimuscarinic agents can contribute to anticholinergic effects such as urinary retention, particularly in susceptible patients. The change should be assessed and communicated.",
    optionRationales: ["Correct: urinary retention is a clinically relevant adverse effect that warrants assessment and reporting.", "Incorrect: urinary retention is not a therapeutic goal.", "Incorrect: increasing the dose can worsen anticholinergic adverse effects and exceeds nursing scope.", "Incorrect: permanent discontinuation of all COPD therapy is not an appropriate independent nursing decision."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The nurse links a new symptom to a plausible medication adverse effect and escalates rather than independently prescribing.",
    clinicalPearl: "Ask about urinary symptoms and glaucoma risk when reviewing antimuscarinic inhalers.",
    keyTakeaway: "Report clinically important anticholinergic adverse effects.", references: [CTS_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0007-6f10-4a11-9b01-000000000007",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient is prescribed a combined LAMA/LABA inhaler for stable COPD. Which explanation is most accurate?",
    options: ["The two long-acting bronchodilator mechanisms can improve maintenance symptom control and reduce airflow limitation", "The combination is an antibiotic treatment for every flare-up", "The inhaler should be used only after respiratory arrest", "The combination replaces smoking cessation and pulmonary rehabilitation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Long-acting muscarinic antagonist and long-acting beta2-agonist combinations provide complementary bronchodilation and are a common maintenance strategy for symptomatic COPD.",
    optionRationales: ["Correct: complementary long-acting bronchodilation is the purpose of the combination.", "Incorrect: LAMA/LABA therapy is not antibacterial treatment.", "Incorrect: maintenance bronchodilators are used routinely as prescribed, not only after respiratory arrest.", "Incorrect: pharmacotherapy complements but does not replace smoking cessation, activity, vaccination, and pulmonary rehabilitation."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The item tests mechanism-linked medication purpose and rejects the false idea that one treatment substitutes for all nonpharmacologic care.",
    clinicalPearl: "COPD care is multimodal: inhalers improve symptoms, but behaviour and rehabilitation still matter.",
    keyTakeaway: "LAMA/LABA combinations are maintenance bronchodilator therapy.", references: [CTS_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0008-6f10-4a11-9b01-000000000008",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD uses an inhaled corticosteroid-containing regimen. Which teaching is appropriate?",
    options: ["Use the inhaler as prescribed, rinse the mouth after corticosteroid doses, and report signs of oral thrush or recurrent pneumonia", "Use the inhaled corticosteroid as the only rescue drug for sudden severe dyspnea", "Stop the inhaler whenever the voice becomes hoarse without discussing it", "Swallow the aerosol instead of inhaling it"],
    correctAnswer: 0,
    correctAnswerExplanation: "Inhaled corticosteroids can contribute to local candidiasis and dysphonia and are associated with pneumonia risk in some COPD patients. Technique and monitoring are important.",
    optionRationales: ["Correct: mouth rinsing, technique, and infection awareness are appropriate safety teaching.", "Incorrect: ICS is not a rapid rescue bronchodilator.", "Incorrect: hoarseness should be assessed; unilateral self-discontinuation can destabilize the treatment plan.", "Incorrect: the prescribed inhaled formulation must be inhaled correctly."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The learner applies medication-safety teaching without assuming every COPD patient should receive ICS.",
    clinicalPearl: "COPD ICS therapy is selective, not universal; once prescribed, teach local steroid safety.",
    keyTakeaway: "Rinse after ICS and monitor for candidiasis and respiratory infection.", references: [CTS_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0009-6f10-4a11-9b01-000000000009",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with a COPD exacerbation is receiving a short course of systemic corticosteroid therapy. Which assessment is especially important for a patient with diabetes?",
    options: ["Monitor blood glucose for steroid-related hyperglycemia", "Expect the corticosteroid to cause immediate severe hypoglycemia in every patient", "Stop diabetes monitoring during corticosteroid therapy", "Increase insulin independently without an order or protocol"],
    correctAnswer: 0,
    correctAnswerExplanation: "Systemic corticosteroids can raise blood glucose. Patients with diabetes may require closer glucose monitoring and treatment adjustment by the authorized prescriber or protocol.",
    optionRationales: ["Correct: hyperglycemia is a predictable steroid risk that should be monitored.", "Incorrect: corticosteroids more commonly raise rather than lower glucose.", "Incorrect: glucose monitoring becomes more important, not less.", "Incorrect: medication adjustment must follow an order or authorized protocol."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The practical nurse anticipates common treatment complications and acts within medication-management scope.",
    clinicalPearl: "A short steroid course can still destabilize glucose.",
    keyTakeaway: "Monitor glucose when systemic steroids are used, especially in diabetes.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0010-6f10-4a11-9b01-000000000010",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient is receiving frequent salbutamol during a COPD exacerbation and develops palpitations. Which additional change may be relevant?",
    options: ["A decrease in serum potassium", "Severe hypercalcemia caused by beta2 stimulation", "A direct major increase in INR", "New bilirubin elevation caused by bronchodilation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Repeated beta2-agonist therapy can cause tachycardia and shift potassium intracellularly, contributing to transient hypokalemia.",
    optionRationales: ["Correct: hypokalemia can accompany intensive beta2-agonist therapy and may increase arrhythmia risk.", "Incorrect: hypercalcemia is not a typical acute salbutamol effect.", "Incorrect: salbutamol does not directly cause a major INR rise.", "Incorrect: bilirubin elevation is not a characteristic direct effect of bronchodilation."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner integrates medication intensity, symptoms, and electrolyte risk.",
    clinicalPearl: "When bronchodilator dosing escalates, monitor both lung response and systemic beta-agonist effects.",
    keyTakeaway: "Intensive salbutamol can contribute to tachycardia and hypokalemia.", references: [CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0011-6f10-4a11-9b01-000000000011",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which change most strongly suggests a COPD flare-up rather than the patient's stable baseline?",
    options: ["A sustained increase in breathlessness with increased cough or sputum over one to two days", "The same morning cough the patient has had for years", "Stable exercise tolerance", "No change in sputum, dyspnea, or activity"],
    correctAnswer: 0,
    correctAnswerExplanation: "A COPD exacerbation is characterized by an acute worsening beyond normal day-to-day variation, often involving increased dyspnea, cough, and/or sputum.",
    optionRationales: ["Correct: a sustained acute worsening in respiratory symptoms is consistent with a flare-up.", "Incorrect: an unchanged chronic symptom is baseline disease, not evidence of acute exacerbation.", "Incorrect: stable exercise tolerance argues against acute worsening.", "Incorrect: no symptom change does not support a flare-up."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Action-plan teaching begins with recognizing a change from the patient's own baseline.",
    clinicalPearl: "COPD exacerbation is a change story, not simply the presence of chronic cough.",
    keyTakeaway: "Teach patients to act on sustained worsening of dyspnea, cough, or sputum.", references: [CANADIAN_LUNG_COPD, ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0012-6f10-4a11-9b01-000000000012",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD continues to smoke cigarettes. Which nursing intervention has the greatest potential to slow ongoing smoking-related lung injury?",
    options: ["Offer evidence-based smoking-cessation support and referral", "Tell the patient inhalers make smoking harmless", "Recommend avoiding all physical activity instead", "Focus only on sputum colour"],
    correctAnswer: 0,
    correctAnswerExplanation: "Smoking cessation is a central disease-modifying intervention for patients whose COPD is related to tobacco exposure. Nursing support can include counselling, medication education, and referral.",
    optionRationales: ["Correct: stopping tobacco exposure reduces continued injury and improves health outcomes.", "Incorrect: inhalers do not neutralize the harms of continued smoking.", "Incorrect: unnecessary inactivity contributes to deconditioning and does not address the exposure causing injury.", "Incorrect: sputum colour alone does not address the major modifiable risk factor."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner selects a high-impact preventive intervention rather than a low-value symptom-only response.",
    clinicalPearl: "Ask, advise, assist, and connect the patient with cessation support without shaming.",
    keyTakeaway: "Smoking cessation is a major modifiable COPD intervention.", references: [ONTARIO_COPD_2023, CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0013-6f10-4a11-9b01-000000000013",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient says the new COPD inhaler 'doesn't work.' What should the practical nurse assess before assuming medication failure?",
    options: ["Adherence and the patient's actual inhaler technique", "Only the brand colour of the device", "Whether the patient can name every receptor subtype", "Whether the patient skipped all follow-up appointments"],
    correctAnswer: 0,
    correctAnswerExplanation: "Incorrect device technique and nonadherence are common reasons inhaled therapy appears ineffective. The nurse should observe technique and assess how the medication is actually being used.",
    optionRationales: ["Correct: actual use determines whether the prescribed dose reaches the lungs.", "Incorrect: device colour does not establish correct use or treatment response.", "Incorrect: receptor memorization is not necessary for safe use and does not evaluate delivery.", "Incorrect: missed follow-up may matter, but technique and adherence directly determine current medication exposure."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The most actionable first assessment is whether the medication is being taken correctly.",
    clinicalPearl: "Watch the patient use the device; do not rely on 'yes' to the question, 'Do you know how?'",
    keyTakeaway: "Assess inhaler technique and adherence before labelling therapy ineffective.", references: [CTS_COPD_2023, CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0014-6f10-4a11-9b01-000000000014",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient is being discharged after hospitalization for a COPD exacerbation. Which planning action is supported by current Ontario COPD quality standards?",
    options: ["Ensure timely post-discharge follow-up is arranged and pulmonary rehabilitation is considered", "Tell the patient follow-up is unnecessary if symptoms improve for one day", "Recommend permanent bed rest", "Stop all maintenance inhalers at discharge"],
    correctAnswer: 0,
    correctAnswerExplanation: "Ontario Health's COPD quality standard emphasizes early follow-up after hospitalization and consideration of pulmonary rehabilitation at discharge.",
    optionRationales: ["Correct: coordinated follow-up and rehabilitation address recovery, recurrence risk, and functional status.", "Incorrect: early symptom improvement does not remove the need for follow-up after a hospitalization.", "Incorrect: prolonged inactivity worsens deconditioning.", "Incorrect: maintenance therapy should be reconciled and continued or adjusted according to the discharge plan, not stopped reflexively."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Discharge planning is part of preventing readmission and restoring function after an exacerbation.",
    clinicalPearl: "COPD recovery continues after the hospital door closes.",
    keyTakeaway: "Arrange early follow-up and consider pulmonary rehabilitation after hospitalization.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0015-6f10-4a11-9b01-000000000015",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD was discharged from hospital yesterday after an acute exacerbation. Which statement about follow-up best reflects the Ontario quality standard?",
    options: ["An in-person follow-up assessment should occur within 7 days after discharge", "Follow-up should be delayed for at least 6 months", "No follow-up is needed after hospitalization", "Only telephone contact after one year is recommended"],
    correctAnswer: 0,
    correctAnswerExplanation: "Ontario Health's COPD quality standard calls for an in-person follow-up assessment within 7 days after hospitalization for an acute exacerbation.",
    optionRationales: ["Correct: early follow-up supports medication reconciliation, symptom review, recovery planning, and recurrence prevention.", "Incorrect: six months is too long after a recent hospitalization.", "Incorrect: hospitalization identifies a high-risk period that requires follow-up.", "Incorrect: one-year telephone-only follow-up does not meet the standard described."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The item tests a concrete Canadian transition-of-care standard relevant to entry-level nursing discharge teaching.",
    clinicalPearl: "The week after discharge is a high-value window for COPD follow-up.",
    keyTakeaway: "Ontario COPD quality standards call for in-person follow-up within 7 days after hospitalization.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0016-6f10-4a11-9b01-000000000016",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A community patient has chronic exertional dyspnea, cough, and a long smoking history but has never had spirometry. Which action is most appropriate?",
    options: ["Support referral for spirometry to confirm or exclude COPD rather than treating the label as established", "Tell the patient symptoms alone permanently confirm COPD", "Begin long-term oxygen solely because the patient is short of breath", "Assume asthma and COPD are identical diseases"],
    correctAnswer: 0,
    correctAnswerExplanation: "Current Ontario COPD quality standards require spirometry to confirm COPD in people who are clinically suspected of having the disease.",
    optionRationales: ["Correct: symptoms and exposure history raise suspicion, but spirometry is needed to confirm airflow obstruction.", "Incorrect: symptoms alone are not sufficient for a definitive COPD diagnosis.", "Incorrect: long-term oxygen is based on documented hypoxemia and clinical assessment, not dyspnea alone.", "Incorrect: asthma and COPD have overlapping symptoms but are distinct conditions with different diagnostic and treatment considerations."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner recognizes diagnostic confirmation without independently diagnosing or ordering beyond scope.",
    clinicalPearl: "COPD is commonly underdiagnosed and also mislabelled; spirometry matters.",
    keyTakeaway: "Suspected COPD should be confirmed with spirometry.", references: [ONTARIO_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0017-6f10-4a11-9b01-000000000017",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A stable patient with COPD asks for long-term home oxygen because walking makes them breathless, but testing has not shown hypoxemia. Which response is best?",
    options: ["Long-term oxygen therapy is based on documented hypoxemia and formal assessment, not breathlessness alone", "Anyone with COPD and dyspnea automatically needs oxygen", "Home oxygen replaces bronchodilators and rehabilitation", "The patient should buy oxygen independently and choose the flow rate"],
    correctAnswer: 0,
    correctAnswerExplanation: "Ontario Health recommends assessment for long-term oxygen therapy in stable COPD when there are clinical indications of hypoxemia. Dyspnea alone is not an indication to self-prescribe oxygen.",
    optionRationales: ["Correct: long-term oxygen requires appropriate assessment and evidence of hypoxemia.", "Incorrect: dyspnea can occur without hypoxemia and does not automatically justify oxygen therapy.", "Incorrect: oxygen does not replace inhaled therapy, exercise conditioning, or rehabilitation.", "Incorrect: oxygen is a prescribed therapy with safety and dose considerations."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The nurse distinguishes symptom burden from an objective indication for long-term oxygen therapy.",
    clinicalPearl: "Oxygen treats hypoxemia; it is not a universal treatment for the sensation of breathlessness.",
    keyTakeaway: "Long-term oxygen requires documented hypoxemia and assessment.", references: [ONTARIO_COPD_2023, CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0018-6f10-4a11-9b01-000000000018",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A 42-year-old with emphysema has minimal smoking exposure and a strong family history of early lung disease. What should the practical nurse recognize?",
    options: ["The pattern should be reported because alpha-1 antitrypsin deficiency may need evaluation", "The pattern proves the patient cannot have COPD", "Young age eliminates the need to investigate inherited risk", "The nurse should independently prescribe augmentation therapy"],
    correctAnswer: 0,
    correctAnswerExplanation: "Early emphysema with little smoking exposure or a suggestive family history can raise concern for alpha-1 antitrypsin deficiency and should prompt appropriate clinician evaluation.",
    optionRationales: ["Correct: the pattern is a clue to a potentially inherited COPD risk factor.", "Incorrect: COPD can occur in younger patients, particularly with genetic or non-tobacco risk factors.", "Incorrect: young age and family history make inherited causes more—not less—important to consider.", "Incorrect: diagnosis and specialized augmentation prescribing are outside practical-nursing authority."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner identifies an atypical pattern and escalates for evaluation without overstepping diagnostic scope.",
    clinicalPearl: "COPD is not always a smoking-only disease.",
    keyTakeaway: "Report early emphysema with minimal tobacco exposure or strong family history for AATD evaluation.", references: [CTS_COPD_2023, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0019-6f10-4a11-9b01-000000000019",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD becomes breathless while walking to the bathroom. Which breathing strategy can the practical nurse coach during recovery?",
    options: ["Pursed-lip breathing with a slower, prolonged exhalation", "Rapid shallow panting", "Repeated breath holding for as long as possible", "Forceful hyperventilation without rest"],
    correctAnswer: 0,
    correctAnswerExplanation: "Pursed-lip breathing can slow exhalation, reduce dynamic airway collapse, and help some patients control dyspnea during activity or recovery.",
    optionRationales: ["Correct: a controlled prolonged exhalation can reduce air trapping and improve breathing efficiency.", "Incorrect: rapid shallow breathing can worsen inefficiency and anxiety.", "Incorrect: prolonged breath holding does not improve airflow obstruction and may worsen distress.", "Incorrect: forceful hyperventilation increases work of breathing and is not an energy-conserving strategy."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse uses a simple nonpharmacologic technique that supports self-management without replacing medical therapy.",
    clinicalPearl: "Exhale longer than you inhale; do not force the air out.",
    keyTakeaway: "Pursed-lip breathing can help manage exertional dyspnea and air trapping.", references: [CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  },
  {
    id: "ca-copd-0020-6f10-4a11-9b01-000000000020",
    tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which discharge statement by a patient recovering from a COPD exacerbation shows the best understanding?",
    options: ["I will follow my COPD action plan and seek help if breathlessness, cough, sputum, oxygen needs, or alertness worsen", "I will stop every maintenance inhaler as soon as I get home", "I will ignore new confusion because it is a normal part of COPD", "I will avoid all follow-up and rehabilitation because the flare-up is over"],
    correctAnswer: 0,
    correctAnswerExplanation: "Safe discharge teaching includes action-plan use, recognition of worsening symptoms and mental-status changes, medication adherence, follow-up, and rehabilitation when appropriate.",
    optionRationales: ["Correct: the statement reflects early recognition and escalation of recurrent deterioration.", "Incorrect: maintenance therapy should follow the discharge medication plan rather than being stopped automatically.", "Incorrect: new confusion can signal hypoxemia, hypercapnia, infection, or other serious deterioration.", "Incorrect: follow-up and rehabilitation are important after hospitalization and can reduce risk and improve function."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The final item integrates symptoms, safety, medication adherence, and transitions of care rather than testing a single isolated fact.",
    clinicalPearl: "A COPD action plan should tell the patient what changed, what to do, and when to call for help.",
    keyTakeaway: "Discharge safety depends on action-plan use, medication adherence, early follow-up, and red-flag recognition.", references: [ONTARIO_COPD_2023, CANADIAN_LUNG_COPD, REXPN_TEST_PLAN]
  }
];

if (rpnCaCopdRexpnBankBatch1.length !== 20) {
  throw new Error(`RPN_CA_COPD_BATCH1_COUNT_INVALID: ${rpnCaCopdRexpnBankBatch1.length}`);
}

for (const question of rpnCaCopdRexpnBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== question.options.length) {
    throw new Error(`RPN_CA_COPD_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
    throw new Error(`RPN_CA_COPD_ANSWER_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.difficulty > 4) {
    throw new Error(`RPN_CA_COPD_DIFFICULTY_INVALID: ${question.id}`);
  }
}
