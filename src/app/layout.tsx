import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/site/SiteHeader";
import PageTransition from "@/components/site/PageTransition";
import ViewTransitionWrapper from "@/components/site/ViewTransitionWrapper";
import ChatWidget from "@/components/chat/ChatWidget";
import StarBackground from "@/components/star/StarBackground";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const hanken = localFont({
  src: "./fonts/HankenGrotesk.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ridhwan | Portfolio",
    template: "%s | Ridhwan",
  },
  description:
    "Data engineer building AWS and GCP data platforms for analytics and AI. MSc Data Science at Universiti Malaya, based in Kuala Lumpur.",
  keywords: [
    "data engineer",
    "analytics engineer",
    "AWS",
    "GCP",
    "PySpark",
    "data platform",
    "Kuala Lumpur",
    "Malaysia",
  ],
  openGraph: {
    title: "Ridhwan | Portfolio",
    description:
      "Data engineer building AWS and GCP data platforms for analytics and AI.",
    type: "website",
    url: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ridhwan Bin Razali",
  jobTitle: "Data Engineer",
  url: SITE_URL,
  email: "mailto:ridhwanrazaliwork@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kuala Lumpur",
    addressCountry: "MY",
  },
  sameAs: [
    "https://linkedin.com/in/ridhwan-bin-razali",
    "https://github.com/ridhwanrazaliwork",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universiti Malaya",
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
      className={`${poppins.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem("theme");
                if (theme) document.documentElement.setAttribute("data-theme", theme);
              } catch(e) {}
            })();
          `
        }} />
      </head>
      <body className="min-h-screen flex flex-col relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <div id="initial-loader">
          <span style={{ fontFamily: "var(--font-poppins)", fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)" }}>
            Ridhwan
          </span>
          <div className="loader-dot" />
        </div>
        <SiteHeader />
        <ViewTransitionWrapper>
          <PageTransition>{children}</PageTransition>
        </ViewTransitionWrapper>
        <StarBackground />
        <ChatWidget />
      </body>
    </html>
  );
}
