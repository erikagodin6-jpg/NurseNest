import { NextResponse } from "next/server";
import { ContentStatus } from "@prisma/client";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { validateLessonForPublish } from "@/lib/content/publish-validation";
import { prisma } from "@/lib/db";

const patchSchema = z
  .object({
    title: z.string().min(4).optional(),
    slug: z.string().min(4).optional(),
    summary: z.string().min(10).optional(),
    body: z.string().min(20).optional(),
    country: z.enum(["CA", "US"]).optional(),
    tier: z.enum(["RPN", "LVN_LPN", "RN", "NP", "ALLIED"]).optional(),
    categoryId: z.string().optional(),
    status: z.nativeEnum(ContentStatus).optional(),
    examFamily: z.enum(["NCLEX_RN", "NCLEX_PN", "REX_PN", "NP", "ALLIED", "GENERIC"]).optional(),
    difficulty: z.enum(["FOUNDATION", "INTERMEDIATE", "ADVANCED"]).nullable().optional(),
    topicTag: z.string().nullable().optional(),
    systemTag: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
    sourceNotes: z.string().nullable().optional(),
  })
  .strict();

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await ctx.params;

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const existing = await prisma.lesson.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const merged = {
    title: parsed.data.title ?? existing.title,
    summary: parsed.data.summary ?? existing.summary,
    body: parsed.data.body ?? existing.body,
  };

  const nextStatus = parsed.data.status ?? existing.status;
  if (nextStatus === ContentStatus.PUBLISHED) {
    const v = validateLessonForPublish(merged);
    if (!v.ok) return NextResponse.json({ error: "Publish validation failed", reasons: v.reasons }, { status: 400 });
  }

  const lesson = await prisma.lesson.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ lesson });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await ctx.params;
  await prisma.lesson.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
