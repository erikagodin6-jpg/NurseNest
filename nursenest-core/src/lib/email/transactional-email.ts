import { safeServerLog } from "@/lib/observability/safe-server-log";

export type SendEmailResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

function appOrigin(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "http://localhost:3000";
  return u.replace(/\/$/, "");
}

/**
 * Resend HTTP API (no extra npm dependency). Set RESEND_API_KEY and EMAIL_FROM (verified sender).
 */
async function sendViaResend(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!key || !from) {
    return { ok: false, reason: "not_configured" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });
  if (!res.ok) {
    safeServerLog("email", "resend_failed", { status: res.status });
    return { ok: false, reason: "send_failed" };
  }
  return { ok: true };
}

export async function sendPasswordResetEmail(to: string, rawToken: string): Promise<SendEmailResult> {
  const origin = appOrigin();
  const url = `${origin}/reset-password?token=${encodeURIComponent(rawToken)}`;
  const subject = "Reset your NurseNest password";
  const text = [
    "You requested a password reset for your NurseNest account.",
    "",
    `Open this link within 60 minutes to choose a new password:`,
    url,
    "",
    "If you did not request this, you can ignore this email. Your password will not change.",
    `Support: ${process.env.SUPPORT_EMAIL || "support@nursenest.ca"}`,
  ].join("\n");
  const html = `
    <p>You requested a password reset for your <strong>NurseNest</strong> account.</p>
    <p><a href="${url}">Reset your password</a> (link expires in 60 minutes.)</p>
    <p>If you did not request this, you can ignore this email.</p>
    <p style="font-size:12px;color:#666">If you did not request this, no changes will be made.</p>
  `.trim();
  return sendViaResend({ to, subject, html, text });
}

export async function sendAccountRecoverySupportEmail(params: {
  requestId: string;
  fullName: string;
  detailsPreview: string;
}): Promise<SendEmailResult> {
  const inbox = process.env.ACCOUNT_RECOVERY_INBOX?.trim() || process.env.SUPPORT_EMAIL?.trim();
  if (!inbox) {
    return { ok: false, reason: "not_configured" };
  }
  const subject = `[NurseNest] Account recovery request ${params.requestId}`;
  const text = [
    `New account recovery request (forgot email / login identifier).`,
    `Request ID: ${params.requestId}`,
    `Name provided: ${params.fullName}`,
    "",
    "Details:",
    params.detailsPreview,
    "",
    "Review in admin or support tooling. Do not disclose email to the user without verification.",
  ].join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif">${escapeHtml(text)}</pre>`;
  return sendViaResend({ to: inbox, subject, html, text });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
