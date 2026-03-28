import { auth } from "@/lib/auth";
import { RefreshRetryButton } from "@/components/student/refresh-retry-button";
import { questionLearnerPoolWhere } from "@/lib/entitlements/content-access-scope";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";
import { FreemiumQuestionPeek } from "@/components/student/freemium-question-peek";
import { SubscriptionPaywall } from "@/components/student/subscription-paywall";

export default async function QuestionBankPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";
  const entitlement = await resolveEntitlementForPage(userId);

  if (entitlement === "error") {
    return (
      <div className="nn-card p-6 text-sm text-muted">
        <p>We couldn’t verify your subscription just now. Try again in a moment.</p>
        <RefreshRetryButton />
      </div>
    );
  }

  if (!entitlement.hasAccess) {
    const snap = userId ? await getFreemiumSnapshot(userId) : null;
    return (
      <main>
        <h1 className="text-3xl font-bold">Question bank</h1>
        <p className="mt-2 text-sm text-muted">
          CAT-style practice, SATA / NGN-style items, and full rationales are included with an active plan.
        </p>
        <div className="mt-6">
          <SubscriptionPaywall
            context="questions"
            freemiumRemainingQuestions={snap?.questionRemaining ?? 0}
          />
        </div>
        {userId && snap && snap.questionRemaining > 0 ? <FreemiumQuestionPeek /> : null}
      </main>
    );
  }

  let questions: { id: string; stem: string; questionType: string; rationale: string }[] = [];
  try {
    const raw = await prisma.question.findMany({
      where: questionLearnerPoolWhere(entitlement),
      select: { id: true, stem: true, questionType: true, rationale: true },
      orderBy: { updatedAt: "desc" },
      take: 15,
    });
    const maxRationale = 360;
    questions = raw.map((q) => ({
      ...q,
      rationale:
        q.rationale.length > maxRationale ? `${q.rationale.slice(0, maxRationale).trim()}…` : q.rationale,
    }));
  } catch {
    safeServerLog("page_questions", "prisma_find_failed", {});
    return (
      <main>
        <h1 className="text-3xl font-bold">Question bank</h1>
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          Questions could not be loaded. Please refresh or try again shortly.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="text-3xl font-bold">Question bank</h1>
      <p className="mt-2 text-sm text-muted">
        Includes MCQ, SATA, and exam-style pacing—rationales stay visible after each review block.
      </p>
      <aside className="nn-card mt-4 border-primary/15 bg-primary/5 p-4 text-sm text-muted">
        <p className="font-semibold text-foreground">Value surfacing</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>NGN-style judgment stems where published in your pool</li>
          <li>Category tags for analytics and weak-area review</li>
          <li>Pair with mock exams to stress-test stamina</li>
        </ul>
      </aside>
      {questions.length === 0 ? (
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          No questions match your region and tier yet. If you expect content here, confirm your profile country/tier or contact support.
        </p>
      ) : null}
      <div className="mt-4 space-y-3">
        {questions.map((question) => (
          <article className="nn-card p-4" key={question.id}>
            <p className="text-xs uppercase tracking-wide text-muted">{question.questionType}</p>
            <h2 className="mt-1 font-semibold">{question.stem}</h2>
            {question.rationale ? <p className="mt-2 text-sm text-muted">{question.rationale}</p> : null}
          </article>
        ))}
      </div>
    </main>
  );
}
