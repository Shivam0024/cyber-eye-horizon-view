
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Terminal, AlertTriangle, Shield, Network, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for SSH commands
const commandData = [
  { name: 'ls', value: 145, category: 'Reconnaissance' },
  { name: 'cat', value: 87, category: 'Information Gathering' },
  { name: 'wget', value: 63, category: 'Payload Delivery' },
  { name: 'chmod', value: 42, category: 'Exploitation' },
  { name: 'cd', value: 112, category: 'Navigation' },
];

// Mock data for session duration
const sessionData = [
  { name: '0-1 min', sessions: 145 },
  { name: '1-5 min', sessions: 87 },
  { name: '5-15 min', sessions: 63 },
  { name: '15-30 min', sessions: 42 },
  { name: '30+ min', sessions: 32 },
];

// Mock data for MITRE techniques
const mitreData = [
  { name: 'Initial Access', value: 85 },
  { name: 'Execution', value: 63 },
  { name: 'Persistence', value: 41 },
  { name: 'Privilege Escalation', value: 37 },
  { name: 'Defense Evasion', value: 28 },
];

// Mock attacker sessions
const ATTACKER_SESSIONS = [
  {
    id: 1,
    ip: "192.168.1.105",
    country: "China",
    protocol: "SSH",
    commands: 12,
    duration: "5m 23s",
    timestamp: "2025-04-22T08:42:12Z",
    risk: "high"
  },
  {
    id: 2,
    ip: "45.123.45.78",
    country: "Russia",
    protocol: "Telnet",
    commands: 8,
    duration: "3m 12s",
    timestamp: "2025-04-22T09:15:45Z",
    risk: "medium"
  },
  {
    id: 3,
    ip: "72.14.192.12",
    country: "United States",
    protocol: "SSH",
    commands: 17,
    duration: "9m 48s",
    timestamp: "2025-04-22T10:05:33Z",
    risk: "critical"
  },
  {
    id: 4,
    ip: "91.234.56.78",
    country: "Germany",
    protocol: "SSH",
    commands: 5,
    duration: "1m 45s",
    timestamp: "2025-04-22T11:22:18Z",
    risk: "low"
  }
];

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981'];

const CowrieDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-cyber-accent">Cowrie SSH/Telnet Honeypot</h1>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="commands">Command Analysis</TabsTrigger>
            <TabsTrigger value="mitre">MITRE Techniques</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Terminal className="mr-2 h-4 w-4 text-cyber-accent" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyber-accent">7</div>
                  <p className="text-xs text-cyber-foreground/70">+2 from yesterday</p>
                </CardContent>
              </Card>
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-cyber-accent" />
                    Total Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyber-accent">856</div>
                  <p className="text-xs text-cyber-foreground/70">+24 today</p>
                </CardContent>
              </Card>
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-cyber-accent" />
                    High Risk Attacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyber-accent">23</div>
                  <p className="text-xs text-cyber-foreground/70">+3 in last 24h</p>
                </CardContent>
              </Card>
              <Card className="cyber-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-cyber-accent" />
                    Avg. Session Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyber-accent">4m 32s</div>
                  <p className="text-xs text-cyber-foreground/70">+12s from yesterday</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Command Distribution</CardTitle>
                  <CardDescription>Top commands executed by attackers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={commandData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {commandData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Session Duration</CardTitle>
                  <CardDescription>How long attackers stay connected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sessionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sessions" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Recent Attacker Sessions</CardTitle>
                <CardDescription>Details of the most recent SSH/Telnet sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-semibold border-b">
                    <div>IP Address</div>
                    <div>Country</div>
                    <div>Protocol</div>
                    <div>Commands</div>
                    <div>Duration</div>
                    <div>Timestamp</div>
                    <div>Risk Level</div>
                  </div>
                  <div className="divide-y">
                    {ATTACKER_SESSIONS.map((session) => (
                      <div 
                        key={session.id} 
                        className="grid grid-cols-7 gap-4 p-4 cursor-pointer hover:bg-cyber-muted/50"
                        onClick={() => navigate(`/attacker/ssh?ip=${session.ip}`)}
                      >
                        <div className="text-cyber-accent">{session.ip}</div>
                        <div>{session.country}</div>
                        <div>{session.protocol}</div>
                        <div>{session.commands}</div>
                        <div>{session.duration}</div>
                        <div>{new Date(session.timestamp).toLocaleString()}</div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            session.risk === 'low' 
                              ? 'bg-green-500/20 text-green-500' 
                              : session.risk === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : session.risk === 'high'
                                  ? 'bg-orange-500/20 text-orange-500'
                                  : 'bg-red-500/20 text-red-500'
                          }`}>
                            {session.risk}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commands" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Command Categories</CardTitle>
                  <CardDescription>Classification of attacker commands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={commandData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="category"
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        >
                          {commandData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Top Commands</CardTitle>
                  <CardDescription>Most frequently used commands by attackers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={commandData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Occurrences" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mitre" className="space-y-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>MITRE ATT&CK Techniques</CardTitle>
                <CardDescription>Attack techniques mapped to MITRE ATT&CK framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mitreData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Occurrences" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CowrieDashboard;
