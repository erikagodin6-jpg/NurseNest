import type { LessonContent } from "./types";

export const clinicalConditionsBatchCLessons: Record<string, LessonContent> = {
  "dka-management-rpn": {
    title: "Diabetic Ketoacidosis: RPN Monitoring",
    cellular: {
      title: "Pathophysiology of DKA",
      content: "Diabetic ketoacidosis (DKA) occurs when absolute or relative insulin deficiency prevents glucose from entering cells, triggering lipolysis and hepatic ketogenesis. Free fatty acids are converted to ketone bodies (beta-hydroxybutyrate, acetoacetate, acetone), causing metabolic acidosis. Hyperglycemia causes osmotic diuresis, leading to severe dehydration and electrolyte losses. The RPN monitors vital signs, fluid intake/output, blood glucose levels, and reports changes to the RN or provider."
    },
    riskFactors: [
      "Type 1 diabetes mellitus (most common)",
      "Infection or illness (leading precipitant)",
      "Non-adherence with insulin therapy",
      "New-onset diabetes (DKA as initial presentation)",
      "Medication changes (corticosteroids, SGLT2 inhibitors)",
      "Emotional or physical stress",
      "Alcohol or substance use",
      "Pump malfunction in insulin pump users"
    ],
    diagnostics: [
      "Monitor blood glucose levels every 1-2 hours as ordered",
      "Report blood glucose >250 mg/dL or <70 mg/dL",
      "Monitor strict intake and output and report urine output <30 mL/hr",
      "Report vital sign changes including tachycardia or hypotension",
      "Monitor level of consciousness and report changes",
      "Report fruity breath odor or Kussmaul respirations",
      "Monitor IV fluid infusion rate as ordered"
    ],
    management: [
      "Administer IV fluids as ordered (normal saline typically first)",
      "Administer insulin infusion as ordered by RN supervision",
      "Maintain NPO or clear liquid diet as ordered",
      "Ensure continuous cardiac monitoring is maintained",
      "Monitor and report electrolyte results as communicated",
      "Maintain strict bed rest during acute phase as ordered"
    ],
    nursingActions: [
      "Monitor blood glucose hourly as directed and record results",
      "Report blood glucose values outside ordered parameters immediately",
      "Assess and report signs of hypokalemia: muscle weakness, cardiac rhythm changes",
      "Monitor IV site for patency and infiltration",
      "Measure and document strict I&O every hour",
      "Report changes in mental status or new confusion",
      "Assess skin turgor and mucous membranes for dehydration",
      "Report Kussmaul respirations (deep, rapid breathing) to the RN"
    ],
    signs: {
      left: [
        "Polyuria and polydipsia",
        "Blood glucose >250 mg/dL",
        "Nausea and vomiting",
        "Abdominal pain"
      ],
      right: [
        "Kussmaul respirations (deep, rapid)",
        "Fruity acetone breath",
        "Altered mental status",
        "Signs of dehydration (poor turgor, dry mucosa)"
      ]
    },
    medications: [
      { name: "Regular Insulin (IV)", type: "Rapid-acting insulin", action: "Facilitates cellular glucose uptake and halts ketogenesis", sideEffects: "Hypoglycemia, hypokalemia", contra: "Potassium <3.3 mEq/L (must correct K+ first)", pearl: "Only regular insulin is given IV. Monitor glucose hourly and report values outside parameters as ordered." },
      { name: "Normal Saline (0.9% NaCl)", type: "Isotonic crystalloid", action: "Restores intravascular volume and corrects dehydration", sideEffects: "Fluid overload, hyperchloremic acidosis", contra: "Severe heart failure (use cautiously)", pearl: "Initial bolus of 1-2 L is typical. Monitor for crackles and JVD indicating fluid overload." },
      { name: "Potassium Chloride", type: "Electrolyte replacement", action: "Replaces potassium lost through osmotic diuresis and shifted intracellularly by insulin", sideEffects: "Hyperkalemia, cardiac arrhythmias", contra: "K+ >5.0 mEq/L, anuria", pearl: "Potassium must be replaced BEFORE insulin if K+ <3.3. Insulin drives K+ into cells, worsening hypokalemia." }
    ],
    pearls: [
      "Never start insulin until potassium is confirmed to be ≥3.3 mEq/L",
      "Kussmaul respirations are the body's attempt to blow off CO2 and compensate for metabolic acidosis",
      "Fruity breath odor indicates the presence of acetone from ketone production",
      "Report any change in level of consciousness immediately as it may indicate cerebral edema",
      "DKA can be the first presentation of undiagnosed type 1 diabetes"
    ],
    quiz: [
      { question: "Which sign should the RPN report immediately in a patient being treated for DKA?", options: ["Blood glucose of 180 mg/dL", "New-onset confusion and lethargy", "Mild thirst", "Urine output of 50 mL/hr"], correct: 1, rationale: "New-onset confusion or lethargy may indicate worsening acidosis or cerebral edema, both life-threatening complications requiring immediate reporting." },
      { question: "Why is potassium monitored closely during DKA treatment?", options: ["Insulin causes potassium to shift into cells, risking hypokalemia", "DKA causes permanent potassium elevation", "Potassium is unaffected by insulin therapy", "Potassium levels only matter post-recovery"], correct: 0, rationale: "Insulin drives potassium into cells. Even if serum K+ appears normal or high initially, total body potassium is depleted. Insulin administration can cause dangerous hypokalemia." },
      { question: "What type of breathing pattern is characteristic of DKA?", options: ["Cheyne-Stokes respirations", "Biot's respirations", "Kussmaul respirations", "Apneustic breathing"], correct: 2, rationale: "Kussmaul respirations (deep, rapid breathing) are the body's compensatory mechanism to blow off CO2 and counteract metabolic acidosis in DKA." }
    ]
  },

  "dka-management-rn": {
    title: "Diabetic Ketoacidosis: RN Clinical Management",
    cellular: {
      title: "Pathophysiology and Metabolic Cascade",
      content: "DKA results from absolute or relative insulin deficiency causing unopposed counter-regulatory hormone activity (glucagon, catecholamines, cortisol, growth hormone). Without insulin, glucose cannot enter cells, leading to hyperglycemia (typically >250 mg/dL). The body shifts to lipolysis for energy, producing free fatty acids that undergo hepatic beta-oxidation into ketone bodies. Accumulating ketones cause high anion gap metabolic acidosis (pH <7.30, HCO3 <18). Hyperglycemia drives osmotic diuresis, causing profound dehydration (average 5-7 L deficit), electrolyte depletion (Na+, K+, Mg2+, PO4), and if untreated, cardiovascular collapse. The RN manages insulin infusion protocols, aggressive fluid resuscitation, electrolyte replacement, continuous monitoring, and identification of precipitating factors."
    },
    riskFactors: [
      "Type 1 diabetes mellitus",
      "Infection (UTI, pneumonia — most common precipitant)",
      "Insulin non-adherence or pump failure",
      "New-onset type 1 diabetes",
      "Acute illness (MI, stroke, pancreatitis)",
      "Corticosteroid or atypical antipsychotic use",
      "SGLT2 inhibitor use (euglycemic DKA)",
      "Pregnancy in type 1 diabetes"
    ],
    diagnostics: [
      "Interpret ABGs: pH <7.30, HCO3 <18, PaCO2 decreased (respiratory compensation)",
      "Monitor serum glucose hourly; target decrease of 50-70 mg/dL per hour",
      "Calculate anion gap: Na - (Cl + HCO3); elevated >12 confirms high anion gap acidosis",
      "Monitor serum potassium before and during insulin infusion",
      "Assess serum beta-hydroxybutyrate (more accurate than urine ketones)",
      "Monitor BUN/creatinine for prerenal azotemia from dehydration",
      "Obtain serial BMP every 2-4 hours during treatment"
    ],
    management: [
      "Initiate aggressive IV fluid resuscitation: 0.9% NS 1-2 L in first hour",
      "Switch to 0.45% NS once corrected Na+ is normal; add D5 when glucose reaches 200-250 mg/dL",
      "Start continuous insulin infusion at 0.1-0.14 units/kg/hr after K+ confirmed ≥3.3",
      "Replace potassium: add 20-40 mEq/L KCl to IV fluids targeting K+ 4-5 mEq/L",
      "Transition to subcutaneous insulin with overlap (continue drip 1-2 hours after first SQ dose)",
      "Identify and treat precipitating cause (infection workup, medication review)",
      "Implement insulin drip protocol with hourly glucose monitoring",
      "Monitor for resolution: anion gap closure, pH >7.30, HCO3 >18, glucose <200"
    ],
    nursingActions: [
      "Perform neurological checks every 1-2 hours (GCS, pupil reactivity)",
      "Monitor cardiac rhythm continuously for dysrhythmias related to K+ changes",
      "Maintain two large-bore IV lines for simultaneous fluid and insulin administration",
      "Calculate and trend anion gap with each BMP result",
      "Assess for signs of cerebral edema: headache, vomiting, altered consciousness, papilledema",
      "Titrate insulin infusion per protocol based on hourly glucose values",
      "Coordinate transition from IV to subcutaneous insulin with provider",
      "Educate patient on sick-day management and DKA prevention before discharge"
    ],
    signs: {
      left: [
        "Blood glucose >250 mg/dL",
        "Polyuria, polydipsia, polyphagia",
        "Nausea, vomiting, abdominal pain",
        "Weight loss",
        "Warm, dry, flushed skin",
        "Tachycardia",
        "Weakness and fatigue"
      ],
      right: [
        "Kussmaul respirations",
        "Fruity acetone breath odor",
        "Altered mental status progressing to coma",
        "Hypotension and poor skin turgor",
        "Decreased deep tendon reflexes",
        "Hypothermia (vasodilation)",
        "Ileus and abdominal distension"
      ]
    },
    medications: [
      { name: "Regular Insulin IV Infusion", type: "Rapid-acting insulin", action: "Suppresses hepatic glucose production, promotes cellular glucose uptake, and halts lipolysis/ketogenesis", sideEffects: "Hypoglycemia, hypokalemia, cerebral edema (if corrected too rapidly)", contra: "Serum K+ <3.3 mEq/L (correct K+ first)", pearl: "Target glucose reduction of 50-70 mg/dL/hr. If glucose drops too fast, reduce rate rather than stopping; add dextrose to maintain insulin infusion and clear ketones." },
      { name: "Sodium Bicarbonate", type: "Buffer", action: "Directly raises serum pH by providing bicarbonate ions", sideEffects: "Metabolic alkalosis, hypokalemia, paradoxical CNS acidosis", contra: "pH >6.9 (not recommended above this level)", pearl: "Only indicated when pH <6.9. Routine use worsens outcomes. Insulin and fluids correct the acidosis in most cases." },
      { name: "Potassium Phosphate", type: "Electrolyte replacement", action: "Replaces phosphate depleted during DKA to support ATP synthesis and oxygen delivery", sideEffects: "Hypocalcemia, hyperphosphatemia", contra: "Hypocalcemia, hyperphosphatemia", pearl: "Consider when PO4 <1.0 mg/dL. Severe phosphate depletion impairs diaphragmatic function and tissue oxygenation." },
      { name: "Glargine Insulin", type: "Long-acting basal insulin", action: "Provides steady baseline insulin for 24 hours to prevent rebound hyperglycemia", sideEffects: "Hypoglycemia, injection site reactions", contra: "During active DKA (use IV regular insulin instead)", pearl: "Administer basal insulin 1-2 hours BEFORE discontinuing the insulin drip to prevent rebound DKA. This overlap is critical." }
    ],
    pearls: [
      "The anion gap must close before transitioning off the insulin drip; glucose normalizes before acidosis resolves",
      "Serum potassium may appear normal or elevated initially due to acidotic shift, but total body potassium is depleted",
      "Add D5 to IV fluids when glucose reaches 200-250 mg/dL to allow continued insulin infusion for ketone clearance",
      "Euglycemic DKA (glucose <250) can occur with SGLT2 inhibitors — check ketones even with normal glucose",
      "Cerebral edema is the most dangerous complication in pediatric DKA, often from overly aggressive fluid resuscitation"
    ],
    quiz: [
      { question: "A patient with DKA has a serum potassium of 3.1 mEq/L. What is the priority action?", options: ["Start the insulin drip immediately", "Replace potassium before starting insulin", "Administer sodium bicarbonate", "Obtain a repeat potassium in 4 hours"], correct: 1, rationale: "Insulin drives potassium intracellularly. Starting insulin with K+ <3.3 can cause fatal hypokalemia and cardiac arrest. Potassium must be replaced first." },
      { question: "When should dextrose be added to the IV fluids during DKA management?", options: ["Immediately upon admission", "When blood glucose reaches 200-250 mg/dL", "After the insulin drip is discontinued", "Only if the patient is hypoglycemic"], correct: 1, rationale: "Dextrose is added at 200-250 mg/dL to prevent hypoglycemia while allowing continued insulin infusion to clear remaining ketones and close the anion gap." },
      { question: "Which indicator confirms DKA resolution and readiness to transition to subcutaneous insulin?", options: ["Blood glucose <200 mg/dL alone", "Anion gap closure with pH >7.30 and HCO3 >18", "Patient reports feeling better", "Urine ketones are trace"], correct: 1, rationale: "DKA resolution requires biochemical normalization: closure of the anion gap, pH >7.30, and HCO3 >18. Glucose alone is insufficient as it normalizes before acidosis resolves." }
    ]
  },

  "dka-management-np": {
    title: "Diabetic Ketoacidosis: NP Prescriptive Management",
    cellular: {
      title: "Advanced Metabolic Pathophysiology",
      content: "DKA represents a state of absolute or relative insulinopenia with counter-regulatory hormone excess. Insulin deficiency activates hormone-sensitive lipase in adipose tissue, releasing free fatty acids (FFAs) that undergo hepatic beta-oxidation. Glucagon excess enhances mitochondrial carnitine palmitoyltransferase-1 (CPT-1) activity, shuttling FFAs into mitochondria for conversion to acetoacetate and beta-hydroxybutyrate. The resulting ketonemia produces high anion gap metabolic acidosis. Simultaneously, unrestrained hepatic gluconeogenesis and glycogenolysis cause severe hyperglycemia (often >500 mg/dL), driving osmotic diuresis with average fluid deficits of 5-7 liters and significant losses of Na+ (7-10 mEq/kg), K+ (3-5 mEq/kg), and PO4 (1-1.5 mmol/kg). The NP orders the treatment protocol, manages insulin titration, identifies precipitants, prevents complications, and plans the transition to long-term glycemic management."
    },
    riskFactors: [
      "Type 1 diabetes (most common, but T2DM can present with DKA)",
      "Infection (most common precipitant: pneumonia, UTI, sepsis)",
      "Insulin omission or pump failure",
      "New-onset autoimmune diabetes",
      "Acute coronary syndrome or stroke",
      "SGLT2 inhibitor use (euglycemic DKA, glucose may be <250)",
      "Substance use (cocaine, alcohol binge)",
      "Pregnancy (accelerated starvation ketosis)"
    ],
    diagnostics: [
      "Order stat ABG, BMP, CBC, serum ketones (beta-hydroxybutyrate), urinalysis",
      "Calculate anion gap (Na - Cl - HCO3); expect >12 in DKA",
      "Calculate corrected sodium: add 1.6 mEq/L for every 100 mg/dL glucose above 100",
      "Calculate effective osmolality: 2(Na) + glucose/18; >320 mOsm/kg suggests concurrent HHS",
      "Order blood and urine cultures if infection is suspected as precipitant",
      "Obtain ECG to assess for hyperkalemia/hypokalemia changes and rule out MI as trigger",
      "Order serial BMP every 2 hours, glucose hourly, venous pH every 2-4 hours",
      "Order HbA1c to assess baseline glycemic control"
    ],
    management: [
      "Order 0.9% NS 15-20 mL/kg/hr (1-2 L) in first hour; switch to 0.45% NS based on corrected Na+",
      "Order continuous insulin infusion: 0.1-0.14 units/kg/hr (do not bolus if rate is 0.14)",
      "Order potassium replacement: 20-40 mEq/hr IV if K+ 3.3-5.3; hold insulin if K+ <3.3",
      "Order D5 added to fluids when glucose reaches 200-250 mg/dL",
      "Order sodium bicarbonate only if pH <6.9 (100 mmol in 400 mL water over 2 hours)",
      "Order phosphate replacement if PO4 <1.0 mg/dL (use potassium phosphate)",
      "Prescribe basal insulin (glargine) 1-2 hours before discontinuing drip with 2-4 hour overlap",
      "Prescribe comprehensive outpatient diabetes regimen: basal-bolus insulin, glucose monitoring, sick-day rules"
    ],
    nursingActions: [
      "Develop institution-specific DKA protocol with standardized order sets",
      "Calculate fluid deficit and plan 48-hour replacement schedule",
      "Monitor corrected sodium trend to guide fluid selection",
      "Assess for precipitating factors: infection workup, medication reconciliation, psychosocial barriers",
      "Order endocrinology consult for recurrent DKA or new-onset type 1",
      "Evaluate for concurrent hyperosmolar hyperglycemic state (HHS) if osmolality >320",
      "Plan discharge education: insulin self-administration, SMBG, ketone testing, sick-day management",
      "Arrange outpatient follow-up within 1 week with diabetes education referral"
    ],
    signs: {
      left: [
        "Blood glucose >250 mg/dL (>500 if concurrent HHS)",
        "High anion gap metabolic acidosis (AG >12)",
        "pH <7.30, HCO3 <18 mEq/L",
        "Elevated serum beta-hydroxybutyrate >3 mmol/L",
        "Osmotic diuresis symptoms",
        "Abdominal pain mimicking acute abdomen",
        "Leukocytosis (stress response, even without infection)"
      ],
      right: [
        "Kussmaul respirations (compensatory hyperventilation)",
        "Fruity acetone breath",
        "Altered sensorium to coma",
        "Severe dehydration with hypotension",
        "Tachycardia",
        "Hypothermia (may mask infection/fever)",
        "ECG changes from electrolyte shifts"
      ]
    },
    medications: [
      { name: "Regular Insulin Infusion", type: "Short-acting insulin", action: "Suppresses lipolysis, halts ketogenesis, promotes glucose uptake, inhibits hepatic glucose output", sideEffects: "Hypoglycemia, hypokalemia, cerebral edema", contra: "K+ <3.3 mEq/L until corrected", pearl: "Do NOT stop the drip when glucose normalizes. Add D5 and continue to clear ketones. The anion gap must close before transitioning." },
      { name: "Insulin Glargine", type: "Long-acting basal insulin", action: "Peakless 24-hour basal insulin providing steady-state coverage", sideEffects: "Hypoglycemia, lipodystrophy", contra: "Active DKA (only use after resolution for transition)", pearl: "Give 0.25-0.3 units/kg as starting basal dose. Administer 1-2 hours BEFORE stopping the drip. Failure to overlap causes rebound DKA within hours." },
      { name: "Sodium Bicarbonate", type: "Alkalinizing agent", action: "Provides exogenous bicarbonate to buffer severe acidosis", sideEffects: "Rebound alkalosis, hypokalemia, paradoxical intracellular acidosis, cerebral edema risk", contra: "pH >6.9", pearl: "ADA guidelines: only indicated if pH <6.9. In most cases, insulin and fluids alone correct the acidosis. Overly aggressive bicarb use worsens outcomes." },
      { name: "Potassium Chloride/Phosphate", type: "Electrolyte replacement", action: "Replaces total body potassium depleted by osmotic diuresis and acidotic shift", sideEffects: "Hyperkalemia, cardiac arrhythmias, tissue necrosis if extravasated", contra: "K+ >5.3 mEq/L, anuria", pearl: "Even with initial hyperkalemia, total body K+ is depleted by 3-5 mEq/kg. Plan aggressive replacement. Use half as KCl and half as KPO4 if phosphate is also low." }
    ],
    pearls: [
      "DKA criteria: glucose >250, pH <7.30, HCO3 <18, anion gap >12, positive ketones",
      "The rate of glucose decline should be 50-70 mg/dL per hour; faster correction increases cerebral edema risk",
      "Euglycemic DKA (SGLT2 inhibitor-related) has normal glucose but positive ketones and acidosis — maintain high clinical suspicion",
      "Corrected sodium should rise as glucose falls; failure to rise suggests excessive free water and increased cerebral edema risk",
      "Recurrent DKA is often due to insulin omission (cost, psychosocial factors, eating disorders) — address root cause before discharge"
    ],
    quiz: [
      { question: "A patient on empagliflozin presents with pH 7.22, HCO3 14, and blood glucose 190 mg/dL. What is the most likely diagnosis?", options: ["Hyperosmolar hyperglycemic state", "Euglycemic DKA", "Lactic acidosis", "Diabetic gastroparesis"], correct: 1, rationale: "SGLT2 inhibitors can cause euglycemic DKA where blood glucose is near-normal but ketoacidosis is present. The low pH and HCO3 with positive ketones confirm the diagnosis." },
      { question: "When should the NP order sodium bicarbonate in DKA?", options: ["For all patients with DKA", "When pH is <7.30", "When pH is <6.9", "When glucose is >500 mg/dL"], correct: 2, rationale: "ADA guidelines recommend sodium bicarbonate only when pH <6.9. Above this threshold, insulin and fluids adequately correct the acidosis." },
      { question: "What is the appropriate next step when blood glucose reaches 200 mg/dL during DKA treatment but the anion gap remains elevated?", options: ["Stop the insulin drip", "Add D5 to IV fluids and continue the insulin drip", "Switch to subcutaneous insulin", "Increase the insulin drip rate"], correct: 1, rationale: "The insulin drip must continue until the anion gap closes. Adding dextrose prevents hypoglycemia while allowing continued insulin to clear remaining ketones." }
    ]
  },

  "thyroid-storm-rpn": {
    title: "Thyroid Storm: RPN Monitoring",
    cellular: {
      title: "Thyrotoxic Crisis Pathophysiology",
      content: "Thyroid storm is a life-threatening exacerbation of hyperthyroidism characterized by an acute surge in thyroid hormone action. Excessive T3 and T4 dramatically increase cellular metabolic rate, oxygen consumption, and heat production. Beta-adrenergic receptor sensitivity is amplified, causing severe tachycardia, hypertension, and cardiac dysfunction. Multi-organ failure can occur from hyperthermia, cardiovascular collapse, and CNS dysfunction. The RPN monitors vital signs, temperature, neurological status, and cardiac rhythm, reporting all changes immediately."
    },
    riskFactors: [
      "Uncontrolled or untreated Graves' disease",
      "Abrupt discontinuation of antithyroid medications",
      "Thyroid surgery or radioactive iodine treatment without adequate preparation",
      "Infection or sepsis in a hyperthyroid patient",
      "Trauma or surgery in an undiagnosed hyperthyroid patient",
      "Iodinated contrast media administration",
      "Diabetic ketoacidosis or other acute illness",
      "Pregnancy or labor (rare)"
    ],
    diagnostics: [
      "Monitor continuous vital signs and report tachycardia (HR often >140 bpm)",
      "Monitor temperature and report hyperthermia (>38.5°C)",
      "Assess and report changes in mental status (agitation, delirium, psychosis)",
      "Monitor cardiac rhythm continuously as directed",
      "Report new-onset tremors, diaphoresis, or extreme restlessness",
      "Monitor strict intake and output",
      "Report diarrhea, vomiting, or abdominal pain"
    ],
    management: [
      "Maintain a cool environment and apply cooling measures as ordered",
      "Administer medications as ordered on schedule",
      "Maintain IV fluid access and infusions as directed",
      "Provide calm, low-stimulation environment",
      "Maintain continuous cardiac monitoring",
      "Maintain bed rest and safety precautions (fall prevention)"
    ],
    nursingActions: [
      "Monitor vital signs every 15-30 minutes as directed",
      "Apply cooling blankets and administer acetaminophen as ordered for hyperthermia",
      "Report heart rate >140 bpm or new irregular rhythms immediately",
      "Monitor for signs of heart failure: dyspnea, crackles, JVD",
      "Assess neurological status hourly and report confusion or obtundation",
      "Ensure adequate fluid intake and report signs of dehydration",
      "Administer antithyroid medications as ordered at scheduled times",
      "Avoid aspirin for fever (displaces thyroid hormone from binding proteins, worsening crisis)"
    ],
    signs: {
      left: [
        "Severe tachycardia (HR >140 bpm)",
        "High fever (>40°C/104°F)",
        "Profuse diaphoresis",
        "Tremors and agitation"
      ],
      right: [
        "Altered mental status (delirium, psychosis, coma)",
        "Nausea, vomiting, diarrhea",
        "Heart failure symptoms",
        "Jaundice (hepatic dysfunction)"
      ]
    },
    medications: [
      { name: "Propranolol", type: "Non-selective beta-blocker", action: "Controls tachycardia, hypertension, tremor, and blocks peripheral T4-to-T3 conversion", sideEffects: "Bradycardia, hypotension, bronchospasm", contra: "Severe heart failure, asthma, severe bradycardia", pearl: "First-line for symptom control in thyroid storm. Administer as ordered and report HR <60 or SBP <90." },
      { name: "Propylthiouracil (PTU)", type: "Thionamide antithyroid agent", action: "Blocks thyroid hormone synthesis and peripheral T4-to-T3 conversion", sideEffects: "Hepatotoxicity, agranulocytosis, rash", contra: "History of PTU-induced hepatotoxicity", pearl: "Preferred over methimazole in thyroid storm because it also blocks peripheral conversion. Report sore throat or fever (agranulocytosis risk)." },
      { name: "Acetaminophen", type: "Antipyretic", action: "Reduces fever through central thermoregulation", sideEffects: "Hepatotoxicity at high doses", contra: "Severe hepatic impairment", pearl: "Use acetaminophen, NOT aspirin, for fever in thyroid storm. Aspirin displaces T4 from protein binding, increasing free thyroid hormone levels." }
    ],
    pearls: [
      "Never give aspirin in thyroid storm — it increases free T4 by displacing thyroid hormone from binding proteins",
      "Thyroid storm is a clinical diagnosis scored on the Burch-Wartofsky scale",
      "Report any heart rate >140 or temperature >40°C immediately as these indicate worsening crisis",
      "Maintain a quiet, cool environment to reduce metabolic demands",
      "Thyroid storm has a mortality rate of 10-30% even with treatment"
    ],
    quiz: [
      { question: "Which medication should be AVOIDED for fever in a patient with thyroid storm?", options: ["Acetaminophen", "Aspirin", "Cooling blankets", "Propranolol"], correct: 1, rationale: "Aspirin displaces thyroid hormone from binding proteins, increasing free T4 levels and worsening the thyrotoxic state. Use acetaminophen instead." },
      { question: "What vital sign finding is most characteristic of thyroid storm?", options: ["Bradycardia and hypothermia", "Severe tachycardia with high fever", "Hypertension with slow pulse", "Normal temperature with low blood pressure"], correct: 1, rationale: "Thyroid storm presents with severe tachycardia (often >140 bpm) and high fever (>40°C) due to the hypermetabolic state from excessive thyroid hormone." },
      { question: "The RPN notes that a patient with thyroid storm becomes confused and agitated. What is the priority action?", options: ["Apply physical restraints", "Report the change in mental status to the RN immediately", "Increase room temperature for comfort", "Administer aspirin for presumed fever"], correct: 1, rationale: "Altered mental status in thyroid storm indicates potential progression to thyrotoxic coma, requiring immediate reporting and medical intervention." }
    ]
  },

  "thyroid-storm-rn": {
    title: "Thyroid Storm: RN Clinical Management",
    cellular: {
      title: "Thyrotoxic Pathophysiology and Organ Impact",
      content: "Thyroid storm (thyrotoxic crisis) represents decompensated thyrotoxicosis where excessive circulating T3 (the metabolically active form) causes multi-system hypermetabolic crisis. T3 upregulates beta-adrenergic receptors on cardiac myocytes, causing severe tachyarrhythmias and high-output heart failure. Increased basal metabolic rate elevates oxygen consumption and heat production, leading to hyperthermia. Hepatic glycogenolysis and gluconeogenesis cause hyperglycemia. GI hypermotility causes diarrhea and volume depletion. CNS excitability manifests as agitation, psychosis, seizures, and eventual obtundation. The RN manages aggressive cooling, medication administration protocols, continuous monitoring, fluid resuscitation, and coordination of the multidisciplinary response."
    },
    riskFactors: [
      "Uncontrolled Graves' disease (most common underlying cause)",
      "Non-adherence with antithyroid medications",
      "Thyroid surgery without adequate preoperative preparation",
      "Radioactive iodine therapy causing thyroid hormone release",
      "Acute infection, trauma, or surgical stress",
      "Iodinated contrast media exposure",
      "Amiodarone-induced thyrotoxicosis",
      "Preeclampsia or molar pregnancy"
    ],
    diagnostics: [
      "Interpret Burch-Wartofsky Point Scale (BWPS) score: ≥45 = thyroid storm",
      "Evaluate TSH (suppressed, often <0.01), free T4 (markedly elevated), free T3 (elevated)",
      "Monitor continuous cardiac telemetry for tachyarrhythmias (sinus tach, atrial fibrillation, flutter)",
      "Obtain ECG: evaluate for atrial fibrillation, ST changes, heart failure",
      "Monitor CBC for leukocytosis, CMP for hyperglycemia, liver function for hepatic involvement",
      "Assess cortisol level (relative adrenal insufficiency may contribute)",
      "Monitor core temperature continuously (rectal or esophageal preferred)"
    ],
    management: [
      "Administer PTU loading dose 500-1000 mg PO/PR, then 250 mg every 4 hours as ordered",
      "Administer propranolol IV 1 mg over 10 minutes, titrate to target HR <100",
      "Administer Lugol's iodine or SSKI at least ONE HOUR after PTU loading dose",
      "Administer hydrocortisone 100 mg IV every 8 hours (prevents peripheral conversion and treats potential adrenal insufficiency)",
      "Implement aggressive cooling: cooling blankets, ice packs, acetaminophen (NOT aspirin)",
      "Initiate aggressive IV fluid resuscitation with dextrose-containing fluids",
      "Prepare for ICU transfer if hemodynamically unstable",
      "Consider cholestyramine to reduce enterohepatic recirculation of thyroid hormones"
    ],
    nursingActions: [
      "Perform continuous cardiac monitoring and interpret rhythm strips",
      "Monitor core temperature every 15-30 minutes and titrate cooling measures",
      "Assess for signs of high-output heart failure: S3, crackles, jugular venous distension",
      "Calculate Burch-Wartofsky score and communicate severity to medical team",
      "Ensure PTU is given BEFORE iodine (iodine given first can worsen storm by providing substrate)",
      "Monitor blood glucose every 2-4 hours (hyperglycemia from glycogenolysis)",
      "Administer medications in correct sequence: beta-blocker → PTU → iodine (1 hour later) → steroid",
      "Provide seizure precautions and maintain a safe, low-stimulation environment"
    ],
    signs: {
      left: [
        "Tachycardia >140 bpm (may exceed 200)",
        "Hyperthermia >40°C (104°F)",
        "Systolic hypertension with wide pulse pressure",
        "Atrial fibrillation or flutter",
        "Tremor, hyperreflexia",
        "Lid lag and proptosis (Graves')",
        "Diaphoresis"
      ],
      right: [
        "Agitation, delirium, psychosis progressing to obtundation",
        "High-output heart failure",
        "Nausea, vomiting, severe diarrhea",
        "Jaundice and hepatic failure",
        "Seizures",
        "Cardiovascular collapse",
        "Burch-Wartofsky score ≥45"
      ]
    },
    medications: [
      { name: "Propylthiouracil (PTU)", type: "Thionamide", action: "Inhibits thyroid peroxidase (blocks hormone synthesis) and inhibits peripheral T4-to-T3 conversion", sideEffects: "Hepatotoxicity, agranulocytosis, vasculitis", contra: "Prior PTU hepatotoxicity, severe liver disease", pearl: "PTU preferred over methimazole in thyroid storm because it blocks peripheral conversion. Must be given BEFORE iodine. Monitor CBC for agranulocytosis." },
      { name: "Lugol's Solution (SSKI)", type: "Iodine solution", action: "Blocks thyroid hormone release via the Wolff-Chaikoff effect", sideEffects: "Iodine hypersensitivity, metallic taste, sialadenitis", contra: "Give ONLY after PTU has been administered (minimum 1 hour delay)", pearl: "Must be given at least 1 hour AFTER PTU. If given first, the iodine becomes substrate for more thyroid hormone synthesis (Jod-Basedow phenomenon)." },
      { name: "Hydrocortisone", type: "Corticosteroid", action: "Blocks peripheral T4-to-T3 conversion and treats relative adrenal insufficiency from accelerated cortisol metabolism", sideEffects: "Hyperglycemia, immunosuppression, GI irritation", contra: "Systemic fungal infection (relative)", pearl: "Thyroid storm accelerates cortisol metabolism, creating functional adrenal insufficiency. Always administer stress-dose steroids." },
      { name: "Esmolol", type: "Ultra-short-acting beta-blocker", action: "Rapid heart rate control via beta-1 receptor blockade", sideEffects: "Hypotension, bradycardia, injection site pain", contra: "Severe heart failure, cardiogenic shock", pearl: "Preferred in ICU for IV rate control due to short half-life (9 minutes). Allows rapid titration. Switch to oral propranolol once stable." }
    ],
    pearls: [
      "Medication sequence is critical: Beta-blocker → PTU → Iodine (1 hour after PTU) → Steroids",
      "Aspirin is absolutely contraindicated — it displaces T4 from thyroid-binding globulin, increasing free hormone levels",
      "Atrial fibrillation in thyroid storm is rate-controlled but may not cardiovert until the patient is euthyroid",
      "Mortality rate is 10-30% even with aggressive treatment; early ICU admission improves survival",
      "The Burch-Wartofsky score ≥45 clinically defines thyroid storm (lab values alone are insufficient)"
    ],
    quiz: [
      { question: "Why must PTU be administered BEFORE Lugol's iodine in thyroid storm?", options: ["PTU requires iodine to be effective", "Iodine given first provides substrate for more thyroid hormone production", "PTU and iodine are the same drug class", "The order does not matter clinically"], correct: 1, rationale: "Iodine given before PTU can serve as substrate for additional thyroid hormone synthesis via the Jod-Basedow effect. PTU must first block hormone synthesis before iodine is administered to block hormone release." },
      { question: "Which medication is used to address relative adrenal insufficiency in thyroid storm?", options: ["Levothyroxine", "Hydrocortisone", "Methimazole", "Propranolol"], correct: 1, rationale: "Thyroid storm accelerates cortisol metabolism, creating functional adrenal insufficiency. Hydrocortisone 100 mg IV every 8 hours provides stress-dose coverage and also blocks peripheral T4-to-T3 conversion." },
      { question: "A patient in thyroid storm has a temperature of 41°C. The nurse administers which antipyretic?", options: ["Aspirin 650 mg PO", "Ibuprofen 600 mg PO", "Acetaminophen 1000 mg PO", "Ketorolac 30 mg IV"], correct: 2, rationale: "Acetaminophen is the only appropriate antipyretic in thyroid storm. Aspirin and NSAIDs can displace thyroid hormones from binding proteins, increasing free T4 and worsening the crisis." }
    ]
  },

  "thyroid-storm-np": {
    title: "Thyroid Storm: NP Prescriptive Management",
    cellular: {
      title: "Advanced Thyrotoxic Pathophysiology",
      content: "Thyroid storm represents the extreme end of the thyrotoxicosis spectrum, typically precipitated by a superimposed stressor in a patient with uncontrolled hyperthyroidism. The pathogenesis involves massive sympathetic activation from thyroid hormone excess. T3 directly upregulates myocardial beta-1 receptors, increasing heart rate, contractility, and cardiac output beyond adaptive capacity. Peripheral vasodilation reduces SVR, and the resulting high-output state can progress to heart failure. Thermoregulatory failure occurs as T3 increases uncoupling protein activity in mitochondria, generating heat rather than ATP. Hepatic dysfunction results from hepatic oxygen demand exceeding supply. CNS manifestations from agitation to coma reflect both direct T3 neurotoxicity and cerebral hyperthermia. The NP must rapidly initiate the multi-drug protocol, manage ICU-level care, identify the precipitant, and prevent cardiovascular collapse."
    },
    riskFactors: [
      "Graves' disease (most common underlying etiology)",
      "Toxic multinodular goiter",
      "Non-adherence to antithyroid therapy",
      "Post-thyroidectomy without adequate pharmacologic preparation",
      "Radioactive iodine treatment causing thyroid hormone release",
      "Amiodarone-induced thyrotoxicosis (type 1 or type 2)",
      "Iodinated contrast administration",
      "Acute illness, trauma, or DKA in undiagnosed hyperthyroidism"
    ],
    diagnostics: [
      "Calculate Burch-Wartofsky Point Scale score (≥45 highly suggestive of thyroid storm)",
      "Order stat TSH (suppressed <0.01), free T4, free T3, total T3",
      "Order comprehensive metabolic panel: hyperglycemia, elevated liver enzymes, hypercalcemia",
      "Order CBC with differential (leukocytosis, rule out infection as precipitant)",
      "Order cortisol level (to assess for relative adrenal insufficiency)",
      "Order 12-lead ECG and continuous telemetry (atrial fibrillation, SVT, heart failure)",
      "Order chest X-ray to evaluate for pulmonary edema or infectious precipitant",
      "Order blood cultures, urinalysis, and chest imaging if infection suspected"
    ],
    management: [
      "Prescribe propranolol 60-80 mg PO every 4-6 hours (or IV 1 mg every 10 min, max 10 mg) for rate control",
      "Prescribe PTU 500-1000 mg loading dose, then 250 mg PO every 4 hours",
      "Prescribe Lugol's solution 5-10 drops every 8 hours OR SSKI 5 drops every 6 hours — ONLY after PTU loaded (≥1 hour delay)",
      "Prescribe hydrocortisone 100 mg IV every 8 hours (or dexamethasone 2 mg IV every 6 hours)",
      "Order aggressive IV fluid resuscitation with D5NS to address dehydration and metabolic demands",
      "Order cooling measures: cooling blanket, acetaminophen 1000 mg every 6 hours (NO aspirin)",
      "Order cholestyramine 4g PO every 6 hours to reduce enterohepatic thyroid hormone recirculation",
      "Consult endocrinology and ICU for co-management; consider plasmapheresis if refractory"
    ],
    nursingActions: [
      "Establish medication administration sequence protocol: beta-blocker → PTU → wait 1 hour → iodine → steroid",
      "Order continuous telemetry and arterial line for hemodynamic monitoring in unstable patients",
      "Assess for and treat precipitating cause (culture-guided antibiotics, DKA protocol, wound care)",
      "Evaluate for heart failure: order echocardiogram if new S3, pulmonary edema, or declining EF suspected",
      "Monitor hepatic function serially (rising AST/ALT may indicate hepatic crisis)",
      "Order serial thyroid function tests every 24-48 hours to assess treatment response",
      "Plan transition to methimazole once acute crisis resolves (better side effect profile than PTU long-term)",
      "Arrange definitive therapy consultation: radioactive iodine ablation or thyroidectomy"
    ],
    signs: {
      left: [
        "TSH suppressed (<0.01 mIU/L)",
        "Free T4 and T3 markedly elevated",
        "Burch-Wartofsky score ≥45",
        "Sinus tachycardia >140 bpm or atrial fibrillation",
        "Systolic hypertension with wide pulse pressure",
        "Hyperglycemia",
        "Elevated liver enzymes"
      ],
      right: [
        "Hyperthermia >40°C unresponsive to standard antipyretics",
        "CNS dysfunction: agitation → delirium → seizures → coma",
        "High-output heart failure",
        "Severe diarrhea with volume depletion",
        "Jaundice (ominous sign indicating hepatic failure)",
        "Cardiovascular collapse",
        "Multi-organ dysfunction"
      ]
    },
    medications: [
      { name: "PTU (Propylthiouracil)", type: "Thionamide antithyroid", action: "Inhibits thyroid peroxidase-mediated iodination and coupling, and blocks peripheral deiodinase converting T4 to T3", sideEffects: "Hepatotoxicity (hepatic necrosis), agranulocytosis (0.2-0.5%), ANCA-positive vasculitis", contra: "Prior PTU hepatotoxicity", pearl: "Preferred in acute thyroid storm for its dual action. Loading dose 500-1000 mg. After crisis resolves, transition to methimazole for long-term management due to lower hepatotoxicity risk." },
      { name: "SSKI (Saturated Solution of Potassium Iodide)", type: "Iodine preparation", action: "Acutely blocks thyroid hormone release via Wolff-Chaikoff effect; reduces thyroid gland vascularity", sideEffects: "Iodine allergy, metallic taste, parotitis, escape phenomenon after 10-14 days", contra: "Must NOT be given before PTU has been administered", pearl: "Critical timing: give ≥1 hour after PTU. The Wolff-Chaikoff effect blocks release but is temporary (escape occurs in 10-14 days). This buys time for definitive therapy." },
      { name: "Dexamethasone", type: "Corticosteroid", action: "Potently blocks peripheral T4-to-T3 conversion; treats relative adrenal insufficiency", sideEffects: "Hyperglycemia, immunosuppression, GI ulceration", contra: "Active systemic fungal infection", pearl: "Alternative to hydrocortisone when additional mineralocorticoid effect is undesired. 2 mg IV every 6 hours. Dexamethasone is more potent at blocking peripheral conversion." },
      { name: "Cholestyramine", type: "Bile acid sequestrant", action: "Binds thyroid hormones in the GI tract, interrupting enterohepatic recirculation", sideEffects: "Constipation, bloating, binds other medications", contra: "Complete biliary obstruction", pearl: "Adjunctive therapy that can lower T4 levels by 20-30% within 24-48 hours. Administer separately from other medications (2 hours apart)." }
    ],
    pearls: [
      "Thyroid storm is a clinical diagnosis — lab values alone cannot distinguish severe thyrotoxicosis from thyroid storm",
      "Jaundice in thyroid storm is an ominous sign indicating hepatic failure and is associated with increased mortality",
      "Atrial fibrillation occurs in up to 30% of thyroid storm cases; it often converts spontaneously once euthyroid state is achieved",
      "Amiodarone-induced thyrotoxicosis type 2 (destructive thyroiditis) responds to steroids, not thionamides",
      "Plasmapheresis or plasma exchange is reserved for refractory cases unresponsive to standard medical therapy"
    ],
    quiz: [
      { question: "A patient with Graves' disease undergoes thyroid surgery without adequate preoperative preparation. Which complication is most likely?", options: ["Myxedema coma", "Thyroid storm", "Hashimoto's thyroiditis", "Thyroid lymphoma"], correct: 1, rationale: "Surgery on an inadequately prepared hyperthyroid patient can precipitate thyroid storm due to thyroid hormone release and surgical stress." },
      { question: "Why is cholestyramine used as adjunctive therapy in thyroid storm?", options: ["It blocks thyroid hormone synthesis", "It enhances renal excretion of T4", "It binds thyroid hormones in the GI tract, reducing enterohepatic recirculation", "It directly blocks beta-adrenergic receptors"], correct: 2, rationale: "Cholestyramine binds T4 and T3 in the intestinal lumen, preventing their reabsorption through enterohepatic circulation and lowering serum levels." },
      { question: "Which sign in thyroid storm indicates the highest risk of mortality?", options: ["Tachycardia of 150 bpm", "Temperature of 39.5°C", "Jaundice with rising AST/ALT", "Tremor and agitation"], correct: 2, rationale: "Jaundice and rising liver enzymes indicate hepatic failure in thyroid storm, which is associated with the highest mortality. This requires aggressive ICU management and possible plasmapheresis." }
    ]
  },

  "sepsis-management-rpn": {
    title: "Sepsis & Septic Shock: RPN Monitoring",
    cellular: {
      title: "Infection-Driven Systemic Inflammatory Response",
      content: "Sepsis occurs when the body's immune response to infection becomes dysregulated, causing widespread tissue damage rather than contained pathogen elimination. Bacterial endotoxins and inflammatory mediators (TNF-alpha, interleukins) trigger systemic vasodilation, capillary leak, and microvascular thrombosis. This leads to tissue hypoperfusion, cellular hypoxia, and progressive organ dysfunction. Septic shock adds persistent hypotension unresponsive to fluid resuscitation, requiring vasopressors. The RPN monitors vital signs, urine output, and level of consciousness, reporting early warning signs to the nursing team."
    },
    riskFactors: [
      "Age >65 years or neonates",
      "Immunosuppression (chemotherapy, organ transplant, HIV, chronic steroids)",
      "Chronic diseases (diabetes, CKD, liver disease, COPD)",
      "Indwelling devices (central lines, urinary catheters, ventilators)",
      "Recent surgery or invasive procedures",
      "Nursing home or long-term care residence",
      "IV drug use",
      "Malnutrition"
    ],
    diagnostics: [
      "Monitor vital signs every 1-2 hours as directed",
      "Report any two or more SIRS criteria: temp >38°C or <36°C, HR >90, RR >20, WBC >12,000 or <4,000",
      "Monitor urine output hourly and report <0.5 mL/kg/hr",
      "Assess and report changes in mental status (confusion, lethargy)",
      "Monitor oxygen saturation and report SpO2 <92%",
      "Report skin changes: mottling, cool extremities, delayed capillary refill",
      "Monitor blood glucose and report hyperglycemia"
    ],
    management: [
      "Assist with obtaining blood cultures before antibiotic administration as directed",
      "Administer IV fluids and antibiotics as ordered on time",
      "Maintain oxygen therapy as ordered",
      "Keep the patient on continuous monitoring",
      "Maintain IV access and report infiltration or line issues",
      "Administer vasopressors through central line as directed (monitor only)"
    ],
    nursingActions: [
      "Perform vital sign assessment every 15-30 minutes during acute phase as directed",
      "Measure strict I&O and report urine output <0.5 mL/kg/hr",
      "Assess skin color, temperature, and capillary refill every assessment",
      "Report changes in level of consciousness immediately",
      "Monitor IV fluid rate and report when fluid bolus is complete",
      "Report signs of fluid overload: crackles, JVD, peripheral edema",
      "Assist with repositioning every 2 hours to prevent skin breakdown",
      "Monitor and report trends in temperature (new fever or hypothermia)"
    ],
    signs: {
      left: [
        "Fever >38°C or hypothermia <36°C",
        "Tachycardia (HR >90 bpm)",
        "Tachypnea (RR >20)",
        "Warm, flushed skin (early/warm sepsis)"
      ],
      right: [
        "Hypotension (SBP <90 or MAP <65)",
        "Altered mental status and confusion",
        "Oliguria (<0.5 mL/kg/hr urine output)",
        "Cool, mottled extremities (late/cold sepsis)"
      ]
    },
    medications: [
      { name: "Norepinephrine", type: "Vasopressor", action: "Alpha-1 agonist causing vasoconstriction to raise blood pressure", sideEffects: "Peripheral ischemia, arrhythmias, tissue necrosis if extravasated", contra: "Hypovolemia not yet corrected", pearl: "First-line vasopressor for septic shock. Must be administered via central line. Report any signs of extravasation immediately." },
      { name: "Normal Saline", type: "Isotonic crystalloid", action: "Expands intravascular volume to improve tissue perfusion", sideEffects: "Fluid overload, hyperchloremic acidosis", contra: "Volume overload with pulmonary edema", pearl: "Initial resuscitation: 30 mL/kg within first 3 hours per Surviving Sepsis Campaign guidelines. Report crackles or respiratory distress." },
      { name: "Broad-Spectrum Antibiotics", type: "Antimicrobial", action: "Kill or inhibit growth of causative bacteria before culture results are available", sideEffects: "Allergic reactions, C. difficile risk, nephrotoxicity (aminoglycosides)", contra: "Known allergy (verify allergy status before administration)", pearl: "Antibiotics must be administered within 1 hour of sepsis recognition. Each hour of delay increases mortality by approximately 7.6%." }
    ],
    pearls: [
      "Time is critical in sepsis: the 1-hour bundle includes blood cultures, antibiotics, fluids, and lactate measurement",
      "Report any new confusion in an elderly patient — altered mental status may be the first sign of sepsis",
      "Hypothermia (<36°C) in sepsis is an ominous sign and carries worse prognosis than fever",
      "Mottled skin and cool extremities indicate progression from warm to cold septic shock",
      "Always verify antibiotic allergies before administering the first dose"
    ],
    quiz: [
      { question: "Which finding should the RPN report immediately as a potential early sign of sepsis?", options: ["Blood pressure of 125/78 mmHg", "Temperature of 37.2°C", "New confusion with HR 105 and RR 24", "Urine output of 100 mL/hr"], correct: 2, rationale: "New confusion combined with tachycardia (HR >90) and tachypnea (RR >20) meets SIRS criteria and suggests early sepsis requiring immediate evaluation." },
      { question: "Why must antibiotics be administered within 1 hour of sepsis recognition?", options: ["Hospital policy requires documentation within 1 hour", "Each hour of delay increases mortality by approximately 7.6%", "Antibiotics lose potency after 1 hour", "Insurance requires timely administration"], correct: 1, rationale: "Research from the Surviving Sepsis Campaign demonstrates that each hour of antibiotic delay in sepsis increases mortality by approximately 7.6%." },
      { question: "Which skin finding indicates progression from early to late septic shock?", options: ["Warm, flushed skin", "Cool, mottled extremities", "Normal skin color and temperature", "Generalized rash"], correct: 1, rationale: "Cool, mottled extremities indicate vasoconstriction from failing compensatory mechanisms, suggesting progression from warm (vasodilated) to cold (vasoconstricted) septic shock." }
    ]
  },

  "sepsis-management-rn": {
    title: "Sepsis & Septic Shock: RN Clinical Management",
    cellular: {
      title: "Sepsis Pathophysiology and Organ Dysfunction Cascade",
      content: "Sepsis is defined as life-threatening organ dysfunction caused by a dysregulated host response to infection (Sepsis-3 definition). Pathogen-associated molecular patterns (PAMPs) activate innate immune cells, triggering a cytokine storm (TNF-alpha, IL-1, IL-6). This produces systemic vasodilation (low SVR), increased capillary permeability, and microthrombi formation. The result is distributive shock with relative hypovolemia and maldistribution of blood flow. Lactate accumulates as tissues shift to anaerobic metabolism from hypoperfusion. Organ dysfunction manifests as acute kidney injury (oliguria), ARDS (refractory hypoxemia), hepatic dysfunction (coagulopathy, jaundice), and encephalopathy (altered mental status). The RN implements the sepsis bundle, manages fluid resuscitation and vasopressors, performs serial reassessments, and coordinates the interdisciplinary response."
    },
    riskFactors: [
      "Extremes of age (neonates, elderly >65)",
      "Immunocompromised status (neutropenia, transplant, biologics, HIV/AIDS)",
      "Diabetes mellitus",
      "Chronic kidney or liver disease",
      "Indwelling medical devices (CVC, Foley catheter, ventilator)",
      "Recent hospitalization or surgery",
      "Community sources: pneumonia (most common), UTI, abdominal infection, skin/soft tissue",
      "Long-term care facility residence"
    ],
    diagnostics: [
      "Obtain two sets of blood cultures (aerobic and anaerobic) from two sites BEFORE antibiotics",
      "Order stat serum lactate: ≥2 mmol/L indicates tissue hypoperfusion; ≥4 mmol/L = severe",
      "Calculate qSOFA score: RR ≥22, altered mentation, SBP ≤100 (≥2 = high risk)",
      "Calculate SOFA score for organ dysfunction severity",
      "Order CBC with differential, CMP, coagulation studies (PT/INR, fibrinogen)",
      "Obtain procalcitonin (>0.5 ng/mL suggests bacterial infection)",
      "Obtain source-specific cultures: urine, sputum, wound, CSF as indicated",
      "Order imaging to identify source: chest X-ray, CT abdomen, ultrasound"
    ],
    management: [
      "Implement the Surviving Sepsis Campaign 1-hour bundle: cultures, antibiotics, fluids, lactate, vasopressors",
      "Administer broad-spectrum antibiotics within 1 hour of recognition (de-escalate when cultures return)",
      "Administer 30 mL/kg IV crystalloid for hypotension or lactate ≥4 within first 3 hours",
      "Initiate norepinephrine via central line if MAP remains <65 mmHg after fluid resuscitation",
      "Reassess volume status with dynamic measures: passive leg raise, pulse pressure variation",
      "Target MAP ≥65 mmHg and urine output ≥0.5 mL/kg/hr",
      "Repeat lactate within 2-4 hours; target ≥10% decrease as marker of adequate resuscitation",
      "Implement lung-protective ventilation if ARDS develops (TV 6 mL/kg ideal body weight)"
    ],
    nursingActions: [
      "Recognize sepsis early using screening tools (qSOFA, SIRS criteria, clinical judgment)",
      "Obtain blood cultures from two sites before antibiotics; do not delay antibiotics for cultures",
      "Administer first antibiotic within 1 hour of sepsis recognition (time-zero documentation)",
      "Monitor hemodynamic response to fluid boluses: reassess BP, HR, urine output, lactate",
      "Perform passive leg raise test to assess fluid responsiveness before additional boluses",
      "Monitor central venous pressure (CVP) and ScvO2 if central line is in place",
      "Assess for signs of multi-organ dysfunction: AKI, ARDS, DIC, hepatic failure",
      "Document time of sepsis recognition and bundle completion for quality metrics"
    ],
    signs: {
      left: [
        "Fever >38.3°C or hypothermia <36°C",
        "Tachycardia (HR >90 bpm)",
        "Tachypnea (RR ≥22/min)",
        "Leukocytosis (>12,000) or leukopenia (<4,000)",
        "Elevated lactate ≥2 mmol/L",
        "Elevated procalcitonin",
        "Warm, bounding pulses (early distributive phase)"
      ],
      right: [
        "Hypotension refractory to fluids (septic shock)",
        "MAP <65 mmHg",
        "Oliguria or anuria (AKI)",
        "Altered mental status (septic encephalopathy)",
        "Mottled, cool extremities (late phase)",
        "Coagulopathy (DIC signs: petechiae, oozing, elevated D-dimer)",
        "Refractory hypoxemia (ARDS)"
      ]
    },
    medications: [
      { name: "Norepinephrine", type: "First-line vasopressor", action: "Alpha-1 agonist (vasoconstriction) with mild beta-1 effect (inotropy); raises MAP by increasing SVR", sideEffects: "Digital ischemia, arrhythmias, tissue necrosis with extravasation", contra: "Uncorrected hypovolemia (must attempt fluid resuscitation first)", pearl: "First-line vasopressor per SSC guidelines. Central line preferred. Start at 0.1-0.5 mcg/kg/min. Add vasopressin as second-line if norepinephrine >0.25-0.5 mcg/kg/min needed." },
      { name: "Vasopressin", type: "Second-line vasopressor", action: "V1 receptor agonist causing vasoconstriction independent of catecholamine receptors", sideEffects: "Digital ischemia, mesenteric ischemia, hyponatremia", contra: "Not used as sole vasopressor (adjunct to norepinephrine)", pearl: "Fixed dose of 0.03-0.04 units/min. Not titrated. Added when norepinephrine requirements are escalating. Allows norepinephrine dose reduction." },
      { name: "Hydrocortisone", type: "Corticosteroid", action: "Reverses relative adrenal insufficiency and enhances vascular responsiveness to catecholamines", sideEffects: "Hyperglycemia, immunosuppression, GI bleeding, myopathy", contra: "Not recommended unless vasopressor-dependent (escalating doses)", pearl: "200 mg/day IV (50 mg every 6 hours). Only indicated in refractory septic shock requiring escalating vasopressors. Helps wean vasopressors." },
      { name: "Meropenem", type: "Carbapenem (broad-spectrum antibiotic)", action: "Binds penicillin-binding proteins to inhibit cell wall synthesis; covers gram-positive, gram-negative, and anaerobes", sideEffects: "Seizures (lower threshold), diarrhea, C. difficile, hypersensitivity", contra: "Known carbapenem allergy, history of seizures (use with caution)", pearl: "Empiric choice for severe sepsis when MDR organisms or intra-abdominal source suspected. De-escalate based on culture sensitivity within 48-72 hours." }
    ],
    pearls: [
      "The Surviving Sepsis 1-hour bundle: Measure lactate, obtain blood cultures, administer broad-spectrum antibiotics, begin 30 mL/kg crystalloid for hypotension/lactate ≥4, apply vasopressors if MAP <65 after fluids",
      "Lactate clearance ≥10% in 2-4 hours is a key marker of adequate resuscitation",
      "Blood cultures should be obtained before antibiotics but should NEVER delay antibiotic administration beyond 1 hour",
      "Hypothermia in sepsis carries a higher mortality rate than fever and may indicate immune exhaustion",
      "The qSOFA score (RR ≥22, altered mentation, SBP ≤100) identifies patients at highest risk for poor outcomes"
    ],
    quiz: [
      { question: "A patient with sepsis receives 30 mL/kg of IV crystalloid but MAP remains 58 mmHg. What is the priority intervention?", options: ["Administer another fluid bolus of 30 mL/kg", "Start norepinephrine infusion via central line", "Switch to colloid fluids", "Obtain an echocardiogram"], correct: 1, rationale: "Per SSC guidelines, norepinephrine is the first-line vasopressor initiated when MAP remains <65 mmHg despite adequate fluid resuscitation (30 mL/kg)." },
      { question: "What is the significance of a lactate level of 4.5 mmol/L in sepsis?", options: ["It is within normal limits", "It indicates severe tissue hypoperfusion and high mortality risk", "It only matters if the patient has diabetes", "It should be rechecked in 24 hours"], correct: 1, rationale: "Lactate ≥4 mmol/L indicates severe tissue hypoperfusion with anaerobic metabolism. It is associated with significantly increased mortality and mandates aggressive resuscitation." },
      { question: "Which action takes priority when sepsis is recognized in a patient with an unknown organism?", options: ["Wait for culture results before starting antibiotics", "Administer broad-spectrum antibiotics within 1 hour", "Start vasopressors immediately", "Obtain CT scan of the chest"], correct: 1, rationale: "Broad-spectrum antibiotics must be administered within 1 hour of sepsis recognition. Each hour of delay increases mortality by ~7.6%. Cultures should be drawn before antibiotics but must not delay administration." }
    ]
  },

  "sepsis-management-np": {
    title: "Sepsis & Septic Shock: NP Prescriptive Management",
    cellular: {
      title: "Advanced Sepsis Immunopathology",
      content: "Sepsis pathogenesis involves a dual-phase immune response. The initial hyperinflammatory phase features activation of pattern recognition receptors (TLRs, NOD-like receptors) by PAMPs, triggering NF-κB-mediated cytokine release (TNF-alpha, IL-1β, IL-6). This cascade activates the complement system, coagulation cascade (tissue factor pathway), and endothelial dysfunction. Nitric oxide overproduction causes refractory vasodilation. Glycocalyx degradation increases capillary permeability. Subsequently, an immunosuppressive phase (immune paralysis) develops with lymphocyte apoptosis, monocyte deactivation, and increased susceptibility to secondary infections. Organ dysfunction is quantified by the SOFA score: a ≥2-point increase identifies sepsis. Septic shock is sepsis with vasopressor requirement to maintain MAP ≥65 and lactate >2 despite adequate fluid resuscitation. The NP orders the initial resuscitation protocol, prescribes empiric antimicrobials, initiates vasopressor therapy, identifies and controls the infectious source, and manages multi-organ support."
    },
    riskFactors: [
      "Extremes of age with immunosenescence",
      "Immunosuppression: neutropenia (ANC <500), solid organ transplant, biologics, chronic corticosteroids",
      "Diabetes mellitus with microvascular disease",
      "Chronic organ dysfunction (CKD, cirrhosis, COPD, heart failure)",
      "Healthcare-associated risk: central venous catheters, urinary catheters, mechanical ventilation",
      "Recent antibiotic exposure (selecting resistant organisms)",
      "Splenectomy or functional asplenia",
      "Substance use disorder (IVDU, alcohol use disorder)"
    ],
    diagnostics: [
      "Order sepsis panel: CBC/diff, CMP, lactate, procalcitonin, blood cultures x2, coagulation studies",
      "Order organ-specific biomarkers: troponin (myocardial dysfunction), lipase, hepatic panel",
      "Calculate SOFA score: PaO2/FiO2 ratio, platelet count, bilirubin, MAP/vasopressors, GCS, creatinine/UOP",
      "Order source-directed imaging: CT abdomen/pelvis with contrast, chest X-ray, ultrasound",
      "Obtain procalcitonin trending: >0.5 strongly suggests bacterial infection; useful for antibiotic de-escalation",
      "Order DIC panel if coagulopathy suspected: fibrinogen, D-dimer, PT/INR, peripheral smear for schistocytes",
      "Consider echocardiogram to assess for sepsis-induced cardiomyopathy (new LV dysfunction)",
      "Calculate predicted fluid responsiveness: pulse pressure variation, IVC ultrasound, passive leg raise"
    ],
    management: [
      "Order SSC 1-hour bundle: lactate, blood cultures, broad-spectrum antibiotics, 30 mL/kg crystalloid (if hypotensive/lactate ≥4), vasopressors (if MAP <65 post-fluids)",
      "Prescribe empiric antibiotics based on suspected source and local antibiogram: adjust within 48-72 hours based on culture sensitivity",
      "Prescribe norepinephrine 0.1-0.5 mcg/kg/min via CVC as first-line vasopressor; titrate to MAP ≥65",
      "Add vasopressin 0.03-0.04 units/min (fixed dose) as catecholamine-sparing agent if norepinephrine >0.25 mcg/kg/min",
      "Prescribe stress-dose hydrocortisone 200 mg/day IV if refractory shock despite dual vasopressors",
      "Order source control within 6-12 hours: surgical drainage, device removal, debridement",
      "Prescribe lung-protective ventilation if intubated: TV 6 mL/kg IBW, PEEP per ARDSNet table, plateau pressure <30",
      "Order renal replacement therapy (CRRT) for severe AKI with volume overload or metabolic derangements"
    ],
    nursingActions: [
      "Implement sepsis screening protocol with automated EHR alerts for early identification",
      "Prescribe initial empiric antimicrobial regimen covering likely pathogens based on source",
      "Assess fluid responsiveness using dynamic parameters before each bolus beyond initial resuscitation",
      "Order arterial line and central venous catheter for continuous hemodynamic monitoring",
      "Calculate and trend SOFA score every 6-12 hours to assess organ dysfunction trajectory",
      "Consider adding phenylephrine or epinephrine as third-line vasopressor in refractory shock",
      "Manage blood glucose with insulin infusion targeting 140-180 mg/dL (avoid tight glucose control)",
      "Coordinate goals of care discussion early if multi-organ failure progresses despite maximal therapy"
    ],
    signs: {
      left: [
        "SOFA score increase ≥2 from baseline",
        "qSOFA ≥2 (RR ≥22, AMS, SBP ≤100)",
        "Lactate ≥2 mmol/L (≥4 = severe)",
        "Procalcitonin >0.5 ng/mL",
        "Positive blood cultures",
        "Leukocytosis or leukopenia with bandemia",
        "Coagulopathy (elevated PT/INR, low fibrinogen)"
      ],
      right: [
        "Refractory hypotension (MAP <65 despite fluids and vasopressors)",
        "Lactate >4 with failure to clear despite resuscitation",
        "Multi-organ dysfunction (AKI + ARDS + hepatic failure)",
        "DIC with microangiopathic hemolytic anemia",
        "Sepsis-induced cardiomyopathy (new LV dysfunction)",
        "ARDS (PaO2/FiO2 <300)",
        "Immune paralysis phase (secondary nosocomial infections)"
      ]
    },
    medications: [
      { name: "Piperacillin-Tazobactam", type: "Beta-lactam/beta-lactamase inhibitor", action: "Broad-spectrum bactericidal activity against gram-positive, gram-negative, and anaerobes by inhibiting cell wall synthesis", sideEffects: "Hypersensitivity, seizures (high dose), cytopenias, C. difficile", contra: "Penicillin allergy (cross-reactivity), history of piperacillin-associated hepatitis", pearl: "Common empiric choice for undifferentiated sepsis. Consider extended infusion (4 hours) for improved pharmacodynamic coverage. De-escalate within 48-72 hours." },
      { name: "Vancomycin", type: "Glycopeptide antibiotic", action: "Inhibits cell wall synthesis in gram-positive organisms including MRSA", sideEffects: "Nephrotoxicity, red man syndrome (infusion-rate related), ototoxicity", contra: "Previous vancomycin-associated nephrotoxicity (consider alternatives: linezolid, daptomycin)", pearl: "Load with 25-30 mg/kg IV, then dose by AUC/MIC monitoring (target AUC 400-600). Always infuse over ≥1 hour to prevent red man syndrome." },
      { name: "Norepinephrine", type: "First-line vasopressor", action: "Potent alpha-1 agonist with mild beta-1 activity; increases SVR and MAP", sideEffects: "Peripheral and mesenteric ischemia, arrhythmias, extravasation necrosis", contra: "Not used until adequate volume resuscitation attempted", pearl: "SSC first-line vasopressor. Start 0.1 mcg/kg/min, titrate to MAP ≥65. If >0.5 mcg/kg/min required, add vasopressin and consider stress-dose steroids." },
      { name: "Vasopressin", type: "Non-catecholamine vasopressor", action: "Acts on V1 receptors in vascular smooth muscle; restores vascular tone through catecholamine-independent pathway", sideEffects: "Digital ischemia, splanchnic ischemia, hyponatremia, skin necrosis", contra: "Should not be used as single first-line agent", pearl: "Fixed dose 0.03-0.04 units/min — do NOT titrate. Added as catecholamine-sparing agent. Particularly useful when metabolic acidosis impairs catecholamine receptor response." }
    ],
    pearls: [
      "Sepsis-3 definition: life-threatening organ dysfunction (SOFA ≥2) caused by dysregulated host response to infection",
      "The SSC 1-hour bundle is associated with 20-30% reduction in mortality when fully completed within 1 hour",
      "Balanced crystalloids (lactated Ringer's) may be preferred over normal saline for large-volume resuscitation to avoid hyperchloremic acidosis",
      "Source control (drainage, debridement, device removal) within 6-12 hours is as critical as antibiotics",
      "Procalcitonin-guided antibiotic de-escalation can safely reduce antibiotic duration without increasing mortality"
    ],
    quiz: [
      { question: "A patient with septic shock on norepinephrine 0.4 mcg/kg/min has MAP 60 mmHg. What is the next vasopressor to add?", options: ["Dopamine", "Vasopressin 0.03-0.04 units/min", "Phenylephrine", "Dobutamine"], correct: 1, rationale: "Per SSC guidelines, vasopressin (0.03-0.04 units/min fixed dose) is the recommended second-line vasopressor added to norepinephrine. It works via a different receptor pathway and allows catecholamine dose reduction." },
      { question: "Which SOFA score change identifies sepsis per the Sepsis-3 definition?", options: ["Any SOFA score elevation", "SOFA score ≥2 increase from baseline", "SOFA score >10", "SOFA score decrease of 2 points"], correct: 1, rationale: "Sepsis-3 defines sepsis as suspected infection with a SOFA score increase of ≥2 points from baseline, reflecting acute organ dysfunction." },
      { question: "When should stress-dose hydrocortisone be initiated in septic shock?", options: ["In all sepsis cases on admission", "When vasopressor requirements are escalating despite adequate resuscitation", "Only after blood cultures return positive", "When lactate normalizes"], correct: 1, rationale: "Stress-dose hydrocortisone (200 mg/day) is reserved for septic shock refractory to fluids and vasopressors. It treats relative adrenal insufficiency and improves vasopressor responsiveness." }
    ]
  },

  "antibiotic-stewardship-rpn": {
    title: "Antibiotic Stewardship: RPN Fundamentals",
    cellular: {
      title: "Mechanisms of Antibiotic Resistance",
      content: "Antibiotic resistance develops through genetic mutations or horizontal gene transfer (plasmids, transposons, transformation) that allow bacteria to survive antibiotic exposure. Resistance mechanisms include: enzymatic inactivation (beta-lactamases destroying penicillins), altered target sites (PBP mutations in MRSA), efflux pumps (tetracycline resistance), reduced permeability (porin channel mutations in gram-negatives), and biofilm formation. Inappropriate antibiotic use (unnecessary prescribing, subtherapeutic dosing, incomplete courses) accelerates selection of resistant organisms. The RPN contributes to stewardship by administering antibiotics at the correct time, reporting adverse effects, and educating patients on adherence."
    },
    riskFactors: [
      "Unnecessary antibiotic prescribing for viral infections",
      "Incomplete antibiotic courses by patients",
      "Prolonged or repeated antibiotic exposure",
      "Use of broad-spectrum antibiotics when narrow-spectrum would suffice",
      "Healthcare-associated infections from resistant organisms",
      "Immunocompromised patients requiring frequent antibiotic courses",
      "Agricultural antibiotic overuse in food animals",
      "Patient self-medication with leftover antibiotics"
    ],
    diagnostics: [
      "Report fever patterns and trends to the nursing team",
      "Collect specimens for culture as ordered (urine, sputum, wound, blood) using proper technique",
      "Report signs of infection: redness, warmth, swelling, purulent drainage",
      "Monitor and report antibiotic side effects (GI upset, rash, diarrhea)",
      "Monitor for signs of C. difficile infection: watery diarrhea ≥3 episodes/day",
      "Report signs of allergic reaction: rash, hives, difficulty breathing"
    ],
    management: [
      "Administer antibiotics at the exact scheduled time as ordered",
      "Ensure specimens are collected BEFORE the first antibiotic dose when directed",
      "Administer the full course as ordered without skipping doses",
      "Report missed doses immediately to the RN",
      "Monitor IV antibiotic infusion rates and site integrity",
      "Educate patients on the importance of completing the full antibiotic course"
    ],
    nursingActions: [
      "Administer antibiotics within the ordered time window (typically within 30 minutes of scheduled time)",
      "Verify patient allergies before every antibiotic administration",
      "Collect cultures using aseptic technique before antibiotics when ordered",
      "Monitor for adverse effects and report: rash, diarrhea, oral thrush, anaphylaxis signs",
      "Report signs of C. difficile: watery diarrhea, abdominal cramping, fever",
      "Educate patients not to share antibiotics or save leftover medications",
      "Reinforce the importance of completing the full prescribed course even if feeling better",
      "Practice hand hygiene and infection prevention measures consistently"
    ],
    signs: {
      left: [
        "Persistent fever despite antibiotic therapy",
        "New-onset watery diarrhea (C. difficile risk)",
        "Rash or hives after antibiotic administration",
        "Oral thrush (fungal overgrowth)"
      ],
      right: [
        "Worsening infection signs despite antibiotics",
        "Severe diarrhea with abdominal pain (C. difficile)",
        "Anaphylaxis: urticaria, angioedema, bronchospasm",
        "Red man syndrome (vancomycin infusion too fast)"
      ]
    },
    medications: [
      { name: "Amoxicillin", type: "Aminopenicillin", action: "Inhibits bacterial cell wall synthesis by binding penicillin-binding proteins", sideEffects: "Diarrhea, rash, allergic reactions", contra: "Penicillin allergy, mononucleosis (causes rash)", pearl: "Common first-line narrow-spectrum antibiotic. Always verify penicillin allergy status. Administer as ordered and report any rash." },
      { name: "Ciprofloxacin", type: "Fluoroquinolone", action: "Inhibits DNA gyrase and topoisomerase IV, preventing bacterial DNA replication", sideEffects: "Tendon rupture, peripheral neuropathy, QT prolongation, C. difficile risk", contra: "Concurrent use with tizanidine, myasthenia gravis, children <18 (relative)", pearl: "Black box warning for tendinitis and tendon rupture. Report Achilles pain immediately. Reserved for infections without safer alternatives." },
      { name: "Metronidazole", type: "Nitroimidazole", action: "Forms toxic metabolites that damage bacterial DNA; effective against anaerobes and C. difficile", sideEffects: "Metallic taste, nausea, peripheral neuropathy, disulfiram-like reaction with alcohol", contra: "First trimester pregnancy, concurrent alcohol use", pearl: "Educate patients about the severe disulfiram-like reaction with alcohol: avoid alcohol during treatment and for 48 hours after completion." }
    ],
    pearls: [
      "Always verify antibiotic allergies before the first dose and with each subsequent administration",
      "Time-sensitive antibiotics (those ordered every 6 or 8 hours) must be given on schedule to maintain therapeutic levels",
      "New-onset diarrhea during antibiotic therapy may indicate C. difficile infection — report immediately",
      "Cultures must be collected BEFORE antibiotic administration to avoid false-negative results",
      "Hand hygiene is the single most important intervention for preventing healthcare-associated infections"
    ],
    quiz: [
      { question: "When should cultures be collected relative to antibiotic administration?", options: ["After the second dose of antibiotics", "Before the first dose of antibiotics", "It does not matter when cultures are collected", "Only if the patient develops a fever"], correct: 1, rationale: "Cultures must be collected BEFORE the first antibiotic dose to avoid false-negative results. Antibiotics can suppress bacterial growth in culture media." },
      { question: "A patient on antibiotics develops three episodes of watery diarrhea in 12 hours. What should the RPN report?", options: ["This is a normal side effect that requires no action", "Report possible C. difficile infection to the RN immediately", "Increase the patient's fluid intake and continue monitoring", "Hold all medications until the diarrhea resolves"], correct: 1, rationale: "Three or more episodes of watery diarrhea during antibiotic therapy is suspicious for C. difficile infection, which requires immediate reporting, testing, and potential isolation." },
      { question: "Why is it important to administer antibiotics at the scheduled time?", options: ["For documentation purposes only", "To maintain therapeutic drug levels and ensure effectiveness", "Hospital policy requires it but it has no clinical impact", "Patients prefer a regular medication schedule"], correct: 1, rationale: "Maintaining consistent antibiotic levels above the minimum inhibitory concentration (MIC) is essential for killing bacteria. Delayed or missed doses allow bacterial regrowth and can promote resistance." }
    ]
  },

  "antibiotic-stewardship-rn": {
    title: "Antibiotic Stewardship: RN Clinical Practice",
    cellular: {
      title: "Pharmacodynamics of Antibiotic Resistance",
      content: "Antibiotic stewardship encompasses systematic strategies to optimize antimicrobial use, improve patient outcomes, and reduce the emergence of resistant organisms. Bacteria develop resistance through multiple mechanisms: beta-lactamase production (ESBL, carbapenemases) hydrolyzes the beta-lactam ring; mecA gene in MRSA alters penicillin-binding protein (PBP2a), preventing beta-lactam binding; vanA gene cluster in VRE modifies the D-Ala-D-Ala target to D-Ala-D-Lac; and efflux pumps actively expel antibiotics from the cell. Pharmacodynamic principles guide dosing: time-dependent antibiotics (beta-lactams) require sustained levels above MIC, while concentration-dependent antibiotics (aminoglycosides, fluoroquinolones) require high peak concentrations. The RN plays a critical role in stewardship through timely administration, culture collection technique, monitoring therapeutic drug levels, recognizing adverse effects, coordinating antibiotic timeout reviews, and patient education."
    },
    riskFactors: [
      "Broad-spectrum antibiotic use without culture guidance",
      "Prolonged antibiotic courses beyond recommended duration",
      "Empiric therapy not de-escalated after culture results",
      "Poor infection control practices in healthcare facilities",
      "Antibiotic prescribing for non-bacterial infections (viral URI, viral bronchitis)",
      "Subtherapeutic dosing (levels below MIC)",
      "Prior antibiotic exposure within 90 days",
      "ICU admission with MDR organism colonization"
    ],
    diagnostics: [
      "Obtain cultures using proper aseptic technique from the correct site before antibiotics",
      "Interpret culture and sensitivity reports to identify effective narrow-spectrum alternatives",
      "Monitor therapeutic drug levels (vancomycin AUC/MIC, aminoglycoside peak/trough)",
      "Assess procalcitonin trends for antibiotic de-escalation decisions",
      "Monitor CBC with differential: resolving leukocytosis indicates treatment response",
      "Evaluate CRP trends as adjunctive marker of infection resolution",
      "Monitor renal function (creatinine, BUN) for dose-adjusted antibiotics"
    ],
    management: [
      "Participate in antimicrobial stewardship rounds and 48-72 hour antibiotic timeout reviews",
      "Advocate for de-escalation from broad-spectrum to targeted therapy once cultures return",
      "Ensure timed antibiotic administration: time-dependent antibiotics require sustained levels, concentration-dependent require peak levels",
      "Implement IV-to-PO conversion per protocol when patient meets criteria (tolerating oral intake, improving clinically)",
      "Monitor for and report antibiotic-associated complications: C. difficile, drug fever, cytopenias",
      "Calculate and verify appropriate dosing based on renal function for renally-cleared antibiotics",
      "Ensure adequate duration: avoid both insufficient and excessive antibiotic courses",
      "Implement contact isolation for patients with MDR organisms (MRSA, VRE, ESBL, CRE)"
    ],
    nursingActions: [
      "Verify allergy status and cross-reactivity risk before each antibiotic course initiation",
      "Draw peak and trough levels at correct times for therapeutic drug monitoring",
      "Perform 48-72 hour antibiotic reassessment: is the antibiotic still indicated? Can it be narrowed?",
      "Monitor IV access site for signs of phlebitis or extravasation with vesicant antibiotics",
      "Educate patients on expected course duration and importance of not self-discontinuing",
      "Coordinate with pharmacy for antimicrobial dose optimization (extended infusions, renal adjustments)",
      "Implement appropriate isolation precautions based on organism type",
      "Document antibiotic start time, infusion duration, and any adverse reactions"
    ],
    signs: {
      left: [
        "Clinical improvement: decreasing fever, WBC normalization",
        "Negative repeat cultures",
        "Improving inflammatory markers (CRP, procalcitonin)",
        "Resolution of localizing signs (wound healing, clear sputum)"
      ],
      right: [
        "Treatment failure: persistent or worsening fever",
        "Positive cultures with resistant organism",
        "C. difficile infection (new watery diarrhea)",
        "Drug fever (fever onset coinciding with antibiotic timeline)",
        "Nephrotoxicity (rising creatinine with vancomycin or aminoglycosides)",
        "Red man syndrome (histamine release from rapid vancomycin infusion)",
        "Bone marrow suppression (neutropenia with prolonged beta-lactam use)"
      ]
    },
    medications: [
      { name: "Vancomycin", type: "Glycopeptide", action: "Inhibits cell wall synthesis by binding D-Ala-D-Ala terminus of peptidoglycan precursors; effective against MRSA and gram-positive organisms", sideEffects: "Nephrotoxicity, ototoxicity, red man syndrome, neutropenia", contra: "No absolute contraindications; use with caution in renal impairment", pearl: "AUC-guided dosing (target 400-600 mg*hr/L) replacing trough-based monitoring. Infuse over ≥1 hour (≥2 hours if dose >1g). Red man syndrome is histamine-mediated, not allergy — slow the rate." },
      { name: "Piperacillin-Tazobactam", type: "Extended-spectrum penicillin + beta-lactamase inhibitor", action: "Broad-spectrum bactericidal against gram-positives, gram-negatives, and anaerobes", sideEffects: "Hypersensitivity, seizures (high dose), leukopenia, C. difficile", contra: "Penicillin allergy (assess severity: anaphylaxis vs. mild reaction)", pearl: "Extended infusion (4 hours) improves time above MIC and clinical outcomes. De-escalate within 48-72 hours based on culture results." },
      { name: "Gentamicin", type: "Aminoglycoside", action: "Binds 30S ribosomal subunit, causing misreading of mRNA and bactericidal activity; concentration-dependent killing", sideEffects: "Nephrotoxicity, ototoxicity (vestibular and cochlear), neuromuscular blockade", contra: "Myasthenia gravis, concurrent ototoxic or nephrotoxic agents", pearl: "Once-daily (extended-interval) dosing maximizes peak concentrations and bacterial killing. Monitor renal function daily. Trough must be <1 mcg/mL to prevent accumulation toxicity." },
      { name: "Oral Vancomycin/Fidaxomicin", type: "C. difficile targeted therapy", action: "Vancomycin: direct intraluminal activity against C. difficile; Fidaxomicin: narrower spectrum with lower recurrence rate", sideEffects: "Nausea, abdominal pain (both); minimal systemic absorption", contra: "None absolute for C. difficile indication", pearl: "Oral vancomycin 125 mg QID x10 days is first-line for C. difficile. Fidaxomicin has lower recurrence rates and is preferred for recurrent episodes. IV metronidazole is added for fulminant disease." }
    ],
    pearls: [
      "Red man syndrome is NOT a true allergy — it is a histamine-mediated reaction from rapid vancomycin infusion. Slow the rate and premedicate with diphenhydramine",
      "The 48-72 hour antibiotic timeout is a stewardship cornerstone: reassess indication, narrow spectrum, plan duration",
      "Extended-infusion beta-lactams (e.g., 4-hour piperacillin-tazobactam) improve pharmacodynamic outcomes compared to 30-minute infusions",
      "Procalcitonin <0.25 ng/mL supports safe antibiotic discontinuation in lower respiratory infections",
      "MRSA nasal swab PCR (negative predictive value >95%) can be used to de-escalate empiric vancomycin"
    ],
    quiz: [
      { question: "A patient develops diffuse flushing and pruritus during a vancomycin infusion. What is the priority action?", options: ["Stop vancomycin permanently and document allergy", "Slow the infusion rate and administer diphenhydramine", "Increase the infusion rate to complete the dose faster", "Switch to oral vancomycin"], correct: 1, rationale: "This describes red man syndrome, a histamine-mediated reaction from rapid vancomycin infusion. Slowing the rate and administering an antihistamine resolves symptoms. It is not a true allergy." },
      { question: "What is the purpose of the 48-72 hour antibiotic timeout?", options: ["To automatically discontinue all antibiotics", "To reassess indication, narrow spectrum based on cultures, and plan duration", "To switch all IV antibiotics to oral", "To verify insurance coverage for continued antibiotic use"], correct: 1, rationale: "The antibiotic timeout is a structured reassessment at 48-72 hours to determine if antibiotics are still indicated, if the spectrum can be narrowed based on culture results, and what the planned duration should be." },
      { question: "Why is extended-infusion (4-hour) piperacillin-tazobactam preferred over standard 30-minute infusion?", options: ["It reduces medication cost", "It maximizes time above MIC for this time-dependent antibiotic", "It reduces the risk of allergic reaction", "It allows faster patient discharge"], correct: 1, rationale: "Beta-lactams are time-dependent antibiotics requiring sustained levels above the MIC. Extended infusion over 4 hours maintains therapeutic levels longer, improving clinical outcomes." }
    ]
  },

  "antibiotic-stewardship-np": {
    title: "Antibiotic Stewardship: NP Prescriptive Practice",
    cellular: {
      title: "Advanced Antimicrobial Pharmacology and Resistance Genomics",
      content: "Antibiotic stewardship at the NP prescriptive level requires deep understanding of resistance mechanisms, pharmacokinetic/pharmacodynamic (PK/PD) optimization, and evidence-based prescribing. Key resistance mechanisms include: ESBL-producing Enterobacterales (plasmid-mediated CTX-M enzymes hydrolyzing third-generation cephalosporins), carbapenem-resistant Enterobacterales (CRE via KPC, NDM, OXA-48 enzymes), MRSA (mecA gene encoding PBP2a with reduced beta-lactam affinity), and vancomycin-resistant Enterococcus (vanA/vanB gene clusters). PK/PD targets drive dosing: time-dependent antibiotics (beta-lactams) target fT>MIC >40-70%, concentration-dependent antibiotics (aminoglycosides) target Cmax/MIC >10, and AUC-dependent antibiotics (vancomycin, fluoroquinolones) target AUC/MIC ratios. The NP must select empiric therapy based on local antibiograms, optimize dosing using PK/PD principles, de-escalate based on culture data, determine appropriate duration, and implement stewardship quality metrics."
    },
    riskFactors: [
      "Healthcare-associated infections with MDR organisms (MRSA, VRE, ESBL, CRE)",
      "Prior antibiotic exposure within 90 days (strongest predictor of resistance)",
      "ICU admission with invasive devices",
      "Travel to regions with high endemic resistance (South/Southeast Asia for CRE)",
      "Known colonization with resistant organisms",
      "Immunosuppression requiring prophylactic antibiotics",
      "Structural lung disease with chronic Pseudomonas colonization",
      "Recurrent UTIs with prior fluoroquinolone exposure"
    ],
    diagnostics: [
      "Order appropriate cultures with susceptibility testing before empiric therapy",
      "Interpret antibiogram data to guide empiric prescribing for the institution",
      "Order rapid diagnostic panels (BCID, respiratory panels) when available for faster pathogen identification",
      "Order therapeutic drug monitoring: vancomycin AUC/MIC (target 400-600), aminoglycoside peak/trough",
      "Order procalcitonin for antibiotic initiation and de-escalation decisions",
      "Interpret MIC breakpoints and CLSI susceptibility categories (S, I, R) for dosing decisions",
      "Order MRSA nasal swab PCR to guide vancomycin de-escalation (NPV >95%)",
      "Order beta-D-glucan and galactomannan for invasive fungal infection workup when needed"
    ],
    management: [
      "Prescribe empiric antibiotics based on local antibiogram, suspected source, severity, and risk factors for MDR organisms",
      "Apply PK/PD optimization: extended infusions for beta-lactams, high-dose for concentration-dependent agents",
      "De-escalate to narrowest effective spectrum within 48-72 hours based on culture sensitivity",
      "Prescribe evidence-based duration: pneumonia 5-7 days, UTI 3-5 days (uncomplicated), skin/soft tissue 5-7 days, bacteremia 7-14 days (source-dependent)",
      "Implement outpatient parenteral antibiotic therapy (OPAT) program for stable patients requiring IV antibiotics",
      "Prescribe antifungal prophylaxis for high-risk patients (neutropenic fever: micafungin or fluconazole)",
      "Order and interpret C. difficile toxin testing; prescribe vancomycin PO or fidaxomicin based on severity and recurrence history",
      "Implement allergy assessment protocol: verify penicillin allergy (>90% of reported penicillin allergies are not true allergies); consider skin testing referral"
    ],
    nursingActions: [
      "Lead antimicrobial stewardship program initiatives and quality improvement projects",
      "Develop institution-specific antibiotic prescribing guidelines and order sets",
      "Educate prescribers on evidence-based antibiotic duration and de-escalation",
      "Track stewardship metrics: days of therapy (DOT), antibiotic starts, de-escalation rates, C. difficile rates",
      "Participate in antimicrobial stewardship committee and Pharmacy & Therapeutics meetings",
      "Review antibiotic prescribing for compliance with stewardship guidelines",
      "Implement prospective audit with feedback for targeted antibiotic optimization",
      "Counsel patients on appropriate antibiotic expectations (viral infections do not require antibiotics)"
    ],
    signs: {
      left: [
        "Clinical response to therapy: defervescence within 48-72 hours",
        "Decreasing WBC and inflammatory markers (CRP, procalcitonin)",
        "Negative surveillance cultures",
        "Improving organ function (renal, hepatic)",
        "Successful source control"
      ],
      right: [
        "Treatment failure: persistent bacteremia at 48-72 hours",
        "Breakthrough infection with resistant organism",
        "C. difficile infection complicating antibiotic therapy",
        "Drug-induced organ toxicity (nephrotoxicity, hepatotoxicity)",
        "Superinfection with fungal organisms (candidiasis)",
        "Antibiotic-associated cytopenias",
        "Development of MDR organism during therapy"
      ]
    },
    medications: [
      { name: "Meropenem", type: "Carbapenem", action: "Ultra-broad-spectrum beta-lactam that resists most beta-lactamases; bactericidal against gram-positives, gram-negatives, and anaerobes", sideEffects: "Seizures (lower threshold), C. difficile, cytopenias, cross-reactivity (~1% with penicillin allergy)", contra: "Known carbapenem hypersensitivity, concurrent valproic acid (reduces levels by 60-90%)", pearl: "Reserve for ESBL infections, serious polymicrobial infections, or failed first-line therapy. Extended infusion (3 hours) optimizes fT>MIC. Critical interaction: reduces valproic acid levels dramatically." },
      { name: "Ceftaroline", type: "Fifth-generation cephalosporin", action: "Binds PBP2a (MRSA) and PBP2x (penicillin-resistant streptococci); only beta-lactam with MRSA activity", sideEffects: "Diarrhea, nausea, rash, positive direct Coombs test", contra: "Known cephalosporin hypersensitivity", pearl: "The only beta-lactam active against MRSA. Alternative to vancomycin for MRSA bacteremia or endocarditis with persistent positive cultures. FDA-approved for ABSSSI and community-acquired pneumonia." },
      { name: "Fidaxomicin", type: "Macrocyclic antibiotic (narrow-spectrum)", action: "Inhibits RNA polymerase in C. difficile with minimal disruption to normal flora", sideEffects: "Nausea, abdominal pain, GI hemorrhage (rare)", contra: "Hypersensitivity to fidaxomicin", pearl: "Preferred over oral vancomycin for recurrent C. difficile episodes due to lower recurrence rate (13% vs 27%). Narrow spectrum preserves intestinal microbiome." },
      { name: "Daptomycin", type: "Lipopeptide antibiotic", action: "Inserts into gram-positive cell membrane, causing rapid depolarization and cell death", sideEffects: "CPK elevation (myopathy), eosinophilic pneumonia, rhabdomyolysis", contra: "Pneumonia (surfactant inactivates daptomycin in the lungs)", pearl: "Alternative to vancomycin for MRSA bacteremia. Cannot use for pneumonia — inactivated by pulmonary surfactant. Monitor CPK weekly. Dose at 6-10 mg/kg for bacteremia/endocarditis." }
    ],
    pearls: [
      "Over 90% of reported penicillin allergies are not true IgE-mediated allergies — penicillin skin testing can safely expand treatment options",
      "Daptomycin is inactivated by pulmonary surfactant — never use for pneumonia regardless of MRSA susceptibility",
      "Meropenem reduces valproic acid levels by 60-90%, potentially causing seizure breakthrough — this combination must be avoided",
      "Procalcitonin-guided de-escalation reduces antibiotic duration by 2-3 days without affecting mortality in lower respiratory infections",
      "The antibiogram should be reviewed annually to guide empiric prescribing; a ≥10% change in susceptibility patterns may require guideline updates"
    ],
    quiz: [
      { question: "A patient with MRSA pneumonia is being treated with vancomycin. The provider considers switching to daptomycin. What is the concern?", options: ["Daptomycin has no MRSA activity", "Daptomycin is inactivated by pulmonary surfactant and cannot treat pneumonia", "Daptomycin requires hepatic dose adjustment", "There is no concern; the switch is appropriate"], correct: 1, rationale: "Daptomycin is inactivated by pulmonary surfactant, making it ineffective for pneumonia regardless of susceptibility results. Vancomycin or linezolid should be used for MRSA pneumonia." },
      { question: "Which PK/PD principle guides the use of extended-infusion beta-lactams?", options: ["Maximizing peak concentration to MIC ratio", "Maximizing the time that drug concentration remains above the MIC", "Minimizing the AUC/MIC ratio", "Achieving the highest possible trough level"], correct: 1, rationale: "Beta-lactams are time-dependent antibiotics. Their killing efficacy depends on maintaining drug levels above the MIC for the longest possible duration (fT>MIC). Extended infusions achieve this more effectively than bolus dosing." },
      { question: "An NP is prescribing empiric antibiotics for a patient with a UTI and a documented penicillin allergy (hives 20 years ago). What is the best approach?", options: ["Avoid all beta-lactams permanently", "Refer for penicillin skin testing to determine if a true allergy exists", "Prescribe a fluoroquinolone as first-line therapy", "Administer penicillin without any assessment"], correct: 1, rationale: "Over 90% of reported penicillin allergies are not true IgE-mediated reactions, especially remote reactions. Penicillin skin testing can safely confirm or rule out allergy, potentially expanding safe, effective treatment options." }
    ]
  }
};
