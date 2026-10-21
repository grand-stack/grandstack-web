import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import { DECADES, type Filters } from "../lib/filters";
import { Checkbox } from "../ui";

const PeopleQuery = graphql(`
  query People($search: String!) {
    people(where: { name: { contains: $search } }, limit: 6, sort: [{ name: ASC }]) {
      name
    }
  }
`);

export interface Facets {
  genres: { name: string; count: number }[];
  decades: Record<number, number>;
}

interface Props {
  filters: Filters;
  facets?: Facets;
  onChange: (next: Partial<Filters>) => void;
}

export function FilterSidebar({ filters, facets, onChange }: Props) {
  const [personSearch, setPersonSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(personSearch.trim()), 250);
    return () => clearTimeout(t);
  }, [personSearch]);
  const [{ data: people }] = useQuery({ query: PeopleQuery, variables: { search: debounced }, pause: debounced.length < 2 });

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <aside className="filters" aria-label="Filters">
      <section>
        <h3>Genre</h3>
        <div className="facet-list">
          {(facets?.genres ?? []).map((g) => (
            <Checkbox
              key={g.name}
              label={g.name}
              count={g.count}
              checked={filters.genres.includes(g.name)}
              disabled={g.count === 0 && !filters.genres.includes(g.name)}
              onChange={() => onChange({ genres: toggle(filters.genres, g.name) })}
            />
          ))}
        </div>
      </section>

      <section>
        <h3>Decade</h3>
        <div className="facet-list">
          {DECADES.map((d) => {
            const count = facets?.decades[d];
            return (
              <Checkbox
                key={d}
                label={`${d}s`}
                count={count}
                checked={filters.decades.includes(d)}
                disabled={count === 0 && !filters.decades.includes(d)}
                onChange={() => onChange({ decades: toggle(filters.decades, d) })}
              />
            );
          })}
        </div>
      </section>

      <section>
        <h3>Minimum rating <output>{filters.minRating !== undefined ? `★ ${filters.minRating.toFixed(1)}` : "Any"}</output></h3>
        <input
          type="range" min={5} max={9.5} step={0.5}
          value={filters.minRating ?? 5}
          aria-label="Minimum rating"
          onChange={(e) => onChange({ minRating: Number(e.target.value) <= 5 ? undefined : Number(e.target.value) })}
        />
      </section>

      <section>
        <h3>Maximum runtime <output>{filters.maxRuntime !== undefined ? `${filters.maxRuntime} min` : "Any"}</output></h3>
        <input
          type="range" min={80} max={210} step={10}
          value={filters.maxRuntime ?? 210}
          aria-label="Maximum runtime in minutes"
          onChange={(e) => onChange({ maxRuntime: Number(e.target.value) >= 210 ? undefined : Number(e.target.value) })}
        />
      </section>

      <section>
        <h3>Cast or director</h3>
        <input
          className="text-input" placeholder="Search a person…" value={personSearch}
          onChange={(e) => setPersonSearch(e.target.value)}
          aria-label="Search for a cast member or director"
        />
        {people && debounced.length >= 2 && personSearch.trim() === debounced && (
          <ul className="suggest">
            {people.people.map((p) => (
              <li key={p.name}>
                <button type="button" onClick={() => { onChange({ person: p.name }); setPersonSearch(""); }}>{p.name}</button>
              </li>
            ))}
            {people.people.length === 0 && <li className="muted">No one found</li>}
          </ul>
        )}
      </section>
    </aside>
  );
}
