import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import {
  PEOPLE_SORTS, activePeopleCount, buildPeopleSort, buildPeopleWhere, emptyPeopleFilters, parsePeopleFilters,
  serializePeopleFilters, type PeopleFilters, type PeopleSort, type Role,
} from "../lib/peopleFilters";
import { PersonCard } from "../search/PersonCard";
import { Button, Chip, Skeleton } from "../ui";

const PAGE = 36;

const PeopleBrowseQuery = graphql(`
  query PeopleBrowse($where: PersonWhere, $roleWhere: PersonWhere!, $sort: [PersonSort!], $limit: Int!) {
    people(where: $where, sort: $sort, limit: $limit) {
      name
      born
      actedCount
      directedCount
    }
    peopleConnection(where: $where) { totalCount }
    anyRole: peopleConnection(where: $roleWhere) { totalCount }
    actors: peopleConnection(where: { AND: [$roleWhere, { actedCount: { gt: 0 } }] }) { totalCount }
    directors: peopleConnection(where: { AND: [$roleWhere, { directedCount: { gt: 0 } }] }) { totalCount }
  }
`);

const ROLES: { key: Role; label: string }[] = [
  { key: "any", label: "Everyone" }, { key: "actor", label: "Actors" }, { key: "director", label: "Directors" },
];

export function People() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parsePeopleFilters(params), [params]);
  const [pages, setPages] = useState(1);
  // The search box keeps its own text so fast typing is never overwritten by the (async) URL update
  const [text, setText] = useState(filters.q);

  const update = (next: Partial<PeopleFilters>) => {
    setPages(1);
    setParams(serializePeopleFilters({ ...filters, ...next }), { replace: true });
  };

  useEffect(() => {
    if (text === filters.q) return;
    const t = setTimeout(() => update({ q: text }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  useEffect(() => { setText(filters.q); }, [filters.q]);

  const [{ data, fetching, error, stale }] = useQuery({
    query: PeopleBrowseQuery,
    variables: {
      where: buildPeopleWhere(filters),
      roleWhere: buildPeopleWhere(filters, true),
      sort: buildPeopleSort(filters),
      limit: pages * PAGE,
    },
  });

  const counts: Record<Role, number | undefined> = {
    any: data?.anyRole.totalCount, actor: data?.actors.totalCount, director: data?.directors.totalCount,
  };
  const total = data?.peopleConnection.totalCount ?? 0;
  const active = activePeopleCount(filters);

  return (
    <div className="people-page">
      <div className="results-bar">
        <h1 className="results-count">
          {data ? <>{total} {total === 1 ? "person" : "people"}</> : "People"}
          {stale && <span className="muted"> updating…</span>}
        </h1>
        <div className="results-controls">
          <input
            className="text-input people-search" placeholder="Search by name…" aria-label="Search people by name"
            value={text} onChange={(e) => setText(e.target.value)}
          />
          <Link to="/people/new"><Button variant="primary" type="button">Add person</Button></Link>
          <label className="sort">
            Min films
            <select value={filters.minFilms ?? ""} onChange={(e) => update({ minFilms: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">Any</option>
              {[2, 3, 5, 8].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </label>
          <label className="sort">
            Sort
            <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as PeopleSort })}>
              {PEOPLE_SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="chips" role="group" aria-label="Role">
        {ROLES.map((r) => (
          <Chip key={r.key} active={filters.role === r.key} onClick={() => update({ role: r.key })}>
            {r.label}{counts[r.key] !== undefined ? ` · ${counts[r.key]}` : ""}
          </Chip>
        ))}
        {active > 0 && <Button variant="ghost" onClick={() => update({ ...emptyPeopleFilters, sort: filters.sort })}>Clear all</Button>}
      </div>

      {error && <p className="error">{error.message}</p>}
      {!data && fetching && <div className="people-grid">{Array.from({ length: 12 }, (_, i) => <Skeleton key={i} className="skeleton-person" />)}</div>}
      {data && total === 0 && (
        <div className="empty"><h2>No one matches</h2><p>Try removing a filter.</p>
          <Button variant="primary" onClick={() => update({ ...emptyPeopleFilters, sort: filters.sort })}>Clear all filters</Button></div>
      )}
      {data && total > 0 && (
        <div className="people-grid">{data.people.map((p, i) => <PersonCard key={p.name} person={p} index={i} />)}</div>
      )}
      {data && data.people.length < total && (
        <div className="more"><Button onClick={() => setPages((p) => p + 1)}>Show more ({total - data.people.length} left)</Button></div>
      )}
    </div>
  );
}
