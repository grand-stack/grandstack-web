import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "urql";
import { graphql } from "../graphql/generated";
import { useCompare } from "../lib/compare";
import { Button } from "../ui";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { friendlyError } from "./model";

const DeleteMovieMutation = graphql(`
  mutation DeleteMovie($title: String!) {
    deleteMovies(where: { title: { eq: $title } }) { nodesDeleted }
  }
`);

const DeletePersonMutation = graphql(`
  mutation DeletePerson($name: String!) {
    deletePeople(where: { name: { eq: $name } }) { nodesDeleted }
  }
`);

export function DeleteMovieButton({ title }: { title: string }) {
  const navigate = useNavigate();
  const compare = useCompare();
  const [open, setOpen] = useState(false);
  const [{ fetching, error }, run] = useMutation(DeleteMovieMutation);

  const confirm = async () => {
    const result = await run({ title });
    if (!result.error) {
      compare.remove(title);
      setOpen(false);
      navigate("/movies", { replace: true });
    }
  };

  return (
    <>
      <Button variant="danger" type="button" onClick={() => setOpen(true)}>Delete</Button>
      <ConfirmDialog open={open} title={`Delete “${title}”?`} confirmLabel="Delete movie" busy={fetching}
        error={error && friendlyError(error.message, "The movie")} onConfirm={confirm} onCancel={() => setOpen(false)}>
        <p>This removes the movie and its links to cast, directors and genres. The people and genres stay. This cannot be undone.</p>
      </ConfirmDialog>
    </>
  );
}

export function DeletePersonButton({ name, credits }: { name: string; credits: number }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ fetching, error }, run] = useMutation(DeletePersonMutation);

  const confirm = async () => {
    const result = await run({ name });
    if (!result.error) {
      setOpen(false);
      navigate("/people", { replace: true });
    }
  };

  return (
    <>
      <Button variant="danger" type="button" onClick={() => setOpen(true)}>Delete</Button>
      <ConfirmDialog open={open} title={`Delete ${name}?`} confirmLabel="Delete person" busy={fetching}
        error={error && friendlyError(error.message, "The person")} onConfirm={confirm} onCancel={() => setOpen(false)}>
        <p>
          {credits > 0
            ? `${name} has ${credits} ${credits === 1 ? "credit" : "credits"}. They will be removed from ${credits === 1 ? "that film's" : "those films'"} cast and crew, but the films stay.`
            : `${name} has no credits.`}{" "}
          This cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
}
