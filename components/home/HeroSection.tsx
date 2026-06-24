"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import styles from "./home.module.css";

const innerChips = [
  { label: "HR",               angle: -90    },
  { label: "Finance",          angle: -38.57 },
  { label: "Operations",       angle:  12.86 },
  { label: "Recruitment",      angle:  64.29 },
  { label: "Sales",            angle: 115.71 },
  { label: "Analytics",        angle: 167.14 },
  { label: "Customer Success", angle: 218.57 },
];
const outerChips = [
  { label: "Live Insights",   angle:  -60 },
  { label: "Predictions",     angle:    0 },
  { label: "Recommendations", angle:   60 },
  { label: "Risk Alerts",     angle:  120 },
  { label: "Opportunities",   angle:  180 },
  { label: "Auto-Actions",    angle:  240 },
];

function OrbitChip({ label, outer }: { label: string; outer: boolean }) {
  return (
    <span className={outer ? styles.chipOuter : styles.chipInner}>
      <span className={outer ? styles.chipDotOuter : styles.chipDotInner} />
      {label}
    </span>
  );
}

function HeroOrbit() {
  const S = 500, cx = 250, cy = 250;
  const rIn = S * 0.268, rOut = S * 0.41;
  const pos = (a: number, r: number) => ({
    x: cx + r * Math.cos((a * Math.PI) / 180),
    y: cy + r * Math.sin((a * Math.PI) / 180),
  });
  return (
    <div className={styles.orbitWrap}>
      <div className={styles.orbitGlow} />
      <div className={styles.orbitGuideInner} />
      <div className={styles.orbitGuideOuter} />
      <div className={styles.orbitRingCw}>
        {innerChips.map(({ label, angle }) => {
          const p = pos(angle, rIn);
          return (
            <div key={label} className={styles.orbitChipItem} style={{ left: p.x, top: p.y }}>
              <div className={styles.orbitCancelCcw}>
                <OrbitChip label={label} outer={false} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.orbitRingCcw}>
        {outerChips.map(({ label, angle }) => {
          const p = pos(angle, rOut);
          return (
            <div key={label} className={styles.orbitChipItem} style={{ left: p.x, top: p.y }}>
              <div className={styles.orbitCancelCw}>
                <OrbitChip label={label} outer={true} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.orbitCore}>
        <div className={styles.orbitCoreWhiteDot} />
        <span className={styles.orbitCoreLabel}>StarHub</span>
        <span className={styles.orbitCoreSub}>Core AI</span>
      </div>
    </div>
  );
}

function useCounter(target: number, duration: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const f = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, [target, duration]);
  return val;
}

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 70, y: 35 });
  const ref = useRef<HTMLElement>(null);
  const c1 = useCounter(2400, 2000);
  const c2 = useCounter(98, 1500);
  const c3 = useCounter(340, 1900);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fn = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener("mousemove", fn);
    return () => el.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section ref={ref} className={styles.heroSection}>
      {/* Mouse-tracked glow â€” background is dynamic so one inline style is unavoidable */}
      <div
        className={styles.heroMouseGlow}
        style={{ background: `radial-gradient(640px 520px at ${mouse.x}% ${mouse.y}%, rgba(20,184,166,.1), transparent 68%)` }}
      />
      <div className={styles.heroDotGrid} />

      <div className="max-w-7xl mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
        <div className={styles.heroGrid}>
          {/* Left */}
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} />
              AI Operating System for Startups
            </div>
            <h1 className={styles.heroH1}>
              Your Startup Runs<br />on Gut Feel.<br />
              <span className={styles.shimmerText}>It Shouldn&apos;t.</span>
            </h1>
            <p className={styles.heroSubtext}>
              StarHub connects every tool your team uses, finds what matters, and tells you exactly
              what to do next â€” before small problems become expensive ones.
            </p>
            <p className={styles.heroSocialProof}>
              Used by 2,400+ startups in fintech, healthtech, and SaaS
            </p>
            <div className={styles.heroChecklist}>
              {[
                "All your tools, one brain",
                "Risks caught before they hurt",
                "Reports written automatically",
                "AI agents that act, not just advise",
              ].map((b) => (
                <div key={b} className={styles.heroCheckItem}>
                  <span className={styles.heroCheckBadge}>
                    <Check size={10} color="var(--c-primary-dk)" />
                  </span>
                  {b}
                </div>
              ))}
            </div>
            <div className={styles.heroCtas}>
              <button className={styles.btnPrimary}>
                Try Free for 14 Days <ArrowRight size={17} />
              </button>
              <button className={styles.btnGhost}>
                See a Live Demo <ChevronRight size={17} />
              </button>
            </div>
            <div className={styles.heroStats}>
              {[
                { v: `${c1.toLocaleString()}+`, l: "Startups using StarHub" },
                { v: `${c2}%`,                  l: "Decision accuracy"      },
                { v: `${c3}%`,                  l: "Ops time saved"         },
              ].map((s) => (
                <div key={s.l}>
                  <div className={styles.heroStatNum}>{s.v}</div>
                  <div className={styles.heroStatLabel}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Orbit */}
          <div className={styles.heroOrbitWrap}>
            <div className={styles.heroOrbitInner}>
              <HeroOrbit />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className={styles.heroTrustBar}>
          <p className={styles.heroTrustLabel}>Backed by founders from</p>
          <div className={styles.heroTrustLogos}>
            {["Y Combinator", "Techstars", "500 Startups", "Sequoia-backed", "a16z Portfolio"].map((co) => (
              <span key={co} className={styles.heroTrustLogo}>{co}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}