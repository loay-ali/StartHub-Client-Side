"use client";
// src/components/home/IntegrationsSection.tsx
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const integrations = [
  { name: "n8n",              cat: "Automation",    color: "#EA4B26" },
  { name: "Odoo",             cat: "ERP",           color: "#714B67" },
  { name: "Notion",           cat: "Knowledge",     color: "#374151" },
  { name: "ClickUp",          cat: "Projects",      color: "#7B68EE" },
  { name: "Calendly",         cat: "Scheduling",    color: "#006BFF" },
  { name: "Zoom",             cat: "Meetings",      color: "#2D8CFF" },
  { name: "Teams",            cat: "Collaboration", color: "#5059C9" },
  { name: "HubSpot",          cat: "CRM",           color: "#FF7A59" },
  { name: "Slack",            cat: "Comms",         color: "#4A154B" },
  { name: "Google Workspace", cat: "Productivity",  color: "#34A853" },
  { name: "Stripe",           cat: "Finance",       color: "#635BFF" },
  { name: "Jira",             cat: "Engineering",   color: "#0052CC" },
];
// Double for seamless loop
const tickerItems = [...integrations, ...integrations];

export default function IntegrationsSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: C.surfaceAlt, overflow: "hidden" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="Integrations"
            title={<>Works With the Tools<br /><span className="grad-text">You Already Use</span></>}
            sub="50+ native connectors. No ETL pipelines. No data engineers. Just plug in and watch it work."
          />
        </Reveal>
      </div>

      {/* Full-bleed scrolling ticker */}
      <div style={{ overflow: "hidden", margin: "0 0 40px", padding: "4px 0" }}>
        <div className="ticker">
          {tickerItems.map((int, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex", flexDirection: "column", alignItems: "center",
                gap: 8, padding: "16px 24px", margin: "0 8px",
                borderRadius: 18, background: "#fff",
                border: `1px solid ${C.border}`,
                minWidth: 116, flexShrink: 0,
                boxShadow: "0 1px 4px rgba(10,15,14,.04)",
              }}
            >
              <div
                style={{
                  width: 38, height: 38, borderRadius: 11,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${int.color}0D`, border: `1px solid ${int.color}22`,
                  color: int.color, fontWeight: 800, fontSize: 14,
                  fontFamily: FONTS.display,
                }}
              >
                {int.name.charAt(0)}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{int.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{int.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center">
          <p style={{ fontSize: 13, color: C.muted }}>
            + 38 more: Pipedrive, Intercom, GitHub, Linear, Datadog, Salesforce, and custom APIs
          </p>
        </Reveal>
      </div>
    </section>
  );
}
