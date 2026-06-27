"use client";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const investors = [
  {
    name: "Sequoia Capital",
    type: "Venture Capital",
    avatar: "S",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    thesis: "Backing bold founders building legendary companies from seed to growth stage.",
    ticket: "$1M - $15M",
    investments: "1,200+",
    sectors: ["AI/ML", "SaaS", "DeepTech"],
    compat: "98%",
    compatVal: 98,
  },
  {
    name: "Andreessen Horowitz",
    type: "Venture Capital",
    avatar: "A",
    avatarBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    thesis: "Investing in technology shaping the next decade across software, bio, and crypto.",
    ticket: "$2M - $20M",
    investments: "850+",
    sectors: ["SaaS", "BioTech", "FinTech"],
    compat: "94%",
    compatVal: 94,
  },
  {
    name: "Y Combinator",
    type: "Seed Accelerator",
    avatar: "Y",
    avatarBg: "linear-gradient(135deg, #dc3545, #be123c)",
    thesis: "Helping early-stage startups build product, find customers, and secure first funding.",
    ticket: "$500k Flat",
    investments: "4,000+",
    sectors: ["All Sectors", "SaaS"],
    compat: "88%",
    compatVal: 88,
  },
  {
    name: "SoftBank Vision Fund",
    type: "Growth Capital",
    avatar: "SB",
    avatarBg: "linear-gradient(135deg, #be123c, #881337)",
    thesis: "Providing massive growth capital to category leaders utilizing AI.",
    ticket: "$20M - $100M",
    investments: "120+",
    sectors: ["AI/ML", "Mobility"],
    compat: "82%",
    compatVal: 82,
  },
  {
    name: "Angel Syndicate Alpha",
    type: "Angel Syndicate",
    avatar: "AA",
    avatarBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    thesis: "Pre-seed and seed financing for hard engineering problems and deep technical systems.",
    ticket: "$100k - $500k",
    investments: "48",
    sectors: ["DeepTech", "Security"],
    compat: "90%",
    compatVal: 90,
  },
  {
    name: "General Catalyst",
    type: "Venture Capital",
    avatar: "GC",
    avatarBg: "linear-gradient(135deg, #0f8c7e, #0a5c55)",
    thesis: "Collaborating with founders to create long-term positive systemic change.",
    ticket: "$1.5M - $12M",
    investments: "620+",
    sectors: ["HealthTech", "SaaS"],
    compat: "92%",
    compatVal: 92,
  },
];

export default function InvestorDiscovery() {
  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Capital Networks"
            title={
              <>
                Global Vetted <span className="text-teal-500">Investor Network</span>
              </>
            }
            sub="Meet top-tier venture funds, accelerator programs, and active angel syndicates integrated with StarHub AI."
          />
        </Reveal>

        <div className={styles.investorGrid}>
          {investors.map((inv, idx) => (
            <Reveal key={inv.name} delay={idx * 60}>
              <div className={styles.investorCard}>
                {/* Header */}
                <div className={styles.investorHeader}>
                  <div
                    className={styles.investorAvatar}
                    style={{ background: inv.avatarBg }}
                  >
                    {inv.avatar}
                  </div>
                  <div>
                    <h4 className={styles.investorName}>{inv.name}</h4>
                    <div className={styles.investorType}>{inv.type}</div>
                  </div>
                </div>

                {/* Thesis */}
                <p className={styles.investorThesis}>{inv.thesis}</p>

                {/* Stats */}
                <div className={styles.investorStats}>
                  <div className={styles.investorStatCard}>
                    <div className={styles.investorStatValue}>{inv.ticket}</div>
                    <div className={styles.investorStatLabel}>Ticket Size</div>
                  </div>
                  <div className={styles.investorStatCard}>
                    <div className={styles.investorStatValue}>{inv.investments}</div>
                    <div className={styles.investorStatLabel}>Portfolio</div>
                  </div>
                </div>

                {/* Sectors */}
                <div className={styles.investorSectors}>
                  {inv.sectors.map((sec) => (
                    <span key={sec} className={styles.tag}>
                      {sec}
                    </span>
                  ))}
                </div>

                {/* AI Compatibility bar */}
                <div className={styles.aiCompatRow}>
                  <span className={styles.aiCompatLabel}>Mandate Match</span>
                  <div className={styles.aiCompatBarWrap}>
                    <div
                      className={styles.aiCompatFill}
                      style={{ width: `${inv.compatVal}%` }}
                    />
                  </div>
                  <span className={styles.aiCompatScore}>{inv.compat}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
