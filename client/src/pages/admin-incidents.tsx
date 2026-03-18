import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  Shield, AlertTriangle, Activity, Users, Clock, RefreshCw,
  CheckCircle2, XCircle, ArrowLeft, Search, Loader2, Eye,
  AlertCircle, Bell, Filter, ChevronDown, ChevronUp, MessageSquare
} from "lucide-react";

interface Incident {
  incidentId: string;
  category: string;
  severity: "critical" | "warning" | "info";
  errorSignature: string;
  title: string;
  message: string;
  firstOccurrence: number;
  lastOccurrence: number;
  affectedUserIds: string[];
  affectedUserCount: number;
  occurrenceCount: number;
  status: "active" | "acknowledged" | "resolved";
  resolutionNotes: string | null;
  resolvedAt: number | null;
  resolvedBy: string | null;
  acknowledgedAt: number | null;
  acknowledgedBy: string | null;
  metadata: Record<string, any>;
}

interface IncidentStats {
  totalActive: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  acknowledgedCount: number;
  resolvedCount: number;
  totalAffectedUsers: number;
}

const SEVERITY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800" },
  info: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
};

const CATEGORY_LABELS: Record<string, string> = {
  login_failure: "Login Failure",
  entitlement_failure: "Entitlement Failure",
  exam_load_failure: "Exam Load Failure",
  cat_start_failure: "CAT Start Failure",
  flashcard_failure: "Flashcard Failure",
  lesson_load_failure: "Lesson Load Failure",
  download_failure: "Download Failure",
  fallback_mode: "Fallback Mode",
  provisional_access: "Provisional Access",
  quarantined_content: "Quarantined Content",
  deployment_rollback: "Deployment Rollback",
  circuit_breaker_trip: "Circuit Breaker Trip",
  feature_auto_disabled: "Feature Auto-Disabled",
  emergency_mode: "Emergency Mode",
  health_check_failure: "Health Check Failure",
  general: "General",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function SeverityBadge({ severity }: { severity: string }) {
  const icons: Record<string, any> = { critical: XCircle, warning: AlertTriangle, info: AlertCircle };
  const colors: Record<string, string> = {
    critical: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  };
  const Icon = icons[severity] || AlertCircle;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[severity] || colors.info}`} data-testid={`badge-severity-${severity}`}>
      <Icon className="w-3 h-3" />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    acknowledged: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    resolved: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-800"}`} data-testid={`badge-status-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminIncidentsPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [filterSeverity, setFilterSeverity] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [resolveNotes, setResolveNotes] = useState("");

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/incidents/stats"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/incidents/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json() as Promise<IncidentStats>;
    },
    refetchInterval: 30000,
  });

  const { data: incidentsData, isLoading: incidentsLoading, refetch } = useQuery({
    queryKey: ["/api/admin/incidents", filterSeverity, filterCategory, filterStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterSeverity) params.set("severity", filterSeverity);
      if (filterCategory) params.set("category", filterCategory);
      if (filterStatus) params.set("status", filterStatus);
      params.set("limit", "200");
      const res = await adminFetch(`/api/admin/incidents?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch incidents");
      return res.json() as Promise<{ incidents: Incident[]; total: number }>;
    },
    refetchInterval: 30000,
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async (incidentId: string) => {
      const res = await adminFetch(`/api/admin/incidents/${incidentId}/acknowledge`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to acknowledge");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/incidents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/incidents/stats"] });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async ({ incidentId, notes }: { incidentId: string; notes: string }) => {
      const res = await adminFetch(`/api/admin/incidents/${incidentId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error("Failed to resolve");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/incidents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/incidents/stats"] });
      setSelectedIncident(null);
      setResolveNotes("");
    },
  });

  if (!user || user.tier !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-bold" data-testid="text-access-denied">Admin access required</h2>
        </div>
      </div>
    );
  }

  const incidents = incidentsData?.incidents || [];
  const filteredIncidents = incidents.filter(i => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return i.title.toLowerCase().includes(term) || i.incidentId.toLowerCase().includes(term) || i.message.toLowerCase().includes(term) || i.category.toLowerCase().includes(term);
  });

  const stats = statsData || { totalActive: 0, criticalCount: 0, warningCount: 0, infoCount: 0, acknowledgedCount: 0, resolvedCount: 0, totalAffectedUsers: 0 };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} data-testid="button-back-admin">
            <ArrowLeft className="w-4 h-4 mr-1" /> Admin
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2" data-testid="text-page-title">
              <Shield className="w-6 h-6 text-primary" />
              Incident Center
            </h1>
            <p className="text-sm text-muted-foreground">Production monitoring and incident management</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} data-testid="button-refresh-incidents">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <Card className="border-red-200 dark:border-red-800" data-testid="card-stat-critical">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.criticalCount}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-800" data-testid="card-stat-warning">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.warningCount}</div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800" data-testid="card-stat-info">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.infoCount}</div>
              <div className="text-xs text-muted-foreground">Info</div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-active">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold">{stats.totalActive}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-acknowledged">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.acknowledgedCount}</div>
              <div className="text-xs text-muted-foreground">Acknowledged</div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-resolved">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolvedCount}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-affected-users">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold">{stats.totalAffectedUsers}</div>
              <div className="text-xs text-muted-foreground">Affected Users</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search incidents..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              data-testid="input-search-incidents"
            />
          </div>
          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
            data-testid="select-filter-severity"
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            data-testid="select-filter-category"
          >
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            data-testid="select-filter-status"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {selectedIncident ? (
          <Card className="mb-4" data-testid="card-incident-detail">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(null)} data-testid="button-back-list">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-lg">{selectedIncident.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={selectedIncident.severity} />
                  <StatusBadge status={selectedIncident.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Incident ID</div>
                  <div className="text-sm font-mono" data-testid="text-incident-id">{selectedIncident.incidentId}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Category</div>
                  <div className="text-sm" data-testid="text-incident-category">{CATEGORY_LABELS[selectedIncident.category] || selectedIncident.category}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Affected Users</div>
                  <div className="text-sm font-semibold" data-testid="text-incident-affected">{selectedIncident.affectedUserCount}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Occurrences</div>
                  <div className="text-sm font-semibold" data-testid="text-incident-occurrences">{selectedIncident.occurrenceCount}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">Message</div>
                <div className="text-sm bg-muted/50 rounded p-3" data-testid="text-incident-message">{selectedIncident.message}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">First Seen</div>
                  <div className="text-sm">{new Date(selectedIncident.firstOccurrence).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Last Seen</div>
                  <div className="text-sm">{new Date(selectedIncident.lastOccurrence).toLocaleString()}</div>
                </div>
              </div>

              {selectedIncident.acknowledgedAt && (
                <div>
                  <div className="text-xs text-muted-foreground">Acknowledged</div>
                  <div className="text-sm">{new Date(selectedIncident.acknowledgedAt).toLocaleString()} by {selectedIncident.acknowledgedBy}</div>
                </div>
              )}

              {selectedIncident.resolvedAt && (
                <div>
                  <div className="text-xs text-muted-foreground">Resolved</div>
                  <div className="text-sm">{new Date(selectedIncident.resolvedAt).toLocaleString()} by {selectedIncident.resolvedBy}</div>
                  {selectedIncident.resolutionNotes && (
                    <div className="text-sm mt-1 bg-green-50 dark:bg-green-900/20 rounded p-2">{selectedIncident.resolutionNotes}</div>
                  )}
                </div>
              )}

              {selectedIncident.affectedUserIds.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Affected User IDs ({selectedIncident.affectedUserIds.length})</div>
                  <div className="text-xs font-mono bg-muted/50 rounded p-2 max-h-24 overflow-y-auto">
                    {selectedIncident.affectedUserIds.slice(0, 20).join(", ")}
                    {selectedIncident.affectedUserIds.length > 20 && ` ... and ${selectedIncident.affectedUserIds.length - 20} more`}
                  </div>
                </div>
              )}

              {Object.keys(selectedIncident.metadata).length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Metadata</div>
                  <pre className="text-xs bg-muted/50 rounded p-2 overflow-x-auto max-h-32">{JSON.stringify(selectedIncident.metadata, null, 2)}</pre>
                </div>
              )}

              {selectedIncident.status !== "resolved" && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  {selectedIncident.status === "active" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeMutation.mutate(selectedIncident.incidentId)}
                      disabled={acknowledgeMutation.isPending}
                      data-testid="button-acknowledge-incident"
                    >
                      <Eye className="w-4 h-4 mr-1" /> Acknowledge
                    </Button>
                  )}
                  <div className="flex-1">
                    <Input
                      placeholder="Resolution notes..."
                      value={resolveNotes}
                      onChange={e => setResolveNotes(e.target.value)}
                      data-testid="input-resolve-notes"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => resolveMutation.mutate({ incidentId: selectedIncident.incidentId, notes: resolveNotes })}
                    disabled={resolveMutation.isPending}
                    data-testid="button-resolve-incident"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Resolve
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2" data-testid="list-incidents">
            {(incidentsLoading || statsLoading) && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Loading incidents...</p>
              </div>
            )}

            {!incidentsLoading && filteredIncidents.length === 0 && (
              <div className="text-center py-12" data-testid="text-no-incidents">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p className="font-medium">No incidents found</p>
                <p className="text-sm text-muted-foreground">All systems operating normally</p>
              </div>
            )}

            {filteredIncidents.map(incident => {
              const styles = SEVERITY_STYLES[incident.severity] || SEVERITY_STYLES.info;
              return (
                <Card
                  key={incident.incidentId}
                  className={`cursor-pointer hover:shadow-md transition-shadow border ${styles.border}`}
                  onClick={() => setSelectedIncident(incident)}
                  data-testid={`card-incident-${incident.incidentId}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <SeverityBadge severity={incident.severity} />
                          <StatusBadge status={incident.status} />
                          <span className="text-xs text-muted-foreground font-mono">{incident.incidentId}</span>
                        </div>
                        <h3 className="font-semibold text-sm truncate" data-testid={`text-incident-title-${incident.incidentId}`}>{incident.title}</h3>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{incident.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Activity className="w-3 h-3" /> {CATEGORY_LABELS[incident.category] || incident.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {incident.affectedUserCount} users
                          </span>
                          <span className="flex items-center gap-1">
                            <Bell className="w-3 h-3" /> {incident.occurrenceCount}x
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {timeAgo(incident.lastOccurrence)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {incident.status === "active" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); acknowledgeMutation.mutate(incident.incidentId); }}
                            disabled={acknowledgeMutation.isPending}
                            data-testid={`button-ack-${incident.incidentId}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground mt-4" data-testid="text-auto-refresh">
          Auto-refreshes every 30 seconds
        </div>
      </div>
    </div>
  );
}
