
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-cyber bg-cybersecurity-bg bg-cover bg-center bg-blend-overlay relative">
      <Navbar />
      {/* Hex-inspired hero graphic */}
      <div className="absolute inset-0 z-0 bg-black/95">
        {/* Use uploaded asset as background right */}
        <img
          src="/lovable-uploads/6fb19f3c-713b-4a29-a01e-a3504060305e.png"
          alt="DecoyNet Hex Badges"
          className="absolute top-0 right-0 w-[460px] max-w-[50vw] h-auto pointer-events-none opacity-80"
        />
        {/* Visual hex "honeycomb" pattern (left & bottom) */}
        <div className="absolute left-0 bottom-0 w-full h-1/3 hexagon-bg-pattern" style={{pointerEvents: 'none', zIndex: 2}}></div>
      </div>

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="mb-10 p-8 rounded-lg bg-cyber/70 cyber-card border-0 shadow-2xl backdrop-blur-md flex flex-col items-start">
          <h1 className="text-6xl font-extrabold text-cyber-accent mb-2 tracking-tight drop-shadow-xl">DecoyNet</h1>
          <h2 className="text-2xl font-semibold text-pink-400 mb-1 tracking-wider">A Honeynet Platform</h2>
          <p className="text-cyber-foreground/90 text-lg max-w-3xl mb-2">
            Your comprehensive honeypot management platform. Monitor and analyze attacks across multiple protocols
            with advanced threat intelligence and real-time visualization.
          </p>
          <div className="w-full mt-2 border-t border-cyber-border/30" />
        </div>

        {/* Two large cards, one for each honeypot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HONEYPOTS.map((honeypot) => (
            <Card 
              key={honeypot.name}
              className="cyber-card border-2 border-pink-700 bg-black/50 shadow-2xl hover:border-cyber-accent/90 transition-all cursor-pointer group backdrop-blur-md"
              onClick={() => navigate(honeypot.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <span className="inline-flex rounded-full bg-cyber-accent/80 border-2 border-pink-400 p-5 group-hover:bg-cyber-accent/90 transition-colors">
                    {/* Branded icon */}
                    <img
                      src="/lovable-uploads/6fb19f3c-713b-4a29-a01e-a3504060305e.png"
                      alt="Honeypot Logo"
                      className="h-12 w-12 object-contain"
                      style={{ filter: honeypot.name === "Dionaea" ? "grayscale(0)" : "grayscale(60%) brightness(1.35)" }}
                    />
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
                  <div className="bg-gradient-to-br from-pink-800/60 to-cyber/40 p-6 rounded-lg">
                    <div className="text-4xl font-bold text-pink-300 drop-shadow">{honeypot.activeConnections}</div>
                    <div className="text-base text-cyber-foreground/80 font-semibold">
                      Active Connections
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-cyber-accent/40 to-black p-6 rounded-lg">
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
        `}
      </style>
    </div>
  );
};

export default DecoyNet;
