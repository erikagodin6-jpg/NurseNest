import { pool } from "./storage";

export interface AuditEntry {
  actorId: string | null;
  actorUsername: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  beforeState?: any;
  afterState?: any;
  reason?: string;
  severity?: "info" | "warning" | "critical";
  ipAddress?: string;
  userAgent?: string;
}

export async function recordAuditLog(entry: AuditEntry): Promise<string | null> {
  try {
    const result = await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, before_json, after_json, reason, severity, ip_address, user_agent, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING id`,
      [
        entry.actorId,
        entry.actorUsername,
        entry.entityType,
        entry.entityId,
        entry.action,
        entry.beforeState ? JSON.stringify(entry.beforeState) : null,
        entry.afterState ? JSON.stringify(entry.afterState) : null,
        entry.reason || null,
        entry.severity || "info",
        entry.ipAddress || null,
        entry.userAgent || null,
      ]
    );
    return result.rows[0]?.id || null;
  } catch (e) {
    console.error("[OpsAudit] Failed to record audit log:", e);
    return null;
  }
}

export function extractAuditContext(req: any, admin: any): Pick<AuditEntry, "actorId" | "actorUsername" | "ipAddress" | "userAgent"> {
  return {
    actorId: admin?.id || null,
    actorUsername: admin?.username || null,
    ipAddress: req.ip || req.headers?.["x-forwarded-for"] || null,
    userAgent: req.headers?.["user-agent"] || null,
  };
}

export async function auditAction(
  req: any,
  admin: any,
  action: string,
  entityType: string,
  entityId: string | null,
  opts?: { before?: any; after?: any; reason?: string; severity?: "info" | "warning" | "critical" }
): Promise<string | null> {
  const ctx = extractAuditContext(req, admin);
  return recordAuditLog({
    ...ctx,
    action,
    entityType,
    entityId,
    beforeState: opts?.before,
    afterState: opts?.after,
    reason: opts?.reason,
    severity: opts?.severity || "info",
  });
}

export interface AuditQueryFilters {
  action?: string;
  actorId?: string;
  actorUsername?: string;
  entityType?: string;
  entityId?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export async function queryAuditLogs(filters: AuditQueryFilters): Promise<{ logs: any[]; total: number }> {
  const conditions: string[] = [];
  const params: any[] = [];
  let idx = 1;

  if (filters.action) {
    conditions.push(`action = $${idx++}`);
    params.push(filters.action);
  }
  if (filters.actorId) {
    conditions.push(`actor_id = $${idx++}`);
    params.push(filters.actorId);
  }
  if (filters.actorUsername) {
    conditions.push(`actor_username ILIKE $${idx++}`);
    params.push(`%${filters.actorUsername}%`);
  }
  if (filters.entityType) {
    conditions.push(`entity_type = $${idx++}`);
    params.push(filters.entityType);
  }
  if (filters.entityId) {
    conditions.push(`entity_id = $${idx++}`);
    params.push(filters.entityId);
  }
  if (filters.severity) {
    conditions.push(`severity = $${idx++}`);
    params.push(filters.severity);
  }
  if (filters.startDate) {
    conditions.push(`created_at >= $${idx++}`);
    params.push(new Date(filters.startDate));
  }
  if (filters.endDate) {
    conditions.push(`created_at <= $${idx++}`);
    params.push(new Date(filters.endDate));
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = Math.min(Math.max(filters.limit || 50, 1), 500);
  const offset = Math.max(filters.offset || 0, 0);

  try {
    const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM audit_logs ${whereClause}`, params);
    const total = countResult.rows[0]?.total || 0;

    const dataParams = [...params, limit, offset];
    const dataResult = await pool.query(
      `SELECT * FROM audit_logs ${whereClause} ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx++}`,
      dataParams
    );

    return { logs: dataResult.rows, total };
  } catch (e) {
    console.error("[OpsAudit] Failed to query audit logs:", e);
    return { logs: [], total: 0 };
  }
}

export async function getAuditLogActions(): Promise<string[]> {
  try {
    const result = await pool.query(
      `SELECT DISTINCT action FROM audit_logs ORDER BY action`
    );
    return result.rows.map((r: any) => r.action);
  } catch {
    return [];
  }
}

export async function getAuditLogEntityTypes(): Promise<string[]> {
  try {
    const result = await pool.query(
      `SELECT DISTINCT entity_type FROM audit_logs ORDER BY entity_type`
    );
    return result.rows.map((r: any) => r.entity_type);
  } catch {
    return [];
  }
}

export async function exportAuditLogs(filters: AuditQueryFilters): Promise<any[]> {
  const allFilters = { ...filters, limit: 10000, offset: 0 };
  const { logs } = await queryAuditLogs(allFilters);
  return logs;
}
