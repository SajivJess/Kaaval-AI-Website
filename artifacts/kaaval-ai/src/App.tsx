import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SpotlightCursor from "@/components/SpotlightCursor";
import FloatingBottomNav from "@/components/FloatingBottomNav";

const queryClient = new QueryClient();

function VhFix() {
  // Fix 100vh on mobile browsers where address bar changes viewport height
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh, { passive: true });
    return () => window.removeEventListener("resize", setVh);
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <VhFix />
          {/* Global floating grid — atmospheric depth (desktop only via CSS) */}
          <div className="floating-grid" aria-hidden="true" />
          {/* Global spotlight cursor — auto-disabled on touch */}
          <SpotlightCursor />
          {/* Floating bottom nav — mobile only, appears after hero */}
          <FloatingBottomNav />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
