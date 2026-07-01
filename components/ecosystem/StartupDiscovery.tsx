"use client";
import { Sparkles, ArrowUpRight, MessageSquare } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const startups = [
  {
    name: "Optima AI",
    tagline: "Autonomous customer success agents for high-growth enterprise software.",
    match: "98% Match",
    logoText: "O",
    logoBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    tags: ["AI/ML", "SaaS"],
    traction: [
      { val: "$2.4M ARR", lbl: "Current Traction" },
      { val: "140% YoY", lbl: "Annual Growth" },
    ],
  },
  {
    name: "Quantic Bio",
    tagline: "Generative protein design platform accelerating oncology research pipelines.",
    match: "95% Match",
    logoText: "Q",
    logoBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    tags: ["Biotech", "Health"],
    traction: [
      { val: "Phase 2", lbl: "Clinical Stage" },
      { val: "12 Patents", lbl: "IP Portfolio" },
    ],
  },
  {
    name: "Velo Logistics",
    tagline: "Decentralized autonomous courier network optimized by reinforcement learning.",
    match: "92% Match",
    logoText: "V",
    logoBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    tags: ["Logistics", "DeepTech"],
    traction: [
      { val: "$1.2M GMV", lbl: "Monthly Volume" },
      { val: "40 Corporates", lbl: "Active Clients" },
    ],
  },
  {
    name: "Aura Cyber",
    tagline: "Zero-knowledge security guard for Kubernetes clusters and microservices.",
    match: "91% Match",
    logoText: "A",
    logoBg: "linear-gradient(135deg, #0f8c7e, #0a5c55)",
    tags: ["Cybersec", "SaaS"],
    traction: [
      { val: "$1.8M ARR", lbl: "Current Traction" },
      { val: "99.99% Uptime", lbl: "Security SLA" },
    ],
  },
  {
    name: "Helios Climate",
    tagline: "Next-gen solid state thermal storage cells for high-temperature heavy industry.",
    match: "89% Match",
    logoText: "H",
    logoBg: "linear-gradient(135deg, #22c55e, #16a34a)",
    tags: ["CleanTech", "Climate"],
    traction: [
      { val: "20 MWh", lbl: "Storage Cap" },
      { val: "8 Pilots", lbl: "Industrial Runs" },
    ],
  },
  {
    name: "Omni Retail",
    tagline: "AI personalized dynamic checkout pricing models for retail stores.",
    match: "87% Match",
    logoText: "R",
    logoBg: "linear-gradient(135deg, #dc3545, #be123c)",
    tags: ["Retail", "AI/ML"],
    traction: [
      { val: "$4.5M GMV", lbl: "Yearly Volume" },
      { val: "45k Users", lbl: "Active Customers" },
    ],
  },
];

export default function StartupDiscovery() {
  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Startups"
            title={
              <>
                Vetted Startup <span className="text-teal-500">Discovery</span>
              </>
            }
            sub="Discover high-potential startups matching your investment mandate or strategic partnerships, filtered by AI."
          />
        </Reveal>

        <div className={styles.startupGrid}>
          {startups.map((st, idx) => (
            <Reveal key={st.name} delay={idx * 60}>
              <div className={styles.startupCard}>
                {/* AI Match Badge */}
                <div className={styles.aiMatchBadge}>
                  <Sparkles size={9} style={{ display: "inline-block", marginRight: "3px", verticalAlign: "middle" }} />
                  {st.match}
                </div>

                {/* Logo & Info */}
                <div
                  className={styles.startupLogo}
                  style={{ background: st.logoBg }}
                >
                  {st.logoText}
                </div>
                <h4 className={styles.startupName}>{st.name}</h4>
                <p className={styles.startupTagline}>{st.tagline}</p>

                {/* Meta Tags */}
                <div className={styles.startupMeta}>
                  {st.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Traction grid */}
                <div className={styles.startupTraction}>
                  {st.traction.map((tr, tIdx) => (
                    <div key={tIdx}>
                      <div className={styles.tractionValue}>{tr.val}</div>
                      <div className={styles.tractionLabel}>{tr.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className={styles.cardBtns}>
                  <button className={`${styles.btnSm} ${styles.btnSmPrimary}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <span>Pitch Deck</span>
                    <ArrowUpRight size={12} />
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnSmGhost}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <MessageSquare size={12} />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
