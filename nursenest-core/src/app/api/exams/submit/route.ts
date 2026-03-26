import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  examId: z.string().min(5),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
});

export async function POST(req: Request) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const attempt = await prisma.examAttempt.create({
    data: {
      userId,
      examId: parsed.data.examId,
      score: parsed.data.score,
      total: parsed.data.total,
    },
  });

  return NextResponse.json({ attempt });
}
