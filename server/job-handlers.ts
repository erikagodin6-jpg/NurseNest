import type { registerJobHandler } from "./job-queue";

type RegisterFn = typeof registerJobHandler;

export function registerAllJobHandlers(register: RegisterFn): void {
  register("blog_batch_generate", async (_job: any, _batch: any, payload: any) => {
    const { generateBlogPost } = await import("./blog-automation");
    const { storage } = await import("./storage");
    const topics = payload.topics || [];
    const citationStyle = payload.citationStyle || "apa7";
    const authorName = payload.authorName || "Erika Godin, RN";
    const publishAllNow = payload.publishAllNow || false;
    const batchIndex = payload.batchIndex || 0;
    const batchItemCount = payload.batchItemCount || topics.length;
    const startIdx = batchIndex * (payload.batchSize || 5);
    const endIdx = Math.min(startIdx + batchItemCount, topics.length);
    for (let i = startIdx; i < endIdx; i++) {
      const topicEntry = topics[i];
      const topicText = typeof topicEntry === "string" ? topicEntry : topicEntry?.topic;
      if (!topicText || !topicText.trim()) continue;
      try {
        const post = await generateBlogPost(topicText.trim(), citationStyle);
        const { generateUniqueSlugSuffix } = await import("@shared/seo-utils");
        const safeSlug = post.slug.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `blog-${generateUniqueSlugSuffix()}`;
        const isDup = await storage.checkDuplicateSlug(safeSlug);
        const finalSlug = isDup ? `${safeSlug}-${generateUniqueSlugSuffix()}` : safeSlug;
        await storage.createContentItem({
          title: post.title, slug: finalSlug, type: "blog", category: "nursing-education", tier: "free",
          status: publishAllNow ? "published" : "draft", tags: post.tags, summary: post.summary,
          content: post.content, seoTitle: post.seoTitle, seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords, primaryKeyword: post.primaryKeyword,
          publishedAt: publishAllNow ? new Date() : null, autoPublish: true, authorName,
        });
        console.log(`[JobHandler:BlogBatch] Generated: ${post.title}`);
      } catch (err: any) {
        console.error(`[JobHandler:BlogBatch] Failed topic "${topicText}":`, err.message);
      }
    }
  });

  register("blog_expand_all", async (_job: any, _batch: any, payload: any) => {
    const { expandAllShortPosts } = await import("./blog-automation");
    await expandAllShortPosts(payload.minWords || 2000);
  });

  register("bulk_flashcard_align", async (_job: any, _batch: any, _payload: any) => {
    const { bulkGenerateAlignedFlashcards } = await import("./exam-flashcard-mapper");
    await bulkGenerateAlignedFlashcards();
  });

  register("convert_to_flashcard", async (_job: any, _batch: any, _payload: any) => {
    const { mapExamQuestionsToFlashcards, bulkGenerateAlignedFlashcards } = await import("./exam-flashcard-mapper");
    await mapExamQuestionsToFlashcards();
    await bulkGenerateAlignedFlashcards();
  });

  register("sm2_bulk_generate", async (_job: any, _batch: any, payload: any) => {
    const sm2Engine = await import("./sm2-engine");
    await sm2Engine.bulkGenerateFromContent(payload.sourceType, payload.tier, payload.limit || 50);
  });

  register("content_expansion", async (_job: any, _batch: any, _payload: any) => {
    const { runExpansionJob } = await import("./content-expansion-job");
    await runExpansionJob();
  });

  register("bulk_question_generate", async (_job: any, _batch: any, payload: any) => {
    const { runBulkGeneration } = await import("./bulk-question-generator");
    await runBulkGeneration({
      model: payload.model || "gpt-4o-mini",
      triggeredBy: payload.triggeredBy || "worker",
      dryRun: payload.dryRun !== false,
      batchSize: payload.batchSize || 50,
      tierFilter: payload.tierFilter,
    });
  });

  register("autopilot_content", async (job: any, batch: any, payload: any) => {
    const { pool } = await import("./storage");
    const { processAutopilotJob } = await import("./autopilot");
    const engineKey = payload.engineKey || job.engine_key || "";
    const jobPayload = typeof job.payload === "string" ? JSON.parse(job.payload) : (job.payload || {});
    const mergedPayload = { ...jobPayload, ...payload };
    const tempRow = await pool.query(
      `INSERT INTO autopilot_jobs (engine_key, status, payload)
       VALUES ($1, 'running', $2) RETURNING id`,
      [engineKey, JSON.stringify(mergedPayload)]
    );
    const autopilotJobId = tempRow.rows[0].id;
    await processAutopilotJob(autopilotJobId, engineKey, mergedPayload);
  });
}
