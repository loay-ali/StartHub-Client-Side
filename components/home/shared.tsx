"use client";
// src/components/home/shared.tsx
//
// Reveal now runs on Framer Motion instead of a hand-rolled
// IntersectionObserver. The public API is unchanged (children,
// className, delay, style) so every existing call site — every
// section on the homepage — gets the upgrade for free.
//
// RevealStagger/staggerItem are new and optional: use them where a
// group of children should animate in as a sequence (e.g. a list of
// cards) instead of all at once.

import { type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./home.module.css";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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
  const reduceMotion = useReducedMotion();

  // Respect prefers-reduced-motion by skipping the animated wrapper
  // entirely rather than rendering it and immediately disabling it —
  // simpler and guarantees no layout/timing side effects.
  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.07 }}
      variants={revealVariants}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Wrap a list of children (each its own <motion.div variants={staggerItem}>)
 * to have them animate in one after another on scroll, instead of all at
 * once. Used by EcosystemSection's module list and available to any future
 * section that needs the same pattern.
 */
export function RevealStagger({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };

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