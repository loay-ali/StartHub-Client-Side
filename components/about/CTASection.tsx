"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="bg-primary relative overflow-hidden rounded-[40px] p-12 text-center lg:p-20"
        >
          <div className="bg-white/10 absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl" />

          <h2 className="mb-6 text-4xl font-bold text-white lg:text-6xl">
            Ready To Make
            <br />
            Smarter Decisions?
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/90">
            Start analyzing your business with AI-powered insights and
            data-driven recommendations.
          </p>

          <div className="mt-10">
            <button className="text-primary rounded-xl bg-white px-8 py-4 font-semibold transition hover:scale-105">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
