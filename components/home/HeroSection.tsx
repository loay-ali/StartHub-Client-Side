"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Activity, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";

/**
 * Local fallback tokens. If `lib/tokens` already exports `C` and `FONTS`
 * with matching keys, swap this block for:
 *   import { C, FONTS } from "@/lib/tokens";
 * Kept inline here so the component is self-contained and easy to review.
 */
const C = {
  panel: "#101826",
  panelDark: "#0d1420",
  border: "rgba(148, 163, 184, 0.14)",
  borderStrong: "rgba(148, 163, 184, 0.26)",
  teal: "#14b8a6",
  tealText: "#5eead4",
  tealSoft: "rgba(20, 184, 166, 0.12)",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  textFaint: "#64748b",
  amberText: "#fcd34d",
  amberBg: "rgba(251, 191, 36, 0.12)",
};

const FONTS = {
  display: "var(--font-display, 'Space Grotesk', system-ui, sans-serif)",
  body: "var(--font-body, 'IBM Plex Sans', system-ui, sans-serif)",
  mono: "var(--font-mono, 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace)",
};

/* ── Types ─────────────────────────────────────────────────────── */

interface OrbitNode {
  label: string;
  status?: string;
  angle: number;
}

/* ── Constants ─────────────────────────────────────────────────── */

const ORBIT_SIZE = 420;
const ORBIT_CENTER = ORBIT_SIZE / 2;
const INNER_RADIUS = 122;
const OUTER_RADIUS = 178;
const INNER_DURATION = "90s";
const OUTER_DURATION = "150s";

const INNER_NODES: OrbitNode[] = [
  { label: "Recruitment", status: "Hiring", angle: -90 },
  { label: "Finance", status: "Synced", angle: -18 },
  { label: "Operations", status: "Healthy", angle: 54 },
  { label: "Analytics", status: "Live", angle: 126 },
  { label: "Growth", status: "Scaling", angle: 198 },
];

const OUTER_NODES: OrbitNode[] = [
  { label: "Predictions", angle: -45 },
  { label: "Risk alerts", angle: 45 },
  { label: "Automation", angle: 135 },
  { label: "Insights", angle: 225 },
];

/* ── Utilities ─────────────────────────────────────────────────── */

/** Converts polar coordinates (baseline 420 box) to a percentage position. */
function getOrbitPoint(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${(((ORBIT_CENTER + radius * Math.cos(rad)) / ORBIT_SIZE) * 100).toFixed(2)}%`,
    top: `${(((ORBIT_CENTER + radius * Math.sin(rad)) / ORBIT_SIZE) * 100).toFixed(2)}%`,
  };
}

const CENTER_PCT = `${((ORBIT_CENTER / ORBIT_SIZE) * 100).toFixed(2)}%`;

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Animated counter hook ───────────────────────────────────── */

function useAnimatedCounter(target: number, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }
    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current - delay;
      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, delay]);

  return count;
}

/* ── Pointer glow hook ───────────────────────────────────────── */

function usePointerGlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 62, y: 32 });
  const [position, setPosition] = useState({ x: 62, y: 32 });

  const handleMove = useCallback((event: MouseEvent) => {
    const el = sectionRef.current;
    if (!el || frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      positionRef.current = {
        x: positionRef.current.x + (x - positionRef.current.x) * 0.15,
        y: positionRef.current.y + (y - positionRef.current.y) * 0.15,
      };
      setPosition({ ...positionRef.current });
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [handleMove]);

  return { sectionRef, position };
}

/* ── Orbit ring — rotates as a whole; each node's label counter-rotates ──
   so it stays upright while it revolves. Two nested layers do the work:
   .shRing (animates the revolution) → .shNodeCounter (animates the
   opposite rotation, same duration, to cancel it for the label only). */

const OrbitRing = React.memo(function OrbitRing({
  nodes,
  radius,
  duration,
  spin,
  variant,
}: {
  nodes: OrbitNode[];
  radius: number;
  duration: string;
  spin: "cw" | "ccw";
  variant: "inner" | "outer";
}) {
  const lineClass = variant === "inner" ? "shLineInner" : "shLineOuter";
  const counterSpin = spin === "cw" ? "ccw" : "cw";

  const points = useMemo(
    () => nodes.map((node) => ({ node, point: getOrbitPoint(node.angle, radius) })),
    [nodes, radius]
  );

  return (
    <div className={`shRing shRing--${spin}`} style={{ ["--dur" as any]: duration }}>
      <svg className="shNetLines" viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`} aria-hidden="true">
        {points.map(({ node, point }) => (
          <line key={node.label} x1={CENTER_PCT} y1={CENTER_PCT} x2={point.left} y2={point.top} className={lineClass} />
        ))}
      </svg>

      {points.map(({ node, point }) => (
        <div key={node.label} className="shNode" style={{ left: point.left, top: point.top }}>
          <div className={`shNodeCounter shNodeCounter--${counterSpin}`}>
            {variant === "inner" ? (
              <div className="shNodeChip" role="img" aria-label={`${node.label}: ${node.status}`}>
                <strong>{node.label}</strong>
                <small>{node.status}</small>
              </div>
            ) : (
              <div className="shNodeOuter" role="img" aria-label={`${node.label} capability`}>
                {node.label}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

/* ── Orbit core — fixed center, doesn't rotate ───────────────────── */

const OrbitCore = React.memo(function OrbitCore() {
  return (
    <div className="shCore" role="img" aria-label="StarHub AI core, scanning 5 of 5 modules">
      <span className="shCoreLabel">StarHub</span>
      <div className="shCoreStatus">
        <span className="shCoreDot" aria-hidden="true" />
        <span>scanning 5/5</span>
        <span className="shCursor" aria-hidden="true">_</span>
      </div>
    </div>
  );
});

/* ── Weekly diagnosis card — anchored product snippet, not decoration ── */

const ReportCard = React.memo(function ReportCard() {
  const runway = useAnimatedCounter(142, 1600, 900) / 10;
  const growth = useAnimatedCounter(184, 1600, 1100) / 10;

  return (
    <div className="shReport" role="status" aria-label="Weekly diagnosis summary">
      <div className="shReportHead">
        <span className="shReportLabel">Weekly diagnosis</span>
        <span className="shLiveDot" aria-hidden="true" />
      </div>

      <div className="shRow">
        <span className="shRowLabel">
          <AlertTriangle size={13} aria-hidden="true" />
          Hiring risk
        </span>
        <span className="shBadge">Elevated</span>
      </div>

      <div className="shRow">
        <span className="shRowLabel">
          <Activity size={13} aria-hidden="true" />
          Cash runway
        </span>
        <span className="shVal">${runway.toFixed(1)}M</span>
      </div>

      <div className="shRow">
        <span className="shRowLabel">
          <TrendingUp size={13} aria-hidden="true" />
          MRR growth
        </span>
        <span className="shVal">+{growth.toFixed(1)}%</span>
      </div>

      <button className="shFooterLink" type="button">
        <span>View full report</span>
        <ArrowRight size={13} aria-hidden="true" />
      </button>
    </div>
  );
});

/* ── Hero orbit — rings + core + report card, as one unit ────────── */

const HeroOrbit = React.memo(function HeroOrbit() {
  return (
    <div
      className="shOrbitWrap"
      role="img"
      aria-label="StarHub AI core connected to live company functions and capabilities"
      tabIndex={0}
      style={{ containerType: "inline-size", containerName: "orbit" } as React.CSSProperties}
    >
      <OrbitRing nodes={INNER_NODES} radius={INNER_RADIUS} duration={INNER_DURATION} spin="cw" variant="inner" />
      <OrbitRing nodes={OUTER_NODES} radius={OUTER_RADIUS} duration={OUTER_DURATION} spin="ccw" variant="outer" />
      <OrbitCore />
      <ReportCard />
    </div>
  );
});

/* ── Main hero section ───────────────────────────────────────────── */

export default function HeroSection() {
  const { sectionRef, position } = usePointerGlow();

  return (
    <section
      ref={sectionRef}
      className="shHero"
      aria-label="StarHub AI operating system hero"
      style={{ containerType: "inline-size", containerName: "hero" } as React.CSSProperties}
    >
      <div className="shBgGrid" aria-hidden="true" />
      <div
        className="shBgGlow"
        style={{
          background: `radial-gradient(640px 480px at ${position.x}% ${position.y}%, ${C.tealSoft}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="shGrid">
        <header className="shCol" style={{ containerType: "inline-size", containerName: "col" } as React.CSSProperties}>
          <div className="shEyebrow">
            <span className="shEyebrowDot" aria-hidden="true" />
            <span>AI operating system</span>
          </div>

          <h1 className="shH1">
            <span className="shH1a">One AI.</span>
            <span className="shH1b">Every decision.</span>
          </h1>

          <p className="shSub">
            StarHub watches your hiring, cash, and growth in one place — then tells you exactly what
            needs attention before it becomes a crisis.
          </p>

          <nav className="shCtas" aria-label="Primary actions">
            <button className="shBtnPrimary" aria-label="Start free trial">
              <span>Start free</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button className="shBtnGhost" aria-label="Book a demo">
              <span>Book a demo</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </header>

        <HeroOrbit />
      </div>

      <style jsx global>{`
        /*
          Declared "global" (not auto-scoped) because this file splits the
          hero into several memoized sub-components that share one
          stylesheet — styled-jsx's automatic scoping only covers the
          component where the <style jsx> tag itself is rendered. Every
          selector below is namespaced under the sh- prefix to avoid
          leaking into the rest of the site.
        */

        .shHero {
          position: relative;
          background: ${C.panelDark};
          overflow: hidden;
          padding: clamp(56px, 9vw, 96px) clamp(20px, 5vw, 56px);
        }

        .shBgGrid {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(0deg, ${C.border} 0px, ${C.border} 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(90deg, ${C.border} 0px, ${C.border} 1px, transparent 1px, transparent 64px);
          -webkit-mask-image: radial-gradient(circle at 60% 35%, black 0%, transparent 72%);
          mask-image: radial-gradient(circle at 60% 35%, black 0%, transparent 72%);
        }

        .shBgGlow {
          position: absolute;
          inset: 0;
        }

        .shGrid {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 480px) minmax(0, 460px);
          gap: clamp(32px, 6vw, 64px);
          align-items: center;
        }

        @container hero (max-width: 760px) {
          .shGrid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .shSub {
            margin-inline: auto;
          }
          .shCtas {
            justify-content: center;
          }
        }

        .shEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ${FONTS.mono};
          font-size: 12px;
          letter-spacing: 0.06em;
          color: ${C.textSecondary};
          padding: 6px 12px;
          border: 1px solid ${C.border};
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          white-space: nowrap;
        }
        .shEyebrowDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${C.teal};
          flex-shrink: 0;
          animation: shPulse 2.4s ease-in-out infinite;
        }

        .shH1 {
          font-family: ${FONTS.display};
          font-size: clamp(30px, 11cqi, 56px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 20px 0 18px;
        }
        .shH1 span {
          display: block;
        }
        .shH1a {
          font-weight: 700;
          color: ${C.text};
        }
        .shH1b {
          font-weight: 500;
          color: ${C.tealText};
        }

        .shSub {
          font-family: ${FONTS.body};
          font-size: clamp(14px, 4cqi, 17px);
          line-height: 1.6;
          color: ${C.textSecondary};
          max-width: 42ch;
          margin: 0 0 32px;
        }

        .shCtas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .shBtnPrimary,
        .shBtnGhost {
          font-family: ${FONTS.body};
          font-weight: 600;
          font-size: 14px;
          padding: 12px 22px;
          border-radius: 8px;
          display: inline-flex;
          gap: 8px;
          align-items: center;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .shBtnPrimary {
          background: ${C.teal};
          color: #04211c;
          border: 1px solid transparent;
        }
        .shBtnPrimary:hover {
          background: #2dd4bf;
        }
        .shBtnGhost {
          background: transparent;
          color: ${C.text};
          border: 1px solid ${C.borderStrong};
        }
        .shBtnGhost:hover {
          border-color: ${C.teal};
          color: ${C.tealText};
        }
        .shBtnPrimary:focus-visible,
        .shBtnGhost:focus-visible,
        .shFooterLink:focus-visible,
        .shOrbitWrap:focus-visible {
          outline: 2px solid ${C.teal};
          outline-offset: 2px;
        }

        .shOrbitWrap {
          position: relative;
          width: 100%;
          max-width: 420px;
          min-width: 200px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        .shRing {
          position: absolute;
          inset: 0;
          transform-origin: 50% 50%;
          animation-duration: var(--dur);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .shRing--cw {
          animation-name: shSpinCW;
        }
        .shRing--ccw {
          animation-name: shSpinCCW;
        }

        .shNetLines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .shNetLines line {
          stroke-width: 1;
        }
        .shLineInner {
          stroke: rgba(94, 234, 212, 0.22);
        }
        .shLineOuter {
          stroke: ${C.border};
        }

        .shNode {
          position: absolute;
          transform: translate(-50%, -50%);
        }
        .shNodeCounter {
          display: block;
          animation-duration: var(--dur);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .shNodeCounter--cw {
          animation-name: shSpinCW;
        }
        .shNodeCounter--ccw {
          animation-name: shSpinCCW;
        }

        .shNodeChip {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 1.6cqi 2.6cqi;
          background: ${C.panel};
          border: 1px solid ${C.border};
          border-radius: 6px;
          min-width: max-content;
        }
        .shNodeChip strong {
          font-family: ${FONTS.body};
          font-size: clamp(9px, 2.8cqi, 11.5px);
          font-weight: 600;
          color: ${C.text};
          line-height: 1.1;
          white-space: nowrap;
        }
        .shNodeChip small {
          font-family: ${FONTS.mono};
          font-size: clamp(7.5px, 2.3cqi, 9.5px);
          color: ${C.tealText};
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .shNodeOuter {
          font-family: ${FONTS.mono};
          font-size: clamp(7.5px, 2.3cqi, 9.5px);
          color: ${C.textFaint};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1.2cqi 2.2cqi;
          border: 1px solid ${C.border};
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.015);
          white-space: nowrap;
        }

        .shCore {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 29cqi;
          aspect-ratio: 1 / 1;
          border-radius: 20px;
          background: linear-gradient(160deg, ${C.panel}, ${C.panelDark});
          border: 1px solid rgba(20, 184, 166, 0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 4px;
          padding: 8cqi;
          z-index: 3;
        }
        .shCoreLabel {
          font-family: ${FONTS.display};
          font-weight: 700;
          font-size: clamp(12px, 4.6cqi, 16px);
          color: ${C.text};
        }
        .shCoreStatus {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-family: ${FONTS.mono};
          font-size: clamp(8px, 2.8cqi, 10.5px);
          color: ${C.tealText};
        }
        .shCoreDot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${C.teal};
          flex-shrink: 0;
          animation: shPulse 1.8s ease-in-out infinite;
        }
        .shCursor {
          animation: shBlink 1s steps(1) infinite;
        }

        .shReport {
          position: absolute;
          right: -7cqi;
          bottom: -9cqi;
          width: 54cqi;
          background: ${C.panel};
          border: 1px solid ${C.borderStrong};
          border-radius: 12px;
          padding: 3cqi 3.4cqi;
          z-index: 4;
          box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.5);
        }
        .shReportHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.2cqi;
        }
        .shReportLabel {
          font-family: ${FONTS.mono};
          font-size: clamp(8px, 2.4cqi, 10px);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: ${C.textFaint};
        }
        .shLiveDot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${C.teal};
          flex-shrink: 0;
          animation: shPulse 2s ease-in-out infinite;
        }
        .shRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-family: ${FONTS.body};
          font-size: clamp(10px, 2.9cqi, 12.5px);
          color: ${C.textSecondary};
          margin-bottom: 1.8cqi;
        }
        .shRowLabel {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          color: ${C.textFaint};
        }
        .shRowLabel svg {
          flex-shrink: 0;
        }
        .shVal {
          font-family: ${FONTS.mono};
          font-weight: 600;
          color: ${C.text};
          white-space: nowrap;
        }
        .shBadge {
          background: ${C.amberBg};
          color: ${C.amberText};
          font-size: clamp(8.5px, 2.4cqi, 10.5px);
          padding: 2px 7px;
          border-radius: 5px;
          font-weight: 600;
          font-family: ${FONTS.mono};
          white-space: nowrap;
        }
        .shFooterLink {
          margin-top: 2cqi;
          padding-top: 2.2cqi;
          border-top: 1px solid ${C.border};
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: ${FONTS.body};
          font-size: clamp(10px, 2.6cqi, 12px);
          font-weight: 600;
          color: ${C.tealText};
          white-space: nowrap;
          background: none;
          border-left: none;
          border-right: none;
          border-bottom: none;
          width: 100%;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .shFooterLink:hover {
          color: ${C.teal};
        }

        .shOrbitWrap:hover .shRing,
        .shOrbitWrap:focus-within .shRing,
        .shOrbitWrap:hover .shNodeCounter,
        .shOrbitWrap:focus-within .shNodeCounter {
          animation-play-state: paused;
        }

        @keyframes shSpinCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes shSpinCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes shPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }
        @keyframes shBlink {
          0%,
          50% {
            opacity: 1;
          }
          50.01%,
          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shRing,
          .shNodeCounter,
          .shCoreDot,
          .shLiveDot,
          .shEyebrowDot,
          .shCursor {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}