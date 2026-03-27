import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { prisma } from "@/lib/db";

export default async function LessonsPage() {
  const session = await auth();
  const entitlement = await resolveEntitlement((session?.user as any)?.id || "");

  if (!entitlement.hasAccess) {
    return <p className="nn-card p-6">Upgrade required to view premium lessons.</p>;
  }

  const lessons = await prisma.lesson.findMany({
    where: lessonAccessWhere(entitlement),
    select: { id: true, title: true, summary: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <main>
      <h1 className="text-3xl font-bold">Lessons</h1>
      {lessons.length === 0 ? (
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          No lessons match your region and tier yet. If you expect content here, confirm your profile country/tier or contact support.
        </p>
      ) : null}
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
