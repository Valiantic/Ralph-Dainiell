import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ralph Gonzaga - iOS Developer",
  description: "Ralph Dainiell's Portfolio",
  icons: {
    icon: "/Images/FaviconPFP.jpg",
    shortcut: "/Images/FaviconPFP.jpg",
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
      <body className={`${roboto.variable} antialiased`}>
        {children}

        {/* 🔥 THIS IS THE FIX */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}