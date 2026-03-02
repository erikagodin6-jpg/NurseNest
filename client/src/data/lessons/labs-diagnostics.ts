import type { LessonContent } from "./types";

export const labsDiagnosticsLessons: Record<string, LessonContent> = {
  "labs-diagnostics-rpn": {
    title: "RPN Labs and Diagnostics",
    cellular: {
      title: "Foundations of Laboratory Diagnostics for Practical Nurses",
      content:
        "Laboratory diagnostics provide objective data that complement clinical assessment findings. Blood samples undergo centrifugation to separate cellular components from plasma, enabling analysis of individual analytes such as electrolytes, glucose, and blood cell counts. The complete blood count (CBC) evaluates red blood cells, white blood cells, and platelets, reflecting oxygen-carrying capacity, immune function, and clotting ability respectively. The basic metabolic panel (BMP) assesses kidney function, electrolyte balance, and glucose metabolism, forming the cornerstone of routine diagnostic evaluation in most clinical settings.",
    },
    riskFactors: [
      "Hemolyzed specimens leading to falsely elevated potassium",
      "Improper specimen labeling causing patient identification errors",
      "Prolonged tourniquet application altering electrolyte values",
      "Drawing blood from an IV arm producing diluted or contaminated results",
      "Delayed specimen transport affecting glucose and coagulation results",
    ],
    diagnostics: [
      "CBC: WBC 4,500-11,000/mcL, RBC 4.5-5.5 million/mcL (male), Hgb 12-16 g/dL (female) 14-18 g/dL (male), Hct 36-46% (female) 40-54% (male), Platelets 150,000-400,000/mcL",
      "BMP: Sodium 135-145 mEq/L, Potassium 3.5-5.0 mEq/L, Chloride 96-106 mEq/L, CO2 22-28 mEq/L, BUN 7-20 mg/dL, Creatinine 0.6-1.2 mg/dL, Glucose 70-100 mg/dL fasting",
      "Urinalysis: pH 4.5-8.0, specific gravity 1.005-1.030, negative for protein, glucose, blood, nitrites, and leukocyte esterase",
      "Basic coagulation: PT 11-13.5 seconds, INR 0.8-1.1 (therapeutic 2.0-3.0), PTT 25-35 seconds",
    ],
    management: [
      "Verify patient identity using two identifiers before specimen collection",
      "Label specimens at the bedside immediately after collection",
      "Use correct tube color and order of draw to prevent cross-contamination",
      "Transport specimens to the laboratory within the required timeframe",
      "Report critical lab values to the provider immediately per facility protocol",
    ],
    nursingActions: [
      "Verify nothing-by-mouth (NPO) status before fasting lab draws",
      "Apply pressure to venipuncture sites for patients on anticoagulants",
      "Document time of specimen collection and any relevant patient conditions",
      "Correlate lab results with clinical presentation before notifying provider",
      "Ensure proper chain of custody for specimens requiring legal documentation",
    ],
    assessmentFindings: [
      "Hypokalemia: muscle weakness, fatigue, cardiac dysrhythmias, decreased bowel sounds",
      "Hyperkalemia: peaked T waves on ECG, muscle cramps, paresthesias, bradycardia",
      "Hyponatremia: confusion, headache, nausea, seizures in severe cases",
      "Hypernatremia: thirst, dry mucous membranes, restlessness, elevated temperature",
      "Anemia (low Hgb/Hct): pallor, tachycardia, fatigue, dyspnea on exertion",
    ],
    signs: {
      left: [
        "Potassium 3.5-5.0 mEq/L is the normal range",
        "Sodium 135-145 mEq/L is the normal range",
        "WBC 4,500-11,000/mcL indicates normal immune function",
        "Hemoglobin below 7 g/dL typically requires transfusion consideration",
        "Platelets below 50,000/mcL increase bleeding risk significantly",
      ],
      right: [
        "Critical potassium below 2.5 or above 6.5 mEq/L requires immediate reporting",
        "Critical sodium below 120 or above 160 mEq/L requires immediate reporting",
        "WBC above 11,000/mcL may indicate infection or inflammatory response",
        "BUN-to-creatinine ratio above 20:1 suggests prerenal azotemia or dehydration",
        "Glucose below 40 mg/dL or above 400 mg/dL are critical values",
      ],
    },
    medications: [
      {
        name: "Potassium Chloride (KCl)",
        type: "Electrolyte Replacement",
        action:
          "Replaces potassium deficit to restore normal serum levels and maintain cardiac and neuromuscular function",
        sideEffects:
          "GI irritation, nausea, vomiting, diarrhea, phlebitis with IV administration",
        contra:
          "Hyperkalemia, renal failure with oliguria, concurrent use of potassium-sparing diuretics without monitoring",
        pearl:
          "IV potassium must never be given as a bolus push; always administer via infusion pump at no more than 10 mEq per hour in a peripheral line to prevent fatal cardiac arrest",
      },
    ],
    pearls: [
      "Always draw blood from the arm opposite to an IV infusion site to avoid sample contamination and inaccurate results",
      "Hemolyzed specimens falsely elevate potassium levels and should be recollected before clinical decisions are made",
      "Critical lab values must be reported to the provider immediately and documented with a read-back confirmation",
      "The order of draw for vacuum tubes prevents additive carryover: blood cultures first, then light blue (citrate), red, green, lavender, gray",
      "Fasting glucose above 126 mg/dL on two separate occasions meets diagnostic criteria for diabetes mellitus",
    ],
    quiz: [
      {
        question:
          "A patient's potassium level returns at 6.8 mEq/L. What is the priority nursing action?",
        options: [
          "Recheck the level in 4 hours",
          "Notify the healthcare provider immediately",
          "Encourage the patient to eat potassium-rich foods",
          "Document the finding and continue monitoring",
        ],
        correct: 1,
        rationale:
          "A potassium level of 6.8 mEq/L is a critical value that can cause fatal cardiac dysrhythmias. The nurse must notify the healthcare provider immediately so that interventions such as calcium gluconate, insulin with dextrose, or sodium polystyrene can be initiated.",
      },
      {
        question:
          "Which specimen collection error is most likely to produce a falsely elevated potassium result?",
        options: [
          "Using an expired collection tube",
          "Drawing blood from below an IV site",
          "Prolonged tourniquet application causing hemolysis",
          "Collecting the specimen after the patient has eaten",
        ],
        correct: 2,
        rationale:
          "Prolonged tourniquet application causes tissue ischemia and hemolysis, which releases intracellular potassium from red blood cells into the sample, producing falsely elevated potassium readings.",
      },
      {
        question:
          "A patient has a hemoglobin of 7.2 g/dL and reports fatigue and dyspnea on exertion. Which assessment finding is most consistent with this lab value?",
        options: [
          "Bounding peripheral pulses",
          "Bradycardia at rest",
          "Pallor of the conjunctivae and nail beds",
          "Peripheral edema with weight gain",
        ],
        correct: 2,
        rationale:
          "A hemoglobin of 7.2 g/dL indicates significant anemia. Reduced oxygen-carrying capacity causes compensatory tachycardia (not bradycardia), fatigue, dyspnea, and visible pallor of the conjunctivae and nail beds due to decreased circulating hemoglobin.",
      },
    ],
  },

  "labs-diagnostics-rn": {
    title: "RN Labs and Diagnostics",
    cellular: {
      title: "Advanced Laboratory and Diagnostic Interpretation for Registered Nurses",
      content:
        "Registered nurses must interpret complex laboratory panels and integrate findings into clinical decision-making. Arterial blood gas (ABG) analysis evaluates acid-base balance through measurement of pH, PaCO2, HCO3, and PaO2, enabling identification of respiratory or metabolic disturbances and their compensation status. Cardiac biomarkers such as troponin and BNP provide time-sensitive data critical for differentiating acute coronary syndromes from heart failure. Comprehensive coagulation studies guide anticoagulant therapy monitoring, while liver function tests reveal hepatocellular injury, cholestasis, and synthetic function through patterns of enzyme elevation.",
    },
    riskFactors: [
      "Air bubbles in ABG specimens altering PaO2 and PaCO2 values",
      "Delayed processing of troponin specimens missing the diagnostic window",
      "Failure to correlate INR with warfarin dose timing",
      "Misidentifying compensated versus uncompensated acid-base disorders",
      "Overlooking ST-segment changes on continuous cardiac monitoring",
    ],
    diagnostics: [
      "ABG normals: pH 7.35-7.45, PaCO2 35-45 mmHg, HCO3 22-26 mEq/L, PaO2 80-100 mmHg",
      "Cardiac enzymes: Troponin I less than 0.04 ng/mL (rises 3-6 hours post-injury, peaks 12-24 hours), CK-MB 0-3 ng/mL, BNP less than 100 pg/mL, NT-proBNP less than 300 pg/mL",
      "Coagulation panel: PT 11-13.5 seconds, INR therapeutic range 2.0-3.0 for most indications (2.5-3.5 for mechanical valves), aPTT 25-35 seconds (therapeutic 1.5-2.5 times normal for heparin), Fibrinogen 200-400 mg/dL, D-dimer less than 500 ng/mL",
      "Liver panel: AST 10-40 U/L, ALT 7-56 U/L, ALP 44-147 U/L, GGT 9-48 U/L, Albumin 3.5-5.0 g/dL, Total bilirubin 0.1-1.2 mg/dL",
      "ECG intervals: PR interval 0.12-0.20 seconds, QRS complex less than 0.12 seconds, QT interval less than 0.44 seconds",
    ],
    management: [
      "Use the systematic ABG approach: assess pH first, then evaluate PaCO2 and HCO3 to determine respiratory or metabolic origin, then check for compensation",
      "Obtain serial troponin levels at 0, 3, and 6 hours to evaluate for acute myocardial injury",
      "Monitor aPTT every 6 hours during continuous heparin infusion and adjust per protocol",
      "Assess INR before administering warfarin and hold the dose if INR exceeds the therapeutic range",
      "Report new ST-segment elevation in two or more contiguous leads immediately as a potential STEMI",
    ],
    nursingActions: [
      "Perform the Allen test before radial arterial puncture for ABG collection",
      "Place ABG specimens on ice and transport to the lab within 15 minutes",
      "Assess for signs of bleeding in patients with supratherapeutic INR or aPTT",
      "Correlate elevated BNP with clinical signs of fluid overload including crackles, edema, and jugular venous distention",
      "Monitor ECG rhythm strips for interval changes and ST-segment abnormalities during chest pain evaluation",
    ],
    assessmentFindings: [
      "Respiratory acidosis (pH less than 7.35, PaCO2 greater than 45): hypoventilation, confusion, drowsiness",
      "Metabolic acidosis (pH less than 7.35, HCO3 less than 22): Kussmaul respirations, lethargy, hyperkalemia",
      "Respiratory alkalosis (pH greater than 7.45, PaCO2 less than 35): hyperventilation, tingling, lightheadedness",
      "Metabolic alkalosis (pH greater than 7.45, HCO3 greater than 26): hypoventilation, muscle twitching, hypokalemia",
      "Elevated troponin with chest pain: diaphoresis, jaw or arm radiation, nausea, ST changes on ECG",
    ],
    signs: {
      left: [
        "pH below 7.35 indicates acidosis; pH above 7.45 indicates alkalosis",
        "PaCO2 is regulated by the lungs and reflects the respiratory component",
        "HCO3 is regulated by the kidneys and reflects the metabolic component",
        "Troponin elevation begins 3-6 hours after myocardial injury onset",
        "AST and ALT elevation pattern helps distinguish hepatocellular from cholestatic injury",
      ],
      right: [
        "Compensation moves pH toward normal but never overcorrects past 7.40",
        "Respiratory compensation occurs within minutes to hours via changes in ventilation rate",
        "Metabolic compensation takes 24-48 hours as the kidneys adjust bicarbonate retention or excretion",
        "CK-MB rises within 4-6 hours and returns to baseline within 48-72 hours, useful for detecting reinfarction",
        "D-dimer has high sensitivity but low specificity; a negative result effectively rules out pulmonary embolism",
      ],
    },
    medications: [
      {
        name: "Heparin (Unfractionated)",
        type: "Anticoagulant",
        action:
          "Binds to antithrombin III to inactivate thrombin and factor Xa, preventing clot propagation in acute thromboembolic events",
        sideEffects:
          "Bleeding, heparin-induced thrombocytopenia (HIT), injection site reactions, osteoporosis with prolonged use",
        contra:
          "Active uncontrolled bleeding, severe thrombocytopenia, history of HIT, recent intracranial hemorrhage",
        pearl:
          "Monitor aPTT every 6 hours during continuous infusion and maintain at 1.5-2.5 times the control value; protamine sulfate is the reversal agent for heparin overdose",
      },
      {
        name: "Warfarin (Coumadin)",
        type: "Anticoagulant",
        action:
          "Inhibits vitamin K-dependent synthesis of clotting factors II, VII, IX, and X, preventing thrombus formation",
        sideEffects:
          "Bleeding, skin necrosis (rare, early therapy), teratogenicity, purple toe syndrome",
        contra:
          "Pregnancy, active bleeding, recent surgery of the CNS or eye, unsupervised patients with high fall risk",
        pearl:
          "Monitor INR for warfarin effectiveness; therapeutic range is 2.0-3.0 for most indications; vitamin K (phytonadione) is the reversal agent and takes 24 hours for full effect",
      },
    ],
    pearls: [
      "Use the mnemonic ROME: Respiratory Opposite (pH and PaCO2 move in opposite directions), Metabolic Equal (pH and HCO3 move in the same direction) to quickly classify ABG disorders",
      "Troponin is the most sensitive and specific biomarker for myocardial injury; serial measurements are essential because a single negative result does not rule out acute coronary syndrome",
      "An elevated D-dimer is nonspecific and can be caused by infection, surgery, pregnancy, or malignancy; however, a negative D-dimer in a low-risk patient effectively excludes pulmonary embolism",
      "ST elevation in leads II, III, and aVF indicates an inferior STEMI, typically involving the right coronary artery",
      "When AST is elevated disproportionately to ALT (ratio greater than 2:1), suspect alcohol-related liver disease rather than viral hepatitis",
    ],
    quiz: [
      {
        question:
          "A patient has ABG results: pH 7.28, PaCO2 58 mmHg, HCO3 24 mEq/L. How should the nurse interpret these results?",
        options: [
          "Metabolic acidosis, uncompensated",
          "Respiratory acidosis, uncompensated",
          "Respiratory alkalosis, partially compensated",
          "Mixed acid-base disorder",
        ],
        correct: 1,
        rationale:
          "The pH of 7.28 is acidotic. The PaCO2 of 58 mmHg is elevated (acidotic), which matches the pH direction, indicating a respiratory cause. The HCO3 of 24 mEq/L is within normal range, meaning the kidneys have not yet compensated. This is uncompensated respiratory acidosis.",
      },
      {
        question:
          "A patient on continuous heparin infusion has an aPTT of 120 seconds (control 30 seconds). What is the priority nursing action?",
        options: [
          "Increase the heparin drip rate per protocol",
          "Stop the heparin infusion and notify the provider",
          "Administer vitamin K intravenously",
          "Recheck the aPTT in 6 hours",
        ],
        correct: 1,
        rationale:
          "An aPTT of 120 seconds is 4 times the control value, which is significantly supratherapeutic (target is 1.5-2.5 times control). The nurse should stop the heparin infusion immediately and notify the provider due to high bleeding risk. Vitamin K reverses warfarin, not heparin; protamine sulfate is the heparin antidote.",
      },
      {
        question:
          "A patient presents with chest pain and initial troponin of 0.02 ng/mL. The provider orders serial troponins. What is the rationale for repeating the test?",
        options: [
          "Troponin levels are unreliable and require confirmation",
          "A single troponin cannot detect reinfarction",
          "Troponin takes 3-6 hours to rise after myocardial injury and may be negative early",
          "Serial troponins are needed to calculate the ejection fraction",
        ],
        correct: 2,
        rationale:
          "Troponin begins to rise 3-6 hours after myocardial cell death. A patient presenting early after symptom onset may have a normal initial troponin that subsequently rises on repeat testing. Serial measurements at 0, 3, and 6 hours are standard to avoid missing an evolving acute coronary syndrome.",
      },
    ],
  },

  "labs-diagnostics-np": {
    title: "NP Labs and Diagnostics",
    cellular: {
      title: "Advanced Diagnostic Reasoning and Test Interpretation for Nurse Practitioners",
      content:
        "Nurse practitioners must independently select, order, and interpret diagnostic studies using evidence-based reasoning. Diagnostic accuracy depends on understanding pretest probability, which is the likelihood of disease before testing, combined with test characteristics including sensitivity, specificity, and predictive values. Sensitivity measures a test's ability to correctly identify those with the disease (true positive rate), while specificity measures its ability to correctly identify those without the disease (true negative rate). Advanced lab panels including thyroid function, iron studies, lipid profiles, and tumor markers require interpretation within clinical context, as isolated abnormal values frequently occur in the absence of disease.",
    },
    riskFactors: [
      "Ordering low-yield tests in patients with low pretest probability, generating false positives",
      "Failure to account for biotin supplement interference with thyroid and troponin immunoassays",
      "Overlooking medication effects on laboratory values such as statin-induced transaminase elevation",
      "Inappropriate imaging selection exposing patients to unnecessary ionizing radiation",
      "Anchoring bias leading to premature diagnostic closure before completing the workup",
    ],
    diagnostics: [
      "Thyroid panel: TSH 0.4-4.0 mIU/L, Free T4 0.8-1.8 ng/dL, Free T3 2.3-4.2 pg/mL; elevated TSH with low free T4 indicates primary hypothyroidism",
      "Iron studies: Serum iron 60-170 mcg/dL, TIBC 250-370 mcg/dL, Ferritin 12-150 ng/mL (female) 12-300 ng/mL (male), Transferrin saturation 20-50%",
      "Lipid panel: Total cholesterol less than 200 mg/dL, LDL less than 100 mg/dL (less than 70 for high-risk), HDL greater than 40 mg/dL (male) greater than 50 mg/dL (female), Triglycerides less than 150 mg/dL",
      "HbA1c: less than 5.7% normal, 5.7-6.4% prediabetes, 6.5% or greater diabetes; each 1% change represents approximately 28-30 mg/dL change in average glucose",
      "Imaging selection: X-ray for initial bone and chest evaluation, CT for acute trauma and pulmonary embolism, MRI for soft tissue and neurological assessment, Ultrasound for pregnancy, gallbladder, and vascular studies",
    ],
    management: [
      "Apply Bayesian reasoning: consider pretest probability before ordering tests to improve positive predictive value",
      "Use validated clinical decision tools such as Wells criteria, Ottawa ankle rules, and PERC rule to guide test selection",
      "Order thyroid antibodies (anti-TPO, anti-thyroglobulin) when autoimmune thyroiditis is suspected based on TSH and free T4 results",
      "Follow USPSTF screening recommendations for colorectal cancer (age 45-75), breast cancer (mammography age 50-74), cervical cancer (Pap/HPV age 21-65), and abdominal aortic aneurysm (one-time ultrasound for male smokers age 65-75)",
      "Interpret tumor markers (PSA, CA-125, CEA, AFP) within clinical context as screening tools have limited specificity and are primarily used for treatment monitoring",
    ],
    nursingActions: [
      "Evaluate appropriateness of diagnostic orders using evidence-based guidelines before proceeding",
      "Discuss radiation exposure risks with patients when ordering CT scans, especially in women of childbearing age",
      "Ensure MRI safety screening is completed to identify contraindications such as pacemakers, metallic implants, and cochlear devices",
      "Interpret point-of-care testing results (rapid strep, influenza, urinalysis dipstick) with awareness of sensitivity and specificity limitations",
      "Communicate diagnostic findings and their clinical implications to patients using health literacy-appropriate language",
    ],
    assessmentFindings: [
      "Hypothyroidism (elevated TSH, low free T4): fatigue, weight gain, cold intolerance, constipation, dry skin, bradycardia",
      "Hyperthyroidism (low TSH, elevated free T4): weight loss, heat intolerance, tremor, tachycardia, exophthalmos",
      "Iron deficiency anemia: low ferritin, low serum iron, elevated TIBC, low transferrin saturation, microcytic hypochromic cells",
      "Anemia of chronic disease: low serum iron, low TIBC, normal or elevated ferritin, normocytic cells",
      "Metabolic syndrome: elevated triglycerides, low HDL, elevated fasting glucose, central obesity, hypertension",
    ],
    signs: {
      left: [
        "High sensitivity tests are best for ruling OUT disease (SnNOut: sensitive test, negative result, rules out)",
        "High specificity tests are best for ruling IN disease (SpPIn: specific test, positive result, rules in)",
        "Positive predictive value increases with higher disease prevalence in the tested population",
        "TSH is the single best screening test for thyroid dysfunction due to its sensitivity to early changes",
        "Ferritin is an acute phase reactant and may be falsely elevated in infection, inflammation, or malignancy",
      ],
      right: [
        "Negative predictive value is highest when disease prevalence is low in the population being tested",
        "Likelihood ratios greater than 10 or less than 0.1 generate large and often conclusive shifts in post-test probability",
        "CT with contrast is contraindicated in patients with severe renal impairment (GFR less than 30) due to nephrotoxicity risk",
        "MRI is the preferred imaging modality for soft tissue evaluation, spinal cord pathology, and brain lesions without radiation exposure",
        "HbA1c may be unreliable in patients with hemoglobinopathies, recent blood transfusion, or chronic kidney disease",
      ],
    },
    medications: [
      {
        name: "Levothyroxine (Synthroid)",
        type: "Thyroid Hormone Replacement",
        action:
          "Synthetic T4 that is converted to active T3 in peripheral tissues, restoring normal metabolic function in hypothyroid patients",
        sideEffects:
          "Tachycardia, palpitations, tremor, insomnia, weight loss, heat intolerance if dose is excessive",
        contra:
          "Uncorrected adrenal insufficiency (must replace cortisol before thyroid hormone), recent myocardial infarction, thyrotoxicosis",
        pearl:
          "Take on an empty stomach 30-60 minutes before breakfast; recheck TSH 6-8 weeks after dose adjustment; calcium and iron supplements must be separated by 4 hours to avoid absorption interference",
      },
      {
        name: "Atorvastatin (Lipitor)",
        type: "HMG-CoA Reductase Inhibitor (Statin)",
        action:
          "Inhibits HMG-CoA reductase in the liver, reducing cholesterol synthesis and upregulating LDL receptor expression to lower serum LDL cholesterol",
        sideEffects:
          "Myalgia, elevated hepatic transaminases, rhabdomyolysis (rare), new-onset diabetes with high-intensity therapy",
        contra:
          "Active liver disease, unexplained persistent transaminase elevation, pregnancy and breastfeeding",
        pearl:
          "Obtain baseline liver function tests before initiating therapy; monitor for muscle pain and check CK if symptomatic; high-intensity statin therapy (atorvastatin 40-80 mg) is recommended for patients with established ASCVD regardless of baseline LDL",
      },
    ],
    pearls: [
      "SnNOut and SpPIn: A highly Sensitive test with a Negative result rules OUT disease; a highly Specific test with a Positive result rules IN disease - this framework guides test selection on NP certification exams",
      "USPSTF recommends against routine PSA screening for prostate cancer; shared decision-making is required for men aged 55-69 based on individual risk factors",
      "When ordering imaging, always consider the ALARA principle (As Low As Reasonably Achievable) to minimize radiation exposure, particularly for pediatric and pregnant patients",
      "A normal TSH effectively excludes primary thyroid disease in most outpatient settings; free T4 should only be ordered when TSH is abnormal to avoid unnecessary testing and false-positive results",
      "Iron deficiency is the most common cause of anemia worldwide; ferritin below 30 ng/mL is diagnostic, but levels between 30-100 ng/mL may still represent iron deficiency in the setting of concurrent inflammation",
    ],
    quiz: [
      {
        question:
          "A nurse practitioner is evaluating a patient with fatigue. TSH is 12.4 mIU/L and free T4 is 0.4 ng/dL. Which diagnosis is most consistent with these findings?",
        options: [
          "Subclinical hypothyroidism",
          "Primary hypothyroidism",
          "Secondary hyperthyroidism",
          "Euthyroid sick syndrome",
        ],
        correct: 1,
        rationale:
          "Elevated TSH (12.4 mIU/L) with low free T4 (0.4 ng/dL) is the hallmark of primary hypothyroidism. Subclinical hypothyroidism would show elevated TSH with normal free T4. Secondary hyperthyroidism is not a recognized classification. Euthyroid sick syndrome typically shows low T3 with normal or low TSH.",
      },
      {
        question:
          "A patient with low pretest probability for pulmonary embolism has a negative D-dimer result. What is the most appropriate next step?",
        options: [
          "Order a CT pulmonary angiography to confirm the result",
          "Initiate empiric anticoagulation while awaiting further testing",
          "Pulmonary embolism is effectively ruled out; pursue alternative diagnoses",
          "Obtain a ventilation-perfusion scan for definitive diagnosis",
        ],
        correct: 2,
        rationale:
          "D-dimer has high sensitivity for venous thromboembolism. In a patient with low pretest probability, a negative D-dimer has a very high negative predictive value, effectively ruling out pulmonary embolism without the need for imaging. This application of Bayesian reasoning avoids unnecessary radiation and contrast exposure.",
      },
      {
        question:
          "A nurse practitioner is interpreting iron studies: serum iron 30 mcg/dL, ferritin 8 ng/mL, TIBC 450 mcg/dL, transferrin saturation 7%. Which type of anemia do these results indicate?",
        options: [
          "Anemia of chronic disease",
          "Iron deficiency anemia",
          "Sideroblastic anemia",
          "Megaloblastic anemia",
        ],
        correct: 1,
        rationale:
          "Low serum iron, low ferritin, elevated TIBC, and low transferrin saturation are the classic laboratory pattern of iron deficiency anemia. Anemia of chronic disease would show low iron with low TIBC and normal or elevated ferritin. Sideroblastic anemia shows elevated iron and ferritin. Megaloblastic anemia involves B12 or folate deficiency with macrocytic cells.",
      },
    ],
  },
};
