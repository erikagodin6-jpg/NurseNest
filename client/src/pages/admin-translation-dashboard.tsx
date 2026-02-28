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
  Globe, FileText, AlertTriangle, CheckCircle2, Languages, Search,
  RefreshCw, Download, Upload, Pencil, Eye, ChevronDown, Sparkles,
  ArrowLeftRight, Filter, BarChart3
} from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "fil", name: "Filipino" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "vi", name: "Vietnamese" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ur", name: "Urdu" },
  { code: "ja", name: "Japanese" },
  { code: "fa", name: "Farsi" },
];

const CONTENT_TYPES = [
  "lesson", "module", "question", "flashcard", "case", "glossary", "seo_page", "faq", "ui_string"
];

const FIELDS_BY_TYPE: Record<string, string[]> = {
  lesson: ["title", "content", "meta_title", "meta_description", "faq_json", "summary"],
  module: ["title", "description"],
  question: ["stem", "options_json", "rationale", "teaching_pearl", "why_tested"],
  flashcard: ["front", "back", "rationale"],
  glossary: ["term", "definition", "related_terms"],
  seo_page: ["title", "meta_title", "meta_description", "content_html", "faq_json"],
  ui_string: ["value"],
  faq: ["question", "answer"],
  case: ["history", "vitals", "labs", "orders"],
};

type TranslationRecord = {
  id: string;
  contentType: string;
  contentId: string;
  languageCode: string;
  fieldName: string;
  translatedText: string;
  translationStatus: string;
  sourceHash: string | null;
  lastUpdated: string;
};

type CoverageData = {
  contentType: string;
  languageCode: string;
  totalItems: number;
  translatedItems: number;
  staleItems: number;
  humanReviewedItems: number;
};

export default function AdminTranslationDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"missing" | "stale" | "bulk" | "editor" | "coverage">("coverage");
  const [selectedLang, setSelectedLang] = useState("fr");
  const [selectedType, setSelectedType] = useState("lesson");
  const [coverageData, setCoverageData] = useState<CoverageData[]>([]);
  const [translations, setTranslations] = useState<TranslationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorContentId, setEditorContentId] = useState("");
  const [editorField, setEditorField] = useState("title");
  const [editorOriginal, setEditorOriginal] = useState("");
  const [editorTranslation, setEditorTranslation] = useState("");
  const [editorStatus, setEditorStatus] = useState("auto");
  const [bulkAction, setBulkAction] = useState("");
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkRunning, setBulkRunning] = useState(false);

  const isAdmin = user?.tier === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    fetchCoverage();
  }, [isAdmin]);

  const fetchCoverage = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/translation-coverage");
      if (res.ok) {
        const data = await res.json();
        setCoverageData(data);
      }
    } catch (e) { console.error(e); }
  }, []);

  const fetchTranslations = useCallback(async (type: string, lang: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/translations/batch/${type}?lang=${lang}`);
      if (res.ok) {
        const data = await res.json();
        setTranslations(data);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  const saveTranslation = async () => {
    try {
      await fetch("/api/translations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: selectedType,
          contentId: editorContentId,
          languageCode: selectedLang,
          fieldName: editorField,
          translatedText: editorTranslation,
          translationStatus: editorStatus,
        }),
      });
      fetchTranslations(selectedType, selectedLang);
    } catch (e) { console.error(e); }
  };

  const handleBulkAction = async (action: string) => {
    setBulkRunning(true);
    setBulkProgress(0);
    try {
      if (action === "create_placeholders") {
        const res = await fetch("/api/translations/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create_placeholders",
            contentType: selectedType,
            targetLanguage: selectedLang,
          }),
        });
        if (res.ok) setBulkProgress(100);
      } else if (action === "flag_stale") {
        const res = await fetch("/api/admin/flag-stale-translations", { method: "POST" });
        if (res.ok) setBulkProgress(100);
      } else if (action === "export_csv") {
        const res = await fetch(`/api/translations/batch/${selectedType}?lang=${selectedLang}`);
        if (res.ok) {
          const data = await res.json();
          const csv = [
            "content_id,field_name,language_code,translated_text,translation_status",
            ...data.map((t: TranslationRecord) =>
              `"${t.contentId}","${t.fieldName}","${t.languageCode}","${(t.translatedText || "").replace(/"/g, '""')}","${t.translationStatus}"`
            ),
          ].join("\n");
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `translations_${selectedType}_${selectedLang}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          setBulkProgress(100);
        }
      }
    } catch (e) { console.error(e); }
    setBulkRunning(false);
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkRunning(true);
    const text = await file.text();
    const lines = text.split("\n").slice(1);
    const updates = lines.filter(l => l.trim()).map(line => {
      const parts = line.match(/(?:^|,)("(?:[^"]*(?:""[^"]*)*)"|[^,]*)/g);
      if (!parts || parts.length < 5) return null;
      const clean = (s: string) => s.replace(/^,?"?|"?$/g, "").replace(/""/g, '"');
      return {
        contentType: selectedType,
        contentId: clean(parts[0]),
        fieldName: clean(parts[1]),
        languageCode: clean(parts[2]),
        translatedText: clean(parts[3]),
        translationStatus: clean(parts[4]) || "auto",
      };
    }).filter(Boolean);
    try {
      await fetch("/api/translations/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import", translations: updates }),
      });
      setBulkProgress(100);
      fetchTranslations(selectedType, selectedLang);
    } catch (e) { console.error(e); }
    setBulkRunning(false);
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

  const tabs = [
    { key: "coverage", label: "Coverage Matrix", icon: BarChart3 },
    { key: "missing", label: "Missing Translations", icon: AlertTriangle },
    { key: "stale", label: "Stale Translations", icon: RefreshCw },
    { key: "bulk", label: "Bulk Actions", icon: Sparkles },
    { key: "editor", label: "Side-by-Side Editor", icon: ArrowLeftRight },
  ] as const;

  const langCoverageMap = new Map<string, { total: number; translated: number; stale: number; reviewed: number }>();
  coverageData.forEach(c => {
    const key = c.languageCode;
    const existing = langCoverageMap.get(key) || { total: 0, translated: 0, stale: 0, reviewed: 0 };
    langCoverageMap.set(key, {
      total: existing.total + c.totalItems,
      translated: existing.translated + c.translatedItems,
      stale: existing.stale + c.staleItems,
      reviewed: existing.reviewed + c.humanReviewedItems,
    });
  });

  const missingTranslations = translations.filter(t => !t.translatedText || t.translatedText.trim() === "");
  const staleTranslations = translations.filter(t => t.translationStatus === "needs_review" || t.translationStatus === "stale");
  const filteredTranslations = searchQuery
    ? translations.filter(t =>
        t.contentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.translatedText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.fieldName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : translations;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SEO title="Translation Dashboard - Admin" description="Manage content translations" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">Translation Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage multilingual content translations across all 15 languages</p>
          </div>
          <div className="flex gap-2">
            <select
              data-testid="select-language"
              className="border rounded-md px-3 py-2 text-sm"
              value={selectedLang}
              onChange={e => { setSelectedLang(e.target.value); if (activeTab !== "coverage") fetchTranslations(selectedType, e.target.value); }}
            >
              {LANGUAGES.filter(l => l.code !== "en").map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
            <select
              data-testid="select-content-type"
              className="border rounded-md px-3 py-2 text-sm"
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value); if (activeTab !== "coverage") fetchTranslations(e.target.value, selectedLang); }}
            >
              {CONTENT_TYPES.map(t => (
                <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              data-testid={`tab-${tab.key}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => { setActiveTab(tab.key); if (tab.key !== "coverage") fetchTranslations(selectedType, selectedLang); }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "coverage" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> Language Coverage Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Language</th>
                        <th className="text-center py-2 px-3">Total Fields</th>
                        <th className="text-center py-2 px-3">Translated</th>
                        <th className="text-center py-2 px-3">Stale</th>
                        <th className="text-center py-2 px-3">Human Reviewed</th>
                        <th className="text-center py-2 px-3">Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LANGUAGES.filter(l => l.code !== "en").map(lang => {
                        const stats = langCoverageMap.get(lang.code) || { total: 0, translated: 0, stale: 0, reviewed: 0 };
                        const pct = stats.total > 0 ? Math.round((stats.translated / stats.total) * 100) : 0;
                        return (
                          <tr key={lang.code} className="border-b hover:bg-gray-50" data-testid={`row-lang-${lang.code}`}>
                            <td className="py-2 px-3 font-medium">{lang.name}</td>
                            <td className="text-center py-2 px-3">{stats.total}</td>
                            <td className="text-center py-2 px-3">{stats.translated}</td>
                            <td className="text-center py-2 px-3">
                              {stats.stale > 0 && <Badge variant="destructive" className="text-xs">{stats.stale}</Badge>}
                              {stats.stale === 0 && <span className="text-gray-400">0</span>}
                            </td>
                            <td className="text-center py-2 px-3">{stats.reviewed}</td>
                            <td className="text-center py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium">{pct}%</span>
                              </div>
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
                <CardTitle>Coverage by Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Content Type</th>
                        {LANGUAGES.filter(l => l.code !== "en").map(l => (
                          <th key={l.code} className="text-center py-2 px-1 text-xs">{l.code.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CONTENT_TYPES.map(type => (
                        <tr key={type} className="border-b">
                          <td className="py-2 px-3 font-medium capitalize">{type.replace(/_/g, " ")}</td>
                          {LANGUAGES.filter(l => l.code !== "en").map(lang => {
                            const c = coverageData.find(d => d.contentType === type && d.languageCode === lang.code);
                            const pct = c && c.totalItems > 0 ? Math.round((c.translatedItems / c.totalItems) * 100) : 0;
                            return (
                              <td key={lang.code} className="text-center py-2 px-1">
                                <span className={`text-xs font-medium px-1 py-0.5 rounded ${
                                  pct >= 80 ? "bg-green-100 text-green-700" :
                                  pct >= 50 ? "bg-yellow-100 text-yellow-700" :
                                  pct > 0 ? "bg-red-100 text-red-700" :
                                  "bg-gray-100 text-gray-400"
                                }`}>{pct}%</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "missing" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Missing Translations — {LANGUAGES.find(l => l.code === selectedLang)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><RefreshCw className="w-6 h-6 animate-spin text-blue-500" /></div>
              ) : missingTranslations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>No missing translations found for this content type and language.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {missingTranslations.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50" data-testid={`missing-${t.contentId}-${t.fieldName}`}>
                      <div>
                        <span className="font-medium text-sm">{t.contentId}</span>
                        <Badge variant="outline" className="ml-2 text-xs">{t.fieldName}</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`btn-edit-${t.contentId}`}
                        onClick={() => {
                          setEditorContentId(t.contentId);
                          setEditorField(t.fieldName);
                          setEditorOriginal("");
                          setEditorTranslation(t.translatedText || "");
                          setEditorStatus("auto");
                          setActiveTab("editor");
                        }}
                      >
                        <Pencil className="w-3 h-3 mr-1" /> Translate
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "stale" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><RefreshCw className="w-5 h-5 text-orange-500" /> Stale Translations — {LANGUAGES.find(l => l.code === selectedLang)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><RefreshCw className="w-6 h-6 animate-spin text-blue-500" /></div>
              ) : staleTranslations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>No stale translations found. All translations are up to date.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {staleTranslations.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg border-orange-200 bg-orange-50" data-testid={`stale-${t.contentId}-${t.fieldName}`}>
                      <div>
                        <span className="font-medium text-sm">{t.contentId}</span>
                        <Badge variant="outline" className="ml-2 text-xs">{t.fieldName}</Badge>
                        <Badge className="ml-2 text-xs bg-orange-100 text-orange-700">{t.translationStatus}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditorContentId(t.contentId);
                            setEditorField(t.fieldName);
                            setEditorTranslation(t.translatedText || "");
                            setEditorStatus(t.translationStatus);
                            setActiveTab("editor");
                          }}
                        >
                          <Pencil className="w-3 h-3 mr-1" /> Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "bulk" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500" /> Bulk Translation Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Create Placeholders</h3>
                    <p className="text-xs text-gray-600 mb-3">Create empty translation entries for all missing content in {LANGUAGES.find(l => l.code === selectedLang)?.name}.</p>
                    <Button
                      data-testid="btn-create-placeholders"
                      size="sm"
                      onClick={() => handleBulkAction("create_placeholders")}
                      disabled={bulkRunning}
                    >
                      <FileText className="w-4 h-4 mr-1" /> Create Placeholders
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Flag Stale Translations</h3>
                    <p className="text-xs text-gray-600 mb-3">Scan for translations where the English source has changed.</p>
                    <Button
                      data-testid="btn-flag-stale"
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("flag_stale")}
                      disabled={bulkRunning}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" /> Flag Stale
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Export CSV</h3>
                    <p className="text-xs text-gray-600 mb-3">Download translations as CSV for human translators or agencies.</p>
                    <Button
                      data-testid="btn-export-csv"
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("export_csv")}
                      disabled={bulkRunning}
                    >
                      <Download className="w-4 h-4 mr-1" /> Export CSV
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Import Translated CSV</h3>
                    <p className="text-xs text-gray-600 mb-3">Upload completed translations. Will not overwrite human-reviewed entries.</p>
                    <label className="cursor-pointer">
                      <Button size="sm" variant="outline" asChild disabled={bulkRunning}>
                        <span><Upload className="w-4 h-4 mr-1" /> Import CSV</span>
                      </Button>
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        data-testid="input-import-csv"
                        onChange={handleCsvImport}
                      />
                    </label>
                  </div>
                </div>

                {bulkProgress > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 font-medium">Action completed</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Mark as Human Reviewed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Mark all auto-translated entries for the selected language and content type as human reviewed.</p>
                <Button
                  data-testid="btn-mark-reviewed"
                  size="sm"
                  onClick={async () => {
                    await fetch("/api/translations/bulk", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        action: "mark_reviewed",
                        contentType: selectedType,
                        targetLanguage: selectedLang,
                      }),
                    });
                    fetchTranslations(selectedType, selectedLang);
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Mark All as Reviewed
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "editor" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ArrowLeftRight className="w-5 h-5 text-blue-500" /> Side-by-Side Translation Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content ID</label>
                  <Input
                    data-testid="input-content-id"
                    value={editorContentId}
                    onChange={e => setEditorContentId(e.target.value)}
                    placeholder="e.g., lesson-slug or UUID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                  <select
                    data-testid="select-field"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={editorField}
                    onChange={e => setEditorField(e.target.value)}
                  >
                    {(FIELDS_BY_TYPE[selectedType] || ["title"]).map(f => (
                      <option key={f} value={f}>{f.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  data-testid="btn-load-original"
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/translations/${selectedType}/${editorContentId}`);
                      if (res.ok) {
                        const data = await res.json();
                        const existing = data.find((t: TranslationRecord) => t.languageCode === selectedLang && t.fieldName === editorField);
                        if (existing) {
                          setEditorTranslation(existing.translatedText || "");
                          setEditorStatus(existing.translationStatus || "auto");
                        }
                      }
                    } catch (e) { console.error(e); }
                  }}
                >
                  <Eye className="w-3 h-3 mr-1" /> Load Existing
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">English (Source)</label>
                  <textarea
                    data-testid="textarea-original"
                    className="w-full border rounded-md p-3 text-sm min-h-[300px] bg-gray-50"
                    value={editorOriginal}
                    readOnly
                    placeholder="Load the original English content..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Words: {editorOriginal.split(/\s+/).filter(Boolean).length}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {LANGUAGES.find(l => l.code === selectedLang)?.name} (Target)
                  </label>
                  <textarea
                    data-testid="textarea-translation"
                    className="w-full border rounded-md p-3 text-sm min-h-[300px]"
                    value={editorTranslation}
                    onChange={e => setEditorTranslation(e.target.value)}
                    placeholder="Enter translation..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Words: {editorTranslation.split(/\s+/).filter(Boolean).length}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="status"
                      value="auto"
                      checked={editorStatus === "auto"}
                      onChange={() => setEditorStatus("auto")}
                    />
                    Auto-translated
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="status"
                      value="human_reviewed"
                      checked={editorStatus === "human_reviewed"}
                      onChange={() => setEditorStatus("human_reviewed")}
                    />
                    Human Reviewed
                  </label>
                </div>
                <Button data-testid="btn-save-translation" onClick={saveTranslation}>
                  Save Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
