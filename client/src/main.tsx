import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "next-themes";
import "./index.css";

function RecoveryApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#7c3aed" }}>RECOVERY TEST 2: QueryClient + Theme</h1>
          <p>If you can see this, QueryClientProvider and ThemeProvider work.</p>
          <p>Time: {new Date().toISOString()}</p>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<RecoveryApp />);
(window as any).__reactRendered = true;
