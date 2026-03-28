/**
 * English-only labels for the authenticated learner shell (/app/*).
 * Not wired to marketing locale overlays yet (student routes are not prefixed by /[locale]).
 * Centralized here so audits and future i18n can target one module.
 */
export const LEARNER_SHELL_COPY = {
  navAriaLabel: "App",
  dashboard: "Dashboard",
  lessons: "Lessons",
  questionBank: "Question Bank",
  practiceExams: "Practice Exams",
  logout: "Logout",
} as const;
