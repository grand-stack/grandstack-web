import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";
import { MovieCard } from "../search/MovieCard";
import { PersonCard } from "../search/PersonCard";
import { Chip, Skeleton } from "../ui";

const HomeQuery = graphql(`
  query Home {
    total: moviesConnection { totalCount }
    people: peopleConnection { totalCount }
    genres(sort: [{ name: ASC }]) { name moviesConnection { totalCount } }
    top: movies(sort: [{ rating: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }
    prolific: people(sort: [{ actedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }
    directing: people(sort: [{ directedCount: DESC }, { name: ASC }], limit: 10) { name born actedCount directedCount }
    recent: movies(sort: [{ released: DESC }, { title: ASC }], limit: 10) { title released rating runtime genres { name } }
  }
`);

export function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [{ data }] = useQuery({ query: HomeQuery });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(q.trim() ? `/movies?q=${encodeURIComponent(q.trim())}` : "/movies");
  };

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">GraphQL on Neo4j</p>
        <h1>Find your next movie</h1>
        <p className="hero-sub">
          {data ? `${data.total.totalCount} films, ${data.people.totalCount} people and every connection between them,` : "Every film and connection,"} served over GraphQL from a Neo4j graph.
        </p>
        <form className="hero-search" onSubmit={submit} role="search">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title…" aria-label="Search movies by title" />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <div className="chips hero-chips">
          {(data?.genres ?? []).map((g) => (
            <Link key={g.name} to={`/movies?g=${encodeURIComponent(g.name)}`}><Chip>{`${g.name} · ${g.moviesConnection.totalCount}`}</Chip></Link>
          ))}
        </div>
      </section>

      <Row title="Top rated" to="/movies" movies={data?.top} />
      <section className="home-row">
        <div className="row-head"><h2>Most prolific actors</h2><Link to="/people?role=actor">See all →</Link></div>
        <div className="row people-row">{data ? data.prolific.map((p, i) => <PersonCard key={p.name} person={p} index={i} />) : Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="skeleton-person" />)}</div>
      </section>
      <section className="home-row">
        <div className="row-head"><h2>Most prolific directors</h2><Link to="/people?role=director&s=films">See all →</Link></div>
        <div className="row people-row">{data ? data.directing.map((p, i) => <PersonCard key={p.name} person={p} index={i} />) : Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="skeleton-person" />)}</div>
      </section>
      <Row title="Newest" to="/movies?s=newest" movies={data?.recent} />
    </div>
  );
}

function Row({ title, to, movies }: { title: string; to: string; movies?: { title: string; released?: number | null; rating?: number | null; runtime?: number | null; genres: { name: string }[] }[] }) {
  return (
    <section className="home-row">
      <div className="row-head"><h2>{title}</h2><Link to={to}>See all →</Link></div>
      <div className="row">
        {movies ? movies.map((m, i) => <MovieCard key={m.title} movie={m} index={i} />) : Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="skeleton-card" />)}
      </div>
    </section>
  );
}
