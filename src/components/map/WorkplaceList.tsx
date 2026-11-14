"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Search, X } from "lucide-react";
import { matchesQuery, workplaceMeta, type Workplace } from "@/lib/workplaces";

type WorkplaceListProps = {
  workplaces: Workplace[];
  activeId: string | null;
  onSelect: (workplace: Workplace) => void;
};

export default function WorkplaceList({
  workplaces,
  activeId,
  onSelect,
}: WorkplaceListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => workplaces.filter((workplace) => matchesQuery(workplace, query)),
    [workplaces, query],
  );

  return (
    <section className="glass-panel p-5 md:p-6" aria-label="Company list">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="workplace-search" className="sr-only">
          Search companies
        </label>
        <input
          id="workplace-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search company, branch, role, or area…"
          autoComplete="off"
          className="w-full rounded-xl border border-[var(--glass-border)] bg-white/[0.04] py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/40 focus:bg-white/[0.06]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p
        className="mt-3 text-[11px] text-muted-foreground"
        style={{ fontFamily: "var(--font-jetbrains)" }}
        aria-live="polite"
      >
        {filtered.length} of {workplaces.length}{" "}
        {workplaces.length === 1 ? "company" : "companies"}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-2">
          {filtered.map((workplace) => {
            const active = workplace.id === activeId;
            const meta = workplaceMeta(workplace);

            return (
              <li
                key={workplace.id}
                className="border-t border-white/[0.06] first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => onSelect(workplace)}
                  aria-current={active ? "true" : undefined}
                  className={`group flex w-full items-start justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors ${
                    active ? "bg-accent/10" : "hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          active
                            ? "bg-accent"
                            : "bg-muted-foreground/50 group-hover:bg-accent"
                        }`}
                      />
                      <span className="truncate text-sm font-medium text-foreground">
                        {workplace.company}
                      </span>
                      {workplace.verified && (
                        <span
                          title="Location checked"
                          className="inline-flex shrink-0 items-center text-accent"
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Location checked</span>
                        </span>
                      )}
                    </span>
                    {meta && (
                      <span className="mt-0.5 block pl-3.5 text-xs text-muted-foreground">
                        {meta}
                      </span>
                    )}
                    {workplace.note && (
                      <span className="mt-1 block pl-3.5 text-xs text-muted-foreground/80">
                        {workplace.note}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 rounded-full border border-[var(--glass-border)] px-2 py-0.5 text-[10px] text-muted-foreground">
                    {workplace.area}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[var(--glass-border)] px-4 py-8 text-center">
          <p className="text-sm text-foreground">
            No companies match &ldquo;{query.trim()}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 text-xs text-accent hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
