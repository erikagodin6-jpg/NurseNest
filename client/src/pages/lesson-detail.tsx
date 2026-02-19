import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  lifespan?: { title: string; content: string };
  quiz: { question: string; options: string[]; correct: number; rationale: string }[];
};

const contentMap: Record<string, LessonContent> = {
  "neuro-basics": {
    title: "Neuro Deterioration: Early vs Late",
    cellular: { title: "Cellular Sensitivity", content: "Brain sensitivity to hypoxia, hypotension, and glucose. \n\nEarly: Restlessness, Confusion. \n\nLate: Decreased LOC, Posturing." },
    signs: {
      left: ["Restlessness", "Confusion", "Headache", "Subtle LOC Change"],
      right: ["Decreased LOC", "Posturing", "Pupillary Changes", "Respiratory Failure"]
    },
    medications: [{ name: "Mannitol", type: "Osmotic", action: "Reduces ICP", sideEffects: "Dehydration", contra: "Anuria", pearl: "Monitor ICP." }],
    pearls: ["Sudden LOC change = priority", "Find the cause (UTI, Hypoxia, Glucose)"],
    lifespan: { title: "Across the Lifespan", content: "Infants: High-pitched cry/bulging fontanelle. Elderly: Acute confusion (Delirium) as first sign." },
    quiz: [{ question: "Early sign?", options: ["Posturing", "Restlessness", "Cyanosis", "Bradycardia"], correct: 1, rationale: "Restlessness is often first." }]
  },
  "stroke": {
    title: "Stroke: FAST Recognition",
    cellular: { title: "Ischemic vs Hemorrhagic", content: "Clot vs Bleed. Both result in rapid neuron death." },
    signs: {
      left: ["Face Drooping", "Arm Weakness", "Speech Difficulty", "Visual Loss"],
      right: ["Worst Headache Ever", "Sudden Confusion", "Decreased LOC", "Nausea/Vomiting"]
    },
    medications: [{ name: "tPA", type: "Thrombolytic", action: "Dissolves clots", sideEffects: "Bleeding", contra: "Hemorrhage", pearl: "Time is Brain! Must be given within 3-4.5 hours." }],
    pearls: ["NPO until swallow screen", "CT Scan (non-contrast) first"],
    lifespan: { title: "Across the Lifespan", content: "Common in elderly; in younger adults, often vascular abnormalities." },
    quiz: [{ question: "Priority action?", options: ["Aspirin", "NPO status", "Walk", "Food"], correct: 1, rationale: "Prevent aspiration." }]
  },
  "peds-neuro": {
    title: "Pediatric Neuro and Seizures",
    cellular: { title: "Developing Brain", content: "Fontanelles compensate slightly. Seizures can be febrile." },
    signs: {
      left: ["Bulging Fontanelle", "High-pitched cry", "Irritability", "Febrile Seizure"],
      right: ["Neck Stiffness", "Photophobia", "Ominous Bradycardia", "Projectile Vomiting"]
    },
    medications: [{ name: "Diazepam", type: "Benzo", action: "Stops seizure", sideEffects: "Sedation", contra: "Resp depression", pearl: "Safety first." }],
    pearls: ["Don't restrain during seizure", "Isolation for suspected Meningitis"],
    quiz: [{ question: "Meningitis sign?", options: ["Hunger", "Neck stiffness", "Leg pain", "Diarrhea"], correct: 1, rationale: "Neck stiffness is classic." }]
  },
  "heent-emergencies": {
    title: "HEENT Emergencies",
    cellular: { title: "Airway Integrity", content: "Obstruction and pressure changes are primary concerns." },
    signs: {
      left: ["Stridor", "Drooling", "Tripod Position", "Sudden vision loss"],
      right: ["Airway Closure", "Retinal Detachment (Flashes)", "Epiglottitis", "Foreign Body"]
    },
    medications: [{ name: "Epinephrine (Neb)", type: "Vasoconstrictor", action: "Reduces swelling", sideEffects: "Tachycardia", contra: "None", pearl: "Watch for rebound." }],
    pearls: ["No throat exam in Epiglottitis", "Retinal Detachment: No pressure"],
    quiz: [{ question: "Sign of Epiglottitis?", options: ["Barking cough", "Drooling", "Wheezing", "Cough"], correct: 1, rationale: "Drooling indicates swelling." }]
  },
  "vision-hearing": {
    title: "Vision and Hearing Safety",
    cellular: { title: "Functional Impact", content: "Loss of input leads to safety risks." },
    signs: {
      left: ["Cloudy Vision (Cataracts)", "Central Loss (Macular)", "Ear Pain (Otitis)", "Red Eye (Conjunctivitis)"],
      right: ["Fall Risk", "Miscommunication", "Infection Spread", "Medication Errors"]
    },
    medications: [{ name: "Antibiotic Drops", type: "Anti-infective", action: "Kills bacteria", sideEffects: "Local irritation", contra: "Allergy", pearl: "Don't touch tip." }],
    pearls: ["Infection control for Conjunctivitis", "Communication strategies for hearing loss"],
    lifespan: { title: "Across the Lifespan", content: "Children: Otitis Media. Seniors: Cataracts/Glaucoma lead to falls." },
    quiz: [{ question: "Conjunctivitis priority?", options: ["Dark room", "Infection control", "Exercise", "Reading"], correct: 1, rationale: "Highly contagious." }]
  },
  "peds-heent": {
    title: "Pediatric HEENT Mastery",
    cellular: { title: "Developing Structures", content: "Shorter eustachian tubes, increasing infection risk." },
    signs: {
      left: ["Ear Pulling (Otitis)", "White plaques (Thrush)", "Barking cough (Croup)", "Fever"],
      right: ["Stridor at rest", "Drooling (Epiglottitis)", "Hearing loss", "Dehydration"]
    },
    medications: [{ name: "Nystatin", type: "Antifungal", action: "Treats thrush", sideEffects: "GI upset", contra: "Allergy", pearl: "Swish and swallow." }],
    pearls: ["Infection control for Conjunctivitis", "Croup: Cold night air/steam"],
    quiz: [{ question: "Sign of Otitis Media in infant?", options: ["Cough", "Ear pulling/irritability", "Hunger", "Rash"], correct: 1, rationale: "Irritability and pulling are classic." }]
  },
  "gi-emergencies": {
    title: "GI Emergencies and Perfusion",
    cellular: { title: "Fluid and Blood Loss", content: "GI issues lead to electrolyte shifts and shock." },
    signs: {
      left: ["Nausea/Vomiting", "Diarrhea", "Abdominal Pain", "Constipation"],
      right: ["Hematemesis", "Melena", "Hypokalemia", "Dehydration"]
    },
    medications: [{ name: "Pantoprazole", type: "PPI", action: "Reduces acid", sideEffects: "C. diff risk", contra: "None", pearl: "Prevents/treats GI bleeds." }],
    pearls: ["NPO if bleeding", "Monitor K+ in V/D"],
    lifespan: { title: "Across the Lifespan", content: "Infants: Dehydration is rapid. Elderly: Chronic constipation and GI bleed risks." },
    quiz: [{ question: "Concern with severe vomiting?", options: ["Hyperkalemia", "Hypokalemia", "Headache", "Rash"], correct: 1, rationale: "Potassium lost." }]
  },
  "gu-infections": {
    title: "GU: UTI and Renal Safety",
    cellular: { title: "Bacterial Colonization", content: "Infection can ascend to kidneys and enter blood." },
    signs: {
      left: ["Dysuria", "Frequency", "Urgency", "Cloudy Urine"],
      right: ["Confusion (Elderly)", "Flank Pain", "Bladder Distension", "Oliguria"]
    },
    medications: [{ name: "Nitrofurantoin", type: "Antibiotic", action: "GU infection", sideEffects: "Brown urine", contra: "Renal failure", pearl: "Take with food." }],
    pearls: ["Confusion in elderly = Check UTI", "Creatinine reflects renal function"],
    quiz: [{ question: "First sign of UTI in 80yo?", options: ["Fever", "Confusion", "Back pain", "Rash"], correct: 1, rationale: "Acute confusion is classic." }]
  },
  "msk-safety": {
    title: "MSK: Fractures and Safety",
    cellular: { title: "Neurovascular Integrity", content: "Injury can compromise flow and nerve function." },
    signs: {
      left: ["Pain and Swelling", "Deformity", "Immobility", "Bruising"],
      right: ["Paresthesia", "Pallor", "Pulselessness", "Unrelieved Pain"]
    },
    medications: [{ name: "Morphine", type: "Opioid", action: "Pain relief", sideEffects: "Resp depression", contra: "Low RR", pearl: "Monitor respirations." }],
    pearls: ["Neurovascular checks: 6 P's", "Compartment Syndrome = Emergency"],
    quiz: [{ question: "Compartment Syndrome sign?", options: ["Mild pain", "Itching", "Unrelieved severe pain", "Hunger"], correct: 2, rationale: "Pain out of proportion." }]
  },
  "sepsis": {
    title: "Sepsis Recognition",
    cellular: { title: "Systemic Inflammation", content: "Body-wide response leading to organ failure." },
    signs: {
      left: ["Tachycardia", "Fever", "Tachypnea", "WBC > 12"],
      right: ["Hypotension", "Altered LOC", "Oliguria", "Mottled Skin"]
    },
    medications: [{ name: "Ceftriaxone", type: "Antibiotic", action: "Broad spectrum", sideEffects: "GI upset", contra: "Allergy", pearl: "Start within 1 hour." }],
    pearls: ["Hypotension is a LATE sign", "Fluids and Antibiotics priority"],
    quiz: [{ question: "Early sign of sepsis?", options: ["Hypotension", "Tachycardia", "Death", "Rash"], correct: 1, rationale: "Tachycardia is compensatory." }]
  },
  "abg-mastery": {
    title: "ABG Analysis Masterclass",
    cellular: { title: "pH Homeostasis", content: "Lungs control CO2 (Acid); Kidneys control HCO3 (Base)." },
    signs: {
      left: ["Acidosis: pH < 7.35", "Alkalosis: pH > 7.45", "Normal: 7.35-7.45"],
      right: ["Respiratory Acidosis (CO2 retention)", "Metabolic Acidosis (DKA)", "Resp Alkalosis (Anxiety)"]
    },
    medications: [{ name: "Oxygen", type: "Gas", action: "Restores O2", sideEffects: "O2 toxicity", contra: "COPD Over-oxygenation", pearl: "Oxygen is a med." }],
    pearls: ["ROME: Resp Opposite, Met Equal"],
    quiz: [{ question: "CO2 of 50 indicates?", options: ["Alkalosis", "Acidosis", "Normal", "Base"], correct: 1, rationale: "High CO2 is acidic." }]
  },
  "supplement-safety": {
    title: "Supplement Safety",
    cellular: { title: "Drug-Herb Interactions", content: "Natural products have potent effects." },
    signs: {
      left: ["Ginkgo/Garlic: Bleeding", "Ginseng: Hypoglycemia", "SJW: Reduces drug effect"],
      right: ["Serotonin Syndrome", "Additive Sedation", "Kava: Liver damage"]
    },
    medications: [{ name: "SSRI", type: "Antidepressant", action: "Serotonin increase", sideEffects: "Nausea", contra: "St. John's Wort", pearl: "Avoid SJW." }],
    pearls: ["Ask about supplements", "Natural is not always Safe"],
    quiz: [{ question: "Supplement with many interactions?", options: ["Vitamin D", "St. John's Wort", "Calcium", "Zinc"], correct: 1, rationale: "SJW inducer." }]
  },
  "high-yield-labs": {
    title: "Critical Lab Mastery",
    cellular: { title: "Homeostasis", content: "Potassium, Sodium, Glucose." },
    signs: {
      left: ["Hypokalemia: Arrhythmia", "Hyponatremia: Confusion", "Hypoglycemia: Sweating"],
      right: ["Hyperkalemia: Peaked T", "Hypernatremia: Neuro", "High Creatinine"]
    },
    medications: [{ name: "Kayexalate", type: "K+ binder", action: "Removes K+", sideEffects: "Constipation", contra: "Bowel obstruction", pearl: "Treats hyperkalemia." }],
    pearls: ["Potassium = HEART", "Sodium = BRAIN"],
    quiz: [{ question: "Potassium 6.2 concerns?", options: ["Seizures", "Diarrhea", "Cardiac Arrhythmias", "Headache"], correct: 2, rationale: "Heart safety first." }]
  },
  "heart-failure": {
    title: "Heart Failure All Ages",
    cellular: { title: "Pump Failure", content: "Heart cannot meet metabolic demands." },
    signs: {
      left: ["Adult: Dyspnea, Crackles", "Adult: Edema, JVD", "Adult: Fatigue"],
      right: ["Infant: Sweating with feeds", "Infant: Poor weight gain", "Infant: Tachypnea"]
    },
    medications: [{ name: "Furosemide", type: "Diuretic", action: "Removes fluid", sideEffects: "Hypokalemia", contra: "Low BP", pearl: "Monitor weights." }],
    pearls: ["Daily weights priority", "Restrict sodium"],
    lifespan: { title: "Across the Lifespan", content: "Adults present with exertional dyspnea; Infants present with feeding distress and growth failure." },
    quiz: [{ question: "Early sign of HF in infant?", options: ["JVD", "Sweating with feeds", "Leg edema", "Cough"], correct: 1, rationale: "Classic pediatric presentation." }]
  },
  "hypertension": {
    title: "Hypertension All Ages",
    cellular: { title: "Vascular Pressure", content: "Chronic high pressure damages endothelium." },
    signs: {
      left: ["Adult: Headache", "Adult: Blurred vision", "Adult: Asymptomatic"],
      right: ["Child: Irritability", "Child: Seizures", "Organ Damage"]
    },
    medications: [{ name: "Lisinopril", type: "ACEI", action: "Lowers BP", sideEffects: "Dry cough", contra: "Pregnancy", pearl: "Monitor Potassium." }],
    pearls: ["DASH Diet", "Silence Killer"],
    lifespan: { title: "Across the Lifespan", content: "Secondary causes (renal) are more common in children; primary (lifestyle) in adults." },
    quiz: [{ question: "ACE Inhibitor side effect?", options: ["Hunger", "Dry cough", "Sleepiness", "Rash"], correct: 1, rationale: "Bradykinin buildup." }]
  },
  "diabetes-lifespan": {
    title: "Diabetes Across Ages",
    cellular: { title: "Glucose Transport", content: "Lack of insulin (T1) or resistance (T2)." },
    signs: {
      left: ["Polyuria (Urine)", "Polydipsia (Thirst)", "Polyphagia (Hunger)", "Weight loss"],
      right: ["Hypoglycemia (Sweating)", "DKA (Fruity breath)", "Neuropathy"]
    },
    medications: [{ name: "Insulin", type: "Hormone", action: "Transports glucose", sideEffects: "Hypoglycemia", contra: "Low BG", pearl: "Rotation of sites." }],
    pearls: ["Foot care is vital", "Hypoglycemia is immediate danger"],
    lifespan: { title: "Across the Lifespan", content: "Type 1 is classic in peds; Type 2 rising in peds due to lifestyle; both highly prevalent in aging adults." },
    quiz: [{ question: "Immediate danger in diabetes?", options: ["Hyperglycemia", "Hypoglycemia", "Foot callus", "Hunger"], correct: 1, rationale: "Low BG kills fast." }]
  },
  "parkinsons": {
    title: "Parkinson's and Mobility",
    cellular: { title: "Dopamine Deficiency", content: "Loss of dopamine in substantia nigra leads to motor deficits." },
    signs: {
      left: ["Tremor (at rest)", "Rigidity", "Bradykinesia (Slow)", "Shuffle gait"],
      right: ["Dysphagia (Swallow risk)", "Fall risk", "Freezing of gait"]
    },
    medications: [{ name: "Levodopa", type: "Dopamine precursor", action: "Restores motor function", sideEffects: "Dyskinesia", contra: "MAOIs", pearl: "Take at same time every day." }],
    pearls: ["Swallow assessment", "Safety/Mobility aids"],
    quiz: [{ question: "Priority safety concern?", options: ["Tremor", "Aspiration/Falls", "Rigidity", "Slow speech"], correct: 1, rationale: "Life-threatening risks." }]
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
    };
    window.addEventListener("regionChange", handleRegionChange);
    return () => window.removeEventListener("regionChange", handleRegionChange);
  }, []);

  const lessonContent = useMemo(() => {
    return contentMap[id as string] || contentMap["neuro-basics"];
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

  const isPeds = id?.includes("peds") || id === "epiglottitis" || id === "bronchiolitis" || id === "croup";
  const isMeds = id?.includes("safety") || id?.includes("labs") || id?.includes("abg");

  const regionalLabs = useMemo(() => {
    if (id !== "high-yield-labs") return null;
    return region === "CA" ? {
      potassium: "3.5 - 5.0 mmol/L",
      sodium: "135 - 145 mmol/L",
      glucose: "4.0 - 7.0 mmol/L",
      creatinine: "45 - 110 µmol/L",
      hemoglobin: "120 - 160 g/L"
    } : {
      potassium: "3.5 - 5.0 mEq/L",
      sodium: "135 - 145 mEq/L",
      glucose: "70 - 110 mg/dL",
      creatinine: "0.6 - 1.2 mg/dL",
      hemoglobin: "12 - 16 g/dL"
    };
  }, [id, region]);
  
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Button>
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               {isPeds && (
                 <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
                    <Baby className="w-6 h-6" />
                 </div>
               )}
               {isMeds && (
                 <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500">
                    <Beaker className="w-6 h-6" />
                 </div>
               )}
               <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Focus</span>
              <span className="text-gray-500 text-sm">Clinical Excellence</span>
            </div>
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Learning Progress</p>
                <p className="text-gray-600">Complete the module to track mastery.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "25%"}</p>
                <Progress value={quizComplete ? 100 : 25} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Microscope className="text-primary w-8 h-8" />
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {id === "high-yield-labs" && regionalLabs && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Beaker className="text-amber-500 w-8 h-8" />
                <h2>{region === "CA" ? "Canadian Reference Ranges" : "US Reference Ranges"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(regionalLabs).map(([key, value]) => (
                  <Card key={key} className="border-none shadow-sm bg-white p-4">
                    <p className="text-sm font-bold text-gray-400 uppercase">{key}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {lessonContent.lifespan && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Users className="text-indigo-500 w-8 h-8" />
                <h2>Across the Lifespan</h2>
              </div>
              <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 leading-relaxed text-indigo-900 italic">
                {lessonContent.lifespan.content}
              </div>
            </section>
          )}

          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Clinical Findings</h3>
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
                  <h3>Danger Signs</h3>
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

          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>Pharmacology and Safety</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden text-gray-900">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
                    <span className="font-bold text-gray-900">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
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

          <section className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-primary w-8 h-8" />
              <h2>REX-PN Mastery</h2>
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
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Danger Zone</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Clinical reasoning over memorization. If something changes suddenly, it is your priority.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t border-gray-100">
            {!quizStarted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Case Study Challenge</h2>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Mastery Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Module Mastered!</h2>
                <p className="text-xl text-gray-600">Scored {score} / {lessonContent.quiz.length}</p>
                <div className="pt-4">
                  <Link href="/lessons">
                    <Button variant="outline" className="rounded-full px-8">Return to Overview</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{lessonContent.quiz[currentQuestion].question}</h3>
                </div>
                <div className="grid gap-4">
                  {lessonContent.quiz[currentQuestion].options.map((option, i) => (
                    <Button 
                      key={i} variant="outline" onClick={() => handleAnswer(i)}
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

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
