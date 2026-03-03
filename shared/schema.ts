import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean, doublePrecision, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  tier: text("tier").default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  region: text("region").default("US"),
  flashcardLimit: integer("flashcard_limit").default(300),
  planExpiresAt: timestamp("plan_expires_at"),
  careerType: text("career_type").default("nursing"),
});

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  content: text("content").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testResults = pgTable("test_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  testType: text("test_type").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: jsonb("answers"),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  completed: text("completed").default("false"),
  preTestScore: integer("pre_test_score"),
  postTestScore: integer("post_test_score"),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  updatedAt: true,
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  completedAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export const contentItems = pgTable("content_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull().default("lesson"),
  category: text("category"),
  bodySystem: text("body_system"),
  tier: text("tier").default("free"),
  status: text("status").default("draft"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  summary: text("summary"),
  content: jsonb("content").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  primaryKeyword: text("primary_keyword"),
  secondaryKeywords: text("secondary_keywords").array().default(sql`'{}'::text[]`),
  scheduledAt: timestamp("scheduled_at"),
  clinicalSafetyReview: boolean("clinical_safety_review").default(false),
  autoPublish: boolean("auto_publish").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id"),
  authorName: text("author_name"),
  regionScope: text("region_scope").default("BOTH"),
  versionKey: text("version_key"),
  updatedByAi: boolean("updated_by_ai").default(false),
  protectedFields: text("protected_fields").array().default(sql`'{}'::text[]`),
});

export const insertContentItemSchema = createInsertSchema(contentItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;

export const userFlashcards = pgTable("user_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").default("My Cards"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserFlashcardSchema = createInsertSchema(userFlashcards).omit({
  id: true,
  createdAt: true,
});

export type UserFlashcard = typeof userFlashcards.$inferSelect;
export type InsertUserFlashcard = z.infer<typeof insertUserFlashcardSchema>;

export const blogConfig = pgTable("blog_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  citationStyle: text("citation_style").default("apa7"),
  postsPerDay: integer("posts_per_day").default(2),
  dayCount: integer("day_count").default(0),
  totalPostsGenerated: integer("total_posts_generated").default(0),
  isActive: boolean("is_active").default(false),
  lastPostAt: timestamp("last_post_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BlogConfig = typeof blogConfig.$inferSelect;

export const featureUsage = pgTable("feature_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  feature: text("feature").notNull(),
  usageDate: text("usage_date").notNull(),
  count: integer("count").notNull().default(0),
});

export type FeatureUsage = typeof featureUsage.$inferSelect;

export const mockExamAttempts = pgTable("mock_exam_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tier: text("tier").notNull().default("rpn"),
  totalQuestions: integer("total_questions").notNull(),
  status: text("status").notNull().default("in_progress"),
  score: integer("score"),
  timeSpent: integer("time_spent"),
  questions: jsonb("questions").default(sql`'[]'::jsonb`),
  answers: jsonb("answers").default(sql`'{}'::jsonb`),
  flagged: jsonb("flagged").default(sql`'[]'::jsonb`),
  report: jsonb("report").default(sql`'{}'::jsonb`),
  careerType: text("career_type").default("nursing"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertMockExamAttemptSchema = createInsertSchema(mockExamAttempts).omit({
  id: true,
  startedAt: true,
});

export type MockExamAttempt = typeof mockExamAttempts.$inferSelect;
export type InsertMockExamAttempt = z.infer<typeof insertMockExamAttemptSchema>;

export const lessonOverrides = pgTable("lesson_overrides", {
  lessonId: text("lesson_id").primaryKey(),
  overrides: jsonb("overrides").default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type LessonOverride = typeof lessonOverrides.$inferSelect;

export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: varchar("user_id"),
  page: text("page").notNull(),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  deviceType: text("device_type"),
  browser: text("browser"),
  os: text("os"),
  country: text("country"),
  duration: integer("duration").default(0),
  isCheckoutIntent: boolean("is_checkout_intent").default(false),
  isPricingView: boolean("is_pricing_view").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  createdAt: true,
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;

export const userFeedback = pgTable("user_feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  username: text("username"),
  email: text("email"),
  type: text("type").notNull().default("feedback"),
  category: text("category").default("general"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("new"),
  priority: text("priority").default("medium"),
  adminNotes: text("admin_notes"),
  upvotes: integer("upvotes").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UserFeedback = typeof userFeedback.$inferSelect;
export type InsertUserFeedback = z.infer<typeof insertUserFeedbackSchema>;

export const qotdHistory = pgTable("qotd_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionDate: text("question_date").notNull().unique(),
  tier: text("tier").notNull().default("rpn"),
  questionText: text("question_text").notNull(),
  options: jsonb("options").default(sql`'[]'::jsonb`),
  correctIndex: integer("correct_index").notNull(),
  rationale: text("rationale").notNull(),
  bodySystem: text("body_system"),
  lessonId: text("lesson_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type QotdHistory = typeof qotdHistory.$inferSelect;

export const emailSubscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  tier: text("tier").default("general"),
  source: text("source").default("qotd"),
  verified: boolean("verified").default(false),
  frequency: text("frequency").default("weekly"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmailSubscriberSchema = createInsertSchema(emailSubscribers).omit({
  id: true,
  createdAt: true,
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = z.infer<typeof insertEmailSubscriberSchema>;

export const socialPosts = pgTable("social_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  postType: text("post_type").default("qotd"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  hashtags: text("hashtags").array().default(sql`'{}'::text[]`),
  status: text("status").default("scheduled"),
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  platformPostId: text("platform_post_id"),
  engagementData: jsonb("engagement_data").default(sql`'{}'::jsonb`),
  tier: text("tier").default("rpn"),
  questionData: jsonb("question_data").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSocialPostSchema = createInsertSchema(socialPosts).omit({
  id: true,
  createdAt: true,
});

export type SocialPost = typeof socialPosts.$inferSelect;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;

export const dashboardWidgets = pgTable("dashboard_widgets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  widgetType: text("widget_type").notNull(),
  position: integer("position").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  config: jsonb("config").default(sql`'{}'::jsonb`),
});

export const insertDashboardWidgetSchema = createInsertSchema(dashboardWidgets).omit({
  id: true,
});

export type DashboardWidget = typeof dashboardWidgets.$inferSelect;
export type InsertDashboardWidget = z.infer<typeof insertDashboardWidgetSchema>;

export const lessonImages = pgTable("lesson_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: text("lesson_id").notNull(),
  objectPath: text("object_path").notNull(),
  fileName: text("file_name").notNull(),
  section: text("section").default("general"),
  caption: text("caption"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLessonImageSchema = createInsertSchema(lessonImages).omit({
  id: true,
  createdAt: true,
});

export type LessonImage = typeof lessonImages.$inferSelect;
export type InsertLessonImage = z.infer<typeof insertLessonImageSchema>;

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  actorId: varchar("actor_id"),
  actorUsername: text("actor_username"),
  entityType: text("entity_type").notNull(),
  entityId: varchar("entity_id"),
  action: text("action").notNull(),
  beforeJson: jsonb("before_json"),
  afterJson: jsonb("after_json"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  createdAt: true,
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;

export const contentRevisions = pgTable("content_revisions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentId: varchar("content_id").notNull(),
  revisionNumber: integer("revision_number").notNull().default(1),
  title: text("title"),
  content: jsonb("content"),
  status: text("status"),
  editedBy: varchar("edited_by"),
  editedByUsername: text("edited_by_username"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContentRevisionSchema = createInsertSchema(contentRevisions).omit({
  id: true,
  createdAt: true,
});

export type ContentRevision = typeof contentRevisions.$inferSelect;
export type InsertContentRevision = z.infer<typeof insertContentRevisionSchema>;

export const flashcardDecks = pgTable("flashcard_decks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id").notNull(),
  title: text("title").notNull(),
  description: text("description").default(""),
  tags: jsonb("tags").default(sql`'[]'::jsonb`),
  tier: text("tier").default("free"),
  visibility: text("visibility").default("private"),
  slug: text("slug"),
  careerType: text("career_type").default("nursing"),
  isUpgraded: boolean("is_upgraded").default(false),
  upgradedAt: timestamp("upgraded_at"),
  upgradedLimit: integer("upgraded_limit").default(300),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  cardCount: integer("card_count").default(0),
  viewCount: integer("view_count").default(0),
  saveCount: integer("save_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFlashcardDeckSchema = createInsertSchema(flashcardDecks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  cardCount: true,
  viewCount: true,
  saveCount: true,
});

export type FlashcardDeck = typeof flashcardDecks.$inferSelect;
export type InsertFlashcardDeck = z.infer<typeof insertFlashcardDeckSchema>;

export const deckFlashcards = pgTable("deck_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deckId: varchar("deck_id").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  rationale: text("rationale"),
  tags: jsonb("tags").default(sql`'[]'::jsonb`),
  difficulty: text("difficulty").default("medium"),
  aiCheckStatus: text("ai_check_status").default("unknown"),
  aiCheckSummary: text("ai_check_summary"),
  aiCheckConfidence: integer("ai_check_confidence"),
  userOverride: boolean("user_override").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDeckFlashcardSchema = createInsertSchema(deckFlashcards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type DeckFlashcard = typeof deckFlashcards.$inferSelect;
export type InsertDeckFlashcard = z.infer<typeof insertDeckFlashcardSchema>;

export const studySessions = pgTable("study_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  deckId: varchar("deck_id").notNull(),
  mode: text("mode").notNull().default("learn"),
  totalCards: integer("total_cards").default(0),
  correctCount: integer("correct_count").default(0),
  incorrectCount: integer("incorrect_count").default(0),
  timeSeconds: integer("time_seconds"),
  missedCardIds: jsonb("missed_card_ids").default(sql`'[]'::jsonb`),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
});

export const insertStudySessionSchema = createInsertSchema(studySessions).omit({
  id: true,
  startedAt: true,
});

export type StudySession = typeof studySessions.$inferSelect;
export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;

export const deckReports = pgTable("deck_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reporterId: varchar("reporter_id").notNull(),
  targetType: text("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDeckReportSchema = createInsertSchema(deckReports).omit({
  id: true,
  createdAt: true,
});

export type DeckReport = typeof deckReports.$inferSelect;
export type InsertDeckReport = z.infer<typeof insertDeckReportSchema>;

export const savedDecks = pgTable("saved_decks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  deckId: varchar("deck_id").notNull(),
  savedAt: timestamp("saved_at").defaultNow().notNull(),
});

export const socialConnections = pgTable("social_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  facebookPageId: text("facebook_page_id"),
  facebookPageName: text("facebook_page_name"),
  facebookPageToken: text("facebook_page_token"),
  instagramBusinessId: text("instagram_business_id"),
  instagramUsername: text("instagram_username"),
  tokenExpiresAt: timestamp("token_expires_at"),
  connectedAt: timestamp("connected_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteImages = pgTable("site_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageKey: text("image_key").notNull().unique(),
  url: text("url").notNull(),
  alt: text("alt"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSiteImageSchema = createInsertSchema(siteImages).omit({
  id: true,
  updatedAt: true,
});
export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = z.infer<typeof insertSiteImageSchema>;

export const customPageModules = pgTable("custom_page_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  page: text("page").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon").default("BookOpen"),
  color: text("color").default("text-primary"),
  bgColor: text("bg_color").default("bg-primary/10"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0),
  lessons: jsonb("lessons").default(sql`'[]'::jsonb`),
  tier: text("tier"),
  status: text("status").default("active"),
  content: jsonb("content").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCustomPageModuleSchema = createInsertSchema(customPageModules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CustomPageModule = typeof customPageModules.$inferSelect;
export type InsertCustomPageModule = z.infer<typeof insertCustomPageModuleSchema>;

export const audioClips = pgTable("audio_clips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  conditionTag: text("condition_tag"),
  descriptionShort: text("description_short"),
  bodySite: text("body_site"),
  audioUrlOriginal: text("audio_url_original"),
  audioUrlStream: text("audio_url_stream"),
  durationSeconds: integer("duration_seconds"),
  licenseType: text("license_type").notNull(),
  attributionText: text("attribution_text"),
  sourceUrl: text("source_url"),
  creatorName: text("creator_name"),
  proofOfLicenseUrl: text("proof_of_license_url"),
  isDerivative: boolean("is_derivative").default(false),
  isPublished: boolean("is_published").default(false),
  createdByAdminId: varchar("created_by_admin_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAudioClipSchema = createInsertSchema(audioClips).omit({
  id: true,
  createdAt: true,
});

export type AudioClip = typeof audioClips.$inferSelect;
export type InsertAudioClip = z.infer<typeof insertAudioClipSchema>;

export const lessonAudioLinks = pgTable("lesson_audio_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: text("lesson_id").notNull(),
  audioClipId: varchar("audio_clip_id").notNull(),
  displayOrder: integer("display_order").default(0),
  quizPrompt: text("quiz_prompt"),
  answerKey: text("answer_key"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLessonAudioLinkSchema = createInsertSchema(lessonAudioLinks).omit({
  id: true,
  createdAt: true,
});

export type LessonAudioLink = typeof lessonAudioLinks.$inferSelect;
export type InsertLessonAudioLink = z.infer<typeof insertLessonAudioLinkSchema>;

export const examQuestions = pgTable("exam_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: text("tier").notNull(),
  exam: text("exam").notNull(),
  questionType: text("question_type").notNull(),
  status: text("status").default("draft"),
  publishAt: timestamp("publish_at"),
  stem: text("stem").notNull(),
  options: jsonb("options").default(sql`'[]'::jsonb`),
  correctAnswer: jsonb("correct_answer").default(sql`'[]'::jsonb`),
  rationale: text("rationale"),
  difficulty: integer("difficulty").default(3),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  bodySystem: text("body_system"),
  topic: text("topic"),
  subtopic: text("subtopic"),
  caseId: varchar("case_id"),
  exhibitData: jsonb("exhibit_data"),
  regionScope: text("region_scope").default("BOTH"),
  stemHash: text("stem_hash"),
  careerType: text("career_type").default("nursing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertExamQuestionSchema = createInsertSchema(examQuestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = z.infer<typeof insertExamQuestionSchema>;

export const questionTypeRegistry = pgTable("question_type_registry", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  exam: text("exam").notNull(),
  questionType: text("question_type").notNull(),
  displayName: text("display_name").notNull(),
  isEnabled: boolean("is_enabled").default(true),
  defaultTargetCount: integer("default_target_count").default(100),
  validationRules: jsonb("validation_rules").default(sql`'{}'::jsonb`),
  weightPercent: integer("weight_percent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuestionTypeRegistrySchema = createInsertSchema(questionTypeRegistry).omit({
  id: true,
  createdAt: true,
});

export type QuestionTypeRegistryEntry = typeof questionTypeRegistry.$inferSelect;
export type InsertQuestionTypeRegistryEntry = z.infer<typeof insertQuestionTypeRegistrySchema>;

export const questionScheduleLog = pgTable("question_schedule_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull(),
  action: text("action").notNull(),
  previousStatus: text("previous_status"),
  newStatus: text("new_status"),
  actorId: varchar("actor_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type QuestionScheduleLog = typeof questionScheduleLog.$inferSelect;

export const userPerformanceSummary = pgTable("user_performance_summary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  readinessScore: integer("readiness_score").default(0),
  projectedPassProbability: integer("projected_pass_probability").default(0),
  weaknessVector: jsonb("weakness_vector").default(sql`'{}'::jsonb`),
  strengthsVector: jsonb("strengths_vector").default(sql`'{}'::jsonb`),
  topWeakDomains: jsonb("top_weak_domains").default(sql`'[]'::jsonb`),
  topWeakQuestionTypes: jsonb("top_weak_question_types").default(sql`'[]'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserPerformanceSummary = typeof userPerformanceSummary.$inferSelect;

export const recommendationLog = pgTable("recommendation_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  sessionType: text("session_type"),
  sessionId: varchar("session_id"),
  recommendedCourses: jsonb("recommended_courses").default(sql`'[]'::jsonb`),
  weaknessSnapshot: jsonb("weakness_snapshot").default(sql`'{}'::jsonb`),
  clicked: boolean("clicked").default(false),
  addedToPlan: boolean("added_to_plan").default(false),
  completed: boolean("completed").default(false),
  performanceChangeAfter: jsonb("performance_change_after"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RecommendationLog = typeof recommendationLog.$inferSelect;

export const userExamProfile = pgTable("user_exam_profile", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  examType: text("exam_type").notNull(),
  examDate: timestamp("exam_date"),
  hoursPerDay: integer("hours_per_day").default(2),
  daysPerWeek: integer("days_per_week").default(5),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserExamProfile = typeof userExamProfile.$inferSelect;

export const studyPlanSchedule = pgTable("study_plan_schedule", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  phase: text("phase"),
  tasks: jsonb("tasks").default(sql`'[]'::jsonb`),
  completed: boolean("completed").default(false),
  completionRate: integer("completion_rate").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type StudyPlanSchedule = typeof studyPlanSchedule.$inferSelect;

export const diagnosticAttempts = pgTable("diagnostic_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  sessionId: text("session_id"),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: jsonb("answers").default(sql`'[]'::jsonb`),
  topicBreakdown: jsonb("topic_breakdown").default(sql`'{}'::jsonb`),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type DiagnosticAttempt = typeof diagnosticAttempts.$inferSelect;

export const examBlueprints = pgTable("exam_blueprints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  examCode: text("exam_code").notNull().unique(),
  examName: text("exam_name").notNull(),
  tier: text("tier").notNull(),
  region: text("region").default("ALL"),
  totalQuestions: integer("total_questions").notNull(),
  passingStandard: text("passing_standard").notNull(),
  timeLimit: integer("time_limit").notNull(),
  domains: jsonb("domains").notNull().default(sql`'[]'::jsonb`),
  questionTypeWeights: jsonb("question_type_weights").default(sql`'{}'::jsonb`),
  catEnabled: boolean("cat_enabled").default(false),
  catMinQuestions: integer("cat_min_questions"),
  catMaxQuestions: integer("cat_max_questions"),
  active: boolean("active").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertExamBlueprintSchema = createInsertSchema(examBlueprints).omit({ id: true, updatedAt: true });
export type InsertExamBlueprint = z.infer<typeof insertExamBlueprintSchema>;
export type ExamBlueprint = typeof examBlueprints.$inferSelect;

export const upgradeFunnelEvents = pgTable("upgrade_funnel_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  eventType: text("event_type").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UpgradeFunnelEvent = typeof upgradeFunnelEvents.$inferSelect;

export const seoPages = pgTable("seo_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageType: text("page_type").notNull(),
  exam: text("exam"),
  languageCode: text("language_code").notNull().default("en"),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  contentHtml: text("content_html"),
  tocJson: jsonb("toc_json"),
  faqJson: jsonb("faq_json"),
  internalLinksJson: jsonb("internal_links_json"),
  isPublic: boolean("is_public").default(true),
  isIndexable: boolean("is_indexable").default(true),
  canonicalUrl: text("canonical_url"),
  translationStatus: text("translation_status").default("en_source"),
  pageGroupId: varchar("page_group_id"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export type SeoPage = typeof seoPages.$inferSelect;
export const insertSeoPageSchema = createInsertSchema(seoPages).omit({ id: true, lastUpdated: true });
export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;

export const contentTranslations = pgTable("content_translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentType: text("content_type").notNull(),
  contentId: text("content_id").notNull(),
  languageCode: text("language_code").notNull(),
  fieldName: text("field_name").notNull(),
  translatedText: text("translated_text").notNull(),
  translationStatus: text("translation_status").default("auto"),
  sourceHash: text("source_hash"),
  sourceLastUpdatedReference: timestamp("source_last_updated_reference"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("content_translations_unique_idx").on(table.contentType, table.contentId, table.fieldName, table.languageCode),
]);

export type ContentTranslation = typeof contentTranslations.$inferSelect;
export const insertContentTranslationSchema = createInsertSchema(contentTranslations).omit({ id: true, lastUpdated: true });
export type InsertContentTranslation = z.infer<typeof insertContentTranslationSchema>;

export const seoKeywordTargets = pgTable("seo_keyword_targets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  languageCode: text("language_code").notNull(),
  keyword: text("keyword").notNull(),
  intent: text("intent").default("informational"),
  pageTargetSlug: text("page_target_slug"),
  searchVolume: integer("search_volume"),
  difficulty: integer("difficulty"),
  coverageStatus: text("coverage_status").default("unmapped"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SeoKeywordTarget = typeof seoKeywordTargets.$inferSelect;
export const insertSeoKeywordTargetSchema = createInsertSchema(seoKeywordTargets).omit({ id: true, createdAt: true });
export type InsertSeoKeywordTarget = z.infer<typeof insertSeoKeywordTargetSchema>;

export const translationJobs = pgTable("translation_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentType: text("content_type").notNull(),
  contentId: text("content_id").notNull(),
  targetLanguage: text("target_language").notNull(),
  fieldsToTranslate: jsonb("fields_to_translate").notNull().default(sql`'[]'::jsonb`),
  status: text("status").default("pending"),
  progress: integer("progress").default(0),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type TranslationJob = typeof translationJobs.$inferSelect;
export const insertTranslationJobSchema = createInsertSchema(translationJobs).omit({ id: true, createdAt: true, completedAt: true });
export type InsertTranslationJob = z.infer<typeof insertTranslationJobSchema>;

export const languagePriority = pgTable("language_priority", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  languageCode: text("language_code").notNull().unique(),
  languageName: text("language_name").notNull(),
  nursingPopulation: integer("nursing_population").default(3),
  immigrationPatterns: integer("immigration_patterns").default(3),
  searchDemand: integer("search_demand").default(3),
  competitionStrength: integer("competition_strength").default(3),
  monetizationPotential: integer("monetization_potential").default(3),
  productionDifficulty: integer("production_difficulty").default(3),
  roiScore: doublePrecision("roi_score").default(0),
  tier: text("tier").default("tier_3"),
  rolloutMonth: integer("rollout_month"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type LanguagePriority = typeof languagePriority.$inferSelect;
export const insertLanguagePrioritySchema = createInsertSchema(languagePriority).omit({ id: true, updatedAt: true });
export type InsertLanguagePriority = z.infer<typeof insertLanguagePrioritySchema>;

export const contentIntelligenceReports = pgTable("content_intelligence_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reportType: text("report_type").notNull(),
  reportData: jsonb("report_data").notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ContentIntelligenceReport = typeof contentIntelligenceReports.$inferSelect;

export const seoHealthChecks = pgTable("seo_health_checks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  checkType: text("check_type").notNull(),
  severity: text("severity").default("warning"),
  pageSlug: text("page_slug"),
  languageCode: text("language_code"),
  details: text("details").notNull(),
  resolved: boolean("resolved").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SeoHealthCheck = typeof seoHealthChecks.$inferSelect;

export const userAbilitySessions = pgTable("user_ability_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  sessionId: varchar("session_id").notNull(),
  finalAbility: doublePrecision("final_ability").default(0),
  confidenceInterval: doublePrecision("confidence_interval"),
  stabilityIndex: doublePrecision("stability_index"),
  earlyStop: boolean("early_stop").default(false),
  questionCount: integer("question_count").default(0),
  abilityTrajectory: jsonb("ability_trajectory").default(sql`'[]'::jsonb`),
  antiGamingFlags: jsonb("anti_gaming_flags").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UserAbilitySession = typeof userAbilitySessions.$inferSelect;
export const insertUserAbilitySessionSchema = createInsertSchema(userAbilitySessions).omit({ id: true, createdAt: true });
export type InsertUserAbilitySession = z.infer<typeof insertUserAbilitySessionSchema>;

export const difficultyAdjustmentLog = pgTable("difficulty_adjustment_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  difficultyLevel: integer("difficulty_level").notNull(),
  oldScaling: doublePrecision("old_scaling").notNull(),
  newScaling: doublePrecision("new_scaling").notNull(),
  actualPercent: doublePrecision("actual_percent"),
  expectedRange: text("expected_range"),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DifficultyAdjustmentLog = typeof difficultyAdjustmentLog.$inferSelect;

export const contentRoiScores = pgTable("content_roi_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  proposedTitle: text("proposed_title").notNull(),
  languageCode: text("language_code").notNull().default("en"),
  examCode: text("exam_code"),
  contentType: text("content_type").notNull(),
  primaryKeyword: text("primary_keyword"),
  secondaryKeywords: jsonb("secondary_keywords").default(sql`'[]'::jsonb`),
  blueprintCategory: text("blueprint_category"),
  seoDemandScore: integer("seo_demand_score").default(0),
  blueprintStrategicScore: integer("blueprint_strategic_score").default(0),
  conversionPotentialScore: integer("conversion_potential_score").default(0),
  authorityMultiplierScore: integer("authority_multiplier_score").default(0),
  monetizationFitScore: integer("monetization_fit_score").default(0),
  roiScore: doublePrecision("roi_score").default(0),
  priorityTier: text("priority_tier").default("deprioritize"),
  similarityFlag: boolean("similarity_flag").default(false),
  similarPageSlug: text("similar_page_slug"),
  pipelineStatus: text("pipeline_status").default("idea"),
  projectedMonthlyTraffic: integer("projected_monthly_traffic"),
  projectedDiagnosticStarts: integer("projected_diagnostic_starts"),
  projectedRevenue: doublePrecision("projected_revenue"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ContentRoiScore = typeof contentRoiScores.$inferSelect;
export const insertContentRoiScoreSchema = createInsertSchema(contentRoiScores).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertContentRoiScore = z.infer<typeof insertContentRoiScoreSchema>;

export const aiUsageBudget = pgTable("ai_usage_budget", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  monthYear: text("month_year").notNull(),
  tokensUsed: integer("tokens_used").default(0),
  tokenBudget: integer("token_budget").default(500000),
  requestCount: integer("request_count").default(0),
  lastRequestAt: timestamp("last_request_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AiUsageBudget = typeof aiUsageBudget.$inferSelect;

export const userFunnelEvents = pgTable("user_funnel_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  languageCode: text("language_code").default("en"),
  eventName: text("event_name").notNull(),
  eventValue: jsonb("event_value"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UserFunnelEvent = typeof userFunnelEvents.$inferSelect;

export const userRevenueProfile = pgTable("user_revenue_profile", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  languageCode: text("language_code").default("en"),
  segment: text("segment").default("content_explorer"),
  propensityScore: doublePrecision("propensity_score").default(0),
  priceSensitivityScore: doublePrecision("price_sensitivity_score").default(0),
  timeToExamDays: integer("time_to_exam_days"),
  lastOfferShown: text("last_offer_shown"),
  lastOfferResult: text("last_offer_result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserRevenueProfile = typeof userRevenueProfile.$inferSelect;

export const pricingOffers = pgTable("pricing_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  offerType: text("offer_type").notNull(),
  tier: text("tier").notNull(),
  price: doublePrecision("price").notNull(),
  currency: text("currency").default("USD"),
  durationDays: integer("duration_days"),
  discountPercent: integer("discount_percent").default(0),
  eligibilityRules: jsonb("eligibility_rules").default(sql`'{}'::jsonb`),
  localizedCopy: jsonb("localized_copy").default(sql`'{}'::jsonb`),
  enabled: boolean("enabled").default(true),
  careerType: text("career_type").default("nursing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PricingOffer = typeof pricingOffers.$inferSelect;

export const abTests = pgTable("ab_tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  variantsJson: jsonb("variants_json").notNull().default(sql`'[]'::jsonb`),
  allocation: doublePrecision("allocation").default(0.5),
  enabled: boolean("enabled").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AbTest = typeof abTests.$inferSelect;

export const studyPacks = pgTable("study_packs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  packType: text("pack_type").notNull(),
  examCode: text("exam_code"),
  tier: text("tier").default("rn"),
  description: text("description"),
  contentHtml: text("content_html"),
  price: doublePrecision("price").notNull(),
  currency: text("currency").default("USD"),
  questionCount: integer("question_count").default(0),
  questionTags: jsonb("question_tags").default(sql`'[]'::jsonb`),
  difficultyRange: text("difficulty_range"),
  languageCode: text("language_code").default("en"),
  faqJson: jsonb("faq_json").default(sql`'[]'::jsonb`),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(false),
  stripePriceId: text("stripe_price_id"),
  purchaseCount: integer("purchase_count").default(0),
  careerType: text("career_type").default("nursing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type StudyPack = typeof studyPacks.$inferSelect;
export const insertStudyPackSchema = createInsertSchema(studyPacks).omit({ id: true, createdAt: true, updatedAt: true, purchaseCount: true });
export type InsertStudyPack = z.infer<typeof insertStudyPackSchema>;

export const studyPackPurchases = pgTable("study_pack_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  packId: varchar("pack_id").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").default("USD"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type StudyPackPurchase = typeof studyPackPurchases.$inferSelect;

export const flashcardBank = pgTable("flashcard_bank", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: text("tier").notNull(),
  topicTag: text("topic_tag"),
  careerType: text("career_type").default("nursing"),
  front: text("front").notNull(),
  back: text("back").notNull(),
  tagsJson: jsonb("tags_json").default(sql`'[]'::jsonb`),
  referencesJson: jsonb("references_json").default(sql`'[]'::jsonb`),
  status: text("status").default("draft").notNull(),
  contentHash: text("content_hash").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFlashcardBankSchema = createInsertSchema(flashcardBank).omit({ id: true, createdAt: true });
export type InsertFlashcardBank = z.infer<typeof insertFlashcardBankSchema>;
export type FlashcardBank = typeof flashcardBank.$inferSelect;

export const generationJobs = pgTable("generation_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  runDate: text("run_date").notNull(),
  contentType: text("content_type").notNull(),
  tier: text("tier").notNull(),
  targetCount: integer("target_count").notNull(),
  generatedCount: integer("generated_count").default(0),
  mode: text("mode").notNull(),
  topicPlanJson: jsonb("topic_plan_json").default(sql`'[]'::jsonb`),
  status: text("status").default("queued").notNull(),
  costEstimateJson: jsonb("cost_estimate_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertGenerationJobSchema = createInsertSchema(generationJobs).omit({ id: true, createdAt: true, completedAt: true });
export type InsertGenerationJob = z.infer<typeof insertGenerationJobSchema>;
export type GenerationJob = typeof generationJobs.$inferSelect;

export const verificationReports = pgTable("verification_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityType: text("entity_type").notNull(),
  entityId: varchar("entity_id").notNull(),
  verdict: text("verdict").notNull(),
  confidenceScore: doublePrecision("confidence_score"),
  issuesJson: jsonb("issues_json").default(sql`'[]'::jsonb`),
  citationsJson: jsonb("citations_json").default(sql`'[]'::jsonb`),
  checkedAt: timestamp("checked_at").defaultNow().notNull(),
  modelVersion: text("model_version"),
});

export const insertVerificationReportSchema = createInsertSchema(verificationReports).omit({ id: true, checkedAt: true });
export type InsertVerificationReport = z.infer<typeof insertVerificationReportSchema>;
export type VerificationReport = typeof verificationReports.$inferSelect;

export const aiCache = pgTable("ai_cache", {
  cacheKey: text("cache_key").primaryKey(),
  outputJson: jsonb("output_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const digitalProducts = pgTable("digital_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  fileUrl: text("file_url"),
  coverImageUrl: text("cover_image_url"),
  previewUrl: text("preview_url"),
  previewPageCount: integer("preview_page_count").default(3),
  category: text("category").notNull(),
  tierTarget: text("tier_target").default("all"),
  examTarget: text("exam_target"),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true),
  questionCount: integer("question_count").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  themeId: text("theme_id"),
  careerType: text("career_type").default("nursing"),
  salePrice: integer("sale_price"),
  saleStartsAt: timestamp("sale_starts_at"),
  saleEndsAt: timestamp("sale_ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDigitalProductSchema = createInsertSchema(digitalProducts).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertDigitalProduct = z.infer<typeof insertDigitalProductSchema>;
export type DigitalProduct = typeof digitalProducts.$inferSelect;

export const productPurchases = pgTable("product_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull(),
  stripeSessionId: text("stripe_session_id"),
  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  downloadCount: integer("download_count").default(0),
  maxDownloads: integer("max_downloads").default(5),
});

export const insertProductPurchaseSchema = createInsertSchema(productPurchases).omit({ id: true, purchaseDate: true });
export type InsertProductPurchase = z.infer<typeof insertProductPurchaseSchema>;
export type ProductPurchase = typeof productPurchases.$inferSelect;

export const couponCodes = pgTable("coupon_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  discountType: text("discount_type").notNull(),
  discountValue: integer("discount_value").notNull(),
  expiresAt: timestamp("expires_at"),
  usageLimit: integer("usage_limit"),
  usageCount: integer("usage_count").default(0),
  isActive: boolean("is_active").default(true),
});

export const generatedMicroLectures = pgTable("generated_micro_lectures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  topic: text("topic").notNull(),
  tier: text("tier").notNull(),
  focus: text("focus"),
  durationEstimate: text("duration_estimate"),
  scriptJson: jsonb("script_json"),
  slidesJson: jsonb("slides_json"),
  flashcardsJson: jsonb("flashcards_json"),
  keywords: text("keywords").array(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGeneratedMicroLectureSchema = createInsertSchema(generatedMicroLectures).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertGeneratedMicroLecture = z.infer<typeof insertGeneratedMicroLectureSchema>;
export type GeneratedMicroLecture = typeof generatedMicroLectures.$inferSelect;

export const designProjects = pgTable("design_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  pageSize: text("page_size").default("Letter"),
  orientation: text("orientation").default("portrait"),
  createdByAdminId: varchar("created_by_admin_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDesignProjectSchema = createInsertSchema(designProjects).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertDesignProject = z.infer<typeof insertDesignProjectSchema>;
export type DesignProject = typeof designProjects.$inferSelect;

export const designPages = pgTable("design_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  pageNumber: integer("page_number").notNull(),
  canvasJson: jsonb("canvas_json"),
  backgroundColor: text("background_color").default("#ffffff"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDesignPageSchema = createInsertSchema(designPages).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertDesignPage = z.infer<typeof insertDesignPageSchema>;
export type DesignPage = typeof designPages.$inferSelect;

export const designAssets = pgTable("design_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  assetType: text("asset_type").notNull(),
  url: text("url").notNull(),
  width: integer("width"),
  height: integer("height"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDesignAssetSchema = createInsertSchema(designAssets).omit({ id: true, createdAt: true });
export type InsertDesignAsset = z.infer<typeof insertDesignAssetSchema>;
export type DesignAsset = typeof designAssets.$inferSelect;

export const exportedFiles = pgTable("exported_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  exportType: text("export_type").notNull(),
  url: text("url").notNull(),
  settingsJson: jsonb("settings_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExportedFileSchema = createInsertSchema(exportedFiles).omit({ id: true, createdAt: true });
export type InsertExportedFile = z.infer<typeof insertExportedFileSchema>;
export type ExportedFile = typeof exportedFiles.$inferSelect;

export const qbankDrafts = pgTable("qbank_drafts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  exam: text("exam").notNull().default("rex-pn"),
  topic: text("topic").notNull(),
  mixedBlueprint: boolean("mixed_blueprint").default(false),
  requestedCount: integer("requested_count").notNull().default(300),
  difficulty: text("difficulty").notNull().default("medium"),
  distributionJson: jsonb("distribution_json"),
  topicMix: jsonb("topic_mix"),
  canadianContext: boolean("canadian_context").default(true),
  outputLanguage: text("output_language").default("en"),
  editionsJson: jsonb("editions_json"),
  questionsJson: jsonb("questions_json"),
  auditJson: jsonb("audit_json"),
  basePrompt: text("base_prompt"),
  patchPrompts: jsonb("patch_prompts"),
  version: integer("version").default(1),
  status: text("status").notNull().default("draft"),
  price: integer("price").default(1499),
  studyEditionPrice: integer("study_edition_price").default(2499),
  publishedProductId: varchar("published_product_id"),
  publishedStudyProductId: varchar("published_study_product_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertQbankDraftSchema = createInsertSchema(qbankDrafts).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertQbankDraft = z.infer<typeof insertQbankDraftSchema>;
export type QbankDraft = typeof qbankDrafts.$inferSelect;

export const qbankRecipes = pgTable("qbank_recipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  exam: text("exam").notNull().default("rex-pn"),
  topic: text("topic").notNull(),
  mixedBlueprint: boolean("mixed_blueprint").default(false),
  requestedCount: integer("requested_count").notNull().default(300),
  difficulty: text("difficulty").notNull().default("medium"),
  distributionJson: jsonb("distribution_json"),
  canadianContext: boolean("canadian_context").default(true),
  editionsJson: jsonb("editions_json"),
  price: integer("price").default(1499),
  studyEditionPrice: integer("study_edition_price").default(2499),
  autoPublish: boolean("auto_publish").default(false),
  isActive: boolean("is_active").default(true),
  lastRunAt: timestamp("last_run_at"),
  lastRunStatus: text("last_run_status"),
  runCount: integer("run_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQbankRecipeSchema = createInsertSchema(qbankRecipes).omit({ id: true, createdAt: true });
export type InsertQbankRecipe = z.infer<typeof insertQbankRecipeSchema>;
export type QbankRecipe = typeof qbankRecipes.$inferSelect;

export const diagnosticAssessments = pgTable("diagnostic_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  examTarget: text("exam_target").notNull().default("rex-pn"),
  totalQuestions: integer("total_questions").notNull().default(30),
  score: integer("score").notNull(),
  domainScores: jsonb("domain_scores").default(sql`'{}'::jsonb`),
  topicScores: jsonb("topic_scores").default(sql`'{}'::jsonb`),
  answers: jsonb("answers").default(sql`'[]'::jsonb`),
  weaknessSummary: text("weakness_summary"),
  strengthSummary: text("strength_summary"),
  studyPlan: jsonb("study_plan"),
  recommendedQbanks: jsonb("recommended_qbanks"),
  remediationBankId: varchar("remediation_bank_id"),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertDiagnosticAssessmentSchema = createInsertSchema(diagnosticAssessments).omit({ id: true, completedAt: true });
export type InsertDiagnosticAssessment = z.infer<typeof insertDiagnosticAssessmentSchema>;
export type DiagnosticAssessment = typeof diagnosticAssessments.$inferSelect;

export const userStats = pgTable("user_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  totalQuestionsAnswered: integer("total_questions_answered").default(0),
  totalCorrect: integer("total_correct").default(0),
  domainBreakdown: jsonb("domain_breakdown").default(sql`'{}'::jsonb`),
  examScores: jsonb("exam_scores").default(sql`'[]'::jsonb`),
  studyStreak: integer("study_streak").default(0),
  lastStudyDate: text("last_study_date"),
  weeklyHistory: jsonb("weekly_history").default(sql`'[]'::jsonb`),
  publicProfile: boolean("public_profile").default(false),
  leaderboardVisible: boolean("leaderboard_visible").default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true, updatedAt: true });
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStats.$inferSelect;

export const studyGroups = pgTable("study_groups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  inviteCode: text("invite_code").notNull().unique(),
  createdBy: varchar("created_by").notNull(),
  showRanking: boolean("show_ranking").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudyGroupSchema = createInsertSchema(studyGroups).omit({ id: true, createdAt: true });
export type InsertStudyGroup = z.infer<typeof insertStudyGroupSchema>;
export type StudyGroup = typeof studyGroups.$inferSelect;

export const studyGroupMembers = pgTable("study_group_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  groupId: varchar("group_id").notNull(),
  userId: varchar("user_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const insertStudyGroupMemberSchema = createInsertSchema(studyGroupMembers).omit({ id: true, joinedAt: true });
export type InsertStudyGroupMember = z.infer<typeof insertStudyGroupMemberSchema>;
export type StudyGroupMember = typeof studyGroupMembers.$inferSelect;

export const questionAnalytics = pgTable("question_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull(),
  totalAttempts: integer("total_attempts").default(0),
  totalCorrect: integer("total_correct").default(0),
  percentCorrect: doublePrecision("percent_correct").default(0),
  uniqueUserCount: integer("unique_user_count").default(0),
  difficulty: text("difficulty"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertQuestionAnalyticsSchema = createInsertSchema(questionAnalytics).omit({ id: true, lastUpdated: true });
export type InsertQuestionAnalytics = z.infer<typeof insertQuestionAnalyticsSchema>;
export type QuestionAnalytics = typeof questionAnalytics.$inferSelect;

export const friendRequests = pgTable("friend_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requesterId: varchar("requester_id").notNull(),
  receiverId: varchar("receiver_id").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFriendRequestSchema = createInsertSchema(friendRequests).omit({ id: true, createdAt: true });
export type InsertFriendRequest = z.infer<typeof insertFriendRequestSchema>;
export type FriendRequest = typeof friendRequests.$inferSelect;

export const friendConnections = pgTable("friend_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userAId: varchar("user_a_id").notNull(),
  userBId: varchar("user_b_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFriendConnectionSchema = createInsertSchema(friendConnections).omit({ id: true, createdAt: true });
export type InsertFriendConnection = z.infer<typeof insertFriendConnectionSchema>;
export type FriendConnection = typeof friendConnections.$inferSelect;

export const productGenerations = pgTable("product_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  template: text("template").notNull(),
  status: text("status").default("queued").notNull(),
  targetCount: integer("target_count").notNull(),
  createdCount: integer("created_count").default(0).notNull(),
  chunkSize: integer("chunk_size").default(15).notNull(),
  model: text("model").default("gpt-4o-mini"),
  promptBase: text("prompt_base"),
  promptState: jsonb("prompt_state"),
  topic: text("topic"),
  examTarget: text("exam_target"),
  difficulty: text("difficulty").default("mixed"),
  questionTypes: jsonb("question_types"),
  region: text("region").default("BOTH"),
  settings: jsonb("settings"),
  lastError: text("last_error"),
  startedAt: timestamp("started_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductGenerationSchema = createInsertSchema(productGenerations).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProductGeneration = z.infer<typeof insertProductGenerationSchema>;
export type ProductGeneration = typeof productGenerations.$inferSelect;

export const generatedQuestions = pgTable("generated_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  generationId: varchar("generation_id").notNull(),
  idx: integer("idx").notNull(),
  type: text("type").notNull(),
  difficulty: text("difficulty"),
  system: text("system"),
  category: text("category"),
  stem: text("stem").notNull(),
  scenario: text("scenario"),
  choices: jsonb("choices").notNull(),
  correctAnswers: jsonb("correct_answers").notNull(),
  rationale: jsonb("rationale"),
  examPearl: text("exam_pearl"),
  hash: text("hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGeneratedQuestionSchema = createInsertSchema(generatedQuestions).omit({ id: true, createdAt: true });
export type InsertGeneratedQuestion = z.infer<typeof insertGeneratedQuestionSchema>;
export type GeneratedQuestion = typeof generatedQuestions.$inferSelect;

export const generationEvents = pgTable("generation_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  generationId: varchar("generation_id").notNull(),
  eventType: text("event_type").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatorV2PresentationSettings = pgTable("generator_v2_presentation_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  generationId: varchar("generation_id").notNull().unique(),
  themeId: text("theme_id"),
  coverLayout: text("cover_layout").default("minimal"),
  coverTitle: text("cover_title").default(""),
  coverSubtitle: text("cover_subtitle").default(""),
  authorLine: text("author_line"),
  editionText: text("edition_text"),
  showLogo: boolean("show_logo").default(true),
  extrasJson: jsonb("extras_json"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGeneratorV2PresentationSettingsSchema = createInsertSchema(generatorV2PresentationSettings).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertGeneratorV2PresentationSettings = z.infer<typeof insertGeneratorV2PresentationSettingsSchema>;
export type GeneratorV2PresentationSettings = typeof generatorV2PresentationSettings.$inferSelect;

export const studyPlans = pgTable("study_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tier: text("tier").notNull(),
  timeframeWeeks: integer("timeframe_weeks").default(4),
  minutesPerDay: integer("minutes_per_day").default(30),
  examDate: timestamp("exam_date"),
  examType: text("exam_type"),
  stylePreference: text("style_preference").default("read_then_practice"),
  domainRatings: jsonb("domain_ratings"),
  quizResults: jsonb("quiz_results"),
  preferences: jsonb("preferences"),
  isActive: boolean("is_active").default(true),
  progressPercent: integer("progress_percent").default(0),
  careerType: text("career_type").default("nursing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStudyPlanSchema = createInsertSchema(studyPlans).omit({ id: true, createdAt: true, updatedAt: true, progressPercent: true });
export type InsertStudyPlan = z.infer<typeof insertStudyPlanSchema>;
export type StudyPlan = typeof studyPlans.$inferSelect;

export const studyPlanDays = pgTable("study_plan_days", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studyPlanId: varchar("study_plan_id").notNull(),
  weekNum: integer("week_num").notNull(),
  dayNum: integer("day_num").notNull(),
  title: text("title").notNull(),
  focusDomains: jsonb("focus_domains"),
  date: timestamp("date"),
});

export const studyPlanTasks = pgTable("study_plan_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dayId: varchar("day_id").notNull(),
  type: text("type").notNull(),
  domain: text("domain").notNull(),
  title: text("title").notNull(),
  minutes: integer("minutes").notNull(),
  linkUrl: text("link_url"),
  resourceId: text("resource_id"),
  status: text("status").default("todo"),
  completedAt: timestamp("completed_at"),
});

export const studyOnboarding = pgTable("study_onboarding", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tier: text("tier").notNull(),
  domainRatings: jsonb("domain_ratings"),
  preferences: jsonb("preferences"),
  quizResults: jsonb("quiz_results"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const v2ContentBlocks = pgTable("v2_content_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  generationId: varchar("generation_id").notNull(),
  sectionKey: text("section_key").notNull(),
  blocks: jsonb("blocks").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedBlueprints = pgTable("allied_blueprints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careerType: text("career_type").notNull(),
  version: integer("version").notNull().default(1),
  domains: jsonb("domains").notNull(),
  difficultyDistribution: jsonb("difficulty_distribution").notNull(),
  cognitiveDistribution: jsonb("cognitive_distribution").notNull(),
  allowedQuestionTypes: jsonb("allowed_question_types").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedQuestions = pgTable("allied_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careerType: text("career_type").notNull(),
  blueprintId: varchar("blueprint_id"),
  batchId: varchar("batch_id"),
  stem: text("stem").notNull(),
  options: jsonb("options").notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  rationaleLong: text("rationale_long").notNull(),
  learningObjective: text("learning_objective").notNull(),
  blueprintCategory: text("blueprint_category").notNull(),
  subtopic: text("subtopic").notNull(),
  difficulty: integer("difficulty").notNull(),
  cognitiveLevel: text("cognitive_level").notNull(),
  questionType: text("question_type").notNull(),
  examTrap: text("exam_trap"),
  clinicalPearls: jsonb("clinical_pearls"),
  safetyNote: text("safety_note"),
  distractorRationales: jsonb("distractor_rationales"),
  isFree: boolean("is_free").default(false),
  status: text("status").default("pending"),
  discriminationIndex: doublePrecision("discrimination_index"),
  totalAttempts: integer("total_attempts").default(0),
  correctAttempts: integer("correct_attempts").default(0),
  topGroupCorrect: doublePrecision("top_group_correct"),
  bottomGroupCorrect: doublePrecision("bottom_group_correct"),
  flagged: boolean("flagged").default(false),
  flagReason: text("flag_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedBatchRuns = pgTable("allied_batch_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careerType: text("career_type").notNull(),
  blueprintId: varchar("blueprint_id"),
  requestedCount: integer("requested_count").notNull(),
  generatedCount: integer("generated_count").default(0),
  acceptedCount: integer("accepted_count").default(0),
  rejectedCount: integer("rejected_count").default(0),
  rejectionReasons: jsonb("rejection_reasons"),
  difficultyBreakdown: jsonb("difficulty_breakdown"),
  cognitiveBreakdown: jsonb("cognitive_breakdown"),
  domainBreakdown: jsonb("domain_breakdown"),
  avgRationaleWords: doublePrecision("avg_rationale_words"),
  status: text("status").default("running"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const alliedFlashcards = pgTable("allied_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careerType: text("career_type").notNull(),
  questionId: varchar("question_id"),
  cardType: text("card_type").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  rationale: text("rationale"),
  blueprintCategory: text("blueprint_category"),
  subtopic: text("subtopic"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedRevisionQueue = pgTable("allied_revision_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull(),
  careerType: text("career_type").notNull(),
  reason: text("reason").notNull(),
  severity: text("severity").default("medium"),
  status: text("status").default("pending"),
  reviewNotes: text("review_notes"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedLeads = pgTable("allied_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  careerType: text("career_type"),
  source: text("source").default("homepage"),
  consent: boolean("consent").default(false),
  diagnosticData: jsonb("diagnostic_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedAutomations = pgTable("allied_automations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  enabled: boolean("enabled").default(false),
  frequency: text("frequency").default("daily"),
  maxItemsPerRun: integer("max_items_per_run").default(25),
  maxRunsPerDay: integer("max_runs_per_day").default(1),
  careerScope: jsonb("career_scope").default(sql`'["rrt","paramedic","pharmacyTech","mlt","imaging"]'::jsonb`),
  autoPublish: boolean("auto_publish").default(false),
  rationaleMinWords: integer("rationale_min_words").default(600),
  strictnessLevel: text("strictness_level").default("standard"),
  promptTemplate: text("prompt_template"),
  config: jsonb("config"),
  lastRunAt: timestamp("last_run_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedAutomationRuns = pgTable("allied_automation_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  automationId: varchar("automation_id").notNull(),
  automationSlug: text("automation_slug").notNull(),
  status: text("status").default("running"),
  itemsGenerated: integer("items_generated").default(0),
  itemsAccepted: integer("items_accepted").default(0),
  itemsRejected: integer("items_rejected").default(0),
  details: jsonb("details"),
  errorMessage: text("error_message"),
  tokenCost: integer("token_cost").default(0),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const alliedModules = pgTable("allied_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careerType: text("career_type").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  domain: text("domain").notNull(),
  domainWeight: doublePrecision("domain_weight").default(0),
  orderIndex: integer("order_index").default(0),
  learningObjectives: jsonb("learning_objectives"),
  mostTestedConcepts: jsonb("most_tested_concepts"),
  redFlags: jsonb("red_flags"),
  examTraps: jsonb("exam_traps"),
  status: text("status").default("draft"),
  isFree: boolean("is_free").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedLessons = pgTable("allied_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  moduleId: varchar("module_id").notNull(),
  careerType: text("career_type").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  orderIndex: integer("order_index").default(0),
  clinicalReasoning: text("clinical_reasoning"),
  decisionTree: text("decision_tree"),
  commonMistakes: jsonb("common_mistakes"),
  examTrapWarning: text("exam_trap_warning"),
  checkpointQuestions: jsonb("checkpoint_questions"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const alliedDraftAssets = pgTable("allied_draft_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  status: text("status").default("draft"),
  careerType: text("career_type"),
  domain: text("domain"),
  subtopic: text("subtopic"),
  title: text("title"),
  payload: jsonb("payload").notNull(),
  validationReport: jsonb("validation_report"),
  automationRunId: varchar("automation_run_id"),
  createdBy: text("created_by").default("automation"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAlliedBlueprintSchema = createInsertSchema(alliedBlueprints).omit({ id: true, createdAt: true });
export const insertAlliedQuestionSchema = createInsertSchema(alliedQuestions).omit({ id: true, createdAt: true });
export const insertAlliedBatchRunSchema = createInsertSchema(alliedBatchRuns).omit({ id: true, startedAt: true });
export const insertAlliedFlashcardSchema = createInsertSchema(alliedFlashcards).omit({ id: true, createdAt: true });
export const insertAlliedRevisionQueueSchema = createInsertSchema(alliedRevisionQueue).omit({ id: true, createdAt: true });
export const insertAlliedLeadSchema = createInsertSchema(alliedLeads).omit({ id: true, createdAt: true });

export type AlliedBlueprint = typeof alliedBlueprints.$inferSelect;
export type InsertAlliedBlueprint = z.infer<typeof insertAlliedBlueprintSchema>;
export type AlliedQuestion = typeof alliedQuestions.$inferSelect;
export type InsertAlliedQuestion = z.infer<typeof insertAlliedQuestionSchema>;
export type AlliedBatchRun = typeof alliedBatchRuns.$inferSelect;
export type InsertAlliedBatchRun = z.infer<typeof insertAlliedBatchRunSchema>;
export type AlliedFlashcard = typeof alliedFlashcards.$inferSelect;
export type InsertAlliedFlashcard = z.infer<typeof insertAlliedFlashcardSchema>;
export type AlliedRevisionQueueItem = typeof alliedRevisionQueue.$inferSelect;
export type InsertAlliedRevisionQueueItem = z.infer<typeof insertAlliedRevisionQueueSchema>;
export type AlliedLead = typeof alliedLeads.$inferSelect;
export type InsertAlliedLead = z.infer<typeof insertAlliedLeadSchema>;

export const mockExamCreditLedger = pgTable("mock_exam_credit_ledger", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  creditType: text("credit_type").notNull().default("MOCK_OFFICIAL"),
  scope: text("scope").notNull(),
  quantity: integer("quantity").notNull(),
  sourcePurchaseId: varchar("source_purchase_id"),
  sessionId: varchar("session_id"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMockExamCreditLedgerSchema = createInsertSchema(mockExamCreditLedger).omit({ id: true, createdAt: true });
export type MockExamCreditLedger = typeof mockExamCreditLedger.$inferSelect;
export type InsertMockExamCreditLedger = z.infer<typeof insertMockExamCreditLedgerSchema>;

export const mockExamProducts = pgTable("mock_exam_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  creditType: text("credit_type").notNull().default("MOCK_OFFICIAL"),
  scope: text("scope").notNull(),
  creditsGranted: integer("credits_granted").notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  stripePriceId: text("stripe_price_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMockExamProductSchema = createInsertSchema(mockExamProducts).omit({ id: true, createdAt: true });
export type MockExamProduct = typeof mockExamProducts.$inferSelect;
export type InsertMockExamProduct = z.infer<typeof insertMockExamProductSchema>;

export const mockExamPurchases = pgTable("mock_exam_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id"),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").notNull().default("pending"),
  amountInCents: integer("amount_in_cents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMockExamPurchaseSchema = createInsertSchema(mockExamPurchases).omit({ id: true, createdAt: true, updatedAt: true });
export type MockExamPurchase = typeof mockExamPurchases.$inferSelect;
export type InsertMockExamPurchase = z.infer<typeof insertMockExamPurchaseSchema>;

export const institutions = pgTable("institutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  region: text("region").notNull().default("US"),
  careerScope: text("career_scope").notNull().default("MULTI"),
  licenseModel: text("license_model").notNull().default("COHORT"),
  seatLimit: integer("seat_limit").notNull().default(50),
  semesterEndDate: timestamp("semester_end_date"),
  defaultDurationDays: integer("default_duration_days"),
  tierLevel: text("tier_level").notNull().default("COHORT"),
  addOns: jsonb("add_ons").default(sql`'[]'::jsonb`),
  enrollmentMode: text("enrollment_mode").notNull().default("DOMAIN_LOCK"),
  allowedEmailDomains: text("allowed_email_domains").array(),
  requireEmailVerified: boolean("require_email_verified").default(true),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInstitutionSchema = createInsertSchema(institutions).omit({ id: true, createdAt: true });
export type Institution = typeof institutions.$inferSelect;
export type InsertInstitution = z.infer<typeof insertInstitutionSchema>;

export const institutionSeats = pgTable("institution_seats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  userId: varchar("user_id").notNull(),
  role: text("role").notNull().default("student"),
  accessStart: timestamp("access_start").defaultNow().notNull(),
  accessEnd: timestamp("access_end"),
  active: boolean("active").default(true),
});

export const insertInstitutionSeatSchema = createInsertSchema(institutionSeats).omit({ id: true });
export type InstitutionSeat = typeof institutionSeats.$inferSelect;
export type InsertInstitutionSeat = z.infer<typeof insertInstitutionSeatSchema>;

export const institutionInviteCodes = pgTable("institution_invite_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  code: text("code").notNull().unique(),
  seatLimit: integer("seat_limit").notNull().default(50),
  expiresAt: timestamp("expires_at"),
  usageCount: integer("usage_count").default(0),
});

export const insertInstitutionInviteCodeSchema = createInsertSchema(institutionInviteCodes).omit({ id: true });
export type InstitutionInviteCode = typeof institutionInviteCodes.$inferSelect;
export type InsertInstitutionInviteCode = z.infer<typeof insertInstitutionInviteCodeSchema>;

export const institutionSeatRequests = pgTable("institution_seat_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  userId: varchar("user_id").notNull(),
  requestedAt: timestamp("requested_at").defaultNow().notNull(),
  status: text("status").notNull().default("pending"),
  reason: text("reason"),
  decidedAt: timestamp("decided_at"),
  decidedByUserId: varchar("decided_by_user_id"),
});

export const insertInstitutionSeatRequestSchema = createInsertSchema(institutionSeatRequests).omit({ id: true, requestedAt: true });
export type InstitutionSeatRequest = typeof institutionSeatRequests.$inferSelect;
export type InsertInstitutionSeatRequest = z.infer<typeof insertInstitutionSeatRequestSchema>;

export const institutionRosterAllowlist = pgTable("institution_roster_allowlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("active"),
  addedAt: timestamp("added_at").defaultNow().notNull(),
  addedByUserId: varchar("added_by_user_id").notNull(),
});

export const insertInstitutionRosterSchema = createInsertSchema(institutionRosterAllowlist).omit({ id: true, addedAt: true });
export type InstitutionRoster = typeof institutionRosterAllowlist.$inferSelect;
export type InsertInstitutionRoster = z.infer<typeof insertInstitutionRosterSchema>;

export const institutionAuditLog = pgTable("institution_audit_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  actorUserId: varchar("actor_user_id").notNull(),
  actionType: text("action_type").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInstitutionAuditLogSchema = createInsertSchema(institutionAuditLog).omit({ id: true, createdAt: true });
export type InstitutionAuditLog = typeof institutionAuditLog.$inferSelect;
export type InsertInstitutionAuditLog = z.infer<typeof insertInstitutionAuditLogSchema>;

export const institutionLeads = pgTable("institution_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionName: text("institution_name").notNull(),
  programType: text("program_type").notNull(),
  estimatedStudentCount: integer("estimated_student_count"),
  country: text("country"),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  region: text("region").default("US"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInstitutionLeadSchema = createInsertSchema(institutionLeads).omit({ id: true, createdAt: true });
export type InstitutionLead = typeof institutionLeads.$inferSelect;
export type InsertInstitutionLead = z.infer<typeof insertInstitutionLeadSchema>;

export const qbankPromptTemplates = pgTable("qbank_prompt_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  version: integer("version").default(1),
  isActive: boolean("is_active").default(true),
  systemPrompt: text("system_prompt").notNull(),
  userPromptTemplate: text("user_prompt_template").notNull(),
  variants: jsonb("variants"),
  validationRules: jsonb("validation_rules"),
  outputSchemaVersion: text("output_schema_version").default("v1"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertQbankPromptTemplateSchema = createInsertSchema(qbankPromptTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type QbankPromptTemplate = typeof qbankPromptTemplates.$inferSelect;
export type InsertQbankPromptTemplate = z.infer<typeof insertQbankPromptTemplateSchema>;

export const qbankGenerationRuns = pgTable("qbank_generation_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").notNull(),
  templateKey: text("template_key").notNull(),
  variantKey: text("variant_key").notNull(),
  examKey: text("exam_key").notNull(),
  region: text("region").notNull(),
  targetCount: integer("target_count").notNull(),
  generatedCount: integer("generated_count").default(0),
  acceptedCount: integer("accepted_count").default(0),
  rejectedCount: integer("rejected_count").default(0),
  status: text("status").default("queued"),
  isDryRun: boolean("is_dry_run").default(true),
  ingested: boolean("ingested").default(false),
  validationReport: jsonb("validation_report"),
  previewItems: jsonb("preview_items"),
  generatedItems: jsonb("generated_items"),
  tokenCost: integer("token_cost").default(0),
  model: text("model").default("gpt-4o-mini"),
  errorMessage: text("error_message"),
  triggeredBy: text("triggered_by").default("manual"),
  scheduleId: varchar("schedule_id"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQbankGenerationRunSchema = createInsertSchema(qbankGenerationRuns).omit({ id: true, createdAt: true });
export type QbankGenerationRun = typeof qbankGenerationRuns.$inferSelect;
export type InsertQbankGenerationRun = z.infer<typeof insertQbankGenerationRunSchema>;

export const qbankGenerationSchedules = pgTable("qbank_generation_schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  templateKey: text("template_key").notNull(),
  variantKey: text("variant_key").notNull(),
  examKey: text("exam_key").notNull(),
  region: text("region").notNull(),
  questionsPerRun: integer("questions_per_run").default(25),
  rationaleMinWords: integer("rationale_min_words").default(250),
  frequency: text("frequency").default("daily"),
  customCronDays: jsonb("custom_cron_days"),
  runTimeHour: integer("run_time_hour").default(3),
  enabled: boolean("enabled").default(false),
  autoIngest: boolean("auto_ingest").default(false),
  maxDailyRuns: integer("max_daily_runs").default(1),
  lastRunAt: timestamp("last_run_at"),
  nextRunAt: timestamp("next_run_at"),
  totalRunsCompleted: integer("total_runs_completed").default(0),
  totalQuestionsGenerated: integer("total_questions_generated").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertQbankGenerationScheduleSchema = createInsertSchema(qbankGenerationSchedules).omit({ id: true, createdAt: true, updatedAt: true });
export type QbankGenerationSchedule = typeof qbankGenerationSchedules.$inferSelect;
export type InsertQbankGenerationSchedule = z.infer<typeof insertQbankGenerationScheduleSchema>;
