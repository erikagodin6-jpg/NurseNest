import { useState, useEffect, useRef, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Flag,
  BarChart3,
  AlertTriangle,
  Play,
  RotateCcw,
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

type Question = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  rationale: string;
  category: string;
  difficulty: string;
  examType: string;
  country: string;
  topic: string;
};

type UserAnswer = {
  questionId: string;
  selected: string | null;
  correct: boolean;
  flagged: boolean;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function QBankExamPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [phase, setPhase] = useState<"setup" | "exam" | "results">("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<Map<string, { key: string; text: string }[]>>(new Map());
  const [answers, setAnswers] = useState<Map<string, UserAnswer>>(new Map());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionCount, setQuestionCount] = useState(25);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ count: String(questionCount) });
      if (filterCategory) params.set("category", filterCategory);
      if (filterDifficulty) params.set("difficulty", filterDifficulty);
      const resp = await fetch(`/api/question-bank/exam?${params}`, {
        headers: getAuthHeaders(),
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Failed to load questions");
      }
      const data = await resp.json();
      if (data.length === 0) throw new Error("No questions available for your region. Please contact admin.");
      const shuffled = shuffleArray(data);
      setQuestions(shuffled);
      const optionsMap = new Map<string, { key: string; text: string }[]>();
      for (const q of shuffled) {
        const opts = shuffleArray([
          { key: "A", text: q.optionA },
          { key: "B", text: q.optionB },
          { key: "C", text: q.optionC },
          { key: "D", text: q.optionD },
        ]);
        optionsMap.set(q.id, opts);
      }
      setShuffledOptions(optionsMap);
      const ansMap = new Map<string, UserAnswer>();
      shuffled.forEach((q) => ansMap.set(q.id, { questionId: q.id, selected: null, correct: false, flagged: false }));
      setAnswers(ansMap);
      setCurrentIdx(0);
      setTimer(0);
      setPhase("exam");
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const selectAnswer = (questionId: string, key: string) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      const existing = next.get(questionId)!;
      next.set(questionId, { ...existing, selected: key, correct: key === questions.find((q) => q.id === questionId)?.correctAnswer });
      return next;
    });
  };

  const toggleFlag = (questionId: string) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      const existing = next.get(questionId)!;
      next.set(questionId, { ...existing, flagged: !existing.flagged });
      return next;
    });
  };

  const submitExam = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const answersArr = Array.from(answers.values());
    const correctCount = answersArr.filter((a) => a.correct).length;
    const categoryBreakdown: Record<string, { total: number; correct: number }> = {};
    const difficultyBreakdown: Record<string, { total: number; correct: number }> = {};
    for (const q of questions) {
      const ans = answers.get(q.id);
      if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { total: 0, correct: 0 };
      categoryBreakdown[q.category].total++;
      if (ans?.correct) categoryBreakdown[q.category].correct++;
      if (!difficultyBreakdown[q.difficulty]) difficultyBreakdown[q.difficulty] = { total: 0, correct: 0 };
      difficultyBreakdown[q.difficulty].total++;
      if (ans?.correct) difficultyBreakdown[q.difficulty].correct++;
    }
    try {
      await fetch("/api/question-bank/results", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          mode: "exam",
          examType: questions[0]?.examType || "",
          country: questions[0]?.country || "",
          totalQuestions: questions.length,
          correctCount,
          timeSpent: timer,
          answers: answersArr.map((a) => ({ questionId: a.questionId, selected: a.selected, correct: a.correct })),
          categoryBreakdown,
          difficultyBreakdown,
        }),
      });
    } catch {}
    setPhase("results");
  }, [answers, questions, timer, user]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Login Required</h2>
          <p className="text-gray-500 mb-4">Please log in to access exam mode.</p>
          <Button onClick={() => setLocation("/login")} data-testid="button-go-login">Go to Login</Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const currentAnswer = currentQ ? answers.get(currentQ.id) : undefined;
  const answeredCount = Array.from(answers.values()).filter((a) => a.selected !== null).length;
  const correctCount = Array.from(answers.values()).filter((a) => a.correct).length;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {phase === "setup" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-exam-setup-title">
                <Play className="h-5 w-5 text-blue-600" />
                Exam Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Simulate a timed exam with randomized questions and shuffled answer choices. Your region determines which exam bank you see
                ({user.region === "CA" ? "REx-PN" : "NCLEX-PN"}).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Number of Questions</label>
                  <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800" data-testid="select-question-count">
                    <option value={10}>10 questions</option>
                    <option value={25}>25 questions</option>
                    <option value={50}>50 questions</option>
                    <option value={75}>75 questions</option>
                    <option value={100}>100 questions</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category (optional)</label>
                  <Input value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="e.g. Pharmacology" data-testid="input-exam-category" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Difficulty (optional)</label>
                  <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800" data-testid="select-exam-difficulty">
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                  </select>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm flex items-center gap-1" data-testid="text-exam-error"><AlertTriangle className="h-4 w-4" />{error}</div>}
              <Button onClick={startExam} disabled={loading} className="w-full" data-testid="button-start-exam">
                {loading ? "Loading..." : "Start Exam"}
              </Button>
            </CardContent>
          </Card>
        )}

        {phase === "exam" && currentQ && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm" data-testid="text-question-progress">
                  {currentIdx + 1} / {questions.length}
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-1" data-testid="text-timer">
                  <Clock className="h-3 w-3" />{formatTime(timer)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{answeredCount} answered</Badge>
                <Button size="sm" variant={currentAnswer?.flagged ? "destructive" : "outline"} onClick={() => toggleFlag(currentQ.id)} data-testid="button-flag">
                  <Flag className="h-3 w-3 mr-1" />{currentAnswer?.flagged ? "Flagged" : "Flag"}
                </Button>
              </div>
            </div>

            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">{currentQ.category}</Badge>
                  <Badge variant="outline" className="text-xs">{currentQ.difficulty}</Badge>
                </div>
                <p className="text-lg font-medium mb-6 text-gray-900 dark:text-white" data-testid="text-current-question">{currentQ.question}</p>
                <div className="space-y-3">
                  {(shuffledOptions.get(currentQ.id) || []).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => selectAnswer(currentQ.id, opt.key)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        currentAnswer?.selected === opt.key
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      data-testid={`button-option-${opt.key}`}
                    >
                      <span className="font-semibold mr-2">{opt.key}.</span>
                      {opt.text}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))} disabled={currentIdx === 0} data-testid="button-prev">
                <ArrowLeft className="h-4 w-4 mr-1" />Previous
              </Button>
              {currentIdx === questions.length - 1 ? (
                <Button onClick={submitExam} className="bg-green-600 hover:bg-green-700" data-testid="button-submit-exam">
                  <CheckCircle2 className="h-4 w-4 mr-1" />Submit Exam
                </Button>
              ) : (
                <Button onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))} data-testid="button-next">
                  Next<ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-1">
              {questions.map((q, i) => {
                const a = answers.get(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-8 h-8 text-xs rounded font-medium border ${
                      i === currentIdx ? "ring-2 ring-blue-500" : ""
                    } ${a?.selected ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300" : "bg-white dark:bg-gray-800 border-gray-200"} ${
                      a?.flagged ? "border-red-400" : ""
                    }`}
                    data-testid={`button-nav-${i}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {phase === "results" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-results-title">
                  <BarChart3 className="h-5 w-5 text-blue-600" />Exam Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${scorePercent >= 70 ? "text-green-600" : "text-red-600"}`} data-testid="text-score">{scorePercent}%</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600" data-testid="text-correct-count">{correctCount}/{questions.length}</div>
                    <div className="text-xs text-gray-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600" data-testid="text-time-spent">{formatTime(timer)}</div>
                    <div className="text-xs text-gray-500">Time</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${scorePercent >= 70 ? "text-green-600" : "text-red-600"}`} data-testid="text-pass-fail">
                      {scorePercent >= 70 ? "PASS" : "FAIL"}
                    </div>
                    <div className="text-xs text-gray-500">Status</div>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => { setPhase("setup"); setQuestions([]); setAnswers(new Map()); }} data-testid="button-new-exam">
                    <RotateCcw className="h-4 w-4 mr-1" />New Exam
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {questions.map((q, i) => {
                const a = answers.get(q.id);
                return (
                  <Card key={q.id} className={a?.correct ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"} data-testid={`card-result-${i}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 mb-2">
                        {a?.correct ? <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />}
                        <p className="font-medium text-sm">{q.question}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs ml-7 mb-2">
                        {[
                          { key: "A", text: q.optionA },
                          { key: "B", text: q.optionB },
                          { key: "C", text: q.optionC },
                          { key: "D", text: q.optionD },
                        ].map((opt) => (
                          <span
                            key={opt.key}
                            className={`${opt.key === q.correctAnswer ? "text-green-600 font-bold" : ""} ${opt.key === a?.selected && !a?.correct ? "text-red-500 line-through" : ""}`}
                          >
                            {opt.key}: {opt.text}
                          </span>
                        ))}
                      </div>
                      <div className="ml-7 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <strong>Rationale:</strong> {q.rationale}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
