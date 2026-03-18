import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  Shield, Users, Clock, RefreshCw, Search, ArrowLeft, Copy, Check,
  AlertTriangle, Activity, Plus, Loader2, MessageSquare, Send,
  LifeBuoy, UserCheck, CreditCard, RotateCcw, Zap, FileText,
  CheckCircle2, XCircle, ChevronDown, ChevronUp, Trash2, StickyNote
} from "lucide-react";

type TabType = "overview" | "rescue" | "templates" | "incidents" | "notes";

function formatDate(d: string | null) {
  if (!d) return "N/A";
  return new Date(d).toLocaleString();
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  rescued: "bg-green-100 text-green-800",
  acknowledged: "bg-blue-100 text-blue-800",
  skipped: "bg-gray-100 text-gray-600",
  active: "bg-red-100 text-red-800",
  investigating: "bg-yellow-100 text-yellow-800",
  mitigated: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const CATEGORY_COLORS: Record<string, string> = {
  incident: "bg-red-100 text-red-700",
  assurance: "bg-blue-100 text-blue-700",
  resolution: "bg-green-100 text-green-700",
  goodwill: "bg-purple-100 text-purple-700",
  support: "bg-teal-100 text-teal-700",
  billing: "bg-amber-100 text-amber-700",
};

const RESCUE_ACTIONS = [
  { key: "extend_subscription", label: "Extend Subscription", icon: Clock, desc: "Add days to subscription" },
  { key: "grant_temporary_access", label: "Grant Temporary Access", icon: UserCheck, desc: "Temporary full access" },
  { key: "restore_entitlement", label: "Restore Entitlement", icon: Shield, desc: "Restore tier/access level" },
  { key: "replay_billing_sync", label: "Replay Billing Sync", icon: CreditCard, desc: "Re-sync with Stripe" },
  { key: "reset_stuck_state", label: "Reset Stuck State", icon: RotateCcw, desc: "Clear stuck sessions" },
];

export default function AdminSubscriberRescuePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: string; userId: string; username: string } | null>(null);
  const [actionParams, setActionParams] = useState<any>({});
  const [actionReason, setActionReason] = useState("");
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [bulkDays, setBulkDays] = useState(7);
  const [bulkHours, setBulkHours] = useState(24);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editTemplate, setEditTemplate] = useState<any>(null);
  const [templateForm, setTemplateForm] = useState({ name: "", category: "incident", subject: "", body: "", placeholders: "" });
  const [populateValues, setPopulateValues] = useState<Record<string, string>>({});
  const [populatedResult, setPopulatedResult] = useState<{ subject: string; body: string } | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("general");

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/rescue/stats"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/rescue/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: searchResults, refetch: searchUsers } = useQuery({
    queryKey: ["/api/admin/rescue/user-search", searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      const res = await adminFetch(`/api/admin/rescue/user-search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: searchQuery.length >= 2,
  });

  const { data: userProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["/api/admin/rescue/user-profile", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const res = await adminFetch(`/api/admin/rescue/user/${selectedUserId}/profile`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!selectedUserId,
  });

  const { data: templates, refetch: refetchTemplates } = useQuery({
    queryKey: ["/api/admin/rescue/templates"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/rescue/templates");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === "templates" || activeTab === "rescue",
  });

  const { data: incidents } = useQuery({
    queryKey: ["/api/admin/rescue/incidents-list"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/rescue/incidents-list");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === "incidents" || activeTab === "overview",
  });

  const { data: affectedUsers, refetch: refetchAffected } = useQuery({
    queryKey: ["/api/admin/rescue/affected-users", selectedIncidentId],
    queryFn: async () => {
      if (!selectedIncidentId) return [];
      const res = await adminFetch(`/api/admin/rescue/incidents/${selectedIncidentId}/affected-users`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!selectedIncidentId,
  });

  const { data: rescueActions } = useQuery({
    queryKey: ["/api/admin/rescue/actions", selectedUserId],
    queryFn: async () => {
      const params: string[] = [];
      if (selectedUserId) params.push(`userId=${selectedUserId}`);
      const res = await adminFetch(`/api/admin/rescue/actions?${params.join("&")}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: activeTab === "overview" || !!selectedUserId,
  });

  const rescueMutation = useMutation({
    mutationFn: async ({ action, userId, params: ap, reason, incidentId }: any) => {
      const endpointMap: Record<string, string> = {
        extend_subscription: "/api/admin/rescue/extend-subscription",
        grant_temporary_access: "/api/admin/rescue/grant-temporary-access",
        restore_entitlement: "/api/admin/rescue/restore-entitlement",
        replay_billing_sync: "/api/admin/rescue/replay-billing-sync",
        reset_stuck_state: "/api/admin/rescue/reset-stuck-state",
      };
      const url = endpointMap[action];
      if (!url) throw new Error("Unknown action");
      const res = await adminFetch(url, { method: "POST", body: { userId, ...ap, reason, incidentId } });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Action failed"); }
      return res.json();
    },
    onSuccess: () => {
      setConfirmAction(null);
      setActionParams({});
      setActionReason("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rescue"] });
      refetchProfile();
    },
  });

  const bulkMutation = useMutation({
    mutationFn: async () => {
      const ap: any = {};
      if (bulkAction === "extend_subscription") ap.days = bulkDays;
      if (bulkAction === "grant_temporary_access") ap.durationHours = bulkHours;
      const res = await adminFetch("/api/admin/rescue/bulk-action", {
        method: "POST",
        body: { affectedUserIds: Array.from(bulkSelected), action: bulkAction, actionParams: ap, reason: actionReason, incidentId: selectedIncidentId },
      });
      if (!res.ok) throw new Error("Bulk action failed");
      return res.json();
    },
    onSuccess: () => {
      setBulkSelected(new Set());
      setBulkAction("");
      setActionReason("");
      refetchAffected();
    },
  });

  const seedTemplatesMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/rescue/templates/seed", { method: "POST" });
      if (!res.ok) throw new Error("Seed failed");
      return res.json();
    },
    onSuccess: () => refetchTemplates(),
  });

  const saveTemplateMutation = useMutation({
    mutationFn: async () => {
      const placeholders = templateForm.placeholders.split(",").map(s => s.trim()).filter(Boolean);
      const body = { ...templateForm, placeholders };
      if (editTemplate) {
        const res = await adminFetch(`/api/admin/rescue/templates/${editTemplate.id}`, { method: "PUT", body });
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      }
      const res = await adminFetch("/api/admin/rescue/templates", { method: "POST", body });
      if (!res.ok) throw new Error("Create failed");
      return res.json();
    },
    onSuccess: () => {
      setShowTemplateEditor(false);
      setEditTemplate(null);
      setTemplateForm({ name: "", category: "incident", subject: "", body: "", placeholders: "" });
      refetchTemplates();
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/rescue/templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => refetchTemplates(),
  });

  const addNoteMutation = useMutation({
    mutationFn: async () => {
      if (!selectedUserId || !noteContent) throw new Error("Missing data");
      const res = await adminFetch(`/api/admin/rescue/user/${selectedUserId}/notes`, {
        method: "POST",
        body: { content: noteContent, category: noteCategory },
      });
      if (!res.ok) throw new Error("Failed to add note");
      return res.json();
    },
    onSuccess: () => {
      setNoteContent("");
      refetchProfile();
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/rescue/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => refetchProfile(),
  });

  const autoDetectMutation = useMutation({
    mutationFn: async (incidentId: string) => {
      const res = await adminFetch(`/api/admin/rescue/incidents/${incidentId}/auto-detect`, { method: "POST" });
      if (!res.ok) throw new Error("Auto-detect failed");
      return res.json();
    },
    onSuccess: () => refetchAffected(),
  });

  async function populateTemplate(templateId: string) {
    const res = await adminFetch(`/api/admin/rescue/templates/${templateId}/populate`, {
      method: "POST",
      body: { values: populateValues },
    });
    if (res.ok) {
      const data = await res.json();
      setPopulatedResult({ subject: data.subject, body: data.body });
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: "overview", label: "Overview", icon: Activity },
    { key: "rescue", label: "Rescue Tools", icon: LifeBuoy },
    { key: "templates", label: "Templates", icon: FileText },
    { key: "incidents", label: "Incidents", icon: AlertTriangle },
    { key: "notes", label: "Support Notes", icon: StickyNote },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} data-testid="button-back-admin">
            <ArrowLeft className="w-4 h-4 mr-1" /> Admin
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2" data-testid="text-page-title">
              <LifeBuoy className="w-6 h-6 text-blue-600" /> Subscriber Rescue
            </h1>
            <p className="text-gray-500 text-sm">Protect subscribers during incidents with rescue tools, templates, and refund prevention</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(t => (
            <Button
              key={t.key}
              variant={activeTab === t.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(t.key)}
              data-testid={`tab-${t.key}`}
              className="whitespace-nowrap"
            >
              <t.icon className="w-4 h-4 mr-1" /> {t.label}
            </Button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Rescue Actions", value: stats?.totalRescueActions ?? 0, icon: Zap, color: "text-blue-600" },
                { label: "Actions (7d)", value: stats?.recentRescueActions ?? 0, icon: Activity, color: "text-green-600" },
                { label: "Pending Affected", value: stats?.pendingAffectedUsers ?? 0, icon: Users, color: "text-orange-600" },
                { label: "Active Incidents", value: stats?.activeIncidents ?? 0, icon: AlertTriangle, color: "text-red-600" },
                { label: "Templates", value: stats?.templateCount ?? 0, icon: FileText, color: "text-purple-600" },
              ].map((s, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
                    <div className="text-2xl font-bold" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Recent Rescue Actions</CardTitle></CardHeader>
                <CardContent>
                  {(rescueActions || []).length === 0 ? (
                    <p className="text-gray-500 text-sm" data-testid="text-no-actions">No rescue actions yet</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(rescueActions || []).slice(0, 10).map((a: any) => (
                        <div key={a.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded" data-testid={`rescue-action-${a.id}`}>
                          <div>
                            <span className="font-medium">{a.actionType?.replace(/_/g, " ")}</span>
                            <span className="text-gray-500 ml-2">on {a.targetUsername || a.targetUserId}</span>
                          </div>
                          <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Active Incidents with Affected Users</CardTitle></CardHeader>
                <CardContent>
                  {(incidents || []).filter((i: any) => i.status === "active" || i.status === "investigating").length === 0 ? (
                    <p className="text-gray-500 text-sm" data-testid="text-no-active-incidents">No active incidents</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(incidents || []).filter((i: any) => i.status === "active" || i.status === "investigating").map((i: any) => (
                        <div key={i.id} className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100" onClick={() => { setSelectedIncidentId(i.id); setActiveTab("incidents"); }} data-testid={`incident-card-${i.id}`}>
                          <div>
                            <Badge className={`mr-2 ${SEVERITY_COLORS[i.severity] || ""}`}>{i.severity}</Badge>
                            <span className="text-sm font-medium">{i.title}</span>
                          </div>
                          <Badge variant="outline">{i.affectedCount || 0} affected</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "rescue" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Search className="w-4 h-4" /> Find Subscriber</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by username, email, or ID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    data-testid="input-user-search"
                    className="flex-1"
                  />
                </div>
                {(searchResults || []).length > 0 && (
                  <div className="mt-3 border rounded-lg divide-y max-h-48 overflow-y-auto">
                    {(searchResults || []).map((u: any) => (
                      <div
                        key={u.id}
                        className={`p-3 cursor-pointer hover:bg-blue-50 flex items-center justify-between ${selectedUserId === u.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedUserId(u.id)}
                        data-testid={`user-result-${u.id}`}
                      >
                        <div>
                          <span className="font-medium">{u.username}</span>
                          {u.email && <span className="text-gray-500 text-sm ml-2">{u.email}</span>}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{u.tier || "free"}</Badge>
                          <Badge className={STATUS_COLORS[u.subscriptionStatus] || "bg-gray-100"}>{u.subscriptionStatus || "unknown"}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedUserId && userProfile && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> User Profile: {userProfile.user?.username}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(null)} data-testid="button-clear-user"><XCircle className="w-4 h-4" /></Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-gray-500">Tier:</span> <Badge variant="outline" data-testid="text-user-tier">{userProfile.user?.tier}</Badge></div>
                      <div><span className="text-gray-500">Status:</span> <Badge className={STATUS_COLORS[userProfile.user?.subscriptionStatus] || ""} data-testid="text-user-status">{userProfile.user?.subscriptionStatus}</Badge></div>
                      <div><span className="text-gray-500">Expires:</span> <span data-testid="text-user-expiry">{formatDate(userProfile.user?.planExpiresAt)}</span></div>
                      <div><span className="text-gray-500">Region:</span> <span data-testid="text-user-region">{userProfile.user?.region || "N/A"}</span></div>
                      <div><span className="text-gray-500">Lifetime:</span> <span>{userProfile.user?.isLifetime ? "Yes" : "No"}</span></div>
                      <div><span className="text-gray-500">Tester:</span> <span>{userProfile.user?.testerAccess ? `Yes (until ${formatDate(userProfile.user?.testerExpiry)})` : "No"}</span></div>
                      <div><span className="text-gray-500">Stripe ID:</span> <span className="text-xs">{userProfile.user?.stripeCustomerId || "N/A"}</span></div>
                      <div><span className="text-gray-500">Email:</span> <span className="text-xs">{userProfile.user?.email || "N/A"}</span></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Zap className="w-4 h-4" /> Rescue Actions</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {RESCUE_ACTIONS.map(ra => (
                        <button
                          key={ra.key}
                          className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                          onClick={() => setConfirmAction({ action: ra.key, userId: selectedUserId!, username: userProfile.user?.username })}
                          data-testid={`button-rescue-${ra.key}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <ra.icon className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-sm">{ra.label}</span>
                          </div>
                          <p className="text-xs text-gray-500">{ra.desc}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {userProfile.rescueActions?.length > 0 && (
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Rescue History</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {userProfile.rescueActions.map((a: any) => (
                          <div key={a.id} className="p-2 bg-gray-50 rounded text-sm flex items-center justify-between" data-testid={`user-rescue-action-${a.id}`}>
                            <div>
                              <span className="font-medium">{a.actionType?.replace(/_/g, " ")}</span>
                              {a.reason && <span className="text-gray-500 ml-2">- {a.reason}</span>}
                              <span className="text-gray-400 text-xs ml-2">by {a.actorUsername}</span>
                            </div>
                            <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {userProfile.affectedIncidents?.length > 0 && (
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Linked Incidents</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userProfile.affectedIncidents.map((ai: any) => (
                          <div key={ai.id} className="p-2 bg-gray-50 rounded text-sm flex items-center justify-between" data-testid={`linked-incident-${ai.id}`}>
                            <div>
                              <Badge className={`mr-2 ${SEVERITY_COLORS[ai.incidentSeverity] || ""}`}>{ai.incidentSeverity}</Badge>
                              <span className="font-medium">{ai.incidentTitle || ai.incidentId}</span>
                              <Badge className={`ml-2 ${STATUS_COLORS[ai.rescueStatus] || ""}`}>{ai.rescueStatus}</Badge>
                            </div>
                            <span className="text-xs text-gray-400">{formatDate(ai.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {confirmAction && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="modal-confirm-action">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Confirm Rescue Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="font-medium">{RESCUE_ACTIONS.find(r => r.key === confirmAction.action)?.label}</p>
                      <p className="text-gray-500">Target: {confirmAction.username} ({confirmAction.userId})</p>
                    </div>

                    {confirmAction.action === "extend_subscription" && (
                      <div>
                        <label className="text-sm text-gray-600">Extension (days)</label>
                        <Input type="number" value={actionParams.days || 7} onChange={e => setActionParams({ ...actionParams, days: parseInt(e.target.value) })} data-testid="input-extend-days" />
                      </div>
                    )}
                    {confirmAction.action === "grant_temporary_access" && (
                      <div>
                        <label className="text-sm text-gray-600">Duration (hours)</label>
                        <Input type="number" value={actionParams.durationHours || 24} onChange={e => setActionParams({ ...actionParams, durationHours: parseInt(e.target.value) })} data-testid="input-access-hours" />
                      </div>
                    )}
                    {confirmAction.action === "restore_entitlement" && (
                      <div>
                        <label className="text-sm text-gray-600">Tier to restore</label>
                        <select className="w-full border rounded px-3 py-2 text-sm" value={actionParams.tier || "rn"} onChange={e => setActionParams({ ...actionParams, tier: e.target.value })} data-testid="select-restore-tier">
                          <option value="rpn">RPN/LVN</option>
                          <option value="rn">RN</option>
                          <option value="np">NP</option>
                          <option value="allied">Allied</option>
                          <option value="imaging">Imaging</option>
                          <option value="certification_prep">Certification Prep</option>
                          <option value="full_access">Full Access</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-sm text-gray-600">Reason</label>
                      <Textarea value={actionReason} onChange={e => setActionReason(e.target.value)} placeholder="Reason for this action..." data-testid="input-action-reason" />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => { setConfirmAction(null); setActionParams({}); setActionReason(""); }} data-testid="button-cancel-action">Cancel</Button>
                      <Button
                        onClick={() => rescueMutation.mutate({ action: confirmAction.action, userId: confirmAction.userId, params: actionParams, reason: actionReason })}
                        disabled={rescueMutation.isPending}
                        data-testid="button-confirm-action"
                      >
                        {rescueMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                        Confirm
                      </Button>
                    </div>
                    {rescueMutation.isError && <p className="text-red-500 text-sm">{(rescueMutation.error as Error).message}</p>}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" data-testid="text-templates-title">Communication Templates</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => seedTemplatesMutation.mutate()} disabled={seedTemplatesMutation.isPending} data-testid="button-seed-templates">
                  {seedTemplatesMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <RefreshCw className="w-4 h-4 mr-1" />}
                  Seed Defaults
                </Button>
                <Button size="sm" onClick={() => { setEditTemplate(null); setTemplateForm({ name: "", category: "incident", subject: "", body: "", placeholders: "" }); setShowTemplateEditor(true); }} data-testid="button-new-template">
                  <Plus className="w-4 h-4 mr-1" /> New Template
                </Button>
              </div>
            </div>

            {showTemplateEditor && (
              <Card>
                <CardHeader><CardTitle className="text-sm">{editTemplate ? "Edit Template" : "New Template"}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <Input value={templateForm.name} onChange={e => setTemplateForm({ ...templateForm, name: e.target.value })} data-testid="input-template-name" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Category</label>
                      <select className="w-full border rounded px-3 py-2 text-sm" value={templateForm.category} onChange={e => setTemplateForm({ ...templateForm, category: e.target.value })} data-testid="select-template-category">
                        <option value="incident">Incident</option>
                        <option value="assurance">Assurance</option>
                        <option value="resolution">Resolution</option>
                        <option value="goodwill">Goodwill</option>
                        <option value="support">Support</option>
                        <option value="billing">Billing</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Subject</label>
                    <Input value={templateForm.subject} onChange={e => setTemplateForm({ ...templateForm, subject: e.target.value })} placeholder="Use {{placeholder}} syntax" data-testid="input-template-subject" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Body</label>
                    <Textarea value={templateForm.body} onChange={e => setTemplateForm({ ...templateForm, body: e.target.value })} rows={6} placeholder="Use {{placeholder}} syntax for variables" data-testid="input-template-body" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Placeholders (comma-separated)</label>
                    <Input value={templateForm.placeholders} onChange={e => setTemplateForm({ ...templateForm, placeholders: e.target.value })} placeholder="customer_name, product_name, incident_id" data-testid="input-template-placeholders" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => { setShowTemplateEditor(false); setEditTemplate(null); }} data-testid="button-cancel-template">Cancel</Button>
                    <Button onClick={() => saveTemplateMutation.mutate()} disabled={saveTemplateMutation.isPending || !templateForm.name || !templateForm.body} data-testid="button-save-template">
                      {saveTemplateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {(templates || []).map((t: any) => (
                <Card key={t.id} data-testid={`template-card-${t.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-sm">{t.name}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge className={CATEGORY_COLORS[t.category] || "bg-gray-100"}>{t.category}</Badge>
                          {!t.isActive && <Badge variant="outline" className="text-gray-400">Inactive</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setEditTemplate(t);
                          setTemplateForm({ name: t.name, category: t.category, subject: t.subject || "", body: t.body, placeholders: (t.placeholders || []).join(", ") });
                          setShowTemplateEditor(true);
                        }} data-testid={`button-edit-template-${t.id}`}><FileText className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this template?")) deleteTemplateMutation.mutate(t.id); }} data-testid={`button-delete-template-${t.id}`}><Trash2 className="w-3 h-3 text-red-500" /></Button>
                      </div>
                    </div>
                    {t.subject && <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Subject:</span> {t.subject}</p>}
                    <p className="text-sm text-gray-500 whitespace-pre-line line-clamp-3">{t.body}</p>
                    {(t.placeholders || []).length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-400 font-medium">Placeholders:</p>
                        <div className="flex flex-wrap gap-1">
                          {(t.placeholders || []).map((p: string) => (
                            <Badge key={p} variant="outline" className="text-xs">{`{{${p}}}`}</Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {(t.placeholders || []).map((p: string) => (
                            <Input
                              key={p}
                              placeholder={p}
                              value={populateValues[p] || ""}
                              onChange={e => setPopulateValues({ ...populateValues, [p]: e.target.value })}
                              className="text-xs h-8"
                              data-testid={`input-populate-${p}`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => populateTemplate(t.id)} data-testid={`button-populate-${t.id}`}>
                            <Send className="w-3 h-3 mr-1" /> Populate
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(t.body, `body-${t.id}`)} data-testid={`button-copy-${t.id}`}>
                            {copiedId === `body-${t.id}` ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                            {copiedId === `body-${t.id}` ? "Copied!" : "Copy Raw"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {(templates || []).length === 0 && (
                <Card><CardContent className="p-6 text-center text-gray-500" data-testid="text-no-templates">No templates yet. Click "Seed Defaults" to add prebuilt templates.</CardContent></Card>
              )}
            </div>

            {populatedResult && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="modal-populated-template">
                <Card className="w-full max-w-lg">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      Populated Template
                      <Button variant="ghost" size="sm" onClick={() => setPopulatedResult(null)} data-testid="button-close-populated"><XCircle className="w-4 h-4" /></Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {populatedResult.subject && (
                      <div>
                        <label className="text-xs text-gray-500 font-medium">Subject</label>
                        <div className="p-2 bg-gray-50 rounded text-sm flex items-center justify-between">
                          <span>{populatedResult.subject}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(populatedResult.subject, "pop-subject")} data-testid="button-copy-populated-subject">
                            {copiedId === "pop-subject" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Body</label>
                      <div className="p-3 bg-gray-50 rounded text-sm whitespace-pre-line">{populatedResult.body}</div>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => copyToClipboard(populatedResult.body, "pop-body")} data-testid="button-copy-populated-body">
                        {copiedId === "pop-body" ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        {copiedId === "pop-body" ? "Copied!" : "Copy Body"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === "incidents" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold" data-testid="text-incidents-title">Refund Prevention: Incident Affected Users</h2>

            {!selectedIncidentId ? (
              <div className="space-y-3">
                {(incidents || []).map((i: any) => (
                  <Card key={i.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedIncidentId(i.id)} data-testid={`incident-select-${i.id}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={SEVERITY_COLORS[i.severity] || ""}>{i.severity}</Badge>
                        <div>
                          <p className="font-medium text-sm">{i.title}</p>
                          <p className="text-xs text-gray-400">{formatDate(i.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={STATUS_COLORS[i.status] || ""}>{i.status}</Badge>
                        <Badge variant="outline">{i.affectedCount || 0} affected</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(incidents || []).length === 0 && (
                  <Card><CardContent className="p-6 text-center text-gray-500" data-testid="text-no-incidents">No incidents found</CardContent></Card>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedIncidentId(null); setBulkSelected(new Set()); }} data-testid="button-back-incidents">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <h3 className="font-medium">Incident: {(incidents || []).find((i: any) => i.id === selectedIncidentId)?.title}</h3>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" onClick={() => autoDetectMutation.mutate(selectedIncidentId)} disabled={autoDetectMutation.isPending} data-testid="button-auto-detect">
                    {autoDetectMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Search className="w-4 h-4 mr-1" />}
                    Auto-Detect Affected Users
                  </Button>
                  {autoDetectMutation.isSuccess && (
                    <span className="text-sm text-green-600 self-center" data-testid="text-auto-detect-result">Added {(autoDetectMutation.data as any)?.usersAdded} users</span>
                  )}
                </div>

                {bulkSelected.size > 0 && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium" data-testid="text-bulk-count">{bulkSelected.size} selected</span>
                        <select className="border rounded px-2 py-1 text-sm" value={bulkAction} onChange={e => setBulkAction(e.target.value)} data-testid="select-bulk-action">
                          <option value="">Select action...</option>
                          <option value="extend_subscription">Extend Subscription</option>
                          <option value="grant_temporary_access">Grant Temporary Access</option>
                        </select>
                        {bulkAction === "extend_subscription" && (
                          <Input type="number" value={bulkDays} onChange={e => setBulkDays(parseInt(e.target.value))} className="w-20 h-8 text-sm" placeholder="Days" data-testid="input-bulk-days" />
                        )}
                        {bulkAction === "grant_temporary_access" && (
                          <Input type="number" value={bulkHours} onChange={e => setBulkHours(parseInt(e.target.value))} className="w-20 h-8 text-sm" placeholder="Hours" data-testid="input-bulk-hours" />
                        )}
                        <Input value={actionReason} onChange={e => setActionReason(e.target.value)} placeholder="Reason..." className="flex-1 h-8 text-sm" data-testid="input-bulk-reason" />
                        <Button size="sm" disabled={!bulkAction || bulkMutation.isPending} onClick={() => { if (confirm(`Apply "${bulkAction.replace(/_/g, " ")}" to ${bulkSelected.size} users?`)) bulkMutation.mutate(); }} data-testid="button-apply-bulk">
                          {bulkMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Zap className="w-4 h-4 mr-1" />}
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  {(affectedUsers || []).length > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={bulkSelected.size === (affectedUsers || []).length && (affectedUsers || []).length > 0}
                        onChange={e => {
                          if (e.target.checked) setBulkSelected(new Set((affectedUsers || []).map((u: any) => u.id)));
                          else setBulkSelected(new Set());
                        }}
                        data-testid="checkbox-select-all"
                      />
                      <span className="text-sm text-gray-500">Select all ({(affectedUsers || []).length})</span>
                    </div>
                  )}
                  {(affectedUsers || []).map((au: any) => (
                    <Card key={au.id} data-testid={`affected-user-${au.id}`}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={bulkSelected.has(au.id)}
                          onChange={e => {
                            const next = new Set(bulkSelected);
                            if (e.target.checked) next.add(au.id);
                            else next.delete(au.id);
                            setBulkSelected(next);
                          }}
                          data-testid={`checkbox-affected-${au.id}`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{au.username || au.userId}</span>
                            {au.email && <span className="text-gray-400 text-xs">{au.email}</span>}
                            <Badge variant="outline" className="text-xs">{au.tier}</Badge>
                            <Badge className={`text-xs ${SEVERITY_COLORS[au.severity] || ""}`}>{au.severity}</Badge>
                            <Badge className={`text-xs ${STATUS_COLORS[au.rescueStatus] || ""}`}>{au.rescueStatus}</Badge>
                          </div>
                          {au.impactDescription && <p className="text-xs text-gray-500 mt-1">{au.impactDescription}</p>}
                          {(au.suggestedActions || []).length > 0 && (
                            <div className="flex gap-1 mt-1">
                              <span className="text-xs text-gray-400">Suggested:</span>
                              {(au.suggestedActions || []).map((a: string) => (
                                <Badge key={a} variant="outline" className="text-xs cursor-pointer hover:bg-blue-50" onClick={() => {
                                  setSelectedUserId(au.userId);
                                  setConfirmAction({ action: a, userId: au.userId, username: au.username || au.userId });
                                }} data-testid={`suggested-action-${a}-${au.id}`}>{a.replace(/_/g, " ")}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedUserId(au.userId); setActiveTab("rescue"); }} data-testid={`button-rescue-user-${au.id}`}>
                          <LifeBuoy className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {(affectedUsers || []).length === 0 && (
                    <Card><CardContent className="p-6 text-center text-gray-500" data-testid="text-no-affected">No affected users linked yet. Use "Auto-Detect" to find affected subscribers.</CardContent></Card>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Search className="w-4 h-4" /> Find User for Support Notes</CardTitle></CardHeader>
              <CardContent>
                <Input
                  placeholder="Search by username, email, or ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  data-testid="input-notes-user-search"
                  className="mb-3"
                />
                {(searchResults || []).length > 0 && !selectedUserId && (
                  <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                    {(searchResults || []).map((u: any) => (
                      <div key={u.id} className="p-3 cursor-pointer hover:bg-blue-50 flex items-center justify-between" onClick={() => setSelectedUserId(u.id)} data-testid={`notes-user-result-${u.id}`}>
                        <span className="font-medium text-sm">{u.username}</span>
                        <Badge variant="outline">{u.tier || "free"}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedUserId && userProfile && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>Notes for: {userProfile.user?.username}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(null)} data-testid="button-clear-notes-user"><XCircle className="w-4 h-4" /></Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Textarea value={noteContent} onChange={e => setNoteContent(e.target.value)} placeholder="Add a support note..." className="flex-1" data-testid="input-note-content" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <select className="border rounded px-2 py-1.5 text-sm" value={noteCategory} onChange={e => setNoteCategory(e.target.value)} data-testid="select-note-category">
                        <option value="general">General</option>
                        <option value="billing">Billing</option>
                        <option value="incident">Incident</option>
                        <option value="rescue">Rescue</option>
                        <option value="escalation">Escalation</option>
                      </select>
                      <Button size="sm" onClick={() => addNoteMutation.mutate()} disabled={!noteContent || addNoteMutation.isPending} data-testid="button-add-note">
                        {addNoteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
                        Add Note
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {(userProfile.supportNotes || []).map((n: any) => (
                        <div key={n.id} className="p-3 bg-gray-50 rounded" data-testid={`note-${n.id}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-600">{n.authorUsername}</span>
                              <Badge variant="outline" className="text-xs">{n.category}</Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">{formatDate(n.createdAt)}</span>
                              <Button variant="ghost" size="sm" onClick={() => { if (confirm("Delete this note?")) deleteNoteMutation.mutate(n.id); }} data-testid={`button-delete-note-${n.id}`}>
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm whitespace-pre-line">{n.content}</p>
                        </div>
                      ))}
                      {(userProfile.supportNotes || []).length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4" data-testid="text-no-notes">No support notes yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
