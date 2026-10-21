import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GraphView, type GLink, type GNode } from "./GraphView";

export interface GraphInput {
  title: string;
  directors: string[];
  cast: { name: string; role: string }[];
  genres: string[];
}

export function MovieGraph({ input }: { input: GraphInput }) {
  const navigate = useNavigate();
  const data = useMemo(() => {
    const nodes: GNode[] = [{ id: `m:${input.title}`, label: input.title, kind: "movie" }];
    const links: GLink[] = [];
    const add = (kind: GNode["kind"], name: string, label: string) => {
      const id = `${kind}:${name}`;
      if (!nodes.some((n) => n.id === id)) nodes.push({ id, label: name, kind });
      links.push({ source: id, target: nodes[0].id, label });
    };
    input.directors.forEach((d) => add("director", d, "DIRECTED"));
    input.cast.slice(0, 10).forEach((c) => add("actor", c.name, `ACTED_IN as ${c.role}`));
    input.genres.forEach((g) => add("genre", g, "IN_GENRE"));
    return { nodes, links };
  }, [input]);

  return (
    <GraphView
      {...data}
      centerId={data.nodes[0].id}
      legend={["movie", "director", "actor", "genre"]}
      hint="Click a person to open their page, or a genre to filter movies. Edges are the relationships stored in Neo4j."
      onNodeClick={(n) => {
        if (n.kind === "genre") navigate(`/movies?g=${encodeURIComponent(n.label)}`);
        else if (n.kind === "director" || n.kind === "actor") navigate(`/people/${encodeURIComponent(n.label)}`);
      }}
    />
  );
}
