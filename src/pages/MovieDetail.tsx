import { useQuery } from "urql";
import { graphql } from "../graphql/generated";

const MovieQuery = graphql(`
  query Movie($title: String!) {
    movies(where: { title: { eq: $title } }) {
      title
      released
      tagline
      genres { name }
      directors { name }
      actorsConnection {
        edges {
          properties { roles }
          node { name }
        }
      }
    }
  }
`);

export function MovieDetail({ title, onBack }: { title: string; onBack: () => void }) {
  const [{ data, fetching, error }] = useQuery({ query: MovieQuery, variables: { title } });
  const movie = data?.movies[0];

  return (
    <section>
      <button onClick={onBack}>← Back</button>
      {error && <p className="error">{error.message}</p>}
      {fetching && <p>Loading…</p>}
      {data && !movie && <p>Movie not found.</p>}
      {movie && (
        <>
          <h2>{movie.title}{movie.released ? ` (${movie.released})` : ""}</h2>
          {movie.tagline && <p><em>{movie.tagline}</em></p>}
          <p>Genres: {movie.genres.map((g) => g.name).join(", ") || "none"}</p>
          <p>Directed by: {movie.directors.map((d) => d.name).join(", ") || "unknown"}</p>
          <h3>Cast</h3>
          <ul>
            {movie.actorsConnection.edges.map((e) => (
              <li key={e.node.name}>{e.node.name} as {e.properties.roles.join(", ")}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
