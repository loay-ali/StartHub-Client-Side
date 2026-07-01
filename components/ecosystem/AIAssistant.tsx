"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, Bot, CornerDownLeft } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

interface ResultItem {
  emoji: string;
  title: string;
  sub: string;
}

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  results?: ResultItem[];
}

const suggestions = [
  "Find investors in CleanTech with $500k+ tickets",
  "Show me open corporate challenges in FinTech",
  "Show vetted AI startups with over $1M ARR",
];

const mockReplies: Record<string, { text: string; results?: ResultItem[] }> = {
  "Find investors in CleanTech with $500k+ tickets": {
    text: "Here are 3 vetted investment funds matching CleanTech and $500k+ tickets in our network:",
    results: [
      { emoji: "🌲", title: "Sequoia Capital", sub: "Ticket: $1M - $15M · Match: 98%" },
      { emoji: "⚡", title: "General Catalyst", sub: "Ticket: $1.5M - $12M · Match: 92%" },
      { emoji: "🌱", title: "Angel Syndicate Alpha", sub: "Ticket: $100k - $500k · Match: 90%" },
    ],
  },
  "Show me open corporate challenges in FinTech": {
    text: "Here are active innovation briefs published by corporate partners in Financial Technology:",
    results: [
      { emoji: "💳", title: "Standard Chartered Bank", sub: "Cross-Border Settlement AI Engine · Prize: $175k" },
      { emoji: "🔒", title: "Barclays Labs", sub: "Real-time High-frequency Fraud Detection · Prize: $100k" },
    ],
  },
  "Show vetted AI startups with over $1M ARR": {
    text: "Here are AI-native startups with over $1M ARR currently active in the ecosystem:",
    results: [
      { emoji: "🤖", title: "Optima AI", sub: "Autonomous Customer Success · $2.4M ARR · 98% Match" },
      { emoji: "🛡️", title: "Aura Cyber", sub: "Zero-Knowledge Kubernetes Guard · $1.8M ARR · 91% Match" },
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

      // Look up in mock database
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
    }, 1200);
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
          <div className={styles.aiChatBox}>
            {/* Header */}
            <div className={styles.aiChatHeader}>
              <div className={styles.aiChatHeaderIcon}>
                <Sparkles size={18} />
              </div>
              <div>
                <div className={styles.aiChatTitle}>StarHub AI Partner Matcher</div>
                <div className={styles.aiChatSub}>Ecosystem agent · Online</div>
              </div>
            </div>

            {/* Chat Body */}
            <div className={styles.aiChatBody} style={{ overflowY: "auto" }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.sender === "user" ? styles.chatMsgUser : styles.chatMsgAI}
                >
                  <div className="flex items-start gap-2">
                    {m.sender === "ai" && <Bot size={16} className="mt-1 text-teal-600 flex-shrink-0" />}
                    {m.sender === "user" && <User size={16} className="mt-1 text-white flex-shrink-0" />}
                    <div>
                      <div>{m.text}</div>
                      {m.results && (
                        <div className={styles.aiResultsGrid}>
                          {m.results.map((r, rIdx) => (
                            <div key={rIdx} className={styles.aiResultItem}>
                              <span className={styles.aiResultEmoji}>{r.emoji}</span>
                              <div>
                                <div className={styles.aiResultTitle}>{r.title}</div>
                                <div className={styles.aiResultSub}>{r.sub}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={styles.chatMsgAI}>
                  <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold">
                    <span className={styles.heroEyebrowDot} />
                    <span>AI is searching network nodes...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions panel */}
            <div className="px-5 py-3 bg-teal-50/50 border-t border-teal-100 flex flex-wrap gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  disabled={isTyping}
                  className="text-xs bg-white text-teal-800 border border-teal-200 hover:border-teal-400 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className={styles.aiChatInputRow}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about CleanTech funds, FinTech challenges, AI startups..."
                className={styles.aiInput}
                disabled={isTyping}
              />
              <button type="submit" className={styles.aiSendBtn} disabled={isTyping}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
