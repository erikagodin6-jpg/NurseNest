import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/http/rate-limit-in-memory";
import { productEvent } from "@/lib/observability/product-events";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

const emptyToUndef = (v: unknown) => (v === "" || v === null ? undefined : v);

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string().min(1).max(200)),
  country: z.enum(["CA", "US"]),
  tier: z.enum(["RPN", "LVN_LPN", "RN", "NP", "ALLIED"]),
  examFocus: z.preprocess(emptyToUndef, z.string().max(120).optional()),
  studyGoal: z.preprocess(emptyToUndef, z.string().max(120).optional()),
  dailyStudyMinutes: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.number().int().min(5).max(600).optional(),
  ),
  learnerPath: z.preprocess(emptyToUndef, z.enum(["new_grad", "experienced", "career_change"]).optional()),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`signup:${ip}`, { windowMs: 60_000, max: 10 });
  if (!rl.ok) {
    productEvent("signup_rate_limited", {});
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    safeServerLog("signup", "invalid_json_body", {});
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    safeServerLog("signup", "validation_failed", {
      issueCount: parsed.error.issues.length,
      codes: parsed.error.issues
        .map((i) => i.code)
        .slice(0, 8)
        .join(","),
    });
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  let exists: { id: string } | null;
  try {
    exists = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
      select: { id: true },
    });
  } catch (e) {
    safeServerLogCritical("signup", "email_lookup_failed", { surface: "api" }, e);
    return NextResponse.json({ error: "Unable to sign up. Try again shortly." }, { status: 503 });
  }
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const { email, name, password, country, tier, examFocus, studyGoal, dailyStudyMinutes, learnerPath } = parsed.data;
  const passwordHash = await hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash,
        country,
        tier,
        role: "LEARNER",
        examFocus: examFocus ?? null,
        studyGoal: studyGoal ?? null,
        dailyStudyMinutes: dailyStudyMinutes ?? null,
        learnerPath: learnerPath ?? null,
        onboardingCompletedAt:
          examFocus && studyGoal && dailyStudyMinutes && learnerPath ? new Date() : null,
      },
    });
  } catch (e) {
    const prismaCode = e instanceof Prisma.PrismaClientKnownRequestError ? e.code : undefined;
    const prismaMeta = e instanceof Prisma.PrismaClientKnownRequestError ? e.meta : undefined;
    safeServerLogCritical(
      "signup",
      "user_create_failed",
      { surface: "api", prismaCode, prismaMeta: prismaMeta ? JSON.stringify(prismaMeta).slice(0, 400) : undefined },
      e,
    );
    if (e instanceof Error) {
      safeServerLog("signup", "user_create_failed_message", { detail: e.message.slice(0, 800) });
    }
    return NextResponse.json(
      { error: "Unable to create account. Try again shortly.", code: prismaCode ?? "unknown" },
      { status: 503 },
    );
  }

  productEvent("signup_ok", {});
  return NextResponse.json({ ok: true }, { status: 201 });
}
