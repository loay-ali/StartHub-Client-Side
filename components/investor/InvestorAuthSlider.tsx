"use client";
// src/components/investor/InvestorAuthSlider.tsx
//
// Left-hand panel shared by the investor Login and Register screens:
// a rotating list of platform benefits plus a small stat strip. Kept
// separate from the form itself so both pages can reuse it as-is.
import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { investorAuthStats } from "@/constants/investor-stats";
import styles from "./investor.module.css";

const benefits = [
  {
    icon: <Sparkles size={22} />,
    title: "AI-Matched Deal Flow",
    body: "Get a curated stream of startups filtered by your mandate, sector, and ticket size — no manual sourcing required.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Verified, Vetted Data",
    body: "Every startup profile is screened before it reaches you, so the diligence you start with is already trustworthy.",
  },
  {
    icon: <Users size={22} />,
    title: "Direct Founder Access",
    body: "Message founders directly through the platform once there's mutual interest — no cold intros, no gatekeepers.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Portfolio Intelligence",
    body: "Track every company you back in one dashboard, with AI-generated signals on momentum and risk.",
  },
];

export default function InvestorAuthSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = benefits[active];

  return (
    <div className={styles.sidePanel}>
      <div className={styles.sideBlob1} />
      <div className={styles.sideBlob2} />

      <div className={styles.sideContent}>
        <span className={styles.sideBadge}>
          <Sparkles size={10} />
          Investor Access
        </span>

        <div className={styles.sliderWrap}>
          <div className={styles.slide} key={active}>
            <div className={styles.slideIconWrap}>{slide.icon}</div>
            <h2 className={styles.slideTitle}>{slide.title}</h2>
            <p className={styles.slideBody}>{slide.body}</p>
          </div>

          <div className={styles.sliderDots}>
            {benefits.map((b, i) => (
              <button
                key={b.title}
                type="button"
                aria-label={`Show benefit ${i + 1} of ${benefits.length}`}
                className={`${styles.sliderDot} ${i === active ? styles.sliderDotActive : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sideStats}>
        {investorAuthStats.map((stat) => (
          <div key={stat.key}>
            <div className={styles.sideStatValue}>
              {stat.value.toLocaleString()}
              {stat.suffix ?? ""}
            </div>
            <div className={styles.sideStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}