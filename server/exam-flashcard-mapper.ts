import crypto from "crypto";
import { pool } from "./storage";

interface ExamQuestion {
  id: string;
  tier: string;
  stem: string;
  options: any[];
  correct_answer: any[];
  rationale: string;
  body_system: string | null;
  topic: string | null;
  subtopic: string | null;
  difficulty: number;
  question_type: string;
  clinical_pearl: string | null;
  exam_strategy: string | null;
  distractor_rationales: any;
  region_scope: string;
  career_type: string;
  tags: string[] | null;
}

interface InfographicMatch {
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  imageDescription: string;
  sortOrder: number;
}

interface LessonMatch {
  lessonTitle: string;
  lessonUrl: string;
  relevanceNote: string;
}

const IMAGE_KEYWORD_MAP: Record<string, { file: string; alt: string; caption: string; description: string }[]> = {
  "cardiac tamponade": [{ file: "cardiactamponade", alt: "Cardiac tamponade illustration", caption: "Cardiac Tamponade", description: "Beck's triad: hypotension, muffled heart sounds, JVD" }],
  "diabetes": [{ file: "diabetes", alt: "Diabetes management infographic", caption: "Diabetes Overview", description: "Key concepts in diabetes management and monitoring" }],
  "renal calculi": [{ file: "kidneystone_1773374939606", alt: "NurseNest kidney stone illustration", caption: "Renal Calculi", description: "Kidney stones: types, colicky flank pain, hydration, and lithotripsy" }],
  "kidney stone": [{ file: "kidneystone_1773374939606", alt: "NurseNest kidney stone illustration", caption: "Kidney Stones", description: "Renal calculi: types, colicky flank pain, hydration, and lithotripsy" }],
  "abg": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "arterial blood gas": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "acid-base": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "neonatal feeding": [{ file: "neonatalfeeding", alt: "Neonatal feeding illustration", caption: "Neonatal Feeding", description: "Key concepts in neonatal feeding assessment and management" }],
  "neonatal hypoglycemia": [{ file: "neonatalhypoglycemia", alt: "Neonatal hypoglycemia illustration", caption: "Neonatal Hypoglycemia", description: "Signs, risk factors, and management of neonatal hypoglycemia" }],
  "neonatal jaundice": [{ file: "neonataljaundice", alt: "Neonatal jaundice illustration", caption: "Neonatal Jaundice", description: "Pathophysiology and management of neonatal jaundice and hyperbilirubinemia" }],
  "hyperbilirubinemia": [{ file: "neonataljaundice", alt: "Neonatal jaundice illustration", caption: "Neonatal Jaundice", description: "Pathophysiology and management of hyperbilirubinemia" }],
  "neonatal sepsis": [{ file: "neonatalsepsis", alt: "Neonatal sepsis illustration", caption: "Neonatal Sepsis", description: "Recognition and management of neonatal sepsis" }],
  "neuroblastoma": [{ file: "neuroblastoma", alt: "Neuroblastoma illustration", caption: "Neuroblastoma", description: "Most common extracranial solid tumor in children, arising from neural crest cells" }],
  "infant of diabetic mother": [{ file: "newbornofdiabetic", alt: "Newborn of diabetic mother illustration", caption: "Infant of Diabetic Mother", description: "Complications and management of infants born to diabetic mothers" }],
  "newborn of diabetic mother": [{ file: "newbornofdiabetic", alt: "Newborn of diabetic mother illustration", caption: "Newborn of Diabetic Mother", description: "Complications and management of newborns of diabetic mothers" }],
  "osteogenesis imperfecta": [{ file: "osteogenesis", alt: "Osteogenesis imperfecta illustration", caption: "Osteogenesis Imperfecta", description: "Brittle bone disease: types, signs, and management" }],
  "ovarian hyperstimulation": [{ file: "ovarianhyperstimulation", alt: "Ovarian hyperstimulation illustration", caption: "Ovarian Hyperstimulation Syndrome", description: "OHSS pathophysiology, risk factors, and management" }],
  "ohss": [{ file: "ovarianhyperstimulation", alt: "Ovarian hyperstimulation illustration", caption: "OHSS", description: "Ovarian hyperstimulation syndrome management" }],
  "patent ductus arteriosus": [{ file: "patentductusarteriosus", alt: "Patent ductus arteriosus illustration", caption: "Patent Ductus Arteriosus", description: "PDA: machinery murmur, left-to-right shunt, indomethacin treatment" }],
  "pda": [{ file: "patentductusarteriosus", alt: "Patent ductus arteriosus illustration", caption: "PDA", description: "Patent ductus arteriosus: diagnosis and management" }],
  "pavlik harness": [{ file: "pavlik", alt: "Pavlik harness illustration", caption: "Pavlik Harness", description: "Pavlik harness for developmental hip dysplasia treatment in infants" }],
  "pediatric vital signs": [{ file: "pediatric_vitals_chart_fixed", alt: "Pediatric vital signs chart", caption: "Pediatric Vital Signs", description: "Age-specific vital sign ranges for pediatric patients" }],
  "pediatric dehydration": [{ file: "pediatricdehydration", alt: "Pediatric dehydration illustration", caption: "Pediatric Dehydration", description: "Assessment and management of dehydration in pediatric patients" }],
  "pinworm": [{ file: "pinworms", alt: "Pinworms illustration", caption: "Pinworms", description: "Enterobiasis: tape test, mebendazole treatment, hygiene measures" }],
  "pinworms": [{ file: "pinworms", alt: "Pinworms illustration", caption: "Pinworms", description: "Enterobiasis: tape test, mebendazole treatment, hygiene measures" }],
  "phenylketonuria": [{ file: "pku", alt: "PKU illustration", caption: "Phenylketonuria", description: "PKU: newborn screening, phenylalanine-restricted diet, management" }],
  "pku": [{ file: "pku", alt: "PKU illustration", caption: "PKU", description: "Phenylketonuria: screening, dietary management, and monitoring" }],
  "placental abruption": [{ file: "placentalabruption", alt: "Placental abruption illustration", caption: "Placental Abruption", description: "Premature placental separation: painful bleeding, rigid abdomen, emergency management" }],
  "placenta previa": [{ file: "placentaprevia", alt: "Placenta previa illustration", caption: "Placenta Previa", description: "Placenta covering cervical os: painless bright red bleeding, no vaginal exam" }],
  "postpartum hemorrhage": [{ file: "postpartumhemorrhage", alt: "Postpartum hemorrhage illustration", caption: "Postpartum Hemorrhage", description: "PPH: uterine atony, 4 T's, fundal massage, uterotonics" }],
  "pyloric stenosis": [{ file: "pyloricstenosis", alt: "Pyloric stenosis illustration", caption: "Pyloric Stenosis", description: "Non-bilious projectile vomiting, olive-shaped mass, pyloromyotomy" }],
  "congenital hypothyroidism": [{ file: "congenitalhypothyroidism", alt: "Congenital hypothyroidism illustration", caption: "Congenital Hypothyroidism", description: "Newborn screening, thyroid hormone deficiency, and early treatment to prevent intellectual disability" }],
  "hypothyroidism": [{ file: "congenitalhypothyroidism", alt: "Congenital hypothyroidism illustration", caption: "Congenital Hypothyroidism", description: "Newborn screening, thyroid hormone deficiency, and early treatment to prevent intellectual disability" }],
  "epstein-barr": [{ file: "EBV", alt: "Epstein-Barr virus illustration", caption: "Epstein-Barr Virus (EBV)", description: "Infectious mononucleosis: transmission, symptoms, and management" }],
  "mononucleosis": [{ file: "EBV", alt: "Epstein-Barr virus illustration", caption: "Epstein-Barr Virus (EBV)", description: "Infectious mononucleosis: transmission, symptoms, and management" }],
  "ebv": [{ file: "EBV", alt: "Epstein-Barr virus illustration", caption: "Epstein-Barr Virus (EBV)", description: "Infectious mononucleosis: transmission, symptoms, and management" }],
  "ectopic pregnancy": [{ file: "ectopicpregnancy", alt: "Ectopic pregnancy illustration", caption: "Ectopic Pregnancy", description: "Tubal implantation, risk factors, and emergency management" }],
  "ectopic": [{ file: "ectopicpregnancy", alt: "Ectopic pregnancy illustration", caption: "Ectopic Pregnancy", description: "Tubal implantation, risk factors, and emergency management" }],
  "encephalitis": [{ file: "encephalitis", alt: "Encephalitis illustration", caption: "Encephalitis", description: "Brain inflammation: viral causes, symptoms, and nursing management" }],
  "episiotomy": [{ file: "episiotomy", alt: "Episiotomy illustration", caption: "Episiotomy", description: "Perineal incision during delivery: types, care, and healing assessment" }],
  "fetal monitoring": [{ file: "fetalmonitoring", alt: "Fetal monitoring illustration", caption: "Fetal Monitoring", description: "Electronic fetal heart rate monitoring: categories, decelerations, and interventions" }],
  "fetal heart rate": [{ file: "fetalmonitoring", alt: "Fetal monitoring illustration", caption: "Fetal Monitoring", description: "Electronic fetal heart rate monitoring: categories, decelerations, and interventions" }],
  "fetal oxygenation": [{ file: "fetaloxygenation", alt: "Fetal oxygenation illustration", caption: "Fetal Oxygenation", description: "Uteroplacental gas exchange and fetal oxygen supply" }],
  "general adaptation syndrome": [{ file: "GAS", alt: "General adaptation syndrome illustration", caption: "General Adaptation Syndrome (GAS)", description: "Selye's stress response: alarm, resistance, and exhaustion stages" }],
  "gas": [{ file: "GAS", alt: "General adaptation syndrome illustration", caption: "General Adaptation Syndrome (GAS)", description: "Selye's stress response: alarm, resistance, and exhaustion stages" }],
  "gestational diabetes": [{ file: "gestationaldiabetes", alt: "Gestational diabetes illustration", caption: "Gestational Diabetes", description: "Glucose intolerance in pregnancy: screening, management, and fetal effects" }],
  "hellp syndrome": [{ file: "HELLP", alt: "HELLP syndrome illustration", caption: "HELLP Syndrome", description: "Hemolysis, Elevated Liver enzymes, Low Platelets: severe preeclampsia variant" }],
  "hellp": [{ file: "HELLP", alt: "HELLP syndrome illustration", caption: "HELLP Syndrome", description: "Hemolysis, Elevated Liver enzymes, Low Platelets: severe preeclampsia variant" }],
  "hepatitis b": [{ file: "hepatitisb", alt: "Hepatitis B illustration", caption: "Hepatitis B", description: "Blood-borne viral hepatitis: transmission, serology, vaccination, and chronic management" }],
  "hbv": [{ file: "hepatitisb", alt: "Hepatitis B illustration", caption: "Hepatitis B", description: "Blood-borne viral hepatitis: transmission, serology, vaccination, and chronic management" }],
  "hepatitis c": [{ file: "hepatitisc", alt: "Hepatitis C illustration", caption: "Hepatitis C", description: "Blood-borne viral hepatitis: screening, direct-acting antivirals, and cure" }],
  "hcv": [{ file: "hepatitisc", alt: "Hepatitis C illustration", caption: "Hepatitis C", description: "Blood-borne viral hepatitis: screening, direct-acting antivirals, and cure" }],
  "hand foot mouth": [{ file: "HFM", alt: "Hand foot and mouth disease illustration", caption: "Hand, Foot, and Mouth Disease", description: "Coxsackievirus infection: vesicular rash, fever, and supportive care" }],
  "hand-foot-mouth": [{ file: "HFM", alt: "Hand foot and mouth disease illustration", caption: "Hand, Foot, and Mouth Disease", description: "Coxsackievirus infection: vesicular rash, fever, and supportive care" }],
  "coxsackievirus": [{ file: "HFM", alt: "Hand foot and mouth disease illustration", caption: "Hand, Foot, and Mouth Disease", description: "Coxsackievirus infection: vesicular rash, fever, and supportive care" }],
  "histoplasmosis": [{ file: "histoplasmosis", alt: "Histoplasmosis illustration", caption: "Histoplasmosis", description: "Fungal respiratory infection from Histoplasma capsulatum in bird/bat droppings" }],
  "hyperemesis gravidarum": [{ file: "hyperemesisgravidarum", alt: "Hyperemesis gravidarum illustration", caption: "Hyperemesis Gravidarum", description: "Severe pregnancy nausea: dehydration, electrolyte imbalance, and thiamine deficiency risk" }],
  "hyperemesis": [{ file: "hyperemesisgravidarum", alt: "Hyperemesis gravidarum illustration", caption: "Hyperemesis Gravidarum", description: "Severe pregnancy nausea: dehydration, electrolyte imbalance, and thiamine deficiency risk" }],
  "impetigo": [{ file: "impetigo", alt: "Impetigo illustration", caption: "Impetigo", description: "Superficial bacterial skin infection with honey-colored crusted lesions" }],
  "infant reflexes": [{ file: "infantreflexes", alt: "Infant reflexes illustration", caption: "Infant Reflexes", description: "Primitive reflexes: Moro, rooting, sucking, Babinski, grasp, and tonic neck" }],
  "newborn reflexes": [{ file: "infantreflexes", alt: "Infant reflexes illustration", caption: "Infant Reflexes", description: "Primitive reflexes: Moro, rooting, sucking, Babinski, grasp, and tonic neck" }],
  "intestinal malrotation": [{ file: "intestinalmalrotation_1773374939606", alt: "NurseNest intestinal malrotation illustration", caption: "Intestinal Malrotation", description: "Congenital abnormal bowel rotation with volvulus risk" }],
  "malrotation": [{ file: "intestinalmalrotation_1773374939606", alt: "NurseNest intestinal malrotation illustration", caption: "Intestinal Malrotation", description: "Congenital abnormal bowel rotation with volvulus risk" }],
  "ckd": [{ file: "CKD.png", alt: "Chronic kidney disease illustration", caption: "Chronic Kidney Disease (CKD)", description: "CKD stages, nephron damage, uremia, and fluid retention" }],
  "chronic kidney disease": [{ file: "CKD.png", alt: "Chronic kidney disease illustration", caption: "Chronic Kidney Disease (CKD)", description: "CKD stages, nephron damage, uremia, and fluid retention" }],
  "clubfoot": [{ file: "clubfoot.png", alt: "Clubfoot illustration", caption: "Clubfoot (Talipes Equinovarus)", description: "Congenital foot deformity: inversion, forefoot adduction, and Ponseti casting method" }],
  "talipes equinovarus": [{ file: "clubfoot.png", alt: "Clubfoot illustration", caption: "Clubfoot (Talipes Equinovarus)", description: "Congenital foot deformity: inversion, forefoot adduction, and Ponseti casting method" }],
  "cmv": [{ file: "CMV.png", alt: "Cytomegalovirus illustration", caption: "Cytomegalovirus (CMV)", description: "Congenital CMV: maternal transmission, microcephaly, hearing loss, and antiviral management" }],
  "cytomegalovirus": [{ file: "CMV.png", alt: "Cytomegalovirus illustration", caption: "Cytomegalovirus (CMV)", description: "Congenital CMV: maternal transmission, microcephaly, hearing loss, and antiviral management" }],
  "carbon monoxide": [{ file: "co.png", alt: "Carbon monoxide poisoning illustration", caption: "Carbon Monoxide Poisoning", description: "CO binds hemoglobin, causing hypoxia: headache, dizziness, cherry-red skin, high-flow oxygen treatment" }],
  "co poisoning": [{ file: "co.png", alt: "Carbon monoxide poisoning illustration", caption: "Carbon Monoxide Poisoning", description: "CO binds hemoglobin, causing hypoxia: headache, dizziness, cherry-red skin, high-flow oxygen treatment" }],
  "compartment syndrome": [{ file: "compartmentsyndrome.png", alt: "Compartment syndrome illustration", caption: "Compartment Syndrome", description: "Increased pressure within muscle compartment: 5 P's, fasciotomy, and neurovascular assessment" }],
  "concussion": [{ file: "concussion.png", alt: "Concussion illustration", caption: "Concussion", description: "Mild traumatic brain injury: headache, confusion, memory disturbance, and return-to-activity protocol" }],
  "constipation": [{ file: "constipation.png", alt: "Constipation illustration", caption: "Constipation", description: "Slow colonic transit, hard stool formation, and management with fiber, fluids, and activity" }],
  "contracture": [{ file: "contracture.png", alt: "Contracture illustration", caption: "Contracture", description: "Joint contracture: muscle fibrosis, limited range of motion, splinting, and stretching prevention" }],
  "covid": [{ file: "covid19.png", alt: "COVID-19 illustration", caption: "COVID-19", description: "SARS-CoV-2 infection: respiratory symptoms, transmission prevention, and vaccination" }],
  "covid-19": [{ file: "covid19.png", alt: "COVID-19 illustration", caption: "COVID-19", description: "SARS-CoV-2 infection: respiratory symptoms, transmission prevention, and vaccination" }],
  "sars-cov-2": [{ file: "covid19.png", alt: "COVID-19 illustration", caption: "COVID-19", description: "SARS-CoV-2 infection: respiratory symptoms, transmission prevention, and vaccination" }],
  "cranial nerve": [{ file: "cranialnerves.png", alt: "Cranial nerves illustration", caption: "Cranial Nerves", description: "Twelve cranial nerves: pathways, functions, and clinical assessment" }],
  "cranial nerves": [{ file: "cranialnerves.png", alt: "Cranial nerves illustration", caption: "Cranial Nerves", description: "Twelve cranial nerves: pathways, functions, and clinical assessment" }],
  "crohn": [{ file: "crohns.png", alt: "Crohn's disease illustration", caption: "Crohn's Disease", description: "Inflammatory bowel disease: skip lesions, transmural inflammation, fistulas, and strictures" }],
  "crohns disease": [{ file: "crohns.png", alt: "Crohn's disease illustration", caption: "Crohn's Disease", description: "Inflammatory bowel disease: skip lesions, transmural inflammation, fistulas, and strictures" }],
  "crohn's disease": [{ file: "crohns.png", alt: "Crohn's disease illustration", caption: "Crohn's Disease", description: "Inflammatory bowel disease: skip lesions, transmural inflammation, fistulas, and strictures" }],
  "cushing syndrome": [{ file: "cushing.png", alt: "Cushing syndrome illustration", caption: "Cushing Syndrome", description: "Cortisol excess: moon face, buffalo hump, central obesity, purple striae, and thin extremities" }],
  "cushing's syndrome": [{ file: "cushing.png", alt: "Cushing syndrome illustration", caption: "Cushing Syndrome", description: "Cortisol excess: moon face, buffalo hump, central obesity, purple striae, and thin extremities" }],
  "cushings": [{ file: "cushing.png", alt: "Cushing syndrome illustration", caption: "Cushing Syndrome", description: "Cortisol excess: moon face, buffalo hump, central obesity, purple striae, and thin extremities" }],
  "delirium": [{ file: "delirium.png", alt: "Delirium illustration", caption: "Delirium", description: "Acute brain dysfunction: sudden onset, fluctuating consciousness, and reversible causes" }],
  "dementia": [{ file: "dementia.png", alt: "Dementia illustration", caption: "Dementia", description: "Progressive cognitive decline: memory loss, disorientation, and supportive care strategies" }],
  "dengue": [{ file: "dengue.png", alt: "Dengue fever illustration", caption: "Dengue Fever", description: "Mosquito-borne viral illness: high fever, hemorrhagic complications, and supportive management" }],
  "dengue fever": [{ file: "dengue.png", alt: "Dengue fever illustration", caption: "Dengue Fever", description: "Mosquito-borne viral illness: high fever, hemorrhagic complications, and supportive management" }],
  "diabetes insipidus": [{ file: "diabetesinsipidus.png", alt: "Diabetes insipidus illustration", caption: "Diabetes Insipidus", description: "ADH deficiency or resistance: massive dilute urine output, dehydration, and desmopressin treatment" }],
  "diabetic nephropathy": [{ file: "diabeticnephropathy.png", alt: "Diabetic nephropathy illustration", caption: "Diabetic Nephropathy", description: "Diabetes-related kidney damage: microalbuminuria, glomerular changes, and ACE inhibitor protection" }],
  "diarrhea": [{ file: "diarrhea.png", alt: "Diarrhea illustration", caption: "Diarrhea", description: "Increased stool frequency and fluidity: causes, dehydration risk, and fluid replacement" }],
  "multiple sclerosis": [{ file: "MS", alt: "Multiple sclerosis illustration", caption: "Multiple Sclerosis", description: "Autoimmune demyelinating disease: relapsing-remitting, progressive forms, and disease-modifying therapies" }],
  "ms ": [{ file: "MS", alt: "Multiple sclerosis illustration", caption: "Multiple Sclerosis", description: "Autoimmune demyelinating disease affecting central nervous system myelin" }],
  "mumps": [{ file: "mumps", alt: "Mumps illustration", caption: "Mumps", description: "Viral parotitis: parotid gland swelling, fever, and orchitis risk" }],
  "parotitis": [{ file: "mumps", alt: "Mumps illustration", caption: "Mumps", description: "Viral parotitis: parotid gland swelling, complications, and MMR vaccination" }],
  "myasthenia gravis": [{ file: "myastheniagravis", alt: "Myasthenia gravis illustration", caption: "Myasthenia Gravis", description: "Autoimmune neuromuscular junction disorder: ptosis, diplopia, and cholinergic crisis" }],
  "narcolepsy": [{ file: "narcolepsy", alt: "Narcolepsy illustration", caption: "Narcolepsy", description: "Sleep disorder with excessive daytime sleepiness, cataplexy, and sleep attacks" }],
  "necrotizing enterocolitis": [{ file: "nec", alt: "Necrotizing enterocolitis illustration", caption: "Necrotizing Enterocolitis (NEC)", description: "Neonatal bowel necrosis: abdominal distension, bloody stools, and pneumatosis intestinalis" }],
  "nec": [{ file: "nec", alt: "Necrotizing enterocolitis illustration", caption: "NEC", description: "Necrotizing enterocolitis: most common GI emergency in neonates" }],
  "neonatal reflexes": [{ file: "neonatalreflex", alt: "Neonatal reflexes illustration", caption: "Neonatal Reflexes", description: "Primitive reflexes assessment: Moro, rooting, sucking, Babinski, and tonic neck" }],
  "ng tube": [{ file: "ngtube", alt: "NG tube illustration", caption: "Nasogastric Tube", description: "NG tube insertion, placement verification, and management" }],
  "nasogastric": [{ file: "ngtube", alt: "NG tube illustration", caption: "Nasogastric Tube", description: "Nasogastric tube: insertion technique, placement confirmation, and care" }],
  "obstructive uropathy": [{ file: "obstructiveuropathy", alt: "Obstructive uropathy illustration", caption: "Obstructive Uropathy", description: "Urinary tract obstruction: hydronephrosis, causes, and management" }],
  "urinary obstruction": [{ file: "obstructiveuropathy", alt: "Obstructive uropathy illustration", caption: "Obstructive Uropathy", description: "Urinary tract obstruction: hydronephrosis, causes, and management" }],
  "opioid overdose": [{ file: "opioid", alt: "Opioid overdose illustration", caption: "Opioid Overdose", description: "Opioid toxicity: respiratory depression, pinpoint pupils, and naloxone reversal" }],
  "naloxone": [{ file: "opioid", alt: "Opioid overdose illustration", caption: "Naloxone Administration", description: "Opioid antagonist for overdose reversal: dosing, monitoring, and re-sedation risk" }],
  "narcan": [{ file: "opioid", alt: "Opioid overdose illustration", caption: "Narcan (Naloxone)", description: "Opioid antagonist for overdose reversal" }],
  "osteoporosis": [{ file: "osteoporosis", alt: "Osteoporosis illustration", caption: "Osteoporosis", description: "Bone density loss: DEXA screening, bisphosphonates, and fall prevention" }],
  "otitis media": [{ file: "otitismedia", alt: "Otitis media illustration", caption: "Otitis Media", description: "Middle ear infection: ear pain, bulging tympanic membrane, and antibiotic therapy" }],
  "ear infection": [{ file: "otitismedia", alt: "Otitis media illustration", caption: "Otitis Media", description: "Acute otitis media: symptoms, treatment, and tympanostomy tubes" }],
  "pancreatic pseudocyst": [{ file: "pancreaticpseudocyst", alt: "Pancreatic pseudocyst illustration", caption: "Pancreatic Pseudocyst", description: "Encapsulated fluid collection after pancreatitis: monitoring and drainage" }],
  "pancreatitis": [{ file: "pancreatitis", alt: "Pancreatitis illustration", caption: "Pancreatitis", description: "Pancreatic inflammation: Cullen's sign, Grey Turner's sign, and supportive care" }],
  "papilledema": [{ file: "papilledema", alt: "Papilledema illustration", caption: "Papilledema", description: "Optic disc swelling from increased intracranial pressure" }],
  "hypothermia": [{ file: "hypothermja_1773374939606", alt: "NurseNest hypothermia illustration", caption: "Hypothermia", description: "Core temperature < 35°C: stages, shivering, and passive/active rewarming" }],
  "hypothyroidism": [{ file: "hypothyroidism_1773374939606", alt: "NurseNest hypothyroidism illustration", caption: "Hypothyroidism", description: "Decreased thyroid hormone: weight gain, fatigue, cold intolerance, elevated TSH" }],
  "myxedema": [{ file: "hypothyroidism_1773374939606", alt: "NurseNest hypothyroidism illustration", caption: "Myxedema Coma", description: "Severe hypothyroidism emergency: hypothermia, bradycardia, altered consciousness" }],
  "ibs": [{ file: "IBS_1773374939606", alt: "NurseNest IBS illustration", caption: "Irritable Bowel Syndrome", description: "Altered bowel motility, visceral hypersensitivity, and dietary management" }],
  "irritable bowel syndrome": [{ file: "IBS_1773374939606", alt: "NurseNest IBS illustration", caption: "Irritable Bowel Syndrome", description: "Altered bowel motility, visceral hypersensitivity, and dietary management" }],
  "irritable bowel": [{ file: "IBS_1773374939606", alt: "NurseNest IBS illustration", caption: "IBS", description: "Irritable bowel syndrome: Rome criteria, FODMAP diet, stress management" }],
  "intracranial pressure": [{ file: "ICP_1773374939606", alt: "NurseNest ICP illustration", caption: "Increased Intracranial Pressure", description: "Cushing triad: hypertension, bradycardia, irregular respirations" }],
  "icp": [{ file: "ICP_1773374939606", alt: "NurseNest ICP illustration", caption: "ICP", description: "Increased intracranial pressure: monitoring, interventions, and herniation prevention" }],
  "iicp": [{ file: "IICP_1773374939606", alt: "NurseNest IICP illustration", caption: "Increased ICP", description: "Increased intracranial pressure signs, cerebral perfusion, and management" }],
  "iron deficiency anemia": [{ file: "IDA_1773374939606", alt: "NurseNest iron deficiency anemia illustration", caption: "Iron Deficiency Anemia", description: "Microcytic hypochromic anemia: low ferritin, iron supplementation, dietary sources" }],
  "iron deficiency": [{ file: "IDA_1773374939606", alt: "NurseNest iron deficiency anemia illustration", caption: "Iron Deficiency Anemia", description: "Microcytic hypochromic anemia: fatigue, pallor, spoon nails (koilonychia)" }],
  "intussusception": [{ file: "intussusception_1773374939606", alt: "NurseNest intussusception illustration", caption: "Intussusception", description: "Telescoping bowel: currant jelly stool, sausage-shaped mass, air enema reduction" }],
  "ischemic colitis": [{ file: "ischemiccolitis_1773374939606", alt: "NurseNest ischemic colitis illustration", caption: "Ischemic Colitis", description: "Reduced blood flow to colon: abdominal pain, bloody diarrhea, watershed areas" }],
  "nephrolithiasis": [{ file: "kidneystone_1773374939606", alt: "NurseNest kidney stone illustration", caption: "Nephrolithiasis", description: "Kidney stones: calcium oxalate, uric acid, struvite types and management" }],
  "klinefelter": [{ file: "klinefelter_1773374939606", alt: "NurseNest Klinefelter syndrome illustration", caption: "Klinefelter Syndrome", description: "47,XXY: tall stature, gynecomastia, small testes, infertility" }],
  "klinefelter syndrome": [{ file: "klinefelter_1773374939606", alt: "NurseNest Klinefelter syndrome illustration", caption: "Klinefelter Syndrome", description: "47,XXY karyotype: hypogonadism, learning difficulties, testosterone replacement" }],
  "korsakoff": [{ file: "Korsakoff_1773374939606", alt: "NurseNest Korsakoff syndrome illustration", caption: "Korsakoff Syndrome", description: "Thiamine deficiency: confabulation, anterograde amnesia, chronic memory impairment" }],
  "korsakoff syndrome": [{ file: "Korsakoff_1773374939606", alt: "NurseNest Korsakoff syndrome illustration", caption: "Korsakoff Syndrome", description: "Wernicke-Korsakoff progression: thiamine replacement, memory support, safety" }],
  "wernicke-korsakoff": [{ file: "Korsakoff_1773374939606", alt: "NurseNest Korsakoff syndrome illustration", caption: "Wernicke-Korsakoff Syndrome", description: "Thiamine deficiency spectrum: ataxia, ophthalmoplegia, confusion to chronic amnesia" }],
  "labyrinthitis": [{ file: "labyrinthitis_1773374939606", alt: "NurseNest labyrinthitis illustration", caption: "Labyrinthitis", description: "Inner ear inflammation: vertigo WITH hearing loss, distinguishing from vestibular neuritis" }],
  "infertility": [{ file: "infertility_1773374939606", alt: "NurseNest infertility illustration", caption: "Infertility", description: "Causes, evaluation, and assisted reproductive technology options" }],
  "influenza": [{ file: "influenza_1773374939606", alt: "NurseNest influenza illustration", caption: "Influenza", description: "Respiratory viral infection: oseltamivir, vaccination, and complications" }],
  "flu": [{ file: "influenza_1773374939606", alt: "NurseNest influenza illustration", caption: "Influenza", description: "Flu: rapid onset fever, myalgia, cough, and antiviral management" }],
  "intimate partner violence": [{ file: "intimatepartnerviolence_1773374939606", alt: "NurseNest intimate partner violence illustration", caption: "Intimate Partner Violence", description: "IPV screening, safety assessment, mandatory reporting, and intervention" }],
  "ipv": [{ file: "intimatepartnerviolence_1773374939606", alt: "NurseNest IPV illustration", caption: "IPV", description: "Intimate partner violence: screening tools, safety planning, documentation" }],
  "domestic violence": [{ file: "intimatepartnerviolence_1773374939606", alt: "NurseNest domestic violence illustration", caption: "Domestic Violence", description: "Recognition, screening, safety planning, and mandatory reporting protocols" }],
  "feeding tube irrigation": [{ file: "irrigation_1773374939606", alt: "NurseNest feeding tube irrigation illustration", caption: "Feeding Tube Irrigation", description: "Tube patency maintenance: flushing technique, water amount, and frequency" }],
  "tube irrigation": [{ file: "irrigation_1773374939606", alt: "NurseNest tube irrigation illustration", caption: "Tube Irrigation", description: "Enteral feeding tube irrigation: proper technique and clog prevention" }],
};


const LESSON_SYSTEM_MAP: Record<string, string[]> = {
  "Cardiovascular": ["cardiovascular", "cardiac", "heart", "hypertension", "angina", "mi", "arrhythmia", "heart-failure", "dvt", "aaa"],
  "Respiratory": ["respiratory", "copd", "asthma", "pneumonia", "chest-tube", "ventilator", "oxygen-therapy", "pulmonary"],
  "Neurological": ["neurological", "stroke", "seizure", "icp", "spinal-cord", "meningitis", "cranial-nerve", "gcs"],
  "GI": ["gastrointestinal", "gi", "bowel", "liver", "hepatitis", "cholecystitis", "pancreatitis", "peptic-ulcer"],
  "Renal": ["renal", "kidney", "ckd", "dialysis", "uti", "nephrotic", "electrolyte"],
  "Endocrine": ["endocrine", "diabetes", "thyroid", "adrenal", "cushing", "addison", "pituitary"],
  "Hematology": ["hematology", "anemia", "sickle-cell", "leukemia", "transfusion", "coagulation", "dic"],
  "Pediatrics": ["pediatrics", "peds", "child", "kawasaki", "pyloric", "intussusception", "cystic-fibrosis"],
  "Maternal": ["maternity", "maternal", "labor", "delivery", "preeclampsia", "placenta", "postpartum", "obstetric"],
  "Neonatal": ["neonatal", "newborn", "neonate", "apgar", "jaundice", "nec", "surfactant"],
  "Oncology": ["oncology", "cancer", "chemo", "neutropenic", "tumor-lysis"],
  "Pharmacology": ["pharmacology", "medication", "drug", "antidote", "dosage"],
  "Mental Health": ["mental-health", "psychiatric", "anxiety", "depression", "bipolar", "schizophrenia", "lithium", "antipsychotic"],
  "Infection": ["infection-control", "isolation", "precautions", "mrsa", "tb", "c-diff", "sepsis"],
  "Procedures": ["procedures", "foley", "chest-tube", "tracheostomy", "ventilator", "iv", "blood-transfusion"],
  "Fundamentals": ["fundamentals", "nursing-process", "vital-signs", "documentation", "assessment", "prioritization"],
  "Safety & Ethics": ["safety", "ethics", "hipaa", "restraint", "informed-consent", "delegation"],
  "Skin": ["skin", "wound", "burns", "pressure-ulcer", "dermatology"],
  "Musculoskeletal": ["musculoskeletal", "orthopedic", "fracture", "traction", "osteoporosis", "arthritis"],
};

function generateContentHash(stem: string, tier: string): string {
  return crypto.createHash("sha256").update(`cat-exam:${tier}:${stem}`).digest("hex").slice(0, 32);
}

function matchImages(question: ExamQuestion): InfographicMatch[] {
  const matches: InfographicMatch[] = [];
  const searchText = `${question.stem} ${question.rationale || ""} ${question.body_system || ""} ${question.topic || ""}`.toLowerCase();

  for (const [keyword, images] of Object.entries(IMAGE_KEYWORD_MAP)) {
    if (searchText.includes(keyword)) {
      for (const img of images) {
        if (!matches.find(m => m.imageUrl.includes(img.file))) {
          matches.push({
            imageUrl: `/attached_assets/${img.file}`,
            imageAlt: img.alt,
            imageCaption: img.caption,
            imageDescription: img.description,
            sortOrder: matches.length,
          });
        }
      }
    }
  }

  return matches.slice(0, 3);
}

function matchLessons(question: ExamQuestion): LessonMatch[] {
  const matches: LessonMatch[] = [];
  const searchText = `${question.stem} ${question.rationale || ""} ${question.body_system || ""} ${question.topic || ""} ${question.subtopic || ""}`.toLowerCase();
  const bodySystem = question.body_system || "";

  const systemKeywords = LESSON_SYSTEM_MAP[bodySystem] || [];
  if (systemKeywords.length > 0) {
    const mainKeyword = systemKeywords[0];
    matches.push({
      lessonTitle: `${bodySystem} Lessons`,
      lessonUrl: `/lessons?category=${mainKeyword}`,
      relevanceNote: `Core ${bodySystem.toLowerCase()} content related to this question`,
    });
  }

  const topicKeywords: Record<string, { title: string; url: string; note: string }> = {
    "heart failure": { title: "Heart Failure Management", url: "/lessons/heart-failure", note: "Directly relevant to heart failure assessment and interventions" },
    "diabetes": { title: "Diabetes Management", url: "/lessons/diabetes-management", note: "Covers diabetes assessment, insulin, and complications" },
    "shock": { title: "Types of Shock", url: "/lessons/shock-management", note: "Comprehensive shock recognition and management" },
    "electrolyte": { title: "Electrolyte Imbalances", url: "/lessons/electrolyte-imbalances", note: "Electrolyte normal ranges, symptoms, and nursing interventions" },
    "medication": { title: "Pharmacology Review", url: "/lessons?category=pharmacology", note: "Drug classes, mechanisms, and nursing considerations" },
    "preeclampsia": { title: "Preeclampsia & Eclampsia", url: "/lessons/preeclampsia", note: "Hypertensive disorders of pregnancy" },
    "seizure": { title: "Seizure Management", url: "/lessons/seizure-disorders", note: "Seizure types, medications, and nursing care" },
    "stroke": { title: "Stroke Assessment", url: "/lessons/stroke", note: "Stroke recognition, tPA criteria, and nursing management" },
    "infection control": { title: "Infection Control", url: "/lessons?category=infection-control", note: "Isolation precautions and infection prevention" },
    "wound": { title: "Wound Care", url: "/lessons/wound-care", note: "Wound assessment, staging, and management" },
  };

  for (const [keyword, lesson] of Object.entries(topicKeywords)) {
    if (searchText.includes(keyword) && !matches.find(m => m.lessonUrl === lesson.url)) {
      matches.push({
        lessonTitle: lesson.title,
        lessonUrl: lesson.url,
        relevanceNote: lesson.note,
      });
    }
  }

  return matches.slice(0, 3);
}

function buildFront(q: ExamQuestion): string {
  return q.stem;
}

function buildBack(q: ExamQuestion): string {
  const parts: string[] = [];
  const correctIdx = Array.isArray(q.correct_answer) ? q.correct_answer[0] : q.correct_answer;
  const opts = Array.isArray(q.options) ? q.options : [];
  
  if (opts.length > 0 && correctIdx !== undefined && correctIdx !== null) {
    const correctOption = typeof opts[correctIdx] === "object" ? (opts[correctIdx] as any).text || opts[correctIdx] : opts[correctIdx];
    parts.push(`✅ Correct Answer: ${correctOption}`);
  }
  
  if (q.rationale) {
    parts.push(`\n📋 Rationale: ${q.rationale}`);
  }
  
  if (q.clinical_pearl) {
    parts.push(`\n💎 Clinical Pearl: ${q.clinical_pearl}`);
  }
  
  if (q.exam_strategy) {
    parts.push(`\n🎯 Exam Strategy: ${q.exam_strategy}`);
  }
  
  return parts.join("\n");
}

export async function mapExamQuestionsToFlashcards(): Promise<{
  total: number;
  created: number;
  updated: number;
  skipped: number;
  perTier: Record<string, number>;
  missingData: number;
}> {
  const result = {
    total: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    perTier: {} as Record<string, number>,
    missingData: 0,
  };

  const { rows: questions } = await pool.query(
    `SELECT id, tier, stem, options, correct_answer, rationale, body_system, topic, subtopic, 
            difficulty, question_type, clinical_pearl, exam_strategy, distractor_rationales,
            region_scope, career_type, tags
     FROM exam_questions 
     WHERE status = 'published' AND career_type = 'nursing'
     ORDER BY tier, created_at`
  );

  result.total = questions.length;

  for (const q of questions) {
    const question = q as ExamQuestion;
    const contentHash = generateContentHash(question.stem, question.tier);
    
    if (!question.stem || !question.options) {
      result.missingData++;
      continue;
    }

    const images = matchImages(question);
    const lessons = matchLessons(question);
    const front = buildFront(question);
    const back = buildBack(question);

    const correctIdx = Array.isArray(question.correct_answer) ? question.correct_answer[0] : question.correct_answer;
    const opts = Array.isArray(question.options) ? question.options : [];
    let rationaleCorrect = question.rationale || "";
    
    let distractorRationales = question.distractor_rationales;
    if (!distractorRationales && opts.length > 0) {
      const drs: Record<string, string> = {};
      opts.forEach((opt: any, idx: number) => {
        if (idx !== correctIdx) {
          const optText = typeof opt === "object" ? (opt as any).text || String(opt) : String(opt);
          drs[optText] = "This option is incorrect for this clinical scenario.";
        }
      });
      distractorRationales = drs;
    }

    const { rows: existing } = await pool.query(
      `SELECT id FROM flashcard_bank WHERE content_hash = $1`,
      [contentHash]
    );

    if (existing.length > 0) {
      await pool.query(
        `UPDATE flashcard_bank SET
          front = $1, back = $2, options = $3, correct_answer = $4,
          rationale_correct = $5, distractor_rationales = $6,
          clinical_takeaway = $7, exam_pearl = $8,
          rationale_media = $9, lesson_links = $10,
          difficulty = $11, body_system = $12, topic = $13, subtopic = $14,
          region_scope = $15, flashcard_enabled = true, source_type = 'cat_exam',
          source_question_id = $16, question_type = $17, category = $18,
          status = 'published', updated_at = NOW()
        WHERE id = $19`,
        [
          front, back, JSON.stringify(question.options), JSON.stringify(question.correct_answer),
          rationaleCorrect, JSON.stringify(distractorRationales),
          question.clinical_pearl || null, question.exam_strategy || null,
          JSON.stringify(images), JSON.stringify(lessons),
          question.difficulty, question.body_system, question.topic, question.subtopic,
          question.region_scope || "BOTH", question.id, question.question_type || "mcq",
          question.body_system || "General",
          existing[0].id
        ]
      );
      result.updated++;
    } else {
      await pool.query(
        `INSERT INTO flashcard_bank (
          tier, front, back, content_hash, status, source_type, source_question_id,
          question_type, options, correct_answer, rationale_correct, distractor_rationales,
          clinical_takeaway, exam_pearl, rationale_media, lesson_links,
          difficulty, body_system, topic, subtopic, region_scope, flashcard_enabled,
          category, career_type
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
        [
          question.tier, front, back, contentHash, "published", "cat_exam", question.id,
          question.question_type || "mcq", JSON.stringify(question.options), JSON.stringify(question.correct_answer),
          rationaleCorrect, JSON.stringify(distractorRationales),
          question.clinical_pearl || null, question.exam_strategy || null,
          JSON.stringify(images), JSON.stringify(lessons),
          question.difficulty, question.body_system, question.topic, question.subtopic,
          question.region_scope || "BOTH", true,
          question.body_system || "General", question.career_type || "nursing"
        ]
      );
      result.created++;
    }

    result.perTier[question.tier] = (result.perTier[question.tier] || 0) + 1;
  }

  return result;
}

export async function getExamFlashcardStats(): Promise<{
  totalExamFlashcards: number;
  perTier: Record<string, number>;
  withImages: number;
  withLessons: number;
  missingImages: number;
  missingLessons: number;
}> {
  const { rows: tierCounts } = await pool.query(
    `SELECT tier, COUNT(*)::int as count FROM flashcard_bank 
     WHERE source_type = 'cat_exam' AND flashcard_enabled = true 
     GROUP BY tier`
  );

  const { rows: imageCounts } = await pool.query(
    `SELECT 
      COUNT(CASE WHEN rationale_media::text != '[]' THEN 1 END)::int as with_images,
      COUNT(CASE WHEN rationale_media::text = '[]' OR rationale_media IS NULL THEN 1 END)::int as missing_images,
      COUNT(CASE WHEN lesson_links::text != '[]' THEN 1 END)::int as with_lessons,
      COUNT(CASE WHEN lesson_links::text = '[]' OR lesson_links IS NULL THEN 1 END)::int as missing_lessons
     FROM flashcard_bank WHERE source_type = 'cat_exam' AND flashcard_enabled = true`
  );

  const perTier: Record<string, number> = {};
  let total = 0;
  for (const r of tierCounts) {
    perTier[r.tier] = r.count;
    total += r.count;
  }

  return {
    totalExamFlashcards: total,
    perTier,
    withImages: imageCounts[0]?.with_images || 0,
    withLessons: imageCounts[0]?.with_lessons || 0,
    missingImages: imageCounts[0]?.missing_images || 0,
    missingLessons: imageCounts[0]?.missing_lessons || 0,
  };
}
