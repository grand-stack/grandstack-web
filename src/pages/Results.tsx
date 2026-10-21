import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import {
  DECADES, SORTS, activeCount, buildSort, buildWhere, emptyFilters, parseFilters, serializeFilters, type Filters, type SortKey,
} from "../lib/filters";
import { FilterSidebar, type Facets } from "../search/FilterSidebar";
import { MovieCard } from "../search/MovieCard";
import { Button, Chip, Skeleton } from "../ui";

const PAGE = 24;

const ResultsQuery = graphql(`
  query Results($where: MovieWhere, $genreWhere: MovieWhere, $decadeWhere: MovieWhere!, $sort: [MovieSort!], $limit: Int!) {
    movies(where: $where, sort: $sort, limit: $limit) {
      title
      released
      rating
      runtime
      genres { name }
    }
    moviesConnection(where: $where) { totalCount }
    genres(sort: [{ name: ASC }]) {
      name
      moviesConnection(where: { node: $genreWhere }) { totalCount }
    }
    d1940: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1940, lt: 1950 } }] }) { totalCount }
    d1950: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1950, lt: 1960 } }] }) { totalCount }
    d1960: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1960, lt: 1970 } }] }) { totalCount }
    d1970: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1970, lt: 1980 } }] }) { totalCount }
    d1980: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1980, lt: 1990 } }] }) { totalCount }
    d1990: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 1990, lt: 2000 } }] }) { totalCount }
    d2000: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2000, lt: 2010 } }] }) { totalCount }
    d2010: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2010, lt: 2020 } }] }) { totalCount }
    d2020: moviesConnection(where: { AND: [$decadeWhere, { released: { gte: 2020, lt: 2030 } }] }) { totalCount }
  }
`);

export function Results() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const [pages, setPages] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const update = (next: Partial<Filters>) => {
    setPages(1);
    setParams(serializeFilters({ ...filters, ...next }), { replace: true });
  };

  const [{ data, fetching, error, stale }] = useQuery({
    query: ResultsQuery,
    variables: {
      where: buildWhere(filters),
      genreWhere: buildWhere(filters, "genres"),
      decadeWhere: buildWhere(filters, "decades"),
      sort: buildSort(filters.sort),
      limit: pages * PAGE,
    },
  });

  const facets: Facets | undefined = data && {
    genres: data.genres.map((g) => ({ name: g.name, count: g.moviesConnection.totalCount })),
    decades: Object.fromEntries(DECADES.map((d) => [d, (data as unknown as Record<string, { totalCount: number }>)[`d${d}`].totalCount])),
  };
  const total = data?.moviesConnection.totalCount ?? 0;
  const count = activeCount(filters);

  return (
    <div className="results">
      <div className={`filters-wrap${showFilters ? " open" : ""}`}>
        <FilterSidebar filters={filters} facets={facets} onChange={update} />
      </div>

      <section className="results-main" aria-live="polite">
        <div className="results-bar">
          <h1 className="results-count">
            {data ? <>{total} {total === 1 ? "movie" : "movies"}</> : "Movies"}
            {stale && <span className="muted"> updating…</span>}
          </h1>
          <div className="results-controls">
            <Link to="/movies/new"><Button variant="primary" type="button">Add movie</Button></Link>
            <Button className="show-filters" onClick={() => setShowFilters((s) => !s)}>Filters{count ? ` (${count})` : ""}</Button>
            <label className="sort">
              Sort
              <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortKey })}>
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
            <div className="view-toggle" role="group" aria-label="View">
              <Button variant={view === "grid" ? "primary" : "secondary"} onClick={() => setView("grid")} aria-pressed={view === "grid"}>Grid</Button>
              <Button variant={view === "list" ? "primary" : "secondary"} onClick={() => setView("list")} aria-pressed={view === "list"}>List</Button>
            </div>
          </div>
        </div>

        {count > 0 && (
          <div className="chips" aria-label="Active filters">
            {filters.q && <Chip onRemove={() => update({ q: "" })}>{`"${filters.q}"`}</Chip>}
            {filters.genres.map((g) => <Chip key={g} onRemove={() => update({ genres: filters.genres.filter((x) => x !== g) })}>{g}</Chip>)}
            {filters.decades.map((d) => <Chip key={d} onRemove={() => update({ decades: filters.decades.filter((x) => x !== d) })}>{`${d}s`}</Chip>)}
            {filters.minRating !== undefined && <Chip onRemove={() => update({ minRating: undefined })}>{`★ ${filters.minRating}+`}</Chip>}
            {filters.maxRuntime !== undefined && <Chip onRemove={() => update({ maxRuntime: undefined })}>{`≤ ${filters.maxRuntime} min`}</Chip>}
            {filters.person && <Chip onRemove={() => update({ person: undefined })}>{filters.person}</Chip>}
            <Button variant="ghost" onClick={() => update({ ...emptyFilters, sort: filters.sort })}>Clear all</Button>
          </div>
        )}

        {error && <p className="error">{error.message}</p>}

        {!data && fetching && (
          <div className="grid">{Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="skeleton-card" />)}</div>
        )}

        {data && total === 0 && (
          <div className="empty">
            <h2>No movies match</h2>
            <p>Try removing a filter.</p>
            <Button variant="primary" onClick={() => update({ ...emptyFilters, sort: filters.sort })}>Clear all filters</Button>
          </div>
        )}

        {data && total > 0 && (
          <div className={view === "grid" ? "grid" : "list"}>
            {data.movies.map((m, i) => <MovieCard key={m.title} movie={m} view={view} index={i} />)}
          </div>
        )}

        {data && data.movies.length < total && (
          <div className="more"><Button onClick={() => setPages((p) => p + 1)}>Show more ({total - data.movies.length} left)</Button></div>
        )}
      </section>
    </div>
  );
}
