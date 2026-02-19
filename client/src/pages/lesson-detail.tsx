import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Microscope, 
  AlertCircle, 
  Stethoscope, 
  Pill, 
  Lightbulb, 
  FileText,
  CheckCircle2,
  XCircle,
  Trophy,
  Activity,
  Heart,
  Droplets,
  Brain,
  Wind,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  quiz: { question: string; options: string[]; correct: number; rationale: string }[];
};

const contentMap: Record<string, LessonContent> = {
  "respiratory-basics": {
    title: "Hypoxia & Breath Sounds Masterclass",
    cellular: {
      title: "Early vs Late Hypoxia Recognition",
      content: "REX-PN strongly tests early recognition. Waiting for cyanosis is a critical exam error. \n\nEarly Hypoxia: Restlessness, Anxiety, Tachycardia, Tachypnea. \n\nLate Hypoxia: Cyanosis, Bradycardia, Decreased LOC (Confusion), Respiratory failure signs."
    },
    signs: {
      left: ["Restlessness & Anxiety (Early)", "Tachycardia & Tachypnea (Early)", "Nasal Flaring & Retractions", "Accessory Muscle Use"],
      right: ["Cyanosis (Late/Danger)", "Bradycardia (Late/Danger)", "Decreased LOC (Late/Danger)", "Acidosis (Hypoventilation)"]
    },
    medications: [
      { name: "Oxygen Therapy", type: "Medication", action: "Restores cellular oxygenation", sideEffects: "Dryness, fire hazard", contra: "Untitrated COPD", pearl: "Oxygen is a medication! It requires an order and clinical response monitoring." }
    ],
    pearls: [
      "🚨 Waiting for cyanosis = exam error",
      "Sound Meaning: Crackles = Fluid; Wheeze = Narrowing; Absent = Emergency",
      "Work of Breathing: Inability to speak full sentences is a high-priority finding",
      "Acid-Base: Hypoventilation leads to Respiratory Acidosis (CO2 retention)"
    ],
    quiz: [
      { question: "Which is an EARLY sign of hypoxia?", options: ["Cyanosis", "Bradycardia", "Restlessness", "Decreased LOC"], correct: 2, rationale: "Restlessness and anxiety are the first signs of cellular oxygen deprivation." },
      { question: "Hypoventilation (shallow breathing) leads to which acid-base state?", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis", "Normal state"], correct: 1, rationale: "Hypoventilation causes CO2 retention, which leads to acidosis." }
    ]
  },
  "respiratory-pharma": {
    title: "Respiratory Pharmacology Masterclass",
    cellular: {
      title: "Bronchodilation & Delivery Safety",
      content: "Respiratory meds work by stimulating Beta-2 receptors (Bronchodilators) or decreasing inflammation (Steroids). Oxygen delivery devices are categorized by flow: Nasal Cannula (Low-flow) vs. Mask Systems (Higher concentration)."
    },
    signs: {
      left: ["Assess Breath Sounds", "Monitor O2 Saturation", "Assess Work of Breathing", "Monitor for Tachycardia"],
      right: ["Nasal Cannula (Low support)", "Simple Mask (Mid support)", "Non-Rebreather (High support)", "Oral Thrush (Steroids)"]
    },
    medications: [
      { name: "Albuterol (Rescue)", type: "SABA", action: "Rapid airway opening", sideEffects: "Tachycardia, Tremors", contra: "Severe cardiac disease", pearl: "The FIRST drug used in an acute attack. Always carry it." },
      { name: "Fluticasone (Maintenance)", type: "Inhaled Steroid", action: "Reduces chronic inflammation", sideEffects: "Oral Thrush", contra: "Fungal infection", pearl: "Rinse mouth after EVERY use to prevent candidiasis." },
      { name: "Salmeterol", type: "LABA", action: "Long-term control", sideEffects: "Headache", contra: "Acute rescue", pearl: "NEVER use for a sudden attack. Maintenance only." }
    ],
    pearls: [
      "B before C: Bronchodilator opens the door, Corticosteroid walks through",
      "Wait 1-5 mins between puffs of the same or different inhalers",
      "Safety: No smoking or open flames near oxygen therapy"
    ],
    quiz: [
      { question: "Order of administration for Albuterol and a Steroid inhaler?", options: ["Steroid then Albuterol", "Albuterol then Steroid", "Together", "Order doesn't matter"], correct: 1, rationale: "Albuterol (Bronchodilator) opens the airway first to allow the steroid to reach deeper tissues." }
    ]
  },
  "copd": {
    title: "COPD (Chronic Obstructive Pulmonary Disease)",
    cellular: {
      title: "CO2 Retention & Hypoxic Drive",
      content: "Chronic inflammation leads to alveolar destruction (emphysema) and airway narrowing (bronchitis). At the cellular level, these patients live in a state of chronic CO2 retention. Their primary drive to breathe shifts from high CO2 to low O2 (Hypoxic Drive)."
    },
    signs: {
      left: ["Barrel Chest", "Clubbing of fingers", "Productive Cough", "Exertional Dyspnea"],
      right: ["🚨 Drowsiness (CO2 Narcosis)", "🚨 Confusion", "🚨 Worsening Dyspnea", "SpO2 88-92% (Normal for them)"]
    },
    medications: [
      { name: "Albuterol", type: "Bronchodilator", action: "Rescue airway opening", sideEffects: "Tachycardia", contra: "None in emergency", pearl: "Used for acute symptom relief." },
      { name: "Fluticasone", type: "Corticosteroid", action: "Reduces chronic inflammation", sideEffects: "Thrush", contra: "Acute attack", pearl: "Rinse mouth after use!" }
    ],
    pearls: [
      "SpO2 88-92% is often the target range",
      "Pursed-lip breathing helps expel CO2",
      "Increasing drowsiness = CO2 retention/narcosis"
    ],
    quiz: [
      { question: "Target SpO2 range for a chronic COPD patient?", options: ["95-100%", "92-96%", "88-92%", "80-85%"], correct: 2, rationale: "COPD patients often require a lower target range to maintain their hypoxic drive to breathe." }
    ]
  },
  "asthma": {
    title: "Asthma",
    cellular: {
      title: "Bronchoconstriction & Inflammation",
      content: "Reversible airway narrowing caused by smooth muscle contraction and mucus production. At the cellular level, an allergen triggers mast cells to release histamine, leading to rapid inflammation and limited airflow."
    },
    signs: {
      left: ["Wheezing on expiration", "Chest Tightness", "Dyspnea", "Cough"],
      right: ["🚨 Silent Chest (No air movement)", "🚨 Tachypnea", "🚨 Accessory muscle use", "Inability to speak sentences"]
    },
    medications: [
      { name: "Albuterol (Ventolin)", type: "SABA (Rescue)", action: "Rapid bronchodilation", sideEffects: "Tremors, Tachycardia", contra: "None in acute distress", pearl: "The 'Rescue' inhaler. Carry at all times." },
      { name: "Ipratropium", type: "Anticholinergic", action: "Reduces mucus/bronchospasm", sideEffects: "Dry mouth", contra: "Soy/Peanut allergy (some forms)", pearl: "Often used with Albuterol (DuoNeb)." }
    ],
    pearls: [
      "Avoid triggers (dust, pollen, smoke)",
      "Use peak flow meter to monitor",
      "Always use Bronchodilator BEFORE Steroid"
    ],
    quiz: [
      { question: "Which finding requires IMMEDIATE intervention in asthma?", options: ["Loud wheezing", "Productive cough", "Silent chest", "SpO2 94%"], correct: 2, rationale: "Silent chest means no air is moving at all—a true emergency." }
    ]
  },
  "pneumonia": {
    title: "Pneumonia",
    cellular: {
      title: "Alveolar Consolidation",
      content: "Infection causes the alveoli to fill with fluid, white blood cells, and debris (consolidation). This prevents gas exchange at the cellular level, leading to hypoxia and ventilation-perfusion mismatch."
    },
    signs: {
      left: ["Fever & Chills", "Productive Cough (Yellow/Green)", "Crackles or Diminished sounds", "Chest pain (Pleuritic)"],
      right: ["Hypoxia", "Tachypnea", "Confusion (especially in elderly)", "Fatigue"]
    },
    medications: [
      { name: "Ceftriaxone", type: "Antibiotic", action: "Kills bacteria", sideEffects: "Diarrhea", contra: "Penicillin allergy (cross-reactivity)", pearl: "Obtain sputum culture BEFORE starting antibiotics." },
      { name: "Guaifenesin", type: "Expectorant", action: "Thins mucus", sideEffects: "GI upset", contra: "None", pearl: "Encourage high fluid intake to help thin secretions." }
    ],
    pearls: [
      "Encourage incentive spirometry (10x/hour while awake)",
      "Hydration is key to thinning mucus",
      "Position 'Good lung down' if unilateral"
    ],
    quiz: [
      { question: "Priority action before starting pneumonia antibiotics?", options: ["Chest X-ray", "Sputum Culture", "Oxygen therapy", "Fluid bolus"], correct: 1, rationale: "Cultures must be obtained before antibiotics to ensure accurate results." }
    ]
  },
  "atelectasis": {
    title: "Atelectasis",
    cellular: {
      title: "Alveolar Collapse",
      content: "The collapse of small air sacs (alveoli) due to shallow breathing, mucus plugs, or external pressure. Common in post-operative patients due to pain and immobility. At the cellular level, gas exchange stops in the collapsed areas."
    },
    signs: {
      left: ["Diminished breath sounds", "Dyspnea", "Shallow respirations", "Low-grade fever (post-op)"],
      right: ["Crackles (as they re-open)", "Tachypnea", "Anxiety", "Hypoxia (if severe)"]
    },
    medications: [
      { name: "Pain Medication", type: "Analgesic", action: "Reduces pain to allow deep breaths", sideEffects: "Respiratory depression", contra: "Low RR", pearl: "Pre-medicate before incentive spirometry if needed." }
    ],
    pearls: [
      "Prevention: Turn, Cough, Deep Breathe (TCDB)",
      "Ambulation is the best prevention",
      "Incentive Spirometry: 10 times per hour"
    ],
    quiz: [
      { question: "Which patient is at highest risk for atelectasis?", options: ["Active teenager", "Post-op abdominal surgery", "Patient walking in hall", "Patient eating lunch"], correct: 1, rationale: "Post-op patients often breathe shallowly due to pain, leading to alveolar collapse." }
    ]
  },
  "peds-hypoxia": {
    title: "Pediatric Hypoxia & Work of Breathing",
    cellular: {
      title: "Pediatric Oxygenation Failure",
      content: "Children decompensate faster than adults. They maintain blood pressure until the very end, leading to sudden collapse. Recognition of subtle early signs is the key to REX-PN success. \n\nEarly Signs: Tachycardia (very sensitive), Tachypnea, Restlessness/Irritability, Nasal Flaring, Retractions. \n\nLate Signs: Bradycardia (VERY OMINOUS), Cyanosis, Lethargy, Decreased LOC."
    },
    signs: {
      left: ["Tachycardia (Early Sign)", "Restlessness/Irritability", "Nasal Flaring", "Intercostal/Subcostal Retractions"],
      right: ["🚨 Bradycardia (Emergency!)", "🚨 Grunting/Head Bobbing", "Cyanosis (Late Sign)", "Decreased LOC/Lethargy"]
    },
    medications: [
      { name: "Oxygen Therapy", type: "Supportive", action: "Restores O2 levels", sideEffects: "Dryness", contra: "None in acute distress", pearl: "Monitor effort, not just numbers. Children look 'okay' until they don't." }
    ],
    pearls: [
      "🚨 Bradycardia in a hypoxic child = code blue emergency",
      "Work of Breathing is MORE important than SpO2 alone",
      "Retractions indicate significant respiratory distress",
      "Nasal flaring is a classic pediatric compensation mechanism"
    ],
    quiz: [
      { question: "What is the most sensitive early sign of hypoxia in a child?", options: ["Cyanosis", "Bradycardia", "Tachycardia", "Decreased LOC"], correct: 2, rationale: "Tachycardia is a very sensitive early indicator of pediatric respiratory distress." },
      { question: "What does bradycardia indicate in a hypoxic child?", options: ["Recovery", "Sleepiness", "Imminent arrest", "Normal finding"], correct: 2, rationale: "Bradycardia is a very ominous late sign of hypoxia in children, indicating imminent respiratory/cardiac arrest." }
    ]
  },
  "bronchiolitis": {
    title: "Bronchiolitis (RSV)",
    cellular: {
      title: "Viral Airway Obstruction",
      content: "Commonly caused by RSV. Viral infection leads to inflammation and heavy mucus production in the smallest airways (bronchioles). This causes narrowing and obstruction, making breathing difficult for infants."
    },
    signs: {
      left: ["Tachypnea", "Wheezing/Crackles", "Retractions", "Nasal Flaring"],
      right: ["Feeding Difficulty", "🚨 Apnea Episodes", "Dehydration", "Irritability"]
    },
    medications: [
      { name: "Fluids (IV/PO)", type: "Supportive", action: "Maintains hydration", sideEffects: "Fluid overload", contra: "None", pearl: "Priority is hydration and airway maintenance. Antibiotics are NOT routine." }
    ],
    pearls: [
      "Commonly viral (RSV); antibiotics don't work",
      "Infants/Premature babies are at highest risk",
      "Assess work of breathing and feeding ability"
    ],
    quiz: [
      { question: "What is the priority for an infant with bronchiolitis?", options: ["Antibiotics", "Hydration & Airway", "Chest PT", "Steroids"], correct: 1, rationale: "Supportive care focused on hydration and monitoring work of breathing is the priority." }
    ]
  },
  "croup": {
    title: "Croup (Laryngotracheobronchitis)",
    cellular: {
      title: "Upper Airway Narrowing",
      content: "Inflammation of the upper airway (larynx/trachea) leads to subglottic swelling and narrowing. This creates the classic 'barking' cough and inspiratory stridor as air is forced through a tight space."
    },
    signs: {
      left: ["Barking Cough (Seal-like)", "Inspiratory Stridor", "Hoarseness", "Worse at night"],
      right: ["🚨 Stridor at Rest", "🚨 Increasing distress", "Agitation", "Tachypnea"]
    },
    medications: [
      { name: "Dexamethasone", type: "Steroid", action: "Reduces airway swelling", sideEffects: "Irritability", contra: "Viral infection (use with caution)", pearl: "Single dose is often effective." },
      { name: "Epinephrine (Nebulized)", type: "Vasoconstrictor", action: "Rapid reduction of swelling", sideEffects: "Tachycardia", contra: "None in emergency", pearl: "Watch for rebound swelling after 2 hours." }
    ],
    pearls: [
      "Cold night air or steam can help relieve symptoms",
      "Agitation worsens the obstruction—keep the child calm!",
      "Stridor at rest is a red flag for severe narrowing"
    ],
    quiz: [
      { question: "Classic finding of Croup?", options: ["Drooling", "Barking cough", "Sudden onset choking", "Absent breath sounds"], correct: 1, rationale: "A barky, seal-like cough is the hallmark sign of Croup." }
    ]
  },
  "epiglottitis": {
    title: "Epiglottitis (Airway Emergency)",
    cellular: {
      title: "Supraglottic Inflammation",
      content: "Severe, life-threatening inflammation of the epiglottis. The airway can become completely obstructed in minutes. This is a medical emergency that requires immediate recognition."
    },
    signs: {
      left: ["🚨 Drooling", "🚨 Tripod Positioning", "🚨 Dysphagia (Difficulty swallowing)", "🚨 Toxic Appearance"],
      right: ["High Fever", "Muffled Voice", "Inspiratory Stridor", "Severe Anxiety"]
    },
    medications: [
      { name: "Antibiotics (IV)", type: "Antibacterial", action: "Treats underlying infection", sideEffects: "Diarrhea", contra: "Allergy", pearl: "Airway MUST be secured before any other treatment." }
    ],
    pearls: [
      "🚨 DO NOT examine the throat aggressively (can trigger total closure)",
      "Keep child in whatever position is most comfortable (usually tripod)",
      "Emergency intubation equipment must be available"
    ],
    quiz: [
      { question: "What is a hallmark sign of Epiglottitis?", options: ["Barking cough", "Drooling & Tripod positioning", "Wheezing", "Coughing"], correct: 1, rationale: "The 4 Ds (Drooling, Dysphagia, Dysphonia, Distress) and tripod positioning are classic for epiglottitis." }
    ]
  },
  "fba": {
    title: "Foreign Body Aspiration (FBA)",
    cellular: {
      title: "Mechanical Obstruction",
      content: "Sudden inhalation of an object into the airway. Most commonly lodge in the right mainstem bronchus. Leads to sudden respiratory distress and localized lung collapse or infection."
    },
    signs: {
      left: ["🚨 Sudden onset distress", "🚨 Choking/Gagging", "🚨 Asymmetric breath sounds", "Wheezing (localized)"],
      right: ["Coughing", "Cyanosis (if severe)", "Anxiety", "Stridor (if upper airway)"]
    },
    medications: [
      { name: "None", type: "Mechanical Issue", action: "Requires removal", sideEffects: "N/A", contra: "N/A", pearl: "Airway is the absolute priority. Bronchoscopy may be needed for removal." }
    ],
    pearls: [
      "Sudden onset in a previously healthy child is the classic history",
      "Asymmetric breath sounds = object is blocking one side",
      "Perform BLS maneuvers (back blows/chest thrusts) if fully obstructed"
    ],
    quiz: [
      { question: "Hallmark sign of Foreign Body Aspiration?", options: ["Gradual onset fever", "Barking cough", "Sudden onset distress & asymmetry", "Drooling"], correct: 2, rationale: "Sudden onset of distress in a healthy child, especially with asymmetric breath sounds, is classic for FBA." }
    ]
  },
  "pe": {
    title: "Pulmonary Embolism (PE)",
    cellular: {
      title: "Ventilation-Perfusion (V/Q) Mismatch",
      content: "A clot blocks blood flow to a section of the lung. While air can still enter (ventilation), blood cannot reach the area (perfusion). This V/Q mismatch means gas exchange cannot occur at the cellular interface of the alveoli, causing rapid hypoxia."
    },
    signs: {
      left: ["Sudden Onset Dyspnea", "Sharp Chest Pain", "Tachycardia", "Apprehension"],
      right: ["Cough", "Hemoptysis", "Tachypnea", "Low O2 Saturation"]
    },
    medications: [
      { name: "Heparin", type: "Anticoagulant", action: "Prevents clot growth", sideEffects: "Bleeding, HIT", contra: "Active bleed", pearl: "Monitor aPTT levels (Normal: 30-40s; Goal: 1.5-2.5x normal)." },
      { name: "Enoxaparin (Lovenox)", type: "LMWH", action: "Anticoagulation", sideEffects: "Bleeding", contra: "Renal failure (adjust dose)", pearl: "Inject in love handles, do not rub injection site!" },
      { name: "Warfarin (Coumadin)", type: "Anticoagulant", action: "Vitamin K antagonist", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Monitor INR (Goal 2.0-3.0). Antidote: Vitamin K." }
    ],
    pearls: ["SUDDEN dyspnea is the red flag", "DVT prevention is PE prevention", "Elevate HOB immediately"],
    quiz: [
      { question: "What is the most common classic symptom of PE?", options: ["Fever", "Sudden shortness of breath", "Productive cough", "Bradycardia"], correct: 1, rationale: "Sudden onset dyspnea is the most common presenting symptom of PE." }
    ]
  },
  "cardio-pharma": {
    title: "Cardiovascular Pharmacology Masterclass",
    cellular: {
      title: "Cardiac Drug Mechanisms",
      content: "Cardiovascular drugs primarily target the autonomic nervous system, the RAAS system, and cellular ion channels (Na, K, Ca). For the REX-PN, you must understand how these drugs change the 'Squeeze' (Inotropy), the 'Rate' (Chronotropy), and the 'Fluid Status' (Diuresis)."
    },
    signs: {
      left: ["Assess Heart Rate (Apical)", "Assess Blood Pressure", "Monitor Potassium (K+)", "Monitor Digoxin Levels"],
      right: ["Check for Peripheral Edema", "Assess Lung Sounds (Crackles)", "Monitor I&O", "Assess for Orthostatic Hypotension"]
    },
    medications: [
      { name: "Diuretics (Furosemide/Lasix)", type: "Loop Diuretic", action: "Inhibits Na/Cl reabsorption in Loop of Henle", sideEffects: "Hypotension, Electrolyte loss (K+, Na+, Mg+), Ototoxicity", contra: "Anuria, severe electrolyte depletion", pearl: "K-wasting! Watch for leg cramps and weak pulses. Potassium risks are extremely high yield for REX-PN." },
      { name: "ACE Inhibitors (Lisinopril)", type: "ACE Inhibitor", action: "Prevents Angiotensin II formation", sideEffects: "Hypotension, Hyperkalemia, Persistent Dry Cough", contra: "Pregnancy, history of angioedema", pearl: "Report facial swelling or a persistent dry cough immediately! Monitor for Hyperkalemia." },
      { name: "Beta Blockers (Metoprolol)", type: "Beta Blocker", action: "Decreases sympathetic workload (HR/BP)", sideEffects: "Bradycardia, Fatigue, Bronchospasm", contra: "Asthma/COPD (due to bronchospasm risk), Heart Block", pearl: "Hold if HR < 60. Masks hypoglycemia! HR reduction expectations must be monitored closely." },
      { name: "Antihypertensives (General)", type: "Vasodilators/CCBs", action: "Relax vascular smooth muscle to lower BP", sideEffects: "Hypotension, Dizziness, Perfusion effects", contra: "Severe Hypotension", pearl: "Safety priority: Fall risk! Patients should change positions slowly to prevent orthostatic hypotension." },
      { name: "Digoxin", type: "Inotrope", action: "Increases squeeze, slows rate", sideEffects: "Bradycardia, Visual halos, Nausea", contra: "Hypokalemia (increases toxicity risk)", pearl: "Apical pulse for 1 full minute. Toxicity presents as N/V and vision changes." }
    ],
    pearls: ["Always check BP/HR before administration", "Potassium balance is the #1 safety priority", "Move from lying to sitting slowly (Orthostatic/Fall risk)"],
    quiz: [
      { question: "A patient on Furosemide reports leg cramps. What is the priority nursing action?", options: ["Administer pain meds", "Assess Potassium level", "Increase fluid intake", "Encourage walking"], correct: 1, rationale: "Leg cramps are a classic sign of hypokalemia, a common side effect of loop diuretics." },
      { question: "Which medication requires the nurse to notify the provider if a dry cough develops?", options: ["Lisinopril", "Metoprolol", "Furosemide", "Digoxin"], correct: 0, rationale: "ACE inhibitors like Lisinopril commonly cause a persistent dry cough due to bradykinin buildup." }
    ]
  },
  "vascular-pharma": {
    title: "Vascular Pharmacology (Anticoagulation)",
    cellular: {
      title: "Clot Prevention",
      content: "Vascular pharmacology focuses on interfering with the coagulation cascade to prevent the formation or growth of thrombi. These do NOT dissolve existing clots—they only prevent new ones from forming. Safety teaching and monitoring are the most tested areas."
    },
    signs: {
      left: ["Monitor aPTT (Heparin)", "Monitor INR (Warfarin)", "Monitor Platelets (HIT risk)", "Assess for Hematuria"],
      right: ["Bleeding Precautions", "Vitamin K intake consistency", "Protamine Sulfate (Antidote)", "Vitamin K (Antidote)"]
    },
    medications: [
      { name: "Heparin", type: "Anticoagulant", action: "Inactivates thrombin", sideEffects: "Bleeding risk, Thrombocytopenia (HIT)", contra: "Active bleed", pearl: "Antidote: Protamine Sulfate. Monitor aPTT logic (1.5-2.5x normal). Fast onset." },
      { name: "Warfarin (Coumadin)", type: "Anticoagulant", action: "Vitamin K antagonist", sideEffects: "Bleeding risk", contra: "Pregnancy", pearl: "Antidote: Vitamin K. Monitor INR (2.0-3.0). Safety teaching: Consistent green leafy veg intake is vital." },
      { name: "Enoxaparin (Lovenox)", type: "LMWH", action: "Predictable anticoagulation", sideEffects: "Bleeding, Bruising at site", contra: "HIT history", pearl: "Safety teaching: Do not expel the air bubble in the pre-filled syringe! Inject in abdomen." }
    ],
    pearls: ["Electric razors and soft toothbrushes (Bleeding precautions)", "No NSAIDs or Aspirin while on anticoagulants", "Consistency is key for Vitamin K intake", "Safety teaching: Report any bruising or dark stools"],
    quiz: [
      { question: "What is the priority teaching for a patient starting Warfarin?", options: ["Avoid all green vegetables", "Consistency in Vitamin K intake", "Take Aspirin for pain", "Stop taking it if you bruise"], correct: 1, rationale: "Consistency in Vitamin K intake is vital to maintain a stable INR." },
      { question: "Which lab is monitored for a patient on a continuous Heparin drip?", options: ["INR", "aPTT", "PT", "HbA1c"], correct: 1, rationale: "aPTT is the standard monitoring logic for unfractionated heparin therapy." }
    ]
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const lessonContent = useMemo(() => {
    return contentMap[id as string] || contentMap["heart-failure"];
  }, [id]);

  const handleAnswer = (index: number) => {
    if (index === lessonContent.quiz[currentQuestion].correct) {
      setScore(score + 1);
      toast({ title: "Correct!", description: lessonContent.quiz[currentQuestion].rationale });
    } else {
      toast({ 
        title: "Incorrect", 
        description: lessonContent.quiz[currentQuestion].rationale,
        variant: "destructive"
      });
    }

    if (currentQuestion + 1 < lessonContent.quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const isPharma = id?.includes("pharma");
  const isBasics = id?.includes("basics");
  
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Systems
          </Button>
        </Link>

        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               {(isPharma || isBasics) && (
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    {isPharma ? <Pill className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                 </div>
               )}
               <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Core</span>
              <span className="text-gray-500 text-sm">Estimated time: 30 mins</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Your Progress</p>
                <p className="text-gray-600">Complete the quiz at the end to track your mastery.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "25%"}</p>
                <Progress value={quizComplete ? 100 : 25} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Intro Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              {isBasics ? <Zap className="text-primary w-8 h-8" /> : isPharma ? <Pill className="text-primary w-8 h-8" /> : <Microscope className="text-primary w-8 h-8" />}
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {/* Assessment/Findings Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>{isPharma || isBasics ? "High-Yield Findings" : "Primary Assessment"}</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.left.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-orange-500 w-6 h-6" />
                  <h3>{isPharma || isBasics ? "Clinical Alert Signs" : "Secondary/Related"}</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.right.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Med Cards Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>{isPharma ? "Medication Flashcards" : "Pharmacology & Interventions"}</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-primary">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
                    </div>
                    {(isPharma || isBasics) && <Stethoscope className="w-4 h-4 text-primary/40" />}
                  </div>
                  <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Action</p>
                      <p className="text-gray-700">{med.action}</p>
                      <p className="text-sm font-bold text-gray-400 uppercase pt-2">Side Effects</p>
                      <p className="text-gray-700">{med.sideEffects}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Contraindications</p>
                      <p className="text-gray-700">{med.contra}</p>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
                        <p className="text-sm text-yellow-800 font-medium">Pearl: {med.pearl}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Fact Sheet */}
          <section className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-primary w-8 h-8" />
              <h2>REX-PN High-Yield Summary</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Priority Principles</h4>
                <ul className="space-y-2 text-gray-300">
                  {lessonContent.pearls.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Alert</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Always recognize instability early. Mental status changes (confusion, restlessness) are often the earliest indicator of respiratory failure. Do not wait for cyanosis!
                </p>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="py-12 border-t border-gray-100">
            {!quizStarted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Knowledge Check</h2>
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your mastery? Complete these questions to finish the module.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Module Mastered!</h2>
                <p className="text-xl text-gray-600">You scored {score} out of {lessonContent.quiz.length}</p>
                <div className="pt-4">
                  <Link href="/lessons">
                    <Button variant="outline" className="rounded-full px-8">Return to Overview</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1} of {lessonContent.quiz.length}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{lessonContent.quiz[currentQuestion].question}</h3>
                </div>
                <div className="grid gap-4">
                  {lessonContent.quiz[currentQuestion].options.map((option, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      onClick={() => handleAnswer(i)}
                      className="justify-start h-auto py-4 px-6 text-left hover:bg-primary/5 hover:border-primary/40 rounded-xl"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
