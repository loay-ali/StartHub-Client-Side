"use client";
import { useState } from "react";
import { Sparkles, Calendar, Award, Building, Filter } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const challengesData = [
  {
    id: 1,
    org: "Mercedes Labs",
    orgType: "Automotive & Logistics",
    avatar: "ML",
    avatarBg: "#0f766e",
    title: "Decarbonization Fleet Tracking Engine",
    industry: "CleanTech",
    reward: "$150,000",
    stage: "Series A+",
    status: "open", // open, closed, soon
    deadline: "12 days left",
  },
  {
    id: 2,
    org: "Mayo Alliance",
    orgType: "Healthcare & Research",
    avatar: "MA",
    avatarBg: "#14b8a6",
    title: "AI-Powered Diagnostics Assister",
    industry: "HealthTech",
    reward: "$200,000",
    stage: "Seed+",
    status: "open",
    deadline: "24 days left",
  },
  {
    id: 3,
    org: "Barclays Labs",
    orgType: "Banking & Finance",
    avatar: "BL",
    avatarBg: "#0d9488",
    title: "Real-time High-frequency Fraud Detection",
    industry: "FinTech",
    reward: "$100,000",
    stage: "Any",
    status: "soon",
    deadline: "Opens in Oct",
  },
  {
    id: 4,
    org: "DHL Ventures",
    orgType: "Supply Chain",
    avatar: "DV",
    avatarBg: "#0f8c7e",
    title: "Precision Robotics Warehouse Routing",
    industry: "DeepTech",
    reward: "$120,000",
    stage: "Series A",
    status: "closed",
    deadline: "Ended",
  },
  {
    id: 5,
    org: "UN Innovation",
    orgType: "Global Development",
    avatar: "UN",
    avatarBg: "#22c55e",
    title: "Automated Multi-lingual Document Analysis",
    industry: "AI/ML",
    reward: "$80,000",
    stage: "Any",
    status: "open",
    deadline: "5 days left",
  },
  {
    id: 6,
    org: "Standard Chartered",
    orgType: "Corporate Banking",
    avatar: "SC",
    avatarBg: "#be123c",
    title: "Cross-Border Settlement AI Engine",
    industry: "FinTech",
    reward: "$175,000",
    stage: "Series B+",
    status: "open",
    deadline: "8 days left",
  },
];

const industries = ["All", "FinTech", "HealthTech", "CleanTech", "AI/ML", "DeepTech"];

export default function ChallengeMarketplace() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredChallenges = challengesData.filter((c) => {
    if (activeFilter === "All") return true;
    return c.industry === activeFilter;
  });

  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Corporate & Govt Challenges"
            title={
              <>
                Innovation <span className="text-teal-500">Marketplace</span>
              </>
            }
            sub="Apply directly to funded innovation challenges published by leading corporates and governments."
          />
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={100}>
          <div className={styles.filterBar}>
            <div className="flex items-center gap-2 text-sm text-teal-800 font-semibold mr-2">
              <Filter size={14} />
              <span>Filter:</span>
            </div>
            {industries.map((ind) => (
              <button
                key={ind}
                className={`${styles.filterChip} ${activeFilter === ind ? styles.filterChipActive : ""}`}
                onClick={() => setActiveFilter(ind)}
              >
                {ind}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Challenges Grid */}
        <div className={styles.challengeGrid}>
          {filteredChallenges.map((ch, idx) => (
            <Reveal key={ch.id} delay={150 + idx * 50}>
              <div className={styles.challengeCard}>
                {/* Org header */}
                <div className={styles.challengeOrg}>
                  <div
                    className={styles.challengeOrgAvatar}
                    style={{ backgroundColor: ch.avatarBg }}
                  >
                    {ch.avatar}
                  </div>
                  <div>
                    <div className={styles.challengeOrgName}>{ch.org}</div>
                    <div className={styles.challengeOrgType}>{ch.orgType}</div>
                  </div>
                </div>

                {/* Challenge Title */}
                <h3 className={styles.challengeTitle}>{ch.title}</h3>

                {/* Challenge Meta */}
                <div className={styles.challengeMeta}>
                  <div>
                    <div className={styles.metaLabel}>Industry</div>
                    <div className={styles.metaValue}>{ch.industry}</div>
                  </div>
                  <div>
                    <div className={styles.metaLabel}>Prize / Budget</div>
                    <div className={styles.metaValue}>{ch.reward}</div>
                  </div>
                  <div>
                    <div className={styles.metaLabel}>Eligibility</div>
                    <div className={styles.metaValue}>{ch.stage}</div>
                  </div>
                  <div>
                    <div className={styles.metaLabel}>Status</div>
                    <div style={{ marginTop: "4px" }}>
                      {ch.status === "open" && (
                        <span className={`${styles.statusBadge} ${styles.statusOpen}`}>Open</span>
                      )}
                      {ch.status === "soon" && (
                        <span className={`${styles.statusBadge} ${styles.statusSoon}`}>Soon</span>
                      )}
                      {ch.status === "closed" && (
                        <span className={`${styles.statusBadge} ${styles.statusClosed}`}>Closed</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer / Deadline */}
                <div className={styles.challengeFooter}>
                  <span>Deadline</span>
                  <span className={ch.status === "open" ? styles.deadlineBlink : ""}>
                    {ch.deadline}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}