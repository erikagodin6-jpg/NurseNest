import { useState, useEffect, useMemo, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeckHub, DeckView, DeckEditor, DeckStudyLearn, DeckStudyTest, DeckReportCard } from "@/components/deck-views";
import { Textarea } from "@/components/ui/textarea";
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
  Trash2,
  Pencil,
  Plus,
  Search,
  AlertTriangle,
  Sparkles,
  Lock,
  CreditCard,
  Layers,
  Share2,
  Copy,
  Flag,
  Globe,
  EyeOff,
  Timer,
  Upload,
  Download,
  BarChart3,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { ProtectedImage } from "@/components/protected-image";
import { getCategoryImage } from "@/lib/system-images";
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
    answer: "A rigid, board-like abdomen is a classic sign of peritonitis, often following a bowel perforation; a surgical emergency.",
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
    answer: "Tone (uterine atony: most common cause), Tissue (retained placental fragments), Trauma (lacerations or hematomas), Thrombin (coagulopathy/DIC). A framework for identifying the cause of postpartum hemorrhage.",
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
  },
  {
    id: "fund-1",
    type: "question",
    question: "Which phase of the nursing process involves formulating measurable, patient-centered goals?",
    options: ["Assessment", "Diagnosis", "Planning", "Implementation"],
    correctIndex: 2,
    answer: "Planning is the third phase of the nursing process (ADPIE) where the nurse develops SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and selects evidence-based interventions.",
    category: "Fundamentals"
  },
  {
    id: "fund-2",
    type: "question",
    question: "Which vital sign is the MOST sensitive early predictor of clinical deterioration?",
    options: ["Blood pressure", "Temperature", "Respiratory rate", "Heart rate"],
    correctIndex: 2,
    answer: "Respiratory rate is consistently the most sensitive and earliest predictor of clinical deterioration, often increasing hours before other vital signs change. Tachypnea (RR > 24) warrants immediate assessment.",
    category: "Fundamentals"
  },
  {
    id: "fund-3",
    type: "term",
    question: "High-Alert Medications (A PINCH)",
    answer: "A PINCH: Anticoagulants, Potassium (IV), Insulin, Narcotics/opioids, Chemotherapy, Heparin. These medications require independent double-check by two qualified nurses before administration due to heightened risk of significant patient harm.",
    category: "Fundamentals"
  },
  {
    id: "fund-4",
    type: "question",
    question: "A patient with C. difficile requires which hand hygiene method?",
    options: ["Alcohol-based hand rub", "Soap and water with friction", "Hand sanitizer gel", "Any method is acceptable"],
    correctIndex: 1,
    answer: "C. difficile forms spores that are resistant to alcohol. Only soap and water with physical friction can remove the spores from hands. This is the ONE major exception to using alcohol-based hand rub.",
    category: "Fundamentals"
  },
  {
    id: "fund-5",
    type: "term",
    question: "SBAR Communication Framework",
    answer: "Situation: identify yourself, patient, concern. Background: relevant history and current treatment. Assessment: your clinical judgment of the problem. Recommendation: what you think needs to happen. Always include a specific recommendation rather than just reporting data.",
    category: "Fundamentals"
  },
  {
    id: "fund-6",
    type: "question",
    question: "What is the MOST accurate method for assessing fluid balance?",
    options: ["Intake and output records", "Daily weights", "Skin turgor assessment", "Blood pressure monitoring"],
    correctIndex: 1,
    answer: "Daily weights are the most accurate indicator. 1 kg weight change = approximately 1 liter of fluid. Weigh at the same time, same scale, same clothing daily. I&O is important but prone to recording errors.",
    category: "Fundamentals"
  },
  {
    id: "fund-7",
    type: "term",
    question: "Third-Spacing",
    answer: "Pathological shift of fluid from intravascular space into non-functional interstitial/transcellular compartments. Creates a clinical paradox: patient appears edematous but is intravascularly depleted (hypotensive, tachycardic). Common in burns, pancreatitis, sepsis, liver failure.",
    category: "Fundamentals"
  },
  {
    id: "fund-8",
    type: "question",
    question: "Which type of precaution requires a fit-tested N95 respirator?",
    options: ["Standard precautions", "Contact precautions", "Droplet precautions", "Airborne precautions"],
    correctIndex: 3,
    answer: "Airborne precautions (TB, measles, varicella) require N95 respirator, negative pressure room, and closed door. Airborne particles are small enough to remain suspended and travel long distances. A surgical mask is inadequate.",
    category: "Fundamentals"
  },
  {
    id: "fund-9",
    type: "term",
    question: "Rights of Medication Administration",
    answer: "Expanded rights: Right Patient (2 identifiers), Right Drug (3 label checks), Right Dose (verify calculations), Right Route (PO/IV/IM/SubQ), Right Time (within window), Right Documentation (chart after giving), Right Reason, Right Response.",
    category: "Fundamentals"
  },
  {
    id: "fund-10",
    type: "question",
    question: "A nurse discovers she forgot to document a medication given 2 hours ago. The correct action is:",
    options: ["Add documentation to the earlier time slot", "Make a late entry with current date/time referencing actual event time", "Do not document since it is too late", "Ask another nurse to document it"],
    correctIndex: 1,
    answer: "A late entry should be made using the current date and time, clearly labeled as 'Late Entry,' and referencing the actual date and time the event occurred. Never backdate entries or pre-chart medications.",
    category: "Fundamentals"
  },
  {
    id: "fund-11",
    type: "term",
    question: "PPE Doffing Sequence",
    answer: "Correct removal order: Gloves (most contaminated) → Hand hygiene → Gown → Eye protection → Mask → Hand hygiene. Doffing is the highest-risk moment for self-contamination. Remove gloves FIRST, perform hand hygiene between each step.",
    category: "Fundamentals"
  },
  {
    id: "del-1",
    type: "question",
    question: "A patient has active external bleeding AND is making snoring respirations. What is the priority?",
    options: ["Apply pressure to the bleeding site", "Open the airway", "Start an IV for fluid resuscitation", "Assess blood pressure"],
    correctIndex: 1,
    answer: "Airway ALWAYS comes before circulation in ABC prioritization. The snoring sounds indicate a partially obstructed airway. Without a patent airway, all other interventions are futile.",
    category: "Delegation"
  },
  {
    id: "del-2",
    type: "term",
    question: "Maslow's Hierarchy in Nursing Prioritization",
    answer: "Applied to clinical nursing: Physiological needs (ABCs, oxygen, perfusion) → Safety needs (fall prevention, infection control) → Love/Belonging (family support) → Esteem (independence, dignity) → Self-actualization (health education, discharge planning). Always address lower levels first.",
    category: "Delegation"
  },
  {
    id: "del-3",
    type: "question",
    question: "Which patient should the nurse see FIRST?",
    options: ["Patient with chronic back pain requesting medication", "Post-op patient with expected moderate incision pain", "Patient with new-onset stridor after eating shellfish", "Patient requesting discharge paperwork"],
    correctIndex: 2,
    answer: "Stridor after shellfish suggests anaphylaxis with airway compromise. Airway (A in ABCs) always takes priority over circulation, pain, or administrative tasks. This is a life-threatening emergency.",
    category: "Delegation"
  },
  {
    id: "del-4",
    type: "term",
    question: "Stable vs Unstable Patient",
    answer: "STABLE: Expected findings, predictable course, vital signs within baseline. UNSTABLE: New-onset symptoms, worsening trends despite treatment, vital signs deviating dangerously, altered LOC. The key word is 'NEW': new findings = unstable = priority.",
    category: "Delegation"
  },
  {
    id: "del-5",
    type: "question",
    question: "Which task can be SAFELY delegated to a UAP (unlicensed assistive personnel)?",
    options: ["Performing an initial patient assessment", "Administering oral medications", "Measuring vital signs on a stable patient", "Evaluating medication effectiveness"],
    correctIndex: 2,
    answer: "UAPs can measure vital signs on stable patients, perform ADLs, measure I&O, and collect specimens. They CANNOT assess, evaluate, administer medications, or provide initial education: these require clinical nursing judgment.",
    category: "Delegation"
  },
  {
    id: "del-6",
    type: "term",
    question: "Five Rights of Delegation",
    answer: "Right Task (within delegate's scope), Right Circumstance (patient is stable/predictable), Right Person (appropriate training and licensure), Right Direction (clear instructions with reporting parameters), Right Supervision (follow-up and evaluation). The RN retains ACCOUNTABILITY.",
    category: "Delegation"
  },
  {
    id: "del-7",
    type: "question",
    question: "A nurse calls a physician about a deteriorating patient. The physician says 'just continue monitoring.' The nurse remains concerned. The next step is:",
    options: ["Follow the order and continue monitoring", "Escalate through the chain of command", "Document and wait until next shift", "Call the patient's family"],
    correctIndex: 1,
    answer: "When the initial provider response does not address the nurse's clinical concern, the nurse is legally and ethically obligated to escalate through the chain of command (charge nurse → supervisor → medical director).",
    category: "Delegation"
  },
  {
    id: "del-8",
    type: "term",
    question: "Post-Op Fever Mnemonic: Wind, Water, Wound, Walking, Wonder Drugs",
    answer: "Wind (atelectasis, days 1-2), Water (UTI, days 3-5), Wound (infection, days 5-7), Walking (DVT/PE, days 5-7), Wonder drugs (drug fever, anytime). This temporal framework guides assessment of post-operative fever causes.",
    category: "Delegation"
  },
  {
    id: "del-9",
    type: "question",
    question: "What is the MOST common post-operative complication?",
    options: ["Hemorrhage", "Pulmonary embolism", "Atelectasis", "Wound infection"],
    correctIndex: 2,
    answer: "Atelectasis occurs in up to 90% of surgical patients due to shallow breathing, pain-limited inspiratory effort, and immobility. Prevention: incentive spirometry every 1-2 hours while awake and early ambulation.",
    category: "Delegation"
  },
  {
    id: "del-10",
    type: "question",
    question: "Post-op bowel is protruding through the abdominal incision. Immediate action:",
    options: ["Push the bowel back in and apply sterile dressing", "Cover with sterile saline-moistened gauze, position supine with knees bent, call surgeon STAT", "Apply dry gauze and send to OR", "Apply abdominal binder tightly"],
    correctIndex: 1,
    answer: "Evisceration: NEVER push organs back in. Cover with sterile saline-moistened gauze to prevent desiccation, position supine with knees bent to reduce tension, keep NPO, and notify surgeon immediately.",
    category: "Delegation"
  },
  {
    id: "del-11",
    type: "term",
    question: "Chain of Command Escalation",
    answer: "Bedside Nurse → Charge Nurse → Nursing Supervisor → Medical Director → Chief of Staff. Nurses are legally obligated to escalate when patient safety is at risk and the initial provider response is inadequate. Using the chain of command is a professional obligation, not insubordination.",
    category: "Delegation"
  }
];

type CustomCard = {
  id: string;
  userId: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
};

export default function Flashcards() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [view, setView] = useState<"setup" | "study" | "report" | "bookmarks" | "mastered" | "mycards" | "mycards-study" | "decks" | "deck-view" | "deck-edit" | "deck-study-learn" | "deck-study-test" | "deck-report" | "browse-decks" | "admin-sets" | "admin-set-study">("setup");
  const [selectedType, setSelectedType] = useState<CardType | "all">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("nursenest-bookmarks") || "[]");
  });
  const [mastered, setMastered] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("nursenest-mastered") || "[]");
  });
  const [includeMastered, setIncludeMastered] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [region, setRegion] = useState<"US" | "CA">("CA");

  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [customCardsLoading, setCustomCardsLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("My Cards");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{ accurate: boolean; feedback: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [customSearch, setCustomSearch] = useState("");
  const [editingCard, setEditingCard] = useState<CustomCard | null>(null);
  const [myCardsStudyIndex, setMyCardsStudyIndex] = useState(0);
  const [myCardsFlipped, setMyCardsFlipped] = useState(false);
  const FREE_LIMIT = 50;

  const isPaid = user && (user as any).tier !== "free" && (user as any).subscriptionStatus === "active";

  const [myDecks, setMyDecks] = useState<any[]>([]);
  const [publicDecks, setPublicDecks] = useState<any[]>([]);
  const [savedDecksList, setSavedDecksList] = useState<any[]>([]);
  const [currentDeck, setCurrentDeck] = useState<any>(null);
  const [deckCards, setDeckCards] = useState<any[]>([]);
  const [deckLoading, setDeckLoading] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [newDeckVisibility, setNewDeckVisibility] = useState("private");
  const [deckSearchQuery, setDeckSearchQuery] = useState("");
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [newCardRationale, setNewCardRationale] = useState("");
  const [aiCheckResult, setAiCheckResult] = useState<any>(null);
  const [aiChecking, setAiChecking] = useState(false);
  const [csvImportText, setCsvImportText] = useState("");
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [entitlement, setEntitlement] = useState<any>({ isPremium: false, totalFreeCards: 0, limit: 50 });
  const [deckStudyIndex, setDeckStudyIndex] = useState(0);
  const [deckStudyFlipped, setDeckStudyFlipped] = useState(false);
  const [deckStudyCorrect, setDeckStudyCorrect] = useState(0);
  const [deckStudyIncorrect, setDeckStudyIncorrect] = useState(0);
  const [deckStudyMissed, setDeckStudyMissed] = useState<string[]>([]);
  const [deckStudyQueue, setDeckStudyQueue] = useState<any[]>([]);
  const [deckStudyStartTime, setDeckStudyStartTime] = useState(0);
  const [deckStudySessionId, setDeckStudySessionId] = useState("");
  const [deckStudyComplete, setDeckStudyComplete] = useState(false);
  const [editingDeckCard, setEditingDeckCard] = useState<any>(null);
  const [deckTab, setDeckTab] = useState<"my" | "browse" | "saved">("my");

  const [dbFlashcardSets, setDbFlashcardSets] = useState<any[]>([]);
  const [dbSetsLoading, setDbSetsLoading] = useState(false);
  const [activeDbSet, setActiveDbSet] = useState<any>(null);
  const [dbStudyIndex, setDbStudyIndex] = useState(0);
  const [dbStudyFlipped, setDbStudyFlipped] = useState(false);

  const fetchMyDecks = useCallback(async () => {
    if (!user) return;
    setDeckLoading(true);
    try {
      const res = await fetch(`/api/decks?userId=${user.id}`);
      if (res.ok) setMyDecks(await res.json());
    } catch {} finally { setDeckLoading(false); }
  }, [user]);

  const fetchPublicDecks = useCallback(async () => {
    try {
      const url = deckSearchQuery ? `/api/decks?visibility=public&search=${encodeURIComponent(deckSearchQuery)}` : `/api/decks?visibility=public`;
      const res = await fetch(url);
      if (res.ok) setPublicDecks(await res.json());
    } catch {}
  }, [deckSearchQuery]);

  const fetchSavedDecks = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/saved-decks?userId=${user.id}`);
      if (res.ok) setSavedDecksList(await res.json());
    } catch {}
  }, [user]);

  const fetchEntitlement = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/user-entitlement?userId=${user.id}`);
      if (res.ok) setEntitlement(await res.json());
    } catch {}
  }, [user]);

  const fetchDeckCards = useCallback(async (deckId: string) => {
    try {
      const res = await fetch(`/api/decks/${deckId}/cards`);
      if (res.ok) setDeckCards(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    if (view === "decks" || view === "browse-decks") {
      fetchMyDecks();
      fetchPublicDecks();
      fetchSavedDecks();
      fetchEntitlement();
    }
  }, [view, fetchMyDecks, fetchPublicDecks, fetchSavedDecks, fetchEntitlement]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") || params.get("view") === "decks") {
      setView("decks");
    }
  }, []);

  useEffect(() => {
    setDbSetsLoading(true);
    fetch("/api/content/flashcard-sets")
      .then(res => res.ok ? res.json() : [])
      .then(data => setDbFlashcardSets(Array.isArray(data) ? data : []))
      .catch(() => setDbFlashcardSets([]))
      .finally(() => setDbSetsLoading(false));
  }, []);

  const createDeck = async () => {
    if (!user || !newDeckTitle.trim()) return;
    try {
      const res = await fetch("/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, title: newDeckTitle, description: newDeckDescription, visibility: newDeckVisibility }),
      });
      if (res.ok) {
        const deck = await res.json();
        setNewDeckTitle("");
        setNewDeckDescription("");
        setMyDecks(prev => [deck, ...prev]);
        setCurrentDeck(deck);
        setDeckCards([]);
        setView("deck-edit");
      }
    } catch {}
  };

  const addCardToDeck = async (overrideFront?: string, overrideBack?: string) => {
    if (!user || !currentDeck) return;
    const front = overrideFront || newCardFront;
    const back = overrideBack || newCardBack;
    if (!front.trim() || !back.trim()) return;
    try {
      const res = await fetch(`/api/decks/${currentDeck.id}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, front, back, rationale: newCardRationale || undefined }),
      });
      if (res.ok) {
        const card = await res.json();
        setDeckCards(prev => [...prev, card]);
        setNewCardFront("");
        setNewCardBack("");
        setNewCardRationale("");
        setAiCheckResult(null);
        fetchEntitlement();
      } else {
        const err = await res.json();
        if (err.upgradeRequired) {
          alert(err.error || t("flashcards.cardLimitReached"));
        }
      }
    } catch {}
  };

  const aiCheckCard = async () => {
    if (!newCardFront.trim() || !newCardBack.trim()) return;
    setAiChecking(true);
    try {
      const res = await fetch(`/api/decks/${currentDeck?.id}/ai-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: newCardFront, back: newCardBack, rationale: newCardRationale }),
      });
      if (res.ok) setAiCheckResult(await res.json());
    } catch {} finally { setAiChecking(false); }
  };

  const handleCsvImport = async () => {
    if (!user || !currentDeck || !csvImportText.trim()) return;
    const lines = csvImportText.trim().split("\n");
    const cards = lines.map(line => {
      const parts = line.split(",").map(p => p.trim().replace(/^"|"$/g, ""));
      return { front: parts[0] || "", back: parts[1] || "", rationale: parts[2] || "" };
    }).filter(c => c.front && c.back);
    if (cards.length === 0) return;
    try {
      const res = await fetch(`/api/decks/${currentDeck.id}/cards/bulk-import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, cards }),
      });
      if (res.ok) {
        const result = await res.json();
        alert(`${t("flashcards.importedPrefix")} ${result.imported} ${t("flashcards.importedCards")}${result.skipped > 0 ? `, ${result.skipped} ${t("flashcards.skippedSuffix")}` : ""}`);
        setCsvImportText("");
        setShowCsvImport(false);
        fetchDeckCards(currentDeck.id);
        fetchEntitlement();
      }
    } catch {}
  };

  const [aiGeneratePrompt, setAiGeneratePrompt] = useState("");
  const [aiGenerateCount, setAiGenerateCount] = useState(10);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedCards, setAiGeneratedCards] = useState<{front: string; back: string; rationale: string}[]>([]);

  const [aiUpgradeRequired, setAiUpgradeRequired] = useState(false);

  const aiGenerateCards = async () => {
    if (!user || !currentDeck || !aiGeneratePrompt.trim()) return;
    setAiGenerating(true);
    setAiGeneratedCards([]);
    setAiUpgradeRequired(false);
    try {
      const res = await fetch(`/api/decks/${currentDeck.id}/ai-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, prompt: aiGeneratePrompt, count: aiGenerateCount }),
      });
      if (!res.ok) {
        const err = await res.json();
        if (err.upgradeRequired) {
          setAiUpgradeRequired(true);
        } else {
          alert(err.error || "AI generation failed");
        }
        return;
      }
      const data = await res.json();
      setAiGeneratedCards(data.cards || []);
    } catch (e: any) {
      alert("AI generation failed. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const addAiGeneratedCards = async () => {
    if (!user || !currentDeck || aiGeneratedCards.length === 0) return;
    try {
      const res = await fetch(`/api/decks/${currentDeck.id}/cards/bulk-import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, cards: aiGeneratedCards }),
      });
      const result = await res.json();
      if (res.ok) {
        setAiGeneratedCards([]);
        setAiGeneratePrompt("");
        fetchDeckCards(currentDeck.id);
        fetchEntitlement();
        if (result.skipped > 0) {
          alert(`Added ${result.imported} cards. ${result.skipped} cards were skipped due to the free card limit. Upgrade for unlimited cards!`);
        } else {
          alert(`Added ${result.imported} AI-generated cards to your deck!`);
        }
      } else {
        if (result.upgradeRequired) {
          setAiUpgradeRequired(true);
        } else {
          alert(result.error || "Failed to add cards");
        }
      }
    } catch {}
  };

  const removeAiGeneratedCard = (index: number) => {
    setAiGeneratedCards(prev => prev.filter((_, i) => i !== index));
  };

  const deleteDeckCard = async (cardId: string) => {
    if (!user || !currentDeck) return;
    try {
      await fetch(`/api/decks/${currentDeck.id}/cards/${cardId}?userId=${user.id}`, { method: "DELETE" });
      setDeckCards(prev => prev.filter(c => c.id !== cardId));
      fetchEntitlement();
    } catch {}
  };

  const deleteDeck = async (deckId: string) => {
    if (!user || !confirm(t("flashcards.confirmDeleteDeck"))) return;
    try {
      await fetch(`/api/decks/${deckId}?userId=${user.id}`, { method: "DELETE" });
      setMyDecks(prev => prev.filter(d => d.id !== deckId));
      if (currentDeck?.id === deckId) {
        setCurrentDeck(null);
        setView("decks");
      }
    } catch {}
  };

  const startDeckStudy = async (mode: "learn" | "test") => {
    if (!currentDeck || deckCards.length === 0) return;
    const shuffled = [...deckCards].sort(() => Math.random() - 0.5);
    setDeckStudyQueue(shuffled);
    setDeckStudyIndex(0);
    setDeckStudyFlipped(false);
    setDeckStudyCorrect(0);
    setDeckStudyIncorrect(0);
    setDeckStudyMissed([]);
    setDeckStudyStartTime(Date.now());
    setDeckStudyComplete(false);
    try {
      const res = await fetch("/api/study-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, deckId: currentDeck.id, mode }),
      });
      if (res.ok) {
        const session = await res.json();
        setDeckStudySessionId(session.id);
      }
    } catch {}
    setView(mode === "learn" ? "deck-study-learn" : "deck-study-test");
  };

  const handleDeckStudyAnswer = (correct: boolean) => {
    const card = deckStudyQueue[deckStudyIndex];
    if (correct) {
      setDeckStudyCorrect(prev => prev + 1);
    } else {
      setDeckStudyIncorrect(prev => prev + 1);
      setDeckStudyMissed(prev => [...prev, card.id]);
      if (view === "deck-study-learn") {
        const insertAt = Math.min(deckStudyIndex + 4, deckStudyQueue.length);
        const newQueue = [...deckStudyQueue];
        newQueue.splice(insertAt, 0, { ...card, retry: true });
        setDeckStudyQueue(newQueue);
      }
    }
    if (deckStudyIndex + 1 >= deckStudyQueue.length) {
      finishDeckStudy();
    } else {
      setDeckStudyIndex(prev => prev + 1);
      setDeckStudyFlipped(false);
    }
  };

  const finishDeckStudy = async () => {
    setDeckStudyComplete(true);
    const timeSeconds = Math.round((Date.now() - deckStudyStartTime) / 1000);
    if (deckStudySessionId) {
      try {
        await fetch(`/api/study-sessions/${deckStudySessionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalCards: deckStudyQueue.length,
            correctCount: deckStudyCorrect + (deckStudyQueue[deckStudyIndex] ? 0 : 0),
            incorrectCount: deckStudyIncorrect,
            timeSeconds,
            missedCardIds: deckStudyMissed,
          }),
        });
      } catch {}
    }
    setView("deck-report");
  };

  const saveDeck = async (deckId: string) => {
    if (!user) return;
    try {
      await fetch(`/api/decks/${deckId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      fetchSavedDecks();
    } catch {}
  };

  const duplicateDeck = async (deckId: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/decks/${deckId}/duplicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (res.ok) {
        fetchMyDecks();
        alert(t("flashcards.deckCopied"));
      }
    } catch {}
  };

  const reportDeck = async (deckId: string, reason: string) => {
    if (!user) return;
    try {
      await fetch("/api/deck-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reporterId: user.id, targetType: "deck", targetId: deckId, reason }),
      });
      alert(t("flashcards.reportSubmitted"));
    } catch {}
  };

  const fetchCustomCards = useCallback(async () => {
    if (!user) return;
    setCustomCardsLoading(true);
    try {
      const res = await fetch(`/api/user-flashcards/${user.id}`);
      if (res.ok) setCustomCards(await res.json());
    } catch {} finally {
      setCustomCardsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && (view === "mycards" || view === "mycards-study")) fetchCustomCards();
  }, [user, view, fetchCustomCards]);

  const handleValidateAndSave = async () => {
    if (!user || !newQuestion.trim() || !newAnswer.trim()) return;
    setValidating(true);
    setValidationResult(null);
    try {
      const valRes = await fetch("/api/user-flashcards/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      const valData = await valRes.json();
      setValidationResult(valData);

      if (!valData.accurate) {
        setValidating(false);
        return;
      }

      setSaving(true);
      const saveRes = await fetch("/api/user-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, question: newQuestion, answer: newAnswer, category: newCategory }),
      });

      if (saveRes.ok) {
        setNewQuestion("");
        setNewAnswer("");
        setNewCategory("My Cards");
        setValidationResult(null);
        fetchCustomCards();
      } else {
        const err = await saveRes.json();
        if (err.upgradeRequired) {
          setValidationResult({ accurate: false, feedback: err.error });
        } else {
          setValidationResult({ accurate: false, feedback: err.error || t("flashcards.failedToSave") });
        }
      }
    } catch {
      setValidationResult({ accurate: false, feedback: t("flashcards.networkError") });
    } finally {
      setValidating(false);
      setSaving(false);
    }
  };

  const handleUpdateCard = async () => {
    if (!user || !editingCard) return;
    setValidating(true);
    setValidationResult(null);
    try {
      const valRes = await fetch("/api/user-flashcards/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: editingCard.question, answer: editingCard.answer }),
      });
      const valData = await valRes.json();
      if (!valData.accurate) {
        setValidationResult(valData);
        setValidating(false);
        return;
      }

      const res = await fetch(`/api/user-flashcards/${editingCard.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, question: editingCard.question, answer: editingCard.answer, category: editingCard.category }),
      });
      if (res.ok) {
        setEditingCard(null);
        setValidationResult(null);
        fetchCustomCards();
      }
    } catch {} finally {
      setValidating(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!user || !confirm(t("flashcards.confirmDeleteFlashcard"))) return;
    try {
      const res = await fetch(`/api/user-flashcards/${cardId}?userId=${user.id}`, { method: "DELETE" });
      if (res.ok) setCustomCards(prev => prev.filter(c => c.id !== cardId));
    } catch {}
  };

  useEffect(() => {
    setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
  }, []);

  const categories = useMemo(() => Array.from(new Set(allCards.map(c => c.category))), []);
  const categoryLabelMap: Record<string, string> = {
    "Cardiovascular": t("flashcards.categoryCardiovascular"),
    "Pediatrics": t("flashcards.categoryPediatrics"),
    "Oncology": t("flashcards.categoryOncology"),
    "Neurological": t("flashcards.categoryNeurological"),
    "Pharmacology": t("flashcards.categoryPharmacology"),
    "Respiratory": t("flashcards.categoryRespiratory"),
    "GI": t("flashcards.categoryGI"),
    "Skin": t("flashcards.categorySkin"),
    "Infection": t("flashcards.categoryInfection"),
    "GU / Renal": t("flashcards.categoryGURenal"),
    "Musculoskeletal": t("flashcards.categoryMusculoskeletal"),
    "Maternal": t("flashcards.categoryMaternal"),
    "Psychiatry": t("flashcards.categoryPsychiatry"),
    "Hematology": t("flashcards.categoryHematology"),
  };
  const catLabel = (cat: string) => categoryLabelMap[cat] || cat;

  const sessionCards = useMemo(() => {
    let filtered = allCards;
    if (!includeMastered) {
      filtered = filtered.filter(c => !mastered.includes(c.id));
    }
    if (selectedType !== "all") {
      filtered = filtered.filter(c => c.type === selectedType);
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(c => selectedCategories.includes(c.category));
    }
    return filtered;
  }, [selectedType, selectedCategories, mastered, includeMastered]);

  const bookmarkedCards = useMemo(() => {
    return allCards.filter(c => bookmarks.includes(c.id));
  }, [bookmarks]);

  const masteredCards = useMemo(() => {
    return allCards.filter(c => mastered.includes(c.id));
  }, [mastered]);

  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem("nursenest-bookmarks", JSON.stringify(newBookmarks));
  };

  const toggleMastered = (id: string) => {
    const newMastered = mastered.includes(id)
      ? mastered.filter(m => m !== id)
      : [...mastered, id];
    setMastered(newMastered);
    localStorage.setItem("nursenest-mastered", JSON.stringify(newMastered));
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight" data-testid="text-flashcard-heading">{t("flashcards.title")}</h1>
            <p className="text-gray-600" data-testid="text-flashcard-subheading">{t("flashcards.subtitle")}</p>
            {user?.tier === "admin" && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs mt-3"
                onClick={() => setLocation("/content-editor")}
                data-testid="button-admin-manage-flashcards"
              >
                <Pencil className="w-3 h-3" />
                {t("flashcards.manageContent")}
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl bg-white p-8 rounded-3xl">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">{t("flashcards.configuration")}</CardTitle>
                </div>
              </CardHeader>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">{t("flashcards.cardType")}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["all", "term", "question"] as const).map(ct => (
                      <Button 
                        key={ct}
                        variant={selectedType === ct ? "default" : "outline"}
                        onClick={() => setSelectedType(ct)}
                        className="rounded-xl capitalize"
                      >
                        {ct === "all" ? t("flashcards.mixed") : `${ct}s`}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">{t("flashcards.topics")}</label>
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
                        {catLabel(cat)}
                      </Button>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedCategories([])}
                      className="text-[10px] text-gray-400 hover:text-gray-600"
                    >
                      {t("flashcards.clearAll")}
                    </Button>
                  </div>
                </div>

                {mastered.length > 0 && (
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeMastered}
                        onChange={(e) => setIncludeMastered(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        data-testid="checkbox-include-mastered"
                      />
                      <span className="text-sm text-gray-600">{t("flashcards.includeMastered")} ({mastered.length})</span>
                    </label>
                  </div>
                )}

                <div className="pt-4">
                  <Button 
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
                    onClick={startSession}
                    disabled={sessionCards.length === 0}
                  >
                    {t("flashcards.startSession")} ({sessionCards.length} {t("flashcards.cards")})
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card 
                className="border-none shadow-lg bg-gradient-to-br from-primary/90 to-primary text-white p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => setView("bookmarks")}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-white/80" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("flashcards.flaggedForReview")}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {bookmarks.length > 0 ? `${bookmarks.length} ${t("flashcards.flaggedDesc")}` : t("flashcards.flaggedEmpty")}
                </p>
              </Card>

              <Card 
                className="border-none shadow-lg bg-gradient-to-br from-primary/70 to-primary/50 text-gray-900 p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => setView("mastered")}
                data-testid="card-mastered"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gray-900/70" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-900/30 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("flashcards.masteredCards")}</h3>
                <p className="text-gray-900/60 text-sm leading-relaxed">
                  {mastered.length > 0 ? `${mastered.length} ${t("flashcards.masteredDesc")}` : t("flashcards.masteredEmpty")}
                </p>
              </Card>

              <Card 
                className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => { setView("mycards"); fetchCustomCards(); }}
                data-testid="card-mycards"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                      {user ? t("flashcards.freeForEveryone") : t("flashcards.signInToStart")}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("flashcards.myFlashcards")}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("flashcards.myFlashcardsDesc")}
                </p>
              </Card>

              <Card 
                className="border-none shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => { setView("decks"); fetchMyDecks(); fetchPublicDecks(); fetchEntitlement(); }}
                data-testid="card-study-decks"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                      {t("flashcards.studyDecks")}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("flashcards.studyDecks")}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("flashcards.studyDecksDesc")}
                </p>
              </Card>

              {dbFlashcardSets.length > 0 && (
                <Card 
                  className="border-none shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform group"
                  onClick={() => setView("admin-sets")}
                  data-testid="card-admin-flashcard-sets"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white/80" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
                        {dbFlashcardSets.length} {dbFlashcardSets.length === 1 ? "Set" : "Sets"}
                      </span>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2" data-testid="text-admin-sets-title">Additional Study Sets</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Curated flashcard sets created by our clinical education team
                  </p>
                </Card>
              )}

              <Card className="border-none shadow-md bg-white p-6 rounded-3xl border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <History className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-gray-900">{t("flashcards.examStrategy")}</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t("flashcards.examTip1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t("flashcards.examTip2")}</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t("flashcards.examTip3")}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "mycards") {
    const filteredCards = customCards.filter(c => {
      if (!customSearch) return true;
      const s = customSearch.toLowerCase();
      return c.question.toLowerCase().includes(s) || c.answer.toLowerCase().includes(s) || c.category.toLowerCase().includes(s);
    });
    const customCategories = Array.from(new Set(customCards.map(c => c.category)));

    if (!user) {
      return (
        <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
          <Navigation />
          <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
            <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")} data-testid="button-back-mycards">
              <ArrowLeft className="w-4 h-4" />
              {t("flashcards.backToConfig")}
            </Button>
            <Card className="border-none shadow-xl bg-white p-12 rounded-3xl text-center">
              <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("flashcards.signInToCreate")}</h2>
              <p className="text-gray-500 mb-6">{t("flashcards.signInDesc")}</p>
              <Button className="rounded-xl" onClick={() => setLocation("/signup")} data-testid="button-signup-mycards">{t("flashcards.createFreeAccount")}</Button>
            </Card>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
          <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")} data-testid="button-back-mycards">
            <ArrowLeft className="w-4 h-4" />
            {t("flashcards.backToConfig")}
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-mycards-title">{t("flashcards.myFlashcards")}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {!isPaid ? `${customCards.length} / ${FREE_LIMIT} ${t("flashcards.cardsUsed")}` : `${customCards.length} ${t("flashcards.cardsCreated")}`}
                {!isPaid && customCards.length >= FREE_LIMIT && (
                  <span className="text-amber-600 ml-2 font-medium">- {t("flashcards.upgradeUnlimited")}</span>
                )}
              </p>
            </div>
            {customCards.length >= 2 && (
              <Button
                className="rounded-xl gap-2"
                onClick={() => { setMyCardsStudyIndex(0); setMyCardsFlipped(false); setView("mycards-study"); }}
                data-testid="button-study-mycards"
              >
                <BookOpen className="w-4 h-4" />
                {t("flashcards.study")} ({customCards.length})
              </Button>
            )}
          </div>

          <Card className="border-none shadow-xl bg-white p-8 rounded-3xl mb-8" data-testid="card-create-flashcard">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-gray-900">{editingCard ? t("flashcards.editCard") : t("flashcards.createNewCard")}</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium ml-auto">{t("flashcards.accuracyVerified")}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">{t("flashcards.frontLabel")}</label>
                <Input
                  placeholder="e.g., What are the signs of right-sided heart failure?"
                  value={editingCard ? editingCard.question : newQuestion}
                  onChange={(e) => editingCard ? setEditingCard({ ...editingCard, question: e.target.value }) : setNewQuestion(e.target.value)}
                  className="rounded-xl"
                  data-testid="input-flashcard-question"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">{t("flashcards.backLabel")}</label>
                <Textarea
                  placeholder="e.g., Peripheral edema, jugular venous distension (JVD), hepatomegaly, weight gain, ascites"
                  value={editingCard ? editingCard.answer : newAnswer}
                  onChange={(e) => editingCard ? setEditingCard({ ...editingCard, answer: e.target.value }) : setNewAnswer(e.target.value)}
                  className="rounded-xl min-h-[100px]"
                  data-testid="input-flashcard-answer"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">{t("flashcards.category")}</label>
                <Input
                  placeholder="e.g., Cardiac, Pharmacology, Maternity"
                  value={editingCard ? editingCard.category : newCategory}
                  onChange={(e) => editingCard ? setEditingCard({ ...editingCard, category: e.target.value }) : setNewCategory(e.target.value)}
                  className="rounded-xl"
                  data-testid="input-flashcard-category"
                />
              </div>

              {validationResult && (
                <div className={cn(
                  "p-4 rounded-xl flex items-start gap-3",
                  validationResult.accurate ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                )} data-testid="text-validation-result">
                  {validationResult.accurate ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-semibold text-sm">{validationResult.accurate ? t("flashcards.medicallyAccurate") : t("flashcards.needsRevision")}</p>
                    <p className="text-xs mt-1">{validationResult.feedback}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {editingCard ? (
                  <>
                    <Button
                      className="rounded-xl gap-2 flex-1"
                      onClick={handleUpdateCard}
                      disabled={validating || !editingCard.question.trim() || !editingCard.answer.trim()}
                      data-testid="button-update-flashcard"
                    >
                      {validating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {validating ? t("flashcards.validating") : t("flashcards.validateAndUpdate")}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => { setEditingCard(null); setValidationResult(null); }}
                      data-testid="button-cancel-edit"
                    >
                      {t("common.cancel")}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="rounded-xl gap-2 w-full h-12"
                    onClick={handleValidateAndSave}
                    disabled={validating || saving || !newQuestion.trim() || !newAnswer.trim() || (!isPaid && customCards.length >= FREE_LIMIT)}
                    data-testid="button-create-flashcard"
                  >
                    {validating ? <RefreshCw className="w-4 h-4 animate-spin" /> : saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {validating ? t("flashcards.validating") : saving ? t("flashcards.saving") : t("flashcards.validateAndCreate")}
                  </Button>
                )}
              </div>

              {!isPaid && customCards.length >= FREE_LIMIT && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl" data-testid="text-upgrade-prompt">
                  <CreditCard className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">{t("flashcards.freeLimitReached")} ({FREE_LIMIT} {t("flashcards.cards")})</p>
                    <p className="text-xs text-amber-600 mt-0.5">{t("flashcards.upgradeForUnlimited")}</p>
                  </div>
                  <Button size="sm" className="rounded-xl ml-auto shrink-0" onClick={() => setLocation("/pricing")} data-testid="button-upgrade-mycards">{t("flashcards.upgrade")}</Button>
                </div>
              )}
            </div>
          </Card>

          {customCards.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={t("flashcards.searchCards")}
                    value={customSearch}
                    onChange={(e) => setCustomSearch(e.target.value)}
                    className="pl-10 rounded-xl"
                    data-testid="input-search-mycards"
                  />
                </div>
                {customCategories.length > 1 && (
                  <div className="flex gap-1 flex-wrap">
                    {customCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCustomSearch(customSearch === cat ? "" : cat)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                          customSearch === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                {filteredCards.map(card => (
                  <Card key={card.id} className="border border-gray-100 shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-custom-${card.id}`}>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{catLabel(card.category)}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1" data-testid={`text-question-${card.id}`}>{card.question}</h4>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2" data-testid={`text-answer-${card.id}`}>{card.answer}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-gray-400 hover:text-primary"
                            onClick={() => { setEditingCard(card); setValidationResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            data-testid={`button-edit-${card.id}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-gray-400 hover:text-red-500"
                            onClick={() => handleDeleteCard(card.id)}
                            data-testid={`button-delete-${card.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredCards.length === 0 && customSearch && (
                <p className="text-center text-gray-400 text-sm py-8">{t("flashcards.noCardsMatch")} "{customSearch}"</p>
              )}
            </>
          )}

          {customCards.length === 0 && !customCardsLoading && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("flashcards.noCardsYet")}</h3>
              <p className="text-gray-500 text-sm">{t("flashcards.noCardsDesc")}</p>
            </div>
          )}

          {customCardsLoading && (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-6 h-6 text-primary animate-spin" />
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "decks" || view === "browse-decks") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
          <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")} data-testid="button-back-decks">
            <ArrowLeft className="w-4 h-4" /> {t("flashcards.backToConfig")}
          </Button>
          <DeckHub
            user={user}
            isPaid={!!isPaid}
            setView={setView}
            setLocation={setLocation}
            myDecks={myDecks}
            setMyDecks={setMyDecks}
            publicDecks={publicDecks}
            savedDecksList={savedDecksList}
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            deckCards={deckCards}
            deckLoading={deckLoading}
            entitlement={entitlement}
            deckTab={deckTab}
            setDeckTab={setDeckTab}
            deckSearchQuery={deckSearchQuery}
            setDeckSearchQuery={setDeckSearchQuery}
            fetchMyDecks={fetchMyDecks}
            fetchPublicDecks={fetchPublicDecks}
            fetchSavedDecks={fetchSavedDecks}
            fetchDeckCards={fetchDeckCards}
            fetchEntitlement={fetchEntitlement}
            createDeck={createDeck}
            deleteDeck={deleteDeck}
            saveDeck={saveDeck}
            duplicateDeck={duplicateDeck}
            newDeckTitle={newDeckTitle}
            setNewDeckTitle={setNewDeckTitle}
            newDeckDescription={newDeckDescription}
            setNewDeckDescription={setNewDeckDescription}
            newDeckVisibility={newDeckVisibility}
            setNewDeckVisibility={setNewDeckVisibility}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "deck-view") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <DeckView
            user={user}
            isPaid={!!isPaid}
            setView={setView}
            setLocation={setLocation}
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            deckCards={deckCards}
            fetchDeckCards={fetchDeckCards}
            startDeckStudy={startDeckStudy}
            deleteDeck={deleteDeck}
            saveDeck={saveDeck}
            duplicateDeck={duplicateDeck}
            reportDeck={reportDeck}
            entitlement={entitlement}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "deck-edit") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <DeckEditor
            user={user}
            isPaid={!!isPaid}
            setView={setView}
            setLocation={setLocation}
            currentDeck={currentDeck}
            deckCards={deckCards}
            setDeckCards={setDeckCards}
            addCardToDeck={addCardToDeck}
            deleteDeckCard={deleteDeckCard}
            aiCheckCard={aiCheckCard}
            handleCsvImport={handleCsvImport}
            entitlement={entitlement}
            newCardFront={newCardFront}
            setNewCardFront={setNewCardFront}
            newCardBack={newCardBack}
            setNewCardBack={setNewCardBack}
            newCardRationale={newCardRationale}
            setNewCardRationale={setNewCardRationale}
            aiCheckResult={aiCheckResult}
            aiChecking={aiChecking}
            csvImportText={csvImportText}
            setCsvImportText={setCsvImportText}
            showCsvImport={showCsvImport}
            setShowCsvImport={setShowCsvImport}
            fetchDeckCards={fetchDeckCards}
            fetchEntitlement={fetchEntitlement}
            aiGeneratePrompt={aiGeneratePrompt}
            setAiGeneratePrompt={setAiGeneratePrompt}
            aiGenerateCount={aiGenerateCount}
            setAiGenerateCount={setAiGenerateCount}
            aiGenerating={aiGenerating}
            aiGeneratedCards={aiGeneratedCards}
            aiGenerateCards={aiGenerateCards}
            addAiGeneratedCards={addAiGeneratedCards}
            removeAiGeneratedCard={removeAiGeneratedCard}
            aiUpgradeRequired={aiUpgradeRequired}
            isPaid={!!isPaid}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "deck-study-learn") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <DeckStudyLearn
            user={user}
            setView={setView}
            currentDeck={currentDeck}
            deckStudyQueue={deckStudyQueue}
            deckStudyIndex={deckStudyIndex}
            deckStudyFlipped={deckStudyFlipped}
            setDeckStudyFlipped={setDeckStudyFlipped}
            deckStudyCorrect={deckStudyCorrect}
            deckStudyIncorrect={deckStudyIncorrect}
            handleDeckStudyAnswer={handleDeckStudyAnswer}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "deck-study-test") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <DeckStudyTest
            user={user}
            setView={setView}
            currentDeck={currentDeck}
            deckStudyQueue={deckStudyQueue}
            deckStudyIndex={deckStudyIndex}
            deckStudyFlipped={deckStudyFlipped}
            setDeckStudyFlipped={setDeckStudyFlipped}
            deckStudyCorrect={deckStudyCorrect}
            deckStudyIncorrect={deckStudyIncorrect}
            handleDeckStudyAnswer={handleDeckStudyAnswer}
            deckStudyStartTime={deckStudyStartTime}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "deck-report") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
          <DeckReportCard
            setView={setView}
            currentDeck={currentDeck}
            deckStudyCorrect={deckStudyCorrect}
            deckStudyIncorrect={deckStudyIncorrect}
            deckStudyQueue={deckStudyQueue}
            deckStudyStartTime={deckStudyStartTime}
            deckStudyMissed={deckStudyMissed}
            deckCards={deckCards}
            startDeckStudy={startDeckStudy}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "admin-sets") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
          <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")} data-testid="button-back-admin-sets">
            <ArrowLeft className="w-4 h-4" />
            {t("flashcards.backToConfig")}
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-admin-sets-heading">Additional Study Sets</h1>
            <p className="text-gray-600 mt-1">Curated flashcard sets from our clinical education team</p>
          </div>

          {dbSetsLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : dbFlashcardSets.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No study sets available yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbFlashcardSets.map((set: any) => {
                const blocks = Array.isArray(set.content) ? set.content : [];
                const flashcardBlocks = blocks.filter((b: any) => b.type === "flashcard" || (b.front && b.back));
                const cardCount = flashcardBlocks.length;
                return (
                  <Card
                    key={set.id}
                    className="border-none shadow-md hover:shadow-lg transition-all bg-white rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setActiveDbSet(set);
                      setDbStudyIndex(0);
                      setDbStudyFlipped(false);
                      setView("admin-set-study");
                    }}
                    data-testid={`card-admin-set-${set.id}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {set.category && (
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/5 rounded-full">
                            {set.category}
                          </span>
                        )}
                        {set.tier && set.tier !== "free" && (
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest px-2 py-0.5 bg-amber-50 rounded-full">
                            {set.tier}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors" data-testid={`text-set-title-${set.id}`}>
                        {set.title}
                      </h3>
                      {set.summary && (
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{set.summary}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          {cardCount > 0 ? `${cardCount} cards` : "Study set"}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "admin-set-study" && activeDbSet) {
    const blocks = Array.isArray(activeDbSet.content) ? activeDbSet.content : [];
    const flashcardItems = blocks.filter((b: any) => b.type === "flashcard" || (b.front && b.back));
    const currentFlashcard = flashcardItems[dbStudyIndex];

    if (flashcardItems.length === 0) {
      return (
        <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
          <Navigation />
          <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
            <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("admin-sets")} data-testid="button-back-set-study">
              <ArrowLeft className="w-4 h-4" />
              Back to Study Sets
            </Button>
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeDbSet.title}</h3>
              <p className="text-gray-400">No flashcards found in this set. Content may be structured as lesson blocks.</p>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-12 w-full flex-1">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="gap-2" onClick={() => setView("admin-sets")} data-testid="button-back-set-study">
              <ArrowLeft className="w-4 h-4" />
              Back to Study Sets
            </Button>
            <span className="text-sm text-gray-500 font-medium" data-testid="text-db-study-progress">
              {dbStudyIndex + 1} / {flashcardItems.length}
            </span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900" data-testid="text-db-set-title">{activeDbSet.title}</h2>
            {activeDbSet.category && (
              <span className="text-xs text-primary font-medium">{activeDbSet.category}</span>
            )}
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${((dbStudyIndex + 1) / flashcardItems.length) * 100}%` }} />
            </div>
          </div>

          <div 
            className="w-full h-[450px] relative cursor-pointer group perspective-1000"
            onClick={() => setDbStudyFlipped(!dbStudyFlipped)}
            data-testid="card-db-study-flip"
          >
            <div className={cn(
              "w-full h-full transition-all duration-700 [transform-style:preserve-3d]",
              dbStudyFlipped ? "[transform:rotateY(180deg)]" : ""
            )}>
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-8 sm:p-12 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-400/40" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-8">Front</span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight" data-testid="text-db-study-front">
                  {currentFlashcard?.front || currentFlashcard?.question || currentFlashcard?.title || ""}
                </h2>
                <div className="mt-12 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                  <RefreshCw className="w-4 h-4" />
                  {t("flashcards.tapToReveal")}
                </div>
              </Card>

              <Card className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-8">{t("flashcards.answer")}</h3>
                <p className="text-xl sm:text-2xl font-medium leading-relaxed max-w-lg" data-testid="text-db-study-back">
                  {currentFlashcard?.back || currentFlashcard?.answer || currentFlashcard?.content || ""}
                </p>
              </Card>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              disabled={dbStudyIndex === 0}
              onClick={() => { setDbStudyIndex(prev => prev - 1); setDbStudyFlipped(false); }}
              data-testid="button-db-study-prev"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("flashcards.previous")}
            </Button>
            <Button
              className="rounded-xl gap-2"
              disabled={dbStudyIndex === flashcardItems.length - 1}
              onClick={() => { setDbStudyIndex(prev => prev + 1); setDbStudyFlipped(false); }}
              data-testid="button-db-study-next"
            >
              {t("flashcards.next")}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          .backface-hidden { backface-visibility: hidden; }
          .perspective-1000 { perspective: 1000px; }
        `}} />
        <Footer />
      </div>
    );
  }

  if (view === "mycards-study") {
    if (customCards.length === 0) {
      setView("mycards");
      return null;
    }
    const studyCard = customCards[myCardsStudyIndex];
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-12 w-full flex-1">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="gap-2" onClick={() => setView("mycards")} data-testid="button-exit-study-mycards">
              <ArrowLeft className="w-4 h-4" />
              {t("flashcards.backToMyCards")}
            </Button>
            <span className="text-sm text-gray-500 font-medium" data-testid="text-study-progress">{myCardsStudyIndex + 1} / {customCards.length}</span>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${((myCardsStudyIndex + 1) / customCards.length) * 100}%` }} />
            </div>
          </div>

          <div 
            className="w-full h-[450px] relative cursor-pointer group perspective-1000"
            onClick={() => setMyCardsFlipped(!myCardsFlipped)}
            data-testid="card-study-flip"
          >
            <div className={cn(
              "w-full h-full transition-all duration-700 [transform-style:preserve-3d]",
              myCardsFlipped ? "[transform:rotateY(180deg)]" : ""
            )}>
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-8 sm:p-12 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-400/40" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-8">{studyCard?.category ? catLabel(studyCard.category) : ""}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight" data-testid="text-study-question">{studyCard?.question}</h2>
                <div className="mt-12 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                  <RefreshCw className="w-4 h-4" />
                  {t("flashcards.tapToReveal")}
                </div>
              </Card>

              <Card className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-8">{t("flashcards.answer")}</h3>
                <p className="text-xl sm:text-2xl font-medium leading-relaxed max-w-lg" data-testid="text-study-answer">{studyCard?.answer}</p>
              </Card>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              disabled={myCardsStudyIndex === 0}
              onClick={() => { setMyCardsStudyIndex(prev => prev - 1); setMyCardsFlipped(false); }}
              data-testid="button-study-prev"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("flashcards.previous")}
            </Button>
            <Button
              className="rounded-xl gap-2"
              disabled={myCardsStudyIndex === customCards.length - 1}
              onClick={() => { setMyCardsStudyIndex(prev => prev + 1); setMyCardsFlipped(false); }}
              data-testid="button-study-next"
            >
              {t("flashcards.next")}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          .backface-hidden { backface-visibility: hidden; }
          .perspective-1000 { perspective: 1000px; }
        `}} />
        <Footer />
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
            {t("flashcards.backToConfig")}
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t("flashcards.flaggedForReview")}</h1>
              <p className="text-gray-600">{t("flashcards.reviewingFlagged")}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-rose-500 hover:text-rose-600 border-rose-100 bg-rose-50"
              onClick={() => {
                if(confirm(t("flashcards.confirmClearBookmarks"))) {
                  setBookmarks([]);
                  localStorage.removeItem("nursenest-bookmarks");
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("flashcards.clearFolder")}
            </Button>
          </div>

          {bookmarkedCards.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <Bookmark className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">{t("flashcards.noBookmarks")}</p>
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
                  <div className="text-xs text-gray-400 mb-4">{catLabel(card.category)}</div>
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
                    {t("flashcards.studyThisCard")}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  if (view === "mastered") {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
          <Button variant="ghost" className="mb-8 gap-2" onClick={() => setView("setup")} data-testid="button-back-mastered">
            <ArrowLeft className="w-4 h-4" />
            {t("flashcards.backToConfig")}
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t("flashcards.masteredCards")}</h1>
              <p className="text-gray-600">{t("flashcards.masteredCardsDesc")}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-rose-500 hover:text-rose-600 border-rose-100 bg-rose-50"
              data-testid="button-clear-mastered"
              onClick={() => {
                if(confirm(t("flashcards.confirmClearMastered"))) {
                  setMastered([]);
                  localStorage.removeItem("nursenest-mastered");
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("flashcards.clearAll")}
            </Button>
          </div>

          {masteredCards.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <Trophy className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">{t("flashcards.noMastered")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masteredCards.map(card => (
                <Card key={card.id} className="border-none shadow-sm hover:shadow-md transition-all bg-white p-6 rounded-2xl flex flex-col" data-testid={`card-mastered-${card.id}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded-full">
                      {card.type}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => toggleMastered(card.id)} className="text-emerald-500" data-testid={`button-unmaster-${card.id}`}>
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 flex-1">{card.question}</h4>
                  <div className="text-xs text-gray-400 mb-4">{catLabel(card.category)}</div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full rounded-xl"
                    onClick={() => {
                      setSelectedCategories([card.category]);
                      setSelectedType(card.type);
                      setIncludeMastered(true);
                      startSession();
                    }}
                    data-testid={`button-study-mastered-${card.id}`}
                  >
                    {t("flashcards.studyThisCard")}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{t("flashcards.sessionComplete")}</h1>
          <p className="text-gray-600 mb-12">{t("flashcards.performanceToday")}</p>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <Card className="border-none shadow-md bg-white p-8 rounded-3xl text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t("flashcards.accuracy")}</p>
              <p className="text-4xl font-black text-primary">{score}%</p>
            </Card>
            <Card className="border-none shadow-md bg-white p-8 rounded-3xl text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t("flashcards.totalCards")}</p>
              <p className="text-4xl font-black text-gray-900">{sessionCards.length}</p>
            </Card>
          </div>

          <div className="space-y-4">
            <Button className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => setView("setup")}>
              {t("flashcards.newSession")}
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => setView("bookmarks")}>
              {t("flashcards.reviewBookmarks")}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-warmwhite flex flex-col font-sans ${user?.tier !== "admin" ? "select-none" : ""} print:hidden`}>
      <SEO
        title="Nursing Flashcards - Interactive Quiz & Study Cards"
        description="Master nursing pathophysiology with interactive flashcards covering cardiovascular, respiratory, neurological, pharmacology, and more. Practice NCLEX-style questions with instant feedback and progress tracking."
        keywords="nursing flashcards, NCLEX flashcards, nursing quiz, pathophysiology study cards, nursing exam practice, clinical nursing questions, pharmacology flashcards"
        canonicalPath="/flashcards"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          "name": "NurseNest Nursing Flashcards",
          "description": "Interactive nursing flashcards with quiz-style questions for NCLEX and clinical exam preparation.",
          "url": "https://www.nursenest.ca/flashcards",
          "learningResourceType": "Flashcard",
          "educationalLevel": "College",
          "about": { "@type": "Thing", "name": "Nursing Education" }
        }}
      />
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t("flashcards.activeSession")}</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <ShieldAlert className="w-3 h-3" />
              {t("flashcards.captureRestricted")}
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {currentCard.type} {t("flashcards.mode")}
            </div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-5 gap-8 flex-1 items-start">
          <div className="lg:col-span-1 space-y-4">
             <Card className="border-none shadow-sm bg-white p-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("flashcards.sessionProgress")}</p>
               <p className="text-2xl font-bold text-primary">{currentIndex + 1} <span className="text-gray-300 text-lg">/ {sessionCards.length}</span></p>
               <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div 
                   className="bg-primary h-full transition-all duration-500" 
                   style={{ width: `${((currentIndex + 1) / sessionCards.length) * 100}%` }}
                 />
               </div>
             </Card>
             <Card className="border-none shadow-sm bg-indigo-50 p-4 border border-indigo-100">
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">{t("flashcards.topic")}</p>
               <p className="text-sm font-bold text-indigo-900">{catLabel(currentCard.category)}</p>
             </Card>
             <Button 
                variant="outline" 
                className={cn(
                  "w-full rounded-xl gap-2 h-12 transition-all",
                  bookmarks.includes(currentCard.id) ? "bg-indigo-50 text-indigo-600 border-indigo-200" : ""
                )}
                onClick={() => toggleBookmark(currentCard.id)}
                data-testid="button-bookmark"
              >
                {bookmarks.includes(currentCard.id) ? (
                  <><BookmarkCheck className="w-4 h-4 fill-current" /> {t("flashcards.savedForReview")}</>
                ) : (
                  <><Bookmark className="w-4 h-4" /> {t("flashcards.saveForReview")}</>
                )}
              </Button>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full rounded-xl gap-2 h-12 transition-all",
                  mastered.includes(currentCard.id) ? "bg-emerald-50 text-emerald-600 border-emerald-200" : ""
                )}
                onClick={() => toggleMastered(currentCard.id)}
                data-testid="button-mastered"
              >
                {mastered.includes(currentCard.id) ? (
                  <><CheckCircle2 className="w-4 h-4 fill-current" /> {t("flashcards.mastered")}</>
                ) : (
                  <><Trophy className="w-4 h-4" /> {t("flashcards.markAsMastered")}</>
                )}
              </Button>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {currentCard.type === "question" ? (
              <Card className="border-none shadow-xl bg-white overflow-hidden rounded-3xl min-h-[500px] flex flex-col animate-in slide-in-from-right-4 duration-300">
                <div className="grid md:grid-cols-2 flex-1">
                  <div className="bg-gray-50 flex flex-col items-center justify-center p-8 border-r border-gray-100 relative overflow-hidden">
                    {(currentCard.image || getCategoryImage(currentCard.category || "")) ? (
                      <ProtectedImage 
                        src={currentCard.image || getCategoryImage(currentCard.category || "") || ""} 
                        alt={`Clinical flashcard illustration for ${catLabel(currentCard.category || "nursing")}  -  NurseNest`}
                        title={`NurseNest ${catLabel(currentCard.category || "Nursing")} Flashcard`}
                        className="w-64 h-64 object-contain rounded-2xl shadow-sm"
                        data-testid={`img-flashcard-${currentCard.id}`}
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
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{t("flashcards.rationale")}</p>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{currentCard.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <Button variant="ghost" onClick={() => setView("setup")} className="text-gray-400">{t("flashcards.exitSession")}</Button>
                  <Button variant="ghost" onClick={handleNext} className="text-primary gap-2">{t("flashcards.nextCard")} <ChevronRight className="w-4 h-4" /></Button>
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
                  <Card className="absolute inset-0 w-full h-full backface-hidden bg-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-6 sm:p-12 text-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary/20" />
                    {(currentCard.image || getCategoryImage(currentCard.category || "")) && (
                      <ProtectedImage
                        src={currentCard.image || getCategoryImage(currentCard.category || "") || ""}
                        alt={`${currentCard.category} illustration`}
                        className="w-20 h-20 object-contain rounded-xl mb-4 opacity-60"
                        data-testid={`img-term-${currentCard.id}`}
                      />
                    )}
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-8">{t("flashcards.clinicalTerminology")}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">{currentCard.question}</h2>
                    <div className="mt-12 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                      <RefreshCw className="w-4 h-4" />
                      {t("flashcards.tapToDefine")}
                    </div>
                  </Card>

                  {/* Back: Definition */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] bg-primary text-white border-none shadow-xl rounded-[40px] flex flex-col items-center justify-center p-6 sm:p-12 text-center">
                    <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-8">{t("flashcards.clinicalDefinition")}</h3>
                    <p className="text-2xl font-medium leading-relaxed max-w-lg">{currentCard.answer}</p>
                    <div className="mt-12 pt-8 border-t border-white/10 w-full flex justify-center gap-8">
                       <Button variant="ghost" className="text-white hover:bg-white/10" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                         {t("flashcards.gotIt")} <ChevronRight className="w-4 h-4 ml-2" />
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
      <AdminEditButton />
      <Footer />
    </div>
  );
}
