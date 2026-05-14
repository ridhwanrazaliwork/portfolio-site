import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

const HIDDEN = -9999;
const LERP = 0.12;

export const Component = () => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorTarget = useRef({ x: HIDDEN, y: HIDDEN });

  const mouseX = useMotionValue(HIDDEN);
  const mouseY = useMotionValue(HIDDEN);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      cursorTarget.current = { x: e.clientX - left, y: e.clientY - top };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    cursorTarget.current = { x: HIDDEN, y: HIDDEN };
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      cursorTarget.current = { x: touch.clientX - left, y: touch.clientY - top };
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    cursorTarget.current = { x: HIDDEN, y: HIDDEN };
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
      className={cn(
        "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-purple-500/40 dark:bg-purple-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-green-500/40 dark:bg-green-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-6 pointer-events-none">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            The Infinite Grid
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Move your cursor to reveal the active grid layer. <br />
            The pattern scrolls infinitely in the background.
          </p>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={() => setCount(count + 1)}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            Interact ({count})
          </button>
          <button className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: any;
  offsetY: any;
}) => {
  return (
    <svg className="w-full h-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id="grid-pattern"
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
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
