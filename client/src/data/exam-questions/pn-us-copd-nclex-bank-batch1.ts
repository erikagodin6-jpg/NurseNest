export type PnUsCopdCognitiveLevel = "application" | "analysis";
export type PnUsCopdClientNeeds = "Physiological Adaptation" | "Pharmacological Therapies" | "Reduction of Risk Potential" | "Health Promotion and Maintenance";

export interface PnUsCopdQuestion {
  id: string;
  servingTier: "rpn";
  pathway: "US-PN";
  exam: "NCLEX-PN";
  regionScope: "US";
  countryCode: "US";
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
  cognitiveLevel: PnUsCopdCognitiveLevel;
  clientNeedsCategory: "Physiological Integrity" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: PnUsCopdClientNeeds;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const GOLD_2026 = "Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2026 Report and Pocket Guide";
const GOLD_SPIROMETRY = "GOLD Spirometry Quick Guide and 2026 GOLD/GLI diagnostic statement";
const NCLEX_PN_2026 = "NCSBN 2026 NCLEX-PN Test Plan";

export const pnUsCopdNclexBankBatch1: PnUsCopdQuestion[] = [
  {
    id: "us-copd-0001-7a20-4b21-9c11-000000000001",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "An LPN/VN is caring for a patient hospitalized with a COPD exacerbation. Which new finding requires immediate escalation?",
    options: ["Increasing somnolence with shallow respirations", "A chronic productive morning cough", "Longstanding clubbing documented for years", "Stable dyspnea at the patient's usual baseline"],
    correctAnswer: 0,
    correctAnswerExplanation: "Increasing somnolence with shallow breathing can indicate worsening hypercapnia, fatigue, and acute ventilatory failure and requires urgent reassessment.",
    optionRationales: ["Correct: acute mental-status and ventilation changes are red flags for respiratory failure.", "Incorrect: an unchanged chronic cough is not the most urgent new finding.", "Incorrect: a longstanding documented finding is less urgent than acute neurologic and respiratory deterioration.", "Incorrect: stable baseline dyspnea does not indicate an acute emergency."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "NCLEX clinical judgment prioritizes acute changes from baseline that threaten ventilation.",
    clinicalPearl: "In COPD, a sleepy patient may be retaining CO2.", keyTakeaway: "Escalate new somnolence or shallow breathing during a COPD exacerbation.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0002-7a20-4b21-9c11-000000000002",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD is hypoxemic and at risk for hypercapnic respiratory failure. Which action is safest?",
    options: ["Administer controlled oxygen to the ordered target and reassess ventilation and gas exchange", "Withhold oxygen because all COPD patients lose respiratory drive when oxygen is given", "Give maximum oxygen indefinitely without reassessment", "Treat the hypoxemia by asking the patient to drink water"],
    correctAnswer: 0,
    correctAnswerExplanation: "Hypoxemia should be treated. In susceptible COPD patients, oxygen is titrated and the patient's ventilation and blood gases are reassessed rather than withholding oxygen or giving excessive unmonitored oxygen.",
    optionRationales: ["Correct: controlled oxygen plus reassessment balances oxygenation and hypercapnia risk.", "Incorrect: the 'hypoxic drive' explanation is oversimplified and does not justify untreated hypoxemia.", "Incorrect: uncontrolled high oxygen can worsen hypercapnia in some patients and should not be continued without reassessment.", "Incorrect: oral fluids do not correct acute hypoxemia."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The nurse must avoid both undertreating hypoxemia and failing to monitor ventilation.",
    clinicalPearl: "Give needed oxygen, then reassess the whole respiratory picture.", keyTakeaway: "Do not withhold oxygen from a hypoxemic COPD patient; titrate and reassess.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0003-7a20-4b21-9c11-000000000003",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with suspected COPD asks what test confirms persistent airflow obstruction. Which response is best?",
    options: ["Post-bronchodilator spirometry", "A single pulse-oximetry reading", "A sputum culture alone", "A chest x-ray alone"],
    correctAnswer: 0,
    correctAnswerExplanation: "GOLD identifies spirometry as essential to confirm COPD, with persistent post-bronchodilator airflow obstruction used in the diagnosis.",
    optionRationales: ["Correct: spirometry objectively demonstrates persistent airflow obstruction.", "Incorrect: oxygen saturation measures oxygenation, not the presence of fixed airflow obstruction.", "Incorrect: sputum culture may identify infection but does not diagnose COPD.", "Incorrect: imaging may show supportive findings or alternate disease but does not replace spirometric confirmation."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner distinguishes diagnostic confirmation from supportive or complication-focused tests.",
    clinicalPearl: "Symptoms suggest COPD; spirometry confirms airflow obstruction.", keyTakeaway: "COPD requires spirometric confirmation.", references: [GOLD_SPIROMETRY, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0004-7a20-4b21-9c11-000000000004",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which spirometry result is consistent with the GOLD criterion for persistent airflow obstruction in COPD?",
    options: ["Post-bronchodilator FEV1/FVC below 0.70", "Post-bronchodilator FEV1/FVC above 0.95 in every patient", "Normal spirometry with no symptoms or exposure history", "A low oxygen saturation without spirometry"],
    correctAnswer: 0,
    correctAnswerExplanation: "GOLD's quick guide uses a post-bronchodilator FEV1/FVC ratio below 0.70 as the spirometric criterion for persistent airflow obstruction, interpreted in the appropriate clinical context.",
    optionRationales: ["Correct: this is the GOLD spirometric criterion described in the current quick guide.", "Incorrect: a very high ratio does not demonstrate persistent obstructive airflow limitation.", "Incorrect: normal spirometry does not meet the stated spirometric criterion for COPD.", "Incorrect: hypoxemia can occur in many conditions and does not substitute for spirometry."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The item tests a current diagnostic threshold while preserving the need for clinical context.",
    clinicalPearl: "Do not diagnose COPD from symptoms or imaging alone when spirometry is available.", keyTakeaway: "Post-bronchodilator FEV1/FVC below 0.70 supports persistent airflow obstruction.", references: [GOLD_SPIROMETRY, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0005-7a20-4b21-9c11-000000000005",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient says, 'My tiotropium inhaler is what I use for sudden severe shortness of breath.' Which response should the LPN/VN make?",
    options: ["Tiotropium is long-acting maintenance therapy; use the prescribed rescue bronchodilator for sudden symptoms", "Correct, tiotropium is always the fastest rescue medication", "Stop tiotropium whenever symptoms are controlled for a day", "Use home oxygen instead of all bronchodilator therapy"],
    correctAnswer: 0,
    correctAnswerExplanation: "Tiotropium is a long-acting muscarinic antagonist used for maintenance COPD treatment, not rapid rescue of acute bronchospasm.",
    optionRationales: ["Correct: the patient needs to distinguish maintenance from rescue medication.", "Incorrect: tiotropium is not intended as the fastest rescue bronchodilator.", "Incorrect: maintenance medication should be taken according to the treatment plan, not stopped day to day without direction.", "Incorrect: oxygen treats hypoxemia and does not replace bronchodilator treatment for airflow obstruction."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "Medication purpose and timing are central to safe self-management.",
    clinicalPearl: "Maintenance inhalers prevent and control; rescue inhalers act quickly during symptoms.", keyTakeaway: "Teach tiotropium as maintenance therapy.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0006-7a20-4b21-9c11-000000000006",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient prescribed an inhaled LAMA reports new urinary retention. What should the LPN/VN do?",
    options: ["Assess and report a possible anticholinergic adverse effect", "Tell the patient this proves the drug is effective", "Double the dose independently", "Advise permanent discontinuation of all COPD therapy"],
    correctAnswer: 0,
    correctAnswerExplanation: "Long-acting muscarinic antagonists can cause or worsen anticholinergic effects such as urinary retention in susceptible patients.",
    optionRationales: ["Correct: new urinary retention warrants assessment and communication to the prescribing team.", "Incorrect: urinary retention is an adverse effect, not a therapeutic endpoint.", "Incorrect: independent dose escalation is unsafe and outside LPN/VN scope.", "Incorrect: stopping all COPD therapy is not an appropriate independent response."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The nurse recognizes a drug-class adverse effect and responds within scope.",
    clinicalPearl: "Antimuscarinic inhalers can still produce clinically relevant systemic anticholinergic effects.", keyTakeaway: "Report urinary retention or other significant anticholinergic effects.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0007-7a20-4b21-9c11-000000000007",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient is prescribed a LAMA/LABA combination inhaler for stable COPD. Which teaching is accurate?",
    options: ["It provides complementary long-acting bronchodilation for maintenance symptom control", "It is an antibiotic used only during bacterial pneumonia", "It should be saved until respiratory arrest", "It makes smoking cessation and pulmonary rehabilitation unnecessary"],
    correctAnswer: 0,
    correctAnswerExplanation: "Dual long-acting bronchodilation is a maintenance strategy that can improve symptoms and airflow in COPD patients who need more than one bronchodilator mechanism.",
    optionRationales: ["Correct: LAMA and LABA mechanisms provide complementary maintenance bronchodilation.", "Incorrect: these inhalers are not antimicrobial therapy.", "Incorrect: they are maintenance medications, not last-minute resuscitation drugs.", "Incorrect: pharmacotherapy complements rather than replaces nonpharmacologic COPD care."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "The learner identifies treatment purpose and avoids false substitution between pharmacologic and rehabilitative care.",
    clinicalPearl: "Two maintenance bronchodilators can work by different receptors toward the same airflow goal.", keyTakeaway: "LAMA/LABA is maintenance bronchodilation, not rescue or antibiotic therapy.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0008-7a20-4b21-9c11-000000000008",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD has an inhaled corticosteroid-containing regimen. Which teaching should the LPN/VN include?",
    options: ["Rinse the mouth after corticosteroid doses and report oral thrush or recurrent respiratory infection", "Use the corticosteroid as the only rescue drug for sudden severe dyspnea", "Stop the drug independently after one hoarse day", "Swallow the inhaled dose instead of inhaling it"],
    correctAnswer: 0,
    correctAnswerExplanation: "Inhaled corticosteroids can cause local candidiasis and dysphonia and may increase pneumonia risk in some COPD patients. Proper technique and monitoring are important.",
    optionRationales: ["Correct: mouth rinsing and infection monitoring address clinically relevant ICS risks.", "Incorrect: ICS is not a rapid rescue bronchodilator.", "Incorrect: hoarseness should be evaluated rather than prompting unsupervised discontinuation.", "Incorrect: inhaled formulations must be inhaled using the correct device technique."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies",
    clinicalReasoning: "Medication safety includes local adverse-effect prevention and recognition of infection risk.",
    clinicalPearl: "ICS is selective COPD therapy; when it is prescribed, teach steroid-specific safety.", keyTakeaway: "Rinse after ICS and monitor for candidiasis and pneumonia symptoms.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0009-7a20-4b21-9c11-000000000009",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with diabetes is receiving systemic corticosteroids for a COPD exacerbation. Which monitoring is especially important?",
    options: ["Blood glucose", "Visual acuity every 5 minutes", "Serum calcium only", "INR solely because corticosteroids always cause anticoagulation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Systemic corticosteroids can raise blood glucose, making glucose monitoring particularly important in patients with diabetes.",
    optionRationales: ["Correct: steroid-associated hyperglycemia is common and clinically relevant.", "Incorrect: visual acuity every five minutes is not the priority routine monitoring for a short steroid course.", "Incorrect: calcium alone does not address the most immediate predictable metabolic effect in a patient with diabetes.", "Incorrect: corticosteroids do not uniformly act as anticoagulants or mandate INR monitoring for that reason."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner anticipates a common treatment complication based on the patient's comorbidity.",
    clinicalPearl: "A short steroid burst can still produce meaningful hyperglycemia.", keyTakeaway: "Monitor glucose during systemic corticosteroid therapy, especially in diabetes.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0010-7a20-4b21-9c11-000000000010",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient is receiving frequent albuterol during a severe COPD exacerbation. Which laboratory trend may accompany the patient's new palpitations?",
    options: ["Decreasing serum potassium", "Severe hypercalcemia", "A directly elevated INR", "Acute bilirubin elevation from beta2 stimulation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Repeated beta2-agonist therapy may cause tachycardia and shift potassium into cells, leading to transient hypokalemia.",
    optionRationales: ["Correct: hypokalemia can occur with intensive beta2-agonist use and can contribute to arrhythmia risk.", "Incorrect: hypercalcemia is not an expected acute albuterol effect.", "Incorrect: albuterol does not directly cause a major INR elevation.", "Incorrect: acute hyperbilirubinemia is not a typical beta2-agonist effect."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The nurse links a treatment intensity cue with a plausible adverse effect.",
    clinicalPearl: "Frequent albuterol can affect both heart rate and potassium.", keyTakeaway: "Monitor for tachycardia and hypokalemia during intensive beta2-agonist therapy.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0011-7a20-4b21-9c11-000000000011",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which patient report most strongly suggests a COPD exacerbation?",
    options: ["Breathlessness and cough have worsened over two days and sputum has increased", "The usual chronic cough is unchanged", "Exercise tolerance is at baseline", "There has been no change in respiratory symptoms"],
    correctAnswer: 0,
    correctAnswerExplanation: "COPD exacerbations involve an acute worsening of respiratory symptoms beyond usual day-to-day variation, commonly including dyspnea, cough, and sputum changes.",
    optionRationales: ["Correct: sustained acute symptom worsening is consistent with an exacerbation.", "Incorrect: an unchanged chronic cough reflects baseline disease rather than an acute flare.", "Incorrect: unchanged activity tolerance argues against acute worsening.", "Incorrect: no change in symptoms does not support an exacerbation."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Self-management begins with recognizing meaningful change from baseline.",
    clinicalPearl: "COPD flare-ups are defined by worsening, not by simply having chronic symptoms.", keyTakeaway: "Teach patients to act on sustained worsening dyspnea, cough, or sputum.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0012-7a20-4b21-9c11-000000000012",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with smoking-related COPD asks which change has the greatest potential to reduce continued tobacco-related lung injury. Which response is best?",
    options: ["Smoking cessation with evidence-based support", "Stopping all exercise", "Using inhalers while continuing the same tobacco exposure", "Ignoring vaccinations"],
    correctAnswer: 0,
    correctAnswerExplanation: "Smoking cessation is a major disease-modifying intervention for tobacco-related COPD and should be actively supported.",
    optionRationales: ["Correct: stopping tobacco exposure reduces continued lung injury and provides broad health benefits.", "Incorrect: inactivity worsens deconditioning and does not remove tobacco exposure.", "Incorrect: inhalers do not neutralize the harms of continued smoking.", "Incorrect: vaccination is part of respiratory risk reduction and should not be ignored."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse selects the highest-impact modifiable risk intervention.",
    clinicalPearl: "Support cessation without shame; repeated offers of help matter.", keyTakeaway: "Smoking cessation is central COPD care.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0013-7a20-4b21-9c11-000000000013",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient says a maintenance inhaler is ineffective. What should the LPN/VN do before assuming pharmacologic failure?",
    options: ["Observe inhaler technique and assess adherence", "Ask only whether the patient likes the device color", "Require the patient to name every receptor subtype", "Tell the patient to double the dose independently"],
    correctAnswer: 0,
    correctAnswerExplanation: "Poor inhaler technique and adherence are common, correctable reasons for inadequate response and should be assessed before treatment is judged ineffective.",
    optionRationales: ["Correct: medication cannot work as intended if it is not taken or delivered correctly.", "Incorrect: device color does not establish correct medication delivery.", "Incorrect: receptor memorization does not measure technique or adherence.", "Incorrect: unsupervised dose escalation is unsafe and outside LPN/VN scope."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner chooses the most direct modifiable explanation for apparent inhaler failure.",
    clinicalPearl: "Ask for a demonstration, not a yes/no answer about technique.", keyTakeaway: "Assess inhaler technique and adherence before escalation.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0014-7a20-4b21-9c11-000000000014",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which intervention should the LPN/VN reinforce as part of nonpharmacologic COPD management?",
    options: ["Pulmonary rehabilitation and regular activity appropriate to the patient's condition", "Permanent bed rest", "Avoiding all vaccinations", "Stopping prescribed maintenance therapy before exercise"],
    correctAnswer: 0,
    correctAnswerExplanation: "Pulmonary rehabilitation combines exercise training, education, and self-management support and can improve dyspnea, exercise capacity, and quality of life.",
    optionRationales: ["Correct: rehabilitation and activity address deconditioning and functional limitation.", "Incorrect: permanent bed rest worsens muscle deconditioning and functional capacity.", "Incorrect: vaccination is an important preventive strategy in COPD.", "Incorrect: maintenance therapy should be used according to the prescribed plan, not stopped because of activity."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The item tests a high-value nonpharmacologic intervention rather than medication-only thinking.",
    clinicalPearl: "COPD rehabilitation trains the person, not just the lungs.", keyTakeaway: "Pulmonary rehabilitation is a core COPD intervention for appropriate patients.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0015-7a20-4b21-9c11-000000000015",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD asks why influenza, COVID-19, and other recommended respiratory vaccinations matter. Which response is best?",
    options: ["Respiratory infections can trigger serious COPD exacerbations, so recommended vaccination reduces preventable risk", "Vaccines cure established emphysema", "Vaccines replace bronchodilator therapy", "Vaccines should be avoided in everyone with COPD"],
    correctAnswer: 0,
    correctAnswerExplanation: "Respiratory infections are common exacerbation triggers. Keeping recommended vaccinations current is an important preventive strategy for people with COPD.",
    optionRationales: ["Correct: vaccination reduces risk from preventable infections that can destabilize COPD.", "Incorrect: vaccination does not reverse structural emphysema.", "Incorrect: vaccines complement rather than replace prescribed COPD medication.", "Incorrect: COPD is generally a reason to prioritize indicated vaccines, not avoid them categorically."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "Prevention questions should connect the intervention to the mechanism of exacerbation risk.",
    clinicalPearl: "A respiratory infection can turn stable COPD into hospitalization quickly.", keyTakeaway: "Reinforce recommended vaccination as exacerbation prevention.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0016-7a20-4b21-9c11-000000000016",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A stable patient with COPD has dyspnea but no documented hypoxemia. Which teaching about home oxygen is most appropriate?",
    options: ["Long-term oxygen is prescribed based on documented hypoxemia and clinical criteria, not dyspnea alone", "Every patient with COPD and dyspnea needs oxygen", "The patient should buy oxygen and choose the flow rate without evaluation", "Oxygen permanently replaces bronchodilators and rehabilitation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Long-term oxygen therapy is used for appropriately assessed patients with chronic hypoxemia. Dyspnea can occur without hypoxemia and does not by itself establish an oxygen indication.",
    optionRationales: ["Correct: oxygen therapy requires objective assessment and a prescribed plan.", "Incorrect: dyspnea alone does not mean the blood oxygen level is low.", "Incorrect: oxygen is a medical therapy with dosing and fire-safety considerations.", "Incorrect: oxygen does not replace airflow treatment or rehabilitation."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner differentiates the symptom of breathlessness from the physiologic indication of hypoxemia.",
    clinicalPearl: "Oxygen treats low oxygen, not every cause of breathlessness.", keyTakeaway: "Long-term oxygen requires documented hypoxemia and evaluation.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0017-7a20-4b21-9c11-000000000017",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A 39-year-old patient has emphysema despite minimal smoking exposure and reports several relatives with early lung disease. What should the LPN/VN recognize?",
    options: ["The pattern should be communicated because alpha-1 antitrypsin deficiency may need evaluation", "The patient's age proves COPD is impossible", "Family history is irrelevant in COPD", "The LPN/VN should independently prescribe augmentation therapy"],
    correctAnswer: 0,
    correctAnswerExplanation: "Early emphysema with minimal tobacco exposure and a suggestive family history can indicate alpha-1 antitrypsin deficiency and warrants clinician evaluation.",
    optionRationales: ["Correct: the pattern is a recognized clue to inherited COPD risk.", "Incorrect: COPD can occur at younger ages, especially with genetic or other non-tobacco risk factors.", "Incorrect: family history is clinically relevant when early disease suggests a genetic cause.", "Incorrect: diagnosis and specialized therapy require authorized diagnostic and prescribing roles."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The nurse identifies an atypical pattern and escalates without independently diagnosing or treating it.",
    clinicalPearl: "Think beyond cigarettes when COPD appears unusually early.", keyTakeaway: "Report early emphysema with limited smoking and strong family history for AATD evaluation.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0018-7a20-4b21-9c11-000000000018",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD becomes dyspneic while transferring from bed to chair. Which breathing technique should the LPN/VN coach?",
    options: ["Pursed-lip breathing with a slow, prolonged exhalation", "Rapid shallow panting", "Prolonged breath holding", "Repeated forceful hyperventilation"],
    correctAnswer: 0,
    correctAnswerExplanation: "Pursed-lip breathing can help slow exhalation, reduce dynamic airway collapse, and improve control of exertional dyspnea in some patients with COPD.",
    optionRationales: ["Correct: prolonged controlled exhalation can reduce air trapping and improve breathing efficiency.", "Incorrect: rapid shallow breathing can worsen inefficient ventilation and anxiety.", "Incorrect: prolonged breath holding does not treat expiratory airflow limitation.", "Incorrect: forceful hyperventilation increases work of breathing and may worsen distress."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse applies a low-risk self-management technique during exertional symptoms.",
    clinicalPearl: "Slow the exhale; do not force it.", keyTakeaway: "Pursed-lip breathing can reduce exertional dyspnea and air trapping.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0019-7a20-4b21-9c11-000000000019",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "A patient with COPD suddenly develops sharp unilateral chest pain, severe dyspnea, and markedly reduced breath sounds on one side. What is the priority?",
    options: ["Escalate immediately for possible pneumothorax", "Assume this is the patient's normal COPD baseline", "Encourage vigorous coughing for 30 minutes before reassessment", "Delay assessment until the next scheduled medication pass"],
    correctAnswer: 0,
    correctAnswerExplanation: "COPD, especially emphysema, can increase pneumothorax risk. Sudden unilateral pain, acute dyspnea, and unilateral reduced breath sounds require urgent evaluation.",
    optionRationales: ["Correct: the abrupt unilateral pattern is concerning for pneumothorax and can become life threatening.", "Incorrect: sudden severe change from baseline is not explained by stable COPD alone.", "Incorrect: vigorous coughing delays evaluation of a potentially life-threatening complication.", "Incorrect: urgent deterioration cannot wait for routine medication timing."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The learner identifies a dangerous complication rather than attributing every respiratory symptom to the chronic diagnosis.",
    clinicalPearl: "Do not let a COPD label hide a new unilateral emergency.", keyTakeaway: "Sudden unilateral chest pain and reduced breath sounds require urgent pneumothorax evaluation.", references: [GOLD_2026, NCLEX_PN_2026]
  },
  {
    id: "us-copd-0020-7a20-4b21-9c11-000000000020",
    servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "COPD", questionType: "multiple_choice",
    stem: "Which statement by a patient being discharged after a COPD exacerbation demonstrates the best understanding?",
    options: ["I will follow my action plan, use medications as prescribed, and seek help for worsening breathlessness, sputum, oxygen needs, or alertness", "I will stop all maintenance inhalers tomorrow", "New confusion is expected and should be ignored", "I should avoid follow-up and rehabilitation because the exacerbation is over"],
    correctAnswer: 0,
    correctAnswerExplanation: "Safe COPD discharge planning includes medication adherence, recognition of exacerbation and respiratory-failure cues, follow-up, and rehabilitation/self-management support.",
    optionRationales: ["Correct: the statement integrates action-plan use, adherence, and red-flag escalation.", "Incorrect: maintenance therapy should follow the discharge plan rather than being stopped automatically.", "Incorrect: new confusion can indicate hypoxemia, hypercapnia, infection, or other serious illness.", "Incorrect: post-exacerbation follow-up and rehabilitation are important recovery and prevention strategies."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The final item integrates safety, treatment, self-management, and escalation rather than isolated recall.",
    clinicalPearl: "A good COPD action plan makes worsening visible early.", keyTakeaway: "Discharge safety requires medication adherence, action-plan use, follow-up, and red-flag recognition.", references: [GOLD_2026, NCLEX_PN_2026]
  }
];

if (pnUsCopdNclexBankBatch1.length !== 20) {
  throw new Error(`PN_US_COPD_BATCH1_COUNT_INVALID: ${pnUsCopdNclexBankBatch1.length}`);
}

for (const question of pnUsCopdNclexBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== question.options.length) {
    throw new Error(`PN_US_COPD_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
    throw new Error(`PN_US_COPD_ANSWER_CONTRACT_INVALID: ${question.id}`);
  }
  if (question.difficulty > 4) {
    throw new Error(`PN_US_COPD_DIFFICULTY_INVALID: ${question.id}`);
  }
}
