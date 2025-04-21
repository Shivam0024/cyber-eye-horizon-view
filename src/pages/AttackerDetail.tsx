
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MapPin, Globe, FileText, Code, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder image for side illustration (you could swap to a project image)
const HOODIE_MASK_URL = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80";

// Mock data for demonstration; in a real app, fetch from backend or context.
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

  // Aggregate malware types for pie chart
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
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-cyber to-cyber-muted/80 animate-fade-in">
      {/* Left Illustration (hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center items-center flex-[0.85] bg-black/90">
        <img
          src={HOODIE_MASK_URL}
          alt="Hooded Attacker Mask"
          className="w-full h-full object-cover opacity-60 rounded-xl shadow-lg"
          style={{ maxWidth: 480, maxHeight: 700 }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col py-10 px-4 md:px-12 lg:px-20">
        <Button
          variant="ghost"
          size="sm"
          className="mb-5 w-fit bg-cyber-muted/40 shadow"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-4xl font-bold mb-2 text-cyber-accent drop-shadow-lg">{protocol} Attacker Details</h2>
        <p className="mb-8 text-cyber-foreground/70 text-lg">Deep dive into attackers by protocol: source, location, captured malware &amp; mapped MITRE classification.</p>
        {attackers.length === 0 ? (
          <div className="bg-cyber border-l-4 border-cyber-accent p-8 rounded shadow text-lg">
            No attacker data for this protocol.
          </div>
        ) : (
          <div className="flex flex-col gap-10 relative">
            {/* Cards and Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {attackers.map((attacker, idx) => (
                <Card key={attacker.ip} className="cyber-card border-cyber-border/80 bg-cyber/70 shadow-xl p-4 flex flex-col min-h-[370px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                      <span className="inline-flex rounded-full bg-cyber-accent/70 p-2">
                        <MapPin size={22} className="text-cyber-foreground" />
                      </span>
                      <span>{attacker.ip}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Globe size={20} className="text-cyber-foreground/70" />
                      <span className="text-lg">
                        {attacker.country}, {attacker.city}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="block text-xs text-cyber-foreground/70 font-bold mb-1">Malware Uploaded:</span>
                      <ul className="space-y-2">
                        {attacker.malware.map((m, i) => (
                          <li key={i} className="flex items-center gap-2 text-base">
                            <FileText size={17} className="text-cyber-warning" />
                            <span className="font-semibold">{m.name}</span>
                            <span className="opacity-80 text-xs bg-cyber-accent/10 text-cyber-accent rounded px-2 py-0.5">{m.type}</span>
                            <span className="opacity-60 text-xs">{new Date(m.timestamp).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center mt-2">
                      <Code size={18} className="text-cyber-accent mr-2" />
                      <span className="text-xs font-semibold text-cyber-foreground/70">MITRE Techniques:</span>
                      <div className="ml-3 flex flex-wrap gap-2">
                        {attacker.mitreTechniques.map(t => (
                          <span key={t.id} className="px-2 py-0.5 bg-cyber-accent/30 text-cyber-accent rounded text-xs font-mono">
                            {t.id} {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pie Chart malware summary */}
              <div className="lg:col-span-1 flex flex-col justify-center items-center bg-cyber/50 shadow-xl rounded-xl p-8 min-h-[370px]">
                <h3 className="font-bold text-lg mb-6 text-cyber-accent">Malware Type Summary</h3>
                {malwareTypeData.length === 0 ? (
                  <p className="text-cyber-foreground/70 text-center">No malware data available.</p>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <ResponsiveContainer width="95%" height={210}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={malwareTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {malwareTypeData.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={MALWARE_COLORS[i % MALWARE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          wrapperClassName="!bg-cyber !py-2 !px-3 !rounded"
                          formatter={(value: any, name: any) => [`${value}`, `${name}`]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackerDetailPage;
