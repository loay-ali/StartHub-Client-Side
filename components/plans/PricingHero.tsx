"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "No credit card required",
  "Cancel anytime",
  "14-day free trial",
];

export default function PricingHero() {
  return (
    <section
    id="hero" data-header-theme="dark"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0a1f1d 0%, #0c2926 40%, #091a17 100%)",
        padding: "120px 24px 96px",
        textAlign: "center",
      }}
    >
      {/* Radial glow top */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(20,184,166,0.22) 0%, transparent 65%)",
        }}
      />
      {/* Floating orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "30%", left: "5%",
          width: 240, height: 240, borderRadius: "50%",
          background: "rgba(5,211,159,0.07)", filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", top: "20%", right: "5%",
          width: 180, height: 180, borderRadius: "50%",
          background: "rgba(20,184,166,0.08)", filter: "blur(48px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.3)",
            borderRadius: 999, padding: "6px 14px", marginBottom: 28,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#14b8a6",
          }}
        >
          <Sparkles size={12} />
          Simple, Transparent Pricing
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800, lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: 20,
          }}
        >
          Invest in Growth,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #14b8a525 0%, #05d39f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Not Overhead
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, marginBottom: 36 }}
        >
          One plan, all features. Scale up as you grow — no hidden fees, no per-seat surprises.
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            display: "flex", gap: 20, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 40,
          }}
        >
          {HIGHLIGHTS.map((h) => (
            <span
              key={h}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 14, color: "#cbd5e1", fontWeight: 500,
              }}
            >
              <CheckCircle2 size={16} style={{ color: "#14b8a6" }} />
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            href="/register"
            style={{
              padding: "13px 32px", borderRadius: 12,
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
              color: "#fff", fontWeight: 700, fontSize: 15,
              textDecoration: "none", boxShadow: "0 8px 24px rgba(20,184,166,0.3)",
            }}
          >
            Start Free Trial
          </Link>
          <Link
            href="/contact-us"
            style={{
              padding: "13px 32px", borderRadius: 12,
              border: "1px solid rgba(20,184,166,0.3)",
              color: "#cbd5e1", fontWeight: 600, fontSize: 15,
              textDecoration: "none", background: "rgba(255,255,255,0.04)",
            }}
          >
            Talk to Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
