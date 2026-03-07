import type { LessonContent } from "./types";

export const clinicalConditionsBatchMLessons: Record<string, LessonContent> = {
  "gout-management-rpn": {
    title: "Gout: RPN Monitoring",
    cellular: {
      title: "Uric Acid Crystal Deposition",
      content: "Gout is an inflammatory arthritis caused by deposition of monosodium urate crystals in joints and soft tissues. Hyperuricemia develops when purine metabolism produces excessive uric acid or renal excretion is impaired. Crystals trigger an intense inflammatory response mediated by neutrophils and interleukin-1β, causing acute joint pain, redness, and swelling. The metatarsophalangeal (MTP) joint of the great toe (podagra) is classically affected. The RPN monitors pain levels, assists with comfort measures, administers medications as ordered, and reports changes in joint status."
    },
    riskFactors: [
      "Male sex and postmenopausal women",
      "High-purine diet (red meat, organ meats, shellfish)",
      "Alcohol consumption (especially beer)",
      "Obesity and metabolic syndrome",
      "Chronic kidney disease",
      "Thiazide or loop diuretic use",
      "Family history of gout",
      "Dehydration"
    ],
    diagnostics: [
      "Monitor vital signs and report fever",
      "Assess and document joint swelling, redness, and warmth",
      "Report pain intensity using standardized pain scale",
      "Monitor urine output as ordered",
      "Report laboratory results (uric acid levels) as communicated"
    ],
    management: [
      "Administer anti-inflammatory medications as ordered",
      "Apply ice to affected joint as directed (20 minutes on, 20 minutes off)",
      "Elevate affected extremity to reduce swelling",
      "Encourage oral fluid intake as ordered",
      "Assist with positioning for comfort",
      "Provide low-purine diet as ordered"
    ],
    nursingActions: [
      "Assess affected joint for swelling, erythema, warmth, and range of motion",
      "Report unrelieved pain or new joint involvement to the RN",
      "Administer colchicine or NSAIDs as ordered and monitor for side effects",
      "Encourage fluid intake of 2-3 L/day unless contraindicated",
      "Educate patient on dietary triggers: avoid organ meats, shellfish, beer",
      "Report signs of medication side effects (GI upset, diarrhea)"
    ],
    signs: {
      left: [
        "Acute onset joint pain (often nocturnal)",
        "Podagra (first MTP joint involvement)",
        "Joint erythema and warmth",
        "Limited range of motion"
      ],
      right: [
        "Tophi (chronic urate deposits in soft tissue)",
        "Fever during acute flare",
        "Desquamation of overlying skin",
        "Elevated serum uric acid (>6.8 mg/dL)"
      ]
    },
    medications: [
      { name: "Colchicine", type: "Anti-inflammatory", action: "Inhibits neutrophil migration and phagocytosis of urate crystals, reducing inflammation", sideEffects: "Diarrhea, nausea, vomiting, abdominal cramping", contra: "Severe renal or hepatic impairment, concurrent strong CYP3A4 inhibitors", pearl: "Most effective when given within the first 36 hours of a flare. Report diarrhea immediately as a sign of toxicity." },
      { name: "Indomethacin", type: "NSAID", action: "Inhibits prostaglandin synthesis to reduce inflammation and pain", sideEffects: "GI bleeding, renal impairment, headache", contra: "Active GI bleed, renal failure, aspirin allergy", pearl: "First-line NSAID for acute gout flares. Administer with food and report any black stools." }
    ],
    pearls: [
      "Podagra (inflamed great toe) is the hallmark presentation of acute gout",
      "Ice application can help reduce swelling; avoid heat which worsens inflammation",
      "Alcohol, especially beer, is a major trigger due to high purine content",
      "Encourage high fluid intake to promote uric acid excretion"
    ],
    quiz: [
      { question: "Which joint is most classically affected in an acute gout flare?", options: ["Knee", "Wrist", "First metatarsophalangeal joint", "Hip"], correct: 2, rationale: "Podagra, or inflammation of the first MTP joint (great toe), is the classic presentation of acute gout." },
      { question: "Which dietary instruction should the RPN reinforce for a patient with gout?", options: ["Increase shellfish intake for protein", "Avoid organ meats and limit alcohol", "Eat more red meat for iron", "Restrict fluid intake"], correct: 1, rationale: "Organ meats and alcohol are high in purines and should be avoided. Adequate fluid intake helps excrete uric acid." }
    ]
  },

  "gout-management-rn": {
    title: "Gout: RN Clinical Management",
    cellular: {
      title: "Pathophysiology of Urate Crystal Arthropathy",
      content: "Gout results from sustained hyperuricemia leading to monosodium urate (MSU) crystal deposition in joints and periarticular tissues. Crystal formation triggers NLRP3 inflammasome activation and massive interleukin-1β release, producing an intense neutrophilic inflammatory response. Acute attacks feature severe monoarticular pain, erythema, and edema, classically in the first MTP joint. Chronic tophaceous gout develops after years of inadequately treated hyperuricemia, with urate deposits (tophi) causing joint destruction. The RN performs comprehensive joint assessment, manages acute pharmacologic therapy, monitors renal function during treatment, and coordinates lifestyle modification education."
    },
    riskFactors: [
      "Sustained hyperuricemia (>6.8 mg/dL)",
      "Male sex; postmenopausal women losing estrogen's uricosuric effect",
      "High-purine diet and fructose-sweetened beverages",
      "Alcohol use (beer and spirits increase uric acid production)",
      "Chronic kidney disease (decreased uric acid excretion)",
      "Thiazide and loop diuretics",
      "Organ transplant recipients on cyclosporine",
      "Metabolic syndrome and obesity"
    ],
    diagnostics: [
      "Assess affected joints systematically: swelling, erythema, warmth, range of motion, and pain (0-10 scale)",
      "Review serum uric acid levels (note: may be normal during acute flare)",
      "Monitor CBC for leukocytosis during acute attacks",
      "Evaluate BUN, creatinine, and eGFR before and during urate-lowering therapy",
      "Review synovial fluid analysis results: negatively birefringent needle-shaped crystals under polarized microscopy (definitive diagnosis)",
      "Monitor ESR and CRP as markers of inflammatory burden",
      "Assess for renal calculi (uric acid stones) with urinalysis"
    ],
    management: [
      "Administer first-line acute therapy: colchicine, NSAIDs, or corticosteroids per protocol",
      "Initiate ice therapy to affected joint (20 minutes on/off cycles)",
      "Elevate and immobilize the affected extremity using a cradle to keep linens off the joint",
      "Enforce fluid intake goal of 2-3 L/day to enhance renal uric acid clearance",
      "Coordinate dietary counseling: low-purine diet, limit alcohol, avoid fructose-sweetened drinks",
      "Begin urate-lowering therapy (allopurinol or febuxostat) only after acute flare resolves, with colchicine prophylaxis",
      "Monitor for allopurinol hypersensitivity syndrome (rash, fever, renal failure, hepatitis)",
      "Assess for comorbid hypertension, diabetes, and cardiovascular disease"
    ],
    nursingActions: [
      "Perform comprehensive musculoskeletal assessment of all joints at each encounter",
      "Administer colchicine within 36 hours of flare onset for maximum efficacy",
      "Monitor for NSAID-related complications: GI bleeding, renal impairment, cardiovascular risk",
      "Educate patient on the difference between acute flare treatment and long-term urate-lowering therapy",
      "Teach patient to identify early flare symptoms and initiate treatment promptly",
      "Coordinate with dietitian for personalized low-purine dietary plan",
      "Implement weight management counseling to reduce metabolic burden",
      "Screen for depressive symptoms associated with chronic painful condition"
    ],
    signs: {
      left: [
        "Acute monoarticular pain (onset over hours)",
        "Podagra (first MTP joint)",
        "Intense erythema and swelling",
        "Joint warmth and exquisite tenderness",
        "Skin desquamation over resolving flare"
      ],
      right: [
        "Tophi on ears, elbows, fingers, Achilles tendon",
        "Polyarticular involvement in chronic disease",
        "Uric acid nephrolithiasis",
        "Joint deformity and destruction (chronic tophaceous)",
        "Fever and leukocytosis during severe flares"
      ]
    },
    medications: [
      { name: "Colchicine", type: "Anti-inflammatory", action: "Disrupts microtubule assembly in neutrophils, inhibiting chemotaxis, phagocytosis, and inflammasome activation", sideEffects: "Diarrhea (dose-limiting), nausea, vomiting, bone marrow suppression at high doses", contra: "Severe renal/hepatic impairment, concurrent strong CYP3A4 inhibitors", pearl: "Low-dose regimen (1.2 mg then 0.6 mg one hour later) is as effective and better tolerated than high-dose. Diarrhea is the signal to stop." },
      { name: "Allopurinol", type: "Xanthine oxidase inhibitor", action: "Reduces uric acid production by blocking xanthine oxidase, the enzyme that converts hypoxanthine to uric acid", sideEffects: "Rash, GI upset, elevated LFTs, hypersensitivity syndrome (rare but serious)", contra: "Known hypersensitivity, concurrent azathioprine (dose must be reduced)", pearl: "Start low (100 mg/day) and titrate to target uric acid <6 mg/dL. HLA-B*5801 testing recommended in certain populations before starting." },
      { name: "Febuxostat", type: "Xanthine oxidase inhibitor", action: "Selectively inhibits xanthine oxidase with more potent uric acid lowering than allopurinol", sideEffects: "Liver enzyme elevation, nausea, cardiovascular risk", contra: "Concurrent azathioprine or mercaptopurine", pearl: "Alternative when allopurinol is contraindicated. FDA black box warning for increased cardiovascular death risk; reserve for allopurinol failures." },
      { name: "Prednisone", type: "Corticosteroid", action: "Suppresses inflammatory response by inhibiting cytokine production and neutrophil migration", sideEffects: "Hyperglycemia, insomnia, GI irritation, immunosuppression", contra: "Active systemic infection, uncontrolled diabetes", pearl: "Used for acute flares when NSAIDs and colchicine are contraindicated (e.g., CKD, GI bleed risk). Short-course taper over 5-10 days." }
    ],
    pearls: [
      "Serum uric acid may be paradoxically normal during an acute gout flare due to the inflammatory response",
      "Negatively birefringent needle-shaped crystals on synovial fluid analysis are diagnostic for gout",
      "Never initiate or discontinue urate-lowering therapy during an acute flare, as it can prolong the attack",
      "Colchicine prophylaxis should accompany the first 3-6 months of urate-lowering therapy to prevent flares",
      "Losartan and fenofibrate have mild uricosuric effects and may be preferred in gout patients with hypertension or dyslipidemia"
    ],
    quiz: [
      { question: "Which finding on synovial fluid analysis is diagnostic for gout?", options: ["Positively birefringent rhomboid crystals", "Negatively birefringent needle-shaped crystals", "Gram-positive cocci in clusters", "Elevated glucose with low protein"], correct: 1, rationale: "Monosodium urate crystals appear as negatively birefringent needle-shaped crystals under polarized light microscopy, which is the definitive diagnostic test for gout." },
      { question: "When should allopurinol be initiated in a patient with gout?", options: ["During the peak of an acute flare", "Immediately after diagnosis regardless of symptoms", "After the acute flare has resolved, with colchicine prophylaxis", "Only when tophi are visible"], correct: 2, rationale: "Urate-lowering therapy should be started after the acute flare resolves. Initiating during a flare can worsen or prolong the attack. Colchicine prophylaxis prevents mobilization flares." },
      { question: "A patient on allopurinol develops a rash, fever, and elevated creatinine. What is the priority concern?", options: ["Expected drug side effect requiring monitoring", "Allopurinol hypersensitivity syndrome requiring immediate discontinuation", "Gout flare requiring increased dose", "Allergic reaction to colchicine"], correct: 1, rationale: "Allopurinol hypersensitivity syndrome (rash, fever, eosinophilia, hepatitis, renal failure) is a rare but life-threatening reaction requiring immediate drug discontinuation and supportive care." }
    ]
  },

  "gout-management-np": {
    title: "Gout: NP Prescriptive Management",
    cellular: {
      title: "Advanced Pathophysiology and Pharmacologic Strategy",
      content: "Gout is a crystal-induced arthropathy resulting from sustained hyperuricemia exceeding the physiologic saturation point of monosodium urate (6.8 mg/dL at 37°C). Urate crystal deposition activates the NLRP3 inflammasome in resident macrophages, triggering caspase-1-mediated IL-1β release and an intense neutrophilic inflammatory cascade. Chronic hyperuricemia leads to tophaceous disease with cartilage and bone erosion. The NP must differentiate gout from septic arthritis and pseudogout, prescribe acute flare management, initiate and titrate urate-lowering therapy (ULT) to achieve target serum urate <6 mg/dL, manage comorbidities including CKD and cardiovascular disease, and consider pharmacogenomic testing (HLA-B*5801) before prescribing allopurinol in high-risk populations."
    },
    riskFactors: [
      "Sustained serum urate >6.8 mg/dL (supersaturation threshold)",
      "Underexcretion of uric acid (90% of gout patients; CKD, diuretics)",
      "Overproduction of uric acid (myeloproliferative disorders, tumor lysis syndrome)",
      "Purine-rich diet, fructose, and alcohol (especially beer)",
      "Medications: thiazides, loop diuretics, low-dose aspirin, cyclosporine, tacrolimus",
      "Metabolic syndrome: obesity, insulin resistance, dyslipidemia, hypertension",
      "Lead exposure (saturnine gout)",
      "Male sex; postmenopausal women (estrogen withdrawal reduces uricosuria)"
    ],
    diagnostics: [
      "Order synovial fluid aspiration and analysis: negatively birefringent needle-shaped MSU crystals under polarized microscopy (gold standard)",
      "Send synovial fluid for Gram stain and culture to rule out septic arthritis (can coexist with gout)",
      "Order serum uric acid (may be normal during acute flare; establish baseline after resolution)",
      "Order CMP: creatinine, eGFR (renal function for drug dosing), electrolytes, hepatic panel",
      "Order CBC with differential to assess for leukocytosis and rule out infection",
      "Order ESR and CRP to quantify inflammatory burden",
      "Consider dual-energy CT (DECT) for atypical presentations or chronic tophaceous gout evaluation",
      "Order HLA-B*5801 testing before initiating allopurinol in Southeast Asian, African American, or Korean patients"
    ],
    management: [
      "Prescribe acute flare management: colchicine 1.2 mg then 0.6 mg one hour later on day 1, then 0.6 mg BID until flare resolves",
      "Alternative acute therapy: indomethacin 50 mg TID or naproxen 500 mg BID for 5-7 days with PPI cover",
      "Prescribe prednisone 30-40 mg/day tapering over 7-10 days when NSAIDs/colchicine contraindicated",
      "Consider intra-articular triamcinolone (10-40 mg) for monoarticular flares or when systemic therapy is limited",
      "Initiate allopurinol 100 mg/day (50 mg if CKD stage ≥3) 2-4 weeks after flare resolution, titrate by 100 mg every 2-4 weeks to target urate <6 mg/dL",
      "Prescribe febuxostat 40-80 mg/day as second-line ULT when allopurinol fails or is contraindicated",
      "Prescribe colchicine 0.6 mg daily or BID as flare prophylaxis during the first 3-6 months of ULT",
      "Optimize comorbid management: prefer losartan (uricosuric) for HTN, fenofibrate for dyslipidemia"
    ],
    nursingActions: [
      "Perform arthrocentesis and interpret synovial fluid results",
      "Differentiate gout from pseudogout (calcium pyrophosphate; positively birefringent rhomboid crystals) and septic arthritis",
      "Monitor renal function and LFTs every 2-4 weeks during ULT titration, then every 6 months",
      "Track serial serum uric acid levels at each titration visit until target <6 mg/dL is achieved",
      "Assess for allopurinol hypersensitivity syndrome (DRESS): rash, fever, eosinophilia, hepatitis, renal failure",
      "Counsel on lifestyle modifications: weight loss, DASH diet, limit alcohol and fructose",
      "Adjust medication regimen based on eGFR: reduce allopurinol starting dose in CKD, avoid colchicine with strong CYP3A4 inhibitors",
      "Evaluate and manage cardiovascular risk (gout is an independent risk factor for MI and stroke)"
    ],
    signs: {
      left: [
        "Acute monoarticular pain with rapid escalation over 12-24 hours",
        "Classic podagra (first MTP joint)",
        "Intense erythema mimicking cellulitis",
        "Exquisite tenderness (cannot tolerate bedsheet contact)",
        "Fever and malaise with severe flares"
      ],
      right: [
        "Tophi: firm, whitish-yellow deposits (ears, olecranon, fingers, Achilles)",
        "Chronic polyarticular disease in undertreated patients",
        "Uric acid nephrolithiasis (radiolucent stones on X-ray)",
        "Chronic kidney disease from urate nephropathy",
        "Erosive joint damage on radiographs (rat-bite erosions with overhanging edges)"
      ]
    },
    medications: [
      { name: "Allopurinol", type: "Xanthine oxidase inhibitor", action: "Reduces uric acid production by blocking conversion of hypoxanthine to xanthine to uric acid", sideEffects: "Rash, GI upset, hepatotoxicity, hypersensitivity syndrome (DRESS)", contra: "HLA-B*5801 positive patients (high risk for DRESS), concurrent azathioprine without dose reduction", pearl: "Start low (100 mg, or 50 mg with CKD), titrate every 2-4 weeks. Target urate <6 mg/dL. Dose can exceed 300 mg if eGFR allows. Cost-effective first-line ULT." },
      { name: "Febuxostat", type: "Selective xanthine oxidase inhibitor", action: "More potent and selective xanthine oxidase inhibition than allopurinol; hepatically metabolized", sideEffects: "LFT elevations, cardiovascular events (black box warning), nausea", contra: "Concurrent azathioprine/mercaptopurine, severe hepatic impairment", pearl: "Reserve for allopurinol failures or contraindications. CARES trial showed increased cardiovascular mortality; use with caution in patients with CVD." },
      { name: "Pegloticase", type: "Recombinant uricase (PEGylated)", action: "Converts uric acid to allantoin, a highly soluble compound easily excreted by the kidneys", sideEffects: "Infusion reactions, anaphylaxis, gout flares, hemolysis in G6PD deficiency", contra: "G6PD deficiency (risk of hemolytic anemia and methemoglobinemia)", pearl: "Reserved for refractory tophaceous gout failing oral ULT. Administered IV every 2 weeks. Check uric acid before each infusion; if >6 mg/dL, antibodies have developed and drug should be stopped." },
      { name: "Anakinra", type: "IL-1 receptor antagonist", action: "Blocks IL-1β signaling, directly targeting the NLRP3 inflammasome-driven gout inflammation", sideEffects: "Injection site reactions, neutropenia, infection risk", contra: "Active serious infection, concurrent TNF inhibitors", pearl: "Off-label use for acute gout flares refractory to standard therapy or when NSAIDs, colchicine, and corticosteroids are all contraindicated. Consider in hospitalized complex patients." }
    ],
    pearls: [
      "Gout is the most common inflammatory arthritis in men; always consider it in acute monoarthritis",
      "A normal serum uric acid during a flare does NOT rule out gout; recheck 2-4 weeks after resolution",
      "Treat-to-target: aim for serum urate <6 mg/dL (<5 mg/dL in tophaceous gout) for crystal dissolution",
      "Every 1 mg/dL reduction in serum urate below the saturation point accelerates tophus resolution",
      "Gout is an independent cardiovascular risk factor; screen all gout patients for metabolic syndrome and manage aggressively"
    ],
    quiz: [
      { question: "Which test should be ordered before initiating allopurinol in a Southeast Asian patient?", options: ["Serum uric acid level", "HLA-B*5801 genotyping", "Erythrocyte sedimentation rate", "Rheumatoid factor"], correct: 1, rationale: "HLA-B*5801 is strongly associated with allopurinol hypersensitivity syndrome (DRESS). Testing is recommended in Southeast Asian, African American, and Korean patients before prescribing allopurinol." },
      { question: "A patient on allopurinol has a serum uric acid of 7.2 mg/dL. What is the appropriate action?", options: ["Discontinue allopurinol and switch to febuxostat", "Increase allopurinol dose by 100 mg and recheck in 2-4 weeks", "Add a loop diuretic to enhance excretion", "Continue current dose and recheck in 6 months"], correct: 1, rationale: "Allopurinol should be titrated upward by 100 mg increments every 2-4 weeks until the target uric acid of <6 mg/dL is achieved. Premature switching is not indicated." },
      { question: "Which medication is appropriate for an acute gout flare in a patient with CKD stage 4 and active peptic ulcer disease?", options: ["Indomethacin 50 mg TID", "Allopurinol 300 mg daily", "Prednisone 30 mg tapering over 7 days", "Colchicine 1.2 mg then 0.6 mg hourly"], correct: 2, rationale: "With CKD (NSAIDs and high-dose colchicine contraindicated) and active peptic ulcer disease (NSAIDs contraindicated), oral corticosteroids are the safest acute flare option." }
    ]
  },

  "osteoporosis-management-rpn": {
    title: "Osteoporosis: RPN Monitoring",
    cellular: {
      title: "Bone Density Loss",
      content: "Osteoporosis is a chronic, progressive skeletal disorder characterized by decreased bone mineral density and deterioration of bone microarchitecture, resulting in fragile bones and increased fracture risk. Normally, osteoblasts (bone-building cells) and osteoclasts (bone-resorbing cells) maintain bone homeostasis. In osteoporosis, osteoclast activity exceeds osteoblast activity, leading to net bone loss. This imbalance is accelerated by estrogen deficiency (postmenopause), aging, calcium/vitamin D insufficiency, and sedentary lifestyle. The RPN assists with fall prevention measures, monitors for fracture signs, reinforces dietary education, and administers medications as ordered."
    },
    riskFactors: [
      "Postmenopausal women (estrogen loss)",
      "Advanced age (>65 years)",
      "Female sex and small body frame",
      "Family history of osteoporosis or hip fracture",
      "Sedentary lifestyle",
      "Low calcium and vitamin D intake",
      "Long-term corticosteroid use",
      "Smoking and excessive alcohol use"
    ],
    diagnostics: [
      "Report patient complaints of back pain or height loss",
      "Assist with DEXA scan preparation as directed",
      "Monitor for signs of fracture after falls",
      "Report kyphotic posture changes",
      "Document mobility and balance assessments as directed"
    ],
    management: [
      "Implement fall prevention measures: non-slip footwear, clear pathways, adequate lighting",
      "Assist with weight-bearing exercises as tolerated",
      "Administer calcium and vitamin D supplements as ordered",
      "Administer bisphosphonates as ordered with proper technique",
      "Encourage dairy products, leafy greens, and fortified foods",
      "Ensure safety during transfers and ambulation"
    ],
    nursingActions: [
      "Assess mobility, balance, and fall risk at each encounter",
      "Reinforce proper bisphosphonate administration: take on empty stomach, with full glass of water, remain upright 30-60 minutes",
      "Monitor for medication side effects and report GI complaints",
      "Implement and maintain fall prevention strategies",
      "Educate patient on calcium-rich foods: dairy, broccoli, almonds, fortified cereals",
      "Report any new back pain, height loss, or fracture symptoms immediately"
    ],
    signs: {
      left: [
        "Asymptomatic in early stages",
        "Progressive height loss (>1.5 inches)",
        "Kyphosis (dowager's hump)",
        "Back pain (compression fractures)"
      ],
      right: [
        "Fragility fractures (hip, wrist, vertebral)",
        "Decreased bone density on DEXA scan",
        "Loss of mobility and function",
        "Increased fall risk"
      ]
    },
    medications: [
      { name: "Calcium Carbonate with Vitamin D", type: "Supplement", action: "Provides calcium for bone mineralization and vitamin D for intestinal calcium absorption", sideEffects: "Constipation, bloating, kidney stones (excess doses)", contra: "Hypercalcemia, renal calculi", pearl: "Take with meals for best absorption. Total daily calcium should not exceed 1200 mg from food and supplements combined." },
      { name: "Alendronate", type: "Bisphosphonate", action: "Inhibits osteoclast-mediated bone resorption, increasing bone mineral density", sideEffects: "Esophageal irritation, GI upset, jaw osteonecrosis (rare)", contra: "Esophageal disorders, inability to sit upright 30 minutes, hypocalcemia", pearl: "Take first thing in the morning on empty stomach with full glass of plain water. Do not lie down for 30-60 minutes after taking." }
    ],
    pearls: [
      "Osteoporosis is often called the 'silent disease' because bone loss occurs without symptoms until a fracture happens",
      "Weight-bearing exercise (walking, dancing) is essential for maintaining bone density",
      "Hip fractures carry significant mortality risk in elderly patients, especially within the first year",
      "Vitamin D-rich foods include tuna, egg yolks, fortified dairy, and salmon"
    ],
    quiz: [
      { question: "Which instruction is most important for a patient taking alendronate?", options: ["Take with a full meal", "Lie down after taking for absorption", "Take on empty stomach and remain upright for 30 minutes", "Take at bedtime with milk"], correct: 2, rationale: "Bisphosphonates must be taken on an empty stomach with plain water, and the patient must remain upright for 30-60 minutes to prevent esophageal irritation and ulceration." },
      { question: "Which assessment finding should the RPN report as a potential sign of osteoporotic fracture?", options: ["New onset lower back pain in a 72-year-old woman", "Mild joint stiffness in the morning", "Increased appetite", "Bilateral ankle edema"], correct: 0, rationale: "New onset back pain in an elderly patient may indicate a vertebral compression fracture, which is a common complication of osteoporosis." }
    ]
  },

  "osteoporosis-management-rn": {
    title: "Osteoporosis: RN Clinical Management",
    cellular: {
      title: "Bone Remodeling Imbalance",
      content: "Osteoporosis develops from an imbalance in bone remodeling where osteoclastic resorption exceeds osteoblastic formation, resulting in progressive loss of bone mineral density and deterioration of trabecular microarchitecture. Estrogen normally suppresses RANKL (receptor activator of nuclear factor kappa-B ligand), which stimulates osteoclast differentiation. Postmenopausal estrogen deficiency removes this brake, accelerating bone loss by 2-3% per year in the first 5-10 years. Secondary causes include chronic corticosteroid use (which directly inhibits osteoblasts and increases osteoclast lifespan), hyperparathyroidism, hyperthyroidism, and malabsorption syndromes. The RN performs comprehensive fall risk assessments, manages pharmacologic therapy, interprets DEXA results, and coordinates multidisciplinary fracture prevention strategies."
    },
    riskFactors: [
      "Postmenopausal status (especially early menopause <45 years)",
      "Age >65 years",
      "Female sex, Caucasian or Asian ethnicity",
      "Low body weight (<127 lbs) or BMI <20",
      "Family history of osteoporotic fracture",
      "Chronic corticosteroid use (>3 months of prednisone ≥5 mg/day)",
      "Smoking and alcohol use (>3 drinks/day)",
      "Sedentary lifestyle, prolonged immobilization"
    ],
    diagnostics: [
      "Interpret DEXA scan results: T-score ≥ -1.0 = normal; -1.0 to -2.5 = osteopenia; ≤ -2.5 = osteoporosis",
      "Calculate FRAX score to estimate 10-year fracture probability",
      "Review serum calcium, phosphorus, and albumin levels",
      "Monitor 25-hydroxyvitamin D levels (goal ≥30 ng/mL)",
      "Review alkaline phosphatase (elevated with increased bone turnover)",
      "Order TSH to rule out hyperthyroidism as secondary cause",
      "Assess height at each visit and compare to historical baseline (loss of >2 cm warrants vertebral imaging)"
    ],
    management: [
      "Implement comprehensive fall prevention program: home safety assessment, gait evaluation, vision correction",
      "Administer bisphosphonates per protocol with proper administration technique",
      "Ensure adequate calcium intake (1000-1200 mg/day) and vitamin D (800-1000 IU/day)",
      "Coordinate weight-bearing and resistance exercise program with physical therapy",
      "Implement hip protectors for high-risk patients in long-term care",
      "Manage pain from compression fractures with analgesics, bracing, and activity modification",
      "Monitor for bisphosphonate-related complications: osteonecrosis of the jaw, atypical femoral fractures",
      "Assess medication adherence at each visit (bisphosphonate adherence drops significantly after 1 year)"
    ],
    nursingActions: [
      "Perform standardized fall risk assessment (Morse Fall Scale) at admission and regularly thereafter",
      "Educate patients on proper bisphosphonate administration and verify understanding with teach-back",
      "Coordinate dental clearance before initiating bisphosphonate or denosumab therapy",
      "Monitor for adverse effects: esophageal symptoms (bisphosphonates), hypocalcemia (denosumab)",
      "Implement bone health education: calcium-rich diet, vitamin D sources, smoking cessation, alcohol limitation",
      "Assess for secondary causes of osteoporosis: medication history, endocrine disorders, malabsorption",
      "Coordinate referral for vertebroplasty or kyphoplasty for painful compression fractures unresponsive to conservative management",
      "Screen for depression and social isolation related to chronic pain and functional decline"
    ],
    signs: {
      left: [
        "Progressive height loss (kyphosis from vertebral compression)",
        "Dowager's hump (thoracic kyphosis)",
        "Chronic back pain from compression fractures",
        "Decreased mobility and balance impairment",
        "Low-trauma fractures (fall from standing height or less)"
      ],
      right: [
        "DEXA T-score ≤ -2.5",
        "Fragility fractures: vertebral, hip (femoral neck), distal radius (Colles)",
        "Radiographic osteopenia on incidental imaging",
        "Low 25-hydroxyvitamin D levels",
        "Elevated bone turnover markers"
      ]
    },
    medications: [
      { name: "Alendronate (Fosamax)", type: "Bisphosphonate", action: "Binds to hydroxyapatite in bone, inhibiting osteoclast-mediated resorption and increasing bone mineral density", sideEffects: "Esophageal irritation/ulceration, musculoskeletal pain, osteonecrosis of the jaw (rare), atypical femoral fracture (rare)", contra: "Esophageal abnormalities (stricture, achalasia), inability to sit upright 30 min, hypocalcemia, CrCl <35", pearl: "Take weekly (70 mg) on empty stomach with 8 oz plain water. Remain upright 30-60 min. Do not eat, drink, or take other medications during this period." },
      { name: "Denosumab (Prolia)", type: "RANKL inhibitor", action: "Monoclonal antibody that binds RANKL, preventing osteoclast formation, function, and survival", sideEffects: "Hypocalcemia, musculoskeletal pain, increased infection risk, rebound bone loss if discontinued", contra: "Hypocalcemia (must correct before starting)", pearl: "Administered subcutaneously every 6 months. Correct vitamin D deficiency and ensure adequate calcium before starting. Do not abruptly discontinue; rebound vertebral fractures can occur." },
      { name: "Raloxifene (Evista)", type: "Selective estrogen receptor modulator (SERM)", action: "Acts as estrogen agonist on bone (increasing BMD) and antagonist on breast/uterine tissue", sideEffects: "Hot flashes, leg cramps, DVT/PE risk", contra: "History of VTE, pregnancy, premenopausal women", pearl: "Reduces vertebral fracture risk and breast cancer risk. Does not reduce hip fracture risk. Contraindicated in patients with VTE history." },
      { name: "Calcium Carbonate + Vitamin D3", type: "Supplement", action: "Provides calcium substrate for bone mineralization; vitamin D enhances intestinal calcium absorption", sideEffects: "Constipation, hypercalcemia, renal calculi at excessive doses", contra: "Hypercalcemia, severe hypercalciuria", pearl: "Take calcium carbonate with meals. Do not exceed 500-600 mg per dose for optimal absorption. Space calcium 2 hours from bisphosphonates, levothyroxine, and tetracyclines." }
    ],
    pearls: [
      "DEXA scan screening is recommended for all women ≥65 years, men ≥70 years, and younger postmenopausal women with risk factors",
      "Vertebral compression fractures may be painless; serial height measurements are critical for early detection",
      "Bisphosphonate drug holidays (after 3-5 years) should be considered for patients at moderate risk, as prolonged use increases atypical fracture risk",
      "Denosumab must not be abruptly discontinued as rebound osteoclast activity can cause rapid bone loss and multiple vertebral fractures",
      "Vitamin D sufficiency (≥30 ng/mL) must be established before starting antiresorptive therapy to prevent hypocalcemia"
    ],
    quiz: [
      { question: "Which DEXA scan T-score indicates osteoporosis?", options: ["-1.0", "-1.5", "-2.0", "-2.5 or lower"], correct: 3, rationale: "A T-score of -2.5 or lower on DEXA scan meets the WHO diagnostic criteria for osteoporosis. Scores between -1.0 and -2.5 indicate osteopenia." },
      { question: "The RN is caring for a patient who has been on alendronate for 5 years. Which complication should the nurse assess for?", options: ["Hyperkalemia", "Atypical femoral fracture", "Pulmonary embolism", "Hepatotoxicity"], correct: 1, rationale: "Long-term bisphosphonate use (>3-5 years) is associated with rare atypical femoral fractures (subtrochanteric or femoral shaft). Prodromal thigh pain should prompt evaluation." },
      { question: "Before initiating denosumab, which laboratory value must be corrected?", options: ["Serum potassium", "Hemoglobin A1C", "Serum calcium and vitamin D", "Serum creatinine"], correct: 2, rationale: "Denosumab significantly reduces osteoclast activity, which can cause hypocalcemia. Calcium and vitamin D levels must be adequate before starting therapy." }
    ]
  },

  "osteoporosis-management-np": {
    title: "Osteoporosis: NP Prescriptive Management",
    cellular: {
      title: "Advanced Bone Biology and Treatment Strategies",
      content: "Osteoporosis reflects a fundamental disruption in the RANK/RANKL/OPG signaling axis that governs bone remodeling. RANKL, expressed by osteoblasts, binds RANK on osteoclast precursors to stimulate differentiation and activation. Osteoprotegerin (OPG), a decoy receptor, competitively inhibits this interaction. Estrogen upregulates OPG and suppresses RANKL; its loss during menopause shifts the balance toward excessive osteoclastogenesis. Glucocorticoids compound this by directly inhibiting osteoblast function, inducing osteocyte apoptosis, and decreasing intestinal calcium absorption. The NP must prescribe evidence-based pharmacotherapy (antiresorptive or anabolic agents), interpret bone density and fracture risk data, manage drug holidays and transitions, and address secondary causes through comprehensive workup."
    },
    riskFactors: [
      "Primary: postmenopausal estrogen deficiency, aging (peak bone mass achieved by age 30, declines thereafter)",
      "Glucocorticoid-induced: prednisone ≥5 mg/day for ≥3 months (most common secondary cause)",
      "Endocrine: hyperparathyroidism, hyperthyroidism, Cushing syndrome, hypogonadism",
      "GI malabsorption: celiac disease, inflammatory bowel disease, bariatric surgery",
      "Medications: aromatase inhibitors, GnRH agonists, anticonvulsants (phenytoin), PPIs (long-term)",
      "Chronic diseases: rheumatoid arthritis, CKD, COPD, type 1 diabetes",
      "Lifestyle: smoking, excessive alcohol, low calcium/vitamin D, sedentary behavior",
      "Genetic: family history, small frame, Caucasian/Asian ethnicity"
    ],
    diagnostics: [
      "Order DEXA scan of lumbar spine and proximal femur; interpret T-scores for diagnosis and Z-scores for premenopausal/male patients",
      "Calculate FRAX score to guide treatment decisions (treat if 10-year hip fracture risk ≥3% or major osteoporotic fracture risk ≥20%)",
      "Order comprehensive metabolic workup: 25-hydroxyvitamin D, serum calcium, phosphorus, intact PTH, TSH",
      "Order 24-hour urine calcium to assess absorption and excretion",
      "Consider bone turnover markers (CTX for resorption, P1NP for formation) to monitor treatment response",
      "Order vertebral fracture assessment (VFA) with DEXA or lateral thoracolumbar X-ray in patients with height loss ≥1.5 inches",
      "Rule out secondary causes: SPEP/UPEP (myeloma), celiac panel, cortisol testing as indicated",
      "Screen for fall risk using Timed Up and Go (TUG) test"
    ],
    management: [
      "Prescribe first-line antiresorptive therapy: alendronate 70 mg weekly or risedronate 150 mg monthly",
      "Prescribe IV zoledronic acid 5 mg annually for patients intolerant of oral bisphosphonates or with GI contraindications",
      "Prescribe denosumab 60 mg SQ every 6 months for patients failing or intolerant of bisphosphonates (ensure no gap in dosing)",
      "Prescribe anabolic therapy (teriparatide 20 mcg SQ daily or abaloparatide 80 mcg SQ daily) for severe osteoporosis (T-score < -3.5, multiple fractures, or glucocorticoid-induced)",
      "Sequence anabolic therapy before antiresorptive (anabolic-first strategy maximizes bone density gains)",
      "Prescribe romosozumab 210 mg SQ monthly x12 months for very high fracture risk (transition to antiresorptive after completion)",
      "Plan bisphosphonate drug holiday after 3-5 years oral or 3 years IV in moderate-risk patients; continue in high-risk",
      "Prescribe glucocorticoid-induced osteoporosis prevention: start bisphosphonate simultaneously with prednisone ≥7.5 mg/day expected >3 months"
    ],
    nursingActions: [
      "Perform initial secondary osteoporosis workup in all newly diagnosed patients",
      "Titrate calcium (1000-1200 mg/day in divided doses) and vitamin D (800-2000 IU/day, higher if deficient) to maintain 25(OH)D ≥30 ng/mL",
      "Monitor treatment response: repeat DEXA at 2 years; bone turnover markers at 3-6 months for earlier assessment",
      "Plan transition strategy when discontinuing denosumab (must transition to bisphosphonate to prevent rebound fractures)",
      "Assess adherence and tolerance at each visit; poor adherence is the primary reason for treatment failure",
      "Refer to endocrinology for refractory cases, anabolic therapy management, or complex secondary causes",
      "Coordinate multidisciplinary fall prevention: PT/OT evaluation, vision correction, medication review (reduce polypharmacy/sedatives)",
      "Manage acute vertebral fractures: prescribe analgesics, calcitonin nasal spray for fracture pain, refer for vertebral augmentation if refractory"
    ],
    signs: {
      left: [
        "Progressive height loss (>2 cm cumulative or >4 cm historical)",
        "Thoracic kyphosis with protuberant abdomen",
        "Chronic back pain from occult vertebral fractures",
        "Rib-to-pelvis distance reduction",
        "Reduced exercise tolerance from restrictive lung mechanics"
      ],
      right: [
        "DEXA T-score ≤ -2.5 (or ≤ -1.0 with fragility fracture = severe osteoporosis)",
        "Fragility fractures: vertebral (most common), hip (highest morbidity/mortality), distal radius",
        "Incidental vertebral compression fractures on imaging",
        "Elevated CTX (resorption marker) or low P1NP (formation marker)",
        "Secondary findings: hypercalciuria, low 25(OH)D, elevated PTH"
      ]
    },
    medications: [
      { name: "Zoledronic Acid (Reclast)", type: "IV Bisphosphonate", action: "Potent nitrogen-containing bisphosphonate that inhibits farnesyl pyrophosphate synthase in osteoclasts, inducing apoptosis", sideEffects: "Acute phase reaction (fever, myalgia, arthralgias for 1-3 days post-infusion), hypocalcemia, ONJ (rare), atypical fractures (rare)", contra: "CrCl <35 mL/min, hypocalcemia, pregnancy", pearl: "Annual IV infusion improves adherence. Pre-treat with acetaminophen. Correct vitamin D/calcium before infusion. After hip fracture, give within 2 weeks of surgical repair." },
      { name: "Teriparatide (Forteo)", type: "PTH analog (anabolic)", action: "Intermittent PTH(1-34) stimulates osteoblast activity more than osteoclast activity, increasing bone formation and improving microarchitecture", sideEffects: "Orthostatic hypotension, leg cramps, hypercalcemia, nausea", contra: "Paget disease, prior radiation therapy to skeleton, open epiphyses, pre-existing hypercalcemia, unexplained elevated ALP", pearl: "Maximum 2-year course. Must transition to antiresorptive therapy after completion or gains are lost. Anabolic-first strategy (before bisphosphonate) yields superior bone density gains." },
      { name: "Romosozumab (Evenity)", type: "Anti-sclerostin monoclonal antibody", action: "Inhibits sclerostin (an osteocyte-derived protein that suppresses bone formation), simultaneously increasing formation and decreasing resorption", sideEffects: "Injection site reactions, cardiovascular events (MI, stroke), hypocalcemia, ONJ (rare)", contra: "History of MI or stroke within prior year (black box warning)", pearl: "Monthly SQ injection for 12 months only. Most potent BMD increase of any agent. Must transition to antiresorptive after 12 months. Avoid in patients with cardiovascular history." },
      { name: "Denosumab (Prolia)", type: "RANKL inhibitor", action: "Fully human monoclonal antibody binding RANKL, preventing osteoclast formation and bone resorption", sideEffects: "Hypocalcemia, musculoskeletal pain, infections, rebound vertebral fractures on discontinuation", contra: "Hypocalcemia (must correct first)", pearl: "Every 6 months SQ. No renal dose adjustment needed (unlike bisphosphonates). Never delay or discontinue without transitioning to a bisphosphonate; rebound fractures occur within months of last dose." }
    ],
    pearls: [
      "The anabolic-first strategy (teriparatide/romosozumab before bisphosphonate) produces greater BMD gains than antiresorptive-first approaches",
      "Bisphosphonate drug holidays are appropriate for moderate-risk patients after 3-5 years; high-risk patients should continue therapy",
      "Denosumab discontinuation requires mandatory transition to bisphosphonate (usually zoledronic acid) 6 months after last dose to prevent rebound vertebral fractures",
      "Romosozumab carries a cardiovascular black box warning; screen all patients for MI/stroke history before prescribing",
      "Glucocorticoid-induced osteoporosis can occur rapidly; initiate prevention at the start of steroid therapy, not after bone loss is detected"
    ],
    quiz: [
      { question: "Which pharmacologic strategy produces the greatest increase in bone mineral density?", options: ["Starting with a bisphosphonate then switching to teriparatide", "Starting with teriparatide then transitioning to a bisphosphonate", "Long-term denosumab monotherapy", "Combination calcium and vitamin D only"], correct: 1, rationale: "The anabolic-first strategy (teriparatide or romosozumab followed by antiresorptive therapy) produces the greatest gains in BMD. Starting antiresorptive first blunts the subsequent anabolic response." },
      { question: "A patient has been on denosumab for 3 years and wants to stop. What must the NP prescribe?", options: ["Nothing; the drug effect persists indefinitely", "Calcium and vitamin D supplementation only", "A bisphosphonate (zoledronic acid) to prevent rebound vertebral fractures", "Teriparatide to maintain bone density"], correct: 2, rationale: "Denosumab discontinuation causes rapid rebound osteoclast activity with accelerated bone loss and risk of multiple vertebral fractures. Transitioning to a bisphosphonate (typically zoledronic acid infusion) is mandatory." },
      { question: "Which medication is contraindicated in a patient with a history of stroke 6 months ago?", options: ["Alendronate", "Denosumab", "Romosozumab", "Teriparatide"], correct: 2, rationale: "Romosozumab carries a black box warning for increased cardiovascular events including MI and stroke. It is contraindicated in patients with a cardiovascular event within the past year." }
    ]
  },

  "compartment-syndrome-rpn": {
    title: "Compartment Syndrome: RPN Monitoring",
    cellular: {
      title: "Pressure-Induced Tissue Ischemia",
      content: "Compartment syndrome is a limb-threatening emergency that occurs when pressure within a closed fascial compartment rises to a level that compromises tissue perfusion. Muscles and nerves within the compartment are encased in rigid fascia that cannot expand. When internal pressure increases (from bleeding, edema, or external compression), capillary perfusion ceases, leading to ischemia, necrosis, and permanent neurovascular damage if not relieved within 6 hours. The RPN must recognize early warning signs, perform frequent neurovascular assessments, and report changes immediately."
    },
    riskFactors: [
      "Long bone fractures (tibial shaft most common)",
      "Crush injuries and severe trauma",
      "Tight casts, splints, or dressings",
      "Burns with circumferential eschar",
      "Surgical positioning (prolonged lithotomy)",
      "Massive IV infiltration",
      "Snake bites",
      "Reperfusion injury after prolonged ischemia"
    ],
    diagnostics: [
      "Perform neurovascular checks every 1-2 hours as ordered: pulses, sensation, movement, capillary refill, color, temperature",
      "Assess pain intensity and character, especially pain disproportionate to injury",
      "Report pain unrelieved by prescribed analgesics",
      "Monitor for paresthesia (tingling, numbness, burning)",
      "Report any changes in skin color or temperature of the affected extremity"
    ],
    management: [
      "Elevate extremity to heart level only (not above, which can reduce arterial perfusion)",
      "Remove or bivalve cast/dressing immediately if compartment syndrome is suspected",
      "Loosen all restrictive bandages or wraps",
      "Administer pain medications as ordered",
      "Prepare patient for emergency fasciotomy as directed",
      "Maintain IV access as ordered"
    ],
    nursingActions: [
      "Perform the 6 Ps assessment: Pain, Pressure, Paresthesia, Pallor, Pulselessness, Paralysis",
      "Report pain out of proportion to injury immediately to the RN",
      "Assess and document capillary refill bilaterally for comparison",
      "Monitor for taut, shiny skin over the affected compartment",
      "Never elevate the extremity above heart level in suspected compartment syndrome",
      "After fasciotomy, monitor wound for signs of infection and document drainage"
    ],
    signs: {
      left: [
        "Pain disproportionate to injury (earliest and most reliable sign)",
        "Pain on passive stretch of muscles in the compartment",
        "Paresthesia (tingling, numbness)",
        "Pressure (taut, swollen extremity)"
      ],
      right: [
        "Pallor and cool skin",
        "Pulselessness (late and ominous sign)",
        "Paralysis (late sign indicating nerve damage)",
        "Poikilothermia (inability to regulate limb temperature)"
      ]
    },
    medications: [
      { name: "Morphine", type: "Opioid analgesic", action: "Binds mu-opioid receptors to provide pain relief", sideEffects: "Respiratory depression, hypotension, constipation, sedation", contra: "Respiratory depression, severe hypotension", pearl: "Unrelieved pain despite adequate opioid dosing is a hallmark sign of compartment syndrome. Report this immediately rather than requesting additional doses." }
    ],
    pearls: [
      "Pain out of proportion to the injury is the earliest and most reliable sign of compartment syndrome",
      "Pulselessness is a LATE sign; waiting for loss of pulses means significant ischemia has already occurred",
      "Never elevate the affected limb above the heart, as this further reduces arterial perfusion pressure",
      "Compartment syndrome is a surgical emergency; fasciotomy must occur within 6 hours to prevent irreversible damage"
    ],
    quiz: [
      { question: "Which finding is the earliest indicator of compartment syndrome?", options: ["Absent distal pulses", "Pain disproportionate to injury and unrelieved by analgesics", "Paralysis of the affected extremity", "Cyanosis of the limb"], correct: 1, rationale: "Pain out of proportion to the injury that is not relieved by analgesics is the earliest and most reliable sign of compartment syndrome. Loss of pulses and paralysis are late, ominous signs." },
      { question: "A patient in a leg cast reports increasing pain and numbness in the toes. What should the RPN do first?", options: ["Elevate the leg above heart level", "Report to the RN immediately", "Apply ice to the cast", "Administer another dose of pain medication"], correct: 1, rationale: "Increasing pain and paresthesia in a casted extremity are early signs of compartment syndrome. The RPN must report immediately; the cast may need to be bivalved or removed." }
    ]
  },

  "compartment-syndrome-rn": {
    title: "Compartment Syndrome: RN Clinical Management",
    cellular: {
      title: "Pathophysiology of Compartment Pressure",
      content: "Compartment syndrome develops when intracompartmental pressure exceeds capillary perfusion pressure (normally 25-30 mmHg), leading to tissue ischemia. The anterior compartment of the lower leg is most commonly affected due to its tight fascial boundaries. As pressure rises, venous outflow is obstructed first, causing further edema in a vicious cycle. When arterial inflow is compromised, irreversible myonecrosis begins within 6 hours and permanent nerve damage within 12-24 hours. Without fasciotomy, Volkmann ischemic contracture (upper extremity) or limb loss results. The RN performs serial neurovascular assessments, manages pain, coordinates with the surgical team, and provides post-fasciotomy wound care."
    },
    riskFactors: [
      "Tibial shaft fractures (most common cause)",
      "Forearm fractures (supracondylar fractures in children)",
      "Crush injuries and reperfusion after revascularization",
      "Circumferential burns with rigid eschar",
      "Tight casts, splints, or circumferential dressings",
      "Massive IV infiltration or intra-arterial injection",
      "Anticoagulant therapy with compartment hematoma",
      "Prolonged surgical positioning (lithotomy >4 hours)"
    ],
    diagnostics: [
      "Perform serial neurovascular assessments every 1-2 hours: compare bilaterally for pulses, sensation, motor function, capillary refill, and skin color/temperature",
      "Assess pain characteristics: severity, response to analgesics, pain on passive stretch of muscles in the affected compartment",
      "Monitor compartment pressure measurements if Stryker device is available (normal <10 mmHg; concern >30 mmHg or within 30 mmHg of diastolic BP)",
      "Calculate delta pressure (ΔP = diastolic BP - compartment pressure); fasciotomy indicated when ΔP <30 mmHg",
      "Monitor CK levels for rhabdomyolysis (may develop from prolonged compartment ischemia)",
      "Monitor urine output and urine color (dark brown = myoglobinuria from rhabdomyolysis)",
      "Monitor serum potassium (hyperkalemia from muscle cell destruction)"
    ],
    management: [
      "Remove all restrictive dressings, bivalve cast, and cut cast padding down to skin immediately",
      "Position extremity at heart level (not above or below)",
      "Administer IV analgesics for pain management while monitoring for unrelieved pain",
      "Notify surgeon immediately if compartment syndrome is suspected; fasciotomy is the definitive treatment",
      "Initiate aggressive IV fluid resuscitation if rhabdomyolysis develops (target urine output >200 mL/hr initially)",
      "Monitor for reperfusion injury after fasciotomy: metabolic acidosis, hyperkalemia, myoglobinuria",
      "Provide post-fasciotomy wound care: open wounds are typically closed with delayed primary closure or skin grafting",
      "Implement continuous cardiac monitoring if hyperkalemia develops"
    ],
    nursingActions: [
      "Perform comprehensive 6 Ps assessment and document serially",
      "Test passive stretch of the affected compartment muscles (pain on passive dorsiflexion of the ankle for anterior leg compartment)",
      "Immediately escalate unrelieved pain despite adequate analgesia",
      "Maintain continuous neurovascular monitoring before and after fasciotomy",
      "Manage post-fasciotomy open wounds with sterile wet-to-dry dressings as ordered",
      "Educate patient and family about the need for open wound management and potential delayed closure",
      "Monitor for systemic complications: acute kidney injury (from myoglobin), cardiac arrhythmias (from hyperkalemia), metabolic acidosis",
      "Perform active and passive ROM exercises as ordered to prevent contractures during recovery"
    ],
    signs: {
      left: [
        "Pain disproportionate to injury (earliest sign)",
        "Pain on passive stretch of affected compartment muscles",
        "Paresthesia progressing to numbness",
        "Pressure (compartment feels tense/taut on palpation)",
        "Taut, shiny, swollen skin"
      ],
      right: [
        "Pallor and prolonged capillary refill (>3 seconds)",
        "Pulselessness (late; indicates severe arterial compromise)",
        "Paralysis (late; indicates irreversible nerve damage)",
        "Poikilothermia (cool extremity)",
        "Compartment pressure >30 mmHg or ΔP <30 mmHg"
      ]
    },
    medications: [
      { name: "IV Morphine or Hydromorphone", type: "Opioid analgesic", action: "Central and peripheral mu-opioid receptor agonism for severe pain management", sideEffects: "Respiratory depression, hypotension, sedation, constipation", contra: "Respiratory depression, hemodynamic instability", pearl: "Pain unrelieved by appropriate opioid doses is a RED FLAG for compartment syndrome. This finding should prompt immediate surgical consultation, not higher opioid doses." },
      { name: "IV Normal Saline", type: "Isotonic crystalloid", action: "Volume expansion and forced diuresis to dilute myoglobin and protect renal tubules", sideEffects: "Volume overload, hypernatremia, hyperchloremic metabolic acidosis", contra: "Decompensated heart failure", pearl: "Aggressive IV hydration is critical if rhabdomyolysis develops from compartment syndrome. Target urine output >200 mL/hr initially to prevent myoglobin-induced AKI." },
      { name: "Sodium Bicarbonate", type: "Alkalinizing agent", action: "Alkalinizes urine to prevent myoglobin precipitation in renal tubules", sideEffects: "Metabolic alkalosis, hypokalemia, volume overload", contra: "Severe metabolic alkalosis", pearl: "Added to IV fluids when urine pH <6.5 in the setting of rhabdomyolysis. Alkaline urine keeps myoglobin soluble and protects against AKI." }
    ],
    pearls: [
      "The 6 Ps in order of appearance: Pain → Pressure → Paresthesia → Pallor → Pulselessness → Paralysis",
      "Waiting for pulselessness or paralysis before acting means irreversible damage has already occurred",
      "Delta pressure (ΔP = diastolic BP - compartment pressure) <30 mmHg is the threshold for fasciotomy",
      "Fasciotomy wounds are left open and typically closed 3-5 days later or require skin grafting",
      "Volkmann contracture is a permanent flexion deformity of the forearm from untreated compartment syndrome"
    ],
    quiz: [
      { question: "A patient with a tibial fracture has a compartment pressure of 38 mmHg and a diastolic BP of 60 mmHg. What is the delta pressure and what action is needed?", options: ["ΔP = 22 mmHg; emergent fasciotomy required", "ΔP = 38 mmHg; continue monitoring", "ΔP = 98 mmHg; no intervention needed", "ΔP = 22 mmHg; elevate the limb above heart level"], correct: 0, rationale: "ΔP = 60 - 38 = 22 mmHg. A delta pressure <30 mmHg indicates insufficient perfusion pressure and is the threshold for emergent fasciotomy." },
      { question: "After fasciotomy for compartment syndrome, the RN notes dark brown urine. What is the priority action?", options: ["Document as a normal finding", "Increase IV fluid rate and notify the provider", "Restrict fluids to prevent overload", "Administer a loop diuretic"], correct: 1, rationale: "Dark brown urine indicates myoglobinuria from rhabdomyolysis. The priority is aggressive IV fluid resuscitation to maintain urine output and prevent myoglobin-induced AKI." },
      { question: "Which assessment technique specifically evaluates for anterior compartment syndrome of the lower leg?", options: ["Dorsiflex the ankle and assess for pain", "Passively extend the knee", "Palpate the posterior tibial pulse", "Assess plantar reflex"], correct: 0, rationale: "Passive dorsiflexion of the ankle stretches the muscles in the anterior compartment. Pain on passive stretch is an early sign of compartment syndrome in that compartment." }
    ]
  },

  "compartment-syndrome-np": {
    title: "Compartment Syndrome: NP Prescriptive Management",
    cellular: {
      title: "Advanced Pathophysiology and Surgical Decision-Making",
      content: "Compartment syndrome represents a surgical emergency driven by the interplay between intracompartmental pressure, tissue perfusion pressure, and the duration of ischemia. Normal compartment pressure is 0-8 mmHg. As pressure rises above 30 mmHg (or within 30 mmHg of diastolic blood pressure), capillary perfusion fails. The ischemia-reperfusion cascade causes further edema through endothelial injury and inflammatory mediator release, creating a self-perpetuating cycle. Irreversible myonecrosis begins at 4-6 hours, and complete necrosis occurs by 12 hours. Rhabdomyolysis from muscle death releases myoglobin, potassium, phosphate, and creatine kinase, potentially causing acute kidney injury, cardiac arrhythmias, and DIC. The NP must make rapid clinical decisions, differentiate from other causes of limb pain, order compartment pressure monitoring, coordinate emergent fasciotomy, and manage the complex systemic sequelae."
    },
    riskFactors: [
      "High-energy tibial shaft fractures (35% incidence of anterior compartment syndrome)",
      "Forearm fractures, especially in children (supracondylar → Volkmann contracture)",
      "Crush injuries and prolonged immobilization (earthquake victims, altered consciousness)",
      "Vascular injury with reperfusion (embolectomy, revascularization after >4 hours ischemia)",
      "Circumferential burns requiring escharotomy",
      "Anticoagulation with compartment hematoma",
      "Tight surgical closure over fascial defects",
      "Exercise-induced (chronic exertional compartment syndrome, different management)"
    ],
    diagnostics: [
      "Perform serial clinical assessment: the 6 Ps are clinical but PAIN is the most sensitive early indicator",
      "Order continuous or serial compartment pressure monitoring (Stryker intracompartmental pressure device)",
      "Use delta pressure (ΔP = diastolic BP - compartment pressure) for surgical decision-making; ΔP <30 mmHg mandates fasciotomy",
      "Order STAT CK levels (rhabdomyolysis: CK >5× normal or >1000 U/L)",
      "Order CMP: potassium (hyperkalemia from muscle necrosis), calcium (hypocalcemia), phosphorus (hyperphosphatemia), creatinine (AKI)",
      "Order serial urinalysis: myoglobinuria (positive blood on dipstick without RBCs on microscopy)",
      "Order coagulation studies (PT/INR, fibrinogen, D-dimer) if DIC is suspected",
      "Order 12-lead ECG and continuous cardiac monitoring for hyperkalemia management"
    ],
    management: [
      "Order immediate removal of all external compression: bivalve cast, release dressings, remove splints",
      "Position extremity at heart level and ensure normotension (hypotension worsens tissue ischemia)",
      "Consult orthopedic/trauma surgery STAT for fasciotomy when clinical findings or ΔP <30 mmHg confirm diagnosis",
      "Prescribe aggressive crystalloid resuscitation for rhabdomyolysis: NS or LR at 200-300 mL/hr initially, target UOP >200 mL/hr",
      "Add sodium bicarbonate to IV fluids (150 mEq/L) if urine pH <6.5 to prevent myoglobin cast formation",
      "Treat hyperkalemia emergently: IV calcium gluconate (cardiac stabilization), insulin/dextrose, sodium bicarbonate, kayexalate",
      "Order serial CK, BMP, and urine myoglobin every 6-8 hours until trending down",
      "Plan post-fasciotomy wound management: negative pressure wound therapy (VAC) or wet-to-dry dressings, with delayed primary closure at 3-5 days or split-thickness skin graft"
    ],
    nursingActions: [
      "Differentiate compartment syndrome from DVT, arterial occlusion, neuropraxia, and complex regional pain syndrome",
      "Recognize that chronic exertional compartment syndrome (exercise-induced) is a non-emergent condition managed with rest, activity modification, or elective fasciotomy",
      "Coordinate multidisciplinary care: orthopedics, nephrology (if AKI develops), critical care (if systemic complications)",
      "Monitor for fasciotomy complications: wound infection, nerve damage during procedure, skin graft failure",
      "Prescribe thromboprophylaxis post-fasciotomy (LMWH) once hemostasis is achieved",
      "Order physical therapy consultation early for ROM exercises and contracture prevention",
      "Plan long-term follow-up for potential Volkmann contracture or chronic pain syndromes",
      "Document time of symptom onset, time of diagnosis, and time to fasciotomy for medicolegal purposes"
    ],
    signs: {
      left: [
        "Pain out of proportion to injury and unresponsive to appropriate analgesia (most sensitive)",
        "Pain on passive stretch of compartment muscles (most specific early sign)",
        "Paresthesia in distribution of nerves traversing the compartment",
        "Tense, woody feel of compartment on palpation",
        "Progressive loss of two-point discrimination"
      ],
      right: [
        "Compartment pressure >30 mmHg (absolute threshold)",
        "Delta pressure <30 mmHg (perfusion-adjusted threshold, preferred)",
        "CK >5,000 U/L (rhabdomyolysis developing)",
        "Myoglobinuria (cola-colored urine)",
        "Pulselessness and paralysis (very late; irreversible damage likely)"
      ]
    },
    medications: [
      { name: "IV Crystalloid (NS or LR)", type: "Volume resuscitation", action: "Expands intravascular volume, promotes renal perfusion, and dilutes myoglobin to prevent tubular obstruction", sideEffects: "Volume overload, dilutional coagulopathy, hyperchloremic acidosis (NS)", contra: "Decompensated heart failure (use with monitoring)", pearl: "Target UOP >200 mL/hr initially in rhabdomyolysis, then >100 mL/hr. LR is preferred over NS to avoid hyperchloremic acidosis, but both are acceptable." },
      { name: "Sodium Bicarbonate (IV)", type: "Alkalinizing agent", action: "Alkalinizes urine to pH >6.5, preventing myoglobin precipitation and cast formation in renal tubules", sideEffects: "Metabolic alkalosis, hypokalemia, hypocalcemia (ionized), sodium/fluid overload", contra: "Severe metabolic alkalosis, symptomatic hypocalcemia", pearl: "Add 150 mEq NaHCO3 to 1L D5W for continuous infusion. Monitor urine pH every 2 hours. Discontinue when CK is trending down and urine clears." },
      { name: "Calcium Gluconate (IV)", type: "Cardiac membrane stabilizer", action: "Stabilizes cardiac myocyte membrane potential, counteracting the depolarizing effect of hyperkalemia", sideEffects: "Bradycardia with rapid infusion, tissue necrosis with extravasation", contra: "Concurrent digoxin use (relative)", pearl: "First-line emergent treatment for hyperkalemia with ECG changes (peaked T waves, widened QRS). Give 10 mL of 10% solution over 2-3 minutes. Effect within minutes but temporary (30-60 min)." },
      { name: "Mannitol (IV)", type: "Osmotic diuretic", action: "Promotes osmotic diuresis, reduces compartment edema, and acts as a free radical scavenger", sideEffects: "Volume depletion, hypotension, rebound edema, acute kidney injury with high doses", contra: "Anuria, severe dehydration, active intracranial bleeding", pearl: "Some evidence supports use as adjunct to reduce compartment pressure and enhance myoglobin clearance. Not a substitute for fasciotomy. Use with adequate hydration." }
    ],
    pearls: [
      "Compartment syndrome is a CLINICAL diagnosis; pressure monitoring confirms but should not delay treatment when clinical suspicion is high",
      "The delta pressure (ΔP = diastolic BP - compartment pressure) <30 mmHg is more reliable than absolute pressure alone because it accounts for patient hemodynamics",
      "Fasciotomy must occur within 6 hours of symptom onset to prevent irreversible myonecrosis; after 12 hours, the risk of amputation and systemic complications rises dramatically",
      "Rhabdomyolysis can cause lethal hyperkalemia; check ECG and potassium immediately in any patient with confirmed compartment syndrome",
      "Chronic exertional compartment syndrome (exercise-induced) is a separate entity managed with activity modification and elective fasciotomy, not emergent intervention"
    ],
    quiz: [
      { question: "A patient with a tibial fracture has a compartment pressure of 42 mmHg and blood pressure of 110/70. What is the delta pressure and appropriate action?", options: ["ΔP = 28 mmHg; proceed with emergent fasciotomy", "ΔP = 68 mmHg; continue monitoring", "ΔP = 42 mmHg; recheck in 2 hours", "ΔP = 28 mmHg; elevate the limb and apply ice"], correct: 0, rationale: "ΔP = diastolic BP (70) - compartment pressure (42) = 28 mmHg. Since ΔP <30 mmHg, tissue perfusion is critically compromised and emergent fasciotomy is indicated." },
      { question: "Which laboratory finding is most concerning for acute kidney injury in a patient with compartment syndrome?", options: ["Elevated CRP", "CK of 15,000 U/L with dark brown urine", "Mild leukocytosis", "Elevated alkaline phosphatase"], correct: 1, rationale: "A markedly elevated CK with dark brown urine (myoglobinuria) indicates rhabdomyolysis, which can cause myoglobin-induced acute tubular necrosis and AKI. Aggressive IV hydration is required." },
      { question: "What is the first pharmacologic intervention for a patient with compartment syndrome-induced hyperkalemia showing peaked T waves on ECG?", options: ["IV insulin with dextrose", "IV calcium gluconate", "Oral kayexalate", "IV sodium bicarbonate"], correct: 1, rationale: "IV calcium gluconate is the first-line emergent treatment for hyperkalemia with ECG changes. It stabilizes the cardiac membrane within minutes, buying time for definitive potassium-lowering therapies." }
    ]
  },

  "rheumatoid-arthritis-rpn": {
    title: "Rheumatoid Arthritis: RPN Monitoring",
    cellular: {
      title: "Autoimmune Joint Inflammation",
      content: "Rheumatoid arthritis (RA) is a chronic, systemic autoimmune disorder characterized by inflammation and destruction of synovial joints. The immune system mistakenly attacks the synovial membrane, causing synovitis with pannus formation (thickened, inflamed synovial tissue). The pannus erodes cartilage, bone, and joint capsules, leading to progressive deformity and loss of function. RA typically affects the small joints of the hands and wrists symmetrically. The RPN monitors joint status, assists with comfort measures, administers medications as ordered, and reinforces joint protection strategies."
    },
    riskFactors: [
      "Female sex (3:1 female-to-male ratio)",
      "Age 30-60 years at onset",
      "Family history of RA or autoimmune disease",
      "Smoking (strongest modifiable risk factor)",
      "Genetic predisposition (HLA-DR4)",
      "Obesity",
      "Environmental exposures",
      "History of other autoimmune disorders"
    ],
    diagnostics: [
      "Assess and document joint swelling, warmth, and tenderness",
      "Monitor morning stiffness duration (typically >30 minutes in RA)",
      "Report changes in grip strength and functional ability",
      "Monitor vital signs and report fever",
      "Document pain levels and response to medications"
    ],
    management: [
      "Administer prescribed DMARDs and anti-inflammatory medications as ordered",
      "Apply warm compresses to stiff joints and cold compresses to acutely inflamed joints",
      "Encourage rest periods between activities to conserve energy",
      "Assist with ROM exercises as directed by physiotherapy",
      "Promote joint protection strategies: use larger joints for heavy tasks, avoid prolonged gripping",
      "Provide assistive devices as needed (jar openers, built-up utensils)"
    ],
    nursingActions: [
      "Perform bilateral joint assessment: swelling, erythema, warmth, deformity, and ROM",
      "Assess morning stiffness duration and functional impact on ADLs",
      "Administer methotrexate as ordered and monitor for side effects (GI upset, mouth sores)",
      "Reinforce the importance of medication adherence even during symptom-free periods",
      "Educate on joint protection principles: balance rest and activity, avoid repetitive motions",
      "Report signs of infection (fever, chills, sore throat) as immunosuppressive therapy increases infection risk"
    ],
    signs: {
      left: [
        "Bilateral symmetric joint swelling and stiffness",
        "Morning stiffness lasting >30 minutes",
        "Joint warmth and tenderness",
        "Fatigue and malaise"
      ],
      right: [
        "Swan neck deformity (hyperextension of PIP, flexion of DIP)",
        "Ulnar deviation of fingers",
        "Boutonnière deformity (flexion of PIP, extension of DIP)",
        "Rheumatoid nodules over bony prominences"
      ]
    },
    medications: [
      { name: "Methotrexate", type: "DMARD (disease-modifying antirheumatic drug)", action: "Inhibits folate-dependent immune cell proliferation, reducing synovial inflammation and slowing joint destruction", sideEffects: "Nausea, mouth sores, hepatotoxicity, bone marrow suppression, teratogenicity", contra: "Pregnancy, breastfeeding, significant hepatic or renal impairment, active infection", pearl: "Taken once weekly (not daily). Folic acid 1 mg daily is prescribed concurrently to reduce side effects. Report sore throat, fever, or unusual bruising immediately." },
      { name: "Naproxen", type: "NSAID", action: "Inhibits prostaglandin synthesis to reduce pain, inflammation, and stiffness", sideEffects: "GI bleeding, renal impairment, cardiovascular risk", contra: "Active GI bleed, renal failure, aspirin allergy", pearl: "Used for symptom relief but does not slow disease progression. Take with food to reduce GI effects." }
    ],
    pearls: [
      "Morning stiffness lasting >30 minutes is characteristic of RA; osteoarthritis stiffness typically resolves within 30 minutes",
      "RA affects joints symmetrically, unlike osteoarthritis which is often asymmetric",
      "Methotrexate is taken once weekly, not daily; daily dosing can be fatal",
      "Patients on immunosuppressive therapy should avoid live vaccines and report any signs of infection"
    ],
    quiz: [
      { question: "Which pattern of joint involvement is most characteristic of rheumatoid arthritis?", options: ["Unilateral large joint involvement", "Bilateral symmetric small joint involvement", "Single joint inflammation only", "Primarily spine and sacroiliac joints"], correct: 1, rationale: "Rheumatoid arthritis characteristically affects small joints (hands, wrists) in a bilateral, symmetric pattern, distinguishing it from osteoarthritis and other forms of arthritis." },
      { question: "A patient asks why they must continue taking methotrexate when they feel well. What is the best response?", options: ["You can stop when you feel better", "Methotrexate prevents joint damage even when symptoms are controlled", "It is only needed during flares", "You should take it daily for best results"], correct: 1, rationale: "Methotrexate is a disease-modifying drug that slows joint destruction regardless of symptom status. Stopping it can lead to disease flares and progressive joint damage." }
    ]
  },

  "rheumatoid-arthritis-rn": {
    title: "Rheumatoid Arthritis: RN Clinical Management",
    cellular: {
      title: "Pathophysiology of Autoimmune Synovitis",
      content: "Rheumatoid arthritis is driven by autoimmune activation of CD4+ T-helper cells that infiltrate the synovium and stimulate macrophages and B cells to produce pro-inflammatory cytokines (TNF-α, IL-1, IL-6) and autoantibodies (rheumatoid factor and anti-CCP antibodies). The resulting synovitis causes pannus formation, a destructive granulation tissue that erodes articular cartilage, subchondral bone, and periarticular structures. Progressive fibrosis of joint capsules causes characteristic deformities: swan neck, boutonnière, and ulnar deviation. Extra-articular manifestations include rheumatoid nodules, vasculitis, interstitial lung disease, pericarditis, and Felty syndrome (splenomegaly with neutropenia). The RN coordinates DMARD therapy monitoring, performs comprehensive musculoskeletal assessments, manages pain and fatigue, and educates on long-term disease management."
    },
    riskFactors: [
      "Female sex (3:1 ratio)",
      "Genetic susceptibility (HLA-DR4, shared epitope)",
      "Smoking (strongest environmental risk factor; increases anti-CCP formation)",
      "Age 30-60 years at onset (can occur at any age)",
      "Family history of RA",
      "Obesity (increases disease activity and reduces treatment response)",
      "Periodontal disease (association with Porphyromonas gingivalis)",
      "Silica and textile dust exposure"
    ],
    diagnostics: [
      "Assess bilateral joints systematically: swelling, warmth, tenderness, ROM, deformity, grip strength",
      "Review rheumatoid factor (RF) results: positive in 70-80% of RA patients but not specific",
      "Review anti-CCP (anti-cyclic citrullinated peptide) antibodies: more specific for RA and predicts erosive disease",
      "Monitor ESR and CRP as markers of disease activity",
      "Review CBC: monitor for anemia of chronic disease and DMARD-induced cytopenias",
      "Monitor LFTs and creatinine regularly during methotrexate therapy",
      "Review radiographic findings: joint space narrowing, periarticular erosions, osteopenia",
      "Administer and score disease activity tools (DAS28) to track treatment response"
    ],
    management: [
      "Initiate and monitor DMARD therapy per protocol (methotrexate is first-line)",
      "Administer biologic DMARDs (anti-TNF agents) as second-line or in combination with methotrexate",
      "Manage acute flares with short courses of NSAIDs or low-dose prednisone",
      "Coordinate with rheumatology for treatment escalation based on disease activity scores",
      "Apply heat for chronic stiffness (warm paraffin baths, warm packs) and cold for acute inflammation",
      "Refer to physical and occupational therapy for joint protection, ROM exercises, and splinting",
      "Monitor for extra-articular manifestations: pulmonary function, cardiac assessment, eye examination",
      "Administer flu and pneumococcal vaccines (killed vaccines safe; avoid live vaccines on immunosuppression)"
    ],
    nursingActions: [
      "Monitor methotrexate therapy: CBC, LFTs, and renal function at baseline, monthly for first 6 months, then every 1-3 months",
      "Educate patient on methotrexate safety: once-weekly dosing, folic acid supplementation, avoid alcohol, teratogenicity (contraception required)",
      "Screen for infections before and during biologic DMARD therapy (TB test, hepatitis B/C screening)",
      "Assess for signs of methotrexate toxicity: pancytopenia, hepatotoxicity, interstitial pneumonitis",
      "Implement fatigue management strategies: energy conservation, scheduled rest periods, pacing",
      "Coordinate splinting of inflamed joints during flares to reduce pain and prevent deformity",
      "Educate on joint protection: use assistive devices, avoid prolonged gripping, use larger joints for heavy tasks",
      "Screen for depression and psychosocial impact of chronic disease"
    ],
    signs: {
      left: [
        "Bilateral symmetric polyarthritis (MCP and PIP joints, wrists, MTPs)",
        "Morning stiffness lasting >1 hour",
        "Joint swelling (boggy synovitis on palpation)",
        "Decreased grip strength",
        "Fatigue, malaise, low-grade fever"
      ],
      right: [
        "Swan neck deformity (PIP hyperextension, DIP flexion)",
        "Boutonnière deformity (PIP flexion, DIP hyperextension)",
        "Ulnar deviation at MCP joints",
        "Rheumatoid nodules (subcutaneous, over olecranon, extensor surfaces)",
        "Extra-articular: dry eyes/mouth (secondary Sjögren), interstitial lung disease, pericarditis"
      ]
    },
    medications: [
      { name: "Methotrexate", type: "Conventional DMARD", action: "Inhibits dihydrofolate reductase, reducing inflammatory cell proliferation and cytokine production", sideEffects: "GI upset, oral ulcers, hepatotoxicity, bone marrow suppression, interstitial pneumonitis, teratogenicity", contra: "Pregnancy/nursing, significant hepatic disease, immunodeficiency, preexisting blood dyscrasias, CrCl <30", pearl: "Anchor drug for RA. Once weekly dosing (7.5-25 mg). Always co-prescribe folic acid 1 mg daily (except on methotrexate day). Monitor CBC and LFTs regularly." },
      { name: "Adalimumab (Humira)", type: "Biologic DMARD (anti-TNF-α)", action: "Monoclonal antibody that binds and neutralizes TNF-α, a key pro-inflammatory cytokine driving synovial inflammation", sideEffects: "Injection site reactions, increased infection risk (including reactivation TB), demyelinating disease, heart failure exacerbation", contra: "Active serious infection, latent untreated TB, heart failure NYHA III-IV", pearl: "Screen for latent TB and hepatitis B/C before starting. Often combined with methotrexate for superior efficacy. Educate patient on SQ injection technique and storage." },
      { name: "Hydroxychloroquine (Plaquenil)", type: "Conventional DMARD", action: "Inhibits antigen processing and presentation, reducing T-cell activation and cytokine production", sideEffects: "Retinal toxicity (bull's eye maculopathy), GI upset, skin pigmentation", contra: "Pre-existing retinal or visual field changes, G6PD deficiency", pearl: "Used for mild RA or in combination with methotrexate (triple therapy). Requires baseline and annual ophthalmologic examination for retinal toxicity after 5 years of use." },
      { name: "Prednisone", type: "Corticosteroid", action: "Potent anti-inflammatory and immunosuppressive; rapidly reduces synovial inflammation", sideEffects: "Hyperglycemia, osteoporosis, adrenal suppression, weight gain, infection risk, cataracts", contra: "Systemic fungal infection, uncontrolled diabetes", pearl: "Used as bridge therapy while waiting for DMARD effect (4-12 weeks). Goal is lowest effective dose for shortest duration. Always taper; never stop abruptly." }
    ],
    pearls: [
      "Treat-to-target: aim for remission or low disease activity within 6 months of diagnosis to prevent irreversible joint damage",
      "Methotrexate remains the cornerstone of RA treatment; biologic DMARDs are added when methotrexate alone is insufficient",
      "Anti-CCP antibodies are more specific than rheumatoid factor for RA and predict erosive disease and worse prognosis",
      "Extra-articular RA manifestations (ILD, vasculitis, Felty syndrome) indicate severe seropositive disease requiring aggressive therapy",
      "Triple therapy (methotrexate + sulfasalazine + hydroxychloroquine) is as effective as methotrexate + biologic for many patients"
    ],
    quiz: [
      { question: "Which laboratory test is most specific for rheumatoid arthritis?", options: ["Erythrocyte sedimentation rate (ESR)", "Rheumatoid factor (RF)", "Anti-CCP antibodies", "Antinuclear antibody (ANA)"], correct: 2, rationale: "Anti-CCP antibodies have ~95% specificity for RA, compared to ~80% for RF. They also predict erosive disease and worse outcomes." },
      { question: "A patient on methotrexate presents with fever, sore throat, and easy bruising. What is the priority nursing action?", options: ["Administer the next dose of methotrexate", "Hold methotrexate and obtain STAT CBC", "Increase folic acid supplementation", "Apply ice to the bruised areas"], correct: 1, rationale: "Fever, sore throat, and bruising suggest bone marrow suppression (pancytopenia) from methotrexate. The drug must be held immediately and a STAT CBC obtained to assess blood counts." },
      { question: "Which screening test is required before initiating anti-TNF therapy?", options: ["Tuberculin skin test or IGRA", "DEXA scan", "Echocardiogram", "Serum uric acid level"], correct: 0, rationale: "Anti-TNF agents can reactivate latent tuberculosis. All patients must be screened for TB (PPD or IGRA) and treated for latent infection before starting anti-TNF therapy." }
    ]
  },

  "rheumatoid-arthritis-np": {
    title: "Rheumatoid Arthritis: NP Prescriptive Management",
    cellular: {
      title: "Advanced Immunopathology and Targeted Therapy",
      content: "Rheumatoid arthritis pathogenesis involves complex interactions between genetic susceptibility (HLA-DR shared epitope), environmental triggers (smoking, periodontal pathogens), and immune dysregulation. Citrullination of self-proteins generates neoantigens recognized by autoreactive T cells, which activate B cells to produce anti-CCP antibodies and rheumatoid factor. These immune complexes deposit in synovium, activating complement and recruiting macrophages that release TNF-α, IL-1β, IL-6, and RANKL. TNF-α and IL-6 drive systemic inflammation, while RANKL activates osteoclasts causing periarticular erosions. The JAK-STAT signaling pathway amplifies cytokine-driven inflammation. Modern targeted therapies (anti-TNF, IL-6 inhibitors, JAK inhibitors, T-cell co-stimulation blockers, B-cell depletion) directly address these mechanisms. The NP prescribes and manages DMARD regimens, monitors for treatment toxicity and opportunistic infections, adjusts therapy based on disease activity scores, and manages comorbid cardiovascular and pulmonary complications."
    },
    riskFactors: [
      "HLA-DR4 shared epitope (strongest genetic risk factor)",
      "Smoking (dose-dependent risk; interacts with shared epitope to increase anti-CCP formation)",
      "Female sex (hormonal influence; onset often during perimenopause)",
      "First-degree relative with RA (3-5× increased risk)",
      "Periodontal disease (P. gingivalis produces PAD enzyme that citrullinates proteins)",
      "Obesity (increased adipokines contribute to systemic inflammation)",
      "Silica dust and textile fiber exposure",
      "History of prior autoimmune disease (thyroid disease, type 1 diabetes)"
    ],
    diagnostics: [
      "Order RF and anti-CCP antibodies for serologic classification (seropositive vs. seronegative RA)",
      "Order ESR and CRP to assess disease activity and monitor treatment response",
      "Order CBC with differential: anemia of chronic disease, DMARD-induced leukopenia/thrombocytopenia",
      "Order CMP: creatinine (renal function for drug dosing), LFTs (methotrexate/leflunomide monitoring)",
      "Order radiographs of hands and feet at baseline and periodically to assess for erosive disease progression",
      "Consider musculoskeletal ultrasound for detecting subclinical synovitis and early erosions",
      "Calculate DAS28 (Disease Activity Score using 28 joints) at each visit to guide treat-to-target decisions",
      "Order screening tests before biologic therapy: TB (PPD or IGRA), hepatitis B/C serologies, CBC"
    ],
    management: [
      "Prescribe methotrexate 15-25 mg weekly (oral or SQ) as anchor DMARD with folic acid 1 mg daily",
      "If inadequate response at 3-6 months, add biologic DMARD: adalimumab 40 mg SQ q2wks or etanercept 50 mg SQ weekly",
      "Alternative: triple conventional DMARD therapy (methotrexate + sulfasalazine 1g BID + hydroxychloroquine 200 mg BID)",
      "Prescribe tofacitinib 5 mg BID (JAK inhibitor) for biologic-failure patients (with cardiovascular/VTE risk assessment)",
      "Prescribe rituximab (anti-CD20 B-cell depletion) for refractory seropositive RA failing anti-TNF therapy",
      "Use prednisone 5-10 mg/day as bridge therapy during DMARD titration; taper within 3 months",
      "Order intra-articular triamcinolone (20-40 mg) for persistent monoarticular synovitis despite systemic therapy",
      "Manage cardiovascular risk aggressively (RA is independent CV risk factor equivalent to diabetes)"
    ],
    nursingActions: [
      "Implement treat-to-target strategy: achieve remission (DAS28 <2.6) or low disease activity (DAS28 <3.2) within 6 months",
      "Monitor methotrexate safety labs (CBC, LFTs, creatinine) monthly for 6 months then every 1-3 months",
      "Screen for latent TB before every biologic initiation (not just the first one)",
      "Monitor for biologic-specific adverse effects: anti-TNF (infections, demyelination, HF exacerbation), IL-6 inhibitors (lipid elevation, GI perforation), JAK inhibitors (VTE, malignancy, herpes zoster)",
      "Prescribe and monitor bone protection (DEXA, calcium, vitamin D) for patients on chronic glucocorticoids",
      "Coordinate pulmonary evaluation for methotrexate-induced pneumonitis or RA-associated ILD",
      "Assess for Felty syndrome (RA + splenomegaly + neutropenia) and manage infection risk",
      "Screen for and manage comorbidities: depression, osteoporosis, cardiovascular disease, cervical spine instability (atlantoaxial subluxation)"
    ],
    signs: {
      left: [
        "Symmetric polyarthritis predominantly in MCP, PIP joints, wrists, and MTPs",
        "Morning stiffness >1 hour (correlates with disease activity)",
        "Boggy synovial swelling on palpation",
        "Decreased grip strength and functional decline",
        "Systemic symptoms: fatigue, low-grade fever, weight loss"
      ],
      right: [
        "Joint deformities: swan neck, boutonnière, ulnar deviation, Z-thumb",
        "Rheumatoid nodules (20-30% of seropositive patients)",
        "Atlantoaxial instability (C1-C2 subluxation: assess before intubation)",
        "Extra-articular: ILD (usual interstitial pneumonia pattern), pericarditis, scleritis, vasculitis",
        "Felty syndrome: RA + splenomegaly + neutropenia"
      ]
    },
    medications: [
      { name: "Methotrexate", type: "Anchor DMARD", action: "Inhibits dihydrofolate reductase and aminoimidazole carboxamide ribonucleotide transformylase (AICAR), reducing inflammatory cell proliferation and increasing adenosine (anti-inflammatory)", sideEffects: "Hepatotoxicity, bone marrow suppression, interstitial pneumonitis, oral ulcers, teratogenicity", contra: "Pregnancy (Category X), severe hepatic/renal disease, immunodeficiency, alcoholism, blood dyscrasias", pearl: "Start 15 mg/week, titrate to 25 mg/week. SQ route has better bioavailability at doses >15 mg. Co-prescribe folic acid 1 mg daily. Check pre-treatment hepatitis B/C. Drug holiday before planned conception (3 months for men, 1 ovulatory cycle for women)." },
      { name: "Tofacitinib (Xeljanz)", type: "JAK inhibitor (targeted synthetic DMARD)", action: "Selectively inhibits JAK1 and JAK3, blocking intracellular signaling of multiple pro-inflammatory cytokines (IL-6, IL-12, IL-23, IFN-γ)", sideEffects: "Increased infection risk (herpes zoster), VTE/PE, MACE (cardiovascular events), malignancy risk, lipid elevation, GI perforation", contra: "Active serious infection, severe hepatic impairment, lymphocyte count <500", pearl: "FDA black box warning for serious infections, malignancy, cardiovascular events, and VTE. Assess cardiovascular risk factors before prescribing. Consider herpes zoster vaccination before starting. Reserve for biologic-failure patients per updated guidelines." },
      { name: "Rituximab (Rituxan)", type: "Anti-CD20 monoclonal antibody (biologic DMARD)", action: "Depletes CD20+ B cells, reducing autoantibody production and B-cell-mediated antigen presentation to T cells", sideEffects: "Infusion reactions, progressive multifocal leukoencephalopathy (PML; rare), infection, hepatitis B reactivation", contra: "Active severe infections, severe immunodeficiency", pearl: "Two 1000 mg IV infusions 2 weeks apart, repeated every 6-12 months based on disease activity. Most effective in seropositive (RF+/anti-CCP+) RA. Pre-medicate with methylprednisolone, acetaminophen, diphenhydramine." },
      { name: "Tocilizumab (Actemra)", type: "IL-6 receptor antagonist (biologic DMARD)", action: "Blocks IL-6 receptor signaling, reducing CRP, ESR, and systemic inflammation; suppresses hepatic acute phase response", sideEffects: "Infections, hepatotoxicity, neutropenia, hyperlipidemia, GI perforation (especially with concurrent corticosteroids and diverticulitis)", contra: "Active serious infection, ANC <2000, platelets <100,000, ALT >1.5× ULN", pearl: "Unique among biologics: can be used as monotherapy (most biologics require methotrexate combination). IV 8 mg/kg monthly or SQ 162 mg weekly. CRP and ESR are suppressed and cannot be used to monitor disease activity; rely on clinical assessment." }
    ],
    pearls: [
      "Early aggressive treatment (within 3-6 months of diagnosis) is critical to prevent irreversible joint erosion; this is the 'window of opportunity'",
      "Methotrexate remains the anchor drug; biologics and JAK inhibitors are added to methotrexate, not substituted for it (except tocilizumab monotherapy)",
      "Seropositive RA (RF+ and/or anti-CCP+) has worse prognosis with more erosive disease and extra-articular manifestations than seronegative RA",
      "RA confers cardiovascular risk equivalent to diabetes mellitus; manage lipids, BP, and smoking aggressively",
      "Cervical spine (C1-C2) instability from atlantoaxial subluxation requires flexion-extension radiographs before any intubation or surgical procedure"
    ],
    quiz: [
      { question: "Which treat-to-target goal should guide DMARD therapy adjustment in RA?", options: ["Normalize ESR only", "Achieve DAS28 remission (<2.6) or low disease activity (<3.2) within 6 months", "Eliminate all joint pain", "Normalize rheumatoid factor levels"], correct: 1, rationale: "The ACR/EULAR treat-to-target strategy uses composite disease activity scores (DAS28) to guide treatment. The goal is remission (DAS28 <2.6) or low disease activity (DAS28 <3.2) within 6 months." },
      { question: "Before prescribing tofacitinib for RA, which risk assessment is most important?", options: ["Bone density screening", "Cardiovascular and VTE risk assessment", "Pulmonary function testing", "Thyroid function testing"], correct: 1, rationale: "Tofacitinib (JAK inhibitor) carries FDA black box warnings for MACE, VTE/PE, malignancy, and serious infections. Cardiovascular and thromboembolic risk must be assessed before prescribing." },
      { question: "An RA patient on methotrexate and adalimumab develops a productive cough and fever. What is the priority action?", options: ["Increase methotrexate dose for better disease control", "Hold both immunosuppressants and evaluate for infection", "Add prednisone for anti-inflammatory coverage", "Switch to a different biologic"], correct: 1, rationale: "Productive cough and fever in a patient on dual immunosuppression (methotrexate + anti-TNF) requires immediate evaluation for infection, including opportunistic infections such as TB and pneumocystis. Both drugs should be held pending workup." }
    ]
  }
};
