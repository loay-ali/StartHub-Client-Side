"use client";
import { useState, useMemo } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Search, Filter } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";
import { motion, AnimatePresence } from "framer-motion";

const investors = [
  {
    name: "Sequoia Capital",
    type: "Venture Capital",
    avatar: "S",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    thesis: "Backing bold founders building legendary companies from seed to growth stage.",
    ticket: "$1M - $15M",
    investments: "1,200+",
    sectors: ["AI/ML", "SaaS", "DeepTech"],
    compat: "98%",
    compatVal: 98,
  },
  {
    name: "Andreessen Horowitz",
    type: "Venture Capital",
    avatar: "A",
    avatarBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    thesis: "Investing in technology shaping the next decade across software, bio, and crypto.",
    ticket: "$2M - $20M",
    investments: "850+",
    sectors: ["SaaS", "BioTech", "FinTech"],
    compat: "94%",
    compatVal: 94,
  },
  {
    name: "Y Combinator",
    type: "Seed Accelerator",
    avatar: "Y",
    avatarBg: "linear-gradient(135deg, #dc3545, #be123c)",
    thesis: "Helping early-stage startups build product, find customers, and secure first funding.",
    ticket: "$500k Flat",
    investments: "4,000+",
    sectors: ["All Sectors", "SaaS"],
    compat: "88%",
    compatVal: 88,
  },
  {
    name: "SoftBank Vision Fund",
    type: "Growth Capital",
    avatar: "SB",
    avatarBg: "linear-gradient(135deg, #be123c, #881337)",
    thesis: "Providing massive growth capital to category leaders utilizing AI.",
    ticket: "$20M - $100M",
    investments: "120+",
    sectors: ["AI/ML", "Mobility"],
    compat: "82%",
    compatVal: 82,
  },
  {
    name: "Angel Syndicate Alpha",
    type: "Angel Syndicate",
    avatar: "AA",
    avatarBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    thesis: "Pre-seed and seed financing for hard engineering problems and deep technical systems.",
    ticket: "$100k - $500k",
    investments: "48",
    sectors: ["DeepTech", "Security"],
    compat: "90%",
    compatVal: 90,
  },
  {
    name: "General Catalyst",
    type: "Venture Capital",
    avatar: "GC",
    avatarBg: "linear-gradient(135deg, #0f8c7e, #0a5c55)",
    thesis: "Collaborating with founders to create long-term positive systemic change.",
    ticket: "$1.5M - $12M",
    investments: "620+",
    sectors: ["HealthTech", "SaaS"],
    compat: "92%",
    compatVal: 92,
  },
];

const CATEGORIES = ["All", "Venture Capital", "Seed Accelerator", "Angel Syndicate", "Growth Capital"];

export default function InvestorDiscovery() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredInvestors = useMemo(() => {
    return investors.filter((inv) => {
      const matchesSearch =
        inv.name.toLowerCase().includes(search.toLowerCase()) ||
        inv.thesis.toLowerCase().includes(search.toLowerCase()) ||
        inv.sectors.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory =
        selectedCategory === "All" || inv.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Capital Networks"
            title={
              <>
                Global Vetted <span className="text-teal-500">Investor Network</span>
              </>
            }
            sub="Meet top-tier venture funds, accelerator programs, and active angel syndicates integrated with StarHub AI."
          />
        </Reveal>

        {/* Search and Category Filter Panel */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 p-4 rounded-3xl backdrop-blur-md">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search investors by thesis or sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200/65 dark:border-slate-800/80 rounded-2xl text-sm focus:outline-none focus:border-teal-500/80 dark:focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mr-1">
              <Filter size={11} /> Pillar:
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

        {/* Investors Grid with AnimatePresence for transitions */}
        <motion.div layout className={styles.investorGrid}>
          <AnimatePresence mode="popLayout">
            {filteredInvestors.map((inv) => (
              <motion.div
                layout
                key={inv.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={styles.investorCard}
              >
                {/* Header */}
                <div className={styles.investorHeader}>
                  <div
                    className={styles.investorAvatar}
                    style={{ background: inv.avatarBg }}
                  >
                    {inv.avatar}
                  </div>
                  <div>
                    <h4 className={styles.investorName}>{inv.name}</h4>
                    <div className={styles.investorType}>{inv.type}</div>
                  </div>
                  <div className="ml-auto text-teal-600 dark:text-teal-400">
                    <ShieldCheck size={20} className="stroke-[2.5]" />
                  </div>
                </div>

                {/* Thesis */}
                <p className={styles.investorThesis}>{inv.thesis}</p>

                {/* Stats */}
                <div className={styles.investorStats}>
                  <div className={styles.investorStatCard}>
                    <div className={styles.investorStatValue}>{inv.ticket}</div>
                    <div className={styles.investorStatLabel}>Ticket Size</div>
                  </div>
                  <div className={styles.investorStatCard}>
                    <div className={styles.investorStatValue}>{inv.investments}</div>
                    <div className={styles.investorStatLabel}>Portfolio</div>
                  </div>
                </div>

                {/* Sectors */}
                <div className={styles.investorSectors}>
                  {inv.sectors.map((sec) => (
                    <span key={sec} className={styles.tag}>
                      {sec}
                    </span>
                  ))}
                </div>

                {/* AI Compatibility bar */}
                <div className={styles.aiCompatRow}>
                  <span className={styles.aiCompatLabel}>Mandate Match</span>
                  <div className={styles.aiCompatBarWrap}>
                    <div
                      className={styles.aiCompatFill}
                      style={{ width: `${inv.compatVal}%` }}
                    />
                  </div>
                  <span className={styles.aiCompatScore}>{inv.compat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredInvestors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
              No investors match your criteria. Try adjusting the search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

