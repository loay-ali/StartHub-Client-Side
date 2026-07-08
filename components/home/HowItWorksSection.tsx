"use client";
// src/components/home/HowItWorksSection.tsx
import { Bell, Brain, Cpu, GitBranch, Zap } from "lucide-react";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const steps = [
  { n: "01", title: "Connect your stack",                icon: <GitBranch size={18} />, color: C.primary,
    body: "50+ native connectors. Slack, HubSpot, Stripe, Notion, Google Workspace, and more — live in under 10 minutes. No dev work required." },
  { n: "02", title: "StarHub builds your company memory", icon: <Brain size={18} />,     color: C.teal2,
    body: "We ingest your history and real-time data, map every relationship between people, metrics, and events, and build your company's intelligence graph." },
  { n: "03", title: "Agents go to work immediately",      icon: <Cpu size={18} />,       color: C.greenDk,
    body: "Specialist AI agents start monitoring, analysing, and surfacing insights straight away — no dashboards to build, no reports to write." },
  { n: "04", title: "You get clear next steps",           icon: <Bell size={18} />,       color: C.amber,
    body: "Prioritised alerts and plain-English recommendations land where your team works — Slack, email, or your dashboard — ranked by business impact." },
  { n: "05", title: "Decisions compound over time",       icon: <Zap size={18} />,       color: C.green,
    body: "Every action you take trains StarHub on your company. The longer you use it, the sharper, faster, and more valuable it becomes." },
];

export default function HowItWorksSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "72px 0", background: C.surfaceAlt }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionHeading
            label="How It Works"
            title={<>Up and Running in<br /><span className="grad-text">Under 30 Minutes</span></>}
            sub="No onboarding calls. No 6-week implementation. No engineers. Just connect and go."
          />
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div
                className="card-lift"
                style={{
                  display: "flex",
                  gap: 24,
                  padding: "28px 28px",
                  borderRadius: 20,
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number watermark */}
                <div
                  style={{
                    position: "absolute",
                    right: 20, top: 14,
                    fontFamily: FONTS.mono,
                    fontSize: 56,
                    fontWeight: 900,
                    color: `${s.color}07`,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {s.n}
                </div>
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0, width: 52, height: 52, borderRadius: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}0D`, border: `1px solid ${s.color}22`, color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                {/* Text */}
                <div style={{ paddingRight: 60 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: s.color, letterSpacing: ".08em", marginBottom: 7 }}>
                    Step {s.n}
                  </div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 9 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
