import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { prisma } from "@/lib/db";

export default async function LessonsPage() {
  const session = await auth();
  const entitlement = await resolveEntitlement((session?.user as any)?.id || "");

  if (!entitlement.hasAccess) {
    return <p className="nn-card p-6">Upgrade required to view premium lessons.</p>;
  }

  const lessons = await prisma.lesson.findMany({
    where: {
      published: true,
      country: entitlement.country as any,
      tier: entitlement.tier as any,
    },
    select: { id: true, title: true, summary: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <main>
      <h1 className="text-3xl font-bold">Lessons</h1>
      <div className="mt-4 grid gap-4">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="nn-card p-5">
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="mt-2 text-sm text-muted">{lesson.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
