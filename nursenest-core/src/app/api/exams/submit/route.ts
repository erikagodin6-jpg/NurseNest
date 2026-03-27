import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { userCanAccessExam } from "@/lib/entitlements/content-access-scope";
import { requireSubscriberSession } from "@/lib/entitlements/require-subscriber-session";
import { safeServerLog } from "@/lib/observability/safe-server-log";

const schema = z.object({
  examId: z.string().min(5),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
});

export async function POST(req: Request) {
  const gate = await requireSubscriberSession();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  let exam;
  try {
    exam = await prisma.exam.findUnique({
      where: { id: parsed.data.examId },
      select: { id: true, published: true, country: true, tier: true },
    });
  } catch {
    safeServerLog("api_exams_submit", "exam_lookup_failed", {});
    return NextResponse.json({ error: "Unable to verify exam. Try again shortly." }, { status: 503 });
  }

  if (!exam) {
    return NextResponse.json({ error: "Exam not found" }, { status: 404 });
  }

  if (!userCanAccessExam(gate.entitlement, exam)) {
    safeServerLog("api_exams_submit", "exam_forbidden", { examPublished: exam.published });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: gate.userId,
        examId: parsed.data.examId,
        score: parsed.data.score,
        total: parsed.data.total,
      },
    });
    return NextResponse.json({ attempt });
  } catch {
    safeServerLog("api_exams_submit", "attempt_create_failed", {});
    return NextResponse.json({ error: "Unable to save results. Try again shortly." }, { status: 503 });
  }
}
