import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
    <h1 style={{ color: "#7c3aed" }}>NURSENEST RECOVERY TEST</h1>
    <p>If you can see this, the base render pipeline works.</p>
    <p>Time: {new Date().toISOString()}</p>
  </div>
);
(window as any).__reactRendered = true;
