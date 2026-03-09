export interface LabValuePracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

export interface LabValuePageData {
  slug: string;
  name: string;
  fullName: string;
  h1Title: string;
  metaDescription: string;
  keywords: string;
  normalRange: {
    value: string;
    unit: string;
    notes?: string;
  };
  overview: string;
  clinicalSignificance: string;
  highCauses: {
    condition: string;
    explanation: string;
  }[];
  lowCauses: {
    condition: string;
    explanation: string;
  }[];
  criticalValues: {
    high?: string;
    low?: string;
    action: string;
  };
  nursingInterventions: {
    forHigh: string[];
    forLow: string[];
  };
  examTips: string[];
  practiceQuestions: LabValuePracticeQuestion[];
  relatedLabSlugs: string[];
  relatedLessonIds: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
}

export const seoLabValues: LabValuePageData[] = [
  {
    slug: "sodium",
    name: "Sodium",
    fullName: "Serum Sodium (Na+)",
    h1Title: "Sodium Lab Values: Normal Range, Clinical Significance & Nursing Guide",
    metaDescription: "Learn sodium (Na+) normal range 135-145 mEq/L, causes of hyponatremia and hypernatremia, nursing interventions, and NCLEX practice questions.",
    keywords: "sodium lab values, hyponatremia, hypernatremia, Na+ normal range, electrolyte imbalance nursing, NCLEX lab values",
    normalRange: {
      value: "135-145",
      unit: "mEq/L",
      notes: "Primary extracellular cation responsible for fluid balance and osmolality"
    },
    overview: "Sodium is the primary extracellular cation and plays a critical role in maintaining fluid balance, osmolality, nerve impulse transmission, and muscle contraction. Serum sodium levels reflect the ratio of sodium to water in the body rather than total body sodium content. Sodium imbalances are among the most common electrolyte disorders encountered in clinical practice and can have serious neurological consequences.",
    clinicalSignificance: "Sodium imbalances directly affect the central nervous system due to osmotic shifts of water across the blood-brain barrier. Hyponatremia causes cerebral edema, while hypernatremia causes cellular dehydration. Rapid correction of either condition can lead to devastating neurological complications including osmotic demyelination syndrome (central pontine myelinolysis) or cerebral edema.",
    highCauses: [
      { condition: "Dehydration", explanation: "Loss of free water exceeding sodium loss concentrates serum sodium" },
      { condition: "Diabetes Insipidus", explanation: "Insufficient ADH or renal resistance to ADH causes massive water loss" },
      { condition: "Excessive sodium intake", explanation: "Hypertonic IV solutions, sodium bicarbonate administration, or excessive dietary sodium" },
      { condition: "Cushing syndrome", explanation: "Excess cortisol promotes sodium retention and water excretion" },
      { condition: "Hyperaldosteronism", explanation: "Excess aldosterone causes sodium reabsorption in the distal tubule" }
    ],
    lowCauses: [
      { condition: "SIADH", explanation: "Excess ADH causes water retention, diluting serum sodium" },
      { condition: "Heart failure", explanation: "Decreased cardiac output triggers ADH release and water retention" },
      { condition: "Diuretic use", explanation: "Thiazide diuretics impair sodium reabsorption in the distal convoluted tubule" },
      { condition: "Vomiting/diarrhea", explanation: "GI losses of sodium-containing fluids deplete total body sodium" },
      { condition: "Water intoxication", explanation: "Excessive free water intake dilutes serum sodium (psychogenic polydipsia)" }
    ],
    criticalValues: {
      high: ">160 mEq/L",
      low: "<120 mEq/L",
      action: "Notify provider immediately. Critical sodium levels require ICU monitoring, frequent neurological assessments, and carefully controlled correction rate (no more than 8-10 mEq/L per 24 hours to prevent osmotic demyelination)."
    },
    nursingInterventions: {
      forHigh: [
        "Administer hypotonic IV fluids (0.45% NaCl) as ordered",
        "Monitor intake and output strictly",
        "Assess neurological status every 2-4 hours (confusion, lethargy, seizures)",
        "Encourage oral free water intake if able to swallow safely",
        "Monitor serum sodium every 4-6 hours during correction",
        "Implement seizure precautions"
      ],
      forLow: [
        "Restrict fluid intake as ordered (typically 1000-1500 mL/day)",
        "Administer hypertonic saline (3% NaCl) via IV pump if severely symptomatic",
        "Monitor serum sodium every 2-4 hours during correction",
        "Assess neurological status frequently (headache, nausea, confusion, seizures)",
        "Weigh patient daily to monitor fluid retention",
        "Implement fall precautions due to confusion risk"
      ]
    },
    examTips: [
      "SIADH = dilutional hyponatremia (low sodium, concentrated urine, fluid restriction is key intervention)",
      "Diabetes Insipidus = hypernatremia (high sodium, dilute urine, replace fluids)",
      "Never correct sodium faster than 8-10 mEq/L in 24 hours to prevent osmotic demyelination",
      "Hyponatremia with seizures = administer 3% hypertonic saline",
      "Thiazide diuretics cause hyponatremia; loop diuretics are less likely to cause sodium imbalance"
    ],
    practiceQuestions: [
      {
        question: "A patient with SIADH has a serum sodium of 125 mEq/L. Which nursing intervention is the highest priority?",
        options: [
          "Administer normal saline at 200 mL/hr",
          "Restrict fluid intake to 1000 mL/day",
          "Encourage increased oral fluid intake",
          "Administer furosemide 40 mg IV"
        ],
        correctIndex: 1,
        rationale: "Fluid restriction is the primary intervention for SIADH-related hyponatremia. SIADH causes water retention that dilutes sodium, so restricting water intake allows sodium concentration to normalize. Administering additional fluids would worsen the dilutional hyponatremia."
      },
      {
        question: "Which assessment finding would the nurse expect in a patient with a serum sodium of 162 mEq/L?",
        options: [
          "Moist mucous membranes and weight gain",
          "Muscle weakness and hyporeflexia",
          "Thirst, dry mucous membranes, and restlessness",
          "Peripheral edema and crackles in lungs"
        ],
        correctIndex: 2,
        rationale: "Hypernatremia causes cellular dehydration as water shifts from cells to the hyperosmolar extracellular space. Clinical manifestations include intense thirst, dry mucous membranes, restlessness, agitation, and eventually seizures and coma if untreated."
      },
      {
        question: "A nurse is correcting severe hyponatremia (Na+ 112 mEq/L). What is the maximum safe correction rate?",
        options: [
          "4-6 mEq/L per hour",
          "8-10 mEq/L per 24 hours",
          "15-20 mEq/L per 24 hours",
          "Correct to normal range within 12 hours"
        ],
        correctIndex: 1,
        rationale: "Sodium correction should not exceed 8-10 mEq/L per 24 hours. Rapid correction of chronic hyponatremia can cause osmotic demyelination syndrome (central pontine myelinolysis), leading to irreversible neurological damage including quadriplegia and locked-in syndrome."
      }
    ],
    relatedLabSlugs: ["potassium", "creatinine"],
    relatedLessonIds: ["siadh-di"],
    faqItems: [
      {
        question: "What is the normal sodium level?",
        answer: "The normal serum sodium level is 135-145 mEq/L. Values below 135 indicate hyponatremia, and values above 145 indicate hypernatremia."
      },
      {
        question: "What are the symptoms of low sodium?",
        answer: "Symptoms of hyponatremia include headache, nausea, confusion, lethargy, muscle cramps, and in severe cases (<120 mEq/L), seizures and coma due to cerebral edema."
      },
      {
        question: "Why is sodium important for nurses to monitor?",
        answer: "Sodium directly affects neurological function, fluid balance, and cardiac rhythm. Imbalances can cause seizures, altered mental status, and cardiac arrest. Nurses must monitor sodium levels, assess neurological status, and ensure safe correction rates."
      }
    ]
  },
  {
    slug: "potassium",
    name: "Potassium",
    fullName: "Serum Potassium (K+)",
    h1Title: "Potassium Lab Values: Normal Range, Clinical Significance & Nursing Guide",
    metaDescription: "Learn potassium (K+) normal range 3.5-5.0 mEq/L, causes of hypokalemia and hyperkalemia, cardiac effects, nursing interventions, and NCLEX practice questions.",
    keywords: "potassium lab values, hypokalemia, hyperkalemia, K+ normal range, cardiac arrhythmia potassium, NCLEX lab values",
    normalRange: {
      value: "3.5-5.0",
      unit: "mEq/L",
      notes: "Primary intracellular cation essential for cardiac and neuromuscular function"
    },
    overview: "Potassium is the primary intracellular cation and is essential for maintaining cellular membrane potential, cardiac conduction, neuromuscular function, and acid-base balance. Only about 2% of total body potassium is found in the extracellular fluid, making serum levels a poor indicator of total body stores. Even small changes in serum potassium can have life-threatening cardiac consequences.",
    clinicalSignificance: "Potassium abnormalities are among the most dangerous electrolyte imbalances because of their direct effect on cardiac conduction. Both hypokalemia and hyperkalemia can cause fatal cardiac arrhythmias. Potassium levels must be maintained within a narrow range, and any value outside 3.5-5.0 mEq/L requires prompt assessment and intervention.",
    highCauses: [
      { condition: "Acute kidney injury/Renal failure", explanation: "Impaired renal excretion is the most common cause of sustained hyperkalemia" },
      { condition: "Acidosis", explanation: "Hydrogen ions move intracellularly in exchange for potassium, raising serum levels" },
      { condition: "Tissue destruction", explanation: "Crush injuries, burns, rhabdomyolysis, and tumor lysis release intracellular potassium" },
      { condition: "ACE inhibitors/ARBs/K-sparing diuretics", explanation: "These medications reduce potassium excretion by the kidneys" },
      { condition: "Excessive supplementation", explanation: "Over-aggressive IV or oral potassium replacement" }
    ],
    lowCauses: [
      { condition: "Loop and thiazide diuretics", explanation: "Increase renal potassium excretion (most common medication-related cause)" },
      { condition: "Vomiting and nasogastric suction", explanation: "Loss of gastric contents and resulting metabolic alkalosis drive potassium intracellularly" },
      { condition: "Diarrhea", explanation: "GI losses contain significant potassium" },
      { condition: "Alkalosis", explanation: "Potassium shifts intracellularly in exchange for hydrogen ions" },
      { condition: "Insulin administration", explanation: "Insulin drives potassium into cells along with glucose" }
    ],
    criticalValues: {
      high: ">6.0 mEq/L",
      low: "<3.0 mEq/L",
      action: "Place patient on continuous cardiac monitoring immediately. For critical hyperkalemia: administer calcium gluconate (cardiac membrane stabilizer), insulin with dextrose, sodium bicarbonate, and kayexalate. For critical hypokalemia: IV potassium replacement via infusion pump (never IV push)."
    },
    nursingInterventions: {
      forHigh: [
        "Place on continuous cardiac monitoring and obtain 12-lead ECG",
        "Administer calcium gluconate IV to stabilize cardiac membrane",
        "Administer regular insulin with D50 to shift potassium intracellularly",
        "Administer sodium polystyrene sulfonate (Kayexalate) to promote GI excretion",
        "Restrict dietary potassium intake",
        "Monitor for ECG changes: peaked T waves, widened QRS, sine wave pattern",
        "Prepare for potential dialysis if refractory"
      ],
      forLow: [
        "Administer IV potassium chloride via infusion pump (never IV push, never faster than 10-20 mEq/hr)",
        "Encourage potassium-rich foods: bananas, oranges, potatoes, spinach",
        "Monitor cardiac rhythm for U waves, flattened T waves, ST depression",
        "Assess for muscle weakness, leg cramps, and decreased bowel sounds",
        "Check magnesium level (hypomagnesemia prevents potassium correction)",
        "Hold potassium-wasting diuretics and notify provider"
      ]
    },
    examTips: [
      "NEVER give potassium IV push - always diluted via infusion pump",
      "Always check renal function (creatinine/BUN) before giving potassium supplements",
      "Hyperkalemia ECG changes: peaked T waves → widened QRS → sine wave → cardiac arrest",
      "Hypokalemia ECG changes: flattened T waves, U waves, ST depression",
      "Digoxin toxicity is potentiated by hypokalemia - always monitor K+ in patients on digoxin",
      "Correct hypomagnesemia first - potassium will not normalize if magnesium is low"
    ],
    practiceQuestions: [
      {
        question: "A patient on furosemide has a potassium level of 2.8 mEq/L. Which ECG change should the nurse anticipate?",
        options: [
          "Peaked T waves",
          "Widened QRS complex",
          "Prominent U waves",
          "ST elevation"
        ],
        correctIndex: 2,
        rationale: "Hypokalemia (K+ <3.5 mEq/L) causes characteristic ECG changes including flattened or inverted T waves, prominent U waves, and ST segment depression. Peaked T waves and widened QRS are signs of hyperkalemia."
      },
      {
        question: "A patient with a potassium level of 6.8 mEq/L is showing peaked T waves on the monitor. What is the priority nursing action?",
        options: [
          "Administer oral kayexalate",
          "Administer IV calcium gluconate",
          "Restrict potassium in the diet",
          "Obtain a repeat potassium level"
        ],
        correctIndex: 1,
        rationale: "With symptomatic hyperkalemia showing ECG changes, the priority is administering IV calcium gluconate to stabilize the cardiac cell membrane and prevent fatal arrhythmias. This does not lower potassium but protects the heart while other treatments take effect."
      },
      {
        question: "Which patient is at greatest risk for hyperkalemia?",
        options: [
          "A patient receiving IV normal saline",
          "A patient with chronic diarrhea",
          "A patient with acute kidney injury on an ACE inhibitor",
          "A patient receiving a loop diuretic"
        ],
        correctIndex: 2,
        rationale: "A patient with acute kidney injury already has impaired potassium excretion. Adding an ACE inhibitor, which further reduces potassium excretion by decreasing aldosterone, creates a high risk for life-threatening hyperkalemia. Loop diuretics and diarrhea cause potassium loss (hypokalemia)."
      }
    ],
    relatedLabSlugs: ["sodium", "creatinine"],
    relatedLessonIds: [],
    faqItems: [
      {
        question: "What is a dangerously high potassium level?",
        answer: "A potassium level above 6.0 mEq/L is considered critical. Levels above 6.5 mEq/L can cause life-threatening cardiac arrhythmias including ventricular fibrillation and cardiac arrest. Immediate treatment is required."
      },
      {
        question: "Why can't potassium be given IV push?",
        answer: "IV push potassium can cause immediate fatal cardiac arrest. Potassium must always be diluted and administered via infusion pump at a controlled rate (typically no faster than 10-20 mEq/hour) with cardiac monitoring."
      },
      {
        question: "What foods are high in potassium?",
        answer: "Potassium-rich foods include bananas, oranges, potatoes, spinach, tomatoes, avocados, dried fruits, beans, and dairy products. Patients with hyperkalemia should limit these foods."
      }
    ]
  },
  {
    slug: "troponin",
    name: "Troponin",
    fullName: "Cardiac Troponin (cTnI / cTnT)",
    h1Title: "Troponin Lab Values: Normal Range, Clinical Significance & Nursing Guide",
    metaDescription: "Learn troponin normal range, causes of elevated troponin, myocardial infarction diagnosis, nursing interventions, and NCLEX practice questions.",
    keywords: "troponin lab values, cardiac troponin, myocardial infarction diagnosis, troponin normal range, cardiac biomarkers nursing, NCLEX lab values",
    normalRange: {
      value: "<0.04",
      unit: "ng/mL",
      notes: "High-sensitivity troponin (hs-cTn) has lower thresholds; any detectable elevation may be significant"
    },
    overview: "Troponin is a regulatory protein complex found in cardiac and skeletal muscle that controls muscle contraction. Cardiac-specific troponin I (cTnI) and troponin T (cTnT) are released into the bloodstream when myocardial cells are damaged or die. Troponin is the gold standard biomarker for diagnosing acute myocardial infarction and is the most sensitive and specific marker of myocardial injury available.",
    clinicalSignificance: "Elevated troponin indicates myocardial cell injury or death. Troponin begins to rise 3-6 hours after myocardial injury, peaks at 12-24 hours, and can remain elevated for 7-14 days. Serial troponin measurements (at 0, 3, and 6 hours) are used to diagnose or rule out acute myocardial infarction. A rising pattern of troponin levels is more diagnostic than a single elevated value.",
    highCauses: [
      { condition: "Acute myocardial infarction", explanation: "Coronary artery occlusion causes ischemic necrosis of myocardial tissue, releasing troponin" },
      { condition: "Myocarditis", explanation: "Inflammation of the myocardium from viral, autoimmune, or toxic causes damages cardiac cells" },
      { condition: "Pulmonary embolism", explanation: "Right ventricular strain from massive PE can cause myocardial injury" },
      { condition: "Heart failure exacerbation", explanation: "Acute decompensation causes myocardial stretch and micro-injury" },
      { condition: "Sepsis", explanation: "Sepsis-induced myocardial depression and demand ischemia elevate troponin" },
      { condition: "Renal failure", explanation: "Impaired clearance and chronic myocardial stress elevate baseline troponin" }
    ],
    lowCauses: [
      { condition: "Normal finding", explanation: "Troponin is normally undetectable or present at very low levels in healthy individuals" }
    ],
    criticalValues: {
      high: ">0.4 ng/mL (or rising trend on serial measurements)",
      action: "Notify provider immediately. Initiate acute coronary syndrome protocol: continuous cardiac monitoring, 12-lead ECG, IV access, oxygen if SpO2 <94%, aspirin administration, and preparation for cardiac catheterization."
    },
    nursingInterventions: {
      forHigh: [
        "Initiate continuous cardiac monitoring and obtain serial 12-lead ECGs",
        "Establish IV access and ensure patency",
        "Administer aspirin 325 mg chewable if not contraindicated and not already given",
        "Assess and document chest pain characteristics using PQRST",
        "Administer nitroglycerin and morphine as ordered for pain management",
        "Draw serial troponin levels at 0, 3, and 6 hours as ordered",
        "Maintain bedrest and minimize oxygen demand",
        "Prepare for potential cardiac catheterization and PCI",
        "Monitor vital signs every 15 minutes during acute phase"
      ],
      forLow: [
        "Document normal findings - no specific intervention required for normal troponin levels"
      ]
    },
    examTips: [
      "Troponin is the MOST specific and sensitive marker for myocardial injury - it is the gold standard",
      "Troponin rises 3-6 hours after MI, peaks at 12-24 hours, stays elevated 7-14 days",
      "A RISING pattern on serial troponins confirms acute MI (draw at 0, 3, 6 hours)",
      "CK-MB rises faster (4-6 hrs) but is less specific than troponin",
      "Troponin can be elevated in conditions OTHER than MI (PE, sepsis, renal failure, myocarditis)",
      "STEMI diagnosis requires ECG changes + troponin elevation + clinical presentation"
    ],
    practiceQuestions: [
      {
        question: "A patient presents to the ED with chest pain. The initial troponin is 0.02 ng/mL. What should the nurse anticipate?",
        options: [
          "The patient is not having a myocardial infarction; discharge is appropriate",
          "Serial troponin levels will be drawn at 3 and 6 hours",
          "Immediate cardiac catheterization is needed",
          "A CK-MB level replaces the need for repeat troponin"
        ],
        correctIndex: 1,
        rationale: "A single normal troponin does not rule out MI, as troponin may not rise until 3-6 hours after onset. Serial troponin measurements at 0, 3, and 6 hours are required. A rising pattern confirms myocardial injury. Early discharge based on a single normal troponin is unsafe."
      },
      {
        question: "Which statement about troponin is correct?",
        options: [
          "Troponin levels return to normal within 24 hours after MI",
          "Troponin is specific only to myocardial infarction",
          "Troponin can remain elevated for 7-14 days after myocardial injury",
          "Troponin is less sensitive than CK-MB for detecting MI"
        ],
        correctIndex: 2,
        rationale: "Troponin levels can remain elevated for 7-14 days after myocardial injury, making it useful for detecting recent MI but less helpful for detecting reinfarction within that window. Troponin is the most sensitive cardiac biomarker and can be elevated in conditions other than MI."
      },
      {
        question: "A nurse is caring for a patient with a troponin of 2.5 ng/mL and ST elevation in leads II, III, and aVF. What is the priority action?",
        options: [
          "Administer a stool softener",
          "Prepare for emergent cardiac catheterization",
          "Schedule an echocardiogram for tomorrow",
          "Obtain a chest X-ray"
        ],
        correctIndex: 1,
        rationale: "ST elevation in leads II, III, and aVF with elevated troponin indicates an acute inferior STEMI. The priority is emergent cardiac catheterization and percutaneous coronary intervention (PCI) to restore blood flow. Door-to-balloon time should be less than 90 minutes."
      }
    ],
    relatedLabSlugs: ["inr", "potassium"],
    relatedLessonIds: ["mi-acute", "mi-management"],
    faqItems: [
      {
        question: "What does an elevated troponin mean?",
        answer: "An elevated troponin indicates myocardial (heart muscle) cell injury or death. While it is most commonly associated with myocardial infarction (heart attack), troponin can also be elevated in myocarditis, pulmonary embolism, heart failure, sepsis, and renal failure."
      },
      {
        question: "How long does troponin stay elevated after a heart attack?",
        answer: "Troponin begins rising 3-6 hours after myocardial injury, peaks at 12-24 hours, and can remain elevated for 7-14 days. This extended elevation makes troponin useful for late presentation but less helpful for detecting reinfarction."
      },
      {
        question: "What is the difference between troponin I and troponin T?",
        answer: "Both troponin I (cTnI) and troponin T (cTnT) are cardiac-specific isoforms used to detect myocardial injury. They have similar diagnostic accuracy. The main difference is that troponin T may be mildly elevated in skeletal muscle disease and chronic kidney disease, while troponin I is more cardiac-specific."
      }
    ]
  },
  {
    slug: "creatinine",
    name: "Creatinine",
    fullName: "Serum Creatinine (SCr)",
    h1Title: "Creatinine Lab Values: Normal Range, Clinical Significance & Nursing Guide",
    metaDescription: "Learn creatinine normal range 0.6-1.2 mg/dL, causes of elevated creatinine, kidney function assessment, nursing interventions, and NCLEX practice questions.",
    keywords: "creatinine lab values, serum creatinine normal range, kidney function test, acute kidney injury, renal failure nursing, NCLEX lab values",
    normalRange: {
      value: "0.6-1.2",
      unit: "mg/dL",
      notes: "May vary by age, sex, and muscle mass. More reliable indicator of kidney function than BUN"
    },
    overview: "Creatinine is a waste product of creatine phosphate metabolism in skeletal muscle. It is produced at a relatively constant rate and is freely filtered by the glomeruli without significant tubular reabsorption or secretion. This makes serum creatinine the most reliable endogenous marker of glomerular filtration rate (GFR) and kidney function. Creatinine levels are used alongside GFR to diagnose, stage, and monitor chronic kidney disease.",
    clinicalSignificance: "Serum creatinine is the cornerstone of kidney function assessment. Because creatinine production is relatively constant, rising serum levels directly reflect declining kidney function. However, creatinine is a lagging indicator - by the time serum creatinine rises above normal, approximately 50% of kidney function has already been lost. The BUN-to-creatinine ratio helps differentiate prerenal, intrarenal, and postrenal causes of kidney injury.",
    highCauses: [
      { condition: "Acute kidney injury", explanation: "Sudden decline in GFR reduces creatinine clearance, causing rapid serum elevation" },
      { condition: "Chronic kidney disease", explanation: "Progressive nephron loss reduces filtration capacity over months to years" },
      { condition: "Dehydration", explanation: "Reduced renal perfusion decreases GFR and creatinine clearance" },
      { condition: "Rhabdomyolysis", explanation: "Massive skeletal muscle breakdown releases creatine, increasing creatinine production" },
      { condition: "Nephrotoxic medications", explanation: "NSAIDs, aminoglycosides, contrast dye, and ACE inhibitors can impair renal function" },
      { condition: "Urinary obstruction", explanation: "Postrenal obstruction (kidney stones, BPH) impairs filtration" }
    ],
    lowCauses: [
      { condition: "Decreased muscle mass", explanation: "Elderly, cachectic, or bedridden patients produce less creatinine" },
      { condition: "Pregnancy", explanation: "Increased GFR during pregnancy enhances creatinine clearance" },
      { condition: "Liver disease", explanation: "Reduced creatine synthesis in severe liver failure lowers creatinine production" }
    ],
    criticalValues: {
      high: ">4.0 mg/dL (or acute rise >0.3 mg/dL from baseline)",
      action: "Notify provider immediately. Assess urine output, review nephrotoxic medications for discontinuation, ensure adequate hydration, and prepare for potential dialysis. An acute rise of 0.3 mg/dL or 50% increase within 48 hours meets KDIGO criteria for acute kidney injury."
    },
    nursingInterventions: {
      forHigh: [
        "Monitor urine output strictly (report <0.5 mL/kg/hr for 6 hours)",
        "Review and hold nephrotoxic medications (NSAIDs, aminoglycosides, contrast dye)",
        "Maintain adequate hydration to support renal perfusion",
        "Assess for fluid overload signs: edema, crackles, jugular venous distension",
        "Monitor potassium levels closely (hyperkalemia accompanies renal failure)",
        "Weigh patient daily to track fluid balance",
        "Monitor BUN-to-creatinine ratio to differentiate prerenal vs intrarenal causes",
        "Educate patient on avoiding nephrotoxic substances including OTC NSAIDs"
      ],
      forLow: [
        "Assess nutritional status and muscle mass",
        "Consider that low creatinine may mask impaired kidney function in cachectic patients",
        "Use cystatin C or 24-hour creatinine clearance for more accurate GFR estimation in low-muscle-mass patients"
      ]
    },
    examTips: [
      "BUN:Creatinine ratio >20:1 suggests PRERENAL cause (dehydration, heart failure, shock)",
      "BUN:Creatinine ratio 10-20:1 is normal or suggests INTRARENAL cause",
      "Always check creatinine BEFORE administering contrast dye or nephrotoxic medications",
      "Creatinine is a LAGGING indicator - 50% of kidney function is lost before it rises",
      "Acute rise of 0.3 mg/dL within 48 hours = Acute Kidney Injury (KDIGO criteria)",
      "Elderly patients may have 'normal' creatinine despite significant kidney disease due to low muscle mass"
    ],
    practiceQuestions: [
      {
        question: "A patient's serum creatinine rises from 1.0 to 1.8 mg/dL over 24 hours. The BUN is 42 mg/dL. The nurse calculates a BUN:creatinine ratio of approximately 23:1. What does this suggest?",
        options: [
          "Intrarenal kidney injury from nephrotoxic medication",
          "Prerenal azotemia, likely from dehydration or decreased perfusion",
          "Postrenal obstruction from kidney stones",
          "Normal kidney function with expected variation"
        ],
        correctIndex: 1,
        rationale: "A BUN:creatinine ratio greater than 20:1 indicates prerenal azotemia, where reduced renal perfusion (from dehydration, heart failure, or shock) causes the kidneys to reabsorb more BUN but not creatinine. The rapid creatinine rise also meets AKI criteria."
      },
      {
        question: "A nurse is preparing a patient for a CT scan with IV contrast. The patient's creatinine is 2.4 mg/dL. What is the priority nursing action?",
        options: [
          "Proceed with the scan as ordered",
          "Administer acetaminophen for potential allergic reaction",
          "Notify the provider of the elevated creatinine before the procedure",
          "Increase the contrast dose for better imaging"
        ],
        correctIndex: 2,
        rationale: "IV contrast is nephrotoxic and can cause contrast-induced nephropathy, especially in patients with pre-existing renal impairment (elevated creatinine). The nurse must notify the provider so the risk-benefit can be assessed and renal-protective measures (hydration, reduced contrast volume, or alternative imaging) can be implemented."
      },
      {
        question: "Which medication should a nurse question giving to a patient with a creatinine of 3.2 mg/dL?",
        options: [
          "Acetaminophen 650 mg PO",
          "Metformin 500 mg PO",
          "Ondansetron 4 mg IV",
          "Famotidine 20 mg PO"
        ],
        correctIndex: 1,
        rationale: "Metformin is contraindicated in patients with significant renal impairment (creatinine >1.5 in males, >1.4 in females, or eGFR <30) due to the risk of lactic acidosis. Impaired kidneys cannot adequately clear metformin, allowing it to accumulate to toxic levels."
      }
    ],
    relatedLabSlugs: ["potassium", "sodium"],
    relatedLessonIds: ["aki-management-np"],
    faqItems: [
      {
        question: "What does a high creatinine level indicate?",
        answer: "A high creatinine level indicates that the kidneys are not filtering waste products effectively. It can be caused by acute kidney injury, chronic kidney disease, dehydration, medications, or conditions that damage the kidneys."
      },
      {
        question: "What is the BUN-to-creatinine ratio?",
        answer: "The BUN:creatinine ratio helps determine the cause of kidney dysfunction. A ratio greater than 20:1 suggests prerenal causes (dehydration, heart failure), while a ratio of 10-20:1 suggests intrarenal damage. Normal ratio is approximately 10-20:1."
      },
      {
        question: "Can creatinine levels be normal despite kidney disease?",
        answer: "Yes. In patients with low muscle mass (elderly, cachectic, or bedridden patients), creatinine production is decreased, which can mask impaired kidney function. In these cases, cystatin C or calculated GFR provides more accurate assessment."
      }
    ]
  },
  {
    slug: "inr",
    name: "INR",
    fullName: "International Normalized Ratio (INR)",
    h1Title: "INR Lab Values: Normal Range, Therapeutic Range & Nursing Guide",
    metaDescription: "Learn INR normal range 0.8-1.2, therapeutic range 2.0-3.0 for warfarin, causes of elevated and low INR, nursing interventions, and NCLEX practice questions.",
    keywords: "INR lab values, international normalized ratio, warfarin monitoring, anticoagulation nursing, bleeding risk INR, NCLEX lab values",
    normalRange: {
      value: "0.8-1.2",
      unit: "(ratio)",
      notes: "Therapeutic range for warfarin therapy is typically 2.0-3.0; higher range (2.5-3.5) for mechanical heart valves"
    },
    overview: "The International Normalized Ratio (INR) is a standardized measurement of the extrinsic coagulation pathway derived from the prothrombin time (PT). It was developed to provide consistency across laboratories regardless of the thromboplastin reagent used. INR is the primary test used to monitor warfarin (Coumadin) anticoagulation therapy. A higher INR indicates blood takes longer to clot, while a lower INR indicates faster clotting.",
    clinicalSignificance: "INR monitoring is essential for safe warfarin therapy. Warfarin has a narrow therapeutic index, meaning small dose changes can produce large effects on coagulation. An INR below the therapeutic range increases the risk of thromboembolic events (stroke, DVT, PE), while an INR above the therapeutic range increases bleeding risk. Regular INR monitoring and dose adjustments are required throughout warfarin therapy.",
    highCauses: [
      { condition: "Warfarin overdose or dose adjustment", explanation: "Excessive warfarin inhibits vitamin K-dependent clotting factor synthesis" },
      { condition: "Liver disease", explanation: "Impaired hepatic synthesis of clotting factors prolongs coagulation" },
      { condition: "Vitamin K deficiency", explanation: "Inadequate vitamin K reduces production of factors II, VII, IX, and X" },
      { condition: "Drug interactions", explanation: "Many drugs increase warfarin effect: antibiotics, NSAIDs, acetaminophen (high dose), amiodarone" },
      { condition: "Dietary changes", explanation: "Decreased vitamin K intake (reduced green leafy vegetables) potentiates warfarin" },
      { condition: "DIC", explanation: "Disseminated intravascular coagulation consumes clotting factors" }
    ],
    lowCauses: [
      { condition: "Warfarin non-adherence", explanation: "Missing doses allows clotting factors to normalize" },
      { condition: "Increased vitamin K intake", explanation: "High intake of green leafy vegetables antagonizes warfarin effect" },
      { condition: "Drug interactions", explanation: "Rifampin, carbamazepine, and St. John's Wort increase warfarin metabolism" },
      { condition: "Subtherapeutic dosing", explanation: "Insufficient warfarin dose to achieve target INR" }
    ],
    criticalValues: {
      high: ">5.0 (or any INR with active bleeding)",
      low: "<1.5 in patients requiring anticoagulation",
      action: "For INR >5.0 without bleeding: hold warfarin, consider oral vitamin K. For INR >9.0 or any INR with active bleeding: administer IV vitamin K, consider fresh frozen plasma or prothrombin complex concentrate. For subtherapeutic INR in high-risk patient: consider bridging with heparin."
    },
    nursingInterventions: {
      forHigh: [
        "Hold warfarin and notify provider immediately",
        "Assess for signs of bleeding: bruising, petechiae, hematuria, melena, hemoptysis, gum bleeding",
        "Assess neurological status for signs of intracranial hemorrhage (headache, altered LOC, unequal pupils)",
        "Administer vitamin K (phytonadione) as ordered - oral for non-emergent, IV for life-threatening bleeding",
        "Apply prolonged pressure to any venipuncture or injection sites",
        "Implement bleeding precautions: soft toothbrush, electric razor, avoid IM injections",
        "Avoid antiplatelet medications (aspirin, NSAIDs) unless specifically ordered",
        "Have fresh frozen plasma available for severe hemorrhage"
      ],
      forLow: [
        "Notify provider for dose adjustment",
        "Assess for signs of thromboembolism: unilateral leg swelling, chest pain, dyspnea, neurological changes",
        "Educate patient on medication adherence",
        "Review dietary intake for excessive vitamin K (consistent intake is key, not avoidance)",
        "Review all medications including OTC and herbal supplements for interactions",
        "Consider heparin bridge therapy for high-risk patients while adjusting warfarin"
      ]
    },
    examTips: [
      "Normal INR: 0.8-1.2; Therapeutic on warfarin: 2.0-3.0; Mechanical valve: 2.5-3.5",
      "INR monitors WARFARIN (extrinsic pathway); aPTT monitors HEPARIN (intrinsic pathway)",
      "Warfarin antidote = Vitamin K (phytonadione); Heparin antidote = Protamine sulfate",
      "Teach patients to maintain CONSISTENT vitamin K intake (not eliminate it)",
      "Green leafy vegetables (kale, spinach, broccoli) are high in vitamin K and can decrease INR",
      "Warfarin is teratogenic - contraindicated in pregnancy (use heparin instead)",
      "Multiple drug interactions: antibiotics, amiodarone, NSAIDs increase INR; rifampin decreases INR"
    ],
    practiceQuestions: [
      {
        question: "A patient on warfarin has an INR of 7.2 and no signs of active bleeding. What is the priority nursing action?",
        options: [
          "Continue warfarin at the current dose",
          "Administer protamine sulfate IV",
          "Hold warfarin and administer oral vitamin K as ordered",
          "Administer fresh frozen plasma immediately"
        ],
        correctIndex: 2,
        rationale: "For a supratherapeutic INR >5.0 without active bleeding, the standard approach is to hold warfarin and administer oral vitamin K. Protamine sulfate is the antidote for heparin, not warfarin. FFP is reserved for life-threatening hemorrhage. Continuing warfarin would further increase bleeding risk."
      },
      {
        question: "A nurse is educating a patient newly started on warfarin. Which statement by the patient indicates understanding?",
        options: [
          "I need to eliminate all green vegetables from my diet",
          "I should keep my intake of vitamin K-rich foods consistent from week to week",
          "I can take ibuprofen for headaches while on this medication",
          "I only need to have my blood tested once when I start the medication"
        ],
        correctIndex: 1,
        rationale: "Patients on warfarin should maintain CONSISTENT vitamin K intake rather than eliminating it. Sudden increases or decreases in vitamin K intake will cause INR fluctuations. Ibuprofen (NSAID) increases bleeding risk. Regular INR monitoring is required throughout therapy."
      },
      {
        question: "A patient on warfarin for atrial fibrillation has an INR of 1.4. What is the nursing concern?",
        options: [
          "The patient is at increased risk for bleeding",
          "The patient is at increased risk for stroke",
          "The INR is within the normal therapeutic range",
          "Warfarin should be discontinued immediately"
        ],
        correctIndex: 1,
        rationale: "The therapeutic INR range for atrial fibrillation is 2.0-3.0. An INR of 1.4 is subtherapeutic, meaning the patient is not adequately anticoagulated and is at increased risk for thromboembolic events, particularly stroke. The provider should be notified for dose adjustment."
      }
    ],
    relatedLabSlugs: ["troponin", "creatinine"],
    relatedLessonIds: [],
    faqItems: [
      {
        question: "What is the difference between PT and INR?",
        answer: "PT (prothrombin time) measures the time it takes for blood to clot via the extrinsic pathway. INR standardizes the PT result using an international sensitivity index, making results comparable across laboratories. INR is preferred for monitoring warfarin therapy."
      },
      {
        question: "What INR level is dangerous?",
        answer: "An INR above 5.0 significantly increases bleeding risk and requires intervention. An INR above 9.0 is a medical emergency. However, any INR with active bleeding is dangerous regardless of the number. Subtherapeutic INR (<2.0 on warfarin) increases clotting risk."
      },
      {
        question: "How often should INR be checked on warfarin?",
        answer: "INR should be checked frequently when starting warfarin (every 1-3 days) until stable, then weekly for 1-2 weeks, and eventually monthly once the dose is stable and consistent INR values are achieved. Any medication, dietary, or health changes require more frequent monitoring."
      }
    ]
  }
];

export function getLabValueBySlug(slug: string): LabValuePageData | undefined {
  return seoLabValues.find(lab => lab.slug === slug);
}

export function getAllLabValueSlugs(): string[] {
  return seoLabValues.map(lab => lab.slug);
}
