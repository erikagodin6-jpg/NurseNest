import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";

export async function POST() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entitlement = await resolveEntitlement(userId);
  if (!entitlement.hasAccess) return NextResponse.json({ error: "Subscription required" }, { status: 403 });

  const questionPool = await prisma.question.findMany({
    where: questionAccessWhere(entitlement),
    select: { id: true, stem: true, options: true, questionType: true },
    take: 20,
  });

  return NextResponse.json({
    total: questionPool.length,
    questions: questionPool,
  });
}
