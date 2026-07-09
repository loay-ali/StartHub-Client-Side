"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="hero" data-header-theme="light" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary-light/30 absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="bg-primary text-secondary inline-flex rounded-full px-4 py-2 text-sm font-medium">
              AI-Powered Startup Intelligence
            </span>

            <h1 className="text-text-primary mt-6 text-5xl font-bold leading-[1.1] lg:text-6xl xl:text-7xl">
              Smarter Decisions.
              <br />
              Stronger Startups.
            </h1>

            <p className="text-text-secondary mt-6 max-w-lg text-lg leading-8">
              Transform business data into actionable insights with AI-powered
              analysis, business model evaluation, and intelligent recruitment
              support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary-dark rounded-xl px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105">
                Get Started
              </button>

              <button className="border-border hover:bg-surface-hover rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto h-[500px] w-full max-w-xl"
          >
            {/* Main Dashboard */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-surface border-border absolute top-1/2 left-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-6 shadow-[0_20px_60px_rgba(20,184,166,0.15)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">
                    Startup Overview
                  </p>
                  <h3 className="text-text-primary text-lg font-semibold">
                    StartHub Analytics
                  </h3>
                </div>

                <div className="bg-primary-light text-primary-dark rounded-full px-3 py-1 text-xs font-medium">
                  AI Active
                </div>
              </div>

              {/* Fake Chart */}
              <div className="mb-6 flex h-32 items-end gap-2">
                <div className="bg-primary-light h-12 flex-1 rounded-t-md" />
                <div className="bg-primary h-20 flex-1 rounded-t-md" />
                <div className="bg-primary-dark h-28 flex-1 rounded-t-md" />
                <div className="bg-primary h-24 flex-1 rounded-t-md" />
                <div className="bg-primary-light h-16 flex-1 rounded-t-md" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-text-secondary text-sm">Growth Score</p>
                  <p className="text-primary text-2xl font-bold">87%</p>
                </div>

                <div>
                  <p className="text-text-secondary text-sm">Risk Level</p>
                  <p className="text-success text-2xl font-bold">Low</p>
                </div>
              </div>
            </motion.div>

            {/* Business Health */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-surface border-border absolute top-6 left-1/2 -translate-x-[180px] rounded-2xl border p-4 shadow-lg"
            >
              <p className="text-text-secondary text-sm">Business Health</p>
              <p className="text-primary text-3xl font-bold">87%</p>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-surface border-border absolute top-20 right-6 rounded-2xl border p-4 shadow-lg"
            >
              <p className="text-text-secondary text-sm">AI Insights</p>
              <p className="text-accent text-3xl font-bold">24</p>
            </motion.div>

            {/* CV Analysis */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-surface border-border absolute bottom-2 left-1/2 -translate-x-[170px] rounded-2xl border p-4 shadow-lg"
            >
              <p className="text-text-secondary text-sm">CVs Analyzed</p>
              <p className="text-info text-3xl font-bold">156</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
