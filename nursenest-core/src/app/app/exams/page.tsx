import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { prisma } from "@/lib/db";

export default async function ExamsPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id || "";
  const entitlement = await resolveEntitlement(userId);

  if (!entitlement.hasAccess) {
    return <p className="nn-card p-6">Practice exams unlock after subscription activation.</p>;
  }

  const attempts = await prisma.examAttempt.findMany({
    where: { userId },
    select: { id: true, score: true, total: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

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
