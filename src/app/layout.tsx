import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GoogleTagManagerNoscript, GoogleTagManagerScripts } from "@/components/analytics/GoogleTagManager";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { clinicJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Brand manual: Montserrat only (variable font covers the 400 / 500 / 800 weights it specifies).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Same staging switch as src/app/robots.ts: NEXT_PUBLIC_ALLOW_INDEXING=false blocks indexing on every page.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export const metadata: Metadata = {
  // Resolves relative canonical and og URLs on every page.
  metadataBase: new URL(siteUrl),
  // Google Search Console meta tag; omitted when the variable is not set.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  title: "Lumayo · Ortodoncia y centro odontológico en Tarapoto",
  description:
    "Brackets, blanqueamiento dental, implantes, endodoncia, prótesis y odontopediatría en Tarapoto. Agenda tu cita por WhatsApp al 986 382 607.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Lumayo Centro Odontológico",
    title: "Lumayo · Centro Odontológico en Tarapoto",
    description:
      "Tecnología, confianza y atención cercana para tu sonrisa. Agenda tu cita por WhatsApp.",
    images: [{ url: "/images/hero.webp", width: 980, height: 580 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumayo · Centro Odontológico en Tarapoto",
    description:
      "Tecnología, confianza y atención cercana para tu sonrisa. Agenda tu cita por WhatsApp.",
    images: ["/images/hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2364c2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: globals.css sets `scroll-behavior: smooth` for in-page anchors; this tells
    // Next.js 16 to turn it off during route changes, otherwise its scroll reset animates and the
    // overlapping smooth scrolls drag the new page down to the footer.
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} antialiased`}
    >
      <head>
        <GoogleTagManagerScripts />
      </head>
      <body className="min-h-dvh">
        <GoogleTagManagerNoscript />
        {/* Site-wide entities: the clinic (declared once, referenced by @id) and the website. */}
        <JsonLd data={clinicJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AppRouterCacheProvider>
          <MotionProvider>{children}</MotionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
