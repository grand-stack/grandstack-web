// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { describe, expect, it } from "vitest";
import { hash } from "../lib/hash";
import { posterStyle } from "./Poster";

describe("poster", () => {
  it("is deterministic per title", () => {
    expect(posterStyle("Inception", "Sci-Fi")).toEqual(posterStyle("Inception", "Sci-Fi"));
    expect(hash("a")).not.toBe(hash("b"));
  });
  it("differs between titles", () => {
    expect(posterStyle("Inception", "Sci-Fi")).not.toEqual(posterStyle("Interstellar", "Sci-Fi"));
  });
});
