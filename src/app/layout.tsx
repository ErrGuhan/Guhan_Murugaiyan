import type { Metadata } from "next";
import {
  Syne,
  Cinzel,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Italianno,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";

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

const italianno = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guhan Murugaiyan — AI Developer & Agent Architect",
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
    "Portfolio",
  ],
  authors: [{ name: "Guhan Murugaiyan" }],
  openGraph: {
    title: "Guhan Murugaiyan — Creative Developer",
    description: "Creative developer portfolio where design meets code and motion.",
    type: "website",
    locale: "en_US",
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
      className={`${syne.variable} ${cinzel.variable} ${jakarta.variable} ${mono.variable} ${italianno.variable}`}
    >
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black">
        {/* Film grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Custom magnetic cursor */}
        <CustomCursor />

        {/* Smooth scroll wrapper */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
