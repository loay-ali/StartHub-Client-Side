"use client";
import { Building2, DollarSign, Users, Award, Briefcase, Globe } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const metrics = [
  {
    icon: <Building2 size={20} />,
    value: "2,480+",
    label: "Active Startups",
  },
  {
    icon: <DollarSign size={20} />,
    value: "$680M+",
    label: "Capital Allocated",
  },
  {
    icon: <Briefcase size={20} />,
    value: "142",
    label: "Active Corporate Challenges",
  },
  {
    icon: <Users size={20} />,
    value: "350+",
    label: "Vetted Investors",
  },
  {
    icon: <Globe size={20} />,
    value: "45+",
    label: "Countries Connected",
  },
  {
    icon: <Award size={20} />,
    value: "94.2%",
    label: "AI Match Success Rate",
  },
];

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
          {metrics.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap}>
                  {item.icon}
                </div>
                <div className={styles.metricValue}>{item.value}</div>
                <div className={styles.metricLabel}>{item.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
