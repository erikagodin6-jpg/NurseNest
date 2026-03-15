import fs from "fs";
import path from "path";

interface StripePriceEntry {
  tier: string;
  duration: string;
  productId: string;
  productName: string;
  priceId: string;
  unitAmount: number;
  currency: string;
  recurringInterval: string | null;
  recurringIntervalCount: number | null;
  active: boolean;
}

interface StripePriceMap {
  syncedAt: string;
  mode: string;
  prices: StripePriceEntry[];
}

const LIVE_PRICE_MAP: Record<string, Record<string, Record<string, string>>> = {
  rpn: {
    monthly: { usd: "", cad: "" },
    "3-month": { usd: "", cad: "" },
    "6-month": { usd: "", cad: "" },
    yearly: { usd: "", cad: "" },
  },
  rn: {
    monthly: { usd: "", cad: "" },
    "3-month": { usd: "", cad: "" },
    "6-month": { usd: "", cad: "" },
    yearly: { usd: "", cad: "" },
  },
  np: {
    monthly: { usd: "", cad: "" },
    "3-month": { usd: "", cad: "" },
    "6-month": { usd: "", cad: "" },
    yearly: { usd: "", cad: "" },
  },
  allied: {
    monthly: { cad: "" },
    "3-month": { cad: "" },
    "6-month": { cad: "" },
    yearly: { cad: "" },
  },
};

let priceIndex: Record<string, string> = {};
let loaded = false;

function buildKey(tier: string, duration: string, currency: string): string {
  return `${tier}:${duration}:${currency}`;
}

export function loadStripePrices(): void {
  priceIndex = {};

  const isProduction = process.env.REPLIT_DEPLOYMENT === "1";
  const expectedMode = isProduction ? "live" : "test";

  const mapFiles = isProduction
    ? ["stripe-price-map-live.json", "stripe-price-map.json"]
    : ["stripe-price-map.json"];

  let mapLoaded = false;
  for (const filename of mapFiles) {
    const mapPath = path.join(process.cwd(), filename);
    if (!fs.existsSync(mapPath)) continue;

    try {
      const raw = fs.readFileSync(mapPath, "utf8");
      const data: StripePriceMap = JSON.parse(raw);

      if (data.mode !== expectedMode) {
        console.warn(
          `[Stripe Pricing] Skipping ${filename}: mode "${data.mode}" does not match expected "${expectedMode}"`
        );
        continue;
      }

      for (const entry of data.prices) {
        const key = buildKey(entry.tier, entry.duration, entry.currency);
        priceIndex[key] = entry.priceId;
      }

      console.log(
        `Loaded ${data.prices.length} Stripe prices from ${filename} (mode: ${data.mode}, synced: ${data.syncedAt})`
      );
      mapLoaded = true;
      break;
    } catch (err: any) {
      console.warn(`Failed to load ${filename}: ${err.message}`);
    }
  }

  if (!mapLoaded) {
    console.warn(`[Stripe Pricing] No ${expectedMode}-mode price map found — subscription checkout will use inline price_data fallback`);
  }

  for (const [tier, durations] of Object.entries(LIVE_PRICE_MAP)) {
    for (const [duration, currencies] of Object.entries(durations)) {
      for (const [currency, priceId] of Object.entries(currencies)) {
        if (priceId) {
          const key = buildKey(tier, duration, currency);
          if (!priceIndex[key]) {
            priceIndex[key] = priceId;
          }
        }
      }
    }
  }

  loaded = true;

  const subscriptionTiers = ["rpn", "rn", "np"];
  const durations = ["monthly", "3-month", "6-month", "yearly"];
  const currencies = ["usd", "cad"];
  let missing = 0;
  for (const tier of subscriptionTiers) {
    for (const dur of durations) {
      for (const cur of currencies) {
        const key = buildKey(tier, dur, cur);
        if (!priceIndex[key]) {
          missing++;
        }
      }
    }
  }

  const alliedDurations = ["monthly", "3-month", "6-month", "yearly"];
  const alliedCurrencies = ["cad"];
  for (const dur of alliedDurations) {
    for (const cur of alliedCurrencies) {
      const key = buildKey("allied", dur, cur);
      if (!priceIndex[key]) {
        missing++;
      }
    }
  }

  if (missing > 0) {
    console.warn(`Stripe pricing: ${missing} tier/duration/currency combinations missing price IDs — those will use inline price_data fallback`);
  } else {
    console.log("Stripe pricing: all subscription price IDs loaded successfully");
  }
}

export function getStripePriceId(tier: string, duration: string, currency: string): string | null {
  if (!loaded) loadStripePrices();
  const key = buildKey(tier, duration, currency.toLowerCase());
  return priceIndex[key] || null;
}

export function hasStripePriceId(tier: string, duration: string, currency: string): boolean {
  return getStripePriceId(tier, duration, currency) !== null;
}

export function getMissingPriceIds(): string[] {
  if (!loaded) loadStripePrices();
  const subscriptionTiers = ["rpn", "rn", "np"];
  const durations = ["monthly", "3-month", "6-month", "yearly"];
  const currencies = ["usd", "cad"];
  const missing: string[] = [];
  for (const tier of subscriptionTiers) {
    for (const dur of durations) {
      for (const cur of currencies) {
        const key = buildKey(tier, dur, cur);
        if (!priceIndex[key]) {
          missing.push(`tier=${tier} interval=${dur} currency=${cur}`);
        }
      }
    }
  }
  for (const dur of durations) {
    const key = buildKey("allied", dur, "cad");
    if (!priceIndex[key]) {
      missing.push(`tier=allied interval=${dur} currency=cad`);
    }
  }
  return missing;
}
