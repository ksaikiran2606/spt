"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero").then((m) => ({ default: m.Hero })), {
  ssr: false,
  loading: () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)]">
          Empowering Businesses with{" "}
          <span className="text-[var(--primary)]">Intelligent AI Solutions</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--muted)]">Loading...</p>
      </div>
    </section>
  ),
});

export function HeroDynamic() {
  return <Hero />;
}
