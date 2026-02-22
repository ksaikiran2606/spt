"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/services";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  service: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export function BookingForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    const date = new Date(`${data.date}T${data.time}`);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          date: date.toISOString(),
          service: data.service,
          notes: data.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to book");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <div className="mt-8 rounded-xl border border-[var(--primary)] bg-[var(--primary-muted)] p-8 text-center">
        <p className="text-[var(--foreground)] font-medium">Demo requested successfully.</p>
        <p className="text-sm text-[var(--muted)] mt-1">We'll send a confirmation email shortly.</p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Name *</label>
        <input
          {...register("name")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        {errors.name && <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Email *</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        {errors.email && <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Company</label>
        <input
          {...register("company")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Date *</label>
          <input
            type="date"
            min={today}
            {...register("date")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          {errors.date && <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Time *</label>
          <select
            {...register("time")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">Select...</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="mt-1 text-sm text-[var(--maroon-accent)]">{errors.time.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Service of interest</label>
        <select
          {...register("service")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Notes</label>
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
        />
      </div>
      {error && <p className="text-sm text-[var(--maroon-accent)]">{error}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Request demo
      </Button>
    </form>
  );
}
