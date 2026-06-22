"use client";

import { motion } from "framer-motion";
import {
  FiDatabase,
  FiBarChart2,
  FiCpu,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const workflowSteps = [
  {
    icon: FiDatabase,
    title: "Startup Data",
    description:
      "Collect and organize business information from different sources.",
  },
  {
    icon: FiBarChart2,
    title: "Business Analysis",
    description:
      "Evaluate business models, risks, opportunities, and sustainability.",
  },
  {
    icon: FiCpu,
    title: "AI Insights",
    description: "Generate intelligent recommendations from business data.",
  },
  {
    icon: FiUsers,
    title: "Smart Hiring",
    description: "Analyze candidate profiles and support hiring decisions.",
  },
  {
    icon: FiTrendingUp,
    title: "Growth Decisions",
    description: "Turn insights into actions that support long-term growth.",
  },
];

export default function WorkflowSection() {
  return (
    <section className="bg-surface py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Workflow
          </span>

          <h2 className="text-text-primary mt-4 text-4xl font-bold lg:text-5xl">
            How StartHub Works
          </h2>

          <p className="text-text-secondary mx-auto mt-6 max-w-3xl text-lg leading-8">
            From business data to confident decisions, StartHub guides startups
            through every stage of analysis and growth.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="mx-auto max-w-3xl">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="bg-background border-border rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-5">
                    <div className="bg-primary-light text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                      <Icon size={28} />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-primary text-sm font-bold">
                          0{index + 1}
                        </span>

                        <h3 className="text-text-primary text-xl font-semibold">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-text-secondary leading-7">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {index !== workflowSteps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="bg-primary/20 h-12 w-[2px]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
