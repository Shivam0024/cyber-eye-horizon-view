
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CowrieAttackMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-cyber-accent mb-6">Cowrie Attack Map</h1>
        
        <Card className="bg-cyber-muted border-cyber-border">
          <CardHeader>
            <CardTitle>Global Attack Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] flex items-center justify-center">
              <p className="text-cyber-foreground/70">
                Attack map visualization will be implemented here. Will show parabolic curves from attacker IPs to the honeypot host.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CowrieAttackMap;
