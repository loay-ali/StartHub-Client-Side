"use client";
import { ArrowRight, Sparkles, Briefcase } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../home/shared";
import styles from "./ecosystem.module.css";

export default function EcosystemFinalCTA() {
  return (
    <section className={styles.ctaSection}>
      {/* Animated gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, #14b8a6, #5eead4, #14b8a6, transparent)',
        opacity: 0.6,
      }} />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

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
            <Link href="/investor/register" className={styles.ctaBtnGhost}>
              <Briefcase size={15} className="text-teal-400" />
              <span>Join as Investor</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}