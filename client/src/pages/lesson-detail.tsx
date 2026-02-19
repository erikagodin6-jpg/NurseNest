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
  Activity
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
  "pulmonary-edema": {
    title: "Pulmonary Edema",
    cellular: {
      title: "Alveolar Capillary Leak",
      content: "Pulmonary edema occurs when the pressure in the pulmonary capillaries becomes so high that fluid is forced out of the cellular walls and into the alveoli (the air sacs). This creates a barrier at the cellular level that prevents oxygen from crossing into the bloodstream, leading to acute hypoxia."
    },
    signs: {
      left: ["Extreme Dyspnea", "Frothy Pink-Tinged Sputum", "Anxiety/Apprehension", "Gasping for breath"],
      right: ["Tachycardia", "Cyanosis", "Cold/Clammy Skin", "Crackles at lung bases"]
    },
    medications: [
      { name: "Furosemide (Lasix)", type: "Diuretic", action: "Rapid fluid removal", sideEffects: "Hypotension", contra: "Hypovolemia", pearl: "Administer IV push slowly to avoid ear damage." },
      { name: "Oxygen", type: "Gas", action: "Improves alveolar exchange", sideEffects: "Dryness", contra: "None in acute distress", pearl: "Priority 1: Maintain airway and O2 saturation." }
    ],
    pearls: ["High-Fowler's position IMMEDIATELY", "Monitor ABGs", "Keep emergency equipment at bedside"],
    quiz: [
      { question: "What is the classic sputum finding in Pulmonary Edema?", options: ["Yellow thick sputum", "Greenish phlegm", "Frothy pink-tinged", "Rust colored"], correct: 2, rationale: "Frothy pink sputum is the classic sign of acute pulmonary edema." }
    ]
  },
  "fluid-overload": {
    title: "Fluid Overload (Hypervolemia)",
    cellular: {
      title: "Osmotic Pressure Failure",
      content: "When too much fluid enters the extracellular space, the osmotic pressure gradient fails. Cells cannot maintain their normal volume, and fluid shifts into the interstitial space. This leads to cellular swelling and edema in tissues and organs."
    },
    signs: {
      left: ["Bounding Pulse", "Increased Blood Pressure", "Weight Gain", "Distended Neck Veins"],
      right: ["Dyspnea", "Crackles", "Edema", "Reduced Hematocrit"]
    },
    medications: [
      { name: "Diuretics", type: "General", action: "Promote fluid excretion", sideEffects: "Electrolyte imbalance", contra: "Renal failure (some)", pearl: "Restrict sodium intake to prevent retention." }
    ],
    pearls: ["Monitor I&O strictly", "Daily weights are key", "Skin care for edematous areas"],
    quiz: [
      { question: "What is the most sensitive indicator of fluid status?", options: ["Skin turgor", "I&O charting", "Daily weights", "Blood pressure"], correct: 2, rationale: "Daily weights are the most sensitive indicator of fluid gain or loss." }
    ]
  },
  "reduced-co": {
    title: "Reduced Cardiac Output",
    cellular: {
      title: "Perfusion Failure",
      content: "Cardiac Output = Stroke Volume x Heart Rate. At the cellular level, reduced output means cells aren't getting the glucose and oxygen they need for ATP production. Cells shift to anaerobic metabolism, leading to lactic acid buildup and eventual cellular death."
    },
    signs: {
      left: ["Fatigue", "Confusion", "Decreased Urine Output", "Weak Peripheral Pulses"],
      right: ["Cool Extremities", "Hypotension", "Tachycardia", "Delayed Capillary Refill"]
    },
    medications: [
      { name: "Inotropes", type: "Cardiac Support", action: "Increase contractility", sideEffects: "Dysrhythmias", contra: "Certain heart blocks", pearl: "Monitor ECG continuously." }
    ],
    pearls: ["Assess Level of Consciousness (LOC)", "Monitor kidney function (Urine <30mL/hr)", "Cluster care to reduce O2 demand"],
    quiz: [
      { question: "Reduced cardiac output leads to which cellular state?", options: ["Aerobic respiration", "Lactic Acidosis", "Hyper-oxygenation", "Alkalosis"], correct: 1, rationale: "Poor perfusion forces cells into anaerobic metabolism, creating lactic acid." }
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
      { name: "Heparin", type: "Anticoagulant", action: "Prevents clot growth", sideEffects: "Bleeding", contra: "Active bleed", pearl: "Monitor aPTT levels." },
      { name: "Warfarin (Coumadin)", type: "Anticoagulant", action: "Vitamin K antagonist", sideEffects: "Bleeding", contra: "Pregnancy", pearl: "Monitor INR (Goal 2.0-3.0)." }
    ],
    pearls: ["SUDDEN dyspnea is the red flag", "DVT prevention is PE prevention", "Elevate HOB immediately"],
    quiz: [
      { question: "What is the most common classic symptom of PE?", options: ["Fever", "Sudden shortness of breath", "Productive cough", "Bradycardia"], correct: 1, rationale: "Sudden onset dyspnea is the most common presenting symptom of PE." }
    ]
  }
};

// ... Rest of the component logic remains the same
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
            <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Core</span>
              <span className="text-gray-500 text-sm">Estimated time: 25 mins</span>
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
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "45%"}</p>
                <Progress value={quizComplete ? 100 : 45} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Cellular Foundation */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Microscope className="text-primary w-8 h-8" />
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {/* Signs & Symptoms */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Primary Assessment</h3>
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
                  <h3>Secondary/Related</h3>
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

          {/* Medications */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>Pharmacology & Interventions</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
                    <span className="font-bold text-primary">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
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
              <h2>Quick Study Fact Sheet</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Nursing Priorities</h4>
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
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Watch List</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Always prioritize based on ABCs. For neurological events, time is the critical factor. For endocrine, monitor for acute changes in mental status.
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
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your understanding? Complete these questions to update your progress report.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Lesson Mastered!</h2>
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
