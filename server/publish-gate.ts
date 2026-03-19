import type { Express, Request, Response } from "express";
import crypto from "crypto";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { validateForPublish, autoRepairContent, type ValidationResult, type ValidationError, type AutoRepairAction } from "./content-integrity-validation";

export interface PublishGateResult {
  allowed: boolean;
  contentId: string;
  contentType: string;
  validation: ValidationResult;
  repairReport: RepairReport | null;
  artifactsGenerated: ArtifactSummary[];
  previousVersionPreserved: boolean;
  previousVersionId: string | null;
  timestamp: string;
}

export interface RepairReport {
  errors: ValidationError[];
  warnings: ValidationError[];
  autoRepairs: AutoRepairAction[];
  blockedReason: string;
  suggestedFixes: SuggestedFix[];
}

export interface SuggestedFix {
  field: string;
  issue: string;
  suggestion: string;
  autoFixable: boolean;
}

export interface ArtifactSummary {
  artifactId: string;
  artifactType: string;
  checksum: string;
  status: string;
}

const SUPPORTED_CONTENT_TYPES = new Set([
  "question", "questions", "exam_question",
  "flashcard", "flashcards",
  "lesson", "lessons",
  "blog", "blog-post", "article",
]);

function computeChecksum(data: any): string {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

function normalizeContentType(ct: string): string {
  if (ct === "questions" || ct === "exam_question") return "question";
  if (ct === "flashcards") return "flashcard";
  if (ct === "lessons") return "lesson";
  if (ct === "blog-post" || ct === "article") return "blog";
  return ct;
}

function getTableForContentType(ct: string): string | null {
  const normalized = normalizeContentType(ct);
  switch (normalized) {
    case "question": return "exam_questions";
    case "flashcard": return "flashcard_bank";
    case "lesson": return "lessons";
    case "blog": return "content_items";
    default: return null;
  }
}

async function ensureTablesExist(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS backup_artifacts (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      content_version_id VARCHAR,
      content_id VARCHAR NOT NULL,
      content_type TEXT NOT NULL,
      artifact_type TEXT NOT NULL,
      storage_path TEXT,
      checksum TEXT,
      status TEXT DEFAULT 'active',
      metadata JSONB DEFAULT '{}'::jsonb,
      generated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS publish_validation_logs (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      content_id VARCHAR NOT NULL,
      content_type TEXT NOT NULL,
      action TEXT NOT NULL,
      passed BOOLEAN NOT NULL,
      errors JSONB DEFAULT '[]'::jsonb,
      warnings JSONB DEFAULT '[]'::jsonb,
      repair_report JSONB DEFAULT '{}'::jsonb,
      previous_version_id VARCHAR,
      artifacts_generated INTEGER DEFAULT 0,
      actor_id VARCHAR,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )
  `);
}

let tablesEnsured = false;
async function ensureOnce() {
  if (!tablesEnsured) {
    await ensureTablesExist();
    tablesEnsured = true;
  }
}

async function fetchContentData(contentType: string, contentId: string): Promise<any | null> {
  const table = getTableForContentType(contentType);
  if (!table) return null;
  try {
    const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1 LIMIT 1`, [contentId]);
    return result.rows[0] || null;
  } catch {
    return null;
  }
}

async function preserveLastKnownGood(contentType: string, contentId: string, data: any): Promise<string | null> {
  try {
    const result = await pool.query(
      `INSERT INTO content_snapshots (id, content_id, version, title, slug, content_data, metadata, snapshot_type, created_at)
       VALUES (gen_random_uuid(), $1,
         COALESCE((SELECT MAX(version) FROM content_snapshots WHERE content_id = $1), 0) + 1,
         $2, $3, $4, $5, 'publish_gate', NOW())
       RETURNING id`,
      [
        contentId,
        data.title || data.stem || null,
        data.slug || null,
        JSON.stringify(data),
        JSON.stringify({ contentType: normalizeContentType(contentType), preservedAt: new Date().toISOString() }),
      ]
    );
    return result.rows[0]?.id || null;
  } catch (err: any) {
    console.error("[PublishGate] Error preserving last-known-good:", err.message);
    return null;
  }
}

function generateSafeJsonPayload(contentType: string, data: any): any {
  const normalized = normalizeContentType(contentType);
  const base: any = {
    _renderVersion: 1,
    _generatedAt: new Date().toISOString(),
    _contentType: normalized,
    id: data.id,
  };

  if (normalized === "question") {
    return {
      ...base,
      stem: data.stem || "",
      options: Array.isArray(data.options) ? data.options : [],
      correctAnswer: data.correct_answer ?? data.correctAnswer ?? null,
      tier: data.tier || null,
      exam: data.exam || null,
      bodySystem: data.body_system ?? data.bodySystem ?? null,
      topic: data.topic || null,
      difficulty: data.difficulty || null,
      rationale: data.rationale || null,
      questionType: data.question_type ?? data.questionType ?? "multiple_choice",
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  }

  if (normalized === "flashcard") {
    return {
      ...base,
      front: data.front || "",
      back: data.back || "",
      tier: data.tier || null,
      topic: data.topic || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      deckId: data.deck_id ?? data.deckId ?? null,
    };
  }

  if (normalized === "lesson") {
    return {
      ...base,
      title: data.title || "",
      slug: data.slug || "",
      category: data.category || null,
      tier: data.tier || null,
      summary: data.summary || null,
      definition: data.definition || null,
      pathophysiology: data.pathophysiology || null,
      signsSymptoms: data.signs_symptoms ?? data.signsSymptoms ?? null,
      diagnostics: data.diagnostics || null,
      treatment: data.treatment || null,
      nursingInterventions: data.nursing_interventions ?? data.nursingInterventions ?? null,
      complications: data.complications || null,
      clinicalPearls: data.clinical_pearls ?? data.clinicalPearls ?? null,
      seoTitle: data.seo_title ?? data.seoTitle ?? null,
      seoDescription: data.seo_description ?? data.seoDescription ?? null,
    };
  }

  if (normalized === "blog") {
    return {
      ...base,
      title: data.title || "",
      slug: data.slug || "",
      type: data.type || "blog",
      content: data.content || null,
      metaTitle: data.meta_title ?? data.metaTitle ?? null,
      metaDescription: data.meta_description ?? data.metaDescription ?? null,
      tier: data.tier || null,
    };
  }

  return { ...base, rawData: data };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function generateHtmlPayload(contentType: string, data: any): string {
  const normalized = normalizeContentType(contentType);
  const title = data.title || data.stem || "Content Backup";

  let body = "";

  if (normalized === "question") {
    body += `<div class="question"><h2>Question</h2><p>${escapeHtml(data.stem || "")}</p>`;
    const options = Array.isArray(data.options) ? data.options : [];
    if (options.length > 0) {
      body += `<ol type="A">`;
      for (const opt of options) {
        const text = typeof opt === "string" ? opt : opt?.text || String(opt);
        body += `<li>${escapeHtml(text)}</li>`;
      }
      body += `</ol>`;
    }
    if (data.rationale) {
      body += `<div class="rationale"><h3>Rationale</h3><p>${escapeHtml(data.rationale)}</p></div>`;
    }
    body += `</div>`;
  } else if (normalized === "flashcard") {
    body += `<div class="flashcard"><div class="front"><h3>Front</h3><p>${escapeHtml(data.front || "")}</p></div>`;
    body += `<div class="back"><h3>Back</h3><p>${escapeHtml(data.back || "")}</p></div></div>`;
  } else if (normalized === "lesson") {
    body += `<article class="lesson"><h1>${escapeHtml(data.title || "")}</h1>`;
    if (data.summary) body += `<p class="summary">${escapeHtml(data.summary)}</p>`;
    if (data.definition) body += `<section><h2>Definition</h2><p>${escapeHtml(data.definition)}</p></section>`;
    if (data.pathophysiology) body += `<section><h2>Pathophysiology</h2><p>${escapeHtml(data.pathophysiology)}</p></section>`;
    body += `</article>`;
  } else if (normalized === "blog") {
    body += `<article class="blog"><h1>${escapeHtml(data.title || "")}</h1>`;
    if (typeof data.content === "string") {
      body += `<div class="content">${escapeHtml(data.content)}</div>`;
    } else if (Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block?.type === "paragraph" && block?.content) {
          body += `<p>${escapeHtml(typeof block.content === "string" ? block.content : JSON.stringify(block.content))}</p>`;
        } else if (block?.type === "heading" && block?.content) {
          body += `<h2>${escapeHtml(typeof block.content === "string" ? block.content : JSON.stringify(block.content))}</h2>`;
        }
      }
    }
    body += `</article>`;
  }

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${escapeHtml(title)}</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}h1,h2,h3{color:#1a1a2e}.rationale{background:#f0f8ff;padding:1rem;border-left:3px solid #0066cc;margin:1rem 0}.flashcard .front,.flashcard .back{padding:1rem;margin:.5rem 0;border:1px solid #ddd;border-radius:4px}.summary{color:#555;font-style:italic}</style></head><body>${body}<footer><p><small>Backup artifact generated at ${new Date().toISOString()}</small></p></footer></body></html>`;
}

async function storeArtifact(
  contentId: string,
  contentVersionId: string | null,
  contentType: string,
  artifactType: string,
  payload: any,
  checksum: string
): Promise<string> {
  const storagePath = `backup_artifacts/${normalizeContentType(contentType)}/${contentId}/${artifactType}_${Date.now()}`;
  const payloadStr = typeof payload === "string" ? payload : JSON.stringify(payload);
  const result = await pool.query(
    `INSERT INTO backup_artifacts (id, content_version_id, content_id, content_type, artifact_type, storage_path, checksum, status, metadata, generated_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'active', $7, NOW())
     RETURNING id`,
    [
      contentVersionId,
      contentId,
      normalizeContentType(contentType),
      artifactType,
      storagePath,
      checksum,
      JSON.stringify({ payloadSize: payloadStr.length, payload: payloadStr.length <= 500000 ? payload : null }),
    ]
  );
  return result.rows[0].id;
}

function checkZeroValidItems(normalizedType: string, data: any): boolean {
  if (normalizedType === "question") {
    const options = Array.isArray(data.options) ? data.options : [];
    const validOptions = options.filter((o: any) => {
      const text = typeof o === "string" ? o : o?.text;
      return text && text.trim().length > 0;
    });
    if (validOptions.length === 0) return true;
    if (!data.stem || (typeof data.stem === "string" && data.stem.trim().length === 0)) return true;
  }

  if (normalizedType === "flashcard") {
    if ((!data.front || data.front.trim().length === 0) && (!data.back || data.back.trim().length === 0)) return true;
  }

  if (normalizedType === "lesson" || normalizedType === "blog") {
    const content = data.content;
    if (content === null || content === undefined) return true;
    if (typeof content === "string" && (content === "[]" || content === "{}" || content === "null" || content.trim().length === 0)) return true;
    if (Array.isArray(content) && content.length === 0) return true;
    if (typeof content === "object" && !Array.isArray(content) && Object.keys(content).length === 0) return true;

    const hasSubstantive = data.title || data.definition || data.summary || data.pathophysiology;
    if (!hasSubstantive && (!content || (Array.isArray(content) && content.length === 0))) return true;
  }

  return false;
}

function validateLinkedMediaAssets(data: any, contentType: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const normalized = normalizeContentType(contentType);

  if (normalized === "question") {
    if (data.image_url && typeof data.image_url === "string" && !data.image_url.startsWith("http") && !data.image_url.startsWith("/")) {
      errors.push({ field: "image_url", message: "Question image URL is invalid", severity: "error" });
    }
    const ngnPayload = data.ngn_payload || data.ngnPayload || data.exhibit_data;
    if (ngnPayload?.imageUrl && typeof ngnPayload.imageUrl === "string" && !ngnPayload.imageUrl.startsWith("http") && !ngnPayload.imageUrl.startsWith("/")) {
      errors.push({ field: "ngnPayload.imageUrl", message: "NGN image URL is invalid", severity: "error" });
    }
  }

  if (normalized === "lesson") {
    if (data.image_url && typeof data.image_url === "string" && !data.image_url.startsWith("http") && !data.image_url.startsWith("/")) {
      errors.push({ field: "image_url", message: "Lesson image URL is invalid", severity: "error" });
    }
  }

  return errors;
}

function validateAccessMetadata(data: any, contentType: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const normalized = normalizeContentType(contentType);
  const VALID_TIERS = ["rpn", "rn", "np", "allied", "free", "newgrad", "lvn"];

  if (data.tier && !VALID_TIERS.includes(data.tier)) {
    errors.push({ field: "tier", message: `Invalid tier "${data.tier}". Valid tiers: ${VALID_TIERS.join(", ")}`, severity: "error" });
  }

  if (normalized === "question") {
    const TIER_EXAM_MAP: Record<string, string[]> = {
      rpn: ["NCLEX-PN", "REx-PN", "CPNRE"],
      rn: ["NCLEX-RN", "NCLEX-RN-CA"],
      np: ["AANP", "ANCC", "CNPE"],
    };
    if (data.tier && data.exam && TIER_EXAM_MAP[data.tier]) {
      if (!TIER_EXAM_MAP[data.tier].includes(data.exam)) {
        errors.push({
          field: "exam",
          message: `Exam "${data.exam}" is not valid for tier "${data.tier}". Expected: ${TIER_EXAM_MAP[data.tier].join(", ")}`,
          severity: "warning" as any,
        });
      }
    }
  }

  return errors;
}

function validateRouteGeneration(data: any, contentType: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const normalized = normalizeContentType(contentType);

  if (normalized === "lesson" || normalized === "blog") {
    if (!data.slug || typeof data.slug !== "string" || data.slug.trim().length < 2) {
      errors.push({ field: "slug", message: "Valid slug is required for route generation", severity: "error" });
    } else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(data.slug)) {
      errors.push({ field: "slug", message: "Slug contains invalid characters for URL routing", severity: "warning" as any });
    }
  }

  return errors;
}

async function generateBackupArtifacts(
  contentType: string,
  contentId: string,
  contentVersionId: string | null,
  data: any
): Promise<ArtifactSummary[]> {
  const artifacts: ArtifactSummary[] = [];

  const jsonPayload = generateSafeJsonPayload(contentType, data);
  const jsonChecksum = computeChecksum(jsonPayload);
  const jsonId = await storeArtifact(contentId, contentVersionId, contentType, "json_payload", jsonPayload, jsonChecksum);
  artifacts.push({ artifactId: jsonId, artifactType: "json_payload", checksum: jsonChecksum, status: "active" });

  const htmlPayload = generateHtmlPayload(contentType, data);
  const htmlChecksum = computeChecksum(htmlPayload);
  const htmlId = await storeArtifact(contentId, contentVersionId, contentType, "html_payload", htmlPayload, htmlChecksum);
  artifacts.push({ artifactId: htmlId, artifactType: "html_payload", checksum: htmlChecksum, status: "active" });

  const normalized = normalizeContentType(contentType);
  if (normalized === "lesson" || normalized === "blog") {
    const downloadable = {
      _format: "downloadable_backup",
      _generatedAt: new Date().toISOString(),
      title: data.title || "",
      content: jsonPayload,
      html: htmlPayload,
    };
    const dlChecksum = computeChecksum(downloadable);
    const dlId = await storeArtifact(contentId, contentVersionId, contentType, "downloadable", downloadable, dlChecksum);
    artifacts.push({ artifactId: dlId, artifactType: "downloadable", checksum: dlChecksum, status: "active" });
  }

  return artifacts;
}

function buildRepairReport(validation: ValidationResult, repairs: AutoRepairAction[]): RepairReport {
  const suggestedFixes: SuggestedFix[] = [];

  for (const err of validation.errors) {
    suggestedFixes.push({
      field: err.field,
      issue: err.message,
      suggestion: err.autoFixSuggestion || "Manual correction required",
      autoFixable: !!err.autoFixSuggestion,
    });
  }

  return {
    errors: validation.errors,
    warnings: validation.warnings,
    autoRepairs: repairs,
    blockedReason: validation.errors.length > 0
      ? `Publish blocked: ${validation.errors.length} validation error(s) found`
      : "Validation passed",
    suggestedFixes,
  };
}

export async function runPublishGate(
  contentType: string,
  contentId: string,
  data: any,
  actorId?: string
): Promise<PublishGateResult> {
  await ensureOnce();

  const timestamp = new Date().toISOString();
  const normalized = normalizeContentType(contentType);

  if (!SUPPORTED_CONTENT_TYPES.has(contentType)) {
    const unsupportedError: ValidationError = {
      field: "contentType",
      message: `Unsupported content type "${contentType}". Supported: question, flashcard, lesson, blog`,
      severity: "error",
    };
    return {
      allowed: false,
      contentId,
      contentType: normalized,
      validation: { valid: false, errors: [unsupportedError], warnings: [] },
      repairReport: {
        errors: [unsupportedError],
        warnings: [],
        autoRepairs: [],
        blockedReason: `Unsupported content type "${contentType}"`,
        suggestedFixes: [{ field: "contentType", issue: unsupportedError.message, suggestion: "Use a supported content type", autoFixable: false }],
      },
      artifactsGenerated: [],
      previousVersionPreserved: false,
      previousVersionId: null,
      timestamp,
    };
  }

  const { repairedData, repairs } = autoRepairContent(contentType, data);

  const validation = validateForPublish(contentType, repairedData);

  const hasZeroValidItems = checkZeroValidItems(normalized, repairedData);
  if (hasZeroValidItems) {
    validation.errors.push({
      field: "content",
      message: "Content has zero valid items and cannot be published. Add valid content before publishing.",
      severity: "error",
    });
    validation.valid = false;
  }

  const mediaErrors = validateLinkedMediaAssets(repairedData, contentType);
  const accessErrors = validateAccessMetadata(repairedData, contentType);
  const routeErrors = validateRouteGeneration(repairedData, contentType);

  for (const err of [...mediaErrors, ...accessErrors, ...routeErrors]) {
    if (err.severity === "error") {
      validation.errors.push(err);
      validation.valid = false;
    } else {
      validation.warnings.push(err);
    }
  }

  let previousVersionId: string | null = null;
  let previousVersionPreserved = false;

  const existingData = await fetchContentData(contentType, contentId);
  if (existingData && existingData.status === "published") {
    previousVersionId = await preserveLastKnownGood(contentType, contentId, existingData);
    previousVersionPreserved = !!previousVersionId;
  }

  const repairReport = buildRepairReport(validation, repairs);

  let artifactsGenerated: ArtifactSummary[] = [];

  if (validation.valid) {
    try {
      artifactsGenerated = await generateBackupArtifacts(
        contentType,
        contentId,
        previousVersionId,
        repairedData
      );
    } catch (err: any) {
      console.error("[PublishGate] Artifact generation error:", err.message);
    }
  }

  try {
    await pool.query(
      `INSERT INTO publish_validation_logs (id, content_id, content_type, action, passed, errors, warnings, repair_report, previous_version_id, artifacts_generated, actor_id, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [
        contentId,
        normalized,
        validation.valid ? "publish_allowed" : "publish_blocked",
        validation.valid,
        JSON.stringify(validation.errors),
        JSON.stringify(validation.warnings),
        JSON.stringify(repairReport),
        previousVersionId,
        artifactsGenerated.length,
        actorId || null,
      ]
    );
  } catch (err: any) {
    console.error("[PublishGate] Error logging validation:", err.message);
  }

  return {
    allowed: validation.valid,
    contentId,
    contentType: normalized,
    validation,
    repairReport: validation.valid ? null : repairReport,
    artifactsGenerated,
    previousVersionPreserved,
    previousVersionId,
    timestamp,
  };
}

export async function regenerateArtifacts(
  contentType: string,
  contentId: string
): Promise<ArtifactSummary[]> {
  await ensureOnce();

  const data = await fetchContentData(contentType, contentId);
  if (!data) throw new Error(`Content not found: ${contentId}`);

  await pool.query(
    `UPDATE backup_artifacts SET status = 'superseded' WHERE content_id = $1 AND content_type = $2 AND status = 'active'`,
    [contentId, normalizeContentType(contentType)]
  );

  return await generateBackupArtifacts(contentType, contentId, null, data);
}

export function registerPublishGateRoutes(app: Express): void {
  app.post("/api/admin/publish-gate/validate", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { contentType, contentId, data } = req.body;
      if (!contentType || !contentId) {
        return res.status(400).json({ error: "contentType and contentId are required" });
      }

      let contentData = data;
      if (!contentData) {
        contentData = await fetchContentData(contentType, contentId);
        if (!contentData) {
          return res.status(404).json({ error: "Content not found" });
        }
      }

      const result = await runPublishGate(contentType, contentId, contentData, (admin as any).id);
      res.json(result);
    } catch (err: any) {
      console.error("[PublishGate] Validate error:", err.message);
      res.status(500).json({ error: "Publish gate validation failed", details: err.message });
    }
  });

  app.post("/api/admin/publish-gate/publish", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { contentType, contentId, data } = req.body;
      if (!contentType || !contentId) {
        return res.status(400).json({ error: "contentType and contentId are required" });
      }

      let contentData = data;
      if (!contentData) {
        contentData = await fetchContentData(contentType, contentId);
        if (!contentData) {
          return res.status(404).json({ error: "Content not found" });
        }
      }

      const gateResult = await runPublishGate(contentType, contentId, contentData, (admin as any).id);

      if (!gateResult.allowed) {
        return res.status(422).json({
          error: "Publish blocked by validation gate",
          result: gateResult,
        });
      }

      const table = getTableForContentType(contentType);
      if (!table) {
        return res.status(400).json({ error: `Cannot resolve database table for content type "${contentType}"` });
      }

      try {
        await pool.query(
          `UPDATE ${table} SET status = 'published' WHERE id = $1`,
          [contentId]
        );
      } catch (updateErr: any) {
        console.error("[PublishGate] DB update error:", updateErr.message);
        return res.status(500).json({ error: "Failed to update content status", details: updateErr.message });
      }

      try {
        await pool.query(
          `UPDATE ${table} SET published_at = NOW() WHERE id = $1`,
          [contentId]
        );
      } catch {
      }

      res.json({
        published: true,
        result: gateResult,
      });
    } catch (err: any) {
      console.error("[PublishGate] Publish error:", err.message);
      res.status(500).json({ error: "Publish failed", details: err.message });
    }
  });

  app.get("/api/admin/publish-gate/artifacts/:contentId", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await ensureOnce();
      const { contentId } = req.params;
      const result = await pool.query(
        `SELECT id, content_version_id, content_id, content_type, artifact_type, storage_path, checksum, status, metadata, generated_at
         FROM backup_artifacts
         WHERE content_id = $1
         ORDER BY generated_at DESC
         LIMIT 50`,
        [contentId]
      );
      res.json({ contentId, artifacts: result.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/publish-gate/regenerate", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { contentType, contentId } = req.body;
      if (!contentType || !contentId) {
        return res.status(400).json({ error: "contentType and contentId are required" });
      }
      const artifacts = await regenerateArtifacts(contentType, contentId);
      res.json({ regenerated: true, artifacts });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/publish-gate/validation-logs", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await ensureOnce();
      const { contentId, contentType, passed, limit = "50" } = req.query;
      let query = `SELECT * FROM publish_validation_logs WHERE 1=1`;
      const params: any[] = [];
      let paramIdx = 1;

      if (contentId) {
        query += ` AND content_id = $${paramIdx++}`;
        params.push(contentId);
      }
      if (contentType) {
        query += ` AND content_type = $${paramIdx++}`;
        params.push(contentType);
      }
      if (passed !== undefined) {
        query += ` AND passed = $${paramIdx++}`;
        params.push(passed === "true");
      }

      query += ` ORDER BY created_at DESC LIMIT $${paramIdx++}`;
      params.push(parseInt(limit as string) || 50);

      const result = await pool.query(query, params);
      res.json({ logs: result.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/publish-gate/failures", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await ensureOnce();
      const { limit = "50" } = req.query;
      const result = await pool.query(
        `SELECT * FROM publish_validation_logs
         WHERE passed = false
         ORDER BY created_at DESC
         LIMIT $1`,
        [parseInt(limit as string) || 50]
      );
      res.json({ failures: result.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/publish-gate/artifact-status/:contentId", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await ensureOnce();
      const { contentId } = req.params;

      const artifactResult = await pool.query(
        `SELECT artifact_type, status, checksum, generated_at
         FROM backup_artifacts
         WHERE content_id = $1 AND status = 'active'
         ORDER BY generated_at DESC`,
        [contentId]
      );

      const lastValidation = await pool.query(
        `SELECT passed, action, created_at, artifacts_generated
         FROM publish_validation_logs
         WHERE content_id = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [contentId]
      );

      res.json({
        contentId,
        hasActiveArtifacts: artifactResult.rows.length > 0,
        activeArtifacts: artifactResult.rows,
        lastValidation: lastValidation.rows[0] || null,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/publish-gate/quarantine-zero-valid", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const result = await quarantineZeroValidContent();
      res.json(result);
    } catch (err: any) {
      console.error("[PublishGate] Quarantine scan error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
}

async function quarantineZeroValidContent(): Promise<{ quarantined: Array<{ id: string; title: string; type: string }>; count: number }> {
  const quarantined: Array<{ id: string; title: string; type: string }> = [];

  const contentItems = await pool.query(
    `SELECT id, title, type, content FROM content_items WHERE status = 'published'`
  );
  for (const item of contentItems.rows) {
    const content = item.content;
    const isEmpty = content === null || content === undefined ||
      (typeof content === "string" && (content === "[]" || content === "{}" || content === "null" || content.trim().length === 0)) ||
      (Array.isArray(content) && content.length === 0) ||
      (typeof content === "object" && !Array.isArray(content) && Object.keys(content).length === 0);

    if (isEmpty) {
      await pool.query(`UPDATE content_items SET status = 'quarantined' WHERE id = $1`, [item.id]);
      quarantined.push({ id: item.id, title: item.title, type: item.type });
    }
  }

  const examQuestions = await pool.query(
    `SELECT id, stem, tier FROM exam_questions WHERE status = 'published' AND (
      stem IS NULL OR stem = '' OR
      options IS NULL OR options::text = '[]' OR options::text = '{}' OR
      correct_answer IS NULL
    )`
  );
  for (const q of examQuestions.rows) {
    await pool.query(`UPDATE exam_questions SET status = 'quarantined' WHERE id = $1`, [q.id]);
    quarantined.push({ id: q.id, title: q.stem?.substring(0, 60) || "No stem", type: "exam_question" });
  }

  console.log(`[PublishGate] Quarantined ${quarantined.length} zero-valid-items content`);
  return { quarantined, count: quarantined.length };
}

export async function runStartupQuarantine(): Promise<void> {
  try {
    const result = await quarantineZeroValidContent();
    if (result.count > 0) {
      console.log(`[PublishGate] Startup quarantine: removed ${result.count} zero-valid items from public visibility`);
    } else {
      console.log(`[PublishGate] Startup quarantine: no zero-valid items found`);
    }
  } catch (err: any) {
    console.warn(`[PublishGate] Startup quarantine skipped (non-fatal):`, err.message);
  }
}
