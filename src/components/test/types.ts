export type PatternStyle = "quantum" | "ripple" | "moire" | "fluid";
export type GridLayout = "staggered" | "square";

export interface EngineConfig {
  density: number;
  amplitude: number;
  waveSpeed: number;
  starSize: number;
  colorSpeed: number;
  colorState: number;
  patternStyle: PatternStyle;
  gridLayout: GridLayout;
}

export const DEFAULT_CONFIG: EngineConfig = {
  density: 12,
  amplitude: 18,
  waveSpeed: 1.2,
  starSize: 8.0,
  colorSpeed: 0.0012,
  colorState: -1,
  patternStyle: "quantum",
  gridLayout: "staggered",
};

export const COLOR_NAMES = [
  "Deep Indigo",
  "Electric Blue",
  "Light Green",
  "Light Yellow",
] as const;
