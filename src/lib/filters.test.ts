// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { describe, expect, it } from "vitest";
import { buildWhere, emptyFilters, parseFilters, serializeFilters, titleVariants } from "./filters";

describe("filters", () => {
  it("round-trips through the URL", () => {
    const f = parseFilters(new URLSearchParams("q=mat&g=Drama,Crime&d=1990,2000&r=8&rt=150&p=Tom+Hanks&s=newest"));
    expect(f).toMatchObject({ q: "mat", genres: ["Drama", "Crime"], decades: [1990, 2000], minRating: 8, maxRuntime: 150, person: "Tom Hanks", sort: "newest" });
    expect(parseFilters(serializeFilters(f))).toEqual(f);
  });
  it("ignores bad input", () => {
    expect(parseFilters(new URLSearchParams("r=abc&s=bogus&d=x"))).toMatchObject({ minRating: undefined, sort: "rating", decades: [] });
  });
  it("clearing resets every filter", () => {
    const f = { ...parseFilters(new URLSearchParams("g=Drama&r=8&rt=100&p=A")), ...emptyFilters };
    expect(serializeFilters(f).toString()).toBe("");
  });
  it("omits one facet when counting it", () => {
    const f = parseFilters(new URLSearchParams("g=Drama&d=1990"));
    expect(JSON.stringify(buildWhere(f, "genres"))).not.toContain("Drama");
    expect(JSON.stringify(buildWhere(f, "decades"))).not.toContain("1990");
    expect(buildWhere(emptyFilters)).toEqual({});
  });
  it("makes case variants for the case-sensitive title search", () => {
    expect(titleVariants("the matrix")).toEqual(["the matrix", "The Matrix"]);
  });
});
