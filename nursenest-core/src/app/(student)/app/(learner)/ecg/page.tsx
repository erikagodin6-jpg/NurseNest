import Link from "next/link";
import { Activity, BookOpen, Gauge, LineChart, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";
import {
  defaultExamTargetForTier,
  learnerTierAllowsEcgPrimarySurface,
} from "@/lib/ecg/ecg-learner-visibility";
import { EcgWaveformPreview } from "@/components/student/ecg/ecg-waveform-preview";

const PATH_MILESTONES = [
  { id: "m1", title: "Axis & intervals", detail: "Rate, rhythm, PR/QRS/QT scaffolding." },
  { id: "m2", title: "Ischemia patterns", detail: "ST shifts, reciprocal change, localization." },
  { id: "m3", title: "Arrhythmia triage", detail: "Blocks, ectopy, unstable tachy recognition." },
  { id: "m4", title: "Clinical closure", detail: "Tie findings to actions, monitoring, escalation." },
] as const;

export default async function EcgHubPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";
  const tier = (session?.user as { tier?: string })?.tier ?? null;
  const entitlement = await resolveEntitlementForPage(userId);

  if (entitlement === "error") {
    return (
      <p className="nn-card p-6 text-sm text-muted">
        We could not verify your subscription right now. Refresh the page or try again in a moment.
      </p>
    );
  }

  const examTarget = defaultExamTargetForTier(tier);
  const qs = `examTarget=${encodeURIComponent(examTarget)}`;
  const lessonsHref = `/app/lessons?${qs}`;
  const questionsHref = `/app/questions`;
  const studyPlanHref = `/app/study-plan?${qs}`;

  let attemptCount = 0;
  if (userId && isDatabaseUrlConfigured()) {
    try {
      attemptCount = await prisma.examAttempt.count({ where: { userId } });
    } catch {
      /* ignore */
    }
  }

  const allowSurface = learnerTierAllowsEcgPrimarySurface(tier);
  const subscribed = entitlement.hasAccess;

  if (!allowSurface) {
    return (
      <main className="space-y-6" data-testid="ecg-hub-restricted">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--theme-body-text)]">ECG workspace</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--theme-body-text)]/80">
            Dedicated rhythm interpretation drills are prioritized for RN and NP pathways. Continue cardiac
            concepts through your scoped lessons and question bank — subscription rules still apply on those
            surfaces.
          </p>
        </header>
        <section className="nn-card border-dashed border-[var(--theme-card-border)] p-6">
          <p className="text-sm text-[var(--theme-body-text)]/85">
            Your account tier ({tier ?? "unknown"}) does not surface the premium ECG hub shortcuts. This
            matches pathway configuration on public nursing hubs (RPN/PN hubs omit the ECG tile).
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={lessonsHref}
              className="inline-flex rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] px-4 py-2 text-sm font-semibold text-[var(--theme-body-text)] hover:border-primary/40"
            >
              Open lessons
            </Link>
            <Link
              href={questionsHref}
              className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              Question bank
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="space-y-8" data-testid="ecg-hub-primary">
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-[var(--theme-card-bg)] to-[var(--theme-page-bg)] p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Premium module</p>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--theme-body-text)] sm:text-4xl">
              ECG & rhythm interpretation
            </h1>
            <p className="text-sm leading-relaxed text-[var(--theme-body-text)]/85">
              Telemetry-inspired workspace: orientation lessons, paced drills, and interpretation practice tied
              to your exam target — integrated with the learner shell (not a siloed microsite).
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href={lessonsHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                ECG lessons
              </Link>
              <Link
                href={subscribed ? questionsHref : "/pricing"}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] px-4 py-2 text-sm font-semibold text-[var(--theme-body-text)] hover:border-primary/35"
              >
                <Activity className="h-4 w-4 text-primary" aria-hidden />
                Practice & drills
              </Link>
            </div>
            {!subscribed ? (
              <p className="text-xs text-[var(--theme-body-text)]/70">
                Full bank-backed rhythm drills require an active plan — preview lessons may still be available.
              </p>
            ) : null}
          </div>
          <div className="w-full min-w-[240px] max-w-md flex-1 lg:max-w-sm">
            <EcgWaveformPreview className="shadow-inner" />
            <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wide text-[var(--theme-body-text)]/55">
              Midnight-safe trace · semantic grid
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="ecg-readiness-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="ecg-readiness-heading" className="text-lg font-semibold text-[var(--theme-body-text)]">
              Readiness & adaptive focus
            </h2>
            <p className="mt-1 text-sm text-[var(--theme-body-text)]/75">
              Lightweight signals reused from your dashboard context (attempts logged, plan cadence).
            </p>
          </div>
          <Link
            href={studyPlanHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            <LineChart className="h-4 w-4" aria-hidden />
            Open study plan
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="nn-card flex flex-col border border-[var(--theme-card-border)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--theme-body-text)]">
              <Gauge className="h-4 w-4 text-primary" aria-hidden />
              Rhythm readiness snapshot
            </div>
            <p className="mt-2 flex-1 text-sm text-[var(--theme-body-text)]/80">
              {subscribed
                ? `Logged attempts: ${attemptCount}. Pair short rhythm reviews with your next question block for retention.`
                : "Activate a plan to unlock full readiness analytics tied to your question history."}
            </p>
          </div>
          <div className="nn-card flex flex-col border border-[var(--theme-card-border)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--theme-body-text)]">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              Adaptive ECG pick
            </div>
            <p className="mt-2 flex-1 text-sm text-[var(--theme-body-text)]/80">
              When cardiac domains trend weak, the learner dashboard surfaces this hub in the adaptive rail —
              same semantic card shell as other premium modules.
            </p>
            <Link href={lessonsHref} className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Start recommended lesson path
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="ecg-path-heading">
        <h2 id="ecg-path-heading" className="text-lg font-semibold text-[var(--theme-body-text)]">
          Progression path
        </h2>
        <p className="mt-1 text-sm text-[var(--theme-body-text)]/75">
          Milestones anchor domains — structure stays identical across Ocean / Blossom / Midnight themes.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {PATH_MILESTONES.map((m, i) => (
            <li
              key={m.id}
              className="nn-card flex gap-3 border border-[var(--theme-card-border)] p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--theme-body-text)]">{m.title}</h3>
                <p className="mt-1 text-sm text-[var(--theme-body-text)]/78">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ecg-drills-heading">
        <h2 id="ecg-drills-heading" className="text-lg font-semibold text-[var(--theme-body-text)]">
          Quick rhythm entry points
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="nn-card flex flex-col border border-[var(--theme-card-border)] p-5">
            <h3 className="font-semibold text-[var(--theme-body-text)]">Interpretation drills</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--theme-body-text)]/80">
              Exam-style stems with rationales — routed through the gated question bank (no bypass URLs).
            </p>
            <Link
              href={subscribed ? questionsHref : "/pricing"}
              className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {subscribed ? "Open question bank" : "View plans to unlock"}
            </Link>
          </div>
          <div className="nn-card flex flex-col border border-[var(--theme-card-border)] p-5">
            <h3 className="font-semibold text-[var(--theme-body-text)]">Waveform preview lab</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--theme-body-text)]/80">
              Visual rhythm strip practice cards use the same tokenized preview component as this hub hero.
            </p>
            <div className="mt-4">
              <EcgWaveformPreview />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
