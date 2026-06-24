"use client";

import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const timeline = [
  {
    icon: FiAlertTriangle,
    title: "The Problem",
    description:
      "Many startups fail despite having innovative ideas and strong potential.",
  },
  {
    icon: FiSearch,
    title: "The Insight",
    description:
      "We discovered that poor decisions often stem from limited business visibility.",
  },
  {
    icon: FiTarget,
    title: "The Challenge",
    description:
      "Founders need clear insights to evaluate risks, opportunities, and growth.",
  },
  {
    icon: FiTrendingUp,
    title: "The Solution",
    description:
      "StartHub combines AI and business intelligence to support smarter decisions.",
  },
];

export default function StorySection() {
  return (
    <section className="bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
              Our Story
            </span>

            <h2 className="text-text-primary mt-4 text-4xl font-bold leading-tight lg:text-5xl">
              Why We Built StartHub
            </h2>

            <p className="text-text-secondary mt-8 max-w-xl text-lg leading-8">
              We noticed that many startups struggle to survive, not because
              they lack innovative ideas, but because they make critical
              decisions without access to clear, actionable insights.
            </p>

            <p className="text-text-secondary mt-6 max-w-xl text-lg leading-8">
              That's why we created StartHub — a platform that combines business
              intelligence, artificial intelligence, and recruitment analysis to
              help startups make smarter decisions with confidence.
            </p>
          </motion.div>

          {/* Right Side Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-primary/20 absolute top-0 left-6 h-full w-[2px]" />

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="relative flex gap-6"
                  >
                    <div className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg">
                      <Icon size={22} />
                    </div>

                    <div className="bg-background border-border flex-1 rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-lg">
                      <h3 className="text-text-primary text-lg font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-text-secondary mt-2 leading-7">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
