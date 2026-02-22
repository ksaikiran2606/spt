"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-xl border border-[var(--primary)] bg-[var(--primary-muted)] p-8 text-center"
      >
        <p className="text-[var(--foreground)] font-medium">Message sent successfully.</p>
        <p className="text-sm text-[var(--muted)] mt-1">We'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Name *
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--white-primary)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--white-primary)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Company
        </label>
        <input
          id="company"
          {...register("company")}
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--white-primary)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Service of interest
        </label>
        <select
          id="service"
          {...register("service")}
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--white-primary)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select...</option>
          <option value="ai-chatbots">AI Chatbots</option>
          <option value="ai-automation">AI Automation</option>
          <option value="ai-web-app-development">AI Web & App Development</option>
          <option value="ai-image-generation">AI Image Generation</option>
          <option value="ai-video-generation">AI Video Generation</option>
          <option value="ai-voice-speech">AI Voice & Speech</option>
          <option value="ai-data-analytics">AI Data Analytics</option>
          <option value="ai-marketing">AI Marketing</option>
          <option value="ai-customer-support">AI Customer Support</option>
          <option value="custom-ai-solutions">Custom AI Solutions</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--white-primary)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.message.message}</p>
        )}
      </div>
      {error && (
        <p className="text-sm text-[var(--maroon-accent)]">{error}</p>
      )}
      <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Send message
      </Button>
    </form>
  );
}
