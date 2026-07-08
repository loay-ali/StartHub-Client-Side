"use client";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const steps = [
  {
    num: "01",
    title: "Challenge Structuring & Publication",
    desc: "Enterprise partners publish detailed innovation briefs, specify tech parameters, and configure escrowed funding budgets.",
  },
  {
    num: "02",
    title: "AI Vetting & Data Room Audit",
    desc: "Our behind-the-scenes matching algorithms index candidate startups, verify operational traction, and execute automated compliance audits.",
  },
  {
    num: "03",
    title: "Double Opt-In Routing & NDA",
    desc: "StarHub auto-routes matching alerts, secures mutual interest confirmations, and executes standardized multi-party NDAs.",
  },
  {
    num: "04",
    title: "Escrow Setup & SLA Contracting",
    desc: "Parties sign standardized proof-of-concept agreements, locking milestone-linked budgets into secure platform smart accounts.",
  },
  {
    num: "05",
    title: "Disbursement & Progress Validation",
    desc: "Escrowed capital is automatically disbursed to the startup as progress targets are achieved and digitally validated by stakeholders.",
  },
];

export default function InnovationProcess() {
  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.innerNarrow}>
        <Reveal>
          <SectionHeading
            label="Open Innovation Path"
            title={
              <>
                The Innovation <span className="text-teal-500">Pipeline</span>
              </>
            }
            sub="An automated, secure, and friction-free process from problem definition to implementation and funding."
          />
        </Reveal>

        <div className={styles.processTimeline}>
          <div className={styles.processLine} />
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 60}>
              <div className={styles.processStep}>
                <div className={styles.processStepNum}>{step.num}</div>
                <div className={styles.processStepBody}>
                  <h4 className={styles.processStepTitle}>{step.title}</h4>
                  <p className={styles.processStepDesc}>{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
