import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "urql";
import { graphql } from "../graphql/generated";
import { Button } from "../ui";

const CreateMovieMutation = graphql(`
  mutation CreateMovie($input: [MovieCreateInput!]!) {
    createMovies(input: $input) {
      movies { title }
    }
  }
`);

export function CreateMovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [released, setReleased] = useState("");
  const [rating, setRating] = useState("");
  const [runtime, setRuntime] = useState("");
  const [{ fetching, error }, createMovie] = useMutation(CreateMovieMutation);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const result = await createMovie({
      input: [{
        title,
        tagline: tagline || undefined,
        released: released ? Number(released) : undefined,
        rating: rating ? Number(rating) : undefined,
        runtime: runtime ? Number(runtime) : undefined,
      }],
    });
    const created = result.data?.createMovies.movies[0]?.title;
    if (!result.error && created) navigate(`/movies/${encodeURIComponent(created)}`);
  }

  return (
    <form className="form" onSubmit={submit}>
      <h1>Add a movie</h1>
      <p className="muted">Creates a Movie node through the GraphQL API. Anyone can do this until auth is added.</p>
      <label>Title <input className="text-input" required value={title} onChange={(e) => setTitle(e.target.value)} /></label>
      <label>Tagline <input className="text-input" value={tagline} onChange={(e) => setTagline(e.target.value)} /></label>
      <div className="form-row">
        <label>Released <input className="text-input" type="number" min="1888" max="2100" value={released} onChange={(e) => setReleased(e.target.value)} /></label>
        <label>Rating (0-10) <input className="text-input" type="number" min="0" max="10" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} /></label>
        <label>Runtime (min) <input className="text-input" type="number" min="1" value={runtime} onChange={(e) => setRuntime(e.target.value)} /></label>
      </div>
      {error && <p className="error" role="alert">{error.message.includes("Constraint") ? "A movie with that title already exists." : error.message}</p>}
      <div className="form-actions">
        <Button variant="primary" type="submit" disabled={fetching}>Create</Button>
        <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </form>
  );
}
