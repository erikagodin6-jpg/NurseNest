import { auth } from "@/lib/auth";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export default async function QuestionBankPage() {
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
    return <p className="nn-card p-6">Question bank is available with an active plan.</p>;
  }

  let questions: { id: string; stem: string; questionType: string; rationale: string }[] = [];
  try {
    questions = await prisma.question.findMany({
      where: questionAccessWhere(entitlement),
      select: { id: true, stem: true, questionType: true, rationale: true },
      orderBy: { updatedAt: "desc" },
      take: 15,
    });
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
