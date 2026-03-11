import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  Eye,
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
  clientNeeds: string;
};

export default function QBankStudyPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [stats, setStats] = useState({ attempted: 0, correct: 0 });
  const [started, setStarted] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ count: String(questionCount) });
      if (filterCategory) params.set("category", filterCategory);
      if (filterDifficulty) params.set("difficulty", filterDifficulty);
      const resp = await fetch(`/api/question-bank/study?${params}`, {
        headers: getAuthHeaders(),
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Failed to load questions");
      }
      const data = await resp.json();
      if (data.length === 0) throw new Error("No questions available. Please contact admin.");
      setQuestions(data);
      setCurrentIdx(0);
      setSelected(null);
      setRevealed(false);
      setStats({ attempted: 0, correct: 0 });
      setStarted(true);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
    const isCorrect = selected === questions[currentIdx].correctAnswer;
    setStats((prev) => ({
      attempted: prev.attempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const saveResults = async () => {
    if (stats.attempted === 0) return;
    try {
      await fetch("/api/question-bank/results", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          mode: "study",
          examType: questions[0]?.examType || "",
          country: questions[0]?.country || "",
          totalQuestions: stats.attempted,
          correctCount: stats.correct,
          timeSpent: null,
          answers: [],
          categoryBreakdown: {},
          difficultyBreakdown: {},
        }),
      });
    } catch {}
  };

  const currentQ = questions[currentIdx];
  const scorePercent = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Login Required</h2>
          <p className="text-gray-500 mb-4">Please log in to access study mode.</p>
          <Button onClick={() => setLocation("/login")} data-testid="button-go-login">Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {!started ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-study-setup-title">
                <BookOpen className="h-5 w-5 text-green-600" />
                Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Practice questions one at a time with immediate feedback and rationale. Your region determines your exam bank
                ({user.region === "CA" ? "REx-PN" : "NCLEX-PN"}).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Questions</label>
                  <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800" data-testid="select-study-count">
                    <option value={5}>5 questions</option>
                    <option value={10}>10 questions</option>
                    <option value={20}>20 questions</option>
                    <option value={30}>30 questions</option>
                    <option value={50}>50 questions</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="e.g. Pharmacology" data-testid="input-study-category" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Difficulty</label>
                  <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800" data-testid="select-study-difficulty">
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                  </select>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm flex items-center gap-1" data-testid="text-study-error"><AlertTriangle className="h-4 w-4" />{error}</div>}
              <Button onClick={fetchQuestions} disabled={loading} className="w-full" data-testid="button-start-study">
                {loading ? "Loading..." : "Start Studying"}
              </Button>
            </CardContent>
          </Card>
        ) : !currentQ ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2" data-testid="text-study-complete">Study Session Complete!</h2>
              <p className="text-gray-500 mb-4">Score: {stats.correct}/{stats.attempted} ({scorePercent}%)</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => { saveResults(); fetchQuestions(); }} data-testid="button-study-again">
                  <RotateCcw className="h-4 w-4 mr-1" />Study Again
                </Button>
                <Button variant="outline" onClick={() => { saveResults(); setStarted(false); }} data-testid="button-study-setup">
                  Change Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" data-testid="text-study-progress">
                {currentIdx + 1} / {questions.length}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span data-testid="text-study-score">{stats.correct}/{stats.attempted} correct</span>
                {stats.attempted > 0 && <span>({scorePercent}%)</span>}
              </div>
            </div>

            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{currentQ.category}</Badge>
                  <Badge variant="outline" className="text-xs">{currentQ.difficulty}</Badge>
                  <Badge variant="outline" className="text-xs">{currentQ.topic}</Badge>
                </div>
                <p className="text-lg font-medium mb-6 text-gray-900 dark:text-white" data-testid="text-study-question">{currentQ.question}</p>
                <div className="space-y-3">
                  {[
                    { key: "A", text: currentQ.optionA },
                    { key: "B", text: currentQ.optionB },
                    { key: "C", text: currentQ.optionC },
                    { key: "D", text: currentQ.optionD },
                  ].map((opt) => {
                    let cls = "border-gray-200 dark:border-gray-700 hover:border-gray-300";
                    if (revealed) {
                      if (opt.key === currentQ.correctAnswer) cls = "border-green-500 bg-green-50 dark:bg-green-900/20";
                      else if (opt.key === selected) cls = "border-red-500 bg-red-50 dark:bg-red-900/20";
                    } else if (selected === opt.key) {
                      cls = "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
                    }
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelect(opt.key)}
                        disabled={revealed}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${cls}`}
                        data-testid={`button-study-option-${opt.key}`}
                      >
                        <span className="font-semibold mr-2">{opt.key}.</span>
                        {opt.text}
                        {revealed && opt.key === currentQ.correctAnswer && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />}
                        {revealed && opt.key === selected && opt.key !== currentQ.correctAnswer && <XCircle className="inline ml-2 h-4 w-4 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {revealed && (
              <Card className="mb-4 border-blue-200 dark:border-blue-800" data-testid="card-rationale">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">Rationale</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{currentQ.rationale}</p>
                      {currentQ.clientNeeds && (
                        <p className="text-xs text-gray-400 mt-2">Client Needs: {currentQ.clientNeeds}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between">
              {!revealed ? (
                <Button onClick={handleReveal} disabled={!selected} className="w-full" data-testid="button-reveal">
                  <Eye className="h-4 w-4 mr-1" />Check Answer
                </Button>
              ) : currentIdx < questions.length - 1 ? (
                <Button onClick={handleNext} className="w-full" data-testid="button-study-next">
                  Next Question<ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={() => { saveResults(); setCurrentIdx(questions.length); }} className="w-full bg-green-600 hover:bg-green-700" data-testid="button-finish-study">
                  <CheckCircle2 className="h-4 w-4 mr-1" />Finish Session
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
