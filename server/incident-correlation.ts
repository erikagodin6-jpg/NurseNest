import { pool } from "./storage";

export interface CorrelatedChange {
  id: string;
  changeType: string;
  source: string;
  entityType: string | null;
  entityId: string | null;
  description: string;
  metadata: Record<string, any>;
  changedBy: string | null;
  createdAt: string;
  recencyScore: number;
  relevanceScore: number;
  confidenceScore: number;
}

const CHANGE_TYPE_RELEVANCE: Record<string, number> = {
  deploy: 0.95,
  emergency_mode: 0.95,
  kill_switch_change: 0.9,
  feature_flag_toggle: 0.85,
  circuit_breaker_trip: 0.85,
  feature_auto_disabled: 0.8,
  config_change: 0.75,
  content_publish: 0.6,
  schema_change: 0.7,
  admin_override: 0.7,
  entitlement_change: 0.65,
  billing_config_change: 0.6,
  resilience_event: 0.5,
};

export async function correlateChanges(
  incidentStartTime: Date,
  lookbackMinutes: number = 120,
  impactedFeatures?: string[]
): Promise<CorrelatedChange[]> {
  const lookbackTime = new Date(incidentStartTime.getTime() - lookbackMinutes * 60 * 1000);

  try {
    const result = await pool.query(
      `SELECT * FROM change_log
       WHERE created_at >= $1 AND created_at <= $2
       ORDER BY created_at DESC
       LIMIT 100`,
      [lookbackTime, incidentStartTime]
    );

    const changes: CorrelatedChange[] = result.rows.map((row: any) => {
      const minutesBefore = (incidentStartTime.getTime() - new Date(row.created_at).getTime()) / 60000;
      const recencyScore = Math.max(0, 1 - (minutesBefore / lookbackMinutes));

      const baseRelevance = CHANGE_TYPE_RELEVANCE[row.change_type] || 0.3;

      let featureBonus = 0;
      if (impactedFeatures && impactedFeatures.length > 0) {
        let parsedMeta: Record<string, any> = {};
        try {
          parsedMeta = typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {});
        } catch { parsedMeta = {}; }
        const changeFeatures = [
          parsedMeta.feature,
          parsedMeta.route,
          parsedMeta.target,
          row.entity_type,
          row.source,
        ].filter(Boolean).map((f: string) => f.toLowerCase());

        for (const impacted of impactedFeatures) {
          if (changeFeatures.some((cf: string) => cf.includes(impacted.toLowerCase()) || impacted.toLowerCase().includes(cf))) {
            featureBonus = 0.15;
            break;
          }
        }
      }

      const relevanceScore = Math.min(1, baseRelevance + featureBonus);
      const confidenceScore = Math.round((recencyScore * 0.4 + relevanceScore * 0.6) * 100);

      let metadata: Record<string, any> = {};
      try {
        metadata = typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {});
      } catch { metadata = {}; }

      return {
        id: row.id,
        changeType: row.change_type,
        source: row.source,
        entityType: row.entity_type,
        entityId: row.entity_id,
        description: row.description,
        metadata,
        changedBy: row.changed_by,
        createdAt: new Date(row.created_at).toISOString(),
        recencyScore: Math.round(recencyScore * 100),
        relevanceScore: Math.round(relevanceScore * 100),
        confidenceScore,
      };
    });

    changes.sort((a, b) => b.confidenceScore - a.confidenceScore);

    return changes;
  } catch (e: any) {
    console.error("[Correlation] Failed to correlate changes:", e.message);
    return [];
  }
}

export async function logChange(params: {
  changeType: string;
  source: string;
  entityType?: string;
  entityId?: string;
  description: string;
  metadata?: Record<string, any>;
  changedBy?: string;
}): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO change_log (change_type, source, entity_type, entity_id, description, metadata, changed_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        params.changeType,
        params.source,
        params.entityType || null,
        params.entityId || null,
        params.description,
        JSON.stringify(params.metadata || {}),
        params.changedBy || null,
      ]
    );
  } catch (e: any) {
    console.error("[ChangeLog] Failed to log change:", e.message);
  }
}

export async function getRecentChanges(limit: number = 50): Promise<any[]> {
  try {
    const result = await pool.query(
      `SELECT * FROM change_log ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    return result.rows.map(mapChangeRow);
  } catch {
    return [];
  }
}

function mapChangeRow(row: any) {
  let metadata: Record<string, any> = {};
  try {
    metadata = typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {});
  } catch { metadata = {}; }
  return {
    id: row.id,
    changeType: row.change_type,
    source: row.source,
    entityType: row.entity_type,
    entityId: row.entity_id,
    description: row.description,
    metadata,
    changedBy: row.changed_by,
    createdAt: new Date(row.created_at).toISOString(),
  };
}
