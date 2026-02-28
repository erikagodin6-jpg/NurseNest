import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  Globe, FileText, AlertTriangle, CheckCircle2, Clock, Search,
  RefreshCw, ChevronDown, ChevronRight, Languages, BarChart3,
  Sparkles, Eye, EyeOff, ExternalLink, Zap
} from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "French", flag: "FR" },
  { code: "es", name: "Spanish", flag: "ES" },
  { code: "fil", name: "Filipino", flag: "FIL" },
  { code: "hi", name: "Hindi", flag: "HI" },
  { code: "zh", name: "Chinese", flag: "ZH" },
  { code: "ar", name: "Arabic", flag: "AR" },
  { code: "ko", name: "Korean", flag: "KO" },
  { code: "pt", name: "Portuguese", flag: "PT" },
  { code: "pa", name: "Punjabi", flag: "PA" },
  { code: "vi", name: "Vietnamese", flag: "VI" },
  { code: "ht", name: "Haitian Creole", flag: "HT" },
  { code: "ur", name: "Urdu", flag: "UR" },
  { code: "ja", name: "Japanese", flag: "JA" },
  { code: "fa", name: "Farsi", flag: "FA" },
];

type DashboardData = {
  pagesByLanguage: { languageCode: string; pageType: string; count: number }[];
  pagesByStatus: { languageCode: string; translationStatus: string; count: number }[];
  wordCountFlags: { id: string; title: string; slug: string; languageCode: string; pageType: string; charCount: number }[];
  missingMeta: { id: string; title: string; slug: string; languageCode: string; pageType: string }[];
  orphanPages: { id: string; title: string; slug: string; languageCode: string }[];
  needsReview: { id: string; title: string; slug: string; languageCode: string; translationStatus: string }[];
  coverageMatrix: { pageGroupId: string; langs: { lang: string; status: string; id: string }[] }[];
};

type SeoPageRow = {
  id: string;
  pageType: string;
  exam: string;
  languageCode: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  translationStatus: string;
  isPublic: boolean;
  isIndexable: boolean;
  pageGroupId: string;
  contentLength: number;
  lastUpdated: string;
};

function statusColor(status: string) {
  switch (status) {
    case "en_source": return "bg-blue-100 text-blue-800";
    case "auto": return "bg-amber-100 text-amber-800";
    case "localized": return "bg-green-100 text-green-800";
    case "human_reviewed": return "bg-emerald-100 text-emerald-800";
    case "needs_review": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export default function AdminSeoDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "coverage" | "flags" | "keywords">("overview");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [pages, setPages] = useState<SeoPageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [genTargetLang, setGenTargetLang] = useState("fr");
  const [genResult, setGenResult] = useState<string | null>(null);
  const [flagging, setFlagging] = useState(false);

  const isAdmin = user?.tier === "admin";

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/seo-dashboard", { credentials: "include" });
      if (res.ok) setDashboard(await res.json());
    } catch {}
  }, []);

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/seo-pages-all?language=${selectedLang}`, { credentials: "include" });
      if (res.ok) setPages(await res.json());
    } catch {}
  }, [selectedLang]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([fetchDashboard(), fetchPages()]).finally(() => setLoading(false));
  }, [isAdmin]);

  useEffect(() => {
    if (activeTab === "pages") fetchPages();
  }, [selectedLang, activeTab]);

  if (!isAdmin) return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Admin access required.</p>
      </div>
    </>
  );

  const handleLocalize = async (pageId: string, targetLang: string) => {
    setGeneratingFor(pageId);
    setGenResult(null);
    try {
      const res = await fetch("/api/ai/generate-localized-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sourcePageId: pageId, targetLanguage: targetLang }),
      });
      const data = await res.json();
      if (data.success) {
        setGenResult(`Localized to ${targetLang}: "${data.localized.title}"`);
        fetchDashboard();
      } else {
        setGenResult(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setGenResult(`Error: ${e.message}`);
    } finally {
      setGeneratingFor(null);
    }
  };

  const handleFlagStale = async () => {
    setFlagging(true);
    try {
      const res = await fetch("/api/admin/flag-stale-translations", { method: "POST", credentials: "include" });
      const data = await res.json();
      setGenResult(`Flagged ${data.flagged} translations for review.`);
      fetchDashboard();
    } catch {}
    setFlagging(false);
  };

  const handleTogglePublish = async (pageId: string, currentlyPublic: boolean) => {
    try {
      await fetch(`/api/seo-pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isPublic: !currentlyPublic }),
      });
      fetchPages();
    } catch {}
  };

  const langCounts: Record<string, { pillar: number; cluster: number; total: number }> = {};
  if (dashboard) {
    for (const row of dashboard.pagesByLanguage) {
      if (!langCounts[row.languageCode]) langCounts[row.languageCode] = { pillar: 0, cluster: 0, total: 0 };
      if (row.pageType === "pillar") langCounts[row.languageCode].pillar = row.count;
      else if (row.pageType === "cluster") langCounts[row.languageCode].cluster = row.count;
      langCounts[row.languageCode].total += row.count;
    }
  }

  const statusCounts: Record<string, Record<string, number>> = {};
  if (dashboard) {
    for (const row of dashboard.pagesByStatus) {
      if (!statusCounts[row.languageCode]) statusCounts[row.languageCode] = {};
      statusCounts[row.languageCode][row.translationStatus] = row.count;
    }
  }

  const filteredPages = pages.filter(p =>
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "pages" as const, label: "Pages", icon: FileText },
    { id: "coverage" as const, label: "Coverage Matrix", icon: Globe },
    { id: "flags" as const, label: "Flags & Issues", icon: AlertTriangle },
    { id: "keywords" as const, label: "Keywords", icon: Search },
  ];

  return (
    <>
      <Navigation />
      <SEO title="SEO Dashboard | Admin" description="Multilingual SEO management dashboard" />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3" data-testid="heading-seo-dashboard">
                <Globe className="w-7 h-7 text-primary" />
                Multilingual SEO Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Manage 15-language SEO pages, translations, and keyword targeting</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleFlagStale} disabled={flagging} data-testid="button-flag-stale">
                {flagging ? <RefreshCw className="w-4 h-4 animate-spin mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
                Flag Stale Translations
              </Button>
              <Button variant="outline" size="sm" onClick={() => { fetchDashboard(); fetchPages(); }} data-testid="button-refresh">
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
              </Button>
            </div>
          </div>

          {genResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-800" data-testid="notice-result">
              {genResult}
              <button onClick={() => setGenResult(null)} className="ml-2 text-green-600 hover:text-green-800">Dismiss</button>
            </div>
          )}

          <div className="flex gap-1 mb-6 bg-white rounded-lg border border-primary/10 p-1 overflow-x-auto" data-testid="nav-seo-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
                data-testid={`tab-seo-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {loading && !dashboard ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "overview" && dashboard && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="section-kpi-seo">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-primary">{Object.values(langCounts).reduce((s, c) => s + c.total, 0)}</div>
                        <div className="text-sm text-gray-500 mt-1">Total SEO Pages</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">{Object.keys(langCounts).length}</div>
                        <div className="text-sm text-gray-500 mt-1">Languages Active</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-amber-600">{dashboard.wordCountFlags.length}</div>
                        <div className="text-sm text-gray-500 mt-1">Content Flags</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-red-600">{dashboard.needsReview.length}</div>
                        <div className="text-sm text-gray-500 mt-1">Needs Review</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Languages className="w-5 h-5" /> Pages by Language
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm" data-testid="table-lang-overview">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-3">Language</th>
                              <th className="text-center py-2 px-3">Pillars</th>
                              <th className="text-center py-2 px-3">Clusters</th>
                              <th className="text-center py-2 px-3">Total</th>
                              <th className="text-center py-2 px-3">en_source</th>
                              <th className="text-center py-2 px-3">auto</th>
                              <th className="text-center py-2 px-3">human_reviewed</th>
                              <th className="text-center py-2 px-3">needs_review</th>
                            </tr>
                          </thead>
                          <tbody>
                            {LANGUAGES.map(lang => {
                              const counts = langCounts[lang.code] || { pillar: 0, cluster: 0, total: 0 };
                              const statuses = statusCounts[lang.code] || {};
                              return (
                                <tr key={lang.code} className="border-b hover:bg-gray-50">
                                  <td className="py-2 px-3 font-medium">{lang.flag} {lang.name}</td>
                                  <td className="py-2 px-3 text-center">{counts.pillar}</td>
                                  <td className="py-2 px-3 text-center">{counts.cluster}</td>
                                  <td className="py-2 px-3 text-center font-semibold">{counts.total}</td>
                                  <td className="py-2 px-3 text-center"><Badge className={statusColor("en_source")}>{statuses["en_source"] || 0}</Badge></td>
                                  <td className="py-2 px-3 text-center"><Badge className={statusColor("auto")}>{statuses["auto"] || 0}</Badge></td>
                                  <td className="py-2 px-3 text-center"><Badge className={statusColor("human_reviewed")}>{statuses["human_reviewed"] || 0}</Badge></td>
                                  <td className="py-2 px-3 text-center"><Badge className={statusColor("needs_review")}>{statuses["needs_review"] || 0}</Badge></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "pages" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <select
                      value={selectedLang}
                      onChange={e => setSelectedLang(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm"
                      data-testid="select-language"
                    >
                      {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
                    </select>
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search pages..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-9"
                        data-testid="input-search-pages"
                      />
                    </div>
                    <select
                      value={genTargetLang}
                      onChange={e => setGenTargetLang(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm"
                      data-testid="select-target-lang"
                    >
                      {LANGUAGES.filter(l => l.code !== "en").map(l => <option key={l.code} value={l.code}>Localize to: {l.name}</option>)}
                    </select>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm" data-testid="table-seo-pages">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left py-3 px-4">Title</th>
                              <th className="text-center py-3 px-4">Type</th>
                              <th className="text-center py-3 px-4">Exam</th>
                              <th className="text-center py-3 px-4">Status</th>
                              <th className="text-center py-3 px-4">Content</th>
                              <th className="text-center py-3 px-4">Public</th>
                              <th className="text-center py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPages.map(page => (
                              <tr key={page.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-800 truncate max-w-xs" title={page.title}>{page.title}</div>
                                  <div className="text-xs text-gray-400 truncate max-w-xs">{page.slug}</div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <Badge variant="outline" className="text-xs">{page.pageType}</Badge>
                                </td>
                                <td className="py-3 px-4 text-center text-xs">{page.exam?.toUpperCase() || "-"}</td>
                                <td className="py-3 px-4 text-center">
                                  <Badge className={`text-xs ${statusColor(page.translationStatus)}`}>{page.translationStatus}</Badge>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`text-xs ${page.contentLength < 100 ? "text-red-500 font-semibold" : page.contentLength < 7200 ? "text-amber-500" : "text-green-600"}`}>
                                    {page.contentLength > 0 ? `${Math.round(page.contentLength / 6)} words` : "Empty"}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <button onClick={() => handleTogglePublish(page.id, page.isPublic)} data-testid={`button-toggle-publish-${page.id}`}>
                                    {page.isPublic ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                                  </button>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center gap-1 justify-center">
                                    {selectedLang === "en" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleLocalize(page.id, genTargetLang)}
                                        disabled={generatingFor === page.id}
                                        className="text-xs h-7"
                                        data-testid={`button-localize-${page.id}`}
                                      >
                                        {generatingFor === page.id ? (
                                          <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                                        ) : (
                                          <Sparkles className="w-3 h-3 mr-1" />
                                        )}
                                        Localize
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => navigate(`/study-guide/${page.slug}`)}
                                      className="text-xs h-7"
                                      data-testid={`button-preview-${page.id}`}
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {filteredPages.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No pages found for this language.</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "coverage" && dashboard && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5" /> Translation Coverage Matrix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs" data-testid="table-coverage-matrix">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-2 sticky left-0 bg-white">Group</th>
                            {LANGUAGES.map(l => (
                              <th key={l.code} className="text-center py-2 px-1 min-w-[40px]">{l.flag}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dashboard.coverageMatrix.slice(0, 80).map((group, gi) => {
                            const langMap: Record<string, { status: string; id: string }> = {};
                            const langs = Array.isArray(group.langs) ? group.langs : [];
                            for (const l of langs) langMap[l.lang] = l;
                            return (
                              <tr key={gi} className="border-b hover:bg-gray-50">
                                <td className="py-1 px-2 sticky left-0 bg-white text-xs truncate max-w-[120px]" title={group.pageGroupId}>
                                  {langMap["en"]?.id ? "Page " + (gi + 1) : group.pageGroupId.slice(0, 8)}
                                </td>
                                {LANGUAGES.map(l => {
                                  const entry = langMap[l.code];
                                  if (!entry) return <td key={l.code} className="text-center py-1 px-1"><span className="text-gray-300">-</span></td>;
                                  const colors: Record<string, string> = {
                                    en_source: "bg-blue-500", auto: "bg-amber-400", localized: "bg-green-500",
                                    human_reviewed: "bg-emerald-600", needs_review: "bg-red-500"
                                  };
                                  return (
                                    <td key={l.code} className="text-center py-1 px-1">
                                      <div className={`w-4 h-4 rounded-sm mx-auto ${colors[entry.status] || "bg-gray-300"}`} title={entry.status} />
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> en_source</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> auto</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> localized</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-600 inline-block" /> human_reviewed</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> needs_review</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-300 inline-block" /> missing</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "flags" && dashboard && (
                <div className="space-y-6">
                  {dashboard.wordCountFlags.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-amber-600">
                          <AlertTriangle className="w-5 h-5" /> Low Word Count ({dashboard.wordCountFlags.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2" data-testid="section-word-flags">
                          {dashboard.wordCountFlags.map(page => (
                            <div key={page.id} className="flex items-center justify-between py-2 px-3 bg-amber-50 rounded-lg text-sm">
                              <div>
                                <span className="font-medium">{page.title}</span>
                                <span className="text-gray-500 ml-2">({page.languageCode})</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-amber-600 font-mono">{Math.round(page.charCount / 6)} words</span>
                                <Badge variant="outline" className="text-xs">{page.pageType}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {dashboard.missingMeta.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-5 h-5" /> Missing Meta Description ({dashboard.missingMeta.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2" data-testid="section-missing-meta">
                          {dashboard.missingMeta.slice(0, 20).map(page => (
                            <div key={page.id} className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg text-sm">
                              <span className="font-medium">{page.title}</span>
                              <span className="text-gray-500">{page.languageCode}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {dashboard.needsReview.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-orange-600">
                          <Clock className="w-5 h-5" /> Needs Translation Review ({dashboard.needsReview.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2" data-testid="section-needs-review">
                          {dashboard.needsReview.map(page => (
                            <div key={page.id} className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg text-sm">
                              <span className="font-medium">{page.title}</span>
                              <span className="text-gray-500">{page.languageCode}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {dashboard.orphanPages.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Orphan Pages ({dashboard.orphanPages.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2" data-testid="section-orphan-pages">
                          {dashboard.orphanPages.map(page => (
                            <div key={page.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg text-sm">
                              <span className="font-medium">{page.title}</span>
                              <span className="text-gray-500">{page.languageCode}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {dashboard.wordCountFlags.length === 0 && dashboard.missingMeta.length === 0 &&
                   dashboard.needsReview.length === 0 && dashboard.orphanPages.length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-gray-600">No issues found. All SEO pages pass quality checks.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === "keywords" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Search className="w-5 h-5" /> Keyword Targeting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Zap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Keyword targeting module will be populated with language-specific keywords.</p>
                      <p className="text-sm mt-1">Use the API endpoint <code className="bg-gray-100 px-1 rounded">POST /api/admin/seo-keywords</code> to add keywords.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
