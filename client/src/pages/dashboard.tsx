import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, BookOpen, FlaskConical, Brain, FileText,
  TrendingUp, GripVertical, Plus, X, Eye, EyeOff, Settings,
  Stethoscope, Pill, Activity, ClipboardList, Award, Target,
  ChevronUp, ChevronDown, BarChart3, Bookmark, Clock
} from "lucide-react";

type WidgetConfig = {
  widgetType: string;
  position: number;
  visible: boolean;
  config?: any;
};

const WIDGET_DEFINITIONS: Record<string, { label: string; icon: any; description: string; component: React.FC<{ user: any }> }> = {
  welcome: {
    label: "Welcome",
    icon: LayoutDashboard,
    description: "Personalized greeting and quick actions",
    component: WelcomeWidget,
  },
  progress: {
    label: "Learning Progress",
    icon: TrendingUp,
    description: "Your study progress across all modules",
    component: ProgressWidget,
  },
  recent_lessons: {
    label: "Recent Lessons",
    icon: BookOpen,
    description: "Continue where you left off",
    component: RecentLessonsWidget,
  },
  quick_links: {
    label: "Quick Access",
    icon: Target,
    description: "Jump to your favorite tools",
    component: QuickLinksWidget,
  },
  exam_stats: {
    label: "Exam Performance",
    icon: Award,
    description: "Mock exam scores and trends",
    component: ExamStatsWidget,
  },
  study_streak: {
    label: "Study Streak",
    icon: Activity,
    description: "Track your daily study consistency",
    component: StudyStreakWidget,
  },
  flashcard_review: {
    label: "Flashcard Review",
    icon: Brain,
    description: "Cards due for review",
    component: FlashcardReviewWidget,
  },
  clinical_tools: {
    label: "Clinical Tools",
    icon: Stethoscope,
    description: "Quick access to clinical simulators",
    component: ClinicalToolsWidget,
  },
};

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { widgetType: "welcome", position: 0, visible: true },
  { widgetType: "progress", position: 1, visible: true },
  { widgetType: "recent_lessons", position: 2, visible: true },
  { widgetType: "quick_links", position: 3, visible: true },
  { widgetType: "exam_stats", position: 4, visible: true },
  { widgetType: "study_streak", position: 5, visible: true },
  { widgetType: "flashcard_review", position: 6, visible: true },
  { widgetType: "clinical_tools", position: 7, visible: true },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<WidgetConfig[]>(DEFAULT_WIDGETS);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetch("/api/dashboard-widgets", {
      headers: { "x-user-id": user.id },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
          setWidgets(sorted.map((d) => ({
            widgetType: d.widgetType,
            position: d.position,
            visible: d.visible,
            config: d.config,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const saveWidgets = useCallback(async (newWidgets: WidgetConfig[]) => {
    if (!user) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard-widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user.id },
        body: JSON.stringify({ widgets: newWidgets }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: "Dashboard saved", description: "Your layout has been updated." });
    } catch {
      toast({ title: "Error", description: "Could not save layout.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [user, toast]);

  function moveWidget(index: number, direction: "up" | "down") {
    const newWidgets = [...widgets];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newWidgets.length) return;
    [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
    const reindexed = newWidgets.map((w, i) => ({ ...w, position: i }));
    setWidgets(reindexed);
  }

  function toggleWidget(index: number) {
    const newWidgets = [...widgets];
    newWidgets[index] = { ...newWidgets[index], visible: !newWidgets[index].visible };
    setWidgets(newWidgets);
  }

  function addWidget(widgetType: string) {
    if (widgets.find((w) => w.widgetType === widgetType)) return;
    const newWidgets = [...widgets, { widgetType, position: widgets.length, visible: true }];
    setWidgets(newWidgets);
  }

  function removeWidget(index: number) {
    const newWidgets = widgets.filter((_, i) => i !== index).map((w, i) => ({ ...w, position: i }));
    setWidgets(newWidgets);
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newWidgets = [...widgets];
    const [moved] = newWidgets.splice(dragIndex, 1);
    newWidgets.splice(index, 0, moved);
    const reindexed = newWidgets.map((w, i) => ({ ...w, position: i }));
    setWidgets(reindexed);
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  async function handleSave() {
    await saveWidgets(widgets);
    setEditing(false);
  }

  async function handleReset() {
    setWidgets(DEFAULT_WIDGETS);
    await saveWidgets(DEFAULT_WIDGETS);
    setEditing(false);
  }

  if (!user) return null;

  const visibleWidgets = widgets.filter((w) => w.visible && WIDGET_DEFINITIONS[w.widgetType]);
  const availableToAdd = Object.keys(WIDGET_DEFINITIONS).filter(
    (key) => !widgets.find((w) => w.widgetType === key)
  );

  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">Your personalized learning command center</p>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-dashboard">
                  Reset to Default
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving} data-testid="button-save-dashboard">
                  {saving ? "Saving..." : "Save Layout"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)} data-testid="button-cancel-edit">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)} data-testid="button-customize-dashboard">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            )}
          </div>
        </div>

        {editing && availableToAdd.length > 0 && (
          <Card className="mb-6 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Widgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableToAdd.map((key) => {
                  const def = WIDGET_DEFINITIONS[key];
                  const Icon = def.icon;
                  return (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => addWidget(key)}
                      data-testid={`button-add-widget-${key}`}
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {def.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-40" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(editing ? widgets : visibleWidgets).map((widget, index) => {
              const def = WIDGET_DEFINITIONS[widget.widgetType];
              if (!def) return null;
              const WidgetComponent = def.component;
              const Icon = def.icon;
              return (
                <div
                  key={widget.widgetType}
                  className={`relative ${editing ? "cursor-move" : ""} ${
                    !widget.visible && editing ? "opacity-50" : ""
                  } ${widget.widgetType === "welcome" ? "md:col-span-2" : ""}`}
                  draggable={editing}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  data-testid={`widget-${widget.widgetType}`}
                >
                  <Card className={`h-full transition-all ${editing ? "ring-2 ring-primary/20 hover:ring-primary/40" : ""}`}>
                    {editing && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveWidget(index, "up")}
                          disabled={index === 0}
                          data-testid={`button-move-up-${widget.widgetType}`}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveWidget(index, "down")}
                          disabled={index === widgets.length - 1}
                          data-testid={`button-move-down-${widget.widgetType}`}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleWidget(index)}
                          data-testid={`button-toggle-${widget.widgetType}`}
                        >
                          {widget.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeWidget(index)}
                          data-testid={`button-remove-${widget.widgetType}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        {def.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {widget.visible ? <WidgetComponent user={user} /> : (
                        <p className="text-xs text-muted-foreground italic">Widget hidden</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function WelcomeWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const tierLabel: Record<string, string> = {
    free: "Free",
    rpn: "RPN/LVN",
    rn: "RN/NCLEX",
    np: "NP Advanced",
    admin: "Administrator",
  };

  return (
    <div data-testid="widget-content-welcome">
      <p className="text-lg font-semibold mb-1">{greeting}, {user.username}!</p>
      <p className="text-sm text-muted-foreground mb-4">
        Plan: <span className="font-medium text-foreground">{tierLabel[user.tier] || user.tier}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="default" onClick={() => navigate("/lessons")} data-testid="button-go-lessons">
          <BookOpen className="h-4 w-4 mr-1" /> Lessons
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/flashcards")} data-testid="button-go-flashcards">
          <Brain className="h-4 w-4 mr-1" /> Flashcards
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/mock-exams")} data-testid="button-go-mock-exams">
          <ClipboardList className="h-4 w-4 mr-1" /> Mock Exams
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/question-of-the-day")} data-testid="button-go-qotd">
          <Target className="h-4 w-4 mr-1" /> QOTD
        </Button>
      </div>
    </div>
  );
}

function ProgressWidget({ user }: { user: any }) {
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/progress/${user.id}`)
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, [user.id]);

  const completed = progress.filter((p: any) => p.completed).length;
  const total = progress.length || 1;
  const pct = Math.round((completed / total) * 100);

  return (
    <div data-testid="widget-content-progress">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative h-16 w-16">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${pct}, 100`}
              className="text-primary"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{pct}%</span>
        </div>
        <div>
          <p className="text-2xl font-bold">{completed}</p>
          <p className="text-xs text-muted-foreground">lessons completed</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{total - completed} remaining in your plan</p>
    </div>
  );
}

function RecentLessonsWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/progress/${user.id}`)
      .then((r) => r.json())
      .then((data: any[]) => {
        setProgress(data.slice(0, 5));
      })
      .catch(() => {});
  }, [user.id]);

  if (progress.length === 0) {
    return (
      <div className="text-center py-4" data-testid="widget-content-recent-empty">
        <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No lessons started yet</p>
        <Button size="sm" variant="link" onClick={() => navigate("/lessons")}>
          Browse Lessons
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="widget-content-recent">
      {progress.map((p: any, i: number) => (
        <button
          key={i}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
          onClick={() => navigate(`/lessons`)}
          data-testid={`link-recent-lesson-${i}`}
        >
          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{p.lessonId || "Lesson"}</p>
            <p className="text-xs text-muted-foreground">{p.completed ? "Completed" : "In progress"}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function QuickLinksWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const links = [
    { label: "Med Math Lab", icon: FlaskConical, path: "/med-math" },
    { label: "Lab Values", icon: Activity, path: "/lab-values" },
    { label: "Clinical Clarity", icon: Stethoscope, path: "/clinical-clarity" },
    { label: "Question Bank", icon: ClipboardList, path: "/question-bank" },
    { label: "Pharmacology", icon: Pill, path: "/flashcards" },
    { label: "Blog", icon: FileText, path: "/blog" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2" data-testid="widget-content-quick-links">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.path}
            className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors text-left"
            onClick={() => navigate(link.path)}
            data-testid={`link-quick-${link.path.slice(1)}`}
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{link.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ExamStatsWidget({ user }: { user: any }) {
  const [stats, setStats] = useState<any[]>([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetch(`/api/mock-exams/history/${user.id}`)
      .then((r) => r.json())
      .then((data: any[]) => setStats(data.slice(0, 5)))
      .catch(() => {});
  }, [user.id]);

  if (stats.length === 0) {
    return (
      <div className="text-center py-4" data-testid="widget-content-exam-empty">
        <Award className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No exams taken yet</p>
        <Button size="sm" variant="link" onClick={() => navigate("/mock-exams")}>
          Start a Mock Exam
        </Button>
      </div>
    );
  }

  const avgScore = Math.round(stats.reduce((sum, s) => sum + (s.score || 0), 0) / stats.length);

  return (
    <div data-testid="widget-content-exam-stats">
      <div className="flex items-center gap-4 mb-3">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{avgScore}%</p>
          <p className="text-xs text-muted-foreground">Avg Score</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{stats.length}</p>
          <p className="text-xs text-muted-foreground">Exams Taken</p>
        </div>
      </div>
      <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/mock-exams")} data-testid="button-view-exams">
        <BarChart3 className="h-4 w-4 mr-1" /> View All Results
      </Button>
    </div>
  );
}

function StudyStreakWidget({ user }: { user: any }) {
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/progress/${user.id}`)
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, [user.id]);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div data-testid="widget-content-streak">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-bold">{progress.length}</p>
          <p className="text-xs text-muted-foreground">Total activities</p>
        </div>
        <Clock className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="flex justify-between gap-1">
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  isToday
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {dayLabels[d.getDay()]}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlashcardReviewWidget({ user }: { user: any }) {
  const [cards, setCards] = useState<any[]>([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetch(`/api/user-flashcards/${user.id}`)
      .then((r) => r.json())
      .then((data: any[]) => setCards(data.slice(0, 3)))
      .catch(() => {});
  }, [user.id]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-4" data-testid="widget-content-flashcard-empty">
        <Brain className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No custom flashcards yet</p>
        <Button size="sm" variant="link" onClick={() => navigate("/profile")}>
          Create Flashcards
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="widget-content-flashcard-review">
      {cards.map((card: any, i: number) => (
        <div key={i} className="p-2 rounded-lg bg-muted text-sm">
          <p className="font-medium truncate">{card.question}</p>
          <p className="text-xs text-muted-foreground truncate">{card.category || "General"}</p>
        </div>
      ))}
      <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => navigate("/flashcards")} data-testid="button-study-flashcards">
        <Bookmark className="h-4 w-4 mr-1" /> Study All
      </Button>
    </div>
  );
}

function ClinicalToolsWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const tools = [
    { label: "First Action", path: "/first-action-simulator", icon: Target },
    { label: "IV Complications", path: "/iv-complications-simulator", icon: Activity },
    { label: "Safety Hazard", path: "/safety-hazard-simulator", icon: Stethoscope },
    { label: "Deteriorating Patient", path: "/deteriorating-patient-simulator", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 gap-2" data-testid="widget-content-clinical-tools">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.path}
            className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors text-left"
            onClick={() => navigate(tool.path)}
            data-testid={`link-clinical-${tool.path.slice(1)}`}
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}
