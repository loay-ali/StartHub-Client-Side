"use client";
// src/components/home/SolutionSection.tsx
import { Bell, Brain, Database, GitBranch, TrendingUp, Zap } from "lucide-react";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const steps = [
  { n: "01", label: "Connect",  icon: <GitBranch size={17} />, color: C.primary,  desc: "Plug in 50+ tools in under 10 minutes. No engineers needed." },
  { n: "02", label: "Unify",    icon: <Database size={17} />,  color: C.teal2,    desc: "StarHub builds one living picture of your entire company." },
  { n: "03", label: "Detect",   icon: <Brain size={17} />,     color: C.teal3,    desc: "AI finds patterns, risks, and opportunities in real time." },
  { n: "04", label: "Predict",  icon: <TrendingUp size={17} />,color: C.greenDk,  desc: "Know what's coming â€” not just what already happened." },
  { n: "05", label: "Alert",    icon: <Bell size={17} />,      color: C.amber,    desc: "The right signal reaches the right person before it's urgent." },
  { n: "06", label: "Execute",  icon: <Zap size={17} />,       color: C.green,    desc: "Automated actions close the loop. No manual follow-up." },
];

export default function SolutionSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: C.surfaceAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="The Fix"
            title={
              <>
                One Platform That Knows<br />
                <span className="grad-text">Everything About Your Company</span>
              </>
            }
            sub="StarHub doesn't just show you data. It understands your company â€” and tells you exactly what to do about it."
          />
        </Reveal>

        {/* Step grid â€” horizontal flow 2026 style */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {steps.map((s, i) => (
            <Reveal key={s.label} delay={i * 65}>
              <div
                className="card-lift"
                style={{
                  padding: "28px 24px",
                  borderRadius: 20,
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 18,
                    fontFamily: FONTS.mono,
                    fontSize: 44,
                    fontWeight: 800,
                    color: `${s.color}09`,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    width: 46, height: 46, borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}0E`, border: `1px solid ${s.color}22`,
                    color: s.color, marginBottom: 18,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono, fontSize: 10,
                    color: s.color, letterSpacing: ".07em", marginBottom: 8,
                  }}
                >
                  Step {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display, fontWeight: 700,
                    fontSize: 16, color: C.text, marginBottom: 8,
                  }}
                >
                  {s.label}
                </h3>
                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Glass banner */}
        <Reveal delay={400} style={{ marginTop: 16 }}>
          <div
            style={{
              padding: "32px 40px",
              borderRadius: 22,
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              border: `1.5px solid rgba(20,184,166,.22)`,
              display: "flex",
              alignItems: "center",
              gap: 40,
              flexWrap: "wrap",
              boxShadow: "0 8px 40px rgba(20,184,166,.07)",
            }}
          >
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 21, color: C.text, marginBottom: 8 }}>
                Everything in. Intelligence out.
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
                StarHub sits on top of your existing stack. Nothing to rip and replace â€” just add intelligence to what you already have.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[C.primary, C.teal2, C.greenDk, C.amber, C.green, C.teal3].map((col, i) => (
                <div
                  key={i}
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${col}12`, border: `1px solid ${col}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: col, opacity: 0.7 }} />
                </div>
              ))}
              <div
                style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: C.primaryXL, border: `1px solid ${C.primaryLt}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: C.primaryDk }}>+44</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
