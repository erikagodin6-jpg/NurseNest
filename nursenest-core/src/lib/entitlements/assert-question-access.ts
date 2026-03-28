import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";
import { safeServerLog } from "@/lib/observability/safe-server-log";

/**
 * Preserves session order; drops question IDs the current entitlement no longer allows (downgrade / tier change).
 */
export async function filterSessionQuestionIdsInScope(
  sessionIds: string[],
  entitlement: AccessScope,
): Promise<string[]> {
  if (sessionIds.length === 0) return [];
  const rows = await prisma.examQuestion.findMany({
    where: { AND: [{ id: { in: sessionIds } }, questionAccessWhere(entitlement)] },
    select: { id: true },
  });
  const allowed = new Set(rows.map((r) => r.id));
  return sessionIds.filter((id) => allowed.has(id));
}

/**
 * Returns a where clause that restricts to this question id if and only if the learner may read it.
 */
export function questionIdWhereIfAllowed(
  questionId: string,
  entitlement: AccessScope,
): Prisma.ExamQuestionWhereInput {
  return {
    AND: [{ id: questionId }, questionAccessWhere(entitlement)],
  };
}

export async function isQuestionReadableByEntitlement(
  questionId: string,
  entitlement: AccessScope,
): Promise<boolean> {
  if (!entitlement.hasAccess) return false;
  const row = await prisma.examQuestion.findFirst({
    where: questionIdWhereIfAllowed(questionId, entitlement),
    select: { id: true },
  });
  return !!row;
}

export function logPaywallDeny(route: string, reason: string, meta?: Record<string, string | number | boolean>): void {
  safeServerLog("access", "denied", { route, reason, ...(meta ?? {}) });
}
