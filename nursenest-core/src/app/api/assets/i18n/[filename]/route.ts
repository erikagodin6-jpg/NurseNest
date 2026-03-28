import { readFileSync, existsSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/** Must match `script/compile-i18n.ts` / `script/merge-marketing-i18n.ts`. */
const ALLOWED = new Set<string>([
  "en", "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
]);

function resolvePath(lang: string): string | null {
  if (!ALLOWED.has(lang)) return null;
  const root = process.cwd();
  const candidates = [
    path.join(/* turbopackIgnore: true */ root, "public", "i18n", `${lang}.json`),
    path.join(/* turbopackIgnore: true */ root, "nursenest-core", "public", "i18n", `${lang}.json`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * Fallback for clients that cannot fetch static `/i18n/{lang}.json` (same contract as monolith SPA).
 * Path: `/api/assets/i18n/{lang}.json`
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> },
): Promise<Response> {
  const { filename } = await context.params;
  const lang = filename.replace(/\.json$/i, "");
  const fp = resolvePath(lang);
  if (!fp) {
    return new NextResponse("Not found", { status: 404 });
  }
  try {
    const body = readFileSync(fp, "utf8");
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
