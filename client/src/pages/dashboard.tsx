import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { buildBreadcrumbStructuredData } from "@/lib/seo-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, BookOpen, FlaskConical, Brain, FileText,
  TrendingUp, GripVertical, Plus, X, Eye, EyeOff, Settings,
  Stethoscope, Pill, Activity, ClipboardList, Award, Target,
  ChevronUp, ChevronDown, BarChart3, Bookmark, Clock,
  Sparkles, ArrowRight, CheckCircle2, PlayCircle, Flame,
  RotateCcw
} from "lucide-react";

type WidgetConfig = {
  widgetType: string;
  position: number;
  visible: boolean;
  config?: any;
};

const WIDGET_ICONS: Record<string, any> = {
  welcome: LayoutDashboard,
  progress: TrendingUp,
  recent_lessons: BookOpen,
  quick_links: Target,
  exam_stats: Award,
  study_streak: Flame,
  flashcard_review: Brain,
  clinical_tools: Stethoscope,
  recommended: Sparkles,
};

const WIDGET_COMPONENTS: Record<string, React.FC<{ user: any }>> = {
  welcome: WelcomeWidget,
  progress: ProgressWidget,
  recent_lessons: RecentLessonsWidget,
  quick_links: QuickLinksWidget,
  exam_stats: ExamStatsWidget,
  study_streak: StudyStreakWidget,
  flashcard_review: FlashcardReviewWidget,
  clinical_tools: ClinicalToolsWidget,
  recommended: RecommendedWidget,
};

const WIDGET_I18N_KEYS: Record<string, { label: string; desc: string }> = {
  welcome: { label: "dashboard.widget.welcome", desc: "dashboard.widget.welcomeDesc" },
  progress: { label: "dashboard.widget.progress", desc: "dashboard.widget.progressDesc" },
  recent_lessons: { label: "dashboard.widget.recentLessons", desc: "dashboard.widget.recentLessonsDesc" },
  quick_links: { label: "dashboard.widget.quickLinks", desc: "dashboard.widget.quickLinksDesc" },
  exam_stats: { label: "dashboard.widget.examStats", desc: "dashboard.widget.examStatsDesc" },
  study_streak: { label: "dashboard.widget.studyStreak", desc: "dashboard.widget.studyStreakDesc" },
  flashcard_review: { label: "dashboard.widget.flashcardReview", desc: "dashboard.widget.flashcardReviewDesc" },
  clinical_tools: { label: "dashboard.widget.clinicalTools", desc: "dashboard.widget.clinicalToolsDesc" },
  recommended: { label: "dashboard.widget.recommended", desc: "dashboard.widget.recommendedDesc" },
};

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { widgetType: "welcome", position: 0, visible: true },
  { widgetType: "progress", position: 1, visible: true },
  { widgetType: "recommended", position: 2, visible: true },
  { widgetType: "recent_lessons", position: 3, visible: true },
  { widgetType: "quick_links", position: 4, visible: true },
  { widgetType: "exam_stats", position: 5, visible: true },
  { widgetType: "study_streak", position: 6, visible: true },
  { widgetType: "flashcard_review", position: 7, visible: true },
  { widgetType: "clinical_tools", position: 8, visible: true },
];

const breadcrumbData = buildBreadcrumbStructuredData([
  { name: "Home", url: "https://www.nursenest.ca/" },
  { name: "Dashboard", url: "https://www.nursenest.ca/dashboard" },
]);

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useI18n();
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
      toast({ title: t("dashboard.savedTitle"), description: t("dashboard.savedDesc") });
    } catch {
      toast({ title: t("dashboard.errorTitle"), description: t("dashboard.errorDesc"), variant: "destructive" });
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

  const visibleWidgets = widgets.filter((w) => w.visible && WIDGET_COMPONENTS[w.widgetType]);
  const availableToAdd = Object.keys(WIDGET_COMPONENTS).filter(
    (key) => !widgets.find((w) => w.widgetType === key)
  );

  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <SEO
        title="My Dashboard - Personalized Learning Hub"
        description="Your personalized nursing learning dashboard. Track study progress, review flashcards, access clinical tools, and prepare for NCLEX exams all in one place."
        keywords="nursing dashboard, NCLEX study tracker, nursing education progress, clinical learning tools"
        canonicalPath="/dashboard"
        structuredData={breadcrumbData}
        additionalStructuredData={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "NurseNest Dashboard",
          "description": "Personalized nursing student learning dashboard with progress tracking, exam stats, and clinical tools.",
          "url": "https://www.nursenest.ca/dashboard",
          "isPartOf": { "@type": "WebSite", "name": "NurseNest", "url": "https://www.nursenest.ca" },
        }]}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl" role="main" aria-label="Learning Dashboard">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><LocaleLink href="/" className="hover:text-primary transition-colors" data-testid="link-breadcrumb-home">{t("dashboard.breadcrumbHome")}</LocaleLink></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-foreground">{t("dashboard.breadcrumbDashboard")}</li>
          </ol>
        </nav>

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-dashboard-title">{t("dashboard.pageTitle")}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">{t("dashboard.pageSubtitle")}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {editing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-dashboard" aria-label="Reset dashboard to default layout">
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">{t("dashboard.reset")}</span>
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving} data-testid="button-save-dashboard">
                  {saving ? t("dashboard.saving") : t("dashboard.saveLayout")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)} data-testid="button-cancel-edit" aria-label="Cancel editing">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)} data-testid="button-customize-dashboard" aria-label="Customize dashboard layout">
                <Settings className="h-4 w-4 mr-1.5" />
                {t("dashboard.customize")}
              </Button>
            )}
          </div>
        </header>

        {editing && availableToAdd.length > 0 && (
          <section className="mb-6" aria-label="Add widgets">
            <Card className="border-dashed border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Plus className="h-4 w-4" /> {t("dashboard.addWidgets")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {availableToAdd.map((key) => {
                    const keys = WIDGET_I18N_KEYS[key];
                    const Icon = WIDGET_ICONS[key];
                    const label = t(keys.label);
                    return (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => addWidget(key)}
                        className="gap-1.5"
                        data-testid={`button-add-widget-${key}`}
                        aria-label={`Add ${label} widget`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" aria-busy="true" aria-label="Loading dashboard">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-3">
                  <div className="h-4 w-32 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" aria-label="Dashboard widgets">
            {(editing ? widgets : visibleWidgets).map((widget, index) => {
              const WidgetComponent = WIDGET_COMPONENTS[widget.widgetType];
              const keys = WIDGET_I18N_KEYS[widget.widgetType];
              if (!WidgetComponent || !keys) return null;
              const Icon = WIDGET_ICONS[widget.widgetType];
              const widgetLabel = t(keys.label);
              const isFullWidth = widget.widgetType === "welcome" || widget.widgetType === "recommended";
              return (
                <article
                  key={widget.widgetType}
                  className={`relative ${editing ? "cursor-move" : ""} ${
                    !widget.visible && editing ? "opacity-50" : ""
                  } ${isFullWidth ? "md:col-span-2" : ""}`}
                  aria-label={`${widgetLabel} widget`}
                  draggable={editing}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  data-testid={`widget-${widget.widgetType}`}
                >
                  <Card className={`h-full transition-all ${editing ? "ring-2 ring-primary/20 hover:ring-primary/40" : "hover:shadow-md"}`}>
                    {editing && (
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveWidget(index, "up")}
                          disabled={index === 0}
                          data-testid={`button-move-up-${widget.widgetType}`}
                          aria-label={`Move ${widgetLabel} up`}
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
                          aria-label={`Move ${widgetLabel} down`}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleWidget(index)}
                          data-testid={`button-toggle-${widget.widgetType}`}
                          aria-label={widget.visible ? `Hide ${widgetLabel}` : `Show ${widgetLabel}`}
                        >
                          {widget.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeWidget(index)}
                          data-testid={`button-remove-${widget.widgetType}`}
                          aria-label={`Remove ${widgetLabel}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <GripVertical className="h-4 w-4 text-muted-foreground ml-0.5" aria-hidden="true" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {widgetLabel}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {widget.visible ? <WidgetComponent user={user} /> : (
                        <p className="text-xs text-muted-foreground italic">{t("dashboard.widgetHidden")}</p>
                      )}
                    </CardContent>
                  </Card>
                </article>
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function WelcomeWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("dashboard.greeting.morning") : hour < 17 ? t("dashboard.greeting.afternoon") : t("dashboard.greeting.evening");
  const tierLabel: Record<string, string> = {
    free: t("dashboard.tier.free"),
    rpn: t("dashboard.tier.rpn"),
    rn: t("dashboard.tier.rn"),
    np: t("dashboard.tier.np"),
    admin: t("dashboard.tier.admin"),
  };

  return (
    <div data-testid="widget-content-welcome">
      <p className="text-lg font-semibold mb-1">{greeting}, {user.username}!</p>
      <p className="text-sm text-muted-foreground mb-4">
        {t("dashboard.plan")} <span className="font-medium text-foreground">{tierLabel[user.tier] || user.tier}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="default" onClick={() => navigate("/lessons")} data-testid="button-go-lessons">
          <BookOpen className="h-4 w-4 mr-1.5" /> {t("dashboard.goLessons")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/flashcards")} data-testid="button-go-flashcards">
          <Brain className="h-4 w-4 mr-1.5" /> {t("dashboard.goFlashcards")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/mock-exams")} data-testid="button-go-mock-exams">
          <ClipboardList className="h-4 w-4 mr-1.5" /> {t("dashboard.goMockExams")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/question-of-the-day")} data-testid="button-go-qotd">
          <Target className="h-4 w-4 mr-1.5" /> {t("dashboard.goQotd")}
        </Button>
      </div>
    </div>
  );
}

function ProgressWidget({ user }: { user: any }) {
  const [progress, setProgress] = useState<any[]>([]);
  const [, navigate] = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    fetch(`/api/progress/${user.id}`)
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, [user.id]);

  const completed = progress.filter((p: any) => p.completed).length;
  const total = progress.length || 1;
  const pct = Math.round((completed / total) * 100);

  if (progress.length === 0) {
    return (
      <div className="text-center py-4" data-testid="widget-content-progress-empty">
        <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">{t("dashboard.progressEmpty")}</p>
        <Button size="sm" variant="link" onClick={() => navigate("/lessons")} data-testid="button-progress-browse">
          {t("dashboard.progressBrowse")} <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div data-testid="widget-content-progress">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative h-16 w-16 flex-shrink-0" role="img" aria-label={`${pct}% complete`}>
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
              className="text-primary transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{pct}%</span>
        </div>
        <div>
          <p className="text-2xl font-bold">{completed}</p>
          <p className="text-xs text-muted-foreground">{t("dashboard.lessonsCompleted")}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <span>{total - completed} {t("dashboard.lessonsLeft")}</span>
      </div>
    </div>
  );
}

function RecentLessonsWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const { t } = useI18n();
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
        <p className="text-sm text-muted-foreground mb-2">{t("dashboard.recentEmpty")}</p>
        <Button size="sm" variant="link" onClick={() => navigate("/lessons")} data-testid="button-recent-browse">
          {t("dashboard.recentBrowse")} <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5" data-testid="widget-content-recent">
      {progress.map((p: any, i: number) => (
        <button
          key={i}
          className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors text-left"
          onClick={() => navigate(`/lessons/${p.lessonId || ""}`)}
          data-testid={`link-recent-lesson-${i}`}
          aria-label={`Continue ${p.lessonId || "lesson"}`}
        >
          {p.completed ? (
            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
          ) : (
            <PlayCircle className="h-4 w-4 text-primary flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {(p.lessonId || "Lesson").replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
            </p>
            <p className="text-xs text-muted-foreground">{p.completed ? t("dashboard.completed") : t("dashboard.inProgress")}</p>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        </button>
      ))}
    </div>
  );
}

function QuickLinksWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const links = [
    { label: t("dashboard.quickMedMath"), icon: FlaskConical, path: "/med-math", desc: t("dashboard.quickMedMathDesc") },
    { label: t("dashboard.quickLabValues"), icon: Activity, path: "/lab-values", desc: t("dashboard.quickLabValuesDesc") },
    { label: t("dashboard.quickClinicalClarity"), icon: Stethoscope, path: "/clinical-clarity", desc: t("dashboard.quickClinicalClarityDesc") },
    { label: t("dashboard.quickQuestionBank"), icon: ClipboardList, path: "/question-bank", desc: t("dashboard.quickQuestionBankDesc") },
    { label: t("dashboard.quickPharmacology"), icon: Pill, path: "/flashcards", desc: t("dashboard.quickPharmacologyDesc") },
    { label: t("dashboard.quickBlog"), icon: FileText, path: "/blog", desc: t("dashboard.quickBlogDesc") },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" data-testid="widget-content-quick-links">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.path}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg border hover:bg-muted hover:border-primary/30 transition-all text-center group"
            onClick={() => navigate(link.path)}
            data-testid={`link-quick-${link.path.slice(1)}`}
            aria-label={`${link.label}: ${link.desc}`}
          >
            <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium leading-tight">{link.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ExamStatsWidget({ user }: { user: any }) {
  const [stats, setStats] = useState<any[]>([]);
  const [, navigate] = useLocation();
  const { t } = useI18n();

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
        <p className="text-sm text-muted-foreground mb-2">{t("dashboard.examEmpty")}</p>
        <Button size="sm" variant="link" onClick={() => navigate("/mock-exams")} data-testid="button-exam-start">
          {t("dashboard.examStart")} <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    );
  }

  const avgScore = Math.round(stats.reduce((sum, s) => sum + (s.score || 0), 0) / stats.length);
  const bestScore = Math.max(...stats.map((s) => s.score || 0));

  return (
    <div data-testid="widget-content-exam-stats">
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 rounded-lg bg-primary/5">
          <p className="text-2xl font-bold text-primary">{avgScore}%</p>
          <p className="text-[10px] text-muted-foreground">{t("dashboard.examAverage")}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-green-50">
          <p className="text-2xl font-bold text-green-600">{bestScore}%</p>
          <p className="text-[10px] text-muted-foreground">{t("dashboard.examBest")}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted">
          <p className="text-2xl font-bold">{stats.length}</p>
          <p className="text-[10px] text-muted-foreground">{t("dashboard.examTaken")}</p>
        </div>
      </div>
      <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/mock-exams")} data-testid="button-view-exams">
        <BarChart3 className="h-4 w-4 mr-1.5" /> {t("dashboard.examViewAll")}
      </Button>
    </div>
  );
}

function StudyStreakWidget({ user }: { user: any }) {
  const [progress, setProgress] = useState<any[]>([]);
  const { t } = useI18n();

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

  const dayLabels = [t("dashboard.daySun"), t("dashboard.dayMon"), t("dashboard.dayTue"), t("dashboard.dayWed"), t("dashboard.dayThu"), t("dashboard.dayFri"), t("dashboard.daySat")];

  return (
    <div data-testid="widget-content-streak">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-bold">{progress.length}</p>
          <p className="text-xs text-muted-foreground">{t("dashboard.streakTotal")}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-semibold">{t("dashboard.streakActive")}</span>
        </div>
      </div>
      <div className="flex justify-between gap-1" role="group" aria-label={t("dashboard.weeklyActivity")}>
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isToday
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground"
                }`}
                aria-label={`${dayLabels[d.getDay()]} ${d.getDate()}${isToday ? ` (${t("dashboard.today")})` : ""}`}
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
  const { t } = useI18n();

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
        <p className="text-sm text-muted-foreground mb-2">{t("dashboard.flashcardEmpty")}</p>
        <Button size="sm" variant="link" onClick={() => navigate("/profile")} data-testid="button-flashcard-create">
          {t("dashboard.flashcardCreate")} <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="widget-content-flashcard-review">
      {cards.map((card: any, i: number) => (
        <div key={i} className="p-2.5 rounded-lg bg-muted/60 border border-transparent hover:border-primary/20 transition-colors">
          <p className="text-sm font-medium truncate">{card.question}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{card.category || t("dashboard.flashcardGeneral")}</p>
        </div>
      ))}
      <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => navigate("/flashcards")} data-testid="button-study-flashcards">
        <Bookmark className="h-4 w-4 mr-1.5" /> {t("dashboard.flashcardStudyAll")}
      </Button>
    </div>
  );
}

function ClinicalToolsWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const tools = [
    { label: t("dashboard.clinicalFirstAction"), path: "/first-action-simulator", icon: Target, desc: t("dashboard.clinicalFirstActionDesc") },
    { label: t("dashboard.clinicalIV"), path: "/iv-complications-simulator", icon: Activity, desc: t("dashboard.clinicalIVDesc") },
    { label: t("dashboard.clinicalSafety"), path: "/safety-hazard-simulator", icon: Stethoscope, desc: t("dashboard.clinicalSafetyDesc") },
    { label: t("dashboard.clinicalDeteriorating"), path: "/deteriorating-patient-simulator", icon: TrendingUp, desc: t("dashboard.clinicalDeterioratingDesc") },
  ];

  return (
    <div className="grid grid-cols-2 gap-2" data-testid="widget-content-clinical-tools">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.path}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg border hover:bg-muted hover:border-primary/30 transition-all text-center group"
            onClick={() => navigate(tool.path)}
            data-testid={`link-clinical-${tool.path.slice(1)}`}
            aria-label={`${tool.label}: ${tool.desc}`}
          >
            <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium leading-tight">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function RecommendedWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const [progress, setProgress] = useState<any[]>([]);
  const [examStats, setExamStats] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/progress/${user.id}`).then((r) => r.json()).then(setProgress).catch(() => {});
    fetch(`/api/mock-exams/history/${user.id}`).then((r) => r.json()).then(setExamStats).catch(() => {});
  }, [user.id]);

  const completedCount = progress.filter((p: any) => p.completed).length;
  const hasExams = examStats.length > 0;
  const avgScore = hasExams ? Math.round(examStats.reduce((s, e) => s + (e.score || 0), 0) / examStats.length) : 0;

  const recommendations: { text: string; action: string; path: string; icon: any; priority: number }[] = [];

  if (completedCount === 0) {
    recommendations.push({ text: t("dashboard.recStartLesson"), action: t("dashboard.recBeginLearning"), path: "/lessons", icon: BookOpen, priority: 1 });
  }
  if (!hasExams) {
    recommendations.push({ text: t("dashboard.recTakeMock"), action: t("dashboard.recStartMockExam"), path: "/mock-exams", icon: ClipboardList, priority: 2 });
  } else if (avgScore < 70) {
    recommendations.push({ text: t("dashboard.recFocusWeak"), action: t("dashboard.recReviewLessons"), path: "/lessons", icon: BookOpen, priority: 1 });
  }
  recommendations.push({ text: t("dashboard.recQotd"), action: t("dashboard.recTryQotd"), path: "/question-of-the-day", icon: Target, priority: 3 });
  if (completedCount > 0 && completedCount < 10) {
    recommendations.push({ text: t("dashboard.recKeepMomentum"), action: t("dashboard.recContinue"), path: "/lessons", icon: TrendingUp, priority: 2 });
  }
  recommendations.push({ text: t("dashboard.recTrySimulator"), action: t("dashboard.recSimulate"), path: "/first-action-simulator", icon: Stethoscope, priority: 4 });

  const sorted = recommendations.sort((a, b) => a.priority - b.priority).slice(0, 3);

  return (
    <div data-testid="widget-content-recommended">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sorted.map((rec, i) => {
          const Icon = rec.icon;
          return (
            <button
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted hover:border-primary/30 transition-all text-left group"
              onClick={() => navigate(rec.path)}
              data-testid={`link-recommendation-${i}`}
            >
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug mb-1">{rec.text}</p>
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  {rec.action} <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
