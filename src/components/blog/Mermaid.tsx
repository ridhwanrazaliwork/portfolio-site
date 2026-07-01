"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  themeVariables: {
    primaryColor: "var(--accent)",
    primaryTextColor: "#a3a3a3",
    primaryBorderColor: "var(--glass-border)",
    lineColor: "var(--accent-30)",
    secondaryColor: "var(--glass-bg)",
    tertiaryColor: "var(--glass-bg)",
  },
  securityLevel: "loose",
});

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="my-6 flex justify-center overflow-x-auto">
      <div
        ref={ref}
        className="mermaid max-w-full"
        style={{ background: "transparent" }}
      >
        {chart}
      </div>
    </div>
  );
}
