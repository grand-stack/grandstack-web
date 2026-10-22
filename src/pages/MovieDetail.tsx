// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "urql";
import { MovieGraph } from "../graph/MovieGraph";
import { graphql } from "../graphql/generated";
import { useCompare } from "../lib/compare";
import { formatRuntime } from "../lib/filters";
import { Poster } from "../poster/Poster";
import { MovieCard } from "../search/MovieCard";
import { DeleteMovieButton } from "../forms/DeleteButtons";
import { Button, Chip, RatingBadge, Skeleton } from "../ui";

const MovieQuery = graphql(`
  query Movie($title: String!) {
    movies(where: { title: { eq: $title } }) {
      title
      released
      rating
      runtime
      tagline
      genres { name }
      directors { name }
      actorsConnection(first: 12) {
        edges {
          properties { roles }
          node { name }
        }
      }
      similar(limit: 8) {
        title
        released
        rating
        runtime
        genres { name }
      }
    }
  }
`);

export function MovieDetail() {
  const { title = "" } = useParams();
  const navigate = useNavigate();
  const compare = useCompare();
  const [{ data, fetching, error }] = useQuery({ query: MovieQuery, variables: { title } });
  const movie = data?.movies[0];

  if (fetching && !data) return <div className="detail"><Skeleton className="skeleton-hero" /></div>;
  if (error) return <p className="error">{error.message}</p>;
  if (!movie) return <div className="empty"><h2>Movie not found</h2><Button onClick={() => navigate("/movies")}>Browse movies</Button></div>;

  const cast = movie.actorsConnection.edges.map((e) => ({ name: e.node.name, role: e.properties.roles.join(", ") }));
  const selected = compare.has(movie.title);

  return (
    <article className="detail">
      <Link to="/movies" className="back" onClick={(e) => { if (window.history.length > 1) { e.preventDefault(); navigate(-1); } }}>← Back to results</Link>
      <div className="detail-hero">
        <Poster title={movie.title} year={movie.released} genre={movie.genres[0]?.name} size="lg" />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p className="detail-facts">
            <RatingBadge rating={movie.rating} />
            {[movie.released, formatRuntime(movie.runtime)].filter(Boolean).join(" · ")}
          </p>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <div className="chips">
            {movie.genres.map((g) => <Link key={g.name} to={`/movies?g=${encodeURIComponent(g.name)}`}><Chip>{g.name}</Chip></Link>)}
          </div>
          <dl className="facts">
            <dt>Directed by</dt>
            <dd>{movie.directors.length ? movie.directors.map((d, i) => (
              <span key={d.name}>{i > 0 && ", "}<Link to={`/people/${encodeURIComponent(d.name)}`}>{d.name}</Link></span>
            )) : "Unknown"}</dd>
          </dl>
          <Button variant={selected ? "primary" : "secondary"} onClick={() => compare.toggle(movie.title)} disabled={!selected && compare.full}>
            {selected ? "In comparison ✓" : compare.full ? "Comparison full" : "Add to compare"}
          </Button>
          <div className="form-actions manage">
            <Link to={`/movies/${encodeURIComponent(movie.title)}/edit`}><Button type="button">Edit</Button></Link>
            <DeleteMovieButton title={movie.title} />
          </div>
        </div>
      </div>

      <section>
        <h2>Cast</h2>
        <ul className="cast">
          {cast.map((c) => (
            <li key={c.name}>
              <Link to={`/people/${encodeURIComponent(c.name)}`}>{c.name}</Link>
              {c.role && <span className="muted">as {c.role}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Connections</h2>
        <MovieGraph input={{ title: movie.title, directors: movie.directors.map((d) => d.name), cast, genres: movie.genres.map((g) => g.name) }} />
      </section>

      {movie.similar.length > 0 && (
        <section>
          <h2>You might also like</h2>
          <p className="muted">Ranked by shared director, cast and genres, found by traversing the graph.</p>
          <div className="row">{movie.similar.map((m, i) => <MovieCard key={m.title} movie={m} index={i} />)}</div>
        </section>
      )}
    </article>
  );
}
