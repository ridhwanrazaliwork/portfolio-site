"use client";

import { useEffect, useRef } from "react";
import type { EngineConfig } from "./types";

const colors = [
  { r: 79, g: 70, b: 229, name: "Deep Indigo" },
  { r: 6, g: 182, b: 212, name: "Electric Blue" },
  { r: 34, g: 197, b: 94, name: "Light Green" },
  { r: 234, g: 179, b: 8, name: "Light Yellow" },
] as const;

const violetColor = { r: 139, g: 92, b: 246 };

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
  if (size < 1.5) {
    context.fillRect(cx - size, cy - size, size * 2, size * 2);
    return;
  }
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
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const colorProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let lastTime = performance.now();
    let colorProgress = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 8);

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

    resize();
    window.addEventListener("resize", resize);

    function render(now: number) {
      const c = canvasRef.current;
      if (!c) return;
      const cx = c.getContext("2d");
      if (!cx) return;

      const delta = (now - lastTime) / 1000 || 0;
      if (delta < 0.025) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastTime = now;
      time += delta;

      const config = configRef.current;
      if (!config) return;

      const isLight = document.documentElement.getAttribute("data-theme") === "light";

      if (config.colorState === -1) {
        colorProgress += delta * config.colorSpeed * 100;
        if (colorProgress >= colors.length) {
          colorProgress -= colors.length;
        }
      } else {
        const target = config.colorState;
        const current = colorProgress;
        let diff = target - current;
        if (Math.abs(diff) > colors.length / 2) {
          if (diff > 0) diff -= colors.length;
          else diff += colors.length;
        }
        colorProgress += diff * 0.1;
        if (colorProgress < 0) colorProgress += colors.length;
        if (colorProgress >= colors.length) colorProgress -= colors.length;
      }

      const idx = ((Math.floor(colorProgress) % colors.length) + colors.length) % colors.length;
      const nextIdx = (idx + 1) % colors.length;
      const colorFactor = colorProgress % 1;

      const curR = Math.round(
        colors[idx].r + (colors[nextIdx].r - colors[idx].r) * colorFactor,
      );
      const curG = Math.round(
        colors[idx].g + (colors[nextIdx].g - colors[idx].g) * colorFactor,
      );
      const curB = Math.round(
        colors[idx].b + (colors[nextIdx].b - colors[idx].b) * colorFactor,
      );

      const w = c.width / dpr;
      const h = c.height / dpr;

      const viewportRatio = w < 768 ? 0.20 : 0.35;

      if (isLight) {
        cx.fillStyle = "#ffffff";
        cx.fillRect(0, 0, w, h);

        const grad = cx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(viewportRatio, "#ffffff");
        grad.addColorStop(viewportRatio + 0.50, `rgba(${curR}, ${curG}, ${curB}, 0.06)`);
        grad.addColorStop(1, `rgba(${violetColor.r}, ${violetColor.g}, ${violetColor.b}, 0.08)`);
        cx.fillStyle = grad;
        cx.fillRect(0, 0, w, h);
      } else {
        cx.fillStyle = "#000000";
        cx.fillRect(0, 0, w, h);

        const globalWaveOffset = Math.sin(time * config.waveSpeed) * (config.amplitude * 0.35);
        const stop1 = viewportRatio + globalWaveOffset / h;
        const stop2 = (viewportRatio + 0.40) + globalWaveOffset / h;
        const clamp = (v: number) => Math.min(1, Math.max(0, v));

        const grad = cx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#000000");
        grad.addColorStop(clamp(stop1), "#000000");
        grad.addColorStop(clamp(stop2), `rgba(${curR}, ${curG}, ${curB}, 0.22)`);
        grad.addColorStop(1, `rgba(${violetColor.r}, ${violetColor.g}, ${violetColor.b}, 0.28)`);
        cx.fillStyle = grad;
        cx.fillRect(0, 0, w, h);
      }

      const isStaggered = config.gridLayout === "staggered";
      const step = isStaggered ? config.density / 2 : config.density;
      const startY = h * viewportRatio;

      let colIndex = 0;
      for (let x = -step; x <= w + step * 2; x += step) {
        let rowIndex = 0;
        for (let y = startY - step * 2; y <= h + step * 2; y += step) {
          if (isStaggered && (colIndex + rowIndex) % 2 !== 0) {
            rowIndex++;
            continue;
          }

          const waveX = x * 0.004;
          const waveOffset =
            Math.sin(waveX + time * config.waveSpeed) * config.amplitude;
          const targetY = y + waveOffset;

          if (targetY < startY) {
            rowIndex++;
            continue;
          }

          const depthFactor = (y - startY) / (h - startY);
          const fade =
            0.25 +
            0.75 * Math.pow(Math.min(1, Math.max(0, depthFactor)), 0.8);

          const starR = Math.round(
            curR + (violetColor.r - curR) * depthFactor,
          );
          const starG = Math.round(
            curG + (violetColor.g - curG) * depthFactor,
          );
          const starB = Math.round(
            curB + (violetColor.b - curB) * depthFactor,
          );

          cx.fillStyle = `rgba(${starR}, ${starG}, ${starB}, ${0.92 * Math.min(1, Math.max(0, depthFactor))})`;

          let patternMultiplier = 1.0;
          const px = x * 0.02;
          const py = targetY * 0.02;

          switch (config.patternStyle) {
            case "quantum":
              patternMultiplier =
                0.55 + 0.45 * Math.sin(px) * Math.sin(py + time);
              break;
            case "ripple": {
              const cx = w * 0.5;
              const cy = h * 0.9;
              const dx = x - cx;
              const dy = targetY - cy;
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
              patternMultiplier =
                0.5 + 0.5 * Math.sin(px - py + time * 1.5);
              break;
          }

          const pulse =
            (0.7 +
              0.3 * Math.sin(x * 0.008 - y * 0.005 + time * 1.5)) *
            patternMultiplier;
          const size = config.starSize * fade * pulse;

          const waveXOffset =
            Math.cos(y * 0.005 + time * 0.7) * (config.amplitude * 0.3);
          const finalX = x + waveXOffset;

          drawFourPointStar(cx, finalX, targetY, size);
          rowIndex++;
        }
        colIndex++;
      }

      timeRef.current = time;
      lastTimeRef.current = lastTime;
      colorProgressRef.current = colorProgress;

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
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
