
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Shield className="h-24 w-24 text-cyber-accent animate-pulse-glow" />
            <div className="absolute inset-0 rounded-full bg-cyber-accent/10 animate-pulse-glow"></div>
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl sm:text-6xl font-bold bg-gradient-to-br from-white via-cyber-foreground to-cyber-accent/70 bg-clip-text text-transparent">
          Dionaea AI Honeypot
        </h1>
        
        <p className="mb-8 text-xl text-cyber-foreground/80 max-w-3xl mx-auto">
          Advanced honeypot platform with real-time attack visualization and AI-powered threat response capabilities.
        </p>
        
        <div className="cyber-data-line mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="cyber-card p-6 text-left relative overflow-hidden group hover:border-cyber-accent/50 transition-colors duration-300">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-accent/5 rounded-full group-hover:bg-cyber-accent/10 transition-colors duration-300"></div>
            <h2 className="text-2xl font-semibold mb-3">Attack Map</h2>
            <p className="mb-4 text-cyber-foreground/70">
              Visualize attack vectors in real-time with interactive parabolic trajectories showing attacker origins.
            </p>
            <Link to="/attack-map">
              <Button className="bg-cyber-accent hover:bg-cyber-accent-hover text-white">
                View Attack Map
              </Button>
            </Link>
          </div>
          
          <div className="cyber-card p-6 text-left relative overflow-hidden group hover:border-cyber-accent/50 transition-colors duration-300">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-accent/5 rounded-full group-hover:bg-cyber-accent/10 transition-colors duration-300"></div>
            <h2 className="text-2xl font-semibold mb-3">Malware Analysis</h2>
            <p className="mb-4 text-cyber-foreground/70">
              Examine captured malware samples with detailed behavior analysis and threat intelligence.
            </p>
            <Link to="/malware-analysis">
              <Button className="bg-cyber-accent hover:bg-cyber-accent-hover text-white">
                Analyze Malware
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="cyber-card p-6 text-left relative overflow-hidden group hover:border-cyber-accent/50 transition-colors duration-300">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-accent/5 rounded-full group-hover:bg-cyber-accent/10 transition-colors duration-300"></div>
            <h2 className="text-2xl font-semibold mb-3">AI Response Monitor</h2>
            <p className="mb-4 text-cyber-foreground/70">
              Monitor how the AI system responds to attackers and what files are presented as honeypot targets.
            </p>
            <Link to="/ai-monitoring">
              <Button className="bg-cyber-accent hover:bg-cyber-accent-hover text-white">
                Monitor AI Responses
              </Button>
            </Link>
          </div>
          
          <div className="cyber-card p-6 text-left relative overflow-hidden group hover:border-cyber-accent/50 transition-colors duration-300">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-accent/5 rounded-full group-hover:bg-cyber-accent/10 transition-colors duration-300"></div>
            <h2 className="text-2xl font-semibold mb-3">Dashboard</h2>
            <p className="mb-4 text-cyber-foreground/70">
              View comprehensive statistics and real-time metrics for your honeypot deployment.
            </p>
            <Link to="/dashboard">
              <Button className="bg-cyber-accent hover:bg-cyber-accent-hover text-white">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
