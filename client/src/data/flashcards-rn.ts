import type { FlashcardData } from "./flashcards-rpn";

export const rnFlashcards: FlashcardData[] = [
  // ============================================================
  // CARDIOVASCULAR (20 cards)
  // ============================================================
  {
    id: "rn-cv-q1",
    type: "question",
    question: "A client with acute STEMI has just received alteplase (tPA). Which assessment finding requires the MOST immediate nursing intervention?",
    options: ["Blood pressure 148/92 mmHg", "Oozing from the IV insertion site", "Sudden onset severe headache with altered mental status", "Heart rate of 56 bpm"],
    correctIndex: 2,
    answer: "Sudden severe headache with altered mental status after tPA administration suggests intracranial hemorrhage, the most lethal complication of thrombolytic therapy. The nurse must stop the infusion immediately, obtain a stat CT scan, and prepare for emergency intervention. This takes priority over mild bleeding from IV sites or hemodynamic changes.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q2",
    type: "question",
    question: "A nurse is caring for a client with a temporary transvenous pacemaker. The client's heart rate drops to 32 bpm and the pacemaker is not capturing. What is the priority action?",
    options: ["Increase the milliampere (mA) output on the pacemaker", "Prepare for immediate defibrillation", "Administer IV atropine 0.5 mg", "Reposition the client to the left lateral position"],
    correctIndex: 0,
    answer: "When a temporary pacemaker fails to capture (pacing spikes present without QRS response), increasing the mA output increases the electrical current delivered to the myocardium, which may restore capture. If increasing output fails, checking lead connections, repositioning the client, and notifying the physician are next steps. Atropine may be used as a bridge but does not fix the capture problem.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q3",
    type: "question",
    question: "A client post-cardiac catheterization via the femoral artery reports severe back pain and the nurse notes a firm, pulsatile mass in the groin. What does the nurse suspect?",
    options: ["Normal post-procedure discomfort", "Retroperitoneal hemorrhage", "Deep vein thrombosis formation", "Pseudoaneurysm at the insertion site"],
    correctIndex: 3,
    answer: "A pulsatile mass at the femoral puncture site after cardiac catheterization suggests a pseudoaneurysm, where blood leaks through the arterial wall into a contained space. Back pain may indicate retroperitoneal extension. The nurse should assess vital signs, mark the mass borders, apply manual pressure, and notify the cardiologist urgently. Ultrasound-guided compression or surgical repair may be needed.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q4",
    type: "question",
    question: "A client with heart failure is receiving a milrinone infusion. Which assessment finding indicates a therapeutic response?",
    options: ["Increased blood pressure from 88/60 to 130/85", "Decreased heart rate from 110 to 82 with improved urine output", "Resolution of peripheral neuropathy", "Decreased respiratory rate without change in oxygen saturation"],
    correctIndex: 1,
    answer: "Milrinone is a phosphodiesterase-3 inhibitor that provides both inotropic (increased contractility) and vasodilatory effects. A therapeutic response is improved cardiac output demonstrated by: decreased compensatory tachycardia, improved urine output (better renal perfusion), improved mental status, and decreased pulmonary congestion. Unlike dobutamine, milrinone may actually decrease blood pressure due to vasodilation.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q5",
    type: "question",
    question: "A client with aortic stenosis is scheduled for aortic valve replacement. Which preoperative finding is most concerning?",
    options: ["Systolic crescendo-decrescendo murmur", "Syncope on exertion", "Slow-rising carotid pulse (pulsus parvus et tardus)", "S4 heart sound"],
    correctIndex: 1,
    answer: "Syncope on exertion in aortic stenosis indicates that the left ventricle cannot increase cardiac output to meet exercise demands, causing cerebral hypoperfusion. This is one of the classic triad of aortic stenosis symptoms (angina, syncope, heart failure) and signals severe disease with increased risk of sudden cardiac death. Urgent surgical referral is warranted.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q6",
    type: "question",
    question: "A nurse is interpreting a 12-lead ECG. The rhythm is regular at 150 bpm, there are no discernible P waves, and the QRS complexes are narrow. What is the most likely rhythm?",
    options: ["Sinus tachycardia", "Atrial flutter with 2:1 block", "Ventricular tachycardia", "Atrial fibrillation with rapid ventricular response"],
    correctIndex: 1,
    answer: "A regular narrow-complex tachycardia at exactly 150 bpm with no visible P waves is highly suggestive of atrial flutter with 2:1 conduction. The atrial rate is typically 300 bpm, and with every other impulse conducted, the ventricular rate is 150 bpm. Flutter waves may be hidden in the T waves. A rate of exactly 150 should always raise suspicion for atrial flutter.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q7",
    type: "question",
    question: "A client with an AICD (automatic implantable cardioverter-defibrillator) reports receiving three shocks in the past hour. What is the priority nursing action?",
    options: ["Tell the client this is normal and monitor at home", "Advise the client to come to the ED immediately for device interrogation", "Place a magnet over the device to disable it permanently", "Administer amiodarone by mouth"],
    correctIndex: 1,
    answer: "Multiple AICD shocks (electrical storm) require immediate evaluation. The shocks may be appropriate (recurrent life-threatening arrhythmias) or inappropriate (device malfunction, lead fracture). The client needs urgent ED evaluation with device interrogation, continuous cardiac monitoring, and possibly IV amiodarone or lidocaine. A magnet can temporarily inhibit therapy but should be used by trained personnel only.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q8",
    type: "question",
    question: "A client with acute decompensated heart failure is receiving IV nitroglycerin. The nurse notes the blood pressure has dropped from 118/72 to 82/50. What is the priority action?",
    options: ["Stop the nitroglycerin infusion and lower the head of bed", "Administer a fluid bolus of 500 mL normal saline", "Continue the infusion at the same rate and recheck in 15 minutes", "Switch to an oral nitrate formulation"],
    correctIndex: 0,
    answer: "Significant hypotension during IV nitroglycerin infusion requires immediately stopping the infusion. Nitroglycerin causes venous and arterial dilation, reducing preload and afterload. Lowering the head of bed (if respiratory status allows) helps increase venous return. Fluid bolus may be cautious in heart failure as it could worsen pulmonary congestion. Reassess vital signs frequently after stopping the drip.",
    category: "Cardiovascular",
    difficulty: 2
  },
  {
    id: "rn-cv-q9",
    type: "question",
    question: "A client with pericarditis reports chest pain that worsens with deep breathing and lying flat. Which position would provide the most relief?",
    options: ["Supine with legs elevated", "Sitting upright and leaning forward", "Right lateral decubitus position", "Prone position"],
    correctIndex: 1,
    answer: "Sitting upright and leaning forward pulls the pericardium away from the epicardial surface, reducing friction between the inflamed pericardial layers and decreasing pain. The pain of pericarditis is characteristically pleuritic (worse with inspiration) and positional (worse lying flat, improved sitting forward). This differentiates it from MI pain, which is not typically positional.",
    category: "Cardiovascular",
    difficulty: 2
  },
  {
    id: "rn-cv-q10",
    type: "question",
    question: "A nurse is preparing to administer IV amiodarone to a client with ventricular tachycardia. Which consideration is most important?",
    options: ["Amiodarone must be mixed only in D5W, never in normal saline", "Amiodarone should be given through a central line when possible due to phlebitis risk", "Amiodarone requires an inline filter for administration", "All of the above are correct considerations"],
    correctIndex: 3,
    answer: "IV amiodarone requires specific administration considerations: it must be mixed in D5W (it precipitates in NS), it causes severe peripheral phlebitis so central line administration is preferred, and an inline filter (0.22 micron) is required because the drug can leach toxic plasticizers from PVC tubing. These details are critical for safe medication administration and are frequently tested on NCLEX.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q11",
    type: "question",
    question: "A client with a new diagnosis of atrial fibrillation has a CHA2DS2-VASc score of 4. Which medication does the nurse anticipate?",
    options: ["Aspirin 81 mg daily", "Clopidogrel (Plavix) 75 mg daily", "Apixaban (Eliquis) 5 mg twice daily", "No anticoagulation is needed"],
    correctIndex: 2,
    answer: "A CHA2DS2-VASc score of 4 places the client at high risk for thromboembolic stroke. Direct oral anticoagulants (DOACs) like apixaban, rivaroxaban, or edoxaban are first-line for stroke prevention in non-valvular atrial fibrillation. Aspirin alone is no longer recommended for stroke prevention in AFib. The DOAC is preferred over warfarin for most clients due to fewer drug-food interactions and no INR monitoring requirement.",
    category: "Cardiovascular",
    difficulty: 2
  },
  {
    id: "rn-cv-q12",
    type: "question",
    question: "A nurse is monitoring a client with an intra-aortic balloon pump (IABP). The nurse notices the balloon is inflating during systole. What is the consequence?",
    options: ["Improved coronary perfusion", "Decreased afterload", "Increased afterload and myocardial oxygen demand", "Enhanced cardiac output"],
    correctIndex: 2,
    answer: "The IABP should inflate during diastole (augmenting coronary perfusion and reducing afterload) and deflate during systole. If it inflates during systole, the balloon creates a mechanical obstruction the ventricle must pump against, dramatically increasing afterload and myocardial oxygen demand. This can worsen ischemia and cause hemodynamic collapse. The timing must be adjusted immediately.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q13",
    type: "question",
    question: "A client post-CABG surgery develops cardiac tamponade. Which assessment finding is most characteristic?",
    options: ["Widening pulse pressure and bounding pulses", "Beck's triad: muffled heart sounds, JVD, and hypotension", "Bilateral crackles and S3 gallop", "Kussmaul respirations and fruity breath odor"],
    correctIndex: 1,
    answer: "Beck's triad (muffled/distant heart sounds, jugular venous distension, and hypotension) is the classic presentation of cardiac tamponade. Blood or fluid in the pericardial space compresses the heart, preventing adequate filling. Other signs include pulsus paradoxus (>10 mmHg drop in systolic BP during inspiration), tachycardia, and narrowing pulse pressure. Emergency pericardiocentesis is required.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q14",
    type: "question",
    question: "A nurse is caring for a client with suspected acute aortic dissection. Which intervention is the MOST critical?",
    options: ["Prepare the client for emergency cardiac catheterization", "Administer IV esmolol to rapidly reduce heart rate and blood pressure", "Start IV heparin for anticoagulation", "Encourage the client to ambulate to prevent DVT"],
    correctIndex: 1,
    answer: "In acute aortic dissection, the priority is aggressive blood pressure and heart rate reduction to decrease aortic wall shear stress and prevent dissection propagation. IV beta-blockers (esmolol, labetalol) are first-line. Target heart rate is below 60 bpm and systolic BP below 120 mmHg. Anticoagulation (heparin) is CONTRAINDICATED as it can worsen bleeding. Catheterization may be needed for type A dissection.",
    category: "Cardiovascular",
    difficulty: 3
  },
  {
    id: "rn-cv-q15",
    type: "question",
    question: "A nurse is interpreting hemodynamic readings from a pulmonary artery catheter. PCWP is 28 mmHg, CVP is 14 mmHg, cardiac index is 1.8 L/min/m², and SVR is 2,200 dyn·s/cm⁵. What type of shock do these readings suggest?",
    options: ["Hypovolemic shock", "Cardiogenic shock", "Septic shock (warm phase)", "Neurogenic shock"],
    correctIndex: 1,
    answer: "Elevated PCWP (normal 6-12 mmHg), elevated CVP (normal 2-6 mmHg), low cardiac index (normal 2.5-4.0 L/min/m²), and elevated SVR (normal 800-1,200) are classic hemodynamic findings of cardiogenic shock: the heart is failing as a pump, filling pressures are high, output is low, and the body is compensating with vasoconstriction. Septic shock would show low SVR and high cardiac output.",
    category: "Cardiovascular",
    difficulty: 3
  },
  // ============================================================
  // RESPIRATORY (18 cards)
  // ============================================================
  {
    id: "rn-resp-q1",
    type: "question",
    question: "A client with ARDS has a PaO2 of 52 mmHg on 100% FiO2 via non-rebreather mask. The PaO2/FiO2 ratio is 52. What intervention does the nurse anticipate?",
    options: ["Switch to nasal cannula at 6 L/min", "Prepare for endotracheal intubation and mechanical ventilation", "Administer bronchodilators via nebulizer", "Position the client prone and continue the current oxygen delivery"],
    correctIndex: 1,
    answer: "A PaO2/FiO2 ratio below 100 on maximal supplemental oxygen indicates severe ARDS with refractory hypoxemia. The client needs endotracheal intubation and mechanical ventilation with PEEP (positive end-expiratory pressure) to recruit collapsed alveoli and improve oxygenation. Lung-protective ventilation with low tidal volumes (6 mL/kg) reduces ventilator-induced lung injury.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q2",
    type: "question",
    question: "A client on mechanical ventilation has a sudden increase in peak inspiratory pressure from 25 to 48 cmH2O with oxygen desaturation. What should the nurse assess FIRST?",
    options: ["Check the ventilator tubing for kinks or water accumulation", "Assess the client for pneumothorax or mucus plugging", "Increase the FiO2 to 100%", "Obtain a stat chest X-ray"],
    correctIndex: 1,
    answer: "A sudden increase in peak inspiratory pressure with desaturation indicates increased airway resistance or decreased compliance. The nurse should immediately assess the client: auscultate for bilateral breath sounds (absent on one side suggests pneumothorax or mainstem intubation), check for mucus plugging (suction if needed), and assess for bronchospasm. Equipment checks are important but client assessment takes priority.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q3",
    type: "question",
    question: "A nurse is caring for a client with a chest tube. Continuous bubbling is observed in the water seal chamber during both inspiration and expiration. What does this indicate?",
    options: ["Normal air evacuation from the pleural space", "An air leak in the chest tube system", "The chest tube is properly positioned and functioning", "The client has developed a hemothorax"],
    correctIndex: 1,
    answer: "Continuous bubbling in the water seal chamber during both phases of respiration indicates an air leak in the system. The nurse should systematically check connections, starting from the insertion site and working toward the drainage system. Brief, intermittent bubbling during expiration or coughing may be normal with a pneumothorax, but continuous bubbling is pathological and requires investigation.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q4",
    type: "question",
    question: "A client with COPD on long-term oxygen therapy asks why the flow rate is kept at 2 L/min. What is the best explanation?",
    options: ["Higher flow rates are always dangerous for all patients", "In chronic CO2 retainers, high oxygen can suppress the hypoxic drive, reducing respiratory stimulus", "Oxygen at higher rates causes pulmonary fibrosis", "Higher rates waste oxygen and are not more effective"],
    correctIndex: 1,
    answer: "Clients with chronic COPD may retain CO2 chronically. Their respiratory drive shifts from the normal CO2-driven stimulus to a hypoxic drive. Administering high-flow oxygen eliminates the hypoxic stimulus, potentially causing respiratory depression and CO2 narcosis. Low-flow oxygen (1-2 L/min) maintains SpO2 between 88-92%, sufficient for tissue oxygenation while preserving the hypoxic drive.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q5",
    type: "question",
    question: "A nurse is prioritizing care for four respiratory clients. Which client should be assessed FIRST?",
    options: ["Client with pneumonia and SpO2 94% on 2L NC", "Client post-thoracotomy with 150 mL chest tube drainage over 8 hours", "Client with asthma who had wheezing 1 hour ago but now has a silent chest", "Client with TB on airborne precautions requesting pain medication"],
    correctIndex: 2,
    answer: "A silent chest in an asthma client who was previously wheezing is an ominous sign indicating severe bronchoconstriction with virtually no air movement. This represents imminent respiratory failure and potential respiratory arrest. The previous wheezing has stopped not because the client improved but because airflow is now too restricted to generate the sound. Immediate intervention with bronchodilators and preparation for intubation is critical.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q6",
    type: "question",
    question: "A client is receiving continuous BiPAP (bilevel positive airway pressure) for acute exacerbation of COPD. Which finding indicates BiPAP is failing and intubation may be necessary?",
    options: ["Respiratory rate decreased from 32 to 22 breaths per minute", "ABG shows pH 7.22, PaCO2 68, PaO2 54 after 2 hours on BiPAP", "Client is more alert and interactive", "SpO2 improved from 86% to 92%"],
    correctIndex: 1,
    answer: "Worsening or persistently abnormal ABGs after 1-2 hours of BiPAP (pH still below 7.25, rising PaCO2, low PaO2) indicate BiPAP failure. The client requires endotracheal intubation and mechanical ventilation. Other signs of BiPAP failure include worsening mental status, hemodynamic instability, inability to protect the airway, or inability to tolerate the mask.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q7",
    type: "question",
    question: "A client with a tracheostomy accidentally decannulates (the tube comes out). The stoma was created 3 days ago. What is the nurse's FIRST action?",
    options: ["Attempt to reinsert the tracheostomy tube", "Call a code blue", "Ventilate via the stoma with a bag-valve mask while preparing for oral intubation", "Cover the stoma and ventilate via mouth"],
    correctIndex: 2,
    answer: "For a fresh tracheostomy (less than 7 days), the tract is not yet mature and reinsertion may create a false passage. The nurse should call for help, provide ventilation through the stoma using a pediatric mask or adaptor connected to a bag-valve mask, and prepare for oral intubation as a backup. For mature tracts (>7 days), reinsertion with an obturator may be attempted by trained staff.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q8",
    type: "question",
    question: "A nurse is caring for a client on a ventilator. The ABG results show: pH 7.48, PaCO2 30, HCO3 24, PaO2 96. What ventilator change should the nurse anticipate?",
    options: ["Increase the tidal volume", "Decrease the respiratory rate", "Increase the FiO2", "Add PEEP"],
    correctIndex: 1,
    answer: "The ABG shows respiratory alkalosis (high pH, low CO2, normal HCO3). The client is being over-ventilated, blowing off too much CO2. Decreasing the respiratory rate will retain more CO2 and normalize the pH. Alternatively, decreasing tidal volume would achieve the same effect. Increasing tidal volume or rate would worsen the alkalosis. FiO2 and PEEP adjustments address oxygenation, not ventilation.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q9",
    type: "question",
    question: "A client with a tension pneumothorax develops tracheal deviation, absent breath sounds on the affected side, and hemodynamic instability. What is the emergency intervention?",
    options: ["Stat chest X-ray before any intervention", "Needle decompression at the second intercostal space, midclavicular line on the affected side", "Chest tube insertion in the OR", "Administer bronchodilators immediately"],
    correctIndex: 1,
    answer: "Tension pneumothorax is a clinical diagnosis requiring immediate intervention without waiting for imaging. Needle decompression (large-bore needle at the 2nd intercostal space, midclavicular line) converts the tension pneumothorax to a simple pneumothorax, relieving the pressure that is shifting mediastinal structures and compressing the heart. This is followed by formal chest tube insertion.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q10",
    type: "question",
    question: "A nurse is educating a client about using a metered-dose inhaler (MDI) with a spacer. In which order should the client use their prescribed fluticasone (steroid) and albuterol (bronchodilator)?",
    options: ["Fluticasone first, then albuterol", "Albuterol first, then fluticasone after 1-2 minutes", "Either medication can be used first", "Mix both medications in one spacer"],
    correctIndex: 1,
    answer: "The bronchodilator (albuterol) should always be used first because it opens the airways, allowing the subsequent inhaled corticosteroid (fluticasone) to penetrate deeper into the lungs for better anti-inflammatory effect. Wait 1-2 minutes between medications. After using the steroid inhaler, the client must rinse the mouth to prevent oral candidiasis (thrush).",
    category: "Respiratory",
    difficulty: 1
  },
  {
    id: "rn-resp-q11",
    type: "question",
    question: "A nurse is caring for a client receiving prone positioning for severe ARDS. Which complication must the nurse monitor for most closely?",
    options: ["Pressure injuries on the face, chest, and anterior body surfaces", "Increased cardiac output", "Improved consciousness", "Decreased peak inspiratory pressures"],
    correctIndex: 0,
    answer: "Prone positioning improves oxygenation in ARDS by redistributing ventilation to dorsal lung regions, but it creates pressure injury risk on the face (especially forehead, chin, cheeks), anterior chest, iliac crests, and knees. The nurse must use appropriate padding, reposition the head every 2 hours, monitor skin integrity, secure all lines and tubes, and be prepared for emergency supine repositioning if needed.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q12",
    type: "question",
    question: "A client with community-acquired pneumonia has a sputum culture positive for Streptococcus pneumoniae. Which isolation precaution is appropriate?",
    options: ["Airborne precautions with N95 respirator", "Droplet precautions with surgical mask", "Contact precautions with gown and gloves", "Standard precautions only"],
    correctIndex: 3,
    answer: "Streptococcus pneumoniae (pneumococcal pneumonia) requires only standard precautions. It is not transmitted via the airborne route (unlike TB, which requires N95). Droplet precautions are used for Neisseria meningitidis, influenza, and pertussis. Understanding which organisms require specific isolation types is essential for NCLEX and clinical practice.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q13",
    type: "question",
    question: "A client with a pulmonary embolism is started on a heparin drip with a target aPTT of 60-80 seconds. The current aPTT is 110 seconds. What should the nurse do?",
    options: ["Continue the current infusion rate", "Hold the infusion, notify the provider, and recheck aPTT per protocol", "Administer protamine sulfate immediately", "Increase the infusion rate"],
    correctIndex: 1,
    answer: "An aPTT of 110 seconds is above the therapeutic range (60-80 seconds), indicating over-anticoagulation and increased bleeding risk. The nurse should hold the heparin infusion per protocol, notify the provider, and recheck the aPTT as ordered (typically in 4-6 hours). Protamine sulfate (heparin reversal agent) is reserved for significant bleeding. The dose will be adjusted when restarted.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q14",
    type: "question",
    question: "A nurse receives a client from the OR after a right pneumonectomy. The client should be positioned in which way?",
    options: ["On the left (non-operative) side only", "On the right (operative) side or supine", "In Trendelenburg position", "Prone to improve drainage"],
    correctIndex: 1,
    answer: "After pneumonectomy, the client should be positioned on the operative side or supine. Positioning on the operative side allows the remaining lung to fully expand on the non-operative side. The empty thoracic cavity gradually fills with serosanguineous fluid. Lying on the non-operative side could compress the remaining lung and cause respiratory compromise. Note: pneumonectomy clients do NOT have chest tubes.",
    category: "Respiratory",
    difficulty: 3
  },
  {
    id: "rn-resp-q15",
    type: "question",
    question: "A nurse is interpreting an ABG: pH 7.32, PaCO2 48, HCO3 28, PaO2 68. What acid-base disturbance does this represent?",
    options: ["Respiratory acidosis, partially compensated", "Metabolic acidosis, uncompensated", "Respiratory alkalosis, fully compensated", "Mixed respiratory and metabolic acidosis"],
    correctIndex: 0,
    answer: "The pH is acidotic (below 7.35), PaCO2 is elevated (above 45, causing the acidosis = respiratory origin), and HCO3 is elevated (above 26, compensating by retaining bicarbonate). Since pH has not returned to normal, this is partially compensated respiratory acidosis. The elevated HCO3 shows the kidneys are attempting to buffer the respiratory acid by retaining bicarbonate, but compensation is not yet complete.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q16",
    type: "question",
    question: "A client with cystic fibrosis is prescribed dornase alfa (Pulmozyme). What is the mechanism of action the nurse should explain?",
    options: ["It kills bacteria in the lungs", "It breaks down DNA in thick mucus, making secretions thinner and easier to clear", "It dilates the bronchioles", "It reduces inflammation in the airways"],
    correctIndex: 1,
    answer: "Dornase alfa is a recombinant human DNase enzyme that cleaves extracellular DNA released from neutrophils in the thick, viscous mucus of CF patients. Breaking down the DNA reduces mucus viscosity, improving airway clearance and reducing infection risk. It is administered via nebulizer daily. It does not have antimicrobial, bronchodilatory, or anti-inflammatory properties.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q17",
    type: "question",
    question: "A nurse is caring for a client who had a thoracentesis 1 hour ago. Which finding requires immediate intervention?",
    options: ["Mild discomfort at the puncture site", "Decreased breath sounds on the affected side with tachypnea and tachycardia", "Clear amber-colored fluid removed during the procedure", "Mild anxiety about the results"],
    correctIndex: 1,
    answer: "Decreased breath sounds, tachypnea, and tachycardia after thoracentesis suggest a pneumothorax, the most common procedural complication. Air entered the pleural space during the procedure. The nurse should assess oxygen saturation, notify the provider immediately, and prepare for a stat chest X-ray. A chest tube may be needed if the pneumothorax is significant.",
    category: "Respiratory",
    difficulty: 2
  },
  {
    id: "rn-resp-q18",
    type: "question",
    question: "A nurse is assessing a client with suspected pulmonary embolism. Which diagnostic test is the gold standard for confirming PE?",
    options: ["D-dimer level", "Chest X-ray", "CT pulmonary angiography (CTPA)", "Arterial blood gas"],
    correctIndex: 2,
    answer: "CT pulmonary angiography (CTPA) is the gold standard for diagnosing pulmonary embolism. It provides direct visualization of the clot in the pulmonary vasculature with high sensitivity and specificity. D-dimer is a screening tool (high sensitivity but low specificity). Chest X-ray is often normal in PE. ABG may show hypoxemia but is non-specific. V/Q scan is an alternative when CTPA is contraindicated.",
    category: "Respiratory",
    difficulty: 2
  },
  // ============================================================
  // NEUROLOGICAL (17 cards)
  // ============================================================
  {
    id: "rn-neuro-q1",
    type: "question",
    question: "A client with a subarachnoid hemorrhage develops a severe headache on day 5 post-bleed. Transcranial Doppler shows increased velocity in the middle cerebral artery. What does the nurse suspect?",
    options: ["Rebleeding of the aneurysm", "Cerebral vasospasm", "Hydrocephalus", "Seizure activity"],
    correctIndex: 1,
    answer: "Cerebral vasospasm is a major complication of subarachnoid hemorrhage, typically occurring 4-14 days post-bleed (peak at days 7-10). Increased transcranial Doppler velocities indicate narrowing of cerebral arteries. Vasospasm can cause delayed cerebral ischemia and infarction. Treatment includes nimodipine (calcium channel blocker), hypertensive-hypervolemic-hemodilution (triple-H) therapy, and possibly endovascular intervention.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q2",
    type: "question",
    question: "A nurse is caring for a client with a traumatic brain injury. The ICP monitor reads 28 mmHg. Which intervention should the nurse implement FIRST?",
    options: ["Administer IV mannitol as prescribed", "Elevate the head of bed to 30 degrees and ensure the head is midline", "Hyperventilate the client to a PaCO2 of 25 mmHg", "Prepare for emergent decompressive craniectomy"],
    correctIndex: 1,
    answer: "Normal ICP is 5-15 mmHg. An ICP of 28 mmHg requires immediate intervention. The FIRST action is proper positioning: HOB elevation to 30 degrees promotes venous drainage, and keeping the head midline prevents jugular vein compression. These simple interventions can reduce ICP by 5-10 mmHg. If ICP remains elevated, osmotic therapy (mannitol or hypertonic saline) and possible CSF drainage are next steps.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q3",
    type: "question",
    question: "A client is brought to the ED after a seizure. Bystanders report the client was found down and may have been seizing for 20 minutes. The client is still seizing. After securing the airway, what is the priority medication?",
    options: ["Phenytoin (Dilantin) IV push", "Lorazepam (Ativan) IV followed by phenytoin loading", "Oral carbamazepine", "IM haloperidol"],
    correctIndex: 1,
    answer: "Status epilepticus (seizures lasting >5 minutes or recurrent without consciousness recovery) is a neurological emergency with increasing mortality as duration increases. The protocol is: IV benzodiazepine (lorazepam 4 mg IV, may repeat once) as the immediate first-line agent, followed by a phenytoin or fosphenytoin loading dose for seizure prevention. If seizures persist, propofol or midazolam infusion in an ICU setting.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q4",
    type: "question",
    question: "A client with bacterial meningitis has a positive Kernig sign. What does this finding indicate?",
    options: ["Cranial nerve XII dysfunction", "Meningeal irritation demonstrated by resistance and pain with knee extension when the hip is flexed", "Frontal lobe damage", "Cerebellar dysfunction"],
    correctIndex: 1,
    answer: "Kernig sign is positive when the client experiences pain and resistance when the examiner attempts to extend the knee while the hip is flexed at 90 degrees. This stretches the inflamed meninges along the spinal cord, producing pain. Along with Brudzinski sign (involuntary hip flexion when the neck is flexed) and nuchal rigidity, it indicates meningeal irritation.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q5",
    type: "question",
    question: "A nurse is assessing a client who presents with sudden unilateral facial drooping, arm weakness, and speech difficulty. Using the NIH Stroke Scale, the nurse determines the score is 18. What does this indicate?",
    options: ["Minor stroke not requiring intervention", "Moderate stroke requiring observation only", "Severe stroke requiring aggressive treatment and possible thrombectomy", "TIA that will resolve spontaneously"],
    correctIndex: 2,
    answer: "An NIHSS score of 18 indicates a severe stroke. Scores above 15 suggest large vessel occlusion and the client is a candidate for both IV tPA (within 4.5 hours) and mechanical thrombectomy (within 24 hours for select patients with large vessel occlusion on imaging). Time is critical: 'time is brain' with approximately 1.9 million neurons dying per minute during an acute ischemic stroke.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q6",
    type: "question",
    question: "A client with myasthenia gravis is taking pyridostigmine. The client develops excessive salivation, bradycardia, diarrhea, and muscle fasciculations. What does this indicate?",
    options: ["Myasthenic crisis requiring more medication", "Cholinergic crisis from medication toxicity", "Allergic reaction to pyridostigmine", "Normal therapeutic effects"],
    correctIndex: 1,
    answer: "SLUDGE symptoms (Salivation, Lacrimation, Urination, Diarrhea, GI cramping, Emesis) plus bradycardia and fasciculations indicate cholinergic crisis (excessive acetylcholine from anticholinesterase overdose). The antidote is atropine. This contrasts with myasthenic crisis (worsening weakness from insufficient medication), which presents with ptosis, dysphagia, and respiratory failure WITHOUT SLUDGE symptoms.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q7",
    type: "question",
    question: "A client with a C5 spinal cord injury asks the nurse what level of function they can expect. What should the nurse explain?",
    options: ["Full arm and hand function with lower body paralysis", "Ability to flex the elbow and shrug shoulders but no hand function; requires assistance with most ADLs", "Total paralysis below the chin with ventilator dependence", "Ability to walk with braces and a walker"],
    correctIndex: 1,
    answer: "C5 spinal cord injury preserves shoulder movement (deltoid) and elbow flexion (biceps) but loses hand function (C7-T1). The client can use adaptive equipment for some ADLs (feeding with adaptive utensils, electric wheelchair). Diaphragm function is preserved (C3-C5) so ventilator independence is expected. C3-C4 injuries may require ventilator support. C6 adds wrist extension, C7 adds elbow extension.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q8",
    type: "question",
    question: "A client with a brain tumor is prescribed dexamethasone. What is the primary purpose of this medication in this context?",
    options: ["To shrink the tumor directly", "To reduce peritumoral cerebral edema and lower intracranial pressure", "To prevent seizures", "To treat the associated depression"],
    correctIndex: 1,
    answer: "Dexamethasone is a potent corticosteroid used in brain tumors primarily to reduce vasogenic cerebral edema surrounding the tumor. This decreases ICP and often dramatically improves neurological symptoms within hours. It does not treat the tumor itself. Side effects include hyperglycemia, immunosuppression, GI irritation, and with chronic use, Cushing syndrome and adrenal suppression.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q9",
    type: "question",
    question: "A nurse is performing a neurological assessment. The client's pupils are 6mm bilaterally and non-reactive to light. The client is unresponsive and has no corneal reflex. What do these findings suggest?",
    options: ["Normal findings in a sleeping client", "Brainstem herniation or death", "Opiate overdose", "Pontine hemorrhage"],
    correctIndex: 1,
    answer: "Fixed, dilated pupils (6mm+) bilaterally with absent brainstem reflexes (corneal, gag) in an unresponsive client indicates severe brainstem dysfunction, likely from uncal herniation or brainstem death. This is an ominous neurological finding. Note: opioid overdose causes pinpoint (miotic) pupils, not dilated. Pontine hemorrhage also causes pinpoint pupils. Fixed bilateral dilation suggests herniation.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q10",
    type: "question",
    question: "A client who had a stroke 2 days ago is being assessed for dysphagia before oral intake. Which assessment method is most appropriate?",
    options: ["Ask the client to drink a glass of water and observe", "Perform a bedside swallowing screen with small sips of water while monitoring for coughing or wet vocal quality", "Give the client a cracker and observe chewing ability", "Start with a regular diet and observe for 24 hours"],
    correctIndex: 1,
    answer: "A bedside swallowing screen involves giving small amounts of water while observing for signs of aspiration: coughing, choking, wet or gurgling voice quality, or oxygen desaturation. Silent aspiration (without coughing) occurs in up to 50% of dysphagic stroke patients. If the screen suggests difficulty, a formal speech-language pathology evaluation or modified barium swallow study should be ordered before any oral intake.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q11",
    type: "question",
    question: "A nurse is educating a client about phenytoin (Dilantin) therapy. Which instruction is most important?",
    options: ["Take the medication with grapefruit juice to improve absorption", "Maintain excellent oral hygiene and see a dentist regularly because phenytoin causes gingival hyperplasia", "This medication is safe to stop abruptly if side effects occur", "Phenytoin has no significant drug interactions"],
    correctIndex: 1,
    answer: "Phenytoin commonly causes gingival hyperplasia (overgrowth of gum tissue), requiring meticulous oral hygiene and regular dental visits. Other important teaching: never stop abruptly (risk of status epilepticus), avoid alcohol, use reliable contraception (phenytoin reduces effectiveness of oral contraceptives), and maintain consistent vitamin D intake (phenytoin depletes vitamin D). Therapeutic level: 10-20 mcg/mL.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q12",
    type: "question",
    question: "A client with Parkinson's disease on levodopa/carbidopa therapy has been experiencing an 'on-off' phenomenon. What does this mean?",
    options: ["The client alternates between improvement and seizure activity", "The client experiences fluctuating periods of symptom control (on) and breakthrough symptoms (off) unpredictably", "The medication has stopped working completely", "The client is non-compliant with the medication schedule"],
    correctIndex: 1,
    answer: "The on-off phenomenon is a complication of long-term levodopa therapy where the client unpredictably alternates between 'on' periods (good symptom control, sometimes with dyskinesias) and 'off' periods (return of bradykinesia, rigidity, and tremor). It results from fluctuating dopamine levels. Management includes adjusting dose frequency, adding COMT inhibitors (entacapone), or considering deep brain stimulation.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q13",
    type: "question",
    question: "A nurse is assessing a client after a lumbar puncture. The client reports a severe headache that worsens when sitting up. What is the most likely cause and intervention?",
    options: ["Tension headache treated with acetaminophen only", "Post-dural puncture headache from CSF leak; bed rest, hydration, caffeine, and possible epidural blood patch", "Meningitis requiring emergency antibiotics", "Migraine triggered by the procedure"],
    correctIndex: 1,
    answer: "Post-dural puncture headache results from CSF leaking through the dural puncture site, causing low CSF pressure. The headache characteristically worsens with upright position and improves when lying flat. Conservative management includes bed rest, IV or oral hydration, caffeine (causes cerebral vasoconstriction), and analgesics. If conservative measures fail, an epidural blood patch (injecting autologous blood to seal the leak) is highly effective.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q14",
    type: "question",
    question: "A nurse is caring for a client who develops malignant hyperthermia during surgery. The client's temperature is 41°C, with muscle rigidity and tachycardia. What is the priority medication?",
    options: ["Acetaminophen", "Dantrolene sodium IV", "Propranolol", "Morphine sulfate"],
    correctIndex: 1,
    answer: "Dantrolene sodium is the specific antidote for malignant hyperthermia, a life-threatening hypermetabolic crisis triggered by volatile anesthetics or succinylcholine in genetically susceptible individuals. Dantrolene works by inhibiting calcium release from the sarcoplasmic reticulum, stopping the uncontrolled muscle contraction that generates massive heat. It should be available in all surgical suites.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q15",
    type: "question",
    question: "A client with a ventriculostomy drain (external ventricular drain/EVD) has an ICP reading of 22 mmHg. The nurse opens the EVD stopcock to drain CSF. After draining 10 mL, the ICP drops to 12 mmHg. What should the nurse do next?",
    options: ["Continue draining until ICP reaches 5 mmHg", "Close the stopcock and continue monitoring ICP", "Lower the drainage bag to the floor to drain faster", "Administer IV mannitol now that ICP has normalized"],
    correctIndex: 1,
    answer: "After successfully reducing ICP to within normal range (5-15 mmHg) by draining CSF, the stopcock should be closed to resume ICP monitoring. Over-draining can cause ventricular collapse and subdural hematoma. The drainage bag level (usually set at the tragus of the ear as the zero reference point) should be prescribed by the neurosurgeon. Mannitol is not needed if CSF drainage was effective.",
    category: "Neurological",
    difficulty: 3
  },
  {
    id: "rn-neuro-q16",
    type: "question",
    question: "A client recovering from a right-hemispheric stroke consistently ignores food on the left side of the plate and does not acknowledge the left side of the body. Which condition is this?",
    options: ["Homonymous hemianopsia", "Unilateral neglect (hemispatial neglect)", "Expressive aphasia", "Agraphia"],
    correctIndex: 1,
    answer: "Unilateral neglect (hemispatial neglect) is a perceptual deficit common after right parietal lobe strokes where the client fails to attend to stimuli on the contralateral (left) side. It differs from hemianopsia (visual field loss) because the client is unaware of and does not compensate for the deficit. Nursing interventions include approaching from the affected side, placing items on the affected side, and using cueing strategies.",
    category: "Neurological",
    difficulty: 2
  },
  {
    id: "rn-neuro-q17",
    type: "question",
    question: "A client with a head injury develops clear fluid draining from the right ear. What should the nurse do?",
    options: ["Pack the ear with gauze to absorb the fluid", "Test the fluid for glucose and loosely cover the ear with a sterile dressing", "Irrigate the ear with normal saline", "Insert ear drops as prescribed for otitis"],
    correctIndex: 1,
    answer: "Clear drainage from the ear after head trauma suggests CSF otorrhea from a basilar skull fracture. CSF tests positive for glucose (halo sign on gauze). The ear should NEVER be packed (increases infection risk and ICP). Apply a loose sterile dressing, elevate the head of bed 30 degrees, instruct the client not to blow their nose or cough forcefully, and notify the neurosurgeon. Prophylactic antibiotics may be indicated.",
    category: "Neurological",
    difficulty: 2
  },
  // ============================================================
  // GI (16 cards)
  // ============================================================
  {
    id: "rn-gi-q1",
    type: "question",
    question: "A client with portal hypertension and esophageal varices has a Sengstaken-Blakemore tube inserted for bleeding control. Which complication is the nurse most concerned about?",
    options: ["Nausea from the tube", "Airway obstruction from balloon migration", "Mild discomfort in the throat", "Inability to eat solid food"],
    correctIndex: 1,
    answer: "The most life-threatening complication of a Sengstaken-Blakemore tube is upward migration of the gastric balloon, which can occlude the airway. Scissors must be kept at the bedside at all times to cut the tube and deflate the balloons immediately if respiratory distress occurs. The client should be in a monitored setting with suction available. The gastric balloon pressure must be checked regularly.",
    category: "GI",
    difficulty: 3
  },
  {
    id: "rn-gi-q2",
    type: "question",
    question: "A nurse is caring for a client with acute liver failure who develops asterixis (liver flap). What does this finding indicate?",
    options: ["Improvement in liver function", "Hepatic encephalopathy from elevated ammonia levels", "Normal postoperative finding", "Vitamin K deficiency"],
    correctIndex: 1,
    answer: "Asterixis (flapping tremor of the hands when wrists are dorsiflexed) is a classic sign of hepatic encephalopathy caused by accumulated ammonia and other toxins the failing liver cannot metabolize. Ammonia crosses the blood-brain barrier and disrupts neurotransmitter function. Treatment includes lactulose (converts NH3 to NH4+ for fecal excretion) and rifaximin (reduces ammonia-producing gut bacteria). Protein restriction may be necessary.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q3",
    type: "question",
    question: "A nurse is assessing a client with a bowel obstruction. The client vomits fecal-smelling material. What does this indicate?",
    options: ["The client has eaten contaminated food", "Late-stage or distal bowel obstruction with bacterial overgrowth", "Normal finding in early obstruction", "Gastric ulcer perforation"],
    correctIndex: 1,
    answer: "Feculent vomiting (fecal-odor emesis) indicates late-stage or distal (lower) bowel obstruction. Bacteria in the stagnant bowel contents proliferate and produce gas and waste products that travel retrograde. This is an ominous sign suggesting possible bowel necrosis and perforation risk. The client needs emergent surgical evaluation, NG decompression, IV antibiotics, and fluid resuscitation.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q4",
    type: "question",
    question: "A client with acute upper GI bleeding has the following vital signs: HR 118, BP 86/52, RR 24, SpO2 96%. The nurse estimates blood loss class. What class of hemorrhage do these findings suggest?",
    options: ["Class I (less than 15% blood volume loss)", "Class II (15-30% blood volume loss)", "Class III (30-40% blood volume loss)", "Class IV (greater than 40% blood volume loss)"],
    correctIndex: 2,
    answer: "Tachycardia above 100, hypotension, and tachypnea suggest Class III hemorrhage (30-40% blood volume loss, approximately 1.5-2 liters). Class I has minimal vital sign changes. Class II shows tachycardia but maintained BP. Class III shows tachycardia, hypotension, and confusion. Class IV adds altered consciousness and may require massive transfusion protocol activation.",
    category: "GI",
    difficulty: 3
  },
  {
    id: "rn-gi-q5",
    type: "question",
    question: "A client with Crohn's disease is prescribed infliximab (Remicade). Before starting therapy, which screening test must be completed?",
    options: ["Hepatitis C antibody", "TB skin test (PPD) or interferon-gamma release assay", "HIV screening", "Pregnancy test"],
    correctIndex: 1,
    answer: "Infliximab is a TNF-alpha inhibitor that suppresses immune function. Before starting therapy, clients must be screened for latent tuberculosis (PPD or IGRA) because TNF-alpha inhibitors can reactivate latent TB, leading to disseminated disease. If the test is positive, prophylactic treatment for latent TB must be completed before starting infliximab. Hepatitis B screening is also recommended.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q6",
    type: "question",
    question: "A nurse is caring for a client with a T-tube after cholecystectomy. On post-op day 1, the T-tube drains 450 mL of green-brown fluid. What should the nurse do?",
    options: ["Clamp the tube immediately", "Document as expected drainage and continue monitoring", "Notify the surgeon about excessive drainage", "Flush the tube with 30 mL normal saline"],
    correctIndex: 1,
    answer: "Normal T-tube drainage is 300-500 mL of green-brown bile in the first 24 hours, gradually decreasing over several days. The bile is draining from the common bile duct while post-surgical edema resolves. The nurse should monitor the amount, color, and consistency of drainage. Never clamp without a provider order. Report sudden increase in drainage, change to bloody color, or signs of peritonitis.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q7",
    type: "question",
    question: "A client with an ileostomy has liquid green output of 1,200 mL over 8 hours. What is the nurse's primary concern?",
    options: ["Normal ileostomy output", "Dehydration and electrolyte imbalances from high-output ostomy", "Infection of the stoma", "Bowel obstruction"],
    correctIndex: 1,
    answer: "Normal ileostomy output is 500-800 mL/day of liquid-to-pasty consistency. Output of 1,200 mL in 8 hours (potential 3,600 mL/day) is a high-output ostomy that puts the client at significant risk for dehydration, hyponatremia, hypokalemia, and metabolic acidosis (loss of bicarbonate from small intestine). The nurse should monitor I&O strictly, replace fluids and electrolytes, and notify the provider.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q8",
    type: "question",
    question: "A client with suspected Zollinger-Ellison syndrome has severe peptic ulcer disease refractory to standard PPI therapy. What diagnostic finding confirms this syndrome?",
    options: ["Elevated serum amylase", "Elevated fasting serum gastrin level with positive secretin stimulation test", "Low serum albumin", "Positive H. pylori breath test"],
    correctIndex: 1,
    answer: "Zollinger-Ellison syndrome is caused by a gastrin-secreting tumor (gastrinoma) that produces massive gastric acid hypersecretion. Diagnosis is confirmed by a markedly elevated fasting serum gastrin level (often >1,000 pg/mL) and a positive secretin stimulation test (paradoxical rise in gastrin after secretin injection, which normally suppresses gastrin). Treatment includes high-dose PPIs and surgical tumor resection.",
    category: "GI",
    difficulty: 3
  },
  {
    id: "rn-gi-q9",
    type: "question",
    question: "A nurse is administering a blood transfusion. The client develops fever, flank pain, and tea-colored urine 15 minutes into the transfusion. What is the priority action?",
    options: ["Slow the transfusion rate and administer acetaminophen", "STOP the transfusion immediately, keep the IV line open with NS, and notify the blood bank", "Continue the transfusion and monitor closely", "Administer diphenhydramine and restart the transfusion"],
    correctIndex: 1,
    answer: "Fever, flank pain, and tea-colored urine (hemoglobinuria) indicate an acute hemolytic transfusion reaction, a life-threatening emergency caused by ABO incompatibility. The nurse must STOP the transfusion immediately, keep the IV open with NS (new tubing), send the blood bag and tubing to the blood bank for analysis, and draw blood samples (direct Coombs test, free hemoglobin). Monitor for DIC, renal failure, and shock.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q10",
    type: "question",
    question: "A client with hepatitis C is prescribed sofosbuvir/ledipasvir (Harvoni). Which statement by the client indicates understanding of the treatment?",
    options: ["I will take this medication for 6 months to 1 year", "This treatment has a greater than 95% cure rate and lasts 8-12 weeks", "I need weekly blood tests while on this medication", "This medication cannot be taken with food"],
    correctIndex: 1,
    answer: "Direct-acting antivirals (DAAs) like sofosbuvir/ledipasvir have revolutionized hepatitis C treatment, achieving sustained virologic response (SVR/cure) rates above 95% with 8-12 weeks of oral therapy. This represents a dramatic improvement over older interferon-based regimens. The client should avoid amiodarone (risk of fatal bradycardia) and certain acid-reducing medications that can decrease drug absorption.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q11",
    type: "question",
    question: "A nurse is caring for a client post-bariatric surgery (Roux-en-Y gastric bypass). The client reports increasing left shoulder pain on day 1. What is the nurse's concern?",
    options: ["Musculoskeletal pain from positioning during surgery", "Referred pain from anastomotic leak causing diaphragmatic irritation", "Normal postoperative gas pain", "Pneumonia on the left side"],
    correctIndex: 1,
    answer: "Left shoulder pain after abdominal surgery can indicate diaphragmatic irritation from an anastomotic leak. Gastric contents leaking into the peritoneum cause peritonitis that irritates the diaphragm, referring pain to the shoulder via the phrenic nerve. Other signs include tachycardia (often the earliest sign), fever, and abdominal pain. An upper GI series with water-soluble contrast can confirm the leak.",
    category: "GI",
    difficulty: 3
  },
  {
    id: "rn-gi-q12",
    type: "question",
    question: "A client with ulcerative colitis is being prepared for a total proctocolectomy with ileoanal pouch (J-pouch). What should the nurse teach about the expected outcome?",
    options: ["The client will need a permanent ileostomy", "The client will have continent stool through the anus but may have 4-8 loose stools per day initially", "Ulcerative colitis may recur in the J-pouch", "The client will have normal, formed bowel movements immediately after surgery"],
    correctIndex: 1,
    answer: "A J-pouch (ileoanal anastomosis) allows the client to have continent stool through the anus, avoiding a permanent ostomy. Initially, the client may have 4-8 loose stools per day, which typically decreases to 4-6 as the pouch adapts over 6-12 months. Since the entire colon and rectum are removed, ulcerative colitis cannot recur. Pouchitis (inflammation of the J-pouch) can occur and is treated with antibiotics.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q13",
    type: "question",
    question: "A nurse is managing total parenteral nutrition (TPN) for a malnourished client. The TPN bag runs out and a new one will not be available for 2 hours. What should the nurse do?",
    options: ["Hang D10W at the same rate until the new bag arrives", "Wait for the new bag without any intervention", "Hang normal saline at a rapid rate", "Discontinue the IV access since it is temporary"],
    correctIndex: 0,
    answer: "Abruptly stopping TPN can cause rebound hypoglycemia because the high glucose concentration in TPN stimulates insulin production. When TPN is suddenly discontinued, insulin levels remain elevated while the glucose source is removed, causing dangerous hypoglycemia. Hanging D10W (10% dextrose) at the same rate prevents this rebound effect until the new TPN bag is available.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q14",
    type: "question",
    question: "A client with acute pancreatitis has a Ranson score of 6. What does this indicate about the prognosis?",
    options: ["Mild pancreatitis with expected full recovery", "Moderate pancreatitis requiring monitoring only", "Severe pancreatitis with a mortality rate exceeding 40%", "The score is not clinically significant"],
    correctIndex: 2,
    answer: "Ranson's criteria predict the severity and mortality of acute pancreatitis. A score of 0-2 indicates mild disease with less than 5% mortality. A score of 3-4 indicates moderate severity with 15-20% mortality. A score of 5-6 indicates severe pancreatitis with mortality exceeding 40%. A score above 6 carries near 100% mortality. The client needs ICU admission with aggressive fluid resuscitation and close monitoring for organ failure.",
    category: "GI",
    difficulty: 3
  },
  {
    id: "rn-gi-q15",
    type: "question",
    question: "A nurse is caring for a client with a newly diagnosed C. difficile infection. Which isolation precaution is required?",
    options: ["Standard precautions only", "Droplet precautions", "Contact precautions with hand washing using soap and water (not alcohol-based sanitizer)", "Airborne precautions with N95"],
    correctIndex: 2,
    answer: "C. difficile requires contact precautions (gown and gloves) with a critical distinction: hand washing must be done with soap and water because alcohol-based hand sanitizers do NOT kill C. difficile spores. Spores can persist on surfaces for months, so environmental cleaning with bleach-based disinfectants is required. Discontinue offending antibiotics if possible and start oral vancomycin or fidaxomicin.",
    category: "GI",
    difficulty: 2
  },
  {
    id: "rn-gi-q16",
    type: "question",
    question: "A client post-liver transplant is prescribed tacrolimus (Prograf). Which assessment finding requires immediate nursing action?",
    options: ["Mild tremor in the hands", "Serum creatinine rising from 1.0 to 2.8 mg/dL over 3 days", "Mild headache", "Increased appetite"],
    correctIndex: 1,
    answer: "A rapid rise in serum creatinine indicates nephrotoxicity, the most significant adverse effect of tacrolimus. Nephrotoxicity can lead to acute kidney injury and chronic kidney disease. The nurse should hold the tacrolimus, notify the transplant team, check the tacrolimus trough level (therapeutic: 5-15 ng/mL), and monitor renal function. Dose adjustment or medication switch may be needed.",
    category: "GI",
    difficulty: 3
  },
  // ============================================================
  // ENDOCRINE (16 cards)
  // ============================================================
  {
    id: "rn-endo-q1",
    type: "question",
    question: "A client with DKA has a blood glucose of 480 mg/dL and potassium of 5.6 mEq/L. After starting insulin and fluids, the potassium drops to 3.2 mEq/L. Why did this occur?",
    options: ["Insulin has no effect on potassium", "Insulin drives potassium into cells along with glucose, and the acidosis correction also shifts potassium intracellularly", "The IV fluids diluted the potassium", "The kidneys suddenly excreted all the potassium"],
    correctIndex: 1,
    answer: "In DKA, potassium shifts extracellularly due to acidosis (H+ enters cells, K+ exits to maintain electroneutrality) and insulin deficiency (insulin normally drives K+ into cells). The initial hyperkalemia is misleading because total body K+ is depleted from osmotic diuresis. When insulin is given, K+ shifts back into cells rapidly, unmasking the true deficit. This is why potassium must be monitored hourly during DKA treatment.",
    category: "Endocrine",
    difficulty: 3
  },
  {
    id: "rn-endo-q2",
    type: "question",
    question: "A nurse is assessing a client with suspected pheochromocytoma. Which assessment finding is most characteristic?",
    options: ["Chronic stable hypertension responding to ACE inhibitors", "Paroxysmal hypertension with severe headache, diaphoresis, and palpitations", "Hypotension with orthostatic changes", "Gradually progressive weight gain over months"],
    correctIndex: 1,
    answer: "Pheochromocytoma is a catecholamine-producing adrenal tumor. The classic presentation is paroxysmal (episodic) hypertension that can be severe (BP > 200/120), accompanied by the classic triad: headache, diaphoresis, and palpitations. The episodes can be triggered by exercise, stress, anesthesia, or even abdominal palpation. 24-hour urine for metanephrines and catecholamines is the diagnostic test. Avoid abdominal palpation in suspected cases.",
    category: "Endocrine",
    difficulty: 3
  },
  {
    id: "rn-endo-q3",
    type: "question",
    question: "A client with type 1 diabetes is using an insulin pump. The client's blood glucose has been persistently elevated at 350-400 mg/dL for the past 4 hours despite bolus corrections. What should the nurse suspect?",
    options: ["The insulin is expired", "Infusion site failure (kinked cannula, dislodged site, or insulin crystallization)", "The client is eating too much", "The pump battery is dead"],
    correctIndex: 1,
    answer: "Persistently elevated glucose despite pump corrections suggests infusion site failure. The cannula may be kinked, dislodged, or occluded by insulin crystallization. The nurse should instruct the client to change the infusion site AND tubing, administer a correction dose via syringe (bypassing the pump), check for ketones (clients on pumps have no long-acting insulin depot and can develop DKA rapidly), and then troubleshoot the pump.",
    category: "Endocrine",
    difficulty: 3
  },
  {
    id: "rn-endo-q4",
    type: "question",
    question: "A nurse is caring for a client who received radioactive iodine (I-131) therapy for Graves' disease. Which precaution is essential?",
    options: ["The client needs airborne isolation for 2 weeks", "Limit close contact with pregnant women and children for a specified period; use dedicated bathroom", "The client must wear a lead apron at all times", "No precautions are necessary after the first 24 hours"],
    correctIndex: 1,
    answer: "After I-131 therapy, the client emits low-level radiation primarily through body fluids (urine, saliva, sweat). Precautions include limiting close contact with pregnant women and small children (typically for 1-7 days depending on dose), using a dedicated toilet (flush twice, wipe up any spills), sleeping alone, and using separate eating utensils. The radiation level decreases rapidly (half-life is 8 days).",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q5",
    type: "question",
    question: "A client with acromegaly reports increasing shoe size, headaches, and visual field changes. What is the most likely cause?",
    options: ["Hypothyroidism", "Growth hormone-secreting pituitary adenoma", "Adrenal cortical hyperplasia", "Parathyroid hyperplasia"],
    correctIndex: 1,
    answer: "Acromegaly is caused by excessive growth hormone (GH) from a pituitary adenoma in adults (after epiphyseal closure). Features include enlargement of hands, feet, jaw (prognathism), coarsening of facial features, headaches, and visual field defects (bitemporal hemianopsia) from tumor compression of the optic chiasm. Diagnosis is via elevated IGF-1 and failure to suppress GH with oral glucose tolerance test.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q6",
    type: "question",
    question: "A client with a new insulin regimen is prescribed NPH and regular insulin to be mixed in the same syringe. Which technique is correct?",
    options: ["Draw up NPH first, then regular insulin", "Draw up regular (clear) insulin first, then NPH (cloudy)", "Either can be drawn up first", "NPH and regular cannot be mixed in the same syringe"],
    correctIndex: 1,
    answer: "The rule is 'Clear before Cloudy.' Regular insulin (clear) is always drawn up first to prevent contamination with NPH (cloudy), which contains protamine that would alter the regular insulin's action. After injecting air into both vials (NPH first, then regular), draw up regular insulin first, then NPH. This prevents NPH particles from entering the regular insulin vial.",
    category: "Endocrine",
    difficulty: 1
  },
  {
    id: "rn-endo-q7",
    type: "question",
    question: "A client on prednisone 40 mg daily for 3 months is being tapered. The client asks why the medication cannot be stopped all at once. What is the nurse's best explanation?",
    options: ["Stopping suddenly would cause the original disease to return immediately", "Long-term steroids suppress your adrenal glands. Stopping suddenly can cause a life-threatening adrenal crisis because your body cannot produce enough cortisol on its own", "The medication needs to be gradually reduced to prevent allergic reactions", "Stopping suddenly would cause rebound weight gain"],
    correctIndex: 1,
    answer: "Chronic exogenous corticosteroid use suppresses the hypothalamic-pituitary-adrenal (HPA) axis through negative feedback. The adrenal glands atrophy and cannot produce adequate cortisol if the medication is stopped abruptly. Adrenal crisis (Addisonian crisis) presents with severe hypotension, hypoglycemia, hyperkalemia, and cardiovascular collapse. Tapering allows the HPA axis to gradually recover endogenous cortisol production.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q8",
    type: "question",
    question: "A nurse is caring for a client with diabetes who takes metformin. The client is scheduled for a CT scan with IV contrast. What is the correct protocol?",
    options: ["Continue metformin as scheduled", "Hold metformin for 48 hours after the contrast administration and monitor renal function", "Hold metformin for 1 week before the scan", "Switch to insulin permanently"],
    correctIndex: 1,
    answer: "Metformin must be held for 48 hours after IV contrast administration because contrast can cause acute kidney injury, and impaired kidneys cannot clear metformin, leading to dangerous lactic acidosis. Renal function (creatinine/eGFR) should be rechecked before restarting metformin. If baseline renal function is already impaired (eGFR < 30), metformin may need to be held before the scan as well.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q9",
    type: "question",
    question: "A client with type 2 diabetes is started on an SGLT2 inhibitor (empagliflozin). Which unique side effect should the nurse monitor for?",
    options: ["Hypoglycemia as the primary concern", "Genital yeast infections and urinary tract infections due to glycosuria", "Weight gain", "Severe constipation"],
    correctIndex: 1,
    answer: "SGLT2 inhibitors work by blocking glucose reabsorption in the proximal tubule, causing glucosuria (glucose in urine). The glucose-rich urine creates an environment conducive to yeast and bacterial growth, increasing the risk of genital mycotic infections and UTIs. Clients should maintain good perineal hygiene and report symptoms promptly. Benefits include weight loss, blood pressure reduction, and cardiovascular/renal protection.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q10",
    type: "question",
    question: "A client with a new diagnosis of type 1 diabetes asks about the 'honeymoon period.' What should the nurse explain?",
    options: ["It is a permanent remission of diabetes", "It is a temporary phase where remaining beta cells produce some insulin, requiring less exogenous insulin, but it always ends", "It means the client was misdiagnosed and does not have diabetes", "It refers to the time before diagnosis when symptoms were mild"],
    correctIndex: 1,
    answer: "The honeymoon period occurs shortly after diagnosis and insulin initiation in type 1 diabetes. The remaining functional beta cells recover temporarily (possibly due to reduced glucose toxicity after insulin therapy begins) and produce some endogenous insulin, reducing exogenous insulin requirements. This phase typically lasts weeks to months but ALWAYS ends as autoimmune destruction of beta cells continues. The client must understand that insulin will eventually be needed in full doses.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q11",
    type: "question",
    question: "A nurse is monitoring a client with Addisonian crisis. Which set of lab values is most consistent with this diagnosis?",
    options: ["Na+ 148, K+ 3.0, glucose 180", "Na+ 122, K+ 6.4, glucose 48", "Na+ 140, K+ 4.0, glucose 100", "Na+ 155, K+ 2.8, glucose 350"],
    correctIndex: 1,
    answer: "Addisonian crisis (acute adrenal insufficiency) produces the classic triad: hyponatremia (cortisol and aldosterone deficiency impair sodium retention), hyperkalemia (aldosterone deficiency reduces potassium excretion), and hypoglycemia (cortisol is needed for gluconeogenesis). Treatment is IV hydrocortisone (addresses both cortisol and mineralocorticoid deficiency) and aggressive NS fluid resuscitation.",
    category: "Endocrine",
    difficulty: 3
  },
  {
    id: "rn-endo-q12",
    type: "question",
    question: "A client with hypothyroidism has a TSH of 28 mIU/L and free T4 of 0.4 ng/dL. What do these lab values indicate?",
    options: ["Normal thyroid function", "Primary hypothyroidism with the pituitary trying to stimulate the failing thyroid", "Hyperthyroidism", "Secondary hypothyroidism from pituitary failure"],
    correctIndex: 1,
    answer: "Elevated TSH with low free T4 is the hallmark of primary hypothyroidism. The thyroid gland is failing, so T4 production drops. The pituitary gland detects the low T4 and increases TSH secretion in an attempt to stimulate the thyroid (negative feedback loop). In secondary hypothyroidism (pituitary failure), both TSH and T4 would be low because the pituitary cannot produce adequate TSH.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q13",
    type: "question",
    question: "A client with type 1 diabetes has a continuous glucose monitor (CGM) that alerts to a blood glucose of 55 mg/dL. The client is drowsy and unable to swallow safely. What is the priority intervention?",
    options: ["Give orange juice by mouth", "Administer glucagon 1 mg IM or subcutaneously", "Start a D50 IV push", "Wait for the glucose to self-correct"],
    correctIndex: 1,
    answer: "For a hypoglycemic client who is unable to swallow safely (risk of aspiration), oral carbohydrates are contraindicated. Glucagon 1 mg IM or subcutaneously stimulates hepatic glycogenolysis, releasing glucose from liver glycogen stores. If IV access is available, D50 (50% dextrose) 25-50 mL IV push is preferred for immediate glucose correction. Position the client on their side to prevent aspiration if vomiting occurs (glucagon commonly causes nausea).",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q14",
    type: "question",
    question: "A client with diabetes insipidus is being treated with desmopressin (DDAVP). Which assessment indicates the medication is effective?",
    options: ["Blood glucose is normalized", "Urine output decreases and urine specific gravity increases", "Blood pressure decreases significantly", "Serum potassium normalizes"],
    correctIndex: 1,
    answer: "DDAVP replaces the deficient ADH, promoting water reabsorption in the collecting ducts. Effective treatment is indicated by decreased urine output (from massive polyuria to normal volumes), increased urine specific gravity (from very dilute <1.005 to more concentrated), decreased serum osmolality, normalized serum sodium, and decreased thirst. Monitor for water intoxication (hyponatremia) from over-treatment.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q15",
    type: "question",
    question: "A nurse is teaching a client about sick day rules for type 1 diabetes. Which instruction is most important?",
    options: ["Skip insulin doses when unable to eat", "NEVER skip insulin during illness; check blood glucose and ketones every 3-4 hours; increase fluid intake", "Take double the usual insulin dose when sick", "Only test blood glucose once daily when sick"],
    correctIndex: 1,
    answer: "During illness, counter-regulatory hormones (cortisol, glucagon, catecholamines) increase blood glucose even if the client is not eating. Skipping insulin during illness is the number one cause of DKA. Sick day rules: continue insulin (may need to increase), check BG every 3-4 hours, check urine or blood ketones, drink plenty of sugar-free fluids, and call the provider if BG stays above 240 mg/dL or ketones are present.",
    category: "Endocrine",
    difficulty: 2
  },
  {
    id: "rn-endo-q16",
    type: "question",
    question: "A client post-transsphenoidal hypophysectomy is instructed to avoid which activities? Select the most critical instruction.",
    options: ["Avoid lying flat for 2 weeks", "Do not bend, strain, cough forcefully, or blow the nose to prevent CSF leak", "Avoid all dairy products", "Do not take thyroid medication for 6 months"],
    correctIndex: 1,
    answer: "After transsphenoidal surgery (through the nose/sinus to access the pituitary), the surgical site is at risk for CSF leak. Activities that increase intracranial pressure (bending, straining, coughing, sneezing, blowing the nose) can disrupt the repair and cause CSF rhinorrhea. The client should also avoid brushing teeth for 2 weeks (use mouthwash instead) and report any clear nasal drainage (test for glucose to identify CSF).",
    category: "Endocrine",
    difficulty: 2
  },
  // ============================================================
  // RENAL/GU (16 cards)
  // ============================================================
  {
    id: "rn-renal-q1",
    type: "question",
    question: "A client receiving hemodialysis through an AV fistula develops severe bleeding from the fistula site. What is the priority nursing action?",
    options: ["Apply a tourniquet proximal to the fistula", "Apply firm, direct pressure to the site and call for help", "Elevate the arm above the heart", "Apply ice to the site"],
    correctIndex: 1,
    answer: "Severe bleeding from an AV fistula is a medical emergency because the fistula carries high-flow arterial blood. The priority is applying firm, direct pressure to the bleeding site. Do NOT apply a tourniquet as this can clot and destroy the fistula. Call for help while maintaining pressure. If bleeding does not stop with direct pressure, the client needs emergent surgical evaluation.",
    category: "Renal/GU",
    difficulty: 2
  },
  {
    id: "rn-renal-q2",
    type: "question",
    question: "A nurse is calculating the fluid allowance for a client on hemodialysis. The client's urine output is 200 mL/day. What is the typical daily fluid restriction?",
    options: ["Unrestricted fluid intake", "Urine output plus 500-1,000 mL per day", "500 mL per day regardless of urine output", "3,000 mL per day"],
    correctIndex: 1,
    answer: "The standard fluid restriction for hemodialysis patients is the previous day's urine output plus 500-1,000 mL for insensible losses (breathing, sweating). For this client: 200 mL + 500-1,000 mL = 700-1,200 mL/day. Weight gain between dialysis sessions should not exceed 2-3 kg (indicating 2-3 liters of retained fluid). Teaching should include ice chips, hard candy, and mouth rinses to manage thirst.",
    category: "Renal/GU",
    difficulty: 2
  },
  {
    id: "rn-renal-q3",
    type: "question",
    question: "A nurse is caring for a client with chronic kidney disease whose phosphorus is 8.2 mg/dL and calcium is 7.0 mg/dL. The client is prescribed sevelamer (Renagel). When should this medication be taken?",
    options: ["On an empty stomach in the morning", "With meals to bind dietary phosphorus in the GI tract", "At bedtime with a full glass of water", "Only when phosphorus levels are above 10 mg/dL"],
    correctIndex: 1,
    answer: "Sevelamer is a non-calcium, non-aluminum phosphate binder that must be taken WITH meals. It works by binding dietary phosphorus in the GI tract, preventing absorption. Unlike calcium-based binders, sevelamer does not contribute to calcium overload or vascular calcification. Taking it without food would be ineffective as there is no dietary phosphorus to bind. It must not be crushed.",
    category: "Renal/GU",
    difficulty: 2
  },
  {
    id: "rn-renal-q4",
    type: "question",
    question: "A client with end-stage renal disease on erythropoietin (epoetin alfa) therapy has a hemoglobin of 12.8 g/dL. What should the nurse anticipate?",
    options: ["Continue the current dose", "Reduce or hold the dose because the hemoglobin exceeds the target range", "Increase the dose to achieve a hemoglobin of 14 g/dL", "Switch to iron supplementation only"],
    correctIndex: 1,
    answer: "The target hemoglobin for CKD patients on erythropoiesis-stimulating agents (ESAs) is 10-11 g/dL. Hemoglobin above 12 g/dL increases the risk of cardiovascular events (stroke, MI, death) and thromboembolic events. The dose should be reduced or held. The nurse should also ensure adequate iron stores (ferritin >100, TSAT >20%) as iron is needed for effective erythropoiesis.",
    category: "Renal/GU",
    difficulty: 3
  },
  {
    id: "rn-renal-q5",
    type: "question",
    question: "A client on peritoneal dialysis notes that the dialysate outflow is slower than usual and the abdomen feels distended. What should the nurse assess first?",
    options: ["Check if the client has eaten a large meal", "Reposition the client and check for catheter kinks, fibrin clots, or constipation", "Increase the dwell time", "Add more dialysate to the next exchange"],
    correctIndex: 1,
    answer: "Slow dialysate outflow commonly results from catheter malposition, kinking, or obstruction by fibrin clots. Constipation is another frequent cause as a full colon can compress the catheter. The nurse should reposition the client (side to side, sit upright), check tubing for kinks, and assess bowel function. If obstruction persists, catheter flushing with heparinized saline per protocol may be needed.",
    category: "Renal/GU",
    difficulty: 2
  },
  {
    id: "rn-renal-q6",
    type: "question",
    question: "A nurse is educating a client about the renal diet for stage 4 CKD. Which dietary restrictions are appropriate?",
    options: ["Low sodium, low potassium, low phosphorus, and moderate protein (0.6-0.8 g/kg/day)", "High protein, unrestricted sodium, unlimited fluids", "Low calorie, high fiber, unlimited potassium", "No dietary restrictions are needed until dialysis"],
    correctIndex: 0,
    answer: "The CKD diet restricts sodium (2,000 mg/day to control BP and edema), potassium (to prevent hyperkalemia), phosphorus (to prevent renal osteodystrophy), and moderate protein (to reduce uremic waste production). Calories should be adequate to prevent malnutrition. Once on dialysis, protein requirements increase. A renal dietitian should be involved in individualized meal planning.",
    category: "Renal/GU",
    difficulty: 2
  },
  {
    id: "rn-renal-q7",
    type: "question",
    question: "A client develops tumor lysis syndrome after starting chemotherapy for leukemia. Which electrolyte abnormalities does the nurse expect?",
    options: ["Hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia", "Hypokalemia, hypophosphatemia, and hypercalcemia", "Isolated hyponatremia", "Hypermagnesemia only"],
    correctIndex: 0,
    answer: "Tumor lysis syndrome occurs when massive cancer cell death releases intracellular contents: potassium (hyperkalemia), phosphorus (hyperphosphatemia), uric acid (hyperuricemia), and nucleic acids. Elevated phosphorus binds calcium, causing secondary hypocalcemia. Uric acid can crystallize in the renal tubules causing acute kidney injury. Prevention includes aggressive IV hydration, allopurinol or rasburicase, and close electrolyte monitoring.",
    category: "Renal/GU",
    difficulty: 3
  },
  {
    id: "rn-renal-q8",
    type: "question",
    question: "A client post-kidney transplant is on tacrolimus and mycophenolate. The client reports a sore throat and fever. What is the nurse's primary concern?",
    options: ["Common cold that will resolve on its own", "Opportunistic infection due to immunosuppression", "Drug allergy to tacrolimus", "Rejection of the transplanted kidney"],
    correctIndex: 1,
    answer: "Immunosuppressed transplant recipients are at high risk for opportunistic infections. A sore throat and fever could indicate anything from a common viral URI to a serious bacterial or fungal infection. The nurse should obtain cultures (blood, throat), check the WBC and differential, and notify the transplant team. CMV, EBV, and fungal infections are particular concerns. Prophylactic medications (valganciclovir, TMP-SMX) are typically prescribed.",
    category: "Renal/GU",
    difficulty: 2
  },
  // ============================================================
  // PHARMACOLOGY (17 cards)
  // ============================================================
  {
    id: "rn-pharm-q1",
    type: "question",
    question: "A client is prescribed warfarin with a target INR of 2.0-3.0. The current INR is 5.8 and the client has no active bleeding. What is the expected intervention?",
    options: ["Continue warfarin at the current dose", "Hold warfarin and administer oral vitamin K", "Administer IV vitamin K and fresh frozen plasma", "Administer protamine sulfate"],
    correctIndex: 1,
    answer: "An INR of 5.8 without active bleeding requires holding warfarin and administering oral vitamin K (2.5-5 mg). IV vitamin K and FFP are reserved for active or life-threatening bleeding. Protamine sulfate is the antidote for heparin, NOT warfarin. Recheck the INR in 24-48 hours. Common causes of supratherapeutic INR include drug interactions (antibiotics, NSAIDs), dietary changes (decreased vitamin K intake), or liver disease.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q2",
    type: "question",
    question: "A nurse is preparing to administer IV vancomycin. Which complication is specific to rapid IV administration of this medication?",
    options: ["Ototoxicity", "Red man syndrome (histamine-mediated flushing and hypotension)", "Nephrotoxicity", "Hepatotoxicity"],
    correctIndex: 1,
    answer: "Red man syndrome occurs when vancomycin is infused too rapidly, causing direct mast cell degranulation and histamine release. It presents as a red, flushing rash on the face, neck, and upper trunk, often with pruritus and sometimes hypotension. Prevention is infusing vancomycin slowly over at least 60 minutes (or longer for doses >1 gram). Premedication with diphenhydramine may be given. This is NOT a true allergy.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q3",
    type: "question",
    question: "A client on a heparin drip develops heparin-induced thrombocytopenia (HIT). The platelet count drops from 240,000 to 82,000. What is the priority action?",
    options: ["Decrease the heparin rate by 50%", "Stop ALL heparin products immediately and initiate an alternative anticoagulant (argatroban or bivalirudin)", "Continue heparin and monitor platelets daily", "Administer platelet transfusion"],
    correctIndex: 1,
    answer: "HIT is an immune-mediated reaction where antibodies against heparin-platelet factor 4 complexes cause platelet activation and consumption. Despite low platelets, HIT is paradoxically prothrombotic, causing arterial and venous thrombosis. ALL heparin must be stopped (including heparin flushes and heparin-coated catheters). An alternative anticoagulant (argatroban, bivalirudin) must be started. Platelet transfusions are generally CONTRAINDICATED as they fuel the thrombotic process.",
    category: "Pharmacology",
    difficulty: 3
  },
  {
    id: "rn-pharm-q4",
    type: "question",
    question: "A nurse is teaching a client about the new prescription for carvedilol (Coreg) for heart failure. Which instruction is most important?",
    options: ["Take it on an empty stomach for best absorption", "Monitor blood pressure and heart rate; rise slowly from sitting or lying positions to prevent orthostatic hypotension", "This medication can be stopped abruptly if side effects occur", "Take the medication only when you feel your heart racing"],
    correctIndex: 1,
    answer: "Carvedilol is a non-selective beta-blocker with alpha-1 blocking properties, causing both bradycardia and vasodilation. Orthostatic hypotension is a significant risk, especially when starting therapy. The client should rise slowly, monitor BP and HR regularly, and report dizziness. The medication should NEVER be stopped abruptly as rebound tachycardia and hypertension can occur. The dose is started low and titrated up slowly.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q5",
    type: "question",
    question: "A client receiving chemotherapy develops a temperature of 38.5°C and an absolute neutrophil count (ANC) of 400/mm³. What is this condition called and what is the priority?",
    options: ["Febrile neutropenia requiring immediate blood cultures and empiric broad-spectrum antibiotics", "Normal post-chemotherapy response requiring no intervention", "Thrombocytopenia requiring platelet transfusion", "Anemia requiring erythropoietin"],
    correctIndex: 0,
    answer: "Febrile neutropenia (fever + ANC <500/mm³) is an oncological emergency. Without functioning neutrophils, the client cannot mount an adequate inflammatory response, and sepsis can develop rapidly. The standard protocol is: obtain blood cultures from two sites BEFORE antibiotics, then administer empiric broad-spectrum IV antibiotics (often piperacillin-tazobactam or cefepime) within 60 minutes of fever recognition.",
    category: "Pharmacology",
    difficulty: 3
  },
  {
    id: "rn-pharm-q6",
    type: "question",
    question: "A client is receiving a continuous norepinephrine infusion for septic shock through a peripheral IV. The nurse notices blanching and pain at the IV site. What does this indicate and what is the action?",
    options: ["Normal vasoconstriction from the medication", "Extravasation of norepinephrine causing local tissue ischemia; stop the infusion, notify the provider, and prepare phentolamine for local injection", "Allergic reaction to the medication", "The IV site needs to be flushed with saline"],
    correctIndex: 1,
    answer: "Norepinephrine is a potent vasoconstrictor. Extravasation into surrounding tissue causes severe local vasoconstriction, ischemia, and potential tissue necrosis. The nurse must stop the infusion immediately, aspirate residual medication, and administer phentolamine (alpha-adrenergic antagonist) by local injection around the extravasation site to reverse vasoconstriction. Central line administration is strongly preferred for vasopressors.",
    category: "Pharmacology",
    difficulty: 3
  },
  {
    id: "rn-pharm-q7",
    type: "question",
    question: "A nurse is reviewing a client's medication list: lisinopril, potassium supplement, and spironolactone. What is the primary safety concern?",
    options: ["Hypokalemia from excessive potassium loss", "Hyperkalemia from three potassium-retaining agents", "Drug interaction causing liver toxicity", "Increased risk of bleeding"],
    correctIndex: 1,
    answer: "ACE inhibitors (lisinopril) reduce aldosterone, retaining potassium. Spironolactone is a potassium-sparing diuretic that blocks aldosterone. Adding a potassium supplement creates triple potassium retention with high risk of life-threatening hyperkalemia. The nurse should hold the potassium supplement, check the serum K+ level immediately, and notify the prescriber. This is a common dangerous medication combination.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q8",
    type: "question",
    question: "A client with a suspected opioid overdose is given naloxone (Narcan) 0.4 mg IV. The client becomes responsive but the nurse must continue monitoring closely. Why?",
    options: ["Naloxone has a longer half-life than most opioids", "Naloxone's duration of action (30-90 minutes) is shorter than most opioids, and resedation/respiratory depression can recur", "Naloxone causes permanent opioid receptor blockade", "One dose of naloxone always completely reverses any opioid"],
    correctIndex: 1,
    answer: "Naloxone has a short duration of action (30-90 minutes), while most opioids (especially long-acting formulations like methadone or extended-release oxycodone) have much longer durations. After naloxone wears off, the opioid can re-exert its effects, causing recurrent respiratory depression. The client must be monitored for at least 2-4 hours (longer for long-acting opioids), and repeat doses or a continuous naloxone infusion may be needed.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q9",
    type: "question",
    question: "A client is prescribed methotrexate for rheumatoid arthritis. Which medication should the nurse ensure is also prescribed?",
    options: ["Vitamin B12 supplements", "Folic acid 1 mg daily", "Iron supplements", "Calcium carbonate"],
    correctIndex: 1,
    answer: "Methotrexate is a folate antagonist that inhibits dihydrofolate reductase. Folic acid supplementation (1 mg daily, taken on days when methotrexate is NOT taken) reduces side effects including stomatitis, GI upset, hepatotoxicity, and bone marrow suppression without reducing the drug's efficacy. Leucovorin (folinic acid) is used for methotrexate toxicity rescue, not routine supplementation.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q10",
    type: "question",
    question: "A nurse is caring for a client who received too much IV potassium, resulting in a potassium level of 7.2 mEq/L and peaked T waves on the ECG. Which medication should be administered FIRST?",
    options: ["Sodium polystyrene sulfonate (Kayexalate)", "Insulin with D50", "IV calcium gluconate", "Albuterol nebulizer"],
    correctIndex: 2,
    answer: "IV calcium gluconate is the FIRST medication given in severe hyperkalemia with ECG changes because it stabilizes the cardiac membrane within minutes, reducing the risk of fatal arrhythmia. It does NOT lower potassium levels; it protects the heart while other medications work to shift K+ intracellularly (insulin/D50, albuterol) or remove it from the body (Kayexalate, dialysis).",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q11",
    type: "question",
    question: "A client on a PCA (patient-controlled analgesia) pump with morphine is found with a respiratory rate of 6, pinpoint pupils, and sedation score of 4 (unarousable). What is the priority intervention?",
    options: ["Stimulate the client and encourage deep breathing", "Stop the PCA pump and administer naloxone IV as prescribed", "Increase the PCA demand dose for better pain control", "Position the client in high Fowler's and apply oxygen"],
    correctIndex: 1,
    answer: "Respiratory rate below 8, excessive sedation, and pinpoint pupils indicate opioid overdose. The priority is to stop the PCA pump to prevent further opioid delivery and administer naloxone (Narcan) to reverse respiratory depression. Naloxone onset is 1-2 minutes IV. The client needs continuous monitoring after naloxone as redosing may be needed. Document the event and investigate the cause (programming error, family pushing the button).",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q12",
    type: "question",
    question: "A client is prescribed gentamicin IV. Which lab tests should the nurse monitor most closely?",
    options: ["Liver function tests and bilirubin", "Serum creatinine and peak/trough gentamicin levels", "Serum glucose and hemoglobin A1C", "Thyroid function and cortisol levels"],
    correctIndex: 1,
    answer: "Aminoglycosides (gentamicin, tobramycin, amikacin) have narrow therapeutic windows with two major toxicities: nephrotoxicity (monitor serum creatinine, BUN) and ototoxicity (monitor for hearing changes, tinnitus, vertigo). Peak levels (drawn 30 min after infusion) assess efficacy; trough levels (drawn before next dose) assess toxicity. Adequate hydration is important to prevent nephrotoxicity.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q13",
    type: "question",
    question: "A client on warfarin asks about which foods to avoid. What is the most accurate instruction?",
    options: ["Avoid all green vegetables completely", "Maintain a consistent intake of vitamin K-containing foods rather than avoiding them entirely", "Eat as many leafy greens as possible to increase INR", "Vitamin K in food has no effect on warfarin therapy"],
    correctIndex: 1,
    answer: "The key teaching for warfarin and diet is CONSISTENCY, not avoidance. Vitamin K is the antidote to warfarin, so large fluctuations in vitamin K intake cause INR instability. The client should eat a consistent amount of vitamin K-rich foods (spinach, kale, broccoli, Brussels sprouts) each week. The warfarin dose is adjusted based on the client's usual diet. Drastic dietary changes in either direction will destabilize the INR.",
    category: "Pharmacology",
    difficulty: 1
  },
  {
    id: "rn-pharm-q14",
    type: "question",
    question: "A nurse is administering phenytoin (Dilantin) IV. Which solution should NEVER be used to dilute or mix phenytoin?",
    options: ["Normal saline (0.9% NaCl)", "D5W (5% dextrose in water)", "Sterile water for injection", "Lactated Ringer's"],
    correctIndex: 1,
    answer: "Phenytoin precipitates in dextrose-containing solutions (D5W, D5NS, etc.) due to pH incompatibility. It must be mixed only with normal saline. Additionally, phenytoin must be administered at no more than 50 mg/min in adults (25 mg/min in elderly) with continuous cardiac monitoring due to the risk of hypotension and cardiac arrhythmias. An inline filter (0.22-0.55 micron) is required.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q15",
    type: "question",
    question: "A client is receiving alteplase (tPA) for acute ischemic stroke. Which finding would cause the nurse to hold the medication?",
    options: ["Blood pressure 170/95 mmHg", "INR of 1.8 and recent use of oral anticoagulants", "Symptom onset 2 hours ago", "Blood glucose 165 mg/dL"],
    correctIndex: 1,
    answer: "Contraindications for tPA in stroke include: INR >1.7 or PT >15 seconds (increased bleeding risk), recent anticoagulant use, platelet count <100,000, active internal bleeding, history of intracranial hemorrhage, BP >185/110 despite treatment, recent major surgery, and stroke symptoms present >4.5 hours. An INR of 1.8 indicates excessive anticoagulation and would significantly increase hemorrhagic transformation risk.",
    category: "Pharmacology",
    difficulty: 3
  },
  {
    id: "rn-pharm-q16",
    type: "question",
    question: "A nurse is preparing to administer dopamine at a 'renal dose' (1-3 mcg/kg/min). What is the expected effect at this dose range?",
    options: ["Increased cardiac contractility", "Renal and mesenteric vasodilation to promote urine output", "Peripheral vasoconstriction", "Bronchodilation"],
    correctIndex: 1,
    answer: "Dopamine has dose-dependent effects: at low doses (1-3 mcg/kg/min), it stimulates dopaminergic receptors causing renal and mesenteric vasodilation. At moderate doses (3-10 mcg/kg/min), it stimulates beta-1 receptors increasing cardiac contractility and heart rate. At high doses (>10 mcg/kg/min), it stimulates alpha-1 receptors causing peripheral vasoconstriction. Understanding dose-dependent pharmacology is critical for titrating vasopressors.",
    category: "Pharmacology",
    difficulty: 2
  },
  {
    id: "rn-pharm-q17",
    type: "question",
    question: "A client is prescribed enoxaparin (Lovenox) subcutaneously. Which administration technique is correct?",
    options: ["Inject into the deltoid muscle and massage the site", "Inject into the abdominal fat pad at a 90-degree angle without aspirating or rubbing the site", "Inject into the thigh and apply pressure", "Inject IV for faster absorption"],
    correctIndex: 1,
    answer: "Enoxaparin (LMWH) is injected subcutaneously into the abdominal fat pad (alternating sides), at least 2 inches from the umbilicus, at a 90-degree angle. Do NOT aspirate before injection (increases bruising and hematoma risk). Do NOT rub or massage the injection site after administration. Do NOT expel the air bubble from the prefilled syringe (it ensures complete dose delivery). Never give IM or IV.",
    category: "Pharmacology",
    difficulty: 1
  },
  // ============================================================
  // CRITICAL CARE (16 cards)
  // ============================================================
  {
    id: "rn-cc-q1",
    type: "question",
    question: "A nurse is caring for a client in septic shock. The MAP is 58 mmHg despite 30 mL/kg IV crystalloid resuscitation. Which vasopressor is first-line per the Surviving Sepsis Campaign?",
    options: ["Dopamine", "Norepinephrine", "Epinephrine", "Vasopressin"],
    correctIndex: 1,
    answer: "Norepinephrine is the first-line vasopressor for septic shock per the Surviving Sepsis Campaign guidelines. It increases MAP primarily through alpha-1 mediated vasoconstriction with modest beta-1 effects (increases cardiac contractility without excessive tachycardia). The target MAP is 65 mmHg or higher. Vasopressin may be added as a second agent. Dopamine is no longer preferred due to increased arrhythmia risk.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q2",
    type: "question",
    question: "A nurse is interpreting a central venous pressure (CVP) reading of 2 mmHg in a client with trauma. What does this suggest?",
    options: ["Fluid overload", "Hypovolemia requiring fluid resuscitation", "Normal CVP", "Right heart failure"],
    correctIndex: 1,
    answer: "Normal CVP is 2-6 mmHg (3-8 cmH2O). A CVP of 2 mmHg is at the very low end of normal and in a trauma client suggests hypovolemia/insufficient preload. The low CVP reflects decreased venous return to the right heart, likely from blood loss. Fluid resuscitation with crystalloids and blood products is indicated. Serial CVP measurements help guide fluid resuscitation adequacy.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q3",
    type: "question",
    question: "A ventilated client develops auto-PEEP (intrinsic PEEP) with air trapping. What ventilator adjustment may help?",
    options: ["Increase the respiratory rate", "Increase the inspiratory time", "Decrease the respiratory rate to allow more time for exhalation", "Increase the tidal volume"],
    correctIndex: 2,
    answer: "Auto-PEEP occurs when there is insufficient expiratory time for complete exhalation, causing air trapping. This is common in obstructive diseases (COPD, asthma). Decreasing the respiratory rate lengthens the expiratory time, allowing more complete exhalation. Other strategies include decreasing the inspiratory time (increasing I:E ratio toward 1:3 or 1:4), decreasing tidal volume, and increasing inspiratory flow rate.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q4",
    type: "question",
    question: "A nurse is caring for a client with a pulmonary artery catheter. The PCWP suddenly increases from 12 to 26 mmHg with development of bilateral crackles. What is the most likely cause?",
    options: ["Pulmonary embolism", "Acute left ventricular failure or fluid overload", "Right ventricular failure", "Pneumothorax"],
    correctIndex: 1,
    answer: "PCWP (pulmonary capillary wedge pressure) reflects left atrial pressure and left ventricular end-diastolic pressure. A sudden increase from 12 (normal) to 26 mmHg with bilateral crackles indicates acute left ventricular failure or fluid overload. Blood is backing up from the failing LV into the pulmonary vasculature, causing pulmonary edema. Treatment includes diuretics (furosemide), vasodilators (nitroglycerin), and possibly inotropic support.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q5",
    type: "question",
    question: "A nurse performing a rapid sequence intubation (RSI) prepares the medications. Which combination is typically used?",
    options: ["Propofol and vecuronium", "Etomidate and succinylcholine", "Morphine and midazolam", "Ketamine only"],
    correctIndex: 1,
    answer: "RSI typically uses an induction agent (etomidate preferred for hemodynamic stability, propofol or ketamine as alternatives) followed by a neuromuscular blocking agent (succinylcholine for rapid onset and short duration, or rocuronium for longer paralysis). The goal is rapid loss of consciousness and muscle relaxation to facilitate intubation while minimizing aspiration risk. Preoxygenation is performed before medications.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q6",
    type: "question",
    question: "A client with multiorgan failure has a serum lactate of 6.2 mmol/L. What does this level indicate?",
    options: ["Normal metabolic state", "Tissue hypoperfusion and anaerobic metabolism indicating inadequate oxygen delivery", "Liver function improvement", "Renal tubular acidosis"],
    correctIndex: 1,
    answer: "Elevated serum lactate (normal <2 mmol/L) indicates tissue hypoperfusion where cells have switched to anaerobic metabolism due to inadequate oxygen delivery. A level above 4 mmol/L is associated with significantly increased mortality. Lactate clearance (decreasing trend with treatment) is used as a resuscitation endpoint in sepsis and shock. Persistent elevation despite treatment suggests ongoing hypoperfusion.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q7",
    type: "question",
    question: "A nurse is managing a client on a propofol (Diprivan) infusion for ICU sedation. Which laboratory value must be monitored for propofol infusion syndrome?",
    options: ["Serum glucose", "Serum triglyceride level and creatine kinase (CK)", "Serum sodium", "Serum albumin"],
    correctIndex: 1,
    answer: "Propofol infusion syndrome (PRIS) is a rare but potentially fatal complication of prolonged, high-dose propofol infusion. It is characterized by metabolic acidosis, rhabdomyolysis (elevated CK), hyperkalemia, hepatomegaly, cardiac failure, and hypertriglyceridemia (propofol is formulated in a lipid emulsion). Triglycerides and CK should be monitored regularly. PRIS risk increases with infusion rates >5 mg/kg/hr for >48 hours.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q8",
    type: "question",
    question: "A nurse is caring for a client with acute respiratory failure who is intubated. The ventilator alarm sounds for high pressure. The nurse suctions the ETT and obtains a small amount of thick secretions. The alarm continues. What should the nurse assess next?",
    options: ["Check for pneumothorax by auscultating breath sounds bilaterally", "Increase the FiO2 to 100%", "Reposition the client and call respiratory therapy", "Check the ventilator settings have not been changed"],
    correctIndex: 0,
    answer: "After suctioning did not resolve the high-pressure alarm, the nurse should assess for other causes of increased airway resistance or decreased compliance. Auscultating for absent or diminished breath sounds on one side could indicate pneumothorax, mucus plug in a mainstem bronchus, or ETT migration into the right mainstem bronchus. Client assessment always takes priority over equipment troubleshooting.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q9",
    type: "question",
    question: "A client in the ICU with ARDS is being ventilated with lung-protective strategy. Which tidal volume setting is recommended?",
    options: ["10-12 mL/kg of ideal body weight", "6-8 mL/kg of ideal body weight", "15 mL/kg of actual body weight", "4 mL/kg of ideal body weight"],
    correctIndex: 1,
    answer: "The ARDSNet lung-protective ventilation strategy recommends low tidal volumes of 6-8 mL/kg based on IDEAL (predicted) body weight, not actual weight. This reduces overdistension of healthy alveoli (volutrauma) and decreases mortality. Permissive hypercapnia (allowing PaCO2 to rise above normal) may be accepted to maintain safe tidal volumes. Plateau pressures should be kept below 30 cmH2O.",
    category: "Critical Care",
    difficulty: 3
  },
  {
    id: "rn-cc-q10",
    type: "question",
    question: "A nurse is preparing to perform endotracheal suctioning on an intubated client. Which technique is correct?",
    options: ["Apply continuous suction while inserting and withdrawing the catheter", "Insert the catheter without suction, then apply intermittent suction while withdrawing for no more than 10-15 seconds", "Suction for 30 seconds continuously for thorough secretion removal", "Instill 10 mL normal saline before every suction pass to loosen secretions"],
    correctIndex: 1,
    answer: "Correct suctioning technique: pre-oxygenate with 100% FiO2 for 30-60 seconds, insert the catheter without suction to prevent mucosal trauma, apply intermittent suction while withdrawing using a rotating motion for no more than 10-15 seconds to prevent hypoxia. Allow recovery between passes. Normal saline instillation is no longer routinely recommended as evidence shows it does not improve secretion removal and may increase infection risk.",
    category: "Critical Care",
    difficulty: 2
  },
  // ============================================================
  // MATERNITY (15 cards)
  // ============================================================
  {
    id: "rn-mat-q1",
    type: "question",
    question: "A nurse is monitoring a client receiving oxytocin (Pitocin) for labor induction. Contractions are occurring every 90 seconds, lasting 90 seconds, and the fetal heart rate shows late decelerations. What is the priority action?",
    options: ["Increase the oxytocin rate to speed delivery", "Stop the oxytocin infusion immediately and reposition the client on the left side", "Document the findings and continue monitoring", "Prepare for an amniotomy"],
    correctIndex: 1,
    answer: "Contractions every 90 seconds lasting 90 seconds represent uterine tachysystole (excessive uterine activity), and late decelerations indicate uteroplacental insufficiency. The nurse must immediately stop the oxytocin to allow the uterus to relax, reposition the client to left lateral (improves uterine blood flow), administer oxygen, and increase IV fluids. Terbutaline may be given to relax the uterus. Notify the provider.",
    category: "Maternity",
    difficulty: 3
  },
  {
    id: "rn-mat-q2",
    type: "question",
    question: "A client at 32 weeks gestation presents with painless bright red vaginal bleeding. The nurse suspects placenta previa. Which assessment is absolutely contraindicated?",
    options: ["Abdominal palpation", "Fetal heart rate monitoring", "Digital vaginal examination", "Blood pressure measurement"],
    correctIndex: 2,
    answer: "Digital vaginal examination is ABSOLUTELY CONTRAINDICATED in suspected placenta previa because the examiner's fingers can disrupt the placenta where it covers or is near the cervical os, causing massive, life-threatening hemorrhage. Diagnosis is confirmed by transabdominal ultrasound. External fetal monitoring and gentle abdominal palpation are safe and appropriate.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q3",
    type: "question",
    question: "A nurse is assessing a laboring client whose fetal monitor shows variable decelerations. What is the most common cause?",
    options: ["Head compression during descent", "Uteroplacental insufficiency", "Umbilical cord compression", "Fetal sleep cycle"],
    correctIndex: 2,
    answer: "Variable decelerations are abrupt drops in fetal heart rate that vary in timing, duration, and depth relative to contractions. They are caused by umbilical cord compression. Nursing interventions include repositioning the client (side to side, hands and knees), amnioinfusion if ordered (instilling saline into the uterus to cushion the cord), and discontinuing oxytocin if running. Early decelerations (head compression) are benign.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q4",
    type: "question",
    question: "A client with severe preeclampsia on magnesium sulfate develops respiratory depression (RR 8), absent deep tendon reflexes, and urine output of 15 mL/hour. What is the priority action?",
    options: ["Continue magnesium sulfate and observe", "Stop magnesium sulfate and administer calcium gluconate 1 g IV", "Increase the magnesium sulfate rate", "Administer narcan for respiratory depression"],
    correctIndex: 1,
    answer: "These findings indicate magnesium toxicity: respiratory depression (RR <12), absent DTRs, and oliguria (urine <30 mL/hr). The magnesium infusion must be stopped immediately and calcium gluconate (10 mL of 10% solution = 1 g) administered IV over 3-5 minutes as the antidote. Calcium gluconate directly antagonizes the neuromuscular blocking effects of magnesium. Therapeutic magnesium level is 4-7 mEq/L; toxic effects begin at 7-10 mEq/L.",
    category: "Maternity",
    difficulty: 3
  },
  {
    id: "rn-mat-q5",
    type: "question",
    question: "A nurse is assessing a newborn at 1 minute of life. The infant has a heart rate of 80 bpm, slow and irregular respirations, some flexion of extremities, grimace with stimulation, and blue body with blue extremities. What is the Apgar score?",
    options: ["3", "4", "5", "6"],
    correctIndex: 1,
    answer: "Apgar scoring: Heart rate 80 (below 100) = 1; Respiratory effort (slow/irregular) = 1; Muscle tone (some flexion) = 1; Reflex irritability (grimace) = 1; Color (blue body) = 0. Total = 4. A score of 4-6 indicates moderate depression requiring stimulation and possibly assisted ventilation. Scores below 4 require aggressive resuscitation. The 5-minute Apgar determines if interventions are effective.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q6",
    type: "question",
    question: "A nurse is caring for a postpartum client who delivered vaginally 2 hours ago. On assessment, the uterine fundus is boggy and deviated to the right. What is the FIRST nursing action?",
    options: ["Administer oxytocin IV", "Massage the fundus and have the client void", "Notify the provider immediately", "Apply an ice pack to the abdomen"],
    correctIndex: 1,
    answer: "A boggy, displaced fundus suggests uterine atony (the most common cause of postpartum hemorrhage) and a full bladder displacing the uterus. The FIRST action is to massage the fundus to stimulate contraction and have the client empty their bladder (full bladder prevents uterine contraction). If the fundus does not firm with massage and emptying the bladder, then administer uterotonics (oxytocin, methylergonovine, carboprost) and notify the provider.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q7",
    type: "question",
    question: "A nurse is teaching a client about the risk factors for ectopic pregnancy. Which factor places the client at highest risk?",
    options: ["Previous cesarean delivery", "History of pelvic inflammatory disease (PID)", "First pregnancy", "Use of oral contraceptives"],
    correctIndex: 1,
    answer: "PID, particularly from Chlamydia trachomatis or Neisseria gonorrhoeae, causes tubal scarring and adhesions that impede the fertilized egg's passage through the fallopian tube, dramatically increasing ectopic pregnancy risk. Other risk factors include previous ectopic pregnancy, tubal surgery, IUD use, endometriosis, and smoking. Classic presentation: unilateral lower abdominal pain, vaginal bleeding, and positive pregnancy test.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q8",
    type: "question",
    question: "A nurse is assessing a newborn and notes a tuft of hair and dimple at the base of the spine. What should the nurse suspect?",
    options: ["Normal newborn variant", "Possible spina bifida occulta requiring further evaluation", "Pilonidal cyst", "Birth trauma"],
    correctIndex: 1,
    answer: "A tuft of hair, dermal sinus, or dimple at the base of the spine may indicate spina bifida occulta, the mildest form where the vertebral arch fails to close but the spinal cord and meninges are not herniated. While often asymptomatic, these cutaneous markers warrant further evaluation (spinal ultrasound in neonates or MRI) to rule out tethered cord or other occult spinal dysraphism.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q9",
    type: "question",
    question: "A client at 38 weeks gestation has a reactive non-stress test (NST). What does this result mean?",
    options: ["The fetus is in distress and needs immediate delivery", "The fetal heart rate shows at least 2 accelerations of 15 bpm above baseline lasting 15 seconds in a 20-minute period, indicating fetal well-being", "The test is inconclusive and must be repeated", "The fetus has a congenital heart defect"],
    correctIndex: 1,
    answer: "A reactive (normal) NST shows at least 2 accelerations of the fetal heart rate of 15 bpm above baseline lasting at least 15 seconds within a 20-minute window. Accelerations indicate a healthy, well-oxygenated fetus with intact autonomic nervous system. A non-reactive NST (no accelerations) requires further evaluation with a contraction stress test (CST) or biophysical profile (BPP).",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q10",
    type: "question",
    question: "A nurse is caring for a client diagnosed with HELLP syndrome. Which set of lab values is consistent with this diagnosis?",
    options: ["Elevated liver enzymes, low platelets, elevated LDH", "Normal liver enzymes, high platelets, low LDH", "Elevated liver enzymes, normal platelets, low WBC", "Low liver enzymes, low platelets, high albumin"],
    correctIndex: 0,
    answer: "HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets) is a severe variant of preeclampsia. Lab findings include: hemolysis markers (elevated LDH, schistocytes on peripheral smear, elevated indirect bilirubin), elevated AST/ALT (liver enzymes), and thrombocytopenia (platelets <100,000). It is a medical emergency often requiring delivery regardless of gestational age. Complications include DIC, hepatic rupture, and placental abruption.",
    category: "Maternity",
    difficulty: 3
  },
  {
    id: "rn-mat-q11",
    type: "question",
    question: "A nurse is caring for a postpartum client who is Rh-negative and delivered an Rh-positive baby. When should RhoGAM be administered?",
    options: ["Within 72 hours after delivery", "At the 6-week postpartum visit", "Only if the mother has a positive indirect Coombs test", "RhoGAM is not needed after delivery"],
    correctIndex: 0,
    answer: "RhoGAM (Rh immune globulin) must be administered within 72 hours of delivery of an Rh-positive infant to prevent Rh sensitization. RhoGAM destroys fetal Rh-positive red blood cells that entered the maternal circulation during delivery before the mother's immune system can produce anti-D antibodies. It is also given at 28 weeks gestation and after any potentially sensitizing event (amniocentesis, bleeding, trauma).",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q12",
    type: "question",
    question: "A nurse is assessing a client in the transition phase of labor. Which findings are expected during this phase?",
    options: ["Cervical dilation 1-3 cm, mild contractions, client is chatty and relaxed", "Cervical dilation 8-10 cm, intense contractions every 1-2 minutes, nausea, irritability, and rectal pressure", "Cervical dilation 4-7 cm, moderate contractions, client is focused and cooperative", "No contractions with spontaneous rupture of membranes"],
    correctIndex: 1,
    answer: "Transition is the most intense phase of the first stage of labor (8-10 cm dilation). Contractions are very strong, lasting 60-90 seconds, occurring every 1-2 minutes. The client often experiences nausea/vomiting, extreme irritability, feelings of losing control, rectal pressure, and the urge to push. The nurse should provide continuous support, encouragement, and breathing guidance. This phase typically lasts 30 minutes to 2 hours.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q13",
    type: "question",
    question: "A nurse is caring for a newborn whose mother tested positive for hepatitis B. What should be administered to the newborn within 12 hours of birth?",
    options: ["Hepatitis B vaccine only", "Hepatitis B immune globulin (HBIG) only", "Both hepatitis B vaccine AND HBIG within 12 hours of birth", "No intervention needed; test the infant at 6 months"],
    correctIndex: 2,
    answer: "Neonates born to HBsAg-positive mothers must receive BOTH hepatitis B vaccine (active immunity) AND hepatitis B immune globulin (HBIG, passive immunity) within 12 hours of birth, preferably at different injection sites. This dual approach provides immediate protection (HBIG) while the vaccine stimulates the infant's own immune response. This combination is 85-95% effective in preventing perinatal hepatitis B transmission.",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q14",
    type: "question",
    question: "A nurse is performing a postpartum assessment. Which finding indicates a potential complication that requires immediate notification of the provider?",
    options: ["Lochia rubra on day 1 postpartum", "Moderate uterine cramping during breastfeeding", "Foul-smelling lochia with fever of 38.5°C on day 3", "Perineal edema with ice pack in place"],
    correctIndex: 2,
    answer: "Foul-smelling lochia with fever suggests endometritis (postpartum uterine infection), a significant complication that requires prompt antibiotic therapy. Risk factors include cesarean delivery, prolonged rupture of membranes, multiple vaginal examinations, and chorioamnionitis. The nurse should assess the fundus (tender, boggy), obtain cultures, and anticipate IV antibiotic therapy (commonly clindamycin plus gentamicin).",
    category: "Maternity",
    difficulty: 2
  },
  {
    id: "rn-mat-q15",
    type: "question",
    question: "A nurse is caring for a client with gestational hypertension. The client's blood pressure is 168/108. Which assessment is most critical to differentiate gestational hypertension from preeclampsia?",
    options: ["Heart rate and respiratory rate", "Urinalysis for proteinuria", "Blood glucose level", "Complete blood count"],
    correctIndex: 1,
    answer: "The hallmark distinction between gestational hypertension and preeclampsia is the presence of proteinuria (>300 mg in 24-hour urine or protein/creatinine ratio >0.3). Preeclampsia may also present without proteinuria if accompanied by thrombocytopenia, elevated liver enzymes, renal insufficiency, pulmonary edema, or cerebral/visual symptoms. Lab work including liver enzymes, platelets, and creatinine should also be obtained.",
    category: "Maternity",
    difficulty: 2
  },
  // ============================================================
  // MENTAL HEALTH (15 cards)
  // ============================================================
  {
    id: "rn-mh-q1",
    type: "question",
    question: "A client with major depressive disorder being treated with an SSRI develops hyperthermia, muscle rigidity, altered mental status, and clonus. What does the nurse suspect?",
    options: ["Neuroleptic malignant syndrome", "Serotonin syndrome", "Malignant hyperthermia", "Anticholinergic toxicity"],
    correctIndex: 1,
    answer: "The triad of hyperthermia, altered mental status, and neuromuscular abnormalities (clonus, hyperreflexia, myoclonus, rigidity) following SSRI use suggests serotonin syndrome. It occurs from excess serotonergic activity, often from drug interactions (SSRIs + MAOIs, tramadol, triptans, linezolid). Treatment includes stopping the offending agent, supportive care, and cyproheptadine (serotonin antagonist) for severe cases. Distinct from NMS which involves dopamine blockade.",
    category: "Mental Health",
    difficulty: 3
  },
  {
    id: "rn-mh-q2",
    type: "question",
    question: "A nurse is using therapeutic communication with a depressed client who says, 'Nobody would care if I just disappeared.' Which response is most therapeutic?",
    options: ["Don't say that, lots of people care about you", "Are you thinking about hurting yourself or ending your life?", "Everyone feels that way sometimes", "Let's talk about something more positive"],
    correctIndex: 1,
    answer: "Directly asking about suicidal ideation is therapeutic and does NOT plant the idea. The nurse must assess the client's safety by asking direct questions: 'Are you thinking about suicide? Do you have a plan? Do you have access to means?' Dismissing, minimizing, or redirecting from suicidal statements is unsafe and misses critical assessment data. The nurse should remain calm, non-judgmental, and use active listening.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q3",
    type: "question",
    question: "A client with bipolar disorder has been stable on lithium for 2 years. The client wants to start a low-sodium diet for weight loss. What should the nurse advise?",
    options: ["A low-sodium diet is safe and encouraged", "Sodium and lithium compete for reabsorption in the kidneys; a low-sodium diet can cause dangerous lithium toxicity", "Sodium intake has no relationship to lithium levels", "The client should increase sodium intake while on lithium"],
    correctIndex: 1,
    answer: "Lithium and sodium are both reabsorbed in the proximal tubule of the kidney. When sodium intake decreases, the kidneys compensate by increasing reabsorption of both sodium AND lithium, leading to elevated lithium levels and potential toxicity. Clients on lithium must maintain consistent sodium and fluid intake. Dehydration, diuretics, excessive sweating, vomiting, and diarrhea also increase lithium levels dangerously.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q4",
    type: "question",
    question: "A nurse is caring for a client with schizophrenia who is taking clozapine. The client develops a fever of 39°C and sore throat. What is the MOST critical action?",
    options: ["Administer acetaminophen and throat lozenges", "Obtain a STAT complete blood count with differential to rule out agranulocytosis", "Continue clozapine and monitor symptoms", "Switch to a different antipsychotic immediately without lab work"],
    correctIndex: 1,
    answer: "Fever and sore throat in a client on clozapine are RED FLAG symptoms for agranulocytosis (severe neutropenia with ANC <500), a potentially fatal side effect unique to clozapine. A STAT CBC with differential must be obtained immediately. If ANC is critically low, clozapine must be stopped permanently, the client placed in protective isolation, and broad-spectrum antibiotics started. This is why the Clozapine REMS program requires regular blood monitoring.",
    category: "Mental Health",
    difficulty: 3
  },
  {
    id: "rn-mh-q5",
    type: "question",
    question: "A nurse is caring for a client who is involuntarily committed to the psychiatric unit. The client asks to leave. Which statement by the nurse best addresses the client's rights?",
    options: ["You have no rights since you were committed", "You were admitted because a physician determined you are a danger to yourself or others. You have the right to a hearing and legal representation", "You can leave whenever you want", "You must stay until the insurance company approves discharge"],
    correctIndex: 1,
    answer: "Involuntarily committed clients retain most civil rights, including the right to a judicial hearing, legal representation, informed consent for treatment (with limited exceptions for emergency situations), communication with an attorney, and humane treatment. The commitment is based on clinical determination of danger to self or others or grave disability. The nurse must explain the legal process while maintaining safety.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q6",
    type: "question",
    question: "A nurse is admitting a client with anorexia nervosa whose BMI is 14. Which complication is the MOST immediately life-threatening?",
    options: ["Amenorrhea", "Lanugo (fine body hair)", "Cardiac arrhythmia from electrolyte imbalance", "Dental erosion"],
    correctIndex: 2,
    answer: "The most immediately life-threatening complication of severe anorexia nervosa is cardiac arrhythmia caused by electrolyte imbalances, particularly hypokalemia, hypomagnesemia, and hypophosphatemia. Cardiac monitoring is essential. Prolonged QTc interval increases the risk of torsades de pointes and sudden cardiac death. Other cardiac complications include bradycardia, mitral valve prolapse, and heart failure from muscle wasting.",
    category: "Mental Health",
    difficulty: 3
  },
  {
    id: "rn-mh-q7",
    type: "question",
    question: "A client presents to the ED after being sexually assaulted. Which nursing action is the priority?",
    options: ["Collect forensic evidence (rape kit) immediately", "Ensure physical safety, provide emotional support, and obtain informed consent before any examination", "Encourage the client to take a shower to feel clean", "Contact law enforcement before doing anything else"],
    correctIndex: 1,
    answer: "The priority is ensuring the client's immediate physical safety and providing emotional support. Informed consent is required before any examination or evidence collection. The client must not be pressured and should be given control over the process. Do NOT have the client shower, change clothes, eat, drink, or urinate before evidence collection if consent is given. A SANE (Sexual Assault Nurse Examiner) should perform the forensic exam.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q8",
    type: "question",
    question: "A client taking haloperidol (Haldol) develops severe muscle rigidity, high fever (41°C), autonomic instability, and altered consciousness. The CK is 12,000 U/L. What is this condition?",
    options: ["Serotonin syndrome", "Neuroleptic malignant syndrome (NMS)", "Extrapyramidal side effects", "Tardive dyskinesia"],
    correctIndex: 1,
    answer: "NMS is a life-threatening reaction to dopamine-blocking agents (typical antipsychotics like haloperidol are highest risk). The cardinal features are 'FEVER': Fever, Encephalopathy (altered consciousness), Vitals unstable (autonomic instability), Elevated enzymes (CK), and Rigidity (lead-pipe). Treatment: stop the antipsychotic, supportive care in ICU, dantrolene sodium (muscle relaxant), and bromocriptine (dopamine agonist). Mortality is 10-20% if untreated.",
    category: "Mental Health",
    difficulty: 3
  },
  {
    id: "rn-mh-q9",
    type: "question",
    question: "A client with generalized anxiety disorder asks the nurse about the difference between SSRIs and benzodiazepines for long-term anxiety management. What is the most accurate response?",
    options: ["Both are equally appropriate for long-term use", "SSRIs are preferred for long-term management as they are non-addictive; benzodiazepines are best for short-term or acute anxiety due to dependence risk", "Benzodiazepines are safer for long-term use", "Neither class is effective for anxiety"],
    correctIndex: 1,
    answer: "SSRIs (sertraline, escitalopram, paroxetine) are first-line for long-term anxiety management. They modify serotonin signaling without physical dependence risk. Benzodiazepines (lorazepam, alprazolam, clonazepam) provide rapid relief for acute anxiety but carry risks of tolerance, physical dependence, withdrawal seizures, and cognitive impairment with long-term use. They are best used short-term while SSRIs take effect (2-4 weeks).",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q10",
    type: "question",
    question: "A nurse is de-escalating an agitated client on a psychiatric unit. Which non-verbal approach is most appropriate?",
    options: ["Stand directly in front of the client with arms crossed to show authority", "Maintain a relaxed, open posture at a 45-degree angle with an escape route, at a distance of at least one arm's length", "Turn your back to the client to appear non-threatening", "Touch the client's shoulder to show empathy"],
    correctIndex: 1,
    answer: "De-escalation non-verbal techniques: stand at a 45-degree angle (less confrontational than face-to-face), maintain at least one arm's length distance (safety), ensure you have an exit path behind you, keep a relaxed open posture (uncrossed arms), speak calmly and slowly, and avoid touching the client (may escalate aggression). Never turn your back, corner the client, or invade personal space.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q11",
    type: "question",
    question: "A client who recently started fluoxetine (Prozac) for depression reports feeling much more energetic after 1 week but still reports hopelessness. The nurse is MOST concerned because:",
    options: ["The medication is not working", "The client may now have enough energy to act on suicidal ideation that was previously inhibited by psychomotor retardation", "The client is having a manic episode", "Fluoxetine always causes increased energy before mood improvement"],
    correctIndex: 1,
    answer: "This is the most dangerous period of antidepressant therapy. SSRIs often improve energy and psychomotor function before improving mood and hopelessness. A previously immobilized depressed client now has the energy to carry out a suicide plan while still feeling hopeless. Close monitoring and safety assessment are critical during the first 2-4 weeks of antidepressant therapy and during dose changes. This is why a black box warning exists for SSRIs in young adults.",
    category: "Mental Health",
    difficulty: 3
  },
  {
    id: "rn-mh-q12",
    type: "question",
    question: "A client with borderline personality disorder repeatedly calls the nurse's station requesting PRN medication, threatening self-harm if it is not given. Which nursing approach is most appropriate?",
    options: ["Give the PRN medication immediately every time to prevent self-harm", "Set clear, consistent limits while acknowledging the client's distress and offering alternative coping strategies", "Ignore the client's requests entirely", "Threaten to transfer the client to a different unit"],
    correctIndex: 1,
    answer: "Clients with BPD require firm, consistent boundaries delivered in a compassionate, non-punitive manner. The nurse should acknowledge the distress ('I can see you're in pain'), maintain limits ('PRN medication is available every 6 hours per your treatment plan'), and offer alternatives ('Let's talk about what you're feeling, or try the coping skills we discussed'). Inconsistency reinforces manipulative behavior. All staff must follow the same care plan.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q13",
    type: "question",
    question: "A client is receiving electroconvulsive therapy (ECT) for severe treatment-resistant depression. Which medication should the nurse anticipate administering before the procedure?",
    options: ["Haloperidol for sedation", "Succinylcholine (a short-acting neuromuscular blocker) and a brief general anesthetic", "Lithium for mood stabilization", "Naloxone for pain prevention"],
    correctIndex: 1,
    answer: "Modern ECT uses brief general anesthesia (methohexital or propofol) and a short-acting neuromuscular blocker (succinylcholine) to prevent injury from seizure-induced muscle contractions. Glycopyrrolate or atropine may be given to reduce secretions and prevent bradycardia. The client is pre-oxygenated and ventilated during the procedure. Common side effects include temporary confusion and memory loss. ECT is highly effective for treatment-resistant depression.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q14",
    type: "question",
    question: "A nurse is teaching a client who is starting disulfiram (Antabuse) for alcohol use disorder. Which instruction is essential?",
    options: ["You may continue to drink small amounts of alcohol while taking this medication", "Avoid ALL forms of alcohol including mouthwash, cooking wines, cough syrups, and vinegar-based sauces, as even small amounts cause a severe reaction", "This medication reduces alcohol cravings", "Disulfiram can be started while the client is still actively drinking"],
    correctIndex: 1,
    answer: "Disulfiram inhibits aldehyde dehydrogenase, causing toxic acetaldehyde accumulation when any alcohol is consumed. The disulfiram-ethanol reaction includes flushing, throbbing headache, nausea, vomiting, chest pain, hypotension, and potentially cardiovascular collapse. ALL alcohol sources must be avoided, including hidden sources (cologne, hand sanitizer, vanilla extract, mouthwash, cooking wine). The client must be alcohol-free for at least 12 hours before starting.",
    category: "Mental Health",
    difficulty: 2
  },
  {
    id: "rn-mh-q15",
    type: "question",
    question: "A nurse assesses a client brought to the ED by paramedics after an intentional overdose of acetaminophen 6 hours ago. The client is alert, oriented, and asymptomatic. Should the nurse be concerned?",
    options: ["No, the client looks fine and can likely be discharged", "Yes, acetaminophen toxicity has a delayed presentation; the client needs an acetaminophen level, AST/ALT, and N-acetylcysteine (NAC) should be started if levels are above the treatment line on the Rumack-Matthew nomogram", "Only if the client took more than 10 tablets", "The client should be given activated charcoal and discharged"],
    correctIndex: 1,
    answer: "Acetaminophen toxicity is insidious. Stage 1 (0-24 hours) may be asymptomatic or have only mild nausea. Stage 2 (24-72 hours) brings hepatotoxicity (rising AST/ALT, RUQ pain). Stage 3 (72-96 hours) can involve fulminant liver failure, coagulopathy, encephalopathy, and death. N-acetylcysteine (NAC) is most effective within 8 hours but can benefit up to 72 hours. The 4-hour acetaminophen level is plotted on the Rumack-Matthew nomogram to guide treatment.",
    category: "Mental Health",
    difficulty: 2
  },
  // ============================================================
  // PEDIATRICS (15 cards)
  // ============================================================
  {
    id: "rn-peds-q1",
    type: "question",
    question: "A 2-year-old child with epiglottitis presents with high fever, drooling, and inspiratory stridor while sitting upright in the tripod position. Which action is contraindicated?",
    options: ["Administering humidified oxygen", "Examining the throat with a tongue depressor", "Keeping the child calm with the parent", "Preparing for possible intubation"],
    correctIndex: 1,
    answer: "NEVER examine the throat or use a tongue depressor in suspected epiglottitis. Manipulation of the inflamed epiglottis can cause complete airway obstruction and respiratory arrest. The child should remain calm, in the position of comfort (usually tripod/sitting), with humidified oxygen and preparation for emergency intubation by the most skilled provider available. IV antibiotics (ceftriaxone) are given after airway is secured.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q2",
    type: "question",
    question: "A nurse is assessing a 4-month-old infant with pyloric stenosis. Which finding is most characteristic?",
    options: ["Bilious vomiting and abdominal distension", "Non-bilious projectile vomiting, olive-shaped mass in RUQ, and hungry infant", "Bloody stools and fever", "Ribbon-like stools and failure to thrive"],
    correctIndex: 1,
    answer: "Pyloric stenosis presents with non-bilious projectile vomiting (the obstruction is above the ampulla of Vater where bile enters) that typically begins at 2-6 weeks of age. An olive-shaped mass may be palpated in the right upper quadrant (hypertrophied pylorus). The infant is characteristically hungry after vomiting. Visible gastric peristaltic waves may be seen. Labs show hypochloremic metabolic alkalosis. Treatment is pyloromyotomy.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q3",
    type: "question",
    question: "A 3-year-old with nephrotic syndrome has severe edema, proteinuria, and a serum albumin of 1.4 g/dL. The parent asks why the child's face is so puffy in the morning. What is the nurse's explanation?",
    options: ["Fluid accumulates in the face overnight because gravity redistributes edema fluid to the head when the child lies flat", "The child is drinking too much water", "The medication is causing facial swelling", "The child has an allergic reaction"],
    correctIndex: 0,
    answer: "In nephrotic syndrome, massive proteinuria causes hypoalbuminemia, which reduces plasma oncotic pressure. Fluid shifts from intravascular to interstitial spaces. When the child lies flat overnight, gravity redistributes the edema to the face, causing periorbital puffiness most prominent in the morning. By evening, gravity pulls fluid to the lower extremities, and facial edema improves. Daily weights and I&O monitoring are essential.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q4",
    type: "question",
    question: "A nurse is calculating maintenance IV fluids for a 22-kg child using the Holliday-Segar method. What is the hourly rate?",
    options: ["42 mL/hour", "62 mL/hour", "52 mL/hour", "72 mL/hour"],
    correctIndex: 1,
    answer: "Holliday-Segar method: First 10 kg = 100 mL/kg/day (1,000 mL). Next 10 kg = 50 mL/kg/day (500 mL). Remaining 2 kg = 20 mL/kg/day (40 mL). Total = 1,540 mL/day ÷ 24 hours = 64.2 mL/hour (approximately 62-64 mL/hour). This method is essential for pediatric fluid calculations and is a common NCLEX and clinical calculation.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q5",
    type: "question",
    question: "A 6-month-old infant is brought to the ED with inconsolable crying, drawing up the legs, and 'currant jelly' stools. What condition does the nurse suspect?",
    options: ["Pyloric stenosis", "Intussusception", "Hirschsprung disease", "Necrotizing enterocolitis"],
    correctIndex: 1,
    answer: "The classic triad of intussusception is colicky abdominal pain (drawing up legs with crying episodes alternating with calm periods), vomiting, and currant jelly stools (mixture of blood and mucus from bowel wall ischemia). It occurs when one segment of bowel telescopes into an adjacent segment, most commonly ileocecal. Treatment is air or barium enema reduction; surgery is needed if reduction fails or if peritonitis is present.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q6",
    type: "question",
    question: "A nurse is teaching parents about car seat safety for a newborn. Which instruction is correct per current AAP guidelines?",
    options: ["The car seat should face forward from birth", "Rear-facing car seats should be used until at least age 2 or until the child exceeds the rear-facing weight/height limits", "Car seats are optional for short trips", "The car seat should be placed in the front passenger seat for easy access"],
    correctIndex: 1,
    answer: "Current AAP guidelines recommend rear-facing car seats for as long as possible, at least until age 2 or until the child exceeds the rear-facing height and weight limits of the seat. Rear-facing provides the best protection for the infant's head, neck, and spine in a frontal crash. The car seat must always be in the back seat. Never place a rear-facing car seat in front of an active airbag.",
    category: "Pediatrics",
    difficulty: 1
  },
  {
    id: "rn-peds-q7",
    type: "question",
    question: "A nurse is caring for a child with cystic fibrosis. The parent asks why the child needs to take pancreatic enzymes (pancrelipase) with every meal and snack. What is the best explanation?",
    options: ["The enzymes prevent lung infections", "Thick mucus blocks the pancreatic ducts, preventing digestive enzymes from reaching the intestine. The supplement replaces these enzymes so the child can absorb nutrients from food", "The enzymes improve lung function", "The enzymes prevent diabetes"],
    correctIndex: 1,
    answer: "In CF, thick, viscous secretions obstruct the pancreatic ducts, preventing pancreatic enzymes (lipase, protease, amylase) from reaching the small intestine. Without these enzymes, fats, proteins, and starches cannot be properly digested and absorbed, leading to malnutrition, steatorrhea (foul-smelling, bulky, greasy stools), and fat-soluble vitamin deficiencies (A, D, E, K). Pancrelipase must be taken with every meal and snack.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q8",
    type: "question",
    question: "A 15-year-old with type 1 diabetes is admitted with DKA for the third time this year. The adolescent admits to skipping insulin doses. What is the most appropriate nursing approach?",
    options: ["Lecture the adolescent about the dangers of skipping insulin", "Assess barriers to adherence including psychosocial factors, peer pressure, body image concerns, and diabulimia in a non-judgmental manner", "Threaten to inform the school about the non-compliance", "Simply reinforce the insulin injection technique"],
    correctIndex: 1,
    answer: "Recurrent DKA in adolescents often has psychosocial underpinnings. 'Diabulimia' (intentional insulin omission for weight control) is a recognized and dangerous eating disorder in type 1 diabetes. The nurse should explore barriers non-judgmentally: body image concerns, peer pressure, mental health issues (depression, anxiety), family dynamics, and practical barriers. Referral to a diabetes educator, psychologist, and social worker may be needed.",
    category: "Pediatrics",
    difficulty: 3
  },
  {
    id: "rn-peds-q9",
    type: "question",
    question: "A nurse is assessing a newborn with a myelomeningocele. Which nursing action is the highest priority before surgical repair?",
    options: ["Cover the sac with a sterile, moist, non-adherent dressing to prevent drying and infection", "Place the infant in a supine position for comfort", "Begin oral feedings immediately", "Measure head circumference monthly"],
    correctIndex: 0,
    answer: "Myelomeningocele (open spina bifida) exposes the spinal cord and meninges. Before surgical repair, the sac must be covered with sterile, saline-moistened, non-adherent dressing to prevent drying, rupture, and infection. The infant is positioned prone or side-lying to prevent pressure on the sac. Latex precautions are essential (high latex allergy risk). Head circumference is monitored for hydrocephalus but the sac protection is the immediate priority.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q10",
    type: "question",
    question: "A nurse is calculating a pediatric medication dose. A 30-kg child is prescribed amoxicillin 25 mg/kg/day divided into three doses. The pharmacy supplies amoxicillin 250 mg/5 mL. How many mL should be given per dose?",
    options: ["5 mL", "10 mL", "15 mL", "20 mL"],
    correctIndex: 0,
    answer: "Step 1: Total daily dose = 25 mg/kg × 30 kg = 750 mg/day. Step 2: Dose per administration = 750 mg ÷ 3 doses = 250 mg per dose. Step 3: Volume per dose = (250 mg ÷ 250 mg) × 5 mL = 5 mL per dose. Pediatric medication calculations require weight-based dosing and must always be verified against safe dose ranges and double-checked before administration.",
    category: "Pediatrics",
    difficulty: 1
  },
  {
    id: "rn-peds-q11",
    type: "question",
    question: "A 5-year-old child is admitted with acute rheumatic fever following a group A streptococcal pharyngitis. Which finding is a major Jones criterion?",
    options: ["Fever", "Elevated ESR", "Carditis (new murmur)", "Prolonged PR interval on ECG"],
    correctIndex: 2,
    answer: "The revised Jones criteria for diagnosing acute rheumatic fever include 5 major criteria: Carditis (new murmur, pericarditis, heart failure), Polyarthritis (migratory joint inflammation), Chorea (Sydenham's chorea), Erythema marginatum (ring-shaped rash), Subcutaneous nodules. Minor criteria include fever, arthralgia, elevated ESR/CRP, and prolonged PR interval. Diagnosis requires 2 major OR 1 major + 2 minor criteria with evidence of prior strep infection.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q12",
    type: "question",
    question: "A nurse is educating parents of a child diagnosed with sickle cell disease about crisis prevention. Which instruction is most important?",
    options: ["Restrict the child's physical activity completely", "Ensure adequate hydration, avoid temperature extremes, and seek prompt treatment for infections", "Give aspirin for pain management", "The child should avoid all social activities to prevent infections"],
    correctIndex: 1,
    answer: "Crisis prevention in sickle cell disease focuses on avoiding triggers that cause sickling: dehydration (maintain generous fluid intake), temperature extremes (cold causes vasoconstriction), high altitude (low oxygen), and infections (functional asplenia increases risk from encapsulated organisms). Hydroxyurea reduces crisis frequency. Aspirin is avoided due to Reye syndrome risk in children. Moderate activity is encouraged; complete restriction is unnecessary.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q13",
    type: "question",
    question: "A nurse is caring for a child with suspected child abuse. Which documentation is most important?",
    options: ["The nurse's opinion about who caused the injuries", "Objective, detailed description of injuries (size, shape, color, location, stage of healing) with body diagrams and verbatim quotes from the child", "A brief note stating 'suspected abuse'", "Only photograph the injuries without written documentation"],
    correctIndex: 1,
    answer: "Documentation in suspected child abuse must be objective, thorough, and factual. Include: exact size and location of injuries using body diagrams, color and stage of healing (helps determine if injuries are of different ages), verbatim quotes from the child and caregivers (placed in quotation marks), photographs per facility protocol, and developmental stage assessment (can the child's development explain the injury mechanism described?). Nurses are mandated reporters.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q14",
    type: "question",
    question: "A nurse is caring for a child with hemophilia A who falls and develops a large hematoma on the knee. What is the priority treatment?",
    options: ["Apply heat to the area to promote absorption", "Administer factor VIII concentrate and apply RICE (rest, ice, compression, elevation)", "Administer aspirin for pain", "Encourage the child to walk on the affected leg to prevent stiffness"],
    correctIndex: 1,
    answer: "Hemophilia A is a deficiency of clotting factor VIII. Bleeding episodes are treated with factor VIII concentrate infusion to achieve hemostasis. RICE (rest, ice, compression, elevation) is applied to the joint to minimize swelling and further bleeding. Aspirin and NSAIDs are CONTRAINDICATED (impair platelet function). Heat is contraindicated acutely (increases blood flow and bleeding). Acetaminophen is safe for pain relief.",
    category: "Pediatrics",
    difficulty: 2
  },
  {
    id: "rn-peds-q15",
    type: "question",
    question: "A nurse is preparing to administer an IM injection to a 4-month-old infant. What is the preferred injection site?",
    options: ["Deltoid muscle", "Dorsogluteal muscle", "Vastus lateralis muscle of the anterolateral thigh", "Ventrogluteal muscle"],
    correctIndex: 2,
    answer: "The vastus lateralis (anterolateral thigh) is the preferred IM injection site for infants under 12 months. It has the largest muscle mass in infants and is free of major nerves and blood vessels. The deltoid is too small for IM injections in infants. The dorsogluteal site is NEVER used in children under 3 years (gluteal muscles are underdeveloped, risk of sciatic nerve injury). Ventrogluteal may be used in older infants with provider approval.",
    category: "Pediatrics",
    difficulty: 1
  },
  // ============================================================
  // EMERGENCY (15 cards)
  // ============================================================
  {
    id: "rn-emerg-q1",
    type: "question",
    question: "A nurse is performing CPR on an adult client. After 2 minutes of CPR, the AED analyzes the rhythm and advises 'no shock.' The client has no pulse. What should the nurse do?",
    options: ["Stop CPR and wait for advanced life support", "Resume CPR immediately for another 2 minutes", "Check the AED pads and retry the shock", "Begin rescue breathing only"],
    correctIndex: 1,
    answer: "A 'no shock advised' by the AED means the rhythm is not shockable (asystole or PEA), NOT that the client is alive. CPR must be resumed immediately for another 2 minutes before re-analysis. High-quality CPR (rate 100-120/min, depth 2-2.4 inches, full chest recoil, minimal interruptions) is the foundation of resuscitation. Epinephrine is the primary medication for non-shockable rhythms.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q2",
    type: "question",
    question: "A client with a suspected cervical spine injury is being transported. Which immobilization technique is most appropriate?",
    options: ["Manual inline stabilization with cervical collar, head blocks, and backboard", "Place the client in a sitting position with a soft collar", "Allow the client to position themselves for comfort", "Apply traction to the neck to realign the spine"],
    correctIndex: 0,
    answer: "Cervical spine immobilization requires manual inline stabilization (hands on either side of the head to prevent rotation, flexion, or extension), application of a properly sized rigid cervical collar, lateral head blocks (towel rolls or commercial head blocks), and securing to a long backboard with straps. The goal is to maintain neutral spine alignment and prevent secondary spinal cord injury during transport.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q3",
    type: "question",
    question: "A nurse in the ED is triaging 4 clients who arrive simultaneously. Which client should be seen FIRST?",
    options: ["Client with a closed forearm fracture and moderate pain", "Client with chest pain, diaphoresis, and jaw pain radiating to the left arm", "Client with a laceration on the forehead with controlled bleeding", "Client with a twisted ankle and mild swelling"],
    correctIndex: 1,
    answer: "Using the Emergency Severity Index (ESI) or any triage system, chest pain with diaphoresis and radiation to the jaw/left arm suggests acute myocardial infarction, which is immediately life-threatening. This client requires emergent evaluation (ESI Level 1-2). The forearm fracture and laceration are urgent but not immediately life-threatening (ESI Level 3). The twisted ankle is non-urgent (ESI Level 4-5).",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q4",
    type: "question",
    question: "A client is brought to the ED after a house fire with burns to the face, singeing of nasal hair, and a hoarse voice. What is the MOST critical concern?",
    options: ["Pain management for the facial burns", "Impending airway edema from inhalation injury", "Fluid resuscitation for burn shock", "Tetanus prophylaxis"],
    correctIndex: 1,
    answer: "Facial burns, singed nasal hairs, and hoarseness are classic signs of inhalation injury with impending airway compromise. Airway edema develops rapidly and can cause complete obstruction within hours. EARLY endotracheal intubation is essential before edema makes intubation impossible. Once airway is secured, fluid resuscitation (Parkland formula: 4 mL × %TBSA × kg in first 24 hours) and wound care can proceed.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q5",
    type: "question",
    question: "A nurse receives a client with a snakebite on the right hand. The area is swollen with two puncture marks. What is the priority nursing intervention?",
    options: ["Apply a tourniquet above the bite", "Apply ice directly to the bite", "Remove jewelry from the affected hand, keep the extremity below heart level, and prepare for antivenom administration", "Incise the wound and suction the venom"],
    correctIndex: 2,
    answer: "Priority interventions for snakebite: remove rings, watches, and constrictive clothing before swelling progresses; immobilize the extremity and keep it below heart level (slows venom distribution); establish IV access in the unaffected arm; prepare for antivenom (CroFab for pit viper bites). Do NOT apply tourniquet, ice, or incision/suction (outdated and harmful practices that can worsen tissue damage). Mark the edge of swelling and time it to track progression.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q6",
    type: "question",
    question: "During a mass casualty incident, a nurse is performing START triage. A victim is not breathing. After repositioning the airway, the victim begins breathing at 24 breaths/min. What triage color is assigned?",
    options: ["Green (minor/walking wounded)", "Yellow (delayed)", "Red (immediate)", "Black (expectant/deceased)"],
    correctIndex: 2,
    answer: "In START triage, if a non-breathing victim begins breathing after airway positioning, they are tagged RED (immediate) because they require urgent intervention. If breathing does not resume, they are BLACK (expectant/deceased). Victims breathing >30/min are RED. Victims with radial pulse absent or capillary refill >2 seconds are RED. Victims who cannot follow simple commands are RED. Walking wounded are GREEN. Others are YELLOW.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q7",
    type: "question",
    question: "A client presents to the ED with an acute anaphylactic reaction after a bee sting. BP is 68/40, widespread urticaria, and audible wheezing. What is the FIRST medication to administer?",
    options: ["Diphenhydramine (Benadryl) IV", "Epinephrine 0.3-0.5 mg IM into the anterolateral thigh", "Albuterol nebulizer", "Methylprednisolone IV"],
    correctIndex: 1,
    answer: "Epinephrine is the FIRST and MOST IMPORTANT medication in anaphylaxis. It is given IM (NOT subcutaneously) in the anterolateral thigh for fastest absorption. Dose: 0.3-0.5 mg of 1:1,000 concentration for adults. It reverses bronchospasm (beta-2), increases blood pressure (alpha-1), and reduces mast cell mediator release. Antihistamines and steroids are adjuncts but should NEVER delay epinephrine. May repeat every 5-15 minutes.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q8",
    type: "question",
    question: "A nurse is caring for a client with a flail chest segment. Which respiratory pattern does the nurse expect to observe?",
    options: ["Both sides of the chest rise symmetrically", "The flail segment moves inward during inspiration and outward during expiration (paradoxical movement)", "Rapid shallow breathing without chest wall abnormalities", "Normal chest movement with decreased breath sounds"],
    correctIndex: 1,
    answer: "Flail chest occurs when 3 or more adjacent ribs are fractured in 2 or more places, creating a free-floating segment. This segment moves paradoxically: inward during inspiration (negative intrathoracic pressure pulls the unsupported segment in) and outward during expiration. This impairs ventilation and the underlying pulmonary contusion further compromises gas exchange. Management includes pain control, positive pressure ventilation if needed, and pulmonary toilet.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q9",
    type: "question",
    question: "A client with a suspected tension pneumothorax has tracheal deviation, absent breath sounds on the left, JVD, and hypotension. The ED physician performs needle decompression. At which anatomical landmark is this performed?",
    options: ["5th intercostal space, mid-axillary line", "2nd intercostal space, midclavicular line on the affected side", "4th intercostal space, anterior axillary line", "Subxiphoid approach"],
    correctIndex: 1,
    answer: "Needle decompression for tension pneumothorax is performed at the 2nd intercostal space, midclavicular line on the AFFECTED side. A large-bore needle (14-16 gauge) is inserted above the 3rd rib (to avoid the neurovascular bundle running along the inferior border of each rib). A rush of air confirms the diagnosis. This converts the tension pneumothorax to a simple pneumothorax, followed by formal chest tube insertion.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q10",
    type: "question",
    question: "A nurse is providing care during a chemical exposure incident. Victims arrive at the ED with an unknown chemical exposure. What is the FIRST action?",
    options: ["Bring victims inside the ED immediately for treatment", "Perform decontamination OUTSIDE the ED before victims enter the building", "Start IV fluids on all victims", "Identify the specific chemical before taking any action"],
    correctIndex: 1,
    answer: "Decontamination must occur OUTSIDE the emergency department to prevent secondary contamination of the facility and staff. Victims remove all clothing (removes approximately 80% of contaminant) and undergo water-based decontamination before entering the ED. Staff performing decontamination must wear appropriate PPE. The ED should be in lockdown mode with controlled access until decontamination is complete.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q11",
    type: "question",
    question: "A client in the ED is found to be in pulseless ventricular tachycardia. According to ACLS guidelines, what is the sequence of interventions?",
    options: ["Epinephrine first, then defibrillation", "CPR, then defibrillation as soon as the defibrillator is available, then resume CPR", "Amiodarone first, then CPR", "Synchronized cardioversion at 50 joules"],
    correctIndex: 1,
    answer: "Pulseless VT is a shockable rhythm. ACLS sequence: begin high-quality CPR immediately, defibrillate as soon as the defibrillator is available (biphasic 120-200J), resume CPR for 2 minutes, then reassess. Epinephrine 1 mg IV/IO is given after the 2nd shock. Amiodarone 300 mg IV is given after the 3rd shock. Synchronized cardioversion is used for VT WITH a pulse, not pulseless VT.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q12",
    type: "question",
    question: "A nurse is caring for a client with heat stroke. Core body temperature is 41.5°C (106.7°F). The client is confused and has hot, dry skin. What is the priority intervention?",
    options: ["Administer acetaminophen and encourage oral fluids", "Initiate rapid cooling with ice packs to groin, axillae, and neck, plus evaporative cooling with tepid water misting and fans", "Place the client in a warm room and monitor", "Give cold water to drink immediately"],
    correctIndex: 1,
    answer: "Heat stroke is a true medical emergency with mortality rates of 10-80% if untreated. The priority is rapid cooling to reduce core temperature below 39°C within 30 minutes. Methods include ice packs to major vessels (groin, axillae, neck), evaporative cooling (misting with tepid water plus fans), and cold IV fluids. Antipyretics (acetaminophen, NSAIDs) are INEFFECTIVE because the hyperthermia is from heat absorption, not pyrogen-mediated.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q13",
    type: "question",
    question: "A client is brought to the ED after near-drowning in cold water. The client is pulseless and hypothermic (30°C). Should resuscitation be attempted?",
    options: ["No, the client is already dead", "Yes, begin CPR and rewarming; hypothermic patients are not declared dead until warm and dead", "Only if the submersion time was less than 5 minutes", "Only if the client is under 18 years old"],
    correctIndex: 1,
    answer: "The principle 'no one is dead until warm and dead' applies to hypothermic cardiac arrest. Cold water can be protective by reducing metabolic demands. Resuscitation should continue with CPR and active rewarming (warmed IV fluids, warmed humidified oxygen, warm peritoneal lavage, potentially extracorporeal rewarming) until core temperature reaches at least 32-35°C. Defibrillation and medications may be ineffective until rewarming occurs.",
    category: "Emergency",
    difficulty: 3
  },
  {
    id: "rn-emerg-q14",
    type: "question",
    question: "A client involved in a motor vehicle collision has a blood pressure of 78/50, heart rate 130, and the abdomen is distended and rigid. What type of shock is the nurse managing?",
    options: ["Cardiogenic shock", "Hypovolemic shock from intra-abdominal hemorrhage", "Neurogenic shock", "Septic shock"],
    correctIndex: 1,
    answer: "Hypotension, tachycardia, and a distended rigid abdomen after trauma indicate hypovolemic shock from intra-abdominal hemorrhage (likely splenic or hepatic laceration). Treatment includes two large-bore IVs, massive transfusion protocol activation (packed RBCs, FFP, platelets in 1:1:1 ratio), and emergent surgical intervention. The FAST exam (Focused Assessment with Sonography for Trauma) can quickly identify free fluid in the abdomen.",
    category: "Emergency",
    difficulty: 2
  },
  {
    id: "rn-emerg-q15",
    type: "question",
    question: "A nurse is caring for a client with diabetic ketoacidosis who has Kussmaul respirations. What is the physiological purpose of this breathing pattern?",
    options: ["To increase oxygen delivery to tissues", "Deep, rapid breathing is the body's attempt to blow off CO2 to compensate for the metabolic acidosis", "It indicates pneumonia complicating the DKA", "The client is hyperventilating from anxiety"],
    correctIndex: 1,
    answer: "Kussmaul respirations (deep, rapid breathing) are a compensatory mechanism for metabolic acidosis in DKA. The lungs blow off CO2 (a volatile acid), which temporarily raises blood pH. This is respiratory compensation for metabolic acidosis. The equation: CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3-. By exhaling more CO2, the equation shifts left, reducing H+ concentration. This compensation is limited and does not fully correct severe acidosis.",
    category: "Emergency",
    difficulty: 2
  },
  // ============================================================
  // INFECTION CONTROL (15 cards)
  // ============================================================
  {
    id: "rn-ic-q1",
    type: "question",
    question: "A client with active pulmonary tuberculosis is admitted to the hospital. Which type of isolation is required?",
    options: ["Contact precautions with gown and gloves", "Droplet precautions with surgical mask", "Airborne precautions with negative pressure room and N95 respirator", "Standard precautions only"],
    correctIndex: 2,
    answer: "Tuberculosis requires airborne precautions because TB bacilli (Mycobacterium tuberculosis) are transmitted via airborne nuclei that remain suspended in air for hours. Requirements: negative pressure room (air exhausted to outside or through HEPA filter), door kept closed, healthcare workers wear fitted N95 respirator, and the client wears a surgical mask during transport. Precautions continue until 3 consecutive negative sputum AFB smears.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q2",
    type: "question",
    question: "A nurse has a needlestick injury from a client with unknown HIV status. What is the priority action?",
    options: ["Wait for the client's HIV test results before doing anything", "Immediately wash the wound, report to occupational health, and initiate post-exposure prophylaxis (PEP) within 72 hours (ideally within 2 hours)", "Apply a bandage and continue working", "Only report if symptoms develop"],
    correctIndex: 1,
    answer: "After a needlestick injury: immediately wash the wound with soap and water (do NOT squeeze or milk the wound), report to occupational health/supervisor, and seek evaluation for PEP. PEP (typically 3-drug antiretroviral regimen for 28 days) should ideally be started within 2 hours of exposure, no later than 72 hours. Baseline HIV testing of both the nurse and source client should be obtained. Follow-up testing at 6 weeks, 3 months, and 6 months.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q3",
    type: "question",
    question: "A nurse is planning care for 4 clients. In which order should the nurse provide care to minimize infection transmission?",
    options: ["MRSA client first, then immunocompromised client, then routine client, then C. diff client", "Immunocompromised client first, then routine clients, then MRSA client, then C. difficile client last", "C. diff client first, then MRSA, then immunocompromised, then routine", "Order does not matter if hand hygiene is performed"],
    correctIndex: 1,
    answer: "The nurse should see the most vulnerable (immunocompromised) client first when the nurse is cleanest, followed by routine clients, then clients with infections. C. difficile should be last because spores are extremely difficult to remove and persist on surfaces. While proper hand hygiene and PPE should theoretically prevent transmission regardless of order, prioritizing care sequence adds an extra layer of safety.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q4",
    type: "question",
    question: "A nurse is caring for a client with varicella (chickenpox). Which isolation precautions are required?",
    options: ["Standard precautions only", "Contact precautions only", "Airborne AND contact precautions", "Droplet precautions only"],
    correctIndex: 2,
    answer: "Varicella-zoster virus (chickenpox) requires BOTH airborne AND contact precautions. The virus is transmitted via airborne route (respiratory droplets that can travel long distances) and via direct contact with the vesicular lesion fluid. Requirements: negative pressure room, N95 respirator, gown and gloves. Only immune healthcare workers (history of varicella or positive varicella titer) should care for these clients when possible.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q5",
    type: "question",
    question: "A nurse is preparing to insert a urinary catheter. Which element of the CAUTI prevention bundle is most important?",
    options: ["Using the largest catheter available", "Using strict aseptic technique during insertion and removing the catheter as soon as it is no longer clinically indicated", "Irrigating the catheter daily with saline", "Changing the catheter every 48 hours routinely"],
    correctIndex: 1,
    answer: "CAUTI prevention bundles include: insert only when clinically indicated, use strict aseptic technique during insertion, use the smallest appropriate catheter size, maintain a closed drainage system, secure the catheter to prevent traction, keep the drainage bag below bladder level, perform daily reassessment and REMOVE as soon as possible. Each day a catheter remains increases infection risk by 3-7%. Routine catheter changes are NOT recommended.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q6",
    type: "question",
    question: "A nurse is educating staff about central line-associated bloodstream infection (CLABSI) prevention. Which element of the central line bundle is correct?",
    options: ["Change the central line dressing weekly regardless of condition", "Use maximal sterile barrier precautions during insertion: cap, mask, sterile gown, sterile gloves, and full-body sterile drape", "Femoral site is preferred for central line insertion", "Antibiotic prophylaxis is required before insertion"],
    correctIndex: 1,
    answer: "The CLABSI prevention bundle includes: hand hygiene, maximal sterile barrier precautions during insertion (cap, mask, sterile gown, sterile gloves, large sterile drape), chlorhexidine skin antisepsis, optimal catheter site selection (subclavian preferred, avoid femoral), daily assessment of line necessity with prompt removal when no longer needed, and proper dressing changes (transparent dressing every 7 days, gauze every 2 days).",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q7",
    type: "question",
    question: "A nurse is caring for a client with meningococcal meningitis. Which precautions are required, and for how long?",
    options: ["Airborne precautions for the duration of hospitalization", "Droplet precautions until 24 hours after effective antibiotic therapy", "Contact precautions for 7 days", "No isolation is needed for bacterial meningitis"],
    correctIndex: 1,
    answer: "Neisseria meningitidis (meningococcal meningitis) is transmitted via respiratory droplets and requires droplet precautions (surgical mask within 3-6 feet). Precautions are maintained until 24 hours after initiation of effective antibiotic therapy (ceftriaxone or penicillin G). Close contacts need chemoprophylaxis (ciprofloxacin, rifampin, or ceftriaxone) within 24 hours of identification to prevent secondary cases.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q8",
    type: "question",
    question: "A nurse is performing hand hygiene. In which situation should soap and water be used instead of alcohol-based hand rub?",
    options: ["Before routine patient contact", "When hands are visibly soiled or contaminated with C. difficile spores", "After removing gloves when hands are clean", "Between caring for two clients in the same room"],
    correctIndex: 1,
    answer: "Alcohol-based hand sanitizers are preferred for most hand hygiene situations as they are more effective against most bacteria and viruses. However, soap and water MUST be used when: hands are visibly soiled or contaminated with body fluids, after caring for clients with C. difficile (alcohol does not kill spores), and after caring for clients with norovirus. The friction of washing physically removes spores that alcohol cannot kill.",
    category: "Infection Control",
    difficulty: 1
  },
  {
    id: "rn-ic-q9",
    type: "question",
    question: "A nurse is assessing a surgical wound on postoperative day 3. The wound has increasing redness, warmth, purulent drainage, and the client has a temperature of 38.8°C. What should the nurse do?",
    options: ["Apply warm compresses and reassess tomorrow", "Obtain a wound culture, notify the surgeon, and document detailed wound assessment", "Change the dressing and apply antibiotic ointment", "Tell the client this is normal postoperative healing"],
    correctIndex: 1,
    answer: "Increasing redness, warmth, purulent drainage, and fever on POD 3 indicate surgical site infection (SSI). The nurse should obtain a wound culture BEFORE antibiotics are started (to identify the causative organism and guide targeted therapy), notify the surgeon, and document the wound assessment objectively (size, drainage character and amount, surrounding tissue condition, odor). IV antibiotics and possible wound exploration may be needed.",
    category: "Infection Control",
    difficulty: 2
  },
  {
    id: "rn-ic-q10",
    type: "question",
    question: "A nurse is donning PPE before entering the room of a client on contact and droplet precautions. What is the correct order for putting on PPE?",
    options: ["Gloves, gown, mask, eye protection", "Gown, mask/respirator, eye protection/face shield, gloves", "Mask, gloves, gown, eye protection", "Gloves, mask, eye protection, gown"],
    correctIndex: 1,
    answer: "The correct donning order is: 1) Hand hygiene, 2) Gown (ties in back), 3) Mask or N95 respirator (fit over nose and mouth), 4) Eye protection/face shield, 5) Gloves (over gown cuffs). For doffing (removal), the order is designed to minimize self-contamination: 1) Gloves, 2) Hand hygiene, 3) Gown, 4) Hand hygiene, 5) Eye protection, 6) Mask/respirator, 7) Hand hygiene.",
    category: "Infection Control",
    difficulty: 1
  },
  // ============================================================
  // FLUID & ELECTROLYTES (15 cards)
  // ============================================================
  {
    id: "rn-fe-q1",
    type: "question",
    question: "A client's ABG results show: pH 7.28, PaCO2 38, HCO3 16, PaO2 88. What acid-base disturbance is present?",
    options: ["Respiratory acidosis", "Metabolic acidosis, uncompensated", "Respiratory alkalosis", "Metabolic alkalosis"],
    correctIndex: 1,
    answer: "The pH is acidotic (below 7.35). PaCO2 is normal (35-45 mmHg), ruling out a respiratory cause. HCO3 is low (below 22 mEq/L), indicating the acidosis is metabolic in origin. Since PaCO2 is normal (the lungs are not compensating by blowing off CO2), this is uncompensated metabolic acidosis. Causes include diabetic ketoacidosis, renal failure, lactic acidosis, and severe diarrhea.",
    category: "Fluid & Electrolytes",
    difficulty: 2
  },
  {
    id: "rn-fe-q2",
    type: "question",
    question: "A nurse is caring for a client with a sodium level of 118 mEq/L. The client is confused and lethargic. Which IV solution does the nurse anticipate?",
    options: ["D5W", "0.45% normal saline (half-normal)", "3% hypertonic saline", "Lactated Ringer's"],
    correctIndex: 2,
    answer: "Severe symptomatic hyponatremia (Na <120 mEq/L with neurological symptoms) requires 3% hypertonic saline administered via infusion pump. The goal is to raise sodium by no more than 10-12 mEq/L in 24 hours to prevent osmotic demyelination syndrome (central pontine myelinolysis). D5W would worsen hyponatremia. Frequent sodium level checks (every 2-4 hours) are mandatory during correction.",
    category: "Fluid & Electrolytes",
    difficulty: 3
  },
  {
    id: "rn-fe-q3",
    type: "question",
    question: "A client with SIADH has a serum osmolality of 260 mOsm/kg and urine osmolality of 600 mOsm/kg. What is the primary treatment?",
    options: ["Increase IV fluid rate", "Fluid restriction to 500-1,000 mL/day", "Administer furosemide and fluid bolus simultaneously", "Start DDAVP immediately"],
    correctIndex: 1,
    answer: "SIADH causes excess ADH secretion, leading to water retention, dilutional hyponatremia, and inappropriately concentrated urine (high urine osmolality relative to low serum osmolality). The primary treatment is fluid restriction (typically 500-1,000 mL/day) to allow the body to correct the dilutional state. In severe cases, hypertonic saline may be needed. DDAVP would worsen the condition (it IS ADH). Demeclocycline or tolvaptan may be used for chronic SIADH.",
    category: "Fluid & Electrolytes",
    difficulty: 3
  },
  {
    id: "rn-fe-q4",
    type: "question",
    question: "A nurse is administering IV potassium chloride to a client with hypokalemia (K+ 2.8 mEq/L). Which safety precaution is essential?",
    options: ["Administer the potassium by IV push for rapid correction", "Never exceed 10-20 mEq/hour via peripheral IV, always on a pump with cardiac monitoring", "Mix potassium with D5W only", "Potassium can be safely given without cardiac monitoring"],
    correctIndex: 1,
    answer: "IV potassium chloride must NEVER be given by IV push (can cause fatal cardiac arrest). Standard guidelines: maximum concentration 40 mEq/L for peripheral IV (80 mEq/L for central line), maximum rate 10-20 mEq/hour (higher rates require ICU monitoring), always via infusion pump, with continuous cardiac monitoring. The nurse should monitor for burning at the IV site (potassium is vesicant) and assess for ECG changes (peaked T waves if correcting too rapidly).",
    category: "Fluid & Electrolytes",
    difficulty: 2
  },
  {
    id: "rn-fe-q5",
    type: "question",
    question: "A client with hypercalcemia (Ca 14.2 mg/dL) from malignancy is prescribed IV normal saline and IV furosemide. What is the rationale for this combination?",
    options: ["NS provides hydration and furosemide promotes renal calcium excretion", "NS corrects the calcium directly", "Furosemide retains calcium for bone strengthening", "This combination is incorrect for hypercalcemia"],
    correctIndex: 0,
    answer: "Aggressive IV normal saline hydration expands intravascular volume and increases renal blood flow, enhancing calcium filtration. Furosemide (a loop diuretic) further promotes renal calcium excretion by inhibiting calcium reabsorption in the loop of Henle. This combination is first-line for acute hypercalcemia. Additional treatments may include bisphosphonates (zoledronic acid), calcitonin, and treating the underlying malignancy. Thiazide diuretics are CONTRAINDICATED (they retain calcium).",
    category: "Fluid & Electrolytes",
    difficulty: 2
  },
  {
    id: "rn-fe-q6",
    type: "question",
    question: "A nurse is assessing a client with a magnesium level of 1.0 mEq/L. Which clinical finding does the nurse expect?",
    options: ["Bradycardia and constipation", "Hyperactive deep tendon reflexes, positive Trousseau and Chvostek signs, and cardiac arrhythmias", "Decreased reflexes and respiratory depression", "Polyuria and polydipsia"],
    correctIndex: 1,
    answer: "Hypomagnesemia (Mg <1.5 mEq/L) causes neuromuscular excitability similar to hypocalcemia: hyperactive DTRs, Trousseau and Chvostek signs (because magnesium depletion impairs parathyroid hormone release, causing secondary hypocalcemia), tremors, seizures, and cardiac arrhythmias (torsades de pointes, widened QRS). Hypermagnesemia causes the opposite: decreased reflexes, respiratory depression, and cardiac arrest.",
    category: "Fluid & Electrolytes",
    difficulty: 2
  },
  {
    id: "rn-fe-q7",
    type: "question",
    question: "A client with severe burns has the following lab values 8 hours post-injury: K+ 6.4 mEq/L, Na+ 130 mEq/L, Hct 58%. What is the explanation for these values?",
    options: ["The client is dehydrated from insufficient oral intake", "Cell destruction from burns releases intracellular potassium; capillary leak causes hemoconcentration and third-spacing shifts sodium to interstitial space", "The lab values are normal for a burn patient", "The client has developed acute kidney injury"],
    correctIndex: 1,
    answer: "In the first 24-48 hours after major burns: massive cell destruction releases intracellular potassium (hyperkalemia). Increased capillary permeability causes plasma proteins and fluid to shift to the interstitium (third-spacing), concentrating the blood (elevated Hct) and causing hyponatremia (dilutional effect from fluid shifts). This is the burn shock phase requiring aggressive crystalloid resuscitation using the Parkland formula.",
    category: "Fluid & Electrolytes",
    difficulty: 3
  },
  {
    id: "rn-fe-q8",
    type: "question",
    question: "A nurse is administering 0.9% normal saline (NS) to a client. This solution is classified as which type of IV fluid?",
    options: ["Hypotonic", "Isotonic", "Hypertonic", "Colloid"],
    correctIndex: 1,
    answer: "0.9% NS (normal saline, 308 mOsm/L) is isotonic, meaning its osmolality is similar to blood plasma (275-295 mOsm/L). Isotonic fluids expand the intravascular compartment without causing osmotic shifts between compartments. Other isotonic fluids include lactated Ringer's and D5W (initially isotonic but becomes hypotonic as dextrose is metabolized). NS is the primary resuscitation fluid and is compatible with blood product administration.",
    category: "Fluid & Electrolytes",
    difficulty: 1
  },
  {
    id: "rn-fe-q9",
    type: "question",
    question: "A client receiving IV fluids develops crackles in the lung bases, JVD, bounding pulse, and weight gain of 2 kg in 24 hours. What complication has developed?",
    options: ["Dehydration", "Fluid volume excess (hypervolemia)", "Electrolyte imbalance", "Air embolism"],
    correctIndex: 1,
    answer: "Crackles (fluid in alveoli), JVD (venous congestion), bounding pulse (increased circulating volume), and rapid weight gain are classic signs of fluid volume excess/hypervolemia. Each kg of weight gain equals approximately 1 liter of retained fluid. The nurse should slow the IV rate, elevate the HOB, monitor I&O, and anticipate diuretic administration. Assessment for pulmonary edema should be ongoing.",
    category: "Fluid & Electrolytes",
    difficulty: 1
  },
  {
    id: "rn-fe-q10",
    type: "question",
    question: "A nurse is caring for a client with phosphorus level of 1.8 mg/dL (normal 2.5-4.5). What clinical manifestation is the nurse most concerned about?",
    options: ["Constipation", "Muscle weakness and potential respiratory failure from diaphragm weakness", "Hyperactive reflexes", "Bradycardia"],
    correctIndex: 1,
    answer: "Severe hypophosphatemia (<2.0 mg/dL) causes impaired ATP production, which is essential for muscle contraction and cellular energy. This leads to generalized muscle weakness that can progress to respiratory failure from diaphragm weakness, altered mental status, seizures, and hemolytic anemia (weak RBC membranes). Hypophosphatemia is common in refeeding syndrome, alcoholism, and DKA treatment. IV potassium phosphate may be needed for severe cases.",
    category: "Fluid & Electrolytes",
    difficulty: 3
  },
  // ============================================================
  // PAIN MANAGEMENT (10 cards)
  // ============================================================
  {
    id: "rn-pain-q1",
    type: "question",
    question: "A nurse is caring for a client who rates pain as 8/10 but is laughing and talking on the phone. How should the nurse respond to this discrepancy?",
    options: ["Document that the client does not appear to be in pain", "Treat the pain based on the client's self-report, as pain is subjective and individual", "Withhold pain medication because the behavior is inconsistent with the pain rating", "Confront the client about the inconsistency"],
    correctIndex: 1,
    answer: "Pain is whatever the client says it is. Self-report is the most reliable indicator of pain, regardless of behavioral observations. People cope with pain differently: some distract themselves by socializing or watching TV. Cultural, personal, and psychological factors influence pain expression. The nurse should treat based on the client's reported pain level and document both the self-report and observed behavior without making judgments.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q2",
    type: "question",
    question: "A client with chronic cancer pain is receiving a fentanyl transdermal patch. The client reports breakthrough pain. What type of medication is typically prescribed for breakthrough cancer pain?",
    options: ["Long-acting morphine", "Immediate-release oral opioid (e.g., oxycodone IR or morphine IR)", "Increased patch dose only", "Acetaminophen exclusively"],
    correctIndex: 1,
    answer: "Breakthrough pain in cancer patients on long-acting opioids (fentanyl patch, sustained-release morphine) is treated with immediate-release (IR) opioid formulations that provide rapid onset pain relief. The breakthrough dose is typically 10-20% of the total 24-hour opioid dose. If breakthrough doses are needed more than 3-4 times daily, the baseline long-acting dose should be increased. Acetaminophen alone is insufficient for cancer breakthrough pain.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q3",
    type: "question",
    question: "A postoperative client has a PCA pump with morphine. The nurse finds the client's spouse pressing the PCA button while the client sleeps. What should the nurse do?",
    options: ["Thank the spouse for helping manage the patient's pain", "Immediately stop the PCA, assess the client's respiratory status, and educate about PCA safety", "Allow the spouse to continue as the client needs rest", "Increase the lockout interval only"],
    correctIndex: 1,
    answer: "PCA by proxy (anyone other than the patient pressing the button) is a serious safety violation that can cause fatal respiratory depression. The patient must be the only one pressing the button because they will naturally stop pressing when sedated, creating a built-in safety mechanism. The nurse should stop the PCA, assess respiratory status (RR, SpO2, sedation level), educate the spouse firmly, and document the event as a safety concern.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q4",
    type: "question",
    question: "A nurse is managing a client with neuropathic pain from diabetic peripheral neuropathy. Which medication class is first-line for neuropathic pain?",
    options: ["Opioids (morphine)", "Anticonvulsants (gabapentin or pregabalin) or antidepressants (duloxetine)", "NSAIDs (ibuprofen)", "Muscle relaxants (cyclobenzaprine)"],
    correctIndex: 1,
    answer: "Neuropathic pain (burning, tingling, shooting pain from nerve damage) does not respond well to traditional analgesics. First-line agents include anticonvulsants (gabapentin, pregabalin) that stabilize nerve membranes, and SNRIs (duloxetine) that modulate descending pain inhibition pathways. Tricyclic antidepressants (amitriptyline) are second-line. Opioids are generally avoided due to limited efficacy and addiction risk. Topical lidocaine or capsaicin may provide adjunctive relief.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q5",
    type: "question",
    question: "A client on long-term opioid therapy requires progressively higher doses to achieve the same pain relief. What is this phenomenon called?",
    options: ["Addiction", "Tolerance", "Physical dependence", "Pseudoaddiction"],
    correctIndex: 1,
    answer: "Tolerance is a pharmacological phenomenon where the body adapts to the drug, requiring higher doses to achieve the same effect. It is a normal physiological response, NOT addiction. Addiction involves compulsive drug use despite harm, loss of control, and craving. Physical dependence (withdrawal symptoms if stopped suddenly) is also different from addiction. Pseudoaddiction is drug-seeking behavior caused by undertreated pain that resolves when pain is adequately managed.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q6",
    type: "question",
    question: "A nurse is preparing to administer ketorolac (Toradol) IM to a postoperative client. What is the maximum recommended duration for ketorolac therapy?",
    options: ["2 weeks", "5 days", "30 days", "No time limit"],
    correctIndex: 1,
    answer: "Ketorolac (Toradol) is a potent NSAID used for short-term management of moderate to severe pain. It must NOT be used for more than 5 days total (all routes combined) due to increased risk of GI bleeding, peptic ulceration, renal impairment, and cardiovascular events with prolonged use. It is contraindicated in clients with renal impairment, active GI bleeding, or those on anticoagulants.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q7",
    type: "question",
    question: "A nurse is using the FLACC scale to assess pain in a 2-year-old child. What does this scale assess?",
    options: ["Facial expression, Leg movement, Activity, Cry, and Consolability", "Fear, Language, Attention, Confusion, and Compliance", "Frequency, Location, Amplitude, Character, and Chronicity", "Function, Lifestyle, Appearance, Cognition, and Communication"],
    correctIndex: 0,
    answer: "FLACC is a behavioral pain assessment tool for children ages 2 months to 7 years or non-verbal patients who cannot self-report. Each category (Face, Legs, Activity, Cry, Consolability) is scored 0-2, for a total of 0-10. Score 0 = no pain, 1-3 = mild, 4-6 = moderate, 7-10 = severe. Self-report (Wong-Baker FACES, numerical scale) is preferred when the child is old enough (typically 3+ years).",
    category: "Pain Management",
    difficulty: 1
  },
  {
    id: "rn-pain-q8",
    type: "question",
    question: "A client is prescribed a fentanyl patch 50 mcg/hr. How long does it take for the patch to reach full therapeutic effect?",
    options: ["30 minutes", "2-4 hours", "12-24 hours", "48 hours"],
    correctIndex: 2,
    answer: "Fentanyl transdermal patches take 12-24 hours to reach full therapeutic effect because the drug must build up a depot in the subcutaneous tissue before steady absorption occurs. This means breakthrough pain medication must be available during the first 24 hours. Similarly, after removal, fentanyl continues to be absorbed from the tissue depot for 12-24 hours. Patches are changed every 72 hours. Avoid heat exposure (increases absorption rate dangerously).",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q9",
    type: "question",
    question: "A nurse is performing multimodal pain management for a postoperative client. What does multimodal analgesia mean?",
    options: ["Using the highest dose of one strong opioid", "Combining different classes of analgesics (opioids, NSAIDs, acetaminophen, local anesthetics, adjuvants) to target different pain pathways while reducing opioid requirements", "Using only non-pharmacological interventions", "Alternating between two opioids"],
    correctIndex: 1,
    answer: "Multimodal analgesia combines medications from different pharmacological classes that target different pain pathways: opioids (central mu receptors), NSAIDs (peripheral COX inhibition), acetaminophen (central COX inhibition), gabapentin (calcium channel modulation), local anesthetics (sodium channel blockade), and non-pharmacological methods (ice, positioning, relaxation). This approach provides superior pain control with lower opioid requirements and fewer side effects.",
    category: "Pain Management",
    difficulty: 2
  },
  {
    id: "rn-pain-q10",
    type: "question",
    question: "A client receiving epidural morphine for post-cesarean pain reports pruritus. The nurse knows this is caused by:",
    options: ["An allergic reaction to morphine requiring epinephrine", "Histamine release from epidural opioids, a common side effect treated with nalbuphine or low-dose naloxone", "Latex allergy from the epidural catheter", "Infection at the epidural site"],
    correctIndex: 1,
    answer: "Pruritus (itching) is the most common side effect of epidural/intrathecal opioids, affecting up to 60-80% of clients. It is NOT a true allergic reaction but is caused by opioid receptor activation in the dorsal horn and possibly central histamine release. Treatment includes nalbuphine (partial opioid agonist-antagonist) or low-dose IV naloxone infusion, which reverses the pruritus without significantly affecting analgesia. Diphenhydramine has limited efficacy.",
    category: "Pain Management",
    difficulty: 3
  },
  // ============================================================
  // SAFETY & ETHICS (10 cards)
  // ============================================================
  {
    id: "rn-safe-q1",
    type: "question",
    question: "A nurse witnesses a colleague diverting opioid medications for personal use. What is the nurse's legal and ethical obligation?",
    options: ["Confront the colleague privately and give them a chance to stop", "Report the observation to the charge nurse and nurse manager immediately", "Ignore it to avoid workplace conflict", "Report only if patient harm has occurred"],
    correctIndex: 1,
    answer: "Nurses have a legal and ethical obligation to report suspected drug diversion immediately to the charge nurse, nurse manager, and follow facility reporting protocol. Drug diversion is a patient safety issue (patients may receive inadequate pain management), a criminal offense, and a sign that the colleague may need help. Many states have peer assistance programs for nurses with substance use disorders. Failure to report makes the witnessing nurse complicit.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q2",
    type: "question",
    question: "A nurse is delegating tasks to unlicensed assistive personnel (UAP). Which task is appropriate to delegate to a UAP?",
    options: ["Initial assessment of a newly admitted client", "Administration of oral medications", "Measuring and recording vital signs on a stable client", "Evaluating the effectiveness of a pain medication"],
    correctIndex: 2,
    answer: "The Five Rights of Delegation guide RN decision-making: Right Task (routine, standard procedures with predictable outcomes), Right Circumstances (stable client, not initial assessment), Right Person (trained UAP), Right Direction (clear, specific instructions), Right Supervision (RN monitors and evaluates). Measuring vital signs on a stable client is appropriate for UAP. Assessment, medication administration, and evaluation are RN responsibilities that cannot be delegated.",
    category: "Safety & Ethics",
    difficulty: 1
  },
  {
    id: "rn-safe-q3",
    type: "question",
    question: "A client with advanced cancer has a valid Do Not Resuscitate (DNR) order. The client goes into cardiac arrest. A family member demands that CPR be performed. What should the nurse do?",
    options: ["Begin CPR as the family requests", "Follow the DNR order and provide comfort measures; do NOT initiate CPR", "Wait for the physician to arrive before making a decision", "Ask other family members for their opinion"],
    correctIndex: 1,
    answer: "A valid DNR order is a legal medical order that reflects the client's wishes. It takes precedence over family demands in the moment of cardiac arrest. The nurse should not initiate CPR, provide comfort measures, and calmly explain the DNR order to the family. If the family has concerns, the nurse should facilitate a meeting with the healthcare team and palliative care after the immediate situation. The client's documented wishes are paramount.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q4",
    type: "question",
    question: "A nurse makes a medication error: the wrong dose of insulin was administered to a client. What should the nurse do FIRST?",
    options: ["Notify the risk management department", "Assess the client immediately and implement safety measures (check blood glucose, monitor for hypoglycemia)", "Complete an incident report", "Inform the client's family"],
    correctIndex: 1,
    answer: "After any medication error, the FIRST priority is the client's safety. Assess the client immediately, check blood glucose (since insulin was the medication), and implement interventions to prevent harm (D50 or glucose at bedside, frequent glucose monitoring). THEN: notify the healthcare provider, complete an incident/occurrence report per facility policy, and document the error factually in the medical record. Incident reports are NOT placed in the medical record.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q5",
    type: "question",
    question: "A nurse receives a telephone order from a physician. Which action ensures accuracy and legal compliance?",
    options: ["Write the order down and implement it without verification", "Read back the complete order to the physician for verification, document the order with date, time, physician name, and sign it", "Ask a colleague to witness the phone call", "Refuse all telephone orders and require the physician to come in person"],
    correctIndex: 1,
    answer: "The read-back process for telephone orders includes: write the order down as it is given, read the entire order back to the prescriber (including medication name spelled out, dose, route, frequency), receive verbal confirmation that the order is correct, document with date, time, prescriber name, and the nurse's signature with 'T.O.' or 'V.O.' (telephone/verbal order). The prescriber must cosign within the facility's specified timeframe (typically 24-48 hours).",
    category: "Safety & Ethics",
    difficulty: 1
  },
  {
    id: "rn-safe-q6",
    type: "question",
    question: "A nurse is caring for a client who speaks only Mandarin. The client's English-speaking family member offers to interpret. What is the most appropriate action?",
    options: ["Accept the family member's offer to save time", "Use a qualified medical interpreter (in-person or via phone/video) for all clinical communication", "Use hand gestures to communicate", "Wait until the client learns enough English"],
    correctIndex: 1,
    answer: "Professional medical interpreters must be used for all clinical communication with limited-English-proficiency clients. Family members should NOT serve as interpreters because they may lack medical terminology, may alter information to protect the client's feelings, and create confidentiality issues. Minor children should NEVER interpret for adult medical care. Professional interpreters are trained in medical terminology, confidentiality, and cultural mediation.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q7",
    type: "question",
    question: "A nurse is preparing to restrain an agitated client who is pulling at life-saving IV lines and attempting to remove the endotracheal tube. Which principle must guide the nurse's actions?",
    options: ["Apply restraints whenever the client is agitated", "Use the least restrictive restraint possible, with a physician order, and reassess per protocol (typically every 1-2 hours for medical restraints)", "Physical restraints can be applied indefinitely without reassessment", "Only the physician can apply restraints"],
    correctIndex: 1,
    answer: "Restraint use requires: a provider order (or standing protocol with immediate notification), use of least restrictive method, continuous assessment (circulation, sensation, movement every 1-2 hours), documentation of the clinical justification, alternative interventions attempted before restraint, regular release for ROM and toileting, and ongoing reassessment of the need for continued restraint. Restraints are a last resort after less restrictive measures fail.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q8",
    type: "question",
    question: "A client tells the nurse they want to refuse a blood transfusion based on religious beliefs (Jehovah's Witness). The client is competent. What is the nurse's role?",
    options: ["Override the client's wishes because the transfusion is medically necessary", "Respect the client's decision, ensure informed refusal is documented, and explore alternatives with the medical team", "Convince the client to accept the transfusion", "Contact the client's religious leader for permission to transfuse"],
    correctIndex: 1,
    answer: "Competent adults have the right to refuse any medical treatment, including life-saving blood transfusions, based on personal or religious beliefs. The nurse must: ensure the client is competent and fully informed of the risks of refusal, document informed refusal, notify the healthcare team, and explore alternatives (volume expanders, erythropoietin, cell salvage if acceptable). The nurse must not attempt to coerce, guilt, or manipulate the client's decision.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q9",
    type: "question",
    question: "A nurse discovers that a colleague posted a photo of a client's wound on social media, claiming it was for educational purposes. The client's name is not visible. Is this a HIPAA violation?",
    options: ["No, because the client's name is not visible", "Yes, this is a HIPAA violation because any identifiable health information shared without consent violates patient privacy", "Only if the client complains", "Only if the colleague tagged the hospital"],
    correctIndex: 1,
    answer: "This is a HIPAA violation. Protected health information (PHI) includes more than just the client's name: tattoos, birthmarks, room numbers, dates, and unique physical characteristics can identify a client. Posting any clinical images on social media without explicit written consent violates HIPAA regardless of whether the name is visible. Consequences include termination, fines ($100-$50,000 per violation), and possible criminal prosecution.",
    category: "Safety & Ethics",
    difficulty: 2
  },
  {
    id: "rn-safe-q10",
    type: "question",
    question: "A nurse is assigned 6 clients. One client is deteriorating rapidly and needs continuous monitoring. The charge nurse cannot provide relief. What should the nurse do?",
    options: ["Leave the deteriorating client to check on other clients equally", "Prioritize the unstable client, delegate appropriate tasks to UAP for stable clients, communicate the situation in writing to the charge nurse and supervisor", "Refuse the assignment entirely and leave the unit", "Document that staffing was adequate and proceed normally"],
    correctIndex: 1,
    answer: "The nurse should prioritize using ABCs and Maslow's hierarchy. Delegate appropriate tasks for stable clients to UAP. Communicate the unsafe staffing situation to the charge nurse AND supervisor in writing (assignment despite objection/ADO form). Continue providing care while documenting concerns. Abandoning the assignment (leaving) after accepting it constitutes patient abandonment. Falsifying documentation about adequate staffing is dishonest and dangerous.",
    category: "Safety & Ethics",
    difficulty: 2
  },
];
