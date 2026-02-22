import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | SPT Solutions",
  description: "Learn about SPT Solutions and our mission to empower businesses with AI.",
};

export default function AboutPage() {
  return <AboutContent />;
}
