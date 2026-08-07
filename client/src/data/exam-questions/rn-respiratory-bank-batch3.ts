import type { ExamQuestion } from "./types";

// RN Respiratory Question Bank — Batch 3
// Shared NCLEX-RN clinical reasoning appropriate to Canadian and U.S. RN pathways.
// Locale-sensitive prescribing/public-health details are intentionally excluded until
// exam-question routing can distinguish country/locale reliably.
// Source alignment checked against current CDC TB infection-control guidance,
// AARC acute-care oxygen/artificial-airway guidance, and ATS ARDS guidance.

export const rnRespiratoryBankBatch3Questions: ExamQuestion[] = [
  // ===== PNEUMOTHORAX & CHEST TUBES =====
  {
    q: "A patient with a right-sided chest tube for pneumothorax suddenly becomes acutely dyspneic. The nurse notes absent right breath sounds, hypotension, and distended neck veins. Which complication is most likely?",
    o: ["Pulmonary edema", "Tension pneumothorax", "Pleural effusion", "Atelectasis"],
    a: 1,
    r: "Acute respiratory distress with unilateral absent breath sounds plus hypotension and venous distention suggests tension pneumothorax with obstructive shock. This requires immediate escalation and emergency decompression; do not delay for routine imaging if the patient is unstable.",
    s: "Respiratory"
  },
  {
    q: "The chest tube drainage system is accidentally knocked over. What should the nurse do first?",
    o: ["Clamp the chest tube", "Place the drainage system upright and assess the water-seal chamber and patient", "Remove the chest tube", "Milk the tubing vigorously"],
    a: 1,
    r: "Restore the system to an upright position, then assess the patient and water seal. Routine clamping can trap intrapleural air and create a tension pneumothorax. The system should remain below chest level with tubing free of dependent loops.",
    s: "Respiratory"
  },
  {
    q: "Continuous bubbling is noted in the water-seal chamber of a chest drainage system several hours after insertion. What is the nurse's best interpretation?",
    o: ["This always indicates normal tidaling", "There may be an air leak in the patient or drainage system", "The suction pressure is too low", "The lung is fully re-expanded"],
    a: 1,
    r: "Intermittent bubbling can occur early with expiration or coughing in a pneumothorax, but continuous bubbling suggests an air leak. The nurse should assess connections and the patient and follow the system-specific air-leak troubleshooting procedure.",
    s: "Respiratory"
  },
  {
    q: "Which chest-tube finding requires the most urgent action?",
    o: ["Serosanguineous drainage that gradually decreases", "Mild discomfort at the insertion site", "New subcutaneous emphysema that is rapidly expanding", "Tidaling in the water-seal chamber"],
    a: 2,
    r: "Rapidly expanding subcutaneous emphysema suggests a significant air leak or impaired pleural drainage and can accompany worsening pneumothorax. It warrants immediate respiratory assessment and escalation.",
    s: "Respiratory"
  },
  {
    q: "A patient's chest tube becomes disconnected from the drainage system. Which action is appropriate?",
    o: ["Leave the tube open to air", "Reconnect to a new sterile drainage system promptly according to emergency procedure", "Clamp the tube and leave it clamped", "Push the disconnected tubing back together without cleaning"],
    a: 1,
    r: "A disconnected system can allow air into the pleural space. Re-establish a closed sterile drainage system promptly using the facility's emergency procedure. Prolonged clamping is unsafe when an air leak may be present.",
    s: "Respiratory"
  },
  {
    q: "Which actions are appropriate when caring for a patient with a chest tube? Select all that apply.",
    o: ["Keep the drainage unit below chest level", "Assess tubing for kinks and dependent loops", "Clamp the tube routinely during transport", "Mark and trend drainage amount", "Assess breath sounds and respiratory effort"],
    a: 0,
    ca: [0, 1, 3, 4],
    t: "sata",
    r: "Safe chest-tube care includes keeping the system below the chest, maintaining unobstructed tubing, trending drainage, and repeatedly assessing respiratory status. Routine clamping is avoided because trapped air can cause tension physiology.",
    s: "Respiratory"
  },
  {
    q: "A patient with a spontaneous pneumothorax is receiving supplemental oxygen and observation. Which change most strongly indicates deterioration?",
    o: ["Pain decreases from 5/10 to 3/10", "Respiratory rate rises from 20 to 34/min with increasing oxygen requirement", "The patient asks to sit upright", "Heart rate decreases from 96 to 88/min"],
    a: 1,
    r: "Increasing tachypnea and oxygen requirement indicate worsening gas exchange and possible enlargement of the pneumothorax. Trend changes are often more important than a single oxygen-saturation value.",
    s: "Respiratory"
  },
  {
    q: "Immediately after chest-tube removal, which finding requires urgent reassessment for recurrent pneumothorax?",
    o: ["Mild incisional soreness", "Sudden dyspnea with decreased breath sounds on the affected side", "Small amount of dried drainage on the dressing", "Patient preference for upright positioning"],
    a: 1,
    r: "Sudden dyspnea and recurrent unilateral decreased breath sounds after tube removal may indicate recurrent pneumothorax. This requires immediate assessment and escalation.",
    s: "Respiratory"
  },

  // ===== PLEURAL EFFUSION, EMPYEMA & THORACENTESIS =====
  {
    q: "Which assessment finding is most consistent with a large pleural effusion?",
    o: ["Hyperresonance and increased breath sounds", "Dullness to percussion with decreased breath sounds over the affected area", "Diffuse wheezing only", "Stridor"],
    a: 1,
    r: "Pleural fluid dampens sound transmission and produces dullness to percussion with decreased or absent breath sounds over the collection. Hyperresonance is more characteristic of excess pleural air.",
    s: "Respiratory"
  },
  {
    q: "Before thoracentesis, how should the nurse usually position an alert patient who can sit safely?",
    o: ["Supine with legs elevated", "Sitting upright and leaning slightly forward with arms supported", "Trendelenburg", "Prone with the head flat"],
    a: 1,
    r: "An upright, forward-leaning position widens the intercostal spaces and helps the proceduralist access pleural fluid while supporting patient comfort and breathing.",
    s: "Respiratory"
  },
  {
    q: "After thoracentesis, a patient develops sudden pleuritic chest pain, tachycardia, and shortness of breath. What complication should the nurse suspect first?",
    o: ["Pneumothorax", "Constipation", "Hyperglycemia", "Deep vein thrombosis"],
    a: 0,
    r: "Pneumothorax is an important post-thoracentesis complication. New pleuritic pain, dyspnea, hypoxemia, or unilateral reduced breath sounds requires prompt assessment and escalation.",
    s: "Respiratory"
  },
  {
    q: "A patient with pneumonia develops loculated infected pleural fluid. Which term describes this complication?",
    o: ["Empyema", "Hemothorax", "Chylothorax", "Atelectasis"],
    a: 0,
    r: "Empyema is infected purulent fluid within the pleural space. Management commonly requires antimicrobial therapy plus drainage rather than antibiotics alone when a complicated collection is present.",
    s: "Respiratory"
  },
  {
    q: "Which findings after thoracentesis require prompt notification? Select all that apply.",
    o: ["New oxygen desaturation", "Sudden unilateral decrease in breath sounds", "Small adhesive dressing over the puncture site", "Increasing respiratory distress", "New hemoptysis"],
    a: 0,
    ca: [0, 1, 3, 4],
    t: "sata",
    r: "Desaturation, unilateral breath-sound loss, respiratory distress, and hemoptysis can signal pneumothorax, bleeding, or another procedure-related complication. A small intact dressing is expected.",
    s: "Respiratory"
  },
  {
    q: "A patient with a malignant pleural effusion reports worsening dyspnea when lying flat. Which nursing intervention is most appropriate while awaiting definitive treatment?",
    o: ["Place the patient flat to improve perfusion", "Position upright and monitor respiratory status and oxygenation", "Restrict all movement", "Encourage breath-holding exercises"],
    a: 1,
    r: "Upright positioning can reduce diaphragmatic compression and improve ventilation. The nurse should also trend respiratory effort and oxygenation while the cause and definitive drainage plan are addressed.",
    s: "Respiratory"
  },

  // ===== TUBERCULOSIS & AIRBORNE INFECTION CONTROL =====
  {
    q: "A patient with cough, weight loss, night sweats, and an upper-lobe cavitary lesion is being evaluated for pulmonary tuberculosis. Which precaution is appropriate while TB is suspected?",
    o: ["Standard precautions only", "Airborne precautions in an airborne infection isolation room", "Contact precautions only", "Droplet precautions only"],
    a: 1,
    r: "Suspected infectious pulmonary TB requires airborne precautions and appropriate patient placement while diagnostic evaluation is underway. Healthcare personnel use fit-tested respiratory protection according to policy.",
    s: "Respiratory"
  },
  {
    q: "Which respiratory protection should a healthcare worker use when entering the room of a patient with suspected infectious pulmonary TB?",
    o: ["A standard surgical mask only", "A fit-tested N95 or higher-level respirator according to the respiratory-protection program", "No mask if the patient is coughing into tissues", "A face shield without a respirator"],
    a: 1,
    r: "TB is transmitted through airborne particles. Healthcare workers require appropriate respirator protection, such as a fit-tested N95 or higher-level respirator, rather than a surgical mask alone.",
    s: "Respiratory"
  },
  {
    q: "A patient with suspected infectious TB must leave the isolation room for an essential diagnostic test. Which action is appropriate?",
    o: ["Have the patient wear a surgical/procedure mask during transport", "Have the patient wear an N95 while staff wear no protection", "Cancel all medically necessary tests", "Leave the patient's mask off so sputum can drain"],
    a: 0,
    r: "Transport should be limited to essential purposes. When transport is required, source control is used by placing a surgical/procedure mask on the patient and following facility airborne-precaution procedures.",
    s: "Respiratory"
  },
  {
    q: "Which statement about latent/inactive TB infection is correct?",
    o: ["It is contagious whenever the person coughs", "The person is infected but does not have active contagious TB disease", "It always produces cavitary chest x-ray findings", "It cannot progress to active disease"],
    a: 1,
    r: "People with latent/inactive TB infection have been infected with M. tuberculosis but do not have active TB disease and are not contagious. Treatment can reduce the risk of later progression to active disease.",
    s: "Respiratory"
  },
  {
    q: "Which findings support possible active pulmonary tuberculosis? Select all that apply.",
    o: ["Persistent cough", "Unintentional weight loss", "Night sweats", "Hemoptysis", "Isolated ankle sprain"],
    a: 0,
    ca: [0, 1, 2, 3],
    t: "sata",
    r: "Persistent respiratory symptoms with constitutional findings such as weight loss and night sweats, and sometimes hemoptysis, should raise concern for active pulmonary TB in the appropriate epidemiologic context.",
    s: "Respiratory"
  },
  {
    q: "A nurse is collecting sputum for mycobacterial testing. Which action best improves specimen quality?",
    o: ["Collect saliva after mouthwash", "Obtain a deep-cough respiratory specimen according to the ordered collection protocol", "Collect from a drinking cup", "Mix specimens from several patients"],
    a: 1,
    r: "Mycobacterial testing requires an appropriate lower-respiratory specimen collected according to the ordered protocol. Saliva contamination reduces diagnostic quality.",
    s: "Respiratory"
  },

  // ===== BRONCHIECTASIS & AIRWAY CLEARANCE =====
  {
    q: "Which clinical feature is most characteristic of bronchiectasis?",
    o: ["Chronic productive cough with recurrent respiratory infections", "Sudden isolated inspiratory stridor", "Transient pleuritic pain without sputum", "Bradycardia with clear lungs"],
    a: 0,
    r: "Bronchiectasis involves permanently dilated damaged bronchi with impaired mucus clearance. Chronic productive cough, recurrent infections, and episodic hemoptysis are common manifestations.",
    s: "Respiratory"
  },
  {
    q: "A patient with bronchiectasis reports a marked increase in sputum volume and new fever. What is the nurse's priority interpretation?",
    o: ["Expected daily variation", "Possible acute infective exacerbation", "Medication withdrawal", "Pulmonary hypertension only"],
    a: 1,
    r: "Increasing sputum volume or purulence with fever and worsening respiratory symptoms suggests an infective exacerbation and warrants clinical reassessment and possible microbiologic evaluation.",
    s: "Respiratory"
  },
  {
    q: "Which nursing teaching is appropriate for a patient prescribed an airway-clearance regimen for bronchiectasis?",
    o: ["Use airway clearance only when severely short of breath", "Perform the prescribed technique regularly and increase attention during periods of increased secretions", "Suppress all coughing", "Avoid hydration unless febrile"],
    a: 1,
    r: "Regular airway clearance helps mobilize retained secretions and is a core component of bronchiectasis management. Technique and frequency should follow the individualized respiratory-care plan.",
    s: "Respiratory"
  },
  {
    q: "A patient with bronchiectasis begins coughing up a large amount of bright-red blood. What is the nurse's priority?",
    o: ["Document and reassess tomorrow", "Treat as significant hemoptysis and escalate immediately while protecting airway and oxygenation", "Encourage vigorous chest percussion", "Give oral fluids first"],
    a: 1,
    r: "Large-volume hemoptysis can rapidly threaten the airway and gas exchange. Immediate escalation, airway/oxygenation assessment, and preparation for urgent intervention take priority over routine secretion-clearance measures.",
    s: "Respiratory"
  },
  {
    q: "Which findings should the nurse trend in a patient with bronchiectasis? Select all that apply.",
    o: ["Sputum amount and character", "Hemoptysis", "Temperature", "Respiratory effort and oxygenation", "Shoe size"],
    a: 0,
    ca: [0, 1, 2, 3],
    t: "sata",
    r: "Changes in sputum, bleeding, fever, respiratory effort, and oxygenation help identify exacerbation or deterioration. Unrelated measurements do not contribute to respiratory trend assessment.",
    s: "Respiratory"
  },
  {
    q: "Why are retained secretions clinically important in bronchiectasis?",
    o: ["They improve mucociliary clearance", "They promote a cycle of infection, inflammation, airway damage, and further mucus retention", "They prevent bacterial growth", "They increase alveolar surface area"],
    a: 1,
    r: "Bronchiectasis is driven by a vicious cycle in which poor clearance promotes infection and neutrophilic inflammation, which damages airways and further impairs clearance.",
    s: "Respiratory"
  },

  // ===== INTERSTITIAL LUNG DISEASE & PULMONARY FIBROSIS =====
  {
    q: "Which pulmonary-function pattern is most consistent with interstitial pulmonary fibrosis?",
    o: ["Obstructive pattern with increased residual volume only", "Restrictive pattern with reduced lung volumes and reduced diffusion capacity", "Normal spirometry with no diffusion abnormality", "Isolated increased FEV1/FVC from bronchodilation"],
    a: 1,
    r: "Fibrotic interstitial lung disease stiffens the lungs and thickens the gas-exchange interface, producing restrictive physiology with reduced lung volumes and commonly reduced DLCO.",
    s: "Respiratory"
  },
  {
    q: "Which assessment finding is commonly associated with advanced fibrotic interstitial lung disease?",
    o: ["Fine inspiratory crackles and exertional hypoxemia", "Unilateral stridor only", "Hyperresonance from trapped pleural air", "Large-volume purulent sputum as the defining feature"],
    a: 0,
    r: "Fine inspiratory crackles and exertional oxygen desaturation are common in fibrotic interstitial lung disease because stiff, thickened interstitium impairs expansion and diffusion.",
    s: "Respiratory"
  },
  {
    q: "A patient with pulmonary fibrosis has normal oxygen saturation at rest but drops significantly during walking. What is the best explanation?",
    o: ["Exercise increases diffusion time", "Exercise shortens capillary transit time and exposes limited diffusion reserve", "The pulse oximeter always fails during activity", "Fibrosis only affects ventilation at rest"],
    a: 1,
    r: "A thickened alveolar-capillary membrane limits diffusion. During exercise, faster blood flow shortens capillary transit time, revealing diffusion impairment and causing exertional desaturation.",
    s: "Respiratory"
  },
  {
    q: "Which nursing intervention is appropriate for a patient with advanced interstitial lung disease and severe exertional dyspnea?",
    o: ["Encourage rapid unpaced activity", "Cluster care, pace activities, and monitor exertional oxygenation", "Keep the patient continuously supine", "Discourage pulmonary rehabilitation"],
    a: 1,
    r: "Energy conservation, pacing, pulmonary rehabilitation when appropriate, and assessment of exertional oxygen needs can reduce symptom burden and improve function.",
    s: "Respiratory"
  },
  {
    q: "Which change in a patient with known interstitial lung disease requires urgent reassessment?",
    o: ["Stable chronic dry cough", "Rapidly worsening dyspnea with new hypoxemia over days", "Unchanged fine crackles", "Stable exercise tolerance"],
    a: 1,
    r: "A sudden or rapidly progressive decline can represent acute exacerbation, infection, pulmonary embolism, pneumothorax, or another serious complication and requires urgent evaluation.",
    s: "Respiratory"
  },
  {
    q: "Which teaching points are appropriate for a patient with fibrotic lung disease? Select all that apply.",
    o: ["Avoid tobacco smoke exposure", "Keep vaccinations current as recommended", "Report a rapid change in breathlessness", "Use prescribed oxygen exactly as directed", "Stop all physical activity permanently"],
    a: 0,
    ca: [0, 1, 2, 3],
    t: "sata",
    r: "Risk reduction, vaccination, early reporting of deterioration, and safe prescribed oxygen use are important. Complete inactivity promotes deconditioning; activity is individualized and often supported through pulmonary rehabilitation.",
    s: "Respiratory"
  },

  // ===== RESPIRATORY FAILURE, ABGs & NONINVASIVE SUPPORT =====
  {
    q: "A patient has ABG values pH 7.28, PaCO2 62 mmHg, HCO3 28 mmol/L. Which primary disorder is present?",
    o: ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"],
    a: 0,
    r: "The pH is acidemic and PaCO2 is elevated, identifying primary respiratory acidosis. The mildly elevated bicarbonate suggests some renal compensation but the pH remains abnormal.",
    s: "Respiratory"
  },
  {
    q: "A patient in severe asthma initially has a PaCO2 of 30 mmHg. Two hours later the patient remains in distress, but PaCO2 is now 45 mmHg. Why is this concerning?",
    o: ["The patient is definitely improving", "A rising PaCO2 despite ongoing distress can indicate respiratory-muscle fatigue and failing ventilation", "The change proves metabolic alkalosis", "PaCO2 does not matter in asthma"],
    a: 1,
    r: "Early severe asthma often produces hypocapnia from hyperventilation. A normalizing or rising PaCO2 while the patient remains clinically distressed can signal declining ventilatory reserve and impending respiratory failure.",
    s: "Respiratory"
  },
  {
    q: "Which patient is the best candidate for a trial of noninvasive positive-pressure ventilation?",
    o: ["An alert patient with acute hypercapnic COPD exacerbation who can protect the airway", "A patient in cardiac arrest", "A vomiting patient with an unprotected airway", "A patient with severe facial trauma preventing mask seal"],
    a: 0,
    r: "Noninvasive ventilation is most appropriate when the patient is cooperative, can protect the airway, and can tolerate the interface. Active vomiting, inability to protect the airway, cardiac arrest, or major facial injury are major barriers or contraindications.",
    s: "Respiratory"
  },
  {
    q: "A patient on BiPAP becomes progressively somnolent and cannot clear secretions. What is the priority nursing action?",
    o: ["Tighten the mask and continue unchanged", "Escalate immediately for possible invasive airway management", "Remove all oxygen", "Give oral fluids"],
    a: 1,
    r: "Declining consciousness and inability to protect or clear the airway indicate failure of noninvasive support and increased aspiration risk. Immediate escalation for definitive airway evaluation is required.",
    s: "Respiratory"
  },
  {
    q: "A patient has pH 7.49, PaCO2 29 mmHg, HCO3 23 mmol/L during an acute panic-associated hyperventilation episode. How should the nurse interpret the ABG?",
    o: ["Acute respiratory alkalosis", "Acute respiratory acidosis", "Metabolic acidosis", "Compensated metabolic alkalosis"],
    a: 0,
    r: "The alkalemic pH with low PaCO2 and near-normal bicarbonate indicates acute respiratory alkalosis from excessive alveolar ventilation.",
    s: "Respiratory"
  },
  {
    q: "Which findings suggest worsening ventilatory failure? Select all that apply.",
    o: ["Increasing somnolence", "Rising PaCO2", "Worsening respiratory acidosis", "Decreasing ability to speak or clear secretions", "Improving mental status"],
    a: 0,
    ca: [0, 1, 2, 3],
    t: "sata",
    r: "Hypercapnia, acidosis, declining alertness, and loss of airway-clearance ability are key warning signs that ventilation is failing and escalation may be required.",
    s: "Respiratory"
  },
  {
    q: "A patient with chronic CO2 retention receives controlled oxygen during an acute exacerbation. Which statement is most accurate?",
    o: ["Oxygen must be withheld because it can stop breathing", "Oxygen should be titrated to the ordered target while ventilation and blood gases are reassessed", "All patients require 100% oxygen indefinitely", "A normal SpO2 proves PaCO2 cannot rise"],
    a: 1,
    r: "Hypoxemia must be treated. In patients at risk of hypercapnic respiratory failure, oxygen is titrated to a prescribed target while clinical status and gas exchange are reassessed. Oxygen-related hypercapnia is multifactorial and should not be reduced to the outdated idea that oxygen simply removes a 'hypoxic drive.'",
    s: "Respiratory"
  },
  {
    q: "Which change most clearly indicates that treatment of acute respiratory failure is working?",
    o: ["Respiratory rate falls while the patient becomes more difficult to arouse", "Work of breathing decreases, mental status improves, and gas exchange trends toward target", "The patient stops coughing but becomes cyanotic", "PaCO2 rises while pH falls"],
    a: 1,
    r: "Improvement requires integration of clinical and physiologic trends: lower work of breathing, improved mentation, and improving oxygenation/ventilation. A lower respiratory rate alone can reflect fatigue rather than recovery.",
    s: "Respiratory"
  },

  // ===== TRACHEOSTOMY, SUCTIONING & MECHANICAL VENTILATION =====
  {
    q: "A tracheostomy patient has audible secretions, coarse breath sounds, and increasing airway pressure. What should the nurse do?",
    o: ["Suction based on clinical indication using the prescribed technique", "Suction on a fixed hourly schedule regardless of assessment", "Instill saline routinely before every suction pass", "Remove the tracheostomy tube"],
    a: 0,
    r: "Suctioning is performed when assessment indicates retained secretions or obstruction, not automatically on a schedule. Technique should follow the patient's airway and facility protocol.",
    s: "Respiratory"
  },
  {
    q: "During endotracheal suctioning, the patient's oxygen saturation falls sharply and a dysrhythmia develops. What is the nurse's immediate action?",
    o: ["Continue suctioning until all secretions are removed", "Stop suctioning, oxygenate/ventilate the patient, and reassess", "Increase suction pressure", "Instill more saline"],
    a: 1,
    r: "Suctioning can cause hypoxemia and vagal or cardiac effects. When significant desaturation or dysrhythmia occurs, stop the procedure, restore oxygenation/ventilation, and reassess before any further attempt.",
    s: "Respiratory"
  },
  {
    q: "Which equipment should be readily available at the bedside of a patient with a tracheostomy? Select all that apply.",
    o: ["Suction equipment", "Appropriate emergency airway equipment including a spare tracheostomy tube per policy", "Oxygen delivery equipment", "Obturator if required for the specific tube/emergency plan", "A chest tube drainage unit for every patient"],
    a: 0,
    ca: [0, 1, 2, 3],
    t: "sata",
    r: "Tracheostomy emergencies require immediate access to suction, oxygen, and appropriate replacement/emergency airway equipment. A chest drainage unit is not routinely required solely because a tracheostomy is present.",
    s: "Respiratory"
  },
  {
    q: "A mechanically ventilated patient suddenly triggers a high-pressure alarm. Which assessment should the nurse perform first?",
    o: ["Assess the patient and airway for coughing, biting, secretions, kinking, or acute lung change", "Silence the alarm permanently", "Increase the high-pressure alarm limit", "Turn off PEEP"],
    a: 0,
    r: "A high-pressure alarm signals increased resistance or reduced compliance. The nurse assesses the patient first, then the airway/tubing for common reversible causes such as secretions, biting, kinking, bronchospasm, or pneumothorax.",
    s: "Respiratory"
  },
  {
    q: "A ventilator low-pressure alarm sounds and the exhaled tidal volume suddenly falls. Which cause should the nurse suspect?",
    o: ["Circuit disconnection or major air leak", "Mucus plug increasing resistance", "Bronchospasm only", "Pulmonary edema only"],
    a: 0,
    r: "Low pressure with loss of delivered/exhaled volume commonly indicates disconnection, cuff leak, or another major circuit leak. The patient must be assessed immediately and ventilation maintained while the problem is corrected.",
    s: "Respiratory"
  },
  {
    q: "Why is oral care an important component of care for an intubated patient?",
    o: ["It eliminates the need for suctioning", "It reduces oral bacterial burden and is part of prevention strategies for ventilator-associated complications", "It increases cuff pressure", "It replaces head-of-bed elevation"],
    a: 1,
    r: "Oral hygiene is an important component of comprehensive ventilated-patient care because colonized oral secretions can contribute to lower-airway contamination. It complements, rather than replaces, other preventive measures.",
    s: "Respiratory"
  },
  {
    q: "Which finding during a spontaneous breathing trial most strongly suggests the patient is not tolerating the trial?",
    o: ["Comfortable breathing with stable hemodynamics", "Marked tachypnea, distress, diaphoresis, and worsening gas exchange", "Patient asks what time it is", "Stable oxygen requirement"],
    a: 1,
    r: "A spontaneous breathing trial assesses whether the patient can sustain breathing without excessive support. Significant distress, tachypnea, hemodynamic instability, or worsening gas exchange suggests intolerance and requires reassessment.",
    s: "Respiratory"
  },
  {
    q: "A patient with a newly placed tracheostomy becomes suddenly distressed and no airflow is heard through the tube. Which response is most appropriate?",
    o: ["Assume anxiety and leave the room", "Treat as an airway emergency: call for help, assess patency, oxygenate, and follow the tracheostomy-emergency algorithm", "Give oral medication", "Wait for the next respiratory-therapy round"],
    a: 1,
    r: "Sudden loss of airflow through a tracheostomy can reflect mucus plugging, displacement, or obstruction. It is an airway emergency requiring immediate help, oxygenation, patency assessment, and use of the established emergency algorithm.",
    s: "Respiratory"
  }
];
