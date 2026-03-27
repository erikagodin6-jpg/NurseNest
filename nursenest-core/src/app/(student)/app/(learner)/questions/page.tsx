import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { prisma } from "@/lib/db";

export default async function QuestionBankPage() {
  const session = await auth();
  const entitlement = await resolveEntitlement((session?.user as any)?.id || "");

  if (!entitlement.hasAccess) {
    return <p className="nn-card p-6">Question bank is available with an active plan.</p>;
  }

  const questions = await prisma.question.findMany({
    where: questionAccessWhere(entitlement),
    select: { id: true, stem: true, questionType: true, rationale: true },
    orderBy: { updatedAt: "desc" },
    take: 15,
  });

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
            <p className="mt-2 text-sm text-muted">{question.rationale}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
