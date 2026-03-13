import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, AlertOctagon, Filter, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AuditLesson {
  id: string;
  title: string;
  slug: string;
  tier: string;
  status: string;
  category: string;
  bodySystem: string;
  hasSummary: boolean;
  hasTitle: boolean;
  hasSlug: boolean;
  contentLength: number;
  blockCount: number;
  completeness: string;
  updatedAt: string;
  publishedAt: string;
}

interface TierSummary {
  tier: string;
  total: number;
  complete: number;
  partial: number;
  empty: number;
  broken: number;
  placeholder: number;
}

interface TierMessagingCheck {
  component: string;
  status: "pass" | "fail" | "warn";
  detail: string;
}

interface TierMessagingAudit {
  tier: string;
  checks: TierMessagingCheck[];
  overall: "pass" | "fail" | "warn";
}

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  rpn: "RPN",
  rn: "RN",
  np: "NP",
};

const TIER_EXAM_LABELS: Record<string, string> = {
  rpn: "REx-PN",
  rn: "NCLEX-RN",
  np: "NP Board Prep",
};

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  complete: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  partial: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  empty: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  broken: { icon: AlertOctagon, color: "text-red-800", bg: "bg-red-100" },
  placeholder: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
};

const OVERALL_ICON: Record<string, typeof CheckCircle> = {
  pass: CheckCircle,
  fail: XCircle,
  warn: AlertTriangle,
};

const OVERALL_COLOR: Record<string, string> = {
  pass: "text-emerald-500",
  fail: "text-red-500",
  warn: "text-amber-500",
};

export default function AdminContentAudit() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<TierSummary[]>([]);
  const [lessons, setLessons] = useState<AuditLesson[]>([]);
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messagingAudit, setMessagingAudit] = useState<TierMessagingAudit[]>([]);
  const [remediating, setRemediating] = useState(false);
  const [remediationResult, setRemediationResult] = useState<{ repaired: number; alreadyOk: number; totalNpLessons: number } | null>(null);

  const runRemediation = async () => {
    setRemediating(true);
    try {
      const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
      const res = await fetch("/api/admin/remediate-np-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": creds.username || "",
          "x-admin-password": creds.password || "",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setRemediationResult(data);
        fetchAudit();
      }
    } catch {
    } finally {
      setRemediating(false);
    }
  };

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
      const headers = {
        "x-admin-username": creds.username || "",
        "x-admin-password": creds.password || "",
      };
      const [auditRes, messagingRes] = await Promise.all([
        fetch("/api/admin/content-audit", { headers }),
        fetch("/api/admin/tier-messaging-audit", { headers }),
      ]);
      if (auditRes.ok) {
        const data = await auditRes.json();
        setSummary(data.summary || []);
        setLessons(data.lessons || []);
      }
      if (messagingRes.ok) {
        const msgData = await messagingRes.json();
        setMessagingAudit(msgData.tiers || []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAudit(); }, []);

  const filteredLessons = lessons.filter(l => {
    if (tierFilter !== "all" && l.tier !== tierFilter) return false;
    if (statusFilter !== "all" && l.completeness !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return l.title?.toLowerCase().includes(q) || l.slug?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")} data-testid="button-back-admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-audit-title">Content Audit Panel</h1>
            <p className="text-sm text-gray-500">Lesson completeness by tier with status badges and quick filters</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAudit} disabled={loading} data-testid="button-refresh-audit">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summary.map(s => {
            const pct = s.total > 0 ? Math.round((s.complete / s.total) * 100) : 0;
            return (
              <Card key={s.tier} className="border-none shadow-sm" data-testid={`summary-card-${s.tier}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span>{TIER_LABELS[s.tier] || s.tier}</span>
                    {TIER_EXAM_LABELS[s.tier] && (
                      <Badge variant="secondary" className="text-[10px]">{TIER_EXAM_LABELS[s.tier]}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{s.total}</div>
                  <div className="text-sm text-gray-500 mb-3">Total Lessons</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-gray-600">Complete: {s.complete}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-gray-600">Partial: {s.partial}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-gray-600">Empty: {s.empty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-800" />
                      <span className="text-gray-600">Broken: {s.broken}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-none shadow-sm mb-8" data-testid="tier-messaging-audit">
          <CardHeader>
            <CardTitle className="text-base">Tier Landing Page Messaging Audit</CardTitle>
          </CardHeader>
          <CardContent>
            {messagingAudit.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-sm">Loading messaging audit...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {messagingAudit.map(audit => {
                  const OverallIcon = OVERALL_ICON[audit.overall] || CheckCircle;
                  const overallColor = OVERALL_COLOR[audit.overall] || "text-gray-500";
                  return (
                    <div key={audit.tier} className="p-4 rounded-xl bg-gray-50 border border-gray-100" data-testid={`messaging-audit-${audit.tier}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <OverallIcon className={`w-4 h-4 ${overallColor}`} />
                        <span className="text-sm font-semibold">{TIER_LABELS[audit.tier] || audit.tier}</span>
                        <Badge variant={audit.overall === "pass" ? "secondary" : "destructive"} className="text-[10px] ml-auto">
                          {audit.overall.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        Expected exam label: <span className="font-medium">{TIER_EXAM_LABELS[audit.tier]}</span>
                      </p>
                      <div className="space-y-1.5">
                        {audit.checks.map((check, idx) => {
                          const CheckIcon = check.status === "pass" ? CheckCircle : check.status === "fail" ? XCircle : AlertTriangle;
                          const checkColor = check.status === "pass" ? "text-emerald-500" : check.status === "fail" ? "text-red-500" : "text-amber-500";
                          return (
                            <div key={idx} className="flex items-start gap-1.5">
                              <CheckIcon className={`w-3 h-3 mt-0.5 shrink-0 ${checkColor}`} />
                              <div>
                                <span className="text-[11px] font-medium text-gray-700">{check.component}</span>
                                <span className="text-[10px] text-gray-500 block">{check.detail}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm mb-8" data-testid="np-remediation-card">
          <CardHeader>
            <CardTitle className="text-base">NP Content Remediation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Scan NP tier lessons in the database and repair any that have incomplete, broken, or placeholder content.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={runRemediation}
                disabled={remediating}
                data-testid="button-remediate-np"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${remediating ? "animate-spin" : ""}`} />
                {remediating ? "Remediating..." : "Run NP Remediation"}
              </Button>
              {remediationResult && (
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{remediationResult.totalNpLessons}</span> NP lessons scanned,{" "}
                  <span className="font-medium text-emerald-600">{remediationResult.repaired}</span> repaired,{" "}
                  <span className="font-medium">{remediationResult.alreadyOk}</span> already OK
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CardTitle className="text-base flex-1">Lesson Details ({filteredLessons.length})</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Filter className="w-4 h-4 text-gray-400" />
                </div>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-28 h-8 text-xs" data-testid="select-tier-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="rpn">RPN</SelectItem>
                    <SelectItem value="rn">RN</SelectItem>
                    <SelectItem value="np">NP</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 h-8 text-xs" data-testid="select-status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="empty">Empty</SelectItem>
                    <SelectItem value="broken">Broken</SelectItem>
                    <SelectItem value="placeholder">Placeholder</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-48 h-8 text-xs"
                  data-testid="input-search-lessons"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading audit data...</div>
            ) : filteredLessons.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No lessons match current filters</div>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b">
                  <div className="col-span-4">Title</div>
                  <div className="col-span-1">Tier</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Blocks</div>
                  <div className="col-span-1">Length</div>
                  <div className="col-span-2">Updated</div>
                  <div className="col-span-1">Action</div>
                </div>
                {filteredLessons.map(l => {
                  const cfg = STATUS_CONFIG[l.completeness] || STATUS_CONFIG.empty;
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={l.id} className="grid grid-cols-12 gap-2 px-3 py-2 items-center hover:bg-gray-50 rounded-lg transition-colors" data-testid={`audit-row-${l.id}`}>
                      <div className="col-span-4 truncate text-sm font-medium text-gray-800">{l.title}</div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-[10px]">{TIER_LABELS[l.tier] || l.tier}</Badge>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.bg} ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {l.completeness}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs text-gray-500">{l.blockCount}</div>
                      <div className="col-span-1 text-xs text-gray-500">{l.contentLength > 1000 ? `${Math.round(l.contentLength / 1000)}k` : l.contentLength}</div>
                      <div className="col-span-2 text-xs text-gray-400">{l.updatedAt ? new Date(l.updatedAt).toLocaleDateString() : "-"}</div>
                      <div className="col-span-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setLocation(`/admin/content-manager?edit=${l.id}`)}
                          data-testid={`button-edit-${l.id}`}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
