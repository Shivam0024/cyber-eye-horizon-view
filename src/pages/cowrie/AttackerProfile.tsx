
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Mock data for attacker sessions
const attackerSessions = [
  { id: 1, timestamp: '2025-04-22T10:05:33Z', duration: '12m 45s', commands: 24, success: true },
  { id: 2, timestamp: '2025-04-21T15:32:18Z', duration: '5m 12s', commands: 17, success: true },
  { id: 3, timestamp: '2025-04-20T08:45:01Z', duration: '3m 34s', commands: 9, success: false },
  { id: 4, timestamp: '2025-04-19T22:12:47Z', duration: '8m 27s', commands: 21, success: true },
];

// Mock data for command types
const commandTypes = [
  { name: 'File Download', value: 28 },
  { name: 'Reconnaissance', value: 45 },
  { name: 'System Modification', value: 15 },
  { name: 'Information Gathering', value: 32 },
  { name: 'Persistence', value: 10 },
];

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981'];

const AttackerProfile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Attacker Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-cyber-muted border-cyber-border col-span-2">
            <CardHeader>
              <CardTitle>Attacker Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">IP Address</h3>
                  <p className="text-lg font-semibold text-cyber-accent">192.168.1.105</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">Location</h3>
                  <p className="text-lg font-semibold">Beijing, China</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">ASN</h3>
                  <p className="text-lg font-semibold">AS4134 China Telecom</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">First Seen</h3>
                  <p className="text-lg font-semibold">2025-04-19 22:12:47</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">Last Seen</h3>
                  <p className="text-lg font-semibold">2025-04-22 10:05:33</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">Total Sessions</h3>
                  <p className="text-lg font-semibold">4</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">Successful Logins</h3>
                  <p className="text-lg font-semibold">3</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyber-foreground/70 mb-1">Total Commands</h3>
                  <p className="text-lg font-semibold">71</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-muted border-cyber-border">
            <CardHeader>
              <CardTitle>Command Types</CardTitle>
              <CardDescription>Distribution of commands by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={commandTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {commandTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {commandTypes.map((type, index) => (
                  <div key={type.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs">{type.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-cyber-muted border-cyber-border">
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Historical sessions from this attacker</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Commands</TableHead>
                  <TableHead>Login Success</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attackerSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.id}</TableCell>
                    <TableCell>{new Date(session.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>{session.commands}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        session.success 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {session.success ? 'Success' : 'Failed'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button 
                        className="text-cyber-accent hover:underline text-sm"
                        onClick={() => navigate(`/cowrie/session-analysis?session=${session.id}`)}
                      >
                        Analyze
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttackerProfile;
