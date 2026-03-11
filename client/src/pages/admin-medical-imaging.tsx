import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import {
  Radio, Plus, Trash2, Edit2, Check, X, Filter,
  FileText, Zap, Image, BookOpen, Atom, MapPin,
  Upload, ChevronDown, ChevronUp, RefreshCw
} from "lucide-react";

type Tab = "questions" | "flashcards" | "case-studies" | "assets" | "positioning" | "physics";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_review: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
};

const TABS: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: "questions", label: "Questions", icon: FileText },
  { key: "flashcards", label: "Flashcards", icon: Zap },
  { key: "case-studies", label: "Case Studies", icon: BookOpen },
  { key: "assets", label: "Image Assets", icon: Image },
  { key: "positioning", label: "Positioning", icon: MapPin },
  { key: "physics", label: "Physics", icon: Atom },
];

export default function AdminMedicalImaging() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("questions");
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600">You need admin access to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="admin-medical-imaging-page">
      <SEO title="Admin - Medical Imaging" description="Manage medical imaging content" noindex />

      <BreadcrumbNav items={[
        { name: "Home", url: "https://www.nursenest.ca/" },
        { name: "Admin", url: "https://www.nursenest.ca/admin" },
        { name: "Medical Imaging", url: "https://www.nursenest.ca/admin/medical-imaging" },
      ]} />

      <div className="flex items-center gap-3 mb-8">
        <Radio className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-admin-imaging-title">Medical Imaging Content Manager</h1>
          <p className="text-sm text-gray-500">Manage questions, flashcards, case studies, image assets, positioning entries, and physics topics</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            data-testid={`tab-${tab.key}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          data-testid="select-country-filter"
        >
          <option value="">All Countries</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          data-testid="select-status-filter"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="pending_review">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {activeTab === "questions" && <QuestionsPanel countryFilter={countryFilter} statusFilter={statusFilter} />}
      {activeTab === "flashcards" && <FlashcardsPanel countryFilter={countryFilter} statusFilter={statusFilter} />}
      {activeTab === "case-studies" && <CaseStudiesPanel countryFilter={countryFilter} statusFilter={statusFilter} />}
      {activeTab === "assets" && <AssetsPanel countryFilter={countryFilter} />}
      {activeTab === "positioning" && <PositioningPanel countryFilter={countryFilter} statusFilter={statusFilter} />}
      {activeTab === "physics" && <PhysicsPanel countryFilter={countryFilter} statusFilter={statusFilter} />}
    </div>
  );
}

function QuestionsPanel({ countryFilter, statusFilter }: { countryFilter: string; statusFilter: string }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);
  if (statusFilter) params.set("status", statusFilter);

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/questions", countryFilter, statusFilter],
    queryFn: () => fetch(`/api/imaging/questions?${params}`).then(r => r.json()),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/imaging/questions/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/questions"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/questions/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/questions"] }),
  });

  return (
    <div data-testid="panel-questions">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Imaging Questions ({questions.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700" data-testid="button-add-question">
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      {showForm && <QuestionForm onClose={() => setShowForm(false)} />}

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No questions found</p>
          <p className="text-sm">Add questions or adjust filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q: any) => (
            <div key={q.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`question-${q.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{q.questionStem}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.country}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.examType}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.topic}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.difficulty}</span>
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[q.status] || "bg-gray-100"}`}>{q.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <select
                    value={q.status}
                    onChange={e => statusMutation.mutate({ id: q.id, status: e.target.value })}
                    className="text-xs border border-gray-200 rounded px-2 py-1"
                    data-testid={`select-status-${q.id}`}
                  >
                    <option value="draft">Draft</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button onClick={() => deleteMutation.mutate(q.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-${q.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    country: "canada",
    examType: "camrt",
    topic: "",
    subtopic: "",
    difficulty: "medium",
    questionType: "multiple_choice",
    questionStem: "",
    correctAnswer: "",
    rationale: "",
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/imaging/questions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/imaging/questions"] });
      onClose();
    },
  });

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4" data-testid="form-add-question">
      <h3 className="font-semibold text-gray-900 mb-3">New Question</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-country">
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>
        <select value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-examType">
          <option value="camrt">CAMRT</option>
          <option value="arrt">ARRT</option>
        </select>
        <input placeholder="Topic" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-topic" />
        <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <textarea placeholder="Question Stem" value={form.questionStem} onChange={e => setForm({ ...form, questionStem: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm mb-3" rows={3} data-testid="input-question-stem" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input placeholder="Correct Answer" value={form.correctAnswer} onChange={e => setForm({ ...form, correctAnswer: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-answer" />
        <input placeholder="Subtopic (optional)" value={form.subtopic} onChange={e => setForm({ ...form, subtopic: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-subtopic" />
      </div>
      <textarea placeholder="Rationale (optional)" value={form.rationale} onChange={e => setForm({ ...form, rationale: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm mb-3" rows={2} data-testid="input-question-rationale" />
      <div className="flex gap-2">
        <button onClick={() => createMutation.mutate(form)} disabled={!form.questionStem || !form.topic || !form.correctAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50" data-testid="button-save-question">
          Save Question
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300" data-testid="button-cancel-question">
          Cancel
        </button>
      </div>
    </div>
  );
}

function FlashcardsPanel({ countryFilter, statusFilter }: { countryFilter: string; statusFilter: string }) {
  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);
  if (statusFilter) params.set("status", statusFilter);

  const { data: flashcards = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/flashcards", countryFilter, statusFilter],
    queryFn: () => fetch(`/api/imaging/flashcards?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/flashcards/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/flashcards"] }),
  });

  return (
    <div data-testid="panel-flashcards">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Imaging Flashcards ({flashcards.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : flashcards.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <Zap className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No flashcards found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {flashcards.map((f: any) => (
            <div key={f.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`flashcard-${f.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{f.front}</p>
                  <p className="text-xs text-gray-500 mb-2">{f.back}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{f.country}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{f.topic}</span>
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[f.status] || "bg-gray-100"}`}>{f.status}</span>
                  </div>
                </div>
                <button onClick={() => deleteMutation.mutate(f.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-flashcard-${f.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudiesPanel({ countryFilter, statusFilter }: { countryFilter: string; statusFilter: string }) {
  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);
  if (statusFilter) params.set("status", statusFilter);

  const { data: studies = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/case-studies", countryFilter, statusFilter],
    queryFn: () => fetch(`/api/imaging/case-studies?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/case-studies/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/case-studies"] }),
  });

  return (
    <div data-testid="panel-case-studies">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Case Studies ({studies.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : studies.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No case studies found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {studies.map((s: any) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`case-study-${s.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{s.title}</p>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{s.clinicalHistory}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{s.country}</span>
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[s.status] || "bg-gray-100"}`}>{s.status}</span>
                  </div>
                </div>
                <button onClick={() => deleteMutation.mutate(s.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-case-study-${s.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AssetsPanel({ countryFilter }: { countryFilter: string }) {
  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/assets", countryFilter],
    queryFn: () => fetch(`/api/imaging/assets?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const approvalMutation = useMutation({
    mutationFn: ({ id, approvalStatus }: { id: string; approvalStatus: string }) =>
      apiRequest("PATCH", `/api/imaging/assets/${id}/approval`, { approvalStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/assets"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/assets/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/assets"] }),
  });

  return (
    <div data-testid="panel-assets">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Image Assets ({assets.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <Image className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No image assets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((a: any) => (
            <div key={a.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`asset-${a.id}`}>
              {a.thumbnailUrl && <img src={a.thumbnailUrl} alt={a.seoTitle || "Asset"} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <p className="text-sm font-medium text-gray-900 mb-1">{a.seoTitle || a.assetType}</p>
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="px-2 py-0.5 bg-gray-100 rounded">{a.country}</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded">{a.assetType}</span>
                {a.modality && <span className="px-2 py-0.5 bg-gray-100 rounded">{a.modality}</span>}
                <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[a.approvalStatus] || "bg-gray-100"}`}>{a.approvalStatus}</span>
              </div>
              <div className="flex gap-1">
                <select
                  value={a.approvalStatus}
                  onChange={e => approvalMutation.mutate({ id: a.id, approvalStatus: e.target.value })}
                  className="text-xs border border-gray-200 rounded px-2 py-1 flex-1"
                  data-testid={`select-approval-${a.id}`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => deleteMutation.mutate(a.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-asset-${a.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PositioningPanel({ countryFilter, statusFilter }: { countryFilter: string; statusFilter: string }) {
  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);
  if (statusFilter) params.set("status", statusFilter);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/positioning", countryFilter, statusFilter],
    queryFn: () => fetch(`/api/imaging/positioning?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/positioning/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/positioning"] }),
  });

  return (
    <div data-testid="panel-positioning">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Positioning Entries ({entries.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No positioning entries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e: any) => (
            <div key={e.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`positioning-${e.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{e.bodyRegion} - {e.projection}</p>
                  {e.patientPosition && <p className="text-xs text-gray-500 mb-2">{e.patientPosition}</p>}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{e.country}</span>
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[e.status] || "bg-gray-100"}`}>{e.status}</span>
                  </div>
                </div>
                <button onClick={() => deleteMutation.mutate(e.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-positioning-${e.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PhysicsPanel({ countryFilter, statusFilter }: { countryFilter: string; statusFilter: string }) {
  const params = new URLSearchParams();
  if (countryFilter) params.set("country", countryFilter);
  if (statusFilter) params.set("status", statusFilter);

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/physics", countryFilter, statusFilter],
    queryFn: () => fetch(`/api/imaging/physics?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/imaging/physics/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/physics"] }),
  });

  return (
    <div data-testid="panel-physics">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Physics Topics ({topics.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : topics.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <Atom className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No physics topics found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((t: any) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`physics-${t.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{t.title}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{t.country}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{t.category}</span>
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[t.status] || "bg-gray-100"}`}>{t.status}</span>
                  </div>
                </div>
                <button onClick={() => deleteMutation.mutate(t.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-physics-${t.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
