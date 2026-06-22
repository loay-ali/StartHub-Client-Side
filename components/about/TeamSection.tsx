"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Loay",
    role: "Full Stack Developer",
    image: "/loaypic.png",
  },
  {
    name: "Haidy",
    role: "Full Stack Developer",
    image: "/haidy.png",
  },
  {
    name: "Bassant",
    role: "Full Stack Developer",
    image: "/bassant.jpg",
  },
  {
    name: "Manar",
    role: "Full Stack Developer",
    image: "/manar.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Team
          </span>

          <h2 className="text-text-primary mt-4 text-4xl font-bold lg:text-5xl">
            Meet The Team
          </h2>

          <p className="text-text-secondary mx-auto mt-6 max-w-2xl text-lg">
            The people behind StartHub.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
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
              className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-text-primary text-xl font-semibold">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-text-secondary mt-2">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
