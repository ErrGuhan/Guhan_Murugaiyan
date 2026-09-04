import type { Metadata, Viewport } from "next";
import {
  Syne,
  Cinzel,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Dancing_Script,
  Anton,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://guhan.dev");

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Guhan Murugaiyan — AI Developer & Creative Architect",
    template: "%s | Guhan Murugaiyan",
  },
  description:
    "Creative developer & agent architect portfolio specializing in high-performance web applications, motion design, and intelligent autonomous systems.",
  keywords: [
    "Guhan Murugaiyan",
    "Creative Developer",
    "Frontend Engineer",
    "GSAP",
    "Next.js",
    "React 19",
    "AI Architect",
    "Autonomous Agents",
    "Portfolio",
  ],
  authors: [{ name: "Guhan Murugaiyan", url: siteUrl }],
  creator: "Guhan Murugaiyan",
  publisher: "Guhan Murugaiyan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Guhan Murugaiyan — AI Developer & Creative Architect",
    description:
      "Creative developer portfolio where design meets code, cinematic motion, and autonomous AI systems.",
    url: siteUrl,
    siteName: "Guhan Murugaiyan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guhan Murugaiyan — AI Developer & Creative Architect",
    description:
      "Creative developer portfolio where design meets code, cinematic motion, and autonomous AI systems.",
    creator: "@ErrGuhan",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${syne.variable} ${cinzel.variable} ${jakarta.variable} ${mono.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased selection:bg-[#C9AF7C] selection:text-black">
        {/* Film grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Custom magnetic cursor */}
        <CustomCursor />

        {/* Smooth scroll wrapper */}
        <SmoothScroll>{children}</SmoothScroll>

        {/* Vercel Web Analytics & Real-Time Core Web Vitals */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

