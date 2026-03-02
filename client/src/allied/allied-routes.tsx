import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";

const AlliedHome = lazy(() => import("./pages/allied-home"));
const CareerDirectory = lazy(() => import("./pages/career-directory"));
const CareerLanding = lazy(() => import("./pages/career-landing"));
const AlliedQBank = lazy(() => import("./pages/allied-qbank"));
const AlliedMockExams = lazy(() => import("./pages/allied-mock-exams"));
const AlliedDashboard = lazy(() => import("./pages/allied-dashboard"));
const AlliedStudyPlan = lazy(() => import("./pages/allied-study-plan"));
const AlliedFlashcards = lazy(() => import("./pages/allied-flashcards"));
const AlliedSims = lazy(() => import("./pages/allied-sims"));
const AlliedTools = lazy(() => import("./pages/allied-tools"));
const AlliedPricing = lazy(() => import("./pages/allied-pricing"));
const AlliedAdmin = lazy(() => import("./pages/allied-admin"));
const AlliedSeoLanding = lazy(() => import("./pages/allied-seo-landing"));
const AlliedDiagnostic = lazy(() => import("./pages/allied-diagnostic"));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function AlliedRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={AlliedHome} />
        <Route path="/careers" component={CareerDirectory} />
        <Route path="/pricing" component={AlliedPricing} />
        <Route path="/diagnostic" component={AlliedDiagnostic} />
        <Route path="/qbank" component={AlliedQBank} />
        <Route path="/admin/allied" component={AlliedAdmin} />
        <Route path="/pharmacy-technician-practice-questions">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-practice-questions" />}</Route>
        <Route path="/pharmacy-technician-mock-exam">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-mock-exam" />}</Route>
        <Route path="/pharmacy-technician-study-guide">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-study-guide" />}</Route>
        <Route path="/rrt-practice-questions">{() => <AlliedSeoLanding pageSlug="rrt-practice-questions" />}</Route>
        <Route path="/rrt-mock-exam">{() => <AlliedSeoLanding pageSlug="rrt-mock-exam" />}</Route>
        <Route path="/rrt-study-guide">{() => <AlliedSeoLanding pageSlug="rrt-study-guide" />}</Route>
        <Route path="/careers/:careerSlug/mock-exams" component={AlliedMockExams} />
        <Route path="/careers/:careerSlug/dashboard" component={AlliedDashboard} />
        <Route path="/careers/:careerSlug/study-plan" component={AlliedStudyPlan} />
        <Route path="/careers/:careerSlug/flashcards" component={AlliedFlashcards} />
        <Route path="/careers/:careerSlug/sims" component={AlliedSims} />
        <Route path="/careers/:careerSlug/tools" component={AlliedTools} />
        <Route path="/careers/:careerSlug" component={CareerLanding} />
        <Route>
          {() => (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-600">The page you're looking for doesn't exist on NurseNest Allied.</p>
              <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700" data-testid="link-back-home">Back to Home</a>
            </div>
          )}
        </Route>
      </Switch>
    </Suspense>
  );
}
