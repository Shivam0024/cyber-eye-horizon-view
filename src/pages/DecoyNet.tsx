
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttackMap from "@/components/AttackMap";

// Updated honeypot info (removed red references, replaced icons with avatars)
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

// Attacker SVG avatar (dark green-cyber theme)
const AttackerAvatar = () => (
  <span className="inline-flex rounded-full bg-gradient-to-br from-green-700 via-green-800 to-cyber/80 border border-green-600 p-4 shadow-md">
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="17" fill="#172a20" stroke="#3BB273" strokeWidth="3"/>
      <ellipse cx="20" cy="17.5" rx="8" ry="7" fill="#244730"/>
      <ellipse cx="20" cy="16" rx="4.8" ry="4.2" fill="#357960"/>
      <ellipse cx="20" cy="29" rx="8.3" ry="4.8" fill="#244730"/>
      <ellipse cx="20" cy="17" rx="8" ry="7" fill="#244730" fillOpacity="0.2"/>
      <ellipse cx="20" cy="29" rx="8.3" ry="4.8" fill="#1a382d" fillOpacity="0.33"/>
      <ellipse cx="17" cy="16" rx="1.2" ry="1.5" fill="#B6F5C1"/>
      <ellipse cx="23" cy="16" rx="1.2" ry="1.5" fill="#B6F5C1"/>
    </svg>
  </span>
);

const DecoyNet = () => {
  const navigate = useNavigate();

  // Total Connections/Captures
  const totalConnections = HONEYPOTS.reduce((acc, pot) => acc + pot.activeConnections, 0);
  const totalCaptures = HONEYPOTS.reduce((acc, pot) => acc + pot.totalCaptures, 0);

  return (
    <div className="min-h-screen bg-cyber relative">
      <Navbar />

      {/* Subtle cyber background with grid + dark overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyber/90 to-black/95">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="cyber-grid-pattern absolute inset-0"></div>
          <div className="hexagon-pattern absolute inset-0"></div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        {/* Header */}
        <div className="mb-10 p-8 rounded-lg bg-cyber/90 border border-cyber-accent/40 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-extrabold text-green-400 mb-1 tracking-tight">
                DecoyNet
              </h1>
              <h2 className="text-lg font-medium text-cyber-accent tracking-wide">
                Advanced Honeypot Management System
              </h2>
            </div>
            {/* Green attacker avatar */}
            <AttackerAvatar />
          </div>
          <p className="text-cyber-foreground/90 text-lg max-w-3xl mb-2">
            Centralized honeypot management. Gain cyber threat intelligence and visualize attacks in real-time.
          </p>
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-cyber/60 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-2xl font-bold text-green-400">{totalConnections}</div>
              <div className="text-xs text-cyber-foreground/80">Active Connections</div>
            </div>
            <div className="bg-cyber/60 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-2xl font-bold text-cyber-accent">{totalCaptures}</div>
              <div className="text-xs text-cyber-foreground/80">Total Captures</div>
            </div>
            <div className="bg-cyber/60 p-4 rounded-lg border border-cyber-accent/20">
              <div className="text-2xl font-bold text-cyber-accent">{HONEYPOTS.length}</div>
              <div className="text-xs text-cyber-foreground/80">Active Honeypots</div>
            </div>
          </div>
        </div>

        {/* Main content: Attack Map + Honeypots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attack Map */}
          <Card className="col-span-1 bg-cyber/95 shadow-xl border-cyber-accent/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyber-accent text-base font-semibold">
                <span>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10.2" stroke="#4ADE80" strokeWidth="1.6" />
                    <circle cx="11" cy="11" r="6.8" stroke="#22d3ee" strokeWidth="1.4" />
                    <circle cx="11" cy="11" r="1.9" fill="#4ADE80"/>
                  </svg>
                </span>
                Live Global Attack Map
              </CardTitle>
            </CardHeader>
            <CardContent className="px-1 pb-3 pt-1">
              <div className="w-full h-[320px] rounded-lg overflow-hidden">
                <AttackMap />
              </div>
            </CardContent>
          </Card>
          
          {/* Honeypot Cards */}
          <div className="grid grid-cols-1 gap-8">
            <div className="flex gap-8 flex-col sm:flex-row">
              {HONEYPOTS.map((honeypot) => (
                <Card
                  key={honeypot.name}
                  className="cyber-card border border-cyber-accent/25 bg-cyber/70 hover:border-green-500 transition-all duration-300 cursor-pointer group flex-1 min-w-[265px]"
                  onClick={() => navigate(honeypot.route)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      {/* Avatar */}
                      <AttackerAvatar />
                      <span className="text-2xl font-semibold uppercase tracking-wide text-cyber-accent group-hover:text-green-400 transition">
                        {honeypot.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5 text-cyber-foreground/90 font-medium">{honeypot.description}</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cyber/70 p-4 rounded-lg border border-cyber-accent/15">
                        <div className="text-xl font-bold text-green-400">{honeypot.activeConnections}</div>
                        <div className="text-xs text-cyber-foreground/70">Active Connections</div>
                      </div>
                      <div className="bg-cyber/70 p-4 rounded-lg border border-cyber-accent/15">
                        <div className="text-xl font-bold text-cyber-accent">{honeypot.totalCaptures}</div>
                        <div className="text-xs text-cyber-foreground/70">Total Captures</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Minimal cybersecurity pattern for dark mode */}
      <style>
        {`
        .cyber-grid-pattern {
          background-size: 46px 46px;
          background-image: 
            linear-gradient(to right, #3bb27312 1px, transparent 1px),
            linear-gradient(to bottom, #3bb27312 1px, transparent 1px);
        }
        .hexagon-pattern {
          background-color: transparent;
          background-image: 
            repeating-linear-gradient(60deg, #8b5cf60e 0px, #8b5cf60e 2px, transparent 2px, transparent 22px),
            repeating-linear-gradient(-60deg, #22d3ee0e 0px, #22d3ee0e 2px, transparent 2px, transparent 22px);
          opacity: 0.3;
        }
        `}
      </style>
    </div>
  );
};

export default DecoyNet;
