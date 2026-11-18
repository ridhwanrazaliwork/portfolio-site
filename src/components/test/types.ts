export type PatternStyle = "quantum" | "ripple" | "moire" | "fluid";
export type GridLayout = "staggered" | "square";

export interface EngineConfig {
  density: number;
  amplitude: number;
  waveSpeed: number;
  starSize: number;
  patternStyle: PatternStyle;
  gridLayout: GridLayout;
  particlesEnabled: boolean;
}

export const DEFAULT_CONFIG: EngineConfig = {
  density: 28,
  amplitude: 18,
  waveSpeed: 1.2,
  starSize: 8.0,
  patternStyle: "quantum",
  gridLayout: "staggered",
  particlesEnabled: true,
};
