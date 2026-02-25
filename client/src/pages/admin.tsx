import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  BookOpen,
  FileText,
  Activity,
  BarChart3,
  Globe,
  CreditCard,
  Clock,
  StickyNote,
  Search,
  ChevronDown,
  ChevronUp,
  Shield,
  RefreshCw,
  Layers,
  Eye,
  MousePointer,
  MessageSquare,
  ThumbsUp,
  Lightbulb,
  Bug,
  Pencil,
  Trash2,
  Save,
  X,
  ExternalLink,
  Calendar,
  Tag,
  Plus,
} from "lucide-react";

type AdminData = {
  overview: {
    totalUsers: number;
    activeUsers7Day: number;
    activeUsers30Day: number;
    totalTests: number;
    totalLessonsAccessed: number;
    totalNotes: number;
    averageTestScore: number;
  };
  tiers: Record<string, number>;
  regions: Record<string, number>;
  subscriptionStatus: Record<string, number>;
  topLessons: { lessonId: string; accessCount: number }[];
  users: {
    id: string;
    username: string;
    email: string | null;
    tier: string;
    subscriptionStatus: string;
    region: string;
    testsCompleted: number;
    lessonsAccessed: number;
    notesCreated: number;
    lastActivity: string | null;
  }[];
  recentActivity: {
    username: string;
    lessonId: string;
    testType: string;
    score: number;
    totalQuestions: number;
    date: string;
  }[];
};

const tierLabels: Record<string, string> = {
  free: "Free",
  rpn: "RPN/LVN",
  rn: "RN",
  np: "NP Advanced",
  admin: "Admin",
};

const tierColors: Record<string, string> = {
  free: "bg-gray-100 text-gray-700",
  rpn: "bg-blue-100 text-blue-700",
  rn: "bg-purple-100 text-purple-700",
  np: "bg-amber-100 text-amber-700",
  admin: "bg-red-100 text-red-700",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  canceled: "bg-red-100 text-red-700",
  past_due: "bg-yellow-100 text-yellow-700",
};

function formatDate(d: string | null) {
  if (!d) return "Never";
  const date = new Date(d);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function formatLessonId(id: string) {
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && ["overview", "users", "activity", "content-engine", "analytics", "promotions", "feedback", "social", "audit"].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, []);

  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin verification (server-confirmed OR user payload fast-path)
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("lastActivity");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "activity" | "content-engine" | "analytics" | "promotions" | "feedback" | "social" | "audit"
  >("overview");

  const [blogConfig, setBlogConfig] = useState<any>(null);
  const [blogGenerating, setBlogGenerating] = useState(false);
  const [blogTopic, setBlogTopic] = useState("");

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogPostsLoading, setBlogPostsLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [blogPostSearch, setBlogPostSearch] = useState("");
  const [savingPost, setSavingPost] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);

  const [siteAnalytics, setSiteAnalytics] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsDays, setAnalyticsDays] = useState(30);

  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [newPost, setNewPost] = useState({ platform: "facebook", content: "", scheduledAt: "", tier: "rpn", imageUrl: "" });

  const [promotions, setPromotions] = useState<any[]>([]);
  const [promotionsLoading, setPromotionsLoading] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: "", discountType: "percent_off", amount: "", duration: "once", maxRedemptions: "", expiresAt: "" });
  const [promoCreating, setPromoCreating] = useState(false);
  const [analyticsSubTab, setAnalyticsSubTab] = useState<"traffic" | "users" | "content" | "campaigns">("traffic");

  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  // -------------------------------
  // ✅ ADMIN VERIFY (FIXED)
  // - Fast-path: trust user payload if it already contains admin markers
  // - Fallback: old /api/admin/verify using stored credentials
  // -------------------------------
  useEffect(() => {
    async function verifyAdmin() {
      if (!user) return;

      // ✅ Fast path: if your auth already knows you're admin, allow immediately
      const tier = (user as any)?.tier;
      const role = (user as any)?.role;
      const isAdminFlag = (user as any)?.isAdmin;

      if (tier === "admin" || role === "admin" || isAdminFlag === true) {
        setIsAdmin(true);
        setAdminChecked(true);
        return;
      }

      // ✅ Fallback: server verify using stored credentials (legacy)
      try {
        const stored = localStorage.getItem("nursenest-credentials");
        if (!stored) {
          setIsAdmin(false);
          setAdminChecked(true);
          return;
        }

        const parsed = JSON.parse(stored);
        const username = parsed?.username;
        const password = parsed?.password;

        if (!username || !password) {
          setIsAdmin(false);
          setAdminChecked(true);
          return;
        }

        const res = await fetch("/api/admin/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          setIsAdmin(false);
          setAdminChecked(true);
          return;
        }

        const json = await res.json();
        setIsAdmin(Boolean(json?.isAdmin));
        setAdminChecked(true);
      } catch {
        setIsAdmin(false);
        setAdminChecked(true);
      }
    }

    // reset when user changes
    setAdminChecked(false);
    setIsAdmin(false);

    verifyAdmin();
  }, [user]);

  // Fetch admin analytics only after admin is confirmed
  useEffect(() => {
    if (!user || !adminChecked || !isAdmin) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, adminChecked, isAdmin]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      // If your backend still requires credentials, keep using them:
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) {
        throw new Error("No credentials stored. Please log out and log in again.");
      }
      const { username, password } = JSON.parse(stored);

      const res = await fetch("/api/admin/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || "Failed to load analytics");
      }

      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/blog/config").then((r) => r.json()).then(setBlogConfig).catch(() => {});
  }, []);

  useEffect(() => {
    if (activeTab === "analytics" && !siteAnalytics && !analyticsLoading) {
      fetchSiteAnalytics();
    }
    if (activeTab === "feedback" && feedbackList.length === 0 && !feedbackLoading) {
      fetchFeedback();
    }
    if (activeTab === "social" && socialPosts.length === 0 && !socialLoading) {
      fetchSocialPosts();
    }
    if (activeTab === "promotions" && promotions.length === 0 && !promotionsLoading) {
      fetchPromotions();
    }
    if (activeTab === "audit" && auditLogs.length === 0 && !auditLoading) {
      fetchAuditLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function fetchSiteAnalytics() {
    setAnalyticsLoading(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) { setAnalyticsLoading(false); return; }
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/site-analytics?days=${analyticsDays}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      if (res.ok) setSiteAnalytics(await res.json());
    } catch {
      // ignore
    } finally {
      setAnalyticsLoading(false);
    }
  }

  async function fetchFeedback() {
    setFeedbackLoading(true);
    try {
      const res = await fetch("/api/feedback");
      if (res.ok) setFeedbackList(await res.json());
    } catch {
      // ignore
    } finally {
      setFeedbackLoading(false);
    }
  }

  async function updateFeedbackItem(id: string, updates: any) {
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setFeedbackList((prev) => prev.map((f) => (f.id === id ? updated : f)));
      }
    } catch {
      // ignore
    }
  }

  async function fetchSocialPosts() {
    setSocialLoading(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/social-posts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      if (res.ok) setSocialPosts(await res.json());
    } catch {
    } finally {
      setSocialLoading(false);
    }
  }

  async function createSocialPost() {
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/social-posts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        const created = await res.json();
        setSocialPosts((prev) => [created, ...prev]);
        setNewPost({ platform: "facebook", content: "", scheduledAt: "", tier: "rpn", imageUrl: "" });
      }
    } catch {
    }
  }

  async function deleteSocialPost(id: string) {
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/social-posts/${id}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, { method: "DELETE" });
      if (res.ok) setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
    }
  }

  async function fetchAuditLogs() {
    setAuditLoading(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) { setAuditLoading(false); return; }
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/audit-logs?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&limit=100`);
      if (res.ok) setAuditLogs(await res.json());
    } catch {} finally {
      setAuditLoading(false);
    }
  }

  async function fetchPromotions() {
    setPromotionsLoading(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) { setPromotionsLoading(false); return; }
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/promotions?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      if (res.ok) setPromotions(await res.json());
    } catch {} finally {
      setPromotionsLoading(false);
    }
  }

  async function createPromotion() {
    if (!newPromo.code || !newPromo.amount) return;
    setPromoCreating(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch("/api/admin/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, password,
          code: newPromo.code.toUpperCase(),
          discountType: newPromo.discountType,
          amount: Number(newPromo.amount),
          duration: newPromo.duration,
          maxRedemptions: newPromo.maxRedemptions ? Number(newPromo.maxRedemptions) : undefined,
          expiresAt: newPromo.expiresAt || undefined,
        }),
      });
      if (res.ok) {
        setNewPromo({ code: "", discountType: "percent_off", amount: "", duration: "once", maxRedemptions: "", expiresAt: "" });
        fetchPromotions();
      } else {
        const err = await res.json().catch(() => ({}));
        alert((err as any).error || "Failed to create promotion");
      }
    } catch {
      alert("Failed to create promotion");
    } finally {
      setPromoCreating(false);
    }
  }

  async function deletePromotion(id: string) {
    if (!confirm("Deactivate this promotion code?")) return;
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/admin/promotions/${id}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, { method: "DELETE" });
      if (res.ok) fetchPromotions();
    } catch {}
  }

  async function handleBlogConfigUpdate(updates: any) {
    const stored = localStorage.getItem("nursenest-credentials");
    if (!stored) return;
    const { username, password } = JSON.parse(stored);

    const res = await fetch("/api/blog/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, ...updates }),
    });

    if (res.ok) setBlogConfig(await res.json());
  }

  async function handleGenerateBlogPost() {
    const stored = localStorage.getItem("nursenest-credentials");
    if (!stored) return;
    const { username, password } = JSON.parse(stored);

    setBlogGenerating(true);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          topic: blogTopic || undefined,
          citationStyle: blogConfig?.citationStyle || "apa7",
        }),
      });
      if (res.ok) {
        setBlogTopic("");
        alert("Blog post generated and published!");
      } else {
        alert("Failed to generate blog post");
      }
    } catch {
      alert("Failed to generate blog post");
    } finally {
      setBlogGenerating(false);
    }
  }

  async function handleRunScheduler() {
    const stored = localStorage.getItem("nursenest-credentials");
    if (!stored) return;
    const { username, password } = JSON.parse(stored);

    setBlogGenerating(true);
    try {
      const res = await fetch("/api/blog/run-scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await res.json().catch(() => ({}));
      alert(result?.message || "Scheduler ran.");
    } catch {
      alert("Scheduler failed");
    } finally {
      setBlogGenerating(false);
    }
  }

  async function fetchBlogPosts() {
    setBlogPostsLoading(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) { setBlogPostsLoading(false); return; }
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/content?status=all&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const allItems = await res.json();
        allItems.sort((a: any, b: any) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
        setBlogPosts(allItems);
      }
    } catch {} finally {
      setBlogPostsLoading(false);
    }
  }

  async function handleSaveBlogPost() {
    if (!editingPost) return;
    setSavingPost(true);
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) { setSavingPost(false); return; }
      const { username, password } = JSON.parse(stored);

      const isNew = !editingPost.id;
      const url = isNew ? "/api/content" : `/api/content/${editingPost.id}`;
      const method = isNew ? "POST" : "PUT";

      const body: any = {
        username,
        password,
        title: editingPost.title,
        slug: editingPost.slug,
        type: editingPost.type || "blog",
        category: editingPost.category || null,
        bodySystem: editingPost.bodySystem || null,
        tier: editingPost.tier || "free",
        status: editingPost.status || "draft",
        summary: editingPost.summary || null,
        content: editingPost.content || [],
        tags: editingPost.tags || [],
        seoTitle: editingPost.seoTitle || null,
        seoDescription: editingPost.seoDescription || null,
        seoKeywords: editingPost.seoKeywords || [],
        primaryKeyword: editingPost.primaryKeyword || null,
        scheduledAt: editingPost.scheduledAt ? new Date(editingPost.scheduledAt).toISOString() : null,
        autoPublish: editingPost.autoPublish || false,
        authorName: editingPost.authorName || "Erika Godin, RN",
      };

      if (editingPost.status === "published" && !editingPost.publishedAt) {
        body.publishedAt = new Date().toISOString();
      }
      if (editingPost.status === "scheduled" && editingPost.scheduledAt) {
        body.status = "scheduled";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setEditingPost(null);
        setCreatingNew(false);
        fetchBlogPosts();
      } else {
        alert("Failed to save blog post");
      }
    } catch {
      alert("Failed to save blog post");
    }
    setSavingPost(false);
  }

  async function handleQuickTierChange(id: string, newTier: string) {
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, tier: newTier }),
      });
      if (res.ok) {
        setBlogPosts((prev) => prev.map((p) => p.id === id ? { ...p, tier: newTier } : p));
      }
    } catch {}
  }

  async function handleDeleteBlogPost(id: string) {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    try {
      const stored = localStorage.getItem("nursenest-credentials");
      if (!stored) return;
      const { username, password } = JSON.parse(stored);
      const res = await fetch(`/api/content/${id}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, { method: "DELETE" });
      if (res.ok) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id));
        if (editingPost?.id === id) setEditingPost(null);
      }
    } catch {}
  }

  function startNewContent(contentType: string) {
    setCreatingNew(true);
    const templates: Record<string, any[]> = {
      blog: [
        { type: "heading", content: "" },
        { type: "paragraph", content: "" },
      ],
      lesson: [
        { type: "heading", content: "Learning Objectives" },
        { type: "list", content: "" },
        { type: "heading", content: "Pathophysiology" },
        { type: "paragraph", content: "" },
        { type: "heading", content: "Clinical Presentation" },
        { type: "paragraph", content: "" },
        { type: "heading", content: "Nursing Interventions" },
        { type: "paragraph", content: "" },
        { type: "callout", content: "Clinical Pearl: " },
      ],
      "flashcard-set": [
        { type: "flashcard", content: "Q: \nA: " },
        { type: "flashcard", content: "Q: \nA: " },
        { type: "flashcard", content: "Q: \nA: " },
      ],
      article: [
        { type: "heading", content: "" },
        { type: "paragraph", content: "" },
        { type: "references", content: "" },
      ],
    };
    setEditingPost({
      title: "",
      slug: "",
      type: contentType,
      category: "clinical-reasoning",
      bodySystem: null,
      tier: "free",
      status: "draft",
      summary: "",
      content: templates[contentType] || templates.blog,
      tags: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
      primaryKeyword: "",
      scheduledAt: null,
      autoPublish: false,
      authorName: "Erika Godin, RN",
    });
  }

  useEffect(() => {
    if (activeTab === "content-engine" && blogPosts.length === 0 && !blogPostsLoading) {
      fetchBlogPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ---------- AUTH GATES ----------
  if (!user) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
              <p className="text-gray-500 mb-6">Please log in with an admin account to access this page.</p>
              <Button onClick={() => setLocation("/login")} data-testid="button-admin-login">
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!adminChecked) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-500">This page is restricted to administrators.</p>
              <p className="text-xs text-gray-400 mt-3">
                Debug: current tier={(user as any)?.tier ?? "none"} | role={(user as any)?.role ?? "none"} | isAdmin=
                {String((user as any)?.isAdmin ?? "none")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ---------- TABLE HELPERS ----------
  const filteredUsers =
    data?.users.filter((u) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        u.username.toLowerCase().includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        u.tier.toLowerCase().includes(q) ||
        u.region.toLowerCase().includes(q)
      );
    }) || [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal: any, bVal: any;
    switch (sortField) {
      case "username":
        aVal = a.username;
        bVal = b.username;
        break;
      case "tier":
        aVal = a.tier;
        bVal = b.tier;
        break;
      case "testsCompleted":
        aVal = a.testsCompleted;
        bVal = b.testsCompleted;
        break;
      case "lessonsAccessed":
        aVal = a.lessonsAccessed;
        bVal = b.lessonsAccessed;
        break;
      case "lastActivity":
        aVal = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        bVal = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
        break;
      default:
        aVal = a.username;
        bVal = b.username;
    }
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  function toggleSort(field: string) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    );
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500 admin-selectable">
      <SEO title="Admin Dashboard - NurseNest" description="Admin analytics dashboard" canonicalPath="/admin" />
      <Navigation />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Platform analytics and user management</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => setLocation("/content-editor")}
                  data-testid="button-admin-content-editor"
                >
                  <FileText className="w-3 h-3" />
                  Content Editor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => setLocation("/lessons")}
                  data-testid="button-admin-lessons"
                >
                  <BookOpen className="w-3 h-3" />
                  Lessons
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => setLocation("/flashcards")}
                  data-testid="button-admin-flashcards"
                >
                  <Layers className="w-3 h-3" />
                  Flashcards
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => setLocation("/blog")}
                  data-testid="button-admin-blog"
                >
                  <FileText className="w-3 h-3" />
                  Blog
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="gap-2"
              data-testid="button-refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700" data-testid="text-admin-error">
              {error}
            </div>
          )}

          {loading && !data ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : data ? (
            <>
              {/* Tab Navigation */}
              <div className="flex gap-1 mb-8 bg-white rounded-lg border border-primary/10 p-1 overflow-x-auto" data-testid="nav-admin-tabs">
                {(["overview", "users", "activity", "content-engine", "analytics", "promotions", "feedback", "social", "audit"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                    data-testid={`tab-${tab}`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "users" && `Users (${data.overview.totalUsers})`}
                    {tab === "activity" && "Recent Activity"}
                    {tab === "content-engine" && "Content Engine"}
                    {tab === "analytics" && "Site Analytics"}
                    {tab === "promotions" && "Promotions"}
                    {tab === "feedback" && "Feedback"}
                    {tab === "social" && "Social Scheduler"}
                    {tab === "audit" && "Audit Log"}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="section-kpi">
                    {[
                      { label: "Total Users", value: data.overview.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Active (7 days)", value: data.overview.activeUsers7Day, icon: Activity, color: "text-green-600", bg: "bg-green-50" },
                      { label: "Active (30 days)", value: data.overview.activeUsers30Day, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
                      { label: "Total Tests", value: data.overview.totalTests, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Lessons Accessed", value: data.overview.totalLessonsAccessed, icon: BookOpen, color: "text-cyan-600", bg: "bg-cyan-50" },
                      { label: "Notes Created", value: data.overview.totalNotes, icon: StickyNote, color: "text-pink-600", bg: "bg-pink-50" },
                      { label: "Avg Test Score", value: `${data.overview.averageTestScore}%`, icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
                      {
                        label: "Retention Rate",
                        value:
                          data.overview.totalUsers > 0
                            ? `${Math.round((data.overview.activeUsers30Day / data.overview.totalUsers) * 100)}%`
                            : "0%",
                        icon: Clock,
                        color: "text-teal-600",
                        bg: "bg-teal-50",
                      },
                    ].map((kpi, i) => (
                      <Card key={i} className="border border-primary/10" data-testid={`card-kpi-${i}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                              <div className="text-xs text-gray-500">{kpi.label}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="border border-primary/10" data-testid="card-tier-distribution">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" /> Subscription Tiers
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {Object.entries(data.tiers).map(([tier, count]) => (
                            <div key={tier} className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[tier] || "bg-gray-100 text-gray-700"}`}>
                                {tierLabels[tier] || tier}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${(count / data.overview.totalUsers) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-primary/10" data-testid="card-status-distribution">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Activity className="w-4 h-4" /> Subscription Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {Object.entries(data.subscriptionStatus).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-600"}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${(count / data.overview.totalUsers) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-primary/10" data-testid="card-region-distribution">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Regions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {Object.entries(data.regions).map(([region, count]) => (
                            <div key={region} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{region === "CA" ? "Canada" : region === "US" ? "United States" : region}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${(count / data.overview.totalUsers) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-grow max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users by name, email, tier, or region..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-primary/10 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        data-testid="input-search-users"
                      />
                    </div>
                    <span className="text-sm text-gray-500">{filteredUsers.length} users</span>
                  </div>

                  <Card className="border border-primary/10 overflow-hidden" data-testid="card-users-table">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-primary/10">
                            <th
                              className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                              onClick={() => toggleSort("username")}
                            >
                              User <SortIcon field="username" />
                            </th>
                            <th
                              className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                              onClick={() => toggleSort("tier")}
                            >
                              Tier <SortIcon field="tier" />
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Region</th>
                            <th
                              className="text-center px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                              onClick={() => toggleSort("testsCompleted")}
                            >
                              Tests <SortIcon field="testsCompleted" />
                            </th>
                            <th
                              className="text-center px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                              onClick={() => toggleSort("lessonsAccessed")}
                            >
                              Lessons <SortIcon field="lessonsAccessed" />
                            </th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Notes</th>
                            <th
                              className="text-right px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900"
                              onClick={() => toggleSort("lastActivity")}
                            >
                              Last Active <SortIcon field="lastActivity" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedUsers.map((u) => (
                            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors" data-testid={`row-user-${u.id}`}>
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium text-gray-900">{u.username}</div>
                                  <div className="text-xs text-gray-400">{u.email || "No email"}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[u.tier] || "bg-gray-100 text-gray-700"}`}>
                                  {tierLabels[u.tier] || u.tier}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    statusColors[u.subscriptionStatus] || "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {u.subscriptionStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-600">{u.region}</td>
                              <td className="px-4 py-3 text-center text-gray-700">{u.testsCompleted}</td>
                              <td className="px-4 py-3 text-center text-gray-700">{u.lessonsAccessed}</td>
                              <td className="px-4 py-3 text-center text-gray-700">{u.notesCreated}</td>
                              <td className="px-4 py-3 text-right text-gray-500 text-xs">{formatDate(u.lastActivity)}</td>
                            </tr>
                          ))}
                          {sortedUsers.length === 0 && (
                            <tr>
                              <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                                {searchQuery ? "No users match your search" : "No users yet"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === "activity" && (
                <div className="space-y-4">
                  <Card className="border border-primary/10" data-testid="card-recent-activity">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">Recent Test Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.recentActivity.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No test activity recorded yet</p>
                      ) : (
                        <div className="space-y-3">
                          {data.recentActivity.map((act, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0" data-testid={`row-activity-${i}`}>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {act.username} took a {act.testType}
                                  </div>
                                  <div className="text-xs text-gray-400">{formatLessonId(act.lessonId)}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-sm font-semibold ${
                                    act.totalQuestions > 0 && act.score / act.totalQuestions >= 0.8
                                      ? "text-green-600"
                                      : act.totalQuestions > 0 && act.score / act.totalQuestions >= 0.6
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {act.score}/{act.totalQuestions} ({act.totalQuestions > 0 ? Math.round((act.score / act.totalQuestions) * 100) : 0}%)
                                </div>
                                <div className="text-xs text-gray-400">{formatDate(act.date)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Content Engine Tab */}
              {activeTab === "content-engine" && (
                <div className="space-y-6">
                  <Card className="border border-primary/10 mb-4" data-testid="card-ai-generator">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-gray-700">AI Blog Post Generator</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">APA 7 Citations</span>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter a topic (e.g., 'Diabetic Ketoacidosis management for RPN students')"
                          value={blogTopic}
                          onChange={(e) => setBlogTopic(e.target.value)}
                          className="flex-1 text-sm"
                          data-testid="input-ai-topic"
                        />
                        <Button
                          onClick={() => { handleGenerateBlogPost(); }}
                          disabled={blogGenerating || !blogTopic.trim()}
                          className="shrink-0"
                          data-testid="button-generate-blog"
                        >
                          {blogGenerating ? "Generating..." : "Generate AI Draft"}
                        </Button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">Enter a specific nursing topic and click Generate. The AI will create a scholarly draft with APA 7 citations ready for your review.</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-3 md:grid-cols-3 gap-3" data-testid="section-quick-actions">
                    <button
                      onClick={() => startNewContent("blog")}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                      data-testid="button-new-blog"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">New Blog Post</span>
                      <span className="text-[10px] text-gray-400">Write manually</span>
                    </button>
                    <button
                      onClick={() => startNewContent("flashcard-set")}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all group"
                      data-testid="button-new-flashcards"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Layers className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">New Flashcards</span>
                      <span className="text-[10px] text-gray-400">Q&A card set</span>
                    </button>
                    <button
                      onClick={() => startNewContent("lesson")}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-all group"
                      data-testid="button-new-lesson"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">New Lesson</span>
                      <span className="text-[10px] text-gray-400">Educational content</span>
                    </button>
                  </div>

                  <Card className="border border-primary/10" data-testid="card-blog-automation">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600">Blog Automation:</span>
                            <Button
                              size="sm"
                              variant={blogConfig?.isActive ? "default" : "outline"}
                              onClick={() => handleBlogConfigUpdate({ isActive: !blogConfig?.isActive })}
                              className={`h-7 text-xs ${blogConfig?.isActive ? "bg-green-600 hover:bg-green-700" : ""}`}
                              data-testid="button-toggle-blog-automation"
                            >
                              {blogConfig?.isActive ? "ON" : "OFF"}
                            </Button>
                          </div>
                          <div className="hidden md:flex items-center gap-3 text-xs text-gray-500">
                            <span>Day {blogConfig?.dayCount || 0}</span>
                            <span>{blogConfig?.totalPostsGenerated || 0} posts</span>
                            <span>{blogConfig?.postsPerDay || 2}/day</span>
                            <span>Last: {blogConfig?.lastPostAt ? formatDate(blogConfig.lastPostAt) : "Never"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex rounded border overflow-hidden">
                            {[1, 2, 3].map((n) => (
                              <button
                                key={n}
                                onClick={() => handleBlogConfigUpdate({ postsPerDay: n })}
                                className={`px-2 py-1 text-xs ${(blogConfig?.postsPerDay || 2) === n ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                                data-testid={`button-posts-per-day-${n}`}
                              >
                                {n}x
                              </button>
                            ))}
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleRunScheduler} disabled={blogGenerating} data-testid="button-run-scheduler">
                            {blogGenerating ? "Running..." : "Run Now"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10" data-testid="card-all-content">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold text-gray-700">All Content ({blogPosts.length})</CardTitle>
                        <Button size="sm" variant="ghost" onClick={() => fetchBlogPosts()} data-testid="button-refresh-content">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingPost ? (
                        <div className="space-y-4" data-testid="blog-post-editor">
                          <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="text-sm font-semibold">
                              {creatingNew ? `New ${(editingPost.type || "blog").replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}` : "Edit Content"}
                            </h3>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveBlogPost} disabled={savingPost || !editingPost.title || !editingPost.slug} data-testid="button-save-blog-post">
                                <Save className="w-3 h-3 mr-1" /> {savingPost ? "Saving..." : "Save"}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => { setEditingPost(null); setCreatingNew(false); }} data-testid="button-cancel-edit">
                                <X className="w-3 h-3 mr-1" /> Cancel
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                              <label className="text-xs text-gray-500 block mb-1">Title</label>
                              <Input
                                value={editingPost.title || ""}
                                onChange={(e) => {
                                  const title = e.target.value;
                                  setEditingPost((prev: any) => ({
                                    ...prev,
                                    title,
                                    slug: creatingNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug,
                                  }));
                                }}
                                placeholder="Content title"
                                data-testid="input-edit-title"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Type</label>
                              <select
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                value={editingPost.type || "blog"}
                                onChange={(e) => setEditingPost((prev: any) => ({ ...prev, type: e.target.value }))}
                                data-testid="select-edit-type"
                              >
                                <option value="blog">Blog Post</option>
                                <option value="article">Article</option>
                                <option value="lesson">Lesson</option>
                                <option value="flashcard-set">Flashcard Set</option>
                                <option value="guide">Guide</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Slug</label>
                              <Input
                                value={editingPost.slug || ""}
                                onChange={(e) => setEditingPost((prev: any) => ({ ...prev, slug: e.target.value }))}
                                placeholder="url-slug"
                                data-testid="input-edit-slug"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Status</label>
                              <select
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                value={editingPost.status || "draft"}
                                onChange={(e) => setEditingPost((prev: any) => ({ ...prev, status: e.target.value }))}
                                data-testid="select-edit-status"
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Category</label>
                              <select
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                                value={editingPost.category || ""}
                                onChange={(e) => setEditingPost((prev: any) => ({ ...prev, category: e.target.value }))}
                                data-testid="select-edit-category"
                              >
                                <option value="">None</option>
                                <option value="clinical-reasoning">Clinical Reasoning</option>
                                <option value="pharmacology">Pharmacology</option>
                                <option value="lab-interpretation">Lab Interpretation</option>
                                <option value="exam-prep">Exam Prep</option>
                                <option value="patient-safety">Patient Safety</option>
                                <option value="pathophysiology">Pathophysiology</option>
                                <option value="assessment-skills">Assessment Skills</option>
                                <option value="medication-safety">Medication Safety</option>
                                <option value="nursing-fundamentals">Nursing Fundamentals</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Tier</label>
                              <div className="flex rounded-lg border overflow-hidden" data-testid="tier-toggle">
                                {[
                                  { value: "free", label: "Free" },
                                  { value: "rpn", label: "RPN" },
                                  { value: "rn", label: "RN" },
                                  { value: "np", label: "NP" },
                                ].map((t) => (
                                  <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => setEditingPost((prev: any) => ({ ...prev, tier: t.value }))}
                                    className={`flex-1 px-2 py-1.5 text-xs font-medium transition-colors ${
                                      editingPost.tier === t.value
                                        ? "bg-primary text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                    }`}
                                    data-testid={`button-tier-${t.value}`}
                                  >
                                    {t.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-700">Publishing Options</span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex-1 min-w-[200px]">
                                <label className="text-[10px] text-blue-600 block mb-1">Schedule Date & Time</label>
                                <Input
                                  type="datetime-local"
                                  value={editingPost.scheduledAt ? new Date(editingPost.scheduledAt).toISOString().slice(0, 16) : ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditingPost((prev: any) => ({
                                      ...prev,
                                      scheduledAt: val ? new Date(val).toISOString() : null,
                                      status: val ? "scheduled" : prev.status,
                                    }));
                                  }}
                                  className="bg-white text-sm"
                                  data-testid="input-schedule-datetime"
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-xs text-blue-700 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={editingPost.autoPublish || false}
                                    onChange={(e) => setEditingPost((prev: any) => ({ ...prev, autoPublish: e.target.checked }))}
                                    className="rounded"
                                    data-testid="checkbox-auto-publish"
                                  />
                                  Auto-publish
                                </label>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                                  onClick={() => setEditingPost((prev: any) => ({ ...prev, status: "published", scheduledAt: null }))}
                                  data-testid="button-publish-now"
                                >
                                  Publish Now
                                </Button>
                              </div>
                            </div>
                            {editingPost.scheduledAt && (
                              <p className="text-[10px] text-blue-500 mt-2">
                                This post will be automatically published on {new Date(editingPost.scheduledAt).toLocaleString()}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Summary</label>
                            <Textarea
                              value={editingPost.summary || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, summary: e.target.value }))}
                              placeholder="Brief summary..."
                              className="min-h-[50px]"
                              data-testid="textarea-edit-summary"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs text-gray-500">Content Blocks</label>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const blocks = [...(editingPost.content || []), { type: "paragraph", content: "" }];
                                  setEditingPost((prev: any) => ({ ...prev, content: blocks }));
                                }}
                                data-testid="button-add-block"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add Block
                              </Button>
                            </div>
                            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                              {(editingPost.content || []).map((block: any, idx: number) => (
                                <div key={idx} className="flex gap-2 items-start border rounded p-2 bg-gray-50">
                                  <select
                                    className="border rounded px-2 py-1 text-xs bg-white shrink-0"
                                    value={block.type || "paragraph"}
                                    onChange={(e) => {
                                      const blocks = [...(editingPost.content || [])];
                                      blocks[idx] = { ...blocks[idx], type: e.target.value };
                                      setEditingPost((prev: any) => ({ ...prev, content: blocks }));
                                    }}
                                    data-testid={`select-block-type-${idx}`}
                                  >
                                    <option value="heading">Heading</option>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="list">List</option>
                                    <option value="callout">Callout</option>
                                    <option value="quote">Quote</option>
                                    <option value="code">Code</option>
                                    <option value="flashcard">Flashcard</option>
                                    <option value="references">References</option>
                                    <option value="warning">Warning</option>
                                    <option value="medication">Medication</option>
                                  </select>
                                  <Textarea
                                    value={block.content || block.text || ""}
                                    onChange={(e) => {
                                      const blocks = [...(editingPost.content || [])];
                                      blocks[idx] = { ...blocks[idx], content: e.target.value };
                                      setEditingPost((prev: any) => ({ ...prev, content: blocks }));
                                    }}
                                    className="flex-1 text-sm min-h-[40px]"
                                    rows={block.type === "paragraph" ? 3 : 1}
                                    data-testid={`textarea-block-${idx}`}
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 shrink-0"
                                    onClick={() => {
                                      const blocks = (editingPost.content || []).filter((_: any, i: number) => i !== idx);
                                      setEditingPost((prev: any) => ({ ...prev, content: blocks }));
                                    }}
                                    data-testid={`button-remove-block-${idx}`}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <details className="text-xs">
                            <summary className="text-gray-500 cursor-pointer hover:text-gray-700">SEO Settings</summary>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">SEO Title</label>
                                <Input
                                  value={editingPost.seoTitle || ""}
                                  onChange={(e) => setEditingPost((prev: any) => ({ ...prev, seoTitle: e.target.value }))}
                                  placeholder="SEO title (optional)"
                                  data-testid="input-edit-seo-title"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">SEO Description</label>
                                <Input
                                  value={editingPost.seoDescription || ""}
                                  onChange={(e) => setEditingPost((prev: any) => ({ ...prev, seoDescription: e.target.value }))}
                                  placeholder="SEO description (optional)"
                                  data-testid="input-edit-seo-desc"
                                />
                              </div>
                            </div>
                          </details>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              value={blogPostSearch}
                              onChange={(e) => setBlogPostSearch(e.target.value)}
                              placeholder="Search all content..."
                              className="pl-9"
                              data-testid="input-search-blog-posts"
                            />
                          </div>
                          {blogPostsLoading ? (
                            <p className="text-sm text-gray-500 text-center py-4">Loading content...</p>
                          ) : blogPosts.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No content found. Use the buttons above to create or generate content.</p>
                          ) : (
                            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                              {blogPosts
                                .filter((p) => !blogPostSearch || p.title?.toLowerCase().includes(blogPostSearch.toLowerCase()))
                                .map((post) => (
                                <div key={post.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors" data-testid={`blog-post-row-${post.id}`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0 mr-3">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-gray-900 truncate">{post.title}</span>
                                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 shrink-0 ${post.status === "published" ? "bg-green-50 text-green-700 border-green-200" : post.status === "scheduled" ? "bg-blue-50 text-blue-700 border-blue-200" : post.status === "archived" ? "bg-gray-50 text-gray-500" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
                                          {post.status || "draft"}
                                        </Badge>
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 bg-white">
                                          {post.type || "blog"}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(post.updatedAt || post.createdAt)}</span>
                                        {post.category && <span>{post.category}</span>}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <div className="flex rounded border overflow-hidden">
                                        {[
                                          { value: "free", label: "Free" },
                                          { value: "rpn", label: "RPN" },
                                          { value: "rn", label: "RN" },
                                          { value: "np", label: "NP" },
                                        ].map((t) => (
                                          <button
                                            key={t.value}
                                            onClick={() => handleQuickTierChange(post.id, t.value)}
                                            className={`px-1.5 py-0.5 text-[10px] font-medium transition-all ${
                                              (post.tier || "free") === t.value
                                                ? "bg-primary text-white"
                                                : "bg-white text-gray-400 hover:bg-gray-100"
                                            }`}
                                            data-testid={`button-quick-tier-${t.value}-${post.id}`}
                                          >
                                            {t.label}
                                          </button>
                                        ))}
                                      </div>
                                      <div className="flex gap-0.5">
                                        {post.status === "published" && post.slug && (
                                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => window.open(`/learn/${post.slug}`, "_blank")} data-testid={`button-view-${post.id}`}>
                                            <ExternalLink className="w-3 h-3" />
                                          </Button>
                                        )}
                                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditingPost({ ...post })} data-testid={`button-edit-${post.id}`}>
                                          <Pencil className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:text-red-700" onClick={() => handleDeleteBlogPost(post.id)} data-testid={`button-delete-${post.id}`}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10" data-testid="card-top-lessons">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-gray-700">Most Accessed Lessons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.topLessons.length === 0 ? (
                        <p className="text-gray-400 text-center py-4 text-sm">No lesson data yet</p>
                      ) : (
                        <div className="space-y-2">
                          {data.topLessons.slice(0, 10).map((lesson, i) => {
                            const maxCount = data.topLessons[0]?.accessCount || 1;
                            return (
                              <div key={i} className="flex items-center gap-3" data-testid={`row-lesson-${i}`}>
                                <span className="text-xs font-mono text-gray-400 w-5 text-right">{i + 1}.</span>
                                <div className="flex-grow">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-xs font-medium text-gray-900">{formatLessonId(lesson.lessonId)}</span>
                                    <span className="text-[10px] text-gray-500">{lesson.accessCount} views</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(lesson.accessCount / maxCount) * 100}%` }} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <div className="space-y-6" data-testid="section-site-analytics">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Site Analytics</h2>
                    <div className="flex items-center gap-2">
                      {[7, 14, 30, 90].map((d) => (
                        <Button
                          key={d}
                          size="sm"
                          variant={analyticsDays === d ? "default" : "outline"}
                          onClick={() => {
                            setAnalyticsDays(d);
                            setSiteAnalytics(null);
                            setTimeout(fetchSiteAnalytics, 100);
                          }}
                          data-testid={`button-analytics-days-${d}`}
                        >
                          {d}d
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1 bg-gray-50 rounded-lg p-1 overflow-x-auto" data-testid="nav-analytics-subtabs">
                    {(["traffic", "users", "content", "campaigns"] as const).map((st) => (
                      <button key={st} onClick={() => setAnalyticsSubTab(st)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${analyticsSubTab === st ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`} data-testid={`subtab-${st}`}>
                        {st === "traffic" ? "Traffic Overview" : st === "users" ? "Users & Subscriptions" : st === "content" ? "Content & SEO" : "Campaigns & Sources"}
                      </button>
                    ))}
                  </div>

                  {analyticsLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : siteAnalytics ? (
                    <div className="space-y-6">
                      {analyticsSubTab === "traffic" && (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { label: "Total Page Views", value: (siteAnalytics.traffic?.totalViews || 0).toLocaleString(), icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
                              { label: "Unique Sessions", value: (siteAnalytics.traffic?.uniqueSessions || 0).toLocaleString(), icon: Users, color: "text-green-600", bg: "bg-green-50" },
                              { label: "Avg Duration", value: `${Math.floor((siteAnalytics.traffic?.avgDuration || 0) / 60)}m ${(siteAnalytics.traffic?.avgDuration || 0) % 60}s`, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                              { label: "Bounce Rate", value: `${siteAnalytics.traffic?.bounceRate || 0}%`, icon: Activity, color: "text-red-600", bg: "bg-red-50" },
                            ].map((kpi, i) => (
                              <Card key={i} className="border border-primary/10" data-testid={`card-analytics-kpi-${i}`}>
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                                    </div>
                                    <div>
                                      <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                                      <div className="text-xs text-gray-500">{kpi.label}</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          <Card className="border border-primary/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Conversion Funnel</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                              {(() => {
                                const f = siteAnalytics.conversionFunnel || {};
                                const steps = [
                                  { label: "Visitors", value: f.totalVisitors || 0 },
                                  { label: "Pricing Page", value: f.pricingViews || 0, rate: f.pricingRate },
                                  { label: "Checkout Started", value: f.checkoutIntents || 0, rate: f.checkoutRate },
                                  { label: "Active Subscribers", value: f.activeSubscribers || 0 },
                                ];
                                const max = Math.max(...steps.map((s) => s.value), 1);
                                return steps.map((s, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                    <div className="w-32 text-xs text-gray-600 text-right">{s.label}</div>
                                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary/70 rounded-full transition-all" style={{ width: `${(s.value / max) * 100}%` }} />
                                    </div>
                                    <div className="w-16 text-xs font-semibold text-gray-700">{s.value.toLocaleString()}</div>
                                    {s.rate !== undefined && <div className="w-12 text-xs text-gray-400">{s.rate}%</div>}
                                  </div>
                                ));
                              })()}
                            </CardContent>
                          </Card>

                          {siteAnalytics.dailyViews && siteAnalytics.dailyViews.length > 0 && (
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Daily Views Trend</CardTitle></CardHeader>
                              <CardContent>
                                <div className="flex items-end gap-[2px] h-32">
                                  {(() => {
                                    const maxV = Math.max(...siteAnalytics.dailyViews.map((d: any) => d.views || d.count || 0), 1);
                                    return siteAnalytics.dailyViews.map((d: any, i: number) => {
                                      const v = d.views || d.count || 0;
                                      return (
                                        <div key={i} className="flex-1 group relative cursor-default" title={`${d.date || d.day}: ${v} views`}>
                                          <div className="bg-primary/60 hover:bg-primary rounded-t transition-colors" style={{ height: `${(v / maxV) * 100}%`, minHeight: v > 0 ? "2px" : "0" }} />
                                        </div>
                                      );
                                    });
                                  })()}
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-[10px] text-gray-400">{siteAnalytics.dailyViews[0]?.date || siteAnalytics.dailyViews[0]?.day || ""}</span>
                                  <span className="text-[10px] text-gray-400">{siteAnalytics.dailyViews[siteAnalytics.dailyViews.length - 1]?.date || siteAnalytics.dailyViews[siteAnalytics.dailyViews.length - 1]?.day || ""}</span>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Top Pages</CardTitle></CardHeader>
                              <CardContent>
                                {(siteAnalytics.topPages || []).length === 0 ? (
                                  <p className="text-xs text-gray-400 py-4 text-center">No page data yet</p>
                                ) : (
                                  <div className="space-y-2">
                                    {(siteAnalytics.topPages || []).slice(0, 10).map((p: any, i: number) => {
                                      const maxP = Math.max(...(siteAnalytics.topPages || []).map((x: any) => x.views || x.count || 0), 1);
                                      const v = p.views || p.count || 0;
                                      return (
                                        <div key={i} className="flex items-center gap-2">
                                          <div className="flex-1 text-xs text-gray-700 truncate">{p.path || p.page || p.name}</div>
                                          <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(v / maxP) * 100}%` }} />
                                          </div>
                                          <div className="w-10 text-xs font-semibold text-right text-gray-600">{v}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Top Referrers</CardTitle></CardHeader>
                              <CardContent>
                                {(siteAnalytics.topReferrers || []).length === 0 ? (
                                  <p className="text-xs text-gray-400 py-4 text-center">No referrer data yet</p>
                                ) : (
                                  <div className="space-y-2">
                                    {(siteAnalytics.topReferrers || []).slice(0, 10).map((r: any, i: number) => {
                                      const maxR = Math.max(...(siteAnalytics.topReferrers || []).map((x: any) => x.views || x.count || 0), 1);
                                      const v = r.views || r.count || 0;
                                      return (
                                        <div key={i} className="flex items-center gap-2">
                                          <div className="flex-1 text-xs text-gray-700 truncate">{r.referrer || r.source || r.name}</div>
                                          <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-400 rounded-full" style={{ width: `${(v / maxR) * 100}%` }} />
                                          </div>
                                          <div className="w-10 text-xs font-semibold text-right text-gray-600">{v}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>

                          <div className="grid md:grid-cols-3 gap-6">
                            {[
                              { title: "Devices", data: siteAnalytics.devices, color: "bg-purple-400" },
                              { title: "Browsers", data: siteAnalytics.browsers, color: "bg-amber-400" },
                              { title: "Operating Systems", data: siteAnalytics.operatingSystems, color: "bg-cyan-400" },
                            ].map((section) => (
                              <Card key={section.title} className="border border-primary/10">
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">{section.title}</CardTitle></CardHeader>
                                <CardContent>
                                  {(section.data || []).length === 0 ? (
                                    <p className="text-xs text-gray-400 py-4 text-center">No data</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {(section.data || []).slice(0, 6).map((item: any, i: number) => {
                                        const maxD = Math.max(...(section.data || []).map((x: any) => x.count || 0), 1);
                                        return (
                                          <div key={i} className="flex items-center gap-2">
                                            <div className="flex-1 text-xs text-gray-700 truncate">{item.name}</div>
                                            <div className="w-20 h-3 bg-gray-100 rounded-full overflow-hidden">
                                              <div className={`h-full ${section.color} rounded-full`} style={{ width: `${(item.count / maxD) * 100}%` }} />
                                            </div>
                                            <div className="w-8 text-xs font-semibold text-right text-gray-600">{item.count}</div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </>
                      )}

                      {analyticsSubTab === "users" && (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border border-primary/10">
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold text-gray-900">{(siteAnalytics.totalUsers || 0).toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Total Users</div>
                              </CardContent>
                            </Card>
                            <Card className="border border-primary/10">
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold text-green-600">{(siteAnalytics.activeSubscribers || 0).toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Active Subscribers</div>
                              </CardContent>
                            </Card>
                            <Card className="border border-primary/10">
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold text-purple-600">{siteAnalytics.conversionRate || 0}%</div>
                                <div className="text-xs text-gray-500">Conversion Rate</div>
                              </CardContent>
                            </Card>
                            <Card className="border border-primary/10">
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold text-amber-600">{(siteAnalytics.conversionFunnel?.checkoutIntents || 0).toLocaleString()}</div>
                                <div className="text-xs text-gray-500">Checkout Intents</div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Tier Distribution</CardTitle></CardHeader>
                              <CardContent>
                                {(() => {
                                  const tiers = siteAnalytics.subscriptionBreakdown || {};
                                  const entries = Object.entries(tiers) as [string, number][];
                                  const total = entries.reduce((s, [, v]) => s + (v as number), 0) || 1;
                                  const colors: Record<string, string> = { free: "bg-gray-400", rpn: "bg-blue-500", rn: "bg-purple-500", np: "bg-amber-500", admin: "bg-red-500" };
                                  return (
                                    <div className="space-y-3">
                                      {entries.map(([tier, count]) => (
                                        <div key={tier}>
                                          <div className="flex justify-between text-xs mb-1">
                                            <span className="font-medium text-gray-700">{tierLabels[tier] || tier}</span>
                                            <span className="text-gray-500">{(count as number)} ({Math.round(((count as number) / total) * 100)}%)</span>
                                          </div>
                                          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${colors[tier] || "bg-gray-400"} rounded-full`} style={{ width: `${((count as number) / total) * 100}%` }} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                              </CardContent>
                            </Card>

                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Subscription Status</CardTitle></CardHeader>
                              <CardContent>
                                {(() => {
                                  const statuses = siteAnalytics.subscriptionStatus || {};
                                  const entries = Object.entries(statuses) as [string, number][];
                                  const total = entries.reduce((s, [, v]) => s + (v as number), 0) || 1;
                                  const colors: Record<string, string> = { active: "bg-green-500", inactive: "bg-gray-400", canceled: "bg-red-400", past_due: "bg-yellow-500" };
                                  return (
                                    <div className="space-y-3">
                                      {entries.map(([status, count]) => (
                                        <div key={status}>
                                          <div className="flex justify-between text-xs mb-1">
                                            <span className="font-medium text-gray-700 capitalize">{status.replace("_", " ")}</span>
                                            <span className="text-gray-500">{(count as number)} ({Math.round(((count as number) / total) * 100)}%)</span>
                                          </div>
                                          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${colors[status] || "bg-gray-400"} rounded-full`} style={{ width: `${((count as number) / total) * 100}%` }} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                              </CardContent>
                            </Card>
                          </div>

                          {siteAnalytics.countries && Object.keys(siteAnalytics.countries).length > 0 && (
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Geographic Distribution</CardTitle></CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {Object.entries(siteAnalytics.countries || {}).sort((a: any, b: any) => b[1] - a[1]).slice(0, 12).map(([country, count]: any) => (
                                    <div key={country} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                                      <span className="text-xs text-gray-700">{country}</span>
                                      <span className="text-xs font-semibold text-gray-600">{count}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {siteAnalytics.userRegions && Object.keys(siteAnalytics.userRegions).length > 0 && (
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">User Regions (Registered)</CardTitle></CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {Object.entries(siteAnalytics.userRegions || {}).sort((a: any, b: any) => b[1] - a[1]).map(([region, count]: any) => (
                                    <div key={region} className="flex items-center gap-2">
                                      <div className="flex-1 text-xs text-gray-700">{region || "Unknown"}</div>
                                      <div className="w-10 text-xs font-semibold text-right text-gray-600">{count}</div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </>
                      )}

                      {analyticsSubTab === "content" && (
                        <>
                          {siteAnalytics.blogContent && siteAnalytics.blogContent.length > 0 && (
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Top Blog Content</CardTitle></CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {siteAnalytics.blogContent.slice(0, 10).map((b: any, i: number) => {
                                    const maxB = Math.max(...siteAnalytics.blogContent.map((x: any) => x.views || x.count || 0), 1);
                                    const v = b.views || b.count || 0;
                                    return (
                                      <div key={i} className="flex items-center gap-2">
                                        <div className="flex-1 text-xs text-gray-700 truncate">{b.title || b.slug || b.path || b.name}</div>
                                        <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden">
                                          <div className="h-full bg-pink-400 rounded-full" style={{ width: `${(v / maxB) * 100}%` }} />
                                        </div>
                                        <div className="w-10 text-xs font-semibold text-right text-gray-600">{v}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <Card className="border border-primary/10">
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">SEO Overview</CardTitle></CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="text-xl font-bold text-gray-900">{(siteAnalytics.traffic?.totalViews || 0).toLocaleString()}</div>
                                  <div className="text-[10px] text-gray-500">Total Impressions</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="text-xl font-bold text-gray-900">{(siteAnalytics.topPages || []).length}</div>
                                  <div className="text-[10px] text-gray-500">Unique Pages Visited</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="text-xl font-bold text-gray-900">{(siteAnalytics.topReferrers || []).length}</div>
                                  <div className="text-[10px] text-gray-500">Referral Sources</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="text-xl font-bold text-gray-900">{(siteAnalytics.blogContent || []).length}</div>
                                  <div className="text-[10px] text-gray-500">Blog Posts Tracked</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      )}

                      {analyticsSubTab === "campaigns" && (
                        <>
                          {(siteAnalytics.utmCampaigns || []).length > 0 && (
                            <Card className="border border-primary/10">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">UTM Campaigns</CardTitle></CardHeader>
                              <CardContent>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="border-b text-left text-gray-500">
                                        <th className="pb-2">Campaign</th>
                                        <th className="pb-2">Source</th>
                                        <th className="pb-2">Medium</th>
                                        <th className="pb-2 text-right">Views</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {siteAnalytics.utmCampaigns.slice(0, 15).map((c: any, i: number) => (
                                        <tr key={i} className="border-b border-gray-50">
                                          <td className="py-2 font-medium text-gray-700">{c.campaign || c.name || "-"}</td>
                                          <td className="py-2 text-gray-600">{c.source || "-"}</td>
                                          <td className="py-2 text-gray-600">{c.medium || "-"}</td>
                                          <td className="py-2 text-right font-semibold text-gray-700">{(c.views || c.count || 0).toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {(() => {
                            const sources = siteAnalytics.utmSources || {};
                            const mediums = siteAnalytics.utmMediums || {};
                            const hasSources = Object.keys(sources).length > 0;
                            const hasMediums = Object.keys(mediums).length > 0;
                            if (!hasSources && !hasMediums) return null;
                            return (
                              <div className="grid md:grid-cols-2 gap-6">
                                {hasSources && (
                                  <Card className="border border-primary/10">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Traffic Sources (UTM)</CardTitle></CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        {Object.entries(sources).sort((a: any, b: any) => b[1] - a[1]).slice(0, 8).map(([src, cnt]: any) => (
                                          <div key={src} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                                            <span className="text-xs text-gray-700">{src}</span>
                                            <span className="text-xs font-semibold text-gray-600">{cnt}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                                {hasMediums && (
                                  <Card className="border border-primary/10">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Traffic Mediums (UTM)</CardTitle></CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        {Object.entries(mediums).sort((a: any, b: any) => b[1] - a[1]).slice(0, 8).map(([med, cnt]: any) => (
                                          <div key={med} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                                            <span className="text-xs text-gray-700">{med}</span>
                                            <span className="text-xs font-semibold text-gray-600">{cnt}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            );
                          })()}

                          {(siteAnalytics.utmCampaigns || []).length === 0 && !Object.keys(siteAnalytics.utmSources || {}).length && (
                            <Card className="border border-primary/10">
                              <CardContent className="p-8 text-center text-gray-400">
                                <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
                                <p className="text-sm">No UTM campaign data yet. Add UTM parameters to your marketing links to track campaigns.</p>
                              </CardContent>
                            </Card>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 py-10">No analytics data available yet.</p>
                  )}
                </div>
              )}

              {activeTab === "promotions" && (
                <div className="space-y-6" data-testid="section-promotions">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Promotion Codes</h2>
                    <Button size="sm" variant="outline" onClick={fetchPromotions} disabled={promotionsLoading} className="gap-2" data-testid="button-refresh-promotions">
                      <RefreshCw className={`w-4 h-4 ${promotionsLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>

                  <Card className="border border-primary/10">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Create Promotion Code</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Code Name</label>
                          <Input placeholder="SUMMER25" value={newPromo.code} onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })} data-testid="input-promo-code" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Discount Type</label>
                          <select className="w-full border rounded-md px-3 py-2 text-sm" value={newPromo.discountType} onChange={(e) => setNewPromo({ ...newPromo, discountType: e.target.value })} data-testid="select-promo-type">
                            <option value="percent_off">Percentage Off</option>
                            <option value="amount_off">Fixed Amount Off (cents)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{newPromo.discountType === "percent_off" ? "Percentage" : "Amount (cents)"}</label>
                          <Input type="number" placeholder={newPromo.discountType === "percent_off" ? "25" : "500"} value={newPromo.amount} onChange={(e) => setNewPromo({ ...newPromo, amount: e.target.value })} data-testid="input-promo-amount" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Duration</label>
                          <select className="w-full border rounded-md px-3 py-2 text-sm" value={newPromo.duration} onChange={(e) => setNewPromo({ ...newPromo, duration: e.target.value })} data-testid="select-promo-duration">
                            <option value="once">Once</option>
                            <option value="repeating">Repeating</option>
                            <option value="forever">Forever</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Max Uses (optional)</label>
                          <Input type="number" placeholder="100" value={newPromo.maxRedemptions} onChange={(e) => setNewPromo({ ...newPromo, maxRedemptions: e.target.value })} data-testid="input-promo-max" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Expires (optional)</label>
                          <Input type="date" value={newPromo.expiresAt} onChange={(e) => setNewPromo({ ...newPromo, expiresAt: e.target.value })} data-testid="input-promo-expires" />
                        </div>
                      </div>
                      <Button onClick={createPromotion} disabled={promoCreating || !newPromo.code || !newPromo.amount} className="gap-2" data-testid="button-create-promo">
                        <Plus className="w-4 h-4" />
                        {promoCreating ? "Creating..." : "Create Promotion"}
                      </Button>
                    </CardContent>
                  </Card>

                  {promotionsLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : promotions.length === 0 ? (
                    <Card className="border border-primary/10">
                      <CardContent className="p-8 text-center text-gray-400">
                        <Tag className="w-10 h-10 mx-auto mb-3 opacity-40" />
                        <p className="text-sm">No promotion codes yet. Create one above to offer discounts.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {promotions.map((promo: any) => (
                        <Card key={promo.id} className="border border-primary/10" data-testid={`card-promo-${promo.id}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge variant={promo.active ? "default" : "secondary"} data-testid={`badge-promo-status-${promo.id}`}>
                                  {promo.active ? "Active" : "Inactive"}
                                </Badge>
                                <span className="font-mono font-bold text-sm" data-testid={`text-promo-code-${promo.id}`}>{promo.code}</span>
                                <span className="text-xs text-gray-500">
                                  {promo.percentOff ? `${promo.percentOff}% off` : promo.amountOff ? `$${(promo.amountOff / 100).toFixed(2)} off` : ""}
                                </span>
                                <span className="text-xs text-gray-400">{promo.duration}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500">
                                  {promo.timesRedeemed || 0}{promo.maxRedemptions ? `/${promo.maxRedemptions}` : ""} used
                                </span>
                                {promo.expiresAt && (
                                  <span className="text-xs text-gray-400">
                                    Expires {new Date(promo.expiresAt * 1000).toLocaleDateString()}
                                  </span>
                                )}
                                {promo.active && (
                                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => deletePromotion(promo.id)} data-testid={`button-delete-promo-${promo.id}`}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="space-y-6" data-testid="section-feedback">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Feedback & Feature Requests</h2>
                    <Button size="sm" variant="outline" onClick={fetchFeedback} disabled={feedbackLoading} className="gap-2" data-testid="button-refresh-feedback">
                      <RefreshCw className={`w-4 h-4 ${feedbackLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total", value: feedbackList.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Feature Requests", value: feedbackList.filter((f) => f.type === "feature_request").length, icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Bug Reports", value: feedbackList.filter((f) => f.type === "bug_report").length, icon: Bug, color: "text-red-600", bg: "bg-red-50" },
                      { label: "Open", value: feedbackList.filter((f) => f.status === "new" || f.status === "in_progress").length, icon: Activity, color: "text-green-600", bg: "bg-green-50" },
                    ].map((kpi, i) => (
                      <Card key={i} className="border border-primary/10">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                              <div className="text-xs text-gray-500">{kpi.label}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {feedbackLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : feedbackList.length === 0 ? (
                    <Card className="border border-primary/10">
                      <CardContent className="p-8 text-center text-gray-400">
                        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
                        <p className="text-sm">No feedback received yet.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {feedbackList.map((item) => (
                        <Card key={item.id} className="border border-primary/10" data-testid={`card-admin-feedback-${item.id}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
                                <ThumbsUp className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-bold text-gray-600">{item.upvotes || 0}</span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                      item.type === "bug_report"
                                        ? "bg-red-100 text-red-700"
                                        : item.type === "feature_request"
                                        ? "bg-amber-100 text-amber-700"
                                        : item.type === "question"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {(item.type || "feedback").replace(/_/g, " ")}
                                  </span>
                                  {item.category && item.category !== "general" && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">
                                      {item.category.replace(/-/g, " ")}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-gray-500 mb-2">{item.description}</p>

                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                  <span>{item.username || "Anonymous"}</span>
                                  {item.email && <span>{item.email}</span>}
                                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  <select
                                    value={item.status || "new"}
                                    onChange={(e) => updateFeedbackItem(item.id, { status: e.target.value })}
                                    className="text-xs border rounded-md px-2 py-1 bg-white"
                                    data-testid={`select-feedback-status-${item.id}`}
                                  >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="planned">Planned</option>
                                    <option value="completed">Completed</option>
                                    <option value="declined">Declined</option>
                                  </select>

                                  <select
                                    value={item.priority || "medium"}
                                    onChange={(e) => updateFeedbackItem(item.id, { priority: e.target.value })}
                                    className="text-xs border rounded-md px-2 py-1 bg-white"
                                    data-testid={`select-feedback-priority-${item.id}`}
                                  >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                    <option value="critical">Critical</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "social" && (
                <div className="space-y-6" data-testid="section-social">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Social Media Scheduler</h2>
                    <Button size="sm" variant="outline" onClick={fetchSocialPosts} disabled={socialLoading} className="gap-2" data-testid="button-refresh-social">
                      <RefreshCw className={`w-4 h-4 ${socialLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>

                  <Card className="border border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Create New Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Platform</label>
                          <select
                            value={newPost.platform}
                            onChange={(e) => setNewPost((p) => ({ ...p, platform: e.target.value }))}
                            className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                            data-testid="select-social-platform"
                          >
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Tier Focus</label>
                          <select
                            value={newPost.tier}
                            onChange={(e) => setNewPost((p) => ({ ...p, tier: e.target.value }))}
                            className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                            data-testid="select-social-tier"
                          >
                            <option value="rpn">RPN/LVN</option>
                            <option value="rn">RN</option>
                            <option value="np">NP</option>
                            <option value="general">General</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Schedule For</label>
                          <input
                            type="datetime-local"
                            value={newPost.scheduledAt}
                            onChange={(e) => setNewPost((p) => ({ ...p, scheduledAt: e.target.value }))}
                            className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                            data-testid="input-social-schedule"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Post Content</label>
                        <textarea
                          value={newPost.content}
                          onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))}
                          placeholder="Write your social post... Use engagement hooks like 'Comment your answer below!'"
                          rows={4}
                          className="w-full border rounded-md px-3 py-2 text-sm bg-white resize-none"
                          data-testid="input-social-content"
                        />
                      </div>
                      {newPost.platform === "instagram" && (
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Image URL (required for Instagram)</label>
                          <input
                            type="url"
                            value={newPost.imageUrl}
                            onChange={(e) => setNewPost((p) => ({ ...p, imageUrl: e.target.value }))}
                            placeholder="https://www.nursenest.ca/images/..."
                            className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                            data-testid="input-social-image"
                          />
                        </div>
                      )}
                      <Button onClick={createSocialPost} disabled={!newPost.content.trim()} className="gap-2" data-testid="button-create-social-post">
                        Schedule Post
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-sm">Scheduled & Published Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {socialLoading ? (
                        <div className="flex items-center justify-center py-10">
                          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                        </div>
                      ) : socialPosts.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No posts scheduled yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {socialPosts.map((post: any) => (
                            <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50" data-testid={`card-social-post-${post.id}`}>
                              <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${post.platform === "facebook" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>
                                {post.platform}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-3">{post.content}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                  <span className={`font-medium ${post.status === "published" ? "text-green-600" : post.status === "failed" ? "text-red-600" : "text-amber-600"}`}>
                                    {post.status}
                                  </span>
                                  {post.scheduledAt && <span>Scheduled: {new Date(post.scheduledAt).toLocaleString()}</span>}
                                  <span className="capitalize">{post.tier}</span>
                                </div>
                              </div>
                              {post.status === "draft" && (
                                <Button size="sm" variant="ghost" className="text-red-500 text-xs" onClick={() => deleteSocialPost(post.id)} data-testid={`button-delete-social-${post.id}`}>
                                  Delete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "audit" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Audit Log</h2>
                    <Button size="sm" variant="outline" onClick={fetchAuditLogs} data-testid="button-refresh-audit">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                  <Card className="border border-primary/10">
                    <CardContent className="p-0">
                      {auditLoading ? (
                        <div className="flex items-center justify-center py-10">
                          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                        </div>
                      ) : auditLogs.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No audit log entries yet. Changes to content will appear here.</p>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {auditLogs.map((log: any, idx: number) => (
                            <div key={log.id || idx} className="p-4 hover:bg-gray-50/50 transition-colors" data-testid={`card-audit-log-${idx}`}>
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                      log.action === "create" ? "bg-green-100 text-green-700" :
                                      log.action === "update" ? "bg-blue-100 text-blue-700" :
                                      log.action === "delete" ? "bg-red-100 text-red-700" :
                                      log.action === "restore_revision" ? "bg-purple-100 text-purple-700" :
                                      "bg-gray-100 text-gray-700"
                                    }`}>
                                      {log.action}
                                    </span>
                                    <span className="text-xs text-gray-500 capitalize">{log.entityType}</span>
                                    {log.entityId && <span className="text-xs text-gray-400 font-mono truncate max-w-[120px]">{log.entityId.substring(0, 8)}...</span>}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="font-medium text-gray-700">{log.actorUsername || "System"}</span>
                                    <span>{log.createdAt ? new Date(log.createdAt).toLocaleString() : ""}</span>
                                  </div>
                                  {(log.beforeJson || log.afterJson) && (
                                    <div className="mt-2 flex gap-4 text-xs">
                                      {log.beforeJson && (
                                        <div className="bg-red-50 rounded p-2 flex-1">
                                          <span className="font-semibold text-red-600">Before: </span>
                                          <span className="text-gray-600">{typeof log.beforeJson === "string" ? log.beforeJson : JSON.stringify(log.beforeJson, null, 1)}</span>
                                        </div>
                                      )}
                                      {log.afterJson && (
                                        <div className="bg-green-50 rounded p-2 flex-1">
                                          <span className="font-semibold text-green-600">After: </span>
                                          <span className="text-gray-600">{typeof log.afterJson === "string" ? log.afterJson : JSON.stringify(log.afterJson, null, 1)}</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}