import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPT Solutions | Premium AI Services",
  description:
    "Empowering businesses with intelligent AI solutions. Custom AI chatbots, automation, and AI development.",
  openGraph: {
    title: "SPT Solutions | Premium AI Services",
    description:
      "Empowering businesses with intelligent AI solutions. Custom AI chatbots, automation, and AI development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPT Solutions | Premium AI Services",
    description: "Empowering businesses with intelligent AI solutions.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sptsolutions.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sptsolutions.com";

  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${poppins.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <JsonLd siteUrl={siteUrl} />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
