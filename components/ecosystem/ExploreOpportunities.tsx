"use client";
import { useState, useMemo } from "react";
import { Sparkles, Calendar, Award, Building, Filter, Search, MapPin, DollarSign, Clock, Send } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationModal from "./application/ApplicationModal";

// Combined Data
const challengesData = [
  {
    id: 1,
    org: "Mercedes Labs",
    orgType: "Automotive & Logistics",
    avatar: "ML",
    avatarBg: "#0f766e",
    title: "Decarbonization Fleet Tracking Engine",
    industry: "CleanTech",
    reward: "$150,000",
    stage: "Series A+",
    status: "open",
    deadline: "12 days left",
  },
  {
    id: 2,
    org: "Mayo Alliance",
    orgType: "Healthcare & Research",
    avatar: "MA",
    avatarBg: "#14b8a6",
    title: "AI-Powered Diagnostics Assister",
    industry: "HealthTech",
    reward: "$200,000",
    stage: "Seed+",
    status: "open",
    deadline: "24 days left",
  },
  {
    id: 3,
    org: "Barclays Labs",
    orgType: "Banking & Finance",
    avatar: "BL",
    avatarBg: "#0d9488",
    title: "Real-time High-frequency Fraud Detection",
    industry: "FinTech",
    reward: "$100,000",
    stage: "Any",
    status: "soon",
    deadline: "Opens in Oct",
  },
  {
    id: 4,
    org: "DHL Ventures",
    orgType: "Supply Chain",
    avatar: "DV",
    avatarBg: "#0f8c7e",
    title: "Precision Robotics Warehouse Routing",
    industry: "DeepTech",
    reward: "$120,000",
    stage: "Series A",
    status: "closed",
    deadline: "Ended",
  },
  {
    id: 5,
    org: "UN Innovation",
    orgType: "Global Development",
    avatar: "UN",
    avatarBg: "#22c55e",
    title: "Automated Multi-lingual Document Analysis",
    industry: "AI/ML",
    reward: "$80,000",
    stage: "Any",
    status: "open",
    deadline: "5 days left",
  },
  {
    id: 6,
    org: "Standard Chartered",
    orgType: "Corporate Banking",
    avatar: "SC",
    avatarBg: "#be123c",
    title: "Cross-Border Settlement AI Engine",
    industry: "FinTech",
    reward: "$175,000",
    stage: "Series B+",
    status: "open",
    deadline: "8 days left",
  },
];

const programsData = {
  Accelerators: [
    {
      id: 1,
      name: "StarHub Accelerator Cohort 4",
      org: "StarHub & Techstars",
      emoji: "🚀",
      location: "SF / Hybrid",
      funding: "$120k Seed",
      duration: "3 Months",
      deadline: "Oct 15",
    },
    {
      id: 2,
      name: "FinTech Forward 2026",
      org: "MAS Singapore",
      emoji: "🏦",
      location: "Singapore",
      funding: "$100k Equity-free",
      duration: "10 Weeks",
      deadline: "Nov 1",
    },
  ],
  Grants: [
    {
      id: 3,
      name: "Clean Energy Innovation Grant",
      org: "US Dept of Energy",
      emoji: "🔋",
      location: "US Only",
      funding: "$250k Equity-free",
      duration: "1 Year",
      deadline: "Sep 30",
    },
    {
      id: 4,
      name: "AI Safety & Research Grant",
      org: "Future of Life",
      emoji: "🛡️",
      location: "Global",
      funding: "$50k - $150k",
      duration: "6 Months",
      deadline: "Oct 31",
    },
  ],
  Competitions: [
    {
      id: 5,
      name: "Global AI Hackathon 2026",
      org: "StarHub & Microsoft",
      emoji: "💻",
      location: "Online",
      funding: "$100k Prize Pool",
      duration: "48 Hours",
      deadline: "Sep 12",
    },
    {
      id: 6,
      name: "Urban Sustainability Cup",
      org: "Siemens Innovation",
      emoji: "🏙️",
      location: "Munich / Hybrid",
      funding: "€50k cash prize",
      duration: "3 Weeks",
      deadline: "Oct 5",
    },
  ],
};

const TAB_TYPES = ["Corporate Challenges", "Accelerators", "Grants", "Competitions"] as const;
type TabType = typeof TAB_TYPES[number];

const industries = ["All", "FinTech", "HealthTech", "CleanTech", "AI/ML", "DeepTech"];

export default function ExploreOpportunities() {
  const [activeTab, setActiveTab] = useState<TabType>("Corporate Challenges");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);

  const handleApplyClick = (title: string) => {
    setSelectedOpportunity(title);
    setIsModalOpen(true);
  };

  // Filtering Logic
  const filteredChallenges = useMemo(() => {
    return challengesData.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = activeFilter === "All" || c.industry === activeFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, activeFilter]);

  const filteredPrograms = useMemo(() => {
    if (activeTab === "Corporate Challenges") return [];
    
    // Map tab type to key in programsData
    const dataKey = activeTab === "Accelerators" 
      ? "Accelerators" 
      : activeTab === "Grants" 
      ? "Grants" 
      : "Competitions";

    return programsData[dataKey].filter((pr) => {
      return (
        pr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeTab, searchQuery]);

  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Explore Opportunities"
            title={
              <>
                Active Ecosystem <span className="text-teal-500">Opportunities</span>
              </>
            }
            sub="Apply to active innovation challenges, accelerator cohorts, grants, and technology hackathons all in one hub."
          />
        </Reveal>

        {/* Unified Search & Tab Switcher Bar */}
        <Reveal delay={100}>
          <div className="flex flex-col gap-6 mb-8 bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 p-4 md:p-6 rounded-[28px] backdrop-blur-md">
            {/* Top Row: Tabs & Search */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              {/* Tab Selector */}
              <div className="flex bg-slate-100 dark:bg-slate-950/80 p-1.5 rounded-2xl border border-slate-200/35 dark:border-slate-800/50 shadow-sm max-w-full overflow-x-auto scrollbar-none gap-1">
                {TAB_TYPES.map((tab) => {
                  const active = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSearchQuery("");
                      }}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap relative ${
                        active
                          ? "text-[#14b8a6] font-bold"
                          : "text-slate-650 dark:text-slate-450 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/40 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeOpportunitySubTab"
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200/40 dark:border-slate-800/40"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" size={15} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200/65 dark:border-slate-800/80 rounded-2xl text-xs md:text-sm focus:outline-none focus:border-teal-500/80 dark:focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 transition"
                />
              </div>
            </div>

            {/* Bottom Row: Filter chips (only visible on Corporate Challenges tab) */}
            {activeTab === "Corporate Challenges" && (
              <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-150/40 dark:border-slate-850/40 pt-4">
                <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mr-1">
                  <Filter size={11} /> Industry:
                </span>
                {industries.map((ind) => (
                  <button
                    key={ind}
                    className={`${styles.filterChip} ${activeFilter === ind ? styles.filterChipActive : ""}`}
                    onClick={() => setActiveFilter(ind)}
                    style={{ margin: 0 }}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "_" + activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Corporate Challenges" ? (
                <>
                  {filteredChallenges.length > 0 ? (
                    <div className={styles.challengeGrid}>
                      {filteredChallenges.map((ch, idx) => (
                        <div key={ch.id} className={styles.challengeCard}>
                          {/* Org header */}
                          <div className={styles.challengeOrg}>
                            <div
                              className={styles.challengeOrgAvatar}
                              style={{ backgroundColor: ch.avatarBg }}
                            >
                              {ch.avatar}
                            </div>
                            <div>
                              <div className={styles.challengeOrgName}>{ch.org}</div>
                              <div className={styles.challengeOrgType}>{ch.orgType}</div>
                            </div>
                          </div>

                          {/* Challenge Title */}
                          <h3 className={styles.challengeTitle}>{ch.title}</h3>

                          {/* Challenge Meta */}
                          <div className={styles.challengeMeta}>
                            <div>
                              <div className={styles.metaLabel}>Industry</div>
                              <div className={styles.metaValue}>{ch.industry}</div>
                            </div>
                            <div>
                              <div className={styles.metaLabel}>Prize / Budget</div>
                              <div className={styles.metaValue}>{ch.reward}</div>
                            </div>
                            <div>
                              <div className={styles.metaLabel}>Eligibility</div>
                              <div className={styles.metaValue}>{ch.stage}</div>
                            </div>
                            <div>
                              <div className={styles.metaLabel}>Status</div>
                              <div style={{ marginTop: "4px" }}>
                                {ch.status === "open" && (
                                  <span className={`${styles.statusBadge} ${styles.statusOpen}`}>Open</span>
                                )}
                                {ch.status === "soon" && (
                                  <span className={`${styles.statusBadge} ${styles.statusSoon}`}>Soon</span>
                                )}
                                {ch.status === "closed" && (
                                  <span className={`${styles.statusBadge} ${styles.statusClosed}`}>Closed</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Footer / Deadline */}
                          <div className={styles.challengeFooter}>
                            <span>Deadline</span>
                            <span className={ch.status === "open" ? styles.deadlineBlink : ""}>
                              {ch.deadline}
                            </span>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
                            <button 
                              onClick={() => handleApplyClick(ch.title)}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition-colors"
                            >
                              <span>Apply</span>
                              <Send size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-[24px]">
                      <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        No challenges match your search or filter criteria.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {filteredPrograms.length > 0 ? (
                    <div className={styles.programsGrid}>
                      {filteredPrograms.map((pr) => (
                        <div key={pr.id} className={styles.programCard}>
                          <div className={styles.programEmoji}>{pr.emoji}</div>
                          <div style={{ flex: 1 }}>
                            <h4 className={styles.programName}>{pr.name}</h4>
                            <div className={styles.programOrg}>{pr.org}</div>

                            <div className={styles.programMetaRow}>
                              <div className={styles.programMetaItem}>
                                <MapPin size={13} className="text-teal-500" />
                                <span>{pr.location}</span>
                              </div>
                              <div className={styles.programMetaItem}>
                                <DollarSign size={13} className="text-teal-500" />
                                <span>{pr.funding}</span>
                              </div>
                              <div className={styles.programMetaItem}>
                                <Clock size={13} className="text-teal-500" />
                                <span>{pr.duration}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className={styles.programDeadline}>
                                Deadline: {pr.deadline}
                              </div>
                              <button 
                                onClick={() => handleApplyClick(pr.name)}
                                className={styles.programApplyBtn}
                              >
                                <span>Apply</span>
                                <Send size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-[24px]">
                      <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        No programs found matching your search.
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <ApplicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunityTitle={selectedOpportunity}
      />
    </section>
  );
}
