import type { LessonContent } from "./types";

export const generatedBatch015Lessons: Record<string, LessonContent> = {
  "calcium-imbalance-rpn": {
        title: "Calcium Imbalance: Hypocalcemia and Hypercalcemia",
        cellular: { title: "Calcium Homeostasis and Cellular Function", content: "Calcium is the most abundant mineral in the body, with approximately 99% stored in bones and teeth and only 1% circulating in the blood. Normal total serum calcium ranges from 8.5 to 10.5 mg/dL (2.12-2.62 mmol/L). Approximately 50% of serum calcium is bound to albumin (inactive), 40% is ionized/free (biologically active), and 10% is bound to other anions. The ionized fraction (normal 4.5-5.5 mg/dL or 1.12-1.37 mmol/L) is the physiologically important form that affects neuromuscular excitability, cardiac conduction, blood clotting, and bone metabolism. Three hormones regulate calcium balance: parathyroid hormone (PTH) raises serum calcium by stimulating osteoclast activity (bone resorption), increasing renal calcium reabsorption, and activating vitamin D; calcitonin (from thyroid C-cells) lowers serum calcium by inhibiting osteoclast activity; and active vitamin D (calcitriol) increases intestinal calcium absorption. Calcium and phosphorus have an inverse relationship -- when one rises, the other tends to fall. Calcium also has an important relationship with albumin: low albumin causes falsely low total calcium (correct by adding 0.8 mg/dL for each 1 g/dL decrease in albumin below 4 g/dL). Hypocalcemia (total calcium below 8.5 mg/dL) increases neuromuscular excitability, causing tetany, muscle spasms, and cardiac conduction abnormalities. Hypercalcemia (total calcium above 10.5 mg/dL) decreases neuromuscular excitability, causing muscle weakness, lethargy, constipation, and potentially fatal cardiac dysrhythmias. The practical nurse must recognize the clinical manifestations of calcium imbalances and understand the urgency of reporting and intervening appropriately." },
        riskFactors: ["Hypoparathyroidism (post-thyroidectomy or parathyroidectomy -- most common surgical cause of hypocalcemia)","Vitamin D deficiency (inadequate dietary intake, malabsorption, chronic kidney disease)","Chronic kidney disease (impaired vitamin D activation and phosphorus retention)","Malignancy with bone metastases (osteolytic activity releases calcium -- most common cause of hypercalcemia in hospitalized patients)","Primary hyperparathyroidism (most common cause of hypercalcemia in outpatients)","Immobility (calcium leaches from bones into blood -- disuse osteoporosis)","Medications: loop diuretics (increase calcium excretion -- hypocalcemia), thiazide diuretics (decrease calcium excretion -- hypercalcemia), lithium (stimulates PTH)"],
        diagnostics: ["Total serum calcium (normal 8.5-10.5 mg/dL): must be interpreted in context of albumin level; corrected calcium = total Ca + 0.8 x (4 - albumin)","Ionized calcium (normal 4.5-5.5 mg/dL): the biologically active form; more accurate than total calcium in patients with abnormal albumin","Serum phosphorus (normal 2.5-4.5 mg/dL): inverse relationship with calcium; elevated phosphorus drives calcium down","Parathyroid hormone (PTH) level: elevated in primary hyperparathyroidism and secondary hyperparathyroidism; low/absent in hypoparathyroidism","25-hydroxyvitamin D level: low levels indicate vitamin D deficiency contributing to hypocalcemia","ECG: hypocalcemia causes prolonged QT interval (risk for torsades de pointes); hypercalcemia causes shortened QT interval and possible heart block"],
        management: ["Hypocalcemia (mild): oral calcium supplements (calcium carbonate or calcium citrate) with vitamin D; take with food to enhance absorption","Hypocalcemia (severe/symptomatic): IV calcium gluconate 10% is preferred; infuse slowly over 10-20 minutes with cardiac monitoring; never give as rapid IV push","Hypercalcemia (mild): increase oral fluid intake to 3-4 liters per day; increase mobility; reduce dietary calcium intake","Hypercalcemia (moderate to severe): aggressive IV normal saline hydration (200-300 mL/hour initially); loop diuretics (furosemide) after adequate hydration to promote calciuresis","Hypercalcemia from malignancy: bisphosphonates (pamidronate or zoledronic acid IV) or calcitonin for rapid reduction; treat underlying malignancy","Seizure precautions for severe hypocalcemia: pad side rails, maintain suction and oxygen at bedside, reduce environmental stimuli"],
        nursingActions: ["Assess for Trousseau sign (inflate BP cuff above systolic for 3 minutes -- positive if carpopedal spasm occurs) and Chvostek sign (tap facial nerve anterior to ear -- positive if facial twitching occurs) as bedside tests for hypocalcemia","Place patient on continuous cardiac monitoring when calcium levels are critically abnormal (below 7.0 or above 13.0 mg/dL)","Administer IV calcium gluconate through a large-bore IV in a large vein; if extravasation occurs, calcium chloride causes severe tissue necrosis","Monitor for tingling around the mouth and in the fingertips -- earliest symptom of hypocalcemia","In hypercalcemia, encourage ambulation (weight-bearing activity promotes calcium deposition in bone) and maintain high fluid intake","Monitor for constipation in hypercalcemia and administer stool softeners as ordered","Report ECG changes promptly: prolonged QT interval (hypocalcemia) or shortened QT interval (hypercalcemia)"],
        assessmentFindings: ["Hypocalcemia: perioral and fingertip tingling/numbness (earliest), muscle cramps, positive Trousseau and Chvostek signs, hyperactive deep tendon reflexes, tetany, laryngospasm, seizures","Hypercalcemia: muscle weakness, fatigue, lethargy, confusion, constipation, anorexia, nausea, polyuria, polydipsia, shortened QT on ECG, kidney stones","Severe hypocalcemia: stridor (laryngospasm), bronchospasm, seizures, prolonged QT interval, cardiac arrest","Severe hypercalcemia (calcium crisis above 14 mg/dL): obtundation, coma, cardiac arrest, renal failure"],
        signs: { left: ["Perioral tingling and numbness (hypocalcemia)","Muscle cramps and spasms (hypocalcemia)","Fatigue and weakness (hypercalcemia)","Constipation and anorexia (hypercalcemia)","Hyperactive deep tendon reflexes (hypocalcemia)","Decreased deep tendon reflexes (hypercalcemia)"], right: ["Positive Trousseau sign (carpopedal spasm with BP cuff inflation)","Positive Chvostek sign (facial twitching with nerve tap)","Tetany and laryngospasm (severe hypocalcemia)","Seizures (severe hypocalcemia)","Prolonged QT interval and torsades de pointes (hypocalcemia)","Calcium crisis: coma, cardiac arrest, acute kidney injury (severe hypercalcemia)"] },
        medications: [{ name: "Calcium Gluconate 10% (IV)", type: "Electrolyte replacement / calcium supplement", action: "Provides ionized calcium directly to the bloodstream, restoring neuromuscular function, cardiac conduction, and coagulation in acute hypocalcemia; 10 mL of 10% calcium gluconate provides approximately 93 mg elemental calcium", sideEffects: "Bradycardia, hypotension (if infused too rapidly), flushing, nausea, phlebitis at IV site, tissue irritation (less severe than calcium chloride)", contra: "Hypercalcemia; digitalis toxicity (calcium potentiates digoxin effects and can cause fatal dysrhythmias); severe renal impairment", pearl: "PREFERRED IV calcium formulation because it is less irritating to veins than calcium chloride; infuse slowly over 10-20 minutes with cardiac monitoring; if patient is on digoxin, use extreme caution and monitor ECG continuously" },{ name: "Calcitriol (Rocaltrol)", type: "Active vitamin D analog (1,25-dihydroxyvitamin D3)", action: "The active form of vitamin D that increases intestinal absorption of calcium and phosphorus and promotes calcium reabsorption in the renal tubules; does not require renal activation (important in CKD patients)", sideEffects: "Hypercalcemia, hyperphosphatemia, nausea, vomiting, constipation, weakness, headache, metallic taste", contra: "Hypercalcemia; vitamin D toxicity; hyperphosphatemia (correct phosphorus first before starting calcitriol)", pearl: "Essential for patients with chronic kidney disease who cannot activate vitamin D; monitor serum calcium and phosphorus levels weekly during dose titration; calcium x phosphorus product should remain below 55 to prevent metastatic calcification" },{ name: "Pamidronate (Aredia)", type: "Bisphosphonate (osteoclast inhibitor)", action: "Binds to hydroxyapatite in bone and inhibits osteoclast-mediated bone resorption, reducing calcium release from bone into the bloodstream; takes 24-72 hours for full effect", sideEffects: "Fever (most common), bone pain, myalgia, nausea, injection site reaction, hypocalcemia, osteonecrosis of the jaw (rare with prolonged use)", contra: "Hypocalcemia (must correct before administration); severe renal impairment (GFR below 30 mL/min); pregnancy", pearl: "Used for hypercalcemia of malignancy; infuse IV over 2-4 hours (never as bolus); ensure adequate hydration BEFORE administration; onset of action is 24-72 hours so calcitonin may be used as a bridge for rapid calcium reduction" }],
        pearls: ["ALWAYS correct calcium for albumin: corrected Ca = total Ca + 0.8 x (4.0 - albumin). A total calcium of 7.8 with albumin of 2.0 gives corrected calcium of 9.4 (actually normal).","Trousseau sign is MORE sensitive than Chvostek sign for hypocalcemia. To perform: inflate BP cuff above systolic pressure for 3 minutes -- positive if carpopedal spasm (wrist flexion, finger adduction) occurs.","Calcium and digoxin are a DANGEROUS combination: elevated calcium potentiates digoxin toxicity and can cause fatal dysrhythmias. Use extreme caution giving IV calcium to patients on digitalis preparations.","The mnemonic for hypercalcemia symptoms: Stones (kidney), Bones (pain), Groans (GI: constipation, nausea), Moans (neuropsych: confusion, lethargy), and Thrones (polyuria from osmotic diuresis).","IV calcium gluconate is PREFERRED over calcium chloride for peripheral IV administration because calcium chloride causes severe tissue necrosis if it extravasates.","Post-thyroidectomy patients are at HIGH risk for hypocalcemia due to inadvertent removal or damage to the parathyroid glands; monitor for Chvostek and Trousseau signs and tingling within 24-48 hours after surgery."],
        quiz: [{ question: "A practical nurse is caring for a patient 24 hours after total thyroidectomy. The patient reports tingling around the mouth and in the fingertips. Which action should the nurse take FIRST?", options: ["Administer a calcium supplement as prescribed","Encourage the patient to drink more fluids","Check the serum calcium level and notify the physician","Apply ice packs to the surgical site"], correct: 2, rationale: "Perioral and fingertip tingling are the earliest signs of hypocalcemia, a common complication after thyroidectomy due to inadvertent parathyroid gland damage. The nurse should check the calcium level and notify the physician immediately for assessment and treatment orders." },{ question: "A patient has a total serum calcium of 7.6 mg/dL and albumin of 2.0 g/dL. What is the corrected calcium level?", options: ["7.6 mg/dL","8.4 mg/dL","9.2 mg/dL","10.0 mg/dL"], correct: 2, rationale: "Corrected calcium = total Ca + 0.8 x (4.0 - albumin) = 7.6 + 0.8 x (4.0 - 2.0) = 7.6 + 1.6 = 9.2 mg/dL. The corrected calcium of 9.2 is within the normal range (8.5-10.5), indicating the low total calcium was due to hypoalbuminemia, not true hypocalcemia." },{ question: "A patient with hypercalcemia of malignancy (calcium 14.2 mg/dL) is receiving IV normal saline and pamidronate. Which finding should the practical nurse report as an expected effect of treatment?", options: ["Decreased urine output","Gradual decline in calcium level over 24-72 hours","Immediate return of calcium to normal within 1 hour","Increased serum phosphorus level"], correct: 1, rationale: "Pamidronate (a bisphosphonate) takes 24-72 hours for full effect as it inhibits osteoclast bone resorption. A gradual decline in calcium over this timeframe is an expected and appropriate response. IV hydration with normal saline promotes calciuresis and supports renal calcium excretion in the interim." }]
  },
  "calcium-regulation-np": {
    title: "Calcium Regulation",
    cellular: { title: "Pathophysiology of Calcium Regulation", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of calcium regulation or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with calcium regulation. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with calcium regulation?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their calcium regulation diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "calcium-vitamin-d-logic-np": {
    title: "Calcium/Vitamin D Logic",
    cellular: { title: "Pathophysiology of Calcium/Vitamin D Logic", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of calcium vitamin d logic or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with calcium vitamin d logic. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with calcium vitamin d logic?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their calcium vitamin d logic diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cancer-basics-staging-rpn": {
    title: "Cancer Basics Staging",
    cellular: { title: "Pathophysiology of Cancer Basics Staging", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cancer basics staging or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
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
        question: "A nurse is caring for a patient with cancer basics staging. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cancer basics staging?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cancer basics staging diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cancer-pain-management-rpn": {
    title: "Cancer Pain Management",
    cellular: { title: "Pathophysiology of Cancer Pain Management", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cancer pain management or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
    assessmentFindings: ["Changes in vital signs including temperature, pulse, blood pressure, and respirations","Alterations in level of consciousness, orientation, or cognitive function","Pain assessment using validated tools (onset, location, duration, character, severity)","Skin assessment including color, turgor, moisture, integrity, and temperature","Functional status changes including mobility, self-care ability, and nutritional intake"],
    signs: {
      left: ["Changes in vital sign trends","Altered mental status or confusion","Pain or discomfort reported by patient","Skin changes (pallor, diaphoresis, cyanosis, jaundice)","Abnormal laboratory values"],
      right: ["Fever or hypothermia","Edema (peripheral, periorbital, or generalized)","Adventitious breath sounds or respiratory distress","Gastrointestinal symptoms (nausea, vomiting, distension)","Changes in urine output or characteristics"]
    },
    medications: [{
      name: "Morphine",
      type: "Opioid analgesic",
      action: "Binds to mu-opioid receptors in the CNS to alter perception of and response to pain",
      sideEffects: "Respiratory depression, constipation, sedation, nausea, pruritus, urinary retention",
      contra: "Severe respiratory depression, acute or severe bronchial asthma without monitoring, paralytic ileus",
      pearl: "Titrate to pain relief while monitoring respiratory rate; keep naloxone available for reversal"
    }],
    pearls: ["Always assess for allergies before administering any new medication","Document baseline assessment findings to enable accurate trending","Use the SBAR format for structured clinical communication with the healthcare team","Consider age-specific and population-specific variations in normal findings","Never ignore a sudden change in patient condition, even if vital signs appear stable","Verify two patient identifiers before any medication administration or procedure"],
    quiz: [
      {
        question: "A nurse is caring for a patient with cancer pain management. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cancer pain management?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cancer pain management diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cancer-screening-guidelines-np": {
    title: "Cancer Screening by Age/Gender: USPSTF Recommendations",
    cellular: { title: "Pathophysiology of Cancer Screening by Age/Gender: USPSTF Recommendations", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cancer screening guidelines or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with cancer screening guidelines. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cancer screening guidelines?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cancer screening guidelines diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "capacity-assessment-np": {
    title: "Decision-Making Capacity Assessment",
    cellular: { title: "Pathophysiology of Decision-Making Capacity Assessment", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of capacity assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with capacity assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with capacity assessment?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their capacity assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "capillary-refill-assessment": {
    title: "Capillary Refill and Perfusion",
    cellular: { title: "Pathophysiology of Capillary Refill and Perfusion", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of capillary refill assessment or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with capillary refill assessment. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with capillary refill assessment?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their capillary refill assessment diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "carbon-monoxide-poisoning-np": {
    title: "Carbon Monoxide Poisoning",
    cellular: { title: "Pathophysiology of Carbon Monoxide Poisoning", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of carbon monoxide poisoning or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with carbon monoxide poisoning. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with carbon monoxide poisoning?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their carbon monoxide poisoning diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "carbon-monoxide-poisoning-rpn": {
    title: "Carbon Monoxide Poisoning",
    cellular: { title: "Pathophysiology of Carbon Monoxide Poisoning", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of carbon monoxide poisoning or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
    diagnostics: ["Perform focused assessment and report findings to supervising nurse","Monitor vital signs and report deviations from baseline","Collect specimens as directed and label accurately","Document assessment findings and communicate changes promptly","Recognize and report signs of deterioration"],
    management: ["Administer medications as ordered and document administration","Implement comfort measures and basic supportive care","Follow established care protocols and report patient responses","Assist with activities of daily living and mobility as appropriate","Report changes in patient condition to the registered nurse promptly"],
    nursingActions: ["Monitor and report for changes in condition","Administer medications as ordered and document per established protocols","Perform basic interventions as directed based on assessment findings","Reinforce patient teaching as delegated regarding condition management","Document all interventions, assessments, and patient responses accurately","Maintain safe environment and follow infection prevention protocols"],
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
        question: "A nurse is caring for a patient with carbon monoxide poisoning. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with carbon monoxide poisoning?",
        options: ["Monitor and report for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their carbon monoxide poisoning diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "carcinoid-syndrome-np": {
    title: "Carcinoid Syndrome: Serotonin & 5-HIAA",
    cellular: { title: "Pathophysiology of Carcinoid Syndrome: Serotonin & 5-HIAA", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of carcinoid syndrome or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with carcinoid syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with carcinoid syndrome?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their carcinoid syndrome diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "carcinoid-syndrome-rn": {
    title: "Carcinoid Syndrome",
    cellular: { title: "Pathophysiology of Carcinoid Syndrome", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of carcinoid syndrome or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with carcinoid syndrome. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with carcinoid syndrome?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their carcinoid syndrome diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cardiac-amyloidosis-rn": {
    title: "Cardiac Amyloidosis",
    cellular: { title: "Pathophysiology of Cardiac Amyloidosis", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cardiac amyloidosis or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with cardiac amyloidosis. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cardiac amyloidosis?",
        options: ["Perform comprehensive assessment and interpret findings for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cardiac amyloidosis diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cardiac-conduction-system-np": {
    title: "Cardiac Conduction System",
    cellular: { title: "Pathophysiology of Cardiac Conduction System", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cardiac conduction system or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with cardiac conduction system. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cardiac conduction system?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cardiac conduction system diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
  "cardiac-output-determinants-np": {
    title: "Cardiac Output Determinants",
    cellular: { title: "Pathophysiology of Cardiac Output Determinants", content: "[WRITE YOUR PATHOPHYSIOLOGY AND INTRODUCTION HERE]" },
    riskFactors: ["Advanced age or extremes of age","Family history of cardiac output determinants or related conditions","Chronic comorbidities (hypertension, diabetes, obesity)","Sedentary lifestyle and poor nutritional status","Tobacco, alcohol, or substance use","Immunocompromised state or prolonged medication use"],
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
        question: "A nurse is caring for a patient with cardiac output determinants. Which assessment finding requires immediate intervention?",
        options: ["Sudden change in level of consciousness","Mild discomfort rated 3/10 on pain scale","Stable vital signs within normal limits","Patient requesting information about their condition"],
        correct: 0,
        rationale: "A sudden change in level of consciousness may indicate a serious complication such as hemorrhage, hypoxia, or neurological deterioration and requires immediate assessment and intervention."
      },
      {
        question: "Which nursing action is most appropriate when managing a patient with cardiac output determinants?",
        options: ["Order and interpret diagnostic studies for changes in condition","Delay assessment until the next scheduled time","Administer PRN medications without assessment","Transfer care without communicating relevant findings"],
        correct: 0,
        rationale: "Ongoing assessment and timely intervention are fundamental to safe patient care. Delaying assessment, administering medications without assessment, or failing to communicate findings can compromise patient safety."
      },
      {
        question: "The patient asks about their cardiac output determinants diagnosis. What is the best initial nursing response?",
        options: ["Avoid discussing the diagnosis and redirect the conversation","Provide all available information regardless of patient readiness","Assess the patient's current understanding and address their specific concerns","Tell the patient to wait for the physician to explain everything"],
        correct: 2,
        rationale: "Assessing the patient's current understanding allows the nurse to provide targeted, accurate education at the appropriate level, supporting informed decision-making and reducing anxiety."
      },
    ]
  },
};
