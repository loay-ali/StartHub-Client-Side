"use client";

import { motion } from "framer-motion";
import { FiTarget, FiEye } from "react-icons/fi";

export default function MissionVisionSection() {
  return (
    <section className="bg-surface py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Purpose
          </span>

          <h2 className="text-text-primary mt-4 text-4xl font-bold lg:text-5xl">
            Mission & Vision
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-background border-border rounded-3xl border p-10 shadow-sm"
          >
            <div className="bg-primary-light text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
              <FiTarget size={30} />
            </div>

            <h3 className="text-text-primary mb-4 text-3xl font-bold">
              Our Mission
            </h3>

            <p className="text-text-secondary text-lg leading-8">
              Empower startups with intelligent insights, business analysis, and
              AI-driven recommendations to support confident decision making and
              sustainable growth.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-background border-border rounded-3xl border p-10 shadow-sm"
          >
            <div className="bg-primary-light text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
              <FiEye size={30} />
            </div>

            <h3 className="text-text-primary mb-4 text-3xl font-bold">
              Our Vision
            </h3>

            <p className="text-text-secondary text-lg leading-8">
              Become the leading platform for startup intelligence, helping
              founders transform uncertainty into opportunity through technology
              and innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
