import { Switch, Route, Redirect } from "wouter";
import { lazy, Suspense } from "react";
import { getCanonicalRoute } from "@shared/careers";
import { PROFESSION_HUB_DATA } from "@/allied/data/profession-hub-data";

const AlliedHome = lazy(() => import("./pages/allied-home"));
const CareerDirectory = lazy(() => import("./pages/career-directory"));
const CareerLanding = lazy(() => import("./pages/career-landing"));
const AlliedQBank = lazy(() => import("./pages/allied-qbank"));
const ProfessionHubPage = lazy(() => import("./pages/profession-hub"));
const ProfessionClusterRedirect = lazy(() => import("./pages/profession-cluster-redirect"));
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
const ParamedicBulkUpload = lazy(() => import("./pages/paramedic-bulk-upload"));
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
const ParamedicECGLibrary = lazy(() => import("./pages/paramedic/ecg-library"));
const ParamedicECGAdmin = lazy(() => import("./pages/paramedic/ecg-admin"));
const ParamedicQuestionsIndex = lazy(() => import("./pages/paramedic/paramedic-questions-index"));
const ParamedicQuestionSeoPage = lazy(() => import("./pages/paramedic/paramedic-question-seo"));
const ParamedicExamLauncher = lazy(() => import("./pages/paramedic/paramedic-exam-launcher"));
const ParamedicExamSimulator = lazy(() => import("./pages/paramedic/paramedic-exam-simulator"));
const ParamedicExamResults = lazy(() => import("./pages/paramedic/paramedic-exam-results"));
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
const MltImageLibrary = lazy(() => import("./pages/mlt/mlt-image-library"));
const MltImageDrill = lazy(() => import("./pages/mlt/mlt-image-drill"));
const MltExamHub = lazy(() => import("./pages/mlt/mlt-exam-hub"));
const MltCanadaExam = lazy(() => import("./pages/mlt/mlt-canada-exam"));
const MltUsaCatExam = lazy(() => import("./pages/mlt/mlt-usa-cat-exam"));
const MltAdaptivePractice = lazy(() => import("./pages/mlt/mlt-adaptive-practice"));
const MltPracticeExam = lazy(() => import("./pages/mlt/mlt-practice-exam"));
const MltExamResults = lazy(() => import("./pages/mlt/mlt-exam-results"));
const MltExamHistory = lazy(() => import("./pages/mlt/mlt-exam-history"));
const MltAdminCat = lazy(() => import("./pages/mlt/mlt-admin-cat"));

const OccupationalTherapyHub = lazy(() => import("./pages/occupational-therapy-hub"));
const PhysicalTherapyHub = lazy(() => import("./pages/physical-therapy-hub"));
const PharmtechHub = lazy(() => import("./pages/pharmtech-hub"));
const PharmtechLessons = lazy(() => import("./pages/pharmtech-lessons"));
const PharmtechFlashcards = lazy(() => import("./pages/pharmtech-flashcards"));
const PharmtechExams = lazy(() => import("./pages/pharmtech-exams"));
const PharmtechPractice = lazy(() => import("./pages/pharmtech-practice"));
const PharmtechStudyGuide = lazy(() => import("./pages/pharmtech-study-guide"));
const PharmtechAdmin = lazy(() => import("./pages/pharmtech-admin"));
const PharmtechReview = lazy(() => import("./pages/pharmtech-review"));
const PharmtechDrugClassesHub = lazy(() => import("./pages/pharmtech-drug-classes"));
const PharmtechDrugClassDetail = lazy(() => import("./pages/pharmtech-drug-classes").then(m => ({ default: m.PharmtechDrugClassDetail })));
const PharmtechPracticeExamSeo = lazy(() => import("./pages/pharmtech-practice-exam-seo"));
const PharmtechAdaptivePractice = lazy(() => import("./pages/pharmtech-adaptive-practice"));
const PharmtechStudyPlan = lazy(() => import("./pages/pharmtech-study-plan"));
const MltStudentDashboard = lazy(() => import("./pages/mlt-student-dashboard"));
const ImagingPhysicsListing = lazy(() => import("./pages/imaging-physics-listing"));
const ImagingPhysicsTopic = lazy(() => import("./pages/imaging-physics-topic"));
const ImagingFlashcardsPage = lazy(() => import("./pages/imaging-flashcards"));
const ImagingSeoLanding = lazy(() => import("./pages/imaging-seo-landing"));
import { MltSEOPage } from "./pages/mlt-seo-pages";
const AlliedQuestionSeoPage = lazy(() => import("./pages/allied-question-seo"));
const AlliedQuestionsIndexPage = lazy(() => import("./pages/allied-questions-index"));
import { UnderservedSEOPage, OTQuestionBankPage, OTMockExamsPage, OTStudyPlanPage } from "./pages/underserved-seo-pages";
const EncyclopediaHubPage = lazy(() => import("./pages/encyclopedia-hub-page"));
const EncyclopediaTopicPage = lazy(() => import("./pages/encyclopedia-topic-page"));
const EncyclopediaAdmin = lazy(() => import("./pages/encyclopedia-admin"));
const ProgrammaticSeoPage = lazy(() => import("@/pages/programmatic-seo-page"));
const CareerGuidePage = lazy(() => import("./pages/career-guide-page"));
const AlliedHealthHub = lazy(() => import("./pages/allied-health-hub"));
const AlliedHealthProfessionPage = lazy(() => import("./pages/allied-health-profession"));
const AlliedHealthArticlePage = lazy(() => import("./pages/allied-health-article"));
const AdminAlliedHealthSEO = lazy(() => import("@/pages/admin-allied-health-seo"));
const ArticleListingPage = lazy(() => import("./pages/article-listing"));
const ArticleDetailPage = lazy(() => import("./pages/article-detail"));

const ParamedicExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.ParamedicExamPrep })));
const RrtExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.RrtExamPrep })));
const MltExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.MltExamPrep })));
const RadiographyExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.RadiographyExamPrep })));
const SocialWorkExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.SocialWorkExamPrep })));
const PsychotherapyExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.PsychotherapyExamPrep })));
const AddictionsCounsellingExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.AddictionsCounsellingExamPrep })));
const OccupationalTherapyExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.OccupationalTherapyExamPrep })));
const PhysicalTherapyExamPrepLanding = lazy(() => import("@/pages/allied-exam-prep-landing").then(m => ({ default: m.PhysicalTherapyExamPrep })));

function CareerRedirect({ careerSlug, subPath }: { careerSlug?: string; subPath?: string }) {
  if (!careerSlug) return null;
  const canonical = getCanonicalRoute(careerSlug);
  const target = subPath ? `${canonical}/${subPath}` : canonical;
  window.location.replace(target);
  return null;
}

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
        <Route path="/pricing">{() => { window.location.href = "/pricing/allied"; return null; }}</Route>
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
        <Route path="/admin/allied-content/occupational-therapy/questions" component={AlliedAdmin} />
        <Route path="/admin/allied-content/occupational-therapy/lessons" component={AlliedAdmin} />
        <Route path="/admin/allied-content/occupational-therapy/flashcards" component={AlliedAdmin} />
        <Route path="/admin/allied-content/occupational-therapy" component={AlliedAdmin} />
        <Route path="/admin/allied-content/physical-therapy/questions" component={AlliedAdmin} />
        <Route path="/admin/allied-content/physical-therapy/lessons" component={AlliedAdmin} />
        <Route path="/admin/allied-content/physical-therapy/flashcards" component={AlliedAdmin} />
        <Route path="/admin/allied-content/physical-therapy" component={AlliedAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician/questions" component={PharmtechAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician/lessons" component={PharmtechAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician/flashcards" component={PharmtechAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician/exams" component={PharmtechAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician/import" component={PharmtechAdmin} />
        <Route path="/admin/allied-content/pharmacy-technician" component={PharmtechAdmin} />
        <Route path="/admin/paramedic-bulk-upload" component={ParamedicBulkUpload} />
        <Route path="/pharmacy-technician/drug-classes/:slug" component={PharmtechDrugClassDetail} />
        <Route path="/pharmacy-technician/drug-classes" component={PharmtechDrugClassesHub} />
        <Route path="/admin/allied-content/pharmacy-technician/study-plans" component={PharmtechAdmin} />
        <Route path="/pharmacy-technician/study-plan/:planId" component={PharmtechStudyPlan} />
        <Route path="/pharmacy-technician/study-plan" component={PharmtechStudyPlan} />
        <Route path="/pharmacy-technician" component={PharmtechHub} />
        <Route path="/pharmacy-technician/lessons/:slug" component={PharmtechLessons} />
        <Route path="/pharmacy-technician/lessons" component={PharmtechLessons} />
        <Route path="/pharmacy-technician/flashcards/:slug" component={PharmtechFlashcards} />
        <Route path="/pharmacy-technician/flashcards" component={PharmtechFlashcards} />
        <Route path="/pharmacy-technician/review/:attemptId" component={PharmtechReview} />
        <Route path="/pharmacy-technician/exams/:slug" component={PharmtechExams} />
        <Route path="/pharmacy-technician/exams" component={PharmtechExams} />
        <Route path="/pharmacy-technician/practice-exam-questions" component={PharmtechPracticeExamSeo} />
        <Route path="/pharmacy-technician/adaptive-practice" component={PharmtechAdaptivePractice} />
        <Route path="/pharmacy-technician/practice-questions" component={PharmtechPractice} />
        <Route path="/pharmacy-technician/study-guide" component={PharmtechStudyGuide} />
        <Route path="/pharmacy-technician-practice-questions">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-practice-questions" />}</Route>
        <Route path="/pharmacy-technician-mock-exam">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-mock-exam" />}</Route>
        <Route path="/pharmacy-technician-study-guide">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-study-guide" />}</Route>
        <Route path="/pharmacy-technician-top-200-drugs-flashcards">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-top-200-drugs-flashcards" />}</Route>
        <Route path="/pharmacy-technician-dosage-calculations-practice">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-dosage-calculations-practice" />}</Route>
        <Route path="/pharmacy-technician-dosage-calculations">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-dosage-calculations" />}</Route>
        <Route path="/pharmacy-technician-pharmacy-law-and-ethics">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-pharmacy-law-and-ethics" />}</Route>
        <Route path="/pharmacy-technician-medication-safety">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-medication-safety" />}</Route>
        <Route path="/pharmacy-technician-top-200-drugs">{() => <AlliedSeoLanding pageSlug="pharmacy-technician-top-200-drugs" />}</Route>
        <Route path="/rrt-practice-questions">{() => <AlliedSeoLanding pageSlug="rrt-practice-questions" />}</Route>
        <Route path="/rrt-mock-exam">{() => <AlliedSeoLanding pageSlug="rrt-mock-exam" />}</Route>
        <Route path="/rrt-study-guide">{() => <AlliedSeoLanding pageSlug="rrt-study-guide" />}</Route>
        <Route path="/pharmacy-tech-us">{() => <AlliedSeoLanding pageSlug="pharmacy-tech-us" />}</Route>
        <Route path="/pharmacy-tech-canada">{() => <AlliedSeoLanding pageSlug="pharmacy-tech-canada" />}</Route>
        <Route path="/rrt-us">{() => <AlliedSeoLanding pageSlug="rrt-us" />}</Route>
        <Route path="/rrt-canada">{() => <AlliedSeoLanding pageSlug="rrt-canada" />}</Route>
        <Route path="/medical-imaging/:country/physics/:topicSlug" component={ImagingPhysicsTopic} />
        <Route path="/medical-imaging/:country/physics" component={ImagingPhysicsListing} />
        <Route path="/medical-imaging/:country/flashcards" component={ImagingFlashcardsPage} />
        <Route path="/medical-imaging/:country/:pageType">{(params) => <ImagingSeoLanding />}</Route>
        <Route path="/imaging-us">{() => <AlliedSeoLanding pageSlug="imaging-us" />}</Route>
        <Route path="/imaging-canada">{() => <AlliedSeoLanding pageSlug="imaging-canada" />}</Route>
        <Route path="/paramedic-us">{() => <AlliedSeoLanding pageSlug="paramedic-us" />}</Route>
        <Route path="/paramedic-canada">{() => <AlliedSeoLanding pageSlug="paramedic-canada" />}</Route>
        <Route path="/mlt-us">{() => <AlliedSeoLanding pageSlug="mlt-us" />}</Route>
        <Route path="/mlt-canada">{() => <AlliedSeoLanding pageSlug="mlt-canada" />}</Route>
        <Route path="/dashboard/mlt/canada" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/usa" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/exam" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/flashcards" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/lessons" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/performance" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/wrong-answers" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt/study-plan" component={MltStudentDashboard} />
        <Route path="/dashboard/mlt" component={MltStudentDashboard} />
        <Route path="/mlt/canada/practice-questions">{() => <MltSEOPage country="canada" pageType="practice-questions" />}</Route>
        <Route path="/mlt/usa/practice-questions">{() => <MltSEOPage country="usa" pageType="practice-questions" />}</Route>
        <Route path="/mlt/exam-prep">{() => <MltSEOPage country="both" pageType="exam-prep" />}</Route>
        <Route path="/mlt/study-guide">{() => <MltSEOPage country="both" pageType="study-guide" />}</Route>
        <Route path="/mlt/mock-exam">{() => <MltSEOPage country="both" pageType="mock-exam" />}</Route>
        <Route path="/mlt/flashcard-prep">{() => <MltSEOPage country="both" pageType="flashcards" />}</Route>
        <Route path="/admin/mlt/images" component={MltImageLibrary} />
        <Route path="/mlt/image-drill" component={MltImageDrill} />
        <Route path="/careers/mlt/image-drill">{() => { window.location.replace("/mlt/image-drill"); return null; }}</Route>
        <Route path="/paramedic/pcp" component={ParamedicPCP} />
        <Route path="/paramedic/acp" component={ParamedicACP} />
        <Route path="/paramedic/nremt" component={ParamedicNREMT} />
        <Route path="/paramedic/lessons" component={ParamedicLessonsHub} />
        <Route path="/paramedic/exams" component={ParamedicExamsHub} />
        <Route path="/paramedic/flashcards" component={ParamedicFlashcardsHub} />
        <Route path="/paramedic/scenarios" component={ParamedicScenariosHub} />
        <Route path="/paramedic/exam-simulator/:sessionId" component={ParamedicExamSimulator} />
        <Route path="/paramedic/exam-results/:sessionId" component={ParamedicExamResults} />
        <Route path="/paramedic/exam-launcher" component={ParamedicExamLauncher} />
        <Route path="/paramedic/practice-exams" component={ParamedicPracticeExamsHub} />
        <Route path="/paramedic/ecg-library" component={ParamedicECGLibrary} />
        <Route path="/admin/paramedic-waveforms" component={ParamedicECGAdmin} />
        <Route path="/paramedic/questions/:topicSlug" component={ParamedicQuestionSeoPage} />
        <Route path="/paramedic/questions" component={ParamedicQuestionsIndex} />
        <Route path="/rrt/questions/:topicSlug">{() => <AlliedQuestionSeoPage professionKey="rrt" />}</Route>
        <Route path="/rrt/questions">{() => <AlliedQuestionsIndexPage professionKey="rrt" />}</Route>
        <Route path="/mlt/questions/:topicSlug">{() => <AlliedQuestionSeoPage professionKey="mlt" />}</Route>
        <Route path="/mlt/questions">{() => <AlliedQuestionsIndexPage professionKey="mlt" />}</Route>
        <Route path="/imaging/questions/:topicSlug">{() => <AlliedQuestionSeoPage professionKey="imaging" />}</Route>
        <Route path="/imaging/questions">{() => <AlliedQuestionsIndexPage professionKey="imaging" />}</Route>
        <Route path="/occupational-therapy/questions/:topicSlug">{() => <AlliedQuestionSeoPage professionKey="occupationalTherapy" />}</Route>
        <Route path="/occupational-therapy/questions">{() => <AlliedQuestionsIndexPage professionKey="occupationalTherapy" />}</Route>
        <Route path="/physical-therapy/questions/:topicSlug">{() => <AlliedQuestionSeoPage professionKey="physicalTherapy" />}</Route>
        <Route path="/physical-therapy/questions">{() => <AlliedQuestionsIndexPage professionKey="physicalTherapy" />}</Route>
        <Route path="/paramedic" component={ParamedicLanding} />
        <Route path="/mlt/exams" component={MltExamHub} />
        <Route path="/mlt/exam/canada_realistic" component={MltCanadaExam} />
        <Route path="/mlt/exam/usa_cat" component={MltUsaCatExam} />
        <Route path="/mlt/exam/adaptive_practice" component={MltAdaptivePractice} />
        <Route path="/mlt/exam/practice_exam" component={MltPracticeExam} />
        <Route path="/mlt/exam/results/:sessionId" component={MltExamResults} />
        <Route path="/mlt/exam/history" component={MltExamHistory} />
        <Route path="/mlt/admin/cat" component={MltAdminCat} />
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
        <Route path="/mlt" component={MltLanding} />
        <Route path="/rrt">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["rrt"]} />}</Route>
        <Route path="/imaging">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["imaging"]} />}</Route>
        <Route path="/social-work">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["social-work"]} />}</Route>
        <Route path="/psychotherapy">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["psychotherapy"]} />}</Route>
        <Route path="/addictions">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["addictions"]} />}</Route>
        <Route path="/occupational-therapy" component={OccupationalTherapyHub} />
        <Route path="/physical-therapy" component={PhysicalTherapyHub} />

        <Route path="/rrt/lessons">{() => <ProfessionClusterRedirect profession="rrt" clusterType="lessons" />}</Route>
        <Route path="/rrt/practice-questions">{() => <ProfessionClusterRedirect profession="rrt" clusterType="practice-questions" />}</Route>
        <Route path="/rrt/flashcards">{() => <ProfessionClusterRedirect profession="rrt" clusterType="flashcards" />}</Route>
        <Route path="/rrt/mock-exam">{() => <ProfessionClusterRedirect profession="rrt" clusterType="mock-exam" />}</Route>
        <Route path="/rrt/study-guide">{() => <ProfessionClusterRedirect profession="rrt" clusterType="study-guide" />}</Route>

        <Route path="/social-work/lessons">{() => <ProfessionClusterRedirect profession="social-work" clusterType="lessons" />}</Route>
        <Route path="/social-work/practice-questions">{() => <ProfessionClusterRedirect profession="social-work" clusterType="practice-questions" />}</Route>
        <Route path="/social-work/flashcards">{() => <ProfessionClusterRedirect profession="social-work" clusterType="flashcards" />}</Route>
        <Route path="/social-work/mock-exam">{() => <ProfessionClusterRedirect profession="social-work" clusterType="mock-exam" />}</Route>
        <Route path="/social-work/study-guide">{() => <ProfessionClusterRedirect profession="social-work" clusterType="study-guide" />}</Route>

        <Route path="/psychotherapy/lessons">{() => <ProfessionClusterRedirect profession="psychotherapy" clusterType="lessons" />}</Route>
        <Route path="/psychotherapy/practice-questions">{() => <ProfessionClusterRedirect profession="psychotherapy" clusterType="practice-questions" />}</Route>
        <Route path="/psychotherapy/flashcards">{() => <ProfessionClusterRedirect profession="psychotherapy" clusterType="flashcards" />}</Route>
        <Route path="/psychotherapy/mock-exam">{() => <ProfessionClusterRedirect profession="psychotherapy" clusterType="mock-exam" />}</Route>
        <Route path="/psychotherapy/study-guide">{() => <ProfessionClusterRedirect profession="psychotherapy" clusterType="study-guide" />}</Route>

        <Route path="/addictions/lessons">{() => <ProfessionClusterRedirect profession="addictions" clusterType="lessons" />}</Route>
        <Route path="/addictions/practice-questions">{() => <ProfessionClusterRedirect profession="addictions" clusterType="practice-questions" />}</Route>
        <Route path="/addictions/flashcards">{() => <ProfessionClusterRedirect profession="addictions" clusterType="flashcards" />}</Route>
        <Route path="/addictions/mock-exam">{() => <ProfessionClusterRedirect profession="addictions" clusterType="mock-exam" />}</Route>
        <Route path="/addictions/study-guide">{() => <ProfessionClusterRedirect profession="addictions" clusterType="study-guide" />}</Route>

        <Route path="/occupational-therapy/lessons">{() => <ProfessionClusterRedirect profession="occupational-therapy" clusterType="lessons" />}</Route>
        <Route path="/occupational-therapy/practice-questions">{() => <ProfessionClusterRedirect profession="occupational-therapy" clusterType="practice-questions" />}</Route>
        <Route path="/occupational-therapy/flashcards">{() => <ProfessionClusterRedirect profession="occupational-therapy" clusterType="flashcards" />}</Route>
        <Route path="/occupational-therapy/mock-exam">{() => <ProfessionClusterRedirect profession="occupational-therapy" clusterType="mock-exam" />}</Route>
        <Route path="/occupational-therapy/study-guide">{() => <ProfessionClusterRedirect profession="occupational-therapy" clusterType="study-guide" />}</Route>

        <Route path="/physical-therapy/lessons">{() => <ProfessionClusterRedirect profession="physical-therapy" clusterType="lessons" />}</Route>
        <Route path="/physical-therapy/practice-questions">{() => <ProfessionClusterRedirect profession="physical-therapy" clusterType="practice-questions" />}</Route>
        <Route path="/physical-therapy/flashcards">{() => <ProfessionClusterRedirect profession="physical-therapy" clusterType="flashcards" />}</Route>
        <Route path="/physical-therapy/mock-exam">{() => <ProfessionClusterRedirect profession="physical-therapy" clusterType="mock-exam" />}</Route>
        <Route path="/physical-therapy/study-guide">{() => <ProfessionClusterRedirect profession="physical-therapy" clusterType="study-guide" />}</Route>

        <Route path="/health-info-mgmt">{() => <ProfessionHubPage data={PROFESSION_HUB_DATA["health-info-mgmt"]} />}</Route>
        <Route path="/health-info-mgmt/lessons">{() => <ProfessionClusterRedirect profession="health-info-mgmt" clusterType="lessons" />}</Route>
        <Route path="/health-info-mgmt/practice-questions">{() => <ProfessionClusterRedirect profession="health-info-mgmt" clusterType="practice-questions" />}</Route>
        <Route path="/health-info-mgmt/flashcards">{() => <ProfessionClusterRedirect profession="health-info-mgmt" clusterType="flashcards" />}</Route>
        <Route path="/health-info-mgmt/mock-exam">{() => <ProfessionClusterRedirect profession="health-info-mgmt" clusterType="mock-exam" />}</Route>
        <Route path="/health-info-mgmt/study-guide">{() => <ProfessionClusterRedirect profession="health-info-mgmt" clusterType="study-guide" />}</Route>

        <Route path="/paramedic-exam-prep" component={ParamedicExamPrepLanding} />
        <Route path="/rrt-exam-prep" component={RrtExamPrepLanding} />
        <Route path="/mlt-exam-prep" component={MltExamPrepLanding} />
        <Route path="/radiography-exam-prep" component={RadiographyExamPrepLanding} />
        <Route path="/social-work-exam-prep" component={SocialWorkExamPrepLanding} />
        <Route path="/psychotherapy-exam-prep" component={PsychotherapyExamPrepLanding} />
        <Route path="/addictions-counselling-exam-prep" component={AddictionsCounsellingExamPrepLanding} />
        <Route path="/occupational-therapy-exam-prep" component={OccupationalTherapyExamPrepLanding} />
        <Route path="/physical-therapy-exam-prep" component={PhysicalTherapyExamPrepLanding} />

        <Route path="/occupational-therapy-practice-questions">{() => <AlliedSeoLanding pageSlug="occupational-therapy-practice-questions" />}</Route>
        <Route path="/occupational-therapy-study-guide">{() => <AlliedSeoLanding pageSlug="occupational-therapy-study-guide" />}</Route>
        <Route path="/physical-therapy-practice-questions">{() => <AlliedSeoLanding pageSlug="physical-therapy-practice-questions" />}</Route>
        <Route path="/physical-therapy-study-guide">{() => <AlliedSeoLanding pageSlug="physical-therapy-study-guide" />}</Route>

        <Route path="/social-worker-exam-prep">{() => <UnderservedSEOPage profession="social-worker" pageType="exam-prep" />}</Route>
        <Route path="/social-worker-career-guide">{() => <UnderservedSEOPage profession="social-worker" pageType="career-guide" />}</Route>
        <Route path="/social-worker-study-guide">{() => <UnderservedSEOPage profession="social-worker" pageType="study-guide" />}</Route>
        <Route path="/social-worker-practice-questions">{() => <UnderservedSEOPage profession="social-worker" pageType="practice-questions" />}</Route>
        <Route path="/psychotherapist-exam-prep">{() => <UnderservedSEOPage profession="psychotherapist" pageType="exam-prep" />}</Route>
        <Route path="/psychotherapist-career-guide">{() => <UnderservedSEOPage profession="psychotherapist" pageType="career-guide" />}</Route>
        <Route path="/psychotherapist-study-guide">{() => <UnderservedSEOPage profession="psychotherapist" pageType="study-guide" />}</Route>
        <Route path="/psychotherapist-practice-questions">{() => <UnderservedSEOPage profession="psychotherapist" pageType="practice-questions" />}</Route>
        <Route path="/addictions-counsellor-exam-prep">{() => <UnderservedSEOPage profession="addictions-counsellor" pageType="exam-prep" />}</Route>
        <Route path="/addictions-counsellor-career-guide">{() => <UnderservedSEOPage profession="addictions-counsellor" pageType="career-guide" />}</Route>
        <Route path="/addictions-counsellor-study-guide">{() => <UnderservedSEOPage profession="addictions-counsellor" pageType="study-guide" />}</Route>
        <Route path="/addictions-counsellor-practice-questions">{() => <UnderservedSEOPage profession="addictions-counsellor" pageType="practice-questions" />}</Route>
        <Route path="/occupational-therapy-career-guide">{() => <UnderservedSEOPage profession="occupational-therapy" pageType="career-guide" />}</Route>
        <Route path="/physical-therapy-career-guide">{() => <UnderservedSEOPage profession="physical-therapy" pageType="career-guide" />}</Route>
        <Route path="/occupational-therapist/test-bank" component={OTQuestionBankPage} />
        <Route path="/occupational-therapist/question-bank">{() => <Redirect to="/occupational-therapist/test-bank" />}</Route>
        <Route path="/occupational-therapist/mock-exams" component={OTMockExamsPage} />
        <Route path="/occupational-therapist/study-plan" component={OTStudyPlanPage} />
        <Route path="/:careerSlug/mock-exams" component={AlliedMockExams} />
        <Route path="/:careerSlug/dashboard" component={AlliedDashboard} />
        <Route path="/:careerSlug/study-plan" component={AlliedStudyPlan} />
        <Route path="/:careerSlug/flashcards" component={AlliedFlashcards} />
        <Route path="/:careerSlug/sims" component={AlliedSims} />
        <Route path="/:careerSlug/tools" component={AlliedTools} />

        <Route path="/paramedic/scenarios/:slug" component={ParamedicScenarioPlayer} />
        <Route path="/paramedic/scenarios" component={ParamedicScenariosHub} />
        <Route path="/careers/paramedic/scenarios/:slug">{(params) => { window.location.replace(`/paramedic/scenarios/${params.slug}`); return null; }}</Route>
        <Route path="/careers/paramedic/scenarios">{() => { window.location.replace("/paramedic/scenarios"); return null; }}</Route>

        <Route path="/careers/:careerSlug/mock-exams">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="mock-exams" />}</Route>
        <Route path="/careers/:careerSlug/dashboard">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="dashboard" />}</Route>
        <Route path="/careers/:careerSlug/study-plan">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="study-plan" />}</Route>
        <Route path="/careers/:careerSlug/flashcards">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="flashcards" />}</Route>
        <Route path="/careers/:careerSlug/sims">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="sims" />}</Route>
        <Route path="/careers/:careerSlug/tools">{(params) => <CareerRedirect careerSlug={params.careerSlug} subPath="tools" />}</Route>
        <Route path="/careers/:careerSlug">{(params) => <CareerRedirect careerSlug={params.careerSlug} />}</Route>

        {/* Career Guide Pages - "How to become a..." */}
        <Route path="/how-to-become-a-paramedic" component={CareerGuidePage} />
        <Route path="/how-to-become-a-respiratory-therapist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-medical-lab-technologist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-radiologic-technologist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-social-worker" component={CareerGuidePage} />
        <Route path="/how-to-become-a-psychotherapist" component={CareerGuidePage} />
        <Route path="/how-to-become-an-addictions-counselor" component={CareerGuidePage} />
        <Route path="/how-to-become-an-occupational-therapist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-physical-therapist" component={CareerGuidePage} />
        <Route path="/how-to-become-a-pharmacy-technician" component={CareerGuidePage} />
        <Route path="/how-to-become-a-health-information-manager" component={CareerGuidePage} />

        <Route path="/health-info-mgmt-exam-prep">{() => <AlliedSeoLanding pageSlug="health-info-mgmt-exam-prep" />}</Route>
        <Route path="/health-info-mgmt-practice-questions">{() => <AlliedSeoLanding pageSlug="health-info-mgmt-practice-questions" />}</Route>
        <Route path="/health-info-mgmt-study-guide">{() => <AlliedSeoLanding pageSlug="health-info-mgmt-study-guide" />}</Route>
        <Route path="/health-info-mgmt-career-guide">{() => <UnderservedSEOPage profession="health-info-mgmt" pageType="career-guide" />}</Route>

        <Route path="/health-info-mgmt-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="health-info-mgmt" />}</Route>
        <Route path="/health-info-mgmt-encyclopedia">{() => <EncyclopediaHubPage profession="health-info-mgmt" />}</Route>

        <Route path="/respiratory-therapy">{() => { window.location.replace("/rrt"); return null; }}</Route>
        <Route path="/medical-lab-tech">{() => { window.location.replace("/mlt"); return null; }}</Route>
        <Route path="/pharmacy-tech">{() => { window.location.replace("/pharmacy-technician"); return null; }}</Route>

        <Route path="/allied-health/:professionSlug/:articleSlug" component={AlliedHealthArticlePage} />
        <Route path="/allied-health/:professionSlug" component={AlliedHealthProfessionPage} />
        <Route path="/allied-health" component={AlliedHealthHub} />
        <Route path="/admin/allied-health-seo" component={AdminAlliedHealthSEO} />
        <Route path="/admin/encyclopedia" component={EncyclopediaAdmin} />
        <Route path="/paramedic-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="paramedic" />}</Route>
        <Route path="/paramedic-encyclopedia">{() => <EncyclopediaHubPage profession="paramedic" />}</Route>
        <Route path="/respiratory-therapy-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="respiratory-therapy" />}</Route>
        <Route path="/respiratory-therapy-encyclopedia">{() => <EncyclopediaHubPage profession="respiratory-therapy" />}</Route>
        <Route path="/mlt-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="mlt" />}</Route>
        <Route path="/mlt-encyclopedia">{() => <EncyclopediaHubPage profession="mlt" />}</Route>
        <Route path="/imaging-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="imaging" />}</Route>
        <Route path="/imaging-encyclopedia">{() => <EncyclopediaHubPage profession="imaging" />}</Route>
        <Route path="/social-work-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="social-work" />}</Route>
        <Route path="/social-work-encyclopedia">{() => <EncyclopediaHubPage profession="social-work" />}</Route>
        <Route path="/psychotherapy-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="psychotherapy" />}</Route>
        <Route path="/psychotherapy-encyclopedia">{() => <EncyclopediaHubPage profession="psychotherapy" />}</Route>
        <Route path="/addictions-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="addictions" />}</Route>
        <Route path="/addictions-encyclopedia">{() => <EncyclopediaHubPage profession="addictions" />}</Route>
        <Route path="/occupational-therapy-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="occupational-therapy" />}</Route>
        <Route path="/occupational-therapy-encyclopedia">{() => <EncyclopediaHubPage profession="occupational-therapy" />}</Route>
        <Route path="/physical-therapy-encyclopedia/:slug">{() => <EncyclopediaTopicPage profession="physical-therapy" />}</Route>
        <Route path="/physical-therapy-encyclopedia">{() => <EncyclopediaHubPage profession="physical-therapy" />}</Route>

        <Route path="/allied-health/:professionSlug/articles" component={ArticleListingPage} />
        <Route path="/allied-health/:professionSlug/:articleSlug" component={ArticleDetailPage} />

        <Route path="/:careerSlug/study-guide/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/exam-tips/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/clinical-scenarios/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/practice-questions/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/question-detail/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>
        <Route path="/:careerSlug/flashcard-detail/:topicSlug">{() => <ProgrammaticSeoPage />}</Route>

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
