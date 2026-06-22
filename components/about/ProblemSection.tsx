"use client";

import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiBarChart2,
  FiDatabase,
  FiUsers,
} from "react-icons/fi";

const problems = [
  {
    icon: FiAlertCircle,
    title: "Poor Decision Making",
    description:
      "Critical business decisions are often made without enough data or insights.",
  },
  {
    icon: FiBarChart2,
    title: "Business Uncertainty",
    description:
      "Founders struggle to evaluate sustainability, growth potential, and risks.",
  },
  {
    icon: FiDatabase,
    title: "Scattered Insights",
    description:
      "Important business information is spread across multiple sources and tools.",
  },
  {
    icon: FiUsers,
    title: "Hiring Challenges",
    description:
      "Finding and evaluating the right talent can be time-consuming and inefficient.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Challenges
          </span>

          <h2 className="text-text-primary mt-4 text-4xl font-bold lg:text-5xl">
            The Challenges Startups Face
          </h2>

          <p className="text-text-secondary mt-6 text-lg leading-8">
            Startups face complex obstacles that make growth and sustainability
            difficult. Understanding these challenges is the first step toward
            making smarter business decisions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="bg-surface border-border group rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="bg-primary-light text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} />
                </div>

                <h3 className="text-text-primary mb-3 text-xl font-semibold">
                  {problem.title}
                </h3>

                <p className="text-text-secondary leading-7">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
