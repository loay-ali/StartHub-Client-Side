"use client";
import { Sparkles, Calendar, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const stories = [
  {
    company: "GreenGrid",
    industry: "CleanTech & Energy",
    logo: "🌲",
    logoBg: "linear-gradient(135deg, #10b981, #047857)",
    problem: "Struggled to identify corporate innovation buyers interested in localized battery balancing pilots.",
    solution: "Matched with Barclays Labs, deployed their smart battery tracking engine in 3 grid substations.",
    impact: "Reduced energy distribution overhead by 22% and secured a multi-year commercial contract.",
    aiTag: "Barclays Labs Match (95%)",
    timeline: [
      { day: "Day 1", label: "AI Match" },
      { day: "Day 4", label: "Tech Demo" },
      { day: "Day 11", label: "Pilot Approved" },
    ],
    results: [
      { val: "$150k", lbl: "Pilot Fund" },
      { val: "11 Days", lbl: "Match Time" },
      { val: "22%", lbl: "Grid Overhead" },
    ],
  },
  {
    company: "Aura Cyber",
    industry: "Kubernetes Security",
    logo: "🛡️",
    logoBg: "linear-gradient(135deg, #0d9488, #0f766e)",
    problem: "Needed early-stage institutional venture funds aligned with enterprise security infrastructure.",
    solution: "Secured introductions to Sequoia Capital after automated technical auditing of their pitch vault.",
    impact: "Closed a $1.8M seed round and expanded their engineering team to service 15 enterprise pipelines.",
    aiTag: "Sequoia Capital Match (98%)",
    timeline: [
      { day: "Day 1", label: "AI Discovery" },
      { day: "Day 7", label: "Partner Meeting" },
      { day: "Day 21", label: "Round Closed" },
    ],
    results: [
      { val: "$1.8M", lbl: "Seed Funding" },
      { val: "3 Weeks", lbl: "Fund Cycle" },
      { val: "4.2x", lbl: "Pipeline Multiplier" },
    ],
  },
  {
    company: "Optima AI",
    industry: "Enterprise SaaS",
    logo: "🤖",
    logoBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    problem: "Targeting high-security banking environments to deploy autonomous chat agents.",
    solution: "Matched with Standard Chartered, verifying compliance rules automatically inside secure sandboxes.",
    impact: "Launched 3 enterprise agents, resolving 40,050+ tickets with 94% customer satisfaction.",
    aiTag: "Standard Chartered Match (94%)",
    timeline: [
      { day: "Day 1", label: "Sandbox Deploy" },
      { day: "Day 5", label: "Compliance Pass" },
      { day: "Day 15", label: "Contract Signed" },
    ],
    results: [
      { val: "3 Deals", lbl: "POCs Closed" },
      { val: "15 Days", lbl: "Contracting" },
      { val: "+$400k", lbl: "New ARR" },
    ],
  },
];

export default function SuccessStories() {
  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Proof"
            title={
              <>
                Ecosystem <span className="text-teal-500">Success Stories</span>
              </>
            }
            sub="Real connections. Real outcomes. Read detailed case studies of startups and enterprise leaders scaling cooperation."
          />
        </Reveal>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {stories.map((story, idx) => (
            <Reveal key={story.company} delay={idx * 80}>
              <div className="bg-white dark:bg-[#0b131a] border border-slate-200/50 dark:border-slate-800/80 rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-full shadow-lg shadow-teal-500/[0.02] hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/30 dark:hover:border-teal-500/20 transition-all duration-300">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md shadow-teal-500/5"
                      style={{ background: story.logoBg }}
                    >
                      {story.logo}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base md:text-lg text-slate-850 dark:text-slate-200">{story.company}</h4>
                      <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{story.industry}</div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 text-xs md:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Challenge:</strong> {story.problem}
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Solution:</strong> {story.solution}
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Impact:</strong> {story.impact}
                    </p>
                  </div>
                </div>

                {/* Timeline & Outcomes */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60 space-y-5">
                  {/* Timeline steps */}
                  <div>
                    <div className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                      <Clock size={11} /> Milestone Timeline
                    </div>
                    <div className="flex justify-between items-center relative px-2">
                      {/* Timeline track line */}
                      <div className="absolute top-[9px] left-8 right-8 h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />
                      
                      {story.timeline.map((item, tIdx) => (
                        <div key={item.day} className="flex flex-col items-center z-10 text-center">
                          <div className="w-5 h-5 rounded-full bg-teal-500 text-white text-[9px] font-extrabold flex items-center justify-center border-4 border-white dark:border-[#0b131a] shadow-sm">
                            {tIdx + 1}
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 mt-1">{item.day}</span>
                          <span className="text-[8px] font-bold text-slate-450 dark:text-slate-500 whitespace-nowrap mt-0.5">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes metrics grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50/[0.4] dark:bg-slate-900/10 p-3 rounded-2xl border border-slate-100/40 dark:border-slate-800/30 text-center">
                    {story.results.map((res, rIdx) => (
                      <div key={rIdx} className="space-y-1">
                        <div className="text-xs md:text-sm font-extrabold text-teal-650 dark:text-teal-400">{res.val}</div>
                        <div className="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase tracking-wider">{res.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Match tag */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-650 dark:text-teal-450 bg-teal-500/10 px-2.5 py-1.5 rounded-xl w-fit">
                    <Sparkles size={11} className="text-teal-600 dark:text-teal-400" />
                    <span>{story.aiTag}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
