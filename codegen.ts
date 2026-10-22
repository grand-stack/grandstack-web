// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import type { CodegenConfig } from "@graphql-codegen/cli";

// Needs the server running (docker compose up in ../grandstack). Output is committed so a clone builds without it.
const config: CodegenConfig = {
  schema: process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", "!src/graphql/generated/**"],
  ignoreNoDocuments: false,
  generates: {
    "src/graphql/generated/": { preset: "client", presetConfig: { fragmentMasking: false } },
  },
};

export default config;
