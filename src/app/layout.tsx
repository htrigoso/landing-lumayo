import type { Metadata, Viewport } from "next";
import { Caveat, Figtree, Montserrat } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
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
  themeColor: "#0b3a66",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${figtree.variable} ${montserrat.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
