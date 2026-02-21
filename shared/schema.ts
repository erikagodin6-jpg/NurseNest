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
