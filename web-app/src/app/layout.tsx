import type { Metadata, Viewport } from "next";
import { Inter, Roboto, Montserrat } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nobleinvoice.noblesworld.com.ng'),
  title: {
    default: "Invoice Software Small Business | NobleInvoice",
    template: "%s | NobleInvoice"
  },
  description: "The best invoice software small business owners use to create professional invoices, accept global payments, and manage cash flow effortlessly for free.",
  manifest: '/manifest.webmanifest',
  keywords: ["invoice software small business", "free invoice generator", "invoice maker app free", "AI invoice generator", "simple invoice generator", "invoice template", "online invoicing software", "billing software online", "business card creator", "QR code generator"],
  authors: [{ name: "NobleInvoice Team" }],
  creator: "NobleInvoice",
  publisher: "NobleInvoice",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://nobleinvoice.noblesworld.com.ng',
    siteName: "NobleInvoice",
    title: "Invoice Software Small Business | NobleInvoice",
    description: "The best invoice software small business owners use to create professional invoices, accept global payments, and manage cash flow effortlessly for free.",
    images: [{
      url: "/images/hero-dashboard-actual.png",
      width: 1200,
      height: 630,
      alt: "invoice software small business"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Software Small Business | NobleInvoice",
    description: "The best invoice software small business owners use to create professional invoices, accept global payments, and manage cash flow effortlessly.",
    images: ["/images/hero-dashboard-actual.png"],
    creator: "@NobleInvoice"
  },
  verification: {
    google: "KN-eXDFHjCqe3JiKGsnb0_-JCOXFAYPRs5eG-5zKQ9g",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6ME42JV7BJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6ME42JV7BJ');
          `}
        </Script>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
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
                  <PWAClient />
                  <OfflineIndicator />
                  <SchemaOrg />
                  <CommandPalette />
                  <CookieConsent />
                  {children}
                  <Toaster position="bottom-right" reverseOrder={false} />
                  
                </GamificationProvider>
              </CurrencyProvider>
            </EntitlementsProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

