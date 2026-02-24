import type { LessonContent } from "./types";

export const hematologyLessons: Record<string, LessonContent> = {
  "all-leukemia": {
    title: "Acute Lymphoblastic Leukemia (ALL)",
    cellular: { title: "Blast Overcrowding", content: "Malignant lymphoblasts rapidly multiply in the bone marrow. This overcrowding suppresses normal hematopoiesis, leading to severe anemia, bleeding (low platelets), and infection risk (nonfunctional WBCs)." },
    riskFactors: ["Age 2-5 years (peak incidence)", "Down syndrome (20x increased risk)", "Radiation exposure", "Prior chemotherapy", "Genetic syndromes (Li-Fraumeni, neurofibromatosis)", "Sibling with leukemia"],
    diagnostics: ["Monitor CBC with differential trends (ANC)", "Expect bone marrow biopsy to be ordered", "Monitor platelet counts closely", "Expect lumbar puncture for CNS involvement", "Monitor metabolic panel and uric acid", "Expect blood cultures if fever develops"],
    management: ["Implement neutropenic precautions when ANC < 500", "Maintain protective isolation as ordered", "Administer blood products as prescribed (irradiated)", "Provide meticulous oral care with soft-bristled brush", "Maintain adequate nutrition (no raw foods during neutropenia)", "Follow bleeding precautions (no rectal temps, soft toothbrush)"],
    nursingActions: ["Monitor temperature every 4 hours (report fever > 38°C immediately)", "Assess for signs of bleeding (petechiae, bruising, epistaxis)", "Monitor ANC daily and enforce isolation as needed", "Inspect oral mucosa for mucositis every shift", "Report any signs of infection immediately", "Provide emotional support to child and family", "Avoid invasive procedures when platelets are low"],
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
    riskFactors: ["Age > 60 years", "Prior chemotherapy/radiation", "Myelodysplastic syndrome", "Benzene exposure", "Down syndrome", "Smoking", "Genetic disorders (Fanconi anemia, Bloom syndrome)"],
    diagnostics: ["Monitor CBC with differential trends (ANC)", "Expect bone marrow biopsy to be ordered", "Monitor coagulation studies (PT/INR, fibrinogen)", "Expect blood cultures with any fever", "Monitor metabolic panel and uric acid levels", "Expect peripheral blood smear to be ordered"],
    management: ["Implement strict hand hygiene and neutropenic precautions", "Administer blood products as prescribed (irradiated, leukocyte-depleted)", "Provide meticulous mouth care to prevent mucositis", "Maintain protective isolation as ordered", "Follow bleeding precautions strictly", "Maintain adequate hydration as ordered"],
    nursingActions: ["Monitor temperature every 4 hours and report fever immediately", "Assess for bleeding (gums, petechiae, melena) every shift", "Disinfect all equipment before client contact", "Inspect oral mucosa and skin integrity daily", "Monitor ANC and enforce precautions accordingly", "Report any signs of infection (redness, swelling, drainage)", "Provide emotional support during treatment"],
    signs: {
      left: ["Infection & Fever", "Bleeding Gums", "Fatigue", "Bone Pain"],
      right: ["Severe Neutropenia", "Mucositis", "Weight Loss", "Hypercellular Marrow"]
    },
    medications: [{ name: "Daunorubicin", type: "Antineoplastic", action: "Intercalates DNA", sideEffects: "Cardiotoxicity", contra: "Severe HF", pearl: "Monitor heart function (Echo) closely." }],
    pearls: ["Hand hygiene is the #1 priority", "Disinfect all equipment before client contact", "Irradiate blood products to prevent graft-vs-host"],
    quiz: [{ question: "Priority for a client with AML undergoing chemo?", options: ["Watching for hair loss", "Infection prevention / Hand hygiene", "Encouraging a high-fiber diet", "Daily walks in the hall"], correct: 1, rationale: "Infection is the leading cause of death in leukemia patients." }]
  },
  "sickle-cell": {
    title: "Sickle Cell Crisis",
    cellular: { title: "Hemoglobin S Polymerization", content: "Under stress (hypoxia, dehydration, acidosis), HgbS changes shape into rigid sickled cells. These clump together, occluding small vessels (vaso-occlusion) causing ischemia and severe pain." },
    riskFactors: ["Homozygous HbSS genotype", "African American descent", "Dehydration", "Hypoxia", "Cold exposure", "High altitude", "Infection", "Stress", "Pregnancy"],
    diagnostics: ["Expect CBC with reticulocyte count to be ordered", "Monitor oxygen saturation continuously during crisis", "Expect hemoglobin electrophoresis for diagnosis", "Expect CXR if acute chest syndrome suspected", "Monitor for signs of splenic sequestration (LUQ pain, falling Hgb)", "Expect blood cultures if fever present"],
    management: ["Administer IV fluids as prescribed (priority intervention to reduce viscosity)", "Administer pain medication as prescribed (do not undertreat pain)", "Apply oxygen only if SpO2 < 92%", "Avoid cold compresses (causes vasoconstriction and worsens sickling)", "Maintain bed rest during acute crisis", "Administer prescribed blood transfusions for severe anemia"],
    nursingActions: ["Assess pain level using appropriate pain scale and medicate promptly", "Monitor vital signs and oxygen saturation frequently", "Maintain strict intake and output to assess hydration", "Report signs of acute chest syndrome (fever, chest pain, new infiltrate)", "Monitor for priapism and report immediately", "Educate on crisis prevention (hydration, avoid cold, avoid high altitude)", "Assess for signs of stroke (sudden weakness, speech changes)"],
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
  "polycythemia": {
    title: "Polycythemia Vera",
    cellular: { title: "Myeloproliferative Neoplasm", content: "Polycythemia vera is a myeloproliferative neoplasm with JAK2 mutation (V617F) causing overproduction of RBCs, WBCs, and platelets. Increased blood viscosity leads to thrombosis risk. Secondary polycythemia results from chronic hypoxia (COPD, high altitude) with appropriately elevated EPO." },
    riskFactors: ["JAK2 V617F gene mutation","Chronic hypoxia (COPD, high altitude)","Smoking","Chronic carbon monoxide exposure","Dehydration","Renal tumors (secondary)"],
    diagnostics: ["Vital signs including blood pressure monitoring","Skin color assessment (plethoric appearance)","Spleen palpation assessment as ordered","Monitor for signs of thrombosis"],
    management: ["Assist with therapeutic phlebotomy as ordered","Encourage adequate hydration","Monitor for signs of bleeding or thrombosis","Administer prescribed medications","Avoid iron supplementation unless specifically ordered"],
    nursingActions: ["Assess for headache, dizziness, and visual changes","Monitor for signs of thrombotic events (DVT, stroke)","Encourage oral fluid intake to reduce viscosity","Report pruritus especially after bathing","Monitor for signs of bleeding (epistaxis, gum bleeding)","Educate patient on avoiding hot baths"],
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
  "thalassemia": {
    title: "Thalassemia",
    cellular: { title: "Hemoglobin Chain Synthesis Defect", content: "Thalassemia is an inherited autosomal recessive disorder of hemoglobin synthesis characterized by reduced or absent production of one of the globin chains (alpha or beta). In beta-thalassemia (most clinically significant), mutations in the HBB gene on chromosome 11 reduce beta-globin chain production, causing excess unpaired alpha-globin chains to precipitate and damage red blood cell membranes. This leads to ineffective erythropoiesis (RBC destruction within bone marrow before release), hemolytic anemia, and compensatory extramedullary hematopoiesis (liver, spleen expansion). Iron overload occurs from both increased GI absorption (hepcidin suppression from ineffective erythropoiesis) and chronic transfusion therapy. Thalassemia major (Cooley anemia) presents in the first year of life with severe transfusion-dependent anemia." },
    riskFactors: ["Mediterranean descent (beta-thalassemia)", "Southeast Asian descent (alpha-thalassemia)", "Middle Eastern descent", "African descent (alpha-thalassemia trait common)", "Family history of thalassemia", "Consanguinity (autosomal recessive inheritance)", "Both parents must be carriers for major forms"],
    diagnostics: ["Expect CBC showing microcytic hypochromic anemia (low MCV, low MCH)", "Expect hemoglobin electrophoresis (elevated HbA2 and HbF in beta-thal)", "Monitor reticulocyte count (elevated from compensatory erythropoiesis)", "Expect peripheral blood smear (target cells, nucleated RBCs, microcytes)", "Monitor serum ferritin and iron studies (iron overload)", "Expect genetic testing for definitive diagnosis", "Monitor liver and cardiac iron with MRI T2*"],
    management: ["Chronic transfusion therapy for thalassemia major (target pre-transfusion Hb 9-10 g/dL)", "Iron chelation therapy to prevent iron overload", "Folic acid supplementation (increased demand from chronic hemolysis)", "Splenectomy for symptomatic hypersplenism", "Hematopoietic stem cell transplant (only curative option)", "Gene therapy (emerging treatment)", "Avoid iron supplementation (iron overload, not deficiency)"],
    nursingActions: ["Monitor hemoglobin levels before and after transfusions", "Administer blood products safely with proper identification", "Monitor for transfusion reactions", "Educate on iron chelation medication adherence", "Assess for signs of iron overload (bronze skin, hepatomegaly, heart failure)", "Monitor growth and development in children", "Provide genetic counseling referrals", "Assess for facial bone changes (frontal bossing, maxillary hyperplasia)"],
    signs: {
      left: ["Pallor and Fatigue", "Jaundice (Hemolysis)", "Hepatosplenomegaly", "Failure to Thrive (Children)"],
      right: ["Chipmunk Facies (Maxillary Bone Expansion)", "Pathological Fractures (Bone Marrow Expansion)", "Bronze Skin (Iron Overload)", "Heart Failure (Iron Cardiomyopathy)"]
    },
    medications: [
      { name: "Deferasirox (Exjade/Jadenu)", type: "Iron Chelator", action: "Oral iron chelator that binds free iron and promotes fecal excretion", sideEffects: "GI upset, renal toxicity, hepatotoxicity, rash", contra: "Severe renal impairment (CrCl <40), high-risk MDS", pearl: "First-line oral chelator; monitor serum creatinine monthly and LFTs; take on empty stomach; Jadenu formulation can be taken with food" },
      { name: "Deferoxamine (Desferal)", type: "Iron Chelator", action: "Parenteral iron chelator that binds ferric iron and promotes urinary/fecal excretion", sideEffects: "Injection site reactions, ototoxicity, retinal toxicity, growth retardation in children", contra: "Severe renal disease, anuria", pearl: "Given as 8-12 hour subcutaneous infusion via portable pump 5-7 nights/week; urine turns reddish-orange (expected); annual audiology and ophthalmology exams required" }
    ],
    pearls: [
      "Thalassemia causes MICROCYTIC anemia (low MCV) just like iron deficiency - but the key difference is that iron stores are NORMAL or HIGH in thalassemia; never give iron supplements",
      "'Chipmunk facies' (frontal bossing, prominent cheekbones, flat nasal bridge) results from massive bone marrow expansion trying to compensate for ineffective erythropoiesis",
      "Iron overload from chronic transfusions is the leading cause of death in thalassemia major - cardiac iron deposition causes fatal arrhythmias and heart failure; chelation compliance saves lives"
    ],
    quiz: [{
      question: "A child with thalassemia major has a ferritin level of 2500 ng/mL. Which nursing intervention is most important?",
      options: ["Administer iron supplements to treat the anemia", "Emphasize the importance of iron chelation therapy adherence", "Increase dietary iron intake with red meat", "Withhold blood transfusions until ferritin normalizes"],
      correct: 1,
      rationale: "Elevated ferritin (>1000 ng/mL indicates significant iron overload) in thalassemia major results from chronic transfusion therapy. Iron chelation therapy (deferasirox or deferoxamine) is critical to remove excess iron and prevent fatal complications (cardiac iron deposition, liver cirrhosis, endocrine failure). Iron supplements and dietary iron would worsen iron overload. Transfusions cannot be withheld as the child is transfusion-dependent."
    }]
  }
};
