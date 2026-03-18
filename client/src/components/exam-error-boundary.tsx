import { Component, type ReactNode, type ErrorInfo, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, ArrowLeft, MessageSquare, Loader2, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { ProtectedAccessBoundary, type ProtectedRouteContext } from "@/components/protected-access-recovery";

import { useI18n } from "@/lib/i18n";
interface ExamErrorBoundaryProps {
  children: ReactNode;
  examContext?: {
    examType?: string;
    tier?: string;
    attemptId?: string;
    questionIndex?: number;
  };
}

export class ExamErrorBoundary extends Component<ExamErrorBoundaryProps, { initialized: boolean }> {
  constructor(props: ExamErrorBoundaryProps) {
    super(props);
    this.state = { initialized: true };
  }

  private getProtectedContext(): ProtectedRouteContext {
    const ctx = this.props.examContext;
    const attemptId = typeof window !== "undefined"
      ? window.location.pathname.match(/mock-exams\/([^/]+)/)?.[1] || ctx?.attemptId
      : ctx?.attemptId;

    return {
      contentCategory: "mock-exam",
      contentId: attemptId,
      examType: ctx?.examType || "mock-exam",
      tier: ctx?.tier,
      attemptId,
      questionIndex: ctx?.questionIndex,
      fallbackPath: "/mock-exams",
      label: "exam",
    };
  }

  render() {
    return (
      <ProtectedAccessBoundary context={this.getProtectedContext()}>
        {this.props.children}
      </ProtectedAccessBoundary>
    );
  }
}

export function ExamLoadingFallback() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" data-testid="exam-loading-skeleton">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-24 w-full bg-muted animate-pulse rounded-lg" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-full bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ExamEmptyState({
  tier,
  message,
  suggestion,
}: {
  tier?: string;
  message?: string;
  suggestion?: string;
}) {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4" data-testid="exam-empty-state">
      <Card className="max-w-md w-full shadow-md">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold" data-testid="text-empty-state-title">
            {message || "No questions available right now"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {suggestion || "Try selecting different filters or come back soon. We are continuously adding new content."}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/test-bank")}
              data-testid="button-empty-go-testbank"
            >
              Back to Question Bank
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => window.location.reload()}
              data-testid="button-empty-refresh"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ExamReportButton({
  examType,
  tier,
  questionId,
}: {
  examType?: string;
  tier?: string;
  questionId?: string;
}) {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleReport = async () => {
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/resilience/incident-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "exam",
          tier: tier || "unknown",
          route: window.location.pathname,
          errorMessage: `User reported problem with question ${questionId || "N/A"}`,
          browserInfo: navigator.userAgent,
          source: "user",
          additionalContext: { questionId, examType },
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      try {
        const res = await fetch("/api/exam-incident-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examType: examType || "unknown",
            tier: tier || "unknown",
            route: window.location.pathname,
            errorMessage: `User reported problem with question ${questionId || "N/A"}`,
            browserInfo: navigator.userAgent,
            additionalContext: { questionId },
          }),
        });
        if (!res.ok) throw new Error("Failed");
        setSent(true);
      } catch {
        setFailed(true);
      }
    }
    setSending(false);
  };

  if (sent) {
    return (
      <span className="text-xs text-green-600 flex items-center gap-1" data-testid="text-exam-report-sent">
        <ShieldCheck className="w-3 h-3" /> Reported
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReport}
        disabled={sending}
        className="text-xs text-muted-foreground gap-1 h-auto py-1 px-2"
        data-testid="button-report-exam-problem"
      >
        {sending ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <MessageSquare className="w-3 h-3" />
        )}
        {failed ? "Try again" : "Report a problem"}
      </Button>
      {failed && (
        <p className="text-xs text-red-500 mt-0.5">{t("components.examErrorBoundary.couldNotSendReport")}</p>
      )}
    </div>
  );
}
