import type { Metadata } from "next";
import MapExperience from "@/components/map/MapExperience";

export const metadata: Metadata = {
  title: "Map",
  description:
    "A map of company office locations — see what is nearby and get a feel for the commute.",
  openGraph: {
    title: "Map | Ridhwan",
    description:
      "A map of company office locations — see what is nearby and get a feel for the commute.",
  },
};

export default function MapPage() {
  return <MapExperience />;
}
