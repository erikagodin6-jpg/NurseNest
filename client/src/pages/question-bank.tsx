import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { getExamQuestions, type PooledQuestion } from "@/lib/question-pool";
import { CheckCircle2, XCircle, Filter, RotateCcw, ChevronLeft, ChevronRight, Trophy, Target, Lock, Crown, Lightbulb, Crosshair, BookOpen, Bookmark } from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";
import { LocaleLink } from "@/lib/LocaleLink";
import { useAuth } from "@/lib/auth";
import { canAccessTier } from "@/lib/access";
import { useLocation } from "wouter";
import { getTierConfig, getAllowedExamTiers } from "@shared/tier-config";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ConfidenceRatingModal } from "@/components/study-momentum";

const FREE_PREVIEW_COUNT = 3;

export default function QuestionBank() {
  const { user, effectiveTier } = useAuth();
  const [, setLocation] = useLocation();
  const [questionMode, setQuestionMode] = useState<"mcq" | "bowtie">("mcq");
  const allowedQBankTiers = getAllowedExamTiers(effectiveTier || "free");
  const defaultTierFilter = allowedQBankTiers.length === 1 ? allowedQBankTiers[0] : (allowedQBankTiers.length > 0 ? allowedQBankTiers[0] : "all");
  const [tierFilter, setTierFilter] = useState<string>(defaultTierFilter);
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [showConfidence, setShowConfidence] = useState(false);
  const [confidenceRated, setConfidenceRated] = useState(false);
  const [allQuestions, setAllQuestions] = useState<PooledQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

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
    setLoadingQuestions(true);
    getExamQuestions(tier, 50).then((questions) => {
      setAllQuestions(questions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setRevealed(false);
      setLoadingQuestions(false);
    }).catch(() => setLoadingQuestions(false));
  }, [tierFilter, effectiveTier]);

  const filtered = useMemo(() => {
    let q = allQuestions;
    if (systemFilter !== "all") q = q.filter(x => x.bodySystem === systemFilter);
    return q;
  }, [allQuestions, systemFilter]);

  const isTierLocked = tierFilter !== "all" && !userCanAccessTier(tierFilter);
  const accessibleQuestions = useMemo(() => {
    if (isTierLocked) return [];
    if (!user || !effectiveTier || effectiveTier === "free") {
      return filtered.slice(0, FREE_PREVIEW_COUNT);
    }
    return filtered;
  }, [filtered, user, effectiveTier, isTierLocked]);

  const bodySystems = useMemo(() => {
    const systems = new Set(allQuestions.map(q => q.bodySystem));
    return Array.from(systems).sort();
  }, [allQuestions]);

  const question = accessibleQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
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

  const isCorrect = selectedAnswer === question?.correct;
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const qbTierConfig = getTierConfig(effectiveTier);
  const qbTitle = (effectiveTier && effectiveTier !== "free" && effectiveTier !== "admin")
    ? qbTierConfig.questionBankLabel
    : "Question Bank";

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
              Practice {accessibleQuestions.length.toLocaleString()} of {filtered.length.toLocaleString()} questions with detailed rationales
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              {allowedQBankTiers.length !== 1 && (
              <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
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
                <SelectTrigger className="w-[180px] border-gray-200 bg-white" data-testid="select-system">
                  <SelectValue placeholder="Body System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Systems</SelectItem>
                  {bodySystems.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto flex items-center gap-4">
              {stats.total > 0 && (
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
                  {filtered.length.toLocaleString()} {tierFilter === "rpn" ? "RPN/LVN" : tierFilter === "rn" ? "RN" : "NP"} practice questions with detailed rationales are available with a subscription. Upgrade to unlock full access.
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

          {(!user || effectiveTier === "free") && tierFilter === "all" && accessibleQuestions.length < filtered.length && (
            <Card className="border-amber-200 bg-amber-50/50 mb-6" data-testid="card-qb-preview-notice">
              <CardContent className="p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-amber-800 font-medium">
                    Showing {accessibleQuestions.length} preview questions. Subscribe to unlock all {filtered.length.toLocaleString()} questions across RPN, RN, and NP tiers.
                  </p>
                </div>
                <Button size="sm" onClick={() => setLocation(user ? "/pricing" : "/start-free")} className="rounded-xl shrink-0" data-testid="button-qb-unlock">
                  Unlock All
                </Button>
              </CardContent>
            </Card>
          )}

          {accessibleQuestions.length === 0 ? (
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">{isTierLocked ? "Subscribe to access these questions." : "No questions match your filters. Try adjusting the tier or body system selection."}</p>
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
                          <span>Difficulty: {["", "Easy", "Moderate", "Hard", "Very Hard", "Expert"][question.difficulty] || question.difficulty}/5</span>
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
