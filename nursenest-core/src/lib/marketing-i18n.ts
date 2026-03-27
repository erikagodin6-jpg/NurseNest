import marketingEn from "@/content/marketing-en.json";

type Params = Record<string, string | number | undefined>;

export function marketingT(key: string, params?: Params): string {
  const raw = (marketingEn as Record<string, string>)[key];
  if (raw === undefined) return key;
  let s = raw;
  if (params) {
    for (const [k, val] of Object.entries(params)) {
      if (val === undefined) continue;
      s = s.split(`{{${k}}}`).join(String(val));
    }
  }
  return s;
}

/** Drop-in for legacy `useI18n().t` used by copied marketing components */
export function useMarketingI18n() {
  return { t: marketingT };
}
