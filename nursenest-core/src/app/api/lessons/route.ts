import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { freemiumLessonWhereForProfile, lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { getFreemiumSnapshot } from "@/lib/entitlements/freemium";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { prisma } from "@/lib/db";
import { withDatabaseFallback } from "@/lib/db/safe-database";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";
import type { CountryCode, TierCode } from "@prisma/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(20, Math.max(5, Number(req.nextUrl.searchParams.get("pageSize") ?? "10")));

  setSentryServerContext({ route: "/api/lessons", feature: "lesson", userId });

  const entitlement = await withDatabaseFallback(() => resolveEntitlement(userId), null);
  if (!entitlement) {
    safeServerLogCritical("api_lessons", "entitlement_resolve_failed", { page });
    return NextResponse.json({
      page,
      pageSize,
      lessons: [],
      mode: "unavailable" as const,
      freemiumRemainingAfterBatch: 0,
      error: "Lessons are temporarily unavailable.",
    });
  }

  if (entitlement.hasAccess) {
    const lessons = await withDatabaseFallback(
      () =>
        prisma.contentItem.findMany({
          where: lessonAccessWhere(entitlement),
          select: { id: true, slug: true, title: true, summary: true },
          orderBy: { updatedAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
      null,
    );

    if (lessons === null) {
      safeServerLogCritical("api_lessons", "prisma_find_failed", { page });
      return NextResponse.json({
        page,
        pageSize,
        lessons: [],
        mode: "subscriber" as const,
        unavailable: true,
        error: "Lessons are temporarily unavailable.",
      });
    }

    return NextResponse.json({ page, pageSize, lessons, mode: "subscriber" as const });
  }

  const user = await withDatabaseFallback(
    () =>
      prisma.user.findUnique({
        where: { id: userId },
        select: { country: true, tier: true, freeLessonOpens: true },
      }),
    null,
  );
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snap = await withDatabaseFallback(() => getFreemiumSnapshot(userId), null);
  if (!snap) {
    safeServerLogCritical("api_lessons", "freemium_snapshot_failed", { page });
    return NextResponse.json({
      page: 1,
      pageSize: 0,
      lessons: [],
      mode: "freemium" as const,
      freemiumRemainingAfterBatch: 0,
      unavailable: true,
      error: "Lesson previews are temporarily unavailable.",
    });
  }

  if (snap.lessonRemaining <= 0) {
    return NextResponse.json(
      {
        error: "Subscription required",
        code: "paywall",
        message: "Complimentary lesson previews are used up. Subscribe for full lesson depth and tracking.",
        freemiumExhausted: true,
      },
      { status: 403 },
    );
  }

  const take = Math.min(pageSize, snap.lessonRemaining);
  const where = freemiumLessonWhereForProfile(user.country as CountryCode, user.tier as TierCode);
  const lessons = await withDatabaseFallback(
    () =>
      prisma.contentItem.findMany({
        where,
        select: { id: true, slug: true, title: true, summary: true },
        orderBy: { updatedAt: "desc" },
        skip: 0,
        take,
      }),
    null,
  );

  if (lessons === null) {
    safeServerLogCritical("api_lessons", "prisma_find_failed_freemium", { page });
    return NextResponse.json({
      page: 1,
      pageSize: 0,
      lessons: [],
      mode: "freemium" as const,
      freemiumRemainingAfterBatch: snap.lessonRemaining,
      unavailable: true,
      error: "Lesson previews are temporarily unavailable.",
    });
  }

  const trimmedSummary = lessons.map((l) => ({
    ...l,
    summary:
      (l.summary ?? "").length > 220
        ? `${(l.summary ?? "").slice(0, 220).trim()}… — unlock full lessons with a subscription.`
        : l.summary ?? "",
  }));

  return NextResponse.json({
    page: 1,
    pageSize: take,
    lessons: trimmedSummary,
    mode: "freemium" as const,
    freemiumRemainingAfterBatch: snap.lessonRemaining,
  });
}
