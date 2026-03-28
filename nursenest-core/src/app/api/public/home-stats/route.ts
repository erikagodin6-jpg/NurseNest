import { NextResponse } from "next/server";
import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [lessons, questions] = await Promise.all([
      prisma.lesson.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.question.count({ where: { status: ContentStatus.PUBLISHED } }),
    ]);
    return NextResponse.json({ lessons, questions });
  } catch {
    return NextResponse.json({ lessons: 0, questions: 0 }, { status: 200 });
  }
}
