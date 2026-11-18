"use client";

import { useEffect, useRef } from "react";
import type { EngineConfig } from "./types";

/**
 * Single-hue palettes. The canvas is rendered over a fixed backdrop, so the
 * accent color is baked in per theme (rgb triplets keep the per-star fill
 * string cheap). No hue cycling — depth is expressed with opacity only.
 */
const PALETTE = {
  dark: {
    rgb: "248, 246, 118", // oklch(95% 0.15 108) — neon yellow accent
    background: "#050505",
    glowNear: 0.04,
    glowFar: 0.11,
    starMin: 0.16,
    starMax: 0.5,
  },
  light: {
    rgb: "7, 53, 97", // oklch(32.6% 0.0909 252.3) — navy accent
    background: "#ffffff",
    glowNear: 0.035,
    glowFar: 0.08,
    starMin: 0.07,
    starMax: 0.24,
  },
} as const;

interface StarCanvasProps {
  configRef: React.MutableRefObject<EngineConfig>;
}

function drawFourPointStar(
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  if (size <= 0.2) return;
  context.beginPath();
  context.moveTo(cx, cy - size);
  context.quadraticCurveTo(cx, cy, cx + size, cy);
  context.quadraticCurveTo(cx, cy, cx, cy + size);
  context.quadraticCurveTo(cx, cy, cx - size, cy);
  context.quadraticCurveTo(cx, cy, cx, cy - size);
  context.closePath();
  context.fill();
}

export default function StarCanvas({ configRef }: StarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reduceQuery.matches;
    let time = 0;
    let lastTime = performance.now();

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const cx = c.getContext("2d");
      if (!cx) return;
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      cx.resetTransform();
      cx.scale(dpr, dpr);
    }

    function render(now: number) {
      const c = canvasRef.current;
      if (!c) return;
      const cx = c.getContext("2d");
      if (!cx) return;

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!reduceMotion) time += delta;

      const config = configRef.current;
      if (!config) return;

      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      const palette = isLight ? PALETTE.light : PALETTE.dark;

      const w = c.width / dpr;
      const h = c.height / dpr;
      const viewportRatio = w < 768 ? 0.2 : 0.35;

      cx.fillStyle = palette.background;
      cx.fillRect(0, 0, w, h);

      // Single-hue glow: same color at three opacities instead of a second hue.
      const wave = reduceMotion
        ? 0
        : Math.sin(time * config.waveSpeed) * (config.amplitude * 0.35);
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const stop1 = clamp(viewportRatio + wave / h);
      const stop2 = clamp(viewportRatio + 0.4 + wave / h);

      const grad = cx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, palette.background);
      grad.addColorStop(stop1, palette.background);
      grad.addColorStop(stop2, `rgba(${palette.rgb}, ${palette.glowNear})`);
      grad.addColorStop(1, `rgba(${palette.rgb}, ${palette.glowFar})`);
      cx.fillStyle = grad;
      cx.fillRect(0, 0, w, h);

      if (!config.particlesEnabled) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const isStaggered = config.gridLayout === "staggered";
      const step = isStaggered ? config.density / 2 : config.density;
      const startY = h * viewportRatio;
      const alphaRange = palette.starMax - palette.starMin;

      let colIndex = 0;
      for (let x = -step; x <= w + step * 2; x += step) {
        let rowIndex = 0;
        for (let y = startY - step * 2; y <= h + step * 2; y += step) {
          if (isStaggered && (colIndex + rowIndex) % 2 !== 0) {
            rowIndex++;
            continue;
          }

          const waveX = x * 0.004;
          const waveOffset = reduceMotion
            ? 0
            : Math.sin(waveX + time * config.waveSpeed) * config.amplitude;
          const targetY = y + waveOffset;

          if (targetY < startY) {
            rowIndex++;
            continue;
          }

          const depthFactor = Math.min(
            1,
            Math.max(0, (y - startY) / (h - startY)),
          );
          const fade = 0.25 + 0.75 * Math.pow(depthFactor, 0.8);

          let patternMultiplier = 1.0;
          const px = x * 0.02;
          const py = targetY * 0.02;

          if (!reduceMotion) {
            switch (config.patternStyle) {
              case "quantum":
                patternMultiplier = 0.55 + 0.45 * Math.sin(px) * Math.sin(py + time);
                break;
              case "ripple": {
                const rx = w * 0.5;
                const ry = h * 0.9;
                const dx = x - rx;
                const dy = targetY - ry;
                const dist = Math.sqrt(dx * dx + dy * dy);
                patternMultiplier =
                  0.5 + 0.5 * Math.sin(dist * 0.04 - time * 3.0);
                break;
              }
              case "moire":
                patternMultiplier =
                  0.55 +
                  0.45 *
                    Math.sin(
                      px * Math.cos(time * 0.1) * 3 +
                        py * Math.sin(time * 0.15) * 3,
                    );
                break;
              case "fluid":
                patternMultiplier = 0.5 + 0.5 * Math.sin(px - py + time * 1.5);
                break;
            }
          }

          const pulse =
            (0.7 +
              0.3 *
                Math.sin(x * 0.008 - y * 0.005 + time * 1.5)) *
            patternMultiplier;
          const size = config.starSize * fade * pulse;

          const alpha =
            palette.starMin + alphaRange * Math.pow(depthFactor, 0.8);
          cx.fillStyle = `rgba(${palette.rgb}, ${Math.min(1, Math.max(0, alpha))})`;

          const waveXOffset = reduceMotion
            ? 0
            : Math.cos(y * 0.005 + time * 0.7) * (config.amplitude * 0.3);

          drawFourPointStar(cx, x + waveXOffset, targetY, size);
          rowIndex++;
        }
        colIndex++;
      }

      rafRef.current = requestAnimationFrame(render);
    }

    let running = false;

    function start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      rafRef.current = requestAnimationFrame(render);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafRef.current);
    }

    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function handleMotionPreference(event: MediaQueryListEvent) {
      reduceMotion = event.matches;
    }

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    reduceQuery.addEventListener("change", handleMotionPreference);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reduceQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [configRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block"
      style={{ background: "var(--background)" }}
    />
  );
}
