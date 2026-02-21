import type { LessonContent } from "./types";

const hemoglobinHematocrit: LessonContent = {
  title: "Hemoglobin & Hematocrit Fundamentals",
  cellular: {
    title: "Oxygen Transport Physiology",
    content: "Hemoglobin is the iron-containing protein in red blood cells responsible for oxygen transport. Each hemoglobin molecule binds up to four oxygen molecules. Hematocrit represents the percentage of blood volume occupied by red blood cells and reflects overall red cell mass relative to plasma. These values are interdependent: hemoglobin measures oxygen-carrying capacity while hematocrit reflects cellular proportion. Both are essential for evaluating anemia, polycythemia, fluid status, and oxygenation adequacy. Decreased hemoglobin/hematocrit indicates anemia (from blood loss, decreased production, or increased destruction), fluid overload (dilutional effect), or chronic disease. Elevated values indicate polycythemia, dehydration (hemoconcentration), or chronic hypoxia compensation. Critical nursing considerations include recognizing that hemoglobin and hematocrit change predictably with fluid shifts: IV fluid administration dilutes values while dehydration concentrates them. Trending values over time is more clinically meaningful than isolated readings. The relationship between hemoglobin and hematocrit approximately follows a 1:3 ratio (e.g., hemoglobin 10 g/dL corresponds to approximately 30% hematocrit)."
  },
  signs: {
    left: [
      "Low H&H: fatigue, pallor, tachycardia, dyspnea on exertion",
      "Trending values over time reveals true trajectory",
      "H&H ratio approximately 1:3 (Hgb 10 ≈ Hct 30%)",
      "Fluid administration dilutes values (hemodilution)",
      "Post-hemorrhage: H&H drops may lag behind actual blood loss"
    ],
    right: [
      "Critically low Hgb (<7 g/dL): tissue hypoxia, cardiac compromise",
      "Elevated Hct (>55%): polycythemia, hyperviscosity, thrombosis risk",
      "Hemoconcentration from dehydration falsely elevates values",
      "Chronic hypoxia causes compensatory polycythemia",
      "Transfusion trigger varies by clinical context (typically Hgb <7-8 g/dL)"
    ]
  },
  medications: [
    { name: "Packed Red Blood Cells (pRBCs)", type: "Blood product", action: "Replaces red cell mass and restores oxygen-carrying capacity in significant anemia", sideEffects: "Transfusion reactions, fluid overload, iron overload (chronic transfusions)", contra: "Consent required; type and cross-match essential", pearl: "Each unit of pRBCs raises hemoglobin by approximately 1 g/dL" },
    { name: "Erythropoietin (EPO)", type: "Hematopoietic growth factor", action: "Stimulates red blood cell production in bone marrow; used in chronic kidney disease anemia", sideEffects: "Hypertension, thrombosis, pure red cell aplasia (rare)", contra: "Uncontrolled hypertension, malignancy", pearl: "Iron supplementation often needed concurrently to support increased RBC production" }
  ],
  pearls: [
    "Hemoglobin measures oxygen-carrying CAPACITY; hematocrit measures red cell PROPORTION",
    "H&H ratio is approximately 1:3 (Hgb 10 = Hct ~30%)",
    "Post-hemorrhage H&H may initially appear normal: values drop as fluid shifts occur",
    "Dehydration falsely elevates H&H (hemoconcentration)",
    "IV fluids dilute H&H (hemodilution): context matters",
    "Each unit of pRBCs raises hemoglobin by approximately 1 g/dL",
    "Trend values over time rather than relying on isolated readings"
  ],
  quiz: [
    { question: "A patient has hemoglobin of 8 g/dL. What is the expected hematocrit?", options: ["8%", "16%", "24%", "32%"], correct: 2, rationale: "The hemoglobin:hematocrit ratio is approximately 1:3. Hemoglobin of 8 g/dL corresponds to approximately 24% hematocrit." },
    { question: "A patient presents after significant hemorrhage. Initial H&H appears normal. What explains this?", options: ["The lab made an error", "H&H values lag behind actual blood loss as fluid shifts have not yet occurred", "The patient is not actually bleeding", "The values are accurate"], correct: 1, rationale: "Immediately after hemorrhage, H&H may appear normal because the remaining blood has normal concentration. As fluid shifts from interstitial space, hemodilution reveals the true deficit." },
    { question: "A dehydrated patient has elevated hematocrit. What is the most likely explanation?", options: ["Polycythemia vera", "Hemoconcentration from reduced plasma volume", "Bone marrow overproduction", "Lab error"], correct: 1, rationale: "Dehydration reduces plasma volume, concentrating the remaining blood and falsely elevating hematocrit. This is hemoconcentration, not true polycythemia." }
  ]
};

const serumLipids: LessonContent = {
  title: "Serum Lipids: Clinical Interpretation",
  cellular: {
    title: "Lipid Metabolism & Cardiovascular Risk",
    content: "Serum lipids are a critical component of cardiovascular risk assessment. The lipid panel includes total cholesterol, LDL cholesterol (the primary atherogenic lipoprotein), HDL cholesterol (protective/reverse cholesterol transport), and triglycerides. LDL carries cholesterol to arterial walls where it can be oxidized, triggering inflammatory cascades, foam cell formation, and atherosclerotic plaque development. HDL facilitates reverse cholesterol transport, removing excess cholesterol from peripheral tissues back to the liver for excretion. Higher HDL levels correlate with lower cardiovascular risk. Triglycerides reflect dietary fat intake and hepatic lipid metabolism: elevated levels increase pancreatitis risk and contribute to atherogenic dyslipidemia. Clinical interpretation requires understanding the ratios and patterns: elevated LDL with low HDL represents highest atherogenic risk. Dyslipidemia is often asymptomatic until atherosclerosis produces clinical events (MI, stroke, peripheral vascular disease). Modifiable risk factors include diet, exercise, smoking, and obesity. Non-modifiable risk factors include age, sex, and family history."
  },
  signs: {
    left: [
      "Dyslipidemia is typically asymptomatic: detected through screening",
      "Elevated LDL = primary atherogenic driver",
      "High HDL = cardiovascular protective factor",
      "Elevated triglycerides = pancreatitis risk if severely elevated",
      "Xanthomas and xanthelasma may indicate severe hyperlipidemia"
    ],
    right: [
      "Atherosclerosis progression: plaque formation, vessel narrowing, rupture risk",
      "Acute coronary syndrome from plaque rupture",
      "Stroke from carotid atherosclerosis or thromboembolism",
      "Peripheral artery disease from lower extremity atherosclerosis",
      "Severe hypertriglyceridemia (>500): acute pancreatitis risk"
    ]
  },
  medications: [
    { name: "Statins (Atorvastatin/Rosuvastatin)", type: "HMG-CoA reductase inhibitor", action: "Inhibits cholesterol synthesis in liver, upregulates LDL receptors, reduces LDL by 30-50%", sideEffects: "Myalgia, rhabdomyolysis (rare), hepatotoxicity, new-onset diabetes", contra: "Active liver disease, pregnancy", pearl: "Monitor liver enzymes and CK if muscle symptoms develop; take in evening (peak hepatic synthesis)" },
    { name: "Fibrates (Fenofibrate)", type: "PPAR-alpha agonist", action: "Primarily reduces triglycerides and modestly increases HDL", sideEffects: "GI upset, myopathy (increased with statins), gallstones", contra: "Severe renal/hepatic disease", pearl: "Primary indication is severe hypertriglyceridemia to prevent pancreatitis" }
  ],
  pearls: [
    "LDL = 'bad' cholesterol (atherogenic); HDL = 'good' cholesterol (protective)",
    "Dyslipidemia is typically silent: screening is essential for early detection",
    "Statins are first-line therapy for elevated LDL and cardiovascular risk reduction",
    "Monitor liver enzymes and report muscle pain on statins (rhabdomyolysis risk)",
    "Severely elevated triglycerides (>500) → acute pancreatitis risk",
    "Lifestyle modifications: diet, exercise, smoking cessation, weight management",
    "Fasting lipid panel is preferred for accurate triglyceride measurement"
  ],
  quiz: [
    { question: "Which lipoprotein is the primary driver of atherosclerotic plaque formation?", options: ["HDL", "LDL", "VLDL", "Chylomicrons"], correct: 1, rationale: "LDL carries cholesterol to arterial walls where oxidation triggers inflammatory cascades and plaque development. LDL is the primary atherogenic lipoprotein." },
    { question: "A patient on statin therapy reports new-onset muscle pain. What is the nursing priority?", options: ["Reassure the patient it is normal", "Report to provider and obtain CK level to evaluate for rhabdomyolysis", "Increase the statin dose", "Discontinue all medications"], correct: 1, rationale: "Myalgia on statins may indicate rhabdomyolysis: a rare but serious complication. CK levels should be checked and the provider notified." }
  ]
};

const coagulationStudies: LessonContent = {
  title: "Coagulation Studies: PT/INR & aPTT",
  cellular: {
    title: "Coagulation Cascade & Monitoring",
    content: "The coagulation cascade involves two converging pathways (intrinsic and extrinsic) that ultimately produce a fibrin clot. Prothrombin Time (PT) measures the extrinsic pathway and is standardized as INR (International Normalized Ratio) for monitoring warfarin therapy. Therapeutic INR target is often 2.0-3.0 for most indications (higher for mechanical heart valves). Activated Partial Thromboplastin Time (aPTT) measures the intrinsic pathway and monitors heparin therapy. Therapeutic aPTT target is often 1.5-2.5 times the control value (approximately 45-75 seconds). Understanding which test monitors which medication is a core exam concept: PT/INR monitors warfarin (vitamin K antagonist affecting factors II, VII, IX, X); aPTT monitors unfractionated heparin (which enhances antithrombin III activity). Elevated PT/INR indicates extrinsic pathway prolongation: increased bleeding risk from warfarin excess, liver disease, DIC, or vitamin K deficiency. Elevated aPTT indicates intrinsic pathway prolongation: increased bleeding risk from heparin excess, hemophilia, or DIC. Both values help identify coagulopathy and guide anticoagulation management."
  },
  signs: {
    left: [
      "PT/INR monitors WARFARIN therapy (extrinsic pathway)",
      "aPTT monitors HEPARIN therapy (intrinsic pathway)",
      "Therapeutic INR: typically 2.0-3.0",
      "Therapeutic aPTT: 1.5-2.5x control (~45-75 seconds)",
      "Regular monitoring required for dose adjustment"
    ],
    right: [
      "Supratherapeutic INR (>3.0): hemorrhage risk: hold warfarin",
      "INR >5.0: serious bleeding risk: may need vitamin K",
      "Elevated aPTT with heparin: reduce or hold infusion",
      "Bleeding signs: petechiae, hematuria, melena, epistaxis, gingival bleeding",
      "DIC causes both PT and aPTT prolongation with consumptive coagulopathy"
    ]
  },
  medications: [
    { name: "Warfarin (Coumadin)", type: "Vitamin K antagonist", action: "Inhibits vitamin K-dependent clotting factor synthesis (II, VII, IX, X); monitored by PT/INR", sideEffects: "Hemorrhage, skin necrosis (rare)", contra: "Active bleeding, pregnancy (teratogenic)", pearl: "Antidote is vitamin K (phytonadione). Many drug and food interactions: consistent vitamin K intake is key" },
    { name: "Unfractionated Heparin (UFH)", type: "Indirect thrombin inhibitor", action: "Enhances antithrombin III activity; monitored by aPTT", sideEffects: "Hemorrhage, HIT (heparin-induced thrombocytopenia), osteoporosis (long-term)", contra: "Active bleeding, HIT history, severe thrombocytopenia", pearl: "Antidote is protamine sulfate. Short half-life: effects resolve quickly when discontinued" },
    { name: "Vitamin K (Phytonadione)", type: "Fat-soluble vitamin / warfarin antidote", action: "Restores vitamin K-dependent clotting factor synthesis; reverses warfarin effect", sideEffects: "Anaphylaxis risk (IV route), warfarin resistance for days after administration", contra: "None absolute when treating life-threatening hemorrhage", pearl: "IV route carries highest anaphylaxis risk: slow infusion required; oral preferred when not emergent" }
  ],
  pearls: [
    "PT/INR = warfarin monitoring; aPTT = heparin monitoring: never confuse these",
    "Warfarin antidote = vitamin K; Heparin antidote = protamine sulfate",
    "Therapeutic INR 2.0-3.0 for most indications",
    "Consistent vitamin K intake is essential for stable warfarin dosing",
    "Assess for bleeding signs: petechiae, bruising, hematuria, melena, gingival bleeding",
    "HIT (heparin-induced thrombocytopenia) requires immediate heparin discontinuation",
    "DIC causes BOTH PT and aPTT prolongation with consumptive coagulopathy"
  ],
  quiz: [
    { question: "Which lab test monitors warfarin therapy?", options: ["aPTT", "PT/INR", "CBC", "BMP"], correct: 1, rationale: "PT/INR measures the extrinsic pathway affected by warfarin. INR standardizes the result for consistent monitoring." },
    { question: "A patient on warfarin has an INR of 5.2 with no active bleeding. What is the priority intervention?", options: ["Continue warfarin as ordered", "Administer vitamin K as ordered and hold warfarin", "Give protamine sulfate", "Increase warfarin dose"], correct: 1, rationale: "INR >5.0 indicates serious bleeding risk. Warfarin should be held and vitamin K administered. Protamine is the heparin antidote, not warfarin." },
    { question: "A patient on heparin develops a platelet count drop from 180,000 to 70,000. What is the concern?", options: ["Normal variation", "Heparin-induced thrombocytopenia (HIT): discontinue heparin immediately", "Iron deficiency", "Lab error"], correct: 1, rationale: "A significant platelet drop on heparin therapy suggests HIT, a dangerous immune-mediated condition causing paradoxical thrombosis. Heparin must be discontinued immediately." }
  ]
};

const malnutritionMarkers: LessonContent = {
  title: "Malnutrition Laboratory Markers",
  cellular: {
    title: "Biochemical Assessment of Nutritional Status",
    content: "Malnutrition is a clinical syndrome that can be assessed through specific laboratory markers reflecting protein status, visceral protein stores, and metabolic function. Albumin is the most commonly cited nutritional marker but has significant limitations: its long half-life (approximately 18-21 days) makes it a poor indicator of acute nutritional changes, and it is affected by inflammation, liver disease, fluid status, and renal losses. Prealbumin (transthyretin) has a shorter half-life (approximately 2-3 days) making it more responsive to acute changes in nutritional status. It is the preferred marker for monitoring short-term nutritional intervention effectiveness. Transferrin reflects iron-binding capacity and protein status with an intermediate half-life. Total lymphocyte count may indicate immune competence affected by malnutrition. Nitrogen balance studies assess protein anabolism versus catabolism. Critical understanding: no single lab value diagnoses malnutrition: clinical assessment including weight trends, intake adequacy, functional status, and physical examination remains essential. Inflammatory states dramatically affect protein markers (acute phase response), making interpretation context-dependent."
  },
  signs: {
    left: [
      "Albumin: long half-life (18-21 days): reflects chronic status, NOT acute changes",
      "Prealbumin: short half-life (2-3 days): preferred for acute monitoring",
      "Transferrin: intermediate marker reflecting iron and protein status",
      "Nitrogen balance: positive = anabolic; negative = catabolic",
      "Weight trends and dietary intake remain essential clinical assessments"
    ],
    right: [
      "Low albumin: edema, poor wound healing, immune compromise",
      "Severely low prealbumin: acute protein-calorie malnutrition",
      "Low lymphocyte count: impaired immune function from malnutrition",
      "Negative nitrogen balance: muscle wasting, delayed healing",
      "Inflammation falsely lowers protein markers (acute phase response)"
    ]
  },
  medications: [
    { name: "Parenteral Nutrition (TPN)", type: "IV nutritional support", action: "Provides complete nutrition (dextrose, amino acids, lipids, vitamins, minerals) intravenously when GI tract is non-functional", sideEffects: "Infection (line sepsis), hyperglycemia, electrolyte imbalances, liver dysfunction, refeeding syndrome", contra: "Functional GI tract (enteral nutrition preferred)", pearl: "Monitor blood glucose closely: TPN commonly distorts glucose and lab values. Central line required." },
    { name: "Enteral Nutrition", type: "GI-administered nutrition", action: "Provides nutrition via feeding tube when oral intake is inadequate but GI tract functions", sideEffects: "Aspiration risk, diarrhea, tube displacement, electrolyte shifts", contra: "GI obstruction, ileus, severe GI bleeding", pearl: "Enteral nutrition is ALWAYS preferred over parenteral when GI tract is functional: preserves gut integrity" }
  ],
  pearls: [
    "Albumin is NOT a good marker for acute nutritional changes: its half-life is 18-21 days",
    "Prealbumin is the preferred marker for monitoring acute nutritional intervention (half-life 2-3 days)",
    "Inflammation dramatically affects protein markers: interpret in clinical context",
    "Enteral nutrition is ALWAYS preferred over parenteral when the GI tract works",
    "Refeeding syndrome risk in severely malnourished patients: monitor phosphate, potassium, magnesium",
    "Nitrogen balance: positive = building tissue; negative = breaking down tissue",
    "No single lab value diagnoses malnutrition: clinical assessment is essential"
  ],
  quiz: [
    { question: "Which laboratory marker best reflects acute changes in nutritional status?", options: ["Albumin", "Prealbumin (transthyretin)", "Total protein", "Hemoglobin"], correct: 1, rationale: "Prealbumin has a short half-life of 2-3 days, making it responsive to acute nutritional changes. Albumin's 18-21 day half-life reflects chronic status only." },
    { question: "A critically ill patient has low albumin. Can this alone confirm malnutrition?", options: ["Yes, albumin is the definitive malnutrition marker", "No: inflammation causes acute phase protein depression that lowers albumin independent of nutritional status", "Yes, if albumin is below 2.0", "No, albumin is unrelated to nutrition"], correct: 1, rationale: "Critical illness triggers an acute phase response that depresses albumin regardless of nutritional status. Clinical assessment including intake, weight trends, and functional status is required." }
  ]
};

const specimenCollection: LessonContent = {
  title: "Laboratory Specimen Collection: Peripheral vs Central",
  cellular: {
    title: "Specimen Integrity & Collection Accuracy",
    content: "Accurate laboratory results depend on proper specimen collection technique. Peripheral venipuncture is the standard method and generally produces the most accurate results. Central line draws are convenient but introduce significant sources of error including contamination from infusing solutions (especially TPN, dextrose, or electrolyte-containing fluids), heparin lock contamination, and dilution effects. Proper central line draw technique requires pausing infusions for an appropriate interval, performing an adequate discard volume to clear the line of residual solution, and drawing below any infusing port when possible. Drawing from an active infusion line without protocol is a critical error that commonly distorts lab values. Hemolysis from improper collection technique falsely elevates potassium (one of the most tested lab artifacts) and LDH while potentially invalidating other results. Clotted specimens from improper mixing or delayed processing produce unreliable results. When lab values appear inconsistent, the systematic approach is: Step 1: evaluate collection method (peripheral vs central, infusing line?), Step 2: evaluate specimen quality (hemolysis, clotting, tube error), Step 3: only then consider true pathology after excluding collection artifacts."
  },
  signs: {
    left: [
      "Peripheral draws produce the most accurate results",
      "Central line draws require adequate discard volume",
      "Pause infusions before drawing from central lines",
      "Never draw from active infusion without protocol",
      "Proper tube selection and mixing technique essential"
    ],
    right: [
      "Hemolysis falsely elevates potassium: most tested lab artifact",
      "TPN infusion commonly distorts glucose, electrolytes, and protein labs",
      "Drawing from infusing line → contaminated, unreliable results",
      "Unexpected lab values → first question collection validity",
      "Improper sampling may cause unnecessary treatment or missed diagnosis"
    ]
  },
  medications: [],
  pearls: [
    "Peripheral draws = most accurate; central line draws require discard protocol",
    "NEVER draw from an active infusion line without following institutional protocol",
    "Hemolysis falsely elevates potassium: the most commonly tested lab artifact",
    "TPN commonly distorts labs: glucose, electrolytes, proteins all affected",
    "Unexpected labs → question sampling validity FIRST before assuming pathology",
    "Improper sampling may lead to unnecessary treatment, missed diagnoses, or medication errors",
    "Central line draws require: pause infusion → discard → then draw specimen"
  ],
  quiz: [
    { question: "Lab results show an unexpectedly high potassium level. The specimen appears pink-tinged. What is the most likely explanation?", options: ["True hyperkalemia", "Hemolysis during specimen collection falsely elevating potassium", "Renal failure", "Medication effect"], correct: 1, rationale: "Pink-tinged serum indicates hemolysis. Hemolysis falsely elevates potassium by releasing intracellular potassium from ruptured red blood cells: the most commonly tested lab artifact." },
    { question: "A nurse draws blood from a central line that has TPN infusing. What is the primary concern?", options: ["Pain at the site", "Specimen contamination from TPN distorting glucose, electrolyte, and protein values", "Air embolism risk", "Catheter dislodgement"], correct: 1, rationale: "TPN contains high concentrations of dextrose, amino acids, and electrolytes. Drawing from an infusing line without proper protocol contaminates the specimen and produces unreliable results." }
  ]
};

export const labFundamentalsLessons: Record<string, LessonContent> = {
  "hemoglobin-hematocrit": hemoglobinHematocrit,
  "serum-lipids": serumLipids,
  "coagulation-studies": coagulationStudies,
  "malnutrition-markers": malnutritionMarkers,
  "specimen-collection": specimenCollection,
};
