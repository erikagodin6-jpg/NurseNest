import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/ensure-admin";
import { getMonorepoRoot } from "@/lib/monorepo-root";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { buildI18nDiagnosticsReport } from "../../../../../../../server/i18n-diagnostics-report";

const REPORT_REL = path.join("reports", "i18n-status.json");

export async function POST() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const root = getMonorepoRoot();
  try {
    const report = buildI18nDiagnosticsReport(root);
    const p = path.join(root, REPORT_REL);
    mkdirSync(path.dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(report, null, 2), "utf-8");
    return NextResponse.json({ ok: true, report, writtenTo: p });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
