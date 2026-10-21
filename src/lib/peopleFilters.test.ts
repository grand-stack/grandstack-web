import { describe, expect, it } from "vitest";
import {
  buildPeopleSort, buildPeopleWhere, emptyPeopleFilters, parsePeopleFilters, serializePeopleFilters,
} from "./peopleFilters";

describe("people filters", () => {
  it("round-trips through the URL", () => {
    const f = parsePeopleFilters(new URLSearchParams("q=han&role=director&mf=3&s=name"));
    expect(f).toEqual({ q: "han", role: "director", minFilms: 3, sort: "name" });
    expect(parsePeopleFilters(serializePeopleFilters(f))).toEqual(f);
  });
  it("ignores bad input", () => {
    expect(parsePeopleFilters(new URLSearchParams("role=x&mf=-2&s=zzz"))).toEqual(emptyPeopleFilters);
  });
  it("builds role filters and omits the role when counting roles", () => {
    const f = { ...emptyPeopleFilters, role: "actor" as const };
    expect(JSON.stringify(buildPeopleWhere(f))).toContain("actedCount");
    expect(buildPeopleWhere(f, true)).toEqual({});
    expect(buildPeopleWhere(emptyPeopleFilters)).toEqual({});
  });
  it("sorts directors by directed count first", () => {
    expect(buildPeopleSort({ ...emptyPeopleFilters, role: "director" })[0]).toEqual({ directedCount: "DESC" });
    expect(buildPeopleSort({ ...emptyPeopleFilters, sort: "name" })).toEqual([{ name: "ASC" }]);
  });
});
