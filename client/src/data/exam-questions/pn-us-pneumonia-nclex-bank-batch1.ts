export interface PnUsPneumoniaQuestion {
  id: string;
  servingTier: "rpn";
  pathway: "US-PN";
  exam: "NCLEX-PN";
  regionScope: "US";
  countryCode: "US";
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
  clientNeedsSubcategory: "Physiological Adaptation" | "Reduction of Risk Potential" | "Pharmacological Therapies" | "Safety and Infection Control" | "Health Promotion and Maintenance";
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: string[];
}

const IDSA_ATS_CAP = "Current ATS/IDSA Guideline for Diagnosis and Treatment of Adults with Community-Acquired Pneumonia and CAP Clinical Pathway";
const CDC_RESPIRATORY_PREVENTION = "CDC respiratory infection prevention and adult immunization guidance";
const NCLEX_PN_2026 = "NCSBN 2026 NCLEX-PN Test Plan";

export const pnUsPneumoniaNclexBankBatch1: PnUsPneumoniaQuestion[] = [
  {
    id: "us-cap-0001-9c42-4d51-8e31-000000000001", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "An older adult admitted with community-acquired pneumonia is afebrile but suddenly becomes disoriented. Which action should the LPN/VN take first?",
    options: ["Reassess oxygenation, vital signs, perfusion, and mental status and report the acute change", "Assume disorientation is expected aging", "Wait for a fever before reporting the change", "Administer a sedative without an order"],
    correctAnswer: 0,
    correctAnswerExplanation: "Older adults may have serious pneumonia without prominent fever. New disorientation can reflect hypoxemia, sepsis, or other acute illness and requires prompt reassessment and escalation.",
    optionRationales: ["Correct: acute mental-status change is a deterioration cue requiring physiologic assessment.", "Incorrect: acute confusion is not normal aging.", "Incorrect: serious infection in older adults may occur without high fever.", "Incorrect: unsupervised sedation can mask deterioration and is outside scope."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The learner prioritizes an acute change rather than relying on classic fever presentation.", clinicalPearl: "In older adults, delirium may be the first sign that pneumonia is getting worse.", keyTakeaway: "Reassess and escalate new confusion in pneumonia.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0002-9c42-4d51-8e31-000000000002", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with CAP is maintaining an SpO2 of 93%, but the oxygen flow needed to maintain it has increased from 2 L/min to 7 L/min. What should the LPN/VN do?",
    options: ["Recognize worsening oxygen requirement as deterioration and escalate promptly", "Document improvement because the saturation number did not fall", "Turn off the oxygen to test the patient's reserve", "Ignore oxygen flow because only SpO2 matters"],
    correctAnswer: 0,
    correctAnswerExplanation: "Needing substantially more supplemental oxygen to maintain the same saturation signals worsening gas exchange and can precede respiratory failure.",
    optionRationales: ["Correct: treatment intensity is part of the trend and should trigger reassessment.", "Incorrect: the same saturation supported by much more oxygen is not improvement.", "Incorrect: removing needed oxygen is unsafe.", "Incorrect: both saturation and the support required to achieve it matter."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "NCLEX clinical judgment requires trend interpretation rather than single-number recognition.", clinicalPearl: "The oxygen flow rate is part of the vital sign story.", keyTakeaway: "Escalate a rapidly increasing oxygen requirement.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0003-9c42-4d51-8e31-000000000003", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with severe CAP has orders for blood cultures and IV antibiotics. Which action best preserves both diagnostic quality and timely treatment?",
    options: ["Collect ordered cultures promptly before the first antibiotic when feasible without causing a clinically important delay", "Delay antibiotics for several hours until every possible culture is obtained", "Give multiple antibiotic doses before collecting already-ordered cultures", "Cancel cultures because they are never indicated in severe CAP"],
    correctAnswer: 0,
    correctAnswerExplanation: "In severe or selected high-risk CAP, cultures may be indicated. Obtaining them before antibiotics can improve yield, but specimen collection should not delay urgent treatment.",
    optionRationales: ["Correct: the sequence balances diagnostic stewardship and time-sensitive therapy.", "Incorrect: prolonged antibiotic delay can be harmful in severe infection.", "Incorrect: prior antibiotics may reduce culture yield when specimens could have been collected promptly.", "Incorrect: cultures are recommended in selected severe or resistant-pathogen-risk situations."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The learner manages competing priorities without turning a useful test into a treatment barrier.", clinicalPearl: "Cultures should support care, not delay it.", keyTakeaway: "Collect indicated cultures promptly before antibiotics when feasible, without delaying urgent therapy.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0004-9c42-4d51-8e31-000000000004", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient has radiographically confirmed CAP and an empiric antibiotic order. The initial procalcitonin level is low. Which action is most appropriate for the LPN/VN?",
    options: ["Administer the prescribed empiric antibiotic unless the authorized prescriber changes the plan", "Withhold the ordered antibiotic solely because procalcitonin is low", "Tell the patient procalcitonin proves pneumonia is viral", "Independently discontinue all anti-infective therapy"],
    correctAnswer: 0,
    correctAnswerExplanation: "The ATS/IDSA adult CAP guideline advises that initial procalcitonin should not be used by itself to withhold empiric antibacterial treatment in clinically suspected and radiographically confirmed CAP.",
    optionRationales: ["Correct: the nurse follows the treatment order while monitoring response and communicating new data.", "Incorrect: a low initial procalcitonin alone is not sufficient to withhold indicated empiric therapy under the guideline.", "Incorrect: procalcitonin is not a definitive viral-versus-bacterial test for an individual CAP case.", "Incorrect: independent discontinuation exceeds LPN/VN scope."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies", clinicalReasoning: "This tests a U.S.-specific CAP stewardship recommendation without assigning prescribing authority to the nurse.", clinicalPearl: "A biomarker supports judgment; it does not replace the entire pneumonia assessment.", keyTakeaway: "Do not withhold ordered initial CAP antibiotics solely because procalcitonin is low.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0005-9c42-4d51-8e31-000000000005", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Before giving the first dose of a prescribed antibiotic for CAP, which information should the LPN/VN verify?",
    options: ["Medication allergies and the type of previous reaction", "The color of the patient's favorite pill", "Whether the patient has ever had a cough", "Only the room number"],
    correctAnswer: 0,
    correctAnswerExplanation: "Allergy verification is an essential medication-safety step before antimicrobial administration and should include the specific reaction when possible.",
    optionRationales: ["Correct: allergy details can change drug selection and emergency preparedness.", "Incorrect: pill preference is not a safety assessment.", "Incorrect: prior cough does not establish antibiotic safety.", "Incorrect: room number is an identifier context, not the medication allergy assessment required here."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies", clinicalReasoning: "The item applies basic medication safety to a time-sensitive infection context.", clinicalPearl: "Ask what the allergy reaction actually was.", keyTakeaway: "Verify antibiotic allergy and reaction before administration.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0006-9c42-4d51-8e31-000000000006", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient being treated for CAP develops profuse watery diarrhea after several days of antibiotics. Which action is best?",
    options: ["Report the change and initiate the facility pathway for possible C. difficile, including indicated precautions", "Assume severe diarrhea is an expected harmless effect", "Give an antidiarrheal without an order", "Share the patient's bathroom with other patients without cleaning"],
    correctAnswer: 0,
    correctAnswerExplanation: "Antibiotic exposure is a major risk factor for C. difficile infection. Significant new watery diarrhea should trigger assessment and infection-control measures.",
    optionRationales: ["Correct: early recognition limits patient harm and transmission.", "Incorrect: significant watery diarrhea can represent serious infection.", "Incorrect: antidiarrheals may be inappropriate and require an order or protocol.", "Incorrect: environmental contamination contributes to transmission and requires appropriate cleaning and precautions."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Safety and Infection Control", clinicalReasoning: "The nurse recognizes an adverse consequence of antimicrobial exposure and acts to protect both patient and unit.", clinicalPearl: "New watery diarrhea after antibiotics is not a 'just watch it' finding.", keyTakeaway: "Evaluate significant antibiotic-associated diarrhea for C. difficile.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0007-9c42-4d51-8e31-000000000007", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which assessment cluster in a patient with CAP is most concerning for sepsis-related organ dysfunction?",
    options: ["Hypotension, new confusion, and declining urine output", "Stable blood pressure and improving appetite", "Mild cough with normal mentation", "Normal urine output and improving oxygen need"],
    correctAnswer: 0,
    correctAnswerExplanation: "Hypotension, acute mental-status change, and oliguria suggest impaired organ perfusion and possible sepsis with organ dysfunction.",
    optionRationales: ["Correct: multiple organ systems are showing deterioration.", "Incorrect: stable pressure and improving intake are relatively reassuring.", "Incorrect: mild cough and normal mentation do not show organ dysfunction.", "Incorrect: normal urine output and improving oxygen need suggest recovery."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The learner integrates circulation, neurologic function, and renal perfusion rather than focusing only on the lungs.", clinicalPearl: "Pneumonia can become a whole-body perfusion emergency.", keyTakeaway: "Escalate hypotension, confusion, and oliguria in CAP.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0008-9c42-4d51-8e31-000000000008", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia coughs with every sip of water and develops a wet, gurgling voice. What should the LPN/VN do?",
    options: ["Protect the airway according to facility protocol and communicate the need for a swallowing evaluation", "Encourage larger sips to clear the throat", "Place the patient flat for meals", "Ignore the finding because aspiration cannot cause pneumonia"],
    correctAnswer: 0,
    correctAnswerExplanation: "Coughing and wet voice with swallowing suggest dysphagia and aspiration risk. Oral intake should be managed safely under facility protocol and the finding escalated for swallowing assessment.",
    optionRationales: ["Correct: the immediate goal is prevention of further aspiration.", "Incorrect: larger sips may worsen aspiration.", "Incorrect: supine positioning increases aspiration risk.", "Incorrect: aspiration is a recognized cause of pneumonia."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The nurse identifies a modifiable cause of recurrent or worsening pneumonia.", clinicalPearl: "Listen to the voice after swallowing; a wet voice can be an airway warning.", keyTakeaway: "Escalate suspected dysphagia and prevent further aspiration.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0009-9c42-4d51-8e31-000000000009", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with CAP has a positive viral respiratory test but remains clinically concerning for bacterial coinfection and has an antibiotic order. What should the LPN/VN do?",
    options: ["Administer prescribed therapy and monitor while the authorized team interprets the viral result in the full clinical context", "Assume a positive viral test always excludes bacterial pneumonia", "Independently cancel the antibiotic", "Tell the patient viral and bacterial infections can never occur together"],
    correctAnswer: 0,
    correctAnswerExplanation: "Respiratory viral detection does not automatically exclude bacterial coinfection. Antibiotic decisions depend on severity and the overall clinical picture and belong to the authorized prescribing team.",
    optionRationales: ["Correct: the nurse implements the plan and reports changes without overinterpreting one test.", "Incorrect: viral-bacterial coinfection can occur.", "Incorrect: independent discontinuation is outside LPN/VN prescribing authority.", "Incorrect: coinfection is clinically possible."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Pharmacological Therapies", clinicalReasoning: "The item prevents an increasingly common post-pandemic error: treating a viral result as automatic proof that antibacterial treatment is unnecessary.", clinicalPearl: "One positive pathogen test does not erase the rest of the patient's clinical picture.", keyTakeaway: "Do not independently stop CAP antibiotics solely because a respiratory virus is detected.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0010-9c42-4d51-8e31-000000000010", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with pneumonia and chronic heart failure has dry mucous membranes but also worsening edema. Which nursing action is best?",
    options: ["Follow the individualized fluid order and trend perfusion, lung findings, weight, intake, and urine output", "Force unlimited fluids", "Withhold all fluids forever", "Ignore urine output because the infection is in the lungs"],
    correctAnswer: 0,
    correctAnswerExplanation: "Fluid management must balance dehydration/perfusion needs against heart-failure congestion. Frequent reassessment guides safe implementation of the ordered plan.",
    optionRationales: ["Correct: the patient has competing fluid risks that require individualized monitoring.", "Incorrect: unlimited fluid can worsen congestion.", "Incorrect: absolute fluid withholding can worsen dehydration and perfusion if not indicated.", "Incorrect: urine output helps assess hydration and perfusion."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The learner resists a generic 'push fluids' response in a comorbid patient.", clinicalPearl: "Pneumonia hydration must fit the patient, not a slogan.", keyTakeaway: "Balance hydration with heart-failure fluid-overload risk.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0011-9c42-4d51-8e31-000000000011", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with CAP has pleuritic chest discomfort and fever. Which intervention can improve ventilation and secretion clearance?",
    options: ["Give prescribed analgesic/antipyretic therapy and then encourage deep breathing, coughing, and activity as tolerated", "Withhold pain control so the respiratory rate stays elevated", "Keep the patient motionless until all sputum stops", "Suppress all coughing regardless of retained secretions"],
    correctAnswer: 0,
    correctAnswerExplanation: "Treating pain and fever can reduce splinting and allow deeper breathing, effective cough, sleep, and progressive mobility.",
    optionRationales: ["Correct: symptom control can directly support pulmonary hygiene.", "Incorrect: untreated pleuritic pain can cause shallow breathing.", "Incorrect: prolonged immobility worsens deconditioning and complication risk.", "Incorrect: indiscriminate cough suppression can impair secretion clearance."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "Comfort and pulmonary function are connected, not separate priorities.", clinicalPearl: "Pain control can help the patient take the deep breath you are asking for.", keyTakeaway: "Treat pleuritic pain and fever to support ventilation and mobility.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0012-9c42-4d51-8e31-000000000012", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which statement about sputum color in CAP is most accurate?",
    options: ["Color alone cannot reliably determine whether pneumonia is bacterial", "Green sputum always proves bacterial pneumonia", "Clear sputum always excludes pneumonia", "Sputum color alone determines the antibiotic regimen"],
    correctAnswer: 0,
    correctAnswerExplanation: "Purulent sputum can occur with airway inflammation and is not sufficiently specific to identify bacterial etiology by itself.",
    optionRationales: ["Correct: the full clinical assessment and indicated diagnostic testing matter.", "Incorrect: green sputum is not definitive proof of bacterial infection.", "Incorrect: pneumonia can occur with clear sputum or no sputum.", "Incorrect: antibiotic decisions incorporate severity, comorbidity, exposure, allergy, and resistant-pathogen risk."],
    difficulty: 3, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The nurse corrects a common oversimplification and supports antimicrobial stewardship.", clinicalPearl: "Sputum color is a clue, not a culture result.", keyTakeaway: "Do not diagnose bacterial CAP from sputum color alone.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0013-9c42-4d51-8e31-000000000013", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient asks what to do with leftover antibiotics after completing the prescribed CAP regimen. Which response is best?",
    options: ["Do not save or share them; follow pharmacy or local disposal guidance", "Keep them to self-treat the next cough", "Give them to a family member with fever", "Take extra doses whenever tired"],
    correctAnswer: 0,
    correctAnswerExplanation: "Leftover antibiotics should not be saved for self-diagnosis or shared. Future respiratory symptoms may not be bacterial and may require a different agent, dose, or no antibiotic at all.",
    optionRationales: ["Correct: safe disposal and no sharing support antimicrobial stewardship.", "Incorrect: a future cough may be viral or require a different evaluation.", "Incorrect: sharing prescription medication is unsafe.", "Incorrect: antibiotic dosing should follow the prescribed schedule, not nonspecific symptoms."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The item tests concrete stewardship behavior after discharge.", clinicalPearl: "An old antibiotic is not a future diagnosis.", keyTakeaway: "Never save or share leftover antibiotics.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0014-9c42-4d51-8e31-000000000014", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which change in a patient with CAP should prompt urgent evaluation for a pleural complication such as empyema or enlarging effusion?",
    options: ["Persistent fever with worsening dyspnea and increasing unilateral pleuritic findings despite treatment", "Steady improvement in oxygen needs", "Decreasing fever and better appetite", "Improved mobility"],
    correctAnswer: 0,
    correctAnswerExplanation: "Failure to improve or worsening respiratory/pleuritic findings can indicate a complication such as parapneumonic effusion or empyema and should be escalated for reassessment and imaging.",
    optionRationales: ["Correct: persistent systemic illness plus localized pleural worsening suggests a complication.", "Incorrect: improving oxygen need is reassuring.", "Incorrect: falling fever and improved appetite suggest response.", "Incorrect: improved mobility is a recovery sign, not a pleural-complication cue."],
    difficulty: 4, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Reduction of Risk Potential", clinicalReasoning: "The nurse recognizes treatment failure rather than waiting for a dramatic collapse.", clinicalPearl: "Pneumonia that is not turning the corner may be hiding a pleural complication.", keyTakeaway: "Escalate persistent fever and worsening pleuritic/respiratory findings despite therapy.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0015-9c42-4d51-8e31-000000000015", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient with CAP has a urine output of 15 mL/hr for several hours and blood pressure is falling. What is the priority?",
    options: ["Report possible impaired perfusion and sepsis-related organ dysfunction immediately", "Document the finding as expected from pneumonia", "Wait until the patient stops urinating completely", "Give a diuretic without an order"],
    correctAnswer: 0,
    correctAnswerExplanation: "Marked oliguria with hypotension suggests inadequate renal perfusion and possible sepsis-related organ dysfunction and requires urgent intervention.",
    optionRationales: ["Correct: the combined trend indicates systemic deterioration.", "Incorrect: oliguria with hypotension is not an expected benign pneumonia finding.", "Incorrect: waiting for complete anuria delays care.", "Incorrect: an unsupervised diuretic could worsen perfusion and is outside scope."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Physiological Integrity", clientNeedsSubcategory: "Physiological Adaptation", clinicalReasoning: "The learner recognizes urine output as a circulation and organ-perfusion signal.", clinicalPearl: "In severe infection, urine output is a perfusion vital sign.", keyTakeaway: "Escalate oliguria with hypotension.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0016-9c42-4d51-8e31-000000000016", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient asks what a chest x-ray contributes to the CAP evaluation. Which response is most accurate?",
    options: ["It can show pulmonary infiltrates and complications and help distinguish pneumonia from other causes of symptoms", "It identifies the exact organism in every case", "It replaces physical assessment", "It selects the antibiotic without any other information"],
    correctAnswer: 0,
    correctAnswerExplanation: "Chest imaging supports the diagnosis and may reveal complications or alternate conditions, but organism identification and treatment selection require additional clinical information.",
    optionRationales: ["Correct: imaging adds anatomic evidence to the clinical assessment.", "Incorrect: an x-ray cannot identify the causative organism in every pneumonia.", "Incorrect: assessment and vital signs remain essential.", "Incorrect: antibiotic choice is not determined by imaging alone."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The learner explains the purpose and limitations of a common diagnostic test.", clinicalPearl: "Imaging shows the lung pattern; microbiology answers a different question.", keyTakeaway: "Chest imaging supports CAP diagnosis and complication detection.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0017-9c42-4d51-8e31-000000000017", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "A patient recovering from CAP has been mostly bedbound. Which intervention is best?",
    options: ["Advance mobility gradually as tolerated while monitoring dyspnea, oxygenation, and hemodynamic response", "Maintain strict bed rest until every chest x-ray abnormality disappears", "Force rapid ambulation without assessment", "Avoid movement because it spreads lung infection"],
    correctAnswer: 0,
    correctAnswerExplanation: "Progressive mobility limits deconditioning and supports recovery but should be matched to respiratory and cardiovascular tolerance.",
    optionRationales: ["Correct: graded mobility balances recovery and safety.", "Incorrect: radiographic clearing may lag clinical recovery and prolonged bed rest causes harm.", "Incorrect: unmonitored rapid exertion can provoke instability.", "Incorrect: mobility does not spread pneumonia through the lung."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The nurse promotes function without ignoring physiologic tolerance.", clinicalPearl: "Clinical recovery usually leads radiographic recovery.", keyTakeaway: "Use graded mobility as the patient stabilizes.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0018-9c42-4d51-8e31-000000000018", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which meal-time action is safest for a patient with dysphagia and an established swallowing plan after aspiration pneumonia?",
    options: ["Position upright and follow the ordered texture and liquid-consistency recommendations", "Feed while lying flat", "Ignore the swallowing plan if the patient is hungry", "Rush bites and sips to shorten the meal"],
    correctAnswer: 0,
    correctAnswerExplanation: "Upright positioning and adherence to the individualized swallowing plan reduce aspiration risk and support safer oral intake.",
    optionRationales: ["Correct: the intervention follows evaluated swallowing needs.", "Incorrect: supine feeding increases aspiration risk.", "Incorrect: hunger does not make unsafe swallowing safe.", "Incorrect: rushing can impair coordination and increase aspiration risk."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Safe and Effective Care Environment", clientNeedsSubcategory: "Safety and Infection Control", clinicalReasoning: "The LPN/VN implements the established plan rather than independently changing consistency.", clinicalPearl: "Every meal is part of aspiration prevention.", keyTakeaway: "Use upright positioning and the prescribed swallowing plan.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0019-9c42-4d51-8e31-000000000019", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which discharge teaching can reduce future pneumonia risk in an older adult?",
    options: ["Stay current with recommended vaccinations, avoid tobacco, use good hand hygiene, and manage chronic disease", "Avoid all vaccines", "Resume smoking once antibiotics are completed", "Stop diabetes care because pneumonia has resolved"],
    correctAnswer: 0,
    correctAnswerExplanation: "Vaccination, tobacco avoidance, infection prevention, and chronic-disease management can reduce respiratory infection risk and severity.",
    optionRationales: ["Correct: prevention combines immunization, exposure reduction, and health maintenance.", "Incorrect: appropriate vaccines reduce risk from important respiratory pathogens.", "Incorrect: smoking increases respiratory infection risk and lung injury.", "Incorrect: chronic-disease control remains important after pneumonia."],
    difficulty: 2, cognitiveLevel: "application", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The learner moves from acute treatment to prevention of recurrence.", clinicalPearl: "Discharge is a good time to close vaccination and tobacco-risk gaps.", keyTakeaway: "Reinforce vaccination, tobacco avoidance, hygiene, and chronic-disease control.", references: [CDC_RESPIRATORY_PREVENTION, NCLEX_PN_2026]
  },
  {
    id: "us-cap-0020-9c42-4d51-8e31-000000000020", servingTier: "rpn", pathway: "US-PN", exam: "NCLEX-PN", regionScope: "US", countryCode: "US", licensingBody: "NCSBN", bodySystem: "Respiratory", topic: "Community-Acquired Pneumonia", questionType: "multiple_choice",
    stem: "Which patient statement after CAP discharge requires immediate correction?",
    options: ["I will seek care for worsening shortness of breath, confusion, fainting, or increasing oxygen need", "I will use my medications exactly as prescribed", "I will give leftover antibiotics to my spouse if they start coughing", "I will rebuild activity gradually as I recover"],
    correctAnswer: 2,
    correctAnswerExplanation: "Prescription antibiotics should not be shared. A spouse's cough may be caused by a virus or a different illness and may require different treatment or no antibiotic.",
    optionRationales: ["Incorrect option: this is appropriate red-flag teaching.", "Incorrect option: adherence to the prescribed plan is appropriate.", "Correct: sharing leftover antibiotics is unsafe and undermines antimicrobial stewardship.", "Incorrect option: progressive recovery activity is appropriate when tolerated."],
    difficulty: 3, cognitiveLevel: "analysis", clientNeedsCategory: "Health Promotion and Maintenance", clientNeedsSubcategory: "Health Promotion and Maintenance", clinicalReasoning: "The learner detects unsafe medication-sharing behavior embedded among sound discharge statements.", clinicalPearl: "Never turn one patient's prescription into another person's treatment plan.", keyTakeaway: "Do not share antibiotics; seek care for recurrent respiratory or mental-status deterioration.", references: [IDSA_ATS_CAP, NCLEX_PN_2026]
  }
];

if (pnUsPneumoniaNclexBankBatch1.length !== 20) throw new Error(`PN_US_PNEUMONIA_BATCH1_COUNT_INVALID: ${pnUsPneumoniaNclexBankBatch1.length}`);
for (const question of pnUsPneumoniaNclexBankBatch1) {
  if (question.options.length !== 4 || question.optionRationales.length !== 4) throw new Error(`PN_US_PNEUMONIA_RATIONALE_CONTRACT_INVALID: ${question.id}`);
  if (question.correctAnswer < 0 || question.correctAnswer >= 4) throw new Error(`PN_US_PNEUMONIA_ANSWER_CONTRACT_INVALID: ${question.id}`);
  if (question.difficulty > 4) throw new Error(`PN_US_PNEUMONIA_DIFFICULTY_INVALID: ${question.id}`);
}
