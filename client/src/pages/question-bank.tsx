import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { buildQuestionPool } from "@/lib/question-pool";
import { CheckCircle2, XCircle, Filter, RotateCcw, ChevronLeft, ChevronRight, Trophy, Target } from "lucide-react";

export default function QuestionBank() {
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const allQuestions = useMemo(() => buildQuestionPool(), []);

  const filtered = useMemo(() => {
    let q = allQuestions;
    if (tierFilter !== "all") q = q.filter(x => x.tier === tierFilter);
    if (systemFilter !== "all") q = q.filter(x => x.bodySystem === systemFilter);
    return q;
  }, [allQuestions, tierFilter, systemFilter]);

  const bodySystems = useMemo(() => {
    const systems = new Set(allQuestions.map(q => q.bodySystem));
    return Array.from(systems).sort();
  }, [allQuestions]);

  const question = filtered[currentIndex];

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
  };

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedAnswer(null);
    setRevealed(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filtered.length - 1);
    }
    setSelectedAnswer(null);
    setRevealed(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setStats({ correct: 0, total: 0 });
  };

  const isCorrect = selectedAnswer === question?.correct;
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <>
      <SEO
        title="Nursing Question Bank - Practice Questions"
        description="Practice thousands of nursing questions with instant rationale. Filter by tier (RPN, RN, NP) and body system. Prepare for NCLEX and Canadian nursing exams."
        canonicalPath="/question-bank"
        keywords="nursing question bank, practice questions, NCLEX prep, nursing exam questions, RPN questions, RN questions, NP questions"
      />

      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-qb-title">
              Question Bank
            </h1>
            <p className="text-muted-foreground">
              Practice {filtered.length.toLocaleString()} questions with detailed rationales
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                <SelectTrigger className="w-[140px]" data-testid="select-tier">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="rpn">RPN/LVN</SelectItem>
                  <SelectItem value="rn">RN</SelectItem>
                  <SelectItem value="np">NP</SelectItem>
                </SelectContent>
              </Select>

              <Select value={systemFilter} onValueChange={(v) => { setSystemFilter(v); setCurrentIndex(0); setSelectedAnswer(null); setRevealed(false); }}>
                <SelectTrigger className="w-[180px]" data-testid="select-system">
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
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-primary" />
                    <span data-testid="text-accuracy">{accuracy}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span data-testid="text-score">{stats.correct}/{stats.total}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleReset} data-testid="button-reset">
                    <RotateCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
                </div>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No questions match your filters. Try adjusting the tier or body system selection.</p>
              </CardContent>
            </Card>
          ) : question ? (
            <>
              <Card className="mb-4 shadow-lg border-2" data-testid="card-question">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="uppercase" data-testid="badge-q-tier">
                        {question.tier === "rpn" ? "RPN/LVN" : question.tier === "rn" ? "RN" : "NP"}
                      </Badge>
                      <Badge variant="outline" data-testid="badge-q-system">{question.bodySystem}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground" data-testid="text-progress">
                      {currentIndex + 1} / {filtered.length}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-relaxed" data-testid="text-q-text">
                    {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {question.options.map((opt, idx) => {
                      let cls = "border-border hover:border-primary/50 hover:bg-muted/50";
                      let iconEl = null;

                      if (revealed) {
                        if (idx === question.correct) {
                          cls = "border-green-500 bg-green-50 dark:bg-green-950/30";
                          iconEl = <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />;
                        } else if (idx === selectedAnswer && !isCorrect) {
                          cls = "border-red-500 bg-red-50 dark:bg-red-950/30";
                          iconEl = <XCircle className="h-5 w-5 text-red-600 shrink-0" />;
                        }
                      } else if (idx === selectedAnswer) {
                        cls = "border-primary bg-primary/5";
                      }

                      return (
                        <button
                          key={idx}
                          data-testid={`button-qb-option-${idx}`}
                          onClick={() => handleAnswer(idx)}
                          disabled={revealed}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${cls} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span className="font-semibold text-muted-foreground shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {iconEl}
                        </button>
                      );
                    })}
                  </div>

                  {!revealed ? (
                    <Button
                      onClick={handleCheck}
                      disabled={selectedAnswer === null}
                      className="w-full py-6 text-lg"
                      size="lg"
                      data-testid="button-qb-check"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 dark:bg-green-950/30 border border-green-200" : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200"}`}>
                        <p className="font-bold mb-1" data-testid="text-qb-result">
                          {isCorrect ? "Correct!" : "Review the rationale:"}
                        </p>
                        <p className="text-sm leading-relaxed" data-testid="text-qb-rationale">{question.rationale}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrev} className="flex-1" data-testid="button-prev">
                          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <Button onClick={handleNext} className="flex-1" data-testid="button-next">
                          Next Question <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {!revealed && (
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={handlePrev} data-testid="button-nav-prev">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button variant="ghost" onClick={handleNext} data-testid="button-nav-next">
                    Skip <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : null}

          <div className="text-center text-xs text-muted-foreground mt-8 space-y-1">
            <p>NurseNest is an independent educational platform.</p>
            <p>NurseNest is NOT affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any regulatory body.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
