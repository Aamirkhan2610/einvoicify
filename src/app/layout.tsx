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
    "IRBM e-Invoice",
    "e-invoicing ERP integration",
    "Malaysia electronic invoice",
    "Einvoicify",
    "consolidated e-invoice",
    "self-billed e-invoice",
  ],
  authors: [{ name: siteConfig.name }],
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
  icons: { icon: "/logo.png", apple: "/logo.png" },
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
