"use client";
// src/components/home/ProblemSection.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Database, Layers, Target } from "lucide-react";
import { C } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";
import styles from "./home.module.css";

type Area = "hero" | "side1" | "side2" | "pivot";

type Pain = {
  key: string;
  icon: ReactNode;
  color: string;
  title: string;
  body: string;
  area: Area;
};

const pains: Pain[] = [
  {
    key: "tools",
    icon: <Layers size={22} />,
    color: C.lightRed,
    title: "14 tools. Zero connection.",
    body: `Your team lives in Slack, Notion, HubSpot, QuickBooks, and Greenhouse — but none of them talk. Every Monday you're stitching spreadsheets just to answer "how are we doing?"`,
    area: "hero",
  },
  {
    key: "buried",
    icon: <Database size={22} />,
    color: C.amber,
    title: "The insight is in there. Somewhere.",
    body: "You know the data exists. It's buried in dashboards nobody checks and reports nobody reads. Finding it costs you hours every week.",
    area: "side1",
  },
  {
    key: "crisis",
    icon: <AlertTriangle size={22} />,
    color: C.lightRed,
    title: "By the time you notice, it's a crisis.",
    body: "Churn creep. Runway drift. A star employee going quiet. These aren't surprises — they're signals you missed because no one was watching all the data at once.",
    area: "side2",
  },
  {
    key: "lag",
    icon: <Target size={22} />,
    color: C.primary,
    title: "You're solving last month's problems.",
    body: "Without real-time intelligence, your decisions lag reality by weeks. Opportunities close, risks compound, and leadership keeps asking questions ops can't answer fast enough.",
    area: "pivot",
  },
];

const tools = [
  "Slack", "Notion", "HubSpot", "QuickBooks", "Greenhouse", "Zoom", "Jira",
  "Stripe", "Mixpanel", "Salesforce", "Workday", "Calendly", "ClickUp", "Pipedrive",
];

function PainCard({ pain }: { pain: Pain }) {
  const isHero = pain.area === "hero";
  const isPivot = pain.area === "pivot";
  const big = isHero || isPivot;

  return (
    <article
      className={`${styles.card} ${
        isHero ? styles.variantHero : isPivot ? styles.variantPivot : styles.variantSide
      }`}
    >
      {big && <span className={styles.grain} aria-hidden="true" />}
      <div className={isPivot ? styles.pivotInner : styles.cardInner}>
        <div
          className={big ? styles.iconWrapLg : styles.iconWrap}
          style={{
            background: `${pain.color}0F`,
            border: `1px solid ${pain.color}26`,
            color: pain.color,
          }}
        >
          {pain.icon}
        </div>
        <div className={styles.cardText}>
          <h3 className={isHero ? styles.titleHero : styles.title}>{pain.title}</h3>
          <p className={isHero ? styles.bodyHero : styles.body}>{pain.body}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProblemSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root: scroller, threshold: 0.6 },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className={styles.problemSection}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="Sound Familiar?"
            title={
              <>
                Running a Startup Blind
                <br />
                Is{" "}
                <span className={`${styles.accentText} ${styles.kineticWord}`}>Expensive</span>
              </>
            }
            sub="The average funded startup wastes 12 hours a week chasing data that already exists. That's 3 months a year your leadership team spends on reporting instead of building."
          />
        </Reveal>

        <p className={styles.swipeHint}>Swipe to see what it&lsquo;s costing you →</p>

        {/* One set of markup. CSS alone turns this into an asymmetric
            bento grid at tablet/desktop widths and a scroll-snap strip
            on mobile — no duplicated DOM for the two layouts. */}
        <div className={styles.grid} ref={scrollerRef}>
          {pains.map((pain, i) => (
            <div
              key={pain.key}
              className={styles.slot}
              data-area={pain.area}
              data-index={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <Reveal delay={i * 80}>
                <PainCard pain={pain} />
              </Reveal>
            </div>
          ))}
        </div>

        <div className={styles.dots} role="tablist" aria-label="Pain points">
          {pains.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i ? "true" : "false"}
              aria-label={`Show pain point ${i + 1} of ${pains.length}`}
              className={`${styles.dot} ${active === i ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <Reveal delay={280}>
          <div className={styles.toolChaosWrap}>
            <p className={styles.toolChaosLabel}>The average startup tool stack</p>
            <div className={styles.toolPills}>
              {tools.map((t, i) => (
                <span
                  key={t}
                  className={styles.toolPill}
                  style={
                    {
                      "--r": `${((i % 5) - 2) * 1.3}deg`,
                      animationDelay: `${(i % 7) * 0.4}s`,
                      animationDuration: `${4 + (i % 5) * 0.6}s`,
                    } as React.CSSProperties
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.toolChaosDivider}>
              <div className={styles.toolChaosLine} />
              <p className={styles.toolChaosText}>No connection. No context. No clarity.</p>
              <div className={styles.toolChaosLine} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
