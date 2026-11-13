#!/usr/bin/env node
/**
 * Refreshes `src/content/transit-lines.json` from OpenStreetMap.
 *
 * This is a maintenance script, not part of the build. Run it by hand when you
 * want newer track geometry or new stations:
 *
 *   node scripts/build-transit.mjs
 *
 * It fetches each Klang Valley rail line's OSM route relation, stitches the
 * member ways into ordered polylines, simplifies them (~9 m tolerance, roughly
 * 850 points for all six lines) and collects the station stops.
 *
 * Data © OpenStreetMap contributors, licensed under ODbL 1.0. The map already
 * credits OSM/CARTO in its attribution control.
 *
 * OSM's API etiquette asks for a descriptive User-Agent and modest request
 * rates, hence the delays and retries below. Nothing here runs at runtime.
 */

import { writeFileSync } from "node:fs";

const USER_AGENT =
  "ridhwan-portfolio-transit-build/1.0 (ridhwanrazaliwork@gmail.com)";

const OUT_PATH = new URL("../src/content/transit-lines.json", import.meta.url);

/** Simplify tolerance in degrees. 0.00008 ≈ 9 m at this latitude. */
const TOLERANCE = 0.00008;
/** Commuter lines are long and gentle; they need less detail to look right. */
const COMMUTER_TOLERANCE = 0.00012;

/**
 * OSM relation id → display metadata.
 *
 * Metro lines point at a `route_master`; the commuter lines are single
 * `route` relations, which `buildLine` handles.
 *
 * Colours are the operators' line colours. OSM tags the KTM lines pure
 * #0000FF / #FF0000, which is harsh on both basemaps, so the softer official
 * shades are used here.
 */
const LINES = [
  // Commuter first so metro lines paint on top where they meet.
  {
    id: "8390976",
    name: "KTM Seremban Line",
    ref: "1",
    colour: "#1964B7",
    network: "KTM Komuter",
    mode: "commuter",
  },
  {
    id: "2565937",
    name: "KTM Port Klang Line",
    ref: "2",
    colour: "#DC241F",
    network: "KTM Komuter",
    mode: "commuter",
  },
  {
    id: "8119877",
    name: "KLIA Transit",
    ref: "7",
    colour: "#139593",
    network: "ERL",
    mode: "commuter",
  },
  { id: "8000461", name: "Kelana Jaya Line", ref: "KJ", colour: "#E0115F" },
  { id: "8000298", name: "Ampang Line", ref: "AG", colour: "#F68933" },
  { id: "8000405", name: "Sri Petaling Line", ref: "SP", colour: "#881211" },
  { id: "8148849", name: "KL Monorail", ref: "MR", colour: "#7DBA00" },
  { id: "8000326", name: "MRT Kajang Line", ref: "KG", colour: "#008000" },
  { id: "8298259", name: "MRT Putrajaya Line", ref: "PY", colour: "#FACA05" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function attr(block, name) {
  const match = block.match(new RegExp(`${name}="([^"]*)"`));
  return match ? match[1] : null;
}

async function fetchOsm(path, attempt = 1) {
  const url = `https://api.openstreetmap.org/api/0.6/${path}`;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });

  if (!response.ok) {
    if (attempt < 3) {
      await sleep(1500 * attempt);
      return fetchOsm(path, attempt + 1);
    }
    throw new Error(`${url} -> HTTP ${response.status}`);
  }

  return response.text();
}

/** Parses node id → { lat, lon, name } from an OSM `relation/{id}/full` body. */
function parseNodes(xml) {
  const nodes = new Map();
  const pattern = /<node\b([^>]*?)(?:\/>|>([\s\S]*?)<\/node>)/g;

  for (const match of xml.matchAll(pattern)) {
    const id = attr(match[1], "id");
    const lat = Number(attr(match[1], "lat"));
    const lon = Number(attr(match[1], "lon"));
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;

    const body = match[2] ?? "";
    const nameTag = body.match(/<tag\b[^>]*k="name"[^>]*\/>/);
    nodes.set(id, {
      lat,
      lon,
      name: nameTag ? attr(nameTag[0], "v") : null,
    });
  }

  return nodes;
}

/** Parses way id → ordered node refs. */
function parseWays(xml) {
  const ways = new Map();
  const pattern = /<way\b([^>]*)>([\s\S]*?)<\/way>/g;

  for (const match of xml.matchAll(pattern)) {
    const id = attr(match[1], "id");
    if (!id) continue;
    ways.set(
      id,
      [...match[2].matchAll(/<nd\b[^>]*ref="(\d+)"/g)].map((nd) => nd[1]),
    );
  }

  return ways;
}

/** Extracts the members of one relation element by id. */
function parseRelationMembers(xml, relationId) {
  const pattern = new RegExp(
    `<relation\\b[^>]*id="${relationId}"[^>]*>([\\s\\S]*?)<\\/relation>`,
  );
  const match = xml.match(pattern);
  if (!match) throw new Error(`relation ${relationId} not found in response`);

  return [...match[1].matchAll(/<member\b([^>]*?)\/?>/g)].map((member) => ({
    type: attr(member[1], "type"),
    ref: attr(member[1], "ref"),
    role: attr(member[1], "role") ?? "",
  }));
}

/** Joins way segments end-to-end, flipping where needed. */
function stitch(segments) {
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  const pending = [...segments];
  const lines = [];

  let current = pending.shift();
  while (current) {
    let extended = true;
    while (extended) {
      extended = false;
      for (let index = 0; index < pending.length; index += 1) {
        const segment = pending[index];
        const head = current[0];
        const tail = current[current.length - 1];
        const start = segment[0];
        const end = segment[segment.length - 1];

        // Route relations are not guaranteed to start at one end of the line,
        // so grow from whichever end matches.
        if (same(tail, start)) {
          current = current.concat(segment.slice(1));
        } else if (same(tail, end)) {
          current = current.concat([...segment].reverse().slice(1));
        } else if (same(head, end)) {
          current = segment.slice(0, -1).concat(current);
        } else if (same(head, start)) {
          current = [...segment].reverse().slice(0, -1).concat(current);
        } else {
          continue;
        }

        pending.splice(index, 1);
        extended = true;
        break;
      }
    }
    lines.push(current);
    current = pending.shift();
  }

  return lines;
}

/** Ramer–Douglas–Peucker on [lng, lat] pairs. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;

  const squaredDistance = (point, start, end) => {
    let x = start[0];
    let y = start[1];
    let dx = end[0] - x;
    let dy = end[1] - y;

    if (dx !== 0 || dy !== 0) {
      const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = end[0];
        y = end[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = point[0] - x;
    dy = point[1] - y;
    return dx * dx + dy * dy;
  };

  const maxDistance = tolerance * tolerance;
  const kept = [points[0]];

  const split = (first, last) => {
    let index = -1;
    let furthest = maxDistance;

    for (let i = first + 1; i < last; i += 1) {
      const distance = squaredDistance(points[i], points[first], points[last]);
      if (distance > furthest) {
        index = i;
        furthest = distance;
      }
    }

    if (index === -1) return;
    if (index - first > 1) split(first, index);
    kept.push(points[index]);
    if (last - index > 1) split(index, last);
  };

  split(0, points.length - 1);
  kept.push(points[points.length - 1]);
  return kept;
}

/**
 * Cleans up OSM stop names so they read the same across operators.
 *
 * Handles "KL Sentral (Monorail)", "KL Sentral (ERL) Departure" and KTM's
 * "KB13 Seremban" station codes.
 */
function normalizeStationName(name) {
  return name
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+(departure|arrival|berlepas|ketibaan)$/i, "")
    .replace(/^ERL\s+/i, "")
    .replace(/^[A-Z]{1,3}\d{1,3}\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

const round = (value) => Number(value.toFixed(6));

async function buildLine(line, stations) {
  const master = await fetchOsm(`relation/${line.id}/full`);
  const directions = parseRelationMembers(master, line.id).filter(
    (member) => member.type === "relation" && member.ref,
  );

  // A route_master holds one relation per direction and the geometry is the
  // same either way, so the first direction is enough. Commuter lines are
  // plain route relations with no children, so they are used directly.
  const directionId = directions.length > 0 ? directions[0].ref : line.id;
  const xml =
    directionId === line.id
      ? master
      : await (async () => {
          await sleep(400);
          return fetchOsm(`relation/${directionId}/full`);
        })();

  const nodes = parseNodes(xml);
  const ways = parseWays(xml);
  const members = parseRelationMembers(xml, directionId);

  const segments = [];
  for (const member of members) {
    if (member.type === "way") {
      const coordinates = (ways.get(member.ref) ?? [])
        .map((ref) => nodes.get(ref))
        .filter(Boolean)
        .map((node) => [node.lon, node.lat]);
      if (coordinates.length > 1) segments.push(coordinates);
    } else if (member.type === "node" && member.role === "stop") {
      const node = nodes.get(member.ref);
      if (!node?.name) continue;

      const name = normalizeStationName(node.name);
      const existing = stations.get(name);
      if (existing) {
        existing.refs.add(line.ref);
        existing.points.push([node.lon, node.lat]);
      } else {
        stations.set(name, {
          name,
          refs: new Set([line.ref]),
          points: [[node.lon, node.lat]],
        });
      }
    }
  }

  const tolerance =
    line.mode === "commuter" ? COMMUTER_TOLERANCE : TOLERANCE;

  const parts = stitch(segments)
    .sort((a, b) => b.length - a.length)
    .map((part) => simplify(part, tolerance))
    .map((part) => part.map(([lng, lat]) => [round(lng), round(lat)]));

  return {
    type: "Feature",
    properties: {
      name: line.name,
      ref: line.ref,
      colour: line.colour,
      network: line.network ?? "Rapid KL",
      mode: line.mode ?? "metro",
    },
    geometry:
      parts.length === 1
        ? { type: "LineString", coordinates: parts[0] }
        : { type: "MultiLineString", coordinates: parts },
  };
}

async function main() {
  const stations = new Map();
  const features = [];

  for (const line of LINES) {
    const feature = await buildLine(line, stations);
    const parts =
      feature.geometry.type === "LineString"
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;
    const points = parts.reduce((total, part) => total + part.length, 0);

    console.log(
      `${line.ref.padEnd(3)} ${line.name.padEnd(22)} ${String(points).padStart(4)} pts  ${parts.length} part(s)`,
    );

    features.push(feature);
    await sleep(500);
  }

  const stationList = [...stations.values()]
    .map((station) => {
      const [lat, lng] = station.points
        .reduce(([latSum, lngSum], [x, y]) => [latSum + y, lngSum + x], [0, 0])
        .map((sum) => sum / station.points.length);

      return {
        name: station.name,
        refs: [...station.refs],
        lat: round(lat),
        lng: round(lng),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  const payload = {
    $comment:
      "Generated by scripts/build-transit.mjs from OpenStreetMap. Do not edit by hand. Data © OpenStreetMap contributors (ODbL 1.0).",
    features,
    stations: stationList,
  };

  const json = `${JSON.stringify(payload)}\n`;
  writeFileSync(OUT_PATH, json);

  console.log(
    `\n${features.length} lines, ${stationList.length} stations, ${(
      Buffer.byteLength(json) / 1024
    ).toFixed(1)} KB -> src/content/transit-lines.json`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
