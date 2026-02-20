import { type User, type InsertUser, type Note, type InsertNote, type TestResult, type InsertTestResult, type UserProgress, type InsertUserProgress, users, notes, testResults, userProgress } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, desc } from "drizzle-orm";
import pg from "pg";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getNote(userId: string, lessonId: string): Promise<Note | undefined>;
  getNotesByUser(userId: string): Promise<Note[]>;
  upsertNote(note: InsertNote): Promise<Note>;
  deleteNote(userId: string, lessonId: string): Promise<void>;
  getTestResults(userId: string, lessonId?: string): Promise<TestResult[]>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getProgressForLesson(userId: string, lessonId: string): Promise<UserProgress | undefined>;
  upsertProgress(progress: InsertUserProgress): Promise<UserProgress>;
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
}

export const storage = new DatabaseStorage();
