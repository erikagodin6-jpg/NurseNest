import marketingEn from "@/content/marketing-en.json";
import { formatMarketingMessage } from "@/lib/marketing-i18n-core";

type Params = Record<string, string | number | undefined>;

/** English-only helper for rare non-React call sites; prefer `useMarketingI18n().t` in UI. */
export function marketingT(key: string, params?: Params): string {
  return formatMarketingMessage(marketingEn as Record<string, string>, key, params);
}

export { formatMarketingMessage, type MarketingMessages } from "@/lib/marketing-i18n-core";
export { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";
export {
  MarketingI18nProvider,
  useMarketingI18n,
  useMarketingLocale,
} from "@/components/i18n/marketing-i18n-provider";
