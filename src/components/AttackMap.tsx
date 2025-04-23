import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      
      setTimeout(() => {
        setActiveAttacks(prev => prev.filter(a => a.id !== newAttack.id));
      }, 8000);
    };
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addAttack(), i * 1000);
    }
    
    const interval = setInterval(addAttack, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const mapCoordToCanvas = (lat: number, lng: number) => {
      const x = (lng + 180) * (dimensions.width / 360);
      const latRad = lat * Math.PI / 180;
      const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
      const y = (dimensions.height / 2) - (dimensions.width * mercN / (2 * Math.PI));
      return { x, y };
    };

    const drawAttackArc = (source, target, progress, attackType, highlight) => {
      const midX = (source.x + target.x) / 2, midY = (source.y + target.y) / 2;
      const controlPoint = { x: midX, y: midY - 100 };

      const t = progress;
      const x = Math.pow(1 - t, 2) * source.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * target.x;
      const y = Math.pow(1 - t, 2) * source.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * target.y;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, x, y);

      let gradient;
      switch (attackType) {
        case 'Brute Force':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, '#3bb27322');
          gradient.addColorStop(1, highlight ? '#4ade80' : '#166534');
          ctx.strokeStyle = gradient;
          break;
        case 'SQL Injection':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, '#22d3ee22');
          gradient.addColorStop(1, highlight ? '#22d3ee' : '#164e63');
          ctx.strokeStyle = gradient;
          break;
        case 'XSS Attack':
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, '#8b5cf622');
          gradient.addColorStop(1, highlight ? '#8b5cf6' : '#4c1d95');
          ctx.strokeStyle = gradient;
          break;
        default:
          gradient = ctx.createLinearGradient(source.x, source.y, x, y);
          gradient.addColorStop(0, '#10b98133');
          gradient.addColorStop(1, highlight ? '#10b981' : '#064e3b');
          ctx.strokeStyle = gradient;
      }
      ctx.lineWidth = highlight ? 6 : 3;
      ctx.shadowColor = highlight ? "#4ade80" : "#333";
      ctx.shadowBlur = highlight ? 30 : 15;
      ctx.globalAlpha = highlight ? 0.85 : 0.7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, highlight ? 11 : 6, 0, Math.PI * 2);
      ctx.fillStyle = highlight ? '#4ade80cc' : '#313c3cc0';
      ctx.globalAlpha = highlight ? 0.93 : 0.78;
      ctx.shadowColor = highlight ? "#4ade80" : "#22d3ee";
      ctx.shadowBlur = highlight ? 40 : 12;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, highlight ? 18 : 11, 0, Math.PI * 2);
      ctx.fillStyle = highlight ? 'rgba(74,222,128, 0.17)' : 'rgba(34,211,238,0.10)';
      ctx.fill();
      ctx.restore();

      return { x, y };
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        const start = mapCoordToCanvas(lat, -180);
        const end = mapCoordToCanvas(lat, 180);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        const start = mapCoordToCanvas(-80, lng);
        const end = mapCoordToCanvas(80, lng);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
      const na = [
        mapCoordToCanvas(60, -130),
        mapCoordToCanvas(70, -90),
        mapCoordToCanvas(50, -60),
        mapCoordToCanvas(30, -80),
        mapCoordToCanvas(25, -100),
        mapCoordToCanvas(30, -120)
      ];
      ctx.moveTo(na[0].x, na[0].y);
      for (let i = 1; i < na.length; i++) ctx.lineTo(na[i].x, na[i].y);
      ctx.closePath();
      ctx.fill();

      const eu = [
        mapCoordToCanvas(60, 0),
        mapCoordToCanvas(70, 30),
        mapCoordToCanvas(40, 40),
        mapCoordToCanvas(35, 0)
      ];
      ctx.moveTo(eu[0].x, eu[0].y);
      for (let i = 1; i < eu.length; i++) ctx.lineTo(eu[i].x, eu[i].y);
      ctx.closePath();
      ctx.fill();

      let newTooltipInfo = null;
      setActiveAttacks(prevAttacks =>
        prevAttacks.map(attack => {
          const source = mapCoordToCanvas(attack.sourceCoords.lat, attack.sourceCoords.lng);
          const target = mapCoordToCanvas(attack.targetCoords.lat, attack.targetCoords.lng);
          const highlight = attack.progress < 0.2;

          const newProgress = Math.min(1, attack.progress + 0.008);

          const currentPoint = drawAttackArc(source, target, newProgress, attack.attackType, highlight);

          if (attack.timestamp > (newTooltipInfo?.attack?.timestamp || 0)) {
            newTooltipInfo = { x: currentPoint.x, y: currentPoint.y, attack };
          }
          return { ...attack, progress: newProgress };
        })
      );
      if (newTooltipInfo) setTooltipInfo(newTooltipInfo);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, activeAttacks]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <canvas ref={canvasRef} className="w-full h-full bg-cyber" />
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
