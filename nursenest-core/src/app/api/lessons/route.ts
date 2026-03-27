import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { lessonAccessWhere } from "@/lib/entitlements/content-access-scope";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlement = await resolveEntitlement(userId);
  if (!entitlement.hasAccess) {
    return NextResponse.json({ error: "Subscription required" }, { status: 403 });
  }

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(20, Math.max(5, Number(req.nextUrl.searchParams.get("pageSize") ?? "10")));

  const lessons = await prisma.lesson.findMany({
    where: lessonAccessWhere(entitlement),
    select: { id: true, slug: true, title: true, summary: true },
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return NextResponse.json({ page, pageSize, lessons });
}
