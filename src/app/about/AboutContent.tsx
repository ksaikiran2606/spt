"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    text: "We exist to make enterprise-grade AI accessible and actionable for every business.",
  },
  {
    icon: Users,
    title: "Team",
    text: "Our team combines AI research, product design, and industry experience to deliver solutions that work.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We stay at the cutting edge of AI so you get the best tools without the experimentation risk.",
  },
];

export function AboutContent() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[var(--text-heading)]"
        >
          About SPT Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-[var(--text-body)] leading-relaxed"
        >
          We are a premium AI services company helping businesses deploy and scale intelligent solutions. From chatbots and automation to custom AI development, we combine cutting-edge technology with deep domain expertise to deliver results that matter.
        </motion.p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group rounded-xl border border-[var(--border-light)] bg-white p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_24px_var(--shadow-medium)] hover:-translate-y-1 hover:border-[var(--purple-accent)]/30"
            >
              <v.icon className="w-10 h-10 text-[var(--navy-primary)] mb-4 transition-colors duration-300 group-hover:text-[var(--purple-accent)]" />
              <h2 className="font-semibold text-[var(--text-heading)] mb-2">{v.title}</h2>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
