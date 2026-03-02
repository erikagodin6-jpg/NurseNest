import { LocaleLink } from "@/lib/LocaleLink";
import { ThemedLogo } from "@/components/themed-logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-white border-t border-primary/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("footer.studyTools")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/lessons" className="hover:text-primary transition-colors" data-testid="link-footer-lessons">{t("footer.clinicalLessons")}</LocaleLink></li>
              <li><LocaleLink href="/flashcards" className="hover:text-primary transition-colors" data-testid="link-footer-flashcards">{t("footer.questionBank")}</LocaleLink></li>
              <li><LocaleLink href="/anatomy" className="hover:text-primary transition-colors" data-testid="link-footer-anatomy">{t("footer.anatomyExplorer")}</LocaleLink></li>
              <li><LocaleLink href="/pre-nursing" className="hover:text-primary transition-colors" data-testid="link-footer-pre-nursing">{t("footer.preNursing")}</LocaleLink></li>
              <li><LocaleLink href="/med-math" className="hover:text-primary transition-colors" data-testid="link-footer-med-math">{t("footer.medMath")}</LocaleLink></li>
              <li><LocaleLink href="/medication-mastery" className="hover:text-primary transition-colors" data-testid="link-footer-medication-mastery">{t("footer.medicationMastery")}</LocaleLink></li>
              <li><LocaleLink href="/clinical-clarity" className="hover:text-primary transition-colors" data-testid="link-footer-clinical-clarity">{t("footer.clinicalClarity")}</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("footer.examPrep")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/mock-exams" className="hover:text-primary transition-colors" data-testid="link-footer-mock-exams">{t("footer.mockExams")}</LocaleLink></li>
              <li><LocaleLink href="/question-bank" className="hover:text-primary transition-colors" data-testid="link-footer-question-bank">{t("footer.questionBank")}</LocaleLink></li>
              <li><LocaleLink href="/question-of-the-day" className="hover:text-primary transition-colors" data-testid="link-footer-qotd">{t("footer.questionOfTheDay")}</LocaleLink></li>
              <li><LocaleLink href="/lab-values" className="hover:text-primary transition-colors" data-testid="link-footer-lab-values">{t("footer.labValues")}</LocaleLink></li>
              <li><LocaleLink href="/case-simulations" className="hover:text-primary transition-colors" data-testid="link-footer-case-sims">{t("footer.caseSimulations")}</LocaleLink></li>
              <li><LocaleLink href="/lectures" className="hover:text-primary transition-colors" data-testid="link-footer-lectures">{t("footer.videoLectures")}</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/shop" className="hover:text-primary transition-colors" data-testid="link-footer-store">{t("nav.store")}</LocaleLink></li>
              <li><LocaleLink href="/blog" className="hover:text-primary transition-colors" data-testid="link-footer-blog">{t("nav.blog")}</LocaleLink></li>
              <li><LocaleLink href="/faq" className="hover:text-primary transition-colors" data-testid="link-footer-faq">{t("footer.faq")}</LocaleLink></li>
              <li><LocaleLink href="/pricing" className="hover:text-primary transition-colors" data-testid="link-footer-pricing">{t("footer.pricing")}</LocaleLink></li>
              <li><LocaleLink href="/contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">{t("footer.contact")}</LocaleLink></li>
              <li><LocaleLink href="/feedback" className="hover:text-primary transition-colors" data-testid="link-footer-feedback">{t("footer.feedback")}</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/terms" className="hover:text-primary transition-colors" data-testid="link-footer-terms">{t("footer.terms")}</LocaleLink></li>
              <li><LocaleLink href="/privacy" className="hover:text-primary transition-colors" data-testid="link-footer-privacy">{t("footer.privacy")}</LocaleLink></li>
              <li><LocaleLink href="/disclaimer" className="hover:text-primary transition-colors" data-testid="link-footer-disclaimer">{t("footer.disclaimer")}</LocaleLink></li>
              <li><LocaleLink href="/refund-policy" className="hover:text-primary transition-colors" data-testid="link-footer-refund">{t("footer.refundPolicy")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.alliedHealth")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href={window.location.hostname.includes("nursenest.ca") ? "https://allied.nursenest.ca" : "/?mode=allied"} className="hover:text-primary transition-colors" data-testid="link-footer-allied">{t("footer.alliedHealthExamPrep")}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ThemedLogo width={160} />
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NurseNest. {t("footer.rights")}
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {t("footer.legalDisclaimer")}
        </div>
      </div>
    </footer>
  );
}
