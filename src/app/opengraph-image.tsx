import { ImageResponse } from "next/og";

export const alt = "Guhan Murugaiyan — AI Developer & Creative Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(212, 175, 55, 0.15) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(255, 223, 115, 0.08) 0%, transparent 40%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              color: "#FFDF73",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#D4AF37",
              }}
            />
            PORTFOLIO · 2026 EDITION
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            VERCEL DEPLOYED
          </div>
        </div>

        {/* Center Editorial Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            GUHAN MURUGAIYAN
          </div>

          <div
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#D4AF37",
              textTransform: "uppercase",
            }}
          >
            AI Developer &amp; Creative Architect
          </div>

          <div
            style={{
              fontSize: "19px",
              color: "rgba(255, 255, 255, 0.6)",
              maxWidth: "850px",
              lineHeight: 1.5,
              marginTop: "6px",
            }}
          >
            Crafting digital worlds where architectural aesthetics meet cinematic motion and autonomous intelligence.
          </div>
        </div>

        {/* Bottom Bar: Tech Toolkit Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js", "React 19", "GSAP & Motion", "Tailwind CSS", "Autonomous AI"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          <div
            style={{
              color: "#FFDF73",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            guhan.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
