import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { getPlatformSection } from "@shared/platform-sections";
import { Bug, X, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROBLEM_TYPES = [
  { value: "broken_link", label: "Broken link / 404" },
  { value: "empty_lesson", label: "Empty lesson / missing content" },
  { value: "wrong_answer", label: "Wrong answer / rationale issue" },
  { value: "typo", label: "Typo / grammar" },
  { value: "layout", label: "Page layout problem" },
  { value: "exam_wont_start", label: "Exam won't start" },
  { value: "flashcards_broken", label: "Flashcards missing / broken" },
  { value: "payment", label: "Payment / subscription issue" },
  { value: "translation", label: "Translation issue" },
  { value: "other", label: "Other" },
] as const;

const SEVERITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

function gtagEvent(eventName: string, params: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

function detectProblemType(path: string): string {
  const lower = path.toLowerCase();
  if (lower.includes("/flashcard")) return "flashcards_broken";
  if (lower.includes("/lesson")) return "empty_lesson";
  if (lower.includes("/exam") || lower.includes("/mock-exam") || lower.includes("/cat-exam")) return "exam_wont_start";
  if (lower.includes("/pricing") || lower.includes("/subscription") || lower.includes("/checkout")) return "payment";
  if (lower.includes("/question-bank") || lower.includes("/qbank")) return "wrong_answer";
  return "other";
}

function extractContentId(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  const contentPrefixes = ["lessons", "flashcards", "question-bank", "mock-exams", "blog", "exam"];
  for (let i = 0; i < segments.length - 1; i++) {
    if (contentPrefixes.includes(segments[i]) && segments[i + 1]) {
      return segments[i + 1];
    }
  }
  if (segments.length > 0) {
    const last = segments[segments.length - 1];
    if (last.includes("-") && last.length > 5) return last;
  }
  return null;
}

export function ReportProblemButton() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [submitting, setSubmitting] = useState(false);

  const [problemType, setProblemType] = useState("other");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [contactPermission, setContactPermission] = useState(false);

  const hiddenPaths = ["/admin", "/login", "/register"];
  const isHidden = hiddenPaths.some((p) => location.startsWith(p)) || /^\/[a-z]{2}(-[a-z]{2})?\/admin/i.test(location);

  useEffect(() => {
    if (open) {
      setProblemType(detectProblemType(location));
      setDescription("");
      setSeverity("medium");
      setContactPermission(false);
      if (user?.email) setEmail(user.email);
    }
  }, [open, location, user]);

  if (isHidden) return null;

  const handleOpen = () => {
    setOpen(true);
    gtagEvent("report_problem_clicked", {
      page_path: location,
      platform_section: getPlatformSection(location),
      event_category: "engagement",
    });
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setSubmitting(true);
    try {
      const body = {
        pageUrl: window.location.href,
        pageTitle: document.title,
        siteSection: getPlatformSection(location),
        contentId: extractContentId(location),
        userId: user?.id || null,
        problemType,
        description: description.trim(),
        email: email.trim() || null,
        severity,
        contactPermission,
        deviceType: getDeviceType(),
        browserInfo: navigator.userAgent.substring(0, 200),
        locale: navigator.language || null,
      };

      const res = await fetch("/api/problem-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to submit report");

      gtagEvent("report_problem_submitted", {
        problem_type: problemType,
        platform_section: getPlatformSection(location),
        severity,
        event_category: "engagement",
      });

      toast({ title: "Thanks — your report has been sent", description: "We'll look into this as soon as possible." });
      setOpen(false);
    } catch {
      toast({ title: "Failed to submit report", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed z-40 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 group ${
          isMobile
            ? "bottom-20 right-3 w-10 h-10 justify-center"
            : "bottom-6 right-6 px-3 py-2.5"
        }`}
        aria-label="Report a Problem"
        data-testid="button-report-problem"
      >
        <Bug className={isMobile ? "w-4 h-4" : "w-4 h-4"} />
        {!isMobile && <span className="text-xs font-medium">Report a Problem</span>}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto" data-testid="dialog-report-problem">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-primary" />
              Report a Problem
            </DialogTitle>
            <DialogDescription>
              Help us improve by reporting issues you find on this page.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="problem-type">Problem Type</Label>
              <Select value={problemType} onValueChange={setProblemType}>
                <SelectTrigger id="problem-type" data-testid="select-problem-type">
                  <SelectValue placeholder="Select problem type" />
                </SelectTrigger>
                <SelectContent>
                  {PROBLEM_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value} data-testid={`option-problem-type-${t.value}`}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the problem you encountered..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                data-testid="input-description"
              />
            </div>

            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
              />
            </div>

            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger id="severity" data-testid="select-severity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SEVERITY_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value} data-testid={`option-severity-${s.value}`}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="contact"
                checked={contactPermission}
                onCheckedChange={(checked) => setContactPermission(checked === true)}
                data-testid="checkbox-contact-permission"
              />
              <Label htmlFor="contact" className="text-sm text-muted-foreground cursor-pointer">
                You may contact me about this issue
              </Label>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
              Page: {location}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!description.trim() || submitting}
              className="w-full"
              data-testid="button-submit-report"
            >
              {submitting ? "Submitting..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
