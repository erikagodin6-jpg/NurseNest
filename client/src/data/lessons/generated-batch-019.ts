import type { LessonContent } from "./types";

export const generatedBatch019Lessons: Record<string, LessonContent> = {
  "cholangiocarcinoma-np": {
    title: "Cholangiocarcinoma: Biliary Obstruction",
    cellular: { title: "Biliary Epithelial Malignant Transformation", content: "Cholangiocarcinoma arises from malignant transformation of cholangiocytes lining the intra- or extrahepatic bile ducts. Chronic inflammation from conditions such as primary sclerosing cholangitis (PSC), liver fluke infection, or hepatolithiasis drives repeated cycles of epithelial injury and repair, promoting oncogenic mutations (TP53, KRAS, IDH1/2). The tumor causes progressive biliary obstruction, leading to conjugated hyperbilirubinemia, cholestasis, and eventual hepatic dysfunction. Perihilar (Klatskin) tumors are the most common subtype." },
    riskFactors: ["Primary sclerosing cholangitis (PSC)", "Liver fluke infection (Opisthorchis, Clonorchis)", "Hepatolithiasis and choledochal cysts", "Chronic hepatitis B or C infection", "Cirrhosis from any cause", "Inflammatory bowel disease (especially ulcerative colitis)", "Thorotrast exposure", "Age > 65 years"],
    diagnostics: ["MRCP or ERCP to visualize biliary tree obstruction and stricture location", "CA 19-9 and CEA tumor markers (elevated in ~60% of cases)", "Liver function panel showing cholestatic pattern (elevated ALP, GGT, direct bilirubin)", "CT abdomen with contrast for staging and vascular involvement", "Brush cytology or biopsy via ERCP for tissue diagnosis", "PET-CT for distant metastasis evaluation"],
    management: ["Surgical resection (Whipple procedure or hepatectomy) for resectable tumors", "Biliary stenting via ERCP for palliation of obstructive jaundice", "Gemcitabine plus cisplatin as first-line systemic chemotherapy", "Percutaneous transhepatic biliary drainage if ERCP fails", "Liver transplantation considered for select perihilar cases after neoadjuvant chemoradiation", "IDH1 inhibitors (ivosidenib) for IDH1-mutated advanced disease"],
    nursingActions: ["Monitor for signs of cholangitis (Charcot triad: fever, jaundice, RUQ pain)", "Assess skin and sclera for progressive jaundice", "Monitor biliary drain output (color, amount, patency)", "Administer fat-soluble vitamin supplements (A, D, E, K) as ordered", "Monitor INR closely due to impaired vitamin K absorption", "Provide pruritus management (cholestyramine, cool compresses)"],
    assessmentFindings: ["Painless progressive jaundice (hallmark presentation)", "Dark urine (tea-colored) and clay-colored (acholic) stools", "Pruritus from bile salt deposition in skin", "Unintentional weight loss and anorexia", "Hepatomegaly; Courvoisier sign (palpable nontender gallbladder) with distal tumors"],
    signs: {
      left: ["Mild jaundice", "Pruritus", "Fatigue and malaise", "Elevated alkaline phosphatase", "Mild RUQ discomfort"],
      right: ["Deep jaundice with coagulopathy", "Cholangitis (fever, rigors, sepsis)", "Biliary obstruction with liver failure", "Ascites and portal hypertension", "Cachexia"]
    },
    medications: [{
      name: "Gemcitabine",
      type: "Antimetabolite chemotherapy",
      action: "Inhibits DNA synthesis by incorporating into replicating DNA strands as a nucleoside analog",
      sideEffects: "Myelosuppression, nausea, hepatotoxicity, flu-like symptoms",
      contra: "Severe hepatic or renal impairment, concurrent radiation to liver",
      pearl: "Combined with cisplatin (ABC-02 trial) as standard first-line for advanced cholangiocarcinoma"
    }],
    pearls: ["Painless jaundice in an older adult should prompt workup for pancreaticobiliary malignancy", "CA 19-9 is not specific—it is also elevated in cholangitis and pancreatitis", "Klatskin tumor (perihilar) is the most common location for cholangiocarcinoma", "PSC is the strongest Western risk factor—annual surveillance with MRCP is recommended", "Post-ERCP stenting: monitor for cholangitis and stent occlusion"],
    quiz: [
      {
        question: "A patient presents with painless jaundice, dark urine, and clay-colored stools. MRCP shows a stricture at the hepatic duct bifurcation. Which diagnosis is most likely?",
        options: ["Gallstone cholecystitis", "Perihilar cholangiocarcinoma (Klatskin tumor)", "Hepatocellular carcinoma", "Acute viral hepatitis"],
        correct: 1,
        rationale: "A stricture at the hepatic duct bifurcation with painless obstructive jaundice is classic for a Klatskin (perihilar cholangiocarcinoma) tumor."
      },
      {
        question: "Which tumor marker is most commonly elevated in cholangiocarcinoma?",
        options: ["AFP", "CA 19-9", "PSA", "CA-125"],
        correct: 1,
        rationale: "CA 19-9 is elevated in approximately 60% of cholangiocarcinoma cases, though it lacks specificity as it can also be elevated in other biliary and pancreatic conditions."
      },
      {
        question: "A patient with a biliary stent develops fever, rigors, and worsening jaundice. What is the priority intervention?",
        options: ["Administer antipyretics and monitor", "Obtain blood cultures and prepare for emergent ERCP for stent exchange", "Schedule outpatient follow-up in one week", "Increase oral fluid intake"],
        correct: 1,
        rationale: "Fever, rigors, and worsening jaundice after biliary stenting suggest ascending cholangitis from stent occlusion, requiring urgent blood cultures, IV antibiotics, and emergent ERCP."
      }
    ]
  },
  "cholangitis-np": {
    title: "Cholangitis: Charcot & Reynolds Pentad",
    cellular: { title: "Ascending Biliary Infection", content: "Acute cholangitis results from bacterial infection of the biliary tree, most commonly caused by obstruction from choledocholithiasis, strictures, or stent occlusion. Bile stasis proximal to the obstruction allows bacterial colonization (typically E. coli, Klebsiella, Enterococcus) and ascending infection. Increased intraluminal pressure forces bacteria and endotoxins into the hepatic sinusoids and systemic circulation, producing bacteremia and sepsis. The classic Charcot triad (fever, jaundice, RUQ pain) progresses to Reynolds pentad (adding altered mental status and hypotension) in severe cases." },
    riskFactors: ["Choledocholithiasis (most common cause)", "Biliary stent occlusion", "Biliary strictures (benign or malignant)", "Prior biliary surgery or ERCP", "Parasitic infections (Ascaris, liver flukes)", "Choledochal cysts", "Primary sclerosing cholangitis", "Pancreatic head mass causing bile duct compression"],
    diagnostics: ["Blood cultures (positive in 40–70% of cases)", "CBC showing leukocytosis with left shift", "Liver function tests: elevated bilirubin, ALP, GGT; may have elevated transaminases", "RUQ ultrasound to identify bile duct dilation and choledocholithiasis", "MRCP for detailed biliary tree evaluation", "CT abdomen if abscess or alternative diagnosis suspected", "Procalcitonin to support sepsis diagnosis"],
    management: ["IV fluid resuscitation and hemodynamic stabilization", "Broad-spectrum IV antibiotics (piperacillin-tazobactam or meropenem) within 1 hour", "Urgent biliary decompression via ERCP with sphincterotomy and stone extraction", "Percutaneous transhepatic drainage if ERCP fails", "ICU admission for Reynolds pentad or septic shock", "Interval cholecystectomy after stabilization if gallstone etiology"],
    nursingActions: ["Monitor vital signs frequently for sepsis progression (MAP, HR, temperature)", "Administer IV antibiotics within ordered timeframe", "Monitor urine output hourly (target ≥ 0.5 mL/kg/hr)", "Assess mental status changes as early sign of sepsis", "Maintain NPO status in preparation for ERCP", "Monitor post-ERCP for complications: pancreatitis, bleeding, perforation"],
    assessmentFindings: ["Charcot triad: fever/chills, jaundice, RUQ pain", "Reynolds pentad: Charcot triad plus altered mental status and hypotension", "Tachycardia and rigors", "RUQ tenderness on palpation", "Scleral icterus and tea-colored urine"],
    signs: {
      left: ["Low-grade fever", "Mild RUQ discomfort", "Subtle jaundice", "Mildly elevated bilirubin and ALP", "Stable vital signs"],
      right: ["High spiking fever with rigors", "Hypotension and tachycardia (septic shock)", "Altered mental status", "Deep jaundice", "Organ dysfunction (AKI, coagulopathy)"]
    },
    medications: [{
      name: "Piperacillin-Tazobactam",
      type: "Extended-spectrum penicillin/beta-lactamase inhibitor",
      action: "Broad-spectrum bactericidal activity against gram-negative, gram-positive, and anaerobic organisms in biliary infections",
      sideEffects: "Diarrhea, rash, thrombocytopenia, C. difficile risk",
      contra: "Penicillin allergy, severe renal impairment (dose adjust)",
      pearl: "First-line empiric therapy for acute cholangitis; adjust based on culture results and local antibiograms"
    }],
    pearls: ["Charcot triad is present in only 50–70% of cholangitis cases—maintain high clinical suspicion", "Reynolds pentad indicates severe/suppurative cholangitis requiring emergent decompression", "ERCP within 24 hours for moderate cholangitis; emergent for severe cholangitis", "Post-ERCP pancreatitis is the most common complication—monitor lipase and epigastric pain", "Tokyo Guidelines (TG18) classify severity to guide timing of biliary drainage"],
    quiz: [
      {
        question: "A patient presents with fever, jaundice, RUQ pain, hypotension, and confusion. Which clinical syndrome does this represent?",
        options: ["Charcot triad", "Reynolds pentad", "Beck triad", "Cushing triad"],
        correct: 1,
        rationale: "Reynolds pentad (Charcot triad plus hypotension and altered mental status) indicates severe suppurative cholangitis requiring emergent biliary drainage."
      },
      {
        question: "What is the most important intervention for a patient with acute cholangitis and septic shock?",
        options: ["Schedule elective cholecystectomy", "Emergent biliary decompression via ERCP", "Oral antibiotics and outpatient follow-up", "Hepatic artery embolization"],
        correct: 1,
        rationale: "Source control via emergent biliary decompression (ERCP) is essential in severe cholangitis to relieve obstruction and drain the infected biliary system."
      },
      {
        question: "Which organism is most commonly implicated in ascending cholangitis?",
        options: ["Staphylococcus aureus", "Escherichia coli", "Pseudomonas aeruginosa", "Candida albicans"],
        correct: 1,
        rationale: "E. coli is the most common organism isolated in biliary infections due to ascending colonization from the duodenum through the ampulla of Vater."
      }
    ]
  },
  "cholesterol-embolization-np": {
    title: "Cholesterol Embolization Syndrome: Blue Toe",
    cellular: { title: "Atheromatous Embolization Pathophysiology", content: "Cholesterol embolization syndrome (CES) occurs when cholesterol crystals from ulcerated atherosclerotic plaques in the aorta dislodge and lodge in small- and medium-sized arteries distally. This typically follows vascular procedures (catheterization, vascular surgery) or anticoagulation therapy. The cholesterol crystals incite a foreign-body inflammatory response with giant cell formation, intimal fibrosis, and progressive vessel occlusion. Unlike thromboembolism, CES causes a subacute, progressive ischemic process affecting skin (blue toe syndrome, livedo reticularis), kidneys (progressive renal failure), and GI tract." },
    riskFactors: ["Severe aortic atherosclerosis", "Recent vascular catheterization or angiography", "Recent vascular surgery", "Initiation of anticoagulation (warfarin, heparin) or thrombolytics", "Age > 60 years", "Male sex", "Hypertension and hyperlipidemia", "Smoking history"],
    diagnostics: ["Peripheral blood eosinophilia (hallmark finding)", "Elevated ESR and CRP", "Rising serum creatinine (subacute progressive pattern)", "Low complement levels (C3, C4)", "Urinalysis with eosinophiluria", "Skin biopsy showing biconvex cholesterol clefts (pathognomonic)", "Fundoscopy may reveal Hollenhorst plaques (retinal cholesterol emboli)"],
    management: ["Supportive care (no definitive treatment exists)", "Discontinue anticoagulation if it triggered the event", "Aggressive cardiovascular risk factor modification", "Statin therapy (stabilizes plaques and reduces inflammation)", "Blood pressure optimization", "Dialysis for severe renal failure if needed", "Wound care for digital ischemia; avoid amputation unless necrosis is extensive"],
    nursingActions: ["Perform thorough skin assessment of extremities—inspect toes for cyanosis (blue toe)", "Assess for livedo reticularis on lower extremities, abdomen, and flanks", "Monitor renal function trends (BUN, creatinine) daily", "Monitor peripheral pulses—note that pedal pulses are typically present (small vessel disease)", "Report any new abdominal pain (mesenteric ischemia risk)", "Protect ischemic digits from trauma and pressure"],
    assessmentFindings: ["Blue or purple discoloration of toes (blue toe syndrome) with palpable pulses", "Livedo reticularis (mottled, net-like purplish skin pattern)", "Progressive renal insufficiency developing over weeks", "Hollenhorst plaques on fundoscopic exam", "Eosinophilia on CBC differential"],
    signs: {
      left: ["Single blue toe", "Mild livedo reticularis", "Slightly rising creatinine", "Eosinophilia on labs", "Intact pedal pulses"],
      right: ["Multiple gangrenous digits", "Extensive livedo reticularis", "Acute renal failure requiring dialysis", "Mesenteric ischemia (abdominal pain, bloody stool)", "Multi-organ involvement"]
    },
    medications: [{
      name: "Atorvastatin",
      type: "HMG-CoA reductase inhibitor (Statin)",
      action: "Stabilizes atherosclerotic plaques and reduces cholesterol crystal shedding; anti-inflammatory effects reduce vascular inflammation",
      sideEffects: "Myalgias, elevated transaminases, rhabdomyolysis (rare)",
      contra: "Active liver disease, pregnancy",
      pearl: "Statins are the cornerstone of medical therapy in CES—they stabilize the aortic plaque source and may reduce recurrence"
    }],
    pearls: ["Blue toes with palpable pulses is the hallmark—distinguishes CES from large-vessel thromboembolism", "CES often occurs days to weeks after a vascular procedure or anticoagulant initiation", "Eosinophilia and low complement differentiate CES from other causes of AKI", "Skin biopsy showing biconvex clefts ('cholesterol clefts') is diagnostic", "There is no specific treatment—supportive care and plaque stabilization with statins are key"],
    quiz: [
      {
        question: "A patient develops progressive renal failure and blue discoloration of several toes 2 weeks after cardiac catheterization. Pedal pulses are palpable. What is the most likely diagnosis?",
        options: ["Deep vein thrombosis", "Cholesterol embolization syndrome", "Peripheral artery disease", "Raynaud phenomenon"],
        correct: 1,
        rationale: "Blue toes with palpable pulses occurring after a vascular procedure with progressive renal failure is classic for cholesterol embolization syndrome."
      },
      {
        question: "Which laboratory finding is characteristic of cholesterol embolization syndrome?",
        options: ["Thrombocytosis", "Eosinophilia", "Elevated troponin", "Hyperkalemia"],
        correct: 1,
        rationale: "Peripheral eosinophilia is a hallmark lab finding in CES due to the foreign-body inflammatory response to cholesterol crystals."
      },
      {
        question: "What is the pathognomonic histological finding on skin biopsy in cholesterol embolization syndrome?",
        options: ["Granulomatous inflammation", "Biconvex cholesterol clefts in arterioles", "IgA deposits in vessel walls", "Fibrinoid necrosis"],
        correct: 1,
        rationale: "Biconvex (needle-shaped) cholesterol clefts within small arterioles are pathognomonic for cholesterol crystal embolization."
      }
    ]
  },
  "cholinergic-toxidrome-np": {
    title: "Cholinergic Toxidrome",
    cellular: { title: "Acetylcholine Excess at Synapses", content: "Cholinergic toxidrome results from excessive stimulation of muscarinic and nicotinic acetylcholine receptors, most commonly caused by organophosphate or carbamate poisoning (pesticides), nerve agent exposure, or cholinesterase inhibitor overdose. Organophosphates irreversibly inhibit acetylcholinesterase, causing accumulation of acetylcholine at neuromuscular junctions, autonomic ganglia, and CNS synapses. Muscarinic effects produce the SLUDGE/DUMBELS mnemonic findings. Nicotinic effects cause fasciculations, weakness, and paralysis. Without treatment, progressive respiratory failure from bronchospasm, bronchorrhea, and diaphragmatic paralysis leads to death." },
    riskFactors: ["Agricultural workers exposed to organophosphate pesticides", "Nerve agent exposure (sarin, VX) in chemical terrorism", "Overdose of cholinesterase inhibitors (donepezil, rivastigmine, pyridostigmine)", "Carbamate insecticide exposure", "Ingestion of certain mushrooms (Clitocybe, Inocybe species)", "Myasthenia gravis patients on excessive anticholinesterase therapy"],
    diagnostics: ["Serum butyrylcholinesterase (pseudocholinesterase) level—decreased confirms exposure", "Red blood cell acetylcholinesterase level—more specific for organophosphate toxicity", "ABG showing respiratory acidosis from hypoventilation", "Chest X-ray for pulmonary edema or aspiration", "ECG for bradycardia, QTc prolongation, or heart block", "Blood glucose (organophosphates can cause hypoglycemia or hyperglycemia)"],
    management: ["Immediate decontamination: remove clothing, wash skin with soap and water", "Secure airway and provide ventilatory support", "Atropine IV push (initial 2 mg, double dose every 3–5 min until secretions dry)", "Pralidoxime (2-PAM) for organophosphate poisoning to reactivate cholinesterase", "Benzodiazepines (diazepam) for seizure control", "Do NOT use succinylcholine for intubation (prolonged paralysis due to inhibited pseudocholinesterase)", "ICU monitoring for delayed respiratory failure"],
    nursingActions: ["Don PPE before approaching—avoid secondary contamination", "Ensure thorough decontamination before entering treatment area", "Monitor respiratory status closely (bronchorrhea, wheezing, respiratory rate)", "Titrate atropine to drying of bronchial secretions (not heart rate)", "Monitor for intermediate syndrome (muscle weakness 24–96 hours after exposure)", "Continuous cardiac monitoring for dysrhythmias"],
    assessmentFindings: ["SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis", "DUMBELS: Diarrhea, Urination, Miosis, Bradycardia, Emesis, Lacrimation, Salivation", "Miosis (pinpoint pupils)—classic finding", "Bronchospasm and bronchorrhea (copious secretions)", "Muscle fasciculations progressing to paralysis", "Altered mental status, seizures"],
    signs: {
      left: ["Excessive salivation and lacrimation", "Miosis (constricted pupils)", "Diaphoresis", "Abdominal cramping and diarrhea", "Bradycardia"],
      right: ["Severe bronchorrhea with respiratory failure", "Seizures and obtundation", "Muscle paralysis and fasciculations", "Cardiovascular collapse", "Pulmonary edema"]
    },
    medications: [{
      name: "Atropine",
      type: "Antimuscarinic / anticholinergic",
      action: "Competitively blocks acetylcholine at muscarinic receptors, reversing bronchospasm, bronchorrhea, bradycardia, and secretory excess",
      sideEffects: "Tachycardia, dry mouth, urinary retention, mydriasis, hyperthermia",
      contra: "None in life-threatening cholinergic toxicity (relative: narrow-angle glaucoma)",
      pearl: "Titrate to drying of pulmonary secretions—NOT heart rate; large doses (10–20+ mg) may be needed in organophosphate poisoning"
    }, {
      name: "Pralidoxime (2-PAM)",
      type: "Cholinesterase reactivator",
      action: "Cleaves organophosphate from acetylcholinesterase before aging occurs, restoring enzyme function at nicotinic junctions",
      sideEffects: "Dizziness, blurred vision, tachycardia, muscle rigidity if given too rapidly",
      contra: "Carbamate poisoning (relative—may worsen toxicity in some carbamates)",
      pearl: "Must be given within 24–48 hours before organophosphate 'aging' (irreversible bond) occurs; ineffective after aging"
    }],
    pearls: ["Atropine endpoint is drying of secretions—NOT heart rate normalization", "DUMBELS/SLUDGE mnemonics cover muscarinic effects; nicotinic effects (fasciculations, weakness) are separate", "Pralidoxime works at nicotinic receptors (neuromuscular junction)—atropine does not", "Organophosphates cause irreversible cholinesterase inhibition; carbamates are reversible", "Staff must use full PPE—liquid organophosphates can cause secondary contamination through skin absorption", "Intermediate syndrome (delayed weakness) can occur 24–96 hours after exposure even with treatment"],
    quiz: [
      {
        question: "A farmer presents with pinpoint pupils, excessive salivation, bronchospasm, and muscle fasciculations after pesticide exposure. What is the first-line medication?",
        options: ["Epinephrine", "Atropine", "Naloxone", "Flumazenil"],
        correct: 1,
        rationale: "Atropine is the first-line antidote for cholinergic toxidrome, blocking excessive muscarinic stimulation and addressing life-threatening bronchorrhea and bronchospasm."
      },
      {
        question: "What is the clinical endpoint for atropine administration in organophosphate poisoning?",
        options: ["Heart rate above 100 bpm", "Pupil dilation", "Drying of bronchial secretions", "Return of bowel sounds"],
        correct: 2,
        rationale: "The endpoint is drying of pulmonary secretions, which addresses the most life-threatening effect (bronchorrhea). Heart rate is not a reliable endpoint."
      },
      {
        question: "Why must pralidoxime be administered early in organophosphate poisoning?",
        options: ["It has a very short half-life", "The organophosphate-enzyme bond undergoes 'aging' and becomes irreversible", "It only works when combined with naloxone", "It must reach therapeutic levels before atropine"],
        correct: 1,
        rationale: "Organophosphate undergoes 'aging' (dealkylation) creating an irreversible bond with cholinesterase. Pralidoxime must be given before aging occurs (typically within 24–48 hours) to reactivate the enzyme."
      }
    ]
  },
  "chorioamnionitis-np": {
    title: "Chorioamnionitis: Intra-Amniotic Infection",
    cellular: { title: "Intra-Amniotic Infection Pathophysiology", content: "Chorioamnionitis is an acute infection of the amniotic fluid, membranes, placenta, and/or decidua, most commonly caused by ascending polymicrobial bacteria from the lower genital tract (Ureaplasma urealyticum, Mycoplasma hominis, GBS, E. coli, anaerobes). Prolonged rupture of membranes allows bacterial colonization of the amniotic cavity. The inflammatory response involves neutrophil infiltration of the chorion and amnion, release of pro-inflammatory cytokines (IL-1, IL-6, TNF-α), and prostaglandin production that stimulates uterine contractions. Fetal exposure causes fetal inflammatory response syndrome (FIRS) with risks of neonatal sepsis, pneumonia, and neurodevelopmental injury." },
    riskFactors: ["Prolonged rupture of membranes (> 18 hours)", "Preterm premature rupture of membranes (PPROM)", "Prolonged labor", "Multiple digital vaginal examinations", "GBS colonization", "Internal fetal monitoring devices", "Bacterial vaginosis", "Prior chorioamnionitis", "Nulliparity"],
    diagnostics: ["Maternal fever ≥ 39°C (single) or ≥ 38°C on two readings 30 min apart", "Maternal tachycardia > 100 bpm", "Fetal tachycardia > 160 bpm", "Fundal tenderness on palpation", "Purulent or foul-smelling amniotic fluid", "Maternal WBC > 15,000 (less specific in labor)", "Amniocentesis for glucose, Gram stain, culture (definitive but rarely needed)", "CRP and procalcitonin elevation"],
    management: ["Intrapartum IV antibiotics immediately upon diagnosis (ampicillin + gentamicin)", "Expeditious delivery—chorioamnionitis is an indication for delivery, NOT cesarean section alone", "Cesarean section only for obstetric indications (not solely for chorioamnionitis)", "Antipyretics (acetaminophen) to reduce maternal and fetal temperature", "Continue antibiotics postpartum per protocol (additional clindamycin if cesarean)", "Neonatal team at delivery for immediate assessment"],
    nursingActions: ["Monitor maternal temperature every 1–2 hours during labor", "Assess fetal heart rate pattern continuously for tachycardia or decelerations", "Administer IV antibiotics within 30 minutes of order", "Monitor for uterine hyperstimulation or tetanic contractions", "Document amniotic fluid characteristics (color, odor, consistency)", "Prepare neonatal resuscitation team for delivery"],
    assessmentFindings: ["Maternal fever in labor", "Maternal and fetal tachycardia", "Uterine tenderness between contractions", "Purulent or malodorous amniotic fluid", "Maternal malaise and diaphoresis"],
    signs: {
      left: ["Maternal temperature 38–38.5°C", "Mild maternal tachycardia", "Borderline fetal tachycardia (155–165 bpm)", "Slightly elevated WBC", "No foul-smelling fluid"],
      right: ["High fever ≥ 39°C with rigors", "Fetal tachycardia > 180 bpm with decelerations", "Purulent/foul amniotic fluid", "Septic shock (hypotension, altered mental status)", "Fetal distress requiring emergent delivery"]
    },
    medications: [{
      name: "Ampicillin",
      type: "Aminopenicillin antibiotic",
      action: "Bactericidal activity against GBS, E. coli, and other common organisms causing intra-amniotic infection",
      sideEffects: "Rash, diarrhea, allergic reaction, anaphylaxis",
      contra: "Penicillin allergy (use clindamycin + gentamicin alternative)",
      pearl: "Ampicillin 2g IV q6h + gentamicin 5 mg/kg IV daily is standard intrapartum regimen; add clindamycin 900 mg IV q8h if cesarean delivery"
    }],
    pearls: ["Chorioamnionitis is the most common indication for intrapartum fever—but always consider epidural-related fever as differential", "Delivery should NOT be delayed for antibiotic administration—start antibiotics AND proceed with delivery", "Chorioamnionitis is NOT an indication for cesarean section by itself", "Intrapartum antibiotics reduce neonatal sepsis by 80%", "Fetal tachycardia may be the earliest sign, appearing before maternal fever", "Triple I (intrauterine inflammation, infection, or both) is the newer terminology"],
    quiz: [
      {
        question: "A laboring patient at 38 weeks has a temperature of 39.2°C, maternal HR 115, fetal HR 175, and foul-smelling amniotic fluid. What is the priority intervention?",
        options: ["Administer IV ampicillin and gentamicin and expedite delivery", "Perform emergency cesarean section immediately", "Discontinue oxytocin and observe for 2 hours", "Obtain amniocentesis for culture before treating"],
        correct: 0,
        rationale: "IV antibiotics should be started immediately and delivery expedited. Chorioamnionitis itself is not an indication for cesarean—delivery route depends on obstetric factors."
      },
      {
        question: "Which finding is the earliest indicator of chorioamnionitis during labor?",
        options: ["Purulent amniotic fluid", "Fetal tachycardia", "Maternal hypotension", "Fetal bradycardia"],
        correct: 1,
        rationale: "Fetal tachycardia (> 160 bpm) is often the earliest sign of chorioamnionitis, appearing before maternal fever in many cases."
      },
      {
        question: "What is the most significant risk factor for chorioamnionitis?",
        options: ["Gestational diabetes", "Prolonged rupture of membranes > 18 hours", "Advanced maternal age", "Breech presentation"],
        correct: 1,
        rationale: "Prolonged rupture of membranes (> 18 hours) is the strongest risk factor, as it allows ascending bacterial colonization of the amniotic cavity."
      }
    ]
  },
  "chronic-diarrhea-algorithm-np": {
    title: "Chronic Diarrhea: Diagnostic Algorithm",
    cellular: { title: "Mechanisms of Chronic Diarrhea", content: "Chronic diarrhea (≥ 4 weeks duration) is classified by mechanism: osmotic (unabsorbed solutes draw water into the lumen—lactose intolerance, sorbitol, celiac disease), secretory (active ion secretion exceeds absorption—VIPoma, bile acid malabsorption, microscopic colitis), inflammatory (mucosal damage with blood/pus—IBD, infection, ischemia), and motility-related (altered transit time—IBS, hyperthyroidism, diabetic autonomic neuropathy). The osmotic gap ([290 − 2 × (Na⁺ + K⁺)] in stool) helps differentiate: > 50 = osmotic, < 50 = secretory. A systematic algorithmic approach using stool studies, serologies, and endoscopy narrows the differential." },
    riskFactors: ["Celiac disease or other malabsorption syndromes", "Inflammatory bowel disease (Crohn, UC)", "Irritable bowel syndrome", "Medications (antibiotics, metformin, PPIs, NSAIDs, SSRIs)", "Lactose or fructose intolerance", "Prior cholecystectomy (bile acid diarrhea)", "Hyperthyroidism", "Chronic infections (C. difficile, Giardia, HIV-related)", "Pancreatic exocrine insufficiency"],
    diagnostics: ["Stool studies: culture, ova and parasites, C. difficile toxin, fecal calprotectin", "Fecal fat (72-hour collection or Sudan stain) for steatorrhea", "Stool osmotic gap calculation to differentiate osmotic vs secretory", "Celiac serologies (tissue transglutaminase IgA with total IgA level)", "TSH to rule out hyperthyroidism", "Colonoscopy with random biopsies (even if mucosa appears normal—for microscopic colitis)", "SeHCAT scan or empiric cholestyramine trial for bile acid diarrhea", "Fecal elastase for pancreatic exocrine insufficiency"],
    management: ["Treat underlying cause (gluten-free diet for celiac, anti-inflammatories for IBD)", "Loperamide for symptomatic relief in non-inflammatory diarrhea", "Cholestyramine for bile acid diarrhea", "Budesonide for microscopic colitis", "Pancreatic enzyme replacement for exocrine insufficiency", "Dietary modifications (low-FODMAP for IBS, lactose avoidance)", "Rifaximin for SIBO-associated diarrhea"],
    nursingActions: ["Obtain thorough dietary history including lactose, gluten, artificial sweeteners", "Collect stool specimens properly (timing, transport, labeling)", "Monitor fluid status and electrolytes—replace as needed", "Assess for dehydration signs (orthostatic hypotension, poor turgor, concentrated urine)", "Review medication list for diarrhea-inducing agents", "Educate patient on stool diary for pattern recognition"],
    assessmentFindings: ["Frequent loose or watery stools for ≥ 4 weeks", "Nocturnal diarrhea (suggests organic rather than functional cause)", "Weight loss, anemia, or nutritional deficiencies (malabsorption)", "Bloody or mucoid stools (inflammatory)", "Bloating, flatulence, and cramping (osmotic/fermentative)"],
    signs: {
      left: ["Intermittent loose stools", "Mild bloating", "No weight loss", "No nocturnal symptoms", "Normal labs"],
      right: ["Large-volume watery diarrhea with dehydration", "Significant weight loss and malnutrition", "Nocturnal diarrhea", "Bloody or purulent stools", "Electrolyte abnormalities (hypokalemia, metabolic acidosis)"]
    },
    medications: [{
      name: "Loperamide",
      type: "Opioid receptor agonist (peripheral)",
      action: "Slows intestinal motility and reduces fluid secretion by acting on mu-opioid receptors in the gut wall",
      sideEffects: "Constipation, abdominal cramping, dizziness",
      contra: "Bloody or inflammatory diarrhea (IBD flare, C. difficile), toxic megacolon risk",
      pearl: "Never use in acute inflammatory or infectious diarrhea—risk of toxic megacolon; safe for IBS-D and chronic non-inflammatory diarrhea"
    }],
    pearls: ["Nocturnal diarrhea strongly suggests an organic (not functional) cause", "Stool osmotic gap > 50 = osmotic diarrhea; < 50 = secretory diarrhea", "Fecal calprotectin > 250 μg/g strongly suggests inflammatory cause", "Random colonic biopsies are essential even with normal-appearing mucosa (microscopic colitis)", "Post-cholecystectomy bile acid diarrhea is common and responds to cholestyramine", "Celiac disease can present at any age—screen with tTG-IgA"],
    quiz: [
      {
        question: "A patient has chronic watery diarrhea that persists with fasting. Stool osmotic gap is 25. Which mechanism is most likely?",
        options: ["Osmotic diarrhea", "Secretory diarrhea", "Inflammatory diarrhea", "Motility diarrhea"],
        correct: 1,
        rationale: "A low stool osmotic gap (< 50) that persists with fasting is characteristic of secretory diarrhea, where active ion secretion continues regardless of oral intake."
      },
      {
        question: "Which finding on chronic diarrhea workup most strongly suggests an organic rather than functional etiology?",
        options: ["Alternating constipation and diarrhea", "Nocturnal diarrhea awakening the patient from sleep", "Symptoms worsened by stress", "Normal fecal calprotectin"],
        correct: 1,
        rationale: "Nocturnal diarrhea is a red flag for organic disease because functional disorders (IBS) typically do not wake patients from sleep."
      },
      {
        question: "A colonoscopy in a patient with chronic watery diarrhea shows grossly normal mucosa. What should be done next?",
        options: ["No further workup needed", "Random biopsies of the colon to evaluate for microscopic colitis", "Immediate surgical referral", "Start empiric steroids"],
        correct: 1,
        rationale: "Microscopic colitis (collagenous or lymphocytic) has a grossly normal mucosa but is diagnosed on histology. Random biopsies are essential."
      }
    ]
  },
  "chronic-disease-management-plans-np": {
    title: "Chronic Disease Management Plans",
    cellular: { title: "Chronic Disease Pathophysiology and Multi-System Impact", content: "Chronic diseases (diabetes, hypertension, heart failure, COPD, CKD) share common pathophysiological features: persistent low-grade inflammation, endothelial dysfunction, oxidative stress, and progressive end-organ damage. The NP must integrate the Chronic Care Model (CCM) which emphasizes proactive, patient-centered care through self-management support, clinical decision support systems, care coordination, and community resources. Disease trajectory management requires understanding of pathophysiological progression, evidence-based treatment targets (A1C < 7%, BP < 130/80, LDL goals per risk), and identification of modifiable risk factors to slow disease progression." },
    riskFactors: ["Multimorbidity (coexistence of 2+ chronic conditions)", "Polypharmacy and drug-drug interactions", "Health literacy barriers", "Social determinants of health (poverty, food insecurity, housing instability)", "Medication nonadherence", "Limited access to healthcare", "Mental health comorbidities (depression, anxiety)", "Lack of social support systems"],
    diagnostics: ["A1C every 3–6 months for diabetes management", "Annual comprehensive metabolic panel and lipid panel", "eGFR and urine albumin-to-creatinine ratio for CKD screening", "Annual dilated eye exam for diabetic patients", "Spirometry for COPD staging and monitoring", "BNP/NT-proBNP for heart failure monitoring", "Preventive screening per USPSTF guidelines (cancer screening, immunizations)"],
    management: ["Develop individualized care plans with SMART goals", "Implement shared decision-making for treatment plans", "Coordinate care across specialists using care management team", "Optimize medication regimens with regular reconciliation", "Provide self-management education and action plans", "Address social determinants through community resource referrals", "Implement motivational interviewing for behavior change"],
    nursingActions: ["Conduct comprehensive chronic disease assessment at each visit", "Review and reconcile all medications including OTC and supplements", "Assess self-management knowledge and barriers to adherence", "Coordinate referrals (dietitian, diabetes educator, social work, PT/OT)", "Implement teach-back method for patient education", "Schedule appropriate follow-up intervals based on disease stability"],
    assessmentFindings: ["Baseline and trending vital signs and biometrics (weight, BMI, waist circumference)", "Medication adherence assessment (prescription refill history, pill counts)", "Functional status and quality of life measures", "Depression screening (PHQ-9) at regular intervals", "End-organ damage assessment (foot exam, retinal exam, renal function)"],
    signs: {
      left: ["Stable chronic disease with controlled parameters", "Good medication adherence", "Active engagement in self-management", "Appropriate follow-up attendance", "Stable functional status"],
      right: ["Uncontrolled disease markers (A1C > 9%, BP > 160/100)", "Frequent ED visits or hospitalizations", "Medication nonadherence", "New end-organ damage", "Functional decline or disability"]
    },
    medications: [{
      name: "Metformin",
      type: "Biguanide (antihyperglycemic)",
      action: "Reduces hepatic glucose production and increases insulin sensitivity in peripheral tissues; first-line for type 2 diabetes",
      sideEffects: "GI upset (nausea, diarrhea), lactic acidosis (rare), vitamin B12 deficiency with long-term use",
      contra: "eGFR < 30 mL/min, acute/chronic metabolic acidosis, contrast dye procedures (hold temporarily)",
      pearl: "Start low (500 mg daily) and titrate slowly to minimize GI side effects; extended-release formulation has better GI tolerability"
    }],
    pearls: ["The Chronic Care Model shifts from reactive to proactive, population-based care", "Medication reconciliation at every visit prevents polypharmacy complications", "Depression is underdiagnosed in chronic disease—screen with PHQ-9 regularly", "A1C reflects 2–3 month glucose average; do not over-rely on single fasting glucose", "Self-management support is the strongest predictor of chronic disease outcomes", "Motivational interviewing is more effective than directive counseling for behavior change"],
    quiz: [
      {
        question: "An NP is developing a chronic disease management plan for a diabetic patient with A1C of 9.5% and hypertension. What is the priority intervention?",
        options: ["Refer to endocrinology immediately", "Assess barriers to medication adherence and self-management", "Add insulin without further assessment", "Schedule follow-up in 6 months"],
        correct: 1,
        rationale: "Before intensifying therapy, assessing barriers to adherence (cost, understanding, side effects, access) is essential as nonadherence is the most common cause of uncontrolled chronic disease."
      },
      {
        question: "Which element of the Chronic Care Model has the strongest evidence for improving outcomes?",
        options: ["Clinical information systems", "Self-management support", "Community resources", "Healthcare organization redesign"],
        correct: 1,
        rationale: "Self-management support empowers patients to take an active role in their care and has consistently shown the strongest association with improved chronic disease outcomes."
      },
      {
        question: "A patient on metformin for 5 years presents with macrocytic anemia and peripheral neuropathy. What should the NP evaluate?",
        options: ["Iron deficiency", "Vitamin B12 level", "Folate level", "Thyroid function"],
        correct: 1,
        rationale: "Long-term metformin use is associated with vitamin B12 deficiency due to impaired ileal absorption, presenting with macrocytic anemia and neuropathy."
      }
    ]
  },
  "chronic-inflammation-mechanisms-np": {
    title: "Chronic Inflammation Mechanisms",
    cellular: { title: "Persistent Inflammatory Cascade", content: "Chronic inflammation occurs when the acute inflammatory response fails to resolve, driven by persistent infection, autoimmune reactions, or prolonged exposure to irritants. Unlike acute inflammation (neutrophil-mediated, resolves in days), chronic inflammation is characterized by simultaneous tissue destruction and repair involving macrophages, lymphocytes, and fibroblasts. Activated M1 macrophages release pro-inflammatory cytokines (TNF-α, IL-1, IL-6), reactive oxygen species, and matrix metalloproteinases that cause ongoing tissue damage. Fibroblasts deposit collagen, leading to fibrosis and organ dysfunction. Chronic inflammation underlies atherosclerosis, type 2 diabetes, cancer, and autoimmune diseases." },
    riskFactors: ["Autoimmune disorders (RA, SLE, IBD)", "Chronic infections (hepatitis B/C, H. pylori, tuberculosis)", "Obesity (visceral adipose tissue is a source of pro-inflammatory adipokines)", "Smoking and environmental pollutant exposure", "Chronic stress (cortisol dysregulation)", "Sedentary lifestyle", "Western diet (high in processed foods, sugar, trans fats)", "Advanced age (inflammaging)"],
    diagnostics: ["CRP (C-reactive protein)—most widely used marker of systemic inflammation", "ESR (erythrocyte sedimentation rate)—nonspecific but useful for trending", "Ferritin (acute phase reactant; elevated in inflammation)", "Interleukin-6 (IL-6) levels in research/specialized settings", "CBC showing normocytic anemia of chronic disease", "Albumin (negative acute phase reactant—decreases in chronic inflammation)", "Disease-specific autoantibodies (ANA, RF, anti-CCP, ANCA)"],
    management: ["Treat underlying cause (eradicate infection, control autoimmune disease)", "Anti-inflammatory medications (NSAIDs, corticosteroids) for symptomatic management", "Disease-modifying agents (DMARDs, biologics) for autoimmune-mediated inflammation", "Lifestyle modifications: Mediterranean diet, regular exercise, weight management", "Targeted biologic therapies (anti-TNF-α, anti-IL-6, JAK inhibitors)", "Smoking cessation and stress management"],
    nursingActions: ["Monitor inflammatory markers serially (CRP, ESR) to assess treatment response", "Assess for end-organ damage from chronic inflammation", "Administer immunosuppressive medications safely with infection monitoring", "Educate patients on signs of infection while on immunosuppressive therapy", "Promote anti-inflammatory lifestyle modifications", "Screen for comorbid depression and chronic pain"],
    assessmentFindings: ["Fatigue and malaise (most common systemic symptom)", "Low-grade fever or constitutional symptoms", "Anemia of chronic disease (normocytic, normochromic)", "Elevated CRP and ESR", "Tissue-specific findings depending on affected organ (joint swelling, skin changes, organ dysfunction)"],
    signs: {
      left: ["Fatigue and low energy", "Mildly elevated CRP/ESR", "Low-grade constitutional symptoms", "Mild anemia of chronic disease", "Subtle functional limitations"],
      right: ["Organ fibrosis and dysfunction", "Cachexia and severe weight loss", "Severe anemia requiring transfusion", "Secondary amyloidosis", "Malignant transformation (chronic inflammation → cancer)"]
    },
    medications: [{
      name: "Adalimumab",
      type: "Anti-TNF-α monoclonal antibody (biologic DMARD)",
      action: "Neutralizes TNF-α, a key pro-inflammatory cytokine driving chronic inflammation in autoimmune diseases",
      sideEffects: "Injection site reactions, increased infection risk, reactivation of latent TB, demyelinating disorders, lymphoma risk",
      contra: "Active serious infections, latent TB (untreated), decompensated heart failure (NYHA III-IV)",
      pearl: "Screen for latent TB with PPD or IGRA and hepatitis B before initiating; patients must report any signs of infection immediately"
    }],
    pearls: ["CRP rises and falls faster than ESR—use CRP for acute monitoring, ESR for chronic disease trending", "Anemia of chronic disease is mediated by hepcidin, which sequesters iron in macrophages", "Visceral obesity is a major source of chronic low-grade inflammation (adipokines: leptin, resistin, TNF-α)", "Chronic inflammation is the common pathway linking obesity, diabetes, atherosclerosis, and cancer", "Always screen for latent TB before starting biologic immunosuppressive therapy", "Inflammaging refers to the age-related increase in pro-inflammatory markers that contributes to chronic diseases of aging"],
    quiz: [
      {
        question: "Which cells predominate in chronic inflammation, distinguishing it from acute inflammation?",
        options: ["Neutrophils and eosinophils", "Macrophages and lymphocytes", "Mast cells and basophils", "Platelets and fibrin"],
        correct: 1,
        rationale: "Chronic inflammation is characterized by macrophages and lymphocytes, whereas acute inflammation is predominantly neutrophil-mediated."
      },
      {
        question: "A patient on adalimumab for rheumatoid arthritis develops night sweats, weight loss, and a persistent cough. What should the NP evaluate first?",
        options: ["Drug allergy to adalimumab", "Reactivation of latent tuberculosis", "Lung cancer screening", "Heart failure exacerbation"],
        correct: 1,
        rationale: "Anti-TNF-α therapy increases the risk of TB reactivation. Night sweats, weight loss, and cough in this setting require urgent TB evaluation."
      },
      {
        question: "What is the role of hepcidin in anemia of chronic disease?",
        options: ["It destroys red blood cells in the spleen", "It sequesters iron in macrophages, making it unavailable for erythropoiesis", "It inhibits erythropoietin production", "It causes vitamin B12 malabsorption"],
        correct: 1,
        rationale: "Hepcidin, an acute phase reactant produced by the liver, blocks ferroportin channels on macrophages and enterocytes, trapping iron and limiting its availability for red blood cell production."
      }
    ]
  },
  "chronic-inflammatory-states-np": {
    title: "Chronic Inflammatory States: Clinical Management",
    cellular: { title: "Systemic Inflammatory Burden", content: "Chronic inflammatory states encompass conditions where sustained immune activation drives multisystem damage. Autoimmune conditions (RA, SLE, IBD) involve loss of immune tolerance with autoreactive T-cells and autoantibodies attacking self-tissue. Metabolic inflammation (metainflammation) in obesity involves adipocyte hypertrophy triggering macrophage infiltration and cytokine release (TNF-α, IL-6, MCP-1). These conditions share common downstream effects: endothelial dysfunction, insulin resistance, accelerated atherosclerosis, and increased thrombotic risk. The NP must manage both the primary inflammatory condition and its systemic cardiovascular and metabolic consequences." },
    riskFactors: ["Autoimmune disease (RA, SLE, psoriasis, IBD)", "Metabolic syndrome and visceral obesity", "Chronic infections (periodontitis, hepatitis C)", "Smoking", "Genetic predisposition (HLA associations)", "Environmental exposures (asbestos, silica)", "Chronic psychological stress", "Sleep disorders (obstructive sleep apnea)"],
    diagnostics: ["Serial CRP and ESR for disease activity monitoring", "Disease-specific markers (RF, anti-CCP for RA; ANA, anti-dsDNA for SLE; ANCA for vasculitis)", "Cardiovascular risk assessment (lipid panel, coronary artery calcium score)", "HbA1C and fasting glucose for metabolic surveillance", "Complete metabolic panel for organ function", "Bone density screening for patients on chronic steroids", "Drug-specific monitoring labs (CBC, LFTs for methotrexate; renal function for NSAIDs)"],
    management: ["Treat-to-target approach for autoimmune diseases (achieve remission or low disease activity)", "Step-up therapy: NSAIDs → conventional DMARDs → biologic DMARDs", "Cardiovascular risk factor optimization (statin therapy, BP control)", "Corticosteroid-sparing strategies to minimize long-term complications", "Bone health protection (calcium, vitamin D, bisphosphonates if chronic steroid use)", "Immunization updates before starting immunosuppressive therapy", "Regular cancer screening (increased risk with chronic inflammation and immunosuppression)"],
    nursingActions: ["Monitor disease activity scores at each visit (DAS28 for RA, SLEDAI for SLE)", "Assess for medication side effects and toxicity at each visit", "Ensure recommended immunizations are current before initiating biologics", "Screen for opportunistic infections in immunosuppressed patients", "Coordinate multidisciplinary care (rheumatology, cardiology, endocrinology)", "Provide reproductive counseling (teratogenic medications, disease flare risk in pregnancy)"],
    assessmentFindings: ["Joint pain, swelling, and morning stiffness > 30 min (RA)", "Fatigue, malaise, and functional impairment", "Skin manifestations (malar rash in SLE, psoriatic plaques)", "Persistently elevated inflammatory markers", "Premature atherosclerotic disease"],
    signs: {
      left: ["Low-grade joint stiffness", "Mildly elevated CRP", "Minimal functional impairment", "Well-controlled on current therapy", "Stable disease activity scores"],
      right: ["Severe joint destruction and deformity", "Organ involvement (nephritis, serositis, vasculitis)", "Cardiovascular events (premature MI, stroke)", "Severe infections from immunosuppression", "Secondary malignancy"]
    },
    medications: [{
      name: "Methotrexate",
      type: "Conventional DMARD / antimetabolite",
      action: "Inhibits dihydrofolate reductase and reduces inflammatory cell proliferation; anchor drug for rheumatoid arthritis",
      sideEffects: "Hepatotoxicity, myelosuppression, oral ulcers, pneumonitis, teratogenicity",
      contra: "Pregnancy (Category X), severe hepatic disease, immunodeficiency, bone marrow suppression",
      pearl: "Always co-prescribe folic acid 1 mg daily to reduce side effects; monitor CBC and LFTs every 1–3 months; ensure reliable contraception"
    }],
    pearls: ["RA doubles cardiovascular disease risk—treat aggressively and manage CV risk factors", "Treat-to-target means adjusting therapy until remission or low disease activity is achieved", "Never start biologics without checking TB status, hepatitis B/C serologies, and updating vaccines", "Methotrexate + folic acid is the anchor DMARD—always prescribe folic acid to reduce toxicity", "Chronic steroid use > 3 months at ≥ 7.5 mg prednisone warrants bone density screening", "Live vaccines are contraindicated while on biologic or immunosuppressive therapy"],
    quiz: [
      {
        question: "An NP is initiating adalimumab for a patient with rheumatoid arthritis. Which screening must be completed before the first dose?",
        options: ["Stress echocardiogram", "Tuberculosis testing (PPD or IGRA) and hepatitis B/C serologies", "24-hour urine protein", "Genetic testing for HLA-B27"],
        correct: 1,
        rationale: "Biologic DMARDs (especially anti-TNF agents) increase the risk of TB reactivation and hepatitis B flare. Screening for latent TB and hepatitis B/C is mandatory before initiation."
      },
      {
        question: "A patient with RA on methotrexate develops oral ulcers and pancytopenia. What is the most likely cause?",
        options: ["Vitamin C deficiency", "Methotrexate toxicity / folate deficiency", "Autoimmune hemolytic anemia", "Aplastic anemia from adalimumab"],
        correct: 1,
        rationale: "Oral ulcers and pancytopenia are classic signs of methotrexate toxicity. This is managed with leucovorin rescue and dose adjustment, and prevented by folic acid supplementation."
      },
      {
        question: "Why is cardiovascular risk assessment important in patients with rheumatoid arthritis?",
        options: ["RA medications cause cardiac arrhythmias", "Chronic systemic inflammation in RA accelerates atherosclerosis", "All RA patients have congenital heart defects", "Joint inflammation directly damages the myocardium"],
        correct: 1,
        rationale: "The chronic systemic inflammatory burden in RA promotes endothelial dysfunction and accelerated atherosclerosis, approximately doubling cardiovascular disease risk."
      }
    ]
  },
  "chronic-mesenteric-ischemia-np": {
    title: "Chronic Mesenteric Ischemia",
    cellular: { title: "Intestinal Angina Pathophysiology", content: "Chronic mesenteric ischemia (CMI) results from atherosclerotic stenosis of the mesenteric arteries (celiac, SMA, IMA), causing inadequate blood flow to the gut during periods of increased metabolic demand (postprandial state). At least two of the three mesenteric arteries are typically stenosed > 70% before symptoms develop due to extensive collateral circulation. Postprandial pain (intestinal angina) occurs because the diseased vessels cannot increase blood flow to meet the metabolic demands of digestion. Chronic mucosal ischemia leads to villous atrophy, malabsorption, and progressive weight loss. CMI is a precursor to acute mesenteric ischemia, which carries > 50% mortality." },
    riskFactors: ["Atherosclerosis (most common cause)", "Age > 60 years", "Smoking", "Hypertension", "Hyperlipidemia", "Diabetes mellitus", "Peripheral artery disease (marker of systemic atherosclerosis)", "Coronary artery disease", "Median arcuate ligament syndrome (in younger patients)"],
    diagnostics: ["CTA of the abdomen (gold standard for mesenteric arterial visualization)", "Mesenteric duplex ultrasound (fasting; measures peak systolic velocities)", "MRA of mesenteric vessels (alternative if contrast contraindicated)", "Conventional angiography (diagnostic and therapeutic)", "Evaluate for malnutrition: albumin, prealbumin, vitamin levels", "Stool guaiac for occult GI bleeding", "Upper endoscopy may show mucosal ischemia in duodenum"],
    management: ["Mesenteric revascularization: endovascular stenting (preferred first-line) or surgical bypass", "Cardiovascular risk factor optimization (statins, antihypertensives, smoking cessation)", "Nutritional rehabilitation (small, frequent, low-fat meals initially)", "Antiplatelet therapy (aspirin or clopidogrel)", "Parenteral nutrition if severe malnutrition prior to intervention", "Urgent revascularization if acute-on-chronic ischemia develops"],
    nursingActions: ["Assess pain pattern: postprandial pain onset, location, and relationship to meals", "Monitor nutritional status (weight trends, albumin, dietary intake)", "Assess for signs of acute mesenteric ischemia (sudden severe pain, bloody stools, peritonitis)", "Post-revascularization: monitor for reperfusion injury (lactic acidosis, abdominal distension)", "Administer small, frequent, low-fat meals to minimize mesenteric metabolic demand", "Monitor peripheral vascular status (pedal pulses, ABI) as marker of systemic atherosclerosis"],
    assessmentFindings: ["Postprandial abdominal pain (15–60 minutes after eating)", "Food fear (sitophobia)—patient avoids eating due to pain", "Progressive unintentional weight loss", "Abdominal bruit (epigastric)", "Diffusely tender abdomen without peritoneal signs"],
    signs: {
      left: ["Mild postprandial discomfort", "Subtle weight loss", "Epigastric bruit on auscultation", "Elevated SMA velocity on duplex", "Maintained oral intake"],
      right: ["Severe postprandial pain limiting oral intake", "Significant weight loss and malnutrition", "Acute-on-chronic ischemia (constant pain, bloody stool)", "Peritoneal signs (guarding, rigidity)", "Lactic acidosis"]
    },
    medications: [{
      name: "Aspirin",
      type: "Antiplatelet / cyclooxygenase inhibitor",
      action: "Irreversibly inhibits COX-1 in platelets, reducing thromboxane A2-mediated platelet aggregation to prevent thrombosis in stenosed mesenteric vessels",
      sideEffects: "GI bleeding, bruising, tinnitus at high doses",
      contra: "Active GI bleeding, aspirin allergy, severe bleeding disorder",
      pearl: "Antiplatelet therapy is standard after mesenteric stenting; dual antiplatelet (aspirin + clopidogrel) may be used for 1–3 months post-stent"
    }],
    pearls: ["Classic triad: postprandial abdominal pain + food fear + weight loss", "At least 2 of 3 major mesenteric arteries must be significantly stenosed before symptoms develop (collateral circulation)", "CMI is a pre-infarction state—revascularization prevents acute mesenteric ischemia", "Endovascular stenting is preferred over open surgical bypass for initial revascularization", "Acute onset of constant severe pain in a CMI patient suggests acute-on-chronic ischemia—this is a surgical emergency", "Assess for concomitant CAD and PAD—these patients have widespread atherosclerosis"],
    quiz: [
      {
        question: "A 72-year-old smoker presents with postprandial abdominal pain, food avoidance, and 20 lb weight loss over 3 months. What is the most likely diagnosis?",
        options: ["Peptic ulcer disease", "Chronic mesenteric ischemia", "Gastroparesis", "Pancreatic cancer"],
        correct: 1,
        rationale: "The classic triad of postprandial pain, food fear (sitophobia), and weight loss in a patient with atherosclerotic risk factors is highly suggestive of chronic mesenteric ischemia."
      },
      {
        question: "Why must at least two mesenteric arteries be stenosed before chronic mesenteric ischemia becomes symptomatic?",
        options: ["Single vessel stenosis causes acute ischemia instead", "Extensive collateral circulation between mesenteric arteries compensates for single-vessel disease", "The gut only receives blood from two arteries", "Symptoms only occur with complete occlusion"],
        correct: 1,
        rationale: "The mesenteric vasculature has extensive collateral connections (marginal artery of Drummond, arc of Riolan). Single-vessel stenosis is usually compensated by collateral flow."
      },
      {
        question: "A patient with known chronic mesenteric ischemia develops sudden constant abdominal pain with bloody stools. What does this suggest?",
        options: ["Worsening of chronic mesenteric ischemia", "Acute mesenteric ischemia—surgical emergency", "Peptic ulcer perforation", "Diverticular bleeding"],
        correct: 1,
        rationale: "Acute-on-chronic mesenteric ischemia (sudden constant pain with GI bleeding) suggests progression to acute mesenteric infarction, which is a surgical emergency with > 50% mortality."
      }
    ]
  },
  "chronic-pain-assessment-np": {
    title: "Chronic Pain Assessment",
    cellular: { title: "Central Sensitization and Neuroplastic Pain", content: "Chronic pain (> 3 months) involves neuroplastic changes in the peripheral and central nervous system. Peripheral sensitization occurs when nociceptors develop lower activation thresholds from persistent inflammation (increased prostaglandins, bradykinin, substance P). Central sensitization develops when dorsal horn neurons become hyperexcitable through NMDA receptor activation and wind-up phenomenon, amplifying pain signals. Descending inhibitory pathways (serotonergic and noradrenergic from the brainstem) become dysfunctional. This creates allodynia (pain from normally non-painful stimuli) and hyperalgesia (exaggerated pain response). Psychosocial factors (catastrophizing, fear-avoidance, depression) modulate pain perception through limbic system activation." },
    riskFactors: ["Previous acute pain inadequately treated", "History of physical or psychological trauma", "Depression and anxiety disorders", "Catastrophizing and fear-avoidance beliefs", "Genetic predisposition (COMT gene polymorphisms)", "Fibromyalgia or central sensitization syndromes", "Obesity and physical deconditioning", "Social isolation and low socioeconomic status", "Substance use history"],
    diagnostics: ["Comprehensive pain assessment using validated tools (BPI, McGill Pain Questionnaire, PCS)", "Biopsychosocial assessment including functional impact, mood, sleep, social factors", "Pain interference measures (how pain affects daily activities, work, relationships)", "Depression screening (PHQ-9) and anxiety screening (GAD-7)", "Substance use screening (CAGE-AID, DAST-10)", "Review prior imaging and diagnostics to avoid unnecessary repeat testing", "Quantitative sensory testing for central sensitization assessment"],
    management: ["Multimodal approach: combine pharmacologic and non-pharmacologic therapies", "Non-pharmacologic: CBT for chronic pain, exercise therapy, physical therapy, mindfulness-based stress reduction", "Pharmacologic: SNRIs (duloxetine), gabapentinoids, topical agents; minimize opioid use", "Interventional procedures (nerve blocks, epidural injections, spinal cord stimulation) for select patients", "Interdisciplinary pain rehabilitation programs", "Treat comorbid depression, anxiety, and sleep disorders", "Set realistic functional goals rather than targeting complete pain elimination"],
    nursingActions: ["Perform comprehensive pain assessment at initial and follow-up visits", "Use validated pain assessment tools appropriate for the patient population", "Assess functional goals and track progress with objective measures", "Screen for opioid misuse risk using validated tools (ORT, SOAPP-R)", "Monitor prescription drug monitoring program (PDMP) before prescribing controlled substances", "Educate patients on the biopsychosocial model of chronic pain"],
    assessmentFindings: ["Pain persisting beyond expected healing time (> 3 months)", "Allodynia and hyperalgesia on examination", "Functional impairment (decreased mobility, inability to work, social withdrawal)", "Sleep disturbance and fatigue", "Mood disturbance (depression, anxiety, irritability)", "Inconsistency between reported pain and objective findings (does NOT mean malingering—reflects central sensitization)"],
    signs: {
      left: ["Localized pain with identifiable trigger", "Pain responsive to simple analgesics", "Maintained function and social engagement", "Normal mood and sleep", "Consistent with structural findings"],
      right: ["Widespread pain without clear anatomic pattern", "Allodynia and hyperalgesia on exam", "Significant functional impairment", "Comorbid depression, anxiety, and insomnia", "Central sensitization features (wind-up, temporal summation)"]
    },
    medications: [{
      name: "Duloxetine",
      type: "Serotonin-norepinephrine reuptake inhibitor (SNRI)",
      action: "Enhances descending inhibitory pain pathways by increasing serotonin and norepinephrine in the dorsal horn of the spinal cord",
      sideEffects: "Nausea, dizziness, dry mouth, constipation, increased BP, hepatotoxicity (rare)",
      contra: "MAOIs (within 14 days), uncontrolled narrow-angle glaucoma, severe hepatic impairment",
      pearl: "FDA-approved for diabetic neuropathy, fibromyalgia, and chronic musculoskeletal pain; also treats comorbid depression—addresses pain and mood simultaneously"
    }],
    pearls: ["Chronic pain is a disease state, not just a symptom—neuroplastic changes are real and measurable", "The biopsychosocial model is essential: pain is influenced by biological, psychological, and social factors", "Functional improvement, not pain elimination, should be the primary treatment goal", "Central sensitization explains why pain persists after tissue healing and why widespread pain develops", "Always screen for depression—50% of chronic pain patients have comorbid depression", "Opioids are generally NOT first-line for chronic non-cancer pain—use multimodal approaches"],
    quiz: [
      {
        question: "A patient with chronic low back pain reports pain when light touch is applied to the skin of their back. What does this finding suggest?",
        options: ["Malingering", "Allodynia from central sensitization", "Conversion disorder", "Peripheral nerve compression"],
        correct: 1,
        rationale: "Allodynia (pain from normally non-painful stimuli like light touch) indicates central sensitization, where dorsal horn neurons have become hyperexcitable."
      },
      {
        question: "What is the primary treatment goal for chronic pain management?",
        options: ["Complete pain elimination", "Functional improvement and quality of life", "Opioid dose optimization", "Identifying the structural cause"],
        correct: 1,
        rationale: "Chronic pain management focuses on functional improvement, not complete pain elimination, which is rarely achievable and can set unrealistic expectations."
      },
      {
        question: "Which class of medications enhances descending inhibitory pain pathways and is first-line for chronic neuropathic pain?",
        options: ["NSAIDs", "Opioids", "SNRIs (duloxetine, venlafaxine)", "Muscle relaxants"],
        correct: 2,
        rationale: "SNRIs enhance descending serotonergic and noradrenergic inhibitory pathways in the spinal cord and are first-line for chronic neuropathic and central sensitization pain syndromes."
      }
    ]
  },
  "chronic-pain-mgmt-np": {
    title: "Chronic Pain Management Strategies",
    cellular: { title: "Multimodal Analgesia and Opioid Stewardship", content: "Effective chronic pain management requires a multimodal strategy targeting different levels of the pain pathway: peripheral nociception (NSAIDs, topical agents), spinal cord transmission (gabapentinoids, SNRIs), supraspinal modulation (antidepressants, CBT), and descending inhibition (SNRIs, exercise). The opioid crisis has highlighted the risks of long-term opioid therapy for chronic non-cancer pain: tolerance, hyperalgesia, hormonal disruption, immunosuppression, and substance use disorder. Evidence supports opioid-sparing strategies using non-opioid pharmacotherapy, interventional procedures, and psychological therapies as first-line approaches for most chronic pain conditions." },
    riskFactors: ["Prior opioid exposure and tolerance development", "History of substance use disorder", "Psychiatric comorbidities (depression, anxiety, PTSD)", "Catastrophizing and passive coping styles", "Social isolation", "Work disability and litigation involvement", "Prescription opioid diversion in the community", "Inadequate pain education among providers"],
    diagnostics: ["Prescription Drug Monitoring Program (PDMP) review before every opioid prescription", "Urine drug testing (UDT) at baseline and randomly during opioid therapy", "Opioid Risk Tool (ORT) or SOAPP-R to stratify misuse risk", "Functional outcome measures (Oswestry Disability Index, PROMIS measures)", "Pain Catastrophizing Scale (PCS) to identify modifiable psychological factors", "Morphine milligram equivalent (MME) calculation for all opioid prescriptions"],
    management: ["Non-opioid first-line: SNRIs, gabapentinoids, topical lidocaine, capsaicin", "Non-pharmacologic: CBT, ACT, graded exercise therapy, yoga, acupuncture, TENS", "Interventional: epidural steroid injections, facet joint blocks, radiofrequency ablation, spinal cord stimulation", "If opioids indicated: lowest effective dose, < 50 MME/day, written treatment agreement", "Co-prescribe naloxone for patients on ≥ 50 MME/day or with risk factors", "Taper opioids gradually (10% dose reduction per week) when benefit-risk is unfavorable", "Buprenorphine for transition from full agonist opioids in complex pain/SUD overlap"],
    nursingActions: ["Check PDMP before every controlled substance prescription", "Perform and document periodic risk-benefit analysis of opioid therapy", "Conduct urine drug testing per practice protocol", "Establish and enforce opioid treatment agreements", "Calculate total MME and ensure dose is < 90 MME/day (ideally < 50 MME/day)", "Monitor for opioid use disorder signs (escalating doses, early refills, obtaining from multiple providers)"],
    assessmentFindings: ["Pain-function correlation (does pain control improve function?)", "Opioid-related adverse effects (constipation, sedation, hormonal changes, falls)", "Signs of opioid tolerance or opioid-induced hyperalgesia", "Aberrant drug-related behaviors (early refill requests, dose escalation, lost prescriptions)", "Functional status plateau or decline despite opioid therapy"],
    signs: {
      left: ["Pain improved with multimodal therapy", "Functional improvement documented", "No aberrant behaviors", "Stable or decreasing opioid requirements", "Active engagement in rehabilitation"],
      right: ["Escalating opioid requirements without functional improvement", "Multiple aberrant behaviors (early refills, lost prescriptions)", "Opioid-induced hyperalgesia (widespread pain worsening on opioids)", "Endocrinopathy (hypogonadism from chronic opioids)", "Signs of substance use disorder"]
    },
    medications: [{
      name: "Gabapentin",
      type: "Gabapentinoid / anticonvulsant",
      action: "Binds α2-δ subunit of voltage-gated calcium channels, reducing excitatory neurotransmitter release at dorsal horn synapses",
      sideEffects: "Sedation, dizziness, peripheral edema, weight gain, respiratory depression (especially with opioids)",
      contra: "Severe renal impairment (dose adjust), respiratory compromise",
      pearl: "First-line for neuropathic pain (diabetic neuropathy, postherpetic neuralgia); synergistic respiratory depression risk with opioids—use cautiously in combination"
    }],
    pearls: ["PDMP check is mandatory before every opioid prescription—many states require it by law", "50 MME/day threshold: risk of overdose death doubles compared to < 20 MME/day", "Co-prescribe naloxone for all patients on ≥ 50 MME/day or with SUD risk factors", "Opioid-induced hyperalgesia paradoxically worsens pain with increasing opioid doses—taper, don't escalate", "CBT for chronic pain has the strongest evidence among psychological therapies", "Buprenorphine (partial agonist) provides effective analgesia with ceiling effect on respiratory depression—ideal for complex pain/SUD patients"],
    quiz: [
      {
        question: "An NP is prescribing opioids for a patient with chronic pain. The current regimen totals 60 MME/day. What additional safety measure is recommended?",
        options: ["No additional measures needed below 90 MME", "Co-prescribe naloxone for overdose reversal", "Switch to a higher potency opioid at lower volume", "Discontinue all non-opioid analgesics"],
        correct: 1,
        rationale: "CDC guidelines recommend co-prescribing naloxone for patients on ≥ 50 MME/day to mitigate overdose risk."
      },
      {
        question: "A patient on chronic opioid therapy reports worsening widespread pain despite dose increases. What phenomenon should be suspected?",
        options: ["Disease progression", "Opioid-induced hyperalgesia", "Medication tolerance requiring higher doses", "Somatization disorder"],
        correct: 1,
        rationale: "Opioid-induced hyperalgesia (OIH) is a paradoxical increase in pain sensitivity caused by chronic opioid use. The treatment is opioid dose reduction or rotation, not escalation."
      },
      {
        question: "Which non-pharmacologic intervention has the strongest evidence for chronic pain management?",
        options: ["Massage therapy", "Cognitive behavioral therapy (CBT)", "Acupuncture", "Chiropractic manipulation"],
        correct: 1,
        rationale: "CBT has the strongest evidence base among psychological therapies for chronic pain, targeting maladaptive thoughts and behaviors that amplify pain perception and disability."
      }
    ]
  },
  "chronic-pancreatitis-management-np": {
    title: "Chronic Pancreatitis Management",
    cellular: { title: "Progressive Pancreatic Fibrosis", content: "Chronic pancreatitis involves progressive inflammatory destruction of pancreatic parenchyma with replacement by fibrotic tissue, leading to irreversible loss of exocrine (digestive enzymes) and endocrine (insulin, glucagon) function. Alcohol is the most common cause (60–70%), followed by genetic mutations (PRSS1, CFTR, SPINK1), autoimmune pancreatitis, and idiopathic causes. The sentinel acute pancreatitis event (SAPE) hypothesis proposes that an initial acute episode activates pancreatic stellate cells, which produce collagen and drive fibrosis through repeated injury-repair cycles. Progressive fibrosis causes ductal obstruction, calcification, and nerve damage producing chronic severe pain." },
    riskFactors: ["Chronic alcohol use (most common cause, 60–70%)", "Tobacco smoking (independent risk factor, accelerates progression)", "Recurrent acute pancreatitis episodes", "Genetic mutations (PRSS1 hereditary pancreatitis, CFTR, SPINK1)", "Hypertriglyceridemia (severe, > 1000 mg/dL)", "Autoimmune pancreatitis (IgG4-related disease)", "Tropical pancreatitis (tropical regions)", "Pancreatic duct obstruction (stricture, stones, tumors)"],
    diagnostics: ["CT abdomen showing pancreatic calcifications (pathognomonic), ductal dilation, parenchymal atrophy", "MRCP for ductal anatomy (dilation, strictures, stones)", "Endoscopic ultrasound (EUS)—most sensitive for early chronic pancreatitis", "Fecal elastase-1 < 200 μg/g confirms exocrine insufficiency", "72-hour fecal fat collection for steatorrhea quantification", "HbA1C and fasting glucose for endocrine insufficiency (type 3c diabetes)", "IgG4 levels if autoimmune pancreatitis suspected"],
    management: ["Absolute alcohol and tobacco cessation (critical to slow progression)", "Pancreatic enzyme replacement therapy (PERT) with meals for exocrine insufficiency", "Pain management: multimodal approach (acetaminophen, pregabalin, TCAs; minimize opioids)", "Insulin for type 3c diabetes (these patients are brittle—prone to hypoglycemia)", "Antioxidant therapy (selenium, vitamin C, vitamin E) may reduce pain", "ERCP for ductal decompression (stone extraction, stricture dilation, stenting)", "Surgical options: Frey procedure, Puestow procedure, total pancreatectomy with islet autotransplantation"],
    nursingActions: ["Monitor nutritional status: weight, BMI, fat-soluble vitamin levels (A, D, E, K)", "Administer PERT with meals and snacks (not between meals)", "Assess pain severity and functional impact at each visit", "Monitor blood glucose closely—type 3c diabetes is prone to hypoglycemia", "Provide alcohol cessation counseling and resources", "Educate on fat-soluble vitamin supplementation and dietary modifications"],
    assessmentFindings: ["Chronic epigastric pain radiating to the back, worsened by eating and alcohol", "Steatorrhea (foul-smelling, greasy, floating stools)", "Unintentional weight loss and malnutrition", "New-onset diabetes mellitus (type 3c)", "Fat-soluble vitamin deficiencies (A, D, E, K)"],
    signs: {
      left: ["Intermittent epigastric pain after meals", "Mild steatorrhea", "Normal glucose tolerance", "Preserved pancreatic function on fecal elastase", "Stable weight"],
      right: ["Constant severe pain requiring opioids", "Severe steatorrhea with malnutrition", "Brittle diabetes with hypoglycemic episodes", "Pancreatic calcifications on imaging", "Narcotic dependence and functional disability"]
    },
    medications: [{
      name: "Pancrelipase (Creon)",
      type: "Pancreatic enzyme replacement therapy (PERT)",
      action: "Provides exogenous lipase, protease, and amylase to digest fats, proteins, and carbohydrates when endogenous pancreatic secretion is insufficient",
      sideEffects: "Abdominal cramping, nausea, fibrosing colonopathy (very high doses in children with CF)",
      contra: "Pork allergy (porcine-derived enzymes), acute pancreatitis",
      pearl: "Administer with first bite of meals AND snacks; minimum 40,000–50,000 lipase units per meal; add PPI if inadequate response (gastric acid can inactivate enzymes)"
    }],
    pearls: ["Pancreatic calcifications on CT are pathognomonic for chronic pancreatitis", "Fecal elastase < 200 confirms exocrine insufficiency; < 100 is severe", "PERT must be taken with food, not on an empty stomach—enzymes need substrate to work on", "Type 3c diabetes is prone to hypoglycemia because glucagon production is also impaired", "Chronic pancreatitis increases pancreatic cancer risk 10–20 fold—surveillance recommended", "Total pancreatectomy with islet autotransplantation (TPIAT) is last resort for intractable pain"],
    quiz: [
      {
        question: "A patient with chronic pancreatitis reports foul-smelling, greasy stools and progressive weight loss. Fecal elastase is 85 μg/g. What is the appropriate treatment?",
        options: ["Loperamide for diarrhea control", "Pancreatic enzyme replacement therapy (PERT) with meals", "Cholestyramine for bile acid malabsorption", "High-fat diet to compensate for malabsorption"],
        correct: 1,
        rationale: "Fecal elastase < 100 indicates severe exocrine insufficiency. PERT (pancrelipase) provides exogenous enzymes to digest nutrients and must be taken with every meal and snack."
      },
      {
        question: "Why is type 3c diabetes in chronic pancreatitis particularly prone to hypoglycemia?",
        options: ["Patients are more insulin sensitive", "Both insulin and glucagon production are impaired", "They have increased hepatic glucose output", "Pancreatic enzymes interfere with glucose metabolism"],
        correct: 1,
        rationale: "In type 3c (pancreatogenic) diabetes, destruction of islet cells impairs both insulin and glucagon secretion. Without glucagon counter-regulation, hypoglycemia risk is significantly increased."
      },
      {
        question: "Which imaging finding is pathognomonic for chronic pancreatitis?",
        options: ["Pancreatic enlargement", "Pancreatic calcifications", "Common bile duct dilation", "Portal vein thrombosis"],
        correct: 1,
        rationale: "Pancreatic calcifications on CT are pathognomonic for chronic pancreatitis and represent calcium deposits within fibrotic pancreatic tissue and ducts."
      }
    ]
  },
  "churg-strauss-syndrome-rn": {
    title: "Eosinophilic Granulomatosis with Polyangiitis (Churg-Strauss)",
    cellular: { title: "Eosinophilic Vasculitis Pathogenesis", content: "Eosinophilic granulomatosis with polyangiitis (EGPA), formerly Churg-Strauss syndrome, is an ANCA-associated small-vessel vasculitis characterized by eosinophilic infiltration, granuloma formation, and necrotizing vasculitis. It progresses through three phases: prodromal (allergic rhinitis, nasal polyps, adult-onset asthma), eosinophilic (peripheral eosinophilia with tissue infiltration of lungs, GI tract, heart), and vasculitic (systemic vasculitis affecting skin, nerves, kidneys, heart). Cardiac involvement (eosinophilic myocarditis, coronary arteritis) is the leading cause of death." },
    riskFactors: ["Adult-onset asthma (present in nearly all cases)", "Allergic rhinitis and nasal polyposis", "History of allergic disease or atopy", "Use of leukotriene receptor antagonists (montelukast)—may unmask rather than cause EGPA", "Age 40–60 years", "No clear gender predominance"],
    diagnostics: ["Peripheral eosinophilia > 10% or > 1,500/μL (hallmark finding)", "ANCA testing: p-ANCA/anti-MPO positive in ~40% of cases", "Tissue biopsy showing eosinophilic infiltration, granulomas, and necrotizing vasculitis", "Chest X-ray/CT: transient, patchy, migratory pulmonary infiltrates", "Echocardiogram for eosinophilic myocarditis assessment", "Nerve conduction studies for mononeuritis multiplex", "Urinalysis for hematuria/proteinuria (renal involvement)"],
    management: ["High-dose systemic corticosteroids (prednisone 1 mg/kg/day) as initial therapy", "Cyclophosphamide for severe disease (cardiac, renal, CNS involvement)", "Mepolizumab (anti-IL-5) FDA-approved for relapsing/refractory EGPA", "Azathioprine or methotrexate for maintenance therapy after remission induction", "Manage concurrent asthma with inhaled corticosteroids and bronchodilators", "Monitor for disease relapse when tapering steroids"],
    nursingActions: ["Monitor CBC with differential for eosinophil count trending", "Assess respiratory status (asthma control, new infiltrates)", "Monitor cardiac function (report chest pain, arrhythmias, signs of heart failure)", "Assess for peripheral neuropathy symptoms (numbness, weakness, foot drop)", "Administer immunosuppressive medications safely and monitor for side effects", "Educate on infection risk while on immunosuppression"],
    assessmentFindings: ["Adult-onset severe asthma (often refractory to standard therapy)", "Migratory pulmonary infiltrates on imaging", "Peripheral neuropathy (mononeuritis multiplex—foot drop, wrist drop)", "Skin findings: palpable purpura, subcutaneous nodules", "Cardiac symptoms: chest pain, dyspnea, heart failure from eosinophilic myocarditis"],
    signs: {
      left: ["Worsening asthma symptoms", "Allergic rhinitis with nasal polyps", "Mild peripheral eosinophilia", "Transient pulmonary infiltrates", "Fatigue and malaise"],
      right: ["Eosinophilic myocarditis with heart failure", "Mononeuritis multiplex (foot drop)", "Severe peripheral eosinophilia > 5,000/μL", "Palpable purpura and skin nodules", "Renal involvement (glomerulonephritis)"]
    },
    medications: [{
      name: "Mepolizumab",
      type: "Anti-IL-5 monoclonal antibody",
      action: "Binds IL-5, the key cytokine driving eosinophil production, maturation, and survival, reducing eosinophilic inflammation",
      sideEffects: "Injection site reactions, headache, back pain, fatigue",
      contra: "Hypersensitivity to mepolizumab; caution in active helminth infections",
      pearl: "FDA-approved for EGPA in 2017; allows steroid dose reduction and maintains remission; also used for severe eosinophilic asthma"
    }],
    pearls: ["EGPA is the only ANCA-associated vasculitis with asthma and eosinophilia", "Cardiac involvement is the #1 cause of mortality—screen with echocardiogram", "The three phases (prodromal, eosinophilic, vasculitic) may overlap or not follow sequentially", "p-ANCA/anti-MPO is positive in only ~40%—ANCA-negative EGPA has more cardiac involvement", "Mononeuritis multiplex (asymmetric nerve involvement) is the most common neurologic finding", "Mepolizumab (anti-IL-5) is the first targeted biologic approved specifically for EGPA"],
    quiz: [
      {
        question: "A patient with adult-onset asthma develops peripheral eosinophilia, migratory pulmonary infiltrates, and foot drop. What is the most likely diagnosis?",
        options: ["Wegener granulomatosis (GPA)", "Eosinophilic granulomatosis with polyangiitis (EGPA)", "Microscopic polyangiitis", "Polyarteritis nodosa"],
        correct: 1,
        rationale: "The combination of adult-onset asthma, peripheral eosinophilia, pulmonary infiltrates, and mononeuritis multiplex (foot drop) is classic for EGPA (Churg-Strauss)."
      },
      {
        question: "What is the leading cause of death in EGPA?",
        options: ["Renal failure", "Pulmonary hemorrhage", "Cardiac involvement (eosinophilic myocarditis)", "Cerebral vasculitis"],
        correct: 2,
        rationale: "Cardiac involvement (eosinophilic myocarditis, coronary arteritis, pericarditis) is the leading cause of mortality in EGPA, occurring in up to 60% of patients."
      },
      {
        question: "Which biologic therapy is FDA-approved for relapsing EGPA?",
        options: ["Rituximab (anti-CD20)", "Mepolizumab (anti-IL-5)", "Infliximab (anti-TNF-α)", "Tocilizumab (anti-IL-6)"],
        correct: 1,
        rationale: "Mepolizumab targets IL-5, the key eosinophil growth factor, and is FDA-approved for EGPA. It reduces eosinophilic inflammation and allows corticosteroid dose reduction."
      }
    ]
  },
  "circumcision-care-rpn": {
    title: "Circumcision Care",
    cellular: { title: "Neonatal Wound Healing Post-Circumcision", content: "Circumcision involves surgical removal of the foreskin (prepuce) from the glans penis, creating a circumferential wound that heals by secondary intention over 7–10 days. The exposed glans initially appears red and may develop a yellowish fibrinous exudate (granulation tissue), which is a normal part of healing and should NOT be removed. Hemostasis is achieved through cautery or compression devices (Plastibell, Gomco clamp, Mogen clamp). Complications include bleeding, infection, adhesions, and meatal stenosis. The RPN monitors for complications and provides family education on wound care." },
    riskFactors: ["Bleeding disorders (hemophilia—must be ruled out before procedure)", "Prematurity (procedure deferred until medically stable)", "Hypospadias or other penile anomalies (foreskin needed for surgical repair)", "Family history of bleeding disorders", "Active infection at the site"],
    diagnostics: ["Visual assessment of circumcision site for healing, bleeding, or infection", "Monitor for adequate urination within 6–8 hours post-procedure", "Assess diaper for excessive bleeding (more than quarter-sized spot)", "Monitor vital signs for signs of pain or distress", "Assess for signs of infection: erythema, purulent drainage, swelling, foul odor"],
    management: ["Apply petroleum jelly (Vaseline) gauze to the site with each diaper change for 24–48 hours", "Gentle cleansing with warm water at diaper changes—no soap, wipes, or alcohol on the site", "Fan-fold diaper to reduce pressure on the penis", "Acetaminophen for pain management as ordered", "Plastibell ring: no petroleum jelly needed; ring falls off in 7–10 days", "Report persistent bleeding, signs of infection, or failure to urinate within 6–8 hours"],
    nursingActions: ["Assess circumcision site at every diaper change for bleeding, swelling, or discharge", "Apply petroleum jelly gauze to prevent adherence to diaper (Gomco/Mogen clamp methods)", "Monitor first void after circumcision—report if no urination within 6–8 hours", "Assess pain using neonatal pain scale (NIPS) and administer comfort measures", "Educate parents on normal appearance (yellow exudate is NORMAL granulation tissue)", "Report excessive bleeding (more than quarter-sized spot) to provider immediately"],
    assessmentFindings: ["Mild redness and swelling of the glans (normal for 2–3 days)", "Yellow fibrinous exudate over the glans (normal healing—NOT pus)", "Minimal spotting on diaper (normal)", "Plastibell ring intact and in proper position", "Infant voiding normally"],
    signs: {
      left: ["Mild redness of glans", "Yellow exudate (normal granulation)", "Small blood spot on diaper", "Normal voiding pattern", "Infant feeding well"],
      right: ["Active bright red bleeding soaking diaper", "Purulent green/foul-smelling drainage (infection)", "Failure to void > 8 hours post-procedure", "Plastibell displaced proximally (risk of tissue necrosis)", "Fever or signs of systemic infection"]
    },
    medications: [{
      name: "Acetaminophen (Infant)",
      type: "Analgesic/Antipyretic",
      action: "Centrally acting analgesic that inhibits prostaglandin synthesis in the CNS to reduce pain",
      sideEffects: "Hepatotoxicity with overdose",
      contra: "Hepatic impairment, accurate weight-based dosing essential in neonates",
      pearl: "Dose 10–15 mg/kg/dose every 4–6 hours as needed for post-circumcision pain; never exceed 75 mg/kg/day in neonates; sucrose pacifier also provides non-pharmacologic pain relief"
    }],
    pearls: ["Yellow exudate on the glans is NORMAL granulation tissue—educate parents not to remove it", "Petroleum jelly gauze prevents the healing site from adhering to the diaper", "First void should occur within 6–8 hours; failure may indicate meatal edema or obstruction", "Plastibell ring should fall off naturally in 7–10 days—never pull it off", "Always confirm no bleeding disorder or hypospadias before circumcision", "A sucrose-dipped pacifier during the procedure provides effective non-pharmacologic analgesia"],
    quiz: [
      {
        question: "A parent calls concerned about a yellowish coating on their newborn's circumcision site 3 days post-procedure. What is the best response?",
        options: ["Advise them to gently scrub off the yellow coating", "Explain that yellow exudate is normal granulation tissue and part of healing", "Tell them to bring the baby to the ED immediately", "Recommend applying antibiotic ointment"],
        correct: 1,
        rationale: "The yellow fibrinous exudate is normal granulation tissue that forms during wound healing by secondary intention. It should NOT be removed, as this would disrupt the healing process."
      },
      {
        question: "When should the nurse report a concern after neonatal circumcision?",
        options: ["Mild redness of the glans", "Small blood spot on diaper", "No urination 8 hours after the procedure", "Yellow exudate on the glans"],
        correct: 2,
        rationale: "Failure to void within 6–8 hours post-circumcision may indicate meatal edema or obstruction and should be reported to the provider for evaluation."
      },
      {
        question: "Which condition is a contraindication to circumcision in a newborn?",
        options: ["Jaundice requiring phototherapy", "Hypospadias", "Large for gestational age", "Positive Coombs test"],
        correct: 1,
        rationale: "Hypospadias is a contraindication because the foreskin tissue may be needed for future surgical repair of the urethral defect."
      }
    ]
  }
};
