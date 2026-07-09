"use client";
// src/components/home/EcosystemSection.tsx
//
// Signature element for the redesign: "an animated AI core with
// connected modules." Built as a hub-and-spoke diagram so it reads
// as the connective layer underneath every other section — Dashboard
// shows what you see, Agents shows who acts on it, this is how it's
// all wired together underneath.
//
// Accessibility note: the real control is the module LIST on the
// left (real <button role="tab">s, keyboard + hover + focus all
// drive the same state). The SVG diagram on the right is marked
// aria-hidden and only mirrors whatever is already active — nothing
// here depends on hovering a tiny SVG node to access content.

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Brain, Users, DollarSign, Settings, TrendingUp, BarChart3 } from "lucide-react";
import { C } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";
import styles from "./home.module.css";

import { useTranslations } from 'next-intl';

type ModuleDef = {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  summary: string;
  /** Vertical position within the diagram, 0 (top) to 1 (bottom). */
  y: number;
};

const DIAGRAM_W = 420;
const DIAGRAM_H = 420;
const CORE = { x: 64, y: DIAGRAM_H / 2 };
const NODE_X = 356;
const NODE_PAD = 36;

function nodePoint(m: ModuleDef) {
  return { x: NODE_X, y: NODE_PAD + m.y * (DIAGRAM_H - NODE_PAD * 2) };
}

function pathFor(m: ModuleDef) {
  const p = nodePoint(m);
  const midX = (CORE.x + p.x) / 2;
  return `M ${CORE.x} ${CORE.y} C ${midX} ${CORE.y}, ${midX} ${p.y}, ${p.x} ${p.y}`;
}

export default function EcosystemSection() {
  const t = useTranslations();

const MODULES: ModuleDef[] = [
  {
    key: "hr",
    label: "HR & People",
    icon: <Users size={18} />,
    color: C.greenDk,
    summary: t('public.home.hr-and-people'),
    y: 0.06,
  },
  {
    key: "finance",
    label: "Finance",
    icon: <DollarSign size={18} />,
    color: C.primary,
    summary: t('public.home.finance'),
    y: 0.3,
  },
  {
    key: "ops",
    label: "Operations",
    icon: <Settings size={18} />,
    color: C.amber,
    summary: t('public.home.operations'),
    y: 0.54,
  },
  {
    key: "sales",
    label: "Sales & CRM",
    icon: <TrendingUp size={18} />,
    color: C.teal2,
    summary: t('public.home.sales'),
    y: 0.78,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <BarChart3 size={18} />,
    color: C.teal3,
    summary: t('public.home.analytics'),
    y: 1,
  },
];

  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeModule = MODULES[active];
  const activeNodePoint = nodePoint(activeModule);

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="Features"
            title={
              <>
                {t('public.home.connected')}
                <br />
                <span className="grad-text">{t('public.home.smart')}</span>
              </>
            }
            sub={t('public.home.features-sub')}
          />
        </Reveal>

        <div className={styles.ecoLayout}>
          {/* Real control — keyboard + hover + focus all set `active` */}
          <div className={styles.ecoList} role="tablist" aria-label="Connected company modules">
            {MODULES.map((m, i) => {
              const isActive = active === i;
              return (
                <div key={m.key} className={styles.ecoItem}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.ecoItemBtn} ${isActive ? styles.ecoItemBtnActive : ""}`}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    style={{
                      borderColor: isActive ? `${m.color}55` : undefined,
                      background: isActive ? `${m.color}0A` : undefined,
                    }}
                  >
                    <span
                      className={styles.ecoItemIcon}
                      style={{ background: `${m.color}14`, border: `1px solid ${m.color}2A`, color: m.color }}
                    >
                      {m.icon}
                    </span>
                    <span className={styles.ecoItemLabel}>{m.label}</span>
                    <span className={styles.ecoItemDot} style={{ background: isActive ? m.color : C.border }} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.ecoItemBody}
                      >
                        <p className={styles.ecoItemSummary}>{m.summary}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Decorative — mirrors `active`, never the source of truth */}
          <div className={styles.ecoDiagramWrap} aria-hidden="true">
            <svg
              className={styles.ecoDiagram}
              viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {MODULES.map((m, i) => {
                const isActive = active === i;
                return (
                  <motion.path
                    key={m.key}
                    d={pathFor(m)}
                    fill="none"
                    stroke={isActive ? m.color : C.border}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 1,
                      delay: reduceMotion ? 0 : i * 0.08,
                      ease: "easeOut",
                    }}
                    style={{ transition: "stroke .25s ease, stroke-width .25s ease" }}
                  />
                );
              })}

              {/* Core glow + body (icon rendered as an HTML overlay below) */}
              <circle cx={CORE.x} cy={CORE.y} r={34} fill={C.primary} opacity={0.1} />
              <circle cx={CORE.x} cy={CORE.y} r={20} fill={C.primary} opacity={0.001} />

              {MODULES.map((m, i) => {
                const p = nodePoint(m);
                const isActive = active === i;
                return (
                  <circle
                    key={m.key}
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 9 : 6}
                    fill={isActive ? m.color : "#fff"}
                    stroke={m.color}
                    strokeWidth={isActive ? 0 : 1.5}
                    style={{ transition: "r .25s ease, fill .25s ease" }}
                  />
                );
              })}
            </svg>

            {/* Core icon, positioned to sit exactly on the SVG core */}
            <div
              className={styles.ecoCoreLabel}
              style={{ left: `${(CORE.x / DIAGRAM_W) * 100}%`, top: `${(CORE.y / DIAGRAM_H) * 100}%` }}
            >
              <Brain size={16} color="#fff" />
            </div>

            {/* Floating label chip on whichever node is active */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.key}
                className={styles.ecoNodeChip}
                style={{
                  left: `${(NODE_X / DIAGRAM_W) * 100}%`,
                  top: `${(activeNodePoint.y / DIAGRAM_H) * 100}%`,
                  borderColor: `${activeModule.color}40`,
                  color: activeModule.color,
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.22 }}
              >
                {activeModule.label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
