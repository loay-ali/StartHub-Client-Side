"use client";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import styles from "./ecosystem.module.css";
import { heroStats } from "@/constants/hero-stats";

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
  const [statA, statB, statC, statD] = heroStats;
  const cA = useCounter(statA?.value ?? 0, 2000);
  const cB = useCounter(statB?.value ?? 0, 1800);
  const cC = useCounter(statC?.value ?? 0, 1500);
  const cD = useCounter(statD?.value ?? 0, 1200);
  const heroCounters = [cA, cB, cC, cD];

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to determine path style on hover.
  // Uses strokeOpacity (not opacity) for the dim/highlight effect: the
  // lineFlow keyframe animation already drives `opacity` continuously for
  // the ambient flow pulse, and a CSS animation always wins over an inline
  // style for the property it's animating — so setting inline `opacity`
  // here would be silently overridden every frame and hover would never
  // visibly dim the other spokes. `stroke-opacity` is a separate SVG
  // property the keyframe never touches, so it multiplies cleanly with
  // the animated opacity instead of fighting it.
  const getSpokeStyle = (nodeId: string) => {
    if (!hoveredNode) return {};
    if (hoveredNode === nodeId) {
      return {
        stroke: "#14b8a6",
        strokeWidth: "3px",
        filter: "drop-shadow(0 0 6px rgba(20,184,166,0.8))",
        strokeOpacity: 1
      };
    }
    return {
      strokeOpacity: 0.15,
      stroke: "rgba(20,184,166,0.1)"
    };
  };

  const getMeshOpacity = () => {
    return hoveredNode ? 0.05 : 0.15;
  };

  return (
    <section id="hero" data-header-theme="light" className={styles.heroSection}>
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
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="80" fill="url(#centerGlow)" />

              {/* Connecting lines */}
              <line pathLength="100" x1="200" y1="200" x2="80" y2="120" className={styles.heroSpokeFlow} style={{ animationDelay: "0s", ...getSpokeStyle("startups") }} />
              <line pathLength="100" x1="200" y1="200" x2="320" y2="100" className={styles.heroSpokeFlow} style={{ animationDelay: "0.75s", ...getSpokeStyle("investors") }} />
              <line pathLength="100" x1="200" y1="200" x2="280" y2="300" className={styles.heroSpokeFlow} style={{ animationDelay: "1.5s", ...getSpokeStyle("corporates") }} />
              <line pathLength="100" x1="200" y1="200" x2="100" y2="280" className={styles.heroSpokeFlow} style={{ animationDelay: "2.25s", ...getSpokeStyle("programs") }} />

              {/* Faint static mesh between outer nodes */}
              <line x1="80" y1="120" x2="320" y2="100" stroke="rgba(20,184,166,0.15)" strokeWidth="1" style={{ opacity: getMeshOpacity() }} />
              <line x1="320" y1="100" x2="280" y2="300" stroke="rgba(20,184,166,0.15)" strokeWidth="1" style={{ opacity: getMeshOpacity() }} />
              <line x1="280" y1="300" x2="100" y2="280" stroke="rgba(20,184,166,0.15)" strokeWidth="1" style={{ opacity: getMeshOpacity() }} />
              <line x1="100" y1="280" x2="80" y2="120" stroke="rgba(20,184,166,0.15)" strokeWidth="1" style={{ opacity: getMeshOpacity() }} />

              {/* Central hub node */}
              <circle cx="200" cy="200" r="14" fill="#0f766e" stroke="#5eead4" strokeWidth="3" className={styles.heroNodePulse} />
              <circle cx="200" cy="200" r="5" fill="#ffffff" />

              {/* Outer nodes */}
              {/* Node 1 - Startup Hub */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("startups")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx="80"
                  cy="120"
                  r={hoveredNode === "startups" ? 13 : 10}
                  fill="#14b8a6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={styles.heroNodeArrival}
                  style={{
                    animationDelay: "0s",
                    filter: hoveredNode === "startups" ? "drop-shadow(0 0 6px #14b8a6)" : "none"
                  }}
                />
                <circle cx="80" cy="120" r="3" fill="#ffffff" />
                <text
                  x="80"
                  y="95"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter, sans-serif"
                  className={`transition-colors duration-300 select-none ${
                    hoveredNode === "startups"
                      ? "text-teal-500"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  STARTUPS
                </text>
              </g>

              {/* Node 2 - Investor Hub */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("investors")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx="320"
                  cy="100"
                  r={hoveredNode === "investors" ? 15 : 12}
                  fill="#0f766e"
                  stroke="#5eead4"
                  strokeWidth="2"
                  className={styles.heroNodeArrival}
                  style={{
                    animationDelay: "0.75s",
                    filter: hoveredNode === "investors" ? "drop-shadow(0 0 6px #5eead4)" : "none"
                  }}
                />
                <circle cx="320" cy="100" r="4" fill="#ffffff" />
                <text
                  x="320"
                  y="75"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter, sans-serif"
                  className={`transition-colors duration-300 select-none ${
                    hoveredNode === "investors"
                      ? "text-teal-500"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  INVESTORS
                </text>
              </g>

              {/* Node 3 - Corporates */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("corporates")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx="280"
                  cy="300"
                  r={hoveredNode === "corporates" ? 13 : 10}
                  fill="#14b8a6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={styles.heroNodeArrival}
                  style={{
                    animationDelay: "1.5s",
                    filter: hoveredNode === "corporates" ? "drop-shadow(0 0 6px #14b8a6)" : "none"
                  }}
                />
                <circle cx="280" cy="300" r="3" fill="#ffffff" />
                <text
                  x="280"
                  y="325"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter, sans-serif"
                  className={`transition-colors duration-300 select-none ${
                    hoveredNode === "corporates"
                      ? "text-teal-500"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  CORPORATES
                </text>
              </g>

              {/* Node 4 - Accelerators */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("programs")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx="100"
                  cy="280"
                  r={hoveredNode === "programs" ? 12 : 9}
                  fill="#0d9488"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={styles.heroNodeArrival}
                  style={{
                    animationDelay: "2.25s",
                    filter: hoveredNode === "programs" ? "drop-shadow(0 0 6px #14b8a6)" : "none"
                  }}
                />
                <circle cx="100" cy="280" r="3" fill="#ffffff" />
                <text
                  x="100"
                  y="305"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter, sans-serif"
                  className={`transition-colors duration-300 select-none ${
                    hoveredNode === "programs"
                      ? "text-teal-500"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  PROGRAMS
                </text>
              </g>

              {/* Small floating node accents */}
              <circle cx="150" cy="80" r="4" fill="#5eead4" opacity="0.6" />
              <circle cx="250" cy="120" r="3" fill="#14b8a6" opacity="0.8" />
              <circle cx="220" cy="310" r="5" fill="#0f766e" opacity="0.5" />
              <circle cx="120" cy="200" r="4" fill="#14b8a6" opacity="0.7" />
            </svg>

            {/* Inspections Overlay Info Box */}
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[90%] bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/80 px-4 py-3 rounded-2xl shadow-xl shadow-teal-500/5 transition-all duration-300 text-center select-none">
              <p className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-0.5 animate-pulse">
                {hoveredNode ? `${hoveredNode} node active` : "Interactive Innovation Mesh"}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200">
                {hoveredNode === "startups" && "1,240+ vetted startups matching with global capital using real-time deal flow routing."}
                {hoveredNode === "investors" && "380+ venture funds, angel groups, and private equity offices actively deploying capital."}
                {hoveredNode === "corporates" && "Global corporate innovation teams posting challenge statements and seeking partners."}
                {hoveredNode === "programs" && "210+ accelerator batches, incubators, and government grants driving local ecosystems."}
                {!hoveredNode && "Hover over network nodes to inspect live AI transaction links."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}