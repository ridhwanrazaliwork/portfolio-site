import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ridhwan.",
  openGraph: {
    title: "Contact | Ridhwan",
    description: "Get in touch with Ridhwan.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="glass-panel p-10 md:p-12 max-w-lg w-full text-center">
        <h1
          className="text-4xl font-bold mb-2 text-foreground"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
        >
          Get in Touch
        </h1>
        <p className="text-[#a3a3a3] mb-10 text-sm">
          Feel free to reach out for collaboration, opportunities, or just to say hi.
        </p>

        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent text-sm font-bold" style={{ fontFamily: "var(--font-jetbrains)" }}>@</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>email</p>
              <a href="mailto:ridhwanrazaliwork@gmail.com" className="text-foreground text-sm hover:text-accent transition-colors">
                ridhwanrazaliwork@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent text-sm font-bold" style={{ fontFamily: "var(--font-jetbrains)" }}>#</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>phone</p>
              <p className="text-foreground text-sm">+60 16 415 2510</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent text-sm font-bold" style={{ fontFamily: "var(--font-jetbrains)" }}>in</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>linkedin</p>
              <a href="https://linkedin.com/in/ridhwan-bin-razali" target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-accent transition-colors">
                /in/ridhwan-bin-razali
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent text-sm font-bold" style={{ fontFamily: "var(--font-jetbrains)" }}>gh</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#737373]" style={{ fontFamily: "var(--font-jetbrains)" }}>github</p>
              <a href="https://github.com/ridhwanrazaliwork" target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-accent transition-colors">
                /ridhwanrazaliwork
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
