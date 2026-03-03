import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import {
  Calendar, CheckCircle2, Clock, Target, BookOpen,
  TrendingUp, ArrowRight, GraduationCap
} from "lucide-react";

interface WidgetPlanData {
  plan?: {
    id: string;
    tier: string;
    timeframeWeeks: number;
    minutesPerDay: number;
    progressPercent: number;
    days: Array<{
      id: string;
      weekNum: number;
      dayNum: number;
      title: string;
      tasks: Array<{
        id: string;
        type: string;
        title: string;
        minutes: number;
        status: string;
      }>;
    }>;
  } | null;
  profile?: any;
  schedule?: Array<{
    id: string;
    date: string;
    phase: string;
    tasks: any[];
    completed: boolean;
    completion_rate: number;
  }>;
}

export function StudyPlanWidget({ user }: { user: any }) {
  const [, navigate] = useLocation();
  const [data, setData] = useState<WidgetPlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/study-plan?userId=${user.id}&username=${encodeURIComponent(user.username || "")}`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) {
    return (
      <Card data-testid="widget-study-plan-loading">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading study plan...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const plan = data?.plan;
  const schedule = data?.schedule || [];

  const hasPlanData = plan && plan.days && plan.days.length > 0;
  const hasScheduleData = schedule.length > 0;

  if (!hasPlanData && !hasScheduleData) {
    return (
      <Card data-testid="widget-study-plan-empty">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground mb-3">
            Get a personalized study plan based on your strengths and areas for growth.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-full"
            onClick={() => navigate("/onboarding/plan")}
            data-testid="button-widget-create-plan"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Create Study Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (hasPlanData) {
    const totalTasks = plan.days.reduce((sum, d) => sum + d.tasks.length, 0);
    const doneTasks = plan.days.reduce(
      (sum, d) => sum + d.tasks.filter((t) => t.status === "done").length,
      0
    );
    const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : plan.progressPercent || 0;

    const todayTasks = getTodayTasks(plan.days);
    const upcomingCount = plan.days.reduce(
      (sum, d) => sum + d.tasks.filter((t) => t.status === "todo").length,
      0
    );

    return (
      <Card data-testid="widget-study-plan">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Study Plan
            </CardTitle>
            <Badge variant="secondary" className="text-xs" data-testid="widget-plan-tier">
              {plan.tier.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" data-testid="widget-plan-progress">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{doneTasks} completed</span>
              <span>{upcomingCount} remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold text-primary" data-testid="widget-plan-weeks">{plan.timeframeWeeks}</p>
              <p className="text-[10px] text-muted-foreground">Weeks</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold text-primary" data-testid="widget-plan-daily-minutes">{plan.minutesPerDay}</p>
              <p className="text-[10px] text-muted-foreground">Min/Day</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold text-primary" data-testid="widget-plan-total-tasks">{totalTasks}</p>
              <p className="text-[10px] text-muted-foreground">Tasks</p>
            </div>
          </div>

          {todayTasks.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Today's Tasks
              </p>
              <div className="space-y-1.5">
                {todayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 text-sm"
                    data-testid={`widget-task-${task.id}`}
                  >
                    {task.status === "done" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0" />
                    )}
                    <span className={`truncate ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">{task.minutes}m</span>
                  </div>
                ))}
                {todayTasks.length > 3 && (
                  <p className="text-xs text-muted-foreground pl-5">+{todayTasks.length - 3} more</p>
                )}
              </div>
            </div>
          )}

          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-full"
            onClick={() => navigate("/study-plan")}
            data-testid="button-widget-view-plan"
          >
            View Full Plan
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completedDays = schedule.filter((s) => s.completed).length;
  const totalDays = schedule.length;
  const scheduleProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <Card data-testid="widget-study-plan-schedule">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Study Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium" data-testid="widget-schedule-progress">{scheduleProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${scheduleProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{completedDays}/{totalDays} days completed</p>
        </div>

        {schedule.slice(0, 3).map((day) => {
          const dayDate = day.date ? new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "";
          const taskCount = Array.isArray(day.tasks) ? day.tasks.length : 0;
          return (
            <div
              key={day.id}
              className="flex items-center gap-2 text-sm"
              data-testid={`widget-schedule-day-${day.id}`}
            >
              {day.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0" />
              )}
              <span className={`truncate ${day.completed ? "line-through text-muted-foreground" : ""}`}>
                {dayDate}
              </span>
              <Badge variant="outline" className="text-[10px] ml-auto">{taskCount} tasks</Badge>
            </div>
          );
        })}

        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-full"
          onClick={() => navigate("/study-plan")}
          data-testid="button-widget-view-schedule"
        >
          View Full Plan
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

function getTodayTasks(
  days: Array<{ dayNum: number; weekNum: number; tasks: Array<{ id: string; type: string; title: string; minutes: number; status: string }> }>
) {
  if (!days || days.length === 0) return [];
  const firstIncompleteDay = days.find((d) =>
    d.tasks.some((t) => t.status === "todo")
  );
  return firstIncompleteDay?.tasks || [];
}
