"use client";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const steps = [
  {
    num: "01",
    title: "Challenge Formulation",
    desc: "Corporates or government entities publish innovation briefs specifying requirements, eligibility, and prize/pilot funding.",
  },
  {
    num: "02",
    title: "AI Mandate Matching",
    desc: "StarHub Co-pilot runs vector searches across vetted startup profiles, matching tech compatibility above 85%.",
  },
  {
    num: "03",
    title: "Automated Vetting",
    desc: "Startups undergo structured evaluation including traction auditing, compliance checks, and pitch vault scans.",
  },
  {
    num: "04",
    title: "Compliance Verification",
    desc: "Ecosystem protocols enforce NDAs, verify IP claims, and audit developer records automatically to protect both parties.",
  },
  {
    num: "05",
    title: "Direct Introductions",
    desc: "Matched parties receive automated, double-opt-in calendar invitations along with custom briefing reports.",
  },
  {
    num: "06",
    title: "Smart Term Negotiation",
    desc: "Utilize standardized template agreements for proof-of-concepts, pilots, and equity funding to minimize legal friction.",
  },
  {
    num: "07",
    title: "Capital Disbursement",
    desc: "Milestone-linked funds are disbursed directly through secure, automated compliance channels.",
  },
  {
    num: "08",
    title: "Post-Match Performance Tracker",
    desc: "AI monitors project delivery, updates ecosystem social feeds on milestones, and schedules follow-on review calls.",
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
