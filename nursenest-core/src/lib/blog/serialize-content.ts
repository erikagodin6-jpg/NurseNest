/**
 * Normalize legacy blog body text and fix common asset paths for production.
 */
const DEFAULT_ASSET_BASE = process.env.NEXT_PUBLIC_NURSENEST_ASSETS_BASE?.replace(/\/$/, "") ?? "https://www.nursenest.ca";

export function normalizeBlogAssetUrls(html: string): string {
  let s = html;
  // /images/foo -> absolute
  s = s.replace(/src="\/(images\/[^"]+)"/g, `src="${DEFAULT_ASSET_BASE}/$1"`);
  s = s.replace(/src='\/(images\/[^']+)'/g, `src='${DEFAULT_ASSET_BASE}/$1'`);
  return s;
}

export type LegacyContentBlock = {
  type?: string;
  content?: string;
  text?: string;
  heading?: string;
  level?: number;
  items?: string[];
  ordered?: boolean;
};

/** Serialize legacy content_items JSONB block array to simple HTML. */
export function legacyContentBlocksToHtml(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const raw of blocks) {
    const b = raw as LegacyContentBlock;
    const t = (b.type || "").toLowerCase();
    const text = (b.content || b.text || "").trim();
    if (t === "heading" || b.heading) {
      const level = Math.min(6, Math.max(2, b.level ?? 2));
      const h = (b.heading || text || "").trim();
      if (h) parts.push(`<h${level}>${escapeHtml(h)}</h${level}>`);
      continue;
    }
    if (t === "paragraph" || (!t && text)) {
      if (text) parts.push(`<p>${formatInline(text)}</p>`);
      continue;
    }
    if (t === "list" && Array.isArray(b.items)) {
      const tag = b.ordered ? "ol" : "ul";
      const lis = b.items.map((item) => `<li>${formatInline(String(item))}</li>`).join("");
      parts.push(`<${tag}>${lis}</${tag}>`);
      continue;
    }
    if (text) parts.push(`<p>${formatInline(text)}</p>`);
  }
  return parts.join("\n");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function formatInline(s: string): string {
  const escaped = escapeHtml(s);
  return escaped.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br/>");
}
