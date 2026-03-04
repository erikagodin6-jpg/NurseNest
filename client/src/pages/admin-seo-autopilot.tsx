import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  FileText,
  Image,
  Link2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  Plus,
  Play,
  Search,
  Globe,
  Layers,
  Settings,
  Send,
  PinIcon,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  generating: "bg-blue-100 text-blue-700",
  qc: "bg-yellow-100 text-yellow-700",
  queued: "bg-purple-100 text-purple-700",
  publishing: "bg-indigo-100 text-indigo-700",
  published: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  needs_review: "bg-orange-100 text-orange-700",
  ready: "bg-emerald-100 text-emerald-700",
  blocked: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={`${STATUS_COLORS[status] || "bg-gray-100 text-gray-700"} text-xs font-medium`} data-testid={`badge-status-${status}`}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

function OverviewTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/stats", siteContext, careerTrack],
    queryFn: () => adminFetch(`/api/admin/seo-engine/stats?siteContext=${siteContext}${careerTrack ? `&careerTrack=${careerTrack}` : ""}`).then(r => r.json()),
    refetchInterval: 30000,
  });

  if (isLoading) return <div className="flex items-center gap-2 py-8"><Loader2 className="animate-spin" /> Loading stats...</div>;

  const s = stats || { clusters: {}, articles: {}, infographics: {}, pins: {}, qc: {} };

  return (
    <div className="space-y-6" data-testid="tab-overview">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card data-testid="stat-clusters">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-[#BFA6F6]">{s.clusters?.total || 0}</div>
            <div className="text-xs text-gray-500">Topic Clusters</div>
            <div className="text-xs text-green-600 mt-1">{s.clusters?.published || 0} published</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-articles">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-[#AEE3E1]">{s.articles?.total || 0}</div>
            <div className="text-xs text-gray-500">Articles</div>
            <div className="text-xs text-gray-400">{s.articles?.pillars || 0} pillars, {s.articles?.supports || 0} supports</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-words">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-[#FFD6A5]">{(s.articles?.total_words || 0).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Words</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-infographics">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-[#2E3A59]">{s.infographics?.total || 0}</div>
            <div className="text-xs text-gray-500">Infographics</div>
            <div className="text-xs text-green-600 mt-1">{s.infographics?.ready || 0} ready</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-pins">
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold text-red-400">{s.pins?.total || 0}</div>
            <div className="text-xs text-gray-500">Pinterest Pins</div>
            <div className="text-xs text-green-600 mt-1">{s.pins?.ready || 0} ready</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card data-testid="card-article-status">
          <CardHeader><CardTitle className="text-sm">Article Status Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {[
                { label: "Draft", value: s.articles?.draft || 0, color: "bg-gray-200" },
                { label: "Published", value: s.articles?.published || 0, color: "bg-green-400" },
                { label: "Needs Review", value: s.articles?.needs_review || 0, color: "bg-orange-400" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="flex-1">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card data-testid="card-qc-summary">
          <CardHeader><CardTitle className="text-sm">Quality Control</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="flex-1">QC Passed</span>
                <span className="font-semibold text-green-600">{s.qc?.passed || 0}</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="flex-1">QC Failed</span>
                <span className="font-semibold text-red-600">{s.qc?.failed || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClustersTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [newKeyword, setNewKeyword] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCountry, setNewCountry] = useState("BOTH");
  const [newExamTier, setNewExamTier] = useState("ALL");
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);

  const { data: clusters, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/clusters", siteContext, careerTrack, statusFilter],
    queryFn: () => adminFetch(`/api/admin/seo-engine/clusters?siteContext=${siteContext}${careerTrack ? `&careerTrack=${careerTrack}` : ""}${statusFilter !== "all" ? `&status=${statusFilter}` : ""}`).then(r => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/seo-engine/clusters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: newKeyword, pillarSlug: newSlug, countryMode: newCountry, examTier: newExamTier, siteContext, careerTrack }),
    }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-engine/clusters"] });
      setNewKeyword(""); setNewSlug("");
    },
  });

  const { data: clusterArticles } = useQuery({
    queryKey: ["/api/admin/seo-engine/articles", "cluster", expandedCluster],
    queryFn: () => expandedCluster ? adminFetch(`/api/admin/seo-engine/articles?clusterId=${expandedCluster}&limit=100`).then(r => r.json()) : Promise.resolve([]),
    enabled: !!expandedCluster,
  });

  const clusterList = Array.isArray(clusters) ? clusters : [];

  return (
    <div className="space-y-6" data-testid="tab-clusters">
      <Card data-testid="card-create-cluster">
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Create New Cluster</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-3">
            <Input placeholder="Keyword (e.g., ECG Rhythms)" value={newKeyword} onChange={e => { setNewKeyword(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); }} data-testid="input-cluster-keyword" />
            <Input placeholder="Pillar slug" value={newSlug} onChange={e => setNewSlug(e.target.value)} data-testid="input-cluster-slug" />
            <Select value={newCountry} onValueChange={setNewCountry}>
              <SelectTrigger data-testid="select-cluster-country"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="BOTH">Both CA/US</SelectItem>
                <SelectItem value="CA">Canada Only</SelectItem>
                <SelectItem value="US">US Only</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => createMutation.mutate()} disabled={!newKeyword || !newSlug || createMutation.isPending} className="bg-[#BFA6F6] hover:bg-[#A88DE0] text-white" data-testid="button-create-cluster">
              {createMutation.isPending ? <Loader2 className="animate-spin w-4 h-4" /> : "Create Cluster"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-cluster-status-filter"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="generating">Generating</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">{clusterList.length} cluster{clusterList.length !== 1 ? "s" : ""}</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading clusters...</div>
      ) : clusterList.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No clusters found. Create one above.</p>
      ) : (
        <div className="space-y-3">
          {clusterList.map((c: any) => (
            <Card key={c.id} className="cursor-pointer hover:shadow-md transition-shadow" data-testid={`cluster-card-${c.id}`}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between" onClick={() => setExpandedCluster(expandedCluster === c.id ? null : c.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#2E3A59]">{c.keyword}</h3>
                      <StatusBadge status={c.status} />
                      <Badge variant="outline" className="text-xs">{c.countryMode}</Badge>
                      {c.careerTrack && <Badge variant="outline" className="text-xs">{c.careerTrack}</Badge>}
                    </div>
                    <p className="text-xs text-gray-500">/{c.pillarSlug}</p>
                  </div>
                </div>
                {expandedCluster === c.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600">Articles in Cluster</h4>
                    {(clusterArticles || []).map((a: any) => (
                      <div key={a.id} className="flex items-center gap-2 text-sm p-2 rounded bg-gray-50">
                        <Badge variant={a.type === "pillar" ? "default" : "outline"} className="text-xs">{a.type}</Badge>
                        <span className="flex-1">{a.title}</span>
                        <StatusBadge status={a.status} />
                        <span className="text-xs text-gray-400">{a.wordCount} words</span>
                      </div>
                    ))}
                    {(clusterArticles || []).length === 0 && <p className="text-xs text-gray-400">No articles yet</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticlesTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/articles", siteContext, careerTrack, statusFilter, typeFilter],
    queryFn: () => {
      let url = `/api/admin/seo-engine/articles?siteContext=${siteContext}`;
      if (careerTrack) url += `&careerTrack=${careerTrack}`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;
      if (typeFilter !== "all") url += `&type=${typeFilter}`;
      return adminFetch(url).then(r => r.json());
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminFetch(`/api/admin/seo-engine/articles/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-engine/articles"] }),
  });

  const articleList = Array.isArray(articles) ? articles : [];

  return (
    <div className="space-y-4" data-testid="tab-articles">
      <div className="flex gap-2 items-center flex-wrap">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36" data-testid="select-article-type"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pillar">Pillar</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36" data-testid="select-article-status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="generating">Generating</SelectItem>
            <SelectItem value="needs_review">Needs Review</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">{articleList.length} article{articleList.length !== 1 ? "s" : ""}</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading articles...</div>
      ) : articleList.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No articles found.</p>
      ) : (
        <div className="space-y-2">
          {articleList.map((a: any) => (
            <Card key={a.id} data-testid={`article-card-${a.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  <Badge variant={a.type === "pillar" ? "default" : "outline"} className="text-xs flex-shrink-0">{a.type}</Badge>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-[#2E3A59] truncate">{a.title}</h4>
                    <p className="text-xs text-gray-400 truncate">/{a.slug} | {a.targetKeyword} | {a.searchIntent}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{a.wordCount} words</span>
                    <StatusBadge status={a.status} />
                    <Badge variant="outline" className="text-xs">{a.gatingLevel}</Badge>
                    {a.status === "draft" && (
                      <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: a.id, status: "published" })} data-testid={`button-publish-${a.id}`}>
                        Publish
                      </Button>
                    )}
                    {a.status === "needs_review" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: a.id, status: "draft" })} data-testid={`button-approve-${a.id}`}>
                          Approve
                        </Button>
                      </>
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

function InfographicsTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const { data: infographics, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/infographics", siteContext, careerTrack],
    queryFn: () => adminFetch(`/api/admin/seo-engine/infographics?siteContext=${siteContext}${careerTrack ? `&careerTrack=${careerTrack}` : ""}`).then(r => r.json()),
  });

  const list = Array.isArray(infographics) ? infographics : [];

  return (
    <div className="space-y-4" data-testid="tab-infographics">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#2E3A59]">Generated Infographics</h3>
        <span className="text-sm text-gray-500">{list.length} infographic{list.length !== 1 ? "s" : ""}</span>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-gray-500">No infographics generated yet. Generate articles first, then create infographics.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((inf: any) => (
            <Card key={inf.id} data-testid={`infographic-card-${inf.id}`}>
              <CardContent className="py-4">
                <h4 className="font-medium text-sm text-[#2E3A59] mb-1">{inf.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={inf.status} />
                  <span className="text-xs text-gray-400">{inf.width}x{inf.height}</span>
                  <Badge variant="outline" className="text-xs">{inf.variant}</Badge>
                </div>
                {inf.filePath && <p className="text-xs text-gray-400 truncate">{inf.filePath}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TemplatesTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const queryClient = useQueryClient();
  const [newKey, setNewKey] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrompt, setNewPrompt] = useState("");

  const { data: templates, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/templates", siteContext, careerTrack],
    queryFn: () => adminFetch(`/api/admin/seo-engine/templates?siteContext=${siteContext}${careerTrack ? `&careerTrack=${careerTrack}` : ""}`).then(r => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/seo-engine/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateKey: newKey, name: newName, category: newCategory, promptText: newPrompt, siteContext, careerTrack }),
    }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-engine/templates"] });
      setNewKey(""); setNewName(""); setNewCategory(""); setNewPrompt("");
    },
  });

  const list = Array.isArray(templates) ? templates : [];

  return (
    <div className="space-y-6" data-testid="tab-templates">
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Infographic Template</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <Input placeholder="Template key (e.g., ecg_v1)" value={newKey} onChange={e => setNewKey(e.target.value)} data-testid="input-template-key" />
            <Input placeholder="Display name" value={newName} onChange={e => setNewName(e.target.value)} data-testid="input-template-name" />
            <Input placeholder="Category (e.g., cardio, labs)" value={newCategory} onChange={e => setNewCategory(e.target.value)} data-testid="input-template-category" />
          </div>
          <Textarea placeholder="Image generation prompt..." value={newPrompt} onChange={e => setNewPrompt(e.target.value)} rows={4} data-testid="input-template-prompt" />
          <Button onClick={() => createMutation.mutate()} disabled={!newKey || !newName || !newCategory || !newPrompt} className="bg-[#BFA6F6] hover:bg-[#A88DE0] text-white" data-testid="button-save-template">
            Save Template
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : (
        <div className="space-y-2">
          {list.map((t: any) => (
            <Card key={t.id} data-testid={`template-card-${t.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.templateKey} | {t.category} | {t.examTier}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{t.countryMode}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          {list.length === 0 && <p className="text-sm text-gray-500">No templates yet.</p>}
        </div>
      )}
    </div>
  );
}

function PinsTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const { data: pins, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/pins", siteContext, careerTrack],
    queryFn: () => adminFetch(`/api/admin/seo-engine/pins?siteContext=${siteContext}${careerTrack ? `&careerTrack=${careerTrack}` : ""}`).then(r => r.json()),
  });

  const list = Array.isArray(pins) ? pins : [];

  return (
    <div className="space-y-4" data-testid="tab-pins">
      <h3 className="font-semibold text-[#2E3A59]">Pinterest Pins ({list.length})</h3>
      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-gray-500">No pins generated yet. Pins are created from article infographics.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p: any) => (
            <Card key={p.id} data-testid={`pin-card-${p.id}`}>
              <CardContent className="py-4">
                <h4 className="font-medium text-sm mb-1">{p.headline}</h4>
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.status} />
                  <Badge variant="outline" className="text-xs">Pin {p.pinVariant}</Badge>
                  <span className="text-xs text-gray-400">{p.width}x{p.height}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function InternalLinksTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const { data: links, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/internal-links", siteContext, careerTrack],
    queryFn: () => adminFetch(`/api/admin/seo-engine/internal-links`).then(r => r.json()),
  });

  const list = Array.isArray(links) ? links : [];

  return (
    <div className="space-y-4" data-testid="tab-internal-links">
      <h3 className="font-semibold text-[#2E3A59]">Internal Link Map ({list.length})</h3>
      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-gray-500">No internal links generated yet. Links are created when clusters are published.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {list.map((l: any) => (
            <Card key={l.id} data-testid={`link-card-${l.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-[#2E3A59] truncate max-w-[200px]">{l.fromTitle}</span>
                  <span className="text-gray-400">-&gt;</span>
                  <span className="font-medium text-[#BFA6F6] truncate max-w-[200px]">{l.toTitle}</span>
                  <Badge variant="outline" className="text-xs ml-auto">{l.placement}</Badge>
                  <span className="text-xs text-gray-400">{l.reason}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Anchor: "{l.anchorText}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PublishQueueTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: queue, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/publish-queue", siteContext, careerTrack, statusFilter],
    queryFn: () => {
      let url = `/api/admin/seo-engine/publish-queue?siteContext=${siteContext}`;
      if (careerTrack) url += `&careerTrack=${careerTrack}`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;
      return adminFetch(url).then(r => r.json());
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminFetch(`/api/admin/seo-engine/publish-queue/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-engine/publish-queue"] }),
  });

  const list = Array.isArray(queue) ? queue : [];

  return (
    <div className="space-y-4" data-testid="tab-publish-queue">
      <div className="flex gap-2 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-queue-status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="publishing">Publishing</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">{list.length} item{list.length !== 1 ? "s" : ""}</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-gray-500">Publish queue is empty.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {list.map((q: any) => (
            <Card key={q.id} data-testid={`queue-card-${q.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  <Badge variant={q.articleType === "pillar" ? "default" : "outline"} className="text-xs">{q.articleType}</Badge>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{q.title}</h4>
                    <p className="text-xs text-gray-400">Priority: {q.priority} | Scheduled: {new Date(q.scheduledFor).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={q.status} />
                  {q.status === "queued" && (
                    <Button size="sm" onClick={() => statusMutation.mutate({ id: q.id, status: "published" })} className="bg-green-500 hover:bg-green-600 text-white" data-testid={`button-publish-queue-${q.id}`}>
                      Publish
                    </Button>
                  )}
                  {q.blockedReason && <span className="text-xs text-red-500">{q.blockedReason}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function QcTab({ siteContext, careerTrack }: { siteContext: string; careerTrack: string | null }) {
  const queryClient = useQueryClient();

  const { data: runs, isLoading } = useQuery({
    queryKey: ["/api/admin/seo-engine/qc-runs"],
    queryFn: () => adminFetch("/api/admin/seo-engine/qc-runs").then(r => r.json()),
  });

  const runQcMutation = useMutation({
    mutationFn: (params: any) => adminFetch("/api/admin/seo-engine/qc-runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-engine/qc-runs"] }),
  });

  const list = Array.isArray(runs) ? runs : [];

  return (
    <div className="space-y-4" data-testid="tab-qc">
      <h3 className="font-semibold text-[#2E3A59]">Quality Control Runs</h3>
      <p className="text-sm text-gray-500">QC checks validate content meets minimum standards before publishing.</p>

      {isLoading ? (
        <div className="flex items-center gap-2 py-4"><Loader2 className="animate-spin" /> Loading...</div>
      ) : list.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-gray-500">No QC runs yet. Run QC checks from cluster or article views.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {list.map((r: any) => (
            <Card key={r.id} data-testid={`qc-card-${r.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  {r.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <Badge variant="outline" className="text-xs">{r.scope}</Badge>
                  <span className="text-sm text-gray-600 flex-1">
                    {r.passed ? "Passed" : `Failed (${(r.errors || []).length} issue${(r.errors || []).length !== 1 ? "s" : ""})`}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                {!r.passed && (r.errors || []).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {(r.errors as string[]).map((err: string, i: number) => (
                      <li key={i} className="text-xs text-red-600 flex items-start gap-1">
                        <span className="mt-0.5">-</span> {err}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6" data-testid="tab-settings">
      <Card>
        <CardHeader><CardTitle className="text-sm">Brand Palette (Locked)</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "Primary Lavender", hex: "#BFA6F6" },
              { name: "Soft Teal", hex: "#AEE3E1" },
              { name: "Peach Accent", hex: "#FFD6A5" },
              { name: "Highlight Yellow", hex: "#FFF3B0" },
              { name: "Text Dark Slate", hex: "#2E3A59" },
              { name: "Divider Grey", hex: "#E5E7EB" },
            ].map(c => (
              <div key={c.hex} className="text-center">
                <div className="w-full h-12 rounded-lg border" style={{ backgroundColor: c.hex }} />
                <p className="text-xs font-medium mt-1">{c.name}</p>
                <p className="text-xs text-gray-400">{c.hex}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Content Standards</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>Support articles:</strong> Minimum 1,200 words</p>
          <p><strong>Pillar articles:</strong> Minimum 2,500 words</p>
          <p><strong>Infographic size:</strong> 3000 x 2000 px</p>
          <p><strong>Pinterest pin size:</strong> 1000 x 1500 px</p>
          <p><strong>Watermark:</strong> NurseNest.ca (always)</p>
          <p><strong>Allied Health disclaimer:</strong> "Educational content only. Follow local protocols and institutional policies."</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">URL Structure</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>Nursing articles:</strong> nursenest.ca/blog/&#123;slug&#125;</p>
          <p><strong>Allied articles:</strong> allied.nursenest.ca/&#123;career&#125;/&#123;slug&#125;</p>
          <p><strong>Nursing sitemap:</strong> /sitemap.xml</p>
          <p><strong>Allied sitemap:</strong> /sitemap-allied.xml</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminSeoAutopilot() {
  const [siteContext, setSiteContext] = useState("nursing");
  const [careerTrack, setCareerTrack] = useState<string | null>(null);

  const { data: careerTracks } = useQuery({
    queryKey: ["/api/admin/seo-engine/career-tracks"],
    queryFn: () => adminFetch("/api/admin/seo-engine/career-tracks").then(r => r.json()),
  });

  const tracks = Array.isArray(careerTracks) ? careerTracks : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-[#2E3A59]" data-testid="page-title">
              SEO + Visual Traffic Engine
            </h1>
            <p className="text-sm text-gray-500">Manage content clusters, infographics, pins, and publishing</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={siteContext} onValueChange={v => { setSiteContext(v); if (v === "nursing") setCareerTrack(null); }}>
              <SelectTrigger className="w-36" data-testid="select-site-context">
                <Globe className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="allied">Allied Health</SelectItem>
              </SelectContent>
            </Select>
            {siteContext === "allied" && (
              <Select value={careerTrack || ""} onValueChange={v => setCareerTrack(v || null)}>
                <SelectTrigger className="w-52" data-testid="select-career-track">
                  <SelectValue placeholder="Select Career Track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Careers</SelectItem>
                  {tracks.map((t: any) => (
                    <SelectItem key={t.slug} value={t.slug}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 bg-white border rounded-lg p-1 h-auto">
            <TabsTrigger value="overview" className="gap-1.5 text-xs" data-testid="tab-trigger-overview"><LayoutDashboard className="w-3.5 h-3.5" /> Overview</TabsTrigger>
            <TabsTrigger value="clusters" className="gap-1.5 text-xs" data-testid="tab-trigger-clusters"><Layers className="w-3.5 h-3.5" /> Clusters</TabsTrigger>
            <TabsTrigger value="articles" className="gap-1.5 text-xs" data-testid="tab-trigger-articles"><FileText className="w-3.5 h-3.5" /> Articles</TabsTrigger>
            <TabsTrigger value="infographics" className="gap-1.5 text-xs" data-testid="tab-trigger-infographics"><Image className="w-3.5 h-3.5" /> Infographics</TabsTrigger>
            <TabsTrigger value="templates" className="gap-1.5 text-xs" data-testid="tab-trigger-templates"><Search className="w-3.5 h-3.5" /> Templates</TabsTrigger>
            <TabsTrigger value="pins" className="gap-1.5 text-xs" data-testid="tab-trigger-pins"><PinIcon className="w-3.5 h-3.5" /> Pins</TabsTrigger>
            <TabsTrigger value="links" className="gap-1.5 text-xs" data-testid="tab-trigger-links"><Link2 className="w-3.5 h-3.5" /> Links</TabsTrigger>
            <TabsTrigger value="queue" className="gap-1.5 text-xs" data-testid="tab-trigger-queue"><Send className="w-3.5 h-3.5" /> Publish Queue</TabsTrigger>
            <TabsTrigger value="qc" className="gap-1.5 text-xs" data-testid="tab-trigger-qc"><ShieldCheck className="w-3.5 h-3.5" /> QC</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5 text-xs" data-testid="tab-trigger-settings"><Settings className="w-3.5 h-3.5" /> Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="clusters"><ClustersTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="articles"><ArticlesTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="infographics"><InfographicsTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="templates"><TemplatesTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="pins"><PinsTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="links"><InternalLinksTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="queue"><PublishQueueTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="qc"><QcTab siteContext={siteContext} careerTrack={careerTrack} /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
