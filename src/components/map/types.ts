export type FocusRequest = {
  workplaceId: string;
  buildingKey: string;
  lat: number;
  lng: number;
  /** Bumped on every request so clicking the same row re-runs the animation. */
  nonce: number;
};
