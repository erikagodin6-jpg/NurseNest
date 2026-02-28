import { Pool } from "pg";

const SYSTEM_USER_ID = "system-nursenest";

interface SeedDeck {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  cards: { front: string; back: string; rationale?: string }[];
}

const preNursingDecks: SeedDeck[] = [
  {
    title: "Medical Terminology Essentials",
    slug: "medical-terminology-essentials",
    description: "Master root words, prefixes, and suffixes used in nursing and medicine. Essential for pre-nursing students.",
    tags: ["pre-nursing", "terminology", "fundamentals"],
    cards: [
      { front: "What does the prefix 'hyper-' mean?", back: "Above normal / excessive", rationale: "Example: Hypertension = excessively high blood pressure" },
      { front: "What does the prefix 'hypo-' mean?", back: "Below normal / deficient", rationale: "Example: Hypoglycemia = below-normal blood glucose" },
      { front: "What does the suffix '-itis' indicate?", back: "Inflammation", rationale: "Example: Appendicitis = inflammation of the appendix" },
      { front: "What does the suffix '-ectomy' mean?", back: "Surgical removal", rationale: "Example: Appendectomy = surgical removal of the appendix" },
      { front: "What does the suffix '-osis' indicate?", back: "Abnormal condition or disease", rationale: "Example: Cyanosis = abnormal blue discoloration" },
      { front: "What does 'tachy-' mean?", back: "Fast / rapid", rationale: "Example: Tachycardia = abnormally fast heart rate (>100 bpm)" },
      { front: "What does 'brady-' mean?", back: "Slow", rationale: "Example: Bradycardia = abnormally slow heart rate (<60 bpm)" },
      { front: "What does '-pnea' refer to?", back: "Breathing", rationale: "Dyspnea = difficult breathing; Apnea = absence of breathing" },
      { front: "What does the prefix 'hemo-' or 'hemato-' mean?", back: "Blood", rationale: "Hematuria = blood in urine; Hemorrhage = excessive bleeding" },
      { front: "What does '-ology' mean?", back: "Study of", rationale: "Cardiology = study of the heart; Neurology = study of the nervous system" },
      { front: "What does 'nephro-' refer to?", back: "Kidney", rationale: "Nephrology = study of kidney diseases; Nephrectomy = kidney removal" },
      { front: "What does 'hepato-' refer to?", back: "Liver", rationale: "Hepatitis = liver inflammation; Hepatomegaly = enlarged liver" },
      { front: "What does '-algia' mean?", back: "Pain", rationale: "Myalgia = muscle pain; Neuralgia = nerve pain" },
      { front: "What does 'cardi-' or 'cardio-' refer to?", back: "Heart", rationale: "Cardiomegaly = enlarged heart; Cardiomyopathy = heart muscle disease" },
      { front: "What does the suffix '-scopy' mean?", back: "Visual examination", rationale: "Colonoscopy = visual examination of the colon" },
      { front: "What does 'dys-' mean?", back: "Difficult, painful, abnormal", rationale: "Dysphagia = difficulty swallowing; Dysuria = painful urination" },
      { front: "What does '-emia' refer to?", back: "Blood condition", rationale: "Anemia = deficiency of red blood cells; Septicemia = blood infection" },
      { front: "What does 'poly-' mean?", back: "Many / excessive", rationale: "Polyuria = excessive urination; Polydipsia = excessive thirst" },
      { front: "What does 'pneumo-' refer to?", back: "Lung / air", rationale: "Pneumonia = lung infection; Pneumothorax = air in pleural space" },
      { front: "What does '-plasty' mean?", back: "Surgical repair / reconstruction", rationale: "Rhinoplasty = nose reconstruction; Arthroplasty = joint repair" },
    ],
  },
  {
    title: "Cell Biology for Nursing",
    slug: "cell-biology-nursing",
    description: "Understand cell structure, organelles, and cellular processes essential for nursing pathophysiology.",
    tags: ["pre-nursing", "biology", "cells", "A&P"],
    cards: [
      { front: "What is the function of the cell membrane?", back: "Selectively permeable barrier that controls what enters and exits the cell", rationale: "Uses phospholipid bilayer with embedded proteins for transport" },
      { front: "What is the function of mitochondria?", back: "Produce ATP (cellular energy) through aerobic respiration", rationale: "Known as the 'powerhouse of the cell.' Cells with high energy needs (muscle, liver) have more mitochondria" },
      { front: "What is the nucleus responsible for?", back: "Contains DNA and controls cell activities including protein synthesis", rationale: "The 'control center' of the cell. Red blood cells lack a nucleus" },
      { front: "What does the endoplasmic reticulum (ER) do?", back: "Rough ER: synthesizes proteins. Smooth ER: synthesizes lipids and detoxifies drugs", rationale: "Liver cells have extensive smooth ER for drug metabolism" },
      { front: "What is osmosis?", back: "Movement of water across a semipermeable membrane from low solute concentration to high solute concentration", rationale: "Critical for understanding IV fluid therapy and electrolyte balance" },
      { front: "What is active transport?", back: "Movement of substances against their concentration gradient, requiring ATP energy", rationale: "The sodium-potassium pump (Na+/K+ ATPase) is a key example" },
      { front: "What is the difference between hypertonic, hypotonic, and isotonic solutions?", back: "Hypertonic: higher solute (cell shrinks). Hypotonic: lower solute (cell swells). Isotonic: equal solute (no change)", rationale: "Essential for IV fluid selection: 0.9% NS is isotonic; D5W is hypotonic once metabolized" },
      { front: "What are the phases of the cell cycle?", back: "Interphase (G1, S, G2) → Mitosis (prophase, metaphase, anaphase, telophase) → Cytokinesis", rationale: "Chemotherapy drugs target specific phases to kill rapidly dividing cancer cells" },
      { front: "What is apoptosis?", back: "Programmed cell death — a controlled, orderly process of cell self-destruction", rationale: "Differs from necrosis (uncontrolled cell death from injury). Important in cancer biology" },
      { front: "What is diffusion?", back: "Movement of particles from an area of high concentration to low concentration (passive, no energy required)", rationale: "Gas exchange in the lungs occurs via diffusion: O2 diffuses into blood, CO2 diffuses out" },
      { front: "What are lysosomes?", back: "Organelles containing digestive enzymes that break down cellular waste, bacteria, and damaged organelles", rationale: "Dysfunction leads to lysosomal storage diseases (e.g., Tay-Sachs)" },
      { front: "What is the Golgi apparatus?", back: "Modifies, packages, and sorts proteins for secretion or use within the cell", rationale: "Acts as the cell's 'post office' — processes and ships products" },
    ],
  },
  {
    title: "pH, Buffers & Acid-Base Basics",
    slug: "ph-buffers-acid-base-basics",
    description: "Foundation concepts for understanding acid-base balance, essential for ABG interpretation.",
    tags: ["pre-nursing", "chemistry", "acid-base", "ABG"],
    cards: [
      { front: "What is the normal blood pH range?", back: "7.35 – 7.45", rationale: "Below 7.35 = acidosis; Above 7.45 = alkalosis. Life-threatening outside 6.8–7.8" },
      { front: "What is an acid?", back: "A substance that donates hydrogen ions (H+), lowering pH", rationale: "More H+ ions = lower pH = more acidic" },
      { front: "What is a base (alkali)?", back: "A substance that accepts hydrogen ions (H+), raising pH", rationale: "Bicarbonate (HCO3-) is the body's main base buffer" },
      { front: "What are the 3 buffer systems in the body?", back: "1) Bicarbonate buffer system 2) Respiratory system (CO2) 3) Renal system (kidneys)", rationale: "Bicarb: immediate. Lungs: minutes. Kidneys: hours to days" },
      { front: "How do the lungs regulate pH?", back: "By adjusting CO2 elimination: faster breathing = more CO2 blown off = pH rises", rationale: "CO2 is an acid. Hyperventilation causes respiratory alkalosis" },
      { front: "How do the kidneys regulate pH?", back: "By excreting or retaining H+ and HCO3-", rationale: "Kidneys can regenerate bicarbonate. Slowest but most powerful buffer" },
      { front: "What is the normal PaCO2 range?", back: "35–45 mmHg", rationale: "CO2 is regulated by the respiratory system. High CO2 = acidosis" },
      { front: "What is the normal HCO3- range?", back: "22–26 mEq/L", rationale: "Bicarbonate is the metabolic component. Low HCO3 = metabolic acidosis" },
      { front: "What does compensation mean in acid-base?", back: "The opposite system (respiratory or metabolic) adjusts to normalize pH", rationale: "If metabolic acidosis → lungs compensate by hyperventilating to blow off CO2" },
      { front: "What is a buffer?", back: "A chemical system that resists changes in pH by absorbing excess H+ or OH- ions", rationale: "The bicarbonate-carbonic acid system is the most important extracellular buffer" },
    ],
  },
  {
    title: "Homeostasis & Vital Signs",
    slug: "homeostasis-vital-signs",
    description: "Understand homeostatic mechanisms and normal vital sign ranges for nursing assessment.",
    tags: ["pre-nursing", "fundamentals", "vitals", "assessment"],
    cards: [
      { front: "What is homeostasis?", back: "The body's ability to maintain a stable internal environment despite external changes", rationale: "Temperature regulation, blood glucose control, and fluid balance are all examples" },
      { front: "What is normal adult body temperature?", back: "36.1°C – 37.2°C (97°F – 99°F)", rationale: "Fever (pyrexia) ≥ 38°C (100.4°F). Hypothermia < 35°C (95°F)" },
      { front: "What is normal adult heart rate?", back: "60–100 beats per minute (bpm)", rationale: "Tachycardia > 100 bpm; Bradycardia < 60 bpm. Athletes may normally be < 60" },
      { front: "What is normal adult blood pressure?", back: "Systolic < 120 mmHg and Diastolic < 80 mmHg", rationale: "Hypertension Stage 1: 130-139/80-89. Hypertensive crisis: > 180/120" },
      { front: "What is normal adult respiratory rate?", back: "12–20 breaths per minute", rationale: "Tachypnea > 20; Bradypnea < 12. Apnea = absence of breathing" },
      { front: "What is normal SpO2 (oxygen saturation)?", back: "95–100%", rationale: "Below 90% is concerning. COPD patients may have a baseline of 88-92%" },
      { front: "What is a negative feedback loop?", back: "A mechanism where the output reduces the original stimulus to maintain homeostasis", rationale: "Example: High blood glucose → insulin release → glucose drops → insulin stops" },
      { front: "What is a positive feedback loop?", back: "A mechanism where the output amplifies the original stimulus", rationale: "Example: Oxytocin during labor — contractions increase oxytocin which increases contractions" },
      { front: "What is the normal urine output for adults?", back: "0.5–1 mL/kg/hr (approximately 30–60 mL/hr)", rationale: "Output < 0.5 mL/kg/hr may indicate dehydration, renal failure, or shock" },
      { front: "What is pulse pressure?", back: "The difference between systolic and diastolic BP (normal: 30-40 mmHg)", rationale: "Widened pulse pressure seen in increased ICP; narrowed in shock" },
    ],
  },
];

const apDecks: SeedDeck[] = [
  {
    title: "Cardiovascular System — Anatomy & Physiology",
    slug: "cardiovascular-anatomy-physiology",
    description: "Heart chambers, valves, blood flow, cardiac cycle, and conduction system for nursing students.",
    tags: ["A&P", "cardiovascular", "heart", "anatomy"],
    cards: [
      { front: "Trace blood flow through the heart", back: "Vena cava → RA → Tricuspid valve → RV → Pulmonic valve → Pulmonary artery → Lungs → Pulmonary veins → LA → Mitral valve → LV → Aortic valve → Aorta", rationale: "Mnemonic: 'Tri before you Bi' — tricuspid is on the right, bicuspid (mitral) on the left" },
      { front: "What are the components of the cardiac conduction system?", back: "SA node → AV node → Bundle of His → Right and left bundle branches → Purkinje fibers", rationale: "SA node is the primary pacemaker (60-100 bpm). AV node backup (40-60 bpm)" },
      { front: "What is cardiac output (CO)?", back: "CO = Heart Rate × Stroke Volume. Normal: 4-8 L/min", rationale: "Stroke volume affected by preload, afterload, and contractility" },
      { front: "What is preload?", back: "The volume of blood in the ventricles at the end of diastole (end-diastolic volume)", rationale: "Increased by IV fluids; decreased by diuretics. Think: 'the stretch before the beat'" },
      { front: "What is afterload?", back: "The resistance the heart must pump against to eject blood (primarily systemic vascular resistance)", rationale: "Increased by vasoconstriction/HTN. Vasodilators decrease afterload" },
      { front: "What does the P wave represent on ECG?", back: "Atrial depolarization (atrial contraction)", rationale: "Absent P waves may indicate atrial fibrillation" },
      { front: "What does the QRS complex represent?", back: "Ventricular depolarization (ventricular contraction)", rationale: "Normal duration: 0.06-0.12 seconds. Wide QRS (>0.12s) may indicate bundle branch block" },
      { front: "What coronary artery supplies the left ventricle?", back: "Left anterior descending (LAD) artery", rationale: "Called 'the widow maker' — occlusion causes massive anterior MI" },
      { front: "What are the normal hemodynamic values for CVP?", back: "Central Venous Pressure: 2-6 mmHg", rationale: "Elevated in right heart failure, fluid overload. Low in hypovolemia" },
      { front: "What is ejection fraction (EF)?", back: "Percentage of blood pumped out of the LV with each contraction. Normal: 55-70%", rationale: "EF < 40% = systolic heart failure (HFrEF)" },
      { front: "What is the Frank-Starling law?", back: "The more the heart muscle is stretched (preload), the greater the force of contraction, up to a point", rationale: "In heart failure, the muscle is overstretched and this mechanism fails" },
      { front: "What valve prevents backflow from the aorta to the LV?", back: "Aortic valve", rationale: "Aortic regurgitation causes a diastolic murmur and bounding pulses" },
    ],
  },
  {
    title: "Respiratory System — Anatomy & Physiology",
    slug: "respiratory-anatomy-physiology",
    description: "Airways, gas exchange, lung volumes, and respiratory mechanics for nursing students.",
    tags: ["A&P", "respiratory", "lungs", "anatomy"],
    cards: [
      { front: "What is the primary function of the respiratory system?", back: "Gas exchange: deliver O2 to tissues and remove CO2", rationale: "External respiration occurs in alveoli; internal respiration occurs at tissue level" },
      { front: "Where does gas exchange occur?", back: "In the alveoli of the lungs, across the alveolar-capillary membrane", rationale: "~300 million alveoli provide enormous surface area (~70 m²)" },
      { front: "What is tidal volume (TV)?", back: "Volume of air inhaled or exhaled in one normal breath (~500 mL)", rationale: "Used in ventilator settings: typically 6-8 mL/kg ideal body weight" },
      { front: "What is the oxyhemoglobin dissociation curve?", back: "Shows the relationship between PaO2 and hemoglobin oxygen saturation", rationale: "Right shift (↑ unloading): fever, acidosis, ↑2,3-DPG. Left shift (↑ binding): alkalosis, hypothermia" },
      { front: "What causes the Hering-Breuer reflex?", back: "Stretch receptors in the lungs prevent over-inflation by inhibiting inspiration", rationale: "A protective mechanism — triggers expiration when lungs are maximally inflated" },
      { front: "What is ventilation-perfusion (V/Q) matching?", back: "The balance between alveolar ventilation and pulmonary capillary blood flow", rationale: "V/Q mismatch is the most common cause of hypoxemia. PE causes dead space (ventilation without perfusion)" },
      { front: "What is residual volume?", back: "Volume of air remaining in the lungs after maximal exhalation (~1200 mL)", rationale: "Prevents alveolar collapse. Increased in obstructive diseases (air trapping)" },
      { front: "What muscles are used in normal inspiration?", back: "Diaphragm (primary) and external intercostals", rationale: "Accessory muscles (SCM, scalenes) used in respiratory distress — a key assessment finding" },
      { front: "What is surfactant?", back: "A phospholipid produced by Type II alveolar cells that reduces surface tension and prevents alveolar collapse", rationale: "Premature infants lack surfactant → neonatal respiratory distress syndrome" },
      { front: "What is the normal PaO2 range?", back: "80-100 mmHg", rationale: "PaO2 < 60 mmHg = respiratory failure requiring intervention" },
    ],
  },
  {
    title: "Renal System — Anatomy & Physiology",
    slug: "renal-anatomy-physiology",
    description: "Nephron structure, filtration, fluid balance, and renal function for nursing students.",
    tags: ["A&P", "renal", "kidneys", "fluid balance"],
    cards: [
      { front: "What is the functional unit of the kidney?", back: "The nephron (~1 million per kidney)", rationale: "Each nephron filters blood, reabsorbs nutrients, and secretes waste" },
      { front: "What is GFR (glomerular filtration rate)?", back: "The rate at which blood is filtered by the glomeruli. Normal: ~120 mL/min", rationale: "GFR < 60 for 3+ months = chronic kidney disease. GFR < 15 = kidney failure" },
      { front: "What hormones do the kidneys produce?", back: "Erythropoietin (EPO), Renin, Active Vitamin D (calcitriol)", rationale: "CKD → low EPO → anemia; low calcitriol → low calcium → bone disease" },
      { front: "What does aldosterone do?", back: "Promotes sodium reabsorption and potassium excretion in the distal tubule", rationale: "Released by adrenal cortex via RAAS. Aldosterone = 'salt-saving hormone'" },
      { front: "What does ADH (antidiuretic hormone) do?", back: "Promotes water reabsorption in the collecting ducts, concentrating urine", rationale: "SIADH = excess ADH → dilutional hyponatremia. Diabetes insipidus = low ADH → dilute urine" },
      { front: "What is the normal BUN range?", back: "10-20 mg/dL", rationale: "BUN elevated in dehydration, GI bleeding, high protein intake, kidney disease" },
      { front: "What is the normal serum creatinine range?", back: "0.6-1.2 mg/dL", rationale: "Creatinine is the most reliable indicator of kidney function. Rises when ~50% nephrons lost" },
      { front: "What is the RAAS system?", back: "Renin → Angiotensinogen → Angiotensin I → (ACE) → Angiotensin II → Aldosterone release", rationale: "ACE inhibitors (-pril drugs) block this cascade. Used in HTN and heart failure" },
      { front: "What is the normal urine specific gravity?", back: "1.005-1.030", rationale: "Low: overhydration or diabetes insipidus. High: dehydration or SIADH" },
      { front: "Where is most glucose and sodium reabsorbed?", back: "In the proximal convoluted tubule (PCT)", rationale: "~65% of filtered sodium and nearly 100% of glucose reabsorbed here" },
    ],
  },
  {
    title: "Nervous System — Anatomy & Physiology",
    slug: "nervous-system-anatomy-physiology",
    description: "CNS, PNS, neurons, reflexes, and cranial nerves for nursing students.",
    tags: ["A&P", "neuro", "nervous system", "anatomy"],
    cards: [
      { front: "What are the two divisions of the nervous system?", back: "Central Nervous System (brain + spinal cord) and Peripheral Nervous System (cranial + spinal nerves)", rationale: "CNS is protected by meninges, CSF, and bone" },
      { front: "What are the 3 layers of meninges (outer to inner)?", back: "Dura mater → Arachnoid mater → Pia mater", rationale: "Epidural hematoma: between skull and dura. Subdural: between dura and arachnoid. Subarachnoid hemorrhage: between arachnoid and pia" },
      { front: "What is the function of the sympathetic nervous system?", back: "Fight or flight: increases HR, BP, bronchodilation, pupil dilation, diverts blood to muscles", rationale: "Releases norepinephrine and epinephrine. Opposite of parasympathetic" },
      { front: "What is the function of the parasympathetic nervous system?", back: "Rest and digest: decreases HR, increases GI motility, constricts pupils", rationale: "Mediated by the vagus nerve (CN X). Releases acetylcholine" },
      { front: "What are the lobes of the brain and their primary functions?", back: "Frontal: personality, judgment, motor. Parietal: sensory, spatial. Temporal: hearing, memory. Occipital: vision", rationale: "Broca's area (frontal): speech production. Wernicke's area (temporal): speech comprehension" },
      { front: "What is the Glasgow Coma Scale (GCS) range?", back: "3-15. Eye opening (1-4) + Verbal response (1-5) + Motor response (1-6)", rationale: "GCS ≤ 8 = severe (intubation needed). GCS 9-12 = moderate. GCS 13-15 = mild" },
      { front: "What is the blood-brain barrier (BBB)?", back: "A selective barrier formed by tight junctions in brain capillaries that restricts passage of substances", rationale: "Allows lipid-soluble and small molecules through. Many drugs cannot cross it" },
      { front: "What does cranial nerve X (vagus) innervate?", back: "Heart, lungs, and GI tract — controls HR, breathing, digestion", rationale: "Vagal stimulation slows the heart. Bearing down (Valsalva) stimulates the vagus nerve" },
      { front: "What is the normal intracranial pressure (ICP)?", back: "5-15 mmHg", rationale: "ICP > 20 mmHg requires intervention. Signs of ↑ICP: headache, vomiting, altered LOC, Cushing's triad" },
      { front: "What is Cushing's triad?", back: "Hypertension + Bradycardia + Irregular respirations", rationale: "Late sign of increased ICP — indicates brainstem compression. Medical emergency" },
    ],
  },
  {
    title: "Endocrine System — Anatomy & Physiology",
    slug: "endocrine-anatomy-physiology",
    description: "Hormones, glands, and endocrine disorders for nursing students.",
    tags: ["A&P", "endocrine", "hormones", "anatomy"],
    cards: [
      { front: "What hormones does the anterior pituitary produce?", back: "FSH, LH, ACTH, TSH, GH, Prolactin", rationale: "Mnemonic: FLAT PiG (FSH, LH, ACTH, TSH, Prolactin, GH)" },
      { front: "What hormones does the posterior pituitary release?", back: "ADH (vasopressin) and Oxytocin", rationale: "These are actually produced in the hypothalamus and stored/released by posterior pituitary" },
      { front: "What does insulin do?", back: "Lowers blood glucose by promoting cellular uptake and glycogen storage", rationale: "Produced by beta cells of the pancreas. Deficiency = diabetes mellitus" },
      { front: "What does glucagon do?", back: "Raises blood glucose by stimulating glycogenolysis and gluconeogenesis in the liver", rationale: "Produced by alpha cells of the pancreas. Used to treat severe hypoglycemia" },
      { front: "What hormones does the thyroid gland produce?", back: "T3 (triiodothyronine), T4 (thyroxine), and Calcitonin", rationale: "T3/T4 regulate metabolism. Calcitonin lowers serum calcium ('calci-tonin tones down calcium')" },
      { front: "What is the difference between Addison's disease and Cushing's syndrome?", back: "Addison's: adrenal insufficiency (low cortisol/aldosterone). Cushing's: excess cortisol", rationale: "Addison's: hypotension, hyperkalemia, bronze skin. Cushing's: moon face, buffalo hump, hyperglycemia" },
      { front: "What does the parathyroid hormone (PTH) do?", back: "Raises serum calcium by stimulating bone resorption, renal reabsorption, and vitamin D activation", rationale: "PTH and calcitonin have opposite effects on calcium. Hyperparathyroidism → hypercalcemia" },
      { front: "What does cortisol do?", back: "Increases blood glucose, suppresses immune response, and mobilizes nutrients during stress", rationale: "Produced by adrenal cortex. Chronic elevation causes Cushing's syndrome" },
      { front: "What is the normal fasting blood glucose range?", back: "70-100 mg/dL (3.9-5.6 mmol/L)", rationale: "Pre-diabetes: 100-125 mg/dL. Diabetes: ≥126 mg/dL. Hypoglycemia: <70 mg/dL" },
      { front: "What is the normal HbA1c target for diabetics?", back: "< 7% (reflects average blood glucose over 2-3 months)", rationale: "HbA1c 7% ≈ average glucose of 154 mg/dL. Each 1% change ≈ 30 mg/dL change" },
    ],
  },
  {
    title: "GI System — Anatomy & Physiology",
    slug: "gi-system-anatomy-physiology",
    description: "Digestive tract, accessory organs, enzymes, and GI physiology for nursing students.",
    tags: ["A&P", "GI", "digestive", "anatomy"],
    cards: [
      { front: "What is the order of the GI tract?", back: "Mouth → Esophagus → Stomach → Duodenum → Jejunum → Ileum → Cecum → Ascending colon → Transverse colon → Descending colon → Sigmoid → Rectum → Anus", rationale: "The small intestine has 3 parts: duodenum (shortest), jejunum (middle), ileum (longest)" },
      { front: "Where are most nutrients absorbed?", back: "In the small intestine, primarily the jejunum", rationale: "Villi and microvilli increase surface area. B12 and bile salts absorbed in ileum" },
      { front: "What does the liver produce?", back: "Bile, albumin, clotting factors, and processes drugs/toxins", rationale: "Liver failure → low albumin → edema; low clotting factors → bleeding; high ammonia → encephalopathy" },
      { front: "What is the function of bile?", back: "Emulsifies fats (breaks large fat globules into smaller droplets) for easier digestion", rationale: "Produced by liver, stored in gallbladder, released into duodenum" },
      { front: "What does the pancreas secrete?", back: "Exocrine: digestive enzymes (lipase, amylase, trypsin) and bicarbonate. Endocrine: insulin and glucagon", rationale: "Pancreatitis → elevated amylase and lipase" },
      { front: "What is normal serum albumin?", back: "3.5-5.0 g/dL", rationale: "Low albumin → third-spacing, edema. Indicator of nutritional status and liver function" },
      { front: "Where is the appendix located?", back: "Right lower quadrant (RLQ) at McBurney's point", rationale: "Appendicitis pain starts periumbilical then localizes to RLQ. Rebound tenderness is classic" },
      { front: "What enzyme breaks down starch?", back: "Amylase (salivary and pancreatic)", rationale: "Elevated amylase and lipase are diagnostic markers for acute pancreatitis" },
      { front: "What is peristalsis?", back: "Wave-like muscular contractions that move food through the GI tract", rationale: "Absent bowel sounds post-op may indicate paralytic ileus" },
      { front: "What are the 4 layers of the GI wall?", back: "Mucosa → Submucosa → Muscularis → Serosa", rationale: "Cancer staging depends on which layers are involved (TNM staging)" },
    ],
  },
];

const electrolyteDecks: SeedDeck[] = [
  {
    title: "Sodium Disorders — Hypo & Hypernatremia",
    slug: "sodium-disorders-hyponatremia-hypernatremia",
    description: "Causes, symptoms, and nursing management of sodium imbalances. Essential for NCLEX prep.",
    tags: ["electrolytes", "sodium", "fluids", "NCLEX"],
    cards: [
      { front: "What is the normal serum sodium range?", back: "135-145 mEq/L", rationale: "Sodium is the most abundant extracellular cation and major determinant of serum osmolality" },
      { front: "What are signs of hyponatremia (<135)?", back: "Confusion, lethargy, headache, nausea, seizures, muscle cramps", rationale: "Severe hyponatremia (<120) can cause cerebral edema and death. Neuro symptoms dominate" },
      { front: "What are common causes of hyponatremia?", back: "SIADH, water intoxication, diuretics (thiazides), heart failure, liver cirrhosis, Addison's disease", rationale: "Dilutional hyponatremia: too much water. Depletional: sodium loss" },
      { front: "What is the danger of correcting hyponatremia too quickly?", back: "Osmotic demyelination syndrome (central pontine myelinolysis)", rationale: "Correct no faster than 8-12 mEq/L per 24 hours. Causes irreversible brain damage" },
      { front: "What are signs of hypernatremia (>145)?", back: "Thirst, dry mucous membranes, restlessness, irritability, seizures, elevated temperature", rationale: "Water shifts out of cells → cellular dehydration. Brain cells most affected" },
      { front: "What are common causes of hypernatremia?", back: "Dehydration, diabetes insipidus, excessive sodium intake, watery diarrhea, fever", rationale: "Most common cause in hospitalized patients: inadequate free water intake" },
      { front: "What IV fluid is used for hypernatremia?", back: "Hypotonic solutions (0.45% NS or D5W) to replace free water", rationale: "Correct slowly to prevent cerebral edema. Max correction: 10-12 mEq/L per 24 hours" },
      { front: "What is SIADH?", back: "Syndrome of Inappropriate ADH — excessive ADH causes water retention → dilutional hyponatremia", rationale: "Treatment: fluid restriction, hypertonic saline for severe cases, demeclocycline" },
      { front: "What is diabetes insipidus (DI)?", back: "Deficiency of ADH (central) or kidney resistance to ADH (nephrogenic) → excessive dilute urine", rationale: "Urine SG < 1.005, urine output 5-20 L/day. Central DI treated with desmopressin (DDAVP)" },
      { front: "How does sodium affect fluid balance?", back: "Water follows sodium — where sodium goes, water follows (osmotic pull)", rationale: "This principle guides IV fluid therapy. Hypertonic saline pulls water into vasculature" },
    ],
  },
  {
    title: "Potassium Disorders — Hypo & Hyperkalemia",
    slug: "potassium-disorders-hypokalemia-hyperkalemia",
    description: "Critical potassium imbalances, ECG changes, and nursing interventions for NCLEX.",
    tags: ["electrolytes", "potassium", "cardiac", "NCLEX"],
    cards: [
      { front: "What is the normal serum potassium range?", back: "3.5-5.0 mEq/L", rationale: "Potassium is the major intracellular cation. Even small changes can be life-threatening" },
      { front: "What ECG changes occur with hypokalemia?", back: "Flattened T waves, ST depression, prominent U waves, prolonged QT", rationale: "Mnemonic: 'No Pot, No T, Big U' — T waves flatten, U waves appear" },
      { front: "What ECG changes occur with hyperkalemia?", back: "Tall peaked T waves → widened QRS → sine wave → cardiac arrest", rationale: "Hyperkalemia is a cardiac emergency. K+ > 6.5 = urgent treatment needed" },
      { front: "What are common causes of hypokalemia?", back: "Diuretics (loop/thiazide), vomiting, NG suction, diarrhea, alkalosis, insulin administration", rationale: "Alkalosis shifts K+ into cells. Always check K+ before giving insulin" },
      { front: "What are common causes of hyperkalemia?", back: "Renal failure, ACE inhibitors/ARBs, potassium-sparing diuretics, crush injuries, acidosis, burns", rationale: "Acidosis shifts K+ out of cells. Hemolyzed lab specimens give false highs" },
      { front: "What is the maximum IV potassium infusion rate?", back: "10-20 mEq/hour (NEVER IV push). Must be on cardiac monitor", rationale: "Rapid IV potassium can cause fatal cardiac arrest. Always dilute and infuse slowly" },
      { front: "What is the treatment for severe hyperkalemia?", back: "1) Calcium gluconate (cardiac protection) 2) Insulin + D50 (shifts K+ into cells) 3) Kayexalate (removes K+) 4) Dialysis", rationale: "Calcium gluconate is given FIRST to stabilize the myocardium but doesn't lower K+" },
      { front: "Why is potassium important for cardiac function?", back: "K+ is essential for cardiac muscle repolarization and maintaining normal heart rhythm", rationale: "Both hypo and hyperkalemia cause dysrhythmias. Digoxin toxicity worsened by hypokalemia" },
      { front: "What drugs can cause hyperkalemia?", back: "ACE inhibitors, ARBs, potassium-sparing diuretics (spironolactone), NSAIDs, succinylcholine", rationale: "Monitor K+ levels when starting these medications, especially in renal impairment" },
      { front: "What foods are high in potassium?", back: "Bananas, oranges, potatoes, tomatoes, avocados, spinach, dried fruits, beans", rationale: "Teach patients on K+-sparing diuretics to AVOID high-K+ foods. Teach those on loop diuretics to EAT more" },
    ],
  },
  {
    title: "Calcium & Magnesium Disorders",
    slug: "calcium-magnesium-disorders",
    description: "Hypo/hypercalcemia and hypo/hypermagnesemia — signs, causes, and NCLEX nursing interventions.",
    tags: ["electrolytes", "calcium", "magnesium", "NCLEX"],
    cards: [
      { front: "What is the normal serum calcium range?", back: "8.5-10.5 mg/dL (total) or 4.5-5.5 mg/dL (ionized)", rationale: "Always interpret with albumin level. Low albumin → falsely low total calcium" },
      { front: "What is Trousseau's sign?", back: "Carpal spasm (hand spasm) when BP cuff is inflated above systolic for 3 minutes", rationale: "Positive in hypocalcemia. The spasm occurs due to neuromuscular irritability" },
      { front: "What is Chvostek's sign?", back: "Facial muscle twitching when the facial nerve is tapped in front of the ear", rationale: "Positive in hypocalcemia. Both Chvostek's and Trousseau's indicate neuromuscular excitability" },
      { front: "What are signs of hypocalcemia?", back: "Numbness/tingling, muscle cramps, tetany, seizures, prolonged QT, Trousseau's, Chvostek's", rationale: "Low calcium increases neuromuscular excitability. Can be life-threatening (laryngospasm)" },
      { front: "What are signs of hypercalcemia?", back: "Bones (pain), Stones (renal), Groans (GI: N/V, constipation), Moans (confusion, lethargy)", rationale: "Mnemonic: 'Bones, Stones, Groans, and Psychiatric Moans.' Shortened QT on ECG" },
      { front: "What is the normal serum magnesium range?", back: "1.5-2.5 mEq/L", rationale: "Magnesium is essential for neuromuscular function, cardiac rhythm, and PTH secretion" },
      { front: "What are signs of hypomagnesemia?", back: "Similar to hypocalcemia: tremors, tetany, seizures, dysrhythmias, positive Trousseau's/Chvostek's", rationale: "Often coexists with hypokalemia. Must correct Mg2+ before K+ will correct" },
      { front: "Why is magnesium sulfate given in preeclampsia?", back: "Prevents seizures (eclampsia) by decreasing neuromuscular excitability", rationale: "Monitor: deep tendon reflexes, respiratory rate (>12), urine output. Antidote: calcium gluconate" },
      { front: "What is the relationship between calcium and phosphorus?", back: "Inverse relationship — when calcium goes up, phosphorus goes down (and vice versa)", rationale: "In CKD: high phosphorus → low calcium → secondary hyperparathyroidism → bone disease" },
      { front: "What causes hypocalcemia?", back: "Hypoparathyroidism, CKD, vitamin D deficiency, pancreatitis, massive blood transfusions", rationale: "Citrate in stored blood binds calcium. Post-thyroidectomy: risk of accidental parathyroid removal" },
    ],
  },
  {
    title: "ABG Interpretation — Step by Step",
    slug: "abg-interpretation-step-by-step",
    description: "Master arterial blood gas analysis with this systematic approach. Essential for NCLEX and clinical practice.",
    tags: ["electrolytes", "ABG", "acid-base", "respiratory", "NCLEX"],
    cards: [
      { front: "What are the normal ABG values?", back: "pH: 7.35-7.45 | PaCO2: 35-45 | HCO3: 22-26 | PaO2: 80-100", rationale: "Remember: pH and PaCO2 are inversely related (CO2 is an acid)" },
      { front: "Step 1 of ABG interpretation: Look at the pH", back: "< 7.35 = Acidosis | > 7.45 = Alkalosis | 7.35-7.45 = Normal or compensated", rationale: "The pH tells you the primary direction of the imbalance" },
      { front: "Step 2: Determine respiratory or metabolic cause", back: "If pH and PaCO2 move in OPPOSITE directions → Respiratory. If pH and HCO3 move in SAME direction → Metabolic", rationale: "CO2 is an acid controlled by lungs. HCO3 is a base controlled by kidneys" },
      { front: "What is respiratory acidosis?", back: "pH < 7.35, PaCO2 > 45 (CO2 retention)", rationale: "Causes: COPD, respiratory depression (opioids), pneumonia, airway obstruction" },
      { front: "What is respiratory alkalosis?", back: "pH > 7.45, PaCO2 < 35 (CO2 blown off)", rationale: "Causes: hyperventilation, anxiety, fever, pain, mechanical over-ventilation" },
      { front: "What is metabolic acidosis?", back: "pH < 7.35, HCO3 < 22", rationale: "Causes: DKA, renal failure, lactic acidosis, diarrhea, salicylate toxicity" },
      { front: "What is metabolic alkalosis?", back: "pH > 7.45, HCO3 > 26", rationale: "Causes: vomiting, NG suction, excessive antacids, diuretics, hypokalemia" },
      { front: "How does compensation work?", back: "The opposite system tries to normalize pH. Respiratory compensates for metabolic (and vice versa)", rationale: "Full compensation: pH returns to normal range. Partial: pH improved but still abnormal" },
      { front: "What does ROME stand for in ABG interpretation?", back: "Respiratory = Opposite (pH and CO2 go opposite ways). Metabolic = Equal (pH and HCO3 go same way)", rationale: "Helpful mnemonic for determining if the disorder is respiratory or metabolic" },
      { front: "Interpret: pH 7.30, PaCO2 50, HCO3 24", back: "Respiratory acidosis (uncompensated)", rationale: "pH is acidotic. CO2 is high (respiratory cause). HCO3 is normal (kidneys haven't compensated yet)" },
      { front: "Interpret: pH 7.48, PaCO2 30, HCO3 24", back: "Respiratory alkalosis (uncompensated)", rationale: "pH is alkalotic. CO2 is low (hyperventilating). HCO3 normal (no renal compensation)" },
      { front: "Interpret: pH 7.32, PaCO2 40, HCO3 18", back: "Metabolic acidosis (uncompensated)", rationale: "pH is acidotic. CO2 is normal (lungs haven't compensated). HCO3 is low (metabolic cause)" },
    ],
  },
  {
    title: "IV Fluids — Types & Indications",
    slug: "iv-fluids-types-indications",
    description: "Crystalloid and colloid solutions, tonicity, and clinical indications for nursing practice.",
    tags: ["electrolytes", "IV fluids", "fluids", "NCLEX"],
    cards: [
      { front: "What type of solution is 0.9% Normal Saline (NS)?", back: "Isotonic crystalloid", rationale: "Stays in the intravascular space. Used for: fluid resuscitation, blood transfusions, DKA" },
      { front: "What type of solution is Lactated Ringer's (LR)?", back: "Isotonic crystalloid", rationale: "Similar to plasma. Used for: burns, surgery, trauma. Contraindicated in liver failure (can't metabolize lactate)" },
      { front: "What type of solution is 0.45% NS (half-normal saline)?", back: "Hypotonic crystalloid", rationale: "Free water moves into cells. Used for: hypernatremia, cellular dehydration. Do NOT give to patients with increased ICP" },
      { front: "What type of solution is D5W after metabolism?", back: "Becomes hypotonic (free water) once dextrose is metabolized", rationale: "Initially isotonic in the bag, but acts as free water in the body. Used for hypernatremia" },
      { front: "What type of solution is 3% saline?", back: "Hypertonic crystalloid", rationale: "Pulls water from cells into vasculature. Used for severe hyponatremia with seizures. Monitor closely" },
      { front: "When are hypotonic solutions contraindicated?", back: "Increased ICP (cerebral edema), burns (third-spacing), liver disease, trauma", rationale: "Hypotonic fluids would shift water into brain cells, worsening cerebral edema" },
      { front: "When are hypertonic solutions used?", back: "Severe hyponatremia, cerebral edema (3% saline or mannitol)", rationale: "Must be given via central line (peripheral can cause phlebitis). Monitor sodium closely" },
      { front: "What are isotonic solutions used for?", back: "Fluid volume deficit, dehydration, shock, blood product administration", rationale: "Expand intravascular volume without shifting fluid between compartments" },
      { front: "What is the difference between crystalloids and colloids?", back: "Crystalloids: electrolyte solutions that pass through membranes. Colloids: contain large molecules that stay in vasculature (albumin, dextran)", rationale: "Colloids expand plasma volume more effectively but are more expensive" },
      { front: "Why is D5W NOT used for fluid resuscitation?", back: "The dextrose is quickly metabolized, leaving only free water which distributes to all compartments", rationale: "Only 8% of D5W stays in the intravascular space vs. 25% for NS" },
    ],
  },
];

const allDecks = [
  ...preNursingDecks,
  ...apDecks,
  ...electrolyteDecks,
];

export async function seedStudyDecks(pool: Pool) {
  try {
    const existing = await pool.query(
      `SELECT COUNT(*)::int as count FROM flashcard_decks WHERE owner_id = $1`,
      [SYSTEM_USER_ID]
    );
    if (existing.rows[0].count >= allDecks.length) {
      console.log(`[Seed] ${existing.rows[0].count} system decks already exist, skipping seed`);
      return;
    }

    let systemUser = await pool.query(`SELECT id FROM users WHERE id = $1`, [SYSTEM_USER_ID]);
    if (systemUser.rows.length === 0) {
      const existingByName = await pool.query(`SELECT id FROM users WHERE username = $1`, ["NurseNest"]);
      if (existingByName.rows.length > 0) {
        const realId = existingByName.rows[0].id;
        console.log(`[Seed] Using existing NurseNest user: ${realId}`);
        const deckCount = await pool.query(
          `SELECT COUNT(*)::int as count FROM flashcard_decks WHERE owner_id = $1`,
          [realId]
        );
        if (deckCount.rows[0].count >= allDecks.length) {
          console.log(`[Seed] ${deckCount.rows[0].count} decks already exist for NurseNest, skipping`);
          return;
        }
        for (const deck of allDecks) {
          const ed = await pool.query(`SELECT id FROM flashcard_decks WHERE slug = $1`, [deck.slug]);
          if (ed.rows.length > 0) continue;
          const dr = await pool.query(
            `INSERT INTO flashcard_decks (title, slug, description, owner_id, visibility, tags, is_upgraded, upgraded_limit)
             VALUES ($1, $2, $3, $4, $5, $6::jsonb, true, 500) RETURNING id`,
            [deck.title, deck.slug, deck.description, realId, "public", JSON.stringify(deck.tags)]
          );
          for (let i = 0; i < deck.cards.length; i++) {
            const c = deck.cards[i];
            await pool.query(
              `INSERT INTO deck_flashcards (deck_id, front, back, rationale) VALUES ($1, $2, $3, $4)`,
              [dr.rows[0].id, c.front, c.back, c.rationale || null]
            );
          }
          console.log(`[Seed] Created deck: ${deck.title} (${deck.cards.length} cards)`);
        }
        console.log(`[Seed] Study deck seeding complete.`);
        return;
      }
      await pool.query(
        `INSERT INTO users (id, username, password, tier, subscription_status)
         VALUES ($1, $2, $3, $4, $5)`,
        [SYSTEM_USER_ID, "NurseNest-System", "system-no-login", "admin", "active"]
      );
    }

    for (const deck of allDecks) {
      const existingDeck = await pool.query(
        `SELECT id FROM flashcard_decks WHERE slug = $1`,
        [deck.slug]
      );
      if (existingDeck.rows.length > 0) continue;

      const deckResult = await pool.query(
        `INSERT INTO flashcard_decks (title, slug, description, owner_id, visibility, tags, is_upgraded, upgraded_limit)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb, true, 500)
         RETURNING id`,
        [deck.title, deck.slug, deck.description, SYSTEM_USER_ID, "public", JSON.stringify(deck.tags)]
      );
      const deckId = deckResult.rows[0].id;

      for (let i = 0; i < deck.cards.length; i++) {
        const card = deck.cards[i];
        await pool.query(
          `INSERT INTO deck_flashcards (deck_id, front, back, rationale)
           VALUES ($1, $2, $3, $4)`,
          [deckId, card.front, card.back, card.rationale || null]
        );
      }

      console.log(`[Seed] Created deck: ${deck.title} (${deck.cards.length} cards)`);
    }

    console.log(`[Seed] Study deck seeding complete. ${allDecks.length} decks processed.`);
  } catch (error) {
    console.error("[Seed] Error seeding study decks:", error);
  }
}
