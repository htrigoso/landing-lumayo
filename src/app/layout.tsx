import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// Brand manual: Montserrat only (variable font covers the 400 / 500 / 800 weights it specifies).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumayo · Ortodoncia y centro odontológico en Tarapoto",
  description:
    "Brackets, blanqueamiento dental, implantes, endodoncia, prótesis y odontopediatría en Tarapoto. Agenda tu cita por WhatsApp al 946 788 123.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    title: "Lumayo · Centro Odontológico en Tarapoto",
    description:
      "Tecnología, confianza y atención cercana para tu sonrisa. Agenda tu cita por WhatsApp.",
    images: [{ url: "/images/hero.webp", width: 980, height: 580 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#024474",
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
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
