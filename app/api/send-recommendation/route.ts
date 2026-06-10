import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { message, images } = await request.json();

    if (!message?.trim() && (!images || images.length === 0)) {
      return NextResponse.json({ error: "Empty submission" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const attachments = (images ?? [])
      .map((img: { base64: string; name: string }, i: number) => {
        const match = img.base64.match(/^data:(.+);base64,(.+)$/);
        if (!match) return null;
        return {
          filename: img.name || `image-${i + 1}.jpg`,
          content: match[2],
          encoding: "base64" as const,
          contentType: match[1],
        };
      })
      .filter(Boolean);

    await transporter.sendMail({
      from: `"Portfolio Recommendation" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "📬 New Recommendation — Portfolio",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#111;margin-bottom:8px;">📬 New Portfolio Recommendation</h2>
          <p style="color:#888;font-size:13px;margin-bottom:16px;">
            Sent via ralph-dainiell.vercel.app
          </p>
          <div style="background:#f5f5f5;padding:16px;border-radius:12px;margin-bottom:16px;">
            <p style="color:#333;white-space:pre-wrap;margin:0;font-size:15px;line-height:1.6;">
              ${message?.trim() || "(No message — image only)"}
            </p>
          </div>
          ${
            attachments.length > 0
              ? `<p style="color:#888;font-size:13px;">📎 ${attachments.length} image(s) attached below.</p>`
              : ""
          }
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}