import type { Metadata } from "next";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a demo | SPT Solutions",
  description: "Schedule a demo with our team to see how AI can transform your business.",
};

export default function BookDemoPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Book a demo</h1>
        <p className="mt-4 text-[var(--muted)]">
          Pick a time that works for you. We'll send a confirmation and calendar invite.
        </p>
        <BookingForm />
      </div>
    </div>
  );
}
