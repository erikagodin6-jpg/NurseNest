import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateOpaqueToken, hashTokenForStorage } from "@/lib/auth/token-crypto";
import { sendPasswordResetEmail } from "@/lib/email/transactional-email";
import { checkRateLimit } from "@/lib/http/rate-limit-in-memory";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

const bodySchema = z.object({
  email: z.string().email().max(320),
});

const RESET_TTL_MS = 60 * 60 * 1000;

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

const GENERIC = {
  message:
    "If an account exists for that email, a reset link has been sent. Check your inbox and spam folder.",
};

/**
 * POST /api/auth/forgot-password — always 200 + generic message (no account enumeration).
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const rlIp = checkRateLimit(`forgot-pw:ip:${ip}`, { windowMs: 60 * 60 * 1000, max: 20 });
  if (!rlIp.ok) {
    return NextResponse.json(GENERIC, { status: 200 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(GENERIC, { status: 200 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(GENERIC, { status: 200 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const rlEmail = checkRateLimit(`forgot-pw:email:${email}`, { windowMs: 60 * 60 * 1000, max: 5 });
  if (!rlEmail.ok) {
    return NextResponse.json(GENERIC, { status: 200 });
  }

  try {
    await prisma.passwordResetToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    if (!user?.passwordHash) {
      safeServerLog("auth_recovery", "forgot_password_noop", { reason: "no_credentials_user" });
      return NextResponse.json(GENERIC, { status: 200 });
    }

    const raw = generateOpaqueToken();
    const tokenHash = hashTokenForStorage(raw);
    const expiresAt = new Date(Date.now() + RESET_TTL_MS);

    await prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.deleteMany({
        where: { userId: user.id, usedAt: null },
      });
      await tx.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });
    });

    const send = await sendPasswordResetEmail(email, raw);
    if (!send.ok) {
      safeServerLog("auth_recovery", "forgot_password_email_failed", { reason: send.reason });
      if (process.env.NODE_ENV === "development") {
        console.warn("[dev] Password reset email not sent; configure RESEND_API_KEY + EMAIL_FROM");
      }
    }
  } catch (e) {
    safeServerLogCritical("auth_recovery", "forgot_password_error", {}, e);
  }

  return NextResponse.json(GENERIC, { status: 200 });
}
