"use client";
// src/components/home/HowItWorksSection.tsx
import { Bell, Brain, Cpu, GitBranch, Zap } from "lucide-react";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";
import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
  const t = useTranslations();
  
  const steps = [
    { n: "01", title: t('public.home.connect-your-stack'),                icon: <GitBranch size={18} />, color: C.primary,
      body: t('public.home.connect-your-stack-body') },
    { n: "02", title: t('public.home.build-your-company-memory'), icon: <Brain size={18} />,     color: C.teal2,
      body: t('public.home.build-your-company-memory-body') },
    { n: "03", title: t('public.home.agents-go-to-work'),      icon: <Cpu size={18} />,       color: C.greenDk,
      body: t('public.home.agents-go-to-work-body') },
    { n: "04", title: t('public.home.you-get-clear-next-step'),           icon: <Bell size={18} />,       color: C.amber,
      body: t('public.home.you-get-clear-next-step-body') },
    { n: "05", title: t('public.home.decisions-made'),       icon: <Zap size={18} />,       color: C.green,
      body: t('public.home.decisions-made-body') },
  ];

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "72px 0", background: C.surfaceAlt }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionHeading
            label={t('public.home.how-it-works')}
            title={<>Up and Running in<br /><span className="grad-text">{t('public.home.under-30-minutes')}</span></>}
            sub={t('public.home.under-30-minutes-body')}
          />
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div
                className="card-lift"
                style={{
                  display: "flex",
                  gap: 24,
                  padding: "28px 28px",
                  borderRadius: 20,
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number watermark */}
                <div
                  style={{
                    position: "absolute",
                    right: 20, top: 14,
                    fontFamily: FONTS.mono,
                    fontSize: 56,
                    fontWeight: 900,
                    color: `${s.color}07`,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {s.n}
                </div>
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0, width: 52, height: 52, borderRadius: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}0D`, border: `1px solid ${s.color}22`, color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                {/* Text */}
                <div style={{ paddingRight: 60 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: s.color, letterSpacing: ".08em", marginBottom: 7 }}>
                    {t('public.home.solution-section.step')} {s.n}
                  </div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 9 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
