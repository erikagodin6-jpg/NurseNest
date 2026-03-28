import { NextResponse } from "next/server";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import { prisma } from "@/lib/db";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";
import { setSentryServerContext } from "@/lib/observability/sentry-server-context";
import { withRetry } from "@/lib/resilience/with-retry";

/**
 * Lightweight bank discovery: category buckets + counts + exam-family breakdown (no question bodies).
 */
export async function GET() {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  setSentryServerContext({ route: "/api/questions/discovery", feature: "question", userId: gate.userId });

  const base = questionAccessWhere(gate.entitlement);

  try {
    const byCategory = await withRetry(() =>
      prisma.question.groupBy({
        by: ["categoryId"],
        where: base,
        _count: { id: true },
      }),
    );

    const byFamily = await withRetry(() =>
      prisma.question.groupBy({
        by: ["examFamily"],
        where: base,
        _count: { id: true },
      }),
    );

    const total = await withRetry(() =>
      prisma.question.count({ where: base }),
    );

    const categories = await withRetry(() =>
      prisma.category.findMany({
        where: { id: { in: byCategory.map((r) => r.categoryId) } },
        select: { id: true, name: true, slug: true },
      }),
    );
    const catMap = new Map(categories.map((c) => [c.id, c]));

    const buckets = byCategory
      .map((row) => {
        const c = catMap.get(row.categoryId);
        return {
          categoryId: row.categoryId,
          categoryName: c?.name ?? "Unknown",
          slug: c?.slug ?? "",
          count: row._count.id,
        };
      })
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      total,
      buckets,
      examFamily: byFamily.map((r) => ({
        examFamily: r.examFamily,
        count: r._count.id,
      })),
    });
  } catch (e) {
    safeServerLogCritical("api_questions_discovery", "failed", {}, e);
    return NextResponse.json({ error: "Unable to load discovery" }, { status: 503 });
  }
}
