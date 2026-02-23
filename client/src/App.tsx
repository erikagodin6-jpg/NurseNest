import { Switch, Route } from "wouter";
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
import { UpgradePrompt } from "@/components/upgrade-prompt";
import { usePageTracker } from "@/hooks/use-page-tracker";

function PageTracker() {
  usePageTracker();
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
      <ThemeProvider attribute="data-theme" defaultTheme="lavender" enableSystem={false}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <PageTracker />
            <Router />
            <UpgradePrompt />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
