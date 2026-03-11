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
import {
  AnswerOption,
  ResultHeader,
  RationaleSection,
  PremiumBadge,
  StudyProgressBar,
  ScoreCircle,
} from "@/components/premium-study";

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
      <div className="min-h-screen bg-warmwhite">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-7 w-7 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Login Required</h2>
          <p className="text-gray-500 mb-4">Please log in to access study mode.</p>
          <Button onClick={() => setLocation("/login")} className="rounded-xl" data-testid="button-go-login">Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite">
      <Navigation />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {!started ? (
          <Card className="premium-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5" data-testid="text-study-setup-title">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                </div>
                Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-gray-500 text-sm leading-relaxed">
                Practice questions one at a time with immediate feedback and rationale. Your region determines your exam bank
                ({user.region === "CA" ? "REx-PN" : "NCLEX-PN"}).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Questions</label>
                  <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm" data-testid="select-study-count">
                    <option value={5}>5 questions</option>
                    <option value={10}>10 questions</option>
                    <option value={20}>20 questions</option>
                    <option value={30}>30 questions</option>
                    <option value={50}>50 questions</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Category</label>
                  <Input value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="e.g. Pharmacology" className="rounded-xl border-gray-200" data-testid="input-study-category" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Difficulty</label>
                  <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm" data-testid="select-study-difficulty">
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                  </select>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 rounded-xl p-3" data-testid="text-study-error"><AlertTriangle className="h-4 w-4 shrink-0" />{error}</div>}
              <Button onClick={fetchQuestions} disabled={loading} className="w-full rounded-xl py-5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm shadow-primary/20" data-testid="button-start-study">
                {loading ? "Loading..." : "Start Studying"}
              </Button>
            </CardContent>
          </Card>
        ) : !currentQ ? (
          <Card className="premium-card border-0 shadow-md animate-fade-in-up">
            <CardContent className="p-10 text-center">
              <ScoreCircle percentage={scorePercent} className="mx-auto mb-5" />
              <h2 className="text-xl font-bold mb-2 text-gray-900" data-testid="text-study-complete">Study Session Complete!</h2>
              <p className="text-gray-500 mb-6">Score: {stats.correct}/{stats.attempted} ({scorePercent}%)</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => { saveResults(); fetchQuestions(); }} className="rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-sm" data-testid="button-study-again">
                  <RotateCcw className="h-4 w-4" />Study Again
                </Button>
                <Button variant="outline" onClick={() => { saveResults(); setStarted(false); }} className="rounded-xl" data-testid="button-study-setup">
                  Change Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <PremiumBadge variant="default" data-testid="text-study-progress">
                {currentIdx + 1} / {questions.length}
              </PremiumBadge>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-medium" data-testid="text-study-score">{stats.correct}/{stats.attempted} correct</span>
                {stats.attempted > 0 && <PremiumBadge variant={scorePercent >= 70 ? "system" : "difficulty"}>{scorePercent}%</PremiumBadge>}
              </div>
            </div>

            <StudyProgressBar value={((currentIdx + 1) / questions.length) * 100} variant="primary" className="mb-4" />

            <Card className="premium-card border-0 shadow-lg mb-4 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <PremiumBadge variant="system">{currentQ.category}</PremiumBadge>
                  <PremiumBadge variant="difficulty">{currentQ.difficulty}</PremiumBadge>
                  <PremiumBadge>{currentQ.topic}</PremiumBadge>
                </div>
                <p className="text-lg font-medium mb-6 text-gray-900 leading-relaxed" data-testid="text-study-question">{currentQ.question}</p>
                <div className="space-y-3">
                  {[
                    { key: "A", text: currentQ.optionA },
                    { key: "B", text: currentQ.optionB },
                    { key: "C", text: currentQ.optionC },
                    { key: "D", text: currentQ.optionD },
                  ].map((opt, idx) => (
                    <AnswerOption
                      key={opt.key}
                      index={idx}
                      text={opt.text}
                      isSelected={selected === opt.key}
                      isCorrect={revealed && opt.key === currentQ.correctAnswer}
                      isWrong={revealed && opt.key === selected && opt.key !== currentQ.correctAnswer}
                      isRevealed={revealed}
                      disabled={revealed}
                      onClick={() => handleSelect(opt.key)}
                      iconEl={
                        revealed && opt.key === currentQ.correctAnswer
                          ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                          : revealed && opt.key === selected && opt.key !== currentQ.correctAnswer
                            ? <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                            : undefined
                      }
                      data-testid={`button-study-option-${opt.key}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {revealed && (
              <Card className="premium-card border-0 shadow-md mb-4 animate-fade-in-up" data-testid="card-rationale">
                <CardContent className="p-6">
                  <RationaleSection
                    icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
                    title="Rationale"
                  >
                    <p>{currentQ.rationale}</p>
                    {currentQ.clientNeeds && (
                      <p className="text-xs text-gray-400 mt-3">Client Needs: {currentQ.clientNeeds}</p>
                    )}
                  </RationaleSection>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between">
              {!revealed ? (
                <Button onClick={handleReveal} disabled={!selected} className="w-full rounded-xl py-5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm shadow-primary/20" data-testid="button-reveal">
                  <Eye className="h-4 w-4 mr-2" />Check Answer
                </Button>
              ) : currentIdx < questions.length - 1 ? (
                <Button onClick={handleNext} className="w-full rounded-xl py-5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm" data-testid="button-study-next">
                  Next Question<ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => { saveResults(); setCurrentIdx(questions.length); }} className="w-full rounded-xl py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm" data-testid="button-finish-study">
                  <CheckCircle2 className="h-4 w-4 mr-2" />Finish Session
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
