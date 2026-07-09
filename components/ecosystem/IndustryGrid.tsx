"use client";
import { useState, useMemo } from "react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";
import { Sparkles, Building2, Users, Rocket, Target, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  { name: "Artificial Intelligence", emoji: "🧠", count: "820 Startups" },
  { name: "FinTech", emoji: "💳", count: "412 Startups" },
  { name: "HealthTech & Bio", emoji: "🧬", count: "284 Startups" },
  { name: "CleanTech & Energy", emoji: "🌱", count: "198 Startups" },
  { name: "SaaS & Enterprise", emoji: "☁️", count: "620 Startups" },
  { name: "Cybersecurity", emoji: "🛡️", count: "145 Startups" },
  { name: "Logistics & Mobility", emoji: "🚚", count: "110 Startups" },
  { name: "PropTech & Spaces", emoji: "🏢", count: "95 Startups" },
  { name: "EdTech & Learning", emoji: "🎓", count: "167 Startups" },
  { name: "E-Commerce & Retail", emoji: "🛍️", count: "232 Startups" },
  { name: "Web3 & Blockchain", emoji: "⛓️", count: "180 Startups" },
  { name: "Robotics & IoT", emoji: "🤖", count: "88 Startups" },
];

const sectorDiscoveryData: Record<string, {
  startups: { name: string; desc: string; stage: string; funding: string }[];
  investors: { name: string; type: string; ticket: string; compat: string }[];
  challenges: { title: string; org: string; budget: string; deadline: string }[];
  programs: { name: string; type: string; reward: string; deadline: string }[];
}> = {
  "Artificial Intelligence": {
    startups: [
      { name: "Optima AI", desc: "Autonomous AI customer success agents.", stage: "Series A", funding: "$2.4M ARR" },
      { name: "Kortex AI", desc: "Edge inference chip acceleration runtime.", stage: "Seed", funding: "$1.5M Seed" },
    ],
    investors: [
      { name: "Sequoia Capital", type: "Venture Capital", ticket: "$1M - $15M", compat: "98%" },
      { name: "SoftBank Vision Fund", type: "Growth Capital", ticket: "$20M - $100M", compat: "82%" },
    ],
    challenges: [
      { title: "AI-Powered Diagnostics Assister", org: "Mayo Alliance", budget: "$200,000", deadline: "24 days left" },
      { title: "Automated Multi-lingual Document Analysis", org: "UN Innovation", budget: "$80,000", deadline: "5 days left" },
    ],
    programs: [
      { name: "Global AI Hackathon 2026", type: "Hackathon", reward: "$100k Pool", deadline: "Sep 12" },
      { name: "AI Safety & Research Grant", type: "Grant", reward: "$150k max", deadline: "Oct 31" },
    ],
  },
  "FinTech": {
    startups: [
      { name: "PayFlow", desc: "Multi-currency instant checkout routing.", stage: "Seed+", funding: "$800k Raised" },
      { name: "LedgerGuard", desc: "Real-time compliance checks for banks.", stage: "Series A", funding: "$2.1M ARR" },
    ],
    investors: [
      { name: "Andreessen Horowitz", type: "Venture Capital", ticket: "$2M - $20M", compat: "94%" },
      { name: "General Catalyst", type: "Venture Capital", ticket: "$1.5M - $12M", compat: "88%" },
    ],
    challenges: [
      { title: "Real-time High-frequency Fraud Detection", org: "Barclays Labs", budget: "$100,000", deadline: "Opens in Oct" },
      { title: "Cross-Border Settlement AI Engine", org: "Standard Chartered", budget: "$175,000", deadline: "8 days left" },
    ],
    programs: [
      { name: "FinTech Forward 2026", type: "Accelerator", reward: "$100k Equity-free", deadline: "Nov 1" },
    ],
  },
  "HealthTech & Bio": {
    startups: [
      { name: "Quantic Bio", desc: "Quantum simulation for protein folding.", stage: "Seed", funding: "$1.2M Seed" },
      { name: "CardioLife", desc: "Wearable real-time ECG analysis engine.", stage: "Pre-seed", funding: "$400k Raised" },
    ],
    investors: [
      { name: "General Catalyst", type: "Venture Capital", ticket: "$1.5M - $12M", compat: "92%" },
      { name: "Andreessen Horowitz", type: "Venture Capital", ticket: "$2M - $20M", compat: "90%" },
    ],
    challenges: [
      { title: "AI-Powered Diagnostics Assister", org: "Mayo Alliance", budget: "$200,000", deadline: "24 days left" },
    ],
    programs: [
      { name: "BioTech Pioneer Cohort", type: "Accelerator", reward: "$150k Seed", deadline: "Dec 1" },
    ],
  },
  "CleanTech & Energy": {
    startups: [
      { name: "EcoVolt", desc: "Next-gen solid-state battery charge balancing.", stage: "Series A", funding: "$1.8M Raised" },
      { name: "CarbonSync", desc: "Direct air capture localization tracking.", stage: "Seed", funding: "$900k Raised" },
    ],
    investors: [
      { name: "Sequoia Capital", type: "Venture Capital", ticket: "$1M - $15M", compat: "95%" },
      { name: "Angel Syndicate Alpha", type: "Angel Syndicate", ticket: "$100k - $500k", compat: "90%" },
    ],
    challenges: [
      { title: "Decarbonization Fleet Tracking Engine", org: "Mercedes Labs", budget: "$150,000", deadline: "12 days left" },
    ],
    programs: [
      { name: "Clean Energy Innovation Grant", type: "Grant", reward: "$250k Equity-free", deadline: "Sep 30" },
    ],
  },
};

export default function IndustryGrid() {
  const [selectedSector, setSelectedSector] = useState("Artificial Intelligence");

  const discoveryData = useMemo(() => {
    return sectorDiscoveryData[selectedSector] || {
      startups: [
        { name: `${selectedSector} Pro`, desc: `Vetted innovation in ${selectedSector}.`, stage: "Seed", funding: "$1.0M Raised" },
        { name: `${selectedSector} Systems`, desc: `Next-generation ${selectedSector} software.`, stage: "Pre-seed", funding: "$250k Seed" },
      ],
      investors: [
        { name: "General Catalyst", type: "Venture Capital", ticket: "$1.5M - $12M", compat: "85%" },
        { name: "Y Combinator", type: "Seed Accelerator", ticket: "$500k Flat", compat: "80%" },
      ],
      challenges: [
        { title: `Global ${selectedSector} Challenge`, org: "Siemens Innovation", budget: "$100,000", deadline: "20 days left" },
      ],
      programs: [
        { name: `${selectedSector} Venture Batch`, type: "Accelerator", reward: "$100k Seed", deadline: "Nov 30" },
      ],
    };
  }, [selectedSector]);

  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Explore by Sector"
            title={
              <>
                Browse by <span className="text-teal-500">Industry Sector</span>
              </>
            }
            sub="Selecting a technology sector instantly reveals matching startups, capital partners, active challenges, and programs."
          />
        </Reveal>

        {/* Sectors Grid */}
        <div className={styles.industryGrid}>
          {industries.map((ind, idx) => {
            const active = selectedSector === ind.name;
            return (
              <Reveal key={ind.name} delay={idx * 25}>
                <div
                  onClick={() => setSelectedSector(ind.name)}
                  className={`${styles.industryCard} ${
                    active
                      ? "border-teal-500 bg-teal-500/[0.04] dark:bg-teal-500/[0.02] shadow-lg shadow-teal-500/5 ring-1 ring-teal-500/30"
                      : ""
                  }`}
                >
                  <div className={styles.industryIconWrap}>
                    {ind.emoji}
                  </div>
                  <div className={styles.industryName}>{ind.name}</div>
                  <div className={styles.industryCount}>{ind.count}</div>
                  {active && (
                    <motion.div
                      layoutId="activeSectorDot"
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSector}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white dark:bg-[#0b131a] border border-slate-200/50 dark:border-slate-800/80 rounded-[32px] p-6 md:p-8 mt-10 shadow-xl shadow-teal-500/5"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2.5 py-1 rounded-md">
                  Discovery Hub
                </span>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                  Matching Assets in <span className="text-teal-500">{selectedSector}</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Vetted compatibility data updated hourly
              </p>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Startups Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <Rocket size={13} className="text-teal-500" />
                  <span>Vetted Startups</span>
                </div>
                {discoveryData.startups.map((st) => (
                  <div
                    key={st.name}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/[0.3] dark:bg-slate-900/10 hover:border-teal-500/20 transition-colors"
                  >
                    <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200">{st.name}</div>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {st.desc}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-450 uppercase">
                        {st.stage}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{st.funding}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Capital Networks Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <Users size={13} className="text-teal-500" />
                  <span>Interested Capital</span>
                </div>
                {discoveryData.investors.map((inv) => (
                  <div
                    key={inv.name}
                    className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/[0.3] dark:bg-slate-900/10 hover:border-teal-500/20 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200">{inv.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{inv.type}</div>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                      <span className="text-slate-500 dark:text-slate-400">Max Ticket: {inv.ticket.split(" - ")[1] || inv.ticket}</span>
                      <span className="text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                        {inv.compat} Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenges Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <Target size={13} className="text-teal-500" />
                  <span>Open Challenges</span>
                </div>
                {discoveryData.challenges.length > 0 ? (
                  discoveryData.challenges.map((ch) => (
                    <div
                      key={ch.title}
                      className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/[0.3] dark:bg-slate-900/10 hover:border-teal-500/20 transition-colors"
                    >
                      <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 truncate">{ch.title}</div>
                      <div className="text-[10px] text-slate-450 dark:text-slate-450 mt-0.5">{ch.org}</div>
                      <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                        <span className="text-slate-550 dark:text-slate-400">Budget: {ch.budget}</span>
                        <span className="text-amber-600 dark:text-amber-500">{ch.deadline}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 italic py-4">No active challenges in this sector.</p>
                )}
              </div>

              {/* Programs Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  <Building2 size={13} className="text-teal-500" />
                  <span>Ecosystem Programs</span>
                </div>
                {discoveryData.programs.length > 0 ? (
                  discoveryData.programs.map((pr) => (
                    <div
                      key={pr.name}
                      className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/[0.3] dark:bg-slate-900/10 hover:border-teal-500/20 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 truncate">{pr.name}</div>
                        <div className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">{pr.type}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                        <span className="text-slate-550 dark:text-slate-400">Reward: {pr.reward}</span>
                        <span className="text-slate-400 dark:text-slate-550">Ends {pr.deadline}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 italic py-4">No active programs in this sector.</p>
                )}
              </div>
            </div>

            {/* Footer Call-to-action */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end">
              <button className="flex items-center gap-1.5 text-xs font-bold text-teal-650 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-350 transition-colors group cursor-pointer">
                <span>View Full Directory for {selectedSector}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
