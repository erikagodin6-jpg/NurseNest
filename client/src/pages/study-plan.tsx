import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import {
  BookOpen, Check, ChevronDown, ChevronRight, Clock, Target,
  RefreshCw, GraduationCap, Loader2, ExternalLink, SkipForward,
  Calendar, BarChart3
} from "lucide-react";

interface PlanTask {
  id: string;
  type: string;
  domain: string;
  title: string;
  minutes: number;
  linkUrl: string | null;
  resourceId: string | null;
  status: string;
}

interface PlanDay {
  id: string;
  weekNum: number;
  dayNum: number;
  title: string;
  focusDomains: string[] | null;
  tasks: PlanTask[];
}

interface StudyPlanData {
  id: string;
  tier: string;
  timeframeWeeks: number;
  minutesPerDay: number;
  progressPercent: number;
  createdAt: string;
  days: PlanDay[];
}

export default function StudyPlanPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [plan, setPlan] = useState<StudyPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [updatingTask, setUpdatingTask] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchPlan();
  }, [user]);

  async function fetchPlan() {
    try {
      const res = await fetch(`/api/study-plan?userId=${user!.id}&username=${encodeURIComponent(user!.username)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.plan) {
          setPlan(data.plan);
        }
      }
    } catch (err) {
      console.error("Failed to fetch study plan:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTaskStatus(taskId: string, status: string) {
    setUpdatingTask(taskId);
    try {
      const res = await fetch(`/api/study-plan/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, userId: user!.id, username: user!.username }),
      });
      if (res.ok) {
        setPlan((prev) => {
          if (!prev) return prev;
          const updated = { ...prev };
          updated.days = updated.days.map((day) => ({
            ...day,
            tasks: day.tasks.map((t) =>
              t.id === taskId ? { ...t, status } : t
            ),
          }));
          const totalTasks = updated.days.reduce((sum, d) => sum + d.tasks.length, 0);
          const doneTasks = updated.days.reduce(
            (sum, d) => sum + d.tasks.filter((t) => t.status === "done").length, 0
          );
          updated.progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setUpdatingTask(null);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md border-none shadow-xl">
            <CardContent className="p-8 text-center space-y-4">
              <GraduationCap className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <p className="text-gray-500">Please log in to view your study plan.</p>
              <Button onClick={() => navigate("/login")} className="rounded-full px-8" data-testid="button-login-redirect">
                Log In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md border-none shadow-xl">
            <CardContent className="p-8 text-center space-y-4">
              <Target className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">No Study Plan Yet</h2>
              <p className="text-gray-500">
                Complete the onboarding assessment to generate your personalized study plan.
              </p>
              <Button onClick={() => navigate("/onboarding/plan")} className="rounded-full px-8" data-testid="button-create-plan">
                Create My Study Plan
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const weeks: Record<number, PlanDay[]> = {};
  plan.days.forEach((day) => {
    if (!weeks[day.weekNum]) weeks[day.weekNum] = [];
    weeks[day.weekNum].push(day);
  });
  const weekNumbers = Object.keys(weeks).map(Number).sort((a, b) => a - b);

  const totalTasks = plan.days.reduce((sum, d) => sum + d.tasks.length, 0);
  const doneTasks = plan.days.reduce((sum, d) => sum + d.tasks.filter((t) => t.status === "done").length, 0);
  const skippedTasks = plan.days.reduce((sum, d) => sum + d.tasks.filter((t) => t.status === "skipped").length, 0);

  const typeIcons: Record<string, any> = {
    lesson: BookOpen,
    qbank: Target,
    flashcards: BarChart3,
    review: RefreshCw,
  };

  const typeColors: Record<string, string> = {
    lesson: "bg-blue-100 text-blue-700",
    qbank: "bg-purple-100 text-purple-700",
    flashcards: "bg-amber-100 text-amber-700",
    review: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-study-plan-title">
                My Study Plan
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {plan.timeframeWeeks}-week plan | {plan.minutesPerDay} min/day | {plan.tier.toUpperCase()} tier
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/onboarding/plan")}
              className="rounded-full text-sm"
              data-testid="button-regenerate-plan"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Regenerate Plan
            </Button>
          </div>

          <Card className="border-none shadow-md mb-8" data-testid="card-progress-overview">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-500">{doneTasks} of {totalTasks} tasks completed</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${plan.progressPercent}%` }}
                  data-testid="progress-bar"
                />
              </div>
              <div className="flex gap-6 mt-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-gray-600">Done: {doneTasks}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span className="text-gray-600">Remaining: {totalTasks - doneTasks - skippedTasks}</span>
                </div>
                {skippedTasks > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-gray-600">Skipped: {skippedTasks}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {weekNumbers.map((weekNum) => {
              const days = weeks[weekNum].sort((a, b) => a.dayNum - b.dayNum);
              const weekTasks = days.reduce((sum, d) => sum + d.tasks.length, 0);
              const weekDone = days.reduce((sum, d) => sum + d.tasks.filter((t) => t.status === "done").length, 0);
              const isExpanded = expandedWeek === weekNum;

              return (
                <Card key={weekNum} className="border-none shadow-sm overflow-hidden" data-testid={`card-week-${weekNum}`}>
                  <button
                    onClick={() => setExpandedWeek(isExpanded ? null : weekNum)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    data-testid={`button-toggle-week-${weekNum}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Week {weekNum}</h3>
                        <p className="text-xs text-gray-400">{weekDone}/{weekTasks} tasks completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 hidden sm:block">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: weekTasks > 0 ? `${(weekDone / weekTasks) * 100}%` : "0%" }}
                        />
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      {days.map((day) => (
                        <div key={day.id} className="border-b border-gray-50 last:border-0" data-testid={`day-${day.id}`}>
                          <div className="px-5 py-3 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Day {day.dayNum}: {day.title}</span>
                              {day.focusDomains && day.focusDomains.length > 0 && (
                                <div className="flex gap-1 flex-wrap justify-end">
                                  {(day.focusDomains as string[]).slice(0, 2).map((d, i) => (
                                    <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">{d}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="divide-y divide-gray-50">
                            {day.tasks.map((task) => {
                              const TypeIcon = typeIcons[task.type] || BookOpen;
                              const colorClass = typeColors[task.type] || "bg-gray-100 text-gray-700";
                              return (
                                <div
                                  key={task.id}
                                  className={`flex items-center gap-3 px-5 py-3 ${task.status === "done" ? "opacity-60" : ""}`}
                                  data-testid={`task-${task.id}`}
                                >
                                  <button
                                    onClick={() => updateTaskStatus(task.id, task.status === "done" ? "todo" : "done")}
                                    disabled={updatingTask === task.id}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                      task.status === "done"
                                        ? "bg-primary border-primary text-white"
                                        : "border-gray-300 hover:border-primary"
                                    }`}
                                    data-testid={`button-toggle-task-${task.id}`}
                                  >
                                    {task.status === "done" && <Check className="w-3.5 h-3.5" />}
                                    {updatingTask === task.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${colorClass} text-[10px] px-1.5 py-0 border-0`}>
                                        <TypeIcon className="w-3 h-3 mr-0.5" />
                                        {task.type}
                                      </Badge>
                                      <span className={`text-sm truncate ${task.status === "done" ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                        <Clock className="w-3 h-3" /> {task.minutes} min
                                      </span>
                                      <span className="text-[10px] text-gray-400">{task.domain}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    {task.status !== "skipped" && task.status !== "done" && (
                                      <button
                                        onClick={() => updateTaskStatus(task.id, "skipped")}
                                        className="p-1 text-gray-300 hover:text-amber-500 transition-colors"
                                        title="Skip"
                                        data-testid={`button-skip-task-${task.id}`}
                                      >
                                        <SkipForward className="w-4 h-4" />
                                      </button>
                                    )}
                                    {task.linkUrl && (
                                      <button
                                        onClick={() => navigate(task.linkUrl!)}
                                        className="p-1 text-gray-300 hover:text-primary transition-colors"
                                        title="Open resource"
                                        data-testid={`button-open-task-${task.id}`}
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
