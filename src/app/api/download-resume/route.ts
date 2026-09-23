import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await fs.readFile(filePath);

    const isInline = request.nextUrl.searchParams.get("view") === "1";
    const dispositionType = isInline ? "inline" : "attachment";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${dispositionType}; filename="Guhan_Murugaiyan_Resume.pdf"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Failed to serve resume:", error);
    return new NextResponse(
      JSON.stringify({ error: "Resume file not found or could not be loaded." }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
