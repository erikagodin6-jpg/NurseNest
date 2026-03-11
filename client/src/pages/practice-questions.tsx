import { useState, useMemo, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { getExamQuestions, type PooledQuestion } from "@/lib/question-pool";
import { getQuestionImage } from "@/lib/system-images";
import {
  ArrowRight, CheckCircle2, XCircle, BookOpen, Target,
  ChevronRight, RotateCcw, Heart, Brain, Wind, Stethoscope,
  Activity, Pill, Baby, Droplets, Shield, Layers,
} from "lucide-react";
import { LocaleLink } from "@/lib/LocaleLink";
import { ConfidenceRatingModal } from "@/components/study-momentum";

const TIER_LABELS: Record<string, string> = {
  rpn: "RPN / REx-PN / LPN",
  rn: "RN / NCLEX-RN",
  np: "Nurse Practitioner",
  free: "Pre-Nursing Foundations",
};

const TIER_SEO_LABELS: Record<string, string> = {
  rpn: "REx-PN RPN LPN",
  rn: "NCLEX-RN RN",
  np: "Nurse Practitioner NP",
  free: "Pre-Nursing",
};

const SYSTEM_ICONS: Record<string, typeof Heart> = {
  Cardiovascular: Heart,
  Respiratory: Wind,
  Neurological: Brain,
  Gastrointestinal: Activity,
  Endocrine: Droplets,
  Renal: Droplets,
  Pharmacology: Pill,
  Hematology: Activity,
  Maternal: Baby,
  Pediatric: Baby,
  Assessment: Stethoscope,
  "Mental Health": Brain,
  Musculoskeletal: Layers,
  Integumentary: Shield,
};

function getSystemIcon(system: string) {
  for (const [key, icon] of Object.entries(SYSTEM_ICONS)) {
    if (system.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return Target;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function deslugify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function PracticeQuestionsIndex() {
  const [, setLocation] = useLocation();
  const [combos, setCombos] = useState<{ tier: string; system: string; count: number }[]>([]);

  useEffect(() => {
    const fetchCombos = async () => {
      const tiers = ["rpn", "rn", "np"];
      const results: { tier: string; system: string; count: number }[] = [];
      for (const tier of tiers) {
        try {
          const { fetchQBankStats } = await import("@/lib/qbank-api");
          const res = await fetch(`/api/qbank/body-systems?tier=${tier}`);
          if (res.ok) {
            const data = await res.json();
            for (const system of data.bodySystems || []) {
              results.push({ tier, system, count: 10 });
            }
          }
        } catch {}
      }
      setCombos(results);
    };
    fetchCombos();
  }, []);

  const groupedByTier: Record<string, { system: string; count: number }[]> = {};
  for (const c of combos) {
    if (!groupedByTier[c.tier]) groupedByTier[c.tier] = [];
    groupedByTier[c.tier].push({ system: c.system, count: c.count });
  }

  const tierOrder = ["rpn", "rn", "np", "free"];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Nursing Practice Questions",
    description: "Browse free practice questions by exam tier and body system. Interactive NCLEX, REx-PN, and NP exam practice with instant rationales.",
    url: "https://www.nursenest.ca/practice-questions",
    isPartOf: { "@type": "WebSite", name: "NurseNest", url: "https://www.nursenest.ca" },
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO
        title="Free Nursing Practice Questions by System | NCLEX & REx-PN | NurseNest"
        description="Browse hundreds of free nursing practice questions organized by exam tier and body system. Interactive NCLEX-RN, REx-PN, and NP exam questions with detailed rationales."
        keywords="free NCLEX practice questions, free REx-PN questions, nursing practice questions by system, free nursing exam questions"
        canonicalPath="/practice-questions"
        structuredData={structuredData}
      />
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-white to-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <BreadcrumbNav items={[
              { name: "Home", url: "https://www.nursenest.ca/" },
              { name: "Free Practice Questions", url: "https://www.nursenest.ca/practice-questions" },
            ]} />
            <div className="text-center mb-10">
              <Badge className="bg-primary/10 text-primary mb-3 px-4 py-1.5" data-testid="badge-practice-questions">
                <Target className="w-3 h-3 mr-1.5" /> Free Practice Questions
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="text-practice-questions-title">
                Free Nursing Practice Questions
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-practice-questions-subtitle">
                Choose your exam tier and body system below. Each set includes 5 interactive questions with detailed rationales — no account required.
              </p>
            </div>

            {tierOrder.filter(t => groupedByTier[t]).map((tier) => (
              <div key={tier} className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" data-testid={`text-tier-heading-${tier}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                    tier === "rpn" ? "bg-blue-500" : tier === "rn" ? "bg-green-500" : tier === "np" ? "bg-purple-500" : "bg-gray-500"
                  }`}>
                    {tier.toUpperCase()}
                  </div>
                  {TIER_LABELS[tier] || tier.toUpperCase()}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedByTier[tier].map(({ system, count }) => {
                    const Icon = getSystemIcon(system);
                    const slug = slugify(system);
                    return (
                      <Card
                        key={slug}
                        className="border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                        onClick={() => setLocation(`/practice-questions/${tier}/${slug}`)}
                        data-testid={`card-practice-${tier}-${slug}`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{system}</h3>
                            <p className="text-xs text-gray-500">{count} questions available</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors shrink-0" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold mb-2" data-testid="text-cta-heading">Want Thousands More Questions?</h2>
              <p className="text-gray-600 mb-4 text-sm max-w-lg mx-auto">
                Access our full question bank with advanced analytics, timed mock exams, and personalized study plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => setLocation("/start-free")} className="bg-primary hover:brightness-110 text-white rounded-xl h-11" data-testid="button-start-free-cta">
                  Start Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button onClick={() => setLocation("/mock-exams")} variant="outline" className="rounded-xl h-11" data-testid="button-mock-exams-cta">
                  Try Mock Exams
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function QuizSession({ tier, systemSlug }: { tier: string; systemSlug: string }) {
  const [, setLocation] = useLocation();
  const systemName = deslugify(systemSlug);
  const [questions, setQuestions] = useState<PooledQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getExamQuestions(tier, 5, [deslugify(systemSlug)]).then((qs) => {
      setQuestions(qs.length > 0 ? qs : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [tier, systemSlug]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfidence, setShowConfidence] = useState(false);
  const [confidenceRated, setConfidenceRated] = useState(false);

  const current = questions[currentIndex];
  const tierLabel = TIER_LABELS[tier] || tier.toUpperCase();
  const seoTier = TIER_SEO_LABELS[tier] || tier.toUpperCase();

  const handleAnswer = (optionIndex: number) => {
    if (showRationale) return;
    setSelectedAnswer(optionIndex);
    setShowRationale(true);
    setAnswered((a) => a + 1);
    if (optionIndex === current.correct) {
      setScore((s) => s + 1);
    }
    setShowConfidence(true);
    setConfidenceRated(false);
  };

  const handleConfidenceClose = () => {
    setShowConfidence(false);
    setConfidenceRated(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowRationale(false);
      setShowConfidence(false);
      setConfidenceRated(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowRationale(false);
    setScore(0);
    setAnswered(0);
    setCompleted(false);
    setShowConfidence(false);
    setConfidenceRated(false);
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.slice(0, 5).map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${q.options[q.correct]}. ${q.rationale}`,
      },
    })),
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h1 className="text-xl font-bold mb-2">No Questions Available</h1>
              <p className="text-gray-600 mb-4 text-sm">We don't have enough questions for this combination yet.</p>
              <Button onClick={() => setLocation("/practice-questions")} className="bg-primary text-white rounded-xl" data-testid="button-back-to-index">
                Browse All Categories
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = getSystemIcon(systemName);

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO
        title={`Free ${seoTier} ${systemName} Practice Questions | NurseNest`}
        description={`Practice 5 free ${seoTier} ${systemName} nursing exam questions with detailed rationales. Test your clinical knowledge — no signup required.`}
        keywords={`free ${seoTier} ${systemName} practice questions, ${systemName.toLowerCase()} nursing questions, free nursing exam practice`}
        canonicalPath={`/practice-questions/${tier}/${systemSlug}`}
        structuredData={faqStructuredData}
        
      />
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-white to-white py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbNav items={[
              { name: "Home", url: "https://www.nursenest.ca/" },
              { name: "Free Practice Questions", url: "https://www.nursenest.ca/practice-questions" },
              { name: tierLabel, url: `https://www.nursenest.ca/practice-questions` },
              { name: systemName, url: `https://www.nursenest.ca/practice-questions/${tier}/${systemSlug}` },
            ]} />

            <div className="text-center mb-8">
              <Badge className="bg-primary/10 text-primary mb-3 px-4 py-1.5" data-testid="badge-tier-system">
                <Icon className="w-3 h-3 mr-1.5" /> {tierLabel} — {systemName}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-quiz-title">
                {systemName} Practice Questions
              </h1>
              <p className="text-gray-600 text-sm" data-testid="text-quiz-subtitle">
                5 exam-style questions with instant feedback and detailed rationales
              </p>
            </div>

            <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-gray-700" data-testid="text-progress">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-emerald-600 font-medium" data-testid="text-score">
                  Score: {score}/{answered}
                </span>
              </div>
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + (showRationale ? 1 : 0)) / questions.length) * 100}%` }}
                  data-testid="progress-bar"
                />
              </div>
            </div>

            {!completed ? (
              <Card className="border border-gray-100 shadow-lg" data-testid="card-question">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs" data-testid="badge-system">
                      {systemName}
                    </Badge>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed" data-testid="text-question">
                    {current.question}
                  </h2>

                  <div className="space-y-3 mb-6">
                    {current.options.map((option, i) => {
                      let borderColor = "border-gray-200 hover:border-primary/40";
                      let bgColor = "bg-white hover:bg-primary/5";
                      let icon = null;

                      if (showRationale) {
                        if (i === current.correct) {
                          borderColor = "border-emerald-400";
                          bgColor = "bg-emerald-50";
                          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
                        } else if (i === selectedAnswer && i !== current.correct) {
                          borderColor = "border-red-400";
                          bgColor = "bg-red-50";
                          icon = <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
                        } else {
                          borderColor = "border-gray-100";
                          bgColor = "bg-gray-50";
                        }
                      } else if (selectedAnswer === i) {
                        borderColor = "border-primary";
                        bgColor = "bg-primary/5";
                      }

                      const letterLabel = String.fromCharCode(65 + i);
                      const isSelected = selectedAnswer === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={showRationale}
                          role="radio"
                          aria-checked={isSelected}
                          aria-label={`Option ${letterLabel}: ${option}`}
                          className={`w-full text-left px-4 py-3.5 rounded transition-colors flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-[#BFA6F6]/40 focus:ring-offset-1 ${
                            showRationale
                              ? i === current.correct
                                ? "bg-emerald-50/80 border-l-3 border-l-emerald-500"
                                : isSelected
                                ? "bg-red-50/80 border-l-3 border-l-red-400"
                                : "opacity-60"
                              : isSelected
                              ? "bg-[#BFA6F6]/8 border-l-3 border-l-[#BFA6F6]"
                              : "hover:bg-gray-50"
                          }`}
                          data-testid={`button-option-${i}`}
                        >
                          <span className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            showRationale
                              ? i === current.correct
                                ? "border-emerald-500 bg-emerald-500"
                                : isSelected
                                ? "border-red-400 bg-red-400"
                                : "border-gray-300"
                              : isSelected
                              ? "border-[#BFA6F6] bg-[#BFA6F6]"
                              : "border-gray-300"
                          }`}>
                            {(isSelected || (showRationale && i === current.correct)) && (
                              <span className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </span>
                          <span className={`flex-1 text-sm sm:text-base leading-relaxed ${
                            isSelected && !showRationale ? "text-[#2E3A59] font-medium" : "text-gray-700"
                          }`}>
                            <span className="font-semibold mr-1.5">{letterLabel}.</span>
                            {option}
                          </span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>

                  {showRationale && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6" data-testid="section-rationale">
                      <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Rationale
                      </h3>
                      <p className="text-sm text-blue-800 leading-relaxed">{current.rationale}</p>
                      {(() => {
                        const img = getQuestionImage({ topic: current.topic, subtopic: current.subtopic, bodySystem: current.bodySystem });
                        return img ? (
                          <div className="mt-4">
                            <img src={img} alt={current.topic || current.bodySystem || "Clinical reference"} className="rounded-lg border border-blue-200 max-h-72 w-auto mx-auto" loading="lazy" data-testid="img-rationale" />
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}

                  {showConfidence && selectedAnswer !== null && (
                    <ConfidenceRatingModal
                      questionId={`${tier}-${systemSlug}-${currentIndex}`}
                      wasCorrect={selectedAnswer === current.correct}
                      topic={systemSlug}
                      bodySystem={systemSlug}
                      onClose={handleConfidenceClose}
                    />
                  )}

                  {showRationale && confidenceRated && (
                    <Button
                      onClick={handleNext}
                      className="w-full h-12 bg-primary hover:brightness-110 text-white rounded-xl"
                      data-testid="button-next-question"
                    >
                      {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-gray-100 shadow-lg" data-testid="card-results">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" data-testid="text-final-score">
                    You scored {score} out of {questions.length}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {score >= 4
                      ? "Excellent work! You have strong clinical knowledge."
                      : score >= 3
                      ? "Good foundation! Keep practicing to strengthen weak areas."
                      : "Keep studying! Focused review will help you improve."}
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    These questions are a small sample. Access thousands more with detailed analytics.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-emerald-600" data-testid="text-accuracy">{Math.round((score / questions.length) * 100)}%</p>
                      <p className="text-sm text-emerald-700">Accuracy</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600">{questions.length}</p>
                      <p className="text-sm text-blue-700">Questions Completed</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => setLocation("/start-free")}
                      className="w-full h-12 bg-primary hover:brightness-110 text-white rounded-xl"
                      data-testid="button-signup-cta"
                    >
                      Create Free Account for Full Access <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setLocation("/practice-questions")}
                      variant="outline"
                      className="w-full h-12 rounded-xl"
                      data-testid="button-browse-more"
                    >
                      Try Another System <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleRestart}
                      variant="ghost"
                      className="w-full h-12 rounded-xl text-gray-600"
                      data-testid="button-restart"
                    >
                      <RotateCcw className="mr-2 w-4 h-4" /> Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-lg mb-3" data-testid="text-more-systems">More {tierLabel} Practice</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {getAvailableCombinations()
                  .filter((c) => c.tier === tier && slugify(c.system) !== systemSlug)
                  .slice(0, 6)
                  .map((c) => {
                    const SysIcon = getSystemIcon(c.system);
                    return (
                      <LocaleLink
                        key={slugify(c.system)}
                        href={`/practice-questions/${tier}/${slugify(c.system)}`}
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/5 transition-colors text-sm"
                        data-testid={`link-related-${slugify(c.system)}`}
                      >
                        <SysIcon className="w-4 h-4 text-primary" />
                        <span className="font-medium">{c.system}</span>
                        <span className="text-gray-400 text-xs ml-auto">{c.count} Qs</span>
                      </LocaleLink>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function PracticeQuestionsPage() {
  const [matchDetail, params] = useRoute("/practice-questions/:tier/:system");

  if (matchDetail && params?.tier && params?.system) {
    return <QuizSession tier={params.tier} systemSlug={params.system} />;
  }

  return <PracticeQuestionsIndex />;
}
