import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, FileDown, ArrowLeft, RefreshCw, Loader2, ShoppingBag, DollarSign, Trash2, Package, X, Store, Eye, EyeOff, Download, Edit3, Check, XCircle, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Archive, RotateCcw, Zap } from "lucide-react";

const THEMES = [
  { id: "soft-clinical", name: "Soft Clinical", primaryColor: "#7c3aed", secondaryColor: "#06b6d4", accentColor: "#f59e0b", coverBg: "#7c3aed" },
  { id: "structured-academic", name: "Structured Academic", primaryColor: "#1e40af", secondaryColor: "#0f766e", accentColor: "#b45309", coverBg: "#1e40af" },
  { id: "bold-modern", name: "Bold Modern", primaryColor: "#dc2626", secondaryColor: "#7c3aed", accentColor: "#eab308", coverBg: "#171717" },
  { id: "minimal-clean", name: "Minimal Clean", primaryColor: "#0f172a", secondaryColor: "#64748b", accentColor: "#0ea5e9", coverBg: "#0f172a" },
  { id: "navy-medical", name: "Navy Medical", primaryColor: "#1e3a5f", secondaryColor: "#2563eb", accentColor: "#10b981", coverBg: "#1e3a5f" },
  { id: "blush-rose", name: "Blush Rose", primaryColor: "#be185d", secondaryColor: "#9333ea", accentColor: "#f59e0b", coverBg: "#be185d" },
  { id: "paper-ink", name: "Paper & Ink", primaryColor: "#292524", secondaryColor: "#57534e", accentColor: "#a16207", coverBg: "#292524" },
  { id: "charcoal-clinical", name: "Charcoal Clinical", primaryColor: "#374151", secondaryColor: "#3b82f6", accentColor: "#14b8a6", coverBg: "#374151" },
  { id: "pastel-lavender", name: "Pastel Lavender", primaryColor: "#a78bfa", secondaryColor: "#c4b5fd", accentColor: "#ddd6fe", coverBg: "#7c3aed" },
  { id: "pastel-mint", name: "Pastel Mint", primaryColor: "#6ee7b7", secondaryColor: "#a7f3d0", accentColor: "#d1fae5", coverBg: "#059669" },
  { id: "pastel-peach", name: "Pastel Peach", primaryColor: "#fdba74", secondaryColor: "#fed7aa", accentColor: "#ffedd5", coverBg: "#ea580c" },
  { id: "pastel-sky", name: "Pastel Sky", primaryColor: "#7dd3fc", secondaryColor: "#bae6fd", accentColor: "#e0f2fe", coverBg: "#0284c7" },
  { id: "pastel-blush", name: "Pastel Blush", primaryColor: "#fda4af", secondaryColor: "#fecdd3", accentColor: "#ffe4e6", coverBg: "#e11d48" },
  { id: "mono-slate", name: "Mono Slate", primaryColor: "#475569", secondaryColor: "#94a3b8", accentColor: "#cbd5e1", coverBg: "#1e293b" },
  { id: "mono-graphite", name: "Mono Graphite", primaryColor: "#404040", secondaryColor: "#737373", accentColor: "#a3a3a3", coverBg: "#171717" },
  { id: "mono-silver", name: "Mono Silver", primaryColor: "#6b7280", secondaryColor: "#9ca3af", accentColor: "#d1d5db", coverBg: "#374151" },
  { id: "mono-steel", name: "Mono Steel", primaryColor: "#52525b", secondaryColor: "#a1a1aa", accentColor: "#d4d4d8", coverBg: "#27272a" },
  { id: "mono-fog", name: "Mono Fog", primaryColor: "#78716c", secondaryColor: "#a8a29e", accentColor: "#d6d3d1", coverBg: "#292524" },
];

function adminFetch(url: string, options?: RequestInit) {
  const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
  const username = creds.username || "";
  const password = creds.password || "";
  const storedUser = JSON.parse(localStorage.getItem("nursenest-user") || "{}");
  const adminId = storedUser?.id || "";

  if (!options || options.method === "GET" || !options.method) {
    const sep = url.includes("?") ? "&" : "?";
    const params = username && password
      ? `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      : `adminId=${encodeURIComponent(adminId)}`;
    return fetch(`${url}${sep}${params}`, { ...options, credentials: "include" });
  }

  const body = options.body ? JSON.parse(options.body as string) : {};
  if (username && password) { body.username = username; body.password = password; }
  else { body.adminId = adminId; }
  return fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(body),
    credentials: "include",
  });
}

function sanitizeTopic(input: string): string {
  return input.replace(/\r?\n+/g, ", ").replace(/\s+/g, " ").trim().slice(0, 160);
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
  scenario: string;
  choices: any[];
  correctAnswers: string[];
  rationale: any;
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
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("mixed");
  const [tier, setTier] = useState("rpn");
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
  const [pubThemeId, setPubThemeId] = useState("soft-clinical");
  const [pubSeoTitle, setPubSeoTitle] = useState("");
  const [pubSeoDesc, setPubSeoDesc] = useState("");
  const [pubSeoKeywords, setPubSeoKeywords] = useState("");
  const [autoListing, setAutoListing] = useState(false);

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

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [editStem, setEditStem] = useState("");
  const [editChoices, setEditChoices] = useState<any[]>([]);
  const [editCorrect, setEditCorrect] = useState<string[]>([]);
  const [editRationale, setEditRationale] = useState("");
  const [editPearl, setEditPearl] = useState("");
  const [savingQuestion, setSavingQuestion] = useState(false);

  const [showThemes, setShowThemes] = useState(false);

  const [archivedIds, setArchivedIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("nursenest-archived-gens") || "[]"); } catch { return []; }
  });
  const [showArchived, setShowArchived] = useState(false);
  const [publishOnComplete, setPublishOnComplete] = useState(false);
  const [presetPrice, setPresetPrice] = useState("19.99");
  const [presetCompareAt, setPresetCompareAt] = useState("29.99");
  const [runningIds, setRunningIds] = useState<Set<string>>(new Set());
  const multiPollRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadGenerations = useCallback(async () => {
    try {
      const res = await adminFetch("/api/generator-v2/generations");
      if (res.ok) setGenerations(await res.json());
    } catch {}
  }, []);

  const loadStatus = useCallback(async (id: string) => {
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${id}/status`);
      if (res.ok) setStatus(await res.json());
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
      if (res.ok) setStoreProducts(await res.json());
    } catch {}
    setStoreLoading(false);
  }, []);

  useEffect(() => { loadGenerations(); }, [loadGenerations]);
  useEffect(() => { if (activePanel === "store") loadStoreProducts(); }, [activePanel, loadStoreProducts]);

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
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [activeGenId]);

  useEffect(() => {
    if (status && !status.isRunning && (status.status === "complete" || status.status === "failed" || status.status === "paused")) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    }
  }, [status]);

  const createGeneration = async () => {
    const safeTopic = sanitizeTopic(topic);
    if (!safeTopic) {
      toast({ title: "Topic required", description: "Enter at least one topic label.", variant: "destructive" });
      return;
    }
    if (topic.includes("\n") || topic.length > 200) {
      toast({ title: "Topics must be short labels", description: "Use comma-separated topics only. Put long rules in the Instructions field.", variant: "destructive" });
      return;
    }
    setCreating(true);
    try {
      const res = await adminFetch("/api/generator-v2/generations", {
        method: "POST",
        body: JSON.stringify({
          template, exam, region, targetCount, chunkSize,
          topic: safeTopic,
          instructions: instructions || undefined,
          difficulty, tier,
          themeId: selectedTheme,
        }),
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
        method: "POST", body: JSON.stringify({}),
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
        method: "POST", body: JSON.stringify({}),
      });
      if (res.ok) { toast({ title: "Generation paused" }); loadStatus(activeGenId); }
    } catch {}
  };

  const compileGeneration = async () => {
    if (!activeGenId) return;
    setCompiling(true);
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/compile`, {
        method: "POST", body: JSON.stringify({}),
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
      const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
      const storedUser = JSON.parse(localStorage.getItem("nursenest-user") || "{}");
      const authFields = (creds.username && creds.password)
        ? { username: creds.username, password: creds.password }
        : { adminId: storedUser?.id || "" };
      const res = await fetch(`/api/generator-v2/generations/${genId}/export-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ themeId: selectedTheme, ...authFields }),
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
    const templateLabel = template === "premium_exam_pack" ? "Premium Exam Pack" : template === "ngn_case_pack" ? "NGN Case Pack" : "Question Pack";
    setPubTitle(`${status.topic} - ${status.examTarget?.toUpperCase() || "REx-PN"} ${templateLabel}`);
    setPubDesc(`${status.createdCount} expertly crafted ${status.examTarget?.toUpperCase() || "REx-PN"} practice questions covering ${status.topic}. Includes detailed rationales, clinical pearls, and exam strategies.`);
    setPubCategory(template === "ngn_case_pack" ? "case-pack" : "question-pack");
    const count = status.createdCount;
    if (count >= 250) { setPubPrice("29.99"); setPubCompareAt("59.99"); }
    else if (count >= 100) { setPubPrice("14.99"); setPubCompareAt("29.99"); }
    else { setPubPrice("9.99"); setPubCompareAt("19.99"); }
    setPubTierTarget("all");
    setPubFeatured(false);
    setPubThemeId(selectedTheme);
    setPubSeoTitle(`${status.topic} - ${status.examTarget?.toUpperCase() || "REx-PN"} Practice Questions | NurseNest`);
    setPubSeoDesc(`${status.createdCount} expertly crafted practice questions for ${status.examTarget?.toUpperCase() || "REx-PN"} nursing exam preparation covering ${status.topic}. Includes detailed rationales and clinical pearls.`);
    setPubSeoKeywords(`nursing exam prep, ${status.topic.toLowerCase()}, ${status.examTarget || "nursing"}, practice questions, NCLEX, REx-PN, study guide`);
    setPublishOpen(true);
  };

  const generateAutoListing = async () => {
    if (!status) return;
    setAutoListing(true);
    try {
      const res = await adminFetch("/api/generator-v2/auto-listing", {
        method: "POST",
        body: JSON.stringify({
          topic: status.topic,
          examTarget: status.examTarget,
          questionCount: status.createdCount,
          template,
          tier,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.title) setPubTitle(data.title);
        if (data.description) setPubDesc(data.description);
        if (data.price) setPubPrice(data.price);
        if (data.compareAt) setPubCompareAt(data.compareAt);
        toast({ title: "Listing generated" });
      } else {
        toast({ title: "Auto-listing failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Auto-listing failed", variant: "destructive" });
    }
    setAutoListing(false);
  };

  const publishToStore = async () => {
    if (!activeGenId) return;
    setPublishing(true);
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/publish-with-pdf`, {
        method: "POST",
        body: JSON.stringify({
          title: pubTitle, description: pubDesc,
          priceDollars: pubPrice, compareAtDollars: pubCompareAt || undefined,
          category: pubCategory, tierTarget: pubTierTarget,
          examTarget: status?.examTarget || undefined, featured: pubFeatured,
          themeId: pubThemeId,
          seoTitle: pubSeoTitle || undefined,
          seoDescription: pubSeoDesc || undefined,
          seoKeywords: pubSeoKeywords || undefined,
        }),
      });
      if (res.ok) {
        const product = await res.json();
        toast({ title: "Published to store with PDF", description: `"${product.title}" is live with ${product.pdfPages} pages + preview` });
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
        body: JSON.stringify({ priceDollars: editPrice, compareAtDollars: editCompareAt || undefined }),
      });
      if (res.ok) { toast({ title: "Price updated" }); setEditingProductId(null); loadStoreProducts(); }
      else { const err = await res.json(); toast({ title: "Error", description: err.error, variant: "destructive" }); }
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    setSavingPrice(false);
  };

  const toggleProductActive = async (product: StoreProduct) => {
    try {
      const res = await adminFetch(`/api/admin/shop/products/${product.id}`, {
        method: "PUT", body: JSON.stringify({ isActive: !product.isActive }),
      });
      if (res.ok) { toast({ title: product.isActive ? "Product hidden" : "Product visible" }); loadStoreProducts(); }
    } catch {}
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await adminFetch(`/api/admin/shop/products/${productId}`, { method: "DELETE", body: JSON.stringify({}) });
      if (res.ok) { toast({ title: "Product deleted" }); loadStoreProducts(); }
      else { const err = await res.json(); toast({ title: "Error", description: err.error, variant: "destructive" }); }
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const createBundle = async () => {
    setCreatingBundle(true);
    try {
      const res = await adminFetch("/api/generator-v2/bundles", {
        method: "POST",
        body: JSON.stringify({
          title: bundleTitle, description: bundleDesc,
          priceDollars: bundlePrice, compareAtDollars: bundleCompareAt || undefined,
          category: bundleCategory, generationIds: bundleGenIds,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        toast({ title: "Bundle created", description: `${data.totalQuestions} questions across ${data.topics?.length || 0} topics` });
        setBundleOpen(false); setBundleGenIds([]); loadStoreProducts();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    setCreatingBundle(false);
  };

  const archiveGeneration = (id: string) => {
    const updated = [...archivedIds, id];
    setArchivedIds(updated);
    localStorage.setItem("nursenest-archived-gens", JSON.stringify(updated));
    if (activeGenId === id) { setActiveGenId(null); setStatus(null); setQuestions([]); }
    toast({ title: "Moved to archive" });
  };

  const unarchiveGeneration = (id: string) => {
    const updated = archivedIds.filter(a => a !== id);
    setArchivedIds(updated);
    localStorage.setItem("nursenest-archived-gens", JSON.stringify(updated));
    toast({ title: "Restored from archive" });
  };

  const runMultiGeneration = async (id: string) => {
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${id}/run`, {
        method: "POST", body: JSON.stringify({}),
      });
      if (res.ok) {
        setRunningIds(prev => new Set([...prev, id]));
        toast({ title: "Generation started", description: `Job ${id.substring(0, 8)}...` });
        const pollId = setInterval(async () => {
          try {
            const sRes = await adminFetch(`/api/generator-v2/generations/${id}/status`);
            if (sRes.ok) {
              const sData = await sRes.json();
              if (activeGenId === id) setStatus(sData);
              if (!sData.isRunning && (sData.status === "complete" || sData.status === "failed" || sData.status === "paused")) {
                clearInterval(pollId);
                multiPollRef.current.delete(id);
                setRunningIds(prev => { const n = new Set(prev); n.delete(id); return n; });
                loadGenerations();
                if (sData.status === "complete" && publishOnComplete) {
                  autoPublishGeneration(id, sData);
                }
              }
            }
          } catch {}
        }, 3000);
        multiPollRef.current.set(id, pollId);
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const autoPublishGeneration = async (genId: string, genStatus: Generation) => {
    try {
      const templateLabel = template === "premium_exam_pack" ? "Premium Exam Pack" : template === "ngn_case_pack" ? "NGN Case Pack" : "Question Pack";
      const autoTitle = `${genStatus.topic} - ${genStatus.examTarget?.toUpperCase() || "REx-PN"} ${templateLabel}`;
      const autoDesc = `${genStatus.createdCount} expertly crafted ${genStatus.examTarget?.toUpperCase() || "REx-PN"} practice questions covering ${genStatus.topic}. Includes detailed rationales, clinical pearls, and exam strategies.`;
      const res = await adminFetch(`/api/generator-v2/generations/${genId}/publish-with-pdf`, {
        method: "POST",
        body: JSON.stringify({
          title: autoTitle, description: autoDesc,
          priceDollars: presetPrice, compareAtDollars: presetCompareAt || undefined,
          category: template === "ngn_case_pack" ? "case-pack" : "question-pack",
          tierTarget: tier, examTarget: genStatus.examTarget || undefined,
          featured: false, themeId: selectedTheme,
        }),
      });
      if (res.ok) {
        const product = await res.json();
        toast({ title: "Auto-published to store", description: `"${product.title}" is now live` });
        loadStoreProducts();
      } else {
        toast({ title: "Auto-publish failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Auto-publish failed", variant: "destructive" });
    }
  };

  const openQuestionEditor = (q: QuestionItem) => {
    setEditingQuestion(q);
    setEditStem(q.stem);
    setEditChoices(q.choices || []);
    setEditCorrect(q.correctAnswers || []);
    setEditRationale(typeof q.rationale === "object" ? q.rationale?.correctReasoning || "" : q.rationale || "");
    setEditPearl(q.examPearl || "");
    setEditDrawerOpen(true);
  };

  const saveQuestionEdit = async () => {
    if (!editingQuestion || !activeGenId) return;
    setSavingQuestion(true);
    try {
      const res = await adminFetch(`/api/generator-v2/generations/${activeGenId}/questions/${editingQuestion.id}`, {
        method: "PUT",
        body: JSON.stringify({
          stem: editStem,
          choices: editChoices,
          correctAnswers: editCorrect,
          rationale: { correctReasoning: editRationale, incorrectBreakdown: {}, keyPathophysiology: "", nursingImplication: "" },
          examPearl: editPearl,
        }),
      });
      if (res.ok) {
        toast({ title: "Question updated" });
        setEditDrawerOpen(false);
        loadQuestions(activeGenId, questionsPage);
      } else {
        const err = await res.json();
        toast({ title: "Save failed", description: err.error, variant: "destructive" });
      }
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    setSavingQuestion(false);
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const progressPercent = status ? Math.round((status.createdCount / Math.max(status.targetCount, 1)) * 100) : 0;
  const bundleSelectedGens = generations.filter(g => bundleGenIds.includes(g.id));
  const bundleTotalQ = bundleSelectedGens.reduce((s: number, g: any) => s + (g.createdCount || 0), 0);
  const bundleTopics = [...new Set(bundleSelectedGens.map((g: any) => g.topic).filter(Boolean))];

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2" data-testid="text-access-denied">Access Denied</h2>
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
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-title">Exam Pack Builder</h1>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">V2</span>
          </div>
          <div className="flex gap-1 bg-white rounded-lg border p-0.5" data-testid="panel-switcher">
            <button onClick={() => setActivePanel("generator")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${activePanel === "generator" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:text-gray-700"}`} data-testid="tab-generator">Generator</button>
            <button onClick={() => setActivePanel("store")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1.5 ${activePanel === "store" ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:text-gray-700"}`} data-testid="tab-store">
              <Store className="w-3.5 h-3.5" /> Store Manager
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
                    <option value="premium_exam_pack">Premium Exam Pack</option>
                    <option value="cram_guide">Cram Guide</option>
                    <option value="hybrid">Hybrid (Content + QBank)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Topics</label>
                  <Input
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    maxLength={160}
                    className="h-9 text-sm"
                    placeholder="e.g., Cardiac, Respiratory, Neuro"
                    data-testid="topics-input"
                  />
                  <span className="text-[10px] text-gray-400">Short labels only, comma-separated (max 160 chars)</span>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Extra Instructions (optional)</label>
                  <textarea
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm resize-none"
                    placeholder="Additional rules for AI (e.g., focus on pediatric scenarios, emphasize pharmacology calculations)"
                    data-testid="instructions-input"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Tier</label>
                  <select value={tier} onChange={e => setTier(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="tier-select">
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
                  <button onClick={() => setShowThemes(!showThemes)} className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1 w-full">
                    Theme: {THEMES.find(t => t.id === selectedTheme)?.name || selectedTheme}
                    {showThemes ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
                  </button>
                  {showThemes && (
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => { setSelectedTheme(t.id); setShowThemes(false); }}
                          className={`p-1.5 rounded-lg border-2 transition text-center ${selectedTheme === t.id ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
                          data-testid={`theme-picker-${t.id}`}
                        >
                          <div className="flex justify-center gap-0.5 mb-0.5">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.secondaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accentColor }} />
                          </div>
                          <span className="text-[9px] text-gray-600 font-medium leading-none">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {(() => {
                  const theme = THEMES.find(t => t.id === selectedTheme);
                  return theme ? (
                    <div className="rounded-lg border overflow-hidden" data-testid="theme-preview-panel">
                      <div className="h-20 relative flex flex-col justify-end p-2" style={{ backgroundColor: theme.coverBg }}>
                        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: theme.accentColor, opacity: 0.9 }} />
                        <span className="text-white text-[11px] font-bold opacity-95">NurseNest</span>
                        <span className="text-white text-[8px] opacity-60">Exam Prep</span>
                      </div>
                      <div className="p-2 bg-white border-t">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.primaryColor }} title="Primary" />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.secondaryColor }} title="Secondary" />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.accentColor }} title="Accent" />
                          <div className="w-4 h-4 rounded border" style={{ backgroundColor: theme.coverBg }} title="Cover" />
                        </div>
                        <p className="text-[9px] text-gray-400">{theme.name} - Cover &amp; accent preview</p>
                      </div>
                    </div>
                  ) : null;
                })()}
                {instructions && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-[10px] font-medium text-blue-700 mb-0.5">Prompt Summary</p>
                    <p className="text-[10px] text-blue-600">Topics: {sanitizeTopic(topic)}</p>
                    <p className="text-[10px] text-blue-600 truncate">Instructions: {instructions.substring(0, 80)}...</p>
                  </div>
                )}
                <div className="border-t pt-3 mt-1 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer" data-testid="toggle-publish-on-complete">
                    <input type="checkbox" checked={publishOnComplete} onChange={e => setPublishOnComplete(e.target.checked)} className="rounded" />
                    <Zap className="w-3 h-3 text-amber-500" /> Publish when finished
                  </label>
                  {publishOnComplete && (
                    <div className="grid grid-cols-2 gap-2 pl-5">
                      <div>
                        <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Price ($)</label>
                        <Input type="number" step="0.01" value={presetPrice} onChange={e => setPresetPrice(e.target.value)} className="h-7 text-xs" data-testid="input-preset-price" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-gray-400 block mb-0.5">Compare at ($)</label>
                        <Input type="number" step="0.01" value={presetCompareAt} onChange={e => setPresetCompareAt(e.target.value)} className="h-7 text-xs" data-testid="input-preset-compare" />
                      </div>
                    </div>
                  )}
                </div>
                <Button onClick={createGeneration} disabled={creating || !topic.trim()} className="w-full" data-testid="button-create">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Generation Job"}
                </Button>
              </div>
              <div className="bg-white rounded-xl border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-gray-700">Active Jobs</h3>
                  <Button variant="ghost" size="sm" onClick={loadGenerations} data-testid="button-refresh-jobs"><RefreshCw className="w-3 h-3" /></Button>
                </div>
                <div className="space-y-1 max-h-52 overflow-y-auto">
                  {generations.filter(g => !archivedIds.includes(g.id)).map((g: any) => (
                    <div
                      key={g.id}
                      className={`w-full text-left p-2 rounded-lg text-xs transition group relative ${activeGenId === g.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}
                    >
                      <div className="flex items-center gap-1">
                        <button onClick={() => setActiveGenId(g.id)} className="flex-1 text-left" data-testid={`button-job-${g.id.substring(0, 8)}`}>
                          <div className="font-medium text-gray-700 truncate">{g.topic || g.template}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${g.status === "complete" ? "bg-green-100 text-green-700" : g.status === "running" || runningIds.has(g.id) ? "bg-blue-100 text-blue-700" : g.status === "failed" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                              {runningIds.has(g.id) ? "running" : g.status}
                            </span>
                            <span className="text-gray-400">{g.createdCount}/{g.targetCount}</span>
                          </div>
                        </button>
                        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition shrink-0">
                          {g.status !== "running" && !runningIds.has(g.id) && g.status !== "complete" && (
                            <button onClick={() => runMultiGeneration(g.id)} className="p-1 rounded hover:bg-blue-100 text-blue-500" title="Run" data-testid={`button-run-multi-${g.id.substring(0, 8)}`}>
                              <Play className="w-3 h-3" />
                            </button>
                          )}
                          {(g.status === "complete" || g.status === "failed") && (
                            <button onClick={() => archiveGeneration(g.id)} className="p-1 rounded hover:bg-gray-200 text-gray-400" title="Archive" data-testid={`button-archive-${g.id.substring(0, 8)}`}>
                              <Archive className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {generations.filter(g => !archivedIds.includes(g.id)).length === 0 && <p className="text-xs text-gray-400 text-center py-4">No active jobs</p>}
                </div>
                {runningIds.size > 0 && (
                  <div className="text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> {runningIds.size} job{runningIds.size !== 1 ? "s" : ""} running simultaneously
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl border p-4 space-y-2">
                <button onClick={() => setShowArchived(!showArchived)} className="flex items-center justify-between w-full text-sm font-semibold text-gray-700" data-testid="button-toggle-archived">
                  <span className="flex items-center gap-1.5"><Archive className="w-3.5 h-3.5 text-gray-400" /> Archived ({generations.filter(g => archivedIds.includes(g.id)).length})</span>
                  {showArchived ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showArchived && (
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {generations.filter(g => archivedIds.includes(g.id)).map((g: any) => (
                      <div key={g.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-xs group">
                        <button onClick={() => setActiveGenId(g.id)} className="flex-1 text-left" data-testid={`button-archived-job-${g.id.substring(0, 8)}`}>
                          <div className="font-medium text-gray-500 truncate">{g.topic || g.template}</div>
                          <span className="text-gray-400">{g.createdCount}Q - {g.status}</span>
                        </button>
                        <button onClick={() => unarchiveGeneration(g.id)} className="p-1 rounded hover:bg-blue-100 text-gray-400 opacity-0 group-hover:opacity-100 transition" title="Restore" data-testid={`button-unarchive-${g.id.substring(0, 8)}`}>
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {generations.filter(g => archivedIds.includes(g.id)).length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-2">No archived jobs</p>
                    )}
                  </div>
                )}
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
                        <Pause className="w-3 h-3" /> Pause
                      </Button>
                      <Button size="sm" variant="outline" onClick={compileGeneration} disabled={compiling || status.createdCount === 0} className="gap-1" data-testid="button-compile">
                        {compiling ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileDown className="w-3 h-3" />} Compile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => activeGenId && exportPdf(activeGenId)} disabled={exportingPdf !== null || status.createdCount === 0} className="gap-1" data-testid={`export-pdf-button-${activeGenId}`}>
                        {exportingPdf === activeGenId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />} Export PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={openPublishDialog} disabled={status.createdCount === 0 || !!(status as any).publishedProductId} className={`gap-1 ${(status as any).publishedProductId ? "text-gray-400 border-gray-200" : "text-green-700 border-green-200 hover:bg-green-50"}`} data-testid="button-publish">
                        <ShoppingBag className="w-3 h-3" /> {(status as any).publishedProductId ? "Published" : "Publish"}
                      </Button>
                    </div>
                    {status.lastError && (
                      <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-1.5" data-testid="text-error">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        {status.lastError}
                      </div>
                    )}
                  </div>

                  {status.distributions && (
                    <div className="bg-white rounded-xl border p-4 space-y-3">
                      <h3 className="font-semibold text-sm text-gray-700">Blueprint Dashboard</h3>
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
                      {status.distributions.byTopic && Object.keys(status.distributions.byTopic).length > 0 && (
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 mb-1">By Topic</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {Object.entries(status.distributions.byTopic || {}).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([k, v]) => (
                              <div key={k} className="flex items-center gap-2 text-xs">
                                <span className="w-20 text-gray-600 truncate">{k}</span>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${((v as number) / Math.max(status.createdCount, 1)) * 100}%` }} />
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
                    <div
                      key={q.id}
                      className="p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition cursor-pointer group"
                      onClick={() => openQuestionEditor(q)}
                      data-testid={`card-question-${q.idx}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-600">Q{q.idx}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${q.type === "MCQ" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{q.type}</span>
                        <span className="text-[10px] text-gray-400">{q.difficulty}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{q.system}</span>
                        <Edit3 className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition" />
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
                  <RefreshCw className="w-3 h-3" /> Refresh
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setBundleOpen(true); setBundleGenIds([]); setBundleTitle(""); setBundleDesc(""); }} className="gap-1" data-testid="button-new-bundle">
                  <Package className="w-3 h-3" /> New Bundle
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
                              <Input type="number" step="0.01" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="h-7 w-24 text-xs" placeholder="Price" data-testid="input-edit-price" />
                              <Input type="number" step="0.01" value={editCompareAt} onChange={e => setEditCompareAt(e.target.value)} className="h-7 w-24 text-xs" placeholder="Compare at" data-testid="input-edit-compare" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Button size="sm" className="h-7 text-xs px-2" onClick={() => updateProductPrice(product.id)} disabled={savingPrice} data-testid="button-save-price">
                                {savingPrice ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setEditingProductId(null)} data-testid="button-cancel-price">Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</div>
                            {product.compareAtPrice && <div className="text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</div>}
                          </div>
                        )}
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingProductId(product.id); setEditPrice((product.price / 100).toFixed(2)); setEditCompareAt(product.compareAtPrice ? (product.compareAtPrice / 100).toFixed(2) : ""); }} data-testid={`button-edit-price-${product.id.substring(0, 8)}`}>
                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toggleProductActive(product)} data-testid={`button-toggle-${product.id.substring(0, 8)}`}>
                            {product.isActive ? <EyeOff className="w-3.5 h-3.5 text-gray-400" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { if (confirm(`Delete "${product.title}"?`)) deleteProduct(product.id); }} data-testid={`button-delete-${product.id.substring(0, 8)}`}>
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
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {publishOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="dialog-publish">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Publish to Store with PDF</h2>
              <button onClick={() => setPublishOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500">Product Title</label>
                <Button size="sm" variant="ghost" className="h-6 text-xs gap-1 text-blue-600" onClick={generateAutoListing} disabled={autoListing} data-testid="button-auto-listing">
                  {autoListing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Auto-write listing
                </Button>
              </div>
              <Input value={pubTitle} onChange={e => setPubTitle(e.target.value)} className="text-sm" data-testid="input-pub-title" />
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
              {pubCompareAt && pubPrice && Number(pubCompareAt) > Number(pubPrice) && (
                <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                  Savings badge: Save ${(Number(pubCompareAt) - Number(pubPrice)).toFixed(2)} ({Math.round((1 - Number(pubPrice) / Number(pubCompareAt)) * 100)}% off)
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
                  <select value={pubCategory} onChange={e => setPubCategory(e.target.value)} className="w-full h-9 rounded-lg border px-2 text-sm" data-testid="select-pub-category">
                    <option value="question-pack">Question Pack</option>
                    <option value="premium-exam-pack">Premium Exam Pack</option>
                    <option value="case-pack">NGN Case Pack</option>
                    <option value="cram-guide">Cram Guide</option>
                    <option value="study-guide">Study Guide</option>
                    <option value="bundle">Bundle</option>
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

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">Document Theme</label>
                <div className="grid grid-cols-4 gap-1.5" data-testid="theme-picker-publish">
                  {THEMES.slice(0, 8).map(t => (
                    <button
                      key={t.id}
                      onClick={() => setPubThemeId(t.id)}
                      className={`p-1.5 rounded-lg border-2 transition text-center ${pubThemeId === t.id ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
                      data-testid={`theme-publish-${t.id}`}
                    >
                      <div className="flex gap-0.5 justify-center mb-0.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: t.primaryColor }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: t.secondaryColor }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: t.accentColor }} />
                      </div>
                      <span className="text-[10px] text-gray-600 leading-tight block">{t.name}</span>
                    </button>
                  ))}
                </div>
                {THEMES.length > 8 && (
                  <details className="mt-1">
                    <summary className="text-[10px] text-blue-600 cursor-pointer">More themes...</summary>
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                      {THEMES.slice(8).map(t => (
                        <button
                          key={t.id}
                          onClick={() => setPubThemeId(t.id)}
                          className={`p-1.5 rounded-lg border-2 transition text-center ${pubThemeId === t.id ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`}
                          data-testid={`theme-publish-${t.id}`}
                        >
                          <div className="flex gap-0.5 justify-center mb-0.5">
                            <div className="w-3 h-3 rounded-full" style={{ background: t.primaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: t.secondaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: t.accentColor }} />
                          </div>
                          <span className="text-[10px] text-gray-600 leading-tight block">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </details>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={pubFeatured} onChange={e => setPubFeatured(e.target.checked)} className="rounded" data-testid="checkbox-pub-featured" />
                Mark as Featured
              </label>

              <details className="border rounded-lg p-3 bg-gray-50">
                <summary className="text-xs font-medium text-gray-500 cursor-pointer">SEO Settings</summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 block mb-0.5">SEO Title</label>
                    <Input value={pubSeoTitle} onChange={e => setPubSeoTitle(e.target.value)} placeholder="Custom title for search engines" className="text-xs h-8" data-testid="input-pub-seo-title" />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 block mb-0.5">SEO Description (max 160 chars)</label>
                    <textarea value={pubSeoDesc} onChange={e => setPubSeoDesc(e.target.value.slice(0, 200))} rows={2} placeholder="Custom meta description for search engines" className="w-full rounded-lg border px-2 py-1 text-xs resize-none" data-testid="input-pub-seo-desc" />
                    <span className="text-[10px] text-gray-400">{pubSeoDesc.length}/200</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 block mb-0.5">SEO Keywords (comma-separated)</label>
                    <Input value={pubSeoKeywords} onChange={e => setPubSeoKeywords(e.target.value)} placeholder="nursing, exam prep, NCLEX" className="text-xs h-8" data-testid="input-pub-seo-keywords" />
                  </div>
                </div>
              </details>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setPublishOpen(false)} data-testid="button-cancel-publish">Cancel</Button>
              <Button onClick={publishToStore} disabled={publishing || !pubTitle || !pubDesc} className="gap-1" data-testid="button-confirm-publish">
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                {publishing ? "Generating PDF & Publishing..." : "Publish with PDF"}
              </Button>
            </div>
            {publishing && (
              <div className="text-xs text-gray-500 text-center">
                Compiling questions, generating PDF, creating preview, and uploading to store...
              </div>
            )}
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
                <textarea value={bundleDesc} onChange={e => setBundleDesc(e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm resize-none" placeholder="Describe what's included..." data-testid="input-bundle-desc" />
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
              {bundleGenIds.length > 0 && (
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between text-blue-700 font-medium">
                    <span>{bundleTotalQ} total questions</span>
                    <span>{bundleTopics.length} topic{bundleTopics.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-blue-600 truncate">{bundleTopics.join(", ")}</div>
                  {bundleCompareAt && bundlePrice && Number(bundleCompareAt) > Number(bundlePrice) && (
                    <div className="text-green-700 font-medium">Save ${(Number(bundleCompareAt) - Number(bundlePrice)).toFixed(2)}</div>
                  )}
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Include Generations</label>
                <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                  {generations.filter(g => g.status === "complete" && g.createdCount > 0).map((g: any) => (
                    <label key={g.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={bundleGenIds.includes(g.id)}
                        onChange={(e) => {
                          if (e.target.checked) setBundleGenIds([...bundleGenIds, g.id]);
                          else setBundleGenIds(bundleGenIds.filter(id => id !== g.id));
                        }}
                        className="rounded"
                        data-testid={`checkbox-bundle-gen-${g.id.substring(0, 8)}`}
                      />
                      <span className="font-medium text-gray-700">{g.topic || g.template}</span>
                      <span className="text-gray-400 ml-auto">{g.createdCount}Q</span>
                    </label>
                  ))}
                  {generations.filter(g => g.status === "complete" && g.createdCount > 0).length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">No completed generations</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setBundleOpen(false)} data-testid="button-cancel-bundle">Cancel</Button>
              <Button onClick={createBundle} disabled={creatingBundle || !bundleTitle || !bundleDesc || bundleGenIds.length === 0} className="gap-1" data-testid="button-confirm-bundle">
                {creatingBundle ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
                Create Bundle
              </Button>
            </div>
          </div>
        </div>
      )}

      {editDrawerOpen && editingQuestion && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" data-testid="drawer-edit-question">
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Edit Question Q{editingQuestion.idx}</h2>
              <button onClick={() => setEditDrawerOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded font-medium ${editingQuestion.type === "MCQ" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{editingQuestion.type}</span>
              <span className="text-gray-400">{editingQuestion.difficulty}</span>
              <span className="text-gray-400">{editingQuestion.system}</span>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Stem</label>
              <textarea value={editStem} onChange={e => setEditStem(e.target.value)} rows={4} className="w-full rounded-lg border px-3 py-2 text-sm resize-none" data-testid="edit-stem" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Choices</label>
              <div className="space-y-2">
                {editChoices.map((c: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const label = c.label || String.fromCharCode(65 + i);
                        if (editCorrect.includes(label)) setEditCorrect(editCorrect.filter(l => l !== label));
                        else setEditCorrect([...editCorrect, label]);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${editCorrect.includes(c.label || String.fromCharCode(65 + i)) ? "bg-green-500 text-white border-green-500" : "border-gray-300 text-gray-500"}`}
                      data-testid={`edit-choice-toggle-${i}`}
                    >
                      {c.label || String.fromCharCode(65 + i)}
                    </button>
                    <Input
                      value={c.text}
                      onChange={e => {
                        const updated = [...editChoices];
                        updated[i] = { ...updated[i], text: e.target.value };
                        setEditChoices(updated);
                      }}
                      className="text-sm"
                      data-testid={`edit-choice-text-${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Rationale (Why Correct)</label>
              <textarea value={editRationale} onChange={e => setEditRationale(e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm resize-none" data-testid="edit-rationale" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Clinical Pearl</label>
              <Input value={editPearl} onChange={e => setEditPearl(e.target.value)} className="text-sm" data-testid="edit-pearl" />
            </div>
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={saveQuestionEdit} disabled={savingQuestion} className="gap-1 flex-1" data-testid="button-save-question">
                {savingQuestion ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditDrawerOpen(false)} className="gap-1" data-testid="button-cancel-edit">
                <XCircle className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
