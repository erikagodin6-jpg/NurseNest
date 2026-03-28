import type { Metadata } from "next";
import { MarketingPricingPage } from "@/components/marketing/marketing-pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description: "NurseNest Core subscription plans for Canada and US nursing pathways.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <MarketingPricingPage locale="en" />;
}
