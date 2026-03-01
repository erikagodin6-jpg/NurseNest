import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, FileDown, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";

function adminFetch(url: string, options?: RequestInit) {
  const creds = JSON.parse(localStorage.getItem("nursenest-auth") || "{}");
  const username = creds.username || "";
  const password = creds.password || "";

  if (!options || options.method === "GET" || !options.method) {
    const sep = url.includes("?") ? "&" : "?";
    return fetch(`${url}${sep}username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
      ...options,
      credentials: "include",
    });
  }

  const body = options.body ? JSON.parse(options.body as string) : {};
  return fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify({ ...body, username, password }),
    credentials: "include",
  });
}

interface Generation {
  id: string;
  template: string;
  status: string;
  topic: string;
  examTarget: string;
  region: string;
  targetCount: number;
  createdCount: number;
  chunkSize: number;
  lastError: string | null;
  distributions: any;
  recentEvents: any[];
  isRunning: boolean;
  startedAt: string | null;
  completedAt: string | null;
}

interface QuestionItem {
  id: string;
  idx: number;
  type: string;
  difficulty: string;
  system: string;
  stem: string;
  choices: any[];
  correctAnswers: string[];
  examPearl: string;
}

export default function GeneratorV2Page() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const [template, setTemplate] = useState("question_pack");
  const [exam, setExam] = useState("rex-pn");
  const [region, setRegion] = useState("CA");
  const [targetCount, setTargetCount] = useState(50);
  const [chunkSize, setChunkSize] = useState(15);
  const [topic, setTopic] = useState("Cardiac Pathophysiology");
  const [difficulty, setDifficulty] = useState("mixed");

  const [generations, setGenerations] = useState<any[]>([]);
  const [activeGenId, setActiveGenId] = useState<string | null>(null);
  const [status, setStatus] = useState<Generation | null>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [questionsPage, setQuestionsPage] = useState(0);
  const [creating, setCreating] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadGenerations = useCallback(async () => {
    try {
      const res = await adminFetch("/api/generator-v2/generations");
      if (res.ok) {
        const data = await res.json();
        setGenerations(data);
      }
    } catch {}
  }, []);

  const loadStatus = useCallback(async (id: string) => {
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${id}/status`);
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {}
  }, []);

  const loadQuestions = useCallback(async (id: string, page: number = 0) => {
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${id}/questions?offset=${page * 25}&limit=25`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions);
        setQuestionsTotal(data.total);
        setQuestionsPage(page);
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadGenerations();
  }, [loadGenerations]);

  useEffect(() => {
    if (activeGenId) {
      loadStatus(activeGenId);
      loadQuestions(activeGenId, 0);
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(() => {
        loadStatus(activeGenId);
        loadQuestions(activeGenId, questionsPage);
      }, 3000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [activeGenId]);

  useEffect(() => {
    if (status && !status.isRunning && (status.status === "complete" || status.status === "failed" || status.status === "paused")) {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
  }, [status]);

  const createGeneration = async () => {
    setCreating(true);
    try {
      const res = await adminFetch("/api/generator-v2/generations", {
        method: "POST",
        body: JSON.stringify({ template, exam, region, targetCount, chunkSize, topic, difficulty }),
      });
      if (res.ok) {
        const gen = await res.json();
        setActiveGenId(gen.id);
        toast({ title: "Generation created", description: `ID: ${gen.id.substring(0, 8)}...` });
        loadGenerations();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCreating(false);
  };

  const runGeneration = async () => {
    if (!activeGenId) return;
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/run`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (res.ok) {
        toast({ title: "Generation started" });
        setTimeout(() => loadStatus(activeGenId), 1000);
        if (!pollRef.current) {
          pollRef.current = setInterval(() => {
            loadStatus(activeGenId);
            loadQuestions(activeGenId, questionsPage);
          }, 3000);
        }
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const pauseGeneration = async () => {
    if (!activeGenId) return;
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/pause`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (res.ok) {
        toast({ title: "Generation paused" });
        loadStatus(activeGenId);
      }
    } catch {}
  };

  const compileGeneration = async () => {
    if (!activeGenId) return;
    setCompiling(true);
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/compile`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (res.ok) {
        const data = await res.json();
        toast({ title: "Compiled", description: `${data.totalPages} pages generated` });
      } else {
        const err = await res.json();
        toast({ title: "Compile Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCompiling(false);
  };

  const progressPercent = status ? Math.round((status.createdCount / Math.max(status.targetCount, 1)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50" data-testid="page-generator-v2">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-title">Generator V2</h1>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Chunked Pipeline</span>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* LEFT: Configuration */}
          <div className="col-span-3 space-y-4" data-testid="section-config">
            <div className="bg-white rounded-xl border p-4 space-y-3">
              <h3 className="font-semibold text-sm text-gray-700">Configuration</h3>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Template</label>
                <select value={template} onChange={e => setTemplate(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-template">
                  <option value="question_pack">Question Pack</option>
                  <option value="cram_guide">Cram Guide</option>
                  <option value="hybrid">Hybrid (Content + QBank)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Topic</label>
                <Input value={topic} onChange={e => setTopic(e.target.value)} className="h-9 text-sm" data-testid="input-topic" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Exam</label>
                  <select value={exam} onChange={e => setExam(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-xs" data-testid="select-exam">
                    <option value="rex-pn">REx-PN (CA)</option>
                    <option value="nclex-pn">NCLEX-PN</option>
                    <option value="nclex-rn">NCLEX-RN</option>
                    <option value="np">NP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Region</label>
                  <select value={region} onChange={e => setRegion(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-xs" data-testid="select-region">
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Target Count</label>
                  <Input type="number" min={5} max={1000} value={targetCount} onChange={e => setTargetCount(Number(e.target.value))} className="h-9 text-sm" data-testid="input-target-count" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Chunk Size</label>
                  <Input type="number" min={5} max={25} value={chunkSize} onChange={e => setChunkSize(Number(e.target.value))} className="h-9 text-sm" data-testid="input-chunk-size" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-difficulty">
                  <option value="mixed">Mixed (30/50/20)</option>
                  <option value="moderate">Mostly Moderate</option>
                  <option value="hard">Mostly Hard</option>
                  <option value="very_challenging">Very Challenging</option>
                </select>
              </div>

              <Button onClick={createGeneration} disabled={creating || !topic} className="w-full" data-testid="button-create">
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Generation Job"}
              </Button>
            </div>

            {/* Previous generations */}
            <div className="bg-white rounded-xl border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-700">Previous Jobs</h3>
                <Button variant="ghost" size="sm" onClick={loadGenerations} data-testid="button-refresh-jobs">
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {generations.map((g: any) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveGenId(g.id)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition ${activeGenId === g.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}
                    data-testid={`button-job-${g.id.substring(0, 8)}`}
                  >
                    <div className="font-medium text-gray-700 truncate">{g.topic || g.template}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${g.status === "complete" ? "bg-green-100 text-green-700" : g.status === "running" ? "bg-blue-100 text-blue-700" : g.status === "failed" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                        {g.status}
                      </span>
                      <span className="text-gray-400">{g.createdCount}/{g.targetCount}</span>
                    </div>
                  </button>
                ))}
                {generations.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No jobs yet</p>}
              </div>
            </div>
          </div>

          {/* CENTER: Progress + Distributions */}
          <div className="col-span-5 space-y-4" data-testid="section-progress">
            {status ? (
              <>
                <div className="bg-white rounded-xl border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-700">
                      {status.topic || "Generation"}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.status === "complete" ? "bg-green-100 text-green-700" : status.status === "running" ? "bg-blue-100 text-blue-700" : status.status === "failed" ? "bg-red-100 text-red-700" : status.status === "paused" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`} data-testid="text-status">
                      {status.isRunning ? "Running" : status.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{status.createdCount} / {status.targetCount} questions</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden" data-testid="progress-bar">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={runGeneration}
                      disabled={status.isRunning || status.status === "complete"}
                      className="gap-1"
                      data-testid="button-run"
                    >
                      <Play className="w-3 h-3" />
                      {status.status === "paused" || status.createdCount > 0 ? "Resume" : "Run"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={pauseGeneration}
                      disabled={!status.isRunning}
                      className="gap-1"
                      data-testid="button-pause"
                    >
                      <Pause className="w-3 h-3" />
                      Pause
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={compileGeneration}
                      disabled={compiling || status.createdCount === 0}
                      className="gap-1"
                      data-testid="button-compile"
                    >
                      {compiling ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileDown className="w-3 h-3" />}
                      Compile
                    </Button>
                  </div>

                  {status.lastError && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700" data-testid="text-error">
                      {status.lastError}
                    </div>
                  )}
                </div>

                {/* Distributions */}
                {status.distributions && (
                  <div className="bg-white rounded-xl border p-4 space-y-3">
                    <h3 className="font-semibold text-sm text-gray-700">Distributions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {/* By Type */}
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">By Type</p>
                        {Object.entries(status.distributions.byType || {}).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-2 text-xs mb-1">
                            <span className="w-12 text-gray-600">{k}</span>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${((v as number) / Math.max(status.createdCount, 1)) * 100}%` }} />
                            </div>
                            <span className="w-8 text-right text-gray-500">{v as number}</span>
                          </div>
                        ))}
                      </div>
                      {/* By Difficulty */}
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">By Difficulty</p>
                        {Object.entries(status.distributions.byDifficulty || {}).map(([k, v]) => (
                          <div key={k} className="flex items-center gap-2 text-xs mb-1">
                            <span className="w-20 text-gray-600 truncate">{k}</span>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${((v as number) / Math.max(status.createdCount, 1)) * 100}%` }} />
                            </div>
                            <span className="w-8 text-right text-gray-500">{v as number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* By System */}
                    {status.distributions.bySystem && Object.keys(status.distributions.bySystem).length > 0 && (
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">By System</p>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {Object.entries(status.distributions.bySystem || {}).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([k, v]) => (
                            <div key={k} className="flex items-center gap-2 text-xs">
                              <span className="w-20 text-gray-600 truncate">{k}</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-400 rounded-full" style={{ width: `${((v as number) / Math.max(status.createdCount, 1)) * 100}%` }} />
                              </div>
                              <span className="w-6 text-right text-gray-400">{v as number}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Events */}
                <div className="bg-white rounded-xl border p-4 space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700">Recent Events</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {(status.recentEvents || []).map((ev: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs py-1 border-b border-gray-50">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${ev.eventType?.includes("error") || ev.eventType?.includes("failed") ? "bg-red-50 text-red-600" : ev.eventType?.includes("saved") || ev.eventType?.includes("completed") ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"}`}>
                          {ev.eventType}
                        </span>
                        <span className="text-gray-400 truncate">
                          {ev.payload ? JSON.stringify(ev.payload).substring(0, 100) : ""}
                        </span>
                      </div>
                    ))}
                    {(!status.recentEvents || status.recentEvents.length === 0) && (
                      <p className="text-xs text-gray-400 text-center py-2">No events yet</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border p-8 text-center">
                <p className="text-gray-400 text-sm">Select or create a generation job to see progress</p>
              </div>
            )}
          </div>

          {/* RIGHT: Questions Preview */}
          <div className="col-span-4 space-y-4" data-testid="section-questions">
            <div className="bg-white rounded-xl border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-700">
                  Questions {questionsTotal > 0 ? `(${questionsTotal})` : ""}
                </h3>
                {questionsTotal > 25 && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={questionsPage === 0}
                      onClick={() => activeGenId && loadQuestions(activeGenId, questionsPage - 1)}
                      className="text-xs h-7 px-2"
                      data-testid="button-prev-page"
                    >
                      Prev
                    </Button>
                    <span className="text-xs text-gray-400 flex items-center px-1">
                      {questionsPage + 1}/{Math.ceil(questionsTotal / 25)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={(questionsPage + 1) * 25 >= questionsTotal}
                      onClick={() => activeGenId && loadQuestions(activeGenId, questionsPage + 1)}
                      className="text-xs h-7 px-2"
                      data-testid="button-next-page"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {questions.map((q) => (
                  <div key={q.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition" data-testid={`card-question-${q.idx}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-600">Q{q.idx}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${q.type === "MCQ" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                        {q.type}
                      </span>
                      <span className="text-[10px] text-gray-400">{q.difficulty}</span>
                      <span className="text-[10px] text-gray-400 ml-auto">{q.system}</span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3">{q.stem}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(q.choices || []).slice(0, 4).map((c: any, i: number) => {
                        const label = typeof c === "object" ? c.label : String.fromCharCode(65 + i);
                        const isCorrect = (q.correctAnswers || []).includes(label);
                        return (
                          <span key={i} className={`text-[10px] px-1 py-0.5 rounded ${isCorrect ? "bg-green-50 text-green-700 font-medium" : "bg-gray-50 text-gray-500"}`}>
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {questions.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-8">No questions generated yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
