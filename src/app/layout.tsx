import type { Metadata, Viewport } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Anton,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import ChapterTracker from "@/components/layout/ChapterTracker";
import SpeedLinesOverlay from "@/components/layout/SpeedLinesOverlay";
import AchievementToast from "@/components/ui/AchievementToast";
import BattleModeManager from "@/components/layout/BattleModeManager";

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

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://guhanmurugaiyan.vercel.app");

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Guhan Murugaiyan — AI Developer & Java Backend Engineer",
    template: "%s | Guhan Murugaiyan",
  },
  description:
    "AI Developer & Java Backend Engineer building full-stack applications, agentic AI systems, and high-performance web platforms.",
  keywords: [
    "Guhan Murugaiyan",
    "AI Developer",
    "Java Backend Developer",
    "Spring Boot",
    "Full Stack Developer",
    "Next.js",
    "LLM",
    "Agentic AI",
    "Multi-Agent Systems",
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
    title: "Guhan Murugaiyan — AI Developer & Java Backend Engineer",
    description:
      "AI Developer & Java Backend Engineer building full-stack applications, agentic AI systems, and high-performance web platforms.",
    url: siteUrl,
    siteName: "Guhan Murugaiyan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guhan Murugaiyan — AI Developer & Java Backend Engineer",
    description:
      "AI Developer & Java Backend Engineer — agentic systems, Spring Boot APIs, and full-stack web apps.",
    creator: "@ErrGuhan",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Guhan Murugaiyan",
  alternateName: "ErrGuhan",
  jobTitle: "AI Developer & Java Backend Engineer",
  url: siteUrl,
  image: `${siteUrl}/images/profile.jpg`,
  description:
    "AI Developer & Java Backend Engineer building full-stack applications, agentic AI systems, and high-performance web platforms.",
  sameAs: [
    "https://github.com/ErrGuhan",
    "https://www.linkedin.com/in/guhanmurugaiyan",
  ],
  knowsAbout: [
    "AI Development",
    "Java 21",
    "Spring Boot",
    "Full Stack Development",
    "Next.js",
    "React 19",
    "TypeScript",
    "Agentic AI",
    "Multi-Agent Systems",
    "LLM Orchestration",
    "Data Analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${syne.variable} ${jakarta.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#FFE600] selection:text-black">
        {/* Visually-hidden Skip to content link for keyboard accessibility */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2.5 focus:bg-[#FFE600] focus:text-black focus:border-[3px] focus:border-black focus:shadow-[4px_4px_0px_#000000] focus:font-mono focus:font-black focus:text-xs focus:tracking-wider focus:uppercase focus:rounded-xl focus:outline-none"
        >
          Skip to content //
        </a>

        {/* Film grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Custom magnetic cursor */}
        <CustomCursor />

        {/* Speed lines motion overlay on fast scroll */}
        <SpeedLinesOverlay />

        {/* Vertical comic chapter HUD rail (01-06) */}
        <ChapterTracker />

        {/* Gamified Achievement Toast Banner */}
        <AchievementToast />

        {/* Konami Code & Battle Mode Manager */}
        <BattleModeManager />

        {/* Smooth scroll wrapper */}
        <SmoothScroll>{children}</SmoothScroll>

        {/* Vercel Web Analytics & Real-Time Core Web Vitals */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

