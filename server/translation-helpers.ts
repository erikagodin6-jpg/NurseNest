import type { Request, Response, NextFunction } from "express";
import { pool } from "./storage";

declare global {
  namespace Express {
    interface Request {
      lang?: string;
    }
  }
}

const SUPPORTED_LANGUAGES = [
  "en", "fr", "es", "zh", "zh-tw", "ar", "hi", "pt", "tl", "ko", "ja",
  "de", "vi", "pa", "ur", "fa"
];

export function detectLanguage(req: Request): string {
  const urlLang = req.query.lang as string | undefined;
  if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang.toLowerCase())) {
    return urlLang.toLowerCase();
  }

  const pathParts = req.path.split("/");
  if (pathParts.length > 1 && SUPPORTED_LANGUAGES.includes(pathParts[1])) {
    return pathParts[1];
  }

  const acceptLang = req.headers["accept-language"];
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((part) => {
        const [lang, q] = part.trim().split(";q=");
        return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { lang } of preferred) {
      if (lang === "zh-tw" || lang.startsWith("zh-hant") || lang.startsWith("zh-tw")) {
        return "zh-tw";
      }
      const primary = lang.split("-")[0];
      if (SUPPORTED_LANGUAGES.includes(primary)) {
        return primary;
      }
    }
  }

  return "en";
}

export function languageMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.lang = detectLanguage(req);
  next();
}

export async function getTranslatedField(
  contentType: string,
  contentId: string,
  fieldName: string,
  lang: string
): Promise<string | null> {
  if (lang === "en") return null;

  try {
    const result = await pool.query(
      `SELECT translated_text FROM content_translations
       WHERE content_type = $1 AND content_id = $2 AND field_name = $3 AND language_code = $4
       LIMIT 1`,
      [contentType, contentId, fieldName, lang]
    );
    return result.rows[0]?.translated_text || null;
  } catch (e) {
    console.error("getTranslatedField error:", e);
    return null;
  }
}

export async function getTranslatedFields(
  contentType: string,
  contentId: string,
  lang: string
): Promise<Record<string, { text: string; status: string; sourceHash: string | null }>> {
  if (lang === "en") return {};

  try {
    const result = await pool.query(
      `SELECT field_name, translated_text, translation_status, source_hash
       FROM content_translations
       WHERE content_type = $1 AND content_id = $2 AND language_code = $3`,
      [contentType, contentId, lang]
    );

    const fields: Record<string, { text: string; status: string; sourceHash: string | null }> = {};
    for (const row of result.rows) {
      fields[row.field_name] = {
        text: row.translated_text,
        status: row.translation_status || "auto",
        sourceHash: row.source_hash,
      };
    }
    return fields;
  } catch (e) {
    console.error("getTranslatedFields error:", e);
    return {};
  }
}

export async function getTranslationStatus(
  contentType: string,
  contentId: string,
  lang: string,
  sourceFields: Record<string, string | null | undefined>
): Promise<{ status: "complete" | "partial" | "missing" | "stale"; missing: string[]; stale: string[] }> {
  if (lang === "en") {
    return { status: "complete", missing: [], stale: [] };
  }

  try {
    const result = await pool.query(
      `SELECT field_name, source_hash, translation_status
       FROM content_translations
       WHERE content_type = $1 AND content_id = $2 AND language_code = $3`,
      [contentType, contentId, lang]
    );

    const translatedFields = new Map<string, { sourceHash: string | null; status: string }>();
    for (const row of result.rows) {
      translatedFields.set(row.field_name, {
        sourceHash: row.source_hash,
        status: row.translation_status || "auto",
      });
    }

    const translatableFields = Object.keys(sourceFields).filter((k) => sourceFields[k] != null);
    const missing: string[] = [];
    const stale: string[] = [];

    for (const field of translatableFields) {
      const translation = translatedFields.get(field);
      if (!translation) {
        missing.push(field);
      } else if (translation.sourceHash) {
        const currentHash = simpleHash(String(sourceFields[field] || ""));
        if (translation.sourceHash !== currentHash) {
          stale.push(field);
        }
      }
    }

    if (missing.length === translatableFields.length) {
      return { status: "missing", missing, stale };
    }
    if (stale.length > 0) {
      return { status: "stale", missing, stale };
    }
    if (missing.length > 0) {
      return { status: "partial", missing, stale };
    }
    return { status: "complete", missing, stale };
  } catch (e) {
    console.error("getTranslationStatus error:", e);
    return { status: "missing", missing: [], stale: [] };
  }
}

export function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash.toString(36);
}

export async function getBulkTranslatedTitles(
  contentType: string,
  contentIds: string[],
  lang: string
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  if (lang === "en" || contentIds.length === 0) return result;

  try {
    const placeholders = contentIds.map((_, i) => `$${i + 3}`).join(",");
    const queryResult = await pool.query(
      `SELECT content_id, translated_text
       FROM content_translations
       WHERE content_type = $1 AND field_name = 'title' AND language_code = $2
       AND content_id IN (${placeholders})`,
      [contentType, lang, ...contentIds]
    );

    for (const row of queryResult.rows) {
      result.set(row.content_id, row.translated_text);
    }
  } catch (e) {
    console.error("getBulkTranslatedTitles error:", e);
  }

  return result;
}

export async function getAvailableLanguages(
  contentType: string,
  contentId: string
): Promise<string[]> {
  try {
    const result = await pool.query(
      `SELECT DISTINCT language_code FROM content_translations
       WHERE content_type = $1 AND content_id = $2`,
      [contentType, contentId]
    );
    return ["en", ...result.rows.map((r: any) => r.language_code)];
  } catch (e) {
    console.error("getAvailableLanguages error:", e);
    return ["en"];
  }
}
