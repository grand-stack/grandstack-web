// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { DeleteMovieButton } from "../forms/DeleteButtons";
import { buildUpdateInput, friendlyError, isEmptyUpdate, joinRoles, type MovieFormState } from "../forms/model";
import { MovieForm } from "../forms/MovieForm";
import { graphql } from "../graphql/generated";
import { Button, Skeleton } from "../ui";

const MovieForEditQuery = graphql(`
  query MovieForEdit($title: String!) {
    movies(where: { title: { eq: $title } }) {
      title
      tagline
      released
      rating
      runtime
      genres { name }
      directors { name }
      actorsConnection {
        edges {
          properties { roles }
          node { name }
        }
      }
    }
    genres(sort: [{ name: ASC }]) { name }
  }
`);

const UpdateMovieMutation = graphql(`
  mutation UpdateMovie($title: String!, $update: MovieUpdateInput) {
    updateMovies(where: { title: { eq: $title } }, update: $update) { movies { title } }
  }
`);

export function MovieEdit() {
  const { title = "" } = useParams();
  const navigate = useNavigate();
  const [{ data, fetching }] = useQuery({ query: MovieForEditQuery, variables: { title }, requestPolicy: "network-only" });
  const [{ fetching: saving, error }, update] = useMutation(UpdateMovieMutation);
  const [localError, setLocalError] = useState<string>();

  const movie = data?.movies[0];
  const existing = useMemo(() => data?.genres.map((g) => g.name) ?? [], [data]);
  const initial = useMemo<MovieFormState | undefined>(() => movie && {
    title: movie.title,
    tagline: movie.tagline ?? "",
    released: movie.released?.toString() ?? "",
    rating: movie.rating?.toString() ?? "",
    runtime: movie.runtime?.toString() ?? "",
    genres: movie.genres.map((g) => g.name),
    directors: movie.directors.map((d) => ({ name: d.name, isNew: false })),
    cast: movie.actorsConnection.edges.map((e) => ({ name: e.node.name, isNew: false, role: joinRoles(e.properties.roles) })),
  }, [movie]);

  if (fetching && !data) return <Skeleton className="skeleton-hero" />;
  if (!movie || !initial) {
    return <div className="empty"><h2>Movie not found</h2><Button onClick={() => navigate("/movies")}>Browse movies</Button></div>;
  }

  return (
    <MovieForm
      key={movie.title}
      heading={`Edit ${movie.title}`} initial={initial} existingGenres={existing} submitLabel="Save changes"
      saving={saving} serverError={localError ?? (error && friendlyError(error.message, "A movie with that title, or a person or genre you added,"))}
      onCancel={() => navigate(`/movies/${encodeURIComponent(movie.title)}`)}
      extraActions={<DeleteMovieButton title={movie.title} />}
      onSubmit={async (state) => {
        setLocalError(undefined);
        const input = buildUpdateInput(initial, state, existing);
        if (isEmptyUpdate(input)) {
          navigate(`/movies/${encodeURIComponent(movie.title)}`);
          return;
        }
        const result = await update({ title: movie.title, update: input });
        const saved = result.data?.updateMovies.movies[0]?.title;
        if (!result.error && saved) navigate(`/movies/${encodeURIComponent(saved)}`, { replace: true });
      }}
    />
  );
}
