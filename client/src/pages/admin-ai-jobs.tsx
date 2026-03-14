import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Play,
  Pause,
  XCircle,
  RefreshCw,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Activity,
  ArrowLeft,
} from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    running: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
    paused: "bg-orange-100 text-orange-800",
    stopped: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status] || "bg-gray-100 text-gray-800"}`} data-testid={`status-badge-${status}`}>
      {status}
    </span>
  );
}

export default function AdminAiJobs() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [jobType, setJobType] = useState("blog");
  const [itemCount, setItemCount] = useState(3);
  const [costCap, setCostCap] = useState(5);
  const [configTopic, setConfigTopic] = useState("");
  const [configExamKey, setConfigExamKey] = useState("nclex-rn");
  const [configCareer, setConfigCareer] = useState("respiratory_therapy");

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["ai-jobs"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ai-jobs");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const { data: killSwitchData } = useQuery({
    queryKey: ["ai-kill-switch"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ai-kill-switch");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const { data: spendData } = useQuery({
    queryKey: ["ai-spend"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ai-spend");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const { data: capsData } = useQuery({
    queryKey: ["ai-spend-caps"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/ai-spend-caps");
      return res.json();
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async () => {
      const config: any = {};
      if (configTopic) config.topic = configTopic;
      if (jobType === "qbank") config.examKey = configExamKey;
      if (jobType === "allied") config.career = configCareer;

      const res = await adminFetch("/api/admin/ai-jobs", {
        method: "POST",
        body: JSON.stringify({ type: jobType, itemCount, costCap, config }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create job");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Job Created", description: `Job ${data.id?.slice(0, 8)} created. Click Start to begin.` });
      queryClient.invalidateQueries({ queryKey: ["ai-jobs"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const startJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await adminFetch(`/api/admin/ai-jobs/${jobId}/start`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to start job");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Job Started" });
      queryClient.invalidateQueries({ queryKey: ["ai-jobs"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const pauseJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await adminFetch(`/api/admin/ai-jobs/${jobId}/pause`, { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Job Paused" });
      queryClient.invalidateQueries({ queryKey: ["ai-jobs"] });
    },
  });

  const cancelJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await adminFetch(`/api/admin/ai-jobs/${jobId}/cancel`, { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Job Cancelled" });
      queryClient.invalidateQueries({ queryKey: ["ai-jobs"] });
    },
  });

  const toggleKillSwitch = useMutation({
    mutationFn: async (enabled: boolean) => {
      const res = await adminFetch("/api/admin/ai-kill-switch", {
        method: "POST",
        body: JSON.stringify({ enabled }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: data.active ? "Kill Switch Activated" : "Kill Switch Deactivated", description: data.message });
      queryClient.invalidateQueries({ queryKey: ["ai-kill-switch"] });
      queryClient.invalidateQueries({ queryKey: ["ai-jobs"] });
    },
  });

  const updateCaps = useMutation({
    mutationFn: async (caps: any) => {
      const res = await adminFetch("/api/admin/ai-spend-caps", {
        method: "POST",
        body: JSON.stringify(caps),
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Spend Caps Updated" });
      queryClient.invalidateQueries({ queryKey: ["ai-spend-caps"] });
    },
  });

  const [localCaps, setLocalCaps] = useState({ dailyCap: 10, weeklyCap: 50, perJobCap: 5 });
  useEffect(() => {
    if (capsData) setLocalCaps(capsData);
  }, [capsData]);

  const jobs = jobsData?.jobs || [];
  const isKillSwitchActive = killSwitchData?.active || false;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-gray-500 hover:text-gray-700" data-testid="link-back-admin">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-bold" data-testid="text-page-title">AI Jobs</h1>
          </div>
          <Button
            onClick={() => toggleKillSwitch.mutate(!isKillSwitchActive)}
            className={isKillSwitchActive ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            data-testid="button-kill-switch"
          >
            <Shield className="w-4 h-4 mr-2" />
            {isKillSwitchActive ? "Deactivate Kill Switch" : "Activate Kill Switch"}
          </Button>
        </div>

        {isKillSwitchActive && (
          <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-3 shadow-lg" data-testid="banner-kill-switch">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-bold text-lg">All AI Jobs Disabled — Emergency Kill Switch Active</p>
              <p className="text-red-100 text-sm">No new AI jobs can be created or started. Running jobs will stop at their next checkpoint.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Today's Spend</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-daily-spend">
                ${(spendData?.daily || 0).toFixed(2)}
                <span className="text-sm text-gray-400 font-normal"> / ${spendData?.caps?.dailyCap || 10}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Weekly Spend</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-weekly-spend">
                ${(spendData?.weekly || 0).toFixed(2)}
                <span className="text-sm text-gray-400 font-normal"> / ${spendData?.caps?.weeklyCap || 50}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Monthly Spend</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-monthly-spend">${(spendData?.monthly || 0).toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Activity className="w-4 h-4" />
                <span>Active Jobs</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-active-jobs">{jobs.filter((j: any) => j.status === "running").length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger data-testid="select-job-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="qbank">QBank Questions</SelectItem>
                    <SelectItem value="allied">Allied Health Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Count</label>
                <Input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={100}
                  data-testid="input-item-count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost Cap ($)</label>
                <Input
                  type="number"
                  value={costCap}
                  onChange={(e) => setCostCap(parseFloat(e.target.value) || 5)}
                  min={0.01}
                  step={0.5}
                  data-testid="input-cost-cap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic (optional)</label>
                <Input
                  value={configTopic}
                  onChange={(e) => setConfigTopic(e.target.value)}
                  placeholder="Auto-selected if empty"
                  data-testid="input-topic"
                />
              </div>
            </div>

            {jobType === "qbank" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                <Select value={configExamKey} onValueChange={setConfigExamKey}>
                  <SelectTrigger className="w-48" data-testid="select-exam-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nclex-rn">NCLEX-RN</SelectItem>
                    <SelectItem value="nclex-pn">NCLEX-PN</SelectItem>
                    <SelectItem value="rex-pn">REx-PN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {jobType === "allied" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Career</label>
                <Select value={configCareer} onValueChange={setConfigCareer}>
                  <SelectTrigger className="w-64" data-testid="select-career">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="respiratory_therapy">Respiratory Therapy</SelectItem>
                    <SelectItem value="paramedic_ems">Paramedic / EMS</SelectItem>
                    <SelectItem value="pharmacy_tech">Pharmacy Tech</SelectItem>
                    <SelectItem value="mlt">Medical Lab Tech</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="socialWorker">Social Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              onClick={() => createJobMutation.mutate()}
              disabled={createJobMutation.isPending || isKillSwitchActive}
              className="mt-4"
              data-testid="button-create-job"
            >
              {createJobMutation.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Create Job
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Spend Caps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Cap ($)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={localCaps.dailyCap}
                    onChange={(e) => setLocalCaps({ ...localCaps, dailyCap: parseFloat(e.target.value) || 10 })}
                    min={1}
                    step={1}
                    data-testid="input-daily-cap"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Cap ($)</label>
                <Input
                  type="number"
                  value={localCaps.weeklyCap}
                  onChange={(e) => setLocalCaps({ ...localCaps, weeklyCap: parseFloat(e.target.value) || 50 })}
                  min={1}
                  step={5}
                  data-testid="input-weekly-cap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Per-Job Cap ($)</label>
                <Input
                  type="number"
                  value={localCaps.perJobCap}
                  onChange={(e) => setLocalCaps({ ...localCaps, perJobCap: parseFloat(e.target.value) || 5 })}
                  min={0.5}
                  step={0.5}
                  data-testid="input-per-job-cap"
                />
              </div>
            </div>
            <Button
              onClick={() => updateCaps.mutate(localCaps)}
              disabled={updateCaps.isPending}
              className="mt-4"
              data-testid="button-save-caps"
            >
              Save Caps
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {jobsLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8" data-testid="text-no-jobs">No jobs yet. Create one above to get started.</p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: any) => {
                  const progress = typeof job.progress === "string" ? JSON.parse(job.progress) : (job.progress || {});
                  const logs = typeof job.logs === "string" ? JSON.parse(job.logs) : (job.logs || []);
                  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

                  return (
                    <div key={job.id} className="border rounded-lg p-4" data-testid={`card-job-${job.id}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={job.status} />
                          <span className="font-medium capitalize">{job.type}</span>
                          <span className="text-xs text-gray-400 font-mono">{job.id?.slice(0, 8)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {(job.status === "pending" || job.status === "paused") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startJobMutation.mutate(job.id)}
                              disabled={isKillSwitchActive}
                              data-testid={`button-start-${job.id}`}
                            >
                              <Play className="w-3 h-3 mr-1" /> Start
                            </Button>
                          )}
                          {job.status === "running" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => pauseJobMutation.mutate(job.id)}
                              data-testid={`button-pause-${job.id}`}
                            >
                              <Pause className="w-3 h-3 mr-1" /> Pause
                            </Button>
                          )}
                          {(job.status === "running" || job.status === "pending" || job.status === "paused") && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => cancelJobMutation.mutate(job.id)}
                              data-testid={`button-cancel-${job.id}`}
                            >
                              <XCircle className="w-3 h-3 mr-1" /> Cancel
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress: {progress.completed || 0} / {progress.total || job.item_count || 0}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} data-testid={`progress-bar-${job.id}`} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>Cost: ${(job.actual_cost || 0).toFixed(4)}</div>
                        <div>Duplicates Skipped: {job.duplicates_skipped || 0}</div>
                        <div>Created: {job.created_at ? new Date(job.created_at).toLocaleString() : "-"}</div>
                        <div>By: {job.created_by || "system"}</div>
                      </div>

                      {job.error && (
                        <div className="mt-2 text-sm text-red-600 bg-red-50 rounded p-2" data-testid={`error-${job.id}`}>
                          {job.error}
                        </div>
                      )}

                      {logs.length > 0 && (
                        <details className="mt-2">
                          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            Logs ({logs.length} entries)
                          </summary>
                          <div className="mt-1 max-h-40 overflow-y-auto bg-gray-50 rounded p-2 text-xs font-mono" data-testid={`logs-${job.id}`}>
                            {logs.slice(-20).map((log: any, idx: number) => (
                              <div key={idx} className="py-0.5">
                                <span className="text-gray-400">{log.timestamp?.slice(11, 19) || ""}</span> {log.message}
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
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
