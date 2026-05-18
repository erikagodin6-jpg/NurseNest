import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { flashcardAccessWhere } from "@/lib/entitlements/content-access-scope";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { prisma } from "@/lib/db";
import { withDatabaseFallback } from "@/lib/db/safe-database";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(30, Math.max(5, Number(req.nextUrl.searchParams.get("pageSize") ?? "12")));

  setSentryServerContext({ route: "/api/flashcards", feature: "lesson", userId });

  const entitlement = await withDatabaseFallback(() => resolveEntitlement(userId), null);

  if (!entitlement) {
    safeServerLogCritical("api_flashcards", "entitlement_resolve_failed", { page });

    return NextResponse.json({
      page,
      pageSize,
      flashcards: [],
      unavailable: true,
    });
  }

  if (!entitlement.hasAccess) {
    return NextResponse.json({ error: "Subscription required", code: "paywall" }, { status: 403 });
  }

  const flashcards = await withDatabaseFallback(
    () =>
      prisma.flashcard.findMany({
        where: flashcardAccessWhere(entitlement),
        select: {
          id: true,
          front: true,
          back: true,
          examFamily: true,
          category: { select: { name: true, slug: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    [],
  );

  return NextResponse.json({
    page,
    pageSize,
    flashcards,
    mode: "subscriber" as const,
  });
}
