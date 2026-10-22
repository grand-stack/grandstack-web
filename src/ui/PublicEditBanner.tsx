// Copyright (c) "Neo4j"
// Neo4j Sweden AB [http://neo4j.com]
export function PublicEditBanner() {
  return (
    <p className="banner" role="note">
      <strong>No authentication yet.</strong> Anyone who can reach this app can create, edit and delete this data.
      Reset it with <code>docker compose down -v</code>.
    </p>
  );
}
