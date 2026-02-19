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
