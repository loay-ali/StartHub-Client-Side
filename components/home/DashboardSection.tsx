"use client";
// src/components/home/DashboardSection.tsx
import { Activity, Brain, DollarSign, Star, TrendingUp, Users, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { motion } from "framer-motion";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const revData = [
  { m: "Jan", rev: 42000 }, { m: "Feb", rev: 48000 }, { m: "Mar", rev: 44000 },
  { m: "Apr", rev: 61000 }, { m: "May", rev: 73000 }, { m: "Jun", rev: 89000 },
  { m: "Jul", rev: 94000 },
];
const kpis = [
  { label: "Health",      value: "87/100", delta: "+5 pts",  color: C.primary, icon: <Activity size={12} />   },
  { label: "MRR",         value: "$94.2K", delta: "↑ 18%",   color: C.green,   icon: <DollarSign size={12} /> },
  { label: "Churn Risk",  value: "3.2%",   delta: "↓ 0.8%",  color: C.green,   icon: <TrendingUp size={12} /> },
  { label: "Hiring Risk", value: "Medium", delta: "⚠ Alert", color: C.amber,   icon: <Users size={12} />      },
  { label: "Team Score",  value: "72%",    delta: "↑ 4%",    color: C.primary, icon: <Star size={12} />       },
  { label: "Efficiency",  value: "91%",    delta: "↑ 12%",   color: C.green,   icon: <Zap size={12} />        },
];
const hMetrics = [
  { name: "Health Score", value: 87, fill: C.primary },
  { name: "Productivity", value: 72, fill: C.green   },
  { name: "Efficiency",   value: 91, fill: C.teal2   },
];

export default function DashboardSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="Live Dashboard"
            title={<>Every Number That Matters,<br /><span className="grad-text">Always Up to Date</span></>}
            sub="No more chasing spreadsheets. One dashboard shows the full health of your company — revenue, risk, people, and ops — refreshed in real time."
          />
        </Reveal>

        <Reveal>
          {/* Mock browser window */}
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${C.borderMd}`,
              boxShadow: "0 24px 80px rgba(20,184,166,.1), 0 4px 16px rgba(10,15,14,.06)",
            }}
          >
            {/* Browser chrome */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 20px",
                background: C.surfaceAlt,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#FC685D", "#FDBC40", "#34C749"].map((c) => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                {/* URL bar */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "4px 12px", borderRadius: 8,
                    background: "#fff", border: `1px solid ${C.border}`,
                    fontSize: 11, color: C.muted, fontFamily: FONTS.mono,
                  }}
                >
                  <span style={{ fontSize: 10, color: C.green }}>🔒</span>
                  starhub.ai/dashboard
                </div>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.green }}>
                <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
                Live · 2s ago
              </span>
            </div>

            <div style={{ padding: 24, background: "#fff" }}>
              {/* KPI strip */}
              <div
                style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
                  gap: 12, marginBottom: 16,
                }}
              >
                {kpis.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: "14px 16px", borderRadius: 16,
                      background: C.surfaceAlt, border: `1px solid ${C.border}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <span style={{ color: k.color }}>{k.icon}</span>
                      <span style={{ fontSize: 11, color: C.muted }}>{k.label}</span>
                    </div>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18, color: C.text, marginBottom: 4 }}>{k.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: k.color }}>{k.delta}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart row */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
                {/* Revenue area chart */}
                <div style={{ padding: 20, borderRadius: 18, background: C.surfaceAlt, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: C.muted, marginBottom: 4, fontFamily: FONTS.mono }}>Monthly Revenue</div>
                      <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: C.text }}>$94,200</div>
                    </div>
                    <span
                      style={{
                        padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                        background: "rgba(34,197,94,.08)", color: C.green, border: "1px solid rgba(34,197,94,.2)",
                      }}
                    >
                      ↑ 28.6% MoM
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={revData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={C.primary} stopOpacity={0.18} />
                          <stop offset="95%" stopColor={C.primary} stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="m" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                      <Tooltip
                        contentStyle={{
                          background: "#fff", border: `1px solid ${C.borderMd}`,
                          borderRadius: 12, fontSize: 12, color: C.text,
                        }}
                      />
                      <Area type="monotone" dataKey="rev" stroke={C.primary} strokeWidth={2.5} fill="url(#revGrad)" isAnimationActive />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Health radial */}
                <div style={{ padding: 20, borderRadius: 18, background: C.surfaceAlt, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: C.muted, marginBottom: 10, fontFamily: FONTS.mono }}>Health Scores</div>
                  <ResponsiveContainer width="100%" height={108}>
                    <RadialBarChart innerRadius="28%" outerRadius="100%" data={hMetrics} startAngle={90} endAngle={-270}>
                      <RadialBar dataKey="value" cornerRadius={5} background={{ fill: C.border }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 12 }}>
                    {hMetrics.map((m) => (
                      <div key={m.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.fill }} />
                          <span style={{ color: C.muted }}>{m.name}</span>
                        </div>
                        <span style={{ fontWeight: 800, color: C.text }}>{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insight card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.4 }}
                style={{
                  padding: "16px 20px", borderRadius: 16,
                  display: "flex", gap: 12, alignItems: "flex-start",
                  background: "rgba(20,184,166,.04)",
                  border: "1px solid rgba(20,184,166,.16)",
                }}
              >
                <div
                  style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(20,184,166,.1)",
                  }}
                >
                  <Brain size={14} color={C.primary} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: ".09em",
                      color: C.primary, fontFamily: FONTS.mono,
                    }}
                  >
                    AI Insight
                  </span>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginTop: 4 }}>
                    Engineering velocity dropped 18% this sprint — 3 unresolved blockers in Jira are the likely cause.
                    Recommend a blocker review by Thursday to protect your Q3 milestones.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}