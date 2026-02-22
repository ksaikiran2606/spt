import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Services | SPT Solutions",
  description: "Explore our AI services: chatbots, automation, development, and more.",
};

export default function ServicesIndexPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Our services</h1>
        <p className="mt-4 text-[var(--muted)]">
          End-to-end AI solutions for every stage of your journey.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--primary)] hover:shadow-[0_0_30px_var(--primary-muted)] transition-all"
            >
              <span className="text-[var(--primary)] font-medium">{s.name}</span>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.shortDescription}</p>
              <span className="mt-2 inline-block text-sm text-[var(--primary)]">Learn more →</span>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/contact">
            <Button size="lg">Get in touch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
