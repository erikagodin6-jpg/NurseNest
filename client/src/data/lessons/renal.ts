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

  "glomerulonephritis-basics-rpn": {
    title: "Acute Postinfectious Glomerulonephritis (RPN)",
    cellular: {
      title: "Glomerulonephritis Overview",
      content: "Acute postinfectious glomerulonephritis (APIGN) is an inflammatory condition of the glomeruli that occurs 1-3 weeks after a group A beta-hemolytic streptococcal infection, most commonly pharyngitis or impetigo. The immune system produces antibodies against the streptococcal antigens, and these antibody-antigen complexes deposit in the glomerular basement membrane, triggering inflammation and damage. This impairs the kidney's ability to filter blood properly, leading to fluid retention, hypertension, and characteristic cola-colored or tea-colored urine from blood leaking through the damaged glomeruli. The condition is most common in children ages 5-12 and is usually self-limiting with supportive care."
    },
    riskFactors: [
      "Recent group A streptococcal pharyngitis (1-2 weeks prior) or skin infection/impetigo (3-6 weeks prior)",
      "Age 5-12 years (peak incidence in school-age children)",
      "Male sex (twice as common in males)",
      "Crowded living conditions or close-contact settings (schools, daycare)",
      "Inadequate treatment of streptococcal infections",
      "Low socioeconomic status and limited healthcare access"
    ],
    diagnostics: [
      "Monitor and document urine color (report cola-colored, tea-colored, or smoky urine)",
      "Monitor vital signs with focus on blood pressure (report hypertension)",
      "Weigh patient daily and report weight gain trends",
      "Monitor intake and output strictly",
      "Observe for edema (periorbital edema is a hallmark finding, especially in the morning)",
      "Report decreased urine output to RN or provider immediately"
    ],
    management: [
      "Maintain bed rest during the acute phase as ordered",
      "Implement fluid restriction as ordered and monitor compliance",
      "Provide sodium-restricted diet as ordered",
      "Administer prescribed antihypertensives as ordered",
      "Administer prescribed diuretics as ordered to manage fluid overload",
      "Administer antibiotics as ordered if active streptococcal infection is present",
      "Report signs of worsening renal function (decreasing output, increasing edema, rising BP)"
    ],
    nursingActions: [
      "Monitor and document urine color and volume every shift",
      "Assess for periorbital edema (most prominent in the morning) and peripheral edema",
      "Weigh patient daily at the same time on the same scale",
      "Monitor blood pressure at least every 4 hours and report elevated readings",
      "Maintain strict intake and output records",
      "Educate family about fluid and sodium restrictions",
      "Report signs of complications: severe headache, seizures, visual changes (hypertensive encephalopathy)"
    ],
    signs: {
      left: [
        "Cola-colored, tea-colored, or smoky urine (gross hematuria)",
        "Periorbital edema (especially in the morning upon waking)",
        "Hypertension",
        "Decreased urine output (oliguria)"
      ],
      right: [
        "Peripheral edema (face, hands, feet)",
        "Fatigue and malaise",
        "Mild abdominal or flank pain",
        "Headache associated with hypertension"
      ]
    },
    medications: [
      {
        name: "Furosemide (Lasix)",
        type: "Loop diuretic",
        action: "Inhibits sodium and chloride reabsorption in the loop of Henle, promoting excretion of excess fluid to manage edema and hypertension",
        sideEffects: "Hypokalemia, dehydration, hypotension, ototoxicity (with rapid IV administration)",
        contra: "Anuria unresponsive to fluid challenge, severe electrolyte depletion",
        pearl: "Monitor potassium levels closely during diuretic therapy. Report decreased urine output despite diuretic administration as this may indicate worsening renal function."
      }
    ],
    pearls: [
      "The classic triad of APIGN is cola-colored urine, periorbital edema, and hypertension occurring 1-3 weeks after a streptococcal infection",
      "Periorbital edema is often the first sign noticed by parents and is most prominent in the morning",
      "Most children with APIGN recover completely within 1-2 weeks with supportive care - monitor closely for complications such as hypertensive encephalopathy and acute kidney injury"
    ],
    quiz: [
      {
        question: "A 7-year-old child presents with periorbital edema, cola-colored urine, and elevated blood pressure 2 weeks after being treated for strep throat. Which condition should the RPN suspect?",
        options: [
          "Urinary tract infection",
          "Acute postinfectious glomerulonephritis",
          "Nephrotic syndrome",
          "Dehydration from inadequate fluid intake"
        ],
        correct: 1,
        rationale: "The triad of cola-colored urine (hematuria), periorbital edema, and hypertension occurring 1-3 weeks after a streptococcal infection is the classic presentation of acute postinfectious glomerulonephritis. This condition results from immune complex deposition in the glomeruli following streptococcal infection."
      }
    ]
  },

  "acute-glomerulonephritis": {
    title: "Acute Postinfectious Glomerulonephritis (RN)",
    cellular: {
      title: "Immunopathology of Acute Postinfectious Glomerulonephritis",
      content: "Acute postinfectious glomerulonephritis (APIGN) is a Type III hypersensitivity reaction triggered by group A beta-hemolytic streptococcal (GAS) infection. Following pharyngitis (latency 1-2 weeks) or skin infection (latency 3-6 weeks), the immune system generates antibodies against nephritogenic streptococcal antigens including streptococcal pyrogenic exotoxin B (SPE B) and nephritis-associated plasmin receptor (NAPlr). These circulating immune complexes (antigen-antibody-complement) deposit within the glomerular basement membrane (GBM) and mesangium, activating the classical complement pathway. Complement activation consumes C3, producing C3a and C5a anaphylatoxins that recruit neutrophils and macrophages to the glomerulus. The resulting inflammatory cascade damages the GBM, increases its permeability to proteins and red blood cells (causing proteinuria and hematuria), and reduces the glomerular filtration rate (GFR). Mesangial cell proliferation and endothelial cell swelling further compromise filtration. The reduced GFR causes sodium and water retention, leading to edema, circulatory congestion, and hypertension through volume expansion. Subepithelial electron-dense deposits (humps) visible on electron microscopy are the characteristic ultrastructural finding. The complement consumption pattern shows decreased C3 with normal C4 levels, distinguishing APIGN from lupus nephritis (which shows decreased C3 and C4)."
    },
    riskFactors: [
      "Recent GAS pharyngitis (M protein serotypes 1, 2, 4, 12) or impetigo (M protein serotypes 49, 55, 57)",
      "Age 5-12 years with peak incidence at ages 6-7",
      "Male sex (2:1 male-to-female ratio)",
      "Crowded living conditions facilitating streptococcal transmission",
      "Low socioeconomic status with limited access to early antibiotic treatment",
      "Endemic areas with high streptococcal prevalence",
      "Immunocompromised patients with impaired bacterial clearance"
    ],
    diagnostics: [
      "Urinalysis revealing dysmorphic red blood cells and red blood cell casts (pathognomonic for glomerular origin bleeding)",
      "Elevated ASO titer (anti-streptolysin O) confirming recent streptococcal infection - peaks at 3-5 weeks post-pharyngitis",
      "Anti-DNase B antibody (more sensitive for post-impetigo APIGN than ASO titer)",
      "Serum complement levels: decreased C3 with normal C4 (classical pathway activation with alternative pathway amplification)",
      "Elevated BUN and creatinine indicating reduced GFR",
      "Complete metabolic panel monitoring potassium (risk of hyperkalemia with decreased GFR)",
      "Renal ultrasound showing bilaterally enlarged, echogenic kidneys",
      "Throat culture or rapid strep test if active pharyngitis suspected"
    ],
    management: [
      "Sodium and fluid restriction to manage volume overload and hypertension",
      "Loop diuretics (furosemide) for significant edema and fluid overload",
      "Antihypertensive therapy: calcium channel blockers (amlodipine) or ACE inhibitors for persistent hypertension exceeding the 95th percentile for age",
      "Complete antibiotic course (penicillin or amoxicillin) to eradicate residual streptococcal infection and prevent transmission",
      "Potassium restriction if hyperkalemia develops with declining GFR",
      "Activity restriction during acute phase with gradual return to activity as hematuria resolves",
      "Dialysis in rare cases of severe oliguria, refractory hyperkalemia, or pulmonary edema unresponsive to diuretics"
    ],
    nursingActions: [
      "Monitor blood pressure every 2-4 hours and immediately report readings above the 95th percentile for age",
      "Maintain strict intake and output with hourly urine output monitoring during acute phase",
      "Assess urine for color changes (document progression from cola-colored to clearing)",
      "Weigh patient daily at the same time and report rapid weight gain (greater than 0.5 kg/day in children)",
      "Assess for signs of hypertensive encephalopathy: severe headache, vomiting, visual disturbances, altered level of consciousness, seizures",
      "Monitor for signs of heart failure from volume overload: tachycardia, gallop rhythm, jugular venous distension, pulmonary crackles",
      "Educate family that gross hematuria typically resolves within 1-2 weeks but microscopic hematuria may persist for 1-2 years",
      "Reinforce importance of completing antibiotic therapy and follow-up complement level monitoring"
    ],
    signs: {
      left: [
        "Cola-colored or smoky urine (gross hematuria from GBM damage)",
        "Periorbital and facial edema (most prominent in morning due to gravity redistribution during sleep)",
        "Hypertension from sodium and water retention (volume-dependent mechanism)",
        "Oliguria (decreased GFR reducing urine production)"
      ],
      right: [
        "Elevated ASO titer confirming recent streptococcal infection",
        "Decreased serum C3 with normal C4 (complement consumption pattern)",
        "Red blood cell casts in urine (pathognomonic for glomerulonephritis)",
        "Pulmonary crackles and jugular venous distension (circulatory congestion from volume overload)"
      ]
    },
    medications: [
      {
        name: "Furosemide (Lasix)",
        type: "Loop diuretic",
        action: "Inhibits the sodium-potassium-2 chloride cotransporter (NKCC2) in the thick ascending limb of the loop of Henle, blocking sodium and water reabsorption and producing potent diuresis to manage volume overload, edema, and hypertension in APIGN",
        sideEffects: "Hypokalemia, hyponatremia, metabolic alkalosis, dehydration, ototoxicity (especially with rapid IV push or concurrent aminoglycoside use)",
        contra: "Anuria unresponsive to test dose, severe electrolyte depletion, hepatic coma",
        pearl: "In APIGN, monitor potassium closely as the patient may already have impaired potassium excretion from reduced GFR - the combination of furosemide-induced potassium loss and disease-related potassium retention requires careful electrolyte trending."
      },
      {
        name: "Penicillin V or Amoxicillin",
        type: "Beta-lactam antibiotic",
        action: "Inhibits bacterial cell wall synthesis by binding penicillin-binding proteins, eradicating residual GAS organisms to prevent ongoing antigen exposure and reduce transmission to close contacts",
        sideEffects: "Hypersensitivity reaction, rash, GI upset, diarrhea, anaphylaxis (rare)",
        contra: "Known penicillin allergy (use azithromycin as alternative), mononucleosis (amoxicillin causes characteristic rash)",
        pearl: "Antibiotic therapy does not reverse or shorten the course of established glomerulonephritis - it eliminates the streptococcal source to prevent further immune complex formation and stops transmission to others. Verify penicillin allergy status before administration."
      }
    ],
    pearls: [
      "The complement pattern in APIGN (low C3, normal C4) distinguishes it from lupus nephritis (low C3 AND low C4) - this is a high-yield differentiation point for exams",
      "Red blood cell casts in the urine are pathognomonic for glomerulonephritis and indicate that bleeding is originating from the glomeruli, not the lower urinary tract",
      "APIGN has an excellent prognosis in children with greater than 95% complete recovery - adults have higher rates of residual renal impairment and should receive longer follow-up monitoring of renal function and proteinuria"
    ],
    quiz: [
      {
        question: "A 6-year-old child is admitted with periorbital edema, cola-colored urine, and blood pressure of 148/96 mmHg two weeks after pharyngitis. Laboratory results show decreased C3, normal C4, elevated ASO titer, and RBC casts in urine. Which pathophysiologic mechanism is responsible for this presentation?",
        options: [
          "Type I (immediate) hypersensitivity reaction causing mast cell degranulation in the glomeruli",
          "Type III hypersensitivity with immune complex deposition in the glomerular basement membrane and complement activation",
          "Direct streptococcal bacterial invasion and colonization of the renal parenchyma",
          "Autoantibody formation against the glomerular basement membrane (anti-GBM disease)"
        ],
        correct: 1,
        rationale: "APIGN is a Type III hypersensitivity reaction in which circulating immune complexes (streptococcal antigen-antibody-complement) deposit in the glomerular basement membrane. This activates the complement cascade (consuming C3), recruits inflammatory cells, and damages the GBM, causing hematuria, proteinuria, edema, and hypertension. The low C3 with normal C4 and elevated ASO titer confirm post-streptococcal immune complex-mediated disease."
      }
    ]
  },

  "acute-glomerulonephritis-np": {
    title: "Acute Postinfectious Glomerulonephritis - Advanced Immunopathology (NP)",
    cellular: {
      title: "Molecular Immunopathology of APIGN",
      content: "Acute postinfectious glomerulonephritis (APIGN) represents a prototype of immune complex-mediated glomerular disease driven by the host immune response to nephritogenic strains of group A Streptococcus (GAS). The molecular pathogenesis involves formation of circulating IgG and IgA immune complexes against specific nephritogenic antigens, primarily nephritis-associated plasmin receptor (NAPlr) and streptococcal pyrogenic exotoxin B (SPE B). NAPlr binds plasmin and localizes to the glomerulus where it activates the complement cascade through the alternative pathway, generating C3 convertase (C3bBb) that cleaves C3 into C3a (anaphylatoxin) and C3b (opsonin). C3b deposition on the glomerular basement membrane amplifies through the alternative pathway feedback loop, while C5 convertase generates C5a (a potent neutrophil chemoattractant) and initiates formation of the membrane attack complex (C5b-9). The inflammatory cascade proceeds through Fc receptor-mediated mechanisms: deposited IgG immune complexes engage Fc-gamma receptors (FcγRIII and FcγRIV) on infiltrating neutrophils and macrophages, triggering release of reactive oxygen species, matrix metalloproteinases, and pro-inflammatory cytokines (TNF-alpha, IL-1beta, IL-6). Podocyte injury occurs through both complement-mediated cytotoxicity (sublytic C5b-9 insertion disrupting slit diaphragm integrity) and neutrophil-derived proteases degrading nephrin and podocin proteins. Mesangial cell proliferation is driven by platelet-derived growth factor (PDGF) and transforming growth factor-beta (TGF-beta) released from activated macrophages and damaged endothelial cells. On electron microscopy, the pathognomonic subepithelial electron-dense deposits (humps) represent in situ immune complex formation on the outer surface of the GBM, corresponding to the granular (lumpy-bumpy) pattern of IgG and C3 deposition seen on immunofluorescence microscopy. Light microscopy demonstrates diffuse endocapillary proliferative glomerulonephritis with neutrophilic infiltration. The distinction between isolated C3 glomerulonephritis (C3 glomerulopathy) and APIGN is critical: C3 glomerulopathy involves dysregulation of the alternative complement pathway (often from C3 nephritic factor autoantibody or factor H mutations) and carries a worse prognosis with high recurrence rates, whereas APIGN is self-limiting with complement normalization within 6-8 weeks."
    },
    riskFactors: [
      "Infection with nephritogenic GAS strains expressing M protein types 1, 2, 4, 12 (pharyngitis-associated) or types 49, 55, 57 (impetigo-associated)",
      "Host genetic susceptibility: HLA-DRw4 association and polymorphisms in complement regulatory genes (factor H, factor I, membrane cofactor protein)",
      "Delayed or inadequate antibiotic treatment of streptococcal infection allowing prolonged antigen exposure",
      "Immunocompromised states with impaired bacterial clearance (HIV, diabetes mellitus, alcohol use disorder)",
      "Adult-onset disease (poorer prognosis than pediatric APIGN with 25-50% developing chronic renal insufficiency)",
      "Concurrent IgA nephropathy (synpharyngitic hematuria occurs within days of infection versus 1-3 week latency in APIGN)",
      "Endocarditis-associated glomerulonephritis (Staphylococcus aureus) as differential diagnosis in adults with sustained bacteremia"
    ],
    diagnostics: [
      "Renal biopsy with light microscopy showing diffuse endocapillary proliferative glomerulonephritis with neutrophilic infiltration and mesangial hypercellularity",
      "Immunofluorescence microscopy demonstrating granular (lumpy-bumpy) deposition of IgG and C3 along the GBM and in the mesangium (starry sky pattern)",
      "Electron microscopy revealing subepithelial electron-dense deposits (humps) - pathognomonic ultrastructural finding",
      "Serum complement panel: decreased C3 (consumed through alternative pathway amplification), normal C4 (classical pathway not predominantly involved), decreased CH50 (total hemolytic complement activity)",
      "ASO titer (elevated 1-3 weeks post-pharyngitis, peaks at 3-5 weeks) and anti-DNase B antibody (more sensitive for post-impetigo APIGN, elevated for 6-8 weeks)",
      "Streptozyme test (detects antibodies to multiple streptococcal antigens: ASO, anti-DNase B, anti-hyaluronidase, anti-streptokinase, anti-NADase)",
      "Urine microscopy: dysmorphic RBCs (glomerular origin), RBC casts, and proteinuria (typically subnephrotic range, less than 3.5 g/day)",
      "Serial complement C3 levels to confirm normalization within 6-8 weeks (persistent hypocomplementemia beyond 8 weeks suggests C3 glomerulopathy, membranoproliferative GN, or lupus nephritis requiring biopsy)"
    ],
    management: [
      "Eradication of streptococcal infection with penicillin V (250-500 mg BID-QID x 10 days) or amoxicillin (50 mg/kg/day divided BID x 10 days in children) - azithromycin for penicillin-allergic patients",
      "Volume management with loop diuretics (furosemide 1-2 mg/kg IV q6-12h in children) titrated to achieve euvolemia and blood pressure normalization",
      "Antihypertensive therapy for persistent hypertension: first-line calcium channel blockers (amlodipine 0.1-0.2 mg/kg/day in children, max 0.6 mg/kg/day) or ACE inhibitors (enalapril 0.08-0.6 mg/kg/day) with careful monitoring of potassium and creatinine",
      "Sodium restriction (1-2 g/day) and fluid restriction (insensible losses plus urine output) during oliguric phase",
      "Potassium restriction and kayexalate if hyperkalemia develops with declining GFR",
      "Urgent dialysis indications: refractory hyperkalemia (K+ greater than 6.5 mEq/L unresponsive to medical management), severe metabolic acidosis (pH less than 7.1), volume overload with pulmonary edema unresponsive to diuretics, uremic pericarditis or encephalopathy",
      "Immunosuppressive therapy (corticosteroids, cyclophosphamide) is NOT indicated in typical APIGN but may be considered in rapidly progressive (crescentic) variants with greater than 50% crescents on biopsy"
    ],
    nursingActions: [
      "Order and interpret comprehensive renal panel including electrolytes, BUN, creatinine, and GFR estimation",
      "Order and interpret complement levels (C3, C4, CH50) serially to track disease course and confirm resolution",
      "Order ASO titer and anti-DNase B to confirm streptococcal etiology",
      "Prescribe and titrate antihypertensives based on age-appropriate blood pressure percentile targets",
      "Prescribe diuretics and monitor response (urine output, weight, edema, electrolytes)",
      "Evaluate indications for nephrology referral and renal biopsy: atypical presentation, persistent hypocomplementemia beyond 8 weeks, progressive renal insufficiency, nephrotic-range proteinuria",
      "Differentiate APIGN from IgA nephropathy (synpharyngitic timing, normal complement, mesangial IgA on IF), C3 glomerulopathy (persistent low C3, C3 nephritic factor positive), anti-GBM disease (linear IgG on IF, anti-GBM antibodies), and lupus nephritis (low C3 AND C4, positive ANA and anti-dsDNA)",
      "Establish follow-up protocol: urinalysis and blood pressure monitoring at 2, 4, 8, and 12 weeks, then every 3 months until hematuria and proteinuria resolve completely"
    ],
    signs: {
      left: [
        "Gross hematuria (cola-colored urine from dysmorphic RBCs traversing damaged GBM)",
        "Periorbital and facial edema (nephritic edema from sodium/water retention, distinct from nephrotic hypoalbuminemic edema)",
        "Volume-dependent hypertension (from sodium and water retention, not RAAS activation)",
        "Oliguria with concentrated urine (reduced GFR from endocapillary proliferation)"
      ],
      right: [
        "Hypocomplementemia (C3 decreased, C4 normal) confirming alternative pathway activation",
        "Elevated ASO titer or anti-DNase B confirming recent streptococcal infection",
        "RBC casts and dysmorphic RBCs on urine microscopy (glomerular origin confirmation)",
        "Subepithelial humps on electron microscopy (pathognomonic ultrastructural finding)"
      ]
    },
    medications: [
      {
        name: "Furosemide",
        type: "Loop diuretic",
        action: "Inhibits NKCC2 cotransporter in the thick ascending limb, producing potent natriuresis and diuresis. In APIGN, addresses the primary pathogenic mechanism of volume overload by promoting sodium and water excretion to reduce edema, circulatory congestion, and volume-dependent hypertension",
        sideEffects: "Hypokalemia (may be blunted in APIGN due to concurrent renal potassium retention), ototoxicity (dose-dependent, potentiated by aminoglycosides), metabolic alkalosis, hypocalcemia, hyperuricemia",
        contra: "Anuria unresponsive to test dose (indicates need for dialysis rather than diuretic escalation), hepatorenal syndrome",
        pearl: "In APIGN with reduced GFR, higher doses of furosemide may be required to achieve therapeutic diuresis because loop diuretics must reach the tubular lumen via organic anion secretion, which is impaired in renal insufficiency. If IV furosemide fails to produce adequate diuresis, consider adding metolazone (thiazide-like diuretic) for sequential nephron blockade before proceeding to dialysis."
      },
      {
        name: "Amlodipine",
        type: "Dihydropyridine calcium channel blocker",
        action: "Blocks L-type voltage-gated calcium channels in vascular smooth muscle, causing arterial vasodilation and reducing peripheral vascular resistance. Does not affect GFR or potassium handling, making it a safe first-line antihypertensive in APIGN where renal potassium excretion is already compromised",
        sideEffects: "Peripheral edema (may confound edema assessment in APIGN), headache, flushing, dizziness, reflex tachycardia",
        contra: "Severe aortic stenosis, cardiogenic shock, unstable angina",
        pearl: "Amlodipine is preferred over ACE inhibitors as initial antihypertensive in APIGN because it does not reduce GFR or risk hyperkalemia in patients with already-compromised potassium excretion. ACE inhibitors may be added after the acute phase resolves if proteinuria persists and renal function stabilizes."
      }
    ],
    pearls: [
      "The differential diagnosis of hypocomplementemic glomerulonephritis is critical: APIGN (transient low C3, normal C4, self-limiting), C3 glomerulopathy (persistent low C3, C3 nephritic factor or factor H mutations), MPGN (low C3 and/or C4 depending on type), lupus nephritis (low C3 AND C4, positive serology), and cryoglobulinemic GN (low C4 with normal or low C3, hepatitis C association)",
      "Persistent hypocomplementemia beyond 8 weeks after APIGN onset should trigger renal biopsy to evaluate for C3 glomerulopathy or membranoproliferative glomerulonephritis, as these conditions have fundamentally different treatment and prognosis",
      "The distinction between nephritic syndrome (hematuria, RBC casts, mild proteinuria, hypertension, edema from volume overload) and nephrotic syndrome (heavy proteinuria greater than 3.5 g/day, hypoalbuminemia, severe edema from oncotic pressure loss, hyperlipidemia) is foundational - APIGN is the prototype of nephritic syndrome"
    ],
    quiz: [
      {
        question: "A 7-year-old child with confirmed APIGN has been treated for 10 weeks. Repeat labs show persistent C3 hypocomplementemia and worsening proteinuria despite clinical improvement of edema and hypertension. What is the most appropriate next step?",
        options: [
          "Continue observation as APIGN is always self-limiting in children",
          "Start high-dose corticosteroids empirically for presumed minimal change disease",
          "Refer for renal biopsy to evaluate for C3 glomerulopathy or membranoproliferative glomerulonephritis",
          "Discontinue follow-up as complement levels are not clinically significant"
        ],
        correct: 2,
        rationale: "In typical APIGN, C3 levels should normalize within 6-8 weeks. Persistent hypocomplementemia beyond 8 weeks raises concern for C3 glomerulopathy (driven by alternative complement pathway dysregulation from C3 nephritic factor autoantibody or complement regulatory protein mutations) or membranoproliferative glomerulonephritis, which have different treatments and worse prognoses. Renal biopsy is indicated to establish the correct diagnosis and guide management."
      }
    ]
  }
};
