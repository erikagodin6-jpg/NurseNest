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
  GraduationCap,
  ExternalLink,
  Image as ImageIcon,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import {
  AnswerOption,
  ResultHeader,
  RationaleSection,
  PremiumBadge,
  StudyProgressBar,
  ScoreCircle,
  PostAnswerReviewLayout,
  RationaleText,
  StudyTopicLink,
  DistractorCard,
  RationaleImageBlock,
} from "@/components/premium-study";
import { getQuestionImage } from "@/lib/system-images";

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

type RationaleMedia = {
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  imageDescription: string;
  sortOrder: number;
};

type LessonLink = {
  lessonTitle: string;
  lessonUrl: string;
  relevanceNote: string;
};

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
  questionType: string;
  clinicalTakeaway: string;
  examPearl: string;
  distractorRationales: Record<string, string>;
  rationaleMedia: RationaleMedia[];
  lessonLinks: LessonLink[];
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
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

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
      if (data.length === 0) throw new Error("No questions available for your tier. Please contact support.");
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
      setExpandedImage(null);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentQ = questions[currentIdx];
  const scorePercent = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

  const difficultyColor = (d: string) => {
    switch (d) {
      case "easy": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "moderate": return "bg-amber-50 text-amber-700 border-amber-200";
      case "hard": return "bg-orange-50 text-orange-700 border-orange-200";
      case "very_hard": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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
      <div className="mx-auto px-4 py-8 max-w-[900px]">
        {!started ? (
          <Card className="premium-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5" data-testid="text-study-setup-title">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                </div>
                Test Bank Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-gray-500 text-sm leading-relaxed">
                Practice exam-style questions one at a time with detailed rationale, clinical reference images,
                and linked study lessons. Questions are drawn from the full CAT exam question bank for your tier.
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
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Category / Topic</label>
                  <Input value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} placeholder="e.g. Cardiac, Pharmacology" className="rounded-xl border-gray-200" data-testid="input-study-category" />
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
              {bookmarked.size > 0 && (
                <p className="text-sm text-violet-600 mb-4">
                  <Bookmark className="h-4 w-4 inline mr-1" />{bookmarked.size} question{bookmarked.size > 1 ? "s" : ""} bookmarked for review
                </p>
              )}
              <div className="flex gap-3 justify-center">
                <Button onClick={fetchQuestions} className="rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-sm" data-testid="button-study-again">
                  <RotateCcw className="h-4 w-4" />Study Again
                </Button>
                <Button variant="outline" onClick={() => setStarted(false)} className="rounded-xl" data-testid="button-study-setup">
                  Change Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <PremiumBadge variant="default" data-testid="text-study-progress">
                {currentIdx + 1} / {questions.length}
              </PremiumBadge>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <button
                  onClick={() => toggleBookmark(currentQ.id)}
                  className={`p-1.5 rounded-lg transition-colors ${bookmarked.has(currentQ.id) ? "text-violet-600 bg-violet-50" : "text-gray-400 hover:text-gray-600"}`}
                  data-testid="button-bookmark"
                >
                  <Bookmark className="h-4 w-4" fill={bookmarked.has(currentQ.id) ? "currentColor" : "none"} />
                </button>
                <span className="font-medium" data-testid="text-study-score">{stats.correct}/{stats.attempted} correct</span>
                {stats.attempted > 0 && <PremiumBadge variant={scorePercent >= 70 ? "system" : "difficulty"}>{scorePercent}%</PremiumBadge>}
              </div>
            </div>

            <StudyProgressBar value={((currentIdx + 1) / questions.length) * 100} variant="primary" className="mb-6" />

            <Card className="premium-card border-0 shadow-md rounded-2xl mb-5 animate-fade-in-up overflow-hidden">
              <CardContent className="px-6 sm:px-8 py-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <PremiumBadge variant="system">{currentQ.category}</PremiumBadge>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColor(currentQ.difficulty)}`}>
                    {currentQ.difficulty === "very_hard" ? "Very Hard" : currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
                  </span>
                  {currentQ.topic && <PremiumBadge>{currentQ.topic}</PremiumBadge>}
                  {currentQ.questionType && currentQ.questionType !== "mcq" && currentQ.questionType !== "multiple_choice" && (
                    <PremiumBadge variant="difficulty">{currentQ.questionType.replace(/_/g, " ").toUpperCase()}</PremiumBadge>
                  )}
                </div>
                <p className="text-xl font-semibold mb-6 text-gray-900 leading-[1.6]" data-testid="text-study-question">{currentQ.question}</p>
                <div className="space-y-2.5">
                  {[
                    { key: "A", text: currentQ.optionA },
                    { key: "B", text: currentQ.optionB },
                    { key: "C", text: currentQ.optionC },
                    { key: "D", text: currentQ.optionD },
                  ].filter(opt => opt.text).map((opt, idx) => (
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

                {revealed && (
                  <div className="mt-6 pt-4 border-t border-gray-100" data-testid="card-rationale">
                    <PostAnswerReviewLayout
                      questionColumn={
                        <>
                          <ResultHeader
                            isCorrect={selected === currentQ.correctAnswer}
                            correctText={`Correct Answer: ${currentQ.correctAnswer}. ${currentQ[`option${currentQ.correctAnswer}` as keyof Question] as string}`}
                          />

                          {Object.keys(currentQ.distractorRationales || {}).length > 0 ? (
                            <RationaleSection
                              icon={<XCircle className="h-4 w-4 text-gray-500" />}
                              title="Why Other Options Are Wrong"
                              variant="distractor"
                              data-testid="section-distractor-rationales"
                            >
                              <div className="space-y-2">
                                {["A", "B", "C", "D"].filter(k => k !== currentQ.correctAnswer && currentQ[`option${k}` as keyof Question]).map(k => {
                                  const optText = currentQ[`option${k}` as keyof Question] as string;
                                  const rationale = currentQ.distractorRationales[optText] || "Review the rationale to understand why this is incorrect.";
                                  return (
                                    <DistractorCard
                                      key={k}
                                      letter={k}
                                      text={optText}
                                      rationale={rationale}
                                    />
                                  );
                                })}
                              </div>
                            </RationaleSection>
                          ) : (
                            <RationaleSection
                              icon={<XCircle className="h-4 w-4 text-gray-500" />}
                              title="Why Other Options Are Wrong"
                              variant="distractor"
                              data-testid="section-distractor-rationales"
                            >
                              <div className="space-y-2">
                                {["A", "B", "C", "D"].filter(k => k !== currentQ.correctAnswer && currentQ[`option${k}` as keyof Question]).map(k => (
                                  <DistractorCard
                                    key={k}
                                    letter={k}
                                    text={currentQ[`option${k}` as keyof Question] as string}
                                    rationale="Review the rationale above to understand why this option is incorrect."
                                  />
                                ))}
                              </div>
                            </RationaleSection>
                          )}
                        </>
                      }
                      rationaleColumn={
                        <>
                          <RationaleSection
                            icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
                            title="Explanation"
                          >
                            <RationaleText text={currentQ.rationale} />
                          </RationaleSection>

                          {currentQ.clinicalTakeaway && (
                            <RationaleSection
                              icon={<GraduationCap className="h-4 w-4 text-violet-500" />}
                              title="Clinical Takeaway"
                              variant="pearl"
                            >
                              <p className="text-sm text-gray-700 leading-relaxed">{currentQ.clinicalTakeaway}</p>
                            </RationaleSection>
                          )}

                          {currentQ.examPearl && (
                            <RationaleSection
                              icon={<Star className="h-4 w-4 text-amber-500" />}
                              title="Exam Strategy"
                              variant="pearl"
                            >
                              <p className="text-sm text-gray-700 leading-relaxed">{currentQ.examPearl}</p>
                            </RationaleSection>
                          )}

                          {currentQ.rationaleMedia && currentQ.rationaleMedia.length > 0 && (
                            <RationaleSection
                              icon={<ImageIcon className="h-4 w-4 text-blue-500" />}
                              title="Clinical Reference"
                            >
                              <div className="space-y-3">
                                {currentQ.rationaleMedia.map((media, i) => (
                                  <div key={i} className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                    <button
                                      onClick={() => setExpandedImage(expandedImage === media.imageUrl ? null : media.imageUrl)}
                                      className="w-full"
                                      data-testid={`button-expand-image-${i}`}
                                    >
                                      <img
                                        src={media.imageUrl}
                                        alt={media.imageAlt || `Clinical reference image - NurseNest nursing education`}
                                        className={`w-full object-contain transition-all ${expandedImage === media.imageUrl ? "max-h-[600px]" : "max-h-[250px]"}`}
                                        loading="lazy"
                                      />
                                    </button>
                                    {(media.imageCaption || media.imageDescription) && (
                                      <div className="p-3 bg-white border-t border-gray-100">
                                        {media.imageCaption && (
                                          <p className="text-sm font-semibold text-gray-800">{media.imageCaption}</p>
                                        )}
                                        {media.imageDescription && (
                                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{media.imageDescription}</p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </RationaleSection>
                          )}

                          {(() => {
                            const hasMediaImages = currentQ.rationaleMedia && currentQ.rationaleMedia.length > 0;
                            if (!hasMediaImages) {
                              const img = getQuestionImage({ topic: currentQ.topic, bodySystem: currentQ.category });
                              const qbAlt = currentQ.topic
                                ? `Clinical illustration of ${currentQ.topic}${currentQ.category ? ` - ${currentQ.category}` : ""} - NurseNest nursing education`
                                : currentQ.category
                                ? `${currentQ.category} system clinical reference - NurseNest nursing education`
                                : "NurseNest clinical reference illustration";
                              return img ? (
                                <RationaleImageBlock
                                  src={img}
                                  alt={qbAlt}
                                  caption={currentQ.topic || currentQ.category || undefined}
                                  data-testid="img-rationale"
                                />
                              ) : null;
                            }
                            return null;
                          })()}

                          {currentQ.lessonLinks && currentQ.lessonLinks.length > 0 && (
                            <RationaleSection
                              icon={<BookOpen className="h-4 w-4 text-emerald-500" />}
                              title="Related Lessons"
                            >
                              <div className="space-y-2">
                                {currentQ.lessonLinks.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link.lessonUrl}
                                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-colors group"
                                    data-testid={`link-lesson-${i}`}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                                      <BookOpen className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">{link.lessonTitle}</p>
                                      {link.relevanceNote && (
                                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{link.relevanceNote}</p>
                                      )}
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-emerald-500 shrink-0 mt-0.5" />
                                  </a>
                                ))}
                              </div>
                            </RationaleSection>
                          )}

                          {!currentQ.lessonLinks?.length && (
                            <StudyTopicLink
                              topic={currentQ.topic}
                              bodySystem={currentQ.category}
                            />
                          )}
                        </>
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>

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
                <Button onClick={() => setCurrentIdx(questions.length)} className="w-full rounded-xl py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm" data-testid="button-finish-study">
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
