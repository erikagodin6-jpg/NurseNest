import { type User, type InsertUser, type Note, type InsertNote, type TestResult, type InsertTestResult, type UserProgress, type InsertUserProgress, type ContentItem, type InsertContentItem, users, notes, testResults, userProgress, contentItems } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, desc, sql } from "drizzle-orm";
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
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
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

  async getPublishedContent(): Promise<ContentItem[]> {
    return db.select().from(contentItems).where(eq(contentItems.status, "published")).orderBy(desc(contentItems.publishedAt));
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
}

export const storage = new DatabaseStorage();
