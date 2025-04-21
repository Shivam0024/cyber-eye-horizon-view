
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for attack origins and targets
const mockAttacks = [
  { 
    id: 1, 
    sourceCountry: 'Russia', 
    sourceCoords: { lat: 55.7558, lng: 37.6173 }, 
    targetCoords: { lat: 37.7749, lng: -122.4194 },
    attackType: 'Brute Force',
    timestamp: new Date().getTime() - 1000 * 60 * 2 
  },
  { 
    id: 2, 
    sourceCountry: 'China', 
    sourceCoords: { lat: 39.9042, lng: 116.4074 }, 
    targetCoords: { lat: 37.7749, lng: -122.4194 },
    attackType: 'SQL Injection',
    timestamp: new Date().getTime() - 1000 * 60 * 5 
  },
  { 
    id: 3, 
    sourceCountry: 'Brazil', 
    sourceCoords: { lat: -15.7801, lng: -47.9292 }, 
    targetCoords: { lat: 37.7749, lng: -122.4194 },
    attackType: 'XSS Attack',
    timestamp: new Date().getTime() - 1000 * 60 * 8
  },
  { 
    id: 4, 
    sourceCountry: 'Iran', 
    sourceCoords: { lat: 35.6892, lng: 51.3890 }, 
    targetCoords: { lat: 37.7749, lng: -122.4194 },
    attackType: 'DDoS',
    timestamp: new Date().getTime() - 1000 * 60 * 12
  },
  { 
    id: 5, 
    sourceCountry: 'North Korea', 
    sourceCoords: { lat: 39.0392, lng: 125.7625 }, 
    targetCoords: { lat: 37.7749, lng: -122.4194 },
    attackType: 'Zero-day Exploit',
    timestamp: new Date().getTime() - 1000 * 60 * 15
  }
];

const AttackMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeAttacks, setActiveAttacks] = useState<any[]>([]);
  const [tooltipInfo, setTooltipInfo] = useState<{ x: number, y: number, attack: any } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();

  // Set up the canvas and handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          setDimensions({ width, height });
          canvasRef.current.width = width;
          canvasRef.current.height = height;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add new attacks periodically
  useEffect(() => {
    const addAttack = () => {
      const randomAttack = mockAttacks[Math.floor(Math.random() * mockAttacks.length)];
      const newAttack = {
        ...randomAttack,
        id: Date.now(),
        timestamp: Date.now(),
        progress: 0
      };
      
      setActiveAttacks(prev => [...prev, newAttack]);
      
      // Remove attack after completion
      setTimeout(() => {
        setActiveAttacks(prev => prev.filter(a => a.id !== newAttack.id));
      }, 8000); // Animation duration
    };
    
    // Add initial attacks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addAttack(), i * 1000);
    }
    
    // Add new attacks periodically
    const interval = setInterval(addAttack, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Map coords to canvas position
    const mapCoordToCanvas = (lat: number, lng: number) => {
      // Simple Mercator projection
      const x = (lng + 180) * (dimensions.width / 360);
      const latRad = lat * Math.PI / 180;
      const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
      const y = (dimensions.height / 2) - (dimensions.width * mercN / (2 * Math.PI));
      return { x, y };
    };
    
    // Draw the attack arc
    const drawAttackArc = (source: {x: number, y: number}, target: {x: number, y: number}, progress: number, attackType: string) => {
      // Calculate control point for the parabola
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;
      const controlPoint = {
        x: midX,
        y: midY - 100 // Height of the arc
      };
      
      // Calculate point along the curve based on progress
      const t = progress;
      const x = Math.pow(1 - t, 2) * source.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * target.x;
      const y = Math.pow(1 - t, 2) * source.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * target.y;
      
      // Draw path
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, x, y);
      
      // Style based on attack type
      let gradient;
      switch(attackType) {
        case 'Brute Force':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, 'rgba(234, 56, 76, 0.1)');
          gradient.addColorStop(1, 'rgba(234, 56, 76, 0.8)');
          ctx.strokeStyle = gradient;
          break;
        case 'SQL Injection':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.1)');
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.8)');
          ctx.strokeStyle = gradient;
          break;
        case 'XSS Attack':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
          ctx.strokeStyle = gradient;
          break;
        default:
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.1)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.8)');
          ctx.strokeStyle = gradient;
      }
      
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw particle at the current position
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Add glow effect
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      return { x, y };
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw world map grid (simple representation)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      
      // Draw latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        const start = mapCoordToCanvas(lat, -180);
        const end = mapCoordToCanvas(lat, 180);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
      
      // Draw longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        const start = mapCoordToCanvas(-80, lng);
        const end = mapCoordToCanvas(80, lng);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
      
      // Draw continents (highly simplified)
      ctx.beginPath();
      ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
      
      // North America (very simplified)
      const na = [
        mapCoordToCanvas(60, -130),
        mapCoordToCanvas(70, -90),
        mapCoordToCanvas(50, -60),
        mapCoordToCanvas(30, -80),
        mapCoordToCanvas(25, -100),
        mapCoordToCanvas(30, -120)
      ];
      
      ctx.moveTo(na[0].x, na[0].y);
      for (let i = 1; i < na.length; i++) {
        ctx.lineTo(na[i].x, na[i].y);
      }
      ctx.closePath();
      ctx.fill();
      
      // Europe (very simplified)
      ctx.beginPath();
      const eu = [
        mapCoordToCanvas(60, 0),
        mapCoordToCanvas(70, 30),
        mapCoordToCanvas(40, 40),
        mapCoordToCanvas(35, 0)
      ];
      
      ctx.moveTo(eu[0].x, eu[0].y);
      for (let i = 1; i < eu.length; i++) {
        ctx.lineTo(eu[i].x, eu[i].y);
      }
      ctx.closePath();
      ctx.fill();
      
      // Draw active attacks
      let newTooltipInfo = null;
      
      setActiveAttacks(prevAttacks => 
        prevAttacks.map(attack => {
          const source = mapCoordToCanvas(attack.sourceCoords.lat, attack.sourceCoords.lng);
          const target = mapCoordToCanvas(attack.targetCoords.lat, attack.targetCoords.lng);
          
          // Update progress
          const newProgress = Math.min(1, attack.progress + 0.005);
          
          // Draw the arc
          const currentPoint = drawAttackArc(source, target, newProgress, attack.attackType);
          
          // Store tooltip info if this is the latest attack
          if (attack.timestamp > (newTooltipInfo?.attack?.timestamp || 0)) {
            newTooltipInfo = {
              x: currentPoint.x,
              y: currentPoint.y,
              attack
            };
          }
          
          return {
            ...attack,
            progress: newProgress
          };
        })
      );
      
      if (newTooltipInfo) {
        setTooltipInfo(newTooltipInfo);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, activeAttacks]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-cyber"
      />
      
      {tooltipInfo && (
        <div 
          className="absolute pointer-events-none bg-cyber-muted border border-cyber-border rounded p-2 shadow-lg text-xs z-10 max-w-[200px]"
          style={{
            left: `${tooltipInfo.x + 10}px`,
            top: `${tooltipInfo.y - 60}px`,
          }}
        >
          <div className="font-bold text-cyber-accent">{tooltipInfo.attack.attackType}</div>
          <div>From: {tooltipInfo.attack.sourceCountry}</div>
          <div>Type: {tooltipInfo.attack.attackType}</div>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 flex gap-3">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#ea384c] mr-2"></div>
          <span className="text-xs">Brute Force</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#F97316] mr-2"></div>
          <span className="text-xs">SQL Injection</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
          <span className="text-xs">XSS Attack</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
          <span className="text-xs">Other</span>
        </div>
      </div>
    </div>
  );
};

export default AttackMap;
