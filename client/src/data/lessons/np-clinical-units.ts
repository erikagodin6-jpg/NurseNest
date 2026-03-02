import type { LessonContent } from "./types";

export const npClinicalUnitLessons: Record<string, LessonContent> = {
  "mens-health-ed-np": {
    "title": "Erectile Dysfunction",
    "cellular": {
      "title": "Vascular and Neurogenic ED Pathophysiology",
      "content": "Erectile dysfunction (ED) results from failure of the penile vascular and neurological mechanisms required for erection. Normal erection requires parasympathetic nerve stimulation releasing nitric oxide (NO) from cavernous nerve terminals and endothelial cells. NO activates guanylate cyclase, increasing cyclic GMP (cGMP) in corporal smooth muscle, causing relaxation and allowing blood to fill the sinusoidal spaces of the corpora cavernosa. Phosphodiesterase-5 (PDE5) degrades cGMP, terminating the erection. ED may be vasculogenic (atherosclerosis, diabetes, hypertension affecting penile blood flow), neurogenic (diabetic neuropathy, spinal cord injury, radical prostatectomy), hormonal (hypogonadism, hyperprolactinemia), psychogenic, or medication-induced (antihypertensives, SSRIs, antiandrogens). ED is an independent cardiovascular risk marker - men with ED have a 2-fold increased risk of MI and stroke within 5 years."
    },
    "riskFactors": [
      "Diabetes mellitus (35-75% of diabetic men develop ED)",
      "Cardiovascular disease and atherosclerosis",
      "Hypertension and antihypertensive medications (especially beta-blockers, thiazides)",
      "Tobacco smoking (dose-dependent risk)",
      "Obesity (BMI > 30 kg/m2)",
      "SSRI or SNRI antidepressant use",
      "Radical prostatectomy or pelvic radiation"
    ],
    "diagnostics": [
      "Validated questionnaire: International Index of Erectile Function (IIEF-5/SHIM)",
      "Fasting glucose and HbA1c to screen for diabetes",
      "Lipid panel and cardiovascular risk assessment",
      "Morning total testosterone (draw between 0700-1000)",
      "TSH and prolactin if testosterone low",
      "Consider nocturnal penile tumescence if psychogenic vs organic etiology uncertain",
      "Penile duplex Doppler ultrasound if vascular etiology suspected"
    ],
    "management": [
      "Address modifiable risk factors: smoking cessation, weight loss, exercise, optimize glucose and BP",
      "First-line: PDE5 inhibitor (sildenafil, tadalafil) after cardiovascular risk assessment",
      "Prescribe tadalafil 5mg daily for concurrent ED + BPH/LUTS",
      "If PDE5i contraindicated or ineffective: intracavernosal injection (alprostadil)",
      "Testosterone replacement only if confirmed hypogonadism (total T < 8 nmol/L on two AM samples)",
      "Screen for depression and psychogenic factors",
      "Refer to urology for penile prosthesis consideration if all pharmacotherapy fails"
    ],
    "signs": {
      "left": [
        "Occasional difficulty maintaining erection, responds to PDE5i",
        "Morning erections preserved (suggests psychogenic component)",
        "Mild cardiovascular risk factors",
        "Normal testosterone and prolactin levels"
      ],
      "right": [
        "Complete inability to achieve erection despite PDE5i trial",
        "Absent nocturnal/morning erections (organic etiology)",
        "ED as initial presentation of occult cardiovascular disease",
        "Peyronie disease with significant penile curvature"
      ]
    },
    "medications": [
      {
        "name": "Sildenafil (Viagra)",
        "type": "PDE5 Inhibitor",
        "action": "Selectively inhibits PDE5 in corporal smooth muscle preventing cGMP degradation, enhancing NO-mediated vasodilation and erection in response to sexual stimulation",
        "sideEffects": "Headache, flushing, dyspepsia, nasal congestion, visual disturbances (blue tinge), priapism (rare)",
        "contra": "Concurrent nitrate therapy (severe hypotension), recent MI or stroke (< 6 months), severe hepatic impairment, alpha-blockers (orthostatic hypotension risk)",
        "pearl": "Take 30-60 min before sexual activity on empty stomach. Not effective without sexual stimulation. Start 50mg, adjust 25-100mg. Avoid high-fat meals which delay absorption. ED is a vascular red flag - assess cardiovascular risk."
      },
      {
        "name": "Tadalafil (Cialis)",
        "type": "PDE5 Inhibitor (Long-Acting)",
        "action": "Same mechanism as sildenafil but with 36-hour duration allowing spontaneous sexual activity; also relaxes prostatic and bladder neck smooth muscle (treats LUTS/BPH)",
        "sideEffects": "Headache, back pain, myalgia, dyspepsia, nasal congestion",
        "contra": "Concurrent nitrates (absolute), concurrent alpha-blockers (relative - doxazosin contraindicated), severe renal or hepatic impairment",
        "pearl": "5mg daily for combined ED+BPH. PRN: 10-20mg, effective for up to 36 hours. Longer half-life allows flexible timing. FDA-approved for BPH/LUTS at 5mg daily dose."
      }
    ],
    "pearls": [
      "ED in men aged 40-60 is an independent cardiovascular risk marker with predictive value comparable to smoking - the NP must screen for CVD risk factors and consider cardiology referral, not just treat the ED",
      "PDE5 inhibitors are absolutely contraindicated with nitrate therapy - there must be a 24-hour washout for sildenafil/vardenafil and 48-hour washout for tadalafil before nitrate administration",
      "Morning testosterone must be drawn between 0700-1000 and confirmed with a second sample before diagnosing hypogonadism - single low values may be due to acute illness, sleep deprivation, or diurnal variation"
    ],
    "quiz": [
      {
        "question": "A 52-year-old with type 2 diabetes and hypertension reports progressive ED over 18 months. He takes metformin, ramipril, and atorvastatin. Morning erections are absent. What should the NP order first?",
        "options": [
          "Penile duplex Doppler ultrasound",
          "Fasting glucose, lipid panel, and morning total testosterone",
          "Nocturnal penile tumescence study",
          "Immediate urology referral for prosthesis"
        ],
        "correct": 1,
        "rationale": "ED evaluation requires metabolic and hormonal assessment before invasive testing. Fasting glucose evaluates diabetic control, lipid panel assesses cardiovascular risk, and morning testosterone screens for hypogonadism. Absent morning erections suggest organic (not psychogenic) etiology. This systematic approach guides appropriate treatment selection."
      }
    ]
  },
  "mens-health-bph-np": {
    "title": "Benign Prostatic Hyperplasia",
    "cellular": {
      "title": "Prostatic Growth and Urodynamic Obstruction",
      "content": "BPH involves hyperplasia of stromal and glandular elements in the periurethral transition zone of the prostate. Testosterone is converted to dihydrotestosterone (DHT) by 5-alpha-reductase within prostatic tissue. DHT binds androgen receptors with 5-fold greater affinity than testosterone, driving prostatic cell proliferation and gland enlargement. The enlarged prostate compresses the prostatic urethra causing bladder outlet obstruction (BOO). BOO produces both obstructive (hesitancy, weak stream, incomplete emptying, post-void dribbling) and irritative/storage symptoms (frequency, urgency, nocturia) collectively termed lower urinary tract symptoms (LUTS). Chronic BOO leads to detrusor hypertrophy, trabeculation, and eventually decompensation with overflow incontinence and urinary retention. The International Prostate Symptom Score (IPSS) quantifies severity: mild (0-7), moderate (8-19), severe (20-35)."
    },
    "riskFactors": [
      "Age > 50 years (prevalence increases with age: 50% at 60, 90% at 85)",
      "Family history of BPH or prostate cancer",
      "Obesity and metabolic syndrome",
      "Diabetes mellitus (associated with increased prostate volume)",
      "Sedentary lifestyle",
      "High-fat dietary pattern",
      "Testosterone replacement therapy (may worsen BPH/LUTS)"
    ],
    "diagnostics": [
      "IPSS questionnaire for symptom severity classification",
      "Digital rectal examination (DRE) for prostate size and consistency",
      "Serum PSA (to rule out prostate cancer, not for BPH diagnosis per se)",
      "Urinalysis to exclude UTI and hematuria",
      "Post-void residual (PVR) by ultrasound (> 200 mL significant)",
      "Serum creatinine if obstructive uropathy suspected",
      "Uroflowmetry if surgical intervention considered"
    ],
    "management": [
      "Watchful waiting for mild LUTS (IPSS 0-7) with annual reassessment",
      "Alpha-1 blocker (tamsulosin 0.4mg daily) for moderate-severe LUTS - rapid symptom relief",
      "5-alpha reductase inhibitor (finasteride 5mg or dutasteride 0.5mg) for prostate > 40g or PSA > 1.4",
      "Combination alpha-blocker + 5-ARI for large prostate with moderate-severe LUTS (MTOPS trial)",
      "Tadalafil 5mg daily for combined BPH/LUTS + ED",
      "Refer to urology if medical therapy fails, recurrent UTI, retention, or hematuria",
      "Advise fluid restriction before bedtime, caffeine/alcohol reduction for nocturia"
    ],
    "signs": {
      "left": [
        "Mild LUTS (IPSS 0-7) not affecting quality of life",
        "Prostate mildly enlarged, smooth, non-tender on DRE",
        "PVR < 100 mL",
        "Normal PSA for age"
      ],
      "right": [
        "Acute urinary retention requiring catheterization",
        "Recurrent urinary tract infections",
        "Renal insufficiency from obstructive uropathy",
        "Gross hematuria requiring investigation"
      ]
    },
    "medications": [
      {
        "name": "Tamsulosin (Flomax)",
        "type": "Alpha-1A Adrenergic Blocker",
        "action": "Selectively blocks alpha-1A receptors in prostatic smooth muscle and bladder neck, reducing urethral resistance without significant vascular alpha-1B blockade",
        "sideEffects": "Orthostatic hypotension (less than non-selective), retrograde ejaculation (10-30%), dizziness, nasal congestion, intraoperative floppy iris syndrome",
        "contra": "Concurrent PDE5 inhibitor use (relative - start at lowest dose), planned cataract surgery (inform ophthalmologist)",
        "pearl": "Take 30 minutes after same meal daily. Onset of effect within days. Retrograde ejaculation is harmless but counsel patients. Alert ophthalmologist before cataract surgery due to floppy iris syndrome."
      },
      {
        "name": "Finasteride (Proscar)",
        "type": "5-Alpha Reductase Inhibitor (Type II)",
        "action": "Blocks conversion of testosterone to DHT in prostate, reducing prostate volume by 20-30% over 6-12 months and decreasing risk of urinary retention and BPH surgery",
        "sideEffects": "Sexual dysfunction (ED, decreased libido, ejaculation disorders), gynecomastia, depression (rare), reduced PSA by approximately 50% (adjust interpretation)",
        "contra": "Pregnancy exposure (teratogenic - women of childbearing age must not handle crushed tablets), pediatric use",
        "pearl": "Takes 6-12 months for full effect. Reduces prostate volume 20-30%. Halves PSA level - must double measured PSA for cancer screening interpretation. PCPT trial showed 25% reduction in prostate cancer risk but potential increase in high-grade cancer detection."
      }
    ],
    "pearls": [
      "IPSS is essential for documenting BPH symptom severity and treatment response - a score decrease of >= 3 points indicates clinically meaningful improvement and should be documented at each follow-up",
      "Finasteride reduces PSA by approximately 50% - the NP must double the measured PSA value for cancer screening interpretation in patients on 5-ARI therapy, or an unexpected PSA rise while on finasteride warrants further investigation",
      "Alpha-blockers provide rapid symptom relief (days to weeks) while 5-ARIs take 6-12 months to reduce prostate size - combination therapy (MTOPS trial) reduces progression risk by 66% compared to either agent alone"
    ],
    "quiz": [
      {
        "question": "A 65-year-old presents with nocturia x4, weak stream, and IPSS 22. DRE shows a 55g smooth prostate. PSA 3.2 ng/mL. PVR 120 mL. What is the most appropriate initial therapy?",
        "options": [
          "Watchful waiting with annual reassessment",
          "Tamsulosin 0.4mg daily alone",
          "Tamsulosin 0.4mg + finasteride 5mg daily (combination therapy)",
          "Immediate urology referral for TURP"
        ],
        "correct": 2,
        "rationale": "Severe LUTS (IPSS 22) with large prostate (> 40g) and elevated PSA (> 1.4) favours combination alpha-blocker + 5-ARI therapy per the MTOPS trial, which showed 66% reduction in clinical progression compared to monotherapy. PVR 120 mL is not critically elevated but supports medical therapy initiation."
      }
    ]
  },
  "womens-health-menopause-np": {
    "title": "Menopause and Hormone Therapy",
    "cellular": {
      "title": "Ovarian Senescence and Estrogen Decline",
      "content": "Menopause is defined as 12 consecutive months of amenorrhea due to permanent cessation of ovarian follicular activity, occurring at a median age of 51 years. The perimenopause (menopausal transition) begins 4-8 years before final menstrual period with fluctuating estradiol levels and irregular cycles. Declining ovarian follicle reserve leads to decreased inhibin B production, releasing FSH from negative feedback inhibition. Rising FSH levels are characteristic of perimenopause (FSH > 25 IU/L on day 2-3 of cycle). Complete follicular depletion results in sustained estradiol levels < 73 pmol/L and FSH > 40 IU/L. Estrogen deficiency produces vasomotor symptoms (hot flashes, night sweats) through thermoregulatory dysfunction in the hypothalamus, genitourinary syndrome of menopause (GSM: vaginal atrophy, dyspareunia, urinary symptoms), and accelerated bone loss (2-3% annually in the first 5-7 years post-menopause). Menopausal hormone therapy (MHT) remains the most effective treatment for vasomotor symptoms."
    },
    "riskFactors": [
      "Premature menopause (< 40 years) or early menopause (40-45 years)",
      "Surgical menopause (bilateral oophorectomy)",
      "Smoking (associated with earlier menopause by 1-2 years)",
      "Family history of early menopause",
      "Chemotherapy or pelvic radiation",
      "Autoimmune conditions (primary ovarian insufficiency)",
      "Low BMI and excessive exercise"
    ],
    "diagnostics": [
      "Clinical diagnosis in women >= 45 with 12 months amenorrhea (no labs needed)",
      "FSH level only indicated in women < 45 years or after hysterectomy",
      "Estradiol level if premature ovarian insufficiency suspected (< 73 pmol/L)",
      "TSH to rule out thyroid disease (symptoms overlap)",
      "Bone densitometry (DXA) at menopause or age 65",
      "Lipid panel and fasting glucose (cardiovascular risk increases post-menopause)"
    ],
    "management": [
      "First-line for moderate-severe VMS: systemic MHT (estrogen + progesterone if uterus intact)",
      "Transdermal estradiol 50-100 mcg/day preferred (lower VTE risk than oral)",
      "Add micronized progesterone 200mg x 12 days/month or continuous 100mg daily for endometrial protection",
      "For GSM alone: topical vaginal estrogen (estradiol cream or ring) without systemic progesterone",
      "Non-hormonal alternatives: venlafaxine 75mg, paroxetine 7.5mg, gabapentin, fezolinetant (NK3 antagonist)",
      "Initiate MHT within 10 years of menopause or before age 60 (timing hypothesis)",
      "Contraindications to MHT: breast cancer, VTE history, active liver disease, unexplained vaginal bleeding"
    ],
    "signs": {
      "left": [
        "Mild vasomotor symptoms manageable with lifestyle modifications",
        "Irregular cycles in perimenopause with no alarming bleeding patterns",
        "Mild GSM symptoms responsive to vaginal moisturizers",
        "Stable bone density on DXA"
      ],
      "right": [
        "Severe vasomotor symptoms: > 7 hot flashes/day disrupting sleep and function",
        "Severe GSM with recurrent UTIs and significant dyspareunia",
        "Rapid bone loss or fragility fracture",
        "Depression and cognitive complaints significantly impacting quality of life"
      ]
    },
    "medications": [
      {
        "name": "Estradiol transdermal patch (Estradot, Climara)",
        "type": "Bioidentical Estrogen",
        "action": "17-beta estradiol absorbed transdermally, bypassing first-pass hepatic metabolism; reduces vasomotor symptoms by restoring hypothalamic thermoregulatory function",
        "sideEffects": "Breast tenderness, headache, nausea, skin irritation at patch site, increased breast cancer risk with > 5 years use (E+P)",
        "contra": "History of breast cancer, active VTE or PE, active liver disease, unexplained vaginal bleeding, known thrombophilia",
        "pearl": "Transdermal route preferred over oral: does NOT increase VTE risk, does NOT increase triglycerides, safer hepatic profile. Start 50 mcg patch, titrate to symptom control. Rotate application sites. Must add progestogen if uterus intact."
      },
      {
        "name": "Micronized Progesterone (Prometrium)",
        "type": "Natural Progesterone",
        "action": "Progesterone receptor agonist that opposes estrogenic stimulation of endometrium, preventing endometrial hyperplasia; also has anxiolytic and sedative properties via GABA-A modulation",
        "sideEffects": "Drowsiness (take at bedtime - advantageous for insomnia), bloating, breast tenderness, mood changes",
        "contra": "Peanut allergy (capsule contains peanut oil), severe hepatic dysfunction, known breast cancer",
        "pearl": "Natural progesterone has better safety profile than synthetic progestins (MPA). Take at bedtime to use sedative effect therapeutically. 200mg x 12-14 days/month (cyclic) or 100mg continuous daily. KEEPS and E3N studies suggest lower breast cancer risk vs synthetic progestins."
      }
    ],
    "pearls": [
      "The timing hypothesis is critical for NP prescribing: MHT initiated within 10 years of menopause or before age 60 provides cardiovascular benefit, but initiation after this window may increase cardiovascular risk - the WHI results must be interpreted in this context",
      "Transdermal estradiol does NOT increase VTE risk (unlike oral estrogen) - for patients with VTE risk factors (obesity, smoking, FH), transdermal is the preferred route",
      "Vaginal estrogen therapy for GSM does not require concurrent progesterone and can be used long-term, even in breast cancer survivors (consult oncology) - systemic absorption is minimal at recommended doses"
    ],
    "quiz": [
      {
        "question": "A 53-year-old with 18 months amenorrhea reports 10 hot flashes/day disrupting sleep and work. BMI 32, hypertension, intact uterus. No personal or family history of breast cancer or VTE. What is the most appropriate treatment?",
        "options": [
          "Oral conjugated equine estrogen + medroxyprogesterone",
          "Transdermal estradiol patch + micronized progesterone",
          "Paroxetine 7.5mg daily",
          "Black cohosh supplement"
        ],
        "correct": 1,
        "rationale": "Severe vasomotor symptoms within 10 years of menopause = MHT indicated. Given obesity (VTE risk factor), transdermal estradiol is preferred over oral (no VTE risk increase). Micronized progesterone is preferred over synthetic MPA for endometrial protection (uterus intact) due to better safety profile. Non-hormonal options are second-line for this severity."
      }
    ]
  },
  "neuro-stroke-np": {
    "title": "Ischemic and Hemorrhagic Stroke",
    "cellular": {
      "title": "Cerebrovascular Pathophysiology",
      "content": "Ischemic stroke (87% of strokes) results from arterial occlusion by thrombosis or embolism, causing focal cerebral ischemia. The ischemic core becomes irreversibly damaged within minutes, but the surrounding penumbra remains viable for hours if perfusion is restored. Thrombotic stroke typically occurs in large vessels with atherosclerotic plaque rupture. Cardioembolic stroke originates from the heart (atrial fibrillation, LV thrombus, valvular disease). Lacunar stroke results from lipohyalinosis of small perforating arteries. Hemorrhagic stroke (13%) involves intracerebral hemorrhage (ICH, usually from hypertensive arteriolar rupture) or subarachnoid hemorrhage (SAH, from ruptured aneurysm). Time is brain: approximately 1.9 million neurons die per minute during untreated ischemic stroke. IV alteplase (tPA) within 4.5 hours and mechanical thrombectomy within 24 hours (large vessel occlusion with salvageable tissue) are evidence-based reperfusion strategies."
    },
    "riskFactors": [
      "Hypertension (strongest modifiable risk factor for both ischemic and hemorrhagic stroke)",
      "Atrial fibrillation (5-fold increased risk of cardioembolic stroke)",
      "Diabetes mellitus (2-fold increased risk)",
      "Dyslipidemia",
      "Tobacco smoking (2-fold risk, reversible with cessation)",
      "Carotid artery stenosis > 50%",
      "Previous TIA or stroke (highest risk for recurrence)"
    ],
    "diagnostics": [
      "Non-contrast CT head STAT (rules out hemorrhage before thrombolysis - door-to-CT < 25 min)",
      "CT angiography (CTA) of head and neck for large vessel occlusion assessment",
      "MRI with diffusion-weighted imaging (DWI) for small infarcts and posterior circulation",
      "CT perfusion to identify salvageable penumbra for thrombectomy decision",
      "ECG and telemetry for atrial fibrillation detection",
      "Echocardiogram (TTE +/- TEE) for cardioembolic source",
      "Carotid Doppler ultrasound for anterior circulation strokes"
    ],
    "management": [
      "FAST assessment: Face drooping, Arm weakness, Speech difficulty, Time to call emergency",
      "IV alteplase 0.9 mg/kg (max 90mg) within 4.5 hours of symptom onset (after CT rules out hemorrhage)",
      "Mechanical thrombectomy within 24 hours for large vessel occlusion with salvageable tissue",
      "Admit to stroke unit (reduces mortality by 20% compared to general ward)",
      "Anti-platelet therapy: ASA 160-325mg within 24-48 hours (NOT within 24h of tPA)",
      "BP management: permissive hypertension in acute ischemic stroke (< 220/120); lower in hemorrhagic",
      "Secondary prevention: anti-hypertensives, statin, anticoagulation for AF (CHADS2-VASc guided)"
    ],
    "signs": {
      "left": [
        "TIA: transient focal neurological deficit resolving within 24 hours",
        "Minor stroke with NIHSS < 5 and improving symptoms",
        "Lacunar syndrome: pure motor, pure sensory, or ataxic hemiparesis",
        "Alert with mild unilateral weakness"
      ],
      "right": [
        "NIHSS > 20: dense hemiplegia, gaze deviation, aphasia, decreased consciousness",
        "Signs of large vessel occlusion: gaze deviation, neglect, complete hemiplegia",
        "Hemorrhagic stroke: sudden severe headache, vomiting, rapid deterioration",
        "Herniation: unilateral pupil dilation, posturing, Cushing triad"
      ]
    },
    "medications": [
      {
        "name": "Alteplase (tPA)",
        "type": "Tissue Plasminogen Activator",
        "action": "Converts plasminogen to plasmin, which degrades fibrin clots, restoring cerebral blood flow in ischemic stroke",
        "sideEffects": "Intracranial hemorrhage (6-7% symptomatic ICH), systemic bleeding, angioedema (with concurrent ACE inhibitors)",
        "contra": "Active internal bleeding, recent surgery/trauma < 14 days, INR > 1.7, platelets < 100,000, BP > 185/110 despite treatment, ICH on CT",
        "pearl": "Door-to-needle time < 60 minutes is the target. 0.9 mg/kg (max 90mg): 10% bolus over 1 min, remainder over 60 min. No antiplatelet or anticoagulant for 24 hours post-tPA. Monitor q15min for 2h, then q30min for 6h, then hourly for 16h."
      },
      {
        "name": "Apixaban (Eliquis)",
        "type": "Direct Oral Anticoagulant (DOAC)",
        "action": "Selectively inhibits factor Xa preventing thrombin generation and clot formation; used for stroke prevention in non-valvular atrial fibrillation",
        "sideEffects": "Bleeding (GI, intracranial), bruising, anemia; reversal agent: andexanet alfa",
        "contra": "Active pathological bleeding, prosthetic heart valve (use warfarin), severe hepatic disease (Child-Pugh C)",
        "pearl": "5mg BID standard dose; 2.5mg BID if >= 2 of: age >= 80, weight <= 60kg, Cr >= 133 mcmol/L. ARISTOTLE trial showed superiority to warfarin: fewer strokes, less bleeding, lower mortality. No routine monitoring needed. Lower GI bleeding risk than rivaroxaban or dabigatran."
      }
    ],
    "pearls": [
      "Time is brain: every minute of untreated ischemic stroke destroys 1.9 million neurons - the NP in primary care must recognize stroke symptoms immediately and activate emergency medical services without delay",
      "IV alteplase is effective up to 4.5 hours from symptom onset but benefit decreases with every minute of delay - the NP should never order MRI before CT in acute stroke as CT is faster and sufficient to rule out hemorrhage",
      "CHA2DS2-VASc score guides anticoagulation for AF-related stroke prevention: score >= 2 in men or >= 3 in women = DOAC anticoagulation recommended; the NP should calculate this for all AF patients"
    ],
    "quiz": [
      {
        "question": "A 68-year-old with atrial fibrillation presents 2 hours after sudden onset of right hemiplegia and expressive aphasia. Non-contrast CT shows no hemorrhage. BP 175/95. What is the immediate priority?",
        "options": [
          "MRI brain with diffusion-weighted imaging",
          "IV alteplase 0.9 mg/kg after lowering BP to < 185/110",
          "Start IV heparin drip",
          "Aspirin 325mg and admit to ward"
        ],
        "correct": 1,
        "rationale": "Acute ischemic stroke within 4.5-hour window with no hemorrhage on CT. BP 175/95 is below the 185/110 threshold for tPA. Immediate IV alteplase administration is the priority. Do not delay for MRI. Do not give antiplatelet or anticoagulant (wait 24h post-tPA). Door-to-needle target is < 60 minutes."
      }
    ]
  },
  "endo-diabetes-t1-t2-np": {
    "title": "Diabetes Mellitus Types 1 and 2",
    "cellular": {
      "title": "Insulin Physiology and Metabolic Derangement",
      "content": "Type 1 diabetes results from autoimmune destruction of pancreatic beta cells by CD4+ and CD8+ T lymphocytes, with autoantibodies (GAD65, IA-2, ZnT8, insulin antibodies) detectable months to years before clinical onset. This leads to absolute insulin deficiency requiring exogenous insulin for survival. Type 2 diabetes develops from progressive insulin resistance in skeletal muscle, liver, and adipose tissue, followed by beta cell dysfunction and relative insulin deficiency. The pathophysiology involves the 'ominous octet': decreased insulin secretion, increased glucagon, increased hepatic glucose output, increased lipolysis, decreased incretin effect, increased renal glucose reabsorption, neurotransmitter dysfunction, and decreased muscle glucose uptake. Chronic hyperglycemia causes microvascular complications (retinopathy, nephropathy, neuropathy) through polyol pathway activation, advanced glycation end-product (AGE) formation, protein kinase C activation, and hexosamine pathway flux. Macrovascular complications (CAD, CVD, PAD) result from accelerated atherosclerosis."
    },
    "riskFactors": [
      "T1D: family history (HLA-DR3, DR4), autoimmune conditions, Northern European descent",
      "T2D: obesity (BMI >= 30), physical inactivity, family history (first-degree relative)",
      "Gestational diabetes history (50% develop T2D within 10 years)",
      "Polycystic ovary syndrome",
      "Indigenous, South Asian, African, Hispanic ethnicity (2-6x higher T2D risk)",
      "Prediabetes (HbA1c 6.0-6.4%, FPG 6.1-6.9 mmol/L)",
      "Metabolic syndrome"
    ],
    "diagnostics": [
      "Fasting plasma glucose >= 7.0 mmol/L (confirmed on repeat)",
      "HbA1c >= 6.5% (48 mmol/mol) on two occasions",
      "2-hour OGTT plasma glucose >= 11.1 mmol/L",
      "Random plasma glucose >= 11.1 mmol/L with symptoms",
      "C-peptide level to distinguish T1D (low/absent) from T2D (normal/high initially)",
      "Autoantibody panel (GAD65, IA-2) if T1D suspected",
      "Annual screening: eGFR, uACR, dilated eye exam, foot exam, lipid panel"
    ],
    "management": [
      "T1D: basal-bolus insulin (MDI or insulin pump) with carb counting education",
      "T2D first-line: metformin + lifestyle modification (Diabetes Canada guidelines)",
      "T2D with ASCVD or high risk: add SGLT2 inhibitor (empagliflozin) or GLP-1 RA (liraglutide, semaglutide)",
      "T2D with CKD (eGFR 20-60): add SGLT2 inhibitor for nephroprotection",
      "T2D with HF: add SGLT2 inhibitor (dapagliflozin, empagliflozin - DAPA-HF, EMPEROR trials)",
      "HbA1c target: <= 7.0% for most adults; individualize for elderly/comorbid (7.1-8.5%)",
      "Diabetes self-management education and support (DSMES) referral"
    ],
    "signs": {
      "left": [
        "Well-controlled diabetes: HbA1c at target, no hypoglycemia",
        "Normal eGFR and uACR",
        "No retinopathy on dilated eye exam",
        "Intact protective sensation on monofilament testing"
      ],
      "right": [
        "DKA: hyperglycemia > 14 mmol/L, pH < 7.3, ketonemia, Kussmaul breathing (T1D emergency)",
        "Hyperosmolar hyperglycemic state: glucose > 33 mmol/L, serum osm > 320, no significant ketosis",
        "Proliferative retinopathy with vitreous hemorrhage",
        "Stage 4-5 CKD with proteinuria (diabetic nephropathy)"
      ]
    },
    "medications": [
      {
        "name": "Metformin",
        "type": "Biguanide",
        "action": "Decreases hepatic glucose production via AMPK activation, improves insulin sensitivity in skeletal muscle, reduces intestinal glucose absorption",
        "sideEffects": "GI intolerance (nausea, diarrhea, bloating - start low, titrate slowly), lactic acidosis (rare), vitamin B12 deficiency with long-term use",
        "contra": "eGFR < 30 mL/min (contraindicated), eGFR 30-45 (do not initiate, may continue at reduced dose), acute or chronic metabolic acidosis, decompensated HF",
        "pearl": "First-line for T2D (Diabetes Canada). Start 500mg daily with food, titrate to 1000mg BID over 4-6 weeks. Hold before iodinated contrast if eGFR < 45. Check B12 annually after 4 years of use."
      },
      {
        "name": "Empagliflozin (Jardiance)",
        "type": "SGLT2 Inhibitor",
        "action": "Inhibits sodium-glucose co-transporter 2 in proximal renal tubule, causing glycosuria (urinary glucose excretion 60-80g/day), reducing plasma glucose independent of insulin",
        "sideEffects": "Genital mycotic infections (candidiasis), UTI, volume depletion, euglycemic DKA (rare but serious), Fournier gangrene (very rare)",
        "contra": "eGFR < 20 (no glycemic benefit, but cardiorenal benefit may persist), T1D (DKA risk), recurrent UTI, active genital infection",
        "pearl": "EMPA-REG OUTCOME: 38% reduction in CV death. EMPEROR trials: HF benefit regardless of diabetes status. Cardiorenal protective effects independent of glucose lowering. Hold perioperatively (euglycemic DKA risk). Counsel on genital hygiene."
      }
    ],
    "pearls": [
      "SGLT2 inhibitors and GLP-1 RAs have cardiovascular and renal benefits INDEPENDENT of glucose lowering - the NP should prescribe these agents based on comorbidities (ASCVD, HF, CKD) rather than HbA1c alone",
      "Euglycemic DKA is a rare but serious complication of SGLT2 inhibitors - glucose may be normal or mildly elevated; suspect in any SGLT2i patient with nausea, vomiting, and metabolic acidosis, and check serum ketones",
      "Diabetes Canada recommends HbA1c <= 7.0% for most adults, but the NP must individualize targets: 7.1-8.0% for older adults with functional dependence, 8.0-8.5% for patients with limited life expectancy or hypoglycemia unawareness"
    ],
    "quiz": [
      {
        "question": "A 58-year-old with T2D, HbA1c 7.8%, BMI 34, eGFR 45, uACR 15 mg/mmol, and history of MI 2 years ago is on metformin 1000mg BID. What should the NP add?",
        "options": [
          "Glyburide (sulfonylurea)",
          "Empagliflozin (SGLT2 inhibitor)",
          "Insulin glargine at bedtime",
          "Sitagliptin (DPP-4 inhibitor)"
        ],
        "correct": 1,
        "rationale": "This patient has established ASCVD (prior MI), CKD stage 3a (eGFR 45), and albuminuria. Diabetes Canada guidelines recommend adding an SGLT2 inhibitor for cardiovascular benefit (EMPA-REG) and nephroprotection (CREDENCE/DAPA-CKD). SGLT2i is preferred over other agents based on comorbidity profile, not just HbA1c."
      }
    ]
  },
  "endo-thyroid-np": {
    "title": "Thyroid Dysfunction",
    "cellular": {
      "title": "HPT Axis and Thyroid Hormone Metabolism",
      "content": "The hypothalamic-pituitary-thyroid (HPT) axis regulates thyroid hormone production through negative feedback. TRH from the hypothalamus stimulates TSH release from the anterior pituitary, which stimulates the thyroid gland to produce T4 (thyroxine, 80-90%) and T3 (triiodothyronine, 10-20%). T4 is the prohormone converted to active T3 by deiodinase enzymes (type 1 and 2) in peripheral tissues. T3 binds nuclear receptors regulating metabolism, thermogenesis, cardiac function, and neurodevelopment. Hypothyroidism (elevated TSH, low fT4) most commonly results from Hashimoto thyroiditis (autoimmune, anti-TPO positive) or iatrogenic causes (thyroidectomy, radioactive iodine, medications). Hyperthyroidism (suppressed TSH, elevated fT4/fT3) is most commonly caused by Graves disease (TSH receptor stimulating antibodies), toxic multinodular goitre, or toxic adenoma. Subclinical disease (abnormal TSH with normal fT4) requires careful NP decision-making regarding treatment thresholds."
    },
    "riskFactors": [
      "Female sex (5-8x higher incidence of thyroid disease)",
      "Family history of autoimmune thyroid disease",
      "Other autoimmune conditions (T1D, celiac disease, RA, vitiligo)",
      "Age > 60 years (subclinical hypothyroidism prevalence increases)",
      "Iodine excess or deficiency",
      "Previous thyroid surgery or radioactive iodine therapy",
      "Medications: amiodarone, lithium, interferon-alpha, checkpoint inhibitors"
    ],
    "diagnostics": [
      "TSH is the primary screening test (most sensitive indicator of thyroid dysfunction)",
      "Free T4 (fT4) ordered when TSH is abnormal",
      "Free T3 if hyperthyroidism suspected and fT4 is normal (T3 thyrotoxicosis)",
      "Anti-TPO antibodies for Hashimoto thyroiditis confirmation",
      "TSH receptor antibodies (TRAb) for Graves disease diagnosis",
      "Thyroid ultrasound for palpable nodules or goitre characterization",
      "Radioactive iodine uptake (RAIU) scan to differentiate hyperthyroidism causes"
    ],
    "management": [
      "Hypothyroidism: levothyroxine (LT4) 1.6 mcg/kg/day (start lower in elderly/cardiac patients)",
      "Take levothyroxine on empty stomach 30-60 min before breakfast or at bedtime",
      "Monitor TSH 6-8 weeks after dose changes, then every 6-12 months when stable",
      "Subclinical hypothyroidism: treat if TSH > 10 mIU/L or symptomatic with TSH 4.5-10",
      "Hyperthyroidism: methimazole (first-line antithyroid drug), RAI, or surgery",
      "Graves ophthalmopathy: refer to ophthalmology, smoking cessation essential",
      "Thyroid storm: ICU, PTU (blocks synthesis + peripheral conversion), beta-blocker, hydrocortisone"
    ],
    "signs": {
      "left": [
        "Subclinical hypothyroidism: mildly elevated TSH with normal fT4, minimal symptoms",
        "Subclinical hyperthyroidism: mildly suppressed TSH with normal fT4/fT3",
        "Small, non-tender goitre without obstructive symptoms",
        "Stable thyroid function on replacement therapy"
      ],
      "right": [
        "Severe hypothyroidism: myxedema, hypothermia, bradycardia, altered consciousness",
        "Thyroid storm: high fever, tachycardia > 140, delirium, jaundice, cardiovascular collapse",
        "Large goitre with compressive symptoms (dysphagia, stridor)",
        "Graves ophthalmopathy: proptosis, lid retraction, optic neuropathy"
      ]
    },
    "medications": [
      {
        "name": "Levothyroxine (Synthroid, Eltroxin)",
        "type": "Synthetic T4",
        "action": "Replaces endogenous T4 production, converted to active T3 by peripheral deiodinases; restores normal metabolic function",
        "sideEffects": "Hyperthyroidism symptoms if over-replaced (tachycardia, tremor, insomnia, bone loss), cardiac events in elderly if started at full dose",
        "contra": "Untreated adrenal insufficiency (replace cortisol first), acute MI (relative - start at very low dose)",
        "pearl": "Empty stomach, 30-60 min before food. Separate from calcium, iron, PPI by 4 hours. Full replacement: 1.6 mcg/kg/day. Start 25-50 mcg in elderly or cardiac patients. Check TSH at 6-8 weeks. Target TSH 0.5-2.5 mIU/L for most adults."
      },
      {
        "name": "Methimazole (Tapazole)",
        "type": "Thionamide Antithyroid Drug",
        "action": "Inhibits thyroid peroxidase (TPO), blocking iodine organification and coupling reactions, reducing thyroid hormone synthesis. Does NOT affect release of preformed hormones",
        "sideEffects": "Rash, GI upset, arthralgia, agranulocytosis (0.2-0.5% - EMERGENCY if fever/sore throat), hepatotoxicity, teratogenicity (first trimester)",
        "contra": "First trimester pregnancy (use PTU instead), previous methimazole-induced agranulocytosis",
        "pearl": "First-line antithyroid drug for Graves disease. Typical starting dose 10-30mg daily based on severity. Warn patients about agranulocytosis: seek immediate care for fever or sore throat. Check CBC if febrile. Takes 4-6 weeks for clinical effect as preformed hormone stores deplete."
      }
    ],
    "pearls": [
      "TSH is the single most important thyroid function test - the NP should order TSH first and add fT4 only when TSH is abnormal; ordering fT4 with normal TSH rarely provides clinically useful information",
      "Levothyroxine absorption is significantly affected by concurrent medications and foods - the NP must counsel patients to take it on empty stomach and separate from calcium, iron, and PPIs by at least 4 hours",
      "Agranulocytosis from methimazole is a medical emergency - the NP must warn ALL patients on antithyroid drugs to immediately seek care for fever or sore throat and obtain urgent CBC with differential"
    ],
    "quiz": [
      {
        "question": "A 35-year-old woman presents with weight loss, palpitations, tremor, and diffuse goitre. TSH < 0.01, fT4 42 pmol/L (normal 12-22), positive TRAb. What is the first-line treatment?",
        "options": [
          "Levothyroxine",
          "Methimazole 20mg daily",
          "Immediate radioactive iodine therapy",
          "Propylthiouracil 100mg TID"
        ],
        "correct": 1,
        "rationale": "Graves disease confirmed by suppressed TSH, elevated fT4, positive TRAb, and diffuse goitre. First-line treatment is methimazole (not PTU, which is reserved for first trimester pregnancy and thyroid storm). Start 20mg daily with beta-blocker for symptomatic relief. Counsel about agranulocytosis risk. Monitor fT4 and TSH every 4-6 weeks."
      }
    ]
  },
  "msk-rheumatoid-arthritis-np": {
    "title": "Rheumatoid Arthritis",
    "cellular": {
      "title": "Autoimmune Synovial Inflammation",
      "content": "Rheumatoid arthritis (RA) is a chronic systemic autoimmune disease primarily affecting the synovial joints. Autoantibodies (rheumatoid factor and anti-citrullinated peptide antibodies/anti-CCP) form immune complexes that deposit in the synovium, activating complement and recruiting inflammatory cells. CD4+ T cells, macrophages, and fibroblast-like synoviocytes proliferate, creating the pannus - a destructive inflammatory tissue that invades cartilage and subchondral bone. Pro-inflammatory cytokines (TNF-alpha, IL-1, IL-6) drive joint destruction, while RANKL-mediated osteoclast activation causes periarticular erosions. RA characteristically presents as symmetric polyarthritis of small joints (MCP, PIP, wrist, MTP) with morning stiffness > 60 minutes. Extra-articular manifestations include rheumatoid nodules, interstitial lung disease, pericarditis, vasculitis, and Felty syndrome. Early aggressive treatment following the treat-to-target strategy (targeting remission or low disease activity) prevents irreversible joint destruction."
    },
    "riskFactors": [
      "Female sex (3:1 female to male ratio)",
      "Age 40-60 years (peak onset)",
      "First-degree relative with RA (3-5x increased risk)",
      "HLA-DR4 (shared epitope - strongest genetic risk)",
      "Cigarette smoking (strongest modifiable risk factor, also worsens disease severity)",
      "Obesity",
      "Periodontal disease (Porphyromonas gingivalis)"
    ],
    "diagnostics": [
      "RF (rheumatoid factor) - present in 60-80% of RA, but non-specific",
      "Anti-CCP antibodies - highly specific for RA (> 95%), positive early in disease",
      "ESR and CRP for inflammatory activity assessment",
      "CBC (normocytic anemia of chronic disease, thrombocytosis)",
      "Hand and foot radiographs (erosions, joint space narrowing)",
      "Ultrasound or MRI of affected joints for early synovitis detection",
      "ACR/EULAR 2010 classification criteria (score >= 6/10)"
    ],
    "management": [
      "Start DMARD within 3 months of symptom onset (early window of opportunity)",
      "Methotrexate 15-25mg weekly is first-line DMARD (CRA guidelines)",
      "Add folic acid 1mg daily (not on MTX day) to reduce MTX side effects",
      "If MTX insufficient at 3 months: add biologic DMARD (TNF inhibitor preferred first-line biologic)",
      "Treat-to-target: assess DAS28 or CDAI every 3 months, escalate until remission or low disease activity",
      "Short-term bridging: prednisone 10-15mg daily taper over 8-12 weeks",
      "Refer to rheumatology at first suspicion - do not wait for erosions"
    ],
    "signs": {
      "left": [
        "Early RA: symmetric MCP/PIP swelling and tenderness, morning stiffness > 60 min",
        "Positive squeeze test (MCP and MTP tenderness with lateral compression)",
        "Elevated CRP/ESR with positive anti-CCP",
        "Preserved joint space on radiograph (no erosions yet)"
      ],
      "right": [
        "Established RA: swan-neck and boutonniere deformities, ulnar deviation",
        "Joint erosions and subluxation on radiograph",
        "C1-C2 subluxation (atlantoaxial instability - cervical spine flexion-extension views before surgery)",
        "Extra-articular: rheumatoid nodules, ILD, scleritis, vasculitis"
      ]
    },
    "medications": [
      {
        "name": "Methotrexate",
        "type": "DMARD (Antimetabolite)",
        "action": "Inhibits dihydrofolate reductase reducing purine and pyrimidine synthesis; anti-inflammatory effects via adenosine release and inhibition of JAK/STAT signaling in immune cells",
        "sideEffects": "Hepatotoxicity, bone marrow suppression (pancytopenia), pneumonitis, GI upset, oral ulcers, teratogenicity (absolute contraindication in pregnancy)",
        "contra": "Pregnancy or planning pregnancy (stop 3 months before conception), severe hepatic or renal disease, active infection, immunodeficiency, excessive alcohol use",
        "pearl": "First-line DMARD for RA. Start 15mg weekly, titrate to 25mg. SC route has better bioavailability and fewer GI side effects than oral. Always co-prescribe folic acid 1mg daily (skip MTX day). Monitor CBC, LFTs, creatinine every 3 months."
      },
      {
        "name": "Adalimumab (Humira)",
        "type": "TNF-Alpha Inhibitor (Biologic DMARD)",
        "action": "Fully human monoclonal antibody that binds TNF-alpha, neutralizing its pro-inflammatory effects and reducing synovial inflammation, pannus formation, and bone erosion",
        "sideEffects": "Injection site reactions, increased infection risk (TB reactivation, invasive fungal infections), lymphoma risk (small increase), demyelinating disease, CHF exacerbation",
        "contra": "Active serious infection, untreated latent TB, moderate-severe CHF (NYHA III-IV), demyelinating disease, concurrent live vaccines",
        "pearl": "Screen for latent TB (TST or IGRA), hepatitis B and C before starting. 40mg SC every 2 weeks. Usually added to MTX for synergistic effect. CRA recommends biologic DMARD if MTX insufficient at 3 months. Biosimilars available at lower cost."
      }
    ],
    "pearls": [
      "The treat-to-target strategy in RA requires disease activity assessment (DAS28 or CDAI) every 3 months with therapy escalation until remission or low disease activity is achieved - the NP must not accept moderate disease activity as adequate",
      "Anti-CCP antibody is 95% specific for RA and predicts erosive disease - a positive anti-CCP in a patient with inflammatory polyarthritis essentially confirms the diagnosis and indicates the need for aggressive early DMARD therapy",
      "Methotrexate must NEVER be prescribed without folic acid supplementation and regular monitoring (CBC, LFTs every 3 months) - the NP should also ensure effective contraception in women of childbearing age and stop MTX 3 months before planned conception"
    ],
    "quiz": [
      {
        "question": "A 42-year-old woman presents with 3-month history of symmetric MCP and PIP joint swelling, morning stiffness lasting 2 hours, ESR 55, CRP 38, positive anti-CCP. Hand radiographs show periarticular osteopenia but no erosions. What is the most appropriate initial treatment?",
        "options": [
          "NSAIDs and reassess in 6 months",
          "Methotrexate 15mg weekly + folic acid 1mg daily",
          "Prednisone 40mg daily long-term",
          "Hydroxychloroquine monotherapy"
        ],
        "correct": 1,
        "rationale": "Early RA confirmed by symmetric inflammatory polyarthritis > 6 weeks, positive anti-CCP (highly specific), elevated inflammatory markers. CRA guidelines recommend methotrexate as first-line DMARD within 3 months of symptom onset. Folic acid must be co-prescribed. NSAIDs alone are insufficient and allow disease progression. Prednisone can be used as short-term bridge but not long-term monotherapy."
      }
    ]
  },
  "stress-hpa-axis-np": {
    "title": "HPA Axis and Stress Response",
    "cellular": {
      "title": "Neuroendocrine Stress Cascade",
      "content": "The hypothalamic-pituitary-adrenal (HPA) axis is the primary neuroendocrine stress response system. Physical or psychological stress activates paraventricular nucleus neurons in the hypothalamus to release corticotropin-releasing hormone (CRH) and arginine vasopressin (AVP). CRH stimulates corticotroph cells in the anterior pituitary to secrete adrenocorticotropic hormone (ACTH). ACTH acts on the zona fasciculata of the adrenal cortex to produce cortisol. Cortisol exerts widespread metabolic effects: gluconeogenesis (raising blood glucose), protein catabolism (muscle wasting), lipolysis (redistribution of fat), anti-inflammatory and immunosuppressive effects, and maintenance of vascular tone. Cortisol feeds back negatively on the hypothalamus and pituitary to terminate the stress response. Chronic stress disrupts this feedback, leading to sustained cortisol elevation, hippocampal neuronal damage (impairing memory), immunosuppression, metabolic syndrome, and cardiovascular disease. The NP must recognize the clinical consequences of chronic HPA axis dysregulation."
    },
    "riskFactors": [
      "Adverse childhood experiences (ACEs) - permanent HPA axis dysregulation",
      "Chronic psychological stress (work, caregiving, financial)",
      "Post-traumatic stress disorder",
      "Chronic pain syndromes",
      "Sleep deprivation and shift work",
      "Major depressive disorder",
      "Substance use disorders"
    ],
    "diagnostics": [
      "24-hour urinary free cortisol (UFC) for suspected Cushing syndrome",
      "Late-night salivary cortisol (elevated in Cushing - loss of diurnal rhythm)",
      "1mg overnight dexamethasone suppression test (cortisol > 50 nmol/L = non-suppression)",
      "Morning serum cortisol and ACTH (low cortisol + low ACTH = secondary adrenal insufficiency)",
      "ACTH stimulation test (cosyntropin 250 mcg IV - cortisol should rise > 500 nmol/L)",
      "Screen for metabolic consequences: fasting glucose, HbA1c, lipid panel, BMI"
    ],
    "management": [
      "Identify and address chronic stressors through comprehensive psychosocial assessment",
      "Prescribe evidence-based stress reduction: CBT, mindfulness-based stress reduction (MBSR)",
      "Promote sleep hygiene to restore diurnal cortisol rhythm (7-9 hours per night)",
      "Regular physical activity 150 min/week (reduces cortisol and improves HPA axis regulation)",
      "Screen for and treat comorbid depression/anxiety (PHQ-9, GAD-7)",
      "Monitor metabolic parameters in chronic stress patients (glucose, BP, lipids, weight)",
      "Gradual corticosteroid taper for iatrogenic adrenal suppression (never abrupt discontinuation)"
    ],
    "signs": {
      "left": [
        "Appropriate acute stress response with recovery to baseline",
        "Normal diurnal cortisol pattern (high AM, low PM)",
        "Effective coping strategies and social support",
        "No metabolic or psychological complications"
      ],
      "right": [
        "Cushing syndrome: moon facies, central obesity, striae, proximal myopathy, hypertension",
        "Adrenal crisis: hypotension, hyponatremia, hyperkalemia, hypoglycemia, altered consciousness",
        "Burnout: emotional exhaustion, depersonalization, reduced accomplishment",
        "PTSD: hypervigilance, flashbacks, insomnia, exaggerated startle"
      ]
    },
    "medications": [
      {
        "name": "Hydrocortisone",
        "type": "Glucocorticoid (Physiological Replacement)",
        "action": "Replaces deficient cortisol in adrenal insufficiency; mimics physiological diurnal cortisol rhythm when given in divided doses",
        "sideEffects": "Weight gain, hyperglycemia, osteoporosis, immunosuppression, adrenal atrophy with chronic supraphysiological doses",
        "contra": "Active systemic infection without appropriate antibiotic coverage (relative), live vaccines during immunosuppressive doses",
        "pearl": "Physiological replacement: 15-25mg daily in divided doses (10mg AM, 5mg noon, 5mg evening). Stress dosing: double or triple dose during illness. Patients must carry steroid alert card and emergency injection kit. NEVER stop abruptly after chronic use."
      },
      {
        "name": "Sertraline (Zoloft)",
        "type": "Selective Serotonin Reuptake Inhibitor",
        "action": "Blocks serotonin reuptake in synaptic cleft increasing serotonergic neurotransmission; modulates HPA axis hyperactivity in depression and PTSD",
        "sideEffects": "Nausea, sexual dysfunction, insomnia/drowsiness, serotonin syndrome (with MAOIs), increased suicidal ideation in < 25 years",
        "contra": "Concurrent MAOIs (14-day washout), concurrent pimozide",
        "pearl": "First-line pharmacotherapy for PTSD and comorbid depression/anxiety. Start 50mg daily, titrate to 100-200mg. Therapeutic effect takes 4-6 weeks. Do not discontinue abruptly (taper over 2-4 weeks). Monitor for suicidal ideation in first weeks, especially in young adults."
      }
    ],
    "pearls": [
      "Chronic HPA axis activation from sustained stress leads to the same metabolic consequences as exogenous glucocorticoid therapy - central obesity, insulin resistance, hypertension, and immunosuppression - the NP must screen chronically stressed patients for metabolic syndrome",
      "Adrenal crisis is a medical emergency that occurs when patients with adrenal insufficiency (or chronic corticosteroid users) face physiological stress without adequate cortisol replacement - the NP must educate all patients on chronic steroids about sick-day rules and emergency injection",
      "The NP should screen all patients with chronic pain, insomnia, or unexplained metabolic syndrome for psychosocial stressors and adverse childhood experiences (ACEs) - addressing the root cause of HPA axis dysregulation is more effective than treating individual metabolic consequences"
    ],
    "quiz": [
      {
        "question": "A patient on prednisone 20mg daily for 8 months for polymyalgia rheumatica develops gastroenteritis with vomiting and cannot take oral medications. What is the priority NP action?",
        "options": [
          "Advise to skip prednisone until vomiting resolves",
          "Administer IM/IV hydrocortisone 100mg STAT (stress dose)",
          "Switch to a different oral corticosteroid",
          "Prescribe ondansetron and continue oral prednisone"
        ],
        "correct": 1,
        "rationale": "After 8 months of prednisone, the HPA axis is suppressed. Physiological stress (gastroenteritis) increases cortisol demand but the adrenals cannot respond. Unable to take oral medication = cannot take prednisone = adrenal crisis risk. Immediate parenteral stress-dose corticosteroid (hydrocortisone 100mg IM/IV) is required to prevent cardiovascular collapse."
      }
    ]
  },
  "msk-osteoarthritis-gout-np": {
    "title": "OA, Gout, and Crystal Arthropathies",
    "cellular": {
      "title": "Degenerative and Crystal-Induced Joint Disease",
      "content": "Osteoarthritis (OA) is the most common joint disease, resulting from progressive loss of articular cartilage with secondary bony changes. Mechanical stress and inflammatory mediators (IL-1, TNF-alpha, MMPs) cause chondrocyte apoptosis and extracellular matrix degradation. Subchondral bone sclerosis, osteophyte formation, and synovial inflammation follow. OA characteristically affects weight-bearing joints (knees, hips) and DIP/PIP joints (Heberden and Bouchard nodes). Gout is a crystal arthropathy caused by monosodium urate (MSU) crystal deposition in joints when serum uric acid exceeds the saturation threshold (> 408 mcmol/L). MSU crystals activate the NLRP3 inflammasome in macrophages, triggering IL-1-beta release and intense neutrophilic inflammation. The first MTP joint (podagra) is the most common site. Pseudogout (calcium pyrophosphate deposition disease, CPPD) presents similarly but with calcium pyrophosphate crystals, typically affecting knees and wrists."
    },
    "riskFactors": [
      "OA: age > 50, obesity, prior joint injury, repetitive occupational stress, female sex",
      "OA: malalignment (varus/valgus), genetic predisposition",
      "Gout: hyperuricemia (serum urate > 408 mcmol/L)",
      "Gout: male sex, alcohol (especially beer), high-purine diet (red meat, shellfish)",
      "Gout: thiazide or loop diuretics, low-dose ASA",
      "Gout: CKD (reduced urate excretion)",
      "CPPD: age > 60, hemochromatosis, hyperparathyroidism, hypomagnesemia"
    ],
    "diagnostics": [
      "OA: clinical diagnosis (no labs needed); XR: joint space narrowing, osteophytes, subchondral sclerosis, cysts",
      "Gout: serum uric acid (may be normal during acute attack), joint aspiration showing negatively birefringent needle-shaped MSU crystals",
      "CPPD: joint aspiration showing weakly positively birefringent rhomboid crystals; XR: chondrocalcinosis",
      "Inflammatory markers (ESR, CRP) elevated in gout/CPPD, normal in OA",
      "Renal function (eGFR) before starting urate-lowering therapy",
      "Dual-energy CT for tophaceous gout if aspiration not feasible"
    ],
    "management": [
      "OA: weight loss (5% reduction decreases knee pain by 50%), exercise, physiotherapy",
      "OA pharmacotherapy: acetaminophen first-line, topical NSAIDs (diclofenac), oral NSAIDs short-term",
      "OA refractory: intra-articular corticosteroid injection, consider joint replacement referral",
      "Acute gout: colchicine 1.2mg then 0.6mg 1 hour later (within 36h of onset) OR NSAID (naproxen, indomethacin)",
      "Acute gout if NSAID/colchicine contraindicated: prednisone 30-40mg daily x 5 days",
      "ULT: allopurinol start 100mg daily, titrate to target urate < 360 mcmol/L (or < 300 if tophi)",
      "Start ULT with colchicine 0.6mg daily prophylaxis for 6 months to prevent mobilization flares"
    ],
    "signs": {
      "left": [
        "OA: mechanical joint pain worsening with activity, improving with rest",
        "OA: brief morning stiffness < 30 minutes, bony enlargement",
        "Gout: intermittent monoarticular attacks with asymptomatic intercritical periods",
        "Mild hyperuricemia without joint symptoms"
      ],
      "right": [
        "OA: severe functional limitation requiring joint replacement consideration",
        "Gout: polyarticular attacks, tophaceous deposits, chronic gouty arthropathy",
        "Gout: urate nephropathy with CKD progression",
        "Septic arthritis: must always be excluded in acute monoarthritis (joint aspiration mandatory)"
      ]
    },
    "medications": [
      {
        "name": "Allopurinol",
        "type": "Xanthine Oxidase Inhibitor",
        "action": "Inhibits xanthine oxidase, the enzyme converting hypoxanthine to xanthine and xanthine to uric acid, reducing serum and urinary urate levels",
        "sideEffects": "Rash (including severe: SJS/TEN - check HLA-B*5801 in high-risk populations), GI upset, hepatotoxicity, allopurinol hypersensitivity syndrome (rare, fatal)",
        "contra": "Previous severe allopurinol hypersensitivity reaction, HLA-B*5801 positive (screen Southeast Asian, Korean, African American patients before prescribing)",
        "pearl": "Start LOW (100mg daily), titrate slowly (increase by 100mg every 2-4 weeks) to target urate < 360 mcmol/L. Start with colchicine prophylaxis to prevent flares. Screen HLA-B*5801 in at-risk populations before prescribing. Do NOT start during acute attack."
      },
      {
        "name": "Colchicine",
        "type": "Anti-Inflammatory (Mitotic Inhibitor)",
        "action": "Binds tubulin disrupting microtubule assembly, inhibiting neutrophil chemotaxis, adhesion, and NLRP3 inflammasome activation, reducing crystal-induced inflammation",
        "sideEffects": "Diarrhea (dose-limiting), nausea, vomiting, abdominal cramps, bone marrow suppression at high doses, myopathy/neuropathy with renal impairment",
        "contra": "Severe renal impairment (eGFR < 10 - absolute; reduce dose if eGFR < 30), concurrent strong CYP3A4 inhibitors (clarithromycin, cyclosporine), severe hepatic impairment",
        "pearl": "For acute gout: 1.2mg then 0.6mg 1h later (within 36h of onset). For ULT prophylaxis: 0.6mg once or twice daily for 6 months. Low-dose regimen is as effective and much safer than traditional high-dose protocols. Reduce dose in renal impairment and with statin co-administration (myopathy risk)."
      }
    ],
    "pearls": [
      "Serum uric acid may be NORMAL during an acute gout attack due to acute-phase response-mediated uricosuria - a normal urate during an attack does NOT exclude gout; recheck 2-4 weeks after resolution for true baseline",
      "Allopurinol must be started at low dose (100mg) and titrated slowly with colchicine prophylaxis - starting at full dose or without prophylaxis triggers mobilization flares that discourage patients from continuing essential urate-lowering therapy",
      "HLA-B*5801 screening before allopurinol is mandatory in Southeast Asian, Korean, and African American patients - positive carriers have a 5-6% risk of severe allopurinol hypersensitivity syndrome (SJS/TEN) which is potentially fatal"
    ],
    "quiz": [
      {
        "question": "A 62-year-old man presents with acute onset severe pain, redness, and swelling of the left first MTP joint. He has CKD stage 3 (eGFR 38). Serum urate is 385 mcmol/L. What is the most appropriate acute management?",
        "options": [
          "Indomethacin 50mg TID",
          "Colchicine 1.2mg then 0.6mg in 1 hour",
          "Prednisone 30mg daily x 5 days",
          "Start allopurinol 300mg daily"
        ],
        "correct": 2,
        "rationale": "Acute podagra presentation. CKD stage 3 is a relative contraindication to NSAIDs (nephrotoxic). Colchicine requires dose reduction with eGFR < 30 but can be used at eGFR 38 with the low-dose protocol. However, prednisone 30mg x 5 days is the safest option in CKD and is equally effective. Normal urate (385) during acute attack does NOT exclude gout. NEVER start allopurinol during acute attack."
      }
    ]
  }
};
