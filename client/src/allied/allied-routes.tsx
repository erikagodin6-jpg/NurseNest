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
const ParamedicScenarioPlayer = lazy(() => import("./pages/paramedic-scenario-player"));
const AlliedTools = lazy(() => import("./pages/allied-tools"));
const AlliedPricing = lazy(() => import("./pages/allied-pricing"));
const AlliedAdmin = lazy(() => import("./pages/allied-admin"));
const MltAdmin = lazy(() => import("./pages/mlt-admin"));
const AlliedSeoLanding = lazy(() => import("./pages/allied-seo-landing"));
const AlliedDiagnostic = lazy(() => import("./pages/allied-diagnostic"));
const AlliedInstitutions = lazy(() => import("./pages/allied-institutions"));
const AlliedInstitutionsFAQ = lazy(() => import("./pages/allied-institutions-faq"));
const AlliedFacultyDashboard = lazy(() => import("./pages/allied-faculty-dashboard"));
const ParamedicLanding = lazy(() => import("./pages/paramedic/paramedic-landing"));
const ParamedicPCP = lazy(() => import("./pages/paramedic/paramedic-pcp"));
const ParamedicACP = lazy(() => import("./pages/paramedic/paramedic-acp"));
const ParamedicNREMT = lazy(() => import("./pages/paramedic/paramedic-nremt"));
const ParamedicLessonsHub = lazy(() => import("./pages/paramedic/paramedic-lessons-hub"));
const ParamedicExamsHub = lazy(() => import("./pages/paramedic/paramedic-exams-hub"));
const ParamedicFlashcardsHub = lazy(() => import("./pages/paramedic/paramedic-flashcards-hub"));
const ParamedicScenariosHub = lazy(() => import("./pages/paramedic/paramedic-scenarios-hub"));
const ParamedicPracticeExamsHub = lazy(() => import("./pages/paramedic/paramedic-practice-exams-hub"));
const MltLanding = lazy(() => import("./pages/mlt-landing"));
const MltCountryPage = lazy(() => import("./pages/mlt-country-page"));
const MltBlog = lazy(() => import("./pages/mlt-blog"));
const ParamedicSeoAdmin = lazy(() => import("./pages/paramedic-seo-admin"));
const ParamedicSeoPage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicTopicPage })));
const ParamedicCategoryPage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicCategoryPage })));
const ParamedicGlossaryPage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicGlossaryPage })));
const ParamedicComparisonPage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicComparisonPage })));
const ParamedicStudyGuidePage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicStudyGuidePage })));
const ParamedicExamPrepPage = lazy(() => import("./pages/paramedic-seo-page").then(m => ({ default: m.ParamedicExamPrepPage })));

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
        <Route path="/institutions/faq" component={AlliedInstitutionsFAQ} />
        <Route path="/institutions/faculty-dashboard" component={AlliedFacultyDashboard} />
        <Route path="/institutions" component={AlliedInstitutions} />
        <Route path="/diagnostic" component={AlliedDiagnostic} />
        <Route path="/qbank" component={AlliedQBank} />
        <Route path="/admin/allied" component={AlliedAdmin} />
        <Route path="/admin/paramedic-seo" component={ParamedicSeoAdmin} />
        <Route path="/paramedic/topic/:slug" component={ParamedicSeoPage} />
        <Route path="/paramedic/category/:slug" component={ParamedicCategoryPage} />
        <Route path="/paramedic/glossary/:slug" component={ParamedicGlossaryPage} />
        <Route path="/paramedic/compare/:slug" component={ParamedicComparisonPage} />
        <Route path="/paramedic/study-guide/:slug" component={ParamedicStudyGuidePage} />
        <Route path="/paramedic/exam-prep/:slug" component={ParamedicExamPrepPage} />
        <Route path="/admin/mlt" component={MltAdmin} />
        <Route path="/admin/mlt/questions" component={MltAdmin} />
        <Route path="/admin/mlt/flashcards" component={MltAdmin} />
        <Route path="/admin/mlt/lessons" component={MltAdmin} />
        <Route path="/admin/mlt/exams" component={MltAdmin} />
        <Route path="/admin/mlt/uploads" component={MltAdmin} />
        <Route path="/admin/mlt/seo" component={MltAdmin} />
        <Route path="/admin/mlt/publish" component={MltAdmin} />
        <Route path="/admin/mlt/import" component={MltAdmin} />
        <Route path="/admin/mlt/import/history" component={MltAdmin} />
        <Route path="/pharmacy-technician-practice-questions">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-practice-questions" />}</Route>
        <Route path="/pharmacy-technician-mock-exam">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-mock-exam" />}</Route>
        <Route path="/pharmacy-technician-study-guide">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-study-guide" />}</Route>
        <Route path="/rrt-practice-questions">{() => <AlliedSeoLanding pageSlug="rrt-practice-questions" />}</Route>
        <Route path="/rrt-mock-exam">{() => <AlliedSeoLanding pageSlug="rrt-mock-exam" />}</Route>
        <Route path="/rrt-study-guide">{() => <AlliedSeoLanding pageSlug="rrt-study-guide" />}</Route>
        <Route path="/pharmacy-tech-us">{() => <AlliedSeoLanding pageSlug="pharmacy-tech-us" />}</Route>
        <Route path="/pharmacy-tech-canada">{() => <AlliedSeoLanding pageSlug="pharmacy-tech-canada" />}</Route>
        <Route path="/rrt-us">{() => <AlliedSeoLanding pageSlug="rrt-us" />}</Route>
        <Route path="/rrt-canada">{() => <AlliedSeoLanding pageSlug="rrt-canada" />}</Route>
        <Route path="/imaging-us">{() => <AlliedSeoLanding pageSlug="imaging-us" />}</Route>
        <Route path="/imaging-canada">{() => <AlliedSeoLanding pageSlug="imaging-canada" />}</Route>
        <Route path="/paramedic-us">{() => <AlliedSeoLanding pageSlug="paramedic-us" />}</Route>
        <Route path="/paramedic-canada">{() => <AlliedSeoLanding pageSlug="paramedic-canada" />}</Route>
        <Route path="/mlt-us">{() => <AlliedSeoLanding pageSlug="mlt-us" />}</Route>
        <Route path="/mlt-canada">{() => <AlliedSeoLanding pageSlug="mlt-canada" />}</Route>
        <Route path="/paramedic/pcp" component={ParamedicPCP} />
        <Route path="/paramedic/acp" component={ParamedicACP} />
        <Route path="/paramedic/nremt" component={ParamedicNREMT} />
        <Route path="/paramedic/lessons" component={ParamedicLessonsHub} />
        <Route path="/paramedic/exams" component={ParamedicExamsHub} />
        <Route path="/paramedic/flashcards" component={ParamedicFlashcardsHub} />
        <Route path="/paramedic/scenarios" component={ParamedicScenariosHub} />
        <Route path="/paramedic/practice-exams" component={ParamedicPracticeExamsHub} />
        <Route path="/paramedic" component={ParamedicLanding} />
        <Route path="/mlt" component={MltLanding} />
        <Route path="/mlt/blog/:slug">{() => <MltBlog isPost />}</Route>
        <Route path="/mlt/blog">{() => <MltBlog />}</Route>
        <Route path="/mlt/canada/exam-prep">{() => <MltCountryPage country="canada" pageType="exam-prep" />}</Route>
        <Route path="/mlt/canada/lessons">{() => <MltCountryPage country="canada" pageType="lessons" />}</Route>
        <Route path="/mlt/canada/flashcards">{() => <MltCountryPage country="canada" pageType="flashcards" />}</Route>
        <Route path="/mlt/canada/practice-exams">{() => <MltCountryPage country="canada" pageType="practice-exams" />}</Route>
        <Route path="/mlt/canada/study-plan">{() => <MltCountryPage country="canada" pageType="study-plan" />}</Route>
        <Route path="/mlt/canada/free-questions">{() => <MltCountryPage country="canada" pageType="free-questions" />}</Route>
        <Route path="/mlt/canada/faq">{() => <MltCountryPage country="canada" pageType="faq" />}</Route>
        <Route path="/mlt/usa/exam-prep">{() => <MltCountryPage country="usa" pageType="exam-prep" />}</Route>
        <Route path="/mlt/usa/lessons">{() => <MltCountryPage country="usa" pageType="lessons" />}</Route>
        <Route path="/mlt/usa/flashcards">{() => <MltCountryPage country="usa" pageType="flashcards" />}</Route>
        <Route path="/mlt/usa/practice-exams">{() => <MltCountryPage country="usa" pageType="practice-exams" />}</Route>
        <Route path="/mlt/usa/study-plan">{() => <MltCountryPage country="usa" pageType="study-plan" />}</Route>
        <Route path="/mlt/usa/free-questions">{() => <MltCountryPage country="usa" pageType="free-questions" />}</Route>
        <Route path="/mlt/usa/faq">{() => <MltCountryPage country="usa" pageType="faq" />}</Route>
        <Route path="/careers/:careerSlug/mock-exams" component={AlliedMockExams} />
        <Route path="/careers/:careerSlug/dashboard" component={AlliedDashboard} />
        <Route path="/careers/:careerSlug/study-plan" component={AlliedStudyPlan} />
        <Route path="/careers/:careerSlug/flashcards" component={AlliedFlashcards} />
        <Route path="/careers/paramedic/scenarios/:slug" component={ParamedicScenarioPlayer} />
        <Route path="/careers/paramedic/scenarios" component={ParamedicScenariosHub} />
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
