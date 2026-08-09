export interface RpnCaPneumoniaQuestion {
  id: string;
  tier: "rpn";
  exam: "REX-PN";
  regionScope: "CAN";
  countryCode: "CA";
  licensingBody: "NCSBN";
  bodySystem: "Respiratory";
  topic: "Community-Acquired Pneumonia";
  questionType: "multiple_choice";
  stem: string;
  options: [string, string, string, string];
  correctAnswer: number;
  correctAnswerExplanation: string;
  optionRationales: [string, string, string, string];
  difficulty: 2 | 3 | 4;
  cognitiveLevel: "application" | "analysis";
  clientNeedsCategory: "Physiological Integrity" | "Safe and Effective Care Environment" | "Health Promotion and Maintenance";
  clientNeedsSubcategory: "Physiological Adaptation" | "Reduction of Risk Potential" | "Pharmacological and Parenteral Therapies" | "Safety and Infection Control" | "Health Promotion and Maintenance";
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const HEALTHLINK_BC_PNEUMONIA = "HealthLink BC: Pneumonia clinical/patient guidance";
const PHO_RESPIRATORY = "Public Health Ontario respiratory virus testing and infection-prevention resources";
const AHS_CAP = "Alberta Health Services Community Acquired Pneumonia adult inpatient pathway";
const REXPN_TEST_PLAN = "REx-PN Test Plan: entry-level practical nursing client-needs framework and item-writing guidance";

export const rpnCaPneumoniaRexpnBankBatch1: RpnCaPneumoniaQuestion[] = [
  {
    id: "ca-cap-0001-8b31-4c41-9d21-000000000001", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "An 84-year-old patient with pneumonia becomes newly confused. Which action is the priority for the practical nurse?",
    options: ["Reassess oxygenation, vital signs, perfusion, and level of consciousness and report the acute change", "Assume confusion is a normal part of aging", "Wait until the patient develops a high fever", "Give a sedative without an order"],
    correctAnswer: 0,
    correctAnswerExplanation: "Older adults with pneumonia may present with confusion or delirium rather than dramatic fever. New confusion can also signal hypoxemia, sepsis, or other acute deterioration and requires prompt reassessment and escalation.",
    optionRationales: ["Correct: acute mental-status change is a clinically important deterioration cue.", "Incorrect: new confusion is not normal aging and requires investigation.", "Incorrect: older adults may have serious infection without high fever.", "Incorrect: sedating an acutely confused patient without assessment or an order may mask deterioration and is outside scope."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The learner recognizes atypical presentation and prioritizes reversible physiologic causes of delirium.", clinicalPearl: "In older adults, confusion may be the pneumonia clue that matters most.", keyTakeaway: "Treat new confusion in pneumonia as acute deterioration until assessed.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0002-8b31-4c41-9d21-000000000002", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia now requires 6 L/min of oxygen to maintain the same saturation that previously required 2 L/min. What is the best interpretation?",
    options: ["The rising oxygen requirement suggests worsening gas exchange and needs prompt escalation", "The patient is improving because the saturation number is unchanged", "Oxygen requirement is unrelated to pneumonia severity", "The nurse should remove oxygen to see how low the saturation becomes"],
    correctAnswer: 0,
    correctAnswerExplanation: "A rising oxygen requirement is a deterioration signal even if the displayed saturation is temporarily maintained. It may reflect increasing consolidation, shunt, or respiratory failure.",
    optionRationales: ["Correct: the amount of support needed to maintain a target is part of the clinical trend.", "Incorrect: a stable saturation achieved with much more oxygen does not represent improvement.", "Incorrect: increasing oxygen need can directly reflect worsening lung function.", "Incorrect: deliberately withholding needed oxygen is unsafe."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The nurse interprets treatment intensity together with the vital-sign result rather than reading SpO2 in isolation.", clinicalPearl: "Track the oxygen dose, not just the oxygen saturation.", keyTakeaway: "Increasing oxygen requirement is pneumonia deterioration.", references: [HEALTHLINK_BC_PNEUMONIA, AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0003-8b31-4c41-9d21-000000000003", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with suspected severe bacterial pneumonia has orders for blood cultures and IV antibiotics. Which sequence is most appropriate?",
    options: ["Obtain ordered cultures promptly before the first antibiotic when feasible, without creating a harmful treatment delay", "Delay antibiotics for many hours until every possible specimen is collected", "Give several antibiotic doses and then collect cultures routinely", "Cancel the culture order because cultures are never useful"],
    correctAnswer: 0,
    correctAnswerExplanation: "When cultures are indicated, obtaining them before antibiotics can improve diagnostic yield, but specimen collection should not cause a clinically important delay in treating severe infection.",
    optionRationales: ["Correct: this preserves diagnostic value while prioritizing timely treatment.", "Incorrect: prolonged delay in severe infection can worsen outcomes.", "Incorrect: prior antibiotics can reduce culture yield when specimens could have been obtained promptly first.", "Incorrect: cultures can be clinically useful in selected severe or high-risk cases."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The question tests competing priorities: diagnostic stewardship and timely infection treatment.", clinicalPearl: "Culture first when indicated and feasible; never turn culture collection into a dangerous antibiotic delay.", keyTakeaway: "Obtain ordered cultures promptly before antibiotics when feasible without delaying urgent treatment.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0004-8b31-4c41-9d21-000000000004", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Before administering the first ordered antibiotic for pneumonia, which assessment is essential?",
    options: ["Verify medication allergies and the nature of any previous reaction", "Ask only what colour the tablet is", "Assume a listed allergy is never important", "Skip medication reconciliation because pneumonia is respiratory"],
    correctAnswer: 0,
    correctAnswerExplanation: "Antibiotic safety begins with allergy verification, including the drug and reaction type, so the team can distinguish severe hypersensitivity from intolerance and avoid preventable harm.",
    optionRationales: ["Correct: allergy verification directly affects safe antimicrobial administration.", "Incorrect: tablet colour does not establish medication safety.", "Incorrect: a true serious allergy can be life threatening and must not be ignored.", "Incorrect: medication reconciliation remains important because interactions, renal function, and prior therapies can affect treatment."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The nurse applies a universal medication-safety check to an urgent infection context.", clinicalPearl: "Document what happened during the 'allergy,' not just the word allergy.", keyTakeaway: "Verify antimicrobial allergies before administration.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0005-8b31-4c41-9d21-000000000005", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient receiving antibiotics for pneumonia develops frequent watery diarrhea and abdominal cramping. What should the practical nurse do?",
    options: ["Report the symptoms and follow appropriate infection-control/testing protocols for possible C. difficile", "Reassure the patient that severe diarrhea is always harmless", "Give an antidiarrheal medication without an order", "Stop all prescribed antibiotics permanently without communicating with the team"],
    correctAnswer: 0,
    correctAnswerExplanation: "Antibiotic exposure can increase the risk of C. difficile infection. New significant watery diarrhea requires assessment, appropriate precautions, and clinician review.",
    optionRationales: ["Correct: possible C. difficile requires prompt assessment and infection-control action.", "Incorrect: severe antibiotic-associated diarrhea can be clinically important and is not automatically benign.", "Incorrect: unsupervised antidiarrheal treatment may be inappropriate and exceeds medication orders.", "Incorrect: antibiotic decisions should be reviewed by the authorized prescriber rather than stopped permanently without communication."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Safety and Infection Control",
    clinicalReasoning: "The nurse connects antimicrobial exposure with a serious healthcare-associated complication.", clinicalPearl: "New watery diarrhea during or after antibiotics deserves a C. difficile lens.", keyTakeaway: "Escalate significant antibiotic-associated diarrhea and use appropriate precautions.", references: [PHO_RESPIRATORY, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0006-8b31-4c41-9d21-000000000006", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which finding in a patient with pneumonia is most concerning for sepsis with organ dysfunction?",
    options: ["New hypotension, confusion, and decreasing urine output", "Mild sore throat with stable vital signs", "A cough that is improving", "Normal mentation and adequate urine output"],
    correctAnswer: 0,
    correctAnswerExplanation: "Hypotension, acute mental-status change, and oliguria suggest impaired perfusion and organ dysfunction and require urgent sepsis evaluation and treatment.",
    optionRationales: ["Correct: the cluster indicates systemic deterioration beyond localized lung infection.", "Incorrect: stable vital signs and mild symptoms do not suggest organ dysfunction.", "Incorrect: improvement in cough is reassuring rather than a sepsis marker.", "Incorrect: normal mentation and urine output do not indicate the stated organ-dysfunction pattern."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The learner identifies multisystem deterioration and prioritizes perfusion over isolated respiratory symptoms.", clinicalPearl: "Pneumonia can become a circulation problem when sepsis develops.", keyTakeaway: "Hypotension, confusion, and oliguria are urgent sepsis cues.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0007-8b31-4c41-9d21-000000000007", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with recurrent pneumonia coughs during meals and has a wet voice after swallowing. Which action is most appropriate?",
    options: ["Stop unsafe oral intake as indicated by local protocol and request/communicate the need for swallowing assessment", "Encourage faster eating", "Place the patient flat during meals", "Ignore the pattern because aspiration does not cause pneumonia"],
    correctAnswer: 0,
    correctAnswerExplanation: "Coughing and wet voice with swallowing suggest dysphagia and aspiration risk. The nurse should protect the airway and initiate the appropriate swallowing-safety pathway within local policy.",
    optionRationales: ["Correct: aspiration risk requires immediate feeding-safety action and assessment.", "Incorrect: faster eating can increase aspiration risk.", "Incorrect: upright positioning is generally safer for swallowing than lying flat.", "Incorrect: aspiration is a recognized cause of pneumonia."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The nurse links a functional swallowing cue to recurrent lung infection and acts before another aspiration event.", clinicalPearl: "A wet voice after swallowing is a respiratory clue hiding in a feeding assessment.", keyTakeaway: "Escalate suspected dysphagia and protect the airway during meals.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0008-8b31-4c41-9d21-000000000008", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient is admitted with fever, cough, and suspected contagious respiratory infection causing pneumonia. Which infection-control approach is best?",
    options: ["Use routine practices and add organism/syndrome-appropriate precautions according to screening and local policy", "Use no precautions until a final culture result is available", "Place every pneumonia patient in airborne isolation regardless of cause", "Reuse contaminated respiratory equipment between patients without cleaning"],
    correctAnswer: 0,
    correctAnswerExplanation: "Canadian infection-prevention practice uses routine practices for all patients plus additional precautions based on the suspected or confirmed mode of transmission.",
    optionRationales: ["Correct: precautions should reflect the clinical syndrome and suspected pathogen while results are pending.", "Incorrect: waiting for final confirmation can expose others during the contagious period.", "Incorrect: airborne precautions are indicated for specific pathogens, not every pneumonia case.", "Incorrect: shared respiratory equipment must be appropriately cleaned/disinfected or dedicated to prevent transmission."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Safety and Infection Control",
    clinicalReasoning: "The nurse applies transmission-based reasoning rather than one isolation category to all respiratory infections.", clinicalPearl: "Precautions follow how the organism spreads, not the word 'pneumonia.'", keyTakeaway: "Use routine practices plus indicated additional precautions.", references: [PHO_RESPIRATORY, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0009-8b31-4c41-9d21-000000000009", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "During influenza circulation, a high-risk hospitalized patient has influenza-like illness with pneumonia and an antiviral order. Which action is appropriate?",
    options: ["Administer the prescribed antiviral promptly rather than waiting for a delayed confirmatory result when the treatment plan calls for empiric therapy", "Hold the antiviral until every viral test in the province is resulted", "Replace all ordered pneumonia treatment with cough drops", "Tell the patient influenza cannot cause pneumonia"],
    correctAnswer: 0,
    correctAnswerExplanation: "Public Health Ontario notes that when influenza is circulating, laboratory confirmation is not necessarily required before initiating indicated antiviral treatment because waiting can delay therapy.",
    optionRationales: ["Correct: the nurse should carry out timely prescribed therapy when empiric treatment is indicated.", "Incorrect: unnecessary waiting can delay time-sensitive treatment.", "Incorrect: cough drops do not replace antiviral or other indicated pneumonia care.", "Incorrect: influenza can cause pneumonia and severe lower-respiratory disease."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The learner distinguishes a time-sensitive empiric order from therapy that must await a final test.", clinicalPearl: "During influenza season, timing can matter more than waiting for perfect certainty.", keyTakeaway: "Do not create avoidable delays in prescribed empiric antiviral therapy for high-risk influenza pneumonia.", references: [PHO_RESPIRATORY, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0010-8b31-4c41-9d21-000000000010", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia and heart failure is dehydrated but also has crackles and peripheral edema. Which approach is safest?",
    options: ["Follow the ordered fluid plan and reassess perfusion and signs of fluid overload frequently", "Force unlimited oral fluids regardless of cardiac status", "Withhold every fluid indefinitely", "Ignore intake and urine output"],
    correctAnswer: 0,
    correctAnswerExplanation: "Hydration may support secretion clearance and perfusion, but patients with heart failure can be harmed by excessive fluid. The nurse should implement the individualized fluid plan and reassess both perfusion and congestion.",
    optionRationales: ["Correct: individualized fluid management balances competing risks.", "Incorrect: unlimited fluids can worsen pulmonary and systemic congestion.", "Incorrect: complete fluid withholding can worsen dehydration and perfusion if not clinically indicated.", "Incorrect: intake and urine output are important measures of hydration and organ perfusion."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The item avoids a one-size-fits-all hydration rule and requires comorbidity-aware reassessment.", clinicalPearl: "Hydration is a treatment goal, not a licence to flood a vulnerable patient.", keyTakeaway: "Balance hydration with fluid-overload risk.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0011-8b31-4c41-9d21-000000000011", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia has pleuritic pain and fever that make deep breathing difficult. Which nursing action is appropriate?",
    options: ["Administer prescribed analgesic/antipyretic therapy and then encourage coughing, deep breathing, and mobility as tolerated", "Avoid pain treatment so respiratory rate remains high", "Keep the patient completely immobile for the entire admission", "Suppress every cough regardless of secretion burden"],
    correctAnswer: 0,
    correctAnswerExplanation: "Controlling pain and fever can improve ventilation, coughing, sleep, and mobility. These supportive measures help secretion clearance and reduce complications.",
    optionRationales: ["Correct: symptom control can enable effective pulmonary hygiene and mobility.", "Incorrect: untreated pain can cause splinting and shallow breathing.", "Incorrect: prolonged immobility increases deconditioning and complication risk.", "Incorrect: indiscriminate cough suppression can impair secretion clearance."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The learner connects comfort interventions to respiratory function rather than treating them as optional extras.", clinicalPearl: "Pain control can be a breathing intervention when pleuritic pain causes splinting.", keyTakeaway: "Treat pain/fever so the patient can ventilate, cough, and mobilize.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0012-8b31-4c41-9d21-000000000012", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient asks whether green sputum proves that pneumonia is bacterial. Which response is best?",
    options: ["Sputum colour alone does not reliably identify the cause; the overall clinical picture and indicated testing guide treatment", "Green sputum always proves a bacterial infection", "Clear sputum always excludes pneumonia", "Sputum appearance is the only information needed to choose antibiotics"],
    correctAnswer: 0,
    correctAnswerExplanation: "Sputum colour can change with inflammation and does not independently establish a bacterial cause. Etiology and treatment decisions require clinical assessment and selective testing.",
    optionRationales: ["Correct: colour is one observation, not a definitive microbiologic test.", "Incorrect: purulent colour is not perfectly specific for bacterial infection.", "Incorrect: pneumonia can occur without coloured sputum or even without sputum production.", "Incorrect: antibiotic selection depends on severity, setting, risk factors, allergies, and other clinical data."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse corrects an oversimplified diagnostic rule and supports antimicrobial stewardship.", clinicalPearl: "Colour is not culture.", keyTakeaway: "Do not diagnose bacterial pneumonia from sputum colour alone.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0013-8b31-4c41-9d21-000000000013", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which statement by a patient receiving an antibiotic for bacterial pneumonia shows correct understanding?",
    options: ["I will take the antibiotic exactly as prescribed and will not save or share leftover medication", "I will stop after one dose whenever the fever improves", "I will double the dose if I miss one without checking instructions", "I will share the antibiotic with a family member who develops a cough"],
    correctAnswer: 0,
    correctAnswerExplanation: "Antimicrobial stewardship includes taking the prescribed agent for the prescribed duration, not saving, sharing, or self-adjusting doses.",
    optionRationales: ["Correct: this follows the individualized prescription and reduces unsafe misuse.", "Incorrect: stopping prematurely without instruction can lead to treatment failure.", "Incorrect: missed-dose management should follow pharmacy/prescriber instructions rather than automatic doubling.", "Incorrect: sharing antibiotics is unsafe because another person's illness may have a different cause, allergy risk, or dosing need."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological and Parenteral Therapies",
    clinicalReasoning: "The learner teaches adherence without using outdated language that every antibiotic course must be arbitrarily prolonged.", clinicalPearl: "The right duration is the prescribed duration, not 'longer is better.'", keyTakeaway: "Take antibiotics exactly as prescribed; never save or share them.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0014-8b31-4c41-9d21-000000000014", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia has increasing respiratory distress and unilateral absent breath sounds after a new pleural procedure. What is the priority?",
    options: ["Escalate immediately for possible pneumothorax or other procedural complication", "Assume the finding is normal after any pleural procedure", "Wait for the next shift to assess", "Encourage the patient to walk unassisted"],
    correctAnswer: 0,
    correctAnswerExplanation: "Sudden respiratory deterioration and unilateral absent breath sounds after a pleural procedure can indicate pneumothorax and require urgent evaluation.",
    optionRationales: ["Correct: the pattern suggests a potentially life-threatening complication.", "Incorrect: sudden severe respiratory changes are not automatically expected after pleural procedures.", "Incorrect: delayed assessment can allow deterioration to progress.", "Incorrect: ambulation is unsafe during acute unexplained respiratory distress."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation",
    clinicalReasoning: "The nurse must recognize a complication rather than attributing all deterioration to the original pneumonia.", clinicalPearl: "A new unilateral finding after a procedure deserves a complication check.", keyTakeaway: "Escalate sudden unilateral breath-sound loss and respiratory deterioration.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0015-8b31-4c41-9d21-000000000015", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which urine-output trend in a patient with severe pneumonia should the practical nurse report promptly?",
    options: ["A marked decline in urine output with hypotension", "Normal urine output with stable blood pressure", "One missed documentation box despite normal measured output", "Urine output that increases as perfusion improves"],
    correctAnswer: 0,
    correctAnswerExplanation: "Oliguria with hypotension may indicate poor renal perfusion and sepsis-related organ dysfunction and requires urgent assessment.",
    optionRationales: ["Correct: the combination suggests impaired perfusion and possible organ dysfunction.", "Incorrect: normal urine output and stable pressure are reassuring relative to the other options.", "Incorrect: documentation should be corrected, but a charting omission without physiologic change is not the same as oliguria with hypotension.", "Incorrect: improving output with improving perfusion is generally a favourable trend."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential",
    clinicalReasoning: "The learner uses urine output as a perfusion marker rather than a renal-only variable.", clinicalPearl: "The kidneys often show you that circulation is failing.", keyTakeaway: "Report oliguria with hypotension in severe infection.", references: [AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0016-8b31-4c41-9d21-000000000016", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with suspected pneumonia asks why a chest radiograph was ordered. Which explanation is best?",
    options: ["Imaging can help identify pulmonary infiltrates and complications and can support the diagnosis when clinically indicated", "A chest radiograph identifies every pneumonia organism", "Imaging replaces assessment and vital signs", "A chest radiograph automatically determines the exact antibiotic"],
    correctAnswer: 0,
    correctAnswerExplanation: "Chest imaging can demonstrate infiltrates and complications and help distinguish pneumonia from alternative diagnoses, but it does not identify every organism or independently choose treatment.",
    optionRationales: ["Correct: imaging is one component of diagnostic assessment.", "Incorrect: radiography does not provide organism identification.", "Incorrect: clinical assessment remains essential.", "Incorrect: antimicrobial selection depends on more than the radiograph."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse explains the purpose and limits of a common diagnostic test.", clinicalPearl: "A chest x-ray can show where the problem is, not necessarily which microbe caused it.", keyTakeaway: "Imaging supports pneumonia diagnosis and complication assessment.", references: [HEALTHLINK_BC_PNEUMONIA, AHS_CAP, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0017-8b31-4c41-9d21-000000000017", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient recovering from pneumonia is weak and has been in bed for three days. Which nursing action is most appropriate?",
    options: ["Increase mobility gradually as tolerated while monitoring oxygenation and symptoms", "Keep the patient on strict bed rest until every cough resolves", "Ambulate the patient rapidly without assessing tolerance", "Avoid all activity because movement spreads pneumonia"],
    correctAnswer: 0,
    correctAnswerExplanation: "Graded mobility supports secretion clearance, reduces deconditioning, and helps restore function. Activity should be advanced according to respiratory and hemodynamic tolerance.",
    optionRationales: ["Correct: gradual monitored mobility balances recovery and safety.", "Incorrect: unnecessary prolonged bed rest worsens deconditioning.", "Incorrect: unassessed rapid ambulation can provoke hypoxemia or instability.", "Incorrect: ordinary mobility does not spread pneumonia within the body."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The nurse promotes recovery without ignoring exertional oxygen needs.", clinicalPearl: "Recovery from pneumonia includes rebuilding function, not just finishing medication.", keyTakeaway: "Use graded, monitored mobility during pneumonia recovery.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0018-8b31-4c41-9d21-000000000018", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which intervention helps reduce aspiration risk in a patient with known dysphagia who is permitted oral intake under a swallowing plan?",
    options: ["Follow the prescribed texture/consistency plan and position the patient upright for meals", "Feed the patient while supine", "Offer thin liquids regardless of the swallowing recommendation", "Rush the meal to reduce time spent eating"],
    correctAnswer: 0,
    correctAnswerExplanation: "Following the individualized swallowing plan and upright positioning can reduce aspiration risk in patients with dysphagia.",
    optionRationales: ["Correct: the plan reflects assessed swallowing safety and positioning supports airway protection.", "Incorrect: supine feeding increases aspiration risk.", "Incorrect: fluid consistency should follow the swallowing assessment rather than be changed arbitrarily.", "Incorrect: rushing can impair safe swallowing and cueing."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Safety and Infection Control",
    clinicalReasoning: "The nurse implements an existing swallowing plan rather than independently changing diet texture.", clinicalPearl: "Aspiration prevention is a team plan carried out at every meal.", keyTakeaway: "Use prescribed texture and upright positioning for dysphagia care.", references: [HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0019-8b31-4c41-9d21-000000000019", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which prevention teaching is most appropriate for an older adult recovering from community-acquired pneumonia?",
    options: ["Review recommended respiratory vaccinations, smoking cessation if applicable, hand hygiene, and management of chronic disease", "Avoid all future vaccines", "Resume smoking because the infection has been treated", "Stop managing diabetes because pneumonia is a lung disease"],
    correctAnswer: 0,
    correctAnswerExplanation: "Vaccination, tobacco cessation, infection prevention, and good chronic-disease control can reduce future respiratory infection risk and complications.",
    optionRationales: ["Correct: prevention is multifactorial and should address modifiable risk.", "Incorrect: indicated vaccinations are an important prevention strategy.", "Incorrect: smoking increases respiratory risk and should not be resumed.", "Incorrect: uncontrolled chronic disease can increase infection severity and should continue to be managed."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner selects prevention strategies that remain relevant after acute treatment ends.", clinicalPearl: "Pneumonia recovery is an opportunity to close prevention gaps.", keyTakeaway: "Reinforce vaccination, tobacco cessation, infection prevention, and chronic-disease control.", references: [PHO_RESPIRATORY, HEALTHLINK_BC_PNEUMONIA, REXPN_TEST_PLAN]
  },
  {
    id: "ca-cap-0020-8b31-4c41-9d21-000000000020", tier: "rpn", exam: "REX-PN", regionScope: "CAN", countryCode: "CA", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which discharge statement by a patient with pneumonia requires correction?",
    options: ["If I become more short of breath, confused, faint, or need more oxygen, I should seek urgent care", "I will take medications exactly as prescribed", "I can save leftover antibiotics and give them to a relative with a cough", "I will increase activity gradually as my breathing and strength improve"],
    correctAnswer: 2,
    correctAnswerExplanation: "Antibiotics should never be saved and shared. Another person's cough may not be bacterial pneumonia, and the drug, dose, duration, allergies, and contraindications may be inappropriate.",
    optionRationales: ["Incorrect option: this is appropriate red-flag teaching and does not require correction.", "Incorrect option: taking medication as prescribed is appropriate.", "Correct: sharing leftover antibiotics is unsafe and conflicts with antimicrobial stewardship.", "Incorrect option: graded recovery activity is appropriate when tolerated."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance",
    clinicalReasoning: "The learner identifies unsafe discharge behaviour among otherwise appropriate recovery statements.", clinicalPearl: "Leftover antibiotics are not a family medicine cabinet.", keyTakeaway: "Never save or share antibiotics; seek care for respiratory or mental-status deterioration.", references: [HEALTHLINK_BC_PNEUMONIA, AHS_CAP, REXPN_TEST_PLAN]
  }
];

if (rpnCaPneumoniaRexpnBankBatch1.length !== 20) throw new Error(`RPN_CA_PNEUMONIA_BATCH1_COUNT_INVALID: ${rpnCaPneumoniaRexpnBankBatch1.length}`);
for (const question of rpnCaPneumoniaRexpnBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== 4) throw new Error(`RPN_CA_PNEUMONIA_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  if (question.correctAnswer < 0 || question.correctAnswer >= 4) throw new Error(`RPN_CA_PNEUMONIA_ANSWER_CONTRACT_INVALID: ${question.id}`);
  if (question.difficulty > 4) throw new Error(`RPN_CA_PNEUMONIA_DIFFICULTY_INVALID: ${question.id}`);
}
