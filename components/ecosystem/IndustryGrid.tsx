"use client";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const industries = [
  { name: "Artificial Intelligence", emoji: "🧠", count: "820 Startups" },
  { name: "FinTech", emoji: "💳", count: "412 Startups" },
  { name: "HealthTech & Bio", emoji: "🧬", count: "284 Startups" },
  { name: "CleanTech & Energy", emoji: "🌱", count: "198 Startups" },
  { name: "SaaS & Enterprise", emoji: "☁️", count: "620 Startups" },
  { name: "Cybersecurity", emoji: "🛡️", count: "145 Startups" },
  { name: "Logistics & Mobility", emoji: "🚚", count: "110 Startups" },
  { name: "PropTech & Spaces", emoji: "🏢", count: "95 Startups" },
  { name: "EdTech & Learning", emoji: "🎓", count: "167 Startups" },
  { name: "E-Commerce & Retail", emoji: "🛍️", count: "232 Startups" },
  { name: "Web3 & Blockchain", emoji: "⛓️", count: "180 Startups" },
  { name: "Robotics & IoT", emoji: "🤖", count: "88 Startups" },
];

export default function IndustryGrid() {
  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Explore by Sector"
            title={
              <>
                Browse by <span className="text-teal-500">Industry Sector</span>
              </>
            }
            sub="Find startups, capital, and active corporate briefs categorized across key global technology markets."
          />
        </Reveal>

        <div className={styles.industryGrid}>
          {industries.map((ind, idx) => (
            <Reveal key={ind.name} delay={idx * 40}>
              <div className={styles.industryCard}>
                <div className={styles.industryIconWrap}>
                  {ind.emoji}
                </div>
                <div className={styles.industryName}>{ind.name}</div>
                <div className={styles.industryCount}>{ind.count}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
