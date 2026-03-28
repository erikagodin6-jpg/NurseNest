import { ContentStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";
import { ExamPracticeClient } from "@/components/student/exam-practice-client";
import { SubscriptionPaywall } from "@/components/student/subscription-paywall";

export default async function ExamsPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";
  const entitlement = await resolveEntitlementForPage(userId);

  if (entitlement === "error") {
    return (
      <p className="nn-card p-6 text-sm text-muted">
        We could not verify your subscription right now. Refresh the page or try again in a moment.
      </p>
    );
  }

  if (!entitlement.hasAccess) {
    const snap = userId ? await getFreemiumSnapshot(userId) : null;
    return (
      <main>
        <h1 className="text-3xl font-bold">Practice exams</h1>
        <p className="mt-2 text-sm text-muted">
          Soft gate: you are seeing what exams unlock. Hard gate: starting an attempt requires an active subscription—enforced on the
          server.
        </p>
        <div className="mt-6">
          <SubscriptionPaywall
            context="exams"
            freemiumRemainingQuestions={snap?.questionRemaining ?? 0}
          />
        </div>
        <section className="nn-card mt-6 p-4 text-sm text-muted">
          <p className="font-semibold text-foreground">After you subscribe</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Full-length mocks with server-filtered item pools</li>
            <li>Score history for readiness tracking</li>
            <li>CAT-style sessions when enabled for your tier</li>
          </ul>
        </section>
      </main>
    );
  }

  let attempts: { id: string; score: number; total: number; createdAt: Date }[] = [];
  try {
    attempts = await prisma.examAttempt.findMany({
      where: { userId },
      select: { id: true, score: true, total: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch {
    safeServerLog("page_exams", "attempts_find_failed", {});
    return (
      <main>
        <h1 className="text-3xl font-bold">Practice exams</h1>
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          Past attempts could not be loaded. Refresh or try again shortly.
        </p>
      </main>
    );
  }

  const last = attempts[0];
  const pct = last && last.total > 0 ? Math.round((last.score / last.total) * 100) : null;

  const userRow = await prisma.user.findUnique({
    where: { id: userId },
    select: { country: true, tier: true },
  });
  const primaryExam = userRow
    ? await prisma.exam.findFirst({
        where: {
          status: ContentStatus.PUBLISHED,
          country: userRow.country,
          tier: userRow.tier,
        },
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true },
      })
    : null;

  return (
    <main>
      <h1 className="text-3xl font-bold">Practice exams</h1>
      <p className="mt-2 text-muted">Exam generation uses server-side filtered question pools only.</p>
      {pct !== null ? (
        <p className="mt-3 text-sm font-medium text-foreground">
          Latest attempt: {last?.score}/{last?.total} ({pct}%) — {pct >= 75 ? "you are approaching passing-band practice." : "add timed blocks this week to lift accuracy."}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">No attempts yet—start a mock when your question bank accuracy feels stable.</p>
      )}
      <aside className="nn-card mt-4 border-primary/15 bg-primary/5 p-4 text-sm text-muted">
        <p className="font-semibold text-foreground">Report card & analytics</p>
        <p className="mt-1">Use exam results plus question bank misses to steer your next three study sessions.</p>
      </aside>
      {primaryExam ? (
        <ExamPracticeClient examId={primaryExam.id} examTitle={primaryExam.title} />
      ) : (
        <p className="mt-4 text-sm text-muted">
          No published exam is configured for your country and tier yet. Use the question bank for practice.
        </p>
      )}
      <div className="mt-4 space-y-3">
        {attempts.map((attempt) => (
          <article className="nn-card p-4" key={attempt.id}>
            <p className="font-semibold">
              Score: {attempt.score}/{attempt.total}
            </p>
            <p className="text-sm text-muted">{attempt.createdAt.toISOString()}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
