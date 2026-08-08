import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "second opinion HVAC",
    "Ontario HVAC",
    "furnace replacement advice",
    "HVAC second opinion",
    "heat pump advice Ontario",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.businessName, url: siteConfig.siteUrl }],
  creator: siteConfig.businessName,
  publisher: siteConfig.businessName,
  category: "Home Services",
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    title: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-light)] text-[var(--color-ink)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-navy)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
