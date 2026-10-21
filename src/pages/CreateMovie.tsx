import { useState, type FormEvent } from "react";
import { useMutation } from "urql";
import { graphql } from "../graphql/generated";

const CreateMovieMutation = graphql(`
  mutation CreateMovie($input: [MovieCreateInput!]!) {
    createMovies(input: $input) {
      movies { title }
    }
  }
`);

export function CreateMovie({ onDone }: { onDone: (title?: string) => void }) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [released, setReleased] = useState("");
  const [{ fetching, error }, createMovie] = useMutation(CreateMovieMutation);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const result = await createMovie({
      input: [{ title, tagline: tagline || undefined, released: released ? Number(released) : undefined }],
    });
    if (!result.error) onDone(result.data?.createMovies.movies[0]?.title);
  }

  return (
    <form onSubmit={submit}>
      <h2>Add a movie</h2>
      <label>Title <input required value={title} onChange={(e) => setTitle(e.target.value)} /></label>
      <label>Tagline <input value={tagline} onChange={(e) => setTagline(e.target.value)} /></label>
      <label>Released <input type="number" min="1888" value={released} onChange={(e) => setReleased(e.target.value)} /></label>
      {error && <p className="error">{error.message.includes("Constraint") ? "A movie with that title already exists." : error.message}</p>}
      <button type="submit" disabled={fetching}>Create</button>
      <button type="button" onClick={() => onDone()}>Cancel</button>
    </form>
  );
}
