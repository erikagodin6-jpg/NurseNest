import { useState, useEffect, useCallback } from "react";
import { CAREER_CONFIGS } from "@shared/careers";
import {
  Settings, BookOpen, Brain, Zap, BarChart3, FileText,
  ToggleLeft, ToggleRight, Loader2, CheckCircle2, AlertTriangle,
  RefreshCw, ChevronDown, ChevronRight, Target, TrendingUp,
  Filter, Clock, Shield, AlertCircle, ArrowRight, Eye
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging"] as const;

type Tab = "overview" | "generate" | "questions" | "revision" | "analytics" | "blueprints";

interface PipelineStats {
  totalQuestions: number;
  flashcards: number;
  flaggedCount: number;
  pendingRevisions: number;
  domainBreakdown: Record<string, number>;
  difficultyBreakdown: Record<string, number>;
  cognitiveBreakdown: Record<string, number>;
  avgRationaleWords: number;
  rejectionRate: number;
}

interface BatchRun {
  id: string;
  career_type: string;
  requested_count: number;
  generated_count: number;
  accepted_count: number;
  rejected_count: number;
  status: string;
  started_at: string;
  avg_rationale_words: number;
  rejection_reasons: Record<string, number>;
  difficulty_breakdown: Record<string, number>;
  cognitive_breakdown: Record<string, number>;
}

interface RevisionItem {
  id: string;
  question_id: string;
  career_type: string;
  reason: string;
  severity: string;
  status: string;
  stem: string;
  blueprint_category: string;
  difficulty: number;
  cognitive_level: string;
  created_at: string;
}

async function apiFetch(url: string, opts?: RequestInit) {
  const adminId = "d9b0e5b3-83c7-4e08-b6b7-6cf9cc33b225";
  const sep = url.includes("?") ? "&" : "?";
  const res = await fetch(`${url}${sep}adminId=${adminId}`, {
    ...opts,
    headers: { "Content-Type": "application/json", "x-admin-id": adminId, ...(opts?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function PercentBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  return (
    <div className="flex items-center gap-2 text-sm" data-testid={`bar-${label}`}>
      <span className="w-28 text-gray-600 truncate">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, parseFloat(pct))}%` }} />
      </div>
      <span className="w-16 text-right text-gray-700 font-medium">{pct}%</span>
      <span className="w-10 text-right text-xs text-gray-400">{value}</span>
    </div>
  );
}

export default function AlliedAdminPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedCareer, setSelectedCareer] = useState<string>("rrt");
  const [stats, setStats] = useState<Record<string, PipelineStats>>({});
  const [batches, setBatches] = useState<BatchRun[]>([]);
  const [revisionQueue, setRevisionQueue] = useState<RevisionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genDomain, setGenDomain] = useState("");
  const [genSubtopic, setGenSubtopic] = useState("");
  const [genCount, setGenCount] = useState(25);
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);
  const [blueprints, setBlueprints] = useState<any[]>([]);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/allied/pipeline/analytics");
      setStats(data);
    } catch (e: any) {
      console.error("Failed to load stats:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBatches = useCallback(async () => {
    try {
      const data = await apiFetch(`/api/allied/pipeline/batches?careerType=${selectedCareer}`);
      setBatches(data);
    } catch (e: any) {
      console.error("Failed to load batches:", e);
    }
  }, [selectedCareer]);

  const loadRevisionQueue = useCallback(async () => {
    try {
      const data = await apiFetch(`/api/allied/pipeline/revision-queue?careerType=${selectedCareer}`);
      setRevisionQueue(data);
    } catch (e: any) {
      console.error("Failed to load revision queue:", e);
    }
  }, [selectedCareer]);

  const loadBlueprints = useCallback(async () => {
    try {
      const data = await apiFetch(`/api/allied/pipeline/blueprints?careerType=${selectedCareer}`);
      setBlueprints(data);
    } catch (e: any) {
      console.error("Failed to load blueprints:", e);
    }
  }, [selectedCareer]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => {
    if (tab === "generate" || tab === "questions") loadBatches();
    if (tab === "revision") loadRevisionQueue();
    if (tab === "blueprints") loadBlueprints();
  }, [tab, selectedCareer, loadBatches, loadRevisionQueue, loadBlueprints]);

  const handleCreateBlueprint = async () => {
    try {
      await apiFetch("/api/allied/pipeline/blueprints", {
        method: "POST",
        body: JSON.stringify({ careerType: selectedCareer, adminId: "d9b0e5b3-83c7-4e08-b6b7-6cf9cc33b225" }),
      });
      toast({ title: "Blueprint created", description: `New blueprint for ${CAREER_CONFIGS[selectedCareer as keyof typeof CAREER_CONFIGS].shortName}` });
      loadBlueprints();
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  const handleGenerate = async () => {
    if (!genDomain) {
      toast({ title: "Domain required", description: "Select a domain before generating", variant: "destructive" });
      return;
    }
    setGenerating(true);
    try {
      const result = await apiFetch("/api/allied/pipeline/generate", {
        method: "POST",
        body: JSON.stringify({
          careerType: selectedCareer,
          count: genCount,
          domain: genDomain,
          subtopic: genSubtopic || "general",
          adminId: "d9b0e5b3-83c7-4e08-b6b7-6cf9cc33b225",
        }),
      });
      toast({ title: "Batch started", description: `Batch ${result.batchId} generating ${genCount} questions` });
      setTimeout(() => { loadBatches(); loadStats(); }, 5000);
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleCommitBatch = async (batchId: string) => {
    try {
      const result = await apiFetch(`/api/allied/pipeline/commit-batch/${batchId}`, {
        method: "POST",
        body: JSON.stringify({ adminId: "d9b0e5b3-83c7-4e08-b6b7-6cf9cc33b225" }),
      });
      toast({ title: "Batch committed", description: `${result.committed} questions approved, ${result.flashcardsGenerated} flashcards generated` });
      loadBatches();
      loadStats();
    } catch (e: any) {
      toast({ title: "Commit failed", description: e.message, variant: "destructive" });
    }
  };

  const handleResolveRevision = async (id: string, status: string) => {
    try {
      await apiFetch(`/api/allied/pipeline/revision-queue/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status, reviewNotes: "Reviewed by admin", adminId: "d9b0e5b3-83c7-4e08-b6b7-6cf9cc33b225" }),
      });
      toast({ title: "Revision updated" });
      loadRevisionQueue();
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
      </div>
    );
  }

  const career = CAREER_CONFIGS[selectedCareer as keyof typeof CAREER_CONFIGS];
  const careerStats = stats[selectedCareer];
  const totalQuestionsAll = Object.values(stats).reduce((s, c) => s + (c?.totalQuestions || 0), 0);
  const totalFlashcardsAll = Object.values(stats).reduce((s, c) => s + (c?.flashcards || 0), 0);
  const totalFlaggedAll = Object.values(stats).reduce((s, c) => s + (c?.flaggedCount || 0), 0);
  const totalRevisionsAll = Object.values(stats).reduce((s, c) => s + (c?.pendingRevisions || 0), 0);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "generate", label: "Generator", icon: Zap },
    { id: "questions", label: "Questions", icon: BookOpen },
    { id: "revision", label: "Revision Queue", icon: AlertCircle },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "blueprints", label: "Blueprints", icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="allied-admin-page">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-7 h-7 text-teal-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-admin-title">Allied Content Pipeline</h1>
            <p className="text-sm text-gray-500">5-Layer Production System</p>
          </div>
        </div>
        <button onClick={() => { loadStats(); loadBatches(); }} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100" data-testid="button-refresh">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-questions">
          <BookOpen className="w-6 h-6 text-teal-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalQuestionsAll.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Questions</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-flashcards">
          <Brain className="w-6 h-6 text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalFlashcardsAll.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Auto-Flashcards</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-flagged">
          <AlertTriangle className="w-6 h-6 text-amber-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalFlaggedAll}</div>
          <div className="text-sm text-gray-500">Flagged Items</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-revisions">
          <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalRevisionsAll}</div>
          <div className="text-sm text-gray-500">Pending Revisions</div>
        </div>
      </div>

      <div className="flex gap-3 mb-6 items-center">
        <select
          value={selectedCareer}
          onChange={(e) => setSelectedCareer(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          data-testid="select-career"
        >
          {ALLIED_CAREERS.map(id => (
            <option key={id} value={id}>{CAREER_CONFIGS[id].shortName}</option>
          ))}
        </select>
        <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                tab === t.id ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              data-testid={`tab-${t.id}`}
            >
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ALLIED_CAREERS.map(id => {
              const cs = stats[id];
              const c = CAREER_CONFIGS[id];
              return (
                <div key={id} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`career-card-${id}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{c.shortName}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">{cs?.totalQuestions || 0} Qs</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{cs?.flashcards || 0}</div>
                      <div className="text-gray-500">Flashcards</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{cs?.avgRationaleWords || 0}</div>
                      <div className="text-gray-500">Avg Words</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{cs?.rejectionRate || 0}%</div>
                      <div className="text-gray-500">Reject Rate</div>
                    </div>
                  </div>
                  {cs && cs.totalQuestions > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50 space-y-1">
                      {Object.entries(cs.difficultyBreakdown || {}).map(([d, v]) => (
                        <PercentBar key={d} label={`Difficulty ${d}`} value={v} total={cs.totalQuestions} color="bg-teal-400" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "generate" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="generator-panel">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-teal-500" /> Batch Generator -- {career.shortName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Domain (required)</label>
                <select
                  value={genDomain}
                  onChange={(e) => setGenDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  data-testid="select-domain"
                >
                  <option value="">-- Select domain --</option>
                  {career.domains.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subtopic (optional)</label>
                <input
                  type="text"
                  value={genSubtopic}
                  onChange={(e) => setGenSubtopic(e.target.value)}
                  placeholder="e.g., Ventilator Weaning"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  data-testid="input-subtopic"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Batch Size (25-100)</label>
                <input
                  type="number"
                  value={genCount}
                  onChange={(e) => setGenCount(Math.max(25, Math.min(100, parseInt(e.target.value) || 25)))}
                  min={25}
                  max={100}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  data-testid="input-batch-size"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !genDomain}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  data-testid="button-generate"
                >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {generating ? "Generating..." : "Generate Batch"}
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 space-y-1">
              <p><Shield className="w-3 h-3 inline mr-1" />Validation gates: rationale min 600 words, similarity threshold 0.80, cognitive mix enforced</p>
              <p><Target className="w-3 h-3 inline mr-1" />Blueprint-governed: difficulty/cognitive/domain distribution from active blueprint</p>
              <p><Brain className="w-3 h-3 inline mr-1" />Auto-flashcards: 1-3 cards generated per question on commit</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="batch-history">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" /> Batch History
            </h3>
            {batches.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No batches yet for {career.shortName}</p>
            ) : (
              <div className="space-y-2">
                {batches.map(b => {
                  const isExpanded = expandedBatch === b.id;
                  const statusColor = b.status === "completed" ? "bg-green-50 text-green-700" :
                    b.status === "running" ? "bg-blue-50 text-blue-700" :
                    b.status === "committed" ? "bg-purple-50 text-purple-700" :
                    "bg-red-50 text-red-700";
                  return (
                    <div key={b.id} className="border border-gray-100 rounded-lg">
                      <button
                        onClick={() => setExpandedBatch(isExpanded ? null : b.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                        data-testid={`batch-${b.id}`}
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>{b.status}</span>
                          <span className="text-sm text-gray-700">
                            {b.accepted_count}/{b.generated_count} accepted
                            {b.rejected_count > 0 && <span className="text-red-500 ml-1">({b.rejected_count} rejected)</span>}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(b.started_at).toLocaleString()}</span>
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                          <div className="grid grid-cols-4 gap-3 text-center text-xs">
                            <div><div className="text-lg font-bold">{b.requested_count}</div><div className="text-gray-500">Requested</div></div>
                            <div><div className="text-lg font-bold">{b.generated_count}</div><div className="text-gray-500">Generated</div></div>
                            <div><div className="text-lg font-bold text-green-600">{b.accepted_count}</div><div className="text-gray-500">Accepted</div></div>
                            <div><div className="text-lg font-bold text-red-500">{b.rejected_count}</div><div className="text-gray-500">Rejected</div></div>
                          </div>
                          {b.avg_rationale_words > 0 && (
                            <div className="text-xs text-gray-500">Avg rationale: {Math.round(b.avg_rationale_words)} words</div>
                          )}
                          {b.rejection_reasons && Object.keys(b.rejection_reasons).length > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-600 mb-1">Rejection reasons:</div>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(b.rejection_reasons).map(([reason, count]) => (
                                  <span key={reason} className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded-full">{reason}: {count as number}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {b.difficulty_breakdown && Object.keys(b.difficulty_breakdown).length > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-600 mb-1">Difficulty:</div>
                              <div className="flex gap-2">
                                {Object.entries(b.difficulty_breakdown).map(([d, c]) => (
                                  <span key={d} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">L{d}: {c as number}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {b.status === "completed" && (
                            <button
                              onClick={() => handleCommitBatch(b.id)}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 flex items-center gap-1.5"
                              data-testid={`commit-${b.id}`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Commit Batch + Auto-Generate Flashcards
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "questions" && (
        <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="questions-panel">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-500" /> Question Bank -- {career.shortName}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {careerStats?.totalQuestions || 0} questions in bank.
            Use the Generator tab to create new batches with blueprint governance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(careerStats?.domainBreakdown || {}).map(([domain, count]) => (
              <div key={domain} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-900">{count}</div>
                <div className="text-xs text-gray-500 truncate">{domain}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "revision" && (
        <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="revision-panel">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" /> Revision Queue -- {career.shortName}
          </h3>
          {revisionQueue.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No items in revision queue</p>
          ) : (
            <div className="space-y-3">
              {revisionQueue.map(item => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-4" data-testid={`revision-${item.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 line-clamp-2">{item.stem || "No stem available"}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{item.blueprint_category}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">D{item.difficulty}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{item.cognitive_level}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.severity === "high" ? "bg-red-50 text-red-700" :
                          item.severity === "medium" ? "bg-amber-50 text-amber-700" :
                          "bg-blue-50 text-blue-700"
                        }`}>{item.severity}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Reason: {item.reason}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleResolveRevision(item.id, "resolved")}
                        className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs hover:bg-green-100"
                        data-testid={`resolve-${item.id}`}
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleResolveRevision(item.id, "dismissed")}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs hover:bg-gray-200"
                        data-testid={`dismiss-${item.id}`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="analytics-panel">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-500" /> Pipeline Analytics -- {career.shortName}
            </h3>
            {!careerStats || careerStats.totalQuestions === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No data yet. Generate questions first.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">Domain Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(careerStats.domainBreakdown).sort(([,a],[,b]) => b - a).map(([domain, count]) => (
                      <PercentBar key={domain} label={domain} value={count} total={careerStats.totalQuestions} color="bg-teal-400" />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">Difficulty Distribution</h4>
                    <div className="space-y-2">
                      {[1,2,3,4,5].map(d => (
                        <PercentBar
                          key={d}
                          label={`Level ${d}`}
                          value={careerStats.difficultyBreakdown[d] || 0}
                          total={careerStats.totalQuestions}
                          color={d <= 2 ? "bg-green-400" : d === 3 ? "bg-yellow-400" : "bg-red-400"}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">Cognitive Level Distribution</h4>
                    <div className="space-y-2">
                      {["recall", "application", "analysis"].map(level => (
                        <PercentBar
                          key={level}
                          label={level.charAt(0).toUpperCase() + level.slice(1)}
                          value={careerStats.cognitiveBreakdown[level] || 0}
                          total={careerStats.totalQuestions}
                          color={level === "recall" ? "bg-blue-400" : level === "application" ? "bg-purple-400" : "bg-orange-400"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{careerStats.avgRationaleWords}</div>
                      <div className="text-xs text-gray-500">Avg Rationale Words</div>
                      <div className={`text-xs mt-1 ${careerStats.avgRationaleWords >= 600 ? "text-green-600" : "text-red-500"}`}>
                        {careerStats.avgRationaleWords >= 600 ? "Meets minimum" : "Below 600 threshold"}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{careerStats.rejectionRate}%</div>
                      <div className="text-xs text-gray-500">Rejection Rate</div>
                      <div className={`text-xs mt-1 ${careerStats.rejectionRate <= 20 ? "text-green-600" : "text-amber-600"}`}>
                        {careerStats.rejectionRate <= 20 ? "Healthy" : "Review prompt quality"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "blueprints" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="blueprints-panel">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-500" /> Blueprint Governance -- {career.shortName}
              </h3>
              <button
                onClick={handleCreateBlueprint}
                className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-medium hover:bg-teal-700"
                data-testid="button-create-blueprint"
              >
                + New Blueprint Version
              </button>
            </div>
            {blueprints.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-3">No blueprint yet for {career.shortName}</p>
                <p className="text-xs text-gray-400">Create one to enable batch generation with governance.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blueprints.map((bp: any) => {
                  const domains = typeof bp.domains === "string" ? JSON.parse(bp.domains) : bp.domains;
                  const diffDist = typeof bp.difficulty_distribution === "string" ? JSON.parse(bp.difficulty_distribution) : bp.difficulty_distribution;
                  const cogDist = typeof bp.cognitive_distribution === "string" ? JSON.parse(bp.cognitive_distribution) : bp.cognitive_distribution;
                  const allowedTypes = typeof bp.allowed_question_types === "string" ? JSON.parse(bp.allowed_question_types) : bp.allowed_question_types;
                  return (
                    <div key={bp.id} className={`border rounded-lg p-4 ${bp.is_active ? "border-teal-200 bg-teal-50/30" : "border-gray-100"}`} data-testid={`blueprint-${bp.id}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">v{bp.version}</span>
                          {bp.is_active && <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">Active</span>}
                        </div>
                        <span className="text-xs text-gray-400">{new Date(bp.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <div className="font-medium text-gray-600 mb-1">Domains ({Object.keys(domains).length})</div>
                          <div className="space-y-0.5">
                            {Object.entries(domains).map(([d, w]) => (
                              <div key={d} className="flex justify-between text-gray-500">
                                <span className="truncate">{d}</span>
                                <span>{(Number(w) * 100).toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-600 mb-1">Difficulty Distribution</div>
                          {Object.entries(diffDist).map(([d, w]) => (
                            <div key={d} className="flex justify-between text-gray-500">
                              <span>Level {d}</span>
                              <span>{(Number(w) * 100).toFixed(0)}%</span>
                            </div>
                          ))}
                          <div className="font-medium text-gray-600 mt-2 mb-1">Cognitive Targets</div>
                          {Object.entries(cogDist).map(([level, range]: [string, any]) => (
                            <div key={level} className="flex justify-between text-gray-500">
                              <span className="capitalize">{level}</span>
                              <span>{Math.round(range.min * 100)}-{Math.round(range.max * 100)}%</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="font-medium text-gray-600 mb-1">Allowed Question Types</div>
                          <div className="flex flex-wrap gap-1">
                            {allowedTypes.map((t: string) => (
                              <span key={t} className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Threshold Configuration</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-500 mb-1">Similarity Threshold</div>
                <div className="text-lg font-bold text-gray-900">0.80</div>
                <div className="text-gray-400">Reject duplicates above</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-500 mb-1">Min Rationale Words</div>
                <div className="text-lg font-bold text-gray-900">600</div>
                <div className="text-gray-400">Hard fail below</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-500 mb-1">Max Recall %</div>
                <div className="text-lg font-bold text-gray-900">30%</div>
                <div className="text-gray-400">Per batch cap</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-500 mb-1">Min Analysis %</div>
                <div className="text-lg font-bold text-gray-900">20%</div>
                <div className="text-gray-400">Per batch floor</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              To adjust thresholds, edit the constants at the top of server/allied-pipeline.ts:
              SIMILARITY_THRESHOLD, MIN_RATIONALE_WORDS, and DEFAULT_COGNITIVE_DIST.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
