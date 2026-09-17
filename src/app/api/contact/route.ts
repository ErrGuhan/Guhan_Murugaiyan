import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

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
    // 1. Parse and validate payload
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

    // 2. Honeypot check: If botCheck has any value, silently accept without processing (spam defense)
    if (botCheck && botCheck.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Transmission received.",
      });
    }

    // 3. Sanitize fields
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // 4. Dispatch email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Contact Dispatch] RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        {
          success: false,
          error: "Transmission service is temporarily unconfigured. Please contact mguhan6383@gmail.com directly.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mguhan6383@gmail.com",
      replyTo: sanitizedEmail,
      subject: `[Portfolio Transmission] Message from ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 3px solid #000; background: #FFFDF7;">
          <h2 style="margin-top: 0; background: #FFE600; padding: 8px 12px; border: 2px solid #000; display: inline-block;">NEW PORTFOLIO TRANSMISSION</h2>
          <p><strong>From:</strong> ${sanitizedName} (&lt;<a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>&gt;)</p>
          <hr style="border: none; border-top: 2px solid #000; margin: 16px 0;" />
          <h3 style="margin-bottom: 8px;">Message:</h3>
          <div style="background: #F6F2E9; padding: 14px; border: 2px solid #000; border-radius: 4px; white-space: pre-wrap; font-size: 14px;">${sanitizedMessage}</div>
          <p style="font-size: 12px; color: #666; margin-top: 20px; font-family: monospace;">// Dispatched via Guhan Portfolio Contact Route</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact Dispatch] Resend API error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to dispatch email. Please reach out to mguhan6383@gmail.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transmission dispatched successfully! Guhan will review your message shortly.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Contact Dispatch] Internal error:", error);
    return NextResponse.json(
      { success: false, error: "Internal dispatch error. Please use direct email dispatch." },
      { status: 500 }
    );
  }
}
