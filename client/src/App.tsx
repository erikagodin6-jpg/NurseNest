import { Switch, Route, Router, Redirect, useLocation } from "wouter";
import { useBrowserLocation, navigate as wouterNavigate } from "wouter/use-browser-location";
import { useEffect, useState, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import { CareerProvider } from "@/lib/career-context";
import { SiteImagesProvider } from "@/components/admin-image-overlay";
import { getLocaleFromPath, isValidLocale, DEFAULT_LOCALE, deLocalizeSlug } from "@/lib/locale-utils";
import { ParamedicRegionProvider } from "@/allied/contexts/paramedic-region-context";
const AlliedLayout = lazy(() => import("@/allied/allied-layout").then(m => ({ default: m.AlliedLayout })));
const AlliedRoutes = lazy(() => import("@/allied/allied-routes").then(m => ({ default: m.AlliedRoutes })));
const TesterBanner = lazy(() => import("@/components/tester-banner").then(m => ({ default: m.TesterBanner })));
const UpgradePrompt = lazy(() => import("@/components/upgrade-prompt").then(m => ({ default: m.UpgradePrompt })));
const PWAInstallPrompt = lazy(() => import("@/components/pwa-install-prompt").then(m => ({ default: m.PWAInstallPrompt })));
const ExitIntentModal = lazy(() => import("@/components/exit-intent-modal").then(m => ({ default: m.ExitIntentModal })));
const MobileBottomNav = lazy(() => import("@/components/mobile-study-shell").then(m => ({ default: m.MobileBottomNav })));
const LazyAnalyticsTracker = lazy(() => import("@/components/analytics-tracker"));
const ReportProblemButton = lazy(() => import("@/components/report-problem-button").then(m => ({ default: m.ReportProblemButton })));

function PreviewBanner() {
  const { previewTier, setPreviewTier, isAdmin } = useAuth();
  if (!isAdmin || !previewTier) return null;
  const tierLabels: Record<string, string> = { free: "Free", rpn: "RPN Paid", rn: "RN Paid", np: "NP Paid" };
  return (
    <div className="w-full bg-amber-500 text-white text-center py-1.5 px-4 text-sm font-semibold shadow-md flex items-center justify-center gap-3 relative z-[9999]" data-testid="banner-preview-mode">
      <span>Preview Mode: {tierLabels[previewTier] || previewTier}</span>
      <button
        onClick={() => setPreviewTier(null)}
        className="bg-white text-amber-700 px-3 py-0.5 rounded-full text-xs font-bold hover:bg-amber-50 transition-colors"
        data-testid="button-exit-preview"
      >
        Exit Preview
      </button>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("React Error Boundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#dc2626" }}>Something went wrong</h1>
          <pre style={{ background: "#f3f4f6", padding: "16px", borderRadius: "8px", overflow: "auto", fontSize: "13px" }}>
            {this.state.error?.message}
            {"\n\n"}
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: "16px", padding: "8px 16px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
const Home = lazy(() => import("@/pages/home"));
import { usePageTracker } from "@/hooks/use-page-tracker";

const NotFound = lazy(() => import("@/pages/not-found"));
const Lessons = lazy(() => import("@/pages/lessons"));
const LessonDetail = lazy(() => import("@/pages/lesson-detail"));
const Flashcards = lazy(() => import("@/pages/flashcards"));
const PublicFlashcards = lazy(() => import("@/pages/public-flashcards"));
const TestBank = lazy(() => import("@/pages/test-bank"));
const UpgradePage = lazy(() => import("@/pages/upgrade"));
const Reports = lazy(() => import("@/pages/reports"));
const LoginPage = lazy(() => import("@/pages/login"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const SubscriptionSuccess = lazy(() => import("@/pages/subscription-success"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const ReferPage = lazy(() => import("@/pages/refer"));
const FAQPage = lazy(() => import("@/pages/faq"));
const AlliedHealthFAQPage = lazy(() => import("@/pages/allied-health-faq"));
const NewGradFAQPage = lazy(() => import("@/pages/new-grad-faq"));
const AnatomyPage = lazy(() => import("@/pages/anatomy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const DisclaimerPage = lazy(() => import("@/pages/disclaimer"));
const RefundPolicyPage = lazy(() => import("@/pages/refund-policy"));
const StartFreePage = lazy(() => import("@/pages/start-free"));
const AdminPage = lazy(() => import("@/pages/admin"));
const AdminProblemReportsPage = lazy(() => import("@/pages/admin-problem-reports"));
const AdminAiJobs = lazy(() => import("@/pages/admin-ai-jobs"));
const AdminBusinessHealth = lazy(() => import("@/pages/admin-business-health"));
const AdminContentCoverage = lazy(() => import("@/pages/admin-content-coverage"));
const AdminSiteHealth = lazy(() => import("@/pages/admin-site-health"));
const AdminQuestionBankPage = lazy(() => import("@/pages/admin-question-bank"));
const QBankExamPage = lazy(() => import("@/pages/qbank-exam"));
const QBankStudyPage = lazy(() => import("@/pages/qbank-study"));
const QBankPreviewPage = lazy(() => import("@/pages/qbank-preview"));
const SpecialtyPreviewPage = lazy(() => import("@/pages/specialty-preview"));
const GeneratorV2Page = lazy(() => import("@/pages/generator-v2"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MltStudentDashboard = lazy(() => import("@/allied/pages/mlt-student-dashboard"));
const ContentEditorPage = lazy(() => import("@/pages/content-editor"));
const MedMathPage = lazy(() => import("@/pages/med-math"));
const LabValuesPage = lazy(() => import("@/pages/lab-values"));
const ContentPage = lazy(() => import("@/pages/content-page"));
const BlogPage = lazy(() => import("@/pages/blog"));
const ClinicalClarityIndex = lazy(() => import("@/pages/clinical-clarity"));
const ClinicalClarityDetail = lazy(() => import("@/pages/clinical-clarity-detail"));
const CaseSimulationPage = lazy(() => import("@/pages/case-simulation"));
const MedicationMasteryPage = lazy(() => import("@/pages/medication-mastery"));
const SimulatorsPage = lazy(() => import("@/pages/simulators"));
const OSCESkillsPage = lazy(() => import("@/pages/osce-skills"));
const PreNursingPage = lazy(() => import("@/pages/pre-nursing"));
const MockExamsPage = lazy(() => import("@/pages/mock-exams"));
const MockExamSession = lazy(() => import("@/pages/mock-exam-session"));
const MockExamReport = lazy(() => import("@/pages/mock-exam-report"));
const ContactPage = lazy(() => import("@/pages/contact"));
const AboutPage = lazy(() => import("@/pages/about"));
const FeedbackPage = lazy(() => import("@/pages/feedback"));
const QuestionOfTheDay = lazy(() => import("@/pages/question-of-the-day"));
const QuestionBank = lazy(() => import("@/pages/question-bank"));
const SocialWorkerLessonsPage = lazy(() => import("@/pages/social-worker-lessons"));
const PerioperativeLessonsPage = lazy(() => import("@/allied/pages/perioperative-lessons"));
const FirstActionSimulatorPage = lazy(() => import("@/pages/first-action-simulator"));
const SafetyHazardSimulatorPage = lazy(() => import("@/pages/safety-hazard-simulator"));
const IVComplicationsSimulatorPage = lazy(() => import("@/pages/iv-complications-simulator"));
const ElectrolyteABGSimulatorPage = lazy(() => import("@/pages/electrolyte-abg-simulator"));
const DeterioratingPatientSimulatorPage = lazy(() => import("@/pages/deteriorating-patient-simulator"));
const BloodTransfusionSimulatorPage = lazy(() => import("@/pages/blood-transfusion-simulator"));
const LectureViewer = lazy(() => import("@/pages/lecture-viewer"));
const LecturesPage = lazy(() => import("@/pages/lectures"));
const DeckPage = lazy(() => import("@/pages/deck-page"));
const ProbabilitySimulatorPage = lazy(() => import("@/pages/probability-simulator"));
const SeoPage = lazy(() => import("@/pages/seo-page"));
const AdminSeoLessonsPage = lazy(() => import("@/pages/admin-seo-lessons"));
const AdminSeoDashboard = lazy(() => import("@/pages/admin-seo-dashboard"));
const AdminSeoPerformance = lazy(() => import("@/pages/admin-seo-performance"));
const AdminTranslationDashboard = lazy(() => import("@/pages/admin-translation-dashboard"));
const AdminTranslationCoverage = lazy(() => import("@/pages/admin-translation-coverage"));
const AdminSeoInspector = lazy(() => import("@/pages/admin-seo-inspector"));
const AdminContentIntelligence = lazy(() => import("@/pages/admin-content-intelligence"));
const AdminCatDashboard = lazy(() => import("@/pages/admin-cat-dashboard"));
const AdminRevenueDashboard = lazy(() => import("@/pages/admin-revenue-dashboard"));
const AdminPipelineDashboard = lazy(() => import("@/pages/admin-pipeline-dashboard"));
const AdminContentMetrics = lazy(() => import("@/pages/admin-content-metrics"));
const ComparePage = lazy(() => import("@/pages/compare"));
const NpExamHub = lazy(() => import("@/pages/np-exam-hub"));
const ShopPage = lazy(() => import("@/pages/shop"));
const ShopProductPage = lazy(() => import("@/pages/shop-product"));
const ProductBuilderPage = lazy(() => import("@/pages/product-builder"));
const PathwaysPage = lazy(() => import("@/pages/pathways"));
const RexPnGuide = lazy(() => import("@/pages/rex-pn-guide"));
const NclexRnGuide = lazy(() => import("@/pages/nclex-rn-guide"));
const DiagnosticAssessmentPage = lazy(() => import("@/pages/diagnostic-assessment"));
const EmailPreferencesPage = lazy(() => import("@/pages/email-preferences"));
const QBankFactoryPage = lazy(() => import("@/pages/qbank-factory"));
const AccountLibraryPage = lazy(() => import("@/pages/account-library"));
const AdminTrustShowcase = lazy(() => import("@/pages/admin-trust-showcase"));
const FreePracticePage = lazy(() => import("@/pages/free-practice"));
const FreeDemoExamPage = lazy(() => import("@/pages/free-demo-exam"));
const QuickStudyPage = lazy(() => import("@/pages/quick-study"));
const PracticeQuestionsPage = lazy(() => import("@/pages/practice-questions"));
const SubscribePage = lazy(() => import("@/pages/subscribe"));
const OnboardingPlanPage = lazy(() => import("@/pages/onboarding-plan"));
const StudyPlanPage = lazy(() => import("@/pages/study-plan"));
const NclexRnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexRnPractice })));
const NclexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexPnPractice })));
const RexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.RexPnPractice })));
const NpExamPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NpExamPractice })));
const NursingExamPrepPage = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.NursingExamPrep })));
const GlossaryPage = lazy(() => import("@/pages/glossary"));
const ApplyNestLanding = lazy(() => import("@/pages/applynest-landing"));
const ApplyNestCareerPage = lazy(() => import("@/pages/applynest-career"));
const ApplyNestResumeTemplates = lazy(() => import("@/pages/applynest-resume-templates"));
const ApplyNestInterviewPrep = lazy(() => import("@/pages/applynest-interview-prep"));
const ApplyNestJobSearchGuide = lazy(() => import("@/pages/applynest-job-search-guide"));
const CareerAISimulator = lazy(() => import("@/pages/career-tools/career-ai-simulator"));
const AdminCareersPage = lazy(() => import("@/pages/admin-careers"));
const NewGradHub = lazy(() => import("@/pages/new-grad-hub"));
const NewGradProfessionHub = lazy(() => import("@/pages/new-grad/profession-hub-page"));
const FirstYearGuidePage = lazy(() => import("@/pages/new-grad/first-year-guide-page"));
const ClinicalSkillsGuidePage = lazy(() => import("@/pages/new-grad/clinical-skills-guide-page"));
const ClinicalSkillsHub = lazy(() => import("@/pages/clinical-skills-hub"));
const ClinicalSkillsGuideDetail = lazy(() => import("@/pages/clinical-skills-guide"));
const UnitGuidePage = lazy(() => import("@/pages/new-grad/unit-guide-page"));
const CareerDevelopmentPage = lazy(() => import("@/pages/new-grad/career-development-page"));
const ClinicalScenarioPage = lazy(() => import("@/pages/new-grad/clinical-scenario-page"));

const NewGradClinicalReferencesPage = lazy(() => import("@/pages/newgrad/clinical-references-page"));
const NewGradClinicalReferenceDetail = lazy(() => import("@/pages/newgrad/clinical-reference-detail"));
const NewGradGuidesPage = lazy(() => import("@/pages/newgrad/guides-page"));
const NewGradCareerPage = lazy(() => import("@/pages/newgrad/career-page"));
const NewGradInterviewPage = lazy(() => import("@/pages/newgrad/interview-page"));
const NewGradResumePage = lazy(() => import("@/pages/newgrad/resume-page"));
const NewGradWorkplacePage = lazy(() => import("@/pages/newgrad/workplace-page"));
const NewGradBurnoutPage = lazy(() => import("@/pages/newgrad/burnout-page"));
const NewGradSalaryPage = lazy(() => import("@/pages/newgrad/salary-page"));
const NewGradProfDevPage = lazy(() => import("@/pages/newgrad/professional-development-page"));
const NewGradSurvivalGuideLanding = lazy(() => import("@/pages/newgrad/survival-guide-landing"));
const NewGradGuidePage = lazy(() => import("@/pages/new-grad/new-grad-guide-template"));
const SeoGuidePage = lazy(() => import("@/pages/new-grad/seo-guide-page"));
const NewGradCertificationPage = lazy(() => import("@/pages/new-grad-certification-page"));
const NewGradCertificationsHub = lazy(() => import("@/pages/newgrad/certifications-hub"));
const NewGradCertificationDetail = lazy(() => import("@/pages/newgrad/certification-detail"));
const NursingHub = lazy(() => import("@/pages/nursing-hub"));
const TrackLandingPage = lazy(() => import("@/pages/marketing/TrackLandingPage"));
const NclexLandingPage = lazy(() => import("@/pages/marketing/NclexLandingPage"));
const NursingSpecialtiesHub = lazy(() => import("@/pages/nursing-specialties-hub"));
const NursingSpecialtyDetail = lazy(() => import("@/pages/nursing-specialty-detail"));
const SpecialtyHubPage = lazy(() => import("@/pages/specialty-hub-page"));
const SpecialtyHubBySlug = lazy(() => import("@/pages/specialty-hub-page").then(m => ({ default: m.SpecialtyHubBySlug })));
const SpecialtySeoPage = lazy(() => import("@/pages/specialty-seo-page"));
const SpecialtySeoBySlug = lazy(() => import("@/pages/specialty-seo-page").then(m => ({ default: m.SpecialtySeoBySlug })));
const NursingCertificationsHub = lazy(() => import("@/pages/nursing-certifications-hub"));
const StudyPathwaysHub = lazy(() => import("@/pages/study-pathways-hub"));
const NursingHubPage = lazy(() => import("@/pages/nursing-hub-page"));
const RexPnHub = lazy(() => import("@/pages/rex-pn-hub"));
const RexPnExamFormat = lazy(() => import("@/pages/rex-pn-exam-format"));
const RexPnStrategies = lazy(() => import("@/pages/rex-pn-strategies"));
const RexPnWellness = lazy(() => import("@/pages/rex-pn-wellness"));
const PharmacologyHub = lazy(() => import("@/pages/pharmacology-hub"));
const AdminContentManager = lazy(() => import("@/pages/admin-content-manager"));
const AdminContentAudit = lazy(() => import("@/pages/admin-content-audit"));
const AdminContentAnalytics = lazy(() => import("@/pages/admin-content-analytics"));
const AdminProfessionsPage = lazy(() => import("@/pages/admin-professions"));
const AdminUniversalImport = lazy(() => import("@/pages/admin-universal-import"));
const ProfessionHubPage = lazy(() => import("@/pages/profession-hub"));
const AdminQBankImport = lazy(() => import("@/pages/admin-qbank-import"));
const AdminQBankManage = lazy(() => import("@/pages/admin-qbank-manage"));
const AdminFlashcardStudio = lazy(() => import("@/pages/admin-flashcard-studio"));
const AdminNgnGenerator = lazy(() => import("@/pages/admin-ngn-generator"));
const AdminAutopilot = lazy(() => import("@/pages/admin-autopilot"));
const AdminAiOps = lazy(() => import("@/pages/admin-ai-ops"));
const AdminContentExpansion = lazy(() => import("@/pages/admin-content-expansion"));
const AdminPageviews = lazy(() => import("@/pages/admin-pageviews"));
const StudyCoachingDashboard = lazy(() => import("@/pages/study-coaching-dashboard"));
const AdminStudyAnalytics = lazy(() => import("@/pages/admin-study-analytics"));
const AdminSeoAutopilot = lazy(() => import("@/pages/admin-seo-autopilot"));
const AlliedHealthHub = lazy(() => import("@/pages/allied-health-hub"));
const AlliedHealthProfessionPage = lazy(() => import("@/pages/allied-health-profession"));
const AlliedHealthArticlePage = lazy(() => import("@/pages/allied-health-article"));
const AdminAlliedHealthArticles = lazy(() => import("@/pages/admin-allied-health-articles"));
const AdminSeoDebug = lazy(() => import("@/pages/admin-seo-debug"));
const AdminAlliedMarketing = lazy(() => import("@/pages/admin-allied-marketing"));
const AdminSocialContent = lazy(() => import("@/pages/admin-social-content"));
const AdminProfessionAnalytics = lazy(() => import("@/pages/admin-profession-analytics"));
const AdminSeoProgress = lazy(() => import("@/pages/admin-seo-progress"));
const AdminWeeklyReports = lazy(() => import("@/pages/admin-weekly-reports"));
const AdminSearchPerformance = lazy(() => import("@/pages/admin-search-performance"));
const AdminCrossPlatformAnalytics = lazy(() => import("@/pages/admin-cross-platform-analytics"));
const OrderOfTheDraw = lazy(() => import("@/pages/order-of-the-draw"));
const NursingQuestionSeoPage = lazy(() => import("@/pages/nursing-question-seo-page"));
const NursingQuestionsIndexPage = lazy(() => import("@/pages/nursing-question-seo-page").then(m => ({ default: m.NursingQuestionsIndexPage })));
const QuestionPreviewPage = lazy(() => import("@/pages/question-preview"));
const NursingCareerPage = lazy(() => import("@/pages/nursing-career-pages"));
const TrialLanding = lazy(() => import("@/pages/trial-landing"));
const TrialSession = lazy(() => import("@/pages/trial-session"));
const TrialResults = lazy(() => import("@/pages/trial-results"));
const TrialUpgrade = lazy(() => import("@/pages/trial-upgrade"));
const AlliedHomePage = lazy(() => import("@/allied/pages/allied-home"));
const ForInstitutions = lazy(() => import("@/pages/for-institutions"));
const AdminInstitutions = lazy(() => import("@/pages/admin-institutions"));
const InstructorDashboard = lazy(() => import("@/pages/instructor-dashboard"));
const ExamLandingPage = lazy(() => import("@/pages/exam-landing"));
const ExamHubPage = lazy(() => import("@/pages/exam-hub"));
const ConditionPage = lazy(() => import("@/pages/condition-page"));
const TopicsIndex = lazy(() => import("@/pages/topics"));
const TopicDetail = lazy(() => import("@/pages/topic-detail"));
const MedicationPage = lazy(() => import("@/pages/medication-page"));
const LabValuePage = lazy(() => import("@/pages/lab-value-page"));
const MedicalImagingHub = lazy(() => import("@/pages/medical-imaging-hub"));
const MedicalImagingCanadaPage = lazy(() => import("@/pages/medical-imaging-country").then(m => ({ default: m.MedicalImagingCanada })));
const MedicalImagingUSAPage = lazy(() => import("@/pages/medical-imaging-country").then(m => ({ default: m.MedicalImagingUSA })));
const AdminMedicalImaging = lazy(() => import("@/pages/admin-medical-imaging"));
const AdminImageLibrary = lazy(() => import("@/pages/admin-image-library"));
const AdminDatabaseStatus = lazy(() => import("@/pages/admin-database-status"));
const AdminEnvironmentAudit = lazy(() => import("@/pages/admin-environment-audit"));
const AdminEnvironmentDiagnostic = lazy(() => import("@/pages/admin-environment-diagnostic"));
const AdminRnLessonAudit = lazy(() => import("@/pages/admin-rn-lesson-audit"));
const AdminDemoProgress = lazy(() => import("@/pages/admin-demo-progress"));
const ImagingLessonsPage = lazy(() => import("@/pages/imaging-lessons"));
const ImagingPositioningPage = lazy(() => import("@/pages/imaging-positioning"));
const ImagingPositioningDetailPage = lazy(() => import("@/pages/imaging-positioning-detail"));
const ImagingPhysicsPage = lazy(() => import("@/pages/imaging-physics"));
const ImagingPhysicsTopicPage = lazy(() => import("@/pages/imaging-physics-topic"));
const ImagingFlashcardsPage = lazy(() => import("@/pages/imaging-flashcards"));
const ImagingPracticeExamPage = lazy(() => import("@/pages/imaging-practice-exam"));
const ImagingExamSimulatorPage = lazy(() => import("@/pages/imaging-exam-simulator"));
const ImagingPricingPage = lazy(() => import("@/pages/imaging-pricing"));
const ImagingPricingCanadaPage = lazy(() => import("@/pages/imaging-pricing").then(m => ({ default: m.ImagingPricingCanada })));
const ImagingPricingUSAPage = lazy(() => import("@/pages/imaging-pricing").then(m => ({ default: m.ImagingPricingUSA })));
const ImagingStorePage = lazy(() => import("@/pages/imaging-store"));
const ImagingAccountPage = lazy(() => import("@/pages/imaging-account"));
const ImagingPurchaseSuccessPage = lazy(() => import("@/components/imaging-paywall").then(m => ({ default: m.ImagingPurchaseSuccess })));
const ClinicalCaseStudyPage = lazy(() => import("@/pages/clinical-case-study"));
const AdminCaseStudiesPage = lazy(() => import("@/pages/admin-case-studies"));
const ImagingSeoPage = lazy(() => import("@/pages/imaging-seo-page"));
const ImagingBlog = lazy(() => import("@/pages/imaging-blog"));
const RadiographyPracticeQuestionsLanding = lazy(() => import("@/pages/imaging-seo-landing").then(m => ({ default: m.RadiographyPracticeQuestions })));
const RadiographyPositioningGuideLanding = lazy(() => import("@/pages/imaging-seo-landing").then(m => ({ default: m.RadiographyPositioningGuide })));
const RadiographyArtifactRecognitionLanding = lazy(() => import("@/pages/imaging-seo-landing").then(m => ({ default: m.RadiographyArtifactRecognition })));
const ImagingStudyPlanGenerator = lazy(() => import("@/pages/imaging-study-plan-generator"));
const RadiographyReadinessQuiz = lazy(() => import("@/pages/radiography-readiness-quiz"));
const ImagingMarketingDashboard = lazy(() => import("@/pages/imaging-marketing-dashboard"));
const DemoWeakAreas = lazy(() => import("@/pages/demo-weak-areas"));
const DemoStudyPlanPage = lazy(() => import("@/pages/demo-study-plan"));
const ExamReadinessDemo = lazy(() => import("@/pages/exam-readiness-demo"));
const DemoLearningProgress = lazy(() => import("@/pages/demo-learning-progress"));
const DemoAdaptiveReport = lazy(() => import("@/pages/demo-adaptive-report"));
const DemoScreenshotStudio = lazy(() => import("@/pages/demo-screenshot-studio"));
const DemoExamReview = lazy(() => import("@/pages/demo-exam-review"));
const DemoFlashcardMastery = lazy(() => import("@/pages/demo-flashcard-mastery"));
const DemoStudyPlanScreenshot = lazy(() => import("@/pages/demo-study-plan-screenshot"));
const DemoLessonRationale = lazy(() => import("@/pages/demo-lesson-rationale"));
const DemoStudentOverview = lazy(() => import("@/pages/demo-student-overview"));
const DemoHeatmapGrid = lazy(() => import("@/pages/demo-heatmap-grid"));
const DemoCatExam = lazy(() => import("@/pages/demo-cat-exam"));
const DemoNgnCaseStudy = lazy(() => import("@/pages/demo-ngn-case-study"));
const DemoPremiumValue = lazy(() => import("@/pages/demo-premium-value"));
const DemoStreakAnalytics = lazy(() => import("@/pages/demo-streak-analytics"));
const DemoSessionComparison = lazy(() => import("@/pages/demo-session-comparison"));
const DemoHeroShowcase = lazy(() => import("@/pages/demo-hero-showcase"));
const SeoPracticeQuiz = lazy(() => import("@/pages/seo-practice-quiz"));
const ParamedicPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.ParamedicPracticeQuestions })));
const RrtPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.RrtPracticeQuestions })));
const MltPracticeQuestionsPage = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.MltPracticeQuestions })));
const ImagingPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.ImagingPracticeQuestions })));
const SocialWorkPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.SocialWorkPracticeQuestions })));
const PsychotherapyPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.PsychotherapyPracticeQuestions })));
const AddictionsPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.AddictionsPracticeQuestions })));
const OccupationalTherapyPracticeQuestions = lazy(() => import("@/pages/profession-practice-questions").then(m => ({ default: m.OccupationalTherapyPracticeQuestions })));
const BookmarksPage = lazy(() => import("@/pages/bookmarks"));
const CustomPracticePage = lazy(() => import("@/pages/custom-practice"));
const PerformanceAnalyticsPage = lazy(() => import("@/pages/performance-analytics"));
const OfflineStudyPage = lazy(() => import("@/pages/offline-study"));
const AdminMockResults = lazy(() => import("@/pages/admin-mock-results"));
const EncyclopediaLanding = lazy(() => import("@/pages/encyclopedia-landing"));
const EncyclopediaHub = lazy(() => import("@/pages/encyclopedia-hub"));
const EncyclopediaEntry = lazy(() => import("@/pages/encyclopedia-entry"));
const ProgrammaticSeoPage = lazy(() => import("@/pages/programmatic-seo-page"));
const AdminProgrammaticSeo = lazy(() => import("@/pages/admin-programmatic-seo"));
const NursingAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.NursingAuthorityHub })));
const ParamedicAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.ParamedicAuthorityHub })));
const RespiratoryTherapyAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.RespiratoryTherapyAuthorityHub })));
const MltAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.MltAuthorityHub })));
const ImagingAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.ImagingAuthorityHub })));
const SocialWorkAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.SocialWorkAuthorityHub })));
const PsychotherapyAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.PsychotherapyAuthorityHub })));
const AddictionsAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.AddictionsAuthorityHub })));
const OccupationalTherapyAuthorityHub = lazy(() => import("@/pages/authority-hubs").then(m => ({ default: m.OccupationalTherapyAuthorityHub })));
const CareerGuidePage = lazy(() => import("@/allied/pages/career-guide-page"));
const AuthorityContentPage = lazy(() => import("@/pages/authority-content-page"));
const PerioperativeNursingHub = lazy(() => import("@/pages/perioperative-hub-pages"));
const PreoperativeCareHub = lazy(() => import("@/pages/perioperative-hub-pages").then(m => ({ default: m.PreoperativeCareHub })));
const PreoperativeNursingGuide = lazy(() => import("@/pages/perioperative-hub-pages").then(m => ({ default: m.PreoperativeNursingGuide })));
const PerioperativeNurseCareer = lazy(() => import("@/pages/perioperative-hub-pages").then(m => ({ default: m.PerioperativeNurseCareer })));
const HealthcareGuidesIndex = lazy(() => import("@/pages/healthcare-guide-page").then(m => ({ default: m.HealthcareGuidesIndex })));
const UnifiedGuidePage = lazy(() => import("@/pages/unified-guide-page"));
const ClusterGuidePage = lazy(() => import("@/pages/cluster-guide-page"));
const ExamPrepHub = lazy(() => import("@/pages/exam-prep-hub"));
const NewGraduateSupportHub = lazy(() => import("@/pages/new-graduate-support-hub"));
const HealthcareCareersHub = lazy(() => import("@/pages/healthcare-careers-hub"));
const GenericCareerJourney = lazy(() => import("@/pages/career-journey"));
const ProfessionCareerJourney = lazy(() => import("@/pages/career-journey").then(m => ({ default: m.ProfessionCareerJourney })));
const NclexReadinessScore = lazy(() => import("@/pages/nclex-readiness-score"));
const SeoLandingPage = lazy(() => import("@/pages/seo-landing-page"));
const SeoLandingBySlug = lazy(() => import("@/pages/seo-landing-page").then(m => ({ default: m.SeoLandingBySlug })));
const ExamBlueprintHub = lazy(() => import("@/pages/exam-blueprint-hub"));
const ExamBlueprintCategory = lazy(() => import("@/pages/exam-blueprint-category"));
const TopicClusterPage = lazy(() => import("@/pages/topic-cluster-page"));
const TopicClusterBySlug = lazy(() => import("@/pages/topic-cluster-page").then(m => ({ default: m.TopicClusterBySlug })));

function ProtectedTestBankRoute({ children }: { children: ReactNode }) {
  const { user, isLoading, hasAccess } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!hasAccess("rpn")) {
      navigate("/pricing");
      return;
    }
  }, [user, isLoading, hasAccess, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !hasAccess("rpn")) {
    return null;
  }

  return <>{children}</>;
}


function PageTracker() {
  usePageTracker();
  return null;
}

function CopyProtection() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-selectable");
      return () => {
        document.body.classList.remove("admin-selectable");
      };
    }

    document.body.classList.remove("admin-selectable");

    function isEditableTarget(target: EventTarget | null): boolean {
      if (!target || !(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return true;
      if (target.isContentEditable) return true;
      if (target.closest(".allow-select")) return true;
      return false;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        document.body.style.filter = "blur(20px)";
        setTimeout(() => { document.body.style.filter = ""; }, 1500);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S" || e.key === "i" || e.key === "I")) {
        const imgs = document.querySelectorAll(".protected-image");
        imgs.forEach((img) => { (img as HTMLElement).style.visibility = "hidden"; });
        setTimeout(() => {
          imgs.forEach((img) => { (img as HTMLElement).style.visibility = "visible"; });
        }, 2000);
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S") && !e.shiftKey) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C" || e.key === "x" || e.key === "X" || e.key === "a" || e.key === "A") && !isEditableTarget(e.target)) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleCut = (e: ClipboardEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (!isEditableTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const imgs = document.querySelectorAll(".protected-image");
        imgs.forEach((img) => { (img as HTMLElement).style.visibility = "hidden"; });
        setTimeout(() => {
          if (document.visibilityState === "visible") {
            const imgs2 = document.querySelectorAll(".protected-image");
            imgs2.forEach((img) => { (img as HTMLElement).style.visibility = "visible"; });
          }
        }, 300);
      } else {
        const imgs = document.querySelectorAll(".protected-image");
        imgs.forEach((img) => { (img as HTMLElement).style.visibility = "visible"; });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAdmin]);

  return null;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/start-free" component={StartFreePage} />
        <Route path="/pathways" component={PathwaysPage} />
        <Route path="/med-math" component={MedMathPage} />
        <Route path="/lab-values" component={LabValuesPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/admin/ai-jobs" component={AdminAiJobs} />
        <Route path="/admin/business-health" component={AdminBusinessHealth} />
        <Route path="/admin/problem-reports" component={AdminProblemReportsPage} />
        <Route path="/:locale/admin/problem-reports" component={AdminProblemReportsPage} />
        <Route path="/admin/content-coverage" component={AdminContentCoverage} />
        <Route path="/admin/site-health" component={AdminSiteHealth} />
        <Route path="/admin/social-content" component={AdminSocialContent} />
        <Route path="/admin/question-bank" component={AdminQuestionBankPage} />
        <Route path="/qbank/exam" component={QBankExamPage} />
        <Route path="/qbank/study" component={QBankStudyPage} />
        <Route path="/qbank/browse" component={QBankPreviewPage} />
        <Route path="/admin/generator-v2" component={GeneratorV2Page} />
        <Route path="/:locale/admin/generator-v2" component={GeneratorV2Page} />
        <Route path="/content-editor" component={ContentEditorPage} />
        <Route path="/case-simulations" component={CaseSimulationPage} />
        <Route path="/first-action-simulator" component={FirstActionSimulatorPage} />
        <Route path="/safety-hazard-simulator" component={SafetyHazardSimulatorPage} />
        <Route path="/iv-complications-simulator" component={IVComplicationsSimulatorPage} />
        <Route path="/electrolyte-abg-simulator" component={ElectrolyteABGSimulatorPage} />
        <Route path="/deteriorating-patient-simulator" component={DeterioratingPatientSimulatorPage} />
        <Route path="/blood-transfusion-simulator" component={BloodTransfusionSimulatorPage} />
        <Route path="/simulators/clinical-skills" component={SimulatorsPage} />
        <Route path="/simulators/osce" component={SimulatorsPage} />
        <Route path="/simulators/clinical-lab" component={SimulatorsPage} />
        <Route path="/osce-skills" component={OSCESkillsPage} />
        <Route path="/newgrad/certifications/:slug" component={NewGradCertificationDetail} />
        <Route path="/newgrad/certifications" component={NewGradCertificationsHub} />
        <Route path="/new-grad/certifications/:slug">{(params: any) => <Redirect to={`/newgrad/certifications/${params.slug}`} />}</Route>
        <Route path="/new-grad/certifications">{() => <Redirect to="/newgrad/certifications" />}</Route>
        <Route path="/new-grad/clinical-references/:slug">{(params: any) => <Redirect to={`/newgrad/clinical-references/${params.slug}`} />}</Route>
        <Route path="/new-grad/clinical-references">{() => <Redirect to="/newgrad/clinical-references" />}</Route>
        <Route path="/new-grad/clinical-skills/:skill" component={ClinicalSkillsGuidePage} />
        <Route path="/new-grad/unit-guide/:unit" component={UnitGuidePage} />
        <Route path="/new-grad/career/:path" component={CareerDevelopmentPage} />
        <Route path="/new-grad/scenario/:slug" component={ClinicalScenarioPage} />

        <Route path="/newgrad/survival-guide" component={NewGradSurvivalGuideLanding} />
        <Route path="/newgrad/clinical-references/:slug" component={NewGradClinicalReferenceDetail} />
        <Route path="/newgrad/clinical-references" component={NewGradClinicalReferencesPage} />
        <Route path="/newgrad/guides" component={NewGradGuidesPage} />
        <Route path="/newgrad/career" component={NewGradCareerPage} />
        <Route path="/newgrad/interview" component={NewGradInterviewPage} />
        <Route path="/newgrad/resume" component={NewGradResumePage} />
        <Route path="/newgrad/workplace" component={NewGradWorkplacePage} />
        <Route path="/newgrad/burnout" component={NewGradBurnoutPage} />
        <Route path="/newgrad/salary" component={NewGradSalaryPage} />
        <Route path="/newgrad/professional-development" component={NewGradProfDevPage} />
        <Route path="/newgrad"><Redirect to="/new-grad" /></Route>
        <Route path="/new-grad/faq" component={NewGradFAQPage} />
        <Route path="/new-grad/first-year-nurse-survival-guide">{() => <SeoLandingBySlug slug="new-grad/first-year-nurse-survival-guide" />}</Route>
        <Route path="/new-grad/new-nurse-orientation-tips">{() => <SeoLandingBySlug slug="new-grad/new-nurse-orientation-tips" />}</Route>
        <Route path="/new-grad/:profession/:guideSlug" component={SeoGuidePage} />
        <Route path="/new-grad/:profession">{(params: any) => {
          const prof = params.profession || "";
          if (prof.endsWith("-first-year-guide")) {
            return <FirstYearGuidePage />;
          }
          return <NewGradProfessionHub />;
        }}</Route>
        <Route path="/new-grad" component={NewGradHub} />
        <Route path="/exam-prep" component={ExamPrepHub} />
        <Route path="/new-graduate-support" component={NewGraduateSupportHub} />
        <Route path="/healthcare-careers" component={HealthcareCareersHub} />
        <Route path="/career-guides/how-to-become-an-icu-nurse">{() => <SeoLandingBySlug slug="career-guides/how-to-become-an-icu-nurse" />}</Route>
        <Route path="/career-guides/how-to-become-an-er-nurse">{() => <SeoLandingBySlug slug="career-guides/how-to-become-an-er-nurse" />}</Route>
        <Route path="/career-guides/how-to-become-a-pediatric-nurse">{() => <SeoLandingBySlug slug="career-guides/how-to-become-a-pediatric-nurse" />}</Route>

        {/* Allied health routes handled by catch-all AlliedRoutes below */}

        <Route path="/nurse-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/paramedic-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/respiratory-therapist-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/mlt-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/imaging-tech-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/social-work-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/psychotherapy-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/addictions-counselor-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/addictions-counseling-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/ot-first-year-survival-guide" component={NewGradGuidePage} />
        <Route path="/applynest/careers/:profession" component={ApplyNestCareerPage} />
        <Route path="/applynest/resume-templates" component={ApplyNestResumeTemplates} />
        <Route path="/applynest/interview-prep" component={ApplyNestInterviewPrep} />
        <Route path="/applynest/job-search-guide" component={ApplyNestJobSearchGuide} />
        <Route path="/applynest" component={ApplyNestLanding} />
        <Route path="/clinical-skills" component={ClinicalSkillsHub} />
        <Route path="/clinical-skills/:slug" component={ClinicalSkillsGuideDetail} />
        <Route path="/unit-guides/:slug" component={NewGradGuidePage} />
        <Route path="/career-development/:slug" component={NewGradGuidePage} />
        <Route path="/clinical-scenarios/:slug" component={NewGradGuidePage} />
        <Route path="/questions/:slug" component={QuestionPreviewPage} />
        <Route path="/rpn/questions/:topicSlug">{() => <NursingQuestionSeoPage tier="rpn" />}</Route>
        <Route path="/rpn/questions">{() => <NursingQuestionsIndexPage tier="rpn" />}</Route>
        <Route path="/rn/questions/:topicSlug">{() => <NursingQuestionSeoPage tier="rn" />}</Route>
        <Route path="/rn/questions">{() => <NursingQuestionsIndexPage tier="rn" />}</Route>
        <Route path="/np/questions/:topicSlug">{() => <NursingQuestionSeoPage tier="np" />}</Route>
        <Route path="/np/questions">{() => <NursingQuestionsIndexPage tier="np" />}</Route>
        <Route path="/career-journey/:slug" component={ProfessionCareerJourney} />
        <Route path="/career-journey" component={GenericCareerJourney} />
        <Route path="/how-to-become-a-nurse/:track" component={NursingCareerPage} />
        <Route path="/pass-nclex-first-time" component={NclexLandingPage} />
        <Route path="/rpn">{() => <TrackLandingPage track="rpn" />}</Route>
        <Route path="/rn">{() => <TrackLandingPage track="rn" />}</Route>
        <Route path="/np">{() => <TrackLandingPage track="np" />}</Route>
        <Route path="/nursing/top-100-nclex-practice-questions" component={AuthorityContentPage} />
        <Route path="/nursing/rex-pn-practice-questions">{() => <SeoLandingBySlug slug="nursing/rex-pn-practice-questions" />}</Route>
        <Route path="/nursing/rex-pn-study-guide">{() => <SeoLandingBySlug slug="nursing/rex-pn-study-guide" />}</Route>
        <Route path="/nursing/rex-pn-flashcards">{() => <SeoLandingBySlug slug="nursing/rex-pn-flashcards" />}</Route>
        <Route path="/nursing/rex-pn-mock-exam">{() => <SeoLandingBySlug slug="nursing/rex-pn-mock-exam" />}</Route>
        <Route path="/nursing/nclex-rn-practice-questions">{() => <SeoLandingBySlug slug="nursing/nclex-rn-practice-questions" />}</Route>
        <Route path="/nursing/nclex-rn-study-guide">{() => <SeoLandingBySlug slug="nursing/nclex-rn-study-guide" />}</Route>
        <Route path="/nursing/nclex-pn-practice-questions">{() => <SeoLandingBySlug slug="nursing/nclex-pn-practice-questions" />}</Route>
        <Route path="/nursing/nclex-pn-flashcards">{() => <SeoLandingBySlug slug="nursing/nclex-pn-flashcards" />}</Route>
        <Route path="/nursing/np-exam-prep">{() => <SeoLandingBySlug slug="nursing/np-exam-prep" />}</Route>
        <Route path="/nursing" component={NursingAuthorityHub} />
        <Route path="/nursing-specialties" component={NursingSpecialtiesHub} />
        <Route path="/nursing-specialties/:slug" component={NursingSpecialtyDetail} />

        {/* 16 Specialty Hub Pages */}
        <Route path="/icu">{() => <SpecialtyHubBySlug slug="icu" />}</Route>
        <Route path="/pediatric-icu">{() => <SpecialtyHubBySlug slug="pediatric-icu" />}</Route>
        <Route path="/nicu">{() => <SpecialtyHubBySlug slug="nicu" />}</Route>
        <Route path="/med-surg">{() => <SpecialtyHubBySlug slug="med-surg" />}</Route>
        <Route path="/orthopedics">{() => <SpecialtyHubBySlug slug="orthopedics" />}</Route>
        <Route path="/mental-health">{() => <SpecialtyHubBySlug slug="mental-health" />}</Route>
        <Route path="/nephrology">{() => <SpecialtyHubBySlug slug="nephrology" />}</Route>
        <Route path="/labor-and-delivery">{() => <SpecialtyHubBySlug slug="labor-and-delivery" />}</Route>
        <Route path="/postpartum">{() => <SpecialtyHubBySlug slug="postpartum" />}</Route>
        <Route path="/neurology">{() => <SpecialtyHubBySlug slug="neurology" />}</Route>
        <Route path="/palliative-care">{() => <SpecialtyHubBySlug slug="palliative-care" />}</Route>
        <Route path="/trauma">{() => <SpecialtyHubBySlug slug="trauma" />}</Route>
        <Route path="/public-health">{() => <SpecialtyHubBySlug slug="public-health" />}</Route>
        <Route path="/community-nursing">{() => <SpecialtyHubBySlug slug="community-nursing" />}</Route>
        <Route path="/long-term-care">{() => <SpecialtyHubBySlug slug="long-term-care" />}</Route>
        <Route path="/rehabilitation">{() => <SpecialtyHubBySlug slug="rehabilitation" />}</Route>
        <Route path="/emergency-nursing-specialty">{() => <SpecialtyHubBySlug slug="emergency-nursing-specialty" />}</Route>
        <Route path="/oncology-nursing-specialty">{() => <SpecialtyHubBySlug slug="oncology-nursing-specialty" />}</Route>
        <Route path="/perioperative-nursing-specialty">{() => <SpecialtyHubBySlug slug="perioperative-nursing-specialty" />}</Route>
        <Route path="/critical-care-specialty">{() => <SpecialtyHubBySlug slug="critical-care-specialty" />}</Route>

        {/* 20 Specialty SEO Landing Pages */}
        <Route path="/icu-nursing-guide">{() => <SpecialtySeoBySlug slug="icu-nursing-guide" />}</Route>
        <Route path="/pediatric-icu-nursing-guide">{() => <SpecialtySeoBySlug slug="pediatric-icu-nursing-guide" />}</Route>
        <Route path="/nicu-nursing-guide">{() => <SpecialtySeoBySlug slug="nicu-nursing-guide" />}</Route>
        <Route path="/med-surg-nursing-guide">{() => <SpecialtySeoBySlug slug="med-surg-nursing-guide" />}</Route>
        <Route path="/orthopedic-nursing-guide">{() => <SpecialtySeoBySlug slug="orthopedic-nursing-guide" />}</Route>
        <Route path="/mental-health-nursing-guide">{() => <SpecialtySeoBySlug slug="mental-health-nursing-guide" />}</Route>
        <Route path="/nephrology-nursing-guide">{() => <SpecialtySeoBySlug slug="nephrology-nursing-guide" />}</Route>
        <Route path="/labor-and-delivery-nursing-guide">{() => <SpecialtySeoBySlug slug="labor-and-delivery-nursing-guide" />}</Route>
        <Route path="/postpartum-nursing-guide">{() => <SpecialtySeoBySlug slug="postpartum-nursing-guide" />}</Route>
        <Route path="/neurology-nursing-guide">{() => <SpecialtySeoBySlug slug="neurology-nursing-guide" />}</Route>
        <Route path="/palliative-care-nursing-guide">{() => <SpecialtySeoBySlug slug="palliative-care-nursing-guide" />}</Route>
        <Route path="/trauma-nursing-guide">{() => <SpecialtySeoBySlug slug="trauma-nursing-guide" />}</Route>
        <Route path="/public-health-nursing-guide">{() => <SpecialtySeoBySlug slug="public-health-nursing-guide" />}</Route>
        <Route path="/community-nursing-guide">{() => <SpecialtySeoBySlug slug="community-nursing-guide" />}</Route>
        <Route path="/long-term-care-nursing-guide">{() => <SpecialtySeoBySlug slug="long-term-care-nursing-guide" />}</Route>
        <Route path="/rehabilitation-nursing-guide">{() => <SpecialtySeoBySlug slug="rehabilitation-nursing-guide" />}</Route>
        <Route path="/emergency-nursing-specialty-guide">{() => <SpecialtySeoBySlug slug="emergency-nursing-specialty-guide" />}</Route>
        <Route path="/oncology-nursing-specialty-guide">{() => <SpecialtySeoBySlug slug="oncology-nursing-specialty-guide" />}</Route>
        <Route path="/perioperative-nursing-specialty-guide">{() => <SpecialtySeoBySlug slug="perioperative-nursing-specialty-guide" />}</Route>
        <Route path="/critical-care-specialty-guide">{() => <SpecialtySeoBySlug slug="critical-care-specialty-guide" />}</Route>

        {/* Nursing Content Hub */}
        <Route path="/nursing-certifications" component={NursingCertificationsHub} />
        <Route path="/nursing-certifications-hub">{() => <Redirect to="/newgrad/certifications" />}</Route>
        <Route path="/study-pathways" component={StudyPathwaysHub} />
        <Route path="/certifications/ccrn-exam-prep">{() => <SeoLandingBySlug slug="certifications/ccrn-exam-prep" />}</Route>
        <Route path="/certifications/cen-exam-prep">{() => <SeoLandingBySlug slug="certifications/cen-exam-prep" />}</Route>
        <Route path="/certifications/tncc-overview">{() => <SeoLandingBySlug slug="certifications/tncc-overview" />}</Route>
        <Route path="/certifications/acls-overview">{() => <SeoLandingBySlug slug="certifications/acls-overview" />}</Route>
        <Route path="/certifications/pals-overview">{() => <SeoLandingBySlug slug="certifications/pals-overview" />}</Route>
        <Route path="/certifications/:slug">{() => <NursingHubPage pageType="certification" />}</Route>
        <Route path="/specialties/:slug">{() => <NursingHubPage pageType="specialty" />}</Route>
        <Route path="/study-pathways/:slug">{() => <NursingHubPage pageType="study-pathway" />}</Route>
        <Route path="/pre-nursing" component={PreNursingPage} />
        <Route path="/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/mock-exams/:id" component={MockExamSession} />
        <Route path="/mock-exams" component={MockExamsPage} />
        <Route path="/probability-simulator" component={ProbabilitySimulatorPage} />
        <Route path="/shop/:slug" component={ShopProductPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/compare/best-nclex-question-bank">{() => <SeoLandingBySlug slug="compare/best-nclex-question-bank" />}</Route>
        <Route path="/compare/best-rex-pn-prep">{() => <SeoLandingBySlug slug="compare/best-rex-pn-prep" />}</Route>
        <Route path="/compare/uworld-alternative-nursing">{() => <SeoLandingBySlug slug="compare/uworld-alternative-nursing" />}</Route>
        <Route path="/compare/:slug" component={ComparePage} />
        <Route path="/np-exam-guide/:slug" component={NpExamHub} />
        <Route path="/np-exam-guide" component={NpExamHub} />
        <Route path="/rex-pn/exam-format" component={RexPnExamFormat} />
        <Route path="/rex-pn/test-taking-strategies" component={RexPnStrategies} />
        <Route path="/rex-pn/strategies" component={RexPnStrategies} />
        <Route path="/rex-pn/wellness" component={RexPnWellness} />
        <Route path="/rex-pn/practice-tests" component={MockExamsPage} />
        <Route path="/rex-pn" component={RexPnHub} />
        <Route path="/rex-pn-guide/:slug" component={RexPnGuide} />
        <Route path="/rex-pn-guide" component={RexPnGuide} />
        <Route path="/nclex-rn-guide/:slug" component={NclexRnGuide} />
        <Route path="/nclex-rn-guide" component={NclexRnGuide} />
        <Route path="/study-guide/:slug" component={SeoPage} />
        <Route path="/admin/seo" component={AdminSeoDashboard} />
        <Route path="/admin/seo-performance" component={AdminSeoPerformance} />
        <Route path="/admin/translations" component={AdminTranslationDashboard} />
        <Route path="/admin/translation-coverage" component={AdminTranslationCoverage} />
        <Route path="/admin/seo-inspector" component={AdminSeoInspector} />
        <Route path="/admin/content-intelligence" component={AdminContentIntelligence} />
        <Route path="/admin/cat" component={AdminCatDashboard} />
        <Route path="/admin/revenue" component={AdminRevenueDashboard} />
        <Route path="/admin/pipeline" component={AdminPipelineDashboard} />
        <Route path="/admin/content-metrics" component={AdminContentMetrics} />
        <Route path="/admin/content-manager" component={AdminContentManager} />
        <Route path="/admin/content-audit" component={AdminContentAudit} />
        <Route path="/admin/content-analytics" component={AdminContentAnalytics} />
        <Route path="/admin/qbank/import" component={AdminQBankImport} />
        <Route path="/admin/qbank/manage" component={AdminQBankManage} />
        <Route path="/admin/flashcard-studio" component={AdminFlashcardStudio} />
        <Route path="/admin/qbank/ngn-generator" component={AdminNgnGenerator} />
        <Route path="/admin/autopilot" component={AdminAutopilot} />
        <Route path="/admin/ai-ops" component={AdminAiOps} />
        <Route path="/admin/content-expansion" component={AdminContentExpansion} />
        <Route path="/admin/pageviews" component={AdminPageviews} />
        <Route path="/admin/seo-visual-autopilot" component={AdminSeoAutopilot} />
        <Route path="/admin/allied-health-articles" component={AdminAlliedHealthArticles} />
        <Route path="/admin/seo-debug" component={AdminSeoDebug} />
        <Route path="/admin/allied-marketing" component={AdminAlliedMarketing} />
        <Route path="/admin/profession-analytics" component={AdminProfessionAnalytics} />
        <Route path="/admin/seo-progress" component={AdminSeoProgress} />
        <Route path="/admin/weekly-reports" component={AdminWeeklyReports} />
        <Route path="/admin/search-performance" component={AdminSearchPerformance} />
        <Route path="/admin/cross-platform" component={AdminCrossPlatformAnalytics} />
        <Route path="/admin/programmatic-seo" component={AdminProgrammaticSeo} />
        <Route path="/admin/seo-lessons" component={AdminSeoLessonsPage} />
        <Route path="/admin/institutions" component={AdminInstitutions} />
        <Route path="/instructor" component={InstructorDashboard} />
        <Route path="/admin/medical-imaging" component={AdminMedicalImaging} />
        <Route path="/admin/image-library" component={AdminImageLibrary} />
        <Route path="/admin/database-status" component={AdminDatabaseStatus} />
        <Route path="/admin/environment-audit" component={AdminEnvironmentAudit} />
        <Route path="/admin/environment-diagnostic" component={AdminEnvironmentDiagnostic} />
        <Route path="/admin/rn-lesson-audit" component={AdminRnLessonAudit} />
        <Route path="/admin/demo-progress" component={AdminDemoProgress} />
        <Route path="/admin/mock-results" component={AdminMockResults} />
        <Route path="/admin/demo-adaptive-report" component={DemoAdaptiveReport} />
        <Route path="/admin/demo-screenshot-studio" component={DemoScreenshotStudio} />
        <Route path="/admin/demo-exam-review" component={DemoExamReview} />
        <Route path="/admin/demo-flashcard-mastery" component={DemoFlashcardMastery} />
        <Route path="/admin/demo-study-plan-screenshot" component={DemoStudyPlanScreenshot} />
        <Route path="/admin/demo-lesson-rationale" component={DemoLessonRationale} />
        <Route path="/admin/demo-student-overview" component={DemoStudentOverview} />
        <Route path="/admin/demo-heatmap-grid" component={DemoHeatmapGrid} />
        <Route path="/admin/demo-cat-exam" component={DemoCatExam} />
        <Route path="/admin/demo-ngn-case-study" component={DemoNgnCaseStudy} />
        <Route path="/admin/demo-premium-value" component={DemoPremiumValue} />
        <Route path="/admin/demo-streak-analytics" component={DemoStreakAnalytics} />
        <Route path="/admin/demo-session-comparison" component={DemoSessionComparison} />
        <Route path="/admin/demo-hero-showcase" component={DemoHeroShowcase} />
        <Route path="/admin/case-studies" component={AdminCaseStudiesPage} />
        <Route path="/clinical-case-studies" component={ClinicalCaseStudyPage} />
        <Route path="/for-institutions" component={ForInstitutions} />
        <Route path="/medical-imaging/study-plan-generator" component={ImagingStudyPlanGenerator} />
        <Route path="/radiography-readiness-quiz" component={RadiographyReadinessQuiz} />
        <Route path="/nclex-readiness-score" component={NclexReadinessScore} />
        <Route path="/admin/imaging-marketing" component={ImagingMarketingDashboard} />
        <Route path="/admin/demo-weak-areas" component={DemoWeakAreas} />
        <Route path="/admin/demo-study-plan" component={DemoStudyPlanPage} />
        <Route path="/admin/study-analytics" component={AdminStudyAnalytics} />
        <Route path="/study-coach" component={StudyCoachingDashboard} />
        <Route path="/radiography-practice-questions" component={RadiographyPracticeQuestionsLanding} />
        <Route path="/radiography-positioning-guide" component={RadiographyPositioningGuideLanding} />
        <Route path="/radiography-artifact-recognition" component={RadiographyArtifactRecognitionLanding} />
        <Route path="/medical-imaging/blog/:slug" component={ImagingBlog} />
        <Route path="/medical-imaging/blog" component={ImagingBlog} />
        <Route path="/medical-imaging/:country/seo/:slug" component={ImagingSeoPage} />
        <Route path="/medical-imaging/purchase-success" component={ImagingPurchaseSuccessPage} />
        <Route path="/medical-imaging/store" component={ImagingStorePage} />
        <Route path="/medical-imaging/account" component={ImagingAccountPage} />
        <Route path="/medical-imaging/:country/pricing" component={ImagingPricingPage} />
        <Route path="/medical-imaging/:country/lessons" component={ImagingLessonsPage} />
        <Route path="/medical-imaging/:country/positioning/:projectionSlug" component={ImagingPositioningDetailPage} />
        <Route path="/medical-imaging/:country/positioning" component={ImagingPositioningPage} />
        <Route path="/medical-imaging/:country/physics/:topicSlug" component={ImagingPhysicsTopicPage} />
        <Route path="/medical-imaging/:country/physics" component={ImagingPhysicsPage} />
        <Route path="/medical-imaging/:country/flashcards" component={ImagingFlashcardsPage} />
        <Route path="/medical-imaging/:country/practice-exams" component={ImagingPracticeExamPage} />
        <Route path="/medical-imaging/:country/exam-simulator" component={ImagingExamSimulatorPage} />
        <Route path="/medical-imaging/canada" component={MedicalImagingCanadaPage} />
        <Route path="/medical-imaging/usa" component={MedicalImagingUSAPage} />
        <Route path="/medical-imaging" component={MedicalImagingHub} />
        <Route path="/order-of-the-draw" component={OrderOfTheDraw} />
        <Route path="/demo/exam-readiness" component={ExamReadinessDemo} />
        <Route path="/demo/learning-progress" component={DemoLearningProgress} />
        <Route path="/diagnostic-assessment" component={DiagnosticAssessmentPage} />
        <Route path="/admin/qbank-factory" component={QBankFactoryPage} />
        <Route path="/account/library" component={AccountLibraryPage} />
        <Route path="/admin/product-builder" component={ProductBuilderPage} />
        <Route path="/admin/product-builder/:id" component={ProductBuilderPage} />
        <Route path="/admin/trust-showcase" component={AdminTrustShowcase} />
        <Route path="/medication-mastery" component={MedicationMasteryPage} />
        <Route path="/clinical-clarity/:slug" component={ClinicalClarityDetail} />
        <Route path="/clinical-clarity" component={ClinicalClarityIndex} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/learn/:slug" component={ContentPage} />
        <Route path="/anatomy/:systemId" component={AnatomyPage} />
        <Route path="/anatomy" component={AnatomyPage} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/lectures" component={LecturesPage} />
        <Route path="/lectures/:slug" component={LectureViewer} />
        <Route path="/lessons/:id" component={LessonDetail} />
        <Route path="/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/flashcards" component={PublicFlashcards} />

        {/* Specialty Preview Pages (public) */}
        <Route path="/preview/:specialty" component={SpecialtyPreviewPage} />

        {/* Tier-specific Test Bank routes (auth-guarded) */}
        <Route path="/rpn/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/rn/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/np/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        {/* Legacy tier flashcard routes → redirect to test-bank */}
        <Route path="/rpn/flashcards">{() => <Redirect to="/rpn/test-bank" />}</Route>
        <Route path="/rn/flashcards">{() => <Redirect to="/rn/test-bank" />}</Route>
        <Route path="/np/flashcards">{() => <Redirect to="/np/test-bank" />}</Route>
        <Route path="/upgrade" component={UpgradePage} />
        <Route path="/upgrade/success" component={UpgradePage} />
        <Route path="/reports" component={Reports} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/subscription/success" component={SubscriptionSuccess} />
        <Route path="/pricing/:tier" component={PricingPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/refer" component={ReferPage} />
        <Route path="/signup">{() => <Redirect to={`/login${window.location.search}`} />}</Route>
        <Route path="/register">{() => <Redirect to={`/login${window.location.search}`} />}</Route>
        <Route path="/trial/session/:id" component={TrialSession} />
        <Route path="/trial/results/:id" component={TrialResults} />
        <Route path="/trial/upgrade" component={TrialUpgrade} />
        <Route path="/trial" component={TrialLanding} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/email-preferences" component={EmailPreferencesPage} />
        <Route path="/question-of-the-day" component={QuestionOfTheDay} />
        <Route path="/test-bank">{() => <ProtectedTestBankRoute><QuestionBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/question-bank">{() => <Redirect to="/test-bank" />}</Route>
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/bookmarks" component={BookmarksPage} />
        <Route path="/practice" component={CustomPracticePage} />
        <Route path="/performance-analytics" component={PerformanceAnalyticsPage} />
        <Route path="/free-practice" component={FreePracticePage} />
        <Route path="/free-demo-exam" component={FreeDemoExamPage} />
        <Route path="/quick-study" component={QuickStudyPage} />
        <Route path="/practice-questions/:tier/:system" component={PracticeQuestionsPage} />
        <Route path="/practice-questions" component={PracticeQuestionsPage} />
        <Route path="/subscribe/:tier" component={SubscribePage} />
        <Route path="/onboarding/plan" component={OnboardingPlanPage} />
        <Route path="/study-plan" component={StudyPlanPage} />
        <Route path="/pharmacology/curriculum" component={PharmacologyHub} />
        <Route path="/pharmacology/pricing" component={PharmacologyHub} />
        <Route path="/pharmacology/faq" component={PharmacologyHub} />
        <Route path="/pharmacology" component={PharmacologyHub} />
        <Route path="/nclex-rn/mock-exam" component={ExamLandingPage} />
        <Route path="/nclex-pn/mock-exam" component={ExamLandingPage} />
        <Route path="/rex-pn/mock-exam" component={ExamLandingPage} />
        <Route path="/canada-np/mock-exam" component={ExamLandingPage} />
        <Route path="/us-np/mock-exam" component={ExamLandingPage} />
        <Route path="/nclex-rn" component={ExamHubPage} />
        <Route path="/nclex-pn" component={ExamHubPage} />
        <Route path="/canada-np" component={ExamHubPage} />
        <Route path="/us-np" component={ExamHubPage} />
        <Route path="/rexpn-exam-blueprint" component={ExamBlueprintHub} />
        <Route path="/nclex-rn-exam-blueprint" component={ExamBlueprintHub} />
        <Route path="/nclex-pn-exam-blueprint" component={ExamBlueprintHub} />
        <Route path="/allied-health-exam-blueprint" component={ExamBlueprintHub} />
        <Route path="/rexpn-foundations-of-practice" component={ExamBlueprintCategory} />
        <Route path="/rexpn-collaborative-practice" component={ExamBlueprintCategory} />
        <Route path="/rexpn-professional-practice" component={ExamBlueprintCategory} />
        <Route path="/rexpn-ethical-practice" component={ExamBlueprintCategory} />
        <Route path="/rexpn-legal-practice" component={ExamBlueprintCategory} />
        <Route path="/rexpn-safety-and-infection-control" component={ExamBlueprintCategory} />
        <Route path="/rexpn-health-promotion" component={ExamBlueprintCategory} />
        <Route path="/rexpn-pharmacological-therapies" component={ExamBlueprintCategory} />
        <Route path="/nclex-management-of-care" component={ExamBlueprintCategory} />
        <Route path="/nclex-safety-and-infection-control" component={ExamBlueprintCategory} />
        <Route path="/nclex-health-promotion" component={ExamBlueprintCategory} />
        <Route path="/nclex-psychosocial-integrity" component={ExamBlueprintCategory} />
        <Route path="/nclex-basic-care-and-comfort" component={ExamBlueprintCategory} />
        <Route path="/nclex-pharmacology" component={ExamBlueprintCategory} />
        <Route path="/nclex-reduction-of-risk" component={ExamBlueprintCategory} />
        <Route path="/nclex-physiological-adaptation" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-coordinated-care" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-safety-infection-control" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-health-promotion" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-psychosocial-integrity" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-basic-care" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-pharmacology" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-reduction-of-risk" component={ExamBlueprintCategory} />
        <Route path="/nclex-pn-physiological-adaptation" component={ExamBlueprintCategory} />
        <Route path="/allied-respiratory-therapy" component={ExamBlueprintCategory} />
        <Route path="/allied-medical-lab-tech" component={ExamBlueprintCategory} />
        <Route path="/allied-radiography" component={ExamBlueprintCategory} />
        <Route path="/allied-paramedic" component={ExamBlueprintCategory} />
        <Route path="/allied-occupational-therapy" component={ExamBlueprintCategory} />
        <Route path="/allied-social-work" component={ExamBlueprintCategory} />
        <Route path="/allied-pharmacy-tech" component={ExamBlueprintCategory} />
        <Route path="/allied-psychotherapy-addictions" component={ExamBlueprintCategory} />
        <Route path="/topics" component={TopicsIndex} />
        <Route path="/topics/:slug" component={TopicDetail} />
        <Route path="/conditions/:slug" component={ConditionPage} />
        <Route path="/medications/:slug" component={MedicationPage} />
        <Route path="/lab-values/:slug" component={LabValuePage} />
        <Route path="/nclex-rn-practice-questions" component={NclexRnPracticePage} />
        <Route path="/nclex-pn-practice-questions" component={NclexPnPracticePage} />
        <Route path="/rex-pn-practice-questions" component={RexPnPracticePage} />
        <Route path="/np-exam-practice-questions" component={NpExamPracticePage} />
        <Route path="/nursing-exam-prep" component={NursingExamPrepPage} />
        <Route path="/quiz/:slug" component={SeoPracticeQuiz} />
        <Route path="/offline-study" component={OfflineStudyPage} />
        <Route path="/glossary/:term" component={GlossaryPage} />
        <Route path="/glossary" component={GlossaryPage} />

        <Route path="/encyclopedia/:profession/:slug" component={EncyclopediaEntry} />
        <Route path="/encyclopedia" component={EncyclopediaLanding} />
        <Route path="/nursing-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/critical-care-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/emergency-nursing-encyclopedia">{() => <EncyclopediaHub />}</Route>

        <Route path="/nclex-pharmacology-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/cardiac-nursing-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>

        {/* Phase 3: Advanced Clinical & Specialist Certifications */}
        <Route path="/critical-care/question-bank">{() => <Redirect to="/critical-care/test-bank" />}</Route>
        <Route path="/critical-care/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/critical-care/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/critical-care/flashcards">{() => <Redirect to="/critical-care/test-bank" />}</Route>
        <Route path="/critical-care/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/critical-care/mock-exams/:id" component={MockExamSession} />
        <Route path="/critical-care/mock-exams" component={MockExamsPage} />
        <Route path="/critical-care/study-plan" component={StudyPlanPage} />
        <Route path="/critical-care/pricing" component={PricingPage} />
        <Route path="/critical-care/dashboard" component={DashboardPage} />
        <Route path="/critical-care" component={AlliedHomePage} />

        <Route path="/emergency-nursing/question-bank">{() => <Redirect to="/emergency-nursing/test-bank" />}</Route>
        <Route path="/emergency-nursing/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/emergency-nursing/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/emergency-nursing/flashcards">{() => <Redirect to="/emergency-nursing/test-bank" />}</Route>
        <Route path="/emergency-nursing/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/emergency-nursing/mock-exams/:id" component={MockExamSession} />
        <Route path="/emergency-nursing/mock-exams" component={MockExamsPage} />
        <Route path="/emergency-nursing/study-plan" component={StudyPlanPage} />
        <Route path="/emergency-nursing/pricing" component={PricingPage} />
        <Route path="/emergency-nursing/dashboard" component={DashboardPage} />
        <Route path="/emergency-nursing" component={AlliedHomePage} />

        <Route path="/perioperative-nursing" component={PerioperativeNursingHub} />
        <Route path="/preoperative-care" component={PreoperativeCareHub} />
        <Route path="/preoperative-nursing-guide" component={PreoperativeNursingGuide} />
        <Route path="/perioperative-nurse-career" component={PerioperativeNurseCareer} />

        <Route path="/perioperative/lessons/:slug" component={PerioperativeLessonsPage} />
        <Route path="/perioperative/lessons" component={PerioperativeLessonsPage} />
        <Route path="/perioperative/question-bank">{() => <Redirect to="/perioperative/test-bank" />}</Route>
        <Route path="/perioperative/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/perioperative/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/perioperative/flashcards">{() => <Redirect to="/perioperative/test-bank" />}</Route>
        <Route path="/perioperative/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/perioperative/mock-exams/:id" component={MockExamSession} />
        <Route path="/perioperative/mock-exams" component={MockExamsPage} />
        <Route path="/perioperative/study-plan" component={StudyPlanPage} />
        <Route path="/perioperative/pricing" component={PricingPage} />
        <Route path="/perioperative/dashboard" component={DashboardPage} />
        <Route path="/perioperative" component={AlliedHomePage} />

        <Route path="/oncology-nursing/question-bank">{() => <Redirect to="/oncology-nursing/test-bank" />}</Route>
        <Route path="/oncology-nursing/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/oncology-nursing/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/oncology-nursing/flashcards">{() => <Redirect to="/oncology-nursing/test-bank" />}</Route>
        <Route path="/oncology-nursing/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/oncology-nursing/mock-exams/:id" component={MockExamSession} />
        <Route path="/oncology-nursing/mock-exams" component={MockExamsPage} />
        <Route path="/oncology-nursing/study-plan" component={StudyPlanPage} />
        <Route path="/oncology-nursing/pricing" component={PricingPage} />
        <Route path="/oncology-nursing/dashboard" component={DashboardPage} />
        <Route path="/oncology-nursing" component={AlliedHomePage} />

        <Route path="/pediatric-cert/question-bank">{() => <Redirect to="/pediatric-cert/test-bank" />}</Route>
        <Route path="/pediatric-cert/test-bank">{() => <ProtectedTestBankRoute><TestBank /></ProtectedTestBankRoute>}</Route>
        <Route path="/pediatric-cert/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/pediatric-cert/flashcards">{() => <Redirect to="/pediatric-cert/test-bank" />}</Route>
        <Route path="/pediatric-cert/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/pediatric-cert/mock-exams/:id" component={MockExamSession} />
        <Route path="/pediatric-cert/mock-exams" component={MockExamsPage} />
        <Route path="/pediatric-cert/study-plan" component={StudyPlanPage} />
        <Route path="/pediatric-cert/pricing" component={PricingPage} />
        <Route path="/pediatric-cert/dashboard" component={DashboardPage} />
        <Route path="/pediatric-cert" component={AlliedHomePage} />

        {/* Admin Career Management */}
        <Route path="/admin/careers" component={AdminCareersPage} />
        <Route path="/admin/professions" component={AdminProfessionsPage} />
        <Route path="/admin/universal-import" component={AdminUniversalImport} />
        <Route path="/profession/:slug" component={ProfessionHubPage} />

        {/* Career AI Tools - Critical Care */}
        <Route path="/critical-care/hemodynamic-sim">{() => <CareerAISimulator toolId="hemodynamic-sim" />}</Route>
        <Route path="/critical-care/icu-case-sim">{() => <CareerAISimulator toolId="icu-case-sim" />}</Route>
        {/* Career AI Tools - Emergency Nursing */}
        <Route path="/emergency-nursing/triage-sim">{() => <CareerAISimulator toolId="triage-sim" />}</Route>
        <Route path="/emergency-nursing/trauma-nursing-sim">{() => <CareerAISimulator toolId="trauma-nursing-sim" />}</Route>
        {/* Career AI Tools - Perioperative */}
        <Route path="/perioperative/sterile-field-sim">{() => <CareerAISimulator toolId="sterile-field-sim" />}</Route>
        <Route path="/perioperative/surgical-count-drill">{() => <CareerAISimulator toolId="surgical-count-drill" />}</Route>
        {/* Career AI Tools - Oncology */}
        <Route path="/oncology-nursing/chemo-safety-sim">{() => <CareerAISimulator toolId="chemo-safety-sim" />}</Route>
        <Route path="/oncology-nursing/staging-drill">{() => <CareerAISimulator toolId="staging-drill" />}</Route>
        {/* Career AI Tools - Pediatric */}
        <Route path="/pediatric-cert/peds-assessment-sim">{() => <CareerAISimulator toolId="peds-assessment-sim" />}</Route>
        <Route path="/pediatric-cert/growth-dev-drill">{() => <CareerAISimulator toolId="growth-dev-drill" />}</Route>
        {/* Career Guides — Healthcare Ultimate Guides + Authority Guides */}
        <Route path="/guides/:parentSlug/:clusterSlug" component={ClusterGuidePage} />
        <Route path="/guides/:slug" component={UnifiedGuidePage} />
        <Route path="/guides" component={HealthcareGuidesIndex} />

        {/* Topic Cluster Pages — Clinical Nursing Topics */}
        <Route path="/sepsis-nursing-interventions">{() => <TopicClusterBySlug slug="sepsis-nursing-interventions" />}</Route>
        <Route path="/ventilator-management-nursing">{() => <TopicClusterBySlug slug="ventilator-management-nursing" />}</Route>
        <Route path="/diabetes-nursing-management">{() => <TopicClusterBySlug slug="diabetes-nursing-management" />}</Route>
        <Route path="/fluid-electrolyte-imbalance-nursing">{() => <TopicClusterBySlug slug="fluid-electrolyte-imbalance-nursing" />}</Route>
        <Route path="/hemodynamic-monitoring-nursing">{() => <TopicClusterBySlug slug="hemodynamic-monitoring-nursing" />}</Route>
        <Route path="/wound-care-nursing">{() => <TopicClusterBySlug slug="wound-care-nursing" />}</Route>
        <Route path="/medication-administration-safety-nursing">{() => <TopicClusterBySlug slug="medication-administration-safety-nursing" />}</Route>
        <Route path="/pain-management-nursing">{() => <TopicClusterBySlug slug="pain-management-nursing" />}</Route>
        <Route path="/cardiac-rhythm-interpretation-nursing">{() => <TopicClusterBySlug slug="cardiac-rhythm-interpretation-nursing" />}</Route>
        <Route path="/infection-control-nursing">{() => <TopicClusterBySlug slug="infection-control-nursing" />}</Route>
        <Route path="/maternal-newborn-nursing">{() => <TopicClusterBySlug slug="maternal-newborn-nursing" />}</Route>
        <Route path="/pediatric-assessment-nursing">{() => <TopicClusterBySlug slug="pediatric-assessment-nursing" />}</Route>
        <Route path="/mental-health-crisis-nursing">{() => <TopicClusterBySlug slug="mental-health-crisis-nursing" />}</Route>
        <Route path="/perioperative-care-nursing">{() => <TopicClusterBySlug slug="perioperative-care-nursing" />}</Route>
        <Route path="/pharmacology-basics-nursing">{() => <TopicClusterBySlug slug="pharmacology-basics-nursing" />}</Route>
        <Route path="/nclex-clinical-judgment-nursing">{() => <TopicClusterBySlug slug="nclex-clinical-judgment-nursing" />}</Route>
        <Route path="/hyperkalemia-effects-on-heart">{() => <TopicClusterBySlug slug="hyperkalemia-effects-on-heart" />}</Route>
        <Route path="/hyperkalemia-vs-hypokalemia-cardiac">{() => <TopicClusterBySlug slug="hyperkalemia-vs-hypokalemia-cardiac" />}</Route>
        <Route path="/barrel-chest-copd">{() => <TopicClusterBySlug slug="barrel-chest-copd" />}</Route>
        <Route path="/question-bank-nursing">{() => <TopicClusterBySlug slug="question-bank-nursing" />}</Route>
        <Route path="/medication-mastery-nursing">{() => <TopicClusterBySlug slug="medication-mastery-nursing" />}</Route>
        <Route path="/nursing-simulation-practice">{() => <TopicClusterBySlug slug="nursing-simulation-practice" />}</Route>
        <Route path="/test-nclex-avec-corrige">{() => <TopicClusterBySlug slug="test-nclex-avec-corrige" />}</Route>

        {/* Career Guide Pages - "How to become a..." */}
        <Route path="/how-to-become-a-paramedic" component={CareerGuidePage} />
        <Route path="/how-to-become-a-respiratory-therapist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-medical-lab-technologist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-radiologic-technologist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-social-worker" component={CareerGuidePage} />
        <Route path="/how-to-become-a-psychotherapist" component={CareerGuidePage} />
        <Route path="/how-to-become-an-addictions-counselor" component={CareerGuidePage} />
        <Route path="/how-to-become-an-occupational-therapist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-pharmacy-technician" component={CareerGuidePage} />

        <Route path="/:careerSlug/study-guide/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/exam-tips/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/clinical-scenarios/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/practice-questions/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/question-detail/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/flashcard-detail/:topicSlug">{(params) => <ProgrammaticSeoPage />}</Route>

        {/* Legacy allied career route redirects → canonical /allied-health/... paths */}
        <Route path="/rrt/:rest*">{(params) => <Redirect to={`/allied-health/rrt${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/rrt">{() => <Redirect to="/allied-health/rrt" />}</Route>
        <Route path="/paramedic/:rest*">{(params) => <Redirect to={`/allied-health/paramedic${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/paramedic">{() => <Redirect to="/allied-health/paramedic" />}</Route>
        <Route path="/pharmacy-technician/:rest*">{(params) => <Redirect to={`/allied-health/pharmacy-technician${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/pharmacy-technician">{() => <Redirect to="/allied-health/pharmacy-technician" />}</Route>
        <Route path="/pharmacy-tech/:rest*">{(params) => <Redirect to={`/allied-health/pharmacy-tech${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/pharmacy-tech">{() => <Redirect to="/allied-health/pharmacy-tech" />}</Route>
        <Route path="/mlt/:rest*">{(params) => <Redirect to={`/allied-health/mlt${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/mlt">{() => <Redirect to="/allied-health/mlt" />}</Route>
        <Route path="/imaging/:rest*">{(params) => <Redirect to={`/allied-health/imaging${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/imaging">{() => <Redirect to="/allied-health/imaging" />}</Route>
        <Route path="/social-work/:rest*">{(params) => <Redirect to={`/allied-health/social-work${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/social-work">{() => <Redirect to="/allied-health/social-work" />}</Route>
        <Route path="/social-worker/:rest*">{(params) => <Redirect to={`/allied-health/social-worker${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/social-worker">{() => <Redirect to="/allied-health/social-worker" />}</Route>
        <Route path="/psychotherapy/:rest*">{(params) => <Redirect to={`/allied-health/psychotherapy${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/psychotherapy">{() => <Redirect to="/allied-health/psychotherapy" />}</Route>
        <Route path="/psychotherapist/:rest*">{(params) => <Redirect to={`/allied-health/psychotherapist${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/psychotherapist">{() => <Redirect to="/allied-health/psychotherapist" />}</Route>
        <Route path="/addictions/:rest*">{(params) => <Redirect to={`/allied-health/addictions${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/addictions">{() => <Redirect to="/allied-health/addictions" />}</Route>
        <Route path="/addictions-counsellor/:rest*">{(params) => <Redirect to={`/allied-health/addictions-counsellor${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/addictions-counsellor">{() => <Redirect to="/allied-health/addictions-counsellor" />}</Route>
        <Route path="/occupational-therapy/:rest*">{(params) => <Redirect to={`/allied-health/occupational-therapy${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/occupational-therapy">{() => <Redirect to="/allied-health/occupational-therapy" />}</Route>
        <Route path="/physical-therapy/:rest*">{(params) => <Redirect to={`/allied-health/physical-therapy${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/physical-therapy">{() => <Redirect to="/allied-health/physical-therapy" />}</Route>
        <Route path="/respiratory-therapy/:rest*">{(params) => <Redirect to={`/allied-health/respiratory-therapy${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/respiratory-therapy">{() => <Redirect to="/allied-health/respiratory-therapy" />}</Route>
        <Route path="/health-info-mgmt/:rest*">{(params) => <Redirect to={`/allied-health/health-info-mgmt${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/health-info-mgmt">{() => <Redirect to="/allied-health/health-info-mgmt" />}</Route>
        <Route path="/ultrasound/:rest*">{(params) => <Redirect to={`/allied-health/imaging${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/ultrasound">{() => <Redirect to="/allied-health/imaging" />}</Route>
        <Route path="/physical-therapy-assistant/:rest*">{(params) => <Redirect to={`/allied-health/physiotherapy-assistant${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/physical-therapy-assistant">{() => <Redirect to="/allied-health/physiotherapy-assistant" />}</Route>
        <Route path="/occupational-therapy-assistant/:rest*">{(params) => <Redirect to={`/allied-health/occupational-therapy-assistant${params.rest ? `/${params.rest}` : ""}`} />}</Route>
        <Route path="/occupational-therapy-assistant">{() => <Redirect to="/allied-health/occupational-therapy-assistant" />}</Route>

        <Route>{() => <AlliedLayout><AlliedRoutes /></AlliedLayout>}</Route>
      </Switch>
    </Suspense>
  );
}

function useDelocalizedLocation(locale: string): [string, typeof wouterNavigate] {
  const [path] = useBrowserLocation();
  const { pathWithoutLocale } = getLocaleFromPath(path);
  const englishPath = deLocalizeSlug(locale, pathWithoutLocale);
  const effectivePath = `/${locale}${englishPath === "/" ? "" : englishPath}`;
  return [effectivePath, wouterNavigate];
}

function LocaleRouter() {
  const [location] = useLocation();
  const { locale } = getLocaleFromPath(location);
  const segments = location.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";

  if (!firstSegment || !isValidLocale(firstSegment)) {
    const redirectTarget = `/${DEFAULT_LOCALE}${location === "/" ? "" : location}`;
    return <Redirect to={redirectTarget} />;
  }

  const needsDelocalization = locale === "fr" || locale === "es" || locale === "pt" || locale === "de" || locale === "th" || locale === "zh" || locale === "zh-tw" || locale === "id";

  if (needsDelocalization) {
    return (
      <Router base={`/${locale}`} hook={() => useDelocalizedLocation(locale)}>
        <AppRoutes />
      </Router>
    );
  }

  return (
    <Router base={`/${locale}`}>
      <AppRoutes />
    </Router>
  );
}

function handleDevModeSwitch(): void {
  const isDev = window.location.hostname.includes("replit") ||
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("0.0.0.0") ||
    window.location.hostname.includes("webcontainer");
  if (!isDev) return;
  localStorage.removeItem("nursenest_allied_mode");
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const redirect = params.get("redirect");
  if (mode === "allied") {
    localStorage.setItem("nursenest_site_mode", "allied");
    window.location.replace(redirect || window.location.pathname);
    return;
  }
  if (mode === "nursing") {
    localStorage.removeItem("nursenest_site_mode");
    window.location.replace(redirect || window.location.pathname);
    return;
  }
}

handleDevModeSwitch();

(function captureReferralCode() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    sessionStorage.setItem("nursenest-ref", ref);
  }
})();

function DeferredShellComponents() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <TesterBanner />
      <LazyAnalyticsTracker />
      <MobileBottomNav />
      <UpgradePrompt />
      <PWAInstallPrompt />
      <ExitIntentModal />
      <ReportProblemButton />
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
          <I18nProvider>
            <AuthProvider>
              <CareerProvider>
              <ParamedicRegionProvider>
              <SiteImagesProvider>
                <TooltipProvider>
                  <Toaster />
                  <PreviewBanner />
                  <PageTracker />
                  <CopyProtection />
                  <LocaleRouter />
                  <DeferredShellComponents />
                </TooltipProvider>
              </SiteImagesProvider>
              </ParamedicRegionProvider>
              </CareerProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
