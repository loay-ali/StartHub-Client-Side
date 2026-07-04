"use client";
// Replaces the old "Vetted Startup Discovery" grid, which rendered a
// fixed list of fake startups (Optima AI, Quantic Bio, etc.) with search
// and category-filter UI wired to that same demo data. None of it was
// real, and it read as a finished feature that wasn't. Swapped for a
// simple CTA: once real startup listings exist, this is the natural
// place to bring back a live grid — but it should be driven by actual
// data at that point, not placeholders dressed up as a product.
import { Rocket, ArrowRight } from "lucide-react";
import { Reveal } from "../home/shared";
import styles from "./ecosystem.module.css";

export default function StartupDiscovery() {
  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.joinCtaPanel}>
            <div className={styles.joinCtaIconWrap}>
              <Rocket size={22} />
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
              Startups, Vetted Before You See Them
            </h3>

            <p className={styles.joinCtaText}>
              Every startup on StarHub goes through AI-assisted vetting before it
              ever reaches an investor or corporate partner — so the pipeline
              you join is trustworthy from day one.
            </p>

            <button type="button" className={`btn-primary ${styles.joinCtaBtn}`}>
              <span>Join the Platform</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}