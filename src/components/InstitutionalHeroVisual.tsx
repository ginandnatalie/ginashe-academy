import React, { useEffect, useRef } from 'react';

interface InstitutionalHeroVisualProps {
  className?: string;
  showBackground?: boolean;
}

export default function InstitutionalHeroVisual({ className = '', showBackground = true }: InstitutionalHeroVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let animationFrame: number;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const nodes: Node[] = [];
    const colors = [
      'rgba(0, 242, 255,',   // Cyan / Tech
      'rgba(212, 175, 55,',   // Gold / Excellence
      'rgba(56, 189, 248,',   // Sky / Knowledge
      'rgba(16, 185, 129,',   // Emerald / Growth & Agri
    ];

    const resize = () => {
      const container = canvas.parentElement;
      W = canvas.width = container?.offsetWidth || window.innerWidth;
      H = canvas.height = container?.offsetHeight || window.innerHeight;

      nodes.length = 0;
      const count = Math.min(Math.floor((W * H) / 28000), 55);

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.45 + 0.25,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw faint connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = W;
        if (node.x > W) node.x = 0;
        if (node.y < 0) node.y = H;
        if (node.y > H) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color} ${node.alpha})`;
        ctx.shadowColor = `${node.color} 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${showBackground ? 'bg-[#07090e]' : ''} ${className}`}>
      {/* Editorial Radial Ambient Glows */}
      <div className="absolute -top-[20%] left-[20%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.08)_0%,transparent_70%)] blur-[80px]" />
      <div className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[90px]" />
      <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)] blur-[100px]" />

      {/* Architectural Precision Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_30%,transparent_85%)]" />

      {/* Dynamic Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

      {/* Subtle Depth Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
    </div>
  );
}
