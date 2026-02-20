import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import {
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  Shield,
  Eye,
  EyeOff,
  RefreshCw,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type ContentBlock = {
  type: string;
  content: string;
};

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  type: string;
  bodySystem: string | null;
  tier: string | null;
  status: string | null;
  tags: string[] | null;
  summary: string | null;
  content: ContentBlock[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  authorId: string | null;
};

const CONTENT_TYPES = ["lesson", "article", "guide", "flashcard-set"];
const BODY_SYSTEMS = [
  "cardiovascular",
  "respiratory",
  "neurological",
  "gastrointestinal",
  "renal",
  "endocrine",
  "hematologic",
  "musculoskeletal",
  "integumentary",
  "immune",
  "reproductive",
];
const TIERS = ["free", "rpn", "rn", "np"];
const STATUSES = ["draft", "review", "published"];
const BLOCK_TYPES = [
  "heading",
  "paragraph",
  "list",
  "clinical-pearl",
  "medication",
  "warning",
  "quiz-question",
];

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  review: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
};

const tierLabels: Record<string, string> = {
  free: "Free",
  rpn: "RPN/LVN",
  rn: "RN/NCLEX",
  np: "NP Advanced",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getCredentials(): { username: string; password: string } | null {
  try {
    const stored = localStorage.getItem("nursenest-credentials");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ContentEditorPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const isAdmin = user?.tier === "admin";

  const [view, setView] = useState<"list" | "editor">("list");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("lesson");
  const [bodySystem, setBodySystem] = useState<string>("");
  const [tier, setTier] = useState("free");
  const [status, setStatus] = useState("draft");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const creds = getCredentials();
      const params = creds ? `?status=all&username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}` : "";
      const res = await fetch(`/api/content${params}`);
      if (!res.ok) throw new Error("Failed to load content");
      const data = await res.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchItems();
  }, [isAdmin, fetchItems]);

  function resetEditor() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setType("lesson");
    setBodySystem("");
    setTier("free");
    setStatus("draft");
    setTagsInput("");
    setTags([]);
    setSummary("");
    setBlocks([]);
    setSeoTitle("");
    setSeoDescription("");
    setSeoKeywords("");
    setShowSeo(false);
    setShowPreview(false);
    setDeleteConfirm(false);
  }

  function openNew() {
    resetEditor();
    setView("editor");
  }

  function openEdit(item: ContentItem) {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setType(item.type);
    setBodySystem(item.bodySystem || "");
    setTier(item.tier || "free");
    setStatus(item.status || "draft");
    setTags(item.tags || []);
    setTagsInput("");
    setSummary(item.summary || "");
    setBlocks(item.content || []);
    setSeoTitle(item.seoTitle || "");
    setSeoDescription(item.seoDescription || "");
    setSeoKeywords((item.seoKeywords || []).join(", "));
    setShowSeo(false);
    setShowPreview(false);
    setDeleteConfirm(false);
    setView("editor");
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  }

  function addTag() {
    const newTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t));
    if (newTags.length) {
      setTags([...tags, ...newTags]);
      setTagsInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function addBlock(blockType: string) {
    setBlocks([...blocks, { type: blockType, content: "" }]);
  }

  function updateBlock(index: number, content: string) {
    const updated = [...blocks];
    updated[index] = { ...updated[index], content };
    setBlocks(updated);
  }

  function removeBlock(index: number) {
    setBlocks(blocks.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    )
      return;
    const updated = [...blocks];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
    setBlocks(updated);
  }

  function autoGenerateSeo() {
    setSeoTitle(title ? `${title} | NurseNest` : "");
    setSeoDescription(
      summary ||
        blocks
          .filter((b) => b.type === "paragraph")
          .map((b) => b.content)
          .join(" ")
          .slice(0, 160)
    );
    const kw = [
      title.toLowerCase(),
      type,
      bodySystem,
      "nursing",
      "nclex",
      ...tags,
    ]
      .filter(Boolean)
      .join(", ");
    setSeoKeywords(kw);
  }

  async function handleSave() {
    const creds = getCredentials();
    if (!creds) {
      setError("No credentials found. Please log out and log in again.");
      return;
    }
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload: any = {
      username: creds.username,
      password: creds.password,
      title: title.trim(),
      slug: slug.trim(),
      type,
      bodySystem: bodySystem || null,
      tier,
      status,
      tags,
      summary: summary || null,
      content: blocks,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoKeywords: seoKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId ? `/api/content/${editingId}` : "/api/content";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }
      const saved = await res.json();
      if (!editingId) {
        setEditingId(saved.id);
      }
      await fetchItems();
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setStatus("published");
    const creds = getCredentials();
    if (!creds || !editingId) return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/content/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creds.username,
          password: creds.password,
          status: "published",
          publishedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to publish");
      }
      await fetchItems();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    const creds = getCredentials();
    if (!creds) return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/content/${editingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creds.username,
          password: creds.password,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete");
      }
      resetEditor();
      setView("list");
      await fetchItems();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Admin Access Required
              </h2>
              <p className="text-gray-500 mb-6">
                Please log in with an admin account to access this page.
              </p>
              <Button
                onClick={() => setLocation("/login")}
                data-testid="button-content-login"
              >
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-500">
                This page is restricted to administrators.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="Content Editor - NurseNest"
        description="Admin content management editor"
        canonicalPath="/content-editor"
      />
      <Navigation />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700"
              data-testid="text-content-error"
            >
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4 inline" />
              </button>
            </div>
          )}

          {view === "list" ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1
                    className="text-3xl font-bold text-gray-900"
                    data-testid="text-content-title"
                  >
                    Content Engine
                  </h1>
                  <p className="text-gray-500 mt-1">
                    Create and manage learning content
                  </p>
                </div>
                <Button
                  onClick={openNew}
                  className="gap-2"
                  data-testid="button-new-content"
                >
                  <Plus className="w-4 h-4" />
                  New Content
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-content"
                  />
                </div>
                <div className="flex gap-1 bg-white rounded-lg border border-primary/10 p-1">
                  {["all", "draft", "review", "published"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        statusFilter === s
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      data-testid={`filter-status-${s}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : (
                <Card
                  className="border border-primary/10 overflow-hidden"
                  data-testid="card-content-list"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-primary/10">
                          <th className="text-left px-4 py-3 font-medium text-gray-600">
                            Title
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">
                            Type
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">
                            Body System
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">
                            Tier
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">
                            Status
                          </th>
                          <th className="text-right px-4 py-3 font-medium text-gray-600">
                            Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => openEdit(item)}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                            data-testid={`row-content-${item.id}`}
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {item.title}
                            </td>
                            <td className="px-4 py-3 text-gray-600 capitalize">
                              {item.type}
                            </td>
                            <td className="px-4 py-3 text-gray-600 capitalize">
                              {item.bodySystem || "—"}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">
                                {tierLabels[item.tier || "free"] ||
                                  item.tier}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  statusColors[item.status || "draft"]
                                }`}
                                data-testid={`badge-status-${item.id}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-gray-500 text-xs">
                              {formatDate(item.updatedAt)}
                            </td>
                          </tr>
                        ))}
                        {filteredItems.length === 0 && (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-4 py-8 text-center text-gray-400"
                            >
                              {searchQuery || statusFilter !== "all"
                                ? "No content matches your filters"
                                : "No content yet. Create your first item!"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setView("list");
                    resetEditor();
                  }}
                  className="gap-2"
                  data-testid="button-back-to-list"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to List
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {editingId ? "Edit Content" : "New Content"}
                </h1>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                          Title *
                        </label>
                        <Input
                          value={title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter content title..."
                          data-testid="input-title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                          Slug *
                        </label>
                        <Input
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="auto-generated-slug"
                          data-testid="input-slug"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">
                            Type
                          </label>
                          <Select value={type} onValueChange={setType}>
                            <SelectTrigger data-testid="select-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTENT_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t
                                    .replace("-", " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">
                            Body System
                          </label>
                          <Select
                            value={bodySystem || "none"}
                            onValueChange={(v) =>
                              setBodySystem(v === "none" ? "" : v)
                            }
                          >
                            <SelectTrigger data-testid="select-body-system">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {BODY_SYSTEMS.map((bs) => (
                                <SelectItem key={bs} value={bs}>
                                  {bs.charAt(0).toUpperCase() + bs.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                          Summary
                        </label>
                        <Textarea
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          placeholder="Brief summary of the content..."
                          rows={3}
                          data-testid="textarea-summary"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-3">
                        <Input
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="Add tags (comma separated)..."
                          data-testid="input-tags"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addTag}
                          data-testid="button-add-tag"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="gap-1 cursor-pointer"
                            onClick={() => removeTag(tag)}
                            data-testid={`badge-tag-${tag}`}
                          >
                            {tag}
                            <X className="w-3 h-3" />
                          </Badge>
                        ))}
                        {tags.length === 0 && (
                          <span className="text-sm text-gray-400">
                            No tags added
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-700">
                        Content Blocks
                      </CardTitle>
                      <Select
                        onValueChange={(v) => addBlock(v)}
                        value=""
                      >
                        <SelectTrigger
                          className="w-auto gap-2"
                          data-testid="select-add-block"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Block</span>
                        </SelectTrigger>
                        <SelectContent>
                          {BLOCK_TYPES.map((bt) => (
                            <SelectItem key={bt} value={bt}>
                              {bt
                                .replace("-", " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {blocks.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">
                          No content blocks. Use "Add Block" to get started.
                        </p>
                      )}
                      {blocks.map((block, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 space-y-2"
                          data-testid={`block-${index}`}
                        >
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="capitalize">
                              {block.type.replace("-", " ")}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => moveBlock(index, "up")}
                                disabled={index === 0}
                                data-testid={`button-move-up-${index}`}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => moveBlock(index, "down")}
                                disabled={index === blocks.length - 1}
                                data-testid={`button-move-down-${index}`}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeBlock(index)}
                                data-testid={`button-delete-block-${index}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={block.content}
                            onChange={(e) =>
                              updateBlock(index, e.target.value)
                            }
                            placeholder={`Enter ${block.type} content...`}
                            rows={
                              block.type === "heading"
                                ? 1
                                : block.type === "quiz-question"
                                  ? 6
                                  : 4
                            }
                            data-testid={`textarea-block-${index}`}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/10">
                    <CardHeader>
                      <button
                        onClick={() => setShowSeo(!showSeo)}
                        className="flex items-center justify-between w-full"
                        data-testid="button-toggle-seo"
                      >
                        <CardTitle className="text-sm font-semibold text-gray-700">
                          SEO Settings
                        </CardTitle>
                        {showSeo ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </CardHeader>
                    {showSeo && (
                      <CardContent className="space-y-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={autoGenerateSeo}
                          className="gap-2"
                          data-testid="button-auto-seo"
                        >
                          <Sparkles className="w-4 h-4" />
                          Auto-generate from content
                        </Button>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">
                            SEO Title
                          </label>
                          <Input
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            placeholder="SEO title..."
                            data-testid="input-seo-title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">
                            SEO Description
                          </label>
                          <Textarea
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            placeholder="SEO description..."
                            rows={3}
                            data-testid="textarea-seo-description"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">
                            SEO Keywords
                          </label>
                          <Input
                            value={seoKeywords}
                            onChange={(e) => setSeoKeywords(e.target.value)}
                            placeholder="keyword1, keyword2, keyword3..."
                            data-testid="input-seo-keywords"
                          />
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card className="border border-primary/10">
                    <CardHeader>
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center justify-between w-full"
                        data-testid="button-toggle-preview"
                      >
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          {showPreview ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          Preview
                        </CardTitle>
                        {showPreview ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </CardHeader>
                    {showPreview && (
                      <CardContent>
                        <div className="prose max-w-none" data-testid="content-preview">
                          {blocks.length === 0 && (
                            <p className="text-gray-400 text-center">
                              No content blocks to preview
                            </p>
                          )}
                          {blocks.map((block, i) => {
                            switch (block.type) {
                              case "heading":
                                return (
                                  <h2
                                    key={i}
                                    className="text-xl font-bold text-gray-900 mt-6 mb-2"
                                  >
                                    {block.content}
                                  </h2>
                                );
                              case "paragraph":
                                return (
                                  <p
                                    key={i}
                                    className="text-gray-700 mb-4 whitespace-pre-wrap"
                                  >
                                    {block.content}
                                  </p>
                                );
                              case "list":
                                return (
                                  <ul
                                    key={i}
                                    className="list-disc list-inside mb-4 space-y-1 text-gray-700"
                                  >
                                    {block.content
                                      .split("\n")
                                      .filter(Boolean)
                                      .map((li, j) => (
                                        <li key={j}>{li}</li>
                                      ))}
                                  </ul>
                                );
                              case "clinical-pearl":
                                return (
                                  <div
                                    key={i}
                                    className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4"
                                  >
                                    <p className="font-semibold text-blue-800 mb-1">
                                      Clinical Pearl
                                    </p>
                                    <p className="text-blue-700 whitespace-pre-wrap">
                                      {block.content}
                                    </p>
                                  </div>
                                );
                              case "medication":
                                return (
                                  <div
                                    key={i}
                                    className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-4"
                                  >
                                    <p className="font-semibold text-purple-800 mb-1">
                                      Medication Note
                                    </p>
                                    <p className="text-purple-700 whitespace-pre-wrap">
                                      {block.content}
                                    </p>
                                  </div>
                                );
                              case "warning":
                                return (
                                  <div
                                    key={i}
                                    className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-4"
                                  >
                                    <p className="font-semibold text-red-800 mb-1">
                                      ⚠️ Warning
                                    </p>
                                    <p className="text-red-700 whitespace-pre-wrap">
                                      {block.content}
                                    </p>
                                  </div>
                                );
                              case "quiz-question":
                                return (
                                  <div
                                    key={i}
                                    className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-4"
                                  >
                                    <p className="font-semibold text-amber-800 mb-1">
                                      Quiz Question
                                    </p>
                                    <p className="text-amber-700 whitespace-pre-wrap">
                                      {block.content}
                                    </p>
                                  </div>
                                );
                              default:
                                return (
                                  <p key={i} className="text-gray-700 mb-4">
                                    {block.content}
                                  </p>
                                );
                            }
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border border-primary/10 sticky top-20">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-gray-700">
                        Publishing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                          Status
                        </label>
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger data-testid="select-status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                          Tier
                        </label>
                        <Select value={tier} onValueChange={setTier}>
                          <SelectTrigger data-testid="select-tier">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIERS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {tierLabels[t]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <Button
                          onClick={handleSave}
                          disabled={saving}
                          className="w-full gap-2"
                          data-testid="button-save"
                        >
                          {saving ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          {saving ? "Saving..." : "Save"}
                        </Button>

                        {editingId && status !== "published" && (
                          <Button
                            onClick={handlePublish}
                            disabled={saving}
                            variant="outline"
                            className="w-full gap-2 border-green-300 text-green-700 hover:bg-green-50"
                            data-testid="button-publish"
                          >
                            <Send className="w-4 h-4" />
                            Publish
                          </Button>
                        )}

                        {editingId && (
                          <>
                            {deleteConfirm ? (
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleDelete}
                                  disabled={saving}
                                  variant="destructive"
                                  className="flex-1"
                                  data-testid="button-confirm-delete"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  onClick={() => setDeleteConfirm(false)}
                                  variant="outline"
                                  className="flex-1"
                                  data-testid="button-cancel-delete"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => setDeleteConfirm(true)}
                                variant="outline"
                                className="w-full gap-2 border-red-300 text-red-600 hover:bg-red-50"
                                data-testid="button-delete"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
