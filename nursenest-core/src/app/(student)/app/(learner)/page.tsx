import Link from "next/link";
import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { SOCIAL_PROOF } from "@/lib/conversion/pricing-catalog";

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
  } | null = null;

  if (userId) {
    try {
      const [userRow, progressCount, incomplete, attemptsN] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { examFocus: true, studyGoal: true, dailyStudyMinutes: true },
        }),
        prisma.progress.count({ where: { userId, completed: true } }),
        prisma.progress.findFirst({
          where: { userId, completed: false },
          orderBy: { updatedAt: "desc" },
          select: { lessonId: true },
        }),
        prisma.examAttempt.count({ where: { userId } }),
      ]);
      userPrefs = userRow;
      completedLessons = progressCount;
      const lessonRow = incomplete?.lessonId
        ? await prisma.lesson.findUnique({
            where: { id: incomplete.lessonId },
            select: { title: true },
          })
        : null;
      nextLessonTitle = lessonRow?.title ?? null;
      attemptCount = attemptsN;
    } catch {
      /* keep dashboard usable */
    }
  }

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
