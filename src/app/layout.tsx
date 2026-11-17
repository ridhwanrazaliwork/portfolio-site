import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/site/SiteHeader";
import PageTransition from "@/components/site/PageTransition";
import ViewTransitionWrapper from "@/components/site/ViewTransitionWrapper";
import ChatWidget from "@/components/chat/ChatWidget";
import StarBackground from "@/components/star/StarBackground";
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
  title: {
    default: "Ridhwan | Portfolio",
    template: "%s | Ridhwan",
  },
  description:
    "Ridhwan — developer exploring data :).",
  openGraph: {
    title: "Ridhwan | Portfolio",
    description:
      "Ridhwan — developer exploring data :).",
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
