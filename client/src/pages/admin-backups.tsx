import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { adminFetch } from "@/lib/admin-fetch";
import {
  Database,
  HardDrive,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
  Archive,
  Shield,
  Play,
  List,
  Activity,
} from "lucide-react";

interface BackupStatus {
  latestByType: Record<string, {
    timestamp: string;
    type: string;
    status: string;
    fileCount: number;
    archiveSize: number;
    duration: number;
    warnings: string[];
    errors: string[];
  }>;
  totalBackups: number;
  backupFiles: { name: string; size: number; modified: string }[];
  manifests: string[];
  missingWarnings: string[];
  activeBuildPriority: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr.replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6"));
  if (isNaN(date.getTime())) return dateStr;
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

export default function AdminBackupsPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<BackupStatus | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [manifests, setManifests] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "manifests" | "logs">("overview");

  const isAdmin = (user as any)?.tier === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    fetchStatus();
  }, [isAdmin]);

  async function fetchStatus() {
    setLoading(true);
    try {
      const [statusRes, historyRes, manifestRes, logsRes] = await Promise.all([
        adminFetch("/api/admin/backups/status"),
        adminFetch("/api/admin/backups/history"),
        adminFetch("/api/admin/backups/manifests"),
        adminFetch("/api/admin/backups/logs"),
      ]);

      if (statusRes.ok) setStatus(await statusRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
      if (manifestRes.ok) setManifests(await manifestRes.json());
      if (logsRes.ok) setLogs(await logsRes.json());
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function runBackup(type: string) {
    setRunning(type);
    setRunOutput(null);
    try {
      const res = await adminFetch("/api/admin/backups/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setRunOutput(data.output || data.error || "Complete");
      fetchStatus();
    } catch (e: any) {
      setRunOutput(`Error: ${e.message}`);
    } finally {
      setRunning(null);
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">Admin Access Required</h2>
            <p className="text-muted-foreground mb-4">You need admin privileges to access the backup dashboard.</p>
            <Button onClick={() => setLocation("/admin")} data-testid="button-go-admin">Go to Admin</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const backupTypes = [
    { key: "full", label: "Full Backup", icon: Archive, description: "Complete project archive" },
    { key: "code", label: "Code Backup", icon: FileText, description: "Source code manifest" },
    { key: "db", label: "Database Backup", icon: Database, description: "Schema, migrations, row counts" },
    { key: "assets", label: "Assets Backup", icon: HardDrive, description: "Asset catalog and index" },
    { key: "content", label: "Content Backup", icon: FileText, description: "Content items and translations" },
  ];

  return (
    <>
      <SEO title="Backup Dashboard | Admin" description="Backup and disaster recovery management" />
      <Navigation />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-backup-title">Backup & Recovery Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage backups, exports, and disaster recovery</p>
              {status?.activeBuildPriority && (
                <Badge variant="outline" className="mt-2" data-testid="badge-build-priority">
                  ACTIVE_BUILD_PRIORITY = {status.activeBuildPriority}
                </Badge>
              )}
            </div>
            <Button onClick={fetchStatus} variant="outline" size="sm" data-testid="button-refresh-status">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
          </div>

          {status?.missingWarnings && status.missingWarnings.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6" data-testid="alert-missing-backups">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-medium mb-2">
                <AlertTriangle className="w-5 h-5" />
                Missing Backups
              </div>
              <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                {status.missingWarnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { key: "overview", label: "Overview", icon: Activity },
              { key: "history", label: "History", icon: Clock },
              { key: "manifests", label: "Manifests", icon: List },
              { key: "logs", label: "Logs", icon: FileText },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(key as any)}
                data-testid={`tab-${key}`}
              >
                <Icon className="w-4 h-4 mr-1" /> {label}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground" data-testid="text-loading">Loading backup status...</div>
          ) : activeTab === "overview" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {backupTypes.map(({ key, label, icon: Icon, description }) => {
                  const latest = status?.latestByType[key];
                  return (
                    <Card key={key} data-testid={`card-backup-${key}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className="w-5 h-5" />
                          {label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{description}</p>
                        {latest ? (
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1.5">
                              {latest.status === "success" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              <span>{latest.status === "success" ? "Last backup succeeded" : "Last backup failed"}</span>
                            </div>
                            <div className="text-muted-foreground">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimeAgo(latest.timestamp)}
                            </div>
                            <div className="text-muted-foreground">
                              {latest.fileCount} files
                              {latest.archiveSize > 0 && ` | ${formatBytes(latest.archiveSize)}`}
                              {latest.duration > 0 && ` | ${formatDuration(latest.duration)}`}
                            </div>
                            {latest.warnings?.length > 0 && (
                              <div className="text-amber-600 text-xs">{latest.warnings.length} warnings</div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">No backup recorded</div>
                        )}
                        <Button
                          size="sm"
                          className="mt-3 w-full"
                          disabled={running !== null}
                          onClick={() => runBackup(key)}
                          data-testid={`button-run-${key}`}
                        >
                          {running === key ? (
                            <><RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Running...</>
                          ) : (
                            <><Play className="w-3 h-3 mr-1" /> Run Backup</>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}

                <Card data-testid="card-backup-actions">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5" />
                      Recovery Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      disabled={running !== null}
                      onClick={() => runBackup("deployment-export")}
                      data-testid="button-run-deployment-export"
                    >
                      <Download className="w-3 h-3 mr-1" /> Deployment Export
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      disabled={running !== null}
                      onClick={() => runBackup("restore-validate")}
                      data-testid="button-run-restore-validate"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Restore Validation
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      disabled={running !== null}
                      onClick={() => runBackup("restore-dry-run")}
                      data-testid="button-run-restore-dry-run"
                    >
                      <Shield className="w-3 h-3 mr-1" /> Restore Dry Run
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      disabled={running !== null}
                      onClick={() => runBackup("manifests")}
                      data-testid="button-run-manifests"
                    >
                      <List className="w-3 h-3 mr-1" /> Generate Manifests
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      disabled={running !== null}
                      onClick={() => runBackup("inventory")}
                      data-testid="button-run-inventory"
                    >
                      <FileText className="w-3 h-3 mr-1" /> Critical File Inventory
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {runOutput && (
                <Card className="mb-6" data-testid="card-run-output">
                  <CardHeader>
                    <CardTitle className="text-sm">Latest Run Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-60 whitespace-pre-wrap">{runOutput}</pre>
                  </CardContent>
                </Card>
              )}

              {status?.backupFiles && status.backupFiles.length > 0 && (
                <Card data-testid="card-backup-files">
                  <CardHeader>
                    <CardTitle>Backup Archives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {status.backupFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <span className="font-mono">{f.name}</span>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <span>{formatBytes(f.size)}</span>
                            <span>{new Date(f.modified).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : activeTab === "history" ? (
            <Card data-testid="card-backup-history">
              <CardHeader>
                <CardTitle>Backup History</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No backup history yet. Run a backup to get started.</p>
                ) : (
                  <div className="space-y-2">
                    {history.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                        <div className="flex items-center gap-3">
                          {entry.status === "success" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <Badge variant="outline">{entry.type}</Badge>
                          <span className="text-muted-foreground">{entry.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span>{entry.fileCount} files</span>
                          {entry.archiveSize > 0 && <span>{formatBytes(entry.archiveSize)}</span>}
                          <span>{formatDuration(entry.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : activeTab === "manifests" ? (
            <Card data-testid="card-manifests">
              <CardHeader>
                <CardTitle>Generated Manifests</CardTitle>
              </CardHeader>
              <CardContent>
                {manifests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-3">No manifests generated yet.</p>
                    <Button size="sm" onClick={() => runBackup("manifests")} disabled={running !== null} data-testid="button-generate-manifests-empty">
                      Generate Manifests
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {manifests.map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                        <span className="font-mono">{m.name}</span>
                        <div className="text-muted-foreground">
                          {m.summary && <span className="mr-3">{m.summary}</span>}
                          <span>{m.keys} keys</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card data-testid="card-logs">
              <CardHeader>
                <CardTitle>Backup Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No backup logs available.</p>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log, i) => (
                      <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {log.status === "success" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <Badge variant="outline">{log.type}</Badge>
                          </div>
                          <span className="text-muted-foreground">{log.timestamp}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {log.fileCount} files | {formatDuration(log.duration)}
                          {log.warnings?.length > 0 && ` | ${log.warnings.length} warnings`}
                          {log.errors?.length > 0 && ` | ${log.errors.length} errors`}
                        </div>
                        {log.errors?.length > 0 && (
                          <div className="mt-1 text-red-600 text-xs">
                            {log.errors.slice(0, 3).join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
