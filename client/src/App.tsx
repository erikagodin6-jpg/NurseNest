import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Lessons from "@/pages/lessons";
import LessonDetail from "@/pages/lesson-detail";
import Flashcards from "@/pages/flashcards";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/lessons/:id" component={LessonDetail} />
      <Route path="/flashcards" component={Flashcards} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="data-theme" defaultTheme="lavender" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const client = queryClient;

export default App;