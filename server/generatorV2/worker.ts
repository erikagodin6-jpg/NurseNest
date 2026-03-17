import { storage } from "../storage";
import { validateChunk, extractJsonFromResponse, type ValidationResult } from "./validator";
import { runPreflightChecks } from "../environment-write-service";
import { VALID_BODY_SYSTEMS } from "./taxonomyRegistry";

const VALID_SYSTEMS = [...VALID_BODY_SYSTEMS];

const TIER_PROMPT_BASES: Record<string, string> = {
  rpn: `You are a senior REx-PN (Canadian Practical Nurse Registration Exam) item writer for NurseNest.
Your questions must use Canadian terminology, SI units (mmol/L, umol/L, degrees Celsius, kg), and reflect RPN scope of practice.
RPN scope - monitor, report, administer as ordered, basic assessments. RPNs do NOT independently prescribe, diagnose, or initiate treatment plans.
Questions should test clinical judgment at the application/analysis level. Focus on patient safety, priority setting, and delegation within RPN scope.
All lab values must use SI/Canadian reference ranges. Drug names should use Canadian generic names.
Each question must include a detailed clinical scenario with specific patient data.`,

  rn: `You are a senior NCLEX-RN / Canadian RN Registration Exam item writer for NurseNest.
Your questions must reflect RN scope of practice with protocol-based interventions, complex assessments, and delegation decisions.
RN scope - protocol-based interventions, complex assessments, delegation, care coordination, patient education, critical thinking in acute and chronic settings.
Questions should test clinical judgment at the application/analysis level with emphasis on prioritization, delegation, and complex patient scenarios.
Each question must include a detailed clinical scenario with specific patient data.`,

  np: `You are a senior Nurse Practitioner certification exam item writer for NurseNest.
Your questions must reflect NP scope of advanced practice including ordering, prescribing, diagnosing, and autonomous clinical decision-making.
NP scope - order, prescribe, diagnose, advanced practice. NPs independently manage patient care, interpret diagnostics, prescribe pharmacotherapy, and make differential diagnoses.
Questions should test advanced clinical reasoning at the synthesis/evaluation level with emphasis on differential diagnosis, prescribing decisions, and evidence-based management.
Each question must include a detailed clinical scenario with specific patient data, lab results, and diagnostic findings.`,
};

const DEFAULT_PROMPT_BASE = TIER_PROMPT_BASES.rpn;

const ANTI_ECHO_SYSTEM = `
CRITICAL RULES FOR OUTPUT:
1. You must output ONLY valid JSON matching the schema below. No markdown, no code fences, no prose.
2. NEVER copy, paraphrase, or reference the user's instructions, system prompt, or any meta-instructions in ANY output field.
3. The "title" or "stem" fields must contain ONLY clinical question content. Never include phrases like "Generate questions", "Output JSON", "You are", "Instructions:", "Follow these", or any directive language.
4. If you cannot produce the requested number of questions, produce as many as you can - never pad with empty or placeholder items.
5. Every question must be unique with a distinct clinical scenario.
6. Do NOT use any emoji characters anywhere. Plain text only.
`;

interface PromptState {
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
  bySystem: Record<string, number>;
  byTopic: Record<string, number>;
  lastStems: string[];
  lastHashes: string[];
}

function getDefaultPromptState(): PromptState {
  return {
    byType: { MCQ: 0, SATA: 0 },
    byDifficulty: { moderate: 0, hard: 0, very_challenging: 0 },
    bySystem: {},
    byTopic: {},
    lastStems: [],
    lastHashes: [],
  };
}

function parseTopics(topicStr: string | null | undefined): string[] {
  if (!topicStr) return [];
  return topicStr
    .split(/[,;]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0 && t.length <= 100);
}

function getTierPromptBase(tier: string | null | undefined): string {
  const key = (tier || "rpn").toLowerCase();
  return TIER_PROMPT_BASES[key] || TIER_PROMPT_BASES.rpn;
}

function computeTopicDistribution(topics: string[], targetCount: number): Record<string, number> {
  if (topics.length === 0) return {};
  const perTopic = Math.floor(targetCount / topics.length);
  const remainder = targetCount % topics.length;
  const dist: Record<string, number> = {};
  topics.forEach((t, i) => {
    dist[t] = perTopic + (i < remainder ? 1 : 0);
  });
  return dist;
}

function getTopicNeedsBlock(topics: string[], state: PromptState, targetCount: number): string {
  if (topics.length === 0) return "";
  const dist = computeTopicDistribution(topics, targetCount);
  const lines = [`Topic distribution targets:`];
  for (const [topic, target] of Object.entries(dist)) {
    const done = state.byTopic[topic] || 0;
    const need = Math.max(0, target - done);
    lines.push(`- ${topic}: need ~${need} more (${done}/${target} done)`);
  }
  const underrep = topics.filter(t => {
    const target = dist[t] || 0;
    const done = state.byTopic[t] || 0;
    return done < target;
  });
  if (underrep.length > 0) {
    lines.push(`Focus this chunk on: ${underrep.slice(0, 3).join(", ")}`);
  }
  return lines.join("\n");
}

function computeDistributionNeeds(state: PromptState, remaining: number, targetCount: number): string {
  const totalSoFar = (state.byType.MCQ || 0) + (state.byType.SATA || 0);
  const targetMcq = Math.round(targetCount * 0.7);
  const targetSata = targetCount - targetMcq;
  const needMcq = Math.max(0, targetMcq - (state.byType.MCQ || 0));
  const needSata = Math.max(0, targetSata - (state.byType.SATA || 0));

  const targetMod = Math.round(targetCount * 0.30);
  const targetHard = Math.round(targetCount * 0.45);
  const targetVC = Math.round(targetCount * 0.25);

  const currentMod = state.byDifficulty.moderate || 0;
  const currentHard = state.byDifficulty.hard || 0;
  const currentVC = state.byDifficulty.very_challenging || 0;

  const needMod = Math.max(0, targetMod - currentMod);
  const needHard = Math.max(0, targetHard - currentHard);
  const needVC = Math.max(0, targetVC - currentVC);

  const lines = [
    `Distribution needs for this chunk:`,
    `- Type: need ~${needMcq} MCQ and ~${needSata} SATA (${totalSoFar}/${targetCount} done)`,
    `- Difficulty target: 30% moderate (easy), 45% hard (moderate), 25% very_challenging (hard)`,
    `- Difficulty needs: ~${needMod} moderate, ~${needHard} hard, ~${needVC} very_challenging`,
  ];

  const underrep = VALID_SYSTEMS.filter(s => !state.bySystem[s] || state.bySystem[s] < Math.ceil(targetCount / VALID_SYSTEMS.length));
  if (underrep.length > 0) {
    lines.push(`- Prioritize systems: ${underrep.slice(0, 5).join(", ")}`);
  }

  return lines.join("\n");
}

function validateDifficultyDistribution(items: any[]): { balanced: boolean; feedback: string } {
  if (items.length === 0) return { balanced: true, feedback: "" };
  
  const counts = { moderate: 0, hard: 0, very_challenging: 0 };
  for (const item of items) {
    const d = (item.difficulty || "moderate").toLowerCase();
    if (d in counts) counts[d as keyof typeof counts]++;
  }
  
  const total = items.length;
  const modPct = counts.moderate / total;
  const hardPct = counts.hard / total;
  const vcPct = counts.very_challenging / total;
  
  const driftThreshold = 0.20;
  const drifted = 
    Math.abs(modPct - 0.30) > driftThreshold ||
    Math.abs(hardPct - 0.45) > driftThreshold ||
    Math.abs(vcPct - 0.25) > driftThreshold;
  
  return {
    balanced: !drifted,
    feedback: drifted 
      ? `Difficulty drift detected: moderate=${Math.round(modPct*100)}% (target 30%), hard=${Math.round(hardPct*100)}% (target 45%), very_challenging=${Math.round(vcPct*100)}% (target 25%)`
      : "",
  };
}

function buildChunkPrompt(
  promptBase: string,
  startIdx: number,
  chunkSize: number,
  state: PromptState,
  targetCount: number,
  region: string,
  topics: string[] = [],
): { system: string; user: string } {
  const distributionBlock = computeDistributionNeeds(state, targetCount - (state.byType.MCQ || 0) - (state.byType.SATA || 0), targetCount);
  const topicBlock = getTopicNeedsBlock(topics, state, targetCount);
  const antiDupe = state.lastStems.length > 0
    ? `\nAvoid duplicating these recent stems:\n${state.lastStems.slice(-20).map((s, i) => `${i + 1}. ${s.substring(0, 80)}...`).join("\n")}`
    : "";

  const regionNote = region === "CA"
    ? "Use Canadian context: SI units (mmol/L, umol/L, Celsius, kg), Canadian drug names, RPN scope."
    : region === "US"
    ? "Use US context: conventional units (mEq/L, mg/dL, Fahrenheit, lbs), LPN/LVN scope."
    : "Include both CA and US reference values where applicable.";

  const topicInstruction = topics.length > 0
    ? `\nYou MUST generate questions covering these topics: ${topics.join(", ")}. Distribute questions proportionally across all listed topics. Each question's "topic" field must match one of the specified topics exactly.`
    : "";

  const system = `${promptBase}
${ANTI_ECHO_SYSTEM}
${regionNote}
${topicInstruction}

You will be called multiple times to generate questions in chunks.
You MUST return EXACTLY ${chunkSize} question objects in the "items" array. Not ${chunkSize - 1}, not ${chunkSize + 1}. Exactly ${chunkSize}.

Return strict JSON only. The JSON object must have exactly one key "items" containing an array of ${chunkSize} question objects.

Each question object schema:
{
  "type": "MCQ" or "SATA",
  "difficulty": "moderate" or "hard" or "very_challenging",
  "system": one of [${VALID_SYSTEMS.map(s => `"${s}"`).join(", ")}],
  "topic": "string - the clinical topic",
  "stem": "A detailed clinical scenario question (min 40 chars, NO instruction text)",
  "scenario": "Extended clinical context",
  "choices": [{"label": "A", "text": "..."}, {"label": "B", "text": "..."}, ...],
  "correct_answers": ["B"] for MCQ (exactly 1) or ["A","C","D"] for SATA (2-5),
  "rationale": {
    "correctReasoning": "Why the correct answer is right (min 10 chars)",
    "incorrectBreakdown": {"A": "Why wrong...", "C": "Why wrong..."},
    "keyPathophysiology": "Key pathophysiology concept",
    "nursingImplication": "Clinical nursing implication"
  },
  "exam_pearl": "A concise clinical pearl for exam prep"
}

MCQ rules: exactly 4 choices (A-D), exactly 1 correct answer.
SATA rules: 5-8 choices (A through E/F/G/H), 2-5 correct answers.

${distributionBlock}
${topicBlock ? "\n" + topicBlock : ""}
${antiDupe}

Return EXACTLY ${chunkSize} items. JSON only. No extra text, no markdown, no explanation.`;

  const user = `Return a JSON object with an "items" array containing exactly ${chunkSize} nursing exam questions (items ${startIdx} through ${startIdx + chunkSize - 1}). Each question must have a unique clinical scenario.`;

  return { system, user };
}

function buildRetryPrompt(
  promptBase: string,
  requestedCount: number,
  returnedCount: number,
  failureReason: string,
  region: string,
  topics: string[] = [],
): { system: string; user: string } {
  const regionNote = region === "CA"
    ? "Use Canadian context: SI units, Canadian drug names, RPN scope."
    : region === "US"
    ? "Use US context: conventional units, LPN/LVN scope."
    : "";

  const topicInstruction = topics.length > 0
    ? `Topics to cover: ${topics.join(", ")}.`
    : "";

  const system = `${promptBase}
${ANTI_ECHO_SYSTEM}
${regionNote}
${topicInstruction}

PREVIOUS ATTEMPT FAILED: ${failureReason}

You MUST return EXACTLY ${requestedCount} question objects. Not fewer, not more.
Return strict JSON with one key "items" containing an array of exactly ${requestedCount} objects.

Each question object must have: type, difficulty, system, topic, stem, scenario, choices, correct_answers, rationale, exam_pearl.
MCQ: 4 choices (A-D), 1 correct. SATA: 5-8 choices, 2-5 correct.

CRITICAL: Do NOT use any emoji. Plain text only. JSON only. No markdown.`;

  const user = `You previously returned ${returnedCount} questions instead of ${requestedCount}. Return a complete JSON object with "items" array containing EXACTLY ${requestedCount} unique nursing exam questions. Every question needs a distinct clinical scenario.`;

  return { system, user };
}

function buildReplacementPrompt(
  promptBase: string,
  invalidItems: { idx: number; errors: string[] }[],
  region: string,
): { system: string; user: string } {
  const system = `${promptBase}
${ANTI_ECHO_SYSTEM}
You are replacing specific invalid questions. Return ONLY the replacement items.
${region === "CA" ? "Use Canadian context: SI units, Canadian drug names, RPN scope." : ""}

Return JSON: {"replacements": [...]} where each item has: idx, type, difficulty, system, topic, stem, scenario, choices, correct_answers, rationale, exam_pearl.
MCQ: 4 choices (A-D), 1 correct. SATA: 5-8 choices, 2-5 correct.
JSON only. No markdown. No emoji.`;

  const user = `Replace these invalid items:\n${invalidItems.map(i => `- idx ${i.idx}: ${i.errors.join("; ")}`).join("\n")}\n\nReturn JSON with "replacements" array containing corrected items for these exact idx values.`;

  return { system, user };
}

async function callModel(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
): Promise<{ content: string; tokens: number }> {
  const { routeAIRequest } = await import("../ai-provider-router");
  const result = await routeAIRequest(systemPrompt, userPrompt, {
    model: "gpt-4o-mini",
    maxTokens,
    temperature: 0.3,
    responseFormat: { type: "json_object" },
    taskType: "qbank",
    feature: "generatorV2-worker",
  });

  return {
    content: result.content || "{}",
    tokens: result.tokensUsed || 0,
  };
}

function parseModelResponse(raw: string): any[] {
  const cleaned = extractJsonFromResponse(raw);
  const parsed = JSON.parse(cleaned);

  if (Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed.questions)) return parsed.questions;
  if (Array.isArray(parsed.replacements)) return parsed.replacements;
  if (Array.isArray(parsed)) return parsed;

  for (const key of Object.keys(parsed)) {
    if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
      const first = parsed[key][0];
      if (first && typeof first === "object" && (first.stem || first.type || first.choices)) {
        return parsed[key];
      }
    }
  }

  return [];
}

async function generateChunkWithRetry(
  promptBase: string,
  startIdx: number,
  chunkSize: number,
  state: PromptState,
  targetCount: number,
  region: string,
  topics: string[],
  existingHashes: Set<string>,
  generationId: string,
  maxRetries: number = 2,
): Promise<{ valid: ValidationResult[]; invalid: { idx: number; errors: string[] }[]; tokens: number }> {
  let totalTokens = 0;
  let lastReceivedCount = 0;
  let lastFailReason = "";

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    let items: any[];

    try {
      let systemPrompt: string;
      let userPrompt: string;

      if (attempt === 0) {
        const prompts = buildChunkPrompt(promptBase, startIdx, chunkSize, state, targetCount, region, topics);
        systemPrompt = prompts.system;
        userPrompt = prompts.user;
      } else {
        const reason = lastFailReason || `Returned ${lastReceivedCount} items instead of ${chunkSize}`;
        const prompts = buildRetryPrompt(promptBase, chunkSize, lastReceivedCount, reason, region, topics);
        systemPrompt = prompts.system;
        userPrompt = prompts.user;
      }

      const maxTokens = Math.min(chunkSize * 600 + 500, 16384);
      const result = await callModel(systemPrompt, userPrompt, maxTokens);
      totalTokens += result.tokens;

      items = parseModelResponse(result.content);
      lastReceivedCount = items.length;

      console.log(`[GenV2] Chunk attempt ${attempt + 1}: requested=${chunkSize}, received=${items.length}`);

      await storage.createGenerationEvent({
        generationId,
        eventType: attempt === 0 ? "chunk_received" : "chunk_retry_received",
        payload: { attempt: attempt + 1, requestedCount: chunkSize, receivedCount: items.length, tokens: result.tokens },
      });

    } catch (err: any) {
      console.error(`[GenV2] Chunk attempt ${attempt + 1} failed:`, err.message);
      lastFailReason = `API error: ${err.message}`;
      await storage.createGenerationEvent({
        generationId,
        eventType: "chunk_error",
        payload: { attempt: attempt + 1, error: err.message },
      });

      if (attempt === maxRetries) {
        return { valid: [], invalid: [], tokens: totalTokens };
      }
      await new Promise(r => setTimeout(r, 1500));
      continue;
    }

    if (items.length === 0) {
      lastFailReason = "Returned 0 items";
      console.log(`[GenV2] Attempt ${attempt + 1}: 0 items parsed, retrying...`);
      if (attempt === maxRetries) {
        return { valid: [], invalid: [], tokens: totalTokens };
      }
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    const { valid, invalid } = validateChunk(items, startIdx, existingHashes);

    if (valid.length > 0) {
      const diffCheck = validateDifficultyDistribution(items);
      if (!diffCheck.balanced) {
        console.log(`[GenV2] ${diffCheck.feedback}`);
        await storage.createGenerationEvent({
          generationId,
          eventType: "difficulty_drift",
          payload: { feedback: diffCheck.feedback, itemCount: items.length, attempt: attempt + 1 },
        });

        if (attempt < maxRetries) {
          console.log(`[GenV2] Rejecting chunk due to difficulty drift, retrying (attempt ${attempt + 1}/${maxRetries})...`);
          await new Promise(r => setTimeout(r, 1000));
          continue;
        }
        console.log(`[GenV2] Accepting drifted chunk after exhausting retries`);
      }

      if (valid.length < chunkSize && attempt < maxRetries) {
        console.log(`[GenV2] Attempt ${attempt + 1}: only ${valid.length}/${chunkSize} valid (${invalid.length} invalid). Accepting partial, outer loop will request more.`);
      }
      return { valid, invalid, tokens: totalTokens };
    }

    lastFailReason = `All ${items.length} items failed validation: ${invalid.slice(0, 3).map(i => i.errors[0]).join("; ")}`;
    console.log(`[GenV2] Attempt ${attempt + 1}: all ${items.length} items invalid, retrying...`);
    await storage.createGenerationEvent({
      generationId,
      eventType: "chunk_all_invalid",
      payload: { attempt: attempt + 1, invalidCount: invalid.length, reasons: invalid.slice(0, 5).map(i => i.errors) },
    });

    if (attempt < maxRetries) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  return { valid: [], invalid: [], tokens: totalTokens };
}

export async function runGenerationWorker(generationId: string): Promise<void> {
  let gen = await storage.getProductGeneration(generationId);
  if (!gen) throw new Error("Generation not found");

  if (gen.status === "complete") return;

  await storage.updateProductGeneration(generationId, {
    status: "running",
    startedAt: gen.startedAt || new Date(),
    lastError: null,
  });

  await storage.createGenerationEvent({
    generationId,
    eventType: "run_started",
    payload: { resumeFrom: gen.createdCount },
  });

  const settings = (gen.settings as Record<string, any>) || {};
  const tier = settings.tier || "rpn";
  const topics = parseTopics(gen.topic);
  const tierBase = getTierPromptBase(tier);
  const customInstructions = gen.promptBase || "";
  const promptBase = customInstructions
    ? `${tierBase}\n\nAdditional instructions from admin:\n${customInstructions}`
    : tierBase;
  const targetCount = gen.targetCount;
  const region = gen.region || "BOTH";
  let state: PromptState = (gen.promptState as PromptState) || getDefaultPromptState();
  if (!state.byTopic) state.byTopic = {};

  const CHUNK_SIZE = gen.chunkSize || 15;

  const existingQuestions = await storage.getGeneratedQuestions(generationId);
  const existingHashes = new Set(existingQuestions.map(q => q.hash).filter(Boolean) as string[]);
  let currentCount = existingQuestions.length;
  let maxIdx = existingQuestions.reduce((max, q) => Math.max(max, q.idx), 0);
  let consecutiveEmptyChunks = 0;
  const MAX_EMPTY_CHUNKS = 5;

  console.log(`[GenV2] Starting worker for ${generationId}: ${currentCount}/${targetCount} done, tier=${tier}, topics=[${topics.join(", ")}], chunkSize=${CHUNK_SIZE}`);

  while (currentCount < targetCount) {
    gen = await storage.getProductGeneration(generationId);
    if (!gen || gen.status === "paused") {
      console.log(`[GenV2] Job ${generationId} paused`);
      return;
    }

    const remaining = targetCount - currentCount;
    const thisChunkSize = Math.min(CHUNK_SIZE, remaining);
    const startIdx = maxIdx + 1;

    console.log(`[GenV2] Chunk: generating ${thisChunkSize} items starting at idx ${startIdx} (${currentCount}/${targetCount})`);

    await storage.createGenerationEvent({
      generationId,
      eventType: "chunk_requested",
      payload: { startIdx, count: thisChunkSize, currentCount, targetCount },
    });

    const { valid, invalid, tokens } = await generateChunkWithRetry(
      promptBase, startIdx, thisChunkSize, state, targetCount, region, topics, existingHashes, generationId,
    );

    if (valid.length === 0) {
      consecutiveEmptyChunks++;
      console.log(`[GenV2] No valid items from chunk (${consecutiveEmptyChunks}/${MAX_EMPTY_CHUNKS} consecutive)`);

      if (consecutiveEmptyChunks >= MAX_EMPTY_CHUNKS) {
        await storage.updateProductGeneration(generationId, {
          status: "failed",
          lastError: `${MAX_EMPTY_CHUNKS} consecutive chunks produced no valid items`,
        });
        return;
      }
      await new Promise(r => setTimeout(r, 2000));
      continue;
    }

    consecutiveEmptyChunks = 0;

    const toSave = valid.map(v => ({
      generationId,
      idx: v.normalized!.idx,
      type: v.normalized!.type,
      difficulty: v.normalized!.difficulty,
      system: v.normalized!.system,
      stem: v.normalized!.stem,
      scenario: v.normalized!.scenario,
      choices: v.normalized!.choices,
      correctAnswers: v.normalized!.correctAnswers,
      rationale: v.normalized!.rationale,
      examPearl: v.normalized!.examPearl,
      hash: v.normalized!.hash,
    }));

    await storage.createGeneratedQuestionsBulk(toSave);

    const taxonomyMappings: Array<{ original: string; canonical: string; method: string; confidence: number; fallback: boolean }> = [];

    for (const v of valid) {
      existingHashes.add(v.normalized!.hash);
      state.byType[v.normalized!.type] = (state.byType[v.normalized!.type] || 0) + 1;
      state.byDifficulty[v.normalized!.difficulty] = (state.byDifficulty[v.normalized!.difficulty] || 0) + 1;
      state.bySystem[v.normalized!.system] = (state.bySystem[v.normalized!.system] || 0) + 1;
      const itemTopic = v.normalized!.topic || v.normalized!.system;
      state.byTopic[itemTopic] = (state.byTopic[itemTopic] || 0) + 1;
      state.lastStems.push(v.normalized!.stem.substring(0, 100));
      if (state.lastStems.length > 30) state.lastStems = state.lastStems.slice(-20);
      state.lastHashes.push(v.normalized!.hash);
      if (state.lastHashes.length > 30) state.lastHashes = state.lastHashes.slice(-20);
      maxIdx = Math.max(maxIdx, v.normalized!.idx);

      const tm = v.normalized!.taxonomyMapping;
      if (tm) {
        taxonomyMappings.push({
          original: tm.originalTopic || tm.originalSystem,
          canonical: tm.canonicalTopic,
          method: tm.method,
          confidence: tm.confidence,
          fallback: tm.fallbackApplied,
        });

        if (tm.fallbackApplied || tm.confidence < 0.7) {
          try {
            await storage.createTaxonomyReviewEntry({
              originalTopic: tm.originalTopic,
              originalSystem: tm.originalSystem,
              suggestedTopic: tm.canonicalTopic,
              suggestedSystem: tm.canonicalSystem,
              confidence: tm.confidence,
              matchMethod: tm.method,
              bodySystem: tm.canonicalSystem,
              generationId,
            });
          } catch (e) {
            console.warn(`[GenV2] Failed to log taxonomy review entry:`, e);
          }
        }
      }
    }

    currentCount += valid.length;

    await storage.createGenerationEvent({
      generationId,
      eventType: "chunk_saved",
      payload: {
        savedCount: valid.length,
        invalidCount: invalid.length,
        totalCount: currentCount,
        topicDistribution: state.byTopic,
        taxonomySummary: {
          totalMapped: taxonomyMappings.length,
          fallbacks: taxonomyMappings.filter(m => m.fallback).length,
          fuzzyMatches: taxonomyMappings.filter(m => m.method === "fuzzy").length,
          synonymMatches: taxonomyMappings.filter(m => m.method === "synonym").length,
          exactMatches: taxonomyMappings.filter(m => m.method === "exact").length,
          mappings: taxonomyMappings.slice(0, 10),
        },
      },
    });

    await storage.updateProductGeneration(generationId, {
      createdCount: currentCount,
      promptState: state,
    });

    console.log(`[GenV2] Saved ${valid.length} valid, ${invalid.length} invalid. Total: ${currentCount}/${targetCount}`);

    if (invalid.length > 0 && currentCount < targetCount) {
      console.log(`[GenV2] Requesting replacements for ${invalid.length} invalid items`);

      await storage.createGenerationEvent({
        generationId,
        eventType: "replacement_requested",
        payload: { invalidIds: invalid.map(i => i.idx), reasons: invalid.map(i => i.errors) },
      });

      try {
        const { system: rSys, user: rUser } = buildReplacementPrompt(promptBase, invalid, region);
        const rResult = await callModel(rSys, rUser, Math.min(invalid.length * 600 + 500, 8192));
        const replacements = parseModelResponse(rResult.content);
        const { valid: rValid } = validateChunk(replacements, maxIdx + 1, existingHashes);

        if (rValid.length > 0) {
          const rToSave = rValid.map(v => ({
            generationId,
            idx: v.normalized!.idx,
            type: v.normalized!.type,
            difficulty: v.normalized!.difficulty,
            system: v.normalized!.system,
            stem: v.normalized!.stem,
            scenario: v.normalized!.scenario,
            choices: v.normalized!.choices,
            correctAnswers: v.normalized!.correctAnswers,
            rationale: v.normalized!.rationale,
            examPearl: v.normalized!.examPearl,
            hash: v.normalized!.hash,
          }));

          await storage.createGeneratedQuestionsBulk(rToSave);

          for (const v of rValid) {
            existingHashes.add(v.normalized!.hash);
            state.byType[v.normalized!.type] = (state.byType[v.normalized!.type] || 0) + 1;
            state.byDifficulty[v.normalized!.difficulty] = (state.byDifficulty[v.normalized!.difficulty] || 0) + 1;
            state.bySystem[v.normalized!.system] = (state.bySystem[v.normalized!.system] || 0) + 1;
            maxIdx = Math.max(maxIdx, v.normalized!.idx);
          }

          currentCount += rValid.length;

          await storage.updateProductGeneration(generationId, {
            createdCount: currentCount,
            promptState: state,
          });

          console.log(`[GenV2] Replacement: ${rValid.length} saved. Total: ${currentCount}/${targetCount}`);
        }
      } catch (rErr: any) {
        console.error(`[GenV2] Replacement request failed:`, rErr.message);
        await storage.createGenerationEvent({
          generationId,
          eventType: "replacement_failed",
          payload: { error: rErr.message },
        });
      }
    }
  }

  await storage.updateProductGeneration(generationId, {
    status: "complete",
    completedAt: new Date(),
    createdCount: currentCount,
    promptState: state,
  });

  await storage.createGenerationEvent({
    generationId,
    eventType: "completed",
    payload: { totalCount: currentCount, targetCount },
  });

  console.log(`[GenV2] Generation ${generationId} complete: ${currentCount}/${targetCount}`);
}

export { DEFAULT_PROMPT_BASE, TIER_PROMPT_BASES, parseTopics, getTierPromptBase };
