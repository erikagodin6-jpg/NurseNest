import { pool } from "./storage";
import { tryGoogleSearchConsole, getInternalSearchMetrics } from "./search-performance-routes";

let weeklyReportTimer: NodeJS.Timeout | null = null;
let searchSnapshotTimer: NodeJS.Timeout | null = null;

function getWeekBounds(weeksAgo: number = 0): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset - weeksAgo * 7);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

async function computeWeeklyContentCounts(start: Date, end: Date) {
  const startStr = start.toISOString();
  const endStr = end.toISOString();

  const [lessons, blogs, flashcards, examQuestions, seoArticles] = await Promise.all([
    pool.query(
      `SELECT COUNT(*)::int as count FROM content_items WHERE type = 'lesson' AND created_at >= $1 AND created_at <= $2`,
      [startStr, endStr]
    ).catch(() => ({ rows: [{ count: 0 }] })),
    pool.query(
      `SELECT COUNT(*)::int as count FROM content_items WHERE type = 'blog' AND created_at >= $1 AND created_at <= $2`,
      [startStr, endStr]
    ).catch(() => ({ rows: [{ count: 0 }] })),
    pool.query(
      `SELECT COUNT(*)::int as count FROM flashcard_bank WHERE created_at >= $1 AND created_at <= $2`,
      [startStr, endStr]
    ).catch(() => ({ rows: [{ count: 0 }] })),
    pool.query(
      `SELECT COUNT(*)::int as count FROM exam_questions WHERE created_at >= $1 AND created_at <= $2`,
      [startStr, endStr]
    ).catch(() => ({ rows: [{ count: 0 }] })),
    pool.query(
      `SELECT COUNT(*)::int as count FROM seo_articles WHERE created_at >= $1 AND created_at <= $2`,
      [startStr, endStr]
    ).catch(() => ({ rows: [{ count: 0 }] })),
  ]);

  return {
    lessonsCreated: Number(lessons.rows[0]?.count || 0),
    blogPostsCreated: Number(blogs.rows[0]?.count || 0),
    flashcardsCreated: Number(flashcards.rows[0]?.count || 0),
    examQuestionsCreated: Number(examQuestions.rows[0]?.count || 0),
    seoArticlesCreated: Number(seoArticles.rows[0]?.count || 0),
  };
}

async function generateWeeklyReport() {
  console.log("[ReportingScheduler] Generating weekly content report...");
  try {
    const prevWeekBounds = getWeekBounds(1);

    const existing = await pool.query(
      `SELECT id FROM content_weekly_reports WHERE week_start = $1`,
      [prevWeekBounds.start.toISOString()]
    ).catch(() => ({ rows: [] }));

    if (existing.rows.length > 0) {
      console.log("[ReportingScheduler] Weekly report already exists for last week, skipping");
      return;
    }

    const counts = await computeWeeklyContentCounts(prevWeekBounds.start, prevWeekBounds.end);
    const total = counts.lessonsCreated + counts.blogPostsCreated +
      counts.flashcardsCreated + counts.examQuestionsCreated + counts.seoArticlesCreated;

    const twoWeeksAgo = getWeekBounds(2);
    const prevCounts = await computeWeeklyContentCounts(twoWeeksAgo.start, twoWeeksAgo.end);
    const prevTotal = prevCounts.lessonsCreated + prevCounts.blogPostsCreated +
      prevCounts.flashcardsCreated + prevCounts.examQuestionsCreated + prevCounts.seoArticlesCreated;

    const wowChange = prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : (total > 0 ? 100 : 0);

    await pool.query(
      `INSERT INTO content_weekly_reports
       (id, week_start, week_end, lessons_created, blog_posts_created, flashcards_created,
        exam_questions_created, seo_articles_created, total_content_created,
        previous_week_total, week_over_week_change, breakdown_json, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())`,
      [
        prevWeekBounds.start.toISOString(), prevWeekBounds.end.toISOString(),
        counts.lessonsCreated, counts.blogPostsCreated, counts.flashcardsCreated,
        counts.examQuestionsCreated, counts.seoArticlesCreated, total,
        prevTotal, Math.round(wowChange * 10) / 10,
        JSON.stringify({ ...counts, previousWeek: prevCounts }),
      ]
    );

    console.log(`[ReportingScheduler] Weekly report generated: ${total} content items`);
  } catch (error) {
    console.error("[ReportingScheduler] Weekly report generation error:", error);
  }
}

async function captureSearchSnapshot() {
  console.log("[ReportingScheduler] Capturing search performance snapshot...");
  try {
    let metrics = await tryGoogleSearchConsole();
    if (!metrics) {
      metrics = await getInternalSearchMetrics();
    }

    const indexedPages = metrics.indexedPages || 0;

    await pool.query(
      `INSERT INTO search_performance_snapshots
       (id, snapshot_date, indexed_pages, total_impressions, total_clicks,
        average_ctr, average_position, top_keywords_json, top_pages_json, data_source, created_at)
       VALUES (gen_random_uuid(), NOW(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [
        indexedPages,
        metrics.totalImpressions || 0,
        metrics.totalClicks || 0,
        metrics.averageCtr || 0,
        metrics.averagePosition || 0,
        JSON.stringify(metrics.topKeywords || []),
        JSON.stringify(metrics.topPages || []),
        metrics.dataSource === "google_search_console" ? "gsc" : "internal",
      ]
    );

    console.log(`[ReportingScheduler] Search snapshot captured (${metrics.dataSource}): ${indexedPages} indexed pages`);
  } catch (error) {
    console.error("[ReportingScheduler] Search snapshot error:", error);
  }
}

function getNextMondayMorning(): Date {
  const now = new Date();
  const toronto = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
  const target = new Date(toronto);
  const dayOfWeek = target.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 7 : 8 - dayOfWeek;
  target.setDate(target.getDate() + daysUntilMonday);
  target.setHours(3, 0, 0, 0);

  const diffMs = target.getTime() - toronto.getTime();
  return new Date(now.getTime() + diffMs);
}

function getNextSnapshotTime(): Date {
  const now = new Date();
  const toronto = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
  const target = new Date(toronto);
  target.setHours(4, 0, 0, 0);

  if (target <= toronto) {
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target.getTime() - toronto.getTime();
  return new Date(now.getTime() + diffMs);
}

function scheduleWeeklyReport() {
  const nextRun = getNextMondayMorning();
  const delayMs = nextRun.getTime() - Date.now();

  console.log(`[ReportingScheduler] Next weekly report at ${nextRun.toISOString()} (${Math.round(delayMs / 3600000)}h from now)`);

  weeklyReportTimer = setTimeout(async () => {
    await generateWeeklyReport();
    scheduleWeeklyReport();
  }, delayMs);
}

function scheduleDailySnapshot() {
  const nextRun = getNextSnapshotTime();
  const delayMs = nextRun.getTime() - Date.now();

  console.log(`[ReportingScheduler] Next search snapshot at ${nextRun.toISOString()} (${Math.round(delayMs / 3600000)}h from now)`);

  searchSnapshotTimer = setTimeout(async () => {
    await captureSearchSnapshot();
    scheduleDailySnapshot();
  }, delayMs);
}

export function startReportingScheduler() {
  console.log("[ReportingScheduler] Reporting scheduler initialized");
  scheduleWeeklyReport();
  scheduleDailySnapshot();
}

export function stopReportingScheduler() {
  if (weeklyReportTimer) {
    clearTimeout(weeklyReportTimer);
    weeklyReportTimer = null;
  }
  if (searchSnapshotTimer) {
    clearTimeout(searchSnapshotTimer);
    searchSnapshotTimer = null;
  }
  console.log("[ReportingScheduler] Scheduler stopped");
}
