'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Types ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'hub' | 'node';
  opacity: number;
  targetOpacity: number;
  pulsePhase: number;
  color: string;
}

/* ─── Design Tokens (synced with your C object) ─── */
const COLORS = {
  primary: '#0F766E',
  primaryLt: '#5EEAD4',
  primaryXL: '#CCFBF1',
  primaryXXL: '#F0FDFA',
  teal3: '#14B8A6',
  muted: '#94A3B8',
};

const PHASE_KEYS = ['connecting', 'memory', 'agents', 'syncing', 'ready'] as const;
const PHASE_DURATIONS = [900, 900, 900, 900, 800]; // ms
const TOTAL_DURATION = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

/* ─── Component ─── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {

  const t = useTranslations();

  const PHASES = [
    t('public.loading.connecting-your-company-data'),
    t('public.loading.building-company-memory'),
    t('public.loading.awakening-ai-agents'),
    t('public.loading.syncing-intelligence-layer'),
    t("public.loading.your-companys-brain-is-ready"),
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const phaseRef = useRef<(typeof PHASE_KEYS)[number]>('connecting');

  /* ─── Canvas Setup ─── */
  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 15000), 80);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isHub = i === 0;
      particles.push({
        x: isHub ? w / 2 : Math.random() * w,
        y: isHub ? h / 2 : Math.random() * h,
        vx: isHub ? 0 : (Math.random() - 0.5) * 0.3,
        vy: isHub ? 0 : (Math.random() - 0.5) * 0.3,
        radius: isHub ? 6 : Math.random() * 2 + 1.5,
        type: isHub ? 'hub' : 'node',
        opacity: 0,
        targetOpacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isHub ? COLORS.primaryLt : COLORS.primary,
      });
    }
    particlesRef.current = particles;
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // Subtle radial gradient background
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      gradient.addColorStop(0, 'rgba(240, 253, 250, 0.5)');
      gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const hub = particlesRef.current[0];
      const phase = phaseRef.current;
      const time = Date.now() / 1000;

      // ── Memory Rings ──
      if (phase !== 'connecting') {
        const baseRadius = Math.min(w, h) * 0.15;
        const rings = phase === 'ready' ? 3 : phase === 'syncing' ? 2 : 1;
        for (let r = 0; r < rings; r++) {
          const radius = baseRadius + r * 30;
          const rotation = time * (0.2 + r * 0.1) + (r * Math.PI) / 3;
          ctx.beginPath();
          ctx.arc(hub.x, hub.y, radius, rotation, rotation + Math.PI * 1.5);
          ctx.strokeStyle = COLORS.primaryLt;
          ctx.globalAlpha = 0.1 + r * 0.05;
          ctx.lineWidth = 1;
          ctx.setLineDash([8, 12]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.globalAlpha = 1;
      }

      // ── Agent Auras ──
      if (phase === 'agents' || phase === 'syncing' || phase === 'ready') {
        const agentCount = phase === 'ready' ? 6 : phase === 'syncing' ? 4 : 3;
        for (let i = 0; i < agentCount; i++) {
          const angle = time * 0.3 + (i * Math.PI * 2) / agentCount;
          const dist = 60 + Math.sin(time + i) * 10;
          const ax = hub.x + Math.cos(angle) * dist;
          const ay = hub.y + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(ax, ay, 3, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.teal3;
          ctx.globalAlpha = 0.7 + Math.sin(time * 2 + i) * 0.3;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(hub.x, hub.y);
          ctx.lineTo(ax, ay);
          ctx.strokeStyle = COLORS.primaryLt;
          ctx.globalAlpha = 0.2;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // ── Connections ──
      let connectRange = 0;
      let lineOpacity = 0;
      switch (phase) {
        case 'connecting':
          connectRange = 180 * 0.3;
          lineOpacity = 0.15;
          break;
        case 'memory':
          connectRange = 180 * 0.6;
          lineOpacity = 0.25;
          break;
        case 'agents':
          connectRange = 180 * 0.9;
          lineOpacity = 0.35;
          break;
        case 'syncing':
          connectRange = 180;
          lineOpacity = 0.45;
          break;
        case 'ready':
          connectRange = 180 * 1.2;
          lineOpacity = 0.5;
          break;
      }

      for (let i = 1; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const dx = hub.x - p.x;
        const dy = hub.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectRange) {
          const strength = 1 - dist / connectRange;
          ctx.beginPath();
          ctx.moveTo(hub.x, hub.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = COLORS.primaryLt;
          ctx.globalAlpha = strength * lineOpacity;
          ctx.lineWidth = strength * 1.5;
          ctx.stroke();

          // Data packets
          if (phase === 'syncing' || phase === 'ready') {
            const packetPos = (time + i * 0.5) % 1;
            const px = hub.x + (p.x - hub.x) * packetPos;
            const py = hub.y + (p.y - hub.y) * packetPos;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = COLORS.primaryLt;
            ctx.globalAlpha = strength * 0.8;
            ctx.fill();
          }
        }

        // Inter-node connections
        if (phase !== 'connecting') {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j];
            const ddx = p.x - p2.x;
            const ddy = p.y - p2.y;
            const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (ddist < connectRange * 0.5) {
              const s = 1 - ddist / (connectRange * 0.5);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = COLORS.primaryXL;
              ctx.globalAlpha = s * lineOpacity * 0.4;
              ctx.lineWidth = s * 0.5;
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      // ── Draw Particles ──
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        const margin = 50;
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        if (p.y > h + margin) p.y = -margin;
        if (p.opacity < p.targetOpacity) p.opacity += 0.02;
        p.pulsePhase += 0.03;

        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        const r = p.radius * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        if (p.type === 'hub') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.primaryXL;
          ctx.globalAlpha = p.opacity * 0.2;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    },
    []
  );

  /* ─── Animation Loop ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0,
      h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      draw(ctx, w, h);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles, draw]);

  /* ─── Progress / Phase Logic ─── */
  useEffect(() => {
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / TOTAL_DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 3); // easeOutCubic
      const pct = Math.floor(eased * 100);
      setProgress(pct);

      // Determine phase
      let accumulated = 0;
      let newPhase = 0;
      for (let i = 0; i < PHASE_DURATIONS.length; i++) {
        accumulated += PHASE_DURATIONS[i];
        if (elapsed < accumulated) {
          newPhase = i;
          break;
        }
        newPhase = i + 1;
      }

      if (newPhase !== phaseIndex && newPhase < PHASE_KEYS.length) {
        setPhaseIndex(newPhase);
        phaseRef.current = PHASE_KEYS[newPhase];
      }

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        // Complete
        setTimeout(() => setExiting(true), 400);
        setTimeout(onComplete, 1200);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, phaseIndex]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${exiting ? 'pointer-events-none opacity-0 scale-[1.02]' : ''}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Logo Mark */}
        <div className="mb-10 h-16 w-16 animate-[logoReveal_0.8s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_both]">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="8" fill="#0F766E" opacity="0.9" />
            <circle cx="32" cy="32" r="5" fill="#5EEAD4" />
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="24"
              stroke="#CCFBF1"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              opacity="0.6"
              className="origin-center animate-[spin_8s_linear_infinite]"
            />
            <g className="origin-center animate-[spin_8s_linear_infinite]">
              <circle cx="56" cy="32" r="3" fill="#0F766E" className="animate-[orbitPulse_2s_ease-in-out_infinite]" />
              <circle cx="32" cy="8" r="2.5" fill="#14B8A6" className="animate-[orbitPulse_2s_ease-in-out_infinite_0.5s]" />
              <circle cx="8" cy="32" r="2" fill="#5EEAD4" className="animate-[orbitPulse_2s_ease-in-out_infinite_1s]" />
            </g>
            <line x1="32" y1="32" x2="56" y2="32" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.4" />
            <line x1="32" y1="32" x2="32" y2="8" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.4" />
            <line x1="32" y1="32" x2="8" y2="32" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.4" />
            <circle cx="32" cy="32" r="28" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.15">
              <animate attributeName="r" values="28;30;28" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.08;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Story Text */}
        <div className="relative mb-12 h-8 min-w-[300px] overflow-hidden">
          {PHASES.map((text, i) => {
            const isActive = i === phaseIndex;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-0 whitespace-nowrap text-sm font-medium uppercase tracking-[0.08em] text-[#0F766E] transition-all duration-500"
                style={{
                  transform: isActive
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(20px)',
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(4px)',
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative h-0.5 w-[200px] overflow-hidden rounded-full bg-[#F0FDFA]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0F766E] to-[#5EEAD4] shadow-[0_0_12px_rgba(94,234,212,0.4)] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-2 w-10 -translate-y-1/2 rounded-full transition-[left,opacity] duration-100 ease-linear"
            style={{
              left: `calc(${progress}% - 20px)`,
              opacity: progress > 5 && progress < 95 ? 1 : 0,
              background: 'radial-gradient(ellipse, rgba(94,234,212,0.6) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        </div>

        {/* Percentage */}
        {/* <div className="mt-4 font-mono text-[11px] font-medium tracking-[0.1em] text-[#64748B]">
          {progress}%
        </div> */}

        {/* Status Dots */}
        {/* <div className="mt-8 flex gap-1.5">
          {PHASES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-400 ${
                i < phaseIndex
                  ? 'bg-[#5EEAD4]'
                  : i === phaseIndex
                    ? 'scale-125 bg-[#0F766E] shadow-[0_0_8px_rgba(15,118,110,0.4)]'
                    : 'bg-[#CCFBF1]'
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}