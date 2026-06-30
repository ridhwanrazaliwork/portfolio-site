import type { Metadata } from "next";
import { Poppins, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import PageTransition from "@/components/site/PageTransition";
import ViewTransitionWrapper from "@/components/site/ViewTransitionWrapper";
import ChatWidget from "@/components/chat/ChatWidget";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <ViewTransitionWrapper>
          <PageTransition>{children}</PageTransition>
        </ViewTransitionWrapper>
        <ChatWidget />
      </body>
    </html>
  );
}
