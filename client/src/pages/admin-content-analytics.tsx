import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, RefreshCw, Copy, Check, Database, BookOpen, FileText, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TierData {
  questions: number;
  flashcardsPublished: number;
  flashcardsReview: number;
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
  imaging: { questions: number; flashcards: number };
  generatedQuestions: number;
  contentItems: Record<string, number>;
  flashcardDecks: number;
  encyclopedia: Array<{ profession: string; count: number }>;
  totals: { questions: number; flashcards: number; lessons: number; blogs: number };
  timestamp: string;
}

const TIER_LABELS: Record<string, string> = {
  rpn: "RPN / LVN",
  rn: "RN",
  np: "Nurse Practitioner",
  rrt: "Respiratory Therapist",
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

export default function AdminContentAnalytics() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content-analytics", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const generateTextReport = (): string => {
    if (!data) return "";
    const lines: string[] = [];
    lines.push("=== NurseNest Content Analytics Report ===");
    lines.push(`Generated: ${new Date(data.timestamp).toLocaleString()}`);
    lines.push("");
    lines.push(`GRAND TOTALS`);
    lines.push(`  Total Questions: ${data.totals.questions.toLocaleString()}`);
    lines.push(`  Total Flashcards: ${data.totals.flashcards.toLocaleString()}`);
    lines.push(`  Flashcard Decks: ${data.flashcardDecks}`);
    lines.push(`  Generated Drafts: ${data.generatedQuestions.toLocaleString()}`);
    lines.push("");
    lines.push("--- NURSING TIERS ---");
    for (const [tier, d] of Object.entries(data.tiers)) {
      const label = TIER_LABELS[tier] || tier.toUpperCase();
      const totalFC = d.flashcardsPublished + d.flashcardsReview;
      const ratio = d.questions > 0 ? ((totalFC / d.questions) * 100).toFixed(0) : "0";
      lines.push(`  ${label}`);
      lines.push(`    Questions: ${d.questions.toLocaleString()}`);
      lines.push(`    Flashcards Published: ${d.flashcardsPublished.toLocaleString()}`);
      lines.push(`    Flashcards Needs Review: ${d.flashcardsReview.toLocaleString()}`);
      lines.push(`    Q-to-FC Ratio: ${ratio}%`);
    }
    lines.push("");
    lines.push("--- ALLIED HEALTH ---");
    for (const [ct, d] of Object.entries(data.allied)) {
      const label = ALLIED_LABELS[ct] || ct;
      const statusStr = Object.entries(d.statuses).map(([s, c]) => `${s}=${c}`).join(", ");
      lines.push(`  ${label}: ${d.published} published, ${d.flashcards} flashcards (${statusStr})`);
    }
    lines.push("");
    lines.push("--- DIAGNOSTIC IMAGING ---");
    lines.push(`  Questions: ${data.imaging.questions}`);
    lines.push(`  Flashcards: ${data.imaging.flashcards}`);
    if (data.encyclopedia.length > 0) {
      lines.push("");
      lines.push("--- ENCYCLOPEDIA ---");
      for (const e of data.encyclopedia) {
        const label = ALLIED_LABELS[e.profession] || e.profession;
        lines.push(`  ${label}: ${e.count} entries`);
      }
    }
    lines.push("");
    lines.push("--- CONTENT ITEMS ---");
    for (const [type, count] of Object.entries(data.contentItems)) {
      lines.push(`  ${type}: ${count}`);
    }
    return lines.join("\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTextReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500" data-testid="loading-indicator">Loading content analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-red-500" data-testid="error-message">Error: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")} data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-1" /> Admin
            </Button>
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-page-title">Content Analytics</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} data-testid="button-copy-report">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy Report"}
            </Button>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} data-testid="button-refresh">
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>

        <div className="text-xs text-slate-400 mb-6" data-testid="text-timestamp">
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            icon={<Database className="w-5 h-5" />}
            label="Total Questions"
            value={data.totals.questions.toLocaleString()}
            testId="card-total-questions"
          />
          <SummaryCard
            icon={<Layers className="w-5 h-5" />}
            label="Total Flashcards"
            value={data.totals.flashcards.toLocaleString()}
            testId="card-total-flashcards"
          />
          <SummaryCard
            icon={<FileText className="w-5 h-5" />}
            label="Flashcard Decks"
            value={String(data.flashcardDecks)}
            testId="card-total-decks"
          />
          <SummaryCard
            icon={<BookOpen className="w-5 h-5" />}
            label="Generated Drafts"
            value={data.generatedQuestions.toLocaleString()}
            testId="card-generated-drafts"
          />
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Nursing Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(data.tiers).map(([tier, d]) => {
            const label = TIER_LABELS[tier] || tier.toUpperCase();
            const totalFC = d.flashcardsPublished + d.flashcardsReview;
            const ratio = d.questions > 0 ? ((totalFC / d.questions) * 100).toFixed(0) : "0";
            return (
              <Card key={tier} data-testid={`card-tier-${tier}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800">{label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Row label="Published Questions" value={d.questions.toLocaleString()} testId={`text-questions-${tier}`} />
                  <Row label="Published Flashcards" value={d.flashcardsPublished.toLocaleString()} testId={`text-fc-published-${tier}`} />
                  <Row label="Needs Review" value={d.flashcardsReview.toLocaleString()} testId={`text-fc-review-${tier}`} />
                  <div className="pt-1 border-t border-slate-100">
                    <Row label="Q-to-FC Ratio" value={`${ratio}%`} testId={`text-ratio-${tier}`} highlight={Number(ratio) < 80} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Allied Health</h2>
        {Object.keys(data.allied).length > 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-8">
            <table className="w-full text-sm" data-testid="table-allied">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-slate-600">Career Type</th>
                  <th className="text-right px-4 py-2 font-medium text-slate-600">Published Questions</th>
                  <th className="text-right px-4 py-2 font-medium text-slate-600">Flashcards</th>
                  <th className="text-right px-4 py-2 font-medium text-slate-600">Status Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.allied).map(([ct, d]) => (
                  <tr key={ct} className="border-t border-slate-100" data-testid={`row-allied-${ct}`}>
                    <td className="px-4 py-2 text-slate-800">{ALLIED_LABELS[ct] || ct}</td>
                    <td className="px-4 py-2 text-right font-mono text-slate-700">{d.published.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right font-mono text-slate-700">{d.flashcards.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex gap-1 justify-end flex-wrap">
                        {Object.entries(d.statuses).map(([status, count]) => (
                          <span key={status} className={`text-xs px-2 py-0.5 rounded ${status === 'published' || status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
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
          <p className="text-slate-500 mb-8 text-sm">No allied health questions found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card data-testid="card-imaging">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">Diagnostic Imaging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Row label="Published Questions" value={String(data.imaging.questions)} testId="text-imaging-questions" />
              <Row label="Published Flashcards" value={String(data.imaging.flashcards)} testId="text-imaging-flashcards" />
            </CardContent>
          </Card>

          {data.encyclopedia.length > 0 && (
            <Card data-testid="card-encyclopedia">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800">Encyclopedia Entries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {data.encyclopedia.map((e) => (
                  <Row
                    key={e.profession}
                    label={ALLIED_LABELS[e.profession] || e.profession}
                    value={String(e.count)}
                    testId={`text-encyclopedia-${e.profession}`}
                  />
                ))}
                <div className="pt-1 border-t border-slate-100">
                  <Row
                    label="Total"
                    value={String(data.encyclopedia.reduce((s, e) => s + e.count, 0))}
                    testId="text-encyclopedia-total"
                    bold
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {Object.keys(data.contentItems).length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Content Items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {Object.entries(data.contentItems).map(([type, count]) => (
                <Card key={type} data-testid={`card-content-${type}`}>
                  <CardContent className="pt-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{type}</div>
                    <div className="text-2xl font-bold text-slate-800 mt-1">{count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Plain Text Report</h2>
        <pre
          className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto"
          data-testid="text-report"
        >
          {generateTextReport()}
        </pre>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, testId }: { icon: React.ReactNode; label: string; value: string; testId: string }) {
  return (
    <Card data-testid={testId}>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 text-slate-500 mb-1">
          {icon}
          <span className="text-xs uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
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
