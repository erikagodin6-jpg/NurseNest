import { getAssetUrl } from "@/lib/asset-url";
import type { LessonContent } from "./types";
const imgGalactosemia = getAssetUrl("galactosemia_1773374861631.png");
const imgGERD = getAssetUrl("GERD_1773374861631.png");
const imgFungalInfections = getAssetUrl("fungal_1773374861631.jpeg");
const imgGAS = getAssetUrl("GAS_1773374861631.png");

export const generatedBatch038Lessons: Record<string, LessonContent> = {
  "fungal-sepsis-rn": {
    title: "Fungal Sepsis",
    image: imgFungalInfections,
    cellular: { title: "Pathophysiology of Fungal Sepsis", content: "Fungal sepsis, most commonly caused by Candida species (candidemia), occurs when fungi enter the bloodstream, typically in immunocompromised, critically ill patients with risk factors including broad-spectrum antibiotic use, central venous catheters, total parenteral nutrition, abdominal surgery, and neutropenia. Candida albicans forms biofilm on indwelling catheters, providing a protected reservoir for continuous seeding into the bloodstream. The innate immune response to fungal cell wall components (beta-glucan, mannan) involves pattern recognition by dectin-1 and mannose receptors on macrophages and neutrophils, but the inflammatory response is often less robust than in bacterial sepsis, leading to delayed diagnosis. Serum beta-D-glucan and blood cultures (which have only 50% sensitivity for candidemia) guide diagnosis." },
    riskFactors: ["Prolonged broad-spectrum antibiotic therapy (eliminates competing bacteria)", "Central venous catheter or other indwelling devices", "Total parenteral nutrition (TPN) with high dextrose content", "Neutropenia or immunosuppression (chemotherapy, transplant, HIV)", "Abdominal surgery or GI perforation", "ICU stay > 7 days", "Renal replacement therapy / hemodialysis", "Corticosteroid therapy"],
    diagnostics: ["Blood cultures (requires prolonged incubation; only 50% sensitive for Candida)", "Serum 1,3-beta-D-glucan (panfungal marker; >80 pg/mL suggestive)", "T2Candida panel for rapid species identification", "Ophthalmologic exam to rule out Candida endophthalmitis", "CT abdomen to evaluate for hepatosplenic candidiasis in neutropenic patients", "Echocardiogram to rule out endocarditis if persistent candidemia"],
    management: ["Initiate echinocandin therapy (micafungin, caspofungin, anidulafungin) as first-line", "Remove or replace all central venous catheters (source control is essential)", "Step down to fluconazole once species susceptibility confirms non-resistant Candida", "Continue antifungal therapy for minimum 14 days after first negative blood culture", "Obtain repeat blood cultures every 24-48 hours until clearance documented", "Consult infectious disease for persistent candidemia or metastatic complications"],
    nursingActions: ["Obtain blood cultures from peripheral and central sites before antifungal initiation", "Monitor temperature trends and hemodynamic status every 1-2 hours", "Assess for signs of disseminated candidiasis (new skin lesions, eye pain/visual changes)", "Monitor hepatic and renal function during antifungal therapy", "Maintain strict central line care with chlorhexidine-based dressing protocols", "Document catheter removal time and site assessment", "Monitor for infusion-related reactions with echinocandin administration"],
    assessmentFindings: ["Persistent fever unresponsive to antibacterial agents", "Hemodynamic instability (hypotension, tachycardia) despite fluid resuscitation", "New maculopapular or pustular skin lesions", "Visual disturbances suggesting endophthalmitis", "Hepatosplenomegaly in neutropenic patients"],
    signs: {
      left: ["Persistent low-grade fever despite antibiotics", "Indolent clinical course", "Elevated WBC with left shift", "Positive beta-D-glucan (>80 pg/mL)", "Central line erythema/drainage"],
      right: ["Septic shock with vasopressor requirement", "Disseminated skin lesions", "Endophthalmitis (eye pain, vision loss)", "Multiorgan failure", "Hepatosplenic candidiasis (neutropenic recovery)"]
    },
    medications: [{
      name: "Micafungin",
      type: "Echinocandin antifungal",
      action: "Inhibits synthesis of 1,3-beta-D-glucan in the fungal cell wall, causing osmotic instability and cell lysis",
      sideEffects: "Hepatotoxicity, phlebitis, histamine-mediated reactions, nausea",
      contra: "Known hypersensitivity to echinocandins",
      pearl: "Echinocandins are first-line for candidemia; they have excellent activity against Candida biofilm on catheters"
    }, {
      name: "Fluconazole",
      type: "Azole antifungal",
      action: "Inhibits fungal cytochrome P450 enzyme 14-alpha-demethylase, disrupting ergosterol synthesis in cell membrane",
      sideEffects: "Hepatotoxicity, QT prolongation, GI upset, multiple drug interactions via CYP inhibition",
      contra: "C. krusei (intrinsically resistant), C. glabrata (often resistant), concurrent terfenadine/cisapride",
      pearl: "Step-down option once Candida species susceptibility is confirmed; excellent oral bioavailability"
    }],
    pearls: ["Remove all central lines in candidemia — source control is the single most important intervention", "Beta-D-glucan can be falsely positive with albumin infusions, hemodialysis membranes, and certain gauze products", "Treat candidemia for at least 14 days after the FIRST negative blood culture, not from treatment start", "Always obtain a dilated fundoscopic exam — Candida endophthalmitis changes antifungal choice and duration", "Mortality from candidemia approaches 40% — early empiric therapy in high-risk patients is critical"],
    quiz: [
      {
        question: "A critically ill ICU patient on broad-spectrum antibiotics and TPN develops persistent fever. Blood cultures grow yeast. What is the priority nursing intervention?",
        options: ["Administer acetaminophen for fever", "Notify provider and anticipate central line removal", "Increase IV fluid rate", "Obtain a chest X-ray"],
        correct: 1,
        rationale: "Central line removal is the most critical source control intervention in candidemia. Candida forms biofilm on catheters that antifungals cannot penetrate, making line removal essential."
      },
      {
        question: "Which laboratory marker is most useful for early detection of invasive fungal infection when blood cultures are pending?",
        options: ["Procalcitonin", "C-reactive protein", "1,3-beta-D-glucan", "Lactate dehydrogenase"],
        correct: 2,
        rationale: "1,3-beta-D-glucan is a panfungal biomarker present in the cell wall of most pathogenic fungi. Levels >80 pg/mL are suggestive of invasive fungal infection and can be positive before blood cultures turn positive."
      },
      {
        question: "A patient with candidemia has been on micafungin for 5 days. Repeat blood cultures are now negative, and the species is identified as C. albicans. What is the appropriate next step?",
        options: ["Discontinue all antifungals immediately", "Continue micafungin for 14 days after the first negative culture", "Switch to oral fluconazole for step-down therapy", "Add amphotericin B for dual coverage"],
        correct: 2,
        rationale: "Once Candida species is confirmed susceptible (C. albicans is typically fluconazole-sensitive) and the patient is clinically stable with negative cultures, step-down to oral fluconazole is appropriate and reduces cost and IV-related risks."
      }
    ]
  },
  "g6pd-deficiency-np": {
    title: "G6PD Deficiency",
    cellular: { title: "Enzymopathy & Oxidative Hemolysis", content: "Glucose-6-phosphate dehydrogenase (G6PD) deficiency is the most common human enzymopathy, affecting over 400 million people worldwide. G6PD is the rate-limiting enzyme of the hexose monophosphate shunt (pentose phosphate pathway), which generates NADPH — the primary reducing agent that maintains glutathione in its reduced state. Reduced glutathione protects hemoglobin and red blood cell membranes from oxidative damage by neutralizing reactive oxygen species (ROS). In G6PD-deficient erythrocytes, oxidative stressors (infections, certain drugs, fava beans) generate ROS that overwhelm the depleted antioxidant defenses, causing hemoglobin denaturation and precipitation as Heinz bodies, which are removed by splenic macrophages creating 'bite cells.' This leads to acute intravascular and extravascular hemolysis with hemoglobinuria, jaundice, and potentially severe anemia." },
    riskFactors: ["X-linked recessive inheritance (primarily affects males)", "African, Mediterranean, Middle Eastern, or Southeast Asian descent", "Exposure to oxidant drugs (primaquine, dapsone, sulfonamides, nitrofurantoin)", "Fava bean ingestion (favism — especially Mediterranean variants)", "Acute infections (most common trigger for hemolytic crisis)", "Diabetic ketoacidosis (oxidative stress)", "Neonatal period (immature hepatic conjugation compounds risk)"],
    diagnostics: ["G6PD enzyme activity assay (quantitative — may be falsely normal during acute hemolysis due to reticulocyte elevation)", "Peripheral blood smear: bite cells, Heinz bodies (supravital stain), blister cells, spherocytes", "CBC with reticulocyte count (elevated reticulocytes indicate compensatory erythropoiesis)", "Indirect bilirubin and LDH elevated (hemolysis markers)", "Haptoglobin decreased (consumed binding free hemoglobin)", "Urinalysis: hemoglobinuria without RBCs on microscopy", "Direct antiglobulin test (DAT/Coombs) negative — distinguishes from autoimmune hemolytic anemia"],
    management: ["Immediate discontinuation of offending drug or trigger", "Aggressive IV hydration to prevent hemoglobin-induced acute kidney injury", "Transfuse packed RBCs for severe symptomatic anemia (Hgb < 7 g/dL or hemodynamic instability)", "Treat underlying infection if trigger is infectious", "Folic acid supplementation to support increased erythropoiesis", "Provide patient with comprehensive list of drugs and foods to avoid", "Genetic counseling for X-linked inheritance pattern"],
    nursingActions: ["Obtain thorough medication and dietary history to identify trigger", "Monitor hemoglobin, reticulocyte count, and renal function serially", "Assess urine color every void — dark brown/cola-colored urine indicates ongoing hemolysis", "Maintain strict I&O with target urine output > 0.5 mL/kg/hr", "Administer blood products per protocol with pre-transfusion verification", "Educate patient on lifelong avoidance of oxidant triggers", "Screen family members — carrier mothers can have variable expression"],
    assessmentFindings: ["Acute onset jaundice (scleral icterus) 2-4 days after exposure to trigger", "Dark brown or cola-colored urine (hemoglobinuria)", "Fatigue, pallor, tachycardia, dyspnea (acute anemia)", "Back pain or abdominal pain during hemolytic crisis", "Splenomegaly from extravascular hemolysis"],
    signs: {
      left: ["Mild pallor and fatigue after trigger exposure", "Scleral icterus developing 24-72 hours post-exposure", "Mild tachycardia at rest", "Elevated reticulocyte count", "Dark urine beginning"],
      right: ["Severe anemia with hemodynamic instability", "Frank hemoglobinuria (cola-colored urine)", "Acute kidney injury from hemoglobin nephrotoxicity", "Neonatal kernicterus from severe hyperbilirubinemia", "Cardiovascular collapse requiring transfusion"]
    },
    medications: [{
      name: "Folic Acid",
      type: "Water-soluble vitamin (B9)",
      action: "Essential cofactor for DNA synthesis in erythroid precursors; supports compensatory erythropoiesis during recovery from hemolytic episode",
      sideEffects: "Generally well tolerated; rare GI upset",
      contra: "Undiagnosed vitamin B12 deficiency (can mask megaloblastic anemia)",
      pearl: "Supplement during and after hemolytic episodes to support reticulocyte production; does not prevent hemolysis"
    }],
    pearls: ["G6PD levels may be falsely NORMAL during acute hemolysis because reticulocytes have higher enzyme activity — retest 2-3 months after crisis", "The most common trigger worldwide is INFECTION, not drugs — always evaluate for underlying infectious etiology", "Heinz bodies are seen with supravital staining (crystal violet), NOT on standard Wright-Giemsa smear", "Mediterranean variants (Class II) have more severe deficiency than African variants (Class III) — fava beans cause severe crises in Mediterranean type", "Negative DAT (Coombs test) distinguishes G6PD hemolysis from autoimmune hemolytic anemia"],
    quiz: [
      {
        question: "A patient of Mediterranean descent presents with acute jaundice, dark urine, and Hgb 6.2 g/dL after starting trimethoprim-sulfamethoxazole. G6PD level returns normal. What is the best interpretation?",
        options: ["The patient does not have G6PD deficiency", "The result may be falsely normal due to elevated reticulocytes — retest in 2-3 months", "G6PD deficiency only affects African Americans", "The hemolysis is autoimmune in nature"],
        correct: 1,
        rationale: "During acute hemolysis, older G6PD-deficient RBCs are destroyed while young reticulocytes (with higher G6PD activity) predominate, causing falsely normal enzyme levels. Retesting 2-3 months after the crisis gives accurate results."
      },
      {
        question: "Which peripheral blood smear finding is most characteristic of G6PD-deficiency hemolysis?",
        options: ["Target cells", "Sickle cells", "Bite cells and Heinz bodies", "Rouleaux formation"],
        correct: 2,
        rationale: "Bite cells result from splenic macrophages removing Heinz bodies (precipitated denatured hemoglobin) from the RBC surface. This is the hallmark finding of oxidative hemolysis in G6PD deficiency."
      }
    ]
  },
  "gad-diagnostic-criteria-np": {
    title: "GAD Diagnostic Criteria",
    cellular: { title: "Neurobiological Basis of Generalized Anxiety Disorder", content: "Generalized Anxiety Disorder (GAD) involves dysregulation of the cortico-striato-thalamo-cortical (CSTC) circuits, with excessive excitatory glutamatergic signaling in the amygdala and prefrontal cortex and deficient inhibitory GABAergic modulation. The amygdala becomes hyperresponsive to perceived threats, while prefrontal cortex top-down regulation is impaired, leading to persistent worry and difficulty controlling anxious cognitions. Neuroimaging demonstrates increased amygdala activation and weakened functional connectivity between the prefrontal cortex and amygdala. Serotonin (5-HT), norepinephrine, and GABA neurotransmitter systems are implicated, providing the rationale for SSRI/SNRI first-line therapy. The HPA axis shows chronic mild elevation of cortisol, contributing to somatic symptoms including muscle tension, autonomic hyperarousal, and sleep disruption." },
    riskFactors: ["Female sex (2:1 female-to-male ratio)", "Family history of anxiety disorders (genetic heritability ~30%)", "Childhood adversity or trauma history", "Temperamental trait of behavioral inhibition/neuroticism", "Comorbid depression (60-70% overlap)", "Chronic medical illness (COPD, chronic pain, IBS)", "Substance use or withdrawal (caffeine, alcohol, benzodiazepines)", "Stressful life events or major transitions"],
    diagnostics: ["DSM-5 criteria: excessive anxiety and worry occurring more days than not for ≥ 6 months", "Three or more associated symptoms (adults): restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance", "GAD-7 screening tool (score ≥ 10 indicates moderate anxiety)", "Rule out medical causes: TSH, CBC, BMP, urine drug screen", "Assess caffeine/substance intake as contributing factor", "PHQ-9 to screen for comorbid depression", "Evaluate for panic disorder, social anxiety, OCD, PTSD as differentials"],
    management: ["First-line pharmacotherapy: SSRIs (sertraline, escitalopram) or SNRIs (venlafaxine, duloxetine)", "Cognitive behavioral therapy (CBT) — first-line psychotherapy with strongest evidence base", "Buspirone as adjunct or alternative for patients who cannot tolerate SSRIs/SNRIs", "Short-term benzodiazepines only for acute severe anxiety (avoid chronic use — dependence risk)", "Hydroxyzine as PRN anxiolytic alternative to benzodiazepines", "Address sleep hygiene, exercise, caffeine reduction as lifestyle modifications", "Reassess at 4-6 weeks for treatment response; titrate dose before switching agents"],
    nursingActions: ["Administer GAD-7 and PHQ-9 at initial visit and follow-up to track response", "Educate patient that SSRIs/SNRIs take 4-6 weeks for full anxiolytic effect", "Screen for suicidal ideation, especially during medication initiation in young adults", "Monitor for SSRI/SNRI side effects: GI upset, sexual dysfunction, serotonin syndrome", "Counsel on benzodiazepine risks: tolerance, dependence, cognitive impairment, falls", "Assess for substance use as self-medication for anxiety", "Provide referral to CBT therapist and follow up on engagement"],
    assessmentFindings: ["Excessive worry about multiple domains (work, health, finances, family) for ≥ 6 months", "Difficulty controlling worry despite recognizing it as excessive", "Muscle tension (shoulders, jaw, neck)", "Sleep disturbance — difficulty falling or staying asleep", "Restlessness or feeling keyed up/on edge", "Fatigue and difficulty concentrating", "Irritability"],
    signs: {
      left: ["Excessive worry most days for ≥ 6 months", "Muscle tension and restlessness", "Sleep-onset insomnia", "Difficulty concentrating", "GAD-7 score 10-14 (moderate)"],
      right: ["Panic attacks superimposed on chronic anxiety", "Severe functional impairment (unable to work/socialize)", "Comorbid major depressive episode", "Suicidal ideation", "GAD-7 score ≥ 15 (severe)"]
    },
    medications: [{
      name: "Escitalopram",
      type: "Selective serotonin reuptake inhibitor (SSRI)",
      action: "Selectively inhibits serotonin reuptake at the presynaptic membrane, increasing 5-HT availability in the synaptic cleft",
      sideEffects: "Nausea, sexual dysfunction, insomnia, headache, QTc prolongation at high doses",
      contra: "Concurrent MAOIs (14-day washout), pimozide, known QTc prolongation",
      pearl: "Start 5-10 mg daily; FDA-approved for GAD at 10 mg/day; full anxiolytic effect takes 4-6 weeks"
    }, {
      name: "Buspirone",
      type: "5-HT1A partial agonist anxiolytic",
      action: "Partial agonist at serotonin 5-HT1A receptors, reducing serotonergic neurotransmission in the amygdala",
      sideEffects: "Dizziness, nausea, headache, lightheadedness",
      contra: "Concurrent MAOIs; not effective PRN — requires 2-4 weeks of scheduled dosing",
      pearl: "No sedation, no dependence, no withdrawal — ideal for patients with substance use history; ineffective in patients previously exposed to benzodiazepines"
    }],
    pearls: ["The 6-month duration requirement distinguishes GAD from adjustment disorder with anxiety", "DSM-5 requires only 1 associated symptom in children (vs. 3 in adults)", "GAD-7 is validated for screening AND monitoring treatment response — readminister at each visit", "Buspirone does NOT work PRN and is ineffective in patients with prior benzodiazepine exposure", "CBT has equivalent efficacy to pharmacotherapy and should be offered to all GAD patients"],
    quiz: [
      {
        question: "A 35-year-old woman reports excessive worry about finances, health, and her children's safety for the past 8 months, with muscle tension and insomnia. GAD-7 score is 14. Which first-line treatment is most appropriate?",
        options: ["Alprazolam 0.5 mg TID", "Escitalopram 10 mg daily plus CBT referral", "Buspirone 5 mg PRN for anxiety", "Quetiapine 50 mg at bedtime"],
        correct: 1,
        rationale: "SSRI (escitalopram) plus CBT is the evidence-based first-line treatment for GAD. Benzodiazepines are not first-line due to dependence risk. Buspirone is not effective PRN. Antipsychotics are not first-line for GAD."
      },
      {
        question: "A patient started on sertraline for GAD reports no improvement after 10 days. What is the appropriate NP response?",
        options: ["Switch to a different medication class immediately", "Add a benzodiazepine for long-term use", "Educate that full therapeutic effect takes 4-6 weeks; continue current dose", "Discontinue sertraline and refer to psychiatry"],
        correct: 2,
        rationale: "SSRIs require 4-6 weeks for full anxiolytic effect. Early discontinuation or switching before adequate trial is a common prescribing error. The patient should be educated and reassessed at 4-6 weeks."
      }
    ]
  },
  "gait-analysis-np": {
    title: "Gait Analysis and Abnormalities",
    cellular: { title: "Neuroanatomy of Normal & Pathological Gait", content: "Normal gait requires coordinated integration of the motor cortex (initiating voluntary movement), basal ganglia (modulating movement amplitude and rhythm), cerebellum (coordinating timing, balance, and proprioceptive feedback), spinal cord (executing central pattern generators), peripheral nerves (transmitting motor commands and sensory feedback), and the musculoskeletal system (producing force and supporting body weight). The gait cycle consists of stance phase (~60%) and swing phase (~40%), further subdivided into initial contact, loading response, midstance, terminal stance, pre-swing, initial swing, midswing, and terminal swing. Pathological gait patterns are localizing — specific abnormalities point to specific anatomical lesions: spastic gait (upper motor neuron), steppage gait (peroneal nerve/L5), festinating gait (Parkinson/basal ganglia), ataxic gait (cerebellar), and antalgic gait (pain/musculoskeletal)." },
    riskFactors: ["Age > 65 years (age-related decline in proprioception and muscle mass)", "Neurological disorders (stroke, Parkinson disease, multiple sclerosis, peripheral neuropathy)", "Musculoskeletal conditions (osteoarthritis, hip/knee replacement, fractures)", "Vestibular dysfunction (BPPV, Meniere disease)", "Medications affecting balance (benzodiazepines, opioids, antihypertensives, anticonvulsants)", "Visual impairment (cataracts, macular degeneration)", "Vitamin B12 or folate deficiency (posterior column dysfunction)", "Diabetic peripheral neuropathy"],
    diagnostics: ["Timed Up and Go (TUG) test: > 12 seconds indicates fall risk", "Tinetti Balance and Gait Assessment (score < 19 = high fall risk)", "Romberg test: positive = proprioceptive or vestibular dysfunction", "Tandem gait assessment (heel-to-toe walking): tests cerebellar function", "Get Up and Go test: observe for unsteadiness, need for assistive device", "MRI brain if central lesion suspected (stroke, NPH, cerebellar pathology)", "EMG/NCS if peripheral neuropathy or radiculopathy suspected"],
    management: ["Physical therapy referral for gait training and strengthening", "Prescribe appropriate assistive device (cane, walker, rollator) based on assessment", "Medication review — reduce or eliminate gait-impairing medications (Beers Criteria)", "Treat underlying etiology (levodopa for Parkinson, B12 for subacute combined degeneration)", "Occupational therapy for home safety assessment and environmental modification", "Vestibular rehabilitation for vestibular-related gait instability", "Surgical referral for VP shunt in normal pressure hydrocephalus (magnetic gait)"],
    nursingActions: ["Perform standardized gait assessment (TUG, Tinetti) at each visit for at-risk patients", "Observe gait from front, side, and behind — note asymmetry, cadence, arm swing, base width", "Assess footwear for fit and stability", "Review medication list for fall-risk medications at each encounter", "Educate patient on home fall prevention strategies", "Document gait pattern description using clinical terminology", "Coordinate physical therapy and follow up on progress"],
    assessmentFindings: ["Spastic gait: stiff leg circumduction, toe-dragging (UMN lesion — stroke, MS)", "Festinating gait: shuffling, short steps, forward lean, difficulty initiating (Parkinson)", "Steppage gait: high knee lift with foot slap (foot drop — peroneal nerve palsy, L5 radiculopathy)", "Ataxic gait: wide-based, staggering, unable to tandem walk (cerebellar dysfunction)", "Antalgic gait: shortened stance phase on affected side (pain avoidance)", "Magnetic/apraxic gait: feet appear stuck to floor, wide-based (normal pressure hydrocephalus)", "Waddling gait: trunk sway side to side (proximal muscle weakness — myopathy)"],
    signs: {
      left: ["Mildly unsteady gait requiring observation", "TUG 12-15 seconds (moderate risk)", "Needs furniture or wall for balance", "Decreased stride length", "Reduced arm swing unilaterally"],
      right: ["Falls within the past 3 months", "TUG > 20 seconds (high risk)", "Unable to perform tandem gait", "Progressive gait deterioration over weeks", "New-onset gait abnormality with urinary incontinence and cognitive decline (NPH triad)"]
    },
    medications: [{
      name: "Carbidopa-Levodopa",
      type: "Dopamine precursor combination",
      action: "Levodopa crosses BBB and is converted to dopamine; carbidopa prevents peripheral decarboxylation, reducing side effects and increasing CNS availability",
      sideEffects: "Nausea, orthostatic hypotension, dyskinesias (long-term), hallucinations, impulse control disorders",
      contra: "Concurrent non-selective MAOIs, narrow-angle glaucoma, melanoma",
      pearl: "Dramatic gait improvement with carbidopa-levodopa trial supports diagnosis of Parkinson disease; 'wearing off' between doses develops after 3-5 years"
    }],
    pearls: ["The Timed Up and Go (TUG) test is the single most practical gait screening tool — > 12 seconds = fall risk", "Normal pressure hydrocephalus triad: magnetic gait + urinary incontinence + dementia (gait improves first with VP shunt)", "Festinating gait in Parkinson: patients accelerate involuntarily because center of gravity shifts forward and legs try to catch up", "Always check vitamin B12 in elderly patients with gait ataxia — subacute combined degeneration is reversible if caught early", "Steppage gait = foot drop = check L5 root and common peroneal nerve at fibular head"],
    quiz: [
      {
        question: "An elderly patient presents with a wide-based, shuffling gait where feet appear 'stuck to the floor,' along with urinary incontinence and memory problems. Which condition is most likely?",
        options: ["Parkinson disease", "Normal pressure hydrocephalus", "Cerebellar stroke", "Peripheral neuropathy"],
        correct: 1,
        rationale: "The classic triad of magnetic/apraxic gait, urinary incontinence, and dementia defines normal pressure hydrocephalus (NPH). This is a potentially reversible cause of dementia treated with ventriculoperitoneal shunting."
      },
      {
        question: "A patient with a foot drop demonstrates high-stepping gait with foot slap on the right side. Which nerve is most likely affected?",
        options: ["Tibial nerve", "Femoral nerve", "Common peroneal nerve", "Sciatic nerve"],
        correct: 2,
        rationale: "The common peroneal nerve wraps around the fibular head and is vulnerable to compression (leg crossing, casts, prolonged bedrest). Injury causes foot drop with steppage gait pattern (high knee lift to clear the drooping foot)."
      }
    ]
  },
  "galactosemia-rpn": {
    title: "Galactosemia",
    image: imgGalactosemia,
    cellular: { title: "Inborn Error of Galactose Metabolism", content: "Classic galactosemia is an autosomal recessive disorder caused by deficiency of galactose-1-phosphate uridylyltransferase (GALT), the enzyme that converts galactose-1-phosphate to glucose-1-phosphate in the Leloir pathway. When a newborn ingests breast milk or lactose-containing formula, lactose is broken down into glucose and galactose. Without GALT, galactose-1-phosphate and galactitol accumulate in the liver, brain, kidneys, and lens of the eye, causing direct cellular toxicity. Hepatocyte damage leads to jaundice, hepatomegaly, coagulopathy, and eventually cirrhosis. Galactitol accumulation in the lens causes cataracts through osmotic swelling of lens fibers. E. coli sepsis is a characteristic early complication because galactose-1-phosphate inhibits neutrophil bactericidal function." },
    riskFactors: ["Autosomal recessive inheritance (both parents must be carriers)", "Family history of galactosemia", "Consanguineous parents (increased carrier frequency)", "Irish Traveller population (carrier rate ~1:16)", "Any ethnicity — occurs in approximately 1:30,000-60,000 live births"],
    diagnostics: ["Newborn screening (Beutler test or fluorescent spot test for GALT activity)", "Elevated galactose-1-phosphate levels in red blood cells", "GALT enzyme activity assay (< 1% activity in classic galactosemia)", "Urine reducing substances positive (Clinitest) but glucose oxidase test negative", "Liver function tests (elevated AST/ALT, conjugated bilirubin, prolonged PT/INR)", "Blood and urine cultures (high index of suspicion for E. coli sepsis in sick neonate)", "Genetic testing for GALT gene mutations for confirmation"],
    management: ["Immediately discontinue breast milk and all lactose/galactose-containing formulas", "Initiate soy-based formula (Isomil, ProSobee) as galactose-free alternative", "Lifelong galactose-restricted diet (avoid all dairy products and hidden galactose sources)", "IV antibiotics if E. coli sepsis suspected (ampicillin + gentamicin)", "Correct coagulopathy with vitamin K and fresh frozen plasma as needed", "Monitor calcium and vitamin D supplementation (dairy-free diet risk)", "Ophthalmology referral for cataract evaluation"],
    nursingActions: ["Recognize early signs: poor feeding, vomiting, jaundice, and lethargy in a neonate", "Confirm newborn screening results and report positive screens immediately", "Discontinue breast milk/standard formula immediately upon suspicion", "Educate parents on strict galactose-free diet and hidden sources of galactose", "Monitor for signs of E. coli sepsis (temperature instability, lethargy, poor feeding)", "Measure and document daily weights and feeding tolerance", "Coordinate with pediatric dietitian for age-appropriate galactose-free nutrition"],
    assessmentFindings: ["Poor feeding and vomiting after initiation of milk feedings", "Jaundice within first days of life (conjugated hyperbilirubinemia)", "Hepatomegaly progressing rapidly", "Lethargy and hypotonia", "Bilateral cataracts (may develop within weeks)", "Failure to thrive despite adequate caloric intake", "E. coli sepsis in the neonatal period"],
    signs: {
      left: ["Poor feeding and vomiting after milk feeds", "Mild jaundice in first week of life", "Positive newborn screen for galactosemia", "Mild hepatomegaly on palpation"],
      right: ["E. coli sepsis with hemodynamic instability", "Severe coagulopathy with bleeding", "Progressive liver failure", "Bilateral cataracts", "Cerebral edema and encephalopathy"]
    },
    medications: [{
      name: "Ampicillin + Gentamicin",
      type: "Empiric neonatal antibiotic combination",
      action: "Ampicillin covers gram-positive organisms and Listeria; gentamicin provides gram-negative coverage including E. coli (synergistic killing)",
      sideEffects: "Gentamicin: nephrotoxicity, ototoxicity; Ampicillin: rash, diarrhea, hypersensitivity",
      contra: "Known anaphylaxis to penicillins (ampicillin); renal impairment requires gentamicin dose adjustment",
      pearl: "Standard empiric regimen for neonatal sepsis; E. coli sepsis is a classic presenting feature of galactosemia — always consider metabolic screening in septic neonates"
    }],
    pearls: ["Think galactosemia when a breastfed neonate develops jaundice, hepatomegaly, and E. coli sepsis", "Urine is positive for reducing substances (Clinitest) but NEGATIVE on glucose oxidase dipstick — this discrepancy is a classic board clue", "Cataracts may be reversible if galactose is removed from diet within the first few weeks of life", "Even with perfect dietary adherence, long-term complications include ovarian failure, speech delays, and learning disabilities", "Soy formula is safe — the galactose in soy is bound in oligosaccharides that humans cannot digest"],
    quiz: [
      {
        question: "A 5-day-old breastfed newborn presents with jaundice, hepatomegaly, poor feeding, and a positive blood culture for E. coli. Which condition should be immediately suspected?",
        options: ["Phenylketonuria", "Classic galactosemia", "Maple syrup urine disease", "Congenital hypothyroidism"],
        correct: 1,
        rationale: "The combination of jaundice, hepatomegaly, poor feeding after breast milk initiation, and E. coli sepsis in a neonate is the classic presentation of galactosemia. Galactose-1-phosphate impairs neutrophil function, predisposing specifically to E. coli infections."
      },
      {
        question: "What is the most important immediate nursing intervention for a newborn with confirmed galactosemia?",
        options: ["Increase breastfeeding frequency", "Switch to soy-based formula", "Administer phenobarbital for jaundice", "Begin phototherapy immediately"],
        correct: 1,
        rationale: "Immediately discontinuing breast milk (which contains lactose → galactose) and switching to soy-based formula removes the toxic substrate. This is the single most critical intervention and can prevent progression of organ damage."
      }
    ]
  },
  "gallbladder-disease-np": {
    title: "Gallbladder Disease",
    cellular: { title: "Pathophysiology of Cholelithiasis & Cholecystitis", content: "Gallstone formation (cholelithiasis) occurs when bile becomes supersaturated with cholesterol (80% of stones) or bilirubin (pigment stones). Cholesterol stones form when hepatic cholesterol secretion exceeds the solubilizing capacity of bile salts and phospholipids, leading to cholesterol crystal nucleation and stone growth. Gallbladder hypomotility (from progesterone, obesity, rapid weight loss, or vagotomy) promotes bile stasis, allowing crystals to aggregate. When a stone impacts the cystic duct, intraluminal pressure rises and the gallbladder mucosa releases prostaglandins and phospholipase A, initiating acute cholecystitis — an inflammatory process that progresses from chemical inflammation to bacterial superinfection (E. coli, Klebsiella, Enterococcus) if the obstruction persists. Complications include gangrenous cholecystitis, perforation, choledocholithiasis (common bile duct stones causing obstructive jaundice), cholangitis (Charcot triad), and gallstone pancreatitis." },
    riskFactors: ["Female sex (estrogen increases cholesterol secretion into bile)", "Age > 40 years", "Obesity and metabolic syndrome", "Rapid weight loss or bariatric surgery", "Pregnancy and multiparity (progesterone reduces gallbladder motility)", "Family history and Native American/Hispanic ethnicity", "Medications: OCP, estrogen replacement, fibrates, octreotide", "Cirrhosis and hemolytic disorders (pigment stones)"],
    diagnostics: ["Right upper quadrant ultrasound (first-line: 95% sensitivity for gallstones)", "Murphy sign: inspiratory arrest during RUQ palpation (classic for cholecystitis)", "HIDA scan (cholescintigraphy): non-visualization of gallbladder confirms cystic duct obstruction", "CBC with differential (leukocytosis with left shift in acute cholecystitis)", "Liver function tests: elevated ALP and GGT suggest biliary obstruction", "Lipase and amylase to rule out gallstone pancreatitis", "MRCP or EUS if choledocholithiasis suspected"],
    management: ["Laparoscopic cholecystectomy — definitive treatment for symptomatic cholelithiasis", "NPO status with IV hydration and pain control during acute episode", "IV antibiotics for acute cholecystitis (piperacillin-tazobactam or ceftriaxone + metronidazole)", "ERCP with sphincterotomy for common bile duct stones before cholecystectomy", "Ursodeoxycholic acid for patients who are not surgical candidates (dissolves small cholesterol stones)", "Low-fat diet counseling to reduce biliary colic frequency", "Percutaneous cholecystostomy for critically ill patients unable to undergo surgery"],
    nursingActions: ["Assess pain characteristics: RUQ pain radiating to right scapula, worse after fatty meals", "Monitor for signs of complications: fever, jaundice, peritoneal signs", "Maintain NPO status and administer IV fluids as ordered during acute episodes", "Administer analgesics (ketorolac or opioids) and antiemetics as prescribed", "Educate on low-fat dietary modifications and trigger food avoidance", "Post-cholecystectomy: monitor surgical sites, assess for bile leak (increasing abdominal pain, fever)", "Educate post-operative patients about postcholecystectomy diarrhea (bile salt malabsorption)"],
    assessmentFindings: ["Episodic RUQ or epigastric pain 30-60 minutes after fatty meals (biliary colic)", "Positive Murphy sign on exam", "Nausea and vomiting associated with pain episodes", "Fever and persistent RUQ pain > 6 hours (suggests acute cholecystitis)", "Jaundice and acholic (clay-colored) stools (suggests common bile duct obstruction)", "Charcot triad: fever, jaundice, RUQ pain (ascending cholangitis)", "Reynolds pentad: Charcot triad + hypotension + altered mental status (suppurative cholangitis)"],
    signs: {
      left: ["Episodic postprandial RUQ pain (biliary colic)", "Nausea after fatty meals", "Positive Murphy sign", "Normal temperature and WBC", "Incidental gallstones on imaging"],
      right: ["Fever > 38.5°C with persistent RUQ pain > 6 hours", "Jaundice with dark urine and acholic stools", "Charcot triad (cholangitis)", "Reynolds pentad (septic cholangitis)", "Elevated lipase (gallstone pancreatitis)"]
    },
    medications: [{
      name: "Ursodeoxycholic Acid (Ursodiol)",
      type: "Bile acid dissolution agent",
      action: "Reduces cholesterol saturation of bile by inhibiting hepatic cholesterol synthesis and intestinal cholesterol absorption, gradually dissolving cholesterol gallstones",
      sideEffects: "Diarrhea, GI upset, headache, elevated transaminases (rare)",
      contra: "Calcified stones, pigment stones, stones > 20 mm, non-functioning gallbladder",
      pearl: "Only effective for small (< 10 mm) radiolucent cholesterol stones in a functioning gallbladder; 50% recurrence after discontinuation"
    }, {
      name: "Piperacillin-Tazobactam",
      type: "Extended-spectrum penicillin + beta-lactamase inhibitor",
      action: "Broad-spectrum coverage including gram-negatives (E. coli, Klebsiella) and anaerobes common in biliary infections",
      sideEffects: "Diarrhea, C. difficile risk, thrombocytopenia, hypersensitivity reactions",
      contra: "Penicillin allergy; dose adjustment in renal impairment",
      pearl: "First-line empiric antibiotic for moderate-severe acute cholecystitis and cholangitis — covers biliary flora"
    }],
    pearls: ["Remember the 5 F's of cholelithiasis risk: Fat, Female, Fertile, Forty, Family history", "Murphy sign is specific for cholecystitis — patient arrests inspiration when examiner palpates RUQ during deep breath", "Biliary colic is self-limiting (< 6 hours); pain lasting > 6 hours suggests acute cholecystitis with cystic duct impaction", "Charcot triad (fever + jaundice + RUQ pain) = ascending cholangitis — this is a biliary emergency requiring ERCP", "Gallstone pancreatitis: always check lipase in patients with biliary symptoms — gallstones are the #1 cause of acute pancreatitis"],
    quiz: [
      {
        question: "A patient presents with fever, jaundice, and severe RUQ pain. Which complication of gallstone disease does this triad suggest?",
        options: ["Biliary colic", "Acute cholecystitis", "Ascending cholangitis", "Gallstone pancreatitis"],
        correct: 2,
        rationale: "Charcot triad (fever, jaundice, RUQ pain) is the classic presentation of ascending cholangitis — infection of the biliary tree due to obstruction, usually by a common bile duct stone. This is a surgical/GI emergency requiring ERCP."
      },
      {
        question: "Which imaging study is first-line for evaluating suspected cholelithiasis?",
        options: ["CT abdomen with contrast", "HIDA scan", "Right upper quadrant ultrasound", "MRCP"],
        correct: 2,
        rationale: "RUQ ultrasound is the first-line imaging for gallstone disease — it is 95% sensitive for gallstones, can assess gallbladder wall thickness (>3 mm suggests cholecystitis), and identifies pericholecystic fluid. It is non-invasive, no radiation, and low cost."
      }
    ]
  },
  "gastrointestinal-rn": {
    title: "Gastrointestinal System: RN Review",
    image: imgGERD,
    cellular: { title: "GI Tract Physiology & Common Pathology", content: "The gastrointestinal system extends from the esophagus to the anus and is responsible for mechanical and chemical digestion, nutrient absorption, and waste elimination. The GI wall has four layers: mucosa (secretion and absorption), submucosa (blood vessels, nerves, Meissner plexus), muscularis (peristalsis via Auerbach/myenteric plexus), and serosa. Key GI pathologies tested at the RN level include GERD (lower esophageal sphincter incompetence allowing acid reflux), peptic ulcer disease (H. pylori or NSAID-induced mucosal erosion), inflammatory bowel disease (Crohn vs. ulcerative colitis), bowel obstruction (mechanical vs. paralytic ileus), and GI hemorrhage (upper vs. lower). Liver pathology includes hepatitis and cirrhosis with portal hypertension causing esophageal varices, ascites, and hepatic encephalopathy." },
    riskFactors: ["NSAID and aspirin use (peptic ulcer disease)", "H. pylori infection (PUD, gastric cancer)", "Alcohol use and smoking (gastritis, liver disease, pancreatitis)", "Chronic GERD (Barrett esophagus, esophageal adenocarcinoma)", "Family history of colorectal cancer or IBD", "Obesity (GERD, NAFLD, colorectal cancer)", "Age > 50 (increased colorectal cancer screening)", "Immobility and opioid use (constipation, ileus)"],
    diagnostics: ["Monitor stool characteristics: color, consistency, frequency, occult blood", "Serial abdominal assessments: auscultate bowel sounds in all 4 quadrants before palpation", "Monitor NG tube output: color (bilious, coffee-ground, bloody), volume", "Track I&O with attention to ostomy output volumes", "Laboratory monitoring: CBC (anemia), BMP (electrolytes), liver function panel, lipase/amylase", "Stool guaiac/FIT testing for occult blood", "Prepare patient for procedures: EGD, colonoscopy (bowel prep education)"],
    management: ["Maintain NPO status as ordered for acute GI conditions", "Administer PPI or H2 blockers as prescribed for acid-related disorders", "Implement NG tube management: low continuous or intermittent suction as ordered", "Administer prescribed antiemetics and assess effectiveness", "Manage bowel regimen: stool softeners, stimulant laxatives per protocol", "Post-operative GI surgery: advance diet as tolerated per orders (clear liquids → full diet)", "Administer lactulose for hepatic encephalopathy as prescribed (target 3-4 soft stools/day)"],
    nursingActions: ["Auscultate bowel sounds BEFORE palpation — document presence, quality, and frequency", "Monitor NG tube placement and patency; irrigate with NS as ordered", "Assess abdomen for distension, rigidity, guarding, and rebound tenderness", "Monitor stool for melena (upper GI bleed) vs. bright red blood (lower GI bleed)", "Maintain fall precautions for patients with hepatic encephalopathy", "Educate on proper use of PPIs: take 30 minutes before first meal", "Assess ostomy stoma for color (should be beefy red), edema, and output"],
    assessmentFindings: ["Hyperactive bowel sounds (early obstruction, gastroenteritis)", "Hypoactive or absent bowel sounds (paralytic ileus, peritonitis)", "Abdominal distension with tympany (obstruction, ascites)", "Coffee-ground emesis (upper GI bleed)", "Melena: black tarry stool (upper GI bleed)", "Hematochezia: bright red rectal bleeding (lower GI bleed)", "Asterixis (liver flap) in hepatic encephalopathy"],
    signs: {
      left: ["Mild epigastric discomfort after meals", "Occasional heartburn responsive to antacids", "Normal bowel sounds present", "Soft, non-tender abdomen", "Regular bowel pattern with formed stool"],
      right: ["Rigid, board-like abdomen (peritonitis)", "Coffee-ground emesis or hematemesis", "Absent bowel sounds with severe distension", "Asterixis and confusion (hepatic encephalopathy)", "Hemodynamic instability with GI hemorrhage"]
    },
    medications: [{
      name: "Pantoprazole",
      type: "Proton pump inhibitor (PPI)",
      action: "Irreversibly inhibits H+/K+ ATPase (proton pump) on gastric parietal cells, reducing gastric acid secretion by 90%",
      sideEffects: "C. difficile risk, hypomagnesemia, B12 deficiency (long-term), bone fractures (long-term)",
      contra: "Known hypersensitivity to PPIs; long-term use requires periodic reassessment",
      pearl: "Administer 30 min before breakfast for optimal absorption; IV pantoprazole 80 mg bolus then 8 mg/hr drip for acute GI bleeding"
    }, {
      name: "Lactulose",
      type: "Osmotic laxative / ammonia-lowering agent",
      action: "Converted by colonic bacteria to lactic acid, lowering colonic pH to convert NH3 (absorbable) to NH4+ (non-absorbable), promoting fecal ammonia excretion",
      sideEffects: "Diarrhea, bloating, flatulence, hypernatremia with excessive use, electrolyte imbalance",
      contra: "Galactosemia; use cautiously in diabetes (contains galactose and lactose)",
      pearl: "Titrate to 3-4 soft stools per day for hepatic encephalopathy; give with rifaximin for refractory cases"
    }],
    pearls: ["Always auscultate BEFORE palpating the abdomen — palpation can alter bowel sounds", "Coffee-ground emesis = upper GI bleed; melena (black tarry stool) = upper GI bleed; hematochezia (bright red blood) = usually lower GI bleed", "Hepatic encephalopathy: lactulose titrated to 3-4 stools/day — too few = ammonia buildup, too many = dehydration", "NG tube irrigation: always use normal saline (never water) to prevent electrolyte dilution", "Crohn = 'skip lesions' anywhere mouth to anus with transmural inflammation; UC = continuous inflammation starting at rectum, mucosa only"],
    quiz: [
      {
        question: "A patient with cirrhosis becomes increasingly confused and demonstrates asterixis. What is the priority nursing intervention?",
        options: ["Administer a stimulant laxative", "Administer lactulose as prescribed and assess ammonia level", "Restrict all oral intake", "Position patient flat and elevate legs"],
        correct: 1,
        rationale: "Asterixis (liver flap) with confusion in a cirrhotic patient indicates hepatic encephalopathy from ammonia accumulation. Lactulose is the first-line treatment — it lowers colonic pH to trap ammonia in the gut for fecal excretion."
      },
      {
        question: "A patient with a nasogastric tube has coffee-ground aspirate. What does this finding indicate?",
        options: ["Normal NG drainage", "Upper GI bleeding (old/partially digested blood)", "Lower GI bleeding", "Biliary obstruction"],
        correct: 1,
        rationale: "Coffee-ground material represents partially digested blood (hemoglobin converted to hematin by gastric acid) and indicates upper GI bleeding. The nurse should report immediately, monitor vital signs, and prepare for potential EGD."
      }
    ]
  },
  "gastrointestinal-rpn": {
    title: "Gastrointestinal Basics",
    cellular: { title: "Digestive System Fundamentals", content: "The gastrointestinal system breaks down food through mechanical digestion (chewing, peristalsis, segmentation) and chemical digestion (enzymes, bile, acid) to absorb nutrients and eliminate waste. The stomach produces hydrochloric acid (parietal cells) and pepsinogen (chief cells) for protein digestion, with a thick mucus layer protecting the gastric lining from autodigestion. The small intestine is the primary site of nutrient absorption, with villi and microvilli maximizing surface area. The large intestine absorbs water and electrolytes and forms stool. Common practical nursing concerns include managing nausea/vomiting, constipation, diarrhea, and monitoring for dehydration. Understanding normal bowel patterns and recognizing changes from baseline is a fundamental nursing assessment skill." },
    riskFactors: ["Immobility and bedrest (constipation risk)", "Opioid medications (decreased peristalsis)", "Poor dietary fiber and fluid intake", "Stress and anxiety (affects gut motility)", "NPO status and surgical procedures", "Advanced age (decreased peristalsis and secretion)", "Polypharmacy (many drugs cause GI side effects)"],
    diagnostics: ["Monitor and document bowel movement frequency, consistency, and characteristics", "Assess bowel sounds in all four quadrants (report absent sounds to RN/provider)", "Monitor intake and output, noting any vomiting or diarrhea losses", "Test stool for occult blood as directed", "Observe for abdominal distension and measure abdominal girth as directed"],
    management: ["Encourage adequate fluid intake (minimum 1500-2000 mL/day unless restricted)", "Promote high-fiber diet when appropriate", "Assist with early ambulation post-operatively to promote peristalsis", "Administer prescribed antiemetics and stool softeners", "Position patient upright for meals and keep HOB elevated 30° after eating for GERD", "Implement toileting schedule and provide privacy for bowel elimination"],
    nursingActions: ["Listen for bowel sounds before reporting changes to the registered nurse", "Document stool characteristics using Bristol Stool Chart terminology", "Measure and record all emesis volume and character", "Report absent bowel sounds, severe abdominal distension, or abdominal rigidity immediately", "Assist patients with proper positioning for elimination (sitting upright)", "Monitor skin integrity in perianal area for patients with frequent diarrhea", "Educate patients on importance of not straining during bowel movements"],
    assessmentFindings: ["Normal bowel sounds: 5-30 clicks/gurgles per minute", "Hyperactive bowel sounds: high-pitched, rushing (diarrhea, early obstruction)", "Hypoactive bowel sounds: infrequent, diminished (post-op ileus, constipation)", "Abdominal distension with patient discomfort", "Nausea and vomiting (note color: clear, bilious, coffee-ground)", "Changes in stool pattern from patient's baseline"],
    signs: {
      left: ["Mild constipation (no BM for 2-3 days)", "Occasional nausea without vomiting", "Mild abdominal bloating", "Reduced appetite"],
      right: ["Absent bowel sounds with vomiting (possible obstruction)", "Severe abdominal distension and pain", "Bloody or coffee-ground emesis", "Signs of dehydration (dry mucous membranes, poor skin turgor, decreased UO)", "Rigid abdomen (peritonitis — report immediately)"]
    },
    medications: [{
      name: "Ondansetron (Zofran)",
      type: "5-HT3 receptor antagonist antiemetic",
      action: "Blocks serotonin receptors in the chemoreceptor trigger zone and vagal afferents, preventing nausea and vomiting",
      sideEffects: "Headache, constipation, QT prolongation (dose-dependent)",
      contra: "Congenital long QT syndrome; use cautiously with other QT-prolonging drugs",
      pearl: "Can be given PO, IV, or ODT (orally disintegrating tablet); ODT dissolves on tongue for patients who cannot swallow"
    }],
    pearls: ["Always listen for bowel sounds BEFORE touching the abdomen — palpation stimulates peristalsis and falsely alters findings", "Normal bowel frequency ranges from 3 times/day to 3 times/week — always compare to the patient's baseline", "Post-operative patients: passage of flatus is the first sign of returning bowel function", "Clear liquid diet → full liquid → soft → regular is the standard diet advancement progression", "Encourage ambulation as the single most effective non-pharmacological intervention for constipation"],
    quiz: [
      {
        question: "A post-operative patient has not had a bowel movement for 3 days and has hypoactive bowel sounds. Which intervention should the practical nurse implement first?",
        options: ["Administer a suppository immediately", "Encourage early ambulation and adequate fluid intake", "Restrict all oral intake", "Report as emergency to the physician"],
        correct: 1,
        rationale: "Early ambulation and hydration are first-line interventions for post-operative ileus and constipation. These promote peristalsis naturally. Laxatives or suppositories would require an order and are second-line after conservative measures."
      },
      {
        question: "Why should the nurse auscultate bowel sounds BEFORE palpating the abdomen?",
        options: ["It is more comfortable for the patient", "Palpation can stimulate or alter bowel sounds, giving inaccurate findings", "Bowel sounds can only be heard before palpation", "It is required for billing purposes"],
        correct: 1,
        rationale: "Palpating the abdomen before auscultation can stimulate peristalsis, artificially increasing bowel sound frequency and leading to inaccurate assessment. The correct order is: inspection, auscultation, percussion, palpation."
      }
    ]
  },
  "gaucher-disease-np": {
    title: "Gaucher Disease",
    cellular: { title: "Lysosomal Storage Disease: Glucocerebrosidase Deficiency", content: "Gaucher disease is the most common lysosomal storage disorder, caused by autosomal recessive mutations in the GBA1 gene encoding the enzyme glucocerebrosidase (acid beta-glucosidase). This enzyme normally cleaves glucocerebroside (glucosylceramide) — a glycolipid component of cell membranes — into glucose and ceramide within lysosomes. Without functional glucocerebrosidase, glucocerebroside accumulates within the lysosomes of macrophages, which become engorged and transformed into pathognomonic 'Gaucher cells' — large cells with a characteristic 'wrinkled tissue paper' or 'crumpled silk' cytoplasm on light microscopy. These lipid-laden macrophages infiltrate the bone marrow (causing cytopenias), spleen (massive splenomegaly), liver (hepatomegaly), and bones (avascular necrosis, pathologic fractures, Erlenmeyer flask deformity of distal femur). Type 1 (non-neuronopathic) is the most common form, particularly prevalent in Ashkenazi Jewish populations (~1:850 carrier frequency)." },
    riskFactors: ["Ashkenazi Jewish heritage (1:15 carrier frequency for Type 1)", "Autosomal recessive inheritance (both parents must be carriers)", "Family history of Gaucher disease", "Consanguinity increases homozygous risk", "GBA1 gene mutations — over 300 identified mutations", "Type 1 most common (94% of cases); Types 2 and 3 are neuronopathic"],
    diagnostics: ["Glucocerebrosidase enzyme activity assay in leukocytes or fibroblasts (gold standard — < 15% activity)", "Elevated biomarkers: chitotriosidase (highly elevated), ACE level, tartrate-resistant acid phosphatase", "Bone marrow biopsy: Gaucher cells (wrinkled tissue paper cytoplasm — PAS positive)", "CBC: pancytopenia (thrombocytopenia typically most prominent)", "MRI of femurs and spine: bone marrow infiltration, avascular necrosis, Erlenmeyer flask deformity", "Liver/spleen volumetry by MRI or CT", "GBA1 genetic testing for mutation confirmation and carrier screening", "DXA scan for osteoporosis assessment"],
    management: ["Enzyme replacement therapy (ERT): imiglucerase, velaglucerase alfa, taliglucerase alfa (IV every 2 weeks)", "Substrate reduction therapy (SRT): eliglustat (oral first-line for CYP2D6 extensive/intermediate metabolizers) or miglustat", "Splenectomy only if refractory to ERT (avoided when possible — increases bone disease risk)", "Bisphosphonates for osteoporosis from bone marrow infiltration", "Orthopedic management for avascular necrosis and pathologic fractures", "Genetic counseling and carrier screening for family members", "Monitor for increased Parkinson disease risk (GBA1 carriers and patients)"],
    nursingActions: ["Administer ERT infusions per protocol — monitor for infusion reactions (urticaria, flushing, hypotension)", "Pre-medicate with antihistamines and/or corticosteroids for patients with infusion reaction history", "Monitor CBC and platelet counts at regular intervals to assess treatment response", "Assess for bone pain, joint symptoms, and functional mobility changes", "Monitor liver and spleen size trends (palpation and imaging)", "Educate patients on lifelong nature of ERT and importance of adherence to biweekly schedule", "Screen for signs of Parkinson disease at follow-up visits (GBA1 mutation is a risk factor)"],
    assessmentFindings: ["Massive splenomegaly (may extend to pelvis) with early satiety and abdominal fullness", "Hepatomegaly (typically moderate)", "Easy bruising and mucosal bleeding from thrombocytopenia", "Bone pain, particularly in femurs and spine", "Pathologic fractures and avascular necrosis of femoral head", "Growth retardation in children", "Fatigue from anemia"],
    signs: {
      left: ["Moderate splenomegaly on exam", "Mild thrombocytopenia (80,000-150,000)", "Intermittent bone pain", "Fatigue and easy bruising", "Elevated chitotriosidase level"],
      right: ["Massive splenomegaly causing respiratory compromise", "Severe thrombocytopenia < 20,000 with active bleeding", "Pathologic fracture or acute bone crisis (severe pain, fever)", "Pulmonary hypertension", "Neuronopathic disease (Types 2/3): seizures, brainstem dysfunction, oculomotor apraxia"]
    },
    medications: [{
      name: "Imiglucerase (Cerezyme)",
      type: "Recombinant glucocerebrosidase enzyme replacement",
      action: "Provides exogenous glucocerebrosidase that is taken up by macrophages via mannose receptors, clearing accumulated glucocerebroside from lysosomes",
      sideEffects: "Infusion reactions (pruritus, flushing, urticaria, chest tightness), antibody formation in ~15%",
      contra: "Anaphylaxis to product; does NOT cross BBB — ineffective for neuronopathic (Type 2/3) disease",
      pearl: "IV infusion every 2 weeks for life; response seen in 6-12 months — spleen and hematologic parameters improve first, bone disease responds slowest"
    }, {
      name: "Eliglustat (Cerdelga)",
      type: "Oral substrate reduction therapy",
      action: "Inhibits glucosylceramide synthase, reducing production of the substrate that accumulates in Gaucher cells",
      sideEffects: "Diarrhea, arthralgia, headache, fatigue, QTc prolongation at supratherapeutic doses",
      contra: "CYP2D6 ultra-rapid or poor metabolizers (unpredictable drug levels); concurrent strong CYP2D6 and CYP3A inhibitors",
      pearl: "Only oral first-line therapy for Type 1 Gaucher — requires CYP2D6 genotyping before initiation to determine eligibility and dosing"
    }],
    pearls: ["Gaucher cells have pathognomonic 'wrinkled tissue paper' cytoplasm — distinguish from Niemann-Pick foam cells which have a 'soap bubble' appearance", "Thrombocytopenia is usually the first and most prominent hematologic finding — always consider Gaucher in unexplained splenomegaly with cytopenias", "GBA1 mutations are the strongest genetic risk factor for Parkinson disease — counsel patients about this association", "Erlenmeyer flask deformity of the distal femur on X-ray is a classic radiographic finding", "ERT does NOT cross the blood-brain barrier — it cannot treat neuronopathic (Type 2/3) disease"],
    quiz: [
      {
        question: "A 25-year-old Ashkenazi Jewish patient presents with massive splenomegaly, thrombocytopenia, and bilateral femur pain. Bone marrow biopsy shows cells with 'wrinkled tissue paper' cytoplasm. Which diagnostic test confirms the diagnosis?",
        options: ["Hemoglobin electrophoresis", "Glucocerebrosidase enzyme activity assay", "Serum ferritin level", "Peripheral blood flow cytometry"],
        correct: 1,
        rationale: "Glucocerebrosidase enzyme activity < 15% of normal in leukocytes or fibroblasts is the gold standard diagnostic test for Gaucher disease. The clinical presentation and Gaucher cells on biopsy are highly suggestive, but enzyme activity confirms the diagnosis."
      },
      {
        question: "A patient with Gaucher disease Type 1 is started on imiglucerase enzyme replacement therapy. Which counseling point is most important?",
        options: ["Treatment is typically needed for only 6 months", "Infusions are required every 2 weeks for life", "The medication can cure the underlying genetic defect", "Oral formulation is available for home administration"],
        correct: 1,
        rationale: "ERT is a lifelong commitment requiring IV infusions every 2 weeks. It does not cure the genetic defect but provides the missing enzyme to clear accumulated substrate. Hematologic and visceral improvements are seen in 6-12 months."
      }
    ]
  },
  "gbs-miller-fisher-rn": {
    title: "GBS Variants: Miller Fisher Syndrome",
    cellular: { title: "Pathophysiology of Miller Fisher Syndrome", content: "Miller Fisher syndrome (MFS) is a variant of Guillain-Barré syndrome (GBS) characterized by the clinical triad of ophthalmoplegia (paralysis of extraocular muscles), ataxia (cerebellar-like gait instability), and areflexia. The pathophysiology involves molecular mimicry: antibodies generated against ganglioside epitopes on the surface of the triggering pathogen (commonly Campylobacter jejuni or Haemophilus influenzae) cross-react with GQ1b gangliosides that are highly concentrated in cranial nerves III, IV, and VI (controlling eye movements), cerebellar neurons, and peripheral nerve nodes of Ranvier. Anti-GQ1b antibodies are present in more than 90% of MFS cases and are a key diagnostic marker. Unlike classic GBS, MFS typically does not progress to respiratory failure, but overlap syndromes with ascending weakness can occur." },
    riskFactors: ["Recent infection 1-4 weeks prior (Campylobacter jejuni gastroenteritis most common)", "Haemophilus influenzae upper respiratory infection", "Mycoplasma pneumoniae infection", "Epstein-Barr virus or cytomegalovirus infection", "Recent vaccination (rare association)", "Male predominance (2:1)", "Any age but peak incidence in 20s-50s"],
    diagnostics: ["Anti-GQ1b antibodies (positive in > 90% of MFS — highly specific)", "Lumbar puncture: albuminocytologic dissociation (elevated protein with normal cell count)", "Nerve conduction studies: sensory nerve abnormalities, reduced or absent reflexes", "MRI brain/spine to rule out brainstem stroke or demyelinating lesions", "Serial forced vital capacity (FVC) and negative inspiratory force (NIF) to monitor for respiratory involvement", "Assess for anti-GD1a antibodies if limb weakness develops (overlap syndrome)"],
    management: ["IVIG 0.4 g/kg/day for 5 days (standard treatment for moderate-severe cases)", "Plasmapheresis as alternative if IVIG contraindicated", "Serial respiratory monitoring: FVC every 4-6 hours (intubate if FVC < 20 mL/kg or NIF < -30 cmH2O)", "DVT prophylaxis with subcutaneous heparin and compression devices", "Physical therapy for ataxia management and fall prevention", "Pain management (neuropathic pain common — gabapentin or pregabalin)", "Supportive care with gradual recovery expected over weeks to months"],
    nursingActions: ["Perform serial neurological assessments every 2-4 hours: extraocular movements, limb strength, DTRs", "Monitor respiratory function: FVC and NIF every 4-6 hours, pulse oximetry continuously", "Implement strict fall precautions for ataxia (assist with all ambulation, bed alarm)", "Assess swallowing function before oral intake (cranial nerve involvement risk)", "Monitor for autonomic dysfunction: blood pressure lability, cardiac arrhythmias, urinary retention", "Administer IVIG per protocol — monitor for infusion reactions and renal function", "Provide emotional support — explain that MFS typically has excellent prognosis with full recovery"],
    assessmentFindings: ["Bilateral ophthalmoplegia (inability to move eyes — diplopia, ptosis)", "Ataxia with wide-based, unsteady gait", "Areflexia (absent deep tendon reflexes)", "Preceding infectious illness 1-4 weeks before onset", "Intact limb strength (distinguishes from classic GBS)", "Possible facial weakness or bulbar symptoms in overlap variants", "Neuropathic pain in extremities"],
    signs: {
      left: ["Bilateral diplopia and ptosis", "Unsteady gait requiring assistance", "Absent deep tendon reflexes", "Intact upper and lower extremity strength", "Anti-GQ1b antibodies positive"],
      right: ["Progressive descending weakness (overlap with classic GBS)", "FVC < 20 mL/kg requiring intubation", "Bulbar weakness with dysphagia and aspiration risk", "Autonomic instability (BP lability, arrhythmias)", "Complete ophthalmoplegia with facial diplegia"]
    },
    medications: [{
      name: "Intravenous Immunoglobulin (IVIG)",
      type: "Pooled human immunoglobulin",
      action: "Modulates immune response by neutralizing pathogenic autoantibodies, blocking Fc receptors on macrophages, and inhibiting complement activation",
      sideEffects: "Headache, fever, chills, nausea, aseptic meningitis, renal failure (sucrose-containing formulations), thrombotic events",
      contra: "IgA deficiency with anti-IgA antibodies (risk of anaphylaxis); use IgA-depleted product if needed",
      pearl: "Dose: 0.4 g/kg/day x 5 days; check IgA level before first infusion; pre-medicate with acetaminophen and diphenhydramine; hydrate adequately to prevent renal complications"
    }],
    pearls: ["MFS classic triad: Ophthalmoplegia + Ataxia + Areflexia — remember 'OAA'", "Anti-GQ1b antibodies are >90% sensitive and highly specific for MFS — the single best diagnostic marker", "Unlike classic GBS (ascending paralysis), MFS does NOT typically cause respiratory failure — but monitor anyway for overlap syndromes", "Albuminocytologic dissociation on LP (high protein, normal WBC) supports GBS/MFS diagnosis", "Prognosis is excellent — most patients recover fully within 3-6 months without treatment, but IVIG speeds recovery"],
    quiz: [
      {
        question: "A patient presents 2 weeks after a GI illness with bilateral diplopia, unsteady gait, and absent reflexes but normal limb strength. Which antibody test should be ordered?",
        options: ["ANA (antinuclear antibody)", "Anti-GQ1b antibody", "Anti-dsDNA antibody", "Anti-acetylcholine receptor antibody"],
        correct: 1,
        rationale: "The triad of ophthalmoplegia, ataxia, and areflexia following a recent infection is classic Miller Fisher syndrome. Anti-GQ1b antibodies are positive in >90% of cases and are the most specific diagnostic marker for this condition."
      },
      {
        question: "A patient diagnosed with Miller Fisher syndrome has a forced vital capacity (FVC) of 18 mL/kg. What is the priority nursing action?",
        options: ["Continue routine monitoring every 8 hours", "Notify the provider immediately — patient may need intubation", "Encourage incentive spirometry", "Administer supplemental oxygen via nasal cannula"],
        correct: 1,
        rationale: "FVC < 20 mL/kg is a critical threshold indicating impending respiratory failure requiring intubation. Although pure MFS rarely progresses to respiratory failure, overlap with classic GBS can occur, making respiratory monitoring essential."
      }
    ]
  },
  "gcs-advanced-rn": {
    title: "Glasgow Coma Scale: Advanced Application",
    cellular: { title: "Neuroanatomy of Consciousness & GCS", content: "The Glasgow Coma Scale (GCS) quantifies consciousness by independently scoring three behavioral responses: eye opening (E1-4), verbal response (V1-5), and motor response (M1-6), yielding a composite score of 3-15. Consciousness is maintained by the ascending reticular activating system (ARAS) in the brainstem, which projects to the thalamus and diffusely to the cerebral cortex. Any process disrupting the ARAS (brainstem lesion) or causing bilateral cortical dysfunction (diffuse injury, metabolic encephalopathy) impairs consciousness. The motor component carries the greatest prognostic weight and should be reported as component scores (e.g., E3V4M5 = 12) rather than a single number to avoid losing clinically significant information. The best motor response to central pain differentiates upper brain dysfunction (localization M5) from brainstem dysfunction (abnormal flexion/decorticate M3, extension/decerebrate M2)." },
    riskFactors: ["Traumatic brain injury (leading cause of impaired consciousness in young adults)", "Stroke (hemorrhagic or ischemic)", "Metabolic encephalopathy (hepatic, uremic, hypoglycemic, septic)", "Drug or alcohol intoxication/overdose", "Status epilepticus (postictal state)", "CNS infections (meningitis, encephalitis)", "Brain tumors with mass effect", "Hypoxic-ischemic brain injury (cardiac arrest)"],
    diagnostics: ["GCS assessment with individual component scoring (E, V, M reported separately)", "Pupillary assessment: size, shape, reactivity — unequal pupils suggest herniation", "GCS-Pupils score (GCS-P): GCS minus pupil reactivity score for improved prognostication", "CT head without contrast (first-line for acute altered consciousness)", "Point-of-care glucose (rule out hypoglycemia as reversible cause)", "Metabolic panel, ammonia, drug screen, ABG (evaluate metabolic causes)", "EEG if seizure activity suspected"],
    management: ["Maintain airway protection: GCS ≤ 8 generally requires intubation ('GCS 8, intubate')", "Elevate HOB 30° to promote venous drainage and reduce ICP", "Target normoglycemia, normothermia, and normotension", "Correct reversible causes: dextrose for hypoglycemia, naloxone for opioid overdose, flumazenil with caution for benzodiazepines", "ICP monitoring for GCS ≤ 8 with abnormal CT (EVD or intraparenchymal monitor)", "Avoid hypotension (SBP < 90) — secondary brain injury worsens outcomes", "Neurosurgical consultation for surgical lesions (epidural hematoma, large subdural, cerebellar hemorrhage)"],
    nursingActions: ["Perform GCS assessment at standardized intervals: q15min in acute phase, q1-2h when stable", "Record component scores individually (E3V4M5) — never report only the total", "Apply central stimulus correctly: trapezius squeeze or supraorbital pressure (avoid peripheral nail bed pressure alone)", "Check pupil reactivity simultaneously — document size in mm and response to light", "Recognize confounders: intubation (V1T), sedation, orbital trauma, pre-existing deficits", "Report any GCS decline of ≥ 2 points immediately — suggests neurological deterioration", "Maintain seizure precautions and padded side rails"],
    assessmentFindings: ["GCS 13-15: mild brain injury (eyes open spontaneously, oriented, follows commands)", "GCS 9-12: moderate brain injury (eyes open to voice/pain, confused, localizes pain)", "GCS 3-8: severe brain injury (no eye opening, no verbal response, abnormal motor)", "Decorticate posturing (M3): arms flexed, legs extended — cortical damage above brainstem", "Decerebrate posturing (M2): arms and legs extended and internally rotated — brainstem damage", "Cushing triad: hypertension + bradycardia + irregular respirations — impending herniation", "Unilateral fixed dilated pupil: ipsilateral uncal herniation — neurosurgical emergency"],
    signs: {
      left: ["GCS 13-15 with confusion", "Pupils equal and reactive", "Follows commands appropriately", "Oriented to person but not place/time", "Mild headache with intact motor function"],
      right: ["GCS ≤ 8 requiring airway protection", "Unilateral fixed dilated pupil (herniation)", "Decerebrate or decorticate posturing", "Cushing triad (HTN, bradycardia, irregular breathing)", "GCS drop ≥ 2 points from baseline"]
    },
    medications: [{
      name: "Mannitol",
      type: "Osmotic diuretic",
      action: "Creates osmotic gradient across intact BBB, drawing water from brain parenchyma into the intravascular space, reducing cerebral edema and ICP",
      sideEffects: "Hypotension (after initial volume expansion), electrolyte imbalances, rebound ICP elevation, acute kidney injury at high cumulative doses",
      contra: "Anuria, severe dehydration, active intracranial bleeding (relative — may worsen hemorrhage expansion)",
      pearl: "Give 0.25-1 g/kg IV bolus over 15-20 min for acute ICP crisis; monitor serum osmolality (hold if > 320 mOsm/L); keep serum sodium < 155"
    }, {
      name: "Hypertonic Saline (3% or 23.4%)",
      type: "Osmotic agent for ICP reduction",
      action: "Increases serum osmolality, creating osmotic gradient to draw edema fluid from brain tissue; also improves cerebral blood flow and reduces inflammation",
      sideEffects: "Hypernatremia, central pontine myelinolysis (if corrected too rapidly), phlebitis (requires central line for 23.4%)",
      contra: "Hypernatremia > 155 mEq/L; severe CHF",
      pearl: "Preferred over mannitol in hypotensive patients because it expands intravascular volume rather than causing diuresis"
    }],
    pearls: ["'GCS 8, intubate' — patients with GCS ≤ 8 cannot protect their airway", "Always report GCS as component scores (E3V4M5 = 12) — a patient with E4V1TM6 (intubated) is very different from E2V3M6", "Motor response is the MOST prognostically significant component of the GCS", "Unilateral fixed dilated pupil = uncal herniation until proven otherwise — this is a neurosurgical emergency", "A 2-point drop in GCS is clinically significant and requires immediate notification and repeat imaging"],
    quiz: [
      {
        question: "An intubated patient opens eyes to painful stimuli, has no verbal response (intubated), and localizes pain with upper extremities. What is the correct GCS documentation?",
        options: ["GCS 8", "GCS 10", "E2V1TM5 = 8T", "E2V5M5 = 12"],
        correct: 2,
        rationale: "The correct documentation is E2 (eyes open to pain) + V1T (verbal score 1 with 'T' notation indicating intubation, not assessable) + M5 (localizes pain) = 8T. The 'T' designator is critical because the patient cannot be verbally assessed, and the total does not reflect true neurological status."
      },
      {
        question: "A patient with a traumatic brain injury has a GCS that drops from 11 to 8 over 2 hours, with a new unilateral fixed dilated pupil. What is the priority action?",
        options: ["Continue monitoring every 15 minutes", "Administer acetaminophen for headache", "Notify the neurosurgeon immediately — signs of uncal herniation", "Lower the head of bed to increase cerebral perfusion"],
        correct: 2,
        rationale: "A GCS drop of 3 points combined with a unilateral fixed dilated pupil strongly suggests uncal herniation from an expanding intracranial lesion. This is a neurosurgical emergency requiring immediate notification, repeat CT, and likely surgical intervention."
      },
      {
        question: "Which motor response on the GCS is most concerning for brainstem compromise?",
        options: ["Localizes pain (M5)", "Withdrawal from pain (M4)", "Abnormal flexion/decorticate (M3)", "Extension/decerebrate (M2)"],
        correct: 3,
        rationale: "Decerebrate posturing (extension, M2) indicates damage at or below the level of the red nucleus in the brainstem and carries a much worse prognosis than decorticate posturing (M3), which indicates damage above the brainstem."
      }
    ]
  },
  "gcs-assessment-np": {
    title: "Glasgow Coma Scale: NP Assessment",
    cellular: { title: "Advanced GCS Interpretation & Prognostication", content: "The nurse practitioner utilizes the Glasgow Coma Scale not only as a bedside assessment tool but as a prognostic instrument integrated with pupillary reactivity, neuroimaging findings, and clinical context. The GCS-Pupils (GCS-P) score subtracts a pupil reactivity score (PRS) from the GCS total: both pupils reactive = PRS 0, one reactive = PRS 1, neither reactive = PRS 2. This yields a GCS-P range of 1-15, which provides superior outcome prediction compared to GCS alone for traumatic brain injury. The NP differentiates between structural causes of altered consciousness (focal findings, pupil asymmetry, lateralizing motor responses — requiring imaging and neurosurgical evaluation) and toxic-metabolic causes (symmetric findings, intact pupillary reflexes, no lateralization — requiring metabolic workup). Integration of GCS trends with the FOUR score (Full Outline of UnResponsiveness), which includes brainstem reflexes and respiration pattern, provides more comprehensive coma assessment than GCS alone." },
    riskFactors: ["Traumatic brain injury (motor vehicle accidents, falls, assaults)", "Hemorrhagic stroke (intracerebral, subarachnoid hemorrhage)", "Large territory ischemic stroke with edema", "Status epilepticus (convulsive and non-convulsive)", "Severe sepsis with encephalopathy", "Drug intoxication or poisoning", "Post-cardiac arrest with hypoxic-ischemic encephalopathy", "Hepatic encephalopathy (elevated ammonia)"],
    diagnostics: ["GCS with component scoring and GCS-Pupils (GCS-P) calculation", "FOUR score (Full Outline of UnResponsiveness) for more detailed coma assessment", "CT head without contrast for structural lesion evaluation", "CT angiography if vascular pathology suspected (stroke, aneurysm)", "MRI brain with DWI for ischemic injury and prognostication in HIE", "Continuous EEG for non-convulsive status epilepticus detection", "Comprehensive metabolic panel, ammonia, toxicology screen, ABG", "Somatosensory evoked potentials (SSEPs) for prognostication in comatose patients"],
    management: ["Rapid identification and treatment of reversible causes (hypoglycemia, opioid overdose, status epilepticus)", "Airway management: GCS ≤ 8 or loss of protective reflexes requires endotracheal intubation", "ICP-directed therapy: HOB 30°, osmotic agents, sedation, CSF drainage via EVD", "Targeted temperature management for post-cardiac arrest patients", "Seizure prophylaxis in traumatic brain injury (levetiracetam first-line)", "Avoid secondary injury: maintain CPP > 60 mmHg, PaO2 > 60, PaCO2 35-45, glucose 140-180", "Neurosurgical referral for operable lesions (epidural hematoma, large subdural, obstructive hydrocephalus)"],
    nursingActions: ["Perform and document GCS-P and FOUR score at each assessment interval", "Distinguish structural vs. metabolic coma using pupillary findings and motor lateralization", "Correlate GCS trends with neuroimaging findings for clinical decision-making", "Calculate cerebral perfusion pressure (CPP = MAP - ICP) and maintain within target range", "Order and interpret metabolic workup for altered consciousness", "Determine need for advanced airway management based on GCS trajectory", "Initiate goals-of-care discussions when prognostic indicators suggest poor outcome"],
    assessmentFindings: ["Structural coma: focal deficits, asymmetric pupils, lateralizing motor responses", "Metabolic coma: symmetric findings, intact pupil reactivity, no lateralization", "Cushing response: hypertension, bradycardia, irregular breathing (ICP crisis)", "Loss of brainstem reflexes in progressive coma: corneal, oculocephalic, gag, cough", "Non-convulsive status epilepticus: subtle eye movements, fluctuating consciousness without convulsions"],
    signs: {
      left: ["GCS 13-15 with preserved brainstem reflexes", "Symmetric pupils reactive to light", "Follows commands with no lateralization", "FOUR score E4M4B4R4 (fully responsive)", "Metabolic cause identified and reversible"],
      right: ["GCS ≤ 8 without improvement after reversible causes corrected", "Bilateral fixed dilated pupils > 4 mm", "Absent brainstem reflexes (corneal, oculocephalic, gag)", "Loss of respiratory drive requiring mechanical ventilation", "Bilateral absent cortical SSEPs (poor prognosis marker)"]
    },
    medications: [{
      name: "Levetiracetam (Keppra)",
      type: "Anticonvulsant (SV2A ligand)",
      action: "Binds synaptic vesicle protein 2A (SV2A), modulating neurotransmitter release and reducing neuronal hyperexcitability",
      sideEffects: "Behavioral changes (agitation, irritability — 'Keppra rage'), drowsiness, dizziness",
      contra: "Known hypersensitivity; dose adjust for renal impairment (CrCl-based dosing)",
      pearl: "First-line seizure prophylaxis in TBI (7-day course); fewer drug interactions than phenytoin; no hepatic metabolism; available IV and PO"
    }],
    pearls: ["GCS-Pupils (GCS-P) adds prognostic value beyond GCS alone — bilateral unreactive pupils subtract 2 points", "The FOUR score overcomes GCS limitations: it assesses brainstem reflexes and respiratory pattern, and can be used in intubated patients", "In metabolic coma, pupils are typically reactive and findings are symmetric — this distinguishes from structural lesions", "Absent bilateral cortical N20 responses on SSEPs in post-cardiac arrest patients predict poor neurological outcome with high specificity", "Always check glucose immediately in any patient with altered consciousness — hypoglycemia is the most easily reversible cause"],
    quiz: [
      {
        question: "An NP evaluates a comatose patient. GCS is 6 (E1V2M3). Right pupil is 6mm fixed, left is 3mm reactive. What does this presentation most likely indicate?",
        options: ["Metabolic encephalopathy", "Right-sided uncal herniation compressing CN III", "Bilateral brainstem injury", "Drug intoxication with symmetric findings"],
        correct: 1,
        rationale: "A unilateral fixed dilated pupil with contralateral reactive pupil in a comatose patient indicates ipsilateral uncal (transtentorial) herniation compressing the oculomotor nerve (CN III). This is a neurosurgical emergency. Metabolic comas typically have symmetric, reactive pupils."
      },
      {
        question: "Which assessment tool provides more comprehensive coma evaluation than the GCS in intubated patients?",
        options: ["Mini-Mental State Exam", "FOUR score (Full Outline of UnResponsiveness)", "Montreal Cognitive Assessment", "Richmond Agitation-Sedation Scale"],
        correct: 1,
        rationale: "The FOUR score assesses Eye response, Motor response, Brainstem reflexes, and Respiration pattern — it does not include a verbal component, making it applicable to intubated patients. It also adds brainstem reflex and respiratory drive assessment, which GCS lacks."
      }
    ]
  },
  "general-adaptation": {
    title: "General Adaptation Syndrome",
    image: imgGAS,
    cellular: { title: "Stress Response Physiology", content: "Hans Selye's General Adaptation Syndrome (GAS) describes the body's physiological response to stress through three stages: alarm, resistance, and exhaustion. The alarm stage activates the sympathetic nervous system and hypothalamic-pituitary-adrenal (HPA) axis, releasing catecholamines (epinephrine, norepinephrine) from the adrenal medulla and cortisol from the adrenal cortex — this 'fight-or-flight' response increases heart rate, blood pressure, respiratory rate, blood glucose, and redirects blood flow to skeletal muscles. The resistance stage represents adaptation to continued stress, where cortisol maintains elevated glucose levels through gluconeogenesis and the body attempts to restore homeostasis while remaining hypervigilant. If the stressor persists beyond the body's adaptive capacity, the exhaustion stage ensues with depletion of energy reserves, immune suppression, organ dysfunction, and increased susceptibility to illness — chronic stress is associated with cardiovascular disease, immune dysfunction, depression, and metabolic syndrome." },
    riskFactors: ["Chronic psychological stress (work, relationships, financial)", "Acute physical stressors (trauma, surgery, burns, infection)", "Chronic illness requiring ongoing adaptation", "Inadequate coping mechanisms or social support", "Sleep deprivation and disrupted circadian rhythms", "Substance use as maladaptive coping", "History of adverse childhood experiences (ACEs)", "Caregiver burden and compassion fatigue"],
    diagnostics: ["Cortisol levels (elevated in acute stress, may be dysregulated in chronic stress)", "Vital sign assessment reflecting sympathetic activation (elevated HR, BP, RR)", "Blood glucose monitoring (stress hyperglycemia from cortisol)", "Assessment of sleep patterns and quality", "Validated stress assessment tools (Perceived Stress Scale, Holmes-Rahe Scale)", "Immune markers may show leukocytosis in acute stress, lymphopenia in chronic stress"],
    management: ["Identify and address modifiable stressors when possible", "Teach evidence-based relaxation techniques (deep breathing, progressive muscle relaxation)", "Promote regular physical exercise (reduces cortisol and increases endorphins)", "Ensure adequate sleep hygiene (7-9 hours for adults)", "Cognitive behavioral strategies for stress management", "Referral to counseling or mental health services as appropriate", "Pharmacologic management only for stress-related disorders (anxiety, depression, insomnia)"],
    nursingActions: ["Assess patient's stress level and current coping mechanisms", "Identify which stage of GAS the patient may be experiencing", "Teach patients to recognize physical signs of stress (muscle tension, tachycardia, GI upset)", "Implement stress-reducing interventions: quiet environment, therapeutic communication", "Monitor for exhaustion stage: frequent illness, weight changes, depression, fatigue", "Educate on healthy vs. unhealthy coping strategies", "Advocate for adequate rest periods in hospitalized patients"],
    assessmentFindings: ["Alarm stage: tachycardia, hypertension, tachypnea, dilated pupils, diaphoresis, elevated glucose", "Resistance stage: vital signs normalizing but patient remains hypervigilant, increased cortisol, impaired sleep", "Exhaustion stage: fatigue, weight loss or gain, frequent infections, depression, cognitive impairment", "Muscle tension particularly in neck, shoulders, and jaw", "Gastrointestinal complaints: nausea, diarrhea, appetite changes", "Sleep disturbance: insomnia or hypersomnia"],
    signs: {
      left: ["Mild anxiety and restlessness", "Slight tachycardia during stressful events", "Difficulty sleeping on some nights", "Muscle tension in shoulders/neck", "Intact coping with social support"],
      right: ["Persistent tachycardia and hypertension", "Significant weight loss or gain", "Recurrent infections (immune suppression)", "Clinical depression or anxiety disorder", "Burnout with inability to perform daily functions"]
    },
    medications: [{
      name: "Melatonin",
      type: "Endogenous hormone supplement",
      action: "Binds MT1 and MT2 receptors in the suprachiasmatic nucleus to regulate circadian rhythm and promote sleep onset",
      sideEffects: "Daytime drowsiness, headache, vivid dreams, mild GI upset",
      contra: "Autoimmune disorders (theoretical immune stimulation); use cautiously with anticoagulants",
      pearl: "Take 0.5-3 mg 30-60 minutes before bedtime; lower doses (0.5-1 mg) are often more effective than high doses for circadian rhythm regulation"
    }],
    pearls: ["GAS has three stages: Alarm (fight-or-flight) → Resistance (adaptation) → Exhaustion (decompensation)", "Cortisol is the primary hormone of the resistance stage — it maintains blood glucose but suppresses immune function and wound healing", "Stress hyperglycemia in hospitalized patients is mediated by cortisol and catecholamines — monitor glucose even in non-diabetic stressed patients", "Chronic stress in the exhaustion phase increases risk of cardiovascular disease, autoimmune disorders, and depression", "Nursing burnout is a clinical example of GAS exhaustion — recognize it in yourself and colleagues"],
    quiz: [
      {
        question: "A patient in the ICU has elevated blood glucose, tachycardia, and leukocytosis but no history of diabetes or infection. Which concept best explains these findings?",
        options: ["Undiagnosed type 2 diabetes", "Alarm stage of General Adaptation Syndrome", "Medication side effect", "Cushing syndrome"],
        correct: 1,
        rationale: "The acute stress response (alarm stage of GAS) causes catecholamine and cortisol release, which elevates blood glucose (gluconeogenesis), increases heart rate (sympathetic activation), and causes leukocytosis (demargination of WBCs). This is 'stress hyperglycemia,' common in critically ill patients."
      },
      {
        question: "Which stage of General Adaptation Syndrome is characterized by immune suppression, frequent illness, and inability to cope with ongoing stressors?",
        options: ["Alarm stage", "Resistance stage", "Exhaustion stage", "Recovery stage"],
        correct: 2,
        rationale: "The exhaustion stage occurs when the body's adaptive resources are depleted from prolonged stress. Chronic cortisol elevation suppresses immune function (decreased lymphocytes, impaired inflammatory response), leading to increased infection susceptibility, fatigue, and psychological decompensation."
      }
    ]
  }
};
