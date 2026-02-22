import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | SPT Solutions",
  description: "Get in touch with SPT Solutions for AI consulting and services.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Contact Us</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tell us about your project. We'll get back to you within 24 hours.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
