
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AttackMap from "./pages/AttackMap";
import MalwareAnalysis from "./pages/MalwareAnalysis";
import AIMonitoring from "./pages/AIMonitoring";
import NotFound from "./pages/NotFound";
import AttackerDetail from "./pages/AttackerDetail";
import DecoyNet from "./pages/DecoyNet";
import CowrieDashboard from "./pages/CowrieDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DecoyNet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cowrie-dashboard" element={<CowrieDashboard />} />
          <Route path="/attack-map" element={<AttackMap />} />
          <Route path="/malware-analysis" element={<MalwareAnalysis />} />
          <Route path="/ai-monitoring" element={<AIMonitoring />} />
          <Route path="/attacker/:protocol" element={<AttackerDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
