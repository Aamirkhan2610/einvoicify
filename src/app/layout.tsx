import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — LHDN MyInvois e-Invoicing Malaysia`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "e-invoice Malaysia",
    "LHDN MyInvois",
    "Einvoicify",
    "IOS Malaysia",
    "Integrated Operation Solutions",
    "QAD ERP Malaysia",
    "ePINTAR",
    "e-invoicing ERP integration",
    "Oasis Damansara",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — E-Invoicing Made Simple | Malaysia`,
    description: siteConfig.description,
    images: [{ url: "/logo.png", width: 1254, height: 1254, alt: "Einvoicify" }],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — Malaysia e-Invoice`,
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "1254x1254", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-MY"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
