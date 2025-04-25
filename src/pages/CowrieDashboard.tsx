
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronRight, Terminal, AlertTriangle, Shield, Network, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    risk: "high",
    active: true
  },
  {
    id: 2,
    ip: "45.123.45.78",
    country: "Russia",
    protocol: "Telnet",
    commands: 8,
    duration: "3m 12s",
    timestamp: "2025-04-22T09:15:45Z",
    risk: "medium",
    active: false
  },
  {
    id: 3,
    ip: "72.14.192.12",
    country: "United States",
    protocol: "SSH",
    commands: 17,
    duration: "9m 48s",
    timestamp: "2025-04-22T10:05:33Z",
    risk: "critical",
    active: true
  },
  {
    id: 4,
    ip: "91.234.56.78",
    country: "Germany",
    protocol: "SSH",
    commands: 5,
    duration: "1m 45s",
    timestamp: "2025-04-22T11:22:18Z",
    risk: "low",
    active: false
  }
];

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981'];

const CowrieDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const activeSessionCount = ATTACKER_SESSIONS.filter(session => session.active).length;
  const totalCommands = ATTACKER_SESSIONS.reduce((total, session) => total + session.commands, 0);

  return (
    <div className="min-h-screen w-full bg-cyber">
      <Navbar />
      <div className="w-full px-4 py-6">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Cowrie SSH/Telnet Honeypot</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Terminal className="mr-2 h-4 w-4 text-cyber-accent" />
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
                <Activity className="mr-2 h-4 w-4 text-cyber-accent" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold text-red-500",
                activeSessionCount > 0 && "animate-pulse-glow"
              )}>
                {activeSessionCount}
              </div>
              <p className="text-xs text-cyber-foreground/70">Live connections</p>
            </CardContent>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-cyber-accent" />
                Total Commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-accent">{totalCommands}</div>
              <p className="text-xs text-cyber-foreground/70">Across all sessions</p>
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

        <Card className="bg-cyber-muted border-cyber-border mb-6">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Current and recent attacker sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-7 gap-4 p-4 font-semibold border-b">
                <div>Session ID</div>
                <div>IP Address</div>
                <div>Country</div>
                <div>Protocol</div>
                <div>Duration</div>
                <div>Status</div>
                <div>Action</div>
              </div>
              <div className="divide-y">
                {ATTACKER_SESSIONS.map((session) => (
                  <div 
                    key={session.id} 
                    className="grid grid-cols-7 gap-4 p-4 hover:bg-cyber-muted/50"
                  >
                    <div>{session.id}</div>
                    <div className="text-cyber-accent">{session.ip}</div>
                    <div>{session.country}</div>
                    <div>{session.protocol}</div>
                    <div>{session.duration}</div>
                    <div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        session.active 
                          ? "bg-red-500/20 text-red-500 animate-pulse" 
                          : "bg-gray-500/20 text-gray-400"
                      )}>
                        {session.active ? "Active" : "Closed"}
                      </span>
                    </div>
                    <div>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-2"
                        onClick={() => navigate(`/cowrie/session-analysis?session=${session.id}`)}
                      >
                        Analyze
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="commands" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="commands">Command Analysis</TabsTrigger>
            <TabsTrigger value="sessions">Session Duration</TabsTrigger>
            <TabsTrigger value="mitre">MITRE Techniques</TabsTrigger>
          </TabsList>

          <TabsContent value="commands" className="space-y-6">
            <Card className="bg-cyber-muted border-cyber-border">
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
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-cyber-muted border-cyber-border">
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
          </TabsContent>

          <TabsContent value="mitre" className="space-y-6">
            <Card className="bg-cyber-muted border-cyber-border">
              <CardHeader>
                <CardTitle>MITRE ATT&CK Techniques</CardTitle>
                <CardDescription>Attack techniques mapped to MITRE ATT&CK framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
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
