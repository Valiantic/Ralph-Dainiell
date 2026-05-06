import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}

        <div id="modal-root"></div>

        <footer className="w-full flex items-center justify-center py-6 px-4 text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Ralph Dainiell. All rights reserved.
        </footer>
      </body>
    </html>
  );
}