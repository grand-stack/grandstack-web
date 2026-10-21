import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

export interface GraphInput {
  title: string;
  directors: string[];
  cast: { name: string; role: string }[];
  genres: string[];
}

interface GraphApi {
  d3Force: (name: string) => { strength?: (v: number) => unknown; distance?: (v: number) => unknown } | undefined;
  zoomToFit: (ms: number, padding: number) => void;
}

interface GNode { id: string; label: string; kind: "movie" | "director" | "actor" | "genre"; x?: number; y?: number }
interface GLink { source: string; target: string; label: string }

const COLORS: Record<GNode["kind"], string> = { movie: "#5db3f0", director: "#ffc857", actor: "#3ddbb0", genre: "#c39bff" };
const LEGEND: { kind: GNode["kind"]; label: string }[] = [
  { kind: "movie", label: "Movie" }, { kind: "director", label: "Director" }, { kind: "actor", label: "Cast" }, { kind: "genre", label: "Genre" },
];

export function MovieGraph({ input }: { input: GraphInput }) {
  const navigate = useNavigate();
  const box = useRef<HTMLDivElement>(null);
  const graph = useRef<GraphApi | null>(null);
  const configure = (api: GraphApi | null) => {
    graph.current = api;
    api?.d3Force("charge")?.strength?.(-260);
    api?.d3Force("link")?.distance?.(90);
  };
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

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
    <div className="graph" ref={box}>
      <Suspense fallback={<div className="graph-loading">Loading graph…</div>}>
        <ForceGraph2D
          ref={configure as never}
          onEngineStop={() => graph.current?.zoomToFit(400, 100)}
          graphData={data}
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
            const r = node.kind === "movie" ? 9 : 6;
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
          onNodeClick={(raw) => {
            const n = raw as GNode;
            if (n.kind === "genre") navigate(`/movies?g=${encodeURIComponent(n.label)}`);
            else if (n.kind !== "movie") navigate(`/movies?p=${encodeURIComponent(n.label)}`);
          }}
        />
      </Suspense>
      <ul className="legend" aria-label="Graph legend">
        {LEGEND.map((l) => <li key={l.kind}><span className="dot" style={{ background: COLORS[l.kind] }} />{l.label}</li>)}
      </ul>
      <p className="muted graph-hint">Click a person or genre to see their films. Edges are the relationships stored in Neo4j.</p>
    </div>
  );
}
