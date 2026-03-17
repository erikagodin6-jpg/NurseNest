import { pool } from "./storage";
import { runContentScan, type ScanResult, type ScanIssue } from "./content-integrity-scanner";
import { runBatchRepair } from "./content-integrity-repair";

let lightweightInterval: ReturnType<typeof setInterval> | null = null;
let deepScanInterval: ReturnType<typeof setInterval> | null = null;
let isRunning = false;

export async function createScanRun(scanType: string, contentTypes?: string[], tiers?: string[]): Promise<string> {
  const result = await pool.query(
    `INSERT INTO integrity_scan_runs (id, scan_type, status, content_types, tiers, started_at, created_at)
     VALUES (gen_random_uuid(), $1, 'processing', $2, $3, NOW(), NOW()) RETURNING id`,
    [scanType, contentTypes || [], tiers || []]
  );
  return result.rows[0].id;
}

export async function completeScanRun(scanRunId: string, scanResult: ScanResult, error?: string) {
  try {
    await pool.query(
      `UPDATE integrity_scan_runs SET
        status = $1, total_records = $2, scanned_records = $3, issues_found = $4,
        issues_by_severity = $5, issues_by_type = $6, auto_fixable = $7,
        error = $8, completed_at = NOW()
       WHERE id = $9`,
      [
        error ? "failed" : "completed",
        scanResult.totalRecords, scanResult.scannedRecords, scanResult.issues.length,
        JSON.stringify(scanResult.issuesBySeverity), JSON.stringify(scanResult.issuesByType),
        scanResult.autoFixable, error || null, scanRunId
      ]
    );
  } catch (err: any) {
    console.error("[IntegrityJobs] Failed to update scan run:", err.message);
  }
}

export async function persistScanIssues(scanRunId: string, issues: ScanIssue[]) {
  const BATCH = 100;
  for (let i = 0; i < issues.length; i += BATCH) {
    const batch = issues.slice(i, i + BATCH);
    const values: string[] = [];
    const params: any[] = [];
    let paramIdx = 1;

    for (const issue of batch) {
      values.push(`(gen_random_uuid(), $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, NOW())`);
      params.push(
        scanRunId, issue.contentType, issue.contentId, issue.contentTitle, issue.tier,
        issue.issueType, issue.severity, issue.description, issue.field, issue.currentValue,
        issue.autoFixable
      );
    }

    try {
      await pool.query(
        `INSERT INTO content_health_records (id, scan_run_id, content_type, content_id, content_title, tier,
          issue_type, severity, description, field, current_value, auto_fixable, detected_at)
         VALUES ${values.join(", ")}`,
        params
      );
    } catch (err: any) {
      console.error("[IntegrityJobs] Failed to persist scan issues batch:", err.message);
    }
  }
}

export async function routeToManualReview(scanRunId: string, issues: ScanIssue[]) {
  const manualIssues = issues.filter(i => !i.autoFixable && (i.severity === "critical" || i.severity === "high"));
  const BATCH = 50;

  for (let i = 0; i < manualIssues.length; i += BATCH) {
    const batch = manualIssues.slice(i, i + BATCH);
    const values: string[] = [];
    const params: any[] = [];
    let paramIdx = 1;

    for (const issue of batch) {
      values.push(`(gen_random_uuid(), $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, 'pending', NOW())`);
      params.push(
        scanRunId, issue.contentType, issue.contentId, issue.contentTitle,
        issue.issueType, issue.severity, issue.description
      );
    }

    try {
      await pool.query(
        `INSERT INTO manual_review_queue (id, scan_run_id, content_type, content_id, content_title,
          issue_type, severity, description, status, created_at)
         VALUES ${values.join(", ")}
         ON CONFLICT DO NOTHING`,
        params
      );
    } catch (err: any) {
      console.error("[IntegrityJobs] Failed to route to manual review:", err.message);
    }
  }
}

export async function runLightweightScan(contentTypes?: string[], tiers?: string[]): Promise<{ scanRunId: string; summary: any }> {
  if (isRunning) {
    return { scanRunId: "", summary: { skipped: true, reason: "Scan already in progress" } };
  }
  isRunning = true;

  const scanContentTypes = contentTypes || ["questions", "flashcards", "lessons"];
  let scanRunId = "";
  try {
    scanRunId = await createScanRun("lightweight", scanContentTypes, tiers);
    const scanResult = await runContentScan("lightweight", scanContentTypes, tiers);
    await persistScanIssues(scanRunId, scanResult.issues);
    await routeToManualReview(scanRunId, scanResult.issues);
    await completeScanRun(scanRunId, scanResult);

    return {
      scanRunId,
      summary: {
        totalRecords: scanResult.totalRecords,
        issuesFound: scanResult.issues.length,
        issuesBySeverity: scanResult.issuesBySeverity,
        autoFixable: scanResult.autoFixable,
        perTierScores: scanResult.perTierScores,
        perTypeScores: scanResult.perTypeScores,
      }
    };
  } catch (err: any) {
    console.error("[IntegrityJobs] Lightweight scan failed:", err.message);
    if (scanRunId) {
      await completeScanRun(scanRunId, { issues: [], totalRecords: 0, scannedRecords: 0, issuesBySeverity: {}, issuesByType: {}, autoFixable: 0, perTierScores: {}, perTypeScores: {} }, err.message);
    }
    return { scanRunId, summary: { error: err.message } };
  } finally {
    isRunning = false;
  }
}

export async function runDeepScan(contentTypes?: string[], tiers?: string[]): Promise<{ scanRunId: string; summary: any }> {
  if (isRunning) {
    return { scanRunId: "", summary: { skipped: true, reason: "Scan already in progress" } };
  }
  isRunning = true;

  const scanContentTypes = contentTypes || ["questions", "flashcards", "lessons", "blogs", "media"];
  let scanRunId = "";
  try {
    scanRunId = await createScanRun("deep", scanContentTypes, tiers);
    const scanResult = await runContentScan("deep", scanContentTypes, tiers);
    await persistScanIssues(scanRunId, scanResult.issues);
    await routeToManualReview(scanRunId, scanResult.issues);
    await completeScanRun(scanRunId, scanResult);

    return {
      scanRunId,
      summary: {
        totalRecords: scanResult.totalRecords,
        issuesFound: scanResult.issues.length,
        issuesBySeverity: scanResult.issuesBySeverity,
        issuesByType: scanResult.issuesByType,
        autoFixable: scanResult.autoFixable,
        perTierScores: scanResult.perTierScores,
        perTypeScores: scanResult.perTypeScores,
      }
    };
  } catch (err: any) {
    console.error("[IntegrityJobs] Deep scan failed:", err.message);
    if (scanRunId) {
      await completeScanRun(scanRunId, { issues: [], totalRecords: 0, scannedRecords: 0, issuesBySeverity: {}, issuesByType: {}, autoFixable: 0, perTierScores: {}, perTypeScores: {} }, err.message);
    }
    return { scanRunId, summary: { error: err.message } };
  } finally {
    isRunning = false;
  }
}

export async function runScanAndRepair(mode: "lightweight" | "deep" = "deep", repairTypes?: string[], batchSize?: number): Promise<{ scanRunId: string; scanSummary: any; repairResults: any }> {
  const scanResult = mode === "deep" ? await runDeepScan() : await runLightweightScan();
  let repairResults = {};

  if (scanResult.summary.autoFixable > 0 || (repairTypes && repairTypes.length > 0)) {
    try {
      repairResults = await runBatchRepair(scanResult.scanRunId, repairTypes, batchSize || 50);

      let repairsAttempted = 0;
      let repairsSucceeded = 0;
      for (const [, result] of Object.entries(repairResults as Record<string, any>)) {
        repairsAttempted += (result.repaired || 0) + (result.failed || 0);
        repairsSucceeded += result.repaired || 0;
      }

      if (scanResult.scanRunId) {
        await pool.query(
          `UPDATE integrity_scan_runs SET repairs_attempted = $1, repairs_succeeded = $2 WHERE id = $3`,
          [repairsAttempted, repairsSucceeded, scanResult.scanRunId]
        );
      }
    } catch (err: any) {
      console.error("[IntegrityJobs] Repair phase failed:", err.message);
    }
  }

  return { scanRunId: scanResult.scanRunId, scanSummary: scanResult.summary, repairResults };
}

export function startScheduledJobs() {
  if (lightweightInterval) clearInterval(lightweightInterval);
  if (deepScanInterval) clearInterval(deepScanInterval);

  lightweightInterval = setInterval(async () => {
    console.log("[IntegrityJobs] Running scheduled lightweight scan...");
    try {
      await runLightweightScan();
    } catch (err: any) {
      console.error("[IntegrityJobs] Scheduled lightweight scan error:", err.message);
    }
  }, 60 * 60 * 1000);

  deepScanInterval = setInterval(async () => {
    const hour = new Date().getHours();
    if (hour >= 2 && hour <= 5) {
      console.log("[IntegrityJobs] Running scheduled nightly deep scan...");
      try {
        await runScanAndRepair("deep");
      } catch (err: any) {
        console.error("[IntegrityJobs] Scheduled deep scan error:", err.message);
      }
    }
  }, 4 * 60 * 60 * 1000);

  console.log("[IntegrityJobs] Scheduled jobs started: lightweight=hourly, deep=nightly");
}

export function stopScheduledJobs() {
  if (lightweightInterval) { clearInterval(lightweightInterval); lightweightInterval = null; }
  if (deepScanInterval) { clearInterval(deepScanInterval); deepScanInterval = null; }
  console.log("[IntegrityJobs] Scheduled jobs stopped");
}

export function getJobStatus(): { lightweightRunning: boolean; deepScanRunning: boolean; isProcessing: boolean } {
  return {
    lightweightRunning: lightweightInterval !== null,
    deepScanRunning: deepScanInterval !== null,
    isProcessing: isRunning,
  };
}
