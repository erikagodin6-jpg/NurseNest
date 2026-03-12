import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnswerOption, RationaleSection, RationaleImageBlock } from "@/components/premium-study";
import { cn } from "@/lib/utils";
import {
  BookOpen, Brain, Zap, Target, BarChart3, Clock,
  ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  Lightbulb, Trophy, Flag, Bookmark, BookmarkCheck,
  Sparkles, Layers, RefreshCw, TrendingUp, AlertTriangle,
  GraduationCap, Timer, ArrowLeft, Play, Flame,
  ThumbsUp, ThumbsDown, HelpCircle, Shield, Star,
  Filter, X
} from "lucide-react";

type StudyMode = "learn" | "test" | "rapid" | "weak" | "cram" | "spaced";
type Confidence = "confident" | "unsure" | "guess";

interface AdaptiveCard {
  id: string;
  front: string;
  back: string;
  category: string;
  tier: string;
  difficulty: number;
  questionType: string;
  options: any[];
  correctAnswer: any;
  rationaleCorrect: string;
  distractorRationales: any;
  clinicalTakeaway: string;
  examPearl: string;
  rationaleMedia: any[];
  lessonLinks: any[];
  bodySystem: string;
  topic: string;
  subtopic: string;
  regionScope: string;
  blueprintCategory: string;
}

interface MasteryProfile {
  topic: string;
  subtopic: string | null;
  blueprintCategory: string | null;
  totalAttempts: number;
  correctCount: number;
  avgConfidence: number;
  masteryLevel: number;
  lastReviewedAt: string | null;
  nextDueAt: string | null;
}

interface DashboardData {
  totalCardsStudied: number;
  totalCorrect: number;
  overallAccuracy: number;
  masteryByTopic: MasteryProfile[];
  weakAreas: MasteryProfile[];
  cardsDueForReview: number;
  recentAccuracy: number;
  confidenceTrend: { date: string; avgConfidence: number }[];
  studyTimeTotal: number;
  flaggedCount: number;
  masteredCount: number;
  streakDays: number;
}

const STUDY_MODES: { id: StudyMode; label: string; desc: string; icon: any; color: string }[] = [
  { id: "learn", label: "Learn", desc: "Instant rationale after each answer", icon: BookOpen, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "test", label: "Test", desc: "Submit then reveal — exam simulation", icon: Target, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "rapid", label: "Rapid Review", desc: "Compact cards, quick answer/reveal", icon: Zap, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "weak", label: "Weak Areas", desc: "Auto-pulled from your lowest topics", icon: AlertTriangle, color: "bg-red-50 text-red-700 border-red-200" },
  { id: "cram", label: "Before-Exam Cram", desc: "Blueprint-weighted high-yield cards", icon: Flame, color: "bg-orange-50 text-orange-700 border-orange-200" },
  { id: "spaced", label: "Spaced Repetition", desc: "Mastery-based resurfacing schedule", icon: RefreshCw, color: "bg-violet-50 text-violet-700 border-violet-200" },
];

const PRESETS = [
  { label: "High-Yield NCLEX Review", filters: { difficulty: 4 }, mode: "cram" as StudyMode },
  { label: "RPN Safety & Prioritization", filters: { topic: "Delegation" }, mode: "learn" as StudyMode },
  { label: "NP Differential Diagnosis Drill", filters: { questionType: "mcq" }, mode: "test" as StudyMode },
  { label: "Pharmacology Rapid Review", filters: { topic: "Pharmacology" }, mode: "rapid" as StudyMode },
];

function ConfidenceSelector({ onSelect, selected }: { onSelect: (c: Confidence) => void; selected?: Confidence }) {
  const options: { value: Confidence; label: string; icon: any; color: string }[] = [
    { value: "confident", label: "Confident", icon: ThumbsUp, color: "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100" },
    { value: "unsure", label: "Unsure", icon: HelpCircle, color: "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100" },
    { value: "guess", label: "Guess", icon: ThumbsDown, color: "bg-red-50 text-red-700 border-red-300 hover:bg-red-100" },
  ];
  return (
    <div className="flex items-center gap-2" data-testid="confidence-selector">
      <span className="text-xs font-medium text-gray-500 mr-1">How confident?</span>
      {options.map(opt => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
              selected === opt.value ? opt.color + " ring-2 ring-offset-1" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            )}
            data-testid={`button-confidence-${opt.value}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function MasteryBar({ level, size = "md" }: { level: number; size?: "sm" | "md" }) {
  const pct = Math.round(level * 100);
  const color = pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className={cn("w-full bg-gray-100 rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2")}>
      <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function AdaptiveStudyHub({
  userId,
  userTier,
  onBack,
}: {
  userId: string;
  userTier: string;
  onBack: () => void;
}) {
  const [view, setView] = useState<"modes" | "study" | "report" | "dashboard" | "filters">("modes");
  const [selectedMode, setSelectedMode] = useState<StudyMode>("learn");
  const [cards, setCards] = useState<AdaptiveCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [confidence, setConfidence] = useState<Confidence | undefined>(undefined);
  const [sessionResults, setSessionResults] = useState<{ cardId: string; correct: boolean; confidence: Confidence; timeSpent: number }[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState(0);
  const [cardStartTime, setCardStartTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState<{
    topic?: string;
    bodySystem?: string;
    difficulty?: number;
    blueprintCategory?: string;
    questionType?: string;
    missedOnly?: boolean;
  }>({});

  const currentCard = cards[cardIndex];

  const fetchDashboard = useCallback(async () => {
    setDashboardLoading(true);
    try {
      const res = await fetch(`/api/adaptive/dashboard/${userId}`);
      if (res.ok) setDashboard(await res.json());
    } catch {} finally { setDashboardLoading(false); }
  }, [userId]);

  const startStudySession = useCallback(async (mode: StudyMode, customFilters?: typeof filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tier: userTier, mode, limit: "20" });
      const f = customFilters || filters;
      if (f.topic) params.set("topic", f.topic);
      if (f.bodySystem) params.set("bodySystem", f.bodySystem);
      if (f.difficulty) params.set("difficulty", String(f.difficulty));
      if (f.blueprintCategory) params.set("blueprintCategory", f.blueprintCategory);
      if (f.questionType) params.set("questionType", f.questionType);
      if (f.missedOnly) params.set("missedOnly", "true");

      const res = await fetch(`/api/adaptive/next-cards/${userId}?${params}`);
      if (res.ok) {
        const data = await res.json();
        if (data.cards && data.cards.length > 0) {
          setCards(data.cards);
          setCardIndex(0);
          setSelectedOption(null);
          setShowRationale(false);
          setConfidence(undefined);
          setSessionResults([]);
          setSessionStartTime(Date.now());
          setCardStartTime(Date.now());
          setSelectedMode(mode);
          setView("study");
        } else {
          alert("No cards available for these filters. Try different settings.");
        }
      }
    } catch {} finally { setLoading(false); }
  }, [userId, userTier, filters]);

  const recordResponse = useCallback(async (cardId: string, isCorrect: boolean, conf: Confidence, timeSpent: number) => {
    try {
      await fetch("/api/adaptive/record-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cardId, isCorrect, confidence: conf, selectedOption, timeSpent, studyMode: selectedMode }),
      });
    } catch {}
  }, [userId, selectedOption, selectedMode]);

  const handleOptionClick = (idx: number) => {
    if (showRationale) return;
    setSelectedOption(idx);

    if (selectedMode === "learn" || selectedMode === "rapid") {
      setShowRationale(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowRationale(true);
  };

  const handleNext = async () => {
    if (!currentCard || !confidence) return;

    const isCorrect = selectedOption !== null && isCorrectAnswer(currentCard, selectedOption);
    const timeSpent = Math.round((Date.now() - cardStartTime) / 1000);

    setSessionResults(prev => [...prev, { cardId: currentCard.id, correct: isCorrect, confidence, timeSpent }]);
    await recordResponse(currentCard.id, isCorrect, confidence, timeSpent);

    if (cardIndex + 1 >= cards.length) {
      setView("report");
    } else {
      setCardIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowRationale(false);
      setConfidence(undefined);
      setCardStartTime(Date.now());
    }
  };

  const handleRapidNext = async (isCorrect: boolean) => {
    if (!currentCard) return;
    const conf = confidence || "unsure";
    const timeSpent = Math.round((Date.now() - cardStartTime) / 1000);

    setSessionResults(prev => [...prev, { cardId: currentCard.id, correct: isCorrect, confidence: conf, timeSpent }]);
    await recordResponse(currentCard.id, isCorrect, conf, timeSpent);

    if (cardIndex + 1 >= cards.length) {
      setView("report");
    } else {
      setCardIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowRationale(false);
      setConfidence(undefined);
      setCardStartTime(Date.now());
    }
  };

  const getCorrectIndex = (card: AdaptiveCard): number => {
    if (!card.correctAnswer && card.correctAnswer !== 0) return 0;
    return Array.isArray(card.correctAnswer) ? card.correctAnswer[0] : card.correctAnswer;
  };

  const isCorrectAnswer = (card: AdaptiveCard, selectedIdx: number): boolean => {
    if (!card.correctAnswer && card.correctAnswer !== 0) return selectedIdx === 0;
    if (Array.isArray(card.correctAnswer)) {
      return card.correctAnswer.includes(selectedIdx);
    }
    return selectedIdx === card.correctAnswer;
  };

  const getOptionText = (opt: any): string => {
    if (typeof opt === "string") return opt;
    return opt?.text || opt?.label || String(opt);
  };

  const getDistractorRationale = (card: AdaptiveCard, optIdx: number): string => {
    if (!card.distractorRationales) return "This option is not the best choice for this clinical scenario.";
    const dr = card.distractorRationales;
    if (Array.isArray(dr)) return dr[optIdx] || "Not the best choice.";
    const optText = getOptionText(card.options?.[optIdx]);
    return dr[optText] || dr[String(optIdx)] || "Not the best choice for this scenario.";
  };

  if (view === "dashboard") {
    return (
      <DashboardView
        userId={userId}
        dashboard={dashboard}
        loading={dashboardLoading}
        onRefresh={fetchDashboard}
        onBack={() => setView("modes")}
        onStartMode={(mode) => startStudySession(mode)}
      />
    );
  }

  if (view === "report") {
    const correctCount = sessionResults.filter(r => r.correct).length;
    const totalCount = sessionResults.length;
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const avgConfidence = sessionResults.length > 0
      ? sessionResults.reduce((sum, r) => sum + (r.confidence === "confident" ? 1 : r.confidence === "unsure" ? 0.6 : 0.3), 0) / sessionResults.length
      : 0;
    const totalTime = Math.round((Date.now() - sessionStartTime) / 1000);

    return (
      <div className="min-h-screen bg-warmwhite" data-testid="section-adaptive-report">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-rose-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" data-testid="text-report-title">Session Complete!</h1>
            <p className="text-gray-500 text-sm">
              {STUDY_MODES.find(m => m.id === selectedMode)?.label} Mode
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Card className="border-0 shadow-md rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accuracy</p>
              <p className="text-3xl font-black text-rose-500" data-testid="text-report-accuracy">{accuracy}%</p>
            </Card>
            <Card className="border-0 shadow-md rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Correct</p>
              <p className="text-3xl font-black text-emerald-500" data-testid="text-report-correct">{correctCount}</p>
            </Card>
            <Card className="border-0 shadow-md rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-black text-gray-800" data-testid="text-report-total">{totalCount}</p>
            </Card>
            <Card className="border-0 shadow-md rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</p>
              <p className="text-3xl font-black text-blue-500">{Math.floor(totalTime / 60)}m</p>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Confidence Breakdown</h3>
            <div className="grid grid-cols-3 gap-2">
              {(["confident", "unsure", "guess"] as Confidence[]).map(c => {
                const count = sessionResults.filter(r => r.confidence === c).length;
                return (
                  <div key={c} className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-lg font-bold text-gray-800">{count}</p>
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium capitalize">{c}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 rounded-xl text-base font-bold bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => startStudySession(selectedMode)}
              data-testid="button-new-session"
            >
              <Play className="w-4 h-4 mr-2" /> New Session
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl text-base font-bold"
              onClick={() => { setView("dashboard"); fetchDashboard(); }}
              data-testid="button-view-dashboard"
            >
              <BarChart3 className="w-4 h-4 mr-2" /> View Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full h-12 rounded-xl text-base"
              onClick={() => setView("modes")}
              data-testid="button-back-modes"
            >
              Back to Study Modes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "study" && currentCard) {
    const correctIdx = getCorrectIndex(currentCard);
    const isCorrect = selectedOption !== null && isCorrectAnswer(currentCard, selectedOption);
    const progress = ((cardIndex + 1) / cards.length) * 100;
    const modeInfo = STUDY_MODES.find(m => m.id === selectedMode);
    const isRapidMode = selectedMode === "rapid";
    const isTestMode = selectedMode === "test";

    return (
      <div className="min-h-screen bg-warmwhite" data-testid="section-adaptive-study">
        <div className={cn("mx-auto px-4 py-4 sm:py-6", showRationale && !isRapidMode ? "max-w-[1200px]" : "max-w-[820px]")}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge className={cn("text-[10px] font-semibold rounded-lg border px-2 py-0.5", modeInfo?.color)} data-testid="badge-study-mode">
                {modeInfo?.label}
              </Badge>
              {currentCard.category && (
                <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-[10px] font-medium rounded-lg px-2 py-0.5" data-testid="badge-topic">
                  {currentCard.category || currentCard.topic}
                </Badge>
              )}
              {currentCard.difficulty && (
                <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-[10px] font-medium rounded-lg px-2 py-0.5">
                  {["", "Easy", "Medium", "Hard", "Expert", "Master"][currentCard.difficulty] || `Lvl ${currentCard.difficulty}`}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-600">{cardIndex + 1}</span>
              <span>/</span>
              <span>{cards.length}</span>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full mb-5 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          {isRapidMode ? (
            <div className="space-y-4">
              <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
                <CardContent className="p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 leading-relaxed" data-testid="text-rapid-question">
                    {currentCard.front}
                  </h2>
                  {showRationale ? (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] font-semibold text-emerald-700 uppercase">Answer</span>
                        </div>
                        <p className="text-sm text-gray-700">{currentCard.options ? getOptionText(currentCard.options[correctIdx]) : currentCard.back}</p>
                      </div>
                      {currentCard.rationaleCorrect && (
                        <p className="text-xs text-gray-500 leading-relaxed">{currentCard.rationaleCorrect}</p>
                      )}
                      <ConfidenceSelector selected={confidence} onSelect={setConfidence} />
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 rounded-lg border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleRapidNext(false)} data-testid="button-rapid-incorrect">
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Got it Wrong
                        </Button>
                        <Button size="sm" className="flex-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => handleRapidNext(true)} data-testid="button-rapid-correct">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Got it Right
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentCard.options?.map((opt: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(idx)}
                          className="w-full text-left px-3 py-2.5 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all text-sm flex items-center gap-2"
                          data-testid={`button-rapid-option-${idx}`}
                        >
                          <span className="w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center text-[10px] font-semibold text-gray-500 shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {getOptionText(opt)}
                        </button>
                      ))}
                      {!currentCard.options?.length && (
                        <Button onClick={() => setShowRationale(true)} className="w-full rounded-lg" data-testid="button-rapid-reveal">
                          Reveal Answer
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : showRationale ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300" data-testid="section-review-layout">
              <div className="flex flex-col gap-3">
                <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
                  <CardContent className="p-5 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 leading-relaxed" data-testid="text-question-stem">
                      {currentCard.front}
                    </h2>
                    <div className="space-y-2">
                      {currentCard.options?.map((opt: any, idx: number) => {
                        const optIsCorrect = isCorrectAnswer(currentCard, idx);
                        return (
                          <AnswerOption
                            key={idx}
                            index={idx}
                            text={getOptionText(opt)}
                            isSelected={selectedOption === idx}
                            isCorrect={optIsCorrect}
                            isWrong={selectedOption === idx && !optIsCorrect}
                            isRevealed={true}
                            disabled={true}
                            onClick={() => {}}
                            iconEl={
                              optIsCorrect
                                ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                                : selectedOption === idx && !optIsCorrect
                                  ? <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                                  : undefined
                            }
                            data-testid={`option-review-${idx}`}
                          />
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-3">
                <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
                  <div className="px-5 pt-4 pb-2 flex items-center gap-2 border-b border-gray-100">
                    <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center">
                      <BookOpen className="w-3 h-3 text-rose-500" />
                    </div>
                    <h3 className="text-xs font-semibold text-rose-600 tracking-wide">Rationale & Review</h3>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className={cn("rounded-lg border p-3", isCorrect ? "bg-emerald-50/50 border-emerald-100" : "bg-amber-50/50 border-amber-100")}>
                      <div className="flex items-center gap-2 mb-1">
                        {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-amber-500" />}
                        <span className={cn("text-[10px] font-semibold uppercase", isCorrect ? "text-emerald-700" : "text-amber-700")}>
                          {isCorrect ? "Correct!" : "Incorrect"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {currentCard.options ? getOptionText(currentCard.options[correctIdx]) : ""}
                      </p>
                    </div>

                    {currentCard.rationaleCorrect && (
                      <div className="bg-white rounded-lg border border-gray-100 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-semibold text-gray-500 uppercase">Why This Is Correct</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{currentCard.rationaleCorrect}</p>
                      </div>
                    )}

                    {currentCard.options && currentCard.options.length > 1 && (
                      <div className="bg-white rounded-lg border border-gray-100 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-[10px] font-semibold text-gray-500 uppercase">Why Other Options Are Incorrect</span>
                        </div>
                        <div className="space-y-2">
                          {currentCard.options.map((opt: any, idx: number) => {
                            if (isCorrectAnswer(currentCard, idx)) return null;
                            return (
                              <div key={idx} className="flex gap-2 pl-1">
                                <span className="text-[10px] font-bold text-rose-300 bg-rose-50 w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <div>
                                  <p className="text-xs font-medium text-gray-600">{getOptionText(opt)}</p>
                                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{getDistractorRationale(currentCard, idx)}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {currentCard.clinicalTakeaway && (
                      <div className="bg-blue-50/50 rounded-lg border border-blue-100 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-3 h-3 text-blue-600" />
                          <span className="text-[10px] font-semibold text-blue-600 uppercase">Clinical Takeaway</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{currentCard.clinicalTakeaway}</p>
                      </div>
                    )}

                    {currentCard.examPearl && (
                      <div className="bg-gradient-to-r from-amber-50/70 to-rose-50/50 rounded-lg border border-amber-100 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span className="text-[10px] font-semibold text-amber-700 uppercase">Exam Pearl</span>
                        </div>
                        <p className="text-xs text-amber-700 leading-relaxed">{currentCard.examPearl}</p>
                      </div>
                    )}

                    {currentCard.lessonLinks && currentCard.lessonLinks.length > 0 && (
                      <div className="bg-rose-50/30 rounded-lg border border-rose-100 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="w-3 h-3 text-rose-500" />
                          <span className="text-[10px] font-semibold text-rose-600 uppercase">Related Lessons</span>
                        </div>
                        <div className="space-y-1">
                          {currentCard.lessonLinks.map((link: any, i: number) => (
                            <a
                              key={i}
                              href={link.lessonUrl}
                              className="flex items-center gap-2 text-xs text-rose-600 hover:text-rose-800 hover:underline"
                              data-testid={`link-lesson-${i}`}
                            >
                              <ChevronRight className="w-3 h-3" />
                              <span>{link.lessonTitle}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="border-0 shadow-md rounded-2xl overflow-hidden" data-testid="card-question">
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5 leading-relaxed" data-testid="text-question-stem">
                  {currentCard.front}
                </h2>
                <div className="space-y-2">
                  {currentCard.options?.map((opt: any, idx: number) => (
                    <AnswerOption
                      key={idx}
                      index={idx}
                      text={getOptionText(opt)}
                      isSelected={selectedOption === idx}
                      isRevealed={false}
                      disabled={false}
                      onClick={() => handleOptionClick(idx)}
                      data-testid={`button-option-${idx}`}
                    />
                  ))}
                </div>
                {isTestMode && selectedOption !== null && !showRationale && (
                  <Button className="w-full mt-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white h-11" onClick={handleSubmit} data-testid="button-submit-answer">
                    Submit Answer
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between gap-3 pt-3 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => setView("modes")} className="text-gray-400 hover:text-gray-600 text-xs" data-testid="button-exit-study">
              Exit Session
            </Button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlagged(prev => { const s = new Set(prev); s.has(currentCard.id) ? s.delete(currentCard.id) : s.add(currentCard.id); return s; })}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all",
                  flagged.has(currentCard.id) ? "bg-rose-50 text-rose-600 border-rose-200" : "text-gray-400 border-gray-200 hover:bg-gray-50"
                )}
                data-testid="button-flag-card"
              >
                <Flag className="w-3.5 h-3.5" /> {flagged.has(currentCard.id) ? "Flagged" : "Flag"}
              </button>
              <button
                onClick={() => setMastered(prev => { const s = new Set(prev); s.has(currentCard.id) ? s.delete(currentCard.id) : s.add(currentCard.id); return s; })}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all",
                  mastered.has(currentCard.id) ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "text-gray-400 border-gray-200 hover:bg-gray-50"
                )}
                data-testid="button-master-card"
              >
                <Trophy className="w-3.5 h-3.5" /> {mastered.has(currentCard.id) ? "Mastered" : "Master"}
              </button>
            </div>
            {showRationale && (
              <div className="flex items-center gap-2">
                <ConfidenceSelector selected={confidence} onSelect={setConfidence} />
                <Button
                  size="sm"
                  disabled={!confidence}
                  onClick={handleNext}
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs h-8 px-4 shadow-sm disabled:opacity-50"
                  data-testid="button-next-card"
                >
                  {cardIndex < cards.length - 1 ? "Next" : "Finish"} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite" data-testid="section-adaptive-hub">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-gray-600 -ml-2 mb-1" data-testid="button-back-flashcards">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2" data-testid="text-adaptive-title">
              <Brain className="w-6 h-6 text-rose-500" /> Adaptive Study Engine
            </h1>
            <p className="text-sm text-gray-500 mt-1">Personalized study powered by your performance data</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setView("dashboard"); fetchDashboard(); }}
            className="rounded-lg text-xs gap-1.5"
            data-testid="button-open-dashboard"
          >
            <BarChart3 className="w-3.5 h-3.5" /> Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {STUDY_MODES.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => startStudySession(mode.id)}
                disabled={loading}
                className={cn(
                  "text-left p-4 rounded-2xl border-2 transition-all hover:shadow-md group",
                  "bg-white border-gray-100 hover:border-rose-200"
                )}
                data-testid={`button-mode-${mode.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", mode.color.split(" ")[0])}>
                    <Icon className={cn("w-5 h-5", mode.color.split(" ")[1])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">{mode.label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{mode.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Quick Start Presets
          </h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => { setFilters(preset.filters); startStudySession(preset.mode, preset.filters); }}
                className="rounded-lg text-xs font-medium"
                data-testid={`button-preset-${i}`}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="border-0 shadow-md rounded-2xl overflow-hidden mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" /> Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Topic</label>
                <select
                  value={filters.topic || ""}
                  onChange={e => setFilters(f => ({ ...f, topic: e.target.value || undefined }))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                  data-testid="select-filter-topic"
                >
                  <option value="">All Topics</option>
                  {["Cardiovascular", "Respiratory", "Neurological", "GI", "Renal", "Endocrine", "Hematology",
                    "Pediatrics", "Maternal", "Neonatal", "Oncology", "Pharmacology", "Mental Health",
                    "Infection Control", "Procedures", "Fundamentals", "Delegation", "Skin", "Musculoskeletal"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Difficulty</label>
                <select
                  value={filters.difficulty || ""}
                  onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                  data-testid="select-filter-difficulty"
                >
                  <option value="">Any Difficulty</option>
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                  <option value="4">Expert</option>
                  <option value="5">Master</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Type</label>
                <select
                  value={filters.questionType || ""}
                  onChange={e => setFilters(f => ({ ...f, questionType: e.target.value || undefined }))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                  data-testid="select-filter-type"
                >
                  <option value="">All Types</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="sata">Select All That Apply</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!filters.missedOnly}
                  onChange={e => setFilters(f => ({ ...f, missedOnly: e.target.checked || undefined }))}
                  className="rounded border-gray-300"
                  data-testid="checkbox-missed-only"
                />
                Missed cards only
              </label>
              {Object.values(filters).some(v => v !== undefined) && (
                <Button variant="ghost" size="sm" className="text-xs text-gray-400 h-6" onClick={() => setFilters({})}>
                  <X className="w-3 h-3 mr-1" /> Clear filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardView({
  userId,
  dashboard,
  loading,
  onRefresh,
  onBack,
  onStartMode,
}: {
  userId: string;
  dashboard: DashboardData | null;
  loading: boolean;
  onRefresh: () => void;
  onBack: () => void;
  onStartMode: (mode: StudyMode) => void;
}) {
  useEffect(() => { if (!dashboard) onRefresh(); }, []);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen bg-warmwhite flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-rose-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading your performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite" data-testid="section-dashboard">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-gray-600 -ml-2 mb-1" data-testid="button-dashboard-back">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2" data-testid="text-dashboard-title">
              <BarChart3 className="w-6 h-6 text-rose-500" /> Performance Dashboard
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={onRefresh} className="rounded-lg text-xs gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Studied</p>
            <p className="text-2xl font-black text-gray-800" data-testid="stat-total-studied">{dashboard.totalCardsStudied}</p>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-2xl font-black text-rose-500" data-testid="stat-accuracy">{dashboard.overallAccuracy}%</p>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Due for Review</p>
            <p className="text-2xl font-black text-amber-500" data-testid="stat-due-review">{dashboard.cardsDueForReview}</p>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Streak</p>
            <p className="text-2xl font-black text-emerald-500" data-testid="stat-streak">{dashboard.streakDays} day{dashboard.streakDays !== 1 ? "s" : ""}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">7-Day Accuracy</p>
            <p className="text-2xl font-black text-blue-500" data-testid="stat-recent-accuracy">{dashboard.recentAccuracy}%</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Last 7 days</p>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Topics Mastered</p>
            <p className="text-2xl font-black text-violet-500" data-testid="stat-mastered">{dashboard.masteredCount}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">≥85% mastery level</p>
          </Card>
        </div>

        {dashboard.weakAreas.length > 0 && (
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Weak Areas
                <Button size="sm" variant="outline" className="ml-auto rounded-lg text-xs gap-1" onClick={() => onStartMode("weak")} data-testid="button-study-weak">
                  <Play className="w-3 h-3" /> Study Weak Areas
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <div className="space-y-3">
                {dashboard.weakAreas.slice(0, 5).map((area, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 truncate">{area.topic}</span>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                          {area.correctCount}/{area.totalAttempts} correct
                        </span>
                      </div>
                      <MasteryBar level={area.masteryLevel} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 w-10 text-right">
                      {Math.round(area.masteryLevel * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {dashboard.masteryByTopic.length > 0 && (
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Mastery by Topic
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <div className="space-y-3">
                {dashboard.masteryByTopic.map((profile, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 truncate">{profile.topic}</span>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                          {profile.correctCount}/{profile.totalAttempts}
                        </span>
                      </div>
                      <MasteryBar level={profile.masteryLevel} />
                    </div>
                    <span className={cn(
                      "text-xs font-semibold w-10 text-right",
                      profile.masteryLevel >= 0.8 ? "text-emerald-600" : profile.masteryLevel >= 0.5 ? "text-amber-600" : "text-red-600"
                    )}>
                      {Math.round(profile.masteryLevel * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {dashboard.confidenceTrend.length > 0 && (
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" /> Confidence Trend (30 days)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <div className="flex items-end gap-1 h-20">
                {dashboard.confidenceTrend.map((point, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-200 rounded-t-sm hover:bg-blue-400 transition-colors relative group"
                    style={{ height: `${Math.round(point.avgConfidence * 100)}%` }}
                    title={`${new Date(point.date).toLocaleDateString()}: ${Math.round(point.avgConfidence * 100)}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-gray-400">30 days ago</span>
                <span className="text-[9px] text-gray-400">Today</span>
              </div>
            </CardContent>
          </Card>
        )}

        {dashboard.totalCardsStudied === 0 && (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No study data yet</h3>
            <p className="text-sm text-gray-400 mb-6">Start a study session to see your performance analytics</p>
            <Button className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white" onClick={() => onStartMode("learn")} data-testid="button-start-first-session">
              <Play className="w-4 h-4 mr-2" /> Start Learning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
