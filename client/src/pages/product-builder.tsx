import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save, FileText, Image, Type, Square, Circle, Layers, ChevronLeft, ChevronRight, Download, Upload, Palette, Settings, Eye, Copy, MoreVertical } from "lucide-react";

interface DesignProject {
  id: string;
  title: string;
  slug: string;
  type: string;
  pageSize: string;
  orientation: string;
  createdAt: string;
  updatedAt: string;
  pages?: DesignPage[];
  assets?: DesignAsset[];
}

interface DesignPage {
  id: string;
  projectId: string;
  pageNumber: number;
  canvasJson: any;
  backgroundColor: string;
}

interface DesignAsset {
  id: string;
  projectId: string;
  assetType: string;
  url: string;
  width?: number;
  height?: number;
}

function getAdminParams() {
  const stored = localStorage.getItem("nursenest-credentials");
  if (!stored) return "";
  const { username, password } = JSON.parse(stored);
  return `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
}

function adminFetch(url: string, options?: RequestInit) {
  const stored = localStorage.getItem("nursenest-credentials");
  const creds = stored ? JSON.parse(stored) : {};
  const body = options?.body ? JSON.parse(options.body as string) : {};
  return fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify({ ...body, username: creds.username, password: creds.password }),
  });
}

function ProjectListView({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [projects, setProjects] = useState<DesignProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("booklet");
  const [newPageSize, setNewPageSize] = useState("Letter");
  const [newOrientation, setNewOrientation] = useState("portrait");

  useEffect(() => {
    fetch(`/api/admin/design-projects?${getAdminParams()}`)
      .then(r => { if (!r.ok) throw new Error("Unauthorized"); return r.json(); })
      .then(data => { if (Array.isArray(data)) setProjects(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const createProject = async () => {
    if (!newTitle.trim()) return;
    const res = await adminFetch("/api/admin/design-projects", {
      method: "POST",
      body: JSON.stringify({ title: newTitle, type: newType, pageSize: newPageSize, orientation: newOrientation }),
    });
    if (res.ok) {
      const project = await res.json();
      onOpenProject(project.id);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project and all its pages?")) return;
    await fetch(`/api/admin/design-projects/${id}?${getAdminParams()}`, { method: "DELETE" });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-builder-title">Digital Product Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Create professional study materials for your marketplace</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="gap-2" data-testid="button-new-project">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {showCreate && (
        <Card className="mb-6 border-primary/20" data-testid="card-create-project">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Input
                placeholder="Project title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="text-sm"
                data-testid="input-project-title"
              />
              <select
                value={newType}
                onChange={e => setNewType(e.target.value)}
                className="text-sm border rounded-md px-3 py-2"
                data-testid="select-project-type"
              >
                <option value="booklet">Booklet</option>
                <option value="one-pager">One-Pager</option>
                <option value="poster">Poster</option>
                <option value="cheat-sheet">Cheat Sheet</option>
                <option value="bundle">Bundle</option>
              </select>
              <select
                value={newPageSize}
                onChange={e => setNewPageSize(e.target.value)}
                className="text-sm border rounded-md px-3 py-2"
                data-testid="select-page-size"
              >
                <option value="Letter">Letter (8.5×11)</option>
                <option value="A4">A4</option>
                <option value="5x7">5×7</option>
              </select>
              <select
                value={newOrientation}
                onChange={e => setNewOrientation(e.target.value)}
                className="text-sm border rounded-md px-3 py-2"
                data-testid="select-orientation"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <Button onClick={createProject} disabled={!newTitle.trim()} data-testid="button-create-project">
                Create
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16" data-testid="text-no-projects">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No design projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <Card
              key={project.id}
              className="group cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => onOpenProject(project.id)}
              data-testid={`card-project-${project.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 truncate">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{project.type}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project.pageSize}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project.orientation}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded transition-all"
                    data-testid={`button-delete-project-${project.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

interface CanvasObject {
  id: string;
  type: "text" | "rect" | "circle" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  src?: string;
  borderRadius?: number;
  textAlign?: string;
  zIndex: number;
}

function CanvasEditorView({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const [project, setProject] = useState<DesignProject | null>(null);
  const [pages, setPages] = useState<DesignPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [undoStack, setUndoStack] = useState<CanvasObject[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasObject[][]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CANVAS_WIDTH = 612;
  const CANVAS_HEIGHT = 792;
  const SCALE = 0.85;

  useEffect(() => {
    fetch(`/api/admin/design-projects/${projectId}?${getAdminParams()}`)
      .then(r => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(data => {
        setProject(data);
        setPages(data.pages || []);
        if (data.pages?.length > 0) {
          const pageData = data.pages[0].canvasJson;
          setObjects(pageData?.objects || []);
        }
      })
      .catch(() => {});
  }, [projectId]);

  const saveCanvas = useCallback(async () => {
    if (!pages[currentPageIndex]) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/design-pages/${pages[currentPageIndex].id}`, {
        method: "PUT",
        body: JSON.stringify({ canvasJson: { objects, version: "1.0" }, backgroundColor: pages[currentPageIndex].backgroundColor }),
      });
    } catch (e) {}
    setSaving(false);
  }, [objects, pages, currentPageIndex]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveCanvas();
    }, 2000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [objects, saveCanvas]);

  const pushUndo = () => {
    setUndoStack(prev => [...prev.slice(-20), [...objects]]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(r => [...r, [...objects]]);
    setUndoStack(u => u.slice(0, -1));
    setObjects(prev);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(u => [...u, [...objects]]);
    setRedoStack(r => r.slice(0, -1));
    setObjects(next);
  };

  const addObject = (type: CanvasObject["type"]) => {
    pushUndo();
    const id = `obj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const base = { id, x: 50, y: 50, rotation: 0, opacity: 1, zIndex: objects.length };
    let obj: CanvasObject;
    switch (type) {
      case "text":
        obj = { ...base, type: "text", width: 200, height: 40, content: "New Text", fontSize: 18, fontFamily: "Inter", fontWeight: "normal", fill: "#333333", textAlign: "left" };
        break;
      case "rect":
        obj = { ...base, type: "rect", width: 150, height: 100, fill: "#e2e8f0", stroke: "#94a3b8", strokeWidth: 1, borderRadius: 8 };
        break;
      case "circle":
        obj = { ...base, type: "circle", width: 100, height: 100, fill: "#e2e8f0", stroke: "#94a3b8", strokeWidth: 1 };
        break;
      case "image":
        obj = { ...base, type: "image", width: 200, height: 200, src: "" };
        break;
      default:
        return;
    }
    setObjects(prev => [...prev, obj]);
    setSelectedId(id);
  };

  const updateObject = (id: string, updates: Partial<CanvasObject>) => {
    setObjects(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    pushUndo();
    setObjects(prev => prev.filter(o => o.id !== selectedId));
    setSelectedId(null);
  };

  const duplicateSelected = () => {
    if (!selectedId) return;
    const obj = objects.find(o => o.id === selectedId);
    if (!obj) return;
    pushUndo();
    const newObj = { ...obj, id: `obj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, x: obj.x + 20, y: obj.y + 20, zIndex: objects.length };
    setObjects(prev => [...prev, newObj]);
    setSelectedId(newObj.id);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent, objId?: string) => {
    if (objId) {
      setSelectedId(objId);
      const obj = objects.find(o => o.id === objId);
      if (!obj) return;
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      setIsDragging(true);
      setDragOffset({ x: e.clientX / SCALE - obj.x, y: e.clientY / SCALE - obj.y });
      e.stopPropagation();
    } else {
      setSelectedId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedId) {
      const obj = objects.find(o => o.id === selectedId);
      if (!obj) return;
      const newX = e.clientX / SCALE - dragOffset.x;
      const newY = e.clientY / SCALE - dragOffset.y;
      const snappedX = Math.round(newX / 10) * 10;
      const snappedY = Math.round(newY / 10) * 10;
      updateObject(selectedId, { x: snappedX, y: snappedY });
    }
    if (isResizing && selectedId) {
      const dx = (e.clientX - resizeStart.x) / SCALE;
      const dy = (e.clientY - resizeStart.y) / SCALE;
      updateObject(selectedId, {
        width: Math.max(20, resizeStart.w + dx),
        height: Math.max(20, resizeStart.h + dy),
      });
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging || isResizing) pushUndo();
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    const obj = objects.find(o => o.id === selectedId);
    if (!obj) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, w: obj.width, h: obj.height });
  };

  const switchPage = (index: number) => {
    saveCanvas();
    setCurrentPageIndex(index);
    const pageData = pages[index]?.canvasJson;
    setObjects(pageData?.objects || []);
    setSelectedId(null);
    setUndoStack([]);
    setRedoStack([]);
  };

  const addPage = async () => {
    const res = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    if (res.ok) {
      const page = await res.json();
      setPages(prev => [...prev, page]);
      switchPage(pages.length);
    }
  };

  const deletePage = async (pageId: string, index: number) => {
    if (pages.length <= 1) return;
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/admin/design-pages/${pageId}?${getAdminParams()}`, { method: "DELETE" });
    const newPages = pages.filter(p => p.id !== pageId);
    setPages(newPages);
    if (currentPageIndex >= newPages.length) switchPage(newPages.length - 1);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          deleteSelected();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") { e.preventDefault(); redo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "d") { e.preventDefault(); duplicateSelected(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); saveCanvas(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId, objects, undoStack, redoStack]);

  const selectedObj = objects.find(o => o.id === selectedId);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-12 bg-white border-b flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => { saveCanvas(); onBack(); }} className="p-1.5 hover:bg-gray-100 rounded" data-testid="button-back-to-projects">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-sm text-gray-800">{project?.title || "Loading..."}</span>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project?.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400">{saving ? "Saving..." : "Auto-saved"}</span>
          <Button size="sm" variant="outline" onClick={saveCanvas} className="h-7 text-xs gap-1" data-testid="button-save-canvas">
            <Save className="w-3 h-3" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-14 bg-white border-r flex flex-col items-center py-3 gap-1 shrink-0">
          {[
            { icon: Type, type: "text" as const, label: "Text" },
            { icon: Square, type: "rect" as const, label: "Rectangle" },
            { icon: Circle, type: "circle" as const, label: "Circle" },
            { icon: Image, type: "image" as const, label: "Image" },
          ].map(({ icon: Icon, type, label }) => (
            <button
              key={type}
              onClick={() => addObject(type)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-gray-500 hover:text-primary transition-colors"
              title={label}
              data-testid={`button-add-${type}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <div className="my-2 w-6 border-t" />
          <button onClick={undo} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-xs" title="Undo (Ctrl+Z)" data-testid="button-undo">↩</button>
          <button onClick={redo} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-xs" title="Redo (Ctrl+Y)" data-testid="button-redo">↪</button>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-8">
          <div
            ref={canvasRef}
            className="bg-white shadow-xl relative select-none"
            style={{ width: CANVAS_WIDTH * SCALE, height: CANVAS_HEIGHT * SCALE, transform: `scale(1)` }}
            onMouseDown={(e) => handleCanvasMouseDown(e)}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            data-testid="canvas-area"
          >
            {objects.sort((a, b) => a.zIndex - b.zIndex).map(obj => (
              <div
                key={obj.id}
                style={{
                  position: "absolute",
                  left: obj.x * SCALE,
                  top: obj.y * SCALE,
                  width: obj.width * SCALE,
                  height: obj.height * SCALE,
                  transform: `rotate(${obj.rotation || 0}deg)`,
                  opacity: obj.opacity ?? 1,
                  cursor: isDragging && selectedId === obj.id ? "grabbing" : "grab",
                  outline: selectedId === obj.id ? "2px solid #6366f1" : "none",
                  outlineOffset: "2px",
                  zIndex: obj.zIndex,
                }}
                onMouseDown={(e) => handleCanvasMouseDown(e, obj.id)}
                data-testid={`canvas-object-${obj.id}`}
              >
                {obj.type === "text" && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: (obj.fontSize || 16) * SCALE,
                      fontFamily: obj.fontFamily || "Inter",
                      fontWeight: obj.fontWeight || "normal",
                      color: obj.fill || "#333",
                      textAlign: (obj.textAlign as any) || "left",
                      display: "flex",
                      alignItems: "center",
                      padding: "4px",
                      overflow: "hidden",
                      userSelect: "none",
                    }}
                  >
                    {obj.content}
                  </div>
                )}
                {obj.type === "rect" && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: obj.fill || "#e2e8f0",
                      border: obj.stroke ? `${obj.strokeWidth || 1}px solid ${obj.stroke}` : "none",
                      borderRadius: obj.borderRadius || 0,
                    }}
                  />
                )}
                {obj.type === "circle" && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: obj.fill || "#e2e8f0",
                      border: obj.stroke ? `${obj.strokeWidth || 1}px solid ${obj.stroke}` : "none",
                      borderRadius: "50%",
                    }}
                  />
                )}
                {obj.type === "image" && (
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {obj.src ? (
                      <img src={obj.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <Image className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                )}
                {selectedId === obj.id && (
                  <div
                    className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-full cursor-se-resize border-2 border-white shadow"
                    onMouseDown={handleResizeStart}
                    data-testid="resize-handle"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-56 bg-white border-l overflow-y-auto shrink-0">
          <div className="p-3 border-b">
            <div className="flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-600">Pages</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {pages.map((page, i) => (
                <button
                  key={page.id}
                  onClick={() => switchPage(i)}
                  className={`w-8 h-10 rounded border text-[10px] font-medium flex items-center justify-center ${i === currentPageIndex ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-primary"}`}
                  data-testid={`button-page-${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={addPage} className="w-8 h-10 rounded border border-dashed border-gray-300 text-gray-400 hover:text-primary hover:border-primary flex items-center justify-center" data-testid="button-add-page">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {selectedObj && (
            <div className="p-3 border-b" data-testid="panel-properties">
              <span className="text-xs font-semibold text-gray-600 mb-2 block">Properties</span>
              <div className="space-y-2">
                {selectedObj.type === "text" && (
                  <>
                    <Textarea
                      value={selectedObj.content || ""}
                      onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { content: e.target.value }); }}
                      className="text-xs"
                      rows={2}
                      data-testid="input-text-content"
                    />
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        value={selectedObj.fontSize || 16}
                        onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fontSize: Number(e.target.value) }); }}
                        className="text-xs w-16"
                        data-testid="input-font-size"
                      />
                      <select
                        value={selectedObj.fontWeight || "normal"}
                        onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fontWeight: e.target.value }); }}
                        className="text-xs border rounded px-2 flex-1"
                        data-testid="select-font-weight"
                      >
                        <option value="normal">Regular</option>
                        <option value="bold">Bold</option>
                        <option value="600">Semi-Bold</option>
                      </select>
                    </div>
                  </>
                )}
                {selectedObj.type === "image" && (
                  <Input
                    placeholder="Image URL"
                    value={selectedObj.src || ""}
                    onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { src: e.target.value }); }}
                    className="text-xs"
                    data-testid="input-image-url"
                  />
                )}
                <div className="flex gap-1.5">
                  <div>
                    <label className="text-[9px] text-gray-400">Fill</label>
                    <input
                      type="color"
                      value={selectedObj.fill || "#333333"}
                      onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fill: e.target.value }); }}
                      className="w-full h-7 rounded border cursor-pointer"
                      data-testid="input-fill-color"
                    />
                  </div>
                  {(selectedObj.type === "rect" || selectedObj.type === "circle") && (
                    <div>
                      <label className="text-[9px] text-gray-400">Stroke</label>
                      <input
                        type="color"
                        value={selectedObj.stroke || "#94a3b8"}
                        onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { stroke: e.target.value }); }}
                        className="w-full h-7 rounded border cursor-pointer"
                        data-testid="input-stroke-color"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5">
                  <div>
                    <label className="text-[9px] text-gray-400">W</label>
                    <Input
                      type="number"
                      value={Math.round(selectedObj.width)}
                      onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { width: Number(e.target.value) }); }}
                      className="text-xs"
                      data-testid="input-width"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400">H</label>
                    <Input
                      type="number"
                      value={Math.round(selectedObj.height)}
                      onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { height: Number(e.target.value) }); }}
                      className="text-xs"
                      data-testid="input-height"
                    />
                  </div>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <Button size="sm" variant="outline" onClick={duplicateSelected} className="h-7 text-[10px] flex-1 gap-1" data-testid="button-duplicate">
                    <Copy className="w-3 h-3" /> Duplicate
                  </Button>
                  <Button size="sm" variant="destructive" onClick={deleteSelected} className="h-7 text-[10px] flex-1 gap-1" data-testid="button-delete-object">
                    <Trash2 className="w-3 h-3" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="p-3">
            <span className="text-xs font-semibold text-gray-600 mb-2 block">Layers ({objects.length})</span>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {[...objects].reverse().map(obj => (
                <button
                  key={obj.id}
                  onClick={() => setSelectedId(obj.id)}
                  className={`w-full text-left px-2 py-1.5 rounded text-[10px] flex items-center gap-2 ${selectedId === obj.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-gray-600"}`}
                  data-testid={`layer-${obj.id}`}
                >
                  {obj.type === "text" && <Type className="w-3 h-3" />}
                  {obj.type === "rect" && <Square className="w-3 h-3" />}
                  {obj.type === "circle" && <Circle className="w-3 h-3" />}
                  {obj.type === "image" && <Image className="w-3 h-3" />}
                  <span className="truncate">{obj.type === "text" ? (obj.content || "Text").slice(0, 20) : obj.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductBuilderPage() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/admin/product-builder/:id");
  const [, paramsLocale] = useRoute("/:locale/admin/product-builder/:id");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id || paramsLocale?.id;
    if (id) setEditingProjectId(id);
  }, [params?.id, paramsLocale?.id]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Admin access required</p>
      </div>
    );
  }

  if (editingProjectId) {
    return (
      <CanvasEditorView
        projectId={editingProjectId}
        onBack={() => { setEditingProjectId(null); navigate("/admin/product-builder"); }}
      />
    );
  }

  return <ProjectListView onOpenProject={(id) => { setEditingProjectId(id); navigate(`/admin/product-builder/${id}`); }} />;
}
