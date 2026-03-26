import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  stem: z.string().min(10),
  rationale: z.string().min(10),
  options: z.array(z.string()).min(2),
  answerKey: z.array(z.string()).min(1),
  questionType: z.enum(["MCQ", "SATA"]),
  country: z.enum(["CA", "US"]),
  tier: z.enum(["RPN", "LVN_LPN", "RN", "NP"]),
  categoryId: z.string().min(5),
});

async function ensureAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

export async function GET() {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const questions = await prisma.question.findMany({
    select: { id: true, stem: true, published: true, tier: true, country: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ questions });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const question = await prisma.question.create({ data: parsed.data });
  return NextResponse.json({ question }, { status: 201 });
}
