import { useState, useEffect } from "react";
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
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{q.question}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.country}</span>
                    {q.exam && <span className="px-2 py-0.5 bg-gray-100 rounded">{q.exam}</span>}
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{q.topic}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">Difficulty: {q.difficulty}</span>
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
    exam: "camrt",
    topic: "",
    category: "",
    difficulty: 2,
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
    rationale: "",
    bodyPart: "",
    modality: "",
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
        <select value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-exam">
          <option value="camrt">CAMRT</option>
          <option value="arrt">ARRT</option>
        </select>
        <input placeholder="Topic" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-topic" />
        <select value={String(form.difficulty)} onChange={e => setForm({ ...form, difficulty: parseInt(e.target.value) })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-difficulty">
          <option value="1">Easy (1)</option>
          <option value="2">Medium (2)</option>
          <option value="3">Hard (3)</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-category" />
        <input placeholder="Body Part (optional)" value={form.bodyPart} onChange={e => setForm({ ...form, bodyPart: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-bodypart" />
      </div>
      <textarea placeholder="Question text" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm mb-3" rows={3} data-testid="input-question-text" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input placeholder="Option A" value={form.optionA} onChange={e => setForm({ ...form, optionA: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-option-a" />
        <input placeholder="Option B" value={form.optionB} onChange={e => setForm({ ...form, optionB: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-option-b" />
        <input placeholder="Option C" value={form.optionC} onChange={e => setForm({ ...form, optionC: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-option-c" />
        <input placeholder="Option D" value={form.optionD} onChange={e => setForm({ ...form, optionD: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-option-d" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <select value={form.correctAnswer} onChange={e => setForm({ ...form, correctAnswer: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-correct-answer">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <input placeholder="Modality (optional)" value={form.modality} onChange={e => setForm({ ...form, modality: e.target.value })} className="px-3 py-2 border rounded-lg text-sm" data-testid="input-question-modality" />
      </div>
      <textarea placeholder="Rationale" value={form.rationale} onChange={e => setForm({ ...form, rationale: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm mb-3" rows={2} data-testid="input-question-rationale" />
      <div className="flex gap-2">
        <button onClick={() => createMutation.mutate(form)} disabled={!form.question || !form.optionA || !form.optionB || !form.optionC || !form.optionD || !form.correctAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50" data-testid="button-save-question">
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

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    assetType: "radiograph",
    country: "canada",
    modality: "",
    bodyRegion: "",
    projection: "",
    seoTitle: "",
    thumbnailUrl: "",
    teachingUrl: "",
    examUrl: "",
    examType: "",
  });

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/assets", countryFilter],
    queryFn: () => fetch(`/api/imaging/assets?${params}`).then(r => r.json()),
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (data: typeof uploadForm) =>
      apiRequest("POST", "/api/imaging/assets", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/imaging/assets"] });
      setShowUploadForm(false);
      setUploadForm({ assetType: "radiograph", country: "canada", modality: "", bodyRegion: "", projection: "", seoTitle: "", thumbnailUrl: "", teachingUrl: "", examUrl: "", examType: "" });
    },
  });

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Image Assets ({assets.length})</h2>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          data-testid="button-add-asset"
        >
          {showUploadForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showUploadForm ? "Cancel" : "Add Asset"}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4" data-testid="form-upload-asset">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Title</label>
              <input
                type="text"
                value={uploadForm.seoTitle}
                onChange={e => setUploadForm(p => ({ ...p, seoTitle: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g., PA Chest Radiograph - Normal"
                data-testid="input-asset-title"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Asset Type</label>
              <select
                value={uploadForm.assetType}
                onChange={e => setUploadForm(p => ({ ...p, assetType: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                data-testid="select-asset-type"
              >
                <option value="radiograph">Radiograph</option>
                <option value="ct_scan">CT Scan</option>
                <option value="mri">MRI</option>
                <option value="ultrasound">Ultrasound</option>
                <option value="diagram">Diagram</option>
                <option value="anatomy">Anatomy</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Country</label>
              <select
                value={uploadForm.country}
                onChange={e => setUploadForm(p => ({ ...p, country: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                data-testid="select-asset-country"
              >
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Modality</label>
              <input
                type="text"
                value={uploadForm.modality}
                onChange={e => setUploadForm(p => ({ ...p, modality: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g., X-ray, CT, MRI"
                data-testid="input-asset-modality"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Body Region</label>
              <input
                type="text"
                value={uploadForm.bodyRegion}
                onChange={e => setUploadForm(p => ({ ...p, bodyRegion: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g., Chest, Hand, Spine"
                data-testid="input-asset-body-region"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Projection</label>
              <input
                type="text"
                value={uploadForm.projection}
                onChange={e => setUploadForm(p => ({ ...p, projection: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g., PA, AP, Lateral"
                data-testid="input-asset-projection"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Exam Type</label>
              <input
                type="text"
                value={uploadForm.examType}
                onChange={e => setUploadForm(p => ({ ...p, examType: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g., CAMRT, ARRT"
                data-testid="input-asset-exam"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-500">Thumbnail URL</label>
              <input
                type="url"
                value={uploadForm.thumbnailUrl}
                onChange={e => setUploadForm(p => ({ ...p, thumbnailUrl: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="https://..."
                data-testid="input-asset-thumbnail"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Teaching Image URL</label>
              <input
                type="url"
                value={uploadForm.teachingUrl}
                onChange={e => setUploadForm(p => ({ ...p, teachingUrl: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="https://..."
                data-testid="input-asset-teaching-url"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Exam Image URL</label>
              <input
                type="url"
                value={uploadForm.examUrl}
                onChange={e => setUploadForm(p => ({ ...p, examUrl: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="https://..."
                data-testid="input-asset-exam-url"
              />
            </div>
          </div>
          <button
            onClick={() => createMutation.mutate(uploadForm)}
            disabled={!uploadForm.seoTitle || createMutation.isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40"
            data-testid="button-submit-asset"
          >
            <Upload className="w-4 h-4" />
            {createMutation.isPending ? "Saving..." : "Save Asset"}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : assets.length === 0 && !showUploadForm ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <Image className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No image assets found</p>
          <p className="text-sm mt-1">Click "Add Asset" to upload your first image</p>
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
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/imaging/positioning/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/imaging/positioning"] }),
  });

  return (
    <div data-testid="panel-positioning">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Positioning Entries ({entries.length})</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700" data-testid="button-add-positioning">
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </div>

      {showForm && <PositioningForm editId={editingId} onClose={() => { setShowForm(false); setEditingId(null); }} />}

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No positioning entries found</p>
          <p className="text-sm mt-1">Click "Add Entry" to create your first positioning guide</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e: any) => (
            <div key={e.id} className="bg-white border border-gray-100 rounded-xl p-4" data-testid={`positioning-${e.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}>
                  <p className="text-sm font-medium text-gray-900 mb-1">{e.bodyPart} — {e.projectionName}</p>
                  {e.patientPosition && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{e.patientPosition}</p>}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {e.country && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{e.country}</span>}
                    {e.bodyRegion && <span className="px-2 py-0.5 bg-gray-100 rounded">{e.bodyRegion}</span>}
                    {e.slug && <span className="px-2 py-0.5 bg-gray-100 rounded font-mono text-[10px]">/{e.slug}</span>}
                    <span className={`px-2 py-0.5 rounded ${STATUS_COLORS[e.status] || "bg-gray-100"}`}>{e.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <select
                    value={e.status}
                    onChange={ev => statusMutation.mutate({ id: e.id, status: ev.target.value })}
                    className="text-xs border border-gray-200 rounded px-2 py-1"
                    data-testid={`select-status-positioning-${e.id}`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button onClick={() => { setEditingId(e.id); setShowForm(true); }} className="p-1.5 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" data-testid={`button-edit-positioning-${e.id}`}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteMutation.mutate(e.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" data-testid={`button-delete-positioning-${e.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {expandedId === e.id && (
                <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
                  <div><span className="font-semibold text-gray-500">Central Ray:</span> <span className="text-gray-700">{e.centralRay}</span></div>
                  <div><span className="font-semibold text-gray-500">SID:</span> <span className="text-gray-700">{e.sid || "—"}</span></div>
                  <div><span className="font-semibold text-gray-500">Anatomy:</span> <span className="text-gray-700">{e.anatomyDemonstrated || "—"}</span></div>
                  <div><span className="font-semibold text-gray-500">Film Size:</span> <span className="text-gray-700">{e.filmSize || "—"}</span></div>
                  {e.tips && <div className="col-span-2"><span className="font-semibold text-gray-500">Tips:</span> <span className="text-gray-700">{e.tips}</span></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PositioningForm({ editId, onClose }: { editId: string | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    projectionName: "", slug: "", bodyPart: "", bodyRegion: "", country: "canada",
    examRelevance: "medium", patientPosition: "", bodyPartPosition: "", centralRay: "",
    centralRayDirection: "", filmSize: "", sid: "", detectorPlacement: "", collimationGuidance: "",
    breathingInstructions: "", technicalFactors: "", anatomyDemonstrated: "", evaluationCriteria: "",
    clinicalNotes: "", tips: "", examTips: "", teachingImageUrl: "", examImageUrl: "",
    positioningDiagramUrl: "", incorrectImageUrl: "", seoTitle: "", seoDescription: "", status: "draft",
  });

  const { data: existing } = useQuery({
    queryKey: ["/api/imaging/positioning", editId],
    queryFn: () => editId ? fetch(`/api/imaging/positioning/${editId}`).then(r => r.json()) : null,
    enabled: !!editId,
  });

  const [jsonFields, setJsonFields] = useState({
    commonErrors: "[]",
    positioningErrors: "[]",
    quizQuestions: "[]",
    labelOverlays: "[]",
    learningSteps: "[]",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        projectionName: existing.projectionName || "", slug: existing.slug || "",
        bodyPart: existing.bodyPart || "", bodyRegion: existing.bodyRegion || "",
        country: existing.country || "canada", examRelevance: existing.examRelevance || "medium",
        patientPosition: existing.patientPosition || "", bodyPartPosition: existing.bodyPartPosition || "",
        centralRay: existing.centralRay || "", centralRayDirection: existing.centralRayDirection || "",
        filmSize: existing.filmSize || "", sid: existing.sid || "",
        detectorPlacement: existing.detectorPlacement || "", collimationGuidance: existing.collimationGuidance || "",
        breathingInstructions: existing.breathingInstructions || "", technicalFactors: existing.technicalFactors || "",
        anatomyDemonstrated: existing.anatomyDemonstrated || "", evaluationCriteria: existing.evaluationCriteria || "",
        clinicalNotes: existing.clinicalNotes || "", tips: existing.tips || "",
        examTips: existing.examTips || "", teachingImageUrl: existing.teachingImageUrl || "",
        examImageUrl: existing.examImageUrl || "", positioningDiagramUrl: existing.positioningDiagramUrl || "",
        incorrectImageUrl: existing.incorrectImageUrl || "", seoTitle: existing.seoTitle || "",
        seoDescription: existing.seoDescription || "", status: existing.status || "draft",
      });
      setJsonFields({
        commonErrors: JSON.stringify(existing.commonErrors || [], null, 2),
        positioningErrors: JSON.stringify(existing.positioningErrors || [], null, 2),
        quizQuestions: JSON.stringify(existing.quizQuestions || [], null, 2),
        labelOverlays: JSON.stringify(existing.labelOverlays || [], null, 2),
        learningSteps: JSON.stringify(existing.learningSteps || [], null, 2),
      });
    }
  }, [existing]);

  const createMutation = useMutation({
    mutationFn: (data: any) => editId
      ? apiRequest("PATCH", `/api/imaging/positioning/${editId}`, data)
      : apiRequest("POST", "/api/imaging/positioning", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/imaging/positioning"] });
      onClose();
    },
  });

  const autoSlug = () => {
    if (!form.slug && form.projectionName) {
      setForm(p => ({ ...p, slug: form.projectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
    }
  };

  const set = (k: string) => (e: any) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6" data-testid="form-positioning">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{editId ? "Edit" : "New"} Positioning Entry</h3>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500">Projection Name *</label>
          <input value={form.projectionName} onChange={set("projectionName")} onBlur={autoSlug}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g., PA Erect Chest"
            data-testid="input-pos-projection-name" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Slug *</label>
          <input value={form.slug} onChange={set("slug")}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono" placeholder="pa-erect-chest"
            data-testid="input-pos-slug" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Body Part *</label>
          <input value={form.bodyPart} onChange={set("bodyPart")}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g., Chest"
            data-testid="input-pos-body-part" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Body Region</label>
          <select value={form.bodyRegion} onChange={set("bodyRegion")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="select-pos-body-region">
            <option value="">Select Region</option>
            {["Chest", "Upper Extremity", "Lower Extremity", "Spine", "Abdomen", "Pelvis/Hip", "Shoulder", "Skull"].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Country</label>
          <select value={form.country} onChange={set("country")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="select-pos-country">
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Exam Relevance</label>
          <select value={form.examRelevance} onChange={set("examRelevance")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="select-pos-relevance">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Patient Position *</label>
          <textarea value={form.patientPosition} onChange={set("patientPosition")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Patient stands upright facing..."
            data-testid="input-pos-patient-position" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Central Ray *</label>
          <textarea value={form.centralRay} onChange={set("centralRay")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Perpendicular to T7..."
            data-testid="input-pos-central-ray" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">SID</label>
          <input value={form.sid} onChange={set("sid")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="72 inches" data-testid="input-pos-sid" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Film/IR Size</label>
          <input value={form.filmSize} onChange={set("filmSize")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="14x17" data-testid="input-pos-film-size" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Status</label>
          <select value={form.status} onChange={set("status")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="select-pos-status">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Body Part Position</label>
          <textarea value={form.bodyPartPosition} onChange={set("bodyPartPosition")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-body-part-position" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Central Ray Direction</label>
          <input value={form.centralRayDirection} onChange={set("centralRayDirection")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-cr-direction" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Detector Placement</label>
          <input value={form.detectorPlacement} onChange={set("detectorPlacement")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-detector" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Collimation Guidance</label>
          <input value={form.collimationGuidance} onChange={set("collimationGuidance")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-collimation" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Breathing Instructions</label>
          <input value={form.breathingInstructions} onChange={set("breathingInstructions")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-breathing" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Anatomy Demonstrated</label>
          <textarea value={form.anatomyDemonstrated} onChange={set("anatomyDemonstrated")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-anatomy" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Evaluation Criteria</label>
          <textarea value={form.evaluationCriteria} onChange={set("evaluationCriteria")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-evaluation" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Tips</label>
          <textarea value={form.tips} onChange={set("tips")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-tips" />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Exam Tips</label>
          <textarea value={form.examTips} onChange={set("examTips")} rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-exam-tips" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Teaching Image URL</label>
          <input value={form.teachingImageUrl} onChange={set("teachingImageUrl")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-teaching-img" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Exam Image URL</label>
          <input value={form.examImageUrl} onChange={set("examImageUrl")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-exam-img" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Diagram URL</label>
          <input value={form.positioningDiagramUrl} onChange={set("positioningDiagramUrl")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-diagram" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Incorrect Image URL</label>
          <input value={form.incorrectImageUrl} onChange={set("incorrectImageUrl")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-incorrect-img" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">SEO Title</label>
          <input value={form.seoTitle} onChange={set("seoTitle")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-seo-title" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">SEO Description</label>
          <input value={form.seoDescription} onChange={set("seoDescription")} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" data-testid="input-pos-seo-desc" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Interactive Content (JSON)</h4>
        <p className="text-xs text-gray-400">Enter valid JSON arrays for the interactive module fields below.</p>
        {(["learningSteps", "positioningErrors", "quizQuestions", "labelOverlays", "commonErrors"] as const).map(field => (
          <div key={field}>
            <label className="text-xs font-medium text-gray-500">{field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
            <textarea
              value={jsonFields[field]}
              onChange={e => setJsonFields(p => ({ ...p, [field]: e.target.value }))}
              rows={4}
              className={`w-full mt-1 px-3 py-2 border rounded-lg text-xs font-mono ${(() => { try { JSON.parse(jsonFields[field]); return "border-gray-200"; } catch { return "border-red-400 bg-red-50"; } })()}`}
              data-testid={`input-pos-${field}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            const data: any = { ...form };
            if (!data.slug) data.slug = data.projectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (!data.bodyRegion) data.bodyRegion = data.bodyPart;
            Object.keys(data).forEach(k => { if (data[k] === "") delete data[k]; });
            if (!data.projectionName || !data.bodyPart || !data.patientPosition || !data.centralRay) return;
            try {
              data.commonErrors = JSON.parse(jsonFields.commonErrors);
              data.positioningErrors = JSON.parse(jsonFields.positioningErrors);
              data.quizQuestions = JSON.parse(jsonFields.quizQuestions);
              data.labelOverlays = JSON.parse(jsonFields.labelOverlays);
              data.learningSteps = JSON.parse(jsonFields.learningSteps);
            } catch { return; }
            createMutation.mutate(data);
          }}
          disabled={!form.projectionName || !form.bodyPart || !form.patientPosition || !form.centralRay || createMutation.isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40"
          data-testid="button-submit-positioning"
        >
          <Check className="w-4 h-4" />
          {createMutation.isPending ? "Saving..." : editId ? "Update Entry" : "Create Entry"}
        </button>
        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200" data-testid="button-cancel-positioning">Cancel</button>
      </div>
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
