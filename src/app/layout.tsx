import type { Metadata } from "next";
import { Syne, Poppins, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import PageTransition from "@/components/site/PageTransition";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Ridhwan | Dimensional Design for the Digital Age",
    template: "%s | Ridhwan",
  },
  description:
    "Ridhwan — developer exploring 3D web, design, and creative code.",
  openGraph: {
    title: "Ridhwan | Portfolio",
    description:
      "Ridhwan — developer exploring 3D web, design, and creative code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${poppins.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
