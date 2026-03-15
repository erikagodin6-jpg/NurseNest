import { LocaleLink } from "@/lib/LocaleLink";
import { ThemedLogo } from "@/components/themed-logo";
import { useI18n } from "@/lib/i18n";
import { EmailSignupPrompt } from "@/components/email-signup-prompt";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-white border-t border-primary/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <EmailSignupPrompt variant="banner" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("footer.studyTools")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/lessons" className="hover:text-primary transition-colors" data-testid="link-footer-lessons">{t("footer.clinicalLessons")}</LocaleLink></li>
              <li><LocaleLink href="/flashcards" className="hover:text-primary transition-colors" data-testid="link-footer-flashcards">{t("nav.flashcards")}</LocaleLink></li>
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
              <li><LocaleLink href="/test-bank" className="hover:text-primary transition-colors" data-testid="link-footer-test-bank">{t("footer.testBank")}</LocaleLink></li>
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
              <li><LocaleLink href="/about" className="hover:text-primary transition-colors" data-testid="link-footer-about">{t("footer.about")}</LocaleLink></li>
              <li><LocaleLink href="/for-institutions" className="hover:text-primary transition-colors" data-testid="link-footer-for-schools">{t("footer.forSchools")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.newGradSupportSection")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/new-grad" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad">{t("footer.newGradHub")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/nursing" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-nursing">{t("footer.nursing")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/paramedic" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-paramedic">{t("footer.paramedic")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/respiratory-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-rrt">{t("footer.respiratoryTherapy")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/mlt" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-mlt">{t("footer.medLabTech")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.nursingSpecialties")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/nursing-specialties" className="hover:text-primary transition-colors" data-testid="link-footer-specialties">{t("footer.allSpecialties")}</LocaleLink></li>
              <li><LocaleLink href="/guides/icu-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-icu-guide">{t("footer.icuGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/nicu-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-nicu-guide">{t("footer.nicuGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/trauma-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-trauma-guide">{t("footer.traumaGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/med-surg-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-medsurg-guide">{t("footer.medSurgGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/mental-health-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-mental-health-guide">{t("footer.mentalHealthGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/orthopedic-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-ortho-guide">{t("footer.orthoGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/nephrology-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-nephro-guide">{t("footer.nephroGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/palliative-care-nursing-ultimate-guide" className="hover:text-primary transition-colors" data-testid="link-footer-palliative-guide">{t("footer.palliativeGuide")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.alliedHealthGuides")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/guides/paramedic-career-guide" className="hover:text-primary transition-colors" data-testid="link-footer-paramedic-guide">{t("footer.paramedicGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/respiratory-therapy-career-guide" className="hover:text-primary transition-colors" data-testid="link-footer-rrt-guide">{t("footer.rrtGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/medical-laboratory-technologist-guide" className="hover:text-primary transition-colors" data-testid="link-footer-mlt-guide">{t("footer.mltGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/diagnostic-imaging-technologist-guide" className="hover:text-primary transition-colors" data-testid="link-footer-imaging-guide">{t("footer.imagingGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/occupational-therapy-guide" className="hover:text-primary transition-colors" data-testid="link-footer-ot-guide">{t("footer.otGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/physical-therapy-guide" className="hover:text-primary transition-colors" data-testid="link-footer-pt-guide">{t("footer.ptGuide")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.healthcareJobs")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/new-grad#career-tools" className="hover:text-primary transition-colors" data-testid="link-footer-applynest">{t("footer.applyNest")}</LocaleLink></li>
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
              <li><LocaleLink href="/allied-health" className="hover:text-primary transition-colors" data-testid="link-footer-allied">{t("footer.alliedHealthExamPrep")}</LocaleLink></li>
              <li><LocaleLink href="/rrt" className="hover:text-primary transition-colors" data-testid="link-footer-allied-rrt">Respiratory Therapist</LocaleLink></li>
              <li><LocaleLink href="/paramedic" className="hover:text-primary transition-colors" data-testid="link-footer-allied-paramedic">Paramedic</LocaleLink></li>
              <li><LocaleLink href="/pharmacy-technician" className="hover:text-primary transition-colors" data-testid="link-footer-allied-pharmacy-tech">Pharmacy Technician</LocaleLink></li>
              <li><LocaleLink href="/mlt" className="hover:text-primary transition-colors" data-testid="link-footer-allied-mlt">Medical Lab Tech</LocaleLink></li>
              <li><LocaleLink href="/imaging" className="hover:text-primary transition-colors" data-testid="link-footer-allied-imaging">Diagnostic Imaging</LocaleLink></li>
              <li><LocaleLink href="/occupational-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-allied-ot">Occupational Therapy</LocaleLink></li>
              <li><LocaleLink href="/physical-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-allied-pt">Physical Therapy</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">{t("footer.ecosystem")}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><LocaleLink href="/exam-prep" className="hover:text-primary transition-colors" data-testid="link-footer-ecosystem-exam-prep">{t("footer.ecosystemExamPrep")}</LocaleLink></li>
              <li><LocaleLink href="/new-graduate-support" className="hover:text-primary transition-colors" data-testid="link-footer-ecosystem-new-grad">{t("footer.ecosystemNewGrad")}</LocaleLink></li>
              <li><LocaleLink href="/healthcare-careers" className="hover:text-primary transition-colors" data-testid="link-footer-ecosystem-jobs">{t("footer.ecosystemCareers")}</LocaleLink></li>
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
