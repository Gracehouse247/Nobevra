import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { EntitlementsProvider } from "@/context/EntitlementsContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import PWAClient from "@/components/providers/PWAClient";
import SchemaOrg from "@/components/seo/SchemaOrg";
import CommandPalette from "@/components/shared/CommandPalette";
import OfflineIndicator from "@/components/shared/OfflineIndicator";
import CookieConsent from "@/components/shared/CookieConsent";
import { ThemeProvider } from "@/components/providers/theme-provider";

// Removed next/font/google to bypass Turbopack network crash
const inter = { variable: "font-sans" };
const roboto = { variable: "font-sans" };
const montserrat = { variable: "font-sans" };

import { brand } from "@/lib/brand";
import UTMClientLoader from "@/components/providers/UTMClientLoader";

export const metadata: Metadata = {
  metadataBase: new URL(brand.urls.canonical),
  title: {
    default: brand.seo.defaultTitle,
    template: brand.seo.titleTemplate,
  },
  description: brand.seo.defaultDescription,
  manifest: '/manifest.webmanifest',
  keywords: [...brand.seo.keywords],
  authors: [{ name: `${brand.name} Team` }],
  creator: brand.parentCompany,
  publisher: brand.name,
  openGraph: {
    type: brand.openGraph.type,
    locale: brand.openGraph.locale,
    url: brand.urls.canonical,
    siteName: brand.openGraph.siteName,
    title: brand.openGraph.title,
    description: brand.openGraph.description,
    images: [brand.openGraph.image],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.defaultTitle,
    description: brand.seo.defaultDescription,
    images: [brand.assets.ogImage],
    creator: brand.social.twitterHandle,
  },
  verification: {
    google: "KN-eXDFHjCqe3JiKGsnb0_-JCOXFAYPRs5eG-5zKQ9g",
  },
  icons: {
    icon: [
      { url: '/images/brand identies/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/brand identies/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/images/brand identies/icon.png',
    apple: '/images/brand identies/icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#01A0E2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/images/brand identies/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/brand identies/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/brand identies/icon.png" />
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols & Inter with display=swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${montserrat.variable} antialiased bg-background text-foreground selection:bg-primary/30 font-inter`}
        suppressHydrationWarning
      >
        <main className="relative z-10 min-h-screen">
          <AuthProvider>
            <EntitlementsProvider>
              <CurrencyProvider>
                <GamificationProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <PWAClient />
                    <UTMClientLoader />
                    <OfflineIndicator />
                    <SchemaOrg />
                    <CommandPalette />
                    <CookieConsent />
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} />
                  </ThemeProvider>
                </GamificationProvider>
              </CurrencyProvider>
            </EntitlementsProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

