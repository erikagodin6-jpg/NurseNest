const ENABLE_AI_AUTOGEN = process.env.ENABLE_AI_AUTOGEN === "true";
const MAX_AI_ITEMS_PER_DAY = parseInt(process.env.MAX_AI_ITEMS_PER_DAY || "200", 10);
const MAX_AI_TOKENS_PER_DAY = parseInt(process.env.MAX_AI_TOKENS_PER_DAY || "300000", 10);

interface DailyUsage {
  date: string;
  itemsGenerated: number;
  tokensUsed: number;
}

let dailyUsage: DailyUsage = {
  date: new Date().toISOString().slice(0, 10),
  itemsGenerated: 0,
  tokensUsed: 0,
};

let runtimeEnabled = ENABLE_AI_AUTOGEN;
let runtimeMaxItems = MAX_AI_ITEMS_PER_DAY;
let runtimeMaxTokens = MAX_AI_TOKENS_PER_DAY;

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureToday(): void {
  const today = getTodayKey();
  if (dailyUsage.date !== today) {
    dailyUsage = { date: today, itemsGenerated: 0, tokensUsed: 0 };
  }
}

export function checkAiLimits(): { allowed: boolean; reason?: string } {
  if (!runtimeEnabled) {
    return { allowed: false, reason: "AI generation is disabled. Enable it from Admin > AI Safety." };
  }
  ensureToday();
  if (dailyUsage.itemsGenerated >= runtimeMaxItems) {
    return { allowed: false, reason: `Daily AI item cap reached (${runtimeMaxItems} items). Resets at midnight UTC.` };
  }
  if (dailyUsage.tokensUsed >= runtimeMaxTokens) {
    return { allowed: false, reason: `Daily AI token cap reached (${runtimeMaxTokens} tokens). Resets at midnight UTC.` };
  }
  return { allowed: true };
}

export function recordAiUsage(items: number = 1, tokens: number = 0): void {
  ensureToday();
  dailyUsage.itemsGenerated += items;
  dailyUsage.tokensUsed += tokens;
}

export function getAiConfig() {
  ensureToday();
  return {
    enabled: runtimeEnabled,
    maxItemsPerDay: runtimeMaxItems,
    maxTokensPerDay: runtimeMaxTokens,
    usage: {
      date: dailyUsage.date,
      itemsGenerated: dailyUsage.itemsGenerated,
      tokensUsed: dailyUsage.tokensUsed,
    },
  };
}

export function setAiConfig(config: { enabled?: boolean; maxItemsPerDay?: number; maxTokensPerDay?: number }): void {
  if (typeof config.enabled === "boolean") runtimeEnabled = config.enabled;
  if (typeof config.maxItemsPerDay === "number" && config.maxItemsPerDay > 0) runtimeMaxItems = config.maxItemsPerDay;
  if (typeof config.maxTokensPerDay === "number" && config.maxTokensPerDay > 0) runtimeMaxTokens = config.maxTokensPerDay;
}
