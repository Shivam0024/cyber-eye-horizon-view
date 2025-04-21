import { useState, useEffect } from 'react';
import { Shield, Bug, Network, MapPin, Shield as ShieldIcon, ShieldAlert, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltipContent, ChartLegendContent, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
  protocolAnalysis: [
    { protocol: 'SMB', count: 875, percentage: 34, attackers: 145, malwareCount: 52 },
    { protocol: 'MySQL', count: 624, percentage: 24, attackers: 98, malwareCount: 23 },
    { protocol: 'SSH', count: 498, percentage: 20, attackers: 76, malwareCount: 31 },
    { protocol: 'HTTP', count: 342, percentage: 14, attackers: 48, malwareCount: 18 },
    { protocol: 'Others', count: 208, percentage: 8, attackers: 20, malwareCount: 4 }
  ],
  mitreAttackMapping: [
    { id: 'T1190', name: 'Exploit Public-Facing Application', count: 487 },
    { id: 'T1133', name: 'External Remote Services', count: 326 },
    { id: 'T1078', name: 'Valid Accounts', count: 289 },
    { id: 'T1021', name: 'Remote Services', count: 245 },
  ]
};

const COLORS = ['#9b87f5', '#ea384c', '#0EA5E9', '#F97316', '#777'];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [progress, setProgress] = useState(75);
  const [activeAttackPulse, setActiveAttackPulse] = useState(true);
  const navigate = useNavigate();

  const protocolStats = stats.topAttackedPorts.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.protocol] = (acc[cur.protocol] || 0) + cur.count;
    return acc;
  }, {});

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAttackPulse(prev => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prevStats) => ({
        ...prevStats,
        activeAttacks: Math.floor(Math.random() * 20) + 5,
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const navigateToMalwareAnalysis = () => {
    navigate('/malware-analysis');
  };

  const handleProtocolCardClick = (protocol: string) => {
    navigate(`/attacker/${protocol}`);
  };

  return (
    <div className="relative container mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-[-1] opacity-55">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
          alt="Hoodie Attacker Mask"
          className="object-cover w-full h-full brightness-50"
          style={{ filter: "blur(2px)" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-cyber/60 to-black/60"></div>
      </div>

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
        <Card className={`cyber-card relative ${activeAttackPulse ? 'cyber-pulse' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Attacks</CardTitle>
            <ShieldAlert className={`h-4 w-4 ${activeAttackPulse ? 'text-cyber-danger' : 'text-cyber-accent/70'}`} />
          </CardHeader>
          <CardContent>
            <div className="relative">
              {stats.activeAttacks > 0 && (
                <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${activeAttackPulse ? 'bg-cyber-danger' : 'bg-transparent'} animate-ping opacity-80 z-20`}></span>
              )}
              <div className={`text-2xl font-bold ${activeAttackPulse ? 'text-cyber-danger' : 'text-cyber-foreground'}`}>
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
          <CardFooter className="flex justify-end pt-2">
            <button 
              onClick={navigateToMalwareAnalysis}
              className="flex items-center text-cyber-accent hover:text-cyber-accent/80 text-sm font-medium transition-colors"
            >
              View all malware <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.protocolAnalysis}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ protocol, percentage }) => `${protocol}: ${percentage}%`}
                  >
                    {stats.protocolAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-cyber/90 p-2 border border-cyber-accent rounded">
                            <p className="text-sm font-bold">{data.protocol}</p>
                            <p className="text-xs">Count: {data.count}</p>
                            <p className="text-xs">Percentage: {data.percentage}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card col-span-2">
          <CardHeader>
            <CardTitle>Protocol-wise Attack Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats.protocolAnalysis.map((protocol) => (
                <div 
                  key={protocol.protocol} 
                  className="cyber-card p-3 border border-cyber-border/30 hover:border-cyber-accent/80 transition-all cursor-pointer hover-scale"
                  onClick={() => handleProtocolCardClick(protocol.protocol)}
                  title={`View attackers for ${protocol.protocol}`}
                >
                  <div className="text-lg font-bold text-cyber-accent">{protocol.protocol}</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-foreground/70">Attacks:</span>
                      <span>{protocol.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-foreground/70">Attackers:</span>
                      <span>{protocol.attackers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-foreground/70">Malware:</span>
                      <span>{protocol.malwareCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>MITRE ATT&CK Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.mitreAttackMapping.map((technique) => (
                <div key={technique.id} className="flex items-center">
                  <div className="w-16 font-mono text-xs bg-cyber-accent/20 rounded px-1 text-center">
                    {technique.id}
                  </div>
                  <div className="ml-2 flex-1">
                    <div className="text-sm">{technique.name}</div>
                    <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full bg-cyber-accent rounded-full"
                        style={{ width: `${(technique.count / stats.mitreAttackMapping[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs">{technique.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Recent Malware Captures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentMalware.map((malware) => (
                <div key={malware.id} className="cyber-card border border-cyber-border/30 p-3">
                  <div className="flex items-center">
                    <Bug className="h-4 w-4 text-cyber-warning mr-2" />
                    <div className="font-medium">{malware.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-cyber-foreground/70 flex justify-between">
                    <span>{malware.type}</span>
                    <span>{new Date(malware.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <button 
              onClick={navigateToMalwareAnalysis}
              className="flex items-center text-cyber-accent hover:text-cyber-accent/80 text-sm font-medium transition-colors"
            >
              View all malware <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </CardFooter>
        </Card>
      </div>

      <style>
        {`
        .cyber-pulse {
          animation: pulse 2s infinite;
          box-shadow: 0 0 0 0 rgba(234, 56, 76, 0.7);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(234, 56, 76, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(234, 56, 76, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(234, 56, 76, 0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
