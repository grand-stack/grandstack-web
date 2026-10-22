// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { describe, expect, it } from "vitest";
import { initials } from "./initials";

describe("initials", () => {
  it("uses the first and last word", () => {
    expect(initials("Tom Hanks")).toBe("TH");
    expect(initials("Andre the Giant")).toBe("AG");
  });
  it("handles single names and suffixes", () => {
    expect(initials("Cher")).toBe("C");
    expect(initials("Robert Downey Jr.")).toBe("RD");
    expect(initials("")).toBe("?");
  });
});
