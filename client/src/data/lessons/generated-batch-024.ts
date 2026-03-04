import type { LessonContent } from "./types";

export const generatedBatch024Lessons: Record<string, LessonContent> = {
  "cranial-nerve-advanced-np": {
    title: "Cranial Nerve Testing: Advanced Techniques",
    cellular: { title: "Pathophysiology of Cranial Nerve Testing: Advanced Techniques", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cranial nerve advanced or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cranial nerve advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cranial nerve advanced?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cranial nerve advanced diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cranial-nerve-assessment": {
        title: "Cranial Nerve Assessment",
        cellular: { title: "Anatomy and Function of the Cranial Nerves", content: "The twelve cranial nerves emerge directly from the brain (most from the brainstem) and control sensory, motor, and autonomic functions of the head, face, neck, and visceral organs. Understanding cranial nerve anatomy is essential for nurses because changes in cranial nerve function can indicate neurological deterioration, stroke, increased intracranial pressure, or brainstem compression requiring immediate intervention.\n\nThe cranial nerves are numbered I through XII based on their position from anterior to posterior on the brainstem. A useful mnemonic for remembering their names is: Oh Oh Oh To Touch And Feel Very Good Velvet, Ah Heaven (Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear, Glossopharyngeal, Vagus, Accessory, Hypoglossal). Their functions can be remembered with: Some Say Marry Money But My Brother Says Big Brains Matter More (Sensory, Sensory, Motor, Motor, Both, Motor, Both, Sensory, Both, Both, Motor, Motor).\n\nCN I (Olfactory): Pure sensory nerve carrying smell sensation from the nasal epithelium to the olfactory bulb. Tested by having the patient identify familiar scents (coffee, vanilla) with eyes closed, one nostril at a time. Loss of smell (anosmia) can follow head trauma, nasal obstruction, or frontal lobe lesions.\n\nCN II (Optic): Pure sensory nerve carrying visual information from the retina to the occipital cortex. Tested by visual acuity (Snellen chart), visual field testing (confrontation), and fundoscopic examination. Papilledema (swelling of the optic disc) seen on fundoscopy indicates increased intracranial pressure.\n\nCN III (Oculomotor), CN IV (Trochlear), CN VI (Abducens): These three nerves work together to control eye movements and pupil function. CN III controls most eye movements (up, down, medial), eyelid elevation, pupil constriction, and lens accommodation. CN IV controls downward and inward eye movement. CN VI controls lateral (outward) eye movement. Tested together by having the patient follow a finger through six cardinal positions of gaze. A fixed, dilated pupil on one side (blown pupil) indicates CN III compression, often from uncal herniation - this is a neurological emergency.\n\nCN V (Trigeminal): Mixed nerve providing facial sensation (three branches: ophthalmic V1, maxillary V2, mandibular V3) and motor function to muscles of mastication. Tested by light touch to three facial areas and clenching teeth. Important for the corneal reflex (afferent limb).\n\nCN VII (Facial): Mixed nerve controlling facial expression muscles, taste to the anterior two-thirds of the tongue, and some salivary and lacrimal gland secretion. Tested by asking patient to raise eyebrows, close eyes tightly, smile, and puff cheeks. In Bell palsy (peripheral CN VII lesion), the entire half of the face is paralyzed. In stroke (central lesion), only the lower face is affected because the upper face receives bilateral cortical innervation.\n\nCN VIII (Vestibulocochlear): Pure sensory nerve for hearing and balance. Tested by whisper test, Weber test, and Rinne test. Sudden hearing loss may indicate acoustic neuroma or stroke.\n\nCN IX (Glossopharyngeal) and CN X (Vagus): Often assessed together. CN IX provides sensation to the posterior pharynx and taste to the posterior tongue. CN X controls pharyngeal and laryngeal muscles (swallowing, voice), and parasympathetic innervation to thoracic and abdominal organs (heart rate, digestion). Tested by gag reflex, saying 'ah' (uvula should rise midline), and assessing voice quality. Absent gag reflex or hoarse voice suggests brainstem compromise. CN X dysfunction causes aspiration risk.\n\nCN XI (Accessory): Pure motor nerve controlling the sternocleidomastoid and trapezius muscles. Tested by having the patient shrug shoulders and turn head against resistance.\n\nCN XII (Hypoglossal): Pure motor nerve controlling tongue movement. Tested by asking the patient to protrude the tongue (deviates toward the side of the lesion) and move it side to side. Important for speech and swallowing." },
        riskFactors: ["Stroke or transient ischemic attack","Head trauma or skull fracture","Brain tumor (especially posterior fossa)","Increased intracranial pressure","Meningitis or encephalitis","Multiple sclerosis","Diabetes mellitus (cranial mononeuropathy)","Bell palsy (viral inflammation of CN VII)"],
        diagnostics: ["Perform systematic cranial nerve assessment (CN I through XII)","Monitor pupil size, symmetry, and reactivity (CN III)","Assess gag and swallowing reflexes (CN IX, X)","Test visual acuity and visual fields (CN II)","Assess facial symmetry and strength (CN VII)","Monitor speech clarity and tongue movement (CN XII)"],
        management: ["Report any new cranial nerve deficits immediately","Maintain NPO status if gag reflex is absent or swallowing is impaired","Protect eyes if corneal reflex is absent (lubricating drops, eye patch)","Implement aspiration precautions for CN IX/X deficits","Position patient safely if balance is impaired (CN VIII)","Provide communication aids if speech is affected"],
        nursingActions: ["Perform pupil checks as ordered (routine or every 1-2 hours for neuro patients)","Test gag reflex before offering oral intake","Assess facial symmetry by asking patient to smile and raise eyebrows","Document and compare cranial nerve findings to baseline","Report unilateral pupil dilation immediately (possible herniation)","Monitor voice quality for hoarseness or wet quality (aspiration risk)","Assess extraocular movements in patients with head injury or stroke","Coordinate with speech-language pathology for swallowing assessment"],
        assessmentFindings: ["Unequal pupils (anisocoria) suggesting CN III compression","Facial droop on one side suggesting CN VII dysfunction or stroke","Absent gag reflex indicating CN IX/X impairment","Tongue deviation to one side indicating CN XII lesion","Ptosis (eyelid drooping) indicating CN III dysfunction","Nystagmus indicating CN VIII or brainstem dysfunction"],
        signs: {
          left: ["Pupil changes (dilation, asymmetry)","Facial droop or asymmetry","Ptosis (eyelid drooping)","Tongue deviation","Abnormal eye movements"],
          right: ["Absent gag reflex","Dysphagia or hoarse voice","Loss of corneal reflex","Hearing loss","Balance disturbance"]
        },
        medications: [{
      name: "Prednisone",
      type: "Corticosteroid",
      action: "Reduces inflammation and edema around cranial nerves, particularly in Bell palsy",
      sideEffects: "Hyperglycemia, insomnia, mood changes, immunosuppression",
      contra: "Active systemic infection, uncontrolled diabetes",
      pearl: "Most effective when started within 72 hours of Bell palsy onset; taper dose to prevent adrenal crisis"
    },{
      name: "Artificial Tears",
      type: "Ophthalmic lubricant",
      action: "Provides moisture and protection to the cornea when eyelid closure is impaired",
      sideEffects: "Temporary blurred vision",
      contra: "None significant",
      pearl: "Essential for eye protection in CN VII palsy where the patient cannot fully close the affected eye; use ointment at night with eye patch"
    }],
        pearls: ["A blown pupil (fixed, dilated unilateral pupil) is a neurological emergency indicating uncal herniation compressing CN III","Bell palsy affects the entire half of the face; stroke affects only the lower face (forehead sparing)","Always assess CN IX and X before giving oral medications or food; absent gag reflex means aspiration risk","New onset of any cranial nerve deficit should be reported immediately","PERRLA documentation: Pupils Equal, Round, Reactive to Light and Accommodation","The corneal reflex tests CN V (sensory/afferent) and CN VII (motor/efferent)"],
        quiz: [{
        question: "A nurse performing a neurological assessment notices the patient's right pupil is fixed and dilated while the left pupil is 3mm and reactive. What is the priority action?",
        options: ["Document the finding and reassess in one hour","Report immediately as this may indicate uncal herniation","Check the patient's medication list for mydriatic eye drops","Perform a visual acuity test"],
        correct: 1,
        rationale: "A unilateral fixed, dilated pupil (blown pupil) is a neurological emergency that may indicate CN III compression from uncal herniation caused by rising intracranial pressure. This requires immediate reporting, likely CT scan, and possible neurosurgical intervention."
      },
      {
        question: "Before giving oral medications to a patient who had a stroke, which cranial nerve assessment should the nurse perform first?",
        options: ["CN II (visual acuity)","CN VII (facial symmetry)","CN IX/X (gag and swallowing reflex)","CN XII (tongue protrusion)"],
        correct: 2,
        rationale: "Cranial nerves IX (glossopharyngeal) and X (vagus) control the gag reflex and swallowing. After a stroke, these functions may be impaired, placing the patient at risk for aspiration. The gag reflex and swallowing assessment should be performed before any oral intake."
      },
      {
        question: "A patient presents with inability to close the right eye, drooling from the right side of the mouth, and inability to raise the right eyebrow. This pattern is most consistent with:",
        options: ["Right-sided stroke affecting the motor cortex","Right peripheral CN VII (Bell) palsy","Left-sided stroke with contralateral facial weakness","CN V trigeminal neuralgia"],
        correct: 1,
        rationale: "Complete unilateral facial paralysis affecting both the upper and lower face (including the forehead) indicates peripheral CN VII palsy (Bell palsy). A stroke would spare the forehead because it receives bilateral cortical innervation, so only the lower face would be affected with a central lesion."
      }]
  },
  "cranial-nerve-exam-rn": {
    title: "Cranial Nerve Examination (CN I-XII)",
    cellular: { title: "Pathophysiology of Cranial Nerve Examination (CN I-XII)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cranial nerve exam or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cranial nerve exam. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cranial nerve exam?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cranial nerve exam diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cranial-nerve-functions-np": {
    title: "Cranial Nerve Functions",
    cellular: { title: "Pathophysiology of Cranial Nerve Functions", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cranial nerve functions or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cranial nerve functions. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cranial nerve functions?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cranial nerve functions diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "craniopharyngioma-np": {
    title: "Craniopharyngioma: Sellar Mass Workup & Management",
    cellular: { title: "Pathophysiology of Craniopharyngioma: Sellar Mass Workup & Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of craniopharyngioma or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with craniopharyngioma. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with craniopharyngioma?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their craniopharyngioma diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "creutzfeldt-jakob-np": {
    title: "Creutzfeldt-Jakob Disease",
    cellular: { title: "Pathophysiology of Creutzfeldt-Jakob Disease", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of creutzfeldt jakob or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with creutzfeldt jakob. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with creutzfeldt jakob?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their creutzfeldt jakob diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "crisis-intervention": {
    title: "Crisis Intervention Basics",
    cellular: { title: "Pathophysiology of Crisis Intervention Basics", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of crisis intervention or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with crisis intervention. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with crisis intervention?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their crisis intervention diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "criteria-fulfillment-np": {
    title: "Does Patient Meet Full Criteria?",
    cellular: { title: "Pathophysiology of Does Patient Meet Full Criteria?", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of criteria fulfillment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with criteria fulfillment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with criteria fulfillment?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their criteria fulfillment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "critical-care-advanced-np": {
    title: "ECMO Management",
    cellular: { title: "Pathophysiology of ECMO Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of critical care advanced or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with critical care advanced. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with critical care advanced?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their critical care advanced diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "crohns-disease-basics-rpn": {
        title: "Crohn Disease Basics",
        cellular: { title: "Pathophysiology of Crohn Disease", content: "Crohn disease is a chronic, relapsing inflammatory bowel disease characterised by transmural (full-thickness) inflammation that can affect any portion of the gastrointestinal tract from mouth to anus. It most commonly involves the terminal ileum and proximal colon (ileocolonic pattern, 40% of cases), followed by small bowel only (30%) and colon only (30%).\n\nThe pathogenesis involves a dysregulated immune response to intestinal microbiota in genetically susceptible individuals, triggered by environmental factors. The NOD2/CARD15 gene on chromosome 16 was the first identified susceptibility gene, involved in bacterial recognition by innate immune cells. Over 200 genetic loci have now been associated with Crohn disease.\n\nIn the normal gut, the epithelial barrier separates luminal bacteria from the underlying immune cells. In Crohn disease, defects in barrier function allow bacterial translocation, which activates dendritic cells and macrophages in the lamina propria. These cells produce pro-inflammatory cytokines, particularly tumor necrosis factor-alpha (TNF-alpha), interleukin-12, and interleukin-23, which drive a Th1/Th17-mediated immune response. This creates a self-perpetuating cycle of inflammation, tissue injury, further barrier disruption, and increased bacterial translocation.\n\nTransmural inflammation is the hallmark of Crohn disease, distinguishing it from ulcerative colitis which is limited to the mucosa and submucosa. Full-thickness involvement results in several characteristic complications: deep fissuring ulcers, non-caseating granulomas (found in approximately 30% of biopsies), fistula formation (tracts between the bowel and other structures - enterocutaneous, enteroenteric, enterovesical, perianal), abscesses, and fibrotic strictures causing bowel obstruction.\n\nThe disease is characteristically discontinuous with 'skip lesions' - segments of inflamed bowel separated by normal-appearing mucosa. Endoscopically, the mucosa has a 'cobblestone' appearance created by intersecting linear ulcers surrounding islands of edematous mucosa. 'Creeping fat' (mesenteric fat wrapping around the serosal surface) is a distinctive gross finding at surgery.\n\nExtraintestinal manifestations are common (25-40% of patients) and can affect virtually any organ system. Joint involvement (peripheral arthritis, sacroiliitis, ankylosing spondylitis) is most common. Other manifestations include erythema nodosum and pyoderma gangrenosum (skin), uveitis and episcleritis (eyes), primary sclerosing cholangitis (liver), and nephrolithiasis (kidney). Some extraintestinal manifestations parallel intestinal disease activity (erythema nodosum, peripheral arthritis), while others follow an independent course (primary sclerosing cholangitis, ankylosing spondylitis).\n\nNutritional deficiencies are prevalent due to malabsorption (especially with ileal disease), decreased oral intake from pain and anorexia, and chronic inflammation increasing metabolic demands. Iron deficiency anemia, B12 deficiency (terminal ileum absorption site), folate deficiency, calcium and vitamin D deficiency, and protein-calorie malnutrition are common and require monitoring." },
        riskFactors: ["Family history (first-degree relative with IBD confers 5-20 fold increased risk)","Genetic predisposition (NOD2/CARD15 mutations, over 200 susceptibility loci identified)","Smoking (doubles the risk of developing Crohn disease and worsens disease course, increases relapse and surgical rates - the single most important modifiable risk factor)","Age of onset typically 15-35 years (bimodal distribution with second smaller peak at 55-65 years)","Northern European and Ashkenazi Jewish ancestry (highest prevalence populations)","Urban living and industrialised environments (related to hygiene hypothesis and altered microbiome)","History of appendectomy (may increase risk, unlike protective effect in ulcerative colitis)","NSAID use may trigger flares or unmask subclinical disease","Stress does not cause Crohn disease but may trigger or exacerbate flares"],
        diagnostics: ["Ileocolonoscopy with biopsies is the primary diagnostic tool: reveals skip lesions, aphthous ulcers, cobblestoning, strictures, and fistula openings; biopsies may show non-caseating granulomas","CT enterography or MR enterography to evaluate small bowel involvement not accessible by colonoscopy; identifies wall thickening, strictures, fistulae, and abscesses","Blood work: CBC (anemia, leukocytosis), CRP and ESR (inflammatory markers), albumin (nutritional status), iron studies, B12, folate, 25-OH vitamin D","Fecal calprotectin: non-invasive marker of intestinal inflammation; useful for differentiating IBD from IBS and monitoring disease activity","Stool studies: C. difficile toxin and culture to rule out infectious causes before initiating or escalating immunosuppressive therapy","Upper GI endoscopy if upper GI symptoms present (oropharyngeal or esophageal/gastric Crohn)","Capsule endoscopy for suspected small bowel Crohn when CT/MR enterography is inconclusive; contraindicated if stricture is suspected (capsule retention risk)"],
        management: ["Induction of remission: corticosteroids (prednisone, budesonide for ileal/right-sided disease) for moderate-severe flares; aminosalicylates (mesalamine) for mild colonic disease only","Maintenance of remission: immunomodulators (azathioprine, 6-mercaptopurine, methotrexate) and/or biologic therapy (anti-TNF agents: infliximab, adalimumab; anti-integrin: vedolizumab; anti-IL-12/23: ustekinumab)","Biologic therapy increasingly used as first-line for moderate-severe disease (top-down approach) rather than waiting for failure of conventional therapies (step-up approach)","Antibiotic therapy (ciprofloxacin + metronidazole) for perianal disease, fistulae, and abscesses","Nutritional support: exclusive enteral nutrition is first-line for paediatric Crohn disease induction; supplementation of iron, B12, folate, calcium, vitamin D as needed","Smoking cessation is critical: smoking doubles relapse rate and surgical risk","Surgical intervention for complications: strictureplasty for short strictures, resection for refractory disease or complicated strictures, abscess drainage, fistula repair; surgery is not curative and recurrence is common (50% within 5 years at the anastomotic site)"],
        nursingActions: ["Assess stool pattern: frequency, consistency, presence of blood and mucus, nocturnal stools (suggests organic disease), urgency, and tenesmus","Monitor nutritional status: daily weights, serum albumin, dietary intake assessment, BMI trending; collaborate with dietitian for nutritional planning","Assess for extraintestinal manifestations: joint pain and swelling, skin lesions (erythema nodosum - tender red nodules on shins; pyoderma gangrenosum - deep necrotic ulcers), eye symptoms (pain, redness, vision changes)","Administer immunosuppressive and biologic medications as prescribed; monitor for infusion reactions during IV biologic therapy (infliximab): fever, chills, dyspnea, chest pain, hypotension","Educate on infection prevention while on immunosuppressive therapy: avoid live vaccines, report fever or signs of infection promptly, annual influenza vaccine (inactivated), ensure up-to-date immunisations before starting biologics","Monitor for corticosteroid side effects: hyperglycemia (check blood glucose regularly), mood changes, insomnia, increased appetite, moon facies, adrenal suppression with prolonged use (never abruptly discontinue - must taper)","Assess perianal area for fistulae, fissures, abscesses, and skin breakdown; provide meticulous perianal skin care","Support psychosocial well-being: chronic disease affects body image, social functioning, and mental health; refer to support groups and counseling as appropriate","Pre-operative teaching if surgery planned: explain that Crohn disease is not cured by surgery, discuss potential for ostomy, emphasise importance of continued medication adherence post-operatively"],
        assessmentFindings: ["Chronic or intermittent diarrhea (often non-bloody in small bowel disease), abdominal pain (commonly right lower quadrant with ileal involvement)","Weight loss, fatigue, and anorexia reflecting chronic inflammation and malabsorption","Palpable right lower quadrant mass or fullness (inflamed terminal ileum or abscess)","Perianal disease: fistulae, fissures, skin tags, abscesses (may be the presenting feature)","Fever (low-grade during flares, high fever suggests abscess or perforation)","Signs of malnutrition: muscle wasting, peripheral edema (hypoalbuminemia), angular cheilitis (B-vitamin deficiency), glossitis","Extraintestinal findings: joint swelling, erythema nodosum, mouth ulcers (aphthous stomatitis), eye redness"],
        signs: { left: ["Chronic diarrhea with abdominal cramping","Right lower quadrant pain and tenderness","Weight loss and malnutrition","Perianal fistulae, fissures, or abscess","Fatigue and low-grade fever"], right: ["Palpable abdominal mass (suggests abscess or phlegmon)","Signs of bowel obstruction (distension, vomiting, absent flatus)","Erythema nodosum (tender nodules on shins)","Joint swelling and pain (enteropathic arthritis)","Growth failure in children and adolescents"] },
        medications: [{ name: "Budesonide (Entocort)", type: "Corticosteroid (Locally Acting)", action: "Potent anti-inflammatory corticosteroid with high topical activity in the ileum and right colon; extensive first-pass hepatic metabolism limits systemic bioavailability to approximately 10%, reducing systemic side effects compared to prednisone", sideEffects: "Moon facies, acne, insomnia, mood changes (less than systemic steroids); adrenal suppression still possible with prolonged use; hyperglycemia", contra: "Systemic fungal infections, hepatic cirrhosis (reduces first-pass metabolism, increasing systemic exposure), concurrent strong CYP3A4 inhibitors", pearl: "First-line corticosteroid for mild-moderate ileal and right-sided colonic Crohn disease due to fewer systemic side effects than prednisone; NOT effective for left-sided colonic or rectal disease; must be tapered, not stopped abruptly" },{ name: "Infliximab (Remicade)", type: "Biologic - Anti-TNF-alpha Monoclonal Antibody", action: "Chimeric monoclonal antibody that binds to both soluble and membrane-bound TNF-alpha, neutralising this key pro-inflammatory cytokine and inducing apoptosis of TNF-expressing inflammatory cells", sideEffects: "Infusion reactions (fever, chills, pruritus, dyspnea, hypotension), increased risk of serious infections (tuberculosis reactivation, opportunistic infections), hepatotoxicity, rare risk of lymphoma (particularly hepatosplenic T-cell lymphoma in young males on combination therapy with thiopurines), demyelinating disorders", contra: "Active serious infection, untreated latent tuberculosis, moderate-severe heart failure (NYHA class III-IV), known hypersensitivity, concurrent live vaccines", pearl: "TB screening (tuberculin skin test or interferon-gamma release assay + chest X-ray) is MANDATORY before starting any anti-TNF therapy due to risk of TB reactivation; hepatitis B screening also required; given as IV infusion over minimum 2 hours - monitor patient throughout and for 1 hour post-infusion" },{ name: "Azathioprine", type: "Immunomodulator (Thiopurine Antimetabolite)", action: "Converted to 6-mercaptopurine and then to active metabolites (6-thioguanine nucleotides) that are incorporated into DNA, inhibiting purine synthesis and suppressing T-cell and B-cell proliferation", sideEffects: "Bone marrow suppression (leukopenia, thrombocytopenia - dose-dependent), hepatotoxicity, pancreatitis (3-4%, typically early and idiosyncratic), nausea, increased infection risk, increased risk of non-melanoma skin cancer and lymphoma with long-term use", contra: "Pregnancy (teratogenic - requires reliable contraception), severe bone marrow suppression, known TPMT or NUDT15 deficiency (risk of fatal myelosuppression)", pearl: "TPMT enzyme testing is REQUIRED before starting therapy - patients with low or absent TPMT activity metabolise azathioprine to toxic levels causing life-threatening bone marrow suppression; monitor CBC every 1-2 weeks initially, then monthly; takes 3-6 months for full therapeutic effect (not useful for acute flares)" },{ name: "Mesalamine (5-ASA)", type: "Aminosalicylate Anti-inflammatory", action: "Topical anti-inflammatory agent that acts locally on the intestinal mucosa; inhibits prostaglandin and leukotriene synthesis, scavenges free radicals, and inhibits NF-kB activation in mucosal epithelial cells", sideEffects: "Headache, nausea, abdominal pain, diarrhea (paradoxical), rash, rare nephrotoxicity (interstitial nephritis), rare pancreatitis", contra: "Salicylate hypersensitivity, severe renal impairment, severe hepatic impairment", pearl: "More effective in ulcerative colitis than Crohn disease; in Crohn disease, role is limited to mild colonic disease; different formulations target different bowel segments (Asacol targets terminal ileum/colon; Pentasa releases throughout small bowel and colon); monitor renal function annually" }],
        pearls: ["Crohn disease is transmural (full-thickness) with skip lesions anywhere from mouth to anus; ulcerative colitis is mucosal only and continuous starting from the rectum - this distinction is fundamental for boards and clinical practice","Smoking is the single most important modifiable risk factor - it doubles relapse rates and surgical risk; this is opposite to ulcerative colitis where smoking is protective","TB screening is mandatory before starting any anti-TNF biologic therapy (infliximab, adalimumab) due to risk of reactivation of latent tuberculosis","Never abruptly stop corticosteroids in patients on prolonged therapy - adrenal suppression causes potentially life-threatening Addisonian crisis; always taper gradually","Right lower quadrant pain in a young patient may be confused with appendicitis; Crohn disease should be considered in the differential, especially with a history of chronic diarrhea","Fecal calprotectin is a valuable non-invasive test to monitor disease activity and differentiate IBD from IBS without repeated colonoscopies","Perianal disease (fistulae, abscesses, fissures) may be the first presenting feature of Crohn disease, even before intestinal symptoms develop","B12 deficiency should be monitored in patients with terminal ileal disease or ileal resection, as the terminal ileum is the exclusive absorption site for the B12-intrinsic factor complex"],
        quiz: [{ question: "A patient newly diagnosed with Crohn disease is prescribed infliximab. Which test must be completed BEFORE initiating therapy?", options: ["Fecal calprotectin level","Tuberculosis screening (TST or IGRA and chest X-ray)","Colonoscopy with biopsies","DEXA scan for bone density"], correct: 1, rationale: "Tuberculosis screening is mandatory before starting any anti-TNF biologic therapy. Anti-TNF agents suppress TNF-alpha, which is essential for containing latent TB granulomas. Without screening and treatment of latent TB, there is a significant risk of reactivation to active, potentially disseminated tuberculosis, which can be fatal in immunosuppressed patients." },{ question: "A nurse is educating a patient with Crohn disease about modifiable lifestyle factors. Which recommendation has the strongest evidence for reducing disease flares?", options: ["Avoiding all dairy products permanently","Following a strict gluten-free diet","Smoking cessation","Eliminating fibre from the diet"], correct: 2, rationale: "Smoking cessation is the single most important modifiable risk factor for Crohn disease. Smoking doubles the relapse rate, increases the need for surgery, and worsens disease course. There is no evidence supporting blanket elimination of dairy, gluten, or fibre in Crohn disease, though individual patients may identify personal trigger foods." },{ question: "Which assessment finding most clearly distinguishes Crohn disease from ulcerative colitis?", options: ["Bloody diarrhea with urgency and tenesmus","Continuous inflammation starting from the rectum","Perianal fistulae and skip lesions on colonoscopy","Elevated fecal calprotectin level"], correct: 2, rationale: "Perianal fistulae and skip lesions (segments of inflamed bowel separated by normal mucosa) are characteristic of Crohn disease's transmural, discontinuous inflammation pattern. Bloody diarrhea and continuous rectal inflammation are more typical of ulcerative colitis. Fecal calprotectin is elevated in both conditions and cannot distinguish between them." }]
  },
  "cross-system-concepts-np": {
    title: "Differential Diagnosis Frameworks",
    cellular: { title: "Pathophysiology of Differential Diagnosis Frameworks", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cross system concepts or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cross system concepts. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cross system concepts?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cross system concepts diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "croup-np": {
    title: "Croup",
    cellular: { title: "Pathophysiology of Croup", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of croup or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Albuterol",
      type: "Short-acting beta-2 agonist (SABA)",
      action: "Relaxes bronchial smooth muscle via beta-2 receptor stimulation",
      sideEffects: "Tachycardia, tremor, hypokalemia, nervousness",
      contra: "Hypersensitivity to albuterol; use with caution in cardiovascular disease",
      pearl: "Rescue inhaler; if using more than 2 days per week, step-up therapy is indicated"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with croup. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with croup?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their croup diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "crrt-np": {
    title: "Continuous Renal Replacement Therapy (CRRT)",
    cellular: { title: "Pathophysiology of Continuous Renal Replacement Therapy (CRRT)", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of crrt or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Furosemide",
      type: "Loop diuretic",
      action: "Inhibits sodium-potassium-chloride cotransporter in the loop of Henle",
      sideEffects: "Hypokalemia, dehydration, ototoxicity, hyperglycemia, hyperuricemia",
      contra: "Anuria, severe electrolyte depletion, hepatic coma",
      pearl: "Monitor potassium levels; administer IV push no faster than 4 mg/min to prevent ototoxicity"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with crrt. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with crrt?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their crrt diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "crush-injury-np": {
    title: "Crush Injury: Rhabdomyolysis & Hyperkalemia",
    cellular: { title: "Pathophysiology of Crush Injury: Rhabdomyolysis & Hyperkalemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of crush injury or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with crush injury. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with crush injury?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their crush injury diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cryoglobulinemia-rn": {
    title: "Cryoglobulinemia",
    cellular: { title: "Pathophysiology of Cryoglobulinemia", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cryoglobulinemia or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Acetaminophen",
      type: "Analgesic/Antipyretic",
      action: "Inhibits cyclooxygenase enzymes in the CNS to reduce pain and fever",
      sideEffects: "Hepatotoxicity at high doses, nausea, rash (rare)",
      contra: "Severe hepatic impairment, active liver disease, alcohol use disorder",
      pearl: "Maximum 4g/day in healthy adults, 2g/day with liver disease; found in many combination products - check all sources"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cryoglobulinemia. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cryoglobulinemia?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cryoglobulinemia diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
};
