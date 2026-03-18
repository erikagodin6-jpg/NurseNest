import { Component, type ReactNode, type ErrorInfo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, ArrowLeft, MessageSquare, Loader2, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

import { useI18n } from "@/lib/i18n";
interface ExamErrorBoundaryProps {
  children: ReactNode;
  examContext?: {
    examType?: string;
    tier?: string;
  };
}

interface ExamErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

export class ExamErrorBoundary extends Component<ExamErrorBoundaryProps, ExamErrorBoundaryState> {
  constructor(props: ExamErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ExamErrorBoundary] Caught:", error.message, info.componentStack);
    try {
      fetch("/api/exam-incident-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examType: this.props.examContext?.examType || "unknown",
          tier: this.props.examContext?.tier || "unknown",
          route: window.location.pathname,
          errorMessage: error.message,
          browserInfo: navigator.userAgent,
        }),
      }).catch(() => {});
    } catch {}
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <ExamRecoveryUI
          error={this.state.error}
          onRetry={this.handleRetry}
          retryCount={this.state.retryCount}
          examContext={this.props.examContext}
        />
      );
    }
    return this.props.children;
  }
}

function ExamRecoveryUI({
  error,
  onRetry,
  retryCount,
  examContext,
}: {
  error: Error | null;
  onRetry: () => void;
  retryCount: number;
  examContext?: { examType?: string; tier?: string };
}) {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [reportSent, setReportSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [reportFailed, setReportFailed] = useState(false);

  const handleReport = useCallback(async () => {
    setSending(true);
    setReportFailed(false);
    try {
      const res = await fetch("/api/exam-incident-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examType: examContext?.examType || "unknown",
          tier: examContext?.tier || "unknown",
          route: window.location.pathname,
          errorMessage: error?.message || "Unknown error",
          browserInfo: navigator.userAgent,
          additionalContext: { retryCount },
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setReportSent(true);
    } catch {
      setReportFailed(true);
    }
    setSending(false);
  }, [error, examContext, retryCount]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" data-testid="exam-recovery-ui">
      <Card className="max-w-lg w-full shadow-lg border-amber-200">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground" data-testid="text-exam-error-title">
              This exam is temporarily unavailable
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We encountered an issue loading this exam. Your progress and subscription are safe.
              Please try again or go back to select a different exam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {retryCount < 3 && (
              <Button
                onClick={onRetry}
                variant="default"
                className="gap-2"
                data-testid="button-exam-retry"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                const path = window.location.pathname;
                const match = path.match(/^(\/[^/]+)\/mock-exams\//);
                navigate(match ? `${match[1]}/mock-exams` : "/mock-exams");
              }}
              className="gap-2"
              data-testid="button-exam-go-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exams
            </Button>
          </div>

          {reportSent ? (
            <p className="text-sm text-green-600 flex items-center justify-center gap-1" data-testid="text-report-sent">
              <ShieldCheck className="w-4 h-4" />
              Report received. Thank you.
            </p>
          ) : (
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReport}
                disabled={sending}
                className="gap-2 text-muted-foreground"
                data-testid="button-exam-report"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
                {reportFailed ? "Try reporting again" : "Report this problem"}
              </Button>
              {reportFailed && (
                <p className="text-xs text-red-500">{t("components.examErrorBoundary.couldNotSendReportPlease")}</p>
              )}
            </div>
          )}

          {user && (
            <p className="text-xs text-muted-foreground">
              Your account and progress are not affected.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
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
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleReport = async () => {
    setSending(true);
    setFailed(false);
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
