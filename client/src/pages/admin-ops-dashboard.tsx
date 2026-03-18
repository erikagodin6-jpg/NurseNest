import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield, Activity, ToggleLeft, ToggleRight, Zap, AlertTriangle,
  RefreshCw, Clock, CheckCircle2, XCircle, ArrowLeft, Power,
  Copy, Smartphone, Users, Server, Gauge, History,
} from "lucide-react";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("nn_admin_access_token") || localStorage.getItem("nursenest-user-token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function fetchOpsStatus() {
  const res = await fetch("/api/admin/ops/status", { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch ops status");
  return res.json();
}

function severityColor(status: string) {
  if (status === "healthy" || status === "closed") return "bg-green-100 text-green-800 border-green-200";
  if (status === "degraded" || status === "half-open") return "bg-amber-100 text-amber-800 border-amber-200";
  if (status === "down" || status === "open") return "bg-red-100 text-red-800 border-red-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

function severityIcon(status: string) {
  if (status === "healthy" || status === "closed") return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  if (status === "degraded" || status === "half-open") return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  return <XCircle className="w-5 h-5 text-red-500" />;
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={severityColor(status)} data-testid={`badge-ops-status-${status}`}>
      {status}
    </Badge>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  });
}

function buildStatusSummary(data: any): string {
  if (!data) return "No data available";
  const lines: string[] = [
    `NurseNest Ops Status — ${new Date().toLocaleString()}`,
    `Overall: ${data.overallStatus?.toUpperCase() || "UNKNOWN"}`,
    `Version: ${data.deploymentVersion || "unknown"}`,
    `Uptime: ${Math.round((data.uptime || 0) / 60)} min`,
    `Emergency Mode: ${data.emergencyMode?.active ? "ACTIVE" : "OFF"}`,
    "",
    "Services:",
    ...(data.healthChecks || []).map((h: any) => `  ${h.service}: ${h.status} (${h.latencyMs}ms)${h.details ? ` — ${h.details}` : ""}`),
    "",
    `Circuit Breakers: ${(data.circuitBreakers || []).filter((cb: any) => cb.state !== "closed").length} open`,
    `Disabled Flags: ${(data.featureFlags || []).filter((f: any) => !(f.adminOverride !== null ? f.adminOverride : f.enabled)).length}`,
    `Active Kill Switches: ${(data.killSwitches || []).filter((ks: any) => ks.active).length}`,
    `Provisional Access Grants: ${data.provisionalAccess?.length || 0}`,
    `Affected Subscribers: ${data.affectedUsers || 0}`,
    `Fallback Usage: ${data.fallbackUsageRate || 0}%`,
  ];
  return lines.join("\n");
}

export default function AdminOpsDashboard() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [copiedSummary, setCopiedSummary] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-ops-status"],
    queryFn: fetchOpsStatus,
    refetchInterval: 15000,
    retry: 1,
  });

  const emergencyMutation = useMutation({
    mutationFn: async ({ active, reason }: { active: boolean; reason?: string }) => {
      const res = await fetch("/api/admin/ops/emergency-mode", {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify({ active, reason }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const flagMutation = useMutation({
    mutationFn: async ({ key, enabled, reason }: { key: string; enabled: boolean; reason?: string }) => {
      const res = await fetch(`/api/admin/ops/feature-flag/${key}`, {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify({ enabled, reason }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const resetErrorsMutation = useMutation({
    mutationFn: async (key: string) => {
      const res = await fetch(`/api/admin/ops/feature-flag/${key}/reset-errors`, {
        method: "POST", headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const resetBreakerMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`/api/admin/ops/circuit-breaker/${name}/reset`, {
        method: "POST", headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const killSwitchMutation = useMutation({
    mutationFn: async (body: { key: string; active: boolean; scope?: string; target?: string; reason?: string }) => {
      const res = await fetch("/api/admin/ops/kill-switch", {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const clearCacheMutation = useMutation({
    mutationFn: async (userId?: string) => {
      const res = await fetch("/api/admin/ops/clear-entitlement-cache", {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const provisionalMutation = useMutation({
    mutationFn: async ({ userId, reason }: { userId: string; reason: string }) => {
      const res = await fetch("/api/admin/ops/provisional-access", {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify({ userId, reason }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }),
  });

  const handleCopySummary = useCallback(() => {
    copyToClipboard(buildStatusSummary(data));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  }, [data]);

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

  const overallBg = data?.overallStatus === "down" ? "bg-red-50 border-red-200"
    : data?.overallStatus === "degraded" ? "bg-amber-50 border-amber-200"
      : "bg-green-50 border-green-200";

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-ops-dashboard">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2" data-testid="text-ops-title">
                <Shield className="w-6 h-6 text-purple-600" />
                Ops Dashboard
              </h1>
              <p className="text-xs md:text-sm text-slate-500">Platform health, controls, and operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {data?.emergencyMode?.active && (
              <Badge className="bg-red-100 text-red-800 animate-pulse" data-testid="badge-emergency-active">EMERGENCY MODE</Badge>
            )}
            <Button size="sm" variant="outline" onClick={handleCopySummary} data-testid="button-copy-summary">
              <Copy className="w-3 h-3 mr-1" />
              {copiedSummary ? "Copied!" : "Copy Summary"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/admin/ops/emergency")} data-testid="button-emergency-panel">
              <Smartphone className="w-3 h-3 mr-1" /> Emergency Panel
            </Button>
            <Button size="sm" variant="outline" onClick={() => refetch()} data-testid="button-refresh-ops">
              <RefreshCw className="w-3 h-3 mr-1" /> Refresh
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}

        {!isLoading && data && (
          <>
            <Card className={`border ${overallBg}`}>
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {severityIcon(data.overallStatus || "healthy")}
                  <div>
                    <p className="font-semibold text-lg" data-testid="text-overall-status">
                      Platform: {(data.overallStatus || "unknown").toUpperCase()}
                    </p>
                    <p className="text-xs text-slate-500">
                      v{data.deploymentVersion} · Uptime: {Math.round((data.uptime || 0) / 60)}m · Updated: {new Date(data.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span data-testid="text-affected-users">
                    <Users className="w-4 h-4 inline mr-1" />{data.affectedUsers || 0} subscribers
                  </span>
                  <span data-testid="text-fallback-rate">
                    <Gauge className="w-4 h-4 inline mr-1" />{data.fallbackUsageRate || 0}% fallback
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-green-600" data-testid="text-healthy-count">{healthyCount}/{totalChecks}</p>
                  <p className="text-xs text-slate-500">Healthy Services</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className={`text-2xl font-bold ${openBreakers > 0 ? "text-red-600" : "text-green-600"}`} data-testid="text-open-breakers">{openBreakers}</p>
                  <p className="text-xs text-slate-500">Open Breakers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className={`text-2xl font-bold ${disabledFlags > 0 ? "text-amber-600" : "text-green-600"}`} data-testid="text-disabled-flags">{disabledFlags}</p>
                  <p className="text-xs text-slate-500">Disabled Flags</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className={`text-2xl font-bold ${activeKillSwitches > 0 ? "text-red-600" : "text-green-600"}`} data-testid="text-active-switches">{activeKillSwitches}</p>
                  <p className="text-xs text-slate-500">Kill Switches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-slate-600" data-testid="text-provisional-count">{data.provisionalAccess?.length || 0}</p>
                  <p className="text-xs text-slate-500">Provisional Grants</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-700">Emergency Mode</p>
                    <p className="text-xs text-slate-500">
                      {data.emergencyMode?.active
                        ? `Active since ${new Date(data.emergencyMode.activatedAt).toLocaleString()} — ${data.emergencyMode.reason}`
                        : "Grants all users basic access during outages"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={data.emergencyMode?.active ? "outline" : "destructive"}
                    onClick={() => emergencyMutation.mutate({ active: !data.emergencyMode?.active, reason: "admin_toggle" })}
                    data-testid="button-toggle-emergency-mode"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    {data.emergencyMode?.active ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Service Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(data.healthChecks || []).map((check: any) => (
                    <div key={check.service} className={`flex items-center justify-between p-2 rounded border ${severityColor(check.status)}`}>
                      <div className="flex items-center gap-2">
                        {severityIcon(check.status)}
                        <div>
                          <span className="font-medium text-sm" data-testid={`text-ops-health-${check.service}`}>{check.service}</span>
                          {check.details && <p className="text-xs opacity-75">{check.details}</p>}
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <StatusBadge status={check.status} />
                        <p className="mt-1 opacity-60">{check.latencyMs}ms</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Circuit Breakers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(data.circuitBreakers || []).map((cb: any) => (
                    <div key={cb.name} className={`flex items-center justify-between p-2 rounded border ${severityColor(cb.state)}`}>
                      <div>
                        <span className="font-medium text-sm" data-testid={`text-ops-breaker-${cb.name}`}>{cb.name}</span>
                        <p className="text-xs opacity-75">
                          Failures: {cb.failureCount}/{cb.failureThreshold} · Trips: {cb.tripCount}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={cb.state} />
                        {cb.state !== "closed" && (
                          <Button size="sm" variant="outline" className="h-7" onClick={() => resetBreakerMutation.mutate(cb.name)} data-testid={`button-ops-reset-breaker-${cb.name}`}>
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ToggleRight className="w-4 h-4" /> Feature Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(data.featureFlags || []).map((flag: any) => {
                    const isOn = flag.adminOverride !== null ? flag.adminOverride : flag.enabled;
                    return (
                      <div key={flag.key} className={`flex items-center justify-between p-2 rounded border ${isOn ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-sm truncate" data-testid={`text-ops-flag-${flag.key}`}>{flag.key}</span>
                            {flag.adminOverride !== null && <Badge className="bg-blue-100 text-blue-800 text-[10px] px-1">override</Badge>}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{flag.description}</p>
                          {flag.errorCount > 0 && <p className="text-[10px] text-red-500">Errors: {flag.errorCount}/{flag.errorThreshold}</p>}
                        </div>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          {flag.errorCount > 0 && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => resetErrorsMutation.mutate(flag.key)} data-testid={`button-ops-reset-errors-${flag.key}`}>
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant={isOn ? "default" : "outline"}
                            className="h-7 w-7 p-0"
                            onClick={() => flagMutation.mutate({ key: flag.key, enabled: !isOn })}
                            data-testid={`button-ops-toggle-flag-${flag.key}`}
                          >
                            {isOn ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Power className="w-4 h-4" /> Kill Switches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(data.killSwitches || []).length === 0 && <p className="text-slate-500 text-sm">No kill switches configured.</p>}
                  {(data.killSwitches || []).map((ks: any) => (
                    <div key={ks.key} className={`flex items-center justify-between p-2 rounded border ${ks.active ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm" data-testid={`text-ops-killswitch-${ks.key}`}>{ks.key}</span>
                          <Badge className={ks.active ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"} variant="outline">
                            {ks.active ? "ACTIVE" : "INACTIVE"}
                          </Badge>
                        </div>
                        {ks.reason && <p className="text-[11px] text-slate-500">{ks.reason}</p>}
                      </div>
                      <Button
                        size="sm"
                        variant={ks.active ? "outline" : "destructive"}
                        className="h-7"
                        onClick={() => killSwitchMutation.mutate({ key: ks.key, active: !ks.active, scope: ks.scope, target: ks.target })}
                        data-testid={`button-ops-toggle-ks-${ks.key}`}
                      >
                        <Power className="w-3 h-3 mr-1" />
                        {ks.active ? "Off" : "On"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Server className="w-4 h-4" /> Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => clearCacheMutation.mutate()}
                    data-testid="button-ops-clear-cache"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear All Entitlement Cache
                  </Button>
                  <ProvisionalAccessForm onGrant={(userId, reason) => provisionalMutation.mutate({ userId, reason })} />
                </CardContent>
              </Card>
            </div>

            {data.provisionalAccess?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Provisional Access Grants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {data.provisionalAccess.map((grant: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded" data-testid={`text-provisional-grant-${i}`}>
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="w-4 h-4" /> Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(data.events || []).slice(0, 30).map((event: any) => (
                    <div key={event.id} className="flex items-start gap-2 p-1.5 bg-slate-50 rounded text-xs" data-testid={`event-ops-${event.id}`}>
                      <Clock className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-slate-700">{event.type}</span>
                        <span className="text-slate-500 ml-1">{event.source}</span>
                        <p className="text-[10px] text-slate-400">
                          {new Date(event.timestamp).toLocaleString()}
                          {event.data && Object.keys(event.data).length > 0 && (
                            <span className="ml-1 text-slate-300">{JSON.stringify(event.data).substring(0, 80)}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!data.events || data.events.length === 0) && <p className="text-sm text-slate-500">No events recorded.</p>}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function ProvisionalAccessForm({ onGrant }: { onGrant: (userId: string, reason: string) => void }) {
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="space-y-2 border-t pt-2 mt-2">
      <p className="text-xs font-medium text-slate-600">Grant Provisional Access</p>
      <Input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} className="h-8 text-sm" data-testid="input-ops-provisional-user" />
      <Input placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} className="h-8 text-sm" data-testid="input-ops-provisional-reason" />
      <Button
        size="sm"
        variant="outline"
        disabled={!userId}
        className="w-full"
        onClick={() => { onGrant(userId, reason || "admin_grant"); setUserId(""); setReason(""); }}
        data-testid="button-ops-grant-provisional"
      >
        Grant Access
      </Button>
    </div>
  );
}
