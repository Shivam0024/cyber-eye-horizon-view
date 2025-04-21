
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe, FileText, Code, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration; in a real app, fetch from the backend or context.
const MOCK_ATTACKERS = [
  {
    ip: "193.23.244.244",
    protocol: "HTTP",
    country: "Russia",
    city: "Moscow",
    malware: [
      { name: "WannaCry Variant", type: "Ransomware", timestamp: "2023-04-18T14:32:21" },
      { name: "TeslaCrypt", type: "Ransomware", timestamp: "2023-04-17T22:05:11" },
    ],
    mitreTechniques: [
      { id: "T1190", name: "Exploit Public-Facing Application" },
      { id: "T1021", name: "Remote Services" },
    ],
  },
  {
    ip: "45.23.123.12",
    protocol: "HTTP",
    country: "China",
    city: "Beijing",
    malware: [
      { name: "Mirai Botnet", type: "Botnet", timestamp: "2023-04-18T10:15:43" },
    ],
    mitreTechniques: [
      { id: "T1078", name: "Valid Accounts" },
    ],
  },
];

const AttackerDetailPage = () => {
  const { protocol } = useParams<{ protocol: string }>();
  const navigate = useNavigate();

  // Filter attackers by protocol (case-insensitive)
  const attackers = MOCK_ATTACKERS.filter(a => a.protocol.toLowerCase() === protocol?.toLowerCase());

  return (
    <div className="min-h-screen bg-cyber py-8 px-4 animate-fade-in">
      <div className="container mx-auto">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </Button>
        <h2 className="text-3xl font-bold mb-6 text-cyber-accent">
          {protocol} Attacker Details
        </h2>
        {attackers.length === 0 ? (
          <div className="bg-cyber border-l-4 border-cyber-accent p-6 rounded shadow">
            <p className="text-lg">No attacker data for this protocol.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {attackers.map((attacker, idx) => (
              <Card key={attacker.ip} className="cyber-card border-cyber-border/50 relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin size={18} className="text-cyber-accent" />
                    <span>{attacker.ip}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-cyber-foreground/70" />
                    <span className="text-sm">{attacker.country}, {attacker.city}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-cyber-foreground/70 font-semibold">Malware Uploaded:</span>
                    <ul className="mt-1 space-y-1">
                      {attacker.malware.map((m, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <FileText size={15} className="mr-1 text-cyber-warning" />
                          <span className="font-semibold">{m.name}</span>
                          <span className="mx-2 opacity-70 text-xs">{m.type}</span>
                          <span className="opacity-50 text-xs">{new Date(m.timestamp).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2 flex items-center">
                    <Code size={16} className="mr-1 text-cyber-accent" />
                    <span className="text-xs font-semibold text-cyber-foreground/70">MITRE Techniques:</span>
                    <div className="ml-2 flex flex-wrap gap-2">
                      {attacker.mitreTechniques.map(t => (
                        <span key={t.id} className="px-2 py-0.5 bg-cyber-accent/20 text-cyber-accent rounded text-xs font-mono">
                          {t.id} {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackerDetailPage;
