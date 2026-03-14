import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, RefreshCw, Copy, Check, Database, BookOpen, FileText, Layers,
  AlertTriangle, BarChart3, PieChart, TrendingUp, Package, Stethoscope,
  Microscope, Activity, Zap, ClipboardCheck, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TierData {
  questions: number;
  flashcardsPublished: number;
  flashcardsReview: number;
  totalQuestions: number;
  draftQuestions: number;
}

interface AlliedData {
  published: number;
  other: number;
  flashcards: number;
  statuses: Record<string, number>;
}

interface AnalyticsData {
  tiers: Record<string, TierData>;
  allied: Record<string, AlliedData>;
  imaging: {
    questions: number;
    flashcards: number;
    totalQuestions: number;
    totalFlashcards: number;
    byStatus: { questions: Record<string, number>; flashcards: Record<string, number> };
  };
  generatedQuestions: number;
  contentItems: Record<string, number>;
  contentByStatus: Record<string, Record<string, number>>;
  flashcardDecks: number;
  deckFlashcards: number;
  encyclopedia: Array<{ profession: string; count: number }>;
  seoArticles: { byStatus: Record<string, number>; total: number };
  mlt: { questions: { published: number; total: number; byDiscipline: Record<string, number> }; flashcards: { published: number; total: number } };
  paramedic: { total: number; published: number };
  pharmtech: { published: number; draft: number };
  contentHealth: {
    questionsWithoutFlashcards: number;
    questionsWithoutRationale: number;
    questionsWithoutImages: number;
    draftsReadyForReview: number;
    totalDrafts: number;
  };
  pipelineOpportunity: {
    totalDrafts: number;
    draftsByStatus: Record<string, number>;
    estimatedPublishable: number;
    generatedQuestions: number;
  };
  validation: Array<{ check: string; status: string; detail: string }>;
  contentItemsByTier: Record<string, number>;
  totals: {
    questions: number;
    flashcards: number;
    lessons: number;
    blogs: number;
    decks: number;
    drafts: number;
    alliedContent: number;
    imagingContent: number;
  };
  qualityMetrics: {
    flashcardCoveragePercent: string;
    rationalePercent: string;
    publishedVsTotal: {
      questions: { published: number; total: number };
      flashcards: { published: number; needsReview: number };
    };
  };
  dataSource: string;
  dataQuality: string;
  queryErrors?: string[];
  timestamp: string;
}

interface BreakdownData {
  byExamType: Array<{ exam: string; tier: string; count: number }>;
  bySpecialty: Array<{ body_system: string; count: number }>;
  byReviewStatus: Array<{ status: string; count: number }>;
  topDecks: Array<{ title: string; tier: string; card_count: number; career_type: string }>;
}

const TIER_LABELS: Record<string, string> = {
  rpn: "RPN / LVN",
  rn: "RN",
  np: "Nurse Practitioner",
  rrt: "Respiratory Therapist",
  free: "Free Tier",
};

const TIER_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  rpn: { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500" },
  rn: { bg: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500" },
  np: { bg: "bg-purple-50", text: "text-purple-700", bar: "bg-purple-500" },
  rrt: { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500" },
  free: { bg: "bg-gray-50", text: "text-gray-700", bar: "bg-gray-400" },
};

const ALLIED_LABELS: Record<string, string> = {
  paramedic: "Paramedic",
  emergencyNursing: "Emergency Nursing",
  occupationalTherapy: "Occupational Therapy",
  criticalCare: "Critical Care Nursing",
  socialWorker: "Social Worker",
  psychotherapist: "Psychotherapist",
  addictionsCounsellor: "Addictions Counselling",
  mlt: "Medical Lab Tech",
  peds_nursing: "Pediatric Nursing",
};

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = localStorage.getItem("nursenest-user-token");
  if (token) headers["x-user-token"] = token;
  const creds = localStorage.getItem("nursenest-credentials");
  if (creds) {
    try {
      const { username, password } = JSON.parse(creds);
      headers["x-username"] = username;
      headers["x-password"] = password;
    } catch {}
  }
  return headers;
}

function DonutChart({ segments, size = 120 }: { segments: Array<{ label: string; value: number; color: string }>; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return <div className="text-sm text-slate-400">No data</div>;
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        {segments.filter(s => s.value > 0).map((seg, i) => {
          const pct = seg.value / total;
          const dashLen = circumference * pct;
          const dashOffset = -offset;
          offset += dashLen;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={16}
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" className="text-sm font-bold fill-slate-700">
          {total.toLocaleString()}
        </text>
      </svg>
      <div className="space-y-1">
        {segments.filter(s => s.value > 0).map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-slate-600">{seg.label}</span>
            <span className="font-mono font-semibold text-slate-800">{seg.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ items, maxValue }: { items: Array<{ label: string; value: number; color: string }>; maxValue?: number }) {
  const max = maxValue || Math.max(...items.map(i => i.value), 1);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-slate-600 w-24 text-right truncate flex-shrink-0">{item.label}</span>
          <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max((item.value / max) * 100, 1)}%`, backgroundColor: item.color }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-700 w-12 text-right">{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminContentAnalytics() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [breakdown, setBreakdown] = useState<BreakdownData | null>(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("summary");
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, breakdownRes] = await Promise.all([
        fetch("/api/admin/content-analytics", { headers: getAuthHeaders() }),
        fetch("/api/admin/content-analytics/breakdown", { headers: getAuthHeaders() }),
      ]);
      if (!summaryRes.ok) throw new Error(`Failed to fetch summary: ${summaryRes.status}`);
      const summaryJson = await summaryRes.json();
      setData(summaryJson);
      if (breakdownRes.ok) {
        setBreakdown(await breakdownRes.json());
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const [recalcRes, breakdownRes] = await Promise.all([
        fetch("/api/admin/content-analytics/recalculate", { method: "POST", headers: getAuthHeaders() }),
        fetch("/api/admin/content-analytics/breakdown", { headers: getAuthHeaders() }),
      ]);
      if (!recalcRes.ok) throw new Error(`Recalculate failed: ${recalcRes.status}`);
      const json = await recalcRes.json();
      setData(json.data);
      if (breakdownRes.ok) setBreakdown(await breakdownRes.json());
      const qualityNote = json.data?.dataQuality === "degraded" ? " (some queries had errors)" : "";
      toast({ title: "Content totals recalculated", description: `Updated at ${new Date(json.recalculatedAt).toLocaleString()}${qualityNote}` });
    } catch (e: any) {
      toast({ title: "Recalculate failed", description: e.message, variant: "destructive" });
    } finally {
      setRecalculating(false);
    }
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  const generateTextReport = (): string => {
    if (!data) return "";
    const lines: string[] = [];
    lines.push("=== NurseNest Content Analytics Report ===");
    lines.push(`Generated: ${new Date(data.timestamp).toLocaleString()}`);
    lines.push(`Data Source: ${data.dataSource}`);
    lines.push("");
    lines.push("GRAND TOTALS");
    lines.push(`  Total Questions: ${data.totals.questions.toLocaleString()}`);
    lines.push(`  Total Flashcards: ${data.totals.flashcards.toLocaleString()}`);
    lines.push(`  Flashcard Decks: ${data.totals.decks}`);
    lines.push(`  Blogs/Articles: ${data.totals.blogs}`);
    lines.push(`  Draft Pipeline: ${data.totals.drafts}`);
    lines.push(`  Allied Content: ${data.totals.alliedContent}`);
    lines.push(`  Imaging Content: ${data.totals.imagingContent}`);
    lines.push("");
    lines.push("--- NURSING TIERS ---");
    for (const [tier, d] of Object.entries(data.tiers)) {
      const label = TIER_LABELS[tier] || tier.toUpperCase();
      const totalFC = d.flashcardsPublished + d.flashcardsReview;
      const ratio = d.questions > 0 ? ((totalFC / d.questions) * 100).toFixed(0) : "0";
      lines.push(`  ${label}: ${d.questions}Q published / ${d.flashcardsPublished}FC published / ${ratio}% ratio`);
    }
    lines.push("");
    lines.push("--- CONTENT HEALTH ---");
    lines.push(`  Missing Rationale: ${data.contentHealth.questionsWithoutRationale}`);
    lines.push(`  Missing Images: ${data.contentHealth.questionsWithoutImages}`);
    lines.push(`  Drafts Ready: ${data.contentHealth.draftsReadyForReview}`);
    lines.push("");
    lines.push("--- QUALITY METRICS ---");
    lines.push(`  Flashcard Coverage: ${data.qualityMetrics.flashcardCoveragePercent}%`);
    lines.push(`  Rationale Coverage: ${data.qualityMetrics.rationalePercent}%`);
    if (data.validation.length > 0) {
      lines.push("");
      lines.push("--- VALIDATION FLAGS ---");
      for (const v of data.validation) {
        lines.push(`  [${v.status.toUpperCase()}] ${v.check}: ${v.detail}`);
      }
    }
    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTextReport());
    setCopied(true);
    toast({ title: "Report copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3" data-testid="loading-indicator">
          <RefreshCw className="w-8 h-8 text-slate-400 animate-spin" />
          <span className="text-slate-500">Loading content analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-red-600 font-medium" data-testid="error-message">Error: {error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={fetchData} data-testid="button-retry">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "tiers", label: "Tier Breakdown" },
    { id: "health", label: "Content Health" },
    { id: "allied", label: "Allied & Imaging" },
    { id: "pipeline", label: "Pipeline" },
    { id: "charts", label: "Charts" },
    { id: "tables", label: "Tables" },
    { id: "report", label: "Report" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")} data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-1" /> Admin
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900" data-testid="text-page-title">Content Analytics</h1>
            <Badge variant="outline" className="text-xs gap-1" data-testid="badge-data-source">
              <Database className="w-3 h-3" />
              {data.dataSource}
            </Badge>
            {data.dataQuality === "degraded" && (
              <Badge variant="outline" className="text-xs gap-1 border-amber-300 text-amber-700 bg-amber-50" data-testid="badge-data-quality">
                <AlertTriangle className="w-3 h-3" />
                Partial Data
              </Badge>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleCopy} data-testid="button-copy-report">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy Report"}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleRecalculate}
              disabled={recalculating}
              data-testid="button-recalculate"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${recalculating ? "animate-spin" : ""}`} />
              {recalculating ? "Recalculating..." : "Recalculate Content Totals"}
            </Button>
          </div>
        </div>

        <div className="text-xs text-slate-400 mb-4" data-testid="text-timestamp">
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-lg border border-slate-200 p-1 overflow-x-auto" data-testid="nav-sections">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeSection === s.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
              data-testid={`tab-${s.id}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {activeSection === "summary" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" data-testid="section-summary-cards">
              <SummaryCard icon={<Database className="w-5 h-5 text-blue-600" />} label="Total Questions" value={data.totals.questions.toLocaleString()} bg="bg-blue-50" testId="card-total-questions" />
              <SummaryCard icon={<Layers className="w-5 h-5 text-emerald-600" />} label="Total Flashcards" value={data.totals.flashcards.toLocaleString()} bg="bg-emerald-50" testId="card-total-flashcards" />
              <SummaryCard icon={<FileText className="w-5 h-5 text-purple-600" />} label="Flashcard Decks" value={data.totals.decks.toLocaleString()} bg="bg-purple-50" testId="card-total-decks" />
              <SummaryCard icon={<BookOpen className="w-5 h-5 text-amber-600" />} label="Blogs & Articles" value={data.totals.blogs.toLocaleString()} bg="bg-amber-50" testId="card-total-blogs" />
              <SummaryCard icon={<Package className="w-5 h-5 text-orange-600" />} label="Draft Pipeline" value={data.totals.drafts.toLocaleString()} bg="bg-orange-50" testId="card-total-drafts" />
              <SummaryCard icon={<Stethoscope className="w-5 h-5 text-teal-600" />} label="Allied Content" value={data.totals.alliedContent.toLocaleString()} bg="bg-teal-50" testId="card-total-allied" />
              <SummaryCard icon={<Microscope className="w-5 h-5 text-indigo-600" />} label="Imaging Content" value={data.totals.imagingContent.toLocaleString()} bg="bg-indigo-50" testId="card-total-imaging" />
              <SummaryCard icon={<BookOpen className="w-5 h-5 text-cyan-600" />} label="Generated Drafts" value={data.generatedQuestions.toLocaleString()} bg="bg-cyan-50" testId="card-generated-drafts" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card data-testid="card-quality-flashcard-coverage">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" /> Flashcard Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{data.qualityMetrics.flashcardCoveragePercent}%</div>
                  <ProgressBar value={Number(data.qualityMetrics.flashcardCoveragePercent)} color={Number(data.qualityMetrics.flashcardCoveragePercent) >= 80 ? "bg-emerald-500" : "bg-amber-500"} />
                  <p className="text-xs text-slate-500 mt-1">Questions covered by flashcards</p>
                </CardContent>
              </Card>
              <Card data-testid="card-quality-rationale-coverage">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-500" /> Rationale Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{data.qualityMetrics.rationalePercent}%</div>
                  <ProgressBar value={Number(data.qualityMetrics.rationalePercent)} color={Number(data.qualityMetrics.rationalePercent) >= 90 ? "bg-emerald-500" : "bg-amber-500"} />
                  <p className="text-xs text-slate-500 mt-1">Published questions with rationale</p>
                </CardContent>
              </Card>
              <Card data-testid="card-quality-published-ratio">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" /> Published vs Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Questions</span>
                      <span className="font-mono text-slate-800">
                        {data.qualityMetrics.publishedVsTotal.questions.published.toLocaleString()} / {data.qualityMetrics.publishedVsTotal.questions.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">FC Needs Review</span>
                      <span className="font-mono text-amber-600">
                        {data.qualityMetrics.publishedVsTotal.flashcards.needsReview.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {data.validation.length > 0 && (
              <Card className="border-amber-200 bg-amber-50/50" data-testid="card-validation">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Validation Flags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.validation.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm py-1">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-amber-800">{v.check}: </span>
                        <span className="text-amber-700">{v.detail}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === "tiers" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Question & Flashcard Counts by Tier</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(data.tiers).map(([tier, d]) => {
                const label = TIER_LABELS[tier] || tier.toUpperCase();
                const colors = TIER_COLORS[tier] || TIER_COLORS.free;
                const totalFC = d.flashcardsPublished + d.flashcardsReview;
                const ratio = d.questions > 0 ? ((totalFC / d.questions) * 100).toFixed(0) : "0";
                return (
                  <Card key={tier} className={`border ${colors.bg}`} data-testid={`card-tier-${tier}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base font-semibold ${colors.text}`}>{label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Row label="Published Questions" value={d.questions.toLocaleString()} testId={`text-questions-${tier}`} />
                      <Row label="Draft/Other Questions" value={d.draftQuestions.toLocaleString()} testId={`text-draft-questions-${tier}`} />
                      <Row label="Published Flashcards" value={d.flashcardsPublished.toLocaleString()} testId={`text-fc-published-${tier}`} />
                      <Row label="Needs Review" value={d.flashcardsReview.toLocaleString()} testId={`text-fc-review-${tier}`} />
                      <div className="pt-1 border-t border-slate-200">
                        <Row label="Q-to-FC Ratio" value={`${ratio}%`} testId={`text-ratio-${tier}`} highlight={Number(ratio) < 80} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <h2 className="text-lg font-semibold text-slate-800 mt-8">Flashcard Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card data-testid="card-deck-summary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Deck Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Row label="Total Decks" value={data.flashcardDecks.toLocaleString()} testId="text-total-decks" />
                  <Row label="Total Deck Cards" value={data.deckFlashcards.toLocaleString()} testId="text-total-deck-cards" />
                  <Row label="Bank Published" value={Object.values(data.tiers).reduce((s, t) => s + t.flashcardsPublished, 0).toLocaleString()} testId="text-bank-published" />
                  <Row label="Bank Needs Review" value={Object.values(data.tiers).reduce((s, t) => s + t.flashcardsReview, 0).toLocaleString()} testId="text-bank-review" />
                </CardContent>
              </Card>
              <Card data-testid="card-content-items-by-tier">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Content Items by Tier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(data.contentItemsByTier).map(([tier, count]) => (
                    <Row key={tier} label={TIER_LABELS[tier] || tier} value={String(count)} testId={`text-ci-tier-${tier}`} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "health" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Content Health & Audit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <HealthCard
                label="Missing Rationale"
                value={data.contentHealth.questionsWithoutRationale}
                icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
                severity={data.contentHealth.questionsWithoutRationale > 50 ? "high" : data.contentHealth.questionsWithoutRationale > 10 ? "medium" : "low"}
                description="Published questions without rationale text"
                testId="card-health-rationale"
              />
              <HealthCard
                label="Missing Images"
                value={data.contentHealth.questionsWithoutImages}
                icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
                severity={data.contentHealth.questionsWithoutImages > 100 ? "high" : data.contentHealth.questionsWithoutImages > 20 ? "medium" : "low"}
                description="Published questions without image assets"
                testId="card-health-images"
              />
              <HealthCard
                label="Drafts Ready for Review"
                value={data.contentHealth.draftsReadyForReview}
                icon={<ClipboardCheck className="w-5 h-5 text-blue-500" />}
                severity="info"
                description="Drafts awaiting editorial review"
                testId="card-health-drafts-ready"
              />
              <HealthCard
                label="Total Draft Pipeline"
                value={data.contentHealth.totalDrafts}
                icon={<Package className="w-5 h-5 text-purple-500" />}
                severity="info"
                description="All drafts across statuses"
                testId="card-health-total-drafts"
              />
              <HealthCard
                label="Flashcard Coverage Gap"
                value={data.contentHealth.questionsWithoutFlashcards}
                icon={<Layers className="w-5 h-5 text-red-500" />}
                severity={data.contentHealth.questionsWithoutFlashcards > 50 ? "high" : "medium"}
                description="Published questions in tiers with no flashcards"
                testId="card-health-fc-gap"
              />
            </div>

            {Object.keys(data.contentItems).length > 0 && (
              <>
                <h2 className="text-lg font-semibold text-slate-800">Content Items by Type</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(data.contentItems).map(([type, count]) => (
                    <Card key={type} data-testid={`card-content-${type}`}>
                      <CardContent className="pt-4">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">{type.replace(/_/g, " ")}</div>
                        <div className="text-2xl font-bold text-slate-800 mt-1">{count.toLocaleString()}</div>
                        {data.contentByStatus[type] && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {Object.entries(data.contentByStatus[type]).map(([status, sCount]) => (
                              <span key={status} className={`text-[10px] px-1.5 py-0.5 rounded ${status === "published" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                                {status}: {sCount}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeSection === "allied" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Allied Health</h2>
            {Object.keys(data.allied).length > 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-allied">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium text-slate-600">Career Type</th>
                      <th className="text-right px-4 py-2 font-medium text-slate-600">Published</th>
                      <th className="text-right px-4 py-2 font-medium text-slate-600">Flashcards</th>
                      <th className="text-right px-4 py-2 font-medium text-slate-600">Status Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.allied).map(([ct, d]) => (
                      <tr key={ct} className="border-t border-slate-100" data-testid={`row-allied-${ct}`}>
                        <td className="px-4 py-2 text-slate-800 font-medium">{ALLIED_LABELS[ct] || ct}</td>
                        <td className="px-4 py-2 text-right font-mono text-slate-700">{d.published.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right font-mono text-slate-700">{d.flashcards.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex gap-1 justify-end flex-wrap">
                            {Object.entries(d.statuses).map(([status, count]) => (
                              <span key={status} className={`text-xs px-2 py-0.5 rounded ${status === "published" || status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                                {status}: {count}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No allied health questions found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card data-testid="card-imaging">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-indigo-500" /> Diagnostic Imaging
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Row label="Published Questions" value={String(data.imaging.questions)} testId="text-imaging-questions" />
                  <Row label="Total Questions" value={String(data.imaging.totalQuestions)} testId="text-imaging-total-q" />
                  <Row label="Published Flashcards" value={String(data.imaging.flashcards)} testId="text-imaging-flashcards" />
                  <Row label="Total Flashcards" value={String(data.imaging.totalFlashcards)} testId="text-imaging-total-fc" />
                </CardContent>
              </Card>

              <Card data-testid="card-mlt">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-500" /> MLT Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Row label="Published Questions" value={String(data.mlt.questions.published)} testId="text-mlt-questions" />
                  <Row label="Total Questions" value={String(data.mlt.questions.total)} testId="text-mlt-total-q" />
                  <Row label="Published Flashcards" value={String(data.mlt.flashcards.published)} testId="text-mlt-flashcards" />
                </CardContent>
              </Card>

              <Card data-testid="card-paramedic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-500" /> Paramedic & PharmTech
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Row label="Paramedic Published" value={String(data.paramedic.published)} testId="text-paramedic-published" />
                  <Row label="Paramedic Total" value={String(data.paramedic.total)} testId="text-paramedic-total" />
                  <Row label="PharmTech Published" value={String(data.pharmtech.published)} testId="text-pharmtech-published" />
                  <Row label="PharmTech Draft" value={String(data.pharmtech.draft)} testId="text-pharmtech-draft" />
                </CardContent>
              </Card>
            </div>

            {data.encyclopedia.length > 0 && (
              <Card data-testid="card-encyclopedia">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Encyclopedia Entries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {data.encyclopedia.map((e) => (
                    <Row key={e.profession} label={ALLIED_LABELS[e.profession] || e.profession} value={String(e.count)} testId={`text-encyclopedia-${e.profession}`} />
                  ))}
                  <div className="pt-1 border-t border-slate-100">
                    <Row label="Total" value={String(data.encyclopedia.reduce((s, e) => s + e.count, 0))} testId="text-encyclopedia-total" bold />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === "pipeline" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Pipeline Opportunity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard icon={<Package className="w-5 h-5 text-purple-600" />} label="Total Drafts" value={data.pipelineOpportunity.totalDrafts.toLocaleString()} bg="bg-purple-50" testId="card-pipeline-total" />
              <SummaryCard icon={<ClipboardCheck className="w-5 h-5 text-green-600" />} label="Publishable" value={data.pipelineOpportunity.estimatedPublishable.toLocaleString()} bg="bg-green-50" testId="card-pipeline-publishable" />
              <SummaryCard icon={<BookOpen className="w-5 h-5 text-blue-600" />} label="Generated Questions" value={data.pipelineOpportunity.generatedQuestions.toLocaleString()} bg="bg-blue-50" testId="card-pipeline-generated" />
              <SummaryCard icon={<FileText className="w-5 h-5 text-teal-600" />} label="SEO Articles" value={data.seoArticles.total.toLocaleString()} bg="bg-teal-50" testId="card-pipeline-seo" />
            </div>

            {Object.keys(data.pipelineOpportunity.draftsByStatus).length > 0 && (
              <Card data-testid="card-drafts-by-status">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Draft Inventory by Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(data.pipelineOpportunity.draftsByStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 capitalize">{status.replace(/_/g, " ")}</span>
                        <Badge variant="outline" className="font-mono">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {Object.keys(data.seoArticles.byStatus).length > 0 && (
              <Card data-testid="card-seo-articles-status">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">SEO Articles by Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(data.seoArticles.byStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 capitalize">{status}</span>
                        <Badge variant="outline" className="font-mono">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === "charts" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-500" /> Distribution Charts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card data-testid="chart-tier-distribution">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Questions by Tier</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonutChart segments={Object.entries(data.tiers).map(([tier, d]) => ({
                    label: TIER_LABELS[tier] || tier,
                    value: d.questions,
                    color: tier === "rpn" ? "#3b82f6" : tier === "rn" ? "#10b981" : tier === "np" ? "#8b5cf6" : tier === "rrt" ? "#f59e0b" : "#94a3b8",
                  }))} />
                </CardContent>
              </Card>

              <Card data-testid="chart-published-vs-review">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Published vs Needs Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonutChart segments={[
                    { label: "Published Questions", value: data.qualityMetrics.publishedVsTotal.questions.published, color: "#10b981" },
                    { label: "Unpublished Questions", value: data.qualityMetrics.publishedVsTotal.questions.total - data.qualityMetrics.publishedVsTotal.questions.published, color: "#f59e0b" },
                    { label: "FC Needs Review", value: data.qualityMetrics.publishedVsTotal.flashcards.needsReview, color: "#ef4444" },
                  ]} />
                </CardContent>
              </Card>

              <Card data-testid="chart-question-vs-fc" className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Question vs Flashcard Ratio by Tier</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart items={Object.entries(data.tiers).flatMap(([tier, d]) => {
                    const colors = TIER_COLORS[tier] || TIER_COLORS.free;
                    return [
                      { label: `${(TIER_LABELS[tier] || tier)} Q`, value: d.questions, color: tier === "rpn" ? "#3b82f6" : tier === "rn" ? "#10b981" : tier === "np" ? "#8b5cf6" : "#f59e0b" },
                      { label: `${(TIER_LABELS[tier] || tier)} FC`, value: d.flashcardsPublished, color: tier === "rpn" ? "#93c5fd" : tier === "rn" ? "#6ee7b7" : tier === "np" ? "#c4b5fd" : "#fcd34d" },
                    ];
                  })} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "tables" && breakdown && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Breakdown Tables
            </h2>

            {breakdown.byReviewStatus.length > 0 && (
              <Card data-testid="table-review-status">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Questions by Review Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Status</th>
                          <th className="text-right px-3 py-2 font-medium text-slate-600">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdown.byReviewStatus.map((r, i) => (
                          <tr key={i} className="border-t border-slate-100" data-testid={`row-status-${r.status}`}>
                            <td className="px-3 py-2 capitalize">{r.status}</td>
                            <td className="px-3 py-2 text-right font-mono">{r.count.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {breakdown.bySpecialty.length > 0 && (
              <Card data-testid="table-specialty">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Top Specialties (Published Questions)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Body System / Specialty</th>
                          <th className="text-right px-3 py-2 font-medium text-slate-600">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdown.bySpecialty.map((r, i) => (
                          <tr key={i} className="border-t border-slate-100" data-testid={`row-specialty-${i}`}>
                            <td className="px-3 py-2">{r.body_system}</td>
                            <td className="px-3 py-2 text-right font-mono">{r.count.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {breakdown.topDecks.length > 0 && (
              <Card data-testid="table-top-decks">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Top Flashcard Decks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Title</th>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Tier</th>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Career</th>
                          <th className="text-right px-3 py-2 font-medium text-slate-600">Cards</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdown.topDecks.map((d, i) => (
                          <tr key={i} className="border-t border-slate-100" data-testid={`row-deck-${i}`}>
                            <td className="px-3 py-2 max-w-[200px] truncate">{d.title}</td>
                            <td className="px-3 py-2">
                              <Badge variant="outline" className="text-xs">{d.tier || "free"}</Badge>
                            </td>
                            <td className="px-3 py-2 text-xs text-slate-500">{d.career_type || "nursing"}</td>
                            <td className="px-3 py-2 text-right font-mono">{d.card_count || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {breakdown.byExamType.length > 0 && (
              <Card data-testid="table-exam-type">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700">Questions by Exam Type & Tier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Exam</th>
                          <th className="text-left px-3 py-2 font-medium text-slate-600">Tier</th>
                          <th className="text-right px-3 py-2 font-medium text-slate-600">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdown.byExamType.slice(0, 20).map((r, i) => (
                          <tr key={i} className="border-t border-slate-100" data-testid={`row-exam-${i}`}>
                            <td className="px-3 py-2">{r.exam || "—"}</td>
                            <td className="px-3 py-2">
                              <Badge variant="outline" className="text-xs">{r.tier}</Badge>
                            </td>
                            <td className="px-3 py-2 text-right font-mono">{r.count.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === "tables" && !breakdown && (
          <div className="text-center py-12 text-slate-500">
            <BarChart3 className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p>Breakdown data not available. Try refreshing.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={fetchData} data-testid="button-retry-breakdown">Retry</Button>
          </div>
        )}

        {activeSection === "report" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Plain Text Report</h2>
              <Button variant="outline" size="sm" onClick={handleCopy} data-testid="button-copy-report-inline">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre
              className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap overflow-x-auto max-h-[60vh] overflow-y-auto"
              data-testid="text-report"
            >
              {generateTextReport()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, bg, testId }: { icon: React.ReactNode; label: string; value: string; bg: string; testId: string }) {
  return (
    <Card data-testid={testId} className="overflow-hidden">
      <CardContent className="pt-4">
        <div className={`flex items-center gap-2 mb-1`}>
          <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>{icon}</div>
          <span className="text-xs text-slate-500 uppercase tracking-wider leading-tight">{label}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, testId, highlight, bold }: { label: string; value: string; testId: string; highlight?: boolean; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm" data-testid={testId}>
      <span className={`text-slate-600 ${bold ? "font-semibold" : ""}`}>{label}</span>
      <span className={`font-mono ${highlight ? "text-amber-600 font-semibold" : "text-slate-800"} ${bold ? "font-bold" : ""}`}>{value}</span>
    </div>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function HealthCard({ label, value, icon, severity, description, testId }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  severity: "high" | "medium" | "low" | "info";
  description: string;
  testId: string;
}) {
  const borderColor = severity === "high" ? "border-red-200" : severity === "medium" ? "border-amber-200" : severity === "info" ? "border-blue-200" : "border-green-200";
  const bgColor = severity === "high" ? "bg-red-50/50" : severity === "medium" ? "bg-amber-50/50" : severity === "info" ? "bg-blue-50/50" : "bg-green-50/50";
  const badgeColor = severity === "high" ? "bg-red-100 text-red-700" : severity === "medium" ? "bg-amber-100 text-amber-700" : severity === "info" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700";

  return (
    <Card className={`${borderColor} ${bgColor}`} data-testid={testId}>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>{severity}</span>
        </div>
        <div className="text-3xl font-bold text-slate-800 mt-2">{value.toLocaleString()}</div>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
