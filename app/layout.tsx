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
  metadataBase: new URL("https://www.vorellabs.in"),
  title: "Vorel Labs — Websites, Full-Stack Apps & AI Automation",
  description:
    "Vorel Labs is a software engineering studio in Chennai. We build business websites, full-stack applications and AI-powered products, from prototype to production.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vorel Labs — Websites, Full-Stack Apps & AI Automation",
    description:
      "We turn ambitious ideas into working software: websites, full-stack applications and AI automation.",
    url: "/",
    siteName: "Vorel Labs",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f6",
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
