import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield, Activity, ToggleLeft, ToggleRight, Zap, AlertTriangle,
  RefreshCw, Clock, CheckCircle2, XCircle, ArrowLeft, Power
} from "lucide-react";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("nn_admin_access_token") || localStorage.getItem("nursenest-user-token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function fetchResilienceStatus() {
  const res = await fetch("/api/admin/resilience/status", { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch resilience status");
  return res.json();
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: "bg-green-100 text-green-800",
    closed: "bg-green-100 text-green-800",
    degraded: "bg-amber-100 text-amber-800",
    "half-open": "bg-amber-100 text-amber-800",
    down: "bg-red-100 text-red-800",
    open: "bg-red-100 text-red-800",
  };
  return <Badge className={colors[status] || "bg-slate-100 text-slate-800"} data-testid={`badge-status-${status}`}>{status}</Badge>;
}

function CircuitBreakersPanel({ breakers, onReset }: { breakers: any[]; onReset: (name: string) => void }) {
  if (!breakers?.length) return <p className="text-slate-500 text-sm">No circuit breakers configured.</p>;
  return (
    <div className="space-y-3">
      {breakers.map((cb: any) => (
        <Card key={cb.name} className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700" data-testid={`text-breaker-name-${cb.name}`}>{cb.name}</span>
                <StatusBadge status={cb.state} />
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>Failures: {cb.failureCount}/{cb.failureThreshold}</span>
                <span>Trips: {cb.tripCount}</span>
                <span>Cooldown: {cb.cooldownMs / 1000}s</span>
              </div>
            </div>
            {cb.state !== "closed" && (
              <Button size="sm" variant="outline" onClick={() => onReset(cb.name)} data-testid={`button-reset-breaker-${cb.name}`}>
                <RefreshCw className="w-3 h-3 mr-1" /> Reset
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeatureFlagsPanel({ flags, onToggle, onResetErrors }: {
  flags: any[];
  onToggle: (key: string, enabled: boolean) => void;
  onResetErrors: (key: string) => void;
}) {
  if (!flags?.length) return <p className="text-slate-500 text-sm">No feature flags configured.</p>;
  return (
    <div className="space-y-3">
      {flags.map((flag: any) => {
        const isOn = flag.adminOverride !== null ? flag.adminOverride : flag.enabled;
        return (
          <Card key={flag.key} className="border-slate-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-700" data-testid={`text-flag-key-${flag.key}`}>{flag.key}</span>
                  <Badge className={isOn ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {isOn ? "ON" : "OFF"}
                  </Badge>
                  {flag.adminOverride !== null && <Badge className="bg-blue-100 text-blue-800">overridden</Badge>}
                </div>
                <p className="text-xs text-slate-500">{flag.description}</p>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span>Errors: {flag.errorCount}/{flag.errorThreshold}</span>
                  {flag.disabledReason && <span className="text-red-500">Reason: {flag.disabledReason}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {flag.errorCount > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => onResetErrors(flag.key)} data-testid={`button-reset-errors-${flag.key}`}>
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant={isOn ? "default" : "outline"}
                  onClick={() => onToggle(flag.key, !isOn)}
                  data-testid={`button-toggle-flag-${flag.key}`}
                >
                  {isOn ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function KillSwitchesPanel({ switches, onToggle }: { switches: any[]; onToggle: (key: string, active: boolean, scope: string, target: string, reason?: string) => void }) {
  const [newKey, setNewKey] = useState("");
  const [newScope, setNewScope] = useState("feature");
  const [newTarget, setNewTarget] = useState("");
  const [newReason, setNewReason] = useState("");

  return (
    <div className="space-y-4">
      {switches?.length > 0 && (
        <div className="space-y-3">
          {switches.map((ks: any) => (
            <Card key={ks.key} className="border-slate-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700" data-testid={`text-killswitch-${ks.key}`}>{ks.key}</span>
                    <Badge className={ks.active ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                      {ks.active ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                    <Badge variant="outline">{ks.scope}: {ks.target}</Badge>
                  </div>
                  {ks.reason && <p className="text-xs text-slate-500">Reason: {ks.reason}</p>}
                  {ks.activatedBy && <p className="text-xs text-slate-400">By: {ks.activatedBy}</p>}
                </div>
                <Button
                  size="sm"
                  variant={ks.active ? "outline" : "destructive"}
                  onClick={() => onToggle(ks.key, !ks.active, ks.scope, ks.target)}
                  data-testid={`button-toggle-killswitch-${ks.key}`}
                >
                  <Power className="w-3 h-3 mr-1" />
                  {ks.active ? "Deactivate" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-dashed border-slate-300">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-medium text-slate-600">Add Kill Switch</p>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} data-testid="input-killswitch-key" />
            <select
              className="border rounded px-2 py-1 text-sm"
              value={newScope}
              onChange={(e) => setNewScope(e.target.value)}
              data-testid="select-killswitch-scope"
            >
              <option value="feature">Feature</option>
              <option value="route">Route</option>
              <option value="exam">Exam</option>
              <option value="language">Language</option>
              <option value="component">Component</option>
              <option value="global">Global</option>
            </select>
          </div>
          <Input placeholder="Target" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} data-testid="input-killswitch-target" />
          <Input placeholder="Reason" value={newReason} onChange={(e) => setNewReason(e.target.value)} data-testid="input-killswitch-reason" />
          <Button
            size="sm"
            variant="destructive"
            disabled={!newKey || !newTarget}
            onClick={() => {
              onToggle(newKey, true, newScope, newTarget, newReason);
              setNewKey(""); setNewTarget(""); setNewReason("");
            }}
            data-testid="button-add-killswitch"
          >
            Activate Kill Switch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function HealthChecksPanel({ checks }: { checks: any[] }) {
  if (!checks?.length) return <p className="text-slate-500 text-sm">No health data available.</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {checks.map((check: any) => (
        <Card key={check.service} className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {check.status === "healthy" ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : check.status === "degraded" ? (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <span className="font-medium text-slate-700" data-testid={`text-health-service-${check.service}`}>{check.service}</span>
                {check.details && <p className="text-xs text-slate-500">{check.details}</p>}
              </div>
            </div>
            <div className="text-right">
              <StatusBadge status={check.status} />
              <p className="text-xs text-slate-400 mt-1">{check.latencyMs}ms</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EventsTimeline({ events }: { events: any[] }) {
  if (!events?.length) return <p className="text-slate-500 text-sm">No resilience events recorded.</p>;
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {events.slice(0, 50).map((event: any) => (
        <div key={event.id} className="flex items-start gap-3 p-2 bg-slate-50 rounded text-sm" data-testid={`event-${event.id}`}>
          <div className="flex-shrink-0 mt-0.5">
            <Clock className="w-3 h-3 text-slate-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">{event.type}</span>
              <span className="text-slate-500">{event.source}</span>
            </div>
            <p className="text-xs text-slate-400">
              {new Date(event.timestamp).toLocaleString()}
              {event.data && Object.keys(event.data).length > 0 && (
                <span className="ml-2">{JSON.stringify(event.data)}</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminResilienceDashboard() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-resilience"],
    queryFn: fetchResilienceStatus,
    refetchInterval: 10000,
    retry: 1,
  });

  const toggleFlagMutation = useMutation({
    mutationFn: async ({ key, enabled }: { key: string; enabled: boolean }) => {
      const res = await fetch(`/api/admin/resilience/feature-flags/${key}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) throw new Error("Failed to toggle feature flag");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-resilience"] }),
  });

  const resetErrorsMutation = useMutation({
    mutationFn: async (key: string) => {
      const res = await fetch(`/api/admin/resilience/feature-flags/${key}/reset-errors`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to reset errors");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-resilience"] }),
  });

  const resetBreakerMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`/api/admin/resilience/circuit-breaker/${name}/reset`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to reset circuit breaker");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-resilience"] }),
  });

  const killSwitchMutation = useMutation({
    mutationFn: async ({ key, active, scope, target, reason }: { key: string; active: boolean; scope: string; target: string; reason?: string }) => {
      const res = await fetch("/api/admin/resilience/kill-switch", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ key, active, scope, target, reason: reason || "admin_action" }),
      });
      if (!res.ok) throw new Error("Failed to update kill switch");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-resilience"] }),
  });

  const emergencyModeMutation = useMutation({
    mutationFn: async ({ active, reason }: { active: boolean; reason?: string }) => {
      const res = await fetch("/api/admin/resilience/emergency-mode", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ active, reason }),
      });
      if (!res.ok) throw new Error("Failed to update emergency mode");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-resilience"] }),
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="text-admin-required">
        <p className="text-slate-500">Admin access required.</p>
      </div>
    );
  }

  const healthyCount = data?.healthChecks?.filter((h: any) => h.status === "healthy").length ?? 0;
  const totalChecks = data?.healthChecks?.length ?? 0;
  const openBreakers = data?.circuitBreakers?.filter((cb: any) => cb.state !== "closed").length ?? 0;
  const disabledFlags = data?.featureFlags?.filter((f: any) => !(f.adminOverride !== null ? f.adminOverride : f.enabled)).length ?? 0;
  const activeKillSwitches = data?.killSwitches?.filter((ks: any) => ks.active).length ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6" data-testid="admin-resilience-dashboard">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2" data-testid="text-page-title">
                <Shield className="w-6 h-6 text-purple-600" />
                Platform Resilience
              </h1>
              <p className="text-sm text-slate-500">System health, circuit breakers, feature flags, and kill switches</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data?.emergencyMode?.active && (
              <Badge className="bg-red-100 text-red-800 animate-pulse" data-testid="badge-emergency-active">EMERGENCY MODE</Badge>
            )}
            <Button size="sm" variant="outline" onClick={() => refetch()} data-testid="button-refresh-resilience">
              <RefreshCw className="w-3 h-3 mr-1" /> Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600" data-testid="text-healthy-count">{healthyCount}/{totalChecks}</p>
              <p className="text-xs text-slate-500">Services Healthy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${openBreakers > 0 ? "text-red-600" : "text-green-600"}`} data-testid="text-open-breakers">{openBreakers}</p>
              <p className="text-xs text-slate-500">Open Breakers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${disabledFlags > 0 ? "text-amber-600" : "text-green-600"}`} data-testid="text-disabled-flags">{disabledFlags}</p>
              <p className="text-xs text-slate-500">Disabled Flags</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${activeKillSwitches > 0 ? "text-red-600" : "text-green-600"}`} data-testid="text-active-switches">{activeKillSwitches}</p>
              <p className="text-xs text-slate-500">Active Kill Switches</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-slate-600" data-testid="text-event-count">{data?.events?.length ?? 0}</p>
              <p className="text-xs text-slate-500">Recent Events</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-700">Emergency Mode</p>
                <p className="text-xs text-slate-500">Grants all users basic access during outages</p>
              </div>
              <Button
                size="sm"
                variant={data?.emergencyMode?.active ? "outline" : "destructive"}
                onClick={() => emergencyModeMutation.mutate({
                  active: !data?.emergencyMode?.active,
                  reason: "admin_toggle",
                })}
                data-testid="button-toggle-emergency"
              >
                <Zap className="w-3 h-3 mr-1" />
                {data?.emergencyMode?.active ? "Deactivate" : "Activate"} Emergency Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <Activity className="w-3 h-3 mr-1" /> Health
            </TabsTrigger>
            <TabsTrigger value="breakers" data-testid="tab-breakers">
              <Zap className="w-3 h-3 mr-1" /> Breakers
            </TabsTrigger>
            <TabsTrigger value="flags" data-testid="tab-flags">
              <ToggleRight className="w-3 h-3 mr-1" /> Flags
            </TabsTrigger>
            <TabsTrigger value="killswitches" data-testid="tab-killswitches">
              <Power className="w-3 h-3 mr-1" /> Kill Switches
            </TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">
              <Clock className="w-3 h-3 mr-1" /> Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <HealthChecksPanel checks={data?.healthChecks || []} />
          </TabsContent>

          <TabsContent value="breakers" className="mt-4">
            <CircuitBreakersPanel
              breakers={data?.circuitBreakers || []}
              onReset={(name) => resetBreakerMutation.mutate(name)}
            />
          </TabsContent>

          <TabsContent value="flags" className="mt-4">
            <FeatureFlagsPanel
              flags={data?.featureFlags || []}
              onToggle={(key, enabled) => toggleFlagMutation.mutate({ key, enabled })}
              onResetErrors={(key) => resetErrorsMutation.mutate(key)}
            />
          </TabsContent>

          <TabsContent value="killswitches" className="mt-4">
            <KillSwitchesPanel
              switches={data?.killSwitches || []}
              onToggle={(key, active, scope, target, reason) => killSwitchMutation.mutate({ key, active, scope, target, reason })}
            />
          </TabsContent>

          <TabsContent value="events" className="mt-4">
            <EventsTimeline events={data?.events || []} />
          </TabsContent>
        </Tabs>

        {data?.provisionalAccess?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Provisional Access Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.provisionalAccess.map((grant: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                    <span className="font-medium">{grant.userId}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{grant.reason}</span>
                      <span>Expires: {new Date(grant.expiresAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {data?.selfHealingLog?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Self-Healing Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {data.selfHealingLog.map((entry: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                    <div>
                      <span className="font-medium">{entry.action}</span>
                      <span className="text-slate-500 ml-2">({entry.target})</span>
                    </div>
                    <Badge className={entry.result === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {entry.result}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
