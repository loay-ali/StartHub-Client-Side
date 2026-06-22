"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import AILottie from "./AILottie";

const features = [
  "Analyze Business Data in Real Time",
  "Detect Growth Opportunities",
  "Predict Potential Risks",
  "Generate Smart Recommendations",
];

export default function AISection() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
              Artificial Intelligence
            </span>

            <h2 className="text-text-primary mt-4 text-4xl font-bold lg:text-5xl">
              AI Powered Insights
            </h2>

            <p className="text-text-secondary mt-6 max-w-xl text-lg leading-8">
              StartHub leverages artificial intelligence to transform complex
              business data into meaningful insights, helping founders make
              smarter and faster decisions.
            </p>

            <div className="mt-10 space-y-5">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <FiCheckCircle className="text-primary shrink-0" size={22} />

                  <span className="text-text-primary text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative flex justify-center">
              <div className="bg-primary/10 absolute h-72 w-72 rounded-full blur-3xl" />

              <div className="bg-surface border-border relative flex h-[520px] w-full max-w-xl items-center justify-center rounded-3xl border shadow-sm">
                <AILottie />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
