import { type User, type InsertUser, type Note, type InsertNote, type TestResult, type InsertTestResult, type UserProgress, type InsertUserProgress, type ContentItem, type InsertContentItem, type FeatureUsage, type UserFlashcard, type InsertUserFlashcard, type BlogConfig, users, notes, testResults, userProgress, contentItems, featureUsage, userFlashcards, blogConfig } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, desc, sql, lte, ne, ilike } from "drizzle-orm";
import pg from "pg";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, info: { stripeCustomerId?: string; stripeSubscriptionId?: string; subscriptionStatus?: string; tier?: string }): Promise<User>;
  getNote(userId: string, lessonId: string): Promise<Note | undefined>;
  getNotesByUser(userId: string): Promise<Note[]>;
  upsertNote(note: InsertNote): Promise<Note>;
  deleteNote(userId: string, lessonId: string): Promise<void>;
  getTestResults(userId: string, lessonId?: string): Promise<TestResult[]>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getProgressForLesson(userId: string, lessonId: string): Promise<UserProgress | undefined>;
  upsertProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getProduct(productId: string): Promise<any>;
  listProducts(active?: boolean): Promise<any[]>;
  listProductsWithPrices(active?: boolean): Promise<any[]>;
  getPrice(priceId: string): Promise<any>;
  getPricesForProduct(productId: string): Promise<any[]>;
  getSubscription(subscriptionId: string): Promise<any>;
  getFeatureUsage(userId: string, feature: string, date: string): Promise<FeatureUsage | undefined>;
  incrementFeatureUsage(userId: string, feature: string, date: string): Promise<FeatureUsage>;
  getAllContentItems(): Promise<ContentItem[]>;
  getContentItem(id: string): Promise<ContentItem | undefined>;
  getContentItemBySlug(slug: string): Promise<ContentItem | undefined>;
  getPublishedContent(type?: string, category?: string): Promise<ContentItem[]>;
  getScheduledContentDue(): Promise<ContentItem[]>;
  publishScheduledContent(): Promise<number>;
  checkDuplicateSlug(slug: string, excludeId?: string): Promise<boolean>;
  checkKeywordOverlap(primaryKeyword: string, excludeId?: string): Promise<ContentItem[]>;
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  updateContentItem(id: string, updates: Partial<InsertContentItem>): Promise<ContentItem>;
  deleteContentItem(id: string): Promise<void>;
  getUserFlashcards(userId: string): Promise<UserFlashcard[]>;
  createUserFlashcard(card: InsertUserFlashcard): Promise<UserFlashcard>;
  updateUserFlashcard(id: string, userId: string, updates: Partial<InsertUserFlashcard>): Promise<UserFlashcard>;
  deleteUserFlashcard(id: string, userId: string): Promise<void>;
  getBlogConfig(): Promise<BlogConfig | undefined>;
  upsertBlogConfig(config: Partial<BlogConfig>): Promise<BlogConfig>;
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
export { pool };
const db = drizzle(pool);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, info: { stripeCustomerId?: string; stripeSubscriptionId?: string; subscriptionStatus?: string; tier?: string }): Promise<User> {
    const updates: any = {};
    if (info.stripeCustomerId !== undefined) updates.stripeCustomerId = info.stripeCustomerId;
    if (info.stripeSubscriptionId !== undefined) updates.stripeSubscriptionId = info.stripeSubscriptionId;
    if (info.subscriptionStatus !== undefined) updates.subscriptionStatus = info.subscriptionStatus;
    if (info.tier !== undefined) updates.tier = info.tier;
    const [user] = await db.update(users).set(updates).where(eq(users.id, userId)).returning();
    return user;
  }

  async getNote(userId: string, lessonId: string): Promise<Note | undefined> {
    const [note] = await db.select().from(notes).where(and(eq(notes.userId, userId), eq(notes.lessonId, lessonId)));
    return note;
  }

  async getNotesByUser(userId: string): Promise<Note[]> {
    return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(desc(notes.updatedAt));
  }

  async upsertNote(note: InsertNote): Promise<Note> {
    const existing = await this.getNote(note.userId, note.lessonId);
    if (existing) {
      const [updated] = await db.update(notes).set({ content: note.content, updatedAt: new Date() }).where(eq(notes.id, existing.id)).returning();
      return updated;
    }
    const [created] = await db.insert(notes).values(note).returning();
    return created;
  }

  async deleteNote(userId: string, lessonId: string): Promise<void> {
    await db.delete(notes).where(and(eq(notes.userId, userId), eq(notes.lessonId, lessonId)));
  }

  async getTestResults(userId: string, lessonId?: string): Promise<TestResult[]> {
    if (lessonId) {
      return db.select().from(testResults).where(and(eq(testResults.userId, userId), eq(testResults.lessonId, lessonId))).orderBy(desc(testResults.completedAt));
    }
    return db.select().from(testResults).where(eq(testResults.userId, userId)).orderBy(desc(testResults.completedAt));
  }

  async createTestResult(result: InsertTestResult): Promise<TestResult> {
    const [created] = await db.insert(testResults).values(result).returning();
    return created;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return db.select().from(userProgress).where(eq(userProgress.userId, userId)).orderBy(desc(userProgress.lastAccessed));
  }

  async getProgressForLesson(userId: string, lessonId: string): Promise<UserProgress | undefined> {
    const [progress] = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)));
    return progress;
  }

  async upsertProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const existing = await this.getProgressForLesson(progress.userId, progress.lessonId);
    if (existing) {
      const updates: Partial<UserProgress> = { lastAccessed: new Date() };
      if (progress.completed !== undefined) updates.completed = progress.completed;
      if (progress.preTestScore !== undefined) updates.preTestScore = progress.preTestScore;
      if (progress.postTestScore !== undefined) updates.postTestScore = progress.postTestScore;
      const [updated] = await db.update(userProgress).set(updates).where(eq(userProgress.id, existing.id)).returning();
      return updated;
    }
    const [created] = await db.insert(userProgress).values(progress).returning();
    return created;
  }

  async getProduct(productId: string): Promise<any> {
    const result = await db.execute(sql`SELECT * FROM stripe.products WHERE id = ${productId}`);
    return result.rows[0] || null;
  }

  async listProducts(active = true): Promise<any[]> {
    const result = await db.execute(sql`SELECT * FROM stripe.products WHERE active = ${active}`);
    return result.rows;
  }

  async listProductsWithPrices(active = true): Promise<any[]> {
    const result = await db.execute(sql`
      WITH paginated_products AS (
        SELECT id, name, description, metadata, active
        FROM stripe.products
        WHERE active = ${active}
        ORDER BY id
      )
      SELECT 
        p.id as product_id, p.name as product_name, p.description as product_description,
        p.active as product_active, p.metadata as product_metadata,
        pr.id as price_id, pr.unit_amount, pr.currency, pr.recurring,
        pr.active as price_active, pr.metadata as price_metadata
      FROM paginated_products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      ORDER BY p.id, pr.unit_amount
    `);
    return result.rows;
  }

  async getPrice(priceId: string): Promise<any> {
    const result = await db.execute(sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`);
    return result.rows[0] || null;
  }

  async getPricesForProduct(productId: string): Promise<any[]> {
    const result = await db.execute(sql`SELECT * FROM stripe.prices WHERE product = ${productId} AND active = true`);
    return result.rows;
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const result = await db.execute(sql`SELECT * FROM stripe.subscriptions WHERE id = ${subscriptionId}`);
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const rows = await db.select().from(users);
    return rows.map(({ password, ...rest }) => rest);
  }

  async getAllTestResults(): Promise<TestResult[]> {
    return db.select().from(testResults).orderBy(desc(testResults.completedAt));
  }

  async getAllProgress(): Promise<UserProgress[]> {
    return db.select().from(userProgress).orderBy(desc(userProgress.lastAccessed));
  }

  async getAllNotes(): Promise<Note[]> {
    return db.select().from(notes).orderBy(desc(notes.updatedAt));
  }

  async getAllContentItems(): Promise<ContentItem[]> {
    return db.select().from(contentItems).orderBy(desc(contentItems.updatedAt));
  }

  async getContentItem(id: string): Promise<ContentItem | undefined> {
    const [item] = await db.select().from(contentItems).where(eq(contentItems.id, id));
    return item;
  }

  async getContentItemBySlug(slug: string): Promise<ContentItem | undefined> {
    const [item] = await db.select().from(contentItems).where(eq(contentItems.slug, slug));
    return item;
  }

  async getPublishedContent(type?: string, category?: string): Promise<ContentItem[]> {
    const conditions = [eq(contentItems.status, "published")];
    if (type) conditions.push(eq(contentItems.type, type));
    if (category) conditions.push(eq(contentItems.category, category));
    return db.select().from(contentItems).where(and(...conditions)).orderBy(desc(contentItems.publishedAt));
  }

  async getScheduledContentDue(): Promise<ContentItem[]> {
    return db.select().from(contentItems)
      .where(and(
        eq(contentItems.status, "scheduled"),
        lte(contentItems.scheduledAt, new Date())
      ));
  }

  async publishScheduledContent(): Promise<number> {
    const due = await this.getScheduledContentDue();
    let published = 0;
    for (const item of due) {
      if (item.clinicalSafetyReview && !item.autoPublish) continue;
      await db.update(contentItems)
        .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
        .where(eq(contentItems.id, item.id));
      published++;
    }
    return published;
  }

  async checkDuplicateSlug(slug: string, excludeId?: string): Promise<boolean> {
    const conditions = [eq(contentItems.slug, slug)];
    if (excludeId) conditions.push(ne(contentItems.id, excludeId));
    const [existing] = await db.select().from(contentItems).where(and(...conditions));
    return !!existing;
  }

  async checkKeywordOverlap(primaryKeyword: string, excludeId?: string): Promise<ContentItem[]> {
    const conditions = [ilike(contentItems.primaryKeyword, `%${primaryKeyword}%`)];
    if (excludeId) conditions.push(ne(contentItems.id, excludeId));
    return db.select().from(contentItems).where(and(...conditions));
  }

  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const [created] = await db.insert(contentItems).values(item).returning();
    return created;
  }

  async updateContentItem(id: string, updates: Partial<InsertContentItem>): Promise<ContentItem> {
    const [updated] = await db.update(contentItems)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contentItems.id, id))
      .returning();
    return updated;
  }

  async deleteContentItem(id: string): Promise<void> {
    await db.delete(contentItems).where(eq(contentItems.id, id));
  }
  async getFeatureUsage(userId: string, feature: string, date: string): Promise<FeatureUsage | undefined> {
    const [row] = await db.select().from(featureUsage).where(
      and(eq(featureUsage.userId, userId), eq(featureUsage.feature, feature), eq(featureUsage.usageDate, date))
    );
    return row;
  }

  async incrementFeatureUsage(userId: string, feature: string, date: string): Promise<FeatureUsage> {
    const result = await db.execute(sql`
      INSERT INTO feature_usage (id, user_id, feature, usage_date, count)
      VALUES (gen_random_uuid(), ${userId}, ${feature}, ${date}, 1)
      ON CONFLICT (user_id, feature, usage_date) DO UPDATE
      SET count = feature_usage.count + 1
      RETURNING *
    `);
    return result.rows[0] as FeatureUsage;
  }

  async getUserFlashcards(userId: string): Promise<UserFlashcard[]> {
    return db.select().from(userFlashcards).where(eq(userFlashcards.userId, userId)).orderBy(desc(userFlashcards.createdAt));
  }

  async createUserFlashcard(card: InsertUserFlashcard): Promise<UserFlashcard> {
    const [created] = await db.insert(userFlashcards).values(card).returning();
    return created;
  }

  async updateUserFlashcard(id: string, userId: string, updates: Partial<InsertUserFlashcard>): Promise<UserFlashcard> {
    const [updated] = await db.update(userFlashcards)
      .set(updates)
      .where(and(eq(userFlashcards.id, id), eq(userFlashcards.userId, userId)))
      .returning();
    return updated;
  }

  async deleteUserFlashcard(id: string, userId: string): Promise<void> {
    await db.delete(userFlashcards).where(and(eq(userFlashcards.id, id), eq(userFlashcards.userId, userId)));
  }

  async getBlogConfig(): Promise<BlogConfig | undefined> {
    const [config] = await db.select().from(blogConfig);
    return config;
  }

  async upsertBlogConfig(config: Partial<BlogConfig>): Promise<BlogConfig> {
    const existing = await this.getBlogConfig();
    if (existing) {
      const [updated] = await db.update(blogConfig)
        .set({ ...config, updatedAt: new Date() })
        .where(eq(blogConfig.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(blogConfig).values(config as any).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
