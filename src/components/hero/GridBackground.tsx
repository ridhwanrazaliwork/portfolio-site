"use client";

import { useEffect, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

const HIDDEN = -9999;
const LERP = 0.12;

function GridPattern({
  offsetX,
  offsetY,
}: {
  offsetX: any;
  offsetY: any;
}) {
  return (
    <svg className="w-full h-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id="hero-grid-pattern"
          width="80"
          height="20"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 0 10 C 20 -6, 60 26, 80 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
    </svg>
  );
}

export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorTarget = useRef({ x: HIDDEN, y: HIDDEN });

  const mouseX = useMotionValue(HIDDEN);
  const mouseY = useMotionValue(HIDDEN);

  const getRect = useCallback(() => {
    return containerRef.current?.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = getRect();
      if (!rect) return;
      cursorTarget.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [getRect]
  );

  const handleMouseLeave = useCallback(() => {
    cursorTarget.current = { x: HIDDEN, y: HIDDEN };
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = getRect();
      if (!rect) return;
      const touch = e.touches[0];
      if (touch) {
        cursorTarget.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      }
    },
    [getRect]
  );

  const handleTouchEnd = useCallback(() => {
    cursorTarget.current = { x: HIDDEN, y: HIDDEN };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      cursorTarget.current = { x: HIDDEN, y: HIDDEN };
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    const curX = gridOffsetX.get();
    gridOffsetX.set((curX + 1) % 80);

    const target = cursorTarget.current;
    const mx = mouseX.get();
    const my = mouseY.get();
    mouseX.set(mx + (target.x - mx) * LERP);
    mouseY.set(my + (target.y - my) * LERP);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ backgroundColor: "#f07167", opacity: 0.4 }} />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-purple-500/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-teal-500/40 blur-[120px]" />
      </div>
    </div>
  );
}
