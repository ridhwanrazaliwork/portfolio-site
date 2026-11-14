export type Workplace = {
  id: string;
  company: string;
  /** Optional branch/office label, e.g. "KL Sentral". */
  branch?: string;
  /** Optional role title. */
  role?: string;
  /** Optional public note, e.g. commute hints. */
  note?: string;
  /** City/state label shown in the list and popup. */
  area: string;
  /** True once the pin has been checked by hand against the real building. */
  verified?: boolean;
  lat: number;
  lng: number;
};

export type Building = {
  key: string;
  lat: number;
  lng: number;
  workplaces: Workplace[];
  companies: string[];
};

/** Groups nearby entries (same coordinates, ~1 m precision) into one pin. */
export function buildingKey(lat: number, lng: number): string {
  return `${lat.toFixed(5)},${lng.toFixed(5)}`;
}

export function groupByBuilding(items: readonly Workplace[]): Building[] {
  const groups = new Map<string, Building>();

  for (const item of items) {
    const key = buildingKey(item.lat, item.lng);
    const existing = groups.get(key);

    if (existing) {
      existing.workplaces.push(item);
      if (!existing.companies.includes(item.company)) {
        existing.companies.push(item.company);
      }
    } else {
      groups.set(key, {
        key,
        lat: item.lat,
        lng: item.lng,
        workplaces: [item],
        companies: [item.company],
      });
    }
  }

  return [...groups.values()].sort((a, b) =>
    a.companies[0].localeCompare(b.companies[0]),
  );
}

export function sortWorkplaces(items: readonly Workplace[]): Workplace[] {
  return [...items].sort(
    (a, b) =>
      a.company.localeCompare(b.company) ||
      (a.branch ?? "").localeCompare(b.branch ?? ""),
  );
}

export function matchesQuery(workplace: Workplace, query: string): boolean {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    workplace.company,
    workplace.branch,
    workplace.role,
    workplace.area,
    workplace.note,
  ]
    .filter((part): part is string => Boolean(part))
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => haystack.includes(token));
}

/** "Branch · Role", skipping whichever part is missing. */
export function workplaceMeta(workplace: Workplace): string {
  return [workplace.branch, workplace.role]
    .filter((part): part is string => Boolean(part))
    .join(" · ");
}
