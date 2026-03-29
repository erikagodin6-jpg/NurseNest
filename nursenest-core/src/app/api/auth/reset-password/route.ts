import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPasswordResetToken } from "@/lib/password-reset-crypto";
import { safeServerLogCritical } from "@/lib/observability/safe-server-log";

export const runtime = "nodejs";

const bodySchema = z.object({
  token: z.string().min(20).max(512),
  password: z.string().min(8).max(200),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid token or password (password must be at least 8 characters)." },
      { status: 400 },
    );
  }

  const { token, password } = parsed.data;
  const tokenHash = hashPasswordResetToken(token);

  try {
    const row = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { id: true, userId: true, expiresAt: true },
    });

    if (!row || row.expiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        { ok: false, error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    const passwordHash = await hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: row.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.deleteMany({ where: { userId: row.userId } }),
    ]);

    return NextResponse.json({ ok: true, message: "Password updated. You can sign in now." });
  } catch (e) {
    safeServerLogCritical("auth", "reset_password_failed", { surface: "api" }, e);
    return NextResponse.json(
      { ok: false, error: "Unable to reset password. Try again shortly." },
      { status: 503 },
    );
  }
}
