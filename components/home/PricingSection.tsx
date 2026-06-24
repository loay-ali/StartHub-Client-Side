"use client";
// src/components/home/PricingSection.tsx
import { useState } from "react";
import { Check } from "lucide-react";
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

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: C.surfaceAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionHeading
            label="Pricing"
            title={<>Simple Pricing.<br /><span className="grad-text">Real Returns.</span></>}
            sub="Most customers recover the cost of StarHub in the first week â€” the time savings alone pay for it."
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
              <div
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

                <button
                  style={{
                    width: "100%", padding: "14px", borderRadius: 14,
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                    transition: "all .2s", fontFamily: FONTS.display,
                    ...(plan.hi
                      ? { background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`, color: "#fff", border: "none", boxShadow: "0 6px 24px rgba(20,184,166,.28)" }
                      : { background: C.surfaceAlt, color: C.text, border: `1px solid ${C.border}` }),
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.textMuted }}>
            All plans include a 14-day free trial Â- No credit card required Â- Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
