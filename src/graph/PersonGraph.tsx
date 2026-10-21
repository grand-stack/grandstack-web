import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GraphView, type GLink, type GNode } from "./GraphView";

export interface PersonGraphInput {
  name: string;
  acted: string[];
  directed: string[];
  collaborators: { name: string; films: number }[];
}

export function PersonGraph({ input }: { input: PersonGraphInput }) {
  const navigate = useNavigate();
  const data = useMemo(() => {
    const centerId = `p:${input.name}`;
    const nodes: GNode[] = [{ id: centerId, label: input.name, kind: "person" }];
    const links: GLink[] = [];
    const film = (title: string, label: string) => {
      const id = `m:${title}`;
      if (!nodes.some((n) => n.id === id)) nodes.push({ id, label: title, kind: "movie" });
      links.push({ source: centerId, target: id, label });
    };
    input.acted.slice(0, 12).forEach((t) => film(t, "ACTED_IN"));
    input.directed.slice(0, 12).forEach((t) => film(t, "DIRECTED"));
    input.collaborators.slice(0, 6).forEach((c) => {
      const id = `c:${c.name}`;
      nodes.push({ id, label: c.name, kind: "collaborator" });
      links.push({ source: centerId, target: id, label: `${c.films} shared ${c.films === 1 ? "film" : "films"}` });
    });
    return { nodes, links, centerId };
  }, [input]);

  return (
    <GraphView
      nodes={data.nodes}
      links={data.links}
      centerId={data.centerId}
      legend={["person", "movie", "collaborator"]}
      hint="Click a film or collaborator to open it. Collaborators are ranked by shared films."
      onNodeClick={(n) => {
        if (n.kind === "movie") navigate(`/movies/${encodeURIComponent(n.label)}`);
        else if (n.kind === "collaborator") navigate(`/people/${encodeURIComponent(n.label)}`);
      }}
    />
  );
}
