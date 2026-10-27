import type { Metadata } from "next";
import { Geist } from "next/font/google";
import CursorLabel from "@/components/CursorLabel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "CMK Holding",
    template: "%s | CMK Holding",
  },
  description:
    "CMK Holding, inşaat, restorasyon, enerji ve otomotiv alanlarında insan odaklı ve kalıcı değerler üretir.",
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
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
