"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, Bot, Check, ArrowRight, Activity, AlertCircle } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface ResultItem {
  emoji: string;
  title: string;
  sub: string;
  matchVal?: number;
}

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  results?: ResultItem[];
  notification?: string;
}

const suggestions = [
  "Find investors in CleanTech with $500k+ tickets",
  "Show me open corporate challenges in FinTech",
  "Show vetted AI startups with over $1M ARR",
];

const mockReplies: Record<string, { text: string; results?: ResultItem[] }> = {
  "Find investors in CleanTech with $500k+ tickets": {
    text: "I scanned our capital network and identified 3 venture funds matching CleanTech mandate with ticket sizes starting at $500k+:",
    results: [
      { emoji: "🌲", title: "Sequoia Capital", sub: "Ticket: $1M - $15M · Focus: SaaS, AI/ML, CleanTech", matchVal: 98 },
      { emoji: "⚡", title: "General Catalyst", sub: "Ticket: $1.5M - $12M · Focus: HealthTech, Climate", matchVal: 92 },
      { emoji: "🌱", title: "Angel Syndicate Alpha", sub: "Ticket: $100k - $500k · Focus: DeepTech, Security", matchVal: 90 },
    ],
  },
  "Show me open corporate challenges in FinTech": {
    text: "Here are active innovation briefs published by global financial institutions seeking pilot startups:",
    results: [
      { emoji: "💳", title: "Standard Chartered Bank", sub: "Cross-Border Settlement AI Engine · Prize: $175k · Deadline: 30 days", matchVal: 96 },
      { emoji: "🔒", title: "Barclays Labs", sub: "Real-time High-frequency Fraud Detection · Prize: $100k · Deadline: 12 days", matchVal: 89 },
    ],
  },
  "Show vetted AI startups with over $1M ARR": {
    text: "Here are high-growth, vetted AI-native startups with over $1M ARR currently active in our sandbox:",
    results: [
      { emoji: "🤖", title: "Optima AI", sub: "Autonomous Customer Success · $2.4M ARR · YoY Growth: 140%", matchVal: 98 },
      { emoji: "🛡️", title: "Aura Cyber", sub: "Zero-Knowledge Kubernetes Guard · $1.8M ARR · SLA: 99.99%", matchVal: 91 },
    ],
  },
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am the StarHub Ecosystem Co-pilot. How can I help you find startups, active corporate challenges, or matching investors today?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    // User message
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // AI answer simulation
    setTimeout(() => {
      let replyText = "I processed your request, but that exact query didn't return matches. Try clicking one of the suggested prompts below for a live demo.";
      let replyResults: ResultItem[] | undefined;

      const matchKey = Object.keys(mockReplies).find((k) =>
        text.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(text.toLowerCase())
      );

      if (matchKey) {
        replyText = mockReplies[matchKey].text;
        replyResults = mockReplies[matchKey].results;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: replyText,
          results: replyResults,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className={`${styles.section} ${styles.sectionPad}`}>
      <div className={styles.innerNarrow}>
        <Reveal>
          <SectionHeading
            label="AI Matchmaker"
            title={
              <>
                Ecosystem <span className="text-teal-500">Co-pilot</span>
              </>
            }
            sub="Interact with StarHub AI to run complex ecosystem queries, scan deck vaults, and schedule introductions."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            {/* Live Telemetry Status Bar */}
            <div className="absolute top-[-30px] right-2 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
              <Activity size={10} className="text-teal-500 animate-pulse" />
              <span>AI Core: 99.4% Latency: 42ms</span>
            </div>

            <div className="max-w-[780px] mx-auto bg-white dark:bg-[#0b131a] border border-slate-200/50 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-xl shadow-teal-500/5 flex flex-col min-h-[500px]">
              {/* Header */}
              <div className="p-4 px-6 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/10">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">StarHub AI Co-pilot</div>
                    <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping inline-block" />
                      <span>Ready for Matching Queries</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-teal-500/5 border border-teal-500/10 rounded-lg">
                  <AlertCircle size={12} className="text-teal-500" />
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Demo Sandbox Mode</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto max-h-[380px] min-h-[300px] bg-slate-50/20 dark:bg-slate-950/10">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex gap-3 max-w-[85%] ${
                        m.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold ${
                        m.sender === "user" ? "bg-teal-600" : "bg-gradient-to-r from-slate-700 to-slate-800"
                      }`}>
                        {m.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                      </div>

                      {/* Msg bubble */}
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-tr-none"
                          : "bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-800 dark:text-slate-250 rounded-tl-none"
                      }`}>
                        <p>{m.text}</p>

                        {/* Rich Result Cards */}
                        {m.results && (
                          <div className="flex flex-col gap-2.5 mt-3">
                            {m.results.map((r, rIdx) => (
                              <div
                                key={rIdx}
                                className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/60 p-3 rounded-xl flex items-center justify-between hover:border-teal-500/40 dark:hover:border-teal-500/30 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl p-1.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-lg">{r.emoji}</span>
                                  <div>
                                    <div className="font-bold text-slate-850 dark:text-slate-200 flex items-center gap-1.5 text-xs md:text-sm">
                                      <span>{r.title}</span>
                                      {r.matchVal && (
                                        <span className="px-1.5 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[9px] font-extrabold uppercase">
                                          {r.matchVal}% Match
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-455 mt-0.5">{r.sub}</div>
                                  </div>
                                </div>

                                <button
                                  onClick={() => showToast(`Match introduction request sent to ${r.title}!`)}
                                  className="px-2.5 py-1 text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:border-teal-500/40 hover:bg-teal-500/5 hover:text-[#14b8a6] rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                                >
                                  <span>Request Intro</span>
                                  <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Simulated typing loading */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3 self-start max-w-[85%]"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold bg-gradient-to-r from-slate-700 to-slate-800">
                        <Bot size={14} />
                      </div>
                      <div className="p-3 px-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-800 dark:text-slate-300 rounded-2xl rounded-tl-none flex items-center gap-2">
                        {/* Bouncing typing animation */}
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0s" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Scanning network nodes...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions Panel */}
              <div className="px-6 py-3.5 bg-teal-500/[0.02] border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-2">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Try preset matchmaker inputs:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => handleSend(sug)}
                      disabled={isTyping}
                      className="text-xs bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-400 border border-teal-500/10 dark:border-teal-500/5 hover:border-teal-500/30 hover:bg-teal-500/[0.04] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm text-left"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="p-4 px-6 border-t border-slate-100 dark:border-slate-800/50 flex gap-2 items-center bg-slate-50/30 dark:bg-slate-900/10"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask StarHub AI to matching CleanTech funds, FinTech challenges, AI startups..."
                  className="flex-1 py-2.5 px-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/80 rounded-xl text-sm focus:outline-none focus:border-teal-500/80 dark:focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 transition text-slate-800 dark:text-slate-100 font-medium placeholder-slate-400 dark:placeholder-slate-500"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 text-white flex items-center justify-center cursor-pointer transition-all shadow-md shadow-teal-500/10 disabled:opacity-50"
                  disabled={isTyping}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

            {/* Custom Interactive Toast Alert */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 15, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 15, x: "-50%" }}
                  className="fixed bottom-6 left-1/2 bg-slate-950/95 border border-teal-500/20 text-white py-3 px-5 rounded-2xl shadow-xl shadow-teal-500/10 z-[100000] flex items-center gap-2 text-xs font-bold"
                >
                  <Check size={14} className="text-teal-400 bg-teal-400/10 p-0.5 rounded-full" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
