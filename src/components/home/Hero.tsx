"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "./HeroScene";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <HeroScene />
      {/* Very subtle purple gradient glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(106, 90, 205, 0.05) 0%, transparent 55%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-heading)] leading-tight"
        >
          Empowering Businesses with{" "}
          <span className="text-[var(--navy-primary)]">Intelligent AI Solutions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg sm:text-xl text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed"
        >
          From chatbots to custom AI systems—we build, deploy, and scale AI that drives real business outcomes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/#services">
            <Button size="lg" className="gap-2 group">
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="gap-2">
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[var(--border-light)] flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--purple-accent)]" />
        </motion.div>
      </div>
    </section>
  );
}
