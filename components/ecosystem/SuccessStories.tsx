"use client";
import { Sparkles, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const stories = [
  {
    company: "GreenGrid",
    industry: "CleanTech & Energy",
    logo: "🌲",
    logoBg: "linear-gradient(135deg, #10b981, #047857)",
    problem: "Struggled to identify corporate innovation buyers interested in localized battery balancing pilots.",
    aiTag: "Barclays Labs Match (95%)",
    results: [
      { val: "$150k", lbl: "Pilot Fund" },
      { val: "11 Days", lbl: "Match Time" },
      { val: "2x", lbl: "ARR Growth" },
    ],
  },
  {
    company: "Aura Cyber",
    industry: "Kubernetes Security",
    logo: "🛡️",
    logoBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    problem: "Needed early-stage institutional venture funds aligned with enterprise security infrastructure.",
    aiTag: "Sequoia Capital Match (98%)",
    results: [
      { val: "$1.8M", lbl: "Seed Seed" },
      { val: "3 Weeks", lbl: "Fund Cycle" },
      { val: "4.2x", lbl: "Pipeline" },
    ],
  },
  {
    company: "Optima AI",
    industry: "Enterprise SaaS",
    logo: "🤖",
    logoBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    problem: "Targeting high-security banking environments to deploy autonomous chat agents.",
    aiTag: "Standard Chartered Match (94%)",
    results: [
      { val: "3 Deals", lbl: "POCs Closed" },
      { val: "15 Days", lbl: "Contracting" },
      { val: "+$400k", lbl: "New ARR" },
    ],
  },
];

export default function SuccessStories() {
  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Proof"
            title={
              <>
                Ecosystem <span className="text-teal-500">Success Stories</span>
              </>
            }
            sub="Real connections. Real deals. Read how startups and enterprises scale cooperation through StarHub."
          />
        </Reveal>

        <div className={styles.storiesGrid}>
          {stories.map((story, idx) => (
            <Reveal key={story.company} delay={idx * 80}>
              <div className={styles.storyCard}>
                {/* Header */}
                <div className={styles.storyHeader}>
                  <div
                    className={styles.storyLogo}
                    style={{ background: story.logoBg }}
                  >
                    {story.logo}
                  </div>
                  <div>
                    <h4 className={styles.storyCompany}>{story.company}</h4>
                    <div className={styles.storyIndustry}>{story.industry}</div>
                  </div>
                </div>

                {/* Body */}
                <div className={styles.storyBody}>
                  <div className={styles.storyProblem}>
                    <strong>Challenge:</strong> {story.problem}
                  </div>

                  {/* Results row */}
                  <div className={styles.storyResults}>
                    {story.results.map((res, rIdx) => (
                      <div key={rIdx} className={styles.storyResult}>
                        <div className={styles.storyResultValue}>{res.val}</div>
                        <div className={styles.storyResultLabel}>{res.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Match tag */}
                  <div className={styles.storyAiTag}>
                    <Sparkles size={11} className="text-teal-600" />
                    <span>{story.aiTag}</span>
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
