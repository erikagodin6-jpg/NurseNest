import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { safeServerLog, safeServerLogCritical } from "@/lib/observability/safe-server-log";

type RouteContext = { params: Promise<{ id: string }> };

/** Mark a support recovery request as handled (admin only). */
export async function PATCH(req: Request, ctx: RouteContext) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const { id } = await ctx.params;
  if (!id || id.length > 40) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const action = (body as { action?: string }).action;
  if (action !== "mark_handled") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const updated = await prisma.accountRecoveryRequest.updateMany({
      where: { id, status: "PENDING" },
      data: {
        status: "HANDLED",
        handledById: gate.admin.userId,
        handledAt: new Date(),
      },
    });
    if (updated.count === 0) {
      return NextResponse.json({ error: "Not found or already handled." }, { status: 404 });
    }
    safeServerLog("auth_recovery", "recovery_request_handled", { id, handledById: gate.admin.userId });
    return NextResponse.json({ ok: true });
  } catch (e) {
    safeServerLogCritical("auth_recovery", "recovery_request_patch_error", { id }, e);
    return NextResponse.json({ error: "Unable to update." }, { status: 503 });
  }
}
