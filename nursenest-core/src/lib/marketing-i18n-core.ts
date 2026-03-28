export type MarketingMessages = Record<string, string>;

type Params = Record<string, string | number | undefined>;

export function formatMarketingMessage(messages: MarketingMessages, key: string, params?: Params): string {
  const raw = messages[key];
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
