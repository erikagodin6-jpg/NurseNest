import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Globe, Search, RefreshCw, CheckCircle2, AlertTriangle, XCircle, Eye } from "lucide-react";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", fr: "French", es: "Spanish", fil: "Filipino", hi: "Hindi",
  zh: "Chinese", ar: "Arabic", ko: "Korean", pt: "Portuguese", pa: "Punjabi",
  vi: "Vietnamese", ht: "Haitian Creole", ur: "Urdu", ja: "Japanese", fa: "Farsi",
};

type CoverageSummary = {
  locale: string;
  percentage: number;
  translatedKeys: number;
  totalKeys: number;
  readiness: string;
  isIndexable: boolean;
};

type CoverageResult = {
  locale: string;
  route: string;
  totalKeys: number;
  translatedKeys: number;
  percentage: number;
  readiness: string;
  isIndexable: boolean;
  untranslatedKeys: string[];
};

export default function AdminTranslationCoverage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [summary, setSummary] = useState<CoverageSummary[]>([]);
  const [details, setDetails] = useState<CoverageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(95);
  const [indexableLocales, setIndexableLocales] = useState<string[]>([]);

  useEffect(() => {
    if (!user || user.tier !== "admin") {
      navigate("/");
      return;
    }
    loadSummary();
  }, [user]);

  async function loadSummary() {
    setLoading(true);
    try {
      const token = localStorage.getItem("nursenest-admin-token");
      const res = await fetch("/api/admin/translation-coverage/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setSummary(data.summary || []);
      setThreshold(data.threshold || 95);
    } catch (e) {
      console.error("Failed to load summary:", e);
    }
    setLoading(false);
  }

  async function loadDetails(locale?: string) {
    setLoading(true);
    try {
      const token = localStorage.getItem("nursenest-admin-token");
      const params = new URLSearchParams();
      if (locale) params.set("locale", locale);
      const res = await fetch(`/api/admin/translation-coverage?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setDetails(data.results || []);
      setIndexableLocales(data.indexableLocales || []);
      setThreshold(data.threshold || 95);
    } catch (e) {
      console.error("Failed to load details:", e);
    }
    setLoading(false);
  }

  function getReadinessBadge(readiness: string) {
    switch (readiness) {
      case "Ready for Indexing":
        return <Badge className="bg-green-100 text-green-800" data-testid="badge-ready"><CheckCircle2 className="w-3 h-3 mr-1" />Ready</Badge>;
      case "Partial Translation":
        return <Badge className="bg-yellow-100 text-yellow-800" data-testid="badge-partial"><AlertTriangle className="w-3 h-3 mr-1" />Partial</Badge>;
      case "Draft Translation":
        return <Badge className="bg-orange-100 text-orange-800" data-testid="badge-draft"><AlertTriangle className="w-3 h-3 mr-1" />Draft</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800" data-testid="badge-hidden"><XCircle className="w-3 h-3 mr-1" />Hidden</Badge>;
    }
  }

  const filteredSummary = summary.filter(s =>
    !searchQuery || LANGUAGE_NAMES[s.locale]?.toLowerCase().includes(searchQuery.toLowerCase()) || s.locale.includes(searchQuery.toLowerCase())
  );

  const filteredDetails = details.filter(d =>
    !searchQuery || d.route.includes(searchQuery.toLowerCase()) || d.locale.includes(searchQuery.toLowerCase())
  );

  if (!user || user.tier !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Translation Coverage Dashboard" description="Admin translation coverage analysis" noindex />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2" data-testid="text-page-title">
              <Globe className="w-6 h-6 text-primary" />
              Translation Coverage Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Translation completeness by locale. Pages below {threshold}% are excluded from indexing.
            </p>
          </div>
          <Button onClick={loadSummary} variant="outline" size="sm" disabled={loading} data-testid="button-refresh">
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search locales or routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>

        {!selectedLocale ? (
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Locale Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Locale</th>
                        <th className="text-left py-2 px-3">Language</th>
                        <th className="text-right py-2 px-3">Keys</th>
                        <th className="text-right py-2 px-3">Translated</th>
                        <th className="text-right py-2 px-3">Coverage</th>
                        <th className="text-center py-2 px-3">Status</th>
                        <th className="text-center py-2 px-3">Indexable</th>
                        <th className="text-center py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSummary.map((s) => (
                        <tr key={s.locale} className="border-b hover:bg-gray-50" data-testid={`row-locale-${s.locale}`}>
                          <td className="py-2 px-3 font-mono text-xs">{s.locale}</td>
                          <td className="py-2 px-3">{LANGUAGE_NAMES[s.locale] || s.locale}</td>
                          <td className="py-2 px-3 text-right">{s.totalKeys}</td>
                          <td className="py-2 px-3 text-right">{s.translatedKeys}</td>
                          <td className="py-2 px-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${s.percentage >= threshold ? "bg-green-500" : s.percentage >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${Math.min(s.percentage, 100)}%` }}
                                />
                              </div>
                              <span className="font-mono text-xs">{s.percentage}%</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">{getReadinessBadge(s.readiness)}</td>
                          <td className="py-2 px-3 text-center">
                            {s.isIndexable
                              ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                              : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setSelectedLocale(s.locale); loadDetails(s.locale); }}
                              data-testid={`button-details-${s.locale}`}
                            >
                              <Eye className="w-3 h-3 mr-1" />Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm" onClick={() => { setSelectedLocale(null); setDetails([]); }} data-testid="button-back">
                Back to Overview
              </Button>
              <Badge variant="outline">{LANGUAGE_NAMES[selectedLocale] || selectedLocale} ({selectedLocale})</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Route-Level Coverage for {LANGUAGE_NAMES[selectedLocale] || selectedLocale}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Route</th>
                        <th className="text-right py-2 px-3">Coverage</th>
                        <th className="text-center py-2 px-3">Status</th>
                        <th className="text-center py-2 px-3">Indexable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDetails.map((d, i) => (
                        <tr key={`${d.locale}-${d.route}-${i}`} className="border-b hover:bg-gray-50" data-testid={`row-route-${i}`}>
                          <td className="py-2 px-3 font-mono text-xs">{d.route}</td>
                          <td className="py-2 px-3 text-right">
                            <span className="font-mono text-xs">{d.percentage}%</span>
                          </td>
                          <td className="py-2 px-3 text-center">{getReadinessBadge(d.readiness)}</td>
                          <td className="py-2 px-3 text-center">
                            {d.isIndexable
                              ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                              : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
