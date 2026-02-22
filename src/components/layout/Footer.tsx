"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/recommendation", label: "Find your solution" },
  { href: "/book-demo", label: "Book a demo" },
];

const social = [
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Github, label: "GitHub" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy-primary)] border-t border-[var(--navy-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              SPT Solutions
            </Link>
            <p className="mt-4 text-sm text-[var(--text-muted)] max-w-xs">
              Empowering businesses with intelligent AI solutions. We build custom AI that scales with you.
            </p>
            <div className="mt-4 flex gap-4">
              {social.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-[var(--text-muted)] hover:text-[var(--purple-accent)] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--purple-accent)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--purple-accent)] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-[var(--purple-accent)] hover:underline"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[var(--purple-accent)]" />
                <a href="mailto:hello@sptsolutions.com" className="hover:text-[var(--purple-accent)]">
                  hello@sptsolutions.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[var(--purple-accent)]" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--navy-light)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {currentYear} SPT Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--text-muted)]">
            <Link href="/privacy" className="hover:text-[var(--purple-accent)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--purple-accent)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
