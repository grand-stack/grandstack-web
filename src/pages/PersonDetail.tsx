// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "urql";
import { DeletePersonButton } from "../forms/DeleteButtons";
import { PersonGraph } from "../graph/PersonGraph";
import { graphql } from "../graphql/generated";
import { Avatar } from "../ui/Avatar";
import { MovieCard, type CardMovie } from "../search/MovieCard";
import { Button, Chip, Skeleton } from "../ui";

const PersonQuery = graphql(`
  query Person($name: String!) {
    people(where: { name: { eq: $name } }) {
      name
      born
      actedCount
      directedCount
      actedIn { title released rating runtime genres { name } }
      directed { title released rating runtime genres { name } }
      collaborators(limit: 8) { name films }
    }
  }
`);

type Order = "newest" | "rating" | "title";
const ORDERS: { key: Order; label: string }[] = [
  { key: "newest", label: "Newest first" }, { key: "rating", label: "Highest rated" }, { key: "title", label: "Title A to Z" },
];

function order(movies: CardMovie[], by: Order): CardMovie[] {
  const copy = [...movies];
  if (by === "newest") copy.sort((a, b) => (b.released ?? 0) - (a.released ?? 0) || a.title.localeCompare(b.title));
  if (by === "rating") copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.title.localeCompare(b.title));
  if (by === "title") copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

export function stats(movies: CardMovie[]) {
  const years = movies.map((m) => m.released).filter((y): y is number => typeof y === "number");
  const ratings = movies.map((m) => m.rating).filter((r): r is number => typeof r === "number");
  const genreCounts = new Map<string, number>();
  movies.forEach((m) => m.genres.forEach((g) => genreCounts.set(g.name, (genreCounts.get(g.name) ?? 0) + 1)));
  return {
    films: movies.length,
    first: years.length ? Math.min(...years) : undefined,
    last: years.length ? Math.max(...years) : undefined,
    avgRating: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : undefined,
    topGenres: [...genreCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3),
  };
}

export function PersonDetail() {
  const { name = "" } = useParams();
  const navigate = useNavigate();
  const [by, setBy] = useState<Order>("newest");
  const [{ data, fetching, error }] = useQuery({ query: PersonQuery, variables: { name } });
  const person = data?.people[0];

  const acted = useMemo(() => order(person?.actedIn ?? [], by), [person, by]);
  const directed = useMemo(() => order(person?.directed ?? [], by), [person, by]);
  const all = useMemo(() => {
    const byTitle = new Map<string, CardMovie>();
    [...(person?.actedIn ?? []), ...(person?.directed ?? [])].forEach((m) => byTitle.set(m.title, m));
    return [...byTitle.values()];
  }, [person]);
  const s = useMemo(() => stats(all), [all]);

  if (fetching && !data) return <div className="detail"><Skeleton className="skeleton-hero" /></div>;
  if (error) return <p className="error">{error.message}</p>;
  if (!person) return <div className="empty"><h2>Person not found</h2><Button onClick={() => navigate("/people")}>Browse people</Button></div>;

  return (
    <article className="detail person-detail">
      <Link to="/people" className="back" onClick={(e) => { if (window.history.length > 1) { e.preventDefault(); navigate(-1); } }}>← Back</Link>
      <div className="person-hero">
        <Avatar name={person.name} size="xl" />
        <div className="detail-info">
          <h1>{person.name}</h1>
          <div className="role-badges">
            {person.actedCount ? <span className="role-badge role-actor">Actor · {person.actedCount}</span> : null}
            {person.directedCount ? <span className="role-badge role-director">Director · {person.directedCount}</span> : null}
          </div>
          {person.born ? <p className="muted">Born {person.born}</p> : null}
          <dl className="stats">
            <div><dt>Films</dt><dd>{s.films}</dd></div>
            <div><dt>Active</dt><dd>{s.first === undefined ? "–" : s.first === s.last ? s.first : `${s.first}–${s.last}`}</dd></div>
            <div><dt>Avg rating</dt><dd>{s.avgRating === undefined ? "–" : `★ ${s.avgRating.toFixed(1)}`}</dd></div>
          </dl>
          <div className="chips">
            {s.topGenres.map(([g, n]) => <Link key={g} to={`/movies?g=${encodeURIComponent(g)}&p=${encodeURIComponent(person.name)}`}><Chip>{`${g} · ${n}`}</Chip></Link>)}
          </div>
          <Link to={`/movies?p=${encodeURIComponent(person.name)}`}>See their films in search results →</Link>
          <div className="form-actions manage">
            <Link to={`/people/${encodeURIComponent(person.name)}/edit`}><Button type="button">Edit</Button></Link>
            <DeletePersonButton name={person.name} credits={(person.actedCount ?? 0) + (person.directedCount ?? 0)} />
          </div>
        </div>
      </div>

      <div className="results-bar">
        <h2>Filmography</h2>
        <label className="sort">
          Sort
          <select value={by} onChange={(e) => setBy(e.target.value as Order)}>
            {ORDERS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </label>
      </div>

      {acted.length > 0 && (
        <section>
          <h3 className="section-title">Acted in · {acted.length}</h3>
          <div className="grid">{acted.map((m, i) => <MovieCard key={m.title} movie={m} index={i} />)}</div>
        </section>
      )}
      {directed.length > 0 && (
        <section>
          <h3 className="section-title">Directed · {directed.length}</h3>
          <div className="grid">{directed.map((m, i) => <MovieCard key={m.title} movie={m} index={i} />)}</div>
        </section>
      )}

      {person.collaborators.length > 0 && (
        <section>
          <h2>Frequent collaborators</h2>
          <p className="muted">People they share the most films with, found by traversing the graph.</p>
          <ul className="collabs">
            {person.collaborators.map((c) => (
              <li key={c.name}>
                <Link to={`/people/${encodeURIComponent(c.name)}`} className="collab">
                  <Avatar name={c.name} size="md" />
                  <span className="collab-name">{c.name}</span>
                  <span className="muted">{c.films} shared {c.films === 1 ? "film" : "films"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Career graph</h2>
        <PersonGraph
          input={{
            name: person.name,
            acted: person.actedIn.map((m) => m.title),
            directed: person.directed.map((m) => m.title),
            collaborators: person.collaborators,
          }}
        />
      </section>
    </article>
  );
}
