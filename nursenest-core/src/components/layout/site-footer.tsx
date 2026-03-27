import Link from "next/link";
import { marketingT as t } from "@/lib/marketing-i18n";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.studyTools")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/app/lessons" className="transition-colors hover:text-primary">{t("footer.clinicalLessons")}</Link></li>
              <li><Link href="/app/questions" className="transition-colors hover:text-primary">{t("footer.testBank")}</Link></li>
              <li><Link href="/app/exams" className="transition-colors hover:text-primary">{t("footer.mockExams")}</Link></li>
              <li><Link href="/app/lessons" className="transition-colors hover:text-primary">{t("footer.preNursing")}</Link></li>
              <li><Link href="/app/lessons" className="transition-colors hover:text-primary">{t("footer.anatomyExplorer")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.examPrep")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("components.footer.nursingExamPrepHub")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("components.footer.nclexrnPrep")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("components.footer.rexpnNclexpnPrep")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("components.footer.npExamPrepHub")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("components.footer.alliedHealthExamPrep")}</Link></li>
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.newGradSupportSection")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.newGradHub")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.nursing")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.paramedic")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.respiratoryTherapy")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.pricing")}</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-primary">{t("footer.faq")}</Link></li>
              <li><Link href="/login" className="transition-colors hover:text-primary">{t("footer.contact")}</Link></li>
              <li><Link href="/" className="transition-colors hover:text-primary">{t("footer.about")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.forSchools")}</Link></li>
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.nursingSpecialties")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.allSpecialties")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.icuGuide")}</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-primary">{t("footer.nicuGuide")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/terms" className="transition-colors hover:text-primary">{t("footer.terms")}</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-primary">{t("footer.privacy")}</Link></li>
              <li><Link href="/disclaimer" className="transition-colors hover:text-primary">{t("footer.disclaimer")}</Link></li>
              <li><Link href="/refund-policy" className="transition-colors hover:text-primary">{t("footer.refundPolicy")}</Link></li>
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-[var(--theme-heading-text)]">{t("footer.educationEcosystem")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><Link href="/" className="transition-colors hover:text-primary">NurseNest</Link></li>
              <li><a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">ApplyNest</a></li>
            </ul>
          </div>
        </div>

        <div className="mb-6 mt-8 border-t border-[var(--theme-separator)] pb-6 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">
            {t("footer.studyInYourLanguage") || "Study Nursing in Your Language"}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2 text-xs text-[var(--theme-muted-text)]">
            {["English", "Français", "Español", "Tagalog", "中文", "العربية", "한국어", "Português"].map((name) => (
              <span key={name} className="inline-flex items-center rounded-full border border-[var(--theme-separator)] px-2 py-1">
                {name}
              </span>
            ))}
          </div>
          <Link href="/pricing" className="text-xs text-primary hover:underline">
            {t("footer.viewAllLanguages") || "View all languages →"}
          </Link>
        </div>

        <div className="mb-6 border-t border-[var(--theme-separator)] pb-6 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-[var(--theme-heading-text)]">{t("components.footer.ourEducationEcosystem")}</h3>
          <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
            <li>
              <Link href="/" className="font-medium transition-colors hover:text-primary">NurseNest</Link>
              <span className="ml-1">{t("components.footer.nursingExamPrepClinicalTools")}</span>
            </li>
            <li>
              <a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-primary">ApplyNest</a>
              <span className="ml-1">{t("components.footer.healthcareProgramApplicationsAdmissionsAnd")}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--theme-separator)] pt-6 md:flex-row">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-[var(--theme-heading-text)]">NurseNest</p>
          </div>
          <div className="text-sm text-[var(--theme-muted-text)]">© {new Date().getFullYear()} NurseNest. {t("footer.rights")}</div>
        </div>

        <div className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-[var(--theme-muted-text)] opacity-70">
          {t("footer.legalDisclaimer")}
        </div>
      </div>
    </footer>
  );
}
