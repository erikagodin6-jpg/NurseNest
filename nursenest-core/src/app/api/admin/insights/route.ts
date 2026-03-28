import { NextResponse } from "next/server";
import { ContentStatus, SubscriptionStatus, TierCode } from "@prisma/client";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { ttlGet, ttlSet } from "@/lib/cache/memory-cache";
import { prisma } from "@/lib/db";

const CACHE_KEY = "admin:insights:v1";
const TTL_MS = 60_000;

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const cached = ttlGet<Record<string, unknown>>(CACHE_KEY);
  if (cached) return NextResponse.json(cached);

  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    users,
    activeSubs,
    lessonsPublished,
    questionsPublished,
    examsPublished,
    attempts7d,
    tierAgg,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({ where: { status: SubscriptionStatus.ACTIVE } }),
    prisma.contentItem.count({ where: { type: "lesson" } }),
    prisma.examQuestion.count(),
    prisma.exam.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.examAttempt.count({ where: { createdAt: { gte: since7d } } }),
    prisma.user.groupBy({
      by: ["tier"],
      _count: { tier: true },
      where: { role: "LEARNER" },
    }),
  ]);

  const tierCounts = Object.fromEntries(
    (tierAgg as { tier: TierCode; _count: { tier: number } }[]).map((r) => [r.tier, r._count.tier]),
  ) as Partial<Record<TierCode, number>>;

  const payload = {
    users,
    activeSubscriptions: activeSubs,
    content: {
      lessonsPublished,
      questionsPublished,
      examsPublished,
    },
    usage: {
      examAttemptsLast7Days: attempts7d,
    },
    learnersByTier: tierCounts,
  };

  ttlSet(CACHE_KEY, payload, TTL_MS);
  return NextResponse.json(payload);
}
