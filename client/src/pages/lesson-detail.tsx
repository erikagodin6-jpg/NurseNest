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
  Wind
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
  },
  "heart-failure": {
    title: "Heart Failure (HF)",
    cellular: {
      title: "Cellular Overstretch & Compensation",
      content: "At the RPN level, Heart Failure is a failure of cellular compensation. The Frank-Starling mechanism initially stretches myocardial fibers to increase contractility, but eventually loses elasticity. RAAS activation triggers sodium and water retention at the cellular level in the kidneys, increasing preload and hydrostatic pressure."
    },
    signs: {
      left: ["Dyspnea & Orthopnea", "Crackles (Pulmonary Edema)", "Paroxysmal nocturnal dyspnea", "Frothy Pink Sputum"],
      right: ["JVD (Jugular Vein Distension)", "Peripheral Edema", "Ascites", "Hepatomegaly"]
    },
    medications: [
      { name: "Furosemide (Lasix)", type: "Loop Diuretic", action: "Inhibits Na/Cl reabsorption", sideEffects: "Hypokalemia, Ototoxicity", contra: "Anuria", pearl: "Check Potassium levels first!" }
    ],
    pearls: ["Daily weights (>2lb/day = bad)", "Sodium <2g/day", "Position in High-Fowler's"],
    quiz: [
      { question: "Which finding indicates Right-Sided HF?", options: ["Crackles", "Dyspnea", "Peripheral Edema", "Orthopnea"], correct: 2, rationale: "Right failure backs up into systemic circulation." }
    ]
  },
  "hypertension": {
    title: "Hypertension (HTN)",
    cellular: {
      title: "Vasoconstriction & Resistance",
      content: "Hypertension occurs when cellular damage to the endothelium leads to chronic vasoconstriction. The heart must pump against increased Systemic Vascular Resistance (SVR). Over time, this leads to LVH (Left Ventricular Hypertrophy) where cells thicken but lose efficiency."
    },
    signs: {
      left: ["Headache (Morning)", "Blurred Vision", "Tinnitus", "Epistaxis (Nosebleeds)"],
      right: ["Often Asymptomatic", "Chest Pain", "Dizziness", "Fatigue"]
    },
    medications: [
      { name: "Hydrochlorothiazide", type: "Thiazide Diuretic", action: "Distal tubule Na excretion", sideEffects: "Hypokalemia", contra: "Sulfonamide allergy", pearl: "Take in the morning to avoid nocturia." },
      { name: "Lisinopril", type: "ACE Inhibitor", action: "Prevents Angiotensin II formation", sideEffects: "Dry Cough, Hyperkalemia", contra: "Pregnancy", pearl: "Watch for Angioedema (swelling)." }
    ],
    pearls: ["DASH Diet (Low sodium, high K/Mg/Ca)", "Lifestyle is 1st line", "The 'Silent Killer'"],
    quiz: [
      { question: "Common side effect of ACE Inhibitors?", options: ["Headache", "Dry Cough", "Diarrhea", "Fever"], correct: 1, rationale: "Bradykinin buildup causes a chronic dry cough." }
    ]
  },
  "mi": {
    title: "Myocardial Infarction (MI)",
    cellular: {
      title: "Ischemia to Necrosis",
      content: "When oxygen supply is cut off, cardiac cells switch to anaerobic metabolism, producing lactic acid. This causes pain. If O2 isn't restored within 20-40 mins, irreversible cellular necrosis begins. Necrotic cells release enzymes like Troponin into the blood."
    },
    signs: {
      left: ["Crushing Chest Pain", "Pain radiating to jaw/arm", "Diaphoresis (Sweating)", "Nausea/Vomiting"],
      right: ["Shortness of breath", "Fatigue", "Heartburn sensation", "Weakness"]
    },
    medications: [
      { name: "Nitroglycerin", type: "Vasodilator", action: "Decreases preload/afterload", sideEffects: "Headache, Hypotension", contra: "Erectile Dysfunction meds", pearl: "Max 3 doses, 5 mins apart." },
      { name: "Aspirin", type: "Anti-platelet", action: "Prevents further clotting", sideEffects: "Bleeding", contra: "GI Bleed", pearl: "Chew for faster absorption during MI." }
    ],
    pearls: ["MONA: Morphine, Oxygen, Nitroglycerin, Aspirin", "Time is Muscle", "Troponin is the gold standard lab"],
    quiz: [
      { question: "What is the primary action of Nitroglycerin?", options: ["Dissolve Clots", "Vasodilation", "Increase Heart Rate", "Stop Bleeding"], correct: 1, rationale: "It dilates veins and arteries to reduce heart workload." }
    ]
  },
  "diabetes-t1": {
    title: "Diabetes Type 1",
    cellular: {
      title: "Autoimmune Beta-Cell Destruction",
      content: "T-cells attack and destroy the insulin-producing beta cells in the Islets of Langerhans. Without insulin, glucose cannot enter the cells to produce energy. Cells starve while blood sugar remains high."
    },
    signs: {
      left: ["Polyuria (Increased urine)", "Polydipsia (Thirst)", "Polyphagia (Hunger)", "Weight Loss"],
      right: ["Fatigue", "Blurred Vision", "Irritability", "Weakness"]
    },
    medications: [
      { name: "Insulin Lispro (Humalog)", type: "Rapid-acting", action: "Transport glucose into cells", sideEffects: "Hypoglycemia", contra: "None", pearl: "Must have food ready within 15 mins!" },
      { name: "Insulin Glargine (Lantus)", type: "Long-acting", action: "Steady glucose control", sideEffects: "Hypoglycemia", contra: "None", pearl: "Never mix with other insulins!" }
    ],
    pearls: ["Rotation of sites prevents lipodystrophy", "Hypoglycemia is <4.0 mmol/L", "Always requires insulin"],
    quiz: [
      { question: "Onset time for Rapid-Acting insulin?", options: ["5-15 mins", "30-60 mins", "2-4 hours", "Never"], correct: 0, rationale: "Rapid-acting insulin starts working very quickly." }
    ]
  },
  "dka": {
    title: "Diabetic Ketoacidosis (DKA)",
    cellular: {
      title: "Ketone Production & Acidosis",
      content: "When cells can't get glucose, the body breaks down fat for energy. This produces ketones (acidic). At the cellular level, the blood becomes acidic, and high sugar causes osmotic diuresis, leading to severe cellular dehydration and potassium shifts."
    },
    signs: {
      left: ["Kussmaul Respirations (Rapid/Deep)", "Fruity Breath", "Blood Glucose >16.7", "Ketones in Urine"],
      right: ["Nausea/Vomiting", "Abdominal Pain", "Altered Mental Status", "Dehydration"]
    },
    medications: [
      { name: "Regular Insulin", type: "Short-acting", action: "Lower BG & switch off fat breakdown", sideEffects: "Hypokalemia", contra: "Hypoglycemia", pearl: "Only insulin given IV bolus/drip." },
      { name: "0.9% Normal Saline", type: "Isotonic Fluid", action: "Rehydration", sideEffects: "Fluid overload", contra: "HF", pearl: "Priority is rehydration 1st!" }
    ],
    pearls: ["Priority: Hydration, then Insulin, then K+ replacement", "Watch Potassium like a hawk!", "Hourly BG monitoring"],
    quiz: [
      { question: "Priority intervention for DKA?", options: ["Insulin", "Normal Saline", "Potassium", "Food"], correct: 1, rationale: "Rehydration is the first priority to stabilize BP and perfusion." }
    ]
  },
  "stroke": {
    title: "Ischemic Stroke",
    cellular: {
      title: "The Ischemic Penumbra",
      content: "A clot blocks blood flow. The core area dies quickly. The surrounding area (penumbra) is at risk but salvageable if blood flow is restored quickly. Cellular pumps fail, causing neurons to swell and die."
    },
    signs: {
      left: ["Facial Drooping", "Arm Weakness", "Speech Difficulty (BEFAST)", "Sudden Vision Loss"],
      right: ["Unilateral Neglect", "Impulsive Behavior", "Spatial-Perceptual deficits", "Headache"]
    },
    medications: [
      { name: "tPA (Alteplase)", type: "Thrombolytic", action: "Dissolves the clot", sideEffects: "Severe Bleeding", contra: "Recent surgery, bleeding risk", pearl: "Give within 3-4.5 hours of Last Known Well." },
      { name: "Clopidogrel (Plavix)", type: "Anti-platelet", action: "Prevents future clots", sideEffects: "Bleeding", contra: "Active bleeding", pearl: "Stop 5-7 days before surgery." }
    ],
    pearls: ["TIME is BRAIN", "CT Scan (non-contrast) 1st to rule out hemorrhage", "Keep HOB at 30 degrees"],
    quiz: [
      { question: "First thing to do for suspected stroke?", options: ["Give Aspirin", "CT Scan", "Start tPA", "Draw Labs"], correct: 1, rationale: "Must rule out a bleed before giving any blood thinners." }
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
               {isPharma && (
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Pill className="w-6 h-6" />
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
              {isPharma ? <Pill className="text-primary w-8 h-8" /> : <Microscope className="text-primary w-8 h-8" />}
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
                  <h3>{isPharma ? "Nursing Assessments" : "Primary Assessment"}</h3>
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
                  <h3>{isPharma ? "Patient Safety & Monitoring" : "Secondary/Related"}</h3>
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
                    {isPharma && <Stethoscope className="w-4 h-4 text-primary/40" />}
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
              <h2>{isPharma ? "Pharmacology Rapid-Fire Facts" : "Quick Study Fact Sheet"}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Key Principles</h4>
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
                  {isPharma 
                    ? "The REX-PN loves medication safety. Always prioritize the assessment (e.g., checking heart rate before a beta blocker) over the administration itself."
                    : "Always prioritize based on ABCs. For neurological events, time is the critical factor. For endocrine, monitor for acute changes in mental status."}
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
                <h2 className="text-3xl font-bold">Pharmacology Knowledge Check</h2>
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your drug knowledge? Complete these questions to master your pharmacology domain.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Pharma Mastered!</h2>
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
