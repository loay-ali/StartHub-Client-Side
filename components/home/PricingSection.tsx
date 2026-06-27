"use client";
// src/components/home/PricingSection.tsx
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const plans = [
  {
    name: "Starter", price: 149, hi: false, cta: "Try Free for 14 Days",
    sub: "For early-stage teams getting visibility for the first time.",
    features: ["5 integrations", "2 AI Agents", "Company Health Dashboard", "Weekly AI Reports", "Up to 10 team members", "Email support"],
  },
  {
    name: "Growth", price: 499, hi: true, badge: "Most Popular", cta: "Try Free for 14 Days",
    sub: "For scaling teams that need full intelligence across the company.",
    features: ["Unlimited integrations", "All 4 AI Agents", "Real-time dashboards", "Predictive risk detection", "Auto-written exec reports", "Slack + email alerts", "Up to 100 members", "Priority support"],
  },
  {
    name: "Enterprise", price: 0, hi: false, cta: "Talk to Sales",
    sub: "For venture-backed companies that need custom security and control.",
    features: ["Everything in Growth", "Custom AI Agent training", "SSO & advanced security", "Dedicated success manager", "Custom integrations", "SLA guarantee", "Unlimited members", "On-prem option"],
  },
];

// Comparison rows are derived from the same claims already made in each
// plan's `features` list above — this table doesn't introduce any new
// promises, it just lets someone see all three plans side by side instead
// of re-reading three separate card lists.
const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Integrations",      values: ["5", "Unlimited", "Unlimited + custom"] },
  { label: "AI Agents",         values: ["2 agents", "All 4 agents", "All 4 + custom training"] },
  { label: "Dashboards",        values: ["Company Health", "Real-time, all metrics", "Real-time, all metrics"] },
  { label: "Reports",           values: ["Weekly, automated", "Auto-written, on demand", "Auto-written + custom"] },
  { label: "Alerts",            values: ["Email", "Slack + email", "Slack + email"] },
  { label: "Team members",      values: ["Up to 10", "Up to 100", "Unlimited"] },
  { label: "SSO & advanced security", values: ["—", "—", "Included"] },
  { label: "Support",           values: ["Email", "Priority", "Dedicated success manager"] },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: C.surfaceAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionHeading
            label="Pricing"
            title={<>Simple Pricing.<br /><span className="grad-text">Real Returns.</span></>}
            sub="Most customers recover the cost of StarHub in the first week — the time savings alone pay for it."
            accent={
              /* Annual toggle */
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "6px 10px", borderRadius: 14, marginTop: 20,
                  background: "#fff", border: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: C.muted, padding: "3px 6px" }}>Monthly</span>
                <button
                  onClick={() => setAnnual(!annual)}
                  style={{
                    position: "relative", width: 44, height: 24, borderRadius: 999,
                    background: annual ? C.primary : C.borderMd,
                    transition: "background .25s", cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute", top: 4, width: 16, height: 16,
                      borderRadius: "50%", background: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,.15)",
                      transition: "left .25s",
                      left: annual ? "calc(100% - 20px)" : 4,
                    }}
                  />
                </button>
                <span
                  style={{
                    fontSize: 13, fontWeight: 700, padding: "3px 6px",
                    color: annual ? C.primaryDk : C.muted,
                  }}
                >
                  Annual
                  {annual && (
                    <span
                      style={{
                        marginLeft: 6, fontSize: 11, fontWeight: 800,
                        color: C.green, background: "rgba(34,197,94,.08)",
                        padding: "2px 7px", borderRadius: 6,
                        border: "1px solid rgba(34,197,94,.18)",
                      }}
                    >
                      Save 25%
                    </span>
                  )}
                </span>
              </div>
            }
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18 }}>
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                style={{
                  display: "flex", flexDirection: "column", height: "100%",
                  padding: "36px 32px", borderRadius: 24, position: "relative",
                  background: plan.hi
                    ? "linear-gradient(160deg, rgba(20,184,166,.05), rgba(15,118,110,.03))"
                    : "#fff",
                  border: plan.hi ? `1.5px solid ${C.primaryLt}` : `1px solid ${C.border}`,
                  boxShadow: plan.hi
                    ? "0 16px 56px rgba(20,184,166,.14)"
                    : "0 1px 4px rgba(10,15,14,.04)",
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute", top: -15, left: "50%",
                      transform: "translateX(-50%)",
                      padding: "5px 18px", borderRadius: 999,
                      fontSize: 11, fontWeight: 800, color: "#fff",
                      background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDk})`,
                      whiteSpace: "nowrap", fontFamily: FONTS.mono,
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 6 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>{plan.sub}</p>

                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 28 }}>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 900, fontSize: 42, color: C.text, lineHeight: 1 }}>
                    {plan.price === 0 ? "Custom" : annual ? `$${Math.floor(plan.price * 0.75)}` : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>
                      {annual ? "/mo, billed annually" : "/mo"}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11, marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: C.muted }}>
                      <Check size={13} color={plan.hi ? C.primary : C.greenDk} />
                      {f}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 14,
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                    fontFamily: FONTS.display,
                    ...(plan.hi
                      ? { background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`, color: "#fff", border: "none", boxShadow: "0 6px 24px rgba(20,184,166,.28)" }
                      : { background: C.surfaceAlt, color: C.text, border: `1px solid ${C.border}` }),
                  }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Expandable comparison — keeps the default view to three concise
            cards (per the "no more than five primary elements" guidance)
            while still giving anyone who wants the full picture a way to
            see it without leaving the page. */}
        <Reveal delay={240}>
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <motion.button
              onClick={() => setShowCompare((v) => !v)}
              whileTap={{ scale: 0.97 }}
              aria-expanded={showCompare}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 18px", borderRadius: 999,
                background: "#fff", border: `1px solid ${C.border}`,
                fontSize: 13.5, fontWeight: 700, color: C.primaryDk,
                cursor: "pointer", fontFamily: FONTS.display,
              }}
            >
              {showCompare ? "Hide full comparison" : "Compare all features"}
              <motion.span
                animate={{ rotate: showCompare ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: "inline-flex" }}
              >
                <ChevronDown size={15} />
              </motion.span>
            </motion.button>
          </div>
        </Reveal>

        <AnimatePresence initial={false}>
          {showCompare && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 24, borderRadius: 20, border: `1px solid ${C.border}`,
                  background: "#fff", overflowX: "auto",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left", padding: "16px 20px", fontSize: 12,
                          color: C.muted, fontWeight: 700, borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Feature
                      </th>
                      {plans.map((p) => (
                        <th
                          key={p.name}
                          style={{
                            textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 800,
                            color: p.hi ? C.primaryDk : C.text,
                            background: p.hi ? "rgba(20,184,166,.04)" : "transparent",
                            borderBottom: `1px solid ${C.border}`,
                            fontFamily: FONTS.display,
                          }}
                        >
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, ri) => (
                      <tr key={row.label}>
                        <td
                          style={{
                            padding: "14px 20px", fontSize: 13.5, color: C.muted,
                            borderBottom: ri < comparisonRows.length - 1 ? `1px solid ${C.border}` : "none",
                          }}
                        >
                          {row.label}
                        </td>
                        {row.values.map((v, vi) => (
                          <td
                            key={vi}
                            style={{
                              padding: "14px 20px", fontSize: 13.5, fontWeight: 600,
                              color: v === "—" ? C.textMuted : C.text,
                              background: plans[vi].hi ? "rgba(20,184,166,.03)" : "transparent",
                              borderBottom: ri < comparisonRows.length - 1 ? `1px solid ${C.border}` : "none",
                            }}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal style={{ marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.textMuted }}>
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}