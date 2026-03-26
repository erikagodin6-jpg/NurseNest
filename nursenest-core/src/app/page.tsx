import Link from "next/link";
import { publicPlanCards } from "@/lib/domain/plans";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <section className="nn-card p-10">
        <p className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-foreground">
          NurseNest Core
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight">
          Premium nursing exam preparation built for reliability.
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-muted">
          Built for Canada and United States pathways with server-enforced access for RPN, LVN/LPN, RN, and NP learners.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-primary px-5 py-3 font-semibold" href="/pricing">
            View Pricing
          </Link>
          <Link className="rounded-xl border border-border bg-white px-5 py-3 font-semibold" href="/signup">
            Start Free Account
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {publicPlanCards.map((plan) => (
          <article className="nn-card p-6" key={plan.slug}>
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
