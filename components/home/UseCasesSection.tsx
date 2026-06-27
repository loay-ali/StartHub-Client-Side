"use client";
// src/components/home/UseCasesSection.tsx
import { useState } from "react";
import { Check, DollarSign, Settings, Star, Users } from "lucide-react";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const tabs = [
  {
    label: "Founders", icon: <Star size={13} />,
    headline: "Stop flying blind. Start leading with facts.",
    body: "You check 12 dashboards, get 12 different answers, and still go into the board meeting hoping nothing's on fire. StarHub gives you one source of truth â€” and tells you what needs your attention before you have to ask.",
    points: ["Morning briefing written automatically", "Board deck that updates itself in real time", "Burn rate forecast with scenario modelling", "Opportunity and risk signals in plain English"],
  },
  {
    label: "Operations", icon: <Settings size={13} />,
    headline: "Stop chasing status. Start shipping outcomes.",
    body: "Your team spends more time updating stakeholders than actually fixing things. StarHub eliminates the status meeting by making every answer available in real time â€” and routing the right task to the right person automatically.",
    points: ["Cross-team workflows automated end to end", "Real-time bottleneck detection before escalation", "Vendor and contract tracking in one place", "Status reports that write and send themselves"],
  },
  {
    label: "HR & People", icon: <Users size={13} />,
    headline: "Know who might leave before they tell you.",
    body: "Attrition is expensive. But the signals are there weeks before someone resigns â€” you just can't see them across 14 different tools. StarHub surfaces people risk early so you can act while you still can.",
    points: ["Attrition risk score per employee", "Engagement monitoring across Slack and meetings", "Hiring pipeline speed and blockage alerts", "Comp benchmarking and equity signals"],
  },
  {
    label: "Finance", icon: <DollarSign size={13} />,
    headline: "Real-time finance, not last month's numbers.",
    body: "By the time your finance report lands, the data is already 30 days old. StarHub connects your financial data to the operational reality that drives it â€” so you close faster, forecast further, and catch problems sooner.",
    points: ["Live P&L with operational context", "Runway and burn with scenario modelling", "Churn and revenue concentration risk alerts", "Investor reporting auto-generated on schedule"],
  },
];

export default function UseCasesSection() {
  const [act, setAct] = useState(0);
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "72px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionHeading
            label="Who It's For"
            title={<>Built for <span className="grad-text">Every Leader</span><br />on Your Team</>}
          />
        </Reveal>

        <Reveal>
          {/* Tab bar */}
          <div
            style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center",
              gap: 10, marginBottom: 28,
              padding: "6px", borderRadius: 16,
              background: C.surfaceAlt, border: `1px solid ${C.border}`,
            }}
          >
            {tabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setAct(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "10px 20px", borderRadius: 12,
                  fontSize: 13.5, fontWeight: 600,
                  fontFamily: FONTS.display,
                  background: act === i ? "#fff" : "transparent",
                  border: act === i ? `1px solid ${C.borderMd}` : "1px solid transparent",
                  color: act === i ? C.primaryDk : C.muted,
                  boxShadow: act === i ? "0 2px 8px rgba(10,15,14,.06)" : "none",
                  transition: "all .2s",
                  cursor: "pointer",
                }}
              >
                <span style={{ color: act === i ? C.primary : C.textMuted }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Active content */}
          <div
            style={{
              padding: "40px 44px",
              borderRadius: 24,
              background: "#fff",
              border: `1px solid ${C.border}`,
              boxShadow: "0 4px 24px rgba(10,15,14,.05)",
              transition: "all .25s",
            }}
          >
            <h3
              style={{
                fontFamily: FONTS.display, fontWeight: 800,
                fontSize: "clamp(18px,2.2vw,24px)",
                color: C.text, marginBottom: 14,
              }}
            >
              {tabs[act].headline}
            </h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 28, maxWidth: 580 }}>
              {tabs[act].body}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
              {tabs[act].points.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: C.muted }}>
                  <span
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: C.primaryXL, border: `1px solid ${C.primaryLt}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}
                  >
                    <Check size={10} color={C.primaryDk} />
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
