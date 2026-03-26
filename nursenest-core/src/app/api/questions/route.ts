import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlement = await resolveEntitlement((session.user as any).id);
  if (!entitlement.hasAccess) {
    return NextResponse.json({ error: "Subscription required" }, { status: 403 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(25, Math.max(5, Number(searchParams.get("pageSize") ?? "10")));

  const questions = await prisma.question.findMany({
    where: {
      country: entitlement.country as any,
      tier: entitlement.tier as any,
      published: true,
    },
    select: {
      id: true,
      stem: true,
      questionType: true,
      rationale: true,
      options: true,
      category: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return NextResponse.json({ page, pageSize, questions });
}
