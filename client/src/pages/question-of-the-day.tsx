import { LocaleLink } from "@/lib/LocaleLink";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { CheckCircle2, XCircle, Calendar, BookOpen, Stethoscope, Brain, ArrowRight, Mail, Trophy, Sparkles, Clock } from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

const siteUrl = "https://www.nursenest.ca";

export default function QuestionOfTheDay() {
  const { toast } = useToast();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState("");

  const { data: qotd, isLoading } = useQuery({
    queryKey: ["/api/qotd/today"],
    queryFn: async () => {
      const res = await fetch("/api/qotd/today");
      if (!res.ok) throw new Error("Failed to load question");
      return res.json();
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "qotd", tier: "general" }),
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Subscribed!", description: "You will receive daily nursing questions in your inbox." });
      setEmail("");
    },
    onError: () => {
      toast({ title: "Error", description: "Could not subscribe. Please try again.", variant: "destructive" });
    },
  });

  const handleAnswerSelect = (index: number) => {
    if (revealed) return;
    setSelectedAnswer(index);
  };

  const handleReveal = () => {
    if (selectedAnswer === null) return;
    setRevealed(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      subscribeMutation.mutate(email);
    }
  };

  const isCorrect = selectedAnswer === qotd?.correctIndex;
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": `NurseNest Question of the Day - ${dateStr}`,
    "description": "Free daily nursing practice question for RPN, RN, and NP students preparing for NCLEX and Canadian licensing exams.",
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "educationalSubject",
      "targetName": "Nursing Education"
    },
    "author": { "@type": "Organization", "name": "NurseNest", "url": siteUrl },
    "datePublished": today.toISOString().split("T")[0],
  };

  return (
    <>
      <SEO
        title="Nursing Question of the Day - Free Practice"
        description="Free daily nursing practice question with detailed rationale. Prepare for NCLEX, REX-PN, and Canadian nursing exams with expert-level clinical questions updated daily."
        canonicalPath="/question-of-the-day"
        keywords="nursing question of the day, NCLEX practice, nursing exam prep, daily nursing quiz, RPN practice, RN practice"
        structuredData={structuredData}
      />

      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <BreadcrumbNav />
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground" data-testid="text-date">{dateStr}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-qotd-title">
              Nursing Question of the Day
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Challenge yourself with a new clinical question every day. Build your exam readiness one question at a time.
            </p>
          </div>

          {isLoading ? (
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="space-y-3">
                  <div className="h-12 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ) : qotd ? (
            <>
              <Card className="mb-6 shadow-lg border-2" data-testid="card-qotd-question">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {qotd.tier && (
                      <Badge variant="secondary" className="uppercase" data-testid="badge-tier">
                        {qotd.tier === "rpn" ? "RPN/LVN" : qotd.tier === "rn" ? "RN" : "NP"}
                      </Badge>
                    )}
                    {qotd.bodySystem && (
                      <Badge variant="outline" data-testid="badge-body-system">
                        <Stethoscope className="h-3 w-3 mr-1" />
                        {qotd.bodySystem}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl leading-relaxed" data-testid="text-question">
                    {qotd.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {(qotd.options as string[])?.map((option: string, idx: number) => {
                      let borderClass = "border-border hover:border-primary/50 hover:bg-muted/50";
                      let iconEl = null;

                      if (revealed) {
                        if (idx === qotd.correctIndex) {
                          borderClass = "border-green-500 bg-green-50 dark:bg-green-950/30";
                          iconEl = <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />;
                        } else if (idx === selectedAnswer && !isCorrect) {
                          borderClass = "border-red-500 bg-red-50 dark:bg-red-950/30";
                          iconEl = <XCircle className="h-5 w-5 text-red-600 shrink-0" />;
                        }
                      } else if (idx === selectedAnswer) {
                        borderClass = "border-primary bg-primary/5";
                      }

                      return (
                        <button
                          key={idx}
                          data-testid={`button-option-${idx}`}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={revealed}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${borderClass} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span className="font-semibold text-muted-foreground shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {iconEl}
                        </button>
                      );
                    })}
                  </div>

                  {!revealed ? (
                    <Button
                      data-testid="button-check-answer"
                      onClick={handleReveal}
                      disabled={selectedAnswer === null}
                      className="w-full py-6 text-lg"
                      size="lg"
                    >
                      Check My Answer
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 dark:bg-green-950/30 border border-green-200" : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <>
                              <Trophy className="h-5 w-5 text-green-600" />
                              <span className="font-bold text-green-700 dark:text-green-400" data-testid="text-result">Correct!</span>
                            </>
                          ) : (
                            <>
                              <Brain className="h-5 w-5 text-amber-600" />
                              <span className="font-bold text-amber-700 dark:text-amber-400" data-testid="text-result">Not quite - here is why:</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed" data-testid="text-rationale">{qotd.rationale}</p>
                      </div>

                      {qotd.lessonId && (
                        <LocaleLink href={`/lessons/${qotd.lessonId}`}>
                          <Button variant="outline" className="w-full" data-testid="link-related-lesson">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Study Related Lesson
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </LocaleLink>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mb-6 bg-primary/5 border-primary/20" data-testid="card-email-capture">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <h2 className="font-bold text-lg">Get Daily Questions in Your Inbox</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Never miss a question. Subscribe for free daily nursing practice questions with detailed rationales delivered to your email.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      data-testid="input-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      data-testid="button-subscribe"
                      disabled={subscribeMutation.isPending}
                    >
                      {subscribeMutation.isPending ? "..." : "Subscribe"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center p-6" data-testid="card-cta-mock-exams">
                  <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Mock Exams</h3>
                  <p className="text-sm text-muted-foreground mb-4">Full-length timed practice exams with detailed performance reports.</p>
                  <LocaleLink href="/mock-exams">
                    <Button variant="outline" size="sm" data-testid="link-mock-exams">
                      Try a Mock Exam <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </LocaleLink>
                </Card>

                <Card className="text-center p-6" data-testid="card-cta-test-bank">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Test Bank</h3>
                  <p className="text-sm text-muted-foreground mb-4">Practice from thousands of questions with instant rationale feedback.</p>
                  <LocaleLink href="/preview/med-surg">
                    <Button variant="outline" size="sm" data-testid="link-test-bank">
                      Start Practicing <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </LocaleLink>
                </Card>

                <Card className="text-center p-6" data-testid="card-cta-lessons">
                  <Stethoscope className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Clinical Lessons</h3>
                  <p className="text-sm text-muted-foreground mb-4">In-depth pathophysiology lessons with clinical nursing actions.</p>
                  <LocaleLink href="/lessons">
                    <Button variant="outline" size="sm" data-testid="link-lessons">
                      Browse Lessons <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </LocaleLink>
                </Card>
              </div>

              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>NurseNest is an independent educational platform.</p>
                <p>NurseNest is NOT affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any regulatory body.</p>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Today's question is loading...</p>
                <p className="text-sm text-muted-foreground mt-2">Check back shortly for your daily nursing challenge.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <AdminEditButton pageName="question-of-the-day" />
      <Footer />
    </>
  );
}
