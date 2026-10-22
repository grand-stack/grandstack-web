// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

export type NodeKind = "movie" | "director" | "actor" | "genre" | "person" | "collaborator";

export interface GNode { id: string; label: string; kind: NodeKind; x?: number; y?: number }
export interface GLink { source: string; target: string; label: string }

const COLORS: Record<NodeKind, string> = {
  movie: "#5db3f0", director: "#ffc857", actor: "#3ddbb0", genre: "#c39bff", person: "#ff8fb1", collaborator: "#3ddbb0",
};
const LABELS: Record<NodeKind, string> = {
  movie: "Movie", director: "Director", actor: "Cast", genre: "Genre", person: "Person", collaborator: "Collaborator",
};

interface GraphApi {
  d3Force: (name: string) => { strength?: (v: number) => unknown; distance?: (v: number) => unknown } | undefined;
  zoomToFit: (ms: number, padding: number) => void;
}

interface Props {
  nodes: GNode[];
  links: GLink[];
  /** Node kinds to show in the legend, in order. */
  legend: NodeKind[];
  hint: string;
  onNodeClick: (node: GNode) => void;
  /** Id of the node drawn larger, in the centre. */
  centerId: string;
}

/** Shared force-directed graph used by the movie and person pages. Renders Neo4j relationships as edges. */
export function GraphView({ nodes, links, legend, hint, onNodeClick, centerId }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const graph = useRef<GraphApi | null>(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const configure = (api: GraphApi | null) => {
    graph.current = api;
    api?.d3Force("charge")?.strength?.(-260);
    api?.d3Force("link")?.distance?.(90);
  };

  return (
    <div className="graph" ref={box}>
      <Suspense fallback={<div className="graph-loading">Loading graph…</div>}>
        <ForceGraph2D
          ref={configure as never}
          onEngineStop={() => graph.current?.zoomToFit(400, 100)}
          graphData={{ nodes, links }}
          width={width}
          height={460}
          backgroundColor="rgba(0,0,0,0)"
          cooldownTicks={120}
          nodeRelSize={6}
          linkColor={() => "rgba(155,176,196,0.35)"}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={0.9}
          linkLabel={(l) => (l as unknown as GLink).label}
          nodeLabel={(n) => (n as GNode).label}
          nodeCanvasObject={(raw, ctx, scale) => {
            const node = raw as GNode;
            const r = node.id === centerId ? 9 : 6;
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = COLORS[node.kind];
            ctx.fill();
            ctx.font = `${12 / scale}px "Public Sans Variable", sans-serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim() || "#fff";
            ctx.fillText(node.label, node.x ?? 0, (node.y ?? 0) + r + 10 / scale);
          }}
          nodePointerAreaPaint={(raw, color, ctx) => {
            const node = raw as GNode;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, 10, 0, 2 * Math.PI);
            ctx.fill();
          }}
          onNodeClick={(raw) => onNodeClick(raw as GNode)}
        />
      </Suspense>
      <ul className="legend" aria-label="Graph legend">
        {legend.map((k) => <li key={k}><span className="dot" style={{ background: COLORS[k] }} />{LABELS[k]}</li>)}
      </ul>
      <p className="muted graph-hint">{hint}</p>
    </div>
  );
}
