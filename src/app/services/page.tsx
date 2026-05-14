import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by Ridhwan — web development, 3D experiences, and design.",
  openGraph: {
    title: "Services | Ridhwan",
    description: "Services offered by Ridhwan.",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-12 max-w-lg text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Services
        </h1>
        <p className="text-foreground/70">Coming soon.</p>
      </div>
    </div>
  );
}
