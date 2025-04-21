
import Navbar from "@/components/Navbar";
import AttackMap from "@/components/AttackMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AttackMapPage = () => {
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="cyber-card mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Global Attack Map</CardTitle>
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
      </div>
    </div>
  );
};

export default AttackMapPage;
