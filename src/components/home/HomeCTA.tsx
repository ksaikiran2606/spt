"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <ScrollReveal variant="scale" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[var(--border-light)] bg-white p-10 md:p-16 text-center relative overflow-hidden shadow-[0_4px_16px_var(--shadow-soft)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-accent)]/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)] mb-4">
              Ready to transform your business with AI?
            </h2>
            <p className="text-[var(--text-body)] max-w-xl mx-auto mb-8">
              Get a custom quote or book a demo. Our team will help you find the right AI solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 group w-full sm:w-auto">
                  Get a quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/book-demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
