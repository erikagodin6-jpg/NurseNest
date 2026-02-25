import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
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
