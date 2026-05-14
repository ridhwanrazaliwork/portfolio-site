import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore projects by Ridhwan — immersive 3D web experiences.",
  openGraph: {
    title: "Projects | Ridhwan",
    description: "Explore projects by Ridhwan.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-12 max-w-lg text-center">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Projects
        </h1>
        <p className="text-foreground/70">Coming soon.</p>
      </div>
    </div>
  );
}
