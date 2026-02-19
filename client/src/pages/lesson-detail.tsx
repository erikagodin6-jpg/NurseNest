import { useState } from "react";
import { Link } from "wouter";
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
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const lessonContent = {
  title: "Heart Failure (HF)",
  cellular: {
    title: "The Cellular Foundation",
    content: `At the RPN level for REX-PN, you must understand that Heart Failure isn't just a 'tired heart'—it's a failure of cellular compensation. 
    
    1. Myocardial Stretching (Frank-Starling Mechanism): Initially, the muscle fibers stretch to increase contractility. However, like an overstretched rubber band, they eventually lose elasticity.
    2. RAAS Activation: Decreased renal perfusion triggers the Renin-Angiotensin-Aldosterone System. This causes sodium/water retention at the cellular level in the kidneys, increasing workload (preload).
    3. Hypertrophy: Cardiac myocytes increase in size to handle stress, but they require more oxygen than the coronary arteries can provide, leading to cellular hypoxia and further damage.`
  },
  signs: {
    left: ["Dyspnea", "Crackles (Pulmonary Edema)", "Orthopnea", "Frothy Pink Sputum"],
    right: ["JVD (Jugular Vein Distension)", "Peripheral Edema", "Ascites", "Hepatomegaly"]
  },
  medications: [
    { 
      name: "Furosemide (Lasix)", 
      type: "Loop Diuretic",
      action: "Inhibits Na/Cl reabsorption in Loop of Henle",
      sideEffects: "Hypokalemia, Ototoxicity (if given too fast)",
      contra: "Anuria, severe electrolyte depletion",
      pearl: "Always check Potassium levels before administering!"
    },
    {
      name: "Enalapril (Vasotec)",
      type: "ACE Inhibitor",
      action: "Blocks Angiotensin I to II conversion",
      sideEffects: "Dry Cough, Angioedema, Hyperkalemia",
      contra: "Pregnancy, history of angioedema",
      pearl: "Watch for that first-dose hypotension!"
    }
  ],
  pearls: [
    "Daily weights are the gold standard (Report >2-3 lbs/day or 5 lbs/week).",
    "Sodium restriction is critical (<2g/day).",
    "Positioning: High-Fowler's to ease breathing."
  ],
  quiz: [
    {
      question: "Which assessment finding is most indicative of Left-Sided Heart Failure?",
      options: ["Peripheral Edema", "Jugular Vein Distension", "Crackles in Lungs", "Ascites"],
      correct: 2,
      rationale: "Left-sided failure backs up into the lungs, causing pulmonary symptoms like crackles."
    },
    {
      question: "An RPN is preparing to give Furosemide. Which lab value is most concerning?",
      options: ["Sodium 138 mEq/L", "Potassium 3.1 mEq/L", "Creatinine 1.1 mg/dL", "Glucose 110 mg/dL"],
      correct: 1,
      rationale: "Furosemide is a potassium-wasting diuretic. A level of 3.1 is already low (Hypokalemia)."
    }
  ]
};

export default function LessonDetail() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

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

          {/* Progress Tracker Mockup */}
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

          {/* Lesson Sections */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Microscope className="text-primary w-8 h-8" />
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Left-Sided (Pulmonary)</h3>
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
                  <h3>Right-Sided (Systemic)</h3>
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
              <h2>Pharmacology & Nursing Interventions</h2>
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
                      <CheckCircle2 className="w-5 h-5 text-mint-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Watch List</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "REX-PN often tests on prioritization. If the patient has frothy pink sputum, they are the priority (ABC - Airway/Breathing). If they have peripheral edema, it is expected but not immediate."
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
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your understanding of Heart Failure? Complete these questions to update your progress report.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-mint-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-mint-500" />
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

import { Trophy } from "lucide-react";
