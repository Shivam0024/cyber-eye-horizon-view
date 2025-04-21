import { useState, useEffect } from 'react';
import { Shield, Bug, Network, MapPin, Shield as ShieldIcon, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const mockStats = {
  totalAttacks: 2547,
  activeAttacks: 14,
  capturedMalware: 128,
  uniqueAttackers: 387,
  attacksPerDay: [23, 45, 36, 42, 58, 63, 41],
  topAttackedPorts: [
    { port: 445, protocol: 'SMB', count: 342 },
    { port: 3306, protocol: 'MySQL', count: 287 },
    { port: 22, protocol: 'SSH', count: 186 },
    { port: 80, protocol: 'HTTP', count: 145 },
  ],
  attackerGeoDistribution: [
    { country: 'Russia', percentage: 24 },
    { country: 'China', percentage: 21 },
    { country: 'USA', percentage: 14 },
    { country: 'Brazil', percentage: 9 },
    { country: 'Others', percentage: 32 },
  ],
  recentMalware: [
    { id: 'mal-001', name: 'WannaCry Variant', type: 'Ransomware', timestamp: '2023-04-18T14:32:21' },
    { id: 'mal-002', name: 'Mirai Botnet', type: 'Botnet', timestamp: '2023-04-18T10:15:43' },
    { id: 'mal-003', name: 'TeslaCrypt', type: 'Ransomware', timestamp: '2023-04-17T22:05:11' },
  ],
};

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [progress, setProgress] = useState(75);

  const protocolStats = stats.topAttackedPorts.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.protocol] = (acc[cur.protocol] || 0) + cur.count;
    return acc;
  }, {});

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prevStats) => ({
        ...prevStats,
        activeAttacks: Math.floor(Math.random() * 20) + 5,
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Attacks</CardTitle>
            <Shield className="h-4 w-4 text-cyber-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttacks.toLocaleString()}</div>
            <p className="text-xs text-cyber-foreground/70">+21% from last month</p>
            <div className="mt-2">
              <Progress value={75} className="h-1 bg-cyber-border" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Attacks</CardTitle>
            <ShieldAlert className="h-4 w-4 text-cyber-danger" />
          </CardHeader>
          <CardContent>
            <div className="relative">
              {stats.activeAttacks > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyber-danger animate-ping opacity-80 z-20"></span>
              )}
              <div className="text-2xl font-bold text-cyber-danger animate-pulse">
                {stats.activeAttacks}
              </div>
            </div>
            <p className="text-xs text-cyber-foreground/70">Live monitoring</p>
            <div className="mt-2">
              <Progress value={stats.activeAttacks * 3} className="h-1 bg-cyber-border" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Captured Malware</CardTitle>
            <Bug className="h-4 w-4 text-cyber-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.capturedMalware}</div>
            <p className="text-xs text-cyber-foreground/70">12 new in last 24h</p>
            <div className="mt-2">
              <Progress value={65} className="h-1 bg-cyber-border" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Unique Attackers</CardTitle>
            <Network className="h-4 w-4 text-cyber-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueAttackers}</div>
            <p className="text-xs text-cyber-foreground/70">From 48 countries</p>
            <div className="mt-2">
              <Progress value={45} className="h-1 bg-cyber-border" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Protocol Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(protocolStats).map(([protocol, count]) => (
                <div key={protocol} className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{protocol}</span>
                  <span className="ml-2">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <Card className="cyber-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attack Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full relative">
              <div className="absolute inset-0 cyber-grid-bg"></div>
              <div className="absolute bottom-0 left-0 right-0 h-52 flex items-end">
                {stats.attacksPerDay.map((value, index) => (
                  <div 
                    key={index}
                    className="w-full h-full flex items-end justify-center" 
                  >
                    <div 
                      className="w-16 rounded-t cyber-glow bg-gradient-to-t from-cyber-accent/90 to-cyber-accent/30 transition-all duration-300"
                      style={{ height: `${(value / Math.max(...stats.attacksPerDay)) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-cyber-border"></div>
              <div className="absolute bottom-[52px] left-0 right-0 h-[1px] w-full bg-cyber-border opacity-30"></div>
              <div className="absolute bottom-[104px] left-0 right-0 h-[1px] w-full bg-cyber-border opacity-30"></div>
              <div className="absolute bottom-[156px] left-0 right-0 h-[1px] w-full bg-cyber-border opacity-30"></div>
              <div className="absolute bottom-[208px] left-0 right-0 h-[1px] w-full bg-cyber-border opacity-30"></div>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-xs">Mon</span>
              <span className="text-xs">Tue</span>
              <span className="text-xs">Wed</span>
              <span className="text-xs">Thu</span>
              <span className="text-xs">Fri</span>
              <span className="text-xs">Sat</span>
              <span className="text-xs">Sun</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Top Attacked Ports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topAttackedPorts.map((port) => (
                <div key={port.port} className="flex items-center">
                  <div className="w-16 text-sm text-cyber-foreground/70">{port.port}</div>
                  <div className="w-20 text-sm text-cyber-foreground/70">{port.protocol}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-accent rounded-full"
                        style={{ width: `${(port.count / stats.topAttackedPorts[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm">{port.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Attacker Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.attackerGeoDistribution.map((item) => (
                <div key={item.country} className="flex items-center">
                  <div className="w-20 text-sm text-cyber-foreground/70">{item.country}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-accent rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card col-span-2">
          <CardHeader>
            <CardTitle>Recent Captured Malware</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentMalware.map((malware) => (
                <div key={malware.id} className="flex items-center p-2 rounded-md hover:bg-cyber-border/20 transition-colors">
                  <div className="flex-shrink-0 mr-3">
                    <Bug className="h-8 w-8 text-cyber-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{malware.name}</p>
                    <p className="text-xs text-cyber-foreground/70">{malware.type}</p>
                  </div>
                  <div className="text-right text-xs text-cyber-foreground/70">
                    {new Date(malware.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
