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
const description =
  "CMK Holding, inşaat, restorasyon, enerji ve otomotiv alanlarında insan odaklı ve kalıcı değerler üretir.";
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 600,
  alt: "CMK Holding — Geleceği Birlikte İnşa Ediyoruz.",
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
