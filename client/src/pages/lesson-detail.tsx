import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf, ShieldAlert
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
  // Existing RPN Content
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
  // RN Content from document
  "aaa-rupture": {
    title: "Abdominal Aortic Aneurysm (AAA)",
    cellular: { title: "Vessel Wall Integrity", content: "Chronic high pressure (HTN) and smoking damage the aortic endothelium, causing the arterial wall to weaken and dilate. If the wall reaches its breaking point, it ruptures, leading to rapid exsanguination into the abdominal cavity." },
    signs: {
      left: ["Pulsatile Abdominal Mass", "Abdominal Bruit", "Back/Flank Pain (Stable)", "Incidental Imaging Finding"],
      right: ["Sudden, Ripping Back Pain", "Hypovolemic Shock (Low BP, High HR)", "Ecchymosis (Groin/Scrotum)", "Decreased Hematocrit/Hemoglobin"]
    },
    medications: [{ name: "Sodium Nitroprusside", type: "Vasodilator", action: "Emergency BP control", sideEffects: "Thiocyanate toxicity", contra: "Liver disease", pearl: "Maintain SBP 100-120 pre-op to prevent rupture." }],
    pearls: ["Hourly urine output must be >30mL to ensure renal perfusion", "Monitor peripheral pulses distal to graft post-op", "Report sudden severe pain immediately - sign of graft leak"],
    quiz: [{ question: "Which finding suggests a graft leak after AAA repair?", options: ["Urine output of 50mL/hr", "Increased abdominal girth and groin pain", "Strong pedal pulses", "Normal bowel sounds"], correct: 1, rationale: "Increased girth and pain indicate blood leaking into the retroperitoneal space." }]
  },
  "mi-management": {
    title: "Myocardial Infarction Management",
    cellular: { title: "Coronary Occlusion", content: "A ruptured atherosclerotic plaque triggers a thrombotic cascade that completely blocks blood flow to the myocardium. Ischemia leads to irreversible cell death within 20-40 minutes if reperfusion isn't achieved." },
    signs: {
      left: ["Heavy/Crushing Chest Pain", "Pain radiating to jaw or left arm", "Diaphoresis & Nausea", "Feeling of Impending Doom"],
      right: ["ST-Elevation (STEMI)", "New S3 Heart Sound (HF)", "Crackles in Lungs", "Ominous Bradycardia/Heart Block"]
    },
    medications: [
      { name: "Aspirin", type: "Antiplatelet", action: "Prevents clot expansion", sideEffects: "GI upset", contra: "Active bleeding", pearl: "Chew for rapid effect." },
      { name: "Nitroglycerin", type: "Vasodilator", action: "Reduces Preload/Afterload", sideEffects: "Headache/Hypotension", contra: "Sildenafil/ED meds", pearl: "Hold if SBP < 90." }
    ],
    pearls: ["NPO until swallow screen (if stroke signs coexist)", "Avoid NSAIDs - they increase mortality risk post-MI", "Semi-Fowler's position to reduce heart workload"],
    quiz: [{ question: "A client with MI suddenly develops crackles and an S3 sound. What happened?", options: ["The patient is improving", "Pulmonary Edema / Heart Failure", "Normal post-MI recovery", "Pneumonia"], correct: 1, rationale: "The damaged heart cannot pump effectively, causing fluid to back up into the lungs." }]
  },
  "hf-advanced": {
    title: "Advanced Heart Failure",
    cellular: { title: "Remodeling & Failure", content: "Chronic overload leads to ventricular remodeling. Reduced Ejection Fraction (Systolic) involves thin, weak walls, while Preserved EF (Diastolic) involves thick, stiff walls that cannot fill properly." },
    signs: {
      left: ["Lungs: Crackles & Frothy Sputum", "Dyspnea & Orthopnea", "Paroxysmal Nocturnal Dyspnea"],
      right: ["Systemic: JVD & Edema", "Hepatomegaly & Ascites", "Weight Gain (>3lb in 2 days)"]
    },
    medications: [
      { name: "Furosemide", type: "Loop Diuretic", action: "Reduces Preload", sideEffects: "Hypokalemia", contra: "Low BP", pearl: "Monitor Potassium closely." },
      { name: "ACE Inhibitors", type: "Afterload Reducer", action: "Blocks RAAS", sideEffects: "Dry Cough/Hyperkalemia", contra: "Angioedema", pearl: "First line for Systolic HF." }
    ],
    pearls: ["Daily weights are the most sensitive indicator of fluid status", "Sodium restriction (<3g/day) is vital", "Avoid NSAIDs as they cause fluid retention"],
    quiz: [{ question: "What is a priority teaching for HF home care?", options: ["Eat more salt", "Report 3lb weight gain in 2 days", "Drink 4L of water daily", "Only take meds when symptomatic"], correct: 1, rationale: "Rapid weight gain indicates fluid overload needing intervention." }]
  },
  "kawasaki-critical": {
    title: "Kawasaki Disease: Vasculitis",
    cellular: { title: "Arterial Inflammation", content: "A systemic vasculitis affecting small/medium arteries. The major danger is coronary artery damage, where inflammation leads to dilation and potential aneurysm formation." },
    signs: {
      left: ["Fever > 5 days (Unresponsive)", "Strawberry Tongue", "Conjunctival Redness", "Swollen Palms/Soles"],
      right: ["Coronary Artery Aneurysm", "Peeling Skin (Late sign)", "Irritability", "Recurring Fever"]
    },
    medications: [
      { name: "IVIG", type: "Immunoglobulin", action: "Systemic anti-inflammatory", sideEffects: "Aseptic meningitis", contra: "Live vaccines", pearl: "Give within 10 days of onset." },
      { name: "Aspirin (High Dose)", type: "Antiplatelet", action: "Prevents Coronary Clots", sideEffects: "Reye's Risk", contra: "Viral illness", pearl: "Used here for anti-thrombotic effect despite age." }
    ],
    pearls: ["Need baseline and follow-up echoes", "Postpone live vaccines for 11 months post IVIG", "Monitor for MI symptoms even in children"],
    quiz: [{ question: "A child treated with IVIG for Kawasaki asks about the MMR vaccine. Advice?", options: ["Get it today", "Wait at least 11 months", "It's fine after 1 week", "Live vaccines are never allowed"], correct: 1, rationale: "IVIG contains antibodies that interfere with live vaccine response." }]
  },
  "cp-management": {
    title: "Cerebral Palsy & Spasticity",
    cellular: { title: "Static Brain Insult", content: "Damage to the motor cortex during development (premature, hypoxia, or infection) results in permanent, nonprogressive disturbances in movement and posture." },
    signs: {
      left: ["Hypertonia/Spasticity", "Rigid Muscle Tone", "Delayed Motor Milestones", "Scissoring Gait"],
      right: ["Dysphagia/Swallowing Risks", "Seizures", "Contractures", "Chronic Constipation"]
    },
    medications: [{ name: "Baclofen", type: "Spasmolytic", action: "GABA agonist", sideEffects: "CNS Depression", contra: "None", pearl: "Baclofen pump for severe spasticity." }],
    pearls: ["Physical therapy and ROM are daily priorities", "Monitor for skin breakdown under assistive devices", "Higher risk for UTIs and Constipation"],
    quiz: [{ question: "Priority nursing goal for CP?", options: ["Curing the brain injury", "Promoting optimal mobility and nutrition", "Eliminating all muscle tone", "Isolating the child"], correct: 1, rationale: "The injury is permanent; care focuses on function and preventing complications." }]
  },
  "all-leukemia": {
    title: "Acute Lymphoblastic Leukemia (ALL)",
    cellular: { title: "Blast Overcrowding", content: "Malignant lymphoblasts rapidly multiply in the bone marrow. This overcrowding suppresses normal hematopoiesis, leading to severe anemia, bleeding (low platelets), and infection risk (nonfunctional WBCs)." },
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
    signs: {
      left: ["Infection & Fever", "Bleeding Gums", "Fatigue", "Bone Pain"],
      right: ["Severe Neutropenia", "Mucositis", "Weight Loss", "Hypercellular Marrow"]
    },
    medications: [{ name: "Daunorubicin", type: "Antineoplastic", action: "Intercalates DNA", sideEffects: "Cardiotoxicity", contra: "Severe HF", pearl: "Monitor heart function (Echo) closely." }],
    pearls: ["Hand hygiene is the #1 priority", "Disinfect all equipment before client contact", "Irradiate blood products to prevent graft-vs-host"],
    quiz: [{ question: "Priority for a client with AML undergoing chemo?", options: ["Watching for hair loss", "Infection prevention / Hand hygiene", "Encouraging a high-fiber diet", "Daily walks in the hall"], correct: 1, rationale: "Infection is the leading cause of death in leukemia patients." }]
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

  const isPeds = id?.includes("peds") || id === "epiglottitis" || id === "cp-management" || id === "kawasaki-critical" || id === "all-leukemia";
  const isMeds = id?.includes("safety") || id?.includes("labs") || id?.includes("mi-management");

  const regionalLabs = useMemo(() => {
    if (region === "CA") {
      return {
        potassium: "3.5 - 5.0 mmol/L",
        sodium: "135 - 145 mmol/L",
        glucose: "4.0 - 7.0 mmol/L",
        creatinine: "45 - 110 µmol/L",
        hemoglobin: "120 - 160 g/L",
        platelets: "150 - 400 x 10^9/L",
        anc_critical: "< 0.5 x 10^9/L"
      };
    } else {
      return {
        potassium: "3.5 - 5.0 mEq/L",
        sodium: "135 - 145 mEq/L",
        glucose: "70 - 110 mg/dL",
        creatinine: "0.6 - 1.2 mg/dL",
        hemoglobin: "12 - 16 g/dL",
        platelets: "150,000 - 400,000/mm^3",
        anc_critical: "< 500/mm^3"
      };
    }
  }, [region]);
  
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

          {regionalLabs && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Beaker className="text-amber-500 w-8 h-8" />
                <h2>{region === "CA" ? "Canadian Clinical Data" : "US Clinical Data"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(regionalLabs).map(([key, value]) => (
                  <Card key={key} className="border-none shadow-sm bg-white p-4">
                    <p className="text-sm font-bold text-gray-400 uppercase">{key.replace('_', ' ')}</p>
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
