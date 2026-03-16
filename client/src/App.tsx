import { Suspense, Component, type ReactNode, type ErrorInfo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import { CareerProvider } from "@/lib/career-context";
import { SiteImagesProvider } from "@/components/admin-image-overlay";
import { ParamedicRegionProvider } from "@/allied/contexts/paramedic-region-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("React Error Boundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#dc2626" }}>Something went wrong</h1>
          <pre style={{ background: "#f3f4f6", padding: "16px", borderRadius: "8px", overflow: "auto", fontSize: "13px" }}>
            {this.state.error?.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: "16px", padding: "8px 16px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
          <I18nProvider>
            <AuthProvider>
              <CareerProvider>
              <ParamedicRegionProvider>
              <SiteImagesProvider>
                <TooltipProvider>
                  <Toaster />
                  <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
                    <h1 style={{ color: "#7c3aed" }}>RECOVERY TEST 6: All providers, no router</h1>
                    <p>If you can see this, all providers work together.</p>
                    <p>Time: {new Date().toISOString()}</p>
                  </div>
                </TooltipProvider>
              </SiteImagesProvider>
              </ParamedicRegionProvider>
              </CareerProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
