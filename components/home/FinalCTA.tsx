"use client";
// src/components/home/FinalCTA.tsx
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, Label } from "./shared";
import { useTranslations } from "next-intl";

export default function FinalCTA() {
  const t = useTranslations();

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0 120px", background: C.surfaceAlt }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <Reveal>
          <div
            style={{
              padding: "72px 60px",
              borderRadius: 32,
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(150deg, rgba(20,184,166,.06), rgba(15,118,110,.04), rgba(255,255,255,.8))",
              border: `1.5px solid ${C.primaryLt}`,
              boxShadow: "0 24px 80px rgba(20,184,166,.14), 0 4px 16px rgba(10,15,14,.04)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Corner accents */}
            <div
              style={{
                position: "absolute", top: -60, right: -60, width: 240, height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(20,184,166,.08) 0%, transparent 68%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute", bottom: -40, left: -40, width: 180, height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(13,148,136,.07) 0%, transparent 68%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <Label>{t('public.home.get-started-today')}</Label>

              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: "clamp(32px,4.5vw,58px)",
                  letterSpacing: "-.03em",
                  lineHeight: 1.06,
                  color: C.text,
                  marginBottom: 20,
                }}
              >
                {t('public.home.your-company-is-trying-to-tell-you-something')}
              </h2>

              <p
                style={{
                  fontSize: 17, color: C.muted, lineHeight: 1.75,
                  maxWidth: 460, margin: "0 auto 44px",
                }}
              >
                {t('public.home.start-your-free-trial')}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 24 }}>
                {/*<motion.button
                  className="btn-primary"
                  whileHover={{ y: -2, boxShadow: "0 14px 42px rgba(20,184,166,.36)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{ padding: "16px 32px", fontSize: 16, fontFamily: FONTS.display }}
                >
                  Start Free — No Card Needed <ArrowRight size={17} />
                </motion.button>*/}
                <motion.button
                  className="btn-ghost"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ padding: "16px 28px", fontSize: 16, fontFamily: FONTS.display }}
                >
                  {t('public.home.start-now')} <ChevronRight size={17} />
                </motion.button>
              </div>

              {/*<p style={{ fontSize: 12, color: C.textMuted }}>
                14-day free trial · No setup fees · SOC 2 Type II certified · Cancel anytime
              </p>*/}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}