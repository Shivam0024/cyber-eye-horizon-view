
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
    <div className="min-h-screen bg-black bg-cybersecurity-bg bg-cover bg-center bg-blend-overlay relative">
      <Navbar />
      
      {/* Dark overlay with hex pattern */}
      <div className="absolute inset-0 z-0 bg-black/95">
        {/* Use uploaded asset as background right */}
        <img
          src="/lovable-uploads/6fb19f3c-713b-4a29-a01e-a3504060305e.png"
          alt="DecoyNet Hex Badges"
          className="absolute top-0 right-0 w-[460px] max-w-[50vw] h-auto pointer-events-none opacity-80"
        />
        
        {/* Visual hex "honeycomb" pattern (left & bottom) */}
        <div className="absolute left-0 bottom-0 w-full h-1/3 hexagon-bg-pattern" 
             style={{pointerEvents: 'none', zIndex: 2}}></div>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        {/* Main header */}
        <div className="mb-12 p-8 rounded-lg bg-black/80 border-2 border-cyber-accent/30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-7xl font-extrabold text-cyber-accent mb-2 tracking-tight drop-shadow-xl">
                DecoyNet
              </h1>
              <h2 className="text-xl font-semibold text-pink-400 tracking-wider">
                Advanced Honeypot Management System
              </h2>
            </div>
            <Shield className="h-24 w-24 text-cyber-accent opacity-80" />
          </div>
          
          <p className="text-cyber-foreground/90 text-lg max-w-3xl mb-4">
            Your comprehensive honeypot management platform. Monitor and analyze attacks across 
            multiple protocols with advanced threat intelligence and real-time visualization.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-cyber/30 to-black p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-3xl font-bold text-cyber-accent mb-1">{HONEYPOTS.reduce((acc, pot) => acc + pot.activeConnections, 0)}</div>
              <div className="text-sm text-cyber-foreground/80">Active Connections</div>
            </div>
            <div className="bg-gradient-to-br from-cyber/30 to-black p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-3xl font-bold text-cyber-accent mb-1">{HONEYPOTS.reduce((acc, pot) => acc + pot.totalCaptures, 0)}</div>
              <div className="text-sm text-cyber-foreground/80">Total Captures</div>
            </div>
            <div className="bg-gradient-to-br from-cyber/30 to-black p-4 rounded-lg border border-cyber-accent/20">
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
              className="cyber-card border-2 border-pink-700/80 bg-black/70 shadow-2xl hover:border-cyber-accent transition-all duration-300 cursor-pointer group backdrop-blur-md"
              onClick={() => navigate(honeypot.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <span className="inline-flex rounded-full bg-cyber-accent/80 border-2 border-pink-400/80 p-5 group-hover:bg-cyber-accent transition-colors">
                    {honeypot.name === "Dionaea" ? (
                      <Shield className="h-12 w-12 text-white" />
                    ) : (
                      <Terminal className="h-12 w-12 text-white" />
                    )}
                  </span>
                  <span className="text-4xl font-black uppercase tracking-widest bg-gradient-to-tr from-cyber-accent via-pink-400 to-white bg-clip-text text-transparent drop-shadow-md">
                    {honeypot.name}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-cyber-foreground/90 mb-7 text-lg font-medium">
                  {honeypot.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-800/60 to-cyber/40 p-6 rounded-lg border border-pink-600/30">
                    <div className="text-4xl font-bold text-pink-300 drop-shadow">{honeypot.activeConnections}</div>
                    <div className="text-base text-cyber-foreground/80 font-semibold">
                      Active Connections
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyber-accent/40 to-black p-6 rounded-lg border border-cyber-accent/30">
                    <div className="text-4xl font-bold text-cyber-accent drop-shadow">{honeypot.totalCaptures}</div>
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
      
      {/* SVG/CSS hex pattern background */}
      <style>
        {`
        .hexagon-bg-pattern {
          background: 
            repeating-linear-gradient(
              120deg,
              rgba(249, 115, 255, 0.12) 0px, 
              rgba(249, 115, 255, 0.12) 10px, 
              transparent 10px, 
              transparent 26px
            ),
            repeating-linear-gradient(
              60deg, 
              rgba(168, 85, 247,0.15) 0px,
              rgba(168, 85, 247,0.19) 15px,
              transparent 0, 
              transparent 40px
            );
          background-size: 96px 56px;
        }
        
        .cyber-pulse {
          animation: pulse 2s infinite;
          box-shadow: 0 0 0 0 rgba(234, 56, 76, 0.7);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(234, 56, 76, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(234, 56, 76, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(234, 56, 76, 0);
          }
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
