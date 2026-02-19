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
  "tumor-lysis-np": {
    title: "Tumor Lysis Syndrome: Uric Acid Crisis",
    cellular: { 
      title: "Massive Cellular Destruction", 
      content: "Oncologic emergency where cancer treatment destroys a large number of cells rapidly, releasing intracellular potassium, phosphate, and nucleic acids into circulation. Nucleic acids are metabolized to uric acid, which precipitates in renal tubules, causing acute kidney injury (AKI)." 
    },
    signs: {
      left: ["Hyperkalemia (Arrhythmias)", "Hyperphosphatemia", "Hypocalcemia (Tetany/Seizures)", "Hyperuricemia"],
      right: ["Oliguria / Anuria", "Flank Pain", "Lethargy", "EKG Changes (Peaked T)"]
    },
    medications: [
      { name: "Rasburicase", type: "Recombinant Urate Oxidase", action: "Converts uric acid to allantoin", sideEffects: "Anaphylaxis", contra: "G6PD Deficiency", pearl: "Rapidly lowers uric acid (more effective than Allopurinol)." },
      { name: "Allopurinol", type: "Xanthine Oxidase Inhibitor", action: "Prevents uric acid formation", sideEffects: "Rash (SJS)", contra: "Hypersensitivity", pearl: "Used for prophylaxis, not acute treatment." }
    ],
    pearls: ["Aggressive hydration (3L/m2/day) is the cornerstone of prevention", "Keep urine pH > 7.0 (alkalinization controversy)", "Monitor Calcium x Phosphate product > 60 (Risk of calcification)"],
    quiz: [{ question: "A patient with TLS has a uric acid level of 10 mg/dL. Which medication is best for rapid correction?", options: ["Allopurinol", "Rasburicase", "Furosemide", "Kayexalate"], correct: 1, rationale: "Rasburicase actively breaks down existing uric acid, whereas Allopurinol only prevents the formation of new uric acid." }]
  },
  "transfusion-reactions-np": {
    title: "Transfusion Reactions: Hemolytic vs Febrile",
    cellular: { 
      title: "Antibody-Mediated Hypersensitivity", 
      content: "Acute Hemolytic: ABO incompatibility leads to IgM antibodies attacking donor RBCs, causing complement activation, massive hemolysis, and inflammatory cytokine release (Shock/DIC). \nFebrile Non-Hemolytic: Cytokines released from donor leukocytes accumulate during storage." 
    },
    signs: {
      left: ["Hemolytic: Flank/Back Pain", "Dark Red Urine (Hemoglobinuria)", "Hypotension + Tachycardia", "Positive Direct Coombs"],
      right: ["Febrile: Fever + Chills (within 4h)", "Malaise", "No hemolysis/red urine", "Anaphylactic: Wheezing, Hives, Shock"]
    },
    medications: [
      { name: "Epinephrine", type: "Alpha/Beta Agonist", action: "Vasoconstriction/Bronchodilation", sideEffects: "Tachycardia", contra: "None in anaphylaxis", pearl: "First line for Anaphylactic reaction." },
      { name: "Acetaminophen", type: "Antipyretic", action: "Lowers set point", sideEffects: "Hepatotoxicity", contra: "Liver failure", pearl: "Pre-medication for Febrile Non-Hemolytic reactions." }
    ],
    pearls: ["STOP the transfusion immediately for any reaction", "Hemolytic reaction causes AKI via hemoglobin precipitation in tubules", "Anaphylactic reaction is due to IgA deficiency (anti-IgA antibodies)"],
    quiz: [{ question: "A patient receiving blood complains of sudden severe back pain and has dark urine. What is the reaction?", options: ["Febrile Non-Hemolytic", "Acute Hemolytic", "Anaphylactic", "TRALI"], correct: 1, rationale: "Flank/back pain and hemoglobinuria (dark urine) are classic signs of acute hemolysis (kidney damage from lysed RBCs)." }]
  },
  "fetal-monitoring-advanced": {
    title: "Fetal Monitoring: Late & Variable Decels",
    cellular: { 
      title: "Uteroplacental Insufficiency", 
      content: "Late Decelerations: Placental insufficiency causes fetal hypoxia after the contraction peak. Reflex vasoconstriction preserves blood flow to vital organs but indicates acidosis if persistent. \nVariable Decelerations: Umbilical cord compression obstructs blood flow, causing rapid drops in FHR." 
    },
    signs: {
      left: ["Late: Decel starts after contraction peak", "Variable: Abrupt 'V' or 'W' shape", "Loss of Variability (Hypoxia)", "Fetal Tachycardia (Infection/Hypoxia)"],
      right: ["Interventions: Turn to Left Lateral", "Stop Pitocin (Oxytocin)", "IV Fluid Bolus", "O2 via non-rebreather"]
    },
    medications: [
      { name: "Terbutaline", type: "Tocolytic", action: "Relaxes uterus", sideEffects: "Tachycardia", contra: "HR > 120", pearl: "Used for uterine tachysystole causing distress." },
      { name: "Magnesium Sulfate", type: "Neuroprotection", action: "Vasodilation/CNS depression", sideEffects: "Respiratory depression", contra: "Myasthenia Gravis", pearl: "Neuroprotection for preterm delivery < 32 weeks." }
    ],
    pearls: ["VEAL CHOP: Variable-Cord, Early-Head, Accel-Ok, Late-Placenta", "Amnioinfusion can relieve variable decels (cord compression)", "Acidemia: Umbilical artery pH < 7.20 indicates fetal compromise"],
    quiz: [{ question: "Priority action for repetitive Late Decelerations?", options: ["Increase Oxytocin", "Reposition to lateral side", "Perform amnioinfusion", "Document as normal"], correct: 1, rationale: "Late decelerations indicate placental insufficiency. Lateral positioning improves uterine blood flow by relieving caval compression." }]
  },
  "wound-vac-np": {
    title: "Negative Pressure Wound Therapy",
    cellular: { 
      title: "Microstrain & Angiogenesis", 
      content: "NPWT applies sub-atmospheric pressure to the wound bed. This removes exudate/infectious material, reduces edema, and creates 'microstrain' on cells which stimulates mitosis, angiogenesis (new blood vessels), and granulation tissue formation." 
    },
    signs: {
      left: ["Beefy Red Granulation (Good)", "Reduced Edema", "Decreased Wound Dimensions", "Intact Seal"],
      right: ["Air Leak (Machine Alarm)", "Bleeding (Anticoagulants)", "Maceration of Peri-wound", "Necrotic Tissue (Contraindication)"]
    },
    medications: [
      { name: "Becaplermin", type: "PDGF Gel", action: "Stimulates cell migration", sideEffects: "Malignancy warning", contra: "Neoplasm at site", pearl: "Recombinant Platelet-Derived Growth Factor for diabetic ulcers." }
    ],
    pearls: ["Foam must be cut to fit exactly (don't overlap intact skin)", "Maintain airtight seal (use drape)", "Stop if frank bleeding occurs"],
    quiz: [{ question: "How does Negative Pressure Wound Therapy primarily promote healing?", options: ["Drying out the wound", "Removing healthy tissue", "Stimulating angiogenesis and reducing edema", "Applying antibiotics"], correct: 2, rationale: "The suction removes interstitial fluid (edema) allowing blood flow, and the mechanical stress stimulates new blood vessel growth." }]
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
  },
  "prenatal-basics": {
    title: "Prenatal Care Essentials",
    cellular: { title: "Embryonic & Fetal Development", content: "Prenatal care ensures optimal maternal and fetal outcomes through scheduled assessments. Visit schedule: Monthly until 28 weeks, biweekly 28-36 weeks, weekly 36 weeks until delivery. Key assessments include GTPAL (Gravida, Term, Preterm, Abortions, Living), fundal height (should equal gestational age in cm at 20-36 weeks), and fetal heart tones (normal 110-160 bpm). Folic acid (400-800 mcg daily) prevents neural tube defects and should begin before conception." },
    signs: {
      left: ["Vaginal Bleeding (any trimester)", "Severe Persistent Headache", "Epigastric Pain (liver distention)", "Visual Changes (blurring, scotomata)"],
      right: ["Decreased Fetal Movement (<10 kicks/2hrs)", "Sudden Severe Edema (face/hands)", "Rupture of Membranes before 37 weeks", "Fever >100.4°F / Signs of Infection"]
    },
    medications: [
      { name: "Prenatal Vitamins with Folic Acid", type: "Supplement", action: "Prevents neural tube defects and supports fetal development", sideEffects: "Nausea, constipation", contra: "None significant", pearl: "Begin folic acid ideally 3 months before conception; iron component best absorbed on empty stomach with vitamin C." },
      { name: "Rho(D) Immune Globulin (RhoGAM)", type: "Immunoglobulin", action: "Prevents Rh sensitization in Rh-negative mothers", sideEffects: "Injection site soreness", contra: "Rh-positive mother", pearl: "Given at 28 weeks and within 72 hours postpartum if newborn is Rh-positive." }
    ],
    pearls: ["GTPAL: Gravida = total pregnancies; Para = deliveries past 20 weeks (T-P-A-L)", "Nagele's Rule: LMP first day minus 3 months plus 7 days = EDD", "Fundal height at umbilicus = approximately 20 weeks gestation"],
    quiz: [{ question: "A pregnant client at 32 weeks reports sudden blurred vision and a severe headache. Priority action?", options: ["Schedule next prenatal visit", "Check blood pressure immediately", "Recommend rest and fluids", "Advise taking acetaminophen"], correct: 1, rationale: "Severe headache with visual changes are warning signs of preeclampsia; blood pressure assessment is the immediate priority." }]
  },
  "labor-stages": {
    title: "Stages of Labor",
    cellular: { title: "Cervical Changes & Uterine Contractions", content: "Labor progresses through four stages driven by coordinated uterine contractions. Stage 1: Cervical effacement and dilation (0-10cm) with three phases — Latent (0-6cm, mild contractions q5-30min), Active (6-8cm, moderate contractions q3-5min), and Transition (8-10cm, strong contractions q2-3min lasting 60-90sec). Stage 2: Complete dilation to delivery of the infant. Stage 3: Delivery of the placenta (5-30 minutes). Stage 4: Recovery period (first 1-2 hours postpartum) with close monitoring for hemorrhage." },
    signs: {
      left: ["Latent: Mild contractions, talkative", "Active: Increased pain, focused breathing", "Transition: Intense pressure, nausea, irritability", "Stage 2: Urge to push, crowning"],
      right: ["Stage 3: Gush of blood, cord lengthening", "Stage 4: Fundal firmness check q15min", "Abnormal: Late decelerations on FHR", "Abnormal: Meconium-stained amniotic fluid"]
    },
    medications: [
      { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Stimulates uterine contractions for induction/augmentation", sideEffects: "Uterine tachysystole, water intoxication", contra: "CPD, placenta previa, prior classical C-section", pearl: "Always titrate to achieve contractions q2-3 min lasting 60-90 sec; have terbutaline available to stop hyperstimulation." },
      { name: "Fentanyl/Epidural", type: "Analgesic/Anesthetic", action: "Pain management during labor", sideEffects: "Hypotension, urinary retention, respiratory depression (opioids)", contra: "Coagulopathy (epidural), active hemorrhage", pearl: "Pre-hydrate with 500-1000mL NS before epidural placement to prevent hypotension." }
    ],
    pearls: ["Transition phase is the shortest but most intense; provide continuous support", "Monitor FHR continuously during active labor and Stage 2", "Stage 4 hemorrhage risk highest: assess fundal tone and lochia q15min x1hr"],
    quiz: [{ question: "During which phase of Stage 1 is the client most likely to feel nauseous, shaky, and irritable?", options: ["Latent phase", "Active phase", "Transition phase", "Pushing phase"], correct: 2, rationale: "Transition (8-10cm) is the most intense phase with strong, frequent contractions causing nausea, trembling, and irritability." }]
  },
  "postpartum-basics": {
    title: "Postpartum Assessment",
    cellular: { title: "Uterine Involution & Recovery", content: "After delivery, the uterus undergoes involution — returning to its pre-pregnant state over approximately 6 weeks. The fundus should be firm, midline, and at or below the umbilicus immediately postpartum, descending approximately 1 cm (one fingerbreadth) per day. The BUBBLE-HE mnemonic guides systematic postpartum assessment: Breasts (engorgement, nipple integrity), Uterus (fundal height, firmness), Bladder (distention, voiding), Bowel (function, hemorrhoids), Lochia (type, amount, odor), Episiotomy/incision (REEDA: Redness, Edema, Ecchymosis, Discharge, Approximation), Homan sign (calf tenderness for DVT), and Emotions (bonding, mood changes, postpartum depression screening)." },
    signs: {
      left: ["Boggy Uterus (atony)", "Lochia Rubra (days 1-3, dark red)", "Lochia Serosa (days 4-10, pink/brown)", "Lochia Alba (day 10+, yellowish-white)"],
      right: ["Fundus above umbilicus or deviated", "Foul-smelling lochia (infection)", "Heavy bleeding soaking pad in <1 hour", "Positive Homan sign (DVT risk)"]
    },
    medications: [
      { name: "Methylergonovine (Methergine)", type: "Ergot Alkaloid", action: "Sustained uterine contraction to control postpartum hemorrhage", sideEffects: "Hypertension, nausea, cramping", contra: "Hypertension or preeclampsia", pearl: "Check BP before administration; contraindicated if BP elevated. Given IM or PO, never IV push." },
      { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Stimulates uterine contractions postpartum to prevent hemorrhage", sideEffects: "Water intoxication, cramping", contra: "None significant postpartum", pearl: "First-line drug for postpartum hemorrhage; often added to IV after placenta delivery." }
    ],
    pearls: ["A boggy uterus is the #1 cause of postpartum hemorrhage — massage the fundus firmly", "Bladder distention displaces the uterus and prevents contraction", "Lochia should never contain large clots (>golf ball size) or have a foul odor"],
    quiz: [{ question: "A postpartum client has a boggy uterus displaced to the right. Priority nursing action?", options: ["Administer Methergine", "Have the client void and then reassess", "Call the provider immediately", "Apply ice to the abdomen"], correct: 1, rationale: "A full bladder displaces the uterus and prevents contraction. Have the client void first, then reassess fundal firmness." }]
  },
  "breastfeeding-basics": {
    title: "Breastfeeding and Lactation",
    cellular: { title: "Lactation Physiology", content: "Prolactin stimulates milk production, while oxytocin triggers the let-down reflex (milk ejection). Colostrum is produced in the first 2-5 days — it is rich in immunoglobulins (IgA), protein, and provides passive immunity. Transitional milk appears days 5-14, followed by mature milk. Proper latch requires the infant's mouth to cover the entire areola (not just the nipple), with lips flanged outward, audible swallowing, and rhythmic suck-swallow-breathe pattern. Engorgement occurs when milk supply exceeds demand, causing breast swelling and pain." },
    signs: {
      left: ["Proper Latch: wide mouth, flanged lips", "Audible swallowing during feeds", "Softened breasts after feeding", "Infant content between feedings"],
      right: ["6-8 wet diapers/day by day 4", "3-4 yellow seedy stools/day (breastfed)", "Steady weight gain after initial loss", "Urate crystals (brick dust) normal first 2 days"]
    },
    medications: [{ name: "Lanolin Cream", type: "Topical Emollient", action: "Protects and heals cracked nipples", sideEffects: "Rare allergic reaction (wool allergy)", contra: "Lanolin/wool allergy", pearl: "Does not need to be removed before breastfeeding; apply after each feed to moist nipples." }],
    pearls: ["Feed on demand, typically every 2-3 hours (8-12 times per day) in the newborn period", "Contraindications to breastfeeding: HIV (in developed countries), active herpes on breast, certain medications, active substance abuse", "Cabbage leaves and cold compresses help relieve engorgement; warm compresses before feeding aid let-down"],
    quiz: [{ question: "A breastfeeding mother asks how to know if her baby is getting enough milk. Best indicator?", options: ["Baby sleeps through the night", "6-8 wet diapers per day by day 4-5", "Mother feels full breasts at all times", "Baby feeds for exactly 10 minutes per side"], correct: 1, rationale: "Adequate output (6-8 wet diapers/day) is the most reliable indicator of sufficient intake in breastfed infants." }]
  },
  "newborn-assessment": {
    title: "Newborn Assessment and APGAR",
    cellular: { title: "Transition to Extrauterine Life", content: "At birth, the newborn undergoes critical physiological transitions: lungs inflate and begin gas exchange, fetal circulatory shunts close (ductus arteriosus, foramen ovale), and thermoregulation becomes self-dependent. The APGAR score is assessed at 1 and 5 minutes: Appearance (skin color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), and Respirations (respiratory effort). Each parameter scored 0-2, total 0-10. Score of 7-10 is normal, 4-6 requires intervention, <4 requires resuscitation." },
    signs: {
      left: ["Normal HR: 120-160 bpm", "Normal RR: 30-60 breaths/min", "Normal Temp: 97.7-99.5°F (36.5-37.5°C)", "Normal Weight: 2500-4000g (5.5-8.8 lbs)"],
      right: ["Moro Reflex: startle response, arms extend", "Rooting Reflex: turns toward stimulus on cheek", "Sucking Reflex: sucks when palate stimulated", "Babinski Reflex: toes fan out (normal in newborns)"]
    },
    medications: [
      { name: "Erythromycin Eye Ointment", type: "Antibiotic Prophylaxis", action: "Prevents ophthalmia neonatorum (gonorrheal/chlamydial conjunctivitis)", sideEffects: "Temporary blurred vision", contra: "None", pearl: "Applied within 1 hour of birth to both eyes; do not rinse. Legally required in most states." },
      { name: "Vitamin K (Phytonadione)", type: "Fat-Soluble Vitamin", action: "Prevents hemorrhagic disease of the newborn", sideEffects: "Injection site bruising", contra: "None", pearl: "Given IM in the vastus lateralis within 1 hour of birth; newborns lack intestinal flora to produce Vitamin K." }
    ],
    pearls: ["Palmar grasp reflex: infant grips finger placed in palm — disappears by 3-4 months", "Acrocyanosis (blue hands/feet) is normal in first 24-48 hours; central cyanosis is NOT normal", "Head circumference (33-35cm) should be measured and compared to chest circumference (30.5-33cm)"],
    quiz: [{ question: "A newborn at 1 minute has a HR of 90, weak cry, some flexion, blue extremities, and grimaces with stimulation. APGAR score?", options: ["4", "5", "6", "7"], correct: 2, rationale: "HR 90 (1), weak cry (1), some flexion (1), acrocyanosis (1), grimace (1) = 5. Reassess at 5 minutes." }]
  },
  "neonatal-thermoreg": {
    title: "Thermoregulation in Neonates",
    cellular: { title: "Brown Fat Metabolism", content: "Neonates are highly vulnerable to cold stress due to their large body surface area relative to mass, thin skin, and limited subcutaneous fat. They cannot shiver; instead, they rely on non-shivering thermogenesis via brown fat (brown adipose tissue) located between the scapulae, around the kidneys, and along the great vessels. Brown fat metabolism generates heat through uncoupled oxidative phosphorylation but rapidly depletes oxygen and glucose reserves. Cold stress triggers a cascade: increased oxygen consumption, hypoglycemia, metabolic acidosis, and potentially pulmonary vasoconstriction with respiratory distress." },
    signs: {
      left: ["Cool skin to touch (especially extremities)", "Mottled or pale skin color", "Lethargy and poor feeding", "Weak cry and decreased activity"],
      right: ["Hypoglycemia (jitteriness, tremors)", "Tachypnea (increased O2 demand)", "Metabolic Acidosis", "Peripheral vasoconstriction (acrocyanosis)"]
    },
    medications: [{ name: "Dextrose 10% IV", type: "Glucose Solution", action: "Corrects hypoglycemia secondary to cold stress", sideEffects: "Hyperglycemia if over-infused, vein irritation", contra: "None in emergency", pearl: "Monitor blood glucose every 30-60 minutes during rewarming; cold stress rapidly depletes glycogen stores." }],
    pearls: ["Neutral thermal environment (NTE): ambient temperature where the neonate expends the least energy to maintain normal body temp", "Skin-to-skin contact (kangaroo care) is the most effective warming intervention for stable newborns", "Dry the newborn immediately after birth and place a cap on the head — the head is the largest heat-loss surface"],
    quiz: [{ question: "A newborn's temperature is 96.5°F. What physiological response does the nurse expect?", options: ["Shivering to generate heat", "Increased brown fat metabolism", "Decreased oxygen consumption", "Peripheral vasodilation"], correct: 1, rationale: "Neonates cannot shiver; they rely on non-shivering thermogenesis through brown fat metabolism to generate heat, which increases oxygen and glucose consumption." }]
  },
  "neonatal-feeding": {
    title: "Neonatal Feeding",
    cellular: { title: "Nutritional Requirements", content: "Neonates require approximately 100-120 kcal/kg/day for adequate growth. Breastmilk is the gold standard, providing optimal nutrition, immunoglobulins, and promoting GI maturation. Formula (iron-fortified, 20 kcal/oz) is an appropriate alternative. Newborns lose 5-7% of birth weight in the first week (up to 10% for breastfed infants) and should regain birth weight by 10-14 days. Feeding cues progress from early (rooting, lip smacking, hand-to-mouth) to late (crying — a late hunger cue). Adequate intake is assessed by monitoring output: 6-8 wet diapers and 3-4 stools per day by day 4-5 of life." },
    signs: {
      left: ["Early Feeding Cues: rooting, lip smacking", "Hand-to-mouth movements", "Sucking on fingers/fists", "Quiet alert state"],
      right: ["Inadequate Intake: <6 wet diapers/day", "Weight loss >10% of birth weight", "Persistent jaundice", "Lethargy and poor suck"]
    },
    medications: [{ name: "Iron-Fortified Formula", type: "Nutritional Supplement", action: "Provides complete nutrition when breastfeeding is not possible", sideEffects: "Constipation, green stools", contra: "Cow milk protein allergy (use hydrolyzed)", pearl: "Always mix formula exactly as directed; concentrate formula causes dehydration and electrolyte imbalances." }],
    pearls: ["Feed on demand, not on a rigid schedule — typically every 2-3 hours for breastfed, every 3-4 hours for formula-fed", "Burp infant after every 1-2 oz (formula) or when switching breasts to prevent regurgitation", "Weight gain of approximately 15-30g (0.5-1 oz) per day is expected after initial loss"],
    quiz: [{ question: "A 5-day-old breastfed infant has lost 8% of birth weight. The mother is concerned. Nurse's best response?", options: ["This is abnormal, supplement with formula immediately", "Weight loss up to 10% can be normal for breastfed infants; let's assess feeding technique", "Stop breastfeeding and switch to formula", "This infant needs IV fluids"], correct: 1, rationale: "Breastfed infants may lose up to 10% of birth weight in the first week. Assessing latch and feeding frequency is the priority before supplementing." }]
  },
  "neonatal-jaundice-basics": {
    title: "Neonatal Jaundice",
    cellular: { title: "Bilirubin Metabolism", content: "Jaundice results from elevated unconjugated (indirect) bilirubin in the blood. Newborns are predisposed due to high RBC volume with shorter lifespan (70-90 days vs 120 days), immature liver conjugation enzymes (glucuronyl transferase), and increased enterohepatic circulation. Physiological jaundice appears after 24 hours of life and peaks at days 3-5, resolving by 1-2 weeks. Pathological jaundice appears within the first 24 hours and rises rapidly — causes include ABO/Rh incompatibility, sepsis, and excessive hemolysis. Bilirubin follows a cephalocaudal progression: face first, then trunk, then extremities as levels rise." },
    signs: {
      left: ["Yellowing of skin (cephalocaudal)", "Scleral icterus (yellow eyes)", "Dark amber urine", "Lethargy and poor feeding"],
      right: ["Bilirubin >12 mg/dL (physiological concern)", "Jaundice within 24 hours (PATHOLOGICAL)", "High-pitched cry (kernicterus risk)", "Opisthotonus (severe kernicterus)"]
    },
    medications: [{ name: "Phototherapy (Bili Lights)", type: "Light Therapy", action: "Converts unconjugated bilirubin into water-soluble form for excretion via urine and stool", sideEffects: "Dehydration, loose green stools, skin rash, retinal damage if eyes unprotected", contra: "Conjugated (direct) hyperbilirubinemia", pearl: "Maximize skin exposure; remove all clothing except diaper. Protect eyes with opaque shields. Monitor temperature and hydration closely. Encourage frequent feedings to promote bilirubin excretion through stool." }],
    pearls: ["Jaundice in the first 24 hours is ALWAYS pathological — notify provider immediately", "Risk factors: ABO incompatibility, Rh incompatibility, breastfeeding jaundice (insufficient intake), prematurity, bruising from birth trauma", "Press on the skin over a bony prominence (forehead, sternum) and observe the underlying color for blanch jaundice assessment"],
    quiz: [{ question: "A newborn develops visible jaundice at 18 hours of age. What type of jaundice does the nurse suspect?", options: ["Physiological jaundice", "Breastmilk jaundice", "Pathological jaundice", "Normal newborn finding"], correct: 2, rationale: "Jaundice appearing within the first 24 hours of life is always pathological and requires immediate investigation for causes such as ABO/Rh incompatibility or hemolysis." }]
  },
  "placenta-previa-abruption": {
    title: "Placenta Previa vs Abruption",
    cellular: { title: "Placental Pathology", content: "Placenta Previa occurs when the placenta abnormally implants over the cervical os (marginal, partial, or complete), obstructing the birth canal and causing painless hemorrhage as the cervix dilates. Placental Abruption is the premature separation of a normally implanted placenta from the uterine wall, causing retroplacental hemorrhage. The bleeding may be revealed (visible) or concealed (trapped behind the placenta), making abruption particularly dangerous as blood loss can be underestimated. Abruption triggers a cascade of coagulopathy and can lead to DIC." },
    signs: {
      left: ["Painless bright red vaginal bleeding", "Soft, non-tender, relaxed uterus", "Normal FHR initially", "Bleeding occurs in 3rd trimester", "Diagnosed by ultrasound"],
      right: ["Painful dark red vaginal bleeding", "Rigid, board-like abdomen", "Fetal distress with late decelerations", "DIC risk with coagulopathy", "Concealed hemorrhage possible"]
    },
    medications: [
      { name: "Terbutaline", type: "Tocolytic (Beta-2 Agonist)", action: "Relaxes uterine smooth muscle to stop contractions", sideEffects: "Tachycardia, tremors, hyperglycemia", contra: "Severe hemorrhage", pearl: "Used to buy time for betamethasone to work if preterm." },
      { name: "Betamethasone", type: "Corticosteroid", action: "Accelerates fetal lung maturity by stimulating surfactant production", sideEffects: "Maternal hyperglycemia", contra: "Chorioamnionitis", pearl: "Give IM x2 doses 24 hours apart; optimal effect at 48 hours." },
      { name: "RhoGAM", type: "Rh Immunoglobulin", action: "Prevents Rh sensitization in Rh-negative mothers exposed to Rh-positive fetal blood", sideEffects: "Injection site pain", contra: "Rh-positive mother", pearl: "Administer within 72 hours of any bleeding event in Rh-negative mothers." }
    ],
    pearls: ["NEVER perform a vaginal exam with suspected Placenta Previa — may trigger massive hemorrhage", "Abruption is a surgical emergency if severe — prepare for emergent C-section", "Monitor for Couvelaire uterus (blood infiltrates myometrium, uterus appears purple/bruised)", "Abruption risk factors: HTN, cocaine use, abdominal trauma, prior abruption"],
    quiz: [{ question: "A pregnant client at 34 weeks presents with painless, bright red vaginal bleeding and a soft uterus. Which condition does the nurse suspect?", options: ["Placental abruption", "Placenta previa", "Uterine rupture", "Ectopic pregnancy"], correct: 1, rationale: "Painless, bright red bleeding with a soft, non-tender uterus is the classic presentation of placenta previa. Abruption presents with painful, dark bleeding and a rigid abdomen." }]
  },
  "postpartum-hemorrhage": {
    title: "Postpartum Hemorrhage",
    cellular: { title: "Hemorrhage Pathophysiology", content: "Postpartum hemorrhage (PPH) is defined as blood loss >500mL after vaginal delivery or >1000mL after cesarean section. The 4 T's framework identifies the causes: Tone (uterine atony accounts for 80% of PPH — the uterus fails to contract and compress spiral arteries at the placental site), Tissue (retained placental fragments prevent uterine contraction), Trauma (lacerations of the cervix, vagina, or perineum), and Thrombin (coagulopathy disorders such as DIC, von Willebrand disease). The uterus receives 500-700mL/min of blood flow at term, making rapid intervention critical." },
    signs: {
      left: ["Boggy, soft uterus on palpation", "Fundus above expected level", "Steady trickle or gush of blood", "Blood loss >500mL vaginal delivery"],
      right: ["Tachycardia (early compensatory sign)", "Hypotension (late sign — already significant loss)", "Altered mental status", "Cool, clammy skin with pallor"]
    },
    medications: [
      { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Stimulates uterine contraction to compress bleeding vessels", sideEffects: "Water intoxication with prolonged use", contra: "None absolute for PPH", pearl: "First-line uterotonic; given IV infusion or IM." },
      { name: "Methylergonovine (Methergine)", type: "Ergot Alkaloid", action: "Sustained uterine contraction", sideEffects: "Severe hypertension, nausea", contra: "Hypertension or preeclampsia", pearl: "AVOID in hypertensive patients — can cause stroke or seizure." },
      { name: "Carboprost (Hemabate)", type: "Prostaglandin F2-alpha", action: "Powerful uterine contraction", sideEffects: "Bronchospasm, diarrhea, fever", contra: "Asthma", pearl: "AVOID in asthmatic patients — causes severe bronchospasm." },
      { name: "Misoprostol (Cytotec)", type: "Prostaglandin E1", action: "Uterine contraction via multiple routes (PO, SL, PR)", sideEffects: "Fever, diarrhea", contra: "Few contraindications", pearl: "Can be given rectally when IV access is unavailable — useful in emergencies." }
    ],
    pearls: ["Fundal massage is the FIRST intervention for uterine atony — firm, circular massage on the fundus", "Quantitative blood loss (QBL) measurement is more accurate than visual estimation", "Early activation of massive transfusion protocol (1:1:1 ratio of PRBCs:FFP:Platelets)", "Two large-bore IVs and type & crossmatch should be done proactively for high-risk patients"],
    quiz: [{ question: "A nurse finds a boggy uterus 1 hour after vaginal delivery with increasing vaginal bleeding. What is the priority intervention?", options: ["Administer Methergine IM", "Perform bimanual uterine massage", "Start oxytocin IV infusion", "Prepare for surgical intervention"], correct: 1, rationale: "Fundal massage is the first-line intervention for uterine atony. It mechanically stimulates the uterus to contract and compress bleeding vessels. Medications are second-line if massage is ineffective." }]
  },
  "gestational-diabetes": {
    title: "Gestational Diabetes Management",
    cellular: { title: "Insulin Resistance Mechanism", content: "During pregnancy, placental hormones (human placental lactogen/hPL, cortisol, progesterone, and growth hormone) create progressive insulin resistance to ensure adequate glucose delivery to the fetus. In gestational diabetes (GDM), maternal pancreatic beta cells cannot compensate with sufficient insulin production, leading to maternal hyperglycemia. Per the Pedersen hypothesis, maternal hyperglycemia crosses the placenta, stimulating fetal hyperinsulinemia, which drives excessive fetal growth (macrosomia), increased oxygen consumption, and potential fetal hypoxia. After delivery, the neonate loses the maternal glucose supply but continues producing excess insulin, causing neonatal hypoglycemia." },
    signs: {
      left: ["Fetal macrosomia (>4000g)", "Polyhydramnios (excess amniotic fluid)", "Recurrent urinary tract infections", "Polyuria and polydipsia"],
      right: ["Shoulder dystocia risk during delivery", "Neonatal hypoglycemia after birth", "Neonatal hyperbilirubinemia", "Increased risk of preeclampsia"]
    },
    medications: [
      { name: "Insulin", type: "Hormone Replacement", action: "Directly lowers blood glucose; does not cross the placenta", sideEffects: "Hypoglycemia, injection site reactions", contra: "Hypoglycemia", pearl: "Preferred pharmacologic treatment — does not cross the placenta and is safest for the fetus." },
      { name: "Glyburide", type: "Sulfonylurea", action: "Stimulates pancreatic insulin secretion", sideEffects: "Hypoglycemia, neonatal hypoglycemia", contra: "Severe renal impairment", pearl: "Oral alternative to insulin; may cross placenta in small amounts." },
      { name: "Metformin", type: "Biguanide", action: "Decreases hepatic glucose production and increases insulin sensitivity", sideEffects: "GI upset, lactic acidosis (rare)", contra: "Renal insufficiency", pearl: "Crosses the placenta; long-term fetal effects still being studied." }
    ],
    pearls: ["Screen ALL pregnant women at 24-28 weeks with 1-hour glucose challenge test (50g glucose, threshold ≥130-140 mg/dL)", "If 1-hour screen is positive, confirm with 3-hour GTT (100g glucose)", "Postpartum: recheck glucose at 6-12 weeks — 50% of GDM patients develop Type 2 DM within 10 years", "Diet and exercise are FIRST-LINE treatment; pharmacotherapy added if glucose targets not met"],
    quiz: [{ question: "When should universal screening for gestational diabetes be performed?", options: ["First prenatal visit", "12-16 weeks gestation", "24-28 weeks gestation", "36 weeks gestation"], correct: 2, rationale: "Universal screening for GDM is recommended at 24-28 weeks gestation when insulin resistance from placental hormones peaks. Earlier screening is done only for high-risk patients." }]
  },
  "fetal-monitoring-rn": {
    title: "Fetal Heart Rate Monitoring",
    cellular: { title: "Autonomic Regulation", content: "The fetal heart rate (FHR) is regulated by the autonomic nervous system. The sympathetic nervous system increases heart rate, while the parasympathetic (vagus nerve) decreases it. Normal baseline is 110-160 bpm. Variability reflects intact CNS function: absent (no fluctuation — ominous), minimal (<5 bpm), moderate (6-25 bpm — reassuring, indicates intact neurological pathway), and marked (>25 bpm). Accelerations (≥15 bpm above baseline for ≥15 seconds) are reassuring and indicate fetal well-being. Decelerations are classified as Early (head compression, mirrors contractions), Late (uteroplacental insufficiency, begins after contraction peak), and Variable (cord compression, abrupt onset/offset with varying shape)." },
    signs: {
      left: ["Category I (Normal): baseline 110-160, moderate variability, no late/variable decels", "Accelerations present (reactive NST)", "Early decelerations (benign — head compression)", "Moderate variability (most reassuring sign)"],
      right: ["Category II (Indeterminate): minimal variability, recurrent variable decels", "Category III (Abnormal): absent variability with recurrent late decels", "Sinusoidal pattern (severe fetal anemia)", "Prolonged deceleration >2 minutes"]
    },
    medications: [
      { name: "Terbutaline", type: "Tocolytic (Beta-2 Agonist)", action: "Intrauterine resuscitation — relaxes uterus to improve placental perfusion", sideEffects: "Maternal tachycardia, tremors", contra: "Maternal cardiac disease", pearl: "Used as a rescue tocolytic for acute fetal distress to buy time for delivery preparation." },
      { name: "Oxytocin (Pitocin)", type: "Uterotonic", action: "Stimulates uterine contractions for labor induction/augmentation", sideEffects: "Tachysystole, uterine rupture", contra: "Non-reassuring FHR, placenta previa", pearl: "DISCONTINUE immediately for late decelerations or tachysystole — the uterus needs to relax." }
    ],
    pearls: ["Late decelerations = uteroplacental insufficiency → turn off Pitocin, position left lateral, O2, IV fluid bolus", "Variable decelerations = cord compression → reposition mother (knee-chest, Trendelenburg), amnioinfusion may help", "Moderate variability is the SINGLE MOST reassuring sign of fetal well-being", "Category III tracing requires immediate intervention — prepare for emergent delivery"],
    quiz: [{ question: "The fetal monitor shows repetitive decelerations that begin after the peak of each contraction and return to baseline after the contraction ends. What type are these?", options: ["Early decelerations", "Late decelerations", "Variable decelerations", "Prolonged decelerations"], correct: 1, rationale: "Late decelerations begin after the contraction peak and persist after the contraction ends. They indicate uteroplacental insufficiency and require immediate nursing intervention: left lateral position, stop oxytocin, IV fluids, and oxygen." }]
  },
  "neonatal-respiratory-distress": {
    title: "Neonatal Respiratory Distress Syndrome",
    cellular: { title: "Surfactant Deficiency", content: "Respiratory Distress Syndrome (RDS) results from insufficient pulmonary surfactant in premature lungs. Surfactant, produced by Type II pneumocytes (which do not mature until approximately 35 weeks gestation), reduces alveolar surface tension to prevent collapse during expiration. Without adequate surfactant, alveoli collapse with each breath (atelectasis), leading to decreased lung compliance, ventilation-perfusion (V/Q) mismatch, hypoxemia, and increased work of breathing. The resulting hypoxia and acidosis further damage the alveolar epithelium, creating a cycle of worsening respiratory failure. Hyaline membranes form from protein-rich exudate lining the alveoli." },
    signs: {
      left: ["Nasal flaring", "Expiratory grunting (auto-PEEP attempt)", "Intercostal and subcostal retractions", "Tachypnea (respiratory rate >60/min)"],
      right: ["Central cyanosis", "Suprasternal retractions (severe)", "Silverman-Anderson score for severity", "Ground-glass appearance on chest X-ray"]
    },
    medications: [
      { name: "Beractant (Survanta)", type: "Exogenous Surfactant", action: "Replaces deficient surfactant to reduce alveolar surface tension and prevent collapse", sideEffects: "Transient bradycardia, oxygen desaturation during administration", contra: "None absolute in life-threatening RDS", pearl: "Administered via endotracheal tube; infant is repositioned after each aliquot to distribute surfactant evenly." },
      { name: "Caffeine Citrate", type: "Methylxanthine", action: "Stimulates respiratory center to prevent apnea of prematurity", sideEffects: "Tachycardia, irritability, feeding intolerance", contra: "Cardiac arrhythmias", pearl: "Given as daily maintenance after loading dose; monitor heart rate and for signs of toxicity." },
      { name: "Dexamethasone (Prenatal)", type: "Corticosteroid", action: "Given to the mother before preterm delivery to accelerate fetal lung maturity", sideEffects: "Maternal hyperglycemia, immunosuppression", contra: "Active systemic infection", pearl: "Most effective when given 24-48 hours before delivery; indicated for 24-34 weeks gestation." }
    ],
    pearls: ["Position prone or side-lying to optimize ventilation and oxygenation", "Minimal stimulation and clustered care to reduce oxygen consumption", "Monitor ABGs and pulse oximetry — target SpO2 88-95% in preterm infants to avoid retinopathy of prematurity", "Prenatal betamethasone to the mother is the BEST prevention if preterm delivery is anticipated"],
    quiz: [{ question: "When is exogenous surfactant therapy most effective for preventing RDS?", options: ["Within 30 minutes of birth (prophylactic)", "At 24 hours of age", "Only after respiratory failure develops", "At 1 week of age"], correct: 0, rationale: "Prophylactic surfactant given within the first 30 minutes of birth to high-risk premature infants is most effective at preventing severe RDS. Early administration prevents the cycle of atelectasis and alveolar damage." }]
  },
  "neonatal-sepsis": {
    title: "Neonatal Sepsis Recognition",
    cellular: { title: "Immature Immune Response", content: "Neonates have an immature immune system characterized by decreased neutrophil storage pools (limited ability to mount a sustained response), poor opsonization (decreased complement activity), low immunoglobulin levels (primarily relying on maternal IgG transferred in the third trimester — premature infants have even less), and immature T-cell function. Early-onset sepsis (<72 hours) results from vertical transmission during labor/delivery (Group B Streptococcus, E. coli are most common). Late-onset sepsis (>72 hours) is typically nosocomial, acquired from the hospital environment (Coagulase-negative Staph, Klebsiella, Candida), especially in infants with central lines or prolonged NICU stays." },
    signs: {
      left: ["Temperature instability (hypothermia MORE common than fever)", "Poor feeding and weak suck", "Lethargy and decreased activity", "Apnea and bradycardia episodes"],
      right: ["Glucose instability (hypo- or hyperglycemia)", "Mottled or pale skin color", "Abdominal distension", "\"Just not looking right\" — subtle behavioral changes"]
    },
    medications: [
      { name: "Ampicillin + Gentamicin", type: "Empiric Antibiotic Combination", action: "Broad-spectrum coverage for early-onset sepsis (GBS and E. coli)", sideEffects: "Gentamicin: nephrotoxicity, ototoxicity", contra: "Known allergy", pearl: "Monitor gentamicin trough levels to prevent toxicity; assess renal function and hearing." },
      { name: "Vancomycin + Cefotaxime", type: "Empiric Antibiotic Combination", action: "Coverage for late-onset nosocomial organisms (CoNS, gram-negatives)", sideEffects: "Vancomycin: Red Man Syndrome (infuse slowly), nephrotoxicity", contra: "Known allergy", pearl: "Vancomycin covers MRSA and CoNS; cefotaxime preferred over ceftriaxone in neonates (less bilirubin displacement)." }
    ],
    pearls: ["ALWAYS obtain blood culture BEFORE starting antibiotics — but do NOT delay treatment waiting for results", "GBS prophylaxis (intrapartum penicillin to GBS-positive mothers) has dramatically reduced early-onset sepsis", "Hypothermia is a more common sign of neonatal sepsis than fever — do not dismiss low temperatures", "CBC with differential: look for leukopenia, bandemia (left shift), and thrombocytopenia as sepsis markers"],
    quiz: [{ question: "A 2-day-old neonate develops temperature instability, poor feeding, and apnea. Which type of sepsis is most likely?", options: ["Late-onset sepsis", "Early-onset sepsis", "Fungal sepsis", "Viral sepsis"], correct: 1, rationale: "Onset within the first 72 hours of life indicates early-onset sepsis, most commonly caused by GBS or E. coli acquired during labor and delivery via vertical transmission." }]
  },
  "hyperbilirubinemia": {
    title: "Hyperbilirubinemia & Phototherapy",
    cellular: { title: "Bilirubin Metabolism", content: "Bilirubin is produced from the breakdown of heme in red blood cells. Unconjugated (indirect) bilirubin is lipid-soluble and can cross the blood-brain barrier (BBB), depositing in the basal ganglia and brainstem nuclei to cause kernicterus (bilirubin encephalopathy) — a devastating, irreversible neurological injury. The liver conjugates bilirubin (making it water-soluble) for excretion in bile and stool. Neonates are vulnerable because of: immature hepatic conjugation enzymes (glucuronyl transferase), increased RBC turnover (shorter RBC lifespan of 70-90 days vs 120 days in adults), and increased enterohepatic circulation (gut bacteria that break down bilirubin are not yet established)." },
    signs: {
      left: ["Jaundice progressing cephalocaudal (face → trunk → extremities)", "Scleral icterus (yellow discoloration of eyes)", "Dark amber urine", "Poor feeding and sleepiness"],
      right: ["High-pitched cry (early kernicterus)", "Hypotonia progressing to hypertonia", "Opisthotonus (arched back — severe kernicterus)", "Seizures and hearing loss (late kernicterus)"]
    },
    medications: [
      { name: "Phototherapy", type: "Light Therapy", action: "Blue-green light isomerizes unconjugated bilirubin in the skin into water-soluble forms (lumirubin) that can be excreted without liver conjugation", sideEffects: "Dehydration, loose green stools, skin rash, retinal damage", contra: "Conjugated hyperbilirubinemia (bronze baby)", pearl: "Maximize skin exposure (diaper only), protect eyes with opaque shields, monitor temperature and I&O." },
      { name: "IVIG (Intravenous Immunoglobulin)", type: "Immunoglobulin", action: "Reduces hemolysis in isoimmune hemolytic disease (ABO/Rh incompatibility) by blocking antibody receptors", sideEffects: "Fluid overload, allergic reaction", contra: "IgA deficiency", pearl: "Used when bilirubin continues to rise despite intensive phototherapy in immune-mediated hemolysis." },
      { name: "Phenobarbital", type: "Barbiturate / Enzyme Inducer", action: "Induces hepatic glucuronyl transferase to increase bilirubin conjugation", sideEffects: "Sedation, respiratory depression", contra: "Acute intermittent porphyria", pearl: "Rarely used in current practice; phototherapy and IVIG are preferred. May be considered in specific metabolic conditions." }
    ],
    pearls: ["ALWAYS protect eyes during phototherapy with opaque eye shields — check positioning frequently", "Monitor for bronze baby syndrome (grayish-brown skin discoloration) which occurs with conjugated hyperbilirubinemia under phototherapy", "Increase feeding frequency (every 2-3 hours) to promote bilirubin excretion through stool", "Jaundice within the first 24 hours is ALWAYS pathological — never dismiss as physiological"],
    quiz: [{ question: "What is the primary goal of phototherapy in treating neonatal hyperbilirubinemia?", options: ["Increase liver enzyme production", "Convert unconjugated bilirubin to a water-soluble form for excretion", "Prevent infection", "Stimulate RBC production"], correct: 1, rationale: "Phototherapy works by isomerizing unconjugated (lipid-soluble) bilirubin into lumirubin, a water-soluble isomer that can be excreted in urine and bile without requiring hepatic conjugation, thereby preventing kernicterus." }]
  },
  "nec-necrotizing": {
    title: "Necrotizing Enterocolitis (NEC)",
    cellular: { title: "Intestinal Necrosis Pathology", content: "Necrotizing enterocolitis (NEC) is the most common GI emergency in premature neonates. It results from intestinal ischemia leading to mucosal necrosis and subsequent bacterial invasion of the bowel wall. The pathogenesis involves three key factors: an immature intestinal barrier (decreased mucus production, tight junction immaturity, and reduced IgA), abnormal bacterial colonization of the gut, and ischemia-reperfusion injury. Formula feeding significantly increases NEC risk compared to breast milk, which provides IgA, lactoferrin, oligosaccharides, and growth factors that protect the immature gut. Gas-producing bacteria invade the necrotic bowel wall, creating pneumatosis intestinalis (air in the intestinal wall) — the pathognomonic radiographic finding." },
    signs: {
      left: ["Abdominal distension and tenderness", "Bilious (green) emesis", "Bloody or guaiac-positive stools", "Feeding intolerance with increased residuals"],
      right: ["Pneumatosis intestinalis on abdominal X-ray", "Portal venous gas (ominous sign)", "Pneumoperitoneum (perforation — surgical emergency)", "Systemic signs: apnea, lethargy, temperature instability"]
    },
    medications: [
      { name: "NPO + OG Decompression", type: "Bowel Rest", action: "Complete bowel rest to halt intestinal workload and prevent further mucosal injury; OG tube decompresses distended bowel", sideEffects: "Requires TPN for nutrition", contra: "None — essential intervention", pearl: "NPO duration depends on Bell staging: Stage I (3 days), Stage II (7-14 days), Stage III (14+ days)." },
      { name: "Ampicillin + Gentamicin + Metronidazole", type: "Triple Antibiotic Therapy", action: "Broad-spectrum coverage: Ampicillin (gram-positive), Gentamicin (gram-negative), Metronidazole (anaerobes)", sideEffects: "Nephrotoxicity (Gentamicin), GI upset (Metronidazole)", contra: "Known allergies", pearl: "Triple therapy covers the polymicrobial organisms involved in NEC; duration based on severity and clinical response." },
      { name: "TPN (Total Parenteral Nutrition)", type: "IV Nutrition", action: "Provides complete nutrition (amino acids, dextrose, lipids, vitamins, minerals) while the bowel is resting", sideEffects: "Central line infection, cholestasis, hyperglycemia", contra: "Functional GI tract (when feeds can resume)", pearl: "Monitor liver function — TPN-associated cholestasis increases with prolonged use. Transition to enteral feeds (preferably breast milk) as soon as clinically safe." }
    ],
    pearls: ["Breast milk is the single most PROTECTIVE factor against NEC — encourage maternal breast milk for all preterm infants", "Bell Staging: Stage I (suspected — nonspecific signs), Stage II (definite — pneumatosis), Stage III (advanced — perforation, shock)", "Surgical consult is required for pneumoperitoneum (free air) indicating bowel perforation", "Serial abdominal X-rays and girth measurements are essential for monitoring progression"],
    quiz: [{ question: "Which factor is most protective against the development of NEC in premature infants?", options: ["Formula feeding", "Breast milk feeding", "Early antibiotic prophylaxis", "Delayed cord clamping"], correct: 1, rationale: "Breast milk contains IgA, lactoferrin, growth factors, and oligosaccharides that protect the immature gut mucosa, promote healthy bacterial colonization, and significantly reduce NEC incidence compared to formula feeding." }]
  },
  "hellp-syndrome-np": {
    title: "HELLP Syndrome: Hepatic Cascade",
    cellular: { title: "Hepatic Microangiopathy", content: "HELLP (Hemolysis, Elevated Liver enzymes, Low Platelets) represents severe end of preeclampsia spectrum. Endothelial dysfunction triggers platelet activation and fibrin deposition in hepatic sinusoids. Microangiopathic hemolytic anemia (MAHA) destroys RBCs as they traverse damaged vasculature. Hepatocyte necrosis from ischemia can progress to subcapsular hematoma and hepatic rupture." },
    signs: {
      left: ["Epigastric/RUQ pain", "Nausea/Vomiting", "LDH > 600", "AST > 70"],
      right: ["Schistocytes on smear", "Platelets < 100k", "Haptoglobin < 25", "Subcapsular hepatic hematoma"]
    },
    medications: [
      { name: "Magnesium Sulfate", type: "Anticonvulsant", action: "Seizure prophylaxis, CNS depressant", sideEffects: "Respiratory depression, hypotension", contra: "Myasthenia gravis", pearl: "Monitor DTRs, respiratory rate, and urine output continuously." },
      { name: "Dexamethasone", type: "Corticosteroid", action: "May improve platelet count temporarily (controversial)", sideEffects: "Hyperglycemia, immunosuppression", contra: "Active infection", pearl: "Mississippi classification uses platelet nadir for severity grading." },
      { name: "Labetalol", type: "Alpha/Beta Blocker", action: "BP control in severe features", sideEffects: "Bradycardia, bronchospasm", contra: "Asthma, heart block", pearl: "Target SBP < 160 and DBP < 110 to prevent stroke." }
    ],
    pearls: ["Delivery is the definitive treatment regardless of gestational age", "Mississippi classification grades severity by platelet nadir", "Monitor for DIC and hepatic rupture — life-threatening complications"],
    quiz: [{ question: "What lab finding differentiates HELLP from TTP?", options: ["Elevated fibrinogen", "Elevated liver enzymes with low platelets in setting of pregnancy", "Normal LDH with thrombocytosis", "Isolated anemia without hemolysis"], correct: 1, rationale: "HELLP is distinguished from TTP by the combination of elevated liver enzymes (hepatic involvement) with thrombocytopenia specifically in the context of pregnancy, whereas TTP typically shows normal liver enzymes." }]
  },
  "amniotic-fluid-embolism-np": {
    title: "Amniotic Fluid Embolism: DIC Pathway",
    cellular: { title: "Anaphylactoid Cascade", content: "Amniotic fluid containing fetal cells, vernix, and meconium enters maternal circulation through endocervical veins or placental site. This triggers massive complement activation and anaphylactoid response. Phase 1: Acute pulmonary vasospasm causing right heart failure and cardiogenic shock. Phase 2: Consumptive coagulopathy (DIC) from tissue factor release. Mortality approaches 60-80%." },
    signs: {
      left: ["Sudden dyspnea/hypoxia", "Cardiovascular collapse", "Seizures", "Altered consciousness"],
      right: ["DIC (oozing from IV sites)", "Massive hemorrhage", "Pulmonary edema", "Cardiac arrest"]
    },
    medications: [
      { name: "Epinephrine", type: "Vasopressor/Inotrope", action: "Cardiac arrest protocol — restores cardiac output", sideEffects: "Tachycardia, hypertension", contra: "None in cardiac arrest", pearl: "Follow ACLS protocol with left uterine displacement for pregnant patients." },
      { name: "Cryoprecipitate", type: "Blood Product", action: "Fibrinogen replacement for DIC", sideEffects: "Transfusion reaction, volume overload", contra: "None in life-threatening DIC", pearl: "Target fibrinogen > 200 mg/dL; each unit raises fibrinogen ~5-10 mg/dL." },
      { name: "A-OK Protocol", type: "Investigational", action: "Atropine for bradycardia, Ondansetron (investigational), Ketorolac (investigational)", sideEffects: "Varies by component", contra: "Active bleeding (Ketorolac)", pearl: "Emerging protocol — not yet standard of care but gaining attention in case reports." }
    ],
    pearls: ["Diagnosis of exclusion — no definitive diagnostic test exists", "Immediate ACLS with left uterine displacement is critical", "Perimortem cesarean delivery within 4-5 minutes if cardiac arrest occurs"],
    quiz: [{ question: "What is the primary mechanism in Phase 1 of amniotic fluid embolism?", options: ["Consumptive coagulopathy", "Acute pulmonary vasospasm causing right heart failure", "Massive hemorrhage from uterine atony", "Anaphylaxis from fetal antigens"], correct: 1, rationale: "Phase 1 of AFE involves acute pulmonary vasospasm triggered by amniotic fluid entering the maternal circulation, leading to right heart failure and cardiogenic shock before DIC develops in Phase 2." }]
  },
  "eclampsia-np": {
    title: "Eclampsia: Endothelial Dysfunction",
    cellular: { title: "Trophoblast & Vascular Remodeling", content: "Abnormal trophoblast invasion of spiral arteries leads to incomplete remodeling and placental ischemia. Ischemic placenta releases anti-angiogenic factors (sFlt-1, sEng) that bind and neutralize VEGF and PlGF, causing systemic endothelial dysfunction. This leads to vasospasm, increased permeability, and end-organ damage. Cerebral vasospasm and posterior reversible encephalopathy syndrome (PRES) underlie seizures." },
    signs: {
      left: ["Severe HTN (>160/110)", "Proteinuria > 300mg/24h", "Headache unresponsive to analgesics", "Visual changes (scotomata)"],
      right: ["Tonic-clonic seizures", "PRES on MRI", "Pulmonary edema", "HELLP progression"]
    },
    medications: [
      { name: "Magnesium Sulfate", type: "Anticonvulsant", action: "Blocks NMDA receptors, causes vasodilation", sideEffects: "Loss of DTRs (8-12 mEq/L), respiratory arrest (15-17 mEq/L)", contra: "Myasthenia gravis, renal failure", pearl: "Therapeutic level 4-7 mEq/L. Cardiac arrest at >25 mEq/L. Antidote: Calcium Gluconate." },
      { name: "Hydralazine", type: "Vasodilator", action: "Direct arteriolar vasodilation for acute HTN", sideEffects: "Reflex tachycardia, headache", contra: "Coronary artery disease", pearl: "Give 5-10mg IV push; onset 10-20 minutes." },
      { name: "Nifedipine", type: "Calcium Channel Blocker", action: "Acute HTN management", sideEffects: "Headache, flushing, tachycardia", contra: "Use with caution alongside MgSO4", pearl: "Oral immediate-release 10mg; avoid sublingual route." }
    ],
    pearls: ["Mag toxicity antidote is Calcium Gluconate 1g IV", "sFlt-1/PlGF ratio is emerging as a predictive biomarker for preeclampsia", "Seizure prophylaxis with MgSO4 continues 24-48 hours postpartum"],
    quiz: [{ question: "At what serum magnesium level does respiratory arrest occur?", options: ["4-7 mEq/L", "8-12 mEq/L", "15-17 mEq/L", ">25 mEq/L"], correct: 2, rationale: "Respiratory arrest occurs at magnesium levels of 15-17 mEq/L. Therapeutic range is 4-7 mEq/L, loss of DTRs at 8-12, and cardiac arrest at >25 mEq/L." }]
  },
  "obstetric-hemorrhage-np": {
    title: "Obstetric Hemorrhage: Massive Transfusion",
    cellular: { title: "Hemostatic Failure in Pregnancy", content: "Obstetric hemorrhage involves unique physiological challenges: pregnancy increases blood volume by 40-50% (hypervolemic state), dilutional anemia masks true blood loss. Uterine blood flow at term is 500-700 mL/min, making atony catastrophic. Massive Transfusion Protocol (MTP) targets 1:1:1 ratio of pRBC:FFP:Platelets. Fibrinogen is the first coagulation factor depleted (critical threshold <200 mg/dL)." },
    signs: {
      left: ["EBL > 1000mL", "Heart rate > 110 (late sign in pregnancy)", "Lactate > 4", "Fibrinogen < 200"],
      right: ["Shock Index > 0.9 (HR/SBP)", "Base deficit > -6", "Need for >4 units pRBC", "DIC (PT/PTT prolonged)"]
    },
    medications: [
      { name: "Tranexamic Acid (TXA)", type: "Antifibrinolytic", action: "Inhibits plasminogen activation to stabilize clots", sideEffects: "Nausea, diarrhea, thromboembolic events", contra: "Active thromboembolic disease", pearl: "Give within 3 hours of hemorrhage onset per WOMAN trial — 1g IV over 10 minutes." },
      { name: "Fibrinogen Concentrate", type: "Coagulation Factor", action: "Directly replaces fibrinogen to restore clot formation", sideEffects: "Thromboembolic risk", contra: "Known hypersensitivity", pearl: "Target fibrinogen > 200 mg/dL; faster than cryoprecipitate with no thaw time required." },
      { name: "Factor VIIa (Recombinant)", type: "Coagulation Factor", action: "Activates extrinsic pathway — last resort for refractory hemorrhage", sideEffects: "Thrombosis risk", contra: "Relative — weigh risk vs benefit", pearl: "Reserved for life-threatening hemorrhage unresponsive to conventional therapy." }
    ],
    pearls: ["Shock Index (HR/SBP) is more sensitive than vital signs alone in pregnancy", "Bakri balloon provides uterine tamponade for atony", "B-Lynch compression suture is a surgical option before hysterectomy", "Peripartum hysterectomy is definitive for life-threatening hemorrhage"],
    quiz: [{ question: "Why are traditional vital signs unreliable in obstetric hemorrhage?", options: ["Pregnancy causes chronic hypertension", "Pregnancy increases blood volume by 40-50%, masking hemorrhage signs", "Vital signs are always accurate in pregnancy", "Pregnancy reduces heart rate baseline"], correct: 1, rationale: "The 40-50% increase in blood volume during pregnancy creates a hypervolemic state, allowing significant blood loss before traditional vital sign changes appear. Shock Index (HR/SBP > 0.9) is a more sensitive early indicator." }]
  },
  "neonatal-rds-np": {
    title: "RDS: Surfactant Physiology",
    cellular: { title: "Surfactant & Alveolar Mechanics", content: "Pulmonary surfactant is a complex mixture of phospholipids (90%, primarily DPPC - dipalmitoylphosphatidylcholine) and surfactant proteins (SP-A, SP-B, SP-C, SP-D). Type II pneumocytes begin producing surfactant at 24-28 weeks but adequate amounts not present until 34-36 weeks. Surfactant reduces alveolar surface tension according to LaPlace's Law (P = 2T/r), preventing atelectasis. Without it, high opening pressures are needed, causing barotrauma and oxygen toxicity leading to BPD." },
    signs: {
      left: ["Ground-glass appearance on CXR", "Air bronchograms", "Increased FiO2 requirement", "a/A ratio < 0.22"],
      right: ["Pulmonary interstitial emphysema", "Pneumothorax (air leak)", "BPD (chronic lung disease)", "Retinopathy of Prematurity (ROP)"]
    },
    medications: [
      { name: "Poractant alfa (Curosurf)", type: "Exogenous Surfactant", action: "Porcine-derived surfactant with higher phospholipid concentration — replaces deficient surfactant", sideEffects: "Transient bradycardia, oxygen desaturation during administration", contra: "None absolute", pearl: "200mg/kg initial dose; can repeat 100mg/kg doses. Higher initial dose than other surfactants." },
      { name: "Calfactant (Infasurf)", type: "Exogenous Surfactant", action: "Bovine-derived natural surfactant replacement", sideEffects: "Airway obstruction, desaturation", contra: "None absolute", pearl: "Contains SP-B which is critical for surfactant function." },
      { name: "Caffeine Citrate", type: "Methylxanthine", action: "Stimulates respiratory drive, reduces apnea of prematurity, improves BPD outcomes", sideEffects: "Tachycardia, feeding intolerance, jitteriness", contra: "Seizure disorder", pearl: "Loading dose 20mg/kg, maintenance 5-10mg/kg/day. CAP trial showed reduced BPD." }
    ],
    pearls: ["INSURE technique: Intubate-Surfactant-Extubate to minimize ventilator exposure", "LISA/MIST (Less Invasive Surfactant Administration) avoids intubation entirely", "Target SpO2 90-95% to reduce ROP risk while avoiding hypoxia"],
    quiz: [{ question: "What is the primary phospholipid component of pulmonary surfactant?", options: ["Sphingomyelin", "Dipalmitoylphosphatidylcholine (DPPC)", "Phosphatidylglycerol", "Lecithin"], correct: 1, rationale: "DPPC (dipalmitoylphosphatidylcholine) comprises the majority of surfactant phospholipids (~90% of surfactant is phospholipid, with DPPC being the primary component) and is responsible for reducing alveolar surface tension." }]
  },
  "neonatal-hie-np": {
    title: "HIE: Therapeutic Hypothermia",
    cellular: { title: "Two-Phase Injury & Neuroprotection", content: "Hypoxic-Ischemic Encephalopathy occurs in two phases. Primary injury: ATP depletion leads to failure of Na/K ATPase, intracellular calcium influx, and excitotoxic glutamate release. Latent period (6-hour therapeutic window): partial energy recovery. Secondary injury: mitochondrial failure, ROS production, inflammation (IL-1beta, TNF-alpha), and apoptosis via caspase activation. Therapeutic hypothermia (33.5C for 72 hours) reduces metabolic rate by 5% per degree, decreases excitotoxicity, and inhibits apoptotic pathways." },
    signs: {
      left: ["Sarnat Stage I (hyperalert, normal EEG)", "Sarnat Stage II (lethargic, seizures, suppressed EEG)", "Sarnat Stage III (comatose, burst suppression)"],
      right: ["Multi-organ dysfunction (renal, hepatic, cardiac)", "Seizures within 6-12 hours", "Amplitude-integrated EEG changes", "MRI changes (basal ganglia/thalami or watershed)"]
    },
    medications: [
      { name: "Phenobarbital", type: "Barbiturate Anticonvulsant", action: "First-line treatment for neonatal seizures — enhances GABA inhibition", sideEffects: "Respiratory depression, sedation, hypotension", contra: "Severe respiratory depression", pearl: "Loading dose 20mg/kg IV; may give additional 5-10mg/kg boluses up to 40mg/kg total." },
      { name: "Levetiracetam", type: "Anticonvulsant", action: "Emerging second-line — binds synaptic vesicle protein SV2A", sideEffects: "Sedation, irritability", contra: "Hypersensitivity", pearl: "Gaining favor due to fewer side effects than phenobarbital; evidence still accumulating in neonates." },
      { name: "Morphine/Fentanyl", type: "Opioid Analgesic", action: "Comfort and pain management during therapeutic cooling", sideEffects: "Respiratory depression, hypotension, ileus", contra: "Hemodynamic instability", pearl: "Shivering during cooling increases metabolic demand and must be controlled." }
    ],
    pearls: ["Cooling must begin within 6 hours of birth for neuroprotective benefit", "TOBY, CoolCap, and NICHD trials established evidence for therapeutic hypothermia", "Rewarming must be gradual at 0.5°C per hour to prevent rebound seizures"],
    quiz: [{ question: "What is the therapeutic window for initiating hypothermia in HIE?", options: ["Within 1 hour", "Within 6 hours", "Within 12 hours", "Within 24 hours"], correct: 1, rationale: "Therapeutic hypothermia must be initiated within 6 hours of birth during the latent period between primary and secondary injury to achieve neuroprotective benefits." }]
  },
  "persistent-pulm-htn-np": {
    title: "PPHN: Nitric Oxide Pathway",
    cellular: { title: "Pulmonary Vascular Transition Failure", content: "Persistent Pulmonary Hypertension of the Newborn occurs when pulmonary vascular resistance (PVR) fails to decrease after birth, maintaining fetal circulation pattern with right-to-left shunting through PDA and foramen ovale. Normally, increased PaO2 and decreased PaCO2 stimulate endothelial nitric oxide synthase (eNOS) to produce NO, which activates guanylate cyclase to produce cGMP, causing smooth muscle relaxation. In PPHN, this pathway is impaired. Phosphodiesterase-5 (PDE5) degrades cGMP." },
    signs: {
      left: ["Labile hypoxemia", "Pre-post ductal SpO2 differential >10%", "Right-to-left shunt on echo", "Poor response to supplemental O2"],
      right: ["Severe hypoxemia with minimal lung disease", "Tricuspid regurgitation on echo", "Septal bowing (RV pressure overload)", "Metabolic acidosis"]
    },
    medications: [
      { name: "Inhaled Nitric Oxide (iNO)", type: "Selective Pulmonary Vasodilator", action: "Activates guanylate cyclase to increase cGMP, causing pulmonary smooth muscle relaxation", sideEffects: "Methemoglobinemia, rebound pulmonary HTN on withdrawal", contra: "Dependent on R-to-L shunt for systemic perfusion", pearl: "Start at 20ppm; wean gradually to prevent rebound. Monitor methemoglobin levels." },
      { name: "Sildenafil", type: "PDE5 Inhibitor", action: "Prevents cGMP degradation, prolonging vasodilatory effect", sideEffects: "Systemic hypotension, priapism", contra: "Concurrent nitrate use", pearl: "Oral alternative when iNO unavailable; also used for weaning off iNO." },
      { name: "Milrinone", type: "PDE3 Inhibitor", action: "Increases cAMP — provides inotropy and vasodilation", sideEffects: "Hypotension, thrombocytopenia", contra: "Severe aortic stenosis", pearl: "Improves both cardiac output and reduces PVR — dual benefit in PPHN." }
    ],
    pearls: ["Avoid cold stress and acidosis — both significantly worsen pulmonary vascular resistance", "Use gentle ventilation strategy with permissive hypercapnia to avoid lung injury", "ECMO is indicated for refractory cases with Oxygenation Index (OI) > 40"],
    quiz: [{ question: "How does inhaled nitric oxide (iNO) reduce pulmonary vascular resistance?", options: ["Blocks calcium channels in smooth muscle", "Activates guanylate cyclase to increase cGMP causing smooth muscle relaxation", "Inhibits phosphodiesterase-5 directly", "Stimulates beta-2 receptors in the lungs"], correct: 1, rationale: "iNO activates soluble guanylate cyclase in pulmonary vascular smooth muscle, increasing cGMP production which leads to smooth muscle relaxation and selective pulmonary vasodilation without systemic effects." }]
  },
  "neonatal-abstinence-np": {
    title: "NAS: Opioid Withdrawal Scoring",
    cellular: { title: "Noradrenergic Upregulation", content: "Neonatal Abstinence Syndrome results from in utero opioid exposure causing upregulation of cAMP and noradrenergic pathways. After birth, removal of the opioid agonist leads to unopposed noradrenergic activity causing CNS excitability, autonomic dysfunction, and GI disturbance. Onset depends on the half-life of the maternal opioid (heroin: 24-48h, methadone: 48-72h, buprenorphine: 36-60h). The Finnegan Neonatal Abstinence Scoring System or Eat-Sleep-Console (ESC) model guides treatment." },
    signs: {
      left: ["High-pitched cry", "Tremors/jitteriness", "Increased muscle tone", "Poor feeding/excessive sucking"],
      right: ["Seizures (rare but severe)", "Excoriation (face/knees)", "Diarrhea/vomiting", "Fever/sweating/sneezing"]
    },
    medications: [
      { name: "Morphine Sulfate", type: "Opioid Agonist", action: "First-line pharmacotherapy — replaces opioid to control withdrawal symptoms with gradual taper", sideEffects: "Respiratory depression, sedation, constipation", contra: "Respiratory depression", pearl: "Weight-based dosing with slow gradual taper over days to weeks based on scoring." },
      { name: "Clonidine", type: "Alpha-2 Agonist", action: "Adjunctive — reduces central noradrenergic hyperactivity", sideEffects: "Hypotension, bradycardia, rebound HTN on withdrawal", contra: "Hemodynamic instability", pearl: "Reduces morphine requirement and length of treatment when used as adjunct." },
      { name: "Phenobarbital", type: "Barbiturate", action: "Adjunctive for polysubstance exposure (especially benzodiazepines)", sideEffects: "Respiratory depression, sedation, poor feeding", contra: "Severe respiratory compromise", pearl: "Preferred when maternal exposure includes benzodiazepines or alcohol in addition to opioids." }
    ],
    pearls: ["Eat-Sleep-Console (ESC) model is replacing Finnegan scoring at many centers — focuses on function rather than individual symptoms", "Rooming-in with mother significantly improves outcomes and reduces pharmacotherapy need", "Breastfeeding is encouraged if mother is in a stable medication-assisted treatment program"],
    quiz: [{ question: "What is the key difference between the Eat-Sleep-Console (ESC) model and the Finnegan scoring system?", options: ["ESC uses more medications than Finnegan", "ESC focuses on functional assessment (eating, sleeping, consolability) rather than individual symptom scoring", "Finnegan is newer and more evidence-based", "ESC requires longer hospital stays"], correct: 1, rationale: "The ESC model shifts focus from scoring individual withdrawal symptoms (Finnegan) to assessing functional outcomes — can the infant eat adequately, sleep undisturbed, and be consoled within 10 minutes? This approach reduces pharmacotherapy use and hospital length of stay." }]
  },
  "vitals-assessment": {
    title: "Vital Signs and Physical Assessment",
    cellular: { title: "Physiological Baselines", content: "Vital signs reflect the body's basic physiological functions. Temperature, pulse, respirations, blood pressure, and oxygen saturation provide a window into cardiovascular, respiratory, and neurological status. Changes from baseline are more clinically significant than isolated readings." },
    signs: {
      left: ["Temperature (oral 36.5-37.5°C, rectal is most accurate, temporal for screening)", "Pulse (radial most common, apical for cardiac meds, 60-100 adult normal)"],
      right: ["Respirations (12-20 adult, count for full 30sec, note depth/pattern)", "BP (auscultatory gap awareness, cuff size matters - too small reads high)", "SpO2 (>95% normal, <90% critical)"]
    },
    medications: [{ name: "Acetaminophen", type: "Antipyretic", action: "Reduces fever", sideEffects: "Hepatotoxicity", contra: "Liver disease", pearl: "Max 4g/day in adults. Fever is the body's immune response." }],
    pearls: ["Always compare to baseline", "Orthostatic vitals (lying/sitting/standing)", "Pain is the 5th vital sign", "Document and report trends"],
    quiz: [{ question: "A blood pressure cuff that is too small will read:", options: ["Falsely low", "Falsely high", "Accurately", "No reading at all"], correct: 1, rationale: "A cuff that is too small compresses the artery incompletely, requiring more pressure to occlude it, resulting in a falsely high reading." }]
  },
  "wound-care-basics": {
    title: "Wound Care and Dressing Changes",
    cellular: { title: "Wound Healing Phases", content: "Wound healing occurs in 4 phases: Hemostasis (platelet plug), Inflammation (WBCs migrate), Proliferation (granulation tissue, new vessels), and Remodeling (scar maturation over months). Healing by primary intention (surgical closure), secondary intention (open wound fills in), or tertiary intention (delayed closure)." },
    signs: {
      left: ["Primary intention (approximated edges, minimal scarring)", "Secondary intention (granulation tissue, larger scar)", "Infection signs (redness, warmth, purulent drainage)"],
      right: ["Wound measurement (length x width x depth)", "Wound bed colors (red=granulation=good, yellow=slough, black=eschar=necrotic)", "Drainage types (serous, sanguineous, serosanguineous, purulent)"]
    },
    medications: [
      { name: "Normal Saline", type: "Irrigation Solution", action: "Gentle cleansing of wound bed", sideEffects: "None significant", contra: "None", pearl: "Use at body temperature for comfort and to avoid vasoconstriction." },
      { name: "Silver Sulfadiazine", type: "Topical Antimicrobial", action: "Prevents infection in burn wounds", sideEffects: "Skin discoloration, leukopenia", contra: "Sulfa allergy", pearl: "Apply with sterile gloves in a thin layer to burn wounds." },
      { name: "Hydrocolloid Dressing", type: "Moisture-Retentive Dressing", action: "Promotes moist healing environment", sideEffects: "Maceration if left too long", contra: "Infected wounds", pearl: "Best for Stage 2 pressure injuries and partial-thickness wounds." }
    ],
    pearls: ["Clean to dirty technique", "Irrigate with normal saline at body temperature", "Document size/color/drainage/odor", "Adequate nutrition (protein/Vitamin C) essential for healing"],
    quiz: [{ question: "What color wound bed indicates healthy granulation tissue?", options: ["Yellow", "Black", "Red/beefy red", "White"], correct: 2, rationale: "Red or beefy red tissue indicates healthy granulation with good blood supply and active healing." }]
  },
  "catheterization": {
    title: "Urinary Catheterization",
    cellular: { title: "Catheter-Associated Infection Risk", content: "Catheterization provides drainage when normal voiding is impaired. Indwelling (Foley) catheters carry CAUTI risk - the #1 healthcare-associated infection. Biofilm formation on catheter surfaces begins within 24 hours. Strict sterile technique during insertion and closed system maintenance are essential to prevent infection." },
    signs: {
      left: ["Indications (urinary retention, accurate I&O, surgical, immobilization)", "Insertion steps (sterile field, cleanse meatus, advance until urine flows, inflate balloon)"],
      right: ["CAUTI signs (cloudy/foul urine, fever, suprapubic pain, new confusion in elderly)", "Prevention (remove ASAP, hand hygiene, keep bag below bladder, maintain closed system)"]
    },
    medications: [
      { name: "Lidocaine Gel", type: "Local Anesthetic", action: "Reduces discomfort during catheter insertion", sideEffects: "Local irritation", contra: "Lidocaine allergy", pearl: "Apply to urethra before insertion for patient comfort." },
      { name: "Phenazopyridine", type: "Bladder Analgesic", action: "Relieves urinary tract discomfort", sideEffects: "Orange-red urine discoloration", contra: "Renal insufficiency", pearl: "Warn patients that urine will turn orange - this is expected, not blood." },
      { name: "Trimethoprim-Sulfamethoxazole", type: "Antibiotic", action: "Treats urinary tract infections including CAUTI", sideEffects: "Rash, GI upset, photosensitivity", contra: "Sulfa allergy", pearl: "First-line for uncomplicated UTI. Ensure adequate hydration." }
    ],
    pearls: ["Always attempt least invasive method first (bladder scan)", "Secure catheter to prevent traction injury", "Monitor output (>30mL/hr adult)", "Daily assessment for continued need"],
    quiz: [{ question: "The urinary drainage bag must always be kept:", options: ["At the level of the bladder", "Above the level of the bladder", "Below the level of the bladder", "On the bed next to the patient"], correct: 2, rationale: "The bag must remain below the level of the bladder to prevent backflow of urine and reduce CAUTI risk." }]
  },
  "ngtube-care": {
    title: "NG Tube Insertion and Care",
    cellular: { title: "Nasogastric Access", content: "Nasogastric tubes serve two purposes: decompression (removing gas/fluid from stomach) and enteral feeding. Proper placement verification is critical to prevent aspiration. The tube passes through the nasopharynx, down the esophagus, and into the stomach. Misplacement into the lungs is the most dangerous complication." },
    signs: {
      left: ["Measurement (NEX - Nose to Ear to Xiphoid)", "Insertion technique (head flexed forward, sip water to swallow)", "Placement verification (pH <5.5 of aspirate, x-ray is gold standard)"],
      right: ["Complications (aspiration, sinusitis, epistaxis, electrolyte imbalance from suctioning)", "Decompression care (low intermittent suction, monitor output color/amount)", "Feeding care (check residuals, elevate HOB 30-45 degrees)"]
    },
    medications: [
      { name: "Metoclopramide", type: "Prokinetic", action: "Promotes gastric motility and emptying", sideEffects: "Tardive dyskinesia, drowsiness", contra: "GI obstruction", pearl: "Give 30 minutes before feedings to enhance gastric emptying." },
      { name: "Omeprazole", type: "Proton Pump Inhibitor", action: "Reduces gastric acid for stress ulcer prophylaxis", sideEffects: "Headache, diarrhea, B12 deficiency (long-term)", contra: "None significant", pearl: "Dissolve in bicarbonate solution for NG tube administration." },
      { name: "Ondansetron", type: "Anti-emetic", action: "Blocks serotonin receptors to prevent nausea/vomiting", sideEffects: "Headache, constipation, QT prolongation", contra: "QT prolongation", pearl: "Can be given IV or ODT; does not cause sedation like other anti-emetics." }
    ],
    pearls: ["NEVER use auscultation alone to verify placement", "Flush with 30mL water every 4 hours and before/after meds", "Do not mix medications together through tube", "Hold feedings if residual >250-500mL per facility policy"],
    quiz: [{ question: "What is the gold standard for NG tube placement verification?", options: ["Auscultation of air bolus", "pH testing of aspirate", "Chest/abdominal x-ray", "Observing for coughing"], correct: 2, rationale: "Chest or abdominal x-ray is the gold standard for verifying NG tube placement. Auscultation alone is unreliable and should never be the sole method." }]
  },
  "iv-therapy": {
    title: "IV Therapy and Venipuncture",
    cellular: { title: "Vascular Access Principles", content: "Intravenous therapy delivers fluids, medications, and blood products directly into the vascular system. Peripheral IV catheters access superficial veins (cephalic, basilic, median cubital). Osmolarity determines vein compatibility: isotonic (250-375 mOsm), hypertonic (>375 mOsm requires central access for prolonged use), hypotonic (<250 mOsm)." },
    signs: {
      left: ["Site selection (distal to proximal, non-dominant hand, avoid areas of flexion/injury)", "Gauge selection (18-20G for blood/surgery, 22-24G for meds/elderly)", "Insertion technique (tourniquet, palpate, anchor, 15-30 degree angle)"],
      right: ["Infiltration (cool/pale/swollen, stop infusion)", "Phlebitis (red/warm/tender cord, remove IV)", "Extravasation (vesicant leakage - antidote needed)", "Air embolism (dyspnea/chest pain, left Trendelenburg)"]
    },
    medications: [
      { name: "Heparin Flush", type: "Anticoagulant", action: "Maintains patency of intermittent IV locks", sideEffects: "Bleeding, HIT", contra: "Active bleeding, HIT history", pearl: "Use lowest effective concentration. Saline-only flushes are replacing heparin locks in many facilities." },
      { name: "Normal Saline Flush", type: "Isotonic Solution", action: "Flushes IV line before and after medication administration", sideEffects: "None significant", contra: "None", pearl: "Use turbulent (push-pause) flushing technique to clear the line effectively." },
      { name: "Phytonadione (Vitamin K)", type: "Fat-Soluble Vitamin", action: "Reverses warfarin anticoagulation", sideEffects: "Anaphylaxis (IV route)", contra: "None absolute", pearl: "IV route carries risk of anaphylaxis - give slowly. IM/SubQ preferred when possible." }
    ],
    pearls: ["Change peripheral IV every 72-96 hours per policy", "Always check the 5 Rights before administration", "Calculate drip rates (gtt/min = volume x drop factor / time)", "Never piggyback incompatible medications"],
    quiz: [{ question: "A client shows signs of IV infiltration. What is the priority action?", options: ["Apply a warm compress", "Increase the flow rate", "Stop the infusion and remove the IV", "Elevate the extremity only"], correct: 2, rationale: "The priority is to stop the infusion immediately and remove the IV catheter to prevent further tissue damage from fluid leaking into surrounding tissue." }]
  },
  "blood-transfusion": {
    title: "Blood Transfusion Administration",
    cellular: { title: "Transfusion Immunology", content: "Blood products replace oxygen-carrying capacity (pRBCs), clotting factors (FFP), or platelets. Transfusion reactions range from mild febrile to fatal hemolytic. ABO incompatibility triggers complement-mediated hemolysis destroying donor RBCs. Type and crossmatch ensures compatibility. Two-nurse verification at bedside is mandatory." },
    signs: {
      left: ["Pre-transfusion (consent, type & crossmatch, baseline vitals)", "Two-nurse verification with patient ID and blood bank band", "Large-bore IV access (18-20G preferred)"],
      right: ["Acute Hemolytic (fever/chills/flank pain/dark urine, STOP immediately)", "Febrile Non-Hemolytic (fever/chills, most common reaction)", "Allergic (urticaria/itching, mild=antihistamine)", "Anaphylactic (bronchospasm/hypotension)", "TACO (fluid overload)", "TRALI (acute respiratory distress within 6 hours)"]
    },
    medications: [
      { name: "Diphenhydramine", type: "Antihistamine", action: "Pre-medication for clients with allergic transfusion history", sideEffects: "Drowsiness, dry mouth", contra: "Narrow-angle glaucoma", pearl: "Give 30 minutes before transfusion for patients with prior allergic reactions." },
      { name: "Epinephrine", type: "Sympathomimetic", action: "Emergency treatment for anaphylactic transfusion reaction", sideEffects: "Tachycardia, hypertension", contra: "None in anaphylaxis", pearl: "Always have at bedside during transfusions. IM injection preferred for anaphylaxis." },
      { name: "Normal Saline (0.9%)", type: "Isotonic Solution", action: "Only compatible IV fluid with blood products", sideEffects: "Fluid overload", contra: "None", pearl: "NEVER use LR or D5W with blood - LR causes clotting (calcium), D5W causes hemolysis." },
      { name: "Furosemide", type: "Loop Diuretic", action: "Treats fluid overload from TACO", sideEffects: "Hypokalemia, dehydration", contra: "Anuria", pearl: "May be ordered prophylactically for patients at risk of fluid overload (HF, renal disease)." }
    ],
    pearls: ["Stay with client for first 15 minutes", "Vitals at baseline/15min/30min/end", "Use 0.9% NS only (never LR or D5W)", "Infuse within 4 hours", "Use blood tubing with 170-micron filter"],
    quiz: [{ question: "During a transfusion, the client develops flank pain and dark urine. What is the first action?", options: ["Slow the infusion rate", "Administer diphenhydramine", "STOP the transfusion immediately", "Obtain a urine sample"], correct: 2, rationale: "Flank pain and dark urine indicate an acute hemolytic transfusion reaction. The first priority is to STOP the transfusion immediately to prevent further hemolysis." }]
  },
  "chest-tube-mgmt": {
    title: "Chest Tube Management",
    cellular: { title: "Pleural Space Dynamics", content: "Chest tubes drain air (pneumothorax) or fluid (hemothorax/pleural effusion) from the pleural space, restoring negative intrapleural pressure needed for lung expansion. The drainage system has three chambers: collection, water seal (prevents air re-entry), and suction control. Tidaling in the water seal chamber indicates proper function." },
    signs: {
      left: ["Indications (pneumothorax, hemothorax, pleural effusion, post-thoracic surgery)", "Water seal chamber (tidaling normal, continuous bubbling = air leak)", "Collection chamber (measure output hourly, >100mL/hr report)"],
      right: ["Tension pneumothorax (tracheal deviation, absent breath sounds, JVD)", "Accidental dislodgement (cover with sterile occlusive dressing taped on 3 sides)", "Dependent loops (impairs drainage)", "Clamping (generally contraindicated - risk of tension pneumo)"]
    },
    medications: [
      { name: "Alteplase", type: "Intrapleural Fibrinolytic", action: "Breaks down fibrin in loculated pleural effusions", sideEffects: "Bleeding, chest pain", contra: "Active bleeding", pearl: "Instilled into pleural space via chest tube and clamped for a dwell time before drainage." },
      { name: "Lidocaine", type: "Local Anesthetic", action: "Pain management at chest tube insertion site", sideEffects: "Numbness, allergic reaction", contra: "Lidocaine allergy", pearl: "Adequate local anesthesia improves patient cooperation during insertion." },
      { name: "Ketorolac", type: "NSAID Analgesic", action: "Systemic pain management for chest tube discomfort", sideEffects: "GI bleeding, renal impairment", contra: "Renal failure, active bleeding", pearl: "Limit use to 5 days. Effective for pleuritic chest pain without respiratory depression." }
    ],
    pearls: ["Keep drainage system below chest level", "Never clamp without an order", "Encourage deep breathing and coughing", "Milk tubing only if ordered (prevents clots)", "Have petroleum gauze at bedside for emergencies"],
    quiz: [{ question: "Continuous bubbling in the water seal chamber indicates:", options: ["Normal functioning", "An air leak", "The tube is clamped", "Fluid overload"], correct: 1, rationale: "Continuous bubbling in the water seal chamber indicates an air leak in the system or from the patient's lung. Tidaling (fluctuation with breathing) is normal, but continuous bubbling requires investigation." }]
  },
  "trach-care": {
    title: "Tracheostomy Care and Suctioning",
    cellular: { title: "Bypassed Upper Airway", content: "A tracheostomy bypasses the upper airway, eliminating the nose and mouth's natural warming, humidifying, and filtering functions. This increases infection risk and secretion production. The cuff, when inflated, seals the airway for mechanical ventilation but can cause tracheal necrosis if pressure exceeds capillary perfusion pressure (>25 cmH2O)." },
    signs: {
      left: ["Routine care (clean inner cannula every 8h, change ties when soiled, clean stoma with NS and half-strength H2O2)", "Suctioning technique (hyperoxygenate before, insert without suction, apply suction on withdrawal, max 10-15 seconds)"],
      right: ["Accidental decannulation (stay calm, use obturator to reinsert, if <7 days old the stoma closes rapidly)", "Mucus plug (inability to ventilate, suction or change inner cannula)", "Tracheoinnominate fistula (massive bleed, apply digital pressure, hyperinflate cuff)"]
    },
    medications: [
      { name: "Acetylcysteine (Mucomyst)", type: "Mucolytic", action: "Breaks down thick mucus secretions", sideEffects: "Bronchospasm, nausea", contra: "Asthma (may worsen bronchospasm)", pearl: "Can be nebulized to thin secretions. Have suction ready as it increases secretion volume." },
      { name: "Normal Saline", type: "Isotonic Solution", action: "Humidification of inspired air", sideEffects: "None significant", contra: "None", pearl: "Used for humidification only - instillation directly into the trach is NO longer recommended practice." },
      { name: "Dexamethasone", type: "Corticosteroid", action: "Reduces peristomal inflammation and airway edema", sideEffects: "Hyperglycemia, immunosuppression", contra: "Active infection (relative)", pearl: "May be used around decannulation to reduce airway swelling." }
    ],
    pearls: ["Keep spare trach and obturator at bedside ALWAYS", "Suction only as needed (not on a schedule)", "Cuff pressure <25 cmH2O", "Communication alternatives (speaking valve, writing board)", "Never cut gauze to place around trach (fraying risk)"],
    quiz: [{ question: "What is the maximum duration for a tracheal suctioning pass?", options: ["30 seconds", "20 seconds", "10-15 seconds", "5 seconds"], correct: 2, rationale: "Each suctioning pass should not exceed 10-15 seconds to prevent hypoxia. Hyperoxygenate before suctioning and allow recovery between passes." }]
  },
  "central-line-np": {
    title: "Central Line Insertion & Bundle",
    cellular: { title: "Central Venous Access", content: "Central venous catheters (CVCs) access large veins (internal jugular, subclavian, femoral) for hemodynamic monitoring, vasopressors, TPN, and medications with high osmolarity (>900 mOsm). The Seldinger technique uses a guide wire to direct catheter placement. CLABSI (Central Line-Associated Bloodstream Infection) occurs when microorganisms colonize the catheter hub or migrate along the external surface, seeding the bloodstream. Evidence-based bundles reduce CLABSI rates by >70%." },
    signs: {
      left: ["Insertion landmarks (IJ - triangle of neck, Subclavian - infraclavicular, Femoral - below inguinal ligament)", "Seldinger technique steps (needle access, guidewire, dilator, catheter, suture, confirm with CXR)"],
      right: ["CLABSI Bundle - Hand hygiene", "Full barrier precautions (cap/mask/gown/sterile gloves/drape)", "Chlorhexidine skin prep", "Optimal site selection (subclavian preferred for lowest infection rate)", "Daily assessment for necessity"]
    },
    medications: [
      { name: "Chlorhexidine", type: "Antiseptic", action: "2% skin antisepsis - superior to povidone-iodine", sideEffects: "Skin irritation, rare anaphylaxis", contra: "Known allergy", pearl: "Allow to dry completely for maximum bactericidal effect." },
      { name: "Heparin", type: "Anticoagulant", action: "Lumen lock solution to maintain catheter patency", sideEffects: "Bleeding, HIT", contra: "Active bleeding, HIT history", pearl: "Flush and lock per protocol to prevent catheter occlusion." },
      { name: "Alteplase (Cathflo)", type: "Thrombolytic", action: "Restores patency in occluded catheters", sideEffects: "Bleeding", contra: "Active internal bleeding", pearl: "Instill into occluded lumen, dwell 30-120 min, then aspirate." }
    ],
    pearls: ["Subclavian has lowest CLABSI but highest pneumothorax risk", "Confirm tip position at cavoatrial junction on CXR", "Change dressings every 7 days (transparent) or 2 days (gauze)", "Use antimicrobial-impregnated catheters for high-risk patients"],
    quiz: [{ question: "Which central line site has the lowest CLABSI rate?", options: ["Internal jugular", "Subclavian", "Femoral", "PICC line"], correct: 1, rationale: "The subclavian site has the lowest CLABSI rate due to lower bacterial colonization, though it carries the highest risk of pneumothorax." }]
  },
  "lumbar-puncture-np": {
    title: "Lumbar Puncture & CSF Analysis",
    cellular: { title: "Subarachnoid Access", content: "Lumbar puncture accesses the subarachnoid space at L3-L4 or L4-L5 (below the conus medullaris at L1-L2 to avoid spinal cord injury). CSF is produced by choroid plexus at ~500mL/day with ~150mL circulating at any time. Opening pressure measured by manometer (normal 10-20 cmH2O). CSF analysis differentiates bacterial (neutrophilic, low glucose, high protein) from viral (lymphocytic, normal glucose) meningitis, SAH, and malignancy." },
    signs: {
      left: ["Positioning (lateral decubitus with knees to chest, or seated bent forward)", "Normal CSF values (clear/colorless, glucose 50-80, protein 15-45, WBC <5, opening pressure 10-20 cmH2O)"],
      right: ["Bacterial meningitis (turbid, high WBC/PMNs, low glucose <40, high protein >200)", "Viral meningitis (clear, lymphocytes, normal glucose)", "SAH (xanthochromia, RBCs that don't clear in tube 4)", "Malignancy (cytology positive, elevated protein)"]
    },
    medications: [
      { name: "EMLA Cream", type: "Topical Anesthetic", action: "Numbs skin at puncture site", sideEffects: "Local skin reaction", contra: "Methemoglobinemia risk in infants", pearl: "Apply 60 minutes before procedure for maximum effect." },
      { name: "Lidocaine", type: "Local Anesthetic", action: "Local infiltration at insertion site", sideEffects: "Numbness, allergic reaction", contra: "Lidocaine allergy", pearl: "Buffering with sodium bicarbonate reduces injection pain." },
      { name: "Caffeine Sodium Benzoate", type: "CNS Stimulant", action: "Treats post-LP headache by cerebral vasoconstriction", sideEffects: "Insomnia, tachycardia", contra: "Cardiac arrhythmias", pearl: "IV or PO caffeine is first-line for post-dural puncture headache." },
      { name: "Epidural Blood Patch", type: "Autologous Blood", action: "Definitive treatment for persistent post-dural puncture headache", sideEffects: "Back pain, infection risk", contra: "Sepsis, coagulopathy", pearl: "Effective in >90% of cases by sealing the dural tear." }
    ],
    pearls: ["Absolute contraindication: increased ICP with mass lesion (CT first!)", "Post-procedure: lie flat 4-6 hours, increase fluids, monitor for headache/neuro changes", "Traumatic tap vs SAH: RBCs decrease from tube 1 to 4 in traumatic tap"],
    quiz: [{ question: "CSF glucose < 40 with elevated PMNs suggests?", options: ["Viral meningitis", "Bacterial meningitis", "Subarachnoid hemorrhage", "Multiple sclerosis"], correct: 1, rationale: "Bacterial meningitis presents with low CSF glucose (<40 mg/dL), elevated protein, and a neutrophilic (PMN) predominance. Bacteria consume glucose, lowering CSF levels." }]
  },
  "abg-sampling-np": {
    title: "ABG Sampling & Interpretation",
    cellular: { title: "Acid-Base Physiology", content: "Arterial blood gas analysis measures acid-base status and oxygenation. pH is maintained by the bicarbonate buffer system (H2CO3/HCO3-), regulated by lungs (CO2) and kidneys (HCO3-). Henderson-Hasselbalch equation: pH = 6.1 + log(HCO3/0.03 x PaCO2). Respiratory compensation is rapid (minutes), metabolic compensation is slow (hours-days). The anion gap [Na - (Cl + HCO3)] helps identify the cause of metabolic acidosis (normal 8-12)." },
    signs: {
      left: ["Normal values (pH 7.35-7.45, PaCO2 35-45, HCO3 22-26, PaO2 80-100, SaO2 >95%)", "Modified Allen's test (confirms ulnar collateral circulation before radial artery puncture)"],
      right: ["Interpretation framework - ROME (Respiratory Opposite, Metabolic Equal)", "Compensation (full vs partial)", "Anion gap metabolic acidosis (MUDPILES: Methanol, Uremia, DKA, Propylene glycol, INH/Iron, Lactic acidosis, Ethylene glycol, Salicylates)"]
    },
    medications: [
      { name: "Sodium Bicarbonate", type: "Alkalinizing Agent", action: "Buffer for severe metabolic acidosis (pH <7.1)", sideEffects: "Metabolic alkalosis, hypernatremia", contra: "Metabolic/respiratory alkalosis", pearl: "Use cautiously - can worsen intracellular acidosis. Reserved for pH <7.1." },
      { name: "Acetazolamide", type: "Carbonic Anhydrase Inhibitor", action: "Treats metabolic alkalosis by promoting bicarbonate excretion", sideEffects: "Metabolic acidosis, paresthesias", contra: "Severe renal/hepatic disease", pearl: "Also used for altitude sickness and glaucoma." },
      { name: "THAM (Tromethamine)", type: "Buffer Agent", action: "Alternative buffer for severe acidosis without sodium load", sideEffects: "Hypoglycemia, respiratory depression", contra: "Anuria, uremia", pearl: "Does not generate CO2 like bicarb - useful when ventilation is limited." }
    ],
    pearls: ["Apply pressure for 5 minutes post-puncture (10 min if on anticoagulants)", "Sample on ice and analyze within 30 minutes", "Compensatory changes never overcorrect", "Always correlate ABG with clinical picture"],
    quiz: [{ question: "pH 7.28, PaCO2 55, HCO3 24 - interpretation?", options: ["Metabolic acidosis", "Uncompensated respiratory acidosis", "Compensated respiratory alkalosis", "Mixed disorder"], correct: 1, rationale: "pH is acidotic (7.28), PaCO2 is elevated (55 - respiratory cause), and HCO3 is normal (24 - no metabolic compensation yet). This is uncompensated respiratory acidosis." }]
  },
  "mechanical-vent-np": {
    title: "Mechanical Ventilation Management",
    cellular: { title: "Positive Pressure Ventilation", content: "Mechanical ventilation supports or replaces spontaneous breathing. Positive pressure ventilation reverses normal thoracic pressure dynamics (negative pressure breathing). Key modes: AC (Assist-Control - set rate + patient-triggered, full support), SIMV (Synchronized IMV - set rate + spontaneous breaths at patient's own tidal volume), PSV (Pressure Support - augments spontaneous breaths only). Lung-protective ventilation limits volutrauma (Vt 6-8 mL/kg ideal body weight) and barotrauma (Pplat <30 cmH2O)." },
    signs: {
      left: ["Initial settings (FiO2 100% then wean to <60%, Vt 6-8 mL/kg IBW, RR 12-16, PEEP 5 cmH2O baseline)", "Modes (AC for full support, SIMV for weaning, PSV for spontaneous breathing trials)"],
      right: ["VILI (Ventilator-Induced Lung Injury from overdistension)", "Auto-PEEP (air trapping in COPD/asthma)", "VAP (Ventilator-Associated Pneumonia - HOB 30-45, oral care, daily sedation vacation)", "Pneumothorax (barotrauma)"]
    },
    medications: [
      { name: "Propofol", type: "Sedative-Hypnotic", action: "Sedation for intubated patients", sideEffects: "Hypotension, hypertriglyceridemia", contra: "Egg/soy allergy", pearl: "Monitor for PRIS (Propofol-Related Infusion Syndrome) with prolonged use - check triglycerides and CK." },
      { name: "Cisatracurium", type: "Neuromuscular Blocker", action: "Paralysis for severe ARDS to improve ventilator synchrony", sideEffects: "Prolonged paralysis, ICU-acquired weakness", contra: "None absolute", pearl: "Train-of-four monitoring required. Patient MUST be sedated first - paralysis without sedation is inhumane." },
      { name: "Fentanyl", type: "Opioid Analgesic", action: "Analgesia-first approach per PADIS guidelines", sideEffects: "Respiratory depression, chest wall rigidity", contra: "MAO inhibitor use", pearl: "Preferred in hemodynamically unstable patients due to minimal histamine release." }
    ],
    pearls: ["ARDSNet protocol (low Vt 6mL/kg, titrate PEEP/FiO2 table)", "Daily spontaneous breathing trial (SBT) assessment for extubation readiness", "RASS sedation scale (-5 to +4) target -2 to 0 for most patients", "Rapid shallow breathing index (f/Vt <105 predicts successful extubation)"],
    quiz: [{ question: "Lung-protective tidal volume target in ARDS?", options: ["10-12 mL/kg actual body weight", "6 mL/kg ideal body weight", "8-10 mL/kg ideal body weight", "4 mL/kg actual body weight"], correct: 1, rationale: "The ARDSNet protocol recommends low tidal volume ventilation at 6 mL/kg ideal body weight (not actual) to prevent ventilator-induced lung injury (VILI) from overdistension." }]
  },
  "tinea-corporis": {
    title: "Tinea Corporis (Ringworm)",
    cellular: { title: "Dermatophyte Infection", content: "Superficial dermatophyte fungal infection. Dermatophytes digest keratin in skin. Spread by direct contact or fomites." },
    signs: {
      left: ["Ring-shaped lesion", "Raised erythematous border", "Central clearing"],
      right: ["Pruritus", "Scaling", "May spread to other body areas"]
    },
    medications: [
      { name: "Clotrimazole", type: "Topical Antifungal", action: "Disrupts fungal cell membrane", sideEffects: "Local irritation", contra: "Hypersensitivity", pearl: "Apply to affected area and 1 inch beyond border twice daily." },
      { name: "Terbinafine", type: "Oral Antifungal", action: "Inhibits squalene epoxidase in fungal cells", sideEffects: "GI upset, headache", contra: "Liver disease", pearl: "Used for extensive or resistant cases." }
    ],
    pearls: ["Keep area clean and dry", "Do not share personal items (towels, combs, clothing)", "Complete full course of treatment even if symptoms resolve", "Wash clothing and linens in hot water"],
    quiz: [{ question: "What is the characteristic appearance of tinea corporis?", options: ["Flat, non-raised purple patches", "Ring-shaped lesion with raised border and central clearing", "Diffuse uniform redness without pattern", "Fluid-filled blisters in a linear pattern"], correct: 1, rationale: "Tinea corporis (ringworm) presents as a ring-shaped lesion with a raised, erythematous border and central clearing, giving it the classic 'ring' appearance." }]
  },
  "oral-candidiasis": {
    title: "Oral Candidiasis (Thrush)",
    cellular: { title: "Opportunistic Fungal Overgrowth", content: "Candida albicans overgrowth, opportunistic. Common in immunocompromised, infants, and inhaled corticosteroid users." },
    signs: {
      left: ["White patches on tongue/buccal mucosa", "Patches can be scraped off", "Red base underneath patches"],
      right: ["Difficulty swallowing", "Cottony feeling in mouth", "Altered taste"]
    },
    medications: [
      { name: "Nystatin", type: "Antifungal Suspension", action: "Binds to fungal cell membrane sterols", sideEffects: "GI upset, nausea", contra: "Hypersensitivity", pearl: "Swish and swallow - hold in mouth as long as possible before swallowing." },
      { name: "Fluconazole", type: "Systemic Antifungal", action: "Inhibits fungal cytochrome P450", sideEffects: "Hepatotoxicity, GI upset", contra: "Pregnancy", pearl: "Used for systemic or refractory cases." }
    ],
    pearls: ["Rinse mouth after inhaled corticosteroids to prevent thrush", "Sterilize pacifiers and bottle nipples for infants", "Assess immune status if recurrent", "Good oral hygiene is essential"],
    quiz: [{ question: "What is the most important teaching for a patient using inhaled corticosteroids?", options: ["Take the medication with food", "Rinse mouth after each use", "Only use once daily", "Avoid drinking water after use"], correct: 1, rationale: "Rinsing the mouth after inhaled corticosteroid use removes residual medication from the oropharynx, preventing Candida overgrowth (thrush)." }]
  },
  "cdiff-basics": {
    title: "C. Difficile Infection",
    cellular: { title: "Toxin-Mediated Colitis", content: "Clostridioides difficile produces toxins A and B causing colitis. Overgrowth after antibiotic use disrupts normal flora. Spore-forming organism." },
    signs: {
      left: ["Watery diarrhea (>3 stools/day)", "Foul-smelling stool", "Abdominal cramping"],
      right: ["Fever", "Leukocytosis", "Dehydration risk"]
    },
    medications: [
      { name: "Oral Vancomycin", type: "Antibiotic", action: "First-line treatment for C. diff colitis", sideEffects: "Nausea, abdominal pain", contra: "Hypersensitivity", pearl: "Oral route only for C. diff (IV vancomycin does not reach the colon)." },
      { name: "Fidaxomicin", type: "Macrocyclic Antibiotic", action: "Narrow-spectrum, targets C. diff", sideEffects: "Nausea, GI upset", contra: "Hypersensitivity", pearl: "Lower recurrence rate than vancomycin." },
      { name: "Metronidazole", type: "Antibiotic", action: "Alternative for non-severe cases", sideEffects: "Metallic taste, nausea", contra: "Alcohol use (disulfiram reaction)", pearl: "No longer first-line but still used as alternative." }
    ],
    pearls: ["Contact precautions with SOAP AND WATER - alcohol gel does NOT kill spores", "Private room required", "Bleach-based cleaning solutions required", "Do not use antidiarrheals - they trap toxins in the colon"],
    quiz: [{ question: "What is the correct hand hygiene for C. difficile?", options: ["Alcohol-based hand sanitizer", "Soap and water handwashing", "Hand sanitizer followed by gloves", "Antibacterial wipes only"], correct: 1, rationale: "C. difficile forms spores that are NOT killed by alcohol-based sanitizers. Soap and water with friction is required to physically remove spores from hands." }]
  },
  "pertussis-basics": {
    title: "Pertussis (Whooping Cough)",
    cellular: { title: "Respiratory Cilia Damage", content: "Bordetella pertussis toxin damages respiratory cilia. Three stages: catarrhal (most contagious, URI symptoms), paroxysmal (severe coughing fits with inspiratory whoop), convalescent (gradual recovery)." },
    signs: {
      left: ["Paroxysmal cough", "Inspiratory whoop", "Post-tussive vomiting"],
      right: ["Cyanosis in infants", "Apnea (infants may not whoop)", "Exhaustion between paroxysms"]
    },
    medications: [
      { name: "Azithromycin", type: "Macrolide Antibiotic", action: "Treatment and post-exposure prophylaxis", sideEffects: "GI upset, diarrhea", contra: "Hepatic dysfunction", pearl: "Most effective if started during catarrhal stage." },
      { name: "DTaP Vaccine", type: "Vaccine", action: "Prevention - primary series in childhood", sideEffects: "Injection site reactions, fever", contra: "Encephalopathy within 7 days of prior dose", pearl: "Tdap booster recommended in pregnancy at 27-36 weeks gestation." }
    ],
    pearls: ["Droplet precautions required", "Infants may not produce the classic whoop but present with apnea", "Tdap booster in pregnancy (27-36 weeks) protects newborn", "Most contagious during catarrhal stage"],
    quiz: [{ question: "What type of isolation precautions are required for pertussis?", options: ["Airborne precautions with N95", "Contact precautions only", "Droplet precautions", "Standard precautions only"], correct: 2, rationale: "Pertussis is transmitted via respiratory droplets, requiring droplet precautions (surgical mask within 3 feet, private room)." }]
  },
  "hypothyroidism-basics": {
    title: "Hypothyroidism",
    cellular: { title: "Insufficient Thyroid Hormone", content: "Thyroid gland produces insufficient T3/T4. Decreased metabolic rate affecting every organ system. Most common cause: Hashimoto's thyroiditis (autoimmune)." },
    signs: {
      left: ["Fatigue", "Weight gain", "Cold intolerance", "Constipation"],
      right: ["Dry skin", "Bradycardia", "Goiter", "Mental sluggishness"]
    },
    medications: [
      { name: "Levothyroxine", type: "Thyroid Hormone Replacement", action: "Replaces deficient T4", sideEffects: "Signs of hyperthyroidism if overdosed (tachycardia, tremor, weight loss)", contra: "Untreated adrenal insufficiency", pearl: "Take on empty stomach, 30-60 minutes before breakfast. Consistent timing daily." }
    ],
    pearls: ["Monitor TSH levels regularly", "Takes 4-6 weeks for dose adjustments to show full effect", "Lifelong treatment required", "Teach signs of hyperthyroidism (overreplacement): tachycardia, tremor, weight loss, heat intolerance"],
    quiz: [{ question: "When should a patient take Levothyroxine?", options: ["With breakfast", "At bedtime with a snack", "On empty stomach, 30-60 min before breakfast", "Immediately after eating"], correct: 2, rationale: "Levothyroxine should be taken on an empty stomach, 30-60 minutes before breakfast, because food (especially calcium and iron) interferes with absorption." }]
  },
  "osteoporosis-basics": {
    title: "Osteoporosis",
    cellular: { title: "Bone Density Loss", content: "Imbalance between osteoblast bone formation and osteoclast bone resorption. Peak bone mass by age 30, then gradual loss. Estrogen decline accelerates loss in menopause." },
    signs: {
      left: ["Often silent until fracture", "Loss of height", "Kyphosis (dowager's hump)"],
      right: ["DEXA scan T-score < -2.5", "Fragility fractures (hip, wrist, vertebral)", "Back pain from compression fractures"]
    },
    medications: [
      { name: "Alendronate", type: "Bisphosphonate", action: "Inhibits osteoclast activity", sideEffects: "Esophageal irritation, jaw osteonecrosis (rare)", contra: "Esophageal disorders, inability to sit upright", pearl: "Take upright with full glass of water, remain upright 30 minutes. Take on empty stomach." },
      { name: "Calcium + Vitamin D", type: "Supplement", action: "Supports bone mineralization", sideEffects: "Constipation, kidney stones (excess calcium)", contra: "Hypercalcemia", pearl: "Calcium 1200mg/day + Vitamin D 800-1000 IU/day for postmenopausal women." }
    ],
    pearls: ["Weight-bearing exercise strengthens bones", "Fall prevention is critical", "DEXA screening recommended for women >65", "Avoid bending and twisting movements"],
    quiz: [{ question: "How should a patient take Alendronate?", options: ["With food and then lie down", "Crushed and mixed with juice", "Upright with full glass of water, remain upright 30 min", "At bedtime with milk"], correct: 2, rationale: "Alendronate must be taken upright with a full glass of water, and the patient must remain upright for at least 30 minutes to prevent esophageal erosion." }]
  },
  "atopic-dermatitis": {
    title: "Atopic Dermatitis (Eczema)",
    cellular: { title: "Impaired Skin Barrier", content: "Chronic inflammatory skin condition. Impaired skin barrier (filaggrin deficiency) allows allergen penetration. IgE-mediated hypersensitivity. Part of atopic triad (asthma, allergic rhinitis, eczema)." },
    signs: {
      left: ["Intense pruritus", "Erythematous patches", "Dry/scaly skin"],
      right: ["Lichenification from chronic scratching", "Flexural distribution (older children/adults)", "Facial distribution in infants"]
    },
    medications: [
      { name: "Emollients", type: "Moisturizer", action: "Restores skin barrier", sideEffects: "None significant", contra: "None", pearl: "First-line treatment - apply immediately after bathing to lock in moisture." },
      { name: "Hydrocortisone", type: "Topical Corticosteroid", action: "Reduces inflammation", sideEffects: "Skin thinning with prolonged use", contra: "Active skin infections", pearl: "Use lowest potency for shortest duration. Apply before emollient." },
      { name: "Diphenhydramine", type: "Antihistamine", action: "Reduces pruritus", sideEffects: "Drowsiness", contra: "Narrow-angle glaucoma", pearl: "Sedating effect can help with nighttime itching." }
    ],
    pearls: ["Avoid triggers: harsh soaps, wool, extreme temperatures", "Short lukewarm baths (not hot)", "Cotton clothing preferred", "Keep nails short to prevent excoriation"],
    quiz: [{ question: "What is the first-line treatment for atopic dermatitis?", options: ["Oral antibiotics", "Topical corticosteroids", "Emollients (moisturizers)", "Antihistamines"], correct: 2, rationale: "Emollients are the foundation of eczema treatment. They restore the impaired skin barrier and should be applied liberally and frequently, especially immediately after bathing." }]
  },
  "ibs-basics": {
    title: "Irritable Bowel Syndrome",
    cellular: { title: "Functional GI Disorder", content: "Functional GI disorder with altered gut motility and visceral hypersensitivity. Brain-gut axis dysfunction. No structural abnormalities found on testing. Diagnosed by Rome IV criteria." },
    signs: {
      left: ["Abdominal pain related to defecation", "Change in stool frequency/form", "Bloating"],
      right: ["Symptoms for >6 months", "IBS-C (constipation predominant)", "IBS-D (diarrhea predominant)", "IBS-M (mixed)"]
    },
    medications: [
      { name: "Psyllium", type: "Fiber Supplement", action: "Bulking agent normalizes stool", sideEffects: "Bloating, gas initially", contra: "Bowel obstruction", pearl: "Take with plenty of water. Increase fiber gradually." },
      { name: "Dicyclomine", type: "Antispasmodic", action: "Reduces intestinal smooth muscle spasms", sideEffects: "Dry mouth, dizziness", contra: "GI obstruction, glaucoma", pearl: "Take 30 minutes before meals for best effect." },
      { name: "Loperamide", type: "Antidiarrheal", action: "Slows intestinal motility for IBS-D", sideEffects: "Constipation, abdominal cramps", contra: "Bloody diarrhea, C. diff", pearl: "Use as needed for diarrhea-predominant IBS only." }
    ],
    pearls: ["Food diary to identify triggers", "Stress management is key component", "FODMAP diet may help reduce symptoms", "IBS does NOT cause weight loss or bleeding - these are red flags for other diagnoses"],
    quiz: [{ question: "Which symptom would suggest a diagnosis OTHER than IBS?", options: ["Bloating after meals", "Abdominal pain relieved by defecation", "Unintentional weight loss and rectal bleeding", "Alternating constipation and diarrhea"], correct: 2, rationale: "Weight loss and rectal bleeding are red flag symptoms that suggest organic disease (IBD, cancer) rather than IBS. IBS is a functional disorder that does not cause these findings." }]
  },
  "adhd-basics": {
    title: "ADHD",
    cellular: { title: "Neurodevelopmental Dysregulation", content: "Neurodevelopmental disorder. Dysregulation of dopamine and norepinephrine in prefrontal cortex. Three presentations: predominantly inattentive, predominantly hyperactive-impulsive, combined. Symptoms must be present before age 12 in 2+ settings." },
    signs: {
      left: ["Difficulty sustaining attention", "Fidgeting", "Difficulty waiting turn"],
      right: ["Excessive talking", "Disorganization", "Losing things frequently"]
    },
    medications: [
      { name: "Methylphenidate", type: "CNS Stimulant", action: "Increases dopamine and norepinephrine in prefrontal cortex", sideEffects: "Appetite suppression, insomnia, growth suppression", contra: "Severe anxiety, tics, glaucoma", pearl: "First-line pharmacological treatment. Take in the morning to avoid insomnia." },
      { name: "Amphetamine Salts", type: "CNS Stimulant", action: "Increases dopamine and norepinephrine release", sideEffects: "Appetite suppression, tachycardia, insomnia", contra: "Cardiovascular disease, MAOIs", pearl: "Alternative stimulant option. Monitor cardiovascular status." },
      { name: "Atomoxetine", type: "Non-Stimulant (SNRI)", action: "Selective norepinephrine reuptake inhibitor", sideEffects: "GI upset, mood changes", contra: "MAOIs, narrow-angle glaucoma", pearl: "Non-stimulant alternative - no abuse potential. Takes 4-6 weeks for full effect." }
    ],
    pearls: ["Monitor growth (height and weight) - stimulants may suppress appetite and growth", "Take stimulants in the morning to minimize insomnia", "Drug holidays during school breaks may be considered", "Behavioral therapy should accompany medication"],
    quiz: [{ question: "What is the priority monitoring for a child on stimulant medication?", options: ["Liver function tests", "Growth parameters (height and weight)", "Blood glucose levels", "Kidney function"], correct: 1, rationale: "Stimulant medications can suppress appetite and growth. Regular monitoring of height and weight is essential to ensure the child is growing appropriately." }]
  },
  "separation-anxiety": {
    title: "Separation Anxiety",
    cellular: { title: "Developmental vs Pathological", content: "Normal developmental stage peaking 10-18 months. Pathological when excessive/persistent beyond age, causing significant distress/impairment. Related to attachment theory - child fears loss of caregiver." },
    signs: {
      left: ["Excessive distress when separated", "Worry about harm to caregiver", "Refusal to go to school/sleep alone"],
      right: ["Nightmares about separation", "Somatic complaints (stomachache/headache)", "Clinginess"]
    },
    medications: [
      { name: "CBT", type: "Psychotherapy", action: "First-line treatment - cognitive behavioral therapy", sideEffects: "Initial anxiety increase during exposure", contra: "None", pearl: "Most effective treatment. Gradual exposure to feared separations." },
      { name: "Fluoxetine", type: "SSRI", action: "Reduces anxiety symptoms for severe cases", sideEffects: "GI upset, headache, suicidal ideation (black box warning in youth)", contra: "MAOIs", pearl: "Reserved for severe cases not responding to CBT alone. Monitor closely for suicidality in children/adolescents." }
    ],
    pearls: ["Establish consistent routines", "Practice brief separations and gradually increase", "Avoid prolonged goodbyes", "Validate feelings without reinforcing avoidance", "Normal vs pathological depends on age and severity"],
    quiz: [{ question: "At what age is separation anxiety considered developmentally normal?", options: ["Birth to 3 months", "10-18 months", "3-5 years", "School age (6-12 years)"], correct: 1, rationale: "Separation anxiety is a normal developmental stage that peaks at 10-18 months when the child has developed object permanence and attachment but lacks the cognitive ability to understand the caregiver will return." }]
  },
  "lead-poisoning": {
    title: "Lead Poisoning",
    cellular: { title: "Heavy Metal Toxicity", content: "Lead interferes with heme synthesis (inhibits ALA dehydratase and ferrochelatase), disrupts calcium signaling in neurons, causes oxidative damage. Children absorb more lead than adults and are more vulnerable due to developing brain." },
    signs: {
      left: ["Developmental delays", "Irritability", "Abdominal pain (lead colic)"],
      right: ["Constipation", "Lead lines on gums (Burton lines)", "Wrist/foot drop", "Encephalopathy (severe)"]
    },
    medications: [
      { name: "Succimer (DMSA)", type: "Oral Chelating Agent", action: "Binds lead for renal excretion", sideEffects: "GI upset, rash, elevated liver enzymes", contra: "Allergy to succimer", pearl: "Oral chelation for moderate blood lead levels. Adequate hydration essential." },
      { name: "CaEDTA", type: "IV Chelating Agent", action: "Chelates lead for severe cases/encephalopathy", sideEffects: "Nephrotoxicity, electrolyte imbalances", contra: "Renal failure", pearl: "Used for severe poisoning or encephalopathy. Monitor renal function and I&O closely." }
    ],
    pearls: ["Screen at ages 1 and 2", "Most common source: old paint in pre-1978 housing", "Blood lead level >5 mcg/dL requires investigation", "Hand washing before eating reduces ingestion", "Wet mopping removes lead dust (dry sweeping spreads it)"],
    quiz: [{ question: "What is the most common source of lead exposure in children?", options: ["Contaminated water", "Lead-based paint in older homes (pre-1978)", "Soil contamination", "Imported toys"], correct: 1, rationale: "The most common source of lead exposure in children is lead-based paint in homes built before 1978. Children ingest paint chips or inhale dust from deteriorating paint." }]
  },
  "scoliosis-basics": {
    title: "Scoliosis",
    cellular: { title: "Spinal Curvature", content: "Lateral curvature of the spine >10 degrees. Most common: adolescent idiopathic scoliosis (AIS), typically detected age 10-15 during growth spurts. More common in females. Adams forward bend test is screening method." },
    signs: {
      left: ["Asymmetric shoulders/hips", "Rib hump on forward bending"],
      right: ["Uneven waistline", "One scapula more prominent"]
    },
    medications: [
      { name: "NSAIDs", type: "Pain Management", action: "Anti-inflammatory for associated pain", sideEffects: "GI upset, renal effects", contra: "Renal impairment, GI bleeding", pearl: "No medications treat the curve itself. Pain management only as needed." },
      { name: "Boston Brace", type: "Orthotic Device", action: "Prevents curve progression for curves 25-45 degrees", sideEffects: "Skin irritation, body image concerns", contra: "Skeletal maturity (brace no longer effective)", pearl: "Wear 18-23 hours/day for effectiveness. Compliance is critical." }
    ],
    pearls: ["School screening programs for early detection", "Monitor closely during growth spurts", "Brace compliance is key to preventing surgery", "Post-surgical care: log-roll only, monitor neurological status"],
    quiz: [{ question: "When is bracing indicated for scoliosis?", options: ["Curves less than 10 degrees", "Curves 25-45 degrees in growing adolescents", "All curves regardless of degree", "Only after skeletal maturity"], correct: 1, rationale: "Bracing is indicated for curves between 25-45 degrees in skeletally immature (still growing) adolescents to prevent further curve progression. Smaller curves are monitored, and larger curves may need surgery." }]
  },
  "inhaled-spacers": {
    title: "Inhaled Spacers",
    cellular: { title: "Medication Delivery Optimization", content: "Spacers are holding chambers that slow the velocity of aerosolized medication from MDIs, allowing more drug to reach the lungs instead of depositing in the oropharynx. Reduces systemic absorption and side effects (thrush from corticosteroids, tachycardia from bronchodilators)." },
    signs: {
      left: ["Shake MDI", "Attach to spacer", "Exhale fully before use"],
      right: ["Press canister and inhale slowly 3-5 seconds", "Hold breath 10 seconds", "Wait 1 minute between puffs"]
    },
    medications: [
      { name: "Albuterol", type: "Short-Acting Beta-2 Agonist (Bronchodilator)", action: "Relaxes bronchial smooth muscle", sideEffects: "Tachycardia, tremor, nervousness", contra: "Hypersensitivity", pearl: "Use FIRST - opens airways so corticosteroid can reach deeper lung tissue." },
      { name: "Fluticasone", type: "Inhaled Corticosteroid", action: "Reduces airway inflammation", sideEffects: "Oral thrush, hoarseness", contra: "Active fungal infections", pearl: "Use SECOND after bronchodilator. Always rinse mouth after use to prevent thrush." }
    ],
    pearls: ["Use spacer with all MDIs for optimal delivery", "Clean spacer weekly with warm soapy water and air dry", "Children and elderly benefit most from spacers", "Spacer eliminates need for perfect hand-breath coordination"],
    quiz: [{ question: "When using both a bronchodilator and corticosteroid inhaler, which should be used first?", options: ["Corticosteroid first, then bronchodilator", "Bronchodilator first, then corticosteroid", "Either order is acceptable", "Mix them together in the spacer"], correct: 1, rationale: "The bronchodilator (e.g., Albuterol) should be used first to open the airways, allowing the corticosteroid (e.g., Fluticasone) to penetrate deeper into the lungs for maximum anti-inflammatory effect." }]
  },
  "meds-to-infants": {
    title: "Administering Medications to Infants",
    cellular: { title: "Pediatric Pharmacokinetics", content: "Infants have immature liver/kidney function affecting drug metabolism and excretion. Body composition (higher water content, lower fat) affects drug distribution. Dosing is always weight-based (mg/kg). Oral route preferred when possible." },
    signs: {
      left: ["Use calibrated oral syringe (never household spoon)", "Direct toward inner cheek in small amounts"],
      right: ["Hold infant semi-upright", "Allow time to swallow between pushes"]
    },
    medications: [
      { name: "Acetaminophen", type: "Analgesic/Antipyretic", action: "Pain and fever relief", sideEffects: "Hepatotoxicity in overdose", contra: "Liver disease", pearl: "Weight-based dosing. No aspirin in children <19 due to Reye syndrome risk." },
      { name: "Amoxicillin", type: "Antibiotic", action: "Most common pediatric antibiotic", sideEffects: "Diarrhea, rash", contra: "Penicillin allergy", pearl: "Shake suspension well. Refrigerate after reconstitution. Complete full course." }
    ],
    pearls: ["Always verify weight-based dose calculation (double-check with another nurse)", "Never mix medication in bottle - infant may not finish and won't get full dose", "IM injections in vastus lateralis for infants", "Always check for allergies with parents/caregivers"],
    quiz: [{ question: "Why should household spoons never be used for infant medication?", options: ["They are too large for infant mouths", "They are not calibrated and lead to inaccurate dosing", "Infants prefer syringes", "Spoons are harder to clean"], correct: 1, rationale: "Household spoons vary significantly in size and are not calibrated, leading to inaccurate dosing. Calibrated oral syringes ensure precise measurement of weight-based doses, which is critical in infants." }]
  },
  "cleansing-enemas": {
    title: "Cleansing Enemas",
    cellular: { title: "Bowel Evacuation Procedure", content: "Enemas introduce fluid into the rectum/colon to stimulate peristalsis and evacuate fecal matter. Types: tap water (hypotonic - risk of fluid/electrolyte imbalance), normal saline (isotonic - safest), soap suds (irritant), fleet (hypertonic phosphate)." },
    signs: {
      left: ["Left Sims position (left lateral, right knee flexed)", "Insert tubing 3-4 inches in adults"],
      right: ["Solution temperature: 105°F (40.5°C)", "Hang bag 12-18 inches above anus"]
    },
    medications: [
      { name: "Sodium Phosphate (Fleet)", type: "Hypertonic Enema", action: "Pulls water into colon by osmotic action", sideEffects: "Electrolyte imbalances (hyperphosphatemia)", contra: "Renal failure, children <2 years", pearl: "Pre-packaged and ready to use. Results in 5-10 minutes." },
      { name: "Mineral Oil", type: "Retention Enema", action: "Lubricates and softens hardened stool", sideEffects: "Anal leakage", contra: "Aspiration risk patients", pearl: "Retain for 30-60 minutes for effectiveness. Position on right side after administration." }
    ],
    pearls: ["Contraindicated in recent rectal surgery or low platelet count", "Stop if client reports severe cramping", "Never force the tube - risk of perforation", "Document results: amount, color, consistency"],
    quiz: [{ question: "What is the correct patient positioning for enema administration?", options: ["Right lateral (Sims) position", "Left lateral (Sims) position", "Supine position", "Prone position"], correct: 1, rationale: "Left Sims position (left lateral with right knee flexed) allows the solution to flow by gravity along the natural anatomical curve of the sigmoid colon and descending colon." }]
  },
  "wound-irrigation": {
    title: "Wound Irrigation",
    cellular: { title: "Mechanical Wound Cleansing", content: "Wound irrigation mechanically removes debris, bacteria, and necrotic tissue from wound bed. The goal is to deliver enough pressure to cleanse without damaging healthy granulation tissue. Optimal pressure: 8-15 psi (achieved with 35mL syringe and 19-gauge needle/angiocatheter)." },
    signs: {
      left: ["Contaminated wounds", "Wounds with visible debris"],
      right: ["Chronic wounds with biofilm", "Irrigate from clean to dirty, top to bottom"]
    },
    medications: [
      { name: "Normal Saline", type: "Standard Irrigant", action: "Isotonic solution for wound cleansing", sideEffects: "None significant", contra: "None", pearl: "Standard irrigant of choice. Use warm (body temperature) for patient comfort and to promote healing." },
      { name: "Wound Cleansers", type: "pH-Balanced Cleanser", action: "Surfactant-based wound cleansing", sideEffects: "Minimal irritation", contra: "Deep wounds with exposed structures", pearl: "Avoid hydrogen peroxide and Dakin's solution on granulating tissue - they are cytotoxic to new tissue." }
    ],
    pearls: ["Use warm (body temperature) solution", "Wear PPE including splash guard/gown", "Document wound appearance before and after irrigation", "Pulsatile lavage for deep wounds"],
    quiz: [{ question: "What is the optimal pressure for wound irrigation?", options: ["1-3 psi (very gentle)", "8-15 psi (35mL syringe with 19-gauge needle)", "20-30 psi (high pressure)", "Pressure does not matter"], correct: 1, rationale: "Optimal wound irrigation pressure is 8-15 psi, achieved with a 35mL syringe and 19-gauge needle or angiocatheter. This pressure is sufficient to remove debris and bacteria without damaging healthy granulation tissue." }]
  },
  "infective-endocarditis": {
    title: "Infective Endocarditis",
    cellular: { title: "Valve Infection & Vegetation", content: "Microbial infection of heart valves/endocardium. Vegetation (platelet-fibrin-microbe mass) forms on damaged valves. Most common organisms: Strep viridans (native valves), Staph aureus (IV drug users, prosthetic valves). Duke criteria used for diagnosis." },
    signs: {
      left: ["Fever", "New/Changing Heart Murmur", "Janeway Lesions (painless palms/soles)", "Osler Nodes (painful fingertips)"],
      right: ["Splinter Hemorrhages (nails)", "Roth Spots (retina)", "Splenomegaly", "Embolic Events (stroke, PE)"]
    },
    medications: [
      { name: "Vancomycin + Gentamicin", type: "Empiric Antibiotic", action: "Broad-spectrum coverage for endocarditis", sideEffects: "Nephrotoxicity, ototoxicity", contra: "Renal failure (dose adjust)", pearl: "Empiric therapy until culture results available. 4-6 weeks IV antibiotics required." },
      { name: "Nafcillin", type: "Antistaphylococcal Penicillin", action: "Targets MSSA endocarditis", sideEffects: "Interstitial nephritis, hepatotoxicity", contra: "Penicillin allergy", pearl: "Used for methicillin-sensitive Staph aureus. Switch from empiric therapy once sensitivities known." }
    ],
    pearls: ["Blood cultures x3 from different sites before starting antibiotics", "PICC line placement for long-term outpatient IV therapy", "Dental prophylaxis required for patients with prosthetic valves", "Monitor for embolic complications (stroke, splenic infarct, renal infarct)"],
    quiz: [{ question: "Which finding is classic for infective endocarditis and differentiates it from other endocardial conditions?", options: ["Chest pain with inspiration", "Janeway lesions and Osler nodes", "Pericardial friction rub", "Electrical alternans on ECG"], correct: 1, rationale: "Janeway lesions (painless erythematous lesions on palms/soles) and Osler nodes (painful nodules on fingertips) are classic peripheral manifestations of infective endocarditis caused by septic emboli and immune complex deposition." }]
  },
  "peripheral-artery-disease": {
    title: "Peripheral Artery Disease (PAD)",
    cellular: { title: "Atherosclerotic Narrowing", content: "Atherosclerotic narrowing of peripheral arteries reduces blood flow to extremities. Progression: intermittent claudication → rest pain → critical limb ischemia → tissue loss. Ankle-Brachial Index (ABI) < 0.9 is diagnostic." },
    signs: {
      left: ["Intermittent Claudication (calf pain with walking, relieved by rest)", "Pallor on Elevation", "Dependent Rubor", "Hair Loss on Affected Leg"],
      right: ["Thick Toenails", "Cool Extremities", "Absent/Diminished Pedal Pulses", "Non-healing Wounds on Toes/Feet"]
    },
    medications: [
      { name: "Cilostazol", type: "PDE3 Inhibitor", action: "Vasodilation and antiplatelet effect, improves walking distance", sideEffects: "Headache, diarrhea, palpitations", contra: "Heart failure (any severity)", pearl: "Most effective medication for improving claudication symptoms. Takes 2-4 weeks for full effect." },
      { name: "Aspirin + Statin", type: "Antiplatelet/Lipid-lowering", action: "Reduces cardiovascular events and atherosclerotic progression", sideEffects: "GI bleeding (aspirin), myalgia (statin)", contra: "Active bleeding", pearl: "Foundation of PAD medical management to reduce MI/stroke risk." }
    ],
    pearls: ["Supervised walking program is the most important non-surgical intervention", "Buerger's exercises improve collateral circulation", "Position legs in DEPENDENT position (NOT elevated like venous disease)", "Smoking cessation is critical - single most modifiable risk factor"],
    quiz: [{ question: "What is the key difference between arterial and venous insufficiency?", options: ["Arterial causes brown discoloration, venous causes pallor", "Arterial pain improves with elevation, venous pain worsens", "Arterial: pallor on elevation, absent pulses; Venous: edema, brown discoloration", "There is no clinical difference"], correct: 2, rationale: "PAD presents with pallor on elevation, dependent rubor, absent pulses, and claudication. Venous insufficiency presents with edema, brown hemosiderin staining, and stasis dermatitis. PAD legs are positioned DOWN; venous legs are ELEVATED." }]
  },
  "aortic-dissection": {
    title: "Aortic Dissection",
    cellular: { title: "Aortic Intimal Tear", content: "Tear in aortic intima allows blood to enter between layers of the aortic wall, creating a false lumen. Stanford Type A (ascending aorta - surgical emergency) vs Type B (descending aorta - medical management). Major risk factors: uncontrolled HTN, Marfan syndrome, bicuspid aortic valve." },
    signs: {
      left: ["Sudden Tearing/Ripping Chest Pain Radiating to Back", "Unequal BP in Arms (>20mmHg difference)", "Widened Mediastinum on CXR", "Aortic Regurgitation Murmur"],
      right: ["Hypertension (most common)", "Pulse Deficits", "Neurological Deficits (if carotid involved)", "Malperfusion Syndrome (renal, mesenteric)"]
    },
    medications: [
      { name: "Esmolol", type: "IV Beta Blocker", action: "Reduces heart rate and aortic shear stress", sideEffects: "Bradycardia, hypotension", contra: "Severe bradycardia, heart block", pearl: "FIRST medication given - must reduce HR before reducing BP to prevent reflex tachycardia." },
      { name: "Nitroprusside", type: "IV Vasodilator", action: "Reduces afterload and aortic wall stress", sideEffects: "Cyanide toxicity (prolonged use)", contra: "Use ONLY after beta blocker initiated", pearl: "Given AFTER beta blocker to avoid reflex tachycardia which increases aortic shear stress." }
    ],
    pearls: ["Control HR before BP (target HR <60 bpm)", "Type A (ascending) = emergency surgery", "BP must be checked in BOTH arms - unequal pressures are diagnostic", "Morphine for pain management (also reduces sympathetic drive)"],
    quiz: [{ question: "Why must a beta blocker be given BEFORE a vasodilator in aortic dissection?", options: ["Beta blockers are stronger medications", "Vasodilators cause reflex tachycardia which increases aortic shear stress", "Beta blockers reduce pain better", "Vasodilators are contraindicated alone"], correct: 1, rationale: "Vasodilators cause reflex tachycardia through baroreceptor activation. Increased heart rate increases the rate of aortic pressure change (dP/dt), which increases shear stress on the aortic wall and can propagate the dissection. Beta blockers must be given first to block this reflex." }]
  },
  "polycythemia": {
    title: "Polycythemia Vera",
    cellular: { title: "Myeloproliferative Neoplasm", content: "Polycythemia vera is a myeloproliferative neoplasm with JAK2 mutation (V617F) causing overproduction of RBCs, WBCs, and platelets. Increased blood viscosity leads to thrombosis risk. Secondary polycythemia results from chronic hypoxia (COPD, high altitude) with appropriately elevated EPO." },
    signs: {
      left: ["Plethoric Facies (ruddy complexion)", "Headache & Dizziness", "Pruritus After Bathing (aquagenic)", "Splenomegaly"],
      right: ["Hypertension", "Erythromelalgia (burning hands/feet)", "Visual Disturbances", "Thrombotic Events (DVT, stroke)"]
    },
    medications: [
      { name: "Phlebotomy", type: "Mainstay Treatment", action: "Removes excess RBCs to reduce viscosity", sideEffects: "Iron deficiency (expected)", contra: "Hemodynamic instability", pearl: "Target hematocrit <45%. First-line treatment for all patients." },
      { name: "Hydroxyurea", type: "Cytoreductive Agent", action: "Suppresses bone marrow production of blood cells", sideEffects: "Myelosuppression, oral ulcers", contra: "Severe leukopenia", pearl: "Added for high-risk patients (age >60, prior thrombosis). Low-dose Aspirin also given to reduce thrombotic risk." }
    ],
    pearls: ["Increase oral fluid intake to reduce blood viscosity", "Avoid iron supplements (would fuel further RBC production)", "Risk of transformation to myelofibrosis or AML over time", "Distinguish primary (low EPO) from secondary (high EPO) polycythemia"],
    quiz: [{ question: "What is the first-line treatment for polycythemia vera?", options: ["Chemotherapy", "Phlebotomy to target Hct <45%", "Blood transfusion", "Iron supplementation"], correct: 1, rationale: "Phlebotomy (therapeutic blood removal) is the first-line treatment for all patients with polycythemia vera. The goal is to maintain hematocrit below 45% to reduce blood viscosity and thrombotic risk." }]
  },
  "carotid-endarterectomy": {
    title: "Carotid Endarterectomy Post-Op Care",
    cellular: { title: "Carotid Plaque Removal", content: "Surgical removal of atherosclerotic plaque from the carotid artery to restore blood flow and reduce stroke risk. Indicated for symptomatic stenosis >70% or asymptomatic stenosis >80%. Patch angioplasty or primary closure techniques used." },
    signs: {
      left: ["Monitor Neuro Status q1h (NIHSS)", "CN VII Injury (facial droop)", "CN X Injury (hoarseness, dysphagia)", "CN XII Injury (tongue deviation)"],
      right: ["Neck Hematoma (airway emergency)", "Hypotension or Hypertension", "Headache/Seizures (hyperperfusion syndrome)", "Signs of Stroke (new deficits)"]
    },
    medications: [
      { name: "Aspirin + Clopidogrel", type: "Dual Antiplatelet", action: "Prevents thrombosis at surgical site", sideEffects: "Bleeding risk", contra: "Active hemorrhage", pearl: "Dual antiplatelet therapy reduces perioperative stroke risk." },
      { name: "Labetalol", type: "Alpha/Beta Blocker", action: "Post-op BP control", sideEffects: "Bradycardia, bronchospasm", contra: "Asthma, heart block", pearl: "Keep BP within 20% of baseline. Too low = thrombosis, too high = hemorrhage or hyperperfusion." }
    ],
    pearls: ["Keep BP within 20% of baseline (too low = thrombosis, too high = hemorrhage)", "Monitor for hyperperfusion syndrome (headache, seizures, focal deficits)", "Keep emergency airway equipment at bedside (hematoma can compress trachea)", "Assess cranial nerves frequently - injury may be temporary or permanent"],
    quiz: [{ question: "What is the priority assessment after carotid endarterectomy?", options: ["Pain level assessment", "Neurological status and airway patency", "Wound appearance", "Urinary output"], correct: 1, rationale: "The priority assessments are neurological status (stroke detection) and airway patency (neck hematoma can rapidly compress the trachea). Neuro checks should be performed hourly and any new deficits reported immediately." }]
  },
  "ards-management": {
    title: "ARDS Management",
    cellular: { title: "Diffuse Alveolar Damage", content: "Acute Respiratory Distress Syndrome involves diffuse alveolar damage from inflammatory mediators. Increased alveolar-capillary permeability causes non-cardiogenic pulmonary edema. Bilateral infiltrates on CXR. Severity by PaO2/FiO2 ratio: <300 (mild), <200 (moderate), <100 (severe)." },
    signs: {
      left: ["Acute Onset Dyspnea", "Refractory Hypoxemia (not responding to O2)", "Bilateral Infiltrates on CXR ('white-out')", "Decreased Lung Compliance"],
      right: ["Tachypnea", "Accessory Muscle Use", "Cyanosis", "Respiratory Failure Requiring Intubation"]
    },
    medications: [
      { name: "Cisatracurium", type: "Neuromuscular Blocking Agent", action: "Eliminates patient-ventilator dyssynchrony in severe ARDS", sideEffects: "Prolonged paralysis, ICU-acquired weakness", contra: "Mild ARDS", pearl: "Used for severe ARDS (P/F <150) in first 48 hours. Patient must be deeply sedated first." },
      { name: "Dexamethasone", type: "Corticosteroid", action: "Reduces inflammatory response in select cases", sideEffects: "Hyperglycemia, immunosuppression", contra: "Active fungal infection", pearl: "May improve outcomes in moderate-severe ARDS. Prone positioning (16+ hrs/day) is a key non-pharmacologic intervention." }
    ],
    pearls: ["Lung-protective ventilation: Tidal volume 6mL/kg IDEAL body weight, Plateau pressure <30 cmH2O", "Prone positioning improves V/Q matching and reduces mortality", "Conservative fluid strategy (keep patient dry)", "Address the underlying cause (sepsis, aspiration, pneumonia)"],
    quiz: [{ question: "What is the target tidal volume for mechanical ventilation in ARDS?", options: ["10-12 mL/kg actual body weight", "6 mL/kg ideal body weight", "8-10 mL/kg ideal body weight", "As high as needed to normalize CO2"], correct: 1, rationale: "Lung-protective ventilation uses low tidal volumes of 6 mL/kg ideal (not actual) body weight to prevent ventilator-induced lung injury (VILI). Higher volumes cause overdistension and worsen alveolar damage." }]
  },
  "active-tb": {
    title: "Active Tuberculosis (TB)",
    cellular: { title: "Acid-Fast Bacillus Infection", content: "Mycobacterium tuberculosis is an acid-fast bacillus transmitted via airborne droplets. Infects alveolar macrophages and forms caseating granulomas. Primary infection is often latent (90-95%). Reactivation occurs in immunocompromised states (HIV, malnutrition, immunosuppressive therapy)." },
    signs: {
      left: ["Chronic Productive Cough >3 Weeks", "Hemoptysis", "Night Sweats", "Unintentional Weight Loss"],
      right: ["Low-Grade Fever", "Cavitary Lesions on CXR (upper lobes)", "Positive Sputum AFB Smear", "Fatigue and Malaise"]
    },
    medications: [
      { name: "RIPE Therapy", type: "Combination Antitubercular", action: "Rifampin, Isoniazid, Pyrazinamide, Ethambutol for initial 2 months", sideEffects: "Hepatotoxicity (RIP), optic neuritis (E)", contra: "Severe liver disease", pearl: "Initial intensive phase (2 months RIPE), then continuation phase (4 months RI). Total 6 months minimum." },
      { name: "Pyridoxine (Vitamin B6)", type: "Vitamin Supplement", action: "Prevents INH-induced peripheral neuropathy", sideEffects: "None at therapeutic doses", contra: "None significant", pearl: "Always co-prescribe with Isoniazid. INH depletes B6 causing numbness/tingling in extremities." }
    ],
    pearls: ["Airborne precautions: N95 respirator for staff, negative pressure room for patient", "3 consecutive negative sputum AFB cultures needed to discontinue airborne isolation", "Rifampin turns body fluids orange/red (tears, urine, sweat) - warn patient", "Monitor hepatic function regularly (LFTs) - hepatotoxicity is major risk"],
    quiz: [{ question: "Why is Vitamin B6 (Pyridoxine) given with Isoniazid?", options: ["To enhance antibiotic effectiveness", "To prevent INH-induced peripheral neuropathy", "To reduce hepatotoxicity", "To improve drug absorption"], correct: 1, rationale: "Isoniazid interferes with pyridoxine (B6) metabolism, leading to peripheral neuropathy (numbness, tingling in hands/feet). Co-administration of B6 prevents this neurotoxic side effect." }]
  },
  "osa-management": {
    title: "Obstructive Sleep Apnea (OSA)",
    cellular: { title: "Upper Airway Collapse", content: "Repetitive upper airway collapse during sleep causes intermittent hypoxia and sleep fragmentation. Increased sympathetic nervous system activity leads to HTN, cardiac arrhythmias, and metabolic syndrome. Apnea-Hypopnea Index (AHI) >5 events/hour is diagnostic." },
    signs: {
      left: ["Loud Snoring", "Witnessed Apneic Episodes", "Excessive Daytime Sleepiness (Epworth Scale)", "Morning Headache"],
      right: ["Nocturia", "Obesity (BMI >30)", "Large Neck Circumference (>17in men, >16in women)", "Cognitive Impairment/Mood Changes"]
    },
    medications: [
      { name: "CPAP", type: "Positive Airway Pressure", action: "Pneumatic splint keeps airway open during sleep", sideEffects: "Nasal dryness, mask discomfort, claustrophobia", contra: "Inability to maintain mask seal", pearl: "First-line treatment for moderate-severe OSA. Compliance is the biggest challenge - proper mask fitting essential." },
      { name: "Modafinil", type: "Wakefulness-Promoting Agent", action: "Reduces residual daytime sleepiness despite CPAP use", sideEffects: "Headache, nausea, insomnia", contra: "Cardiac arrhythmias", pearl: "Adjunct therapy only - does NOT treat the underlying apnea. Used when CPAP alone doesn't resolve daytime sleepiness." }
    ],
    pearls: ["Weight loss can be curative in obese patients", "Polysomnography (sleep study) is the gold standard for diagnosis", "CPAP compliance is the key challenge - educate on proper use", "Lateral sleeping position reduces airway collapse", "Avoid alcohol and sedatives before bed (relax airway muscles)"],
    quiz: [{ question: "What is the gold standard treatment for moderate-severe OSA?", options: ["Surgery (UPPP)", "Weight loss alone", "CPAP (Continuous Positive Airway Pressure)", "Oral appliance therapy"], correct: 2, rationale: "CPAP is the gold standard first-line treatment for moderate-severe OSA. It acts as a pneumatic splint to keep the upper airway open during sleep, preventing apneic episodes and improving oxygenation." }]
  },
  "peptic-ulcer": {
    title: "Peptic Ulcer Disease",
    cellular: { title: "Mucosal Breakdown", content: "Break in gastric or duodenal mucosa extending through the muscularis mucosae. Main causes: H. pylori infection (disrupts mucosal defense) and NSAIDs (inhibit protective prostaglandin production). Gastric ulcers cause pain WITH eating. Duodenal ulcers cause pain 2-3 hours AFTER eating, relieved by food." },
    signs: {
      left: ["Epigastric Pain (burning/gnawing)", "Nausea and Bloating", "Gastric: Pain Worsens WITH Eating", "Duodenal: Pain 2-3h After Eating, Relieved by Food"],
      right: ["Hemorrhage (melena, hematemesis)", "Perforation (sudden severe pain, rigid abdomen)", "Gastric Outlet Obstruction (vomiting)", "Coffee-Ground Emesis (upper GI bleed)"]
    },
    medications: [
      { name: "Omeprazole", type: "Proton Pump Inhibitor", action: "Suppresses gastric acid secretion by blocking H+/K+ ATPase", sideEffects: "C. diff risk, hypomagnesemia, bone fractures (long-term)", contra: "Known hypersensitivity", pearl: "First-line acid suppression. Take 30 minutes before meals for maximum effectiveness." },
      { name: "Triple Therapy", type: "H. pylori Eradication", action: "PPI + Amoxicillin + Clarithromycin for 14 days", sideEffects: "GI upset, metallic taste", contra: "Macrolide allergy", pearl: "Must complete full course. Sucralfate (mucosal protectant) can be added - give on empty stomach, separate from other meds by 2 hours." }
    ],
    pearls: ["EGD (endoscopy) for definitive diagnosis and biopsy", "Discontinue NSAIDs immediately", "H. pylori testing: urea breath test or stool antigen", "Coffee-ground emesis = upper GI bleeding (report immediately)", "NPO if perforation suspected - prepare for surgical consultation"],
    quiz: [{ question: "How does the pain pattern differ between gastric and duodenal ulcers?", options: ["No difference in pain patterns", "Gastric: pain with eating; Duodenal: pain 2-3h after eating, relieved by food", "Gastric: right-sided pain; Duodenal: left-sided pain", "Both cause pain only at night"], correct: 1, rationale: "Gastric ulcers cause pain WITH eating because food stimulates acid production that irritates the ulcer. Duodenal ulcers cause pain 2-3 hours after eating when acid enters the duodenum, and food RELIEVES pain by buffering the acid." }]
  },
  "ulcerative-colitis": {
    title: "Ulcerative Colitis",
    cellular: { title: "Chronic Colonic Inflammation", content: "Chronic inflammatory bowel disease affecting ONLY the colon and rectum. Inflammation is continuous (not skip lesions) starting at the rectum and extending proximally. Involves mucosa and submucosa only (unlike Crohn's which is transmural). Significant risk of toxic megacolon and colorectal cancer." },
    signs: {
      left: ["Bloody Diarrhea (10-20x/day)", "Urgency and Tenesmus", "LLQ Cramping", "Weight Loss"],
      right: ["Extraintestinal: Arthritis, Uveitis", "Erythema Nodosum", "Primary Sclerosing Cholangitis", "Toxic Megacolon (distension, fever, tachycardia)"]
    },
    medications: [
      { name: "Mesalamine (5-ASA)", type: "Aminosalicylate", action: "Topical anti-inflammatory for colonic mucosa", sideEffects: "Headache, nausea, nephrotoxicity (rare)", contra: "Salicylate allergy", pearl: "First-line for mild-moderate UC. Available as oral, enema, or suppository for targeted delivery." },
      { name: "Infliximab", type: "Anti-TNF Biologic", action: "Blocks TNF-alpha to reduce severe inflammation", sideEffects: "Infection risk, infusion reactions, reactivation TB", contra: "Active infection, heart failure", pearl: "Reserved for moderate-severe UC refractory to conventional therapy. Screen for latent TB before starting. Prednisone used for acute flares, Azathioprine for maintenance." }
    ],
    pearls: ["Low-fiber diet during active flares to reduce bowel stimulation", "Colonoscopy surveillance for cancer starting 8 years after diagnosis", "Total colectomy is CURATIVE (unlike Crohn's)", "Monitor for toxic megacolon: avoid opioids and anticholinergics (decrease motility)"],
    quiz: [{ question: "What is the key difference between Ulcerative Colitis and Crohn's disease?", options: ["UC affects the entire GI tract, Crohn's only affects the colon", "UC is continuous mucosal inflammation of colon only; Crohn's is transmural skip lesions anywhere in GI tract", "UC causes fistulas; Crohn's does not", "There is no clinical difference"], correct: 1, rationale: "UC affects only the colon/rectum with continuous mucosal/submucosal inflammation. Crohn's can affect ANY part of the GI tract (mouth to anus) with transmural (full-thickness) inflammation in skip lesions. UC is curable with colectomy; Crohn's is not." }]
  },
  "cholecystectomy": {
    title: "Cholecystectomy Care",
    cellular: { title: "Gallbladder Removal", content: "Surgical removal of the gallbladder, most commonly for symptomatic cholelithiasis (gallstones) or acute cholecystitis. Laparoscopic approach is standard (4 small incisions). Bile duct injury is the most feared surgical complication. Post-cholecystectomy, bile flows directly from liver to duodenum." },
    signs: {
      left: ["Pre-op: RUQ Pain (especially after fatty meals)", "Positive Murphy's Sign", "Nausea/Vomiting", "Jaundice (if CBD obstruction)"],
      right: ["Post-op: Bile Leak (pain, fever, jaundice)", "Shoulder Pain (referred from CO2 insufflation)", "T-tube Drainage (if placed)", "Clay-Colored Stools (bile duct obstruction)"]
    },
    medications: [
      { name: "Ketorolac", type: "NSAID Analgesic", action: "Post-operative pain management", sideEffects: "GI bleeding, renal impairment", contra: "Renal insufficiency, active GI bleed", pearl: "Preferred over opioids for post-cholecystectomy pain. Limit use to 5 days maximum." },
      { name: "Ondansetron", type: "5-HT3 Antagonist", action: "Prevents post-operative nausea/vomiting", sideEffects: "Headache, constipation, QT prolongation", contra: "Severe hepatic impairment", pearl: "Common post-anesthesia. Ursodiol may be prescribed if residual CBD stones present." }
    ],
    pearls: ["Low-fat diet initially as body adjusts to continuous bile flow", "Report clay-colored stools immediately (indicates bile duct obstruction)", "T-tube care: keep below gallbladder level, measure and document drainage", "Clamp T-tube before meals as ordered to aid fat digestion"],
    quiz: [{ question: "What does a positive Murphy's sign indicate?", options: ["Appendicitis", "Acute cholecystitis (gallbladder inflammation)", "Pancreatitis", "Hepatitis"], correct: 1, rationale: "Murphy's sign is elicited by palpating the RUQ while the patient inhales deeply. Inspiratory arrest (patient stops breathing in due to pain) when the inflamed gallbladder descends and contacts the examiner's hand is a positive Murphy's sign, indicating acute cholecystitis." }]
  },
  "ercp-egd": {
    title: "ERCP & EGD Procedures",
    cellular: { title: "Endoscopic GI Procedures", content: "EGD (Esophagogastroduodenoscopy) visualizes the upper GI tract for diagnosis and treatment. ERCP (Endoscopic Retrograde Cholangiopancreatography) accesses biliary and pancreatic ducts for stone removal and stenting. Both require conscious sedation and careful post-procedure monitoring." },
    signs: {
      left: ["EGD Indications: Dysphagia, GERD, GI Bleeding, Biopsy", "ERCP Indications: CBD Stones, Strictures, Cholangitis", "Sedation Assessment (level of consciousness)", "Vital Sign Monitoring"],
      right: ["Perforation Signs (pain, fever, subcutaneous emphysema)", "Post-ERCP Pancreatitis (epigastric pain radiating to back)", "Hemorrhage (hematemesis, melena)", "Aspiration Risk"]
    },
    medications: [
      { name: "Midazolam + Fentanyl", type: "Conscious Sedation", action: "Anxiolysis and analgesia for procedure tolerance", sideEffects: "Respiratory depression, hypotension", contra: "Severe respiratory compromise", pearl: "Monitor respiratory status closely. Flumazenil reverses midazolam; Naloxone reverses fentanyl." },
      { name: "Glucagon", type: "Smooth Muscle Relaxant", action: "Relaxes GI smooth muscle during endoscopic procedures", sideEffects: "Nausea, hyperglycemia", contra: "Pheochromocytoma", pearl: "Simethicone may be used to reduce gas and improve visualization during the procedure." }
    ],
    pearls: ["NPO for 6-8 hours before procedure", "Check gag reflex BEFORE allowing oral intake post-EGD", "Monitor for pancreatitis after ERCP (check amylase/lipase)", "ERCP carries 5-10% risk of post-procedure pancreatitis"],
    quiz: [{ question: "What is the priority assessment after EGD before allowing the patient to eat or drink?", options: ["Check for abdominal distension", "Verify return of gag reflex", "Assess pain level", "Check blood glucose"], correct: 1, rationale: "The gag reflex must return before allowing oral intake after EGD. The throat is anesthetized during the procedure, and absent gag reflex increases aspiration risk. Typically returns within 1-2 hours." }]
  },
  "dumping-syndrome": {
    title: "Dumping Syndrome",
    cellular: { title: "Rapid Gastric Emptying", content: "Rapid gastric emptying after gastric surgery (gastrectomy, gastric bypass, Billroth procedures). Hyperosmolar chyme enters the small intestine causing fluid shifts from plasma into bowel lumen. Early dumping (15-30 min after eating): GI and vasomotor symptoms from fluid shifts. Late dumping (1-3 hours): reactive hypoglycemia from rapid glucose absorption triggering excess insulin." },
    signs: {
      left: ["Early (15-30 min): Nausea, Cramping, Diarrhea", "Diaphoresis & Tachycardia", "Dizziness & Flushing", "Abdominal Bloating"],
      right: ["Late (1-3 hrs): Hypoglycemia", "Shakiness & Confusion", "Weakness & Fatigue", "Hunger and Diaphoresis"]
    },
    medications: [
      { name: "Octreotide", type: "Somatostatin Analog", action: "Slows gastric emptying and reduces insulin release", sideEffects: "Gallstones, steatorrhea, injection site pain", contra: "Hypersensitivity", pearl: "Used for refractory dumping syndrome not controlled by dietary modifications. Given as subcutaneous injection." },
      { name: "Acarbose", type: "Alpha-Glucosidase Inhibitor", action: "Slows carbohydrate absorption to prevent late dumping hypoglycemia", sideEffects: "Flatulence, diarrhea, abdominal pain", contra: "Inflammatory bowel disease", pearl: "Specifically targets late dumping by preventing rapid glucose absorption and subsequent reactive hypoglycemia." }
    ],
    pearls: ["Small frequent meals (6 per day) instead of 3 large meals", "Avoid simple sugars and fluids WITH meals (increases osmotic load)", "Lie down for 30 minutes after eating to slow gastric transit", "High protein, high fat, LOW carbohydrate diet", "Separate liquids from solids by at least 30 minutes"],
    quiz: [{ question: "Why should patients with dumping syndrome avoid drinking fluids with meals?", options: ["Fluids dilute digestive enzymes", "Fluids increase the osmotic load entering the small intestine, worsening symptoms", "Fluids cause acid reflux", "Fluids reduce nutrient absorption"], correct: 1, rationale: "Drinking fluids with meals increases the volume and osmolality of contents entering the small intestine rapidly, worsening the fluid shift from plasma to bowel lumen that causes dumping syndrome symptoms. Separating liquids from solids by 30 minutes reduces this effect." }]
  },
  "ckd-management": {
    title: "Chronic Kidney Disease (CKD) Management",
    cellular: { title: "Progressive Nephron Loss", content: "Progressive loss of nephron function over months to years. GFR staging: Stage 1 (>90, damage present), Stage 2 (60-89), Stage 3 (30-59), Stage 4 (15-29), Stage 5 (<15, ESRD requiring dialysis/transplant). Most common causes: Diabetes mellitus and Hypertension. Consequences: uremia, electrolyte imbalances, anemia (decreased EPO production), renal osteodystrophy (decreased Vitamin D activation)." },
    signs: {
      left: ["Fatigue & Weakness", "Peripheral Edema", "Hypertension", "Uremic Frost (late finding)"],
      right: ["Pruritus", "Anemia (pallor)", "Hyperkalemia", "Metabolic Acidosis, Oliguria (late), Asterixis"]
    },
    medications: [
      { name: "ACE Inhibitors (Lisinopril)", type: "Renoprotective Antihypertensive", action: "Reduces intraglomerular pressure, slows CKD progression", sideEffects: "Hyperkalemia, dry cough, angioedema", contra: "Bilateral renal artery stenosis, pregnancy", pearl: "First-line for CKD with proteinuria. Monitor potassium and creatinine closely after initiation." },
      { name: "Sevelamer", type: "Phosphate Binder", action: "Binds dietary phosphate in GI tract to prevent hyperphosphatemia", sideEffects: "GI upset, constipation", contra: "Bowel obstruction", pearl: "Must be taken WITH meals to bind phosphorus in food. Erythropoietin given for renal anemia. Calcitriol (active Vit D) and Sodium bicarbonate (for acidosis) also part of management." }
    ],
    pearls: ["Renal diet: low potassium, low phosphorus, low sodium, protein restriction varies by stage", "Avoid NSAIDs (reduce renal blood flow) and contrast dye (nephrotoxic)", "Aggressive diabetes and HTN management slows progression", "Monitor GFR trend over time - rate of decline guides treatment decisions"],
    quiz: [{ question: "What are the two most common causes of CKD?", options: ["Glomerulonephritis and polycystic kidney disease", "Diabetes mellitus and Hypertension", "UTIs and kidney stones", "Lupus and amyloidosis"], correct: 1, rationale: "Diabetes mellitus (diabetic nephropathy) and hypertension (hypertensive nephrosclerosis) account for approximately 70% of all CKD cases. Aggressive management of blood glucose and blood pressure is essential to slow CKD progression." }]
  },
  "rhabdomyolysis": {
    title: "Rhabdomyolysis",
    cellular: { title: "Skeletal Muscle Breakdown", content: "Skeletal muscle breakdown releases intracellular contents (myoglobin, CK, potassium, phosphate) into the bloodstream. Myoglobin precipitates in renal tubules, especially in acidic urine, causing acute tubular necrosis (ATN) and AKI. Common causes: crush injury, prolonged immobilization, statins, extreme exercise, seizures, heat stroke, compartment syndrome." },
    signs: {
      left: ["Muscle Pain & Weakness", "Dark Brown/Tea-Colored Urine (myoglobinuria)", "Elevated CK (>5x normal, often >10,000)", "Swelling of Affected Muscle Groups"],
      right: ["Hyperkalemia (cardiac risk)", "Hyperphosphatemia", "Hypocalcemia (calcium deposits in damaged muscle)", "Elevated Creatinine (AKI)"]
    },
    medications: [
      { name: "Aggressive IV Normal Saline", type: "Volume Resuscitation", action: "Dilutes myoglobin, maintains renal perfusion, promotes diuresis", sideEffects: "Fluid overload, pulmonary edema", contra: "Oliguric renal failure (adjust rate)", pearl: "Target urine output 200-300 mL/hr. May require up to 1.5 L/hr initially. THE most critical intervention." },
      { name: "Sodium Bicarbonate", type: "Urinary Alkalinizer", action: "Alkalinizes urine to prevent myoglobin precipitation in renal tubules", sideEffects: "Metabolic alkalosis, hypokalemia", contra: "Severe alkalosis", pearl: "Target urine pH >6.5. Calcium gluconate given ONLY for symptomatic hyperkalemia (ECG changes). Mannitol may be used as osmotic diuretic." }
    ],
    pearls: ["CK peaks at 24-72 hours after injury", "Monitor for compartment syndrome (5 P's: Pain, Pallor, Pulselessness, Paresthesia, Paralysis)", "Aggressive fluid resuscitation is the KEY intervention", "Monitor potassium closely - hyperkalemia can cause fatal arrhythmias", "Avoid calcium supplementation unless symptomatic hyperkalemia (calcium may deposit in damaged muscle)"],
    quiz: [{ question: "Why is aggressive IV fluid resuscitation the priority treatment in rhabdomyolysis?", options: ["To replace blood loss", "To dilute myoglobin in the blood and flush it through kidneys before it causes tubular damage", "To correct dehydration from vomiting", "To reduce muscle pain"], correct: 1, rationale: "Aggressive IV NS dilutes circulating myoglobin and maintains high urine output to flush myoglobin through the renal tubules before it can precipitate and cause acute tubular necrosis. This is the single most important intervention to prevent AKI." }]
  },
  "av-fistula": {
    title: "AV Fistula Care",
    cellular: { title: "Hemodialysis Vascular Access", content: "Surgically created connection between artery and vein (usually radial artery to cephalic vein - radiocephalic fistula) for hemodialysis access. Takes 2-3 months to mature (arterialization of vein). Preferred permanent access due to lowest infection and thrombosis rates compared to grafts or catheters." },
    signs: {
      left: ["Thrill Present (palpable buzzing vibration - GOOD)", "Bruit Present (auscultated whooshing sound - GOOD)", "Adequate Blood Flow for Dialysis", "Mature Fistula (visible, palpable arterialized vein)"],
      right: ["Absent Thrill/Bruit = Thrombosis/Stenosis", "Steal Syndrome (hand pain, pallor, coolness)", "Aneurysm Formation", "Signs of Infection (redness, warmth, drainage)"]
    },
    medications: [
      { name: "Heparin", type: "Anticoagulant", action: "Prevents clotting in dialysis circuit during treatment", sideEffects: "Bleeding, HIT", contra: "Active hemorrhage", pearl: "Used during each dialysis session. Monitor for signs of bleeding post-dialysis." },
      { name: "Alteplase", type: "Thrombolytic", action: "Dissolves clots in thrombosed AV fistula", sideEffects: "Hemorrhage", contra: "Recent surgery, active bleeding", pearl: "Used for acute fistula thrombosis to restore patency. May also require surgical thrombectomy." }
    ],
    pearls: ["NO blood pressure, IV starts, or blood draws from the fistula arm", "Assess thrill (palpate) and bruit (auscultate) every shift", "Elevate arm after surgical creation to reduce swelling", "Report ABSENCE of thrill immediately - indicates clotting", "Avoid tight clothing, watches, or jewelry on fistula arm"],
    quiz: [{ question: "What finding indicates the AV fistula is functioning properly?", options: ["Absence of pulses distal to the fistula", "Presence of a palpable thrill and audible bruit", "Cool temperature of the fistula arm", "Edema around the fistula site"], correct: 1, rationale: "A palpable thrill (buzzing vibration felt on palpation) and audible bruit (whooshing sound heard with stethoscope) indicate adequate blood flow through the AV fistula. Absence of these findings suggests thrombosis or stenosis and must be reported immediately." }]
  },
  "dialysis-steal": {
    title: "Dialysis Steal Syndrome",
    cellular: { title: "Vascular Steal Phenomenon", content: "The AV fistula diverts arterial blood away from the hand and fingers, 'stealing' blood flow from the distal extremity. Low-resistance pathway through the fistula preferentially shunts blood away from high-resistance distal vascular bed. Can progress to tissue necrosis if severe. More common in diabetic patients and those with peripheral vascular disease." },
    signs: {
      left: ["Pain in Hand/Fingers During and After Dialysis", "Coolness of Affected Hand", "Pallor of Fingers", "Numbness and Tingling"],
      right: ["Weakness of Hand Grip", "Poor Capillary Refill (<3 seconds)", "Absent/Diminished Radial Pulse Distal to Fistula", "Tissue Loss/Ulceration (severe cases)"]
    },
    medications: [
      { name: "No Pharmacological Treatment", type: "Surgical Management", action: "Requires surgical revision - banding, DRIL procedure, or ligation if severe", sideEffects: "N/A", contra: "N/A", pearl: "Medical management is supportive only. Definitive treatment is surgical revision of the fistula to restore distal perfusion." }
    ],
    pearls: ["Assess distal perfusion frequently: capillary refill, pulse, sensation, temperature", "Compare findings between both hands for baseline", "Report progressive symptoms immediately to provider", "May require access revision or relocation to different site", "Keep the affected extremity warm to promote circulation"],
    quiz: [{ question: "What is the most important nursing assessment for a patient with dialysis access?", options: ["Measuring blood pressure in the fistula arm", "Assessing distal perfusion (pulses, capillary refill, sensation) and thrill/bruit", "Checking blood glucose levels", "Monitoring urine output"], correct: 1, rationale: "The most important assessments are checking for thrill and bruit (fistula patency) and assessing distal perfusion (pulses, capillary refill, temperature, sensation) to detect steal syndrome or thrombosis early. Never take BP in the fistula arm." }]
  },
  "adrenal-insufficiency": {
    title: "Adrenal Insufficiency (Addison's Disease)",
    cellular: { title: "Adrenal Gland Failure", content: "Primary adrenal insufficiency (Addison's disease) results from destruction of the adrenal cortex (autoimmune most common cause). Produces inadequate cortisol and aldosterone. Cortisol deficiency causes hypoglycemia, fatigue, and inability to mount a stress response. Aldosterone deficiency causes sodium wasting, hyperkalemia, hypovolemia, and hypotension. ACTH is elevated due to loss of negative feedback." },
    signs: {
      left: ["Hyperpigmentation (ACTH stimulates melanocytes)", "Fatigue & Weakness", "Weight Loss", "Hypotension (especially orthostatic)"],
      right: ["Salt Craving", "Hypoglycemia", "Hyperkalemia & Hyponatremia", "Nausea, Vomiting, Abdominal Pain"]
    },
    medications: [
      { name: "Hydrocortisone", type: "Glucocorticoid Replacement", action: "Replaces deficient cortisol for metabolic and stress response", sideEffects: "Cushing's if over-replaced, hyperglycemia", contra: "Systemic fungal infections", pearl: "Stress dosing: DOUBLE or TRIPLE dose during illness, injury, or surgery. Addisonian crisis = IV hydrocortisone 100mg STAT + NS bolus." },
      { name: "Fludrocortisone", type: "Mineralocorticoid Replacement", action: "Replaces deficient aldosterone for sodium/water retention", sideEffects: "Hypertension, edema, hypokalemia", contra: "Heart failure", pearl: "Addresses sodium wasting and hyperkalemia. Monitor BP and electrolytes regularly." }
    ],
    pearls: ["Addisonian crisis is LIFE-THREATENING: N/V, severe hypotension, shock - treat with IV hydrocortisone STAT and aggressive NS bolus", "Patient should wear medical alert bracelet at all times", "DOUBLE dose of hydrocortisone during minor illness, TRIPLE for major stress/surgery", "NEVER stop corticosteroids abruptly - must taper to prevent crisis"],
    quiz: [{ question: "What typically triggers an Addisonian (adrenal) crisis?", options: ["Eating too much sodium", "Physiologic stress (infection, surgery, trauma) in a patient with inadequate cortisol replacement", "Taking too much hydrocortisone", "Excessive exercise"], correct: 1, rationale: "Addisonian crisis is triggered when the body faces physiologic stress (infection, surgery, trauma, illness) but cannot produce adequate cortisol to mount a stress response. Patients must increase (stress dose) their hydrocortisone during illness to prevent crisis." }]
  },
  "thyroidectomy": {
    title: "Thyroidectomy Post-Op Care",
    cellular: { title: "Thyroid Gland Removal", content: "Surgical removal of thyroid gland for thyroid cancer, Graves' disease (refractory to medical therapy), or large goiter causing compressive symptoms. Key surgical risks: damage to recurrent laryngeal nerve (hoarseness/voice changes), inadvertent removal/damage of parathyroid glands (hypocalcemia), and hemorrhage/hematoma causing airway compromise." },
    signs: {
      left: ["Hoarseness/Voice Changes (recurrent laryngeal nerve injury)", "Trousseau Sign (carpopedal spasm with BP cuff)", "Chvostek Sign (facial twitching when tapping)", "Dysphagia"],
      right: ["Neck Swelling/Hematoma (AIRWAY EMERGENCY)", "Stridor or Respiratory Distress", "Tingling/Numbness (perioral, fingers - hypocalcemia)", "Laryngospasm"]
    },
    medications: [
      { name: "Levothyroxine", type: "Thyroid Hormone Replacement", action: "Lifelong replacement of T4 after total thyroidectomy", sideEffects: "Tachycardia, weight loss (if over-replaced)", contra: "Untreated adrenal insufficiency", pearl: "Take on empty stomach, 30-60 min before breakfast. Monitor TSH levels regularly to adjust dosing." },
      { name: "Calcium Gluconate IV", type: "Emergency Calcium Replacement", action: "Treats symptomatic hypocalcemia from parathyroid damage", sideEffects: "Bradycardia if given too fast", contra: "Digoxin use (use with extreme caution)", pearl: "Keep at bedside post-thyroidectomy. Oral Calcium + Vitamin D prescribed if parathyroids damaged. Tracheostomy set also kept at bedside." }
    ],
    pearls: ["Support neck when repositioning (avoid hyperextension of surgical site)", "Semi-Fowler's position to reduce edema and promote drainage", "Check POSTERIOR dressing - blood pools behind the neck", "Calcium gluconate AND tracheostomy set at bedside", "Assess voice quality every 1-2 hours (hoarseness may indicate nerve damage)", "Report ANY breathing difficulty, stridor, or neck swelling IMMEDIATELY"],
    quiz: [{ question: "What is the priority assessment in the first 24 hours after thyroidectomy?", options: ["Thyroid hormone levels", "Airway patency and signs of hemorrhage/hematoma", "Wound cosmetic appearance", "Bowel sounds"], correct: 1, rationale: "The priority is monitoring airway patency because a neck hematoma can rapidly compress the trachea causing airway obstruction. Assess for neck swelling, stridor, and respiratory distress. Also monitor for hypocalcemia (parathyroid damage) with Trousseau and Chvostek signs." }]
  },
  "malignant-hyperthermia": {
    title: "Malignant Hyperthermia",
    cellular: { title: "Pharmacogenetic Emergency", content: "Life-threatening pharmacogenetic reaction triggered by volatile anesthetics (halothane, sevoflurane, desflurane) or succinylcholine. Genetic defect in ryanodine receptor (RYR1 gene) on skeletal muscle sarcoplasmic reticulum causes uncontrolled calcium release, leading to sustained muscle contraction, hypermetabolism, rapidly rising temperature (>104°F/40°C), rhabdomyolysis, metabolic acidosis, hyperkalemia, and death if untreated." },
    signs: {
      left: ["Unexplained Tachycardia (earliest sign)", "Rising End-Tidal CO2 (EtCO2)", "Masseter Muscle Rigidity (jaw - first muscle sign)", "Rapidly Rising Temperature"],
      right: ["Generalized Muscle Rigidity", "Dark Urine (myoglobinuria)", "Metabolic Acidosis", "Hyperkalemia, DIC (late signs)"]
    },
    medications: [
      { name: "Dantrolene Sodium", type: "Skeletal Muscle Relaxant", action: "ONLY specific treatment - blocks calcium release from sarcoplasmic reticulum", sideEffects: "Muscle weakness, hepatotoxicity", contra: "None in emergency (life-saving)", pearl: "Dose: 2.5 mg/kg IV, repeat as needed. Must be available WHEREVER anesthesia is administered. Requires reconstitution - assign dedicated person." },
      { name: "Iced Normal Saline", type: "Cooling Measure", action: "Reduces core body temperature", sideEffects: "Hypothermia if over-cooled", contra: "None in emergency", pearl: "Also apply ice packs to axilla, groin, and neck. Sodium bicarbonate for acidosis. Insulin + glucose for hyperkalemia. Target temperature <38.5°C." }
    ],
    pearls: ["STOP triggering anesthetic agent IMMEDIATELY and hyperventilate with 100% O2", "Call for help - this requires multiple providers simultaneously", "Dantrolene MUST be stocked wherever general anesthesia is administered", "Genetic testing available: caffeine-halothane contracture test", "FAMILY HISTORY is critical - autosomal dominant inheritance", "Cool patient aggressively: iced IV fluids, ice packs to axilla/groin/neck"],
    quiz: [{ question: "What is the first-line medication for malignant hyperthermia?", options: ["Acetaminophen for fever", "Dantrolene sodium IV", "Epinephrine", "Succinylcholine"], correct: 1, rationale: "Dantrolene sodium is the ONLY specific treatment for malignant hyperthermia. It works by blocking the abnormal calcium release from the sarcoplasmic reticulum that drives the hypermetabolic crisis. It must be given immediately at 2.5 mg/kg IV and repeated as needed." }]
  },
  "anaphylaxis": {
    title: "Anaphylaxis Management",
    cellular: { title: "Severe Type I Hypersensitivity", content: "Severe IgE-mediated Type I hypersensitivity reaction. Prior sensitization produces IgE antibodies that bind to mast cells and basophils. Re-exposure triggers massive degranulation releasing histamine, leukotrienes, and prostaglandins. This causes bronchospasm, systemic vasodilation, increased vascular permeability, and cardiovascular collapse within minutes." },
    signs: {
      left: ["Urticaria (hives) & Angioedema", "Respiratory Distress (wheezing, stridor, dyspnea)", "Hypotension & Tachycardia", "Flushing and Warmth"],
      right: ["GI Symptoms (nausea, vomiting, diarrhea)", "Anxiety & Sense of Impending Doom", "Loss of Consciousness", "Cardiac Arrest (if untreated)"]
    },
    medications: [
      { name: "Epinephrine IM", type: "Alpha/Beta Agonist", action: "Reverses bronchospasm, vasoconstriction, reduces vascular permeability", sideEffects: "Tachycardia, hypertension, tremor", contra: "NONE in anaphylaxis (life-saving)", pearl: "FIRST and MOST IMPORTANT drug. Give IM in vastus lateralis (lateral thigh). Can repeat every 5-15 minutes. Do NOT delay for other medications." },
      { name: "Diphenhydramine + Ranitidine", type: "H1 + H2 Blockers", action: "Blocks histamine receptors to reduce allergic response", sideEffects: "Drowsiness (H1), headache (H2)", contra: "Not a substitute for epinephrine", pearl: "Adjunct therapy AFTER epinephrine. Albuterol nebulizer for persistent bronchospasm. IV fluids (1-2L NS bolus) for hypotension." }
    ],
    pearls: ["ABCs first - secure airway, support breathing and circulation", "Epinephrine is the ONLY first-line treatment - do NOT delay for antihistamines", "Biphasic reaction possible: monitor patient for 4-6 hours after initial resolution", "EpiPen teaching: remove safety cap, press firmly into outer thigh, hold 10 seconds", "Identify and strictly avoid triggers going forward", "Patient should wear medical alert bracelet and carry EpiPen at all times"],
    quiz: [{ question: "What is the correct route and site for epinephrine administration in anaphylaxis?", options: ["IV push into antecubital vein", "Subcutaneous in the abdomen", "IM in the vastus lateralis (lateral thigh)", "Sublingual under the tongue"], correct: 2, rationale: "Epinephrine is given intramuscularly (IM) in the vastus lateralis (outer thigh) for anaphylaxis. The thigh has excellent blood supply for rapid absorption. IM is preferred over subcutaneous (faster absorption) and IV (reserved for refractory cases in monitored settings)." }]
  },
  "factor-xa-inhibitors": {
    title: "Factor Xa Inhibitors (DOACs)",
    cellular: { title: "Direct Oral Anticoagulants", content: "Direct oral anticoagulants (DOACs) selectively inhibit Factor Xa in the coagulation cascade, preventing conversion of prothrombin to thrombin and subsequent fibrin clot formation. Unlike warfarin, they have predictable pharmacokinetics requiring no routine INR monitoring. Examples: Rivaroxaban (Xarelto), Apixaban (Eliquis), Edoxaban (Savaysa)." },
    signs: {
      left: ["Bleeding: Gingival, Epistaxis, Ecchymosis", "Hematuria", "Melena or GI Bleeding", "No Routine Lab Monitoring Needed"],
      right: ["Rivaroxaban: MUST Take With Food (absorption)", "Shorter Half-Life Than Warfarin", "Renal Clearance (dose adjust for kidney function)", "No Dietary Restrictions (unlike Warfarin/Vit K)"]
    },
    medications: [
      { name: "Andexanet Alfa (Andexxa)", type: "Specific Reversal Agent", action: "Recombinant modified Factor Xa that binds and sequesters Factor Xa inhibitors", sideEffects: "Thrombotic events, infusion reactions", contra: "None in life-threatening bleeding", pearl: "Specific reversal agent for Apixaban and Rivaroxaban. Very expensive. Used for life-threatening or uncontrolled bleeding." },
      { name: "Prothrombin Complex Concentrate (PCC)", type: "Alternative Reversal", action: "Provides clotting factors to overcome anticoagulant effect", sideEffects: "Thromboembolism risk", contra: "DIC, HIT", pearl: "Alternative reversal when Andexanet alfa unavailable. Contains Factors II, VII, IX, X. More widely available than Andexanet alfa." }
    ],
    pearls: ["No dietary restrictions needed (unlike warfarin which requires consistent Vitamin K intake)", "Renal dose adjustment required, especially with declining GFR - monitor kidney function", "Shorter half-life than warfarin means missed doses lead to rapid loss of anticoagulant protection", "Avoid concurrent use with strong CYP3A4 inhibitors (ketoconazole, ritonavir)", "Assess for bleeding clinically - do NOT monitor with PT/INR (not reliable for DOACs)"],
    quiz: [{ question: "What is the key advantage of Factor Xa inhibitors over Warfarin?", options: ["They are cheaper", "No routine lab monitoring (INR) needed and no dietary restrictions", "They work faster in emergencies", "They have no bleeding risk"], correct: 1, rationale: "Factor Xa inhibitors have predictable pharmacokinetics that eliminate the need for routine INR monitoring and have no dietary restrictions (no Vitamin K concerns). Warfarin requires frequent INR checks, dose adjustments, and consistent Vitamin K intake, creating significant patient burden." }]
  },
  "varicella": {
    title: "Varicella (Chickenpox)",
    cellular: { title: "Varicella-Zoster Virus (VZV)", content: "Varicella is caused by the Varicella-Zoster Virus (VZV), a member of the herpesvirus family. The virus enters through the respiratory tract and conjunctivae, replicates in regional lymph nodes, and spreads via primary viremia to the liver and spleen. Secondary viremia seeds the skin, producing the characteristic vesicular rash. The virus then becomes latent in dorsal root ganglia and can reactivate later in life as herpes zoster (shingles). Transmission occurs via airborne droplets and direct contact with vesicular fluid. The incubation period is 10-21 days, and the patient is contagious from 1-2 days before rash onset until all lesions have crusted over." },
    signs: {
      left: ["Vesicular rash in successive 'crops' at different stages (macules, papules, vesicles, crusts)", "Low-grade fever preceding rash onset", "Intense pruritus (itching) of lesions", "Rash starts on trunk and spreads to face and extremities (centripetal distribution)", "Malaise, irritability, and decreased appetite"],
      right: ["Lesions appear in 'crops' — all stages present simultaneously", "Airborne AND Contact Precautions required (negative pressure room)", "Highly contagious: contagious 1-2 days before rash until ALL lesions crusted", "Immunocompromised children at risk for severe/disseminated disease", "Complications: Secondary bacterial skin infection, pneumonia, encephalitis"]
    },
    medications: [
      { name: "Acyclovir (Zovirax)", type: "Antiviral (Nucleoside Analog)", action: "Inhibits viral DNA polymerase, preventing VZV replication and reducing severity and duration of illness", sideEffects: "Nausea, vomiting, diarrhea, headache, nephrotoxicity (ensure adequate hydration)", contra: "Hypersensitivity to acyclovir; use cautiously in renal impairment", pearl: "Most effective when started within 24 hours of rash onset. Recommended for adolescents, adults, and immunocompromised patients. Ensure adequate hydration to prevent crystalluria and nephrotoxicity." },
      { name: "Calamine Lotion", type: "Topical Antipruritic", action: "Provides cooling effect on skin to relieve itching and discomfort from vesicular lesions", sideEffects: "Skin dryness, mild irritation at application site", contra: "Avoid applying to open or weeping lesions", pearl: "Apply to intact skin only for itch relief. Keep child's nails trimmed short to prevent scratching and secondary bacterial infection. Oatmeal baths also provide symptomatic relief. Avoid topical diphenhydramine (risk of toxicity)." }
    ],
    pearls: ["NEVER give aspirin to children with varicella — risk of Reye's syndrome (acute hepatic encephalopathy). Use acetaminophen for fever.", "Isolate patient until ALL lesions have crusted over (typically 5-7 days after rash onset). Airborne + Contact precautions in hospital.", "Varicella vaccine (Varivax) is a live attenuated vaccine given at 12-15 months and 4-6 years. Contraindicated in immunocompromised and pregnant patients.", "Exposed susceptible contacts should receive varicella vaccine within 72 hours or VZIG (varicella-zoster immune globulin) if immunocompromised."],
    quiz: [{ question: "What type of isolation precautions are required for a hospitalized child with varicella?", options: ["Standard precautions only", "Contact precautions only", "Airborne AND Contact precautions (negative pressure room)", "Droplet precautions only"], correct: 2, rationale: "Varicella requires BOTH airborne AND contact precautions. The virus is transmitted via airborne droplet nuclei (requiring a negative pressure room with N95 respirator) AND by direct contact with vesicular fluid. This dual-route transmission makes varicella one of the most contagious infectious diseases, requiring the most stringent isolation measures." }]
  },
  "impetigo": {
    title: "Impetigo",
    cellular: { title: "Bacterial Skin Infection", content: "Impetigo is a highly contagious superficial bacterial skin infection caused primarily by Staphylococcus aureus (most common) or Group A Streptococcus (Streptococcus pyogenes). The bacteria invade the epidermis through breaks in the skin (insect bites, abrasions, eczema). Non-bullous impetigo (70% of cases) begins as vesicles that rupture and form characteristic honey-colored crusted lesions. Bullous impetigo is caused by toxin-producing S. aureus that causes large fluid-filled blisters. The infection spreads rapidly through direct contact and autoinoculation (touching lesions then touching other body areas)." },
    signs: {
      left: ["Honey-colored (golden-yellow) crusted lesions — hallmark finding", "Erythematous base beneath crusts", "Lesions commonly on face (perioral, perinasal) and extremities", "Pruritus (itching) with surrounding erythema", "Regional lymphadenopathy may be present"],
      right: ["Highly contagious — spreads by direct contact and autoinoculation", "Contact Precautions required until 24 hours after antibiotic treatment started", "Bullous form: Large fluid-filled blisters (S. aureus toxin-mediated)", "Risk factors: Poor hygiene, crowded living, warm humid climate, skin breaks", "Complication: Post-streptococcal glomerulonephritis (with GAS strains)"]
    },
    medications: [
      { name: "Mupirocin (Bactroban) 2% Ointment", type: "Topical Antibiotic", action: "Inhibits bacterial protein synthesis by binding to isoleucyl-tRNA synthetase, effective against S. aureus and S. pyogenes", sideEffects: "Local burning, stinging, itching at application site", contra: "Hypersensitivity to mupirocin; avoid use on large open wounds", pearl: "First-line for localized, non-bullous impetigo. Apply TID for 5-7 days after gentle removal of crusts with warm soapy water. Gently soak and remove crusts before applying to improve antibiotic penetration." },
      { name: "Cephalexin (Keflex)", type: "First-Generation Cephalosporin (Oral Antibiotic)", action: "Inhibits bacterial cell wall synthesis; effective against gram-positive organisms including S. aureus and S. pyogenes", sideEffects: "GI upset (nausea, diarrhea), allergic reaction, rash", contra: "Severe penicillin allergy (cephalosporin cross-reactivity ~1-2%)", pearl: "Used for widespread impetigo, bullous impetigo, or cases not responding to topical therapy. Complete the full course (7-10 days) even if lesions improve. Check for penicillin allergy before administering." }
    ],
    pearls: ["Strict hand hygiene is the most important measure to prevent spread. Wash hands thoroughly after touching lesions.", "Keep child's fingernails trimmed short to prevent scratching and autoinoculation to other body areas.", "Do NOT share towels, washcloths, clothing, or personal items. Launder linens and clothing in hot water separately.", "Child may return to school/daycare 24 hours after starting antibiotic treatment and lesions are no longer weeping."],
    quiz: [{ question: "What is the characteristic finding that distinguishes impetigo from other skin infections?", options: ["Deep purple ecchymotic patches", "Honey-colored (golden-yellow) crusted lesions", "Circular ring-shaped erythematous patches", "Fluid-filled vesicles along a dermatome"], correct: 1, rationale: "The hallmark finding of non-bullous impetigo is honey-colored (golden-yellow) crusted lesions. These form when vesicles and pustules rupture and the serous exudate dries into characteristic golden crusts. This appearance is virtually pathognomonic for impetigo and is the key clinical feature that differentiates it from other skin infections such as tinea (ring-shaped), herpes zoster (dermatomal), or purpura (purple patches)." }]
  },
  "head-lice": {
    title: "Head Lice (Pediculosis Capitis)",
    cellular: { title: "Parasitic Infestation", content: "Pediculosis capitis is an infestation of the scalp by the human head louse (Pediculus humanus capitis). The louse is an obligate ectoparasite that feeds on human blood from the scalp, causing intense pruritus from an allergic reaction to louse saliva. Female lice lay eggs (nits) that cement firmly to the hair shaft near the scalp. Nits hatch in 7-10 days, and the louse life cycle is approximately 30 days. Transmission occurs primarily through direct head-to-head contact and less commonly through shared personal items (combs, hats, pillows). Head lice do NOT transmit disease and are not a sign of poor hygiene." },
    signs: {
      left: ["Intense scalp pruritus (itching) — primary symptom", "Nits (eggs) firmly attached to hair shafts near scalp, especially behind ears and nape", "Live lice visible on scalp and hair (small, grayish-white, wingless insects)", "Excoriations (scratch marks) on scalp from intense itching", "Secondary bacterial infection of excoriated areas possible"],
      right: ["Nits are oval, yellowish-white, firmly cemented to hair shaft (do not flake off like dandruff)", "Transmission: Direct head-to-head contact (most common), shared combs/hats/pillows", "NOT a sign of poor hygiene — affects all socioeconomic groups", "School-age children (3-11 years) most commonly affected", "No disease transmission — lice are a nuisance, not a health hazard"]
    },
    medications: [
      { name: "Permethrin 1% (Nix) Shampoo", type: "Topical Pediculicide", action: "Disrupts sodium channel function in louse nerve cells, causing paralysis and death of lice and nits", sideEffects: "Scalp itching, redness, mild burning or stinging at application site", contra: "Hypersensitivity to pyrethrins or chrysanthemums", pearl: "First-line OTC treatment. Apply to clean, damp hair for 10 minutes then rinse. Repeat application in 7-10 days to kill newly hatched nymphs (nits not fully killed by first treatment). Do NOT use conditioner before application (reduces effectiveness)." },
      { name: "Nit Comb (Fine-Toothed)", type: "Mechanical Removal Tool", action: "Physically removes nits and dead lice from hair shafts through systematic combing", sideEffects: "Discomfort during combing, especially with tangled hair", contra: "None", pearl: "Essential adjunct to chemical treatment. Comb wet hair section by section every 3-4 days for 2-3 weeks after treatment. Wipe comb on white paper towel to visualize removed nits and lice. Use with conditioner or detangler to ease combing." }
    ],
    pearls: ["Treat ALL household contacts and close contacts simultaneously to prevent re-infestation cycle.", "Wash all bedding, clothing, and towels in HOT water (130°F/54°C) and dry on high heat. Items that cannot be washed should be sealed in plastic bags for 2 weeks.", "Do NOT share combs, brushes, hats, hair accessories, helmets, or pillows. Educate children about not sharing these items at school.", "Nits found >1/4 inch from scalp are likely non-viable (already hatched or dead) — focus treatment on nits close to the scalp."],
    quiz: [{ question: "What is the first-line treatment for head lice in children?", options: ["Oral antibiotics for 10 days", "Shaving the child's head completely", "Permethrin 1% shampoo with repeat application in 7-10 days", "Daily application of petroleum jelly to the scalp"], correct: 2, rationale: "Permethrin 1% (Nix) shampoo is the recommended first-line treatment for head lice. It is applied to clean, damp hair for 10 minutes, rinsed, and repeated in 7-10 days to kill any newly hatched nymphs. Combined with systematic nit combing, this approach effectively eliminates the infestation. Shaving the head is unnecessary and psychologically harmful, and antibiotics do not treat parasitic infestations." }]
  },
  "pinworms": {
    title: "Pinworms (Enterobiasis)",
    cellular: { title: "Parasitic Intestinal Infection", content: "Enterobiasis is caused by Enterobius vermicularis, a small white parasitic nematode (roundworm) that infects the human intestinal tract. The infection cycle begins with ingestion of microscopic pinworm eggs via the fecal-oral route (contaminated hands, food, or fomites). Eggs hatch in the small intestine, and larvae migrate to the cecum and appendix where they mature into adult worms. At night, gravid female worms migrate to the perianal area to deposit thousands of eggs, causing intense perianal pruritus. Scratching deposits eggs under fingernails, perpetuating the cycle through autoinoculation and person-to-person transmission. Pinworm is the most common helminth infection in the United States, predominantly affecting school-age children." },
    signs: {
      left: ["Intense perianal pruritus (itching), especially at night when female worms migrate to lay eggs", "Restlessness, irritability, and disturbed sleep due to nocturnal itching", "Perianal excoriation and erythema from persistent scratching", "Visible small white thread-like worms (~1cm) in stool or perianal area", "Occasional abdominal pain, nausea, or decreased appetite"],
      right: ["Tape Test (Scotch Tape Test): Gold standard for diagnosis — apply transparent tape to perianal area in early morning BEFORE bathing", "Fecal-oral transmission: eggs survive on surfaces, clothing, bedding for 2-3 weeks", "Autoinfection cycle: scratching → eggs under nails → hand-to-mouth → reinfection", "Entire family/household typically infected — treat ALL members simultaneously", "Most common in school-age children (5-10 years); often asymptomatic carriers"]
    },
    medications: [
      { name: "Mebendazole (Vermox)", type: "Anthelmintic (Benzimidazole)", action: "Inhibits microtubule synthesis in the worm, blocking glucose uptake and depleting glycogen stores, leading to parasite death", sideEffects: "Abdominal pain, diarrhea, flatulence (usually mild and transient)", contra: "Pregnancy (teratogenic); hypersensitivity to benzimidazoles", pearl: "Single 100mg dose, repeated in 2 weeks to kill any worms that hatched after initial treatment. Treat ALL household members simultaneously regardless of symptoms. Available as chewable tablet for children." },
      { name: "Albendazole (Albenza)", type: "Anthelmintic (Benzimidazole)", action: "Inhibits tubulin polymerization, disrupting glucose absorption and energy metabolism in the parasite", sideEffects: "Headache, nausea, abdominal pain, elevated liver enzymes (rare)", contra: "Pregnancy (teratogenic); monitor LFTs with prolonged use", pearl: "Alternative to mebendazole. Single 400mg dose, repeated in 2 weeks. Also effective against other helminth infections. Take with fatty food to increase absorption." }
    ],
    pearls: ["Tape Test (Scotch Tape Test) is the diagnostic method — apply clear adhesive tape to perianal area FIRST thing in morning before bathing or bowel movement, then examine under microscope for eggs.", "Treat ALL family members/household contacts simultaneously, even if asymptomatic, to break the cycle of reinfection.", "Strict hand hygiene: wash hands thoroughly with soap and water after toileting and before eating. Keep fingernails trimmed very short.", "Wash all bedding, towels, and undergarments in HOT water daily during treatment period. Avoid shaking linens (disperses eggs into air)."],
    quiz: [{ question: "What is the recommended diagnostic method for pinworm infection?", options: ["Stool culture and sensitivity", "Blood test for eosinophilia", "Scotch tape test applied to perianal area in early morning", "Abdominal X-ray to visualize worms"], correct: 2, rationale: "The Scotch Tape (cellophane tape) test is the gold standard for diagnosing pinworm infection. Clear adhesive tape is applied to the perianal area FIRST thing in the morning (before bathing or bowel movement) when eggs are most concentrated. The tape is then placed on a microscope slide and examined for characteristic oval, flattened eggs. Stool samples are unreliable because eggs are deposited externally, not in stool." }]
  },
  "dehydration-peds": {
    title: "Pediatric Dehydration",
    cellular: { title: "Fluid Volume Deficit in Children", content: "Pediatric dehydration occurs when fluid output exceeds intake, most commonly from gastroenteritis (vomiting and diarrhea). Children are at higher risk than adults due to their higher body surface area-to-weight ratio, higher metabolic rate, immature renal concentrating ability, and greater percentage of total body water. Dehydration is classified by percentage of body weight loss: Mild (3-5%), Moderate (6-9%), and Severe (≥10%). The type of dehydration (isotonic, hypotonic, or hypertonic) depends on the relative loss of water versus electrolytes. Isotonic dehydration (equal loss of water and sodium) is most common. Prompt assessment and rehydration are critical as severe dehydration can rapidly progress to hypovolemic shock in pediatric patients." },
    signs: {
      left: ["Sunken anterior fontanelle in infants (reliable early indicator)", "Decreased or absent tears when crying", "Poor skin turgor (tenting of skin on abdomen)", "Dry mucous membranes (lips, tongue, oral mucosa)", "Decreased urine output (fewer wet diapers: <4-6/day in infants)"],
      right: ["Tachycardia (early compensatory sign of volume depletion)", "Prolonged capillary refill time (>2 seconds)", "Lethargy, irritability, or altered mental status (moderate-severe)", "Hypotension (LATE sign — indicates severe/decompensated dehydration)", "Sunken eyes, cool/mottled extremities in severe dehydration"]
    },
    medications: [
      { name: "Oral Rehydration Therapy (ORT) — Pedialyte", type: "Oral Rehydration Solution", action: "Provides balanced glucose-electrolyte solution that utilizes intestinal sodium-glucose cotransporter to maximize fluid and electrolyte absorption", sideEffects: "Vomiting if given too rapidly; may not be tolerated in severe cases", contra: "Severe dehydration with shock, intractable vomiting, altered consciousness, ileus", pearl: "First-line for mild-moderate dehydration. Give small frequent amounts (5mL every 1-2 minutes by syringe or spoon). Do NOT use juice, soda, or sports drinks (too much sugar, osmotic diarrhea). Continue breastfeeding if applicable. Resume age-appropriate diet as tolerated." },
      { name: "IV Normal Saline (0.9% NaCl) Bolus", type: "Isotonic Crystalloid IV Fluid", action: "Rapidly expands intravascular volume to restore tissue perfusion and correct hypovolemic state", sideEffects: "Fluid overload if excessive, hyperchloremic metabolic acidosis with large volumes", contra: "Caution in heart failure or renal failure", pearl: "For severe dehydration or shock: 20 mL/kg IV bolus over 5-20 minutes, reassess, and repeat up to 3 boluses (60 mL/kg total). After initial resuscitation, calculate maintenance + deficit replacement fluids. Monitor for signs of fluid overload (crackles, edema, JVD)." }
    ],
    pearls: ["Monitor urine output closely — best indicator of rehydration success. Goal: >1 mL/kg/hr in children, 4-6 wet diapers/day in infants.", "Daily weights are the most accurate measure of fluid status — weigh at same time, same scale, same clothing. A 1kg weight loss = approximately 1L fluid deficit.", "Assess anterior fontanelle in infants — sunken fontanelle indicates significant dehydration. Also reassess with rehydration (should normalize).", "Teach parents ORT technique: small frequent sips (teaspoon/syringe), not large volumes at once. Vomiting does NOT mean ORT has failed — wait 15-20 minutes and restart slowly."],
    quiz: [{ question: "Which clinical sign indicates SEVERE dehydration in a pediatric patient?", options: ["Slightly decreased urine output", "Mildly dry lips", "Hypotension with prolonged capillary refill and altered mental status", "Low-grade fever"], correct: 2, rationale: "Hypotension with prolonged capillary refill (>2 seconds) and altered mental status (lethargy, obtundation) indicate SEVERE dehydration (≥10% body weight loss) with impending hypovolemic shock. Hypotension is a LATE and ominous sign in children because they compensate with tachycardia for a prolonged period before decompensating. This requires immediate IV fluid resuscitation with 20 mL/kg NS bolus." }]
  },
  "diaper-candidiasis": {
    title: "Diaper Candidiasis (Diaper Yeast Infection)",
    cellular: { title: "Candida Albicans Fungal Infection", content: "Diaper candidiasis is a superficial fungal infection of the perineal skin caused by Candida albicans, an opportunistic yeast that thrives in warm, moist, occluded environments such as the diaper area. Candida is part of normal GI flora and colonizes the perineum; overgrowth occurs when the skin barrier is compromised by prolonged moisture exposure, friction, and alkaline pH from urine and stool. The hallmark feature distinguishing candidal diaper dermatitis from irritant contact diaper rash is the presence of satellite lesions (small papules and pustules surrounding the main erythematous area) and involvement of skin folds (intertriginous areas). Candidal diaper rash typically develops after 3+ days of existing diaper rash that has not responded to standard barrier creams." },
    signs: {
      left: ["Beefy red, sharply demarcated erythematous rash in perineal area", "Satellite lesions (small papulopustules extending beyond the border of main rash)", "Involvement of skin folds and creases (intertriginous areas)", "Rash does NOT respond to standard diaper barrier creams (zinc oxide)", "May have white patches or scaling at margins of lesions"],
      right: ["Distinguishing feature: Satellite lesions + skin fold involvement (vs. irritant rash which spares folds)", "Often develops after antibiotic use (disrupts normal flora, allows Candida overgrowth)", "May coexist with oral thrush (check mouth for white patches)", "Warm, moist, occluded diaper environment promotes Candida growth", "Risk factors: Prolonged diaper wetness, diarrhea, recent antibiotic use, immunosuppression"]
    },
    medications: [
      { name: "Nystatin Cream/Ointment", type: "Topical Antifungal (Polyene)", action: "Binds to ergosterol in the fungal cell membrane, creating pores that increase membrane permeability, leading to cell death", sideEffects: "Mild local irritation, contact dermatitis (rare)", contra: "Hypersensitivity to nystatin", pearl: "First-line treatment for diaper candidiasis. Apply thin layer to affected area with EACH diaper change (typically QID) for 7-14 days or until rash resolves. Continue for 2-3 days after rash clears to prevent recurrence. Do NOT use combination steroid-antifungal creams without provider order." },
      { name: "Clotrimazole 1% Cream", type: "Topical Antifungal (Azole)", action: "Inhibits ergosterol synthesis by blocking the enzyme lanosterol 14-alpha-demethylase, disrupting fungal cell membrane integrity", sideEffects: "Local erythema, stinging, blistering (rare)", contra: "Hypersensitivity to azole antifungals", pearl: "Alternative to nystatin. Apply BID to affected area for 7-14 days. May be more effective than nystatin for resistant cases. Available OTC. Apply BEFORE barrier cream (zinc oxide) if using both — antifungal first, then barrier on top." }
    ],
    pearls: ["Key differentiator from regular irritant diaper rash: Satellite lesions (papulopustules beyond the rash border) and involvement of skin FOLDS (irritant rash typically spares skin folds).", "Keep diaper area clean and DRY — change diapers frequently (at least every 2 hours and immediately after soiling). Allow diaper-free air exposure time when possible.", "Check for concurrent oral thrush (white patches on buccal mucosa/tongue). If present, treat both simultaneously to prevent reinfection cycle via GI tract.", "Teach parents: Apply antifungal cream FIRST, then barrier cream (zinc oxide) on top if needed. Do NOT use cornstarch (promotes fungal growth). Avoid baby powder (aspiration risk)."],
    quiz: [{ question: "What clinical finding differentiates diaper candidiasis from regular irritant contact diaper rash?", options: ["Rash is limited to the buttocks only", "Presence of satellite lesions and involvement of skin folds", "The rash improves with zinc oxide barrier cream", "The rash only appears after feedings"], correct: 1, rationale: "Satellite lesions (small papulopustules extending beyond the main rash border) and involvement of skin FOLDS (intertriginous areas) are the hallmark findings that differentiate candidal diaper dermatitis from irritant contact diaper rash. Irritant diaper rash typically spares the skin folds (convex surfaces affected, concave folds spared) and responds to barrier creams. Candidal rash involves the folds, has distinct satellite lesions, and requires antifungal treatment." }]
  },
  "hip-dysplasia": {
    title: "Developmental Dysplasia of the Hip (DDH)",
    cellular: { title: "Abnormal Hip Joint Development", content: "Developmental Dysplasia of the Hip (DDH) encompasses a spectrum of abnormalities in which the femoral head has an abnormal relationship with the acetabulum, ranging from mild acetabular dysplasia to frank dislocation. During fetal development, the acetabulum may be shallow or malformed, allowing the femoral head to sublux or dislocate. Risk factors include breech presentation, female sex (due to maternal relaxin effects on ligaments), firstborn status, family history, and oligohydramnios. Early detection through newborn screening is critical because the condition is most treatable in infancy when the hip joint is still malleable and can be molded into proper alignment with the Pavlik harness. Delayed diagnosis leads to progressive deformity, limb length discrepancy, abnormal gait, and early-onset degenerative arthritis." },
    signs: {
      left: ["Positive Ortolani maneuver (clunk felt when dislocated hip is reduced/relocated into acetabulum)", "Positive Barlow maneuver (hip dislocates posteriorly with gentle pressure during adduction)", "Asymmetric gluteal or thigh skin folds", "Apparent limb length discrepancy (Galeazzi sign — uneven knee heights)", "Limited hip abduction on affected side"],
      right: ["Risk factors: Breech presentation, female infant, firstborn, family history, oligohydramnios", "Screening: Ortolani and Barlow maneuvers performed at EVERY well-baby visit until walking age", "Ultrasound confirmation for infants <6 months; X-ray for infants >4-6 months", "Late signs (older infant/toddler): Trendelenburg gait, toe-walking on affected side, waddling gait", "Early detection and treatment = best outcomes; delayed diagnosis requires more invasive intervention"]
    },
    medications: [
      { name: "Pavlik Harness", type: "Orthopedic Device (Non-Surgical Treatment)", action: "Maintains the hips in flexion and abduction, positioning the femoral head within the acetabulum to promote normal joint development and acetabular deepening", sideEffects: "Skin irritation under straps, femoral nerve palsy (if improperly fitted), brachial plexus injury (rare)", contra: "Infants >6 months (decreased effectiveness), irreducible dislocation, neuromuscular hip dysplasia", pearl: "First-line treatment for infants diagnosed before 6 months of age. Worn 23 hours/day (removed only for bathing). Treatment duration typically 6-12 weeks. Must be properly fitted by orthopedic specialist. Parents must NOT remove or adjust harness without instruction." },
      { name: "Spica Cast", type: "Orthopedic Immobilization (Post-Reduction)", action: "Immobilizes the hip in abducted position after closed or open reduction to maintain femoral head in acetabulum while healing occurs", sideEffects: "Skin breakdown under cast edges, neurovascular compromise, cast syndrome (SMA compression)", contra: "Active skin infection under cast area", pearl: "Used for infants >6 months or when Pavlik harness fails. Applied after closed reduction under anesthesia. Assess neurovascular status (5 P's) frequently. Petal cast edges to prevent skin irritation. Monitor for cast syndrome: abdominal distension, vomiting (SMA compression)." }
    ],
    pearls: ["Screen ALL newborns with Ortolani and Barlow maneuvers at birth and at every well-baby visit. High-risk infants (breech, family history) should have hip ultrasound at 4-6 weeks.", "Pavlik harness must be worn 23 hours/day — educate parents on proper positioning, diapering with harness, and skin inspection. Never lift infant by legs.", "Monitor skin integrity under harness straps every 8-12 hours — look for redness, irritation, or pressure areas. Place a thin cotton undershirt beneath harness.", "Double or triple diapering is NOT an effective treatment — this is an outdated practice. Proper orthopedic referral and Pavlik harness are the standard of care."],
    quiz: [{ question: "What is the primary screening test for Developmental Dysplasia of the Hip (DDH) in newborns?", options: ["Hip X-ray at birth", "CT scan of the pelvis", "Ortolani and Barlow maneuvers during physical examination", "MRI of the hip joint"], correct: 2, rationale: "Ortolani and Barlow maneuvers are the primary screening tests for DDH in newborns and should be performed at every well-baby visit. The Ortolani test detects a dislocated hip by abducting the flexed hip and feeling for a 'clunk' as the femoral head reduces into the acetabulum. The Barlow test detects a dislocatable hip by adducting the flexed hip with gentle posterior pressure. These bedside maneuvers are non-invasive, reliable, and enable early detection when treatment (Pavlik harness) is most effective." }]
  },
  "foreign-body-aspiration": {
    title: "Foreign Body Aspiration",
    cellular: { title: "Airway Obstruction Emergency", content: "Foreign body aspiration (FBA) occurs when an object is inhaled into the airway, causing partial or complete obstruction of the tracheobronchial tree. It is most common in children aged 6 months to 3 years due to their tendency to explore objects orally, incomplete dentition (poor chewing ability), immature swallowing coordination, and small airway diameter. The most commonly aspirated items include round foods (grapes, hot dogs, nuts, popcorn, hard candy), small toys/toy parts, coins, and buttons/batteries. The right main bronchus is more commonly affected due to its wider diameter and more vertical orientation. FBA is a leading cause of accidental death in children under 5 years. Prompt recognition and intervention are life-saving, as complete obstruction can lead to respiratory arrest within minutes." },
    signs: {
      left: ["Sudden onset of choking, gagging, or coughing episode", "Stridor (high-pitched inspiratory sound indicating upper airway obstruction)", "Unilateral wheezing or decreased breath sounds on affected side", "Respiratory distress: nasal flaring, intercostal/subcostal retractions, tachypnea", "Cyanosis (late sign indicating severe hypoxia)"],
      right: ["Witnessed choking event with sudden onset (key history finding)", "Partial obstruction: forceful coughing, able to vocalize — encourage coughing, do NOT intervene", "Complete obstruction: unable to cough, cry, or breathe — IMMEDIATE intervention required", "Right main bronchus most common site (wider, more vertical angle)", "High-risk items: Grapes, hot dogs, nuts, popcorn, coins, small toy parts, button batteries"]
    },
    medications: [
      { name: "Back Blows + Chest Thrusts (Infant <1 year)", type: "Basic Life Support Maneuver", action: "Creates artificial cough by generating increased intrathoracic pressure to expel the foreign body from the airway", sideEffects: "Rib fracture (rare with proper technique), gastric distension", contra: "Do NOT perform abdominal thrusts (Heimlich) on infants <1 year (risk of liver laceration)", pearl: "For conscious infant with complete obstruction: 5 back blows (between scapulae, head lower than trunk) alternating with 5 chest thrusts (using 2 fingers on lower sternum). Continue cycle until object expelled or infant becomes unconscious. If unconscious, begin CPR — check mouth before rescue breaths." },
      { name: "Abdominal Thrusts — Heimlich Maneuver (Child >1 year)", type: "Basic Life Support Maneuver", action: "Rapid inward and upward abdominal compression creates forceful upward airflow to dislodge and expel the foreign body from the airway", sideEffects: "Abdominal organ injury (liver, spleen laceration), rib fracture if improper hand placement", contra: "Infants <1 year (use back blows/chest thrusts instead), pregnant patients (use chest thrusts)", pearl: "For conscious child >1 year with complete obstruction: Stand behind child, place fist above umbilicus and below xiphoid process, perform quick inward-upward thrusts. Continue until object expelled or child becomes unconscious. If unconscious, lower to ground and begin CPR. Always seek medical evaluation after choking event." }
    ],
    pearls: ["Prevention is KEY: Cut grapes and hot dogs lengthwise (not round coins), avoid nuts/popcorn/hard candy for children <4 years, choose age-appropriate toys (no small parts), supervise meals.", "Do NOT perform blind finger sweeps — may push object deeper into airway. Only remove visible objects from the mouth.", "Age-appropriate intervention: Infants <1 year = back blows + chest thrusts. Children >1 year = abdominal thrusts (Heimlich maneuver). NEVER use Heimlich on infants.", "After any choking event, child should be evaluated by healthcare provider even if object was expelled — assess for retained fragments, airway trauma, or aspiration pneumonia."],
    quiz: [{ question: "What is the appropriate intervention for a 9-month-old infant with complete airway obstruction from a foreign body?", options: ["Perform abdominal thrusts (Heimlich maneuver)", "Perform blind finger sweep to remove the object", "Alternate 5 back blows with 5 chest thrusts", "Immediately perform a tracheostomy"], correct: 2, rationale: "For infants UNDER 1 year with complete airway obstruction, the correct intervention is alternating 5 back blows (delivered between the scapulae with the infant's head lower than the trunk) with 5 chest thrusts (using 2 fingers on the lower sternum). Abdominal thrusts (Heimlich maneuver) are contraindicated in infants <1 year due to the risk of liver laceration. Blind finger sweeps are never recommended as they may push the object deeper. This cycle is continued until the object is expelled or the infant becomes unconscious (then begin CPR)." }]
  },
  "hand-hygiene": {
    title: "Hand Hygiene and Handwashing",
    cellular: { title: "Infection Prevention Foundation", content: "Hand hygiene is the single most important measure to prevent healthcare-associated infections (HAIs). The transient flora on hands — bacteria, viruses, and fungi acquired through patient contact or contaminated surfaces — are responsible for the majority of cross-transmission events in healthcare settings. Proper hand hygiene mechanically removes or chemically inactivates these transient organisms. The WHO identifies 5 Moments of Hand Hygiene: (1) Before patient contact, (2) Before an aseptic procedure, (3) After body fluid exposure risk, (4) After patient contact, and (5) After contact with patient surroundings. Failure to perform hand hygiene at these critical moments is the leading modifiable cause of HAIs, which affect millions of patients annually and contribute to increased morbidity, mortality, and healthcare costs. Alcohol-based hand rubs (ABHR) containing 60-95% alcohol are the preferred method for routine hand hygiene when hands are not visibly soiled, as they are faster, more effective against most organisms, and less irritating to skin than soap and water. However, soap and water is REQUIRED when hands are visibly soiled, after caring for patients with Clostridioides difficile (C.diff) or norovirus (alcohol does not kill spores or non-enveloped viruses effectively), and after using the restroom." },
    signs: {
      left: ["WHO 5 Moments: Before patient contact — reduce transmission of organisms from HCW hands to patient", "WHO 5 Moments: Before aseptic procedure — prevent introduction of organisms into sterile sites (IV insertion, wound care, catheterization)", "WHO 5 Moments: After body fluid exposure risk — protect HCW and prevent cross-contamination after contact with blood, secretions, excretions, mucous membranes, non-intact skin", "WHO 5 Moments: After patient contact — prevent colonization of HCW hands with patient flora and reduce environmental contamination", "WHO 5 Moments: After contact with patient surroundings — surfaces near patient harbor pathogens (bed rails, IV poles, call bell, bedside table)"],
      right: ["Proper handwashing technique: Wet hands with warm water → Apply soap → Lather all surfaces (palms, backs, between fingers, thumbs, under nails, wrists) for minimum 20 seconds → Rinse thoroughly under running water → Dry with clean paper towel → Use paper towel to turn off faucet", "ABHR technique: Apply product to palm of one hand (enough to cover all surfaces) → Rub hands together covering all surfaces (palms, backs, between fingers, thumbs, fingertips) until dry (approximately 20 seconds) → Do NOT wipe or rinse off", "ABHR is preferred for routine decontamination when hands are NOT visibly soiled — faster, more effective, less skin irritation", "Soap and water REQUIRED: Visibly soiled hands, after caring for C.diff patients (spore-forming), after caring for norovirus patients (non-enveloped virus), before eating, after using restroom", "Artificial nails, chipped nail polish, and rings with stones harbor microorganisms — facility policies typically prohibit these for direct care providers"]
    },
    medications: [
      { name: "Alcohol-Based Hand Rub (ABHR)", type: "Antiseptic Hand Hygiene Agent", action: "Contains 60-95% isopropanol or ethanol that denatures proteins and dissolves lipid membranes of most bacteria, fungi, and enveloped viruses on contact, providing rapid broad-spectrum antimicrobial activity within 15-30 seconds", sideEffects: "Skin dryness with repeated use (most formulations contain emollients to mitigate), flammable — allow to dry completely before contact with ignition sources, stinging on broken skin", contra: "Visibly soiled hands, care of patients with C.difficile (spore-forming — alcohol does not kill spores), care of patients with norovirus (non-enveloped virus — resistant to alcohol), after using the restroom", pearl: "ABHR is the PREFERRED method for routine hand hygiene in healthcare — it is faster, more effective against most pathogens, and causes less skin irritation than soap and water. Apply enough product to cover all hand surfaces and rub until completely dry (approximately 20 seconds). Do NOT rinse or wipe off. Keep dispensers accessible at point of care." },
      { name: "Antimicrobial Soap (Chlorhexidine Gluconate / CHG)", type: "Antiseptic Handwashing Agent", action: "Provides mechanical removal of transient flora through friction and surfactant action combined with residual antimicrobial activity from chlorhexidine that binds to skin and continues killing organisms after rinsing", sideEffects: "Contact dermatitis with frequent use, rare allergic reactions (anaphylaxis reported with CHG), skin drying and cracking (compromises skin integrity and paradoxically increases bacterial colonization)", contra: "Known CHG allergy/sensitivity, use near ears or eyes (ototoxic, can cause corneal damage)", pearl: "Soap and water (with or without antimicrobial agent) is MANDATORY for C.diff and norovirus — these organisms are not killed by alcohol. The mechanical action of washing physically removes spores. Proper technique requires minimum 20 seconds of lathering. Use paper towel to turn off faucet to prevent recontamination." }
    ],
    pearls: ["Hand hygiene is the #1 most effective intervention to prevent healthcare-associated infections. Compliance rates in healthcare are often below 50% — every nurse must be a champion for hand hygiene.", "Remember: ABHR is preferred for routine hand hygiene, but soap and water is REQUIRED for C.diff, norovirus, and visibly soiled hands. If you can see it, you must wash it.", "The WHO 5 Moments framework provides a systematic approach: Before patient contact, Before aseptic procedure, After body fluid exposure risk, After patient contact, After contact with patient surroundings.", "Proper technique matters as much as frequency — ensure all surfaces are covered (palms, backs, between fingers, thumbs, fingertips, wrists) for a minimum of 20 seconds. Singing 'Happy Birthday' twice approximates 20 seconds.", "Skin integrity is essential — damaged skin harbors more organisms. Use facility-provided moisturizers, avoid hot water, and pat hands dry rather than rubbing to maintain skin health."],
    quiz: [{ question: "A nurse is caring for a patient diagnosed with Clostridioides difficile (C.diff) infection. Which hand hygiene method is REQUIRED after removing gloves?", options: ["Alcohol-based hand rub (ABHR) for 20 seconds", "Soap and water with friction for at least 20 seconds", "Hand sanitizer wipe followed by ABHR", "Either ABHR or soap and water — both are equally effective"], correct: 1, rationale: "Soap and water with thorough friction for at least 20 seconds is REQUIRED when caring for patients with C.difficile. C.diff produces spores that are NOT killed by alcohol-based hand rubs. The mechanical action of handwashing with soap and water physically removes the spores from the skin. ABHR alone is insufficient and should not be substituted in this situation. This is one of the most critical exceptions to the general preference for ABHR in routine hand hygiene." }]
  },
  "ppe-basics": {
    title: "PPE: Donning and Doffing",
    cellular: { title: "Personal Protective Equipment Principles", content: "Personal Protective Equipment (PPE) creates a physical barrier between the healthcare worker (HCW) and infectious agents, preventing transmission through contact, droplet, and airborne routes. PPE selection is based on the anticipated exposure and the type of transmission-based precautions required. The fundamental components include gloves (contact barrier), gowns (body/clothing protection), masks/respirators (respiratory protection), and eye protection (mucous membrane protection). The ORDER of donning (putting on) and doffing (removing) PPE is critical to prevent self-contamination. Donning order: Gown → Mask/Respirator → Eye Protection (goggles or face shield) → Gloves. Doffing order: Gloves → Eye Protection → Gown → Mask/Respirator. The doffing sequence is designed so that the most contaminated items (gloves) are removed first, and the mask/respirator (protecting the most vulnerable entry point — the respiratory tract) is removed last, after hands have been cleaned. Common errors during doffing — touching the outside of contaminated PPE with bare hands, removing the mask before other items, or failing to perform hand hygiene between steps — are the primary causes of HCW self-contamination and subsequent infection transmission." },
    signs: {
      left: ["DONNING Order (remember: 'Going May Eat Grapes' — Gown, Mask, Eye protection, Gloves)", "Step 1 — GOWN: Secure at neck and waist ties. Gown should fully cover torso, fit comfortably, and have long sleeves with cuffs", "Step 2 — MASK/RESPIRATOR: Secure ties or elastic bands. Surgical mask for droplet precautions. N95 respirator for airborne precautions (must be fit-tested). Mold nose piece to face, ensure no gaps", "Step 3 — EYE PROTECTION: Position goggles over eyes or face shield over face, adjust to fit securely. Goggles must have anti-fog features and seal around eyes", "Step 4 — GLOVES: Select proper size. Pull glove cuffs OVER the cuffs of the gown to create a continuous barrier with no exposed skin"],
      right: ["DOFFING Order (remember: 'Gloves are the Grossest' — remove first): Gloves → Eye Protection → Gown → Mask", "Step 1 — GLOVES: Grasp outside of one glove at wrist, peel off turning inside out. Hold removed glove in remaining gloved hand. Slide ungloved finger under wrist of remaining glove, peel off inside out over first glove. Discard. Perform hand hygiene IMMEDIATELY", "Step 2 — EYE PROTECTION: Remove by handling the headband or earpieces (these are considered 'clean'). Do NOT touch the front of goggles/face shield (contaminated). Discard or place in designated receptacle for reprocessing", "Step 3 — GOWN: Unfasten ties. Pull gown away from body, rolling it inside out (contaminated surface inward). Fold or roll into a bundle. Discard. Perform hand hygiene", "Step 4 — MASK/RESPIRATOR: Remove LAST (respiratory protection maintained as long as possible). Grasp ties/elastics only — do NOT touch the front of the mask. Lift away from face. Discard. Perform hand hygiene IMMEDIATELY"]
    },
    medications: [
      { name: "N95 Respirator", type: "Airborne Particulate Respirator (PPE)", action: "Filters at least 95% of airborne particles ≥0.3 microns in diameter, including aerosolized droplet nuclei containing pathogens such as M. tuberculosis, measles virus, and varicella-zoster virus, providing respiratory protection against airborne transmission", sideEffects: "Difficulty breathing with prolonged use (increased work of breathing), facial pressure marks, skin breakdown on nasal bridge with extended wear, claustrophobia, communication difficulty (muffled speech)", contra: "Facial hair that interferes with seal (beard, stubble in seal area), conditions preventing adequate seal (certain facial structures), failed fit test for specific model — use PAPR as alternative", pearl: "N95 respirators MUST be fit-tested annually and each time a different model/size is used. User seal check must be performed EVERY time the respirator is donned. N95 is required for AIRBORNE precautions (TB, measles, varicella, disseminated zoster). A surgical mask is NOT a substitute for an N95 — it does not filter airborne particles. If fit testing fails, a PAPR (Powered Air-Purifying Respirator) is the alternative." },
      { name: "Surgical Mask", type: "Fluid-Resistant Face Mask (PPE)", action: "Provides barrier protection against large respiratory droplets (>5 microns) generated by coughing, sneezing, or talking, and protects the wearer's nose and mouth from splashes and sprays of blood and body fluids", sideEffects: "Reduced communication clarity, skin irritation behind ears with prolonged use, moisture accumulation reduces effectiveness, does NOT filter airborne particles", contra: "Should NOT be used as substitute for N95 in airborne precaution situations — does not provide adequate filtration for particles <5 microns", pearl: "Surgical masks are used for DROPLET precautions (influenza, pertussis, meningococcal disease) and as part of standard precautions when splash/spray is anticipated. Replace when wet, soiled, or damaged. When transporting patients on airborne or droplet precautions, place a surgical mask on the PATIENT. The surgical mask is the LAST item removed during doffing." },
      { name: "Face Shield / Goggles", type: "Eye and Face Protection (PPE)", action: "Protects the mucous membranes of the eyes (and face, in the case of face shields) from splashes, sprays, and spatters of blood, body fluids, secretions, and excretions that may contain infectious agents", sideEffects: "Fogging with prolonged use, visual field restriction with goggles, discomfort with extended wear, potential for contamination if touched during use", contra: "Must not be reused without proper decontamination. Personal eyeglasses are NOT acceptable substitutes for goggles or face shields", pearl: "Face shields provide broader coverage (protect entire face including eyes, nose, mouth) and are preferred during aerosol-generating procedures. Goggles provide better seal around the eyes but do not protect the rest of the face. Eye protection is removed by handling the headband or earpieces — NEVER touch the front surface. During doffing, eye protection is removed AFTER gloves but BEFORE gown and mask." }
    ],
    pearls: ["Donning order: Gown → Mask/Respirator → Eye Protection → Gloves. Memory aid: 'Going May Eat Grapes.' Gloves go on LAST so they can overlap the gown cuffs.", "Doffing order: Gloves → Eye Protection → Gown → Mask/Respirator. The most contaminated item (gloves) comes off FIRST. The mask comes off LAST to maintain respiratory protection as long as possible.", "Perform hand hygiene BETWEEN doffing steps — especially immediately after removing gloves and after removing gown. This is the most commonly missed step and a major source of self-contamination.", "The #1 doffing error is touching the outside (contaminated surface) of PPE with bare or clean hands. Always grasp ties, bands, or edges — never the front surface of masks, goggles, or gowns.", "N95 respirators require annual fit testing AND a user seal check every time they are donned. If you have facial hair in the seal area, you cannot achieve a proper seal — use a PAPR instead."],
    quiz: [{ question: "A nurse is preparing to leave the room of a patient on contact and droplet precautions. What is the CORRECT order for removing (doffing) PPE?", options: ["Mask → Gloves → Gown → Eye protection", "Gloves → Eye protection → Gown → Mask", "Gown → Gloves → Mask → Eye protection", "Eye protection → Mask → Gloves → Gown"], correct: 1, rationale: "The correct doffing order is: Gloves → Eye Protection → Gown → Mask/Respirator. Gloves are removed first because they are the most heavily contaminated item. Eye protection is removed next by handling only the headband or earpieces. The gown is then removed by unfastening ties and pulling away from the body, rolling contaminated surface inward. The mask/respirator is removed LAST to maintain respiratory protection as long as possible. Hand hygiene is performed between steps, especially after glove and gown removal." }]
  },
  "isolation-precautions-rpn": {
    title: "Isolation Precautions Overview",
    cellular: { title: "Chain of Infection and Transmission Prevention", content: "Isolation precautions are infection prevention strategies designed to interrupt the chain of infection by targeting the mode of transmission. The chain of infection requires six links: (1) Infectious agent (pathogen), (2) Reservoir (where the organism lives and multiplies), (3) Portal of exit (how it leaves the reservoir), (4) Mode of transmission (how it travels to a new host), (5) Portal of entry (how it enters the new host), and (6) Susceptible host. Isolation precautions target the MODE OF TRANSMISSION link. There are two tiers of precautions: STANDARD PRECAUTIONS apply to ALL patients regardless of known or suspected infection status and include hand hygiene, PPE based on anticipated exposure, respiratory hygiene/cough etiquette, safe injection practices, and proper handling of contaminated equipment and surfaces. TRANSMISSION-BASED PRECAUTIONS are used IN ADDITION to standard precautions when the route of transmission is not completely interrupted by standard precautions alone. There are three categories: AIRBORNE (particles <5 microns that remain suspended — TB, measles, varicella), DROPLET (particles >5 microns that fall within 3-6 feet — influenza, pertussis, meningococcal meningitis), and CONTACT (direct or indirect physical transfer — MRSA, C.diff, scabies, VRE). A patient may require more than one type of transmission-based precaution simultaneously." },
    signs: {
      left: ["STANDARD PRECAUTIONS (Tier 1): Apply to ALL patients, ALL encounters, regardless of diagnosis — treat all blood, body fluids, secretions, excretions (except sweat), non-intact skin, and mucous membranes as potentially infectious", "AIRBORNE Precautions: Required for pathogens transmitted via droplet nuclei <5 microns that remain suspended in air and travel long distances — TB (Mycobacterium tuberculosis), Measles (Rubeola), Varicella (Chickenpox), Disseminated Herpes Zoster", "DROPLET Precautions: Required for pathogens transmitted via large respiratory droplets >5 microns generated during coughing, sneezing, talking — travel ≤3-6 feet then fall — Influenza, Pertussis (Whooping Cough), Meningococcal Meningitis, Mumps, Rubella", "CONTACT Precautions: Required for pathogens transmitted by direct physical contact or indirect contact through contaminated objects/surfaces — MRSA, VRE, C.difficile, Scabies, Lice, RSV (in pediatrics), Wound infections with drug-resistant organisms", "Multiple precaution types can apply simultaneously — e.g., Varicella requires BOTH Airborne AND Contact precautions (vesicular lesions are infectious on contact)"],
      right: ["Airborne room requirements: Airborne Infection Isolation Room (AIIR) — negative pressure, door closed at all times, 6-12 air changes per hour, air exhausted to outside or HEPA-filtered. N95 or PAPR required for all who enter", "Droplet room requirements: Private room preferred. If unavailable, cohort patients with SAME organism. Maintain >3 feet between patients. Curtain between beds. Surgical mask within 6 feet of patient. No negative pressure required", "Contact room requirements: Private room preferred. Dedicated equipment (stethoscope, BP cuff, thermometer) that stays in the room. Gown and gloves for ALL interactions with patient or patient environment. Remove PPE before leaving room", "Signage: Appropriate precaution signage MUST be posted at the door BEFORE anyone enters. Include type of precaution, required PPE, and any special instructions. Communicate precaution status during handoff/report", "Patient transport: Limit transport to medically necessary only. Airborne patients wear surgical mask during transport. Droplet patients wear surgical mask during transport. Contact patients — ensure wounds are covered, clean linens for transport"]
    },
    medications: [
      { name: "Standard Precautions Protocol", type: "Universal Infection Prevention Framework", action: "Establishes baseline infection prevention practices applied to ALL patient encounters regardless of suspected or confirmed infection status, including hand hygiene, use of PPE based on anticipated exposure, respiratory hygiene/cough etiquette, safe injection practices, sterile instruments and devices, and clean and disinfected environmental surfaces", sideEffects: "None when properly implemented — standard precautions are the foundation of all infection prevention", contra: "Never omit standard precautions — they are the MINIMUM level of infection prevention for every patient encounter", pearl: "Standard precautions are the FOUNDATION — they apply to EVERY patient, EVERY time. Transmission-based precautions are used IN ADDITION TO standard precautions, never instead of them. The key principle: treat ALL blood, body fluids, secretions, excretions (except sweat), non-intact skin, and mucous membranes as potentially infectious." },
      { name: "Transmission-Based Precaution Signage", type: "Communication and Safety Tool", action: "Provides visual identification of required precautions at the point of entry to patient rooms, ensuring all healthcare workers, visitors, and ancillary staff are aware of required PPE and procedures before entering the patient environment", sideEffects: "Potential for patient stigmatization, visitor anxiety, must be balanced with patient dignity and privacy", contra: "Signage must never include the patient's specific diagnosis — indicate precaution TYPE and required PPE only", pearl: "Post signage BEFORE the first person enters the room. Include: type of precaution (Airborne, Droplet, Contact), required PPE with visual icons, and special instructions (e.g., negative pressure room — keep door closed). Update or remove signage promptly when precautions are discontinued to prevent unnecessary isolation." }
    ],
    pearls: ["Standard precautions apply to ALL patients — not just those with known infections. This is the single most important concept in infection prevention.", "Memory aid for airborne organisms: 'MTV' — Measles, TB, Varicella (Chickenpox). These require negative pressure rooms and N95 respirators.", "Contact precautions require dedicated equipment in the room (stethoscope, BP cuff, thermometer). This prevents indirect contact transmission through shared equipment.", "C.diff requires BOTH contact precautions AND soap and water hand hygiene (not ABHR). Alcohol does not kill C.diff spores — mechanical removal through handwashing is essential.", "Always communicate isolation precaution status during patient handoff/report and when calling for transport, diagnostic testing, or consultations. Every person entering the room must know the required precautions."],
    quiz: [{ question: "A patient is admitted with a diagnosis of active pulmonary tuberculosis (TB). Which type of isolation precaution is required?", options: ["Contact precautions with gown and gloves", "Droplet precautions with surgical mask", "Airborne precautions with N95 respirator in a negative pressure room", "Standard precautions only — TB is not transmitted person-to-person"], correct: 2, rationale: "Active pulmonary tuberculosis (TB) requires AIRBORNE precautions. TB is caused by Mycobacterium tuberculosis, which is transmitted via droplet nuclei (particles <5 microns) that remain suspended in the air and can travel long distances. The patient must be placed in an Airborne Infection Isolation Room (AIIR) with negative pressure, the door must remain closed, and all persons entering must wear a properly fit-tested N95 respirator (or PAPR). A surgical mask is NOT adequate for TB. Remember: 'MTV' — Measles, TB, Varicella require airborne precautions." }]
  },
  "sterile-technique": {
    title: "Sterile Technique and Asepsis",
    cellular: { title: "Principles of Surgical Asepsis", content: "Sterile technique (surgical asepsis) is the practice of creating and maintaining a completely pathogen-free environment to prevent the introduction of ANY microorganisms into a sterile body area. This differs from medical asepsis (clean technique), which aims to REDUCE the number and transfer of pathogens but does not eliminate them entirely. Sterile technique is required whenever the skin's integrity is intentionally broken or when accessing normally sterile body cavities and tissues. This includes surgical procedures, urinary catheterization, central line insertion and dressing changes, wound irrigation, lumbar puncture, chest tube insertion, and any invasive procedure that enters sterile body cavities. The fundamental principle of sterile technique is that ANY break in sterility — no matter how small — requires the entire sterile field and any contaminated supplies to be discarded and the setup to be restarted. There is no such thing as 'a little contaminated' — sterile is an absolute state. Key principles include: only sterile items are placed on a sterile field, a sterile barrier that has been permeated by moisture (strike-through contamination) is no longer sterile, once a sterile package is opened the edges (1-inch border) are considered unsterile, sterile fields must be prepared as close to the time of use as possible and never left unattended, and anything below the waist or above the shoulders is considered unsterile." },
    signs: {
      left: ["STERILE (Surgical) Asepsis: Goal is to ELIMINATE all microorganisms from an area. Used for invasive procedures. Requires sterile equipment, sterile gloves, sterile field. ANY contamination = restart entire setup", "MEDICAL (Clean) Asepsis: Goal is to REDUCE number and transfer of pathogens. Used for routine care. Includes hand hygiene, clean gloves, clean equipment. Examples: oral medication administration, bathing, linen changes", "Sterile Field Setup Rules: Open sterile package flap AWAY from body first (prevents reaching over sterile field), then sides, then nearest flap last. 1-inch border around the drape is UNSTERILE. Items placed by dropping onto field — never reach across", "Sterile Gloving: Open inner glove package on clean surface. Pick up first glove by the folded cuff (inside surface) with non-dominant hand. Slide dominant hand in. Pick up second glove by sliding sterile gloved fingers UNDER the cuff. No bare skin touches outer sterile surface", "When Sterile Technique Required: Surgical procedures, Urinary catheterization (insertion), Central line insertion and dressing changes, Wound irrigation, Chest tube insertion, Lumbar puncture, Tracheostomy care (initial), Parenteral (IV) medication preparation"],
      right: ["BREAKS in Sterile Technique (contamination — MUST restart): Reaching across the sterile field, Turning your back to the sterile field, Dropping a non-sterile item onto the field, Allowing the field to become wet (strike-through contamination), Holding sterile items below waist level", "Additional breaks: Leaving the sterile field unattended or out of continuous view, Coughing or sneezing over the sterile field, Allowing a non-scrubbed person to reach across the field, Using expired sterile supplies, Opening a package and finding a hole or tear in the wrapper", "Strike-through contamination: Moisture creates a pathway (wick effect) for microorganisms to travel from an unsterile surface through the barrier to the sterile surface. Even a small area of moisture renders the entire field unsterile", "Time considerations: Sterile fields should be set up as close to time of use as possible. A sterile field left unattended is considered contaminated. Prolonged exposure to air increases risk of airborne contamination", "If in doubt, consider it CONTAMINATED — err on the side of caution. Starting over is always safer than risking surgical site infection or other complications from a potentially contaminated field"]
    },
    medications: [
      { name: "Sterile Normal Saline (0.9% NaCl) for Irrigation", type: "Sterile Irrigation Solution", action: "Provides isotonic sterile solution for wound irrigation that mechanically removes debris, bacteria, and necrotic tissue from wounds while maintaining physiologic osmolality that does not damage healthy tissue cells", sideEffects: "Hypothermia if solution is not warmed to body temperature (especially large-volume irrigation), fluid overload if absorbed systemically in large quantities during surgical irrigation", contra: "Non-sterile saline must NEVER be used for wound irrigation — only sterile solutions in sterile technique. Check expiration date and container integrity before use", pearl: "Warm irrigation solution to body temperature (37°C/98.6°F) to prevent hypothermia and vasoconstriction in the wound bed, which impairs healing. Use gentle pressure (4-15 psi) — a 35mL syringe with 19-gauge angiocatheter provides approximately 8 psi, which is optimal for wound cleansing without traumatizing tissue. Always maintain sterile technique during wound irrigation." },
      { name: "Chlorhexidine Gluconate (CHG) Skin Prep", type: "Antiseptic Skin Preparation Agent", action: "Provides broad-spectrum antimicrobial activity against gram-positive and gram-negative bacteria, fungi, and some viruses through disruption of cell membranes. Has rapid onset (within 15-30 seconds) and sustained residual activity that continues killing organisms for up to 48 hours after application", sideEffects: "Contact dermatitis, rare anaphylactic reactions, ototoxicity (never use near ears), corneal damage (avoid eye contact), skin irritation in neonates (use with caution in preterm infants)", contra: "Known CHG allergy, use on or near ears (ototoxic), use near eyes (corneal damage), meningeal contact, neonates <2 months (use with extreme caution — risk of chemical burns)", pearl: "CHG is the preferred antiseptic for central line site preparation, surgical site preparation, and CHG bathing protocols for ICU patients to reduce CLABSI and SSI rates. Apply using back-and-forth friction for 30 seconds, allow to air dry for at least 2 minutes (do NOT blot or fan). The residual activity of CHG is a key advantage over povidone-iodine." }
    ],
    pearls: ["The cardinal rule: If sterility is questioned or uncertain, consider the item or field CONTAMINATED. Starting over is always the correct choice — never assume sterility.", "Never turn your back on a sterile field or leave it unattended. If you must leave, the field is considered contaminated and must be re-established.", "The 1-inch border rule: The outer 1 inch of any sterile drape is considered unsterile. Place all sterile items well within the center of the field, away from the edges.", "Strike-through contamination occurs when moisture penetrates a sterile barrier, creating a pathway for microorganisms. If any part of the sterile field becomes wet, the ENTIRE field is contaminated.", "Sterile items held below waist level are considered contaminated — always keep sterile items within the sterile field and above waist level within your line of sight."],
    quiz: [{ question: "During a sterile dressing change, the nurse accidentally touches the edge of the sterile field with a non-sterile sleeve. What is the appropriate action?", options: ["Continue the procedure since only the edge was touched", "Move the sterile supplies to the center of the field and continue", "Discard the contaminated field and supplies, then restart the procedure with new sterile equipment", "Wipe the edge of the field with an alcohol swab and continue"], correct: 2, rationale: "ANY break in sterile technique, no matter how minor it may seem, requires the nurse to discard the contaminated field and all supplies on it, then restart the procedure with entirely new sterile equipment. Sterility is an absolute state — there is no such thing as 'partially sterile.' The 1-inch border of the sterile field is already considered unsterile, and any contact with non-sterile items beyond this boundary contaminates the entire field. Attempting to 'salvage' a contaminated field by moving supplies or wiping with alcohol is never acceptable and poses a serious infection risk to the patient." }]
  },
  "airborne-precautions": {
    title: "Airborne Precautions (RN Level)",
    cellular: { title: "Pathophysiology of Airborne Transmission", content: "Airborne transmission occurs when infectious agents are carried by droplet nuclei — tiny particles less than 5 microns in diameter that result from the evaporation of larger respiratory droplets or are generated during aerosol-generating procedures. Due to their extremely small size, these particles remain suspended in the air for extended periods (hours) and can travel long distances on air currents, far beyond the 3-6 foot range of standard droplet transmission. They can be inhaled by susceptible individuals who have never been in face-to-face contact with the infectious person, making airborne transmission particularly dangerous in healthcare settings. The organisms capable of airborne transmission include Mycobacterium tuberculosis (TB), Measles virus (Rubeola), Varicella-Zoster Virus (VZV — Chickenpox and Disseminated Herpes Zoster), and in some circumstances, Smallpox. Airborne precautions require the most rigorous environmental controls of any transmission-based precaution category, including Airborne Infection Isolation Rooms (AIIR) with negative pressure ventilation, HEPA filtration, and the use of N95 respirators or Powered Air-Purifying Respirators (PAPRs) by all persons entering the room. The negative pressure system ensures that air flows INTO the room from the hallway (rather than out), preventing contaminated air from escaping into corridors and adjacent spaces. AIIR rooms must maintain 6-12 air changes per hour, with air exhausted directly to the outside or recirculated through HEPA filtration." },
    signs: {
      left: ["Airborne particles <5 microns remain suspended in air indefinitely and travel long distances on air currents — can infect individuals who never had direct contact with the source patient", "Conditions requiring airborne precautions: Tuberculosis (pulmonary/laryngeal), Measles (Rubeola), Varicella (Chickenpox), Disseminated Herpes Zoster (Shingles crossing dermatomes or in immunocompromised)", "TB-Specific Signs: Persistent cough >2-3 weeks, hemoptysis, night sweats, unexplained weight loss, low-grade fever, fatigue. High-risk populations: immunocompromised (HIV), homeless, incarcerated, close contacts, immigrants from endemic areas", "Measles Signs: High fever (often >104°F/40°C), cough, coryza (runny nose), conjunctivitis ('3 C's'), Koplik spots (blue-white spots on buccal mucosa — pathognomonic), maculopapular rash starting on face and spreading downward", "Varicella Signs: Pruritic vesicular rash in successive crops (lesions in different stages — macule, papule, vesicle, crust), low-grade fever, malaise. Infectious from 1-2 days before rash until ALL lesions have crusted over"],
      right: ["AIIR (Airborne Infection Isolation Room) Requirements: Negative pressure (air flows IN from hallway), 6-12 air changes per hour, air exhausted directly outside or through HEPA filter, door MUST remain closed at all times, monitor negative pressure daily", "N95 Respirator: MUST be fit-tested annually and with each new model/size. User seal check performed EVERY time it is donned. Filters ≥95% of particles ≥0.3 microns. If fit test fails → use PAPR (Powered Air-Purifying Respirator)", "PAPR (Powered Air-Purifying Respirator): Battery-powered unit with blower, HEPA filters, and loose-fitting hood/helmet. Alternative for those who cannot wear N95 (facial hair, failed fit test, respiratory conditions). Does NOT require fit testing", "Patient Transport: Limit to medically essential only. Place a surgical mask on the PATIENT before transport (source control). Notify receiving department in advance so they can prepare. Patient does NOT need N95 — surgical mask contains their respiratory secretions", "TB Management: Diagnosis confirmed by AFB (Acid-Fast Bacilli) sputum cultures (3 specimens, early morning, 8-24 hours apart). Treatment: RIPE therapy (Rifampin, Isoniazid, Pyrazinamide, Ethambutol) for 6-9 months minimum. Patient remains in isolation until 3 consecutive negative AFB sputum cultures"]
    },
    medications: [
      { name: "N95 Respirator", type: "NIOSH-Approved Particulate Respirator (PPE)", action: "Provides tight-fitting respiratory protection by filtering at least 95% of airborne particles 0.3 microns or larger through electrostatic and mechanical filtration media, preventing inhalation of infectious droplet nuclei containing airborne pathogens", sideEffects: "Increased work of breathing (especially during prolonged use or physical exertion), facial pressure injuries with extended wear, heat buildup, claustrophobic sensation, impaired verbal communication, skin breakdown on nasal bridge", contra: "Facial hair in seal area (prevents adequate seal), failed fit test for specific model, severe respiratory compromise where increased work of breathing is dangerous — use PAPR as alternative", pearl: "Fit testing is MANDATORY — annually and whenever a new model/size is used. Before each use, perform a user seal check: positive pressure check (exhale sharply — air should not leak around edges) and negative pressure check (inhale — respirator should collapse slightly toward face). A surgical mask does NOT provide airborne protection. TB, measles, and varicella ALWAYS require N95 or PAPR." },
      { name: "RIPE Therapy (Rifampin, Isoniazid, Pyrazinamide, Ethambutol)", type: "Anti-Tuberculosis Combination Regimen", action: "Multi-drug regimen targeting Mycobacterium tuberculosis through complementary mechanisms: Rifampin inhibits RNA synthesis, Isoniazid (INH) inhibits mycolic acid synthesis (cell wall), Pyrazinamide disrupts membrane function in acidic environments, Ethambutol inhibits cell wall synthesis — combination prevents drug resistance development", sideEffects: "Rifampin: Orange-red discoloration of body fluids (urine, tears, sweat — educate patient this is expected), hepatotoxicity, drug interactions (induces CYP450). Isoniazid: Peripheral neuropathy (give pyridoxine/B6 to prevent), hepatotoxicity. Pyrazinamide: Hepatotoxicity, hyperuricemia. Ethambutol: Optic neuritis (visual acuity changes, color blindness — report immediately)", contra: "Active liver disease (relative — monitor closely), known hypersensitivity to any component, Ethambutol in children too young for visual acuity testing (unable to report vision changes)", pearl: "RIPE therapy is the initial intensive phase (2 months of all 4 drugs), followed by continuation phase (4-7 months of Rifampin + Isoniazid). Directly Observed Therapy (DOT) is recommended — patient takes medication in the presence of a healthcare worker to ensure adherence. Treatment is a minimum of 6 months. Patients remain in airborne isolation until 3 consecutive negative AFB sputum cultures. Always give Pyridoxine (Vitamin B6) with Isoniazid to prevent peripheral neuropathy." },
      { name: "PAPR (Powered Air-Purifying Respirator)", type: "Powered Respiratory Protection Device (PPE)", action: "Uses a battery-powered blower to draw ambient air through HEPA filters and deliver purified air into a loose-fitting hood or helmet, providing respiratory protection against airborne pathogens without requiring a tight facial seal", sideEffects: "Heavy and cumbersome (battery pack worn on belt/back), noise from blower motor impairs communication, battery life limitations (must be charged and tested before use), requires training for proper use and decontamination", contra: "Must not be used in oxygen-deficient atmospheres (<19.5% O2) — PAPR is an air-purifying device, not a supplied-air device", pearl: "PAPR is the alternative for staff who cannot achieve adequate N95 fit (facial hair, certain facial structures, failed fit test) or who have respiratory conditions making N95 breathing difficult. PAPR does NOT require fit testing. Provides higher assigned protection factor (APF 25-1000) compared to N95 (APF 10). Must be properly decontaminated between uses per manufacturer instructions." }
    ],
    pearls: ["Remember 'MTV' for airborne organisms: Measles, TB, Varicella. These are the key airborne-transmitted infections requiring N95/PAPR and negative pressure rooms.", "The AIIR door must remain CLOSED at all times — opening the door disrupts negative pressure and allows contaminated air to escape into the hallway. Minimize entries and exits. Combine care activities to reduce door openings.", "N95 fit testing is not optional — it is a regulatory requirement (OSHA). Annual fit testing AND a user seal check with every donning are both mandatory. A poorly fitting N95 provides no more protection than a surgical mask.", "TB isolation continues until the patient has 3 consecutive negative AFB sputum cultures (collected 8-24 hours apart, early morning specimens). A single negative culture is NOT sufficient to discontinue airborne precautions.", "When transporting an airborne-precaution patient, place a surgical mask on the PATIENT (not an N95 — the purpose is source control, not filtration). The patient does not need to wear an N95 respirator."],
    quiz: [{ question: "A patient with suspected active pulmonary tuberculosis is admitted. Which room assignment is MOST appropriate?", options: ["Semi-private room with a curtain between beds and droplet precautions", "Private room with positive pressure ventilation", "Airborne Infection Isolation Room (AIIR) with negative pressure ventilation and the door kept closed", "Any private room with standard precautions and a surgical mask on the patient"], correct: 2, rationale: "A patient with suspected or confirmed active pulmonary TB requires an Airborne Infection Isolation Room (AIIR) with NEGATIVE pressure ventilation. Negative pressure ensures that air flows INTO the room from the hallway (not out), preventing TB-contaminated air from entering corridors and other patient areas. The room must maintain 6-12 air changes per hour with air exhausted directly outside or through HEPA filtration. The door must remain closed at all times to maintain negative pressure. Positive pressure rooms are used for immunocompromised patients (e.g., bone marrow transplant) — this is the opposite of what a TB patient needs. All persons entering must wear a properly fit-tested N95 respirator or PAPR." }]
  },
  "droplet-precautions": {
    title: "Droplet Precautions (RN Level)",
    cellular: { title: "Pathophysiology of Droplet Transmission", content: "Droplet transmission occurs when infectious agents are carried within large respiratory droplets — particles greater than 5 microns in diameter — that are generated when an infected person coughs, sneezes, talks, or undergoes certain respiratory procedures (suctioning, bronchoscopy). Unlike airborne particles, these larger droplets are heavy and do NOT remain suspended in the air. They travel short distances (typically 3-6 feet or approximately 1-2 meters) before gravity pulls them down to surfaces. Because droplets do not remain airborne, they require close proximity to the source for transmission. This is the critical distinction from airborne transmission: droplet particles are larger, heavier, travel shorter distances, and do NOT require negative pressure rooms or N95 respirators. A standard surgical mask worn within 6 feet (or upon entering the room, per most facility policies) provides adequate protection. Conditions transmitted by the droplet route include Influenza, Pertussis (Whooping Cough), Meningococcal Meningitis (Neisseria meningitidis), Mumps, Rubella (German Measles), Streptococcal Pharyngitis (Group A Strep), Respiratory Syncytial Virus (RSV — in some guidelines categorized as contact+droplet), and Mycoplasma pneumoniae. Private rooms are preferred but cohorting patients with the same organism is acceptable. No special air handling (negative pressure, HEPA filtration) is required because the particles do not remain airborne." },
    signs: {
      left: ["Droplet particles >5 microns — larger and heavier than airborne particles, affected by gravity, fall to surfaces within 3-6 feet of the source", "Generated by: Coughing, sneezing, talking, singing, and respiratory procedures (suctioning, nebulizer treatments, bronchoscopy)", "Key distinction from airborne: Droplets do NOT remain suspended in air, do NOT travel long distances, do NOT require negative pressure rooms or N95 respirators", "Conditions requiring droplet precautions: Influenza, Pertussis (Whooping Cough), Meningococcal Meningitis, Mumps, Rubella, Streptococcal Pharyngitis, Mycoplasma pneumoniae", "Pertussis-specific: Paroxysmal (severe, uncontrollable) coughing spells followed by inspiratory 'whoop,' post-tussive vomiting. Most dangerous in unimmunized infants. Droplet precautions for 5 days after effective antibiotic therapy begins"],
      right: ["PPE Required: Surgical mask worn within 6 feet of patient (many facilities require upon room entry). Add eye protection if splash/spray anticipated. Gown and gloves per standard precautions based on anticipated contact", "Room: Private room PREFERRED. If unavailable, cohort patients with SAME infectious organism. Maintain spatial separation of >3 feet between patients. Draw privacy curtain between beds", "NO negative pressure room required — this is a KEY distinguishing factor from airborne precautions. Regular room ventilation is adequate because droplets do not remain suspended", "Patient Transport: Limit to medically essential. Place a surgical mask on the PATIENT before leaving the room (source control). Notify receiving area of droplet precaution status before transport", "Meningococcal Meningitis: Droplet precautions until 24 hours after initiation of effective antibiotic therapy. Close contacts may need chemoprophylaxis (Rifampin, Ciprofloxacin, or Ceftriaxone). Report to public health authorities"]
    },
    medications: [
      { name: "Surgical Mask (Droplet Protection)", type: "Fluid-Resistant Procedure Mask (PPE)", action: "Creates a physical barrier that captures large respiratory droplets (>5 microns) expelled by coughing, sneezing, or talking before they reach the wearer's nose and mouth, and prevents the wearer's respiratory secretions from reaching the patient", sideEffects: "Moisture accumulation reduces filtration effectiveness (replace when damp), skin irritation behind ears, impaired communication, does NOT filter particles <5 microns (not adequate for airborne precautions)", contra: "Must NOT be used as a substitute for N95 respirator when airborne precautions are required (TB, measles, varicella) — does not filter droplet nuclei <5 microns", pearl: "A surgical mask is adequate for DROPLET precautions because the particles are >5 microns and do not remain airborne. Wear the mask when within 6 feet of the patient (or upon room entry per facility policy). Replace the mask if it becomes wet, soiled, or damaged. When transporting a patient on droplet precautions, place a surgical mask on the PATIENT (source control). Key exam question: Surgical mask = droplet precautions; N95 = airborne precautions." },
      { name: "Oseltamivir (Tamiflu)", type: "Neuraminidase Inhibitor (Antiviral)", action: "Inhibits the influenza neuraminidase enzyme, preventing the release of newly formed viral particles from infected host cells, thereby limiting viral spread within the respiratory tract and reducing the duration and severity of influenza symptoms", sideEffects: "Nausea and vomiting (most common — take with food to reduce GI effects), headache, rare neuropsychiatric events (confusion, self-harm — monitor especially in adolescents/children)", contra: "Known hypersensitivity to oseltamivir, severe renal impairment (dose adjustment required for CrCl <30 mL/min), not a substitute for annual influenza vaccination", pearl: "Most effective when started within 48 hours of symptom onset — every hour of delay reduces effectiveness. Used for treatment (5-day course) and post-exposure prophylaxis (10-day course) of influenza A and B. Available in oral capsules and liquid suspension. Does NOT replace droplet precautions — the patient remains on droplet precautions per facility protocol. Influenza vaccination is ALWAYS the primary prevention strategy." },
      { name: "Meningococcal Chemoprophylaxis (Rifampin/Ciprofloxacin/Ceftriaxone)", type: "Antibiotic Prophylaxis for Close Contacts", action: "Eradicates nasopharyngeal carriage of Neisseria meningitidis in close contacts of confirmed meningococcal meningitis cases, preventing secondary transmission. Rifampin disrupts RNA synthesis; Ciprofloxacin inhibits DNA gyrase; Ceftriaxone inhibits cell wall synthesis", sideEffects: "Rifampin: Orange discoloration of body fluids (expected), hepatotoxicity, numerous drug interactions. Ciprofloxacin: Tendon rupture risk (especially in elderly/corticosteroid users), QT prolongation, photosensitivity. Ceftriaxone: Pain at IM injection site, allergic reaction (cross-reactivity with penicillin allergy)", contra: "Rifampin: Pregnancy (teratogenic), concurrent protease inhibitors. Ciprofloxacin: Pregnancy, children (relative — risk of cartilage damage). Ceftriaxone: Severe cephalosporin/penicillin allergy", pearl: "Chemoprophylaxis should be initiated as soon as possible (ideally within 24 hours) for close contacts of confirmed meningococcal meningitis — household members, daycare contacts, anyone with direct exposure to respiratory secretions (kissing, mouth-to-mouth, intubation without mask). Healthcare workers using proper PPE (surgical mask) do NOT typically require prophylaxis. Reporting to public health is MANDATORY." }
    ],
    pearls: ["KEY distinction: Droplet precautions require a surgical mask; Airborne precautions require an N95 respirator. Droplets are larger (>5 microns), heavier, and fall within 3-6 feet. Airborne particles are smaller (<5 microns) and remain suspended.", "No negative pressure room is needed for droplet precautions — this is a critical differentiator from airborne precautions. Regular room ventilation is adequate because droplets do not remain suspended in the air.", "Memory aid for common droplet organisms: 'My Flu Is Spreading, Please Stop' — Meningococcal meningitis, Flu (Influenza), Invasive group A strep, Streptococcal pharyngitis, Pertussis, Strep pneumoniae.", "Meningococcal meningitis requires droplet precautions until 24 hours after effective antibiotic therapy AND close contact prophylaxis. This is a PUBLIC HEALTH EMERGENCY requiring immediate reporting.", "Patient transport on droplet precautions: Place a surgical mask on the PATIENT before transport (source control). The patient does not wear an N95 — the surgical mask contains their droplets. Notify the receiving department of precaution status before the patient arrives."],
    quiz: [{ question: "What is the KEY difference between airborne and droplet precautions?", options: ["Airborne requires contact precautions but droplet does not", "Airborne requires a negative pressure room and N95 respirator; droplet requires a surgical mask and no special ventilation", "Droplet requires a negative pressure room; airborne requires only a surgical mask", "There is no difference — both require the same precautions"], correct: 1, rationale: "The KEY difference is that airborne precautions require a negative pressure room (AIIR) and N95 respirator or PAPR, while droplet precautions require only a surgical mask and no special air handling. This is because airborne particles (<5 microns) remain suspended in the air and travel long distances, requiring engineered controls (negative pressure, HEPA filtration) and high-level respiratory protection (N95). Droplet particles (>5 microns) are heavier, fall to surfaces within 3-6 feet, and do not remain airborne, so a surgical mask provides adequate protection and no special ventilation is needed. This distinction is HIGH-YIELD for NCLEX and clinical practice." }]
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
