import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const country = (req.nextUrl.searchParams.get("country") || "CA") as "CA" | "US";
  const tier = (req.nextUrl.searchParams.get("tier") || "RN") as "RPN" | "LVN_LPN" | "RN" | "NP";
  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(20, Math.max(5, Number(req.nextUrl.searchParams.get("pageSize") ?? "10")));

  const lessons = await prisma.lesson.findMany({
    where: { published: true, country, tier },
    select: { id: true, slug: true, title: true, summary: true },
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return NextResponse.json({ page, pageSize, lessons });
}
