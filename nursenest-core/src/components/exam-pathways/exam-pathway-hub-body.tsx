import Link from "next/link";
import { withMarketingLocale } from "@/lib/i18n/marketing-path";
import {
  buildPremiumMarketingModuleCards,
  type NursingPathwayHubKind,
} from "@/components/exam-pathways/exam-pathway-hub-premium-modules";

export function ExamPathwayHubPremiumModules({
  locale,
  pathwayKind,
}: {
  locale: string;
  pathwayKind: NursingPathwayHubKind;
}) {
  const cards = buildPremiumMarketingModuleCards({ locale, pathwayKind });
  const pricing = withMarketingLocale(locale, "/pricing");
  const signup = withMarketingLocale(locale, "/signup");

  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      data-testid="exam-pathway-premium-modules-grid"
    >
      {cards.map((card) => (
        <div
          key={card.testId}
          data-testid={card.testId}
          className="flex flex-col rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-5 shadow-sm"
        >
          <h3 className="text-base font-semibold text-[var(--theme-body-text)]">{card.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--theme-body-text)]/85">
            {card.description}
          </p>
          {card.locked ? (
            <div className="mt-4 space-y-3">
              {card.lockHint ? (
                <p className="text-xs text-[var(--theme-body-text)]/70">{card.lockHint}</p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={signup}
                  className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Sign in
                </Link>
                <Link
                  href={pricing}
                  className="inline-flex rounded-full border border-[var(--theme-card-border)] px-4 py-2 text-xs font-semibold text-[var(--theme-body-text)] hover:border-primary/40"
                >
                  View plans
                </Link>
              </div>
            </div>
          ) : card.href ? (
            <Link
              href={card.href}
              className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Open module
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function ExamPathwayHubBody({
  locale,
  pathwayKind,
}: {
  locale: string;
  pathwayKind: NursingPathwayHubKind;
}) {
  return (
    <section
      className="mb-12 rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 sm:p-8"
      aria-labelledby="exam-pathway-premium-modules-heading"
      data-testid="section-exam-pathway-premium-modules"
    >
      <div className="mb-6">
        <h2
          id="exam-pathway-premium-modules-heading"
          className="text-xl font-semibold text-[var(--theme-body-text)]"
        >
          Premium study modules
        </h2>
        <p className="mt-2 text-sm text-[var(--theme-body-text)]/80">
          Explore tools and bank experiences mapped to this pathway. Account features vary by plan and region.
        </p>
      </div>
      <ExamPathwayHubPremiumModules locale={locale} pathwayKind={pathwayKind} />
    </section>
  );
}
