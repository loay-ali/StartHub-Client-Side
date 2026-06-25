"use client";
import { useState } from "react";
import { Sparkles, Calendar, DollarSign, Clock, MapPin, Send } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const programsData = {
  Accelerators: [
    {
      id: 1,
      name: "StarHub Accelerator Cohort 4",
      org: "StarHub & Techstars",
      emoji: "🚀",
      location: "SF / Hybrid",
      funding: "$120k Seed",
      duration: "3 Months",
      deadline: "Oct 15",
    },
    {
      id: 2,
      name: "FinTech Forward 2026",
      org: "MAS Singapore",
      emoji: "🏦",
      location: "Singapore",
      funding: "$100k Equity-free",
      duration: "10 Weeks",
      deadline: "Nov 1",
    },
  ],
  Grants: [
    {
      id: 3,
      name: "Clean Energy Innovation Grant",
      org: "US Dept of Energy",
      emoji: "🔋",
      location: "US Only",
      funding: "$250k Equity-free",
      duration: "1 Year",
      deadline: "Sep 30",
    },
    {
      id: 4,
      name: "AI Safety & Research Grant",
      org: "Future of Life",
      emoji: "🛡️",
      location: "Global",
      funding: "$50k - $150k",
      duration: "6 Months",
      deadline: "Oct 31",
    },
  ],
  Competitions: [
    {
      id: 5,
      name: "Global AI Hackathon 2026",
      org: "StarHub & Microsoft",
      emoji: "💻",
      location: "Online",
      funding: "$100k Prize Pool",
      duration: "48 Hours",
      deadline: "Sep 12",
    },
    {
      id: 6,
      name: "Urban Sustainability Cup",
      org: "Siemens Innovation",
      emoji: "🏙️",
      location: "Munich / Hybrid",
      funding: "€50k cash prize",
      duration: "3 Weeks",
      deadline: "Oct 5",
    },
  ],
};

type ProgramType = "Accelerators" | "Grants" | "Competitions";

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<ProgramType>("Accelerators");

  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Programs"
            title={
              <>
                Accelerators, <span className="text-teal-500">Grants & Hackathons</span>
              </>
            }
            sub="Fast-track growth by applying directly to verified incubator pipelines and government incentives."
          />
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-9">
            <div className={styles.programsTabs}>
              {(Object.keys(programsData) as ProgramType[]).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.programTab} ${activeTab === tab ? styles.programTabActive : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Programs Grid */}
        <div className={styles.programsGrid}>
          {programsData[activeTab].map((pr, idx) => (
            <Reveal key={pr.id} delay={150 + idx * 80}>
              <div className={styles.programCard}>
                <div className={styles.programEmoji}>{pr.emoji}</div>
                <div style={{ flex: 1 }}>
                  <h4 className={styles.programName}>{pr.name}</h4>
                  <div className={styles.programOrg}>{pr.org}</div>

                  <div className={styles.programMetaRow}>
                    <div className={styles.programMetaItem}>
                      <MapPin size={13} color="var(--c-primary)" />
                      <span>{pr.location}</span>
                    </div>
                    <div className={styles.programMetaItem}>
                      <DollarSign size={13} color="var(--c-primary)" />
                      <span>{pr.funding}</span>
                    </div>
                    <div className={styles.programMetaItem}>
                      <Clock size={13} color="var(--c-primary)" />
                      <span>{pr.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className={styles.programDeadline}>
                      Deadline: {pr.deadline}
                    </div>
                    <button className={styles.programApplyBtn}>
                      <span>Apply</span>
                      <Send size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
