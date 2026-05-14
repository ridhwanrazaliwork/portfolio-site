import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Ridhwan — developer, designer, and creator.",
  openGraph: {
    title: "About | Ridhwan",
    description: "Learn more about Ridhwan.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-12 max-w-lg text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          About
        </h1>
        <p className="text-foreground/70">Coming soon.</p>
      </div>
    </div>
  );
}
