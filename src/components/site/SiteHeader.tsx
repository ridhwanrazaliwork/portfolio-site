"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-background/60 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <span className="md:hidden">Rid</span>
          <span className="hidden md:inline">Ridhwan</span>
        </Link>

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
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-foreground/70 hover:text-foreground hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
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
            <button
              onClick={toggleTheme}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-foreground/70 hover:text-foreground hover:bg-white/10 text-left"
            >
              {theme === "dark" ? "\u2600\uFE0F  Light mode" : "\uD83C\uDF19  Dark mode"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
