
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MapPin, Globe, FileText, Code, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data similar to what we would expect for an attacker
const MOCK_ATTACKER = {
  ip: "192.168.1.105",
  country: "China",
  city: "Beijing",
  asn: "AS4134 China Telecom",
  firstSeen: "2025-04-16",
  lastSeen: "2025-04-22",
  sessions: 4,
  malware: [
    { name: "WannaCry Variant", type: "Ransomware", timestamp: "2025-04-18T14:32:21" },
    { name: "TeslaCrypt", type: "Ransomware", timestamp: "2025-04-17T22:05:11" },
  ],
  mitreTechniques: [
    { id: "T1190", name: "Exploit Public-Facing Application" },
    { id: "T1021", name: "Remote Services" },
  ],
};

const MALWARE_COLORS = ["#8B5CF6", "#F97316", "#ea384c", "#0EA5E9", "#10B981"];

const AttackerProfileDetail = () => {
  const { ip } = useParams<{ ip: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get attacker data from location state or use mock data
  const attacker = location.state?.attacker || 
    {...MOCK_ATTACKER, ip: ip || MOCK_ATTACKER.ip};

  const malwareTypeData: { name: string; value: number }[] = [];
  const counter: Record<string, number> = {};
  
  attacker.malware?.forEach((m: any) => {
    counter[m.type] = (counter[m.type] || 0) + 1;
  });
  
  Object.entries(counter).forEach(([name, value]) => {
    malwareTypeData.push({ name, value });
  });

  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-5 w-fit bg-cyber-muted/40 shadow"
          onClick={() => navigate("/cowrie/attacker-profile")}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Attackers List
        </Button>
        
        <h2 className="text-4xl font-bold mb-2 text-cyber-accent">Attacker Profile</h2>
        <p className="mb-8 text-cyber-foreground/70 text-lg">
          Detailed information about attacker {ip}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <span className="inline-flex rounded-full bg-cyber-accent/70 p-2">
                  <MapPin size={22} className="text-cyber-foreground" />
                </span>
                <span>{attacker.ip}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-cyber-foreground/70" />
                    <span className="text-lg">
                      {attacker.country}, {attacker.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-cyber-foreground/70" />
                    <span className="text-lg">
                      ASN: {attacker.asn}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>First Seen:</span>
                    <span className="font-mono">{attacker.firstSeen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Seen:</span>
                    <span className="font-mono">{attacker.lastSeen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Sessions:</span>
                    <span className="font-mono">{attacker.sessions}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-3 text-cyber-foreground/70">Malware Detected:</h4>
                <ul className="space-y-3">
                  {attacker.malware?.map((m: any, i: number) => (
                    <li key={i} className="bg-cyber/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={17} className="text-cyber-warning" />
                        <span className="font-semibold">{m.name}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm">
                        <span className="bg-cyber-accent/10 text-cyber-accent rounded px-2 py-0.5">{m.type}</span>
                        <span className="opacity-60">{new Date(m.timestamp).toLocaleString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-3 text-cyber-foreground/70">MITRE ATT&CK Techniques:</h4>
                <div className="flex flex-wrap gap-2">
                  {attacker.mitreTechniques?.map((t: any) => (
                    <span key={t.id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyber-accent/30 text-cyber-accent rounded">
                      <Code size={14} />
                      <span className="font-mono text-sm">{t.id}</span>
                      <span className="text-sm">{t.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl">
            <CardHeader>
              <CardTitle>Malware Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={malwareTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {malwareTypeData.map((entry, i) => (
                        <Cell key={entry.name} fill={MALWARE_COLORS[i % MALWARE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      wrapperClassName="!bg-cyber !py-2 !px-3 !rounded"
                      formatter={(value: any, name: any) => [`${value}`, `${name}`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttackerProfileDetail;
