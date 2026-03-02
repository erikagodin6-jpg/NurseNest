import { Switch, Route, Router, Redirect, useLocation } from "wouter";
import { useEffect, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import { SiteImagesProvider } from "@/components/admin-image-overlay";
import { getLocaleFromPath, isValidLocale, DEFAULT_LOCALE } from "@/lib/locale-utils";

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
const PreNursingPage = lazy(() => import("@/pages/pre-nursing"));
const MockExamsPage = lazy(() => import("@/pages/mock-exams"));
const MockExamSession = lazy(() => import("@/pages/mock-exam-session"));
const MockExamReport = lazy(() => import("@/pages/mock-exam-report"));
const ContactPage = lazy(() => import("@/pages/contact"));
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
const SubscribePage = lazy(() => import("@/pages/subscribe"));
const OnboardingPlanPage = lazy(() => import("@/pages/onboarding-plan"));
const StudyPlanPage = lazy(() => import("@/pages/study-plan"));
const NclexRnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexRnPractice })));
const NclexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NclexPnPractice })));
const RexPnPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.RexPnPractice })));
const NpExamPracticePage = lazy(() => import("@/pages/exam-practice-landing").then(m => ({ default: m.NpExamPractice })));

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
        <Route path="/faq" component={FAQPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/question-of-the-day" component={QuestionOfTheDay} />
        <Route path="/question-bank" component={QuestionBank} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/free-practice" component={FreePracticePage} />
        <Route path="/subscribe/:tier" component={SubscribePage} />
        <Route path="/onboarding/plan" component={OnboardingPlanPage} />
        <Route path="/study-plan" component={StudyPlanPage} />
        <Route path="/nclex-rn-practice-questions" component={NclexRnPracticePage} />
        <Route path="/nclex-pn-practice-questions" component={NclexPnPracticePage} />
        <Route path="/rex-pn-practice-questions" component={RexPnPracticePage} />
        <Route path="/np-exam-practice-questions" component={NpExamPracticePage} />
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

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
          <I18nProvider>
            <AuthProvider>
              <SiteImagesProvider>
                <TooltipProvider>
                  <Toaster />
                  <PreviewBanner />
                  <PageTracker />
                  <CopyProtection />
                  <AnalyticsTracker />
                  <LocaleRouter />
                  <UpgradePrompt />
                  <PWAInstallPrompt />
                </TooltipProvider>
              </SiteImagesProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
