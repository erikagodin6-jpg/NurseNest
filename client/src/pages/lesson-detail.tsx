import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Microscope, 
  AlertCircle, 
  Stethoscope, 
  Pill, 
  Lightbulb, 
  FileText,
  CheckCircle2,
  XCircle,
  Trophy,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  quiz: { question: string; options: string[]; correct: number; rationale: string }[];
};

const contentMap: Record<string, LessonContent> = {
  "heart-failure": {
    title: "Heart Failure (HF)",
    cellular: {
      title: "Cellular Overstretch & Compensation",
      content: "At the RPN level, Heart Failure is a failure of cellular compensation. The Frank-Starling mechanism initially stretches myocardial fibers to increase contractility, but eventually loses elasticity. RAAS activation triggers sodium and water retention at the cellular level in the kidneys, increasing preload and hydrostatic pressure."
    },
    signs: {
      left: ["Dyspnea & Orthopnea", "Crackles (Pulmonary Edema)", "Paroxysmal nocturnal dyspnea", "Frothy Pink Sputum"],
      right: ["JVD (Jugular Vein Distension)", "Peripheral Edema", "Ascites", "Hepatomegaly"]
    },
    medications: [
      { name: "Furosemide (Lasix)", type: "Loop Diuretic", action: "Inhibits Na/Cl reabsorption", sideEffects: "Hypokalemia, Ototoxicity", contra: "Anuria", pearl: "Check Potassium levels first!" },
      { name: "Digoxin (Lanoxin)", type: "Cardiac Glycoside", action: "Positive inotrope, Negative chronotrope", sideEffects: "Bradycardia, Yellow halos", contra: "Pulse < 60 bpm", pearl: "Always check apical pulse for 60 seconds." },
      { name: "Metoprolol (Lopressor)", type: "Beta Blocker", action: "Decreases sympathetic stimulation", sideEffects: "Bradycardia, Fatigue", contra: "Asthma, Heart Block", pearl: "Masks signs of hypoglycemia!" }
    ],
    pearls: ["Daily weights (>2lb/day = bad)", "Sodium <2g/day", "Position in High-Fowler's"],
    quiz: [
      { question: "Which finding indicates Right-Sided HF?", options: ["Crackles", "Dyspnea", "Peripheral Edema", "Orthopnea"], correct: 2, rationale: "Right failure backs up into systemic circulation." }
    ]
  },
  "hypertension": {
    title: "Hypertension (HTN)",
    cellular: {
      title: "Vasoconstriction & Resistance",
      content: "Hypertension occurs when cellular damage to the endothelium leads to chronic vasoconstriction. The heart must pump against increased Systemic Vascular Resistance (SVR). Over time, this leads to LVH (Left Ventricular Hypertrophy) where cells thicken but lose efficiency."
    },
    signs: {
      left: ["Headache (Morning)", "Blurred Vision", "Tinnitus", "Epistaxis (Nosebleeds)"],
      right: ["Often Asymptomatic", "Chest Pain", "Dizziness", "Fatigue"]
    },
    medications: [
      { name: "Hydrochlorothiazide", type: "Thiazide Diuretic", action: "Distal tubule Na excretion", sideEffects: "Hypokalemia, Hyperglycemia", contra: "Sulfonamide allergy", pearl: "Take in the morning to avoid nocturia." },
      { name: "Lisinopril", type: "ACE Inhibitor", action: "Prevents Angiotensin II formation", sideEffects: "Dry Cough, Hyperkalemia, Angioedema", contra: "Pregnancy", pearl: "Notify provider if a persistent dry cough develops." },
      { name: "Amlodipine (Norvasc)", type: "Calcium Channel Blocker", action: "Relaxes vascular smooth muscle", sideEffects: "Peripheral Edema, Gingival Hyperplasia", contra: "Severe Hypotension", pearl: "Avoid grapefruit juice!" }
    ],
    pearls: ["DASH Diet (Low sodium, high K/Mg/Ca)", "Lifestyle is 1st line", "The 'Silent Killer'"],
    quiz: [
      { question: "Common side effect of ACE Inhibitors?", options: ["Headache", "Dry Cough", "Diarrhea", "Fever"], correct: 1, rationale: "Bradykinin buildup causes a chronic dry cough." }
    ]
  },
  "mi": {
    title: "Myocardial Infarction (MI)",
    cellular: {
      title: "Ischemia to Necrosis",
      content: "When oxygen supply is cut off, cardiac cells switch to anaerobic metabolism, producing lactic acid. This causes pain. If O2 isn't restored within 20-40 mins, irreversible cellular necrosis begins. Necrotic cells release enzymes like Troponin into the blood."
    },
    signs: {
      left: ["Crushing Chest Pain", "Pain radiating to jaw/arm", "Diaphoresis (Sweating)", "Nausea/Vomiting"],
      right: ["Shortness of breath", "Fatigue", "Heartburn sensation", "Weakness"]
    },
    medications: [
      { name: "Nitroglycerin", type: "Vasodilator", action: "Decreases preload/afterload", sideEffects: "Headache, Hypotension", contra: "Erectile Dysfunction meds (Sildenafil)", pearl: "Max 3 doses, 5 mins apart. Call EMS if pain persists after 1st dose." },
      { name: "Aspirin", type: "Anti-platelet", action: "Prevents further clotting", sideEffects: "GI Bleeding, Tinnitus", contra: "Active Bleeding", pearl: "Chew for faster absorption during acute event." },
      { name: "Atorvastatin (Lipitor)", type: "Statin", action: "Lowers LDL cholesterol", sideEffects: "Rhabdomyolysis (Muscle pain)", contra: "Liver Disease", pearl: "Report any unexplained muscle pain immediately." }
    ],
    pearls: ["MONA: Morphine, Oxygen, Nitroglycerin, Aspirin", "Time is Muscle", "Troponin is the gold standard lab"],
    quiz: [
      { question: "What is the primary action of Nitroglycerin?", options: ["Dissolve Clots", "Vasodilation", "Increase Heart Rate", "Stop Bleeding"], correct: 1, rationale: "It dilates veins and arteries to reduce heart workload." }
    ]
  },
  "afib": {
    title: "Atrial Fibrillation (AFib)",
    cellular: {
      title: "Electrical Chaos & Stasis",
      content: "AFib occurs when multiple ectopic foci in the atria fire rapidly and chaotically. This prevents organized atrial contraction ('atrial kick'). At the cellular level, the blood becomes stagnant in the atrial appendages, leading to high risk of thrombus (clot) formation."
    },
    signs: {
      left: ["Palpitations", "Irregular Pulse (Irregularly Irregular)", "Fatigue", "Dizziness"],
      right: ["Shortness of breath", "Chest Discomfort", "Exercise Intolerance", "Syncope"]
    },
    medications: [
      { name: "Diltiazem (Cardizem)", type: "Calcium Channel Blocker", action: "Slows ventricular rate", sideEffects: "Bradycardia, Hypotension", contra: "Heart Block", pearl: "Priority is rate control." },
      { name: "Warfarin (Coumadin)", type: "Anticoagulant", action: "Prevents clot formation", sideEffects: "Bleeding", contra: "Recent surgery", pearl: "Consistent Vitamin K intake is essential." },
      { name: "Apixaban (Eliquis)", type: "DOAC", action: "Factor Xa inhibitor", sideEffects: "Bleeding", contra: "Active major bleed", pearl: "No routine INR monitoring required." }
    ],
    pearls: ["Risk of Stroke is the biggest concern", "Rate control vs Rhythm control", "Assess for irregular apical pulse"],
    quiz: [
      { question: "What is the primary concern with AFib?", options: ["Heart Attack", "Stroke", "Diabetes", "Kidney Failure"], correct: 1, rationale: "Blood stasis in the atria leads to clots that can travel to the brain." }
    ]
  },
  "shock": {
    title: "Shock States",
    cellular: {
      title: "Global Hypoperfusion",
      content: "Shock is the ultimate failure of the cardiovascular system to provide oxygen at the cellular level. Whether from low volume (hypovolemic) or systemic vasodilation (septic), the result is anaerobic metabolism, cellular edema, and eventually Multiple Organ Dysfunction Syndrome (MODS)."
    },
    signs: {
      left: ["Hypotension (SBP < 90)", "Tachycardia", "Tachypnea", "Altered Mental Status"],
      right: ["Cool/Clammy Skin", "Decreased Urine Output (<30mL/hr)", "Weak Pulses", "Delayed Cap Refill"]
    },
    medications: [
      { name: "Norepinephrine (Levophed)", type: "Vasopressor", action: "Increases SVR and BP", sideEffects: "Extravasation necrosis", contra: "Hypovolemia (unfilled tank)", pearl: "Must fill the 'tank' with fluids first!" },
      { name: "Dopamine", type: "Inotrope/Vasopressor", action: "Dose-dependent BP/HR support", sideEffects: "Dysrhythmias", contra: "Pheochromocytoma", pearl: "Monitor infusion site for extravasation." },
      { name: "Lactated Ringers", type: "Isotonic Fluid", action: "Volume replacement", sideEffects: "Fluid overload", contra: "Liver failure", pearl: "Standard for initial resuscitation." }
    ],
    pearls: ["Recognition of 'Early/Compensated' vs 'Progressive' shock", "Urine output is the best indicator of organ perfusion", "Septic Shock: Early antibiotics are vital"],
    quiz: [
      { question: "First priority in Hypovolemic Shock?", options: ["Vasopressors", "Fluid Resuscitation", "Antibiotics", "Oxygen"], correct: 1, rationale: "You must replace the volume before using drugs to squeeze the vessels." }
    ]
  },
  "angina": {
    title: "Angina Pectoris",
    cellular: {
      title: "Supply vs Demand Mismatch",
      content: "Angina occurs when myocardial oxygen demand exceeds the supply. This usually happens due to fixed atherosclerotic plaques. Cells become ischemic but not yet necrotic. Rest or nitroglycerin restores the balance by reducing demand or increasing supply."
    },
    signs: {
      left: ["Chest Pain (Pressure/Squeezing)", "Stable: Triggered by exertion, relieved by rest", "Unstable: New onset or occurs at rest", "Radiating pain to left arm"],
      right: ["Shortness of breath", "Nausea", "Fatigue", "Sweating"]
    },
    medications: [
      { name: "Nitroglycerin (Nitrostat)", type: "Nitrate", action: "Vasodilation", sideEffects: "Headache, Flushing", contra: "Hypotension", pearl: "Keep in dark, original glass bottle." },
      { name: "Metoprolol", type: "Beta Blocker", action: "Decreases heart O2 demand", sideEffects: "Bradycardia", contra: "Heart Block", pearl: "Used for long-term management." }
    ],
    pearls: ["Unstable Angina = Medical Emergency", "Stable Angina follows a predictable pattern", "Teach patient to stop activity when pain occurs"],
    quiz: [
      { question: "Difference between Stable and Unstable Angina?", options: ["Pain intensity", "Relief by rest", "Age of patient", "Location of pain"], correct: 1, rationale: "Stable angina is relieved by rest; unstable occurs at rest or is unpredictable." }
    ]
  },
  "pulmonary-edema": {
    title: "Pulmonary Edema",
    cellular: {
      title: "Alveolar Capillary Leak",
      content: "Pulmonary edema occurs when the pressure in the pulmonary capillaries becomes so high that fluid is forced out of the cellular walls and into the alveoli. This barrier prevents oxygen from crossing into the bloodstream, leading to acute hypoxia."
    },
    signs: {
      left: ["Extreme Dyspnea", "Frothy Pink-Tinged Sputum", "Anxiety/Apprehension", "Gasping for breath"],
      right: ["Tachycardia", "Cyanosis", "Cold/Clammy Skin", "Crackles at lung bases"]
    },
    medications: [
      { name: "Furosemide (Lasix)", type: "Diuretic", action: "Rapid fluid removal", sideEffects: "Hypotension, Ototoxicity", contra: "Anuria", pearl: "Administer IV push slowly (20mg/min) to avoid ototoxicity." },
      { name: "Morphine Sulfate", type: "Opioid/Vasodilator", action: "Reduces preload/anxiety", sideEffects: "Respiratory Depression", contra: "Head injury", pearl: "Helps with air hunger and reduces venous return." },
      { name: "Oxygen", type: "Gas", action: "Improves alveolar exchange", sideEffects: "Dryness", contra: "None in acute distress", pearl: "Non-rebreather or CPAP may be required." }
    ],
    pearls: ["High-Fowler's position IMMEDIATELY", "Monitor ABGs", "Keep emergency equipment at bedside"],
    quiz: [
      { question: "What is the classic sputum finding in Pulmonary Edema?", options: ["Yellow thick sputum", "Greenish phlegm", "Frothy pink-tinged", "Rust colored"], correct: 2, rationale: "Frothy pink sputum is the classic sign of acute pulmonary edema." }
    ]
  },
  "pe": {
    title: "Pulmonary Embolism (PE)",
    cellular: {
      title: "Ventilation-Perfusion (V/Q) Mismatch",
      content: "A clot blocks blood flow to a section of the lung. While air can still enter (ventilation), blood cannot reach the area (perfusion). This V/Q mismatch means gas exchange cannot occur at the cellular interface of the alveoli, causing rapid hypoxia."
    },
    signs: {
      left: ["Sudden Onset Dyspnea", "Sharp Chest Pain", "Tachycardia", "Apprehension"],
      right: ["Cough", "Hemoptysis", "Tachypnea", "Low O2 Saturation"]
    },
    medications: [
      { name: "Heparin", type: "Anticoagulant", action: "Prevents clot growth", sideEffects: "Bleeding, HIT", contra: "Active bleed", pearl: "Monitor aPTT levels (Normal: 30-40s; Goal: 1.5-2.5x normal)." },
      { name: "Enoxaparin (Lovenox)", type: "LMWH", action: "Anticoagulation", sideEffects: "Bleeding", contra: "Renal failure (adjust dose)", pearl: "Inject in love handles, do not rub injection site!" },
      { name: "Warfarin (Coumadin)", type: "Anticoagulant", action: "Vitamin K antagonist", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Monitor INR (Goal 2.0-3.0). Antidote: Vitamin K." }
    ],
    pearls: ["SUDDEN dyspnea is the red flag", "DVT prevention is PE prevention", "Elevate HOB immediately"],
    quiz: [
      { question: "What is the most common classic symptom of PE?", options: ["Fever", "Sudden shortness of breath", "Productive cough", "Bradycardia"], correct: 1, rationale: "Sudden onset dyspnea is the most common presenting symptom of PE." }
    ]
  },
  "diabetes-t1": {
    title: "Diabetes Type 1",
    cellular: {
      title: "Autoimmune Beta-Cell Destruction",
      content: "T-cells attack and destroy the insulin-producing beta cells in the Islets of Langerhans. Without insulin, glucose cannot enter the cells to produce energy. Cells starve while blood sugar remains high."
    },
    signs: {
      left: ["Polyuria (Increased urine)", "Polydipsia (Thirst)", "Polyphagia (Hunger)", "Weight Loss"],
      right: ["Fatigue", "Blurred Vision", "Irritability", "Weakness"]
    },
    medications: [
      { name: "Insulin Lispro (Humalog)", type: "Rapid-acting", action: "Onset 15m, Peak 1h, Duration 3h", sideEffects: "Hypoglycemia", contra: "None", pearl: "Must have food ready within 15 mins!" },
      { name: "Insulin Regular (Humulin R)", type: "Short-acting", action: "Onset 30m, Peak 2-4h, Duration 5-7h", sideEffects: "Hypoglycemia", contra: "None", pearl: "Only insulin given IV." },
      { name: "Insulin NPH", type: "Intermediate-acting", action: "Onset 2h, Peak 4-12h, Duration 16h", sideEffects: "Hypoglycemia", contra: "None", pearl: "Cloudy insulin, roll to mix." }
    ],
    pearls: ["Rotation of sites prevents lipodystrophy", "Hypoglycemia is <4.0 mmol/L", "Always requires insulin"],
    quiz: [
      { question: "Onset time for Rapid-Acting insulin?", options: ["5-15 mins", "30-60 mins", "2-4 hours", "Never"], correct: 0, rationale: "Rapid-acting insulin starts working very quickly." }
    ]
  },
  "diabetes-t2": {
    title: "Diabetes Type 2",
    cellular: {
      title: "Insulin Resistance",
      content: "In Type 2, the cells become resistant to the action of insulin. The pancreas initially overproduces insulin to compensate, but eventually, the beta cells become 'tired' and production drops. At the cellular level, the insulin receptor site is blocked or unresponsive."
    },
    signs: {
      left: ["Often Asymptomatic for years", "Slow healing wounds", "Recurring infections", "Fatigue"],
      right: ["Blurred Vision", "Paresthesia (Numbness)", "Dark skin patches (Acanthosis nigricans)", "Weight gain"]
    },
    medications: [
      { name: "Metformin (Glucophage)", type: "Biguanide", action: "Decreases liver glucose production", sideEffects: "GI Upset, Lactic Acidosis", contra: "Renal failure", pearl: "Hold 48h before and after IV contrast!" },
      { name: "Glyburide", type: "Sulfonylurea", action: "Stimulates pancreas to release insulin", sideEffects: "Hypoglycemia", contra: "Type 1 Diabetes", pearl: "Watch for severe hypoglycemia." },
      { name: "Sitagliptin (Januvia)", type: "DPP-4 Inhibitor", action: "Enhances incretin hormones", sideEffects: "Pancreatitis", contra: "Renal impairment", pearl: "Low risk of hypoglycemia." }
    ],
    pearls: ["Lifestyle modification is first-line", "Foot care is vital", "Monitor HgbA1c (Goal < 7.0%)"],
    quiz: [
      { question: "Priority teaching for Metformin?", options: ["Take with food", "Hold for IV contrast", "Take at bedtime", "Only for Type 1"], correct: 1, rationale: "Metformin + IV contrast increases risk of lactic acidosis and renal failure." }
    ]
  },
  "dka": {
    title: "Diabetic Ketoacidosis (DKA)",
    cellular: {
      title: "Ketone Production & Acidosis",
      content: "When cells can't get glucose, the body breaks down fat for energy. This produces ketones (acidic). At the cellular level, the blood becomes acidic, and high sugar causes osmotic diuresis, leading to severe cellular dehydration and potassium shifts."
    },
    signs: {
      left: ["Kussmaul Respirations (Rapid/Deep)", "Fruity Breath", "Blood Glucose >16.7", "Ketones in Urine"],
      right: ["Nausea/Vomiting", "Abdominal Pain", "Altered Mental Status", "Dehydration"]
    },
    medications: [
      { name: "Regular Insulin", type: "Short-acting", action: "Lower BG & switch off fat breakdown", sideEffects: "Hypoglycemia, Hypokalemia", contra: "Hypoglycemia", pearl: "Monitor Potassium carefully as it drops with insulin." },
      { name: "0.9% Normal Saline", type: "Isotonic Fluid", action: "Rehydration", sideEffects: "Fluid overload", contra: "HF", pearl: "Priority is rehydration (1-2 liters/hr initially)." },
      { name: "Potassium Chloride", type: "Electrolyte", action: "Replace K+ lost in urine", sideEffects: "Hyperkalemia", contra: "Renal failure", pearl: "Never give IV push! Must be diluted." }
    ],
    pearls: ["Priority: Hydration, then Insulin, then K+ replacement", "Watch Potassium like a hawk!", "Hourly BG monitoring"],
    quiz: [
      { question: "Priority intervention for DKA?", options: ["Insulin", "Normal Saline", "Potassium", "Food"], correct: 1, rationale: "Rehydration is the first priority to stabilize BP and perfusion." }
    ]
  },
  "hhs": {
    title: "Hyperglycemic Hyperosmolar State (HHS)",
    cellular: {
      title: "Severe Hyperosmolarity",
      content: "Unlike DKA, HHS patients have enough insulin to prevent ketone formation but not enough to control blood glucose. BG levels can exceed 33 mmol/L. At the cellular level, the extreme high sugar pulls water out of the cells, causing profound intracellular dehydration."
    },
    signs: {
      left: ["Blood Glucose > 33.3 mmol/L", "Severe Dehydration", "Altered Consciousness", "Negative Ketones"],
      right: ["Polyuria", "Tachycardia", "Hypotension", "Dry Mucous Membranes"]
    },
    medications: [
      { name: "0.45% Normal Saline", type: "Hypotonic Fluid", action: "Intracellular rehydration", sideEffects: "Cerebral edema", contra: "Hypotension (use NS first)", pearl: "Used after initial volume is restored with NS." },
      { name: "Regular Insulin", type: "Short-acting", action: "Lower BG slowly", sideEffects: "Hypoglycemia", contra: "None", pearl: "BG should be lowered gradually to avoid cerebral edema." }
    ],
    pearls: ["Rehydration is the TOP priority", "Seen most in Type 2 Diabetes", "Monitor for neurological changes during treatment"],
    quiz: [
      { question: "Difference between DKA and HHS?", options: ["BG levels", "Presence of Ketones", "Patient age", "Fluid used"], correct: 1, rationale: "HHS has little to no ketones; DKA has high ketones and acidosis." }
    ]
  },
  "stroke": {
    title: "Ischemic Stroke",
    cellular: {
      title: "The Ischemic Penumbra",
      content: "A clot blocks blood flow. The core area dies quickly. The surrounding area (penumbra) is at risk but salvageable if blood flow is restored quickly. Cellular pumps fail, causing neurons to swell and die."
    },
    signs: {
      left: ["Facial Drooping", "Arm Weakness", "Speech Difficulty (BEFAST)", "Sudden Vision Loss"],
      right: ["Unilateral Neglect", "Impulsive Behavior", "Spatial-Perceptual deficits", "Headache"]
    },
    medications: [
      { name: "tPA (Alteplase)", type: "Thrombolytic", action: "Dissolves the clot", sideEffects: "Severe Bleeding", contra: "Recent surgery (<14 days), bleeding risk", pearl: "Give within 3-4.5 hours of Last Known Well." },
      { name: "Aspirin", type: "Anti-platelet", action: "Prevents future clots", sideEffects: "GI Bleed", contra: "Active Bleeding", pearl: "Started 24-48h AFTER tPA or immediately if no tPA." },
      { name: "Nimodipine", type: "CCB (Neuro specific)", action: "Prevents vasospasm", sideEffects: "Hypotension", contra: "Hypersensitivity", pearl: "Commonly used in hemorrhagic stroke (subarachnoid)." }
    ],
    pearls: ["TIME is BRAIN", "CT Scan (non-contrast) 1st to rule out hemorrhage", "Keep HOB at 30 degrees"],
    quiz: [
      { question: "First thing to do for suspected stroke?", options: ["Give Aspirin", "CT Scan", "Start tPA", "Draw Labs"], correct: 1, rationale: "Must rule out a bleed before giving any blood thinners." }
    ]
  },
  "tia": {
    title: "TIA (Transient Ischemic Attack)",
    cellular: {
      title: "Temporary Ischemia",
      content: "A TIA is a 'warning stroke.' A clot temporarily blocks blood flow, but the body's natural fibrinolytic system dissolves it before permanent cellular death (infarction) occurs. However, it signals that the cellular environment is high-risk for a major stroke."
    },
    signs: {
      left: ["Sudden temporary weakness", "Numbness", "Loss of vision", "Slurred speech"],
      right: ["Symptoms resolve within 24 hours (usually <1 hour)", "No permanent damage on imaging", "Dizziness", "Confusion"]
    },
    medications: [
      { name: "Clopidogrel (Plavix)", type: "Anti-platelet", action: "Prevents platelet aggregation", sideEffects: "Bleeding, Thrombocytopenia", contra: "Active bleed", pearl: "Stop 5-7 days before surgery." },
      { name: "Atorvastatin", type: "Statin", action: "Plaque stabilization", sideEffects: "Muscle pain", contra: "Liver disease", pearl: "Reduces risk of future stroke." }
    ],
    pearls: ["Treat as a medical emergency even if symptoms resolve", "High risk of stroke within 90 days", "Lifestyle changes are critical"],
    quiz: [
      { question: "What defines a TIA?", options: ["Permanent brain damage", "Symptoms lasting >24h", "Temporary symptoms <24h", "Only happens in children"], correct: 2, rationale: "TIA symptoms are temporary and usually resolve within an hour." }
    ]
  },
  "dvt": {
    title: "Deep Vein Thrombosis (DVT)",
    cellular: {
      title: "Virchow's Triad",
      content: "DVT formation relies on three cellular conditions: 1. Stasis (slow blood flow), 2. Endothelial injury (vessel wall damage), and 3. Hypercoagulability (thick blood). At the cellular level, platelets and fibrin trap red blood cells, forming a growing thrombus."
    },
    signs: {
      left: ["Unilateral Calf Swelling", "Warmth", "Redness (Erythema)", "Tenderness/Pain"],
      right: ["Positive D-dimer lab", "Positive Doppler Ultrasound", "Fever", "Fatigue"]
    },
    medications: [
      { name: "Enoxaparin (Lovenox)", type: "Anticoagulant", action: "Prevents clot extension", sideEffects: "Bleeding", contra: "HIT history", pearl: "Antidote: Protamine Sulfate." },
      { name: "Warfarin", type: "Anticoagulant", action: "Vitamin K antagonist", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Overlap with Heparin until INR is 2.0-3.0." }
    ],
    pearls: ["Do NOT massage the area (risk of PE)", "Bed rest initially, then ambulation as tolerated", "Compression stockings for prevention"],
    quiz: [
      { question: "Biggest risk factor for DVT?", options: ["Immobility", "High sugar", "Exercise", "Drinking water"], correct: 0, rationale: "Immobility leads to venous stasis, a key part of Virchow's Triad." }
    ]
  },
  "pvd": {
    title: "Peripheral Vascular Disease (PVD)",
    cellular: {
      title: "Arterial vs Venous Pathophysiology",
      content: "Arterial PVD is a perfusion failure (cells can't get O2). Venous PVD is a congestion failure (cells can't get rid of waste). At the cellular level, arterial disease leads to ischemia and dry gangrene, while venous disease leads to edema and wet, weeping ulcers."
    },
    signs: {
      left: ["Arterial: Intermittent Claudication (pain with walking), Cool skin, Weak pulses", "Arterial: Punch-out ulcers (toes/heels)"],
      right: ["Venous: Edema, Brownish skin (hemosiderin), Dull ache", "Venous: Irregular ulcers (ankles)"]
    },
    medications: [
      { name: "Pentoxifylline (Trental)", type: "Hemorheologic", action: "Makes RBCs more flexible", sideEffects: "GI Upset", contra: "Cerebral hemorrhage", pearl: "Helps blood flow through narrowed arteries." },
      { name: "Cilostazol (Pletal)", type: "Vasodilator/Antiplatelet", action: "Improves walking distance", sideEffects: "Headache, Palpitations", contra: "Heart Failure", pearl: "Contraindicated in HF!" }
    ],
    pearls: ["Arterial: Legs down (Dangle) to help perfusion", "Venous: Legs up (Elevate) to help return", "Check pulses frequently"],
    quiz: [
      { question: "Intermittent Claudication is a sign of?", options: ["Venous PVD", "Arterial PVD", "Heart Failure", "Shock"], correct: 1, rationale: "Muscle pain with activity that stops at rest is classic for arterial disease." }
    ]
  },
  "reduced-co": {
    title: "Reduced Cardiac Output",
    cellular: {
      title: "Perfusion Failure",
      content: "Cardiac Output = Stroke Volume x Heart Rate. At the cellular level, reduced output means cells aren't getting the glucose and oxygen they need for ATP production. Cells shift to anaerobic metabolism, leading to lactic acid buildup and eventual cellular death."
    },
    signs: {
      left: ["Fatigue", "Confusion", "Decreased Urine Output", "Weak Peripheral Pulses"],
      right: ["Cool Extremities", "Hypotension", "Tachycardia", "Delayed Capillary Refill"]
    },
    medications: [
      { name: "Dobutamine", type: "Inotrope", action: "Increases contractility without high HR", sideEffects: "Tachycardia, PVCs", contra: "IHSS", pearl: "Monitor for chest pain during infusion." },
      { name: "Milrinone", type: "Inodilator", action: "Increases contractility & dilates vessels", sideEffects: "Hypotension, Thrombocytopenia", contra: "Severe valvular disease", pearl: "Used in end-stage heart failure." }
    ],
    pearls: ["Assess Level of Consciousness (LOC)", "Monitor kidney function (Urine <30mL/hr)", "Cluster care to reduce O2 demand"],
    quiz: [
      { question: "Reduced cardiac output leads to which cellular state?", options: ["Aerobic respiration", "Lactic Acidosis", "Hyper-oxygenation", "Alkalosis"], correct: 1, rationale: "Poor perfusion forces cells into anaerobic metabolism, creating lactic acid." }
    ]
  },
  "fluid-overload": {
    title: "Fluid Overload (Hypervolemia)",
    cellular: {
      title: "Osmotic Pressure Failure",
      content: "When too much fluid enters the extracellular space, the osmotic pressure gradient fails. Cells cannot maintain their normal volume, and fluid shifts into the interstitial space. This leads to cellular swelling and edema in tissues and organs."
    },
    signs: {
      left: ["Bounding Pulse", "Increased Blood Pressure", "Weight Gain", "Distended Neck Veins"],
      right: ["Dyspnea", "Crackles", "Edema", "Reduced Hematocrit"]
    },
    medications: [
      { name: "Furosemide", type: "Loop Diuretic", action: "Increases urine output", sideEffects: "Hypokalemia", contra: "Anuria", pearl: "Monitor weight daily at same time with same clothes." },
      { name: "Spironolactone", type: "K-Sparing Diuretic", action: "Blocks aldosterone", sideEffects: "Hyperkalemia, Gynecomastia", contra: "Hyperkalemia", pearl: "Avoid salt substitutes (which contain K+)." }
    ],
    pearls: ["Monitor I&O strictly", "Daily weights are key", "Skin care for edematous areas"],
    quiz: [
      { question: "What is the most sensitive indicator of fluid status?", options: ["Skin turgor", "I&O charting", "Daily weights", "Blood pressure"], correct: 2, rationale: "Daily weights are the most sensitive indicator of fluid gain or loss." }
    ]
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const lessonContent = useMemo(() => {
    return contentMap[id as string] || contentMap["heart-failure"];
  }, [id]);

  const handleAnswer = (index: number) => {
    if (index === lessonContent.quiz[currentQuestion].correct) {
      setScore(score + 1);
      toast({ title: "Correct!", description: lessonContent.quiz[currentQuestion].rationale });
    } else {
      toast({ 
        title: "Incorrect", 
        description: lessonContent.quiz[currentQuestion].rationale,
        variant: "destructive"
      });
    }

    if (currentQuestion + 1 < lessonContent.quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Systems
          </Button>
        </Link>

        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Core</span>
              <span className="text-gray-500 text-sm">Estimated time: 25 mins</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Your Progress</p>
                <p className="text-gray-600">Complete the quiz at the end to track your mastery.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "45%"}</p>
                <Progress value={quizComplete ? 100 : 45} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Cellular Foundation */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Microscope className="text-primary w-8 h-8" />
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {/* Signs & Symptoms */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Primary Assessment</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.left.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-orange-500 w-6 h-6" />
                  <h3>Secondary/Related</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.right.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Medications */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>Pharmacology & Interventions</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
                    <span className="font-bold text-primary">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
                  </div>
                  <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Action</p>
                      <p className="text-gray-700">{med.action}</p>
                      <p className="text-sm font-bold text-gray-400 uppercase pt-2">Side Effects</p>
                      <p className="text-gray-700">{med.sideEffects}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Contraindications</p>
                      <p className="text-gray-700">{med.contra}</p>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
                        <p className="text-sm text-yellow-800 font-medium">Pearl: {med.pearl}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Fact Sheet */}
          <section className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-primary w-8 h-8" />
              <h2>Quick Study Fact Sheet</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Nursing Priorities</h4>
                <ul className="space-y-2 text-gray-300">
                  {lessonContent.pearls.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Watch List</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Always prioritize based on ABCs. For neurological events, time is the critical factor. For endocrine, monitor for acute changes in mental status.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="py-12 border-t border-gray-100">
            {!quizStarted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Knowledge Check</h2>
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your understanding? Complete these questions to update your progress report.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Lesson Mastered!</h2>
                <p className="text-xl text-gray-600">You scored {score} out of {lessonContent.quiz.length}</p>
                <div className="pt-4">
                  <Link href="/lessons">
                    <Button variant="outline" className="rounded-full px-8">Return to Overview</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1} of {lessonContent.quiz.length}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{lessonContent.quiz[currentQuestion].question}</h3>
                </div>
                <div className="grid gap-4">
                  {lessonContent.quiz[currentQuestion].options.map((option, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      onClick={() => handleAnswer(i)}
                      className="justify-start h-auto py-4 px-6 text-left hover:bg-primary/5 hover:border-primary/40 rounded-xl"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
