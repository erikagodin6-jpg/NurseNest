import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, RefreshCw, Shield, AlertTriangle, CheckCircle, XCircle,
  Search, Wrench, Play, BarChart3, Clock, Eye, ThumbsUp, ThumbsDown,
  Ban, RotateCcw, ChevronDown, ChevronUp, Activity, TrendingUp,
  FileWarning, BookOpen, Image, Link2, FileText, Layers, Zap,
  ClipboardCheck, Database, Target, AlertOctagon, Sparkles,
} from "lucide-react";

type TabId = "overview" | "gaps" | "actions" | "review" | "tier-health" | "audit-log" | "analytics";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "gaps", label: "Gap Detection", icon: AlertTriangle },
  { id: "actions", label: "Actions", icon: Wrench },
  { id: "review", label: "Review Queue", icon: Eye },
  { id: "tier-health", label: "Tier Health", icon: Layers },
  { id: "audit-log", label: "Audit Log", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  info: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const GAP_TYPES = [
  { key: "missing_rationales", label: "Missing Rationales", icon: FileWarning, description: "Questions without explanations" },
  { key: "missing_flashcards", label: "Missing Flashcards", icon: BookOpen, description: "Topics without flashcard coverage" },
  { key: "missing_metadata", label: "Missing Metadata", icon: FileText, description: "Content missing required metadata fields" },
  { key: "orphaned_flashcards", label: "Orphaned Flashcards", icon: Link2, description: "Flashcards not linked to any deck or topic" },
  { key: "broken_publishing_sync", label: "Broken Publishing Sync", icon: RefreshCw, description: "Content out of sync between draft and published" },
  { key: "broken_images", label: "Broken Images", icon: Image, description: "Content referencing missing or broken images" },
  { key: "thin_content", label: "Thin Content", icon: FileText, description: "Content below minimum quality thresholds" },
  { key: "seo_gaps", label: "SEO Gaps", icon: Target, description: "Pages missing SEO metadata or structured data" },
  { key: "duplicate_risk", label: "Duplicate Risk", icon: Layers, description: "Content flagged as potentially duplicated" },
  { key: "missing_medical_review", label: "Missing Medical Review", icon: Shield, description: "Clinical content not yet medically reviewed" },
  { key: "translation_gaps", label: "Translation Gaps", icon: FileText, description: "Content missing translations for supported locales" },
];

function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_COLORS[severity] || SEVERITY_COLORS.info}`} data-testid={`badge-severity-${severity}`}>
      {severity === "critical" && <XCircle className="w-3 h-3" />}
      {severity === "high" && <AlertOctagon className="w-3 h-3" />}
      {severity === "medium" && <AlertTriangle className="w-3 h-3" />}
      {severity === "low" && <CheckCircle className="w-3 h-3" />}
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

function HealthScoreBar({ score, label }: { score: number; label?: string }) {
  const color = score >= 90 ? "bg-emerald-500" : score >= 70 ? "bg-yellow-500" : score >= 50 ? "bg-orange-500" : "bg-red-500";
  const textColor = score >= 90 ? "text-emerald-700" : score >= 70 ? "text-yellow-700" : score >= 50 ? "text-orange-700" : "text-red-700";
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-gray-500 w-16 text-right truncate">{label}</span>}
      <div className="flex-1 bg-gray-100 rounded-full h-2 min-w-[60px]">
        <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className={`text-xs font-semibold w-10 text-right ${textColor}`} data-testid={`text-health-score-${label?.toLowerCase().replace(/\s+/g, "-") || "value"}`}>{score}%</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtitle, color = "text-blue-500", bgColor = "bg-blue-50", testId }: {
  icon: any; label: string; value: string | number; subtitle?: string; color?: string; bgColor?: string; testId: string;
}) {
  return (
    <Card className="border-0 shadow-sm" data-testid={testId}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{typeof value === "number" ? value.toLocaleString() : value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniChart({ data, height = 40, color = "#6366f1" }: { data: number[]; height?: number; color?: string }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const width = 200;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * (height - 4)}`).join(" ");
  return (
    <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
      <polyline fill={`${color}20`} stroke="none" points={`0,${height} ${points} ${width},${height}`} />
    </svg>
  );
}

function OverviewPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ["content-integrity-overview"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-integrity/dashboard/overview");
      if (!res.ok) throw new Error("Failed to load overview");
      return res.json();
    },
    staleTime: 60000,
    retry: false,
  });

  const overview = data || {
    totalScanned: 0, totalIssues: 0, criticalIssues: 0, highIssues: 0, mediumIssues: 0, lowIssues: 0,
    autoFixable: 0, manualReview: 0, repairedToday: 0, remainingGaps: 0,
    tierHealth: {} as Record<string, number>,
    contentTypeHealth: {} as Record<string, number>,
    lastScanAt: null as string | null,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="loading-overview">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-gray-400" />
        <span className="text-gray-500">Loading overview...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" data-testid="section-overview-stats">
        <StatCard icon={Database} label="Total Scanned" value={overview.totalScanned} testId="card-total-scanned" color="text-blue-600" bgColor="bg-blue-50" />
        <StatCard icon={AlertTriangle} label="Total Issues" value={overview.totalIssues} testId="card-total-issues" color="text-orange-600" bgColor="bg-orange-50" />
        <StatCard icon={XCircle} label="Critical" value={overview.criticalIssues} subtitle={`${overview.highIssues} high`} testId="card-critical-issues" color="text-red-600" bgColor="bg-red-50" />
        <StatCard icon={Wrench} label="Auto-Fixable" value={overview.autoFixable} testId="card-auto-fixable" color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatCard icon={Eye} label="Manual Review" value={overview.manualReview} testId="card-manual-review" color="text-purple-600" bgColor="bg-purple-50" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={CheckCircle} label="Repaired Today" value={overview.repairedToday} testId="card-repaired-today" color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatCard icon={Target} label="Remaining Gaps" value={overview.remainingGaps} testId="card-remaining-gaps" color="text-amber-600" bgColor="bg-amber-50" />
        <StatCard icon={AlertOctagon} label="Medium Issues" value={overview.mediumIssues} testId="card-medium-issues" color="text-yellow-600" bgColor="bg-yellow-50" />
        <StatCard icon={Activity} label="Low Issues" value={overview.lowIssues} testId="card-low-issues" color="text-blue-600" bgColor="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm" data-testid="card-tier-health-scores">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" /> Per-Tier Health Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(overview.tierHealth).length > 0 ? (
                Object.entries(overview.tierHealth).map(([tier, score]) => (
                  <HealthScoreBar key={tier} label={tier.toUpperCase()} score={score as number} />
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No tier health data available. Run a scan to populate.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm" data-testid="card-content-type-health">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> Per-Content Type Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(overview.contentTypeHealth).length > 0 ? (
                Object.entries(overview.contentTypeHealth).map(([type, score]) => (
                  <HealthScoreBar key={type} label={type} score={score as number} />
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No content type data available. Run a scan to populate.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {overview.lastScanAt && (
        <p className="text-xs text-gray-400 text-right">
          Last scan: {new Date(overview.lastScanAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

function GapDetectionPanel() {
  const [selectedGap, setSelectedGap] = useState<string>(GAP_TYPES[0].key);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"severity" | "title">("severity");

  const { data: gapData, isLoading } = useQuery({
    queryKey: ["content-integrity-gaps", selectedGap],
    queryFn: async () => {
      const res = await adminFetch(`/api/admin/content-integrity/dashboard/gaps?type=${selectedGap}`);
      if (!res.ok) throw new Error("Failed to load gap data");
      return res.json();
    },
    staleTime: 60000,
    retry: false,
  });

  const items: any[] = gapData?.items || [];
  const filteredItems = items
    .filter(item => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return item.title?.toLowerCase().includes(term) || item.description?.toLowerCase().includes(term);
    })
    .sort((a, b) => {
      if (sortBy === "severity") {
        const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
        return (order[a.severity as keyof typeof order] ?? 5) - (order[b.severity as keyof typeof order] ?? 5);
      }
      return (a.title || "").localeCompare(b.title || "");
    });

  const currentGap = GAP_TYPES.find(g => g.key === selectedGap)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5 bg-white rounded-lg border p-1.5 overflow-x-auto" data-testid="nav-gap-types">
        {GAP_TYPES.map(gap => {
          const GapIcon = gap.icon;
          return (
            <button
              key={gap.key}
              onClick={() => setSelectedGap(gap.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                selectedGap === gap.key ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
              data-testid={`button-gap-${gap.key}`}
            >
              <GapIcon className="w-3.5 h-3.5" />
              {gap.label}
            </button>
          );
        })}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <currentGap.icon className="w-5 h-5 text-gray-600" />
                {currentGap.label}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">{currentGap.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="h-8 text-xs pl-7 w-48"
                  data-testid="input-gap-search"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setSortBy(sortBy === "severity" ? "title" : "severity")}
                data-testid="button-gap-sort"
              >
                Sort: {sortBy === "severity" ? "Severity" : "Title"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-5 h-5 animate-spin mr-2 text-gray-400" />
              <span className="text-gray-500 text-sm">Loading gap data...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400" data-testid="text-no-gaps">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              <p className="font-medium text-gray-600">No gaps detected</p>
              <p className="text-sm">All content looks good for this category</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid={`table-gaps-${selectedGap}`}>
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 px-2 text-xs font-medium text-gray-500">Title</th>
                    <th className="py-2 px-2 text-xs font-medium text-gray-500">Content Type</th>
                    <th className="py-2 px-2 text-xs font-medium text-gray-500">Tier</th>
                    <th className="py-2 px-2 text-xs font-medium text-gray-500">Severity</th>
                    <th className="py-2 px-2 text-xs font-medium text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.slice(0, 100).map((item: any, idx: number) => (
                    <tr key={item.id || idx} className="border-b hover:bg-gray-50/50" data-testid={`row-gap-${item.id || idx}`}>
                      <td className="py-2 px-2 font-medium text-gray-900 max-w-[200px] truncate">{item.title || "Untitled"}</td>
                      <td className="py-2 px-2 text-gray-600">{item.contentType || "—"}</td>
                      <td className="py-2 px-2">
                        <Badge variant="outline" className="text-[10px]">{(item.tier || "—").toUpperCase()}</Badge>
                      </td>
                      <td className="py-2 px-2"><SeverityBadge severity={item.severity || "info"} /></td>
                      <td className="py-2 px-2 text-xs text-gray-500 max-w-[200px] truncate">{item.description || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredItems.length > 100 && (
                <p className="text-center text-xs text-gray-400 py-2">Showing first 100 of {filteredItems.length} items</p>
              )}
            </div>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span data-testid="text-gap-total">Total: {gapData?.totalCount ?? items.length} items</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionControlsPanel() {
  const queryClient = useQueryClient();
  const [actionStates, setActionStates] = useState<Record<string, "idle" | "queued" | "processing" | "completed" | "failed">>({});

  const ACTIONS = [
    { key: "scan", label: "Scan Now", icon: RefreshCw, description: "Run a full content integrity scan", endpoint: "/api/admin/content-integrity/scan", color: "bg-blue-600 hover:bg-blue-700" },
    { key: "repair", label: "Repair Auto-Fixable Issues", icon: Wrench, description: "Automatically fix all auto-fixable issues", endpoint: "/api/admin/content-integrity/repair-auto", color: "bg-emerald-600 hover:bg-emerald-700" },
    { key: "rebuild", label: "Rebuild Analytics", icon: BarChart3, description: "Recalculate all analytics and health scores", endpoint: "/api/admin/content-integrity/rebuild-analytics", color: "bg-purple-600 hover:bg-purple-700" },
    { key: "sync", label: "Re-sync Published Content", icon: RefreshCw, description: "Synchronize draft and published content states", endpoint: "/api/admin/content-integrity/resync-published", color: "bg-amber-600 hover:bg-amber-700" },
    { key: "flashcards", label: "Generate Missing Flashcards", icon: BookOpen, description: "AI-generate flashcards for uncovered topics", endpoint: "/api/admin/content-integrity/generate-flashcards", color: "bg-indigo-600 hover:bg-indigo-700" },
    { key: "rationales", label: "Generate Missing Rationales", icon: FileWarning, description: "AI-generate rationales for questions missing them", endpoint: "/api/admin/content-integrity/generate-rationales", color: "bg-teal-600 hover:bg-teal-700" },
    { key: "recalculate", label: "Recalculate Tier Totals", icon: Layers, description: "Recount all tier-level statistics", endpoint: "/api/admin/content-integrity/recalculate-tiers", color: "bg-orange-600 hover:bg-orange-700" },
    { key: "push-live", label: "Push Valid Repairs Live", icon: Zap, description: "Publish all validated repairs to production", endpoint: "/api/admin/content-integrity/push-repairs-live", color: "bg-rose-600 hover:bg-rose-700" },
  ];

  const triggerAction = async (action: typeof ACTIONS[0]) => {
    setActionStates(prev => ({ ...prev, [action.key]: "queued" }));
    try {
      setActionStates(prev => ({ ...prev, [action.key]: "processing" }));
      const res = await adminFetch(action.endpoint, { method: "POST" });
      if (!res.ok) throw new Error("Action failed");
      setActionStates(prev => ({ ...prev, [action.key]: "completed" }));
      queryClient.invalidateQueries({ queryKey: ["content-integrity-overview"] });
      queryClient.invalidateQueries({ queryKey: ["content-integrity-gaps"] });
      setTimeout(() => setActionStates(prev => ({ ...prev, [action.key]: "idle" })), 5000);
    } catch {
      setActionStates(prev => ({ ...prev, [action.key]: "failed" }));
      setTimeout(() => setActionStates(prev => ({ ...prev, [action.key]: "idle" })), 5000);
    }
  };

  const getStatusIndicator = (state: string) => {
    switch (state) {
      case "queued": return <span className="flex items-center gap-1 text-xs text-yellow-600"><Clock className="w-3 h-3" /> Queued</span>;
      case "processing": return <span className="flex items-center gap-1 text-xs text-blue-600"><RefreshCw className="w-3 h-3 animate-spin" /> Processing</span>;
      case "completed": return <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case "failed": return <span className="flex items-center gap-1 text-xs text-red-600"><XCircle className="w-3 h-3" /> Failed</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-4" data-testid="section-action-controls">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACTIONS.map(action => {
          const ActionIcon = action.icon;
          const state = actionStates[action.key] || "idle";
          const isActive = state === "queued" || state === "processing";
          return (
            <Card key={action.key} className="border-0 shadow-sm" data-testid={`card-action-${action.key}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <ActionIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-900">{action.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{action.description}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className={`text-xs text-white ${action.color}`}
                        onClick={() => triggerAction(action)}
                        disabled={isActive}
                        data-testid={`button-action-${action.key}`}
                      >
                        {isActive ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                        {isActive ? "Running..." : "Run"}
                      </Button>
                      {getStatusIndicator(state)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ManualReviewQueue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["content-integrity-review-queue"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-integrity/dashboard/review-queue");
      if (!res.ok) throw new Error("Failed to load review queue");
      return res.json();
    },
    staleTime: 30000,
    retry: false,
  });

  const reviewAction = useMutation({
    mutationFn: async ({ itemId, action }: { itemId: string; action: "approve" | "reject" | "exclude" }) => {
      const res = await adminFetch(`/api/admin/content-integrity/review/${itemId}`, {
        method: "POST",
        body: { action },
      });
      if (!res.ok) throw new Error("Review action failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-integrity-review-queue"] });
    },
  });

  const items: any[] = data?.items || [];
  const filtered = items.filter(item => {
    if (filterType !== "all" && item.contentType !== filterType) return false;
    if (filterSeverity !== "all" && item.severity !== filterSeverity) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return item.title?.toLowerCase().includes(term) || item.issueType?.toLowerCase().includes(term);
    }
    return true;
  });

  const contentTypes = [...new Set(items.map(i => i.contentType))].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2" data-testid="review-queue-filters">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder="Search review items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-8 text-xs pl-7"
            data-testid="input-review-search"
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="h-8 text-xs border rounded-md px-2 bg-white"
          data-testid="select-review-type"
        >
          <option value="all">All Types</option>
          {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={filterSeverity}
          onChange={e => setFilterSeverity(e.target.value)}
          className="h-8 text-xs border rounded-md px-2 bg-white"
          data-testid="select-review-severity"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-5 h-5 animate-spin mr-2 text-gray-400" />
              <span className="text-gray-500 text-sm">Loading review queue...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-400" data-testid="text-no-review-items">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              <p className="font-medium text-gray-600">Review queue is empty</p>
              <p className="text-sm">No items require manual review</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-review-queue">
                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Content Type</th>
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Title / Preview</th>
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Issue Type</th>
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Severity</th>
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500">AI Suggested Fix</th>
                    <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 50).map((item: any, idx: number) => (
                    <tr key={item.id || idx} className="border-b hover:bg-gray-50/50" data-testid={`row-review-${item.id || idx}`}>
                      <td className="py-2.5 px-3">
                        <Badge variant="outline" className="text-[10px]">{item.contentType || "—"}</Badge>
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px]">
                        <p className="font-medium text-gray-900 truncate text-xs">{item.title || "Untitled"}</p>
                        {item.preview && <p className="text-[10px] text-gray-400 truncate mt-0.5">{item.preview}</p>}
                      </td>
                      <td className="py-2.5 px-3 text-xs text-gray-600">{item.issueType || "—"}</td>
                      <td className="py-2.5 px-3"><SeverityBadge severity={item.severity || "info"} /></td>
                      <td className="py-2.5 px-3 max-w-[200px]">
                        {item.suggestedFix ? (
                          <p className="text-[10px] text-gray-500 truncate italic">"{item.suggestedFix}"</p>
                        ) : (
                          <span className="text-[10px] text-gray-400">No suggestion</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1 justify-end">
                          {item.editorUrl && (
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" asChild data-testid={`button-edit-${item.id}`}>
                              <a href={item.editorUrl} target="_blank" rel="noopener noreferrer"><FileText className="w-3.5 h-3.5" /></a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-emerald-600 hover:text-emerald-700"
                            onClick={() => item.id && reviewAction.mutate({ itemId: item.id, action: "approve" })}
                            disabled={reviewAction.isPending || !item.id}
                            data-testid={`button-approve-${item.id || idx}`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                            onClick={() => item.id && reviewAction.mutate({ itemId: item.id, action: "reject" })}
                            disabled={reviewAction.isPending || !item.id}
                            data-testid={`button-reject-${item.id || idx}`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                            onClick={() => item.id && reviewAction.mutate({ itemId: item.id, action: "exclude" })}
                            disabled={reviewAction.isPending || !item.id}
                            data-testid={`button-exclude-${item.id || idx}`}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TierHealthTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["content-integrity-tier-health"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-integrity/dashboard/tier-health");
      if (!res.ok) throw new Error("Failed to load tier health");
      return res.json();
    },
    staleTime: 60000,
    retry: false,
  });

  const tiers: any[] = data?.tiers || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-gray-400" />
        <span className="text-gray-500 text-sm">Loading tier health...</span>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" /> Tier Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tiers.length === 0 ? (
          <div className="text-center py-8 text-gray-400" data-testid="text-no-tier-data">
            <Layers className="w-10 h-10 mx-auto mb-2" />
            <p className="font-medium text-gray-600">No tier health data available</p>
            <p className="text-sm">Run a scan to populate tier statistics</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="table-tier-health">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Tier</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Published Q's</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Published FC's</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Q:FC Ratio</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Needs Review</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Missing Rationale</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Missing Metadata</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500 text-right">Sync Issues</th>
                  <th className="py-2.5 px-3 text-xs font-medium text-gray-500">Health Score</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier: any) => {
                  const scoreColor = tier.healthScore >= 90 ? "text-emerald-600" : tier.healthScore >= 70 ? "text-yellow-600" : "text-red-600";
                  return (
                    <tr key={tier.tier} className="border-b hover:bg-gray-50/50" data-testid={`row-tier-${tier.tier}`}>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{(tier.tier || "").toUpperCase()}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{(tier.publishedQuestions ?? 0).toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{(tier.publishedFlashcards ?? 0).toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{tier.qfcRatio ?? "—"}</td>
                      <td className="py-2.5 px-3 text-right">
                        {(tier.needsReview ?? 0) > 0 ? (
                          <span className="text-amber-600 font-medium">{tier.needsReview}</span>
                        ) : (
                          <span className="text-emerald-600">0</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {(tier.missingRationale ?? 0) > 0 ? (
                          <span className="text-red-600 font-medium">{tier.missingRationale}</span>
                        ) : (
                          <span className="text-emerald-600">0</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {(tier.missingMetadata ?? 0) > 0 ? (
                          <span className="text-orange-600 font-medium">{tier.missingMetadata}</span>
                        ) : (
                          <span className="text-emerald-600">0</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {(tier.syncIssues ?? 0) > 0 ? (
                          <span className="text-red-600 font-medium">{tier.syncIssues}</span>
                        ) : (
                          <span className="text-emerald-600">0</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${tier.healthScore >= 90 ? "bg-emerald-500" : tier.healthScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${tier.healthScore}%` }} />
                          </div>
                          <span className={`text-xs font-bold ${scoreColor}`}>{tier.healthScore}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AuditLogPanel() {
  const [page, setPage] = useState(1);
  const [filterProcess, setFilterProcess] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["content-integrity-audit-log", page, filterProcess],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: "25" });
      if (filterProcess !== "all") params.set("process", filterProcess);
      const res = await adminFetch(`/api/admin/content-integrity/dashboard/audit-log?${params}`);
      if (!res.ok) throw new Error("Failed to load audit log");
      return res.json();
    },
    staleTime: 30000,
    retry: false,
  });

  const rollbackMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const res = await adminFetch(`/api/admin/content-integrity/audit-log/${entryId}/rollback`, { method: "POST" });
      if (!res.ok) throw new Error("Rollback failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-integrity-audit-log"] });
    },
  });

  const entries: any[] = data?.entries || [];
  const totalPages = data?.totalPages || 1;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2" data-testid="audit-log-filters">
        <select
          value={filterProcess}
          onChange={e => { setFilterProcess(e.target.value); setPage(1); }}
          className="h-8 text-xs border rounded-md px-2 bg-white"
          data-testid="select-audit-process"
        >
          <option value="all">All Processes</option>
          <option value="auto-repair">Auto Repair</option>
          <option value="manual-review">Manual Review</option>
          <option value="scan">Scan</option>
          <option value="sync">Sync</option>
          <option value="generation">Generation</option>
        </select>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-5 h-5 animate-spin mr-2 text-gray-400" />
              <span className="text-gray-500 text-sm">Loading audit log...</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-gray-400" data-testid="text-no-audit-entries">
              <Clock className="w-10 h-10 mx-auto mb-2" />
              <p className="font-medium text-gray-600">No audit entries</p>
              <p className="text-sm">Repairs and actions will be logged here</p>
            </div>
          ) : (
            <div className="divide-y" data-testid="list-audit-entries">
              {entries.map((entry: any, idx: number) => (
                <div key={entry.id || idx} className="p-3 hover:bg-gray-50/50" data-testid={`audit-entry-${entry.id || idx}`}>
                  <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{entry.action || "Unknown action"}</span>
                        <Badge variant="outline" className="text-[10px]">{entry.process || "—"}</Badge>
                        {entry.autoPublished && (
                          <Badge className="text-[10px] bg-emerald-100 text-emerald-800">Auto-published</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                        <span>{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : "—"}</span>
                        <span>{entry.contentType || ""}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {entry.rollbackAvailable && entry.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-amber-600 hover:text-amber-700"
                          onClick={(e) => { e.stopPropagation(); rollbackMutation.mutate(entry.id); }}
                          disabled={rollbackMutation.isPending}
                          data-testid={`button-rollback-${entry.id || idx}`}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" /> Rollback
                        </Button>
                      )}
                      {expandedId === entry.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>
                  {expandedId === entry.id && (
                    <div className="mt-3 ml-4 space-y-2 text-xs">
                      {entry.beforeSummary && (
                        <div className="p-2 bg-red-50 rounded border border-red-100">
                          <span className="font-medium text-red-700">Before:</span>
                          <p className="text-red-600 mt-0.5">{entry.beforeSummary}</p>
                        </div>
                      )}
                      {entry.afterSummary && (
                        <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                          <span className="font-medium text-emerald-700">After:</span>
                          <p className="text-emerald-600 mt-0.5">{entry.afterSummary}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2" data-testid="audit-pagination">
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page <= 1} onClick={() => setPage(p => p - 1)} data-testid="button-prev-page">
            Previous
          </Button>
          <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} data-testid="button-next-page">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function AnalyticsPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ["content-integrity-analytics"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-integrity/dashboard/analytics");
      if (!res.ok) throw new Error("Failed to load analytics");
      return res.json();
    },
    staleTime: 60000,
    retry: false,
  });

  const analytics = data || {
    healthTrend: [] as number[],
    repairThroughput: [] as number[],
    issueRecurrence: [] as number[],
    tierCompletion: {} as Record<string, number>,
    flashcardCoverage: 0,
    rationaleCoverage: 0,
    publishingSyncAccuracy: 0,
    avgDetectionToRepairHours: 0,
    autoFixedPercent: 0,
    manuallyReviewedPercent: 0,
    recommendedFixes: [] as any[],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-5 h-5 animate-spin mr-2 text-gray-400" />
        <span className="text-gray-500 text-sm">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm" data-testid="card-health-trend">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Content Health Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.healthTrend.length > 1 ? (
              <MiniChart data={analytics.healthTrend} color="#3b82f6" height={60} />
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">Insufficient data for trend chart</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm" data-testid="card-repair-throughput">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-500" /> Repair Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.repairThroughput.length > 1 ? (
              <MiniChart data={analytics.repairThroughput} color="#10b981" height={60} />
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">Insufficient data for throughput chart</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm" data-testid="card-issue-recurrence">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Issue Recurrence
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.issueRecurrence.length > 1 ? (
              <MiniChart data={analytics.issueRecurrence} color="#f59e0b" height={60} />
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">Insufficient data for recurrence chart</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="border-0 shadow-sm" data-testid="card-flashcard-coverage-pct">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{analytics.flashcardCoverage}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Flashcard Coverage</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm" data-testid="card-rationale-coverage-pct">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{analytics.rationaleCoverage}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Rationale Coverage</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm" data-testid="card-sync-accuracy">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{analytics.publishingSyncAccuracy}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Sync Accuracy</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm" data-testid="card-detection-repair-time">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{analytics.avgDetectionToRepairHours}h</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Avg Detection→Repair</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm" data-testid="card-auto-fixed-pct">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">{analytics.autoFixedPercent}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Auto-Fixed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm" data-testid="card-manually-reviewed-pct">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">{analytics.manuallyReviewedPercent}%</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Manually Reviewed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm" data-testid="card-tier-completion">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" /> Tier Completion %
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(analytics.tierCompletion).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(analytics.tierCompletion).map(([tier, pct]) => (
                  <HealthScoreBar key={tier} label={tier.toUpperCase()} score={pct as number} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No tier completion data available</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm" data-testid="card-recommended-fixes">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Recommended Next Fixes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.recommendedFixes.length > 0 ? (
              <div className="space-y-2">
                {analytics.recommendedFixes.slice(0, 10).map((fix: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50" data-testid={`recommended-fix-${idx}`}>
                    <span className="text-xs font-bold text-gray-400 w-5 text-right mt-0.5">{idx + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900">{fix.title || "Fix needed"}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <SeverityBadge severity={fix.severity || "medium"} />
                        <span className="text-[10px] text-gray-500">Impact: {fix.impact || "—"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No recommended fixes at this time</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminContentIntegrity() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const queryClient = useQueryClient();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")} data-testid="button-back-admin">
              <ArrowLeft className="w-4 h-4 mr-1" /> Admin
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2" data-testid="text-page-title">
                <Shield className="w-6 h-6 text-indigo-600" />
                Content Integrity Engine
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Monitor content quality, trigger repairs, and track health trends</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["content-integrity-overview"] });
              queryClient.invalidateQueries({ queryKey: ["content-integrity-gaps"] });
              queryClient.invalidateQueries({ queryKey: ["content-integrity-review-queue"] });
              queryClient.invalidateQueries({ queryKey: ["content-integrity-tier-health"] });
              queryClient.invalidateQueries({ queryKey: ["content-integrity-audit-log"] });
              queryClient.invalidateQueries({ queryKey: ["content-integrity-analytics"] });
            }}
            data-testid="button-refresh-all"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh All
          </Button>
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto" data-testid="nav-integrity-tabs">
          {TABS.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "overview" && <OverviewPanel />}
        {activeTab === "gaps" && <GapDetectionPanel />}
        {activeTab === "actions" && <ActionControlsPanel />}
        {activeTab === "review" && <ManualReviewQueue />}
        {activeTab === "tier-health" && <TierHealthTable />}
        {activeTab === "audit-log" && <AuditLogPanel />}
        {activeTab === "analytics" && <AnalyticsPanel />}
      </div>
    </div>
  );
}
