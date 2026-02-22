"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    label: "Services",
    children: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--navy-primary)] border-b border-[var(--navy-light)] shadow-lg"
          : "bg-[var(--navy-primary)]"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white hover:text-[var(--purple-accent)] transition-colors"
          >
            SPT Solutions
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) =>
              "children" in item ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 py-2 text-white hover:text-[var(--purple-accent)] transition-colors"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-lg min-w-[240px] py-2">
                          {(item.children ?? []).map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block px-4 py-2.5 text-sm text-[var(--text-body)] hover:bg-[var(--bg-alt)] hover:text-[var(--navy-primary)] transition-colors",
                                pathname === child.href && "text-[var(--navy-primary)] font-medium bg-[var(--bg-alt)]"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "py-2 text-white hover:text-[var(--purple-accent)] transition-colors relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:bg-[var(--purple-accent)] after:transition-transform after:duration-300 after:rounded-full",
                    pathname === item.href && "text-[var(--purple-accent)] after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link href="/contact">
              <Button size="sm">Get in touch</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              className="p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-[var(--navy-light)] bg-[var(--navy-primary)]"
            >
              <div className="py-4 space-y-1 px-4">
                <Link href="/" className="block py-2 text-white hover:text-[var(--purple-accent)]" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="block py-2 text-white hover:text-[var(--purple-accent)]" onClick={() => setMobileOpen(false)}>
                  About Us
                </Link>
                <div>
                  <button
                    className="flex items-center justify-between w-full py-2 text-white hover:text-[var(--purple-accent)]"
                    onClick={() => setServicesMobileOpen(!servicesMobileOpen)}
                  >
                    Services
                    <ChevronDown className={cn("w-4 h-4 transition-transform", servicesMobileOpen && "rotate-180")} />
                  </button>
                  {servicesMobileOpen && (
                    <div className="pl-4 space-y-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block py-2 text-sm text-[var(--text-muted)] hover:text-[var(--purple-accent)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/contact" className="block py-2 text-white hover:text-[var(--purple-accent)]" onClick={() => setMobileOpen(false)}>
                  Contact Us
                </Link>
                <Link href="/contact" className="block pt-2" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="md">Get in touch</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
