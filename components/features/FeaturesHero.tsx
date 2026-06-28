"use client";
// src/components/features/FeaturesHero.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, BarChart2, Users } from "lucide-react";
import { LoadingButton } from "@/components/preloader/ButtonLoader";

const PILLS = [
  { icon: <Zap size={14} />,      label: "AI-Powered Decisions" },
  { icon: <BarChart2 size={14} />, label: "Real-Time Analytics"  },
  { icon: <Users size={14} />,     label: "Team Collaboration"   },
];

export default function FeaturesHero() {
  const [startLoading, setStartLoading]  = useState(false);
  const [pricingLoading, setPricingLoading] = useState(false);

  const handleStart = () => {
    setStartLoading(true);
    setTimeout(() => setStartLoading(false), 2000);
  };

  const handlePricing = () => {
    setPricingLoading(true);
    setTimeout(() => setPricingLoading(false), 2000);
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a1f1d 0%, #0f2d2a 50%, #0a1f1d 100%)",
        padding: "120px 24px 96px",
        textAlign: "center",
      }}
    >
      {/* Background glow blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(20,184,166,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: -80, left: "20%",
          width: 320, height: 320, borderRadius: "50%",
          background: "rgba(5,211,159,0.06)", filter: "blur(64px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.3)",
            borderRadius: 999, padding: "6px 14px", marginBottom: 28,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#14b8a6",
          }}
        >
          <Zap size={12} />
          Platform Features
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: "#ffffff", marginBottom: 20 }}
        >
          Everything Your Startup{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #05d39f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Needs to Scale
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, marginBottom: 40 }}
        >
          From AI agents to recruitment analytics — one unified platform replaces your entire toolstack.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}
        >
          {/* Primary — navigates to /register; loader fires before navigation */}
          <LoadingButton
            loading={startLoading}
            loadingText="Starting…"
            loaderColor="#04211c"
            onClick={handleStart}
            style={{
              padding: "12px 28px", borderRadius: 12,
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
              color: "#fff", fontWeight: 700, fontSize: 15,
              boxShadow: "0 8px 24px rgba(20,184,166,0.3)",
              minWidth: 160,
            }}
          >
            Get Started Free
          </LoadingButton>

          {/* Ghost — navigates to /plans */}
          <LoadingButton
            loading={pricingLoading}
            loadingText="Loading…"
            loaderColor="#cbd5e1"
            onClick={handlePricing}
            style={{
              padding: "12px 28px", borderRadius: 12,
              border: "1px solid rgba(20,184,166,0.3)",
              color: "#cbd5e1", fontWeight: 600, fontSize: 15,
              background: "rgba(255,255,255,0.04)",
              minWidth: 160,
            }}
          >
            View Pricing →
          </LoadingButton>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}
        >
          {PILLS.map((p) => (
            <span
              key={p.label}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999, padding: "6px 14px",
                fontSize: 13, color: "#94a3b8",
              }}
            >
              <span style={{ color: "#14b8a6" }}>{p.icon}</span>
              {p.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}