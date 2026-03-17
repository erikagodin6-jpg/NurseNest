import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const CAREER_TYPES = [
  "nursing", "rrt", "paramedic", "pharmacyTech", "mlt", "imaging",
  "criticalCare", "emergencyNursing", "perioperative", "oncologyNursing",
  "pediatricCert", "psychotherapist", "socialWorker", "addictionsCounsellor",
  "occupationalTherapy", "physicalTherapy",
] as const;

const EXAM_SECTIONS = [
  "Assessment",
  "Clinical Decision Making",
  "Pharmacology",
  "Patient Safety",
  "Diagnostics",
  "Complication Management",
] as const;

const QUESTION_STYLES = [
  "case-based",
  "prioritization",
  "pharmacology",
  "diagnostic-interpretation",
  "intervention",
] as const;

const TIME_LIMITS: Record<string, number> = {
  nursing: 150, rrt: 150, paramedic: 120, pharmacyTech: 120,
  mlt: 150, imaging: 150, criticalCare: 180, emergencyNursing: 120,
  perioperative: 150, oncologyNursing: 150, pediatricCert: 150,
  psychotherapist: 180, socialWorker: 180, addictionsCounsellor: 150,
  occupationalTherapy: 150, physicalTherapy: 150,
};

const SPECIALTY_TOPICS: Record<string, Record<string, string[]>> = {
  nursing: {
    Assessment: ["Vital signs interpretation", "Head-to-toe assessment", "Glasgow Coma Scale", "Pain assessment tools", "Respiratory assessment", "Cardiac assessment", "Neurological assessment", "Abdominal assessment"],
    "Clinical Decision Making": ["Prioritization of care", "Delegation principles", "Critical thinking in nursing", "Clinical judgment model", "SBAR communication", "Nursing process application", "Evidence-based decision making", "Triage principles"],
    Pharmacology: ["Drug classifications", "Medication administration", "Drug interactions", "Adverse effects management", "Dosage calculations", "IV medication safety", "High-alert medications", "Pharmacokinetics basics"],
    "Patient Safety": ["Fall prevention", "Infection control", "Medication error prevention", "Patient identification", "Hand hygiene protocols", "Restraint use guidelines", "Fire safety", "Sharps safety"],
    Diagnostics: ["Lab value interpretation", "ECG basics", "Imaging interpretation", "Blood gas analysis", "Urinalysis results", "CBC interpretation", "Metabolic panel analysis", "Coagulation studies"],
    "Complication Management": ["Post-surgical complications", "Respiratory distress", "Cardiac emergencies", "Sepsis management", "Hemorrhage control", "Anaphylaxis response", "Shock management", "DIC recognition"],
  },
  rrt: {
    Assessment: ["Respiratory assessment techniques", "Auscultation findings", "Breathing pattern analysis", "Chest wall movement", "Cyanosis assessment", "Accessory muscle use", "SpO2 monitoring", "Capnography interpretation"],
    "Clinical Decision Making": ["Ventilator mode selection", "Weaning readiness assessment", "Oxygen therapy titration", "Airway management decisions", "ARDS protocol selection", "Non-invasive ventilation criteria", "Bronchoscopy indications", "Extubation readiness"],
    Pharmacology: ["Bronchodilators", "Inhaled corticosteroids", "Mucolytics", "Surfactant therapy", "Neuromuscular blocking agents", "Sedation protocols", "Vasopressors in respiratory failure", "Antibiotic nebulization"],
    "Patient Safety": ["Ventilator alarm management", "Circuit integrity checks", "Oxygen fire hazards", "Infection prevention in RT", "Equipment sterilization", "Patient transport safety", "Cylinder safety", "Emergency equipment readiness"],
    Diagnostics: ["ABG interpretation", "PFT interpretation", "Chest X-ray analysis", "CT chest findings", "Bronchoscopy findings", "Sleep study interpretation", "Shunt calculations", "Dead space calculations"],
    "Complication Management": ["Pneumothorax management", "Auto-PEEP management", "Ventilator-associated pneumonia", "Mucus plugging", "Laryngospasm", "Bronchospasm treatment", "Oxygen toxicity", "Barotrauma prevention"],
  },
  paramedic: {
    Assessment: ["Primary survey (ABCDE)", "Secondary survey techniques", "Trauma assessment", "Pediatric assessment triangle", "GCS scoring", "Stroke assessment scales", "Chest pain assessment", "Abdominal assessment"],
    "Clinical Decision Making": ["Triage in mass casualty", "Transport decisions", "Field treatment protocols", "ALS vs BLS interventions", "Scene safety assessment", "Refusal of care management", "Multi-patient prioritization", "Air ambulance criteria"],
    Pharmacology: ["ACLS medications", "PALS medications", "Pain management in field", "RSI medications", "Cardiac arrest drugs", "Anti-arrhythmics", "Vasopressors", "Naloxone administration"],
    "Patient Safety": ["Scene safety protocols", "PPE selection", "Spinal motion restriction", "Needle safety", "Patient restraint", "Documentation requirements", "Radio communication protocols", "Hazmat awareness"],
    Diagnostics: ["12-lead ECG interpretation", "Blood glucose monitoring", "Capnography in field", "Pulse oximetry", "Stroke screening tools", "Trauma scoring systems", "Cardiac rhythm recognition", "Point-of-care testing"],
    "Complication Management": ["Airway obstruction management", "Tension pneumothorax", "Cardiac tamponade", "Anaphylaxis treatment", "Status epilepticus", "Hemorrhagic shock", "Heat/cold emergencies", "Submersion incidents"],
  },
  pharmacyTech: {
    Assessment: ["Prescription verification", "Patient allergy screening", "Drug interaction screening", "Dosage form appropriateness", "Patient age considerations", "Renal/hepatic dosing", "Weight-based dosing", "Therapeutic duplication"],
    "Clinical Decision Making": ["Generic substitution decisions", "Prior authorization process", "Insurance formulary management", "Medication therapy management", "Compounding decisions", "Beyond-use dating", "Drug recall procedures", "Refill authorization"],
    Pharmacology: ["Drug classifications overview", "Controlled substance schedules", "Top 200 medications", "Drug mechanism of action", "Therapeutic drug monitoring", "Narrow therapeutic index drugs", "OTC medication counseling", "Herbal interaction awareness"],
    "Patient Safety": ["Tall man lettering", "ISMP guidelines", "Look-alike/sound-alike drugs", "Pediatric safety precautions", "Geriatric medication safety", "Black box warnings", "REMS programs", "Medication reconciliation"],
    Diagnostics: ["Lab monitoring for medications", "INR monitoring", "HbA1c targets", "Lipid panel goals", "Renal function markers", "Hepatic function markers", "Drug level monitoring", "Therapeutic ranges"],
    "Complication Management": ["Adverse drug reactions", "Drug overdose management", "Extravasation treatment", "Hypersensitivity reactions", "Serotonin syndrome", "QT prolongation risks", "Cytochrome P450 interactions", "Withdrawal management"],
  },
  mlt: {
    Assessment: ["Specimen quality assessment", "Pre-analytical variables", "Patient identification verification", "Sample integrity evaluation", "Order of draw", "Specimen collection techniques", "Chain of custody", "Transport requirements"],
    "Clinical Decision Making": ["Abnormal result verification", "Critical value reporting", "QC troubleshooting", "Instrument calibration decisions", "Repeat testing criteria", "Reflex testing protocols", "Result correlation", "Delta check evaluation"],
    Pharmacology: ["Drug interference in lab tests", "Therapeutic drug monitoring", "Anticoagulant effects on testing", "Specimen collection timing for drugs", "Drug metabolite detection", "Toxicology screening", "Immunosuppressant monitoring", "Antimicrobial susceptibility"],
    "Patient Safety": ["Specimen labeling requirements", "HIPAA compliance", "Infection control in lab", "Biohazard waste management", "Chemical safety (SDS)", "Ergonomic safety", "Fire safety in lab", "PPE requirements"],
    Diagnostics: ["Hematology cell identification", "Chemistry analyzer principles", "Microbiology culture interpretation", "Blood bank compatibility testing", "Urinalysis interpretation", "Coagulation cascade testing", "Immunology assay interpretation", "Molecular testing methods"],
    "Complication Management": ["Hemolyzed specimen management", "QC out-of-range resolution", "Instrument malfunction protocols", "Contaminated culture management", "Transfusion reaction investigation", "Clotted specimen handling", "Lipemic specimen management", "Icteric interference resolution"],
  },
  imaging: {
    Assessment: ["Patient history review", "Contraindication screening", "Pregnancy screening", "Allergy assessment for contrast", "Patient positioning assessment", "Metal screening for MRI", "Consent verification", "Patient identification"],
    "Clinical Decision Making": ["Exposure technique selection", "Contrast media selection", "Imaging modality selection", "Repeat image decisions", "Protocol modification", "Radiation dose optimization", "Image quality assessment", "Artifact identification"],
    Pharmacology: ["Contrast media types", "Contrast reaction management", "Sedation protocols", "Radionuclide pharmaceuticals", "Pre-medication protocols", "Gadolinium safety", "Barium preparations", "Emergency medications"],
    "Patient Safety": ["Radiation protection (ALARA)", "Shielding practices", "Dose monitoring (dosimetry)", "MRI safety zones", "Pediatric dose reduction", "Pregnant patient protocols", "Fall prevention during imaging", "Patient monitoring during procedures"],
    Diagnostics: ["Radiographic anatomy identification", "Pathology recognition", "Image quality evaluation", "Artifact identification", "Cross-sectional anatomy", "Normal variants", "Fracture identification", "Soft tissue abnormalities"],
    "Complication Management": ["Contrast extravasation", "Anaphylactic reaction management", "Vasovagal response", "Patient falls during exam", "Equipment malfunction", "MRI quench procedures", "Radiation overexposure", "Barium aspiration"],
  },
  criticalCare: {
    Assessment: ["Hemodynamic monitoring", "Neurological assessment in ICU", "Respiratory failure assessment", "Cardiac output monitoring", "Fluid balance assessment", "Sedation assessment (RASS)", "Pain assessment in ICU", "Nutritional assessment"],
    "Clinical Decision Making": ["Ventilator management decisions", "Vasopressor titration", "Fluid resuscitation strategies", "Sedation management", "End-of-life decisions", "Organ donation considerations", "Prone positioning criteria", "ECMO candidacy"],
    Pharmacology: ["Vasoactive medications", "Continuous infusion protocols", "Paralytic agents", "Sedation medications", "Antiarrhythmic drugs", "Insulin drip protocols", "Antibiotic stewardship", "Electrolyte replacement"],
    "Patient Safety": ["Central line maintenance", "Ventilator bundle compliance", "Restraint protocols in ICU", "Blood product safety", "Medication double-check", "Alarm fatigue management", "Handoff communication", "Family presence policies"],
    Diagnostics: ["Swan-Ganz catheter interpretation", "Arterial line waveforms", "CVP monitoring", "Mixed venous oxygen saturation", "Lactate interpretation", "BNP/troponin correlation", "Imaging in critical care", "Point-of-care ultrasound"],
    "Complication Management": ["Septic shock management", "ARDS management", "DIC treatment", "Acute kidney injury", "Multi-organ dysfunction", "Cardiac tamponade", "Malignant hyperthermia", "Massive transfusion protocol"],
  },
  emergencyNursing: {
    Assessment: ["ESI triage assessment", "Primary survey", "Trauma assessment", "Pediatric emergency assessment", "Mental health triage", "Obstetric emergency assessment", "Toxicology assessment", "Burns assessment"],
    "Clinical Decision Making": ["Triage level assignment", "Rapid treatment decisions", "Resource allocation", "Transfer criteria", "Discharge planning from ED", "Admission criteria", "Diagnostic ordering priorities", "Consultant engagement"],
    Pharmacology: ["Emergency medications", "RSI drug protocol", "Cardiac arrest medications", "Pain management in ED", "Antidote administration", "Thrombolytic therapy", "Antibiotic selection for sepsis", "Procedural sedation drugs"],
    "Patient Safety": ["Violence prevention in ED", "Elopement prevention", "Medication safety in emergencies", "Handoff to inpatient", "Patient monitoring standards", "Forensic evidence preservation", "Pediatric safety measures", "Psychiatric patient safety"],
    Diagnostics: ["ECG interpretation in emergencies", "Point-of-care testing", "FAST exam interpretation", "Toxicology screening", "X-ray interpretation in trauma", "Lab interpretation in emergencies", "CT scan indications", "Bedside ultrasound"],
    "Complication Management": ["Airway emergencies", "Cardiac arrest management", "Hemorrhage control", "Neurological emergencies", "Environmental emergencies", "Obstetric emergencies", "Pediatric emergencies", "Mass casualty management"],
  },
  perioperative: {
    Assessment: ["Preoperative assessment", "Surgical site verification", "Airway assessment pre-surgery", "Anesthesia risk assessment", "Skin integrity assessment", "Allergies and medications review", "NPO status verification", "Informed consent verification"],
    "Clinical Decision Making": ["Positioning decisions", "Instrument selection", "Surgical count verification", "Specimen management decisions", "Equipment troubleshooting", "Case scheduling priorities", "Emergency surgical decisions", "Sterilization method selection"],
    Pharmacology: ["Anesthesia agents", "Local anesthetic toxicity", "Antibiotic prophylaxis", "Anticoagulant management peri-op", "Pain management post-op", "Muscle relaxants", "Reversal agents", "Hemostatic agents"],
    "Patient Safety": ["Surgical time-out procedure", "Surgical fire prevention", "Wrong site prevention", "Retained foreign body prevention", "DVT prophylaxis", "Hypothermia prevention", "Electrosurgical safety", "Laser safety"],
    Diagnostics: ["Intraoperative monitoring", "Blood gas analysis in OR", "Hemodynamic monitoring", "Temperature monitoring", "Neuromuscular monitoring", "BIS monitoring", "Blood loss estimation", "Urine output monitoring"],
    "Complication Management": ["Malignant hyperthermia", "Anaphylaxis in OR", "Hemorrhage management", "Pneumothorax in surgery", "Cardiac arrest in OR", "Latex allergy response", "Hypothermia management", "Local anesthetic systemic toxicity"],
  },
  oncologyNursing: {
    Assessment: ["Cancer staging assessment", "Symptom burden assessment", "Pain assessment in oncology", "Nutritional status evaluation", "Psychosocial assessment", "Functional status evaluation", "Risk factor assessment", "Treatment response evaluation"],
    "Clinical Decision Making": ["Treatment protocol selection", "Symptom management decisions", "Palliative vs curative goals", "Dose modification decisions", "Emergency interventions", "Supportive care planning", "Survivorship planning", "End-of-life transitions"],
    Pharmacology: ["Chemotherapy agents", "Targeted therapy drugs", "Immunotherapy drugs", "Supportive medications", "Antiemetic protocols", "Growth factor usage", "Pain medication management", "Hormonal therapies"],
    "Patient Safety": ["Chemotherapy safe handling", "Extravasation prevention", "Neutropenic precautions", "Blood product administration", "Oral chemotherapy safety", "Spill management", "Disposal of hazardous drugs", "PPE for chemotherapy"],
    Diagnostics: ["Tumor marker interpretation", "Imaging in oncology", "Biopsy result interpretation", "CBC monitoring during chemo", "Metabolic panel monitoring", "Genetic testing interpretation", "PET scan interpretation", "Bone marrow biopsy results"],
    "Complication Management": ["Tumor lysis syndrome", "Superior vena cava syndrome", "Spinal cord compression", "Febrile neutropenia", "Mucositis management", "Hypercalcemia of malignancy", "Disseminated intravascular coagulation", "Anaphylaxis from chemo"],
  },
  pediatricCert: {
    Assessment: ["Developmental milestone assessment", "Pediatric vital signs", "Growth chart interpretation", "Pain assessment in children", "Pediatric GCS", "Newborn assessment", "Adolescent risk assessment", "Family assessment"],
    "Clinical Decision Making": ["Age-appropriate interventions", "Medication dosing decisions", "Family-centered care decisions", "Child abuse reporting", "Vaccination scheduling", "Developmental referral criteria", "Transition of care planning", "School re-entry planning"],
    Pharmacology: ["Pediatric dosage calculations", "Vaccine schedule management", "Pediatric analgesics", "Antibiotic selection in peds", "Inhaler technique for children", "IV fluid management", "Anti-seizure medications", "Emergency medications for peds"],
    "Patient Safety": ["Pediatric fall prevention", "Medication safety in peds", "Safe sleep practices", "Car seat safety education", "Poison prevention", "Choking prevention", "Water safety education", "Bullying prevention"],
    Diagnostics: ["Pediatric lab values", "Growth curve interpretation", "Developmental screening tools", "Pediatric ECG interpretation", "Hearing/vision screening", "Lead level interpretation", "Metabolic screening results", "Genetic screening interpretation"],
    "Complication Management": ["Respiratory distress in children", "Dehydration management", "Febrile seizures", "Diabetic ketoacidosis in peds", "Epiglottitis management", "Intussusception management", "Status asthmaticus", "Neonatal emergencies"],
  },
  psychotherapist: {
    Assessment: ["Mental status examination", "Risk assessment (suicide/homicide)", "Psychometric testing", "Cultural assessment", "Substance use screening", "Trauma screening", "Relationship assessment", "Functional assessment"],
    "Clinical Decision Making": ["Treatment modality selection", "When to refer", "Crisis intervention decisions", "Informed consent process", "Confidentiality exceptions", "Boundary management", "Termination planning", "Group vs individual therapy"],
    Pharmacology: ["Psychotropic medication classes", "Antidepressant mechanisms", "Anxiolytic medications", "Mood stabilizers", "Antipsychotic medications", "Medication side effects", "Drug interaction awareness", "Medication adherence strategies"],
    "Patient Safety": ["Suicide prevention protocols", "Duty to warn/protect", "Mandatory reporting", "Crisis de-escalation", "Safety planning", "Involuntary commitment criteria", "Child protection reporting", "Elder abuse reporting"],
    Diagnostics: ["DSM-5 diagnostic criteria", "Differential diagnosis in MH", "Psychological testing interpretation", "Symptom cluster identification", "Personality assessment", "Cognitive assessment tools", "Behavioral assessment", "Outcome measurement"],
    "Complication Management": ["Therapeutic rupture repair", "Transference management", "Counter-transference awareness", "Client deterioration response", "Psychotic episode management", "Dissociative episode management", "Panic attack management", "Self-harm intervention"],
  },
  socialWorker: {
    Assessment: ["Biopsychosocial assessment", "Strengths-based assessment", "Risk and safety assessment", "Community needs assessment", "Family systems assessment", "Cultural competence assessment", "Substance use assessment", "Disability assessment"],
    "Clinical Decision Making": ["Intervention planning", "Ethical decision-making models", "Resource allocation", "Advocacy decisions", "Case management priorities", "Termination timing", "Referral decisions", "Discharge planning"],
    Pharmacology: ["Psychotropic medication overview", "Substance abuse pharmacology", "Medication-assisted treatment", "Side effect recognition", "Collaborative prescribing awareness", "OTC substance abuse", "Polypharmacy in elderly", "Psychiatric emergency medications"],
    "Patient Safety": ["Mandated reporting requirements", "Confidentiality and HIPAA", "Informed consent procedures", "Duty to warn obligations", "Child welfare safety", "Domestic violence safety planning", "Elder abuse prevention", "Institutional abuse reporting"],
    Diagnostics: ["DSM-5 diagnosis", "Screening tool administration", "Functional assessment tools", "Addiction severity index", "PHQ-9 interpretation", "GAD-7 interpretation", "ACE score interpretation", "Cognitive screening tools"],
    "Complication Management": ["Crisis intervention", "Suicidal ideation management", "Homicidal ideation response", "Vicarious trauma management", "Burnout prevention", "Ethical violations response", "Client relapse management", "Family crisis intervention"],
  },
  addictionsCounsellor: {
    Assessment: ["Substance use history taking", "Withdrawal assessment (CIWA/COWS)", "Co-occurring disorder screening", "Readiness for change assessment", "Family impact assessment", "Relapse risk assessment", "Functional impairment assessment", "Recovery capital assessment"],
    "Clinical Decision Making": ["Level of care determination", "Treatment matching", "Medication-assisted treatment referral", "Group vs individual therapy selection", "Harm reduction vs abstinence approach", "Family involvement decisions", "Aftercare planning", "Step-down decisions"],
    Pharmacology: ["Alcohol withdrawal medications", "Opioid replacement therapy", "Nicotine replacement therapy", "Anti-craving medications", "Disulfiram therapy", "Naltrexone protocols", "Buprenorphine management", "Benzodiazepine taper protocols"],
    "Patient Safety": ["Overdose prevention education", "Naloxone distribution programs", "Safe injection practices education", "Fentanyl awareness", "Drug interaction awareness", "Withdrawal seizure prevention", "Suicidality in addiction", "Domestic violence screening"],
    Diagnostics: ["Urine drug screen interpretation", "Blood alcohol level interpretation", "Liver function in addiction", "AUDIT screening tool", "DAST screening tool", "CAGE questionnaire", "Stages of change assessment", "Addiction severity index"],
    "Complication Management": ["Delirium tremens management", "Opioid overdose response", "Wernicke-Korsakoff syndrome", "Withdrawal seizures", "Poly-substance complications", "Relapse management", "Medical complications of addiction", "Psychiatric emergencies in addiction"],
  },
  occupationalTherapy: {
    Assessment: ["Occupational profile development", "Activity analysis", "ROM and strength assessment", "Cognitive assessment", "Sensory processing evaluation", "ADL/IADL assessment", "Home environment assessment", "Pediatric developmental assessment"],
    "Clinical Decision Making": ["Goal setting (SMART goals)", "Intervention selection", "Assistive device recommendation", "Home modification planning", "Return-to-work decisions", "Adaptive equipment selection", "Discharge readiness", "Community reintegration planning"],
    Pharmacology: ["Medication effects on function", "Pain medication impact on therapy", "Psychotropic medication effects", "Anti-spasticity medications", "Cognitive enhancing medications", "Side effects affecting OT goals", "Medication timing and therapy", "Substance effects on participation"],
    "Patient Safety": ["Fall prevention in OT", "Transfer safety techniques", "Ergonomic principles", "Splint/orthotic safety", "Activity modification for safety", "Kitchen safety for patients", "Driving safety assessment", "Wheelchair safety"],
    Diagnostics: ["Functional capacity evaluation", "Manual muscle testing", "Goniometry", "Standardized cognitive tests", "Sensory testing", "Berg Balance Scale", "FIM scoring", "Canadian Occupational Performance Measure"],
    "Complication Management": ["Contracture management", "Pressure injury prevention", "Complex regional pain syndrome", "Shoulder subluxation in stroke", "Spasticity management", "Cognitive decline management", "Behavioral challenges in therapy", "Chronic pain in OT"],
  },
  physicalTherapy: {
    Assessment: ["Gait analysis", "Posture assessment", "Manual muscle testing", "Range of motion measurement", "Balance assessment", "Neurological screening", "Cardiopulmonary assessment", "Functional mobility assessment"],
    "Clinical Decision Making": ["Exercise prescription", "Treatment plan development", "Modality selection", "Progression criteria", "Return-to-sport decisions", "Discharge criteria", "Referral decisions", "Evidence-based protocol selection"],
    Pharmacology: ["NSAIDs and pain management", "Muscle relaxant effects", "Corticosteroid effects", "Anticoagulant precautions", "Cardiac medication exercise effects", "Diabetic medication and exercise", "Osteoporosis medications", "Post-surgical medication awareness"],
    "Patient Safety": ["Fall prevention strategies", "Transfer techniques", "Exercise safety guidelines", "Modality contraindications", "Patient monitoring during exercise", "Infection control in PT", "Equipment safety checks", "Emergency response in PT"],
    Diagnostics: ["Imaging interpretation for PT", "Special orthopedic tests", "Nerve conduction study interpretation", "Cardiopulmonary exercise testing", "Balance testing tools", "Functional outcome measures", "Pain assessment scales", "6-minute walk test"],
    "Complication Management": ["Exercise-induced complications", "Post-surgical complications", "Autonomic dysreflexia", "Deep vein thrombosis awareness", "Wound dehiscence", "Compartment syndrome signs", "Complex regional pain syndrome", "Post-concussion syndrome management"],
  },
};

function generateQuestion(
  specialty: string,
  section: string,
  topicIndex: number,
  questionIndex: number,
  difficulty: number,
  style: string,
): { stem: string; options: string[]; correctAnswer: number[]; rationale: string; topic: string; subtopic: string } {
  const topics = SPECIALTY_TOPICS[specialty]?.[section] || ["General knowledge"];
  const topic = topics[topicIndex % topics.length];
  const subtopic = `${section} - ${topic}`;

  const styleTemplates: Record<string, (t: string) => { stem: string; options: string[]; rationale: string }> = {
    "case-based": (t) => ({
      stem: `A healthcare professional encounters a patient presenting with symptoms related to ${t.toLowerCase()}. Based on the clinical scenario, what is the most appropriate initial action?`,
      options: [
        `Perform a comprehensive assessment focused on ${t.toLowerCase()}`,
        `Immediately notify the supervising physician`,
        `Document findings and continue monitoring`,
        `Initiate standard treatment protocol without further assessment`,
      ],
      rationale: `When encountering a patient with concerns related to ${t.toLowerCase()}, the first priority is always a thorough assessment. This follows the systematic approach of assessment before intervention, ensuring accurate identification of the problem before treatment decisions are made.`,
    }),
    "prioritization": (t) => ({
      stem: `A practitioner has multiple patients requiring attention. One patient has an urgent concern related to ${t.toLowerCase()}. Which patient should be seen FIRST?`,
      options: [
        `The patient with acute changes in ${t.toLowerCase()} requiring immediate intervention`,
        `The patient with stable vital signs awaiting routine ${t.toLowerCase()} assessment`,
        `The patient requesting pain medication for chronic ${t.toLowerCase()} issues`,
        `The patient awaiting discharge teaching related to ${t.toLowerCase()}`,
      ],
      rationale: `Prioritization follows the ABCs and acuity model. Acute changes in ${t.toLowerCase()} that require immediate intervention take priority over stable, routine, or non-urgent patient needs. This ensures the most critical patient receives timely care.`,
    }),
    "pharmacology": (t) => ({
      stem: `A patient is prescribed medication related to ${t.toLowerCase()}. Which nursing consideration is MOST important when administering this therapy?`,
      options: [
        `Verify patient allergies and check for drug interactions before administration`,
        `Administer the medication as quickly as possible`,
        `Wait for the next scheduled dose time regardless of patient status`,
        `Delegate medication administration to unlicensed personnel`,
      ],
      rationale: `Medication safety related to ${t.toLowerCase()} requires verification of allergies and drug interactions as the highest priority. The "rights" of medication administration and clinical judgment must be applied to ensure patient safety.`,
    }),
    "diagnostic-interpretation": (t) => ({
      stem: `A diagnostic result related to ${t.toLowerCase()} shows abnormal findings. What is the MOST appropriate interpretation and response?`,
      options: [
        `Correlate the abnormal result with clinical presentation and report to the provider`,
        `Repeat the test immediately without clinical correlation`,
        `Disregard the result if the patient appears stable`,
        `Wait for the provider to review the result at the next scheduled visit`,
      ],
      rationale: `Abnormal diagnostic results related to ${t.toLowerCase()} must be correlated with the clinical picture. Critical values require immediate reporting to the provider. Clinical correlation ensures appropriate follow-up and prevents delayed treatment.`,
    }),
    "intervention": (t) => ({
      stem: `Based on assessment findings related to ${t.toLowerCase()}, which intervention should the healthcare professional implement?`,
      options: [
        `Implement evidence-based interventions specific to the ${t.toLowerCase()} findings`,
        `Apply a generic treatment approach without considering specific findings`,
        `Delay intervention until additional diagnostic results are available`,
        `Transfer the patient to a higher level of care without initial stabilization`,
      ],
      rationale: `Evidence-based interventions specific to ${t.toLowerCase()} findings ensure targeted, effective treatment. Generic approaches may miss critical aspects of the patient's condition, while delays in treatment can lead to deterioration.`,
    }),
  };

  const template = styleTemplates[style] || styleTemplates["case-based"];
  const { stem, options, rationale } = template(topic);

  const difficultyText = difficulty <= 2 ? "foundational" : difficulty <= 3 ? "moderate" : "advanced";
  const modifiedStem = difficulty >= 4
    ? stem.replace("most appropriate", "PRIORITY").replace("MOST important", "CRITICAL")
    : stem;

  return {
    stem: `[${difficultyText.toUpperCase()}] ${modifiedStem}`,
    options,
    correctAnswer: [0],
    rationale,
    topic,
    subtopic,
  };
}

async function seedMockExams() {
  console.log("=== Mock Exam Content Generation ===\n");

  let totalQuestionsCreated = 0;
  let totalExamsCreated = 0;
  const specialtiesCovered: string[] = [];

  for (const specialty of CAREER_TYPES) {
    console.log(`\nGenerating content for: ${specialty}`);
    const questionIds: string[] = [];
    const answerKey: Record<string, number[]> = {};
    const rationaleMap: Record<string, string> = {};
    const timeLimit = TIME_LIMITS[specialty] || 150;

    const existingCheck = await pool.query(
      `SELECT COUNT(*) as cnt FROM mock_exam_definitions WHERE specialty = $1`,
      [specialty]
    );
    if (parseInt(existingCheck.rows[0].cnt) >= 2) {
      console.log(`  Skipping ${specialty} - already has 2 mock exams`);
      const existingQCount = await pool.query(
        `SELECT COUNT(*) as cnt FROM exam_questions WHERE career_type = $1 AND tags @> ARRAY['mock-exam']::text[]`,
        [specialty]
      );
      totalQuestionsCreated += parseInt(existingQCount.rows[0].cnt);
      totalExamsCreated += 2;
      specialtiesCovered.push(specialty);
      continue;
    }

    for (let examNum = 0; examNum < 2; examNum++) {
      const examQuestionIds: string[] = [];
      const examAnswerKey: Record<string, number[]> = {};
      const examRationales: Record<string, string> = {};

      let qIndex = 0;
      for (const section of EXAM_SECTIONS) {
        const questionsPerSection = section === "Assessment" || section === "Clinical Decision Making" ? 20 : 15;
        
        for (let i = 0; i < questionsPerSection; i++) {
          const difficulty = (i % 5) + 1;
          const style = QUESTION_STYLES[i % QUESTION_STYLES.length];
          const topicIdx = (examNum * questionsPerSection + i);

          const q = generateQuestion(specialty, section, topicIdx, qIndex, difficulty, style);

          const cogLevel = difficulty <= 2 ? "recall" : difficulty === 3 ? "application" : "analysis";

          const result = await pool.query(
            `INSERT INTO exam_questions (tier, exam, question_type, status, stem, options, correct_answer, rationale, difficulty, tags, body_system, topic, subtopic, career_type, region_scope, language_code, question_format, cognitive_level, is_scenario, is_mock_exam_eligible, is_adaptive_eligible)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
             RETURNING id`,
            [
              "all",
              `mock-exam-${specialty}-${examNum + 1}`,
              style,
              "published",
              q.stem,
              JSON.stringify(q.options),
              JSON.stringify(q.correctAnswer),
              q.rationale,
              difficulty,
              `{mock-exam,${section.toLowerCase().replace(/ /g, "-")},${specialty}}`,
              section,
              q.topic,
              q.subtopic,
              specialty,
              "BOTH",
              "en",
              style,
              cogLevel,
              style === "case-based",
              true,
              true,
            ]
          );

          const qId = result.rows[0].id;
          examQuestionIds.push(qId);
          examAnswerKey[qId] = q.correctAnswer;
          examRationales[qId] = q.rationale;
          qIndex++;
        }
      }

      const sections = EXAM_SECTIONS.map((s) => {
        const count = s === "Assessment" || s === "Clinical Decision Making" ? 20 : 15;
        return { name: s, questionCount: count };
      });

      const examTitle = `${specialty} Mock Exam ${examNum + 1}`;
      await pool.query(
        `INSERT INTO mock_exam_definitions (specialty, exam_number, title, question_ids, difficulty_level, category_tags, answer_key, rationale_ids, time_limit, sections, total_questions)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          specialty,
          examNum + 1,
          examTitle,
          JSON.stringify(examQuestionIds),
          "mixed",
          JSON.stringify(EXAM_SECTIONS),
          JSON.stringify(examAnswerKey),
          JSON.stringify(examRationales),
          timeLimit,
          JSON.stringify(sections),
          examQuestionIds.length,
        ]
      );

      totalQuestionsCreated += examQuestionIds.length;
      totalExamsCreated++;
      console.log(`  Created: ${examTitle} (${examQuestionIds.length} questions, ${timeLimit} min)`);
    }

    specialtiesCovered.push(specialty);
  }

  console.log("\n=== SUMMARY REPORT ===");
  console.log(`Total exams created: ${totalExamsCreated}`);
  console.log(`Total questions generated: ${totalQuestionsCreated}`);
  console.log(`Specialties covered (${specialtiesCovered.length}): ${specialtiesCovered.join(", ")}`);
  console.log("=== END REPORT ===\n");

  await pool.end();
}

seedMockExams().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
