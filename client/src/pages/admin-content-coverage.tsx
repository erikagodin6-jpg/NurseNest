import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RefreshCw,
  ArrowLeft,
  BarChart3,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Database,
  Layers,
  Settings,
  Play,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function fmt(n: number): string {
  return n.toLocaleString();
}

function pct(current: number, target: number): number {
  if (target <= 0) return 100;
  return Math.min(100, Math.round((current / target) * 100));
}

function ProgressBar({ current, target, label }: { current: number; target: number; label: string }) {
  const p = pct(current, target);
  const color = p >= 100 ? "bg-green-500" : p >= 60 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span>{fmt(current)} / {fmt(target)} ({p}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(p, 100)}%` }} />
      </div>
    </div>
  );
}

export default function AdminContentCoverage() {
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<"overview" | "targets" | "generate" | "report">("overview");
  const [showDeficits, setShowDeficits] = useState(true);
  const [maxBatches, setMaxBatches] = useState(5);
  const [questionOnly, setQuestionOnly] = useState(false);
  const [flashcardOnly, setFlashcardOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["nursing-tiers", "deficits"]));

  const toggleSection = (key: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const { data: analysis, isLoading: analysisLoading, isError: analysisError, refetch: refetchAnalysis } = useQuery({
    queryKey: ["content-coverage-analysis"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-coverage/analysis");
      if (!res.ok) throw new Error("Failed to load coverage analysis");
      return res.json();
    },
    retry: 1,
  });

  const { data: targetsData, isLoading: targetsLoading, refetch: refetchTargets } = useQuery({
    queryKey: ["content-coverage-targets"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-coverage/targets");
      if (!res.ok) throw new Error("Failed to load targets");
      return res.json();
    },
    retry: 1,
  });

  const { data: lastReport } = useQuery({
    queryKey: ["content-coverage-last-report"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/content-coverage/last-report");
      if (!res.ok) throw new Error("Failed to load report");
      return res.json();
    },
    retry: 1,
  });

  const [editTargets, setEditTargets] = useState<any>(null);

  const saveTargetsMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/content-coverage/targets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save targets");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-coverage-targets"] });
      queryClient.invalidateQueries({ queryKey: ["content-coverage-analysis"] });
      setEditTargets(null);
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await adminFetch("/api/admin/content-coverage/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Generation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-coverage-analysis"] });
      queryClient.invalidateQueries({ queryKey: ["content-coverage-last-report"] });
    },
  });

  const isLoading = analysisLoading || targetsLoading;

  if (isLoading && !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" data-testid="loading-spinner" />
      </div>
    );
  }

  if (analysisError && !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-lg font-medium" data-testid="text-error-message">Failed to load coverage analysis</p>
            <p className="text-sm text-gray-500">There was an error fetching the coverage data. Please try again.</p>
            <Button onClick={() => refetchAnalysis()} data-testid="button-retry-analysis">
              <RefreshCw className="w-4 h-4 mr-2" /> Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const nursing = analysis?.nursing || {};
  const allied = analysis?.allied || {};
  const flashcards = analysis?.flashcards || {};
  const deficits = analysis?.deficits || [];
  const summary = analysis?.summary || {};
  const targets = editTargets || targetsData?.targets || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-gray-500 hover:text-gray-700" data-testid="link-back-admin">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-bold" data-testid="text-page-title">Content Coverage Analyzer</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => refetchAnalysis()} data-testid="button-refresh">
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
          </div>
        </div>

        <div className="flex bg-white rounded-lg border p-0.5 w-fit">
          {(["overview", "targets", "generate", "report"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                activeSection === tab ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
              data-testid={`tab-${tab}`}
            >
              {tab === "overview" && "Coverage Overview"}
              {tab === "targets" && "Targets"}
              {tab === "generate" && "Auto-Generate"}
              {tab === "report" && "Last Report"}
            </button>
          ))}
        </div>

        {activeSection === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="section-summary-cards">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Database className="w-4 h-4" />
                    <span>Nursing Questions</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600" data-testid="text-nursing-total">{fmt(nursing.totalQuestions || 0)}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Database className="w-4 h-4" />
                    <span>Allied Health Questions</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600" data-testid="text-allied-total">{fmt(allied.totalQuestions || 0)}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-teal-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Total Flashcards</span>
                  </div>
                  <p className="text-2xl font-bold text-teal-600" data-testid="text-flashcard-total">{fmt((flashcards.nursingTotal || 0) + (flashcards.alliedTotal || 0))}</p>
                </CardContent>
              </Card>
              <Card className={`border-l-4 ${(summary.coveragePercent || 0) >= 80 ? "border-l-green-500" : "border-l-orange-500"}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Target className="w-4 h-4" />
                    <span>Overall Coverage</span>
                  </div>
                  <p className={`text-2xl font-bold ${(summary.coveragePercent || 0) >= 80 ? "text-green-600" : "text-orange-600"}`} data-testid="text-coverage-pct">
                    {summary.coveragePercent || 0}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{fmt(summary.totalDeficits || 0)} deficit areas</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <button onClick={() => toggleSection("nursing-tiers")} className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Questions by Tier
                  </CardTitle>
                  {expandedSections.has("nursing-tiers") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </CardHeader>
              {expandedSections.has("nursing-tiers") && (
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="section-tier-breakdown">
                    {Object.entries(nursing.byTier || {}).map(([tier, count]: [string, any]) => (
                      <div key={tier} className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1 uppercase">{tier}</p>
                        <p className="font-bold text-xl" data-testid={`text-tier-${tier}`}>{fmt(count)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <button onClick={() => toggleSection("nursing-body")} className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Nursing - By Body System
                  </CardTitle>
                  {expandedSections.has("nursing-body") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </CardHeader>
              {expandedSections.has("nursing-body") && (
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto" data-testid="section-body-systems">
                    {Object.entries(nursing.byBodySystem || {})
                      .sort(([, a]: any, [, b]: any) => b.deficit - a.deficit)
                      .map(([system, data]: [string, any]) => (
                        <ProgressBar key={system} label={system} current={data.count} target={data.target} />
                      ))}
                    {Object.keys(nursing.byBodySystem || {}).length === 0 && (
                      <p className="text-gray-400 text-sm">No body system data available</p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <button onClick={() => toggleSection("allied-career")} className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Allied Health - By Career
                  </CardTitle>
                  {expandedSections.has("allied-career") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </CardHeader>
              {expandedSections.has("allied-career") && (
                <CardContent>
                  <div className="space-y-3" data-testid="section-allied-careers">
                    {Object.entries(allied.byCareer || {})
                      .sort(([, a]: any, [, b]: any) => b.deficit - a.deficit)
                      .map(([career, data]: [string, any]) => (
                        <ProgressBar key={career} label={career} current={data.count} target={data.target} />
                      ))}
                    {Object.keys(allied.byCareer || {}).length === 0 && (
                      <p className="text-gray-400 text-sm">No allied health data available</p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <button onClick={() => toggleSection("difficulty")} className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Difficulty Distribution (Nursing)
                  </CardTitle>
                  {expandedSections.has("difficulty") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </CardHeader>
              {expandedSections.has("difficulty") && (
                <CardContent>
                  <div className="grid grid-cols-5 gap-3" data-testid="section-difficulty">
                    {[1, 2, 3, 4, 5].map(d => {
                      const count = nursing.byDifficulty?.[String(d)] || 0;
                      const total = nursing.totalQuestions || 1;
                      const p = Math.round((count / total) * 100);
                      const labels = ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
                      return (
                        <div key={d} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-xs text-gray-500 mb-1">{labels[d - 1]}</p>
                          <p className="font-bold text-lg">{fmt(count)}</p>
                          <p className="text-xs text-gray-400">{p}%</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                    Target distribution: 30% Easy (1-2), 50% Moderate (3), 20% Hard (4-5)
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <button onClick={() => toggleSection("deficits")} className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" /> Coverage Deficits ({deficits.length})
                  </CardTitle>
                  {expandedSections.has("deficits") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </CardHeader>
              {expandedSections.has("deficits") && (
                <CardContent>
                  {deficits.length === 0 ? (
                    <div className="flex items-center gap-2 text-green-600 p-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>All coverage targets are met!</span>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto" data-testid="list-deficits">
                      {deficits.slice(0, showDeficits ? 50 : 10).map((d: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" data-testid={`deficit-item-${i}`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${d.type === "question" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>
                                {d.type}
                              </span>
                              <span className="text-xs text-gray-500">{d.category}</span>
                            </div>
                            <p className="font-medium text-sm mt-1 truncate">{d.area}</p>
                          </div>
                          <div className="text-right ml-4 flex-shrink-0">
                            <p className="text-sm font-bold text-red-600">-{fmt(d.deficit)}</p>
                            <p className="text-xs text-gray-400">{fmt(d.current)}/{fmt(d.target)}</p>
                          </div>
                        </div>
                      ))}
                      {deficits.length > 10 && !showDeficits && (
                        <button onClick={() => setShowDeficits(true)} className="text-sm text-primary hover:underline" data-testid="button-show-all-deficits">
                          Show all {deficits.length} deficits
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-orange-800">
                    <strong>Summary:</strong> {fmt(summary.totalQuestionsNeeded || 0)} questions and {fmt(summary.totalFlashcardsNeeded || 0)} flashcards needed to reach full coverage.
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {activeSection === "targets" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Coverage Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-gray-700">Nursing Targets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Questions per Body System</label>
                        <Input
                          type="number"
                          value={targets.nursing?.questionsPerBodySystem ?? 300}
                          onChange={e => setEditTargets({
                            ...targets,
                            nursing: { ...(targets.nursing || {}), questionsPerBodySystem: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-nursing-body-system-target"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Questions per Specialty</label>
                        <Input
                          type="number"
                          value={targets.nursing?.questionsPerSpecialty ?? 500}
                          onChange={e => setEditTargets({
                            ...targets,
                            nursing: { ...(targets.nursing || {}), questionsPerSpecialty: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-nursing-specialty-target"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Questions per Subtopic</label>
                        <Input
                          type="number"
                          value={targets.nursing?.questionsPerSubtopic ?? 100}
                          onChange={e => setEditTargets({
                            ...targets,
                            nursing: { ...(targets.nursing || {}), questionsPerSubtopic: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-nursing-subtopic-target"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-gray-700">Allied Health Targets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Questions per Profession</label>
                        <Input
                          type="number"
                          value={targets.allied?.questionsPerProfession ?? 300}
                          onChange={e => setEditTargets({
                            ...targets,
                            allied: { ...(targets.allied || {}), questionsPerProfession: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-allied-profession-target"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Questions per Topic</label>
                        <Input
                          type="number"
                          value={targets.allied?.questionsPerTopic ?? 75}
                          onChange={e => setEditTargets({
                            ...targets,
                            allied: { ...(targets.allied || {}), questionsPerTopic: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-allied-topic-target"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-sm text-gray-700">Flashcard Targets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Cards per Topic</label>
                        <Input
                          type="number"
                          value={targets.flashcards?.cardsPerTopic ?? 25}
                          onChange={e => setEditTargets({
                            ...targets,
                            flashcards: { ...(targets.flashcards || {}), cardsPerTopic: parseInt(e.target.value) || 0 }
                          })}
                          data-testid="input-flashcard-topic-target"
                        />
                      </div>
                    </div>
                  </div>

                  {editTargets && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => saveTargetsMutation.mutate({ targets: editTargets })}
                        disabled={saveTargetsMutation.isPending}
                        data-testid="button-save-targets"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        {saveTargetsMutation.isPending ? "Saving..." : "Save Targets"}
                      </Button>
                      <Button variant="outline" onClick={() => setEditTargets(null)} data-testid="button-cancel-targets">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Disabled Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">
                  Topics listed here are excluded from coverage analysis and auto-generation.
                  Format: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">category:type:name</code>
                </p>
                <div className="space-y-2">
                  {(targetsData?.disabledTopics || []).length === 0 ? (
                    <p className="text-sm text-gray-400">No topics disabled</p>
                  ) : (
                    (targetsData?.disabledTopics || []).map((t: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-mono">{t}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "generate" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Auto-Generate Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                    This will analyze coverage deficits and automatically generate questions and flashcards
                    for topics below their target thresholds. Generated content is saved as drafts for review.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Max Batches</label>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={maxBatches}
                        onChange={e => setMaxBatches(parseInt(e.target.value) || 5)}
                        data-testid="input-max-batches"
                      />
                      <p className="text-xs text-gray-400 mt-1">50 questions or 25 flashcards per batch</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Content Type</label>
                      <div className="space-y-2 mt-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            checked={!questionOnly && !flashcardOnly}
                            onChange={() => { setQuestionOnly(false); setFlashcardOnly(false); }}
                            data-testid="radio-both"
                          />
                          Both Questions & Flashcards
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            checked={questionOnly}
                            onChange={() => { setQuestionOnly(true); setFlashcardOnly(false); }}
                            data-testid="radio-questions-only"
                          />
                          Questions Only
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            checked={flashcardOnly}
                            onChange={() => { setQuestionOnly(false); setFlashcardOnly(true); }}
                            data-testid="radio-flashcards-only"
                          />
                          Flashcards Only
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Topic Filter (optional)</label>
                      <Input
                        placeholder="e.g. Cardiovascular, RRT..."
                        value={topicFilter}
                        onChange={e => setTopicFilter(e.target.value)}
                        data-testid="input-topic-filter"
                      />
                      <p className="text-xs text-gray-400 mt-1">Comma-separated to limit generation</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => generateMutation.mutate({
                        maxBatches,
                        questionOnly,
                        flashcardOnly,
                        topics: topicFilter ? topicFilter.split(",").map(t => t.trim()).filter(Boolean) : undefined,
                      })}
                      disabled={generateMutation.isPending}
                      data-testid="button-trigger-generation"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      {generateMutation.isPending ? "Generating..." : "Start Generation"}
                    </Button>
                  </div>

                  {generateMutation.isPending && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <RefreshCw className="w-5 h-5 animate-spin text-yellow-600" />
                      <span className="text-sm text-yellow-800">Generation in progress. This may take several minutes...</span>
                    </div>
                  )}

                  {generateMutation.isError && (
                    <div className="p-4 bg-red-50 rounded-lg text-sm text-red-700" data-testid="error-generation">
                      Generation failed: {(generateMutation.error as Error)?.message || "Unknown error"}
                    </div>
                  )}

                  {generateMutation.data && (
                    <ReportDisplay report={generateMutation.data} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "report" && (
          <div className="space-y-6">
            {lastReport ? (
              <ReportDisplay report={lastReport} />
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-400 text-center py-8">No generation reports available yet. Run auto-generation to see results here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportDisplay({ report }: { report: any }) {
  if (!report) return null;

  return (
    <Card data-testid="section-report">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Generation Report
          <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
            report.status === "completed" ? "bg-green-100 text-green-700" :
            report.status === "failed" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`} data-testid="text-report-status">
            {report.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="section-report-stats">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Questions Generated</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-q-generated">{report.questionsGenerated || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Questions Accepted</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-q-accepted">{report.questionsAccepted || 0}</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Flashcards Generated</p>
              <p className="text-xl font-bold text-teal-600" data-testid="text-fc-generated">{report.flashcardsGenerated || 0}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Duplicates Skipped</p>
              <p className="text-xl font-bold text-orange-600" data-testid="text-duplicates-skipped">{report.duplicatesSkipped || 0}</p>
            </div>
          </div>

          {report.topicsReachedTarget?.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs font-medium text-green-700 mb-1">Topics Reached Target ({report.topicsReachedTarget.length})</p>
              <div className="flex flex-wrap gap-1">
                {report.topicsReachedTarget.map((t: string, i: number) => (
                  <span key={i} className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
          )}

          {report.topicsBelowTarget?.length > 0 && (
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-xs font-medium text-orange-700 mb-1">Topics Still Below Target ({report.topicsBelowTarget.length})</p>
              <div className="flex flex-wrap gap-1">
                {report.topicsBelowTarget.map((t: string, i: number) => (
                  <span key={i} className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
          )}

          {report.batches?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Batch Details ({report.batches.length})</p>
              <div className="space-y-1 max-h-64 overflow-y-auto" data-testid="list-batches">
                {report.batches.map((batch: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`px-1.5 py-0.5 rounded ${batch.type.includes("Flashcard") ? "bg-teal-100 text-teal-700" : "bg-blue-100 text-blue-700"}`}>
                        {batch.type.includes("Flashcard") ? "FC" : "Q"}
                      </span>
                      <span className="truncate">{batch.topic}</span>
                    </div>
                    <div className="flex gap-3 text-gray-500 flex-shrink-0 ml-2">
                      <span>Gen: {batch.generated}</span>
                      <span className="text-green-600">OK: {batch.accepted}</span>
                      {batch.rejected > 0 && <span className="text-red-600">Rej: {batch.rejected}</span>}
                      {batch.duplicates > 0 && <span className="text-orange-600">Dup: {batch.duplicates}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.error && (
            <div className="p-3 bg-red-50 rounded-lg text-sm text-red-700">
              Error: {report.error}
            </div>
          )}

          <div className="text-xs text-gray-400 pt-2 border-t">
            Started: {report.startedAt ? new Date(report.startedAt).toLocaleString() : "N/A"}
            {report.completedAt && ` | Completed: ${new Date(report.completedAt).toLocaleString()}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
