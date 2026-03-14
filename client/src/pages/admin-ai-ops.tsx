import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, Activity, DollarSign, Zap, AlertTriangle, Power,
  Loader2, Server, Plus, Trash2, RefreshCw, Shield, Clock,
  TrendingUp, XCircle, CheckCircle, BarChart3
} from "lucide-react";
import { Link } from "wouter";

function StatusDot({ healthy, enabled }: { healthy: boolean; enabled: boolean }) {
  if (!enabled) return <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" data-testid="dot-disabled" />;
  return <span className={`w-2.5 h-2.5 rounded-full inline-block ${healthy ? "bg-green-500" : "bg-red-500"}`} data-testid={`dot-${healthy ? "healthy" : "unhealthy"}`} />;
}

function KillSwitchCard() {
  const queryClient = useQueryClient();
  const { data: status } = useQuery({
    queryKey: ["/api/admin/ai-ops/status"],
    queryFn: () => adminFetch("/api/admin/ai-ops/status").then(r => r.json()),
    refetchInterval: 15000,
  });

  const toggleKill = useMutation({
    mutationFn: (enabled: boolean) => adminFetch("/api/admin/ai-ops/kill-switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-ops/status"] }),
  });

  const isKilled = status?.killSwitch === true;

  return (
    <Card className={isKilled ? "border-red-500 bg-red-50" : "border-green-200"} data-testid="card-kill-switch">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Power className={`w-5 h-5 ${isKilled ? "text-red-600" : "text-green-600"}`} />
            <div>
              <div className="font-medium text-sm">Global Kill Switch</div>
              <div className="text-xs text-gray-500">{isKilled ? "All AI generation is HALTED" : "AI generation is active"}</div>
            </div>
          </div>
          <Button
            variant={isKilled ? "default" : "destructive"}
            size="sm"
            onClick={() => toggleKill.mutate(!isKilled)}
            disabled={toggleKill.isPending}
            data-testid="button-toggle-kill-switch"
          >
            {toggleKill.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : isKilled ? "Resume" : "HALT ALL"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CostDashboard() {
  const { data: cost, isLoading } = useQuery({
    queryKey: ["/api/admin/ai-ops/cost-summary"],
    queryFn: () => adminFetch("/api/admin/ai-ops/cost-summary").then(r => r.json()),
    refetchInterval: 30000,
  });

  if (isLoading) return <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin w-4 h-4" /> Loading cost data...</div>;
  if (!cost) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card data-testid="stat-daily-cost">
          <CardContent className="py-3 text-center">
            <DollarSign className="w-4 h-4 mx-auto text-green-600 mb-1" />
            <div className="text-lg font-bold">${cost.daily?.cost?.toFixed(4) || "0.00"}</div>
            <div className="text-xs text-gray-500">Today's Cost</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-daily-tokens">
          <CardContent className="py-3 text-center">
            <Zap className="w-4 h-4 mx-auto text-blue-600 mb-1" />
            <div className="text-lg font-bold">{(cost.daily?.tokens || 0).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Today's Tokens</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-monthly-cost">
          <CardContent className="py-3 text-center">
            <TrendingUp className="w-4 h-4 mx-auto text-purple-600 mb-1" />
            <div className="text-lg font-bold">${cost.monthly?.cost?.toFixed(4) || "0.00"}</div>
            <div className="text-xs text-gray-500">Monthly Cost</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-monthly-requests">
          <CardContent className="py-3 text-center">
            <BarChart3 className="w-4 h-4 mx-auto text-orange-600 mb-1" />
            <div className="text-lg font-bold">{(cost.monthly?.requests || 0).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Monthly Requests</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card data-testid="stat-daily-errors">
          <CardContent className="py-3 text-center">
            <XCircle className="w-4 h-4 mx-auto text-red-500 mb-1" />
            <div className="text-lg font-bold">{cost.daily?.errors || 0}</div>
            <div className="text-xs text-gray-500">Today's Errors</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-daily-latency">
          <CardContent className="py-3 text-center">
            <Clock className="w-4 h-4 mx-auto text-gray-600 mb-1" />
            <div className="text-lg font-bold">{cost.daily?.avgLatency || 0}ms</div>
            <div className="text-xs text-gray-500">Avg Latency</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-monthly-errors">
          <CardContent className="py-3 text-center">
            <AlertTriangle className="w-4 h-4 mx-auto text-amber-500 mb-1" />
            <div className="text-lg font-bold">{cost.monthly?.errors || 0}</div>
            <div className="text-xs text-gray-500">Monthly Errors</div>
          </CardContent>
        </Card>
      </div>

      {cost.providerBreakdown && cost.providerBreakdown.length > 0 && (
        <Card data-testid="card-provider-breakdown">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Provider Breakdown (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="space-y-2">
              {cost.providerBreakdown.map((p: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-sm border-b pb-2 last:border-0" data-testid={`row-provider-${i}`}>
                  <div className="font-medium">{p.providerName || "Unknown"}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{p.requests} reqs</span>
                    <span>{p.tokens.toLocaleString()} tokens</span>
                    <span className="font-medium text-gray-900">${p.cost.toFixed(4)}</span>
                    <span className={p.errors > 0 ? "text-red-500" : "text-green-600"}>
                      {p.errors > 0 ? `${p.errors} errors` : "0 errors"}
                    </span>
                    <span>{p.avgLatency}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ProvidersPanel() {
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: "", providerType: "openai", endpointUrl: "", apiKey: "",
    models: "", costPerInputToken: "0.00000015", costPerOutputToken: "0.0000006",
    maxConcurrency: "5", rateLimit: "60", priority: "100", taskTypes: "",
  });

  const { data: providers, isLoading } = useQuery({
    queryKey: ["/api/admin/ai-ops/providers"],
    queryFn: () => adminFetch("/api/admin/ai-ops/providers").then(r => r.json()),
    refetchInterval: 30000,
  });

  const toggleProvider = useMutation({
    mutationFn: (id: string) => adminFetch(`/api/admin/ai-ops/providers/${id}/toggle`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-ops/providers"] }),
  });

  const deleteProviderMut = useMutation({
    mutationFn: (id: string) => adminFetch(`/api/admin/ai-ops/providers/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-ops/providers"] }),
  });

  const addProviderMut = useMutation({
    mutationFn: (data: any) => adminFetch("/api/admin/ai-ops/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-ops/providers"] });
      setShowAdd(false);
      setNewProvider({
        name: "", providerType: "openai", endpointUrl: "", apiKey: "",
        models: "", costPerInputToken: "0.00000015", costPerOutputToken: "0.0000006",
        maxConcurrency: "5", rateLimit: "60", priority: "100", taskTypes: "",
      });
    },
  });

  const reloadProviders = useMutation({
    mutationFn: () => adminFetch("/api/admin/ai-ops/reload-providers", { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-ops/providers"] }),
  });

  if (isLoading) return <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin w-4 h-4" /> Loading providers...</div>;

  const providerList = Array.isArray(providers) ? providers : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">AI Providers ({providerList.length})</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => reloadProviders.mutate()} disabled={reloadProviders.isPending} data-testid="button-reload-providers">
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${reloadProviders.isPending ? "animate-spin" : ""}`} /> Reload
          </Button>
          <Button size="sm" onClick={() => setShowAdd(!showAdd)} data-testid="button-add-provider">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Provider
          </Button>
        </div>
      </div>

      {showAdd && (
        <Card className="border-blue-200" data-testid="card-add-provider">
          <CardContent className="py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Name</Label>
                <Input value={newProvider.name} onChange={e => setNewProvider({ ...newProvider, name: e.target.value })} placeholder="e.g. Ollama Local" data-testid="input-provider-name" />
              </div>
              <div>
                <Label className="text-xs">Type</Label>
                <Select value={newProvider.providerType} onValueChange={v => setNewProvider({ ...newProvider, providerType: v })}>
                  <SelectTrigger data-testid="select-provider-type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="ollama">Ollama</SelectItem>
                    <SelectItem value="vllm">vLLM</SelectItem>
                    <SelectItem value="lmstudio">LM Studio</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Endpoint URL</Label>
              <Input value={newProvider.endpointUrl} onChange={e => setNewProvider({ ...newProvider, endpointUrl: e.target.value })} placeholder="http://localhost:11434/v1" data-testid="input-provider-endpoint" />
            </div>
            <div>
              <Label className="text-xs">API Key (optional for local)</Label>
              <Input value={newProvider.apiKey} onChange={e => setNewProvider({ ...newProvider, apiKey: e.target.value })} placeholder="sk-..." type="password" data-testid="input-provider-apikey" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Models (comma-separated)</Label>
                <Input value={newProvider.models} onChange={e => setNewProvider({ ...newProvider, models: e.target.value })} placeholder="gpt-4o-mini, gpt-4o" data-testid="input-provider-models" />
              </div>
              <div>
                <Label className="text-xs">Task Types (comma-separated)</Label>
                <Input value={newProvider.taskTypes} onChange={e => setNewProvider({ ...newProvider, taskTypes: e.target.value })} placeholder="qbank, content, blog" data-testid="input-provider-tasks" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <Label className="text-xs">$/Input Token</Label>
                <Input value={newProvider.costPerInputToken} onChange={e => setNewProvider({ ...newProvider, costPerInputToken: e.target.value })} data-testid="input-cost-input" />
              </div>
              <div>
                <Label className="text-xs">$/Output Token</Label>
                <Input value={newProvider.costPerOutputToken} onChange={e => setNewProvider({ ...newProvider, costPerOutputToken: e.target.value })} data-testid="input-cost-output" />
              </div>
              <div>
                <Label className="text-xs">Max Concurrency</Label>
                <Input value={newProvider.maxConcurrency} onChange={e => setNewProvider({ ...newProvider, maxConcurrency: e.target.value })} data-testid="input-concurrency" />
              </div>
              <div>
                <Label className="text-xs">Priority (lower=first)</Label>
                <Input value={newProvider.priority} onChange={e => setNewProvider({ ...newProvider, priority: e.target.value })} data-testid="input-priority" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => addProviderMut.mutate({
                  ...newProvider,
                  models: newProvider.models.split(",").map(m => m.trim()).filter(Boolean),
                  taskTypes: newProvider.taskTypes.split(",").map(t => t.trim()).filter(Boolean),
                  costPerInputToken: parseFloat(newProvider.costPerInputToken) || 0,
                  costPerOutputToken: parseFloat(newProvider.costPerOutputToken) || 0,
                  maxConcurrency: parseInt(newProvider.maxConcurrency) || 5,
                  rateLimit: parseInt(newProvider.rateLimit) || 60,
                  priority: parseInt(newProvider.priority) || 100,
                })}
                disabled={addProviderMut.isPending || !newProvider.name || !newProvider.endpointUrl}
                data-testid="button-save-provider"
              >
                {addProviderMut.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                Save Provider
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)} data-testid="button-cancel-add">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {providerList.map((p: any) => (
          <Card key={p.id} data-testid={`card-provider-${p.id}`}>
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusDot healthy={p.isHealthy} enabled={p.enabled} />
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      {p.name}
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">{p.providerType}</Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">P{p.priority}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{p.endpointUrl}</span>
                      {p.models?.length > 0 && <span>| {p.models.join(", ")}</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Tasks: {p.taskTypes?.length > 0 ? p.taskTypes.join(", ") : "all"} |
                      Concurrency: {p.maxConcurrency} |
                      Rate: {p.rateLimit}/min
                      {p.consecutiveFailures > 0 && <span className="text-red-500 ml-2">({p.consecutiveFailures} failures)</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProvider.mutate(p.id)}
                    disabled={toggleProvider.isPending}
                    data-testid={`button-toggle-${p.id}`}
                  >
                    {p.enabled ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { if (confirm("Delete this provider?")) deleteProviderMut.mutate(p.id); }}
                    disabled={deleteProviderMut.isPending}
                    data-testid={`button-delete-${p.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {providerList.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">No providers configured. Add one to get started.</div>
        )}
      </div>
    </div>
  );
}

function RequestLogsPanel() {
  const [logLimit, setLogLimit] = useState(50);
  const { data: logs, isLoading } = useQuery({
    queryKey: ["/api/admin/ai-ops/request-logs", logLimit],
    queryFn: () => adminFetch(`/api/admin/ai-ops/request-logs?limit=${logLimit}`).then(r => r.json()),
    refetchInterval: 30000,
  });

  if (isLoading) return <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin w-4 h-4" /> Loading logs...</div>;

  const logList = Array.isArray(logs) ? logs : [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Recent AI Requests ({logList.length})</h3>
        <Select value={String(logLimit)} onValueChange={v => setLogLimit(parseInt(v))}>
          <SelectTrigger className="w-24" data-testid="select-log-limit"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="200">200</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2 px-2">Time</th>
              <th className="py-2 px-2">Provider</th>
              <th className="py-2 px-2">Model</th>
              <th className="py-2 px-2">Task</th>
              <th className="py-2 px-2">Feature</th>
              <th className="py-2 px-2 text-right">Tokens</th>
              <th className="py-2 px-2 text-right">Cost</th>
              <th className="py-2 px-2 text-right">Latency</th>
              <th className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logList.map((log: any, i: number) => (
              <tr key={log.id || i} className="border-b hover:bg-gray-50" data-testid={`row-log-${i}`}>
                <td className="py-1.5 px-2 text-gray-500">{new Date(log.created_at).toLocaleString()}</td>
                <td className="py-1.5 px-2">{log.provider_name || "-"}</td>
                <td className="py-1.5 px-2">{(log.model || "-").replace("openai/", "")}</td>
                <td className="py-1.5 px-2">{log.task_type || "-"}</td>
                <td className="py-1.5 px-2">{log.feature || "-"}</td>
                <td className="py-1.5 px-2 text-right">{(log.total_tokens || 0).toLocaleString()}</td>
                <td className="py-1.5 px-2 text-right">${(log.estimated_cost || 0).toFixed(6)}</td>
                <td className="py-1.5 px-2 text-right">{log.latency_ms || 0}ms</td>
                <td className="py-1.5 px-2">
                  {log.success ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <span className="text-red-500" title={log.error_message}><XCircle className="w-3.5 h-3.5 inline" /> {(log.error_message || "").slice(0, 30)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logList.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">No request logs yet. AI requests will appear here once providers are configured and active.</div>
        )}
      </div>
    </div>
  );
}

export default function AdminAiOpsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "providers" | "logs">("overview");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin">
          <Button variant="ghost" size="sm" data-testid="button-back-admin">
            <ArrowLeft className="w-4 h-4 mr-1" /> Admin
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2" data-testid="text-page-title">
            <Shield className="w-5 h-5 text-blue-600" /> AI Ops Dashboard
          </h1>
          <p className="text-xs text-gray-500">Provider routing, cost control, and monitoring</p>
        </div>
      </div>

      <KillSwitchCard />

      <div className="flex gap-2 mt-4 mb-4 border-b pb-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("overview")}
          data-testid="tab-overview"
        >
          <Activity className="w-3.5 h-3.5 mr-1" /> Cost & Usage
        </Button>
        <Button
          variant={activeTab === "providers" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("providers")}
          data-testid="tab-providers"
        >
          <Server className="w-3.5 h-3.5 mr-1" /> Providers
        </Button>
        <Button
          variant={activeTab === "logs" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("logs")}
          data-testid="tab-logs"
        >
          <BarChart3 className="w-3.5 h-3.5 mr-1" /> Request Logs
        </Button>
      </div>

      {activeTab === "overview" && <CostDashboard />}
      {activeTab === "providers" && <ProvidersPanel />}
      {activeTab === "logs" && <RequestLogsPanel />}
    </div>
  );
}
