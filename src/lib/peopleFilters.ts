// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import type { PersonSort, PersonWhere } from "../graphql/generated/graphql";
import { titleVariants } from "./filters";

export type PeopleSort = "films" | "name";
export type Role = "any" | "actor" | "director";

export interface PeopleFilters {
  q: string;
  role: Role;
  minFilms?: number;
  sort: PeopleSort;
}

export const emptyPeopleFilters: PeopleFilters = { q: "", role: "any", minFilms: undefined, sort: "films" };

export const PEOPLE_SORTS: { key: PeopleSort; label: string }[] = [
  { key: "films", label: "Most films" },
  { key: "name", label: "Name A to Z" },
];

export function parsePeopleFilters(params: URLSearchParams): PeopleFilters {
  const role = params.get("role");
  const sort = params.get("s");
  const min = Number(params.get("mf"));
  return {
    q: params.get("q") ?? "",
    role: role === "actor" || role === "director" ? role : "any",
    minFilms: params.get("mf") && Number.isInteger(min) && min > 0 ? min : undefined,
    sort: sort === "name" ? "name" : "films",
  };
}

export function serializePeopleFilters(f: PeopleFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.role !== "any") p.set("role", f.role);
  if (f.minFilms !== undefined) p.set("mf", String(f.minFilms));
  if (f.sort !== "films") p.set("s", f.sort);
  return p;
}

export function activePeopleCount(f: PeopleFilters): number {
  return (f.q ? 1 : 0) + (f.role !== "any" ? 1 : 0) + (f.minFilms !== undefined ? 1 : 0);
}

/** Where clause for the filters. Pass `omitRole` to count each role's own options. */
export function buildPeopleWhere(f: PeopleFilters, omitRole = false): PersonWhere {
  const and: PersonWhere[] = [];
  if (f.q.trim()) and.push({ OR: titleVariants(f.q.trim()).map((v) => ({ name: { contains: v } })) });
  if (!omitRole && f.role === "actor") and.push({ actedCount: { gt: 0 } });
  if (!omitRole && f.role === "director") and.push({ directedCount: { gt: 0 } });
  if (f.minFilms !== undefined) {
    const field = !omitRole && f.role === "director" ? "directedCount" : "actedCount";
    and.push(omitRole || f.role === "any"
      ? { OR: [{ actedCount: { gte: f.minFilms } }, { directedCount: { gte: f.minFilms } }] }
      : { [field]: { gte: f.minFilms } });
  }
  return and.length ? { AND: and } : {};
}

export function buildPeopleSort(f: PeopleFilters): PersonSort[] {
  if (f.sort === "name") return [{ name: "ASC" }];
  return f.role === "director"
    ? [{ directedCount: "DESC" }, { actedCount: "DESC" }, { name: "ASC" }]
    : [{ actedCount: "DESC" }, { directedCount: "DESC" }, { name: "ASC" }];
}
