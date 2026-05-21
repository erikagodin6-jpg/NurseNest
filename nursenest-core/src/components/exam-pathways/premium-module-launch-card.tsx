import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Brain,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartPulse,
  LayoutGrid,
  Layers,
  LineChart,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react";
import type { PremiumHubIconId, PremiumMarketingModuleCard } from "@/components/exam-pathways/exam-pathway-hub-premium-modules";

const ICON_MAP: Record<PremiumHubIconId, LucideIcon> = {
  "book-open": BookOpen,
  layers: Layers,
  "clipboard-list": ClipboardList,
  activity: Activity,
  "flask-conical": FlaskConical,
  pill: Pill,
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  users: Users,
  "file-text": FileText,
  brain: Brain,
  "line-chart": LineChart,
  grid: LayoutGrid,
};

export function PremiumModuleLaunchCard({
  card,
  signupHref,
  pricingHref,
}: {
  card: PremiumMarketingModuleCard;
  /** Required when `card.locked` — marketing-safe auth / plan CTAs. */
  signupHref?: string;
  pricingHref?: string;
}) {
  const Icon = ICON_MAP[card.iconId] ?? BookOpen;
  const cta = card.ctaLabel ?? "Open module";
  const progress = card.progressLabel?.trim();
  const showProgressHint =
    !progress && !card.locked && (card.id === "lessons" || card.id === "progress-study-plan");

  return (
    <article
      data-testid={card.testId}
      className="group flex h-full flex-col rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-5 shadow-sm transition-colors hover:border-primary/35 focus-within:border-primary/50"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-muted-surface)] text-primary"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-[var(--theme-body-text)]">{card.title}</h3>
          {progress ? (
            <p className="mt-1 text-xs font-medium text-primary/90">{progress}</p>
          ) : showProgressHint ? (
            <p className="mt-1 text-xs text-[var(--theme-muted-text)]">Sign in to surface continue data from your dashboard.</p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--theme-body-text)]/85">{card.description}</p>
      {card.locked ? (
        <div className="mt-4 space-y-3">
          {card.lockHint ? <p className="text-xs text-[var(--theme-body-text)]/70">{card.lockHint}</p> : null}
          {signupHref && pricingHref ? (
            <div className="flex flex-wrap gap-2">
              <Link
                href={signupHref}
                className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-card-bg)]"
              >
                Sign in
              </Link>
              <Link
                href={pricingHref}
                className="inline-flex rounded-full border border-[var(--theme-card-border)] px-4 py-2 text-xs font-semibold text-[var(--theme-body-text)] transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-card-bg)]"
              >
                View plans
              </Link>
            </div>
          ) : (
            <p className="text-xs text-[var(--theme-body-text)]/60">Sign in to confirm availability for your plan and region.</p>
          )}
        </div>
      ) : card.href ? (
        <Link
          href={card.href}
          className="mt-4 inline-flex w-fit items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary/45 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-card-bg)]"
        >
          {cta}
        </Link>
      ) : null}
    </article>
  );
}
