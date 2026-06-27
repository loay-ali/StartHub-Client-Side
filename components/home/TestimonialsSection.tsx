"use client";
// src/components/home/TestimonialsSection.tsx
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { C, FONTS } from "../../lib/tokens";
import { Reveal, SectionHeading } from "./shared";

const testimonials = [
  {
    q: "StarHub caught a churn signal in week two that saved a $180K account. It paid for itself 300× in the first month. And that was before we'd set up all our integrations.",
    name: "Priya Nair", title: "CEO & Co-Founder", company: "Luminary Health (Series A)",
    av: "PN", color: C.primary,
  },
  {
    q: "I was drowning in dashboards. StarHub replaced 8 of them with one morning briefing that tells me exactly what needs my attention — and what doesn't. I got three hours of my week back.",
    name: "Marcus Chen", title: "CTO & Co-Founder", company: "Velo Logistics ($2.4M ARR)",
    av: "MC", color: C.teal2,
  },
  {
    q: "Board prep used to take 3 days. Now it takes 0. We have a live deck that updates itself. Our investors say we're the most transparent company they've ever backed.",
    name: "Sofia Eriksson", title: "COO", company: "Arkana AI (YC W24)",
    av: "SE", color: C.greenDk,
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="What Founders Say"
            title={<>Teams That Stopped<br /><span className="grad-text">Guessing</span></>}
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18 }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{
                  display: "flex", flexDirection: "column", height: "100%",
                  padding: 32, borderRadius: 24,
                  background: "#fff", border: `1px solid ${C.border}`,
                  boxShadow: "0 1px 4px rgba(10,15,14,.04)",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: 14.5, color: C.muted, lineHeight: 1.8,
                    flex: 1, marginBottom: 24, fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.q}&rdquo;
                </p>

                {/* Author */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingTop: 20, borderTop: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, color: "#fff",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`,
                      flexShrink: 0, fontFamily: FONTS.mono,
                    }}
                  >
                    {t.av}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: FONTS.display }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                      {t.title} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}