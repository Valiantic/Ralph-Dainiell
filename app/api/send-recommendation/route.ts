import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { message, images } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = images?.map((img: { base64: string; name: string }, i: number) => ({
    filename: img.name || `image-${i}.jpg`,
    content: img.base64.split("base64,")[1],
    encoding: "base64",
  }));

  try {
    await transporter.sendMail({
      from: `"Portfolio Recommendation" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Recommendation Received",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Recommendation</h2>
          <p style="font-size: 15px; color: #333;">${message}</p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}