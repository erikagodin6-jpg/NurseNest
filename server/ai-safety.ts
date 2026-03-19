export const ACTIVE_BUILD_PRIORITY = "AI_TUTORING_ASSISTANT";

const ENABLE_AI_AUTOGEN = process.env.ENABLE_AI_AUTOGEN === "true";
const MAX_AI_ITEMS_PER_DAY = parseInt(process.env.MAX_AI_ITEMS_PER_DAY || "200", 10);
const MAX_AI_TOKENS_PER_DAY = parseInt(process.env.MAX_AI_TOKENS_PER_DAY || "300000", 10);
const FREE_TIER_DAILY_LIMIT = parseInt(process.env.FREE_TIER_DAILY_LIMIT || "3", 10);
const RATE_LIMIT_PER_MINUTE = parseInt(process.env.RATE_LIMIT_PER_MINUTE || "5", 10);

interface DailyUsage {
  date: string;
  itemsGenerated: number;
  tokensUsed: number;
}

interface AiCallLog {
  timestamp: number;
  userId?: string;
  endpoint?: string;
  tokens: number;
  success: boolean;
}

let dailyUsage: DailyUsage = {
  date: new Date().toISOString().slice(0, 10),
  itemsGenerated: 0,
  tokensUsed: 0,
};

let runtimeEnabled = ENABLE_AI_AUTOGEN;
let runtimeMaxItems = MAX_AI_ITEMS_PER_DAY;
let runtimeMaxTokens = MAX_AI_TOKENS_PER_DAY;
let runtimeFreeTierLimit = FREE_TIER_DAILY_LIMIT;
let runtimeRateLimit = RATE_LIMIT_PER_MINUTE;
const recentCalls: AiCallLog[] = [];
const userDailyCounts: Map<string, { date: string; count: number }> = new Map();

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureToday(): void {
  const today = getTodayKey();
  if (dailyUsage.date !== today) {
    dailyUsage = { date: today, itemsGenerated: 0, tokensUsed: 0 };
  }
}

export function checkAiLimits(opts?: { role?: string; userId?: string }): { allowed: boolean; reason?: string; code?: string } {
  const role = opts?.role || "";
  const isAdmin = role === "admin";

  if (isAdmin) {
    ensureToday();
    if (dailyUsage.tokensUsed >= runtimeMaxTokens) {
      return { allowed: false, reason: `Daily token budget exhausted (${runtimeMaxTokens} tokens). Resets at midnight UTC.`, code: "AI_QUOTA_EXCEEDED" };
    }
    return { allowed: true };
  }

  if (!runtimeEnabled) {
    return { allowed: false, reason: "AI generation is currently disabled.", code: "AI_DISABLED" };
  }

  ensureToday();

  if (dailyUsage.itemsGenerated >= runtimeMaxItems) {
    return { allowed: false, reason: `Daily AI item cap reached (${runtimeMaxItems} items). Resets at midnight UTC.`, code: "AI_QUOTA_EXCEEDED" };
  }
  if (dailyUsage.tokensUsed >= runtimeMaxTokens) {
    return { allowed: false, reason: `Daily AI token cap reached (${runtimeMaxTokens} tokens). Resets at midnight UTC.`, code: "AI_QUOTA_EXCEEDED" };
  }

  if (opts?.userId) {
    const today = getTodayKey();
    const userEntry = userDailyCounts.get(opts.userId);
    if (userEntry && userEntry.date === today && userEntry.count >= runtimeFreeTierLimit) {
      return { allowed: false, reason: `Free-tier daily limit reached (${runtimeFreeTierLimit} generations). Upgrade for unlimited.`, code: "AI_QUOTA_EXCEEDED" };
    }

    const now = Date.now();
    const recentUserCalls = recentCalls.filter(c => c.userId === opts.userId && c.timestamp > now - 60000);
    if (recentUserCalls.length >= runtimeRateLimit) {
      return { allowed: false, reason: `Rate limit: max ${runtimeRateLimit} requests per minute. Please wait.`, code: "AI_RATE_LIMIT" };
    }
  }

  return { allowed: true };
}

export function recordAiUsage(items: number = 1, tokens: number = 0, opts?: { userId?: string; endpoint?: string; success?: boolean }): void {
  ensureToday();
  dailyUsage.itemsGenerated += items;
  dailyUsage.tokensUsed += tokens;

  const now = Date.now();
  recentCalls.push({ timestamp: now, userId: opts?.userId, endpoint: opts?.endpoint, tokens, success: opts?.success !== false });
  while (recentCalls.length > 500) recentCalls.shift();

  if (opts?.userId) {
    const today = getTodayKey();
    const entry = userDailyCounts.get(opts.userId);
    if (entry && entry.date === today) {
      entry.count += items;
    } else {
      userDailyCounts.set(opts.userId, { date: today, count: items });
    }
  }
}

export function getAiConfig() {
  ensureToday();
  const now = Date.now();
  return {
    enabled: runtimeEnabled,
    maxItemsPerDay: runtimeMaxItems,
    maxTokensPerDay: runtimeMaxTokens,
    freeTierDailyLimit: runtimeFreeTierLimit,
    rateLimitPerMinute: runtimeRateLimit,
    usage: {
      date: dailyUsage.date,
      itemsGenerated: dailyUsage.itemsGenerated,
      tokensUsed: dailyUsage.tokensUsed,
    },
    recentCallCount: recentCalls.filter(c => c.timestamp > now - 3600000).length,
    model: "gpt-4o-mini",
  };
}

const MAX_USER_DAILY_ENTRIES = 5000;

export function pruneUserDailyCounts(): void {
  const today = getTodayKey();
  let pruned = 0;
  for (const [userId, entry] of userDailyCounts) {
    if (entry.date !== today) {
      userDailyCounts.delete(userId);
      pruned++;
    }
  }
  if (userDailyCounts.size > MAX_USER_DAILY_ENTRIES) {
    const entries = Array.from(userDailyCounts.entries());
    entries.sort((a, b) => a[1].count - b[1].count);
    const toRemove = entries.slice(0, userDailyCounts.size - MAX_USER_DAILY_ENTRIES);
    for (const [key] of toRemove) {
      userDailyCounts.delete(key);
      pruned++;
    }
  }
  while (recentCalls.length > 200) recentCalls.shift();
}

export function setAiConfig(config: { enabled?: boolean; maxItemsPerDay?: number; maxTokensPerDay?: number; freeTierDailyLimit?: number; rateLimitPerMinute?: number }): void {
  if (typeof config.enabled === "boolean") runtimeEnabled = config.enabled;
  if (typeof config.maxItemsPerDay === "number" && config.maxItemsPerDay > 0) runtimeMaxItems = config.maxItemsPerDay;
  if (typeof config.maxTokensPerDay === "number" && config.maxTokensPerDay > 0) runtimeMaxTokens = config.maxTokensPerDay;
  if (typeof config.freeTierDailyLimit === "number" && config.freeTierDailyLimit > 0) runtimeFreeTierLimit = config.freeTierDailyLimit;
  if (typeof config.rateLimitPerMinute === "number" && config.rateLimitPerMinute > 0) runtimeRateLimit = config.rateLimitPerMinute;
}
