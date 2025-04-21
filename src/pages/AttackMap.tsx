
import Navbar from "@/components/Navbar";
import AttackMap from "@/components/AttackMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Server, Bug } from "lucide-react";

const AttackMapPage = () => {
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="cyber-card mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Global Attack Map</CardTitle>
            <Badge variant="outline" className="bg-cyber-danger/10 text-cyber-danger border-cyber-danger/20">
              <ShieldAlert className="h-3 w-3 mr-1" /> 14 Active Attacks
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[600px]">
              <AttackMap />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Attacks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyber-danger animate-pulse">14</div>
              <p className="text-sm text-cyber-foreground/70">Currently in progress</p>
            </CardContent>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Attacker Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Russia (24%)</div>
              <p className="text-sm text-cyber-foreground/70">Based on last 24 hours</p>
            </CardContent>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Common Attack Vector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">SMB Protocol (445)</div>
              <p className="text-sm text-cyber-foreground/70">342 attempts today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2 text-cyber-accent" />
                Protocol Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['SMB', 'MySQL', 'SSH', 'HTTP', 'Others'].map((protocol, index) => (
                  <div key={protocol} className="flex items-center">
                    <div className="w-20 text-sm">{protocol}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyber-accent rounded-full"
                          style={{ 
                            width: `${100 - (index * 15)}%`,
                            background: index === 0 
                              ? 'linear-gradient(90deg, #9b87f5 0%, #7a63e4 100%)' 
                              : undefined
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm">{100 - (index * 15)}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bug className="h-5 w-5 mr-2 text-cyber-warning" />
                Recent Malware Captures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'WannaCry Variant', type: 'Ransomware', time: '14:32' },
                  { name: 'Mirai Botnet', type: 'Botnet', time: '10:15' },
                  { name: 'TeslaCrypt', type: 'Ransomware', time: '22:05' }
                ].map((malware, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-cyber-border/30 pb-2">
                    <div>
                      <div className="font-medium">{malware.name}</div>
                      <div className="text-xs text-cyber-foreground/70">{malware.type}</div>
                    </div>
                    <div className="text-xs">{malware.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttackMapPage;
