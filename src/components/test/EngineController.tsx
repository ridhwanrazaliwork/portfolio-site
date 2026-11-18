"use client";

import { useState, useCallback, useMemo } from "react";
import type { EngineConfig, PatternStyle, GridLayout } from "./types";
import { cn } from "@/lib/utils";

interface EngineControllerProps {
  configRef: React.MutableRefObject<EngineConfig>;
  config: EngineConfig;
  onConfigChange: (config: EngineConfig) => void;
  onClose?: () => void;
}

interface LabelState {
  density: string;
  amplitude: string;
  starSize: string;
}

function computeLabels(config: EngineConfig): LabelState {
  let tightness = "Packed";
  if (config.density < 15) tightness = "Hyper Compressed";
  if (config.density > 24) tightness = "Balanced";

  let ampLabel = "Moderate";
  if (config.amplitude < 10) ampLabel = "Subtle";
  if (config.amplitude > 35) ampLabel = "Extreme";

  return {
    density: `${tightness} (${config.density}px)`,
    amplitude: `${ampLabel} (${config.amplitude}px)`,
    starSize: `${config.starSize.toFixed(1)}px`,
  };
}

export default function EngineController({
  configRef,
  config,
  onConfigChange,
  onClose,
}: EngineControllerProps) {
  const [collapsed, setCollapsed] = useState(false);

  const labels = useMemo(() => computeLabels(config), [config]);

  const updateConfig = useCallback(
    (partial: Partial<EngineConfig>) => {
      const next = { ...configRef.current, ...partial };
      configRef.current = next;
      onConfigChange(next);
    },
    [configRef, onConfigChange],
  );

  const setPatternStyle = useCallback(
    (style: PatternStyle) => {
      updateConfig({ patternStyle: style });
    },
    [updateConfig],
  );

  const setGridLayout = useCallback(
    (layout: GridLayout) => {
      updateConfig({ gridLayout: layout });
    },
    [updateConfig],
  );

  return (
    <section className="fixed bottom-6 right-6 z-50 max-w-sm w-[90vw]">
      <div className="bg-card/95 border border-border rounded-2xl p-5 backdrop-blur-xl shadow-2xl transition-all duration-300 relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <h3 className="font-semibold text-sm tracking-wide text-foreground uppercase">
              Star Engine 6.0
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              {collapsed ? "[ Expand ]" : "[ Minimize ]"}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close controller"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div
          className={cn(
            "space-y-4 transition-all duration-300",
            collapsed && "hidden",
          )}
        >
          <div>
            <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              <span>Particles</span>
              <span className={config.particlesEnabled ? "text-emerald-400 font-semibold" : "text-muted-foreground font-semibold"}>
                {config.particlesEnabled ? "ON" : "OFF"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => updateConfig({ particlesEnabled: true })}
                className={cn(
                  "px-2 py-1.5 rounded text-[10px] font-semibold transition-all",
                  config.particlesEnabled
                    ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                    : "bg-muted border border-border text-muted-foreground",
                )}
              >
                ON
              </button>
              <button
                onClick={() => updateConfig({ particlesEnabled: false })}
                className={cn(
                  "px-2 py-1.5 rounded text-[10px] font-semibold transition-all",
                  !config.particlesEnabled
                    ? "bg-red-500/20 border border-red-500 text-red-400"
                    : "bg-muted border border-border text-muted-foreground",
                )}
              >
                OFF
              </button>
            </div>
          </div>

          <PatternSelector
            current={config.patternStyle}
            onChange={setPatternStyle}
          />
          <GridLayoutSelector
            current={config.gridLayout}
            onChange={setGridLayout}
          />

          <SliderControl
            label="Grid Spacing (Resolution)"
            value={config.density}
            min={12}
            max={32}
            displayValue={labels.density}
            onChange={(v) => updateConfig({ density: v })}
          />
          <SliderControl
            label="Wave Amplitude"
            value={config.amplitude}
            min={5}
            max={50}
            displayValue={labels.amplitude}
            onChange={(v) => updateConfig({ amplitude: v })}
          />
          <SliderControl
            label="Star Base Size Max"
            value={Math.round(config.starSize * 10)}
            min={20}
            max={80}
            displayValue={labels.starSize}
            onChange={(v) => updateConfig({ starSize: v / 10 })}
          />
        </div>
      </div>
    </section>
  );
}

function PatternSelector({
  current,
  onChange,
}: {
  current: PatternStyle;
  onChange: (s: PatternStyle) => void;
}) {
  const patterns: { id: PatternStyle; icon: string; label: string }[] = [
    { id: "quantum", icon: "❖", label: "Quantum Grid" },
    { id: "ripple", icon: "◎", label: "Cosmic Ripples" },
    { id: "moire", icon: "⧉", label: "Interference Moiré" },
    { id: "fluid", icon: "≋", label: "Fluid Flow" },
  ];

  return (
    <div>
      <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
        <span>Size Variance Pattern</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={cn(
              "px-2 py-1.5 rounded text-[10px] text-left transition-all font-medium",
              current === p.id
                ? "bg-muted border border-accent text-foreground"
                : "bg-muted border border-border text-muted-foreground",
            )}
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function GridLayoutSelector({
  current,
  onChange,
}: {
  current: GridLayout;
  onChange: (l: GridLayout) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
        <span>Grid Layout Alignment</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={() => onChange("staggered")}
          className={cn(
            "px-2 py-1.5 rounded text-[10px] text-left transition-all font-medium",
            current === "staggered"
              ? "bg-muted border border-accent text-foreground"
              : "bg-muted border border-border text-muted-foreground",
          )}
        >
          ✦ Staggered Mesh
        </button>
        <button
          onClick={() => onChange("square")}
          className={cn(
            "px-2 py-1.5 rounded text-[10px] text-left transition-all font-medium",
            current === "square"
              ? "bg-muted border border-accent text-foreground"
              : "bg-muted border border-border text-muted-foreground",
          )}
        >
          ■ Square Grid
        </button>
      </div>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  displayValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  displayValue: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
        <span>{label}</span>
        <span className="text-accent font-semibold">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-[var(--accent)] bg-muted rounded-lg appearance-none h-1 cursor-pointer"
      />
    </div>
  );
}
