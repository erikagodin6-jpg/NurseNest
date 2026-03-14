import type { LessonContent } from "./types";

export const generatedBatch043Lessons: Record<string, LessonContent> = {
  "hematology-diagnostic-criteria-np": {
    title: "Iron Deficiency Anemia: Ferritin",
    cellular: { title: "Iron Deficiency Anemia: Ferritin & Microcytosis", content: "Iron deficiency anemia (IDA) is the most common nutritional deficiency worldwide, resulting from inadequate iron stores to support normal erythropoiesis. Iron is essential for hemoglobin synthesis; each hemoglobin molecule contains four heme groups, each requiring one iron atom to bind oxygen. When iron stores become depleted, the bone marrow produces red blood cells that are smaller (microcytic, MCV < 80 fL) and contain less hemoglobin (hypochromic). The progression follows a predictable sequence: first, storage iron decreases (falling ferritin), then transport iron falls (low serum iron, elevated TIBC, decreased transferrin saturation < 20%), and finally frank anemia develops. Ferritin is the most sensitive and specific early marker for IDA -- a level < 30 ng/mL is virtually diagnostic (< 15 ng/mL is definitive). However, ferritin is an acute-phase reactant and may be falsely elevated in inflammation, infection, liver disease, or malignancy; in chronic disease states, a ferritin < 100 ng/mL with transferrin saturation < 20% suggests concurrent IDA. The peripheral blood smear shows microcytic hypochromic RBCs with anisocytosis (elevated RDW), target cells, and pencil cells. The reticulocyte count is inappropriately low for the degree of anemia, indicating hypoproliferative marrow. The clinician must always investigate the underlying cause: menstrual losses and dietary insufficiency in premenopausal women; GI blood loss (colon cancer, peptic ulcer, celiac disease) in men and postmenopausal women; and malabsorption (celiac disease, H. pylori gastritis, bariatric surgery) in patients unresponsive to oral iron." },
    riskFactors: ["Chronic blood loss (menorrhagia, GI bleeding from ulcers/polyps/malignancy)", "Inadequate dietary iron intake (vegetarian/vegan diets)", "Malabsorption syndromes (celiac disease, inflammatory bowel disease, post-bariatric surgery)", "Pregnancy and lactation (increased iron demands)", "H. pylori infection (impairs iron absorption)", "Frequent blood donation", "Chronic kidney disease with erythropoietin use", "Infants on exclusive cow's milk diet beyond 12 months"],
    diagnostics: ["CBC with differential: microcytic hypochromic anemia (low MCV, low MCH, low MCHC), elevated RDW", "Iron studies: low serum ferritin (< 30 ng/mL diagnostic), low serum iron, elevated TIBC, low transferrin saturation (< 20%)", "Peripheral blood smear: microcytes, hypochromia, target cells, pencil cells, anisocytosis", "Reticulocyte count: inappropriately low (hypoproliferative)", "Soluble transferrin receptor (sTfR): elevated in IDA, normal in anemia of chronic disease", "GI workup for occult blood loss: fecal occult blood test, upper/lower endoscopy in men and postmenopausal women", "Celiac serology (anti-tTG IgA) if malabsorption suspected", "H. pylori testing if refractory to oral iron therapy"],
    management: ["Oral iron replacement: ferrous sulfate 325 mg (65 mg elemental iron) TID on empty stomach with vitamin C to enhance absorption", "IV iron (iron sucrose, ferric carboxymaltose, ferumoxytol) for intolerance to oral iron, malabsorption, or severe/symptomatic anemia", "Treat underlying cause (H. pylori eradication, endoscopic evaluation for GI bleeding, celiac disease management)", "Blood transfusion reserved for hemodynamically unstable patients or Hgb < 7 g/dL with symptoms", "Recheck CBC and ferritin in 4-8 weeks after starting oral iron; expect reticulocyte rise in 5-10 days", "Continue oral iron 3-6 months after hemoglobin normalizes to fully replete stores (ferritin > 50 ng/mL)", "Dietary counseling: heme iron sources (red meat, liver, shellfish), non-heme sources with vitamin C pairing"],
    nursingActions: ["Educate patient to take oral iron on empty stomach 1 hour before or 2 hours after meals", "Advise taking iron with vitamin C (orange juice) and avoiding calcium, antacids, tea, coffee within 2 hours", "Warn patient that stools will turn black/dark green (expected, not a sign of GI bleeding)", "Monitor for constipation and recommend stool softeners as needed", "Administer IV iron per protocol with test dose observation for anaphylaxis (epinephrine at bedside)", "Monitor vital signs during and 30 minutes after IV iron infusion", "Educate about dietary iron sources and absorption enhancers/inhibitors", "Document response to therapy including energy levels and symptom improvement"],
    assessmentFindings: ["Fatigue, weakness, exercise intolerance, exertional dyspnea", "Pallor (conjunctival, palmar, nail bed)", "Tachycardia and systolic flow murmur from increased cardiac output", "Pica (craving ice/pagophagia, dirt, starch)", "Koilonychia (spoon-shaped nails)", "Angular cheilitis and glossitis (smooth, red tongue)", "Restless leg syndrome", "Brittle hair and hair loss"],
    signs: {
      left: ["Mild fatigue and exercise intolerance", "Pallor of conjunctivae and palms", "Low ferritin with normal hemoglobin (latent IDA)", "Mild tachycardia with exertion", "Pica cravings (ice chewing)"],
      right: ["Hemoglobin < 7 g/dL with symptomatic anemia", "Chest pain or dyspnea at rest", "High-output heart failure", "Severe tachycardia and hypotension", "Syncope or altered mental status"]
    },
    medications: [{
      name: "Ferrous Sulfate",
      type: "Oral iron supplement",
      action: "Provides elemental iron for hemoglobin synthesis and iron store repletion",
      sideEffects: "Constipation, nausea, abdominal cramping, black stools, metallic taste",
      contra: "Hemochromatosis, hemosiderosis, hemolytic anemias, concurrent IV iron",
      pearl: "Take on empty stomach with vitamin C; avoid with PPIs, calcium, antacids, and tetracyclines -- space by 2 hours"
    }, {
      name: "Ferric Carboxymaltose (Injectafer)",
      type: "IV iron replacement",
      action: "Delivers iron directly to transferrin and storage sites, bypassing GI absorption",
      sideEffects: "Hypophosphatemia, injection site reactions, headache, nausea, hypotension, rare anaphylaxis",
      contra: "Known hypersensitivity to product, iron overload states",
      pearl: "Can give full replacement dose (750 mg) in a single 15-minute infusion; monitor phosphorus levels -- can cause prolonged hypophosphatemia"
    }],
    pearls: ["Ferritin < 30 ng/mL is virtually diagnostic of IDA; < 15 ng/mL is definitive", "In inflammatory states, ferritin may be falsely normal -- use transferrin saturation < 20% and sTfR to confirm IDA", "Always investigate the cause: IDA in men or postmenopausal women is GI malignancy until proven otherwise", "Reticulocyte count should rise within 5-10 days of starting iron -- if not, reassess adherence, absorption, or diagnosis", "Avoid giving iron with PPIs or H2 blockers -- they reduce gastric acid needed for iron absorption", "Elevated RDW helps distinguish IDA (high RDW) from thalassemia trait (normal RDW), both microcytic"],
    quiz: [
      {
        question: "A 35-year-old woman with menorrhagia has Hgb 9.2, MCV 72, ferritin 8 ng/mL, and TIBC 450. Which laboratory pattern is most consistent with her diagnosis?",
        options: ["Low ferritin, low TIBC, high serum iron", "Low ferritin, high TIBC, low transferrin saturation", "High ferritin, normal TIBC, normal MCV", "Normal ferritin, low TIBC, elevated reticulocyte count"],
        correct: 1,
        rationale: "Iron deficiency anemia produces low ferritin (depleted stores), high TIBC (body trying to capture more iron), and low transferrin saturation. The microcytic MCV confirms hypoproliferative anemia from iron deficiency."
      },
      {
        question: "Which instruction should the NP include when prescribing oral ferrous sulfate?",
        options: ["Take with calcium-fortified orange juice for maximum absorption", "Take on an empty stomach with a source of vitamin C", "Take with a proton pump inhibitor to reduce GI side effects", "Take with meals to enhance iron bioavailability"],
        correct: 1,
        rationale: "Oral iron is best absorbed on an empty stomach in an acidic environment. Vitamin C (ascorbic acid) enhances non-heme iron absorption by reducing ferric (Fe3+) to ferrous (Fe2+) iron. PPIs and calcium inhibit absorption."
      },
      {
        question: "A 62-year-old male presents with new iron deficiency anemia. What is the most important next step?",
        options: ["Start oral iron and recheck in 3 months", "Order celiac disease serology", "Refer for upper and lower GI endoscopy to rule out malignancy", "Prescribe a multivitamin with iron and dietary counseling"],
        correct: 2,
        rationale: "In men and postmenopausal women, IDA should be considered a sign of GI blood loss until proven otherwise. Colonoscopy and EGD are essential to rule out colorectal cancer, gastric cancer, and peptic ulcer disease."
      }
    ]
  },
  "hematology-pathophysiology-np": {
    title: "Anemia Mechanisms: Production vs Destruction",
    cellular: { title: "Anemia Classification by Mechanism", content: "Anemia is classified by two complementary systems: mechanism (decreased production, increased destruction, blood loss) and morphology (microcytic, normocytic, macrocytic). Understanding both frameworks is essential for systematic differential diagnosis. Decreased production (hypoproliferative) anemias result from bone marrow failure to produce adequate RBCs. The reticulocyte production index (RPI) is < 2, indicating the marrow cannot compensate. Causes include nutritional deficiencies (iron, B12, folate), bone marrow suppression (aplastic anemia, myelodysplastic syndromes, chemotherapy), chronic kidney disease (decreased erythropoietin), anemia of chronic disease/inflammation (hepcidin-mediated iron sequestration), and marrow infiltration (myelophthisic anemia from metastatic cancer, myelofibrosis). Increased destruction (hemolytic) anemias have an RPI > 2, reflecting appropriate marrow compensation. They are classified as intrinsic (RBC membrane defects like hereditary spherocytosis, enzyme defects like G6PD deficiency, hemoglobin disorders like sickle cell disease and thalassemias) or extrinsic (autoimmune hemolytic anemia, microangiopathic hemolytic anemia in TTP/HUS/DIC, mechanical heart valves, infections like malaria). Hemolysis markers include elevated LDH, elevated indirect bilirubin, decreased haptoglobin (consumed by free hemoglobin binding), elevated reticulocyte count, and schistocytes on peripheral smear (in intravascular hemolysis). Blood loss anemias are initially normocytic/normochromic (acute hemorrhage) but become microcytic with chronic loss as iron stores deplete." },
    riskFactors: ["Nutritional deficiencies (iron, B12, folate) from poor diet or malabsorption", "Chronic kidney disease (decreased erythropoietin production)", "Chronic inflammatory conditions (RA, IBD, chronic infections) causing anemia of chronic disease", "Bone marrow disorders (MDS, aplastic anemia, leukemia)", "Inherited hemoglobinopathies (sickle cell disease, thalassemia)", "RBC enzyme deficiencies (G6PD deficiency) or membrane defects (hereditary spherocytosis)", "Autoimmune disorders (autoimmune hemolytic anemia, SLE)", "Medications causing bone marrow suppression or hemolysis"],
    diagnostics: ["CBC with indices: MCV classifies as microcytic (< 80), normocytic (80-100), or macrocytic (> 100)", "Reticulocyte count and reticulocyte production index (RPI): < 2 = hypoproliferative; > 2 = hemolytic/blood loss", "Peripheral blood smear: schistocytes (MAHA), spherocytes (hereditary or autoimmune), target cells (thalassemia, liver disease), sickle cells", "Hemolysis labs: LDH (elevated), indirect bilirubin (elevated), haptoglobin (decreased), reticulocyte count (elevated)", "Iron studies to differentiate IDA from anemia of chronic disease (ferritin, TIBC, transferrin saturation)", "Direct Coombs test (DAT): positive in autoimmune hemolytic anemia", "B12 and folate levels for macrocytic anemia; methylmalonic acid and homocysteine for confirmation", "Bone marrow biopsy if pancytopenia, suspected MDS, aplastic anemia, or infiltrative process"],
    management: ["Treat underlying cause based on mechanism classification", "Iron replacement for iron deficiency (oral or IV based on severity and tolerance)", "B12 supplementation (IM cyanocobalamin for pernicious anemia; oral for dietary deficiency)", "Folate supplementation 1-5 mg daily for folate deficiency", "Erythropoiesis-stimulating agents (epoetin alfa, darbepoetin) for CKD-related anemia with target Hgb 10-11.5 g/dL", "Corticosteroids and rituximab for autoimmune hemolytic anemia", "Transfusion for symptomatic anemia or hemodynamic instability (Hgb < 7 g/dL generally)", "Hematology referral for suspected marrow failure, MDS, or complex hemolytic anemias"],
    nursingActions: ["Obtain comprehensive history including diet, medications, bleeding history, family history of blood disorders", "Perform systematic physical examination for anemia signs (pallor, jaundice, splenomegaly, glossitis, neurologic findings)", "Collect and properly label all laboratory specimens (CBC, reticulocyte count, iron studies, hemolysis panel)", "Monitor and trend hemoglobin and reticulocyte response to treatment", "Administer blood transfusions per protocol with pre-transfusion verification and monitoring for reactions", "Educate patients on disease-specific dietary modifications and medication adherence", "Assess for complications of severe anemia (high-output heart failure, angina, syncope)", "Coordinate specialist referrals and follow-up diagnostic testing"],
    assessmentFindings: ["Fatigue, weakness, and decreased exercise tolerance (universal to all anemias)", "Pallor of skin, conjunctivae, and mucous membranes", "Tachycardia and systolic flow murmur (compensatory increased cardiac output)", "Jaundice and dark urine (hemolytic anemias -- elevated indirect bilirubin and urobilinogen)", "Splenomegaly (extravascular hemolysis, hereditary spherocytosis)", "Glossitis and neurologic symptoms (B12 deficiency -- subacute combined degeneration)", "Koilonychia and pica (iron deficiency)", "Bone pain and organomegaly (marrow infiltration or extramedullary hematopoiesis)"],
    signs: {
      left: ["Mild fatigue with preserved activity tolerance", "Compensatory tachycardia with exertion only", "Pallor without hemodynamic compromise", "Reticulocyte response appropriate for degree of anemia", "Stable hemoglobin trending upward with treatment"],
      right: ["Hemoglobin < 7 g/dL or rapidly falling", "Tachycardia at rest with hypotension (decompensated anemia)", "Chest pain or dyspnea at rest suggesting cardiac ischemia", "Jaundice with dark urine and declining haptoglobin (acute hemolytic crisis)", "Petechiae and mucosal bleeding (concurrent thrombocytopenia suggesting marrow failure or TTP)"]
    },
    medications: [{
      name: "Epoetin Alfa (Procrit/Epogen)",
      type: "Erythropoiesis-stimulating agent (ESA)",
      action: "Recombinant erythropoietin stimulates RBC production in bone marrow",
      sideEffects: "Hypertension, headache, arthralgia, increased risk of thromboembolic events, pure red cell aplasia (rare)",
      contra: "Uncontrolled hypertension, pure red cell aplasia from prior ESA use, Hgb > 10 g/dL (avoid overtreating)",
      pearl: "Target Hgb 10-11.5 g/dL in CKD; exceeding 11.5 increases cardiovascular events and mortality -- ensure adequate iron stores before starting"
    }, {
      name: "Cyanocobalamin (Vitamin B12)",
      type: "Water-soluble vitamin supplement",
      action: "Provides coenzyme for DNA synthesis and myelin maintenance; corrects megaloblastic anemia",
      sideEffects: "Hypokalemia during initial treatment (potassium shifts into new RBCs), injection site pain",
      contra: "Leber hereditary optic neuropathy (can worsen optic atrophy)",
      pearl: "IM injection required for pernicious anemia (lack of intrinsic factor prevents oral absorption); monitor potassium during initial repletion as rapid reticulocytosis consumes potassium"
    }],
    pearls: ["The reticulocyte production index (RPI) is the single most important test to classify anemia mechanism: < 2 = production problem, > 2 = destruction or blood loss", "Low haptoglobin is the most sensitive marker for hemolysis (consumed by binding free hemoglobin)", "Anemia of chronic disease has elevated ferritin (iron trapped in macrophages by hepcidin) vs IDA which has low ferritin", "B12 deficiency causes neurologic damage (subacute combined degeneration) that folate cannot prevent -- always check B12 before giving folate alone", "Schistocytes on peripheral smear = microangiopathic hemolytic anemia (TTP, HUS, DIC) -- a hematologic emergency", "MCV > 115 fL is almost always B12 or folate deficiency; MDS can also cause macrocytosis"],
    quiz: [
      {
        question: "A patient has anemia with a reticulocyte production index of 0.5. Which mechanism is most likely?",
        options: ["Acute blood loss", "Intravascular hemolysis", "Decreased bone marrow production", "Splenic sequestration"],
        correct: 2,
        rationale: "An RPI < 2 indicates the bone marrow is not producing enough RBCs to compensate for the anemia, pointing to a hypoproliferative mechanism such as nutritional deficiency, marrow failure, or chronic disease."
      },
      {
        question: "Which combination of lab findings is most consistent with hemolytic anemia?",
        options: ["Low LDH, high haptoglobin, low reticulocyte count", "High LDH, low haptoglobin, elevated indirect bilirubin", "Low ferritin, high TIBC, low MCV", "High ferritin, low TIBC, elevated ESR"],
        correct: 1,
        rationale: "Hemolysis releases LDH from destroyed RBCs, consumes haptoglobin (which binds free hemoglobin), and produces elevated indirect bilirubin from heme catabolism. These three markers together are classic for hemolytic anemia."
      },
      {
        question: "A patient with CKD is started on epoetin alfa. Which parameter must be assessed before initiating therapy?",
        options: ["Serum calcium level", "Iron stores (ferritin and transferrin saturation)", "Liver function tests", "Serum albumin level"],
        correct: 1,
        rationale: "ESAs stimulate erythropoiesis, which requires adequate iron for hemoglobin synthesis. If iron stores are depleted (ferritin < 100 or TSAT < 20%), the ESA will be ineffective. Iron must be repleted before or concurrently with ESA therapy."
      }
    ]
  },
  "hematology-rn": {
    title: "Acute Lymphoblastic Leukemia",
    cellular: { title: "Acute Lymphoblastic Leukemia", content: "Acute lymphoblastic leukemia (ALL) results from malignant transformation of lymphoid progenitor cells in the bone marrow, producing clonal proliferation of immature lymphoblasts that crowd out normal hematopoietic cells, causing bone marrow failure. The leukemic blasts acquire multiple genetic mutations (including Philadelphia chromosome translocation t(9;22) in some adult cases) that confer growth advantages through dysregulated cell cycle progression, impaired apoptosis, and blocked differentiation. Bone marrow failure manifests as anemia (fatigue, pallor, dyspnea), neutropenia (recurrent infections, fever), and thrombocytopenia (petechiae, bruising, hemorrhage). Extramedullary infiltration can involve the CNS (headache, cranial nerve palsies, vomiting), liver, spleen, lymph nodes, and testes. The nurse monitors CBC with differential, implements neutropenic precautions (hand hygiene, dietary restrictions, avoiding live plants and raw foods), assesses for tumor lysis syndrome during induction chemotherapy (hyperkalemia, hyperphosphatemia, hypocalcemia, hyperuricemia, acute kidney injury), administers chemotherapy safely per protocol, manages central venous access, provides meticulous mouth care to prevent mucositis, and supports the patient through the prolonged treatment course (2-3 years for maintenance therapy)." },
    riskFactors: ["Age: bimodal peak (2-5 years in children, > 65 years in adults)", "Prior radiation or chemotherapy exposure", "Genetic syndromes (Down syndrome -- 20x increased risk, Li-Fraumeni, ataxia-telangiectasia)", "Exposure to benzene or pesticides", "Viral infections (EBV associated with Burkitt-type ALL)", "Philadelphia chromosome t(9;22) -- poor prognosis marker in adults", "Male sex (slightly higher incidence)", "White/Hispanic ethnicity in pediatric populations"],
    diagnostics: ["CBC with differential: elevated WBC with circulating lymphoblasts, anemia, thrombocytopenia", "Peripheral blood smear: lymphoblasts with scant cytoplasm, fine chromatin, possible Auer rods (myeloid, not lymphoid -- helps rule out AML)", "Bone marrow biopsy: > 20% lymphoblasts confirms diagnosis", "Flow cytometry: immunophenotyping to classify B-cell vs T-cell ALL", "Cytogenetics and FISH: detect Philadelphia chromosome t(9;22), hyperdiploidy, MLL rearrangements", "Lumbar puncture: assess CNS involvement with CSF cytology", "Metabolic panel: baseline renal function, uric acid, LDH, potassium, phosphorus, calcium (tumor lysis risk)", "Chest X-ray: anterior mediastinal mass in T-cell ALL"],
    management: ["Induction chemotherapy per protocol (vincristine, prednisone, L-asparaginase, anthracycline)", "CNS prophylaxis with intrathecal methotrexate or cytarabine", "Consolidation and maintenance chemotherapy phases (total treatment 2-3 years)", "Allopurinol or rasburicase for tumor lysis syndrome prevention", "IV hydration to maintain high urine output during induction", "Tyrosine kinase inhibitor (imatinib, dasatinib) added for Philadelphia chromosome-positive ALL", "Blood product support: pRBCs for symptomatic anemia, platelets for bleeding or count < 10,000", "Stem cell transplant consideration for high-risk or relapsed disease"],
    nursingActions: ["Implement strict neutropenic precautions: hand hygiene, no fresh flowers/plants, no raw fruits/vegetables", "Monitor temperature every 4 hours -- report fever > 100.4°F (38°C) immediately as a medical emergency", "Administer chemotherapy per protocol using safe handling precautions (PPE, closed-system devices)", "Perform meticulous oral care with soft toothbrush and non-alcohol mouthwash to prevent mucositis", "Assess for bleeding: check skin for petechiae/ecchymosis, test stool/urine for occult blood", "Monitor for tumor lysis syndrome: hyperkalemia (cardiac monitoring), hyperphosphatemia, hypocalcemia, hyperuricemia", "Manage central venous access device: sterile dressing changes, assess for infection signs", "Provide psychosocial support for prolonged treatment course; coordinate child life specialist for pediatric patients"],
    assessmentFindings: ["Fatigue, pallor, and dyspnea on exertion (anemia)", "Fever, recurrent infections (neutropenia)", "Easy bruising, petechiae, epistaxis, gingival bleeding (thrombocytopenia)", "Bone pain (marrow expansion from blast proliferation)", "Lymphadenopathy (generalized, painless)", "Hepatosplenomegaly (extramedullary infiltration)", "Headache, vomiting, cranial nerve palsies (CNS involvement)", "Testicular enlargement (sanctuary site in males)"],
    signs: {
      left: ["Fatigue and decreased activity tolerance", "Mild pallor without hemodynamic instability", "Small painless lymphadenopathy", "Mild bone or joint pain", "CBC showing mild cytopenia with some blasts"],
      right: ["Fever > 100.4°F with ANC < 500 (febrile neutropenia -- emergency)", "Active hemorrhage or DIC (bleeding from multiple sites)", "Tumor lysis syndrome (peaked T waves, muscle cramping, oliguria)", "Severe anemia with tachycardia and chest pain", "Signs of CNS involvement (severe headache, papilledema, seizures)"]
    },
    medications: [{
      name: "Vincristine",
      type: "Vinca alkaloid (chemotherapy)",
      action: "Inhibits microtubule formation during mitosis, arresting cell division in metaphase",
      sideEffects: "Peripheral neuropathy (dose-limiting), constipation/ileus, jaw pain, alopecia, SIADH",
      contra: "Intrathecal administration is FATAL -- IV only; severe pre-existing neuropathy",
      pearl: "VESICANT -- causes severe tissue necrosis if extravasated; assess IV site continuously during infusion; cap dose at 2 mg in adults"
    }, {
      name: "L-Asparaginase",
      type: "Enzyme (chemotherapy)",
      action: "Depletes asparagine, an amino acid leukemic blasts cannot synthesize, causing blast cell death",
      sideEffects: "Anaphylaxis (have epinephrine ready), pancreatitis, hepatotoxicity, coagulopathy (decreased fibrinogen/AT-III), hyperglycemia",
      contra: "History of serious allergic reaction to asparaginase, active pancreatitis, severe hepatic impairment",
      pearl: "Monitor for anaphylaxis during first 30 minutes; check amylase/lipase, fibrinogen, and glucose regularly; PEG-asparaginase has longer half-life allowing less frequent dosing"
    }],
    pearls: ["Febrile neutropenia (fever + ANC < 500) is a medical emergency requiring immediate blood cultures and empiric broad-spectrum antibiotics within 1 hour", "Tumor lysis syndrome is most likely 12-72 hours after starting induction chemotherapy -- monitor potassium, phosphorus, calcium, uric acid, and creatinine", "Never administer vincristine intrathecally -- this error is universally fatal", "ALL is the most common childhood cancer with > 90% cure rate in children but only 30-40% in adults", "Philadelphia chromosome-positive ALL has historically poor prognosis but improved dramatically with TKI addition", "Avoid rectal temperatures, IM injections, and aspirin/NSAIDs in thrombocytopenic patients"],
    quiz: [
      {
        question: "A child receiving induction chemotherapy for ALL develops a temperature of 101.2°F and an ANC of 300. What is the priority nursing action?",
        options: ["Apply a cooling blanket and recheck temperature in 1 hour", "Obtain blood cultures and notify the provider immediately for emergent antibiotics", "Administer acetaminophen and continue routine monitoring", "Place the child in a private room and restrict visitors"],
        correct: 1,
        rationale: "Febrile neutropenia (temp > 100.4°F with ANC < 500) is a medical emergency. Blood cultures must be obtained and empiric broad-spectrum antibiotics started within 1 hour to prevent sepsis and death."
      },
      {
        question: "Which laboratory finding during induction chemotherapy indicates tumor lysis syndrome?",
        options: ["Elevated sodium and decreased potassium", "Hyperkalemia, hyperphosphatemia, hypocalcemia, and hyperuricemia", "Elevated hemoglobin and platelet count", "Decreased LDH and normal uric acid"],
        correct: 1,
        rationale: "Tumor lysis syndrome results from rapid destruction of leukemic cells, releasing intracellular contents (potassium, phosphorus, uric acid). Phosphorus binds calcium causing hypocalcemia. Uric acid and calcium-phosphate crystals can cause acute kidney injury."
      },
      {
        question: "A nurse is caring for a patient with ALL and a platelet count of 8,000/mm³. Which intervention should the nurse implement?",
        options: ["Encourage vigorous oral hygiene with a firm toothbrush", "Administer aspirin for headache as needed", "Use a soft toothbrush and avoid IM injections, rectal temperatures, and razors", "Encourage increased physical activity to maintain strength"],
        correct: 2,
        rationale: "With severe thrombocytopenia (< 10,000), bleeding precautions are essential: soft toothbrush, electric razor only, avoid invasive procedures, no rectal temps or suppositories, no aspirin/NSAIDs, and apply prolonged pressure to puncture sites."
      }
    ]
  },
  "hematopoiesis-np": {
    title: "Hematopoiesis",
    cellular: { title: "Pathophysiology of Hematopoiesis", content: "Hematopoiesis is the process by which all blood cells are produced from pluripotent hematopoietic stem cells (HSCs) residing primarily in the bone marrow. HSCs are capable of self-renewal and differentiation into two major lineages: myeloid (via common myeloid progenitor -- producing erythrocytes, platelets, granulocytes, and monocytes) and lymphoid (via common lymphoid progenitor -- producing B cells, T cells, and NK cells). This hierarchical differentiation is tightly regulated by hematopoietic growth factors and cytokines: erythropoietin (EPO, produced by renal peritubular cells in response to hypoxia) drives erythropoiesis; thrombopoietin (TPO, produced primarily by the liver) regulates megakaryopoiesis and platelet production; granulocyte colony-stimulating factor (G-CSF) stimulates neutrophil production; and various interleukins guide lymphoid development. In fetal life, hematopoiesis occurs sequentially in the yolk sac (weeks 3-8), liver and spleen (weeks 6-28), and finally bone marrow (from week 18 onward). In adults, active hematopoiesis is restricted to the axial skeleton (pelvis, vertebrae, sternum, ribs, skull, proximal femur/humerus). Extramedullary hematopoiesis (liver, spleen) can resume in pathologic states such as myelofibrosis or severe chronic anemia, causing hepatosplenomegaly. The bone marrow microenvironment (niche) provides critical signals through cell-cell interactions, extracellular matrix components, and soluble factors that maintain HSC quiescence, self-renewal, and appropriate lineage commitment. Disruption of these regulatory mechanisms leads to cytopenias, myeloproliferative neoplasms, or leukemias." },
    riskFactors: ["Bone marrow failure syndromes (aplastic anemia, Fanconi anemia)", "Myelodysplastic syndromes (clonal stem cell disorder with ineffective hematopoiesis)", "Nutritional deficiencies (iron, B12, folate, copper) impairing cell production", "Chronic kidney disease (decreased EPO production)", "Myelofibrosis (fibrotic replacement of marrow)", "Chemotherapy and radiation (myelosuppression)", "Viral infections (HIV, parvovirus B19, hepatitis) suppressing marrow", "Medications causing bone marrow suppression (methotrexate, azathioprine, chloramphenicol)"],
    diagnostics: ["CBC with differential and peripheral blood smear to assess all cell lineages", "Reticulocyte count to evaluate erythropoietic activity", "Bone marrow aspirate and biopsy: cellularity, blast percentage, dysplastic changes, fibrosis grading", "Flow cytometry for immunophenotyping of abnormal cell populations", "Cytogenetics and molecular studies (JAK2, CALR, MPL for myeloproliferative neoplasms; del(5q), -7 for MDS)", "Erythropoietin level (elevated in appropriate marrow response, low in CKD)", "Iron studies, B12, folate to exclude nutritional causes of cytopenias", "Serum LDH and haptoglobin if hemolysis contributing to anemia"],
    management: ["Treat underlying cause of hematopoietic failure", "Growth factor support: EPO/darbepoetin for anemia of CKD; G-CSF/GM-CSF for neutropenia", "Thrombopoietin receptor agonists (eltrombopag, romiplostim) for refractory thrombocytopenia", "Immunosuppressive therapy (ATG + cyclosporine) for aplastic anemia", "Lenalidomide for MDS with del(5q)", "Hypomethylating agents (azacitidine, decitabine) for higher-risk MDS", "Allogeneic stem cell transplant for severe aplastic anemia or high-risk MDS in eligible patients", "Transfusion support with iron chelation (deferasirox) for transfusion-dependent patients"],
    nursingActions: ["Monitor CBC with differential trending to detect worsening cytopenias early", "Assess for infection signs in neutropenic patients -- fever may be the only sign", "Implement bleeding precautions for thrombocytopenic patients (platelet < 50,000)", "Administer growth factors per protocol (G-CSF subcutaneously, EPO subcutaneously)", "Monitor for bone pain with G-CSF (common side effect from marrow stimulation)", "Educate patients on signs/symptoms requiring emergency evaluation (fever, bleeding, severe fatigue)", "Coordinate bone marrow biopsy preparation and post-procedure care", "Monitor iron overload markers (ferritin) in chronically transfused patients"],
    assessmentFindings: ["Pancytopenia: fatigue/pallor (anemia), infections (neutropenia), bleeding (thrombocytopenia)", "Splenomegaly and hepatomegaly (extramedullary hematopoiesis or infiltrative disease)", "Constitutional symptoms: weight loss, night sweats, fatigue (marrow failure or malignancy)", "Bone pain (marrow expansion or infiltration)", "Leukoerythroblastic blood smear (immature WBCs and nucleated RBCs -- suggests marrow infiltration)", "Petechiae and ecchymoses (platelet dysfunction or deficiency)", "Recurrent infections especially with unusual organisms (fungal, atypical mycobacteria)", "Pallor with flow murmur (chronic anemia with compensatory increased cardiac output)"],
    signs: {
      left: ["Mild fatigue with stable hemoglobin", "Adequate reticulocyte response to anemia", "Normal or mildly elevated MCV", "Stable platelet and WBC counts", "No splenomegaly or constitutional symptoms"],
      right: ["Pancytopenia (anemia + neutropenia + thrombocytopenia) suggesting marrow failure", "Circulating blasts on peripheral smear (possible acute leukemia transformation)", "Massive splenomegaly with early satiety (myelofibrosis or myeloproliferative neoplasm)", "Severe neutropenia (ANC < 500) with fever -- neutropenic emergency", "Transfusion dependence with rising ferritin (iron overload risk)"]
    },
    medications: [{
      name: "Filgrastim (G-CSF, Neupogen)",
      type: "Granulocyte colony-stimulating factor",
      action: "Stimulates neutrophil production and maturation in bone marrow; mobilizes stem cells to peripheral blood",
      sideEffects: "Bone pain (most common), splenic enlargement/rupture (rare), leukocytosis, injection site reactions",
      contra: "Known hypersensitivity; use caution in sickle cell disease (can precipitate crisis)",
      pearl: "Give subcutaneously; bone pain is managed with NSAIDs or acetaminophen; also used for stem cell mobilization prior to transplant harvest"
    }, {
      name: "Eltrombopag (Promacta)",
      type: "Thrombopoietin receptor agonist",
      action: "Stimulates megakaryocyte proliferation and platelet production by activating TPO receptor",
      sideEffects: "Hepatotoxicity (monitor LFTs), thrombotic events, bone marrow fibrosis with prolonged use",
      contra: "Severe hepatic impairment; avoid calcium, iron, and antacids within 4 hours (impair absorption)",
      pearl: "Take on empty stomach 1 hour before or 2 hours after meals; do not take with dairy products; also FDA-approved for severe aplastic anemia as part of IST regimen"
    }],
    pearls: ["The bone marrow produces approximately 200 billion RBCs, 100 billion WBCs, and 100 billion platelets daily", "Erythropoietin is produced by peritubular interstitial cells of the kidney in response to hypoxia -- CKD patients lose this production", "A leukoerythroblastic smear (tear-drop RBCs, nucleated RBCs, immature WBCs) suggests marrow infiltration -- always order bone marrow biopsy", "Parvovirus B19 selectively infects erythroid precursors and causes pure red cell aplasia -- devastating in sickle cell patients (aplastic crisis)", "JAK2 V617F mutation is positive in > 95% of polycythemia vera and ~50% of essential thrombocythemia and myelofibrosis", "Extramedullary hematopoiesis causes hepatosplenomegaly -- the body recruits fetal hematopoietic sites when marrow fails"],
    quiz: [
      {
        question: "A patient with chronic kidney disease has a hemoglobin of 8.5 g/dL and an inappropriately low reticulocyte count. What is the primary mechanism of anemia?",
        options: ["Increased hemolysis from uremic toxins", "Iron deficiency from dietary restriction", "Decreased erythropoietin production by damaged kidneys", "Folate deficiency from dialysis losses"],
        correct: 2,
        rationale: "The kidneys produce erythropoietin in response to hypoxia. In CKD, damaged peritubular cells produce insufficient EPO, resulting in decreased erythropoiesis and anemia with a low reticulocyte count (hypoproliferative anemia)."
      },
      {
        question: "Which peripheral blood smear finding most strongly suggests bone marrow infiltration?",
        options: ["Target cells and basophilic stippling", "Leukoerythroblastic picture with tear-drop cells", "Hypersegmented neutrophils and macro-ovalocytes", "Spherocytes and polychromasia"],
        correct: 1,
        rationale: "A leukoerythroblastic smear (nucleated RBCs, immature granulocytes, tear-drop cells/dacrocytes) indicates marrow space-occupying pathology such as myelofibrosis, metastatic cancer, or granulomatous disease disrupting normal hematopoiesis."
      },
      {
        question: "A patient receiving filgrastim reports severe bone pain on day 3 of therapy. What is the most appropriate response?",
        options: ["Discontinue filgrastim immediately -- this indicates splenic rupture", "Administer NSAIDs or acetaminophen -- bone pain is an expected side effect of marrow stimulation", "Obtain an emergent bone marrow biopsy", "Switch to erythropoietin instead"],
        correct: 1,
        rationale: "Bone pain is the most common side effect of G-CSF, caused by rapid expansion of myeloid precursors in the marrow. It is managed with analgesics (NSAIDs, acetaminophen, or loratadine). Splenic rupture is rare and would present with left upper quadrant pain and hemodynamic instability."
      }
    ]
  },
  "hemochromatosis-np": {
    title: "Hemochromatosis",
    cellular: { title: "Iron Overload Pathophysiology", content: "Hereditary hemochromatosis (HH) is an autosomal recessive disorder of iron metabolism caused most commonly by mutations in the HFE gene (C282Y homozygosity accounts for > 80% of cases in Northern European populations). The HFE protein normally interacts with transferrin receptor 1 and the iron-regulatory hormone hepcidin to control intestinal iron absorption. In HH, dysfunctional HFE leads to inappropriately low hepcidin levels, causing unrestricted iron absorption from the duodenum (absorbing 3-4 mg/day instead of the normal 1-2 mg/day). Over decades, iron accumulates in parenchymal cells of the liver, heart, pancreas, pituitary gland, and joints, generating reactive oxygen species (ROS) through Fenton chemistry (Fe²⁺ + H₂O₂ → Fe³⁺ + OH⁻ + OH·). These hydroxyl radicals cause lipid peroxidation, mitochondrial dysfunction, DNA damage, and ultimately fibrosis and organ failure. Hepatic iron overload progresses from hepatocellular siderosis to fibrosis to cirrhosis (with 200-fold increased risk of hepatocellular carcinoma). Cardiac iron deposition causes restrictive or dilated cardiomyopathy and conduction defects. Pancreatic beta-cell destruction leads to diabetes mellitus ('bronze diabetes'). Pituitary iron deposition causes hypogonadotropic hypogonadism. Joint iron deposition (particularly second and third MCP joints) produces a characteristic arthropathy." },
    riskFactors: ["C282Y homozygous mutation in HFE gene (highest risk)", "Northern European/Celtic ancestry (1 in 200 prevalence of C282Y homozygosity)", "Male sex (clinical disease 5-10x more common due to lack of menstrual iron losses)", "Compound heterozygosity (C282Y/H63D) -- lower penetrance", "Chronic alcohol use (accelerates liver damage from iron overload)", "Hepatitis C coinfection (accelerates fibrosis)", "High dietary iron and vitamin C supplementation (increases absorption)", "Post-menopausal women (loss of protective menstrual iron losses)"],
    diagnostics: ["Transferrin saturation > 45% (screening test of choice -- elevated early)", "Serum ferritin (reflects total body iron stores): > 300 ng/mL in men, > 200 ng/mL in women suggests overload", "HFE gene testing for C282Y and H63D mutations (confirmatory)", "Liver MRI with T2* imaging (quantitative non-invasive assessment of hepatic iron concentration)", "Liver biopsy: hepatic iron index > 1.9 is diagnostic; assess fibrosis/cirrhosis staging", "Hepatic function panel: ALT/AST elevation, progressive liver dysfunction", "Fasting glucose or HbA1c for diabetes screening", "Echocardiogram and ECG if cardiac involvement suspected", "Testosterone, LH, FSH levels to screen for hypogonadism"],
    management: ["Therapeutic phlebotomy: remove 500 mL (250 mg iron) weekly until ferritin < 50-100 ng/mL", "Maintenance phlebotomy every 2-4 months to keep ferritin 50-100 ng/mL lifelong", "Iron chelation therapy (deferasirox, deferoxamine) only if phlebotomy contraindicated (severe anemia, heart failure)", "Screen for hepatocellular carcinoma with ultrasound and AFP every 6 months if cirrhosis present", "Treat diabetes, heart failure, hypogonadism as indicated", "First-degree relative screening with transferrin saturation and HFE gene testing", "Dietary counseling: avoid iron supplements, limit vitamin C supplements, avoid raw shellfish (Vibrio vulnificus risk)", "Hepatology referral for cirrhosis management; cardiology for cardiomyopathy"],
    nursingActions: ["Educate patient about lifelong need for phlebotomy maintenance therapy", "Monitor hemoglobin and ferritin levels before each phlebotomy session", "Assess for symptoms of anemia during aggressive iron depletion phase", "Hold phlebotomy if hemoglobin < 11 g/dL and notify provider", "Educate to avoid iron-fortified foods, iron supplements, and excess vitamin C", "Warn about risk of Vibrio vulnificus from raw oysters/shellfish (fatal in iron-overloaded patients)", "Coordinate genetic counseling and family screening for first-degree relatives", "Monitor for complications: diabetes management, cardiac symptoms, joint pain, liver disease progression"],
    assessmentFindings: ["Bronze or slate-gray skin hyperpigmentation", "Hepatomegaly progressing to cirrhosis", "Diabetes mellitus ('bronze diabetes')", "Arthropathy affecting second and third MCP joints (painful grip)", "Erectile dysfunction and decreased libido (hypogonadism)", "Fatigue and weakness (most common presenting symptom)", "Cardiomyopathy (heart failure symptoms, arrhythmias)", "Elevated transferrin saturation and ferritin on routine labs"],
    signs: {
      left: ["Elevated transferrin saturation > 45% on screening", "Mild fatigue without organ damage", "Elevated ferritin without symptoms", "Family history prompting screening", "Normal liver enzymes and function"],
      right: ["Ferritin > 1000 ng/mL with organ involvement", "Cirrhosis with risk of hepatocellular carcinoma", "New-onset heart failure or arrhythmias from cardiac iron deposition", "Severe bronze skin pigmentation with diabetes and arthropathy (classic triad)", "Vibrio vulnificus sepsis from raw shellfish exposure"]
    },
    medications: [{
      name: "Therapeutic Phlebotomy",
      type: "First-line treatment for iron removal",
      action: "Removes 500 mL whole blood (250 mg iron) per session, depleting iron stores over time",
      sideEffects: "Fatigue, lightheadedness, vasovagal syncope, anemia if too aggressive",
      contra: "Severe anemia (Hgb < 11 g/dL -- hold until recovery), hemodynamic instability",
      pearl: "Weekly phlebotomy during depletion phase (may take 1-2 years); then maintenance every 2-4 months targeting ferritin 50-100 ng/mL"
    }, {
      name: "Deferasirox (Exjade/Jadenu)",
      type: "Oral iron chelator",
      action: "Binds excess tissue iron and promotes excretion in feces",
      sideEffects: "GI disturbances (nausea, diarrhea, abdominal pain), renal toxicity (monitor creatinine), hepatotoxicity, skin rash",
      contra: "CrCl < 40 mL/min, high-risk MDS, platelet count < 50,000",
      pearl: "Used when phlebotomy is contraindicated (e.g., transfusion-dependent anemias); Jadenu formulation can be taken with food; monitor renal and hepatic function monthly"
    }],
    pearls: ["Transferrin saturation > 45% is the best screening test; ferritin reflects total body stores but lags behind", "The classic triad of hemochromatosis is cirrhosis + diabetes + bronze skin ('bronze diabetes') -- but most patients are diagnosed before this stage on screening labs", "Arthropathy of the 2nd and 3rd MCP joints is highly characteristic -- looks like 'iron fist' on X-ray with hook-like osteophytes", "Patients with cirrhosis from hemochromatosis have 200x increased risk of hepatocellular carcinoma -- lifelong screening required even after iron depletion", "Raw shellfish (especially oysters) can transmit Vibrio vulnificus, which thrives in iron-rich blood and has 50% mortality in hemochromatosis", "Iron removal can reverse cardiac dysfunction and improve diabetes control but cannot reverse cirrhosis or arthropathy"],
    quiz: [
      {
        question: "Which laboratory test is the best initial screening test for hereditary hemochromatosis?",
        options: ["Serum ferritin level", "Serum iron level", "Fasting transferrin saturation", "Liver biopsy with iron staining"],
        correct: 2,
        rationale: "Fasting transferrin saturation > 45% is the most sensitive initial screening test for hemochromatosis. It becomes elevated before ferritin rises. If elevated, HFE gene testing confirms the diagnosis."
      },
      {
        question: "A patient with newly diagnosed hemochromatosis asks which foods to avoid. What is the most critical dietary restriction?",
        options: ["Avoid all dairy products", "Avoid raw shellfish due to Vibrio vulnificus risk", "Avoid all fruits containing vitamin C", "Avoid high-protein foods to prevent liver stress"],
        correct: 1,
        rationale: "Vibrio vulnificus thrives in iron-rich environments and can cause rapidly fatal sepsis in iron-overloaded patients. Raw oysters and shellfish are the primary source. This is a life-threatening risk that all hemochromatosis patients must understand."
      },
      {
        question: "Which organ damage from hemochromatosis is irreversible even after successful iron depletion?",
        options: ["Cardiomyopathy", "Diabetes mellitus", "Hepatic cirrhosis and arthropathy", "Skin hyperpigmentation"],
        correct: 2,
        rationale: "Established cirrhosis and joint damage (arthropathy) are irreversible. However, cardiac dysfunction can improve, diabetes control may improve, and skin pigmentation can lighten with iron depletion. This underscores the importance of early diagnosis and treatment."
      }
    ]
  },
  "hemochromatosis-rn": {
    title: "Hemochromatosis: Nursing Management",
    cellular: { title: "Iron Overload and Organ Damage", content: "Hemochromatosis is a disorder of iron metabolism in which excessive iron accumulates in body tissues, causing progressive organ damage. In hereditary hemochromatosis (most common form), a genetic mutation causes the intestines to absorb too much dietary iron. Since the body has no mechanism to excrete excess iron, it deposits in the liver (causing cirrhosis), pancreas (causing diabetes), heart (causing cardiomyopathy and arrhythmias), skin (causing bronze discoloration), joints (causing arthropathy), and pituitary gland (causing hypogonadism). The liver is the primary site of iron storage and damage, with iron-induced oxidative stress causing hepatocyte injury, inflammation, fibrosis, and eventually cirrhosis. Patients with cirrhosis have a greatly increased risk of hepatocellular carcinoma. The nurse plays a critical role in managing therapeutic phlebotomy (the primary treatment), monitoring for complications, educating patients about dietary modifications, and coordinating family screening." },
    riskFactors: ["Northern European/Celtic descent", "Family history of hemochromatosis (autosomal recessive inheritance)", "Male sex (clinical disease more common due to no menstrual iron losses)", "Post-menopausal women", "Chronic alcohol use (worsens liver damage)", "Excessive iron supplementation or vitamin C megadoses", "Multiple blood transfusions (secondary iron overload)", "Hepatitis C coinfection"],
    diagnostics: ["Transferrin saturation > 45% (best screening test)", "Serum ferritin elevated: > 300 ng/mL men, > 200 ng/mL women", "HFE genetic testing to confirm hereditary type", "Liver function tests (AST, ALT may be elevated)", "Liver MRI for non-invasive iron quantification", "Fasting blood glucose or HbA1c (screen for diabetes)", "Monitor CBC before each phlebotomy (check hemoglobin)", "Liver biopsy if cirrhosis suspected"],
    management: ["Therapeutic phlebotomy weekly until ferritin normalized (< 50-100 ng/mL)", "Maintenance phlebotomy every 2-4 months lifelong", "Dietary modifications: avoid iron supplements, limit vitamin C, avoid raw shellfish", "Screen and manage complications (diabetes, cirrhosis, cardiomyopathy)", "First-degree family member screening with transferrin saturation and genetic testing", "Hepatocellular carcinoma surveillance if cirrhosis present", "Avoid alcohol to prevent accelerated liver damage", "Iron chelation (deferasirox) only if phlebotomy is not feasible"],
    nursingActions: ["Prepare patient for therapeutic phlebotomy: ensure adequate hydration, recent meal", "Monitor hemoglobin before each phlebotomy -- hold if Hgb < 11 g/dL and notify provider", "Assess for vasovagal response during and after phlebotomy (dizziness, pallor, diaphoresis)", "Educate patient to avoid iron-rich supplements, cast iron cookware, and vitamin C megadoses", "Warn about Vibrio vulnificus risk from raw shellfish -- potentially fatal in iron overload", "Monitor for complications: check blood glucose, assess cardiac symptoms, evaluate joint pain", "Coordinate family screening and genetic counseling referrals", "Provide emotional support -- lifelong phlebotomy can be burdensome"],
    assessmentFindings: ["Fatigue and weakness (most common early symptom)", "Bronze or grayish skin pigmentation", "Joint pain especially in hands (2nd and 3rd MCP joints)", "Hepatomegaly and right upper quadrant discomfort", "Symptoms of diabetes (polyuria, polydipsia, polyphagia)", "Erectile dysfunction and decreased libido in men", "Signs of heart failure (dyspnea, edema, JVD)", "Elevated liver enzymes on routine blood work"],
    signs: {
      left: ["Fatigue and general malaise", "Mildly elevated transferrin saturation on screening", "Elevated ferritin without organ symptoms", "Family history identified on screening", "Joint stiffness without deformity"],
      right: ["Liver failure signs: jaundice, ascites, coagulopathy", "New-onset heart failure or cardiac arrhythmias", "Severe hypoglycemia from pancreatic insufficiency", "Sepsis from Vibrio vulnificus (raw shellfish exposure)", "Hepatocellular carcinoma (weight loss, RUQ mass, rising AFP)"]
    },
    medications: [{
      name: "Therapeutic Phlebotomy",
      type: "First-line treatment",
      action: "Removes 500 mL whole blood per session to deplete excess iron stores",
      sideEffects: "Fatigue, dizziness, vasovagal syncope, iron deficiency anemia if over-treated",
      contra: "Hemoglobin < 11 g/dL, hemodynamic instability, severe cardiac disease",
      pearl: "Most patients need weekly phlebotomy for 1-2 years initially, then every 2-4 months for maintenance; goal ferritin 50-100 ng/mL"
    }, {
      name: "Deferoxamine (Desferal)",
      type: "Parenteral iron chelator",
      action: "Binds free iron and promotes urinary and fecal excretion",
      sideEffects: "Injection site reactions, ototoxicity (hearing loss), retinal toxicity (vision changes), orange-red urine",
      contra: "Severe renal disease, anuria",
      pearl: "Given as slow subcutaneous infusion over 8-12 hours; monitor hearing and vision annually; urine turning orange-red is expected and indicates drug is working"
    }],
    pearls: ["Fatigue is the most common presenting symptom but is often overlooked -- always check iron studies in unexplained fatigue", "The classic triad is cirrhosis + diabetes + bronze skin, but most patients are diagnosed before this stage", "Phlebotomy can reverse cardiac dysfunction but cannot reverse established cirrhosis", "Raw shellfish (oysters) can be fatal -- Vibrio vulnificus thrives in iron-overloaded patients", "Screen all first-degree relatives with transferrin saturation and HFE gene testing", "Hemochromatosis patients should carry a medical ID and inform all healthcare providers"],
    quiz: [
      {
        question: "A patient with hemochromatosis is scheduled for weekly phlebotomy. Which pre-procedure assessment is most important?",
        options: ["Check the patient's weight", "Verify hemoglobin level before proceeding", "Assess skin color for pigmentation changes", "Review the patient's dietary intake log"],
        correct: 1,
        rationale: "Hemoglobin must be checked before each phlebotomy session. If Hgb is < 11 g/dL, the phlebotomy should be held to prevent symptomatic anemia. The provider should be notified to adjust the schedule."
      },
      {
        question: "Which dietary teaching is essential for a patient newly diagnosed with hemochromatosis?",
        options: ["Increase vitamin C intake to support immune function", "Avoid raw shellfish due to risk of Vibrio vulnificus sepsis", "Take iron supplements to prevent anemia from phlebotomy", "Cook exclusively with cast iron cookware to enhance nutrition"],
        correct: 1,
        rationale: "Vibrio vulnificus in raw shellfish can cause rapidly fatal sepsis in patients with iron overload. Iron supplements and excess vitamin C (which enhances iron absorption) should be avoided. Cast iron cookware increases dietary iron content."
      },
      {
        question: "A nurse is educating a patient about hemochromatosis complications. Which organ damage is reversible with treatment?",
        options: ["Liver cirrhosis", "Joint arthropathy", "Cardiac dysfunction", "Hepatocellular carcinoma"],
        correct: 2,
        rationale: "Cardiac iron deposition and resulting cardiomyopathy can improve or reverse with iron depletion through phlebotomy. However, established cirrhosis, joint damage, and cancer are irreversible, emphasizing the importance of early treatment."
      }
    ]
  },
  "hemodialysis-basics-rpn": {
    title: "Hemodialysis Basics",
    cellular: { title: "Hemodialysis Principles", content: "Hemodialysis is a renal replacement therapy that filters waste products, excess fluid, and electrolytes from the blood when the kidneys can no longer perform these functions adequately (typically at GFR < 15 mL/min or ESKD). Blood is pumped from the patient through an extracorporeal circuit to a dialyzer (artificial kidney) containing a semipermeable membrane. Waste products (urea, creatinine, potassium) move from the blood across the membrane into the dialysate by diffusion (concentration gradient). Excess fluid is removed by ultrafiltration (hydrostatic pressure gradient). Dialysate composition is carefully controlled -- it contains sodium, bicarbonate (to correct metabolic acidosis), glucose, calcium, and magnesium but no urea, creatinine, or potassium, creating favorable gradients for toxin removal. Hemodialysis requires reliable vascular access: an arteriovenous fistula (AVF, preferred -- lowest infection and complication rates), arteriovenous graft (AVG), or central venous catheter (CVC, highest infection risk). Standard hemodialysis is performed 3 times per week for 3-4 hours per session. The nurse monitors for complications including hypotension (most common), muscle cramping, disequilibrium syndrome, air embolism, and vascular access complications." },
    riskFactors: ["End-stage kidney disease (ESKD) from any cause", "Diabetes mellitus (leading cause of ESKD)", "Hypertension (second leading cause of ESKD)", "Glomerulonephritis and polycystic kidney disease", "Acute kidney injury not responding to medical management", "Severe hyperkalemia refractory to medical treatment", "Severe metabolic acidosis unresponsive to bicarbonate", "Uremic pericarditis or encephalopathy (emergent indications)"],
    diagnostics: ["BUN and creatinine to assess uremia", "Electrolytes: potassium, sodium, calcium, phosphorus (pre- and post-dialysis)", "CBC: monitor anemia (most ESKD patients have chronic anemia from low EPO)", "Kt/V and urea reduction ratio (URR) to assess dialysis adequacy (target Kt/V > 1.2)", "Vascular access assessment: thrill (palpable vibration) and bruit (audible whooshing) of AV fistula", "Phosphorus and PTH levels (renal osteodystrophy monitoring)", "Albumin level (nutritional status marker)", "Monthly blood cultures if central venous catheter in place"],
    management: ["Schedule hemodialysis 3 times per week for 3-4 hours per session", "Maintain fluid restriction (typically 1-1.5 L/day between sessions)", "Dietary restrictions: limit potassium, phosphorus, sodium; adequate protein intake", "Manage anemia with erythropoiesis-stimulating agents and IV iron", "Phosphate binders with meals (calcium acetate, sevelamer) to prevent hyperphosphatemia", "Manage secondary hyperparathyroidism with calcitriol or cinacalcet", "Vascular access care and monitoring for complications", "Antihypertensive management with dialysis-friendly agents"],
    nursingActions: ["Assess AV fistula/graft before each treatment: palpate for thrill, auscultate for bruit", "Never use the fistula arm for blood pressure, blood draws, or IV access", "Weigh patient before and after each dialysis session to calculate fluid removal", "Monitor vital signs every 15-30 minutes during treatment", "Intervene for hypotension: lower head, administer normal saline bolus, reduce ultrafiltration rate", "Assess for signs of disequilibrium syndrome: headache, nausea, confusion, seizures", "Educate patient on dietary and fluid restrictions between sessions", "Monitor for access complications: clotting (loss of thrill/bruit), infection, aneurysm, steal syndrome"],
    assessmentFindings: ["Uremic symptoms: fatigue, nausea, anorexia, metallic taste, pruritus", "Fluid overload between treatments: weight gain, edema, dyspnea, crackles", "AV fistula: palpable thrill and audible bruit indicate patency", "Hyperkalemia symptoms: muscle weakness, paresthesias, cardiac arrhythmias", "Uremic frost (late finding): white crystalline deposits on skin", "Restless leg syndrome and peripheral neuropathy", "Signs of malnutrition: low albumin, muscle wasting", "Intradialytic hypotension: lightheadedness, nausea, cramping"],
    signs: {
      left: ["Functioning AV fistula with thrill and bruit", "Stable pre-dialysis weight (adherent to fluid restriction)", "Adequate Kt/V (> 1.2) and URR (> 65%)", "Potassium and phosphorus within acceptable pre-dialysis range", "Patient tolerating dialysis without hypotension"],
      right: ["Loss of thrill/bruit in AV fistula (clotted access -- emergency)", "Severe hyperkalemia with ECG changes (peaked T waves, widened QRS)", "Pulmonary edema from fluid overload between sessions", "Signs of access infection: erythema, warmth, drainage, fever", "Disequilibrium syndrome: seizures, altered consciousness during/after dialysis"]
    },
    medications: [{
      name: "Heparin (during dialysis)",
      type: "Anticoagulant",
      action: "Prevents blood clotting in the extracorporeal circuit during hemodialysis",
      sideEffects: "Bleeding, heparin-induced thrombocytopenia (HIT), prolonged clotting after treatment",
      contra: "Active bleeding, HIT history, recent surgery",
      pearl: "Given as bolus at start of treatment with possible continuous infusion; apply manual pressure to access sites after needle removal for at least 10-20 minutes"
    }, {
      name: "Sevelamer (Renagel/Renvela)",
      type: "Phosphate binder (non-calcium based)",
      action: "Binds dietary phosphorus in the GI tract, preventing absorption and lowering serum phosphorus",
      sideEffects: "Nausea, constipation, flatulence, abdominal discomfort",
      contra: "Bowel obstruction, hypophosphatemia",
      pearl: "Must be taken WITH meals to bind phosphorus in food; does not contain calcium so preferred over calcium-based binders to reduce vascular calcification risk"
    }],
    pearls: ["Never take blood pressure, draw blood, or start IVs in the fistula arm -- this can damage the access", "A thrill (palpable vibration) and bruit (audible whooshing) indicate a functioning AV fistula -- absence means possible clot and is an emergency", "Hypotension is the most common complication during hemodialysis -- lower the head, give NS bolus, reduce ultrafiltration rate", "Weight gain between sessions reflects fluid intake -- 1 kg = approximately 1 liter of fluid retained", "Phosphate binders MUST be taken with meals to be effective -- taking between meals provides no benefit", "Dialysis patients should eat adequate protein (to prevent malnutrition) but limit potassium, phosphorus, sodium, and fluids"],
    quiz: [
      {
        question: "During routine assessment, the nurse cannot palpate a thrill or auscultate a bruit in a patient's AV fistula. What is the priority action?",
        options: ["Document the finding and reassess in 4 hours", "Apply warm compresses to the fistula and elevate the arm", "Notify the provider immediately -- the fistula may be clotted", "Obtain a blood pressure reading in the fistula arm"],
        correct: 2,
        rationale: "Absence of thrill and bruit indicates the AV fistula may be clotted (thrombosed), which is an emergency requiring immediate intervention (possible thrombolysis or surgical revision). Never take BP in the fistula arm."
      },
      {
        question: "A patient on hemodialysis becomes dizzy and hypotensive 2 hours into treatment. What is the nurse's first action?",
        options: ["Stop dialysis immediately and call the provider", "Lower the patient's head, administer normal saline bolus, and reduce the ultrafiltration rate", "Administer epinephrine and prepare for emergency transfer", "Increase the blood flow rate to complete treatment faster"],
        correct: 1,
        rationale: "Intradialytic hypotension is the most common complication. First-line interventions include Trendelenburg positioning, NS bolus (100-250 mL), and reducing the ultrafiltration rate. Stopping dialysis completely is done only if unresponsive to initial measures."
      },
      {
        question: "When should a hemodialysis patient take their prescribed phosphate binder?",
        options: ["First thing in the morning on an empty stomach", "At bedtime to prevent nighttime absorption", "With meals to bind phosphorus in the food being eaten", "Between meals for maximum drug absorption"],
        correct: 2,
        rationale: "Phosphate binders work by binding dietary phosphorus in the GI tract to prevent its absorption. They must be taken with meals to be effective. Taking them on an empty stomach or between meals provides no therapeutic benefit."
      }
    ]
  },
  "hemodynamic-shock-physiology-np": {
    title: "Hemodynamic & Shock Physiology",
    cellular: { title: "Shock Pathophysiology and Hemodynamic Parameters", content: "Shock is a state of inadequate tissue perfusion and cellular oxygen delivery resulting in anaerobic metabolism, lactic acid accumulation, and progressive organ dysfunction. Understanding hemodynamic parameters is essential for differentiating shock types and guiding management. Cardiac output (CO = HR × SV) depends on preload (volume status), afterload (systemic vascular resistance), and contractility. Key hemodynamic measurements include central venous pressure (CVP, normal 2-6 mmHg, reflects right heart preload), pulmonary artery wedge pressure (PAWP, normal 8-12 mmHg, reflects left heart preload), cardiac output/index (CO normal 4-8 L/min, CI normal 2.5-4.0 L/min/m²), and systemic vascular resistance (SVR, normal 800-1200 dynes·sec/cm⁻⁵). Hypovolemic shock: decreased preload (low CVP, low PAWP), decreased CO, increased SVR (compensatory vasoconstriction). Cardiogenic shock: increased preload (high CVP, high PAWP from pump failure backup), decreased CO, increased SVR. Distributive shock (septic, anaphylactic, neurogenic): decreased SVR (vasodilation) with initially normal or high CO (warm shock), progressing to decreased CO (cold shock). Obstructive shock (PE, tension pneumothorax, cardiac tamponade): mechanical obstruction to flow with elevated CVP, decreased CO, increased SVR. The compensatory stage activates the sympathetic nervous system (tachycardia, vasoconstriction, diaphoresis), RAAS (sodium and water retention), and ADH release. If uncorrected, shock progresses through progressive (organ dysfunction, lactic acidosis) to irreversible stages (multiorgan failure, death)." },
    riskFactors: ["Hemorrhage or severe dehydration (hypovolemic shock)", "Acute myocardial infarction or severe heart failure (cardiogenic shock)", "Sepsis from any source (most common cause of distributive shock)", "Anaphylaxis from medications, foods, or insect stings", "Spinal cord injury above T6 (neurogenic shock)", "Massive pulmonary embolism or tension pneumothorax (obstructive shock)", "Cardiac tamponade from trauma, malignancy, or uremia", "Burns > 20% TBSA (combined hypovolemic and distributive shock)"],
    diagnostics: ["Serum lactate level (> 2 mmol/L indicates tissue hypoperfusion; > 4 mmol/L = severe shock)", "Arterial blood gas: metabolic acidosis (low pH, low HCO3, elevated base deficit)", "Central venous pressure (CVP) via central line monitoring", "Pulmonary artery catheter data: PAWP, CO/CI, SVR (if placed)", "Echocardiography: assess cardiac function, tamponade, RV strain", "CBC, coagulation studies (DIC workup in septic shock)", "Blood cultures before antibiotics in septic shock", "Point-of-care ultrasound (POCUS): IVC collapsibility for volume assessment, cardiac function"],
    management: ["Hypovolemic: aggressive IV crystalloid resuscitation (30 mL/kg bolus), blood products for hemorrhagic shock, identify and control bleeding source", "Cardiogenic: inotropes (dobutamine), vasopressors if needed, avoid excessive fluids, emergent revascularization for MI, mechanical circulatory support (IABP, Impella)", "Septic: early goal-directed therapy -- IV crystalloids (30 mL/kg within 3 hours), broad-spectrum antibiotics within 1 hour, norepinephrine as first-line vasopressor, source control", "Anaphylactic: IM epinephrine (0.3-0.5 mg), IV fluids, diphenhydramine, steroids, secure airway", "Neurogenic: IV fluids cautiously, vasopressors (norepinephrine or phenylephrine), atropine for bradycardia", "Obstructive: treat underlying cause (needle decompression for tension pneumo, pericardiocentesis for tamponade, thrombolytics for massive PE)"],
    nursingActions: ["Continuous hemodynamic monitoring: arterial line BP, CVP, HR, SpO2, urine output", "Administer vasopressors via central line with dose titration per MAP goal (typically > 65 mmHg)", "Monitor lactate clearance as indicator of resuscitation adequacy (goal: 10-20% decrease per 2 hours)", "Perform hourly urine output monitoring (goal > 0.5 mL/kg/hr)", "Assess perfusion indicators: capillary refill, skin temperature/color, level of consciousness", "Administer IV fluids per protocol with assessment for fluid overload (crackles, JVD)", "Position appropriately: modified Trendelenburg for hypovolemic, semi-Fowler's for cardiogenic", "Prepare for advanced interventions: intubation, central line placement, invasive hemodynamic monitoring"],
    assessmentFindings: ["Hypotension (MAP < 65 mmHg) or need for vasopressors to maintain MAP", "Tachycardia (compensatory -- except bradycardia in neurogenic shock)", "Altered mental status (confusion, agitation, lethargy -- early sign of inadequate cerebral perfusion)", "Oliguria (< 0.5 mL/kg/hr -- renal hypoperfusion)", "Cool, clammy skin with delayed capillary refill (hypovolemic, cardiogenic) vs warm, flushed skin (early septic)", "Tachypnea and respiratory distress (compensatory for metabolic acidosis)", "Elevated serum lactate (> 2 mmol/L)", "Weak, thready pulses with narrowed pulse pressure"],
    signs: {
      left: ["Compensatory tachycardia with stable MAP > 65", "Mild lactate elevation (2-4 mmol/L) responding to fluids", "Adequate urine output (> 0.5 mL/kg/hr)", "Alert and oriented with normal capillary refill", "Stable hemodynamics on low-dose vasopressor"],
      right: ["MAP < 65 mmHg despite fluids and vasopressors (refractory shock)", "Lactate > 4 mmol/L or rising despite treatment", "Anuria or severe oliguria (< 0.3 mL/kg/hr)", "Altered consciousness progressing to obtundation", "Multi-organ dysfunction: ARDS, DIC, acute liver failure, AKI"]
    },
    medications: [{
      name: "Norepinephrine (Levophed)",
      type: "Vasopressor (alpha-1 > beta-1 agonist)",
      action: "Potent vasoconstriction (increases SVR) with mild positive inotropy; first-line vasopressor for septic and most shock states",
      sideEffects: "Peripheral ischemia, tissue necrosis if extravasated, arrhythmias, mesenteric ischemia at high doses",
      contra: "Hypovolemia without adequate volume resuscitation (must correct volume first), mesenteric vascular thrombosis",
      pearl: "Must be given via central line; if extravasation occurs, infiltrate area with phentolamine (alpha-blocker) to prevent tissue necrosis; titrate to MAP goal > 65 mmHg"
    }, {
      name: "Dobutamine",
      type: "Inotrope (beta-1 agonist)",
      action: "Increases myocardial contractility and cardiac output without significantly increasing SVR",
      sideEffects: "Tachycardia, arrhythmias, hypotension (from mild vasodilation), increased myocardial oxygen demand",
      contra: "Hypertrophic obstructive cardiomyopathy (HOCM), severe hypovolemia",
      pearl: "Drug of choice for cardiogenic shock to increase cardiac output; often combined with norepinephrine if hypotension coexists; do not bolus -- titrate infusion slowly"
    }],
    pearls: ["Serum lactate is the best marker of tissue hypoperfusion -- a rising lactate despite treatment indicates worsening shock", "In septic shock: fluids first (30 mL/kg crystalloid within 3 hours), antibiotics within 1 hour, then vasopressors -- norepinephrine is first line", "Cardiogenic shock is the only type where aggressive fluids can be harmful -- it worsens pulmonary edema", "Neurogenic shock is unique: bradycardia + hypotension + warm skin (loss of sympathetic tone below the lesion)", "Vasopressors MUST be given through a central line -- extravasation of norepinephrine causes tissue necrosis (treat with phentolamine)", "The 'golden hour' concept: early aggressive resuscitation within the first hour significantly reduces mortality in all shock types"],
    quiz: [
      {
        question: "A patient in the ICU has the following hemodynamic readings: CVP 2 mmHg, PAWP 4 mmHg, CO 3.0 L/min, SVR 2000 dynes. Which type of shock do these values represent?",
        options: ["Cardiogenic shock", "Hypovolemic shock", "Septic shock (distributive)", "Neurogenic shock"],
        correct: 1,
        rationale: "Low CVP and PAWP indicate decreased preload (volume depletion), low CO reflects inadequate filling, and high SVR reflects compensatory vasoconstriction. This pattern is classic for hypovolemic shock."
      },
      {
        question: "Which hemodynamic parameter distinguishes distributive (septic) shock from cardiogenic shock?",
        options: ["Heart rate", "Mean arterial pressure", "Systemic vascular resistance (SVR)", "Oxygen saturation"],
        correct: 2,
        rationale: "In distributive shock, SVR is low due to widespread vasodilation (cytokine-mediated in sepsis). In cardiogenic shock, SVR is high from compensatory vasoconstriction attempting to maintain perfusion despite pump failure."
      },
      {
        question: "A nurse is titrating norepinephrine for a septic shock patient. The norepinephrine is infusing through a peripheral IV and the nurse notices blanching around the IV site. What is the priority action?",
        options: ["Continue the infusion and monitor the site closely", "Stop the infusion immediately and prepare to infiltrate phentolamine into the affected tissue", "Increase the infusion rate to maintain the MAP goal", "Apply warm compresses to the affected area and continue"],
        correct: 1,
        rationale: "Blanching indicates extravasation of norepinephrine, which causes severe vasoconstriction and tissue necrosis. The infusion must be stopped immediately and phentolamine (an alpha-blocker) infiltrated into the area to reverse vasoconstriction and prevent tissue death."
      }
    ]
  },
  "hemolytic-uremic-syndrome-rpn": {
    title: "Hemolytic Uremic Syndrome (HUS)",
    cellular: { title: "HUS Pathophysiology", content: "Hemolytic uremic syndrome (HUS) is a triad of microangiopathic hemolytic anemia, thrombocytopenia, and acute kidney injury. The most common form (typical HUS) is caused by Shiga toxin-producing Escherichia coli (STEC), usually serotype O157:H7, contracted from undercooked ground beef, unpasteurized milk or juice, or contaminated produce. The Shiga toxin binds to Gb3 receptors on renal glomerular endothelial cells, causing endothelial damage, platelet activation, and microthrombi formation in small blood vessels. Red blood cells are mechanically sheared as they pass through the damaged vessels, producing schistocytes (fragmented RBCs) on peripheral blood smear. Platelet consumption in microthrombi causes thrombocytopenia. Renal microthrombi lead to glomerular ischemia and acute kidney injury (oliguria, elevated BUN/creatinine, hypertension). HUS is the most common cause of acute kidney injury in young children (typically ages 6 months to 5 years). It usually begins 5-10 days after a diarrheal illness (often bloody) caused by E. coli O157:H7." },
    riskFactors: ["Age 6 months to 5 years (peak incidence)", "Ingestion of undercooked ground beef or unpasteurized dairy/juice", "Exposure to contaminated water or produce", "Contact with farm animals or petting zoos", "Daycare attendance (person-to-person transmission)", "Recent bloody diarrhea illness (E. coli O157:H7)", "Use of antibiotics for E. coli diarrhea (may increase toxin release)", "Summer months (peak season for E. coli outbreaks)"],
    diagnostics: ["CBC: hemolytic anemia (low Hgb), thrombocytopenia (low platelets)", "Peripheral blood smear: schistocytes (fragmented RBCs) -- hallmark finding", "BUN and creatinine: elevated (acute kidney injury)", "Urinalysis: hematuria, proteinuria", "Stool culture for E. coli O157:H7 and Shiga toxin assay", "LDH elevated, haptoglobin decreased (hemolysis markers)", "Electrolytes: hyperkalemia from renal failure", "Coagulation studies: PT/INR usually normal (distinguishes from DIC)"],
    management: ["Supportive care is the mainstay -- no specific treatment for typical HUS", "Aggressive IV fluid resuscitation to maintain renal perfusion", "Dialysis for severe acute kidney injury (oliguria, severe hyperkalemia, fluid overload, uremia)", "Packed RBC transfusion for severe anemia (Hgb < 6-7 g/dL)", "Platelet transfusion ONLY for active life-threatening bleeding (generally avoided -- may worsen microthrombi)", "Monitor and correct electrolyte imbalances (especially hyperkalemia)", "Avoid antibiotics for E. coli O157:H7 diarrhea (may worsen HUS by increasing toxin release)", "Avoid antimotility agents (loperamide) during diarrheal phase"],
    nursingActions: ["Strict intake and output monitoring with hourly urine output documentation", "Weigh patient daily to assess fluid status", "Monitor vital signs every 2-4 hours with attention to blood pressure (hypertension from fluid overload)", "Assess for bleeding signs: petechiae, bruising, blood in stool/urine", "Monitor laboratory trends: CBC, BMP, LDH every 12-24 hours during acute phase", "Implement seizure precautions (uremic encephalopathy risk)", "Provide meticulous skin care and gentle handling (thrombocytopenia)", "Educate family on food safety: cook ground beef to 160°F, avoid unpasteurized products"],
    assessmentFindings: ["Recent history of bloody diarrhea (5-10 days prior)", "Pallor and fatigue (hemolytic anemia)", "Decreased urine output or anuria (acute kidney injury)", "Petechiae and easy bruising (thrombocytopenia)", "Irritability and lethargy (uremia and/or anemia)", "Hypertension and edema (fluid retention from renal failure)", "Abdominal tenderness", "Jaundice (from hemolysis -- elevated indirect bilirubin)"],
    signs: {
      left: ["Mild pallor with stable hemoglobin", "Adequate urine output responding to IV fluids", "Platelet count decreasing but > 50,000", "Mild edema without respiratory distress", "Alert and interactive child"],
      right: ["Anuria or severe oliguria (renal failure requiring dialysis)", "Severe anemia with Hgb < 6 g/dL (transfusion needed)", "Seizures or altered consciousness (uremic encephalopathy)", "Uncontrolled hypertension with pulmonary edema", "Active hemorrhage with platelets < 20,000"]
    },
    medications: [{
      name: "IV Normal Saline",
      type: "Isotonic crystalloid",
      action: "Volume expansion to maintain renal perfusion and prevent further kidney damage",
      sideEffects: "Fluid overload, pulmonary edema, hyperchloremic acidosis with large volumes",
      contra: "Established fluid overload with pulmonary edema (switch to dialysis)",
      pearl: "Early aggressive hydration during the diarrheal phase may reduce severity of AKI; monitor for fluid overload as renal function declines"
    }, {
      name: "Calcium Gluconate",
      type: "Electrolyte replacement / cardiac membrane stabilizer",
      action: "Stabilizes cardiac cell membranes against hyperkalemia-induced arrhythmias; does not lower potassium",
      sideEffects: "Bradycardia if given too fast, tissue necrosis if extravasated, hypercalcemia",
      contra: "Digoxin use (can precipitate fatal arrhythmia), hypercalcemia",
      pearl: "Given IV slowly over 5-10 minutes for ECG changes from hyperkalemia; TEMPORARY -- must follow with potassium-lowering measures (insulin/glucose, kayexalate, or dialysis)"
    }],
    pearls: ["HUS = triad of hemolytic anemia + thrombocytopenia + AKI, most commonly after E. coli O157:H7 bloody diarrhea", "Schistocytes on peripheral blood smear are the hallmark finding of microangiopathic hemolytic anemia", "Do NOT give antibiotics for E. coli O157:H7 diarrhea -- they increase Shiga toxin release and HUS risk", "Do NOT give antidiarrheal agents (loperamide) -- they prolong toxin exposure in the gut", "Most children (> 80%) recover completely, but some develop chronic kidney disease", "Prevent HUS: cook ground beef to 160°F, wash produce, avoid unpasteurized dairy, and practice hand hygiene"],
    quiz: [
      {
        question: "A 3-year-old develops pallor, decreased urine output, and bruising 1 week after bloody diarrhea. Which laboratory finding confirms hemolytic uremic syndrome?",
        options: ["Elevated WBC count with left shift", "Schistocytes on peripheral blood smear with low platelets", "Positive blood cultures for E. coli", "Elevated PT/INR indicating DIC"],
        correct: 1,
        rationale: "HUS is diagnosed by the triad of microangiopathic hemolytic anemia (schistocytes on smear), thrombocytopenia (low platelets), and acute kidney injury. PT/INR is typically normal in HUS, distinguishing it from DIC."
      },
      {
        question: "Why are antibiotics NOT given for E. coli O157:H7 diarrhea?",
        options: ["E. coli O157:H7 is resistant to all antibiotics", "Antibiotics cause lysis of bacteria, releasing more Shiga toxin and increasing HUS risk", "Antibiotics cause allergic reactions in affected children", "Antibiotics prolong the carrier state of E. coli"],
        correct: 1,
        rationale: "Antibiotics kill E. coli bacteria, causing massive release of Shiga toxin from lysed bacterial cells. This increased toxin load damages more glomerular endothelial cells, increasing the risk and severity of HUS."
      },
      {
        question: "Which food safety teaching should the nurse provide to prevent HUS?",
        options: ["Avoid all dairy products for children under 5", "Cook ground beef to an internal temperature of 160°F (71°C)", "Only feed children organic produce", "Administer prophylactic antibiotics before eating ground beef"],
        correct: 1,
        rationale: "E. coli O157:H7 is most commonly transmitted through undercooked ground beef. Cooking to 160°F kills the bacteria. Other prevention measures include washing produce, avoiding unpasteurized products, and hand hygiene after animal contact."
      }
    ]
  },
  "hemophilia-basics-rpn": {
    title: "Hemophilia Basics",
    cellular: { title: "Hemophilia Pathophysiology", content: "Hemophilia is an X-linked recessive bleeding disorder caused by deficiency of clotting factors in the coagulation cascade. Hemophilia A (classic hemophilia, 80% of cases) results from deficiency of factor VIII, and hemophilia B (Christmas disease, 20% of cases) results from deficiency of factor IX. Both factors are essential components of the intrinsic coagulation pathway. Without adequate factor VIII or IX, the tenase complex cannot form properly, leading to impaired thrombin generation and inability to form stable fibrin clots. The disorder primarily affects males (X-linked recessive inheritance), with females typically being asymptomatic carriers. Severity correlates with factor activity levels: severe (< 1% factor activity) causes spontaneous bleeding into joints and muscles; moderate (1-5%) causes bleeding with minor trauma; and mild (5-40%) causes bleeding only with significant trauma or surgery. Hemarthrosis (bleeding into joints -- knees, elbows, ankles) is the hallmark of severe hemophilia and leads to chronic arthropathy if untreated. The aPTT is prolonged while PT/INR and platelet count are normal (intrinsic pathway defect only)." },
    riskFactors: ["Male sex (X-linked recessive inheritance)", "Family history of hemophilia (maternal carrier -- 50% chance of affected sons)", "Approximately 30% of cases are spontaneous mutations with no family history", "Severity determined by factor activity level (< 1% = severe with spontaneous bleeding)", "Joint damage from recurrent hemarthrosis", "Inhibitor development (antibodies against replacement factor -- occurs in 25-30% of severe hemophilia A)", "Hepatitis C and HIV from older blood products (historical risk, now eliminated with recombinant products)", "Trauma or surgery in undiagnosed patients"],
    diagnostics: ["Prolonged aPTT with normal PT/INR and normal platelet count (intrinsic pathway defect)", "Factor VIII assay (low in hemophilia A) or Factor IX assay (low in hemophilia B)", "Mixing study: aPTT corrects when mixed with normal plasma (factor deficiency, not inhibitor)", "Inhibitor screen (Bethesda assay) if factor replacement is ineffective", "CBC: platelet count normal, hemoglobin may be low from chronic bleeding", "Bleeding time is normal (platelet function is intact)", "Genetic testing for carrier detection and prenatal diagnosis", "Joint imaging (ultrasound or MRI) for hemarthrotic arthropathy assessment"],
    management: ["Factor replacement therapy: recombinant factor VIII (hemophilia A) or factor IX (hemophilia B)", "On-demand treatment for acute bleeding episodes (administer factor within 2 hours of symptoms)", "Prophylactic factor infusions (2-3 times per week) for severe hemophilia to prevent spontaneous bleeding", "Emicizumab (Hemlibra) -- bispecific antibody mimicking factor VIII for hemophilia A prophylaxis", "Desmopressin (DDAVP) for mild hemophilia A (releases stored factor VIII from endothelial cells)", "Antifibrinolytics (aminocaproic acid, tranexamic acid) for mucosal bleeding (dental procedures, epistaxis)", "RICE protocol for acute hemarthrosis: Rest, Ice, Compression, Elevation + factor replacement", "Avoid aspirin, NSAIDs, and IM injections"],
    nursingActions: ["Administer factor replacement products per protocol -- reconstitute carefully, give IV push slowly", "Assess for bleeding: joints (swelling, pain, limited ROM), muscles, GI tract, genitourinary", "Implement safety measures: padded side rails for children, soft toothbrush, electric razor", "Apply prolonged pressure (15-20 minutes) to all venipuncture and injection sites", "Never give IM injections -- use subcutaneous route when possible", "Educate family on home factor infusion technique and early recognition of bleeding episodes", "Encourage activity modification: swimming and cycling are safe; avoid contact sports", "Apply medical identification bracelet and educate about emergency care"],
    assessmentFindings: ["Hemarthrosis: joint swelling, warmth, pain, and limited range of motion (most common in knees, elbows, ankles)", "Easy bruising, especially in unusual locations", "Prolonged bleeding from cuts, dental procedures, or circumcision", "Muscle hematomas (can cause compartment syndrome)", "Epistaxis and gingival bleeding", "Hematuria", "Intracranial hemorrhage (headache, vomiting, altered consciousness -- emergency)", "Chronic joint deformity from recurrent hemarthrosis (target joint arthropathy)"],
    signs: {
      left: ["Minor bruising from typical childhood activity", "Adequate response to factor replacement", "Stable hemoglobin with no active bleeding", "Joints without swelling or pain", "Adherent to prophylactic factor regimen"],
      right: ["Acute hemarthrosis with tense, swollen, painful joint", "Signs of intracranial hemorrhage (severe headache, vomiting, altered LOC)", "Compartment syndrome from muscle hematoma (severe pain, pallor, paresthesias)", "Inhibitor development (bleeding not responding to factor replacement)", "Severe hemorrhage with hemodynamic instability"]
    },
    medications: [{
      name: "Recombinant Factor VIII (Advate, Eloctate)",
      type: "Clotting factor replacement",
      action: "Replaces deficient factor VIII to restore normal coagulation in hemophilia A",
      sideEffects: "Inhibitor formation (antibodies against factor VIII -- 25-30% of severe cases), allergic reactions, headache",
      contra: "Known hypersensitivity to product components",
      pearl: "Reconstitute gently (do not shake -- causes protein denaturation); administer IV push slowly (3-5 mL/min); for life-threatening bleeding, give factor FIRST, then diagnose"
    }, {
      name: "Desmopressin (DDAVP)",
      type: "Synthetic vasopressin analog",
      action: "Releases stored factor VIII and von Willebrand factor from endothelial cells; effective only in mild hemophilia A",
      sideEffects: "Water retention, hyponatremia, facial flushing, headache, tachycardia",
      contra: "Severe hemophilia A (insufficient endothelial stores), hemophilia B (does not affect factor IX), children < 2 years (seizure risk from hyponatremia)",
      pearl: "Limit fluid intake for 24 hours after administration to prevent water intoxication and hyponatremic seizures; tachyphylaxis occurs with repeated doses (diminishing response)"
    }],
    pearls: ["Hemophilia = prolonged aPTT with normal PT and normal platelets -- this pattern is classic for intrinsic pathway deficiency", "For ANY head injury in a hemophilia patient: give factor replacement FIRST, then obtain imaging -- do not wait for CT results", "Hemarthrosis (joint bleeding) is the hallmark of severe hemophilia -- most commonly affects knees, elbows, and ankles", "Never give IM injections or aspirin/NSAIDs to hemophilia patients", "Desmopressin (DDAVP) works only for MILD hemophilia A -- it releases stored factor VIII; useless in hemophilia B or severe A", "Mothers are carriers (X-linked recessive) -- 50% of sons will be affected, 50% of daughters will be carriers"],
    quiz: [
      {
        question: "A child with hemophilia A falls and hits his head. He appears alert and oriented with no visible injury. What is the priority nursing action?",
        options: ["Apply ice and observe for 24 hours at home", "Administer factor VIII replacement immediately before any further assessment", "Perform a neurological assessment and schedule a CT scan for the next morning", "Document the fall and notify the provider at the next scheduled visit"],
        correct: 1,
        rationale: "Any head injury in a hemophilia patient requires immediate factor replacement BEFORE imaging. Intracranial hemorrhage is the leading cause of death in hemophilia, and treatment must not be delayed while awaiting diagnostic confirmation."
      },
      {
        question: "Which coagulation lab result pattern is characteristic of hemophilia?",
        options: ["Prolonged PT, normal aPTT, normal platelets", "Prolonged aPTT, normal PT, normal platelets", "Prolonged PT and aPTT with low platelets", "Normal PT, normal aPTT, low platelets"],
        correct: 1,
        rationale: "Hemophilia (factor VIII or IX deficiency) affects the intrinsic coagulation pathway, prolonging aPTT. The extrinsic pathway (PT) and platelet function are unaffected, so PT and platelet count remain normal."
      },
      {
        question: "Which activity is safest for a child with severe hemophilia?",
        options: ["Football", "Wrestling", "Swimming", "Ice hockey"],
        correct: 2,
        rationale: "Swimming is a low-impact, non-contact activity that provides excellent exercise without risk of joint trauma or bleeding. Contact sports (football, hockey, wrestling) are contraindicated due to high risk of hemarthrosis and internal bleeding."
      }
    ]
  },
  "hemoptysis-assessment-rpn": {
    title: "Hemoptysis Assessment",
    cellular: { title: "Hemoptysis Pathophysiology", content: "Hemoptysis is the expectoration (coughing up) of blood originating from the lower respiratory tract (bronchial or pulmonary vasculature). It ranges from blood-streaked sputum to massive hemoptysis (> 100-600 mL in 24 hours, depending on definition), which is a life-threatening emergency with mortality rates of 50-80% if untreated. The bronchial arteries (high-pressure systemic circulation) are the source of bleeding in approximately 90% of cases. Common causes include bronchitis (most common cause overall), bronchiectasis, lung cancer, tuberculosis, pulmonary embolism, and pneumonia. Less common causes include pulmonary vasculitis (Goodpasture syndrome, granulomatosis with polyangiitis), coagulopathy, arteriovenous malformations, and mitral stenosis. The nurse must first differentiate true hemoptysis (blood from lungs, frothy, bright red, alkaline pH, mixed with sputum) from hematemesis (blood from GI tract, coffee-ground appearance, acidic pH, mixed with food) or nasopharyngeal bleeding. Assessment priorities include airway management, vital sign monitoring, and determining the severity and likely source of bleeding." },
    riskFactors: ["Smoking history (lung cancer, chronic bronchitis)", "History of tuberculosis or TB exposure", "Bronchiectasis (cystic fibrosis, chronic infections)", "Anticoagulant or antiplatelet therapy", "Pulmonary embolism risk factors (immobility, DVT history, recent surgery)", "Autoimmune conditions (SLE, Goodpasture syndrome, GPA)", "Mitral stenosis (elevated pulmonary venous pressure)", "Recent pulmonary procedures (bronchoscopy, lung biopsy)"],
    diagnostics: ["Chest X-ray: initial imaging to identify infiltrates, masses, or cavitary lesions", "CT chest with contrast (CT angiography if PE suspected)", "Sputum for acid-fast bacilli (AFB) if TB suspected", "CBC: hemoglobin/hematocrit trending, platelet count", "Coagulation studies: PT/INR, aPTT (especially if on anticoagulants)", "Type and crossmatch if massive hemoptysis", "Sputum cytology if malignancy suspected", "Bronchoscopy for localization and potential therapeutic intervention"],
    management: ["Protect the airway -- this is the first priority in all hemoptysis", "Position patient with bleeding side DOWN (lateral decubitus) to protect the unaffected lung", "Supplemental oxygen to maintain SpO2 > 94%", "Obtain IV access with large-bore catheter and type and crossmatch", "Antitussive agents (codeine) to suppress cough and reduce bleeding", "Correct coagulopathy (vitamin K, FFP, platelet transfusion as indicated)", "Bronchoscopy for localization and endobronchial intervention (cautery, balloon tamponade)", "Emergent intubation with double-lumen endotracheal tube for massive hemoptysis"],
    nursingActions: ["Assess ABCs: maintain airway, assess breathing pattern, monitor circulation", "Quantify amount of blood: measure sputum cups, count saturated cloths/tissues", "Position with affected (bleeding) side DOWN to prevent aspiration into unaffected lung", "Monitor vital signs every 15 minutes during active bleeding", "Keep suction equipment at bedside at all times", "Monitor oxygen saturation continuously; apply supplemental O2 as ordered", "Save all expectorated sputum for provider inspection and laboratory testing", "Keep patient calm and provide reassurance -- anxiety worsens bleeding"],
    assessmentFindings: ["Coughing up bright red, frothy blood mixed with sputum", "Sputum may be blood-streaked or frankly bloody", "Dyspnea and tachypnea", "Tachycardia and possible hypotension (with significant blood loss)", "Anxiety and sense of suffocation", "Adventitious breath sounds: crackles, rhonchi, or diminished sounds on affected side", "History of recent illness, chronic cough, weight loss, or night sweats (TB, cancer)", "Pallor if chronic or severe blood loss"],
    signs: {
      left: ["Blood-streaked sputum with stable vital signs", "Small-volume hemoptysis (< 20 mL/24 hours)", "Productive cough with clear to rust-colored sputum", "Normal oxygen saturation", "Known bronchitis history with minor bleeding"],
      right: ["Massive hemoptysis (> 100 mL/24 hours -- life-threatening)", "Respiratory distress with desaturation", "Hemodynamic instability (tachycardia, hypotension)", "Unable to clear airway (risk of asphyxiation)", "New mass on chest X-ray with hemoptysis (possible malignancy)"]
    },
    medications: [{
      name: "Codeine",
      type: "Opioid antitussive",
      action: "Suppresses cough reflex centrally to reduce trauma to bleeding airways",
      sideEffects: "Sedation, constipation, respiratory depression, nausea",
      contra: "Respiratory failure, excessive secretions that need to be expectorated, children < 12 years",
      pearl: "Used cautiously in hemoptysis to reduce coughing and allow clot stabilization; avoid in massive hemoptysis where the patient needs to expectorate blood to maintain airway"
    }, {
      name: "Tranexamic Acid (TXA)",
      type: "Antifibrinolytic",
      action: "Inhibits plasminogen activation, stabilizing blood clots at the bleeding site",
      sideEffects: "Nausea, diarrhea, thrombotic events (rare), seizures at high doses",
      contra: "Active thromboembolic disease, subarachnoid hemorrhage",
      pearl: "Can be given IV or nebulized for hemoptysis; nebulized TXA (500 mg in 5 mL NS) delivers drug directly to the bleeding airway surface"
    }],
    pearls: ["Differentiate hemoptysis (frothy, bright red, alkaline, from lungs) from hematemesis (dark/coffee-ground, acidic, from GI tract)", "Position the patient with the BLEEDING SIDE DOWN to protect the good lung from blood aspiration", "Massive hemoptysis kills by asphyxiation (drowning in blood), not by exsanguination -- airway protection is priority #1", "Most common cause of hemoptysis overall is acute bronchitis; most dangerous causes are lung cancer, TB, and PE", "Always save sputum samples for the provider -- quantity, color, and consistency help determine severity and source", "Patients on anticoagulants who develop hemoptysis need urgent coagulation reversal and source investigation"],
    quiz: [
      {
        question: "A patient is coughing up bright red, frothy blood. How should the nurse position the patient?",
        options: ["Supine with legs elevated", "High Fowler's position sitting upright", "Affected (bleeding) side DOWN in lateral decubitus position", "Prone position to promote drainage"],
        correct: 2,
        rationale: "Positioning the bleeding side down uses gravity to prevent blood from flowing into the unaffected lung, protecting it from aspiration and maintaining gas exchange. This is the priority positioning in hemoptysis."
      },
      {
        question: "What is the most immediate life-threatening risk of massive hemoptysis?",
        options: ["Hypovolemic shock from blood loss", "Asphyxiation from blood flooding the airways", "Infection from aspirated blood", "Anemia from chronic blood loss"],
        correct: 1,
        rationale: "Patients with massive hemoptysis are at greatest risk of death from asphyxiation -- blood filling the airways prevents gas exchange. The lungs only hold 150-200 mL before gas exchange is critically impaired. Airway protection is the first priority."
      },
      {
        question: "Which assessment finding helps distinguish hemoptysis from hematemesis?",
        options: ["Blood is dark and coffee-ground in appearance", "Blood is frothy, bright red, and mixed with sputum", "Blood is accompanied by abdominal pain", "Blood is acidic on pH testing"],
        correct: 1,
        rationale: "Hemoptysis produces frothy (air-mixed), bright red blood with sputum that has an alkaline pH. Hematemesis produces dark/coffee-ground blood mixed with food particles that has an acidic pH. This distinction guides appropriate assessment and intervention."
      }
    ]
  },
  "hemorrhoids-rpn": {
    title: "Hemorrhoids",
    cellular: { title: "Hemorrhoid Pathophysiology", content: "Hemorrhoids are dilated, swollen vascular cushions of the anal canal. Internal hemorrhoids arise from the superior hemorrhoidal venous plexus above the dentate line (covered by columnar epithelium -- usually painless because the area lacks somatic nerve fibers). External hemorrhoids arise below the dentate line (covered by squamous epithelium with somatic innervation -- painful). The anal cushions are normal structures containing arterioles, venules, and smooth muscle that contribute to continence. Hemorrhoids develop when increased venous pressure causes engorgement, displacement, and prolapse of these vascular cushions. Contributing factors include straining during defecation (increased intra-abdominal pressure), chronic constipation, prolonged sitting on the toilet, pregnancy (increased pelvic venous pressure and progesterone-induced venous relaxation), portal hypertension (inferior hemorrhoidal veins serve as portosystemic collaterals), and aging (weakening of supporting connective tissue). Internal hemorrhoids are graded: Grade I (bleeding only), Grade II (prolapse with spontaneous reduction), Grade III (prolapse requiring manual reduction), Grade IV (irreducible prolapse). External hemorrhoid thrombosis occurs when blood clots within the hemorrhoid, causing acute severe perianal pain." },
    riskFactors: ["Chronic constipation and straining during bowel movements", "Low-fiber diet with inadequate fluid intake", "Prolonged sitting (especially on the toilet)", "Pregnancy (third trimester -- increased pelvic pressure)", "Obesity (increased intra-abdominal pressure)", "Portal hypertension and cirrhosis", "Chronic diarrhea", "Heavy lifting and strenuous physical activity", "Aging (weakened connective tissue support)"],
    diagnostics: ["Visual inspection of perianal area for external hemorrhoids and prolapse", "Digital rectal examination (internal hemorrhoids are not palpable but assess for masses)", "Anoscopy: direct visualization of internal hemorrhoids and grading", "Colonoscopy or flexible sigmoidoscopy: rule out other causes of rectal bleeding (polyps, cancer), especially in patients > 45 or with alarm symptoms", "CBC if chronic bleeding suspected (rule out anemia)", "Liver function tests if portal hypertension suspected as underlying cause", "Fecal occult blood test (though hemorrhoids cause frank blood, not occult)"],
    management: ["Conservative (first-line for Grade I-II): high-fiber diet (25-35 g/day), adequate hydration (8 glasses water/day), stool softeners, sitz baths", "Topical treatments: hydrocortisone cream/suppositories (short-term for inflammation), witch hazel pads, topical anesthetics (lidocaine)", "Office procedures for Grade II-III: rubber band ligation (most common), sclerotherapy, infrared coagulation", "Surgical hemorrhoidectomy for Grade III-IV or failed conservative management", "Thrombosed external hemorrhoid: excision within 72 hours of onset for pain relief, or conservative management with sitz baths if > 72 hours", "Treat underlying constipation with fiber supplementation and lifestyle modifications", "Avoid prolonged straining and limit time sitting on toilet"],
    nursingActions: ["Educate patient on high-fiber diet: fruits, vegetables, whole grains, bran (gradual increase to prevent gas/bloating)", "Encourage fluid intake of at least 8 glasses of water daily", "Instruct on proper sitz bath technique: warm water for 15-20 minutes, 2-3 times daily", "Educate on proper bowel habits: respond to urge promptly, avoid straining, limit toilet time to < 10 minutes", "Administer and teach application of topical medications (hydrocortisone, anesthetics)", "Post-hemorrhoidectomy care: pain management, sitz baths, stool softeners, monitor for urinary retention and bleeding", "Assess for complications: excessive bleeding, infection, urinary retention after surgery", "Educate about warning signs requiring medical attention: heavy bleeding, severe pain, fever"],
    assessmentFindings: ["Painless bright red blood with bowel movements (internal hemorrhoids -- blood on toilet paper, in bowl, or on surface of stool)", "Perianal itching and irritation (pruritus ani)", "Mucous discharge and sensation of incomplete evacuation", "Palpable, tender perianal lump (external hemorrhoid or thrombosed hemorrhoid)", "Severe acute perianal pain (thrombosed external hemorrhoid -- firm, blue-purple, tender mass)", "Prolapsing tissue with bowel movements (Grade II-IV internal hemorrhoids)", "Anemia symptoms with chronic bleeding (fatigue, pallor -- rare but possible)", "Soiling of underwear from mucous discharge"],
    signs: {
      left: ["Occasional blood on toilet paper with bowel movements", "Mild perianal itching managed with hygiene and topical treatment", "Grade I-II internal hemorrhoids on anoscopy", "Small external hemorrhoid without thrombosis", "Responds to conservative measures (fiber, sitz baths)"],
      right: ["Heavy rectal bleeding with hemodynamic changes", "Thrombosed external hemorrhoid (severe pain, blue-purple perianal mass)", "Incarcerated and strangulated Grade IV internal hemorrhoid (severe pain, ischemia)", "Perianal abscess or infection", "Unexplained rectal bleeding in patient > 45 years (must rule out malignancy)"]
    },
    medications: [{
      name: "Docusate Sodium (Colace)",
      type: "Stool softener",
      action: "Surfactant that allows water and fat to penetrate stool, making it softer and easier to pass",
      sideEffects: "Mild abdominal cramping, diarrhea, throat irritation (liquid formulation)",
      contra: "Intestinal obstruction, concomitant mineral oil use",
      pearl: "Works best as prevention -- takes 1-3 days to be effective; must be taken with adequate fluid intake; does NOT stimulate peristalsis"
    }, {
      name: "Hydrocortisone Cream/Suppository (Preparation H, Anusol-HC)",
      type: "Topical corticosteroid",
      action: "Reduces inflammation, edema, and pruritus of hemorrhoidal tissue",
      sideEffects: "Skin thinning and atrophy with prolonged use, secondary infection, contact dermatitis",
      contra: "Perianal infection (fungal or bacterial), prolonged use > 7 days without provider guidance",
      pearl: "Use for SHORT-TERM symptom relief only (< 1 week); prolonged use causes perianal skin thinning and worsening symptoms; apply after sitz bath for better absorption"
    }],
    pearls: ["Hemorrhoids are the most common cause of painless bright red rectal bleeding, but always rule out colorectal cancer in patients > 45 or with alarm symptoms", "Internal hemorrhoids are PAINLESS (above dentate line -- no somatic nerves); external hemorrhoids are PAINFUL (below dentate line -- somatic innervation)", "The most important treatment is prevention: high-fiber diet, adequate hydration, avoid straining, and limit toilet time", "Thrombosed external hemorrhoids cause acute severe pain -- excision within 72 hours provides best pain relief; after 72 hours, conservative management is preferred as resolution begins", "Topical hydrocortisone should not be used > 7 days -- causes skin thinning and worsens symptoms", "Post-hemorrhoidectomy: monitor for urinary retention (common due to pain and spasm) and delayed hemorrhage (7-10 days postop)"],
    quiz: [
      {
        question: "A patient reports painless bright red blood on the toilet paper after bowel movements. Which type of hemorrhoid is the most likely cause?",
        options: ["Thrombosed external hemorrhoid", "Grade I internal hemorrhoid", "Perianal abscess", "Anal fissure"],
        correct: 1,
        rationale: "Internal hemorrhoids (above the dentate line) cause painless bright red rectal bleeding because the area lacks somatic pain fibers. External hemorrhoids, anal fissures, and abscesses typically cause pain. Grade I internal hemorrhoids present with bleeding only."
      },
      {
        question: "Which dietary teaching is most important for a patient with hemorrhoids?",
        options: ["Follow a low-residue diet to reduce stool bulk", "Increase dietary fiber to 25-35 grams per day with adequate fluid intake", "Eliminate all dairy products from the diet", "Eat smaller, more frequent meals throughout the day"],
        correct: 1,
        rationale: "Increasing dietary fiber to 25-35 g/day with adequate hydration produces soft, bulky stools that are easier to pass without straining. Straining increases venous pressure and is the primary modifiable risk factor for hemorrhoids."
      },
      {
        question: "A patient presents with acute severe perianal pain and a firm, blue-purple mass at the anal verge. What is the most likely diagnosis?",
        options: ["Prolapsed internal hemorrhoid", "Thrombosed external hemorrhoid", "Rectal prolapse", "Perianal Crohn's disease"],
        correct: 1,
        rationale: "A thrombosed external hemorrhoid presents as an acutely painful, firm, blue-purple (from trapped clot) perianal mass. It is caused by blood clot formation within an external hemorrhoid. Treatment within 72 hours is excision for pain relief."
      }
    ]
  },
  "hepatic-encephalopathy-np": {
    title: "Hepatic Encephalopathy: Ammonia & Lactulose",
    cellular: { title: "Hepatic Encephalopathy Pathophysiology", content: "Hepatic encephalopathy (HE) is a neuropsychiatric syndrome resulting from the accumulation of neurotoxins, primarily ammonia (NH3), in patients with severe liver dysfunction or portosystemic shunting. In a healthy liver, gut-derived ammonia (produced by bacterial urease activity, amino acid deamination, and glutamine metabolism in enterocytes) is converted to urea via the urea cycle and excreted by the kidneys. In cirrhosis, both hepatocyte dysfunction and portosystemic shunting bypass the liver, allowing ammonia to reach the systemic circulation. Ammonia crosses the blood-brain barrier and is metabolized by astrocytes, where glutamine synthetase converts it to glutamine. Glutamine accumulation causes osmotic swelling of astrocytes (astrocyte edema -- the central cellular event), leading to increased intracranial pressure, altered neurotransmission, and impaired cerebral function. Additional neurotoxins include mercaptans, short-chain fatty acids, manganese, and altered benzodiazepine-like compounds (via increased GABA-ergic tone). HE is classified as covert (minimal -- detectable only by psychometric testing) or overt (clinically apparent -- from confusion to coma). The West Haven criteria grade severity: Grade I (sleep disturbance, shortened attention), Grade II (lethargy, disorientation, asterixis), Grade III (somnolence, gross confusion), Grade IV (coma). Common precipitants include GI bleeding (protein load), infection/sepsis, constipation, dehydration, hypokalemia/alkalosis (shifts NH3 to more permeable NH3 form), medications (sedatives, opioids, diuretics), TIPS procedure, and dietary protein excess." },
    riskFactors: ["Cirrhosis (any etiology -- most common underlying condition)", "Portosystemic shunting (TIPS procedure, surgical shunts, spontaneous collaterals)", "GI bleeding (blood protein digested to ammonia by gut bacteria)", "Infection or sepsis (increased catabolism and ammonia production)", "Constipation (prolonged contact time for ammonia absorption)", "Dehydration and electrolyte imbalances (hypokalemia, metabolic alkalosis)", "Excessive dietary protein intake", "Medications: sedatives, opioids, benzodiazepines, diuretics (volume depletion)", "Acute kidney injury (decreased renal ammonia excretion)", "Hyponatremia (worsens astrocyte swelling)"],
    diagnostics: ["Serum ammonia level: typically elevated but correlates poorly with severity (trends more useful than single values)", "Liver function panel: elevated bilirubin, prolonged INR, low albumin (markers of hepatic synthetic failure)", "BMP: assess for hypokalemia, hyponatremia, metabolic alkalosis, renal function", "CBC: assess for infection (elevated WBC), GI bleeding (low Hgb)", "Blood cultures and urinalysis if infection suspected as precipitant", "CT head to rule out intracranial pathology (subdural hematoma, stroke) in new presentations", "Psychometric testing (number connection test, Stroop test) for minimal/covert HE", "EEG: triphasic waves in advanced HE (nonspecific but supportive)"],
    management: ["Lactulose: first-line treatment -- osmotic laxative that acidifies colonic contents, converting NH3 to non-absorbable NH4+, and promotes fecal excretion", "Lactulose dosing: 15-45 mL orally every 1-2 hours until bowel movement, then titrate to 2-3 soft stools per day", "Lactulose enemas (300 mL in 700 mL water) for patients unable to take oral medications", "Rifaximin 550 mg BID: non-absorbable antibiotic that reduces ammonia-producing gut bacteria; used as adjunct to lactulose for secondary prophylaxis", "Identify and treat precipitating factors: GI bleed, infection, dehydration, electrolyte imbalances, constipation", "Protein restriction is NO LONGER recommended -- adequate protein (1.2-1.5 g/kg/day) is essential to prevent sarcopenia", "Zinc supplementation (may improve urea cycle function -- zinc is a cofactor)", "Avoid sedatives, opioids, benzodiazepines -- they worsen encephalopathy"],
    nursingActions: ["Assess neurological status frequently using Glasgow Coma Scale and West Haven criteria", "Monitor for asterixis (liver flap): have patient extend arms with dorsiflexed wrists -- flapping tremor is characteristic", "Administer lactulose and titrate to goal of 2-3 soft stools per day", "Monitor for lactulose over-treatment: excessive diarrhea causes dehydration and electrolyte depletion, which can WORSEN HE", "Implement fall precautions and seizure precautions for disoriented patients", "Assess for precipitating factors: check for signs of infection, GI bleeding (stool guaiac), review medications", "Monitor ammonia levels trending (but do not rely on absolute values for clinical decisions)", "Maintain adequate nutrition: encourage protein intake (1.2-1.5 g/kg/day) -- protein restriction is outdated", "Educate patient and family on medication adherence, dietary needs, and signs of worsening HE"],
    assessmentFindings: ["Altered mental status: confusion, disorientation, somnolence, personality changes", "Asterixis (liver flap): involuntary flapping tremor with dorsiflexed wrists -- hallmark of Grade II HE", "Sleep-wake cycle reversal (sleeping during day, awake at night -- early sign)", "Fetor hepaticus: sweet, musty breath odor from mercaptans", "Hyperreflexia progressing to hyporeflexia as coma develops", "Constructional apraxia (inability to draw simple shapes like a star)", "Impaired handwriting (serial signatures declining over time)", "Jaundice, ascites, spider angiomata (signs of underlying cirrhosis)"],
    signs: {
      left: ["Mild sleep disturbance and shortened attention span (Grade I)", "Subtle personality changes noticed by family", "Mildly elevated ammonia with intact orientation", "Asterixis present but patient oriented and cooperative", "Responding to lactulose with improved mental status"],
      right: ["Grade III-IV HE: marked confusion, somnolence, or coma", "Loss of protective airway reflexes (aspiration risk)", "Cerebral edema with signs of increased ICP", "Refractory HE not responding to lactulose and rifaximin", "New-onset HE without identifiable precipitant (consider liver transplant evaluation)"]
    },
    medications: [{
      name: "Lactulose",
      type: "Osmotic laxative / ammonia-lowering agent",
      action: "Acidifies colonic contents (pH < 6), converting absorbable NH3 to non-absorbable NH4+; osmotic effect promotes fecal excretion of ammonia-laden stool",
      sideEffects: "Abdominal bloating, flatulence, diarrhea, dehydration and electrolyte imbalances with overuse",
      contra: "Galactosemia, bowel obstruction",
      pearl: "Titrate dose to 2-3 soft stools per day -- too much causes diarrhea/dehydration which WORSENS HE; too little is ineffective; can give as retention enema for obtunded patients"
    }, {
      name: "Rifaximin (Xifaxan)",
      type: "Non-absorbable antibiotic",
      action: "Reduces ammonia-producing gut bacteria without systemic absorption; alters gut microbiome",
      sideEffects: "Peripheral edema, nausea, dizziness, fatigue, ascites, C. difficile infection (rare)",
      contra: "Hypersensitivity to rifaximin or rifamycin class antibiotics",
      pearl: "Used as adjunct to lactulose for prevention of HE recurrence (secondary prophylaxis); reduces HE episodes by 50%; very expensive -- often requires prior authorization"
    }],
    pearls: ["Lactulose is first-line treatment -- titrate to 2-3 soft stools per day; over-treatment with diarrhea causes dehydration and hypokalemia, which WORSENS HE", "Asterixis (liver flap) is the hallmark physical finding of hepatic encephalopathy -- test by having patient extend arms with dorsiflexed wrists", "Ammonia level correlates poorly with HE severity -- treat the patient, not the number; trends are more useful than single values", "Protein restriction is OUTDATED and HARMFUL -- cirrhotic patients need 1.2-1.5 g/kg/day protein to prevent sarcopenia", "Always look for precipitating factors: infection, GI bleed, constipation, dehydration, medications (sedatives, diuretics), electrolyte imbalances", "Rifaximin + lactulose together is the standard of care for secondary prevention after a first episode of overt HE"],
    quiz: [
      {
        question: "A patient with cirrhosis and hepatic encephalopathy is started on lactulose. What is the target therapeutic goal?",
        options: ["One formed bowel movement per day", "Two to three soft stools per day", "Five or more liquid stools per day to maximize ammonia clearance", "No bowel movements until ammonia level normalizes"],
        correct: 1,
        rationale: "Lactulose should be titrated to produce 2-3 soft stools daily. Fewer stools indicate under-dosing (inadequate ammonia clearance). Excessive diarrhea causes dehydration and hypokalemia/metabolic alkalosis, which paradoxically WORSENS hepatic encephalopathy."
      },
      {
        question: "A nurse is assessing a patient with suspected hepatic encephalopathy. Which physical examination finding is most characteristic?",
        options: ["Babinski sign (upgoing plantar reflex)", "Asterixis (flapping tremor with dorsiflexed wrists)", "Kernig sign (resistance to knee extension)", "Chvostek sign (facial twitch with tapping)"],
        correct: 1,
        rationale: "Asterixis (liver flap) is the hallmark finding of hepatic encephalopathy (Grade II). It is tested by having the patient extend their arms with wrists dorsiflexed -- involuntary flapping movements indicate motor dysfunction from ammonia toxicity."
      },
      {
        question: "Which precipitating factor for hepatic encephalopathy should the NP investigate first in a cirrhotic patient with new-onset confusion?",
        options: ["Excessive exercise", "GI bleeding, infection, or medication changes", "Excessive vitamin supplementation", "Caffeine intake"],
        correct: 1,
        rationale: "The most common precipitants of HE are GI bleeding (protein load from digested blood), infection/sepsis (increased catabolism), and medications (sedatives, opioids, over-diuresis). Identifying and treating the precipitant is essential for HE management."
      }
    ]
  }
};
