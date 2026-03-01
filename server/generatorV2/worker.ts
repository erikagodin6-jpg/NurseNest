import { storage } from "../storage";
import { validateChunk, type ValidationResult } from "./validator";

const VALID_SYSTEMS = [
  "Cardiac", "Respiratory", "Neuro", "Renal", "Endocrine", "GI",
  "Hematology", "Immune", "Integumentary", "MSK", "Reproductive", "Multi-system",
];

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
    .split(/[,;\n]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0);
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

  const targetMod = Math.round(targetCount * 0.3);
  const targetHard = Math.round(targetCount * 0.5);
  const targetVC = targetCount - targetMod - targetHard;

  const lines = [
    `Distribution needs for this chunk:`,
    `- Type: need ~${needMcq} MCQ and ~${needSata} SATA (${totalSoFar}/${targetCount} done)`,
    `- Difficulty: need ~${Math.max(0, targetMod - (state.byDifficulty.moderate || 0))} moderate, ~${Math.max(0, targetHard - (state.byDifficulty.hard || 0))} hard, ~${Math.max(0, targetVC - (state.byDifficulty.very_challenging || 0))} very_challenging`,
  ];

  const systemCounts = Object.entries(state.bySystem).sort((a, b) => a[1] - b[1]);
  const underrep = VALID_SYSTEMS.filter(s => !state.bySystem[s] || state.bySystem[s] < Math.ceil(targetCount / VALID_SYSTEMS.length));
  if (underrep.length > 0) {
    lines.push(`- Prioritize systems: ${underrep.slice(0, 5).join(", ")}`);
  }

  return lines.join("\n");
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

${regionNote}
${topicInstruction}

You will be called multiple times to generate questions in chunks. This is chunk starting at item ${startIdx}.
You MUST output EXACTLY ${chunkSize} items in strict JSON format.

Output format (JSON only, no markdown):
{
  "items": [
    {
      "type": "MCQ",
      "difficulty": "hard",
      "system": "Cardiac",
      "topic": "${topics.length > 0 ? topics[0] : "General"}",
      "stem": "A 68-year-old patient with a history of atrial fibrillation...",
      "scenario": "Clinical scenario here...",
      "choices": [
        {"label": "A", "text": "Administer prescribed warfarin"},
        {"label": "B", "text": "Hold the medication"},
        {"label": "C", "text": "Contact the prescriber"},
        {"label": "D", "text": "Assess for bleeding"}
      ],
      "correct_answers": ["C"],
      "rationale": {
        "correctReasoning": "Why C is correct...",
        "incorrectBreakdown": {"A": "Why wrong...", "B": "Why wrong...", "D": "Why wrong..."},
        "keyPathophysiology": "Key pathophys...",
        "nursingImplication": "Nursing implication..."
      },
      "exam_pearl": "Clinical pearl for exam prep..."
    }
  ],
  "meta": { "startId": ${startIdx}, "count": ${chunkSize}, "chunk": ${Math.ceil(startIdx / chunkSize)} }
}

Question type rules:
- MCQ: exactly 4 choices labeled A-D, exactly 1 correct answer letter
- SATA: 5-8 choices labeled A through E/F/G/H, 2-5 correct answer letters as array

${distributionBlock}
${topicBlock ? "\n" + topicBlock : ""}
${antiDupe}

CRITICAL: Do NOT use any emoji characters anywhere in the output. No unicode emoji symbols. Plain text only.

Output EXACTLY ${chunkSize} questions. JSON only. No extra text.`;

  const user = `Generate questions ${startIdx} through ${startIdx + chunkSize - 1}. Return strict JSON with exactly ${chunkSize} items.`;

  return { system, user };
}

function buildReplacementPrompt(
  promptBase: string,
  invalidItems: { idx: number; errors: string[] }[],
  region: string,
): { system: string; user: string } {
  const system = `${promptBase}

You are replacing specific invalid questions. Return ONLY the replacement items.
${region === "CA" ? "Use Canadian context: SI units, Canadian drug names, RPN scope." : ""}

Output format (JSON only):
{
  "replacements": [
    {
      "idx": 49,
      "type": "MCQ",
      "difficulty": "hard",
      "system": "Cardiac",
      "stem": "...",
      "scenario": "...",
      "choices": [...],
      "correct_answers": ["B"],
      "rationale": { "correctReasoning": "...", "incorrectBreakdown": {...}, "keyPathophysiology": "...", "nursingImplication": "..." },
      "exam_pearl": "..."
    }
  ]
}

CRITICAL: Do NOT use any emoji characters anywhere in the output. No unicode emoji symbols. Plain text only.`;

  const user = `Replace these invalid items:\n${invalidItems.map(i => `- idx ${i.idx}: ${i.errors.join("; ")}`).join("\n")}\n\nReturn JSON with "replacements" array containing corrected items for these exact idx values.`;

  return { system, user };
}

async function callModel(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
): Promise<{ content: string; tokens: number }> {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  return {
    content: resp.choices[0]?.message?.content || "{}",
    tokens: resp.usage?.total_tokens || 0,
  };
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
  const promptBase = gen.promptBase || getTierPromptBase(tier);
  const chunkSize = gen.chunkSize || 15;
  const targetCount = gen.targetCount;
  const region = gen.region || "BOTH";
  let state: PromptState = (gen.promptState as PromptState) || getDefaultPromptState();
  if (!state.byTopic) state.byTopic = {};

  const existingQuestions = await storage.getGeneratedQuestions(generationId);
  const existingHashes = new Set(existingQuestions.map(q => q.hash).filter(Boolean) as string[]);
  let currentCount = existingQuestions.length;
  let maxIdx = existingQuestions.reduce((max, q) => Math.max(max, q.idx), 0);
  let consecutiveFailures = 0;
  const MAX_CONSECUTIVE_FAILURES = 3;

  console.log(`[GenV2] Starting worker for ${generationId}: ${currentCount}/${targetCount} done, tier=${tier}, topics=[${topics.join(", ")}]`);

  while (currentCount < targetCount) {
    gen = await storage.getProductGeneration(generationId);
    if (!gen || gen.status === "paused") {
      console.log(`[GenV2] Job ${generationId} paused`);
      return;
    }

    const remaining = targetCount - currentCount;
    const thisChunkSize = Math.min(chunkSize, remaining);
    const startIdx = maxIdx + 1;

    console.log(`[GenV2] Chunk: generating ${thisChunkSize} items starting at idx ${startIdx} (${currentCount}/${targetCount})`);

    await storage.createGenerationEvent({
      generationId,
      eventType: "chunk_requested",
      payload: { startIdx, count: thisChunkSize, currentCount, targetCount },
    });

    let chunkContent: string;
    let tokens = 0;
    try {
      const { system, user } = buildChunkPrompt(promptBase, startIdx, thisChunkSize, state, targetCount, region, topics);
      const maxTokens = Math.min(thisChunkSize * 500 + 500, 16384);
      const result = await callModel(system, user, maxTokens);
      chunkContent = result.content;
      tokens = result.tokens;
    } catch (err: any) {
      console.error(`[GenV2] Model call failed:`, err.message);
      consecutiveFailures++;
      await storage.createGenerationEvent({
        generationId,
        eventType: "chunk_error",
        payload: { error: err.message, consecutiveFailures },
      });

      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        await storage.updateProductGeneration(generationId, {
          status: "failed",
          lastError: `Model call failed ${MAX_CONSECUTIVE_FAILURES} times: ${err.message}`,
        });
        return;
      }
      await new Promise(r => setTimeout(r, 2000));
      continue;
    }

    let items: any[];
    try {
      const parsed = JSON.parse(chunkContent);
      items = Array.isArray(parsed.items)
        ? parsed.items
        : Array.isArray(parsed.questions)
        ? parsed.questions
        : Array.isArray(parsed)
        ? parsed
        : [];
    } catch (parseErr: any) {
      console.error(`[GenV2] JSON parse error, retrying with smaller chunk`);
      consecutiveFailures++;
      await storage.createGenerationEvent({
        generationId,
        eventType: "parse_error",
        payload: { error: parseErr.message, rawLength: chunkContent.length },
      });

      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        await storage.updateProductGeneration(generationId, {
          status: "failed",
          lastError: `JSON parse failed ${MAX_CONSECUTIVE_FAILURES} times`,
        });
        return;
      }
      continue;
    }

    await storage.createGenerationEvent({
      generationId,
      eventType: "chunk_received",
      payload: { itemCount: items.length, tokens },
    });

    const { valid, invalid } = validateChunk(items, startIdx, existingHashes);

    if (valid.length > 0) {
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

      for (let vi = 0; vi < valid.length; vi++) {
        const v = valid[vi];
        existingHashes.add(v.normalized!.hash);
        state.byType[v.normalized!.type] = (state.byType[v.normalized!.type] || 0) + 1;
        state.byDifficulty[v.normalized!.difficulty] = (state.byDifficulty[v.normalized!.difficulty] || 0) + 1;
        state.bySystem[v.normalized!.system] = (state.bySystem[v.normalized!.system] || 0) + 1;
        const rawItem = items[vi];
        const itemTopic = rawItem?.topic || v.normalized!.system;
        state.byTopic[itemTopic] = (state.byTopic[itemTopic] || 0) + 1;
        state.lastStems.push(v.normalized!.stem.substring(0, 100));
        if (state.lastStems.length > 30) state.lastStems = state.lastStems.slice(-20);
        state.lastHashes.push(v.normalized!.hash);
        if (state.lastHashes.length > 30) state.lastHashes = state.lastHashes.slice(-20);
        maxIdx = Math.max(maxIdx, v.normalized!.idx);
      }

      currentCount += valid.length;
      consecutiveFailures = 0;

      await storage.createGenerationEvent({
        generationId,
        eventType: "chunk_saved",
        payload: { savedCount: valid.length, invalidCount: invalid.length, totalCount: currentCount, topicDistribution: state.byTopic },
      });

      await storage.updateProductGeneration(generationId, {
        createdCount: currentCount,
        promptState: state,
      });

      console.log(`[GenV2] Saved ${valid.length} valid, ${invalid.length} invalid. Total: ${currentCount}/${targetCount}`);
    }

    if (invalid.length > 0 && currentCount < targetCount) {
      console.log(`[GenV2] Requesting replacements for ${invalid.length} invalid items`);

      await storage.createGenerationEvent({
        generationId,
        eventType: "replacement_requested",
        payload: { invalidIds: invalid.map(i => i.idx), reasons: invalid.map(i => i.errors) },
      });

      try {
        const { system: rSys, user: rUser } = buildReplacementPrompt(promptBase, invalid, region);
        const rResult = await callModel(rSys, rUser, Math.min(invalid.length * 500 + 500, 8192));
        const rParsed = JSON.parse(rResult.content);
        const replacements = Array.isArray(rParsed.replacements)
          ? rParsed.replacements
          : Array.isArray(rParsed.items)
          ? rParsed.items
          : [];

        const { valid: rValid } = validateChunk(replacements, maxIdx + 1, existingHashes);

        if (rValid.length > 0) {
          const toSave = rValid.map(v => ({
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
