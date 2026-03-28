import { NextResponse } from "next/server";
import type { TierCode } from "@prisma/client";
import { findPriceEntry, type BillingDuration, priceMap } from "@/lib/stripe/pricing-map";

export const dynamic = "force-dynamic";

const DURATION_ORDER: BillingDuration[] = ["monthly", "3-month", "6-month", "yearly"];

/** Marketing display anchors (approximate; Stripe is source of truth at checkout). */
const MONTHLY_DISPLAY: Record<string, Record<string, number>> = {
  CA: { RPN: 24.99, LVN_LPN: 24.99, RN: 32.99, NP: 39.99, ALLIED: 32.99 },
  US: { RPN: 24.99, LVN_LPN: 24.99, RN: 32.99, NP: 39.99, ALLIED: 32.99 },
};

function displayMultiplier(duration: BillingDuration): number {
  switch (duration) {
    case "monthly":
      return 1;
    case "3-month":
      return 2.85;
    case "6-month":
      return 5.4;
    case "yearly":
      return 9.5;
    default:
      return 1;
  }
}

export async function GET() {
  const tiers = Array.from(new Set(priceMap.map((p) => p.tier))) as TierCode[];
  const plans = priceMap.map((p) => {
    const monthly = MONTHLY_DISPLAY[p.country]?.[p.tier] ?? 29.99;
    const suggestedTotal = Number((monthly * displayMultiplier(p.duration)).toFixed(2));
    const months = p.duration === "monthly" ? 1 : p.duration === "3-month" ? 3 : p.duration === "6-month" ? 6 : 12;
    const monthlyEquiv = Number((suggestedTotal / months).toFixed(2));
    const baselineMonthly = monthly * months;
    const savingsVsMonthly =
      months > 1 && baselineMonthly > 0
        ? Math.max(0, Math.round((1 - suggestedTotal / baselineMonthly) * 100))
        : 0;

    const monthlyEntry = findPriceEntry(p.country, p.tier, "monthly");
    const hasYearly = Boolean(findPriceEntry(p.country, p.tier, "yearly"));
    const isBestValue = p.duration === "yearly" || (!hasYearly && p.duration === "6-month");

    return {
      tier: p.tier,
      country: p.country,
      duration: p.duration,
      priceId: p.priceId,
      suggestedTotalLabel: p.country === "CA" ? `${suggestedTotal} CAD` : `${suggestedTotal} USD`,
      monthlyEquivalentLabel: p.country === "CA" ? `${monthlyEquiv} CAD/mo` : `${monthlyEquiv} USD/mo`,
      savingsVsMonthlyPercent: savingsVsMonthly,
      isBestValue: Boolean(isBestValue && months > 1),
      hasLiveMonthly: Boolean(monthlyEntry),
    };
  });

  return NextResponse.json({
    durations: DURATION_ORDER,
    tiers,
    plans,
    note: "Suggested totals are for comparison; charged amounts follow Stripe at checkout.",
  });
}
