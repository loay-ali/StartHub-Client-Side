"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, Target, MessageSquare } from "lucide-react";

import EcosystemHero from "./EcosystemHero";
import MetricsSection from "./MetricsSection";
import ChallengeMarketplace from "./ChallengeMarketplace";
import IndustryGrid from "./IndustryGrid";
import StartupDiscovery from "./StartupDiscovery";
import InvestorDiscovery from "./InvestorDiscovery";
import ProgramsSection from "./ProgramsSection";
import CommunityFeed from "./CommunityFeed";
import AIAssistant from "./AIAssistant";
import InnovationProcess from "./InnovationProcess";
import SuccessStories from "./SuccessStories";
import EcosystemFinalCTA from "./EcosystemFinalCTA";
import OpportunitiesTimeline from "./Opportunitiestimeline";

const TABS = [
  { id: "all", label: "All Pillars", icon: Compass },
  { id: "directory", label: "Directory", icon: Users },
  { id: "opportunities", label: "Opportunities", icon: Target },
  { id: "ai_social", label: "AI & Feed", icon: MessageSquare },
];

export default function EcosystemPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#060a0f] text-slate-900 dark:text-slate-100 overflow-x-hidden pt-[80px]">
      <EcosystemHero />
      <MetricsSection />

      {/* Interactive Sticky Tab Bar */}
      <div className="sticky top-[80px] z-[40] w-full flex justify-center py-4 px-4 bg-slate-50/70 dark:bg-[#060a0f]/70 backdrop-blur-md border-y border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/35 dark:border-slate-800/50 shadow-sm max-w-full overflow-x-auto scrollbar-none gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap relative ${
                  active
                    ? "text-[#14b8a6] font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/40"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeEcosystemTab"
                    className="absolute inset-0 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200/40 dark:border-slate-800/40"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents with Framer Motion transitions */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {activeTab === "all" && (
              <>
                <ChallengeMarketplace />
                <OpportunitiesTimeline />
                <IndustryGrid />
                <StartupDiscovery />
                <InvestorDiscovery />
                <ProgramsSection />
                <CommunityFeed />
                <AIAssistant />
                <InnovationProcess />
                <SuccessStories />
              </>
            )}

            {activeTab === "directory" && (
              <>
                <StartupDiscovery />
                <InvestorDiscovery />
                <IndustryGrid />
              </>
            )}

            {activeTab === "opportunities" && (
              <>
                <OpportunitiesTimeline />
                <ChallengeMarketplace />
                <ProgramsSection />
                <InnovationProcess />
              </>
            )}

            {activeTab === "ai_social" && (
              <>
                <AIAssistant />
                <CommunityFeed />
                <SuccessStories />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <EcosystemFinalCTA />
    </main>
  );
}