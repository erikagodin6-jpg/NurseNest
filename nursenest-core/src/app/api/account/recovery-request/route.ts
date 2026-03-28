import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendAccountRecoverySupportEmail } from "@/lib/email/transactional-email";
import { checkRateLimit } from "@/lib/http/rate-limit-in-memory";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

const bodySchema = z.object({
  fullName: z.string().min(2).max(200),
  details: z.string().min(10).max(8000),
  countryHint: z.string().max(40).optional(),
  tierHint: z.string().max(40).optional(),
  last4Hint: z.string().max(10).optional(),
});

const GENERIC = {
  message:
    "If your information matches our records, our team will follow up by email. This may take one to two business days.",
};

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * Support-assisted recovery when the user forgot their login email — no automatic disclosure.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`recovery-req:ip:${ip}`, { windowMs: 24 * 60 * 60 * 1000, max: 5 });
  if (!rl.ok) {
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

  try {
    const created = await prisma.accountRecoveryRequest.create({
      data: {
        fullName: parsed.data.fullName.trim(),
        details: parsed.data.details.trim(),
        countryHint: parsed.data.countryHint?.trim() || null,
        tierHint: parsed.data.tierHint?.trim() || null,
        last4Hint: parsed.data.last4Hint?.trim() || null,
      },
    });

    const preview = `${created.details.slice(0, 500)}${created.details.length > 500 ? "…" : ""}`;
    const emailed = await sendAccountRecoverySupportEmail({
      requestId: created.id,
      fullName: created.fullName,
      detailsPreview: preview,
    });
    if (!emailed.ok) {
      safeServerLog("auth_recovery", "recovery_request_email_failed", { id: created.id, reason: emailed.reason });
    }
  } catch (e) {
    safeServerLogCritical("auth_recovery", "recovery_request_error", {}, e);
  }

  return NextResponse.json(GENERIC, { status: 200 });
}
