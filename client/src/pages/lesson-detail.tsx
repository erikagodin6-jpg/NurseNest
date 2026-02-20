import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf, ShieldAlert,
  ClipboardList, HeartPulse, HandHelping, Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDifficulty, difficultyConfig } from "@/lib/difficulty";
import { contentMap } from "@/data/lessons";
import type { LessonContent } from "@/data/lessons/types";


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
      <SEO
        title={`${lessonContent?.title || "Lesson"} - NurseNest Pathophysiology`}
        description={`Deep-dive into ${lessonContent?.title || "nursing pathophysiology"}: cellular mechanisms, clinical signs, medications, safety pearls, and NCLEX-style quiz questions.`}
        keywords={`${lessonContent?.title || "nursing"} pathophysiology, ${lessonContent?.title || "nursing"} NCLEX, clinical nursing, nursing medications, nursing quiz`}
        canonicalPath={`/lessons/${id}`}
        ogType="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          "name": lessonContent?.title || "Nursing Lesson",
          "description": `Comprehensive nursing pathophysiology lesson on ${lessonContent?.title || "clinical topics"} including cellular mechanisms, medications, and clinical pearls.`,
          "url": `https://nursenest.replit.app/lessons/${id}`,
          "learningResourceType": "Lesson",
          "educationalLevel": "College",
          "about": { "@type": "Thing", "name": lessonContent?.title || "Nursing" }
        }}
      />
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
            {(() => {
              const diff = getDifficulty(id || "");
              const config = difficultyConfig[diff];
              return (
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Focus</span>
                  <span data-testid="lesson-difficulty-badge" className={`px-3 py-1 rounded-full text-sm font-bold ${config.bg} ${config.color}`}>
                    Difficulty: {config.label}
                  </span>
                  <span className="text-gray-500 text-sm">Clinical Excellence</span>
                </div>
              );
            })()}
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

          {lessonContent.riskFactors && lessonContent.riskFactors.length > 0 && (
            <section data-testid="section-risk-factors" className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <ShieldAlert className="text-rose-500 w-8 h-8" />
                <h2>Risk Factors</h2>
              </div>
              <Card className="border-none shadow-sm bg-rose-50/60">
                <CardContent className="p-8">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lessonContent.riskFactors.map((rf, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                        <span>{rf}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {lessonContent.diagnostics && lessonContent.diagnostics.length > 0 && (
            <section data-testid="section-diagnostics" className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Search className="text-cyan-600 w-8 h-8" />
                <h2>Diagnostics</h2>
              </div>
              <Card className="border-none shadow-sm bg-cyan-50/60">
                <CardContent className="p-8">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lessonContent.diagnostics.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {lessonContent.management && lessonContent.management.length > 0 && (
            <section data-testid="section-management" className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <ClipboardList className="text-emerald-600 w-8 h-8" />
                <h2>Management</h2>
              </div>
              <Card className="border-none shadow-sm bg-emerald-50/60">
                <CardContent className="p-8">
                  <ul className="space-y-3">
                    {lessonContent.management.map((m, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-emerald-700 text-xs font-bold">{i + 1}</span>
                        </div>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {lessonContent.nursingActions && lessonContent.nursingActions.length > 0 && (
            <section data-testid="section-nursing-actions" className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <HeartPulse className="text-violet-600 w-8 h-8" />
                <h2>Nursing Actions</h2>
              </div>
              <Card className="border-none shadow-sm bg-violet-50/60">
                <CardContent className="p-8">
                  <ul className="space-y-3">
                    {lessonContent.nursingActions.map((na, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <HeartPulse className="w-4 h-4 text-violet-500 mt-1 shrink-0" />
                        <span>{na}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

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
