import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean, doublePrecision, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  emailVerifiedAt: timestamp("email_verified_at"),
  tier: text("tier").default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  region: text("region").default("US"),
  flashcardLimit: integer("flashcard_limit").default(300),
  planExpiresAt: timestamp("plan_expires_at"),
  careerType: text("career_type").default("nursing"),
  testerAccess: boolean("tester_access").default(false),
  testerExpiry: timestamp("tester_expiry"),
  testerInviteCode: text("tester_invite_code"),
  referralCode: text("referral_code").unique(),
  referralUses: integer("referral_uses").default(0),
  referredBy: text("referred_by"),
  referralDiscountUsed: boolean("referral_discount_used").default(false),
  isLifetime: boolean("is_lifetime").default(false),
  lifetimePurchasedAt: timestamp("lifetime_purchased_at"),
});

export const pricingPlans = pgTable("pricing_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tier: text("tier").notNull(),
  duration: text("duration").notNull(),
  isLifetime: boolean("is_lifetime").default(false),
  priceCAD: integer("price_cad").notNull(),
  priceUSD: integer("price_usd").notNull(),
  isEnabled: boolean("is_enabled").default(true),
  isPopular: boolean("is_popular").default(false),
  isFoundingPrice: boolean("is_founding_price").default(false),
  featureList: jsonb("feature_list").default(sql`'[]'::jsonb`),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPricingPlanSchema = createInsertSchema(pricingPlans).omit({ id: true, createdAt: true, updatedAt: true });
export type PricingPlan = typeof pricingPlans.$inferSelect;
export type InsertPricingPlan = z.infer<typeof insertPricingPlanSchema>;

export const freeTrialUsage = pgTable("free_trial_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  questionsUsed: integer("questions_used").default(0),
  flashcardsUsed: integer("flashcards_used").default(0),
  catExamsUsed: integer("cat_exams_used").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFreeTrialUsageSchema = createInsertSchema(freeTrialUsage).omit({ id: true, createdAt: true, updatedAt: true });
export type FreeTrialUsage = typeof freeTrialUsage.$inferSelect;
export type InsertFreeTrialUsage = z.infer<typeof insertFreeTrialUsageSchema>;

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
  examType: text("exam_type").default("practice"),
  catState: jsonb("cat_state"),
  blueprintCoverageState: jsonb("blueprint_coverage_state"),
  reviewUnlocked: boolean("review_unlocked").default(false),
  timerState: jsonb("timer_state"),
  stoppingRuleStatus: text("stopping_rule_status"),
  blueprintCode: text("blueprint_code"),
  blueprintMeta: jsonb("blueprint_meta"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertMockExamAttemptSchema = createInsertSchema(mockExamAttempts).omit({
  id: true,
  startedAt: true,
});

export type MockExamAttempt = typeof mockExamAttempts.$inferSelect;
export type InsertMockExamAttempt = z.infer<typeof insertMockExamAttemptSchema>;

export const lessonAliases = pgTable("lesson_aliases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: text("lesson_id").notNull(),
  aliasText: text("alias_text").notNull(),
  normalizedAlias: text("normalized_alias").notNull(),
  canonicalSlug: text("canonical_slug").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLessonAliasSchema = createInsertSchema(lessonAliases).omit({
  id: true,
  createdAt: true,
});

export type LessonAlias = typeof lessonAliases.$inferSelect;
export type InsertLessonAlias = z.infer<typeof insertLessonAliasSchema>;

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
  platformSection: text("platform_section"),
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

export const crossSectionEvents = pgTable("cross_section_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: varchar("user_id"),
  sourceSection: text("source_section").notNull(),
  destinationSection: text("destination_section").notNull(),
  sourcePage: text("source_page").notNull(),
  destinationPage: text("destination_page").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCrossSectionEventSchema = createInsertSchema(crossSectionEvents).omit({
  id: true,
  createdAt: true,
});

export type CrossSectionEvent = typeof crossSectionEvents.$inferSelect;
export type InsertCrossSectionEvent = z.infer<typeof insertCrossSectionEventSchema>;

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

export const SUBSCRIPTION_CATEGORIES = ["exam_prep", "new_grad_tips", "job_alerts", "general"] as const;
export type SubscriptionCategory = typeof SUBSCRIPTION_CATEGORIES[number];

export const emailSubscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  tier: text("tier").default("general"),
  source: text("source").default("qotd"),
  verified: boolean("verified").default(false),
  frequency: text("frequency").default("weekly"),
  leadMagnetType: text("lead_magnet_type"),
  professionContext: text("profession_context"),
  categories: text("categories").array().default(sql`'{"general"}'::text[]`),
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
  clinicalPearl: text("clinical_pearl"),
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
  scenario: text("scenario"),
  clinicalPearl: text("clinical_pearl"),
  examStrategy: text("exam_strategy"),
  memoryHook: text("memory_hook"),
  frameworkUsed: text("framework_used"),
  clinicalTrap: text("clinical_trap"),
  distractorRationales: jsonb("distractor_rationales"),
  qualityScores: jsonb("quality_scores"),
  qualityFeedback: jsonb("quality_feedback"),
  qualityScore: integer("quality_score"),
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
  sourceType: text("source_type").default("manual"),
  sourceQuestionId: varchar("source_question_id"),
  questionType: text("question_type"),
  options: jsonb("options").default(sql`'[]'::jsonb`),
  correctAnswer: jsonb("correct_answer"),
  rationaleCorrect: text("rationale_correct"),
  distractorRationales: jsonb("distractor_rationales"),
  clinicalTakeaway: text("clinical_takeaway"),
  examPearl: text("exam_pearl"),
  rationaleMedia: jsonb("rationale_media").default(sql`'[]'::jsonb`),
  lessonLinks: jsonb("lesson_links").default(sql`'[]'::jsonb`),
  difficulty: integer("difficulty"),
  bodySystem: text("body_system"),
  topic: text("topic"),
  subtopic: text("subtopic"),
  regionScope: text("region_scope").default("BOTH"),
  flashcardEnabled: boolean("flashcard_enabled").default(false),
  category: text("category"),
  blueprintCategory: text("blueprint_category"),
  updatedAt: timestamp("updated_at").defaultNow(),
  highYield: boolean("high_yield").default(false),
  isFoundational: boolean("is_foundational").default(false),
  blueprintCategory: text("blueprint_category"),
  qualityScores: jsonb("quality_scores"),
  qualityFeedback: jsonb("quality_feedback"),
  qualityScore: integer("quality_score"),
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
  clinicalPearl: text("clinical_pearl"),
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

export const mockExamDefinitions = pgTable("mock_exam_definitions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  specialty: text("specialty").notNull(),
  examNumber: integer("exam_number").notNull().default(1),
  title: text("title").notNull(),
  questionIds: jsonb("question_ids").default(sql`'[]'::jsonb`),
  difficultyLevel: text("difficulty_level").notNull().default("mixed"),
  categoryTags: jsonb("category_tags").default(sql`'[]'::jsonb`),
  answerKey: jsonb("answer_key").default(sql`'{}'::jsonb`),
  rationaleIds: jsonb("rationale_ids").default(sql`'[]'::jsonb`),
  timeLimit: integer("time_limit").notNull().default(150),
  sections: jsonb("sections").default(sql`'[]'::jsonb`),
  totalQuestions: integer("total_questions").notNull().default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMockExamDefinitionSchema = createInsertSchema(mockExamDefinitions).omit({ id: true, createdAt: true });
export type MockExamDefinition = typeof mockExamDefinitions.$inferSelect;
export type InsertMockExamDefinition = z.infer<typeof insertMockExamDefinitionSchema>;

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

export const trialSessions = pgTable("trial_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  examKey: text("exam_key").notNull(),
  tier: text("tier").notNull().default("rpn"),
  status: text("status").notNull().default("started"),
  totalQuestions: integer("total_questions").notNull().default(50),
  questionsServed: integer("questions_served").default(0),
  questionsAnswered: integer("questions_answered").default(0),
  currentIndex: integer("current_index").default(0),
  questions: jsonb("questions").default(sql`'[]'::jsonb`),
  answers: jsonb("answers").default(sql`'{}'::jsonb`),
  domainScores: jsonb("domain_scores").default(sql`'{}'::jsonb`),
  difficultyEstimate: doublePrecision("difficulty_estimate"),
  readinessLevel: text("readiness_level"),
  completionTimeSeconds: integer("completion_time_seconds"),
  report: jsonb("report").default(sql`'{}'::jsonb`),
  ipAddress: text("ip_address"),
  deviceFingerprint: text("device_fingerprint"),
  timerEnabled: boolean("timer_enabled").default(false),
  expiresAt: timestamp("expires_at"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTrialSessionSchema = createInsertSchema(trialSessions).omit({ id: true, createdAt: true, startedAt: true });
export type TrialSession = typeof trialSessions.$inferSelect;
export type InsertTrialSession = z.infer<typeof insertTrialSessionSchema>;

export const autopilotEngines = pgTable("autopilot_engines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  engineKey: varchar("engine_key").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  enabled: boolean("enabled").default(false).notNull(),
  config: jsonb("config").default(sql`'{}'::jsonb`),
  lastRunAt: timestamp("last_run_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAutopilotEngineSchema = createInsertSchema(autopilotEngines).omit({ id: true, createdAt: true });
export type AutopilotEngine = typeof autopilotEngines.$inferSelect;
export type InsertAutopilotEngine = z.infer<typeof insertAutopilotEngineSchema>;

export const autopilotJobs = pgTable("autopilot_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  engineKey: varchar("engine_key").notNull(),
  status: text("status").notNull().default("queued"),
  payload: jsonb("payload").default(sql`'{}'::jsonb`),
  result: jsonb("result").default(sql`'{}'::jsonb`),
  error: text("error"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAutopilotJobSchema = createInsertSchema(autopilotJobs).omit({ id: true, createdAt: true });
export type AutopilotJob = typeof autopilotJobs.$inferSelect;
export type InsertAutopilotJob = z.infer<typeof insertAutopilotJobSchema>;

export const publishingQueue = pgTable("publishing_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  engineKey: varchar("engine_key").notNull(),
  contentType: text("content_type").notNull(),
  title: text("title").notNull(),
  content: jsonb("content").default(sql`'{}'::jsonb`),
  status: text("status").notNull().default("draft"),
  previewUrl: text("preview_url"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdBy: varchar("created_by"),
  approvedBy: varchar("approved_by"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPublishingQueueSchema = createInsertSchema(publishingQueue).omit({ id: true, createdAt: true });
export type PublishingQueueItem = typeof publishingQueue.$inferSelect;
export type InsertPublishingQueueItem = z.infer<typeof insertPublishingQueueSchema>;

export const autopilotSchedules = pgTable("autopilot_schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  engineKey: varchar("engine_key").notNull(),
  frequency: text("frequency").notNull().default("daily"),
  cronExpression: text("cron_expression"),
  enabled: boolean("enabled").default(false).notNull(),
  config: jsonb("config").default(sql`'{}'::jsonb`),
  nextRunAt: timestamp("next_run_at"),
  lastRunAt: timestamp("last_run_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAutopilotScheduleSchema = createInsertSchema(autopilotSchedules).omit({ id: true, createdAt: true });
export type AutopilotSchedule = typeof autopilotSchedules.$inferSelect;
export type InsertAutopilotSchedule = z.infer<typeof insertAutopilotScheduleSchema>;

export const lifecycleEmails = pgTable("lifecycle_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  emailType: text("email_type").notNull(),
  triggerEvent: text("trigger_event").notNull(),
  sequenceName: text("sequence_name"),
  sequenceStep: integer("sequence_step").default(1),
  status: text("status").notNull().default("pending"),
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLifecycleEmailSchema = createInsertSchema(lifecycleEmails).omit({ id: true, createdAt: true });
export type LifecycleEmail = typeof lifecycleEmails.$inferSelect;
export type InsertLifecycleEmail = z.infer<typeof insertLifecycleEmailSchema>;

export const blogClusters = pgTable("blog_clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keyword: text("keyword").notNull(),
  examKey: text("exam_key"),
  pillarTitle: text("pillar_title"),
  pillarContent: jsonb("pillar_content").default(sql`'{}'::jsonb`),
  pillarSlug: text("pillar_slug"),
  pillarStatus: text("pillar_status").default("draft"),
  supportingArticles: jsonb("supporting_articles").default(sql`'[]'::jsonb`),
  schemaMarkup: jsonb("schema_markup").default(sql`'{}'::jsonb`),
  internalLinks: jsonb("internal_links").default(sql`'[]'::jsonb`),
  publishSchedule: jsonb("publish_schedule").default(sql`'{}'::jsonb`),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogClusterSchema = createInsertSchema(blogClusters).omit({ id: true, createdAt: true, updatedAt: true });
export type BlogCluster = typeof blogClusters.$inferSelect;
export type InsertBlogCluster = z.infer<typeof insertBlogClusterSchema>;

export const practicePages = pgTable("practice_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  examKey: text("exam_key").notNull(),
  domain: text("domain").notNull(),
  keyword: text("keyword").notNull(),
  title: text("title").notNull(),
  introContent: text("intro_content"),
  questions: jsonb("questions").default(sql`'[]'::jsonb`),
  faqSchema: jsonb("faq_schema").default(sql`'{}'::jsonb`),
  breadcrumbSchema: jsonb("breadcrumb_schema").default(sql`'{}'::jsonb`),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPracticePageSchema = createInsertSchema(practicePages).omit({ id: true, createdAt: true, updatedAt: true });
export type PracticePage = typeof practicePages.$inferSelect;
export type InsertPracticePage = z.infer<typeof insertPracticePageSchema>;

export const visualAssets = pgTable("visual_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetType: text("asset_type").notNull(),
  prompt: text("prompt").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  imageUrl: text("image_url"),
  width: integer("width").default(1600),
  height: integer("height").default(1200),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVisualAssetSchema = createInsertSchema(visualAssets).omit({ id: true, createdAt: true });
export type VisualAsset = typeof visualAssets.$inferSelect;
export type InsertVisualAsset = z.infer<typeof insertVisualAssetSchema>;

export const pinterestPins = pgTable("pinterest_pins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  hashtags: jsonb("hashtags").default(sql`'[]'::jsonb`),
  imageUrl: text("image_url"),
  linkUrl: text("link_url"),
  pinType: text("pin_type").notNull(),
  status: text("status").notNull().default("draft"),
  scheduledFor: timestamp("scheduled_for"),
  publishedAt: timestamp("published_at"),
  pinterestId: text("pinterest_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPinterestPinSchema = createInsertSchema(pinterestPins).omit({ id: true, createdAt: true });
export type PinterestPin = typeof pinterestPins.$inferSelect;
export type InsertPinterestPin = z.infer<typeof insertPinterestPinSchema>;

export const seoClusters = pgTable("seo_clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  keyword: text("keyword").notNull(),
  countryMode: text("country_mode").notNull().default("BOTH"),
  examTier: text("exam_tier").notNull().default("ALL"),
  pillarSlug: text("pillar_slug").notNull().unique(),
  status: text("status").notNull().default("draft"),
  notes: text("notes"),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  careerCountryMode: text("career_country_mode").notNull().default("BOTH"),
  examName: text("exam_name"),
  blueprintTags: jsonb("blueprint_tags").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoClusterSchema = createInsertSchema(seoClusters).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoCluster = typeof seoClusters.$inferSelect;
export type InsertSeoCluster = z.infer<typeof insertSeoClusterSchema>;

export const seoArticles = pgTable("seo_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clusterId: varchar("cluster_id").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  targetKeyword: text("target_keyword").notNull(),
  searchIntent: text("search_intent").notNull().default("informational"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  outlineJson: jsonb("outline_json").default(sql`'{}'::jsonb`),
  contentMd: text("content_md").notNull().default(""),
  wordCount: integer("word_count").notNull().default(0),
  readingLevel: text("reading_level"),
  canonicalUrl: text("canonical_url"),
  requiresInfographic: boolean("requires_infographic").notNull().default(true),
  requiresPins: boolean("requires_pins").notNull().default(true),
  requiresPracticeQuestions: boolean("requires_practice_questions").notNull().default(true),
  publishedAt: timestamp("published_at"),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  examName: text("exam_name"),
  primaryCategory: text("primary_category"),
  secondaryCategory: text("secondary_category"),
  gatingLevel: text("gating_level").notNull().default("public"),
  requiresDisclaimer: boolean("requires_disclaimer").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoArticleSchema = createInsertSchema(seoArticles).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoArticle = typeof seoArticles.$inferSelect;
export type InsertSeoArticle = z.infer<typeof insertSeoArticleSchema>;

export const infographicTemplates = pgTable("infographic_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateKey: text("template_key").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  promptText: text("prompt_text").notNull(),
  countryMode: text("country_mode").notNull().default("BOTH"),
  examTier: text("exam_tier").notNull().default("ALL"),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertInfographicTemplateSchema = createInsertSchema(infographicTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type InfographicTemplate = typeof infographicTemplates.$inferSelect;
export type InsertInfographicTemplate = z.infer<typeof insertInfographicTemplateSchema>;

export const seoInfographics = pgTable("seo_infographics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull(),
  templateId: varchar("template_id"),
  type: text("type").notNull(),
  variant: text("variant").notNull().default("default"),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  altText: text("alt_text").notNull().default(""),
  promptUsed: text("prompt_used").notNull().default(""),
  width: integer("width").notNull().default(3000),
  height: integer("height").notNull().default(2000),
  filePath: text("file_path").notNull().default(""),
  publicUrl: text("public_url").notNull().default(""),
  checksum: text("checksum"),
  qcErrors: jsonb("qc_errors").default(sql`'[]'::jsonb`),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoInfographicSchema = createInsertSchema(seoInfographics).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoInfographic = typeof seoInfographics.$inferSelect;
export type InsertSeoInfographic = z.infer<typeof insertSeoInfographicSchema>;

export const seoPins = pgTable("seo_pins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull(),
  infographicId: varchar("infographic_id"),
  pinVariant: integer("pin_variant").notNull(),
  headline: text("headline").notNull(),
  bulletsJson: jsonb("bullets_json").default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("draft"),
  width: integer("width").notNull().default(1000),
  height: integer("height").notNull().default(1500),
  filePath: text("file_path").notNull().default(""),
  publicUrl: text("public_url").notNull().default(""),
  qcErrors: jsonb("qc_errors").default(sql`'[]'::jsonb`),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoPinSchema = createInsertSchema(seoPins).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoPin = typeof seoPins.$inferSelect;
export type InsertSeoPin = z.infer<typeof insertSeoPinSchema>;

export const seoInternalLinks = pgTable("seo_internal_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromArticleId: varchar("from_article_id").notNull(),
  toArticleId: varchar("to_article_id").notNull(),
  anchorText: text("anchor_text").notNull(),
  reason: text("reason").notNull(),
  placement: text("placement").notNull().default("body"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSeoInternalLinkSchema = createInsertSchema(seoInternalLinks).omit({ id: true, createdAt: true });
export type SeoInternalLink = typeof seoInternalLinks.$inferSelect;
export type InsertSeoInternalLink = z.infer<typeof insertSeoInternalLinkSchema>;

export const seoPublishQueue = pgTable("seo_publish_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull(),
  scheduledFor: timestamp("scheduled_for").notNull(),
  priority: integer("priority").notNull().default(50),
  status: text("status").notNull().default("queued"),
  blockedReason: text("blocked_reason"),
  siteContext: text("site_context").notNull().default("nursing"),
  careerTrack: text("career_track"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoPublishQueueSchema = createInsertSchema(seoPublishQueue).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoPublishQueueItem = typeof seoPublishQueue.$inferSelect;
export type InsertSeoPublishQueueItem = z.infer<typeof insertSeoPublishQueueSchema>;

export const qcRuns = pgTable("qc_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scope: text("scope").notNull(),
  clusterId: varchar("cluster_id"),
  articleId: varchar("article_id"),
  assetId: varchar("asset_id"),
  passed: boolean("passed").notNull(),
  errors: jsonb("errors").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQcRunSchema = createInsertSchema(qcRuns).omit({ id: true, createdAt: true });
export type QcRun = typeof qcRuns.$inferSelect;
export type InsertQcRun = z.infer<typeof insertQcRunSchema>;

export const seoPageTemplates = pgTable("seo_page_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateKey: text("template_key").notNull().unique(),
  name: text("name").notNull(),
  pageType: text("page_type").notNull(),
  sectionStructure: jsonb("section_structure").default(sql`'[]'::jsonb`),
  schemaMarkupType: text("schema_markup_type").notNull().default("Article"),
  metaTitlePattern: text("meta_title_pattern").notNull().default("{keyword} | NurseNest"),
  metaDescriptionPattern: text("meta_description_pattern").notNull().default("Learn about {keyword} with our comprehensive guide."),
  placeholderBlocks: jsonb("placeholder_blocks").default(sql`'[]'::jsonb`),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSeoPageTemplateSchema = createInsertSchema(seoPageTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type SeoPageTemplate = typeof seoPageTemplates.$inferSelect;
export type InsertSeoPageTemplate = z.infer<typeof insertSeoPageTemplateSchema>;

export const blogPostTemplates = pgTable("blog_post_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateKey: text("template_key").notNull().unique(),
  name: text("name").notNull(),
  layoutType: text("layout_type").notNull(),
  heroConfig: jsonb("hero_config").default(sql`'{}'::jsonb`),
  tocEnabled: boolean("toc_enabled").notNull().default(true),
  contentBlocks: jsonb("content_blocks").default(sql`'[]'::jsonb`),
  faqEnabled: boolean("faq_enabled").notNull().default(true),
  relatedPostsEnabled: boolean("related_posts_enabled").notNull().default(true),
  ctaConfig: jsonb("cta_config").default(sql`'{}'::jsonb`),
  seoMetaPatterns: jsonb("seo_meta_patterns").default(sql`'{}'::jsonb`),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostTemplateSchema = createInsertSchema(blogPostTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type BlogPostTemplate = typeof blogPostTemplates.$inferSelect;
export type InsertBlogPostTemplate = z.infer<typeof insertBlogPostTemplateSchema>;

export const pageViewsDaily = pgTable("page_views_daily", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  path: text("path").notNull(),
  count: integer("count").notNull().default(0),
}, (table) => [
  sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_pvd_date_path ON page_views_daily(date, path)`,
]);

export type PageViewDaily = typeof pageViewsDaily.$inferSelect;

export const dailyStudyGoals = pgTable("daily_study_goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  lessonsTarget: integer("lessons_target").default(3),
  lessonsCompleted: integer("lessons_completed").default(0),
  questionsTarget: integer("questions_target").default(10),
  questionsCompleted: integer("questions_completed").default(0),
  minutesTarget: integer("minutes_target").default(30),
  minutesCompleted: integer("minutes_completed").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDailyStudyGoalSchema = createInsertSchema(dailyStudyGoals).omit({ id: true, createdAt: true });
export type DailyStudyGoal = typeof dailyStudyGoals.$inferSelect;
export type InsertDailyStudyGoal = z.infer<typeof insertDailyStudyGoalSchema>;

export const confidenceRatings = pgTable("confidence_ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  questionId: varchar("question_id").notNull(),
  confidence: text("confidence").notNull(),
  wasCorrect: boolean("was_correct").default(false),
  topic: text("topic"),
  bodySystem: text("body_system"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConfidenceRatingSchema = createInsertSchema(confidenceRatings).omit({ id: true, createdAt: true });
export type ConfidenceRating = typeof confidenceRatings.$inferSelect;
export type InsertConfidenceRating = z.infer<typeof insertConfidenceRatingSchema>;

export const reviewQueue = pgTable("review_queue", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  itemType: text("item_type").notNull(),
  itemId: varchar("item_id").notNull(),
  reason: text("reason").notNull(),
  priority: integer("priority").default(1),
  scheduledDate: text("scheduled_date").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewQueueSchema = createInsertSchema(reviewQueue).omit({ id: true, createdAt: true });
export type ReviewQueueItem = typeof reviewQueue.$inferSelect;
export type InsertReviewQueueItem = z.infer<typeof insertReviewQueueSchema>;

export const flashcardReviews = pgTable("flashcard_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  cardId: varchar("card_id").notNull(),
  deckId: varchar("deck_id").notNull(),
  response: text("response").notNull(),
  interval: integer("interval").default(1),
  easeFactor: integer("ease_factor").default(250),
  repetitions: integer("repetitions").default(0),
  confidence: text("confidence").default("unsure"),
  nextReviewDate: text("next_review_date").notNull(),
  reviewedAt: timestamp("reviewed_at").defaultNow().notNull(),
});

export const insertFlashcardReviewSchema = createInsertSchema(flashcardReviews).omit({ id: true, reviewedAt: true });
export type FlashcardReview = typeof flashcardReviews.$inferSelect;
export type InsertFlashcardReview = z.infer<typeof insertFlashcardReviewSchema>;

export const testerInviteCodes = pgTable("tester_invite_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  maxUses: integer("max_uses").notNull().default(10),
  usedCount: integer("used_count").notNull().default(0),
  expiresAt: timestamp("expires_at"),
  notes: text("notes"),
  tier: text("tier").default("rn"),
  isActive: boolean("is_active").default(true),
  usedBy: text("used_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTesterInviteCodeSchema = createInsertSchema(testerInviteCodes).omit({
  id: true,
  usedCount: true,
  createdAt: true,
});
export type TesterInviteCode = typeof testerInviteCodes.$inferSelect;
export type InsertTesterInviteCode = z.infer<typeof insertTesterInviteCodeSchema>;

export const testerFeedback = pgTable("tester_feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  username: text("username"),
  category: text("category").notNull().default("general"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pageUrl: text("page_url"),
  severity: text("severity").default("medium"),
  status: text("status").default("new"),
  adminResponse: text("admin_response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTesterFeedbackSchema = createInsertSchema(testerFeedback).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type TesterFeedback = typeof testerFeedback.$inferSelect;
export type InsertTesterFeedback = z.infer<typeof insertTesterFeedbackSchema>;

export const imagingQuestions = pgTable("imaging_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctAnswer: varchar("correct_answer", { length: 1 }).notNull(),
  rationale: text("rationale").notNull(),
  modality: varchar("modality", { length: 100 }),
  bodyPart: varchar("body_part", { length: 100 }),
  category: varchar("category", { length: 100 }),
  difficulty: integer("difficulty").default(2),
  exam: varchar("exam", { length: 50 }),
  country: varchar("country", { length: 50 }),
  topic: varchar("topic", { length: 200 }),
  status: varchar("status", { length: 20 }).default("draft"),
  examDomain: varchar("exam_domain", { length: 100 }),
  masteryCategory: varchar("mastery_category", { length: 20 }),
  clinicalPearls: text("clinical_pearls"),
  imagingPracticeNotes: text("imaging_practice_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertImagingQuestionSchema = createInsertSchema(imagingQuestions).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingQuestion = typeof imagingQuestions.$inferSelect;
export type InsertImagingQuestion = z.infer<typeof insertImagingQuestionSchema>;

export const IMAGE_ASSET_CATEGORIES = [
  "positioning_diagram",
  "anatomy_diagram",
  "exam_image",
  "artifact_example",
  "quality_control_example",
  "comparison_image",
  "physics_visual",
  "lesson_illustration",
  "study_pack_cover",
  "thumbnail_preview",
] as const;

export const imageAssets = pgTable("image_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetType: text("asset_type").notNull().default("radiograph"),
  category: text("category").notNull().default("exam_image"),
  country: text("country").notNull().default("canada"),
  examType: text("exam_type"),
  modality: text("modality"),
  bodyRegion: text("body_region"),
  projection: text("projection"),
  title: text("title"),
  description: text("description"),
  teachingUrl: text("teaching_url"),
  examUrl: text("exam_url"),
  thumbnailUrl: text("thumbnail_url"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  relatedContentIds: text("related_content_ids").array().default(sql`'{}'::text[]`),
  approvalStatus: text("approval_status").notNull().default("pending"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImageAssetSchema = createInsertSchema(imageAssets).omit({ id: true, createdAt: true, updatedAt: true });
export type ImageAsset = typeof imageAssets.$inferSelect;
export type InsertImageAsset = z.infer<typeof insertImageAssetSchema>;

export const imagingFlashcards = pgTable("imaging_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  front: text("front").notNull(),
  back: text("back").notNull(),
  modality: varchar("modality", { length: 100 }),
  bodyPart: varchar("body_part", { length: 100 }),
  category: varchar("category", { length: 100 }),
  country: text("country").default("both"),
  examType: text("exam_type"),
  topic: text("topic"),
  difficulty: integer("difficulty").default(2),
  imageUrl: text("image_url"),
  status: varchar("status", { length: 20 }).default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const questionBank = pgTable("question_bank", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  rationale: text("rationale").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  examType: text("exam_type").notNull(),
  country: text("country").notNull(),
  questionType: text("question_type").notNull(),
  clientNeeds: text("client_needs").notNull(),
  topic: text("topic").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingFlashcardSchema = createInsertSchema(imagingFlashcards).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingFlashcard = typeof imagingFlashcards.$inferSelect;
export type InsertImagingFlashcard = z.infer<typeof insertImagingFlashcardSchema>;

export const imagingCaseStudies = pgTable("imaging_case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull().default("canada"),
  examType: text("exam_type").notNull().default("camrt"),
  title: text("title").notNull(),
  clinicalHistory: text("clinical_history").notNull(),
  findings: jsonb("findings").default(sql`'[]'::jsonb`),
  diagnosis: text("diagnosis"),
  discussionPoints: jsonb("discussion_points").default(sql`'[]'::jsonb`),
  imageRefs: text("image_refs").array().default(sql`'{}'::text[]`),
  difficulty: text("difficulty").default("medium"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingCaseStudySchema = createInsertSchema(imagingCaseStudies).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingCaseStudy = typeof imagingCaseStudies.$inferSelect;
export type InsertImagingCaseStudy = z.infer<typeof insertImagingCaseStudySchema>;

export const imagingExamAttempts = pgTable("imaging_exam_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  country: text("country").notNull().default("canada"),
  examType: text("exam_type").notNull().default("camrt"),
  totalQuestions: integer("total_questions").notNull(),
  score: integer("score"),
  timeSpent: integer("time_spent"),
  status: text("status").notNull().default("in_progress"),
  report: jsonb("report").default(sql`'{}'::jsonb`),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertImagingExamAttemptSchema = createInsertSchema(imagingExamAttempts).omit({ id: true, startedAt: true });
export type ImagingExamAttempt = typeof imagingExamAttempts.$inferSelect;
export type InsertImagingExamAttempt = z.infer<typeof insertImagingExamAttemptSchema>;

export const imagingExamAttemptQuestions = pgTable("imaging_exam_attempt_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attemptId: varchar("attempt_id").notNull(),
  questionId: varchar("question_id").notNull(),
  userAnswer: text("user_answer"),
  isCorrect: boolean("is_correct"),
  timeSpent: integer("time_spent"),
  flagged: boolean("flagged").default(false),
});

export const insertImagingExamAttemptQuestionSchema = createInsertSchema(imagingExamAttemptQuestions).omit({ id: true });
export type ImagingExamAttemptQuestion = typeof imagingExamAttemptQuestions.$inferSelect;
export type InsertImagingExamAttemptQuestion = z.infer<typeof insertImagingExamAttemptQuestionSchema>;

export const pharmtechLessons = pgTable("pharmtech_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  externalId: text("external_id").unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  summary: text("summary"),
  body: text("body").notNull().default(""),
  objectives: text("objectives").array().default(sql`'{}'::text[]`),
  keyPoints: text("key_points").array().default(sql`'{}'::text[]`),
  commonMistakes: text("common_mistakes").array().default(sql`'{}'::text[]`),
  relatedDeckSlugs: text("related_deck_slugs").array().default(sql`'{}'::text[]`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  published: boolean("published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPharmtechLessonSchema = createInsertSchema(pharmtechLessons).omit({ id: true, createdAt: true, updatedAt: true });
export type PharmtechLesson = typeof pharmtechLessons.$inferSelect;
export type InsertPharmtechLesson = z.infer<typeof insertPharmtechLessonSchema>;

export const pharmtechFlashcardDecks = pgTable("pharmtech_flashcard_decks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  externalId: text("external_id").unique(),
  title: text("title").notNull(),
  description: text("description").default(""),
  category: text("category").notNull(),
  lessonSlug: text("lesson_slug"),
  cardCount: integer("card_count").default(0),
  published: boolean("published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPharmtechFlashcardDeckSchema = createInsertSchema(pharmtechFlashcardDecks).omit({ id: true, createdAt: true, updatedAt: true, cardCount: true });
export type PharmtechFlashcardDeck = typeof pharmtechFlashcardDecks.$inferSelect;
export type InsertPharmtechFlashcardDeck = z.infer<typeof insertPharmtechFlashcardDeckSchema>;

export const pharmtechFlashcards = pgTable("pharmtech_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deckId: varchar("deck_id").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPharmtechFlashcardSchema = createInsertSchema(pharmtechFlashcards).omit({ id: true, createdAt: true });
export type PharmtechFlashcard = typeof pharmtechFlashcards.$inferSelect;
export type InsertPharmtechFlashcard = z.infer<typeof insertPharmtechFlashcardSchema>;

export const pharmtechQuestions = pgTable("pharmtech_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  externalId: text("external_id").unique(),
  stem: text("stem").notNull(),
  options: jsonb("options").notNull().default(sql`'[]'::jsonb`),
  correctIndex: integer("correct_index").notNull(),
  rationale: text("rationale").notNull(),
  category: text("category").notNull(),
  difficulty: integer("difficulty").notNull().default(2),
  lessonSlug: text("lesson_slug"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPharmtechQuestionSchema = createInsertSchema(pharmtechQuestions).omit({ id: true, createdAt: true });
export type PharmtechQuestion = typeof pharmtechQuestions.$inferSelect;
export type InsertPharmtechQuestion = z.infer<typeof insertPharmtechQuestionSchema>;

export const pharmtechExams = pgTable("pharmtech_exams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  externalId: text("external_id").unique(),
  title: text("title").notNull(),
  description: text("description").default(""),
  questionIds: text("question_ids").array().default(sql`'{}'::text[]`),
  timeLimitMinutes: integer("time_limit_minutes").default(60),
  passingScore: integer("passing_score").default(70),
  published: boolean("published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPharmtechExamSchema = createInsertSchema(pharmtechExams).omit({ id: true, createdAt: true });
export type PharmtechExam = typeof pharmtechExams.$inferSelect;
export type InsertPharmtechExam = z.infer<typeof insertPharmtechExamSchema>;

export const pharmtechExamAttempts = pgTable("pharmtech_exam_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  examId: varchar("exam_id").notNull(),
  mode: text("mode").notNull().default("timed"),
  answers: jsonb("answers").default(sql`'{}'::jsonb`),
  flagged: jsonb("flagged").default(sql`'[]'::jsonb`),
  score: integer("score"),
  totalQuestions: integer("total_questions").notNull(),
  timeSpentSeconds: integer("time_spent_seconds"),
  status: text("status").notNull().default("in_progress"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const pharmtechAdaptiveSessions = pgTable("pharmtech_adaptive_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  status: text("status").notNull().default("active"),
  totalAnswered: integer("total_answered").default(0),
  correctCount: integer("correct_count").default(0),
  currentDifficulty: integer("current_difficulty").default(3),
  responses: jsonb("responses").default(sql`'[]'::jsonb`),
  categoryStats: jsonb("category_stats").default(sql`'{}'::jsonb`),
  masteryLevels: jsonb("mastery_levels").default(sql`'{}'::jsonb`),
  weakAreas: jsonb("weak_areas").default(sql`'[]'::jsonb`),
  difficultyProgression: jsonb("difficulty_progression").default(sql`'[]'::jsonb`),
  settings: jsonb("settings").default(sql`'{}'::jsonb`),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const pharmtechMasteryHistory = pgTable("pharmtech_mastery_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  category: text("category").notNull(),
  totalAttempted: integer("total_attempted").default(0),
  totalCorrect: integer("total_correct").default(0),
  accuracy: doublePrecision("accuracy").default(0),
  masteryLevel: text("mastery_level").default("Beginner"),
  lastSessionId: varchar("last_session_id"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PharmtechAdaptiveSession = typeof pharmtechAdaptiveSessions.$inferSelect;
export type PharmtechMasteryHistory = typeof pharmtechMasteryHistory.$inferSelect;

export const imagingPositioningEntries = pgTable("imaging_positioning_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().default(""),
  projectionName: varchar("projection_name", { length: 200 }).notNull(),
  bodyPart: varchar("body_part", { length: 100 }).notNull(),
  bodyRegion: text("body_region").default(""),
  country: text("country").default("canada"),
  examRelevance: text("exam_relevance").default("medium"),
  patientPosition: text("patient_position").notNull(),
  bodyPartPosition: text("body_part_position"),
  centralRay: text("central_ray").notNull(),
  centralRayDirection: text("central_ray_direction"),
  filmSize: varchar("film_size", { length: 50 }),
  sid: varchar("sid", { length: 50 }),
  detectorPlacement: text("detector_placement"),
  collimationGuidance: text("collimation_guidance"),
  breathingInstructions: text("breathing_instructions"),
  technicalFactors: text("technical_factors"),
  anatomyDemonstrated: text("anatomy_demonstrated"),
  commonErrors: jsonb("common_errors").default(sql`'[]'::jsonb`),
  evaluationCriteria: text("evaluation_criteria"),
  clinicalNotes: text("clinical_notes"),
  tips: text("tips"),
  examTips: text("exam_tips"),
  imageUrl: text("image_url"),
  teachingImageUrl: text("teaching_image_url"),
  examImageUrl: text("exam_image_url"),
  positioningDiagramUrl: text("positioning_diagram_url"),
  incorrectImageUrl: text("incorrect_image_url"),
  positioningErrors: jsonb("positioning_errors").default(sql`'[]'::jsonb`),
  quizQuestions: jsonb("quiz_questions").default(sql`'[]'::jsonb`),
  labelOverlays: jsonb("label_overlays").default(sql`'[]'::jsonb`),
  learningSteps: jsonb("learning_steps").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  status: varchar("status", { length: 20 }).default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paramedicScenarios = pgTable("paramedic_scenarios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("General"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: integer("difficulty").notNull().default(3),
  examRelevance: text("exam_relevance").default("medium"),
  category: text("category").notNull().default("Medical Emergencies"),
  dispatchInfo: text("dispatch_info").notNull(),
  sceneDescription: text("scene_description").notNull(),
  sceneSafety: text("scene_safety").notNull(),
  primaryAssessment: text("primary_assessment").notNull(),
  secondaryAssessment: text("secondary_assessment").notNull(),
  vitalSigns: jsonb("vital_signs").notNull().default(sql`'{}'::jsonb`),
  history: jsonb("history").notNull().default(sql`'{}'::jsonb`),
  decisionPoints: jsonb("decision_points").notNull().default(sql`'[]'::jsonb`),
  correctInterventions: text("correct_interventions").array().default(sql`'{}'::text[]`),
  commonErrors: text("common_errors").array().default(sql`'{}'::text[]`),
  debrief: text("debrief").notNull().default(""),
  learningObjectives: text("learning_objectives").array().default(sql`'{}'::text[]`),
  relatedLessonSlugs: text("related_lesson_slugs").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingPositioningEntrySchema = createInsertSchema(imagingPositioningEntries).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingPositioningEntry = typeof imagingPositioningEntries.$inferSelect;
export type InsertImagingPositioningEntry = z.infer<typeof insertImagingPositioningEntrySchema>;

export const imagingPhysicsTopics = pgTable("imaging_physics_topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 300 }).notNull(),
  slug: text("slug").notNull().default(""),
  content: text("content").notNull(),
  explanation: text("explanation"),
  category: varchar("category", { length: 100 }),
  modality: varchar("modality", { length: 100 }),
  country: text("country").default("both"),
  examType: text("exam_type"),
  keyConcepts: text("key_concepts").array().default(sql`'{}'::text[]`),
  formulas: jsonb("formulas").default(sql`'[]'::jsonb`),
  examTraps: jsonb("exam_traps").default(sql`'[]'::jsonb`),
  memoryAid: text("memory_aid"),
  clinicalRelevance: text("clinical_relevance"),
  factorRelationships: jsonb("factor_relationships").default(sql`'[]'::jsonb`),
  diagramConfig: jsonb("diagram_config").default(sql`'{}'::jsonb`),
  quizItems: jsonb("quiz_items").default(sql`'[]'::jsonb`),
  difficulty: integer("difficulty").default(2),
  sortOrder: integer("sort_order").default(0),
  status: varchar("status", { length: 20 }).default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertImagingPhysicsTopicSchema = createInsertSchema(imagingPhysicsTopics).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingPhysicsTopic = typeof imagingPhysicsTopics.$inferSelect;
export type InsertImagingPhysicsTopic = z.infer<typeof insertImagingPhysicsTopicSchema>;

export const insertQuestionBankSchema = createInsertSchema(questionBank).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type QuestionBankItem = typeof questionBank.$inferSelect;
export type InsertQuestionBankItem = z.infer<typeof insertQuestionBankSchema>;

export const insertParamedicScenarioSchema = createInsertSchema(paramedicScenarios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ParamedicScenario = typeof paramedicScenarios.$inferSelect;
export type InsertParamedicScenario = z.infer<typeof insertParamedicScenarioSchema>;

export const questionBankResults = pgTable("question_bank_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  mode: text("mode").notNull(),
  examType: text("exam_type").notNull(),
  country: text("country").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctCount: integer("correct_count").notNull(),
  timeSpent: integer("time_spent"),
  answers: jsonb("answers").default(sql`'[]'::jsonb`),
  categoryBreakdown: jsonb("category_breakdown").default(sql`'{}'::jsonb`),
  difficultyBreakdown: jsonb("difficulty_breakdown").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuestionBankResultSchema = createInsertSchema(questionBankResults).omit({
  id: true,
  createdAt: true,
});

export type QuestionBankResult = typeof questionBankResults.$inferSelect;
export type InsertQuestionBankResult = z.infer<typeof insertQuestionBankResultSchema>;

export const mltDisciplines = pgTable("mlt_disciplines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  label: text("label").notNull(),
  shortLabel: text("short_label"),
  icon: text("icon"),
  colorHex: text("color_hex"),
  description: text("description"),
  subdisciplines: jsonb("subdisciplines").default(sql`'[]'::jsonb`),
  blueprintCategoriesCanada: jsonb("blueprint_categories_canada").default(sql`'[]'::jsonb`),
  blueprintCategoriesUsa: jsonb("blueprint_categories_usa").default(sql`'[]'::jsonb`),
  sortOrder: integer("sort_order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltDisciplineSchema = createInsertSchema(mltDisciplines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type MltDiscipline = typeof mltDisciplines.$inferSelect;
export type InsertMltDiscipline = z.infer<typeof insertMltDisciplineSchema>;

export const mltQuestions = pgTable("mlt_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryTrack: text("country_track").notNull().default("both"),
  examTrack: text("exam_track").notNull().default("both"),
  discipline: text("discipline").notNull(),
  subdiscipline: text("subdiscipline"),
  blueprintCategory: text("blueprint_category"),
  difficulty: text("difficulty").notNull().default("intermediate"),
  cognitiveLevel: text("cognitive_level").notNull().default("application"),
  stem: text("stem").notNull(),
  options: jsonb("options").notNull().default(sql`'[]'::jsonb`),
  correctAnswer: text("correct_answer").notNull(),
  rationale: text("rationale").notNull(),
  distractorRationales: jsonb("distractor_rationales").default(sql`'{}'::jsonb`),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  adaptiveEligible: boolean("adaptive_eligible").default(true),
  examEligible: boolean("exam_eligible").default(true),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  imageCaption: text("image_caption"),
  hasImageStimulus: boolean("has_image_stimulus").default(false),
  references: text("references").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltQuestionSchema = createInsertSchema(mltQuestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type MltQuestion = typeof mltQuestions.$inferSelect;
export type InsertMltQuestion = z.infer<typeof insertMltQuestionSchema>;

export const mltFlashcards = pgTable("mlt_flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  discipline: text("discipline").notNull(),
  countryTrack: text("country_track").notNull().default("both"),
  deckTitle: text("deck_title").notNull(),
  cardType: text("card_type").notNull().default("term-definition"),
  front: text("front").notNull(),
  back: text("back").notNull(),
  hint: text("hint"),
  mnemonic: text("mnemonic"),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  difficulty: text("difficulty").default("intermediate"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltFlashcardSchema = createInsertSchema(mltFlashcards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type MltFlashcard = typeof mltFlashcards.$inferSelect;
export type InsertMltFlashcard = z.infer<typeof insertMltFlashcardSchema>;

export const mltLessons = pgTable("mlt_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  moduleTitle: text("module_title").notNull(),
  topicTitle: text("topic_title").notNull(),
  discipline: text("discipline").notNull(),
  disciplines: text("disciplines").array().default(sql`'{}'::text[]`),
  countryTrack: text("country_track").notNull().default("both"),
  difficulty: text("difficulty").default("intermediate"),
  blueprintCategories: text("blueprint_categories").array().default(sql`'{}'::text[]`),
  content: jsonb("content").default(sql`'[]'::jsonb`),
  summary: text("summary"),
  objectives: text("objectives").array().default(sql`'{}'::text[]`),
  glossaryTerms: jsonb("glossary_terms").default(sql`'[]'::jsonb`),
  endOfLessonQuizId: varchar("end_of_lesson_quiz_id"),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  estimatedMinutes: integer("estimated_minutes").default(15),
  sortOrder: integer("sort_order").default(0),
  tier: text("tier").default("free"),
  status: text("status").default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltLessonSchema = createInsertSchema(mltLessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type MltLesson = typeof mltLessons.$inferSelect;
export type InsertMltLesson = z.infer<typeof insertMltLessonSchema>;

export const mltStudyPlans = pgTable("mlt_study_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  countryTrack: text("country_track").notNull().default("both"),
  examTrack: text("exam_track").notNull().default("both"),
  durationWeeks: integer("duration_weeks").notNull().default(8),
  difficulty: text("difficulty").default("intermediate"),
  weeklyPlan: jsonb("weekly_plan").default(sql`'[]'::jsonb`),
  checkpoints: jsonb("checkpoints").default(sql`'[]'::jsonb`),
  resourceLinks: jsonb("resource_links").default(sql`'[]'::jsonb`),
  disciplines: text("disciplines").array().default(sql`'{}'::text[]`),
  description: text("description"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltStudyPlanSchema = createInsertSchema(mltStudyPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type MltStudyPlan = typeof mltStudyPlans.$inferSelect;
export type InsertMltStudyPlan = z.infer<typeof insertMltStudyPlanSchema>;

export const paramedicTopicPages = pgTable("paramedic_topic_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("paramedic"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: text("difficulty").default("intermediate"),
  examRelevance: text("exam_relevance").default("medium"),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  targetKeyword: text("target_keyword"),
  secondaryKeywords: text("secondary_keywords").array().default(sql`'{}'::text[]`),
  categoryId: varchar("category_id"),
  sections: jsonb("sections").default(sql`'[]'::jsonb`),
  faq: jsonb("faq").default(sql`'[]'::jsonb`),
  examTips: jsonb("exam_tips").default(sql`'[]'::jsonb`),
  clinicalPearls: jsonb("clinical_pearls").default(sql`'[]'::jsonb`),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  isCornerstone: boolean("is_cornerstone").default(false),
  isNoindex: boolean("is_noindex").default(false),
  wordCount: integer("word_count").default(0),
  manualLinks: jsonb("manual_links").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertParamedicTopicPageSchema = createInsertSchema(paramedicTopicPages).omit({ id: true, createdAt: true, updatedAt: true });
export type ParamedicTopicPage = typeof paramedicTopicPages.$inferSelect;
export type InsertParamedicTopicPage = z.infer<typeof insertParamedicTopicPageSchema>;

export const paramedicCategoryPages = pgTable("paramedic_category_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("paramedic"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: text("difficulty").default("intermediate"),
  examRelevance: text("exam_relevance").default("medium"),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  description: text("description"),
  heroImage: text("hero_image"),
  featuredTopicIds: text("featured_topic_ids").array().default(sql`'{}'::text[]`),
  sortOrder: integer("sort_order").default(0),
  isCornerstone: boolean("is_cornerstone").default(false),
  isNoindex: boolean("is_noindex").default(false),
  manualLinks: jsonb("manual_links").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertParamedicCategoryPageSchema = createInsertSchema(paramedicCategoryPages).omit({ id: true, createdAt: true, updatedAt: true });
export type ParamedicCategoryPage = typeof paramedicCategoryPages.$inferSelect;
export type InsertParamedicCategoryPage = z.infer<typeof insertParamedicCategoryPageSchema>;

export const paramedicGlossaryEntries = pgTable("paramedic_glossary_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("paramedic"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: text("difficulty").default("beginner"),
  examRelevance: text("exam_relevance").default("medium"),
  status: text("status").notNull().default("draft"),
  term: text("term").notNull(),
  slug: text("slug").notNull().unique(),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  definition: text("definition").notNull().default(""),
  extendedDescription: text("extended_description"),
  abbreviation: text("abbreviation"),
  relatedTermSlugs: text("related_term_slugs").array().default(sql`'{}'::text[]`),
  categoryId: varchar("category_id"),
  usageExamples: jsonb("usage_examples").default(sql`'[]'::jsonb`),
  isCornerstone: boolean("is_cornerstone").default(false),
  isNoindex: boolean("is_noindex").default(false),
  manualLinks: jsonb("manual_links").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertParamedicGlossaryEntrySchema = createInsertSchema(paramedicGlossaryEntries).omit({ id: true, createdAt: true, updatedAt: true });
export type ParamedicGlossaryEntry = typeof paramedicGlossaryEntries.$inferSelect;
export type InsertParamedicGlossaryEntry = z.infer<typeof insertParamedicGlossaryEntrySchema>;

export const paramedicComparisonPages = pgTable("paramedic_comparison_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("paramedic"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: text("difficulty").default("intermediate"),
  examRelevance: text("exam_relevance").default("high"),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  itemA: text("item_a").notNull().default(""),
  itemB: text("item_b").notNull().default(""),
  comparisonPoints: jsonb("comparison_points").default(sql`'[]'::jsonb`),
  summary: text("summary"),
  faq: jsonb("faq").default(sql`'[]'::jsonb`),
  categoryId: varchar("category_id"),
  isCornerstone: boolean("is_cornerstone").default(false),
  isNoindex: boolean("is_noindex").default(false),
  manualLinks: jsonb("manual_links").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertParamedicComparisonPageSchema = createInsertSchema(paramedicComparisonPages).omit({ id: true, createdAt: true, updatedAt: true });
export type ParamedicComparisonPage = typeof paramedicComparisonPages.$inferSelect;
export type InsertParamedicComparisonPage = z.infer<typeof insertParamedicComparisonPageSchema>;

export const paramedicStudyGuides = pgTable("paramedic_study_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  professionTrack: text("profession_track").notNull().default("paramedic"),
  region: text("region").default("BOTH"),
  visibilityTier: text("visibility_tier").default("free"),
  difficulty: text("difficulty").default("intermediate"),
  examRelevance: text("exam_relevance").default("high"),
  status: text("status").notNull().default("draft"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  estimatedMinutes: integer("estimated_minutes").default(30),
  objectives: jsonb("objectives").default(sql`'[]'::jsonb`),
  sections: jsonb("sections").default(sql`'[]'::jsonb`),
  checklist: jsonb("checklist").default(sql`'[]'::jsonb`),
  faq: jsonb("faq").default(sql`'[]'::jsonb`),
  miniQuiz: jsonb("mini_quiz").default(sql`'[]'::jsonb`),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  categoryId: varchar("category_id"),
  isCornerstone: boolean("is_cornerstone").default(false),
  isNoindex: boolean("is_noindex").default(false),
  manualLinks: jsonb("manual_links").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

export const insertParamedicStudyGuideSchema = createInsertSchema(paramedicStudyGuides).omit({ id: true, createdAt: true, updatedAt: true });
export type ParamedicStudyGuide = typeof paramedicStudyGuides.$inferSelect;
export type InsertParamedicStudyGuide = z.infer<typeof insertParamedicStudyGuideSchema>;

export const mltImportHistory = pgTable("mlt_import_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  importType: text("import_type").notNull(),
  fileName: text("file_name"),
  totalRows: integer("total_rows").notNull().default(0),
  successCount: integer("success_count").notNull().default(0),
  errorCount: integer("error_count").notNull().default(0),
  warningCount: integer("warning_count").notNull().default(0),
  duplicateCount: integer("duplicate_count").notNull().default(0),
  importedIds: jsonb("imported_ids").default(sql`'[]'::jsonb`),
  errors: jsonb("errors").default(sql`'[]'::jsonb`),
  warnings: jsonb("warnings").default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("completed"),
  importedBy: varchar("imported_by"),
  rolledBack: boolean("rolled_back").default(false),
  rolledBackAt: timestamp("rolled_back_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltImportHistorySchema = createInsertSchema(mltImportHistory).omit({
  id: true,
  createdAt: true,
});

export type MltImportHistory = typeof mltImportHistory.$inferSelect;
export type InsertMltImportHistory = z.infer<typeof insertMltImportHistorySchema>;

export const mltGenerationBatches = pgTable("mlt_generation_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryTrack: text("country_track").notNull().default("both"),
  requestedCount: integer("requested_count").notNull(),
  generatedCount: integer("generated_count").default(0),
  acceptedCount: integer("accepted_count").default(0),
  rejectedCount: integer("rejected_count").default(0),
  tokensUsed: integer("tokens_used").default(0),
  discipline: text("discipline"),
  disciplineBreakdown: jsonb("discipline_breakdown"),
  difficultyBreakdown: jsonb("difficulty_breakdown"),
  cognitiveBreakdown: jsonb("cognitive_breakdown"),
  rejectionReasons: jsonb("rejection_reasons"),
  status: text("status").default("running"),
  errorMessage: text("error_message"),
  triggeredBy: text("triggered_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertMltGenerationBatchSchema = createInsertSchema(mltGenerationBatches).omit({
  id: true,
  createdAt: true,
});

export type MltGenerationBatch = typeof mltGenerationBatches.$inferSelect;
export type InsertMltGenerationBatch = z.infer<typeof insertMltGenerationBatchSchema>;

export const insertPharmtechExamAttemptSchema = createInsertSchema(pharmtechExamAttempts).omit({ id: true, startedAt: true });
export type PharmtechExamAttempt = typeof pharmtechExamAttempts.$inferSelect;
export type InsertPharmtechExamAttempt = z.infer<typeof insertPharmtechExamAttemptSchema>;

export const mltLabImages = pgTable("mlt_lab_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  optimizedUrl: text("optimized_url"),
  altText: text("alt_text"),
  caption: text("caption"),
  imageType: text("image_type").notNull().default("hematology_cell_morphology"),
  discipline: text("discipline").notNull().default("hematology"),
  specimen: text("specimen"),
  stainType: text("stain_type"),
  organism: text("organism"),
  cellType: text("cell_type"),
  crystalType: text("crystal_type"),
  castType: text("cast_type"),
  artifactType: text("artifact_type"),
  annotationData: jsonb("annotation_data").default(sql`'[]'::jsonb`),
  copyrightInfo: text("copyright_info"),
  licenseType: text("license_type").default("internal"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  approvalExam: boolean("approval_exam").default(false),
  approvalLesson: boolean("approval_lesson").default(false),
  approvalFlashcard: boolean("approval_flashcard").default(false),
  approvalPublic: boolean("approval_public").default(false),
  qualityScore: integer("quality_score").default(0),
  magnification: text("magnification"),
  normalAbnormal: text("normal_abnormal").default("abnormal"),
  clinicalSignificance: text("clinical_significance"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  width: integer("width"),
  height: integer("height"),
  mimeType: text("mime_type"),
  uploadedBy: text("uploaded_by"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const caseStudies = pgTable("case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  tier: text("tier").notNull().default("rpn"),
  difficulty: text("difficulty").notNull().default("moderate"),
  bodySystem: text("body_system"),
  category: text("category"),
  scenarioIntro: text("scenario_intro").notNull(),
  status: text("status").notNull().default("draft"),
  regionScope: text("region_scope").default("BOTH"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltLabImageSchema = createInsertSchema(mltLabImages).omit({ id: true, createdAt: true, updatedAt: true });
export type MltLabImage = typeof mltLabImages.$inferSelect;
export type InsertMltLabImage = z.infer<typeof insertMltLabImageSchema>;

export const mltLabImageLinks = pgTable("mlt_lab_image_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageId: varchar("image_id").notNull(),
  linkedType: text("linked_type").notNull(),
  linkedId: varchar("linked_id").notNull(),
  role: text("role").default("primary"),
  layoutType: text("layout_type").default("single"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltLabImageLinkSchema = createInsertSchema(mltLabImageLinks).omit({ id: true, createdAt: true });
export type MltLabImageLink = typeof mltLabImageLinks.$inferSelect;
export type InsertMltLabImageLink = z.infer<typeof insertMltLabImageLinkSchema>;

export const mltImageDrillAttempts = pgTable("mlt_image_drill_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  drillType: text("drill_type").notNull(),
  discipline: text("discipline").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctCount: integer("correct_count").default(0),
  timeSpent: integer("time_spent"),
  answers: jsonb("answers").default(sql`'[]'::jsonb`),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltImageDrillAttemptSchema = createInsertSchema(mltImageDrillAttempts).omit({ id: true, createdAt: true });
export type MltImageDrillAttempt = typeof mltImageDrillAttempts.$inferSelect;
export type InsertMltImageDrillAttempt = z.infer<typeof insertMltImageDrillAttemptSchema>;

export const mltWrongAnswers = pgTable("mlt_wrong_answers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  questionId: varchar("question_id").notNull(),
  discipline: text("discipline").notNull(),
  subdiscipline: text("subdiscipline"),
  selectedAnswer: text("selected_answer").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  stem: text("stem").notNull(),
  rationale: text("rationale"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  reviewed: boolean("reviewed").default(false),
  bookmarked: boolean("bookmarked").default(false),
  retryCount: integer("retry_count").default(0),
  lastRetryCorrect: boolean("last_retry_correct"),
  sourceType: text("source_type").default("practice"),
  sourceId: varchar("source_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltWrongAnswerSchema = createInsertSchema(mltWrongAnswers).omit({ id: true, createdAt: true });
export type MltWrongAnswer = typeof mltWrongAnswers.$inferSelect;
export type InsertMltWrongAnswer = z.infer<typeof insertMltWrongAnswerSchema>;

export const mltRemediationLinks = pgTable("mlt_remediation_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceType: text("source_type").notNull(),
  sourceId: varchar("source_id").notNull(),
  targetType: text("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  discipline: text("discipline").notNull(),
  topic: text("topic"),
  subtopic: text("subtopic"),
  relevanceScore: doublePrecision("relevance_score").default(0),
  matchType: text("match_type").default("auto"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  adminOverride: boolean("admin_override").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltRemediationLinkSchema = createInsertSchema(mltRemediationLinks).omit({ id: true, createdAt: true });
export type MltRemediationLink = typeof mltRemediationLinks.$inferSelect;
export type InsertMltRemediationLink = z.infer<typeof insertMltRemediationLinkSchema>;

export const mltBlogPosts = pgTable("mlt_blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: jsonb("content").default(sql`'[]'::jsonb`),
  discipline: text("discipline"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  countryTrack: text("country_track").default("both"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  relatedFlashcardIds: text("related_flashcard_ids").array().default(sql`'{}'::text[]`),
  readTime: integer("read_time").default(5),
  authorName: text("author_name"),
  featuredImage: text("featured_image"),
  status: text("status").default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltBlogPostSchema = createInsertSchema(mltBlogPosts).omit({ id: true, createdAt: true, updatedAt: true });
export type MltBlogPost = typeof mltBlogPosts.$inferSelect;
export type InsertMltBlogPost = z.infer<typeof insertMltBlogPostSchema>;

export const mltAnalyticsEvents = pgTable("mlt_analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  sessionId: text("session_id"),
  eventType: text("event_type").notNull(),
  eventCategory: text("event_category").notNull(),
  eventAction: text("event_action").notNull(),
  eventLabel: text("event_label"),
  eventValue: integer("event_value"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  page: text("page"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltAnalyticsEventSchema = createInsertSchema(mltAnalyticsEvents).omit({ id: true, createdAt: true });
export type MltAnalyticsEvent = typeof mltAnalyticsEvents.$inferSelect;
export type InsertMltAnalyticsEvent = z.infer<typeof insertMltAnalyticsEventSchema>;

export const MLT_IMAGE_TYPES = [
  "hematology_cell_morphology",
  "microbiology_gram_stain",
  "microbiology_colony_morphology",
  "urinalysis_sediment",
  "urinalysis_chemical",
  "blood_bank_reactions",
  "blood_bank_antibody_panel",
  "clinical_chemistry_qc",
  "clinical_chemistry_electrophoresis",
  "coagulation",
  "parasitology",
  "mycology",
  "body_fluid_analysis",
  "immunology_serology",
  "molecular_diagnostics",
  "specimen_processing",
] as const;

export const MLT_DISCIPLINES = [
  "hematology",
  "microbiology",
  "urinalysis",
  "blood_banking",
  "clinical_chemistry",
  "coagulation",
  "parasitology",
  "mycology",
  "body_fluids",
  "immunology",
  "molecular",
  "specimen_processing",
] as const;

export const MLT_DRILL_TYPES = [
  "identify_cell",
  "identify_organism",
  "identify_crystal",
  "identify_cast",
  "identify_artifact",
  "identify_stain",
  "identify_colony",
  "identify_reaction",
  "qc_issue",
  "specimen_rejection",
] as const;

export const mltExamSessions = pgTable("mlt_exam_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  mode: text("mode").notNull(),
  country: text("country").notNull(),
  subMode: text("sub_mode"),
  practiceMode: text("practice_mode"),
  totalQuestions: integer("total_questions").notNull(),
  timeLimit: integer("time_limit").notNull(),
  status: text("status").notNull().default("in_progress"),
  score: integer("score"),
  correctCount: integer("correct_count"),
  abilityEstimate: doublePrecision("ability_estimate").default(0),
  abilityHistory: jsonb("ability_history").default(sql`'[]'::jsonb`),
  responseHistory: jsonb("response_history").default(sql`'[]'::jsonb`),
  questionIds: jsonb("question_ids").default(sql`'[]'::jsonb`),
  flaggedIds: jsonb("flagged_ids").default(sql`'[]'::jsonb`),
  coverageAchieved: jsonb("coverage_achieved").default(sql`'{}'::jsonb`),
  weakAreaMap: jsonb("weak_area_map").default(sql`'{}'::jsonb`),
  strongAreaMap: jsonb("strong_area_map").default(sql`'{}'::jsonb`),
  stabilityScore: doublePrecision("stability_score").default(1),
  catParams: jsonb("cat_params"),
  report: jsonb("report"),
  topics: text("topics").array().default(sql`'{}'::text[]`),
  currentIndex: integer("current_index").default(0),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertMltExamSessionSchema = createInsertSchema(mltExamSessions).omit({
  id: true,
  startedAt: true,
});
export type MltExamSession = typeof mltExamSessions.$inferSelect;
export type InsertMltExamSession = z.infer<typeof insertMltExamSessionSchema>;

export const mltCatSettings = pgTable("mlt_cat_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  minQuestions: integer("min_questions").default(60),
  maxQuestions: integer("max_questions").default(130),
  timeLimit: integer("time_limit").default(150),
  stabilityThreshold: doublePrecision("stability_threshold").default(0.3),
  exposureMax: doublePrecision("exposure_max").default(0.25),
  contentTargets: jsonb("content_targets").default(sql`'{}'::jsonb`),
  abilityCapPerQuestion: doublePrecision("ability_cap_per_question").default(0.5),
  rapidGuessThresholdMs: integer("rapid_guess_threshold_ms").default(3000),
  noBacktracking: boolean("no_backtracking").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type MltCatSettings = typeof mltCatSettings.$inferSelect;
export const insertMltCatSettingsSchema = createInsertSchema(mltCatSettings).omit({ id: true, updatedAt: true });
export type InsertMltCatSettings = z.infer<typeof insertMltCatSettingsSchema>;

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({ id: true, createdAt: true, updatedAt: true });
export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;

export const caseStudySteps = pgTable("case_study_steps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caseId: varchar("case_id").notNull(),
  stepNumber: integer("step_number").notNull(),
  clinicalUpdateText: text("clinical_update_text").notNull(),
  exhibitData: jsonb("exhibit_data").default(sql`'{}'::jsonb`),
});

export const insertCaseStudyStepSchema = createInsertSchema(caseStudySteps).omit({ id: true });
export type CaseStudyStep = typeof caseStudySteps.$inferSelect;
export type InsertCaseStudyStep = z.infer<typeof insertCaseStudyStepSchema>;

export const caseStudyQuestions = pgTable("case_study_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caseStepId: varchar("case_step_id").notNull(),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull().default("multiple_choice"),
  answerOptions: jsonb("answer_options").default(sql`'[]'::jsonb`),
  correctAnswer: jsonb("correct_answer").default(sql`'[]'::jsonb`),
  rationale: text("rationale"),
  points: integer("points").default(1),
});

export const insertCaseStudyQuestionSchema = createInsertSchema(caseStudyQuestions).omit({ id: true });
export type CaseStudyQuestion = typeof caseStudyQuestions.$inferSelect;
export type InsertCaseStudyQuestion = z.infer<typeof insertCaseStudyQuestionSchema>;

export const paramedicBulkImports = pgTable("paramedic_bulk_imports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentType: text("content_type").notNull(),
  inputFormat: text("input_format").notNull(),
  totalItems: integer("total_items").notNull().default(0),
  validItems: integer("valid_items").default(0),
  errorItems: integer("error_items").default(0),
  publishedItems: integer("published_items").default(0),
  status: text("status").default("draft"),
  mappingTemplate: jsonb("mapping_template"),
  validationResults: jsonb("validation_results"),
  adminId: varchar("admin_id"),
  adminName: text("admin_name"),
  rollbackData: jsonb("rollback_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const paramedicBulkImportItems = pgTable("paramedic_bulk_import_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  importId: varchar("import_id").notNull(),
  rowIndex: integer("row_index").notNull(),
  contentType: text("content_type").notNull(),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  rawData: jsonb("raw_data").notNull(),
  mappedData: jsonb("mapped_data"),
  normalizedData: jsonb("normalized_data"),
  validationStatus: text("validation_status").default("pending"),
  validationErrors: jsonb("validation_errors"),
  publishedId: varchar("published_id"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paramedicFieldMappingTemplates = pgTable("paramedic_field_mapping_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  contentType: text("content_type").notNull(),
  mappings: jsonb("mappings").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertParamedicBulkImportSchema = createInsertSchema(paramedicBulkImports).omit({ id: true, createdAt: true });
export const insertParamedicBulkImportItemSchema = createInsertSchema(paramedicBulkImportItems).omit({ id: true, createdAt: true });
export const insertParamedicFieldMappingTemplateSchema = createInsertSchema(paramedicFieldMappingTemplates).omit({ id: true, createdAt: true });

export type ParamedicBulkImport = typeof paramedicBulkImports.$inferSelect;
export type InsertParamedicBulkImport = z.infer<typeof insertParamedicBulkImportSchema>;
export type ParamedicBulkImportItem = typeof paramedicBulkImportItems.$inferSelect;
export type InsertParamedicBulkImportItem = z.infer<typeof insertParamedicBulkImportItemSchema>;
export type ParamedicFieldMappingTemplate = typeof paramedicFieldMappingTemplates.$inferSelect;
export type InsertParamedicFieldMappingTemplate = z.infer<typeof insertParamedicFieldMappingTemplateSchema>;

export const paramedicWaveformAssets = pgTable("paramedic_waveform_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  waveformType: text("waveform_type").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  svgPathData: jsonb("svg_path_data").notNull(),
  clinicalAnnotations: jsonb("clinical_annotations").default(sql`'{}'::jsonb`),
  identifyingFeatures: text("identifying_features").array().default(sql`'{}'::text[]`),
  associatedConditions: text("associated_conditions").array().default(sql`'{}'::text[]`),
  treatmentNotes: text("treatment_notes"),
  rate: text("rate"),
  regularity: text("regularity"),
  clinicalSignificance: text("clinical_significance"),
  difficulty: text("difficulty").default("beginner"),
  visibilityTier: text("visibility_tier").default("free"),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertParamedicWaveformAssetSchema = createInsertSchema(paramedicWaveformAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ParamedicWaveformAsset = typeof paramedicWaveformAssets.$inferSelect;
export type InsertParamedicWaveformAsset = z.infer<typeof insertParamedicWaveformAssetSchema>;

export const mltContentLinks = pgTable("mlt_content_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull(),
  primaryLessonId: varchar("primary_lesson_id"),
  relatedLessonIds: jsonb("related_lesson_ids").default(sql`'[]'::jsonb`),
  primaryDeckId: varchar("primary_deck_id"),
  relatedDeckIds: jsonb("related_deck_ids").default(sql`'[]'::jsonb`),
  remediationLessonId: varchar("remediation_lesson_id"),
  remediationDeckId: varchar("remediation_deck_id"),
  autoLinkScore: integer("auto_link_score").default(0),
  manuallyCurated: boolean("manually_curated").default(false),
  curatedBy: varchar("curated_by"),
  curatedAt: timestamp("curated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMltContentLinkSchema = createInsertSchema(mltContentLinks).omit({ id: true, createdAt: true, updatedAt: true });
export type MltContentLink = typeof mltContentLinks.$inferSelect;
export type InsertMltContentLink = z.infer<typeof insertMltContentLinkSchema>;

export const mltRemediationAnalytics = pgTable("mlt_remediation_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  questionId: varchar("question_id").notNull(),
  contentType: text("content_type").notNull(),
  contentId: varchar("content_id").notNull(),
  action: text("action").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMltRemediationAnalyticsSchema = createInsertSchema(mltRemediationAnalytics).omit({ id: true, createdAt: true });
export type MltRemediationAnalytic = typeof mltRemediationAnalytics.$inferSelect;
export type InsertMltRemediationAnalytic = z.infer<typeof insertMltRemediationAnalyticsSchema>;

export const paramedicExamSessions = pgTable("paramedic_exam_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  contentDomain: text("content_domain").notNull().default("paramedic"),
  mode: text("mode").notNull(),
  examType: text("exam_type").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timeLimit: integer("time_limit"),
  status: text("status").notNull().default("in_progress"),
  currentIndex: integer("current_index").default(0),
  score: integer("score"),
  correctCount: integer("correct_count"),
  questionIds: jsonb("question_ids").default(sql`'[]'::jsonb`),
  answers: jsonb("answers").default(sql`'{}'::jsonb`),
  flaggedIds: jsonb("flagged_ids").default(sql`'[]'::jsonb`),
  questionMeta: jsonb("question_meta").default(sql`'[]'::jsonb`),
  abilityEstimate: doublePrecision("ability_estimate").default(0),
  drillTopic: text("drill_topic"),
  drillStreak: integer("drill_streak").default(0),
  drillBestStreak: integer("drill_best_streak").default(0),
  report: jsonb("report"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertParamedicExamSessionSchema = createInsertSchema(paramedicExamSessions).omit({
  id: true,
  startedAt: true,
});
export type ParamedicExamSession = typeof paramedicExamSessions.$inferSelect;
export type InsertParamedicExamSession = z.infer<typeof insertParamedicExamSessionSchema>;

export const pharmtechStudyPlans = pgTable("pharmtech_study_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  examDate: timestamp("exam_date"),
  daysPerWeek: integer("days_per_week").default(5),
  minutesPerSession: integer("minutes_per_session").default(30),
  pace: text("pace").default("balanced"),
  learningStyle: text("learning_style").default("mixed"),
  weakAreas: jsonb("weak_areas").default(sql`'[]'::jsonb`),
  useAdaptiveResults: boolean("use_adaptive_results").default(false),
  presetType: text("preset_type"),
  schedule: jsonb("schedule").default(sql`'[]'::jsonb`),
  progressPercent: integer("progress_percent").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPharmtechStudyPlanSchema = createInsertSchema(pharmtechStudyPlans).omit({ id: true, createdAt: true, updatedAt: true, progressPercent: true });
export type PharmtechStudyPlan = typeof pharmtechStudyPlans.$inferSelect;
export type InsertPharmtechStudyPlan = z.infer<typeof insertPharmtechStudyPlanSchema>;

export const pharmtechStudyPlanTasks = pgTable("pharmtech_study_plan_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planId: varchar("plan_id").notNull(),
  weekNum: integer("week_num").notNull(),
  dayNum: integer("day_num").notNull(),
  phase: text("phase").notNull(),
  taskType: text("task_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  linkUrl: text("link_url"),
  estimatedMinutes: integer("estimated_minutes").default(15),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  skipped: boolean("skipped").default(false),
  rescheduledTo: text("rescheduled_to"),
  sortOrder: integer("sort_order").default(0),
});

export const insertPharmtechStudyPlanTaskSchema = createInsertSchema(pharmtechStudyPlanTasks).omit({ id: true, completedAt: true });
export type PharmtechStudyPlanTask = typeof pharmtechStudyPlanTasks.$inferSelect;
export type InsertPharmtechStudyPlanTask = z.infer<typeof insertPharmtechStudyPlanTaskSchema>;

export const imagingExamSessions = pgTable("imaging_exam_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  country: text("country").notNull().default("canada"),
  examType: text("exam_type").notNull().default("camrt"),
  mode: text("mode").notNull().default("adaptive"),
  examLength: integer("exam_length").notNull().default(50),
  totalQuestions: integer("total_questions").notNull(),
  currentIndex: integer("current_index").default(0),
  currentDifficulty: doublePrecision("current_difficulty").default(3),
  abilityEstimate: doublePrecision("ability_estimate").default(0),
  status: text("status").notNull().default("in_progress"),
  score: integer("score"),
  correctCount: integer("correct_count").default(0),
  timeSpent: integer("time_spent").default(0),
  timeLimit: integer("time_limit"),
  questionIds: jsonb("question_ids").default(sql`'[]'::jsonb`),
  answers: jsonb("answers").default(sql`'{}'::jsonb`),
  flaggedIds: jsonb("flagged_ids").default(sql`'[]'::jsonb`),
  questionMeta: jsonb("question_meta").default(sql`'[]'::jsonb`),
  difficultyHistory: jsonb("difficulty_history").default(sql`'[]'::jsonb`),
  categoryBreakdown: jsonb("category_breakdown").default(sql`'{}'::jsonb`),
  report: jsonb("report"),
  allowBackNavigation: boolean("allow_back_navigation").default(true),
  gracePeriodMinutes: integer("grace_period_minutes").default(5),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
});

export const insertImagingExamSessionSchema = createInsertSchema(imagingExamSessions).omit({
  id: true,
  startedAt: true,
  lastActivityAt: true,
});
export type ImagingExamSession = typeof imagingExamSessions.$inferSelect;
export type InsertImagingExamSession = z.infer<typeof insertImagingExamSessionSchema>;

export const imagingExamConfig = pgTable("imaging_exam_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull().default("canada"),
  examType: text("exam_type").notNull().default("camrt"),
  maxExamLength: integer("max_exam_length").default(200),
  defaultTimePerQuestion: integer("default_time_per_question").default(90),
  allowBackNavigation: boolean("allow_back_navigation").default(true),
  imageQuestionPercentage: integer("image_question_percentage").default(20),
  topicWeights: jsonb("topic_weights").default(sql`'{}'::jsonb`),
  difficultySensitivity: doublePrecision("difficulty_sensitivity").default(0.5),
  questionReuseCooldownDays: integer("question_reuse_cooldown_days").default(7),
  gracePeriodMinutes: integer("grace_period_minutes").default(5),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ImagingExamConfig = typeof imagingExamConfig.$inferSelect;

export const imagingArtifactImages = pgTable("imaging_artifact_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  artifactName: text("artifact_name").notNull(),
  artifactType: text("artifact_type").notNull(),
  description: text("description"),
  cause: text("cause"),
  correction: text("correction"),
  severity: text("severity").default("moderate"),
  teachingVersionUrl: text("teaching_version_url"),
  examVersionUrl: text("exam_version_url"),
  correctedComparisonUrl: text("corrected_comparison_url"),
  bodyRegion: text("body_region"),
  modality: text("modality"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingArtifactImageSchema = createInsertSchema(imagingArtifactImages).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingArtifactImage = typeof imagingArtifactImages.$inferSelect;
export type InsertImagingArtifactImage = z.infer<typeof insertImagingArtifactImageSchema>;

export const imagingComparisonSets = pgTable("imaging_comparison_sets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  comparisonType: text("comparison_type").notNull(),
  description: text("description"),
  acceptableImageUrl: text("acceptable_image_url"),
  unacceptableImageUrl: text("unacceptable_image_url"),
  acceptableLabel: text("acceptable_label").default("Acceptable"),
  unacceptableLabel: text("unacceptable_label").default("Unacceptable"),
  keyDifferences: text("key_differences").array().default(sql`'{}'::text[]`),
  bodyRegion: text("body_region"),
  modality: text("modality"),
  category: text("category"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingComparisonSetSchema = createInsertSchema(imagingComparisonSets).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingComparisonSet = typeof imagingComparisonSets.$inferSelect;
export type InsertImagingComparisonSet = z.infer<typeof insertImagingComparisonSetSchema>;

export const imagingAnatomyImages = pgTable("imaging_anatomy_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  bodyRegion: text("body_region").notNull(),
  bodyPart: text("body_part"),
  anatomicalStructures: text("anatomical_structures").array().default(sql`'{}'::text[]`),
  labeledTeachingUrl: text("labeled_teaching_url"),
  cleanExamUrl: text("clean_exam_url"),
  hotspotOverlay: jsonb("hotspot_overlay").default(sql`'[]'::jsonb`),
  modality: text("modality"),
  projection: text("projection"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingAnatomyImageSchema = createInsertSchema(imagingAnatomyImages).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingAnatomyImage = typeof imagingAnatomyImages.$inferSelect;
export type InsertImagingAnatomyImage = z.infer<typeof insertImagingAnatomyImageSchema>;

export const imagingPhysicsVisuals = pgTable("imaging_physics_visuals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  concept: text("concept").notNull(),
  description: text("description"),
  category: text("category"),
  imageUrl: text("image_url"),
  animationUrl: text("animation_url"),
  relatedTopicId: varchar("related_topic_id"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingPhysicsVisualSchema = createInsertSchema(imagingPhysicsVisuals).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingPhysicsVisual = typeof imagingPhysicsVisuals.$inferSelect;
export type InsertImagingPhysicsVisual = z.infer<typeof insertImagingPhysicsVisualSchema>;

export const imagingImageBriefs = pgTable("imaging_image_briefs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  briefType: text("brief_type").notNull(),
  targetCategory: text("target_category").notNull(),
  description: text("description").notNull(),
  specifications: jsonb("specifications").default(sql`'{}'::jsonb`),
  bodyRegion: text("body_region"),
  modality: text("modality"),
  priority: text("priority").default("medium"),
  status: text("status").default("pending"),
  assignedTo: text("assigned_to"),
  sourceTaskId: text("source_task_id"),
  resultingAssetId: varchar("resulting_asset_id"),
  notes: text("notes"),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingImageBriefSchema = createInsertSchema(imagingImageBriefs).omit({ id: true, createdAt: true, updatedAt: true, completedAt: true });
export type ImagingImageBrief = typeof imagingImageBriefs.$inferSelect;
export type InsertImagingImageBrief = z.infer<typeof insertImagingImageBriefSchema>;

export const imagingSeoPages = pgTable("imaging_seo_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  pageType: text("page_type").notNull(),
  topic: text("topic"),
  subtopic: text("subtopic"),
  examType: text("exam_type"),
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  introHtml: text("intro_html"),
  contentHtml: text("content_html"),
  faqJson: jsonb("faq_json").default(sql`'[]'::jsonb`),
  internalLinksJson: jsonb("internal_links_json").default(sql`'[]'::jsonb`),
  ctaJson: jsonb("cta_json").default(sql`'{}'::jsonb`),
  sampleQuestionsJson: jsonb("sample_questions_json").default(sql`'[]'::jsonb`),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  primaryKeyword: text("primary_keyword"),
  secondaryKeywords: text("secondary_keywords").array().default(sql`'{}'::text[]`),
  schemaMarkupJson: jsonb("schema_markup_json"),
  status: text("status").default("draft"),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertImagingSeoPageSchema = createInsertSchema(imagingSeoPages).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingSeoPage = typeof imagingSeoPages.$inferSelect;
export type InsertImagingSeoPage = z.infer<typeof insertImagingSeoPageSchema>;

export const imagingBlogArticles = pgTable("imaging_blog_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  articleType: text("article_type").notNull(),
  category: text("category"),
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  summary: text("summary"),
  contentHtml: text("content_html"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  primaryKeyword: text("primary_keyword"),
  secondaryKeywords: text("secondary_keywords").array().default(sql`'{}'::text[]`),
  relatedSeoPageSlugs: text("related_seo_page_slugs").array().default(sql`'{}'::text[]`),
  relatedArticleSlugs: text("related_article_slugs").array().default(sql`'{}'::text[]`),
  schemaMarkupJson: jsonb("schema_markup_json"),
  readTimeMinutes: integer("read_time_minutes").default(5),
  status: text("status").default("draft"),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertImagingBlogArticleSchema = createInsertSchema(imagingBlogArticles).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingBlogArticle = typeof imagingBlogArticles.$inferSelect;
export type InsertImagingBlogArticle = z.infer<typeof insertImagingBlogArticleSchema>;

export const imagingLeads = pgTable("imaging_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name"),
  source: text("source").notNull().default("general"),
  trigger: text("trigger").default("manual"),
  examType: text("exam_type"),
  country: text("country"),
  quizScore: integer("quiz_score"),
  quizData: jsonb("quiz_data"),
  referralCode: text("referral_code"),
  referredBy: text("referred_by"),
  status: text("status").default("active"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  convertedToUser: boolean("converted_to_user").default(false),
  userId: varchar("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingLeadSchema = createInsertSchema(imagingLeads).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingLead = typeof imagingLeads.$inferSelect;
export type InsertImagingLead = z.infer<typeof insertImagingLeadSchema>;

export const imagingNurtureSequences = pgTable("imaging_nurture_sequences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(),
  steps: jsonb("steps").notNull().default(sql`'[]'::jsonb`),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ImagingNurtureSequence = typeof imagingNurtureSequences.$inferSelect;

export const imagingNurtureEnrollments = pgTable("imaging_nurture_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").notNull(),
  sequenceId: varchar("sequence_id").notNull(),
  currentStep: integer("current_step").default(0),
  status: text("status").default("active"),
  nextSendAt: timestamp("next_send_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ImagingNurtureEnrollment = typeof imagingNurtureEnrollments.$inferSelect;

export const imagingReferrals = pgTable("imaging_referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerEmail: text("referrer_email").notNull(),
  referrerCode: text("referrer_code").notNull(),
  referredEmail: text("referred_email").notNull(),
  status: text("status").default("pending"),
  rewardGranted: text("reward_granted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ImagingReferral = typeof imagingReferrals.$inferSelect;

export const imagingMarketingEvents = pgTable("imaging_marketing_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(),
  page: text("page"),
  sessionId: text("session_id"),
  leadId: varchar("lead_id"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ImagingMarketingEvent = typeof imagingMarketingEvents.$inferSelect;

export const imagingStudyPlans = pgTable("imaging_study_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email"),
  leadId: varchar("lead_id"),
  examType: text("exam_type").notNull(),
  examDate: text("exam_date"),
  hoursPerWeek: integer("hours_per_week").notNull(),
  confidenceLevel: text("confidence_level").notNull(),
  planData: jsonb("plan_data").notNull().default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ImagingStudyPlan = typeof imagingStudyPlans.$inferSelect;

export const IMAGING_SEO_PAGE_TYPES = [
  "practice-questions",
  "positioning-guide",
  "artifact-recognition",
  "physics-study",
  "exam-prep",
  "study-guide",
  "topic-overview",
] as const;

export const IMAGING_BLOG_ARTICLE_TYPES = [
  "how-to-guide",
  "study-strategy",
  "concept-explanation",
  "common-mistakes",
  "comparison",
  "beginner-roadmap",
  "faq",
] as const;

export const IMAGING_BLOG_CATEGORIES = [
  "Radiographic Positioning",
  "Radiation Physics",
  "Image Artifacts",
  "Patient Care",
  "Radiation Safety",
  "Equipment & Technology",
  "Exam Strategies",
  "Career Development",
] as const;

export const imagingProducts = pgTable("imaging_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  productType: text("product_type").notNull(),
  description: text("description"),
  features: text("features").array().default(sql`'{}'::text[]`),
  priceCAD: integer("price_cad").notNull(),
  priceUSD: integer("price_usd").notNull(),
  compareAtPriceCAD: integer("compare_at_price_cad"),
  compareAtPriceUSD: integer("compare_at_price_usd"),
  stripePriceIdCAD: text("stripe_price_id_cad"),
  stripePriceIdUSD: text("stripe_price_id_usd"),
  stripeProductId: text("stripe_product_id"),
  billingInterval: text("billing_interval"),
  contentScope: jsonb("content_scope").default(sql`'{}'::jsonb`),
  questionCount: integer("question_count").default(0),
  flashcardCount: integer("flashcard_count").default(0),
  examCount: integer("exam_count").default(0),
  country: text("country"),
  popular: boolean("popular").default(false),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertImagingProductSchema = createInsertSchema(imagingProducts).omit({ id: true, createdAt: true, updatedAt: true });
export type ImagingProduct = typeof imagingProducts.$inferSelect;
export type InsertImagingProduct = z.infer<typeof insertImagingProductSchema>;

export const imagingEntitlements = pgTable("imaging_entitlements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id"),
  entitlementType: text("entitlement_type").notNull(),
  scope: jsonb("scope").default(sql`'{}'::jsonb`),
  status: text("status").default("active"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertImagingEntitlementSchema = createInsertSchema(imagingEntitlements).omit({ id: true, createdAt: true });
export type ImagingEntitlement = typeof imagingEntitlements.$inferSelect;
export type InsertImagingEntitlement = z.infer<typeof insertImagingEntitlementSchema>;

export const imagingPurchases = pgTable("imaging_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").default("USD"),
  status: text("status").default("completed"),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

export const insertImagingPurchaseSchema = createInsertSchema(imagingPurchases).omit({ id: true, purchasedAt: true });
export type ImagingPurchase = typeof imagingPurchases.$inferSelect;
export type InsertImagingPurchase = z.infer<typeof insertImagingPurchaseSchema>;

export const imagingPreviewConfig = pgTable("imaging_preview_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentType: text("content_type").notNull().unique(),
  freeLimit: integer("free_limit").notNull().default(5),
  previewMessage: text("preview_message"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ImagingPreviewConfig = typeof imagingPreviewConfig.$inferSelect;

export const professions = pgTable("professions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  description: text("description").notNull().default(""),
  icon: text("icon").default("BookOpen"),
  color: text("color").default("#6C63FF"),
  colorAccent: text("color_accent").default("#E8E6FF"),
  routePrefix: text("route_prefix").notNull(),
  examNames: text("exam_names").array().default(sql`'{}'::text[]`),
  domains: text("domains").array().default(sql`'{}'::text[]`),
  tiers: jsonb("tiers").default(sql`'[]'::jsonb`),
  modules: jsonb("modules").default(sql`'{"lessons":true,"flashcards":true,"practiceExams":true,"adaptiveExams":true,"imageAssets":true,"seoPages":true,"studyPacks":true}'::jsonb`),
  pricing: jsonb("pricing").default(sql`'{}'::jsonb`),
  country: text("country").default("ALL"),
  status: text("status").default("draft"),
  sortOrder: integer("sort_order").default(0),
  questionCount: integer("question_count").default(0),
  userCount: integer("user_count").default(0),
  imageUrl: text("image_url"),
  hubTitle: text("hub_title"),
  hubDescription: text("hub_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  launchedAt: timestamp("launched_at"),
});

export const insertProfessionSchema = createInsertSchema(professions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  launchedAt: true,
  questionCount: true,
  userCount: true,
});
export type Profession = typeof professions.$inferSelect;
export type InsertProfession = z.infer<typeof insertProfessionSchema>;

export const IMPORT_QUESTION_TYPES = [
  "single_best_answer",
  "multiple_response",
  "image_interpretation",
  "case_based",
  "comparison",
  "sequencing",
  "drag_and_drop",
] as const;

export const IMPORT_STATUSES = [
  "pending",
  "validating",
  "validated",
  "previewing",
  "importing",
  "completed",
  "failed",
  "cancelled",
] as const;

export const questionBankImports = pgTable("question_bank_imports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileFormat: text("file_format").notNull(),
  fileSize: integer("file_size").default(0),
  professionId: varchar("profession_id"),
  professionSlug: text("profession_slug"),
  status: text("status").default("pending"),
  totalRows: integer("total_rows").default(0),
  validRows: integer("valid_rows").default(0),
  errorRows: integer("error_rows").default(0),
  warningRows: integer("warning_rows").default(0),
  duplicateRows: integer("duplicate_rows").default(0),
  importedRows: integer("imported_rows").default(0),
  skippedRows: integer("skipped_rows").default(0),
  duplicateStrategy: text("duplicate_strategy").default("skip"),
  validationReport: jsonb("validation_report").default(sql`'{"errors":[],"warnings":[]}'::jsonb`),
  previewData: jsonb("preview_data").default(sql`'[]'::jsonb`),
  mappedTopics: jsonb("mapped_topics").default(sql`'[]'::jsonb`),
  importedBy: varchar("imported_by"),
  importedByUsername: text("imported_by_username"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertQuestionBankImportSchema = createInsertSchema(questionBankImports).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  startedAt: true,
  completedAt: true,
  importedRows: true,
  skippedRows: true,
});
export type QuestionBankImport = typeof questionBankImports.$inferSelect;
export type InsertQuestionBankImport = z.infer<typeof insertQuestionBankImportSchema>;

export const questionBankImportRows = pgTable("question_bank_import_rows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  importId: varchar("import_id").notNull(),
  rowNumber: integer("row_number").notNull(),
  status: text("status").default("pending"),
  questionId: text("question_id"),
  profession: text("profession"),
  country: text("country"),
  examType: text("exam_type"),
  topic: text("topic"),
  subtopic: text("subtopic"),
  difficulty: integer("difficulty"),
  questionType: text("question_type"),
  questionText: text("question_text"),
  optionA: text("option_a"),
  optionB: text("option_b"),
  optionC: text("option_c"),
  optionD: text("option_d"),
  optionE: text("option_e"),
  correctAnswer: text("correct_answer"),
  rationale: text("rationale"),
  imageReference: text("image_reference"),
  tags: text("tags"),
  eligibilityFlags: text("eligibility_flags"),
  errors: jsonb("errors").default(sql`'[]'::jsonb`),
  warnings: jsonb("warnings").default(sql`'[]'::jsonb`),
  duplicateOf: varchar("duplicate_of"),
  createdExamQuestionId: varchar("created_exam_question_id"),
});

export const classrooms = pgTable("classrooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institutionId: varchar("institution_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  instructorId: varchar("instructor_id").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClassroomSchema = createInsertSchema(classrooms).omit({ id: true, createdAt: true });
export type Classroom = typeof classrooms.$inferSelect;
export type InsertClassroom = z.infer<typeof insertClassroomSchema>;

export const classroomStudents = pgTable("classroom_students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classroomId: varchar("classroom_id").notNull(),
  userId: varchar("user_id").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});

export const insertClassroomStudentSchema = createInsertSchema(classroomStudents).omit({ id: true, enrolledAt: true });
export type ClassroomStudent = typeof classroomStudents.$inferSelect;
export type InsertClassroomStudent = z.infer<typeof insertClassroomStudentSchema>;

export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classroomId: varchar("classroom_id").notNull(),
  instructorId: varchar("instructor_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull().default("lesson"),
  resourceId: text("resource_id"),
  dueDate: timestamp("due_date"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({ id: true, createdAt: true });
export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;

export const assignmentSubmissions = pgTable("assignment_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assignmentId: varchar("assignment_id").notNull(),
  studentId: varchar("student_id").notNull(),
  status: text("status").notNull().default("not_started"),
  score: integer("score"),
  timeSpent: integer("time_spent"),
  submittedAt: timestamp("submitted_at"),
  completedAt: timestamp("completed_at"),
});

export const insertAssignmentSubmissionSchema = createInsertSchema(assignmentSubmissions).omit({ id: true });
export type AssignmentSubmission = typeof assignmentSubmissions.$inferSelect;
export type InsertAssignmentSubmission = z.infer<typeof insertAssignmentSubmissionSchema>;

export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  institutionId: varchar("institution_id").notNull(),
  classroomId: varchar("classroom_id"),
  studentName: text("student_name").notNull(),
  courseName: text("course_name").notNull(),
  institutionName: text("institution_name").notNull(),
  completionDate: timestamp("completion_date").notNull(),
  certificateCode: text("certificate_code").notNull().unique(),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({ id: true, issuedAt: true });
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export const flashcardPreviewConfig = pgTable("flashcard_preview_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentType: text("content_type").notNull().unique().default("flashcards"),
  sessionLimit: integer("session_limit").notNull().default(5),
  dailyLimit: integer("daily_limit").notNull().default(10),
  allowedTopics: text("allowed_topics").array().default(sql`'{}'::text[]`),
  allowedTiers: text("allowed_tiers").array().default(sql`'{}'::text[]`),
  upgradeHeadline: text("upgrade_headline").default("Unlock the Full Flashcard Library"),
  upgradeBody: text("upgrade_body").default("Get unlimited flashcards, adaptive review, weak areas mode, and saved progress with a premium plan."),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFlashcardPreviewConfigSchema = createInsertSchema(flashcardPreviewConfig).omit({ id: true, updatedAt: true });
export type FlashcardPreviewConfig = typeof flashcardPreviewConfig.$inferSelect;
export type InsertFlashcardPreviewConfig = z.infer<typeof insertFlashcardPreviewConfigSchema>;

export const flashcardPreviewUsage = pgTable("flashcard_preview_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  count: integer("count").notNull().default(0),
});

export type FlashcardPreviewUsage = typeof flashcardPreviewUsage.$inferSelect;

export const userCardResponses = pgTable("user_card_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  cardId: varchar("card_id").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  confidence: text("confidence").notNull().default("unsure"),
  selectedOption: integer("selected_option"),
  timeSpent: integer("time_spent"),
  studyMode: text("study_mode").default("learn"),
  reviewedAt: timestamp("reviewed_at").defaultNow().notNull(),
});

export const insertUserCardResponseSchema = createInsertSchema(userCardResponses).omit({ id: true, reviewedAt: true });
export type UserCardResponse = typeof userCardResponses.$inferSelect;
export type InsertUserCardResponse = z.infer<typeof insertUserCardResponseSchema>;

export const userMasteryProfiles = pgTable("user_mastery_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tier: text("tier").notNull(),
  topic: text("topic"),
  subtopic: text("subtopic"),
  blueprintCategory: text("blueprint_category"),
  questionType: text("question_type"),
  totalAttempts: integer("total_attempts").default(0),
  correctCount: integer("correct_count").default(0),
  avgConfidence: doublePrecision("avg_confidence").default(0),
  lastReviewedAt: timestamp("last_reviewed_at"),
  masteryLevel: doublePrecision("mastery_level").default(0),
  nextDueAt: timestamp("next_due_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserMasteryProfileSchema = createInsertSchema(userMasteryProfiles).omit({ id: true, updatedAt: true });
export type UserMasteryProfile = typeof userMasteryProfiles.$inferSelect;
export type InsertUserMasteryProfile = z.infer<typeof insertUserMasteryProfileSchema>;

export const studentStudyProfiles = pgTable("student_study_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  totalQuestionsAnswered: integer("total_questions_answered").default(0),
  totalCorrect: integer("total_correct").default(0),
  totalIncorrect: integer("total_incorrect").default(0),
  avgTimePerQuestion: integer("avg_time_per_question").default(0),
  flashcardsStudied: integer("flashcards_studied").default(0),
  lessonsViewed: integer("lessons_viewed").default(0),
  practiceExamsCompleted: integer("practice_exams_completed").default(0),
  adaptiveExamsCompleted: integer("adaptive_exams_completed").default(0),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastStudyDate: text("last_study_date"),
  weeklyGoalHours: integer("weekly_goal_hours").default(10),
  weeklyHoursLogged: doublePrecision("weekly_hours_logged").default(0),
  weeklyGoalResetDate: text("weekly_goal_reset_date"),
  totalStudyMinutes: integer("total_study_minutes").default(0),
  examDate: timestamp("exam_date"),
  hoursPerWeek: integer("hours_per_week").default(10),
  readinessScore: integer("readiness_score").default(0),
  readinessLevel: text("readiness_level").default("not_ready"),
  passProbability: integer("pass_probability").default(0),
  examPrepModeActive: boolean("exam_prep_mode_active").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStudentStudyProfileSchema = createInsertSchema(studentStudyProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export type StudentStudyProfile = typeof studentStudyProfiles.$inferSelect;
export type InsertStudentStudyProfile = z.infer<typeof insertStudentStudyProfileSchema>;

export const topicMasteryScores = pgTable("topic_mastery_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  topic: text("topic").notNull(),
  subtopic: text("subtopic"),
  totalAttempts: integer("total_attempts").default(0),
  correctCount: integer("correct_count").default(0),
  masteryPercent: doublePrecision("mastery_percent").default(0),
  masteryLabel: text("mastery_label").default("weak"),
  recentAccuracy: doublePrecision("recent_accuracy").default(0),
  avgTimeSeconds: integer("avg_time_seconds").default(0),
  lastAttemptAt: timestamp("last_attempt_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTopicMasteryScoreSchema = createInsertSchema(topicMasteryScores).omit({ id: true, updatedAt: true });
export type TopicMasteryScore = typeof topicMasteryScores.$inferSelect;
export type InsertTopicMasteryScore = z.infer<typeof insertTopicMasteryScoreSchema>;

export const spacedRepetitionCards = pgTable("spaced_repetition_cards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  cardId: varchar("card_id").notNull(),
  deckId: varchar("deck_id"),
  easeFactor: doublePrecision("ease_factor").default(2.5),
  interval: integer("interval").default(1),
  repetitions: integer("repetitions").default(0),
  nextReviewAt: timestamp("next_review_at").defaultNow().notNull(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  status: text("status").default("new"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSpacedRepetitionCardSchema = createInsertSchema(spacedRepetitionCards).omit({ id: true, updatedAt: true });
export type SpacedRepetitionCard = typeof spacedRepetitionCards.$inferSelect;
export type InsertSpacedRepetitionCard = z.infer<typeof insertSpacedRepetitionCardSchema>;

export const weakAreaAlerts = pgTable("weak_area_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  topic: text("topic").notNull(),
  alertType: text("alert_type").notNull().default("repeated_struggle"),
  message: text("message").notNull(),
  dismissed: boolean("dismissed").default(false),
  recommendedActions: jsonb("recommended_actions").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type WeakAreaAlert = typeof weakAreaAlerts.$inferSelect;

export const studyMilestones = pgTable("study_milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  milestoneType: text("milestone_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  seen: boolean("seen").default(false),
});

export type StudyMilestone = typeof studyMilestones.$inferSelect;

export const generatedCourses = pgTable("generated_courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blueprintId: varchar("blueprint_id"),
  examCode: text("exam_code").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("draft"),
  structure: jsonb("structure").default(sql`'[]'::jsonb`),
  totalLessons: integer("total_lessons").default(0),
  totalFlashcards: integer("total_flashcards").default(0),
  totalQuestions: integer("total_questions").default(0),
  seoPages: jsonb("seo_pages").default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGeneratedCourseSchema = createInsertSchema(generatedCourses).omit({ id: true, createdAt: true, updatedAt: true });
export type GeneratedCourse = typeof generatedCourses.$inferSelect;
export type InsertGeneratedCourse = z.infer<typeof insertGeneratedCourseSchema>;

export const accuracyTrends = pgTable("accuracy_trends", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  questionsAnswered: integer("questions_answered").default(0),
  correctCount: integer("correct_count").default(0),
  accuracy: doublePrecision("accuracy").default(0),
  studyMinutes: integer("study_minutes").default(0),
});

export type AccuracyTrend = typeof accuracyTrends.$inferSelect;

export const customPracticeSessions = pgTable("custom_practice_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  status: text("status").default("pending"),
  totalQuestions: integer("total_questions").default(20),
  weakTopicCount: integer("weak_topic_count").default(0),
  moderateTopicCount: integer("moderate_topic_count").default(0),
  strongTopicCount: integer("strong_topic_count").default(0),
  includesImages: boolean("includes_images").default(false),
  questions: jsonb("questions").default(sql`'[]'::jsonb`),
  score: integer("score"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomPracticeSessionSchema = createInsertSchema(customPracticeSessions).omit({ id: true, createdAt: true });
export type CustomPracticeSession = typeof customPracticeSessions.$inferSelect;
export type InsertCustomPracticeSession = z.infer<typeof insertCustomPracticeSessionSchema>;

export const userCardStats = pgTable("user_card_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  cardId: varchar("card_id").notNull(),
  timesSeen: integer("times_seen").default(0).notNull(),
  timesCorrect: integer("times_correct").default(0).notNull(),
  timesIncorrect: integer("times_incorrect").default(0).notNull(),
  lastSeenAt: timestamp("last_seen_at"),
  lastAnsweredAt: timestamp("last_answered_at"),
  averageResponseTime: doublePrecision("average_response_time").default(0),
  confidenceRating: text("confidence_rating").default("unsure"),
  flagged: boolean("flagged").default(false).notNull(),
  mastered: boolean("mastered").default(false).notNull(),
  streakCorrect: integer("streak_correct").default(0).notNull(),
  streakIncorrect: integer("streak_incorrect").default(0).notNull(),
  masteryState: text("mastery_state").default("new").notNull(),
  nextReviewAt: timestamp("next_review_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserCardStatsSchema = createInsertSchema(userCardStats).omit({ id: true, updatedAt: true });
export type UserCardStats = typeof userCardStats.$inferSelect;
export type InsertUserCardStats = z.infer<typeof insertUserCardStatsSchema>;

export const studySessionStats = pgTable("study_session_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  sessionType: text("session_type").notNull().default("recommended"),
  sessionAccuracy: doublePrecision("session_accuracy").default(0),
  sessionTopics: jsonb("session_topics").default(sql`'[]'::jsonb`),
  sessionDuration: integer("session_duration").default(0),
  cardsReviewed: integer("cards_reviewed").default(0),
  weakCardsEncountered: integer("weak_cards_encountered").default(0),
  masteryChanges: jsonb("mastery_changes").default(sql`'[]'::jsonb`),
  tier: text("tier"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertStudySessionStatsSchema = createInsertSchema(studySessionStats).omit({ id: true, startedAt: true });
export type StudySessionStats = typeof studySessionStats.$inferSelect;
export type InsertStudySessionStats = z.infer<typeof insertStudySessionStatsSchema>;

export const adaptiveConfig = pgTable("adaptive_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  configKey: text("config_key").notNull().unique(),
  weakTopicWeight: integer("weak_topic_weight").default(4),
  incorrectHistoryWeight: integer("incorrect_history_weight").default(5),
  lowConfidenceWeight: integer("low_confidence_weight").default(4),
  flaggedWeight: integer("flagged_weight").default(3),
  notSeenWeight: integer("not_seen_weight").default(2),
  masteredPenalty: integer("mastered_penalty").default(-5),
  correctStreakPenalty: integer("correct_streak_penalty").default(-4),
  intervalIncorrect: doublePrecision("interval_incorrect").default(1),
  intervalUnsure: doublePrecision("interval_unsure").default(3),
  intervalConfident: doublePrecision("interval_confident").default(10),
  intervalMastered: doublePrecision("interval_mastered").default(30),
  weakTopicThreshold: doublePrecision("weak_topic_threshold").default(0.7),
  weakSubtopicThreshold: doublePrecision("weak_subtopic_threshold").default(0.65),
  masteryThresholdImproving: doublePrecision("mastery_threshold_improving").default(0.5),
  masteryThresholdNearlyMastered: doublePrecision("mastery_threshold_nearly_mastered").default(0.7),
  masteryThresholdMastered: doublePrecision("mastery_threshold_mastered").default(0.85),
  highYieldTags: jsonb("high_yield_tags").default(sql`'[]'::jsonb`),
  blueprintWeighting: jsonb("blueprint_weighting").default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdaptiveConfigSchema = createInsertSchema(adaptiveConfig).omit({ id: true, updatedAt: true });
export type AdaptiveConfig = typeof adaptiveConfig.$inferSelect;
export type InsertAdaptiveConfig = z.infer<typeof insertAdaptiveConfigSchema>;

export const practiceQuizPages = pgTable("practice_quiz_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description").notNull(),
  h1: text("h1").notNull(),
  introText: text("intro_text"),
  topic: text("topic").notNull(),
  subtopic: text("subtopic"),
  bodySystem: text("body_system"),
  careerType: text("career_type").default("nursing"),
  examType: text("exam_type"),
  difficulty: text("difficulty").default("mixed"),
  questionCount: integer("question_count").default(10),
  questionIds: text("question_ids").array().default(sql`'{}'::text[]`),
  relatedPageSlugs: text("related_page_slugs").array().default(sql`'{}'::text[]`),
  keywords: text("keywords").array().default(sql`'{}'::text[]`),
  structuredData: jsonb("structured_data").default(sql`'{}'::jsonb`),
  isAutoGenerated: boolean("is_auto_generated").default(true),
  status: text("status").default("published"),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPracticeQuizPageSchema = createInsertSchema(practiceQuizPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});
export type PracticeQuizPage = typeof practiceQuizPages.$inferSelect;
export type InsertPracticeQuizPage = z.infer<typeof insertPracticeQuizPageSchema>;

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  endpoint: text("endpoint").notNull().unique(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  reminderTime: text("reminder_time").default("09:00"),
  enableDailyReminder: boolean("enable_daily_reminder").default(true),
  enableExamReminder: boolean("enable_exam_reminder").default(true),
  enableFlashcardReminder: boolean("enable_flashcard_reminder").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPushSubscriptionSchema = createInsertSchema(pushSubscriptions).omit({
  id: true,
  createdAt: true,
});
export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type InsertPushSubscription = z.infer<typeof insertPushSubscriptionSchema>;

export const translationAudits = pgTable("translation_audits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentId: text("content_id").notNull(),
  contentType: text("content_type").notNull(),
  url: text("url"),
  locale: text("locale").notNull(),
  translationPct: doublePrecision("translation_pct").default(0),
  status: text("status").default("draft"),
  issueCount: integer("issue_count").default(0),
  issueBreakdown: jsonb("issue_breakdown").default(sql`'{}'::jsonb`),
  sitemapEligible: boolean("sitemap_eligible").default(false),
  noindex: boolean("noindex").default(false),
  adminOverride: boolean("admin_override").default(false),
  lastScannedAt: timestamp("last_scanned_at").defaultNow(),
  lastContentUpdatedAt: timestamp("last_content_updated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTranslationAuditSchema = createInsertSchema(translationAudits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type TranslationAudit = typeof translationAudits.$inferSelect;
export type InsertTranslationAudit = z.infer<typeof insertTranslationAuditSchema>;

export const newGradGuides = pgTable("new_grad_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  profession: text("profession").notNull(),
  guideType: text("guide_type").notNull(),
  category: text("category"),
  summary: text("summary"),
  content: jsonb("content").default(sql`'[]'::jsonb`),
  sections: jsonb("sections").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  faqItems: jsonb("faq_items").default(sql`'[]'::jsonb`),
  relatedGuideIds: text("related_guide_ids").array().default(sql`'{}'::text[]`),
  isPremium: boolean("is_premium").default(false),
  status: text("status").default("draft"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  authorName: text("author_name"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertNewGradGuideSchema = createInsertSchema(newGradGuides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type NewGradGuide = typeof newGradGuides.$inferSelect;
export type InsertNewGradGuide = z.infer<typeof insertNewGradGuideSchema>;

export const newGradTestimonials = pgTable("new_grad_testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  profession: text("profession").notNull(),
  role: text("role"),
  organization: text("organization"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  avatarUrl: text("avatar_url"),
  featured: boolean("featured").default(false),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewGradTestimonialSchema = createInsertSchema(newGradTestimonials).omit({
  id: true,
  createdAt: true,
});
export type NewGradTestimonial = typeof newGradTestimonials.$inferSelect;
export type InsertNewGradTestimonial = z.infer<typeof insertNewGradTestimonialSchema>;

export const leadCaptureDownloads = pgTable("lead_capture_downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subscriberId: varchar("subscriber_id"),
  email: text("email").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceName: text("resource_name").notNull(),
  profession: text("profession"),
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
});

export const insertLeadCaptureDownloadSchema = createInsertSchema(leadCaptureDownloads).omit({
  id: true,
  downloadedAt: true,
});
export type LeadCaptureDownload = typeof leadCaptureDownloads.$inferSelect;
export type InsertLeadCaptureDownload = z.infer<typeof insertLeadCaptureDownloadSchema>;

export const translationAuditIssues = pgTable("translation_audit_issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auditId: varchar("audit_id").notNull(),
  fieldName: text("field_name").notNull(),
  sourceValue: text("source_value"),
  localizedValue: text("localized_value"),
  issueType: text("issue_type").notNull(),
  category: text("category").default("primary_body"),
  status: text("status").default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTranslationAuditIssueSchema = createInsertSchema(translationAuditIssues).omit({
  id: true,
  createdAt: true,
});
export type TranslationAuditIssue = typeof translationAuditIssues.$inferSelect;
export type InsertTranslationAuditIssue = z.infer<typeof insertTranslationAuditIssueSchema>;

export const encyclopediaTopics = pgTable("encyclopedia_topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profession: text("profession").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  relatedQuestionIds: text("related_question_ids").array().default(sql`'{}'::text[]`),
  relatedFlashcardIds: text("related_flashcard_ids").array().default(sql`'{}'::text[]`),
  status: text("status").default("draft"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEncyclopediaTopicSchema = createInsertSchema(encyclopediaTopics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type EncyclopediaTopic = typeof encyclopediaTopics.$inferSelect;
export type InsertEncyclopediaTopic = z.infer<typeof insertEncyclopediaTopicSchema>;

export const encyclopediaEntries = pgTable("encyclopedia_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  topicId: varchar("topic_id"),
  profession: text("profession").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  overview: text("overview").notNull(),
  mechanismPhysiology: text("mechanism_physiology"),
  clinicalRelevance: text("clinical_relevance"),
  signsSymptoms: text("signs_symptoms"),
  assessment: text("assessment"),
  management: text("management"),
  complications: text("complications"),
  clinicalPearls: jsonb("clinical_pearls").default(sql`'[]'::jsonb`),
  examPitfalls: jsonb("exam_pitfalls").default(sql`'[]'::jsonb`),
  faqJson: jsonb("faq_json").default(sql`'[]'::jsonb`),
  relatedLessonIds: text("related_lesson_ids").array().default(sql`'{}'::text[]`),
  relatedQuestionIds: text("related_question_ids").array().default(sql`'{}'::text[]`),
  relatedFlashcardIds: text("related_flashcard_ids").array().default(sql`'{}'::text[]`),
  crossProfessionLinks: jsonb("cross_profession_links").default(sql`'[]'::jsonb`),
  imagePlaceholders: jsonb("image_placeholders").default(sql`'[]'::jsonb`),
  status: text("status").default("published"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEncyclopediaEntrySchema = createInsertSchema(encyclopediaEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type EncyclopediaEntry = typeof encyclopediaEntries.$inferSelect;
export type InsertEncyclopediaEntry = z.infer<typeof insertEncyclopediaEntrySchema>;

export const encyclopediaCrossLinks = pgTable("encyclopedia_cross_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceEntryId: varchar("source_entry_id").notNull(),
  targetEntryId: varchar("target_entry_id").notNull(),
  matchScore: doublePrecision("match_score").notNull().default(0),
  matchReason: text("match_reason"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEncyclopediaCrossLinkSchema = createInsertSchema(encyclopediaCrossLinks).omit({
  id: true,
  createdAt: true,
});
export type EncyclopediaCrossLink = typeof encyclopediaCrossLinks.$inferSelect;
export type InsertEncyclopediaCrossLink = z.infer<typeof insertEncyclopediaCrossLinkSchema>;

export const ENCYCLOPEDIA_PROFESSIONS = [
  { slug: "nursing", label: "Nursing", icon: "Heart" },
  { slug: "paramedic", label: "Paramedic", icon: "Ambulance" },
  { slug: "pharmacy-tech", label: "Pharmacy Technician", icon: "Pill" },
  { slug: "rrt", label: "Respiratory Therapy", icon: "Wind" },
  { slug: "mlt", label: "Medical Lab Technologist", icon: "Microscope" },
  { slug: "imaging", label: "Medical Imaging", icon: "Radio" },
  { slug: "social-worker", label: "Social Work", icon: "Users" },
  { slug: "critical-care", label: "Critical Care", icon: "Activity" },
  { slug: "emergency-nursing", label: "Emergency Nursing", icon: "Siren" },
  { slug: "occupational-therapy", label: "Occupational Therapy", icon: "Hand" },
  { slug: "addictions", label: "Addictions Counseling", icon: "ShieldAlert" },
  { slug: "psychotherapy", label: "Psychotherapy & Counseling", icon: "Brain" },
] as const;

export const programmaticPages = pgTable("programmatic_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageType: text("page_type").notNull(),
  sourceContentId: varchar("source_content_id").notNull(),
  sourceContentType: text("source_content_type").notNull(),
  careerTrack: text("career_track").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  contentSections: jsonb("content_sections").default(sql`'[]'::jsonb`),
  faqJson: jsonb("faq_json").default(sql`'[]'::jsonb`),
  relatedContentLinks: jsonb("related_content_links").default(sql`'[]'::jsonb`),
  siblingLinks: jsonb("sibling_links").default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("published"),
  gatingLevel: text("gating_level").notNull().default("public"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProgrammaticPageSchema = createInsertSchema(programmaticPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ProgrammaticPage = typeof programmaticPages.$inferSelect;
export type InsertProgrammaticPage = z.infer<typeof insertProgrammaticPageSchema>;

export const questionBookmarks = pgTable("question_bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  questionId: varchar("question_id").notNull(),
  questionSource: text("question_source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuestionBookmarkSchema = createInsertSchema(questionBookmarks).omit({ id: true, createdAt: true });
export type QuestionBookmark = typeof questionBookmarks.$inferSelect;
export type InsertQuestionBookmark = z.infer<typeof insertQuestionBookmarkSchema>;

export const APPLYNEST_PROFESSIONS = [
  { slug: "rn", label: "Registered Nurse (RN)", icon: "Heart" },
  { slug: "rpn-lvn", label: "RPN / LVN", icon: "Stethoscope" },
  { slug: "np", label: "Nurse Practitioner (NP)", icon: "GraduationCap" },
  { slug: "paramedic", label: "Paramedic", icon: "Ambulance" },
  { slug: "rrt", label: "Respiratory Therapist (RRT)", icon: "Wind" },
  { slug: "mlt", label: "Medical Lab Technologist (MLT)", icon: "Microscope" },
  { slug: "imaging", label: "Medical Imaging / Radiologic Tech", icon: "Radio" },
  { slug: "pharmtech", label: "Pharmacy Technician", icon: "Pill" },
] as const;

export type ApplyNestProfessionSlug = typeof APPLYNEST_PROFESSIONS[number]["slug"];

export const applyNestCareerProfiles = pgTable("applynest_career_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profession: text("profession").notNull().unique(),
  professionLabel: text("profession_label").notNull(),
  jobMarketOverview: text("job_market_overview").notNull(),
  salaryRangeJson: jsonb("salary_range_json").default(sql`'{}'::jsonb`),
  topEmployers: jsonb("top_employers").default(sql`'[]'::jsonb`),
  licensingRequirements: jsonb("licensing_requirements").default(sql`'[]'::jsonb`),
  resumeTips: jsonb("resume_tips").default(sql`'[]'::jsonb`),
  interviewQuestions: jsonb("interview_questions").default(sql`'[]'::jsonb`),
  firstJobChecklist: jsonb("first_job_checklist").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  status: text("status").default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertApplyNestCareerProfileSchema = createInsertSchema(applyNestCareerProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ApplyNestCareerProfile = typeof applyNestCareerProfiles.$inferSelect;
export type InsertApplyNestCareerProfile = z.infer<typeof insertApplyNestCareerProfileSchema>;

export const applyNestResumeTemplates = pgTable("applynest_resume_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  profession: text("profession"),
  description: text("description").notNull(),
  templateContent: jsonb("template_content").default(sql`'{}'::jsonb`),
  tips: jsonb("tips").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  status: text("status").default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertApplyNestResumeTemplateSchema = createInsertSchema(applyNestResumeTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ApplyNestResumeTemplate = typeof applyNestResumeTemplates.$inferSelect;
export type InsertApplyNestResumeTemplate = z.infer<typeof insertApplyNestResumeTemplateSchema>;

export const applyNestInterviewQuestions = pgTable("applynest_interview_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  category: text("category").notNull(),
  profession: text("profession"),
  sampleAnswer: text("sample_answer").notNull(),
  tips: text("tips"),
  difficulty: text("difficulty").default("medium"),
  questionType: text("question_type").default("behavioral"),
  status: text("status").default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApplyNestInterviewQuestionSchema = createInsertSchema(applyNestInterviewQuestions).omit({
  id: true,
  createdAt: true,
});
export type ApplyNestInterviewQuestion = typeof applyNestInterviewQuestions.$inferSelect;
export type InsertApplyNestInterviewQuestion = z.infer<typeof insertApplyNestInterviewQuestionSchema>;

export const applyNestCareerGuides = pgTable("applynest_career_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  content: jsonb("content").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  status: text("status").default("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertApplyNestCareerGuideSchema = createInsertSchema(applyNestCareerGuides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ApplyNestCareerGuide = typeof applyNestCareerGuides.$inferSelect;
export type InsertApplyNestCareerGuide = z.infer<typeof insertApplyNestCareerGuideSchema>;

export const applyNestLeads = pgTable("applynest_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  profession: text("profession"),
  source: text("source").default("applynest"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApplyNestLeadSchema = createInsertSchema(applyNestLeads).omit({
  id: true,
  createdAt: true,
});
export type ApplyNestLead = typeof applyNestLeads.$inferSelect;
export type InsertApplyNestLead = z.infer<typeof insertApplyNestLeadSchema>;

export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category"),
  subCategory: text("sub_category"),
  tier: text("tier").default("free"),
  status: text("status").default("draft"),
  summary: text("summary"),
  definition: text("definition"),
  pathophysiology: text("pathophysiology"),
  signsSymptoms: jsonb("signs_symptoms").default(sql`'[]'::jsonb`),
  diagnostics: jsonb("diagnostics").default(sql`'[]'::jsonb`),
  treatment: jsonb("treatment").default(sql`'[]'::jsonb`),
  nursingInterventions: jsonb("nursing_interventions").default(sql`'[]'::jsonb`),
  complications: jsonb("complications").default(sql`'[]'::jsonb`),
  clinicalPearls: jsonb("clinical_pearls").default(sql`'[]'::jsonb`),
  references: jsonb("references").default(sql`'[]'::jsonb`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  relatedLessonSlugs: text("related_lesson_slugs").array().default(sql`'{}'::text[]`),
  linkedFlashcardSetId: varchar("linked_flashcard_set_id"),
  linkedQuestionBankId: varchar("linked_question_bank_id"),
  isPublicPreview: boolean("is_public_preview").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export function generateLessonSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

export const alliedArticleTemplates = pgTable("allied_article_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateKey: text("template_key").notNull().unique(),
  displayName: text("display_name").notNull(),
  description: text("description"),
  sectionStructure: jsonb("section_structure").default(sql`'[]'::jsonb`),
  promptInstructions: text("prompt_instructions"),
  defaultInternalLinkTargets: jsonb("default_internal_link_targets").default(sql`'{}'::jsonb`),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAlliedArticleTemplateSchema = createInsertSchema(alliedArticleTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export type AlliedArticleTemplate = typeof alliedArticleTemplates.$inferSelect;
export type InsertAlliedArticleTemplate = z.infer<typeof insertAlliedArticleTemplateSchema>;

export const alliedHealthArticles = pgTable("allied_health_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  professionSlug: text("profession_slug").notNull(),
  articleType: text("article_type").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  primaryKeyword: text("primary_keyword"),
  secondaryKeywords: text("secondary_keywords").array().default(sql`'{}'::text[]`),
  contentSections: jsonb("content_sections").default(sql`'[]'::jsonb`),
  faqItems: jsonb("faq_items").default(sql`'[]'::jsonb`),
  internalLinks: jsonb("internal_links").default(sql`'[]'::jsonb`),
  schemaMarkupJson: jsonb("schema_markup_json"),
  breadcrumbItems: jsonb("breadcrumb_items").default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("draft"),
  featuredOrder: integer("featured_order"),
  countryScope: text("country_scope").default("ALL"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAlliedHealthArticleSchema = createInsertSchema(alliedHealthArticles).omit({ id: true, createdAt: true, updatedAt: true, publishedAt: true });
export type AlliedHealthArticle = typeof alliedHealthArticles.$inferSelect;
export type InsertAlliedHealthArticle = z.infer<typeof insertAlliedHealthArticleSchema>;

export const aiJobs = pgTable("ai_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  tier: text("tier"),
  contentType: text("content_type"),
  status: text("status").notNull().default("pending"),
  config: jsonb("config").default(sql`'{}'::jsonb`),
  progress: jsonb("progress").default(sql`'{}'::jsonb`),
  logs: jsonb("logs").default(sql`'[]'::jsonb`),
  model: text("model").default("gpt-4o-mini"),
  modelTier: text("model_tier").default("cheapest"),
  batchSize: integer("batch_size").default(25),
  spendCap: doublePrecision("spend_cap"),
  duplicateProtection: boolean("duplicate_protection").default(true),
  dryRun: boolean("dry_run").default(false),
  topic: text("topic"),
  specialty: text("specialty"),
  framework: text("framework"),
  currentStage: text("current_stage"),
  costEstimate: doublePrecision("cost_estimate").default(0),
  actualCost: doublePrecision("actual_cost").default(0),
  itemCount: integer("item_count").default(1),
  itemsCompleted: integer("items_completed").default(0),
  itemsFailed: integer("items_failed").default(0),
  duplicatesSkipped: integer("duplicates_skipped").default(0),
  retryCount: integer("retry_count").default(0),
  maxRetries: integer("max_retries").default(3),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  cancelledAt: timestamp("cancelled_at"),
  pausedAt: timestamp("paused_at"),
  resumedAt: timestamp("resumed_at"),
  error: text("error"),
});

export const insertAiJobSchema = createInsertSchema(aiJobs).omit({ id: true, createdAt: true });
export type AiJob = typeof aiJobs.$inferSelect;
export type InsertAiJob = z.infer<typeof insertAiJobSchema>;

export const aiSpendTracking = pgTable("ai_spend_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id"),
  dateKey: text("date_key").notNull(),
  weekKey: text("week_key").notNull(),
  tokenCount: integer("token_count").default(0),
  estimatedCostUsd: doublePrecision("estimated_cost_usd").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiSpendTrackingSchema = createInsertSchema(aiSpendTracking).omit({ id: true, createdAt: true });
export type AiSpendTracking = typeof aiSpendTracking.$inferSelect;
export type InsertAiSpendTracking = z.infer<typeof insertAiSpendTrackingSchema>;

export const aiBudgetLogs = pgTable("ai_budget_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(),
  jobId: varchar("job_id"),
  capType: text("cap_type"),
  capValue: doublePrecision("cap_value"),
  currentSpend: doublePrecision("current_spend"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AiBudgetLog = typeof aiBudgetLogs.$inferSelect;

export const systemSettings = pgTable("system_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updated_by"),
});

export type SystemSetting = typeof systemSettings.$inferSelect;

export const bgJobs = pgTable("bg_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  engineKey: varchar("engine_key"),
  status: text("status").notNull().default("queued"),
  priority: integer("priority").default(0),
  payload: jsonb("payload").default(sql`'{}'::jsonb`),
  result: jsonb("result").default(sql`'{}'::jsonb`),
  error: text("error"),
  totalItems: integer("total_items").default(0),
  completedItems: integer("completed_items").default(0),
  failedItems: integer("failed_items").default(0),
  totalBatches: integer("total_batches").default(0),
  completedBatches: integer("completed_batches").default(0),
  failedBatches: integer("failed_batches").default(0),
  batchSize: integer("batch_size").default(50),
  concurrencyLimit: integer("concurrency_limit").default(3),
  createdBy: varchar("created_by"),
  claimedBy: varchar("claimed_by"),
  heartbeatAt: timestamp("heartbeat_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBgJobSchema = createInsertSchema(bgJobs).omit({ id: true, createdAt: true });
export type BgJob = typeof bgJobs.$inferSelect;
export type InsertBgJob = z.infer<typeof insertBgJobSchema>;

export const bgJobBatches = pgTable("bg_job_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull(),
  batchIndex: integer("batch_index").notNull().default(0),
  status: text("status").notNull().default("queued"),
  totalItems: integer("total_items").default(0),
  completedItems: integer("completed_items").default(0),
  failedItems: integer("failed_items").default(0),
  payload: jsonb("payload").default(sql`'{}'::jsonb`),
  result: jsonb("result").default(sql`'{}'::jsonb`),
  error: text("error"),
  retryCount: integer("retry_count").default(0),
  maxRetries: integer("max_retries").default(3),
  claimedBy: varchar("claimed_by"),
  heartbeatAt: timestamp("heartbeat_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBgJobBatchSchema = createInsertSchema(bgJobBatches).omit({ id: true, createdAt: true });
export type BgJobBatch = typeof bgJobBatches.$inferSelect;
export type InsertBgJobBatch = z.infer<typeof insertBgJobBatchSchema>;

export const bgJobItems = pgTable("bg_job_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull(),
  batchId: varchar("batch_id").notNull(),
  itemIndex: integer("item_index").default(0),
  status: text("status").notNull().default("pending"),
  contentType: text("content_type"),
  contentPayload: jsonb("content_payload").default(sql`'{}'::jsonb`),
  error: text("error"),
  savedAt: timestamp("saved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBgJobItemSchema = createInsertSchema(bgJobItems).omit({ id: true, createdAt: true });
export type BgJobItem = typeof bgJobItems.$inferSelect;
export type InsertBgJobItem = z.infer<typeof insertBgJobItemSchema>;

export const bgJobSettings = pgTable("bg_job_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBgJobSettingsSchema = createInsertSchema(bgJobSettings).omit({ id: true, createdAt: true, updatedAt: true });
export type BgJobSetting = typeof bgJobSettings.$inferSelect;
export type InsertBgJobSetting = z.infer<typeof insertBgJobSettingsSchema>;

export const ENVIRONMENT_TARGETS = ["development", "staging", "production"] as const;
export type EnvironmentTarget = typeof ENVIRONMENT_TARGETS[number];

export const CONTENT_PUBLISH_STATUSES = ["draft", "validated", "approved", "published_live", "failed_verification"] as const;
export type ContentPublishStatus = typeof CONTENT_PUBLISH_STATUSES[number];

export const environmentWriteAudit = pgTable("environment_write_audit", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  actorId: varchar("actor_id"),
  actorUsername: text("actor_username"),
  selectedTarget: text("selected_target").notNull(),
  actualEnvironment: text("actual_environment").notNull(),
  actualDbFingerprint: text("actual_db_fingerprint"),
  contentType: text("content_type").notNull(),
  entityId: varchar("entity_id"),
  itemCount: integer("item_count").default(0),
  actionType: text("action_type").notNull(),
  providerModel: text("provider_model"),
  approvalState: text("approval_state"),
  writeSummary: text("write_summary"),
  preflightResult: jsonb("preflight_result"),
  postWriteResult: jsonb("post_write_result"),
  success: boolean("success").default(false),
  failureReason: text("failure_reason"),
  mismatchReason: text("mismatch_reason"),
  blockReason: text("block_reason"),
  dryRun: boolean("dry_run").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEnvironmentWriteAuditSchema = createInsertSchema(environmentWriteAudit).omit({ id: true, createdAt: true });
export type EnvironmentWriteAudit = typeof environmentWriteAudit.$inferSelect;
export type InsertEnvironmentWriteAudit = z.infer<typeof insertEnvironmentWriteAuditSchema>;

export const aiProviders = pgTable("ai_providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  providerType: text("provider_type").notNull(),
  endpointUrl: text("endpoint_url").notNull(),
  apiKey: text("api_key"),
  models: text("models").array().default(sql`'{}'::text[]`),
  costPerInputToken: doublePrecision("cost_per_input_token").default(0),
  costPerOutputToken: doublePrecision("cost_per_output_token").default(0),
  maxConcurrency: integer("max_concurrency").default(5),
  rateLimit: integer("rate_limit").default(60),
  healthEndpoint: text("health_endpoint"),
  priority: integer("priority").default(100),
  enabled: boolean("enabled").default(true),
  isHealthy: boolean("is_healthy").default(true),
  lastHealthCheck: timestamp("last_health_check"),
  consecutiveFailures: integer("consecutive_failures").default(0),
  taskTypes: text("task_types").array().default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiProviderSchema = createInsertSchema(aiProviders).omit({ id: true, createdAt: true, updatedAt: true, isHealthy: true, lastHealthCheck: true, consecutiveFailures: true });
export type AiProvider = typeof aiProviders.$inferSelect;
export type InsertAiProvider = z.infer<typeof insertAiProviderSchema>;

export const aiRequestLogs = pgTable("ai_request_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id"),
  providerName: text("provider_name"),
  model: text("model"),
  taskType: text("task_type"),
  feature: text("feature"),
  inputTokens: integer("input_tokens").default(0),
  outputTokens: integer("output_tokens").default(0),
  totalTokens: integer("total_tokens").default(0),
  estimatedCost: doublePrecision("estimated_cost").default(0),
  latencyMs: integer("latency_ms").default(0),
  success: boolean("success").default(true),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiRequestLogSchema = createInsertSchema(aiRequestLogs).omit({ id: true, createdAt: true });
export type AiRequestLog = typeof aiRequestLogs.$inferSelect;
export type InsertAiRequestLog = z.infer<typeof insertAiRequestLogSchema>;

export const aiCostBudgets = pgTable("ai_cost_budgets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  budgetType: text("budget_type").notNull(),
  maxTokens: integer("max_tokens").default(1000000),
  maxCostUsd: doublePrecision("max_cost_usd").default(50),
  alertThresholdPct: integer("alert_threshold_pct").default(80),
  currentTokens: integer("current_tokens").default(0),
  currentCostUsd: doublePrecision("current_cost_usd").default(0),
  periodStart: timestamp("period_start").defaultNow().notNull(),
  periodEnd: timestamp("period_end"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiCostBudgetSchema = createInsertSchema(aiCostBudgets).omit({ id: true, updatedAt: true, currentTokens: true, currentCostUsd: true });
export type AiCostBudget = typeof aiCostBudgets.$inferSelect;
export type InsertAiCostBudget = z.infer<typeof insertAiCostBudgetSchema>;

export const securityAuditLogs = pgTable("security_audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  ipAddress: text("ip_address"),
  endpoint: text("endpoint").notNull(),
  eventType: text("event_type").notNull(),
  requestCount: integer("request_count").default(1),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSecurityAuditLogSchema = createInsertSchema(securityAuditLogs).omit({ id: true, createdAt: true });
export type SecurityAuditLog = typeof securityAuditLogs.$inferSelect;
export type InsertSecurityAuditLog = z.infer<typeof insertSecurityAuditLogSchema>;

export const contentAccessCounters = pgTable("content_access_counters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  contentType: text("content_type").notNull(),
  accessDate: text("access_date").notNull(),
  count: integer("count").notNull().default(0),
});

export const insertContentAccessCounterSchema = createInsertSchema(contentAccessCounters).omit({ id: true });
export type ContentAccessCounter = typeof contentAccessCounters.$inferSelect;
export type InsertContentAccessCounter = z.infer<typeof insertContentAccessCounterSchema>;

export const watermarkSessions = pgTable("watermark_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  maskedEmail: text("masked_email"),
  userIdSuffix: text("user_id_suffix"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

export const emailVerificationCodes = pgTable("email_verification_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmailVerificationCodeSchema = createInsertSchema(emailVerificationCodes).omit({ id: true, createdAt: true });
export type EmailVerificationCode = typeof emailVerificationCodes.$inferSelect;
export type InsertEmailVerificationCode = z.infer<typeof insertEmailVerificationCodeSchema>;

export const trialEntitlements = pgTable("trial_entitlements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  selectedTier: text("selected_tier").notNull(),
  trialStartedAt: timestamp("trial_started_at").defaultNow().notNull(),
  trialEndsAt: timestamp("trial_ends_at").notNull(),
  trialStatus: text("trial_status").notNull().default("active"),
  verifiedEmailAt: timestamp("verified_email_at"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeTrialSubscriptionId: text("stripe_trial_subscription_id"),
  paymentFingerprint: text("payment_fingerprint"),
  deviceFingerprintHash: text("device_fingerprint_hash"),
  signupIp: text("signup_ip"),
  lastSeenIp: text("last_seen_ip"),
  abuseFlags: jsonb("abuse_flags").default(sql`'[]'::jsonb`),
  consumptionCounters: jsonb("consumption_counters").default(sql`'{"questions":0,"flashcards":0,"lessons":0,"mockExams":0}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTrialEntitlementSchema = createInsertSchema(trialEntitlements).omit({ id: true, createdAt: true });
export type TrialEntitlement = typeof trialEntitlements.$inferSelect;
export type InsertTrialEntitlement = z.infer<typeof insertTrialEntitlementSchema>;

export const businessExpenses = pgTable("business_expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  vendor: text("vendor").notNull(),
  description: text("description"),
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").notNull().default("CAD"),
  date: text("date").notNull(),
  recurring: boolean("recurring").default(false),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBusinessExpenseSchema = createInsertSchema(businessExpenses).omit({ id: true, createdAt: true, updatedAt: true });
export type BusinessExpense = typeof businessExpenses.$inferSelect;
export type InsertBusinessExpense = z.infer<typeof insertBusinessExpenseSchema>;

export const adminFinance = pgTable("admin_finance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  label: text("label").notNull(),
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").default("USD"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAdminFinanceSchema = createInsertSchema(adminFinance).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAdminFinance = z.infer<typeof insertAdminFinanceSchema>;
export type AdminFinance = typeof adminFinance.$inferSelect;

export const newGradTemplates = pgTable("new_grad_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  templateType: text("template_type").notNull(),
  category: text("category"),
  description: text("description"),
  content: jsonb("content").default(sql`'{}'::jsonb`),
  previewContent: text("preview_content"),
  isPremium: boolean("is_premium").default(true),
  status: text("status").default("published"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertNewGradTemplateSchema = createInsertSchema(newGradTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type NewGradTemplate = typeof newGradTemplates.$inferSelect;
export type InsertNewGradTemplate = z.infer<typeof insertNewGradTemplateSchema>;

export const newGradInterviewQuestions = pgTable("new_grad_interview_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  question: text("question").notNull(),
  sampleAnswer: text("sample_answer"),
  tips: text("tips"),
  difficulty: text("difficulty").default("moderate"),
  isPremium: boolean("is_premium").default(false),
  status: text("status").default("published"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewGradInterviewQuestionSchema = createInsertSchema(newGradInterviewQuestions).omit({
  id: true,
  createdAt: true,
});
export type NewGradInterviewQuestion = typeof newGradInterviewQuestions.$inferSelect;
export type InsertNewGradInterviewQuestion = z.infer<typeof insertNewGradInterviewQuestionSchema>;

export const contentWeeklyReports = pgTable("content_weekly_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  weekStart: timestamp("week_start").notNull(),
  weekEnd: timestamp("week_end").notNull(),
  lessonsCreated: integer("lessons_created").default(0).notNull(),
  blogPostsCreated: integer("blog_posts_created").default(0).notNull(),
  flashcardsCreated: integer("flashcards_created").default(0).notNull(),
  examQuestionsCreated: integer("exam_questions_created").default(0).notNull(),
  seoArticlesCreated: integer("seo_articles_created").default(0).notNull(),
  totalContentCreated: integer("total_content_created").default(0).notNull(),
  previousWeekTotal: integer("previous_week_total").default(0),
  weekOverWeekChange: doublePrecision("week_over_week_change").default(0),
  breakdownJson: jsonb("breakdown_json").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContentWeeklyReportSchema = createInsertSchema(contentWeeklyReports).omit({
  id: true,
  createdAt: true,
});
export type ContentWeeklyReport = typeof contentWeeklyReports.$inferSelect;
export type InsertContentWeeklyReport = z.infer<typeof insertContentWeeklyReportSchema>;

export const searchPerformanceSnapshots = pgTable("search_performance_snapshots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  snapshotDate: timestamp("snapshot_date").notNull(),
  indexedPages: integer("indexed_pages").default(0),
  totalImpressions: integer("total_impressions").default(0),
  totalClicks: integer("total_clicks").default(0),
  averageCtr: doublePrecision("average_ctr").default(0),
  averagePosition: doublePrecision("average_position").default(0),
  topKeywordsJson: jsonb("top_keywords_json").default(sql`'[]'::jsonb`),
  topPagesJson: jsonb("top_pages_json").default(sql`'[]'::jsonb`),
  dataSource: text("data_source").default("internal"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSearchPerformanceSnapshotSchema = createInsertSchema(searchPerformanceSnapshots).omit({
  id: true,
  createdAt: true,
});
export type SearchPerformanceSnapshot = typeof searchPerformanceSnapshots.$inferSelect;
export type InsertSearchPerformanceSnapshot = z.infer<typeof insertSearchPerformanceSnapshotSchema>;
