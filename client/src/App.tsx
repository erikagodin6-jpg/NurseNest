import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Lessons from "@/pages/lessons";
import LessonDetail from "@/pages/lesson-detail";
import Flashcards from "@/pages/flashcards";
import Reports from "@/pages/reports";
import LoginPage from "@/pages/login";
import ProfilePage from "@/pages/profile";
import SubscriptionSuccess from "@/pages/subscription-success";
import PricingPage from "@/pages/pricing";
import FAQPage from "@/pages/faq";
import AnatomyPage from "@/pages/anatomy";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import DisclaimerPage from "@/pages/disclaimer";
import RefundPolicyPage from "@/pages/refund-policy";
import StartFreePage from "@/pages/start-free";
import AdminPage from "@/pages/admin";
import DashboardPage from "@/pages/dashboard";
import ContentEditorPage from "@/pages/content-editor";
import MedMathPage from "@/pages/med-math";
import LabValuesPage from "@/pages/lab-values";
import ContentPage from "@/pages/content-page";
import BlogPage from "@/pages/blog";
import ClinicalClarityIndex from "@/pages/clinical-clarity";
import ClinicalClarityDetail from "@/pages/clinical-clarity-detail";
import CaseSimulationPage from "@/pages/case-simulation";
import MedicationMasteryPage from "@/pages/medication-mastery";
import SimulatorsPage from "@/pages/simulators";
import PreNursingPage from "@/pages/pre-nursing";
import MockExamsPage from "@/pages/mock-exams";
import MockExamSession from "@/pages/mock-exam-session";
import MockExamReport from "@/pages/mock-exam-report";
import ContactPage from "@/pages/contact";
import FeedbackPage from "@/pages/feedback";
import QuestionOfTheDay from "@/pages/question-of-the-day";
import QuestionBank from "@/pages/question-bank";
import FirstActionSimulatorPage from "@/pages/first-action-simulator";
import SafetyHazardSimulatorPage from "@/pages/safety-hazard-simulator";
import IVComplicationsSimulatorPage from "@/pages/iv-complications-simulator";
import ElectrolyteABGSimulatorPage from "@/pages/electrolyte-abg-simulator";
import DeterioratingPatientSimulatorPage from "@/pages/deteriorating-patient-simulator";
import BloodTransfusionSimulatorPage from "@/pages/blood-transfusion-simulator";
import LectureViewer from "@/pages/lecture-viewer";
import LecturesPage from "@/pages/lectures";
import { UpgradePrompt } from "@/components/upgrade-prompt";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { usePageTracker } from "@/hooks/use-page-tracker";

function PageTracker() {
  usePageTracker();
  return null;
}

function CopyProtection() {
  useEffect(() => {
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
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
