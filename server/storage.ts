import { type User, type InsertUser, type Note, type InsertNote, type TestResult, type InsertTestResult, type UserProgress, type InsertUserProgress, type ContentItem, type InsertContentItem, type FeatureUsage, type UserFlashcard, type InsertUserFlashcard, type BlogConfig, type PageView, type InsertPageView, type UserFeedback, type InsertUserFeedback, type QotdHistory, type EmailSubscriber, type InsertEmailSubscriber, type SocialPost, type InsertSocialPost, type DashboardWidget, type InsertDashboardWidget, type SiteImage, type InsertSiteImage, type CustomPageModule, type InsertCustomPageModule, type AudioClip, type InsertAudioClip, type LessonAudioLink, type InsertLessonAudioLink, type ExamQuestion, type InsertExamQuestion, type QuestionTypeRegistryEntry, type InsertQuestionTypeRegistryEntry, type QuestionScheduleLog, type DigitalProduct, type InsertDigitalProduct, type ProductPurchase, type InsertProductPurchase, type QbankDraft, type InsertQbankDraft, type QbankRecipe, type InsertQbankRecipe, type DiagnosticAssessment, type InsertDiagnosticAssessment, type UserStats, type InsertUserStats, type StudyGroup, type InsertStudyGroup, type StudyGroupMember, type InsertStudyGroupMember, type QuestionAnalytics, type InsertQuestionAnalytics, type FriendRequest, type InsertFriendRequest, type FriendConnection, type InsertFriendConnection, type ProductGeneration, type InsertProductGeneration, type GeneratedQuestion, type InsertGeneratedQuestion, type GeneratorV2PresentationSettings, type InsertGeneratorV2PresentationSettings, type TesterInviteCode, type InsertTesterInviteCode, type TesterFeedback, type InsertTesterFeedback, type ImagingQuestion, type InsertImagingQuestion, type ImageAsset, type InsertImageAsset, type ImagingFlashcard, type InsertImagingFlashcard, type ImagingCaseStudy, type InsertImagingCaseStudy, type ImagingExamAttempt, type InsertImagingExamAttempt, type ImagingExamAttemptQuestion, type InsertImagingExamAttemptQuestion, type ImagingPositioningEntry, type InsertImagingPositioningEntry, type ImagingPhysicsTopic, type InsertImagingPhysicsTopic, users, notes, testResults, userProgress, contentItems, featureUsage, userFlashcards, blogConfig, pageViews, userFeedback, qotdHistory, emailSubscribers, socialPosts, dashboardWidgets, siteImages, customPageModules, audioClips, lessonAudioLinks, examQuestions, questionTypeRegistry, questionScheduleLog, digitalProducts, productPurchases, couponCodes, qbankDrafts, qbankRecipes, diagnosticAssessments, userStats, studyGroups, studyGroupMembers, questionAnalytics, friendRequests, friendConnections, productGenerations, generatedQuestions, generatorV2PresentationSettings, generationEvents, v2ContentBlocks, testerInviteCodes, testerFeedback, imagingQuestions, imageAssets, imagingFlashcards, imagingCaseStudies, imagingExamAttempts, imagingExamAttemptQuestions, imagingPositioningEntries, imagingPhysicsTopics } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, desc, sql, lte, ne, ilike, gte, count } from "drizzle-orm";
import pg from "pg";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTier(userId: string, tier: string): Promise<void>;
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
  createPageView(view: InsertPageView): Promise<PageView>;
  getPageViewAnalytics(days?: number): Promise<any>;
  updatePageViewDuration(sessionId: string, page: string, duration: number): Promise<void>;
  createFeedback(feedback: InsertUserFeedback): Promise<UserFeedback>;
  getAllFeedback(): Promise<UserFeedback[]>;
  updateFeedback(id: string, updates: Partial<UserFeedback>): Promise<UserFeedback>;
  upvoteFeedback(id: string): Promise<UserFeedback>;
  getQotdByDate(date: string): Promise<QotdHistory | undefined>;
  createQotd(data: Partial<QotdHistory>): Promise<QotdHistory>;
  getRecentQotd(limit?: number): Promise<QotdHistory[]>;
  createEmailSubscriber(data: InsertEmailSubscriber): Promise<EmailSubscriber>;
  getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined>;
  updateEmailSubscriber(email: string, updates: Partial<InsertEmailSubscriber>): Promise<EmailSubscriber | undefined>;
  deleteEmailSubscriber(email: string): Promise<void>;
  getAllSocialPosts(): Promise<SocialPost[]>;
  getScheduledSocialPosts(): Promise<SocialPost[]>;
  getSocialPost(id: string): Promise<SocialPost | undefined>;
  createSocialPost(data: InsertSocialPost): Promise<SocialPost>;
  updateSocialPost(id: string, updates: Partial<SocialPost>): Promise<SocialPost>;
  deleteSocialPost(id: string): Promise<void>;
  getDashboardWidgets(userId: string): Promise<DashboardWidget[]>;
  saveDashboardWidgets(userId: string, widgets: { widgetType: string; position: number; visible: boolean; config?: any }[]): Promise<DashboardWidget[]>;
  getAllSiteImages(): Promise<SiteImage[]>;
  getSiteImage(key: string): Promise<SiteImage | undefined>;
  upsertSiteImage(key: string, url: string, alt?: string): Promise<SiteImage>;
  deleteSiteImage(key: string): Promise<void>;
  getCustomModules(page: string): Promise<CustomPageModule[]>;
  getCustomModule(id: string): Promise<CustomPageModule | undefined>;
  createCustomModule(data: InsertCustomPageModule): Promise<CustomPageModule>;
  updateCustomModule(id: string, updates: Partial<InsertCustomPageModule>): Promise<CustomPageModule>;
  deleteCustomModule(id: string): Promise<void>;
  getAllAudioClips(): Promise<AudioClip[]>;
  getAudioClip(id: string): Promise<AudioClip | undefined>;
  getAudioClipsByCategory(category: string): Promise<AudioClip[]>;
  createAudioClip(clip: InsertAudioClip): Promise<AudioClip>;
  updateAudioClip(id: string, updates: Partial<InsertAudioClip>): Promise<AudioClip>;
  deleteAudioClip(id: string): Promise<void>;
  getLessonAudioLinks(lessonId: string): Promise<(LessonAudioLink & { clip: AudioClip })[]>;
  createLessonAudioLink(link: InsertLessonAudioLink): Promise<LessonAudioLink>;
  deleteLessonAudioLink(id: string): Promise<void>;
  getAllExamQuestions(filters?: { tier?: string; exam?: string; questionType?: string; status?: string; bodySystem?: string }): Promise<ExamQuestion[]>;
  getExamQuestion(id: string): Promise<ExamQuestion | undefined>;
  createExamQuestion(q: InsertExamQuestion): Promise<ExamQuestion>;
  createExamQuestionsBulk(questions: InsertExamQuestion[]): Promise<ExamQuestion[]>;
  updateExamQuestion(id: string, updates: Partial<InsertExamQuestion>): Promise<ExamQuestion>;
  deleteExamQuestion(id: string): Promise<void>;
  publishScheduledQuestions(): Promise<number>;
  getQuestionTypeRegistry(exam?: string): Promise<QuestionTypeRegistryEntry[]>;
  upsertQuestionTypeRegistry(entry: InsertQuestionTypeRegistryEntry): Promise<QuestionTypeRegistryEntry>;
  createQuestionScheduleLog(log: { questionId: string; action: string; previousStatus?: string; newStatus?: string; actorId?: string }): Promise<QuestionScheduleLog>;
  listDigitalProducts(activeOnly?: boolean): Promise<DigitalProduct[]>;
  getDigitalProduct(id: string): Promise<DigitalProduct | undefined>;
  getDigitalProductBySlug(slug: string): Promise<DigitalProduct | undefined>;
  createDigitalProduct(product: InsertDigitalProduct): Promise<DigitalProduct>;
  updateDigitalProduct(id: string, updates: Partial<InsertDigitalProduct>): Promise<DigitalProduct>;
  deleteDigitalProduct(id: string): Promise<void>;
  createProductPurchase(purchase: InsertProductPurchase): Promise<ProductPurchase>;
  getUserPurchases(userId: string): Promise<(ProductPurchase & { product: DigitalProduct })[]>;
  getPurchase(id: string): Promise<ProductPurchase | undefined>;
  incrementDownloadCount(purchaseId: string): Promise<void>;
  getProductSales(): Promise<{ productId: string; title: string; totalSales: number; totalRevenue: number }[]>;
  validateCoupon(code: string): Promise<{ valid: boolean; discountType?: string; discountValue?: number }>;
  useCoupon(code: string): Promise<void>;

  listQbankDrafts(): Promise<QbankDraft[]>;
  getQbankDraft(id: string): Promise<QbankDraft | undefined>;
  createQbankDraft(draft: InsertQbankDraft): Promise<QbankDraft>;
  updateQbankDraft(id: string, updates: Partial<InsertQbankDraft>): Promise<QbankDraft>;
  deleteQbankDraft(id: string): Promise<void>;

  listQbankRecipes(): Promise<QbankRecipe[]>;
  getQbankRecipe(id: string): Promise<QbankRecipe | undefined>;
  createQbankRecipe(recipe: InsertQbankRecipe): Promise<QbankRecipe>;
  updateQbankRecipe(id: string, updates: Partial<InsertQbankRecipe>): Promise<QbankRecipe>;
  deleteQbankRecipe(id: string): Promise<void>;

  createDiagnosticAssessment(data: InsertDiagnosticAssessment): Promise<DiagnosticAssessment>;
  getDiagnosticAssessment(id: string): Promise<DiagnosticAssessment | undefined>;
  getUserDiagnostics(userId: string): Promise<DiagnosticAssessment[]>;

  getUserStats(userId: string): Promise<UserStats | undefined>;
  upsertUserStats(userId: string, updates: Partial<InsertUserStats>): Promise<UserStats>;

  createStudyGroup(data: InsertStudyGroup): Promise<StudyGroup>;
  getStudyGroup(id: string): Promise<StudyGroup | undefined>;
  getStudyGroupByCode(code: string): Promise<StudyGroup | undefined>;
  getUserStudyGroups(userId: string): Promise<StudyGroup[]>;
  addStudyGroupMember(data: InsertStudyGroupMember): Promise<StudyGroupMember>;
  getStudyGroupMembers(groupId: string): Promise<(StudyGroupMember & { username: string; stats?: UserStats })[]>;
  removeStudyGroupMember(groupId: string, userId: string): Promise<void>;

  getQuestionAnalytics(questionId: string): Promise<QuestionAnalytics | undefined>;
  upsertQuestionAnalytics(data: InsertQuestionAnalytics): Promise<QuestionAnalytics>;

  createFriendRequest(data: InsertFriendRequest): Promise<FriendRequest>;
  getFriendRequest(id: string): Promise<FriendRequest | undefined>;
  getPendingFriendRequests(userId: string): Promise<FriendRequest[]>;
  updateFriendRequestStatus(id: string, status: string): Promise<FriendRequest>;

  createFriendConnection(data: InsertFriendConnection): Promise<FriendConnection>;
  getUserFriendConnections(userId: string): Promise<FriendConnection[]>;
  removeFriendConnection(id: string): Promise<void>;

  createProductGeneration(data: InsertProductGeneration): Promise<ProductGeneration>;
  getProductGeneration(id: string): Promise<ProductGeneration | undefined>;
  updateProductGeneration(id: string, updates: Partial<InsertProductGeneration> & { createdCount?: number; status?: string; lastError?: string | null; startedAt?: Date; completedAt?: Date; promptState?: any }): Promise<ProductGeneration>;
  listProductGenerations(): Promise<ProductGeneration[]>;
  deleteProductGeneration(id: string): Promise<void>;

  createGeneratedQuestion(data: InsertGeneratedQuestion): Promise<GeneratedQuestion>;
  createGeneratedQuestionsBulk(data: InsertGeneratedQuestion[]): Promise<GeneratedQuestion[]>;
  getGeneratedQuestions(generationId: string): Promise<GeneratedQuestion[]>;
  getGeneratedQuestionCount(generationId: string): Promise<number>;
  deleteGeneratedQuestion(id: string): Promise<void>;
  updateGeneratedQuestion(id: string, data: Partial<{ stem: string; scenario: string; choices: any; correctAnswers: any; rationale: any; examPearl: string }>): Promise<any>;

  createGenerationEvent(data: { generationId: string; eventType: string; payload?: any }): Promise<void>;
  getGenerationEvents(generationId: string): Promise<any[]>;

  getAllImagingQuestions(filters?: { country?: string; examType?: string; topic?: string; difficulty?: string; status?: string }): Promise<ImagingQuestion[]>;
  getImagingQuestion(id: string): Promise<ImagingQuestion | undefined>;
  createImagingQuestion(q: InsertImagingQuestion): Promise<ImagingQuestion>;
  createImagingQuestionsBulk(questions: InsertImagingQuestion[]): Promise<ImagingQuestion[]>;
  updateImagingQuestion(id: string, updates: Partial<InsertImagingQuestion>): Promise<ImagingQuestion>;
  deleteImagingQuestion(id: string): Promise<void>;

  getAllImageAssets(filters?: { country?: string; assetType?: string; modality?: string; approvalStatus?: string }): Promise<ImageAsset[]>;
  getImageAsset(id: string): Promise<ImageAsset | undefined>;
  createImageAsset(a: InsertImageAsset): Promise<ImageAsset>;
  updateImageAsset(id: string, updates: Partial<InsertImageAsset>): Promise<ImageAsset>;
  deleteImageAsset(id: string): Promise<void>;

  getAllImagingFlashcards(filters?: { country?: string; examType?: string; topic?: string; status?: string }): Promise<ImagingFlashcard[]>;
  getImagingFlashcard(id: string): Promise<ImagingFlashcard | undefined>;
  createImagingFlashcard(f: InsertImagingFlashcard): Promise<ImagingFlashcard>;
  createImagingFlashcardsBulk(flashcards: InsertImagingFlashcard[]): Promise<ImagingFlashcard[]>;
  updateImagingFlashcard(id: string, updates: Partial<InsertImagingFlashcard>): Promise<ImagingFlashcard>;
  deleteImagingFlashcard(id: string): Promise<void>;

  getAllImagingCaseStudies(filters?: { country?: string; examType?: string; status?: string }): Promise<ImagingCaseStudy[]>;
  getImagingCaseStudy(id: string): Promise<ImagingCaseStudy | undefined>;
  createImagingCaseStudy(c: InsertImagingCaseStudy): Promise<ImagingCaseStudy>;
  updateImagingCaseStudy(id: string, updates: Partial<InsertImagingCaseStudy>): Promise<ImagingCaseStudy>;
  deleteImagingCaseStudy(id: string): Promise<void>;

  getImagingExamAttempt(id: string): Promise<ImagingExamAttempt | undefined>;
  getUserImagingExamAttempts(userId: string): Promise<ImagingExamAttempt[]>;
  createImagingExamAttempt(a: InsertImagingExamAttempt): Promise<ImagingExamAttempt>;
  updateImagingExamAttempt(id: string, updates: Partial<InsertImagingExamAttempt>): Promise<ImagingExamAttempt>;

  getImagingExamAttemptQuestions(attemptId: string): Promise<ImagingExamAttemptQuestion[]>;
  createImagingExamAttemptQuestion(q: InsertImagingExamAttemptQuestion): Promise<ImagingExamAttemptQuestion>;
  updateImagingExamAttemptQuestion(id: string, updates: Partial<InsertImagingExamAttemptQuestion>): Promise<ImagingExamAttemptQuestion>;

  getAllImagingPositioningEntries(filters?: { country?: string; bodyRegion?: string; status?: string }): Promise<ImagingPositioningEntry[]>;
  getImagingPositioningEntry(id: string): Promise<ImagingPositioningEntry | undefined>;
  createImagingPositioningEntry(e: InsertImagingPositioningEntry): Promise<ImagingPositioningEntry>;
  updateImagingPositioningEntry(id: string, updates: Partial<InsertImagingPositioningEntry>): Promise<ImagingPositioningEntry>;
  deleteImagingPositioningEntry(id: string): Promise<void>;

  getAllImagingPhysicsTopics(filters?: { country?: string; category?: string; status?: string }): Promise<ImagingPhysicsTopic[]>;
  getImagingPhysicsTopic(id: string): Promise<ImagingPhysicsTopic | undefined>;
  createImagingPhysicsTopic(t: InsertImagingPhysicsTopic): Promise<ImagingPhysicsTopic>;
  updateImagingPhysicsTopic(id: string, updates: Partial<InsertImagingPhysicsTopic>): Promise<ImagingPhysicsTopic>;
  deleteImagingPhysicsTopic(id: string): Promise<void>;
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
export { pool };
export const db = drizzle(pool);

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

  async updateUserTier(userId: string, tier: string): Promise<void> {
    await db.update(users).set({ tier, subscriptionStatus: "active" }).where(eq(users.id, userId));
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

  async createPageView(view: InsertPageView): Promise<PageView> {
    const [created] = await db.insert(pageViews).values(view).returning();
    return created;
  }

  async updatePageViewDuration(sessionId: string, page: string, duration: number): Promise<void> {
    await db.update(pageViews)
      .set({ duration })
      .where(and(eq(pageViews.sessionId, sessionId), eq(pageViews.page, page)));
  }

  async getPageViewAnalytics(days = 30): Promise<any> {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const allViews = await db.select().from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .orderBy(desc(pageViews.createdAt));

    const totalViews = allViews.length;
    const sessionPageCounts: Record<string, number> = {};
    allViews.forEach(v => {
      sessionPageCounts[v.sessionId] = (sessionPageCounts[v.sessionId] || 0) + 1;
    });
    const uniqueSessions = Object.keys(sessionPageCounts).length;
    const bounceSessions = Object.values(sessionPageCounts).filter(c => c === 1).length;
    const bounceRate = uniqueSessions > 0 ? Math.round((bounceSessions / uniqueSessions) * 100) : 0;

    const pageCounts: Record<string, number> = {};
    const referrerCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const utmSourceCounts: Record<string, number> = {};
    const utmMediumCounts: Record<string, number> = {};
    const utmCampaignCounts: Record<string, number> = {};
    const utmCombined: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const dailyViews: Record<string, number> = {};
    let totalDuration = 0;
    let durationCount = 0;
    let checkoutIntents = 0;
    let pricingViews = 0;

    allViews.forEach(v => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
      if (v.referrer) referrerCounts[v.referrer] = (referrerCounts[v.referrer] || 0) + 1;
      if (v.deviceType) deviceCounts[v.deviceType] = (deviceCounts[v.deviceType] || 0) + 1;
      if (v.browser) browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
      if (v.os) osCounts[v.os] = (osCounts[v.os] || 0) + 1;
      if (v.utmSource) utmSourceCounts[v.utmSource] = (utmSourceCounts[v.utmSource] || 0) + 1;
      if (v.utmMedium) utmMediumCounts[v.utmMedium] = (utmMediumCounts[v.utmMedium] || 0) + 1;
      if (v.utmCampaign) utmCampaignCounts[v.utmCampaign] = (utmCampaignCounts[v.utmCampaign] || 0) + 1;
      if (v.utmSource || v.utmMedium || v.utmCampaign) {
        const key = `${v.utmSource || "direct"}|${v.utmMedium || "none"}|${v.utmCampaign || "none"}`;
        utmCombined[key] = (utmCombined[key] || 0) + 1;
      }
      if (v.country) countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
      if (v.duration && v.duration > 0) { totalDuration += v.duration; durationCount++; }
      if (v.isCheckoutIntent) checkoutIntents++;
      if (v.isPricingView) pricingViews++;

      const day = v.createdAt.toISOString().split("T")[0];
      dailyViews[day] = (dailyViews[day] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([page, views]) => ({ page, views }));
    const topReferrers = Object.entries(referrerCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([referrer, views]) => ({ referrer, views }));
    const avgDuration = durationCount > 0 ? Math.round(totalDuration / durationCount) : 0;

    const blogPages = Object.entries(pageCounts)
      .filter(([page]) => page.startsWith("/blog") || page.startsWith("/content/"))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([page, views]) => ({ page, views }));

    const utmCampaigns = Object.entries(utmCombined)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([key, views]) => {
        const [source, medium, campaign] = key.split("|");
        return { source, medium, campaign, views };
      });

    const countries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([country, views]) => ({ country, views }));

    return {
      totalViews,
      uniqueSessions,
      avgDuration,
      bounceRate,
      checkoutIntents,
      pricingViews,
      topPages,
      topReferrers,
      devices: deviceCounts,
      browsers: browserCounts,
      operatingSystems: osCounts,
      utmSources: utmSourceCounts,
      utmMediums: utmMediumCounts,
      utmCampaignNames: utmCampaignCounts,
      utmCampaigns,
      countries,
      blogContent: blogPages,
      dailyViews: Object.entries(dailyViews).sort((a, b) => a[0].localeCompare(b[0])).map(([date, views]) => ({ date, views })),
      conversionRate: uniqueSessions > 0 ? Math.round((checkoutIntents / uniqueSessions) * 100) : 0,
    };
  }

  async createFeedback(feedback: InsertUserFeedback): Promise<UserFeedback> {
    const [created] = await db.insert(userFeedback).values(feedback).returning();
    return created;
  }

  async getAllFeedback(): Promise<UserFeedback[]> {
    return db.select().from(userFeedback).orderBy(desc(userFeedback.createdAt));
  }

  async updateFeedback(id: string, updates: Partial<UserFeedback>): Promise<UserFeedback> {
    const [updated] = await db.update(userFeedback)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userFeedback.id, id))
      .returning();
    return updated;
  }

  async upvoteFeedback(id: string): Promise<UserFeedback> {
    const [updated] = await db.execute(sql`
      UPDATE user_feedback SET upvotes = upvotes + 1, updated_at = NOW()
      WHERE id = ${id} RETURNING *
    `).then(r => r.rows);
    return updated as unknown as UserFeedback;
  }

  async getQotdByDate(date: string): Promise<QotdHistory | undefined> {
    const [row] = await db.select().from(qotdHistory).where(eq(qotdHistory.questionDate, date));
    return row;
  }

  async createQotd(data: Partial<QotdHistory>): Promise<QotdHistory> {
    const [created] = await db.insert(qotdHistory).values(data as any).returning();
    return created;
  }

  async getRecentQotd(limit = 30): Promise<QotdHistory[]> {
    return db.select().from(qotdHistory).orderBy(desc(qotdHistory.questionDate)).limit(limit);
  }

  async createEmailSubscriber(data: InsertEmailSubscriber): Promise<EmailSubscriber> {
    const [created] = await db.insert(emailSubscribers).values(data).returning();
    return created;
  }

  async getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined> {
    const [row] = await db.select().from(emailSubscribers).where(eq(emailSubscribers.email, email));
    return row;
  }

  async updateEmailSubscriber(email: string, updates: Partial<InsertEmailSubscriber>): Promise<EmailSubscriber | undefined> {
    const [updated] = await db.update(emailSubscribers).set(updates).where(eq(emailSubscribers.email, email)).returning();
    return updated;
  }

  async deleteEmailSubscriber(email: string): Promise<void> {
    await db.delete(emailSubscribers).where(eq(emailSubscribers.email, email));
  }

  async getAllSocialPosts(): Promise<SocialPost[]> {
    return db.select().from(socialPosts).orderBy(desc(socialPosts.createdAt));
  }

  async getSocialPost(id: string): Promise<SocialPost | undefined> {
    const [post] = await db.select().from(socialPosts).where(eq(socialPosts.id, id));
    return post;
  }

  async getScheduledSocialPosts(): Promise<SocialPost[]> {
    return db.select().from(socialPosts)
      .where(and(eq(socialPosts.status, "scheduled"), lte(socialPosts.scheduledAt, new Date())))
      .orderBy(socialPosts.scheduledAt);
  }

  async createSocialPost(data: InsertSocialPost): Promise<SocialPost> {
    const [created] = await db.insert(socialPosts).values(data).returning();
    return created;
  }

  async updateSocialPost(id: string, updates: Partial<SocialPost>): Promise<SocialPost> {
    const [updated] = await db.update(socialPosts).set(updates).where(eq(socialPosts.id, id)).returning();
    return updated;
  }

  async deleteSocialPost(id: string): Promise<void> {
    await db.delete(socialPosts).where(eq(socialPosts.id, id));
  }

  async getDashboardWidgets(userId: string): Promise<DashboardWidget[]> {
    return db.select().from(dashboardWidgets).where(eq(dashboardWidgets.userId, userId)).orderBy(dashboardWidgets.position);
  }

  async saveDashboardWidgets(userId: string, widgets: { widgetType: string; position: number; visible: boolean; config?: any }[]): Promise<DashboardWidget[]> {
    await db.delete(dashboardWidgets).where(eq(dashboardWidgets.userId, userId));
    if (widgets.length === 0) return [];
    const rows = widgets.map((w) => ({
      userId,
      widgetType: w.widgetType,
      position: w.position,
      visible: w.visible,
      config: w.config || {},
    }));
    return db.insert(dashboardWidgets).values(rows).returning();
  }

  async getAllSiteImages(): Promise<SiteImage[]> {
    return db.select().from(siteImages);
  }

  async getSiteImage(key: string): Promise<SiteImage | undefined> {
    const [img] = await db.select().from(siteImages).where(eq(siteImages.imageKey, key));
    return img;
  }

  async upsertSiteImage(key: string, url: string, alt?: string): Promise<SiteImage> {
    const existing = await this.getSiteImage(key);
    if (existing) {
      const [updated] = await db.update(siteImages).set({ url, alt, updatedAt: new Date() }).where(eq(siteImages.imageKey, key)).returning();
      return updated;
    }
    const [created] = await db.insert(siteImages).values({ imageKey: key, url, alt }).returning();
    return created;
  }

  async deleteSiteImage(key: string): Promise<void> {
    await db.delete(siteImages).where(eq(siteImages.imageKey, key));
  }

  async getCustomModules(page: string): Promise<CustomPageModule[]> {
    return db.select().from(customPageModules).where(eq(customPageModules.page, page)).orderBy(customPageModules.sortOrder);
  }

  async getCustomModule(id: string): Promise<CustomPageModule | undefined> {
    const [mod] = await db.select().from(customPageModules).where(eq(customPageModules.id, id));
    return mod;
  }

  async createCustomModule(data: InsertCustomPageModule): Promise<CustomPageModule> {
    const [created] = await db.insert(customPageModules).values(data).returning();
    return created;
  }

  async updateCustomModule(id: string, updates: Partial<InsertCustomPageModule>): Promise<CustomPageModule> {
    const [updated] = await db.update(customPageModules).set({ ...updates, updatedAt: new Date() }).where(eq(customPageModules.id, id)).returning();
    return updated;
  }

  async deleteCustomModule(id: string): Promise<void> {
    await db.delete(customPageModules).where(eq(customPageModules.id, id));
  }

  async getAllAudioClips(): Promise<AudioClip[]> {
    return db.select().from(audioClips).orderBy(desc(audioClips.createdAt));
  }

  async getAudioClip(id: string): Promise<AudioClip | undefined> {
    const [clip] = await db.select().from(audioClips).where(eq(audioClips.id, id));
    return clip;
  }

  async getAudioClipsByCategory(category: string): Promise<AudioClip[]> {
    return db.select().from(audioClips).where(eq(audioClips.category, category)).orderBy(audioClips.title);
  }

  async createAudioClip(clip: InsertAudioClip): Promise<AudioClip> {
    const [created] = await db.insert(audioClips).values(clip).returning();
    return created;
  }

  async updateAudioClip(id: string, updates: Partial<InsertAudioClip>): Promise<AudioClip> {
    const [updated] = await db.update(audioClips).set(updates).where(eq(audioClips.id, id)).returning();
    return updated;
  }

  async deleteAudioClip(id: string): Promise<void> {
    await db.delete(lessonAudioLinks).where(eq(lessonAudioLinks.audioClipId, id));
    await db.delete(audioClips).where(eq(audioClips.id, id));
  }

  async getLessonAudioLinks(lessonId: string): Promise<(LessonAudioLink & { clip: AudioClip })[]> {
    const links = await db.select().from(lessonAudioLinks).where(eq(lessonAudioLinks.lessonId, lessonId)).orderBy(lessonAudioLinks.displayOrder);
    const results: (LessonAudioLink & { clip: AudioClip })[] = [];
    for (const link of links) {
      const [clip] = await db.select().from(audioClips).where(eq(audioClips.id, link.audioClipId));
      if (clip) results.push({ ...link, clip });
    }
    return results;
  }

  async createLessonAudioLink(link: InsertLessonAudioLink): Promise<LessonAudioLink> {
    const [created] = await db.insert(lessonAudioLinks).values(link).returning();
    return created;
  }

  async deleteLessonAudioLink(id: string): Promise<void> {
    await db.delete(lessonAudioLinks).where(eq(lessonAudioLinks.id, id));
  }

  async getAllExamQuestions(filters?: { tier?: string; exam?: string; questionType?: string; status?: string; bodySystem?: string }): Promise<ExamQuestion[]> {
    let query = db.select().from(examQuestions);
    const conditions: any[] = [];
    if (filters?.tier) conditions.push(eq(examQuestions.tier, filters.tier));
    if (filters?.exam) conditions.push(eq(examQuestions.exam, filters.exam));
    if (filters?.questionType) conditions.push(eq(examQuestions.questionType, filters.questionType));
    if (filters?.status) conditions.push(eq(examQuestions.status, filters.status));
    if (filters?.bodySystem) conditions.push(eq(examQuestions.bodySystem, filters.bodySystem));
    if (conditions.length > 0) {
      return (query as any).where(and(...conditions)).orderBy(desc(examQuestions.createdAt));
    }
    return query.orderBy(desc(examQuestions.createdAt));
  }

  async getExamQuestion(id: string): Promise<ExamQuestion | undefined> {
    const [q] = await db.select().from(examQuestions).where(eq(examQuestions.id, id));
    return q;
  }

  async createExamQuestion(q: InsertExamQuestion): Promise<ExamQuestion> {
    const [created] = await db.insert(examQuestions).values(q).returning();
    return created;
  }

  async createExamQuestionsBulk(questions: InsertExamQuestion[]): Promise<ExamQuestion[]> {
    if (questions.length === 0) return [];
    const batchSize = 50;
    const results: ExamQuestion[] = [];
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const created = await db.insert(examQuestions).values(batch).returning();
      results.push(...created);
    }
    return results;
  }

  async updateExamQuestion(id: string, updates: Partial<InsertExamQuestion>): Promise<ExamQuestion> {
    const [updated] = await db.update(examQuestions).set({ ...updates, updatedAt: new Date() }).where(eq(examQuestions.id, id)).returning();
    return updated;
  }

  async deleteExamQuestion(id: string): Promise<void> {
    await db.delete(examQuestions).where(eq(examQuestions.id, id));
  }

  async publishScheduledQuestions(): Promise<number> {
    const now = new Date();
    const due = await db.select().from(examQuestions).where(and(eq(examQuestions.status, "scheduled"), lte(examQuestions.publishAt!, now)));
    let count = 0;
    for (const q of due) {
      await db.update(examQuestions).set({ status: "published", publishedAt: now, updatedAt: now }).where(eq(examQuestions.id, q.id));
      await db.insert(questionScheduleLog).values({ questionId: q.id, action: "auto_publish", previousStatus: "scheduled", newStatus: "published" });
      count++;
    }
    return count;
  }

  async getQuestionTypeRegistry(exam?: string): Promise<QuestionTypeRegistryEntry[]> {
    if (exam) {
      return db.select().from(questionTypeRegistry).where(eq(questionTypeRegistry.exam, exam)).orderBy(questionTypeRegistry.displayName);
    }
    return db.select().from(questionTypeRegistry).orderBy(questionTypeRegistry.exam, questionTypeRegistry.displayName);
  }

  async upsertQuestionTypeRegistry(entry: InsertQuestionTypeRegistryEntry): Promise<QuestionTypeRegistryEntry> {
    const existing = await db.select().from(questionTypeRegistry).where(and(eq(questionTypeRegistry.exam, entry.exam), eq(questionTypeRegistry.questionType, entry.questionType)));
    if (existing.length > 0) {
      const [updated] = await db.update(questionTypeRegistry).set(entry).where(eq(questionTypeRegistry.id, existing[0].id)).returning();
      return updated;
    }
    const [created] = await db.insert(questionTypeRegistry).values(entry).returning();
    return created;
  }

  async createQuestionScheduleLog(log: { questionId: string; action: string; previousStatus?: string; newStatus?: string; actorId?: string }): Promise<QuestionScheduleLog> {
    const [created] = await db.insert(questionScheduleLog).values(log).returning();
    return created;
  }

  async listDigitalProducts(activeOnly = true): Promise<DigitalProduct[]> {
    if (activeOnly) {
      return db.select().from(digitalProducts).where(eq(digitalProducts.isActive, true)).orderBy(desc(digitalProducts.featured), desc(digitalProducts.createdAt));
    }
    return db.select().from(digitalProducts).orderBy(desc(digitalProducts.createdAt));
  }

  async getDigitalProduct(id: string): Promise<DigitalProduct | undefined> {
    const [p] = await db.select().from(digitalProducts).where(eq(digitalProducts.id, id));
    return p;
  }

  async getDigitalProductBySlug(slug: string): Promise<DigitalProduct | undefined> {
    const [p] = await db.select().from(digitalProducts).where(eq(digitalProducts.slug, slug));
    return p;
  }

  async createDigitalProduct(product: InsertDigitalProduct): Promise<DigitalProduct> {
    const [created] = await db.insert(digitalProducts).values(product).returning();
    return created;
  }

  async updateDigitalProduct(id: string, updates: Partial<InsertDigitalProduct>): Promise<DigitalProduct> {
    const [updated] = await db.update(digitalProducts).set({ ...updates, updatedAt: new Date() }).where(eq(digitalProducts.id, id)).returning();
    return updated;
  }

  async deleteDigitalProduct(id: string): Promise<void> {
    await db.delete(digitalProducts).where(eq(digitalProducts.id, id));
  }

  async createProductPurchase(purchase: InsertProductPurchase): Promise<ProductPurchase> {
    const [created] = await db.insert(productPurchases).values(purchase).returning();
    return created;
  }

  async getUserPurchases(userId: string): Promise<(ProductPurchase & { product: DigitalProduct })[]> {
    const purchases = await db.select().from(productPurchases).where(eq(productPurchases.userId, userId)).orderBy(desc(productPurchases.purchaseDate));
    const results: (ProductPurchase & { product: DigitalProduct })[] = [];
    for (const p of purchases) {
      const [product] = await db.select().from(digitalProducts).where(eq(digitalProducts.id, p.productId));
      if (product) results.push({ ...p, product });
    }
    return results;
  }

  async getPurchase(id: string): Promise<ProductPurchase | undefined> {
    const [p] = await db.select().from(productPurchases).where(eq(productPurchases.id, id));
    return p;
  }

  async incrementDownloadCount(purchaseId: string): Promise<void> {
    await db.update(productPurchases).set({ downloadCount: sql`${productPurchases.downloadCount} + 1` }).where(eq(productPurchases.id, purchaseId));
  }

  async getProductSales(): Promise<{ productId: string; title: string; totalSales: number; totalRevenue: number }[]> {
    const products = await db.select().from(digitalProducts).orderBy(desc(digitalProducts.createdAt));
    const results: { productId: string; title: string; totalSales: number; totalRevenue: number }[] = [];
    for (const p of products) {
      const [salesCount] = await db.select({ count: count() }).from(productPurchases).where(eq(productPurchases.productId, p.id));
      results.push({
        productId: p.id,
        title: p.title,
        totalSales: salesCount?.count || 0,
        totalRevenue: (salesCount?.count || 0) * p.price,
      });
    }
    return results;
  }

  async validateCoupon(code: string): Promise<{ valid: boolean; discountType?: string; discountValue?: number }> {
    const [coupon] = await db.select().from(couponCodes).where(and(eq(couponCodes.code, code.toUpperCase()), eq(couponCodes.isActive, true)));
    if (!coupon) return { valid: false };
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return { valid: false };
    if (coupon.usageLimit && (coupon.usageCount || 0) >= coupon.usageLimit) return { valid: false };
    return { valid: true, discountType: coupon.discountType, discountValue: coupon.discountValue };
  }

  async useCoupon(code: string): Promise<void> {
    await db.update(couponCodes).set({ usageCount: sql`${couponCodes.usageCount} + 1` }).where(eq(couponCodes.code, code.toUpperCase()));
  }

  async listQbankDrafts(): Promise<QbankDraft[]> {
    return db.select().from(qbankDrafts).orderBy(desc(qbankDrafts.createdAt));
  }
  async getQbankDraft(id: string): Promise<QbankDraft | undefined> {
    const [d] = await db.select().from(qbankDrafts).where(eq(qbankDrafts.id, id));
    return d;
  }
  async createQbankDraft(draft: InsertQbankDraft): Promise<QbankDraft> {
    const [d] = await db.insert(qbankDrafts).values(draft).returning();
    return d;
  }
  async updateQbankDraft(id: string, updates: Partial<InsertQbankDraft>): Promise<QbankDraft> {
    const [d] = await db.update(qbankDrafts).set({ ...updates, updatedAt: new Date() }).where(eq(qbankDrafts.id, id)).returning();
    return d;
  }
  async deleteQbankDraft(id: string): Promise<void> {
    await db.delete(qbankDrafts).where(eq(qbankDrafts.id, id));
  }

  async listQbankRecipes(): Promise<QbankRecipe[]> {
    return db.select().from(qbankRecipes).orderBy(desc(qbankRecipes.createdAt));
  }
  async getQbankRecipe(id: string): Promise<QbankRecipe | undefined> {
    const [r] = await db.select().from(qbankRecipes).where(eq(qbankRecipes.id, id));
    return r;
  }
  async createQbankRecipe(recipe: InsertQbankRecipe): Promise<QbankRecipe> {
    const [r] = await db.insert(qbankRecipes).values(recipe).returning();
    return r;
  }
  async updateQbankRecipe(id: string, updates: Partial<InsertQbankRecipe>): Promise<QbankRecipe> {
    const [r] = await db.update(qbankRecipes).set(updates).where(eq(qbankRecipes.id, id)).returning();
    return r;
  }
  async deleteQbankRecipe(id: string): Promise<void> {
    await db.delete(qbankRecipes).where(eq(qbankRecipes.id, id));
  }

  async createDiagnosticAssessment(data: InsertDiagnosticAssessment): Promise<DiagnosticAssessment> {
    const [d] = await db.insert(diagnosticAssessments).values(data).returning();
    return d;
  }
  async getDiagnosticAssessment(id: string): Promise<DiagnosticAssessment | undefined> {
    const [d] = await db.select().from(diagnosticAssessments).where(eq(diagnosticAssessments.id, id));
    return d;
  }
  async getUserDiagnostics(userId: string): Promise<DiagnosticAssessment[]> {
    return db.select().from(diagnosticAssessments).where(eq(diagnosticAssessments.userId, userId)).orderBy(desc(diagnosticAssessments.completedAt));
  }

  async getUserStats(userId: string): Promise<UserStats | undefined> {
    const [s] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return s;
  }
  async upsertUserStats(userId: string, updates: Partial<InsertUserStats>): Promise<UserStats> {
    const existing = await this.getUserStats(userId);
    if (existing) {
      const [s] = await db.update(userStats).set({ ...updates, updatedAt: new Date() }).where(eq(userStats.userId, userId)).returning();
      return s;
    }
    const [s] = await db.insert(userStats).values({ userId, ...updates }).returning();
    return s;
  }

  async createStudyGroup(data: InsertStudyGroup): Promise<StudyGroup> {
    const [g] = await db.insert(studyGroups).values(data).returning();
    return g;
  }
  async getStudyGroup(id: string): Promise<StudyGroup | undefined> {
    const [g] = await db.select().from(studyGroups).where(eq(studyGroups.id, id));
    return g;
  }
  async getStudyGroupByCode(code: string): Promise<StudyGroup | undefined> {
    const [g] = await db.select().from(studyGroups).where(eq(studyGroups.inviteCode, code));
    return g;
  }
  async getUserStudyGroups(userId: string): Promise<StudyGroup[]> {
    const memberships = await db.select().from(studyGroupMembers).where(eq(studyGroupMembers.userId, userId));
    if (memberships.length === 0) return [];
    const groups: StudyGroup[] = [];
    for (const m of memberships) {
      const g = await this.getStudyGroup(m.groupId);
      if (g) groups.push(g);
    }
    return groups;
  }
  async addStudyGroupMember(data: InsertStudyGroupMember): Promise<StudyGroupMember> {
    const [m] = await db.insert(studyGroupMembers).values(data).returning();
    return m;
  }
  async getStudyGroupMembers(groupId: string): Promise<(StudyGroupMember & { username: string; stats?: UserStats })[]> {
    const members = await db.select().from(studyGroupMembers).where(eq(studyGroupMembers.groupId, groupId));
    const result: (StudyGroupMember & { username: string; stats?: UserStats })[] = [];
    for (const m of members) {
      const user = await this.getUser(m.userId);
      const stats = await this.getUserStats(m.userId);
      result.push({ ...m, username: user?.username || "Unknown", stats: stats || undefined });
    }
    return result;
  }
  async removeStudyGroupMember(groupId: string, userId: string): Promise<void> {
    await db.delete(studyGroupMembers).where(and(eq(studyGroupMembers.groupId, groupId), eq(studyGroupMembers.userId, userId)));
  }

  async getQuestionAnalytics(questionId: string): Promise<QuestionAnalytics | undefined> {
    const [a] = await db.select().from(questionAnalytics).where(eq(questionAnalytics.questionId, questionId));
    return a;
  }
  async upsertQuestionAnalytics(data: InsertQuestionAnalytics): Promise<QuestionAnalytics> {
    const existing = await this.getQuestionAnalytics(data.questionId);
    if (existing) {
      const [updated] = await db.update(questionAnalytics).set({ ...data, lastUpdated: new Date() }).where(eq(questionAnalytics.id, existing.id)).returning();
      return updated;
    }
    const [created] = await db.insert(questionAnalytics).values(data).returning();
    return created;
  }

  async createFriendRequest(data: InsertFriendRequest): Promise<FriendRequest> {
    const [r] = await db.insert(friendRequests).values(data).returning();
    return r;
  }
  async getFriendRequest(id: string): Promise<FriendRequest | undefined> {
    const [r] = await db.select().from(friendRequests).where(eq(friendRequests.id, id));
    return r;
  }
  async getPendingFriendRequests(userId: string): Promise<FriendRequest[]> {
    return db.select().from(friendRequests).where(and(eq(friendRequests.receiverId, userId), eq(friendRequests.status, "pending"))).orderBy(desc(friendRequests.createdAt));
  }
  async updateFriendRequestStatus(id: string, status: string): Promise<FriendRequest> {
    const [r] = await db.update(friendRequests).set({ status }).where(eq(friendRequests.id, id)).returning();
    return r;
  }

  async createFriendConnection(data: InsertFriendConnection): Promise<FriendConnection> {
    const [c] = await db.insert(friendConnections).values(data).returning();
    return c;
  }
  async getUserFriendConnections(userId: string): Promise<FriendConnection[]> {
    const result = await db.execute(sql`SELECT * FROM friend_connections WHERE user_a_id = ${userId} OR user_b_id = ${userId} ORDER BY created_at DESC`);
    return result.rows as unknown as FriendConnection[];
  }
  async removeFriendConnection(id: string): Promise<void> {
    await db.delete(friendConnections).where(eq(friendConnections.id, id));
  }

  async createProductGeneration(data: InsertProductGeneration): Promise<ProductGeneration> {
    const [r] = await db.insert(productGenerations).values(data).returning();
    return r;
  }
  async getProductGeneration(id: string): Promise<ProductGeneration | undefined> {
    const [r] = await db.select().from(productGenerations).where(eq(productGenerations.id, id));
    return r;
  }
  async updateProductGeneration(id: string, updates: any): Promise<ProductGeneration> {
    const [r] = await db.update(productGenerations).set({ ...updates, updatedAt: new Date() }).where(eq(productGenerations.id, id)).returning();
    return r;
  }
  async listProductGenerations(): Promise<ProductGeneration[]> {
    return db.select().from(productGenerations).orderBy(desc(productGenerations.createdAt));
  }
  async deleteProductGeneration(id: string): Promise<void> {
    await db.delete(generationEvents).where(eq(generationEvents.generationId, id));
    await db.delete(generatedQuestions).where(eq(generatedQuestions.generationId, id));
    await db.delete(productGenerations).where(eq(productGenerations.id, id));
  }

  async createGeneratedQuestion(data: InsertGeneratedQuestion): Promise<GeneratedQuestion> {
    const [r] = await db.insert(generatedQuestions).values(data).returning();
    return r;
  }
  async createGeneratedQuestionsBulk(data: InsertGeneratedQuestion[]): Promise<GeneratedQuestion[]> {
    if (!data.length) return [];
    return db.insert(generatedQuestions).values(data).returning();
  }
  async getGeneratedQuestions(generationId: string): Promise<GeneratedQuestion[]> {
    return db.select().from(generatedQuestions).where(eq(generatedQuestions.generationId, generationId)).orderBy(generatedQuestions.idx);
  }
  async getGeneratedQuestionCount(generationId: string): Promise<number> {
    const [r] = await db.select({ count: count() }).from(generatedQuestions).where(eq(generatedQuestions.generationId, generationId));
    return r?.count || 0;
  }
  async deleteGeneratedQuestion(id: string): Promise<void> {
    await db.delete(generatedQuestions).where(eq(generatedQuestions.id, id));
  }
  async updateGeneratedQuestion(id: string, data: Partial<{ stem: string; scenario: string; choices: any; correctAnswers: any; rationale: any; examPearl: string }>): Promise<any> {
    const [r] = await db.update(generatedQuestions).set(data).where(eq(generatedQuestions.id, id)).returning();
    return r;
  }

  async createGenerationEvent(data: { generationId: string; eventType: string; payload?: any }): Promise<void> {
    await db.insert(generationEvents).values(data);
  }
  async getGenerationEvents(generationId: string): Promise<any[]> {
    return db.select().from(generationEvents).where(eq(generationEvents.generationId, generationId)).orderBy(desc(generationEvents.createdAt));
  }

  async createContentBlock(data: { generationId: string; sectionKey: string; blocks: any }): Promise<any> {
    const [r] = await db.insert(v2ContentBlocks).values(data).returning();
    return r;
  }
  async getContentBlocks(generationId: string): Promise<any[]> {
    return db.select().from(v2ContentBlocks).where(eq(v2ContentBlocks.generationId, generationId));
  }

  async getPresentationSettings(generationId: string): Promise<GeneratorV2PresentationSettings | undefined> {
    const [r] = await db.select().from(generatorV2PresentationSettings).where(eq(generatorV2PresentationSettings.generationId, generationId));
    return r;
  }
  async upsertPresentationSettings(generationId: string, data: Partial<InsertGeneratorV2PresentationSettings>): Promise<GeneratorV2PresentationSettings> {
    const existing = await this.getPresentationSettings(generationId);
    if (existing) {
      const [r] = await db.update(generatorV2PresentationSettings).set({ ...data, updatedAt: new Date() }).where(eq(generatorV2PresentationSettings.generationId, generationId)).returning();
      return r;
    }
    const [r] = await db.insert(generatorV2PresentationSettings).values({ ...data, generationId }).returning();
    return r;
  }

  async getTesterInviteCode(code: string): Promise<TesterInviteCode | undefined> {
    const [r] = await db.select().from(testerInviteCodes).where(eq(testerInviteCodes.code, code));
    return r;
  }
  async getTesterInviteCodeById(id: string): Promise<TesterInviteCode | undefined> {
    const [r] = await db.select().from(testerInviteCodes).where(eq(testerInviteCodes.id, id));
    return r;
  }
  async listTesterInviteCodes(): Promise<TesterInviteCode[]> {
    return db.select().from(testerInviteCodes).orderBy(desc(testerInviteCodes.createdAt));
  }
  async createTesterInviteCode(data: InsertTesterInviteCode): Promise<TesterInviteCode> {
    const [r] = await db.insert(testerInviteCodes).values(data).returning();
    return r;
  }
  async updateTesterInviteCode(id: string, updates: Partial<InsertTesterInviteCode>): Promise<TesterInviteCode> {
    const [r] = await db.update(testerInviteCodes).set(updates).where(eq(testerInviteCodes.id, id)).returning();
    return r;
  }
  async incrementTesterInviteCodeUsage(code: string, userId?: string): Promise<void> {
    const updates: any = { usedCount: sql`${testerInviteCodes.usedCount} + 1` };
    if (userId) updates.usedBy = userId;
    await db.update(testerInviteCodes).set(updates).where(eq(testerInviteCodes.code, code));
  }
  async deleteTesterInviteCode(id: string): Promise<void> {
    await db.delete(testerInviteCodes).where(eq(testerInviteCodes.id, id));
  }

  async createTesterFeedback(data: InsertTesterFeedback): Promise<TesterFeedback> {
    const [r] = await db.insert(testerFeedback).values(data).returning();
    return r;
  }
  async listTesterFeedback(): Promise<TesterFeedback[]> {
    return db.select().from(testerFeedback).orderBy(desc(testerFeedback.createdAt));
  }
  async getUserTesterFeedback(userId: string): Promise<TesterFeedback[]> {
    return db.select().from(testerFeedback).where(eq(testerFeedback.userId, userId)).orderBy(desc(testerFeedback.createdAt));
  }
  async updateTesterFeedback(id: string, updates: Partial<{ status: string; adminResponse: string }>): Promise<TesterFeedback> {
    const [r] = await db.update(testerFeedback).set({ ...updates, updatedAt: new Date() }).where(eq(testerFeedback.id, id)).returning();
    return r;
  }

  async listTesterUsers(): Promise<User[]> {
    return db.select().from(users).where(eq(users.testerAccess, true)).orderBy(desc(users.testerExpiry));
  }
  async setTesterAccess(userId: string, testerAccess: boolean, testerExpiry: Date | null, inviteCode?: string): Promise<User> {
    const updates: any = { testerAccess, testerExpiry };
    if (inviteCode !== undefined) updates.testerInviteCode = inviteCode;
    const [r] = await db.update(users).set(updates).where(eq(users.id, userId)).returning();
    return r;
  }

  async generateReferralCode(userId: string): Promise<string> {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code: string;
    let attempts = 0;
    do {
      code = "NN-REF-";
      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      const existing = await db.select().from(users).where(eq(users.referralCode, code));
      if (existing.length === 0) break;
      attempts++;
    } while (attempts < 10);

    const [r] = await db.update(users).set({ referralCode: code }).where(eq(users.id, userId)).returning();
    return r.referralCode!;
  }

  async getUserByReferralCode(code: string): Promise<User | undefined> {
    const [r] = await db.select().from(users).where(eq(users.referralCode, code.trim().toUpperCase()));
    return r;
  }

  async incrementReferralUses(referralCode: string): Promise<void> {
    await db.update(users).set({ referralUses: sql`COALESCE(referral_uses, 0) + 1` }).where(eq(users.referralCode, referralCode));
  }

  async setReferredBy(userId: string, referralCode: string): Promise<void> {
    await db.update(users).set({ referredBy: referralCode }).where(eq(users.id, userId));
  }

  async markReferralDiscountUsed(userId: string): Promise<void> {
    await db.update(users).set({ referralDiscountUsed: true }).where(eq(users.id, userId));
  }

  async getAllImagingQuestions(filters?: { country?: string; examType?: string; topic?: string; difficulty?: string; status?: string }): Promise<ImagingQuestion[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imagingQuestions.country, filters.country));
    if (filters?.examType) conditions.push(eq(imagingQuestions.examType, filters.examType));
    if (filters?.topic) conditions.push(eq(imagingQuestions.topic, filters.topic));
    if (filters?.difficulty) conditions.push(eq(imagingQuestions.difficulty, filters.difficulty));
    if (filters?.status) conditions.push(eq(imagingQuestions.status, filters.status));
    if (conditions.length > 0) return db.select().from(imagingQuestions).where(and(...conditions)).orderBy(desc(imagingQuestions.updatedAt));
    return db.select().from(imagingQuestions).orderBy(desc(imagingQuestions.updatedAt));
  }
  async getImagingQuestion(id: string): Promise<ImagingQuestion | undefined> {
    const [r] = await db.select().from(imagingQuestions).where(eq(imagingQuestions.id, id));
    return r;
  }
  async createImagingQuestion(q: InsertImagingQuestion): Promise<ImagingQuestion> {
    const [r] = await db.insert(imagingQuestions).values(q).returning();
    return r;
  }
  async createImagingQuestionsBulk(questions: InsertImagingQuestion[]): Promise<ImagingQuestion[]> {
    if (questions.length === 0) return [];
    return db.insert(imagingQuestions).values(questions).returning();
  }
  async updateImagingQuestion(id: string, updates: Partial<InsertImagingQuestion>): Promise<ImagingQuestion> {
    const [r] = await db.update(imagingQuestions).set({ ...updates, updatedAt: new Date() }).where(eq(imagingQuestions.id, id)).returning();
    return r;
  }
  async deleteImagingQuestion(id: string): Promise<void> {
    await db.delete(imagingQuestions).where(eq(imagingQuestions.id, id));
  }

  async getAllImageAssets(filters?: { country?: string; assetType?: string; modality?: string; approvalStatus?: string }): Promise<ImageAsset[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imageAssets.country, filters.country));
    if (filters?.assetType) conditions.push(eq(imageAssets.assetType, filters.assetType));
    if (filters?.modality) conditions.push(eq(imageAssets.modality, filters.modality));
    if (filters?.approvalStatus) conditions.push(eq(imageAssets.approvalStatus, filters.approvalStatus));
    if (conditions.length > 0) return db.select().from(imageAssets).where(and(...conditions)).orderBy(desc(imageAssets.updatedAt));
    return db.select().from(imageAssets).orderBy(desc(imageAssets.updatedAt));
  }
  async getImageAsset(id: string): Promise<ImageAsset | undefined> {
    const [r] = await db.select().from(imageAssets).where(eq(imageAssets.id, id));
    return r;
  }
  async createImageAsset(a: InsertImageAsset): Promise<ImageAsset> {
    const [r] = await db.insert(imageAssets).values(a).returning();
    return r;
  }
  async updateImageAsset(id: string, updates: Partial<InsertImageAsset>): Promise<ImageAsset> {
    const [r] = await db.update(imageAssets).set({ ...updates, updatedAt: new Date() }).where(eq(imageAssets.id, id)).returning();
    return r;
  }
  async deleteImageAsset(id: string): Promise<void> {
    await db.delete(imageAssets).where(eq(imageAssets.id, id));
  }

  async getAllImagingFlashcards(filters?: { country?: string; examType?: string; topic?: string; status?: string }): Promise<ImagingFlashcard[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imagingFlashcards.country, filters.country));
    if (filters?.examType) conditions.push(eq(imagingFlashcards.examType, filters.examType));
    if (filters?.topic) conditions.push(eq(imagingFlashcards.topic, filters.topic));
    if (filters?.status) conditions.push(eq(imagingFlashcards.status, filters.status));
    if (conditions.length > 0) return db.select().from(imagingFlashcards).where(and(...conditions)).orderBy(desc(imagingFlashcards.updatedAt));
    return db.select().from(imagingFlashcards).orderBy(desc(imagingFlashcards.updatedAt));
  }
  async getImagingFlashcard(id: string): Promise<ImagingFlashcard | undefined> {
    const [r] = await db.select().from(imagingFlashcards).where(eq(imagingFlashcards.id, id));
    return r;
  }
  async createImagingFlashcard(f: InsertImagingFlashcard): Promise<ImagingFlashcard> {
    const [r] = await db.insert(imagingFlashcards).values(f).returning();
    return r;
  }
  async createImagingFlashcardsBulk(flashcards: InsertImagingFlashcard[]): Promise<ImagingFlashcard[]> {
    if (flashcards.length === 0) return [];
    return db.insert(imagingFlashcards).values(flashcards).returning();
  }
  async updateImagingFlashcard(id: string, updates: Partial<InsertImagingFlashcard>): Promise<ImagingFlashcard> {
    const [r] = await db.update(imagingFlashcards).set({ ...updates, updatedAt: new Date() }).where(eq(imagingFlashcards.id, id)).returning();
    return r;
  }
  async deleteImagingFlashcard(id: string): Promise<void> {
    await db.delete(imagingFlashcards).where(eq(imagingFlashcards.id, id));
  }

  async getAllImagingCaseStudies(filters?: { country?: string; examType?: string; status?: string }): Promise<ImagingCaseStudy[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imagingCaseStudies.country, filters.country));
    if (filters?.examType) conditions.push(eq(imagingCaseStudies.examType, filters.examType));
    if (filters?.status) conditions.push(eq(imagingCaseStudies.status, filters.status));
    if (conditions.length > 0) return db.select().from(imagingCaseStudies).where(and(...conditions)).orderBy(desc(imagingCaseStudies.updatedAt));
    return db.select().from(imagingCaseStudies).orderBy(desc(imagingCaseStudies.updatedAt));
  }
  async getImagingCaseStudy(id: string): Promise<ImagingCaseStudy | undefined> {
    const [r] = await db.select().from(imagingCaseStudies).where(eq(imagingCaseStudies.id, id));
    return r;
  }
  async createImagingCaseStudy(c: InsertImagingCaseStudy): Promise<ImagingCaseStudy> {
    const [r] = await db.insert(imagingCaseStudies).values(c).returning();
    return r;
  }
  async updateImagingCaseStudy(id: string, updates: Partial<InsertImagingCaseStudy>): Promise<ImagingCaseStudy> {
    const [r] = await db.update(imagingCaseStudies).set({ ...updates, updatedAt: new Date() }).where(eq(imagingCaseStudies.id, id)).returning();
    return r;
  }
  async deleteImagingCaseStudy(id: string): Promise<void> {
    await db.delete(imagingCaseStudies).where(eq(imagingCaseStudies.id, id));
  }

  async getImagingExamAttempt(id: string): Promise<ImagingExamAttempt | undefined> {
    const [r] = await db.select().from(imagingExamAttempts).where(eq(imagingExamAttempts.id, id));
    return r;
  }
  async getUserImagingExamAttempts(userId: string): Promise<ImagingExamAttempt[]> {
    return db.select().from(imagingExamAttempts).where(eq(imagingExamAttempts.userId, userId)).orderBy(desc(imagingExamAttempts.startedAt));
  }
  async createImagingExamAttempt(a: InsertImagingExamAttempt): Promise<ImagingExamAttempt> {
    const [r] = await db.insert(imagingExamAttempts).values(a).returning();
    return r;
  }
  async updateImagingExamAttempt(id: string, updates: Partial<InsertImagingExamAttempt>): Promise<ImagingExamAttempt> {
    const [r] = await db.update(imagingExamAttempts).set(updates).where(eq(imagingExamAttempts.id, id)).returning();
    return r;
  }

  async getImagingExamAttemptQuestions(attemptId: string): Promise<ImagingExamAttemptQuestion[]> {
    return db.select().from(imagingExamAttemptQuestions).where(eq(imagingExamAttemptQuestions.attemptId, attemptId));
  }
  async createImagingExamAttemptQuestion(q: InsertImagingExamAttemptQuestion): Promise<ImagingExamAttemptQuestion> {
    const [r] = await db.insert(imagingExamAttemptQuestions).values(q).returning();
    return r;
  }
  async updateImagingExamAttemptQuestion(id: string, updates: Partial<InsertImagingExamAttemptQuestion>): Promise<ImagingExamAttemptQuestion> {
    const [r] = await db.update(imagingExamAttemptQuestions).set(updates).where(eq(imagingExamAttemptQuestions.id, id)).returning();
    return r;
  }

  async getAllImagingPositioningEntries(filters?: { country?: string; bodyRegion?: string; status?: string }): Promise<ImagingPositioningEntry[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imagingPositioningEntries.country, filters.country));
    if (filters?.bodyRegion) conditions.push(eq(imagingPositioningEntries.bodyRegion, filters.bodyRegion));
    if (filters?.status) conditions.push(eq(imagingPositioningEntries.status, filters.status));
    if (conditions.length > 0) return db.select().from(imagingPositioningEntries).where(and(...conditions)).orderBy(desc(imagingPositioningEntries.updatedAt));
    return db.select().from(imagingPositioningEntries).orderBy(desc(imagingPositioningEntries.updatedAt));
  }
  async getImagingPositioningEntry(id: string): Promise<ImagingPositioningEntry | undefined> {
    const [r] = await db.select().from(imagingPositioningEntries).where(eq(imagingPositioningEntries.id, id));
    return r;
  }
  async createImagingPositioningEntry(e: InsertImagingPositioningEntry): Promise<ImagingPositioningEntry> {
    const [r] = await db.insert(imagingPositioningEntries).values(e).returning();
    return r;
  }
  async updateImagingPositioningEntry(id: string, updates: Partial<InsertImagingPositioningEntry>): Promise<ImagingPositioningEntry> {
    const [r] = await db.update(imagingPositioningEntries).set({ ...updates, updatedAt: new Date() }).where(eq(imagingPositioningEntries.id, id)).returning();
    return r;
  }
  async deleteImagingPositioningEntry(id: string): Promise<void> {
    await db.delete(imagingPositioningEntries).where(eq(imagingPositioningEntries.id, id));
  }

  async getAllImagingPhysicsTopics(filters?: { country?: string; category?: string; status?: string }): Promise<ImagingPhysicsTopic[]> {
    const conditions = [];
    if (filters?.country) conditions.push(eq(imagingPhysicsTopics.country, filters.country));
    if (filters?.category) conditions.push(eq(imagingPhysicsTopics.category, filters.category));
    if (filters?.status) conditions.push(eq(imagingPhysicsTopics.status, filters.status));
    if (conditions.length > 0) return db.select().from(imagingPhysicsTopics).where(and(...conditions)).orderBy(desc(imagingPhysicsTopics.updatedAt));
    return db.select().from(imagingPhysicsTopics).orderBy(desc(imagingPhysicsTopics.updatedAt));
  }
  async getImagingPhysicsTopic(id: string): Promise<ImagingPhysicsTopic | undefined> {
    const [r] = await db.select().from(imagingPhysicsTopics).where(eq(imagingPhysicsTopics.id, id));
    return r;
  }
  async createImagingPhysicsTopic(t: InsertImagingPhysicsTopic): Promise<ImagingPhysicsTopic> {
    const [r] = await db.insert(imagingPhysicsTopics).values(t).returning();
    return r;
  }
  async updateImagingPhysicsTopic(id: string, updates: Partial<InsertImagingPhysicsTopic>): Promise<ImagingPhysicsTopic> {
    const [r] = await db.update(imagingPhysicsTopics).set({ ...updates, updatedAt: new Date() }).where(eq(imagingPhysicsTopics.id, id)).returning();
    return r;
  }
  async deleteImagingPhysicsTopic(id: string): Promise<void> {
    await db.delete(imagingPhysicsTopics).where(eq(imagingPhysicsTopics.id, id));
  }
}

export const storage = new DatabaseStorage();
