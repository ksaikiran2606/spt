"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/lib/services";
import { Button } from "@/components/ui/Button";

interface Props {
  service: ServiceItem;
}

export function ServicePageClient({ service }: Props) {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--primary)] font-medium"
        >
          Service
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-4xl md:text-5xl font-bold text-[var(--foreground)]"
        >
          {service.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-[var(--muted)]"
        >
          {service.shortDescription}
        </motion.p>
      </section>

      {/* Description */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-[var(--foreground)] mb-4"
        >
          What it is
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--muted)] leading-relaxed"
        >
          {service.description}
        </motion.p>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-[var(--foreground)] mb-6"
        >
          How it works
        </motion.h2>
        <ul className="space-y-3">
          {service.howItWorks.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 text-[var(--muted)]"
            >
              <span className="text-[var(--primary)] font-medium shrink-0">{i + 1}.</span>
              {step}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Benefits & Use cases - two columns */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 grid md:grid-cols-2 gap-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-[var(--foreground)] mb-4"
          >
            Benefits
          </motion.h2>
          <ul className="space-y-2">
            {service.benefits.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[var(--muted)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold text-[var(--foreground)] mb-4"
          >
            Use cases
          </motion.h2>
          <ul className="space-y-2">
            {service.useCases.map((u, i) => (
              <motion.li
                key={u}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[var(--muted)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                {u}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--border-light)] bg-[var(--white-primary)] p-8 md:p-12 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            Ready to get started?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Get a tailored quote for {service.name}. Our team will respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2 group">
                Get Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/book-demo">
              <Button variant="outline" size="lg">
                Book a demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
