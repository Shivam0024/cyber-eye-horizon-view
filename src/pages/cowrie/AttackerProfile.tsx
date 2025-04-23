
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock: Attacker list (replace with real data/fetch later)
const attackerList = [
  { id: 1001, ip: '192.168.1.105', location: 'Beijing, China', asn: 'AS4134 China Telecom', firstSeen: '2025-04-16', lastSeen: '2025-04-22', sessions: 4 },
  { id: 1002, ip: '83.91.27.11', location: 'Berlin, Germany', asn: 'AS3320 Deutsche Telekom', firstSeen: '2025-04-19', lastSeen: '2025-04-21', sessions: 2 },
  { id: 1003, ip: '150.222.1.99', location: 'Mumbai, India', asn: 'AS55836 Reliance Jio', firstSeen: '2025-04-20', lastSeen: '2025-04-22', sessions: 3 },
  { id: 1004, ip: '203.0.113.77', location: 'Sydney, Australia', asn: 'AS1221 Telstra', firstSeen: '2025-04-18', lastSeen: '2025-04-19', sessions: 1 }
];

// For now: just show attacker list. Later, if user wants, detail page can be another route!
const AttackerProfile = () => {
  const navigate = useNavigate();

  const handleGoDetail = (attacker: typeof attackerList[0]) => {
    navigate(`/cowrie/attacker-profile/${attacker.ip}`, { state: { attacker } });
  };

  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Attackers</h1>
        <Card className="bg-cyber-muted border-cyber-border">
          <CardHeader>
            <CardTitle>All Observed Attackers</CardTitle>
            <CardDescription>
              List of all attackers detected by Cowrie honeypot. Click row to view detail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>ASN</TableHead>
                  <TableHead>First Seen</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Total Sessions</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attackerList.map((attacker) => (
                  <TableRow 
                    key={attacker.id} 
                    className="cursor-pointer hover:bg-cyber-accent/10"
                    onClick={() => handleGoDetail(attacker)}
                  >
                    <TableCell className="font-medium">{attacker.ip}</TableCell>
                    <TableCell>{attacker.location}</TableCell>
                    <TableCell>{attacker.asn}</TableCell>
                    <TableCell>{attacker.firstSeen}</TableCell>
                    <TableCell>{attacker.lastSeen}</TableCell>
                    <TableCell>{attacker.sessions}</TableCell>
                    <TableCell>
                      <button
                        className="px-3 py-1 text-cyber-accent hover:underline bg-cyber-muted rounded shadow-sm text-sm transition"
                        onClick={e => { e.stopPropagation(); handleGoDetail(attacker); }}
                      >
                        View Profile
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
