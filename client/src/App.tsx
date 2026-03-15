import { Switch, Route, Router, Redirect, useLocation } from "wouter";
import { useBrowserLocation, navigate as wouterNavigate } from "wouter/use-browser-location";
import { useEffect, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
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
import { AlliedApp } from "@/allied/allied-app";
import { TesterBanner } from "@/components/tester-banner";

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
import { UpgradePrompt } from "@/components/upgrade-prompt";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { ExitIntentModal } from "@/components/exit-intent-modal";
import { MobileBottomNav } from "@/components/mobile-study-shell";
import AnalyticsTracker from "@/components/analytics-tracker";
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
const AnatomyPage = lazy(() => import("@/pages/anatomy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const DisclaimerPage = lazy(() => import("@/pages/disclaimer"));
const RefundPolicyPage = lazy(() => import("@/pages/refund-policy"));
const StartFreePage = lazy(() => import("@/pages/start-free"));
const AdminPage = lazy(() => import("@/pages/admin"));
const AdminAiJobs = lazy(() => import("@/pages/admin-ai-jobs"));
const AdminBusinessHealth = lazy(() => import("@/pages/admin-business-health"));
const AdminContentCoverage = lazy(() => import("@/pages/admin-content-coverage"));
const AdminSiteHealth = lazy(() => import("@/pages/admin-site-health"));
const AdminQuestionBankPage = lazy(() => import("@/pages/admin-question-bank"));
const QBankExamPage = lazy(() => import("@/pages/qbank-exam"));
const QBankStudyPage = lazy(() => import("@/pages/qbank-study"));
const QBankPreviewPage = lazy(() => import("@/pages/qbank-preview"));
const GeneratorV2Page = lazy(() => import("@/pages/generator-v2"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MltStudentDashboard = lazy(() => import("@/allied/pages/mlt-student-dashboard"));
import { MltSEOPage } from "@/allied/pages/mlt-seo-pages";
import { ExamStudyGuidePage } from "@/pages/exam-study-guide";
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
const NewGradHubPage = lazy(() => import("@/pages/newgrad/newgrad-hub"));
const NewGradGuidesPage = lazy(() => import("@/pages/newgrad/guides-page"));
const NewGradCareerPage = lazy(() => import("@/pages/newgrad/career-page"));
const NewGradInterviewPage = lazy(() => import("@/pages/newgrad/interview-page"));
const NewGradResumePage = lazy(() => import("@/pages/newgrad/resume-page"));
const NewGradWorkplacePage = lazy(() => import("@/pages/newgrad/workplace-page"));
const NewGradBurnoutPage = lazy(() => import("@/pages/newgrad/burnout-page"));
const NewGradSalaryPage = lazy(() => import("@/pages/newgrad/salary-page"));
const NewGradProfDevPage = lazy(() => import("@/pages/newgrad/professional-development-page"));
const NewGradGuidePage = lazy(() => import("@/pages/new-grad/new-grad-guide-template"));
const SeoGuidePage = lazy(() => import("@/pages/new-grad/seo-guide-page"));
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
const ExamPrepHub = lazy(() => import("@/pages/exam-prep-hub"));
const NewGraduateSupportHub = lazy(() => import("@/pages/new-graduate-support-hub"));
const HealthcareCareersHub = lazy(() => import("@/pages/healthcare-careers-hub"));
const GenericCareerJourney = lazy(() => import("@/pages/career-journey"));
const ProfessionCareerJourney = lazy(() => import("@/pages/career-journey").then(m => ({ default: m.ProfessionCareerJourney })));
const NclexReadinessScore = lazy(() => import("@/pages/nclex-readiness-score"));

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
        <Route path="/new-grad/clinical-skills/:skill" component={ClinicalSkillsGuidePage} />
        <Route path="/new-grad/unit-guide/:unit" component={UnitGuidePage} />
        <Route path="/new-grad/career/:path" component={CareerDevelopmentPage} />
        <Route path="/new-grad/scenario/:slug" component={ClinicalScenarioPage} />

        <Route path="/newgrad/guides" component={NewGradGuidesPage} />
        <Route path="/newgrad/career" component={NewGradCareerPage} />
        <Route path="/newgrad/interview" component={NewGradInterviewPage} />
        <Route path="/newgrad/resume" component={NewGradResumePage} />
        <Route path="/newgrad/workplace" component={NewGradWorkplacePage} />
        <Route path="/newgrad/burnout" component={NewGradBurnoutPage} />
        <Route path="/newgrad/salary" component={NewGradSalaryPage} />
        <Route path="/newgrad/professional-development" component={NewGradProfDevPage} />
        <Route path="/newgrad" component={NewGradHubPage} />
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

        <Route path="/allied-health/:profession/:articleSlug" component={AlliedHealthArticlePage} />
        <Route path="/allied-health/:profession" component={AlliedHealthProfessionPage} />
        <Route path="/allied-health" component={AlliedHealthHub} />

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

        {/* 16 Specialty SEO Landing Pages */}
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

        {/* Nursing Content Hub */}
        <Route path="/nursing-certifications" component={NursingCertificationsHub} />
        <Route path="/study-pathways" component={StudyPathwaysHub} />
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

        {/* Tier-specific Test Bank routes */}
        <Route path="/rpn/test-bank" component={TestBank} />
        <Route path="/rn/test-bank" component={TestBank} />
        <Route path="/np/test-bank" component={TestBank} />
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
        <Route path="/test-bank" component={QuestionBank} />
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
        <Route path="/paramedic-practice-questions" component={ParamedicPracticeQuestions} />
        <Route path="/rrt-practice-questions" component={RrtPracticeQuestions} />
        <Route path="/mlt-practice-questions" component={MltPracticeQuestionsPage} />
        <Route path="/imaging-practice-questions" component={ImagingPracticeQuestions} />
        <Route path="/social-work-practice-questions" component={SocialWorkPracticeQuestions} />
        <Route path="/psychotherapy-practice-questions" component={PsychotherapyPracticeQuestions} />
        <Route path="/addictions-practice-questions" component={AddictionsPracticeQuestions} />
        <Route path="/occupational-therapy-practice-questions" component={OccupationalTherapyPracticeQuestions} />
        <Route path="/quiz/:slug" component={SeoPracticeQuiz} />
        <Route path="/offline-study" component={OfflineStudyPage} />
        <Route path="/glossary/:term" component={GlossaryPage} />
        <Route path="/glossary" component={GlossaryPage} />

        <Route path="/encyclopedia/:profession/:slug" component={EncyclopediaEntry} />
        <Route path="/encyclopedia" component={EncyclopediaLanding} />
        <Route path="/nursing-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/paramedic-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/pharmacy-tech-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/rrt-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/mlt-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/imaging-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/social-worker-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/critical-care-encyclopedia">{() => <EncyclopediaHub />}</Route>
        <Route path="/emergency-nursing-encyclopedia">{() => <EncyclopediaHub />}</Route>

        {/* Career-namespaced routes: /rrt/*, /paramedic/*, /pharmacy-tech/*, /mlt/*, /imaging/* */}
        <Route path="/rrt/question-bank">{() => <Redirect to="/rrt/test-bank" />}</Route>
        <Route path="/rrt/test-bank" component={TestBank} />
        <Route path="/rrt/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/rrt/flashcards">{() => <Redirect to="/rrt/test-bank" />}</Route>
        <Route path="/rrt/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/rrt/mock-exams/:id" component={MockExamSession} />
        <Route path="/rrt/mock-exams" component={MockExamsPage} />
        <Route path="/rrt/study-plan" component={StudyPlanPage} />
        <Route path="/rrt/pricing" component={PricingPage} />
        <Route path="/rrt/dashboard" component={DashboardPage} />
        <Route path="/respiratory-therapy/ultimate-respiratory-therapy-study-guide" component={AuthorityContentPage} />
        <Route path="/respiratory-therapy" component={RespiratoryTherapyAuthorityHub} />
        <Route path="/rrt" component={AlliedHomePage} />

        <Route path="/paramedic/question-bank">{() => <Redirect to="/paramedic/test-bank" />}</Route>
        <Route path="/paramedic/test-bank" component={TestBank} />
        <Route path="/paramedic/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/paramedic/flashcards">{() => <Redirect to="/paramedic/test-bank" />}</Route>
        <Route path="/paramedic/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/paramedic/mock-exams/:id" component={MockExamSession} />
        <Route path="/paramedic/mock-exams" component={MockExamsPage} />
        <Route path="/paramedic/study-plan" component={StudyPlanPage} />
        <Route path="/paramedic/pricing" component={PricingPage} />
        <Route path="/paramedic/dashboard" component={DashboardPage} />
        <Route path="/paramedic/top-100-paramedic-exam-questions" component={AuthorityContentPage} />
        <Route path="/paramedic" component={ParamedicAuthorityHub} />

        <Route path="/pharmacy-tech/question-bank">{() => <Redirect to="/pharmacy-tech/test-bank" />}</Route>
        <Route path="/pharmacy-tech/test-bank" component={TestBank} />
        <Route path="/pharmacy-tech/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/pharmacy-tech/flashcards">{() => <Redirect to="/pharmacy-tech/test-bank" />}</Route>
        <Route path="/pharmacy-tech/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/pharmacy-tech/mock-exams/:id" component={MockExamSession} />
        <Route path="/pharmacy-tech/mock-exams" component={MockExamsPage} />
        <Route path="/pharmacy-tech/study-plan" component={StudyPlanPage} />
        <Route path="/pharmacy-tech/pricing" component={PricingPage} />
        <Route path="/pharmacy-tech/dashboard" component={DashboardPage} />
        <Route path="/pharmacy-tech/top-100-pharmacy-technician-exam-questions" component={AuthorityContentPage} />
        <Route path="/pharmacy-tech" component={AlliedHomePage} />
        <Route path="/social-work/ultimate-aswb-exam-study-guide" component={AuthorityContentPage} />
        <Route path="/social-work" component={SocialWorkAuthorityHub} />
        <Route path="/psychotherapy/complete-psychotherapy-licensing-exam-guide" component={AuthorityContentPage} />
        <Route path="/psychotherapy" component={PsychotherapyAuthorityHub} />
        <Route path="/addictions/top-100-addictions-counsellor-exam-questions" component={AuthorityContentPage} />
        <Route path="/addictions" component={AddictionsAuthorityHub} />

        <Route path="/dashboard/mlt/canada" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/usa" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/exam" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/flashcards" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/lessons" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/performance" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/wrong-answers" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/study-plan" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt" component={MltStudentDashboard} />

        <Route path="/paramedic-exam-study-guide">{() => <ExamStudyGuidePage slug="paramedic-exam-study-guide" />}</Route>
        <Route path="/rrt-exam-study-guide">{() => <ExamStudyGuidePage slug="rrt-exam-study-guide" />}</Route>
        <Route path="/mlt-exam-study-guide">{() => <ExamStudyGuidePage slug="mlt-exam-study-guide" />}</Route>
        <Route path="/imaging-exam-study-guide">{() => <ExamStudyGuidePage slug="imaging-exam-study-guide" />}</Route>
        <Route path="/social-work-exam-study-guide">{() => <ExamStudyGuidePage slug="social-work-exam-study-guide" />}</Route>
        <Route path="/psychotherapy-exam-study-guide">{() => <ExamStudyGuidePage slug="psychotherapy-exam-study-guide" />}</Route>
        <Route path="/addictions-exam-study-guide">{() => <ExamStudyGuidePage slug="addictions-exam-study-guide" />}</Route>
        <Route path="/occupational-therapy-exam-study-guide">{() => <ExamStudyGuidePage slug="occupational-therapy-exam-study-guide" />}</Route>

        <Route path="/respiratory-therapy-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/paramedic-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/medical-lab-tech-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/diagnostic-imaging-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/occupational-therapy-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/physical-therapy-exam-prep">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>

        <Route path="/respiratory-therapy-topics-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/paramedic-topics-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/nclex-pharmacology-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>
        <Route path="/cardiac-nursing-hub">{() => <Suspense fallback={<div />}><SeoPage /></Suspense>}</Route>

        <Route path="/mlt/canada/practice-questions">{() => <MltSEOPage country="canada" pageType="practice-questions" />}</Route>
        <Route path="/mlt/usa/practice-questions">{() => <MltSEOPage country="usa" pageType="practice-questions" />}</Route>
        <Route path="/mlt/exam-prep">{() => <MltSEOPage country="both" pageType="exam-prep" />}</Route>
        <Route path="/mlt/study-guide">{() => <MltSEOPage country="both" pageType="study-guide" />}</Route>
        <Route path="/mlt/mock-exam">{() => <MltSEOPage country="both" pageType="mock-exam" />}</Route>
        <Route path="/mlt/flashcard-prep">{() => <MltSEOPage country="both" pageType="flashcards" />}</Route>

        <Route path="/mlt/question-bank">{() => <Redirect to="/mlt/test-bank" />}</Route>
        <Route path="/mlt/test-bank" component={TestBank} />
        <Route path="/mlt/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/mlt/flashcards">{() => <Redirect to="/mlt/test-bank" />}</Route>
        <Route path="/mlt/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/mlt/mock-exams/:id" component={MockExamSession} />
        <Route path="/mlt/mock-exams" component={MockExamsPage} />
        <Route path="/mlt/study-plan" component={StudyPlanPage} />
        <Route path="/mlt/pricing" component={PricingPage} />
        <Route path="/mlt/dashboard" component={DashboardPage} />
        <Route path="/mlt/complete-guide-medical-laboratory-science" component={AuthorityContentPage} />
        <Route path="/mlt" component={MltAuthorityHub} />

        <Route path="/imaging/question-bank">{() => <Redirect to="/imaging/test-bank" />}</Route>
        <Route path="/imaging/test-bank" component={TestBank} />
        <Route path="/imaging/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/imaging/flashcards">{() => <Redirect to="/imaging/test-bank" />}</Route>
        <Route path="/imaging/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/imaging/mock-exams/:id" component={MockExamSession} />
        <Route path="/imaging/mock-exams" component={MockExamsPage} />
        <Route path="/imaging/study-plan" component={StudyPlanPage} />
        <Route path="/imaging/pricing" component={PricingPage} />
        <Route path="/imaging/dashboard" component={DashboardPage} />
        <Route path="/imaging/definitive-radiography-exam-preparation-guide" component={AuthorityContentPage} />
        <Route path="/imaging" component={ImagingAuthorityHub} />

        {/* Phase 3: Advanced Clinical & Specialist Certifications */}
        <Route path="/critical-care/question-bank">{() => <Redirect to="/critical-care/test-bank" />}</Route>
        <Route path="/critical-care/test-bank" component={TestBank} />
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
        <Route path="/emergency-nursing/test-bank" component={TestBank} />
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
        <Route path="/perioperative/test-bank" component={TestBank} />
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
        <Route path="/oncology-nursing/test-bank" component={TestBank} />
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
        <Route path="/pediatric-cert/test-bank" component={TestBank} />
        <Route path="/pediatric-cert/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/pediatric-cert/flashcards">{() => <Redirect to="/pediatric-cert/test-bank" />}</Route>
        <Route path="/pediatric-cert/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/pediatric-cert/mock-exams/:id" component={MockExamSession} />
        <Route path="/pediatric-cert/mock-exams" component={MockExamsPage} />
        <Route path="/pediatric-cert/study-plan" component={StudyPlanPage} />
        <Route path="/pediatric-cert/pricing" component={PricingPage} />
        <Route path="/pediatric-cert/dashboard" component={DashboardPage} />
        <Route path="/pediatric-cert" component={AlliedHomePage} />

        {/* Phase 4: Mental Health & Behavioral Health */}
        <Route path="/psychotherapist/question-bank">{() => <Redirect to="/psychotherapist/test-bank" />}</Route>
        <Route path="/psychotherapist/test-bank" component={TestBank} />
        <Route path="/psychotherapist/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/psychotherapist/flashcards">{() => <Redirect to="/psychotherapist/test-bank" />}</Route>
        <Route path="/psychotherapist/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/psychotherapist/mock-exams/:id" component={MockExamSession} />
        <Route path="/psychotherapist/mock-exams" component={MockExamsPage} />
        <Route path="/psychotherapist/study-plan" component={StudyPlanPage} />
        <Route path="/psychotherapist/pricing" component={PricingPage} />
        <Route path="/psychotherapist/dashboard" component={DashboardPage} />
        <Route path="/psychotherapist" component={AlliedHomePage} />
        <Route path="/occupational-therapy/ultimate-nbcot-exam-preparation-guide" component={AuthorityContentPage} />
        <Route path="/occupational-therapy" component={OccupationalTherapyAuthorityHub} />

        <Route path="/social-worker/lessons/:slug" component={SocialWorkerLessonsPage} />
        <Route path="/social-worker/lessons" component={SocialWorkerLessonsPage} />
        <Route path="/social-worker/question-bank">{() => <Redirect to="/social-worker/test-bank" />}</Route>
        <Route path="/social-worker/test-bank" component={TestBank} />
        <Route path="/social-worker/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/social-worker/flashcards">{() => <Redirect to="/social-worker/test-bank" />}</Route>
        <Route path="/social-worker/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/social-worker/mock-exams/:id" component={MockExamSession} />
        <Route path="/social-worker/mock-exams" component={MockExamsPage} />
        <Route path="/social-worker/study-plan" component={StudyPlanPage} />
        <Route path="/social-worker/pricing" component={PricingPage} />
        <Route path="/social-worker/dashboard" component={DashboardPage} />
        <Route path="/social-worker" component={AlliedHomePage} />

        <Route path="/addictions-counsellor/question-bank">{() => <Redirect to="/addictions-counsellor/test-bank" />}</Route>
        <Route path="/addictions-counsellor/test-bank" component={TestBank} />
        <Route path="/addictions-counsellor/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/addictions-counsellor/flashcards">{() => <Redirect to="/addictions-counsellor/test-bank" />}</Route>
        <Route path="/addictions-counsellor/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/addictions-counsellor/mock-exams/:id" component={MockExamSession} />
        <Route path="/addictions-counsellor/mock-exams" component={MockExamsPage} />
        <Route path="/addictions-counsellor/study-plan" component={StudyPlanPage} />
        <Route path="/addictions-counsellor/pricing" component={PricingPage} />
        <Route path="/addictions-counsellor/dashboard" component={DashboardPage} />
        <Route path="/addictions-counsellor" component={AlliedHomePage} />

        {/* Admin Career Management */}
        <Route path="/admin/careers" component={AdminCareersPage} />
        <Route path="/admin/professions" component={AdminProfessionsPage} />
        <Route path="/admin/universal-import" component={AdminUniversalImport} />
        <Route path="/profession/:slug" component={ProfessionHubPage} />

        {/* Career AI Tools - RRT */}
        <Route path="/rrt/abg-engine">{() => <CareerAISimulator toolId="abg-engine" />}</Route>
        <Route path="/rrt/ventilator-sim">{() => <CareerAISimulator toolId="ventilator-sim" />}</Route>
        {/* Career AI Tools - Paramedic */}
        <Route path="/paramedic/trauma-sim">{() => <CareerAISimulator toolId="trauma-sim" />}</Route>
        <Route path="/paramedic/ecg-drill">{() => <CareerAISimulator toolId="ecg-drill" />}</Route>
        {/* Career AI Tools - Pharmacy Tech */}
        <Route path="/pharmacy-tech/dosage-calc">{() => <CareerAISimulator toolId="dosage-calc" />}</Route>
        <Route path="/pharmacy-tech/compounding-sim">{() => <CareerAISimulator toolId="compounding-sim" />}</Route>
        {/* Career AI Tools - MLT */}
        <Route path="/mlt/lab-critical">{() => <CareerAISimulator toolId="lab-critical" />}</Route>
        <Route path="/mlt/morphology-drill">{() => <CareerAISimulator toolId="morphology-drill" />}</Route>
        {/* Career AI Tools - Imaging */}
        <Route path="/imaging/anatomy-sim">{() => <CareerAISimulator toolId="anatomy-sim" />}</Route>
        <Route path="/imaging/image-recognition">{() => <CareerAISimulator toolId="image-recognition" />}</Route>
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
        {/* Career AI Tools - Psychotherapist */}
        <Route path="/psychotherapist/therapeutic-modality-sim">{() => <CareerAISimulator toolId="therapeutic-modality-sim" />}</Route>
        <Route path="/psychotherapist/ethics-scenario-drill">{() => <CareerAISimulator toolId="ethics-scenario-drill" />}</Route>
        {/* Career AI Tools - Social Worker */}
        <Route path="/social-worker/dsm5-diagnosis-sim">{() => <CareerAISimulator toolId="dsm5-diagnosis-sim" />}</Route>
        <Route path="/social-worker/intervention-matching">{() => <CareerAISimulator toolId="intervention-matching" />}</Route>
        {/* Career AI Tools - Addictions */}
        <Route path="/addictions-counsellor/mi-practice-sim">{() => <CareerAISimulator toolId="mi-practice-sim" />}</Route>
        <Route path="/addictions-counsellor/substance-id-drill">{() => <CareerAISimulator toolId="substance-id-drill" />}</Route>

        {/* Career Guides — Healthcare Ultimate Guides + Authority Guides */}
        <Route path="/guides/:slug" component={UnifiedGuidePage} />
        <Route path="/guides" component={HealthcareGuidesIndex} />

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

        <Route component={NotFound} />
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

  const needsDelocalization = locale === "fr" || locale === "es";

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
  if (mode === "allied") {
    localStorage.setItem("nursenest_site_mode", "allied");
    window.location.replace(window.location.pathname);
    return;
  }
  if (mode === "nursing") {
    localStorage.removeItem("nursenest_site_mode");
    window.location.replace(window.location.pathname);
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

function isAlliedHostname(): boolean {
  const h = window.location.hostname.toLowerCase();
  if (h.startsWith("allied.") || h === "allied.localhost" || h === "allied.nursenest.ca") return true;
  const isDev = h.includes("replit") || h === "localhost" || h.includes("0.0.0.0");
  if (isDev && localStorage.getItem("nursenest_site_mode") === "allied") return true;
  return false;
}

function App() {
  const isAllied = isAlliedHostname();

  if (isAllied) {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
            <AuthProvider>
              <CareerProvider>
                <TooltipProvider>
                  <Toaster />
                  <AlliedApp />
                </TooltipProvider>
              </CareerProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
          <I18nProvider>
            <AuthProvider>
              <CareerProvider>
              <SiteImagesProvider>
                <TooltipProvider>
                  <Toaster />
                  <PreviewBanner />
                  <TesterBanner />
                  <PageTracker />
                  <CopyProtection />
                  <AnalyticsTracker />
                  <LocaleRouter />
                  <MobileBottomNav />
                  <UpgradePrompt />
                  <PWAInstallPrompt />
                  <ExitIntentModal />
                </TooltipProvider>
              </SiteImagesProvider>
              </CareerProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
