import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";

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
    return <p className="nn-card p-6">Practice exams unlock after subscription activation.</p>;
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

  return (
    <main>
      <h1 className="text-3xl font-bold">Practice exams</h1>
      <p className="mt-2 text-muted">Exam generation uses server-side filtered question pools only.</p>
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
