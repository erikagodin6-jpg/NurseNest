import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { LocaleLink } from "@/lib/LocaleLink";
import { useAuth } from "@/lib/auth";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "nursenest-cta-bar-dismissed";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000;

type CtaContext = "questions" | "content" | "default";

function getCtaContext(pathname: string): CtaContext {
  const questionPatterns = [
    "/question", "/qbank", "/test-bank", "/mock-exam",
    "/practice-questions", "/free-practice", "/free-demo-exam",
    "/adaptive-study", "/quick-study",
  ];
  if (questionPatterns.some((p) => pathname.startsWith(p))) return "questions";

  const contentPatterns = [
    "/lesson", "/flashcard", "/lecture", "/clinical-clarity",
    "/medication-mastery", "/lab-values", "/med-math",
    "/anatomy", "/osce", "/pharmacology", "/content",
    "/blog", "/glossary", "/deck",
  ];
  if (contentPatterns.some((p) => pathname.startsWith(p))) return "content";

  return "default";
}

const CTA_CONFIG: Record<CtaContext, { text: string; href: string }> = {
  questions: { text: "Unlock 500+ Questions", href: "/pricing" },
  content: { text: "Start Free Practice", href: "/start-free" },
  default: { text: "Get Exam Ready — Try Free", href: "/start-free" },
};

const HIDDEN_ROUTES = ["/login", "/pricing", "/start-free", "/subscribe", "/admin"];

export function StickyCtaBar() {
  const { user, effectiveTier, isAdmin } = useAuth();
  const [location] = useLocation();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (Date.now() - ts < DISMISS_DURATION_MS) {
          setDismissed(true);
          return;
        }
        localStorage.removeItem(DISMISS_KEY);
      }
      setDismissed(false);
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  }, []);

  const isPaid = user && effectiveTier && effectiveTier !== "free";
  if (isPaid || isAdmin) return null;
  if (dismissed) return null;
  if (HIDDEN_ROUTES.some((r) => location.startsWith(r))) return null;

  const ctx = getCtaContext(location);
  const { text, href } = CTA_CONFIG[ctx];

  return (
    <div
      className="sticky top-0 z-[9998] w-full bg-gradient-to-r from-primary/95 to-blue-600/95 backdrop-blur-sm text-white shadow-sm"
      data-testid="sticky-cta-bar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 px-4 py-2 relative">
        <Sparkles className="w-4 h-4 flex-shrink-0 hidden sm:block" />
        <span className="text-sm font-medium truncate" data-testid="text-cta-message">
          {text}
        </span>
        <LocaleLink href={href}>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4 py-1 h-7 text-xs font-semibold bg-white text-primary hover:bg-white/90 shadow-sm"
            data-testid="button-cta-bar-action"
          >
            Get Started <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </LocaleLink>
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
          data-testid="button-cta-bar-dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
