import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vorel Labs — Building Tomorrow",
  description:
    "Vorel Labs is an engineering laboratory building intelligent software, AI systems, and research-driven products. Software. AI. Research.",
  keywords: [
    "AI",
    "software engineering",
    "LLM applications",
    "multi-agent systems",
    "computer vision",
    "MLOps",
    "product engineering",
    "Vorel Labs",
  ],
  openGraph: {
    title: "Vorel Labs — Building Tomorrow",
    description:
      "An engineering laboratory building intelligent software, AI systems, and research-driven products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
