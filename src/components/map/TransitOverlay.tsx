"use client";

import { Fragment, useEffect, useState } from "react";
import { CircleMarker, Polyline, Tooltip, useMap } from "react-leaflet";
import transitJson from "@/content/transit-lines.json";

/**
 * Klang Valley rail overlay.
 *
 * Easy to remove: set SHOW_TRANSIT to false to hide the layer, or delete this
 * file, `src/content/transit-lines.json`, the `<TransitOverlay />` line in
 * WorkplaceMap.tsx and the "Transit overlay" block in map.css.
 *
 * Geometry, station stops and line colours come from OpenStreetMap route
 * relations (@see scripts/build-transit.mjs). Data © OpenStreetMap
 * contributors, ODbL 1.0.
 */
const SHOW_TRANSIT = true;

/** Below these zooms the layer adds noise rather than information. */
const MIN_LINE_ZOOM = 10;
const MIN_STATION_ZOOM = 13;

type Position = [number, number];

type LineFeature = {
  type: "Feature";
  properties: {
    name: string;
    ref: string;
    colour: string;
    network: string;
    mode: "metro" | "commuter";
  };
  geometry:
    | { type: "LineString"; coordinates: Position[] }
    | { type: "MultiLineString"; coordinates: Position[][] };
};

type Station = {
  name: string;
  refs: string[];
  lat: number;
  lng: number;
};

type TransitData = {
  features: LineFeature[];
  stations: Station[];
};

const transit = transitJson as unknown as TransitData;

const LINE_COLOURS = new Map(
  transit.features.map((feature) => [
    feature.properties.ref,
    feature.properties.colour,
  ]),
);

const FALLBACK_COLOUR = "#8a8a8a";

/** Commuter rail (KTM, ERL) is drawn lighter than metro. */
const LINE_WEIGHTS = {
  metro: { core: 3, casing: 7 },
  commuter: { core: 2.5, casing: 6 },
} as const;

function partsOf(feature: LineFeature): Position[][] {
  return feature.geometry.type === "LineString"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}

function toLatLng(part: Position[]): Position[] {
  return part.map(([lng, lat]) => [lat, lng]);
}

function useMapZoom(): number {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());

  useEffect(() => {
    const update = () => setZoom(map.getZoom());
    update();
    map.on("zoomend", update);
    return () => {
      map.off("zoomend", update);
    };
  }, [map]);

  return zoom;
}

type TransitOverlayProps = {
  /** Station tooltips are turned off while the coordinate picker is active. */
  interactive?: boolean;
};

function TransitLayer({ interactive }: { interactive: boolean }) {
  const zoom = useMapZoom();
  const showLines = zoom >= MIN_LINE_ZOOM;
  const showStations = zoom >= MIN_STATION_ZOOM;

  return (
    <>
      {showLines &&
        transit.features.map((feature) =>
          partsOf(feature).map((part, index) => {
            const positions = toLatLng(part);
            const weights =
              LINE_WEIGHTS[feature.properties.mode] ?? LINE_WEIGHTS.metro;
            return (
              <Fragment key={`${feature.properties.ref}-${index}`}>
                <Polyline
                  positions={positions}
                  interactive={false}
                  className="transit-line-casing"
                  pathOptions={{
                    weight: weights.casing,
                    opacity: 0.6,
                  }}
                />
                <Polyline
                  positions={positions}
                  interactive={false}
                  className="transit-line-core"
                  pathOptions={{
                    color: feature.properties.colour,
                    weight: weights.core,
                    opacity: 0.95,
                    lineCap: "round",
                    lineJoin: "round",
                  }}
                />
              </Fragment>
            );
          }),
        )}

      {showStations &&
        transit.stations.map((station) => {
          const interchange = station.refs.length > 1;
          const colour = LINE_COLOURS.get(station.refs[0]) ?? FALLBACK_COLOUR;

          return (
            <CircleMarker
              key={station.name}
              center={[station.lat, station.lng]}
              radius={interchange ? 6.5 : 5}
              interactive={interactive}
              className={
                interchange
                  ? "transit-station transit-station-interchange"
                  : "transit-station"
              }
              pathOptions={{
                color: colour,
                weight: 2.5,
                opacity: 1,
                fill: true,
                fillColor: colour,
                fillOpacity: 1,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -6]}
                opacity={1}
                className="transit-tooltip"
              >
                <span className="transit-tooltip-name">{station.name}</span>
                <span
                  className="transit-tooltip-refs"
                  aria-label={`Lines ${station.refs.join(", ")}`}
                >
                  {station.refs.map((ref) => (
                    <span key={ref} className="transit-tooltip-ref">
                      <span
                        className="transit-tooltip-dot"
                        aria-hidden="true"
                        style={{
                          background: LINE_COLOURS.get(ref) ?? FALLBACK_COLOUR,
                        }}
                      />
                      {ref}
                    </span>
                  ))}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
    </>
  );
}

export default function TransitOverlay({
  interactive = true,
}: TransitOverlayProps) {
  if (!SHOW_TRANSIT) return null;
  return <TransitLayer interactive={interactive} />;
}
