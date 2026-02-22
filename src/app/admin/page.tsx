import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | SPT Solutions",
  description: "Admin dashboard",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
