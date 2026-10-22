// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { Link } from "react-router";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import { useCompare } from "../lib/compare";
import { formatRuntime } from "../lib/filters";
import { Poster } from "../poster/Poster";
import { Button, RatingBadge } from "../ui";

const CompareQuery = graphql(`
  query Compare($titles: [String!]) {
    movies(where: { title: { in: $titles } }) {
      title
      released
      rating
      runtime
      genres { name }
      directors { name }
      actorsConnection(first: 8) {
        edges { node { name } }
      }
    }
  }
`);

export function Compare() {
  const compare = useCompare();
  const [{ data, fetching }] = useQuery({ query: CompareQuery, variables: { titles: compare.titles }, pause: compare.titles.length === 0 });
  const movies = compare.titles.map((t) => data?.movies.find((m) => m.title === t)).filter((m): m is NonNullable<typeof m> => !!m);

  if (compare.titles.length === 0) {
    return <div className="empty"><h2>Nothing to compare yet</h2><p>Tick "Compare" on up to 4 movies.</p><Link to="/movies"><Button variant="primary">Browse movies</Button></Link></div>;
  }

  const castCount = new Map<string, number>();
  movies.forEach((m) => m.actorsConnection.edges.forEach((e) => castCount.set(e.node.name, (castCount.get(e.node.name) ?? 0) + 1)));
  const best = (f: (m: (typeof movies)[number]) => number | null | undefined, high: boolean) => {
    const vals = movies.map(f).filter((v): v is number => typeof v === "number");
    return vals.length > 1 ? (high ? Math.max(...vals) : Math.min(...vals)) : undefined;
  };
  const bestRating = best((m) => m.rating, true);
  const shortest = best((m) => m.runtime, false);

  return (
    <div className="compare">
      <div className="results-bar"><h1>Compare movies</h1><Button variant="ghost" onClick={compare.clear}>Clear all</Button></div>
      {fetching && !data && <p>Loading…</p>}
      <div className="compare-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="row" />
              {movies.map((m) => (
                <th key={m.title} scope="col">
                  <Link to={`/movies/${encodeURIComponent(m.title)}`}><Poster title={m.title} year={m.released} genre={m.genres[0]?.name} size="sm" /></Link>
                  <Link to={`/movies/${encodeURIComponent(m.title)}`} className="compare-name">{m.title}</Link>
                  <Button variant="ghost" onClick={() => compare.remove(m.title)}>Remove</Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">Rating</th>{movies.map((m) => <td key={m.title} className={m.rating === bestRating ? "best" : ""}><RatingBadge rating={m.rating} /></td>)}</tr>
            <tr><th scope="row">Released</th>{movies.map((m) => <td key={m.title}>{m.released}</td>)}</tr>
            <tr><th scope="row">Runtime</th>{movies.map((m) => <td key={m.title} className={m.runtime === shortest ? "best" : ""}>{formatRuntime(m.runtime)}</td>)}</tr>
            <tr><th scope="row">Genres</th>{movies.map((m) => <td key={m.title}>{m.genres.map((g) => g.name).join(", ")}</td>)}</tr>
            <tr><th scope="row">Director</th>{movies.map((m) => <td key={m.title}>{m.directors.map((d, i) => <span key={d.name}>{i > 0 && ", "}<Link to={`/people/${encodeURIComponent(d.name)}`}>{d.name}</Link></span>)}</td>)}</tr>
            <tr>
              <th scope="row">Cast <small className="muted">(shared in bold)</small></th>
              {movies.map((m) => (
                <td key={m.title}>
                  <ul className="plain">
                    {m.actorsConnection.edges.map((e) => <li key={e.node.name} className={(castCount.get(e.node.name) ?? 0) > 1 ? "shared" : ""}><Link to={`/people/${encodeURIComponent(e.node.name)}`}>{e.node.name}</Link></li>)}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
