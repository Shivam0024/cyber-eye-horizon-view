
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
import CowrieAttackMap from "./pages/cowrie/CowrieAttackMap";
import SessionAnalysis from "./pages/cowrie/SessionAnalysis";
import AttackerProfile from "./pages/cowrie/AttackerProfile";
import CowrieLogs from "./pages/cowrie/CowrieLogs";

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
          
          {/* Cowrie specific routes */}
          <Route path="/cowrie/attack-map" element={<CowrieAttackMap />} />
          <Route path="/cowrie/session-analysis" element={<SessionAnalysis />} />
          <Route path="/cowrie/attacker-profile" element={<AttackerProfile />} />
          <Route path="/cowrie/logs" element={<CowrieLogs />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
