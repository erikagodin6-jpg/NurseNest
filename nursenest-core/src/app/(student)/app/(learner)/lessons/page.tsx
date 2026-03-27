import { auth } from "@/lib/auth";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export default async function LessonsPage() {
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
    return <p className="nn-card p-6">Upgrade required to view premium lessons.</p>;
  }

  let lessons: { id: string; title: string; summary: string }[] = [];
  try {
    lessons = await prisma.lesson.findMany({
      where: lessonAccessWhere(entitlement),
      select: { id: true, title: true, summary: true },
      orderBy: { updatedAt: "desc" },
      take: 20,
    });
  } catch {
    safeServerLog("page_lessons", "prisma_find_failed", {});
    return (
      <main>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          Lessons could not be loaded. Please refresh or try again shortly.
        </p>
      </main>
    );
  }

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
            {lesson.summary ? <p className="mt-2 text-sm text-muted">{lesson.summary}</p> : null}
          </article>
        ))}
      </div>
    </main>
  );
}
