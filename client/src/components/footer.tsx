import { LocaleLink } from "@/lib/LocaleLink";
import { ThemedLogo } from "@/components/themed-logo";
import { useI18n } from "@/lib/i18n";
import { EmailSignupPrompt } from "@/components/email-signup-prompt";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[var(--theme-card-bg)] border-t border-[var(--theme-nav-border)] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <EmailSignupPrompt variant="banner" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3">{t("footer.studyTools")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/lessons" className="hover:text-primary transition-colors" data-testid="link-footer-lessons">{t("footer.clinicalLessons")}</LocaleLink></li>
              <li><LocaleLink href="/flashcards" className="hover:text-primary transition-colors" data-testid="link-footer-flashcards">{t("nav.flashcards")}</LocaleLink></li>
              <li><LocaleLink href="/anatomy" className="hover:text-primary transition-colors" data-testid="link-footer-anatomy">{t("footer.anatomyExplorer")}</LocaleLink></li>
              <li><LocaleLink href="/pre-nursing" className="hover:text-primary transition-colors" data-testid="link-footer-pre-nursing">{t("footer.preNursing")}</LocaleLink></li>
              <li><LocaleLink href="/med-math" className="hover:text-primary transition-colors" data-testid="link-footer-med-math">{t("footer.medMath")}</LocaleLink></li>
              <li><LocaleLink href="/si-to-conventional-units-converter" className="hover:text-primary transition-colors" data-testid="link-footer-unit-converter">SI ↔ Conventional Converter</LocaleLink></li>
              <li><LocaleLink href="/medication-mastery" className="hover:text-primary transition-colors" data-testid="link-footer-medication-mastery">{t("footer.medicationMastery")}</LocaleLink></li>
              <li><LocaleLink href="/clinical-clarity" className="hover:text-primary transition-colors" data-testid="link-footer-clinical-clarity">{t("footer.clinicalClarity")}</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3">{t("footer.examPrep")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/mock-exams" className="hover:text-primary transition-colors" data-testid="link-footer-mock-exams">{t("footer.mockExams")}</LocaleLink></li>
              <li><LocaleLink href="/free-practice" className="hover:text-primary transition-colors" data-testid="link-footer-test-bank">{t("footer.testBank")}</LocaleLink></li>
              <li><LocaleLink href="/question-of-the-day" className="hover:text-primary transition-colors" data-testid="link-footer-qotd">{t("footer.questionOfTheDay")}</LocaleLink></li>
              <li><LocaleLink href="/lab-values" className="hover:text-primary transition-colors" data-testid="link-footer-lab-values">{t("footer.labValues")}</LocaleLink></li>
              <li><LocaleLink href="/case-simulations" className="hover:text-primary transition-colors" data-testid="link-footer-case-sims">{t("footer.caseSimulations")}</LocaleLink></li>
              <li><LocaleLink href="/lectures" className="hover:text-primary transition-colors" data-testid="link-footer-lectures">{t("footer.videoLectures")}</LocaleLink></li>
              <li><LocaleLink href="/osce-skills" className="hover:text-primary transition-colors" data-testid="link-footer-osce-skills">OSCE Skills Practice</LocaleLink></li>
              <li><LocaleLink href="/clinical-skills" className="hover:text-primary transition-colors" data-testid="link-footer-clinical-skills">Clinical Skills Guides</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">NP Certification Prep</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/np-exam-practice-questions" className="hover:text-primary transition-colors" data-testid="link-footer-np-exam-prep">NP Exam Prep Hub</LocaleLink></li>
              <li><LocaleLink href="/exam-prep" className="hover:text-primary transition-colors" data-testid="link-footer-exam-prep">Nursing Exam Prep Hub</LocaleLink></li>
              <li><LocaleLink href="/nclex-rn" className="hover:text-primary transition-colors" data-testid="link-footer-nclex-rn">NCLEX-RN Prep</LocaleLink></li>
              <li><LocaleLink href="/rex-pn" className="hover:text-primary transition-colors" data-testid="link-footer-rex-pn">REx-PN / NCLEX-PN Prep</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/shop" className="hover:text-primary transition-colors" data-testid="link-footer-store">{t("nav.store")}</LocaleLink></li>
              <li><LocaleLink href="/blog" className="hover:text-primary transition-colors" data-testid="link-footer-blog">{t("nav.blog")}</LocaleLink></li>
              <li><LocaleLink href="/faq" className="hover:text-primary transition-colors" data-testid="link-footer-faq">{t("footer.faq")}</LocaleLink></li>
              <li><LocaleLink href="/pricing" className="hover:text-primary transition-colors" data-testid="link-footer-pricing">{t("footer.pricing")}</LocaleLink></li>
              <li><LocaleLink href="/contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">{t("footer.contact")}</LocaleLink></li>
              <li><LocaleLink href="/feedback" className="hover:text-primary transition-colors" data-testid="link-footer-feedback">{t("footer.feedback")}</LocaleLink></li>
              <li><LocaleLink href="/about" className="hover:text-primary transition-colors" data-testid="link-footer-about">{t("footer.about")}</LocaleLink></li>
              <li><LocaleLink href="/for-institutions" className="hover:text-primary transition-colors" data-testid="link-footer-for-schools">{t("footer.forSchools")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.newGradSupportSection")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/newgrad" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad">{t("footer.newGradHub")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/nursing" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-nursing">{t("footer.nursing")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/paramedic" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-paramedic">{t("footer.paramedic")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/respiratory-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-rrt">{t("footer.respiratoryTherapy")}</LocaleLink></li>
              <li><LocaleLink href="/new-grad/mlt" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-mlt">{t("footer.medLabTech")}</LocaleLink></li>
              <li><LocaleLink href="/newgrad/burnout" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-burnout">Burnout Prevention</LocaleLink></li>
              <li><LocaleLink href="/newgrad/guides" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-guides">Survival Guides</LocaleLink></li>
              <li><LocaleLink href="/newgrad/clinical-references" className="hover:text-primary transition-colors" data-testid="link-footer-new-grad-clinical-refs">Clinical References</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.nursingSpecialties")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
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
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.alliedHealthGuides")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/guides/paramedic-career-guide" className="hover:text-primary transition-colors" data-testid="link-footer-paramedic-guide">{t("footer.paramedicGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/respiratory-therapy-career-guide" className="hover:text-primary transition-colors" data-testid="link-footer-rrt-guide">{t("footer.rrtGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/medical-laboratory-technologist-guide" className="hover:text-primary transition-colors" data-testid="link-footer-mlt-guide">{t("footer.mltGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/diagnostic-imaging-technologist-guide" className="hover:text-primary transition-colors" data-testid="link-footer-imaging-guide">{t("footer.imagingGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/occupational-therapy-guide" className="hover:text-primary transition-colors" data-testid="link-footer-ot-guide">{t("footer.otGuide")}</LocaleLink></li>
              <li><LocaleLink href="/guides/physical-therapy-guide" className="hover:text-primary transition-colors" data-testid="link-footer-pt-guide">{t("footer.ptGuide")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">Clinical Simulators</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/first-action-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-first-action-sim">First Action Simulator</LocaleLink></li>
              <li><LocaleLink href="/iv-complications-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-iv-sim">IV Complications Simulator</LocaleLink></li>
              <li><LocaleLink href="/deteriorating-patient-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-deteriorating-sim">Deteriorating Patient Sim</LocaleLink></li>
              <li><LocaleLink href="/blood-transfusion-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-transfusion-sim">Blood Transfusion Simulator</LocaleLink></li>
              <li><LocaleLink href="/electrolyte-abg-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-electrolyte-sim">Electrolyte &amp; ABG Simulator</LocaleLink></li>
              <li><LocaleLink href="/safety-hazard-simulator" className="hover:text-primary transition-colors" data-testid="link-footer-safety-sim">Safety Hazard Simulator</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.healthcareJobs")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/new-grad#career-tools" className="hover:text-primary transition-colors" data-testid="link-footer-applynest">{t("footer.applyNest")}</LocaleLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/terms" className="hover:text-primary transition-colors" data-testid="link-footer-terms">{t("footer.terms")}</LocaleLink></li>
              <li><LocaleLink href="/privacy" className="hover:text-primary transition-colors" data-testid="link-footer-privacy">{t("footer.privacy")}</LocaleLink></li>
              <li><LocaleLink href="/disclaimer" className="hover:text-primary transition-colors" data-testid="link-footer-disclaimer">{t("footer.disclaimer")}</LocaleLink></li>
              <li><LocaleLink href="/refund-policy" className="hover:text-primary transition-colors" data-testid="link-footer-refund">{t("footer.refundPolicy")}</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.alliedHealth")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/allied-health" className="hover:text-primary transition-colors" data-testid="link-footer-allied">{t("footer.alliedHealthExamPrep")}</LocaleLink></li>
              <li><LocaleLink href="/allied-health/rrt" className="hover:text-primary transition-colors" data-testid="link-footer-allied-rrt">Respiratory Therapist</LocaleLink></li>
              <li><LocaleLink href="/allied-health/paramedic" className="hover:text-primary transition-colors" data-testid="link-footer-allied-paramedic">Paramedic</LocaleLink></li>
              <li><LocaleLink href="/allied-health/pharmacy-technician" className="hover:text-primary transition-colors" data-testid="link-footer-allied-pharmacy-tech">Pharmacy Technician</LocaleLink></li>
              <li><LocaleLink href="/allied-health/mlt" className="hover:text-primary transition-colors" data-testid="link-footer-allied-mlt">Medical Lab Tech</LocaleLink></li>
              <li><LocaleLink href="/allied-health/imaging" className="hover:text-primary transition-colors" data-testid="link-footer-allied-imaging">Diagnostic Imaging</LocaleLink></li>
              <li><LocaleLink href="/allied-health/occupational-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-allied-ot">Occupational Therapy</LocaleLink></li>
              <li><LocaleLink href="/allied-health/physical-therapy" className="hover:text-primary transition-colors" data-testid="link-footer-allied-pt">Physical Therapy</LocaleLink></li>
              <li><LocaleLink href="/allied-health/careers" className="hover:text-primary transition-colors" data-testid="link-footer-allied-careers">Allied Careers</LocaleLink></li>
              <li><LocaleLink href="/allied-health/pricing" className="hover:text-primary transition-colors" data-testid="link-footer-allied-pricing">Allied Pricing</LocaleLink></li>
              <li><LocaleLink href="/allied-health/social-work" className="hover:text-primary transition-colors" data-testid="link-footer-allied-social-work">Social Work</LocaleLink></li>
              <li><LocaleLink href="/allied-health/psychotherapy" className="hover:text-primary transition-colors" data-testid="link-footer-allied-psychotherapy">Psychotherapy</LocaleLink></li>
            </ul>
            <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3 mt-6">{t("footer.educationEcosystem")}</h3>
            <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
              <li><LocaleLink href="/" className="hover:text-primary transition-colors" data-testid="link-footer-ecosystem-nursenest">NurseNest — Nursing and Healthcare Exam Prep</LocaleLink></li>
              <li><a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="link-footer-ecosystem-applynest">ApplyNest — Healthcare Program Applications and Career Tools</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--theme-separator)] pt-6 pb-6 mb-6">
          <h3 className="text-sm font-semibold text-[var(--theme-heading-text)] mb-3">Our Education Ecosystem</h3>
          <ul className="space-y-2 text-sm text-[var(--theme-muted-text)]">
            <li>
              <LocaleLink href="/" className="hover:text-primary transition-colors font-medium" data-testid="link-footer-ecosystem-nursenest">NurseNest</LocaleLink>
              <span className="ml-1">— Nursing exam prep, clinical tools, and career development</span>
            </li>
            <li>
              <a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium" data-testid="link-footer-ecosystem-applynest">ApplyNest</a>
              <span className="ml-1">— Healthcare program applications, admissions, and scholarship tools</span>
            </li>
          </ul>
        </div>
        <div className="border-t border-[var(--theme-separator)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ThemedLogo width={160} />
          </div>
          <div className="text-sm text-[var(--theme-muted-text)]">
            &copy; {new Date().getFullYear()} NurseNest. {t("footer.rights")}
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-[var(--theme-muted-text)] opacity-70 max-w-3xl mx-auto leading-relaxed">
          {t("footer.legalDisclaimer")}
        </div>
      </div>
    </footer>
  );
}
