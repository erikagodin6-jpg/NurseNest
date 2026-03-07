import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import type { PooledQuestion } from "@/lib/question-pool";
import {
  initCAT, selectNextItem, updateAbility, shouldStop,
  getPassFailResult, getDomainBands, computeScaledScore,
  getReadinessScore, getWeakAreas, getDifficultyDistribution,
  type CATState
} from "@/lib/cat-engine";
import {
  Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Pause, Play, AlertTriangle, Send, SkipForward, Shield, Eye, Coffee
} from "lucide-react";

function getAuthHeaders(): Record<string, string> {
  try {
    const creds = localStorage.getItem("nursenest-credentials");
    if (creds) {
      const { username, password } = JSON.parse(creds);
      return { "x-username": username, "x-password": password };
    }
  } catch {}
  return {};
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface BlueprintMeta {
  examCode: string;
  examName: string;
  passingThreshold: number;
  domainPassThreshold: number;
  domains: { name: string; weight: number }[];
  timeLimit: number;
  domainAssignments?: Record<string, string>;
  examType?: "cat" | "linear-scaled" | "readiness";
  scaledScoreRange?: { min: number; max: number; passScore: number };
  minQuestions?: number;
  maxQuestions?: number;
  showQuestionCount?: boolean;
}

function computeReport(
  questions: PooledQuestion[],
  answers: Record<string, number>,
  blueprintMeta?: BlueprintMeta | null,
  catState?: CATState | null
) {
  let correct = 0;
  const systemScores: Record<string, { correct: number; total: number }> = {};
  const domainScores: Record<string, { correct: number; total: number }> = {};
  const questionReview: any[] = [];

  if (blueprintMeta?.domains) {
    for (const d of blueprintMeta.domains) {
      domainScores[d.name] = { correct: 0, total: 0 };
    }
  }

  for (const q of questions) {
    if (!systemScores[q.bodySystem]) {
      systemScores[q.bodySystem] = { correct: 0, total: 0 };
    }
    systemScores[q.bodySystem].total++;

    const domainName = blueprintMeta?.domainAssignments?.[q.id];
    if (domainName) {
      if (!domainScores[domainName]) domainScores[domainName] = { correct: 0, total: 0 };
      domainScores[domainName].total++;
    }

    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) {
      correct++;
      systemScores[q.bodySystem].correct++;
      if (domainName && domainScores[domainName]) {
        domainScores[domainName].correct++;
      }
    }

    questionReview.push({
      id: q.id,
      question: q.question,
      options: q.options,
      correct: q.correct,
      selected: userAnswer ?? -1,
      isCorrect,
      rationale: q.rationale,
      bodySystem: q.bodySystem,
      lessonId: q.lessonId,
      domain: domainName || undefined,
    });
  }

  const weakAreas = Object.entries(systemScores)
    .filter(([_, s]) => s.total >= 2 && (s.correct / s.total) < 0.6)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .map(([system, s]) => ({
      system,
      score: Math.round((s.correct / s.total) * 100),
      correct: s.correct,
      total: s.total,
    }));

  const overallPercentage = Math.round((correct / questions.length) * 100);
  const examType = blueprintMeta?.examType || null;

  let isOfficialMode = false;
  let overallPass = true;
  let failedDomains: string[] = [];
  let domainBreakdown: { name: string; correct: number; total: number; percentage: number; passed: boolean; weight: number }[] = [];
  let scaledScore: number | null = null;
  let domainBands: ReturnType<typeof getDomainBands> | null = null;

  if (examType === "cat" && catState) {
    isOfficialMode = true;
    const catResult = getPassFailResult(catState);
    overallPass = catResult.passed;
    domainBands = getDomainBands(domainScores);
    domainBreakdown = blueprintMeta!.domains.map(d => {
      const ds = domainScores[d.name] || { correct: 0, total: 0 };
      const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
      const passed = pct >= 50;
      if (!passed) failedDomains.push(d.name);
      return { name: d.name, correct: ds.correct, total: ds.total, percentage: pct, passed, weight: d.weight };
    });
  } else if (examType === "linear-scaled" && blueprintMeta?.scaledScoreRange) {
    isOfficialMode = true;
    const scaled = computeScaledScore(overallPercentage, blueprintMeta.scaledScoreRange);
    scaledScore = scaled.scaledScore;
    overallPass = scaled.passed;
    domainBreakdown = blueprintMeta.domains.map(d => {
      const ds = domainScores[d.name] || { correct: 0, total: 0 };
      const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
      const passed = pct >= (blueprintMeta.domainPassThreshold || 50);
      if (!passed) failedDomains.push(d.name);
      return { name: d.name, correct: ds.correct, total: ds.total, percentage: pct, passed, weight: d.weight };
    });
  } else if (blueprintMeta && blueprintMeta.domains) {
    if (examType !== "readiness") {
      isOfficialMode = true;
    }
    domainBreakdown = blueprintMeta.domains.map(d => {
      const ds = domainScores[d.name] || { correct: 0, total: 0 };
      const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
      const passed = pct >= blueprintMeta.domainPassThreshold;
      if (!passed) failedDomains.push(d.name);
      return { name: d.name, correct: ds.correct, total: ds.total, percentage: pct, passed, weight: d.weight };
    });
    overallPass = overallPercentage >= blueprintMeta.passingThreshold && failedDomains.length === 0;
  }

  const readiness = catState ? getReadinessScore(catState) : null;
  const catWeakAreas = catState ? getWeakAreas(catState) : [];
  const difficultyDist = catState ? getDifficultyDistribution(catState) : null;

  return {
    score: correct,
    totalQuestions: questions.length,
    percentage: overallPercentage,
    systemBreakdown: Object.entries(systemScores).map(([system, s]) => ({
      system,
      correct: s.correct,
      total: s.total,
      percentage: Math.round((s.correct / s.total) * 100),
    })).sort((a, b) => a.percentage - b.percentage),
    weakAreas,
    questionReview,
    isOfficialMode,
    overallPass,
    failedDomains,
    domainBreakdown,
    blueprintCode: blueprintMeta?.examCode || null,
    blueprintName: blueprintMeta?.examName || null,
    passingThreshold: blueprintMeta?.passingThreshold || null,
    domainPassThreshold: blueprintMeta?.domainPassThreshold || null,
    examType,
    scaledScore,
    domainBands,
    readiness,
    catWeakAreas,
    difficultyDist,
  };
}

export default function MockExamSession() {
  const { id: attemptId } = useParams();
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const [questions, setQuestions] = useState<PooledQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [blueprintMeta, setBlueprintMeta] = useState<BlueprintMeta | null>(null);
  const [catState, setCatState] = useState<CATState | null>(null);
  const [catFinished, setCatFinished] = useState(false);
  const [allPoolQuestions, setAllPoolQuestions] = useState<PooledQuestion[]>([]);
  const lastBreakRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>(undefined);

  const isCATExam = blueprintMeta?.examType === "cat";
  const isLinearScaled = blueprintMeta?.examType === "linear-scaled";
  const isReadiness = blueprintMeta?.examType === "readiness";

  useEffect(() => {
    if (!attemptId) return;
    const isStrict = localStorage.getItem(`strict-mode-${attemptId}`) === "true";
    setStrictMode(isStrict);

    let parsedBp: BlueprintMeta | null = null;
    try {
      const bpData = localStorage.getItem(`blueprint-${attemptId}`);
      if (bpData) {
        parsedBp = JSON.parse(bpData);
        setBlueprintMeta(parsedBp);
      }
    } catch {}

    try {
      const savedCat = localStorage.getItem(`cat-state-${attemptId}`);
      if (savedCat) {
        setCatState(JSON.parse(savedCat));
      }
    } catch {}

    fetch(`/api/mock-exams/${attemptId}`, { headers: getAuthHeaders() })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "completed") {
          navigate(`/mock-exams/${attemptId}/report`);
          return;
        }
        const allQuestions: PooledQuestion[] = data.questions || [];

        if (parsedBp?.examType === "cat") {
          setAllPoolQuestions(allQuestions);

          const savedCatStr = localStorage.getItem(`cat-state-${attemptId}`);
          let existingCat: CATState | null = null;
          try {
            if (savedCatStr) existingCat = JSON.parse(savedCatStr);
          } catch {}

          if (existingCat && existingCat.itemsAdministered > 0) {
            const administeredIds = new Set(existingCat.responses.map(r => r.itemId));
            const administeredQuestions = allQuestions.filter(q => administeredIds.has(q.id));
            setQuestions(administeredQuestions);
            setCurrentQ(administeredQuestions.length - 1);
            setCatState(existingCat);
          } else {
            const freshCat = initCAT();
            const firstItem = selectNextItem(freshCat, allQuestions);
            if (firstItem) {
              setQuestions([firstItem]);
              setCurrentQ(0);
            }
            setCatState(freshCat);
            localStorage.setItem(`cat-state-${attemptId}`, JSON.stringify(freshCat));
          }
        } else {
          setQuestions(allQuestions);
        }

        setAnswers(data.answers || {});
        setFlagged(data.flagged || []);
        setTimeSpent(data.time_spent || 0);
        setLoading(false);
      })
      .catch(() => {
        toast({ title: "Error", description: "Could not load exam", variant: "destructive" });
        setLoading(false);
      });
  }, [attemptId]);

  useEffect(() => {
    if (!strictMode || loading) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
        setShowTabWarning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [strictMode, loading]);

  useEffect(() => {
    if (!strictMode || loading) return;
    const BREAK_INTERVAL = 3600;
    if (timeSpent > 0 && timeSpent - lastBreakRef.current >= BREAK_INTERVAL) {
      lastBreakRef.current = timeSpent;
      setShowBreakPrompt(true);
    }
  }, [strictMode, loading, timeSpent]);

  useEffect(() => {
    if (loading || paused) return;
    timerRef.current = setInterval(() => {
      setTimeSpent((t) => t + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [loading, paused]);

  const latestStateRef = useRef({ answers, flagged, timeSpent });
  latestStateRef.current = { answers, flagged, timeSpent };

  useEffect(() => {
    if (loading || !attemptId) return;
    const interval = setInterval(() => {
      const { answers: a, flagged: f, timeSpent: t } = latestStateRef.current;
      fetch(`/api/mock-exams/${attemptId}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ answers: a, flagged: f, timeSpent: t }),
      }).catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, [loading, attemptId]);

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (strictMode && answers[questionId] !== undefined) {
      toast({ title: "Answer Locked", description: "In strict mode, you cannot change your answer once selected.", variant: "destructive" });
      return;
    }
    if (isCATExam && answers[questionId] !== undefined) {
      return;
    }
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const advanceCAT = useCallback(() => {
    if (!isCATExam || !catState || !attemptId) return;

    const currentQuestion = questions[currentQ];
    if (!currentQuestion) return;

    const userAnswer = answers[currentQuestion.id];
    if (userAnswer === undefined) return;

    const isCorrect = userAnswer === currentQuestion.correct;
    const newState = updateAbility(catState, currentQuestion, isCorrect);

    const blueprintForStop = {
      totalQuestions: blueprintMeta?.maxQuestions || 90,
      minQuestions: blueprintMeta?.minQuestions,
      maxQuestions: blueprintMeta?.maxQuestions,
    };

    if (shouldStop(newState, blueprintForStop as any)) {
      setCatState(newState);
      setCatFinished(true);
      localStorage.setItem(`cat-state-${attemptId}`, JSON.stringify(newState));
      setTimeout(() => {
        submitExamWithState(newState);
      }, 0);
      return;
    }

    const administeredIds = new Set(newState.responses.map(r => r.itemId));
    const remaining = allPoolQuestions.filter(q => !administeredIds.has(q.id));
    const nextItem = selectNextItem(newState, remaining);

    if (nextItem) {
      setQuestions(prev => [...prev, nextItem]);
      setCurrentQ(prev => prev + 1);
    } else {
      setCatFinished(true);
      setTimeout(() => {
        submitExamWithState(newState);
      }, 0);
    }

    setCatState(newState);
    localStorage.setItem(`cat-state-${attemptId}`, JSON.stringify(newState));
  }, [isCATExam, catState, attemptId, questions, currentQ, answers, blueprintMeta, allPoolQuestions]);

  const submitExamWithState = async (finalCatState?: CATState) => {
    if (!attemptId) return;
    setSubmitting(true);
    try {
      const report = computeReport(questions, answers, blueprintMeta, finalCatState || catState);
      await fetch(`/api/mock-exams/${attemptId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ answers, flagged, timeSpent, report }),
      });
      navigate(`/mock-exams/${attemptId}/report`);
    } catch {
      toast({ title: "Error", description: "Failed to submit exam", variant: "destructive" });
      setSubmitting(false);
    }
  };

  const submitExam = async () => {
    if (!attemptId) return;
    setSubmitting(true);
    try {
      const report = computeReport(questions, answers, blueprintMeta, catState);
      await fetch(`/api/mock-exams/${attemptId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ answers, flagged, timeSpent, report }),
      });
      navigate(`/mock-exams/${attemptId}/report`);
    } catch {
      toast({ title: "Error", description: "Failed to submit exam", variant: "destructive" });
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (isCATExam) {
      advanceCAT();
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500">Loading exam...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = (answeredCount / questions.length) * 100;

  const progressLabel = isCATExam
    ? `Item ${(catState?.itemsAdministered || 0) + 1} in Progress`
    : `Q ${currentQ + 1} of ${questions.length}`;

  const showProgressBar = !isCATExam;
  const disablePrevious = isCATExam || strictMode || currentQ === 0;

  return (
    <div className={`min-h-screen bg-gray-50 font-sans text-gray-900 ${user?.tier !== "admin" ? "select-none" : ""}`} onContextMenu={user?.tier !== "admin" ? (e) => e.preventDefault() : undefined}>
      <div className="sticky top-0 z-50 border-b border-black/5" style={{ backgroundColor: "var(--exam-chrome-color)" }} data-testid="exam-top-bar">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-sm font-semibold text-[#2E3A59]" data-testid="text-exam-progress">
              {progressLabel}
            </span>
            {showProgressBar && (
              <Progress value={progressPercent} className="w-24 sm:w-32 h-1.5 hidden sm:block" />
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {strictMode && (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50/80 px-2 py-0.5 rounded" data-testid="badge-strict-mode">
                <Shield className="w-3 h-3" /> STRICT
              </span>
            )}
            {strictMode && tabSwitchCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600" data-testid="badge-tab-switches">
                <Eye className="w-3 h-3" /> {tabSwitchCount}
              </span>
            )}
            <button
              onClick={() => { if (!strictMode) setPaused(!paused); }}
              className={`flex items-center gap-1.5 text-sm ${strictMode ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"}`}
              data-testid="button-pause-timer"
              disabled={strictMode}
              title={strictMode ? "Timer cannot be paused in strict mode" : undefined}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span className={`font-mono text-sm font-semibold ${paused ? "text-amber-600" : "text-[#2E3A59]"}`}>
                {formatTime(timeSpent)}
              </span>
            </button>

            <button
              onClick={() => toggleFlag(questions[currentQ]?.id)}
              className={`p-1.5 rounded transition-colors ${
                questions[currentQ] && flagged.includes(questions[currentQ].id) ? "text-amber-500" : "text-gray-300 hover:text-amber-500"
              }`}
              data-testid="button-flag-topbar"
              aria-label="Flag question"
            >
              <Flag className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowNav(!showNav)}
              className="text-sm text-[#2E3A59] font-medium hover:text-[#BFA6F6] transition-colors"
              data-testid="button-question-nav"
            >
              Navigator
            </button>

            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200"
              onClick={() => setShowConfirmSubmit(true)}
              data-testid="button-submit-exam"
            >
              <Send className="w-3 h-3" /> End
            </Button>
          </div>
        </div>
      </div>

      {paused && (
        <div className="fixed inset-0 z-40 bg-gray-900/80 flex items-center justify-center">
          <Card className="border-none shadow-2xl max-w-sm">
            <CardContent className="p-8 text-center space-y-4">
              <Pause className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-bold">Exam Paused</h2>
              <p className="text-gray-500 text-sm">The timer has stopped. Click resume to continue.</p>
              <Button onClick={() => setPaused(false)} className="rounded-full px-8" data-testid="button-resume">
                <Play className="w-4 h-4 mr-2" /> Resume Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showNav && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center" onClick={() => setShowNav(false)}>
          <Card className="border-none shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="font-bold text-lg">Question Navigator</h3>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /> Answered</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /> Flagged</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-200" /> Unanswered</span>
                </div>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {questions.map((q, i) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isFlagged = flagged.includes(q.id);
                  const isCurrent = i === currentQ;
                  const disableNav = isCATExam || (strictMode && i < currentQ);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        if (disableNav) return;
                        setCurrentQ(i);
                        setShowNav(false);
                      }}
                      disabled={disableNav}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                        isCurrent ? "ring-2 ring-primary ring-offset-1" : ""
                      } ${
                        disableNav ? "opacity-40 cursor-not-allowed" : ""
                      } ${
                        isFlagged ? "bg-amber-500 text-white" :
                        isAnswered ? "bg-emerald-500 text-white" :
                        "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      data-testid={`button-nav-q-${i}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="text-sm text-gray-500 pt-2">
                {answeredCount} answered, {flagged.length} flagged, {unansweredCount} remaining
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showConfirmSubmit && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <Card className="border-none shadow-2xl max-w-sm">
            <CardContent className="p-8 space-y-4">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-xl font-bold text-center">Submit Exam?</h2>
              {unansweredCount > 0 && (
                <p className="text-amber-600 text-sm text-center font-medium">
                  You have {unansweredCount} unanswered question{unansweredCount !== 1 ? "s" : ""}.
                </p>
              )}
              {flagged.length > 0 && (
                <p className="text-sm text-gray-500 text-center">
                  {flagged.length} question{flagged.length !== 1 ? "s" : ""} flagged for review.
                </p>
              )}
              <p className="text-sm text-gray-400 text-center">Once submitted, you cannot change your answers.</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirmSubmit(false)} data-testid="button-cancel-submit">
                  Go Back
                </Button>
                <Button className="flex-1" onClick={submitExam} disabled={submitting} data-testid="button-confirm-submit">
                  {submitting ? "Submitting..." : "Submit Exam"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showTabWarning && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <Card className="border-none shadow-2xl max-w-sm">
            <CardContent className="p-8 space-y-4 text-center">
              <Eye className="w-12 h-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold">Tab Switch Detected</h2>
              <p className="text-sm text-gray-500">
                You navigated away from the exam. This has been recorded.
              </p>
              <p className="text-xs text-red-600 font-medium">
                Total tab switches: {tabSwitchCount}
              </p>
              <Button onClick={() => setShowTabWarning(false)} className="rounded-full px-8" data-testid="button-dismiss-tab-warning">
                Return to Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showBreakPrompt && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <Card className="border-none shadow-2xl max-w-sm">
            <CardContent className="p-8 space-y-4 text-center">
              <Coffee className="w-12 h-12 text-blue-500 mx-auto" />
              <h2 className="text-xl font-bold">Scheduled Break</h2>
              <p className="text-sm text-gray-500">
                You've been testing for {Math.floor(timeSpent / 3600)} hour{Math.floor(timeSpent / 3600) !== 1 ? "s" : ""}. Consider taking a short break.
              </p>
              <p className="text-xs text-gray-400">
                Note: The timer will continue running during the break.
              </p>
              <Button onClick={() => setShowBreakPrompt(false)} className="rounded-full px-8" data-testid="button-dismiss-break">
                Continue Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {question && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{question.bodySystem}</span>
                  {flagged.includes(question.id) && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-medium">Flagged</span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2E3A59] leading-relaxed" data-testid="text-question">
                  {question.question}
                </h2>
              </div>
              <button
                onClick={() => toggleFlag(question.id)}
                className={`p-2 rounded transition-colors ${
                  flagged.includes(question.id) ? "bg-amber-50 text-amber-600" : "text-gray-300 hover:text-amber-500"
                }`}
                data-testid="button-flag-question"
                aria-label={flagged.includes(question.id) ? "Unflag question" : "Flag question for review"}
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1" role="radiogroup" aria-label="Answer options">
              {question.options.map((option, i) => {
                const isSelected = answers[question.id] === i;
                const isLocked = (strictMode || isCATExam) && answers[question.id] !== undefined;
                const letterLabel = String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(question.id, i)}
                    disabled={isLocked && !isSelected}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Option ${letterLabel}: ${option}`}
                    className={`w-full text-left px-4 py-3.5 transition-colors flex items-start gap-3 rounded focus:outline-none focus:ring-2 focus:ring-[#BFA6F6]/40 focus:ring-offset-1 ${
                      isSelected
                        ? "bg-[#BFA6F6]/8 border-l-3 border-l-[#BFA6F6]"
                        : isLocked
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-gray-50"
                    }`}
                    data-testid={`button-option-${i}`}
                  >
                    <span className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[#BFA6F6] bg-[#BFA6F6]"
                        : "border-gray-300"
                    }`}>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    <span className={`text-sm sm:text-base leading-relaxed ${
                      isSelected ? "text-[#2E3A59] font-medium" : "text-gray-700"
                    }`}>
                      <span className="font-semibold mr-1.5">{letterLabel}.</span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {question && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5" style={{ backgroundColor: "var(--exam-chrome-color)" }} data-testid="exam-bottom-bar">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => { if (!disablePrevious) setCurrentQ(Math.max(0, currentQ - 1)); }}
              disabled={disablePrevious}
              className="gap-1 text-gray-600 hover:text-gray-900"
              data-testid="button-prev-question"
              title={isCATExam ? "Cannot go back in CAT mode" : strictMode ? "Cannot go back in strict mode" : undefined}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <span className="text-xs text-gray-400 font-medium hidden sm:block">
              {answeredCount} of {questions.length} answered
            </span>

            {isCATExam ? (
              <Button
                onClick={handleNextQuestion}
                className="gap-1"
                disabled={answers[question.id] === undefined || catFinished}
                data-testid="button-next-question"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : currentQ < questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="gap-1"
                data-testid="button-next-question"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirmSubmit(true)}
                className="gap-1"
                data-testid="button-finish"
              >
                Finish <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
