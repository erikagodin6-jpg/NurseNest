import Link from "next/link";
import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { SOCIAL_PROOF } from "@/lib/conversion/pricing-catalog";
import { buildRecommendations } from "@/lib/learning/recommendations";
import { computeReadiness } from "@/lib/learning/readiness";
import { buildLearningSignals } from "@/lib/learning/learning-signals";
import { parseLearningProfileRow } from "@/lib/learning/profile-shape";
import { DIFFICULTY_TIER_LABELS } from "@/lib/learning/adaptive-study-order";
import { computeExamTrend, topStrongSystems } from "@/lib/learning/performance-insights";

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

  let readinessSummary: {
    label: string;
    band: string;
    confidence: string;
    targetDifficulty: string;
    topRecommendations: { title: string; href: string }[];
    examTrend: "improving" | "steady" | "declining" | null;
    topStrength: { key: string; accuracy: number; attempts: number } | null;
  } | null = null;

  if (userId) {
    try {
      const [userRow, progressCount, incomplete, attemptsN, learningRow] = await Promise.all([
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
        entitlement.hasAccess
          ? prisma.userLearningProfile.findUnique({
              where: { userId },
              select: {
                aggregatesBySystem: true,
                aggregatesByDifficulty: true,
                aggregatesByCategory: true,
                recentQuestionIds: true,
                examScoreHistory: true,
                totalPracticeAttempts: true,
              },
            })
          : Promise.resolve(null),
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

      if (entitlement.hasAccess) {
        const profile = learningRow
          ? parseLearningProfileRow({
              aggregatesBySystem: learningRow.aggregatesBySystem,
              aggregatesByDifficulty: learningRow.aggregatesByDifficulty,
              aggregatesByCategory: learningRow.aggregatesByCategory,
              recentQuestionIds: learningRow.recentQuestionIds,
              examScoreHistory: learningRow.examScoreHistory,
              totalPracticeAttempts: learningRow.totalPracticeAttempts,
            })
          : null;
        const readiness = computeReadiness(profile);
        const recs = buildRecommendations(profile);
        const sig = buildLearningSignals(profile);
        const tier = DIFFICULTY_TIER_LABELS[sig.targetDifficulty];
        const strength = topStrongSystems(profile, { limit: 1 })[0] ?? null;
        readinessSummary = {
          label: readiness.label,
          band: readiness.band,
          confidence: readiness.confidence,
          targetDifficulty: tier.label,
          topRecommendations: recs.slice(0, 3).map((r) => ({ title: r.title, href: r.href })),
          examTrend: computeExamTrend(profile),
          topStrength: strength,
        };
      }
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
          {readinessSummary ? (
            <section className="nn-card p-6">
              <h2 className="text-xl font-semibold">Personalized readiness</h2>
              <p className="mt-2 text-sm text-muted">
                Estimated band:{" "}
                <span className="font-semibold text-foreground">{readinessSummary.label}</span>
                <span className="text-muted"> ({readinessSummary.band.replace(/_/g, " ")})</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                Confidence: {readinessSummary.confidence} — based on your scored practice and recent mock attempts. Complete
                more timed mocks to tighten this estimate.
              </p>
              <p className="mt-2 text-sm text-muted">
                Suggested difficulty focus:{" "}
                <span className="font-medium text-foreground">{readinessSummary.targetDifficulty}</span> (CAT sessions auto-balance
                with your weak areas).
              </p>
              {readinessSummary.examTrend ? (
                <p className="mt-1 text-xs text-muted">
                  Recent mock trend: <span className="font-medium text-foreground">{readinessSummary.examTrend}</span>
                </p>
              ) : null}
              {readinessSummary.topStrength ? (
                <p className="mt-1 text-xs text-muted">
                  Strong area to maintain:{" "}
                  <span className="font-medium text-foreground">
                    {readinessSummary.topStrength.key.replace(/_/g, " ")}
                  </span>{" "}
                  ({Math.round(readinessSummary.topStrength.accuracy * 100)}% over {readinessSummary.topStrength.attempts} scored items)
                </p>
              ) : null}
              {readinessSummary.topRecommendations.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm">
                  {readinessSummary.topRecommendations.map((r) => (
                    <li key={r.title}>
                      <Link className="font-medium text-primary underline" href={r.href}>
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
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
              <li>The question bank supports adaptive ordering for subscribers (weak areas first) via the same APIs you already use.</li>
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
