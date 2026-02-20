import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
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
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("lastActivity");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "activity" | "content" | "blog">("overview");
  const [blogConfig, setBlogConfig] = useState<any>(null);
  const [blogGenerating, setBlogGenerating] = useState(false);
  const [blogTopic, setBlogTopic] = useState("");

  const isAdmin = user?.tier === "admin";

  useEffect(() => {
    if (!user || !isAdmin) return;
    fetchData();
  }, [user]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
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
        const err = await res.json();
        throw new Error(err.error || "Failed to load analytics");
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/blog/config").then(r => r.json()).then(setBlogConfig).catch(() => {});
  }, []);

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
        body: JSON.stringify({ username, password, topic: blogTopic || undefined, citationStyle: blogConfig?.citationStyle || "apa7" }),
      });
      if (res.ok) {
        setBlogTopic("");
        alert("Blog post generated and published!");
      }
    } catch (e) {
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
      const result = await res.json();
      alert(result.message);
    } catch (e) {
      alert("Scheduler failed");
    } finally {
      setBlogGenerating(false);
    }
  }

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
              <Button onClick={() => setLocation("/login")} data-testid="button-admin-login">Log In</Button>
            </CardContent>
          </Card>
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
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const filteredUsers = data?.users.filter((u) => {
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
      case "username": aVal = a.username; bVal = b.username; break;
      case "tier": aVal = a.tier; bVal = b.tier; break;
      case "testsCompleted": aVal = a.testsCompleted; bVal = b.testsCompleted; break;
      case "lessonsAccessed": aVal = a.lessonsAccessed; bVal = b.lessonsAccessed; break;
      case "lastActivity":
        aVal = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        bVal = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
        break;
      default: aVal = a.username; bVal = b.username;
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
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO title="Admin Dashboard - NurseNest" description="Admin analytics dashboard" canonicalPath="/admin" />
      <Navigation />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="text-admin-title">Admin Dashboard</h1>
              <p className="text-gray-500 mt-1">Platform analytics and user management</p>
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
                {(["overview", "users", "activity", "content", "blog"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    data-testid={`tab-${tab}`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "users" && `Users (${data.overview.totalUsers})`}
                    {tab === "activity" && "Recent Activity"}
                    {tab === "content" && "Content Analytics"}
                    {tab === "blog" && "Blog Automation"}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="section-kpi">
                    {[
                      { label: "Total Users", value: data.overview.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Active (7 days)", value: data.overview.activeUsers7Day, icon: Activity, color: "text-green-600", bg: "bg-green-50" },
                      { label: "Active (30 days)", value: data.overview.activeUsers30Day, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
                      { label: "Total Tests", value: data.overview.totalTests, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Lessons Accessed", value: data.overview.totalLessonsAccessed, icon: BookOpen, color: "text-cyan-600", bg: "bg-cyan-50" },
                      { label: "Notes Created", value: data.overview.totalNotes, icon: StickyNote, color: "text-pink-600", bg: "bg-pink-50" },
                      { label: "Avg Test Score", value: `${data.overview.averageTestScore}%`, icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
                      { label: "Retention Rate", value: data.overview.totalUsers > 0 ? `${Math.round((data.overview.activeUsers30Day / data.overview.totalUsers) * 100)}%` : "0%", icon: Clock, color: "text-teal-600", bg: "bg-teal-50" },
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

                  {/* Distribution Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Tier Distribution */}
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

                    {/* Subscription Status */}
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

                    {/* Region Distribution */}
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
                            <th className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => toggleSort("username")}>
                              User <SortIcon field="username" />
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => toggleSort("tier")}>
                              Tier <SortIcon field="tier" />
                            </th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Region</th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => toggleSort("testsCompleted")}>
                              Tests <SortIcon field="testsCompleted" />
                            </th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => toggleSort("lessonsAccessed")}>
                              Lessons <SortIcon field="lessonsAccessed" />
                            </th>
                            <th className="text-center px-4 py-3 font-medium text-gray-600">Notes</th>
                            <th className="text-right px-4 py-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900" onClick={() => toggleSort("lastActivity")}>
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
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.subscriptionStatus] || "bg-gray-100 text-gray-600"}`}>
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
                                <div className={`text-sm font-semibold ${
                                  (act.score / act.totalQuestions) >= 0.8 ? "text-green-600" :
                                  (act.score / act.totalQuestions) >= 0.6 ? "text-yellow-600" : "text-red-600"
                                }`}>
                                  {act.score}/{act.totalQuestions} ({Math.round((act.score / act.totalQuestions) * 100)}%)
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

              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-6">
                  <Card className="border border-primary/10" data-testid="card-top-lessons">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">Most Accessed Lessons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.topLessons.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No lesson data yet</p>
                      ) : (
                        <div className="space-y-3">
                          {data.topLessons.map((lesson, i) => {
                            const maxCount = data.topLessons[0]?.accessCount || 1;
                            return (
                              <div key={i} className="flex items-center gap-4" data-testid={`row-lesson-${i}`}>
                                <span className="text-xs font-mono text-gray-400 w-6 text-right">{i + 1}.</span>
                                <div className="flex-grow">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{formatLessonId(lesson.lessonId)}</span>
                                    <span className="text-xs text-gray-500">{lesson.accessCount} views</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary rounded-full transition-all"
                                      style={{ width: `${(lesson.accessCount / maxCount) * 100}%` }}
                                    />
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

              {/* Blog Automation Tab */}
              {activeTab === "blog" && (
                <div className="space-y-6">
                  <Card className="border border-primary/10" data-testid="card-blog-config">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">Blog Automation Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Status</label>
                          <Button
                            size="sm"
                            variant={blogConfig?.isActive ? "default" : "outline"}
                            onClick={() => handleBlogConfigUpdate({ isActive: !blogConfig?.isActive })}
                            data-testid="button-toggle-blog-automation"
                          >
                            {blogConfig?.isActive ? "Active" : "Inactive"}
                          </Button>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Citation Style</label>
                          <div className="flex gap-2">
                            <Button size="sm" variant={blogConfig?.citationStyle === "apa7" ? "default" : "outline"} onClick={() => handleBlogConfigUpdate({ citationStyle: "apa7" })} data-testid="button-apa7">APA 7</Button>
                            <Button size="sm" variant={blogConfig?.citationStyle === "mla" ? "default" : "outline"} onClick={() => handleBlogConfigUpdate({ citationStyle: "mla" })} data-testid="button-mla">MLA</Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Day Count:</span>{" "}
                          <strong>{blogConfig?.dayCount || 0}</strong>
                        </div>
                        <div>
                          <span className="text-gray-500">Total Posts:</span>{" "}
                          <strong>{blogConfig?.totalPostsGenerated || 0}</strong>
                        </div>
                        <div>
                          <span className="text-gray-500">Posts/Day:</span>{" "}
                          <strong>{(blogConfig?.dayCount || 0) < 120 ? (blogConfig?.postsPerDay || 2) : 1}</strong>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        Schedule: 2x/day for 120 days, then 1x/day for 100 days (220 total days)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10" data-testid="card-blog-generate">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">Generate Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <input
                        type="text"
                        placeholder="Topic (optional - random if blank)"
                        value={blogTopic}
                        onChange={(e) => setBlogTopic(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        data-testid="input-blog-topic"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleGenerateBlogPost} disabled={blogGenerating} data-testid="button-generate-blog">
                          {blogGenerating ? "Generating..." : "Generate & Publish"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleRunScheduler} disabled={blogGenerating} data-testid="button-run-scheduler">
                          {blogGenerating ? "Running..." : "Run Scheduler"}
                        </Button>
                      </div>
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
