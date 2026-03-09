import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft, CheckCircle, XCircle, Archive, Trash2, Copy, Eye,
  Loader2, Search, ChevronLeft, ChevronRight, Upload, Download
} from "lucide-react";
import { Link } from "wouter";

type ContentTab = "questions" | "flashcards";

interface QuestionItem {
  id: string;
  tier: string;
  exam: string;
  questionType: string;
  status: string;
  stem: string;
  bodySystem: string | null;
  topic: string | null;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  category: string | null;
  tier: string | null;
  status: string;
  difficulty: number | null;
  createdAt: string;
  updatedAt: string;
}

interface ManageResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  statusCounts: Record<string, number>;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
    published: "bg-green-100 text-green-800 border-green-200",
    approved: "bg-blue-100 text-blue-800 border-blue-200",
    needs_review: "bg-orange-100 text-orange-800 border-orange-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    archived: "bg-gray-100 text-gray-600 border-gray-200",
    pending: "bg-purple-100 text-purple-800 border-purple-200",
  };
  return (
    <Badge className={`text-xs ${colors[status] || "bg-gray-100 text-gray-800"}`} data-testid={`badge-status-${status}`}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

function TierBadge({ tier }: { tier: string | null }) {
  if (!tier) return null;
  const colors: Record<string, string> = {
    rpn: "bg-blue-50 text-blue-700",
    rn: "bg-indigo-50 text-indigo-700",
    np: "bg-purple-50 text-purple-700",
    free: "bg-gray-50 text-gray-700",
  };
  return (
    <Badge className={`text-xs ${colors[tier] || "bg-gray-50 text-gray-700"}`}>
      {tier.toUpperCase()}
    </Badge>
  );
}

function ExamQuestionsTab() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewId, setPreviewId] = useState<string | null>(null);

  const buildParams = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (tierFilter) params.set("tier", tierFilter);
    if (searchTerm) params.set("search", searchTerm);
    return params.toString();
  }, [page, statusFilter, tierFilter, searchTerm]);

  const { data, isLoading } = useQuery<ManageResponse<QuestionItem>>({
    queryKey: ["admin-qbank-manage", page, statusFilter, tierFilter, searchTerm],
    queryFn: () => adminFetch(`/api/admin/qbank/manage?${buildParams()}`).then(r => r.json()),
  });

  const bulkAction = useMutation({
    mutationFn: async ({ action, ids }: { action: string; ids: string[] }) => {
      const res = await adminFetch(`/api/admin/qbank/bulk-${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-qbank-manage"] });
      setSelectedIds(new Set());
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/qbank/${id}/duplicate`, { method: "POST" });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-qbank-manage"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/qbank/${id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-qbank-manage"] }),
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (!data?.items) return;
    if (selectedIds.size === data.items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.items.map(i => i.id)));
    }
  };

  const selected = Array.from(selectedIds);
  const counts = data?.statusCounts || {};

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm" data-testid="status-summary-questions">
        {Object.entries(counts).map(([s, c]) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1 rounded-full border transition ${statusFilter === s ? "bg-[#BFA6F6] text-white border-[#BFA6F6]" : "bg-white text-[#2E3A59] border-gray-200 hover:border-[#BFA6F6]"}`}
            data-testid={`filter-status-${s}`}
          >
            {s.replace(/_/g, " ")}: {c}
          </button>
        ))}
        <button
          onClick={() => { setStatusFilter("all"); setPage(1); }}
          className={`px-3 py-1 rounded-full border transition ${statusFilter === "all" ? "bg-[#BFA6F6] text-white border-[#BFA6F6]" : "bg-white text-[#2E3A59] border-gray-200 hover:border-[#BFA6F6]"}`}
          data-testid="filter-status-all"
        >
          All: {Object.values(counts).reduce((a, b) => a + b, 0)}
        </button>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search question stems..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="pl-9"
            data-testid="input-search-questions"
          />
        </div>
        <Select value={tierFilter || "all"} onValueChange={v => { setTierFilter(v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-[120px]" data-testid="select-tier-filter">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="rpn">RPN</SelectItem>
            <SelectItem value="rn">RN</SelectItem>
            <SelectItem value="np">NP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selected.length > 0 && (
        <div className="flex gap-2 items-center bg-[#BFA6F6]/10 p-3 rounded-lg border border-[#BFA6F6]/30" data-testid="bulk-actions-bar">
          <span className="text-sm font-medium text-[#2E3A59]">{selected.length} selected</span>
          <Button
            size="sm"
            onClick={() => bulkAction.mutate({ action: "publish", ids: selected })}
            disabled={bulkAction.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
            data-testid="btn-bulk-publish"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Publish
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => bulkAction.mutate({ action: "unpublish", ids: selected })}
            disabled={bulkAction.isPending}
            data-testid="btn-bulk-unpublish"
          >
            <XCircle className="h-3 w-3 mr-1" /> Unpublish
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => bulkAction.mutate({ action: "archive", ids: selected })}
            disabled={bulkAction.isPending}
            data-testid="btn-bulk-archive"
          >
            <Archive className="h-3 w-3 mr-1" /> Archive
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => { if (confirm(`Delete ${selected.length} questions?`)) bulkAction.mutate({ action: "delete", ids: selected }); }}
            disabled={bulkAction.isPending}
            data-testid="btn-bulk-delete"
          >
            <Trash2 className="h-3 w-3 mr-1" /> Delete
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-[#BFA6F6]" /></div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 w-8">
                    <Checkbox
                      checked={data?.items.length ? selectedIds.size === data.items.length : false}
                      onCheckedChange={toggleSelectAll}
                      data-testid="checkbox-select-all"
                    />
                  </th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium">Question</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-20">Tier</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-28">Status</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-32">Body System</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-24">Created</th>
                  <th className="p-3 text-right text-[#2E3A59] font-medium w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map(q => (
                  <tr key={q.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedIds.has(q.id)}
                        onCheckedChange={() => toggleSelect(q.id)}
                        data-testid={`checkbox-question-${q.id}`}
                      />
                    </td>
                    <td className="p-3">
                      <div className="max-w-md truncate text-[#2E3A59]" title={q.stem} data-testid={`text-stem-${q.id}`}>
                        {q.stem}
                      </div>
                    </td>
                    <td className="p-3"><TierBadge tier={q.tier} /></td>
                    <td className="p-3"><StatusBadge status={q.status} /></td>
                    <td className="p-3 text-gray-600 text-xs">{q.bodySystem || "-"}</td>
                    <td className="p-3 text-gray-600 text-xs">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <div className="flex gap-1 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setPreviewId(previewId === q.id ? null : q.id)}
                          data-testid={`btn-preview-${q.id}`}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => duplicateMutation.mutate(q.id)}
                          data-testid={`btn-duplicate-${q.id}`}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => { if (confirm("Delete this question?")) deleteMutation.mutate(q.id); }}
                          data-testid={`btn-delete-${q.id}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!data?.items || data.items.length === 0) && (
                  <tr><td colSpan={7} className="p-8 text-center text-gray-500">No questions found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {previewId && <QuestionPreview id={previewId} onClose={() => setPreviewId(null)} />}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600" data-testid="text-pagination-info">
              Page {data?.page || 1} of {data?.totalPages || 1} ({data?.total || 0} total)
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={!data || data.page <= 1}
                onClick={() => setPage(p => p - 1)}
                data-testid="btn-prev-page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!data || data.page >= data.totalPages}
                onClick={() => setPage(p => p + 1)}
                data-testid="btn-next-page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function QuestionPreview({ id, onClose }: { id: string; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { data: list } = useQuery<ManageResponse<QuestionItem>>({
    queryKey: ["admin-qbank-manage"],
    enabled: false,
  });
  const q = list?.items.find(i => i.id === id);

  const statusMutation = useMutation({
    mutationFn: async ({ status }: { status: string }) => {
      const res = await adminFetch(`/api/admin/qbank/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-qbank-manage"] }),
  });

  if (!q) return null;

  return (
    <Card className="border-[#BFA6F6] border-2" data-testid="card-question-preview">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <TierBadge tier={q.tier} />
            <StatusBadge status={q.status} />
            <span className="text-xs text-gray-500">{q.bodySystem}</span>
          </div>
          <div className="flex gap-1">
            {q.status !== "published" && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => statusMutation.mutate({ status: "published" })} data-testid="btn-publish-single">
                Publish Now
              </Button>
            )}
            {q.status === "published" && (
              <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ status: "draft" })} data-testid="btn-unpublish-single">
                Unpublish
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ status: "archived" })} data-testid="btn-archive-single">
              Archive
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#2E3A59] mb-2 font-medium" data-testid="text-preview-stem">{q.stem}</p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>Exam: {q.exam} | Type: {q.questionType} | Difficulty: {q.difficulty}</p>
          {q.publishedAt && <p>Published: {new Date(q.publishedAt).toLocaleString()}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function FlashcardBankTab() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const buildParams = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (tierFilter) params.set("tier", tierFilter);
    if (searchTerm) params.set("search", searchTerm);
    return params.toString();
  }, [page, statusFilter, tierFilter, searchTerm]);

  const { data, isLoading } = useQuery<ManageResponse<FlashcardItem>>({
    queryKey: ["admin-flashcard-manage", page, statusFilter, tierFilter, searchTerm],
    queryFn: () => adminFetch(`/api/admin/flashcard-bank/manage?${buildParams()}`).then(r => r.json()),
  });

  const bulkAction = useMutation({
    mutationFn: async ({ action, ids }: { action: string; ids: string[] }) => {
      const res = await adminFetch(`/api/admin/flashcard-bank/bulk-${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-flashcard-manage"] });
      setSelectedIds(new Set());
    },
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (!data?.items) return;
    if (selectedIds.size === data.items.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(data.items.map(i => i.id)));
  };

  const selected = Array.from(selectedIds);
  const counts = data?.statusCounts || {};

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm" data-testid="status-summary-flashcards">
        {Object.entries(counts).map(([s, c]) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1 rounded-full border transition ${statusFilter === s ? "bg-[#BFA6F6] text-white border-[#BFA6F6]" : "bg-white text-[#2E3A59] border-gray-200 hover:border-[#BFA6F6]"}`}
            data-testid={`filter-fc-status-${s}`}
          >
            {s.replace(/_/g, " ")}: {c}
          </button>
        ))}
        <button
          onClick={() => { setStatusFilter("all"); setPage(1); }}
          className={`px-3 py-1 rounded-full border transition ${statusFilter === "all" ? "bg-[#BFA6F6] text-white border-[#BFA6F6]" : "bg-white text-[#2E3A59] border-gray-200 hover:border-[#BFA6F6]"}`}
          data-testid="filter-fc-status-all"
        >
          All: {Object.values(counts).reduce((a, b) => a + b, 0)}
        </button>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search flashcards..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="pl-9"
            data-testid="input-search-flashcards"
          />
        </div>
        <Select value={tierFilter || "all"} onValueChange={v => { setTierFilter(v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-[120px]" data-testid="select-fc-tier-filter">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="rpn">RPN</SelectItem>
            <SelectItem value="rn">RN</SelectItem>
            <SelectItem value="np">NP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selected.length > 0 && (
        <div className="flex gap-2 items-center bg-[#BFA6F6]/10 p-3 rounded-lg border border-[#BFA6F6]/30" data-testid="bulk-actions-bar-fc">
          <span className="text-sm font-medium text-[#2E3A59]">{selected.length} selected</span>
          <Button size="sm" onClick={() => bulkAction.mutate({ action: "publish", ids: selected })} disabled={bulkAction.isPending} className="bg-green-600 hover:bg-green-700 text-white" data-testid="btn-fc-bulk-publish">
            <CheckCircle className="h-3 w-3 mr-1" /> Publish
          </Button>
          <Button size="sm" variant="outline" onClick={() => bulkAction.mutate({ action: "unpublish", ids: selected })} disabled={bulkAction.isPending} data-testid="btn-fc-bulk-unpublish">
            <XCircle className="h-3 w-3 mr-1" /> Unpublish
          </Button>
          <Button size="sm" variant="outline" onClick={() => bulkAction.mutate({ action: "archive", ids: selected })} disabled={bulkAction.isPending} data-testid="btn-fc-bulk-archive">
            <Archive className="h-3 w-3 mr-1" /> Archive
          </Button>
          <Button size="sm" variant="destructive" onClick={() => { if (confirm(`Delete ${selected.length} flashcards?`)) bulkAction.mutate({ action: "delete", ids: selected }); }} disabled={bulkAction.isPending} data-testid="btn-fc-bulk-delete">
            <Trash2 className="h-3 w-3 mr-1" /> Delete
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-[#BFA6F6]" /></div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 w-8">
                    <Checkbox
                      checked={data?.items.length ? selectedIds.size === data.items.length : false}
                      onCheckedChange={toggleSelectAll}
                      data-testid="checkbox-fc-select-all"
                    />
                  </th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium">Front</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-32">Category</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-20">Tier</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-28">Status</th>
                  <th className="p-3 text-left text-[#2E3A59] font-medium w-24">Created</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map(fc => (
                  <tr key={fc.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedIds.has(fc.id)}
                        onCheckedChange={() => toggleSelect(fc.id)}
                        data-testid={`checkbox-fc-${fc.id}`}
                      />
                    </td>
                    <td className="p-3">
                      <div className="max-w-md truncate text-[#2E3A59]" title={fc.front} data-testid={`text-fc-front-${fc.id}`}>
                        {fc.front}
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 text-xs">{fc.category || "-"}</td>
                    <td className="p-3"><TierBadge tier={fc.tier} /></td>
                    <td className="p-3"><StatusBadge status={fc.status} /></td>
                    <td className="p-3 text-gray-600 text-xs">{new Date(fc.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {(!data?.items || data.items.length === 0) && (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">No flashcards found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600" data-testid="text-fc-pagination-info">
              Page {data?.page || 1} of {data?.totalPages || 1} ({data?.total || 0} total)
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={!data || data.page <= 1} onClick={() => setPage(p => p - 1)} data-testid="btn-fc-prev-page">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" disabled={!data || data.page >= data.totalPages} onClick={() => setPage(p => p + 1)} data-testid="btn-fc-next-page">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminContentManager() {
  const [tab, setTab] = useState<ContentTab>("questions");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="sm" data-testid="btn-back-admin">
              <ArrowLeft className="h-4 w-4 mr-1" /> Admin
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#2E3A59]" data-testid="heading-content-manager">Content Manager</h1>
        </div>

        <Tabs value={tab} onValueChange={v => setTab(v as ContentTab)}>
          <TabsList data-testid="tabs-content-type">
            <TabsTrigger value="questions" data-testid="tab-questions">Exam Questions</TabsTrigger>
            <TabsTrigger value="flashcards" data-testid="tab-flashcards">Flashcard Bank</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2E3A59]">Exam Question Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ExamQuestionsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2E3A59]">Flashcard Bank Management</CardTitle>
              </CardHeader>
              <CardContent>
                <FlashcardBankTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
