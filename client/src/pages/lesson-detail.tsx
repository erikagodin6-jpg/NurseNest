import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf, ShieldAlert
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  lifespan?: { title: string; content: string };
  quiz: { question: string; options: string[]; correct: number; rationale: string }[];
};

const contentMap: Record<string, LessonContent> = {
  // Existing RPN Content
  "neuro-basics": {
    title: "Neuro Deterioration: Early vs Late",
    cellular: { title: "Cellular Sensitivity", content: "Brain sensitivity to hypoxia, hypotension, and glucose. \n\nEarly: Restlessness, Confusion. \n\nLate: Decreased LOC, Posturing." },
    signs: {
      left: ["Restlessness", "Confusion", "Headache", "Subtle LOC Change"],
      right: ["Decreased LOC", "Posturing", "Pupillary Changes", "Respiratory Failure"]
    },
    medications: [{ name: "Mannitol", type: "Osmotic", action: "Reduces ICP", sideEffects: "Dehydration", contra: "Anuria", pearl: "Monitor ICP." }],
    pearls: ["Sudden LOC change = priority", "Find the cause (UTI, Hypoxia, Glucose)"],
    lifespan: { title: "Across the Lifespan", content: "Infants: High-pitched cry/bulging fontanelle. Elderly: Acute confusion (Delirium) as first sign." },
    quiz: [{ question: "Early sign?", options: ["Posturing", "Restlessness", "Cyanosis", "Bradycardia"], correct: 1, rationale: "Restlessness is often first." }]
  },
  "stroke": {
    title: "Stroke: FAST Recognition",
    cellular: { title: "Ischemic vs Hemorrhagic", content: "Clot vs Bleed. Both result in rapid neuron death." },
    signs: {
      left: ["Face Drooping", "Arm Weakness", "Speech Difficulty", "Visual Loss"],
      right: ["Worst Headache Ever", "Sudden Confusion", "Decreased LOC", "Nausea/Vomiting"]
    },
    medications: [{ name: "tPA", type: "Thrombolytic", action: "Dissolves clots", sideEffects: "Bleeding", contra: "Hemorrhage", pearl: "Time is Brain! Must be given within 3-4.5 hours." }],
    pearls: ["NPO until swallow screen", "CT Scan (non-contrast) first"],
    lifespan: { title: "Across the Lifespan", content: "Common in elderly; in younger adults, often vascular abnormalities." },
    quiz: [{ question: "Priority action?", options: ["Aspirin", "NPO status", "Walk", "Food"], correct: 1, rationale: "Prevent aspiration." }]
  },
  // RN Content from document
  "aaa-rupture": {
    title: "Abdominal Aortic Aneurysm (AAA)",
    cellular: { title: "Vessel Wall Integrity", content: "Chronic high pressure (HTN) and smoking damage the aortic endothelium, causing the arterial wall to weaken and dilate. If the wall reaches its breaking point, it ruptures, leading to rapid exsanguination into the abdominal cavity." },
    signs: {
      left: ["Pulsatile Abdominal Mass", "Abdominal Bruit", "Back/Flank Pain (Stable)", "Incidental Imaging Finding"],
      right: ["Sudden, Ripping Back Pain", "Hypovolemic Shock (Low BP, High HR)", "Ecchymosis (Groin/Scrotum)", "Decreased Hematocrit/Hemoglobin"]
    },
    medications: [{ name: "Sodium Nitroprusside", type: "Vasodilator", action: "Emergency BP control", sideEffects: "Thiocyanate toxicity", contra: "Liver disease", pearl: "Maintain SBP 100-120 pre-op to prevent rupture." }],
    pearls: ["Hourly urine output must be >30mL to ensure renal perfusion", "Monitor peripheral pulses distal to graft post-op", "Report sudden severe pain immediately - sign of graft leak"],
    quiz: [{ question: "Which finding suggests a graft leak after AAA repair?", options: ["Urine output of 50mL/hr", "Increased abdominal girth and groin pain", "Strong pedal pulses", "Normal bowel sounds"], correct: 1, rationale: "Increased girth and pain indicate blood leaking into the retroperitoneal space." }]
  },
  "mi-management": {
    title: "Myocardial Infarction Management",
    cellular: { title: "Coronary Occlusion", content: "A ruptured atherosclerotic plaque triggers a thrombotic cascade that completely blocks blood flow to the myocardium. Ischemia leads to irreversible cell death within 20-40 minutes if reperfusion isn't achieved." },
    signs: {
      left: ["Heavy/Crushing Chest Pain", "Pain radiating to jaw or left arm", "Diaphoresis & Nausea", "Feeling of Impending Doom"],
      right: ["ST-Elevation (STEMI)", "New S3 Heart Sound (HF)", "Crackles in Lungs", "Ominous Bradycardia/Heart Block"]
    },
    medications: [
      { name: "Aspirin", type: "Antiplatelet", action: "Prevents clot expansion", sideEffects: "GI upset", contra: "Active bleeding", pearl: "Chew for rapid effect." },
      { name: "Nitroglycerin", type: "Vasodilator", action: "Reduces Preload/Afterload", sideEffects: "Headache/Hypotension", contra: "Sildenafil/ED meds", pearl: "Hold if SBP < 90." }
    ],
    pearls: ["NPO until swallow screen (if stroke signs coexist)", "Avoid NSAIDs - they increase mortality risk post-MI", "Semi-Fowler's position to reduce heart workload"],
    quiz: [{ question: "A client with MI suddenly develops crackles and an S3 sound. What happened?", options: ["The patient is improving", "Pulmonary Edema / Heart Failure", "Normal post-MI recovery", "Pneumonia"], correct: 1, rationale: "The damaged heart cannot pump effectively, causing fluid to back up into the lungs." }]
  },
  "hf-advanced": {
    title: "Advanced Heart Failure",
    cellular: { title: "Remodeling & Failure", content: "Chronic overload leads to ventricular remodeling. Reduced Ejection Fraction (Systolic) involves thin, weak walls, while Preserved EF (Diastolic) involves thick, stiff walls that cannot fill properly." },
    signs: {
      left: ["Lungs: Crackles & Frothy Sputum", "Dyspnea & Orthopnea", "Paroxysmal Nocturnal Dyspnea"],
      right: ["Systemic: JVD & Edema", "Hepatomegaly & Ascites", "Weight Gain (>3lb in 2 days)"]
    },
    medications: [
      { name: "Furosemide", type: "Loop Diuretic", action: "Reduces Preload", sideEffects: "Hypokalemia", contra: "Low BP", pearl: "Monitor Potassium closely." },
      { name: "ACE Inhibitors", type: "Afterload Reducer", action: "Blocks RAAS", sideEffects: "Dry Cough/Hyperkalemia", contra: "Angioedema", pearl: "First line for Systolic HF." }
    ],
    pearls: ["Daily weights are the most sensitive indicator of fluid status", "Sodium restriction (<3g/day) is vital", "Avoid NSAIDs as they cause fluid retention"],
    quiz: [{ question: "What is a priority teaching for HF home care?", options: ["Eat more salt", "Report 3lb weight gain in 2 days", "Drink 4L of water daily", "Only take meds when symptomatic"], correct: 1, rationale: "Rapid weight gain indicates fluid overload needing intervention." }]
  },
  "kawasaki-critical": {
    title: "Kawasaki Disease: Vasculitis",
    cellular: { title: "Arterial Inflammation", content: "A systemic vasculitis affecting small/medium arteries. The major danger is coronary artery damage, where inflammation leads to dilation and potential aneurysm formation." },
    signs: {
      left: ["Fever > 5 days (Unresponsive)", "Strawberry Tongue", "Conjunctival Redness", "Swollen Palms/Soles"],
      right: ["Coronary Artery Aneurysm", "Peeling Skin (Late sign)", "Irritability", "Recurring Fever"]
    },
    medications: [
      { name: "IVIG", type: "Immunoglobulin", action: "Systemic anti-inflammatory", sideEffects: "Aseptic meningitis", contra: "Live vaccines", pearl: "Give within 10 days of onset." },
      { name: "Aspirin (High Dose)", type: "Antiplatelet", action: "Prevents Coronary Clots", sideEffects: "Reye's Risk", contra: "Viral illness", pearl: "Used here for anti-thrombotic effect despite age." }
    ],
    pearls: ["Need baseline and follow-up echoes", "Postpone live vaccines for 11 months post IVIG", "Monitor for MI symptoms even in children"],
    quiz: [{ question: "A child treated with IVIG for Kawasaki asks about the MMR vaccine. Advice?", options: ["Get it today", "Wait at least 11 months", "It's fine after 1 week", "Live vaccines are never allowed"], correct: 1, rationale: "IVIG contains antibodies that interfere with live vaccine response." }]
  },
  "cp-management": {
    title: "Cerebral Palsy & Spasticity",
    cellular: { title: "Static Brain Insult", content: "Damage to the motor cortex during development (premature, hypoxia, or infection) results in permanent, nonprogressive disturbances in movement and posture." },
    signs: {
      left: ["Hypertonia/Spasticity", "Rigid Muscle Tone", "Delayed Motor Milestones", "Scissoring Gait"],
      right: ["Dysphagia/Swallowing Risks", "Seizures", "Contractures", "Chronic Constipation"]
    },
    medications: [{ name: "Baclofen", type: "Spasmolytic", action: "GABA agonist", sideEffects: "CNS Depression", contra: "None", pearl: "Baclofen pump for severe spasticity." }],
    pearls: ["Physical therapy and ROM are daily priorities", "Monitor for skin breakdown under assistive devices", "Higher risk for UTIs and Constipation"],
    quiz: [{ question: "Priority nursing goal for CP?", options: ["Curing the brain injury", "Promoting optimal mobility and nutrition", "Eliminating all muscle tone", "Isolating the child"], correct: 1, rationale: "The injury is permanent; care focuses on function and preventing complications." }]
  },
  "all-leukemia": {
    title: "Acute Lymphoblastic Leukemia (ALL)",
    cellular: { title: "Blast Overcrowding", content: "Malignant lymphoblasts rapidly multiply in the bone marrow. This overcrowding suppresses normal hematopoiesis, leading to severe anemia, bleeding (low platelets), and infection risk (nonfunctional WBCs)." },
    signs: {
      left: ["Bone Pain & Fractures", "Fatigue & Pallor", "Weight Loss", "Hepatosplenomegaly"],
      right: ["Fever & Severe Neutropenia", "Petechiae & Bleeding", "ANC < 500", "Leukemic Meningitis (CNS)"]
    },
    medications: [{ name: "Chemotherapy", type: "Cytotoxic", action: "Inhibits DNA synthesis", sideEffects: "Mucositis/Nausea", contra: "Active Sepsis", pearl: "Ensure blood products are irradiated." }],
    pearls: ["Neutropenic precautions: No raw food, no flowers", "Soft-bristled toothbrush only", "Avoid rectal thermometers/enemas"],
    quiz: [{ question: "Child with ALL has ANC of 350. Priority?", options: ["Fresh fruit snack", "Neutropenic precautions", "Invite friends over", "Play in the garden"], correct: 1, rationale: "ANC < 500 is severe risk for life-threatening infection." }]
  },
  "aml-leukemia": {
    title: "Acute Myelogenous Leukemia (AML)",
    cellular: { title: "Myeloid Proliferation", content: "Rapid growth of myeloid blasts in the marrow. Like ALL, it causes bone marrow failure and pancytopenia, but affects the myeloid lineage (monocytes, granulocytes, RBCs, platelets)." },
    signs: {
      left: ["Infection & Fever", "Bleeding Gums", "Fatigue", "Bone Pain"],
      right: ["Severe Neutropenia", "Mucositis", "Weight Loss", "Hypercellular Marrow"]
    },
    medications: [{ name: "Daunorubicin", type: "Antineoplastic", action: "Intercalates DNA", sideEffects: "Cardiotoxicity", contra: "Severe HF", pearl: "Monitor heart function (Echo) closely." }],
    pearls: ["Hand hygiene is the #1 priority", "Disinfect all equipment before client contact", "Irradiate blood products to prevent graft-vs-host"],
    quiz: [{ question: "Priority for a client with AML undergoing chemo?", options: ["Watching for hair loss", "Infection prevention / Hand hygiene", "Encouraging a high-fiber diet", "Daily walks in the hall"], correct: 1, rationale: "Infection is the leading cause of death in leukemia patients." }]
  },
  "shock-syndromes": {
    title: "Shock States (RN Mastery)",
    cellular: { title: "Tissue Hypoperfusion", content: "Shock is a life-threatening syndrome of inadequate tissue perfusion. Hypovolemic (low volume), Cardiogenic (pump failure), Septic (vasodilation/infection), and Anaphylactic (allergic vasodilation)." },
    signs: {
      left: ["Tachycardia (Early)", "Narrowing Pulse Pressure", "Cool, Clammy Skin (Hypovolemic)", "Increased RR"],
      right: ["Hypotension (Late)", "Anuria / Low Urine Output", "Altered LOC / Confusion", "Signs of End-Organ Failure"]
    },
    medications: [
      { name: "Norepinephrine", type: "Vasopressor", action: "Increases SVR/MAP", sideEffects: "Peripheral ischemia", contra: "Hypovolemia (uncorrected)", pearl: "Must have adequate fluid resuscitation first." },
      { name: "Dopamine", type: "Inotrope", action: "Increases contractility", sideEffects: "Tachycardia", contra: "Pheochromocytoma", pearl: "Renal dose is now controversial; focus on BP." }
    ],
    pearls: ["Septic Shock: Start antibiotics within 1 hour", "Hypovolemic Shock: Fluid bolus is the priority", "Cardiogenic Shock: Morphine/Nitros to reduce heart workload"],
    quiz: [{ question: "Priority for Septic Shock?", options: ["Antibiotics within 1 hour", "Daily weights", "Physical therapy", "Skin lotion"], correct: 0, rationale: "Early antibiotic administration is the single most important factor in sepsis survival." }]
  },
  "copd-exacerbation": {
    title: "COPD: Airway & Oxygenation",
    cellular: { title: "Air Trapping", content: "Chronic inflammation and alveolar destruction lead to air trapping and impaired gas exchange. Excessive mucus production and bronchospasm cause frequent exacerbations." },
    signs: {
      left: ["Barrel Chest", "Productive Cough", "Pursed-Lip Breathing", "Clubbing"],
      right: ["Respiratory Acidosis", "Hypoxemic Drive Failure", "Confusion/CO2 Narcosis", "Silent Chest (Emergency)"]
    },
    medications: [
      { name: "Albuterol", type: "SABA", action: "Bronchodilation", sideEffects: "Tachycardia/Tremors", contra: "Tachyarrhythmias", pearl: "Rescue inhaler only." },
      { name: "Ipratropium", type: "Anticholinergic", action: "Blocks bronchoconstriction", sideEffects: "Dry mouth", contra: "Glaucoma", pearl: "Often combined with albuterol (DuoNeb)." }
    ],
    pearls: ["Keep O2 sats between 88-92% for chronic retainers", "Avoid high-flow oxygen which can suppress respiratory drive", "Position: High-Fowler's or Tripod"],
    quiz: [{ question: "Target O2 saturation for a COPD patient?", options: ["98-100%", "88-92%", "94-96%", "Over 95%"], correct: 1, rationale: "COPD patients often rely on a hypoxic drive; over-oxygenation can suppress their urge to breathe." }]
  },
  "increased-icp": {
    title: "Increased ICP & TBI",
    cellular: { title: "Monro-Kellie Doctrine", content: "The skull is a rigid vault. An increase in one component (brain, blood, CSF) must be compensated by a decrease in another, or ICP rises rapidly." },
    signs: {
      left: ["Headache", "Nausea/Vomiting", "Altered LOC (Early)", "Pupillary sluggishness"],
      right: ["Cushing's Triad (HTN, Bradycardia, Irregular RR)", "Fixed/Dilated Pupils", "Decorticate/Decerebrate Posturing", "Projectile Vomiting"]
    },
    medications: [{ name: "Mannitol", type: "Osmotic Diuretic", action: "Pulls fluid from brain cells", sideEffects: "Dehydration", contra: "Renal failure", pearl: "Must use a filter needle." }],
    pearls: ["Avoid coughing, straining, or extreme hip flexion", "Keep HOB at 30 degrees (Neutral head position)", "GCS < 8 = Intubate"],
    quiz: [{ question: "Which is a component of Cushing's Triad?", options: ["Tachycardia", "Hypotension", "Widening pulse pressure", "Fever"], correct: 2, rationale: "Cushing's triad consists of widening pulse pressure (systolic HTN), bradycardia, and irregular respirations." }]
  },
  "herbals-safety": {
    title: "Herbal & Supplement Safety",
    cellular: { title: "Phytotherapy Safety", content: "Herbals can have potent physiological effects and significant interactions with conventional medications, especially anticoagulants and CNS depressants." },
    signs: {
      left: ["St. John's Wort: Serotonin Syndrome risk", "Ginkgo/Garlic: Bleeding risk", "Ginseng: Hypoglycemia risk"],
      right: ["Kava: Hepatotoxicity", "Valerian: Excessive sedation", "Licorice root: Hypokalemia/HTN"]
    },
    medications: [
      { name: "Ginkgo Biloba", type: "Herbal", action: "Memory enhancement (unproven)", sideEffects: "Bleeding", contra: "Warfarin/Heparin", pearl: "Stop 2 weeks before surgery." },
      { name: "St. John's Wort", type: "Herbal", action: "Antidepressant", sideEffects: "Photosensitivity", contra: "SSRIs/MAOIs", pearl: "Reduces effectiveness of many drugs (e.g., Digoxin, Warfarin)." }
    ],
    pearls: ["Always ask about herbals in the pre-op assessment", "G's (Ginkgo, Garlic, Ginger, Ginseng) = Bleeding risk", "Herbals are not regulated like pharmaceuticals"],
    quiz: [{ question: "A patient on Warfarin takes Ginkgo Biloba. What is the risk?", options: ["Blood clots", "Bleeding", "Hypertension", "Drowsiness"], correct: 1, rationale: "Ginkgo has antiplatelet properties and increases bleeding risk with anticoagulants." }]
  },
  "sepsis-mastery": {
    title: "Sepsis & SIRS Recognition",
    cellular: { title: "Systemic Inflammatory Response", content: "Sepsis is a dysregulated host response to infection. It progress from SIRS to Sepsis, Severe Sepsis, and finally Septic Shock (refractory hypotension)." },
    signs: {
      left: ["Temp > 38C or < 36C", "HR > 90", "RR > 20", "WBC > 12k or < 4k"],
      right: ["Lactic Acid > 2 mmol/L", "MAP < 65 mmHg", "Altered Mental Status", "Mottled Skin"]
    },
    medications: [
      { name: "Ceftriaxone", type: "Antibiotic", action: "Cell wall synthesis inhibitor", sideEffects: "Diarrhea/Rash", contra: "Penicillin allergy", pearl: "Start within 1 hour of recognition." },
      { name: "Normal Saline", type: "Isotonic Crystalloid", action: "Volume expansion", sideEffects: "Fluid overload", contra: "HF/Renal failure", pearl: "30mL/kg bolus is standard." }
    ],
    pearls: ["Lactate level is a key marker of tissue hypoxia", "Blood cultures BEFORE antibiotics", "Source control is vital"],
    quiz: [{ question: "First action for suspected sepsis after oxygen?", options: ["Administer antibiotics", "Obtain blood cultures", "Check temperature", "Call family"], correct: 1, rationale: "Blood cultures must be obtained before antibiotics to ensure accurate identification of the pathogen." }]
  },
  "aki-management": {
    title: "Acute Kidney Injury (AKI)",
    cellular: { title: "Nephron Insult", content: "AKI is a sudden decrease in renal function. Pre-renal (perfusion), Intra-renal (damage), and Post-renal (obstruction). Prone to fluid overload and electrolyte shifts." },
    signs: {
      left: ["Oliguria (< 400mL/day)", "Increased BUN/Creatinine", "Fluid Retention/Edema"],
      right: ["Hyperkalemia (Peak T waves)", "Metabolic Acidosis", "Encephalopathy", "Crackles in lungs"]
    },
    medications: [
      { name: "Sodium Polystyrene", type: "K-binder", action: "Exchanges Na for K in gut", sideEffects: "Constipation/Necrosis", contra: "Bowel obstruction", pearl: "Monitor for bowel sounds first." },
      { name: "Epoetin Alfa", type: "Growth Factor", action: "Stimulates RBC production", sideEffects: "HTN/Clots", contra: "Uncontrolled HTN", pearl: "Often needed in chronic renal failure." }
    ],
    pearls: ["Monitor K+ levels religiously - lethal dysrhythmias", "Avoid nephrotoxic drugs (NSAIDs, Contrast)", "Daily weights are mandatory"],
    quiz: [{ question: "Priority for a client with AKI and K+ of 6.5?", options: ["Cardiac monitoring", "Giving a snack", "Checking skin turgor", "Encouraging fluids"], correct: 0, rationale: "Hyperkalemia is lethal; continuous cardiac monitoring for dysrhythmias is the immediate priority." }]
  },
  "gi-bleed": {
    title: "GI Bleeding & Obstruction",
    cellular: { title: "Gastrointestinal Crisis", content: "Upper GI bleed (esophageal/gastric) vs Lower GI bleed. Bowel obstruction can be mechanical or functional (ileus), leading to fluid shifts and perforation." },
    signs: {
      left: ["Melena (Dark, tarry stools)", "Hematemesis (Coffee-ground)", "Abdominal Distension", "Hyperactive Bowel Sounds (Early)"],
      right: ["Board-like, Rigid Abdomen", "Hypotension/Tachycardia", "Absent Bowel Sounds (Late)", "Rebound Tenderness"]
    },
    medications: [
      { name: "Pantoprazole", type: "PPI", action: "Inhibits gastric acid", sideEffects: "C. diff risk", contra: "Hypersensitivity", pearl: "Given IV bolus/drip in active bleeds." },
      { name: "Octreotide", type: "Somatostatin Analog", action: "Reduces splanchnic blood flow", sideEffects: "Nausea/Gallstones", contra: "Diabetes (affects insulin)", pearl: "Standard for esophageal varices." }
    ],
    pearls: ["NPO is mandatory for suspected obstruction", "NG tube for decompression", "Monitor for signs of peritonitis"],
    quiz: [{ question: "A client with an obstruction has a rigid, tender abdomen. What is the fear?", options: ["Normal recovery", "Perforation / Peritonitis", "Simple gas", "Hunger"], correct: 1, rationale: "A rigid, board-like abdomen is a classic sign of peritoneal irritation from perforation." }]
  },
  "asthma-emergency": {
    title: "Asthma & Status Asthmaticus",
    cellular: { title: "Airway Hyperreactivity", content: "Chronic inflammatory disorder. During an attack, bronchoconstriction and airway edema severely limit airflow. Status Asthmaticus is an unresponsive medical emergency." },
    signs: {
      left: ["Expiratory Wheezing", "Chest Tightness", "Accessory Muscle Use", "Tachypnea"],
      right: ["Silent Chest", "Paradoxical Breathing", "Inability to speak in sentences", "Respiratory Acidosis"]
    },
    medications: [
      { name: "Albuterol", type: "SABA", action: "Rapid Bronchodilation", sideEffects: "Tachycardia", contra: "Tachyarrhythmias", pearl: "First drug given in an attack." },
      { name: "Methylprednisolone", type: "Corticosteroid", action: "Reduces airway inflammation", sideEffects: "Hyperglycemia", contra: "Active systemic infection", pearl: "Takes hours to work; not for rescue." }
    ],
    pearls: ["Silent chest = imminent respiratory arrest", "Peak Flow Meter helps track control", "Avoid beta-blockers in asthma patients"],
    quiz: [{ question: "Most critical finding in asthma attack?", options: ["Loud wheezing", "Silent chest", "Productive cough", "HR of 100"], correct: 1, rationale: "A silent chest means NO air is moving, signaling immediate respiratory failure." }]
  },
  "congenital-heart": {
    title: "Congenital Heart Defects",
    cellular: { title: "Structural Anomalies", content: "Heart defects present at birth. Classified into Acyanotic (Left-to-Right shunt, increased lung flow) and Cyanotic (Right-to-Left shunt, decreased systemic oxygenation)." },
    signs: {
      left: ["Acyanotic: Murmur, HF signs", "Tachypnea", "Poor feeding", "Weight gain (fluid)"],
      right: ["Cyanotic: Tetrology of Fallot", "Cyanosis (Blue-ish skin)", "Clubbing", "Squatting (Tet spells)"]
    },
    medications: [{ name: "Indomethacin", type: "NSAID", action: "Closes Patent Ductus Arteriosus", sideEffects: "Renal injury", contra: "Active bleeding", pearl: "Given to premature infants to close PDA." }],
    pearls: ["Cyanotic defects require immediate surgical or prostaglandin intervention", "Polycythemia is a compensatory response to chronic hypoxia", "Monitor for congestive heart failure in acyanotic defects"],
    quiz: [{ question: "Which is a characteristic of cyanotic heart defects?", options: ["Pink skin", "Increased lung blood flow", "Right-to-Left shunting", "Normal oxygen levels"], correct: 2, rationale: "Cyanotic defects involve shunting of deoxygenated blood from the right side of the heart to the left, bypassing the lungs." }]
  },
  "burn-management": {
    title: "Burn Injury & Resuscitation",
    cellular: { title: "Capillary Leak Syndrome", content: "Thermal or chemical injury triggers a massive systemic inflammatory response, leading to increased capillary permeability, massive fluid shifts (edema), and hypovolemic shock." },
    signs: {
      left: ["Superficial (1st Degree): Redness", "Partial (2nd Degree): Blisters", "Full (3rd Degree): Charred/White"],
      right: ["Inhalation Injury: Singed nasal hairs", "Wheezing/Hoarseness", "Hypovolemic Shock", "Hyperkalemia (Initial)"]
    },
    medications: [{ name: "Lactated Ringer's", type: "Crystalloid", action: "Volume replacement", sideEffects: "Fluid overload", contra: "None in emergency", pearl: "Standard for burn resuscitation (Parkland Formula)." }],
    pearls: ["Airway is the #1 priority (check for soot/singed hairs)", "First 24 hours focus on fluid resuscitation", "High risk for infection and hypothermia"],
    quiz: [{ question: "First priority in a patient with facial burns?", options: ["Fluid bolus", "Pain meds", "Airway assessment", "Wound cleaning"], correct: 2, rationale: "Facial burns carry a high risk for inhalation injury and airway edema, making airway assessment the absolute priority." }]
  },
  "compartment-syndrome": {
    title: "Compartment Syndrome",
    cellular: { title: "Tissue Pressure Crisis", content: "Increased pressure within a muscular compartment (often after fracture or tight cast) compromises circulation and causes tissue/nerve death within hours." },
    signs: {
      left: ["Pain out of proportion to injury", "Pain with passive stretch", "Pressure/Tightness"],
      right: ["The 6 Ps: Pain, Paresthesia, Pallor, Paralysis, Pulselessness, Poikilothermia"]
    },
    medications: [{ name: "Morphine", type: "Opioid", action: "Pain management", sideEffects: "Resp depression", contra: "Hypotension", pearl: "If pain is unresponsive to morphine, suspect compartment syndrome." }],
    pearls: ["Keep extremity at heart level (NOT elevated)", "Notify surgeon immediately for fasciotomy", "Paresthesia is an early sign; pulselessness is LATE"],
    quiz: [{ question: "What should you do if you suspect compartment syndrome?", options: ["Elevate the leg high", "Apply a warm pack", "Notify the surgeon immediately", "Wait and reassess in 2 hours"], correct: 2, rationale: "Compartment syndrome is a surgical emergency requiring immediate fasciotomy to save the limb." }]
  },
  "dysrhythmias": {
    title: "Lethal Dysrhythmias",
    cellular: { title: "Electrical Instability", content: "Disruption in the heart's electrical conduction system. VT/VF lead to zero cardiac output. Atrial Fibrillation increases the risk of mural thrombi and embolic stroke." },
    signs: {
      left: ["A-Fib: Irregularly irregular pulse", "Palpitations", "Dizziness", "Shortness of breath"],
      right: ["VT/VF: Pulselessness", "Apnea", "Loss of consciousness", "Bradycardia < 40"]
    },
    medications: [
      { name: "Amiodarone", type: "Antiarrhythmic", action: "Prolongs action potential", sideEffects: "Pulmonary toxicity", contra: "Heart block", pearl: "First-line for VT/VF." },
      { name: "Adenosine", type: "Antiarrhythmic", action: "Restarts AV node", sideEffects: "Brief asystole", contra: "Asthma", pearl: "Give RAPID IV push followed by flush." }
    ],
    pearls: ["A-Fib: Priority is rate control and anticoagulation", "VFib = Defib (Immediate)", "Check a pulse for at least 5 but no more than 10 seconds"],
    quiz: [{ question: "Priority action for Ventricular Fibrillation?", options: ["Amiodarone", "Defibrillation", "CPR only", "Epinephrine"], correct: 1, rationale: "Defibrillation is the only treatment that can terminate VFib and restore a perfusing rhythm." }]
  },
  "pe-recognition": {
    title: "Pulmonary Embolism (PE)",
    cellular: { title: "V/Q Mismatch", content: "A blockage in the pulmonary artery, usually from a DVT. This creates a 'dead space' where ventilation occurs but no perfusion (gas exchange) happens, leading to acute hypoxemia." },
    signs: {
      left: ["Sudden Dyspnea", "Pleuritic Chest Pain", "Tachypnea", "Tachycardia"],
      right: ["Hemoptysis", "Hypotension (Obstructive Shock)", "Right Heart Strain (JVD)", "Feeling of Impending Doom"]
    },
    medications: [
      { name: "Heparin", type: "Anticoagulant", action: "Prevents clot growth", sideEffects: "Bleeding/HIT", contra: "Active bleed", pearl: "Monitor aPTT closely." },
      { name: "Alteplase", type: "Thrombolytic", action: "Dissolves existing PE", sideEffects: "Hemorrhage", contra: "Recent surgery", pearl: "Used only in hemodynamically unstable PE." }
    ],
    pearls: ["DVT prophylaxis (Enoxaparin/SCDs) is the best prevention", "Position: High-Fowler's immediately", "CT Angiography is the gold standard for diagnosis"],
    quiz: [{ question: "Most common origin of a Pulmonary Embolism?", options: ["Heart", "Deep Vein Thrombosis (DVT)", "Brain", "Lungs"], correct: 1, rationale: "Most PEs originate from dislodged clots in the deep veins of the lower extremities (DVT)." }]
  },
  "electrolyte-safety": {
    title: "Electrolyte Imbalances",
    cellular: { title: "Ionic Homeostasis", content: "Electrolytes (K, Na, Ca, Mg) are critical for nerve conduction, muscle contraction, and fluid balance. Imbalances lead to lethal cardiac and neurological complications." },
    signs: {
      left: ["Hyponatremia: Seizures/Confusion", "Hypokalemia: U-waves/Cramps", "Hypocalcemia: Trousseau/Chvostek"],
      right: ["Hyperkalemia: Peaked T-waves", "Hypernatremia: Thirst/Dry mucus", "Hypercalcemia: Stones/Moans/Groans"]
    },
    medications: [
      { name: "Calcium Gluconate", type: "Mineral", action: "Stabilizes cardiac membrane", sideEffects: "Bradycardia", contra: "Digoxin toxicity", pearl: "First drug for lethal hyperkalemia." },
      { name: "Magnesium Sulfate", type: "Mineral", action: "CNS Depressant", sideEffects: "Loss of DTRs", contra: "Renal failure", pearl: "Standard for Torsades de Pointes." }
    ],
    pearls: ["NEVER give Potassium IV Push (Lethal)", "Monitor for cardiac changes with K+ shifts", "Fluid follows Sodium"],
    quiz: [{ question: "Early sign of hyperkalemia on ECG?", options: ["U-waves", "ST depression", "Peaked T-waves", "Flat P-waves"], correct: 2, rationale: "Tall, peaked T-waves are the earliest indicator of hyperkalemia on an ECG." }]
  },
  "cardiac-meds": {
    title: "Vasoactive & Cardiac Meds",
    cellular: { title: "Hemodynamic Support", content: "Inotropes (contractility), Vasopressors (SVR), and Antiarrhythmics are used to stabilize hemodynamics in critical care. Each class has narrow therapeutic windows and specific monitoring requirements." },
    signs: {
      left: ["Beta Blockers: Low HR/BP", "ACE Inhibitors: Cough/Angioedema", "Nitrates: Headache/Hypotension"],
      right: ["Digoxin Toxicity: Yellow halos/Nausea", "Amiodarone: Blue-gray skin", "Epinephrine: Palpitations"]
    },
    medications: [
      { name: "Digoxin", type: "Cardiac Glycoside", action: "Increases contractility", sideEffects: "Nausea/Bradycardia", contra: "Hypokalemia", pearl: "Check apical pulse for 1 min (hold if < 60)." },
      { name: "Amlodipine", type: "CCB", action: "Vasodilation", sideEffects: "Peripheral edema", contra: "Severe HF", pearl: "Monitor for ankle swelling." }
    ],
    pearls: ["Hold Beta Blockers if HR < 50 or SBP < 100", "ACE inhibitors can cause life-threatening angioedema", "Potassium levels affect Digoxin toxicity"],
    quiz: [{ question: "Priority assessment before giving Digoxin?", options: ["Temperature", "Apical pulse for 60 seconds", "Weight", "Respiratory rate"], correct: 1, rationale: "Digoxin can slow the heart rate too much; an apical pulse of <60 requires the dose to be held." }]
  },
  "anticoagulant-safety": {
    title: "Anticoagulation Mastery",
    cellular: { title: "Hemostasis Control", content: "Anticoagulants prevent thrombus formation by interrupting the coagulation cascade. They do not dissolve existing clots but prevent them from growing larger." },
    signs: {
      left: ["Ecchymosis/Bruising", "Hematuria", "Epistaxis (Nosebleed)", "Gingival bleeding"],
      right: ["Hemorrhagic Stroke signs", "Melena", "Hypotension (Internal bleed)", "HIT (Thrombocytopenia)"]
    },
    medications: [
      { name: "Warfarin", type: "Vitamin K Antagonist", action: "Inhibits clotting factors", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Antidote: Vitamin K. Monitor PT/INR." },
      { name: "Enoxaparin", type: "LMWH", action: "Antithrombin activator", sideEffects: "Injection site bruising", contra: "Active bleeding", pearl: "Don't expel the air bubble in the syringe." }
    ],
    pearls: ["Monitor PTT for Heparin, PT/INR for Warfarin", "Avoid Vitamin K-rich foods (kale/spinach) on Warfarin", "Report black tarry stools immediately"],
    quiz: [{ question: "Antidote for Warfarin toxicity?", options: ["Protamine Sulfate", "Vitamin K", "Naloxone", "Glucagon"], correct: 1, rationale: "Vitamin K is the reversal agent for Warfarin; Protamine is for Heparin." }]
  },
  "insulin-safety": {
    title: "Insulin & Diabetic Safety",
    cellular: { title: "Glucose Metabolism", content: "Insulin facilitates glucose entry into cells. Over-administration or inadequate intake leads to hypoglycemia (neuroglycopenia), a medical emergency." },
    signs: {
      left: ["Hypoglycemia: Shakiness", "Sweating/Diaphoresis", "Confusion", "Hunger"],
      right: ["DKA: Kussmaul respirations", "Fruity breath", "Severe Dehydration", "Altered LOC"]
    },
    medications: [
      { name: "Lispro", type: "Rapid-acting", action: "Bolus insulin", sideEffects: "Hypoglycemia", contra: "Hypoglycemia", pearl: "Give within 15 mins of food." },
      { name: "Glargine", type: "Long-acting", action: "Basal coverage", sideEffects: "Hypoglycemia", contra: "Hypoglycemia", pearl: "Cannot be mixed with other insulins." }
    ],
    pearls: ["Check blood glucose before administration", "Rule of 15 for hypoglycemia", "Rotate injection sites"],
    quiz: [{ question: "When to give rapid-acting insulin?", options: ["30 mins before food", "Within 15 mins of eating", "Only at bedtime", "After exercise"], correct: 1, rationale: "Rapid-acting insulin has a quick onset; food must be available immediately to prevent hypoglycemia." }]
  },
  "peds-respiratory": {
    title: "Pediatric Respiratory: RSV & Croup",
    cellular: { title: "Airway Narrowing", content: "Infant airways are much smaller and more prone to obstruction from inflammation and mucus. RSV (Bronchiolitis) affects the lower airways, while Croup (Laryngotracheobronchitis) affects the upper airway." },
    signs: {
      left: ["RSV: Wheezing/Crackles", "Copious Secretions", "Nasal Flaring", "Retractions"],
      right: ["Croup: Barking Cough", "Inspiratory Stridor", "Steeple Sign on X-ray", "Agitation"]
    },
    medications: [
      { name: "Ribavirin", type: "Antiviral", action: "Inhibits viral replication", sideEffects: "Blurred vision", contra: "Pregnancy (teratogenic)", pearl: "Used only in severe RSV cases." },
      { name: "Dexamethasone", type: "Corticosteroid", action: "Reduces upper airway edema", sideEffects: "Hyperglycemia", contra: "Active infection", pearl: "Standard for moderate-to-severe croup." }
    ],
    pearls: ["RSV: Suctioning before feeding is the priority", "Croup: Cool mist or cold air can help relieve symptoms", "Monitor for dehydration due to poor feeding"],
    quiz: [{ question: "Priority nursing intervention for a baby with RSV?", options: ["Deep suctioning", "Bulb suctioning of nares", "Starting an IV", "Chest physiotherapy"], correct: 1, rationale: "Babies are nose-breathers; clearing the nares with a bulb syringe before feeding is the priority to ensure oxygenation and nutrition." }]
  },
  "epiglottitis-peds": {
    title: "Epiglottitis: Airway Emergency",
    cellular: { title: "Supraglottic Inflammation", content: "A life-threatening bacterial infection (often H. influenzae type b) causing sudden, massive swelling of the epiglottis, which can completely occlude the airway within minutes." },
    signs: {
      left: ["High Fever", "The 4 Ds: Drooling, Dysphagia, Dysphonia, Distress", "Inspiratory Stridor", "Tripod Position"],
      right: ["Absent Cough", "Agitation", "Cyanosis", "Total Airway Obstruction"]
    },
    medications: [{ name: "Ceftriaxone", type: "Antibiotic", action: "Treats underlying infection", sideEffects: "Rash", contra: "Penicillin allergy", pearl: "Given only AFTER airway is secured." }],
    pearls: ["NEVER examine the throat with a tongue depressor (triggers laryngospasm)", "Keep the child calm (avoid crying)", "Prepare for emergency intubation/tracheostomy"],
    quiz: [{ question: "A child with suspected epiglottitis is drooling and in tripod position. First action?", options: ["Examine the throat", "Obtain a throat culture", "Prepare for emergency intubation", "Start an IV"], correct: 2, rationale: "Epiglottitis is a total airway emergency; preparing for an emergency airway (intubation/trach) is the immediate priority. Never examine the throat as it can cause total closure." }]
  },
  "stroke-advanced": {
    title: "Stroke & TIA Management",
    cellular: { title: "Ischemic vs Hemorrhagic", content: "Ischemic stroke (85%) involves a clot; Hemorrhagic (15%) involves a vessel rupture. TIA is a 'warning stroke' where symptoms resolve within 24 hours but signal high risk for a major stroke." },
    signs: {
      left: ["FAST: Face, Arm, Speech, Time", "Sudden numbness/weakness", "Visual disturbances", "Aphasia"],
      right: ["Worst headache of life (Hemorrhagic)", "Decreased LOC", "Seizures", "Nausea/Vomiting"]
    },
    medications: [
      { name: "Alteplase (tPA)", type: "Thrombolytic", action: "Dissolves ischemic clots", sideEffects: "Hemorrhage", contra: "Recent surgery/bleed", pearl: "Must be given within 3-4.5 hours of Last Known Well." },
      { name: "Labetalol", type: "Beta Blocker", action: "Controlled BP reduction", sideEffects: "Bradycardia", contra: "Asthma", pearl: "Keep SBP < 185 for tPA candidates." }
    ],
    pearls: ["CT scan (non-contrast) is the priority to rule out bleed", "NPO until swallow screen is passed", "Monitor for increased ICP post-stroke"],
    quiz: [{ question: "Priority action for a client with sudden right-sided weakness?", options: ["Give Aspirin", "Perform a non-contrast CT scan", "Start a 4L/min O2", "Assess for pain"], correct: 1, rationale: "A CT scan is the absolute priority to differentiate between ischemic and hemorrhagic stroke before any treatment (like tPA or Aspirin) can begin." }]
  },
  "seizure-safety": {
    title: "Seizure Precautions & Safety",
    cellular: { title: "Abnormal Electrical Discharge", content: "A sudden, uncontrolled electrical disturbance in the brain. Status Epilepticus is a seizure lasting > 5 mins or repeated seizures without recovery—a medical emergency." },
    signs: {
      left: ["Aura (Warning sign)", "Tonic-Clonic movements", "Post-ictal confusion", "Absence (staring)"],
      right: ["Status Epilepticus", "Cyanosis", "Aspiration", "Head Trauma"]
    },
    medications: [
      { name: "Lorazepam", type: "Benzodiazepine", action: "Terminates active seizure", sideEffects: "Sedation/Resp depression", contra: "Glaucoma", pearl: "First-line for Status Epilepticus." },
      { name: "Phenytoin", type: "Anticonvulsant", action: "Long-term control", sideEffects: "Gingival hyperplasia", contra: "Pregnancy", pearl: "Monitor therapeutic levels (10-20 mcg/mL)." }
    ],
    pearls: ["Nothing in the mouth during a seizure", "Turn client to the side to prevent aspiration", "Time the seizure and note the characteristics"],
    quiz: [{ question: "A client is having a tonic-clonic seizure. Priority action?", options: ["Insert a padded tongue blade", "Restrain the limbs", "Turn client to the side", "Administer oral meds"], correct: 2, rationale: "Airway and safety are the priority; turning the client to the side prevents aspiration of saliva or emesis." }]
  },
  "pressure-injury": {
    title: "Advanced Wound Care",
    cellular: { title: "Tissue Ischemia", content: "Localized damage to the skin and underlying soft tissue usually over a bony prominence. Caused by intense or prolonged pressure in combination with shear." },
    signs: {
      left: ["Stage 1: Non-blanchable redness", "Stage 2: Partial thickness/Blister", "Stage 3: Full thickness (Fat visible)"],
      right: ["Stage 4: Muscle/Bone visible", "Unstageable: Eschar/Slough", "Deep Tissue Injury: Purple/Maroon"]
    },
    medications: [{ name: "Hydrocolloid", type: "Dressing", action: "Moist wound healing", sideEffects: "Periwound maceration", contra: "Infected wounds", pearl: "Good for Stage 2 injuries." }],
    pearls: ["Turn every 2 hours", "Nutrition: High protein and Vitamin C", "Use pressure-redistribution surfaces"],
    quiz: [{ question: "Priority for a Stage 3 pressure injury?", options: ["Daily massage", "High-protein diet and repositioning", "Keeping the wound dry", "Applying a tight bandage"], correct: 1, rationale: "Protein is essential for tissue repair, and repositioning prevents further ischemia." }]
  },
  "siadh-di": {
    title: "SIADH vs Diabetes Insipidus",
    cellular: { title: "ADH Imbalance", content: "SIADH (Too much ADH) leads to water retention and dilutional hyponatremia. DI (Too little ADH) leads to massive water loss and hypernatremia." },
    signs: {
      left: ["SIADH: Low Urine Output", "High Urine Specific Gravity", "Weight Gain", "Hyponatremia"],
      right: ["DI: Massive Polyuria", "Low Urine Specific Gravity", "Extreme Thirst", "Dehydration"]
    },
    medications: [
      { name: "Desmopressin (DDAVP)", type: "Synthetic ADH", action: "Replaces missing ADH in DI", sideEffects: "Water intoxication", contra: "Renal failure", pearl: "Goal is decreased urine output." },
      { name: "Tolvaptan", type: "Vasopressin Antagonist", action: "Blocks ADH in SIADH", sideEffects: "Thirst/Dry mouth", contra: "Liver disease", pearl: "Increases serum sodium." }
    ],
    pearls: ["SIADH: Fluid restriction is the priority", "DI: Fluid replacement is the priority", "Monitor sodium levels every 4-6 hours"],
    quiz: [{ question: "Specific gravity of 1.002 is expected in which condition?", options: ["SIADH", "Diabetes Insipidus", "Dehydration", "Heart Failure"], correct: 1, rationale: "DI results in massive amounts of very dilute urine with a low specific gravity (<1.005)." }]
  },
  // NP / Advanced Practice Content
  "mi-management-np": {
    title: "STEMI: Molecular & Pharmacology",
    cellular: { 
      title: "Plaque Rupture & Cascade", 
      content: "Atherosclerotic plaque rupture exposes the subendothelium to blood, activating the coagulation cascade. Platelets adhere via von Willebrand factor, activating GP IIb/IIIa receptors. Thrombus formation occludes the coronary artery, leading to anaerobic metabolism, ATP depletion, and cellular acidosis. Without reperfusion, necrosis begins in the subendocardium and extends transmurally." 
    },
    signs: {
      left: ["Levine's Sign (Clenched fist)", "Diaphoresis (Sympathetic surge)", "S3/S4 Gallop (Compliance issue)", "New Murmur (Papillary dysfunction)"],
      right: ["Cardiogenic Shock (CI < 2.2)", "Ventricular Fibrillation", "Complete Heart Block (RCA)", "Free Wall Rupture (Day 3-7)"]
    },
    medications: [
      { name: "Dual Antiplatelet Therapy (DAPT)", type: "P2Y12 Inhibitor + Aspirin", action: "Inhibits platelet aggregation", sideEffects: "Bleeding", contra: "Active bleed", pearl: "Ticagrelor/Prasugrel preferred over Clopidogrel in acute coronary syndrome." },
      { name: "Tenecteplase (TNK)", type: "Fibrinolytic", action: "Converts plasminogen to plasmin", sideEffects: "ICH", contra: "History of hemorrhagic stroke", pearl: "Single weight-based bolus. Only if PCI > 120 mins away." }
    ],
    pearls: ["Door-to-Balloon time < 90 mins", "Door-to-Needle time < 30 mins (if no PCI)", "Beta-blockers reduce remodeling and arrhythmias (start within 24h)"],
    quiz: [{ question: "Which finding is an absolute contraindication to Fibrinolytic therapy in STEMI?", options: ["BP 170/90", "History of hemorrhagic stroke", "Current Aspirin use", "Age > 75"], correct: 1, rationale: "History of hemorrhagic stroke is an absolute contraindication due to the high risk of catastrophic intracranial hemorrhage." }]
  },
  "shock-syndromes-np": {
    title: "Shock: Hemodynamic Monitoring",
    cellular: { 
      title: "Oxygen Delivery (DO2) vs Consumption (VO2)", 
      content: "Shock is a state where DO2 fails to meet VO2, leading to cellular hypoxia and lactate production. \n\nCardiogenic: Low CO, High SVR, High PCWP. \nSeptic: High CO (early), Low SVR, Low/Normal PCWP. \nHypovolemic: Low CO, High SVR, Low PCWP." 
    },
    signs: {
      left: ["Lactate > 2 mmol/L", "ScvO2 < 70%", "Narrow Pulse Pressure (Cardiogenic)", "Widened Pulse Pressure (Septic)"],
      right: ["Multi-Organ Dysfunction (MODS)", "Refractory Hypotension", "DIC (Disseminated Intravascular Coagulation)", "Acute Tubular Necrosis"]
    },
    medications: [
      { name: "Norepinephrine", type: "Alpha-1 Agonist", action: "Vasoconstriction (SVR)", sideEffects: "Ischemia", contra: "Hypovolemia", pearl: "First-line pressor for Sepsis. Titrate to MAP > 65." },
      { name: "Dobutamine", type: "Beta-1 Agonist", action: "Inotropy (Contractility)", sideEffects: "Tachyarrhythmias", contra: "HOCM", pearl: "Used in Cardiogenic shock (Pump failure) with adequate BP." }
    ],
    pearls: ["Passive Leg Raise (PLR) is the best predictor of fluid responsiveness", "Avoid fluid overload in Cardiogenic shock (worsens pulmonary edema)", "Target MAP of 65 mmHg for end-organ perfusion"],
    quiz: [{ question: "In a patient with Septic Shock, what is the expected hemodynamic profile?", options: ["Low CO, High SVR", "High CO, Low SVR", "Low CO, Low SVR", "High CO, High SVR"], correct: 1, rationale: "Distributive shock (Sepsis) presents with vasodilation (Low SVR) and a compensatory increase in Cardiac Output (High CO) in the early phase." }]
  },
  "sepsis-mastery-np": {
    title: "Sepsis: Cytokine Storm & SOFA",
    cellular: { 
      title: "Dysregulated Host Response", 
      content: "Pathogen recognition receptors (TLRs) trigger NF-kB pathway, releasing pro-inflammatory cytokines (TNF-alpha, IL-1, IL-6). This causes widespread endothelial injury, capillary leak, and microvascular thrombosis (DIC). Mitochondrial dysfunction leads to dysoxia despite adequate oxygen delivery." 
    },
    signs: {
      left: ["qSOFA: RR >22, Altered Mental Status, SBP <100", "Lactate > 2", "Hyperglycemia (Stress)", "Oliguria"],
      right: ["Vasopressor dependence", "Mottling (Knee score)", "Platelets < 100k", "Creatinine > 2.0"]
    },
    medications: [
      { name: "Vasopressin", type: "V1 Agonist", action: "Splanchnic vasoconstriction", sideEffects: "Gut ischemia", contra: "Active CAD", pearl: "Second-line pressor. Sparing effect on Norepinephrine dose." },
      { name: "Hydrocortisone", type: "Corticosteroid", action: "Anti-inflammatory / Mineralocorticoid", sideEffects: "Hyperglycemia", contra: "Systemic fungal infection", pearl: "Used in refractory septic shock (200mg/day)." }
    ],
    pearls: ["Start broad-spectrum antibiotics within 1 hour (Surviving Sepsis)", "30mL/kg crystalloid bolus for hypotension/lactate > 4", "Reassess volume status frequently (dynamic measures preferred)"],
    quiz: [{ question: "Which mechanism explains the microvascular thrombosis seen in severe sepsis?", options: ["Platelet destruction", "Suppression of Fibrinolysis (PAI-1)", "Vitamin K deficiency", "Excessive Heparin"], correct: 1, rationale: "Sepsis increases Plasminogen Activator Inhibitor-1 (PAI-1), suppressing fibrinolysis while coagulation is activated, leading to disseminated clots." }]
  },
  "siadh-di-np": {
    title: "Sodium Disorders: Osmoregulation",
    cellular: { 
      title: "Arginine Vasopressin (AVP) Pathophysiology", 
      content: "SIADH: Ectopic or inappropriate AVP release leads to insertion of Aquaporin-2 channels in the collecting duct, causing pure water retention (Euvolemic Hyponatremia). \nDI: Lack of AVP (Central) or renal resistance (Nephrogenic) prevents water reabsorption, leading to massive dilute urine output." 
    },
    signs: {
      left: ["SIADH: Serum Osm < 275", "Urine Osm > 100", "Urine Na > 40", "Euvolemia"],
      right: ["DI: Serum Osm > 295", "Urine Osm < 300", "Hypernatremia", "Polyuria (>3L/day)"]
    },
    medications: [
      { name: "3% Hypertonic Saline", type: "Hypertonic Crystalloid", action: "Rapidly raises Serum Na", sideEffects: "Osmotic Demyelination", contra: "Chronic hyponatremia (rapid correction)", pearl: "Max correction 8-10 mEq/L in 24h." },
      { name: "Desmopressin", type: "AVP Analogue", action: "V2 receptor agonist", sideEffects: "Hyponatremia", contra: "SIADH", pearl: "Dose titrated to urine output/thirst in Central DI." }
    ],
    pearls: ["Osmotic Demyelination Syndrome (ODS) is the risk of correcting chronic hyponatremia too fast", "Check Serum Osmolality to confirm hypotonicity first", "Vaptans (Tolvaptan) block V2 receptors in SIADH"],
    quiz: [{ question: "A patient with SIADH is corrected too rapidly with 3% saline. What is the dreaded complication?", options: ["Cerebral Edema", "Osmotic Demyelination Syndrome", "Pulmonary Embolism", "Renal Failure"], correct: 1, rationale: "Rapid correction causes water to rush out of brain cells, stripping the myelin sheath (Central Pontine Myelinolysis)." }]
  },
  "aaa-rupture-np": {
    title: "AAA: Pathogenesis & Management",
    cellular: { 
      title: "Matrix Metalloproteinases (MMPs)", 
      content: "Inflammation leads to upregulation of MMPs which degrade elastin and collagen in the aortic media. This structural weakening, combined with LaPlace's Law (Wall Tension = Pressure x Radius), creates a cycle of dilation. Rupture occurs when wall stress exceeds tensile strength." 
    },
    signs: {
      left: ["Pulsatile mass", "Grey Turner's Sign (Flank ecchymosis)", "Cullen's Sign (Periumbilical)", "Femoral bruit"],
      right: ["Hypotension + Back Pain = Rupture", "Loss of distal pulses", "Mottling", "Profound Acidosis"]
    },
    medications: [
      { name: "Esmolol", type: "Beta-1 Blocker", action: "Lowers HR/BP (Shear stress)", sideEffects: "Bradycardia", contra: "Acute Decompensated HF", pearl: "Titratable infusion. Goal SBP < 120." },
      { name: "Tranexamic Acid (TXA)", type: "Antifibrinolytic", action: "Stabilizes clot", sideEffects: "Seizures (high dose)", contra: "Active intravascular clotting", pearl: "Consider in massive transfusion protocols." }
    ],
    pearls: ["Permissive hypotension (SBP 70-90) until control is achieved to prevent clot blowout", "Endovascular Aneurysm Repair (EVAR) vs Open", "Control pain/anxiety to reduce sympathetic surge"],
    quiz: [{ question: "According to LaPlace's Law, as the aneurysm radius increases, what happens to wall tension?", options: ["Decreases", "Increases", "Stays the same", "Becomes zero"], correct: 1, rationale: "Wall Tension = Pressure × Radius. A larger radius increases tension, increasing rupture risk." }]
  },
  "dka-hhns-np": {
    title: "DKA/HHS: Anion Gap & Osmolality",
    cellular: { 
      title: "Insulin Deficiency & Counter-Regulatory Hormones", 
      content: "DKA: Absolute insulin deficiency leads to lipolysis. Free fatty acids are oxidized to ketone bodies (beta-hydroxybutyrate), causing metabolic acidosis. \nHHS: Relative insulin deficiency prevents ketosis but severe hyperglycemia causes massive osmotic diuresis and hyperosmolar state." 
    },
    signs: {
      left: ["DKA: Kussmaul Respirations", "Fruity Breath", "Anion Gap > 12", "pH < 7.3"],
      right: ["HHS: Glucose > 600", "Serum Osm > 320", "Profound Dehydration", "Altered Mental Status"]
    },
    medications: [
      { name: "Regular Insulin", type: "Short-acting", action: "Drives Glucose/K+ into cells", sideEffects: "Hypoglycemia/Hypokalemia", contra: "K+ < 3.3", pearl: "Wait until K+ > 3.3 to start insulin." },
      { name: "Potassium Chloride", type: "Electrolyte", action: "Repletion", sideEffects: "Arrhythmias", contra: "Hyperkalemia", pearl: "Insulin causes rapid intracellular K+ shift." }
    ],
    pearls: ["Close the Anion Gap, don't just fix the glucose", "Add Dextrose to fluids when Glucose < 200 to prevent hypoglycemia while clearing ketones", "Cerebral edema risk in children if Osm drops too fast"],
    quiz: [{ question: "Why must potassium be > 3.3 before starting insulin in DKA?", options: ["Insulin is ineffective otherwise", "Insulin drives K+ into cells, risking lethal arrhythmias", "K+ prevents hypoglycemia", "It increases pH"], correct: 1, rationale: "Insulin shifts K+ intracellularly. Starting it in a hypokalemic patient can cause fatal cardiac arrest." }]
  },
  "increased-icp-np": {
    title: "ICP: Cerebral Perfusion Pressure",
    cellular: { 
      title: "Autoregulation Failure", 
      content: "Cerebral Blood Flow (CBF) is autoregulated. When ICP rises, MAP must rise to maintain CPP (CPP = MAP - ICP). If ICP exceeds MAP, perfusion stops. Brain herniation (Uncal, Tonsillar) causes mechanical compression of the brainstem." 
    },
    signs: {
      left: ["Headache", "Vomiting", "Papilledema", "CN VI Palsy"],
      right: ["Cushing's Reflex (HTN, Brady, Irregular RR)", "Fixed/Dilated Pupil (Uncal)", "Decerebrate Posturing", "Apnea"]
    },
    medications: [
      { name: "Hypertonic Saline (3% or 23.4%)", type: "Osmotic Agent", action: "Pulls water from brain", sideEffects: "Hypernatremia", contra: "Fluid overload", pearl: "Preferred over Mannitol in hypotensive patients." },
      { name: "Propofol", type: "Sedative", action: "Reduces CMRO2", sideEffects: "Hypotension", contra: "Egg allergy", pearl: "Metabolic suppression reduces blood flow demand." }
    ],
    pearls: ["Target CPP > 60 mmHg", "Hyperventilation (CO2 30-35) is a temporary bridge (vasoconstriction reduces ICP but risks ischemia)", "Keep HOB 30 degrees, head midline"],
    quiz: [{ question: "How does hyperventilation lower ICP?", options: ["Increases oxygen delivery", "Causes cerebral vasoconstriction", "Increases venous return", "Lowers blood pressure"], correct: 1, rationale: "Hypocapnia (low CO2) causes cerebral vasoconstriction, reducing cerebral blood volume and ICP temporarily." }]
  },
  "copd-exacerbation-np": {
    title: "COPD: Cellular Mechanisms",
    cellular: { 
      title: "Protease-Antiprotease Imbalance", 
      content: "Cigarette smoke activates neutrophils/macrophages, releasing proteases (elastase) that destroy alveolar walls (Emphysema). Chronic Bronchitis involves goblet cell hyperplasia and mucus plugging. V/Q mismatch leads to hypoxemia and hypercapnia." 
    },
    signs: {
      left: ["Accessory muscle use", "Pursed-lip breathing", "Prolonged expiration", "Wheezing"],
      right: ["Pulsus Paradoxus", "Asterixis (CO2 narcosis)", "Central Cyanosis", "Cor Pulmonale (RHF)"]
    },
    medications: [
      { name: "BiPAP", type: "NIV Support", action: "Decreases work of breathing", sideEffects: "Aspiration", contra: "Coma/Vomiting", pearl: "First-line for hypercapnic respiratory failure." },
      { name: "Azithromycin", type: "Macrolide", action: "Anti-inflammatory/Antibiotic", sideEffects: "QT prolongation", contra: "Arrhythmias", pearl: "Used for anti-inflammatory properties in exacerbations." }
    ],
    pearls: ["Permissive Hypercapnia: Tolerate high CO2 if pH > 7.25", "Avoid intubation if possible (difficult to wean)", "Target SpO2 88-92% to maintain hypoxic drive"],
    quiz: [{ question: "What is the primary indication for BiPAP in COPD exacerbation?", options: ["Hypoxemia", "Respiratory Acidosis (pH < 7.35)", "Comfort", "Pneumonia"], correct: 1, rationale: "BiPAP improves ventilation, helps blow off CO2, and reverses respiratory acidosis." }]
  },
  "aki-management-np": {
    title: "AKI: RIFLE Criteria & Dialysis",
    cellular: { 
      title: "Tubular Necrosis & GFR", 
      content: "Ischemia or toxins cause sloughing of tubular epithelial cells, obstructing tubules (muddy brown casts). Afferent arteriolar constriction (Pre-renal) reduces GFR. Post-renal obstruction increases Bowman's capsule pressure, halting filtration." 
    },
    signs: {
      left: ["Oliguria", "Azotemia (High BUN)", "Edema", "Acidosis"],
      right: ["Uremic Pericarditis (Friction rub)", "Encephalopathy", "Hyperkalemia > 6.5", "Pulmonary Edema"]
    },
    medications: [
      { name: "Calcium Gluconate", type: "Membrane Stabilizer", action: "Protects myocardium", sideEffects: "Hypercalcemia", contra: "Digoxin toxicity (caution)", pearl: "First line for hyperkalemic EKG changes." },
      { name: "Furosemide (Stress Test)", type: "Loop Diuretic", action: "Assess tubular function", sideEffects: "Ototoxicity", contra: "Anuria", pearl: "If no response to high dose, stop (don't flog the kidneys)." }
    ],
    pearls: ["Indications for Dialysis (AEIOU): Acidosis, Electrolytes (K+), Intoxication, Overload, Uremia", "FeNa < 1% = Pre-renal; FeNa > 2% = ATN", "Avoid nephrotoxins (NSAIDs, ACEi, Contrast)"],
    quiz: [{ question: "Which finding is an absolute indication for emergent dialysis?", options: ["Creatinine of 4.0", "BUN of 80", "Refractory Hyperkalemia", "Oliguria"], correct: 2, rationale: "Refractory hyperkalemia that doesn't respond to medical management is lethal and requires immediate dialysis." }]
  },
  "preeclampsia": {
    title: "Preeclampsia & Mag Safety",
    cellular: { title: "Endothelial Dysfunction", content: "Pregnancy-induced hypertension characterized by systemic vasospasm and endothelial damage, leading to decreased organ perfusion." },
    signs: {
      left: ["BP > 140/90", "Proteinuria", "Edema (Face/Hands)", "Headache"],
      right: ["Eclampsia (Seizures)", "HELLP Syndrome", "RUQ Pain (Liver)", "Visual Changes"]
    },
    medications: [
      { name: "Magnesium Sulfate", type: "Anticonvulsant", action: "Prevents seizures", sideEffects: "Flushing/Nausea", contra: "Myasthenia Gravis", pearl: "Antidote: Calcium Gluconate." },
      { name: "Hydralazine", type: "Antihypertensive", action: "Rapid BP reduction", sideEffects: "Tachycardia", contra: "CAD", pearl: "Used for acute hypertensive crisis." }
    ],
    pearls: ["Check Deep Tendon Reflexes (DTRs) hourly on Mag", "Mag Toxicity: DTRs disappear first, then RR drops", "Quiet, dark room to prevent seizures"],
    quiz: [{ question: "First sign of Magnesium Sulfate toxicity?", options: ["Respiratory arrest", "Loss of deep tendon reflexes", "Hypotension", "Visual blurring"], correct: 1, rationale: "Loss of DTRs is an early and critical indicator that Mag levels are too high." }]
  },
  "lithium-toxicity": {
    title: "Lithium & Mood Stabilizers",
    cellular: { title: "Ion Competition", content: "Lithium is a salt that competes with Sodium in the kidneys. Dehydration or low sodium intake causes the kidneys to reabsorb lithium, leading to toxicity." },
    signs: {
      left: ["Therapeutic range: 0.6 - 1.2 mEq/L", "Mild tremor", "Nausea", "Thirst"],
      right: ["Toxicity (>1.5): Confusion", "Ataxia", "Coarse tremors", "Blurred vision"]
    },
    medications: [{ name: "Lithium Carbonate", type: "Mood Stabilizer", action: "Alters neurotransmitters", sideEffects: "Polyuria/Weight gain", contra: "Renal failure", pearl: "Maintain consistent sodium intake." }],
    pearls: ["Avoid NSAIDs - they increase lithium levels", "Ensure 2-3L fluid intake daily", "Monitor renal function and thyroid"],
    quiz: [{ question: "A patient on lithium has diarrhea and blurred vision. Action?", options: ["Give the next dose", "Increase salt intake", "Hold dose and call provider", "Nothing, these are normal"], correct: 2, rationale: "Diarrhea and blurred vision are signs of toxicity; the drug must be stopped immediately." }]
  },
  "sickle-cell": {
    title: "Sickle Cell Crisis",
    cellular: { title: "Hemoglobin S Polymerization", content: "Under stress (hypoxia, dehydration, acidosis), HgbS changes shape into rigid sickled cells. These clump together, occluding small vessels (vaso-occlusion) causing ischemia and severe pain." },
    signs: {
      left: ["Severe Pain (Joints/Bones)", "Fatigue/Anemia", "Jaundice (Hemolysis)", "Priapism"],
      right: ["Acute Chest Syndrome (Fever/CP)", "Splenic Sequestration (Shock)", "Stroke symptoms", "Dactylitis (Hand-Foot Swelling)"]
    },
    medications: [
      { name: "Hydroxyurea", type: "Antineoplastic", action: "Increases Fetal Hemoglobin (HgbF)", sideEffects: "Bone marrow suppression", contra: "Pregnancy", pearl: "Reduces frequency of crises." },
      { name: "Morphine/Hydromorphone", type: "Opioid", action: "Severe pain control", sideEffects: "Resp Depression", contra: "None in crisis", pearl: "PCA pump often used." }
    ],
    pearls: ["Hydration is the #1 priority to reduce viscosity", "Oxygen only if hypoxic (<92%)", "Avoid cold compresses - causes vasoconstriction"],
    quiz: [{ question: "Priority intervention for Sickle Cell Crisis?", options: ["Apply ice to joints", "Administer IV fluids", "Genetic counseling", "Start antibiotics"], correct: 1, rationale: "IV fluids dilute the blood, helping to unclump the sickled cells and restore perfusion." }]
  },
  "acute-abdomen": {
    title: "Appendicitis & Cholecystitis",
    cellular: { title: "Obstruction & Inflammation", content: "Appendicitis: Obstruction of the appendix lumen (fecalith) leads to infection/perforation. Cholecystitis: Gallstone obstructs cystic duct, causing gallbladder inflammation." },
    signs: {
      left: ["Appy: RLQ Pain (McBurney's)", "Chole: RUQ Pain -> Shoulder", "Fever/Nausea", "Rebound Tenderness"],
      right: ["Sudden relief of pain (Perforation)", "Board-like Abdomen (Peritonitis)", "Tachycardia/Hypotension (Septic Shock)", "Murphy's Sign (Chole)"]
    },
    medications: [
      { name: "Ceftriaxone/Metronidazole", type: "Antibiotics", action: "Treats intra-abdominal infection", sideEffects: "GI upset", contra: "Allergy", pearl: "Pre-op prophylaxis." },
      { name: "Ketorolac", type: "NSAID", action: "Pain relief", sideEffects: "Bleeding risk", contra: "Renal failure", pearl: "Use with caution pre-op." }
    ],
    pearls: ["NPO immediately for surgery", "No heat pads for Appendicitis (risk of rupture)", "Semi-Fowler's position aids drainage if perforated"],
    quiz: [{ question: "A child with appendicitis suddenly reports the pain is gone. Priority?", options: ["Cancel surgery", "Notify provider immediately", "Give food", "Discharge home"], correct: 1, rationale: "Sudden relief of pain is a hallmark sign of rupture, which leads to peritonitis." }]
  },
  "pyloric-intussusception": {
    title: "Pyloric Stenosis & Intussusception",
    cellular: { title: "Mechanical Obstruction", content: "Pyloric: Hypertrophy of pyloric sphincter blocks gastric emptying. Intussusception: Bowel telescopes into itself, cutting off blood supply." },
    signs: {
      left: ["Pyloric: Projectile Vomiting", "Olive-shaped mass", "Intuss: Colicky Pain", "Sausage-shaped mass"],
      right: ["Intuss: Currant Jelly Stool", "Dehydration (Sunken fontanelle)", "Metabolic Alkalosis (Pyloric)", "Shock symptoms"]
    },
    medications: [{ name: "IV Fluids", type: "Isotonic", action: "Rehydration", sideEffects: "Fluid overload", contra: "None", pearl: "Correct electrolyte imbalances before surgery." }],
    pearls: ["Pyloric: Vomiting is non-bilious", "Intussusception: Air enema is diagnostic and often curative", "Monitor for passage of normal stool"],
    quiz: [{ question: "Classic sign of Intussusception?", options: ["Projectile vomiting", "Currant jelly stools", "Olive mass", "Steatorrhea"], correct: 1, rationale: "Stools mixed with blood and mucus (currant jelly) are characteristic of intussusception." }]
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
    };
    window.addEventListener("regionChange", handleRegionChange);
    return () => window.removeEventListener("regionChange", handleRegionChange);
  }, []);

  const lessonContent = useMemo(() => {
    return contentMap[id as string] || contentMap["neuro-basics"];
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

  const isPeds = id?.includes("peds") || id === "epiglottitis" || id === "cp-management" || id === "kawasaki-critical" || id === "all-leukemia";
  const isMeds = id?.includes("safety") || id?.includes("labs") || id?.includes("mi-management");

  const regionalLabs = useMemo(() => {
    if (region === "CA") {
      return {
        potassium: "3.5 - 5.0 mmol/L",
        sodium: "135 - 145 mmol/L",
        glucose: "4.0 - 7.0 mmol/L",
        creatinine: "45 - 110 µmol/L",
        hemoglobin: "120 - 160 g/L",
        platelets: "150 - 400 x 10^9/L",
        anc_critical: "< 0.5 x 10^9/L"
      };
    } else {
      return {
        potassium: "3.5 - 5.0 mEq/L",
        sodium: "135 - 145 mEq/L",
        glucose: "70 - 110 mg/dL",
        creatinine: "0.6 - 1.2 mg/dL",
        hemoglobin: "12 - 16 g/dL",
        platelets: "150,000 - 400,000/mm^3",
        anc_critical: "< 500/mm^3"
      };
    }
  }, [region]);
  
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Button>
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               {isPeds && (
                 <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
                    <Baby className="w-6 h-6" />
                 </div>
               )}
               {isMeds && (
                 <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500">
                    <Beaker className="w-6 h-6" />
                 </div>
               )}
               <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Focus</span>
              <span className="text-gray-500 text-sm">Clinical Excellence</span>
            </div>
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Learning Progress</p>
                <p className="text-gray-600">Complete the module to track mastery.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "25%"}</p>
                <Progress value={quizComplete ? 100 : 25} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Microscope className="text-primary w-8 h-8" />
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {regionalLabs && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Beaker className="text-amber-500 w-8 h-8" />
                <h2>{region === "CA" ? "Canadian Clinical Data" : "US Clinical Data"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(regionalLabs).map(([key, value]) => (
                  <Card key={key} className="border-none shadow-sm bg-white p-4">
                    <p className="text-sm font-bold text-gray-400 uppercase">{key.replace('_', ' ')}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {lessonContent.lifespan && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Users className="text-indigo-500 w-8 h-8" />
                <h2>Across the Lifespan</h2>
              </div>
              <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 leading-relaxed text-indigo-900 italic">
                {lessonContent.lifespan.content}
              </div>
            </section>
          )}

          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Clinical Findings</h3>
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
                  <h3>Danger Signs</h3>
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

          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>Pharmacology and Safety</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden text-gray-900">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
                    <span className="font-bold text-gray-900">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
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

          <section className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-primary w-8 h-8" />
              <h2>REX-PN Mastery</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Priority Principles</h4>
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
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Danger Zone</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Clinical reasoning over memorization. If something changes suddenly, it is your priority.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t border-gray-100">
            {!quizStarted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Case Study Challenge</h2>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Mastery Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Module Mastered!</h2>
                <p className="text-xl text-gray-600">Scored {score} / {lessonContent.quiz.length}</p>
                <div className="pt-4">
                  <Link href="/lessons">
                    <Button variant="outline" className="rounded-full px-8">Return to Overview</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{lessonContent.quiz[currentQuestion].question}</h3>
                </div>
                <div className="grid gap-4">
                  {lessonContent.quiz[currentQuestion].options.map((option, i) => (
                    <Button 
                      key={i} variant="outline" onClick={() => handleAnswer(i)}
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

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
