"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { workplaceMeta, type Building } from "@/lib/workplaces";
import type { FocusRequest } from "./types";
import { useThemeAttribute } from "./useThemeAttribute";
import TransitOverlay from "./TransitOverlay";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "./map.css";

// CARTO's raster tiles have required a key since 25 September 2026; without
// one they return an "API key required" placeholder image instead of a map.
// The key is public by design (it ships in the client bundle), so it is safe
// to inline here via a NEXT_PUBLIC_ variable.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY?.trim();

if (process.env.NODE_ENV !== "production" && !CARTO_KEY) {
  console.warn(
    "NEXT_PUBLIC_CARTO_KEY is missing — CARTO tiles will show an " +
      '"API key required" watermark. Get a free key at ' +
      "https://carto.com/basemaps/apikey/.",
  );
}

const TILE_KEY = CARTO_KEY ? `?key=${CARTO_KEY}` : "";

const TILES = {
  dark: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png${TILE_KEY}`,
  light: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png${TILE_KEY}`,
} as const;

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const FOCUS_ZOOM = 15;

type WorkplaceMapProps = {
  buildings: Building[];
  activeWorkplaceId: string | null;
  focus: FocusRequest | null;
  pickerEnabled: boolean;
  onMarkerClick: () => void;
  onPick: (lat: number, lng: number) => void;
};

function pinIcon(companyCount: number): L.DivIcon {
  const badge =
    companyCount > 1
      ? `<span class="wp-pin-count">${companyCount}</span>`
      : "";

  return L.divIcon({
    className: "workplace-marker",
    html: `<span class="wp-pin"><svg viewBox="0 0 32 40" aria-hidden="true"><path d="M16 1.5C8.3 1.5 2 7.8 2 15.5c0 10.2 14 23 14 23s14-12.8 14-23C30 7.8 23.7 1.5 16 1.5Z" fill="var(--accent)" stroke="var(--background)" stroke-width="2"/><circle cx="16" cy="15.5" r="5.5" fill="var(--accent-foreground)"/></svg>${badge}</span>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
    tooltipAnchor: [0, -34],
  });
}

function clusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount();
  const size = count < 10 ? 42 : count < 100 ? 48 : 54;

  return L.divIcon({
    className: "wp-cluster",
    html: `<span class="wp-cluster-inner" style="width:${size}px;height:${size}px">${count}</span>`,
    iconSize: [size, size],
  });
}

type ControllerProps = {
  buildings: Building[];
  focus: FocusRequest | null;
  markerRefs: RefObject<Record<string, L.Marker>>;
  clusterRef: RefObject<L.MarkerClusterGroup | null>;
};

function MapController({
  buildings,
  focus,
  markerRefs,
  clusterRef,
}: ControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (buildings.length === 0) return;

    const bounds = L.latLngBounds(
      buildings.map((building) => L.latLng(building.lat, building.lng)),
    );
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: FOCUS_ZOOM });
  }, [map, buildings]);

  useEffect(() => {
    if (!focus) return;

    const marker = markerRefs.current[focus.buildingKey];
    if (!marker) return;

    map.flyTo([focus.lat, focus.lng], Math.max(map.getZoom(), FOCUS_ZOOM), {
      duration: 0.9,
    });

    const openPopup = () => {
      const cluster = clusterRef.current;
      if (cluster) {
        cluster.zoomToShowLayer(marker, () => marker.openPopup());
      } else {
        marker.openPopup();
      }
    };

    // `moveend` fires when the fly animation finishes; the timer covers
    // the case where the map is already at the target position.
    map.once("moveend", openPopup);
    const timer = window.setTimeout(openPopup, 1000);

    return () => {
      map.off("moveend", openPopup);
      window.clearTimeout(timer);
    };
  }, [focus, map, markerRefs, clusterRef]);

  // Start with scroll-wheel zoom off so the page keeps scrolling, then let a
  // click on the map opt in until the pointer leaves it.
  useEffect(() => {
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();

    map.on("click", enable);
    map.on("mouseout", disable);

    return () => {
      map.off("click", enable);
      map.off("mouseout", disable);
    };
  }, [map]);

  return null;
}

function PickerClickHandler({
  enabled,
  onPick,
}: {
  enabled: boolean;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(event) {
      if (!enabled) return;
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export default function WorkplaceMap({
  buildings,
  activeWorkplaceId,
  focus,
  pickerEnabled,
  onMarkerClick,
  onPick,
}: WorkplaceMapProps) {
  const theme = useThemeAttribute();
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const building of buildings) {
      map.set(building.key, pinIcon(building.companies.length));
    }
    return map;
  }, [buildings]);

  return (
    <MapContainer
      center={[3.048, 101.695]}
      zoom={14}
      minZoom={3}
      maxZoom={19}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        key={theme}
        url={TILES[theme]}
        attribution={ATTRIBUTION}
        subdomains="abcd"
        maxZoom={20}
        detectRetina
      />

      <ZoomControl position="topright" />

      <TransitOverlay interactive={!pickerEnabled} />

      <MapController
        buildings={buildings}
        focus={focus}
        markerRefs={markerRefs}
        clusterRef={clusterRef}
      />

      <PickerClickHandler enabled={pickerEnabled} onPick={onPick} />

      <MarkerClusterGroup
        ref={clusterRef}
        chunkedLoading
        showCoverageOnHover={false}
        maxClusterRadius={60}
        spiderfyOnMaxZoom
        iconCreateFunction={clusterIcon}
      >
        {buildings.map((building) => {
          const label = building.companies.join(" · ");

          return (
            <Marker
              key={building.key}
              position={[building.lat, building.lng]}
              icon={icons.get(building.key)}
              title={label}
              alt={label}
              riseOnHover
              eventHandlers={{ click: onMarkerClick }}
              ref={(marker) => {
                if (marker) {
                  markerRefs.current[building.key] = marker;
                } else {
                  delete markerRefs.current[building.key];
                }
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -38]}
                opacity={1}
                className="wp-tooltip"
              >
                {label}
              </Tooltip>

              <Popup
                className="wp-popup"
                minWidth={220}
                maxWidth={300}
                autoPanPadding={[28, 28]}
              >
                <div className="space-y-2.5">
                  {building.workplaces.map((workplace) => {
                    const active = workplace.id === activeWorkplaceId;
                    const meta = workplaceMeta(workplace);

                    return (
                      <div
                        key={workplace.id}
                        className={`rounded-lg border-l-2 px-2.5 py-2 transition-colors ${
                          active
                            ? "border-accent bg-accent/10"
                            : "border-transparent"
                        }`}
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {workplace.company}
                        </p>
                        {meta && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {meta}
                          </p>
                        )}
                        {workplace.note && (
                          <p className="mt-1 text-xs text-muted-foreground/80">
                            {workplace.note}
                          </p>
                        )}
                        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                          {workplace.area}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
