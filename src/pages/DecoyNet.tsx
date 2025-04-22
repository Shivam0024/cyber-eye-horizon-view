
import { Shield, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

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
    route: "/dashboard"
  },
  {
    name: "HTTP",
    description: "Web application honeypot for detecting web-based attacks",
    activeConnections: 18,
    totalCaptures: 723,
    type: "web",
    route: "/dashboard"
  }
];

const DecoyNet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyber-accent mb-2">DecoyNet Dashboard</h1>
          <p className="text-cyber-foreground/70 text-lg">
            Monitor and manage your network of honeypots from a centralized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HONEYPOTS.map((honeypot) => (
            <Card 
              key={honeypot.name}
              className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl hover:border-cyber-accent/80 transition-all cursor-pointer group"
              onClick={() => navigate(honeypot.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-cyber-accent/70 p-2 group-hover:bg-cyber-accent/90 transition-colors">
                    {honeypot.type === "malware" ? (
                      <Shield size={24} className="text-cyber-foreground" />
                    ) : (
                      <Network size={24} className="text-cyber-foreground" />
                    )}
                  </span>
                  <span className="text-2xl">{honeypot.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cyber-foreground/70 mb-6">
                  {honeypot.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cyber/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-cyber-accent">
                      {honeypot.activeConnections}
                    </div>
                    <div className="text-sm text-cyber-foreground/70">
                      Active Connections
                    </div>
                  </div>
                  <div className="bg-cyber/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-cyber-accent">
                      {honeypot.totalCaptures}
                    </div>
                    <div className="text-sm text-cyber-foreground/70">
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
