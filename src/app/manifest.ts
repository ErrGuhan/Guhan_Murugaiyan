import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guhan Murugaiyan — AI Developer & Creative Architect",
    short_name: "Guhan M.",
    description:
      "Creative developer portfolio specializing in high-performance web applications, motion design, and intelligent autonomous systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
