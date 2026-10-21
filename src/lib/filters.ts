import type { MovieSort, MovieWhere } from "../graphql/generated/graphql";

export type SortKey = "rating" | "newest" | "oldest" | "title" | "runtime";

export interface Filters {
  q: string;
  genres: string[];
  decades: number[];
  minRating?: number;
  maxRuntime?: number;
  person?: string;
  sort: SortKey;
}

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Highest rated" },
  { key: "newest", label: "Newest first" },
  { key: "oldest", label: "Oldest first" },
  { key: "title", label: "Title A to Z" },
  { key: "runtime", label: "Shortest first" },
];

export const DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

const num = (v: string | null): number | undefined => {
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export function parseFilters(params: URLSearchParams): Filters {
  const sort = params.get("s") as SortKey | null;
  return {
    q: params.get("q") ?? "",
    genres: params.get("g")?.split(",").filter(Boolean) ?? [],
    decades: params.get("d")?.split(",").map(Number).filter(Number.isFinite) ?? [],
    minRating: num(params.get("r")),
    maxRuntime: num(params.get("rt")),
    person: params.get("p") ?? undefined,
    sort: SORTS.some((s) => s.key === sort) ? (sort as SortKey) : "rating",
  };
}

export function serializeFilters(f: Filters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.genres.length) p.set("g", f.genres.join(","));
  if (f.decades.length) p.set("d", f.decades.join(","));
  if (f.minRating !== undefined) p.set("r", String(f.minRating));
  if (f.maxRuntime !== undefined) p.set("rt", String(f.maxRuntime));
  if (f.person) p.set("p", f.person);
  if (f.sort !== "rating") p.set("s", f.sort);
  return p;
}

export const emptyFilters: Filters = {
  q: "", genres: [], decades: [], minRating: undefined, maxRuntime: undefined, person: undefined, sort: "rating",
};

export function activeCount(f: Filters): number {
  return (f.q ? 1 : 0) + f.genres.length + f.decades.length + (f.minRating !== undefined ? 1 : 0) +
    (f.maxRuntime !== undefined ? 1 : 0) + (f.person ? 1 : 0);
}

/** Title search is case-sensitive in the API, so match as typed and in Title Case. */
export function titleVariants(q: string): string[] {
  const titled = q.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return [...new Set([q, titled, q.toLowerCase()])];
}

/** Builds the MovieWhere for the filters. `omit` leaves one facet out, for counting that facet's own options. */
export function buildWhere(f: Filters, omit?: "genres" | "decades"): MovieWhere {
  const and: MovieWhere[] = [];
  if (f.q.trim()) and.push({ OR: titleVariants(f.q.trim()).map((v) => ({ title: { contains: v } })) });
  if (omit !== "genres" && f.genres.length) and.push({ genres: { some: { name: { in: f.genres } } } });
  if (omit !== "decades" && f.decades.length) {
    and.push({ OR: f.decades.map((d) => ({ released: { gte: d, lt: d + 10 } })) });
  }
  if (f.minRating !== undefined) and.push({ rating: { gte: f.minRating } });
  if (f.maxRuntime !== undefined) and.push({ runtime: { lte: f.maxRuntime } });
  if (f.person) {
    and.push({
      OR: [{ actors: { some: { name: { eq: f.person } } } }, { directors: { some: { name: { eq: f.person } } } }],
    });
  }
  return and.length ? { AND: and } : {};
}

export function buildSort(key: SortKey): MovieSort[] {
  switch (key) {
    case "rating": return [{ rating: "DESC" }, { title: "ASC" }];
    case "newest": return [{ released: "DESC" }, { title: "ASC" }];
    case "oldest": return [{ released: "ASC" }, { title: "ASC" }];
    case "title": return [{ title: "ASC" }];
    case "runtime": return [{ runtime: "ASC" }, { title: "ASC" }];
  }
}

export function formatRuntime(minutes?: number | null): string {
  if (!minutes) return "";
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
}
