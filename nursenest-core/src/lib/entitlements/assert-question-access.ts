import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { questionAccessWhere } from "@/lib/entitlements/content-access-scope";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";
import { safeServerLog } from "@/lib/observability/safe-server-log";

/**
 * Returns a where clause that restricts to this question id if and only if the learner may read it.
 */
export function questionIdWhereIfAllowed(
  questionId: string,
  entitlement: AccessScope,
): Prisma.QuestionWhereInput {
  return {
    AND: [{ id: questionId }, questionAccessWhere(entitlement)],
  };
}

export async function isQuestionReadableByEntitlement(
  questionId: string,
  entitlement: AccessScope,
): Promise<boolean> {
  if (!entitlement.hasAccess) return false;
  const row = await prisma.question.findFirst({
    where: questionIdWhereIfAllowed(questionId, entitlement),
    select: { id: true },
  });
  return !!row;
}

export function logPaywallDeny(route: string, reason: string, meta?: Record<string, string | number | boolean>): void {
  safeServerLog("access", "denied", { route, reason, ...(meta ?? {}) });
}
