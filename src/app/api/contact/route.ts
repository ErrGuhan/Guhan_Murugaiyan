import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Sliding-window rate limiter per client IP: max 5 requests per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestMap.get(ip) || [];

  // Prune timestamps outside current sliding window
  const activeTimestamps = timestamps.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestMap.set(ip, activeTimestamps);
    return false; // Rate limit exceeded
  }

  activeTimestamps.push(now);
  ipRequestMap.set(ip, activeTimestamps);
  return true;
}

const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must have at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(150, "Email must be under 150 characters")
    .toLowerCase(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be under 3000 characters"),
  botCheck: z.string().optional(), // Honeypot field for spam bots
});

function sanitizeInput(text: string): string {
  return text
    .replace(/[<>]/g, "") // Strip HTML bracket tags
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, ""); // Strip control characters
}

export async function POST(req: NextRequest) {
  try {
    // 1. Resolve client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a few minutes before transmitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const validationResult = contactRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg =
        validationResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 422 }
      );
    }

    const { name, email, message, botCheck } = validationResult.data;

    // 3. Honeypot check: If botCheck has any value, silently accept without processing
    if (botCheck && botCheck.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Transmission received.",
      });
    }

    // 4. Sanitize sanitized fields
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Secure operational log (does NOT log full sensitive content)
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[Contact Dispatch] From: ${sanitizedName} <${sanitizedEmail}> (${sanitizedMessage.length} chars)`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transmission dispatched successfully! Guhan will review your message shortly.",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal dispatch error. Please use direct email dispatch." },
      { status: 500 }
    );
  }
}
