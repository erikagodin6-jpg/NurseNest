import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import {
  ArrowLeft, Trophy, Target, AlertTriangle, BarChart3, Clock,
  CheckCircle2, XCircle, ChevronDown, ChevronUp, Flag, BookOpen,
  Share2, Download, Copy
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

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function ScoreRing({ percentage, size = 120 }: { percentage: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={8} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{percentage}%</span>
      </div>
    </div>
  );
}

export default function MockExamReport() {
  const { id: attemptId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "flagged">("all");

  useEffect(() => {
    if (!attemptId) return;
    fetch(`/api/mock-exams/${attemptId}`, { headers: getAuthHeaders() })
      .then((r) => r.json())
      .then((data) => {
        setExam(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [attemptId]);

  useEffect(() => {
    if (user) {
      fetch(`/api/mock-exams/history/${user.id}`, { headers: getAuthHeaders() })
        .then((r) => r.json())
        .then((data) => setHistory(Array.isArray(data) ? data.filter((h: any) => h.status === "completed") : []))
        .catch(() => {});
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warmwhite flex items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!exam || !exam.report) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-gray-500">Exam report not found.</p>
            <LocaleLink href="/mock-exams">
              <Button variant="outline">Back to Mock Exams</Button>
            </LocaleLink>
          </div>
        </main>
      </div>
    );
  }

  const report = exam.report;
  const breakdown = report.systemBreakdown || [];
  const weakAreas = report.weakAreas || [];
  const questionReview = report.questionReview || [];
  const flaggedIds = exam.flagged || [];

  const previousExams = history
    .filter((h) => h.id !== attemptId && h.tier === exam.tier)
    .slice(0, 5);

  const filteredQuestions = questionReview.filter((q: any) => {
    if (reviewFilter === "incorrect") return !q.isCorrect;
    if (reviewFilter === "flagged") return flaggedIds.includes(q.id);
    return true;
  });

  const topSystems = [...breakdown]
    .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0))
    .slice(0, 3);

  const generateShareCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !report) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, "#0f172a");
    grad.addColorStop(1, "#1e293b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(0, 0, 1200, 8);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Inter, system-ui, sans-serif";
    ctx.fillText("NurseNest", 60, 60);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "18px Inter, system-ui, sans-serif";
    ctx.fillText("Mock Exam Results", 220, 60);

    ctx.fillStyle = "#334155";
    ctx.fillRect(60, 85, 1080, 1);

    const scoreColor = report.percentage >= 80 ? "#22c55e" : report.percentage >= 60 ? "#eab308" : "#ef4444";
    ctx.fillStyle = scoreColor;
    ctx.font = "bold 120px Inter, system-ui, sans-serif";
    ctx.fillText(`${report.percentage}%`, 60, 230);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "24px Inter, system-ui, sans-serif";
    ctx.fillText(`${(exam.tier || "").toUpperCase()} Mock Exam`, 60, 270);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "20px Inter, system-ui, sans-serif";
    ctx.fillText(`${report.score} of ${report.totalQuestions} questions correct`, 60, 310);

    const readiness = report.percentage >= 80 ? "Exam Ready" : report.percentage >= 60 ? "On Track" : "Needs Focus";
    const pillWidth = ctx.measureText(readiness).width + 40;
    ctx.fillStyle = scoreColor + "33";
    ctx.beginPath();
    ctx.roundRect(60, 330, pillWidth, 36, 18);
    ctx.fill();
    ctx.fillStyle = scoreColor;
    ctx.font = "bold 16px Inter, system-ui, sans-serif";
    ctx.fillText(readiness, 80, 354);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 16px Inter, system-ui, sans-serif";
    ctx.fillText("TOP PERFORMING SYSTEMS", 660, 140);

    topSystems.forEach((sys: any, i: number) => {
      const y = 170 + i * 70;
      const pct = sys.percentage || 0;
      const barColor = pct >= 80 ? "#22c55e" : pct >= 60 ? "#eab308" : "#ef4444";

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "18px Inter, system-ui, sans-serif";
      ctx.fillText(sys.system || "Unknown", 660, y);

      ctx.fillStyle = "#334155";
      ctx.fillRect(660, y + 8, 440, 14);
      ctx.fillStyle = barColor;
      ctx.fillRect(660, y + 8, 440 * (pct / 100), 14);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 16px Inter, system-ui, sans-serif";
      ctx.fillText(`${pct}%`, 1110, y);
    });

    if (breakdown.length > 0) {
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 14px Inter, system-ui, sans-serif";
      ctx.fillText("ALL SYSTEMS", 660, 420);

      breakdown.forEach((sys: any, i: number) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 660 + col * 260;
        const y = 445 + row * 28;
        const pct = sys.percentage || 0;
        const dotColor = pct >= 80 ? "#22c55e" : pct >= 60 ? "#eab308" : "#ef4444";

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(x, y - 4, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px Inter, system-ui, sans-serif";
        const sysName = (sys.system || "").length > 20 ? (sys.system || "").slice(0, 20) + "…" : (sys.system || "");
        ctx.fillText(`${sysName} ${pct}%`, x + 14, y);
      });
    }

    ctx.fillStyle = "#475569";
    ctx.font = "14px Inter, system-ui, sans-serif";
    ctx.fillText("nursenest.ca", 60, 600);

    ctx.fillStyle = "#64748b";
    ctx.fillText("•  " + new Date().toLocaleDateString(), 170, 600);

    ctx.fillStyle = "#7c3aed";
    ctx.font = "bold 14px Inter, system-ui, sans-serif";
    ctx.fillText("Start your free diagnostic at nursenest.ca", 800, 600);
  }, [exam, report, breakdown, topSystems]);

  useEffect(() => {
    if (report) {
      setTimeout(generateShareCard, 100);
    }
  }, [report, generateShareCard]);

  const downloadShareCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `nursenest-mock-exam-${report.percentage}pct.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast({ title: "Image downloaded!" });
  };

  const copyShareText = () => {
    const topSystemNames = topSystems.map((s: any) => s.system).join(", ");
    const text = `I scored ${report.percentage}% on my ${(exam.tier || "").toUpperCase()} mock exam on NurseNest! 🎯 Top systems: ${topSystemNames}. #NurseNest #NursingExam #NCLEX`;
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Share text copied to clipboard!" });
    }).catch(() => {
      toast({ title: "Failed to copy text", variant: "destructive" });
    });
  };

  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const topSystemNames = topSystems.map((s: any) => s.system).join(", ");
    const shareData: ShareData = {
      title: "NurseNest Mock Exam Results",
      text: `I scored ${report.percentage}% on my ${(exam.tier || "").toUpperCase()} mock exam! Top systems: ${topSystemNames}. #NurseNest`,
      url: "https://nursenest.ca",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO title="Exam Report - NurseNest" description="Detailed mock exam results and performance analysis" />
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        <LocaleLink href="/mock-exams">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Mock Exams
          </Button>
        </LocaleLink>

        <div className="text-center mb-10 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Trophy className={`w-10 h-10 ${report.percentage >= 80 ? "text-emerald-500" : report.percentage >= 60 ? "text-amber-500" : "text-red-500"}`} />
            <h1 className="text-4xl font-bold" data-testid="text-report-title">Exam Results</h1>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            <ScoreRing percentage={report.percentage} />
            <div className="space-y-2 text-left">
              <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">
                {exam.tier?.toUpperCase()} Mock Exam
              </p>
              <p className="text-2xl font-bold">
                {report.score} / {report.totalQuestions} Correct
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {exam.time_spent ? formatDuration(exam.time_spent) : "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Flag className="w-4 h-4" /> {flaggedIds.length} flagged
                </span>
              </div>
              {report.percentage >= 80 ? (
                <p className="text-emerald-600 font-medium">Strong performance. Keep refining your clinical reasoning.</p>
              ) : report.percentage >= 60 ? (
                <p className="text-amber-600 font-medium">Solid foundation. Focus on your weak areas below.</p>
              ) : (
                <p className="text-red-500 font-medium">Needs improvement. Review the weak areas and try again.</p>
              )}
            </div>
          </div>
        </div>

        {previousExams.length > 0 && (
          <Card className="border-none shadow-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" /> Score Trend ({exam.tier?.toUpperCase()})
              </h3>
              <div className="flex items-end gap-2 h-32">
                {[...previousExams].reverse().map((h, i) => {
                  const pct = h.report?.percentage || 0;
                  return (
                    <div key={h.id} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-gray-500">{pct}%</span>
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          pct >= 80 ? "bg-emerald-400" : pct >= 60 ? "bg-amber-400" : "bg-red-400"
                        }`}
                        style={{ height: `${Math.max(pct, 5)}%` }}
                      />
                      <span className="text-[10px] text-gray-400">#{previousExams.length - i}</span>
                    </div>
                  );
                })}
                <div className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-primary">{report.percentage}%</span>
                  <div
                    className="w-full rounded-t-lg bg-primary transition-all ring-2 ring-primary/30"
                    style={{ height: `${Math.max(report.percentage, 5)}%` }}
                  />
                  <span className="text-[10px] text-gray-600 font-bold">Now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-none shadow-sm mb-8" data-testid="share-card-section">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-primary" /> Share Your Score
            </h3>
            <canvas
              ref={canvasRef}
              className="w-full max-w-[600px] rounded-lg border border-gray-200 mb-4"
              style={{ aspectRatio: "1200/630" }}
              data-testid="share-card-canvas"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={downloadShareCard}
                className="gap-2"
                data-testid="button-download-share-card"
              >
                <Download className="w-4 h-4" /> Download PNG
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={copyShareText}
                className="gap-2"
                data-testid="button-copy-share-text"
              >
                <Copy className="w-4 h-4" /> Copy Share Text
              </Button>
              {"share" in navigator && (
                <Button
                  size="sm"
                  onClick={handleNativeShare}
                  className="gap-2"
                  data-testid="button-native-share"
                >
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="breakdown" className="w-full" data-testid="tabs-report">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="breakdown" className="gap-2 text-sm" data-testid="tab-breakdown">
              <BarChart3 className="w-4 h-4" /> Breakdown
            </TabsTrigger>
            <TabsTrigger value="weak" className="gap-2 text-sm" data-testid="tab-weak-areas">
              <AlertTriangle className="w-4 h-4" /> Weak Areas
            </TabsTrigger>
            <TabsTrigger value="review" className="gap-2 text-sm" data-testid="tab-question-review">
              <BookOpen className="w-4 h-4" /> Question Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Score by Body System</h3>
              {breakdown.map((sys: any) => (
                <div key={sys.system} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{sys.system}</span>
                    <span className={`font-bold ${
                      sys.percentage >= 80 ? "text-emerald-600" : sys.percentage >= 60 ? "text-amber-600" : "text-red-500"
                    }`}>
                      {sys.correct}/{sys.total} ({sys.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        sys.percentage >= 80 ? "bg-emerald-500" : sys.percentage >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${sys.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weak" className="mt-6">
            {weakAreas.length === 0 ? (
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-900">No major weak areas detected</p>
                  <p className="text-gray-500 text-sm">You scored above 60% in all body systems with enough questions.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm">Areas where you scored below 60% with 2+ questions. Focus your study here.</p>
                {weakAreas.map((wa: any) => (
                  <Card key={wa.system} className="border-none shadow-sm border-l-4 border-l-red-400">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{wa.system}</p>
                        <p className="text-sm text-gray-500">{wa.correct} of {wa.total} correct</p>
                      </div>
                      <span className="text-2xl font-bold text-red-500">{wa.score}%</span>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-none shadow-sm bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Study Tip:</strong> Review the related lessons for each weak area. Focus on understanding the underlying mechanisms rather than memorizing facts.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={reviewFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewFilter("all")}
                  data-testid="button-filter-all"
                >
                  All ({questionReview.length})
                </Button>
                <Button
                  variant={reviewFilter === "incorrect" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewFilter("incorrect")}
                  data-testid="button-filter-incorrect"
                >
                  Incorrect ({questionReview.filter((q: any) => !q.isCorrect).length})
                </Button>
                <Button
                  variant={reviewFilter === "flagged" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewFilter("flagged")}
                  data-testid="button-filter-flagged"
                >
                  Flagged ({flaggedIds.length})
                </Button>
              </div>

              <div className="space-y-3">
                {filteredQuestions.map((q: any, idx: number) => {
                  const isExpanded = expandedQ === q.id;
                  const qIndex = questionReview.indexOf(q);
                  return (
                    <Card key={q.id} className={`border-none shadow-sm overflow-hidden ${!q.isCorrect ? "border-l-4 border-l-red-400" : ""}`}>
                      <button
                        onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        data-testid={`button-expand-q-${idx}`}
                      >
                        <div className="flex items-center gap-3">
                          {q.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )}
                          <div>
                            <span className="text-sm font-medium text-gray-900 line-clamp-1">
                              Q{qIndex + 1}: {q.question}
                            </span>
                            <span className="text-xs text-gray-400 block">{q.bodySystem}</span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {isExpanded && (
                        <CardContent className="px-4 pb-4 pt-0 space-y-3 border-t border-gray-100">
                          <p className="font-medium text-gray-900 pt-3">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((opt: string, i: number) => {
                              const isCorrect = i === q.correct;
                              const isSelected = i === q.selected;
                              return (
                                <div
                                  key={i}
                                  className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
                                    isCorrect ? "bg-emerald-50 border border-emerald-200" :
                                    isSelected && !isCorrect ? "bg-red-50 border border-red-200" :
                                    "bg-gray-50"
                                  }`}
                                >
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                                    isCorrect ? "bg-emerald-500 text-white" :
                                    isSelected ? "bg-red-500 text-white" :
                                    "bg-gray-200 text-gray-600"
                                  }`}>
                                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                                     isSelected ? <XCircle className="w-3.5 h-3.5" /> :
                                     String.fromCharCode(65 + i)}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-800">
                              <strong>Rationale:</strong> {q.rationale}
                            </p>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
