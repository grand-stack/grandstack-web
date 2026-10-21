import { useState } from "react";
import { useQuery } from "urql";
import { graphql } from "../graphql/generated";

const MoviesQuery = graphql(`
  query Movies($search: String!) {
    movies(where: { title: { contains: $search } }, sort: [{ title: ASC }]) {
      title
      released
      tagline
    }
  }
`);

export function MovieList({ onSelect }: { onSelect: (title: string) => void }) {
  const [search, setSearch] = useState("");
  const [{ data, fetching, error }] = useQuery({
    query: MoviesQuery,
    variables: { search },
    requestPolicy: "cache-and-network",
  });

  return (
    <section>
      <input placeholder="Search by title (case-sensitive)" value={search} onChange={(e) => setSearch(e.target.value)} />
      {error && <p className="error">{error.message}</p>}
      {fetching && !data && <p>Loading…</p>}
      <ul>
        {data?.movies.map((m) => (
          <li key={m.title}>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelect(m.title); }}>{m.title}</a>
            {m.released ? ` (${m.released})` : ""}
            {m.tagline && <small>{m.tagline}</small>}
          </li>
        ))}
        {data && data.movies.length === 0 && <li>No movies found.</li>}
      </ul>
    </section>
  );
}
