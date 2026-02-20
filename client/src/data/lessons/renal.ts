import type { LessonContent } from "./types";

export const renalLessons: Record<string, LessonContent> = {
  "aki-management": {
    title: "Acute Kidney Injury (AKI)",
    cellular: { title: "Nephron Insult", content: "AKI is a sudden decrease in renal function. Pre-renal (perfusion), Intra-renal (damage), and Post-renal (obstruction). Prone to fluid overload and electrolyte shifts." },
    riskFactors: ["Hypovolemia/dehydration", "Nephrotoxic medications (NSAIDs, aminoglycosides, contrast dye)", "Diabetes mellitus", "Heart failure", "Sepsis", "Urinary tract obstruction", "Age > 65 years", "Chronic kidney disease", "Rhabdomyolysis"],
    diagnostics: ["Monitor BUN and creatinine trends", "Expect metabolic panel with potassium levels", "Monitor urine output hourly (report oliguria < 400 mL/day)", "Expect urinalysis to be ordered", "Monitor ECG for hyperkalemia changes (peaked T waves)", "Expect renal ultrasound if obstruction suspected"],
    management: ["Maintain strict fluid balance as ordered", "Avoid nephrotoxic medications (report NSAIDs, aminoglycosides)", "Administer prescribed medications for electrolyte correction", "Follow dietary restrictions (potassium, sodium, phosphorus) as ordered", "Maintain IV access as ordered", "Weigh patient daily at same time"],
    nursingActions: ["Monitor and document intake and output strictly", "Weigh patient daily and report trends", "Monitor potassium levels and report hyperkalemia immediately", "Assess for fluid overload (edema, crackles, JVD)", "Report decreased urine output immediately", "Monitor for signs of uremia (confusion, nausea, metallic taste)", "Educate patient on fluid and dietary restrictions"],
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
  "ckd-management": {
    title: "Chronic Kidney Disease (CKD) Management",
    cellular: { title: "Progressive Nephron Loss", content: "Progressive loss of nephron function over months to years. GFR staging: Stage 1 (>90, damage present), Stage 2 (60-89), Stage 3 (30-59), Stage 4 (15-29), Stage 5 (<15, ESRD requiring dialysis/transplant). Most common causes: Diabetes mellitus and Hypertension. Consequences: uremia, electrolyte imbalances, anemia (decreased EPO production), renal osteodystrophy (decreased Vitamin D activation)." },
    riskFactors: ["Diabetes mellitus (leading cause)","Hypertension (second leading cause)","Glomerulonephritis","Polycystic kidney disease","Recurrent kidney infections","Prolonged NSAID use","Family history of kidney disease","African American descent"],
    diagnostics: ["Monitor intake and output","Daily weight measurement","Vital signs with blood pressure trending","Monitor for edema (periorbital, peripheral)","Assess skin color (sallow, uremic frost)"],
    management: ["Administer prescribed medications as ordered","Restrict dietary sodium, potassium, and phosphorus as ordered","Maintain fluid restriction as ordered","Monitor for signs of fluid overload","Report significant changes in urine output"],
    nursingActions: ["Monitor strict intake and output","Weigh patient daily at same time, same scale, same clothing","Assess for signs of uremia (fatigue, nausea, confusion, pruritus)","Monitor for hyperkalemia symptoms (muscle weakness, ECG changes)","Educate on dietary restrictions (low sodium, potassium, phosphorus)","Report decreased urine output to RN/physician"],
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
    riskFactors: ["Crush injuries or prolonged immobilization","Strenuous exercise (especially in heat)","Statin therapy","Seizures (prolonged)","Drug/alcohol abuse","Electrical burns","Heatstroke","Compartment syndrome"],
    diagnostics: ["Urine color assessment (dark brown/tea-colored)","Vital signs monitoring","Monitor urine output closely","Assess for muscle pain, swelling, and tenderness","Report signs of compartment syndrome (5 P's)"],
    management: ["Administer aggressive IV normal saline as ordered","Maintain high urine output as ordered (target >200 mL/hr)","Administer sodium bicarbonate IV as ordered to alkalinize urine","Avoid nephrotoxic medications","Report decreasing urine output immediately"],
    nursingActions: ["Monitor urine output hourly (goal >200 mL/hr)","Assess urine color (dark brown = myoglobinuria)","Monitor for hyperkalemia symptoms (muscle weakness, cardiac irregularities)","Maintain strict intake and output","Report signs of compartment syndrome immediately (Pain, Pallor, Pulselessness, Paresthesia, Paralysis)","Monitor CK trends as reported"],
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
    riskFactors: ["End-stage renal disease requiring hemodialysis","Diabetes mellitus","Peripheral vascular disease","Previous failed access attempts","Hypotension during dialysis","Hypercoagulable states"],
    diagnostics: ["Palpate for thrill (buzzing vibration) over fistula","Auscultate for bruit (whooshing sound) over fistula","Assess distal pulses and capillary refill","Monitor for signs of infection at access site"],
    management: ["NO blood pressure, IV starts, or blood draws from fistula arm","Elevate arm post-creation to reduce swelling","Avoid tight clothing or jewelry on fistula arm","Report absent thrill or bruit immediately","Protect fistula arm from injury"],
    nursingActions: ["Assess thrill (palpate) and bruit (auscultate) every shift","Report ABSENT thrill or bruit immediately (indicates thrombosis)","Monitor distal circulation (pulses, sensation, temperature)","Educate patient on fistula arm protection","Avoid constrictive items on fistula arm","Apply pressure to puncture sites after dialysis as directed"],
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
    riskFactors: ["Diabetes mellitus","Peripheral vascular disease","Advanced age","Female sex","Upper arm fistula location","Previous access procedures","Atherosclerosis"],
    diagnostics: ["Assess distal perfusion (pulses, capillary refill, temperature)","Compare affected and unaffected hand for color and temperature","Assess hand grip strength bilaterally","Monitor for numbness and tingling in affected hand"],
    management: ["Keep affected extremity warm to promote circulation","Report progressive symptoms immediately to provider","Elevate hand as tolerated for comfort","Prepare patient for possible surgical revision if severe"],
    nursingActions: ["Assess distal circulation in fistula hand every shift","Compare bilateral hand temperature, color, and sensation","Report worsening pain, pallor, or weakness in affected hand","Monitor capillary refill time in affected fingers","Document and trend distal perfusion findings","Educate patient on signs to report (increasing numbness, pain, color changes)"],
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
};
