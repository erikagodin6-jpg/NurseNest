import type { LessonContent } from "./types";

export const generatedBatch050Lessons: Record<string, LessonContent> = {
  "ibs-therapies-rx-np": {
    title: "IBS Therapies: Selection & Logic",
    cellular: { title: "Pathophysiology of IBS Therapies: Selection & Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of ibs therapies rx or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with ibs therapies rx. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with ibs therapies rx?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their ibs therapies rx diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "icp-basics": {
        title: "Increased Intracranial Pressure (ICP) Basics",
        cellular: { title: "Pathophysiology of Increased Intracranial Pressure", content: "Increased intracranial pressure (ICP) occurs when the pressure inside the rigid skull exceeds normal values (5-15 mmHg in adults), compressing brain tissue and compromising cerebral blood flow. Understanding the Monro-Kellie doctrine and the pathophysiology of ICP is essential for nurses because ICP elevation can rapidly progress to brain herniation and death if not recognized and treated promptly.\n\nThe Monro-Kellie doctrine states that the skull is a fixed, rigid container holding three components: brain tissue (80%), cerebrospinal fluid (CSF, 10%), and blood (10%). Because the volume is fixed, an increase in any one component must be compensated by a decrease in another, or ICP will rise. Initial compensatory mechanisms include displacement of CSF from the cranial vault into the spinal subarachnoid space, increased CSF absorption, and reduction of cerebral blood volume through venous compression. Once these mechanisms are exhausted, even small additional increases in volume cause dramatic ICP elevation.\n\nCauses of increased ICP include: space-occupying lesions (tumors, abscesses, hematomas), cerebral edema (cytotoxic from cell injury, vasogenic from blood-brain barrier disruption), increased CSF (hydrocephalus from obstruction or impaired absorption), and increased blood volume (venous obstruction, hypertensive crisis). Each cause produces ICP elevation through a different mechanism, but the clinical consequences are the same.\n\nAs ICP rises, cerebral perfusion pressure (CPP) decreases. CPP is calculated as Mean Arterial Pressure minus ICP (CPP = MAP - ICP). Normal CPP is 60-100 mmHg. When CPP falls below 60 mmHg, cerebral ischemia begins. The brain responds with the Cushing response (also called Cushing triad): systemic hypertension (widening pulse pressure) as the body attempts to force blood past the elevated ICP, reflex bradycardia from baroreceptor stimulation, and irregular respirations from brainstem compression. The Cushing triad is a late and ominous sign indicating imminent brain herniation.\n\nEarly signs of increased ICP that RPNs must recognize include: change in level of consciousness (the earliest and most sensitive indicator), restlessness, confusion, headache (often worse in the morning due to recumbent positioning during sleep increasing venous return to the head), vomiting (often projectile, without preceding nausea), and subtle changes in pupil reactivity. Late signs include decreased level of consciousness progressing to coma, abnormal posturing (decorticate with arms flexed, then decerebrate with arms extended), fixed dilated pupils, and the Cushing triad.\n\nBrain herniation is the catastrophic consequence of uncontrolled ICP. The most common type is transtentorial (uncal) herniation, where the medial temporal lobe (uncus) is pushed through the tentorial notch, compressing the midbrain and CN III. This produces ipsilateral pupil dilation (blown pupil), contralateral hemiparesis, and decreased consciousness. Herniation can progress to brainstem compression and death within minutes to hours." },
        riskFactors: ["Head trauma or traumatic brain injury","Brain tumor or metastatic lesion","Intracranial hemorrhage (epidural, subdural, subarachnoid)","Hydrocephalus","Stroke with cerebral edema","Brain abscess or meningitis","Hepatic encephalopathy with cerebral edema","Status epilepticus"],
        diagnostics: ["Monitor Glasgow Coma Scale every 1-2 hours or as ordered","Expect CT scan to identify cause of ICP elevation","Monitor ICP via ventriculostomy or intraparenchymal monitor if placed","Assess pupil size, symmetry, and reactivity frequently","Monitor vital signs for Cushing triad (hypertension, bradycardia, irregular breathing)","Expect serum osmolality and electrolytes monitoring"],
        management: ["Elevate head of bed 30 degrees to promote venous drainage","Maintain head in midline position (avoid neck flexion or rotation)","Maintain normothermia (fever increases metabolic demand and ICP)","Avoid activities that increase ICP: Valsalva, coughing, straining, suctioning >10 seconds","Maintain quiet, dim environment to reduce stimulation","Space nursing activities to allow ICP to return to baseline between interventions"],
        nursingActions: ["Perform neurological checks as ordered, report any decline immediately","Monitor pupils every 1-2 hours and compare to baseline","Maintain HOB at 30 degrees and head midline at all times","Report GCS decrease of 2 or more points urgently","Administer osmotic diuretics (mannitol) as prescribed and monitor output","Prevent constipation and straining (administer stool softeners as ordered)","Suction only when necessary, limit to 10 seconds, preoxygenate","Monitor intake and output strictly"],
        assessmentFindings: ["Decreased level of consciousness (earliest sign)","Headache, especially worse in the morning","Projectile vomiting without nausea","Altered pupil response (sluggish, then fixed and dilated)","Cushing triad: hypertension with widening pulse pressure, bradycardia, irregular respirations","Papilledema on fundoscopic exam","Abnormal posturing (decorticate then decerebrate)"],
        signs: {
          left: ["Decreased LOC (earliest)","Restlessness and confusion","Headache (worse in morning)","Projectile vomiting","Sluggish pupil response"],
          right: ["Cushing triad (late sign)","Fixed dilated pupil (blown pupil)","Decorticate posturing","Decerebrate posturing","Respiratory pattern changes"]
        },
        medications: [{
      name: "Mannitol",
      type: "Osmotic diuretic",
      action: "Creates osmotic gradient that draws water from brain tissue into the intravascular space, reducing cerebral edema and ICP",
      sideEffects: "Dehydration, electrolyte imbalances (hyponatremia, hypokalemia), rebound ICP elevation",
      contra: "Anuria, severe dehydration, active intracranial bleeding",
      pearl: "Given IV bolus through a filter; monitor serum osmolality (hold if >320 mOsm/kg); monitor strict I&O; have Foley catheter in place before administration"
    },{
      name: "Hypertonic Saline (3%)",
      type: "Osmotic agent",
      action: "Creates osmotic gradient to draw fluid from brain parenchyma into intravascular space, reducing cerebral edema",
      sideEffects: "Hypernatremia, central pontine myelinolysis (if sodium corrected too rapidly), fluid overload",
      contra: "Hypernatremia, severe cardiac failure",
      pearl: "Monitor sodium levels frequently; must be given through central line due to risk of peripheral vein damage; target sodium 145-155 mEq/L in severe ICP elevation"
    }],
        pearls: ["Change in LOC is the EARLIEST and MOST SENSITIVE indicator of rising ICP","Cushing triad (hypertension, bradycardia, irregular breathing) is a LATE sign of brain herniation","A blown pupil (fixed, dilated) is ipsilateral to the lesion in uncal herniation","HOB 30 degrees, head midline, avoid neck flexion: these are non-negotiable positioning requirements","Never suction for more than 10 seconds and always preoxygenate: suctioning dramatically increases ICP","CPP = MAP - ICP; target CPP above 60 mmHg to prevent cerebral ischemia"],
        lifespan: { title: "Across the Lifespan", content: "In infants, the skull sutures and fontanelles have not yet fused, allowing the skull to expand with rising ICP. Signs of increased ICP in infants include bulging fontanelle, increasing head circumference, setting-sun eyes (downward deviation), high-pitched cry, and poor feeding. In adults, the rigid skull cannot expand, making compensatory mechanisms limited and ICP elevations more dangerous. Elderly patients may have brain atrophy that provides some initial compensation (more space for CSF displacement) but this delays clinical recognition, potentially allowing ICP to rise to dangerous levels before symptoms appear." },
        quiz: [{
        question: "A nurse caring for a patient with a traumatic brain injury notices the patient's level of consciousness has decreased from alert and oriented to confused and drowsy. Vital signs show BP 180/60, HR 52, RR irregular. What is happening?",
        options: ["Expected post-injury fatigue requiring continued monitoring","Cushing response indicating critically elevated ICP and impending herniation","Medication side effect from prescribed pain management","Normal neurological fluctuation after head injury"],
        correct: 1,
        rationale: "The combination of decreased LOC, widening pulse pressure (180/60), bradycardia (52), and irregular respirations constitutes the Cushing triad, which indicates critically elevated ICP with brainstem compression. This is a medical emergency requiring immediate intervention."
      },
      {
        question: "Which nursing intervention is CONTRAINDICATED for a patient with elevated ICP?",
        options: ["Elevating the head of bed to 30 degrees","Maintaining the head in midline position","Clustering all nursing care activities together to minimize interruptions","Administering stool softeners to prevent straining"],
        correct: 2,
        rationale: "Clustering nursing activities (performing multiple assessments, repositioning, and care simultaneously) is contraindicated because each intervention can temporarily increase ICP. Activities should be spaced apart to allow ICP to return to baseline between interventions. All other options are appropriate ICP management strategies."
      },
      {
        question: "An infant in the pediatric unit has a tense, bulging anterior fontanelle, setting-sun eyes, and a high-pitched cry. What should the nurse suspect?",
        options: ["Normal infant behavior during feeding","Colic requiring comfort measures","Increased intracranial pressure requiring urgent evaluation","Dehydration causing fontanelle changes"],
        correct: 2,
        rationale: "A bulging fontanelle (normally soft and flat), setting-sun eyes (downward eye deviation from pressure on CN III and the tectal plate), and high-pitched cry are classic signs of increased ICP in infants. Dehydration causes a sunken fontanelle, not a bulging one. This requires urgent evaluation and intervention."
      }]
  },
  "icp-monitoring-rn": {
    title: "ICP Monitoring Assessment",
    cellular: { title: "Pathophysiology of ICP Monitoring Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of icp monitoring or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levetiracetam",
      type: "Anticonvulsant",
      action: "Modulates synaptic vesicle protein SV2A to reduce neuronal excitability",
      sideEffects: "Drowsiness, behavioral changes, dizziness, fatigue",
      contra: "Known hypersensitivity; dose adjustment needed in renal impairment",
      pearl: "Fewer drug interactions than older anticonvulsants; monitor for mood changes"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with icp monitoring. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with icp monitoring?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their icp monitoring diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "icu-delirium-management-np": {
    title: "ICU Delirium Management",
    cellular: { title: "Pathophysiology of ICU Delirium Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of icu delirium management or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with icu delirium management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with icu delirium management?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their icu delirium management diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "icu-nutrition-np": {
    title: "ICU Nutrition",
    cellular: { title: "Pathophysiology of ICU Nutrition", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of icu nutrition or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with icu nutrition. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with icu nutrition?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their icu nutrition diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "ie-embolic-stroke-rn": {
    title: "Infective Endocarditis with Embolic Stroke",
    cellular: { title: "Pathophysiology of Infective Endocarditis with Embolic Stroke", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of ie embolic stroke or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Metoprolol",
      type: "Beta-blocker",
      action: "Blocks beta-1 adrenergic receptors to reduce heart rate and blood pressure",
      sideEffects: "Bradycardia, hypotension, fatigue, dizziness",
      contra: "Severe bradycardia, heart block, decompensated heart failure, cardiogenic shock",
      pearl: "Do not stop abruptly; taper to prevent rebound hypertension and tachycardia"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with ie embolic stroke. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with ie embolic stroke?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their ie embolic stroke diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "ie-prophylaxis-np": {
    title: "Infective Endocarditis Prophylaxis: AHA Guidelines & High-Risk",
    cellular: { title: "Pathophysiology of Infective Endocarditis Prophylaxis: AHA Guidelines & High-Risk", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of ie prophylaxis or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Metoprolol",
      type: "Beta-blocker",
      action: "Blocks beta-1 adrenergic receptors to reduce heart rate and blood pressure",
      sideEffects: "Bradycardia, hypotension, fatigue, dizziness",
      contra: "Severe bradycardia, heart block, decompensated heart failure, cardiogenic shock",
      pearl: "Do not stop abruptly; taper to prevent rebound hypertension and tachycardia"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with ie prophylaxis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with ie prophylaxis?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their ie prophylaxis diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "iga-nephropathy-rn": {
    title: "IgA Nephropathy",
    cellular: { title: "Pathophysiology of IgA Nephropathy", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of iga nephropathy or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform comprehensive physical assessment and document findings","Monitor and trend vital signs, lab values, and diagnostic results","Recognize abnormal findings and report promptly to provider","Collect and prepare specimens for laboratory analysis","Interpret basic diagnostic findings within nursing scope"],
    management: ["Implement ordered treatments and evaluate patient response","Administer medications safely and monitor for therapeutic and adverse effects","Coordinate interdisciplinary care and communicate plan changes","Prioritize interventions based on clinical urgency using clinical judgment","Evaluate outcomes and modify nursing care plan accordingly"],
    nursingActions: ["Perform comprehensive assessment and interpret findings for changes in condition","Implement evidence-based interventions and evaluate outcomes per established protocols","Initiate protocol-based interventions and coordinate care based on assessment findings","Develop and implement patient education plans regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
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
        question: "A nurse is caring for a patient with iga nephropathy. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with iga nephropathy?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their iga nephropathy diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "imaging-indications-neuro-np": {
    title: "Neurological Imaging Indications",
    cellular: { title: "Pathophysiology of Neurological Imaging Indications", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of imaging indications neuro or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levetiracetam",
      type: "Anticonvulsant",
      action: "Modulates synaptic vesicle protein SV2A to reduce neuronal excitability",
      sideEffects: "Drowsiness, behavioral changes, dizziness, fatigue",
      contra: "Known hypersensitivity; dose adjustment needed in renal impairment",
      pearl: "Fewer drug interactions than older anticonvulsants; monitor for mood changes"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with imaging indications neuro. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with imaging indications neuro?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their imaging indications neuro diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "imaging-interpretation-np": {
    title: "Chest X-Ray and Basic Imaging Interpretation",
    cellular: { title: "Pathophysiology of Chest X-Ray and Basic Imaging Interpretation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of imaging interpretation or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with imaging interpretation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with imaging interpretation?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their imaging interpretation diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "immune-np": {
    title: "Autoimmune Pathophysiology: Molecular",
    cellular: { title: "Pathophysiology of Autoimmune Pathophysiology: Molecular", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of immune or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Prednisone",
      type: "Corticosteroid",
      action: "Suppresses inflammatory and immune responses by inhibiting phospholipase A2 and NF-kB",
      sideEffects: "Hyperglycemia, weight gain, osteoporosis, immunosuppression, adrenal suppression, mood changes",
      contra: "Systemic fungal infections; live vaccines during immunosuppressive doses",
      pearl: "Taper gradually after prolonged use to prevent adrenal crisis; monitor blood glucose in diabetic patients"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with immune. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with immune?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their immune diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "immune-system-rpn": {
    title: "Innate Immunity and Barriers",
    cellular: { title: "Pathophysiology of Innate Immunity and Barriers", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of immune system or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Prednisone",
      type: "Corticosteroid",
      action: "Suppresses inflammatory and immune responses by inhibiting phospholipase A2 and NF-kB",
      sideEffects: "Hyperglycemia, weight gain, osteoporosis, immunosuppression, adrenal suppression, mood changes",
      contra: "Systemic fungal infections; live vaccines during immunosuppressive doses",
      pearl: "Taper gradually after prolonged use to prevent adrenal crisis; monitor blood glucose in diabetic patients"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with immune system. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with immune system?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their immune system diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "immunodeficiency-np": {
    title: "Immunodeficiency Syndromes",
    cellular: { title: "Pathophysiology of Immunodeficiency Syndromes", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of immunodeficiency or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Prednisone",
      type: "Corticosteroid",
      action: "Suppresses inflammatory and immune responses by inhibiting phospholipase A2 and NF-kB",
      sideEffects: "Hyperglycemia, weight gain, osteoporosis, immunosuppression, adrenal suppression, mood changes",
      contra: "Systemic fungal infections; live vaccines during immunosuppressive doses",
      pearl: "Taper gradually after prolonged use to prevent adrenal crisis; monitor blood glucose in diabetic patients"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with immunodeficiency. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with immunodeficiency?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their immunodeficiency diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "immunologic-inflammatory-mechanisms-np": {
    title: "Immunologic & Inflammatory Mechanisms",
    cellular: { title: "Pathophysiology of Immunologic & Inflammatory Mechanisms", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of immunologic inflammatory mechanisms or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Order and interpret CBC, BMP, and disease-specific labs","Review imaging studies (X-ray, CT, MRI, ultrasound) as indicated","Perform focused physical examination with advanced assessment techniques","Apply clinical decision rules and scoring tools","Order specialty consultations when findings exceed scope"],
    management: ["Prescribe first-line pharmacotherapy based on current clinical guidelines","Develop individualized treatment plan with measurable outcomes","Order follow-up diagnostic testing to monitor treatment response","Refer to specialist when condition is refractory or complex","Adjust therapy based on patient response and adverse effects"],
    nursingActions: ["Order and interpret diagnostic studies for changes in condition","Prescribe pharmacological and non-pharmacological therapies per established protocols","Formulate differential diagnosis and treatment plan based on assessment findings","Counsel patients on disease management and prevention regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Levetiracetam",
      type: "Anticonvulsant",
      action: "Modulates synaptic vesicle protein SV2A to reduce neuronal excitability",
      sideEffects: "Drowsiness, behavioral changes, dizziness, fatigue",
      contra: "Known hypersensitivity; dose adjustment needed in renal impairment",
      pearl: "Fewer drug interactions than older anticonvulsants; monitor for mood changes"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with immunologic inflammatory mechanisms. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with immunologic inflammatory mechanisms?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their immunologic inflammatory mechanisms diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "incentive-spirometry-rpn": {
        title: "Incentive Spirometry for Practical Nurses",
        cellular: { title: "Physiology of Incentive Spirometry and Atelectasis Prevention", content: "Incentive spirometry is a lung expansion technique that uses a mechanical device to encourage patients to take slow, deep, sustained maximal inspirations (SMI) to prevent or reverse atelectasis, particularly in the post-operative period. Understanding the physiology of normal breathing, the mechanics of atelectasis, and the therapeutic principles behind incentive spirometry is essential for the practical nurse to educate patients effectively and monitor outcomes.\n\nNormal quiet breathing (tidal breathing) uses only a fraction of the lung's total capacity. Tidal volume, the amount of air moved in and out with each normal breath, is approximately 500 mL in an adult. However, the total lung capacity is approximately 6000 mL. During tidal breathing, the bases and dependent portions of the lungs receive less ventilation, and some alveoli may not be fully expanded. In healthy individuals, periodic spontaneous deep breaths (sighs) occur 6-10 times per hour, inflating these under-ventilated alveoli and preventing collapse. These sighs generate transpulmonary pressures sufficient to open collapsed alveoli and redistribute surfactant.\n\nAtelectasis is the partial or complete collapse of lung tissue resulting from alveolar deflation. Post-operative atelectasis is the most common pulmonary complication after surgery, occurring in up to 90% of patients undergoing general anesthesia. Several mechanisms contribute to post-operative atelectasis: absorption atelectasis occurs when high concentrations of inspired oxygen (used during anesthesia) are absorbed from alveoli faster than nitrogen can maintain alveolar volume; compression atelectasis occurs from abdominal distension, diaphragmatic dysfunction, or pleural effusion compressing lung tissue; and hypoventilation atelectasis results from shallow breathing due to pain, sedation, or splinting.\n\nDuring general anesthesia, the normal sigh mechanism is abolished, mucus clearance is impaired, and functional residual capacity (FRC) decreases. The supine position further reduces FRC because abdominal contents push the diaphragm cephalad. Pain from surgical incisions, especially thoracic and upper abdominal procedures, causes patients to breathe shallowly and avoid deep inspiration (splinting behavior), further promoting alveolar collapse. Without intervention, collapsed alveoli become a site for mucus accumulation, bacterial proliferation, and potential pneumonia.\n\nSurfactant, a phospholipid-protein complex produced by type II alveolar cells, reduces alveolar surface tension and prevents alveolar collapse during expiration. When alveoli remain collapsed for prolonged periods, surfactant is not redistributed across the alveolar surface, and existing surfactant degrades. This increases surface tension in collapsed alveoli, making them progressively harder to re-expand (a phenomenon called de-recruitment). Early and frequent use of incentive spirometry helps maintain surfactant distribution by periodically expanding alveoli to full capacity.\n\nThe incentive spirometer works by providing visual feedback as the patient inhales through the device. Most devices are volume-oriented (measuring the volume of air inspired) rather than flow-oriented (measuring the rate of airflow). The patient places their lips tightly around the mouthpiece and inhales slowly and deeply, watching a piston or ball rise as they inhale. The goal is to reach a predetermined volume target and then sustain the inspiration for 3-5 seconds at maximum inflation. This sustained breath hold is critical because it allows time for collateral ventilation through the pores of Kohn (inter-alveolar pores) and canals of Lambert (bronchiole-alveolar communications) to reach and re-expand collapsed alveoli that are not directly connected to patent airways.\n\nThe standard protocol recommends 10 sustained maximal inspirations every hour while awake. The volume target is typically set at 50-75% of the patient's predicted inspiratory capacity based on age, height, and sex. The technique must be taught pre-operatively whenever possible, because post-operative pain and sedation impair the patient's ability to learn new skills. The practical nurse should assess the patient's technique at each use, ensuring slow inspiration (not rapid gasping), sustained breath hold (at least 3 seconds), and upright positioning (at least 30-45 degrees) to maximize diaphragmatic excursion.\n\nSplinting is a complementary technique used in conjunction with incentive spirometry for patients with thoracic or abdominal incisions. The patient holds a pillow firmly against the incision site during deep breathing and coughing to provide counter-pressure that reduces pain and allows fuller chest expansion. Adequate pain management is essential because uncontrolled pain is the primary barrier to effective incentive spirometry use. The nurse should coordinate analgesic administration 20-30 minutes before scheduled incentive spirometry sessions for optimal patient participation." },
        riskFactors: ["General anesthesia lasting more than 2 hours (abolishes sigh reflex, reduces FRC, promotes absorption atelectasis)","Thoracic or upper abdominal surgery (incisional pain causes splinting behavior and shallow breathing)","Pre-existing chronic lung disease (COPD, asthma) with reduced baseline pulmonary reserve","Obesity (BMI greater than 30) causing decreased functional residual capacity and diaphragmatic restriction","Advanced age (reduced respiratory muscle strength, decreased chest wall compliance, diminished cough reflex)","Prolonged immobility or bedrest (decreased lung volumes, dependent atelectasis, impaired mucociliary clearance)","History of smoking (impaired mucociliary escalator, increased mucus production, chronic airway inflammation)"],
        diagnostics: ["Chest X-ray: identifies areas of atelectasis (opacification, volume loss, mediastinal shift toward affected side), consolidation, or pleural effusion; ordered when clinical signs of respiratory compromise develop","Pulse oximetry: continuous monitoring of oxygen saturation; early drop in SpO2 (below 94% on room air or below baseline) may indicate developing atelectasis","Arterial blood gas (ABG): assesses gas exchange; atelectasis causes ventilation-perfusion (V/Q) mismatch leading to hypoxemia (decreased PaO2); may show respiratory alkalosis from compensatory hyperventilation","Lung auscultation: decreased or absent breath sounds in areas of atelectasis; bronchial breath sounds heard over areas of consolidation; crackles may be heard with re-expansion","Incentive spirometry volume tracking: document pre-operative baseline volume and track post-operative volumes at each use; declining volumes indicate worsening lung expansion","Complete blood count: if atelectasis progresses to pneumonia, WBC will be elevated; monitor temperature trend as well"],
        management: ["Instruct patient to perform 10 sustained maximal inspirations every hour while awake using the incentive spirometer; set volume goal at 50-75% of pre-operative baseline","Position patient in semi-Fowler (30-45 degrees) or high Fowler position during incentive spirometry to maximize diaphragmatic excursion and lung expansion","Administer prescribed analgesics 20-30 minutes before incentive spirometry sessions to ensure pain does not limit respiratory effort","Teach and assist with splinting technique: patient holds pillow firmly against thoracic or abdominal incision during deep breathing and coughing to reduce pain","Encourage early ambulation as tolerated within 24 hours post-operatively; walking is the most effective intervention for preventing post-operative atelectasis","Maintain adequate hydration (at least 2 liters daily unless contraindicated) to keep respiratory secretions thin and facilitate mucociliary clearance","Administer prescribed bronchodilators or mucolytics as ordered to optimize airway clearance and facilitate deep breathing"],
        nursingActions: ["Teach incentive spirometry technique pre-operatively whenever possible: seal lips around mouthpiece, inhale slowly and deeply, raise piston/ball to target level, hold breath for 3-5 seconds, exhale slowly, rest, repeat 10 times","Assess and document incentive spirometry volumes at each use; compare to baseline and report declining trends to the physician","Auscultate breath sounds before and after incentive spirometry sessions; document changes and report diminished or absent sounds, new crackles, or adventitious sounds","Monitor oxygen saturation continuously in the post-operative period; report SpO2 below 94% on room air or below baseline for patients with chronic lung disease","Coordinate pain management with incentive spirometry schedule: administer analgesics 20-30 minutes before scheduled respiratory exercises","Encourage coughing and deep breathing exercises in addition to incentive spirometry; teach effective coughing technique (deep breath, brief hold, forceful cough)","Document patient compliance, technique quality, and volume achieved at each session; reinforce education and correct technique as needed"],
        assessmentFindings: ["Decreased breath sounds in dependent lung bases (posterior lower lobes) indicating early atelectasis with reduced air entry","Fine crackles (rales) that clear with deep breathing or coughing -- a hallmark of early atelectasis with reopening of collapsed alveoli","Declining incentive spirometry volumes compared to pre-operative baseline indicating worsening lung expansion","Tachypnea (respiratory rate greater than 20) with shallow breathing pattern as the body compensates for reduced tidal volume","Decreasing oxygen saturation (SpO2) from baseline indicating ventilation-perfusion mismatch from collapsed alveoli","Low-grade fever (up to 38 degrees Celsius) within the first 48 hours post-operatively -- often attributed to atelectasis-associated inflammatory cytokine release","Splinting behavior: patient guards incision, avoids deep breathing, and reports sharp pain with inspiration"],
        signs: { left: ["Decreased breath sounds in lung bases","Shallow, rapid breathing pattern","Declining incentive spirometry volumes","Mild decrease in oxygen saturation","Splinting with deep breathing attempts","Low-grade fever within 48 hours post-operatively"], right: ["Severe hypoxemia (SpO2 below 88%) unresponsive to supplemental oxygen","Complete absence of breath sounds in one or more lobes","Progressive respiratory distress (tachypnea, accessory muscle use, nasal flaring)","Development of pneumonia (productive cough, high fever, elevated WBC, consolidation on X-ray)","Respiratory failure requiring non-invasive ventilation or intubation","Mediastinal shift on chest X-ray (large-volume atelectasis causing structural displacement)"] },
        medications: [{ name: "Acetylcysteine (Mucomyst)", type: "Mucolytic agent", action: "Breaks disulfide bonds in mucus glycoproteins, reducing mucus viscosity and thickness; liquefied secretions are easier to mobilize and expectorate through coughing, preventing mucus plugging of airways that contributes to atelectasis", sideEffects: "Bronchospasm (can occur with nebulized administration, especially in asthma patients), nausea, vomiting, rhinorrhea, stomatitis, unpleasant sulfur taste and odor", contra: "Active bronchospasm or severe asthma (can worsen bronchospasm); known hypersensitivity; use with caution in patients with peptic ulcer disease", pearl: "Pre-treat with an inhaled bronchodilator (albuterol) 15 minutes before nebulized acetylcysteine to prevent bronchospasm; have suction equipment ready because liquefied secretions may require suctioning in patients with weak cough; monitor breath sounds before and after treatment" },{ name: "Albuterol (Ventolin/Proventil)", type: "Short-acting beta-2 adrenergic agonist (bronchodilator)", action: "Selectively stimulates beta-2 adrenergic receptors on bronchial smooth muscle, activating adenylyl cyclase and increasing intracellular cAMP, which causes bronchial smooth muscle relaxation and dilation; opens airways to improve ventilation and facilitate secretion mobilization", sideEffects: "Tachycardia, palpitations, tremor (especially hands), nervousness, headache, hypokalemia with frequent dosing", contra: "Known hypersensitivity to albuterol; use with caution in patients with cardiac dysrhythmias, hypertension, hyperthyroidism, or diabetes (may increase blood glucose)", pearl: "Administer via metered-dose inhaler (MDI) with spacer or nebulizer 15-20 minutes before incentive spirometry sessions to maximize airway opening during deep breathing exercises; teach proper MDI technique: shake canister, exhale fully, coordinate activation with slow deep inhalation, hold breath 10 seconds; monitor heart rate and report if sustained above 120 bpm" },{ name: "Ipratropium Bromide (Atrovent)", type: "Anticholinergic bronchodilator (muscarinic antagonist)", action: "Blocks muscarinic (M3) acetylcholine receptors on bronchial smooth muscle, preventing acetylcholine-mediated bronchoconstriction and mucus hypersecretion; produces bronchodilation primarily in the larger central airways and reduces secretion volume without changing secretion viscosity", sideEffects: "Dry mouth (most common), bitter taste, cough, headache, blurred vision (if sprayed in eyes), urinary retention (anticholinergic effect), paradoxical bronchospasm (rare)", contra: "Known hypersensitivity to ipratropium or atropine derivatives; soy or peanut allergy (some formulations contain soy lecithin); use with caution in narrow-angle glaucoma and benign prostatic hyperplasia", pearl: "Often combined with albuterol (Combivent) for synergistic bronchodilation through different mechanisms; onset is slower than albuterol (15-30 minutes vs 5 minutes) but duration is longer (4-6 hours vs 3-4 hours); protect eyes during nebulized administration to prevent mydriasis and acute angle-closure glaucoma; effective for reducing secretion volume in patients with copious sputum production" }],
        pearls: ["Teach incentive spirometry technique PRE-OPERATIVELY whenever possible -- post-operative pain and sedation significantly impair the patient's ability to learn and perform the technique correctly","The sustained breath hold (3-5 seconds at maximum inspiration) is the MOST IMPORTANT part of the technique -- it allows air to reach collapsed alveoli through collateral ventilation pathways (pores of Kohn, canals of Lambert)","The goal is SLOW, DEEP inspiration -- rapid gasping generates turbulent airflow that does not reach the peripheral alveoli; instruct the patient to inhale as if sipping through a straw","Post-operative atelectasis is the most common pulmonary complication after surgery and the most common cause of fever in the first 48 hours -- prevention through incentive spirometry is more effective than treatment","Administer prescribed analgesics 20-30 minutes BEFORE incentive spirometry sessions -- uncontrolled pain is the number one barrier to effective deep breathing and coughing","Early ambulation is the SINGLE MOST EFFECTIVE intervention for preventing post-operative atelectasis -- incentive spirometry supplements but does not replace mobilization","Fine crackles that CLEAR with deep breathing are a sign of early atelectasis and indicate that incentive spirometry is working -- crackles that persist or worsen suggest developing pneumonia and require physician notification"],
        quiz: [{ question: "A practical nurse is teaching a post-operative patient to use an incentive spirometer. Which instruction is correct?", options: ["Inhale as quickly as possible to raise the piston to the highest level","Exhale forcefully into the mouthpiece to clear the airways","Inhale slowly and deeply through the mouthpiece, then hold the breath for 3-5 seconds at maximum inspiration","Use the incentive spirometer once every 4 hours while awake"], correct: 2, rationale: "The correct technique is slow, deep inspiration through the mouthpiece followed by a sustained breath hold of 3-5 seconds at maximum inflation. The slow inhalation ensures laminar airflow that reaches peripheral alveoli. The breath hold allows collateral ventilation to re-expand collapsed alveoli. Rapid inhalation creates turbulent flow that does not reach small airways. The device is used for inspiration, not expiration. Frequency should be 10 breaths every hour while awake." },{ question: "A patient is 12 hours post-abdominal surgery. The practical nurse auscultates fine crackles in the bilateral lower lung bases that clear after the patient takes several deep breaths. What does this finding most likely indicate?", options: ["Developing pneumonia requiring antibiotic therapy","Pulmonary edema from fluid overload","Early post-operative atelectasis that is responding to deep breathing","Pleural effusion requiring thoracentesis"], correct: 2, rationale: "Fine crackles in the lower lung bases that clear with deep breathing are the hallmark finding of early post-operative atelectasis. The crackles represent the popping open of collapsed alveoli during inspiration. The fact that they clear with deep breathing confirms that the alveoli are being re-expanded. Pneumonia crackles typically do not clear with deep breathing and are accompanied by fever, productive cough, and elevated WBC. Pulmonary edema crackles are typically bilateral and do not clear." },{ question: "When should the practical nurse coordinate analgesic administration relative to incentive spirometry for a patient with an abdominal incision?", options: ["Immediately after incentive spirometry to address the pain caused by deep breathing","20-30 minutes before incentive spirometry to ensure pain does not limit respiratory effort","Only if the patient requests pain medication during incentive spirometry","At a fixed schedule unrelated to respiratory exercises"], correct: 1, rationale: "Analgesics should be administered 20-30 minutes before incentive spirometry sessions to allow the medication to reach peak effect. This ensures that pain does not limit the patient's ability to take deep breaths and sustain inspiration. Waiting until after the exercise misses the therapeutic window. Pain is the number one barrier to effective incentive spirometry and should be proactively managed." }]
  },
};
