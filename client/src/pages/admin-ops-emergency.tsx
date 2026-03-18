import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield, Zap, AlertTriangle, RefreshCw, CheckCircle2, XCircle,
  ArrowLeft, Power, ToggleRight, ToggleLeft, Trash2, Users,
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

function ConfirmDialog({ title, message, onConfirm, onCancel }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="dialog-confirm">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg" data-testid="text-confirm-title">{title}</h3>
              <p className="text-sm text-slate-600">{message}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 text-base" onClick={onCancel} data-testid="button-confirm-cancel">
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-14 text-base font-bold" onClick={onConfirm} data-testid="button-confirm-proceed">
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminOpsEmergency() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => void } | null>(null);
  const [provisionalUserId, setProvisionalUserId] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-ops-status"],
    queryFn: fetchOpsStatus,
    refetchInterval: 10000,
    retry: 1,
  });

  function makeApiCall(url: string, body: any) {
    return fetch(url, { method: "POST", headers: getAuthHeaders(), body: JSON.stringify(body) })
      .then(r => { if (!r.ok) throw new Error("Failed"); return r.json(); })
      .then(() => { queryClient.invalidateQueries({ queryKey: ["admin-ops-status"] }); });
  }

  function confirmAction(title: string, message: string, action: () => void) {
    setConfirm({ title, message, action });
  }

  const emergencyMutation = useMutation({
    mutationFn: async ({ active, reason }: { active: boolean; reason?: string }) =>
      makeApiCall("/api/admin/ops/emergency-mode", { active, reason }),
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="text-admin-required">
        <p className="text-slate-500">Admin access required.</p>
      </div>
    );
  }

  const isEmergency = data?.emergencyMode?.active;
  const overallStatus = data?.overallStatus || "unknown";
  const openBreakers = (data?.circuitBreakers || []).filter((cb: any) => cb.state !== "closed");

  return (
    <div className="min-h-screen bg-slate-900 text-white" data-testid="admin-ops-emergency">
      {confirm && (
        <ConfirmDialog
          title={confirm.title}
          message={confirm.message}
          onConfirm={() => { confirm.action(); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="max-w-lg mx-auto p-4 space-y-4 pb-20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white" onClick={() => navigate("/admin/ops")} data-testid="button-back-to-ops">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold flex items-center gap-2" data-testid="text-emergency-title">
            <Shield className="w-5 h-5 text-red-400" />
            Emergency Controls
          </h1>
          <Button variant="ghost" size="sm" className="text-white" onClick={() => refetch()} data-testid="button-refresh-emergency">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        <Card className={`border-2 ${isEmergency ? "border-red-500 bg-red-950" : overallStatus === "down" ? "border-red-500 bg-red-950/50" : overallStatus === "degraded" ? "border-amber-500 bg-amber-950/50" : "border-green-500 bg-green-950/50"}`}>
          <CardContent className="p-4 text-center">
            {overallStatus === "healthy" ? (
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
            ) : overallStatus === "degraded" ? (
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-2" />
            ) : (
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
            )}
            <p className="text-xl font-bold" data-testid="text-emergency-status">
              {isEmergency ? "EMERGENCY MODE ACTIVE" : overallStatus.toUpperCase()}
            </p>
            {isEmergency && data.emergencyMode?.reason && (
              <p className="text-sm text-red-300 mt-1">{data.emergencyMode.reason}</p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {data?.healthChecks?.filter((h: any) => h.status === "healthy").length || 0}/{data?.healthChecks?.length || 0} services healthy
              · {openBreakers.length} breakers open
            </p>
          </CardContent>
        </Card>

        <Button
          className={`w-full h-16 text-lg font-bold ${isEmergency ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
          onClick={() => confirmAction(
            isEmergency ? "Deactivate Emergency Mode" : "Activate Emergency Mode",
            isEmergency ? "This will return the platform to normal operation. Users will lose emergency access grants." : "This will grant all users basic access and restrict write operations. Use during critical outages.",
            () => emergencyMutation.mutate({ active: !isEmergency, reason: "emergency_panel_toggle" })
          )}
          data-testid="button-emergency-toggle"
        >
          <Zap className="w-6 h-6 mr-2" />
          {isEmergency ? "Deactivate Emergency Mode" : "Activate Emergency Mode"}
        </Button>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Critical Controls</h2>

          {openBreakers.length > 0 && (
            <>
              <p className="text-xs text-slate-400">Open Circuit Breakers</p>
              {openBreakers.map((cb: any) => (
                <Button
                  key={cb.name}
                  className="w-full h-14 text-base bg-slate-800 hover:bg-slate-700 justify-between"
                  onClick={() => confirmAction(
                    `Reset ${cb.name} Breaker`,
                    `Reset the circuit breaker for ${cb.name}. Current failures: ${cb.failureCount}.`,
                    () => makeApiCall(`/api/admin/ops/circuit-breaker/${cb.name}/reset`, {})
                  )}
                  data-testid={`button-em-reset-breaker-${cb.name}`}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-amber-400" />
                    Reset {cb.name}
                  </span>
                  <Badge className="bg-red-800 text-red-200">{cb.state}</Badge>
                </Button>
              ))}
            </>
          )}

          <Button
            className="w-full h-14 text-base bg-slate-800 hover:bg-slate-700 justify-start"
            onClick={() => confirmAction(
              "Clear Entitlement Cache",
              "This clears all cached entitlement decisions. Users will be re-evaluated on next request.",
              () => makeApiCall("/api/admin/ops/clear-entitlement-cache", {})
            )}
            data-testid="button-em-clear-cache"
          >
            <Trash2 className="w-5 h-5 mr-3 text-amber-400" />
            Clear Entitlement Cache
          </Button>

          <div className="space-y-2">
            <p className="text-xs text-slate-400">Grant Provisional Access</p>
            <div className="flex gap-2">
              <Input
                placeholder="User ID"
                value={provisionalUserId}
                onChange={(e) => setProvisionalUserId(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white h-14 text-base"
                data-testid="input-em-provisional-user"
              />
              <Button
                className="h-14 px-6 bg-blue-600 hover:bg-blue-700"
                disabled={!provisionalUserId}
                onClick={() => confirmAction(
                  "Grant Provisional Access",
                  `Grant provisional access to user ${provisionalUserId}. This lasts 1 hour.`,
                  () => { makeApiCall("/api/admin/ops/provisional-access", { userId: provisionalUserId, reason: "emergency_grant" }); setProvisionalUserId(""); }
                )}
                data-testid="button-em-grant-provisional"
              >
                <Users className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Feature Flags</h2>
          {(data?.featureFlags || [])
            .filter((f: any) => {
              const isOn = f.adminOverride !== null ? f.adminOverride : f.enabled;
              return !isOn || f.errorCount > 0;
            })
            .slice(0, 8)
            .map((flag: any) => {
              const isOn = flag.adminOverride !== null ? flag.adminOverride : flag.enabled;
              return (
                <Button
                  key={flag.key}
                  className="w-full h-14 text-base bg-slate-800 hover:bg-slate-700 justify-between"
                  onClick={() => confirmAction(
                    `${isOn ? "Disable" : "Enable"} ${flag.key}`,
                    `${isOn ? "Disable" : "Enable"} the ${flag.description} feature flag.`,
                    () => makeApiCall(`/api/admin/ops/feature-flag/${flag.key}`, { enabled: !isOn, reason: "emergency_panel" })
                  )}
                  data-testid={`button-em-flag-${flag.key}`}
                >
                  <span className="flex items-center gap-2">
                    {isOn ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-red-400" />}
                    <span className="truncate">{flag.key}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {flag.errorCount > 0 && <Badge className="bg-red-800 text-red-200">{flag.errorCount} err</Badge>}
                    <Badge className={isOn ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}>
                      {isOn ? "ON" : "OFF"}
                    </Badge>
                  </div>
                </Button>
              );
            })}
          {(data?.featureFlags || []).filter((f: any) => !(f.adminOverride !== null ? f.adminOverride : f.enabled) || f.errorCount > 0).length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">All feature flags healthy</p>
          )}
        </div>

        {(data?.killSwitches || []).filter((ks: any) => ks.active).length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Active Kill Switches</h2>
            {(data?.killSwitches || []).filter((ks: any) => ks.active).map((ks: any) => (
              <Button
                key={ks.key}
                className="w-full h-14 text-base bg-red-900/50 hover:bg-red-900 justify-between border border-red-700"
                onClick={() => confirmAction(
                  `Deactivate ${ks.key}`,
                  `Deactivate kill switch "${ks.key}" (${ks.scope}: ${ks.target}).`,
                  () => makeApiCall("/api/admin/ops/kill-switch", { key: ks.key, active: false, scope: ks.scope, target: ks.target })
                )}
                data-testid={`button-em-ks-${ks.key}`}
              >
                <span className="flex items-center gap-2">
                  <Power className="w-5 h-5 text-red-400" />
                  <span className="truncate">{ks.key}</span>
                </span>
                <Badge className="bg-red-800 text-red-200">ACTIVE</Badge>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
