"use client";
// src/components/home/AgentsSection.tsx
import { useState } from "react";
import { BarChart3, RefreshCw, Settings, Users } from "lucide-react";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

type Agent = {
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  metric: string;
  caps: string[];
  body: string;
  dark: boolean;
};

// Near-black used elsewhere in this file for shadows (rgba(10,15,14,...)) —
// reused here as the literal dark-card background so the two surfaces read
// as one palette, not two unrelated themes.
const DARK_BG = "rgb(10, 15, 14)";

const agents: Agent[] = [
  {
    name: "Recruitment Agent", role: "Talent",
    icon: <Users size={22} />, color: C.greenDk,
    metric: "73% faster hiring",
    caps: ["Pipeline scoring", "Offer prediction", "Bottleneck alerts", "Bias flags"],
    body: "Your recruiting pipeline runs 24/7 — screened, scored, and prioritised — so your team only talks to candidates worth their time.",
    dark: false,
  },
  {
    name: "Analytics Agent", role: "Data",
    icon: <BarChart3 size={22} />, color: C.primary,
    metric: "98% reporting accuracy",
    caps: ["Anomaly detection", "KPI monitoring", "Auto-reports", "Trend forecasting"],
    body: "Every metric, every tool, one view. Your Monday morning report writes itself — and flags the three numbers that actually need your attention.",
    dark: true,
  },
  {
    name: "Agile Management Agent", role: "Delivery",
    icon: <RefreshCw size={22} />, color: C.teal2,
    metric: "2.1× delivery consistency",
    caps: ["Sprint tracking", "Risk flagging", "Velocity prediction", "Blocker detection"],
    body: "Engineering misses get caught before they become missed deadlines. Sprints stay on track. Product and business stay aligned.",
    dark: false,
  },
  {
    name: "Operations Supervisor", role: "Orchestration",
    icon: <Settings size={22} />, color: C.teal,
    metric: "340% ops efficiency gain",
    caps: ["Agent coordination", "Workflow automation", "Priority ranking", "Executive briefings"],
    body: "The agent that manages the agents. It prioritises every alert by business impact and routes work to the right person.",
    dark: true,
  },
];

function AgentCard({
  ag, active, onEnter, onLeave,
}: { ag: Agent; active: boolean; onEnter: () => void; onLeave: () => void }) {
  const fg = ag.dark ? "#fff" : C.text;
  const sub = ag.dark ? "rgba(255,255,255,.62)" : C.muted;
  const border = ag.dark
    ? (active ? `${ag.color}55` : "rgba(255,255,255,.10)")
    : (active ? `${ag.color}30` : C.border);
  const bg = ag.dark
    ? (active ? "rgb(16, 21, 20)" : DARK_BG)
    : (active ? `${ag.color}06` : "#fff");
  const chipBg = ag.dark ? "rgba(255,255,255,.05)" : C.surfaceAlt;
  const chipBorder = ag.dark ? "rgba(255,255,255,.10)" : C.border;
  const chipFg = ag.dark ? "rgba(255,255,255,.72)" : C.muted;

  return (
    <div
      style={{
        flex: "1 1 0%",
        display: "flex",
        flexDirection: "column",
        padding: 28,
        borderRadius: 24,
        height: "100%",
        cursor: "default",
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: active
          ? (ag.dark ? `0 24px 64px rgba(0,0,0,.35)` : `0 24px 64px ${ag.color}12`)
          : (ag.dark ? "0 1px 4px rgba(0,0,0,.18)" : "0 1px 4px rgba(10,15,14,.04)"),
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        transform: active ? "translateY(-6px)" : "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50, height: 50, borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `${ag.color}${ag.dark ? "22" : "0E"}`,
              border: `1px solid ${ag.color}${ag.dark ? "44" : "22"}`,
              color: ag.color, flexShrink: 0,
            }}
          >
            {ag.icon}
          </div>
          <div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: fg }}>{ag.name}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", color: sub, marginTop: 2 }}>{ag.role}</div>
          </div>
        </div>
        <span
          style={{
            padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700,
            background: `${ag.color}${ag.dark ? "1A" : "0D"}`, color: ag.color,
            border: `1px solid ${ag.color}${ag.dark ? "44" : "22"}`, whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ag.color, display: "inline-block" }} />
          Active
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: sub, lineHeight: 1.7, marginBottom: 18 }}>{ag.body}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
        {ag.caps.map((c) => (
          <span
            key={c}
            style={{
              padding: "5px 11px", borderRadius: 8, fontSize: 11.5,
              background: chipBg, border: `1px solid ${chipBorder}`, color: chipFg,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: ag.color }}>{ag.metric}</span>
      </div>
    </div>
  );
}

export default function AgentsSection() {
  const [hov, setHov] = useState<number | null>(null);
  const [row1, row2] = [agents.slice(0, 2), agents.slice(2, 4)];

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "72px 0", background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="AI Agents"
            title={<>Your Team, <span className="grad-text">Multiplied</span></>}
            sub="Four specialist AI agents, each an expert in their domain, working around the clock so your people can focus on what only humans can do."
          />
        </Reveal>

        {/*
          Container query (not viewport) to match the rest of the page's
          fluid-layout approach. Mobile stacks all four cards in one column.
          At desktop width, two rows of two appear side by side — row 2 uses
          row-reverse so the dark/light pairing alternates into a checkerboard
          instead of repeating the same left-right order, which also keeps the
          whole section shorter than a 4-high stack so it reads in one glance.
        */}
        <style jsx>{`
          .bentoWrap { display: flex; flex-direction: column; gap: 18px; }
          .bentoRow { display: flex; flex-direction: column; gap: 18px; }
          @container agents (min-width: 720px) {
            .bentoRow { flex-direction: row; align-items: stretch; }
            .bentoRow.reverse { flex-direction: row-reverse; }
          }
        `}</style>

        <div
          className="bentoWrap"
          style={{ containerType: "inline-size", containerName: "agents" } as React.CSSProperties}
        >
          <div className="bentoRow">
            {row1.map((ag, i) => (
              <Reveal key={ag.name} delay={i * 80}>
                <AgentCard
                  ag={ag}
                  active={hov === i}
                  onEnter={() => setHov(i)}
                  onLeave={() => setHov(null)}
                />
              </Reveal>
            ))}
          </div>
          <div className="bentoRow reverse">
            {row2.map((ag, i) => {
              const idx = i + 2;
              return (
                <Reveal key={ag.name} delay={idx * 80}>
                  <AgentCard
                    ag={ag}
                    active={hov === idx}
                    onEnter={() => setHov(idx)}
                    onLeave={() => setHov(null)}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}