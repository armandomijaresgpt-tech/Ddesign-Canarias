import React, { useEffect, useRef } from 'react';
import { NavSection } from '../types';

interface InteractiveBackgroundProps {
  activeSection?: NavSection;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  activeSection = 'hero',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track DPR for crisp rendering on Retina screens
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 75;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseRadius = Math.random() * 1.5 + 0.8;
        const baseAlpha = Math.random() * 0.45 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          baseRadius,
          radius: baseRadius,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    initParticles();

    // Pointer move listener
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      // Enhanced sensitivity in hero section
      const isHero = activeSection === 'hero';
      const interactionRadius = isHero ? 140 : 90;
      const repelForce = isHero ? 1.8 : 0.9;

      // Draw subtle cursor spotlight if in Hero section
      if (mouse.isInside && isHero) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          220
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      const pCount = particles.length;
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // React to mouse
        if (mouse.isInside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactionRadius && dist > 0) {
            const force = (1 - dist / interactionRadius) * repelForce;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;

            // Make particle brighter when close to cursor
            p.alpha = Math.min(0.9, p.baseAlpha + (1 - dist / interactionRadius) * 0.4);
            p.radius = p.baseRadius * (1 + (1 - dist / interactionRadius) * 0.6);
          } else {
            // Gradually return to base state
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Draw particle (White / Silver with alpha)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxConnectDist = isMobile ? 65 : 85;

          if (dist2 < maxConnectDist) {
            const lineAlpha = (1 - dist2 / maxConnectDist) * 0.07;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#07080C]">
      {/* High-End Tech Monochrome Ambient Glows */}
      <div 
        className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-white/[0.035] blur-[160px]"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 -right-20 w-[550px] h-[550px] rounded-full bg-zinc-700/[0.04] blur-[150px]"
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-32 left-10 w-[500px] h-[500px] rounded-full bg-zinc-800/[0.05] blur-[140px]"
        aria-hidden="true"
      />

      {/* Reactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* High-tech fine grid overlay in monochrome */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Subtle vignette border */}
      <div 
        className="absolute inset-0 bg-radial from-transparent via-transparent to-[#07080C]/90 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
