import { getAssetUrl } from "@/lib/asset-url";
import type { LessonContent } from "./types";
const imgGravesDisease = getAssetUrl("graves_1773374861631.png");
const imgGuillainBarre = getAssetUrl("guillainbarrre_1773374861631.png");

export const generatedBatch041Lessons: Record<string, LessonContent> = {
  "gout-management": {
    title: "Gout",
    cellular: { title: "Urate Crystal Arthropathy", content: "Gout is a crystalline arthropathy caused by the deposition of monosodium urate (MSU) crystals in joints and soft tissues when serum uric acid exceeds its saturation point (approximately 6.8 mg/dL). Uric acid is the end product of purine metabolism, produced by xanthine oxidase in the liver and excreted primarily by the kidneys (70%) and intestines (30%). MSU crystals activate the NLRP3 inflammasome in tissue macrophages, triggering interleukin-1β release and a potent neutrophilic inflammatory response characterized by severe joint pain, erythema, warmth, and swelling — classically affecting the first metatarsophalangeal joint (podagra)." },
    riskFactors: ["Hyperuricemia (serum uric acid > 6.8 mg/dL)", "Male sex (peak incidence age 40–60)", "Obesity and metabolic syndrome", "High-purine diet (red meat, organ meats, shellfish)", "Alcohol use — especially beer and spirits", "Chronic kidney disease (decreased urate excretion)", "Thiazide or loop diuretic use", "Low-dose aspirin therapy"],
    diagnostics: ["Synovial fluid analysis showing negatively birefringent needle-shaped MSU crystals under polarized light (gold standard)", "Serum uric acid level (may be normal during acute flare)", "Elevated ESR and CRP during acute attack", "CBC showing leukocytosis during flare", "Joint X-ray (punched-out erosions with overhanging edges in chronic gout)", "Dual-energy CT (DECT) for tophi detection in equivocal cases", "Renal function panel (BUN, creatinine) to assess excretion capacity"],
    management: ["Acute flare: NSAIDs (indomethacin, naproxen) first-line within 24 hours of onset", "Colchicine for acute flare if started within 36 hours (low-dose regimen preferred)", "Corticosteroids (oral prednisone or intra-articular injection) when NSAIDs/colchicine contraindicated", "Ice application to affected joint during acute flare", "Dietary modification: limit purine-rich foods, alcohol, and fructose-sweetened beverages", "Encourage hydration to promote uric acid excretion", "Urate-lowering therapy (allopurinol or febuxostat) initiated after flare resolution for recurrent gout"],
    nursingActions: ["Assess affected joint(s) for erythema, warmth, swelling, and tenderness", "Administer prescribed anti-inflammatory medications promptly during acute flare", "Elevate and protect the affected joint — avoid pressure from bed linens (use a cradle)", "Monitor renal function and uric acid levels as ordered", "Educate patient on dietary triggers (purines, alcohol, fructose)", "Assess for contraindications before administering NSAIDs (GI bleeding, renal impairment)", "Monitor for colchicine toxicity (diarrhea, nausea, abdominal cramping)"],
    assessmentFindings: ["Acute monoarticular joint inflammation — classically first MTP (podagra)", "Severe pain with inability to bear weight", "Joint erythema, warmth, and marked swelling", "Low-grade fever during acute attack", "Tophi (chalky subcutaneous urate deposits) on ears, fingers, elbows in chronic disease", "Restricted range of motion of affected joint", "History of recurrent episodic joint attacks with symptom-free intervals"],
    signs: {
      left: ["Monoarticular joint pain (podagra)", "Joint erythema and warmth", "Elevated serum uric acid", "Tophi on ears or digits (chronic)"],
      right: ["Excruciating pain preventing any joint contact", "Fever and systemic inflammatory response", "Renal calculi (uric acid stones)", "Joint destruction with chronic erosions"]
    },
    medications: [{
      name: "Colchicine",
      type: "Anti-inflammatory (microtubule inhibitor)",
      action: "Inhibits neutrophil migration and NLRP3 inflammasome activation, reducing MSU crystal-induced inflammation",
      sideEffects: "Diarrhea, nausea, abdominal cramping, bone marrow suppression at high doses",
      contra: "Severe renal or hepatic impairment, concurrent strong CYP3A4 inhibitors (clarithromycin)",
      pearl: "Low-dose regimen (1.2 mg then 0.6 mg one hour later) is as effective and better tolerated than high-dose; must start within 36 hours of flare onset"
    }, {
      name: "Allopurinol",
      type: "Xanthine oxidase inhibitor",
      action: "Blocks xanthine oxidase enzyme, reducing uric acid production from purines",
      sideEffects: "Rash (including severe DRESS/SJS — screen HLA-B*5801 in high-risk populations), GI upset, hepatotoxicity",
      contra: "Known HLA-B*5801 positive status, concurrent azathioprine or mercaptopurine",
      pearl: "Start low (100 mg/day), titrate to target uric acid < 6 mg/dL; always co-prescribe flare prophylaxis (colchicine or NSAID) for first 3–6 months of ULT"
    }],
    pearls: ["Joint aspiration with polarized microscopy showing negatively birefringent needle-shaped crystals is the definitive diagnosis", "Serum uric acid may be NORMAL during an acute flare — do not rule out gout based on normal levels", "Never start or stop urate-lowering therapy during an acute flare — it worsens the attack", "Use a bed cradle to keep linens off the exquisitely tender joint", "Screen for HLA-B*5801 before starting allopurinol in Southeast Asian, African American, and Korean patients"],
    quiz: [
      {
        question: "A patient presents with sudden onset of excruciating pain, redness, and swelling in the first toe. Which diagnostic finding confirms gout?",
        options: ["Elevated serum uric acid level", "Positively birefringent crystals on joint aspiration", "Negatively birefringent needle-shaped crystals on polarized microscopy", "Elevated ESR and CRP"],
        correct: 2,
        rationale: "Negatively birefringent needle-shaped monosodium urate crystals under polarized light microscopy of synovial fluid are the gold standard for confirming gout diagnosis."
      },
      {
        question: "Which nursing intervention is most important during an acute gout flare?",
        options: ["Initiate allopurinol to lower uric acid quickly", "Apply a bed cradle and administer prescribed anti-inflammatory medications", "Apply heat to the affected joint", "Encourage high-protein diet to promote healing"],
        correct: 1,
        rationale: "During an acute flare, the joint is exquisitely tender. A bed cradle prevents linen pressure, and anti-inflammatory medications (NSAIDs, colchicine, or corticosteroids) reduce the inflammatory response. Allopurinol should never be started during an acute flare."
      },
      {
        question: "A patient on allopurinol develops a widespread maculopapular rash and fever. What is the priority action?",
        options: ["Continue the medication and monitor", "Hold allopurinol and notify the provider immediately", "Administer diphenhydramine and continue allopurinol", "Increase fluid intake and reassess in 24 hours"],
        correct: 1,
        rationale: "Rash and fever on allopurinol may indicate severe hypersensitivity (DRESS syndrome or Stevens-Johnson syndrome), which can be fatal. The drug must be held immediately and the provider notified."
      }
    ]
  },
  "gout-pharmacologic-management-np": {
    title: "Gout Pharmacologic Management: ULT & Flare Prophylaxis",
    cellular: { title: "Urate-Lowering Pharmacology", content: "Gout pharmacotherapy targets two distinct phases: acute flare management and long-term urate-lowering therapy (ULT). During acute flares, MSU crystal-triggered NLRP3 inflammasome activation drives IL-1β–mediated neutrophilic inflammation; therapy aims to suppress this response with colchicine, NSAIDs, or corticosteroids. Long-term ULT reduces serum urate below 6 mg/dL (target < 5 mg/dL in tophaceous gout) to dissolve existing crystal deposits and prevent new formation. Xanthine oxidase inhibitors (allopurinol, febuxostat) decrease urate production, while uricosuric agents (probenecid, lesinurad) enhance renal excretion by blocking URAT1 transporters. Pegloticase, a recombinant uricase, converts urate to allantoin in refractory cases. ULT initiation paradoxically mobilizes crystals and triggers flares; therefore, concurrent prophylaxis with low-dose colchicine (0.6 mg daily) or an NSAID is required for the first 3–6 months." },
    riskFactors: ["Chronic hyperuricemia (serum urate > 6.8 mg/dL sustained)", "Recurrent gout flares (≥ 2/year indication for ULT)", "Tophaceous deposits", "Chronic kidney disease (CKD stage ≥ 2)", "Uric acid nephrolithiasis", "Diuretic-induced hyperuricemia (thiazides, loop diuretics)", "Myeloproliferative or lymphoproliferative disorders (tumor lysis risk)", "Organ transplant recipients on calcineurin inhibitors"],
    diagnostics: ["Serum uric acid level — target < 6 mg/dL (< 5 mg/dL if tophi present)", "24-hour urine uric acid to classify overproduction (> 800 mg/day) vs. underexcretion", "Renal function panel (eGFR) for dose adjustments of allopurinol and colchicine", "Hepatic function panel before febuxostat initiation", "HLA-B*5801 genotyping before allopurinol in at-risk populations (SE Asian, African American, Korean)", "Dual-energy CT for tophi burden quantification in refractory disease", "CBC with differential during colchicine therapy (bone marrow suppression risk)"],
    management: ["Start allopurinol 100 mg/day (50 mg in CKD stage ≥ 3) and titrate every 2–4 weeks to urate target", "Febuxostat 40–80 mg/day as second-line XOI if allopurinol intolerant (FDA boxed warning: cardiovascular risk)", "Probenecid for underexcretors with eGFR > 50 and no nephrolithiasis history", "Pegloticase IV infusion q2 weeks for refractory tophaceous gout (pre-medicate for infusion reactions)", "Flare prophylaxis: colchicine 0.6 mg daily or BID for minimum 3–6 months after ULT initiation", "Losartan or fenofibrate as adjunctive urate-lowering agents when comorbidities align", "Switch from hydrochlorothiazide to losartan when feasible (uricosuric antihypertensive)"],
    nursingActions: ["Educate patient that ULT initiation may trigger flares initially — emphasize adherence", "Monitor serum urate levels every 2–4 weeks during dose titration", "Assess for allopurinol hypersensitivity: rash, fever, eosinophilia, hepatitis (DRESS syndrome)", "Monitor cardiovascular status in patients on febuxostat (increased CV event risk)", "Assess renal function before and during colchicine therapy — reduce dose in CKD", "Screen for drug interactions: colchicine with CYP3A4 inhibitors (clarithromycin, cyclosporine)", "Educate on lifestyle modifications: limit alcohol, purine-rich foods, and fructose intake"],
    assessmentFindings: ["Frequency and severity of gout flares before and after ULT initiation", "Tophi size reduction as measure of ULT effectiveness", "Serum urate trending toward target (< 6 mg/dL)", "Renal function changes during therapy", "Signs of allopurinol hypersensitivity (rash, mucosal involvement, systemic symptoms)", "GI tolerance of colchicine (diarrhea is dose-limiting)", "Cardiovascular symptoms in patients on febuxostat"],
    signs: {
      left: ["Serum urate at or below target", "Decreasing flare frequency", "Tophus regression on exam", "Stable renal function on ULT"],
      right: ["Paradoxical flare during ULT initiation", "Severe rash/fever on allopurinol (DRESS/SJS)", "Pegloticase infusion reaction (chest tightness, flushing)", "Colchicine toxicity (profuse diarrhea, cytopenias)"]
    },
    medications: [{
      name: "Allopurinol",
      type: "Xanthine oxidase inhibitor",
      action: "Blocks conversion of hypoxanthine to xanthine and xanthine to uric acid, reducing serum urate production",
      sideEffects: "Rash (2%), DRESS/SJS (rare but life-threatening), GI upset, elevated LFTs",
      contra: "HLA-B*5801 positive, concurrent azathioprine/mercaptopurine (blocks metabolism → bone marrow suppression)",
      pearl: "Start low (100 mg/day), go slow (titrate q2–4 weeks); always co-prescribe flare prophylaxis; screen HLA-B*5801 in high-risk ethnicities"
    }, {
      name: "Febuxostat",
      type: "Non-purine xanthine oxidase inhibitor",
      action: "Selectively inhibits xanthine oxidase without affecting other purine/pyrimidine enzymes",
      sideEffects: "Cardiovascular events (FDA boxed warning), elevated LFTs, nausea, arthralgias",
      contra: "Concurrent azathioprine/mercaptopurine, severe heart failure",
      pearl: "Reserve for patients intolerant to allopurinol; CARES trial showed increased CV mortality vs. allopurinol — use with caution in patients with established CVD"
    }],
    pearls: ["Always co-prescribe flare prophylaxis (colchicine or NSAID) when starting ULT — mobilized crystals trigger attacks", "Titrate-to-target: adjust ULT dose every 2–4 weeks until serum urate < 6 mg/dL", "HLA-B*5801 screening before allopurinol is standard of care in Southeast Asian, African American, and Korean populations", "Febuxostat carries an FDA boxed warning for cardiovascular mortality — prefer allopurinol as first-line", "Pegloticase requires anti-drug antibody monitoring — loss of urate-lowering effect signals antibody formation and increased infusion reaction risk"],
    quiz: [
      {
        question: "When initiating allopurinol for chronic gout, which concurrent medication is essential?",
        options: ["Azathioprine for immune modulation", "Colchicine 0.6 mg daily for flare prophylaxis", "Hydrochlorothiazide for blood pressure control", "Febuxostat as combination ULT"],
        correct: 1,
        rationale: "ULT initiation mobilizes urate crystals and paradoxically triggers flares. Concurrent prophylaxis with low-dose colchicine (or NSAID) for 3–6 months is required to prevent mobilization flares."
      },
      {
        question: "A patient of Korean descent is prescribed allopurinol. What must be done before starting therapy?",
        options: ["Obtain a 24-hour urine collection", "Screen for HLA-B*5801 genotype", "Start febuxostat concurrently", "Order a dual-energy CT scan"],
        correct: 1,
        rationale: "HLA-B*5801 is strongly associated with allopurinol hypersensitivity (DRESS/SJS). Screening is mandatory in high-risk populations including Korean, Southeast Asian, and African American patients."
      },
      {
        question: "Which finding during febuxostat therapy requires immediate provider notification?",
        options: ["Serum urate level of 5.5 mg/dL", "New-onset chest pain or dyspnea", "Mild nausea after dose", "Decreased gout flare frequency"],
        correct: 1,
        rationale: "Febuxostat carries an FDA boxed warning for increased cardiovascular mortality. New chest pain or dyspnea may indicate an acute cardiovascular event requiring urgent evaluation."
      }
    ]
  },
  "gpa-rn": {
    title: "Granulomatosis with Polyangiitis (GPA)",
    cellular: { title: "ANCA-Associated Vasculitis", content: "Granulomatosis with polyangiitis (GPA, formerly Wegener granulomatosis) is an ANCA-associated small-vessel vasculitis characterized by necrotizing granulomatous inflammation affecting the upper respiratory tract, lungs, and kidneys. Cytoplasmic ANCA (c-ANCA) directed against proteinase-3 (PR3) activates neutrophils, causing them to adhere to endothelial cells, degranulate, and release reactive oxygen species and proteolytic enzymes that destroy vessel walls. The classic triad includes upper airway disease (sinusitis, saddle-nose deformity, subglottic stenosis), pulmonary involvement (nodules, cavitary lesions, diffuse alveolar hemorrhage), and rapidly progressive glomerulonephritis with crescent formation." },
    riskFactors: ["Age 40–65 years (peak incidence)", "Northern European descent", "Preceding upper respiratory infection (potential trigger)", "Environmental exposures (silica, agricultural chemicals)", "Genetic susceptibility (HLA-DPB1 associations)", "Male sex (slightly higher incidence)"],
    diagnostics: ["c-ANCA/PR3 antibody titer (positive in ~90% of generalized GPA)", "Urinalysis showing hematuria, proteinuria, and RBC casts (glomerulonephritis)", "Serum creatinine and BUN for renal function monitoring", "Chest X-ray or CT showing pulmonary nodules or cavitary lesions", "Tissue biopsy (lung, kidney, or nasal) showing necrotizing granulomatous vasculitis", "ESR and CRP (markedly elevated during active disease)", "CBC showing anemia of chronic disease and leukocytosis"],
    management: ["Remission induction: rituximab or cyclophosphamide with high-dose corticosteroids", "Remission maintenance: rituximab, azathioprine, or methotrexate for ≥ 2 years", "Corticosteroid taper over 3–6 months once remission achieved", "Plasmapheresis for severe renal involvement or diffuse alveolar hemorrhage", "Trimethoprim-sulfamethoxazole for PCP prophylaxis during immunosuppression", "Renal replacement therapy (dialysis) if ESRD develops", "Subglottic stenosis management: dilation or intralesional corticosteroid injection"],
    nursingActions: ["Monitor respiratory status closely — assess for hemoptysis (alveolar hemorrhage)", "Monitor strict I&O and daily weights for renal function trending", "Assess for signs of infection (immunosuppressed patients at high risk)", "Administer cyclophosphamide with aggressive hydration and mesna to prevent hemorrhagic cystitis", "Monitor CBC for cytopenias during immunosuppressive therapy", "Assess nasal passages for crusting, bleeding, or septal perforation", "Educate patient on infection prevention measures during immunosuppression"],
    assessmentFindings: ["Chronic sinusitis unresponsive to antibiotics", "Nasal crusting, epistaxis, or saddle-nose deformity", "Hemoptysis or dyspnea (pulmonary involvement)", "Hematuria and decreased urine output (glomerulonephritis)", "Purpura or skin ulceration (cutaneous vasculitis)", "Joint pain and myalgias", "Constitutional symptoms: fever, fatigue, weight loss"],
    signs: {
      left: ["Chronic sinusitis and nasal crusting", "Arthralgias and myalgias", "Positive c-ANCA/PR3 titer", "Pulmonary nodules on imaging"],
      right: ["Massive hemoptysis (alveolar hemorrhage)", "Rapidly progressive renal failure", "Subglottic stenosis with stridor", "Saddle-nose deformity from cartilage destruction"]
    },
    medications: [{
      name: "Rituximab",
      type: "Anti-CD20 monoclonal antibody",
      action: "Depletes B lymphocytes that produce pathogenic ANCA antibodies, suppressing the autoimmune vasculitic process",
      sideEffects: "Infusion reactions, progressive multifocal leukoencephalopathy (PML, rare), hepatitis B reactivation, hypogammaglobulinemia",
      contra: "Active severe infections, hepatitis B without prophylaxis, PML history",
      pearl: "Now preferred over cyclophosphamide for remission induction (RAVE trial) due to comparable efficacy and fewer long-term toxicities (no bladder cancer or infertility risk)"
    }, {
      name: "Cyclophosphamide",
      type: "Alkylating immunosuppressant",
      action: "Crosslinks DNA in rapidly dividing immune cells, suppressing the autoimmune response",
      sideEffects: "Hemorrhagic cystitis, bone marrow suppression, infertility, bladder cancer risk",
      contra: "Active infection, pregnancy, severe bone marrow suppression",
      pearl: "Always co-administer mesna and aggressive hydration to prevent hemorrhagic cystitis; limit cumulative dose to reduce bladder cancer risk"
    }],
    pearls: ["Classic triad: upper airway + lungs + kidneys — think GPA when sinusitis doesn't respond to antibiotics", "c-ANCA (anti-PR3) is highly specific for GPA — p-ANCA (anti-MPO) suggests microscopic polyangiitis", "Saddle-nose deformity from nasal cartilage destruction is a hallmark late finding", "Rituximab is now first-line for induction (RAVE trial) — cyclophosphamide is the alternative", "Monitor for cyclophosphamide-induced hemorrhagic cystitis: maintain high fluid intake and administer mesna"],
    quiz: [
      {
        question: "A patient with GPA is receiving cyclophosphamide. Which nursing intervention prevents a common complication of this drug?",
        options: ["Restrict fluid intake to prevent edema", "Administer mesna and encourage high fluid intake", "Apply compression stockings bilaterally", "Administer calcium supplements with each dose"],
        correct: 1,
        rationale: "Cyclophosphamide metabolites (acrolein) are toxic to the bladder epithelium, causing hemorrhagic cystitis. Mesna binds acrolein in the urine, and aggressive hydration dilutes toxic metabolites."
      },
      {
        question: "Which laboratory finding is most specific for GPA?",
        options: ["Elevated ESR", "Positive ANA", "Positive c-ANCA (anti-PR3 antibodies)", "Elevated serum IgE"],
        correct: 2,
        rationale: "Cytoplasmic ANCA directed against proteinase-3 (c-ANCA/PR3) is highly specific for GPA, present in approximately 90% of patients with generalized disease."
      }
    ]
  },
  "graft-vs-host-disease-np": {
    title: "Graft-Versus-Host Disease: Acute & Chronic Staging",
    cellular: { title: "Donor T-Cell Alloreactivity", content: "Graft-versus-host disease (GVHD) occurs when immunocompetent donor T lymphocytes from allogeneic hematopoietic stem cell transplant (allo-HSCT) recognize host tissues as foreign and mount an immune attack. In acute GVHD (typically < 100 days post-transplant), donor CD4+ and CD8+ T cells are activated by host antigen-presenting cells displaying mismatched HLA antigens, triggering a cytokine storm (TNF-α, IL-1, IFN-γ) that damages three primary target organs: skin (maculopapular rash), liver (cholestatic hepatitis with rising bilirubin), and GI tract (secretory diarrhea, abdominal pain, GI bleeding). Chronic GVHD (> 100 days) resembles autoimmune and fibrotic diseases with sclerodermatous skin changes, sicca syndrome, bronchiolitis obliterans, and fascial involvement. Staging uses the Glucksberg criteria (acute) or NIH consensus criteria (chronic) to guide immunosuppressive management intensity." },
    riskFactors: ["HLA mismatch between donor and recipient", "Unrelated or mismatched related donor", "Peripheral blood stem cell source (higher T-cell content vs. cord blood)", "Older recipient age", "Female donor to male recipient (minor histocompatibility antigen mismatch)", "Prior acute GVHD (risk for chronic GVHD)", "Inadequate GVHD prophylaxis regimen", "CMV serostatus mismatch"],
    diagnostics: ["Skin biopsy showing apoptotic keratinocytes at the dermal-epidermal junction (acute)", "Liver function tests: elevated conjugated bilirubin and alkaline phosphatase", "Stool volume quantification (> 500 mL/day = stage 2 GI GVHD)", "Upper and lower GI endoscopy with biopsy for GI involvement", "Pulmonary function tests showing obstructive pattern (bronchiolitis obliterans in chronic GVHD)", "Schirmer test for sicca syndrome in chronic GVHD", "NIH global severity scoring (mild, moderate, severe) for chronic GVHD"],
    management: ["First-line: systemic corticosteroids (methylprednisolone 2 mg/kg/day for acute GVHD)", "Steroid-refractory acute GVHD: ruxolitinib (FDA-approved JAK1/2 inhibitor)", "GVHD prophylaxis: calcineurin inhibitor (tacrolimus or cyclosporine) + methotrexate or mycophenolate", "Chronic GVHD first-line: prednisone ± calcineurin inhibitor", "Steroid-refractory chronic GVHD: ibrutinib, ruxolitinib, or belumosudil", "Extracorporeal photopheresis for skin-predominant chronic GVHD", "Supportive: aggressive infection prophylaxis (antifungal, antiviral, PCP prophylaxis)"],
    nursingActions: ["Perform daily skin assessment documenting rash extent (% BSA) and stage progression", "Monitor stool output volume and consistency — report watery diarrhea > 500 mL/day", "Track daily liver function trends (bilirubin, AST, ALT, alkaline phosphatase)", "Administer immunosuppressive medications on strict schedule — monitor trough levels for tacrolimus/cyclosporine", "Implement strict infection prevention (neutropenic precautions, hand hygiene, dietary restrictions)", "Assess for steroid side effects: hyperglycemia, mood changes, myopathy, osteoporosis", "Coordinate multidisciplinary care: dermatology, hepatology, pulmonology, ophthalmology"],
    assessmentFindings: ["Maculopapular rash (may progress to bullous desquamation in severe acute GVHD)", "Profuse watery or bloody diarrhea with abdominal cramping", "Jaundice and hepatomegaly", "Sclerodermatous or lichenoid skin changes (chronic GVHD)", "Dry eyes and mouth (sicca syndrome)", "Dyspnea on exertion with air trapping (bronchiolitis obliterans)", "Oral mucosal ulceration and difficulty swallowing"],
    signs: {
      left: ["Maculopapular rash on palms and soles", "Mild diarrhea (< 500 mL/day)", "Elevated bilirubin (2–3 mg/dL)", "Lichenoid oral mucosal changes"],
      right: ["Bullous skin desquamation (> 50% BSA)", "Profuse bloody diarrhea with ileus", "Severe cholestatic hepatitis (bilirubin > 15 mg/dL)", "Respiratory failure from bronchiolitis obliterans"]
    },
    medications: [{
      name: "Ruxolitinib",
      type: "JAK1/JAK2 inhibitor",
      action: "Inhibits Janus kinase signaling that drives T-cell activation and cytokine-mediated tissue damage in GVHD",
      sideEffects: "Cytopenias (anemia, thrombocytopenia), increased infection risk, reactivation of CMV/EBV",
      contra: "Severe thrombocytopenia, active uncontrolled infection",
      pearl: "FDA-approved for steroid-refractory acute GVHD (REACH2 trial); superior response rate vs. best available therapy; monitor CBC closely"
    }, {
      name: "Tacrolimus",
      type: "Calcineurin inhibitor",
      action: "Binds FKBP12, inhibiting calcineurin-mediated T-cell activation and IL-2 production to prevent GVHD",
      sideEffects: "Nephrotoxicity, neurotoxicity (tremor, seizures), hyperglycemia, hypertension, hyperkalemia",
      contra: "Concurrent use with cyclosporine, uncontrolled hypertension",
      pearl: "Monitor trough levels (target 5–15 ng/mL depending on phase); nephrotoxicity is dose-dependent — adjust for renal impairment"
    }],
    pearls: ["Acute GVHD targets three organs: skin → GI tract → liver — always assess all three", "Stool volume is a key staging criterion: > 1500 mL/day = stage 3, > 2000 mL/day = stage 4", "Ruxolitinib is now standard for steroid-refractory acute GVHD (REACH2 trial evidence)", "Chronic GVHD resembles autoimmune diseases — scleroderma-like skin, Sjögren-like sicca, bronchiolitis obliterans", "Graft-versus-leukemia (GVL) effect is beneficial — completely eliminating GVHD increases relapse risk"],
    quiz: [
      {
        question: "A patient 45 days post-allogeneic HSCT develops a rash on the palms and 800 mL of watery diarrhea daily. What is the most likely diagnosis?",
        options: ["CMV colitis", "Acute graft-versus-host disease", "Drug-induced rash with coincidental gastroenteritis", "Chronic GVHD"],
        correct: 1,
        rationale: "Acute GVHD typically presents < 100 days post-transplant with the classic triad: skin rash (often starting on palms/soles), GI involvement (diarrhea), and liver dysfunction. The timing and organ involvement are characteristic."
      },
      {
        question: "Which medication is FDA-approved for steroid-refractory acute GVHD?",
        options: ["Cyclosporine", "Azathioprine", "Ruxolitinib", "Mycophenolate mofetil"],
        correct: 2,
        rationale: "Ruxolitinib (JAK1/2 inhibitor) demonstrated superior overall response rate compared to best available therapy in the REACH2 trial and is FDA-approved for steroid-refractory acute GVHD."
      },
      {
        question: "A nurse is monitoring a patient on tacrolimus for GVHD prophylaxis. Which lab value requires immediate reporting?",
        options: ["Hemoglobin 11.5 g/dL", "Serum creatinine rising from 1.0 to 2.4 mg/dL", "WBC 6,500/μL", "Platelet count 165,000/μL"],
        correct: 1,
        rationale: "A significant rise in serum creatinine indicates tacrolimus-induced nephrotoxicity, a dose-dependent and common adverse effect. The provider must be notified for potential dose adjustment or trough level check."
      }
    ]
  },
  "granulomatosis-polyangiitis-np": {
    title: "Granulomatosis with Polyangiitis (GPA)",
    cellular: { title: "PR3-ANCA Vasculitis Pathobiology", content: "GPA is a systemic necrotizing vasculitis driven by anti-neutrophil cytoplasmic antibodies (ANCA) targeting proteinase-3 (PR3) on neutrophil surfaces. PR3-ANCA binding primes neutrophils for enhanced adhesion to endothelium and triggers premature degranulation, releasing proteolytic enzymes, reactive oxygen species, and neutrophil extracellular traps (NETs) that cause transmural vessel wall necrosis. Granulomatous inflammation develops as macrophages, epithelioid cells, and multinucleated giant cells wall off areas of tissue necrosis. The upper airway involvement reflects a mucosal immune microenvironment particularly susceptible to granuloma formation, while renal involvement manifests as pauci-immune crescentic glomerulonephritis (few or no immune complex deposits on immunofluorescence). The NP must differentiate GPA from microscopic polyangiitis (MPA; p-ANCA/MPO), eosinophilic granulomatosis with polyangiitis (EGPA), and anti-GBM disease, as treatment strategies differ." },
    riskFactors: ["Age 40–65 years (peak)", "Northern European ancestry (higher prevalence)", "Silica or dust exposure (occupational risk)", "Preceding respiratory infection (potential antigenic trigger)", "HLA-DPB1 genetic associations", "Staphylococcus aureus nasal carriage (may trigger relapses)", "Male sex (slightly higher incidence)", "Geographic factors (higher incidence in northern latitudes)"],
    diagnostics: ["c-ANCA/PR3 antibodies (> 90% sensitivity in generalized GPA)", "p-ANCA/MPO antibodies (to exclude MPA overlap)", "Renal biopsy showing pauci-immune crescentic glomerulonephritis", "Lung biopsy: necrotizing granulomatous vasculitis", "CT chest: pulmonary nodules, cavitary lesions, ground-glass opacities", "Urinalysis: dysmorphic RBCs, RBC casts, proteinuria", "eGFR trending for progressive renal dysfunction"],
    management: ["Remission induction: rituximab 375 mg/m² weekly × 4 or cyclophosphamide + corticosteroids", "Avacopan (C5a receptor inhibitor) as adjunct or steroid-sparing agent (ADVOCATE trial)", "Remission maintenance: rituximab 500 mg q6 months or azathioprine/methotrexate for ≥ 2 years", "Plasma exchange for severe renal disease (Cr > 5.7 mg/dL) or diffuse alveolar hemorrhage", "TMP-SMX prophylaxis for PCP and potential reduction of nasal S. aureus carriage", "Glucocorticoid taper: reduce to ≤ 5 mg prednisone by 6 months", "Relapse management: re-induce with rituximab or cyclophosphamide depending on prior therapy"],
    nursingActions: ["Monitor c-ANCA/PR3 titers — rising titers may predict relapse", "Assess for medication toxicity: cyclophosphamide (cytopenias, hemorrhagic cystitis), rituximab (infusion reactions)", "Monitor renal function weekly during induction", "Assess respiratory status: new hemoptysis or worsening dyspnea requires urgent evaluation", "Coordinate immunization schedule (avoid live vaccines during immunosuppression)", "Educate on infection signs and when to seek immediate care", "Monitor bone density and glucose during prolonged corticosteroid therapy"],
    assessmentFindings: ["Recurrent sinusitis, nasal crusting, bloody nasal discharge", "Saddle-nose deformity (advanced nasal cartilage destruction)", "Cough, hemoptysis, or dyspnea", "Hematuria with rising creatinine", "Palpable purpura or skin ulceration", "Ocular inflammation (scleritis, episcleritis, orbital pseudotumor)", "Constitutional symptoms: fevers, night sweats, unintentional weight loss"],
    signs: {
      left: ["Chronic rhinosinusitis refractory to antibiotics", "Positive c-ANCA with elevated ESR/CRP", "Pulmonary nodules on CT imaging", "Microscopic hematuria on urinalysis"],
      right: ["Diffuse alveolar hemorrhage (massive hemoptysis)", "Rapidly progressive glomerulonephritis (oliguria, rising Cr)", "Subglottic stenosis causing stridor", "Orbital inflammation with proptosis and vision loss"]
    },
    medications: [{
      name: "Avacopan",
      type: "C5a receptor inhibitor",
      action: "Blocks complement C5a receptor on neutrophils, reducing their activation and migration to sites of vascular inflammation without broad immunosuppression",
      sideEffects: "Hepatotoxicity (monitor LFTs), nasopharyngitis, diarrhea, headache",
      contra: "Severe hepatic impairment, active hepatitis B or C without treatment",
      pearl: "ADVOCATE trial showed non-inferior remission and superior sustained remission vs. prednisone taper — allows glucocorticoid-free induction strategy"
    }, {
      name: "Rituximab",
      type: "Anti-CD20 monoclonal antibody",
      action: "Depletes CD20+ B lymphocytes, reducing ANCA production and breaking the autoimmune cycle",
      sideEffects: "Infusion reactions, hypogammaglobulinemia, hepatitis B reactivation, PML (rare)",
      contra: "Active severe infections, uncontrolled hepatitis B",
      pearl: "RAVE trial established non-inferiority to cyclophosphamide for induction; MAINRITSAN trial supports superiority for maintenance — now the preferred agent for both phases"
    }],
    pearls: ["c-ANCA/PR3 is highly specific for GPA; p-ANCA/MPO suggests MPA — this distinction guides treatment and prognosis", "Avacopan is the first complement-targeted therapy approved for ANCA vasculitis — enables steroid-sparing induction", "Rising c-ANCA titers may herald relapse but should not trigger treatment changes in isolation — correlate clinically", "TMP-SMX serves dual purpose: PCP prophylaxis and reduction of S. aureus nasal carriage (a relapse trigger)", "Pulmonary-renal syndrome (hemoptysis + hematuria/renal failure) is a medical emergency requiring immediate plasma exchange consideration"],
    quiz: [
      {
        question: "An NP is evaluating a patient with GPA in remission whose c-ANCA titer has risen significantly. What is the appropriate next step?",
        options: ["Immediately restart cyclophosphamide induction", "Perform clinical assessment for signs of disease activity and check urinalysis, CRP, and renal function", "Discontinue maintenance therapy", "No action needed — titer changes are not clinically relevant"],
        correct: 1,
        rationale: "Rising ANCA titers may predict relapse but are not independently sufficient to change treatment. Clinical correlation with disease activity markers (urinalysis, renal function, inflammatory markers, symptoms) is essential before modifying therapy."
      },
      {
        question: "Which novel agent allows glucocorticoid-free induction in ANCA-associated vasculitis?",
        options: ["Tocilizumab", "Avacopan", "Belimumab", "Eculizumab"],
        correct: 1,
        rationale: "Avacopan, a C5a receptor inhibitor, demonstrated non-inferior remission and superior sustained remission compared to prednisone taper in the ADVOCATE trial, enabling a steroid-sparing approach."
      }
    ]
  },
  "growth-chart-assessment": {
    title: "Pediatric Growth Chart Assessment",
    cellular: { title: "Growth Physiology", content: "Pediatric growth is regulated by the somatotropic axis: hypothalamic growth hormone-releasing hormone (GHRH) stimulates anterior pituitary secretion of growth hormone (GH), which acts on the liver to produce insulin-like growth factor-1 (IGF-1). IGF-1 drives chondrocyte proliferation at epiphyseal growth plates, resulting in linear bone growth. Thyroid hormones are essential for normal CNS development and bone maturation, while sex steroids trigger the pubertal growth spurt and eventual epiphyseal closure. Growth charts plot anthropometric measurements against age- and sex-specific population norms using percentiles or z-scores. The WHO growth charts (birth to 24 months) describe optimal growth of breastfed infants, while CDC growth charts (ages 2–20) describe reference growth patterns. Deviations from established growth trajectory — crossing two or more major percentile lines — are more clinically significant than a single measurement." },
    riskFactors: ["Prematurity or intrauterine growth restriction (IUGR)", "Chronic illness (celiac disease, inflammatory bowel disease, cystic fibrosis)", "Endocrine disorders (growth hormone deficiency, hypothyroidism)", "Genetic syndromes (Turner, Down, Noonan syndrome)", "Nutritional deficiency or malabsorption", "Psychosocial deprivation (failure to thrive)", "Chronic medication use (corticosteroids)", "Parental short stature (familial short stature)"],
    diagnostics: ["Serial weight, length/height, and head circumference measurements plotted on age- and sex-appropriate growth charts", "BMI-for-age percentile calculation (age ≥ 2 years)", "Bone age X-ray (left hand/wrist) to assess skeletal maturity", "Thyroid function tests (TSH, free T4) if growth velocity is declining", "IGF-1 and IGFBP-3 levels as screening for GH deficiency", "Celiac screening (tTG-IgA) for unexplained growth failure", "Complete metabolic panel and CBC for nutritional or chronic disease assessment"],
    management: ["Plot growth parameters at every well-child visit using appropriate growth charts (WHO < 2 years, CDC 2–20 years)", "Calculate growth velocity (cm/year) — more sensitive than single percentile", "Refer to endocrinology if height < 3rd percentile or growth velocity < 5 cm/year after age 2", "Nutritional counseling and caloric supplementation for underweight children", "GH replacement therapy for confirmed GH deficiency", "Levothyroxine for hypothyroidism-related growth failure", "Address psychosocial factors contributing to failure to thrive"],
    nursingActions: ["Measure length (supine for < 2 years) or height (standing for ≥ 2 years) accurately using proper technique", "Weigh infants nude on calibrated infant scale; weigh children in light clothing without shoes", "Measure head circumference (occipitofrontal) at every visit until age 3", "Plot all measurements on appropriate growth chart and identify percentile crossings", "Calculate and document BMI-for-age for children ≥ 2 years", "Educate parents on normal growth patterns and when to report concerns", "Screen for feeding difficulties, food insecurity, and psychosocial stressors"],
    assessmentFindings: ["Weight, length/height, and head circumference percentiles relative to age and sex", "Growth velocity trend (crossing percentile lines up or down)", "BMI-for-age: underweight (< 5th), healthy (5th–85th), overweight (85th–95th), obese (≥ 95th)", "Disproportionate growth parameters (e.g., declining height with stable weight suggests endocrine cause)", "Parental height and mid-parental height calculation", "Pubertal staging (Tanner stage) for adolescents", "Nutritional intake adequacy and feeding history"],
    signs: {
      left: ["Tracking along established percentile curve", "Appropriate growth velocity for age", "Proportionate weight and height", "Head circumference following expected trajectory"],
      right: ["Crossing two or more major percentile lines downward", "Growth velocity < 5 cm/year after age 2", "Weight-for-length > 97th or < 3rd percentile", "Head circumference crossing percentiles (macrocephaly/microcephaly)"]
    },
    medications: [{
      name: "Somatropin (Recombinant GH)",
      type: "Growth hormone replacement",
      action: "Stimulates hepatic IGF-1 production, promoting linear bone growth at epiphyseal plates and anabolic metabolism",
      sideEffects: "Injection site reactions, headache, slipped capital femoral epiphysis, pseudotumor cerebri, insulin resistance",
      contra: "Active malignancy, closed epiphyses, critical illness, Prader-Willi with severe obesity/respiratory impairment",
      pearl: "Administered as daily subcutaneous injection at bedtime to mimic physiologic GH secretion; monitor IGF-1 levels and growth velocity for dosing adequacy"
    }],
    pearls: ["Growth VELOCITY (rate of growth over time) is more clinically meaningful than a single percentile measurement", "Use WHO charts for ages 0–24 months and CDC charts for ages 2–20 years", "Crossing two or more major percentile lines warrants investigation — single measurements can be misleading", "Bone age helps distinguish constitutional growth delay (delayed bone age, normal predicted adult height) from pathologic short stature", "Always measure mid-parental height: (mother's height + father's height ± 13 cm) / 2 to estimate genetic growth potential"],
    quiz: [
      {
        question: "A 3-year-old was at the 50th percentile for height at age 2 and is now at the 10th percentile. What is the priority nursing action?",
        options: ["Reassure the parents that children grow at different rates", "Document the finding and recommend reassessment in 6 months", "Report the percentile crossing to the provider for further evaluation", "Calculate the child's BMI-for-age"],
        correct: 2,
        rationale: "Crossing two or more major percentile lines represents a significant deviation from the child's growth trajectory and requires provider evaluation to rule out pathologic causes such as endocrine disorders, malabsorption, or chronic illness."
      },
      {
        question: "Which growth chart should be used for a 15-month-old breastfed infant?",
        options: ["CDC growth chart", "WHO growth chart", "Adult BMI chart with age adjustment", "Fenton preterm growth chart"],
        correct: 1,
        rationale: "WHO growth charts are recommended for children birth to 24 months because they describe optimal growth patterns based on breastfed infant standards. CDC charts are used for ages 2–20 years."
      }
    ]
  },
  "growth-development-milestones-np": {
    title: "Growth Development Milestones",
    cellular: { title: "Neurodevelopmental Physiology", content: "Developmental milestones reflect progressive maturation of the central and peripheral nervous systems through neuronal migration, synaptogenesis, myelination, and synaptic pruning. Myelination proceeds in a cephalocaudal and proximodistal pattern, explaining why head control precedes sitting, which precedes walking. The NP evaluates development across four domains: gross motor (postural control, locomotion), fine motor (prehension, manipulation), language (receptive and expressive), and social-emotional (attachment, self-regulation). Developmental screening tools (ASQ-3, PEDS, M-CHAT-R/F for autism) enable early identification of delays, as critical periods of neural plasticity allow maximum benefit from early intervention services. Growth hormone, thyroid hormones, adequate nutrition, and a stimulating psychosocial environment are prerequisites for normal developmental progression." },
    riskFactors: ["Prematurity (use corrected age until 24–36 months for milestone assessment)", "Perinatal asphyxia or hypoxic-ischemic encephalopathy", "Congenital infections (TORCH: toxoplasmosis, CMV, rubella)", "Genetic syndromes (Down, fragile X, Rett syndrome)", "Lead or environmental toxin exposure", "Maternal substance use during pregnancy (fetal alcohol spectrum disorder)", "Psychosocial deprivation and adverse childhood experiences (ACEs)", "Chronic illness affecting CNS development (seizure disorders, congenital heart disease)"],
    diagnostics: ["ASQ-3 (Ages and Stages Questionnaire) for general developmental screening", "M-CHAT-R/F for autism spectrum disorder screening at 18 and 24 months", "Denver Developmental Screening Test (DDST-II) for gross/fine motor, language, personal-social domains", "Bayley Scales of Infant and Toddler Development for comprehensive assessment", "Hearing screen (OAE or ABR) for speech/language delay workup", "Vision screening at well-child visits", "Genetic testing or chromosomal microarray if dysmorphic features present"],
    management: ["Administer validated developmental screening at 9, 18, and 30 months per AAP guidelines", "Refer to early intervention (EI) services (ages 0–3) for identified delays", "Refer to school-based services (ages 3–5) for continued developmental support", "Speech-language therapy for language delays identified by 18–24 months", "Occupational therapy for fine motor or sensory processing delays", "Physical therapy for gross motor delays", "Autism-specific behavioral interventions (ABA therapy) for confirmed ASD"],
    nursingActions: ["Perform developmental surveillance at every well-child visit using milestone checklists", "Administer formal screening tools at AAP-recommended intervals", "Use corrected gestational age for premature infants until 24–36 months", "Educate parents on age-appropriate developmental expectations and red flags", "Assess home environment and parent-child interaction quality", "Coordinate referrals to early intervention, subspecialists, and community resources", "Document developmental findings and screen results in the medical record"],
    assessmentFindings: ["2 months: social smile, lifts head prone, coos", "6 months: rolls over, reaches for objects, babbles, stranger anxiety begins", "9 months: sits independently, pincer grasp developing, says 'mama/dada' nonspecifically", "12 months: pulls to stand, 1–3 words, waves bye-bye", "18 months: walks independently, 10–25 words, stacks 2–4 blocks, uses spoon", "24 months: runs, 2-word phrases (50+ words), parallel play", "4 years: hops on one foot, counts to 4, cooperative play, dresses independently"],
    signs: {
      left: ["Meeting milestones within expected age range", "Engaging in reciprocal social interaction", "Steady acquisition of new skills", "Responsive to auditory and visual stimuli"],
      right: ["Loss of previously acquired skills (regression)", "No babbling by 12 months or no words by 18 months", "No pointing or gesturing by 12 months (autism red flag)", "Persistent hand fisting beyond 4 months"]
    },
    medications: [{
      name: "Methylphenidate",
      type: "CNS stimulant",
      action: "Blocks dopamine and norepinephrine reuptake in prefrontal cortex, improving attention, impulse control, and executive function in ADHD",
      sideEffects: "Appetite suppression (monitor growth!), insomnia, headache, increased HR/BP, potential growth velocity decrease",
      contra: "Concurrent MAOI use, glaucoma, severe anxiety, motor tics/Tourette syndrome (relative)",
      pearl: "Monitor height and weight on growth charts at every visit — growth suppression is dose-related; consider drug holidays during school breaks to assess baseline behavior and allow catch-up growth"
    }],
    pearls: ["Developmental regression (loss of skills) is always pathologic and warrants urgent workup — consider autism, Rett syndrome, or neurodegenerative disease", "No words by 18 months, no 2-word phrases by 24 months — refer for speech-language evaluation", "Autism red flags: no pointing/gesturing by 12 months, no single words by 16 months, loss of social skills at any age", "Use corrected gestational age for premature infants until 24–36 months when assessing milestones", "Early intervention services (birth to 3 years) are federally mandated under IDEA Part C — do not wait for formal diagnosis to refer"],
    quiz: [
      {
        question: "A parent reports their 18-month-old does not say any words and does not point to objects of interest. What is the priority NP action?",
        options: ["Reassure the parent that boys often talk later", "Screen with M-CHAT-R/F and refer for audiology and developmental evaluation", "Prescribe speech therapy and follow up in 6 months", "Recommend more screen time to stimulate language development"],
        correct: 1,
        rationale: "No words by 18 months and absence of pointing/gesturing are red flags for both language delay and autism spectrum disorder. The AAP recommends M-CHAT-R/F screening at 18 months and prompt referral for audiologic evaluation and developmental assessment."
      },
      {
        question: "At which age should a child be able to walk independently?",
        options: ["9 months", "12–15 months", "18–24 months", "6 months"],
        correct: 1,
        rationale: "Most children walk independently by 12–15 months. Not walking by 18 months warrants evaluation for gross motor delay, neurological disorders, or musculoskeletal conditions."
      }
    ]
  },
  "guideline-application-np": {
    title: "Guideline Application",
    cellular: { title: "Evidence-Based Practice Framework", content: "Clinical practice guidelines (CPGs) synthesize the best available evidence into systematic recommendations for diagnosis, management, and prevention. The NP integrates guideline recommendations with clinical expertise, patient preferences, and individual patient factors using the evidence-based practice (EBP) framework. Guidelines are graded by strength of recommendation (strong or conditional) and quality of evidence (high, moderate, low, very low) using the GRADE methodology. Strong recommendations indicate that benefits clearly outweigh risks for most patients, while conditional recommendations require shared decision-making incorporating patient values. The NP must critically appraise guidelines for applicability, considering the population studied, setting, potential conflicts of interest, and currency of evidence. Key frameworks include the USPSTF grading system for preventive services (A/B = recommended, C = selective, D = against, I = insufficient evidence) and the Iowa Model for implementing evidence-based changes in clinical practice." },
    riskFactors: ["Applying outdated guidelines that do not reflect current evidence", "Failing to account for patient-specific factors (comorbidities, preferences, values)", "Using guidelines developed in dissimilar populations without adaptation", "Ignoring guideline limitations and conflicts of interest", "Rigid application without clinical judgment (cookbook medicine)", "Lack of access to current guidelines in point-of-care settings", "Inadequate health literacy assessment when implementing recommendations", "System-level barriers to guideline adherence (cost, access, workforce)"],
    diagnostics: ["AGREE II instrument for guideline quality appraisal", "GRADE framework for evaluating strength of recommendations and evidence quality", "USPSTF grading system for preventive screening recommendations", "Literature search using PubMed, Cochrane Library, and TRIP database", "Clinical decision support tools integrated into EHR systems", "Patient-reported outcome measures to assess guideline impact on patient experience"],
    management: ["Identify clinical question using PICO(T) format (Population, Intervention, Comparison, Outcome, Time)", "Search for and appraise relevant clinical practice guidelines using AGREE II", "Evaluate applicability of guideline to individual patient context", "Integrate guideline recommendations with patient preferences via shared decision-making", "Implement evidence-based changes using the Iowa Model or ACE Star Model", "Monitor adherence to guidelines and evaluate patient outcomes", "Update practice when new evidence modifies existing recommendations"],
    nursingActions: ["Apply USPSTF recommendations for age- and sex-appropriate screening at every visit", "Use ADA Standards of Care for diabetes management including A1C targets and medication selection", "Implement AHA/ACC guidelines for hypertension staging and treatment thresholds", "Apply GOLD criteria for COPD classification and stepwise therapy", "Incorporate DSM-5 criteria for psychiatric diagnosis and documentation", "Use JNC-8 and ACC/AHA guidelines for antihypertensive selection", "Document guideline-concordant care and rationale for any deviation from recommendations"],
    assessmentFindings: ["Gap analysis between current practice and guideline recommendations", "Patient-specific factors that modify guideline applicability (comorbidities, contraindications)", "Barriers to guideline implementation (cost, access, patient preferences)", "Outcome data demonstrating guideline adherence impact on quality metrics", "Documentation of shared decision-making when guideline recommendations are conditional", "Evidence of systematic screening per USPSTF A and B recommendations"],
    signs: {
      left: ["Practice aligned with current CPG recommendations", "Appropriate screening completed per USPSTF schedule", "Treatment targets met (A1C, BP, LDL per guidelines)", "Documented shared decision-making for conditional recommendations"],
      right: ["Practice deviating from strong recommendations without documentation", "Missed screening opportunities for USPSTF A/B recommendations", "Treatment targets consistently unmet without plan adjustment", "Outdated guideline versions being applied to current patients"]
    },
    medications: [{
      name: "Aspirin (Primary Prevention Example)",
      type: "Antiplatelet",
      action: "Irreversibly inhibits COX-1 in platelets, reducing thromboxane A2 synthesis and platelet aggregation",
      sideEffects: "GI bleeding, hemorrhagic stroke, tinnitus",
      contra: "Active GI bleeding, bleeding disorders, aspirin allergy, children with viral illness (Reye syndrome)",
      pearl: "USPSTF 2022 update: aspirin for primary CVD prevention now recommended only for select adults 40–59 with ≥ 10% 10-year ASCVD risk (C recommendation); NOT recommended for adults ≥ 60 (D recommendation) — guideline evolution example"
    }],
    pearls: ["GRADE: strong recommendation = 'we recommend' (do it for most patients); conditional = 'we suggest' (shared decision-making required)", "USPSTF A and B recommendations are covered by ACA without patient cost-sharing — know these for your population", "Always evaluate guidelines using AGREE II: scope/purpose, stakeholder involvement, rigor of development, clarity, applicability, editorial independence", "Guideline recommendations must be integrated with clinical judgment — individual patient factors may warrant deviation", "Document your clinical reasoning when deviating from a strong guideline recommendation to demonstrate evidence-based decision-making"],
    quiz: [
      {
        question: "An NP is deciding whether to start aspirin for primary cardiovascular prevention in a 65-year-old patient. According to the USPSTF 2022 update, what is the recommendation?",
        options: ["Strongly recommended (Grade A)", "Recommended with shared decision-making (Grade C)", "Not recommended for primary prevention in adults ≥ 60 (Grade D)", "Insufficient evidence to recommend (Grade I)"],
        correct: 2,
        rationale: "The USPSTF 2022 update changed the aspirin recommendation: it is NOT recommended for primary cardiovascular prevention in adults ≥ 60 years (Grade D) due to bleeding risk outweighing cardiovascular benefit."
      },
      {
        question: "Which tool is used to critically appraise the quality of clinical practice guidelines?",
        options: ["PICO framework", "AGREE II instrument", "GRADE methodology", "Iowa Model"],
        correct: 1,
        rationale: "AGREE II (Appraisal of Guidelines for Research & Evaluation) is a validated instrument specifically designed to assess the methodological quality of clinical practice guidelines across six domains."
      }
    ]
  },
  "guideline-based-diagnosis-np": {
    title: "Guideline-Based Diagnosis: DSM-5, ADA, AHA, GOLD",
    cellular: { title: "Standardized Diagnostic Frameworks", content: "Guideline-based diagnosis applies standardized criteria from authoritative organizations to ensure consistent, evidence-based clinical decision-making across conditions. The DSM-5-TR provides categorical diagnostic criteria for psychiatric disorders (e.g., MDD requires ≥ 5 symptoms over 2 weeks including depressed mood or anhedonia). The ADA Standards of Medical Care define diabetes diagnosis (FPG ≥ 126, A1C ≥ 6.5%, 2-hr OGTT ≥ 200, or random glucose ≥ 200 with symptoms) and management targets. The AHA/ACC guidelines stage hypertension (normal < 120/80, elevated 120–129/<80, Stage 1 130–139/80–89, Stage 2 ≥ 140/90) and cardiovascular risk. The GOLD framework classifies COPD severity by spirometry (FEV1/FVC < 0.70 post-bronchodilator) and symptom burden using ABCD assessment combining mMRC dyspnea scale and exacerbation history. Applying these frameworks ensures diagnostic consistency, guides treatment selection, and enables meaningful outcome measurement." },
    riskFactors: ["Inconsistent application of diagnostic criteria across providers", "Failure to update practice when guidelines are revised", "Over-reliance on clinical impression without applying standardized criteria", "Atypical presentations that may not meet classic criteria (elderly, pediatric)", "Comorbid conditions that complicate diagnostic assessment", "Cultural and language barriers affecting symptom reporting", "Limited access to diagnostic testing required by guidelines", "Provider unfamiliarity with updates to major guideline systems"],
    diagnostics: ["DSM-5-TR structured diagnostic interview and symptom checklist", "PHQ-9 and GAD-7 for depression and anxiety screening with severity grading", "ADA: FPG, A1C, 2-hour OGTT for diabetes diagnosis; A1C for monitoring", "AHA/ACC: ASCVD risk calculator (Pooled Cohort Equations) for 10-year risk estimation", "GOLD: post-bronchodilator spirometry (FEV1/FVC < 0.70 confirms COPD)", "mMRC dyspnea scale and CAT score for COPD symptom burden assessment", "FRAX score for osteoporotic fracture risk assessment"],
    management: ["Diabetes (ADA): metformin first-line + GLP-1 RA or SGLT2i for patients with ASCVD, HF, or CKD", "Hypertension (AHA/ACC): lifestyle modification for all; pharmacotherapy for Stage 1 with ≥ 10% ASCVD risk or Stage 2", "COPD (GOLD): ABCD group-based therapy — Group A: SABA PRN; Group B: LABA or LAMA; Group E: LABA+LAMA ± ICS", "MDD (APA): SSRI or SNRI first-line; CBT as monotherapy for mild or adjunct for moderate-severe", "Apply treat-to-target principles: A1C < 7% (most adults), BP < 130/80 (high CV risk), LDL per ASCVD risk", "Reassess and step up therapy if targets not met within guideline-specified timeframes", "Screen per USPSTF schedule: diabetes at 35–70 (overweight/obese), depression in adults, lung cancer in qualifying smokers"],
    nursingActions: ["Apply DSM-5 criteria systematically — document which criteria are met and not met", "Calculate 10-year ASCVD risk using ACC/AHA Pooled Cohort Equations before statin discussion", "Order and interpret spirometry correctly for COPD diagnosis (post-bronchodilator FEV1/FVC < 0.70)", "Use PHQ-9 scoring to guide treatment intensity: 5–9 mild, 10–14 moderate, 15–19 moderately severe, ≥ 20 severe", "Apply ADA diagnostic criteria before labeling a patient with diabetes — confirm with repeat testing", "Document guideline version and specific criteria met for each diagnosis", "Educate patients on disease classification and treatment rationale using guideline-based language"],
    assessmentFindings: ["PHQ-9 score correlating with MDD severity and treatment selection", "A1C level relative to ADA individualized target", "Blood pressure classification per AHA/ACC stages", "FEV1 percent predicted and GOLD stage classification", "10-year ASCVD risk percentage for statin eligibility determination", "mMRC dyspnea grade and CAT score for COPD group assignment", "Number of DSM-5 criteria met for psychiatric diagnoses"],
    signs: {
      left: ["A1C 6.0% — prediabetes requiring lifestyle intervention", "BP 128/78 — elevated (AHA/ACC) requiring monitoring", "FEV1 80% predicted with FEV1/FVC < 0.70 — GOLD Stage 1", "PHQ-9 score 8 — mild depression, consider watchful waiting or CBT"],
      right: ["A1C 11% — uncontrolled diabetes requiring combination therapy", "BP 172/98 — Stage 2 HTN requiring immediate pharmacotherapy", "FEV1 28% predicted — GOLD Stage 4 (very severe COPD)", "PHQ-9 score 23 with suicidal ideation — severe MDD requiring urgent intervention"]
    },
    medications: [{
      name: "Metformin",
      type: "Biguanide antihyperglycemic",
      action: "Decreases hepatic glucose production and improves insulin sensitivity in peripheral tissues (skeletal muscle)",
      sideEffects: "GI intolerance (diarrhea, nausea), vitamin B12 deficiency (long-term), lactic acidosis (rare, with renal impairment)",
      contra: "eGFR < 30 mL/min (contraindicated); hold before iodinated contrast; caution eGFR 30–45",
      pearl: "ADA first-line for T2DM regardless of A1C; add GLP-1 RA or SGLT2i when ASCVD, HF, or CKD present — this is a guideline-driven decision, not A1C-driven"
    }, {
      name: "Sertraline",
      type: "SSRI antidepressant",
      action: "Selectively inhibits serotonin reuptake in the synaptic cleft, increasing serotonergic neurotransmission",
      sideEffects: "Nausea, sexual dysfunction, insomnia or somnolence, weight changes, serotonin syndrome (with MAOIs)",
      contra: "Concurrent MAOI use (14-day washout required), linezolid, methylene blue",
      pearl: "APA guideline first-line for MDD; takes 4–6 weeks for full therapeutic effect — reassess at 6–8 weeks; FDA boxed warning for suicidality in patients < 25 years"
    }],
    pearls: ["ADA 2024: add GLP-1 RA or SGLT2i based on comorbidities (ASCVD, HF, CKD), not A1C level — this is a paradigm shift in diabetes management", "GOLD 2024 update replaced ABCD groups with ABE classification — Group E includes any patient with ≥ 2 moderate or ≥ 1 severe exacerbation", "DSM-5 requires functional impairment in addition to symptom criteria — symptoms alone do not constitute a diagnosis", "AHA/ACC lowered hypertension threshold to 130/80 in 2017 — know the difference between elevated, Stage 1, and Stage 2", "Always use guideline-specific language in documentation (e.g., 'Stage 2 hypertension per AHA/ACC' rather than just 'high blood pressure')"],
    quiz: [
      {
        question: "Per ADA guidelines, which comorbidity drives addition of an SGLT2 inhibitor to metformin regardless of A1C level?",
        options: ["Peripheral neuropathy", "Heart failure", "Hyperlipidemia", "Obesity alone"],
        correct: 1,
        rationale: "ADA guidelines recommend adding SGLT2 inhibitors (empagliflozin, dapagliflozin) to metformin when heart failure or CKD is present, regardless of A1C, due to proven cardiovascular and renal benefits."
      },
      {
        question: "What post-bronchodilator spirometry finding confirms a COPD diagnosis per GOLD criteria?",
        options: ["FEV1 < 80% predicted", "FEV1/FVC ratio < 0.70", "Peak expiratory flow < 300 L/min", "FVC < 80% predicted"],
        correct: 1,
        rationale: "GOLD defines COPD as a post-bronchodilator FEV1/FVC ratio < 0.70, confirming persistent airflow limitation that is not fully reversible. FEV1 percent predicted then determines severity staging."
      },
      {
        question: "A patient scores 17 on the PHQ-9. How is this classified and what treatment does APA guidelines suggest?",
        options: ["Mild depression — watchful waiting", "Moderate depression — CBT alone", "Moderately severe depression — pharmacotherapy (SSRI) plus psychotherapy", "Severe depression — immediate hospitalization"],
        correct: 2,
        rationale: "PHQ-9 score of 15–19 = moderately severe depression. APA guidelines recommend combination therapy (antidepressant medication plus psychotherapy) for moderate-to-severe MDD for optimal outcomes."
      }
    ]
  },
  "guillain-barre": {
    title: "Guillain-Barre Syndrome",
    image: imgGuillainBarre,
    cellular: { title: "Autoimmune Demyelinating Polyneuropathy", content: "Guillain-Barré syndrome (GBS) is an acute inflammatory demyelinating polyneuropathy caused by molecular mimicry, where antibodies generated against preceding infections (commonly Campylobacter jejuni, CMV, EBV, or Zika virus) cross-react with ganglioside components of peripheral nerve myelin sheaths. The autoimmune attack causes segmental demyelination of peripheral motor and sensory nerves, producing ascending symmetric weakness beginning in the lower extremities and progressing proximally over days to weeks. In the axonal variants (AMAN, AMSAN), antibodies directly attack the axolemma rather than myelin, causing more severe disease. Life-threatening complications include respiratory failure (30% of patients require mechanical ventilation due to phrenic nerve and intercostal muscle involvement) and autonomic dysfunction (blood pressure lability, cardiac dysrhythmias, urinary retention)." },
    riskFactors: ["Recent infection 1–4 weeks prior (Campylobacter jejuni most common trigger)", "Recent viral illness (CMV, EBV, influenza, Zika virus, COVID-19)", "Recent surgery or vaccination (rare association)", "Male sex (1.5:1 male-to-female ratio)", "Age (bimodal: young adults and elderly)", "HIV infection"],
    diagnostics: ["Lumbar puncture: albuminocytologic dissociation (elevated CSF protein with normal cell count)", "Nerve conduction studies (NCS) showing demyelinating pattern: prolonged distal latencies, conduction block, slowed conduction velocities", "Serial forced vital capacity (FVC) and negative inspiratory force (NIF) measurements — most critical for monitoring respiratory decline", "MRI spine with gadolinium showing nerve root enhancement", "Anti-ganglioside antibodies (anti-GM1 in AMAN variant, anti-GQ1b in Miller Fisher variant)", "Pulmonary function trending every 4–6 hours during progression phase", "ECG monitoring for autonomic dysrhythmias"],
    management: ["Plasmapheresis (5 exchanges over 7–14 days) — most effective when started within 2 weeks of symptom onset", "IVIG 0.4 g/kg/day for 5 days — equivalent efficacy to plasmapheresis", "Do NOT combine plasmapheresis and IVIG (no added benefit, potential harm)", "Do NOT use corticosteroids — they are NOT effective in GBS", "Intubation and mechanical ventilation if FVC < 20 mL/kg or NIF weaker than -25 cmH2O", "DVT prophylaxis (immobility risk)", "Pain management (neuropathic pain is common — gabapentin or pregabalin)"],
    nursingActions: ["Monitor respiratory function every 2–4 hours: FVC, NIF, and respiratory rate", "Keep intubation equipment at bedside — respiratory failure can develop rapidly", "Assess ascending weakness progression using serial neurological exams (document motor strength in all extremities)", "Monitor continuous cardiac telemetry for autonomic dysrhythmias (bradycardia, tachycardia, heart block)", "Assess for autonomic dysfunction: blood pressure lability, urinary retention, ileus", "Implement fall precautions and assist with all mobility", "Provide emotional support — patients are alert and aware despite paralysis"],
    assessmentFindings: ["Ascending symmetric weakness starting in legs and progressing to arms, trunk, and cranial nerves", "Absent or diminished deep tendon reflexes (areflexia)", "Bilateral facial weakness (facial diplegia)", "Dysphagia and difficulty handling secretions (bulbar involvement)", "Paresthesias and pain (neuropathic) in extremities", "Autonomic instability: orthostatic hypotension, diaphoresis, urinary retention", "Respiratory compromise: shallow breathing, use of accessory muscles, declining FVC"],
    signs: {
      left: ["Symmetric leg weakness (ascending)", "Absent deep tendon reflexes", "Paresthesias in hands and feet", "Recent infection history 1–4 weeks prior"],
      right: ["Respiratory failure (FVC < 20 mL/kg)", "Complete quadriplegia with facial diplegia", "Autonomic crisis (BP swings, bradycardia)", "Inability to swallow or protect airway"]
    },
    medications: [{
      name: "Intravenous Immunoglobulin (IVIG)",
      type: "Immunomodulator",
      action: "Provides pooled antibodies that neutralize pathogenic autoantibodies, modulate Fc receptors, and suppress complement-mediated nerve damage",
      sideEffects: "Headache, chills, fever, anaphylaxis (IgA deficiency), renal dysfunction, aseptic meningitis, thromboembolic events",
      contra: "IgA deficiency with anti-IgA antibodies (risk of anaphylaxis), severe renal impairment",
      pearl: "0.4 g/kg/day for 5 consecutive days; equivalent to plasmapheresis but easier to administer; check IgA level before first infusion; do NOT combine with plasmapheresis"
    }],
    pearls: ["Monitor FVC and NIF every 2–4 hours — intubate if FVC < 20 mL/kg, NIF weaker than -25 cmH2O, or FVC declining > 30% from baseline ('20/30/40 rule')", "Albuminocytologic dissociation on LP (high protein, normal cells) is the classic CSF finding", "Corticosteroids are NOT effective in GBS — a common exam distractor", "Descending weakness suggests botulism, NOT GBS — GBS is always ascending", "Miller Fisher variant: triad of ophthalmoplegia, ataxia, areflexia (anti-GQ1b antibodies)"],
    quiz: [
      {
        question: "A patient with GBS has an FVC of 18 mL/kg. What is the priority nursing action?",
        options: ["Administer supplemental oxygen via nasal cannula", "Notify the provider for immediate intubation preparation", "Position in high-Fowler's and reassess in 1 hour", "Administer IVIG to reverse the weakness"],
        correct: 1,
        rationale: "FVC < 20 mL/kg indicates impending respiratory failure and is an indication for intubation and mechanical ventilation. Waiting to reassess could result in respiratory arrest."
      },
      {
        question: "Which CSF finding is characteristic of GBS?",
        options: ["Elevated protein with elevated WBC count", "Low glucose with elevated WBC count", "Elevated protein with normal cell count (albuminocytologic dissociation)", "Normal protein with elevated RBC count"],
        correct: 2,
        rationale: "Albuminocytologic dissociation — elevated CSF protein with a normal or near-normal cell count — is the hallmark CSF finding in GBS, reflecting inflammatory demyelination without infection."
      },
      {
        question: "A nurse notes a GBS patient's weakness has progressed from legs to arms over 24 hours. Which additional assessment is most critical?",
        options: ["Deep tendon reflexes", "Serial forced vital capacity measurements", "Pupil reactivity", "Bowel sound assessment"],
        correct: 1,
        rationale: "Rapidly ascending weakness threatens respiratory muscles. Serial FVC monitoring is the most critical assessment to detect impending respiratory failure before clinical decompensation occurs."
      }
    ]
  },
  "gynecological-exam-np": {
    title: "Gynecological Assessment and Cervical Screening",
    cellular: { title: "Cervical Neoplasia Pathophysiology", content: "Cervical cancer develops through a well-characterized progression from high-risk human papillomavirus (HR-HPV) infection — primarily types 16 and 18 — to cervical intraepithelial neoplasia (CIN) to invasive carcinoma over 10–20 years. HR-HPV E6 and E7 oncoproteins inactivate tumor suppressor proteins p53 and retinoblastoma (Rb), respectively, leading to uncontrolled cell proliferation and impaired DNA repair. The squamocolumnar junction (transformation zone) of the cervix is the primary site of HPV integration and neoplastic transformation. The NP performs gynecological assessments including speculum and bimanual examination, applies current ASCCP/ACS cervical cancer screening guidelines, manages abnormal results using risk-based algorithms, and provides comprehensive reproductive health counseling including HPV vaccination and contraceptive management." },
    riskFactors: ["Persistent high-risk HPV infection (types 16, 18, 31, 33, 45)", "Immunosuppression (HIV, organ transplant recipients)", "Smoking (concentrates carcinogens in cervical mucus)", "Early onset of sexual activity (< 18 years)", "Multiple sexual partners", "History of sexually transmitted infections (chlamydia co-infection)", "Non-adherence to cervical screening recommendations", "Lack of HPV vaccination"],
    diagnostics: ["Cervical cytology (Pap smear) — conventional or liquid-based (ThinPrep)", "HPV co-testing (cytology + HR-HPV DNA test) for ages 30–65 every 5 years", "Primary HR-HPV testing alone every 5 years as alternative for ages 25–65 (ACS 2020)", "Colposcopy with biopsy for abnormal screening results per ASCCP algorithms", "Wet mount microscopy for vaginitis evaluation (KOH prep, whiff test, clue cells)", "STI screening: NAAT for chlamydia/gonorrhea, RPR/VDRL for syphilis", "Endometrial biopsy for abnormal uterine bleeding in women ≥ 45 or with risk factors"],
    management: ["Cervical screening per ACS 2020: begin at age 25 with primary HPV testing every 5 years (preferred)", "Alternative screening: co-testing (cytology + HPV) every 5 years or cytology alone every 3 years (ages 25–65)", "Discontinue screening at age 65 if adequate prior negative screening and no history of CIN2+", "ASCCP risk-based management for abnormal results: surveillance, colposcopy, or treatment based on CIN grade", "LEEP or cold knife conization for CIN2/CIN3 or persistent HSIL", "HPV vaccination (9-valent Gardasil 9) recommended ages 9–26, catch-up through age 45", "Annual well-woman exam including breast, pelvic, and psychosocial assessment"],
    nursingActions: ["Obtain complete gynecologic history: menstrual history, sexual history, contraception, prior Pap/HPV results", "Prepare patient for speculum exam: explain procedure, ensure comfort, use appropriate speculum size", "Collect cervical specimens using proper technique (adequate transformation zone sampling)", "Educate patient on screening schedule and importance of follow-up for abnormal results", "Counsel on HPV vaccination for eligible patients", "Perform clinical breast exam as part of annual well-woman visit", "Screen for intimate partner violence, depression, and substance use at every visit"],
    assessmentFindings: ["Cervical appearance: normal pink mucosa vs. abnormal findings (lesions, friability, polyps)", "Vaginal discharge characteristics (color, consistency, odor) for infection assessment", "Bimanual exam findings: uterine size/position, adnexal tenderness or masses", "Bartholin gland assessment for cyst or abscess", "Vulvar skin assessment for lesions, atrophy, or dystrophy", "Rectovaginal exam for posterior cul-de-sac nodularity (endometriosis)", "Menstrual pattern documentation (cycle length, duration, volume)"],
    signs: {
      left: ["Normal cervical appearance with clear mucus", "Regular menstrual cycles", "Negative HPV/Pap results", "No adnexal tenderness or masses"],
      right: ["Cervical friability or visible lesion (concerning for malignancy)", "Postcoital or intermenstrual bleeding", "Adnexal mass with tenderness (ectopic pregnancy, ovarian pathology)", "Foul-smelling discharge with cervical motion tenderness (PID)"]
    },
    medications: [{
      name: "Gardasil 9 (9-valent HPV vaccine)",
      type: "Recombinant HPV vaccine",
      action: "Generates neutralizing antibodies against HPV types 6, 11, 16, 18, 31, 33, 45, 52, 58 — preventing infection and subsequent cervical neoplasia",
      sideEffects: "Injection site pain, syncope (observe 15 minutes post-injection in adolescents), headache, fever",
      contra: "Severe allergic reaction to prior dose or vaccine component (yeast); pregnancy (defer until postpartum)",
      pearl: "2-dose series if started before age 15 (0 and 6–12 months); 3-dose series if started at ≥ 15 years (0, 1–2, 6 months); can be given through age 45 via shared clinical decision-making"
    }],
    pearls: ["ACS 2020 preferred strategy: primary HPV testing every 5 years starting at age 25 — Pap-only screening is now the least preferred option", "Never perform cervical screening during menstruation, active cervicitis, or within 48 hours of intercourse/douching (false results)", "Cervical screening is NOT needed after total hysterectomy (cervix removed) for benign indications with no CIN2+ history", "HPV vaccination does NOT eliminate the need for cervical screening — it does not cover all oncogenic HPV types", "ASCCP risk-based management uses cumulative risk estimation rather than single test results to guide colposcopy referral"],
    quiz: [
      {
        question: "A 32-year-old patient asks how often she should have cervical cancer screening. Per ACS 2020 guidelines, what is the preferred recommendation?",
        options: ["Annual Pap smear", "Pap smear every 3 years", "Primary HPV testing every 5 years", "Co-testing every year until age 40"],
        correct: 2,
        rationale: "ACS 2020 guidelines recommend primary HPV testing every 5 years as the preferred cervical cancer screening strategy for individuals ages 25–65. Co-testing every 5 years is an acceptable alternative."
      },
      {
        question: "A patient's Pap result shows HSIL (high-grade squamous intraepithelial lesion). What is the next step per ASCCP guidelines?",
        options: ["Repeat Pap in 1 year", "Immediate colposcopy with biopsy", "Start empiric antibiotics", "Repeat HPV testing in 3 years"],
        correct: 1,
        rationale: "HSIL on cytology requires immediate colposcopy with directed biopsy per ASCCP risk-based management guidelines to evaluate for CIN2/CIN3 and determine appropriate treatment."
      }
    ]
  },
  "hairy-cell-leukemia-rn": {
    title: "Hairy Cell Leukemia",
    cellular: { title: "B-Cell Lymphoproliferative Disorder", content: "Hairy cell leukemia (HCL) is a rare, indolent B-cell lymphoproliferative neoplasm characterized by the accumulation of mature B lymphocytes with distinctive cytoplasmic projections ('hairy' appearance on peripheral blood smear) in the bone marrow, spleen, and liver. The BRAF V600E mutation is present in virtually all classic HCL cases, driving constitutive activation of the RAS-RAF-MEK-ERK signaling pathway and promoting malignant B-cell survival. Marrow infiltration causes pancytopenia (anemia, neutropenia, thrombocytopenia) through a combination of replacement and reticulin fibrosis, which often results in a 'dry tap' on bone marrow aspiration. Massive splenomegaly from red pulp infiltration is a hallmark finding. HCL cells are characteristically positive for TRAP (tartrate-resistant acid phosphatase) stain. First-line treatment with purine analogs (cladribine or pentostatin) achieves complete remission in > 80% of patients." },
    riskFactors: ["Male sex (4:1 male-to-female ratio)", "Median age at diagnosis 50–55 years", "White/Caucasian ethnicity (higher incidence)", "Exposure to agricultural chemicals or herbicides", "Exposure to ionizing radiation", "Ashkenazi Jewish descent (higher prevalence)"],
    diagnostics: ["Peripheral blood smear showing lymphocytes with irregular cytoplasmic projections ('hairy cells')", "Flow cytometry: CD19+, CD20+ (bright), CD11c+, CD25+, CD103+, CD123+ (classic HCL immunophenotype)", "TRAP stain positive (tartrate-resistant acid phosphatase)", "BRAF V600E mutation testing by PCR or immunohistochemistry", "Bone marrow biopsy: diffuse infiltration with reticulin fibrosis ('dry tap' on aspiration is common)", "CBC: pancytopenia — particularly marked monocytopenia (characteristic)", "CT abdomen showing splenomegaly (often massive)"],
    management: ["First-line: cladribine (2-CdA) 0.1 mg/kg/day continuous IV infusion × 7 days — single course achieves CR in > 80%", "Alternative first-line: pentostatin 4 mg/m² IV every 2 weeks for 3–6 months", "Monitor for prolonged immunosuppression post-cladribine (CD4 T-cell depletion lasting months)", "PCP and herpes prophylaxis during and after purine analog therapy", "Rituximab as second-line or for minimal residual disease elimination", "Vemurafenib (BRAF inhibitor) for relapsed/refractory disease", "Splenectomy only for refractory disease or diagnosis (rarely needed with current therapy)"],
    nursingActions: ["Monitor CBC with differential closely — severe neutropenia is expected during and after treatment", "Implement neutropenic precautions: strict hand hygiene, avoid fresh flowers/fruits, private room if ANC < 500", "Assess for infection signs (fever is an emergency in neutropenic patients)", "Administer antimicrobial prophylaxis as prescribed (TMP-SMX for PCP, acyclovir for HSV/VZV)", "Monitor for transfusion needs: RBC transfusions for symptomatic anemia, platelet transfusions for bleeding", "Assess for splenomegaly-related symptoms: early satiety, LUQ pain, splenic rupture signs", "Educate patient that treatment is highly effective with excellent long-term prognosis"],
    assessmentFindings: ["Fatigue and weakness (anemia)", "Recurrent or severe infections (neutropenia and monocytopenia)", "Easy bruising or bleeding (thrombocytopenia)", "Massive splenomegaly with left upper quadrant fullness", "Hepatomegaly", "Pallor", "Absence of significant lymphadenopathy (distinguishes HCL from other lymphomas)"],
    signs: {
      left: ["Fatigue and exercise intolerance", "Palpable splenomegaly below costal margin", "Mild pancytopenia on routine CBC", "Monocytopenia on differential"],
      right: ["Massive splenomegaly (crossing midline)", "Severe pancytopenia with febrile neutropenia", "Life-threatening infection (sepsis)", "Spontaneous bleeding from thrombocytopenia"]
    },
    medications: [{
      name: "Cladribine (2-CdA)",
      type: "Purine nucleoside analog",
      action: "Resistant to adenosine deaminase degradation; accumulates as 2-CdATP in hairy cells, causing DNA strand breaks and apoptosis in both dividing and non-dividing lymphocytes",
      sideEffects: "Prolonged myelosuppression (neutropenia lasting weeks to months), immunosuppression (CD4 depletion), fever, infection risk, tumor lysis syndrome (rare)",
      contra: "Active uncontrolled infection, pregnancy/breastfeeding, severe pre-existing myelosuppression",
      pearl: "Single 7-day course achieves complete remission in > 80% of patients — one of the most effective single-agent chemotherapy regimens in oncology; monitor CD4 counts for months post-treatment"
    }, {
      name: "Vemurafenib",
      type: "BRAF V600E inhibitor",
      action: "Selectively inhibits mutated BRAF V600E kinase, blocking the constitutively activated RAS-RAF-MEK-ERK signaling pathway driving HCL cell survival",
      sideEffects: "Photosensitivity, arthralgia, rash, cutaneous squamous cell carcinoma, QT prolongation",
      contra: "Wild-type BRAF (must confirm V600E mutation), long QT syndrome",
      pearl: "Used in relapsed/refractory HCL with confirmed BRAF V600E mutation; response rates > 90% but relapses common — often used as bridge to other therapy"
    }],
    pearls: ["Monocytopenia is a distinctive feature of HCL — most other leukemias do NOT cause monocytopenia", "BRAF V600E mutation is present in virtually all classic HCL — its absence should prompt consideration of HCL variant", "'Dry tap' on bone marrow aspiration due to reticulin fibrosis is characteristic — always obtain core biopsy", "Cladribine single-course therapy achieves CR > 80% — one of the best treatment responses in hematologic malignancy", "Absence of lymphadenopathy helps distinguish HCL from CLL and other lymphomas that present with diffuse lymphadenopathy"],
    quiz: [
      {
        question: "A patient with hairy cell leukemia is receiving cladribine. Which nursing assessment is most critical during treatment?",
        options: ["Daily weights for fluid retention", "Temperature and signs of infection (neutropenic precautions)", "Blood glucose monitoring", "Cardiac telemetry for arrhythmias"],
        correct: 1,
        rationale: "Cladribine causes profound and prolonged myelosuppression and immunosuppression. Febrile neutropenia is the most dangerous complication, and infection prevention and early detection are the nursing priorities."
      },
      {
        question: "Which laboratory finding is most characteristic of hairy cell leukemia compared to other leukemias?",
        options: ["Elevated WBC with lymphocytosis", "Pancytopenia with monocytopenia", "Eosinophilia with basophilia", "Isolated thrombocytosis"],
        correct: 1,
        rationale: "Pancytopenia with monocytopenia is a distinctive finding in HCL. While pancytopenia occurs in many hematologic malignancies, monocytopenia is relatively unique to hairy cell leukemia."
      },
      {
        question: "A bone marrow aspiration on a suspected HCL patient yields a 'dry tap.' What does this indicate and what should be done next?",
        options: ["Technical error — repeat the aspiration", "Marrow fibrosis characteristic of HCL — obtain core biopsy", "Normal finding — no further testing needed", "Aplastic anemia — refer to transplant"],
        correct: 1,
        rationale: "A 'dry tap' (inability to aspirate marrow) is characteristic of HCL due to reticulin fibrosis from leukemic infiltration. A core biopsy is essential for diagnosis and will show the characteristic 'fried egg' appearance of hairy cells."
      }
    ]
  }
};
