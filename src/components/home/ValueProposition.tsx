"use client";

import { Zap, Shield, Globe, Headphones } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Zap,
    title: "Speed to value",
    description: "We ship MVPs and production systems in weeks, not months, with clear milestones.",
  },
  {
    icon: Shield,
    title: "Enterprise-ready",
    description: "Security, compliance, and scalability built in from day one.",
  },
  {
    icon: Globe,
    title: "Global delivery",
    description: "Remote-first team with experience across industries and time zones.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    description: "Ongoing optimization and support so your AI keeps performing.",
  },
];

export function ValueProposition() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)]">
            Why choose SPT Solutions
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" start="top 90%" className="text-center mb-16">
          <p className="text-[var(--text-body)] max-w-2xl mx-auto">
            We combine cutting-edge AI with deep domain expertise to deliver results that matter.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUpStagger" stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className={cn(
                "rounded-xl border border-[var(--border-light)] bg-white p-6",
                "transition-all duration-300 hover:shadow-[0_8px_24px_var(--shadow-medium)] hover:border-[var(--purple-accent)]/30 hover:-translate-y-1"
              )}
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--purple-accent)]/10 flex items-center justify-center text-[var(--purple-accent)] mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-[var(--text-heading)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
