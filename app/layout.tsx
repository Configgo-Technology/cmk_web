import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AboutBand from "@/components/AboutBand";
import CursorLabel from "@/components/CursorLabel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-geist",
});

const siteUrl = "https://www.cmk.com.tr";
const siteName = "CMK Holding";
const description = "Sadece yapı değil, değer inşa ediyoruz.";
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 633,
  alt: "CMK Holding — Sadece yapı değil, değer inşa ediyoruz.",
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | CMK Holding",
  },
  description,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName,
    title: {
      default: siteName,
      template: "%s | CMK Holding",
    },
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: siteName,
      template: "%s | CMK Holding",
    },
    description,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${geist.variable} antialiased`}>
        <Preloader />
        <CursorLabel />
        <PageTransition>
          <Header />
          {children}
          <AboutBand />
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
