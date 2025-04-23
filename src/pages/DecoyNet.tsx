
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Terminal } from "lucide-react";

// Updated honeypot info
const HONEYPOTS = [
  {
    name: "Dionaea",
    description: "A low-interaction honeypot designed to trap malware samples",
    activeConnections: 24,
    totalCaptures: 1458,
    type: "malware",
    route: "/dashboard"
  },
  {
    name: "Cowrie",
    description: "Medium to high-interaction SSH/Telnet honeypot",
    activeConnections: 12,
    totalCaptures: 856,
    type: "ssh",
    route: "/cowrie-dashboard"
  }
];

const DecoyNet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber relative">
      <Navbar />
      
      {/* Dark overlay with cybersecurity-themed patterns */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyber/80 to-black/95">
        <div className="absolute inset-0 opacity-10">
          <div className="cyber-grid-pattern absolute inset-0"></div>
          <div className="hexagon-pattern absolute inset-0"></div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        {/* Main header */}
        <div className="mb-12 p-8 rounded-lg bg-cyber/90 border border-cyber-accent/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-6xl font-extrabold text-cyber-accent mb-2 tracking-tight">
                DecoyNet
              </h1>
              <h2 className="text-xl font-semibold text-pink-400 tracking-wider">
                Advanced Honeypot Management System
              </h2>
            </div>
            <Shield className="h-20 w-20 text-cyber-accent opacity-80" />
          </div>
          
          <p className="text-cyber-foreground/90 text-lg max-w-3xl mb-4">
            Your comprehensive honeypot management platform. Monitor and analyze attacks across 
            multiple protocols with advanced threat intelligence and real-time visualization.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-cyber/40 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-3xl font-bold text-cyber-accent mb-1">{HONEYPOTS.reduce((acc, pot) => acc + pot.activeConnections, 0)}</div>
              <div className="text-sm text-cyber-foreground/80">Active Connections</div>
            </div>
            <div className="bg-cyber/40 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-3xl font-bold text-cyber-accent mb-1">{HONEYPOTS.reduce((acc, pot) => acc + pot.totalCaptures, 0)}</div>
              <div className="text-sm text-cyber-foreground/80">Total Captures</div>
            </div>
            <div className="bg-cyber/40 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-3xl font-bold text-cyber-accent mb-1">2</div>
              <div className="text-sm text-cyber-foreground/80">Active Honeypots</div>
            </div>
          </div>
        </div>

        {/* Honeypot cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HONEYPOTS.map((honeypot) => (
            <Card 
              key={honeypot.name}
              className="cyber-card border border-cyber-accent/30 bg-cyber/40 shadow-lg hover:border-cyber-accent transition-all duration-300 cursor-pointer group backdrop-blur-sm"
              onClick={() => navigate(honeypot.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <span className="inline-flex rounded-full bg-cyber-accent/80 border border-pink-400/80 p-4 group-hover:bg-cyber-accent transition-colors">
                    {honeypot.name === "Dionaea" ? (
                      <Shield className="h-10 w-10 text-white" />
                    ) : (
                      <Terminal className="h-10 w-10 text-white" />
                    )}
                  </span>
                  <span className="text-3xl font-bold uppercase tracking-wider text-cyber-accent group-hover:text-white transition-colors">
                    {honeypot.name}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-cyber-foreground/90 mb-7 text-lg font-medium">
                  {honeypot.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-cyber/50 p-6 rounded-lg border border-pink-600/20">
                    <div className="text-3xl font-bold text-pink-300">{honeypot.activeConnections}</div>
                    <div className="text-base text-cyber-foreground/80 font-semibold">
                      Active Connections
                    </div>
                  </div>
                  
                  <div className="bg-cyber/50 p-6 rounded-lg border border-cyber-accent/20">
                    <div className="text-3xl font-bold text-cyber-accent">{honeypot.totalCaptures}</div>
                    <div className="text-base text-cyber-foreground/80 font-semibold">
                      Total Captures
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Cybersecurity-themed background styles */}
      <style>
        {`
        .cyber-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
        }
        
        .hexagon-pattern {
          background-color: transparent;
          background-image: 
            repeating-linear-gradient(60deg, rgba(139, 92, 246, 0.08) 0px, rgba(139, 92, 246, 0.08) 2px, transparent 2px, transparent 20px),
            repeating-linear-gradient(-60deg, rgba(139, 92, 246, 0.08) 0px, rgba(139, 92, 246, 0.08) 2px, transparent 2px, transparent 20px);
          opacity: 0.4;
        }
        
        .dense-cyber-pulse {
          animation: densePulse 0.8s infinite linear;
          box-shadow: 0 0 0 0 rgba(234,56,76,0.95), 0 0 15px 5px rgba(234,56,76,0.65);
        }
        
        .animate-vigorous-ping {
          animation: vigorousPing 0.8s cubic-bezier(0,0,.2,1) infinite;
        }
        
        @keyframes densePulse {
          0% { box-shadow: 0 0 0 0 rgba(234,56,76,0.85), 0 0 12px 5px rgba(234,56,76,0.7); }
          50% { box-shadow: 0 0 0 12px rgba(234,56,76,0.2), 0 0 24px 12px rgba(234,56,76,0.25);}
          100% { box-shadow: 0 0 0 0 rgba(234,56,76,0.85), 0 0 14px 7px rgba(234,56,76,0.7);}
        }
        
        @keyframes vigorousPing {
          0% { transform: scale(1); opacity: 1;}
          60% { transform: scale(1.5); opacity: .6;}
          80% { transform: scale(1.7); opacity: .4;}
          100% { transform: scale(2); opacity: 0;}
        }
        `}
      </style>
    </div>
  );
};

export default DecoyNet;
