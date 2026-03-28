import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";
import { prisma } from "@/lib/db";
import { LessonCoverImage } from "@/components/student/lesson-cover-image";
import { SubscriptionPaywall } from "@/components/student/subscription-paywall";
import { FreemiumLessonPeek } from "@/components/student/freemium-lesson-peek";
import { resolveLessonCoverThumb } from "@/lib/lesson-cover-image";

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
        <Link className="text-sm font-medium text-primary hover:underline" href="/app/lessons">
          ← Back to lessons
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Lessons</h1>
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

  const lesson = await prisma.lesson.findFirst({
    where: {
      AND: [{ slug }, lessonAccessWhere(entitlement)],
    },
    select: {
      id: true,
      title: true,
      summary: true,
      body: true,
      systemTag: true,
      topicTag: true,
      category: { select: { name: true, slug: true } },
    },
  });

  if (!lesson) {
    notFound();
  }

  const cover = resolveLessonCoverThumb({
    slug,
    title: lesson.title,
    systemTag: lesson.systemTag,
    topicTag: lesson.topicTag,
    categorySlug: lesson.category.slug,
  });

  return (
    <main>
      <Link className="text-sm font-medium text-primary hover:underline" href="/app/lessons">
        ← Back to lessons
      </Link>
      <article className="mt-6 nn-card overflow-hidden p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
            <LessonCoverImage
              src={cover.src}
              srcSet={cover.srcSet}
              alt={`Illustration for ${lesson.title}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {lesson.category.name}
            </p>
            <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
            <p className="mt-2 text-sm text-muted">{lesson.summary}</p>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-foreground">
          <div className="whitespace-pre-wrap break-words">{lesson.body}</div>
        </div>
      </article>
    </main>
  );
}
