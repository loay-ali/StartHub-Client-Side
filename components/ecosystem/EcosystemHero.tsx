"use client";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import styles from "./ecosystem.module.css";
import { heroStats } from "@/components/ecosystem/hero-stats";

/* ── Animated counter hook ───────────────────────────────────── */
function useCounter(target: number, duration: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let active = true;
    const t0 = Date.now();
    const tick = () => {
      if (!active) return;
      const p = Math.min((Date.now() - t0) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { active = false; };
  }, [target, duration]);
  return val;
}

export default function EcosystemHero() {
  // heroStats always contains exactly 3 entries (startups, investors,
  // matches) — see constants/ecosystem-stats.ts. Hooks can't be called
  // inside a loop/map, so each slot gets its own fixed useCounter call;
  // only the `value` and `label` come from the shared, backend-ready config.
  const [statA, statB, statC] = heroStats;
  const cA = useCounter(statA?.value ?? 0, 2000);
  const cB = useCounter(statB?.value ?? 0, 1800);
  const cC = useCounter(statC?.value ?? 0, 1500);
  const heroCounters = [cA, cB, cC];

  return (
    <section className={styles.heroSection}>
      {/* Background elements */}
      <div className={styles.heroBgMesh} />
      <div className={styles.heroBgGrid} />
      <div className={styles.heroBgBlob1} />
      <div className={styles.heroBgBlob2} />

      <div className={styles.heroInner}>
        <div className={styles.heroGrid}>
          {/* Left Column — Content */}
          <div className={styles.heroContent}>
            {/* Eyebrow */}
            <div className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} />
              AI-Powered Startup Ecosystem
            </div>

            {/* Headline */}
            <h1 className={styles.heroH1}>
              The Connected<br />
              Innovation Network.<br />
              <span className={styles.shimmerText}>Driven by AI.</span>
            </h1>

            {/* Subtext */}
            <p className={styles.heroSub}>
              Instantly bridge startups, global investors, corporate challenges,
              accelerator programs, and ecosystem players. Zero friction. Total alignment.
            </p>

            {/* CTAs */}
            <div className={styles.heroCtas}>
              <button className={`btn-primary ${styles.heroPrimaryButton}`}>
                Join the Ecosystem <ArrowRight size={16} />
              </button>
              <button className={`btn-ghost ${styles.heroSecondaryButton}`}>
                Explore Challenges <ChevronRight size={16} />
              </button>
            </div>

            {/* Cta note */}
            <div className={styles.heroCtaNote}>
              <Check size={12} color="var(--c-green-dk)" />
              <span>Verified members only · Automated compliance · AI vetting</span>
            </div>

            {/* Hero Stats */}
            <div className={styles.heroStats}>
              {heroStats.map((stat, i) => (
                <div className={styles.heroStatItem} key={stat.key}>
                  <span className={styles.heroStatNum}>
                    {heroCounters[i].toLocaleString()}{stat.suffix ?? ""}
                  </span>
                  <span className={styles.heroStatLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Network Visualization */}
          <div className={styles.networkWrap}>
            <svg viewBox="0 0 400 400" className={styles.networkSvg}>
              {/* Central node glow */}
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="80" fill="url(#centerGlow)" />

              {/* Connecting lines — hub-to-node "signal" spokes, all
                  sharing one flow animation (see .heroSpokeFlow) with a
                  slight per-spoke delay so the pulse visibly travels
                  outward instead of four lines blinking in unison. */}
              <line pathLength="100" x1="200" y1="200" x2="80" y2="120" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5" className={styles.heroSpokeFlow} style={{ animationDelay: "0s" }} />
              <line pathLength="100" x1="200" y1="200" x2="320" y2="100" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5" className={styles.heroSpokeFlow} style={{ animationDelay: "0.2s" }} />
              <line pathLength="100" x1="200" y1="200" x2="280" y2="300" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5" className={styles.heroSpokeFlow} style={{ animationDelay: "0.4s" }} />
              <line pathLength="100" x1="200" y1="200" x2="100" y2="280" stroke="rgba(20,184,166,0.55)" strokeWidth="1.5" className={styles.heroSpokeFlow} style={{ animationDelay: "0.6s" }} />

              {/* Faint static mesh between outer nodes — background
                  texture only, intentionally not animated. */}
              <line x1="80" y1="120" x2="320" y2="100" stroke="rgba(20,184,166,0.15)" strokeWidth="1" />
              <line x1="320" y1="100" x2="280" y2="300" stroke="rgba(20,184,166,0.15)" strokeWidth="1" />
              <line x1="280" y1="300" x2="100" y2="280" stroke="rgba(20,184,166,0.15)" strokeWidth="1" />
              <line x1="100" y1="280" x2="80" y2="120" stroke="rgba(20,184,166,0.15)" strokeWidth="1" />

              {/* Central hub node */}
              <circle cx="200" cy="200" r="14" fill="#0f766e" stroke="#5eead4" strokeWidth="3" className={styles.heroNodePulse} />
              <circle cx="200" cy="200" r="5" fill="#ffffff" />

              {/* Outer nodes */}
              {/* Node 1 - Startup Hub */}
              <circle cx="80" cy="120" r="10" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" className={styles.heroNodePulse} />
              <circle cx="80" cy="120" r="3" fill="#ffffff" />
              <text x="80" y="95" textAnchor="middle" fill="#0a0f0e" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">STARTUPS</text>

              {/* Node 2 - Investor Hub */}
              <circle cx="320" cy="100" r="12" fill="#0f766e" stroke="#5eead4" strokeWidth="2" className={styles.heroNodePulse} />
              <circle cx="320" cy="100" r="4" fill="#ffffff" />
              <text x="320" y="75" textAnchor="middle" fill="#0a0f0e" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">INVESTORS</text>

              {/* Node 3 - Corporates */}
              <circle cx="280" cy="300" r="10" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" className={styles.heroNodePulse} />
              <circle cx="280" cy="300" r="3" fill="#ffffff" />
              <text x="280" y="325" textAnchor="middle" fill="#0a0f0e" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">CORPORATES</text>

              {/* Node 4 - Accelerators */}
              <circle cx="100" cy="280" r="9" fill="#0d9488" stroke="#ffffff" strokeWidth="2" className={styles.heroNodePulse} />
              <circle cx="100" cy="280" r="3" fill="#ffffff" />
              <text x="100" y="305" textAnchor="middle" fill="#0a0f0e" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">PROGRAMS</text>

              {/* Small floating node accents */}
              <circle cx="150" cy="80" r="4" fill="#5eead4" opacity="0.6" />
              <circle cx="250" cy="120" r="3" fill="#14b8a6" opacity="0.8" />
              <circle cx="220" cy="310" r="5" fill="#0f766e" opacity="0.5" />
              <circle cx="120" cy="200" r="4" fill="#14b8a6" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}