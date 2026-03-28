import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashTokenForStorage } from "@/lib/auth/token-crypto";
import { checkRateLimit } from "@/lib/http/rate-limit-in-memory";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

const bodySchema = z.object({
  token: z.string().min(20).max(500),
  password: z.string().min(8).max(200),
});

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * POST /api/auth/reset-password — set new password from single-use token.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`reset-pw:ip:${ip}`, { windowMs: 60 * 1000, max: 15 });
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const tokenHash = hashTokenForStorage(parsed.data.token);

  try {
    const row = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: { select: { id: true } } },
    });

    if (!row || row.usedAt || row.expiresAt < new Date()) {
      return NextResponse.json(
        {
          error: "invalid_token",
          message: "This reset link is invalid or has expired. Request a new password reset.",
        },
        { status: 400 },
      );
    }

    const passwordHash = await hash(parsed.data.password, 12);

    await prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.deleteMany({
        where: { expiresAt: { lt: new Date() } },
      });
      await tx.user.update({
        where: { id: row.userId },
        data: {
          passwordHash,
          authVersion: { increment: 1 },
        },
      });
      await tx.passwordResetToken.update({
        where: { id: row.id },
        data: { usedAt: new Date() },
      });
      await tx.passwordResetToken.deleteMany({
        where: { userId: row.userId, id: { not: row.id } },
      });
    });

    safeServerLog("auth_recovery", "password_reset_ok");
    return NextResponse.json({ ok: true, message: "Password updated. You can sign in with your new password." });
  } catch (e) {
    safeServerLogCritical("auth_recovery", "reset_password_error", {}, e);
    return NextResponse.json({ error: "Unable to reset password. Try again shortly." }, { status: 503 });
  }
}
