// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { describe, expect, it } from "vitest";
import {
  buildCreateInput, buildUpdateInput, emptyMovieForm, friendlyError, isEmptyUpdate, parseRoles, validateMovie, validatePerson,
  type MovieFormState,
} from "./model";

const base: MovieFormState = {
  ...emptyMovieForm, title: "Film", released: "2000",
  genres: ["Drama"],
  directors: [{ name: "Dir One", isNew: false }],
  cast: [{ name: "Actor A", isNew: false, role: "Hero" }, { name: "Actor B", isNew: false, role: "Zed; Dr. Y" }],
};

describe("validation", () => {
  it("requires a title and checks numbers", () => {
    expect(validateMovie(emptyMovieForm)).toEqual({ title: "Title is required" });
    const e = validateMovie({ ...base, released: "1700", rating: "11", runtime: "0" });
    expect(Object.keys(e).sort()).toEqual(["rating", "released", "runtime"]);
    expect(validateMovie({ ...base, released: "20.5" }).released).toMatch(/whole/);
  });
  it("rejects a duplicated cast member", () => {
    const dup = { ...base, cast: [base.cast[0], { ...base.cast[0], role: "Other" }] };
    expect(validateMovie(dup).cast).toBeDefined();
  });
  it("validates people", () => {
    expect(validatePerson({ name: " ", born: "" }).name).toBeDefined();
    expect(validatePerson({ name: "A", born: "1700" }).born).toBeDefined();
    expect(validatePerson({ name: "A", born: "1970" })).toEqual({});
  });
  it("parses semicolon separated roles", () => {
    expect(parseRoles("Zachry; Dr. Henry Goose; ")).toEqual(["Zachry", "Dr. Henry Goose"]);
    expect(parseRoles("")).toEqual([]);
  });
});

describe("buildCreateInput", () => {
  it("connects existing and creates new people and genres, with roles on edges", () => {
    const state: MovieFormState = {
      ...base, genres: ["Drama", "Brand New"],
      directors: [{ name: "Dir One", isNew: false }, { name: "Newbie Dir", isNew: true }],
      cast: [{ name: "Actor A", isNew: false, role: "Hero" }, { name: "Fresh Face", isNew: true, role: "Villain; Boss" }],
    };
    const input = buildCreateInput(state, ["Drama", "Comedy"]);
    expect(input.genres).toEqual({
      connect: [{ where: { node: { name: { eq: "Drama" } } } }],
      create: [{ node: { name: "Brand New" } }],
    });
    expect(input.directors).toEqual({
      connect: [{ where: { node: { name: { eq: "Dir One" } } } }],
      create: [{ node: { name: "Newbie Dir" } }],
    });
    expect(input.actors).toEqual({
      connect: [{ where: { node: { name: { eq: "Actor A" } } }, edge: { roles: ["Hero"] } }],
      create: [{ node: { name: "Fresh Face" }, edge: { roles: ["Villain", "Boss"] } }],
    });
    expect(input.released).toBe(2000);
  });
  it("omits empty fields and relationship groups", () => {
    const input = buildCreateInput({ ...emptyMovieForm, title: "  Solo " }, []);
    expect(input).toEqual({ title: "Solo" });
  });
});

describe("buildUpdateInput", () => {
  it("is empty when nothing changed", () => {
    expect(isEmptyUpdate(buildUpdateInput(base, structuredClone(base), ["Drama"]))).toBe(true);
  });
  it("sets changed scalars and clears blanked ones", () => {
    const u = buildUpdateInput({ ...base, tagline: "old" }, { ...base, tagline: "", title: "Film 2", rating: "7.5" }, ["Drama"]);
    expect(u).toEqual({ title: { set: "Film 2" }, tagline: { set: null }, rating: { set: 7.5 } });
  });
  it("sends a diff for cast: removals, additions and role changes, never disconnect-all", () => {
    const after: MovieFormState = {
      ...base,
      cast: [
        { name: "Actor A", isNew: false, role: "Hero Reborn" },
        { name: "Newbie", isNew: true, role: "Extra" },
        { name: "Old Friend", isNew: false, role: "Cameo" },
      ],
    };
    const u = buildUpdateInput(base, after, ["Drama"]);
    expect(u.actors).toEqual([
      {
        disconnect: [{ where: { node: { name: { in: ["Actor B"] } } } }],
        connect: [{ where: { node: { name: { eq: "Old Friend" } } }, edge: { roles: ["Cameo"] } }],
        create: [{ node: { name: "Newbie" }, edge: { roles: ["Extra"] } }],
      },
      { update: { where: { node: { name: { eq: "Actor A" } } }, edge: { roles: { set: ["Hero Reborn"] } } } },
    ]);
    expect(JSON.stringify(u)).not.toContain('"where":{}');
  });
  it("diffs genres and directors", () => {
    const after: MovieFormState = { ...base, genres: ["Comedy", "Fresh"], directors: [{ name: "Dir Two", isNew: true }] };
    const u = buildUpdateInput(base, after, ["Drama", "Comedy"]);
    expect(u.genres).toEqual([{
      disconnect: [{ where: { node: { name: { in: ["Drama"] } } } }],
      connect: [{ where: { node: { name: { eq: "Comedy" } } } }],
      create: [{ node: { name: "Fresh" } }],
    }]);
    expect(u.directors).toEqual([{
      disconnect: [{ where: { node: { name: { in: ["Dir One"] } } } }],
      create: [{ node: { name: "Dir Two" } }],
    }]);
  });
});

describe("friendlyError", () => {
  it("explains uniqueness and network failures", () => {
    expect(friendlyError("[GraphQL] Constraint validation failed", "That movie")).toMatch(/already exists/);
    expect(friendlyError("[Network] Failed to fetch", "x")).toMatch(/Could not reach/);
    expect(friendlyError("[GraphQL] Something else", "x")).toBe("Something else");
  });
});
