import { Switch, Route, Router, Redirect, useLocation } from "wouter";
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
import { getLocaleFromPath, isValidLocale, DEFAULT_LOCALE } from "@/lib/locale-utils";
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
import AnalyticsTracker from "@/components/analytics-tracker";
import { usePageTracker } from "@/hooks/use-page-tracker";

const NotFound = lazy(() => import("@/pages/not-found"));
const Lessons = lazy(() => import("@/pages/lessons"));
const LessonDetail = lazy(() => import("@/pages/lesson-detail"));
const Flashcards = lazy(() => import("@/pages/flashcards"));
const UpgradePage = lazy(() => import("@/pages/upgrade"));
const Reports = lazy(() => import("@/pages/reports"));
const LoginPage = lazy(() => import("@/pages/login"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const SubscriptionSuccess = lazy(() => import("@/pages/subscription-success"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const FAQPage = lazy(() => import("@/pages/faq"));
const AnatomyPage = lazy(() => import("@/pages/anatomy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const DisclaimerPage = lazy(() => import("@/pages/disclaimer"));
const RefundPolicyPage = lazy(() => import("@/pages/refund-policy"));
const StartFreePage = lazy(() => import("@/pages/start-free"));
const AdminPage = lazy(() => import("@/pages/admin"));
const GeneratorV2Page = lazy(() => import("@/pages/generator-v2"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
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
const AdminSeoDashboard = lazy(() => import("@/pages/admin-seo-dashboard"));
const AdminTranslationDashboard = lazy(() => import("@/pages/admin-translation-dashboard"));
const AdminContentIntelligence = lazy(() => import("@/pages/admin-content-intelligence"));
const AdminCatDashboard = lazy(() => import("@/pages/admin-cat-dashboard"));
const AdminRevenueDashboard = lazy(() => import("@/pages/admin-revenue-dashboard"));
const AdminPipelineDashboard = lazy(() => import("@/pages/admin-pipeline-dashboard"));
const ComparePage = lazy(() => import("@/pages/compare"));
const NpExamHub = lazy(() => import("@/pages/np-exam-hub"));
const ShopPage = lazy(() => import("@/pages/shop"));
const ShopProductPage = lazy(() => import("@/pages/shop-product"));
const ProductBuilderPage = lazy(() => import("@/pages/product-builder"));
const PathwaysPage = lazy(() => import("@/pages/pathways"));
const RexPnGuide = lazy(() => import("@/pages/rex-pn-guide"));
const NclexRnGuide = lazy(() => import("@/pages/nclex-rn-guide"));
const DiagnosticAssessmentPage = lazy(() => import("@/pages/diagnostic-assessment"));
const QBankFactoryPage = lazy(() => import("@/pages/qbank-factory"));
const AccountLibraryPage = lazy(() => import("@/pages/account-library"));
const AdminTrustShowcase = lazy(() => import("@/pages/admin-trust-showcase"));
const FreePracticePage = lazy(() => import("@/pages/free-practice"));
const QuickStudyPage = lazy(() => import("@/pages/quick-study"));
const PracticeQuestionsPage = lazy(() => import("@/pages/practice-questions"));
const SubscribePage = lazy(() => import("@/pages/subscribe"));
const OnboardingPlanPage = lazy(() => import("@/pages/onboarding-plan"));
const StudyPlanPage = lazy(() => import("@/pages/study-plan"));
const NclexRnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexRnPractice })));
const NclexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexPnPractice })));
const RexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.RexPnPractice })));
const NpExamPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NpExamPractice })));
const GlossaryPage = lazy(() => import("@/pages/glossary"));
const CareerAISimulator = lazy(() => import("@/pages/career-tools/career-ai-simulator"));
const AdminCareersPage = lazy(() => import("@/pages/admin-careers"));
const NewGradHub = lazy(() => import("@/pages/new-grad-hub"));
const NursingHub = lazy(() => import("@/pages/nursing-hub"));
const NursingSpecialtiesHub = lazy(() => import("@/pages/nursing-specialties-hub"));
const RexPnHub = lazy(() => import("@/pages/rex-pn-hub"));
const RexPnExamFormat = lazy(() => import("@/pages/rex-pn-exam-format"));
const RexPnStrategies = lazy(() => import("@/pages/rex-pn-strategies"));
const RexPnWellness = lazy(() => import("@/pages/rex-pn-wellness"));
const PharmacologyHub = lazy(() => import("@/pages/pharmacology-hub"));
const AdminNgnGenerator = lazy(() => import("@/pages/admin-ngn-generator"));
const AdminAutopilot = lazy(() => import("@/pages/admin-autopilot"));
const AdminPageviews = lazy(() => import("@/pages/admin-pageviews"));
const AdminSeoAutopilot = lazy(() => import("@/pages/admin-seo-autopilot"));
const OrderOfTheDraw = lazy(() => import("@/pages/order-of-the-draw"));
const InfographicLibrary = lazy(() => import("@/pages/infographic-library"));
const TrialLanding = lazy(() => import("@/pages/trial-landing"));
const TrialSession = lazy(() => import("@/pages/trial-session"));
const TrialResults = lazy(() => import("@/pages/trial-results"));
const TrialUpgrade = lazy(() => import("@/pages/trial-upgrade"));
const AlliedHomePage = lazy(() => import("@/allied/pages/allied-home"));
const ForInstitutions = lazy(() => import("@/pages/for-institutions"));
const AdminInstitutions = lazy(() => import("@/pages/admin-institutions"));

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
        <Route path="/new-grad" component={NewGradHub} />
        <Route path="/nursing" component={NursingHub} />
        <Route path="/nursing-specialties" component={NursingSpecialtiesHub} />
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
        <Route path="/admin/content-intelligence" component={AdminContentIntelligence} />
        <Route path="/admin/cat" component={AdminCatDashboard} />
        <Route path="/admin/revenue" component={AdminRevenueDashboard} />
        <Route path="/admin/pipeline" component={AdminPipelineDashboard} />
        <Route path="/admin/qbank/ngn-generator" component={AdminNgnGenerator} />
        <Route path="/admin/autopilot" component={AdminAutopilot} />
        <Route path="/admin/pageviews" component={AdminPageviews} />
        <Route path="/admin/seo-visual-autopilot" component={AdminSeoAutopilot} />
        <Route path="/admin/institutions" component={AdminInstitutions} />
        <Route path="/for-institutions" component={ForInstitutions} />
        <Route path="/order-of-the-draw" component={OrderOfTheDraw} />
        <Route path="/infographics/:slug" component={InfographicLibrary} />
        <Route path="/infographics" component={InfographicLibrary} />
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
        <Route path="/flashcards" component={Flashcards} />
        <Route path="/upgrade" component={UpgradePage} />
        <Route path="/upgrade/success" component={UpgradePage} />
        <Route path="/reports" component={Reports} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/subscription/success" component={SubscriptionSuccess} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/trial/session/:id" component={TrialSession} />
        <Route path="/trial/results/:id" component={TrialResults} />
        <Route path="/trial/upgrade" component={TrialUpgrade} />
        <Route path="/trial" component={TrialLanding} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/question-of-the-day" component={QuestionOfTheDay} />
        <Route path="/question-bank" component={QuestionBank} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/free-practice" component={FreePracticePage} />
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
        <Route path="/nclex-rn-practice-questions" component={NclexRnPracticePage} />
        <Route path="/nclex-pn-practice-questions" component={NclexPnPracticePage} />
        <Route path="/rex-pn-practice-questions" component={RexPnPracticePage} />
        <Route path="/np-exam-practice-questions" component={NpExamPracticePage} />
        <Route path="/glossary/:term" component={GlossaryPage} />
        <Route path="/glossary" component={GlossaryPage} />

        {/* Career-namespaced routes: /rrt/*, /paramedic/*, /pharmacy-tech/*, /mlt/*, /imaging/* */}
        <Route path="/rrt/question-bank" component={QuestionBank} />
        <Route path="/rrt/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/rrt/flashcards" component={Flashcards} />
        <Route path="/rrt/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/rrt/mock-exams/:id" component={MockExamSession} />
        <Route path="/rrt/mock-exams" component={MockExamsPage} />
        <Route path="/rrt/study-plan" component={StudyPlanPage} />
        <Route path="/rrt/pricing" component={PricingPage} />
        <Route path="/rrt/dashboard" component={DashboardPage} />
        <Route path="/rrt" component={AlliedHomePage} />

        <Route path="/paramedic/question-bank" component={QuestionBank} />
        <Route path="/paramedic/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/paramedic/flashcards" component={Flashcards} />
        <Route path="/paramedic/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/paramedic/mock-exams/:id" component={MockExamSession} />
        <Route path="/paramedic/mock-exams" component={MockExamsPage} />
        <Route path="/paramedic/study-plan" component={StudyPlanPage} />
        <Route path="/paramedic/pricing" component={PricingPage} />
        <Route path="/paramedic/dashboard" component={DashboardPage} />
        <Route path="/paramedic" component={AlliedHomePage} />

        <Route path="/pharmacy-tech/question-bank" component={QuestionBank} />
        <Route path="/pharmacy-tech/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/pharmacy-tech/flashcards" component={Flashcards} />
        <Route path="/pharmacy-tech/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/pharmacy-tech/mock-exams/:id" component={MockExamSession} />
        <Route path="/pharmacy-tech/mock-exams" component={MockExamsPage} />
        <Route path="/pharmacy-tech/study-plan" component={StudyPlanPage} />
        <Route path="/pharmacy-tech/pricing" component={PricingPage} />
        <Route path="/pharmacy-tech/dashboard" component={DashboardPage} />
        <Route path="/pharmacy-tech" component={AlliedHomePage} />

        <Route path="/mlt/question-bank" component={QuestionBank} />
        <Route path="/mlt/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/mlt/flashcards" component={Flashcards} />
        <Route path="/mlt/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/mlt/mock-exams/:id" component={MockExamSession} />
        <Route path="/mlt/mock-exams" component={MockExamsPage} />
        <Route path="/mlt/study-plan" component={StudyPlanPage} />
        <Route path="/mlt/pricing" component={PricingPage} />
        <Route path="/mlt/dashboard" component={DashboardPage} />
        <Route path="/mlt" component={AlliedHomePage} />

        <Route path="/imaging/question-bank" component={QuestionBank} />
        <Route path="/imaging/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/imaging/flashcards" component={Flashcards} />
        <Route path="/imaging/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/imaging/mock-exams/:id" component={MockExamSession} />
        <Route path="/imaging/mock-exams" component={MockExamsPage} />
        <Route path="/imaging/study-plan" component={StudyPlanPage} />
        <Route path="/imaging/pricing" component={PricingPage} />
        <Route path="/imaging/dashboard" component={DashboardPage} />
        <Route path="/imaging" component={AlliedHomePage} />

        {/* Phase 3: Advanced Clinical & Specialist Certifications */}
        <Route path="/critical-care/question-bank" component={QuestionBank} />
        <Route path="/critical-care/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/critical-care/flashcards" component={Flashcards} />
        <Route path="/critical-care/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/critical-care/mock-exams/:id" component={MockExamSession} />
        <Route path="/critical-care/mock-exams" component={MockExamsPage} />
        <Route path="/critical-care/study-plan" component={StudyPlanPage} />
        <Route path="/critical-care/pricing" component={PricingPage} />
        <Route path="/critical-care/dashboard" component={DashboardPage} />
        <Route path="/critical-care" component={AlliedHomePage} />

        <Route path="/emergency-nursing/question-bank" component={QuestionBank} />
        <Route path="/emergency-nursing/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/emergency-nursing/flashcards" component={Flashcards} />
        <Route path="/emergency-nursing/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/emergency-nursing/mock-exams/:id" component={MockExamSession} />
        <Route path="/emergency-nursing/mock-exams" component={MockExamsPage} />
        <Route path="/emergency-nursing/study-plan" component={StudyPlanPage} />
        <Route path="/emergency-nursing/pricing" component={PricingPage} />
        <Route path="/emergency-nursing/dashboard" component={DashboardPage} />
        <Route path="/emergency-nursing" component={AlliedHomePage} />

        <Route path="/perioperative/question-bank" component={QuestionBank} />
        <Route path="/perioperative/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/perioperative/flashcards" component={Flashcards} />
        <Route path="/perioperative/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/perioperative/mock-exams/:id" component={MockExamSession} />
        <Route path="/perioperative/mock-exams" component={MockExamsPage} />
        <Route path="/perioperative/study-plan" component={StudyPlanPage} />
        <Route path="/perioperative/pricing" component={PricingPage} />
        <Route path="/perioperative/dashboard" component={DashboardPage} />
        <Route path="/perioperative" component={AlliedHomePage} />

        <Route path="/oncology-nursing/question-bank" component={QuestionBank} />
        <Route path="/oncology-nursing/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/oncology-nursing/flashcards" component={Flashcards} />
        <Route path="/oncology-nursing/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/oncology-nursing/mock-exams/:id" component={MockExamSession} />
        <Route path="/oncology-nursing/mock-exams" component={MockExamsPage} />
        <Route path="/oncology-nursing/study-plan" component={StudyPlanPage} />
        <Route path="/oncology-nursing/pricing" component={PricingPage} />
        <Route path="/oncology-nursing/dashboard" component={DashboardPage} />
        <Route path="/oncology-nursing" component={AlliedHomePage} />

        <Route path="/pediatric-cert/question-bank" component={QuestionBank} />
        <Route path="/pediatric-cert/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/pediatric-cert/flashcards" component={Flashcards} />
        <Route path="/pediatric-cert/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/pediatric-cert/mock-exams/:id" component={MockExamSession} />
        <Route path="/pediatric-cert/mock-exams" component={MockExamsPage} />
        <Route path="/pediatric-cert/study-plan" component={StudyPlanPage} />
        <Route path="/pediatric-cert/pricing" component={PricingPage} />
        <Route path="/pediatric-cert/dashboard" component={DashboardPage} />
        <Route path="/pediatric-cert" component={AlliedHomePage} />

        {/* Phase 4: Mental Health & Behavioral Health */}
        <Route path="/psychotherapist/question-bank" component={QuestionBank} />
        <Route path="/psychotherapist/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/psychotherapist/flashcards" component={Flashcards} />
        <Route path="/psychotherapist/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/psychotherapist/mock-exams/:id" component={MockExamSession} />
        <Route path="/psychotherapist/mock-exams" component={MockExamsPage} />
        <Route path="/psychotherapist/study-plan" component={StudyPlanPage} />
        <Route path="/psychotherapist/pricing" component={PricingPage} />
        <Route path="/psychotherapist/dashboard" component={DashboardPage} />
        <Route path="/psychotherapist" component={AlliedHomePage} />

        <Route path="/social-worker/question-bank" component={QuestionBank} />
        <Route path="/social-worker/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/social-worker/flashcards" component={Flashcards} />
        <Route path="/social-worker/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/social-worker/mock-exams/:id" component={MockExamSession} />
        <Route path="/social-worker/mock-exams" component={MockExamsPage} />
        <Route path="/social-worker/study-plan" component={StudyPlanPage} />
        <Route path="/social-worker/pricing" component={PricingPage} />
        <Route path="/social-worker/dashboard" component={DashboardPage} />
        <Route path="/social-worker" component={AlliedHomePage} />

        <Route path="/addictions-counsellor/question-bank" component={QuestionBank} />
        <Route path="/addictions-counsellor/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/addictions-counsellor/flashcards" component={Flashcards} />
        <Route path="/addictions-counsellor/mock-exams/:id/report" component={MockExamReport} />
        <Route path="/addictions-counsellor/mock-exams/:id" component={MockExamSession} />
        <Route path="/addictions-counsellor/mock-exams" component={MockExamsPage} />
        <Route path="/addictions-counsellor/study-plan" component={StudyPlanPage} />
        <Route path="/addictions-counsellor/pricing" component={PricingPage} />
        <Route path="/addictions-counsellor/dashboard" component={DashboardPage} />
        <Route path="/addictions-counsellor" component={AlliedHomePage} />

        {/* Admin Career Management */}
        <Route path="/admin/careers" component={AdminCareersPage} />

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

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function LocaleRouter() {
  const [location] = useLocation();
  const { locale, pathWithoutLocale } = getLocaleFromPath(location);
  const segments = location.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";

  if (!firstSegment || !isValidLocale(firstSegment)) {
    const redirectTarget = `/${DEFAULT_LOCALE}${location === "/" ? "" : location}`;
    return <Redirect to={redirectTarget} />;
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
