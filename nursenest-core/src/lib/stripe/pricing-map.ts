import type { TierCode } from "@prisma/client";

/** Aligns with checkout API and Stripe products. */
export type BillingDuration = "monthly" | "3-month" | "6-month" | "yearly";

export type PriceEntry = {
  tier: TierCode;
  country: "CA" | "US";
  duration: BillingDuration;
  priceId: string;
};

function envPriceId(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Core monthly prices (live IDs from your Stripe account).
 * Longer durations: set env vars (see `buildOptionalDurationPrices`) or they stay hidden in UI.
 */
const MONTHLY_CORE: PriceEntry[] = [
  { tier: "RPN", country: "CA", duration: "monthly", priceId: "price_1TAuwGChmmgDwbsxroS4xFW9" },
  { tier: "RN", country: "CA", duration: "monthly", priceId: "price_1TAuwJChmmgDwbsxfDR5LAza" },
  { tier: "NP", country: "CA", duration: "monthly", priceId: "price_1TAuwMChmmgDwbsxmtmXPLRO" },
  { tier: "LVN_LPN", country: "US", duration: "monthly", priceId: "price_1TAuwHChmmgDwbsxThEUQr57" },
  { tier: "RN", country: "US", duration: "monthly", priceId: "price_1TAuwJChmmgDwbsxslzAK5Sf" },
  { tier: "NP", country: "US", duration: "monthly", priceId: "price_1TAuwMChmmgDwbsxJeq6yl1r" },
];

function rnMonthlyId(country: "CA" | "US"): string | undefined {
  return MONTHLY_CORE.find((p) => p.tier === "RN" && p.country === country)?.priceId;
}

/** Allied SKUs: use dedicated Stripe prices when set; otherwise bill the RN SKU for the same country (metadata still stores ALLIED). */
function alliedMonthlyEntries(): PriceEntry[] {
  const out: PriceEntry[] = [];
  for (const country of ["CA", "US"] as const) {
    const id =
      envPriceId(country === "CA" ? "STRIPE_PRICE_CA_ALLIED_MONTHLY" : "STRIPE_PRICE_US_ALLIED_MONTHLY") ??
      rnMonthlyId(country);
    if (id) {
      out.push({ tier: "ALLIED", country, duration: "monthly", priceId: id });
    }
  }
  return out;
}

type Combo = { tier: Exclude<TierCode, "ALLIED">; country: "CA" | "US" };

const DURATION_ENV: { duration: BillingDuration; suffix: string }[] = [
  { duration: "3-month", suffix: "3MONTH" },
  { duration: "6-month", suffix: "6MONTH" },
  { duration: "yearly", suffix: "YEARLY" },
];

const COMBOS: Combo[] = [
  { tier: "RPN", country: "CA" },
  { tier: "RN", country: "CA" },
  { tier: "NP", country: "CA" },
  { tier: "LVN_LPN", country: "US" },
  { tier: "RN", country: "US" },
  { tier: "NP", country: "US" },
];

function optionalDurationPrices(): PriceEntry[] {
  const out: PriceEntry[] = [];
  for (const { tier, country } of COMBOS) {
    for (const { duration, suffix } of DURATION_ENV) {
      const key = `STRIPE_PRICE_${country}_${tier}_${suffix}`;
      const id = envPriceId(key);
      if (id) out.push({ tier, country, duration, priceId: id });
    }
  }
  for (const country of ["CA", "US"] as const) {
    for (const { duration, suffix } of DURATION_ENV) {
      const key = `STRIPE_PRICE_${country}_ALLIED_${suffix}`;
      const id = envPriceId(key);
      if (id) {
        out.push({ tier: "ALLIED", country, duration, priceId: id });
      }
    }
  }
  return out;
}

export const priceMap: PriceEntry[] = [...MONTHLY_CORE, ...alliedMonthlyEntries(), ...optionalDurationPrices()];

export function findPriceEntry(
  country: "CA" | "US",
  tier: TierCode,
  duration: BillingDuration,
): PriceEntry | undefined {
  return priceMap.find((p) => p.country === country && p.tier === tier && p.duration === duration);
}
