const sampleQuestions = [
  {
    tier: "rpn",
    bodySystem: "Cardiovascular",
    lessonId: "heart-failure",
    question: "A client with heart failure reports waking up at night gasping for air. What is the priority nursing action?",
    options: ["Administer oxygen as ordered", "Place the client in high Fowler's position", "Notify the physician immediately", "Auscultate lung sounds"],
    correct: 1,
    rationale: "Paroxysmal nocturnal dyspnea (PND) in heart failure is caused by fluid redistribution when lying flat. The priority nursing action is to place the client in high Fowler's position to reduce venous return, decrease preload, and improve respiratory function. While assessing lung sounds and administering oxygen are important, positioning is the immediate intervention that provides the fastest relief."
  },
  {
    tier: "rpn",
    bodySystem: "Respiratory",
    lessonId: "pneumonia",
    question: "Which assessment finding in a client with pneumonia should the nurse report immediately?",
    options: ["Temperature of 38.2C (100.8F)", "Oxygen saturation of 88%", "Productive cough with green sputum", "Respiratory rate of 22 breaths per minute"],
    correct: 1,
    rationale: "An oxygen saturation of 88% is below the normal range (95-100%) and indicates significant hypoxemia requiring immediate intervention. While fever, productive cough with colored sputum, and mild tachypnea are expected findings in pneumonia, an SpO2 below 90% signals inadequate oxygenation and is a priority to report to the healthcare provider."
  },
  {
    tier: "rpn",
    bodySystem: "Neurological",
    lessonId: "stroke-cva",
    question: "When assessing a client suspected of having a stroke, which tool does the nurse use for rapid evaluation?",
    options: ["Glasgow Coma Scale", "FAST assessment", "NIH Stroke Scale", "Mini-Mental State Exam"],
    correct: 1,
    rationale: "The FAST assessment (Face drooping, Arm weakness, Speech difficulty, Time to call emergency services) is the standard rapid screening tool for stroke identification. While the NIH Stroke Scale provides comprehensive stroke severity scoring, FAST is designed for initial rapid evaluation by nurses and the public to ensure the fastest possible response and treatment initiation."
  },
  {
    tier: "rpn",
    bodySystem: "Gastrointestinal",
    lessonId: "gi-bleeding",
    question: "A client presents with dark, tarry stools. What does this finding most likely indicate?",
    options: ["Lower GI bleeding", "Upper GI bleeding", "Iron supplement side effect", "Normal stool variation"],
    correct: 1,
    rationale: "Dark, tarry stools (melena) indicate upper gastrointestinal bleeding. Blood from the upper GI tract (esophagus, stomach, or duodenum) is digested by gastric acid and intestinal enzymes as it passes through the bowel, producing the characteristic black, sticky, tar-like appearance. Lower GI bleeding typically presents with bright red blood (hematochezia)."
  },
  {
    tier: "rn",
    bodySystem: "Cardiovascular",
    lessonId: "myocardial-infarction-rn",
    question: "A client experiencing an acute MI has been prescribed morphine. Which effect of morphine is most therapeutic in this situation?",
    options: ["Analgesic effect reducing chest pain", "Vasodilation reducing preload and afterload", "Sedation to reduce anxiety", "Suppression of cough reflex"],
    correct: 1,
    rationale: "While morphine provides pain relief, its most therapeutic effect in acute MI is vasodilation, which reduces both preload (venous return) and afterload (systemic vascular resistance). This decreases myocardial oxygen demand, limits infarct size, and reduces the workload on the damaged heart. This is why morphine remains part of the MONA protocol (Morphine, Oxygen, Nitroglycerin, Aspirin) for acute coronary syndrome management."
  },
  {
    tier: "rn",
    bodySystem: "Endocrine",
    lessonId: "diabetic-ketoacidosis-rn",
    question: "A client with DKA has a blood glucose of 32 mmol/L and potassium of 3.2 mEq/L. What should the nurse administer first?",
    options: ["Regular insulin IV bolus", "Potassium chloride IV infusion", "Sodium bicarbonate IV push", "Normal saline bolus"],
    correct: 1,
    rationale: "In DKA, potassium must be corrected before or simultaneously with insulin administration. Insulin drives potassium into cells, which can cause life-threatening hypokalemia if potassium is already low. A potassium level of 3.2 mEq/L is below normal (3.5-5.0 mEq/L), making potassium replacement the priority intervention. Administering insulin without addressing hypokalemia could lead to fatal cardiac dysrhythmias."
  },
  {
    tier: "rn",
    bodySystem: "Respiratory",
    lessonId: "ards-rn",
    question: "Which ventilator setting is most important to monitor in a client with ARDS to prevent ventilator-induced lung injury?",
    options: ["FiO2 concentration", "Plateau pressure (Pplat)", "Respiratory rate", "PEEP level"],
    correct: 1,
    rationale: "Plateau pressure (Pplat) reflects the pressure in the alveoli at end-inspiration and is the key indicator of overdistension risk. In ARDS, maintaining Pplat below 30 cmH2O is critical to prevent ventilator-induced lung injury (VILI), specifically volutrauma and barotrauma. While FiO2, PEEP, and respiratory rate are all important settings, Pplat directly correlates with alveolar stress and is the primary parameter that guides protective lung ventilation strategies."
  },
  {
    tier: "np",
    bodySystem: "Cardiovascular",
    lessonId: "heart-failure-np",
    question: "An NP is managing a patient with HFrEF (EF 30%). Which medication combination represents current guideline-directed medical therapy?",
    options: [
      "ACE inhibitor + beta-blocker + loop diuretic",
      "ARNI + beta-blocker + MRA + SGLT2 inhibitor",
      "ARB + calcium channel blocker + thiazide diuretic",
      "Digoxin + ACE inhibitor + hydralazine"
    ],
    correct: 1,
    rationale: "Current ACC/AHA guidelines recommend the 'four pillars' of HFrEF treatment: ARNI (sacubitril/valsartan), beta-blocker (carvedilol, bisoprolol, or sustained-release metoprolol), mineralocorticoid receptor antagonist (MRA - spironolactone or eplerenone), and SGLT2 inhibitor (dapagliflozin or empagliflozin). This combination has demonstrated the greatest reduction in heart failure hospitalizations and cardiovascular mortality compared to any previous treatment regimen."
  },
  {
    tier: "np",
    bodySystem: "Endocrine",
    lessonId: "thyroid-np",
    question: "A patient presents with a TSH of 12 mIU/L and free T4 of 8 pmol/L. As an NP, what is the most appropriate initial management?",
    options: [
      "Start levothyroxine 100 mcg daily",
      "Start levothyroxine 25-50 mcg daily with follow-up in 6-8 weeks",
      "Order thyroid ultrasound before treatment",
      "Repeat labs in 3 months as this may be transient"
    ],
    correct: 1,
    rationale: "The lab results indicate overt hypothyroidism (elevated TSH, low free T4). The NP should initiate levothyroxine at a conservative starting dose of 25-50 mcg daily, particularly important to avoid cardiac complications. Follow-up TSH should be checked in 6-8 weeks to guide dose titration, as thyroid hormone has a long half-life and steady state requires 4-6 weeks. Starting at full replacement doses (100+ mcg) risks cardiac adverse effects, especially in older adults or those with cardiovascular disease."
  },
  {
    tier: "rpn",
    bodySystem: "Renal",
    lessonId: "acute-kidney-injury",
    question: "A client with acute kidney injury has a potassium level of 6.5 mEq/L. Which ECG change should the nurse monitor for?",
    options: ["Prolonged QT interval", "Peaked T waves", "ST segment depression", "U waves"],
    correct: 1,
    rationale: "Hyperkalemia (potassium above 5.0 mEq/L) causes characteristic peaked (tall, narrow, symmetrical) T waves on ECG. At levels above 6.0 mEq/L, the risk of lethal cardiac dysrhythmias increases significantly. Progressive hyperkalemia leads to widened QRS complexes, flattened P waves, and eventually a sine wave pattern preceding cardiac arrest. Immediate treatment with calcium gluconate for cardiac membrane stabilization and insulin/glucose for intracellular potassium shift is essential."
  },
  {
    tier: "rpn",
    bodySystem: "Hematology",
    lessonId: "anemia",
    question: "A client is receiving a blood transfusion. Which sign indicates a transfusion reaction requiring the nurse to stop the infusion immediately?",
    options: ["Slight increase in temperature of 0.5C", "Back pain and chills", "Anxiety about the procedure", "Mild itching at the IV site"],
    correct: 1,
    rationale: "Back pain (particularly flank or lumbar pain) combined with chills is a hallmark sign of an acute hemolytic transfusion reaction, which occurs when ABO-incompatible blood is transfused. The hemolysis causes hemoglobin to be released, which damages renal tubules, causing flank pain. The nurse must immediately stop the transfusion, keep the IV line open with normal saline, and notify the physician. A slight temperature rise (less than 1C) without other symptoms may indicate a febrile non-hemolytic reaction, which is less severe."
  },
  {
    tier: "rn",
    bodySystem: "Neurological",
    lessonId: "increased-icp-rn",
    question: "A client with a traumatic brain injury has an ICP of 25 mmHg. Which nursing intervention should be avoided?",
    options: ["Elevating the head of bed to 30 degrees", "Suctioning the airway for more than 15 seconds at a time", "Administering mannitol as ordered", "Maintaining the neck in neutral alignment"],
    correct: 1,
    rationale: "Prolonged suctioning (beyond 10-15 seconds) stimulates the cough reflex and increases intrathoracic pressure, which impedes venous drainage from the brain and further elevates ICP. Normal ICP is 5-15 mmHg, so 25 mmHg is significantly elevated. All other options are appropriate interventions: head elevation promotes venous drainage, mannitol is an osmotic diuretic that reduces cerebral edema, and neutral neck alignment prevents jugular vein compression that could increase ICP."
  },
  {
    tier: "rpn",
    bodySystem: "Maternity",
    lessonId: "preeclampsia",
    question: "A pregnant client at 34 weeks gestation has a blood pressure of 160/110 mmHg and 3+ proteinuria. Which medication should the nurse anticipate administering?",
    options: ["Oxytocin", "Magnesium sulfate", "Methylergonovine", "Terbutaline"],
    correct: 1,
    rationale: "This client presents with severe preeclampsia (BP 160/110+ with significant proteinuria). Magnesium sulfate is the first-line medication for seizure prophylaxis in severe preeclampsia and eclampsia. It acts as a central nervous system depressant and smooth muscle relaxant, raising the seizure threshold. The therapeutic magnesium level is 4-7 mEq/L. The nurse must monitor for signs of magnesium toxicity: loss of deep tendon reflexes, respiratory depression (below 12/min), and decreased urine output (below 30 mL/hr)."
  },
  {
    tier: "rn",
    bodySystem: "Pediatrics",
    lessonId: "pediatric-asthma-rn",
    question: "A 7-year-old with asthma has a peak flow reading in the yellow zone (50-80% of personal best). What action should the nurse take?",
    options: [
      "Continue current medications and recheck in 1 hour",
      "Administer short-acting bronchodilator (SABA) per action plan",
      "Call 911 immediately",
      "Start oral corticosteroids"
    ],
    correct: 1,
    rationale: "The yellow zone (50-80% of personal best) in the traffic light asthma action plan indicates caution. The appropriate intervention is to administer a short-acting beta2-agonist (SABA) such as albuterol/salbutamol via metered-dose inhaler with spacer, as outlined in the child's asthma action plan. If peak flow does not return to the green zone (80-100%) after SABA administration, the action plan may call for additional interventions. The red zone (below 50%) requires immediate emergency action."
  },
  {
    tier: "np",
    bodySystem: "Dermatology",
    lessonId: "psoriasis-np",
    question: "An NP is evaluating a patient with moderate-to-severe plaque psoriasis who has failed topical therapy. What is the most appropriate next step in management?",
    options: [
      "Increase topical corticosteroid potency",
      "Initiate phototherapy or systemic therapy (methotrexate)",
      "Refer to dermatology and defer treatment",
      "Add oral antihistamines for symptom control"
    ],
    correct: 1,
    rationale: "For moderate-to-severe plaque psoriasis refractory to topical therapy, the NP should escalate to phototherapy (narrowband UVB) or systemic therapy. Methotrexate is a first-line systemic agent that inhibits dihydrofolate reductase, suppressing the rapid keratinocyte proliferation and T-cell-mediated inflammation that characterize psoriasis. Before initiation, baseline labs including CBC, hepatic function, renal function, and pregnancy testing are required. Hepatotoxicity monitoring with serial liver function tests is essential during treatment."
  },
  {
    tier: "rpn",
    bodySystem: "Infection Control",
    lessonId: "mrsa-infection",
    question: "A client is diagnosed with MRSA wound infection. Which personal protective equipment (PPE) is required before entering the room?",
    options: ["Gloves only", "Gown and gloves", "N95 respirator and gloves", "Full PPE including face shield"],
    correct: 1,
    rationale: "MRSA (Methicillin-Resistant Staphylococcus aureus) wound infections require contact precautions, which include gown and gloves before entering the client's room. MRSA is transmitted through direct contact with infected wounds or contaminated surfaces. An N95 respirator would be required for airborne precautions (TB, measles, varicella), not contact precautions. Hand hygiene before and after contact remains critical. The client should ideally be in a private room."
  },
  {
    tier: "rn",
    bodySystem: "Oncology",
    lessonId: "chemotherapy-rn",
    question: "A client receiving chemotherapy has an absolute neutrophil count (ANC) of 400/mm3. What is the priority nursing intervention?",
    options: ["Encourage increased fluid intake", "Initiate neutropenic precautions", "Administer antipyretics prophylactically", "Discontinue chemotherapy permanently"],
    correct: 1,
    rationale: "An ANC below 500/mm3 indicates severe neutropenia, placing the client at high risk for life-threatening infections. Neutropenic precautions include: private room, strict hand hygiene, no fresh flowers or raw fruits/vegetables, no rectal temperatures, daily skin assessments, and monitoring for subtle signs of infection (low-grade fever may be the only sign as the inflammatory response is blunted). Any temperature above 38C (100.4F) in a neutropenic client is a medical emergency requiring immediate blood cultures and broad-spectrum antibiotics."
  },
  {
    tier: "rpn",
    bodySystem: "Emergency",
    lessonId: "anaphylaxis",
    question: "A client develops anaphylaxis after receiving an antibiotic. Which medication is the nurse's first priority to administer?",
    options: ["Diphenhydramine (Benadryl) IV", "Epinephrine IM (intramuscular)", "Methylprednisolone (Solu-Medrol) IV", "Albuterol nebulizer"],
    correct: 1,
    rationale: "Epinephrine IM is the first-line, life-saving medication for anaphylaxis. It acts on alpha-1 receptors to cause vasoconstriction (reversing hypotension), beta-1 receptors to increase heart rate and contractility, and beta-2 receptors to cause bronchodilation. It is administered intramuscularly in the mid-outer thigh (vastus lateralis) for fastest absorption. Antihistamines and corticosteroids are adjunct therapies but do not reverse the immediate life-threatening cardiovascular collapse and airway obstruction of anaphylaxis."
  },
  {
    tier: "rpn",
    bodySystem: "Mental Health",
    lessonId: "depression-assessment",
    question: "A client with major depressive disorder suddenly appears cheerful and begins giving away personal possessions. What should the nurse's priority concern be?",
    options: ["The client is recovering from depression", "The client may be planning suicide", "The client is experiencing a manic episode", "The client is seeking attention"],
    correct: 1,
    rationale: "A sudden mood improvement in a depressed client, especially accompanied by giving away possessions, is a critical warning sign for imminent suicide risk. The client may have made a decision to attempt suicide and feels relieved or at peace with the decision. Giving away belongings is a form of 'putting affairs in order.' The nurse must immediately conduct a thorough suicide risk assessment, implement one-to-one observation, remove potentially harmful items from the environment, and notify the healthcare team."
  },
  {
    tier: "rn",
    bodySystem: "Pharmacology",
    lessonId: "anticoagulant-therapy-rn",
    question: "A client on warfarin has an INR of 5.2 with no active bleeding. What is the most appropriate nursing action?",
    options: [
      "Administer vitamin K 10 mg IV immediately",
      "Hold warfarin and notify the prescriber",
      "Administer fresh frozen plasma",
      "Continue current dose and recheck INR tomorrow"
    ],
    correct: 1,
    rationale: "An INR of 5.2 is supratherapeutic (therapeutic range typically 2.0-3.0) and increases bleeding risk significantly. Without active bleeding, the most appropriate action is to hold warfarin and notify the prescriber for further orders. High-dose IV vitamin K is reserved for active bleeding or INR above 9-10. Fresh frozen plasma is used for critical bleeding with coagulopathy. Simply rechecking tomorrow without holding the medication allows the INR to rise further, increasing hemorrhage risk."
  },
];

export function buildQuestionPoolServer() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % sampleQuestions.length;
  return sampleQuestions[index];
}
