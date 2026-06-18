"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/test", label: "Test" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ridhwan
        </Link>
        <nav className="glass-pill flex items-center gap-1 px-2 py-1.5">
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
      </div>
    </header>
  );
}
