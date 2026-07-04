"use client";
import { useState, useMemo } from "react";
import { Sparkles, ArrowUpRight, MessageSquare, Search, Filter } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";
import { motion, AnimatePresence } from "framer-motion";

const startups = [
  {
    name: "Optima AI",
    tagline: "Autonomous customer success agents for high-growth enterprise software.",
    match: "98% Match",
    logoText: "O",
    logoBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    tags: ["AI/ML", "SaaS"],
    traction: [
      { val: "$2.4M ARR", lbl: "Current Traction" },
      { val: "140% YoY", lbl: "Annual Growth" },
    ],
  },
  {
    name: "Quantic Bio",
    tagline: "Generative protein design platform accelerating oncology research pipelines.",
    match: "95% Match",
    logoText: "Q",
    logoBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    tags: ["Biotech", "Health"],
    traction: [
      { val: "Phase 2", lbl: "Clinical Stage" },
      { val: "12 Patents", lbl: "IP Portfolio" },
    ],
  },
  {
    name: "Velo Logistics",
    tagline: "Decentralized autonomous courier network optimized by reinforcement learning.",
    match: "92% Match",
    logoText: "V",
    logoBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    tags: ["Logistics", "DeepTech"],
    traction: [
      { val: "$1.2M GMV", lbl: "Monthly Volume" },
      { val: "40 Corporates", lbl: "Active Clients" },
    ],
  },
  {
    name: "Aura Cyber",
    tagline: "Zero-knowledge security guard for Kubernetes clusters and microservices.",
    match: "91% Match",
    logoText: "A",
    logoBg: "linear-gradient(135deg, #0f8c7e, #0a5c55)",
    tags: ["Cybersec", "SaaS"],
    traction: [
      { val: "$1.8M ARR", lbl: "Current Traction" },
      { val: "99.99% Uptime", lbl: "Security SLA" },
    ],
  },
  {
    name: "Helios Climate",
    tagline: "Next-gen solid state thermal storage cells for high-temperature heavy industry.",
    match: "89% Match",
    logoText: "H",
    logoBg: "linear-gradient(135deg, #22c55e, #16a34a)",
    tags: ["CleanTech", "Climate"],
    traction: [
      { val: "20 MWh", lbl: "Storage Cap" },
      { val: "8 Pilots", lbl: "Industrial Runs" },
    ],
  },
  {
    name: "Omni Retail",
    tagline: "AI personalized dynamic checkout pricing models for retail stores.",
    match: "87% Match",
    logoText: "R",
    logoBg: "linear-gradient(135deg, #dc3545, #be123c)",
    tags: ["Retail", "AI/ML"],
    traction: [
      { val: "$4.5M GMV", lbl: "Yearly Volume" },
      { val: "45k Users", lbl: "Active Customers" },
    ],
  },
];

// Extract categories dynamically
const CATEGORIES = ["All", "AI/ML", "SaaS", "Biotech", "Cybersec", "CleanTech", "Retail"];

export default function StartupDiscovery() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStartups = useMemo(() => {
    return startups.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(search.toLowerCase()) ||
        st.tagline.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || st.tags.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Startups"
            title={
              <>
                Vetted Startup <span className="text-teal-500">Discovery</span>
              </>
            }
            sub="Discover high-potential startups matching your investment mandate or strategic partnerships, filtered by AI."
          />
        </Reveal>

        {/* Search and Category Filter Panel */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 p-4 rounded-3xl backdrop-blur-md">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search startups by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200/65 dark:border-slate-800/80 rounded-2xl text-sm focus:outline-none focus:border-teal-500/80 dark:focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mr-1">
              <Filter size={11} /> Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? "bg-teal-500/10 border-teal-500/25 text-[#14b8a6]"
                      : "bg-white dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Startups Grid with AnimatePresence for transitions */}
        <motion.div layout className={styles.startupGrid}>
          <AnimatePresence mode="popLayout">
            {filteredStartups.map((st) => (
              <motion.div
                layout
                key={st.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={styles.startupCard}
              >
                {/* AI Match Badge */}
                <div className={styles.aiMatchBadge}>
                  <Sparkles size={9} style={{ display: "inline-block", marginRight: "3px", verticalAlign: "middle" }} />
                  {st.match}
                </div>

                {/* Logo & Info */}
                <div
                  className={styles.startupLogo}
                  style={{ background: st.logoBg }}
                >
                  {st.logoText}
                </div>
                <h4 className={styles.startupName}>{st.name}</h4>
                <p className={styles.startupTagline}>{st.tagline}</p>

                {/* Meta Tags */}
                <div className={styles.startupMeta}>
                  {st.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Traction grid */}
                <div className={styles.startupTraction}>
                  {st.traction.map((tr, tIdx) => (
                    <div key={tIdx}>
                      <div className={styles.tractionValue}>{tr.val}</div>
                      <div className={styles.tractionLabel}>{tr.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className={styles.cardBtns}>
                  <button className={`${styles.btnSm} ${styles.btnSmPrimary} flex items-center justify-center gap-1`}>
                    <span>Pitch Deck</span>
                    <ArrowUpRight size={12} />
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnSmGhost} flex items-center justify-center gap-1`}>
                    <MessageSquare size={12} />
                    <span>Connect</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStartups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
              No startups match your search criteria. Try adjusting the filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
