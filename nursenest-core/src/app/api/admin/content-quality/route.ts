import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { runFlashcardValidation, runQuestionValidation } from "@/lib/content/content-quality-runner";
import { prisma } from "@/lib/db";

const postSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("validate_questions"),
    apply: z.boolean().default(false),
    strictTags: z.boolean().optional(),
    markWeakRationale: z.boolean().optional(),
    limit: z.number().int().min(1).max(20000).optional(),
  }),
  z.object({
    action: z.literal("validate_flashcards"),
    apply: z.boolean().default(false),
    limit: z.number().int().min(1).max(20000).optional(),
  }),
  z.object({
    action: z.literal("bulk_approve_questions"),
    ids: z.array(z.string()).min(1).max(500),
  }),
  z.object({
    action: z.literal("bulk_approve_flashcards"),
    ids: z.array(z.string()).min(1).max(500),
  }),
]);

/**
 * Admin quality workflow: review queue (GET) and validation / bulk clear (POST).
 */
export async function GET(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") === "flashcard" ? "flashcard" : "question";
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(100, Math.max(5, Number(url.searchParams.get("pageSize") ?? "25")));

  if (kind === "flashcard") {
    const where = { needsReview: true };
    const [total, rows] = await Promise.all([
      prisma.flashcard.count({ where }),
      prisma.flashcard.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          front: true,
          back: true,
          tier: true,
          examFamily: true,
          status: true,
          country: true,
        },
      }),
    ]);
    return NextResponse.json({ kind: "flashcard" as const, total, page, pageSize, rows });
  }

  const where = { needsReview: true };
  const [total, rows] = await Promise.all([
    prisma.question.count({ where }),
    prisma.question.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        stem: true,
        questionType: true,
        tier: true,
        examFamily: true,
        status: true,
        country: true,
        topicTag: true,
        systemTag: true,
      },
    }),
  ]);
  return NextResponse.json({ kind: "question" as const, total, page, pageSize, rows });
}

export async function POST(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const b = parsed.data;
  if (b.action === "validate_questions") {
    const res = await runQuestionValidation(prisma, {
      apply: b.apply,
      strictTags: b.strictTags,
      markWeakRationale: b.markWeakRationale,
      limit: b.limit,
    });
    return NextResponse.json({ ok: true, questions: res });
  }

  if (b.action === "validate_flashcards") {
    const res = await runFlashcardValidation(prisma, { apply: b.apply, limit: b.limit });
    return NextResponse.json({ ok: true, flashcards: res });
  }

  if (b.action === "bulk_approve_questions") {
    const r = await prisma.question.updateMany({
      where: { id: { in: b.ids } },
      data: { needsReview: false },
    });
    return NextResponse.json({ ok: true, updated: r.count });
  }

  const r = await prisma.flashcard.updateMany({
    where: { id: { in: b.ids } },
    data: { needsReview: false },
  });
  return NextResponse.json({ ok: true, updated: r.count });
}
