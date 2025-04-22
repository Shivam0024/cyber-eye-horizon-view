import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MapPin, Globe, FileText, Code, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const HOODIE_MASK_URL = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80";

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

const MALWARE_COLORS = ["#8B5CF6", "#F97316", "#ea384c", "#0EA5E9", "#10B981"];

const AttackerDetailPage = () => {
  const { protocol } = useParams<{ protocol: string }>();
  const navigate = useNavigate();
  const attackers = MOCK_ATTACKERS.filter(a => a.protocol.toLowerCase() === protocol?.toLowerCase());

  let malwareTypeData: { name: string; value: number }[] = [];
  if (attackers.length > 0) {
    const counter: Record<string, number> = {};
    attackers.forEach(attacker =>
      attacker.malware.forEach(m => {
        counter[m.type] = (counter[m.type] || 0) + 1;
      }),
    );
    malwareTypeData = Object.entries(counter).map(([name, value]) => ({ name, value }));
  }

  return (
    <div className="min-h-screen bg-cyber p-6">
      <div className="max-w-[1400px] mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-5 w-fit bg-cyber-muted/40 shadow"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-4xl font-bold mb-2 text-cyber-accent">{protocol} Attacker Details</h2>
        <p className="mb-8 text-cyber-foreground/70 text-lg">Deep dive into attackers by protocol: source, location, captured malware &amp; mapped MITRE classification.</p>
        
        {attackers.length === 0 ? (
          <div className="bg-cyber border-l-4 border-cyber-accent p-8 rounded shadow text-lg">
            No attacker data for this protocol.
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {attackers.map((attacker) => (
                <Card key={attacker.ip} className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                      <span className="inline-flex rounded-full bg-cyber-accent/70 p-2">
                        <MapPin size={22} className="text-cyber-foreground" />
                      </span>
                      <span>{attacker.ip}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Globe size={20} className="text-cyber-foreground/70" />
                      <span className="text-lg">
                        {attacker.country}, {attacker.city}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-cyber-foreground/70">Malware Detected:</h4>
                      <ul className="space-y-3">
                        {attacker.malware.map((m, i) => (
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
                        {attacker.mitreTechniques.map(t => (
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
              ))}
            </div>

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
        )}
      </div>
    </div>
  );
};

export default AttackerDetailPage;
