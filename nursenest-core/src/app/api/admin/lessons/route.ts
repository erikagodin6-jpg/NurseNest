import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(4),
  summary: z.string().min(10),
  body: z.string().min(20),
  country: z.enum(["CA", "US"]),
  tier: z.enum(["RPN", "LVN_LPN", "RN", "NP"]),
  categoryId: z.string().min(5),
  published: z.boolean().default(false),
});

async function ensureAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

export async function GET() {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const lessons = await prisma.lesson.findMany({
    select: { id: true, title: true, slug: true, published: true, tier: true, country: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ lessons });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const lesson = await prisma.lesson.create({ data: parsed.data });
  return NextResponse.json({ lesson }, { status: 201 });
}
