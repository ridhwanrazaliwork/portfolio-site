"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { workplaces } from "@/content/workplaces";
import {
  buildingKey,
  groupByBuilding,
  sortWorkplaces,
  type Workplace,
} from "@/lib/workplaces";
import type { FocusRequest } from "./types";
import WorkplaceList from "./WorkplaceList";

const WorkplaceMap = dynamic(() => import("./WorkplaceMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <MapPin className="h-6 w-6 animate-bounce" aria-hidden="true" />
        <p className="text-sm">Loading map…</p>
      </div>
    </div>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy copy path.
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  } catch {
    return false;
  }
}

export default function MapExperience() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focus, setFocus] = useState<FocusRequest | null>(null);
  const [pickerEnabled, setPickerEnabled] = useState(false);
  const [picked, setPicked] = useState<{ label: string; copied: boolean } | null>(
    null,
  );

  const mapCardRef = useRef<HTMLDivElement | null>(null);

  const buildings = useMemo(() => groupByBuilding(workplaces), []);
  const sorted = useMemo(() => sortWorkplaces(workplaces), []);

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    const hasPickerParam =
      new URLSearchParams(window.location.search).get("picker") === "1";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isDev || hasPickerParam) setPickerEnabled(true);
  }, []);

  const handleSelect = useCallback(
    (workplace: Workplace) => {
      setActiveId(workplace.id);
      setFocus({
        workplaceId: workplace.id,
        buildingKey: buildingKey(workplace.lat, workplace.lng),
        lat: workplace.lat,
        lng: workplace.lng,
        nonce: Date.now(),
      });

      if (window.matchMedia("(max-width: 767px)").matches) {
        mapCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    [mapCardRef],
  );

  const handleMarkerClick = useCallback(() => setActiveId(null), []);

  const handlePick = useCallback((lat: number, lng: number) => {
    const label = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    void copyText(label).then((copied) => setPicked({ label, copied }));
  }, []);

  return (
    <div className="min-h-screen px-4 pt-28 pb-20">
      <div className="mx-auto max-w-5xl">
        <h1
          className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          style={{
            fontFamily: "var(--font-poppins)",
            letterSpacing: "-0.02em",
          }}
        >
          Company Map
        </h1>
        <p className="mx-auto max-w-xl text-center text-base text-muted-foreground md:text-lg">
          Offices of companies I find interesting. Pan around to see what is
          nearby, hover a pin for the name, or jump from the list below.
        </p>
        <p
          className="mt-3 text-center text-[11px] text-muted-foreground"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {sorted.length} {sorted.length === 1 ? "company" : "companies"} ·{" "}
          {buildings.length} {buildings.length === 1 ? "location" : "locations"}
        </p>

        <div
          ref={mapCardRef}
          role="region"
          aria-label="Map of company office locations"
          className="relative isolate mt-8 h-[52vh] max-h-[620px] min-h-[340px] w-full overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] md:h-[60vh]"
        >
          <WorkplaceMap
            buildings={buildings}
            activeWorkplaceId={activeId}
            focus={focus}
            pickerEnabled={pickerEnabled}
            onMarkerClick={handleMarkerClick}
            onPick={handlePick}
          />

          {pickerEnabled && (
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2 text-xs shadow-[var(--glass-shadow)] backdrop-blur-md">
              <p className="font-medium text-foreground">Coordinate picker</p>
              <p className="mt-0.5 text-muted-foreground">
                Click the map to copy coordinates.
              </p>
              {picked && (
                <>
                  <code
                    className="mt-1 block select-all text-accent"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {picked.label}
                  </code>
                  <p className="mt-0.5 text-muted-foreground">
                    {picked.copied
                      ? "Copied — paste into src/content/workplaces.ts"
                      : "Copy failed — select the text above manually"}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Click a pin for details. The list below works with the keyboard too.
        </p>

        <div className="mt-6">
          <WorkplaceList
            workplaces={sorted}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}
