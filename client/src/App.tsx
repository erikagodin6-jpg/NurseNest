import { Switch, Route } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import Home from "@/pages/home";
import { UpgradePrompt } from "@/components/upgrade-prompt";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { usePageTracker } from "@/hooks/use-page-tracker";

const NotFound = lazy(() => import("@/pages/not-found"));
const Lessons = lazy(() => import("@/pages/lessons"));
const LessonDetail = lazy(() => import("@/pages/lesson-detail"));
const Flashcards = lazy(() => import("@/pages/flashcards"));
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

function PageTracker() {
  usePageTracker();
  return null;
}

function CopyProtection() {
  useEffect(() => {
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
  }, []);

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

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/start-free" component={StartFreePage} />
        <Route path="/med-math" component={MedMathPage} />
        <Route path="/lab-values" component={LabValuesPage} />
        <Route path="/admin" component={AdminPage} />
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
        <Route path="/medication-mastery" component={MedicationMasteryPage} />
        <Route path="/clinical-clarity/:slug" component={ClinicalClarityDetail} />
        <Route path="/clinical-clarity" component={ClinicalClarityIndex} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/learn/:slug" component={ContentPage} />
        <Route path="/anatomy" component={AnatomyPage} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/lectures" component={LecturesPage} />
        <Route path="/lectures/:slug" component={LectureViewer} />
        <Route path="/lessons/:id" component={LessonDetail} />
        <Route path="/flashcards/deck/:slug" component={DeckPage} />
        <Route path="/flashcards" component={Flashcards} />
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
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
        <I18nProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <PageTracker />
              <CopyProtection />
              <Router />
              <UpgradePrompt />
              <PWAInstallPrompt />
            </TooltipProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
