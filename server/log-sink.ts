import fs from "fs";
import path from "path";

let fileStream: fs.WriteStream | null = null;

/**
 * Optional second sink for structured JSON logs (one line per object).
 * - LOG_FILE_PATH: append JSON lines (rotation = external logrotate / platform).
 * - LOG_INGEST_URL + LOG_INGEST_ENABLED=true: fire-and-forget POST per line (generic HTTP ingest).
 */
export function initOptionalLogSinks(): void {
  const fp = process.env.LOG_FILE_PATH?.trim();
  if (fp) {
    try {
      fs.mkdirSync(path.dirname(fp), { recursive: true });
    } catch {
      /* file may be in cwd */
    }
    fileStream = fs.createWriteStream(fp, { flags: "a" });
    console.log(`[LogSink] Writing structured JSON lines to ${fp}`);
  }
}

export function emitStructuredLog(
  payload: Record<string, unknown>,
  stream: "log" | "warn" | "error" | "info" = "log",
): void {
  const line = JSON.stringify(payload);
  if (stream === "error") console.error(line);
  else if (stream === "warn") console.warn(line);
  else console.log(line);

  if (fileStream) {
    try {
      fileStream.write(`${line}\n`);
    } catch (e) {
      console.error("[LogSink] File write failed:", e instanceof Error ? e.message : e);
    }
  }

  const ingest = process.env.LOG_INGEST_URL?.trim();
  if (ingest && String(process.env.LOG_INGEST_ENABLED || "").toLowerCase() === "true") {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(process.env.LOG_INGEST_TOKEN
        ? { Authorization: `Bearer ${process.env.LOG_INGEST_TOKEN}` }
        : {}),
    };
    void fetch(ingest, {
      method: "POST",
      headers,
      body: line,
    }).catch(() => {});
  }
}
