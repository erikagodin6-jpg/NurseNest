import marketingEn from "@/content/marketing-en.json";
import type { MarketingMessages } from "@/lib/marketing-i18n-core";
import { DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";

const base = marketingEn as MarketingMessages;

/** Explicit dynamic imports so each overlay is a separate chunk (route-loaded for non-`en`). */
async function importOverlay(locale: string): Promise<MarketingMessages> {
  try {
    return await importOverlayInner(locale);
  } catch (e) {
    console.error(`[loadMarketingMessages] overlay failed for locale "${locale}", using English base only`, e);
    return {};
  }
}

async function importOverlayInner(locale: string): Promise<MarketingMessages> {
  switch (locale) {
    case "fr":
      return (await import("@/content/locale/marketing-fr.json")).default as MarketingMessages;
    case "tl":
      return (await import("@/content/locale/marketing-tl.json")).default as MarketingMessages;
    case "hi":
      return (await import("@/content/locale/marketing-hi.json")).default as MarketingMessages;
    case "es":
      return (await import("@/content/locale/marketing-es.json")).default as MarketingMessages;
    case "zh":
      return (await import("@/content/locale/marketing-zh.json")).default as MarketingMessages;
    case "zh-tw":
      return (await import("@/content/locale/marketing-zh-tw.json")).default as MarketingMessages;
    case "ar":
      return (await import("@/content/locale/marketing-ar.json")).default as MarketingMessages;
    case "ko":
      return (await import("@/content/locale/marketing-ko.json")).default as MarketingMessages;
    case "pt":
      return (await import("@/content/locale/marketing-pt.json")).default as MarketingMessages;
    case "pa":
      return (await import("@/content/locale/marketing-pa.json")).default as MarketingMessages;
    case "vi":
      return (await import("@/content/locale/marketing-vi.json")).default as MarketingMessages;
    case "ht":
      return (await import("@/content/locale/marketing-ht.json")).default as MarketingMessages;
    case "ur":
      return (await import("@/content/locale/marketing-ur.json")).default as MarketingMessages;
    case "ja":
      return (await import("@/content/locale/marketing-ja.json")).default as MarketingMessages;
    case "fa":
      return (await import("@/content/locale/marketing-fa.json")).default as MarketingMessages;
    case "de":
      return (await import("@/content/locale/marketing-de.json")).default as MarketingMessages;
    case "th":
      return (await import("@/content/locale/marketing-th.json")).default as MarketingMessages;
    case "tr":
      return (await import("@/content/locale/marketing-tr.json")).default as MarketingMessages;
    case "id":
      return (await import("@/content/locale/marketing-id.json")).default as MarketingMessages;
    default:
      return {};
  }
}

/** Server-only merge: English base + optional overlay (Phase 3 stubs may be `{}`). */
export async function loadMarketingMessages(locale: string): Promise<MarketingMessages> {
  if (locale === DEFAULT_MARKETING_LOCALE) return { ...base };
  const overlay = await importOverlay(locale);
  return { ...base, ...overlay };
}
