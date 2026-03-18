import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw,
  Activity, Clock, ArrowLeft, Zap, ToggleLeft, ToggleRight,
  Users, FileX, Lock, Play, Archive, Timer,
} from "lucide-react";

type TabId = "overview" | "failing-routes" | "fallbacks" | "quarantine" | "validation" | "provisional" | "entitlements" | "incidents";

function HealthBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; label: string }> = {
    healthy: { bg: "bg-green-100 text-green-800", label: "Healthy" },
    degraded: { bg: "bg-amber-100 text-amber-800", label: "Degraded" },
    critical: { bg: "bg-red-100 text-red-800", label: "Critical" },
  };
  const c = config[status] || config.degraded;
  return <Badge className={c.bg} data-testid={`badge-health-${status}`}>{c.label}</Badge>;
}

function SummaryCards({ data }: { data: any }) {
  if (!data) return null;
  const cards = [
    { label: "Failing Routes", value: data.failingRouteCount, icon: AlertTriangle, color: "text-red-500", testId: "card-failing-routes" },
    { label: "Fallback Events", value: data.fallbackCount, icon: Activity, color: "text-amber-500", testId: "card-fallback-events" },
    { label: "Quarantined", value: data.quarantineCount, icon: FileX, color: "text-orange-500", testId: "card-quarantined" },
    { label: "Validation Failures", value: data.validationFailureCount, icon: XCircle, color: "text-red-500", testId: "card-validation-failures" },
    { label: "Provisional Access", value: data.provisionalAccessCount, icon: Lock, color: "text-blue-500", testId: "card-provisional-access" },
    { label: "Entitlement Mismatches", value: data.entitlementMismatchCount, icon: Users, color: "text-purple-500", testId: "card-entitlement-mismatches" },
    { label: "Active Incidents", value: data.activeIncidentCount, icon: Zap, color: "text-red-600", testId: "card-active-incidents" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3" data-testid="section-summary-cards">
      {cards.map((card) => (
        <Card key={card.testId} data-testid={card.testId}>
          <CardContent className="pt-4 pb-4 text-center">
            <card.icon className={`w-6 h-6 mx-auto mb-1 ${card.color}`} />
            <p className="text-2xl font-bold" data-testid={`text-${card.testId}-value`}>{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FailingRoutesTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-failing-routes"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/failing-routes");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner label="Loading failing routes..." />;
  if (!data?.routes?.length) return <EmptyState icon={CheckCircle} label="No failing routes detected" />;

  return (
    <div className="space-y-3" data-testid="list-failing-routes">
      {data.routes.map((route: any, idx: number) => (
        <Card key={idx} data-testid={`failing-route-${idx}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <code className="text-sm font-medium" data-testid={`text-route-path-${idx}`}>{route.path}</code>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>Errors (24h): <strong className="text-red-600">{route.errors24h ?? route.totalErrors}</strong></span>
                  <span>Last seen: {new Date(route.lastSeen).toLocaleString()}</span>
                  {route.is5xx && <Badge className="bg-red-100 text-red-800 text-[10px]">5xx</Badge>}
                </div>
              </div>
              <div className="flex gap-1">
                {Object.entries(route.statusBreakdown || {}).map(([status, count]) => (
                  <Badge key={status} variant="outline" className="text-xs" data-testid={`badge-status-${status}`}>
                    {status}: {count as number}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FallbackUsageTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-fallback-usage"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/fallback-usage?hours=24");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner label="Loading fallback usage..." />;
  if (!data || data.totalFallbacks === 0) return <EmptyState icon={CheckCircle} label="No fallback events in the last 24 hours" />;

  return (
    <div className="space-y-4" data-testid="section-fallback-usage">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">By Route</CardTitle></CardHeader>
          <CardContent>
            {Object.entries(data.byRoute || {}).map(([route, count]) => (
              <div key={route} className="flex justify-between py-1 text-sm border-b last:border-0">
                <code className="text-xs">{route}</code>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">By Reason</CardTitle></CardHeader>
          <CardContent>
            {Object.entries(data.byReason || {}).map(([reason, count]) => (
              <div key={reason} className="flex justify-between py-1 text-sm border-b last:border-0">
                <span>{reason}</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {data.recentEvents?.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Recent Fallback Events</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2" data-testid="list-fallback-events">
              {data.recentEvents.map((event: any, idx: number) => (
                <div key={idx} className="text-sm border-b pb-2 last:border-0">
                  <div className="flex justify-between">
                    <code className="text-xs">{event.route}</code>
                    <span className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.reason}: {event.primary} → {event.fallback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function QuarantineTab() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-quarantine"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/quarantined-content");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const disableMutation = useMutation({
    mutationFn: async ({ contentId, contentType }: { contentId: string; contentType: string }) => {
      const res = await adminFetch("/api/admin/reliability/actions/disable-content", {
        method: "POST",
        body: JSON.stringify({ contentId, contentType }),
      });
      if (!res.ok) throw new Error("Failed to disable content");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reliability-quarantine"] }),
  });

  const restoreMutation = useMutation({
    mutationFn: async (contentId: string) => {
      const res = await adminFetch("/api/admin/reliability/actions/restore-version", {
        method: "POST",
        body: JSON.stringify({ contentId }),
      });
      if (!res.ok) throw new Error("Failed to restore version");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reliability-quarantine"] }),
  });

  const backupMutation = useMutation({
    mutationFn: async (contentId: string) => {
      const res = await adminFetch("/api/admin/reliability/actions/force-backup-mode", {
        method: "POST",
        body: JSON.stringify({ contentId }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reliability-quarantine"] }),
  });

  const regenMutation = useMutation({
    mutationFn: async (contentId: string) => {
      const res = await adminFetch("/api/admin/reliability/actions/regenerate-backups", {
        method: "POST",
        body: JSON.stringify({ contentId }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner label="Loading quarantined content..." />;
  if (!data?.quarantined?.length) return <EmptyState icon={CheckCircle} label="No quarantined content" />;

  return (
    <div className="space-y-3" data-testid="list-quarantined-content">
      {data.quarantined.map((item: any, idx: number) => (
        <Card key={item.id || idx} data-testid={`quarantine-item-${idx}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm" data-testid={`text-quarantine-id-${idx}`}>
                    {item.contentId}
                  </span>
                  <Badge variant="outline" className="text-xs">{item.contentType}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
                <p className="text-xs text-muted-foreground">
                  Affected users: <strong>{item.affectedUserCount || 0}</strong>
                  {item.createdAt && <> | Quarantined: {new Date(item.createdAt).toLocaleString()}</>}
                </p>
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                <Button size="sm" variant="outline" onClick={() => disableMutation.mutate({ contentId: item.contentId, contentType: item.contentType })} data-testid={`button-disable-${idx}`}>
                  <ToggleLeft className="w-3 h-3 mr-1" /> Disable
                </Button>
                <Button size="sm" variant="outline" onClick={() => restoreMutation.mutate(item.contentId)} data-testid={`button-restore-${idx}`}>
                  <Archive className="w-3 h-3 mr-1" /> Restore
                </Button>
                <Button size="sm" variant="outline" onClick={() => backupMutation.mutate(item.contentId)} data-testid={`button-backup-${idx}`}>
                  <Shield className="w-3 h-3 mr-1" /> Backup
                </Button>
                <Button size="sm" variant="outline" onClick={() => regenMutation.mutate(item.contentId)} data-testid={`button-regen-${idx}`}>
                  <RefreshCw className="w-3 h-3 mr-1" /> Regen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ValidationFailuresTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-validation-failures"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/validation-failures");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner label="Loading validation failures..." />;
  if (!data?.failures?.length) return <EmptyState icon={CheckCircle} label="No recent validation failures" />;

  return (
    <div className="space-y-3" data-testid="list-validation-failures">
      {data.failures.map((failure: any, idx: number) => (
        <Card key={failure.id || idx} data-testid={`validation-failure-${idx}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm" data-testid={`text-failure-content-${idx}`}>{failure.contentId}</span>
                  <Badge variant="outline" className="text-xs">{failure.contentType}</Badge>
                  <Badge variant="outline" className="text-xs">v{failure.version}</Badge>
                </div>
                {failure.errors && (
                  <div className="text-xs text-red-600 space-y-0.5">
                    {(Array.isArray(failure.errors) ? failure.errors : []).slice(0, 3).map((err: any, i: number) => (
                      <p key={i}>• {typeof err === "string" ? err : err.message || JSON.stringify(err)}</p>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {failure.triggeredBy && <>Triggered by: {failure.triggeredBy} | </>}
                  {failure.createdAt && new Date(failure.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProvisionalAccessTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-provisional-access"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/provisional-access?hours=24");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const queryClient = useQueryClient();
  const extendMutation = useMutation({
    mutationFn: async ({ userId, days }: { userId: string; days: number }) => {
      const res = await adminFetch("/api/admin/reliability/actions/extend-access", {
        method: "POST",
        body: JSON.stringify({ userId, days }),
      });
      if (!res.ok) throw new Error("Failed to extend access");
      return res.json();
    },
  });

  if (isLoading) return <LoadingSpinner label="Loading provisional access events..." />;
  if (!data || data.totalEvents === 0) return <EmptyState icon={CheckCircle} label="No provisional access events in the last 24 hours" />;

  return (
    <div className="space-y-4" data-testid="section-provisional-access">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold" data-testid="text-provisional-total">{data.totalEvents}</p>
            <p className="text-xs text-muted-foreground">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold" data-testid="text-provisional-users">{data.uniqueUsersAffected}</p>
            <p className="text-xs text-muted-foreground">Unique Users</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2" data-testid="list-provisional-events">
        {data.events?.map((event: any, idx: number) => (
          <Card key={idx} data-testid={`provisional-event-${idx}`}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">{event.userId}</span>
                <p className="text-xs text-muted-foreground">{event.reason} | {new Date(event.timestamp).toLocaleString()}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => extendMutation.mutate({ userId: event.userId, days: 7 })}
                disabled={extendMutation.isPending}
                data-testid={`button-extend-${idx}`}
              >
                <Timer className="w-3 h-3 mr-1" /> Extend 7d
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EntitlementMismatchesTab() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-entitlement-mismatches"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/entitlement-mismatches");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const replayMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await adminFetch("/api/admin/reliability/actions/replay-entitlement-sync", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reliability-entitlement-mismatches"] }),
  });

  const batchReplayMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/reliability/actions/replay-entitlement-sync", {
        method: "POST",
        body: JSON.stringify({ batchAll: true }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reliability-entitlement-mismatches"] }),
  });

  if (isLoading) return <LoadingSpinner label="Checking entitlement mismatches..." />;
  if (!data?.mismatches?.length) return <EmptyState icon={CheckCircle} label="No entitlement mismatches detected" />;

  return (
    <div className="space-y-4" data-testid="section-entitlement-mismatches">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.total} mismatches found</p>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => batchReplayMutation.mutate()}
          disabled={batchReplayMutation.isPending}
          data-testid="button-batch-replay"
        >
          {batchReplayMutation.isPending ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1" />}
          Batch Replay All
        </Button>
      </div>

      <div className="space-y-2" data-testid="list-entitlement-mismatches">
        {data.mismatches.map((m: any, idx: number) => (
          <Card key={m.id || idx} data-testid={`mismatch-item-${idx}`}>
            <CardContent className="p-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" data-testid={`text-mismatch-user-${idx}`}>{m.username || m.email || m.id}</span>
                  <Badge className={m.mismatchType === "paid_tier_inactive_subscription" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"} data-testid={`badge-mismatch-type-${idx}`}>
                    {m.mismatchType === "paid_tier_inactive_subscription" ? "Paid → Inactive" : "Active → Free"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => replayMutation.mutate(m.id)}
                disabled={replayMutation.isPending}
                data-testid={`button-replay-${idx}`}
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Replay
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function IncidentsTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["reliability-incidents"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/incidents");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    refetchInterval: 15000,
  });

  if (isLoading) return <LoadingSpinner label="Loading incidents..." />;

  return (
    <div className="space-y-6" data-testid="section-incidents">
      {data?.active?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2 text-red-700">Active Incidents ({data.totalActive})</h3>
          <div className="space-y-2" data-testid="list-active-incidents">
            {data.active.map((inc: any, idx: number) => (
              <IncidentCard key={inc.incidentId || idx} incident={inc} idx={idx} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold mb-2">Recent Incidents ({data?.totalRecent || 0})</h3>
        {(!data?.recent?.length) ? (
          <EmptyState icon={CheckCircle} label="No recent incidents" />
        ) : (
          <div className="space-y-2" data-testid="list-recent-incidents">
            {data.recent.map((inc: any, idx: number) => (
              <IncidentCard key={inc.incidentId || idx} incident={inc} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IncidentCard({ incident, idx }: { incident: any; idx: number }) {
  const severityColors: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
  };
  const statusColors: Record<string, string> = {
    active: "bg-red-100 text-red-800",
    acknowledged: "bg-amber-100 text-amber-800",
    resolved: "bg-green-100 text-green-800",
  };

  return (
    <Card data-testid={`incident-card-${idx}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm" data-testid={`text-incident-title-${idx}`}>{incident.title}</span>
              <Badge className={severityColors[incident.severity] || ""} data-testid={`badge-incident-severity-${idx}`}>{incident.severity}</Badge>
              <Badge className={statusColors[incident.status] || ""} data-testid={`badge-incident-status-${idx}`}>{incident.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{incident.message}</p>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>ID: {incident.incidentId}</span>
              <span>Occurrences: {incident.occurrenceCount}</span>
              <span>Affected users: {incident.affectedUserCount}</span>
              {incident.firstOccurrence && <span>First: {new Date(incident.firstOccurrence).toLocaleString()}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-12" data-testid="loading-spinner">
      <RefreshCw className="w-6 h-6 animate-spin mr-2" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function EmptyState({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="text-center py-8 text-muted-foreground" data-testid="empty-state">
      <Icon className="w-12 h-12 mx-auto mb-2 text-green-500" />
      <p className="font-medium">{label}</p>
    </div>
  );
}

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "failing-routes", label: "Failing Routes", icon: AlertTriangle },
  { id: "fallbacks", label: "Fallback Usage", icon: Shield },
  { id: "quarantine", label: "Quarantine", icon: FileX },
  { id: "validation", label: "Validation", icon: XCircle },
  { id: "provisional", label: "Provisional Access", icon: Lock },
  { id: "entitlements", label: "Entitlements", icon: Users },
  { id: "incidents", label: "Incidents", icon: Zap },
];

export default function AdminReliabilityDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const { data: summary, isLoading: summaryLoading, refetch: refetchSummary } = useQuery({
    queryKey: ["reliability-summary"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/reliability/summary");
      if (!res.ok) throw new Error("Failed to load reliability summary");
      return res.json();
    },
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <a href="/admin" className="text-slate-400 hover:text-slate-600" data-testid="link-back-admin">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800" data-testid="text-page-title">Reliability Dashboard</h1>
              {summary && <HealthBadge status={summary.overallHealth} />}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">System reliability monitoring and incident response</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchSummary()}
            disabled={summaryLoading}
            data-testid="button-refresh-summary"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${summaryLoading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        <SummaryCards data={summary} />

        <div className="flex gap-1 mt-6 mb-6 bg-white rounded-lg border p-1 overflow-x-auto" data-testid="nav-reliability-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border p-6" data-testid="section-tab-content">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">System Overview</h2>
              {summaryLoading ? (
                <LoadingSpinner label="Loading overview..." />
              ) : summary ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Health Status</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Overall</span><HealthBadge status={summary.overallHealth} /></div>
                        <div className="flex justify-between"><span>Failing Routes (24h)</span><span className="font-medium">{summary.failingRouteCount}</span></div>
                        <div className="flex justify-between"><span>Fallback Events (24h)</span><span className="font-medium">{summary.fallbackCount}</span></div>
                        <div className="flex justify-between"><span>Active Incidents</span><span className="font-medium">{summary.activeIncidentCount}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Content & Access</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Quarantined Content</span><span className="font-medium">{summary.quarantineCount}</span></div>
                        <div className="flex justify-between"><span>Validation Failures (24h)</span><span className="font-medium">{summary.validationFailureCount}</span></div>
                        <div className="flex justify-between"><span>Entitlement Mismatches</span><span className="font-medium">{summary.entitlementMismatchCount}</span></div>
                        <div className="flex justify-between"><span>Provisional Access (24h)</span><span className="font-medium">{summary.provisionalAccessCount}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null}
              <p className="text-xs text-muted-foreground">
                Last updated: {summary?.generatedAt ? new Date(summary.generatedAt).toLocaleString() : "N/A"}
              </p>
            </div>
          )}
          {activeTab === "failing-routes" && <FailingRoutesTab />}
          {activeTab === "fallbacks" && <FallbackUsageTab />}
          {activeTab === "quarantine" && <QuarantineTab />}
          {activeTab === "validation" && <ValidationFailuresTab />}
          {activeTab === "provisional" && <ProvisionalAccessTab />}
          {activeTab === "entitlements" && <EntitlementMismatchesTab />}
          {activeTab === "incidents" && <IncidentsTab />}
        </div>
      </div>
    </div>
  );
}
