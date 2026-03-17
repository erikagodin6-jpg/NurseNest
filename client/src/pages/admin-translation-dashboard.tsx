import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { adminFetch } from "@/lib/admin-fetch";
import {
  Globe, AlertTriangle, CheckCircle2, Languages, Search,
  RefreshCw, Download, Eye, ChevronDown, ChevronUp,
  Filter, BarChart3, Play, FileText, Shield, XCircle,
  ArrowLeft, X, MapPin, ExternalLink, BookOpen, Loader2
} from "lucide-react";

const LOCALES = [
  { code: "fr", name: "French", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { code: "es", name: "Spanish", flag: "\ud83c\uddea\ud83c\uddf8" },
  { code: "fil", name: "Filipino", flag: "\ud83c\uddf5\ud83c\udded" },
  { code: "hi", name: "Hindi", flag: "\ud83c\uddee\ud83c\uddf3" },
  { code: "zh", name: "Chinese", flag: "\ud83c\udde8\ud83c\uddf3" },
  { code: "ar", name: "Arabic", flag: "\ud83c\uddf8\ud83c\udde6" },
  { code: "ko", name: "Korean", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { code: "pt", name: "Portuguese", flag: "\ud83c\udde7\ud83c\uddf7" },
  { code: "pa", name: "Punjabi", flag: "\ud83c\udde8\ud83c\udde6" },
  { code: "vi", name: "Vietnamese", flag: "\ud83c\uddfb\ud83c\uddf3" },
  { code: "ht", name: "Haitian Creole", flag: "\ud83c\udded\ud83c\uddf9" },
  { code: "ur", name: "Urdu", flag: "\ud83c\uddf5\ud83c\uddf0" },
  { code: "ja", name: "Japanese", flag: "\ud83c\uddef\ud83c\uddf5" },
  { code: "fa", name: "Farsi", flag: "\ud83c\uddee\ud83c\uddf7" },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  fully_translated: { label: "Fully Translated", color: "bg-green-100 text-green-700 border-green-200" },
  ready_for_indexing: { label: "Ready for Indexing", color: "bg-blue-100 text-blue-700 border-blue-200" },
  partial: { label: "Partial", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  draft: { label: "Draft", color: "bg-red-100 text-red-700 border-red-200" },
};

const ISSUE_TYPE_LABELS: Record<string, string> = {
  missing: "Missing",
  fallback_english: "English Fallback",
  mixed_language: "Mixed Language",
  placeholder: "Placeholder",
  duplicate_source: "Duplicate",
  unresolved_key: "Unresolved Key",
};

type AuditItem = {
  id: string;
  contentId: string;
  contentType: string;
  url: string | null;
  locale: string;
  translationPct: number;
  status: string;
  issueCount: number;
  issueBreakdown: Record<string, number>;
  sitemapEligible: boolean;
  noindex: boolean;
  adminOverride: boolean;
  lastScannedAt: string;
};

type DashboardSummary = {
  totalAudits: number;
  totalLocales: number;
  totalContentTypes: number;
  totalIssues: number;
  avgPct: number;
  fullyTranslated: number;
  readyForIndexing: number;
  partial: number;
  draftCount: number;
  sitemapEligible: number;
  noindexCount: number;
  byLocale: {
    locale: string;
    total: number;
    avgPct: number;
    issueCount: number;
    fullyTranslated: number;
    readyForIndexing: number;
    partial: number;
    draftCount: number;
  }[];
  byContentType: {
    contentType: string;
    total: number;
    avgPct: number;
    issueCount: number;
  }[];
};

type AuditDetail = AuditItem & {
  issues: {
    id: string;
    fieldName: string;
    sourceValue: string | null;
    localizedValue: string | null;
    issueType: string;
    category: string;
    status: string;
  }[];
};

export default function AdminTranslationDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "audits" | "detail" | "exam_questions">("overview");
  const [audits, setAudits] = useState<AuditItem[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedDetail, setSelectedDetail] = useState<AuditDetail | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [filterLocale, setFilterLocale] = useState("");
  const [filterContentType, setFilterContentType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterSitemap, setFilterSitemap] = useState("");
  const [filterNoindex, setFilterNoindex] = useState("");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [indexingThreshold, setIndexingThreshold] = useState(95);

  const isAdmin = user?.tier === "admin";

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterLocale) params.set("locale", filterLocale);
      if (filterContentType) params.set("contentType", filterContentType);
      if (filterStatus) params.set("status", filterStatus);
      if (filterSearch) params.set("search", filterSearch);
      if (filterSitemap) params.set("sitemapEligible", filterSitemap);
      if (filterNoindex) params.set("noindex", filterNoindex);
      params.set("limit", "50");
      params.set("offset", String(page * 50));

      const res = await adminFetch(`/api/admin/translation-audit/dashboard?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setAudits(data.audits || []);
        setSummary(data.summary || null);
        setTotal(data.total || 0);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [filterLocale, filterContentType, filterStatus, filterSearch, filterSitemap, filterNoindex, page]);

  useEffect(() => {
    if (isAdmin) fetchDashboard();
  }, [isAdmin, fetchDashboard]);

  const runAudit = async () => {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await adminFetch("/api/admin/translation-audit/run", {
        method: "POST",
        body: { indexingThreshold },
      });
      if (res.ok) {
        const result = await res.json();
        setScanResult(result);
        fetchDashboard();
      }
    } catch (e) {
      console.error(e);
    }
    setScanning(false);
  };

  const viewDetail = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/translation-audit/${id}`);
      if (res.ok) {
        const detail = await res.json();
        setSelectedDetail(detail);
        setActiveTab("detail");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleOverride = async (id: string, field: string, value: boolean) => {
    try {
      await adminFetch(`/api/admin/translation-audit/${id}`, {
        method: "PATCH",
        body: { [field]: value, adminOverride: true },
      });
      fetchDashboard();
      if (selectedDetail?.id === id) {
        setSelectedDetail({ ...selectedDetail, [field]: value, adminOverride: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.size === 0) return;
    try {
      await adminFetch("/api/admin/translation-audit/bulk", {
        method: "POST",
        body: { ids: Array.from(selectedIds), action },
      });
      setSelectedIds(new Set());
      fetchDashboard();
    } catch (e) {
      console.error(e);
    }
  };

  const handleExport = async (format: "csv" | "json") => {
    const params = new URLSearchParams();
    if (filterLocale) params.set("locale", filterLocale);
    if (filterContentType) params.set("contentType", filterContentType);
    if (filterStatus) params.set("status", filterStatus);

    const res = await adminFetch(`/api/admin/translation-audit/export/${format}?${params.toString()}`);
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `translation-audit.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === audits.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(audits.map(a => a.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600 mt-2">Admin access required.</p>
        </div>
      </div>
    );
  }

  const contentTypes = summary?.byContentType?.map(ct => ct.contentType) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SEO title="Translation Coverage - Admin" description="Audit translation completeness across all locales" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">Translation Coverage Dashboard</h1>
            <p className="text-gray-600 mt-1">Audit translation completeness across {LOCALES.length} locales</p>
          </div>
          <div className="flex gap-2">
            <Button
              data-testid="button-run-audit"
              onClick={runAudit}
              disabled={scanning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {scanning ? (
                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Scanning...</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Run Full Translation Audit</>
              )}
            </Button>
            <Button variant="outline" onClick={() => handleExport("csv")} data-testid="button-export-csv">
              <Download className="w-4 h-4 mr-2" /> CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport("json")} data-testid="button-export-json">
              <Download className="w-4 h-4 mr-2" /> JSON
            </Button>
          </div>
        </div>

        {scanResult && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between" data-testid="text-scan-result">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Scan complete: {scanResult.totalAudits} items audited in {(scanResult.scanDurationMs / 1000).toFixed(1)}s
                {scanResult.summary?.totalIssues > 0 && ` - ${scanResult.summary.totalIssues} issues found`}
              </span>
            </div>
            <button onClick={() => setScanResult(null)} className="text-green-600 hover:text-green-800"><X className="w-4 h-4" /></button>
          </div>
        )}

        {activeTab === "detail" && selectedDetail ? (
          <DetailInspector
            detail={selectedDetail}
            onBack={() => { setActiveTab("overview"); setSelectedDetail(null); }}
            onToggleOverride={toggleOverride}
          />
        ) : (
          <>
            <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border">
              {([
                { key: "overview", label: "Overview", icon: BarChart3 },
                { key: "audits", label: "Audit Results", icon: FileText },
                { key: "exam_questions", label: "Exam Questions", icon: BookOpen },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  data-testid={`tab-${tab.key}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && summary && (
              <OverviewTab summary={summary} onViewAudits={(locale) => {
                setFilterLocale(locale);
                setActiveTab("audits");
              }} />
            )}

            {activeTab === "overview" && !summary && !loading && (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No audit data yet</h2>
                <p className="text-gray-500 mb-6">Run a full translation audit to scan all content and UI strings.</p>
                <Button onClick={runAudit} disabled={scanning} data-testid="button-run-first-audit">
                  <Play className="w-4 h-4 mr-2" /> Run First Audit
                </Button>
              </div>
            )}

            {activeTab === "exam_questions" && (
              <ExamQuestionCoverageTab />
            )}

            {activeTab === "audits" && (
              <AuditsTab
                audits={audits}
                total={total}
                loading={loading}
                page={page}
                setPage={setPage}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                onViewDetail={viewDetail}
                onBulkAction={handleBulkAction}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filterLocale={filterLocale}
                setFilterLocale={(v) => { setFilterLocale(v); setPage(0); }}
                filterContentType={filterContentType}
                setFilterContentType={(v) => { setFilterContentType(v); setPage(0); }}
                filterStatus={filterStatus}
                setFilterStatus={(v) => { setFilterStatus(v); setPage(0); }}
                filterSearch={filterSearch}
                setFilterSearch={(v) => { setFilterSearch(v); setPage(0); }}
                filterSitemap={filterSitemap}
                setFilterSitemap={(v) => { setFilterSitemap(v); setPage(0); }}
                filterNoindex={filterNoindex}
                setFilterNoindex={(v) => { setFilterNoindex(v); setPage(0); }}
                contentTypes={contentTypes}
                indexingThreshold={indexingThreshold}
                setIndexingThreshold={setIndexingThreshold}
              />
            )}
          </>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewTab({ summary, onViewAudits }: { summary: DashboardSummary; onViewAudits: (locale: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard label="Total Locales" value={summary.totalLocales} icon={<Globe className="w-5 h-5 text-blue-500" />} testId="stat-locales" />
        <StatCard label="Items Audited" value={summary.totalAudits} icon={<FileText className="w-5 h-5 text-indigo-500" />} testId="stat-audited" />
        <StatCard label="Avg Coverage" value={`${summary.avgPct || 0}%`} icon={<BarChart3 className="w-5 h-5 text-green-500" />} testId="stat-avg-pct" />
        <StatCard label="Total Issues" value={summary.totalIssues} icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} testId="stat-issues" />
        <StatCard label="Sitemap Ready" value={summary.sitemapEligible} icon={<MapPin className="w-5 h-5 text-green-500" />} testId="stat-sitemap" />
        <StatCard label="Noindex" value={summary.noindexCount} icon={<XCircle className="w-5 h-5 text-red-500" />} testId="stat-noindex" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatusCard label="Fully Translated" count={summary.fullyTranslated} color="bg-green-500" testId="status-full" />
        <StatusCard label="Ready for Indexing" count={summary.readyForIndexing} color="bg-blue-500" testId="status-ready" />
        <StatusCard label="Partial" count={summary.partial} color="bg-yellow-500" testId="status-partial" />
        <StatusCard label="Draft" count={summary.draftCount} color="bg-red-500" testId="status-draft" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Languages className="w-5 h-5" /> Per-Locale Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 px-3">Locale</th>
                  <th className="py-2 px-3 text-center">Items</th>
                  <th className="py-2 px-3 text-center">Avg %</th>
                  <th className="py-2 px-3 text-center">Issues</th>
                  <th className="py-2 px-3">Status Breakdown</th>
                  <th className="py-2 px-3 text-center">Coverage</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {(summary.byLocale || []).map(loc => {
                  const locale = LOCALES.find(l => l.code === loc.locale);
                  return (
                    <tr key={loc.locale} className="border-b hover:bg-gray-50" data-testid={`row-locale-${loc.locale}`}>
                      <td className="py-2 px-3 font-medium">
                        <span className="mr-2">{locale?.flag}</span>
                        {locale?.name || loc.locale}
                      </td>
                      <td className="py-2 px-3 text-center">{loc.total}</td>
                      <td className="py-2 px-3 text-center font-medium">{loc.avgPct}%</td>
                      <td className="py-2 px-3 text-center">
                        {loc.issueCount > 0 ? (
                          <Badge variant="destructive" className="text-xs">{loc.issueCount}</Badge>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-1">
                          {loc.fullyTranslated > 0 && <Badge className="text-xs bg-green-100 text-green-700 border-green-200">{loc.fullyTranslated}</Badge>}
                          {loc.readyForIndexing > 0 && <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">{loc.readyForIndexing}</Badge>}
                          {loc.partial > 0 && <Badge className="text-xs bg-yellow-100 text-yellow-700 border-yellow-200">{loc.partial}</Badge>}
                          {loc.draftCount > 0 && <Badge className="text-xs bg-red-100 text-red-700 border-red-200">{loc.draftCount}</Badge>}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                loc.avgPct >= 95 ? "bg-green-500" : loc.avgPct >= 50 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(100, loc.avgPct)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <Button size="sm" variant="ghost" onClick={() => onViewAudits(loc.locale)} data-testid={`button-view-${loc.locale}`}>
                          <Eye className="w-3 h-3 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-Content Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(summary.byContentType || []).map(ct => (
              <div key={ct.contentType} className="p-4 border rounded-lg" data-testid={`card-content-type-${ct.contentType}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm capitalize">{ct.contentType.replace(/_/g, " ")}</span>
                  <Badge variant="outline" className="text-xs">{ct.total} items</Badge>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${ct.avgPct >= 95 ? "bg-green-500" : ct.avgPct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(100, ct.avgPct)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{ct.avgPct}%</span>
                </div>
                {ct.issueCount > 0 && (
                  <p className="text-xs text-amber-600 mt-1">{ct.issueCount} issues</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AuditsTab({
  audits, total, loading, page, setPage, selectedIds, toggleSelect, toggleSelectAll,
  onViewDetail, onBulkAction, showFilters, setShowFilters,
  filterLocale, setFilterLocale, filterContentType, setFilterContentType,
  filterStatus, setFilterStatus, filterSearch, setFilterSearch,
  filterSitemap, setFilterSitemap, filterNoindex, setFilterNoindex,
  contentTypes, indexingThreshold, setIndexingThreshold,
}: {
  audits: AuditItem[];
  total: number;
  loading: boolean;
  page: number;
  setPage: (p: number) => void;
  selectedIds: Set<string>;
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  onViewDetail: (id: string) => void;
  onBulkAction: (action: string) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  filterLocale: string;
  setFilterLocale: (v: string) => void;
  filterContentType: string;
  setFilterContentType: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  filterSearch: string;
  setFilterSearch: (v: string) => void;
  filterSitemap: string;
  setFilterSitemap: (v: string) => void;
  filterNoindex: string;
  setFilterNoindex: (v: string) => void;
  contentTypes: string[];
  indexingThreshold: number;
  setIndexingThreshold: (v: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              data-testid="input-search"
              placeholder="Search by URL, content ID, or type..."
              className="pl-9 w-80"
              value={filterSearch}
              onChange={e => setFilterSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} data-testid="button-toggle-filters">
            <Filter className="w-4 h-4 mr-1" />
            Filters
            {showFilters ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span data-testid="text-total-results">{total} results</span>
          <span>|</span>
          <span>Page {page + 1} of {Math.ceil(total / 50) || 1}</span>
        </div>
      </div>

      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Locale</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterLocale} onChange={e => setFilterLocale(e.target.value)} data-testid="filter-locale">
                <option value="">All Locales</option>
                {LOCALES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Content Type</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterContentType} onChange={e => setFilterContentType(e.target.value)} data-testid="filter-content-type">
                <option value="">All Types</option>
                {contentTypes.map(ct => <option key={ct} value={ct}>{ct.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Status</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} data-testid="filter-status">
                <option value="">All Statuses</option>
                <option value="fully_translated">Fully Translated</option>
                <option value="ready_for_indexing">Ready for Indexing</option>
                <option value="partial">Partial</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Sitemap</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterSitemap} onChange={e => setFilterSitemap(e.target.value)} data-testid="filter-sitemap">
                <option value="">Any</option>
                <option value="true">Eligible</option>
                <option value="false">Not Eligible</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Noindex</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterNoindex} onChange={e => setFilterNoindex(e.target.value)} data-testid="filter-noindex">
                <option value="">Any</option>
                <option value="true">Noindex</option>
                <option value="false">Indexed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Indexing Threshold</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={indexingThreshold}
                onChange={e => setIndexingThreshold(Number(e.target.value))}
                className="text-sm"
                data-testid="input-threshold"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => {
              setFilterLocale(""); setFilterContentType(""); setFilterStatus("");
              setFilterSearch(""); setFilterSitemap(""); setFilterNoindex("");
            }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </div>
        </Card>
      )}

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-blue-800">{selectedIds.size} selected</span>
          <Button size="sm" variant="outline" onClick={() => onBulkAction("mark_draft")} data-testid="bulk-mark-draft">Mark Draft</Button>
          <Button size="sm" variant="outline" onClick={() => onBulkAction("mark_ready")} data-testid="bulk-mark-ready">Mark Ready</Button>
          <Button size="sm" variant="outline" onClick={() => onBulkAction("remove_sitemap")} data-testid="bulk-remove-sitemap">Remove Sitemap</Button>
          <Button size="sm" variant="outline" onClick={() => onBulkAction("apply_noindex")} data-testid="bulk-apply-noindex">Apply Noindex</Button>
          <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())} data-testid="bulk-clear">
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-3 text-left">
                    <input type="checkbox" checked={selectedIds.size === audits.length && audits.length > 0} onChange={toggleSelectAll} data-testid="checkbox-select-all" />
                  </th>
                  <th className="py-2 px-3 text-left">Content</th>
                  <th className="py-2 px-3 text-left">Type</th>
                  <th className="py-2 px-3 text-center">Locale</th>
                  <th className="py-2 px-3 text-center">Coverage</th>
                  <th className="py-2 px-3 text-center">Status</th>
                  <th className="py-2 px-3 text-center">Issues</th>
                  <th className="py-2 px-3 text-center">Sitemap</th>
                  <th className="py-2 px-3 text-center">Noindex</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {audits.map(audit => {
                  const locale = LOCALES.find(l => l.code === audit.locale);
                  const statusInfo = STATUS_LABELS[audit.status] || STATUS_LABELS.draft;
                  return (
                    <tr key={audit.id} className={`border-b hover:bg-gray-50 ${selectedIds.has(audit.id) ? "bg-blue-50" : ""}`} data-testid={`row-audit-${audit.id}`}>
                      <td className="py-2 px-3">
                        <input type="checkbox" checked={selectedIds.has(audit.id)} onChange={() => toggleSelect(audit.id)} />
                      </td>
                      <td className="py-2 px-3">
                        <div className="max-w-[200px] truncate font-medium text-xs" title={audit.contentId}>{audit.contentId}</div>
                        {audit.url && <div className="text-xs text-gray-400 truncate max-w-[200px]">{audit.url}</div>}
                      </td>
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="text-xs capitalize">{audit.contentType.replace(/_/g, " ")}</Badge>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span title={locale?.name}>{locale?.flag || audit.locale}</span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1.5 justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                audit.translationPct >= 95 ? "bg-green-500" : audit.translationPct >= 50 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(100, audit.translationPct)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8">{audit.translationPct}%</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Badge className={`text-xs border ${statusInfo.color}`}>{statusInfo.label}</Badge>
                      </td>
                      <td className="py-2 px-3 text-center">
                        {audit.issueCount > 0 ? (
                          <Badge variant="destructive" className="text-xs">{audit.issueCount}</Badge>
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {audit.sitemapEligible ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {audit.noindex ? (
                          <Badge variant="destructive" className="text-xs">noindex</Badge>
                        ) : (
                          <span className="text-gray-300 text-xs">-</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <Button size="sm" variant="ghost" onClick={() => onViewDetail(audit.id)} data-testid={`button-detail-${audit.id}`}>
                          <Eye className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {audits.length === 0 && !loading && (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-gray-500">
                      No audit results found. Run a scan or adjust filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {total > 50 && (
            <div className="flex justify-between items-center p-3 border-t">
              <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)} data-testid="button-prev-page">Previous</Button>
              <span className="text-sm text-gray-500">Page {page + 1} of {Math.ceil(total / 50)}</span>
              <Button size="sm" variant="outline" disabled={(page + 1) * 50 >= total} onClick={() => setPage(page + 1)} data-testid="button-next-page">Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DetailInspector({ detail, onBack, onToggleOverride }: {
  detail: AuditDetail;
  onBack: () => void;
  onToggleOverride: (id: string, field: string, value: boolean) => void;
}) {
  const locale = LOCALES.find(l => l.code === detail.locale);
  const statusInfo = STATUS_LABELS[detail.status] || STATUS_LABELS.draft;

  const issuesByCategory = (detail.issues || []).reduce<Record<string, typeof detail.issues>>((acc, issue) => {
    const cat = issue.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(issue);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>{locale?.flag}</span>
              <span>{detail.contentId}</span>
              <Badge className={`text-xs border ${statusInfo.color}`}>{statusInfo.label}</Badge>
            </div>
            <span className="text-2xl font-bold">{detail.translationPct}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500">Content Type</p>
              <p className="text-sm font-medium capitalize" data-testid="text-detail-type">{detail.contentType.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Locale</p>
              <p className="text-sm font-medium" data-testid="text-detail-locale">{locale?.name || detail.locale}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">URL</p>
              <p className="text-sm font-medium truncate" data-testid="text-detail-url">{detail.url || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Scanned</p>
              <p className="text-sm font-medium" data-testid="text-detail-scanned">
                {detail.lastScannedAt ? new Date(detail.lastScannedAt).toLocaleDateString() : "Never"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium" data-testid="label-sitemap">Sitemap Eligible</label>
              <button
                onClick={() => onToggleOverride(detail.id, "sitemapEligible", !detail.sitemapEligible)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  detail.sitemapEligible ? "bg-green-500" : "bg-gray-300"
                }`}
                data-testid="toggle-sitemap"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  detail.sitemapEligible ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium" data-testid="label-noindex">Noindex</label>
              <button
                onClick={() => onToggleOverride(detail.id, "noindex", !detail.noindex)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  detail.noindex ? "bg-red-500" : "bg-gray-300"
                }`}
                data-testid="toggle-noindex"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  detail.noindex ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            {detail.adminOverride && (
              <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                <Shield className="w-3 h-3 mr-1" /> Admin Override
              </Badge>
            )}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className={`h-3 rounded-full transition-all ${
                detail.translationPct >= 95 ? "bg-green-500" : detail.translationPct >= 50 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.min(100, detail.translationPct)}%` }}
              data-testid="progress-bar"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Field-by-Field Audit ({(detail.issues || []).length} issues)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(issuesByCategory).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <p>No issues found for this item.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(issuesByCategory).map(([category, issues]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 capitalize">{category.replace(/_/g, " ")}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="py-1.5 px-3 text-left">Field</th>
                          <th className="py-1.5 px-3 text-left">English Source</th>
                          <th className="py-1.5 px-3 text-left">Localized Value</th>
                          <th className="py-1.5 px-3 text-center">Issue Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issues.map(issue => (
                          <tr key={issue.id} className="border-b hover:bg-gray-50" data-testid={`row-issue-${issue.id}`}>
                            <td className="py-1.5 px-3 font-medium text-xs">{issue.fieldName}</td>
                            <td className="py-1.5 px-3 text-xs text-gray-600 max-w-[250px] truncate" title={issue.sourceValue || ""}>
                              {issue.sourceValue || <span className="text-gray-400 italic">empty</span>}
                            </td>
                            <td className="py-1.5 px-3 text-xs max-w-[250px] truncate" title={issue.localizedValue || ""}>
                              {issue.localizedValue || <span className="text-red-400 italic">missing</span>}
                            </td>
                            <td className="py-1.5 px-3 text-center">
                              <Badge className={`text-xs ${
                                issue.issueType === "missing" ? "bg-red-100 text-red-700" :
                                issue.issueType === "fallback_english" ? "bg-amber-100 text-amber-700" :
                                issue.issueType === "mixed_language" ? "bg-purple-100 text-purple-700" :
                                issue.issueType === "placeholder" ? "bg-orange-100 text-orange-700" :
                                "bg-gray-100 text-gray-700"
                              }`}>
                                {ISSUE_TYPE_LABELS[issue.issueType] || issue.issueType}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon, testId }: { label: string; value: string | number; icon: React.ReactNode; testId: string }) {
  return (
    <Card className="p-4" data-testid={testId}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

function StatusCard({ label, count, color, testId }: { label: string; count: number; color: string; testId: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border" data-testid={testId}>
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold">{count}</p>
      </div>
    </div>
  );
}

type ExamCoverageData = {
  totalQuestions: number;
  totalLanguages: number;
  overallPercentage: number;
  languages: {
    language: string;
    languageName: string;
    totalQuestions: number;
    translatedQuestions: number;
    percentage: number;
    fieldBreakdown: Record<string, number>;
  }[];
  tierBreakdown: { tier: string; total: number; withTranslations: number; percentage: number }[];
  examBreakdown: { exam: string; total: number; withTranslations: number; percentage: number }[];
  filters: { tier: string | null; exam: string | null; bodySystem: string | null };
};

type ExamFilters = {
  tiers: string[];
  exams: string[];
  bodySystems: string[];
  languages: { code: string; name: string }[];
};

type BatchRun = {
  id: string;
  target_languages: string[];
  filter_tier: string | null;
  filter_exam: string | null;
  filter_body_system: string | null;
  total_questions: number;
  translated_count: number;
  skipped_count: number;
  failed_count: number;
  status: string;
  last_processed_offset: number;
  started_at: string;
  completed_at: string | null;
};

function ExamQuestionCoverageTab() {
  const [coverage, setCoverage] = useState<ExamCoverageData | null>(null);
  const [filters, setFilters] = useState<ExamFilters | null>(null);
  const [batchRuns, setBatchRuns] = useState<BatchRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateResult, setTranslateResult] = useState<any>(null);

  const [filterTier, setFilterTier] = useState("");
  const [filterExam, setFilterExam] = useState("");
  const [filterBodySystem, setFilterBodySystem] = useState("");

  const [translateLangs, setTranslateLangs] = useState<string[]>([]);
  const [translateTier, setTranslateTier] = useState("");
  const [translateExam, setTranslateExam] = useState("");
  const [translateBodySystem, setTranslateBodySystem] = useState("");
  const [translateBatchSize, setTranslateBatchSize] = useState(10);

  const fetchCoverage = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterTier) params.set("tier", filterTier);
      if (filterExam) params.set("exam", filterExam);
      if (filterBodySystem) params.set("bodySystem", filterBodySystem);

      const res = await adminFetch(`/api/admin/exam-questions/translation-coverage?${params}`);
      if (res.ok) setCoverage(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [filterTier, filterExam, filterBodySystem]);

  const fetchFilters = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/exam-questions/translation-filters");
      if (res.ok) setFilters(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchBatchRuns = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/exam-questions/translation-batch-runs");
      if (res.ok) {
        const data = await res.json();
        setBatchRuns(data.runs || []);
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    fetchCoverage();
    fetchFilters();
    fetchBatchRuns();
  }, [fetchCoverage, fetchFilters, fetchBatchRuns]);

  const startBatchTranslation = async () => {
    setTranslating(true);
    setTranslateResult(null);
    try {
      const body: any = { batchSize: translateBatchSize };
      if (translateLangs.length > 0) body.languages = translateLangs;
      if (translateTier) body.tier = translateTier;
      if (translateExam) body.exam = translateExam;
      if (translateBodySystem) body.bodySystem = translateBodySystem;

      const res = await adminFetch("/api/admin/exam-questions/translate-batch", {
        method: "POST",
        body,
      });
      if (res.ok) {
        const result = await res.json();
        setTranslateResult(result);
        fetchCoverage();
        fetchBatchRuns();
      }
    } catch (e) { console.error(e); }
    setTranslating(false);
  };

  const resumeBatchRun = async (runId: string) => {
    setTranslating(true);
    setTranslateResult(null);
    try {
      const res = await adminFetch("/api/admin/exam-questions/translate-batch", {
        method: "POST",
        body: { resumeFromRunId: runId, batchSize: translateBatchSize },
      });
      if (res.ok) {
        const result = await res.json();
        setTranslateResult(result);
        fetchCoverage();
        fetchBatchRuns();
      }
    } catch (e) { console.error(e); }
    setTranslating(false);
  };

  const priorityLangs = ["fr", "es", "ar", "hi", "tl", "zh", "pt"];

  return (
    <div className="space-y-6">
      {coverage && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Questions" value={coverage.totalQuestions} icon={<BookOpen className="w-5 h-5 text-blue-500" />} testId="stat-exam-total" />
            <StatCard label="Languages" value={coverage.totalLanguages} icon={<Languages className="w-5 h-5 text-indigo-500" />} testId="stat-exam-langs" />
            <StatCard label="Overall Coverage" value={`${coverage.overallPercentage}%`} icon={<BarChart3 className="w-5 h-5 text-green-500" />} testId="stat-exam-coverage" />
            <StatCard label="Priority Languages" value={`${priorityLangs.length}`} icon={<Globe className="w-5 h-5 text-amber-500" />} testId="stat-exam-priority" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Filter by Tier</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterTier} onChange={e => setFilterTier(e.target.value)} data-testid="filter-exam-tier">
                <option value="">All Tiers</option>
                {(filters?.tiers || []).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Filter by Exam</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterExam} onChange={e => setFilterExam(e.target.value)} data-testid="filter-exam-exam">
                <option value="">All Exams</option>
                {(filters?.exams || []).map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Filter by Body System</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={filterBodySystem} onChange={e => setFilterBodySystem(e.target.value)} data-testid="filter-exam-body-system">
                <option value="">All Systems</option>
                {(filters?.bodySystems || []).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Languages className="w-5 h-5" /> Per-Language Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-2 px-3">Language</th>
                      <th className="py-2 px-3 text-center">Total</th>
                      <th className="py-2 px-3 text-center">Translated</th>
                      <th className="py-2 px-3 text-center">Coverage</th>
                      <th className="py-2 px-3">Progress</th>
                      <th className="py-2 px-3 text-center">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverage.languages.map(lang => {
                      const locale = LOCALES.find(l => l.code === lang.language);
                      const isPriority = priorityLangs.includes(lang.language);
                      return (
                        <tr key={lang.language} className="border-b hover:bg-gray-50" data-testid={`row-exam-lang-${lang.language}`}>
                          <td className="py-2 px-3 font-medium">
                            <span className="mr-2">{locale?.flag || "🌐"}</span>
                            {lang.languageName}
                          </td>
                          <td className="py-2 px-3 text-center">{lang.totalQuestions}</td>
                          <td className="py-2 px-3 text-center font-medium">{lang.translatedQuestions}</td>
                          <td className="py-2 px-3 text-center font-bold">{lang.percentage}%</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    lang.percentage >= 95 ? "bg-green-500" : lang.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${Math.min(100, lang.percentage)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            {isPriority ? (
                              <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">Priority</Badge>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {coverage.tierBreakdown.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Per-Tier Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {coverage.tierBreakdown.map(t => (
                    <div key={t.tier} className="p-4 border rounded-lg" data-testid={`card-tier-${t.tier}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{t.tier}</span>
                        <Badge variant="outline" className="text-xs">{t.total} questions</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${t.percentage >= 95 ? "bg-green-500" : t.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min(100, t.percentage)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{t.percentage}%</span>
                      </div>
                      <p className="text-xs text-gray-500">{t.withTranslations} of {t.total} have translations</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {coverage.examBreakdown.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Per-Exam Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {coverage.examBreakdown.map(e => (
                    <div key={e.exam} className="p-4 border rounded-lg" data-testid={`card-exam-${e.exam}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm truncate max-w-[150px]" title={e.exam}>{e.exam}</span>
                        <Badge variant="outline" className="text-xs">{e.total}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${e.percentage >= 95 ? "bg-green-500" : e.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min(100, e.percentage)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{e.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Play className="w-5 h-5" /> Start Batch Translation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Target Languages</label>
              <select
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                multiple
                size={4}
                value={translateLangs}
                onChange={e => setTranslateLangs(Array.from(e.target.selectedOptions, o => o.value))}
                data-testid="select-translate-langs"
              >
                {(filters?.languages || []).map(l => (
                  <option key={l.code} value={l.code}>
                    {priorityLangs.includes(l.code) ? "★ " : ""}{l.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                {translateLangs.length === 0 ? "All 7 priority languages" : `${translateLangs.length} selected`}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Tier Filter</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={translateTier} onChange={e => setTranslateTier(e.target.value)} data-testid="select-translate-tier">
                <option value="">All Tiers</option>
                {(filters?.tiers || []).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Exam Filter</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={translateExam} onChange={e => setTranslateExam(e.target.value)} data-testid="select-translate-exam">
                <option value="">All Exams</option>
                {(filters?.exams || []).map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Body System Filter</label>
              <select className="w-full border rounded-md px-2 py-1.5 text-sm" value={translateBodySystem} onChange={e => setTranslateBodySystem(e.target.value)} data-testid="select-translate-body-system">
                <option value="">All Systems</option>
                {(filters?.bodySystems || []).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Batch Size</label>
              <Input
                type="number"
                min={1}
                max={25}
                value={translateBatchSize}
                onChange={e => setTranslateBatchSize(Number(e.target.value))}
                className="text-sm"
                data-testid="input-batch-size"
              />
            </div>
          </div>
          <Button
            onClick={startBatchTranslation}
            disabled={translating}
            className="bg-blue-600 hover:bg-blue-700"
            data-testid="button-start-batch"
          >
            {translating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Translating...</>
            ) : (
              <><Play className="w-4 h-4 mr-2" /> Start Batch Translation</>
            )}
          </Button>

          {translateResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg" data-testid="text-translate-result">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Batch Complete</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Translated:</span>{" "}
                  <span className="font-bold text-green-700">{translateResult.batchTranslated || translateResult.totalTranslated || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Skipped:</span>{" "}
                  <span className="font-bold text-gray-500">{translateResult.batchSkipped || translateResult.totalSkipped || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Failed:</span>{" "}
                  <span className="font-bold text-red-600">{translateResult.batchFailed || 0}</span>
                </div>
              </div>
              {!translateResult.done && translateResult.runId && (
                <div className="mt-3">
                  <Button size="sm" variant="outline" onClick={() => resumeBatchRun(translateResult.runId)} disabled={translating} data-testid="button-resume-batch">
                    <Play className="w-3 h-3 mr-1" /> Continue Next Batch
                  </Button>
                </div>
              )}
              {translateResult.qualityIssues?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-amber-700 mb-1">Quality Issues:</p>
                  <ul className="text-xs text-amber-600 space-y-0.5">
                    {translateResult.qualityIssues.slice(0, 5).map((issue: string, i: number) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {batchRuns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Batch Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 px-3">Started</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-center">Languages</th>
                    <th className="py-2 px-3">Filters</th>
                    <th className="py-2 px-3 text-center">Progress</th>
                    <th className="py-2 px-3 text-center">Translated</th>
                    <th className="py-2 px-3 text-center">Failed</th>
                    <th className="py-2 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {batchRuns.map(run => (
                    <tr key={run.id} className="border-b hover:bg-gray-50" data-testid={`row-batch-${run.id}`}>
                      <td className="py-2 px-3 text-xs">
                        {new Date(run.started_at).toLocaleString()}
                      </td>
                      <td className="py-2 px-3">
                        <Badge className={`text-xs ${
                          run.status === "completed" ? "bg-green-100 text-green-700" :
                          run.status === "running" ? "bg-blue-100 text-blue-700" :
                          run.status === "failed" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {run.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-center text-xs">
                        {Array.isArray(run.target_languages) ? run.target_languages.length : 0}
                      </td>
                      <td className="py-2 px-3 text-xs">
                        {[run.filter_tier, run.filter_exam, run.filter_body_system].filter(Boolean).join(", ") || "All"}
                      </td>
                      <td className="py-2 px-3 text-center text-xs">
                        {run.last_processed_offset}/{run.total_questions}
                      </td>
                      <td className="py-2 px-3 text-center font-medium text-green-600">
                        {run.translated_count}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {run.failed_count > 0 ? (
                          <span className="text-red-600 font-medium">{run.failed_count}</span>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {run.status === "running" && (
                          <Button size="sm" variant="ghost" onClick={() => resumeBatchRun(run.id)} disabled={translating} data-testid={`button-resume-${run.id}`}>
                            <Play className="w-3 h-3 mr-1" /> Resume
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
}
