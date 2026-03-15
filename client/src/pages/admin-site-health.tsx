import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { useLocation } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Shield,
  Globe,
  Search,
  FileText,
  Link2,
  Map,
  Eye,
  DollarSign,
  BarChart3,
  Filter,
  ChevronDown,
  ChevronUp,
  Layers,
  Activity,
} from "lucide-react";

type Severity = "critical" | "warning" | "info";
type IssueType = "broken-link" | "route-mismatch" | "sitemap-error" | "seo-gap" | "missing-page" | "content-guard" | "missing-content";

interface HealthIssue {
  id: string;
  type: IssueType;
  severity: Severity;
  title: string;
  detail: string;
  source: string;
  path?: string;
}

interface ScanResult {
  scannedAt: string;
  summary: {
    totalIssues: number;
    critical: number;
    warnings: number;
    info: number;
    byType: Record<string, number>;
  };
  issues: HealthIssue[];
  contentCoverage: {
    lessonsByTier: { tier: string; total: number; published: number; draft: number; empty: number }[];
    examQuestionsByTier: { tier: string; count: number }[];
    examCategoryBreakdown: { category: string; count: number }[];
    flashcardTopicCount: number;
    flashcardByTopic: { topic: string; count: number }[];
    totalContentItems: number;
    totalLessons: number;
    totalPublished: number;
    totalDraft: number;
    sitemapUrlCount: number;
  };
  contentGuardFlags: { path: string; reason: string }[];
  financialSummary: {
    totalRevenueCAD: number;
    totalExpensesCAD: number;
    profitLossCAD: number;
    breakEvenRemainingCAD: number;
    aiSpendUSD: number;
  } | null;
  scanErrors?: string[];
}

const SEVERITY_CONFIG: Record<Severity, { icon: typeof CheckCircle; color: string; bg: string; border: string; label: string }> = {
  critical: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Critical" },
  warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "Warning" },
  info: { icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "Info" },
};

const TYPE_LABELS: Record<IssueType, { label: string; icon: typeof Link2 }> = {
  "broken-link": { label: "Broken Links", icon: Link2 },
  "route-mismatch": { label: "Route Mismatches", icon: Globe },
  "sitemap-error": { label: "Sitemap Errors", icon: Map },
  "seo-gap": { label: "SEO Gaps", icon: Search },
  "missing-page": { label: "Missing Pages", icon: FileText },
  "missing-content": { label: "Missing Content", icon: FileText },
  "content-guard": { label: "Content Guard", icon: Eye },
};

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  rpn: "RPN",
  rn: "RN",
  np: "NP",
  admin: "Admin",
  allied: "Allied",
};

function fmt(n: number): string {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function AdminSiteHealth() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [typeFilter, setTypeFilter] = useState<IssueType | "all">("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    issues: true,
    coverage: true,
    guard: false,
    financial: false,
  });

  const { data, isLoading, error, refetch, isFetching } = useQuery<ScanResult>({
    queryKey: ["site-health-scan"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/site-health/scan");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || "Scan failed");
      }
      return res.json();
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredIssues = (data?.issues || []).filter(issue => {
    if (severityFilter !== "all" && issue.severity !== severityFilter) return false;
    if (typeFilter !== "all" && issue.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return issue.title.toLowerCase().includes(q) || issue.detail.toLowerCase().includes(q) || (issue.path || "").toLowerCase().includes(q);
    }
    return true;
  });

  const overallStatus = !data ? "unknown" : data.summary.critical > 0 ? "critical" : data.summary.warnings > 0 ? "warning" : "healthy";
  const statusConfig = {
    unknown: { color: "text-gray-500", bg: "bg-gray-100", label: "Not Scanned" },
    healthy: { color: "text-emerald-600", bg: "bg-emerald-100", label: "Healthy" },
    warning: { color: "text-amber-600", bg: "bg-amber-100", label: "Warnings Found" },
    critical: { color: "text-red-600", bg: "bg-red-100", label: "Issues Found" },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" data-testid="page-site-health">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")} data-testid="button-back-admin">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Admin
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">Site Health Dashboard</h1>
              <p className="text-sm text-gray-500">Broken links, SEO gaps, content integrity & financial overview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[overallStatus].bg} ${statusConfig[overallStatus].color}`} data-testid="badge-overall-status">
                {overallStatus === "healthy" && <CheckCircle className="w-4 h-4" />}
                {overallStatus === "warning" && <AlertTriangle className="w-4 h-4" />}
                {overallStatus === "critical" && <XCircle className="w-4 h-4" />}
                {statusConfig[overallStatus].label}
              </span>
            )}
            <Button size="sm" onClick={() => refetch()} disabled={isFetching} data-testid="button-run-scan">
              <RefreshCw className={`w-4 h-4 mr-1 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Scanning..." : "Run Scan"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm" data-testid="banner-error">
            {(error as Error).message}
          </div>
        )}

        {isLoading && !data && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {data?.scanErrors && data.scanErrors.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm" data-testid="banner-scan-warnings">
            <div className="flex items-center gap-2 font-medium mb-1">
              <AlertTriangle className="w-4 h-4" />
              Partial scan — some checks encountered errors:
            </div>
            <ul className="list-disc ml-6 space-y-0.5">
              {data.scanErrors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="section-summary-cards">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Critical</span>
                  </div>
                  <p className="text-3xl font-bold text-red-600" data-testid="text-critical-count">{data.summary.critical}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Warnings</span>
                  </div>
                  <p className="text-3xl font-bold text-amber-600" data-testid="text-warning-count">{data.summary.warnings}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Info</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600" data-testid="text-info-count">{data.summary.info}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>Total Issues</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900" data-testid="text-total-issues">{data.summary.totalIssues}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" data-testid="section-type-breakdown">
              {Object.entries(TYPE_LABELS).map(([type, cfg]) => {
                const count = data.summary.byType[type === "broken-link" ? "brokenLinks" : type === "route-mismatch" ? "routeMismatches" : type === "sitemap-error" ? "sitemapErrors" : type === "seo-gap" ? "seoGaps" : type === "missing-page" ? "missingPages" : type === "missing-content" ? "missingContent" : "contentGuard"] || 0;
                const Icon = cfg.icon;
                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(typeFilter === type ? "all" : type as IssueType)}
                    className={`p-3 rounded-lg border text-left transition-all ${typeFilter === type ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-gray-200 bg-white hover:border-gray-300"}`}
                    data-testid={`filter-type-${type}`}
                  >
                    <Icon className="w-4 h-4 text-gray-400 mb-1" />
                    <p className="text-lg font-bold text-gray-900">{count}</p>
                    <p className="text-[10px] text-gray-500 truncate">{cfg.label}</p>
                  </button>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("issues")}>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Issue Details ({filteredIssues.length})
                  </CardTitle>
                  {expandedSections.issues ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                {expandedSections.issues && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <Input
                      placeholder="Search issues..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-56 h-8 text-xs"
                      data-testid="input-search-issues"
                    />
                    <select
                      value={severityFilter}
                      onChange={e => setSeverityFilter(e.target.value as any)}
                      className="h-8 text-xs border rounded-md px-2"
                      data-testid="select-severity-filter"
                    >
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                    <select
                      value={typeFilter}
                      onChange={e => setTypeFilter(e.target.value as any)}
                      className="h-8 text-xs border rounded-md px-2"
                      data-testid="select-type-filter"
                    >
                      <option value="all">All Types</option>
                      {Object.entries(TYPE_LABELS).map(([t, cfg]) => (
                        <option key={t} value={t}>{cfg.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </CardHeader>
              {expandedSections.issues && (
                <CardContent>
                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-8 text-gray-400" data-testid="text-no-issues">
                      {data.summary.totalIssues === 0 ? (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                          <span className="text-emerald-600 font-medium">All checks passed! No issues found.</span>
                        </div>
                      ) : (
                        "No issues match current filters"
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {filteredIssues.map(issue => {
                        const cfg = SEVERITY_CONFIG[issue.severity];
                        const Icon = cfg.icon;
                        return (
                          <div
                            key={issue.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${cfg.bg} ${cfg.border}`}
                            data-testid={`issue-row-${issue.id}`}
                          >
                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.color}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-900">{issue.title}</span>
                                <Badge variant="outline" className="text-[9px]">{TYPE_LABELS[issue.type]?.label || issue.type}</Badge>
                                <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"} className="text-[9px]">{cfg.label}</Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">{issue.detail}</p>
                              {issue.path && (
                                <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{issue.path}</p>
                              )}
                              <p className="text-[10px] text-gray-400 mt-0.5">Source: {issue.source}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("coverage")}>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Content Coverage Report
                  </CardTitle>
                  {expandedSections.coverage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </CardHeader>
              {expandedSections.coverage && (
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-700" data-testid="text-total-content">{data.contentCoverage.totalContentItems}</p>
                      <p className="text-xs text-gray-500">Content Items</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-cyan-700" data-testid="text-total-lessons">{data.contentCoverage.totalLessons}</p>
                      <p className="text-xs text-gray-500">Lessons (table)</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-emerald-700" data-testid="text-published-content">{data.contentCoverage.totalPublished}</p>
                      <p className="text-xs text-gray-500">Published</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-amber-700" data-testid="text-draft-content">{data.contentCoverage.totalDraft}</p>
                      <p className="text-xs text-gray-500">Draft</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-700" data-testid="text-sitemap-urls">{data.contentCoverage.sitemapUrlCount}</p>
                      <p className="text-xs text-gray-500">Sitemap URLs</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Lessons by Tier</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {data.contentCoverage.lessonsByTier.map(tier => {
                        const pct = tier.total > 0 ? Math.round((tier.published / tier.total) * 100) : 0;
                        return (
                          <div key={tier.tier} className="p-3 bg-gray-50 rounded-lg" data-testid={`coverage-tier-${tier.tier}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold">{TIER_LABELS[tier.tier] || tier.tier}</span>
                              <Badge variant="secondary" className="text-[10px]">{pct}%</Badge>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="grid grid-cols-3 gap-1 text-[10px] text-gray-500">
                              <span>Total: {tier.total}</span>
                              <span className="text-emerald-600">Published: {tier.published}</span>
                              <span className="text-amber-600">Draft: {tier.draft}</span>
                            </div>
                            {tier.empty > 0 && (
                              <span className="text-[10px] text-red-500">Empty: {tier.empty}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Test Bank Coverage</h3>
                      <div className="space-y-2">
                        {data.contentCoverage.examQuestionsByTier.length === 0 ? (
                          <p className="text-xs text-gray-400">No exam questions found</p>
                        ) : (
                          data.contentCoverage.examQuestionsByTier.map(eq => (
                            <div key={eq.tier} className="flex items-center justify-between p-2 bg-gray-50 rounded" data-testid={`exam-coverage-${eq.tier}`}>
                              <span className="text-sm font-medium">{TIER_LABELS[eq.tier] || eq.tier}</span>
                              <span className="text-sm font-bold">{eq.count} questions</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Flashcard Coverage</h3>
                      <div className="p-3 bg-gray-50 rounded-lg text-center mb-2">
                        <p className="text-2xl font-bold text-indigo-700" data-testid="text-flashcard-topics">{data.contentCoverage.flashcardTopicCount}</p>
                        <p className="text-xs text-gray-500">Unique Topics Covered</p>
                      </div>
                      {data.contentCoverage.flashcardByTopic?.length > 0 && (
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {data.contentCoverage.flashcardByTopic
                            .sort((a, b) => a.count - b.count)
                            .slice(0, 10)
                            .map(ft => (
                              <div key={ft.topic} className="flex items-center justify-between p-1 text-xs">
                                <span className="text-gray-600 truncate max-w-[60%]">{ft.topic}</span>
                                <span className={`font-medium ${ft.count < 3 ? "text-red-500" : "text-gray-700"}`}>{ft.count} cards</span>
                              </div>
                            ))}
                          {data.contentCoverage.flashcardByTopic.length > 10 && (
                            <p className="text-[10px] text-gray-400 text-center">
                              Showing lowest 10 of {data.contentCoverage.flashcardByTopic.length} topics
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {data.contentGuardFlags.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("guard")}>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Content Guard Flags ({data.contentGuardFlags.length})
                    </CardTitle>
                    {expandedSections.guard ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {expandedSections.guard && (
                  <CardContent>
                    <p className="text-xs text-gray-500 mb-3">
                      These navigation links point to pages without content. They should be hidden or the content should be generated.
                    </p>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {data.contentGuardFlags.map((flag, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-amber-200" data-testid={`guard-flag-${i}`}>
                          <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 font-mono truncate">{flag.path}</p>
                            <p className="text-xs text-gray-500">{flag.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {data.financialSummary && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("financial")}>
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Revenue & Expense Overview
                    </CardTitle>
                    {expandedSections.financial ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
                {expandedSections.financial && (
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                        <p className="text-xl font-bold text-green-700" data-testid="text-health-revenue">${fmt(data.financialSummary.totalRevenueCAD)} CAD</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">Total Expenses</p>
                        <p className="text-xl font-bold text-red-700" data-testid="text-health-expenses">${fmt(data.financialSummary.totalExpensesCAD)} CAD</p>
                      </div>
                      <div className={`p-3 rounded-lg text-center ${data.financialSummary.profitLossCAD >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                        <p className="text-xs text-gray-500 mb-1">Profit/Loss</p>
                        <p className={`text-xl font-bold ${data.financialSummary.profitLossCAD >= 0 ? "text-green-700" : "text-red-700"}`} data-testid="text-health-profit">
                          {data.financialSummary.profitLossCAD >= 0 ? "+" : ""}${fmt(data.financialSummary.profitLossCAD)} CAD
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg text-center ${data.financialSummary.breakEvenRemainingCAD > 0 ? "bg-amber-50" : "bg-green-50"}`}>
                        <p className="text-xs text-gray-500 mb-1">Break-Even Remaining</p>
                        <p className={`text-xl font-bold ${data.financialSummary.breakEvenRemainingCAD > 0 ? "text-amber-700" : "text-green-700"}`} data-testid="text-health-breakeven">
                          ${fmt(data.financialSummary.breakEvenRemainingCAD)} CAD
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">AI Generation Spend: <span className="font-bold text-gray-700">${fmt(data.financialSummary.aiSpendUSD)} USD</span></p>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            <div className="text-center text-xs text-gray-400 pb-4" data-testid="text-scan-timestamp">
              Last scanned: {new Date(data.scannedAt).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
