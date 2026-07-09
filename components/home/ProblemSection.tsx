"use client";
// src/components/home/ProblemSection.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Database, Layers, Target } from "lucide-react";
import { C } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";
import styles from "./home.module.css";

import { useTranslations } from "next-intl";

type Area = "hero" | "side1" | "side2" | "pivot";

type Pain = {
  key: string;
  icon: ReactNode;
  color: string;
  titleKey: string;
  bodyKey: string;
  area: Area;
};

const pains: Pain[] = [
  {
    key: "tools",
    icon: <Layers size={22} />,
    color: C.lightRed,
    titleKey: "public.home.problem-section.pains.tools.title",
    bodyKey: "public.home.problem-section.pains.tools.body",
    area: "hero",
  },
  {
    key: "buried",
    icon: <Database size={22} />,
    color: C.amber,
    titleKey: "public.home.problem-section.pains.buried.title",
    bodyKey: "public.home.problem-section.pains.buried.body",
    area: "side1",
  },
  {
    key: "crisis",
    icon: <AlertTriangle size={22} />,
    color: C.lightRed,
    titleKey: "public.home.problem-section.pains.crisis.title",
    bodyKey: "public.home.problem-section.pains.crisis.body",
    area: "side2",
  },
  {
    key: "lag",
    icon: <Target size={22} />,
    color: C.primary,
    titleKey: "public.home.problem-section.pains.lag.title",
    bodyKey: "public.home.problem-section.pains.lag.body",
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
  const t = useTranslations();

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
          <h3 className={isHero ? styles.titleHero : styles.title}>{t(pain.titleKey)}</h3>
          <p className={isHero ? styles.bodyHero : styles.body}>{t(pain.bodyKey)}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProblemSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const t = useTranslations();

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
            label={t('public.home.sound-familiar')}
            title={
              <>
                {t('public.home.running-a-startup-blind-is')}
                <span className={`${styles.accentText} ${styles.kineticWord}`}>{t('public.home.expensive')}</span>
              </>
            }
            sub={t('public.home.problem')}
          />
        </Reveal>

        <p className={styles.swipeHint}>{t('public.home.swipe-hint')}</p>

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
            <p className={styles.toolChaosLabel}>{t('public.home.the-average-startup-tool-stack')}</p>
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
              <p className={styles.toolChaosText}>{t('public.home.no-connection-no-context-no-clarity')}</p>
              <div className={styles.toolChaosLine} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
