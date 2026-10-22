// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
import { useNavigate } from "react-router";
import { useMutation } from "urql";
import { emptyPersonForm, friendlyError } from "../forms/model";
import { PersonForm } from "../forms/PersonForm";
import { graphql } from "../graphql/generated";

const CreatePersonMutation = graphql(`
  mutation CreatePerson($input: [PersonCreateInput!]!) {
    createPeople(input: $input) { people { name } }
  }
`);

export function PersonNew() {
  const navigate = useNavigate();
  const [{ fetching, error }, create] = useMutation(CreatePersonMutation);
  return (
    <PersonForm
      heading="Add a person" initial={emptyPersonForm} submitLabel="Create person" saving={fetching}
      serverError={error && friendlyError(error.message, "A person with that name")}
      onCancel={() => navigate(-1)}
      onSubmit={async (s) => {
        const result = await create({ input: [{ name: s.name.trim(), born: s.born.trim() ? Number(s.born) : undefined }] });
        const name = result.data?.createPeople.people[0]?.name;
        if (!result.error && name) navigate(`/people/${encodeURIComponent(name)}`, { replace: true });
      }}
    />
  );
}
