"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import styles from "./home.module.css";

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          ob.disconnect();
        }
      },
      { threshold: 0.07 }
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${on ? styles.visible : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className={styles.label}>
      <Sparkles size={9} />
      {children}
    </span>
  );
}

export function PageBg() {
  return (
    <div className={styles.pageBg} aria-hidden="true">
      <div className={styles.pageBgGrid} />
      <div className={styles.pageBgGlow} />
      <div className={styles.pageBgAccent} />
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  sub,
  accent,
}: {
  label: string;
  title: ReactNode;
  sub?: string;
  accent?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeadingWrap}>
      <Label>{label}</Label>
      <h2 className={styles.sectionH2}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
      {accent}
    </div>
  );
}
