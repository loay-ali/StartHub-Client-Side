"use client";
import { Building2, Rocket, Users, Handshake, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import { ecosystemStats, type EcosystemStat } from "@/constants/ecosystem-stats";
import styles from "./ecosystem.module.css";

// Icon per stat key — kept separate from the data itself so the stats
// config stays plain data (safe to fetch from an API later).
const METRIC_ICONS: Record<EcosystemStat["key"], React.ReactNode> = {
  organizations: <Building2 size={20} />,
  startups: <Rocket size={20} />,
  investors: <Users size={20} />,
  partnerships: <Handshake size={20} />,
  matches: <Sparkles size={20} />,
};

export default function MetricsSection() {
  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Live Platform Activity"
            title={
              <>
                Ecosystem Metrics <span className="text-teal-500">In Real-Time</span>
              </>
            }
            sub="Our AI constantly monitors and optimizes matchmaking, funding pipelines, and corporate challenges."
          />
        </Reveal>

        <div className={styles.metricsGrid}>
          {ecosystemStats.map((item, idx) => (
            <Reveal key={item.key} delay={idx * 100}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap}>
                  {METRIC_ICONS[item.key]}
                </div>
                <div className={styles.metricValue}>
                  {item.value.toLocaleString()}{item.suffix ?? ""}
                </div>
                <div className={styles.metricLabel}>{item.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}