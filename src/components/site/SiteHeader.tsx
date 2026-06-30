"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleTheme = useCallback(() => {
    const rect = toggleRef.current?.getBoundingClientRect();
    if (rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      document.documentElement.style.setProperty("--vt-x", `${x}px`);
      document.documentElement.style.setProperty("--vt-y", `${y}px`);
    }
    document.documentElement.classList.add("vt-theme");

    const newTheme = theme === "dark" ? "light" : "dark";

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("vt-theme");
      document.documentElement.style.removeProperty("--vt-x");
      document.documentElement.style.removeProperty("--vt-y");
    });
  }, [theme]);

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-background/60 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight transition-all duration-300 hover:text-accent hover:[text-shadow:0_0_20px_var(--accent-glow)]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <span className="md:hidden">Rid</span>
            <span className="hidden md:inline">Ridhwan</span>
          </Link>
          <button
            ref={toggleRef}
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors hover:bg-white/10 text-foreground/70 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex glass-pill items-center gap-1 px-2 py-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/20 text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-pill text-lg text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3">
          <div className="glass-panel p-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/20 text-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
