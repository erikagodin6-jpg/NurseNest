import { NextResponse } from "next/server";
import { ContentStatus, QuestionType } from "@prisma/client";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { stemHash } from "@/lib/content/stem-hash";
import { validateQuestionForPublish } from "@/lib/content/publish-validation";
import { prisma } from "@/lib/db";

const patchSchema = z
  .object({
    stem: z.string().min(10).optional(),
    rationale: z.string().min(10).optional(),
    options: z.array(z.union([z.string(), z.number()])).optional(),
    answerKey: z.array(z.union([z.string(), z.number()])).optional(),
    questionType: z.enum(["MCQ", "SATA", "NGN_CASE", "ORDERING", "FIB_NUMERIC"]).optional(),
    country: z.enum(["CA", "US"]).optional(),
    tier: z.enum(["RPN", "LVN_LPN", "RN", "NP", "ALLIED"]).optional(),
    categoryId: z.string().optional(),
    status: z.nativeEnum(ContentStatus).optional(),
    examFamily: z.enum(["NCLEX_RN", "NCLEX_PN", "REX_PN", "NP", "ALLIED", "GENERIC"]).optional(),
    difficulty: z.enum(["FOUNDATION", "INTERMEDIATE", "ADVANCED"]).nullable().optional(),
    topicTag: z.string().nullable().optional(),
    systemTag: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
    lessonId: z.string().nullable().optional(),
    sourceNotes: z.string().nullable().optional(),
    needsReview: z.boolean().optional(),
  })
  .strict();

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await ctx.params;

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const merged = {
    stem: parsed.data.stem ?? existing.stem,
    rationale: parsed.data.rationale ?? existing.rationale,
    questionType: (parsed.data.questionType ?? existing.questionType) as QuestionType,
    options: parsed.data.options ?? (existing.options as unknown[]),
    answerKey: parsed.data.answerKey ?? (existing.answerKey as unknown[]),
  };

  const nextStatus = parsed.data.status ?? existing.status;
  if (nextStatus === ContentStatus.PUBLISHED) {
    const v = validateQuestionForPublish({
      stem: merged.stem,
      rationale: merged.rationale,
      questionType: merged.questionType,
      options: merged.options,
      answerKey: merged.answerKey,
    });
    if (!v.ok) return NextResponse.json({ error: "Publish validation failed", reasons: v.reasons }, { status: 400 });
  }

  const d = parsed.data;
  const question = await prisma.question.update({
    where: { id },
    data: {
      stem: d.stem,
      rationale: d.rationale,
      options: d.options,
      answerKey: d.answerKey,
      questionType: d.questionType as QuestionType | undefined,
      country: d.country,
      tier: d.tier,
      categoryId: d.categoryId,
      status: d.status,
      examFamily: d.examFamily,
      difficulty: d.difficulty ?? undefined,
      topicTag: d.topicTag ?? undefined,
      systemTag: d.systemTag ?? undefined,
      tags: d.tags,
      lessonId: d.lessonId ?? undefined,
      sourceNotes: d.sourceNotes ?? undefined,
      needsReview: d.needsReview,
      ...(d.stem !== undefined ? { stemHash: stemHash(d.stem) } : {}),
    },
  });

  return NextResponse.json({ question });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await ctx.params;
  try {
    await prisma.question.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
