import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function beacon(step: string, detail?: string) {
  console.log(`[BOOT] ${step}: ${detail || ""}`);
  try {
    const blob = new Blob([JSON.stringify({ step, detail })], { type: "application/json" });
    navigator.sendBeacon("/api/boot-beacon", blob);
  } catch {}
}

beacon("1", "all imports resolved, module body executing");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

const rootEl = document.getElementById("root");
beacon("2", `root element: ${!!rootEl}`);

try {
  const root = createRoot(rootEl!);
  beacon("3", "createRoot ok");
  root.render(<App />);
  beacon("4", "render called");
} catch (e: any) {
  beacon("FATAL", e?.message);
  console.error("[BOOT] FATAL:", e);
  document.getElementById("root")!.innerHTML =
    '<div style="padding:40px;font-family:sans-serif;color:#333">' +
    '<h1 style="color:#dc2626">NurseNest failed to start</h1>' +
    '<p>Error: ' + (e?.message || "Unknown") + '</p>' +
    '<pre style="background:#f3f4f6;padding:16px;border-radius:8px;overflow:auto;font-size:13px;max-height:300px">' +
    (e?.stack || "") + '</pre>' +
    '<button onclick="location.reload()" style="margin-top:16px;padding:8px 24px;background:#7c3aed;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px">Reload</button></div>';
}
