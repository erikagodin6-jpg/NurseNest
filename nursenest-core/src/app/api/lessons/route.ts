import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export async function GET(req: NextRequest) {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(20, Math.max(5, Number(req.nextUrl.searchParams.get("pageSize") ?? "10")));

  try {
    const lessons = await prisma.lesson.findMany({
      where: lessonAccessWhere(gate.entitlement),
      select: { id: true, slug: true, title: true, summary: true },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ page, pageSize, lessons });
  } catch {
    safeServerLog("api_lessons", "prisma_find_failed", { page });
    return NextResponse.json({ error: "Unable to load lessons. Try again shortly." }, { status: 503 });
  }
}
