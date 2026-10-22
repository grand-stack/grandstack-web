// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "urql";
import { friendlyError, buildCreateInput, emptyMovieForm } from "../forms/model";
import { MovieForm } from "../forms/MovieForm";
import { graphql } from "../graphql/generated";
import { Skeleton } from "../ui";

const GenresQuery = graphql(`
  query Genres { genres(sort: [{ name: ASC }]) { name } }
`);

const CreateMovieMutation = graphql(`
  mutation CreateMovie($input: [MovieCreateInput!]!) {
    createMovies(input: $input) { movies { title } }
  }
`);

export function MovieNew() {
  const navigate = useNavigate();
  const [{ data }] = useQuery({ query: GenresQuery, requestPolicy: "network-only" });
  const [{ fetching, error }, create] = useMutation(CreateMovieMutation);
  const [localError, setLocalError] = useState<string>();

  if (!data) return <Skeleton className="skeleton-hero" />;
  const existing = data.genres.map((g) => g.name);

  return (
    <MovieForm
      heading="Add a movie" initial={emptyMovieForm} existingGenres={existing} submitLabel="Create movie"
      saving={fetching} serverError={localError ?? (error && friendlyError(error.message, "A movie with that title, or a person or genre you added,"))}
      onCancel={() => navigate(-1)}
      onSubmit={async (state) => {
        setLocalError(undefined);
        const result = await create({ input: [buildCreateInput(state, existing)] });
        const title = result.data?.createMovies.movies[0]?.title;
        if (!result.error && title) navigate(`/movies/${encodeURIComponent(title)}`, { replace: true });
      }}
    />
  );
}
