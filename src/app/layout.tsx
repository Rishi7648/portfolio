import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://hemshrestha.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hem Shrestha - Founder of WildStone Solution",
    template: "%s | Hem Shrestha",
  },
  description:
    "Hem Shrestha is the Founder of WildStone Solution and an experienced WordPress Developer building modern, scalable, and high-performing websites that help businesses grow.",
  keywords: [
    "Hem Shrestha",
    "WildStone Solution",
    "WordPress Developer",
    "Web Developer Nepal",
    "WooCommerce",
    "Elementor",
    "Next.js Developer",
    "Freelance Developer",
    "SEO Optimization",
    "Web Performance",
  ],
  authors: [{ name: "Hem Shrestha", url: siteUrl }],
  creator: "Hem Shrestha",
  publisher: "WildStone Solution",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Hem Shrestha — Founder of WildStone Solution | WordPress Developer",
    description:
      "Building modern, scalable, and high-performing websites that help businesses grow.",
    url: siteUrl,
    siteName: "Hem Shrestha — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hem Shrestha — WordPress Developer & Founder of WildStone Solution",
    description:
      "Building modern, scalable, and high-performing websites that help businesses grow.",
    creator: "@hemshrestha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hem Shrestha",
  jobTitle: "Founder & WordPress Developer",
  worksFor: {
    "@type": "Organization",
    name: "WildStone Solution",
  },
  url: siteUrl,
  knowsAbout: [
    "WordPress Development",
    "WooCommerce",
    "Elementor",
    "PHP",
    "React",
    "Next.js",
    "SEO Optimization",
    "Web Performance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" richColors />
      </body>
    </html>
  );
}