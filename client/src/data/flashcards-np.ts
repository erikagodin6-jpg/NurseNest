import type { FlashcardData } from "./flashcards-rpn";

export const npFlashcards: FlashcardData[] = [
  // ============================================================
  // ADVANCED PHARMACOLOGY (20 cards)
  // ============================================================
  {
    id: "np-pharm-q1",
    type: "question",
    question: "A 62-year-old male with HFrEF (EF 30%) is currently on lisinopril 20 mg daily and carvedilol 25 mg BID. His latest BNP is 1,200 pg/mL. Which medication change aligns with current GDMT guidelines to reduce mortality?",
    options: ["Switch lisinopril to losartan", "Replace lisinopril with sacubitril/valsartan (Entresto)", "Add amlodipine for afterload reduction", "Increase carvedilol to 50 mg BID"],
    correctIndex: 1,
    answer: "ACC/AHA guidelines recommend replacing ACEi/ARB with sacubitril/valsartan (ARNI) in patients with HFrEF who remain symptomatic on optimal doses of ACEi, beta-blocker, and MRA. The PARADIGM-HF trial demonstrated a 20% relative risk reduction in cardiovascular death and HF hospitalization. Must wash out ACEi for 36 hours before starting ARNI to prevent angioedema. Contraindicated in patients with a history of angioedema.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q2",
    type: "question",
    question: "A patient on warfarin for atrial fibrillation has a supratherapeutic INR of 9.2 with no bleeding. Which intervention is most appropriate?",
    options: ["Continue warfarin and recheck INR in 1 week", "Hold warfarin, administer oral vitamin K 2.5-5 mg, recheck INR in 24-48 hours", "Administer IV vitamin K 10 mg and fresh frozen plasma", "Switch immediately to rivaroxaban"],
    correctIndex: 1,
    answer: "For INR >9.0 without significant bleeding, the 2012 ACCP guidelines recommend holding warfarin and administering oral vitamin K 2.5-5 mg. IV vitamin K and FFP are reserved for active bleeding or INR >10 with high bleeding risk. The NP should investigate causes: medication interactions (azole antifungals, fluoroquinolones, amiodarone), dietary changes, liver dysfunction, or acute illness. Recheck INR in 24-48 hours and restart at a reduced dose.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q3",
    type: "question",
    question: "An NP is prescribing an antidepressant for a 45-year-old woman with comorbid major depression and chronic neuropathic pain. Which medication addresses both conditions?",
    options: ["Sertraline (Zoloft)", "Duloxetine (Cymbalta)", "Bupropion (Wellbutrin)", "Mirtazapine (Remeron)"],
    correctIndex: 1,
    answer: "Duloxetine is an SNRI with FDA approval for both major depressive disorder and several chronic pain conditions (diabetic peripheral neuropathy, fibromyalgia, chronic musculoskeletal pain). Its dual serotonin and norepinephrine reuptake inhibition modulates descending pain inhibition pathways. Starting dose 30 mg daily for 1 week, then increase to 60 mg. Maximum 120 mg/day. Contraindicated with MAOIs and in hepatic insufficiency.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q4",
    type: "question",
    question: "A 55-year-old patient with type 2 diabetes, CKD stage 3b (eGFR 38), and established ASCVD is on metformin 1000 mg BID. Which additional medication provides the greatest cardiovascular and renal benefit?",
    options: ["Glipizide 5 mg daily", "Empagliflozin 10 mg daily", "Pioglitazone 30 mg daily", "Sitagliptin 50 mg daily"],
    correctIndex: 1,
    answer: "SGLT2 inhibitors (empagliflozin, dapagliflozin) have demonstrated significant cardiovascular benefit (EMPA-REG OUTCOME, DECLARE-TIMI 58) and renal protection (CREDENCE, DAPA-CKD) independent of glucose lowering. They reduce MACE, HF hospitalization, and CKD progression. Empagliflozin can be used down to eGFR 20 mL/min for cardiorenal protection (not for glycemic control below 30). Monitor for euglycemic DKA, genital mycotic infections, and volume depletion.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q5",
    type: "question",
    question: "A 28-year-old woman with epilepsy controlled on valproic acid wants to conceive. What is the NP's priority pharmacological concern?",
    options: ["Valproic acid has no teratogenic effects", "Valproic acid is a known teratogen (Category X) associated with neural tube defects; transition to a safer alternative before conception", "Increase the valproic acid dose during pregnancy", "Add phenobarbital as adjunct therapy"],
    correctIndex: 1,
    answer: "Valproic acid has the highest teratogenic risk of all antiepileptic drugs (AEDs): 7-10% risk of major congenital malformations including spina bifida, cardiac defects, cleft palate, and cognitive impairment. The NP should transition to a safer AED (lamotrigine or levetiracetam have the lowest teratogenic risk) well before conception. High-dose folic acid (4-5 mg/day) should be started 1-3 months before conception. Abrupt discontinuation of any AED risks seizure recurrence.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q6",
    type: "question",
    question: "An NP is prescribing a GLP-1 receptor agonist for a patient with type 2 diabetes and BMI 38. Which counseling point is most critical?",
    options: ["This medication commonly causes weight gain", "GLP-1 RAs carry a boxed warning for risk of thyroid C-cell tumors; contraindicated in personal/family history of medullary thyroid carcinoma or MEN 2", "The medication can be taken with or without food at any time", "GLP-1 RAs are safe in combination with insulin secretagogues without dose adjustment"],
    correctIndex: 1,
    answer: "All GLP-1 receptor agonists (semaglutide, liraglutide, dulaglutide, exenatide) carry a boxed warning about thyroid C-cell tumor risk based on animal studies. They are absolutely contraindicated in patients with personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). Patients should report neck lumps, dysphagia, dyspnea, or persistent hoarseness. When combining with sulfonylureas or insulin, reduce those doses to prevent hypoglycemia.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q7",
    type: "question",
    question: "A patient on long-term prednisone 20 mg daily develops osteoporosis (T-score -2.8). Which prophylactic medication should the NP have initiated at the start of glucocorticoid therapy?",
    options: ["Calcium and vitamin D supplementation only", "Bisphosphonate therapy (alendronate) along with calcium and vitamin D", "Denosumab as first-line prevention", "No prophylaxis is needed for doses under 40 mg"],
    correctIndex: 1,
    answer: "ACR guidelines recommend initiating osteoporosis prevention in ALL adults expected to receive glucocorticoids ≥2.5 mg prednisone equivalent for ≥3 months. First-line: oral bisphosphonate (alendronate 70 mg weekly or risedronate 35 mg weekly) PLUS calcium 1,000-1,200 mg/day and vitamin D 600-800 IU/day. FRAX score should be calculated. For high fracture risk or bisphosphonate contraindication, consider teriparatide or denosumab. Baseline and follow-up DEXA scans are essential.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q8",
    type: "question",
    question: "An NP is managing a patient with COPD who has frequent exacerbations despite tiotropium and an ICS/LABA combination. FEV1 is 38% predicted, eosinophils are 85 cells/μL. What is the next step?",
    options: ["Add roflumilast (PDE4 inhibitor)", "Switch to triple therapy (ICS/LABA/LAMA) and consider adding roflumilast", "Discontinue ICS as eosinophils are low", "Add oral theophylline"],
    correctIndex: 1,
    answer: "GOLD 2024 guidelines recommend escalating to triple therapy (ICS/LABA/LAMA) for patients with persistent exacerbations on dual therapy. With low eosinophils (<100), the benefit of ICS is questionable but continuing while adding roflumilast is reasonable for exacerbation reduction. Roflumilast (PDE4 inhibitor) is indicated for severe COPD (FEV1 <50%) with frequent exacerbations and chronic bronchitis phenotype. Side effects include diarrhea, weight loss, and psychiatric symptoms.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q9",
    type: "question",
    question: "A patient presents with acute gout flare. The patient has CKD stage 4 (eGFR 22) and heart failure. Which medication is the safest first-line treatment?",
    options: ["Indomethacin 50 mg TID", "Colchicine 1.2 mg followed by 0.6 mg one hour later", "Prednisone 40 mg daily for 5 days", "Allopurinol 300 mg to lower uric acid immediately"],
    correctIndex: 2,
    answer: "In patients with CKD and heart failure, NSAIDs are contraindicated (worsen renal function and fluid retention), and colchicine requires significant dose reduction and is risky with eGFR <30. Systemic corticosteroids (prednisone 30-40 mg/day for 5-7 days with taper) are the safest option. Allopurinol should NEVER be started during an acute flare as it can worsen and prolong the attack by mobilizing uric acid deposits. Intra-articular corticosteroid injection is also safe if monoarticular.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q10",
    type: "question",
    question: "A 70-year-old patient with persistent atrial fibrillation and a CHA₂DS₂-VASc score of 5 has a creatinine clearance of 20 mL/min. Which anticoagulant requires the most careful dose adjustment?",
    options: ["Warfarin", "Apixaban 2.5 mg BID (dose-reduced)", "Dabigatran 150 mg BID", "Rivaroxaban 20 mg daily"],
    correctIndex: 2,
    answer: "Dabigatran is 80% renally cleared and is CONTRAINDICATED when CrCl <30 mL/min (USA labeling) or <15 mL/min (European labeling). With CrCl 20, dabigatran should not be used. Apixaban has the least renal dependence (27% renal clearance) and can be dose-reduced to 2.5 mg BID if ≥2 of 3 criteria met: age ≥80, weight ≤60 kg, or creatinine ≥1.5. Rivaroxaban should be avoided below CrCl 15. Warfarin remains an option but requires INR monitoring.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q11",
    type: "question",
    question: "An NP is managing a patient with treatment-resistant hypertension (on maximized doses of an ACEi, CCB, and thiazide diuretic). BP is 158/94. What is the recommended fourth-line agent?",
    options: ["Another ACE inhibitor at higher dose", "Spironolactone 25-50 mg daily", "Clonidine 0.1 mg BID", "Hydralazine 25 mg TID"],
    correctIndex: 1,
    answer: "The PATHWAY-2 trial established spironolactone as the most effective fourth-line agent for resistant hypertension, superior to bisoprolol and doxazosin. Spironolactone addresses the underlying excess aldosterone that contributes to treatment resistance. Monitor potassium closely (risk of hyperkalemia, especially with ACEi). Contraindicated if K+ >5.0 or eGFR <30. Eplerenone is an alternative with fewer anti-androgenic side effects (gynecomastia).",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q12",
    type: "question",
    question: "A 35-year-old woman with migraines averaging 10 headache days per month asks about preventive therapy. She has a BMI of 32 and depression. Which preventive medication addresses all three concerns?",
    options: ["Propranolol 80 mg daily", "Topiramate 100 mg daily", "Amitriptyline 25 mg at bedtime", "Verapamil 240 mg daily"],
    correctIndex: 1,
    answer: "Topiramate is FDA-approved for migraine prevention and uniquely causes weight loss (beneficial for BMI 32). It has some evidence for mood stabilization. Starting dose 25 mg daily, titrate to 50-100 mg BID. However, it is teratogenic (Category D) so contraception must be discussed, and it reduces oral contraceptive efficacy. Side effects include cognitive slowing ('dopamax'), paresthesias, metabolic acidosis, and nephrolithiasis. An alternative is the CGRP monoclonal antibodies if she cannot tolerate topiramate.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q13",
    type: "question",
    question: "A patient on methotrexate 15 mg weekly for rheumatoid arthritis develops a persistent dry cough, progressive dyspnea, and bilateral ground-glass opacities on chest CT. What complication does the NP suspect?",
    options: ["Community-acquired pneumonia", "Methotrexate-induced pneumonitis", "Heart failure exacerbation", "Pulmonary embolism"],
    correctIndex: 1,
    answer: "Methotrexate-induced pneumonitis is a potentially life-threatening hypersensitivity reaction occurring in 2-8% of patients, typically within the first year of therapy. It presents with dry cough, dyspnea, fever, and bilateral ground-glass or reticular opacities. Diagnosis requires excluding infection (PCP, CMV). Treatment: immediately discontinue methotrexate, start systemic corticosteroids, and provide supportive care. The patient should never be rechallenged with methotrexate. Consider alternative DMARDs.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q14",
    type: "question",
    question: "An NP is initiating thyroid replacement in a 78-year-old patient with newly diagnosed hypothyroidism (TSH 45, fT4 0.3) and known coronary artery disease. What is the appropriate starting dose of levothyroxine?",
    options: ["Full replacement dose of 1.6 mcg/kg/day", "12.5-25 mcg daily with slow titration every 6-8 weeks", "100 mcg daily to normalize TSH quickly", "Liothyronine (T3) 25 mcg daily for faster effect"],
    correctIndex: 1,
    answer: "In elderly patients with CAD, thyroid replacement must start at a very low dose (12.5-25 mcg/day) and be titrated slowly (increase by 12.5-25 mcg every 6-8 weeks). Rapid correction increases myocardial oxygen demand and can precipitate angina, MI, or arrhythmias. The goal is gradual normalization of TSH over months. Full-dose replacement (1.6 mcg/kg) is only appropriate for young, healthy adults. T3 preparations cause more cardiac stress due to their rapid onset.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q15",
    type: "question",
    question: "A patient with community-acquired pneumonia has a CURB-65 score of 2. The NP decides on outpatient treatment. Which antibiotic regimen is appropriate per ATS/IDSA guidelines?",
    options: ["Amoxicillin 1 g TID for 7 days", "Respiratory fluoroquinolone (levofloxacin 750 mg daily) OR amoxicillin/clavulanate PLUS a macrolide", "Cephalexin 500 mg QID for 14 days", "TMP-SMX DS BID for 10 days"],
    correctIndex: 1,
    answer: "For CAP with comorbidities (CURB-65 ≥2), ATS/IDSA 2019 guidelines recommend either: (1) respiratory fluoroquinolone monotherapy (levofloxacin or moxifloxacin), OR (2) beta-lactam (amoxicillin/clavulanate or ceftriaxone) PLUS macrolide (azithromycin or doxycycline). Amoxicillin monotherapy is reserved for low-risk patients without comorbidities. Duration is minimum 5 days with clinical stability criteria met before stopping. Consider local resistance patterns.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q16",
    type: "question",
    question: "A patient on clozapine develops constipation that has progressed to no bowel movement for 5 days and abdominal distension. How should the NP manage this?",
    options: ["This is a minor side effect; recommend fiber supplementation", "Clozapine-induced ileus is a medical emergency; obtain stat abdominal imaging, hold clozapine, and initiate aggressive bowel protocol", "Switch to olanzapine which has no GI side effects", "Prescribe loperamide to slow motility"],
    correctIndex: 1,
    answer: "Clozapine-induced constipation can progress to life-threatening complications including paralytic ileus, bowel obstruction, ischemia, perforation, and sepsis, with a reported mortality rate higher than agranulocytosis. Five days without a bowel movement with distension is a medical emergency requiring stat abdominal X-ray, holding clozapine, and aggressive bowel management (stimulant laxatives, enemas, possible surgical consultation). Proactive bowel regimens should be initiated when starting clozapine.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q17",
    type: "question",
    question: "An NP is prescribing PrEP for HIV prevention. Which medication regimen is approved for PrEP, and what baseline labs are required?",
    options: ["Emtricitabine/tenofovir disoproxil (Truvada) or emtricitabine/tenofovir alafenamide (Descovy); requires documented negative HIV test, renal function, hepatitis B serology, and STI screening", "Any single antiretroviral agent taken as needed", "Dolutegravir/lamivudine taken weekly", "PrEP only requires an HIV test with no other baseline labs"],
    correctIndex: 0,
    answer: "FDA-approved PrEP regimens include Truvada (TDF/FTC) for all at-risk populations and Descovy (TAF/FTC) for men and transgender women (not studied in receptive vaginal sex). Cabotegravir IM injection (Apretude) every 2 months is also approved. Baseline requirements: documented negative HIV-1/2 test (4th gen Ag/Ab), CrCl/eGFR (TDF is nephrotoxic), hepatitis B serology (TDF/FTC treat HBV; discontinuation can cause HBV flare), comprehensive STI screening, and pregnancy test in women.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q18",
    type: "question",
    question: "A 65-year-old patient with osteoporosis has been on alendronate for 7 years. Recent DEXA shows stable T-scores at -2.0 hip and -1.8 spine. What should the NP consider?",
    options: ["Continue alendronate indefinitely", "Consider a bisphosphonate holiday of 2-5 years with monitoring, given the risk of atypical femur fractures with prolonged use", "Switch to calcium supplements only", "Discontinue all osteoporosis treatment permanently"],
    correctIndex: 1,
    answer: "After 5+ years of bisphosphonate therapy, a drug holiday should be considered in patients at moderate fracture risk with stable or improved DEXA scores. Prolonged use increases risk of atypical femoral fractures and osteonecrosis of the jaw. Bisphosphonates persist in bone for years, providing residual benefit during holidays. High-risk patients (prior fragility fracture, T-score ≤ -2.5) may benefit from longer treatment or transition to anabolic agents (teriparatide, romosozumab). Reassess with DEXA in 2-3 years during holiday.",
    category: "Advanced Pharmacology",
    difficulty: 2
  },
  {
    id: "np-pharm-q19",
    type: "question",
    question: "A patient with schizophrenia on olanzapine 20 mg has gained 30 lbs, has fasting glucose 128 mg/dL, and triglycerides 310 mg/dL. What is the NP's best approach?",
    options: ["Continue olanzapine and add metformin for metabolic management", "Consider switching to an antipsychotic with lower metabolic risk (aripiprazole or ziprasidone) if clinically stable", "Discontinue olanzapine abruptly", "Prescribe a stimulant for weight loss"],
    correctIndex: 1,
    answer: "Olanzapine and clozapine carry the highest metabolic risk among antipsychotics. With significant weight gain, prediabetes, and hypertriglyceridemia, switching to a metabolically favorable antipsychotic (aripiprazole, ziprasidone, or lurasidone) should be considered if the patient is psychiatrically stable. The switch must be gradual (cross-taper) to avoid relapse. If olanzapine is the only effective antipsychotic, adding metformin has evidence for weight mitigation. Monitor metabolic parameters per ADA/APA consensus guidelines.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  {
    id: "np-pharm-q20",
    type: "question",
    question: "An NP is managing a patient with chronic hepatitis B on tenofovir. The patient wants to stop taking the medication because they feel well. What critical risk must the NP communicate?",
    options: ["There is no risk to stopping antiviral therapy", "Abrupt discontinuation of HBV antivirals can cause severe hepatitis flare with potential liver failure from immune reconstitution and viral rebound", "The medication can be stopped after 6 months of normal liver enzymes", "Switching to interferon is always preferred"],
    correctIndex: 1,
    answer: "Discontinuing nucleos(t)ide analogue therapy for chronic HBV without clear virological endpoints (HBsAg seroconversion, sustained HBV DNA suppression) can trigger severe hepatic flares from immune-mediated destruction of hepatocytes as viral replication rebounds. These flares can be fulminant and fatal. The NP must emphasize lifelong therapy in most cases, especially in cirrhotic patients. If discontinuation is considered in non-cirrhotic patients, close monitoring (ALT, HBV DNA every 1-3 months) for at least 12 months is mandatory.",
    category: "Advanced Pharmacology",
    difficulty: 3
  },
  // ============================================================
  // DIFFERENTIAL DIAGNOSIS (20 cards)
  // ============================================================
  {
    id: "np-dx-q1",
    type: "question",
    question: "A 52-year-old woman presents with fatigue, weight gain, cold intolerance, constipation, and dry skin over 6 months. TSH is 12.4, fT4 is 0.6. Her anti-TPO antibodies are elevated. What is the most likely diagnosis?",
    options: ["Subclinical hypothyroidism", "Hashimoto thyroiditis", "Subacute thyroiditis", "Iodine deficiency"],
    correctIndex: 1,
    answer: "Hashimoto thyroiditis (chronic lymphocytic thyroiditis) is the most common cause of hypothyroidism in iodine-sufficient regions. Elevated TSH with low fT4 confirms overt hypothyroidism, and positive anti-TPO antibodies confirm the autoimmune etiology. The disease involves gradual immune-mediated destruction of thyroid tissue. Treatment is levothyroxine replacement titrated to normalize TSH. Subclinical hypothyroidism would show elevated TSH with NORMAL fT4.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q2",
    type: "question",
    question: "A 30-year-old male presents with acute onset of right-sided pleuritic chest pain and dyspnea. He is tall and thin (BMI 18). CXR shows a visible pleural line with absent lung markings beyond it on the right. What is the diagnosis?",
    options: ["Pneumonia with parapneumonic effusion", "Primary spontaneous pneumothorax", "Pulmonary embolism", "Tension pneumothorax"],
    correctIndex: 1,
    answer: "Tall, thin young males (Marfan habitus) are at increased risk for primary spontaneous pneumothorax due to rupture of apical subpleural blebs. The CXR finding of a visible pleural line with absent lung markings confirms the diagnosis. Small pneumothorax (<2-3 cm) in stable patients can be observed or aspirated. Large or symptomatic pneumothorax requires chest tube thoracostomy. Tension pneumothorax would present with hemodynamic instability and tracheal deviation.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q3",
    type: "question",
    question: "A 45-year-old woman presents with episodic palpitations, headache, and diaphoresis. During an episode, her BP is 240/130. Between episodes, BP is 128/82. 24-hour urine metanephrines are markedly elevated. What is the diagnosis and what must be ruled out before surgery?",
    options: ["Essential hypertension; no further workup needed", "Pheochromocytoma; rule out MEN 2 syndrome with RET proto-oncogene testing and serum calcium/calcitonin", "Panic disorder with hypertensive response", "Renovascular hypertension from renal artery stenosis"],
    correctIndex: 1,
    answer: "Paroxysmal hypertension with the classic triad (headache, diaphoresis, palpitations) and elevated urinary metanephrines is diagnostic of pheochromocytoma. Before surgical resection, the NP must screen for MEN 2 syndrome (medullary thyroid carcinoma + pheochromocytoma ± parathyroid hyperplasia) with RET proto-oncogene testing, serum calcium, and calcitonin. Preoperative alpha-blockade (phenoxybenzamine 10-14 days) is mandatory before any beta-blockade or surgery.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q4",
    type: "question",
    question: "A 68-year-old male presents with progressive dyspnea, bilateral lower extremity edema, and a 10-lb weight gain over 2 weeks. JVP is elevated, there are bilateral crackles, and an S3 gallop is present. BNP is 1,850 pg/mL. What is the most likely diagnosis?",
    options: ["Acute coronary syndrome", "Decompensated heart failure (ADHF)", "Chronic obstructive pulmonary disease exacerbation", "Nephrotic syndrome"],
    correctIndex: 1,
    answer: "The constellation of dyspnea, peripheral edema, weight gain, elevated JVP, bilateral crackles, S3 gallop, and markedly elevated BNP (>400 pg/mL) is classic for acute decompensated heart failure. BNP >400 has a positive predictive value >95% for HF. The NP should obtain an echocardiogram to assess EF and classify as HFrEF or HFpEF, which determines treatment strategy. Immediate management includes IV loop diuretics, oxygen, and identification of the precipitant (non-compliance, ACS, arrhythmia).",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q5",
    type: "question",
    question: "A 25-year-old woman presents with bilateral joint pain in the hands and wrists, morning stiffness lasting 3 hours, fatigue, and a malar rash. Labs show positive ANA (1:640, homogeneous pattern), positive anti-dsDNA, low C3/C4, and proteinuria. What is the diagnosis?",
    options: ["Rheumatoid arthritis", "Systemic lupus erythematosus (SLE)", "Dermatomyositis", "Scleroderma"],
    correctIndex: 1,
    answer: "This patient meets multiple ACR/EULAR classification criteria for SLE: malar rash, arthritis, renal involvement (proteinuria suggests lupus nephritis), positive ANA, positive anti-dsDNA (highly specific for SLE), and hypocomplementemia (low C3/C4 indicates immune complex consumption). The NP should quantify proteinuria (24-hour or spot protein/creatinine ratio), assess for other organ involvement, and consider renal biopsy if significant proteinuria is present. Treatment ranges from hydroxychloroquine to immunosuppressives depending on severity.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q6",
    type: "question",
    question: "A 40-year-old male presents with sudden onset of worst headache of his life, reaching maximum intensity within seconds. He has neck stiffness and photophobia. CT head is normal. What is the next diagnostic step?",
    options: ["Discharge with analgesics for migraine", "Perform a lumbar puncture looking for xanthochromia and RBCs", "Order an MRI of the brain", "Prescribe triptans and follow up in 1 week"],
    correctIndex: 1,
    answer: "Thunderclap headache (worst headache of life, peak within seconds) is subarachnoid hemorrhage until proven otherwise. CT has ~98% sensitivity within 6 hours but decreases with time. A normal CT does NOT rule out SAH. Lumbar puncture is mandatory: xanthochromia (yellow discoloration of CSF from bilirubin degradation of hemoglobin, present >12 hours after bleed) and elevated RBC count in sequential tubes (that do not clear) confirm SAH. If LP is positive, CTA is needed to identify the aneurysm.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q7",
    type: "question",
    question: "A 58-year-old male with a history of alcohol use disorder presents with confusion, asterixis, jaundice, and spider angiomata. Ammonia level is 142 μmol/L. Albumin is 2.0 g/dL, INR is 2.8, and total bilirubin is 6.5. What stage of his liver disease does this represent?",
    options: ["Compensated cirrhosis", "Decompensated cirrhosis with hepatic encephalopathy", "Acute alcoholic hepatitis without cirrhosis", "Fatty liver disease"],
    correctIndex: 1,
    answer: "Jaundice, coagulopathy (elevated INR), hypoalbuminemia, and hepatic encephalopathy (confusion + asterixis + elevated ammonia) indicate decompensated cirrhosis. The Child-Pugh score helps classify severity: this patient has class C (bilirubin >3, albumin <2.8, INR >2.3, encephalopathy, ascites likely present). Management includes lactulose and rifaximin for encephalopathy, diuretics for ascites, and hepatology referral for transplant evaluation if appropriate. MELD score should be calculated.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q8",
    type: "question",
    question: "A 22-year-old female presents with intermittent abdominal pain, bloody diarrhea (8-10 times/day), urgency, and tenesmus for 3 weeks. Colonoscopy shows continuous inflammation from the rectum extending to the splenic flexure with pseudopolyps. What is the diagnosis?",
    options: ["Crohn's disease", "Ulcerative colitis (left-sided)", "Irritable bowel syndrome", "Infectious colitis"],
    correctIndex: 1,
    answer: "Continuous mucosal inflammation extending proximally from the rectum with pseudopolyps is pathognomonic for ulcerative colitis. Key differentiators from Crohn's: UC involves ONLY the colon, affects ONLY the mucosa/submucosa, is CONTINUOUS (no skip lesions), and presents with bloody diarrhea (Crohn's typically has non-bloody diarrhea with skip lesions and transmural involvement). Left-sided UC extends to the splenic flexure. Treatment: 5-ASA (mesalamine) for mild-moderate, corticosteroids for flares, biologics for refractory disease.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q9",
    type: "question",
    question: "A 55-year-old postmenopausal woman presents with a unilateral, hard, irregular, fixed breast mass with skin dimpling and bloody nipple discharge. Axillary lymph node is palpable. What is the most likely diagnosis?",
    options: ["Fibroadenoma", "Fibrocystic breast changes", "Breast carcinoma", "Intraductal papilloma"],
    correctIndex: 2,
    answer: "Characteristics highly suspicious for breast carcinoma: postmenopausal onset, unilateral, hard and irregular (versus smooth and mobile for benign), fixed to surrounding tissue, skin dimpling (tumor tethering Cooper's ligaments), bloody nipple discharge, and axillary lymphadenopathy (potential metastatic spread). The NP should order diagnostic mammogram, breast ultrasound, and urgent referral for core needle biopsy. Tissue diagnosis is required before any treatment decisions. BI-RADS 5 classification.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q10",
    type: "question",
    question: "A 60-year-old diabetic male presents with gradual-onset, painless, unilateral vision loss described as a curtain coming down over his visual field. Fundoscopic exam reveals a pale retina with a cherry-red spot at the macula. What is the diagnosis?",
    options: ["Acute angle-closure glaucoma", "Central retinal artery occlusion (CRAO)", "Retinal detachment", "Diabetic retinopathy"],
    correctIndex: 1,
    answer: "Painless, sudden/gradual unilateral vision loss with a pale retina and cherry-red macula spot is pathognomonic for central retinal artery occlusion (CRAO). The cherry-red spot is the intact choroidal circulation visible through the thin fovea, contrasting with the ischemic pale retina. This is an ophthalmic emergency: permanent vision loss occurs within 90 minutes without treatment. Immediate referral, ocular massage, anterior chamber paracentesis, and evaluation for embolic source (carotid, cardiac) are needed.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q11",
    type: "question",
    question: "A 35-year-old male presents with recurrent episodes of unilateral headache with lacrimation, rhinorrhea, ptosis, and miosis on the affected side. Episodes last 45-90 minutes and occur 2-3 times daily for weeks, then remit. What type of headache is this?",
    options: ["Migraine with aura", "Cluster headache", "Tension-type headache", "Trigeminal neuralgia"],
    correctIndex: 1,
    answer: "Cluster headaches are characterized by severe unilateral periorbital pain with autonomic features (lacrimation, rhinorrhea, conjunctival injection, ptosis, miosis) occurring in clusters (daily attacks for weeks-months followed by remission). They are more common in males (3:1). Acute treatment: 100% oxygen 12-15 L/min via non-rebreather OR subcutaneous sumatriptan 6 mg. Prevention during cluster periods: verapamil (first-line), short course of prednisone, or lithium.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q12",
    type: "question",
    question: "A 70-year-old male presents with claudication in both calves that occurs after walking 1 block and resolves with rest. ABI is 0.6 bilaterally. He also has hypertension and hyperlipidemia. What is the diagnosis and initial management?",
    options: ["Spinal stenosis with neurogenic claudication", "Peripheral arterial disease (PAD) with intermittent claudication; cilostazol, supervised exercise, risk factor modification", "Deep vein thrombosis", "Musculoskeletal leg pain"],
    correctIndex: 1,
    answer: "ABI <0.9 confirms PAD; ABI 0.6 indicates moderate disease. Intermittent claudication (reproducible pain with exertion, relieved by rest) is the classic symptom. Management: supervised exercise program (most effective non-pharmacologic intervention), cilostazol 100 mg BID (PDE3 inhibitor, improves walking distance by 50%), aggressive cardiovascular risk factor modification (statin, antiplatelet therapy, BP control, smoking cessation). Differentiate from neurogenic claudication (spinal stenosis): neurogenic is relieved by leaning forward, not just rest.",
    category: "Differential Diagnosis",
    difficulty: 2
  },
  {
    id: "np-dx-q13",
    type: "question",
    question: "A 28-year-old female presents with progressive proximal muscle weakness, heliotrope rash on the eyelids, and Gottron papules over the MCP and PIP joints. CK is 4,500 U/L. What is the diagnosis and what malignancy screening is recommended?",
    options: ["Polymyalgia rheumatica", "Dermatomyositis; screen for underlying malignancy with age-appropriate cancer screening", "Fibromyalgia", "Systemic lupus erythematosus"],
    correctIndex: 1,
    answer: "Heliotrope rash (violaceous discoloration of the eyelids) and Gottron papules (erythematous plaques over joints) with proximal myopathy and elevated CK are pathognomonic for dermatomyositis. Importantly, adult-onset dermatomyositis carries a 15-30% risk of associated malignancy (ovarian, lung, pancreatic, gastric, colorectal). Comprehensive malignancy screening (CT chest/abdomen/pelvis, age-appropriate cancer screening, ovarian cancer markers) should be performed at diagnosis and periodically. Treatment: systemic corticosteroids and steroid-sparing immunosuppressants.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  {
    id: "np-dx-q14",
    type: "question",
    question: "A 3-year-old child presents with a palpable abdominal mass crossing the midline, hypertension, and periorbital ecchymosis. Urine catecholamine metabolites (VMA and HVA) are elevated. What is the most likely diagnosis?",
    options: ["Wilms tumor", "Neuroblastoma", "Hepatoblastoma", "Polycystic kidney disease"],
    correctIndex: 1,
    answer: "Neuroblastoma is the most common extracranial solid tumor in children, arising from neural crest cells. Key differentiators from Wilms tumor: neuroblastoma crosses the midline (Wilms does not), produces catecholamine metabolites (elevated VMA/HVA), and may present with periorbital ecchymosis ('raccoon eyes' from orbital metastases). Wilms tumor presents as a unilateral flank mass that does NOT cross midline, with hematuria and hypertension. Both tumors cause abdominal masses, but the clinical and lab features distinguish them.",
    category: "Differential Diagnosis",
    difficulty: 3
  },
  // ============================================================
  // DIAGNOSTIC REASONING (18 cards)
  // ============================================================
  {
    id: "np-diag-q1",
    type: "question",
    question: "An NP is evaluating a 50-year-old male with new-onset ascites. The serum-ascites albumin gradient (SAAG) is 1.8 g/dL. What does this indicate about the etiology?",
    options: ["SAAG ≥1.1 indicates portal hypertension as the cause (cirrhosis, heart failure, Budd-Chiari)", "SAAG ≥1.1 indicates peritoneal disease (malignancy, TB peritonitis)", "SAAG has no clinical significance", "A SAAG of 1.8 indicates nephrotic syndrome"],
    correctIndex: 0,
    answer: "SAAG (serum albumin minus ascitic fluid albumin) ≥1.1 g/dL has >97% accuracy for identifying portal hypertension as the cause of ascites. Common causes: cirrhosis (most common), alcoholic hepatitis, heart failure, Budd-Chiari syndrome. SAAG <1.1 suggests peritoneal causes: malignancy (peritoneal carcinomatosis), TB peritonitis, nephrotic syndrome, pancreatitis. Next steps for SAAG ≥1.1: liver evaluation (hepatitis panel, imaging), assess for varices.",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q2",
    type: "question",
    question: "A 45-year-old presents with polyuria, polydipsia, and a random glucose of 285 mg/dL. The NP orders a C-peptide and GAD-65 antibodies. C-peptide is undetectable and GAD-65 is positive. What does this indicate?",
    options: ["Type 2 diabetes with insulin resistance", "Latent autoimmune diabetes in adults (LADA/Type 1.5)", "Maturity-onset diabetes of the young (MODY)", "Steroid-induced diabetes"],
    correctIndex: 1,
    answer: "LADA (Latent Autoimmune Diabetes in Adults) is type 1 diabetes with slower onset, typically diagnosed after age 30. Undetectable C-peptide confirms absent endogenous insulin production, and positive GAD-65 antibodies confirm autoimmune beta-cell destruction. Unlike classic type 2, these patients will require insulin (not metformin) as primary therapy. LADA progresses to absolute insulin dependence faster than type 2 but slower than childhood type 1. Sulfonylureas should be avoided as they accelerate beta-cell burnout.",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q3",
    type: "question",
    question: "An NP orders a D-dimer for a patient with low pretest probability of PE (Wells score 2). The D-dimer returns at 0.3 μg/mL (normal <0.5). What is the clinical significance?",
    options: ["PE is definitively ruled out; no further workup needed", "D-dimer is negative in a low-probability patient, effectively ruling out PE with high negative predictive value", "CT angiography is still required regardless of D-dimer", "The patient should be anticoagulated empirically"],
    correctIndex: 1,
    answer: "D-dimer has high sensitivity (>95%) but low specificity for VTE. Its primary utility is its negative predictive value: a negative D-dimer in a LOW pretest probability patient (Wells ≤4) effectively rules out PE. However, D-dimer should NOT be used to rule out PE in HIGH pretest probability patients (Wells >4), as false negatives can occur. D-dimer is also elevated in many conditions (surgery, pregnancy, cancer, infection, DIC), limiting its specificity. The age-adjusted D-dimer cutoff (age × 10 for patients >50) improves specificity.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q4",
    type: "question",
    question: "A patient presents with microcytic anemia (MCV 68, Hgb 9.2). Iron studies show: ferritin 8, TIBC 450, serum iron 25, transferrin saturation 6%. What is the diagnosis?",
    options: ["Anemia of chronic disease", "Iron deficiency anemia", "Thalassemia trait", "Sideroblastic anemia"],
    correctIndex: 1,
    answer: "The iron panel is classic for iron deficiency anemia: low ferritin (depleted stores), high TIBC (body upregulates transferrin to capture more iron), low serum iron, and low transferrin saturation (<20%). This differs from anemia of chronic disease, which shows normal/high ferritin (acute phase reactant), low TIBC, and low iron. Thalassemia trait shows normal iron studies with inappropriately low MCV for the hemoglobin level and elevated Hgb A2 on electrophoresis. The NP should investigate the cause: menorrhagia, GI blood loss (colonoscopy if male or postmenopausal).",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q5",
    type: "question",
    question: "An NP is interpreting a hepatitis panel: HBsAg negative, anti-HBs positive, anti-HBc negative. What does this serologic pattern indicate?",
    options: ["Acute hepatitis B infection", "Chronic hepatitis B infection", "Prior hepatitis B vaccination (immunity from vaccine)", "Resolved natural hepatitis B infection"],
    correctIndex: 2,
    answer: "This pattern indicates immunity from vaccination: anti-HBs positive (the vaccine produces antibodies to surface antigen) with negative HBsAg (no active infection) and negative anti-HBc (no exposure to the actual virus, as core antibody is only produced during natural infection). Resolved natural infection would show: HBsAg negative, anti-HBs positive, anti-HBc positive. Chronic HBV: HBsAg positive for >6 months. Acute HBV: HBsAg positive, IgM anti-HBc positive.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q6",
    type: "question",
    question: "A 55-year-old with a 30-pack-year smoking history has a low-dose CT screening that reveals a solitary pulmonary nodule measuring 9 mm with spiculated margins. What is the recommended next step?",
    options: ["No follow-up needed for nodules under 10 mm", "PET scan or tissue sampling given the high-risk features (size, spiculated margins, smoking history)", "Repeat CT in 1 year", "Immediate lobectomy"],
    correctIndex: 1,
    answer: "Fleischner Society and ACCP guidelines stratify nodule management by size, morphology, and risk factors. A 9 mm nodule with spiculated margins in a heavy smoker is high risk for malignancy. Spiculated margins increase malignancy probability to 80-90%. PET-CT (metabolic activity assessment) or CT-guided biopsy is recommended. If PET is positive, tissue diagnosis via biopsy followed by staging is indicated. For solid nodules >8 mm in high-risk patients, 3-month follow-up CT at minimum, but PET or biopsy is preferred.",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q7",
    type: "question",
    question: "An NP is evaluating a patient with suspected Cushing syndrome. The patient has moon face, central obesity, purple striae, and proximal muscle weakness. Which is the best initial screening test?",
    options: ["Random serum cortisol", "24-hour urinary free cortisol, late-night salivary cortisol, or 1 mg overnight dexamethasone suppression test", "Serum ACTH level", "MRI of the pituitary gland"],
    correctIndex: 1,
    answer: "The Endocrine Society recommends at least TWO of three screening tests for Cushing syndrome: (1) 24-hour urinary free cortisol (elevated in Cushing), (2) late-night salivary cortisol (loss of diurnal rhythm), or (3) 1 mg overnight dexamethasone suppression test (failure to suppress cortisol below 1.8 μg/dL). Random cortisol is unreliable due to diurnal variation and stress response. ACTH and MRI are used AFTER confirming hypercortisolism to determine the cause (ACTH-dependent vs. independent).",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q8",
    type: "question",
    question: "A patient has an ECG showing ST elevation in leads II, III, and aVF with reciprocal changes in I and aVL. Which coronary artery is most likely occluded?",
    options: ["Left anterior descending (LAD)", "Right coronary artery (RCA)", "Left circumflex artery (LCx)", "Left main coronary artery"],
    correctIndex: 1,
    answer: "ST elevation in leads II, III, aVF indicates an inferior STEMI, which is most commonly caused by right coronary artery (RCA) occlusion (85% of cases). The RCA supplies the inferior wall, SA node (in 60%), and AV node (in 90%). Complications specific to inferior MI: bradycardia, heart block (AV node ischemia), right ventricular infarction (check right-sided leads V3R-V6R), and hypotension. Avoid nitroglycerin and morphine if RV infarction is present (preload-dependent).",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q9",
    type: "question",
    question: "A patient presents with symmetric polyarthritis of the hands (MCP and PIP joints), morning stiffness >1 hour, and positive anti-CCP antibodies. RF is weakly positive. What test finding is most specific for the diagnosis?",
    options: ["Elevated ESR", "Positive rheumatoid factor (RF)", "Positive anti-CCP (anti-citrullinated protein antibodies)", "Elevated uric acid"],
    correctIndex: 2,
    answer: "Anti-CCP antibodies have 95-98% specificity for rheumatoid arthritis, making them far more specific than RF (which is positive in many conditions: HCV, Sjögren's, endocarditis, and healthy elderly). Anti-CCP is also prognostic: high titers predict more erosive, aggressive disease. The 2010 ACR/EULAR classification criteria use anti-CCP as a major criterion. Positive anti-CCP with symmetric small joint polyarthritis and prolonged morning stiffness is essentially diagnostic of RA.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q10",
    type: "question",
    question: "An NP is evaluating a patient with new-onset proteinuria. Spot urine protein/creatinine ratio is 4.2 g/g (normal <0.2). Serum albumin is 2.1 g/dL. Lipid panel shows total cholesterol 380 mg/dL. What syndrome does this represent?",
    options: ["Nephritic syndrome", "Nephrotic syndrome", "Acute kidney injury", "Chronic kidney disease stage 3"],
    correctIndex: 1,
    answer: "The nephrotic syndrome triad: massive proteinuria (>3.5 g/day), hypoalbuminemia (<3.0 g/dL from urinary protein loss), and hyperlipidemia (liver compensates for protein loss by increasing lipoprotein synthesis). Additional features include edema (from reduced oncotic pressure) and lipiduria. The NP should evaluate for underlying causes: minimal change disease (children), membranous nephropathy (adults), diabetic nephropathy, amyloidosis, or FSGS. Renal biopsy is indicated in adults. Nephritic syndrome differs: hematuria, RBC casts, hypertension, mild proteinuria.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q11",
    type: "question",
    question: "A patient presents with acute monoarthritis of the great toe. Joint aspiration shows negatively birefringent needle-shaped crystals under polarized light. Serum uric acid is 9.8 mg/dL. What is the diagnosis?",
    options: ["Pseudogout (calcium pyrophosphate deposition disease)", "Gout (monosodium urate crystal arthropathy)", "Septic arthritis", "Reactive arthritis"],
    correctIndex: 1,
    answer: "Negatively birefringent needle-shaped crystals are pathognomonic for gout (monosodium urate crystals). This is the gold standard diagnostic test. Pseudogout has positively birefringent rhomboid-shaped crystals (calcium pyrophosphate). Podagra (first MTP joint inflammation) is the most common presentation. Importantly, serum uric acid can be normal or even low during an acute flare (inflammatory cytokines promote renal excretion). Treat the flare first; urate-lowering therapy should not be initiated during acute attacks.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q12",
    type: "question",
    question: "An NP is evaluating an infant with bilious vomiting on day 2 of life. Abdominal X-ray shows the 'double bubble' sign. What does this suggest?",
    options: ["Pyloric stenosis", "Duodenal atresia", "Necrotizing enterocolitis", "Meconium ileus"],
    correctIndex: 1,
    answer: "The double bubble sign on X-ray (dilated stomach + dilated proximal duodenum separated by the pylorus) is pathognomonic for duodenal atresia or severe stenosis. Bilious vomiting in the first 24-48 hours is the hallmark. Duodenal atresia is associated with Down syndrome (trisomy 21) in 30% of cases, and with polyhydramnios prenatally. Treatment is surgical (duodenoduodenostomy). Unlike pyloric stenosis, which presents at 2-6 weeks with NON-bilious vomiting.",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q13",
    type: "question",
    question: "A patient's thyroid function tests show low TSH (0.05), high fT4, and high fT3. Thyroid uptake scan shows diffusely increased uptake. What is the most likely diagnosis?",
    options: ["Toxic multinodular goiter", "Graves disease", "Subacute thyroiditis (De Quervain)", "Thyroid hormone ingestion (factitious thyrotoxicosis)"],
    correctIndex: 1,
    answer: "Diffusely increased radioactive iodine uptake with biochemical hyperthyroidism (low TSH, high fT4/fT3) is characteristic of Graves disease. Toxic multinodular goiter shows patchy uptake with hot and cold nodules. Subacute thyroiditis and factitious thyrotoxicosis show DECREASED uptake (thyroid is not actively producing hormone; in thyroiditis, preformed hormone is released from damaged gland; in factitious, exogenous hormone suppresses thyroid function). TSH receptor antibodies (TRAb) confirm Graves disease.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q14",
    type: "question",
    question: "A 65-year-old presents with progressive dyspnea, dry cough, and bibasilar Velcro-like crackles on auscultation. HRCT shows honeycombing and traction bronchiectasis predominantly in the lower lobes. PFTs show a restrictive pattern. What is the likely diagnosis?",
    options: ["COPD", "Idiopathic pulmonary fibrosis (IPF)", "Sarcoidosis", "Congestive heart failure"],
    correctIndex: 1,
    answer: "Bibasilar Velcro-like crackles, HRCT showing honeycombing with traction bronchiectasis (usual interstitial pneumonia/UIP pattern), and restrictive PFTs in an older adult are classic for idiopathic pulmonary fibrosis. IPF has a median survival of 3-5 years from diagnosis. Antifibrotic therapy (pirfenidone or nintedanib) slows disease progression. Lung transplant referral should be considered early. IPF does NOT respond to steroids or immunosuppression (unlike other interstitial lung diseases).",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q15",
    type: "question",
    question: "A patient with chronic kidney disease has the following labs: calcium 7.8, phosphorus 7.2, PTH 285 pg/mL, vitamin D 12 ng/mL. What is the underlying pathophysiology?",
    options: ["Primary hyperparathyroidism", "Secondary hyperparathyroidism from CKD (renal osteodystrophy)", "Hypoparathyroidism", "Vitamin D toxicity"],
    correctIndex: 1,
    answer: "CKD causes a cascade: failing kidneys cannot convert 25-OH vitamin D to active 1,25-(OH)2 vitamin D → decreased intestinal calcium absorption → hypocalcemia → parathyroid glands respond with elevated PTH (secondary hyperparathyroidism). Failing kidneys also cannot excrete phosphorus → hyperphosphatemia → further calcium deposition and hypocalcemia. Treatment: phosphate binders with meals, active vitamin D (calcitriol), and cinacalcet (calcimimetic) if PTH remains elevated. Unlike primary hyperparathyroidism, which shows HYPERcalcemia.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q16",
    type: "question",
    question: "An NP is interpreting spirometry results: FEV1/FVC ratio 0.82 (normal), FVC 62% predicted, FEV1 65% predicted, TLC elevated. What pattern is this?",
    options: ["Obstructive pattern", "Restrictive pattern", "Mixed obstructive and restrictive", "Normal spirometry"],
    correctIndex: 1,
    answer: "A normal or elevated FEV1/FVC ratio with reduced FVC and FEV1 indicates a restrictive pattern. Both volumes are proportionally reduced because the lungs cannot fully expand. Obstructive disease shows a REDUCED FEV1/FVC ratio (<0.7) because airflow is limited during exhalation. Causes of restriction: interstitial lung disease, chest wall deformity, neuromuscular disease, pleural disease, obesity. TLC elevation is unusual for pure restriction and may suggest air trapping; clinical correlation needed.",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  {
    id: "np-diag-q17",
    type: "question",
    question: "A patient presents with a painless testicular mass in a 25-year-old male. Ultrasound shows a solid, hypoechoic intratesticular mass. What are the appropriate tumor markers to order?",
    options: ["PSA and free PSA", "AFP, beta-hCG, and LDH", "CEA and CA 19-9", "CA-125 and HE4"],
    correctIndex: 1,
    answer: "Testicular cancer tumor markers: AFP (alpha-fetoprotein, elevated in yolk sac tumors and some non-seminomas), beta-hCG (elevated in choriocarcinoma and some seminomas), and LDH (reflects tumor burden). Seminomas: may have mildly elevated beta-hCG, but AFP is ALWAYS normal (elevated AFP rules out pure seminoma). Non-seminomas: may elevate AFP, beta-hCG, or both. Markers are used for diagnosis, staging, and monitoring treatment response. Radical inguinal orchiectomy (NOT trans-scrotal biopsy) is the definitive diagnostic and initial therapeutic procedure.",
    category: "Diagnostic Reasoning",
    difficulty: 3
  },
  {
    id: "np-diag-q18",
    type: "question",
    question: "An NP is evaluating a patient with suspected celiac disease. IgA anti-tissue transglutaminase (tTG-IgA) is strongly positive. Total serum IgA is normal. What is the next step?",
    options: ["Start a gluten-free diet immediately", "Confirm with esophagogastroduodenoscopy (EGD) with small bowel biopsies while the patient is still on a gluten-containing diet", "Order genetic testing (HLA-DQ2/DQ8) as the definitive test", "Prescribe immunosuppressive therapy"],
    correctIndex: 1,
    answer: "While tTG-IgA has high sensitivity (>95%) and specificity (>95%) for celiac disease, histological confirmation with small bowel biopsy remains the gold standard. The patient MUST remain on a gluten-containing diet during testing (gluten-free diet normalizes serology and heals mucosa, causing false negatives). Classic histological findings: villous atrophy, crypt hyperplasia, intraepithelial lymphocytosis (Marsh classification). HLA-DQ2/DQ8 testing is useful for ruling OUT celiac (>99% NPV) but not for confirming it (40% of the general population carries these alleles).",
    category: "Diagnostic Reasoning",
    difficulty: 2
  },
  // ============================================================
  // PRIMARY CARE (18 cards)
  // ============================================================
  {
    id: "np-pc-q1",
    type: "question",
    question: "A 50-year-old male with no known cardiovascular disease has an LDL of 145 mg/dL and a 10-year ASCVD risk of 12%. Per ACC/AHA guidelines, what is the recommended statin intensity?",
    options: ["No statin therapy is needed", "Moderate-intensity statin (e.g., atorvastatin 10-20 mg)", "High-intensity statin (e.g., atorvastatin 40-80 mg)", "Start with lifestyle modifications only for 6 months"],
    correctIndex: 1,
    answer: "For primary prevention with 10-year ASCVD risk 7.5-20% and LDL ≥70, ACC/AHA 2018 guidelines recommend moderate-intensity statin therapy. Risk-enhancing factors (family history, metabolic syndrome, elevated hs-CRP, elevated Lp(a), ABI <0.9) may favor higher intensity. Coronary artery calcium (CAC) scoring can refine the decision: CAC 0 may defer therapy, CAC ≥100 favors statin. High-intensity statins are reserved for clinical ASCVD, LDL ≥190, diabetes with risk factors, or very high risk (≥20%).",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q2",
    type: "question",
    question: "An NP is performing a Medicare Annual Wellness Visit for a 72-year-old woman. Which screening is recommended at this visit?",
    options: ["Full physical examination including pelvic exam", "Health risk assessment, cognitive screening, depression screening, fall risk assessment, advance directive review, and functional ability assessment", "Comprehensive metabolic panel and CBC", "Stress test and echocardiogram"],
    correctIndex: 1,
    answer: "The Medicare Annual Wellness Visit (AWV) is NOT a comprehensive physical exam. It includes: health risk assessment questionnaire, review of medical/family history, vital signs and BMI, cognitive assessment (Mini-Cog or similar), depression screening (PHQ-2/PHQ-9), fall risk assessment, functional ability/ADLs, advance directive review, medication reconciliation, and personalized prevention plan with age-appropriate screening recommendations. Understanding the AWV components is essential for NP billing and compliance.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q3",
    type: "question",
    question: "A 45-year-old patient presents with a BP of 142/92 on three separate visits over 2 months. No target organ damage is identified. Per the 2017 ACC/AHA guidelines, what is the classification and initial treatment?",
    options: ["Normal BP; no treatment needed", "Stage 1 hypertension; lifestyle modifications and consider pharmacotherapy based on ASCVD risk", "Stage 2 hypertension; start two antihypertensive medications", "Hypertensive urgency requiring immediate IV medications"],
    correctIndex: 1,
    answer: "Per 2017 ACC/AHA guidelines: BP 130-139/80-89 is Stage 1 HTN, and 140+/90+ is Stage 2 HTN. However, JNC 8 thresholds (which many practices still follow) classify 140-159/90-99 as Stage 1. At 142/92, treatment includes lifestyle modifications (DASH diet, sodium restriction <2.3g/day, exercise, weight loss, alcohol moderation) PLUS pharmacotherapy if 10-year ASCVD risk ≥10%. First-line agents: thiazide diuretic, ACEi/ARB, or CCB. Choice is influenced by comorbidities (ACEi/ARB for diabetes or CKD, CCB for African Americans).",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q4",
    type: "question",
    question: "A 52-year-old woman presents with hot flashes, night sweats, and vaginal dryness causing significant distress. Her last menstrual period was 14 months ago. She has no contraindications to hormone therapy. What is the most appropriate management?",
    options: ["Systemic hormone therapy is never recommended", "Low-dose systemic estrogen plus progesterone (for women with intact uterus) is appropriate for vasomotor symptoms within 10 years of menopause onset", "High-dose testosterone replacement", "SSRIs as first-line for all menopausal symptoms"],
    correctIndex: 1,
    answer: "For women within 10 years of menopause onset or under age 60 with bothersome vasomotor symptoms and no contraindications, systemic HT (estrogen + progestogen for intact uterus, estrogen alone if post-hysterectomy) is the most effective treatment. Benefits outweigh risks in this 'window of opportunity.' Contraindications: breast cancer, active liver disease, unexplained vaginal bleeding, history of VTE, known ASCVD. Use the lowest effective dose for the shortest duration. For vaginal symptoms only, low-dose vaginal estrogen is preferred.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q5",
    type: "question",
    question: "An NP is counseling a patient on colorectal cancer screening. The patient is 46, average risk, with no family history. Per current USPSTF guidelines (2021), when should screening begin?",
    options: ["Age 50", "Age 45", "Age 40", "Age 55"],
    correctIndex: 1,
    answer: "USPSTF 2021 guidelines lowered the colorectal cancer screening initiation age from 50 to 45 for average-risk individuals (Grade B recommendation). Screening options include: colonoscopy every 10 years, FIT annually, FIT-DNA (Cologuard) every 1-3 years, CT colonography every 5 years, or flexible sigmoidoscopy every 5 years. First-degree relatives with CRC before 60 should start screening at age 40 or 10 years before the affected relative's diagnosis, whichever is earlier.",
    category: "Primary Care",
    difficulty: 1
  },
  {
    id: "np-pc-q6",
    type: "question",
    question: "A 30-year-old sexually active woman presents with malodorous, thin, grayish-white vaginal discharge. Wet mount shows clue cells. Whiff test is positive. Vaginal pH is 5.2. What is the diagnosis and treatment?",
    options: ["Vulvovaginal candidiasis; treat with fluconazole", "Bacterial vaginosis; treat with metronidazole 500 mg BID for 7 days or metronidazole vaginal gel", "Trichomoniasis; treat with metronidazole 2 g single dose", "Normal physiological discharge; no treatment needed"],
    correctIndex: 1,
    answer: "Three of four Amsel criteria confirm BV: (1) thin, grayish discharge, (2) clue cells on wet mount (epithelial cells studded with bacteria obscuring cell borders), (3) positive whiff test (fishy odor with KOH), (4) vaginal pH >4.5. Treatment: metronidazole 500 mg BID for 7 days (oral) or metronidazole 0.75% vaginal gel for 5 days. Alternative: clindamycin vaginal cream. BV increases risk of preterm birth in pregnancy (treat all symptomatic pregnant women). Avoid alcohol during and 24 hours after metronidazole.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q7",
    type: "question",
    question: "An NP is managing a patient with newly diagnosed type 2 diabetes. A1C is 7.8%. BMI is 31. Patient has no ASCVD or CKD. What is the first-line medication per ADA Standards of Care?",
    options: ["Insulin glargine", "Metformin 500 mg with titration to 1000 mg BID", "Empagliflozin 10 mg daily", "Glipizide 5 mg daily"],
    correctIndex: 1,
    answer: "Metformin remains first-line therapy for type 2 diabetes per ADA guidelines. Start 500 mg once daily with meals, titrate to 1000 mg BID over 4-8 weeks to minimize GI side effects. Benefits: effective A1C reduction (1-1.5%), weight neutral/slight loss, low hypoglycemia risk, cardiovascular benefit, low cost. Check B12 levels annually (metformin impairs B12 absorption). Contraindicated if eGFR <30. If A1C is >1.5% above target or patient has ASCVD/CKD/HF, consider dual therapy at initiation (metformin + SGLT2i or GLP-1 RA).",
    category: "Primary Care",
    difficulty: 1
  },
  {
    id: "np-pc-q8",
    type: "question",
    question: "A patient presents with a 2-week history of productive cough, purulent sputum, and low-grade fever. CXR is clear. What is the most likely diagnosis and appropriate management?",
    options: ["Pneumonia requiring antibiotics", "Acute bronchitis; supportive care without antibiotics in most cases", "Tuberculosis requiring isolation", "Lung cancer requiring urgent biopsy"],
    correctIndex: 1,
    answer: "Acute bronchitis is a self-limiting viral illness in 90%+ of cases. Purulent sputum does NOT indicate bacterial infection (it reflects neutrophil influx, not bacteria). With a clear CXR ruling out pneumonia, antibiotics are NOT indicated and contribute to antibiotic resistance. Management: symptom relief with dextromethorphan, honey (adults), NSAIDs for discomfort, adequate hydration, and patient education that cough may persist 2-3 weeks. Consider pertussis testing if cough >2 weeks with paroxysms or post-tussive vomiting.",
    category: "Primary Care",
    difficulty: 1
  },
  {
    id: "np-pc-q9",
    type: "question",
    question: "A 28-year-old patient presents with recurrent episodes of unilateral pulsating headache with nausea, photophobia, and phonophobia lasting 4-72 hours. Episodes occur 12 times per month. What is the diagnosis and when is preventive therapy indicated?",
    options: ["Tension headache; prevention not needed", "Migraine without aura; preventive therapy is indicated when frequency is ≥4 headache days per month", "Cluster headache; start oxygen therapy", "Medication overuse headache; stop all medications"],
    correctIndex: 1,
    answer: "Unilateral pulsating headache with nausea, photo/phonophobia lasting 4-72 hours meets ICHD-3 criteria for migraine without aura. Preventive therapy is indicated when: ≥4 headache days/month, significant disability, contraindication to acute medications, or overuse of acute medications. Options: beta-blockers (propranolol), anticonvulsants (topiramate, valproate), antidepressants (amitriptyline), CGRP monoclonal antibodies (erenumab, fremanezumab). At 12 days/month, this patient is at high risk for progression to chronic migraine.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q10",
    type: "question",
    question: "An NP is managing a patient with hypothyroidism on levothyroxine 100 mcg daily. TSH is 8.2 (elevated) despite reported adherence. What should the NP assess?",
    options: ["The dose is adequate; no changes needed", "Assess medication timing (empty stomach, 30-60 min before food), drug interactions (calcium, iron, PPIs), and true adherence", "Switch to liothyronine (T3) immediately", "Increase the dose to 200 mcg immediately"],
    correctIndex: 1,
    answer: "Before adjusting levothyroxine dose, assess common causes of subtherapeutic TSH: (1) Adherence: most common cause; 'white coat compliance' (patient takes medication consistently only before visits). (2) Timing: must be on empty stomach, 30-60 min before food/other meds. (3) Drug interactions: calcium, iron, PPIs, cholestyramine, and antacids impair absorption (space 4 hours). (4) Malabsorption: celiac disease, inflammatory bowel disease, H. pylori. (5) Consider checking free T4 level. Dose adjustments should be made in 12.5-25 mcg increments with TSH rechecked in 6-8 weeks.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q11",
    type: "question",
    question: "A 65-year-old male presents with nocturia (4 times/night), weak urinary stream, hesitancy, and incomplete emptying. DRE shows a symmetrically enlarged, non-tender, smooth prostate. PSA is 2.8 ng/mL. What is the initial pharmacological treatment?",
    options: ["Immediate surgical referral for TURP", "Alpha-blocker (tamsulosin) for symptom relief and/or 5-alpha reductase inhibitor (finasteride) for large prostates", "Antibiotics for presumed prostatitis", "Watchful waiting only, regardless of symptom severity"],
    correctIndex: 1,
    answer: "Benign prostatic hyperplasia (BPH) with moderate-severe LUTS (IPSS >7) is initially treated with alpha-blockers (tamsulosin, alfuzosin) for rapid symptom relief (relaxes prostatic smooth muscle). For larger prostates (>30-40g), add a 5-alpha reductase inhibitor (finasteride, dutasteride) which shrinks the gland over 6-12 months and reduces risk of acute urinary retention. Combination therapy is superior for large prostates. Surgical referral (TURP, laser) for refractory symptoms or complications (retention, recurrent UTI, bladder stones, renal insufficiency).",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q12",
    type: "question",
    question: "A patient presents with a BMI of 42, type 2 diabetes, obstructive sleep apnea, and knee osteoarthritis. Previous weight loss attempts with lifestyle modification and medications have failed. What should the NP recommend?",
    options: ["Continue lifestyle modifications indefinitely", "Referral for bariatric surgery evaluation, as BMI ≥40 (or ≥35 with comorbidities) meets criteria", "Prescribe phentermine long-term", "Very-low-calorie liquid diet"],
    correctIndex: 1,
    answer: "Per ASMBS/ACS guidelines, bariatric surgery is indicated for BMI ≥40, or BMI ≥35 with obesity-related comorbidities (diabetes, OSA, hypertension, NAFLD). Recent guidelines also consider BMI 30-35 with poorly controlled type 2 diabetes. Roux-en-Y gastric bypass and sleeve gastrectomy achieve superior long-term weight loss and comorbidity resolution compared to medical therapy alone. The STAMPEDE trial showed 60% of diabetic patients achieving A1C <6% after bariatric surgery vs. 5% with medical therapy.",
    category: "Primary Care",
    difficulty: 2
  },
  {
    id: "np-pc-q13",
    type: "question",
    question: "An NP is managing a patient with chronic low back pain persisting for 4 months with no red flags. MRI shows mild degenerative disc disease. What is the evidence-based first-line treatment approach?",
    options: ["Prescribe long-term opioids for chronic pain", "Multimodal approach: exercise therapy, NSAIDs, cognitive behavioral therapy, and avoidance of prolonged bed rest", "Immediate surgical referral for discectomy", "Repeat MRI in 2 weeks"],
    correctIndex: 1,
    answer: "ACP/APS guidelines for chronic low back pain recommend a multimodal approach: exercise therapy (strongest evidence), NSAIDs or duloxetine for pharmacological management, cognitive behavioral therapy (addresses pain catastrophizing and fear-avoidance behavior), spinal manipulation, and yoga/tai chi. Opioids are NOT recommended for chronic non-cancer pain as first-line. Imaging is only indicated with red flags (neurological deficit, fever, weight loss, history of cancer, trauma). Surgery is reserved for progressive neurological deficit or cauda equina syndrome.",
    category: "Primary Care",
    difficulty: 2
  },
  // ============================================================
  // ACUTE CARE (16 cards)
  // ============================================================
  {
    id: "np-ac-q1",
    type: "question",
    question: "An NP in the ICU is managing a patient with septic shock. Despite 30 mL/kg crystalloid resuscitation and norepinephrine at 0.5 mcg/kg/min, the MAP is 58 mmHg. What is the next recommended vasopressor per SSC guidelines?",
    options: ["Dopamine at renal dose", "Add vasopressin 0.03-0.04 units/min", "Switch to phenylephrine", "Add dobutamine"],
    correctIndex: 1,
    answer: "Surviving Sepsis Campaign 2021 guidelines recommend adding vasopressin (up to 0.03-0.04 units/min) as the second-line vasopressor when norepinephrine alone is insufficient to achieve MAP ≥65 mmHg. Vasopressin acts on V1 receptors causing vasoconstriction independent of catecholamine receptors. It also has a catecholamine-sparing effect. If cardiac output is a concern (low ScvO2, high lactate despite adequate MAP), dobutamine may be added. Corticosteroids (hydrocortisone 200 mg/day) should be considered for refractory shock.",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q2",
    type: "question",
    question: "A hospitalized patient develops acute respiratory distress with bilateral pulmonary infiltrates, PaO2/FiO2 ratio of 180, and no evidence of cardiogenic pulmonary edema. What is the diagnosis and target tidal volume?",
    options: ["Cardiogenic pulmonary edema; diuretics", "Moderate ARDS; lung-protective ventilation with tidal volume 6-8 mL/kg ideal body weight", "Pneumonia; antibiotics only", "Pleural effusion; thoracentesis"],
    correctIndex: 1,
    answer: "PaO2/FiO2 ratio 100-200 with bilateral infiltrates and no cardiogenic cause meets Berlin criteria for MODERATE ARDS (mild: 200-300, severe: <100). ARDSNet lung-protective ventilation: tidal volume 6-8 mL/kg IDEAL body weight (not actual weight), plateau pressure <30 cmH2O, adequate PEEP per PEEP/FiO2 table, and permissive hypercapnia if needed. Prone positioning for 12-16 hours/day improves survival in moderate-severe ARDS (PROSEVA trial). Conservative fluid strategy after initial resuscitation.",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q3",
    type: "question",
    question: "An NP is evaluating a patient with suspected acute coronary syndrome. Troponin is elevated and the ECG shows ST depression in V3-V6 with T-wave inversions. What type of ACS is this and what is the management priority?",
    options: ["STEMI requiring emergent PCI within 90 minutes", "NSTEMI; anticoagulation, antiplatelets, and risk stratification for early invasive strategy within 24-72 hours", "Unstable angina; observation only", "Pericarditis; NSAIDs"],
    correctIndex: 1,
    answer: "Elevated troponin with ST depression/T-wave inversions (without ST elevation) defines NSTEMI. Management per ACC/AHA: dual antiplatelet therapy (aspirin + P2Y12 inhibitor), anticoagulation (heparin or enoxaparin), beta-blocker (if no contraindications), statin, and risk stratification using TIMI or GRACE score. Early invasive strategy (cardiac catheterization within 24-72 hours) is recommended for high-risk patients (GRACE score >140, dynamic ST changes, elevated troponin, diabetes, hemodynamic instability).",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q4",
    type: "question",
    question: "A patient with community-acquired pneumonia has a CURB-65 score of 4 (confusion, BUN >20, RR >30, BP <90/60, age 68). What level of care is appropriate?",
    options: ["Outpatient oral antibiotics", "Standard medical floor admission", "ICU admission with IV antibiotics and hemodynamic monitoring", "Observation unit for 24 hours"],
    correctIndex: 2,
    answer: "CURB-65 score ≥3 indicates severe CAP with 30-day mortality 15-40%, warranting ICU consideration. ATS/IDSA major criteria for ICU admission include: invasive mechanical ventilation or septic shock requiring vasopressors. Minor criteria (≥3 of 9 = ICU): confusion, BUN >20, RR ≥30, SBP <90, multilobar infiltrates, PaO2/FiO2 <250, hypothermia, leukopenia, thrombocytopenia. IV antibiotics should cover both typical and atypical pathogens: beta-lactam (ceftriaxone/ampicillin-sulbactam) PLUS macrolide OR respiratory fluoroquinolone.",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q5",
    type: "question",
    question: "A patient with cirrhosis presents with fever, abdominal pain, and new-onset ascites. Diagnostic paracentesis reveals: PMN count 380 cells/mm³, protein 1.2 g/dL. What is the diagnosis and empiric treatment?",
    options: ["Secondary bacterial peritonitis requiring surgery", "Spontaneous bacterial peritonitis (SBP); empiric ceftriaxone or cefotaxime PLUS IV albumin", "Sterile ascites requiring diuretics only", "Tuberculous peritonitis"],
    correctIndex: 1,
    answer: "SBP is diagnosed when ascitic fluid PMN count ≥250 cells/mm³ (regardless of culture results). Low protein ascites (<1 g/dL) increases SBP risk. Empiric therapy: third-generation cephalosporin (cefotaxime 2g q8h or ceftriaxone 2g daily) for 5-7 days. IV albumin (1.5 g/kg on day 1, 1 g/kg on day 3) reduces mortality by preventing hepatorenal syndrome (Sort trial). After recovery, long-term prophylaxis with norfloxacin or TMP-SMX is indicated. Avoid aminoglycosides in cirrhosis (nephrotoxicity).",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q6",
    type: "question",
    question: "An NP is managing a patient with acute exacerbation of COPD requiring hospitalization. ABG shows pH 7.28, PaCO2 62, PaO2 55 on 2L NC. What is the most appropriate ventilatory support?",
    options: ["Increase nasal cannula to 6L/min", "Non-invasive positive pressure ventilation (BiPAP) as first-line", "Immediate intubation and mechanical ventilation", "High-flow nasal cannula at 60L/min"],
    correctIndex: 1,
    answer: "BiPAP is first-line ventilatory support for acute COPD exacerbation with respiratory acidosis (pH <7.35, PaCO2 >45). BiPAP reduces work of breathing, improves gas exchange, and reduces intubation rates by 65% and mortality by 46% (Cochrane review). Settings: start with IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, FiO2 titrated to SpO2 88-92%. Intubation is indicated if BiPAP fails after 1-2 hours (worsening pH, rising PaCO2, declining mental status) or if the patient cannot tolerate the mask.",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q7",
    type: "question",
    question: "An NP is managing a patient with acute kidney injury. Labs show: creatinine 4.2 (baseline 0.9), potassium 6.8, pH 7.18, BUN 88, and the patient is anuric. What is the indication for urgent dialysis?",
    options: ["Elevated BUN alone", "Refractory hyperkalemia, severe metabolic acidosis, volume overload unresponsive to diuretics, or uremic symptoms (AEIOU mnemonic)", "Creatinine above 3.0", "Any AKI requires immediate dialysis"],
    correctIndex: 1,
    answer: "Urgent dialysis indications (AEIOU): Acidosis refractory to medical management, Electrolyte abnormalities (refractory hyperkalemia), Intoxication (certain drug overdoses: methanol, ethylene glycol, lithium, salicylates), Overload (fluid overload unresponsive to diuretics), Uremia (encephalopathy, pericarditis, bleeding). This patient has refractory hyperkalemia (6.8) AND severe acidosis (7.18) in an anuric patient, meeting multiple urgent criteria. While temporizing measures (calcium gluconate, insulin/D50, sodium bicarbonate) can be initiated, dialysis is needed.",
    category: "Acute Care",
    difficulty: 3
  },
  {
    id: "np-ac-q8",
    type: "question",
    question: "A hospitalized patient on vancomycin therapy develops AKI. The vancomycin trough is 32 mcg/mL (therapeutic range 15-20 for serious infections). What should the NP do?",
    options: ["Continue the same dose as infection control is paramount", "Hold vancomycin, obtain a stat renal panel, reassess the need for vancomycin, and consider switching to alternative agents or adjusting dose based on AUC-guided dosing", "Increase the dose to compensate for renal impairment", "Discontinue vancomycin permanently and never rechallenge"],
    correctIndex: 1,
    answer: "Vancomycin trough of 32 mcg/mL is supratherapeutic and nephrotoxic. Current ASHP/IDSA/SIDP guidelines (2020) recommend AUC-guided dosing (AUC/MIC 400-600) over trough-only monitoring, as it reduces nephrotoxicity. The NP should hold vancomycin, assess renal function trend, and consider: (1) dose reduction with extended interval, (2) switching to alternative (daptomycin for VRE/MRSA bacteremia, linezolid for MRSA pneumonia), or (3) pharmacy-calculated AUC-based dosing adjustment.",
    category: "Acute Care",
    difficulty: 3
  },
  // ============================================================
  // PEDIATRIC NP (14 cards)
  // ============================================================
  {
    id: "np-peds-q1",
    type: "question",
    question: "A 2-month-old infant presents with fever of 38.5°C. The infant appears well-appearing. According to current guidelines, what is the recommended evaluation?",
    options: ["Acetaminophen and follow-up in 48 hours", "Full sepsis workup including CBC, blood culture, urinalysis/urine culture, and lumbar puncture for CSF analysis, with empiric antibiotics pending results", "Observe without testing if the infant appears well", "Prescribe amoxicillin empirically and recheck in 24 hours"],
    correctIndex: 1,
    answer: "Febrile neonates and young infants (0-60 days) require a full sepsis evaluation regardless of appearance because serious bacterial infections (UTI, bacteremia, meningitis) can present with minimal symptoms. The 2021 AAP clinical practice guideline for febrile infants 8-60 days stratifies risk using inflammatory markers (procalcitonin, ABS, CRP) and urinalysis. Infants 0-28 days: full workup + empiric ampicillin and gentamicin (or cefotaxime) pending cultures. Older well-appearing infants with negative markers may be managed more conservatively.",
    category: "Pediatric NP",
    difficulty: 3
  },
  {
    id: "np-peds-q2",
    type: "question",
    question: "An NP is evaluating a 7-year-old with recurrent episodes of sore throat (7 episodes in the past year, all positive for GAS). What is the recommended management?",
    options: ["Continue treating each episode with antibiotics", "Referral for tonsillectomy, as the Paradise criteria are met", "Prophylactic antibiotics for 1 year", "Observe and treat only symptomatic episodes"],
    correctIndex: 1,
    answer: "Paradise criteria for tonsillectomy: ≥7 episodes in 1 year, ≥5/year for 2 years, or ≥3/year for 3 years, each with specific documentation (fever, tonsillar exudate, positive GAS culture, or treatment with antibiotics). This child meets criteria with 7 episodes in 1 year. AAP/AAO-HNS guidelines support tonsillectomy in these cases. Watchful waiting is an alternative if the family prefers, as recurrence often decreases naturally. Penicillin allergy should be documented; amoxicillin or penicillin V remains first-line for GAS pharyngitis.",
    category: "Pediatric NP",
    difficulty: 2
  },
  {
    id: "np-peds-q3",
    type: "question",
    question: "A 4-year-old presents with periorbital swelling, 4+ proteinuria on dipstick, and serum albumin of 1.5 g/dL. The most likely diagnosis and initial treatment?",
    options: ["Acute glomerulonephritis; IV antibiotics", "Minimal change disease (nephrotic syndrome); empiric corticosteroid therapy with prednisone", "Hemolytic uremic syndrome; plasmapheresis", "IgA nephropathy; ACE inhibitor"],
    correctIndex: 1,
    answer: "In children aged 1-10 years, nephrotic syndrome is most commonly caused by minimal change disease (80% of pediatric nephrotic syndrome). Per KDIGO guidelines, empiric corticosteroid therapy (prednisone 2 mg/kg/day for 4-6 weeks, then taper over 2-6 months) is initiated WITHOUT renal biopsy, as 90% of MCD responds to steroids. Biopsy is reserved for steroid-resistant cases, age <1 or >12, low C3, or hematuria/hypertension suggesting alternative diagnosis. Monitor for steroid side effects and relapse (occurs in 60-70%).",
    category: "Pediatric NP",
    difficulty: 3
  },
  {
    id: "np-peds-q4",
    type: "question",
    question: "An NP is evaluating a 6-month-old infant for developmental milestones. Which finding would be most concerning for developmental delay?",
    options: ["Cannot walk independently", "Does not babble, does not reach for objects, does not roll over, and does not track visually", "Cannot stack blocks", "Does not use a pincer grasp"],
    correctIndex: 1,
    answer: "By 6 months, expected milestones include: babbling (social communication), reaching for and grasping objects (fine motor), rolling over both ways (gross motor), and tracking objects visually. Absence of all these suggests significant global developmental delay requiring urgent referral for early intervention services and comprehensive developmental evaluation. Individual milestone delays may be normal variants, but absence of multiple milestones across domains is a red flag. Hearing and vision screening should also be performed.",
    category: "Pediatric NP",
    difficulty: 2
  },
  {
    id: "np-peds-q5",
    type: "question",
    question: "A 10-year-old presents with cola-colored urine, periorbital edema, and hypertension 2 weeks after a streptococcal pharyngitis. Serum C3 is low. What is the diagnosis?",
    options: ["IgA nephropathy (Berger disease)", "Post-streptococcal glomerulonephritis (PSGN)", "Minimal change disease", "Henoch-Schönlein purpura nephritis"],
    correctIndex: 1,
    answer: "PSGN is a classic post-infectious glomerulonephritis occurring 1-3 weeks after GAS pharyngitis or 3-6 weeks after GAS skin infection. The nephritic syndrome presentation (hematuria/cola-colored urine, edema, hypertension) with low C3 (consumed by immune complex deposition) following documented streptococcal infection is diagnostic. ASO titer or anti-DNase B confirms prior strep exposure. Treatment is supportive: sodium and fluid restriction, loop diuretics for edema, antihypertensives. C3 should normalize within 6-8 weeks; persistent low C3 suggests alternative diagnosis (MPGN, lupus nephritis).",
    category: "Pediatric NP",
    difficulty: 2
  },
  {
    id: "np-peds-q6",
    type: "question",
    question: "An NP is managing a child with newly diagnosed ADHD. The parents want to explore medication options. What is the first-line pharmacological treatment per AAP guidelines?",
    options: ["Atomoxetine (Strattera)", "Methylphenidate (Ritalin/Concerta) or amphetamine-based stimulant", "Clonidine", "Bupropion"],
    correctIndex: 1,
    answer: "AAP guidelines (2019) recommend stimulant medications as first-line for ADHD in children ≥6 years: methylphenidate-based (Ritalin, Concerta, Focalin) or amphetamine-based (Adderall, Vyvanse). Both classes have equivalent efficacy (~70-80% response rate). For ages 4-5, behavioral therapy is first-line. Side effects: appetite suppression, insomnia, growth deceleration (monitor height/weight), tachycardia. Growth should be monitored with height/weight at each visit. Second-line: atomoxetine, guanfacine XR, or clonidine XR. Cardiovascular screening with personal/family history is recommended before starting stimulants.",
    category: "Pediatric NP",
    difficulty: 2
  },
  {
    id: "np-peds-q7",
    type: "question",
    question: "A neonate born at 28 weeks gestation develops respiratory distress within hours of birth. CXR shows ground-glass opacities with air bronchograms. What is the diagnosis and primary treatment?",
    options: ["Meconium aspiration syndrome", "Respiratory distress syndrome (RDS) from surfactant deficiency; exogenous surfactant replacement", "Transient tachypnea of the newborn", "Congenital pneumonia"],
    correctIndex: 1,
    answer: "RDS (formerly hyaline membrane disease) results from surfactant deficiency in premature lungs (type II pneumocytes produce surfactant beginning at 24-28 weeks, adequate by 35 weeks). CXR shows bilateral ground-glass opacities with air bronchograms. Treatment: exogenous surfactant replacement via ETT (calfactant, beractant, or poractant), CPAP or mechanical ventilation, and supportive NICU care. Prevention: antenatal corticosteroids (betamethasone) given to mothers at risk for preterm delivery at 24-34 weeks accelerates fetal lung maturation.",
    category: "Pediatric NP",
    difficulty: 2
  },
  // ============================================================
  // FAMILY NP (12 cards)
  // ============================================================
  {
    id: "np-fnp-q1",
    type: "question",
    question: "A 35-year-old woman with a BMI of 42 and irregular menses wants to conceive. She has acne, hirsutism, and ultrasound shows bilateral enlarged ovaries with multiple small follicles. What is the most likely diagnosis and first-line fertility treatment?",
    options: ["Premature ovarian insufficiency; IVF", "Polycystic ovary syndrome (PCOS); weight loss + letrozole for ovulation induction", "Hypothalamic amenorrhea; GnRH pump therapy", "Endometriosis; laparoscopic surgery"],
    correctIndex: 1,
    answer: "PCOS is diagnosed using Rotterdam criteria (≥2 of 3: oligo/anovulation, clinical/biochemical hyperandrogenism, polycystic ovaries on ultrasound). This patient meets all three. For fertility: weight loss of 5-10% can restore ovulation in many women. Letrozole (aromatase inhibitor) has replaced clomiphene as first-line ovulation induction in PCOS per the international evidence-based PCOS guideline (2023). Metformin may be added as adjunct. If letrozole fails, gonadotropins or IVF are considered. Lifestyle modification is foundational for all PCOS management.",
    category: "Family NP",
    difficulty: 3
  },
  {
    id: "np-fnp-q2",
    type: "question",
    question: "An NP is managing a family where the 8-year-old child has been diagnosed with lead poisoning (blood lead level 52 μg/dL). What is the treatment threshold and intervention?",
    options: ["No treatment needed below 70 μg/dL", "BLL ≥45 μg/dL requires chelation therapy (succimer for oral or CaEDTA for severe cases); immediate environmental investigation and remediation", "Dietary iron supplementation is the only intervention needed", "Repeat blood lead level in 6 months"],
    correctIndex: 1,
    answer: "CDC reference value is 3.5 μg/dL (previously 5). BLL 45-69 μg/dL: chelation therapy with oral succimer (DMSA) and environmental investigation. BLL ≥70 μg/dL: emergent chelation with parenteral CaEDTA ± BAL in ICU setting. BLL 20-44: environmental investigation, nutritional counseling (iron, calcium, vitamin C enhance lead excretion), developmental assessment. Sources: lead paint (pre-1978 housing), contaminated water, soil, imported ceramics/toys. Iron deficiency increases lead absorption, so ensuring adequate iron status is important.",
    category: "Family NP",
    difficulty: 3
  },
  {
    id: "np-fnp-q3",
    type: "question",
    question: "A 72-year-old patient scores 22/30 on the Montreal Cognitive Assessment (MoCA). The family reports progressive memory loss over 2 years with difficulty managing finances and getting lost while driving. What is the NP's assessment?",
    options: ["Normal age-related cognitive decline", "Mild cognitive impairment (MCI) progressing to probable Alzheimer disease; further evaluation needed", "Depression-related pseudodementia", "Delirium from acute infection"],
    correctIndex: 1,
    answer: "MoCA score <26 suggests cognitive impairment. Progressive decline in memory with impairment in instrumental ADLs (finances, driving) over 2 years suggests progression from MCI to early dementia, most commonly Alzheimer disease. The NP should: rule out reversible causes (TSH, B12, RPR, CBC, CMP, depression screening), obtain neuroimaging (MRI preferred), and refer to neurology/neuropsychology. Cholinesterase inhibitors (donepezil) are indicated for mild-moderate AD. Advance care planning should be initiated early while the patient retains decision-making capacity.",
    category: "Family NP",
    difficulty: 2
  },
  {
    id: "np-fnp-q4",
    type: "question",
    question: "An NP is managing a patient with newly diagnosed gout. After the acute flare resolves, the patient has had 3 flares in the past year and has tophi. When should urate-lowering therapy (ULT) be initiated?",
    options: ["Never; treat only acute flares", "ULT is indicated for ≥2 flares/year, tophi, urate nephropathy, or kidney stones; start allopurinol at low dose with prophylactic colchicine for 3-6 months", "Start ULT during the acute flare for fastest results", "ULT is only for patients with uric acid >12 mg/dL"],
    correctIndex: 1,
    answer: "ACR 2020 guidelines recommend ULT for: ≥2 flares/year, any tophus, radiographic damage from gout, or uric acid kidney stones. Allopurinol is first-line (start at 100 mg/day, titrate by 100 mg every 2-4 weeks to target uric acid <6 mg/dL). HLA-B*5801 testing is recommended before starting allopurinol in Southeast Asian and African American patients (risk of severe hypersensitivity/SJS/TEN). Colchicine 0.6 mg daily for prophylaxis during ULT initiation for 3-6 months to prevent mobilization flares. Febuxostat is second-line.",
    category: "Family NP",
    difficulty: 2
  },
  {
    id: "np-fnp-q5",
    type: "question",
    question: "A 16-year-old female presents with secondary amenorrhea for 4 months. She is a competitive gymnast with BMI 17. Pregnancy test is negative. What is the most likely diagnosis?",
    options: ["Polycystic ovary syndrome", "Functional hypothalamic amenorrhea from the female athlete triad", "Premature ovarian insufficiency", "Thyroid dysfunction"],
    correctIndex: 1,
    answer: "The female athlete triad consists of: (1) low energy availability (with or without disordered eating), (2) menstrual dysfunction (amenorrhea), and (3) low bone mineral density. In competitive athletes with restrictive eating and low BMI, hypothalamic suppression of GnRH leads to low FSH/LH, resulting in anovulation and amenorrhea. The NP should check FSH, LH, estradiol, prolactin, TSH, and consider DEXA scan. Treatment: increase caloric intake, reduce exercise intensity, and psychosocial support. Estrogen replacement may be needed for bone protection.",
    category: "Family NP",
    difficulty: 2
  },
  {
    id: "np-fnp-q6",
    type: "question",
    question: "An NP is managing a patient with chronic hepatitis C (genotype 1a, no cirrhosis, treatment-naive). What is the current standard of care treatment?",
    options: ["Pegylated interferon plus ribavirin for 48 weeks", "Direct-acting antiviral regimen (e.g., glecaprevir/pibrentasvir for 8 weeks or sofosbuvir/velpatasvir for 12 weeks) with >95% cure rate", "Liver transplant", "Observation with serial liver biopsies"],
    correctIndex: 1,
    answer: "DAAs have revolutionized HCV treatment. Pangenotypic regimens (effective against all genotypes) include glecaprevir/pibrentasvir (Mavyret, 8 weeks for treatment-naive without cirrhosis) and sofosbuvir/velpatasvir (Epclusa, 12 weeks). SVR (sustained virologic response = cure) rates exceed 95%. Before treatment: assess for cirrhosis (FIB-4, FibroScan), check HBV status (risk of HBV reactivation during HCV treatment), drug interactions, and renal function. Post-SVR: if no cirrhosis, no further HCV monitoring needed; if cirrhosis, continue HCC screening every 6 months.",
    category: "Family NP",
    difficulty: 2
  },
  // ============================================================
  // PSYCHIATRIC NP (14 cards)
  // ============================================================
  {
    id: "np-psych-q1",
    type: "question",
    question: "An NP is evaluating a patient for treatment-resistant depression (failed 2 adequate antidepressant trials). PHQ-9 is 22. Which augmentation strategy has the strongest evidence?",
    options: ["Add a second SSRI", "Lithium augmentation, aripiprazole augmentation, or esketamine (Spravato) nasal spray", "Switch to a benzodiazepine", "Add methylphenidate"],
    correctIndex: 1,
    answer: "For treatment-resistant depression (TRD), evidence-based augmentation strategies include: (1) Lithium augmentation (most evidence, target level 0.5-0.8 mEq/L), (2) Atypical antipsychotic augmentation (aripiprazole 2-5 mg, quetiapine XR, brexpiprazole all FDA-approved as adjuncts), (3) Esketamine (Spravato) intranasal spray (FDA-approved for TRD, administered in certified healthcare settings with 2-hour monitoring due to dissociative effects and hemodynamic changes). Other options: switching antidepressant class, ECT (most effective for severe TRD), or TMS.",
    category: "Psychiatric NP",
    difficulty: 3
  },
  {
    id: "np-psych-q2",
    type: "question",
    question: "A 22-year-old male presents with first-episode psychosis: auditory hallucinations for 3 months, social withdrawal, and declining academic performance. There is no substance use. What is the recommended first-line treatment approach?",
    options: ["High-dose typical antipsychotic (haloperidol 20 mg)", "Low-dose second-generation antipsychotic (risperidone 2-4 mg or aripiprazole 10-15 mg) with coordinated specialty care (CSC) program referral", "Benzodiazepines for anxiety management only", "No medication until a second psychotic episode occurs"],
    correctIndex: 1,
    answer: "For first-episode psychosis (FEP), guidelines recommend: (1) Low-dose second-generation antipsychotic (SGA) as FEP patients are more sensitive to side effects and respond to lower doses. Aripiprazole and risperidone have the most evidence for FEP. (2) Coordinated Specialty Care (CSC) programs (like NAVIGATE, OnTrackNY) providing team-based care with psychotherapy, family education, supported employment, and case management. Early intervention improves long-term outcomes. Duration of untreated psychosis (DUP) is the strongest predictor of outcome; shorter DUP = better prognosis.",
    category: "Psychiatric NP",
    difficulty: 3
  },
  {
    id: "np-psych-q3",
    type: "question",
    question: "A patient on olanzapine 20 mg for schizophrenia has developed metabolic syndrome (BMI 38, A1C 7.2%, TG 380, HDL 32). Psychiatric symptoms are well-controlled. What is the NP's approach?",
    options: ["Accept metabolic consequences as necessary for psychiatric stability", "Initiate a structured switch to a metabolically favorable antipsychotic (aripiprazole, ziprasidone, or lurasidone) with cross-taper protocol, while managing metabolic parameters", "Abruptly stop olanzapine and start metformin", "Add a second antipsychotic to reduce the olanzapine dose"],
    correctIndex: 1,
    answer: "Metabolic syndrome on olanzapine significantly increases cardiovascular mortality. If psychiatrically stable, a gradual cross-taper to a metabolically favorable SGA (aripiprazole: weight-neutral; ziprasidone: weight-neutral but requires ECG monitoring; lurasidone: favorable metabolic profile) is preferred. Cross-taper over 4-6 weeks to prevent relapse. If the patient cannot tolerate a switch, metformin addition has the strongest evidence for antipsychotic-related weight gain (10-18 lb reduction). Lifestyle intervention should accompany any approach. Monitor metabolic labs per ADA/APA consensus: fasting glucose, lipids, weight at each visit.",
    category: "Psychiatric NP",
    difficulty: 3
  },
  {
    id: "np-psych-q4",
    type: "question",
    question: "A patient with generalized anxiety disorder and comorbid alcohol use disorder asks about pharmacological treatment for anxiety. Which medication class should be AVOIDED?",
    options: ["SSRIs", "Buspirone", "Benzodiazepines", "SNRIs"],
    correctIndex: 2,
    answer: "Benzodiazepines are relatively CONTRAINDICATED in patients with substance use disorders due to: (1) cross-tolerance with alcohol (both enhance GABA), (2) high addiction potential, (3) risk of fatal respiratory depression when combined with alcohol, (4) reinforcement of substance-seeking behavior. First-line anxiolytics for GAD with comorbid AUD: SSRIs (sertraline, escitalopram) or buspirone (no abuse potential, no interaction with alcohol). Gabapentin may be considered for both anxiety and alcohol cravings. Naltrexone should be offered for AUD treatment.",
    category: "Psychiatric NP",
    difficulty: 2
  },
  {
    id: "np-psych-q5",
    type: "question",
    question: "An NP is initiating clozapine for a patient with treatment-resistant schizophrenia (failed 2 adequate antipsychotic trials). What mandatory monitoring program must be in place?",
    options: ["Monthly liver function tests", "Clozapine REMS program with ANC monitoring: weekly for 6 months, biweekly for months 6-12, then monthly thereafter", "Annual echocardiogram", "Daily blood pressure monitoring only"],
    correctIndex: 1,
    answer: "Clozapine requires enrollment in the Clozapine REMS program due to the risk of severe neutropenia/agranulocytosis (1-2%). ANC monitoring schedule: weekly for first 6 months, every 2 weeks for months 6-12, monthly after 1 year. ANC <1,500: hold clozapine (1,000 for benign ethnic neutropenia). Additional monitoring: metabolic parameters (highest weight gain risk), myocarditis (first month: troponin, CRP, echocardiogram if symptomatic), seizure risk (dose-dependent, >600 mg), constipation (can be fatal: ileus), and sialorrhea. Despite its monitoring burden, clozapine is the ONLY antipsychotic with demonstrated superiority in treatment-resistant schizophrenia and is the ONLY one shown to reduce suicide risk.",
    category: "Psychiatric NP",
    difficulty: 3
  },
  {
    id: "np-psych-q6",
    type: "question",
    question: "A patient on sertraline 200 mg for depression is prescribed tramadol for pain by another provider. The NP notices this combination on medication reconciliation. What is the concern?",
    options: ["No significant interaction exists", "Risk of serotonin syndrome from combined serotonergic activity; tramadol inhibits serotonin reuptake and this combination should be avoided", "Tramadol reduces the effectiveness of sertraline", "Sertraline causes tramadol to be ineffective"],
    correctIndex: 1,
    answer: "Tramadol has serotonin reuptake inhibition properties in addition to its opioid and norepinephrine effects. Combining tramadol with SSRIs (or SNRIs, MAOIs, triptans, St. John's wort) significantly increases the risk of serotonin syndrome: hyperthermia, agitation, clonus, hyperreflexia, diaphoresis, and potentially life-threatening autonomic instability. The NP should contact the prescribing provider, document the interaction, and recommend alternative analgesics (acetaminophen, NSAIDs, or non-serotonergic opioids if necessary).",
    category: "Psychiatric NP",
    difficulty: 2
  },
  {
    id: "np-psych-q7",
    type: "question",
    question: "An NP is evaluating a 17-year-old with suspected bipolar disorder. The patient has episodes of elevated mood lasting 5 days with decreased need for sleep, grandiosity, racing thoughts, and risky behavior alternating with depressive episodes. What distinguishes bipolar I from bipolar II?",
    options: ["Bipolar I has only depression; bipolar II has only mania", "Bipolar I requires at least one manic episode (≥7 days or requiring hospitalization); bipolar II has hypomanic episodes (≥4 days) that do not cause marked impairment", "Bipolar I is less severe than bipolar II", "Bipolar I only occurs in adults"],
    correctIndex: 1,
    answer: "Bipolar I: requires ≥1 manic episode (≥7 days of elevated/irritable mood with ≥3 classic symptoms, OR any duration if hospitalization is required). Depressive episodes are common but not required for diagnosis. Bipolar II: requires ≥1 hypomanic episode (≥4 days, same symptoms but NOT causing marked functional impairment or psychosis, NOT requiring hospitalization) AND ≥1 major depressive episode. This patient's 5-day episode with significant functional impact likely meets criteria for a manic episode (bipolar I). First-line mood stabilizers: lithium, valproate, or SGA monotherapy. Antidepressant monotherapy is contraindicated.",
    category: "Psychiatric NP",
    difficulty: 2
  },
  // ============================================================
  // WOMEN'S HEALTH (10 cards)
  // ============================================================
  {
    id: "np-wh-q1",
    type: "question",
    question: "A 32-year-old G2P1 at 10 weeks gestation presents for her first prenatal visit. Which screening tests are recommended at this visit?",
    options: ["Amniocentesis for all patients", "CBC, blood type/Rh/antibody screen, rubella titer, RPR, HIV, hepatitis B, urinalysis/culture, Pap if due, and offer first-trimester aneuploidy screening", "Only a urine pregnancy test", "Glucose tolerance test and Group B strep culture"],
    correctIndex: 1,
    answer: "First prenatal visit labs per ACOG guidelines: CBC (anemia, thrombocytopenia), blood type/Rh/antibody screen (Rh sensitization risk), rubella titer (immunity status), RPR/VDRL (syphilis), HIV (opt-out screening), hepatitis B surface antigen, urinalysis and urine culture (asymptomatic bacteriuria), Pap smear if due per screening guidelines. Offer first-trimester combined screening (nuchal translucency + serum markers) or cell-free DNA for aneuploidy at 10-13 weeks. GDM screening is at 24-28 weeks; GBS culture at 36-37 weeks.",
    category: "Women's Health",
    difficulty: 2
  },
  {
    id: "np-wh-q2",
    type: "question",
    question: "A 28-year-old woman is diagnosed with a chlamydia cervicitis infection. She reports her male partner is asymptomatic. What is the recommended treatment for BOTH the patient and partner?",
    options: ["Patient: azithromycin 1g single dose; partner does not need treatment", "Patient: doxycycline 100 mg BID for 7 days (preferred); partner: expedited partner therapy (EPT) with same regimen or azithromycin 1g single dose", "Patient: ciprofloxacin 500 mg single dose; partner: observation", "Patient: metronidazole; partner: fluconazole"],
    correctIndex: 1,
    answer: "CDC 2021 STI guidelines now recommend doxycycline 100 mg BID for 7 days as preferred treatment for chlamydia (superior efficacy over single-dose azithromycin). Alternative: azithromycin 1g single dose. ALL sexual partners within the past 60 days must be treated. Expedited partner therapy (EPT) — providing prescriptions or medications for the partner through the patient without examining the partner — is legal in most states and improves partner treatment rates. Test of cure is recommended in pregnant patients at 4 weeks. Retest the patient at 3 months for reinfection.",
    category: "Women's Health",
    difficulty: 2
  },
  {
    id: "np-wh-q3",
    type: "question",
    question: "A 55-year-old postmenopausal woman has a Pap smear showing ASC-US with positive high-risk HPV (hrHPV type 16). What is the recommended management per ASCCP guidelines?",
    options: ["Repeat Pap in 1 year", "Colposcopy with biopsy", "Immediate LEEP procedure", "HPV vaccination"],
    correctIndex: 1,
    answer: "ASC-US with positive hrHPV (especially HPV 16 or 18) warrants colposcopy per ASCCP 2019 risk-based management guidelines. HPV 16 is the highest-risk genotype, responsible for approximately 60% of cervical cancers. Colposcopy with directed biopsies evaluates for cervical intraepithelial neoplasia (CIN). If CIN 2-3 is found, excisional treatment (LEEP or cold knife conization) is recommended. If colposcopy is normal with HPV 16, repeat cotesting in 1 year due to persistent high risk. HPV vaccination is not therapeutic for existing infections.",
    category: "Women's Health",
    difficulty: 2
  },
  {
    id: "np-wh-q4",
    type: "question",
    question: "A 40-year-old woman with a history of migraines with aura wants to start combined oral contraceptive pills (COCs). What is the NP's recommendation?",
    options: ["COCs are safe for all women regardless of migraine history", "COCs are contraindicated in migraine with aura due to significantly increased stroke risk; offer progestin-only methods, IUD, or implant", "COCs are only contraindicated if she has migraines daily", "Prescribe COCs with the lowest estrogen dose"],
    correctIndex: 1,
    answer: "Migraine WITH aura is a WHO Category 4 (absolute contraindication) for combined hormonal contraceptives (pills, patch, ring). Estrogen increases stroke risk 2-4 fold in migraine with aura patients through prothrombotic effects. The NP should offer progestin-only methods: progestin-only pill (norethindrone), Depo-Provera, etonogestrel implant (Nexplanon), or hormonal IUD (Mirena). Copper IUD is also an option. Migraine WITHOUT aura is Category 2 (generally use) in women <35 years, and Category 3 (usually avoid) in women ≥35.",
    category: "Women's Health",
    difficulty: 2
  },
  {
    id: "np-wh-q5",
    type: "question",
    question: "An NP is evaluating a 26-year-old woman with heavy menstrual bleeding (menorrhagia). CBC shows Hgb 9.8 g/dL, MCV 72. What is the most appropriate initial diagnostic workup?",
    options: ["No workup needed; prescribe oral contraceptives", "Pregnancy test, TSH, CBC with iron studies, coagulation studies (if adolescent or family history), and pelvic ultrasound", "CT scan of the abdomen and pelvis", "Immediate referral for hysterectomy"],
    correctIndex: 1,
    answer: "Heavy menstrual bleeding (HMB) evaluation per ACOG: (1) pregnancy test (always), (2) CBC and iron studies (confirms iron deficiency anemia), (3) TSH (hypothyroidism causes HMB), (4) coagulation studies in adolescents or family history of bleeding disorders (von Willebrand disease affects up to 13% of women with HMB), (5) pelvic ultrasound to evaluate for structural causes (fibroids, polyps, adenomyosis). PALM-COEIN classification system categorizes causes. Treatment depends on etiology: hormonal therapy (COCs, LNG-IUD most effective), tranexamic acid, or surgical intervention for structural causes.",
    category: "Women's Health",
    difficulty: 2
  },
  // ============================================================
  // GERIATRIC NP (10 cards)
  // ============================================================
  {
    id: "np-geri-q1",
    type: "question",
    question: "An NP is reviewing medications for an 82-year-old patient who has been prescribed diphenhydramine for insomnia, oxybutynin for urinary urgency, and amitriptyline for neuropathic pain. What is the primary concern?",
    options: ["No concerns; all medications are appropriate for elderly patients", "High anticholinergic burden increasing risk of cognitive impairment, falls, delirium, and urinary retention per Beers Criteria", "Drug interactions causing hepatotoxicity", "Risk of serotonin syndrome"],
    correctIndex: 1,
    answer: "All three medications have significant anticholinergic properties and are listed on the AGS Beers Criteria as potentially inappropriate for older adults. Cumulative anticholinergic burden increases risk of: cognitive impairment and delirium, falls and fractures, constipation, urinary retention, blurred vision, dry mouth, and tachycardia. The NP should deprescribe: replace diphenhydramine with melatonin or sleep hygiene, switch oxybutynin to mirabegron (beta-3 agonist, no anticholinergic effects), and replace amitriptyline with gabapentin or duloxetine.",
    category: "Geriatric NP",
    difficulty: 2
  },
  {
    id: "np-geri-q2",
    type: "question",
    question: "An NP is evaluating an 85-year-old patient with hypertension. The patient's current BP is 148/78 on amlodipine 5 mg. Per current guidelines, what is the appropriate BP target for this patient?",
    options: ["<120/80 for all patients regardless of age", "<130/80 per ACC/AHA 2017 guidelines, but individualize based on frailty, fall risk, and comorbidities", "<160/90 per JNC 8 relaxed goals for those over 80", "No treatment is needed above age 80"],
    correctIndex: 1,
    answer: "BP management in the very elderly requires individualization. ACC/AHA 2017 guidelines recommend <130/80 for most adults, but clinical judgment is essential for frail elderly patients. Consider: fall risk (orthostatic hypotension from aggressive BP control causes falls), cognitive function (hypotension may worsen cognitive impairment), functional status, and life expectancy. SPRINT trial showed benefit of intensive control in those ≥75, BUT excluded nursing home residents and those with dementia. The NP should assess orthostatic BP, review fall history, and adjust targets accordingly.",
    category: "Geriatric NP",
    difficulty: 2
  },
  {
    id: "np-geri-q3",
    type: "question",
    question: "An 80-year-old patient with moderate Alzheimer disease is agitated and aggressive toward caregivers. The family requests medication. What is the NP's evidence-based approach?",
    options: ["Prescribe haloperidol 5 mg IM for immediate sedation", "First identify and treat underlying causes (pain, UTI, constipation, environmental triggers); if medication is needed after non-pharmacological interventions fail, use the lowest effective dose of an SGA with informed consent about risks (boxed warning)", "Prescribe benzodiazepines for long-term use", "Physical restraints are first-line"],
    correctIndex: 1,
    answer: "DICE approach (Describe, Investigate, Create, Evaluate): first identify treatable triggers for behavioral and psychological symptoms of dementia (BPSD): unrecognized pain (use PAINAD scale), UTI, constipation, medication side effects, environmental overstimulation. Non-pharmacological interventions are first-line: music therapy, redirection, structured activities, caregiver education. If medication is necessary, SGAs (risperidone, aripiprazole) at the lowest effective dose may be used with informed consent: ALL antipsychotics carry an FDA boxed warning for increased mortality in elderly with dementia-related psychosis. Regular reassessment and deprescribing attempts are mandatory.",
    category: "Geriatric NP",
    difficulty: 3
  },
  {
    id: "np-geri-q4",
    type: "question",
    question: "An NP is conducting a comprehensive geriatric assessment for a 78-year-old patient. Which domains must be evaluated?",
    options: ["Blood pressure and heart rate only", "Functional status (ADLs/IADLs), cognition (Mini-Cog/MoCA), mood (GDS/PHQ-9), gait and fall risk (Timed Up and Go), nutrition (MNA), medication review (Beers Criteria), social support, and advance directives", "Only cognition and mobility", "Vision and hearing screening alone"],
    correctIndex: 1,
    answer: "The comprehensive geriatric assessment (CGA) is a multidimensional, interdisciplinary process that evaluates: functional status (Katz ADL index for basic ADLs, Lawton IADL scale for instrumental ADLs), cognitive function (Mini-Cog screening, MoCA for more detailed assessment), mood/depression (Geriatric Depression Scale or PHQ-9), gait/balance/fall risk (Timed Up and Go, Tinetti), nutritional status (Mini Nutritional Assessment, weight trend), medication review (Beers Criteria, deprescribing), vision and hearing, continence, social support/safety, caregiver burden, and advance care planning. CGA has been shown to improve outcomes in hospitalized and community-dwelling elderly.",
    category: "Geriatric NP",
    difficulty: 2
  },
  {
    id: "np-geri-q5",
    type: "question",
    question: "An NP is managing an 88-year-old patient with a new diagnosis of atrial fibrillation. CHA₂DS₂-VASc score is 5. The patient has a history of falls. Should anticoagulation be initiated?",
    options: ["No, falls are an absolute contraindication to anticoagulation", "Yes, anticoagulate with a DOAC; the stroke risk from untreated AFib far exceeds the bleeding risk from falls in most patients", "Use aspirin instead of anticoagulation", "Defer to cardiology only"],
    correctIndex: 1,
    answer: "Fall risk alone is NOT a contraindication to anticoagulation in AFib. Studies show a patient would need to fall approximately 295 times per year for the bleeding risk to outweigh the stroke prevention benefit. With a CHA₂DS₂-VASc of 5, the annual stroke risk is approximately 6.7%. DOACs (apixaban preferred in elderly due to better safety profile in renal impairment and elderly) are preferred over warfarin. Assess and mitigate fall risk (physical therapy, medication review, home safety). HAS-BLED score helps identify modifiable bleeding risk factors.",
    category: "Geriatric NP",
    difficulty: 3
  },
  // ============================================================
  // RESEARCH & EBP (8 cards)
  // ============================================================
  {
    id: "np-ebp-q1",
    type: "question",
    question: "An NP is critically appraising a randomized controlled trial (RCT). The study reports that Drug A reduces mortality by 1% (from 2% to 1%) compared to placebo. The NNT is 100. What does this mean clinically?",
    options: ["Drug A is extremely effective and should be prescribed to all patients", "100 patients would need to be treated with Drug A for 1 additional patient to benefit (avoid death) compared to placebo", "The relative risk reduction is only 1%", "The NNT indicates the drug is harmful"],
    correctIndex: 1,
    answer: "NNT (Number Needed to Treat) is calculated as 1/ARR (Absolute Risk Reduction). ARR = 2% - 1% = 1% = 0.01. NNT = 1/0.01 = 100. This means 100 patients must be treated for 1 additional patient to benefit. While the RELATIVE risk reduction is 50% (impressive sounding), the ABSOLUTE risk reduction is only 1% (more clinically meaningful). The NP must consider NNT alongside cost, side effects, patient preferences, and NNH (Number Needed to Harm) to make shared clinical decisions.",
    category: "Research & EBP",
    difficulty: 2
  },
  {
    id: "np-ebp-q2",
    type: "question",
    question: "An NP is searching for the best evidence to answer a clinical question about treatment effectiveness. Which level of evidence is highest on the evidence hierarchy?",
    options: ["Expert opinion", "Single randomized controlled trial", "Systematic review and meta-analysis of RCTs", "Cohort study"],
    correctIndex: 2,
    answer: "The evidence hierarchy (strongest to weakest): (1) Systematic reviews and meta-analyses of RCTs (synthesize all available high-quality evidence), (2) Individual RCTs, (3) Cohort studies, (4) Case-control studies, (5) Case series/reports, (6) Expert opinion/editorials. Meta-analyses combine data from multiple RCTs using statistical methods, increasing sample size and statistical power. The NP should use the PICO framework (Population, Intervention, Comparison, Outcome) to formulate searchable clinical questions and seek the highest available level of evidence.",
    category: "Research & EBP",
    difficulty: 1
  },
  {
    id: "np-ebp-q3",
    type: "question",
    question: "An NP reads a study reporting a screening test has a sensitivity of 95% and specificity of 70%. When the prevalence of the disease is low (1%), what happens to the positive predictive value (PPV)?",
    options: ["PPV remains high at 95%", "PPV is very low because most positive results will be false positives in a low-prevalence population", "PPV is not affected by prevalence", "Specificity determines PPV, not prevalence"],
    correctIndex: 1,
    answer: "PPV is heavily influenced by disease prevalence. With 95% sensitivity and 70% specificity in a population with 1% prevalence: among 10,000 people, 100 have the disease (1%). The test correctly identifies 95 true positives. Among 9,900 without disease, 30% (2,970) are false positives. PPV = 95/(95+2,970) = 3.1%. This means 97% of positive results are FALSE positives. This is why screening tests work best in higher-prevalence populations and why confirmatory testing is essential after positive screening results.",
    category: "Research & EBP",
    difficulty: 3
  },
  {
    id: "np-ebp-q4",
    type: "question",
    question: "An NP is implementing an evidence-based practice change in a clinic using the Iowa Model. What is the first step?",
    options: ["Implement the change immediately", "Identify a triggering issue or opportunity (clinical problem or new evidence), then determine if it is a priority for the organization", "Write a research grant proposal", "Publish findings in a journal"],
    correctIndex: 1,
    answer: "The Iowa Model of EBP: (1) Identify triggering issues (clinical problem, new evidence, quality data), (2) Determine organizational priority, (3) Form a team, (4) Assemble and critically appraise relevant evidence, (5) Determine if sufficient evidence exists for change, (6) Design a pilot implementation, (7) Evaluate outcomes, (8) If successful, implement system-wide and disseminate. Other EBP models include the Johns Hopkins Nursing EBP Model (PET process: Practice question, Evidence, Translation), the Stetler Model, and the ACE Star Model.",
    category: "Research & EBP",
    difficulty: 2
  },
  // ============================================================
  // HEALTH POLICY (6 cards)
  // ============================================================
  {
    id: "np-policy-q1",
    type: "question",
    question: "An NP practicing in a full practice authority (FPA) state wants to open an independent primary care clinic. What does full practice authority mean?",
    options: ["The NP must have a collaborative agreement with a physician at all times", "The NP can evaluate, diagnose, interpret diagnostic tests, and initiate and manage treatments including prescribing controlled substances independently without physician oversight", "The NP can only prescribe non-controlled medications", "Full practice authority only applies to hospital settings"],
    correctIndex: 1,
    answer: "Full practice authority (FPA) means NPs can practice to the full extent of their education and training without mandatory physician collaboration or supervision requirements. FPA states allow NPs to: independently evaluate and diagnose, order and interpret diagnostics, initiate and manage treatment plans, prescribe medications including controlled substances (DEA required), and practice independently. As of 2024, 27 states plus DC and two territories have FPA. The AANP and other organizations continue to advocate for FPA nationally to improve access to care, particularly in underserved areas.",
    category: "Health Policy",
    difficulty: 1
  },
  {
    id: "np-policy-q2",
    type: "question",
    question: "An NP is prescribing buprenorphine for opioid use disorder. Under the 2023 federal changes, what is the current prescribing requirement?",
    options: ["NPs still need an X-waiver and are limited to 30 patients", "The X-waiver requirement was eliminated in 2023; any DEA-registered practitioner with a schedule III authority can prescribe buprenorphine for OUD without additional certification", "Only physicians can prescribe buprenorphine", "Buprenorphine requires a special state license separate from DEA registration"],
    correctIndex: 1,
    answer: "The Consolidated Appropriations Act of 2023 eliminated the X-waiver requirement for prescribing buprenorphine. Any practitioner with a valid DEA registration and schedule III prescribing authority can now prescribe buprenorphine for OUD without additional training, certification, or patient limits. However, DEA-registered practitioners must complete 8 hours of training on treating substance use disorders as part of their next DEA registration renewal. This change dramatically expands access to medication-assisted treatment (MAT) for opioid use disorder.",
    category: "Health Policy",
    difficulty: 2
  },
  {
    id: "np-policy-q3",
    type: "question",
    question: "An NP is seeing a 20-year-old patient who discloses suicidal ideation. The patient asks the NP not to tell anyone. What are the NP's legal and ethical obligations?",
    options: ["Respect the patient's wishes and maintain confidentiality", "Duty to protect: the NP must take reasonable steps to protect the patient from self-harm, which may include involuntary commitment, contacting emergency services, or notifying appropriate parties despite the patient's wishes", "Only break confidentiality if the patient is under 18", "Refer to psychiatry and take no further action"],
    correctIndex: 1,
    answer: "When a patient expresses suicidal ideation, the NP has a duty to protect that overrides confidentiality. This originates from Tarasoff v. Regents (1976, duty to warn/protect) and state-specific involuntary commitment statutes. The NP should: conduct a thorough suicide risk assessment (ideation, plan, means, intent, protective factors), use validated tools (Columbia Suicide Severity Rating Scale), implement safety measures (lethal means restriction), and if imminent risk exists, initiate emergency psychiatric evaluation or involuntary hold as permitted by state law. Document the assessment and clinical decision-making thoroughly.",
    category: "Health Policy",
    difficulty: 2
  },
];
