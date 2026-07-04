"use client";
import { ArrowRight, Sparkles, Briefcase } from "lucide-react";
import { Reveal } from "../home/shared";
import styles from "./ecosystem.module.css";

export default function EcosystemFinalCTA() {
  return (
    <section className={styles.ctaSection}>
      {/* Background blobs */}
      <div className={styles.ctaBgBlob1} />
      <div className={styles.ctaBgBlob2} />

      <div className={styles.ctaInner}>
        <Reveal>
          <div className="flex justify-center mb-5">
            <span className={styles.label} style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)", color: "white" }}>
              <Sparkles size={9} />
              Open Application Gateway
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className={styles.ctaH2}>
            Ready to Connect Your Innovation Nodes?
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.ctaSub}>
            Join thousands of founders, venture funds, and corporate innovation teams executing matches in real-time.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className={styles.ctaBtns}>
            <button className={styles.ctaBtnPrimary}>
              <span>Join as Startup</span>
              <ArrowRight size={16} />
            </button>
            <button className={styles.ctaBtnGhost}>
              <Briefcase size={15} className="text-teal-400" />
              <span>Join as Investor</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}