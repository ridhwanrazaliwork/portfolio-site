"use client";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20 pointer-events-none">
      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-4xl leading-tight pointer-events-none"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Some random words here
      </h1>
      <p
        className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl pointer-events-none"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Ridhwan — this is my portfolio site.
      </p>
      <button className="glass-button mt-10 text-base pointer-events-auto">
        Explore My Work
      </button>
    </div>
  );
}
