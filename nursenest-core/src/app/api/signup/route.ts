import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/http/rate-limit-in-memory";
import { productEvent } from "@/lib/observability/product-events";

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  country: z.enum(["CA", "US"]),
  tier: z.enum(["RPN", "LVN_LPN", "RN", "NP", "ALLIED"]),
  examFocus: z.string().max(120).optional(),
  studyGoal: z.string().max(120).optional(),
  dailyStudyMinutes: z.coerce.number().int().min(5).max(600).optional(),
  learnerPath: z.enum(["new_grad", "experienced", "career_change"]).optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`signup:${ip}`, { windowMs: 60_000, max: 10 });
  if (!rl.ok) {
    productEvent("signup_rate_limited", {});
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    select: { id: true },
  });
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const { email, name, password, country, tier, examFocus, studyGoal, dailyStudyMinutes, learnerPath } = parsed.data;
  const passwordHash = await hash(password, 12);

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

  productEvent("signup_ok", {});
  return NextResponse.json({ ok: true }, { status: 201 });
}
