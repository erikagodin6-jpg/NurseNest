import Link from "next/link";
import { Activity } from "lucide-react";
import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";
import { SOCIAL_PROOF } from "@/lib/conversion/pricing-catalog";
import {
  defaultExamTargetForTier,
  examFocusSuggestsCardiacEcg,
  learnerTierAllowsEcgPrimarySurface,
} from "@/lib/ecg/ecg-learner-visibility";
import { EcgWaveformPreview } from "@/components/student/ecg/ecg-waveform-preview";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";
  const entitlement = await resolveEntitlementForPage(userId);

  if (entitlement === "error") {
    return (
      <main className="space-y-5">
        <h1 className="text-3xl font-bold">Learner dashboard</h1>
        <section className="nn-card p-6">
          <h2 className="text-xl font-semibold">Access Status</h2>
          <p className="mt-2 text-sm text-muted">Subscription status could not be loaded. Refresh the page.</p>
        </section>
      </main>
    );
  }

  let nextLessonTitle: string | null = null;
  let completedLessons = 0;
  let attemptCount = 0;
  let userPrefs: {
    examFocus: string | null;
    studyGoal: string | null;
    dailyStudyMinutes: number | null;
    tier: string | null;
  } | null = null;

  if (userId && isDatabaseUrlConfigured()) {
    try {
      const [userRow, progressCount, incomplete, attemptsN] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { examFocus: true, studyGoal: true, dailyStudyMinutes: true, tier: true },
        }),
        prisma.progress.count({ where: { userId, completed: true } }),
        prisma.progress.findFirst({
          where: { userId, completed: false },
          orderBy: { updatedAt: "desc" },
          select: { lessonId: true },
        }),
        prisma.examAttempt.count({ where: { userId } }),
      ]);
      userPrefs = userRow
        ? {
            examFocus: userRow.examFocus,
            studyGoal: userRow.studyGoal,
            dailyStudyMinutes: userRow.dailyStudyMinutes,
            tier: userRow.tier,
          }
        : null;
      completedLessons = progressCount;
      const lessonRow = incomplete?.lessonId
        ? await prisma.contentItem.findFirst({
            where: { id: incomplete.lessonId, type: "lesson" },
            select: { title: true },
          })
        : null;
      nextLessonTitle = lessonRow?.title ?? null;
      attemptCount = attemptsN;
    } catch {
      /* keep dashboard usable */
    }
  }

  const tier = userPrefs?.tier ?? (session?.user as { tier?: string })?.tier ?? null;
  const examTargetQs = `examTarget=${encodeURIComponent(defaultExamTargetForTier(tier))}`;
  const showEcgSurfaces = learnerTierAllowsEcgPrimarySurface(tier);
  const showAdaptiveEcgRail =
    showEcgSurfaces &&
    entitlement.hasAccess &&
    (examFocusSuggestsCardiacEcg(userPrefs?.examFocus ?? null) || attemptCount > 0);

  return (
    <main className="space-y-5">
      <h1 className="text-3xl font-bold">Learner dashboard</h1>
      <p className="text-sm text-muted">{SOCIAL_PROOF.passRateLine}</p>

      <section className="nn-card p-6">
        <h2 className="text-xl font-semibold">Access status</h2>
        <p className="mt-2 text-sm text-muted">
          {entitlement.hasAccess ? "Active subscription — full bank, lessons, and mocks." : "No active subscription — previews may still be available on lessons/questions."}
        </p>
        {!entitlement.hasAccess ? (
          <Link className="mt-3 inline-block text-sm font-semibold text-primary underline" href="/pricing">
            Upgrade to unlock everything
          </Link>
        ) : null}
      </section>

      {entitlement.hasAccess ? (
        <>
          {showEcgSurfaces ? (
            <section className="nn-card p-6" aria-labelledby="dash-quick-modules-heading">
              <h2 id="dash-quick-modules-heading" className="text-xl font-semibold">
                Quick modules
              </h2>
              <p className="mt-2 text-sm text-muted">
                Same Ocean card structure as pathway hubs — token-driven colors only.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href={`/app/ecg`}
                  data-testid="dashboard-quick-ecg"
                  className="group flex flex-col rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-5 shadow-sm transition-colors hover:border-primary/30"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--theme-body-text)]">
                    <Activity className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    ECG hub
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--theme-body-text)]/82">
                    Rhythm drills, interpretation scaffolding, and progression milestones.
                  </p>
                  <span className="mt-3 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                    Open ECG workspace
                  </span>
                  <div className="mt-4">
                    <EcgWaveformPreview />
                  </div>
                </Link>
              </div>
            </section>
          ) : null}

          {showAdaptiveEcgRail ? (
            <section className="nn-card border border-primary/15 bg-primary/[0.04] p-6" data-testid="dashboard-adaptive-ecg">
              <h2 className="text-xl font-semibold text-[var(--theme-body-text)]">Adaptive suggestion</h2>
              <p className="mt-2 text-sm text-[var(--theme-body-text)]/80">
                Cardiac interpretation benefits from short, frequent ECG passes alongside your bank work.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
                  href={`/app/ecg`}
                >
                  Go to ECG hub
                </Link>
                <Link
                  className="inline-flex rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] px-4 py-2 text-sm font-semibold text-[var(--theme-body-text)] hover:border-primary/35"
                  href={`/app/lessons?${examTargetQs}`}
                >
                  Cardiac lessons
                </Link>
              </div>
            </section>
          ) : null}

          <section className="nn-card p-6">
            <h2 className="text-xl font-semibold">Continue where you left off</h2>
            {nextLessonTitle ? (
              <p className="mt-2 text-sm text-muted">
                Next open lesson: <span className="font-medium text-foreground">{nextLessonTitle}</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">Pick a lesson or jump to the question bank for a timed block.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50" href="/app/lessons">
                Open lessons
              </Link>
              <Link className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50" href="/app/questions">
                Question bank
              </Link>
              <Link className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary" href="/app/exams">
                Mock exams
              </Link>
            </div>
          </section>

          <section className="nn-card p-6">
            <h2 className="text-xl font-semibold">Progress snapshot</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
              <li>Lessons completed: {completedLessons}</li>
              <li>Mock exam attempts logged: {attemptCount}</li>
              <li>Weak-area nudges: review your latest mock score on the exams page.</li>
            </ul>
          </section>

          <section className="nn-card p-6">
            <h2 className="text-xl font-semibold">Features to use this week</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
              <li>CAT / adaptive-style practice where enabled for your tier</li>
              <li>SATA and NGN-style judgment stems in the question bank</li>
              <li>Full rationales after each block</li>
              <li>Exam report card on the exams page</li>
            </ul>
          </section>
        </>
      ) : null}

      {userPrefs && (userPrefs.examFocus || userPrefs.studyGoal || userPrefs.dailyStudyMinutes) ? (
        <section className="nn-card p-6">
          <h2 className="text-xl font-semibold">Your onboarding targets</h2>
          <ul className="mt-2 text-sm text-muted">
            {userPrefs.examFocus ? <li>Exam focus: {userPrefs.examFocus}</li> : null}
            {userPrefs.studyGoal ? <li>Goal: {userPrefs.studyGoal}</li> : null}
            {userPrefs.dailyStudyMinutes ? <li>Daily cadence: ~{userPrefs.dailyStudyMinutes} minutes</li> : null}
          </ul>
          <p className="mt-2 text-xs text-muted">We will use this to prioritize recommendations as the product evolves.</p>
        </section>
      ) : null}
    </main>
  );
}
