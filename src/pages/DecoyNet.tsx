
import { Shield, Network, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-cyber bg-cybersecurity-bg bg-cover bg-center bg-blend-overlay">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 backdrop-blur-sm p-6 rounded-lg bg-cyber/60 cyber-card">
          <h1 className="text-5xl font-bold text-cyber-accent mb-4">DecoyNet Control Center</h1>
          <p className="text-cyber-foreground/90 text-xl max-w-3xl">
            Your comprehensive honeypot management platform. Monitor and analyze attacks across multiple protocols 
            with advanced threat intelligence and real-time visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HONEYPOTS.map((honeypot) => (
            <Card 
              key={honeypot.name}
              className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl hover:border-cyber-accent/80 transition-all cursor-pointer group backdrop-blur-sm"
              onClick={() => navigate(honeypot.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-cyber-accent/70 p-3 group-hover:bg-cyber-accent/90 transition-colors">
                    {honeypot.type === "malware" ? (
                      <Shield size={28} className="text-cyber-foreground" />
                    ) : (
                      <Network size={28} className="text-cyber-foreground" />
                    )}
                  </span>
                  <span className="text-3xl">{honeypot.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cyber-foreground/90 mb-8 text-lg">
                  {honeypot.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-cyber/30 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-cyber-accent">
                      {honeypot.activeConnections}
                    </div>
                    <div className="text-sm text-cyber-foreground/90">
                      Active Connections
                    </div>
                  </div>
                  <div className="bg-cyber/30 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-cyber-accent">
                      {honeypot.totalCaptures}
                    </div>
                    <div className="text-sm text-cyber-foreground/90">
                      Total Captures
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecoyNet;
