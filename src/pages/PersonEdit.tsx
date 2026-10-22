// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { DeletePersonButton } from "../forms/DeleteButtons";
import { friendlyError, isEmptyUpdate } from "../forms/model";
import { PersonForm } from "../forms/PersonForm";
import { graphql } from "../graphql/generated";
import { Button, Skeleton } from "../ui";

const PersonForEditQuery = graphql(`
  query PersonForEdit($name: String!) {
    people(where: { name: { eq: $name } }) {
      name
      born
      actedCount
      directedCount
    }
  }
`);

const UpdatePersonMutation = graphql(`
  mutation UpdatePerson($name: String!, $update: PersonUpdateInput) {
    updatePeople(where: { name: { eq: $name } }, update: $update) { people { name } }
  }
`);

export function PersonEdit() {
  const { name = "" } = useParams();
  const navigate = useNavigate();
  const [{ data, fetching }] = useQuery({ query: PersonForEditQuery, variables: { name }, requestPolicy: "network-only" });
  const [{ fetching: saving, error }, update] = useMutation(UpdatePersonMutation);
  const person = data?.people[0];
  const initial = useMemo(() => person && { name: person.name, born: person.born?.toString() ?? "" }, [person]);

  if (fetching && !data) return <Skeleton className="skeleton-hero" />;
  if (!person || !initial) return <div className="empty"><h2>Person not found</h2><Button onClick={() => navigate("/people")}>Browse people</Button></div>;
  const credits = (person.actedCount ?? 0) + (person.directedCount ?? 0);

  return (
    <PersonForm
      key={person.name}
      heading={`Edit ${person.name}`} initial={initial} submitLabel="Save changes" saving={saving}
      serverError={error && friendlyError(error.message, "A person with that name")}
      onCancel={() => navigate(`/people/${encodeURIComponent(person.name)}`)}
      extraActions={<DeletePersonButton name={person.name} credits={credits} />}
      onSubmit={async (s) => {
        const changes: Record<string, unknown> = {};
        if (s.name.trim() !== initial.name) changes.name = { set: s.name.trim() };
        if (s.born.trim() !== initial.born) changes.born = { set: s.born.trim() ? Number(s.born) : null };
        if (isEmptyUpdate(changes)) {
          navigate(`/people/${encodeURIComponent(person.name)}`);
          return;
        }
        const result = await update({ name: person.name, update: changes });
        const saved = result.data?.updatePeople.people[0]?.name;
        if (!result.error && saved) navigate(`/people/${encodeURIComponent(saved)}`, { replace: true });
      }}
    />
  );
}
