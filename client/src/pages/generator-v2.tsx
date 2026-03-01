import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, FileDown, ArrowLeft, RefreshCw, Loader2, ShoppingBag, DollarSign, Trash2, Plus, Package, X, Store, Tag, Eye, EyeOff, Download } from "lucide-react";

const THEMES = [
  { id: "soft-clinical", name: "Soft Clinical", primaryColor: "#7c3aed", secondaryColor: "#06b6d4", accentColor: "#f59e0b", coverBg: "#7c3aed" },
  { id: "structured-academic", name: "Structured Academic", primaryColor: "#1e40af", secondaryColor: "#0f766e", accentColor: "#b45309", coverBg: "#1e40af" },
  { id: "bold-modern", name: "Bold Modern", primaryColor: "#dc2626", secondaryColor: "#7c3aed", accentColor: "#eab308", coverBg: "#171717" },
  { id: "minimal-clean", name: "Minimal Clean", primaryColor: "#0f172a", secondaryColor: "#64748b", accentColor: "#0ea5e9", coverBg: "#0f172a" },
  { id: "navy-medical", name: "Navy Medical", primaryColor: "#1e3a5f", secondaryColor: "#2563eb", accentColor: "#10b981", coverBg: "#1e3a5f" },
  { id: "blush-rose", name: "Blush Rose", primaryColor: "#be185d", secondaryColor: "#9333ea", accentColor: "#f59e0b", coverBg: "#be185d" },
  { id: "paper-ink", name: "Paper & Ink", primaryColor: "#292524", secondaryColor: "#57534e", accentColor: "#a16207", coverBg: "#292524" },
  { id: "charcoal-clinical", name: "Charcoal Clinical", primaryColor: "#374151", secondaryColor: "#3b82f6", accentColor: "#14b8a6", coverBg: "#374151" },
];

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

interface StoreProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  tierTarget: string;
  examTarget: string | null;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
}

type ActivePanel = "generator" | "store";

export default function GeneratorV2Page() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const [template, setTemplate] = useState("question_pack");
  const [exam, setExam] = useState("rex-pn");
  const [region, setRegion] = useState("CA");
  const [targetCount, setTargetCount] = useState(250);
  const [chunkSize, setChunkSize] = useState(15);
  const [topic, setTopic] = useState("Cardiac Pathophysiology");
  const [difficulty, setDifficulty] = useState("mixed");
  const [tier, setTier] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("soft-clinical");
  const [exportingPdf, setExportingPdf] = useState<string | null>(null);

  const [generations, setGenerations] = useState<any[]>([]);
  const [activeGenId, setActiveGenId] = useState<string | null>(null);
  const [status, setStatus] = useState<Generation | null>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [questionsPage, setQuestionsPage] = useState(0);
  const [creating, setCreating] = useState(false);
  const [compiling, setCompiling] = useState(false);

  const [activePanel, setActivePanel] = useState<ActivePanel>("generator");
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [storeLoading, setStoreLoading] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [pubTitle, setPubTitle] = useState("");
  const [pubDesc, setPubDesc] = useState("");
  const [pubPrice, setPubPrice] = useState("19.99");
  const [pubCompareAt, setPubCompareAt] = useState("29.99");
  const [pubCategory, setPubCategory] = useState("question-pack");
  const [pubTierTarget, setPubTierTarget] = useState("all");
  const [pubFeatured, setPubFeatured] = useState(false);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editCompareAt, setEditCompareAt] = useState("");
  const [savingPrice, setSavingPrice] = useState(false);

  const [bundleOpen, setBundleOpen] = useState(false);
  const [bundleTitle, setBundleTitle] = useState("");
  const [bundleDesc, setBundleDesc] = useState("");
  const [bundlePrice, setBundlePrice] = useState("39.99");
  const [bundleCompareAt, setBundleCompareAt] = useState("59.99");
  const [bundleCategory, setBundleCategory] = useState("bundle");
  const [bundleGenIds, setBundleGenIds] = useState<string[]>([]);
  const [creatingBundle, setCreatingBundle] = useState(false);

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

  const loadStoreProducts = useCallback(async () => {
    setStoreLoading(true);
    try {
      const res = await adminFetch("/api/admin/shop/products");
      if (res.ok) {
        const data = await res.json();
        setStoreProducts(data);
      }
    } catch {}
    setStoreLoading(false);
  }, []);

  useEffect(() => {
    loadGenerations();
  }, [loadGenerations]);

  useEffect(() => {
    if (activePanel === "store") {
      loadStoreProducts();
    }
  }, [activePanel, loadStoreProducts]);

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
        body: JSON.stringify({ template, exam, region, targetCount, chunkSize, topic, difficulty, tier, themeId: selectedTheme }),
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

  const exportPdf = async (genId: string) => {
    setExportingPdf(genId);
    try {
      const creds = JSON.parse(localStorage.getItem("nursenest-auth") || "{}");
      const res = await fetch(`/api/generator-v2/generations/${genId}/export-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ themeId: selectedTheme, username: creds.username || "", password: creds.password || "" }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `generation-${genId.substring(0, 8)}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast({ title: "PDF exported" });
      } else {
        const err = await res.json().catch(() => ({ error: "Export failed" }));
        toast({ title: "Export Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setExportingPdf(null);
  };

  const openPublishDialog = () => {
    if (!status) return;
    setPubTitle(`${status.topic} - ${status.examTarget?.toUpperCase() || "REx-PN"} Question Pack`);
    setPubDesc(`${status.createdCount} expertly crafted ${status.examTarget?.toUpperCase() || "REx-PN"} practice questions covering ${status.topic}. Includes detailed rationales and clinical pearls.`);
    setPubCategory("question-pack");
    setPubPrice("19.99");
    setPubCompareAt("29.99");
    setPubTierTarget("all");
    setPubFeatured(false);
    setPublishOpen(true);
  };

  const publishToStore = async () => {
    if (!activeGenId) return;
    setPublishing(true);
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/publish`, {
        method: "POST",
        body: JSON.stringify({
          title: pubTitle,
          description: pubDesc,
          priceDollars: pubPrice,
          compareAtDollars: pubCompareAt || undefined,
          category: pubCategory,
          tierTarget: pubTierTarget,
          examTarget: status?.examTarget || undefined,
          featured: pubFeatured,
        }),
      });
      if (res.ok) {
        const product = await res.json();
        toast({ title: "Published to store", description: `Product "${product.title}" is now live` });
        setPublishOpen(false);
        loadStoreProducts();
      } else {
        const err = await res.json();
        toast({ title: "Publish Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setPublishing(false);
  };

  const updateProductPrice = async (productId: string) => {
    setSavingPrice(true);
    try {
      const res = await adminFetch(`/api/admin/shop/products/${productId}/price`, {
        method: "POST",
        body: JSON.stringify({
          priceDollars: editPrice,
          compareAtDollars: editCompareAt || undefined,
        }),
      });
      if (res.ok) {
        toast({ title: "Price updated" });
        setEditingProductId(null);
        loadStoreProducts();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setSavingPrice(false);
  };

  const toggleProductActive = async (product: StoreProduct) => {
    try {
      const res = await adminFetch(`/api/admin/shop/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      if (res.ok) {
        toast({ title: product.isActive ? "Product hidden from store" : "Product visible in store" });
        loadStoreProducts();
      }
    } catch {}
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await adminFetch(`/api/admin/shop/products/${productId}`, {
        method: "DELETE",
        body: JSON.stringify({}),
      });
      if (res.ok) {
        toast({ title: "Product deleted" });
        loadStoreProducts();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const createBundle = async () => {
    setCreatingBundle(true);
    try {
      const res = await adminFetch("/api/generator-v2/bundles", {
        method: "POST",
        body: JSON.stringify({
          title: bundleTitle,
          description: bundleDesc,
          priceDollars: bundlePrice,
          compareAtDollars: bundleCompareAt || undefined,
          category: bundleCategory,
          generationIds: bundleGenIds,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        toast({ title: "Bundle created", description: `${data.totalQuestions} questions across ${data.topics?.length || 0} topics` });
        setBundleOpen(false);
        setBundleGenIds([]);
        loadStoreProducts();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCreatingBundle(false);
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const progressPercent = status ? Math.round((status.createdCount / Math.max(status.targetCount, 1)) * 100) : 0;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500 text-sm">This page is restricted to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="page-generator-v2">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-title">Generator V2</h1>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Chunked Pipeline</span>
          </div>
          <div className="flex gap-1 bg-white rounded-lg border p-0.5" data-testid="panel-switcher">
            <button
              onClick={() => setActivePanel("generator")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${activePanel === "generator" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:text-gray-700"}`}
              data-testid="tab-generator"
            >
              Generator
            </button>
            <button
              onClick={() => setActivePanel("store")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${activePanel === "store" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:text-gray-700"}`}
              data-testid="tab-store"
            >
              <Store className="w-3.5 h-3.5" />
              Store Manager
            </button>
          </div>
        </div>

        {activePanel === "generator" && (
          <div className="grid grid-cols-12 gap-4">
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
                  <label className="text-xs font-medium text-gray-500 block mb-1">Topics</label>
                  <textarea
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm resize-none"
                    placeholder="Enter topics separated by commas (e.g., Cardiac, Respiratory, Neuro)"
                    data-testid="topics-input"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Tier</label>
                  <select value={tier} onChange={e => setTier(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="tier-select">
                    <option value="all">All Tiers</option>
                    <option value="rpn">RPN - Practical Nurse</option>
                    <option value="rn">RN - Registered Nurse</option>
                    <option value="np">NP - Nurse Practitioner</option>
                  </select>
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
                    <Input type="number" min={250} max={1000} value={targetCount} onChange={e => setTargetCount(Number(e.target.value))} className="h-9 text-sm" data-testid="question-count-input" />
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
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTheme(t.id)}
                        className={`p-2 rounded-lg border-2 transition text-center ${selectedTheme === t.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
                        data-testid={`theme-picker-${t.id}`}
                      >
                        <div className="flex justify-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.secondaryColor }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accentColor }} />
                        </div>
                        <span className="text-[10px] text-gray-600 font-medium">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={createGeneration} disabled={creating || !topic} className="w-full" data-testid="button-create">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Generation Job"}
                </Button>
              </div>
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

            <div className="col-span-5 space-y-4" data-testid="section-progress">
              {status ? (
                <>
                  <div className="bg-white rounded-xl border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-gray-700">{status.topic || "Generation"}</h3>
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
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" onClick={runGeneration} disabled={status.isRunning || status.status === "complete"} className="gap-1" data-testid="button-run">
                        <Play className="w-3 h-3" />
                        {status.status === "paused" || status.createdCount > 0 ? "Resume" : "Run"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={pauseGeneration} disabled={!status.isRunning} className="gap-1" data-testid="button-pause">
                        <Pause className="w-3 h-3" />
                        Pause
                      </Button>
                      <Button size="sm" variant="outline" onClick={compileGeneration} disabled={compiling || status.createdCount === 0} className="gap-1" data-testid="button-compile">
                        {compiling ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileDown className="w-3 h-3" />}
                        Compile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => activeGenId && exportPdf(activeGenId)} disabled={exportingPdf !== null || status.createdCount === 0} className="gap-1" data-testid={`export-pdf-button-${activeGenId}`}>
                        {exportingPdf === activeGenId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                        Export PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={openPublishDialog} disabled={status.createdCount === 0} className="gap-1 text-green-700 border-green-200 hover:bg-green-50" data-testid="button-publish">
                        <ShoppingBag className="w-3 h-3" />
                        Publish to Store
                      </Button>
                    </div>
                    {status.lastError && (
                      <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700" data-testid="text-error">{status.lastError}</div>
                    )}
                  </div>

                  {status.distributions && (
                    <div className="bg-white rounded-xl border p-4 space-y-3">
                      <h3 className="font-semibold text-sm text-gray-700">Distributions</h3>
                      <div className="grid grid-cols-2 gap-3">
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

                  <div className="bg-white rounded-xl border p-4 space-y-2">
                    <h3 className="font-semibold text-sm text-gray-700">Recent Events</h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {(status.recentEvents || []).map((ev: any, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-xs py-1 border-b border-gray-50">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${ev.eventType?.includes("error") || ev.eventType?.includes("failed") ? "bg-red-50 text-red-600" : ev.eventType?.includes("saved") || ev.eventType?.includes("completed") || ev.eventType?.includes("published") ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"}`}>
                            {ev.eventType}
                          </span>
                          <span className="text-gray-400 truncate">{ev.payload ? JSON.stringify(ev.payload).substring(0, 100) : ""}</span>
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

            <div className="col-span-4 space-y-4" data-testid="section-questions">
              <div className="bg-white rounded-xl border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-gray-700">Questions {questionsTotal > 0 ? `(${questionsTotal})` : ""}</h3>
                  {questionsTotal > 25 && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" disabled={questionsPage === 0} onClick={() => activeGenId && loadQuestions(activeGenId, questionsPage - 1)} className="text-xs h-7 px-2" data-testid="button-prev-page">Prev</Button>
                      <span className="text-xs text-gray-400 flex items-center px-1">{questionsPage + 1}/{Math.ceil(questionsTotal / 25)}</span>
                      <Button variant="ghost" size="sm" disabled={(questionsPage + 1) * 25 >= questionsTotal} onClick={() => activeGenId && loadQuestions(activeGenId, questionsPage + 1)} className="text-xs h-7 px-2" data-testid="button-next-page">Next</Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {questions.map((q) => (
                    <div key={q.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition" data-testid={`card-question-${q.idx}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-600">Q{q.idx}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${q.type === "MCQ" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{q.type}</span>
                        <span className="text-[10px] text-gray-400">{q.difficulty}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{q.system}</span>
                      </div>
                      <p className="text-xs text-gray-700 line-clamp-3">{q.stem}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {(q.choices || []).slice(0, 4).map((c: any, i: number) => {
                          const label = typeof c === "object" ? c.label : String.fromCharCode(65 + i);
                          const isCorrect = (q.correctAnswers || []).includes(label);
                          return (
                            <span key={i} className={`text-[10px] px-1 py-0.5 rounded ${isCorrect ? "bg-green-50 text-green-700 font-medium" : "bg-gray-50 text-gray-500"}`}>{label}</span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {questions.length === 0 && <p className="text-xs text-gray-400 text-center py-8">No questions generated yet</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === "store" && (
          <div className="space-y-4" data-testid="section-store">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Store Products</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={loadStoreProducts} className="gap-1" data-testid="button-refresh-store">
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setBundleOpen(true); setBundleGenIds([]); setBundleTitle(""); setBundleDesc(""); }} className="gap-1" data-testid="button-new-bundle">
                  <Package className="w-3 h-3" />
                  New Bundle
                </Button>
              </div>
            </div>

            {storeLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-gray-400 animate-spin" /></div>
            ) : (
              <div className="grid gap-3">
                {storeProducts.map((product) => (
                  <div key={product.id} className={`bg-white rounded-xl border p-4 transition ${!product.isActive ? "opacity-60" : ""}`} data-testid={`card-product-${product.id.substring(0, 8)}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-gray-800 truncate">{product.title}</h3>
                          {product.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium shrink-0">Featured</span>}
                          {!product.isActive && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium shrink-0">Hidden</span>}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{product.category}</span>
                          {product.examTarget && <span className="text-gray-400">{product.examTarget}</span>}
                          <span className="text-gray-400">Tier: {product.tierTarget}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {editingProductId === product.id ? (
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-1">
                              <Input
                                type="number"
                                step="0.01"
                                value={editPrice}
                                onChange={e => setEditPrice(e.target.value)}
                                className="h-7 w-24 text-xs"
                                placeholder="Price"
                                data-testid="input-edit-price"
                              />
                              <Input
                                type="number"
                                step="0.01"
                                value={editCompareAt}
                                onChange={e => setEditCompareAt(e.target.value)}
                                className="h-7 w-24 text-xs"
                                placeholder="Compare at"
                                data-testid="input-edit-compare"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Button size="sm" className="h-7 text-xs px-2" onClick={() => updateProductPrice(product.id)} disabled={savingPrice} data-testid="button-save-price">
                                {savingPrice ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setEditingProductId(null)} data-testid="button-cancel-price">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</div>
                            {product.compareAtPrice && (
                              <div className="text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</div>
                            )}
                          </div>
                        )}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => {
                              setEditingProductId(product.id);
                              setEditPrice((product.price / 100).toFixed(2));
                              setEditCompareAt(product.compareAtPrice ? (product.compareAtPrice / 100).toFixed(2) : "");
                            }}
                            data-testid={`button-edit-price-${product.id.substring(0, 8)}`}
                          >
                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => toggleProductActive(product)}
                            data-testid={`button-toggle-${product.id.substring(0, 8)}`}
                          >
                            {product.isActive ? <EyeOff className="w-3.5 h-3.5 text-gray-400" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => { if (confirm(`Delete "${product.title}"? This cannot be undone.`)) deleteProduct(product.id); }}
                            data-testid={`button-delete-${product.id.substring(0, 8)}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {storeProducts.length === 0 && (
                  <div className="bg-white rounded-xl border p-8 text-center">
                    <Store className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No products in the store yet</p>
                    <p className="text-gray-400 text-xs mt-1">Generate questions, then publish them to the store</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {publishOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" data-testid="dialog-publish">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Publish to Store</h2>
              <button onClick={() => setPublishOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Product Title</label>
                <Input value={pubTitle} onChange={e => setPubTitle(e.target.value)} className="text-sm" data-testid="input-pub-title" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
                <textarea value={pubDesc} onChange={e => setPubDesc(e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm resize-none" data-testid="input-pub-desc" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Price ($)</label>
                  <Input type="number" step="0.01" value={pubPrice} onChange={e => setPubPrice(e.target.value)} className="text-sm" data-testid="input-pub-price" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Compare at ($)</label>
                  <Input type="number" step="0.01" value={pubCompareAt} onChange={e => setPubCompareAt(e.target.value)} className="text-sm" data-testid="input-pub-compare" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
                  <select value={pubCategory} onChange={e => setPubCategory(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-pub-category">
                    <option value="question-pack">Question Pack</option>
                    <option value="cram-guide">Cram Guide</option>
                    <option value="study-guide">Study Guide</option>
                    <option value="bundle">Bundle</option>
                    <option value="flashcards">Flashcards</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Tier Target</label>
                  <select value={pubTierTarget} onChange={e => setPubTierTarget(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-pub-tier">
                    <option value="all">All</option>
                    <option value="free">Free</option>
                    <option value="rpn">RPN</option>
                    <option value="rn">RN</option>
                    <option value="np">NP</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={pubFeatured} onChange={e => setPubFeatured(e.target.checked)} className="rounded" data-testid="checkbox-pub-featured" />
                Mark as Featured
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setPublishOpen(false)} data-testid="button-cancel-publish">Cancel</Button>
              <Button onClick={publishToStore} disabled={publishing || !pubTitle || !pubDesc} className="gap-1" data-testid="button-confirm-publish">
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {bundleOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" data-testid="dialog-bundle">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Create Bundle</h2>
              <button onClick={() => setBundleOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Bundle Title</label>
                <Input value={bundleTitle} onChange={e => setBundleTitle(e.target.value)} placeholder="e.g., Complete Cardiac Bundle" className="text-sm" data-testid="input-bundle-title" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
                <textarea value={bundleDesc} onChange={e => setBundleDesc(e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm resize-none" placeholder="Describe what's included in this bundle..." data-testid="input-bundle-desc" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Bundle Price ($)</label>
                  <Input type="number" step="0.01" value={bundlePrice} onChange={e => setBundlePrice(e.target.value)} className="text-sm" data-testid="input-bundle-price" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Compare at ($)</label>
                  <Input type="number" step="0.01" value={bundleCompareAt} onChange={e => setBundleCompareAt(e.target.value)} className="text-sm" data-testid="input-bundle-compare" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
                <select value={bundleCategory} onChange={e => setBundleCategory(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-bundle-category">
                  <option value="bundle">Bundle</option>
                  <option value="question-pack">Question Pack</option>
                  <option value="study-guide">Study Guide</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Include Generations</label>
                <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                  {generations.filter(g => g.status === "complete" && g.createdCount > 0).map((g: any) => (
                    <label key={g.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={bundleGenIds.includes(g.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBundleGenIds([...bundleGenIds, g.id]);
                          } else {
                            setBundleGenIds(bundleGenIds.filter(id => id !== g.id));
                          }
                        }}
                        className="rounded"
                        data-testid={`checkbox-bundle-gen-${g.id.substring(0, 8)}`}
                      />
                      <span className="font-medium text-gray-700">{g.topic || g.template}</span>
                      <span className="text-gray-400 ml-auto">{g.createdCount} questions</span>
                    </label>
                  ))}
                  {generations.filter(g => g.status === "complete" && g.createdCount > 0).length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">No completed generations available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setBundleOpen(false)} data-testid="button-cancel-bundle">Cancel</Button>
              <Button onClick={createBundle} disabled={creatingBundle || !bundleTitle || !bundleDesc} className="gap-1" data-testid="button-confirm-bundle">
                {creatingBundle ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
                Create Bundle
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
