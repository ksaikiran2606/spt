"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Download, Mail } from "lucide-react";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  message: string | null;
  service: string | null;
  source: string | null;
  createdAt: string;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    if (token) {
      setAuth(true);
      fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((d) => setLeads(Array.isArray(d) ? d : []))
        .catch(() => setLeads([]))
        .finally(() => setLoading(false));
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [auth]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem("adminToken", data.token);
      setAuth(true);
      setLoading(true);
      fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${data.token}` },
      })
        .then((r) => r.json())
        .then((d) => setLeads(Array.isArray(d) ? d : []))
        .finally(() => setLoading(false));
    }
  }

  function exportCsv() {
    const headers = ["Email", "Name", "Company", "Service", "Source", "Created"];
    const rows = leads.map((l) => [
      l.email,
      l.name ?? "",
      l.company ?? "",
      l.service ?? "",
      l.source ?? "",
      new Date(l.createdAt).toISOString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (auth === null || auth === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <h1 className="text-xl font-semibold text-[var(--foreground)] mb-4">Admin login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--primary)] text-[var(--background)] py-2.5 font-medium hover:bg-[var(--primary-hover)]"
          >
            Sign in
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Leads</h1>
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                <tr>
                  <th className="p-4 font-medium text-[var(--foreground)]">Email</th>
                  <th className="p-4 font-medium text-[var(--foreground)]">Name</th>
                  <th className="p-4 font-medium text-[var(--foreground)]">Source</th>
                  <th className="p-4 font-medium text-[var(--foreground)]">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--border)] hover:bg-[var(--card)]/50">
                    <td className="p-4">
                      <a href={`mailto:${l.email}`} className="text-[var(--primary)] flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {l.email}
                      </a>
                    </td>
                    <td className="p-4 text-[var(--muted)]">{l.name ?? "—"}</td>
                    <td className="p-4 text-[var(--muted)]">{l.source ?? "—"}</td>
                    <td className="p-4 text-[var(--muted)]">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 && (
              <p className="p-8 text-center text-[var(--muted)]">No leads yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
