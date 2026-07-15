import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";

/**
 * A Didone — the native language of perfume and fashion (Vogue, Dior, Tom
 * Ford). The extreme thick/thin stroke contrast only sings at scale, which is
 * exactly the discipline this house needs: huge, or not at all.
 */
const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOIR — A House of Invisible Luxury",
  description:
    "Perfume cannot be seen, touched, or photographed. NOIR does not show fragrance. It visualizes memory.",
  openGraph: {
    title: "NOIR — A House of Invisible Luxury",
    description: "What if scent had a physical form?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
