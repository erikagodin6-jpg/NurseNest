import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Bookmark, 
  BookmarkCheck,
  LayoutGrid,
  ClipboardCheck,
  Settings2,
  BookOpen,
  ArrowLeft,
  Trophy,
  History,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import heartImg from "@/assets/images/heart-flashcard.png";
import pedsImg from "@/assets/images/peds-flashcard.png";
import oncologyImg from "@/assets/images/oncology-flashcard.png";

type CardType = "question" | "term";

type Flashcard = {
  id: string;
  type: CardType;
  question: string;
  options?: string[]; // Only for questions
  correctIndex?: number; // Only for questions
  answer: string; // For terms (definition) or rationale (for questions)
  category: string;
  image?: string;
};

const allCards: Flashcard[] = [
  // Questions (from previous turns)
  { 
    id: "q1",
    type: "question",
    question: "What is the priority assessment for a client post-op following an Abdominal Aortic Aneurysm (AAA) repair?", 
    options: [
      "Assessing for bowel sounds in all four quadrants",
      "Monitoring distal peripheral pulses and hourly urine output",
      "Encouraging early ambulation within 2 hours",
      "Measuring abdominal girth once every 24 hours"
    ],
    correctIndex: 1,
    answer: "Priority is ensuring the graft is patent and renal perfusion is maintained. Urine output must be >30mL/hr, and distal pulses ensure blood flow past the graft.",
    category: "Cardiovascular",
    image: heartImg
  },
  { 
    id: "q2",
    type: "question",
    question: "A child with Kawasaki Disease is receiving IVIG. Which teaching is most important regarding live vaccines?", 
    options: [
      "Get live vaccines immediately after discharge",
      "Live vaccines should be avoided for 11 months",
      "Only inactivated vaccines are prohibited",
      "Live vaccines can be given after 2 weeks"
    ],
    correctIndex: 1,
    answer: "IVIG contains high concentrations of antibodies that can interfere with the immune response to live vaccines like MMR and Varicella. Delay for 11 months.",
    category: "Pediatrics",
    image: pedsImg
  },
  { 
    id: "q3",
    type: "question",
    question: "A client with Acute Lymphoblastic Leukemia (ALL) has an Absolute Neutrophil Count (ANC) of 350. Which action is the priority?", 
    options: [
      "Provide a diet rich in raw fruits and vegetables",
      "Administer a rectal suppository for constipation",
      "Implement strict neutropenic precautions",
      "Encourage the client to visit the hospital cafeteria"
    ],
    correctIndex: 2,
    answer: "An ANC < 500 represents severe neutropenia. Strict precautions (no raw foods, no fresh flowers, limited visitors) are vital to prevent life-threatening infection.",
    category: "Oncology",
    image: oncologyImg
  },
  // Terms
  {
    id: "t1",
    type: "term",
    question: "Pulsatile Abdominal Mass",
    answer: "A key clinical finding in Abdominal Aortic Aneurysm (AAA), indicating the aorta is dilated and transmitting the heart's pulsations through the abdominal wall.",
    category: "Cardiovascular",
    image: heartImg
  },
  {
    id: "t2",
    type: "term",
    question: "Strawberry Tongue",
    answer: "A characteristic finding in Kawasaki Disease (acute phase) where the tongue appears red and bumpy due to inflamed papillae.",
    category: "Pediatrics",
    image: pedsImg
  },
  {
    id: "t3",
    type: "term",
    question: "Pancytopenia",
    answer: "A simultaneous reduction in RBCs, WBCs, and platelets, commonly seen in leukemia due to bone marrow overcrowding by malignant blasts.",
    category: "Oncology",
    image: oncologyImg
  },
  {
    id: "t4",
    type: "term",
    question: "tPA Window",
    answer: "The critical 3 to 4.5 hour timeframe from the 'last known well' time for administering thrombolytic therapy in ischemic stroke.",
    category: "Neurological"
  },
  {
    id: "q-shock-1",
    type: "question",
    question: "A client with a ruptured AAA presents with BP 80/40, HR 128, and pale/clammy skin. Which type of shock is occurring?",
    options: ["Septic Shock", "Cardiogenic Shock", "Hypovolemic Shock", "Neurogenic Shock"],
    correctIndex: 2,
    answer: "Hypovolemic shock occurs due to rapid blood loss (exsanguination) from the ruptured aneurysm. Treatment requires immediate fluid bolus and blood products.",
    category: "Cardiovascular"
  },
  {
    id: "q-resp-1",
    type: "question",
    question: "Which finding is the most critical to report in a client with an acute asthma exacerbation?",
    options: ["Expiratory wheezing", "Productive cough", "Silent chest (absence of wheezing)", "Use of accessory muscles"],
    correctIndex: 2,
    answer: "A 'silent chest' indicates that air movement is so restricted that wheezing has stopped, signaling imminent respiratory failure.",
    category: "Respiratory"
  },
  {
    id: "t-neuro-1",
    type: "term",
    question: "Cushing's Triad",
    answer: "A late sign of increased ICP characterized by widening pulse pressure (HTN), bradycardia, and irregular respirations.",
    category: "Neurological"
  },
  {
    id: "q-gi-1",
    type: "question",
    question: "A client with a suspected small bowel obstruction has a board-like, rigid abdomen. What does this suggest?",
    options: ["Normal digestion", "Peritonitis/Perforation", "Constipation", "GERD"],
    correctIndex: 1,
    answer: "A rigid, board-like abdomen is a classic sign of peritonitis, often following a bowel perforation—a surgical emergency.",
    category: "GI"
  },
  {
    id: "q-meds-1",
    type: "question",
    question: "A client is taking Ginkgo Biloba and Warfarin. What is the primary safety concern?",
    options: ["Increased risk of blood clots", "Increased risk of bleeding", "Severe hypertension", "Liver failure"],
    correctIndex: 1,
    answer: "Ginkgo Biloba has antiplatelet effects and can significantly increase the risk of bleeding when combined with anticoagulants like Warfarin.",
    category: "Pharmacology"
  },
  {
    id: "t-peds-1",
    type: "term",
    question: "Epiglottitis (The 4 Ds)",
    answer: "Drooling, Dysphagia, Dysphonia, and Distressed inspiratory stridor. A pediatric airway emergency.",
    category: "Pediatrics"
  },
  {
    id: "q-pe-1",
    type: "question",
    question: "A post-op client suddenly develops pleuritic chest pain and shortness of breath. What is the priority?",
    options: ["Check temperature", "Apply oxygen and place in High-Fowler's", "Give an aspirin", "Encourage walking"],
    correctIndex: 1,
    answer: "These are classic signs of a Pulmonary Embolism. Immediate oxygenation and positioning are the priority nursing actions.",
    category: "Respiratory"
  },
  {
    id: "t-shock-1",
    type: "term",
    question: "MAP (Mean Arterial Pressure)",
    answer: "The average pressure in the arteries during one cardiac cycle. Must be > 65 mmHg to ensure adequate end-organ perfusion.",
    category: "Cardiovascular"
  },
  {
    id: "q-k-1",
    type: "question",
    question: "A client's potassium level is 6.8 mEq/L. Which medication is the priority to protect the heart?",
    options: ["Furosemide", "Sodium Polystyrene", "Calcium Gluconate", "Insulin/Dextrose"],
    correctIndex: 2,
    answer: "Calcium Gluconate does not lower potassium, but it stabilizes the cardiac membrane to prevent lethal dysrhythmias until the potassium can be shifted or removed.",
    category: "Pharmacology"
  },
  {
    id: "t-skin-1",
    type: "term",
    question: "Rule of Nines",
    answer: "A standardized tool used to quickly estimate the Total Body Surface Area (TBSA) burned in adults to guide fluid resuscitation.",
    category: "Skin"
  },
  {
    id: "q-angina-1",
    type: "question",
    question: "A client reports chest pain that occurs with exertion and is relieved by rest and nitroglycerin. What is this?",
    options: ["Unstable Angina", "Stable Angina", "Myocardial Infarction", "Prinzmetal Angina"],
    correctIndex: 1,
    answer: "Stable angina is predictable and occurs with exertion, relieved by rest or nitrates. Unstable angina is a medical emergency as it occurs at rest or increases in frequency/severity.",
    category: "Cardiovascular"
  },
  {
    id: "t-sepsis-1",
    type: "term",
    question: "SIRS Criteria",
    answer: "Systemic Inflammatory Response Syndrome: Defined by 2+ of: Temp >38C or <36C, HR >90, RR >20, or WBC >12k or <4k.",
    category: "Infection"
  },
  {
    id: "q-gu-1",
    type: "question",
    question: "Which electrolyte imbalance is a priority concern in a client with chronic kidney disease?",
    options: ["Hyponatremia", "Hypocalcemia", "Hyperkalemia", "Hypomagnesemia"],
    correctIndex: 2,
    answer: "Hyperkalemia is the most life-threatening electrolyte imbalance in renal failure due to the risk of lethal cardiac arrhythmias.",
    category: "GU / Renal"
  },
  {
    id: "t-ms-1",
    type: "term",
    question: "Osteoporosis Safety",
    answer: "Focus on fall prevention, weight-bearing exercise (walking), and adequate Calcium/Vitamin D intake.",
    category: "Musculoskeletal"
  },
  {
    id: "q-meds-2",
    type: "question",
    question: "A client is prescribed St. John's Wort. Which medication would cause a major interaction?",
    options: ["Vitamin C", "Digoxin", "Acetaminophen", "Loperamide"],
    correctIndex: 1,
    answer: "St. John's Wort significantly decreases the effectiveness of many critical drugs, including Digoxin, Warfarin, and oral contraceptives.",
    category: "Pharmacology"
  },
  {
    id: "t-peds-2",
    type: "term",
    question: "Tetralogy of Fallot (Tet Spell)",
    answer: "Acute cyanotic episode. Priority action: Place the infant in a knee-chest position to increase systemic vascular resistance.",
    category: "Pediatrics"
  },
  {
    id: "q-insulin-1",
    type: "question",
    question: "A client is shaky, sweaty, and confused after receiving insulin. What is the priority?",
    options: ["Give more insulin", "Check blood glucose and give 15g carbs", "Encourage a nap", "Wait for the next meal"],
    correctIndex: 1,
    answer: "These are signs of hypoglycemia. The 'Rule of 15' (check glucose, give 15g simple carbs) is the standard treatment.",
    category: "Pharmacology"
  },
  {
    id: "t-gi-1",
    type: "term",
    question: "Melena vs Hematochezia",
    answer: "Melena is black, tarry stool (Upper GI bleed). Hematochezia is bright red blood per rectum (Lower GI bleed).",
    category: "GI"
  },
  {
    id: "q-copd-1",
    type: "question",
    question: "What is the target oxygen saturation for a client with chronic COPD?",
    options: ["95-100%", "88-92%", "92-96%", "Over 94%"],
    correctIndex: 1,
    answer: "COPD patients often have a 'hypoxic drive.' Keeping sats at 88-92% prevents suppression of their respiratory urge.",
    category: "Respiratory"
  },
  {
    id: "q-lithium-1",
    type: "question",
    question: "A client on Lithium therapy reports blurred vision and tremors. What is the priority nursing action?",
    options: ["Administer the next dose", "Give a glass of water", "Hold the dose and notify the provider", "Encourage exercise"],
    correctIndex: 2,
    answer: "Blurred vision, tremors, and ataxia are signs of lithium toxicity. The dose must be held immediately and levels checked.",
    category: "Pharmacology"
  },
  {
    id: "t-endo-1",
    type: "term",
    question: "Diabetes Insipidus (DI)",
    answer: "Caused by ADH deficiency. Characterized by polydipsia and large amounts of dilute urine (low specific gravity). Risk: Dehydration.",
    category: "Endocrine"
  },
  {
    id: "q-ob-1",
    type: "question",
    question: "A client at 32 weeks gestation has painless, bright red vaginal bleeding. What is suspected?",
    options: ["Placental Abruption", "Placenta Previa", "Normal Labor", "Ectopic Pregnancy"],
    correctIndex: 1,
    answer: "Painless, bright red bleeding in the third trimester is a classic sign of Placenta Previa. Painful bleeding suggests abruption.",
    category: "Maternal"
  },
  {
    id: "t-psych-1",
    type: "term",
    question: "Serotonin Syndrome",
    answer: "Caused by excess serotonin. Symptoms: Agitation, fever, tachycardia, and hyperreflexia. Often occurs with SSRI/MAOI combinations.",
    category: "Psychiatry"
  },
  {
    id: "q-anemia-1",
    type: "question",
    question: "A child with Sickle Cell Disease presents with severe pain and fever. What is the priority intervention?",
    options: ["Administer antibiotics", "Start IV fluids", "Apply ice packs to joints", "Encourage ambulation"],
    correctIndex: 1,
    answer: "Hydration is critical in a Sickle Cell crisis to reduce blood viscosity and stop the sickling process. Ice packs are contraindicated as they cause vasoconstriction.",
    category: "Hematology"
  },
  {
    id: "t-anemia-1",
    type: "term",
    question: "Iron Deficiency Anemia Education",
    answer: "Take iron supplements with Vitamin C (orange juice) to increase absorption. Use a straw to prevent teeth staining. Stools will turn black/tarry (normal).",
    category: "Hematology"
  },
  {
    id: "q-gi-2",
    type: "question",
    question: "A 6-week-old infant has projectile vomiting after feeding and an 'olive-shaped' mass in the epigastrium. What is suspected?",
    options: ["GERD", "Pyloric Stenosis", "Intussusception", "Hirschsprung Disease"],
    correctIndex: 1,
    answer: "Projectile non-bilious vomiting and an olive-shaped mass are classic signs of Hypertrophic Pyloric Stenosis.",
    category: "GI"
  },
  {
    id: "t-gi-2",
    type: "term",
    question: "Intussusception",
    answer: "Telescoping of the bowel. Classic signs: Sudden severe abdominal pain (knees to chest), 'sausage-shaped' abdominal mass, and 'currant jelly' stools.",
    category: "GI"
  },
  {
    id: "q-endo-2",
    type: "question",
    question: "A client with Addison's Disease arrives with BP 70/40 and confusion. Which electrolyte imbalance is expected?",
    options: ["Hypernatremia", "Hypokalemia", "Hyperkalemia", "Hyperglycemia"],
    correctIndex: 2,
    answer: "Addison's (Adrenal Insufficiency) leads to a lack of aldosterone, causing sodium/water loss (hypotension) and potassium retention (hyperkalemia).",
    category: "Endocrine"
  },
  {
    id: "t-endo-3",
    type: "term",
    question: "Cushing's Syndrome",
    answer: "Caused by excess cortisol. Signs: Moon face, Buffalo hump, Truncal obesity, Hypertension, Hyperglycemia, and Hypokalemia.",
    category: "Endocrine"
  },
  {
    id: "q-neuro-3",
    type: "question",
    question: "A child has a history of febrile seizures. What is the most important teaching for the parents?",
    options: ["Give prophylactic phenytoin daily", "Give aspirin for fever", "Manage fever with acetaminophen/ibuprofen", "Call 911 for every fever"],
    correctIndex: 2,
    answer: "Febrile seizures are benign and triggered by the rapid rise in temperature. Fever management is the key prevention. Aspirin is contraindicated (Reye's syndrome).",
    category: "Neurological"
  },
  {
    id: "t-pharm-2",
    type: "term",
    question: "Phenytoin (Dilantin)",
    answer: "Anticonvulsant. Therapeutic range: 10-20 mcg/mL. Side effects: Gingival hyperplasia (need dental care). Toxicity: Ataxia, nystagmus, slurred speech.",
    category: "Pharmacology"
  },
  {
    id: "q-infection-1",
    type: "question",
    question: "Which isolation precaution is required for a client with Bacterial Meningitis?",
    options: ["Contact", "Airborne", "Droplet", "Standard"],
    correctIndex: 2,
    answer: "Bacterial Meningitis (Neisseria meningitidis) requires Droplet precautions. Antibiotics must be started immediately after cultures.",
    category: "Infection"
  },
  {
    id: "t-cardiac-1",
    type: "term",
    question: "Rheumatic Fever",
    answer: "Inflammatory disease following untreated Strep throat (Group A Beta-hemolytic Streptococcus). Can cause carditis and permanent heart valve damage.",
    category: "Cardiovascular"
  },
  {
    id: "q-pharm-3",
    type: "question",
    question: "A client taking an NSAID (Ibuprofen) reports black tarry stools. What is the concern?",
    options: ["Iron toxicity", "GI Bleeding", "Normal side effect", "Liver failure"],
    correctIndex: 1,
    answer: "NSAIDs inhibit prostaglandins that protect the stomach lining, leading to gastric ulcers and GI bleeding (melena).",
    category: "Pharmacology"
  },
  {
    id: "t-gi-3",
    type: "term",
    question: "Cholecystitis",
    answer: "Inflammation of the gallbladder. Signs: RUQ pain radiating to right shoulder/scapula, Murphy's sign (pain on inspiration with palpation), triggered by fatty meals.",
    category: "GI"
  },
  {
    id: "q-resp-3",
    type: "question",
    question: "A child with Cystic Fibrosis is prescribed Pancrelipase. When should it be administered?",
    options: ["Before bed", "With every meal and snack", "Once daily in the morning", "Only with fatty foods"],
    correctIndex: 1,
    answer: "Pancreatic enzymes must be taken with every meal and snack to aid in digestion and absorption of nutrients.",
    category: "Respiratory"
  },
  {
    id: "t-neuro-2",
    type: "term",
    question: "Autonomic Dysreflexia",
    answer: "Life-threatening emergency in spinal cord injury (T6 or higher). Triggered by noxious stimuli (full bladder/constipation). Signs: Severe HTN, headache, bradycardia.",
    category: "Neurological"
  },
  {
    id: "q-ob-2",
    type: "question",
    question: "A client in labor has a sudden drop in fetal heart rate that does not return to baseline. On exam, the cord is palpable. Priority?",
    options: ["Start Oxytocin", "Place client in Knee-Chest position", "Encourage pushing", "Give fluids"],
    correctIndex: 1,
    answer: "This is Umbilical Cord Prolapse. Knee-chest or Trendelenburg position relieves pressure on the cord. Keep hand in vagina to lift head off cord until C-section.",
    category: "Maternal"
  },
  {
    id: "q-transfusion-1",
    type: "question",
    question: "A client receiving a blood transfusion develops flank pain and dark red urine. What is the likely cause?",
    options: ["Febrile Non-Hemolytic Reaction", "Acute Hemolytic Reaction", "Anaphylaxis", "Fluid Overload"],
    correctIndex: 1,
    answer: "Acute Hemolytic Reaction. ABO incompatibility causes massive hemolysis. Released hemoglobin damages kidneys (dark urine/flank pain).",
    category: "Hematology"
  },
  {
    id: "q-ob-3",
    type: "question",
    question: "Which intervention is maximizing fetal oxygenation during pushing with variable decelerations?",
    options: ["Pushing in lithotomy position", "Open glottis pushing (slow exhalation)", "Holding breath for 10 seconds", "Pushing with every contraction"],
    correctIndex: 1,
    answer: "Open glottis pushing promotes maternal cardiac output and placental perfusion. Closed glottis (Valsalva) reduces oxygenation.",
    category: "Maternal"
  },
  {
    id: "t-wound-1",
    type: "term",
    question: "Negative Pressure Wound Therapy (NPWT)",
    answer: "Promotes healing by removing exudate/infectious material and stimulating angiogenesis via mechanical strain. Must maintain an airtight seal.",
    category: "Skin"
  },
  {
    id: "t-peds-3",
    type: "term",
    question: "Pavlik Harness",
    answer: "Used for Hip Dysplasia. Maintains hips in flexion and abduction. Worn 24/7. Assess skin under straps. No powders/lotions.",
    category: "Pediatrics"
  },
  {
    id: "t-resp-1",
    type: "term",
    question: "Rhonchi",
    answer: "Low-pitched, snoring breath sounds caused by thick mucus in large airways. Often clears with coughing. Seen in bronchitis.",
    category: "Respiratory"
  },
  {
    id: "q-pharm-4",
    type: "question",
    question: "A client taking Oxybutynin reports dry mouth and constipation. What is the nurse's best response?",
    options: ["Stop the medication immediately", "These are expected anticholinergic side effects", "Go to the ER", "Double the dose"],
    correctIndex: 1,
    answer: "Oxybutynin is an anticholinergic. Common side effects include drying secretions (dry mouth, constipation, urinary retention). Increase fluids/fiber.",
    category: "Pharmacology"
  },
  {
    id: "q-onc-1",
    type: "question",
    question: "Tumor Lysis Syndrome releases intracellular components into the blood. Which electrolyte imbalance is expected?",
    options: ["Hypokalemia", "Hypercalcemia", "Hyperuricemia & Hyperkalemia", "Hypophosphatemia"],
    correctIndex: 2,
    answer: "Cell destruction releases Potassium (Hyperkalemia), Phosphate (Hyperphosphatemia), and Nucleic Acids (Hyperuricemia).",
    category: "Oncology"
  },
  {
    id: "q-neuro-4",
    type: "question",
    question: "Which anticonvulsant is preferred for brain tumor patients due to minimal drug interactions?",
    options: ["Phenytoin", "Carbamazepine", "Levetiracetam", "Valproic Acid"],
    correctIndex: 2,
    answer: "Levetiracetam (Keppra) has a favorable side effect profile and few drug-drug interactions compared to older anticonvulsants.",
    category: "Pharmacology"
  },
  {
    id: "mat-1",
    type: "term",
    question: "GTPAL",
    answer: "Gravida (total pregnancies), Term (births at 37+ weeks), Preterm (births before 37 weeks), Abortions (spontaneous or elective losses before 20 weeks), Living (children currently alive). A systematic method for assessing obstetric history.",
    category: "Maternal"
  },
  {
    id: "mat-2",
    type: "term",
    question: "Nagele's Rule",
    answer: "Subtract 3 months from the first day of the last menstrual period (LMP), then add 7 days to estimate the expected date of delivery (EDD).",
    category: "Maternal"
  },
  {
    id: "mat-3",
    type: "question",
    question: "A client at 32 weeks reports painless bright red vaginal bleeding. What is the priority action?",
    options: ["Perform a vaginal exam", "Prepare for emergency C-section", "Do NOT perform vaginal exam, notify provider", "Start Oxytocin"],
    correctIndex: 2,
    answer: "Painless bright red bleeding in the third trimester is the hallmark of Placenta Previa. NEVER perform a vaginal or digital exam as it can cause catastrophic hemorrhage. Notify the provider immediately.",
    category: "Maternal"
  },
  {
    id: "mat-4",
    type: "term",
    question: "HELLP Syndrome",
    answer: "Hemolysis, Elevated Liver enzymes, Low Platelets. A severe, life-threatening form of preeclampsia requiring immediate delivery regardless of gestational age.",
    category: "Maternal"
  },
  {
    id: "mat-5",
    type: "question",
    question: "A client receiving magnesium sulfate for preeclampsia shows signs of toxicity. Which finding requires immediate intervention?",
    options: ["DTRs 2+", "Respiratory rate of 10", "Urine output 40mL/hr", "Flushing"],
    correctIndex: 1,
    answer: "A respiratory rate below 12 breaths/min indicates magnesium sulfate toxicity. Hold the magnesium infusion and administer the antidote, Calcium Gluconate, immediately.",
    category: "Maternal"
  },
  {
    id: "mat-6",
    type: "term",
    question: "Postpartum Hemorrhage 4 T's",
    answer: "Tone (uterine atony — most common cause), Tissue (retained placental fragments), Trauma (lacerations or hematomas), Thrombin (coagulopathy/DIC). A framework for identifying the cause of postpartum hemorrhage.",
    category: "Maternal"
  },
  {
    id: "mat-7",
    type: "question",
    question: "A postpartum client has a boggy uterus and heavy vaginal bleeding. What is the first action?",
    options: ["Start an IV", "Administer Methergine", "Perform fundal massage", "Call the surgeon"],
    correctIndex: 2,
    answer: "Fundal massage is the FIRST nursing intervention for uterine atony. It stimulates the uterus to contract and control bleeding before pharmacological or surgical interventions.",
    category: "Maternal"
  },
  {
    id: "mat-8",
    type: "term",
    question: "BUBBLE-HE Assessment",
    answer: "Breasts, Uterus, Bladder, Bowel, Lochia, Episiotomy/Laceration, Homan sign (DVT screening), Emotions. A systematic head-to-toe postpartum assessment framework.",
    category: "Maternal"
  },
  {
    id: "mat-9",
    type: "question",
    question: "A laboring client has late decelerations on the fetal monitor. What is the priority intervention?",
    options: ["Increase Oxytocin", "Position client on left side and administer O2", "Prepare for vaginal delivery", "Encourage pushing"],
    correctIndex: 1,
    answer: "Late decelerations indicate uteroplacental insufficiency. Turn the client to the left lateral position to improve placental perfusion, administer oxygen, and STOP Oxytocin if infusing.",
    category: "Maternal"
  },
  {
    id: "mat-10",
    type: "term",
    question: "Amniotic Fluid Embolism",
    answer: "A catastrophic obstetric emergency where amniotic fluid enters the maternal circulation, causing an anaphylactoid reaction, cardiovascular collapse, and disseminated intravascular coagulation (DIC). Mortality rate is 60-80%.",
    category: "Maternal"
  },
  {
    id: "neo-1",
    type: "term",
    question: "APGAR Score",
    answer: "Appearance (color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), Respirations (breathing effort). Assessed at 1 and 5 minutes after birth. Score 7-10 is normal, 4-6 indicates moderate distress, 0-3 indicates severe distress.",
    category: "Neonatal"
  },
  {
    id: "neo-2",
    type: "question",
    question: "A newborn has a temperature of 36.0°C (96.8°F). What is the priority action?",
    options: ["Administer warm IV fluids", "Place under radiant warmer and skin-to-skin", "Start antibiotics", "Draw blood glucose"],
    correctIndex: 1,
    answer: "Cold stress in neonates leads to hypoglycemia, metabolic acidosis, and increased oxygen consumption. Rewarm immediately with a radiant warmer and skin-to-skin contact.",
    category: "Neonatal"
  },
  {
    id: "neo-3",
    type: "term",
    question: "Kernicterus",
    answer: "Bilirubin encephalopathy caused by unconjugated (indirect) bilirubin crossing the blood-brain barrier. Causes permanent neurological damage including cerebral palsy and hearing loss. Prevention: phototherapy and exchange transfusion.",
    category: "Neonatal"
  },
  {
    id: "neo-4",
    type: "question",
    question: "During phototherapy for jaundice, which nursing intervention is essential?",
    options: ["Cover the eyes with eye shields", "Limit oral feedings", "Keep all clothing on", "Decrease ambient temperature"],
    correctIndex: 0,
    answer: "Eye shields are essential to prevent retinal damage from the phototherapy lights. Maximize skin exposure (remove clothing) and increase feedings to promote bilirubin excretion.",
    category: "Neonatal"
  },
  {
    id: "neo-5",
    type: "term",
    question: "Surfactant Deficiency",
    answer: "The primary cause of Respiratory Distress Syndrome (RDS) in premature neonates. Type II pneumocytes begin producing surfactant at 24 weeks gestation, with adequate amounts by 34-36 weeks. Surfactant reduces alveolar surface tension to prevent collapse.",
    category: "Neonatal"
  },
  {
    id: "neo-6",
    type: "question",
    question: "A premature neonate shows nasal flaring, grunting, and intercostal retractions. What is the expected treatment?",
    options: ["Inhaled bronchodilators", "Exogenous surfactant administration", "Oral antibiotics", "Fluid restriction"],
    correctIndex: 1,
    answer: "These are classic signs of Respiratory Distress Syndrome (RDS) from surfactant deficiency. Treatment is exogenous surfactant replacement via endotracheal tube.",
    category: "Neonatal"
  },
  {
    id: "neo-7",
    type: "term",
    question: "Necrotizing Enterocolitis (NEC)",
    answer: "Intestinal necrosis occurring primarily in premature neonates. Pneumatosis intestinalis (air in the bowel wall) on abdominal x-ray is pathognomonic. Breast milk is protective and reduces incidence.",
    category: "Neonatal"
  },
  {
    id: "neo-8",
    type: "question",
    question: "A neonate in the NICU develops abdominal distension, bilious emesis, and bloody stools. What is the suspected diagnosis?",
    options: ["Pyloric stenosis", "NEC", "Hirschsprung disease", "GERD"],
    correctIndex: 1,
    answer: "This is the classic triad of Necrotizing Enterocolitis (NEC). Immediate management: make NPO, insert OG tube for decompression, and start IV antibiotics.",
    category: "Neonatal"
  },
  {
    id: "neo-9",
    type: "term",
    question: "Therapeutic Hypothermia",
    answer: "Targeted cooling to 33.5°C for 72 hours for Hypoxic-Ischemic Encephalopathy (HIE). Must begin within 6 hours of birth. Reduces secondary brain injury by decreasing metabolic rate and excitotoxicity.",
    category: "Neonatal"
  },
  {
    id: "neo-10",
    type: "question",
    question: "A term newborn born after prolonged labor has poor tone, weak cry, and seizures at 4 hours of life. What is the next step?",
    options: ["Administer glucose", "Initiate therapeutic hypothermia", "Start phototherapy", "Observe and reassess"],
    correctIndex: 1,
    answer: "This presentation is consistent with Hypoxic-Ischemic Encephalopathy (HIE). With seizures within the 6-hour window, initiate therapeutic hypothermia immediately to reduce secondary brain injury.",
    category: "Neonatal"
  },
  {
    id: "proc-1",
    type: "term",
    question: "Sterile Technique",
    answer: "Maintaining a sterile field to prevent surgical site infections. Key rules: sterile touches sterile only, 1-inch border is contaminated, keep hands above waist, face the sterile field at all times.",
    category: "Procedures"
  },
  {
    id: "proc-2",
    type: "question",
    question: "A nurse is inserting a Foley catheter. The catheter touches the client's thigh. Next action?",
    options: ["Continue insertion", "Wipe the catheter with alcohol", "Discard and get a new sterile catheter", "Apply more lubricant"],
    correctIndex: 2,
    answer: "The catheter is now contaminated. Discard it and obtain a new sterile kit. Urinary catheterization requires strict sterile technique.",
    category: "Procedures"
  },
  {
    id: "proc-3",
    type: "term",
    question: "Modified Allen's Test",
    answer: "Tests collateral circulation via ulnar artery before radial artery puncture for ABG. Compress both arteries, release ulnar, hand should pink up within 5-15 seconds.",
    category: "Procedures"
  },
  {
    id: "proc-4",
    type: "question",
    question: "During blood transfusion, a client develops fever, chills, and flank pain within 15 minutes. Priority action?",
    options: ["Slow the infusion rate", "Administer Diphenhydramine", "STOP the transfusion immediately", "Increase IV fluids"],
    correctIndex: 2,
    answer: "This is an Acute Hemolytic Transfusion Reaction. STOP the transfusion immediately, maintain IV access with NS, notify provider, and send blood bag to lab.",
    category: "Procedures"
  },
  {
    id: "proc-5",
    type: "term",
    question: "Chest Tube Tidaling",
    answer: "Normal fluctuation of water level in the water seal chamber that rises with inspiration and falls with expiration (spontaneous breathing). Absence of tidaling may indicate lung re-expansion or tube obstruction.",
    category: "Procedures"
  },
  {
    id: "proc-6",
    type: "question",
    question: "A chest tube is accidentally pulled out. Immediate action?",
    options: ["Reinsert the tube", "Apply petroleum gauze dressing taped on 3 sides", "Apply dry sterile gauze taped on all 4 sides", "Clamp the remaining tubing"],
    correctIndex: 1,
    answer: "Petroleum gauze taped on 3 sides creates a flutter-valve effect: allows air out during exhalation but prevents air entry during inhalation.",
    category: "Procedures"
  },
  {
    id: "proc-7",
    type: "term",
    question: "CLABSI Bundle",
    answer: "Evidence-based central line infection prevention: Hand hygiene, Full barrier precautions, Chlorhexidine skin prep, Optimal catheter site selection, Daily line necessity review. Reduces infections by >70%.",
    category: "Procedures"
  },
  {
    id: "proc-8",
    type: "question",
    question: "Before administering a medication through an NG tube, the nurse aspirates contents with pH of 3. This indicates?",
    options: ["Intestinal placement", "Gastric placement", "Respiratory placement", "Esophageal placement"],
    correctIndex: 1,
    answer: "Gastric pH is typically 1-5. Intestinal pH is 6-7. Respiratory pH is >7. A pH of 3 confirms gastric placement.",
    category: "Procedures"
  },
  {
    id: "proc-9",
    type: "term",
    question: "Suction Technique",
    answer: "Hyperoxygenate before suctioning. Insert catheter without suction applied. Apply intermittent suction on withdrawal using rotating motion. Maximum 10-15 seconds per pass. Allow recovery breaths between passes.",
    category: "Procedures"
  },
  {
    id: "proc-10",
    type: "question",
    question: "A client's IV site is cool, pale, and swollen with no blood return. Assessment?",
    options: ["Phlebitis", "Infiltration", "Extravasation", "Thrombosis"],
    correctIndex: 1,
    answer: "Infiltration is non-vesicant fluid leaking into surrounding tissue. Cool, pale, swollen site is the hallmark. Discontinue IV and apply warm compress (cold for vesicant extravasation).",
    category: "Procedures"
  },
  {
    id: "proc-11",
    type: "term",
    question: "Ventilator Modes",
    answer: "AC (Assist-Control): delivers set Vt with every breath. SIMV: set rate with spontaneous breaths at patient's own Vt. PSV: augments spontaneous breaths only. Used for weaning.",
    category: "Procedures"
  },
  {
    id: "proc-12",
    type: "question",
    question: "A mechanically ventilated patient has high-pressure alarm. Most likely cause?",
    options: ["Disconnected tubing", "Cuff leak", "Mucus plug or biting on tube", "Low tidal volume"],
    correctIndex: 2,
    answer: "High-pressure alarm = obstruction or resistance. Common causes: mucus plug, biting, kinking, bronchospasm, pneumothorax. Low-pressure alarm = disconnection or leak.",
    category: "Procedures"
  },
  {
    id: "proc-13",
    type: "term",
    question: "IV Gauge Selection",
    answer: "14-16G: trauma/rapid fluid resuscitation. 18G: blood transfusion/surgery. 20G: most infusions. 22-24G: elderly/pediatric/fragile veins. Larger gauge number = smaller catheter.",
    category: "Procedures"
  },
  {
    id: "proc-14",
    type: "question",
    question: "During tracheostomy care, what should always be kept at the bedside?",
    options: ["Extra gauze only", "Spare tracheostomy tube and obturator", "Suction equipment only", "Oxygen tank"],
    correctIndex: 1,
    answer: "A spare tracheostomy tube (same size AND one size smaller) plus the obturator must be at bedside at all times in case of accidental decannulation.",
    category: "Procedures"
  },
  {
    id: "proc-15",
    type: "term",
    question: "CSF Analysis",
    answer: "Normal: clear, colorless, glucose 50-80, protein 15-45, WBC <5. Bacterial meningitis: turbid, low glucose, high protein, PMNs. Viral: clear, normal glucose, lymphocytes. SAH: xanthochromia.",
    category: "Procedures"
  }
];

export default function Flashcards() {
  const [view, setView] = useState<"setup" | "study" | "report" | "bookmarks">("setup");
  const [selectedType, setSelectedType] = useState<CardType | "all">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("nursenest-bookmarks") || "[]");
  });
  const [sessionResults, setSessionResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [region, setRegion] = useState<"US" | "CA">("CA");

  useEffect(() => {
    setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
  }, []);

  const categories = useMemo(() => Array.from(new Set(allCards.map(c => c.category))), []);

  const sessionCards = useMemo(() => {
    let filtered = allCards;
    if (selectedType !== "all") {
      filtered = filtered.filter(c => c.type === selectedType);
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(c => selectedCategories.includes(c.category));
    }
    return filtered;
  }, [selectedType, selectedCategories]);

  const bookmarkedCards = useMemo(() => {
    return allCards.filter(c => bookmarks.includes(c.id));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem("nursenest-bookmarks", JSON.stringify(newBookmarks));
  };

  const startSession = () => {
    if (sessionCards.length === 0) return;
    setCurrentIndex(0);
    setSessionResults([]);
    setView("study");
  };

  const handleNext = () => {
    if (currentIndex < sessionCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowRationale(false);
      setIsFlipped(false);
    } else {
      setView("report");
    }
  };

  const handleOptionClick = (index: number) => {
    if (showRationale) return;
    const isCorrect = index === sessionCards[currentIndex].correctIndex;
    setSessionResults(prev => [...prev, { id: sessionCards[currentIndex].id, correct: isCorrect }]);
    setSelectedOption(index);
    setShowRationale(true);
  };

  const currentCard = sessionCards[currentIndex];

  if (view === "setup") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Flashcard Study Suite</h1>
            <p className="text-gray-600">Configure your clinical mastery session.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl bg-white p-8 rounded-3xl">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Configuration</CardTitle>
                </div>
              </CardHeader>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Card Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["all", "term", "question"] as const).map(t => (
                      <Button 
                        key={t}
                        variant={selectedType === t ? "default" : "outline"}
                        onClick={() => setSelectedType(t)}
                        className="rounded-xl capitalize"
                      >
                        {t === "all" ? "Mixed" : `${t}s`}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Topics</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <Button 
                        key={cat}
                        variant={selectedCategories.includes(cat) ? "secondary" : "outline"}
                        onClick={() => {
                          setSelectedCategories(prev => 
                            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                          );
                        }}
                        className={cn(
                          "rounded-full text-xs font-medium px-4",
                          selectedCategories.includes(cat) ? "bg-primary/10 text-primary border-primary/20" : ""
                        )}
                      >
                        {cat}
                      </Button>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedCategories([])}
                      className="text-[10px] text-gray-400 hover:text-gray-600"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
                    onClick={startSession}
                    disabled={sessionCards.length === 0}
                  >
                    Start Session ({sessionCards.length} Cards)
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card 
                className="border-none shadow-lg bg-indigo-900 text-white p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => setView("bookmarks")}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-indigo-300" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Saved Mastery</h3>
                <p className="text-indigo-200/80 text-sm leading-relaxed">
                  Review the {bookmarks.length} difficult cards you've flagged for extra focus.
                </p>
              </Card>

              <Card className="border-none shadow-md bg-white p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <History className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-gray-900">Study Tips</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Focus on 'Why' - Rationales are more important than correct answers.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Mixed mode simulates exam environments better.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === "bookmarks") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
          <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Configuration
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Mastery Folder</h1>
              <p className="text-gray-600">Reviewing your tagged difficult cards.</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-rose-500 hover:text-rose-600 border-rose-100 bg-rose-50"
              onClick={() => {
                if(confirm("Clear all bookmarks?")) {
                  setBookmarks([]);
                  localStorage.removeItem("nursenest-bookmarks");
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Folder
            </Button>
          </div>

          {bookmarkedCards.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <Bookmark className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No bookmarks saved yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedCards.map(card => (
                <Card key={card.id} className="border-none shadow-sm hover:shadow-md transition-all bg-white p-6 rounded-2xl flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/5 rounded-full">
                      {card.type}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => toggleBookmark(card.id)} className="text-indigo-500">
                      <BookmarkCheck className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 flex-1">{card.question}</h4>
                  <div className="text-xs text-gray-400 mb-4">{card.category}</div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full rounded-xl"
                    onClick={() => {
                      setSelectedCategories([card.category]);
                      setSelectedType(card.type);
                      startSession();
                    }}
                  >
                    Study This Card
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (view === "report") {
    const correctCount = sessionResults.filter(r => r.correct).length;
    const totalCount = sessionCards.filter(c => c.type === "question").length;
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;

    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-24 w-full text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Session Complete!</h1>
          <p className="text-gray-600 mb-12">Here is how you performed today.</p>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <Card className="border-none shadow-md bg-white p-8 rounded-3xl text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Accuracy</p>
              <p className="text-4xl font-black text-primary">{score}%</p>
            </Card>
            <Card className="border-none shadow-md bg-white p-8 rounded-3xl text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Cards</p>
              <p className="text-4xl font-black text-gray-900">{sessionCards.length}</p>
            </Card>
          </div>

          <div className="space-y-4">
            <Button className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => setView("setup")}>
              New Session
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => setView("bookmarks")}>
              Review Bookmarks
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans select-none print:hidden">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Active Session</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <ShieldAlert className="w-3 h-3" />
              Capture Restricted
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {currentCard.type} Mode
            </div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-5 gap-8 flex-1 items-start">
          <div className="lg:col-span-1 space-y-4">
             <Card className="border-none shadow-sm bg-white p-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Session Progress</p>
               <p className="text-2xl font-bold text-primary">{currentIndex + 1} <span className="text-gray-300 text-lg">/ {sessionCards.length}</span></p>
               <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div 
                   className="bg-primary h-full transition-all duration-500" 
                   style={{ width: `${((currentIndex + 1) / sessionCards.length) * 100}%` }}
                 />
               </div>
             </Card>
             <Card className="border-none shadow-sm bg-indigo-50 p-4 border border-indigo-100">
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Topic</p>
               <p className="text-sm font-bold text-indigo-900">{currentCard.category}</p>
             </Card>
             <Button 
                variant="outline" 
                className={cn(
                  "w-full rounded-xl gap-2 h-12 transition-all",
                  bookmarks.includes(currentCard.id) ? "bg-indigo-50 text-indigo-600 border-indigo-200" : ""
                )}
                onClick={() => toggleBookmark(currentCard.id)}
              >
                {bookmarks.includes(currentCard.id) ? (
                  <><BookmarkCheck className="w-4 h-4 fill-current" /> Saved for Review</>
                ) : (
                  <><Bookmark className="w-4 h-4" /> Save for Difficult Review</>
                )}
              </Button>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {currentCard.type === "question" ? (
              <Card className="border-none shadow-xl bg-white overflow-hidden rounded-3xl min-h-[500px] flex flex-col animate-in slide-in-from-right-4 duration-300">
                <div className="grid md:grid-cols-2 flex-1">
                  <div className="bg-gray-50 flex flex-col items-center justify-center p-8 border-r border-gray-100 relative overflow-hidden">
                    {currentCard.image ? (
                      <img 
                        src={currentCard.image} 
                        alt="Clinical" 
                        className="w-64 h-64 object-contain rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-64 h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                         <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-8 md:p-12 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-8 leading-snug">{currentCard.question}</h2>
                    <div className="space-y-3 flex-1">
                      {currentCard.options?.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === currentCard.correctIndex;
                        let variantClasses = "border-gray-100 hover:border-primary/30 hover:bg-primary/5 text-gray-700";
                        if (showRationale) {
                          if (isCorrect) variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-900";
                          else if (isSelected) variantClasses = "border-rose-500 bg-rose-50 text-rose-900";
                          else variantClasses = "border-gray-50 bg-gray-50/50 text-gray-400 opacity-50";
                        }
                        return (
                          <button
                            key={idx}
                            disabled={showRationale}
                            onClick={() => handleOptionClick(idx)}
                            className={cn("w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 text-sm font-medium", variantClasses)}
                          >
                            <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {showRationale && (
                      <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Rationale</p>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{currentCard.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setView("setup")} className="text-gray-400">Exit Session</Button>
                  <Button variant="ghost" onClick={handleNext} className="text-primary gap-2">Next Card <ChevronRight className="w-4 h-4" /></Button>
                </div>
              </Card>
            ) : (
              <div 
                className="w-full h-[500px] relative cursor-pointer group perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={cn(
                  "w-full h-full transition-all duration-700 [transform-style:preserve-3d]",
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                )}>
                  {/* Front: Term */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden bg-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary/20" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-8">Clinical Terminology</span>
                    <h2 className="text-4xl font-black text-gray-900 leading-tight">{currentCard.question}</h2>
                    <div className="mt-12 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                      <RefreshCw className="w-4 h-4" />
                      Tap to define
                    </div>
                  </Card>

                  {/* Back: Definition */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] bg-primary text-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-8">Clinical Definition</h3>
                    <p className="text-2xl font-medium leading-relaxed max-w-lg">{currentCard.answer}</p>
                    <div className="mt-12 pt-8 border-t border-white/10 w-full flex justify-center gap-8">
                       <Button variant="ghost" className="text-white hover:bg-white/10" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                         Got it <ChevronRight className="w-4 h-4 ml-2" />
                       </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print { body { display: none !important; } }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </div>
  );
}
