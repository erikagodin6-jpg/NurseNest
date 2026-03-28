import Link from "next/link";
import { auth } from "@/lib/auth";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { safeServerLog } from "@/lib/observability/safe-server-log";
import { FreemiumLessonPeek } from "@/components/student/freemium-lesson-peek";
import { LessonCoverImage } from "@/components/student/lesson-cover-image";
import { SubscriptionPaywall } from "@/components/student/subscription-paywall";
import { resolveLessonCoverThumb } from "@/lib/lesson-cover-image";

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
    const snap = userId ? await getFreemiumSnapshot(userId) : null;
    return (
      <main>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="mt-2 text-sm text-muted">
          Structured modules connect pathophysiology to the same-week question practice.
        </p>
        <div className="mt-6">
          <SubscriptionPaywall context="lessons" freemiumRemainingLessons={snap?.lessonRemaining ?? 0} />
        </div>
        {userId && snap && snap.lessonRemaining > 0 ? <FreemiumLessonPeek /> : null}
      </main>
    );
  }

  let lessons: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    systemTag: string | null;
    topicTag: string | null;
    category: { slug: string };
  }[] = [];
  try {
    lessons = await prisma.lesson.findMany({
      where: lessonAccessWhere(entitlement),
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        systemTag: true,
        topicTag: true,
        category: { select: { slug: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 15,
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
      <p className="mt-2 text-sm text-muted">Continue modules, then lock in retention with the question bank the same day.</p>
      <aside className="nn-card mt-4 border-primary/15 bg-primary/5 p-4 text-sm text-muted">
        <p className="font-semibold text-foreground">Study rhythm</p>
        <p className="mt-1">Finish a lesson → apply it in 10 timed questions → review rationales. Repeat tomorrow.</p>
      </aside>
      {lessons.length === 0 ? (
        <p className="nn-card mt-4 p-6 text-sm text-muted">
          No lessons match your region and tier yet. If you expect content here, confirm your profile country/tier or contact support.
        </p>
      ) : null}
      <div className="mt-4 space-y-3">
        {lessons.map((lesson) => {
          const cover = resolveLessonCoverThumb({
            slug: lesson.slug,
            title: lesson.title,
            systemTag: lesson.systemTag,
            topicTag: lesson.topicTag,
            categorySlug: lesson.category.slug,
          });
          return (
            <Link
              key={lesson.id}
              href={`/app/lessons/${lesson.slug}`}
              className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <article className="nn-card flex gap-4 overflow-hidden p-4 transition-colors hover:border-primary/25">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                  <LessonCoverImage
                    src={cover.src}
                    srcSet={cover.srcSet}
                    alt={`Illustration for ${lesson.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{lesson.title}</h2>
                  <p className="mt-2 text-sm text-muted">{lesson.summary}</p>
                  <p className="mt-2 text-xs font-medium text-primary">Open full lesson →</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
