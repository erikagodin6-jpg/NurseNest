import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Play, CheckCircle, XCircle, Clock, AlertTriangle,
  Loader2, BarChart3, Database, FileText, Power, Plus, Settings,
  Zap, Search, Image, Calendar, Mail, TrendingUp, BookOpen,
  Share2, Expand, Eye, Trash2, RefreshCw, PauseCircle
} from "lucide-react";
import { Link } from "wouter";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    queued: "bg-yellow-100 text-yellow-800",
    running: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
    draft: "bg-gray-100 text-gray-800",
    pending_review: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    published: "bg-emerald-100 text-emerald-800",
    rejected: "bg-red-100 text-red-800",
    active: "bg-green-100 text-green-800",
    paused: "bg-orange-100 text-orange-800",
  };
  return (
    <Badge className={colors[status] || "bg-gray-100 text-gray-800"} data-testid={`badge-status-${status}`}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

function OverviewTab() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/stats"],
    queryFn: () => adminFetch("/api/admin/autopilot/stats").then(r => r.json()),
    refetchInterval: 30000,
  });

  const { data: engines } = useQuery({
    queryKey: ["/api/admin/autopilot/engines"],
    queryFn: () => adminFetch("/api/admin/autopilot/engines").then(r => r.json()),
  });

  const { data: recentJobs } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "recent"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?limit=5").then(r => r.json()),
  });

  if (isLoading) return <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading overview...</div>;

  const engineList = Array.isArray(engines) ? engines : engines?.engines || [];
  const jobList = Array.isArray(recentJobs) ? recentJobs : recentJobs?.jobs || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="stat-total-engines">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{stats?.totalEngines || engineList.length || 0}</div>
            <div className="text-xs text-gray-500">Total Engines</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-active-engines">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats?.activeEngines || engineList.filter((e: any) => e.enabled).length || 0}</div>
            <div className="text-xs text-gray-500">Active Engines</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-total-jobs">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{stats?.totalJobs || 0}</div>
            <div className="text-xs text-gray-500">Total Jobs</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-queue-size">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.queueSize || 0}</div>
            <div className="text-xs text-gray-500">In Queue</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engineList.map((engine: any) => (
          <Card key={engine.engineKey || engine.id} data-testid={`card-engine-${engine.engineKey}`}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{engine.name || engine.engineKey}</h3>
                <Badge variant={engine.enabled ? "default" : "outline"} className={engine.enabled ? "bg-green-100 text-green-800" : ""}>
                  {engine.enabled ? "On" : "Off"}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mb-2">{engine.description || "No description"}</p>
              {engine.lastRunAt && (
                <p className="text-xs text-gray-400">
                  <Clock className="inline h-3 w-3 mr-1" />
                  Last run: {new Date(engine.lastRunAt).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {jobList.length > 0 && (
        <Card data-testid="card-recent-jobs">
          <CardHeader>
            <CardTitle className="text-lg">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {jobList.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between py-2 border-b last:border-0" data-testid={`row-job-${job.id}`}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{job.engineKey}</Badge>
                    <StatusBadge status={job.status} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {job.createdAt ? new Date(job.createdAt).toLocaleString() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SchedulesTab() {
  const queryClient = useQueryClient();
  const [newEngineKey, setNewEngineKey] = useState("");
  const [newFrequency, setNewFrequency] = useState("daily");
  const [newCron, setNewCron] = useState("0 6 * * *");

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/schedules"],
    queryFn: () => adminFetch("/api/admin/autopilot/schedules").then(r => r.json()),
  });

  const { data: engines } = useQuery({
    queryKey: ["/api/admin/autopilot/engines"],
    queryFn: () => adminFetch("/api/admin/autopilot/engines").then(r => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/schedules", {
        method: "POST",
        body: { engineKey: newEngineKey, frequency: newFrequency, cronExpression: newCron, enabled: true },
      });
      if (!res.ok) throw new Error("Failed to create schedule");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/schedules"] });
      setNewEngineKey("");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/autopilot/schedules/${id}/toggle`, { method: "POST" });
      if (!res.ok) throw new Error("Toggle failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/schedules"] }),
  });

  const scheduleList = Array.isArray(schedules) ? schedules : schedules?.schedules || [];
  const engineList = Array.isArray(engines) ? engines : engines?.engines || [];

  return (
    <div className="space-y-6">
      <Card data-testid="card-create-schedule">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="h-5 w-5" /> Create Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <Label className="text-sm mb-1 block">Engine</Label>
              <Select value={newEngineKey} onValueChange={setNewEngineKey} data-testid="select-schedule-engine">
                <SelectTrigger className="w-48" data-testid="select-schedule-engine-trigger">
                  <SelectValue placeholder="Select engine" />
                </SelectTrigger>
                <SelectContent>
                  {engineList.map((e: any) => (
                    <SelectItem key={e.engineKey} value={e.engineKey}>{e.name || e.engineKey}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Frequency</Label>
              <Select value={newFrequency} onValueChange={setNewFrequency} data-testid="select-schedule-frequency">
                <SelectTrigger className="w-36" data-testid="select-schedule-frequency-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Cron Expression</Label>
              <Input
                value={newCron}
                onChange={(e) => setNewCron(e.target.value)}
                className="w-40"
                placeholder="0 6 * * *"
                data-testid="input-schedule-cron"
              />
            </div>
            <Button
              onClick={() => createMutation.mutate()}
              disabled={!newEngineKey || createMutation.isPending}
              data-testid="button-create-schedule"
            >
              {createMutation.isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading schedules...</div>
      ) : scheduleList.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">No schedules configured</p>
      ) : (
        <div className="space-y-2">
          {scheduleList.map((sched: any) => (
            <Card key={sched.id} data-testid={`card-schedule-${sched.id}`}>
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{sched.engineKey}</Badge>
                    <span className="text-sm">{sched.frequency}</span>
                    <span className="text-xs text-gray-400 font-mono">{sched.cronExpression}</span>
                    <StatusBadge status={sched.enabled ? "active" : "paused"} />
                  </div>
                  <div className="flex items-center gap-2">
                    {sched.nextRunAt && (
                      <span className="text-xs text-gray-400">
                        Next: {new Date(sched.nextRunAt).toLocaleString()}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleMutation.mutate(sched.id)}
                      data-testid={`button-toggle-schedule-${sched.id}`}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PublishingQueueTab() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("pending_review");

  const { data: queue, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/queue", statusFilter],
    queryFn: () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      return adminFetch(`/api/admin/autopilot/queue?${params}`).then(r => r.json());
    },
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: string }) => {
      const res = await adminFetch(`/api/admin/autopilot/queue/${id}/${action}`, { method: "POST" });
      if (!res.ok) throw new Error(`${action} failed`);
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/queue"] }),
  });

  const items = Array.isArray(queue) ? queue : queue?.items || [];

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter} data-testid="select-queue-status">
          <SelectTrigger className="w-44" data-testid="select-queue-status-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-auto">{items.length} items</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading queue...</div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">No items in queue</p>
      ) : (
        <div className="space-y-2">
          {items.map((item: any) => (
            <Card key={item.id} data-testid={`card-queue-${item.id}`}>
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.contentType}</Badge>
                      <Badge variant="outline">{item.engineKey}</Badge>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-sm font-medium truncate">{item.title || "Untitled"}</p>
                    <p className="text-xs text-gray-400">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {item.previewUrl && (
                      <Button size="sm" variant="ghost" asChild data-testid={`button-preview-${item.id}`}>
                        <a href={item.previewUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {(item.status === "pending_review" || item.status === "draft") && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600"
                          onClick={() => actionMutation.mutate({ id: item.id, action: "approve" })}
                          disabled={actionMutation.isPending}
                          data-testid={`button-approve-queue-${item.id}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => actionMutation.mutate({ id: item.id, action: "reject" })}
                          disabled={actionMutation.isPending}
                          data-testid={`button-reject-queue-${item.id}`}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {item.status === "approved" && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => actionMutation.mutate({ id: item.id, action: "publish" })}
                        disabled={actionMutation.isPending}
                        data-testid={`button-publish-queue-${item.id}`}
                      >
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function KeywordDiscoveryTab() {
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchKeywords = async () => {
    setIsSearching(true);
    try {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "keyword_discovery",
          payload: { keywords: keywords.split("\n").filter(k => k.trim()) },
        },
      });
      const data = await res.json();
      setResults(data?.result?.clusters || []);
    } catch {
      setResults([]);
    }
    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <Card data-testid="card-keyword-input">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" /> Keyword Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-1 block">Enter keywords (one per line)</Label>
            <Textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={"NCLEX practice questions\nnursing exam prep\nRPN study guide"}
              rows={5}
              data-testid="textarea-keywords"
            />
          </div>
          <Button
            onClick={searchKeywords}
            disabled={isSearching || !keywords.trim()}
            data-testid="button-search-keywords"
          >
            {isSearching ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Analyzing...</> : <><Search className="mr-2 h-4 w-4" /> Analyze Keywords</>}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card data-testid="card-keyword-results">
          <CardHeader>
            <CardTitle className="text-lg">Keyword Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((cluster: any, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg" data-testid={`row-cluster-${i}`}>
                  <h4 className="font-medium text-sm">{cluster.topic || cluster.keyword}</h4>
                  <p className="text-xs text-gray-500">Volume: {cluster.volume || "N/A"} | Difficulty: {cluster.difficulty || "N/A"}</p>
                  {cluster.related && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cluster.related.map((r: string, j: number) => (
                        <Badge key={j} variant="outline" className="text-xs">{r}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BlogEngineTab() {
  const queryClient = useQueryClient();
  const [contentType, setContentType] = useState<"nursing" | "allied_health" | "new_grad">("nursing");
  const [topic, setTopic] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [examType, setExamType] = useState("nclex-rn");
  const [career, setCareer] = useState("pharmacy_tech");
  const [wordCount, setWordCount] = useState("2000");

  const generateMutation = useMutation({
    mutationFn: async () => {
      const payload: any = {
        topic,
        targetKeyword,
        wordCount: parseInt(wordCount),
      };
      if (contentType === "allied_health") {
        payload.contentType = "allied_health";
        payload.career = career;
      } else if (contentType === "new_grad") {
        payload.contentType = "new_grad";
      } else {
        payload.examType = examType;
      }
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "blog_engine",
          payload,
        },
      });
      if (!res.ok) throw new Error("Page generation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/queue"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
      setTopic("");
      setTargetKeyword("");
    },
  });

  const { data: blogJobs } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "blog_engine"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?engineKey=blog_engine&limit=10").then(r => r.json()),
    refetchInterval: generateMutation.isPending ? 5000 : 30000,
  });

  const recentRuns = Array.isArray(blogJobs) ? blogJobs : blogJobs?.jobs || [];

  const isNursing = contentType === "nursing";
  const isAllied = contentType === "allied_health";
  const isNewGrad = contentType === "new_grad";

  const descriptions: Record<string, string> = {
    nursing: "Generates 1500-2500 word nursing study pages with clinical assessment, nursing interventions, tables, exam traps, clinical pearls, 10+ practice questions with rationales, and SEO metadata.",
    allied_health: "Generates 1500-2200 word allied health study pages with role scope, clinical workflows, safety considerations, exam traps, clinical pearls, 10+ practice questions with rationales, and SEO metadata.",
    new_grad: "Generates 1200-2000 word new graduate nurse resources with step-by-step guidance, common mistakes, clinical tips from experienced nurses, quick reference checklists, and SEO metadata.",
  };

  const placeholders: Record<string, { topic: string; keyword: string }> = {
    nursing: { topic: "e.g., Understanding Cardiac Assessment", keyword: "e.g., cardiac assessment nursing" },
    allied_health: { topic: "e.g., Order of Draw for Blood Collection", keyword: "e.g., order of draw phlebotomy" },
    new_grad: { topic: "e.g., Time Management for New Graduate Nurses", keyword: "e.g., new nurse time management tips" },
  };

  return (
    <div className="space-y-6">
      <Card data-testid="card-blog-engine">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" /> Study Page Generator
          </CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            {descriptions[contentType]} Content is queued for review before publishing.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-1 block">Content Type</Label>
            <div className="flex gap-2">
              <Button
                variant={isNursing ? "default" : "outline"}
                size="sm"
                onClick={() => { setContentType("nursing"); setWordCount("2000"); }}
                data-testid="button-content-type-nursing"
              >
                Nursing
              </Button>
              <Button
                variant={isAllied ? "default" : "outline"}
                size="sm"
                onClick={() => { setContentType("allied_health"); setWordCount("1800"); }}
                data-testid="button-content-type-allied"
              >
                Allied Health
              </Button>
              <Button
                variant={isNewGrad ? "default" : "outline"}
                size="sm"
                onClick={() => { setContentType("new_grad"); setWordCount("1500"); }}
                data-testid="button-content-type-newgrad"
              >
                New Grad
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Page Topic</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={placeholders[contentType]?.topic}
                data-testid="input-blog-topic"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Target SEO Keyword</Label>
              <Input
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder={placeholders[contentType]?.keyword}
                data-testid="input-blog-keyword"
              />
            </div>
            {isNursing && (
              <div>
                <Label className="text-sm mb-1 block">Primary Exam</Label>
                <Select value={examType} onValueChange={setExamType} data-testid="select-blog-exam">
                  <SelectTrigger data-testid="select-blog-exam-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nclex-rn">NCLEX-RN</SelectItem>
                    <SelectItem value="nclex-pn">NCLEX-PN</SelectItem>
                    <SelectItem value="rex-pn">REx-PN</SelectItem>
                    <SelectItem value="cnpe">CNPE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {isAllied && (
              <div>
                <Label className="text-sm mb-1 block">Career / Certification</Label>
                <Select value={career} onValueChange={setCareer} data-testid="select-blog-career">
                  <SelectTrigger data-testid="select-blog-career-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pharmacy_tech">Pharmacy Technician (PTCB/ExCPT)</SelectItem>
                    <SelectItem value="respiratory_therapy">Respiratory Therapy (RRT/TMC)</SelectItem>
                    <SelectItem value="paramedic_ems">Paramedic / EMS (NREMT)</SelectItem>
                    <SelectItem value="mlt">Medical Lab Technologist (MLT/ASCP)</SelectItem>
                    <SelectItem value="radiology">Medical Imaging / Radiology (ARRT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label className="text-sm mb-1 block">Target Word Count</Label>
              <Input
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                min="1500"
                max="3000"
                data-testid="input-blog-word-count"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending || !topic.trim()}
              data-testid="button-generate-blog"
            >
              {generateMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating (30-60s)...</> : <><Play className="mr-2 h-4 w-4" /> Generate Study Page</>}
            </Button>
            {generateMutation.isSuccess && (
              <p className="text-sm text-green-600" data-testid="text-blog-success">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                {isNursing ? "Nursing" : "Allied health"} study page generated and sent to Publishing Queue for review
              </p>
            )}
            {generateMutation.isError && (
              <p className="text-sm text-red-600" data-testid="text-blog-error">
                <AlertTriangle className="inline h-4 w-4 mr-1" />
                {(generateMutation.error as Error).message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {recentRuns.length > 0 && (
        <Card data-testid="card-blog-history">
          <CardHeader>
            <CardTitle className="text-sm">Recent Page Generations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentRuns.map((run: any) => (
                <div key={run.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" data-testid={`row-blog-run-${run.id}`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={run.status} />
                    <span className="text-xs truncate max-w-[200px]">{run.payload?.topic || "Untitled"}</span>
                    {run.result?.questionCount && (
                      <Badge variant="outline" className="text-xs">{run.result.questionCount}Q</Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {run.createdAt ? new Date(run.createdAt).toLocaleString() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PracticeSEOTab() {
  const queryClient = useQueryClient();
  const [practiceTitle, setPracticeTitle] = useState("");
  const [bodySystem, setBodySystem] = useState("");
  const [questionCount, setQuestionCount] = useState("10");
  const [tier, setTier] = useState("rn");

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "practice_seo",
          payload: { title: practiceTitle, bodySystem, questionCount: parseInt(questionCount), tier },
        },
      });
      if (!res.ok) throw new Error("Practice page generation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/queue"] });
    },
  });

  return (
    <div className="space-y-6">
      <Card data-testid="card-practice-seo">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Practice Page SEO Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Page Title</Label>
              <Input
                value={practiceTitle}
                onChange={(e) => setPracticeTitle(e.target.value)}
                placeholder="e.g., Free Cardiac Practice Questions"
                data-testid="input-practice-title"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Body System</Label>
              <Select value={bodySystem} onValueChange={setBodySystem} data-testid="select-practice-system">
                <SelectTrigger data-testid="select-practice-system-trigger">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  {["Cardiovascular", "Respiratory", "Neurological", "Gastrointestinal", "Renal", "Endocrine", "Musculoskeletal", "Hematology", "Maternity", "Pediatrics"].map(s => (
                    <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Question Count</Label>
              <Input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                min="5"
                max="50"
                data-testid="input-practice-count"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Tier</Label>
              <Select value={tier} onValueChange={setTier} data-testid="select-practice-tier">
                <SelectTrigger data-testid="select-practice-tier-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rpn">RPN</SelectItem>
                  <SelectItem value="rn">RN</SelectItem>
                  <SelectItem value="np">NP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending || !practiceTitle.trim()}
            data-testid="button-generate-practice"
          >
            {generateMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating...</> : <><Play className="mr-2 h-4 w-4" /> Generate Practice Page</>}
          </Button>
          {generateMutation.isSuccess && (
            <p className="text-sm text-green-600" data-testid="text-practice-success">Practice page queued for review</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionFactoryTab() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");
  const [batchSize, setBatchSize] = useState("25");
  const [category, setCategory] = useState("nursing_ngn");
  const [difficultyRange, setDifficultyRange] = useState("2-4");
  const [autoValidate, setAutoValidate] = useState(true);

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "question_factory",
          payload: { topic, batchSize: parseInt(batchSize), category, difficultyRange, autoValidate },
        },
      });
      if (!res.ok) throw new Error("Question batch generation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/queue"] });
      setTopic("");
    },
  });

  const { data: factoryStats } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "question_factory"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?engineKey=question_factory&limit=10").then(r => r.json()),
  });

  const recentRuns = Array.isArray(factoryStats) ? factoryStats : factoryStats?.jobs || [];

  return (
    <div className="space-y-6">
      <Card data-testid="card-question-factory">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5" /> Practice Question Page Generator
          </CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Generates 25 exam-style practice questions (MC, SATA, case-based) with 300+ word rationales, clinical scenarios, and SEO metadata. Auto-validates structure before queuing for review.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-1 block">Question Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Fluid and Electrolyte Imbalances"
              data-testid="input-factory-topic"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Batch Size</Label>
              <Select value={batchSize} onValueChange={setBatchSize} data-testid="select-factory-batch">
                <SelectTrigger data-testid="select-factory-batch-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 Questions</SelectItem>
                  <SelectItem value="50">50 Questions</SelectItem>
                  <SelectItem value="100">100 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Category</Label>
              <Select value={category} onValueChange={setCategory} data-testid="select-factory-category">
                <SelectTrigger data-testid="select-factory-category-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nursing_ngn">Nursing NGN</SelectItem>
                  <SelectItem value="allied">Allied Health</SelectItem>
                  <SelectItem value="np_canada">Canadian NP</SelectItem>
                  <SelectItem value="np_us">US NP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Difficulty Range</Label>
              <Select value={difficultyRange} onValueChange={setDifficultyRange} data-testid="select-factory-difficulty">
                <SelectTrigger data-testid="select-factory-difficulty-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">Easy (1-2)</SelectItem>
                  <SelectItem value="2-4">Medium (2-4)</SelectItem>
                  <SelectItem value="3-5">Hard (3-5)</SelectItem>
                  <SelectItem value="1-5">Full Range (1-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <div>
                <Label className="text-sm mb-1 block">Auto-Validate</Label>
                <Switch
                  checked={autoValidate}
                  onCheckedChange={setAutoValidate}
                  data-testid="switch-factory-validate"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending || !topic.trim()}
              data-testid="button-generate-questions"
            >
              {generateMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating (30-60s)...</> : <><Zap className="mr-2 h-4 w-4" /> Generate Question Page</>}
            </Button>
            {generateMutation.isSuccess && (
              <p className="text-sm text-green-600" data-testid="text-factory-success">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                25 questions generated and sent to Publishing Queue
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {recentRuns.length > 0 && (
        <Card data-testid="card-factory-history">
          <CardHeader>
            <CardTitle className="text-sm">Recent Factory Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentRuns.map((run: any) => (
                <div key={run.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" data-testid={`row-factory-run-${run.id}`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={run.status} />
                    <span className="text-xs text-gray-500">{run.payload?.batchSize || "?"} questions</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {run.createdAt ? new Date(run.createdAt).toLocaleString() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function VisualFactoryTab() {
  const queryClient = useQueryClient();
  const [diagramType, setDiagramType] = useState("anatomy");
  const [diagramTopic, setDiagramTopic] = useState("");
  const [diagramStyle, setDiagramStyle] = useState("clinical");

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "visual_factory",
          payload: { type: diagramType, topic: diagramTopic, style: diagramStyle },
        },
      });
      if (!res.ok) throw new Error("Diagram generation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
    },
  });

  return (
    <div className="space-y-6">
      <Card data-testid="card-visual-factory">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Image className="h-5 w-5" /> Visual / Diagram Factory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Diagram Type</Label>
              <Select value={diagramType} onValueChange={setDiagramType} data-testid="select-diagram-type">
                <SelectTrigger data-testid="select-diagram-type-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anatomy">Anatomy</SelectItem>
                  <SelectItem value="pathophysiology">Pathophysiology</SelectItem>
                  <SelectItem value="drug_mechanism">Drug Mechanism</SelectItem>
                  <SelectItem value="lab_values">Lab Values</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Topic</Label>
              <Input
                value={diagramTopic}
                onChange={(e) => setDiagramTopic(e.target.value)}
                placeholder="e.g., Heart Anatomy"
                data-testid="input-diagram-topic"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Style</Label>
              <Select value={diagramStyle} onValueChange={setDiagramStyle} data-testid="select-diagram-style">
                <SelectTrigger data-testid="select-diagram-style-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinical">Clinical</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="infographic">Infographic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending || !diagramTopic.trim()}
            data-testid="button-generate-diagram"
          >
            {generateMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating...</> : <><Image className="mr-2 h-4 w-4" /> Generate Diagram</>}
          </Button>
          {generateMutation.isSuccess && (
            <p className="text-sm text-green-600" data-testid="text-diagram-success">Diagram generation job created</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PinterestSchedulerTab() {
  const queryClient = useQueryClient();
  const [pinTitle, setPinTitle] = useState("");
  const [pinBoard, setPinBoard] = useState("nursing-tips");
  const [scheduleDate, setScheduleDate] = useState("");

  const scheduleMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "pinterest_scheduler",
          payload: { title: pinTitle, board: pinBoard, scheduledFor: scheduleDate || undefined },
        },
      });
      if (!res.ok) throw new Error("Pin scheduling failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
      setPinTitle("");
    },
  });

  const { data: pinJobs } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "pinterest_scheduler"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?engineKey=pinterest_scheduler&limit=10").then(r => r.json()),
  });

  const pinList = Array.isArray(pinJobs) ? pinJobs : pinJobs?.jobs || [];

  return (
    <div className="space-y-6">
      <Card data-testid="card-pinterest-scheduler">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Share2 className="h-5 w-5" /> Pinterest Pin Scheduler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Pin Title</Label>
              <Input
                value={pinTitle}
                onChange={(e) => setPinTitle(e.target.value)}
                placeholder="e.g., 10 Must-Know Cardiac Facts"
                data-testid="input-pin-title"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Board</Label>
              <Select value={pinBoard} onValueChange={setPinBoard} data-testid="select-pin-board">
                <SelectTrigger data-testid="select-pin-board-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nursing-tips">Nursing Tips</SelectItem>
                  <SelectItem value="exam-prep">Exam Prep</SelectItem>
                  <SelectItem value="study-guides">Study Guides</SelectItem>
                  <SelectItem value="clinical-skills">Clinical Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Schedule Date</Label>
              <Input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                data-testid="input-pin-schedule"
              />
            </div>
          </div>
          <Button
            onClick={() => scheduleMutation.mutate()}
            disabled={scheduleMutation.isPending || !pinTitle.trim()}
            data-testid="button-schedule-pin"
          >
            {scheduleMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Scheduling...</> : <><Calendar className="mr-2 h-4 w-4" /> Schedule Pin</>}
          </Button>
        </CardContent>
      </Card>

      {pinList.length > 0 && (
        <Card data-testid="card-pin-queue">
          <CardHeader>
            <CardTitle className="text-sm">Scheduled Pins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pinList.map((pin: any) => (
                <div key={pin.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" data-testid={`row-pin-${pin.id}`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={pin.status} />
                    <span>{pin.payload?.title || "Untitled"}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {pin.scheduledFor ? new Date(pin.scheduledFor).toLocaleString() : "Immediate"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AutoExpansionTab() {
  const { data: expansionData, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "auto_expansion"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?engineKey=auto_expansion&limit=20").then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const triggerMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: { engineKey: "auto_expansion", payload: { mode: "scan_top_pages" } },
      });
      if (!res.ok) throw new Error("Expansion scan failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
    },
  });

  const jobs = Array.isArray(expansionData) ? expansionData : expansionData?.jobs || [];

  return (
    <div className="space-y-6">
      <Card data-testid="card-auto-expansion">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Expand className="h-5 w-5" /> Auto Content Expansion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Automatically discover top-performing pages and generate expansion content (related questions, deeper lessons, new practice pages).
          </p>
          <Button
            onClick={() => triggerMutation.mutate()}
            disabled={triggerMutation.isPending}
            data-testid="button-trigger-expansion"
          >
            {triggerMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Scanning...</> : <><TrendingUp className="mr-2 h-4 w-4" /> Scan Top Pages</>}
          </Button>
          {triggerMutation.isSuccess && (
            <p className="text-sm text-green-600" data-testid="text-expansion-success">Expansion scan triggered</p>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading...</div>
      ) : jobs.length > 0 && (
        <Card data-testid="card-expansion-history">
          <CardHeader>
            <CardTitle className="text-sm">Expansion History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {jobs.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" data-testid={`row-expansion-${job.id}`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    <span className="text-xs">{job.payload?.mode || "expansion"}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {job.createdAt ? new Date(job.createdAt).toLocaleString() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CourseBuilderTab() {
  const queryClient = useQueryClient();
  const [courseTopic, setCourseTopic] = useState("");
  const [courseExam, setCourseExam] = useState("nclex-rn");
  const [courseDifficulty, setCourseDifficulty] = useState("intermediate");

  const buildMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "course_builder",
          payload: { topic: courseTopic, exam: courseExam, difficulty: courseDifficulty },
        },
      });
      if (!res.ok) throw new Error("Course build failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/queue"] });
    },
  });

  return (
    <div className="space-y-6">
      <Card data-testid="card-course-builder">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> 1-Click Course Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Course Topic</Label>
              <Input
                value={courseTopic}
                onChange={(e) => setCourseTopic(e.target.value)}
                placeholder="e.g., Cardiac Nursing Fundamentals"
                data-testid="input-course-topic"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Target Exam</Label>
              <Select value={courseExam} onValueChange={setCourseExam} data-testid="select-course-exam">
                <SelectTrigger data-testid="select-course-exam-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nclex-rn">NCLEX-RN</SelectItem>
                  <SelectItem value="nclex-pn">NCLEX-PN</SelectItem>
                  <SelectItem value="rex-pn">REX-PN</SelectItem>
                  <SelectItem value="cnpe">CNPE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Difficulty</Label>
              <Select value={courseDifficulty} onValueChange={setCourseDifficulty} data-testid="select-course-difficulty">
                <SelectTrigger data-testid="select-course-difficulty-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => buildMutation.mutate()}
            disabled={buildMutation.isPending || !courseTopic.trim()}
            data-testid="button-build-course"
          >
            {buildMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Building...</> : <><BookOpen className="mr-2 h-4 w-4" /> Build Course</>}
          </Button>
          {buildMutation.isSuccess && (
            <p className="text-sm text-green-600" data-testid="text-course-success">Course build job created and queued for review</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LifecycleEmailTab() {
  const queryClient = useQueryClient();
  const [emailSequence, setEmailSequence] = useState("onboarding");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailTrigger, setEmailTrigger] = useState("signup");

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await adminFetch("/api/admin/autopilot/jobs", {
        method: "POST",
        body: {
          engineKey: "lifecycle_email",
          payload: { sequence: emailSequence, subject: emailSubject, trigger: emailTrigger },
        },
      });
      if (!res.ok) throw new Error("Email template creation failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/jobs"] });
    },
  });

  const { data: emailJobs } = useQuery({
    queryKey: ["/api/admin/autopilot/jobs", "lifecycle_email"],
    queryFn: () => adminFetch("/api/admin/autopilot/jobs?engineKey=lifecycle_email&limit=10").then(r => r.json()),
  });

  const emailList = Array.isArray(emailJobs) ? emailJobs : emailJobs?.jobs || [];

  return (
    <div className="space-y-6">
      <Card data-testid="card-lifecycle-email">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" /> Lifecycle Email Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm mb-1 block">Sequence</Label>
              <Select value={emailSequence} onValueChange={setEmailSequence} data-testid="select-email-sequence">
                <SelectTrigger data-testid="select-email-sequence-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="trial_conversion">Trial Conversion</SelectItem>
                  <SelectItem value="exam_reminder">Exam Reminder</SelectItem>
                  <SelectItem value="re_engagement">Re-engagement</SelectItem>
                  <SelectItem value="upgrade_nudge">Upgrade Nudge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Subject Line</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="e.g., Your study plan is ready"
                data-testid="input-email-subject"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Trigger Event</Label>
              <Select value={emailTrigger} onValueChange={setEmailTrigger} data-testid="select-email-trigger">
                <SelectTrigger data-testid="select-email-trigger-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="signup">Signup</SelectItem>
                  <SelectItem value="trial_complete">Trial Complete</SelectItem>
                  <SelectItem value="inactive_3d">Inactive 3 Days</SelectItem>
                  <SelectItem value="inactive_7d">Inactive 7 Days</SelectItem>
                  <SelectItem value="exam_date_near">Exam Date Near</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => createMutation.mutate()}
            disabled={createMutation.isPending || !emailSubject.trim()}
            data-testid="button-create-email"
          >
            {createMutation.isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating...</> : <><Mail className="mr-2 h-4 w-4" /> Create Email Template</>}
          </Button>
          {createMutation.isSuccess && (
            <p className="text-sm text-green-600" data-testid="text-email-success">Email template job created</p>
          )}
        </CardContent>
      </Card>

      {emailList.length > 0 && (
        <Card data-testid="card-email-history">
          <CardHeader>
            <CardTitle className="text-sm">Email Template History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {emailList.map((job: any) => (
                <div key={job.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" data-testid={`row-email-${job.id}`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.status} />
                    <span className="text-xs">{job.payload?.sequence || "email"} - {job.payload?.subject || ""}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {job.createdAt ? new Date(job.createdAt).toLocaleString() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PerformanceDashboardTab() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/stats"],
    queryFn: () => adminFetch("/api/admin/autopilot/stats").then(r => r.json()),
  });

  const { data: engines } = useQuery({
    queryKey: ["/api/admin/autopilot/engines"],
    queryFn: () => adminFetch("/api/admin/autopilot/engines").then(r => r.json()),
  });

  if (isLoading) return <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading metrics...</div>;

  const engineList = Array.isArray(engines) ? engines : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="stat-completed-jobs">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats?.completedJobs || 0}</div>
            <div className="text-xs text-gray-500">Completed Jobs</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-failed-jobs">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats?.failedJobs || 0}</div>
            <div className="text-xs text-gray-500">Failed Jobs</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-published-count">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.publishedCount || 0}</div>
            <div className="text-xs text-gray-500">Published Content</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-success-rate">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">
              {stats?.totalJobs ? ((stats.completedJobs || 0) / stats.totalJobs * 100).toFixed(0) : 0}%
            </div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-engine-metrics">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Engine Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {engineList.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No engine data available</p>
          ) : (
            <div className="space-y-3">
              {engineList.map((engine: any) => (
                <div key={engine.engineKey} className="flex items-center gap-4 py-2 border-b last:border-0" data-testid={`row-metric-${engine.engineKey}`}>
                  <div className="w-40">
                    <span className="text-sm font-medium">{engine.name || engine.engineKey}</span>
                  </div>
                  <Badge variant={engine.enabled ? "default" : "outline"} className={engine.enabled ? "bg-green-100 text-green-800" : ""}>
                    {engine.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-auto">
                    {engine.lastRunAt ? `Last: ${new Date(engine.lastRunAt).toLocaleDateString()}` : "Never run"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab() {
  const queryClient = useQueryClient();
  const { data: engines, isLoading } = useQuery({
    queryKey: ["/api/admin/autopilot/engines"],
    queryFn: () => adminFetch("/api/admin/autopilot/engines").then(r => r.json()),
  });

  const toggleMutation = useMutation({
    mutationFn: async (key: string) => {
      const res = await adminFetch(`/api/admin/autopilot/engines/${key}/toggle`, { method: "POST" });
      if (!res.ok) throw new Error("Toggle failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/autopilot/engines"] }),
  });

  const engineList = Array.isArray(engines) ? engines : [];

  if (isLoading) return <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading settings...</div>;

  return (
    <div className="space-y-6">
      <Card data-testid="card-global-settings">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" /> Global Engine Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Enable or disable individual automation engines. Disabled engines will not process scheduled jobs.
          </p>
          <div className="space-y-3">
            {engineList.map((engine: any) => (
              <div key={engine.engineKey} className="flex items-center justify-between py-3 border-b last:border-0" data-testid={`row-setting-${engine.engineKey}`}>
                <div>
                  <h4 className="text-sm font-medium">{engine.name || engine.engineKey}</h4>
                  <p className="text-xs text-gray-500">{engine.description || "No description"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={engine.enabled}
                    onCheckedChange={() => toggleMutation.mutate(engine.engineKey)}
                    disabled={toggleMutation.isPending}
                    data-testid={`switch-engine-${engine.engineKey}`}
                  />
                  <span className="text-xs text-gray-400 w-8">{engine.enabled ? "On" : "Off"}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminAutopilot() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" data-testid="button-back-admin">
              <ArrowLeft className="h-4 w-4 mr-1" /> Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2" data-testid="text-autopilot-title">
              <Zap className="h-6 w-6" /> Autopilot Control Center
            </h1>
            <p className="text-sm text-muted-foreground">Manage all automation engines, schedules, and content pipelines</p>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <div className="overflow-x-auto mb-4">
            <TabsList className="inline-flex" data-testid="tabs-autopilot">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="schedules" data-testid="tab-schedules">Schedules</TabsTrigger>
              <TabsTrigger value="queue" data-testid="tab-queue">Publishing Queue</TabsTrigger>
              <TabsTrigger value="keywords" data-testid="tab-keywords">Keywords</TabsTrigger>
              <TabsTrigger value="blog" data-testid="tab-blog">Blog Engine</TabsTrigger>
              <TabsTrigger value="practice" data-testid="tab-practice">Practice SEO</TabsTrigger>
              <TabsTrigger value="questions" data-testid="tab-questions">Question Factory</TabsTrigger>
              <TabsTrigger value="visuals" data-testid="tab-visuals">Visual Factory</TabsTrigger>
              <TabsTrigger value="pinterest" data-testid="tab-pinterest">Pinterest</TabsTrigger>
              <TabsTrigger value="expansion" data-testid="tab-expansion">Auto Expansion</TabsTrigger>
              <TabsTrigger value="courses" data-testid="tab-courses">Course Builder</TabsTrigger>
              <TabsTrigger value="email" data-testid="tab-email">Lifecycle Email</TabsTrigger>
              <TabsTrigger value="performance" data-testid="tab-performance">Performance</TabsTrigger>
              <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="schedules"><SchedulesTab /></TabsContent>
          <TabsContent value="queue"><PublishingQueueTab /></TabsContent>
          <TabsContent value="keywords"><KeywordDiscoveryTab /></TabsContent>
          <TabsContent value="blog"><BlogEngineTab /></TabsContent>
          <TabsContent value="practice"><PracticeSEOTab /></TabsContent>
          <TabsContent value="questions"><QuestionFactoryTab /></TabsContent>
          <TabsContent value="visuals"><VisualFactoryTab /></TabsContent>
          <TabsContent value="pinterest"><PinterestSchedulerTab /></TabsContent>
          <TabsContent value="expansion"><AutoExpansionTab /></TabsContent>
          <TabsContent value="courses"><CourseBuilderTab /></TabsContent>
          <TabsContent value="email"><LifecycleEmailTab /></TabsContent>
          <TabsContent value="performance"><PerformanceDashboardTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
