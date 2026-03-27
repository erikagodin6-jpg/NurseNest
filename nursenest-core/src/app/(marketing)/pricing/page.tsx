import type { Metadata } from "next";
import { publicPlanCards } from "@/lib/domain/plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: "NurseNest Core subscription plans for Canada and US nursing pathways.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Simple pricing, server-side protected access.</h1>
      <p className="mt-3 text-muted">Plans are mapped by country and tier with centralized entitlement checks.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {publicPlanCards.map((plan) => (
          <article className="nn-card p-6" key={plan.slug}>
            <h2 className="text-2xl font-semibold">{plan.title}</h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <p className="mt-4 text-2xl font-bold">{plan.monthlyPriceLabel}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
