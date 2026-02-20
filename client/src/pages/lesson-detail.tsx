import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowLeft, Microscope, AlertCircle, Stethoscope, Pill, Lightbulb, FileText,
  CheckCircle2, XCircle, Trophy, Activity, Heart, Droplets, Brain, Wind, Zap, Baby, Users, Eye, Beaker, Leaf, ShieldAlert,
  ClipboardList, HeartPulse, HandHelping, Search, Lock, StickyNote, Save, Crown, TrendingUp, BarChart3, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDifficulty, difficultyConfig } from "@/lib/difficulty";
import { contentMap } from "@/data/lessons";
import { useAuth } from "@/lib/auth";
import type { LessonContent, QuizQuestion } from "@/data/lessons/types";

function getLessonTier(lessonId: string): string {
  if (lessonId.includes("-np") || lessonId.includes("advanced-")) return "np";
  if (lessonId.includes("-rn") || lessonId.includes("nclex-")) return "rn";
  return "rpn";
}

const tierPricing: Record<string, { name: string; priceCAD: string; priceUSD: string }> = {
  rpn: { name: "RPN/LVN", priceCAD: "$29.99 CAD/mo", priceUSD: "$21.99 USD/mo" },
  rn: { name: "RN/NCLEX", priceCAD: "$39.99 CAD/mo", priceUSD: "$29.99 USD/mo" },
  np: { name: "NP Advanced", priceCAD: "$49.99 CAD/mo", priceUSD: "$36.99 USD/mo" },
};

function getTestQuestions(lesson: LessonContent, testType: "pretest" | "posttest"): QuizQuestion[] {
  if (testType === "pretest" && lesson.preTest && lesson.preTest.length >= 25) {
    return lesson.preTest;
  }
  if (testType === "posttest" && lesson.postTest && lesson.postTest.length >= 25) {
    return lesson.postTest;
  }
  const source = testType === "pretest" ? (lesson.preTest || lesson.quiz) : (lesson.postTest || lesson.quiz);
  return source;
}

function QuizSection({
  questions,
  lessonId,
  testType,
  onComplete,
}: {
  questions: QuizQuestion[];
  lessonId: string;
  testType: "pretest" | "posttest";
  onComplete: (score: number, total: number) => void;
}) {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useAuth();

  const preTestScore = useMemo(() => {
    const stored = localStorage.getItem(`nursenest-pretest-${lessonId}`);
    return stored ? JSON.parse(stored) : null;
  }, [lessonId, complete]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ((q) => q + 1);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        setComplete(true);
        localStorage.setItem(
          `nursenest-${testType}-${lessonId}`,
          JSON.stringify({ score: finalScore, total: questions.length, percentage: Math.round((finalScore / questions.length) * 100) })
        );
        onComplete(finalScore, questions.length);

        if (user) {
          fetch("/api/test-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              lessonId,
              testType,
              score: finalScore,
              totalQuestions: questions.length,
            }),
          }).catch(() => {});
        }
      }
    }, 2000);
  };

  if (!started) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          {testType === "pretest" ? <BarChart3 className="w-10 h-10 text-primary" /> : <TrendingUp className="w-10 h-10 text-primary" />}
        </div>
        <h2 className="text-3xl font-bold" data-testid={`text-${testType}-title`}>
          {testType === "pretest" ? "Pre-Test: Baseline Assessment" : "Post-Test: Knowledge Check"}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {testType === "pretest"
            ? "Take this test before studying the lesson to assess your baseline knowledge. Your score will be compared with your post-test results."
            : "Now that you've studied the lesson, test your knowledge. Your score will be compared with your pre-test to measure improvement."}
        </p>
        <p className="text-sm text-gray-400">{questions.length} questions</p>
        <Button
          size="lg"
          onClick={() => setStarted(true)}
          className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white"
          data-testid={`button-start-${testType}`}
        >
          {testType === "pretest" ? "Start Pre-Test" : "Start Post-Test"}
        </Button>
      </div>
    );
  }

  if (complete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold" data-testid={`text-${testType}-result`}>
          {testType === "pretest" ? "Pre-Test Complete!" : "Post-Test Complete!"}
        </h2>
        <p className="text-xl text-gray-600" data-testid={`text-${testType}-score`}>
          Scored {score} / {questions.length} ({percentage}%)
        </p>
        <Progress value={percentage} className="w-64 h-3 mx-auto" />

        {testType === "posttest" && preTestScore && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-emerald-100 max-w-md mx-auto space-y-3" data-testid="section-score-comparison">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Score Comparison
            </h3>
            <div className="flex items-center justify-center gap-3 text-lg">
              <span className="font-semibold text-blue-700">Pre-Test: {preTestScore.percentage}%</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-emerald-700">Post-Test: {percentage}%</span>
            </div>
            {percentage - preTestScore.percentage > 0 ? (
              <p className="text-emerald-600 font-bold text-lg" data-testid="text-improvement">
                +{percentage - preTestScore.percentage}% improvement! 🎉
              </p>
            ) : percentage - preTestScore.percentage === 0 ? (
              <p className="text-gray-600 font-medium">Same score — review the lesson and try again!</p>
            ) : (
              <p className="text-orange-600 font-medium">
                {percentage - preTestScore.percentage}% — Don't worry, revisit the material and try again!
              </p>
            )}
          </div>
        )}

        {testType === "pretest" && (
          <p className="text-gray-500 text-sm">Now proceed to the Lesson Content tab to study the material!</p>
        )}
      </Card>
    );
  }

  const progressPercent = ((currentQ + 1) / questions.length) * 100;
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-primary uppercase tracking-wider" data-testid={`text-${testType}-progress`}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <span className="text-sm text-gray-400">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900" data-testid={`text-${testType}-question`}>
        {questions[currentQ].question}
      </h3>
      <div className="grid gap-4">
        {questions[currentQ].options.map((option, i) => {
          const isCorrect = i === questions[currentQ].correct;
          const isSelected = selectedAnswer === i;
          let cardStyle = "hover:bg-primary/5 hover:border-primary/40 hover:shadow-md cursor-pointer";
          if (selectedAnswer !== null) {
            if (isCorrect) cardStyle = "bg-emerald-50 border-emerald-400 text-emerald-900";
            else if (isSelected) cardStyle = "bg-red-50 border-red-400 text-red-900";
            else cardStyle = "opacity-60";
          }
          return (
            <Card
              key={i}
              className={`border shadow-sm transition-all ${cardStyle}`}
              onClick={() => selectedAnswer === null && handleAnswer(i)}
              data-testid={`card-${testType}-option-${i}`}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  selectedAnswer !== null && isCorrect ? "bg-emerald-500 text-white" :
                  isSelected && !isCorrect ? "bg-red-500 text-white" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {selectedAnswer !== null && isCorrect ? <CheckCircle2 className="w-5 h-5" /> :
                   isSelected && !isCorrect ? <XCircle className="w-5 h-5" /> :
                   String.fromCharCode(65 + i)}
                </div>
                <span className="pt-1">{option}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {showFeedback && (
        <div className={`p-4 rounded-xl border ${
          selectedAnswer === questions[currentQ].correct
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`} data-testid={`text-${testType}-rationale`}>
          <p className="font-bold mb-1">{selectedAnswer === questions[currentQ].correct ? "✓ Correct!" : "✗ Incorrect"}</p>
          <p className="text-sm">{questions[currentQ].rationale}</p>
        </div>
      )}
    </div>
  );
}

export default function LessonDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("pretest");
  const [preTestDone, setPreTestDone] = useState(false);
  const [postTestDone, setPostTestDone] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteSaving, setNoteSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const { toast } = useToast();
  const { user, hasAccess } = useAuth();

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

  const lessonTier = getLessonTier(id || "");
  const userHasAccess = user && (user.tier === "admin" || hasAccess(lessonTier));

  useEffect(() => {
    if (user && id) {
      fetch(`/api/notes/${user.id}/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.content) setNoteContent(data.content);
        })
        .catch(() => {});
    }
  }, [user, id]);

  const saveNote = useCallback(() => {
    if (!user || !id) return;
    setNoteSaving(true);
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, lessonId: id, content: noteContent }),
    })
      .then(() => setNoteSaving(false))
      .catch(() => setNoteSaving(false));
  }, [user, id, noteContent]);

  const handleNoteChange = (value: string) => {
    setNoteContent(value);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (user && id) {
        fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, lessonId: id, content: value }),
        });
      }
    }, 2000);
  };

  const preTestQuestions = useMemo(() => {
    return getTestQuestions(lessonContent, "pretest");
  }, [lessonContent]);

  const postTestQuestions = useMemo(() => {
    return getTestQuestions(lessonContent, "posttest");
  }, [lessonContent]);

  async function handleSubscribe() {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, tier: lessonTier }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      toast({ title: "Error", description: "Could not start checkout", variant: "destructive" });
    }
  }

  const isPeds = id?.includes("peds") || id === "epiglottitis" || id === "cp-management" || id === "kawasaki-critical" || id === "all-leukemia";
  const isMeds = id?.includes("safety") || id?.includes("labs") || id?.includes("mi-management");

  if (!userHasAccess) {
    const tp = tierPricing[lessonTier];
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <SEO title={`${lessonContent?.title || "Lesson"} - NurseNest`} description="Subscribe to access this lesson" />
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-20 w-full text-center space-y-8">
          <Link href="/lessons">
            <Button variant="ghost" className="mb-4 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Lessons
            </Button>
          </Link>

          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-4xl font-bold">{lessonContent.title}</h1>
          <p className="text-lg text-gray-600">
            This lesson requires a <strong>{tp.name}</strong> subscription to access.
          </p>

          <Card className="border-none shadow-xl max-w-sm mx-auto">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <Crown className="w-6 h-6 text-amber-500" />
                <span className="text-xl font-bold">{tp.name} Tier</span>
              </div>
              <p className="text-3xl font-bold text-primary">{region === "CA" ? tp.priceCAD : tp.priceUSD}</p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Full access to all {tp.name} lessons</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Flashcards and question bank</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Progress tracking and reports</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Note-taking and study tools</li>
              </ul>
              <Button className="w-full rounded-full h-12 text-lg" onClick={handleSubscribe} data-testid="button-subscribe">
                {user ? "Subscribe Now" : "Sign In to Subscribe"}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 select-none" onContextMenu={(e) => e.preventDefault()}>
      <SEO
        title={`${lessonContent?.title || "Lesson"} - NurseNest Pathophysiology`}
        description={`Deep-dive into ${lessonContent?.title || "nursing pathophysiology"}: cellular mechanisms, clinical signs, medications, safety pearls, and quiz questions.`}
        keywords={`${lessonContent?.title || "nursing"} pathophysiology, NCLEX, clinical nursing`}
        canonicalPath={`/lessons/${id}`}
        ogType="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          "name": lessonContent?.title || "Nursing Lesson",
          "description": `Comprehensive nursing pathophysiology lesson on ${lessonContent?.title || "clinical topics"}`,
          "learningResourceType": "Lesson",
          "educationalLevel": "College",
        }}
      />
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/lessons">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Button>
          </Link>
          <Button 
            variant={showNotes ? "default" : "outline"} 
            onClick={() => setShowNotes(!showNotes)}
            className="gap-2"
            data-testid="button-toggle-notes"
          >
            <StickyNote className="w-4 h-4" />
            {showNotes ? "Hide Notes" : "My Notes"}
          </Button>
        </div>

        {showNotes && (
          <Card className="mb-8 border-none shadow-lg bg-yellow-50/80">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <StickyNote className="w-5 h-5 text-yellow-600" /> Lesson Notes
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{noteSaving ? "Saving..." : "Auto-saved"}</span>
                  <Button variant="ghost" size="sm" onClick={saveNote} data-testid="button-save-note">
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={noteContent}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Type your study notes here... They auto-save as you type and you can view them in your profile."
                className="min-h-[150px] bg-white border-yellow-200 focus:border-yellow-400 print:block"
                data-testid="textarea-notes"
              />
              <p className="text-xs text-gray-400">Notes are auto-saved. You can view and print all your notes from your profile page.</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
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
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {lessonTier === "np" ? "NP Focus" : lessonTier === "rn" ? "NCLEX Focus" : "REX-PN Focus"}
                  </span>
                  <span data-testid="lesson-difficulty-badge" className={`px-3 py-1 rounded-full text-sm font-bold ${config.bg} ${config.color}`}>
                    Difficulty: {config.label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-bold">
                    {region === "CA" ? "Canadian Guidelines" : "US Guidelines"}
                  </span>
                </div>
              );
            })()}
          </div>

          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Learning Progress</p>
                <p className="text-gray-600">Complete pre-test, study, then take the post-test.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{postTestDone ? "100%" : preTestDone ? "50%" : "0%"}</p>
                <Progress value={postTestDone ? 100 : preTestDone ? 50 : 0} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="tabs-lesson">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="pretest" className="gap-2 text-sm" data-testid="tab-pretest">
                <BarChart3 className="w-4 h-4" />
                Pre-Test
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-2 text-sm" data-testid="tab-content">
                <BookOpen className="w-4 h-4" />
                Lesson Content
              </TabsTrigger>
              <TabsTrigger value="posttest" className="gap-2 text-sm" data-testid="tab-posttest">
                <TrendingUp className="w-4 h-4" />
                Post-Test
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pretest" className="mt-6">
              <QuizSection
                questions={preTestQuestions}
                lessonId={id || ""}
                testType="pretest"
                onComplete={() => setPreTestDone(true)}
              />
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <div className="space-y-12">
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

                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <AlertCircle className="text-orange-500 w-8 h-8" />
                    <h2>Clinical Signs and Danger Signs</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
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
                    <Card className="border-none shadow-md bg-white border-l-4 border-l-orange-400">
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
                  </div>
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
                    <h2>Clinical Mastery</h2>
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
              </div>
            </TabsContent>

            <TabsContent value="posttest" className="mt-6">
              <QuizSection
                questions={postTestQuestions}
                lessonId={id || ""}
                testType="posttest"
                onComplete={() => {
                  setPostTestDone(true);
                  if (user) {
                    fetch("/api/progress", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: user.id,
                        lessonId: id,
                        completed: "true",
                      }),
                    }).catch(() => {});
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <style>{`
        @media print {
          .select-none { user-select: text !important; -webkit-user-select: text !important; }
        }
      `}</style>
    </div>
  );
}
