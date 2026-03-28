import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/ensure-admin";

/** Admin/support: list pending account recovery requests (no public access). */
export async function GET(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(50, Math.max(5, Number(url.searchParams.get("pageSize") ?? "20")));
  const status = url.searchParams.get("status") === "HANDLED" ? "HANDLED" : "PENDING";

  const where = { status };
  const [total, rows] = await Promise.all([
    prisma.accountRecoveryRequest.count({ where }),
    prisma.accountRecoveryRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        details: true,
        countryHint: true,
        tierHint: true,
        last4Hint: true,
        status: true,
        handledById: true,
        handledAt: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({ total, page, pageSize, status, rows });
}
