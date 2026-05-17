import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import "@fontsource/open-runde/400.css";
import "@fontsource/open-runde/500.css";
import "@fontsource/open-runde/700.css";

export const metadata: Metadata = {
  title: "Ralph Gonzaga - iOS Developer",
  description: "Ralph Dainiell's Portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Images/FaviconPFP.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Open Runde', sans-serif" }} className="antialiased">
        {children}
        <div id="modal-root"></div>
        <footer
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem 1rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          © {new Date().getFullYear()} Ralph Dainiell. All rights reserved.
        </footer>
        <Analytics />
      </body>
    </html>
  );
}