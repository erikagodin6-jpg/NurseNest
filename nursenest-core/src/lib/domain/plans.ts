import { CountryCode, TierCode } from "@/lib/domain/exam";

export type PlanCard = {
  slug: string;
  title: string;
  description: string;
  country: CountryCode;
  tier: TierCode;
  monthlyPriceLabel: string;
};

export const publicPlanCards: PlanCard[] = [
  {
    slug: "ca-rpn",
    title: "Canada RPN",
    description: "REx-PN focused lessons, question bank, and practice exams.",
    country: "CA",
    tier: "RPN",
    monthlyPriceLabel: "$24.99 CAD/mo",
  },
  {
    slug: "us-lvn",
    title: "US LVN/LPN",
    description: "NCLEX-PN style prep with guided practice and rationales.",
    country: "US",
    tier: "LVN_LPN",
    monthlyPriceLabel: "$24.99 USD/mo",
  },
  {
    slug: "rn-np",
    title: "RN + NP Tracks",
    description: "Advanced clinical reasoning paths for RN and NP learners.",
    country: "CA",
    tier: "NP",
    monthlyPriceLabel: "$39.99 CAD/mo",
  },
];
