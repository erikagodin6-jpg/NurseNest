import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { getExamQuestions, type PooledQuestion } from "@/lib/question-pool";
import { fetchFilterOptions, type FilterOptions } from "@/lib/qbank-api";
import { CheckCircle2, XCircle, Filter, RotateCcw, ChevronLeft, ChevronRight, Trophy, Target, Lock, Crown, Lightbulb, Crosshair, BookOpen, Bookmark, Clock, GraduationCap, PenLine, BarChart3 } from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";
import { LocaleLink } from "@/lib/LocaleLink";
import { useAuth } from "@/lib/auth";
import { canAccessTier } from "@/lib/access";
import { useLocation } from "wouter";
import { getTierConfig, getAllowedExamTiers } from "@shared/tier-config";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ConfidenceRatingModal } from "@/components/study-momentum";

const FREE_PREVIEW_COUNT = 3;

type QBankMode = "study" | "exam";

interface ExamSessionState {
  questions: PooledQuestion[];
  shuffledOptions: { options: string[]; correctIndex: number }[];
  answers: Record<number, number>;
  currentIndex: number;
  timeRemaining: number;
  timerActive: boolean;
  submitted: boolean;
}

function shuffleWithMapping(options: string[], correctIndex: number): { options: string[]; correctIndex: number } {
  const indexed = options.map((opt, i) => ({ opt, origIdx: i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrectIdx = indexed.findIndex(item => item.origIdx === correctIndex);
  return { options: indexed.map(item => item.opt), correctIndex: newCorrectIdx };
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const DIFFICULTY_LABELS: Record<number, string> = { 1: "Easy", 2: "Easy", 3: "Moderate", 4: "Hard", 5: "Expert" };

export default function QuestionBank() {
  const { user, effectiveTier } = useAuth();
  const [, setLocation] = useLocation();
  const allowedQBankTiers = getAllowedExamTiers(effectiveTier || "free");
  const defaultTierFilter = allowedQBankTiers.length === 1 ? allowedQBankTiers[0] : (allowedQBankTiers.length > 0 ? allowedQBankTiers[0] : "all");
  const [tierFilter, setTierFilter] = useState<string>(defaultTierFilter);
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [examFilter, setExamFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");

  const [mode, setMode] = useState<QBankMode>("study");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [showConfidence, setShowConfidence] = useState(false);
  const [confidenceRated, setConfidenceRated] = useState(false);
  const [allQuestions, setAllQuestions] = useState<PooledQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  const [examSession, setExamSession] = useState<ExamSessionState | null>(null);
  const [examQuestionCount, setExamQuestionCount] = useState<number>(25);
  const [examTimerMinutes, setExamTimerMinutes] = useState<number>(45);
  const examTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const userCanAccessTier = (questionTier: string) => {
    if (!questionTier || questionTier === "free") return true;
    if (!user || !effectiveTier || effectiveTier === "free") {
      if (user?.testerAccess) return canAccessTier(effectiveTier, questionTier, user.testerAccess, user.testerExpiry);
      return false;
    }
    if (effectiveTier === "admin") return true;
    return canAccessTier(effectiveTier, questionTier, user?.testerAccess, user?.testerExpiry);
  };

  useEffect(() => {
    let tier = tierFilter;
    if (tier === "all") {
      tier = allowedQBankTiers.length > 0 ? allowedQBankTiers[0] : (effectiveTier || "rpn");
    }
    if (allowedQBankTiers.length > 0 && !allowedQBankTiers.includes(tier)) {
      tier = allowedQBankTiers[0];
      setTierFilter(tier);
      return;
    }

    fetchFilterOptions(tier).then(setFilterOptions).catch(() => {});

    const filters: Record<string, string> = {};
    if (examFilter !== "all") filters.exam = examFilter;
    if (difficultyFilter !== "all") filters.difficulty = difficultyFilter;
    if (topicFilter !== "all") filters.topic = topicFilter;

    setLoadingQuestions(true);
    getExamQuestions(
      tier,
      200,
      systemFilter !== "all" ? [systemFilter] : undefined,
      Object.keys(filters).length > 0 ? filters : undefined
    ).then((questions) => {
      setAllQuestions(questions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setRevealed(false);
      setLoadingQuestions(false);
    }).catch(() => setLoadingQuestions(false));
  }, [tierFilter, effectiveTier, systemFilter, examFilter, difficultyFilter, topicFilter]);

  const isTierLocked = tierFilter !== "all" && !userCanAccessTier(tierFilter);
  const accessibleQuestions = useMemo(() => {
    if (isTierLocked) return [];
    if (!user || !effectiveTier || effectiveTier === "free") {
      return allQuestions.slice(0, FREE_PREVIEW_COUNT);
    }
    return allQuestions;
  }, [allQuestions, user, effectiveTier, isTierLocked]);

  const bodySystems = useMemo(() => {
    if (filterOptions?.categories) return filterOptions.categories;
    const systems = new Set(allQuestions.map(q => q.bodySystem));
    return Array.from(systems).sort();
  }, [allQuestions, filterOptions]);

  const question = mode === "exam" && examSession ? examSession.questions[examSession.currentIndex] : accessibleQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (mode === "exam" && examSession) {
      if (examSession.submitted) return;
      setExamSession(prev => prev ? {
        ...prev,
        answers: { ...prev.answers, [prev.currentIndex]: idx },
      } : null);
      return;
    }
    if (revealed) return;
    setSelectedAnswer(idx);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setRevealed(true);
    setStats(prev => ({
      correct: prev.correct + (selectedAnswer === question?.correct ? 1 : 0),
      total: prev.total + 1,
    }));
    if (user) {
      setShowConfidence(true);
      setConfidenceRated(false);
    }
  };

  const handleConfidenceClose = () => {
    setShowConfidence(false);
    setConfidenceRated(true);
  };

  const handleNext = () => {
    if (currentIndex < accessibleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedAnswer(null);
    setRevealed(false);
    setShowConfidence(false);
    setConfidenceRated(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(accessibleQuestions.length - 1);
    }
    setSelectedAnswer(null);
    setRevealed(false);
    setShowConfidence(false);
    setConfidenceRated(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setStats({ correct: 0, total: 0 });
  };

  const startExamSession = useCallback(() => {
    if (accessibleQuestions.length === 0) return;
    const count = Math.min(examQuestionCount, accessibleQuestions.length);
    const shuffledQuestions = shuffleArray(accessibleQuestions).slice(0, count);
    const shuffledOpts = shuffledQuestions.map(q => shuffleWithMapping(q.options, q.correct));
    setExamSession({
      questions: shuffledQuestions,
      shuffledOptions: shuffledOpts,
      answers: {},
      currentIndex: 0,
      timeRemaining: examTimerMinutes * 60,
      timerActive: true,
      submitted: false,
    });
  }, [accessibleQuestions, examQuestionCount, examTimerMinutes]);

  useEffect(() => {
    if (!examSession || !examSession.timerActive || examSession.submitted) return;
    examTimerRef.current = setInterval(() => {
      setExamSession(prev => {
        if (!prev || prev.submitted) return prev;
        if (prev.timeRemaining <= 1) {
          clearInterval(examTimerRef.current);
          return { ...prev, timeRemaining: 0, timerActive: false, submitted: true };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
    return () => clearInterval(examTimerRef.current);
  }, [examSession?.timerActive, examSession?.submitted]);

  const submitExam = () => {
    if (!examSession) return;
    clearInterval(examTimerRef.current);
    setExamSession(prev => prev ? { ...prev, submitted: true, timerActive: false } : null);
  };

  const exitExam = () => {
    clearInterval(examTimerRef.current);
    setExamSession(null);
  };

  const examReport = useMemo(() => {
    if (!examSession?.submitted) return null;
    const { questions, shuffledOptions, answers } = examSession;
    let correct = 0;
    const systemScores: Record<string, { correct: number; total: number }> = {};
    const diffScores: Record<string, { correct: number; total: number }> = {};
    const review: { question: PooledQuestion; userAnswer: number; correctAnswer: number; isCorrect: boolean; shuffled: { options: string[]; correctIndex: number } }[] = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const so = shuffledOptions[i];
      const userAns = answers[i] ?? -1;
      const isCorrect = userAns === so.correctIndex;
      if (isCorrect) correct++;

      const sys = q.bodySystem || "General";
      if (!systemScores[sys]) systemScores[sys] = { correct: 0, total: 0 };
      systemScores[sys].total++;
      if (isCorrect) systemScores[sys].correct++;

      const diffLabel = DIFFICULTY_LABELS[q.difficulty || 3] || "Moderate";
      if (!diffScores[diffLabel]) diffScores[diffLabel] = { correct: 0, total: 0 };
      diffScores[diffLabel].total++;
      if (isCorrect) diffScores[diffLabel].correct++;

      review.push({ question: q, userAnswer: userAns, correctAnswer: so.correctIndex, isCorrect, shuffled: so });
    }

    return {
      score: correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      systemBreakdown: Object.entries(systemScores)
        .map(([system, s]) => ({ system, ...s, percentage: Math.round((s.correct / s.total) * 100) }))
        .sort((a, b) => a.percentage - b.percentage),
      difficultyBreakdown: Object.entries(diffScores)
        .map(([level, s]) => ({ level, ...s, percentage: Math.round((s.correct / s.total) * 100) })),
      review,
    };
  }, [examSession?.submitted]);

  const isCorrect = mode === "study" ? selectedAnswer === question?.correct : false;
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const qbTierConfig = getTierConfig(effectiveTier);
  const qbTitle = (effectiveTier && effectiveTier !== "free" && effectiveTier !== "admin")
    ? qbTierConfig.questionBankLabel
    : "Question Bank";

  if (mode === "exam" && examSession?.submitted && examReport) {
    return (
      <>
        <SEO title={`${qbTitle} - Exam Results`} description="View your practice exam results." canonicalPath="/question-bank" />
        <Navigation />
        <main className="min-h-screen bg-warmwhite">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <BreadcrumbNav />
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900" data-testid="text-exam-results-title">Practice Exam Results</h1>
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl ${examReport.percentage >= 70 ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
                <Trophy className={`h-6 w-6 ${examReport.percentage >= 70 ? "text-green-600" : "text-amber-600"}`} />
                <span className={`text-3xl font-bold ${examReport.percentage >= 70 ? "text-green-700" : "text-amber-700"}`} data-testid="text-exam-score">
                  {examReport.percentage}%
                </span>
                <span className="text-gray-500 text-sm">({examReport.score}/{examReport.total})</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Card data-testid="card-system-breakdown">
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> By Body System</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {examReport.systemBreakdown.map(s => (
                    <div key={s.system} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate flex-1">{s.system}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.percentage >= 70 ? "bg-green-500" : s.percentage >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${s.percentage}%` }} />
                        </div>
                        <span className="text-gray-500 w-16 text-right">{s.correct}/{s.total} ({s.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card data-testid="card-difficulty-breakdown">
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4" /> By Difficulty</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {examReport.difficultyBreakdown.map(d => (
                    <div key={d.level} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{d.level}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${d.percentage >= 70 ? "bg-green-500" : d.percentage >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${d.percentage}%` }} />
                        </div>
                        <span className="text-gray-500 w-16 text-right">{d.correct}/{d.total} ({d.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6" data-testid="card-exam-review">
              <CardHeader><CardTitle className="text-base">Question Review</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {examReport.review.map((r, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${r.isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`} data-testid={`review-item-${i}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-sm font-bold text-gray-500">Q{i + 1}.</span>
                      {r.isCorrect ? <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />}
                      <span className="text-sm text-gray-800">{r.question.question}</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {r.shuffled.options.map((opt, oi) => (
                        <div key={oi} className={`text-xs px-2 py-1 rounded ${
                          oi === r.correctAnswer ? "bg-green-100 text-green-800 font-medium" :
                          oi === r.userAnswer && !r.isCorrect ? "bg-red-100 text-red-700" : "text-gray-600"
                        }`}>
                          {String.fromCharCode(65 + oi)}. {opt}
                        </div>
                      ))}
                      <p className="text-xs text-gray-600 mt-2 italic">{r.question.rationale}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => { exitExam(); startExamSession(); }} className="bg-gray-900 text-white" data-testid="button-retake-exam">Retake Exam</Button>
              <Button variant="outline" onClick={exitExam} data-testid="button-back-to-study">Back to Question Bank</Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (mode === "exam" && examSession && !examSession.submitted) {
    const eq = examSession.questions[examSession.currentIndex];
    const so = examSession.shuffledOptions[examSession.currentIndex];
    const userAnswer = examSession.answers[examSession.currentIndex];
    const answeredCount = Object.keys(examSession.answers).length;
    const progressPct = (answeredCount / examSession.questions.length) * 100;

    return (
      <>
        <SEO title={`${qbTitle} - Practice Exam`} description="Timed practice exam with randomized questions." canonicalPath="/question-bank" />
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" data-testid="exam-mode-top-bar">
            <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700" data-testid="text-exam-mode-progress">
                  Q {examSession.currentIndex + 1} of {examSession.questions.length}
                </span>
                <div className="w-24 h-1.5 rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full rounded-full bg-gray-700 transition-all" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 text-sm font-mono font-medium ${examSession.timeRemaining < 300 ? "text-red-600" : "text-gray-700"}`} data-testid="text-exam-timer">
                  <Clock className="h-4 w-4" />
                  {formatTime(examSession.timeRemaining)}
                </div>
                <Badge variant="secondary" className="text-xs" data-testid="badge-answered-count">{answeredCount}/{examSession.questions.length} answered</Badge>
                <Button size="sm" variant="destructive" onClick={submitExam} data-testid="button-submit-exam">Submit Exam</Button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            {eq && (
              <Card className="shadow-sm border border-gray-200 bg-white" data-testid="card-exam-question">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="uppercase bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">{eq.bodySystem}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-relaxed text-gray-900" data-testid="text-exam-q-text">{eq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {so.options.map((opt, idx) => {
                      let cls = "border-gray-200 hover:border-gray-400 hover:bg-gray-50";
                      if (idx === userAnswer) cls = "border-gray-900 bg-gray-50";
                      return (
                        <button
                          key={idx}
                          data-testid={`button-exam-option-${idx}`}
                          onClick={() => handleAnswer(idx)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 cursor-pointer ${cls}`}
                        >
                          <span className={`font-semibold shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                            idx === userAnswer ? "border-gray-900 text-gray-900 bg-gray-100" : "border-gray-300 text-gray-500"
                          }`}>{String.fromCharCode(65 + idx)}</span>
                          <span className="flex-1 text-gray-800">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setExamSession(prev => prev ? { ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) } : null)}
                      disabled={examSession.currentIndex === 0}
                      className="flex-1 border-gray-200"
                      data-testid="button-exam-prev"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    {examSession.currentIndex < examSession.questions.length - 1 ? (
                      <Button
                        onClick={() => setExamSession(prev => prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null)}
                        className="flex-1 bg-gray-900 text-white"
                        data-testid="button-exam-next"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button onClick={submitExam} className="flex-1 bg-green-700 hover:bg-green-800 text-white" data-testid="button-exam-finish">
                        Finish & Submit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${qbTitle} - Practice Questions`}
        description="Practice thousands of nursing questions with instant rationale. Filter by tier (RPN, RN, NP) and body system. Prepare for NCLEX and Canadian nursing exams."
        canonicalPath="/question-bank"
        keywords="nursing question bank, practice questions, NCLEX prep, nursing exam questions, RPN questions, RN questions, NP questions"
      />

      <Navigation />

      <main className="min-h-screen bg-warmwhite">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <BreadcrumbNav />
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900" data-testid="text-qb-title">
              {qbTitle}
            </h1>
            <p className="text-gray-500">
              Practice {accessibleQuestions.length.toLocaleString()} questions with detailed rationales
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6" data-testid="mode-selector">
            <Button
              variant={mode === "study" ? "default" : "outline"}
              size="sm"
              onClick={() => { setMode("study"); setExamSession(null); }}
              className={`rounded-full gap-1.5 ${mode === "study" ? "bg-gray-900 text-white" : "border-gray-200"}`}
              data-testid="button-mode-study"
            >
              <BookOpen className="h-4 w-4" /> Study Mode
            </Button>
            <Button
              variant={mode === "exam" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("exam")}
              className={`rounded-full gap-1.5 ${mode === "exam" ? "bg-gray-900 text-white" : "border-gray-200"}`}
              data-testid="button-mode-exam"
            >
              <PenLine className="h-4 w-4" /> Exam Mode
            </Button>
          </div>

          {mode === "exam" && !examSession && (
            <Card className="mb-6 border-gray-200" data-testid="card-exam-config">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Configure Practice Exam
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Number of Questions</label>
                    <Select value={String(examQuestionCount)} onValueChange={(v) => setExamQuestionCount(Number(v))}>
                      <SelectTrigger className="border-gray-200" data-testid="select-exam-count">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 questions</SelectItem>
                        <SelectItem value="25">25 questions</SelectItem>
                        <SelectItem value="50">50 questions</SelectItem>
                        <SelectItem value="75">75 questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Time Limit</label>
                    <Select value={String(examTimerMinutes)} onValueChange={(v) => setExamTimerMinutes(Number(v))}>
                      <SelectTrigger className="border-gray-200" data-testid="select-exam-time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  <p>Questions and answer choices will be randomized. Rationale is hidden until you submit.</p>
                  <p>A performance summary by body system and difficulty will be shown at the end.</p>
                </div>
                <Button
                  onClick={startExamSession}
                  disabled={accessibleQuestions.length === 0 || loadingQuestions}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-5 text-base"
                  data-testid="button-start-exam"
                >
                  <PenLine className="h-4 w-4 mr-2" /> Start Practice Exam ({Math.min(examQuestionCount, accessibleQuestions.length)} questions, {examTimerMinutes} min)
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              {allowedQBankTiers.length !== 1 && (
              <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); setExamFilter("all"); setDifficultyFilter("all"); setTopicFilter("all"); setSystemFilter("all"); }}>
                <SelectTrigger className="w-[140px] border-gray-200 bg-white" data-testid="select-tier">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  {allowedQBankTiers.length === 0 && <SelectItem value="all">All Tiers</SelectItem>}
                  {allowedQBankTiers.map(t => (
                    <SelectItem key={t} value={t}>{t === "rpn" ? "RPN/LVN" : t.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              )}

              <Select value={systemFilter} onValueChange={(v) => { setSystemFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                <SelectTrigger className="w-[160px] border-gray-200 bg-white" data-testid="select-system">
                  <SelectValue placeholder="Body System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Systems</SelectItem>
                  {bodySystems.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filterOptions?.exams && filterOptions.exams.length > 1 && (
                <Select value={examFilter} onValueChange={(v) => { setExamFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                  <SelectTrigger className="w-[140px] border-gray-200 bg-white" data-testid="select-exam-type">
                    <SelectValue placeholder="Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    {filterOptions.exams.map(e => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={difficultyFilter} onValueChange={(v) => { setDifficultyFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                <SelectTrigger className="w-[130px] border-gray-200 bg-white" data-testid="select-difficulty">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              {filterOptions?.topics && filterOptions.topics.length > 0 && (
                <Select value={topicFilter} onValueChange={(v) => { setTopicFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                  <SelectTrigger className="w-[160px] border-gray-200 bg-white" data-testid="select-topic">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {filterOptions.topics.slice(0, 50).map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="ml-auto flex items-center gap-4">
              {stats.total > 0 && mode === "study" && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span data-testid="text-accuracy">{accuracy}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span data-testid="text-score">{stats.correct}/{stats.total}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-500 hover:text-gray-700" data-testid="button-reset">
                    <RotateCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isTierLocked && (
            <Card className="border-primary/20 bg-primary/5 mb-6" data-testid="card-qb-paywall">
              <CardContent className="p-8 text-center">
                <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2" data-testid="text-qb-locked">
                  {tierFilter === "rpn" ? "RPN/LVN" : tierFilter === "rn" ? "RN" : "NP"} Questions Require a Subscription
                </h3>
                <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
                  Practice questions with detailed rationales are available with a subscription. Upgrade to unlock full access.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {!user ? (
                    <Button onClick={() => setLocation("/start-free")} className="rounded-xl gap-2" data-testid="button-qb-signup">
                      Start Free - No Credit Card
                    </Button>
                  ) : null}
                  <Button onClick={() => setLocation("/pricing")} variant={user ? "default" : "outline"} className="rounded-xl gap-2" data-testid="button-qb-upgrade">
                    <Crown className="w-4 h-4" /> View Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {(!user || effectiveTier === "free") && tierFilter === "all" && accessibleQuestions.length < allQuestions.length && (
            <Card className="border-amber-200 bg-amber-50/50 mb-6" data-testid="card-qb-preview-notice">
              <CardContent className="p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-amber-800 font-medium">
                    Showing {accessibleQuestions.length} preview questions. Subscribe to unlock all {allQuestions.length.toLocaleString()} questions.
                  </p>
                </div>
                <Button size="sm" onClick={() => setLocation(user ? "/pricing" : "/start-free")} className="rounded-xl shrink-0" data-testid="button-qb-unlock">
                  Unlock All
                </Button>
              </CardContent>
            </Card>
          )}

          {mode === "study" && (
            <>
              {accessibleQuestions.length === 0 ? (
                <Card className="border-gray-200 bg-white">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500" data-testid="text-no-questions">{isTierLocked ? "Subscribe to access these questions." : loadingQuestions ? "Loading questions..." : "No questions match your filters. Try adjusting the filters."}</p>
                  </CardContent>
                </Card>
              ) : question ? (
                <>
                  <Card className="mb-4 shadow-sm border border-gray-200 bg-white" data-testid="card-question">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="uppercase bg-gray-100 text-gray-700 hover:bg-gray-100 border-0" data-testid="badge-q-tier">
                            {question.tier === "rpn" ? "RPN/LVN" : question.tier === "rn" ? "RN" : "NP"}
                          </Badge>
                          <Badge variant="outline" className="border-gray-200 text-gray-600" data-testid="badge-q-system">{question.bodySystem}</Badge>
                          {question.exam && (
                            <Badge variant="outline" className="border-blue-200 text-blue-600 text-xs" data-testid="badge-q-exam">{question.exam}</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-400" data-testid="text-progress">
                          {currentIndex + 1} / {accessibleQuestions.length}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-relaxed text-gray-900" data-testid="text-q-text">
                        {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {question.options.map((opt, idx) => {
                          let cls = "border-gray-200 hover:border-gray-400 hover:bg-gray-50";
                          let iconEl = null;

                          if (revealed) {
                            if (idx === question.correct) {
                              cls = "border-green-500 bg-green-50";
                              iconEl = <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />;
                            } else if (idx === selectedAnswer && !isCorrect) {
                              cls = "border-red-400 bg-red-50";
                              iconEl = <XCircle className="h-5 w-5 text-red-500 shrink-0" />;
                            } else {
                              cls = "border-gray-200 opacity-60";
                            }
                          } else if (idx === selectedAnswer) {
                            cls = "border-gray-900 bg-gray-50";
                          }

                          return (
                            <button
                              key={idx}
                              data-testid={`button-qb-option-${idx}`}
                              onClick={() => handleAnswer(idx)}
                              disabled={revealed}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${cls} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                            >
                              <span className={`font-semibold shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                                revealed && idx === question.correct
                                  ? "border-green-500 text-green-700 bg-green-100"
                                  : revealed && idx === selectedAnswer && !isCorrect
                                    ? "border-red-400 text-red-600 bg-red-100"
                                    : idx === selectedAnswer && !revealed
                                      ? "border-gray-900 text-gray-900 bg-gray-100"
                                      : "border-gray-300 text-gray-500"
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="flex-1 text-gray-800">{opt}</span>
                              {iconEl}
                            </button>
                          );
                        })}
                      </div>

                      {!revealed ? (
                        <Button
                          onClick={handleCheck}
                          disabled={selectedAnswer === null}
                          className="w-full py-6 text-lg bg-gray-900 hover:bg-gray-800 text-white"
                          size="lg"
                          data-testid="button-qb-check"
                        >
                          Check Answer
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`} data-testid="section-result-header">
                            <p className={`font-bold text-base ${isCorrect ? "text-green-800" : "text-amber-800"}`} data-testid="text-qb-result">
                              {isCorrect ? "Correct!" : "Incorrect"}
                            </p>
                            <p className="text-sm font-medium text-gray-700 mt-1">
                              Correct Answer: {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-white border border-gray-200" data-testid="section-rationale">
                            <p className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Why This Is Correct</p>
                            <p className="text-sm leading-relaxed text-gray-700" data-testid="text-qb-rationale">{question.rationale}</p>
                          </div>

                          {question.distractorRationales && Object.keys(question.distractorRationales).length > 0 && (
                            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200" data-testid="section-distractor-rationales">
                              <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Why Other Options Are Wrong</p>
                              <div className="space-y-3">
                                {question.options.map((opt, idx) => {
                                  if (idx === question.correct) return null;
                                  const key = String.fromCharCode(65 + idx);
                                  const rationale = question.distractorRationales?.[key] || question.distractorRationales?.[key.toLowerCase()] || question.distractorRationales?.[String(idx)];
                                  if (!rationale) return null;
                                  return (
                                    <div key={idx} className="pl-3 border-l-2 border-gray-300">
                                      <p className="text-sm font-semibold text-gray-700">{key}. {opt}</p>
                                      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{rationale}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {question.clinicalPearl && (
                            <div className="p-4 rounded-lg bg-violet-50 border border-violet-200" data-testid="section-clinical-pearl">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="h-4 w-4 text-violet-600" />
                                <p className="text-sm font-bold text-violet-800 uppercase tracking-wide">Clinical Pearl</p>
                              </div>
                              <p className="text-sm leading-relaxed text-violet-900">{question.clinicalPearl}</p>
                            </div>
                          )}

                          {question.examStrategy && (
                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200" data-testid="section-exam-strategy">
                              <div className="flex items-center gap-2 mb-2">
                                <Crosshair className="h-4 w-4 text-blue-600" />
                                <p className="text-sm font-bold text-blue-800 uppercase tracking-wide">Exam Strategy</p>
                              </div>
                              <p className="text-sm leading-relaxed text-blue-900">{question.examStrategy}</p>
                            </div>
                          )}

                          {question.memoryHook && (
                            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200" data-testid="section-memory-hook">
                              <div className="flex items-center gap-2 mb-2">
                                <Bookmark className="h-4 w-4 text-amber-600" />
                                <p className="text-sm font-bold text-amber-800 uppercase tracking-wide">Memory Hook</p>
                              </div>
                              <p className="text-sm leading-relaxed text-amber-900 font-medium italic">{question.memoryHook}</p>
                            </div>
                          )}

                          {revealed && question.difficulty && (
                            <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                              <span>Difficulty: {DIFFICULTY_LABELS[question.difficulty] || question.difficulty}</span>
                              {question.frameworkUsed && <span>Framework: {question.frameworkUsed}</span>}
                              {question.questionType && <span>Type: {question.questionType}</span>}
                            </div>
                          )}

                          {showConfidence && question && selectedAnswer !== null && (
                            <ConfidenceRatingModal
                              questionId={`qb-${question.tier}-${currentIndex}`}
                              wasCorrect={isCorrect}
                              topic={question.bodySystem}
                              bodySystem={question.bodySystem}
                              onClose={handleConfidenceClose}
                            />
                          )}

                          <div className="flex gap-2">
                            <Button variant="outline" onClick={handlePrev} className="flex-1 border-gray-200 hover:bg-gray-50" data-testid="button-prev">
                              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                            </Button>
                            <Button onClick={handleNext} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white" data-testid="button-next">
                              Next Question <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {!revealed && (
                    <div className="flex justify-between">
                      <Button variant="ghost" onClick={handlePrev} className="text-gray-500 hover:text-gray-700" data-testid="button-nav-prev">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                      </Button>
                      <Button variant="ghost" onClick={handleNext} className="text-gray-500 hover:text-gray-700" data-testid="button-nav-next">
                        Skip <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              ) : null}
            </>
          )}

          <div className="mt-10 pt-6 border-t border-gray-100" data-testid="section-related-tools">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Related Study Tools</p>
            <div className="flex flex-wrap gap-2">
              <LocaleLink href="/lessons" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-lessons">Clinical Lessons</LocaleLink>
              <LocaleLink href="/flashcards" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-flashcards">Flashcards</LocaleLink>
              <LocaleLink href="/mock-exams" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-mock-exams">Mock Exams</LocaleLink>
              <LocaleLink href="/anatomy" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-anatomy">Anatomy Explorer</LocaleLink>
              <LocaleLink href="/med-math" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-med-math">Med Math</LocaleLink>
              <LocaleLink href="/clinical-clarity" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all text-xs font-medium text-gray-600 hover:text-gray-800" data-testid="link-related-clinical-clarity">Clinical Clarity</LocaleLink>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-8 space-y-1">
            <p>NurseNest is an independent educational platform.</p>
            <p>NurseNest is NOT affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any regulatory body.</p>
          </div>
        </div>
      </main>

      <AdminEditButton pageName="question-bank" />
      <Footer />
    </>
  );
}
