"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";

export default function HomeCareerCta() {
  const router = useRouter();
  const { t } = useMarketingI18n();

  return (
    <section className="border-t border-gray-100" style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }} data-testid="section-career-journey-cta">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="rounded-3xl border border-blue-100/60 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-purple-50/30 p-8 shadow-[var(--shadow-card)] sm:p-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3 py-1.5 shadow-[var(--shadow-card)]">
            <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700 sm:text-sm">{t("home.career.journeyBadge")}</span>
          </div>
          <h2 className="mb-3 font-bold text-gray-900" style={{ fontSize: "var(--text-section)" }}>
            {t("home.career.journeyTitle")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-500 lg:text-lg">{t("home.career.journeySubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-[var(--shadow-card)] hover:bg-blue-700"
              onClick={() => router.push(mapLegacyMarketingHref("/career-journey"))}
              data-testid="button-career-journey-home"
            >
              {t("home.career.exploreJourney")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-blue-200 px-6 py-3 font-medium text-blue-700 hover:bg-blue-50"
              onClick={() => router.push(mapLegacyMarketingHref("/career-journey/nursing"))}
              data-testid="button-career-journey-nursing"
            >
              {t("home.career.rnPath")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
