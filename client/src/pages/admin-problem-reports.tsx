import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { adminFetch } from "@/lib/admin-fetch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bug, Filter, RefreshCw, ExternalLink, X, Save,
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle2,
  Clock, XCircle, Eye, Image as ImageIcon,
} from "lucide-react";

const PROBLEM_TYPE_LABELS: Record<string, string> = {
  incorrect_info: "Incorrect information",
  question_error: "Question error",
  explanation_unclear: "Explanation unclear",
  broken_link: "Broken link",
  translation_issue: "Translation issue",
  technical_problem: "Technical problem",
  typo_grammar: "Typo or grammar mistake",
  other: "Other",
  broken_link_legacy: "Broken link / 404",
  empty_lesson: "Empty lesson / missing content",
  wrong_answer: "Wrong answer / rationale issue",
  typo: "Typo / grammar",
  layout: "Page layout problem",
  exam_wont_start: "Exam won't start",
  flashcards_broken: "Flashcards missing / broken",
  payment: "Payment / subscription issue",
  translation: "Translation issue",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: AlertTriangle },
  in_review: { label: "In Review", color: "bg-yellow-100 text-yellow-700", icon: Eye },
  fixed: { label: "Fixed", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  dismissed: { label: "Dismissed", color: "bg-gray-100 text-gray-600", icon: XCircle },
};

const SEVERITY_CONFIG: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-gray-100 text-gray-600" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
  high: { label: "High", color: "bg-red-100 text-red-700" },
};

function formatDate(d: string | null) {
  if (!d) return "—";
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

export default function AdminProblemReportsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSection, setFilterSection] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  async function fetchReports() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType !== "all") params.set("problemType", filterType);
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (filterSection !== "all") params.set("siteSection", filterSection);
      if (filterTier !== "all") params.set("tier", filterTier);
      if (filterStartDate) params.set("startDate", filterStartDate);
      if (filterEndDate) params.set("endDate", filterEndDate);
      const res = await adminFetch(`/api/admin/problem-reports?${params.toString()}`);
      if (res.ok) {
        setReports(await res.json());
      }
    } catch {
      toast({ title: "Failed to load reports", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, [filterType, filterStatus, filterSection, filterTier, filterStartDate, filterEndDate]);

  async function updateStatus(id: string, status: string) {
    setSavingId(id);
    try {
      const res = await adminFetch(`/api/admin/problem-reports/${id}`, {
        method: "PATCH",
        body: { status },
      });
      if (res.ok) {
        const updated = await res.json();
        setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
        if (selectedReport?.id === id) setSelectedReport(updated);
        toast({ title: `Status updated to ${STATUS_CONFIG[status]?.label || status}` });
      }
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  }

  async function saveNotes(id: string) {
    setSavingId(id);
    try {
      const res = await adminFetch(`/api/admin/problem-reports/${id}`, {
        method: "PATCH",
        body: { adminNotes: editingNotes },
      });
      if (res.ok) {
        const updated = await res.json();
        setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
        setSelectedReport(updated);
        toast({ title: "Notes saved" });
      }
    } catch {
      toast({ title: "Failed to save notes", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  }

  const statusCounts = reports.reduce((acc: Record<string, number>, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <SEO title="Problem Reports | Admin" />
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-4 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bug className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Problem Reports</h1>
              <Badge variant="secondary" data-testid="text-report-count">{reports.length}</Badge>
            </div>
            <Button onClick={fetchReports} variant="outline" size="sm" data-testid="button-refresh-reports">
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(filterStatus === key ? "all" : key)} data-testid={`card-status-${key}`}>
                  <CardContent className="p-3 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <div>
                      <div className="text-lg font-bold">{statusCounts[key] || 0}</div>
                      <div className="text-xs text-muted-foreground">{cfg.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-3 mb-4 flex-wrap">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-52" data-testid="select-filter-type">
                <Filter className="w-3.5 h-3.5 mr-1" />
                <SelectValue placeholder="Problem type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(PROBLEM_TYPE_LABELS).map(([val, label]) => (
                  <SelectItem key={val} value={val}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40" data-testid="select-filter-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                  <SelectItem key={val} value={val}>{cfg.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterSection} onValueChange={setFilterSection}>
              <SelectTrigger className="w-44" data-testid="select-filter-section">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="exam_prep">Exam Prep</SelectItem>
                <SelectItem value="new_grad">New Grad</SelectItem>
                <SelectItem value="career_tools">Career Tools</SelectItem>
                <SelectItem value="allied_health">Allied Health</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-36" data-testid="select-filter-tier">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="rpn">RPN</SelectItem>
                <SelectItem value="rn">RN</SelectItem>
                <SelectItem value="np">NP</SelectItem>
                <SelectItem value="allied">Allied</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="w-40"
              placeholder="Start date"
              data-testid="input-filter-start-date"
            />
            <Input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="w-40"
              placeholder="End date"
              data-testid="input-filter-end-date"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className={`${selectedReport ? "lg:col-span-2" : "lg:col-span-3"} space-y-2`}>
              {loading ? (
                <Card><CardContent className="p-8 text-center text-muted-foreground">Loading reports...</CardContent></Card>
              ) : reports.length === 0 ? (
                <Card><CardContent className="p-8 text-center text-muted-foreground" data-testid="text-no-reports">No problem reports found</CardContent></Card>
              ) : (
                reports.map((report) => {
                  const statusCfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.new;
                  const severityCfg = SEVERITY_CONFIG[report.severity] || SEVERITY_CONFIG.medium;
                  const isSelected = selectedReport?.id === report.id;
                  return (
                    <Card
                      key={report.id}
                      className={`cursor-pointer hover:shadow-md transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}
                      onClick={() => {
                        setSelectedReport(report);
                        setEditingNotes(report.adminNotes || "");
                      }}
                      data-testid={`card-report-${report.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <Badge className={statusCfg.color} data-testid={`badge-status-${report.id}`}>{statusCfg.label}</Badge>
                              <Badge variant="outline">{PROBLEM_TYPE_LABELS[report.problemType] || report.problemType}</Badge>
                              <Badge className={severityCfg.color}>{severityCfg.label}</Badge>
                              {report.screenshotUrl && (
                                <Badge variant="outline" className="gap-1">
                                  <ImageIcon className="w-3 h-3" />
                                  Screenshot
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 mt-1" data-testid={`text-description-${report.id}`}>{report.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span>{formatDate(report.createdAt)}</span>
                              <span className="truncate max-w-[200px]">{report.pageUrl}</span>
                              {report.siteSection && <span>{report.siteSection}</span>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {selectedReport && (
              <div className="lg:col-span-1">
                <Card className="sticky top-4" data-testid="panel-report-detail">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Report Details</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)} data-testid="button-close-detail">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Status</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                          <Button
                            key={key}
                            size="sm"
                            variant={selectedReport.status === key ? "default" : "outline"}
                            className="text-xs h-7"
                            onClick={() => updateStatus(selectedReport.id, key)}
                            disabled={savingId === selectedReport.id}
                            data-testid={`button-set-status-${key}`}
                          >
                            {cfg.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-muted-foreground">Problem Type</span>
                      <p>{PROBLEM_TYPE_LABELS[selectedReport.problemType] || selectedReport.problemType}</p>
                    </div>

                    <div>
                      <span className="font-medium text-muted-foreground">Description</span>
                      <p className="whitespace-pre-wrap">{selectedReport.description}</p>
                    </div>

                    {selectedReport.screenshotUrl && (
                      <div>
                        <span className="font-medium text-muted-foreground">Screenshot</span>
                        <a
                          href={`/api/object-storage${selectedReport.screenshotUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-1"
                          data-testid="link-screenshot"
                        >
                          <img
                            src={`/api/object-storage${selectedReport.screenshotUrl}`}
                            alt="Report screenshot"
                            className="max-w-full max-h-48 rounded border cursor-pointer hover:opacity-80 transition-opacity"
                            data-testid="img-report-screenshot"
                          />
                        </a>
                      </div>
                    )}

                    <div>
                      <span className="font-medium text-muted-foreground">Page URL</span>
                      <a
                        href={selectedReport.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 break-all"
                        data-testid="link-page-url"
                      >
                        {selectedReport.pageUrl}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>

                    {selectedReport.pageTitle && (
                      <div>
                        <span className="font-medium text-muted-foreground">Page Title</span>
                        <p>{selectedReport.pageTitle}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      {selectedReport.siteSection && (
                        <div>
                          <span className="font-medium text-muted-foreground">Section</span>
                          <p>{selectedReport.siteSection}</p>
                        </div>
                      )}
                      {selectedReport.contentId && (
                        <div>
                          <span className="font-medium text-muted-foreground">Content ID</span>
                          <p className="truncate">{selectedReport.contentId}</p>
                        </div>
                      )}
                      {selectedReport.severity && (
                        <div>
                          <span className="font-medium text-muted-foreground">Severity</span>
                          <Badge className={SEVERITY_CONFIG[selectedReport.severity]?.color}>{SEVERITY_CONFIG[selectedReport.severity]?.label || selectedReport.severity}</Badge>
                        </div>
                      )}
                      {selectedReport.deviceType && (
                        <div>
                          <span className="font-medium text-muted-foreground">Device</span>
                          <p>{selectedReport.deviceType}</p>
                        </div>
                      )}
                    </div>

                    {selectedReport.email && (
                      <div>
                        <span className="font-medium text-muted-foreground">Email</span>
                        <p>{selectedReport.email}</p>
                        {selectedReport.contactPermission && <Badge variant="outline" className="mt-1 text-xs">Can contact</Badge>}
                      </div>
                    )}

                    {selectedReport.userId && (
                      <div>
                        <span className="font-medium text-muted-foreground">User ID</span>
                        <p className="truncate">{selectedReport.userId}</p>
                      </div>
                    )}

                    {selectedReport.locale && (
                      <div>
                        <span className="font-medium text-muted-foreground">Locale</span>
                        <p>{selectedReport.locale}</p>
                      </div>
                    )}

                    <div>
                      <span className="font-medium text-muted-foreground">Submitted</span>
                      <p>{new Date(selectedReport.createdAt).toLocaleString()}</p>
                    </div>

                    <div>
                      <span className="font-medium text-muted-foreground">Admin Notes</span>
                      <Textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add internal notes..."
                        rows={3}
                        className="mt-1"
                        data-testid="input-admin-notes"
                      />
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => saveNotes(selectedReport.id)}
                        disabled={savingId === selectedReport.id}
                        data-testid="button-save-notes"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
